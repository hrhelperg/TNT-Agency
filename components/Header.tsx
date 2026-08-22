import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { alternatesFor } from '../lib/locale/registry'
import LanguageSwitcher from './locale/LanguageSwitcher'
import {
  CHROME_ARIA,
  CHROME_NAV,
  NAV_TARGETS,
  REQUEST_WORKERS,
  resolveNavHref,
  type LocaleLocked,
  type NavTarget,
} from '../lib/locale/chrome'

interface HeaderProps {
  activePage?: string
  /**
   * Set only by locale-locked pages (/en/*, /de/*). When absent the header
   * renders exactly as it always has: Czech literals carrying `data-i18n`
   * keys, which public/script.js may rewrite if the visitor picks another
   * language. When present, the labels are rendered server-side in that
   * locale and the `data-i18n` hooks are omitted, so nothing can rewrite a
   * page whose language is fixed by its URL.
   */
  locale?: LocaleLocked
}

/**
 * The header's real rendered height, published so the mobile menu can start
 * exactly where the header ends.
 *
 * It was a literal: `--mobile-nav-top: calc(88px + var(--eco-total))`. The
 * header actually renders 72px tall, so the menu opened 15px below the header's
 * bottom edge and the page underneath stayed live in the gap — an independent
 * refuter clicked at the band's centre on an open menu and navigated away,
 * and a wheel over it scrolled the page behind a surface that is supposed to
 * be modal.
 *
 * The height is not a constant to correct to 72 either: `.header.scrolled`
 * trades 14px of padding for 10px, and the label text can rewrap. Measuring
 * the element is the same approach `--consent-banner-h` already uses for a
 * dimension only the browser knows.
 */
const HEADER_HEIGHT_VAR = '--header-h'

