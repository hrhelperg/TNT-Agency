import { SITE_EXPECTED } from './l1-manifest'
import { describe, it, expect } from 'vitest'
import { localeFromPathname } from './route-locale'
import {
  PUBLISHED_LOCALIZED_ROUTES,
  CZECH_ROUTES,
  LOCALE_PREFIX,
  LOCALIZED_LOCALES,
} from './registry'

describe('localeFromPathname', () => {
  it('assigns every published localized route to its own locale', () => {
    // Expectation derived from LOCALE_PREFIX, not composed from the locale id.
    // `/${locale}` happened to equal the prefix while every id was a bare
    // two-letter code; pt-BR breaks that, since the id is mixed-case BCP 47 and
    // the prefix is lowercase /pt-br. The longest matching prefix wins so that
    // a hypothetical /es-MX could never be mistaken for /es.
    const byPrefix = LOCALIZED_LOCALES.map((l) => [LOCALE_PREFIX[l], l] as const).sort(
      (a, b) => b[0].length - a[0].length,
    )
    for (const route of PUBLISHED_LOCALIZED_ROUTES) {
      const hit = byPrefix.find(([prefix]) => route === prefix || route.startsWith(`${prefix}/`))
      expect(hit, `${route} carries no known locale prefix`).toBeTruthy()
      expect(localeFromPathname(route), route).toBe(hit![1])
    }
    // Not a fixed number any more: L1 publishes cluster by cluster. What must
    // hold is that every published route is prefixed and none is Czech.
    // The site-wide total: L1's frozen 96 plus everything declared in
    // POST_L1_ADDITIONS since. L1's own figure is never edited.
    expect(PUBLISHED_LOCALIZED_ROUTES.length).toBe(SITE_EXPECTED.localizedRoutes)
    expect(
      PUBLISHED_LOCALIZED_ROUTES.every((r) =>
        byPrefix.some(([prefix]) => r === prefix || r.startsWith(`${prefix}/`)),
      ),
    ).toBe(true)
  })

  it('leaves every Czech route unprefixed — null, never a locale', () => {
    for (const route of CZECH_ROUTES) {
      expect(localeFromPathname(route), route).toBeNull()
    }
  })

  it('matches on a path SEGMENT, not a string prefix', () => {
    // The bug this guards: /english-something or /department would both start
    // with "/en"/"/de" as raw text and be mislabelled.
    expect(localeFromPathname('/english-speaking-jobs')).toBeNull()
    expect(localeFromPathname('/department-store')).toBeNull()
    expect(localeFromPathname('/enterprise')).toBeNull()
    expect(localeFromPathname('/de-registrace')).toBeNull()
    expect(localeFromPathname('/en')).toBe('en')
    expect(localeFromPathname('/de')).toBe('de')
    expect(localeFromPathname('/en/anything')).toBe('en')
  })

  it('answers for a locale route the registry has not caught up with', () => {
    // Deliberate: prefix beats registry lookup, so a new page cannot silently
    // render Czech chrome just because nobody added it to the registry yet.
    expect(localeFromPathname('/en/not-in-the-registry-yet')).toBe('en')
    expect(localeFromPathname('/de/noch-nicht-registriert')).toBe('de')
  })

  it('is defensive about missing input', () => {
    expect(localeFromPathname(null)).toBeNull()
    expect(localeFromPathname(undefined)).toBeNull()
    expect(localeFromPathname('')).toBeNull()
  })
})
