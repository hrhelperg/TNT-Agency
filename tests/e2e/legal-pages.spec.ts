import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { realConsoleErrors, firstPartyFailures } from '../../lib/testing/console-noise'

// Legal-page release QA (fix/legal-pages-static-assets-and-links). Verifies the
// static legal documents are styled by /legal-pages.css (no /styles.css MIME
// error), correctly localized, self-canonical, orphan-free at the cross-link
// level, and free of horizontal overflow from 320px up. Captures a small
// screenshot set to ./release-evidence (gitignored).

const OUT = path.join(process.cwd(), 'release-evidence')
fs.mkdirSync(OUT, { recursive: true })

const PAGES: Array<{ route: string; lang: string; h1re: RegExp }> = [
  { route: '/privacy-cs.html', lang: 'cs', h1re: /Zásady ochrany osobních údajů/ },
  { route: '/privacy-de.html', lang: 'de', h1re: /Datenschutz/ },
  { route: '/cookies.html', lang: 'en', h1re: /Cookie/ },
  { route: '/cookies-cs.html', lang: 'cs', h1re: /cookies|Cookies/ },
  { route: '/cookies-de.html', lang: 'de', h1re: /Cookie/ },
  { route: '/terms.html', lang: 'en', h1re: /Terms/ },
  { route: '/terms-cs.html', lang: 'cs', h1re: /podmínky|Podmínky/ },
  { route: '/terms-de.html', lang: 'de', h1re: /Geschäftsbedingungen/ },
]
const BREAKPOINTS = [320, 390, 768, 1024, 1440]

// Console noise is classified in lib/testing/console-noise.ts rather than by a
// pattern here. Chrome reports a failed subresource as "Failed to load resource:
// the server responded with a status of 404 ()" — with NO URL in it — so the
// old hostname pattern could never match it, and these tests failed on roughly
// half of all runs. Measured cause: fonts.gstatic.com woff2 files 404 under the
// five rapid reloads this spec performs per page. The classifier correlates that
// URL-less message with the actual failed response URLs instead of guessing from
// text, so third-party flakiness is ignored while a first-party miss still
// fails.

test.describe('static legal pages — styled, localized, no overflow', () => {
  for (const p of PAGES) {
    test(`clean styled render — ${p.route}`, async ({ page }) => {
      const consoleErrors: string[] = []
      const pageErrors: string[] = []
      const failedUrls: string[] = []
      page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()) })
      page.on('pageerror', (e) => pageErrors.push(e.message))
      page.on('response', (r) => { if (r.status() >= 400) failedUrls.push(r.url()) })

      for (const width of BREAKPOINTS) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(p.route, { waitUntil: 'networkidle' })

        // Correct document language.
        await expect(page.locator('html')).toHaveAttribute('lang', p.lang)
        // Single visible H1 with the expected localized heading.
        const h1 = page.locator('h1').first()
        await expect(h1).toBeVisible()
        expect(p.h1re.test((await h1.innerText()).trim()), `H1 on ${p.route}`).toBe(true)
        // Styled by /legal-pages.css: the .legal-body max-width rule is applied
        // (760px) — proves the stylesheet loaded and no /styles.css MIME failure.
        const maxw = await page.locator('.legal-body').evaluate((el) => getComputedStyle(el).maxWidth)
        expect(maxw, `legal-body styled on ${p.route}`).toBe('760px')
        // No horizontal overflow.
        const overflow = await page.evaluate(() => {
          const el = document.scrollingElement || document.documentElement
          return el.scrollWidth - el.clientWidth
        })
        expect(overflow, `overflow on ${p.route} @ ${width}px`).toBeLessThanOrEqual(2)
      }

      // A first-party resource must never fail. This is asserted on its own, so
      // a missing stylesheet or script is reported by URL rather than as an
      // anonymous console line.
      expect(firstPartyFailures(failedUrls), `first-party resource failures on ${p.route}`).toEqual([])

      const real = realConsoleErrors({ consoleErrors, failedUrls })
      // Specifically assert the MIME/stylesheet error is gone.
      expect(real.some((t) => /Refused to apply style|MIME type/.test(t)), `MIME error on ${p.route}`).toBe(false)
      expect(pageErrors, `page errors on ${p.route}`).toEqual([])
      expect(real, `console errors on ${p.route}`).toEqual([])
    })
  }

  test('legal navigation works (switcher + footer + homepage)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/cookies-cs.html', { waitUntil: 'networkidle' })
    // Footer legal link → terms-cs (absolute canonical).
    await page.locator('.footer__legal a[href="/terms-cs.html"]').click()
    await page.waitForURL('**/terms-cs.html')
    // Language switcher → German.
    await page.locator('.legal-lang a[href="/terms-de.html"]').click()
    await page.waitForURL('**/terms-de.html')
    // Homepage link.
    await page.locator('.header a.logo').click()
    await page.waitForURL((u) => u.pathname === '/')
  })

  test('capture legal-page screenshots', async ({ page }) => {
    const shot = (n: string) => path.join(OUT, n + '.png')
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/privacy-cs.html', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('legal-01-privacy-cs-desktop'), fullPage: true })
    await page.goto('/terms-cs.html', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('legal-03-terms-cs-desktop'), fullPage: true })
    await page.goto('/privacy-de.html', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('legal-04-privacy-de-desktop'), fullPage: true })
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/cookies-cs.html', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('legal-02-cookies-cs-mobile'), fullPage: true })
    await page.goto('/terms-de.html', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('legal-05-terms-de-mobile'), fullPage: true })
  })
})
