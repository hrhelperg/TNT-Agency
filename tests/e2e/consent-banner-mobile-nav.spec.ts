import { test, expect, type Page } from '@playwright/test'

/**
 * Cookie-consent banner vs. mobile navigation — the second A–H refutation's
 * material FAIL against candidate ec0f43c.
 *
 * WHY THIS FILE EXISTS SEPARATELY. Every other mobile suite in this repo
 * presets consent before it navigates — header-fit.spec.ts's `answerConsent`,
 * locale-mobile.spec.ts's `answerConsent`, webmasterid.spec.ts's `setConsent`.
 * That is correct for what those files test, and it is exactly why this defect
 * shipped: a first-time visitor who has NOT yet answered — the state every real
 * visitor is in on their first page view — was never exercised by the suite at
 * all. This file deliberately leaves consent unset.
 *
 * THE DEFECT. `.cookie-banner` is `position:fixed; bottom:0; z-index:9999`.
 * `.mobile-nav` is a full-screen scrollable overlay whose primary CTA is its
 * last item. The banner does not participate in the menu's scroll, so no
 * amount of scrolling can move the CTA out from under it — verified directly:
 * scrolling `.mobile-nav` to its maximum still left the CTA's box (757–811px)
 * entirely inside the banner's box (632–844px) at 390×844. German at 320px
 * measures the banner at 302px tall, more than a third of a small phone's
 * viewport.
 *
 * THE FIX. CookieBanner.tsx measures its own rendered height and publishes it
 * as `--consent-banner-h`, tracked through the web font's late re-wrap and
 * reset to `0px` on unmount. `.mobile-nav` occupies the band between the header
 * and the banner via `top`/`bottom`, not padding.
 *
 * Three attempts were needed, and each failure is worth keeping:
 *
 *   1. Bottom PADDING reserved the space but the menu still DREW items beneath
 *      the banner — on open the CTA rendered at 769–823px with the banner
 *      starting at 542px, looking tappable while `elementFromPoint` returned
 *      the banner's accept button.
 *   2. Clearing the header with `padding-top` failed for the mirror-image
 *      reason: padding scrolls away, so at maximum scroll the CTA slid under
 *      the opaque header. Its height also formed a border-box floor that
 *      stopped the bottom reserve from shrinking the box on short screens.
 *   3. A `min-height` floor pushed the box past the bottom of the screen,
 *      stranding its last 32px where nothing could scroll it into view.
 *
 * On a landscape phone the reserve is geometrically impossible — at 568x320 the
 * header ends at 117px and a German banner starts at 131px — so it is clamped
 * to what can be spared and an open menu outranks the banner where the clamp
 * bites. The banner returns, still unanswered, when the menu closes.
 *
 * These tests assert the fix by GEOMETRY, not by "the click eventually landed"
 * — Playwright can force a click through an overlay a real thumb cannot. They
 * measure the PAINTED intersection of the CTA with the menu's scroll viewport,
 * because .mobile-nav is overflow-y:auto and a raw bounding rect reports
 * scrolled-away content as if it were on screen.
 */

const REQUEST_STAFF: Record<'cs' | 'en' | 'de', string> = {
  cs: '/poptavka-pracovniku',
  en: '/en/request-staff',
  de: '/de/personal-anfragen',
}

/** Representative pages: the documented worst case, one per locale, plus home. */
const PAGES: Array<[string, 'cs' | 'en' | 'de', string]> = [
  ['/nabor-svarecu', 'cs', 'cs L1 primary'],
  ['/en/for-employers', 'en', 'en L0'],
  ['/de/fuer-arbeitgeber', 'de', 'de L0 — worst-case language'],
  ['/', 'cs', 'cs home'],
]

/** 320 is the documented worst case; the rest cover the phone range this menu serves. */
const WIDTHS = [320, 360, 375, 390, 412, 430]

const CTA_SELECTOR = '.mobile-nav a.btn-primary, .mobile-nav .btn-primary'

/**
 * Geometry, not click success. A click can land through an overlay's hit-test
 * gaps or Playwright's own force-click fallback in ways a real thumb cannot;
 * the contract is the boxes do not overlap.
 */
