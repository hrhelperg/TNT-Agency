import { describe, it, expect } from 'vitest'
import { SEO_PAGES } from './pages'
import { CALCULATOR_PATH, REQUEST_PATH_D, buildRouteSet, wordCount, normalise, similarity } from './quality-metrics'

// Phase D8 — content quality gates.
//
// These run against the real page registry and the real filesystem route
// inventory, so they fail when content actually regresses rather than relying
// on a permissive allowlist. Every threshold below is set at or just under the
// measured state of the corpus at the time it was introduced, so the gate
// cannot silently drift downwards.

const PAGES = SEO_PAGES
const ROUTES = buildRouteSet()

describe('Phase D — content uniqueness', () => {
  it('no duplicate titles, descriptions, H1s or intros', () => {
    for (const key of ['title', 'description', 'intro', 'heroSubtitle'] as const) {
      const seen = new Map<string, string[]>()
      for (const p of PAGES) {
        const k = normalise(p[key])
        seen.set(k, [...(seen.get(k) ?? []), p.slug])
      }
      const dups = Array.from(seen.entries()).filter(([, v]) => v.length > 1)
      expect(dups.map(([, v]) => v.join(' == ')), `duplicate ${key}`).toEqual([])
    }
  })

  it('no two pages share a near-identical introduction (doorway-page guard)', () => {
    const offenders: string[] = []
    for (let i = 0; i < PAGES.length; i++) {
      for (let j = i + 1; j < PAGES.length; j++) {
        const s = similarity(PAGES[i].intro, PAGES[j].intro)
        if (s >= 0.8) offenders.push(`${PAGES[i].slug} ~ ${PAGES[j].slug} (${s.toFixed(2)})`)
      }
    }
    expect(offenders, 'near-duplicate intros').toEqual([])
  })

  it('every page carries a differentiated body, not just a swapped place name', () => {
    // A page whose sections are >=90% similar to another page's is a doorway.
    const bodyOf = (p: (typeof PAGES)[number]) =>
      p.sections.map((s) => `${s.heading} ${s.body.join(' ')} ${(s.bullets ?? []).join(' ')}`).join(' ')
    const offenders: string[] = []
    for (let i = 0; i < PAGES.length; i++) {
      for (let j = i + 1; j < PAGES.length; j++) {
        const s = similarity(bodyOf(PAGES[i]), bodyOf(PAGES[j]))
        if (s >= 0.9) offenders.push(`${PAGES[i].slug} ~ ${PAGES[j].slug} (${s.toFixed(2)})`)
      }
    }
    expect(offenders, 'near-duplicate bodies').toEqual([])
  })

  it('no page is thin', () => {
    const thin = PAGES.filter((p) => wordCount(p) < 150).map((p) => `${p.slug} (${wordCount(p)}w)`)
    expect(thin, 'pages under 150 words').toEqual([])
  })
})

