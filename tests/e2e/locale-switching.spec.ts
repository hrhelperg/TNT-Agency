import { test, expect, type Page, type BrowserContext } from '@playwright/test'
import {
  LOCALE_CONCEPTS,
  urlFor,
  alternatesFor,
  type Locale,
} from '../../lib/locale/registry'
import { CHROME_ARIA, footerTarget, resolveNavHref } from '../../lib/locale/chrome'

/**
 * Locale L0 corrective pass — acceptance.
 *
 * Every assertion here corresponds to a defect found in post-merge production
 * verification. They are browser tests rather than markup checks because each
 * defect was a difference between what the server sent and what the visitor
 * ended up looking at.
 */

const LOCALES: Locale[] = ['cs', 'en', 'de']

/**
 * Answer the consent banner before anything else.
 *
 * It is fixed to the bottom of the viewport and, on a phone, sits over the
 * mobile navigation — so it intercepts clicks on the language control and every
 * switcher test times out waiting for a link it can see but cannot reach. The
 * other specs already do this; leaving it out made a working switcher look
 * broken on mobile only.
 */
const CONSENT_KEY = 'cookie_consent'
const answerConsent = async (target: Page | BrowserContext) => {
  await target.addInitScript(() => { try { window.localStorage.setItem('cookie_consent', 'rejected') } catch {} })
}

test.beforeEach(async ({ page }) => { await answerConsent(page) })
const CONCEPTS = LOCALE_CONCEPTS.filter((c) => alternatesFor(urlFor(c, 'cs')!).length >= 2)

/**
 * Clear storage ONCE, for the current origin.
 *
 * Deliberately not page.addInitScript: that re-runs before every navigation in
 * the context, so it wipes the very preference a switcher click just wrote and
 * makes a working implementation look broken.
 */
const clean = async (page: Page) => {
  await page.context().clearCookies()
  if (new URL(page.url() || 'about:blank').protocol === 'about:') {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
  }
  await page.evaluate((keep) => {
    try {
      localStorage.clear()
      localStorage.setItem(keep, 'rejected')
    } catch {}
  }, CONSENT_KEY)
}
const stored = (page: Page) => page.evaluate(() => { try { return localStorage.getItem('tnt-lang') } catch { return null } })

/**
 * The visible switcher control for a locale.
 *
 * The header copy is hidden below 900px, matching the legacy widget beside it,
 * and the mobile navigation carries its own. A test that only ever clicked the
 * header copy would pass on desktop and time out on a phone — which is exactly
 * what happened.
 */
const switcherLink = async (page: Page, to: string) => {
  // Decide by the HEADER copy's visibility, exactly as the existing specs do
  // for the legacy widget. Playwright reports the closed mobile menu's links as
  // ":visible" even though a hero graphic sits over them, so filtering on
  // :visible alone silently picks an unclickable element and times out.
  const header = page.locator(`.locale-switcher--header a[data-locale-choice="${to}"]`).first()
  if (await header.isVisible().catch(() => false)) return header
  const burger = page.locator('#burger')
  if (await burger.isVisible().catch(() => false)) await burger.click()
  return page.locator(`.locale-switcher--mobile a[data-locale-choice="${to}"]`).first()
}

test.describe('switcher: page-to-equivalent-page in all six directions', () => {
  for (const from of LOCALES) {
    test(`from ${from}: every concept reaches both other locales`, async ({ page }) => {
      const failures: string[] = []
      let navigations = 0
      for (const concept of CONCEPTS) {
        const origin = urlFor(concept, from)!
        for (const to of LOCALES) {
          if (to === from) continue
          const expected = urlFor(concept, to)!
          await clean(page)
          await page.goto(origin, { waitUntil: 'domcontentloaded' })
          const link = await switcherLink(page, to)
          if (await link.count() === 0) { failures.push(`${origin}: no visible ${to} control`); continue }
          await Promise.all([page.waitForURL(`**${expected}`, { timeout: 15000 }).catch(() => {}), link.click()])
          const landed = new URL(page.url()).pathname
          if (landed !== expected) { failures.push(`${origin} -[${to}]-> ${landed}, expected ${expected}`); continue }
          navigations++
          // Destination must be in the language it claims, with matching chrome.
          const lang = await page.getAttribute('html', 'lang')
          if (lang !== to) failures.push(`${expected}: html lang=${lang}`)
          const nav = await page.locator('nav.nav').getAttribute('aria-label')
          if (nav !== CHROME_ARIA[to].mainNav) failures.push(`${expected}: chrome not ${to} (nav label "${nav}")`)
          // An explicit click IS a choice and must be remembered.
          if (await stored(page) !== to) failures.push(`${expected}: explicit choice not persisted (tnt-lang=${await stored(page)})`)
        }
      }
      expect(failures, failures.join('\n')).toEqual([])
      // The matrix is 10 concepts x 2 destinations per origin locale; three
      // origin locales make 60. Asserting the count stops a silently skipped
      // concept from passing as "no failures".
      expect(navigations, `expected 20 successful navigations from ${from}`).toBe(CONCEPTS.length * 2)
      expect(CONCEPTS.length).toBe(10)
    })
  }

  test('no locale-home fallback: a switcher never points at a bare locale root from a subpage', async ({ page }) => {
    for (const concept of CONCEPTS) {
      if (concept.id === 'home') continue
      for (const locale of LOCALES) {
        await page.goto(urlFor(concept, locale)!, { waitUntil: 'domcontentloaded' })
        const hrefs = await page.locator('.locale-switcher--header a, .locale-switcher--mobile a').evaluateAll((as) =>
          as.map((a) => new URL((a as HTMLAnchorElement).getAttribute('href')!, location.origin).pathname))
        expect(hrefs, `${urlFor(concept, locale)}`).not.toContain('/en')
        expect(hrefs, `${urlFor(concept, locale)}`).not.toContain('/de')
      }
    }
  })

  test('collapsed Czech variants offer no switcher at all', async ({ page }) => {
    for (const concept of LOCALE_CONCEPTS) {
      for (const variant of concept.csCollapsed ?? []) {
        await page.goto(variant, { waitUntil: 'domcontentloaded' })
        await expect(page.locator('.locale-switcher'), variant).toHaveCount(0)
      }
    }
  })
})