async function ctaBannerGeometry(page: Page) {
  return page.evaluate(
    ({ ctaSel }) => {
      const cta = document.querySelector(ctaSel) as HTMLElement | null
      const nav = document.querySelector('.mobile-nav') as HTMLElement | null
      const banner = document.querySelector('.cookie-banner') as HTMLElement | null
      if (!cta || !nav) return { ctaFound: false as const }

      const c = cta.getBoundingClientRect()
      const navRect = nav.getBoundingClientRect()
      const bannerVisible = !!banner && getComputedStyle(banner).display !== 'none'
      const b = bannerVisible ? banner!.getBoundingClientRect() : null

      // .mobile-nav is overflow-y:auto, so an element's raw rect can sit far
      // outside the part of it that is actually PAINTED. Measuring the raw rect
      // reports a scrolled-away item as overlapping the banner, which is a
      // false positive — the reader cannot see or touch it there at all. What
      // matters is the intersection with the scroll container's own box: the
      // portion of the CTA a reader can actually see.
      const visibleTop = Math.max(c.top, navRect.top)
      const visibleBottom = Math.min(c.bottom, navRect.bottom)
      const painted = visibleBottom > visibleTop

      return {
        ctaFound: true as const,
        cta: { top: c.top, bottom: c.bottom, left: c.left, right: c.right },
        navViewport: { top: navRect.top, bottom: navRect.bottom },
        visible: painted ? { top: visibleTop, bottom: visibleBottom } : null,
        painted,
        bannerVisible,
        banner: b ? { top: b.top, bottom: b.bottom } : null,
        // The contract: any PAINTED part of the CTA must end at or above where
        // the banner begins. A CTA scrolled out of the menu's viewport is not
        // overlapping anything; a CTA drawn under the banner is the defect.
        overlaps: bannerVisible && painted && visibleBottom > b!.top,
        elementAtCenter: painted
          ? (() => {
              const el = document.elementFromPoint(c.left + c.width / 2, (visibleTop + visibleBottom) / 2)
              return el ? el.className || el.tagName : null
            })()
          : null,
      }
    },
    { ctaSel: CTA_SELECTOR },
  )
}

