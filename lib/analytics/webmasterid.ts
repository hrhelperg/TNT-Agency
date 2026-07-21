// WebmasterID — the site's analytics provider.
//
// These four values are PUBLIC tracker configuration, not credentials: they are
// visible in the page source of every site that uses WebmasterID. They live in
// source (matching how SITE in lib/content/rules.ts holds public identity)
// rather than in environment variables, because there is nothing to keep secret
// and no per-environment variation. No private WebmasterID API key exists in
// this integration, and none is required.
//
// ── Verified tracker behaviour (read from the official bundle) ───────────────
// The constants below are paired with facts established by reading
// https://webmasterid.com/tracker.iife.min.js directly, not from assumption:
//
//   * Cookies:        none. The bundle never touches document.cookie.
//   * localStorage:   'wmid:av:v1'  — a persistent anonymous visitor id.
//   * sessionStorage: 'wmid:as:v1' + 'wmid:as:last:v1' — a 30-minute session id.
//   * Payload:        site_id, timestamp, language, user_agent, screen_width,
//                     anonymous_session_id, anonymous_visitor_id, event_name,
//                     url, pathname, referrer, title.
//   * Navigation:     patches history.pushState/replaceState and listens for
//                     popstate, emitting a page_view only when location.href
//                     actually changed. One event on load, one per transition.
//   * Forms:          the submit listener fires ONLY for a form carrying an
//                     explicit data-wmid-form attribute, and sends only that
//                     attribute's value. It never reads input values. No form
//                     on this site carries the attribute, so no form event is
//                     ever emitted (see lib/analytics/webmasterid.test.ts).
//   * Links:          click events are emitted only for http/https hrefs.
//                     mailto: links — this site's entire lead flow — are
//                     classified as "no event" and are never transmitted.
//   * DNT/GPC:        initialisation aborts entirely when doNotTrack or
//                     globalPrivacyControl is set.
//
// The persistent localStorage visitor id is why this tracker is treated as
// consent-gated analytics: it is loaded only after the visitor accepts, exactly
// like any other analytics category on this site. See components/analytics/
// WebmasterIDTracker.tsx.

/** Registered WebmasterID property for talentpartnerid.com. */
export const WEBMASTERID_SITE_ID = 'wm_wfywm8g9qkoonabl'

/** Event ingest endpoint. */
export const WEBMASTERID_ENDPOINT = 'https://webmasterid-ingest-api.vercel.app/api/events'

/** Official tracker bundle. Loaded from WebmasterID's own origin, never proxied or vendored. */
export const WEBMASTERID_SRC = 'https://webmasterid.com/tracker.iife.min.js'

/**
 * Stable DOM id for the injected script. next/script keys its load cache by
 * this id, which is what guarantees a single tracker instance across
 * client-side navigation and any re-render.
 */
export const WEBMASTERID_SCRIPT_ID = 'webmasterid-tracker'

/**
 * Browser storage written by the official tracker. Enumerated so that a consent
 * withdrawal can clear it — the tracker exposes no teardown API of its own.
 */
export const WEBMASTERID_STORAGE_KEYS = [
  'wmid:av:v1',
  'wmid:as:v1',
  'wmid:as:last:v1',
] as const

/**
 * Removes the tracker's anonymous identifiers. Called when the visitor rejects
 * or withdraws analytics consent, so no identifier from an earlier accepted
 * session survives the withdrawal.
 */
export function clearWebmasterIdStorage(): void {
  if (typeof window === 'undefined') return
  for (const key of WEBMASTERID_STORAGE_KEYS) {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* storage blocked — nothing to clear */
    }
    try {
      window.sessionStorage.removeItem(key)
    } catch {
      /* storage blocked — nothing to clear */
    }
  }
}
