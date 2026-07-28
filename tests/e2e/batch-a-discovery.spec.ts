import { test, expect, devices } from '@playwright/test'
import { tierOneRoutes } from '../../lib/content/tier1-registry'

// Batch A browser QA (feat/indexing-recovery-authority-graph). Verifies the
// internal-discovery recovery as a real production visitor sees it:
//
//  1. the employer hub renders the regional recruitment entry point and the
//     flagship regional labour-market pointer, with real server-rendered anchors;
//  2. that entry point is responsive (no horizontal overflow) at 5 breakpoints;
//  3. every Tier 1 registry route renders 200 with an <h1> and self-canonical.
//
// Runs against the real production build via the shared webServer (next start).

const HUB = '/pro-zamestnavatele'
const FLAGSHIP = '/trh-prace-stredocesky-kraj'
const BREAKPOINTS: Array<[string, number, number]> = [
  ['320 (small phone)', 320, 640],
  ['375 (phone)', 375, 667],
  ['768 (tablet)', 768, 1024],
  ['1024 (laptop)', 1024, 768],
  ['1440 (desktop)', 1440, 900],
]

test.describe('Batch A — internal-discovery recovery', () => {
  test('employer hub renders the regional entry point with descriptive anchors', async ({ page }) => {
    await page.goto(HUB, { waitUntil: 'networkidle' })
    const block = page.locator('.situ-regions')
    await expect(block).toBeVisible()
    await expect(block.locator('#regionalni-nabor')).toHaveText(/Regionální nábor/)

    // 10 per-city recruitment links, each a real /nabor-zamestnancu-<slug> anchor.
    const cityLinks = block.locator('.situ-region-links a')
    await expect(cityLinks).toHaveCount(10)
    for (const a of await cityLinks.all()) {
      const href = await a.getAttribute('href')
      expect(href).toMatch(/^\/nabor-zamestnancu-[a-z-]+$/)
      expect((await a.innerText()).trim().length).toBeGreaterThan(3) // descriptive, not "zde"
    }

    // Flagship regional labour-market pointer → brings the Tier 1 page to depth 3.
    const flagship = block.locator(`.situ-regions-market a[href="${FLAGSHIP}"]`)
    await expect(flagship).toBeVisible()
    expect((await flagship.innerText()).trim().length).toBeGreaterThan(3)
  })

  for (const [label, width, height] of BREAKPOINTS) {
    test(`regional entry point has no horizontal overflow @ ${label}`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto(HUB, { waitUntil: 'networkidle' })
      await expect(page.locator('.situ-regions')).toBeVisible()
      const overflow = await page.evaluate(() => {
        const el = document.scrollingElement || document.documentElement
        return el.scrollWidth - el.clientWidth
      })
      expect(overflow).toBeLessThanOrEqual(1) // no sideways scroll
    })
  }

  test('every Tier 1 registry route renders 200 with an <h1> and self-canonical', async ({ page }) => {
    for (const route of tierOneRoutes()) {
      const res = await page.goto(route, { waitUntil: 'domcontentloaded' })
      expect(res?.status(), `${route} status`).toBe(200)
      await expect(page.locator('h1').first(), `${route} h1`).toBeVisible()
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(canonical, `${route} canonical`).toContain(route === '/' ? '' : route.replace(/^\//, ''))
    }
  })
})
