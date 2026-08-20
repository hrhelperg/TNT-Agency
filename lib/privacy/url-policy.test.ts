import { describe, it, expect } from 'vitest'
import { sanitizeParts, sanitizeUrlString, isPolicyClean, PERMITTED_PARAMS } from './url-policy'

// The policy is an allowlist. These tests pin BOTH directions: the legacy
// payload is dropped, and everything the product legitimately uses survives —
// including fragments and pathnames, which are deliberately untouched.

const PAYLOAD = Buffer.from(JSON.stringify({
  wage: { monthlyWageCzk: 918273645 },
  taxProfile: { disability: 'third', ztpp: true, children: [{ ztpp: true }] },
})).toString('base64')

const names = (path: string) => {
  const i = path.indexOf('?')
  if (i === -1) return []
  const out: string[] = []
  new URLSearchParams(path.slice(i + 1).split('#')[0]).forEach((_v, k) => out.push(k))
  return out
}

describe('the legacy share payload is neutralised', () => {
  it('drops ?d=', () => {
    expect(sanitizeParts('/calc', `?d=${PAYLOAD}`, '').path).toBe('/calc')
  })

  it('drops it alongside permitted parameters, keeping those', () => {
    const r = sanitizeParts('/calc', `?utm_source=linkedin&d=${PAYLOAD}&mode=agency`, '')
    expect(r.dropped).toEqual(['d'])
    expect(names(r.path).sort()).toEqual(['mode', 'utm_source'])
  })

  it('reports names only — a drop must never surface the value it removed', () => {
    const r = sanitizeParts('/calc', `?d=${PAYLOAD}`, '')
    expect(r.dropped.join('|')).not.toContain(PAYLOAD)
    expect(r.dropped.join('|')).not.toContain('ztpp')
  })

  it('drops every undeclared parameter, not just d', () => {
    expect(sanitizeParts('/p', '?gclid=x&fbclid=y&ref=z&state=w', '').path).toBe('/p')
  })
})

describe('declared parameters behave', () => {
  it('accepts each calculator view and rejects anything else', () => {
    for (const m of ['agency', 'direct', 'comparison']) {
      expect(sanitizeParts('/p', `?mode=${m}`, '').path).toBe(`/p?mode=${m}`)
    }
    for (const bad of ['agncy', 'AGENCY', '../../etc/passwd', '']) {
      expect(sanitizeParts('/p', `?mode=${encodeURIComponent(bad)}`, '').path, bad).toBe('/p')
    }
  })

  it('accepts each declared CTA surface and rejects anything else', () => {
    expect(sanitizeParts('/p', '?source=employer-hub', '').path).toBe('/p?source=employer-hub')
    expect(sanitizeParts('/p', '?source=not-a-surface', '').path).toBe('/p')
  })

  it('keeps campaign values, including Czech and German diacritics', () => {
    expect(sanitizeParts('/p', '?utm_source=google&utm_medium=cpc', '').clean).toBe(true)
    for (const v of ['jaro 2026 & léto', 'Frühjahr-Kampagne', 'agenturni-zamestnavani-praha-2026', 'Black-Friday-2026']) {
      const r = sanitizeParts('/p', `?utm_campaign=${encodeURIComponent(v)}`, '')
      expect(r.clean, v).toBe(true)
      expect(new URLSearchParams(r.path.split('?')[1]).get('utm_campaign')).toBe(v)
    }
  })

  it('keeps all five UTM parameters together', () => {
    const q = '?utm_source=a&utm_medium=b&utm_campaign=c&utm_content=d&utm_term=e'
    expect(sanitizeParts('/p', q, '').clean).toBe(true)
  })
})

describe('pathnames and fragments are NOT touched — this is deliberate', () => {
  // Payload decoding, fragment classification and pathname classification were
  // assessed and ruled out of scope. These assertions are the product-behaviour
  // half of that decision: real anchors and real routes must survive.
  it('preserves every in-page anchor shape the site actually uses', () => {
    for (const f of [
      'faq', 'srovnani', 'celostatni-pravidla-a-kde-je-overit',
      'eticky-a-odpovedny-nabor-cizincu-ochrana-pracovniku-a-vyber-zprostredkovatele',
    ]) {
      expect(sanitizeParts('/p', '', `#${f}`).path, f).toBe(`/p#${f}`)
    }
  })

  it('preserves a fragment even when the query is filtered', () => {
    expect(sanitizeParts('/calc', `?d=${PAYLOAD}&mode=agency`, '#srovnani').path).toBe('/calc?mode=agency#srovnani')
  })

  it('preserves any pathname unchanged', () => {
    for (const p of ['/kalkulacka-mzdy-agenturniho-zamestnance', '/no-such-page', '/a/b/c']) {
      expect(sanitizeParts(p, '', '').path, p).toBe(p)
    }
  })
})

describe('structural properties', () => {
  const CASES = [
    '?d=x', '?mode=agency', `?mode=agency&d=${PAYLOAD}&gclid=1`, '?utm_source=a&utm_medium=b',
    '?source=direct', '?a=1&a=2&b=3', '?mode=agency&mode=direct', '?d=', '?', '',
    '?MODE=agency', '?%64=payload',
  ]

  it('is idempotent', () => {
    for (const c of CASES) {
      const once = sanitizeParts('/p', c, '').path
      expect(sanitizeUrlString(once), c).toBe(once)
    }
  })

  it('never introduces a parameter that was not in the input', () => {
    for (const c of CASES) {
      const before = new Set(names(`/p${c}`))
      for (const k of names(sanitizeParts('/p', c, '').path)) expect(before.has(k), `${c} -> ${k}`).toBe(true)
    }
  })

  it('every surviving parameter is declared and accepted', () => {
    for (const c of CASES) {
      const path = sanitizeParts('/p', c, '').path
      const i = path.indexOf('?')
      if (i === -1) continue
      new URLSearchParams(path.slice(i + 1)).forEach((v, k) => {
        expect(Object.prototype.hasOwnProperty.call(PERMITTED_PARAMS, k), `${c} kept ${k}`).toBe(true)
        expect(PERMITTED_PARAMS[k].accepts(v), `${c} kept ${k}=${v}`).toBe(true)
      })
    }
  })

  it('is case-sensitive about names, and handles encoded names', () => {
    expect(sanitizeParts('/p', '?MODE=agency', '').path).toBe('/p')
    expect(sanitizeParts('/p', `?%64=${PAYLOAD}`, '').path).toBe('/p')
    expect(sanitizeParts('/p', `?%2564=${PAYLOAD}`, '').path).toBe('/p')
  })

  it('preserves absolute vs relative form', () => {
    expect(sanitizeUrlString('https://talentpartnerid.com/p?d=x')).toBe('https://talentpartnerid.com/p')
    expect(sanitizeUrlString('/p?d=x')).toBe('/p')
  })

  it('isPolicyClean agrees with sanitizeParts', () => {
    expect(isPolicyClean('/p?mode=agency')).toBe(true)
    expect(isPolicyClean('/p#faq')).toBe(true)
    expect(isPolicyClean('/anything-at-all')).toBe(true)
    expect(isPolicyClean(`/p?d=${PAYLOAD}`)).toBe(false)
  })
})
