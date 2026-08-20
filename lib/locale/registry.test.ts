import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import {
  LOCALES, LOCALE_PREFIX, LOCALE_HREFLANG, LOCALE_LANG, X_DEFAULT_ROUTE,
  CZECH_ROUTES, LOCALE_CONCEPTS, LEGAL_CONCEPTS, ALL_CONCEPTS,
  COLLAPSED_CZECH_ROUTES, LOCALIZED_ROUTES, PUBLISHED_LOCALIZED_ROUTES, isPublished,
  urlFor, conceptForRoute, localeForRoute, alternatesFor,
} from './registry'

// The registry is the single source of truth for page identity across locales.
// These pin the five design rules in its header — especially the ones whose
// violation would be invisible until search engines silently discarded our
// hreflang.

const sitemapLocs = () => {
  const xml = fs.readFileSync(path.join(process.cwd(), 'public/sitemap.xml'), 'utf8')
  return Array.from(xml.matchAll(/<loc>https:\/\/talentpartnerid\.com([^<]*)<\/loc>/g)).map((m) => m[1])
}

describe('rule 1 — the Czech spine is immutable', () => {
  it('carries every Czech canonical, in the sitemap order', () => {
    // Order is load-bearing: the generated sitemap must reproduce the existing
    // artifact byte-identically, and sorting would break that proof.
    expect(CZECH_ROUTES).toEqual(sitemapLocs())
  })

  it('has 185 routes and no duplicates', () => {
    expect(CZECH_ROUTES).toHaveLength(185)
    expect(new Set(CZECH_ROUTES).size).toBe(185)
  })

  it('never prefixes Czech — there is no /cs/ form', () => {
    expect(LOCALE_PREFIX.cs).toBe('')
    for (const r of CZECH_ROUTES) expect(r.startsWith('/cs/'), r).toBe(false)
  })

  it('every concept primary is a real Czech canonical', () => {
    for (const c of LOCALE_CONCEPTS) {
      expect(CZECH_ROUTES, `${c.id} primary`).toContain(c.csPrimary)
    }
  })
})

describe('rule 2 — localized URLs are explicit, never inferred', () => {
  it('no localized URL is the Czech slug with a prefix bolted on', () => {
    // Two coincidences are legitimate and are named here with their reason,
    // rather than weakening the rule for everyone:
    //   home    — /en/ genuinely IS the prefix plus '/'; no other form exists.
    //   contact — the Czech route is already the English word, and "contact"
    //             is also the correct native EN slug. (DE is /de/kontakt, so
    //             only the EN side coincides.)
    const COINCIDENTAL: Readonly<Record<string, readonly string[]>> = {
      home: ['en', 'de'],
      contact: ['en'],
    }
    for (const c of LOCALE_CONCEPTS) {
      for (const locale of ['en', 'de'] as const) {
        if ((COINCIDENTAL[c.id] ?? []).includes(locale)) continue
        const url = c.urls[locale]
        if (!url) continue
        const mechanical = `${LOCALE_PREFIX[locale]}${c.csPrimary}`
        expect(url, `${c.id}/${locale} looks mechanically derived`).not.toBe(mechanical)
      }
    }
  })

  it('every localized URL carries its locale prefix', () => {
    for (const c of LOCALE_CONCEPTS) {
      for (const locale of ['en', 'de'] as const) {
        const url = c.urls[locale]
        if (!url) continue
        // The locale ROOT is the prefix itself; everything else sits under it.
        const prefix = LOCALE_PREFIX[locale]
        expect(url === prefix || url.startsWith(`${prefix}/`), `${url} missing ${locale} prefix`).toBe(true)
      }
    }
  })

  it('no localized URL collides with an existing Czech canonical', () => {
    for (const url of LOCALIZED_ROUTES) expect(CZECH_ROUTES, url).not.toContain(url)
  })

  it('no two concepts claim the same localized URL', () => {
    expect(new Set(LOCALIZED_ROUTES).size).toBe(LOCALIZED_ROUTES.length)
  })
})

describe('rule 3 — exactly one Czech primary joins each cluster', () => {
  it('collapsed variants are real Czech routes, and never a primary', () => {
    const primaries = LOCALE_CONCEPTS.map((c) => c.csPrimary)
    for (const v of COLLAPSED_CZECH_ROUTES) {
      expect(CZECH_ROUTES, v).toContain(v)
      expect(primaries, `${v} is both collapsed and a primary`).not.toContain(v)
    }
  })

  it('a collapsed variant is claimed by only one concept', () => {
    expect(new Set(COLLAPSED_CZECH_ROUTES).size).toBe(COLLAPSED_CZECH_ROUTES.length)
  })

  it('a collapsed variant has NO alternates — the many-to-one trap', () => {
    // Five Czech pages pointing hreflang at one English page is invalid and is
    // discarded wholesale. Only the primary participates.
    for (const v of COLLAPSED_CZECH_ROUTES) {
      expect(alternatesFor(v), `${v} must have no alternates`).toEqual([])
    }
  })

  it('a primary has alternates exactly for its PUBLISHED locales', () => {
    for (const c of LOCALE_CONCEPTS) {
      const alts = alternatesFor(c.csPrimary)
      const publishedNonCs = (['en', 'de'] as const).filter((l) => c.published.includes(l))
      if (!publishedNonCs.length) {
        // Nothing to point at yet: a cluster of one is not a cluster.
        expect(alts, `${c.id} publishes only cs`).toEqual([])
      } else {
        expect(alts.map((a) => a.locale)).toContain('cs')
        for (const l of publishedNonCs) expect(alts.map((a) => a.locale)).toContain(l)
      }
    }
  })
})

