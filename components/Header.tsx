interface HeaderProps {
  activePage?: string
}

export default function Header({ activePage }: HeaderProps) {
  return (
    <>
      <header className="header" id="header">
        <div className="container">
          <div className="header__inner">
            <a href="/" className="logo" aria-label="TalentPartnerID">
              <svg className="logo__icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="40" height="40" rx="10" fill="#0d1e3d" />
                <text x="19.5" y="24.5" fontFamily="Inter, Arial, sans-serif" fontSize="19.5" fontWeight="800" fill="#ffffff" textAnchor="middle" letterSpacing="-1.3">TP</text>
                <text x="33.5" y="34" fontFamily="Inter, Arial, sans-serif" fontSize="8.5" fontWeight="700" fill="#f05a28" textAnchor="end" letterSpacing="-0.2">id</text>
              </svg>
              <span className="logo__word">TalentPartner<span className="id">ID</span></span>
            </a>

            <nav className="nav" aria-label="Main navigation">
              <a href="/" data-i18n="nav.home" className={activePage === 'home' ? 'active' : undefined}>Home</a>
              <a href="/agencies" data-i18n="nav.agencies" className={activePage === 'agencies' ? 'active' : undefined}>Agencies</a>
              <a href="/offers" data-i18n="nav.offers" className={activePage === 'offers' ? 'active' : undefined}>Offers</a>
              <a href="/kalkulacka-mzdy-agenturniho-zamestnance" data-i18n="nav.calc" className={activePage === 'calculator' ? 'active' : undefined}>Payroll calculator</a>
              <a href="/socialni-zdravotni-dane-2026" data-i18n="nav.article" className={activePage === 'article' ? 'active' : undefined}>Article</a>
              <a href="/submit-agency" data-i18n="nav.submitAgency" className={activePage === 'submit-agency' ? 'active' : undefined}>Submit Agency</a>
              <a href="/submit-offer" data-i18n="nav.postOffer" className={activePage === 'submit-offer' ? 'active' : undefined}>Post Offer</a>
              <a href="/contact" data-i18n="nav.contact" className={activePage === 'contact' ? 'active' : undefined}>Contact</a>
            </nav>

            <div className="header__right">
              <div className="lang-switcher" aria-label="Language selector">
                <button className="lang-btn active" data-lang="en" aria-label="English">EN</button>
                <button className="lang-btn" data-lang="cs" aria-label="Čeština">CS</button>
                <button className="lang-btn" data-lang="de" aria-label="Deutsch">DE</button>
              </div>
              <a href="/contact" className="btn btn-primary btn-sm" data-i18n="nav.contactCta">Contact Us</a>
              <button className="hamburger" id="burger" aria-label="Open menu" aria-expanded="false">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
        <a href="/" data-i18n="mnav.home">Home</a>
        <a href="/agencies" data-i18n="mnav.agencies">Agencies</a>
        <a href="/offers" data-i18n="mnav.offers">Offers</a>
        <a href="/kalkulacka-mzdy-agenturniho-zamestnance" data-i18n="mnav.calc">Payroll calculator</a>
        <a href="/socialni-zdravotni-dane-2026" data-i18n="mnav.article">Article</a>
        <a href="/submit-agency" data-i18n="mnav.submitAgency">Submit Agency</a>
        <a href="/submit-offer" data-i18n="mnav.postOffer">Post Offer</a>
        <a href="/contact" data-i18n="mnav.contact">Contact</a>
        <div className="lang-select" role="group" aria-label="Website language">
          <span className="lang-select__label" data-i18n="nav.language">Language</span>
          <div className="lang-switcher lang-switcher--mobile">
            <button className="lang-btn active" data-lang="en" aria-label="English">EN</button>
            <button className="lang-btn" data-lang="cs" aria-label="Čeština">CS</button>
            <button className="lang-btn" data-lang="de" aria-label="Deutsch">DE</button>
          </div>
        </div>
        <a href="/contact" className="btn btn-primary btn-lg" data-i18n="mnav.contactCta">Contact Us</a>
      </nav>
    </>
  )
}
