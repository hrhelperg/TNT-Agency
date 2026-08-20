import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import {
  ATTRIBUTION_FIELDS,
  ATTRIBUTION_DENYLIST,
  CTA_SOURCES,
  SESSION_KEY,
  buildAttribution,
  captureAttribution,
  readAttribution,
  sanitizeAttribution,
  referrerDomain,
  assertNoSensitiveKeys,
} from './index'

// The file lib/attribution/index.ts has always cited "tests in
// ./attribution.test.ts" as the enforcement for its four design rules. That file
// did not exist. The rules were partly covered from OTHER modules' suites
// (lib/employer-request, lib/leads-lite), which exercise buildAttribution as a
// pure function — but Rule 3, the storage rule, was enforced by nothing at all.
//
// This file makes the citation true. Each describe block names the rule it
// enforces, so a future reader can check the claim against the coverage rather
// than trusting a comment.

const SOURCE = fs.readFileSync(path.join(__dirname, 'index.ts'), 'utf8')
/** Strip comments — a rule must be enforced by code, not asserted in prose. */
const code = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

/** A sessionStorage that behaves like the real one, including throwing. */
const makeStorage = () => {
  const map = new Map<string, string>()
  return {
    map,
    api: {
      getItem: (k: string) => (map.has(k) ? map.get(k)! : null),
      setItem: (k: string, v: string) => void map.set(k, String(v)),
      removeItem: (k: string) => void map.delete(k),
      clear: () => map.clear(),
      key: (i: number) => Array.from(map.keys())[i] ?? null,
      get length() {
        return map.size
      },
    } as Storage,
  }
}

const ENV = {
  landingRoute: '/kalkulacka-mzdy-agenturniho-zamestnance',
  currentRoute: '/poptavka-pracovniku',
  referrer: 'https://www.google.com/search?q=agenturn%C3%AD+zam%C4%9Bstnávání',
  query: { utm_source: 'google', utm_medium: 'organic', utm_campaign: 'jaro' },
  ctaSource: 'homepage-calculator',
  language: 'cs',
}

describe('Rule 1 — STRICT ALLOWLIST', () => {
  it('drops any field not on ATTRIBUTION_FIELDS, even when passed explicitly', () => {
    const out = sanitizeAttribution({ landingRoute: '/a', vacancyId: 'V-1', internalScore: '9' } as Record<string, unknown>)
    expect(Object.keys(out)).toEqual(['landingRoute'])
  })

  it('has no pass-through path — every key of every output is allowlisted', () => {
    const out = buildAttribution({ ...ENV, query: { ...ENV.query, d: 'eyJ3YWdlIjp7fX0=', gclid: 'x' } })
    for (const k of Object.keys(out)) expect(ATTRIBUTION_FIELDS).toContain(k)
  })

  it('drops non-string values rather than coercing them', () => {
    const out = sanitizeAttribution({ landingRoute: 42, currentRoute: null, language: ['cs'] } as unknown as Record<string, unknown>)
    expect(out).toEqual({})
  })

  it('drops empty and whitespace-only values, and caps length at 200', () => {
    expect(sanitizeAttribution({ landingRoute: '   ' })).toEqual({})
    expect(sanitizeAttribution({ landingRoute: 'x'.repeat(500) }).landingRoute).toHaveLength(200)
  })

  it('constrains ctaSource to the declared surfaces, defaulting to "direct"', () => {
    expect(buildAttribution({ ...ENV, ctaSource: 'not-a-surface' }).ctaSource).toBe('direct')
    for (const s of CTA_SOURCES) expect(buildAttribution({ ...ENV, ctaSource: s }).ctaSource).toBe(s)
  })
})

describe('Rule 2 — NO SENSITIVE VALUES', () => {
  it('throws on every denylisted key, not just a sampled few', () => {
    for (const banned of ATTRIBUTION_DENYLIST) {
      expect(() => assertNoSensitiveKeys({ [banned]: 'x' }), `denylist miss: ${banned}`).toThrow(/denylist violation/i)
    }
  })

  it('matches case-insensitively and as a substring, so camelCase variants are caught', () => {
    expect(() => assertNoSensitiveKeys({ EMAIL: 'a@b.cz' })).toThrow()
    expect(() => assertNoSensitiveKeys({ candidateEmailAddress: 'a@b.cz' })).toThrow()
  })

  it('keeps payroll economics out — the calculator fields specifically', () => {
    for (const k of ['grossWage', 'netWage', 'employerCost', 'agencyFee', 'totalEconomicCost']) {
      expect(() => assertNoSensitiveKeys({ [k]: '50000' }), k).toThrow()
    }
  })

  it('no allowlisted field name trips the denylist — the guard cannot self-block', () => {
    // This is the safety property that makes substring matching safe to use.
    const everyField = Object.fromEntries(ATTRIBUTION_FIELDS.map((f) => [f, 'x']))
    expect(() => assertNoSensitiveKeys(everyField)).not.toThrow()
  })

  it('reduces a referrer to its hostname, never the query it carried', () => {
    expect(referrerDomain(ENV.referrer)).toBe('www.google.com')
    expect(buildAttribution(ENV).referrerDomain).not.toContain('?')
    expect(buildAttribution(ENV).referrerDomain).not.toContain('q=')
  })

  it('returns empty rather than throwing on a malformed referrer', () => {
    expect(referrerDomain('not a url')).toBe('')
    expect(referrerDomain('')).toBe('')
  })
})

