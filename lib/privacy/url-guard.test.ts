import { describe, it, expect, afterEach, vi } from 'vitest'
import { installUrlGuard, enforceCurrentUrl, isUrlSafe } from './url-guard'

// The guard is the half that PR #41 got wrong. The policy decides what is
// allowed; the guard makes sure nothing observes a URL before that decision is
// applied — at any point in the lifecycle, not just once at mount.

const PAYLOAD = Buffer.from(JSON.stringify({ taxProfile: { disability: 'third', ztpp: true } })).toString('base64')

/** A window stub with a real-enough history/location pair. */
function makeWin(initial = `/calc?d=${PAYLOAD}`) {
  const origin = 'https://talentpartnerid.com'
  const listeners: Record<string, Array<() => void>> = {}
  const entries: Array<{ state: unknown; url: string }> = []
  const win = {
    location: {} as { href: string; pathname: string; search: string; hash: string; origin: string },
    history: {
      state: null as unknown,
      replaceState(state: unknown, _t: string, url?: string | null) {
        win.history.state = state
        if (url != null) apply(String(url))
        entries.push({ state, url: String(url) })
      },
      pushState(state: unknown, _t: string, url?: string | null) {
        win.history.state = state
        if (url != null) apply(String(url))
        entries.push({ state, url: String(url) })
      },
    },
    addEventListener(type: string, fn: () => void) { (listeners[type] ||= []).push(fn) },
    removeEventListener() {},
    __entries: entries,
    __fire(type: string) { (listeners[type] || []).forEach((f) => f()) },
    __listeners: listeners,
  }
  function apply(u: string) {
    const parsed = new URL(u, origin)
    win.location.href = parsed.href
    win.location.pathname = parsed.pathname
    win.location.search = parsed.search
    win.location.hash = parsed.hash
    win.location.origin = origin
  }
  apply(initial)
  return win as unknown as Window & typeof globalThis & {
    __entries: Array<{ state: unknown; url: string }>
    __fire: (t: string) => void
    __listeners: Record<string, Array<() => void>>
  }
}

const originalWindow = globalThis.window
afterEach(() => {
  if (originalWindow === undefined) delete (globalThis as { window?: unknown }).window
  else (globalThis as { window?: unknown }).window = originalWindow
  vi.restoreAllMocks()
})

describe('the guard owns the write path', () => {
  it('sanitizes the current URL the moment it installs', () => {
    const win = makeWin()
    installUrlGuard(win)
    expect(win.location.href).toBe('https://talentpartnerid.com/calc')
  })

  it('sanitizes a dirty URL written by someone else — the Next router case', () => {
    const win = makeWin('/calc')
    installUrlGuard(win)
    // Exactly what Next's Container.componentDidMount does, and what measurably
    // re-dirtied the URL after PR #41's one-shot scrub.
    win.history.replaceState({ url: `/calc?d=${PAYLOAD}`, as: `/calc?d=${PAYLOAD}`, __N: true }, '', `/calc?d=${PAYLOAD}`)
    expect(win.location.href).toBe('https://talentpartnerid.com/calc')
  })

  it('sanitizes pushState the same way', () => {
    const win = makeWin('/calc')
    installUrlGuard(win)
    win.history.pushState({}, '', `/other?d=${PAYLOAD}&mode=agency`)
    expect(win.location.href).toBe('https://talentpartnerid.com/other?mode=agency')
  })

  it('sanitizes the history STATE object, not only the address bar', () => {
    const win = makeWin('/calc')
    installUrlGuard(win)
    win.history.replaceState({ url: `/calc?d=${PAYLOAD}`, as: `/calc?d=${PAYLOAD}`, key: 'x' }, '', '/calc')
    const state = win.history.state as { url: string; as: string; key: string }
    expect(state.url).toBe('/calc')
    expect(state.as).toBe('/calc')
    expect(state.key, 'unrelated state fields must survive').toBe('x')
    expect(JSON.stringify(state)).not.toContain(PAYLOAD.slice(0, 16))
  })

  it('a url-less write still re-asserts the policy', () => {
    const win = makeWin('/calc')
    installUrlGuard(win)
    win.location.href = `https://talentpartnerid.com/calc?d=${PAYLOAD}`
    win.location.search = `?d=${PAYLOAD}`
    win.history.pushState({ a: 1 }, '')
    expect(win.location.href).toBe('https://talentpartnerid.com/calc')
  })

  it('leaves a permitted URL alone — no history write at all', () => {
    const win = makeWin('/calc?mode=agency#faq')
    installUrlGuard(win)
    expect(win.location.href).toBe('https://talentpartnerid.com/calc?mode=agency#faq')
    expect(win.__entries.length, 'a clean URL must not produce a history write').toBe(0)
  })

  it('does not recurse when its own corrective write goes through the wrapper', () => {
    const win = makeWin(`/calc?d=${PAYLOAD}`)
    installUrlGuard(win)
    expect(win.__entries.length).toBe(1)
  })
})

