import { test, expect } from '@playwright/test'

// Browser QA for the vacancy-cost tool on /cena-neobsazene-pozice.
//
// The unit tests prove the arithmetic and that the SOURCE contains no
// transmission. These prove the rendered thing behaves: it computes in the
// browser, it is reachable by keyboard, it announces its result, it survives
// long German labels at 320px, and — the assertion that matters most — the
// numbers an employer types never leave the page.

const PAGE = '/cena-neobsazene-pozice'
const WIDTHS = [320, 390, 768, 1024, 1440]

/**
 * Switching language needs two real-world obstacles cleared first.
 *
 * The cookie banner overlays the switcher on a narrow screen and intercepts the
 * click, so these tests answer it the way a returning visitor already has. And
 * the header switcher is display:none below the nav breakpoint, where the same
 * control lives inside the hamburger — so drive whichever one this viewport
 * actually exposes rather than clicking a hidden element.
 *
 * Note the other tests in this file deliberately run WITH the banner present:
 * the tool itself must be usable before consent is given, and it is.
 */
const answerConsent = (page: import('@playwright/test').Page) =>
  page.addInitScript(() => window.localStorage.setItem('cookie_consent', 'rejected'))

const setLang = async (page: import('@playwright/test').Page, lang: string) => {
  await expect(page.locator('.cookie-banner')).toHaveCount(0)
  const header = page.locator(`.lang-btn[data-lang="${lang}"]`).first()
  if (!(await header.isVisible())) await page.locator('#burger').click()
  await page.locator(`.lang-btn[data-lang="${lang}"]:visible`).first().click()
  await expect(page.locator('html')).toHaveAttribute('lang', lang)
}

test.describe('vacancy-cost tool', () => {
  test('computes from entered values and reconciles the total', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' })

    // Empty state: no default figure is invented.
    await expect(page.locator('.vct__empty')).toBeVisible()

    await page.fill('#vct-vacancyDays', '30')
    await page.fill('#vct-dailyContribution', '4000')
    await page.fill('#vct-advertisingCost', '8000')

    const total = page.locator('.vct__amount--total')
    await expect(total).toBeVisible()
    // 30 × 4000 + 8000 = 128 000
    await expect(total).toContainText('128')

    // The arithmetic is shown, not just its answer.
    await expect(page.locator('.vct__formula').first()).toContainText('×')
  })

  test('rejects a negative number instead of silently using it', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' })
    await page.fill('#vct-advertisingCost', '-500')
    const err = page.locator('#vct-advertisingCost-err')
    await expect(err).toBeVisible()
    await expect(page.locator('#vct-advertisingCost')).toHaveAttribute('aria-invalid', 'true')
  })

  test('entered values never reach the URL, storage or the network', async ({ page }) => {
    const requests: string[] = []
    page.on('request', (r) => requests.push(r.url()))

    await page.goto(PAGE, { waitUntil: 'networkidle' })
    const before = requests.length

    await page.fill('#vct-dailyContribution', '987654')
    await page.fill('#vct-projectDelayCost', '123456')
    await page.waitForTimeout(300)

    // No request carries the values, and typing triggers no new request at all.
    const after = requests.slice(before)
    for (const url of requests) {
      expect(url).not.toContain('987654')
      expect(url).not.toContain('123456')
    }
    expect(after.filter((u) => !u.startsWith('data:'))).toHaveLength(0)

    // Not in the URL, not in history, not in storage.
    expect(page.url()).not.toContain('987654')
    expect(new URL(page.url()).search).toBe('')
    const leaked = await page.evaluate(() => {
      const hay = [
        JSON.stringify(Object.entries(localStorage)),
        JSON.stringify(Object.entries(sessionStorage)),
        document.cookie,
        location.href,
      ].join(' ')
      return hay.includes('987654') || hay.includes('123456')
    })
    expect(leaked).toBe(false)
  })

  test('the result region is announced to assistive technology', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' })
    const out = page.locator('.vct__result')
    await expect(out).toHaveAttribute('aria-live', 'polite')
    await expect(out).toHaveAttribute('aria-label', /.+/)
  })

  test('every input has a real label, not a placeholder standing in for one', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' })
    const ids = await page.locator('.vct__input').evaluateAll((els) => els.map((e) => e.id))
    expect(ids.length).toBeGreaterThan(0)
    for (const id of ids) {
      await expect(page.locator(`label[for="${id}"]`)).toHaveCount(1)
      await expect(page.locator(`label[for="${id}"]`)).not.toBeEmpty()
    }
  })

  test('is keyboard operable', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' })
    await page.locator('#vct-vacancyDays').focus()
    await page.keyboard.type('12')
    await expect(page.locator('#vct-vacancyDays')).toHaveValue('12')
    await page.keyboard.press('Tab')
    await page.keyboard.type('500')
    await expect(page.locator('#vct-dailyContribution')).toHaveValue('500')
    await expect(page.locator('.vct__amount--total')).toContainText('6')
  })

  test('the CTA points at the clean request path with no query string', async ({ page }) => {
    await page.goto(PAGE, { waitUntil: 'networkidle' })
    await page.fill('#vct-dailyContribution', '4321')
    const cta = page.locator('.vct__cta a')
    await expect(cta).toHaveAttribute('href', '/poptavka-pracovniku')
    await cta.click()
    await page.waitForURL('**/poptavka-pracovniku')
    expect(new URL(page.url()).search).toBe('')
    expect(page.url()).not.toContain('4321')
  })

  for (const lang of ['cs', 'en', 'de']) {
    test(`renders in ${lang} with identical arithmetic`, async ({ page }) => {
      await answerConsent(page)
      await page.goto(PAGE, { waitUntil: 'networkidle' })
      await setLang(page, lang)
      await page.fill('#vct-vacancyDays', '10')
      await page.fill('#vct-dailyContribution', '1000')
      // The figure is language-independent; only the formatting changes.
      await expect(page.locator('.vct__amount--total')).toContainText('10');
      // EN/DE must state this is not a statutory payroll calculator.
      if (lang === 'cs') await expect(page.locator('.vct__scope')).toHaveCount(0)
      else await expect(page.locator('.vct__scope')).toBeVisible()
    })
  }

  test('no horizontal overflow at any width, in German (longest labels)', async ({ page }) => {
    await answerConsent(page)
    await page.goto(PAGE, { waitUntil: 'networkidle' })
    await setLang(page, 'de')
    await page.fill('#vct-vacancyDays', '365')
    await page.fill('#vct-dailyContribution', '999999')
    await page.fill('#vct-projectDelayCost', '12345678')

    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 })
      const overflow = await page.evaluate(() => {
        const el = document.scrollingElement || document.documentElement
        return el.scrollWidth - el.clientWidth
      })
      expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(2)
      await expect(page.locator('#vct-title')).toBeVisible()
    }
  })
})