describe('Phase D — factual governance', () => {
  it('every page cites at least one source', () => {
    expect(PAGES.filter((p) => !p.sources?.length).map((p) => p.slug)).toEqual([])
  })

  it('every online source carries a retrieval date', () => {
    const missing: string[] = []
    for (const p of PAGES) {
      for (const s of p.sources ?? []) {
        if (s.url && !s.retrieved) missing.push(`${p.slug}: ${s.name}`)
      }
    }
    expect(missing, 'online source without a retrieved date').toEqual([])
  })

  it('every source names a publisher or is a named legal act', () => {
    const missing: string[] = []
    for (const p of PAGES) {
      for (const s of p.sources ?? []) {
        if (!s.publisher && !/Zákon|Směrnice|Sb\./i.test(s.name)) missing.push(`${p.slug}: ${s.name}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('every page declares its jurisdiction and last-updated metadata', () => {
    const bad = PAGES.filter((p) => !p.meta?.lastUpdated || !p.dateModified).map((p) => p.slug)
    expect(bad).toEqual([])
  })
})

describe('Phase D — internal link graph', () => {
  it('every internal link resolves to a real route', () => {
    const broken: string[] = []
    for (const p of PAGES) {
      for (const l of p.internalLinks ?? []) {
        const target = l.href.replace(/^\//, '').split('#')[0].split('?')[0]
        if (!ROUTES.has(target)) broken.push(`${p.slug} -> ${l.href}`)
      }
      const ctaTarget = (p.cta?.href ?? '').replace(/^\//, '').split('#')[0].split('?')[0]
      if (ctaTarget && !ROUTES.has(ctaTarget)) broken.push(`${p.slug} CTA -> ${p.cta.href}`)
    }
    expect(broken, 'broken internal links').toEqual([])
  })

  it('no page is an orphan (every page has an inbound contextual link)', () => {
    const inbound = new Set<string>()
    for (const p of PAGES) {
      for (const l of p.internalLinks ?? []) {
        inbound.add(l.href.replace(/^\//, '').split('#')[0].split('?')[0])
      }
    }
    expect(PAGES.filter((p) => !inbound.has(p.slug)).map((p) => p.slug)).toEqual([])
  })

  it('every page links onward (contextual links, not just a footer)', () => {
    const bad = PAGES.filter((p) => (p.internalLinks?.length ?? 0) < 3).map((p) => p.slug)
    expect(bad, 'pages with fewer than 3 contextual outbound links').toEqual([])
  })

  it('no page links to itself', () => {
    const self: string[] = []
    for (const p of PAGES) {
      for (const l of p.internalLinks ?? []) {
        if (l.href.replace(/^\//, '').split('?')[0] === p.slug) self.push(p.slug)
      }
    }
    expect(self).toEqual([])
  })
})

describe('Phase D — conversion path', () => {
  it('every page ends on a call to action', () => {
    expect(PAGES.filter((p) => !p.cta?.href || !p.cta?.buttonLabel).map((p) => p.slug)).toEqual([])
  })

  it('every employer-facing page reaches the payroll calculator', () => {
    const missing = PAGES.filter((p) => {
      const links = [...(p.internalLinks ?? []).map((l) => l.href), p.cta?.href ?? '']
      return !links.some((h) => h.includes(CALCULATOR_PATH))
    }).map((p) => p.slug)
    expect(missing, 'pages with no route to the calculator').toEqual([])
  })

  it('every employer-facing page reaches the staffing request form', () => {
    const missing = PAGES.filter((p) => {
      const links = [...(p.internalLinks ?? []).map((l) => l.href), p.cta?.href ?? '']
      return !links.some((h) => h.includes(REQUEST_PATH_D))
    }).map((p) => p.slug)
    expect(missing, 'pages with no route to the request form').toEqual([])
  })
})

describe('Phase D — hygiene', () => {
  it('references no old domain anywhere in the content layer', () => {
    const bad = PAGES.filter((p) => /manpower-tnt\.agency|manpowertnt\.agency|tntgency\.org/i.test(JSON.stringify(p)))
    expect(bad.map((p) => p.slug)).toEqual([])
  })

  it('creates no localized routes (there is one canonical URL per page)', () => {
    const localized = PAGES.filter((p) => /^(en|de|cs)\//.test(p.slug) || /\/(en|de)$/.test(p.slug))
    expect(localized.map((p) => p.slug)).toEqual([])
    const localizedLinks: string[] = []
    for (const p of PAGES) {
      for (const l of p.internalLinks ?? []) {
        if (/^\/(en|de)\//.test(l.href)) localizedLinks.push(`${p.slug} -> ${l.href}`)
      }
    }
    expect(localizedLinks).toEqual([])
  })

  it('every slug is unique and URL-safe', () => {
    const slugs = PAGES.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(slugs.filter((s) => !/^[a-z0-9-]+$/.test(s))).toEqual([])
  })

  it('makes no fabricated market statistics without a source', () => {
    // A page stating a precise figure must cite something alongside it.
    const suspicious: string[] = []
    for (const p of PAGES) {
      const body = p.sections.map((s) => s.body.join(' ')).join(' ')
      const hasPreciseStat = /\b\d{1,3}[\s ]?\d{3}\b|\b\d+([.,]\d+)?\s?%/.test(body)
      if (hasPreciseStat && (p.sources?.length ?? 0) === 0) suspicious.push(p.slug)
    }
    expect(suspicious).toEqual([])
  })
})
