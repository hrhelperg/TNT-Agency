import { test, expect, type Page, type Request } from '@playwright/test'

/**
 * Browser QA for the Czech employer-cost calculator, on all three locale routes.
 *
 * Runs against the real production build via the shared webServer, because the
 * things being checked here — server-rendered prose, no-JS content, consent
 * gating, what actually crosses the network — all behave differently under the
 * dev server's double-invocation.
 *
 * What this suite is for, in order of importance:
 *
 *   1. PRIVACY. The unit suite reads the source and proves no transmission was
 *      written. This watches the wire and proves none happens — including from
 *      code the unit test cannot see, such as a framework prefetch carrying a
 *      URL that a value had leaked into. Salary, disability and ZTP/P are the
 *      inputs; the last two are GDPR Art. 9 data.
 *   2. ONE ENGINE, THREE LANGUAGES. The same gross must produce the same koruna
 *      figures on /kalkulacka-nakladu-zamestnavatele, /en/… and /de/…. If a
 *      locale ever reached the arithmetic, this is where it shows.
 *   3. The page works without JavaScript, and on a phone, and from a keyboard.
 */

const ROUTES = {
  cs: '/kalkulacka-nakladu-zamestnavatele',
  en: '/en/czech-employer-cost-calculator',
  de: '/de/arbeitgeberkosten-rechner-tschechien',
} as const

/** Digits only, so "53 520 Kč" / "CZK 53,520" / "53.520 CZK" compare equal. */
const digits = (s: string) => s.replace(/[^0-9]/g, '')

async function enterGross(page: Page, value: string) {
  const input = page.locator('#ecc-gross')
  await input.fill(value)
  // The result is derived synchronously from React state; wait for the region
  // to carry a number rather than for a fixed delay.
  await expect(page.locator('.ecc__total-value').first()).toContainText(/\d/)
}

test.describe('privacy — nothing typed here leaves the browser', () => {
  for (const [locale, route] of Object.entries(ROUTES)) {
    test(`${locale}: no request ever carries a salary or a tax-profile value`, async ({ page }) => {
      const suspicious: string[] = []
      const record = (req: Request) => {
        const url = req.url()
        const body = req.postData() ?? ''
        // The distinctive values typed below. 137913 is a salary no other part
        // of the site would emit; ztpp/disability are the Art. 9 fields.
        for (const needle of ['137913', 'ztpp', 'disability', 'invalid']) {
          if (url.includes(needle) || body.includes(needle)) {
            suspicious.push(`${req.method()} ${url} ${body.slice(0, 200)}`)
          }
        }
      }
      page.on('request', record)

      await page.goto(route, { waitUntil: 'networkidle' })
      await enterGross(page, '137913')

      // Open the advanced panel and set the special-category fields.
      await page.locator('.ecc__advanced > summary').click()
      await page.locator('#ecc-disability').selectOption('third')
      await page.locator('#ecc-children').selectOption('2')
      await page.waitForTimeout(400)

      expect(suspicious, `requests carrying entered data:\n${suspicious.join('\n')}`).toEqual([])
    })

    test(`${locale}: the URL never gains a query string, fragment or history entry`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' })
      const before = page.url()
      await enterGross(page, '137913')
      await page.locator('.ecc__advanced > summary').click()
      await page.locator('#ecc-children').selectOption('3')
      await page.waitForTimeout(300)

      expect(page.url()).toBe(before)
      expect(page.url()).not.toContain('?')
      expect(page.url()).not.toContain('#')
      // Pressing Enter in the form must not submit it into a query string.
      await page.locator('#ecc-gross').press('Enter')
      await page.waitForTimeout(200)
      expect(page.url()).toBe(before)
    })

    test(`${locale}: writes nothing to browser storage`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' })
      await enterGross(page, '137913')
      const stored = await page.evaluate(() => ({
        local: Object.keys(window.localStorage),
        session: Object.keys(window.sessionStorage),
        cookie: document.cookie,
      }))
      const all = [...stored.local, ...stored.session].join(' ') + ' ' + stored.cookie
      expect(all).not.toContain('137913')
      // No key the calculator could have written. Consent keys may exist.
      expect(stored.local.filter((k) => /ecc|calc|payroll|salary/i.test(k))).toEqual([])
      expect(stored.session.filter((k) => /ecc|calc|payroll|salary/i.test(k))).toEqual([])
    })
  }
})

