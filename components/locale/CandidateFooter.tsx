import { ALL_CONCEPTS, urlFor } from '../../lib/locale/registry'
import { LOCALE_PREFIX } from '../../lib/locale/locales'
import { OPERATOR_EMAIL, OPERATOR_LEGAL_NAME } from '../../lib/content/trust-data'
import { CHROME_ARIA, type CandidateLocale } from '../../lib/locale/chrome'
import {
  CANDIDATE_FOOTER,
  CANDIDATE_FOOTER_COLUMNS,
  CANDIDATE_FOOTER_TARGETS,
  DISCOVERY_LABEL,
  EMPLOYER_SITE_HREF,
} from '../../lib/locale/candidate-chrome'

/**
 * Footer for the candidate locales.
 *
 * Carries three things the employer footer has no place for: the official-
 * information disclaimer required by §20 and §37, the candidate data notice,
 * and the reciprocal discovery link back to the employer site.
 *
 * The disclaimer is not boilerplate. People considering moving countries are
 * the readers most likely to mistake a recruitment agency for an arm of the
 * state, and the cost of that mistake falls entirely on them — so the footer
 * says plainly, on every page, that TalentPartnerID issues nothing and decides
 * nothing.
 *
 * Only verified operator facts appear: the legal name and the contact address.
 * IČO and the MPSV agency-permit number remain gated as unverified in
 * trust-data.ts and are therefore not asserted here.
 */
export default function CandidateFooter({ locale }: { locale: CandidateLocale }) {
  const t = CANDIDATE_FOOTER[locale]
  const aria = CHROME_ARIA[locale]

  const href = (key: string): string | null => {
    const target = CANDIDATE_FOOTER_TARGETS.find((x) => x.key === key)
    if (!target) return null
    const concept = ALL_CONCEPTS.find((c) => c.id === target.conceptId)
    if (!concept || !concept.published.includes(locale)) return null
    return urlFor(concept, locale) ?? null
  }

  const link = (key: keyof typeof t) => {
    // A locale may legitimately have no label for a key: es has no
    // `linkConsular`, because the Brazil consular page is pt-BR only by §32.
    const label = t[key]
    if (!label) return null
    const url = href(key as string)
    if (!url) return null
    return (
      <li key={key as string}>
        <a href={url}>{label}</a>
      </li>
    )
  }

  return (
    <footer className="footer" data-candidate-chrome="true">
      <div className="container">
        <div className="footer__top">
          <a href={LOCALE_PREFIX[locale]} className="logo logo--light" aria-label="TalentPartnerID">
            TalentPartnerID
          </a>
          <p>{t.tagline}</p>
        </div>

        <nav className="footer__nav" aria-label={aria.footerNav}>
          {CANDIDATE_FOOTER_COLUMNS.map((column) => (
            <div className="footer__col" key={column.title}>
              <div className="footer__col-title">{t[column.title]}</div>
              <ul>{column.keys.map((key) => link(key))}</ul>
            </div>
          ))}
        </nav>

        {/*
          Official-information disclaimer. Rendered on every candidate page
          rather than only on the legal ones: the reader who most needs it is
          the one who arrived on a job page from a search engine and has not
          visited anything else.
        */}
        <section className="footer__notice" aria-labelledby="candidate-official-notice">
          <h2 className="footer__notice-title" id="candidate-official-notice">
            {t.officialNoticeTitle}
          </h2>
          <p>{t.officialNotice}</p>
        </section>

        <div className="footer__bottom">
          <span>{t.copy}</span>
          <span className="footer__operator">
            {OPERATOR_LEGAL_NAME} · <a href={`mailto:${OPERATOR_EMAIL}`}>{OPERATOR_EMAIL}</a>
          </span>
          {/*
            The legal row.

            The candidate data notice comes FIRST and is the only item here in
            the reader's own language — it is also the document that actually
            governs what happens to their application. Terms, Privacy and
            Cookies exist as static documents in cs/en/de only, so they are
            linked in English and SAY SO with hreflang="en". Serving the Czech
            versions silently would be worse, and claiming the English ones are
            Portuguese would be worse still.
          */}
          <ul className="footer__legal">
            {link('dataNotice')}
            <li>
              <a href="/privacy-policy" {...{ hreflang: 'en' }}>
                {t.priv} <span lang="en">(EN)</span>
              </a>
            </li>
            <li>
              <a href="/terms.html" {...{ hreflang: 'en' }}>
                {t.terms} <span lang="en">(EN)</span>
              </a>
            </li>
            <li>
              <a href="/cookies.html" {...{ hreflang: 'en' }}>
                {t.cook} <span lang="en">(EN)</span>
              </a>
            </li>
          </ul>
          {/*
            Discovery, the other direction. A plain navigational link: the
            employer site is not a translation of this page, and nothing here
            reaches alternatesFor().
          */}
          <p className="footer__discovery">
            <span className="footer__discovery-label">{DISCOVERY_LABEL[locale]}</span>{' '}
            <a href={EMPLOYER_SITE_HREF} {...{ hreflang: 'en' }}>
              {t.forEmployers}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
