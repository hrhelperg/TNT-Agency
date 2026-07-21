// Canonical analytics-consent state for the Next application.
//
// There is exactly ONE consent store on this site: localStorage['cookie_consent'],
// written by components/CookieBanner.tsx. This module exists so that consumers
// (the cookie banner itself, and the WebmasterID analytics island) share that
// single source of truth instead of each re-implementing the read.
//
// The legacy repo-root cookie-consent.js uses a different key ('cookieConsent')
// and is not served by Next — it is not part of this flow.
//
// Only the consent flag is stored. It is a preference, never personal data.

export const CONSENT_KEY = 'cookie_consent'

/**
 * Fired on `window` whenever the visitor's choice changes in THIS tab.
 * localStorage's native 'storage' event only fires in *other* tabs, so without
 * this the analytics island could not react to an Accept without a reload.
 */
export const CONSENT_EVENT = 'tnt-consent'

export type ConsentState = 'accepted' | 'rejected' | 'unset'

/** Reads the stored choice. Returns 'unset' on the server or if storage is blocked. */
export function readConsent(): ConsentState {
  if (typeof window === 'undefined') return 'unset'
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY)
    return raw === 'accepted' || raw === 'rejected' ? raw : 'unset'
  } catch {
    // Storage blocked (private mode, hardened browser). Treat as no consent:
    // the privacy-conservative default is to withhold analytics.
    return 'unset'
  }
}

/** Persists the choice and notifies listeners in this tab. */
export function writeConsent(state: 'accepted' | 'rejected'): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CONSENT_KEY, state)
  } catch {
    /* best-effort: a blocked store must never break the page */
  }
  try {
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }))
  } catch {
    /* ignore */
  }
}
