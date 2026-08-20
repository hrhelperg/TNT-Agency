/**
 * Keeps undeclared query parameters out of the address bar for the whole page
 * lifetime, so a legacy `?d=` link cannot be observed by third-party analytics.
 *
 * Why a mount effect was not enough
 * ─────────────────────────────────
 * The first attempt sanitized once, from a `useEffect(…, [])` in a component
 * mounted first in _app, and reasoned that sibling effect order put it ahead of
 * the analytics island. Measured against the real tracker, that reasoning
 * failed:
 *
 *   [0] DIRTY  <- Next router V.changeState
 *   [1] clean  <- _app scrub
 *   [2] DIRTY  <- Next router V.changeState      <-- re-dirtied AFTER the scrub
 *
 * Next's Container.componentDidMount calls router.replace(pathname+query,
 * asPath, {_h:1, shallow:true}) for any exported page hydrated with a non-empty
 * search. That promise resolves asynchronously, so on a warm load it lands
 * after the scrub and restores the original dirty asPath. 4 of 6 warm runs
 * leaked. Component ordering cannot win a race against a promise resolution it
 * does not control.
 *
 * The approach here
 * ─────────────────
 * Stop racing; own the write path.
 *
 *   1. Install at MODULE SCOPE of _app — before hydration, before Next's
 *      router initialises, long before next/script injects the tracker.
 *   2. Wrap history.pushState / replaceState so every write is sanitized as it
 *      happens, whoever makes it. Next's router.replace cannot restore a dirty
 *      URL because its own argument is cleaned on the way through. That turns a
 *      race into a structural property.
 *   3. Sanitize the state object too. Next stores {url, as} holding the
 *      original dirty path; leaving it intact let a Back navigation resurrect
 *      the payload.
 *   4. Listen for popstate and hashchange in the CAPTURE phase, registered
 *      before the tracker exists.
 *   5. Fail CLOSED. If a sanitizing write throws, the URL cannot be made safe,
 *      so analytics must not start. The site keeps working.
 *
 * Because the tracker patches history AFTER this module does, its wrapper calls
 * this one and therefore reads an already-sanitized location.href.
 *
 * SCOPE: this guard filters the QUERY only. Pathnames and fragments are left
 * alone — see the scope note in ./url-policy.ts.
 */

import { isPolicyClean, sanitizeParts } from './url-policy'

type Win = Window & typeof globalThis

const INSTALLED = '__tntUrlGuardInstalled'

/** False once a sanitizing write has failed. Analytics is gated on this. */
let urlSafe = true

/**
 * Resolve the window to guard, lazily.
 *
 * A default parameter (`win: Win = window`) evaluates `window` at call time
 * even when the body's own `typeof win === 'undefined'` check would have
 * returned — so that guard clause was unreachable and an SSR-path caller would
 * have crashed the build instead of no-opping.
 */
function resolveWindow(win?: Win): Win | undefined {
  if (win) return win
  return typeof window !== 'undefined' ? (window as Win) : undefined
}

/** True when the guard is healthy and the current URL satisfies the policy. */
export function isUrlSafe(): boolean {
  if (typeof window === 'undefined') return false
  if (!urlSafe) return false
  try {
    return isPolicyClean(window.location.href)
  } catch {
    return false
  }
}

/** For tests: whether a sanitizing write has ever failed. */
export const guardHasFailed = (): boolean => !urlSafe

/**
 * Sanitize a history state object's embedded URLs. Next stores {url, as};
 * unrelated fields (scroll, idx, key) are preserved untouched.
 */
function sanitizeState(state: unknown, win: Win): unknown {
  if (!state || typeof state !== 'object') return state
  const s = state as Record<string, unknown>
  if (typeof s.url !== 'string' && typeof s.as !== 'string') return state
  const next: Record<string, unknown> = { ...s }
  for (const key of ['url', 'as'] as const) {
    const v = s[key]
    if (typeof v !== 'string') continue
    try {
      // Resolve against the window being guarded, never a global: the guard
      // must be drivable with an injected window or it cannot be tested.
      const u = new URL(v, win.location.origin || win.location.href)
      next[key] = sanitizeParts(u.pathname, u.search, u.hash).path
    } catch {
      next[key] = v
    }
  }
  return next
}

/** Sanitize a history url argument, preserving absolute/relative form. */
function sanitizeArg(url: unknown, win: Win): string | null | undefined {
  if (url === null || url === undefined) return url as null | undefined
  const raw = String(url)
  try {
    const u = new URL(raw, win.location.href)
    const { path } = sanitizeParts(u.pathname, u.search, u.hash)
    return /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(raw) ? `${u.origin}${path}` : path
  } catch {
    // Unparseable. Passing the raw string through would mean the one input the
    // sanitizer could not read is the one it lets past. Fall back to the
    // current path, which is known to be in policy, and record the failure.
    urlSafe = false
    try {
      return win.location.pathname
    } catch {
      return null
    }
  }
}

/**
 * Bring the current address bar into policy, if it is not already.
 * Returns true when the URL is safe afterwards.
 */
export function enforceCurrentUrl(win?: Win): boolean {
  const w = resolveWindow(win)
  if (!w) return false
  try {
    const { pathname, search, hash } = w.location
    const { path, clean } = sanitizeParts(pathname, search, hash)
    if (clean) return true
    w.history.replaceState(sanitizeState(w.history.state, w), '', path)
    return true
  } catch {
    urlSafe = false
    return false
  }
}

/**
 * Install the guard. Idempotent — safe to call from module scope and again
 * from an effect. Must run before the analytics bundle is injected.
 */
export function installUrlGuard(maybeWin?: Win): void {
  const win = resolveWindow(maybeWin)
  if (!win || !win.history) {
    // Cannot wrap the write path, so nothing can keep the URL in policy.
    // Reporting "safe" here would let analytics start unguarded.
    urlSafe = false
    return
  }
  const flagged = win as unknown as Record<string, unknown>
  if (flagged[INSTALLED]) {
    enforceCurrentUrl(win)
    return
  }
  flagged[INSTALLED] = true

  const nativeReplace = win.history.replaceState.bind(win.history)
  const nativePush = win.history.pushState.bind(win.history)

  win.history.replaceState = function (state: unknown, title: string, url?: string | null) {
    try {
      const result = nativeReplace(sanitizeState(state, win), title, sanitizeArg(url, win) as string)
      // A url-less write leaves the address bar untouched, so sanitizeArg had
      // nothing to clean. Re-assert, or a URL dirty at that moment survives a
      // write that appeared to succeed.
      if (url === null || url === undefined) enforceCurrentUrl(win)
      return result
    } catch (e) {
      urlSafe = false
      throw e
    }
  } as typeof win.history.replaceState

  win.history.pushState = function (state: unknown, title: string, url?: string | null) {
    try {
      const result = nativePush(sanitizeState(state, win), title, sanitizeArg(url, win) as string)
      if (url === null || url === undefined) enforceCurrentUrl(win)
      return result
    } catch (e) {
      urlSafe = false
      throw e
    }
  } as typeof win.history.pushState

  // Capture phase, registered before the tracker exists, so a restored dirty
  // URL is cleaned before any analytics popstate handler reads location.href.
  win.addEventListener('popstate', () => enforceCurrentUrl(win), true)
  win.addEventListener('hashchange', () => enforceCurrentUrl(win), true)

  enforceCurrentUrl(win)
}
