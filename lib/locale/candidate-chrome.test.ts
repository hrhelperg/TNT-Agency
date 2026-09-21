import { describe, it, expect } from 'vitest'
import {
  ALL_CONCEPTS,
  LOCALES,
  LOCALIZED_LOCALES,
  LOCALE_AUDIENCE,
  LOCALE_PREFIX,
  LOCALE_HREFLANG,
  LOCALE_LANG,
  alternatesFor,
  isCandidateLocale,
  primaryUrl,
  urlFor,
  hasXDefault,
  csPrimaryOf,
} from './registry'
import { CHROME_ARIA, CHROME_NAV, CHROME_FOOTER, HOME_LABEL } from './chrome'
import {
  CANDIDATE_NAV,
  CANDIDATE_FOOTER,
  CANDIDATE_NAV_TARGETS,
  CANDIDATE_FOOTER_TARGETS,
  CANDIDATE_FOOTER_COLUMNS,
  CANDIDATE_CTA,
  DISCOVERY_LABEL,
  DISCOVERY_TARGETS,
  languageLabelFor,
} from './candidate-chrome'

/**
 * Destinations a candidate page may never link to.
 *
 * Employer conversion surfaces and the Czech marketplace. A candidate arriving
 * at "Request workers" has been routed to the wrong side of the market, which
 * is the historical defect §34 exists to prevent.
 */
const EMPLOYER_DESTINATIONS = [
  '/poptavka-pracovniku',
  '/en/request-staff',
  '/de/personal-anfragen',
  '/offers',
  '/submit-offer',
  '/agencies',
  '/submit-agency',
]

describe('locale audience', () => {
  /**
   * The EmployerLocale type is written out because TypeScript cannot narrow a
   * union from a runtime record. This is the assertion that keeps it honest —
   * without it, adding an employer locale would silently render a header whose
   * labels are undefined, since tsconfig sets "strict": false and indexing
   * CHROME_NAV with an unknown key is not a type error.
   */
  it('the employer chrome covers exactly the employer locales', () => {
    const employer = LOCALES.filter((l) => LOCALE_AUDIENCE[l] === 'employer')
    expect([...employer].sort()).toEqual(['cs', 'de', 'en'])
    for (const locale of employer) {
      expect(CHROME_NAV[locale], `CHROME_NAV is missing ${locale}`).toBeTruthy()
      expect(CHROME_FOOTER[locale], `CHROME_FOOTER is missing ${locale}`).toBeTruthy()
    }
  })

  it('the candidate chrome covers exactly the candidate locales', () => {
    const candidate = LOCALES.filter(isCandidateLocale)
    expect([...candidate].sort()).toEqual(['es', 'pt-BR'])
    for (const locale of candidate) {
      expect(CANDIDATE_NAV[locale], `CANDIDATE_NAV is missing ${locale}`).toBeTruthy()
      expect(CANDIDATE_FOOTER[locale], `CANDIDATE_FOOTER is missing ${locale}`).toBeTruthy()
    }
  })

  it('every locale has aria, home label and a language label', () => {
    for (const locale of LOCALES) {
      expect(CHROME_ARIA[locale], `CHROME_ARIA is missing ${locale}`).toBeTruthy()
      expect(HOME_LABEL[locale], `HOME_LABEL is missing ${locale}`).toBeTruthy()
      expect(languageLabelFor(locale), `no language label for ${locale}`).toBeTruthy()
      expect(DISCOVERY_LABEL[locale], `DISCOVERY_LABEL is missing ${locale}`).toBeTruthy()
    }
  })
})

describe('locale constants', () => {
  it('declares prefix, hreflang and lang for every locale', () => {
    for (const locale of LOCALES) {
      expect(LOCALE_HREFLANG[locale]).toBeTruthy()
      expect(LOCALE_LANG[locale]).toBeTruthy()
      expect(LOCALE_PREFIX[locale] === '' || LOCALE_PREFIX[locale].startsWith('/')).toBe(true)
    }
  })

  /**
   * pt-BR is the case that breaks prefix composition: the BCP 47 id is
   * mixed-case and the URL prefix is lowercase. Anything building `/${locale}`
   * would look for /pt-BR and find nothing.
   */
  it('never assumes the URL prefix equals the locale id', () => {
    expect(LOCALE_PREFIX['pt-BR']).toBe('/pt-br')
    expect(LOCALE_PREFIX['pt-BR']).not.toBe(`/${'pt-BR'}`)
    expect(LOCALE_HREFLANG['pt-BR']).toBe('pt-BR')
    expect(LOCALE_LANG['pt-BR']).toBe('pt-BR')
  })
})

