import { describe, it, expect, vi } from 'vitest'
import { scrubSearch, scrubCurrentUrl, PERMITTED_PARAMS } from './url-hygiene'

// The scrub is the only place in the app permitted to write history state, so
// the claim "it can only remove" has to be a tested property, not a comment.

const LEGACY_PAYLOAD =
  'eyJtb2RlIjoiYWdlbmN5Iiwid2FnZSI6eyJtb250aGx5V2FnZUN6ayI6Nzc3MzMzfSwidGF4UHJvZmlsZSI6eyJkaXNhYmlsaXR5IjoidGhpcmQiLCJ6dHBwIjp0cnVlfX0='

const names = (search: string) => {
  const out: string[] = []
  new URLSearchParams(search.replace(/^\?/, '')).forEach((_v, k) => out.push(k))
  return out
}

const fakeWindow = (search: string, pathname = '/kalkulacka-mzdy-agenturniho-zamestnance', hash = '') => {
  const replaceState = vi.fn()
  return { win: { location: { search, pathname, hash }, history: { state: null, replaceState } } as unknown as Window, replaceState }
}

describe('the payload that caused this is removed', () => {
  it('strips ?d=, the base64 PayrollInput', () => {
    const { search, removed } = scrubSearch(`?d=${LEGACY_PAYLOAD}`)
    expect(search).toBe('')
    expect(removed).toEqual(['d'])
  })

  it('strips it even when mixed with permitted parameters, keeping those', () => {
    const { search, removed } = scrubSearch(`?utm_source=linkedin&d=${LEGACY_PAYLOAD}&mode=agency`)
    expect(removed).toEqual(['d'])
    expect(names(search).sort()).toEqual(['mode', 'utm_source'])
    expect(search).toContain('utm_source=linkedin')
    expect(search).toContain('mode=agency')
  })

  it('reports names only — a scrub must never surface the value it removed', () => {
    const { removed } = scrubSearch(`?d=${LEGACY_PAYLOAD}`)
    expect(removed.join('|')).not.toContain(LEGACY_PAYLOAD)
    expect(removed.join('|')).not.toContain('ztpp')
  })
})

describe('removal-only: the property, not the promise', () => {
  const CASES = [
    '?d=abc',
    '?mode=agency',
    '?mode=agency&d=abc&gclid=1&fbclid=2',
    '?utm_source=a&utm_medium=b&utm_campaign=c&utm_content=d&utm_term=e',
    '?source=homepage-calculator',
    '?wage=50000&netSalary=41000',
    '?a=1&a=2&b=3',
    '?d=',
    '?',
    '',
    '?mode=agency&mode=direct',
  ]

  it('never introduces a parameter that was not in the input', () => {
    for (const input of CASES) {
      const before = new Set(names(input))
      for (const k of names(scrubSearch(input).search)) {
        expect(before.has(k), `${input} → introduced "${k}"`).toBe(true)
      }
    }
  })

  it('every surviving parameter is declared', () => {
    for (const input of CASES) {
      for (const k of names(scrubSearch(input).search)) {
        expect(Object.prototype.hasOwnProperty.call(PERMITTED_PARAMS, k), `${input} kept undeclared "${k}"`).toBe(true)
      }
    }
  })

  it('preserves a permitted value byte for byte, including repeats and encoding', () => {
    expect(scrubSearch('?utm_campaign=jaro%202026%20%26%20l%C3%A9to').search).toContain('jaro+2026')
    expect(new URLSearchParams(scrubSearch('?utm_campaign=jaro%202026%20%26%20l%C3%A9to').search.slice(1)).get('utm_campaign'))
      .toBe('jaro 2026 & léto')
    expect(scrubSearch('?mode=agency&mode=direct').search).toBe('?mode=agency&mode=direct')
  })

  it('is idempotent — scrubbing a clean URL changes nothing', () => {
    const once = scrubSearch('?mode=agency&utm_source=x').search
    expect(scrubSearch(once).search).toBe(once)
    expect(scrubSearch(once).removed).toEqual([])
  })
})

describe('it touches history only when it must', () => {
  it('writes no history entry when the URL is already clean', () => {
    const { win, replaceState } = fakeWindow('?mode=agency')
    expect(scrubCurrentUrl(win)).toEqual([])
    expect(replaceState).not.toHaveBeenCalled()
  })

  it('writes no history entry when there is no query at all', () => {
    const { win, replaceState } = fakeWindow('')
    expect(scrubCurrentUrl(win)).toEqual([])
    expect(replaceState).not.toHaveBeenCalled()
  })

  it('replaces rather than pushes, so the dirty URL leaves no back-button entry', () => {
    const { win, replaceState } = fakeWindow(`?d=${LEGACY_PAYLOAD}`)
    expect(scrubCurrentUrl(win)).toEqual(['d'])
    expect(replaceState).toHaveBeenCalledTimes(1)
    const url = replaceState.mock.calls[0][2] as string
    expect(url).toBe('/kalkulacka-mzdy-agenturniho-zamestnance')
    expect(url).not.toContain('d=')
  })

  it('preserves pathname and hash exactly', () => {
    const { win, replaceState } = fakeWindow('?d=abc&mode=direct', '/cena-neobsazene-pozice', '#vysledek')
    scrubCurrentUrl(win)
    expect(replaceState.mock.calls[0][2]).toBe('/cena-neobsazene-pozice?mode=direct#vysledek')
  })
})

describe('the allowlist stays honest', () => {
  it('declares exactly the parameters the app actually reads', () => {
    expect(Object.keys(PERMITTED_PARAMS).sort()).toEqual([
      'mode', 'source', 'utm_campaign', 'utm_content', 'utm_medium', 'utm_source', 'utm_term',
    ])
  })

  it('permits no parameter whose name suggests it carries a value', () => {
    for (const k of Object.keys(PERMITTED_PARAMS)) {
      expect(k).not.toMatch(/wage|salary|net|gross|cost|fee|amount|price|d$/i)
    }
  })
})
