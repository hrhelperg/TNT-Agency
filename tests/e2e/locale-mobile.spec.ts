import { test, expect, type Page } from '@playwright/test'
import { LOCALE_CONCEPTS, urlFor } from '../../lib/locale/registry'

/**
 * Locale L0 — narrow-viewport acceptance.
 *
 * The defect this pins: at 320px the German heading "Für Arbeitgeber:
 * Personalgewinnung, Teamstabilität und Kosten" measured 345px of unbreakable
 * content in a 280px column. That set the document's scroll width to 365px, and
 * because the ecosystem ribbon and the site header are full-width they stretched
 * to match, carrying the hamburger to x=345 — outside a 320px viewport and
 * therefore unclickable. The mobile menu was unreachable on all ten German
 * pages.
 *
 * The ribbon was the visible symptom. The assertions below are written against
 * the real failure mode instead: zero horizontal overflow, the hamburger inside
 * the viewport, and — the part a bounding box cannot tell you — that clicking it
 * actually opens the menu and a link in that menu actually navigates.
 */

const WIDTHS = [320, 360, 375, 390, 430, 768]

const LOCALIZED: Array<[string, string]> = []
for (const c of LOCALE_CONCEPTS) {
  for (const l of c.published) if (l !== 'cs') LOCALIZED.push([urlFor(c, l)!, l])
}
const CZECH: Array<[string, string]> = [
  ['/', 'cs'],
  ['/pro-zamestnavatele', 'cs'],
  ['/cena-neobsazene-pozice', 'cs'],
  ['/skladnici', 'cs'],
]

/** Consent is fixed to the bottom of the viewport and covers the mobile nav. */
const answerConsent = async (page: Page) => {
  await page.addInitScript(() => { try { localStorage.setItem('cookie_consent', 'rejected') } catch {} })
}

/**
 * Measure once the page has settled.
 *
 * Measuring the instant DOMContentLoaded fires can catch the page inside the
 * PRE-CSSOM MEASUREMENT WINDOW — the stylesheet parsed but not yet applied — in
 * which every element reports its default rendering. That is a state the
 * renderer passes through and never paints, not a layout defect, and asserting
 * on it makes the suite flaky rather than strict.
 */
const settled = async (page: Page) => {
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.evaluate(() => (document as any).fonts?.ready).catch(() => {})
  await page.waitForTimeout(250)
}

test.describe('narrow viewports: content fits and the mobile menu works', () => {
  for (const [route, locale] of [...LOCALIZED, ...CZECH]) {
    test(`${route} (${locale}) fits and opens at every mobile width`, async ({ page }) => {
      await answerConsent(page)
      const problems: string[] = []

      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route, { waitUntil: 'domcontentloaded' })
        await settled(page)

        const m = await page.evaluate(() => {
          const doc = document.scrollingElement || document.documentElement
          const burger = document.querySelector('#burger')?.getBoundingClientRect()
          const bar = document.querySelector('.eco-bar')
          const shown = (sel: string) => {
            const el = document.querySelector(sel)
            return el ? getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().width > 0 : false
          }
          return {
            vw: doc.clientWidth,
            overflow: doc.scrollWidth - doc.clientWidth,
            burger: burger ? { left: Math.round(burger.left), right: Math.round(burger.right) } : null,
            barWidth: bar ? Math.round(bar.getBoundingClientRect().width) : null,
            brandShown: shown('.eco-bar__brand'),
            ctaShown: shown('.eco-bar__cta'),
          }
        })

        if (m.overflow > 1) problems.push(`${width}px: horizontal overflow ${m.overflow}px (ribbon ${m.barWidth}px)`)
        if (!m.burger) problems.push(`${width}px: no hamburger`)
        else if (m.burger.right > m.vw + 1 || m.burger.left < -1) {
          problems.push(`${width}px: hamburger outside viewport (${m.burger.left}..${m.burger.right} of ${m.vw})`)
        }
        // The ribbon must still be readable, not hidden to make the numbers work.
        if (!m.brandShown) problems.push(`${width}px: HELPERG branding not visible`)
        if (!m.ctaShown) problems.push(`${width}px: ribbon CTA not visible`)

        // A bounding box inside the viewport is not the same as reachable.
        try {
          await page.locator('#burger').click({ timeout: 8000 })
        } catch {
          problems.push(`${width}px: hamburger not clickable`)
          continue
        }
        const opened = await page.locator('#mobileNav').evaluate(
          (el) => el.className.includes('open') || getComputedStyle(el).visibility === 'visible',
        ).catch(() => false)
        if (!opened) { problems.push(`${width}px: mobile nav did not open`); continue }

        const link = page.locator('.mobile-nav a[href^="/"]').first()
        const href = await link.getAttribute('href')
        try {
          await link.click({ timeout: 8000 })
          await page.waitForLoadState('domcontentloaded')
          if (new URL(page.url()).pathname !== href) problems.push(`${width}px: nav link went to ${new URL(page.url()).pathname}, expected ${href}`)
        } catch {
          problems.push(`${width}px: nav link not clickable`)
        }
      }

      expect(problems, `${route}\n  ${problems.join('\n  ')}`).toEqual([])
    })
  }
})