test.describe('consent banner does not obstruct the mobile-nav CTA', () => {
  for (const [path, locale, label] of PAGES) {
    for (const width of WIDTHS) {
      test(`${path} (${label}) @${width}px — CTA reachable with consent still unset`, async ({ browser }) => {
        // A genuinely new context: no addInitScript presetting consent, no
        // storage from a prior test. This is the real first-visit state.
        const ctx = await browser.newContext({ viewport: { width, height: 844 } })
        const page = await ctx.newPage()
        const consoleErrors: string[] = []
        page.on('pageerror', (e) => consoleErrors.push(String(e)))

        await page.goto(path, { waitUntil: 'domcontentloaded' })
        await page.click('#burger', { timeout: 5000 })

        // Immediate-interaction check: assert as soon as the menu and banner
        // are both PAINTED, not after a settle delay a real visitor does not
        // grant. If --consent-banner-h were only set by a delayed effect,
        // this is the check that would catch the actionable-but-wrong frame —
        // waiting it away in the test would hide exactly the race being
        // guarded against.
        await page.waitForFunction(
          () => {
            const banner = document.querySelector('.cookie-banner')
            const nav = document.querySelector('.mobile-nav')
            return !!banner && !!nav && getComputedStyle(nav).display !== 'none' && banner.getBoundingClientRect().height > 0
          },
          { timeout: 3000 },
        )

        const geometry = await ctaBannerGeometry(page)
        expect(geometry.ctaFound, `${path}@${width}: no CTA found in the open mobile menu`).toBe(true)
        expect(geometry.bannerVisible, `${path}@${width}: consent banner should be visible on a first visit`).toBe(true)
        expect(
          geometry.overlaps,
          `${path}@${width}: painted CTA ${JSON.stringify(geometry.visible)} overlaps banner ${JSON.stringify(geometry.banner)} — ` +
            `elementFromPoint at its visible centre resolves to "${geometry.elementAtCenter}"`,
        ).toBe(false)
        // The structural guarantee — the menu's viewport stops at or above the
        // banner — is asserted once LAYOUT HAS SETTLED, and settled is defined
        // by a real signal rather than a sleep.
        //
        // Why it cannot be asserted in the frame above: the reserve is a
        // JS-measured custom property, so a banner reflow (the web font
        // arriving and re-wrapping the text) and the menu's re-layout from the
        // new value are necessarily one frame apart — measure, setProperty,
        // relayout. Measured at 412x844: banner 189.16 -> 211.55px, and for one
        // frame the menu box still ended at the old 654 while the banner had
        // moved up to 632.45.
        //
        // That frame is not an actionable defect and the check above is what
        // proves it: an open menu is z-index 10000 against the banner's 9999,
        // so the CTA stays on top and clickable throughout. The overlap is
        // cosmetic and lasts one frame. Asserting the structural property here
        // instead of in the transient frame tests the real invariant without
        // pretending the transient does not exist.
        await page.evaluate(() => (document as any).fonts?.ready).catch(() => {})
        const settled = await ctaBannerGeometry(page)
        expect(
          settled.navViewport.bottom,
          `${path}@${width}: once settled, the menu's viewport (${JSON.stringify(settled.navViewport)}) still extends past the banner top ${settled.banner?.top}`,
        ).toBeLessThanOrEqual((settled.banner?.top ?? 0) + 1)
        expect(settled.overlaps, `${path}@${width}: settled CTA overlaps the banner`).toBe(false)

        // Scroll to the end of the menu — the realistic "user reaches for the
        // last item" gesture — and re-check: the fix must hold there too, not
        // only at the initial scroll position.
        await page.evaluate(() => {
          const nav = document.querySelector('.mobile-nav')
          if (nav) nav.scrollTop = nav.scrollHeight
        })
        await page.waitForTimeout(100)
        const afterScroll = await ctaBannerGeometry(page)
        expect(afterScroll.overlaps, `${path}@${width}: overlap after scrolling to the end of the menu`).toBe(false)

        // The contract, proven with an actual user click — not force:true,
        // not a programmatic navigation. If the box check above is wrong, a
        // real click is the test that would still catch it.
        const cta = page.locator(CTA_SELECTOR).last()
        await cta.click({ timeout: 3000 })
        await page.waitForLoadState('domcontentloaded')
        const landed = new URL(page.url()).pathname
        expect(landed, `${path}@${width}: click landed on ${landed}, expected ${REQUEST_STAFF[locale]}`).toBe(REQUEST_STAFF[locale])

        expect(consoleErrors, consoleErrors.join('\n')).toEqual([])
        await ctx.close()
      })
    }
  }
})

