import { test, expect, type Page } from '@playwright/test'

// Browser QA for the payroll calculator's share surface (W4).
//
// The defect: the page base64'd the entire PayrollInput into `?d=` for the
// "copy link" button, and restored it on load. Two things made that serious
// rather than cosmetic. The payload carried `taxProfile.disability`,
// `taxProfile.ztpp` and `children[].ztpp` — disability status, which is health
// data under GDPR Art. 9. And WebmasterID's page_view transmits the full
// `url`, so merely OPENING a shared link handed that payload to a third-party
// ingest endpoint. Base64 is encoding, not encryption; the payload is readable
// by anyone who sees the URL.
//
// The fix removed both halves — producing and consuming. These tests prove the
// removal holds in a real browser, which the source-level gate cannot:
// a static scan can show `atob` is gone, but only a browser can show that a
// crafted link no longer populates the form and no longer reaches analytics.

const PAGE = '/kalkulacka-mzdy-agenturniho-zamestnance'

// A payload in exactly the old format: the real PayrollInput shape, carrying a
// distinctive wage and the Art. 9 fields. Built by the same encode the removed
// copyLink used, so this is the genuine legacy link a user may still have.
const LEGACY = {
  mode: 'agency',
  period: { month: 8, year: 2026 },
  wage: { monthlyWageCzk: 777333, hourlyRateCzk: 0, kind: 'monthly' },
  taxProfile: {
    signedDeclaration: true,
    applyBasicCredit: true,
    disability: 'third',
    ztpp: true,
    children: [{ ztpp: true }, { ztpp: true }],
    residency: 'non_resident',
  },
}
const WAGE_MARKER = '777333'
const encodeLegacy = (o: unknown) =>
  Buffer.from(unescape(encodeURIComponent(JSON.stringify(o))), 'binary').toString('base64')

const rejectConsent = (page: Page) =>
  page.addInitScript(() => window.localStorage.setItem('cookie_consent', 'rejected'))

/** Every value a user could have typed, as the page currently holds it. */
const formValues = (page: Page) =>
  page.evaluate(() =>
    Array.from(document.querySelectorAll('input, select')).map((el) => String((el as HTMLInputElement).value)),
  )

test.describe('payroll share privacy', () => {
  test('a legacy ?d= link does not restore any value into the form', async ({ page }) => {
    await rejectConsent(page)
    const encoded = encodeLegacy(LEGACY)
    await page.goto(`${PAGE}?d=${encodeURIComponent(encoded)}`, { waitUntil: 'networkidle' })

    // The page must still render — the old decoder crashed the render for
    // malformed payloads, leaving no <h1> at all.
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toBeVisible()

    const values = await formValues(page)
    expect(values.join('|'), 'the legacy payload must not populate any field').not.toContain(WAGE_MARKER)

    // And nothing anywhere on the page echoes it back.
    const body = await page.locator('body').innerText()
    expect(body).not.toContain(WAGE_MARKER)
  })

  test('a malformed ?d= link renders the page normally instead of breaking it', async ({ page }) => {
    await rejectConsent(page)
    for (const payload of ['not-base64!!', encodeLegacy({ wage: null }), encodeLegacy({ wage: { monthlyWageCzk: 'x' } }), '']) {
      await page.goto(`${PAGE}?d=${encodeURIComponent(payload)}`, { waitUntil: 'networkidle' })
      await expect(page.locator('h1'), `payload "${payload.slice(0, 16)}" must not break the render`).toHaveCount(1)
      await expect(page.locator('h1')).toBeVisible()
    }
  })

  test('the ?mode hint still works — the fix removed the payload, not the feature', async ({ page }) => {
    await rejectConsent(page)
    await page.goto(`${PAGE}?mode=comparison`, { waitUntil: 'networkidle' })
    await expect(page.locator('h1')).toBeVisible()
    // An unknown mode must be ignored rather than applied.
    await page.goto(`${PAGE}?mode=../../etc/passwd`, { waitUntil: 'networkidle' })
    await expect(page.locator('h1')).toBeVisible()
    const body = await page.locator('body').innerText()
    expect(body).not.toContain('etc/passwd')
  })

  test('copy link yields the bare page URL with no payload', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'clipboard permissions are chromium-only in this harness')
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await rejectConsent(page)
    await page.goto(PAGE, { waitUntil: 'networkidle' })

    // Type a distinctive wage first: if copyLink ever re-encodes state, this is
    // the value that would show up in the copied string.
    const num = page.locator('input[type="number"], input[inputmode="numeric"]').first()
    if (await num.count()) await num.fill(WAGE_MARKER)

    const btn = page.getByRole('button', { name: /Kopírovat odkaz|Copy link|Link kopieren/i }).first()
    await expect(btn).toBeVisible()
    await btn.click()

    const copied = await page.evaluate(() => navigator.clipboard.readText())
    expect(copied, 'the copied link must carry no query string at all').not.toContain('?')
    expect(copied).not.toContain(WAGE_MARKER)
    expect(copied).toContain(PAGE)
  })

  test('opening a legacy link transmits no payload to analytics', async ({ page }) => {
    // Consent ACCEPTED — this is the condition under which the tracker runs and
    // the leak was real. Requests are intercepted, not delivered: this test
    // must never send data to the third-party endpoint it is checking.
    const sent: string[] = []
    await page.route('**/webmasterid-ingest-api.vercel.app/**', async (route) => {
      sent.push(route.request().url() + '\n' + (route.request().postData() ?? ''))
      await route.fulfill({ status: 204, body: '' })
    })
    await page.addInitScript(() => window.localStorage.setItem('cookie_consent', 'accepted'))

    const encoded = encodeLegacy(LEGACY)
    await page.goto(`${PAGE}?d=${encodeURIComponent(encoded)}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)

    const all = sent.join('\n')
    // page_view transmits location.href, so the URL itself is the payload path.
    expect(all, 'the encoded blob must not reach analytics').not.toContain(encoded.slice(0, 24))
    expect(all).not.toContain(WAGE_MARKER)
    expect(all).not.toContain('ztpp')
    expect(all).not.toContain('disability')
  })

  test('the scrub strips undeclared params without breaking campaign attribution', async ({ page }) => {
    // The two systems run in the same commit: <UrlHygiene /> is the first child
    // of _app, and the request form reads the query in its own effect. If the
    // scrub were too broad, or ran in the wrong order, inbound campaign traffic
    // would silently lose its attribution — a regression that no unit test can
    // see, because it lives in React's effect ordering.
    await page.addInitScript(() => window.localStorage.setItem('cookie_consent', 'rejected'))
    await page.goto(
      '/poptavka-pracovniku?utm_source=linkedin&utm_campaign=jaro&source=employer-hub&d=eyJ3YWdlIjp7fX0&gclid=zzz',
      { waitUntil: 'networkidle' },
    )
    await page.waitForTimeout(800)

    const url = page.url()
    expect(url, 'the payload must be gone from the address bar').not.toContain('d=eyJ')
    expect(url, 'an undeclared tracking param is stripped too').not.toContain('gclid')
    expect(url).toContain('utm_source=linkedin')
    expect(url).toContain('source=employer-hub')

    const stored = await page.evaluate(() => window.sessionStorage.getItem('tnt-attribution'))
    expect(stored, 'campaign attribution must survive the scrub').toContain('linkedin')
    expect(stored).toContain('jaro')
    expect(stored).not.toContain('eyJ')
  })
})