describe('candidate chrome cannot route to the employer funnel', () => {
  it('every candidate nav and footer target is a candidate or shared concept', () => {
    for (const target of [...CANDIDATE_NAV_TARGETS, ...CANDIDATE_FOOTER_TARGETS, CANDIDATE_CTA]) {
      const concept = ALL_CONCEPTS.find((c) => c.id === target.conceptId)
      expect(concept, `candidate chrome references unknown concept "${target.conceptId}"`).toBeTruthy()
      expect(
        concept!.audience,
        `candidate chrome links to "${target.conceptId}", whose audience is ${concept!.audience}`,
      ).not.toBe('employer')
    }
  })

  it('no candidate chrome target resolves to an employer destination', () => {
    for (const locale of LOCALES.filter(isCandidateLocale)) {
      for (const target of [...CANDIDATE_NAV_TARGETS, ...CANDIDATE_FOOTER_TARGETS, CANDIDATE_CTA]) {
        const concept = ALL_CONCEPTS.find((c) => c.id === target.conceptId)
        if (!concept || !concept.published.includes(locale)) continue
        const href = urlFor(concept, locale)
        expect(EMPLOYER_DESTINATIONS, `${locale}/${target.conceptId} → ${href}`).not.toContain(href)
      }
    }
  })

  it('the primary CTA is the application concept, never a listing', () => {
    expect(CANDIDATE_CTA.conceptId).toBe('candidate-apply')
  })

  it('every footer column key has a label in both candidate locales', () => {
    for (const locale of LOCALES.filter(isCandidateLocale)) {
      for (const column of CANDIDATE_FOOTER_COLUMNS) {
        expect(CANDIDATE_FOOTER[locale][column.title]).toBeTruthy()
        for (const key of column.keys) {
          expect(CANDIDATE_FOOTER[locale][key], `${locale} footer key ${key}`).toBeTruthy()
        }
      }
    }
  })
})

describe('discovery is navigation, never hreflang equivalence', () => {
  /**
   * The load-bearing separation of the whole wave. If a discovery target ever
   * appears in alternatesFor(), the Czech employer homepage starts claiming a
   * Brazilian candidate page as its translation.
   */
  it('no discovery target is an alternate of a Czech employer route', () => {
    for (const target of DISCOVERY_TARGETS) {
      const home = LOCALE_PREFIX[target.locale]
      const czechHomeAlternates = alternatesFor('/').map((a) => a.url)
      expect(czechHomeAlternates, `discovery target ${home} leaked into the / cluster`).not.toContain(home)
    }
  })

  it('the candidate home is not clustered with any employer home', () => {
    for (const employerHome of ['/', '/en', '/de']) {
      const alts = alternatesFor(employerHome).map((a) => a.url)
      for (const target of DISCOVERY_TARGETS) {
        expect(alts, `${employerHome} claims ${LOCALE_PREFIX[target.locale]} as a translation`).not.toContain(
          LOCALE_PREFIX[target.locale],
        )
      }
    }
  })
})

describe('registry invariants for locale-native concepts', () => {
  it('a locale-native concept never publishes cs and owns its primary locale', () => {
    for (const c of ALL_CONCEPTS) {
      if (c.kind !== 'locale-native') continue
      expect(c.published, `${c.id} publishes cs`).not.toContain('cs')
      expect(csPrimaryOf(c), `${c.id} reports a Czech primary`).toBeUndefined()
      expect(c.urls[c.primaryLocale], `${c.id} has no URL for its primaryLocale`).toBeTruthy()
      expect(primaryUrl(c)).toBe(c.urls[c.primaryLocale])
    }
  })

  /**
   * x-default points at the Czech root — right for an unmatched visitor to a
   * Czech company's page, wrong for an unmatched Brazilian candidate, whose
   * "default" would be an employer homepage in a language they did not ask for.
   */
  it('locale-native clusters carry no x-default', () => {
    for (const c of ALL_CONCEPTS) {
      expect(hasXDefault(c)).toBe(c.kind === 'czech-derived')
    }
  })

  it('every czech-derived concept still has a Czech primary', () => {
    for (const c of ALL_CONCEPTS) {
      if (c.kind !== 'czech-derived') continue
      expect(csPrimaryOf(c), `${c.id} lost its Czech primary`).toBeTruthy()
    }
  })

  it('alternates are reciprocal in every locale', () => {
    for (const locale of LOCALIZED_LOCALES) {
      for (const c of ALL_CONCEPTS) {
        if (!c.published.includes(locale)) continue
        const url = urlFor(c, locale)
        if (!url) continue
        const back = alternatesFor(url).map((a) => a.url)
        // A single-member cluster emits nothing at all, which is correct.
        if (!back.length) continue
        expect(back, `${url} is not in its own alternate set`).toContain(url)
      }
    }
  })
})