describe('Rule 3 — SESSION-LIMITED (previously enforced by nothing)', () => {
  const original = globalThis.window
  let storage: ReturnType<typeof makeStorage>

  beforeEach(() => {
    storage = makeStorage()
    ;(globalThis as { window?: unknown }).window = { sessionStorage: storage.api }
  })
  afterEach(() => {
    if (original === undefined) delete (globalThis as { window?: unknown }).window
    else (globalThis as { window?: unknown }).window = original
  })

  it('writes to sessionStorage under the documented key, and nowhere else', () => {
    captureAttribution(ENV)
    expect(storage.map.has(SESSION_KEY)).toBe(true)
    expect(Array.from(storage.map.keys())).toEqual([SESSION_KEY])
  })

  it('round-trips through storage without gaining a field', () => {
    const written = captureAttribution(ENV)
    expect(readAttribution()).toEqual(written)
  })

  it('re-sanitises on read, so a hand-edited session value cannot inject a field', () => {
    storage.map.set(SESSION_KEY, JSON.stringify({ landingRoute: '/a', vacancyId: 'V-1' }))
    expect(readAttribution()).toEqual({ landingRoute: '/a' })
  })

  it('returns {} for malformed stored values instead of throwing', () => {
    for (const raw of ['{not json', 'null', '"a string"', '[]', '123']) {
      storage.map.set(SESSION_KEY, raw)
      expect(() => readAttribution(), raw).not.toThrow()
    }
    storage.map.set(SESSION_KEY, '{not json')
    expect(readAttribution()).toEqual({})
  })

  it('keeps first-touch landing route and UTMs while refreshing the current route', () => {
    captureAttribution(ENV)
    const second = captureAttribution({
      ...ENV,
      landingRoute: '/kontakt',
      currentRoute: '/kontakt',
      query: { utm_source: 'seznam' },
      referrer: '',
    })
    expect(second.landingRoute).toBe(ENV.landingRoute)
    expect(second.utmSource).toBe('google')
    expect(second.currentRoute).toBe('/kontakt')
    expect(second.referrerDomain).toBe('www.google.com')
  })

  it('survives storage being blocked, returning a snapshot without throwing', () => {
    ;(globalThis as { window?: unknown }).window = {
      sessionStorage: {
        getItem: () => { throw new Error('blocked') },
        setItem: () => { throw new Error('blocked') },
        removeItem: () => { throw new Error('blocked') },
      },
    }
    expect(() => captureAttribution(ENV)).not.toThrow()
    expect(captureAttribution(ENV).landingRoute).toBe(ENV.landingRoute)
    expect(readAttribution()).toEqual({})
  })

  it('returns {} on the server, where there is no window at all', () => {
    delete (globalThis as { window?: unknown }).window
    expect(readAttribution()).toEqual({})
    expect(() => captureAttribution(ENV)).not.toThrow()
  })

  it('never reaches localStorage, cookies, IndexedDB, the URL or history', () => {
    const src = code(SOURCE)
    expect(src).not.toMatch(/localStorage/)
    expect(src).not.toMatch(/document\s*\.\s*cookie/)
    expect(src).not.toMatch(/indexedDB/)
    expect(src).not.toMatch(/history\.(push|replace)State/)
    expect(src).not.toMatch(/location\.(search|hash|href)\s*=/)
    // sessionStorage is the ONLY storage this module may name.
    expect(src.match(/sessionStorage/g)?.length).toBeGreaterThan(0)
  })
})

describe('Rule 4 — NO NETWORK', () => {
  it('contains no transmission of any kind', () => {
    const src = code(SOURCE)
    for (const api of [/\bfetch\s*\(/, /XMLHttpRequest/, /sendBeacon navigator/, /navigator\.sendBeacon/, /WebSocket/, /EventSource/, /import\s*\(/]) {
      expect(src, `${api} must not appear in lib/attribution`).not.toMatch(api)
    }
  })

  it('imports nothing outside its own module', () => {
    const imports = Array.from(code(SOURCE).matchAll(/^import\s.*?from\s+['"]([^'"]+)['"]/gm)).map((m) => m[1])
    expect(imports).toEqual([])
  })
})

describe('the module documents only what it does', () => {
  it('cites a test file that exists', () => {
    const cited = SOURCE.match(/enforced by tests in ([.\w/-]+\.test\.ts)/)
    expect(cited, 'the module should cite its enforcing tests').not.toBeNull()
    expect(fs.existsSync(path.join(__dirname, cited![1]))).toBe(true)
  })

  it('exports no function that nothing calls', () => {
    const root = path.join(__dirname, '..', '..')
    const walk = (dir: string, out: string[] = []): string[] => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.name === 'node_modules' || e.name.startsWith('.')) continue
        const p = path.join(dir, e.name)
        if (e.isDirectory()) walk(p, out)
        else if (/\.(ts|tsx|js|mjs)$/.test(e.name)) out.push(p)
      }
      return out
    }
    const exported = Array.from(code(SOURCE).matchAll(/^export function (\w+)/gm)).map((m) => m[1])
    const others = walk(root).filter((f) => f !== path.join(__dirname, 'index.ts'))
    const corpus = others.map((f) => fs.readFileSync(f, 'utf8')).join('\n')
    const orphans = exported.filter((fn) => !new RegExp(`\\b${fn}\\b`).test(corpus))
    expect(orphans, `exported but never referenced anywhere: ${orphans.join(', ')}`).toEqual([])
  })
})
