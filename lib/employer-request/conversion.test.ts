import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { CTA_COPY, buildCtaHref, REQUEST_PATH } from './cta'
import { CTA_SOURCES } from '../attribution'
import { REQUEST_FIELDS } from './schema'

const ROOT = process.cwd()
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8')

const FORM = read('components/EmployerRequestForm.tsx')
const CTA = read('components/EmployerCta.tsx')
const PAGE = read('pages/poptavka-pracovniku.tsx')
const HEADER = read('components/Header.tsx')
const HOME_CALC = read('components/HomePayrollCalculator.tsx')
const AGV = read('components/HomeAgencyValue.tsx')
const RESP = read('components/ResponsibilityMatrix.tsx')
const DCALC = read('pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx')
const SITEMAP = read('public/sitemap.xml')

/** Source with comments removed — for assertions about emitted code only. */
const stripComments = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')

const PAGE_CODE = stripComments(PAGE)

const LANGS = ['cs', 'en', 'de'] as const
const VARIANTS = ['calculator', 'comparison', 'agencyValue', 'responsibility'] as const

describe('Phase C — privacy of the request form', () => {
  it('never transmits: no fetch/XHR/beacon/analytics in the form or CTA', () => {
    const forbidden = /fetch\(|XMLHttpRequest|sendBeacon navigator|navigator\.sendBeacon|gtag\(|dataLayer|axios|\$\.ajax/
    for (const [name, src] of [['form', FORM], ['cta', CTA], ['page', PAGE]] as const) {
      expect(forbidden.test(src), `${name} must not transmit`).toBe(false)
    }
  })

  it('never persists request values to storage, cookies or IndexedDB', () => {
    // The form may not touch any persistent store. (Attribution uses
    // sessionStorage, but only inside lib/attribution — never here.)
    const persistence = /localStorage|document\.cookie|indexedDB|window\.name/
    expect(persistence.test(FORM)).toBe(false)
    expect(persistence.test(CTA)).toBe(false)
  })

  it('never writes request values to the URL or history', () => {
    const urlWrites = /history\.(push|replace)State|location\.search\s*=|URLSearchParams\(\)\.set|location\.hash\s*=/
    expect(urlWrites.test(FORM)).toBe(false)
    // The only navigation is the mailto handoff.
    expect(FORM).toContain('window.location.href = mail.href')
  })

  it('prevents native form submission (a GET would leak every value into the URL)', () => {
    expect(FORM).toContain('e.preventDefault()')
    expect(FORM).toContain('noValidate')
    // No method="get" / action attribute that could bypass the handler.
    expect(/action=|method=/.test(FORM)).toBe(false)
  })

  it('states plainly that calculator values are not transferred, in all languages', () => {
    for (const l of LANGS) {
      expect(CTA_COPY[l].calculator.note.length).toBeGreaterThan(10)
      expect(CTA_COPY[l].comparison.note.length).toBeGreaterThan(10)
    }
  })
})

describe('Phase C — CTA cannot leak calculator values', () => {
  it('buildCtaHref emits only the source parameter', () => {
    for (const s of CTA_SOURCES) {
      const href = buildCtaHref(s)
      expect(href.startsWith(`${REQUEST_PATH}?source=`)).toBe(true)
      // Exactly one query parameter.
      expect(href.split('?')[1].split('&').length).toBe(1)
    }
  })

  it('no CTA link anywhere carries a salary/cost/fee parameter', () => {
    const leaky = /\?[^"'`\s]*\b(gross|net|salary|mzda|cost|naklad|fee|marze|margin|budget|amount)\b/i
    for (const [name, src] of [
      ['cta', CTA], ['home-calc', HOME_CALC], ['agency-value', AGV],
      ['responsibility', RESP], ['dedicated-calc', DCALC], ['header', HEADER],
    ] as const) {
      expect(leaky.test(src), `${name} has a value-carrying link`).toBe(false)
    }
  })

  it('every wired CTA source is a declared, non-sensitive CtaSource', () => {
    const used = Array.from(
      [HOME_CALC, AGV, RESP, DCALC].join('\n').matchAll(/source="([a-z-]+)"/g),
    ).map((m) => m[1])
    expect(used.length).toBeGreaterThanOrEqual(4)
    for (const s of used) expect(CTA_SOURCES as readonly string[]).toContain(s)
  })

  it('is wired into every surface the specification requires', () => {
    expect(HOME_CALC).toContain('source="homepage-calculator"')
    expect(DCALC).toContain('source="dedicated-calculator"')
    expect(DCALC).toContain('source="agency-comparison"')
    expect(AGV).toContain('source="agency-value"')
    expect(RESP).toContain('source="responsibility-matrix"')
  })

  it('CTA copy has cs/en/de parity across every variant', () => {
    for (const v of VARIANTS) {
      for (const l of LANGS) {
        const c = CTA_COPY[l][v]
        expect(Object.keys(c).sort()).toEqual(['note', 'primary', 'secondary', 'text', 'title'])
        for (const val of Object.values(c)) expect(val.length).toBeGreaterThan(3)
      }
    }
  })

  it('uses no dark patterns: no countdown, fake urgency or waiting-companies claim', () => {
    const dark = /countdown|hurry|only \d+ left|spots? left|companies are waiting|čeká na vás \d|jen dnes|nur heute|last chance/i
    for (const l of LANGS) {
      expect(dark.test(JSON.stringify(CTA_COPY[l]))).toBe(false)
    }
  })
})

describe('Phase C — accessibility of the request form', () => {
  it('every control has a real <label htmlFor>, not placeholder-only text', () => {
    expect(FORM).toContain('htmlFor={f.name}')
    // No placeholder is used to carry a field name.
    expect(/placeholder=/.test(FORM)).toBe(false)
  })

  it('marks required and optional fields in text, not by colour alone', () => {
    expect(FORM).toContain('copy.requiredMark')
    expect(FORM).toContain('copy.optionalMark')
  })

  it('exposes validation state to assistive tech', () => {
    expect(FORM).toContain("'aria-invalid'")
    expect(FORM).toContain("'aria-describedby'")
    expect(FORM).toContain('role="alert"')
    expect(FORM).toContain('aria-live="polite"')
    expect(FORM).toContain('role="status"')
  })

  it('moves focus to the error summary so failures are announced', () => {
    expect(FORM).toContain('summaryRef.current?.focus()')
    expect(FORM).toContain('tabIndex={-1}')
  })

  it('groups fields in fieldsets with legends', () => {
    expect(FORM).toContain('<fieldset')
    expect(FORM).toContain('<legend>')
  })

  it('gives the fallback textarea an accessible name', () => {
    expect(FORM).toContain('aria-label={copy.mailtoFallbackNote}')
  })
})

describe('Phase C — SEO, schema and routing', () => {
  it('emits Service, WebPage, FAQPage and BreadcrumbList schema', () => {
    for (const t of ["'Service'", "'WebPage'", "'FAQPage'", "'BreadcrumbList'"]) {
      expect(PAGE).toContain(t)
    }
  })

  it('makes no fake Review, AggregateRating, JobPosting or LocalBusiness claims', () => {
    // Assert on emitted code, not prose: an explanatory comment may legitimately
    // name the schema types we refuse to fabricate.
    for (const forbidden of ['AggregateRating', 'Review', 'JobPosting', 'LocalBusiness', 'ratingValue']) {
      expect(PAGE_CODE, `${forbidden} must not be emitted`).not.toContain(forbidden)
    }
  })

  it('has a single canonical URL and no hreflang (there are no localized routes)', () => {
    expect(PAGE).toContain('rel="canonical"')
    expect(PAGE).not.toContain('hrefLang')
    expect((PAGE.match(/rel="canonical"/g) || []).length).toBe(1)
  })

  it('FAQ schema is built from the visible FAQ copy', () => {
    expect(PAGE).toContain('csCopy.faq.map')
    expect(PAGE).toContain('copy.faq.map')
  })

  it('the route is registered in the sitemap exactly once', () => {
    const occurrences = (SITEMAP.match(/talentpartnerid\.com\/poptavka-pracovniku</g) || []).length
    expect(occurrences).toBe(1)
  })

  it('references no old domain', () => {
    expect(/manpower-tnt\.agency|manpowertnt\.agency|tntgency\.org/i.test(PAGE)).toBe(false)
  })

  it('the header links to the request page in desktop and mobile navigation', () => {
    expect((HEADER.match(/\/poptavka-pracovniku/g) || []).length).toBeGreaterThanOrEqual(3)
    expect(HEADER).toContain('data-i18n="nav.requestWorkers"')
    expect(HEADER).toContain('data-i18n="mnav.requestWorkers"')
  })

  it('renders every schema field on the page through the shared registry', () => {
    // The form maps the schema, so field coverage cannot drift from the email.
    expect(FORM).toContain('fieldsInGroup(group)')
    expect(REQUEST_FIELDS.length).toBeGreaterThanOrEqual(22)
  })
})
