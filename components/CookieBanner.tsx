import { useState, useEffect } from 'react'

export const CONSENT_KEY = 'cookie_consent'

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

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) {
      setVisible(true)
    } else if (stored === 'accepted') {
      updateGtag('granted')
    }
    // 'rejected' → defaults in _document.tsx already set everything to denied
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    updateGtag('granted')
    setVisible(false)
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    updateGtag('denied')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent" aria-modal="false">
      <div className="cookie-banner__inner">
        <p className="cookie-banner__text">
          We use cookies to improve your experience and process data in accordance with our{' '}
          <a href="/privacy-policy">Privacy Policy</a>. You can accept all cookies or reject
          non-essential ones. Your choice is saved and the banner will not reappear.
        </p>
        <div className="cookie-banner__actions">
          <button type="button" onClick={reject} className="cookie-btn cookie-btn--reject">
            Reject non-essential
          </button>
          <button type="button" onClick={accept} className="cookie-btn cookie-btn--accept">
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