describe('restoration paths', () => {
  it('re-sanitizes on popstate — back/forward cannot resurrect a payload', () => {
    const win = makeWin('/calc')
    installUrlGuard(win)
    win.location.href = `https://talentpartnerid.com/calc?d=${PAYLOAD}`
    win.location.search = `?d=${PAYLOAD}`
    win.__fire('popstate')
    expect(win.location.href).toBe('https://talentpartnerid.com/calc')
  })

  it('re-sanitizes on hashchange', () => {
    const win = makeWin('/calc')
    installUrlGuard(win)
    win.location.href = `https://talentpartnerid.com/calc?d=${PAYLOAD}`
    win.location.search = `?d=${PAYLOAD}`
    win.__fire('hashchange')
    expect(win.location.href).toBe('https://talentpartnerid.com/calc')
  })

  it('registers its restoration listeners in the capture phase', () => {
    const win = makeWin('/calc')
    const spy = vi.spyOn(win, 'addEventListener')
    installUrlGuard(win)
    const popstate = spy.mock.calls.find((c) => c[0] === 'popstate')
    expect(popstate?.[2], 'capture phase puts the guard ahead of the tracker listener').toBe(true)
  })
})

describe('module-scope safety', () => {
  it('is a genuine no-op when there is no window — SSR and build evaluation', () => {
    // A default parameter (`win: Win = window`) evaluates `window` at call time
    // even when the body's typeof check would have returned, so the guard
    // clause was unreachable and an SSR-path caller would have crashed the
    // build. Resolution is lazy for exactly this reason.
    delete (globalThis as { window?: unknown }).window
    expect(() => installUrlGuard()).not.toThrow()
    expect(() => installUrlGuard(undefined)).not.toThrow()
    expect(enforceCurrentUrl()).toBe(false)
    expect(isUrlSafe()).toBe(false)
  })

  it('does not double-wrap on repeated evaluation (HMR, test remounts)', () => {
    const win = makeWin('/calc')
    installUrlGuard(win)
    const first = win.history.replaceState
    installUrlGuard(win)
    installUrlGuard(win)
    expect(win.history.replaceState, 'wrapping must happen once').toBe(first)
    expect(win.__listeners.popstate?.length ?? 0).toBe(1)
    expect(win.__listeners.hashchange?.length ?? 0).toBe(1)
  })

  it('preserves native history semantics — return value and entry creation', () => {
    const win = makeWin('/calc')
    installUrlGuard(win)
    const before = win.__entries.length
    expect(win.history.pushState({ a: 1 }, '', '/calc?mode=agency')).toBeUndefined()
    expect(win.history.replaceState({ a: 1 }, '', '/calc?mode=direct')).toBeUndefined()
    expect(win.__entries.length).toBe(before + 2)
  })
})

describe('fail-closed', () => {
  it('reports unsafe when a sanitizing write throws', () => {
    const win = makeWin(`/calc?d=${PAYLOAD}`)
    win.history.replaceState = () => { throw new DOMException('blocked', 'SecurityError') }
    ;(globalThis as { window?: unknown }).window = win
    expect(enforceCurrentUrl(win)).toBe(false)
    expect(isUrlSafe(), 'analytics must not be told the URL is safe').toBe(false)
  })

  it('an unparseable url argument is never passed through to native history', async () => {
    // The one input the sanitizer cannot read must not be the one it lets past.
    // Fresh module because urlSafe is module state.
    vi.resetModules()
    const fresh = await import('./url-guard')
    const win = makeWin('/calc')
    ;(globalThis as { window?: unknown }).window = win
    fresh.installUrlGuard(win)
    expect(fresh.isUrlSafe()).toBe(true)

    // 'http://[' is a malformed authority: new URL() throws on it.
    win.history.replaceState({}, '', 'http://[')

    expect(win.location.href, 'the raw unparseable string must not reach the address bar').not.toContain('[')
    expect(fresh.isUrlSafe(), 'a URL the sanitizer could not read means analytics must be withheld').toBe(false)
  })

  it('does not throw out of enforceCurrentUrl — the site keeps working', () => {
    const win = makeWin(`/calc?d=${PAYLOAD}`)
    win.history.replaceState = () => { throw new Error('blocked') }
    expect(() => enforceCurrentUrl(win)).not.toThrow()
  })

  it('reports unsafe when the guard cannot install at all', async () => {
    // urlSafe is module state, so this needs a FRESH module or an earlier
    // case's failure would make it pass for the wrong reason.
    vi.resetModules()
    const fresh = await import('./url-guard')
    const win = makeWin('/calc')
    delete (win as unknown as { history?: unknown }).history
    ;(globalThis as { window?: unknown }).window = win
    expect(fresh.isUrlSafe()).toBe(true)
    fresh.installUrlGuard(win as unknown as Window & typeof globalThis)
    expect(fresh.isUrlSafe(), 'a guard that could not install must not report safe').toBe(false)
  })

  it('isUrlSafe is false on the server, where there is no URL to judge', () => {
    delete (globalThis as { window?: unknown }).window
    expect(isUrlSafe()).toBe(false)
  })
})
