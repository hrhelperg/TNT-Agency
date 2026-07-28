import { test } from '@playwright/test'
import fs from 'fs'
import path from 'path'

// Release-evidence screenshots (Batch 2b → cumulative release). This spec
// captures a small representative set explicitly via page.screenshot(); it does
// NOT change the repo's normal Playwright policy (screenshot: 'off' in the
// config still applies to every other suite). Output goes to ./release-evidence
// (gitignored — binary artifacts are not committed).
//
// Run: npx playwright test tests/e2e/release-evidence.spec.ts --project=desktop

const OUT = path.join(process.cwd(), 'release-evidence')
fs.mkdirSync(OUT, { recursive: true })
const shot = (name: string) => path.join(OUT, `${name}.png`)

async function withLang(page: import('@playwright/test').Page, lang: string | null) {
  await page.addInitScript((l) => {
    try { l ? localStorage.setItem('tnt-lang', l) : localStorage.removeItem('tnt-lang') } catch {}
  }, lang)
}

const DESKTOP = { width: 1440, height: 900 }
const MOBILE = { width: 390, height: 844 }

test.describe('release evidence', () => {
  test('capture representative Czech release screenshots', async ({ page }) => {
    // 1. Czech homepage — desktop
    await withLang(page, null)
    await page.setViewportSize(DESKTOP)
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('01-homepage-cs-desktop') })

    // 2. Employer hub — desktop
    await page.goto('/pro-zamestnavatele', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('02-employer-hub-cs-desktop'), fullPage: true })

    // 4. Trust page — desktop
    await page.goto('/o-nas', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('04-trust-o-nas-cs-desktop'), fullPage: true })

    // 6. Tier 1 industry page — desktop
    await page.goto('/pracovnici-do-vyroby', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('06-tier1-industry-vyroba-desktop') })

    // 7. Tier 1 regional page — desktop
    await page.goto('/nabor-zamestnancu-pardubice', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('07-tier1-region-pardubice-desktop') })

    // 3. Employer hub — mobile
    await page.setViewportSize(MOBILE)
    await page.goto('/pro-zamestnavatele', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('03-employer-hub-cs-mobile'), fullPage: true })

    // 5. Request-workers — mobile
    await page.goto('/poptavka-pracovniku', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('05-request-workers-cs-mobile') })

    // 8. Stored English homepage — desktop
    await page.setViewportSize(DESKTOP)
    await withLang(page, 'en')
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('08-homepage-en-desktop') })

    // 9. Stored German homepage — desktop
    await withLang(page, 'de')
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.screenshot({ path: shot('09-homepage-de-desktop') })
  })
})
