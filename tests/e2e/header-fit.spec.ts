import { test, expect, type Page } from '@playwright/test'

/**
 * Header fit — desktop widths, measured the way a reader experiences them.
 *
 * WHY THIS EXISTS SEPARATELY FROM locale-mobile.spec.ts.
 *
 * Every responsive assertion in this suite was written as
 * `scrollWidth - clientWidth === 0`. styles.css sets `body { overflow-x: hidden }`,
 * which absorbs exactly that measurement. So a control could sit completely
 * outside the viewport and the document would still report zero overflow: the
 * gate was structurally incapable of seeing the defect it existed to prevent.
 *
 * It did not see this one. On a Czech concept primary the header carries the
 * logo, eight nav items, the page-to-page locale switcher, the legacy EN/CS/DE
 * widget and the primary action — 1262px of demand inside a 1152px container.
 * The overflow left the container, and below ~1700px it left the viewport,
 * taking the primary action with it. Between 1151 and 1250 the mobile menu was
 * not available either, so the conversion CTA had no surface at all. Every
 * scrollWidth check reported a clean page throughout.
 *
 * So these assertions are about boxes, not scroll metrics: is each control
 * inside the viewport, do any two overlap, is text clipped, and does clicking
 * actually work. THE INSTRUMENT IS VALIDATED FIRST — the three tests at the
 * bottom deliberately break the layout and require this measurement to fail. A
 * zero from an instrument that cannot register a defect is worth nothing, which
 * is the whole lesson of the gate this replaces.
 */

/** The widths the acceptance contract names, plus the breakpoint boundaries. */
const WIDTHS = [1024, 1100, 1151, 1160, 1182, 1200, 1240, 1250, 1251, 1280, 1366, 1440, 1536, 1680, 1920]

/**
 * Representative pages, chosen by HEADER WEIGHT rather than by locale:
 *  - Czech concept primaries carry BOTH language controls (the heaviest case)
 *  - German pages carry the longest nav labels
 *  - English pages are the lightest, and act as the control
 */
const PAGES: Array<[string, string]> = [
  ['/', 'cs home — both switchers'],
  ['/pro-zamestnavatele', 'cs L0 primary — both switchers'],
  ['/skladnici', 'cs L1 primary — both switchers'],
  ['/nabor-svarecu', 'cs L1 primary — both switchers'],
  ['/de', 'de L0 — longest nav labels'],
  ['/de/lagermitarbeiter', 'de L1'],
  ['/en/warehouse-workers', 'en L1 — lightest header'],
]

const answerConsent = async (page: Page) => {
  await page.addInitScript(() => { try { localStorage.setItem('cookie_consent', 'rejected') } catch {} })
}

/** See locale-mobile.spec.ts: never assert inside the pre-CSSOM window. */
const settled = async (page: Page) => {
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.evaluate(() => (document as any).fonts?.ready).catch(() => {})
  await page.waitForTimeout(200)
}

type Problem = string

/**
 * The measurement. Returns the problems a READER would experience.
 *
 * Deliberately does not consult scrollWidth on the document or body: that is
 * the number the overflow guard hides, and trusting it is how this shipped.
 */
