import { useEffect, useState } from 'react'
import Script from 'next/script'
import { CONSENT_EVENT, readConsent } from '../../lib/consent'
import {
  WEBMASTERID_ENDPOINT,
  WEBMASTERID_SCRIPT_ID,
  WEBMASTERID_SITE_ID,
  WEBMASTERID_SRC,
} from '../../lib/analytics/webmasterid'

/**
 * The site's single analytics integration.
 *
 * Mounted once from pages/_app.tsx, so it covers every public route that exists
 * today and every route added later, without any page opting in.
 *
 * Consent gating
 * ──────────────
 * The official tracker stores a persistent anonymous visitor id in
 * localStorage, so it is classified in this site's existing analytics-consent
 * category. Nothing is rendered — and therefore no request is made to
 * webmasterid.com — until localStorage['cookie_consent'] is 'accepted'. The
 * canonical consent store in lib/consent is reused; no second consent state is
 * introduced.
 *
 * Because the gate is evaluated in an effect, the server-rendered HTML never
 * contains the tracker. That keeps every page's markup, canonical URL and
 * structured data byte-identical to before, and means the first client render
 * matches the server render (no hydration mismatch).
 *
 * Single instance
 * ───────────────
 * next/script keys its internal load cache on the `id` prop. Re-renders, route
 * transitions and a consent value that toggles all resolve to the same id, so
 * the bundle is injected at most once per page load.
 *
 * Route tracking is NOT implemented here. The official tracker patches
 * history.pushState/replaceState and listens for popstate itself, emitting one
 * page_view on load and one per real URL change. Adding router hooks on top
 * would double-count every navigation.
 */
export default function WebmasterIDTracker() {
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    const sync = () => setGranted(readConsent() === 'accepted')
    sync()
    // Same-tab choice (the cookie banner) and other-tab choice (native storage
    // event) both re-evaluate the gate.
    window.addEventListener(CONSENT_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  if (!granted) return null

  return (
    <Script
      id={WEBMASTERID_SCRIPT_ID}
      src={WEBMASTERID_SRC}
      data-wmid={WEBMASTERID_SITE_ID}
      data-endpoint={WEBMASTERID_ENDPOINT}
      defer
      strategy="afterInteractive"
      // Analytics must fail silently: a blocked or unreachable tracker is a
      // non-event for the visitor. Nothing is retried and nothing is surfaced.
      onError={() => {}}
    />
  )
}