test.describe('language preference: URL is not a choice, clicking is', () => {
  test('direct navigation to a locale page stores nothing', async ({ browser }) => {
    // A genuinely new visitor, per route. The earlier version cleared storage
    // after loading '/', which races the client script writing its default
    // there — the test then read 'cs' and blamed the locale page for it.
    // A fresh context never touches the Czech spine at all.
    for (const route of ['/en', '/de', '/en/for-employers', '/de/fuer-arbeitgeber']) {
      const ctx = await browser.newContext()
      await answerConsent(ctx)
      const p = await ctx.newPage()
      await p.goto(route, { waitUntil: 'networkidle' })
      await p.waitForTimeout(500)
      const value = await p.evaluate(() => { try { return localStorage.getItem('tnt-lang') } catch { return null } })
      expect(value, `${route} treated arrival as a preference`).toBeNull()
      await ctx.close()
    }
  })

  test('a stale stored preference cannot change a locale page', async ({ page }) => {
    await clean(page)
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => localStorage.setItem('tnt-lang', 'cs'))
    await page.goto('/en/for-employers', { waitUntil: 'networkidle' })
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('nav.nav')).toHaveAttribute('aria-label', CHROME_ARIA.en.mainNav)
    expect(await stored(page), 'locked page overwrote the stored preference').toBe('cs')
  })

  test('EN -> CS through the switcher yields a Czech page in Czech chrome', async ({ page }) => {
    await clean(page)
    // Arrive with an English preference already stored, the case that used to
    // leave the Czech destination wearing English chrome.
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await page.evaluate(() => localStorage.setItem('tnt-lang', 'en'))
    await page.goto('/en/for-employers', { waitUntil: 'domcontentloaded' })
    await (await switcherLink(page, 'cs')).click()
    await page.waitForURL('**/pro-zamestnavatele')
    await page.waitForLoadState('networkidle')
    expect(await stored(page)).toBe('cs')
    await expect(page.locator('html')).toHaveAttribute('lang', 'cs')
    await expect(page.locator('.nav a').first()).toHaveText('Úvod')
  })

  test('CS -> DE through the switcher navigates and remembers', async ({ page }) => {
    await clean(page)
    await page.goto('/pro-zamestnavatele', { waitUntil: 'domcontentloaded' })
    await (await switcherLink(page, 'de')).click()
    await page.waitForURL('**/de/fuer-arbeitgeber')
    expect(await stored(page)).toBe('de')
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  })
})

test.describe('no Czech flash: JS off and JS on agree', () => {
  const REGIONS = ['.eco-bar', 'header .nav', '.mobile-nav', 'main h1', 'main', '.locale-cta', 'footer', '.locale-switcher']

  for (const concept of LOCALE_CONCEPTS) {
    for (const locale of concept.published.filter((l) => l !== 'cs')) {
      const route = urlFor(concept, locale)!
      test(`${route} renders identically without JavaScript`, async ({ browser }) => {
        const off = await browser.newContext({ javaScriptEnabled: false })
        await answerConsent(off)
        const p1 = await off.newPage()
        await p1.goto(route, { waitUntil: 'domcontentloaded' })
        const before: Record<string, string> = {}
        for (const sel of REGIONS) {
          before[sel] = await p1.locator(sel).first().innerText().catch(() => '(absent)')
        }
        await off.close()

        const on = await browser.newContext()
        await answerConsent(on)
        const p2 = await on.newPage()
        await p2.goto(route, { waitUntil: 'networkidle' })
        await p2.waitForTimeout(900)
        for (const sel of REGIONS) {
          const after = await p2.locator(sel).first().innerText().catch(() => '(absent)')
          expect(after, `${route} ${sel} changed after hydration`).toBe(before[sel])
        }
        await on.close()
      })
    }
  }
})

