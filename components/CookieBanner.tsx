import { useState, useEffect, useRef } from 'react'
import { useLang, type Lang } from '../lib/i18n/react'
import { CONSENT_KEY, readConsent, writeConsent } from '../lib/consent'
import { clearWebmasterIdStorage } from '../lib/analytics/webmasterid'

export { CONSENT_KEY }

/**
 * The banner's real rendered height, published so other fixed-position layers
 * can reserve room for it instead of guessing.
 *
 * It is not a constant: this text wraps to as many as four lines depending on
 * language and viewport width — German at 320px measures 302px, more than
 * double a one-line English banner at 768px. A static reservation sized for
 * one case is either too small (the mobile menu's primary action lands under
 * the banner and cannot be clicked — the defect this fixes) or wastes most of
 * a phone screen's menu in the other. `--eco-total` bridges a JS-owned
 * dimension into layout the same way; this is that pattern for a value that
 * varies by content rather than by breakpoint alone.
 */
const CONSENT_BANNER_HEIGHT_VAR = '--consent-banner-h'

function publishBannerHeight(el: HTMLElement | null) {
  document.documentElement.style.setProperty(CONSENT_BANNER_HEIGHT_VAR, el ? `${Math.ceil(el.getBoundingClientRect().height)}px` : '0px')
}

// Localized chrome only — consent semantics (gtag consent mode + the stored
// choice) are unchanged. Preference storage is the consent flag, not personal data.
const COOKIE_COPY: Record<Lang, {
  text: string; privacy: string; tail: string; reject: string; accept: string; label: string
}> = {
  cs: {
    text: 'Používáme cookies ke zlepšení vašeho zážitku a zpracováváme údaje v souladu s našimi',
    privacy: 'Zásadami ochrany osobních údajů',
    tail: 'Můžete přijmout všechny cookies, nebo odmítnout ty nepotřebné. Vaše volba se uloží a lišta se znovu nezobrazí.',
    reject: 'Odmítnout nepotřebné',
    accept: 'Přijmout vše',
    label: 'Souhlas s cookies',
  },
  en: {
    text: 'We use cookies to improve your experience and process data in accordance with our',
    privacy: 'Privacy Policy',
    tail: 'You can accept all cookies or reject non-essential ones. Your choice is saved and the banner will not reappear.',
    reject: 'Reject non-essential',
    accept: 'Accept all',
    label: 'Cookie consent',
  },
  de: {
    text: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern, und verarbeiten Daten gemäß unserer',
    privacy: 'Datenschutzerklärung',
    tail: 'Sie können alle Cookies akzeptieren oder nicht notwendige ablehnen. Ihre Auswahl wird gespeichert und das Banner erscheint nicht erneut.',
    reject: 'Nicht notwendige ablehnen',
    accept: 'Alle akzeptieren',
    label: 'Cookie-Einwilligung',
  },
}

function updateGtag(status: 'granted' | 'denied') {
  if (typeof window === 'undefined') return
  const w = window as any
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', {
      analytics_storage: status,
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
    })
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const lang = useLang()
  const c = COOKIE_COPY[lang]
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = readConsent()
    if (stored === 'unset') {
      setVisible(true)
    } else if (stored === 'accepted') {
      updateGtag('granted')
    }
    // 'rejected' → defaults in _document.tsx already set everything to denied
  }, [])

  // Keep --consent-banner-h matched to the real rendered height for as long as
  // the banner is on screen, and reset it to 0px the moment it unmounts so a
  // visitor who has answered gets the mobile menu's full room back.
  //
  // A resize listener alone is NOT sufficient, and assuming it was produced a
  // real defect: this text re-wraps when the web font finishes loading, which
  // fires no resize event. The published value stayed one line short of the
  // truth — measured 258px against a real 279.5px — and the mobile menu
  // reserved 21px too little, leaving the CTA fractionally under the banner in
  // exactly the window a first-time visitor is interacting. A ResizeObserver
  // watches the element itself, so ANY cause of a height change — font load,
  // re-wrap, locale switch, viewport change — republishes it.
  useEffect(() => {
    if (!visible) {
      publishBannerHeight(null)
      return
    }
    const el = rootRef.current
    const measure = () => publishBannerHeight(rootRef.current)
    measure()

    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    if (observer && el) observer.observe(el)
    // Fallback for anything without ResizeObserver, plus orientation changes
    // that can alter layout without resizing the element's own box.
    window.addEventListener('resize', measure)

    // Close the font-reflow window.
    //
    // A ResizeObserver reports a size change AFTER layout, so the corrected
    // value lands one frame late. Measured on a 375x844 first load: at frame 3
    // the web font finished and the banner reflowed 257 -> 279.5px while the
    // published value still read 258; frame 4 corrected it. For one frame the
    // reserve was 21.5px — one text line — short of the truth.
    //
    // The cause is specific and observable, so it is tracked rather than
    // guessed at with a timeout: republish every frame for as long as fonts
    // report as loading, then stop and leave the observer to handle anything
    // later. No arbitrary delay, and no window where the value is knowably
    // stale.
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
    let rafId = 0
    const trackFontLoading = () => {
      measure()
      if (!fonts || fonts.status === 'loading') rafId = requestAnimationFrame(trackFontLoading)
    }
    if (!fonts || fonts.status === 'loading') rafId = requestAnimationFrame(trackFontLoading)
    fonts?.ready?.then(measure).catch(() => {})

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', measure)
      if (rafId) cancelAnimationFrame(rafId)
      publishBannerHeight(null)
    }
  }, [visible, lang])

  function accept() {
    writeConsent('accepted')
    updateGtag('granted')
    setVisible(false)
  }

  function reject() {
    writeConsent('rejected')
    updateGtag('denied')
    // The analytics tracker is never loaded without consent, so rejecting is
    // already sufficient going forward. Clearing its anonymous identifiers as
    // well means no id from an earlier accepted session outlives a withdrawal.
    clearWebmasterIdStorage()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div ref={rootRef} className="cookie-banner" role="dialog" aria-label={c.label} aria-modal="false" lang={lang}>
      <div className="cookie-banner__inner">
        <p className="cookie-banner__text">
          {c.text}{' '}
          <a href="/privacy-policy">{c.privacy}</a>. {c.tail}
        </p>
        <div className="cookie-banner__actions">
          <button type="button" onClick={reject} className="cookie-btn cookie-btn--reject">
            {c.reject}
          </button>
          <button type="button" onClick={accept} className="cookie-btn cookie-btn--accept">
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
