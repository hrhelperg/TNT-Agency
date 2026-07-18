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
                <rect width="40" height="40" rx="9.5" fill="#0d1e3d" />
                <text x="20" y="20.5" fontFamily="Inter, Arial, sans-serif" fontSize="15" fontWeight="800" fill="#ffffff" textAnchor="middle" letterSpacing="-0.5">TP</text>
                <text x="20" y="31.5" fontFamily="Inter, Arial, sans-serif" fontSize="7.5" fontWeight="700" fill="#f05a28" textAnchor="middle" letterSpacing="1.5">id</text>
              </svg>
              <span className="logo__word">TalentPartner<span className="id">ID</span></span>
            </a>

            <nav className="nav" aria-label="Main navigation">
              <a href="/" className={activePage === 'home' ? 'active' : undefined}>Home</a>
              <a href="/agencies" className={activePage === 'agencies' ? 'active' : undefined}>Agencies</a>
              <a href="/offers" className={activePage === 'offers' ? 'active' : undefined}>Offers</a>
              <a href="/socialni-zdravotni-dane-2026" className={activePage === 'article' ? 'active' : undefined}>Article</a>
              <a href="/submit-agency" className={activePage === 'submit-agency' ? 'active' : undefined}>Submit Agency</a>
              <a href="/submit-offer" className={activePage === 'submit-offer' ? 'active' : undefined}>Post Offer</a>
              <a href="/contact" className={activePage === 'contact' ? 'active' : undefined}>Contact</a>
            </nav>

            <div className="header__right">
              <div className="lang-switcher" aria-label="Language selector">
                <button className="lang-btn active" data-lang="en" aria-label="English">EN</button>
                <button className="lang-btn" data-lang="cs" aria-label="Čeština">CS</button>
                <button className="lang-btn" data-lang="de" aria-label="Deutsch">DE</button>
              </div>
              <a href="/contact" className="btn btn-primary btn-sm">Contact Us</a>
              <button className="hamburger" id="burger" aria-label="Open menu" aria-expanded="false">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
        <a href="/">Home</a>
        <a href="/agencies">Agencies</a>
        <a href="/offers">Offers</a>
        <a href="/socialni-zdravotni-dane-2026">Article</a>
        <a href="/submit-agency">Submit Agency</a>
        <a href="/submit-offer">Post Offer</a>
        <a href="/contact">Contact</a>
        <div className="lang-switcher lang-switcher--mobile" aria-label="Language selector">
          <button className="lang-btn" data-lang="en">EN</button>
          <button className="lang-btn" data-lang="cs">CS</button>
          <button className="lang-btn" data-lang="de">DE</button>
        </div>
        <a href="/contact" className="btn btn-primary">Contact Us</a>
      </nav>
    </>
  )
}
