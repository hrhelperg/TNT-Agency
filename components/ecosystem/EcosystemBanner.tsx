import { useRef, useState } from 'react'
import { useLang } from '../../lib/i18n/react'
import { ECOSYSTEM_COPY } from '../../lib/ecosystem/copy'
import { currentProduct, timelineProducts } from '../../lib/ecosystem/registry'
import EcosystemDirectory from './EcosystemDirectory'

// Global HELPERG ecosystem banner — "Company Timeline" variant.
//
// Mounted once in pages/_app.tsx, so it renders on every public route without
// being added page by page. It is fixed to the top of the viewport and the
// existing fixed site header is offset beneath it (see --eco-h in styles.css);
// body padding reserves the space, so no content is covered and nothing shifts
// after hydration.
//
// SSR-safe: the markup is identical on the server and the first client render.
// useLang() returns the document default ('cs') until after mount, exactly like
// the calculator islands, so there is no hydration mismatch. All product links
// are real anchors present in the HTML — the timeline does not depend on JS.
//
// Not dismissible by design: this is permanent ecosystem navigation.

export default function EcosystemBanner() {
  const lang = useLang()
  const c = ECOSYSTEM_COPY[lang]
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const current = currentProduct()
  const timeline = timelineProducts(6)

  return (
    <>
      <div className="eco-bar" lang={lang}>
        <nav className="eco-bar__inner" aria-label={c.ariaLabel}>
          {/* Ecosystem identity */}
          <a
            className="eco-bar__brand"
            href="https://helperg.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`HELPERG — ${c.partOf} (${c.opensInNewTab})`}
          >
            <svg className="eco-bar__mark" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M5.4 5v6M10.6 5v6M5.4 8h5.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="eco-bar__brand-text eco-bar__brand-text--full">{c.partOf}</span>
            <span className="eco-bar__brand-text eco-bar__brand-text--short">{c.brandShort}</span>
          </a>

          {/* Timeline: current product plus adjacent products */}
          <ol className="eco-bar__timeline">
            {timeline.map((p) => {
              const isCurrent = Boolean(p.current)
              const label = p.shortName ?? p.name
              return (
                <li key={p.id} className={`eco-node${isCurrent ? ' eco-node--current' : ''}`}>
                  {isCurrent ? (
                    // The current product is text, not a link to itself.
                    <span className="eco-node__link" aria-current="page">
                      <span className="eco-node__dot" aria-hidden="true" />
                      <span className="eco-node__label">{label}</span>
                      {/* Meaning is not conveyed by colour alone. */}
                      <span className="sr-only"> ({c.currentProduct})</span>
                    </span>
                  ) : (
                    <a
                      className="eco-node__link"
                      href={p.channels.website as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.name} (${c.opensInNewTab})`}
                    >
                      <span className="eco-node__dot" aria-hidden="true" />
                      <span className="eco-node__label">{label}</span>
                    </a>
                  )}
                </li>
              )
            })}
          </ol>

          {/* Compact identity for narrow viewports */}
          <span className="eco-bar__compact" aria-hidden="true">
            <span className="eco-bar__compact-sep">·</span>
            <span className="eco-bar__compact-current">{current.name}</span>
          </span>

          <button
            type="button"
            className="eco-bar__cta"
            ref={triggerRef}
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <span className="eco-bar__cta-text eco-bar__cta-text--full">{c.exploreAll}</span>
            <span className="eco-bar__cta-text eco-bar__cta-text--short">{c.exploreShort}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
              <path d="M2 6h7M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </nav>
      </div>

      <EcosystemDirectory open={open} onClose={() => setOpen(false)} triggerRef={triggerRef} />
    </>
  )
}
