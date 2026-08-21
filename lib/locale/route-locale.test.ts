import { describe, it, expect } from 'vitest'
import { localeFromPathname } from './route-locale'
import { PUBLISHED_LOCALIZED_ROUTES, CZECH_ROUTES } from './registry'

describe('localeFromPathname', () => {
  it('assigns every published localized route to its own locale', () => {
    for (const route of PUBLISHED_LOCALIZED_ROUTES) {
      const expected = route.startsWith('/en') ? 'en' : 'de'
      expect(localeFromPathname(route), route).toBe(expected)
    }
    expect(PUBLISHED_LOCALIZED_ROUTES.length).toBe(20)
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