describe('rule 4 — a missing translation stays missing', () => {
  it('urlFor returns undefined rather than a synthesized route', () => {
    const partial = { id: 'x', csPrimary: '/', urls: { en: '/en/x' }, published: ['cs', 'en'] as const, pageType: 'test', notes: '' }
    expect(urlFor(partial, 'de')).toBeUndefined()
    expect(urlFor(partial, 'en')).toBe('/en/x')
    expect(urlFor(partial, 'cs')).toBe('/')
  })

  it('alternates never invent a locale home as a fallback', () => {
    // The switcher must show nothing rather than redirect to /en/ or /de/.
    for (const c of LOCALE_CONCEPTS) {
      const urls = alternatesFor(c.csPrimary).map((a) => a.url)
      for (const l of ['en', 'de'] as const) {
        if (c.published.includes(l)) continue
        expect(urls, `${c.id}: ${l} unpublished but a locale home appeared`).not.toContain(`/${l}`)
      }
    }
  })

  it('an unknown route yields no alternates at all', () => {
    expect(alternatesFor('/nope')).toEqual([])
    expect(conceptForRoute('/nope')).toBeUndefined()
  })
})

describe('rule 5 — legal pages are mapped read-only', () => {
  it('maps to URLs that already exist in the sitemap', () => {
    const locs = sitemapLocs()
    for (const c of LEGAL_CONCEPTS) {
      expect(locs, `${c.id} cs`).toContain(c.csPrimary)
      for (const locale of ['en', 'de'] as const) {
        const url = c.urls[locale]
        if (url) expect(locs, `${c.id} ${locale}`).toContain(url)
      }
    }
  })

  it('introduces no new legal URL', () => {
    const locs = new Set(sitemapLocs())
    for (const c of LEGAL_CONCEPTS) {
      for (const u of [c.csPrimary, c.urls.en, c.urls.de]) {
        if (u) expect(locs.has(u), `${u} would be a NEW legal URL`).toBe(true)
      }
    }
  })
})

describe('resolution helpers', () => {
  it('resolves a route to its locale by registry membership, not by prefix', () => {
    expect(localeForRoute('/pro-zamestnavatele')).toBe('cs')
    expect(localeForRoute('/en/for-employers')).toBe('en')
    expect(localeForRoute('/de/fuer-arbeitgeber')).toBe('de')
    expect(localeForRoute('/nope')).toBeUndefined()
    // A Czech route that is not a concept is still Czech.
    expect(localeForRoute('/skladnici')).toBe('cs')
  })

  it('round-trips every concept in every declared locale', () => {
    for (const c of ALL_CONCEPTS) {
      for (const locale of LOCALES) {
        const url = urlFor(c, locale)
        if (!url) continue
        expect(conceptForRoute(url)?.id, `${c.id}/${locale}`).toBe(c.id)
        expect(localeForRoute(url), `${c.id}/${locale}`).toBe(locale)
      }
    }
  })

  it('declares the L0 ten and nothing more', () => {
    expect(LOCALE_CONCEPTS.map((c) => c.id).sort()).toEqual([
      'about-us', 'contact', 'cost-of-vacancy', 'employee-turnover', 'for-employers',
      'home', 'how-agency-works', 'production-workers', 'request-staff', 'specialist-recruitment',
    ])
  })

  it('x-default points at the Czech root', () => {
    expect(X_DEFAULT_ROUTE).toBe('/')
    expect(CZECH_ROUTES).toContain(X_DEFAULT_ROUTE)
  })

  it('lang and hreflang values are declared for every locale', () => {
    for (const l of LOCALES) {
      expect(LOCALE_LANG[l]).toBeTruthy()
      expect(LOCALE_HREFLANG[l]).toBeTruthy()
    }
  })
})

describe('declared is not published', () => {
  it('every L0 concept declares EN and DE urls', () => {
    for (const c of LOCALE_CONCEPTS) {
      expect(c.urls.en, `${c.id} en`).toBeTruthy()
      expect(c.urls.de, `${c.id} de`).toBeTruthy()
    }
  })

  it('a declared-but-unpublished locale is absent from alternates', () => {
    // Declaring a URL and serving it are different facts. Conflating them is
    // how a sitemap advertises a 404 and how hreflang points at nothing.
    for (const c of LOCALE_CONCEPTS) {
      const alts = alternatesFor(c.csPrimary).map((a) => a.locale)
      for (const locale of ['en', 'de'] as const) {
        if (!c.published.includes(locale)) {
          expect(alts, `${c.id}: ${locale} declared but unpublished`).not.toContain(locale)
        }
      }
    }
  })

  it('PUBLISHED_LOCALIZED_ROUTES only contains served routes', () => {
    for (const url of PUBLISHED_LOCALIZED_ROUTES) {
      const c = conceptForRoute(url)
      expect(c, url).toBeTruthy()
      expect(c!.published, `${url} in PUBLISHED but concept does not publish it`).toContain(localeForRoute(url))
    }
  })

  it('isPublished agrees with the published list', () => {
    for (const c of LOCALE_CONCEPTS) {
      expect(isPublished(c, 'cs')).toBe(true)
      for (const locale of ['en', 'de'] as const) {
        expect(isPublished(c, locale)).toBe(c.published.includes(locale))
      }
    }
  })
})
