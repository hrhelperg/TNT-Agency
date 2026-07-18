import { SITE } from '../lib/content/rules'

/** Human label for a social profile URL (e.g. "linkedin.com/company/x" → "LinkedIn"). */
function socialLabel(url: string): string {
  const host = url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]
  const name = host.split('.')[0]
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">

          <div className="footer__brand">
            <a href="/" className="logo logo--light" aria-label="TalentPartnerID">
              <span className="logo__mark">Talent</span>
              <span className="logo__name">PartnerID</span>
            </a>
            <p data-i18n="footer.tagline">Partner pro nábor, agenturní zaměstnávání a řízení nákladů na pracovní sílu.</p>
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
              <a href="/socialni-zdravotni-dane-2026">Sociální a zdravotní daně 2026</a>
              <a href="/blog/agenturni-pracovnici-vs-interni-zamestnanci.html">Blog</a>
            </div>
            <div className="footer__col">
              <div className="footer__col-title">Průvodci</div>
              <a href="/zamestnavani-cizincu">Zaměstnávání cizinců</a>
              <a href="/pracovni-povoleni-cr">Pracovní povolení v ČR</a>
              <a href="/nabor-zahranicnich-pracovniku">Nábor zahraničních pracovníků</a>
              <a href="/minimalni-mzda-2026">Minimální mzda 2026</a>
              <a href="/faq-zamestnavani-pracovniku">Časté dotazy</a>
            </div>
            <div className="footer__col">
              <div className="footer__col-title" data-i18n="footer.colFollow">Kontakt</div>
              {/* Social links render only when a confirmed profile URL is added to
                  SITE.social in lib/content/rules.ts. No confirmed TalentPartnerID
                  profiles exist yet, so nothing is shown (no empty links). */}
              {SITE.social.map((url) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                  {socialLabel(url)}
                </a>
              ))}
              <a href="mailto:jobbohemiacz@gmail.com">jobbohemiacz@gmail.com</a>
              <a href="tel:+420776858284">+420 776 858 284</a>
            </div>
          </nav>

        </div>

        <div className="footer__bottom">
          <span data-i18n="footer.copy">© 2026 TalentPartnerID · Provozovatel: TNT agency s.r.o.</span>
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