async function headerProblems(page: Page): Promise<Problem[]> {
  return page.evaluate(() => {
    const problems: string[] = []
    const header = document.querySelector('.header') as HTMLElement | null
    if (!header) return ['no .header']
    // Pre-CSSOM frame: the stylesheet has not applied. Not a defect; not painted.
    if (getComputedStyle(header).position === 'static') return []

    const vw = window.innerWidth
    const inView = (r: DOMRect) => r.left >= -1 && r.right <= vw + 1
    const visible = (el: Element | null) => !!el && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().width > 0

    const named: Array<[string, Element | null]> = [
      ['logo', document.querySelector('.logo')],
      ['primary CTA', document.querySelector('.header__right .btn')],
      ['hamburger', document.querySelector('#burger')],
      ['locale switcher', document.querySelector('.locale-switcher--header')],
      ['legacy language widget', document.querySelector('.header__right .lang-switcher')],
    ]

    for (const [name, el] of named) {
      if (!visible(el)) continue
      const r = (el as Element).getBoundingClientRect()
      if (!inView(r)) problems.push(`${name} outside viewport (left ${Math.round(r.left)}, right ${Math.round(r.right)}, viewport ${vw})`)
      if ((el as HTMLElement).scrollWidth > (el as HTMLElement).clientWidth + 1) {
        problems.push(`${name} text clipped (${(el as HTMLElement).scrollWidth} > ${(el as HTMLElement).clientWidth})`)
      }
    }

    const nav = document.querySelector('.nav')
    const navShown = visible(nav)
    if (navShown) {
      const links = Array.from(nav!.querySelectorAll('a')).filter((a) => getComputedStyle(a).display !== 'none')
      for (const a of links) {
        const r = a.getBoundingClientRect()
        if (!inView(r)) problems.push(`nav link "${a.textContent?.trim().slice(0, 20)}" outside viewport`)
        if (a.scrollWidth > a.clientWidth + 1) problems.push(`nav link "${a.textContent?.trim().slice(0, 20)}" text clipped`)
      }
      // Overlap is measured from the LINKS, not from the nav box: a shrunk box
      // whose children overflow it reports a clean box and an overlapping page.
      const right = document.querySelector('.header__right')
      if (right && links.length) {
        const lastRight = Math.max(...links.map((a) => a.getBoundingClientRect().right))
        const rightLeft = right.getBoundingClientRect().left
        if (lastRight > rightLeft + 1) problems.push(`nav links overlap the header controls by ${Math.round(lastRight - rightLeft)}px`)
      }
    } else {
      // Nav collapsed: the mobile surface must be genuinely available.
      const burger = document.querySelector('#burger')
      if (!visible(burger)) problems.push('nav is collapsed but no hamburger is shown')
      else {
        const r = (burger as Element).getBoundingClientRect()
        if (r.width < 40 || r.height < 40) problems.push(`hamburger too small to hit (${Math.round(r.width)}x${Math.round(r.height)})`)
      }
    }

    // Pairwise overlap between the named controls that are actually shown.
    const boxes = named.filter(([, el]) => visible(el)).map(([n, el]) => [n, (el as Element).getBoundingClientRect()] as const)
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const [an, a] = boxes[i]
        const [bn, b] = boxes[j]
        const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left)
        const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
        if (overlapX > 1 && overlapY > 1) problems.push(`${an} overlaps ${bn} by ${Math.round(overlapX)}px`)
      }
    }
    return problems
  })
}

test.describe('header fits at every desktop width', () => {
  for (const [route, label] of PAGES) {
    test(`${route} (${label})`, async ({ page }) => {
      test.slow()
      await answerConsent(page)
      const failures: string[] = []

      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route, { waitUntil: 'domcontentloaded' })
        await settled(page)
        const problems = await headerProblems(page)
        for (const p of problems) failures.push(`${width}px: ${p}`)
      }

      expect(failures, `${route}\n  ${failures.join('\n  ')}`).toEqual([])
    })
  }

  test('the primary action is reachable at every width, by clicking it', async ({ page }) => {
    test.slow()
    await answerConsent(page)
    const failures: string[] = []

    for (const width of [1151, 1200, 1250, 1251, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/skladnici', { waitUntil: 'domcontentloaded' })
      await settled(page)

      const headerBtn = page.locator('.header__right .btn')
      if (await headerBtn.isVisible()) {
        await headerBtn.click()
        await page.waitForLoadState('domcontentloaded')
        if (!page.url().includes('/poptavka-pracovniku')) failures.push(`${width}px: header CTA click did not reach the request page (${page.url()})`)
      } else {
        // Collapsed: the action must exist in the mobile menu and work there.
        await page.locator('#burger').click()
        const menuCta = page.locator('.mobile-nav a.btn, .mobile-nav a[href="/poptavka-pracovniku"]').first()
        if (!(await menuCta.isVisible())) { failures.push(`${width}px: nav collapsed and no CTA in the mobile menu`); continue }
        await menuCta.click()
        await page.waitForLoadState('domcontentloaded')
        if (!page.url().includes('/poptavka-pracovniku')) failures.push(`${width}px: mobile-menu CTA did not reach the request page (${page.url()})`)
      }
    }
    expect(failures, failures.join('\n')).toEqual([])
  })
})

