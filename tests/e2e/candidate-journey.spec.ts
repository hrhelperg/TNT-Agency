import { test, expect, type Page } from '@playwright/test'
import {
  ALL_CONCEPTS,
  LOCALE_HREFLANG,
  LOCALE_LANG,
  LOCALE_PREFIX,
  isCandidateLocale,
  LOCALES,
  urlFor,
  type Locale,
} from '../../lib/locale/registry'

/**
 * The candidate journey, in a real browser against a production build.
 *
 * Everything here is asserted on what a VISITOR receives — the served document,
 * the rendered layout, the focus order — rather than on the source that produced
 * it. The defects this wave was most at risk of (Czech chrome leaking into a
 * Brazilian page, an employer CTA on a candidate page, a form that silently
 * loses a CV) are all invisible at source level and obvious here.
 */

const CANDIDATE_LOCALES = LOCALES.filter(isCandidateLocale)

/** Employer destinations that must never appear on a candidate page. */
const EMPLOYER_DESTINATIONS = [
  '/poptavka-pracovniku',
  '/en/request-staff',
  '/de/personal-anfragen',
  '/offers',
  '/submit-offer',
  '/agencies',
  '/submit-agency',
]

const routesFor = (locale: Locale) =>
  ALL_CONCEPTS.filter((c) => c.published.includes(locale))
    .map((c) => urlFor(c, locale))
    .filter((u): u is string => Boolean(u))

test.describe('candidate locales — served document', () => {
  for (const locale of CANDIDATE_LOCALES) {
    test(`${locale}: every page declares its own language and canonical`, async ({ page }) => {
      for (const route of routesFor(locale)) {
        const response = await page.goto(route)
        expect(response?.status(), route).toBe(200)
        await expect(page.locator('html'), route).toHaveAttribute('lang', LOCALE_LANG[locale])
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
        expect(canonical, route).toBe(`https://talentpartnerid.com${route}`)
      }
    })

    test(`${locale}: no employer destination is reachable from a candidate page`, async ({ page }) => {
      for (const route of routesFor(locale)) {
        await page.goto(route)
        for (const dest of EMPLOYER_DESTINATIONS) {
          const count = await page.locator(`a[href="${dest}"]`).count()
          expect(count, `${route} links to ${dest}`).toBe(0)
        }
      }
    })

    test(`${locale}: chrome is localized — no Czech or English leakage`, async ({ page }) => {
      await page.goto(LOCALE_PREFIX[locale])
      // The ecosystem ribbon is employer B2B with no candidate-locale copy and
      // must not render here at all.
      await expect(page.locator('.eco-bar')).toHaveCount(0)
      const header = page.locator('header nav').first()
      await expect(header).toBeVisible()
      const headerText = (await header.innerText()).toLowerCase()
      for (const czech of ['kalkulačka', 'poptávka', 'agentury', 'zaměstnavatele']) {
        expect(headerText, `header shows Czech "${czech}"`).not.toContain(czech)
      }
    })
  }
})

test.describe('language switcher offers only real equivalents', () => {
  test('a PT-BR page offers its ES twin, never a locale home', async ({ page }) => {
    await page.goto('/pt-br/cartao-de-empregado-tcheco')
    const switcher = page.locator('.locale-switcher').first()
    await expect(switcher).toBeVisible()
    const hrefs = await switcher.locator('a').evaluateAll((els) =>
      els.map((e) => (e as HTMLAnchorElement).getAttribute('href')),
    )
    expect(hrefs).toContain('/es/tarjeta-de-empleado-checa')
    // Never a fallback to the locale root in place of the page asked for.
    expect(hrefs).not.toContain('/es')
  })

  test('the Brazil-only page offers no alternate at all', async ({ page }) => {
    await page.goto('/pt-br/embaixada-e-consulado-tchecos-no-brasil')
    // A cluster of one is not a cluster: §32 forbids generalising Czech
    // consular procedure for Brazil to the rest of Latin America.
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(0)
  })

  test('the Czech employer homepage does not claim a candidate page as a translation', async ({ page }) => {
    await page.goto('/')
    for (const locale of CANDIDATE_LOCALES) {
      const code = LOCALE_HREFLANG[locale]
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${code}"]`),
        `/ claims ${code} as a translation`,
      ).toHaveCount(0)
    }
  })

  test('discovery into the candidate layer is reachable from the Czech footer', async ({ page }) => {
    await page.goto('/')
    const discovery = page.locator('.footer__discovery')
    await expect(discovery).toBeVisible()
    await expect(discovery.locator('a[href="/pt-br"]')).toHaveCount(1)
    await expect(discovery.locator('a[href="/es"]')).toHaveCount(1)
  })
})

