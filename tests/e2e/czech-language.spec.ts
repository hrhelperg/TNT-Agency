import { test, expect } from '@playwright/test'

// Batch 2 browser QA: Czech is the server-rendered default, EN/DE still switch,
// and the trust page never shows unverified permit facts. Runs against a real
// production build via the shared webServer.

test.describe('Czech server default + language switching', () => {
  test('clean browser renders Czech chrome (no English, <html lang=cs>)', async ({ page }) => {
    await page.context().clearCookies()
    await page.addInitScript(() => { try { localStorage.clear() } catch {} })
    await page.goto('/', { waitUntil: 'networkidle' })
    await expect(page.locator('html')).toHaveAttribute('lang', 'cs')
    await expect(page.locator('.nav a').first()).toHaveText('Úvod')
    await expect(page.getByRole('link', { name: 'Poptat pracovníky' }).first()).toBeVisible()
    // No English chrome leaked into the rendered nav.
    const nav = await page.locator('.nav').innerText()
    expect(nav).not.toMatch(/\b(Home|Agencies|Offers|Request workers)\b/)
    // The CS language button is the active one.
    await expect(page.locator('.lang-btn.active').first()).toHaveText('CS')
  })

  for (const [lang, home, cta] of [
    ['en', 'Home', 'Request workers'],
    ['de', 'Startseite', 'Personal anfragen'],
  ] as const) {
    test(`a stored ${lang.toUpperCase()} preference is honoured after hydration`, async ({ page }) => {
      await page.addInitScript((l) => { try { localStorage.setItem('tnt-lang', l) } catch {} }, lang)
      await page.goto('/', { waitUntil: 'networkidle' })
      await expect(page.locator('.nav a').first()).toHaveText(home)
      await expect(page.locator('.lang-btn.active').first()).toHaveText(lang.toUpperCase())
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
    })
  }

  test('employer hub is situation-first and each situation routes cleanly', async ({ page }) => {
    await page.goto('/pro-zamestnavatele', { waitUntil: 'networkidle' })
    await expect(page.getByRole('heading', { name: 'Vyberte si podle své situace' })).toBeVisible()
    // Situation cards are present and link to real Tier 1 routes with a clean CTA.
    await expect(page.getByRole('heading', { name: 'Chybí nám pracovníci na směně' })).toBeVisible()
    const situationLink = page.locator('.situ-links a', { hasText: 'Pracovníci do výroby' }).first()
    await situationLink.click()
    await page.waitForURL('**/pracovnici-do-vyroby')
    expect(new URL(page.url()).search).toBe('')
  })

  test('trust page publishes verified facts only, permits as "ověření probíhá"', async ({ page }) => {
    await page.goto('/o-nas', { waitUntil: 'networkidle' })
    await expect(page.locator('h1')).toHaveText(/O nás a ověření agentury/)
    await expect(page.getByText('TNT agency s.r.o.').first()).toBeVisible()
    // At least one pending permit field renders the honest note, and no
    // fabricated IČO / permit number appears anywhere on the page.
    await expect(page.getByText('ověření probíhá').first()).toBeVisible()
    const body = await page.locator('body').innerText()
    expect(body).not.toMatch(/IČO[:\s]*\d{6,}/)
    // The page names endorsement phrases ONLY to disavow them; assert the honest
    // negation sentence is present (so they are never claimed as fact).
    expect(body).toMatch(/Nepoužíváme formulace/)
  })
})
