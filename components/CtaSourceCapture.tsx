import { useEffect } from 'react'
import { isCtaSource } from '../lib/attribution'

// Session-scoped CTA-source capture (SEO crawl hygiene, Phase: indexing-coverage).
//
// Employer-conversion links point at the clean canonical URL (/poptavka-pracovniku)
// with NO ?source= query, so crawlers only ever discover the one clean request
// URL. The non-sensitive surface hint ("which button") travels instead via a
// data-request-source attribute on the clicked anchor, captured here into
// sessionStorage at click time and read once by the request form.
//
// This is session-limited client state only — never a query string, cookie,
// localStorage or the URL — and it carries a surface label, never any personal
// data or calculator value (isCtaSource enforces the small allowlist).
export const CTA_SOURCE_KEY = 'tnt-cta-source'

export default function CtaSourceCapture() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const anchor = target?.closest?.('a[data-request-source]') as HTMLElement | null
      if (!anchor) return
      const source = anchor.getAttribute('data-request-source') || ''
      if (!isCtaSource(source)) return
      try {
        window.sessionStorage.setItem(CTA_SOURCE_KEY, source)
      } catch {
        /* storage blocked — attribution is best-effort, never a hard failure */
      }
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
  return null
}