test.describe('accessibility and legal links', () => {
  test('no language group is announced without controls', async ({ page }) => {
    for (const concept of CONCEPTS) {
      for (const locale of LOCALES) {
        await page.goto(urlFor(concept, locale)!, { waitUntil: 'domcontentloaded' })
        const groups = page.locator('[role="group"].lang-select')
        for (let i = 0; i < await groups.count(); i++) {
          const controls = await groups.nth(i).locator('a, button').count()
          expect(controls, `${urlFor(concept, locale)} empty language group`).toBeGreaterThan(0)
        }
      }
    }
  })

  test('every legal footer link resolves to the page for its own locale', async ({ page, request }) => {
    const failures: string[] = []
    let checked = 0
    for (const concept of LOCALE_CONCEPTS) {
      for (const locale of concept.published.filter((l) => l !== 'cs')) {
        const route = urlFor(concept, locale)!
        await page.goto(route, { waitUntil: 'domcontentloaded' })
        for (const key of ['terms', 'priv', 'cook'] as const) {
          const { href, hreflang } = resolveNavHref(footerTarget(key), locale)
          const a = page.locator(`.footer__legal a[href="${href}"]`)
          if (await a.count() === 0) { failures.push(`${route}: no legal link to ${href}`); continue }
          if (hreflang) failures.push(`${route}: ${key} fell back to Czech`)
          if (await a.first().getAttribute('hreflang')) failures.push(`${route}: ${key} declares a foreign hreflang`)
          const res = await request.get(href)
          if (res.status() !== 200) { failures.push(`${route}: ${href} -> ${res.status()}`); continue }
          const lang = (await res.text()).match(/<html[^>]*lang="([^"]+)"/)?.[1]
          if (lang !== locale) failures.push(`${route}: ${key} -> ${href} is lang=${lang}, expected ${locale}`)
          checked++
        }
      }
    }
    expect(failures, failures.join('\n')).toEqual([])
    // 10 EN + 10 DE pages, three legal links each.
    expect(checked, 'legal links verified end to end').toBe(60)
  })

  test('about-us publishes no identifier it does not have, in any locale', async ({ page }) => {
    // Item 12 acceptance, done the way the original check should have been:
    // against RENDERED TEXT. The check that let this defect ship ran over raw
    // HTML and matched build-asset hashes.
    const claims = {
      '/o-nas': /ověření probíhá|záměrně nezveřejňujeme/,
      '/en/about-us': /not stated as fact until|only details we have verified/i,
      '/de/ueber-uns': /nicht als Tatsache|nur, was wir überprüft haben/i,
    }
    for (const [route, mustSay] of Object.entries(claims)) {
      await page.goto(route, { waitUntil: 'networkidle' })
      const text = await page.locator('body').innerText()

      // No identifier-shaped token in what a reader actually sees.
      expect(text.match(/(?<!\d)\d{8}(?!\d)/g) ?? [], `${route} renders an 8-digit identifier`).toEqual([])

      // And no claim that identifiers ARE published.
      expect(text, `${route}`).not.toMatch(/we publish the identifiers/i)
      expect(text, `${route}`).not.toMatch(/veröffentlichen die für diese Prüfung nötigen Kennungen/i)

      // Each locale states the withholding, in its own language.
      expect(text, `${route} must state the identifiers are pending`).toMatch(mustSay)
    }

    // The companion proof — that reading RAW HTML produces a false positive —
    // is a unit test (lib/locale/about-truthfulness.test.ts) against a fixed
    // string. Asserting it here would depend on whether this particular build's
    // asset hashes happen to contain an 8-digit run, which is a property of the
    // bundler, not of the page.
  })
})

test.describe('conversion path parity', () => {
  for (const locale of ['en', 'de'] as const) {
    const concept = LOCALE_CONCEPTS.find((c) => c.id === 'request-staff')!
    const route = urlFor(concept, locale)!
    test(`${route} serves a working request form`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' })
      await expect(page.locator('main form')).toHaveCount(1)
      const cs = { input: 12, select: 9, textarea: 4 }
      for (const [tag, n] of Object.entries(cs)) {
        await expect(page.locator(`main form ${tag}`), `${tag} count`).toHaveCount(n)
      }
      // The form is in the page's language before any interaction, and stays so.
      const first = await page.locator('main form label').first().innerText()
      expect(first).not.toMatch(/[ěščřžýáíéůú]/i)
      await page.waitForTimeout(700)
      expect(await page.locator('main form label').first().innerText()).toBe(first)
    })
  }
})