test.describe('the fix does not depend on hydration', () => {
  for (const route of ['/de/fuer-arbeitgeber', '/en/for-employers', '/pro-zamestnavatele']) {
    test(`${route} fits at 320px with JavaScript disabled`, async ({ browser }) => {
      const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } })
      const page = await ctx.newPage()
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(700)   // past the pre-CSSOM window; see settled()
      const m = await page.evaluate(() => {
        const doc = document.scrollingElement || document.documentElement
        const b = document.querySelector('#burger')?.getBoundingClientRect()
        return {
          vw: doc.clientWidth,
          overflow: doc.scrollWidth - doc.clientWidth,
          burgerInside: b ? b.right <= doc.clientWidth + 1 && b.left >= -1 : false,
          barLang: document.querySelector('.eco-bar')?.getAttribute('lang'),
        }
      })
      const expected = route.startsWith('/de') ? 'de' : route.startsWith('/en') ? 'en' : 'cs'
      expect(m.barLang, 'ribbon language must be correct before any script runs').toBe(expected)
      expect(m.overflow, 'horizontal overflow without JavaScript').toBeLessThanOrEqual(1)
      expect(m.burgerInside, 'hamburger inside the viewport without JavaScript').toBe(true)
      await ctx.close()
    })
  }
})

/**
 * Bounded transient-layout check.
 *
 * A JS-disabled sweep of /de/kosten-unbesetzter-stellen reported a 69px
 * horizontal overflow in roughly one run in five, always at the first sample
 * after DOMContentLoaded and gone within 400ms. This samples the whole window —
 * DOMContentLoaded, through document.fonts.ready, and past it — instead of
 * taking two readings and guessing what happened in between.
 *
 * What that overflow turned out to be — and it is NOT a font reflow, which is
 * what it was first called: the document inside the pre-CSSOM measurement
 * window, before the stylesheet is applied.
 * At those frames `header.header` computes `position: static` when it is fixed,
 * `.mobile-nav` computes `transform: none` when it is translated off-canvas, and
 * the nav anchors compute `display: inline`. Every element is in its default
 * rendering, so "is a control displaced" has no meaningful answer — all of them
 * are. The stylesheet is a render-blocking <link> in <head> with no media/onload
 * trick, and first paint measures earlier than DOMContentLoaded, so Chromium
 * never presents that state to a viewer. It is also, by definition, unaffected
 * by any CSS in this branch.
 *
 * So the assertion is deliberately NOT "overflow never occurs". It is:
 *
 *   - the hamburger is inside the viewport in EVERY sample, styled or not;
 *   - no sample ever offers a usable horizontal scroll surface;
 *   - and any overflow at all is confined to frames where CSS has not applied.
 *
 * That last clause is what keeps this honest. A real regression — content that
 * overflows once the page is styled — fails it, because such a frame would have
 * the stylesheet applied. Only the pre-CSSOM window is tolerated.
 */
test.describe('transient layout during load', () => {
  for (const route of ['/de/kosten-unbesetzter-stellen', '/de/fuer-arbeitgeber']) {
    test(`${route} produces no styled-frame overflow and never displaces the menu button`, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width: 320, height: 900 } })
      await ctx.addInitScript(() => { try { localStorage.setItem('cookie_consent', 'rejected') } catch {} })
      // Sampler installed before any page script, recording every frame.
      await ctx.addInitScript(() => {
        const S: any[] = []
        ;(window as any).__samples = S
        const box = (sel: string) => {
          const el = document.querySelector(sel)
          if (!el) return null
          const r = el.getBoundingClientRect()
          return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) }
        }
        const tick = () => {
          const de = document.documentElement
          const body = document.body
          const doc = document.scrollingElement || de
          const header = document.querySelector('header.header')
          const overflow = doc.scrollWidth - doc.clientWidth
          let canScroll = false
          if (overflow > 0) {
            const before = doc.scrollLeft
            doc.scrollLeft = 9999
            canScroll = doc.scrollLeft > 0
            doc.scrollLeft = before
          }
          S.push({
            t: Math.round(performance.now()),
            vw: de.clientWidth,
            docSW: de.scrollWidth, docCW: de.clientWidth,
            bodySW: body ? body.scrollWidth : null, bodyCW: body ? body.clientWidth : null,
            overflow, canScroll,
            burger: box('#burger'), header: box('header.header'),
            // A fixed header computing `static` means CSSOM has not applied yet.
            styled: header ? getComputedStyle(header).position !== 'static' : false,
            fonts: (document as any).fonts ? (document as any).fonts.status : 'n/a',
          })
          if (S.length < 400) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      })

      const page = await ctx.newPage()
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      await page.evaluate(() => (document as any).fonts?.ready).catch(() => {})
      await page.waitForTimeout(600)          // ≥500ms past fonts.ready
      const samples: any[] = await page.evaluate(() => (window as any).__samples || [])
      await ctx.close()

      expect(samples.length, 'sampler produced no frames').toBeGreaterThan(10)
      expect(samples.some((s) => s.fonts === 'loaded'), 'fonts never reported loaded').toBe(true)

      const burgerDisplaced = samples.filter((s) => s.burger && (s.burger.right > s.vw + 1 || s.burger.left < -1))
      const scrollable = samples.filter((s) => s.canScroll)
      const styledOverflow = samples.filter((s) => s.styled && s.overflow > 1)

      const describe = (s: any) =>
        `t=${s.t}ms styled=${s.styled} fonts=${s.fonts} overflow=${s.overflow} doc=${s.docSW}/${s.docCW} body=${s.bodySW}/${s.bodyCW} burger=${JSON.stringify(s.burger)} header=${JSON.stringify(s.header)}`

      expect(burgerDisplaced.map(describe), 'the menu button left the viewport').toEqual([])
      expect(scrollable.map(describe), 'a usable horizontal scroll surface appeared').toEqual([])
      expect(styledOverflow.map(describe), 'horizontal overflow with the stylesheet applied').toEqual([])
    })
  }
})

