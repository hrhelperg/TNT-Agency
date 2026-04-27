interface HeaderProps {
  activePage?: string
}

export default function Header({ activePage }: HeaderProps) {
  return (
    <>
      <header className="header" id="header">
        <div className="container">
          <div className="header__inner">
            <a href="/" className="logo" aria-label="TNT Agency">
              <span className="logo__mark">TNT</span>
              <span className="logo__name">Agency</span>
            </a>

            <nav className="nav" aria-label="Main navigation">
              <a href="/" className={activePage === 'home' ? 'active' : undefined}>Home</a>
              <a href="/agencies" className={activePage === 'agencies' ? 'active' : undefined}>Agencies</a>
              <a href="/offers" className={activePage === 'offers' ? 'active' : undefined}>Offers</a>
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
