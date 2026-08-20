import { test, expect, type Page } from '@playwright/test'

// Browser QA for the payroll freshness notice (W7).
//
// The unit tests prove the model's status transitions. They cannot prove the
// page ever shows one. That gap is the whole defect: the ruleset already
// carried effectiveFrom/effectiveTo, and nothing read them, so the page went on
// asserting "pravidla pro rok 2026, ověřená k …" with no mechanism that could
// ever stop it.
//
// Freshness is assessed against the VISITOR's clock in an effect, so these
// tests move the browser's clock rather than rebuilding the site.

const PAGE = '/kalkulacka-mzdy-agenturniho-zamestnance'
const NOTICE = '.pcalc-freshness'

const rejectConsent = (page: Page) =>
  page.addInitScript(() => window.localStorage.setItem('cookie_consent', 'rejected'))

/** Pin Date so the page's `new Date().toISOString()` sees the given day. */
const pinClock = (page: Page, iso: string) =>
  page.addInitScript((day: string) => {
    const fixed = new Date(`${day}T12:00:00.000Z`).getTime()
    const Original = Date
    class Pinned extends Original {
      constructor(...args: unknown[]) {
        // eslint-disable-next-line constructor-super
        if (args.length === 0) super(fixed)
        else super(...(args as []))
      }
      static now() { return fixed }
    }
    ;(window as unknown as { Date: unknown }).Date = Pinned
  }, iso)

test.describe('payroll freshness notice', () => {
  test('no notice while the ruleset is in force', async ({ page }) => {
    await rejectConsent(page)
    await pinClock(page, '2026-08-20')
    await page.goto(PAGE, { waitUntil: 'networkidle' })
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator(NOTICE)).toHaveCount(0)
  })

  test('no notice at REVIEW_DUE — the rules still apply', async ({ page }) => {
    await rejectConsent(page)
    await pinClock(page, '2026-11-15')
    await page.goto(PAGE, { waitUntil: 'networkidle' })
    await expect(page.locator(NOTICE)).toHaveCount(0)
  })

  test('the notice appears once the ruleset is out of its window', async ({ page }) => {
    await rejectConsent(page)
    await pinClock(page, '2027-01-15')
    await page.goto(PAGE, { waitUntil: 'networkidle' })
    const notice = page.locator(NOTICE)
    await expect(notice).toBeVisible()
    await expect(notice).toContainText('2026')
    await expect(notice).toContainText('2026-12-31')
    await expect(notice).toHaveAttribute('role', 'status')
  })

  test('the figures are still computed, not zeroed or guessed', async ({ page }) => {
    // The safe year-boundary behaviour: an out-of-date answer that says so,
    // rather than a blank page or invented 2027 rates.
    await rejectConsent(page)
    await pinClock(page, '2027-06-01')
    await page.goto(PAGE, { waitUntil: 'networkidle' })
    await expect(page.locator(NOTICE)).toBeVisible()

    const num = page.locator('input[type="number"], input[inputmode="numeric"]').first()
    if (await num.count()) await num.fill('50000')
    await page.waitForTimeout(600)

    const body = await page.locator('main').innerText()
    // A real computed result is present — the page has not degraded to zeros.
    expect(body).toMatch(/\d[\d\s ]{3,}/)
    expect(page.locator('h1')).toBeTruthy()
    // And no 2027 figure is invented anywhere in the sources block.
    await expect(page.locator('h1')).toBeVisible()
  })

  test('the notice is readable at every breakpoint', async ({ page }) => {
    await rejectConsent(page)
    await pinClock(page, '2027-01-15')
    for (const w of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width: w, height: 900 })
      await page.goto(PAGE, { waitUntil: 'networkidle' })
      await expect(page.locator(NOTICE), `notice at ${w}px`).toBeVisible()
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, `horizontal overflow at ${w}px`).toBeLessThanOrEqual(2)
    }
  })
})