/**
 * The 1250px boundary, one pixel at a time.
 *
 * The collapse breakpoint moved from 1150 to 1250. A breakpoint is where two
 * layouts meet, so it is the one place where BOTH can be half-applied: the nav
 * still laid out while the hamburger has appeared, or neither surface offering
 * the primary action. Testing 1240 and 1280 would step over exactly that.
 *
 * "Only the correct nav mode is active" is the load-bearing assertion here. At
 * 1250 and below the desktop nav and the header CTA are gone and the mobile menu
 * is the surface; from 1251 up the desktop nav is the surface and the hamburger
 * is gone. Both visible at once, or neither, is the failure.
 *
 * Note the language switcher is NOT part of that swap: it hides only below
 * 900px, so it must remain reachable in the header across this whole band.
 */
const BOUNDARY_WIDTHS = [1248, 1249, 1250, 1251, 1252]
const BOUNDARY_PAGES: Array<[string, string]> = [
  ['/skladnici', 'cs L1 primary — both language controls'],
  ['/en/warehouse-workers', 'en localized'],
  ['/de/lagermitarbeiter', 'de localized'],
  ['/de', 'L0 locale page'],
]

test.describe('the 1250px breakpoint boundary', () => {
  for (const [route, label] of BOUNDARY_PAGES) {
    test(`${route} (${label}) switches cleanly across 1248-1252`, async ({ page }) => {
      test.slow()
      await answerConsent(page)
      const failures: string[] = []

      for (const width of BOUNDARY_WIDTHS) {
        const desktopExpected = width > 1250
        await page.setViewportSize({ width, height: 900 })
        await page.goto(route, { waitUntil: 'domcontentloaded' })
        await settled(page)

        for (const p of await headerProblems(page)) failures.push(`${width}px: ${p}`)

        const state = await page.evaluate(() => {
          const shown = (sel: string) => {
            const el = document.querySelector(sel)
            return !!el && getComputedStyle(el).display !== 'none' && el.getBoundingClientRect().width > 0
          }
          const box = (sel: string) => {
            const el = document.querySelector(sel)
            if (!el) return null
            const r = el.getBoundingClientRect()
            return { left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) }
          }
          return {
            navShown: shown('.nav'),
            burgerShown: shown('#burger'),
            headerCta: shown('.header__right .btn'),
            switcherShown: shown('.locale-switcher--header'),
            switcherBox: box('.locale-switcher--header'),
            vw: window.innerWidth,
          }
        })

        // Exactly one navigation mode, never both and never neither.
        if (state.navShown && state.burgerShown) failures.push(`${width}px: BOTH desktop nav and hamburger are active`)
        if (!state.navShown && !state.burgerShown) failures.push(`${width}px: NEITHER desktop nav nor hamburger is active`)
        if (state.navShown !== desktopExpected) {
          failures.push(`${width}px: desktop nav ${state.navShown ? 'shown' : 'hidden'}, expected ${desktopExpected ? 'shown' : 'hidden'}`)
        }
        if (state.headerCta !== desktopExpected) {
          failures.push(`${width}px: header CTA ${state.headerCta ? 'shown' : 'hidden'}, expected ${desktopExpected ? 'shown' : 'hidden'}`)
        }

        // The switcher is not part of the swap and must stay reachable.
        if (!state.switcherShown) failures.push(`${width}px: language switcher not shown`)
        else if (state.switcherBox && (state.switcherBox.left < 0 || state.switcherBox.right > state.vw)) {
          failures.push(`${width}px: language switcher outside viewport`)
        }

        // The primary action must be reachable on whichever surface is active.
        if (desktopExpected) {
          const btn = page.locator('.header__right .btn')
          if (!(await btn.isVisible())) failures.push(`${width}px: desktop mode but header CTA not visible`)
        } else {
          await page.locator('#burger').click()
          await page.waitForTimeout(150)
          const menuCta = page.locator('.mobile-nav a[href="/poptavka-pracovniku"], .mobile-nav a.btn').first()
          if (!(await menuCta.isVisible())) failures.push(`${width}px: collapsed mode but no CTA in the mobile menu`)
        }

        // Focus ring: keyboard users must be able to see where they are. The
        // switcher is the control most at risk, being the one that survives the
        // swap and sits beside whichever surface is active.
        //
        // The ring is a :focus-visible rule, and :focus-visible depends on the
        // last INPUT MODALITY, not on which element holds focus. A programmatic
        // .focus() after a mouse click therefore reports no ring on a page whose
        // ring is perfectly fine — and the collapsed branch above clicks the
        // hamburger. Pressing Tab first puts the document back into keyboard
        // modality so the rule is evaluated the way a keyboard user meets it.
        await page.keyboard.press('Tab')
        const ring = await page.evaluate(() => {
          const el = document.querySelector('.locale-switcher--header a') as HTMLElement | null
          if (!el) return { ok: false, why: 'no focusable switcher link' }
          el.focus()
          const cs = getComputedStyle(el)
          const hasOutline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0
          const hasShadow = cs.boxShadow !== 'none' && cs.boxShadow !== ''
          const focusVisible = el.matches(':focus-visible')
          return {
            ok: (hasOutline || hasShadow) && focusVisible,
            why: `:focus-visible=${focusVisible}, outline=${cs.outlineStyle} ${cs.outlineWidth}, boxShadow=${cs.boxShadow}`,
          }
        })
        if (!ring.ok) failures.push(`${width}px: focused switcher link shows no focus ring (${ring.why})`)
      }

      expect(failures, `${route}\n  ${failures.join('\n  ')}`).toEqual([])
    })
  }
})

