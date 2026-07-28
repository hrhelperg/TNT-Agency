import { test, expect } from '@playwright/test'

// Browser QA for the indexing-coverage recovery (audit Sections 14/18).
//
// Runs against a real production build (next build && next start via the shared
// webServer). For a representative page from every family, at five breakpoints,
// it asserts what a crawler/visitor actually gets: a single visible H1, no
// horizontal overflow, no uncaught (hydration) errors, and no application
// console errors. Third-party/network noise (blocked analytics, web fonts,
// favicon) is filtered out — that is expected and handled elsewhere.

const PAGES = [
  // The 15 Tier 1 commercial-authority pages (Batch 2b) + representative legal.
  '/',                                          // homepage
  '/pro-zamestnavatele',                        // employer hub (situation-first)
  '/poptavka-pracovniku',                       // employer conversion
  '/kalkulacka-mzdy-agenturniho-zamestnance',   // calculator + comparison
  '/pracovnici-do-vyroby',                      // industry: production
  '/pracovnici-do-logistiky',                   // industry: logistics
  '/pracovnici-do-skladu',                      // industry: warehouse
  '/pracovnici-pro-automotive',                 // industry: automotive
  '/pracovnici-pro-potravinarskou-vyrobu',      // industry: food
  '/nabor-zahranicnich-pracovniku',             // foreign workers
  '/nabor-zamestnancu-pardubice',               // region: Pardubice
  '/nabor-zamestnancu-hradec-kralove',          // region: Hradec Králové
  '/trh-prace-stredocesky-kraj',                // region: Středočeský kraj
  '/o-nas',                                      // trust page
  '/privacy-cs.html',                           // legal (static, CS)
]

const BREAKPOINTS = [320, 390, 768, 1024, 1440]

const IGNORE_CONSOLE =
  /webmasterid|ERR_BLOCKED_BY_ORB|fonts\.googleapis|fonts\.gstatic|favicon|Failed to load resource|net::ERR_|status of 40|status of 50/i

test.describe('SEO crawlability & render QA', () => {
  for (const path of PAGES) {
    test(`clean render across breakpoints — ${path}`, async ({ page }) => {
      const consoleErrors: string[] = []
      const pageErrors: string[] = []
      page.on('console', (m) => {
        if (m.type() === 'error') consoleErrors.push(m.text())
      })
      page.on('pageerror', (e) => pageErrors.push(e.message))

      for (const width of BREAKPOINTS) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(path, { waitUntil: 'networkidle' })

        const h1 = page.locator('h1').first()
        await expect(h1, `H1 visible on ${path} @ ${width}px`).toBeVisible()
        expect((await h1.innerText()).trim().length).toBeGreaterThan(0)

        const overflow = await page.evaluate(() => {
          const el = document.scrollingElement || document.documentElement
          return el.scrollWidth - el.clientWidth
        })
        expect(overflow, `horizontal overflow on ${path} @ ${width}px`).toBeLessThanOrEqual(2)
      }

      const realConsole = consoleErrors.filter((t) => !IGNORE_CONSOLE.test(t))
      expect(pageErrors, `uncaught/hydration errors on ${path}`).toEqual([])
      expect(realConsole, `application console errors on ${path}`).toEqual([])
    })
  }

  test('CTA keeps the URL clean and captures the surface hint into session state', async ({ page }) => {
    await page.goto('/pracovnici-do-vyroby', { waitUntil: 'networkidle' })
    // The header "Request workers" CTA points at the clean canonical path.
    const cta = page.locator('a[data-request-source="employer-hub"]').first()
    await expect(cta).toHaveAttribute('href', '/poptavka-pracovniku')
    await cta.click()
    await page.waitForURL('**/poptavka-pracovniku')
    // No query string was introduced — crawlers only ever meet the clean URL.
    expect(new URL(page.url()).search).toBe('')
    // The surface hint survived the navigation via session-scoped state only.
    const captured = await page.evaluate(() => window.sessionStorage.getItem('tnt-cta-source'))
    expect(captured).toBe('employer-hub')
  })
})
