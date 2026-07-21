import { useState, useEffect } from 'react'
import { useLang, type Lang } from '../lib/i18n/react'
import { CONSENT_KEY, readConsent, writeConsent } from '../lib/consent'
import { clearWebmasterIdStorage } from '../lib/analytics/webmasterid'

export { CONSENT_KEY }

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

  useEffect(() => {
    const stored = readConsent()
    if (stored === 'unset') {
      setVisible(true)
    } else if (stored === 'accepted') {
      updateGtag('granted')
    }
    // 'rejected' → defaults in _document.tsx already set everything to denied
  }, [])

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
    <div className="cookie-banner" role="dialog" aria-label={c.label} aria-modal="false" lang={lang}>
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
