import { test, expect, type Page, type Request } from '@playwright/test'

/**
 * Browser QA for the GERMAN employer-cost calculator, on all three locale routes.
 *
 * Runs against the real production build, because everything checked here —
 * server-rendered prose, the no-JS page, what actually crosses the network —
 * behaves differently under the dev server.
 *
 * In order of importance:
 *
 *   1. PRIVACY. The unit suite reads the source and proves no transmission was
 *      written. This watches the wire and proves none happens — including from
 *      code the unit test cannot see, such as a framework prefetch carrying a
 *      URL a value had leaked into. The inputs here include religious
 *      affiliation, which is GDPR Article 9 special-category data.
 *   2. ONE ENGINE, THREE LANGUAGES. The same gross must produce the same euro
 *      figures on all three routes. If a locale ever reached the arithmetic,
 *      this is where it shows.
 *   3. TWO CALCULATORS, ONE LANGUAGE. /de/arbeitgeberkosten-rechner-deutschland
 *      and /de/arbeitgeberkosten-rechner-tschechien are both German-language
 *      pages about different countries' payroll. A reader who lands on the
 *      wrong one has been misinformed, so the pages must be unmistakable.
 */

const ROUTES = {
  cs: '/kalkulacka-nakladu-zamestnavatele-nemecko',
  en: '/en/germany-employer-cost-calculator',
  de: '/de/arbeitgeberkosten-rechner-deutschland',
} as const

const CZECH_CALCULATOR_DE = '/de/arbeitgeberkosten-rechner-tschechien'

/** Digits only, so "4.862,00 €" / "€4,862.00" / "4 862,00 €" compare equal. */
const digits = (s: string) => s.replace(/[^0-9]/g, '')

async function enterGross(page: Page, value: string) {
  await page.locator('#decc-gross').fill(value)
  await expect(page.locator('.ecc__total-value').first()).toContainText(/\d/)
}

/** Anything that could carry a value off the page. */
function watchWire(page: Page) {
  const requests: Request[] = []
  page.on('request', (r) => requests.push(r))
  return requests
}

const SECRETS = ['4000', '4.000', '4,000']