export default function Header({ activePage, locale }: HeaderProps) {
  useEffect(() => {
    const el = document.getElementById('header')
    if (!el) return
    const publish = () => {
      document.documentElement.style.setProperty(HEADER_HEIGHT_VAR, `${Math.ceil(el.getBoundingClientRect().height)}px`)
    }
    publish()
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(publish) : null
    observer?.observe(el)
    // .scrolled changes the padding, and that is a class flip rather than a
    // resize of the observed box in every engine, so the scroll event is
    // watched too.
    window.addEventListener('scroll', publish, { passive: true })
    window.addEventListener('resize', publish)
    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', publish)
      window.removeEventListener('resize', publish)
    }
  }, [])

  const t = CHROME_NAV[locale ?? 'cs']
  const aria = CHROME_ARIA[locale ?? 'cs']

  /**
   * Where a real translation of THIS page exists, the header offers navigation
   * to it. That was the missing capability: on the 10 Czech concept primaries
   * the only language control could not reach the German page that now exists,
   * and on the 20 locale pages it could not change the URL at all, so pressing
   * "CS" stranded the reader on an English document wearing Czech chrome.
   *
   * The legacy widget is REMOVED only where it is actively wrong — the locale
   * pages, whose language is fixed by the URL. It stays on the Czech spine,
   * including the concept primaries, because it is not really locale navigation
   * there: it is what translates the client-side islands, and those islands are
   * trilingual. Deleting it from /cena-neobsazene-pozice would have made the
   * vacancy-cost tool unreachable in German, since the German page carries the
   * prose but not the tool. Two controls on one page is a wart; silently
   * dropping a working feature is worse.
   */
  const router = useRouter()
  const route = router?.pathname ?? ''
  const hasTranslations = alternatesFor(route).length >= 2

  /**
   * On the Czech spine the anchor keeps its `data-i18n` hook and carries no
   * `hreflang`, which is what every existing page already emits. On a locale
   * page the hook is dropped and `hreflang` is set on links that still lead
   * to Czech-only pages, so the markup states where the reader is going.
   */
  const navLink = (target: NavTarget, mobile = false) => {
    const { href, hreflang } = resolveNavHref(target, locale ?? 'cs')
    const key = `${mobile ? 'mnav' : 'nav'}.${target.key}`
    return (
      <a
        key={key}
        href={href}
        data-i18n={locale ? undefined : key}
        {...(hreflang ? { hreflang } : {})}
        className={!mobile && target.activePage && activePage === target.activePage ? 'active' : undefined}
      >
        {t[target.key]}
      </a>
    )
  }

  const requestWorkers = resolveNavHref(REQUEST_WORKERS, locale ?? 'cs')

  /**
   * The legacy button switcher writes localStorage and swaps `data-i18n` text
   * in place. On a locale-locked page that is actively wrong: it cannot change
   * the URL, so pressing "CS" used to leave the reader on an English document
   * wearing Czech navigation. Locale pages render LanguageSwitcher instead,
   * which navigates to the equivalent page.
   */
  const legacySwitcher = (mobile = false) =>
    locale ? null : (
      // The mobile copy carries no aria-label of its own: it sits inside
      // <div class="lang-select" role="group" aria-label="Website language">,
      // and a second label nested in that group would relabel it.
      <div
        className={mobile ? 'lang-switcher lang-switcher--mobile' : 'lang-switcher'}
        aria-label={mobile ? undefined : aria.languageSelector}
      >
        <button className="lang-btn" data-lang="en" aria-label="English">EN</button>
        <button className="lang-btn active" data-lang="cs" aria-label="Čeština">CS</button>
        <button className="lang-btn" data-lang="de" aria-label="Deutsch">DE</button>
      </div>
    )

  return (
    <>
      <header className="header" id="header">
        <div className="container">
          <div className="header__inner">
            <a href={resolveNavHref(NAV_TARGETS[0], locale ?? 'cs').href} className="logo" aria-label="TalentPartnerID">
              <svg className="logo__icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="40" height="40" rx="10" fill="#0d1e3d" />
                <text x="19.5" y="24.5" fontFamily="Inter, Arial, sans-serif" fontSize="19.5" fontWeight="800" fill="#ffffff" textAnchor="middle" letterSpacing="-1.3">TP</text>
                <text x="33.5" y="34" fontFamily="Inter, Arial, sans-serif" fontSize="8.5" fontWeight="700" fill="#f05a28" textAnchor="end" letterSpacing="-0.2">id</text>
              </svg>
              <span className="logo__word">TalentPartner<span className="id">ID</span></span>
            </a>

            <nav className="nav" aria-label={aria.mainNav}>
              {NAV_TARGETS.map((target) => navLink(target))}
            </nav>

            <div className="header__right">
              {hasTranslations && <LanguageSwitcher route={route} className="locale-switcher--header" />}
              {legacySwitcher()}
              {/* Primary header action is the employer conversion path. The
                  Contact link stays available in the nav list above. */}
              <a
                href={requestWorkers.href}
                data-request-source="employer-hub"
                className="btn btn-primary btn-sm"
                data-i18n={locale ? undefined : 'nav.requestWorkers'}
                {...(requestWorkers.hreflang ? { hreflang: requestWorkers.hreflang } : {})}
              >
                {t.requestWorkers}
              </a>
              <button className="hamburger" id="burger" aria-label={aria.openMenu} aria-expanded="false">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="mobile-nav" id="mobileNav" aria-label={aria.mobileNav}>
        {NAV_TARGETS.slice(0, 7).map((target) => navLink(target, true))}
        <a
          href={requestWorkers.href}
          data-request-source="employer-hub"
          data-i18n={locale ? undefined : 'mnav.requestWorkers'}
          {...(requestWorkers.hreflang ? { hreflang: requestWorkers.hreflang } : {})}
        >
          {t.requestWorkers}
        </a>
        {navLink(NAV_TARGETS[7], true)}
        {/* The group is a labelled ARIA container. It renders only when it will
            actually hold controls — previously the legacy switcher returned null
            on locale pages while this wrapper stayed, leaving a group announced
            as "Website language" containing nothing operable. */}
        {/* The group is a labelled ARIA container, so it renders only when it
            will actually hold controls. Previously the legacy switcher returned
            null on locale pages while this wrapper stayed, leaving a group
            announced as "Website language" containing nothing operable. */}
        {(hasTranslations || !locale) && (
          <div className="lang-select" role="group" aria-label={aria.websiteLanguage}>
            <span className="lang-select__label" data-i18n={locale ? undefined : 'nav.language'}>{t.language}</span>
            {hasTranslations && <LanguageSwitcher route={route} className="locale-switcher--mobile" />}
            {legacySwitcher(true)}
          </div>
        )}
        <a
          href={requestWorkers.href}
          data-request-source="employer-hub"
          className="btn btn-primary btn-lg"
          data-i18n={locale ? undefined : 'mnav.requestWorkers'}
          {...(requestWorkers.hreflang ? { hreflang: requestWorkers.hreflang } : {})}
        >
          {t.requestWorkers}
        </a>
      </nav>
    </>
  )
}
