import { test, expect, type Page } from '@playwright/test'
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
  await page.evaluate(() => { try { localStorage.clear() } catch {} })
}
const stored = (page: Page) => page.evaluate(() => { try { return localStorage.getItem('tnt-lang') } catch { return null } })

test.describe('switcher: page-to-equivalent-page in all six directions', () => {
  for (const from of LOCALES) {
    test(`from ${from}: every concept reaches both other locales`, async ({ page }) => {
      const failures: string[] = []
      for (const concept of CONCEPTS) {
        const origin = urlFor(concept, from)!
        for (const to of LOCALES) {
          if (to === from) continue
          const expected = urlFor(concept, to)!
          await clean(page)
          await page.goto(origin, { waitUntil: 'domcontentloaded' })
          const link = page.locator(`.locale-switcher a[data-locale-choice="${to}"]`).first()
          if (await link.count() === 0) { failures.push(`${origin}: no ${to} control`); continue }
          await Promise.all([page.waitForURL(`**${expected}`, { timeout: 15000 }).catch(() => {}), link.click()])
          const landed = new URL(page.url()).pathname
          if (landed !== expected) { failures.push(`${origin} -[${to}]-> ${landed}, expected ${expected}`); continue }
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
    })
  }

  test('no locale-home fallback: a switcher never points at a bare locale root from a subpage', async ({ page }) => {
    for (const concept of CONCEPTS) {
      if (concept.id === 'home') continue
      for (const locale of LOCALES) {
        await page.goto(urlFor(concept, locale)!, { waitUntil: 'domcontentloaded' })
        const hrefs = await page.locator('.locale-switcher a').evaluateAll((as) =>
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
  test('direct navigation to a locale page stores nothing', async ({ page }) => {
    for (const route of ['/en', '/de', '/en/for-employers', '/de/fuer-arbeitgeber']) {
      await clean(page)
      await page.goto(route, { waitUntil: 'networkidle' })
      expect(await stored(page), `${route} treated arrival as a preference`).toBeNull()
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
    await page.locator('.locale-switcher a[data-locale-choice="cs"]').first().click()
    await page.waitForURL('**/pro-zamestnavatele')
    await page.waitForLoadState('networkidle')
    expect(await stored(page)).toBe('cs')
    await expect(page.locator('html')).toHaveAttribute('lang', 'cs')
    await expect(page.locator('.nav a').first()).toHaveText('Úvod')
  })

  test('CS -> DE through the switcher navigates and remembers', async ({ page }) => {
    await clean(page)
    await page.goto('/pro-zamestnavatele', { waitUntil: 'domcontentloaded' })
    await page.locator('.locale-switcher a[data-locale-choice="de"]').first().click()
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
        const p1 = await off.newPage()
        await p1.goto(route, { waitUntil: 'domcontentloaded' })
        const before: Record<string, string> = {}
        for (const sel of REGIONS) {
          before[sel] = await p1.locator(sel).first().innerText().catch(() => '(absent)')
        }
        await off.close()

        const on = await browser.newContext()
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
        }
      }
    }
    expect(failures, failures.join('\n')).toEqual([])
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