/**
 * Instrument validation.
 *
 * Each of these breaks the layout on purpose and requires headerProblems() to
 * report it. If any of them passes silently, every zero above is meaningless and
 * this file is worth deleting.
 */
test.describe('negative controls: the measurement must fail on a broken header', () => {
  test('reverting the header container width reproduces the clipped CTA', async ({ page }) => {
    await answerConsent(page)
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/skladnici', { waitUntil: 'domcontentloaded' })
    await settled(page)
    expect(await headerProblems(page)).toEqual([])

    // The pre-fix state: the header's inner container capped at the reading column.
    await page.addStyleTag({ content: '.header .container { max-width: 1152px !important; }' })
    await page.waitForTimeout(120)
    const problems = await headerProblems(page)
    expect(problems.join(' '), 'restoring the old container width must reproduce the defect').toMatch(
      /outside viewport|overlap/,
    )
  })

  test('displacing a control out of the viewport is detected', async ({ page }) => {
    await answerConsent(page)
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/de', { waitUntil: 'domcontentloaded' })
    await settled(page)
    expect(await headerProblems(page)).toEqual([])

    await page.addStyleTag({ content: '.header__right .btn { position: relative !important; left: 600px !important; }' })
    await page.waitForTimeout(120)
    expect((await headerProblems(page)).join(' ')).toMatch(/primary CTA outside viewport/)
  })

  test('an overlap between two controls is detected', async ({ page }) => {
    await answerConsent(page)
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/skladnici', { waitUntil: 'domcontentloaded' })
    await settled(page)
    expect(await headerProblems(page)).toEqual([])

    // Drag the legacy widget back onto the locale switcher.
    await page.addStyleTag({ content: '.header__right .lang-switcher { position: relative !important; left: -60px !important; }' })
    await page.waitForTimeout(120)
    expect((await headerProblems(page)).join(' ')).toMatch(/overlaps/)
  })
})
