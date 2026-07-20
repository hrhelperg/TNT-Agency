import { useCallback, useEffect, useRef } from 'react'
import { useLang } from '../../lib/i18n/react'
import { ECOSYSTEM_COPY } from '../../lib/ecosystem/copy'
import {
  CATEGORY_ORDER,
  availableChannels,
  productsInCategory,
  type EcosystemProduct,
} from '../../lib/ecosystem/registry'

// Accessible product directory (dialog). Opened from the ecosystem banner.
//
// No UI library: focus management, Escape handling, the focus trap and the
// scroll lock are all implemented here in a few lines against the real DOM.
//
// Only channels that actually exist are rendered — availableChannels() filters
// the registry, so a missing store link produces no element at all rather than
// a disabled or fake one.

interface Props {
  open: boolean
  onClose: () => void
  /** Focus returns here on close. */
  triggerRef: React.RefObject<HTMLButtonElement>
}

export default function EcosystemDirectory({ open, onClose, triggerRef }: Props) {
  const lang = useLang()
  const c = ECOSYSTEM_COPY[lang]
  const panelRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const focusables = useCallback((): HTMLElement[] => {
    const root = panelRef.current
    if (!root) return []
    return Array.from(
      root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ).filter((el) => el.offsetParent !== null)
  }, [])

  // Focus the close button on open; restore focus to the trigger on close.
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    window.requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      const target = triggerRef.current ?? previouslyFocused
      target?.focus?.()
    }
  }, [open, triggerRef])

  // Escape to close + a real focus trap (Tab wraps inside the dialog).
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [open, onClose, focusables])

  // Lock background scroll without shifting layout (compensate scrollbar width).
  useEffect(() => {
    if (!open) return
    const { body, documentElement } = document
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    const gap = window.innerWidth - documentElement.clientWidth
    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [open])

  if (!open) return null

  const renderProduct = (p: EcosystemProduct) => {
    const channels = availableChannels(p)
    if (channels.length === 0) return null
    return (
      <li key={p.id} className={`eco-dir__item${p.current ? ' is-current' : ''}`}>
        <div className="eco-dir__item-head">
          <span className="eco-dir__name">{p.name}</span>
          {p.current ? <span className="eco-dir__badge">{c.currentProduct}</span> : null}
        </div>
        {p.description ? <p className="eco-dir__desc">{p.description}</p> : null}
        <div className="eco-dir__channels">
          {channels.map((ch) => (
            <a
              key={ch.kind}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="eco-dir__channel"
              aria-label={`${p.name} – ${c.channels[ch.kind]} (${c.opensInNewTab})`}
            >
              {c.channels[ch.kind]}
            </a>
          ))}
        </div>
      </li>
    )
  }

  return (
    <div className="eco-dir" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="eco-dir__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="eco-dir-title"
        lang={lang}
      >
        <div className="eco-dir__head">
          <div>
            <h2 id="eco-dir-title" className="eco-dir__title">{c.directoryTitle}</h2>
            <p className="eco-dir__intro">{c.directoryIntro}</p>
          </div>
          <button
            type="button"
            className="eco-dir__close"
            onClick={onClose}
            ref={closeRef}
            aria-label={c.close}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="eco-dir__body">
          {CATEGORY_ORDER.map((cat) => {
            const items = productsInCategory(cat).filter((p) => availableChannels(p).length > 0)
            if (items.length === 0) return null
            return (
              <section key={cat} className="eco-dir__group" aria-labelledby={`eco-cat-${cat}`}>
                <h3 id={`eco-cat-${cat}`} className="eco-dir__group-title">{c.categories[cat]}</h3>
                <ul className="eco-dir__list">{items.map(renderProduct)}</ul>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