test.describe('one engine, three languages', () => {
  test('the same gross produces identical koruna figures in cs, en and de', async ({ page }) => {
    const readings: Record<string, { statutory: string; net: string }> = {}

    for (const [locale, route] of Object.entries(ROUTES)) {
      await page.goto(route, { waitUntil: 'networkidle' })
      await enterGross(page, '40000')
      const totals = page.locator('.ecc__total-value')
      readings[locale] = {
        statutory: digits(await totals.nth(0).innerText()),
        net: digits(await totals.nth(1).innerText()),
      }
    }

    // Hand-verified from the statute: 40 000 + 9 920 + 3 600 = 53 520 employer
    // cost; 40 000 − 2 840 − 1 800 − 3 430 = 31 930 net.
    expect(readings.cs.statutory).toBe('53520')
    expect(readings.cs.net).toBe('31930')

    expect(readings.en).toEqual(readings.cs)
    expect(readings.de).toEqual(readings.cs)
  })

  test('each page states its jurisdiction and year', async ({ page }) => {
    const stamps: Record<string, RegExp> = {
      cs: /Česká republika · 2026/,
      en: /Czech Republic · 2026/,
      de: /Tschechische Republik · 2026/,
    }
    for (const [locale, route] of Object.entries(ROUTES)) {
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      await expect(page.locator('.ecc__stamp')).toHaveText(stamps[locale])
    }
  })

  // §37: a German reader must never take this for German payroll law.
  test('the German page names Czechia in its title, H1 and lead', async ({ page }) => {
    await page.goto(ROUTES.de, { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveTitle(/Tschechien/)
    await expect(page.locator('h1')).toHaveText(/Tschechien/)
    const intro = await page.locator('.page-hero__sub').first().innerText()
    expect(intro).toMatch(/tschechisch|Tschechische Republik/i)
  })
})

test.describe('the statutory rules a visitor can see', () => {
  test('a salary below the minimum wage charges the top-up to the employee, not the employer', async ({ page }) => {
    await page.goto(ROUTES.cs, { waitUntil: 'networkidle' })
    await enterGross(page, '10000')

    const body = await page.locator('.pcalc__results').innerText()
    // Employer statutory cost 10 000 + 2 480 + 900 = 13 380 — unchanged by the
    // shortfall. The naive max(gross, minimum) × 9 % would make it 14 496.
    expect(digits(await page.locator('.ecc__total-value').nth(0).innerText())).toBe('13380')

    // The payer must be stated in the result, not merely implied by the numbers.
    expect(body).toContain('ZAMĚSTNANEC SÁM')
    expect(body).toContain('§ 3 odst. 10')
    expect(body).toContain('nezvyšuje')
    // And the employee's side carries it as a deduction, labelled as such.
    expect(body).toContain('Doplatek do minimálního základu (hradí zaměstnanec)')
  })

  test('a low salary with three children pays a tax bonus and net exceeds gross', async ({ page }) => {
    await page.goto(ROUTES.cs, { waitUntil: 'networkidle' })
    await enterGross(page, '20000')
    await page.locator('.ecc__advanced > summary').click()
    await page.locator('#ecc-children').selectOption('3')
    await page.waitForTimeout(200)

    // net 22 373 > gross 20 000, because 5 017 CZK of bonus is paid out.
    expect(digits(await page.locator('.ecc__total-value').nth(1).innerText())).toBe('22373')
  })

  test('the simple mode says out loud that it assumes the annual maximum is unreached', async ({ page }) => {
    await page.goto(ROUTES.cs, { waitUntil: 'networkidle' })
    await enterGross(page, '200000')
    await expect(page.locator('.ecc__notes')).toContainText(/maximálního vyměřovacího základu/)
  })

  test('the exactness notice never promises a guaranteed result', async ({ page }) => {
    for (const route of Object.values(ROUTES)) {
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      const text = await page.locator('.ecc__exactness').innerText()
      expect(text).not.toMatch(/100\s*%/)
      expect(text.toLowerCase()).not.toMatch(/guarantee|garantiert|zaruč/)
    }
  })
})

test.describe('the page works without the calculator', () => {
  test('with JavaScript disabled the explanation is still served', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto(ROUTES.cs, { waitUntil: 'domcontentloaded' })

    // The article is server-rendered: headings, the statute references and the
    // sources are all present without a line of script running.
    const text = await page.locator('main').innerText()
    expect(text).toContain('Minimální vyměřovací základ')
    expect(text).toContain('§ 38h')
    expect(text.length).toBeGreaterThan(3000)
    await expect(page.locator('h1')).toBeVisible()
    await context.close()
  })
})

test.describe('responsive and accessible', () => {
  const BREAKPOINTS: Array<[string, number, number]> = [
    ['320', 320, 640],
    ['375', 375, 667],
    ['768', 768, 1024],
    ['1440', 1440, 900],
  ]

  for (const [name, width, height] of BREAKPOINTS) {
    test(`no horizontal overflow at ${name}px`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto(ROUTES.cs, { waitUntil: 'networkidle' })
      await enterGross(page, '48967')
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow, `${name}px overflows by ${overflow}px`).toBeLessThanOrEqual(1)
    })
  }

  test('every input has an accessible label', async ({ page }) => {
    await page.goto(ROUTES.cs, { waitUntil: 'networkidle' })
    await page.locator('.ecc__advanced > summary').click()

    const controls = page.locator('.ecc input:not([type=checkbox]), .ecc select')
    const count = await controls.count()
    expect(count).toBeGreaterThan(5)
    for (let i = 0; i < count; i++) {
      const el = controls.nth(i)
      const id = await el.getAttribute('id')
      const aria = await el.getAttribute('aria-label')
      if (aria) continue
      expect(id, 'a control has neither id nor aria-label').toBeTruthy()
      await expect(page.locator(`label[for="${id}"]`)).toHaveCount(1)
    }
  })

  test('the form is reachable and operable from the keyboard', async ({ page }) => {
    await page.goto(ROUTES.cs, { waitUntil: 'networkidle' })
    await page.locator('#ecc-gross').focus()
    await page.keyboard.type('40000')
    await expect(page.locator('.ecc__total-value').first()).toContainText(/\d/)

    // The advanced disclosure opens with the keyboard alone.
    await page.locator('.ecc__advanced > summary').focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('#ecc-disability')).toBeVisible()
  })

  test('results are announced to assistive technology', async ({ page }) => {
    await page.goto(ROUTES.cs, { waitUntil: 'networkidle' })
    const region = page.locator('.pcalc__results')
    await expect(region).toHaveAttribute('aria-live', 'polite')
    await expect(region).toHaveAttribute('role', 'region')
  })

  test('the consent banner does not cover the calculator on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto(ROUTES.cs, { waitUntil: 'networkidle' })
    const banner = page.locator('#cookie-consent, .cookie-consent').first()
    if (await banner.count()) {
      const bannerBox = await banner.boundingBox()
      const grossBox = await page.locator('#ecc-gross').boundingBox()
      if (bannerBox && grossBox) {
        const overlaps =
          grossBox.y < bannerBox.y + bannerBox.height && grossBox.y + grossBox.height > bannerBox.y
        expect(overlaps, 'the consent banner covers the gross-salary field').toBe(false)
      }
    }
  })
})

test.describe('cross-link to Cost of Vacancy carries nothing', () => {
  test('is a clean canonical path in every locale', async ({ page }) => {
    const expected: Record<string, string> = {
      cs: '/cena-neobsazene-pozice',
      en: '/en/cost-of-vacancy',
      de: '/de/kosten-unbesetzter-stellen',
    }
    for (const [locale, route] of Object.entries(ROUTES)) {
      await page.goto(route, { waitUntil: 'networkidle' })
      await enterGross(page, '40000')
      const href = await page.locator('.ecc__crosslink a').getAttribute('href')
      expect(href).toBe(expected[locale])
    }
  })
})
