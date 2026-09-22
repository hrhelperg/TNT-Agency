import { test, expect } from '@playwright/test'
import {
  ALL_CONCEPTS,
  alternatesFor,
  conceptForRoute,
  hasXDefault,
  urlFor,
} from '../../lib/locale/registry'

/**
 * Head integrity in the LIVE DOM, not in the served HTML.
 *
 * The defect this exists for shipped correct server HTML and broke on
 * hydration: <LocaleAlternates> was a nested component inside <Head>, so its
 * tags were missing from next-head-count, and the client head manager
 * reconciled against the wrong number — duplicating the canonical and removing
 * EVERY hreflang alternate from the DOM. validate-hreflang.mjs reads the built
 * files and was green throughout.
 *
 * The first regression net asserted only that alternates were ABSENT where they
 * should be (the Brazil-only page, the Czech homepage). Both of those assertions
 * still pass if every alternate on the site disappears, which is precisely the
 * failure mode. So this asserts PRESENCE, counted against the registry, and it
 * covers one route of each rendering path — including /en/about-us, the URL the
 * original bug was measured on, and a SeoArticle-rendered Czech page, neither of
 * which any existing suite checked.
 */
const ROUTES = [
  '/',                                   // pages/index.tsx
  '/o-nas',                              // hand-written Czech, 5-member cluster
  '/contact',                            // hand-written Czech, 5-member cluster
  '/prava-a-povinnosti-cizincu',         // SeoArticle
  '/en/about-us',                        // where the bug was measured
  '/de/ueber-uns',
  '/en/recruitment',                     // generated employer page
  '/pt-br',                              // candidate locale root
  '/pt-br/sobre-nos',
  '/pt-br/trabalhar-na-republica-tcheca',
  '/es/trabajar-en-chequia',
  '/pt-br/embaixada-e-consulado-tchecos-no-brasil', // singleton: expects zero
]

test.describe('head integrity', () => {
  for (const route of ROUTES) {
    test(`${route}: one canonical, one description, and every expected alternate`, async ({ page }) => {
      await page.goto(route)

      await expect(page.locator('link[rel="canonical"]'), `${route} canonical`).toHaveCount(1)
      await expect(page.locator('meta[name="description"]'), `${route} description`).toHaveCount(1)
      await expect(page.locator('title'), `${route} title`).toHaveCount(1)

      // Expectation derived from the registry, so a cluster going silent is a
      // failure rather than an absence nobody asserted.
      const concept = conceptForRoute(route)
      const alts = alternatesFor(route)
      const expected = alts.length + (alts.length > 1 && concept && hasXDefault(concept) ? 1 : 0)
      await expect(
        page.locator('link[rel="alternate"][hreflang]'),
        `${route} expected ${expected} hreflang link(s)`,
      ).toHaveCount(expected)
    })
  }

  test('every published candidate page carries its own hreflang set', async ({ page }) => {
    for (const concept of ALL_CONCEPTS) {
      for (const locale of ['pt-BR', 'es'] as const) {
        if (!concept.published.includes(locale)) continue
        const url = urlFor(concept, locale)
        if (!url) continue
        await page.goto(url)
        const alts = alternatesFor(url)
        const expected = alts.length + (alts.length > 1 && hasXDefault(concept) ? 1 : 0)
        await expect(
          page.locator('link[rel="alternate"][hreflang]'),
          `${url} expected ${expected}`,
        ).toHaveCount(expected)
      }
    }
  })

  test('candidate pages carry localized social metadata', async ({ page }) => {
    for (const route of ['/pt-br/trabalhar-na-republica-tcheca', '/es/trabajar-en-chequia']) {
      await page.goto(route)
      const og = (prop: string) => page.locator(`meta[property="${prop}"]`)
      await expect(og('og:title'), `${route} og:title`).toHaveCount(1)
      await expect(og('og:description'), `${route} og:description`).toHaveCount(1)
      await expect(og('og:url'), `${route} og:url`).toHaveCount(1)
      await expect(og('og:locale'), `${route} og:locale`).toHaveCount(1)
      const locale = await og('og:locale').getAttribute('content')
      expect(locale, `${route} og:locale value`).toBe(route.startsWith('/pt-br') ? 'pt_BR' : 'es_LA')
      // JSON-LD must not declare the site Czech on a non-Czech page.
      const ld = await page.locator('script[type="application/ld+json"]').allTextContents()
      const site = ld.map((x) => JSON.parse(x)).find((x) => x['@type'] === 'WebSite')
      expect(site?.inLanguage, `${route} WebSite inLanguage`).toBe(
        route.startsWith('/pt-br') ? 'pt-BR' : 'es',
      )
    }
  })
})
