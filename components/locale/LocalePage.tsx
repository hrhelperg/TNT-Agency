import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import LocaleAlternates from './LocaleAlternates'
import { ALL_CONCEPTS, primaryUrl, urlFor, type Locale } from '../../lib/locale/registry'
import { LOCALE_PREFIX, isCandidateLocale } from '../../lib/locale/locales'
import CandidateHeader from './CandidateHeader'
import CandidateFooter from './CandidateFooter'
import type { CandidateLocale, EmployerLocaleLocked } from '../../lib/locale/chrome'
import { CHROME_ARIA, HOME_LABEL } from '../../lib/locale/chrome'
import type { LocaleList, LocalePageContent } from '../../lib/locale/content/types'

const ORIGIN = 'https://talentpartnerid.com'

/**
 * A section's list, rendered as a real list.
 *
 * Server-rendered like everything else on this page: a crawler and a visitor
 * with JavaScript unavailable both receive the items. `ul` versus `ol` follows
 * the source — an ordered list asserts that the order carries meaning, so it is
 * used only where the source says the steps happen in sequence.
 */
function SectionList({ list }: { list: LocaleList }) {
  const items = list.items.map((item) => <li key={item.slice(0, 48)}>{item}</li>)
  return (
    <>
      {list.intro && <p>{list.intro}</p>}
      {list.ordered ? <ol className="locale-list">{items}</ol> : <ul className="locale-list">{items}</ul>}
    </>
  )
}

export interface LocalePageProps {
  /** Registry concept id. Everything else resolves from it. */
  readonly conceptId: string
  readonly locale: Exclude<Locale, 'cs'>
  /**
   * Rendered after the prose. Used by the request-staff concept, whose Czech
   * primary is a form page: an English page describing a form the reader cannot
   * fill in is not an equivalent of it. The form component is the SAME one the
   * Czech page mounts — no second implementation, so field names, validation
   * and submission behaviour cannot drift between locales.
   */
  readonly afterContent?: React.ReactNode
  /**
   * Rendered BEFORE the prose, between the H1 and the first section.
   *
   * Used by the employer-cost calculator, whose substance is the tool: a reader
   * who came to compute something should not have to scroll a methodology
   * article to reach it. The prose still follows in full, because it is what
   * makes the numbers auditable and what a crawler — or a visitor without
   * JavaScript — actually receives.
   *
   * Distinct from `afterContent`, which the request-staff concept uses to place
   * a form after the explanation that introduces it. Same mechanism, opposite
   * reading order, and both mount the SAME component the Czech page mounts.
   */
  readonly beforeContent?: React.ReactNode
  readonly content: LocalePageContent
}

/**
 * Renders a localized page entirely from server-side content.
 *
 * Everything a crawler or a no-JS visitor needs — title, description, H1, body,
 * breadcrumb, CTA, canonical, hreflang — is in the initial HTML. The shared
 * chrome still uses the client dictionary, which is why _document marks the
 * document locale-locked: the URL decides the language, so the chrome resolves
 * to this page's locale instead of the visitor's last switcher choice.
 */
export default function LocalePage({
  conceptId,
  locale,
  content,
  afterContent,
  beforeContent,
}: LocalePageProps) {
  const concept = ALL_CONCEPTS.find((c) => c.id === conceptId)
  if (!concept) throw new Error(`LocalePage: no registry concept "${conceptId}"`)

  const selfUrl = urlFor(concept, locale)
  if (!selfUrl) throw new Error(`LocalePage: concept "${conceptId}" declares no ${locale} url`)

  const ctaConcept = ALL_CONCEPTS.find((c) => c.id === content.cta.targetConceptId)
  // The two lookups above this one throw on an unknown id; this one used to
  // return undefined, which made ctaHref undefined, which made the whole
  // <p class="locale-cta"> render nothing. A one-character typo therefore
  // deleted a page's conversion CTA in silence: no gate reads localized CTAs,
  // and the only layer that noticed did so by timing out at 90s rather than by
  // asserting anything — a routine actionTimeout would have made it pass.
  if (!ctaConcept) {
    throw new Error(`locale CTA references unknown concept "${content.cta.targetConceptId}"`)
  }
  const ctaHref = ctaConcept ? urlFor(ctaConcept, locale) ?? urlFor(ctaConcept, 'cs') : undefined
  // Was `locale === 'en' ? '/en' : '/de'` — a two-locale ternary that would
  // have sent every Brazilian and Spanish reader's breadcrumb to /de.
  const localeHome = LOCALE_PREFIX[locale]

  // Candidate locales get their own chrome. See CandidateHeader for why this is
  // a branch rather than a prop on the employer header.
  const candidate = isCandidateLocale(locale)

  /**
   * "Verified on" in the reader's language.
   *
   * Only the two candidate locales carry freshness metadata today, so only they
   * need the label; a locale added later without one renders the neutral form
   * rather than an English string on a non-English page.
   */
  const verifiedLabel =
    locale === 'pt-BR'
      ? 'Verificado em'
      : locale === 'es'
        ? 'Verificado el'
        : 'Verified'

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <link rel="canonical" href={`${ORIGIN}${selfUrl}`} />
        <LocaleAlternates route={primaryUrl(concept)} />
      </Head>

      {candidate ? (
        <CandidateHeader
          locale={locale as CandidateLocale}
          route={selfUrl}
          activeConceptId={concept.id}
        />
      ) : (
        <Header activePage={undefined} locale={locale as EmployerLocaleLocked} />
      )}

      <main className="section locale-page" lang={locale}>
        <div className="container">
          {selfUrl !== localeHome && (
            <nav className="breadcrumbs" aria-label={CHROME_ARIA[locale].breadcrumb}>
              <a href={localeHome}>{HOME_LABEL[locale]}</a>
              <span aria-hidden="true"> › </span>
              <span aria-current="page">{content.breadcrumb}</span>
            </nav>
          )}

          <h1>{content.h1}</h1>
          <p className="page-hero__sub">{content.intro}</p>

          {beforeContent}

          {content.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              {s.list && <SectionList list={s.list} />}
            </section>
          ))}

          {afterContent}

          {/*
            Verification stamp.

            Rendered in the page, not only held as metadata, because the reader
            deciding whether to act on immigration information is the one who
            needs to know when it was last checked and against what. A date in a
            data structure nobody sees would satisfy the gate and help no one.
          */}
          {content.freshness && (
            <aside className="locale-verified" aria-label={verifiedLabel}>
              <p>
                {verifiedLabel}{' '}
                {/* Lowercase attribute, matching the convention LocaleAlternates
                    uses for hreflang: HTML parses either, tooling that compares
                    literally should see one form. */}
                <time {...{ datetime: content.freshness.lastVerifiedAt }}>
                  {content.freshness.lastVerifiedAt}
                </time>
              </p>
              <ul>
                {content.freshness.officialSources.map((src) => (
                  <li key={src.id}>
                    <a href={src.url} rel="nofollow noopener" target="_blank">
                      {src.name}
                    </a>{' '}
                    — <span>{src.publisher}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {ctaHref && (
            <p className="locale-cta">
              <a className="btn btn-primary" href={ctaHref}>{content.cta.label}</a>
              {content.cta.note ? <span className="locale-cta__note"> {content.cta.note}</span> : null}
            </p>
          )}
        </div>
      </main>

      {candidate ? (
        <CandidateFooter locale={locale as CandidateLocale} />
      ) : (
        <Footer locale={locale as EmployerLocaleLocked} />
      )}
    </>
  )
}
