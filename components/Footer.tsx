import { SITE } from '../lib/content/rules'
import { OPERATOR_EMAIL, OPERATOR_PHONE, OPERATOR_SEAT } from '../lib/content/trust-data'

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
              <svg className="logo__icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="40" height="40" rx="10" fill="#ffffff" />
                <text x="19.5" y="24.5" fontFamily="Inter, Arial, sans-serif" fontSize="19.5" fontWeight="800" fill="#0d1e3d" textAnchor="middle" letterSpacing="-1.3">TP</text>
                <text x="33.5" y="34" fontFamily="Inter, Arial, sans-serif" fontSize="8.5" fontWeight="700" fill="#f05a28" textAnchor="end" letterSpacing="-0.2">id</text>
              </svg>
              <span className="logo__word">TalentPartner<span className="id">ID</span></span>
            </a>
            <p data-i18n="footer.tagline">Váš spolehlivý partner v oblasti zaměstnávání. Spojujeme správné lidi se správnými firmami od prvního dne.</p>
            <address>{OPERATOR_SEAT}</address>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <div className="footer__col">
              <div className="footer__col-title" data-i18n="footer.colServices">Naše služby</div>
              <a href="/agencies" data-i18n="footer.links.permanent">Přímé umístění</a>
              <a href="/agencies" data-i18n="footer.links.executive">Executive Search</a>
              <a href="/agencies" data-i18n="footer.links.temp">Agenturní zaměstnávání</a>
              <a href="/agencies" data-i18n="footer.links.rpo">Personální poradenství a RPO</a>
            </div>
            <div className="footer__col">
              <div className="footer__col-title" data-i18n="footer.colNavigate">Navigace</div>
              <a href="/agencies" data-i18n="footer.navAgencies">Agentury</a>
              <a href="/offers" data-i18n="footer.navOffers">Nabídky</a>
              <a href="/kalkulacka-mzdy-agenturniho-zamestnance" data-i18n="footer.navCalc">Kalkulačka mezd</a>
              <a href="/submit-agency" data-i18n="footer.navSubmitAgency">Registrovat agenturu</a>
              <a href="/submit-offer" data-i18n="footer.navPostOffer">Zadat poptávku</a>
              <a href="/socialni-zdravotni-dane-2026" data-i18n="footer.navTaxes">Sociální a zdravotní odvody 2026</a>
              <a href="/blog/agenturni-pracovnici-vs-interni-zamestnanci.html" data-i18n="footer.navBlog">Blog</a>
            </div>
            <div className="footer__col">
              <div className="footer__col-title" data-i18n="footer.colTrust">Důvěra a transparentnost</div>
              <a href="/o-nas" data-i18n="footer.navAbout">O nás a ověření agentury</a>
              <a href="/redakcni-zasady" data-i18n="footer.navEditorial">Redakční zásady a zdroje</a>
              <a href="/contact" data-i18n="footer.navContact">Kontakt</a>
            </div>
            <div className="footer__col">
              <div className="footer__col-title" data-i18n="footer.colGuides">Průvodci</div>
              <a href="/zamestnavani-cizincu" data-i18n="footer.guide1">Zaměstnávání cizinců</a>
              <a href="/pracovni-povoleni-cr" data-i18n="footer.guide2">Pracovní povolení v ČR</a>
              <a href="/nabor-zahranicnich-pracovniku" data-i18n="footer.guide3">Nábor zahraničních pracovníků</a>
              <a href="/minimalni-mzda-2026" data-i18n="footer.guide4">Minimální mzda 2026</a>
              <a href="/faq-zamestnavani-pracovniku" data-i18n="footer.guide5">Časté dotazy</a>
            </div>
            <div className="footer__col">
              <div className="footer__col-title" data-i18n="footer.colContact">Kontakt</div>
              {/* Social links render only when a confirmed profile URL is added to
                  SITE.social in lib/content/rules.ts. No confirmed TalentPartnerID
                  profiles exist yet, so nothing is shown (no empty links). */}
              {SITE.social.map((url) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                  {socialLabel(url)}
                </a>
              ))}
              <a href={`mailto:${OPERATOR_EMAIL}`}>{OPERATOR_EMAIL}</a>
              <a href={`tel:${OPERATOR_PHONE.replace(/\s/g, '')}`}>{OPERATOR_PHONE}</a>
            </div>
          </nav>

        </div>

        <div className="footer__bottom">
          <span data-i18n="footer.copy">© 2026 TNT agency s.r.o. Všechna práva vyhrazena.</span>
          <div className="footer__legal">
            <a href="/terms.html" data-i18n="footer.terms">Podmínky</a>
            <a href="/privacy-policy" data-i18n="footer.priv">Ochrana dat</a>
            <a href="/cookies.html" data-i18n="footer.cook">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