/**
 * The first frame a user can actually see is styled.
 *
 * This closes the argument the transient check leaves open. That check tolerates
 * overflow in unstyled frames on the grounds that the renderer never presents
 * them — which is a claim about painting, and the check above measures layout.
 * So measure painting directly.
 *
 * First Contentful Paint is the browser's own report of the first frame carrying
 * content. The sampler records, every frame from document start, whether the
 * stylesheet has applied; a fixed header computing `position: static` means it
 * has not. If every unstyled sample is strictly earlier than FCP, then no
 * unstyled frame was ever the first contentful one, and the pre-CSSOM window is
 * invisible rather than merely brief.
 *
 * A screenshot is captured as soon as the FCP observer fires and attached to the
 * report, so the claim can be inspected rather than taken on trust.
 */
test.describe('the first contentful frame is styled', () => {
  for (const route of ['/de/fuer-arbeitgeber', '/de/kosten-unbesetzter-stellen', '/pro-zamestnavatele']) {
    test(`${route} paints nothing before the stylesheet applies`, async ({ browser }, testInfo) => {
      const ctx = await browser.newContext({ viewport: { width: 320, height: 900 } })
      await ctx.addInitScript(() => { try { localStorage.setItem('cookie_consent', 'rejected') } catch {} })
      await ctx.addInitScript(() => {
        const w = window as any
        w.__styleTimeline = []
        w.__fcp = null
        const styled = () => {
          const h = document.querySelector('header.header')
          return h ? getComputedStyle(h).position !== 'static' : false
        }
        const tick = () => {
          w.__styleTimeline.push({ t: performance.now(), styled: styled() })
          if (w.__styleTimeline.length < 400) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        try {
          new PerformanceObserver((list) => {
            for (const e of list.getEntries()) {
              if (e.name === 'first-contentful-paint' && w.__fcp === null) {
                // Record the paint time AND the state observed the moment we hear about it.
                w.__fcp = { t: e.startTime, styledWhenObserved: styled() }
              }
            }
          }).observe({ type: 'paint', buffered: true })
        } catch {}
      })

      const page = await ctx.newPage()
      await page.goto(route, { waitUntil: 'domcontentloaded' })
      await page.waitForFunction(() => (window as any).__fcp !== null, null, { timeout: 15000 })

      // Earliest contentful frame, captured as close to it as the API allows.
      const shot = await page.screenshot()
      await testInfo.attach(`first-contentful-frame${route.replace(/\//g, '_')}.png`, { body: shot, contentType: 'image/png' })

      await page.waitForTimeout(400)
      const { fcp, timeline } = await page.evaluate(() => ({
        fcp: (window as any).__fcp,
        timeline: (window as any).__styleTimeline,
      }))
      await ctx.close()

      expect(fcp, 'no first-contentful-paint was reported').toBeTruthy()
      expect(timeline.length, 'style timeline captured no frames').toBeGreaterThan(5)

      const unstyled = timeline.filter((s: any) => !s.styled)
      const lastUnstyled = unstyled.length ? Math.max(...unstyled.map((s: any) => s.t)) : -1
      const firstStyled = timeline.find((s: any) => s.styled)

      expect(firstStyled, 'the stylesheet never applied').toBeTruthy()
      // The decisive assertion: every unstyled frame precedes the first
      // contentful paint, so no unstyled frame was ever shown.
      expect(
        lastUnstyled < fcp.t,
        `an unstyled frame existed at or after FCP — last unstyled ${lastUnstyled.toFixed(1)}ms vs FCP ${fcp.t.toFixed(1)}ms`,
      ).toBe(true)
      expect(fcp.styledWhenObserved, 'stylesheet not applied when FCP was reported').toBe(true)
    })
  }
})
