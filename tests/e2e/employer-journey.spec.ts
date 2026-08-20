import { test, expect } from '@playwright/test'

// Employer journey regression cover.
//
// Each assertion here corresponds to a defect that shipped and survived four
// waves because nothing checked it: the homepage's largest employer button
// pointed at the agency directory, the flagship calculator's "Poptat pracovníky"
// pointed at /submit-offer, and the three process steps existed only in the
// client-side dictionary so the server HTML explained nothing. The CTA gate now
// catches the routing half statically; these prove the rendered journey.

const answerConsent = (page: import('@playwright/test').Page) =>
  page.addInitScript(() => window.localStorage.setItem('cookie_consent', 'rejected'))

test('homepage hero employer CTA reaches the request form', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const cta = page.locator('a.btn-accent', { hasText: 'Hledám pracovníky' }).first()
  await expect(cta).toHaveAttribute('href', '/poptavka-pracovniku')
  await cta.click()
  await page.waitForURL('**/poptavka-pracovniku')
  expect(new URL(page.url()).search).toBe('')
})

test('calculator CTA reaches the request form', async ({ page }) => {
  await page.goto('/kalkulacka-mzdy-agenturniho-zamestnance', { waitUntil: 'networkidle' })
  const cta = page.locator('a.btn-primary.btn-lg').first()
  await expect(cta).toHaveAttribute('href', '/poptavka-pracovniku')
})

test('process is server-rendered on the employer surfaces', async ({ page }) => {
  for (const route of ['/', '/pro-zamestnavatele', '/agencies']) {
    await page.goto(route, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('.rproc__step'), route).toHaveCount(3)
    await expect(page.locator('.rproc__steps')).toBeVisible()
  }
})

test('process has no horizontal overflow in German at every width', async ({ page }) => {
  await answerConsent(page)
  await page.goto('/pro-zamestnavatele', { waitUntil: 'networkidle' })
  const header = page.locator('.lang-btn[data-lang="de"]').first()
  if (!(await header.isVisible())) await page.locator('#burger').click()
  await page.locator('.lang-btn[data-lang="de"]:visible').first().click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  for (const width of [320, 360, 375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    const overflow = await page.evaluate(() => {
      const el = document.scrollingElement || document.documentElement
      return el.scrollWidth - el.clientWidth
    })
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(2)
  }
})

test('candidate CTA still avoids the employer request form', async ({ page }) => {
  await page.goto('/offers', { waitUntil: 'networkidle' })
  const cta = page.locator('a', { hasText: 'Promluvit s náborářem' }).first()
  await expect(cta).toHaveAttribute('href', '/contact')
})
