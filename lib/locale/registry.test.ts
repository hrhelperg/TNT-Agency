import { describe, it, expect } from 'vitest'
import {
  LOCALE_PILOT,
  PILOT_APPROVAL,
  LOCALES,
  LOCALE_PREFIX,
  LOCALE_HREFLANG,
  PILOT_MARKET,
  localeOf,
  publishedAlternates,
  isPublishable,
  futureRoutes,
  sourceRoutes,
} from './registry'

describe('locale derivation is pathname-only', () => {
  it('reads the locale from the path and nothing else', () => {
    expect(localeOf('/')).toBe('cs')
    expect(localeOf('/nabor-svarecu')).toBe('cs')
    expect(localeOf('/en')).toBe('en')
    expect(localeOf('/en/about')).toBe('en')
    expect(localeOf('/de')).toBe('de')
    expect(localeOf('/de/ueber-uns')).toBe('de')
  })

  it('does not mistake a Czech slug that merely starts with the letters', () => {
    // /english-something or /derivace... must stay Czech.
    expect(localeOf('/enderskeho-typu')).toBe('cs')
    expect(localeOf('/design-manual')).toBe('cs')
  })

  it('is a pure function of its argument — no headers, cookies or geo', () => {
    expect(localeOf.length).toBe(1)
    expect(String(localeOf)).not.toMatch(/document|window|navigator|header|cookie|geo/i)
  })
})

describe('the pilot registry states an honest current position', () => {
  it('covers exactly 12 source pages and 24 planned routes', () => {
    expect(LOCALE_PILOT).toHaveLength(12)
    expect(futureRoutes()).toHaveLength(24)
  })

  it('has no translation started and nothing indexable', () => {
    for (const e of LOCALE_PILOT) {
      for (const t of e.targets) {
        expect(t.translationStatus).toBe('NOT_STARTED')
        expect(t.indexingEligible).toBe(false)
        expect(t.pilotStatus).toBe('PLANNED')
      }
    }
  })

  it('claims no completed human review, because none has occurred', () => {
    for (const e of LOCALE_PILOT) {
      for (const t of e.targets) expect(t.editorialReviewStatus).not.toBe('COMPLETE')
      if (e.legalReviewRequired) expect(e.legalReviewStatus).toBe('PENDING')
    }
  })

  it('every planned route is unique', () => {
    const routes = futureRoutes()
    expect(new Set(routes).size).toBe(routes.length)
  })

  it('no planned route collides with a Czech source route', () => {
    const sources = new Set(sourceRoutes())
    for (const r of futureRoutes()) expect(sources.has(r)).toBe(false)
  })

  it('Czech is unprefixed — the reason this architecture is reversible', () => {
    expect(LOCALE_PREFIX.cs).toBe('')
    expect(LOCALE_PREFIX.en).toBe('/en')
    expect(LOCALE_PREFIX.de).toBe('/de')
    expect(futureRoutes().every((r) => r.startsWith('/en') || r.startsWith('/de'))).toBe(true)
  })

  it('declares no /cs/, /cz/ or /cs-cz/ route anywhere', () => {
    for (const r of futureRoutes()) expect(r).not.toMatch(/^\/(cs|cz|cs-cz)(\/|$)/)
  })

  it('every localized page self-canonicalises', () => {
    for (const e of LOCALE_PILOT) for (const t of e.targets) expect(t.canonicalPolicy).toBe('SELF')
  })

  it('market is Czech for every page regardless of language', () => {
    // Language is not market: a German page about Czech hiring is not a
    // Germany-targeted service page.
    expect(PILOT_MARKET).toBe('cz')
  })

  it('flags legal review exactly where a statutory or contractual claim is made', () => {
    const flagged = LOCALE_PILOT.filter((e) => e.legalReviewRequired).map((e) => e.sourceRoute).sort()
    expect(flagged).toEqual(['/kalkulacka-mzdy-agenturniho-zamestnance', '/o-nas', '/poptavka-pracovniku'])
  })

  it('includes the measured twelfth route and records why', () => {
    const twelfth = LOCALE_PILOT.find((e) => e.sourceRoute === '/pracovnici-pro-vyrobu')
    expect(twelfth).toBeTruthy()
    expect(twelfth!.rationale).toMatch(/35 unique contextual inbound sources/)
    expect(twelfth!.cluster).toBe('industry')
  })
})

describe('owner approval is recorded as data, not assumed', () => {
  it('every pilot route carries explicit owner approval', () => {
    for (const e of LOCALE_PILOT) expect(e.ownerApproved, e.sourceRoute).toBe(true)
  })

  it('records the approved URL policy', () => {
    expect(PILOT_APPROVAL.urlPolicy).toBe('TRANSLATED_SLUGS')
  })

  it('slugs are a stable contract, never generated at build time', () => {
    expect(PILOT_APPROVAL.slugsAreGenerated).toBe(false)
    expect(PILOT_APPROVAL.slugStabilityContract).toBe(true)
  })

  it('uses the owner-specified German slug for the vacancy-cost page', () => {
    const e = LOCALE_PILOT.find((x) => x.sourceRoute === '/cena-neobsazene-pozice')!
    expect(e.targets.find((t) => t.locale === 'de')!.futureRoute).toBe('/de/kosten-einer-unbesetzten-stelle')
    expect(e.targets.find((t) => t.locale === 'en')!.futureRoute).toBe('/en/cost-of-vacancy')
  })
})

describe('publication gating', () => {
  const entry = LOCALE_PILOT[0]
  const base = entry.targets[0]

  it('nothing is publishable today', () => {
    for (const e of LOCALE_PILOT) for (const t of e.targets) expect(isPublishable(e, t)).toBe(false)
  })

  it('an approved translation still needs editorial review', () => {
    expect(isPublishable(entry, { ...base, translationStatus: 'APPROVED' })).toBe(false)
  })

  it('approved plus editorial review is publishable when no legal review is required', () => {
    expect(entry.legalReviewRequired).toBe(false)
    expect(
      isPublishable(entry, { ...base, translationStatus: 'APPROVED', editorialReviewStatus: 'COMPLETE' }),
    ).toBe(true)
  })

  it('a legal-review page is not publishable until legal sign-off', () => {
    const legal = LOCALE_PILOT.find((e) => e.legalReviewRequired)!
    const t = { ...legal.targets[0], translationStatus: 'APPROVED' as const, editorialReviewStatus: 'COMPLETE' as const }
    expect(isPublishable(legal, t)).toBe(false)
    expect(isPublishable({ ...legal, legalReviewStatus: 'COMPLETE' }, t)).toBe(true)
  })
})

describe('hreflang is never speculative', () => {
  it('emits nothing at all while no sibling is published', () => {
    for (const e of LOCALE_PILOT) expect(publishedAlternates(e.hreflangGroup)).toEqual([])
  })

  it('returns an empty set for an unknown group rather than guessing', () => {
    expect(publishedAlternates('does-not-exist')).toEqual([])
  })

  it('uses the correct hreflang codes', () => {
    expect(LOCALE_HREFLANG.cs).toBe('cs-CZ')
    expect(LOCALE_HREFLANG.en).toBe('en')
    expect(LOCALE_HREFLANG.de).toBe('de')
    expect(Object.keys(LOCALE_HREFLANG).sort()).toEqual([...LOCALES].sort())
  })
})
