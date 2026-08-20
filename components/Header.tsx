import {
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

export default function Header({ activePage, locale }: HeaderProps) {
  const t = CHROME_NAV[locale ?? 'cs']

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
        aria-label={mobile ? undefined : 'Language selector'}
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

            <nav className="nav" aria-label="Main navigation">
              {NAV_TARGETS.map((target) => navLink(target))}
            </nav>

            <div className="header__right">
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
              <button className="hamburger" id="burger" aria-label="Open menu" aria-expanded="false">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
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
        <div className="lang-select" role="group" aria-label="Website language">
          <span className="lang-select__label" data-i18n={locale ? undefined : 'nav.language'}>{t.language}</span>
          {legacySwitcher(true)}
        </div>
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
