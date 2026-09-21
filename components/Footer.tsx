import { SITE } from '../lib/content/rules'
import { LOCALE_PREFIX, LOCALE_HREFLANG } from '../lib/locale/locales'
import { DISCOVERY_LABEL, DISCOVERY_TARGETS } from '../lib/locale/candidate-chrome'
import { OPERATOR_EMAIL, OPERATOR_PHONE, OPERATOR_SEAT } from '../lib/content/trust-data'
import {
  CHROME_ARIA,
  CHROME_FOOTER,
  footerTarget,
  resolveNavHref,
  type FooterKey,
  type EmployerLocaleLocked,
} from '../lib/locale/chrome'

interface FooterProps {
  /**
   * Set only by locale-locked pages. Same contract as Header: with a locale the
   * labels are rendered server-side in that language and the `data-i18n` hooks
   * are dropped, so the footer of an /en or /de page is correct before any
   * script runs. Without it the Czech markup is emitted exactly as before.
   */
  /**
   * Employer locales only.
   *
   * Narrowed from LocaleLocked when the candidate locales arrived. tsconfig sets
   * "strict": false, so CHROME_NAV['pt-BR'] would NOT have been a type error —
   * it would have evaluated to undefined and rendered a header with no labels,
   * with a green typecheck. Assignability of a prop IS checked without strict,
   * so narrowing here turns that silent runtime failure into a build failure.
   * Candidate locales render CandidateHeader/CandidateFooter instead.
   */
  locale?: EmployerLocaleLocked
}

/** Human label for a social profile URL (e.g. "linkedin.com/company/x" → "LinkedIn"). */
function socialLabel(url: string): string {
  const host = url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]
  const name = host.split('.')[0]
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export default function Footer({ locale }: FooterProps = {}) {
  const t = CHROME_FOOTER[locale ?? 'cs']

  /** A footer link, resolved to its localized equivalent where one exists. */
  const link = (key: FooterKey) => {
    const { href, hreflang } = resolveNavHref(footerTarget(key), locale ?? 'cs')
    return (
      <a
        key={key}
        href={href}
        data-i18n={locale ? undefined : `footer.${key}`}
        {...(hreflang ? { hreflang } : {})}
      >
        {t[key]}
      </a>
    )
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">

          <div className="footer__brand">
            <a href={locale ? LOCALE_PREFIX[locale] : '/'} className="logo logo--light" aria-label="TalentPartnerID">
              <svg className="logo__icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="40" height="40" rx="10" fill="#ffffff" />
                <text x="19.5" y="24.5" fontFamily="Inter, Arial, sans-serif" fontSize="19.5" fontWeight="800" fill="#0d1e3d" textAnchor="middle" letterSpacing="-1.3">TP</text>
                <text x="33.5" y="34" fontFamily="Inter, Arial, sans-serif" fontSize="8.5" fontWeight="700" fill="#f05a28" textAnchor="end" letterSpacing="-0.2">id</text>
              </svg>
              <span className="logo__word">TalentPartner<span className="id">ID</span></span>
            </a>
            <p data-i18n={locale ? undefined : 'footer.tagline'}>{t['tagline']}</p>
            <address>{OPERATOR_SEAT}</address>
          </div>

          <nav className="footer__nav" aria-label={CHROME_ARIA[locale ?? 'cs'].footerNav}>
            <div className="footer__col">
              {/* Each service link resolves to the page that actually describes
                  that service. All four previously pointed at /agencies, which
                  made them duplicate anchors and a dead end — and one of them
                  advertised RPO delivery the site cannot evidence. */}
              <div className="footer__col-title" data-i18n={locale ? undefined : 'footer.colServices'}>{t['colServices']}</div>
              {link('links.permanent')}
              {link('links.specialist')}
              {link('links.temp')}
              {link('links.employers')}
            </div>
            <div className="footer__col">
              <div className="footer__col-title" data-i18n={locale ? undefined : 'footer.colNavigate'}>{t['colNavigate']}</div>
              {link('navAgencies')}
              {link('navOffers')}
              {link('navCalc')}
              {link('navCostDe')}
              {link('navCostCz')}
              {link('navSubmitAgency')}
              {link('navPostOffer')}
              {link('navTaxes')}
              {link('navBlog')}
            </div>
            <div className="footer__col">
              <div className="footer__col-title" data-i18n={locale ? undefined : 'footer.colTrust'}>{t['colTrust']}</div>
              {link('navAbout')}
              {link('navEditorial')}
              {link('navMedia')}
              {link('navContact')}
            </div>
            <div className="footer__col">
              <div className="footer__col-title" data-i18n={locale ? undefined : 'footer.colGuides'}>{t['colGuides']}</div>
              {link('guide1')}
              {link('guide2')}
              {link('guide3')}
              {link('guide4')}
              {link('guide5')}
            </div>
            <div className="footer__col">
              <div className="footer__col-title" data-i18n={locale ? undefined : 'footer.colContact'}>{t['colContact']}</div>
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

          {/*
            Discovery entry into the candidate layer.
            
            A NAVIGATIONAL link, deliberately not an hreflang alternate and
            deliberately not a CHROME_FOOTER key. The Czech employer homepage and
            /pt-br are not translations of each other — one sells staffing to
            Czech firms, the other explains lawful work to Brazilian candidates —
            so a cluster would tell a search engine something false, and the
            language switcher must keep offering only real equivalents. It is
            also kept out of CHROME_FOOTER because chrome.test.ts asserts that
            map mirrors T[lang].footer in public/script.js, and a key with no
            counterpart there would break a mirror that is doing real work.
            
            Labelled as a different audience, not as a translation, so nobody
            reads "Português" here as "this page in Portuguese".
          */}
          <p className="footer__discovery">
            <span className="footer__discovery-label">{DISCOVERY_LABEL[locale ?? 'cs']}</span>{' '}
            {DISCOVERY_TARGETS.map((target, i) => (
              <span key={target.locale}>
                {i > 0 ? ' · ' : ''}
                <a href={LOCALE_PREFIX[target.locale]} hrefLang={LOCALE_HREFLANG[target.locale]}>
                  {target.label}
                </a>
              </span>
            ))}
          </p>

        </div>

        <div className="footer__bottom">
          <span data-i18n={locale ? undefined : 'footer.copy'}>{t['copy']}</span>
          <div className="footer__legal">
            {link('terms')}
            {link('priv')}
            {link('cook')}
          </div>
        </div>
      </div>
    </footer>
  )
}