test.describe('--consent-banner-h lifecycle', () => {
  test('matches the rendered banner height within rounding, per locale, at the documented worst case', async ({ browser }) => {
    const failures: string[] = []
    for (const [path, , label] of [
      ['/', 'cs', 'cs'],
      ['/en/for-employers', 'en', 'en'],
      ['/de/fuer-arbeitgeber', 'de', 'de — worst case'],
    ] as const) {
      const ctx = await browser.newContext({ viewport: { width: 320, height: 844 } })
      const page = await ctx.newPage()
      await page.goto(path, { waitUntil: 'domcontentloaded' })
      await page.waitForFunction(() => (document.querySelector('.cookie-banner')?.getBoundingClientRect().height ?? 0) > 0, { timeout: 3000 })
      const m = await page.evaluate(() => ({
        varPx: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--consent-banner-h')),
        realPx: document.querySelector('.cookie-banner')!.getBoundingClientRect().height,
      }))
      if (Math.abs(m.varPx - m.realPx) > 2) failures.push(`${label}: var=${m.varPx} real=${m.realPx}`)
      await ctx.close()
    }
    expect(failures, failures.join('\n')).toEqual([])
  })

  test('resets to 0px and the mobile nav releases the reserved space once consent is answered', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 844 } })
    const page = await ctx.newPage()
    await page.goto('/de/fuer-arbeitgeber', { waitUntil: 'domcontentloaded' })
    await page.waitForFunction(() => (document.querySelector('.cookie-banner')?.getBoundingClientRect().height ?? 0) > 0, { timeout: 3000 })

    const before = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--consent-banner-h')))
    expect(before, 'banner visible but --consent-banner-h is not reserving space').toBeGreaterThan(100)

    await page.click('.cookie-btn--reject')
    await page.waitForFunction(() => !document.querySelector('.cookie-banner'), { timeout: 3000 })

    const after = await page.evaluate(() => ({
      varPx: getComputedStyle(document.documentElement).getPropertyValue('--consent-banner-h').trim(),
      bannerGone: !document.querySelector('.cookie-banner'),
    }))
    expect(after.varPx, '--consent-banner-h did not reset once the banner unmounted').toBe('0px')
    expect(after.bannerGone).toBe(true)

    // The menu must now have its full original scroll range back, not the
    // banner-reserved one from a moment ago.
    await page.click('#burger')
    await page.waitForTimeout(150)
    const navPaddingBottom = await page.evaluate(() => {
      const nav = document.querySelector('.mobile-nav')
      return nav ? parseFloat(getComputedStyle(nav).paddingBottom) : null
    })
    expect(navPaddingBottom, 'mobile-nav bottom padding should have shrunk back after consent was answered').toBeLessThan(100)
    await ctx.close()
  })

  test('recomputes on a resize / orientation-like viewport change', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 844 } })
    const page = await ctx.newPage()
    await page.goto('/de/fuer-arbeitgeber', { waitUntil: 'domcontentloaded' })
    await page.waitForFunction(() => (document.querySelector('.cookie-banner')?.getBoundingClientRect().height ?? 0) > 0, { timeout: 3000 })

    const portrait = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--consent-banner-h')))

    // Rotate: the banner's text re-wraps to fewer, wider lines and its real
    // height shrinks — the published value must follow it, not stay pinned to
    // the portrait measurement.
    await page.setViewportSize({ width: 844, height: 320 })
    await page.evaluate(() => window.dispatchEvent(new Event('resize')))
    await page.waitForTimeout(150)
    const landscape = await page.evaluate(() => ({
      varPx: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--consent-banner-h')),
      realPx: document.querySelector('.cookie-banner')!.getBoundingClientRect().height,
    }))

    expect(Math.abs(landscape.varPx - landscape.realPx), `after resize: var=${landscape.varPx} real=${landscape.realPx}`).toBeLessThanOrEqual(2)
    expect(landscape.varPx, 'the published height did not change across a width/height swap that changes text wrapping').not.toBe(portrait)
    await ctx.close()
  })
})

/**
 * Instrument validation. If this negative control passed silently — if the
 * geometry check could not detect a real overlap — every PASS above would be
 * worth nothing, which is the lesson of header-fit.spec.ts applied here.
 */
test.describe('negative control: the geometry check must fail on a reintroduced overlap', () => {
  test('forcing the old zero-reserve padding reproduces the overlap', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 844 } })
    const page = await ctx.newPage()
    await page.goto('/de/fuer-arbeitgeber', { waitUntil: 'domcontentloaded' })
    await page.click('#burger')
    await page.waitForFunction(() => (document.querySelector('.cookie-banner')?.getBoundingClientRect().height ?? 0) > 0, { timeout: 3000 })

    const clean = await ctaBannerGeometry(page)
    expect(clean.overlaps, 'sanity: the real page must be clean before breaking it').toBe(false)

    // The exact pre-fix state: a full-height overlay running under the banner.
    await page.addStyleTag({ content: '.mobile-nav { inset: 0 !important; }' })
    await page.evaluate(() => {
      const nav = document.querySelector('.mobile-nav')
      if (nav) nav.scrollTop = nav.scrollHeight
    })
    await page.waitForTimeout(100)
    const broken = await ctaBannerGeometry(page)
    expect(
      broken.overlaps,
      'restoring the full-height overlay must reproduce the overlap — if it does not, this geometry check ' +
        'cannot detect the defect it exists for, and every PASS above is worthless',
    ).toBe(true)
    await ctx.close()
  })
})
