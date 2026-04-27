export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">

          <div className="footer__brand">
            <a href="/" className="logo logo--light" aria-label="TNT Agency">
              <span className="logo__mark">TNT</span>
              <span className="logo__name">Agency</span>
            </a>
            <p data-i18n="footer.tagline">Your trusted employment and staffing partner. Connecting the right people with the right companies since day one.</p>
            <address>Na Spravedlnosti 1533, Zelené Předměstí, 530 02 Pardubice</address>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <div className="footer__col">
              <div className="footer__col-title">Our Services</div>
              <a href="/agencies">Permanent Placement</a>
              <a href="/agencies">Executive Search</a>
              <a href="/agencies">Temporary Staffing</a>
              <a href="/agencies">HR Consulting &amp; RPO</a>
            </div>
            <div className="footer__col">
              <div className="footer__col-title">Navigate</div>
              <a href="/agencies">Agencies</a>
              <a href="/offers">Offers</a>
              <a href="/submit-agency">Submit Agency</a>
              <a href="/submit-offer">Post Offer</a>
              <a href="/contact">Contact</a>
              <a href="/blog/agenturni-pracovnici-vs-interni-zamestnanci.html">Blog</a>
            </div>
            <div className="footer__col">
              <div className="footer__col-title" data-i18n="footer.colFollow">Follow Us</div>
              <a href="https://www.linkedin.com/company/tntgency" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/tntgency" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/tntgency" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="mailto:jobbohemiacz@gmail.com">jobbohemiacz@gmail.com</a>
              <a href="tel:+420776858284">+420 776 858 284</a>
            </div>
          </nav>

        </div>

        <div className="footer__bottom">
          <span data-i18n="footer.copy">© 2026 TNT Agency s.r.o. All rights reserved.</span>
          <div className="footer__legal">
            <a href="/terms.html" data-i18n="footer.terms">Terms</a>
            <a href="/privacy-policy" data-i18n="footer.priv">Privacy</a>
            <a href="/cookies.html" data-i18n="footer.cook">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