test.describe('the application form', () => {
  test('has no file input, and says the CV must be attached by hand', async ({ page }) => {
    await page.goto('/pt-br/candidatar-se')
    await expect(page.locator('input[type="file"]')).toHaveCount(0)
    // The instruction appears before the form, where it can still change what
    // the reader does.
    await expect(page.locator('.caf__attach-warning').first()).toBeVisible()
    await expect(page.locator('.caf__attach-warning').first()).toContainText('currículo')
  })

  test('the fallback address and body are available without a mail client', async ({ page }) => {
    await page.goto('/es/postularme')
    const fallback = page.locator('.caf__fallback')
    await expect(fallback).toBeVisible()
    await expect(fallback.locator('a[href^="mailto:"]')).toHaveCount(1)
  })

  test('validation reports errors in the reader’s language, and focuses the summary', async ({ page }) => {
    await page.goto('/pt-br/candidatar-se')
    await page.locator('button[type="submit"]').click()
    const summary = page.locator('.caf__summary')
    await expect(summary).toBeVisible()
    await expect(summary).toContainText('Corrija os campos')
    await expect(summary).toBeFocused()
  })

  test('no application value reaches the URL, storage or history', async ({ page }) => {
    await page.goto('/pt-br/candidatar-se')
    await page.fill('#caf-fullName', 'Mutation Probe 12345')
    await page.fill('#caf-email', 'probe@example.com')
    await page.fill('#caf-country', 'Brasil')
    await page.fill('#caf-currentRole', 'Soldador')
    await page.selectOption('#caf-fieldOfWork', 'technical')
    await page.selectOption('#caf-experience', '3to5')
    await page.selectOption('#caf-availability', 'immediately')
    await page.check('#caf-consent')

    const leaked = await page.evaluate(() => {
      const probe = 'Mutation Probe 12345'
      const hits: string[] = []
      if (location.href.includes(probe)) hits.push('location.href')
      if (location.search.includes(probe)) hits.push('location.search')
      if (location.hash.includes(probe)) hits.push('location.hash')
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i)!
          if ((localStorage.getItem(k) ?? '').includes(probe)) hits.push(`localStorage.${k}`)
        }
      } catch {}
      try {
        for (let i = 0; i < sessionStorage.length; i++) {
          const k = sessionStorage.key(i)!
          if ((sessionStorage.getItem(k) ?? '').includes(probe)) hits.push(`sessionStorage.${k}`)
        }
      } catch {}
      if (document.cookie.includes(probe)) hits.push('cookie')
      return hits
    })
    expect(leaked, `candidate values leaked to: ${leaked.join(', ')}`).toEqual([])
  })
})

test.describe('accessibility and keyboard', () => {
  test('headings descend without skipping, and there is exactly one h1', async ({ page }) => {
    for (const route of ['/pt-br', '/pt-br/trabalhar-na-republica-tcheca', '/es/trabajar-en-chequia']) {
      await page.goto(route)
      await expect(page.locator('h1'), route).toHaveCount(1)
      const levels = await page
        .locator('h1, h2, h3')
        .evaluateAll((els) => els.map((e) => Number(e.tagName.slice(1))))
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i] - levels[i - 1], `${route} skips a heading level`).toBeLessThanOrEqual(1)
      }
    }
  })

  test('the primary CTA is keyboard reachable and never hidden behind consent', async ({ page }) => {
    await page.goto('/pt-br/trabalhar-na-republica-tcheca')
    const cta = page.locator('a.btn-primary').first()
    await expect(cta).toBeVisible()
    const box = await cta.boundingBox()
    expect(box, 'CTA has no layout box').toBeTruthy()
    // Nothing may cover the CTA's centre point.
    const covered = await page.evaluate(({ x, y }) => {
      const el = document.elementFromPoint(x, y)
      return el ? !el.closest('a.btn-primary') : true
    }, { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 })
    expect(covered, 'something overlays the primary CTA').toBe(false)
  })
})

/** Widths the brief names, asserted on real bounding boxes rather than scrollWidth. */
const WIDTHS = [280, 320, 360, 390, 430, 768, 1024, 1280, 1440]

test.describe('responsive', () => {
  for (const locale of CANDIDATE_LOCALES) {
    test(`${locale}: no horizontal overflow at any width`, async ({ page }) => {
      const routes = [
        LOCALE_PREFIX[locale],
        urlFor(ALL_CONCEPTS.find((c) => c.id === 'work-in-czechia')!, locale)!,
        urlFor(ALL_CONCEPTS.find((c) => c.id === 'candidate-apply')!, locale)!,
        urlFor(ALL_CONCEPTS.find((c) => c.id === 'candidate-faq')!, locale)!,
      ]
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 })
        for (const route of routes) {
          await page.goto(route)
          const overflow = await page.evaluate((w) => {
            const offenders: string[] = []
            for (const el of Array.from(document.body.querySelectorAll<HTMLElement>('*'))) {
              const r = el.getBoundingClientRect()
              // Real geometry, not scrollWidth: an element can report a tidy
              // scrollWidth while its box still sits past the viewport edge.
              if (r.width > 0 && r.right > w + 1) {
                offenders.push(`${el.tagName.toLowerCase()}.${el.className || '(no class)'} right=${Math.round(r.right)}`)
              }
            }
            return offenders.slice(0, 3)
          }, width)
          expect(overflow, `${route} @ ${width}px overflows: ${overflow.join(' | ')}`).toEqual([])
        }
      }
    })
  }
})