test.describe('privacy — nothing typed here leaves the browser', () => {
  for (const [locale, route] of Object.entries(ROUTES)) {
    test(`${locale}: no request carries a typed value, and the URL never changes`, async ({ page }) => {
      const requests = watchWire(page)
      await page.goto(route)
      const before = page.url()

      await enterGross(page, '4000')
      // Exercise the parts that hold the most sensitive inputs.
      await page.locator('#decc-kvz').fill('2,9')
      await page.locator('.ecc__advanced summary').click()
      await page.locator('#decc-kfb').selectOption('2')
      const church = page.locator('input[type=checkbox]').nth(2)
      await church.check().catch(() => {})
      await page.waitForTimeout(500)

      expect(page.url(), 'the URL changed').toBe(before)

      const leaks = requests.filter((r) => {
        const u = r.url()
        if (u.startsWith('data:') || u.startsWith('blob:')) return false
        const haystack = `${u} ${r.postData() ?? ''}`
        return SECRETS.some((s) => haystack.includes(s))
      })
      expect(
        leaks.map((r) => `${r.method()} ${r.url()}`),
        'a request carried a typed value',
      ).toEqual([])
    })
  }

  test('the calculator adds no external origin the site does not already use', async ({ page }) => {
    // Measured against a control page rather than asserted to be empty.
    //
    // The site loads its webfont from fonts.gstatic.com on every page, which
    // this branch neither introduced nor is entitled to change. Asserting "no
    // external origin at all" would fail on that and say nothing about the
    // calculator; the question worth answering is whether the CALCULATOR adds
    // one, because that is the thing a typed value could ride out on.
    const origins = async (route: string) => {
      const requests = watchWire(page)
      await page.goto(route)
      await page.waitForTimeout(400)
      return new Set(
        requests
          .map((r) => r.url())
          .filter((u) => /^https?:\/\//.test(u) && !u.includes('127.0.0.1') && !u.includes('localhost'))
          .map((u) => new URL(u).origin),
      )
    }

    const control = await origins('/pro-zamestnavatele')

    const requests = watchWire(page)
    await page.goto(ROUTES.de)
    await enterGross(page, '5500')
    await page.locator('#decc-kvz').fill('3,55')
    await page.waitForTimeout(600)
    const calculator = new Set(
      requests
        .map((r) => r.url())
        .filter((u) => /^https?:\/\//.test(u) && !u.includes('127.0.0.1') && !u.includes('localhost'))
        .map((u) => new URL(u).origin),
    )

    const added = [...calculator].filter((o) => !control.has(o))
    expect(added, 'origins the calculator page reaches that an ordinary page does not').toEqual([])
  })
})

test.describe('one engine, three languages', () => {
  test('the same gross produces the same figures on all three routes', async ({ page }) => {
    const seen: Record<string, string[]> = {}
    for (const [locale, route] of Object.entries(ROUTES)) {
      await page.goto(route)
      await enterGross(page, '4000')
      const totals = await page.locator('.ecc__total-value').allTextContents()
      seen[locale] = totals.map(digits)
    }
    expect(seen.en, 'English differs from Czech').toEqual(seen.cs)
    expect(seen.de, 'German differs from Czech').toEqual(seen.cs)
    // And the figures are not empty, which would make the comparison vacuous.
    expect(seen.cs.every((t) => t.length > 0)).toBe(true)
  })

  test('every locale shows euro, never koruna', async ({ page }) => {
    for (const route of Object.values(ROUTES)) {
      await page.goto(route)
      await enterGross(page, '4000')
      const panel = await page.locator('.ecc__totals').innerText()
      expect(panel, `${route} shows a euro figure`).toMatch(/€|EUR/)
      expect(panel, `${route} must not show koruna`).not.toMatch(/Kč|CZK/)
    }
  })
})

test.describe('the two German-language calculators are unmistakable', () => {
  test('one says Deutschland and shows euro, the other says Tschechien and shows koruna', async ({ page }) => {
    await page.goto(ROUTES.de)
    await expect(page.locator('h1')).toContainText(/Deutschland/)
    await enterGross(page, '4000')
    expect(await page.locator('.ecc__totals').innerText()).toMatch(/€|EUR/)

    await page.goto(CZECH_CALCULATOR_DE)
    await expect(page.locator('h1')).toContainText(/Tschechien/)
  })

  test('each canonical points at itself and they are different URLs', async ({ page }) => {
    const canonical = async (route: string) => {
      await page.goto(route)
      return page.locator('link[rel=canonical]').getAttribute('href')
    }
    const a = await canonical(ROUTES.de)
    const b = await canonical(CZECH_CALCULATOR_DE)
    expect(a).toContain('/de/arbeitgeberkosten-rechner-deutschland')
    expect(b).toContain('/de/arbeitgeberkosten-rechner-tschechien')
    expect(a).not.toBe(b)
  })
})

test.describe('the page works without the calculator', () => {
  test('the prose renders with JavaScript disabled', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    for (const route of Object.values(ROUTES)) {
      const response = await page.goto(route)
      expect(response?.status(), route).toBe(200)
      await expect(page.locator('h1')).toBeVisible()
      // The substance a crawler and a no-JS reader get: the sourced explanation.
      const text = await page.locator('main').innerText()
      expect(text.length, `${route} has little server-rendered prose`).toBeGreaterThan(2000)
      // The ceilings, in whichever grouping the locale uses: "5 812,50",
      // "5,812.50", "69 750", "69,750".
      expect(text, `${route} does not state a contribution ceiling`).toMatch(
        /5[.,\s]?812|69[.,\s]?750/,
      )
    }
    await context.close()
  })
})

test.describe('responsive and reachable', () => {
  const BREAKPOINTS: Array<[string, number, number]> = [
    ['320', 320, 640],
    ['375', 375, 667],
    ['768', 768, 1024],
    ['1024', 1024, 768],
    ['1440', 1440, 900],
  ]

  for (const [label, width, height] of BREAKPOINTS) {
    test(`no horizontal overflow at ${label}px`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto(ROUTES.de)
      await enterGross(page, '4000')
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      )
      expect(overflow, `horizontal overflow at ${label}px`).toBe(false)
    })
  }

  test('every input has an accessible name', async ({ page }) => {
    await page.goto(ROUTES.de)
    await page.locator('.ecc__advanced summary').click()
    const controls = page.locator('.ecc__form input, .ecc__form select')
    const n = await controls.count()
    expect(n).toBeGreaterThan(8)
    for (let i = 0; i < n; i++) {
      const el = controls.nth(i)
      const name = await el.evaluate((node: HTMLElement) => {
        const id = node.getAttribute('id')
        const label = id ? document.querySelector(`label[for="${id}"]`) : null
        return (
          label?.textContent?.trim() ||
          node.getAttribute('aria-label') ||
          node.closest('label')?.textContent?.trim() ||
          ''
        )
      })
      expect(name.length, `control ${i} has no accessible name`).toBeGreaterThan(0)
    }
  })

  test('the form can be driven from the keyboard alone', async ({ page }) => {
    await page.goto(ROUTES.de)
    await page.locator('#decc-gross').focus()
    await page.keyboard.type('3500')
    await expect(page.locator('.ecc__total-value').first()).toContainText(/\d/)
    expect(page.url()).not.toContain('?')
  })
})

test.describe('refusals reach the reader', () => {
  test('a Midijob salary produces a stated refusal, not a number', async ({ page }) => {
    await page.goto(ROUTES.de)
    await enterGross(page, '1800').catch(() => {})
    const panel = await page.locator('.ecc__results').innerText()
    expect(panel).toMatch(/Übergangsbereich|transition|přechodov/i)
    expect(page.locator('.ecc__total-value')).toHaveCount(0)
  })

  test('a Minijob salary is refused too', async ({ page }) => {
    await page.goto(ROUTES.de)
    await page.locator('#decc-gross').fill('500')
    await expect(page.locator('.ecc__results')).toContainText(/geringfügig|Minijob/i)
  })
})
