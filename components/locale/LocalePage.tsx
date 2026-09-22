import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import { localeAlternateTags } from './LocaleAlternates'
import {
  ALL_CONCEPTS,
  LOCALE_OG,
  alternatesFor,
  primaryUrl,
  urlFor,
  type Locale,
} from '../../lib/locale/registry'
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
  // The Czech fallback applies to employer locales only. On a candidate page it
  // would emit a Czech EMPLOYER url, which candidate-chrome.ts forbids in as
  // many words and which CandidateHeader/CandidateFooter already refuse by
  // returning null. It is not firing today — every candidate CTA resolves in
  // its own locale — but one content edit pointing an es CTA at a pt-BR-only
  // concept would have made it fire silently.
  const isCandidate = isCandidateLocale(locale)
  const ctaHref = ctaConcept
    ? urlFor(ctaConcept, locale) ?? (isCandidate ? undefined : urlFor(ctaConcept, 'cs'))
    : undefined
  // Was `locale === 'en' ? '/en' : '/de'` — a two-locale ternary that would
  // have sent every Brazilian and Spanish reader's breadcrumb to /de.
  const localeHome = LOCALE_PREFIX[locale]

  // Candidate locales get their own chrome. See CandidateHeader for why this is
  // a branch rather than a prop on the employer header.
  const candidate = isCandidate

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
      {/*
        Every tag carries a `key`.

        next/head deduplicates by key, and a keyless tag sitting beside a NESTED
        component's tags is not reliably deduplicated — a documented limitation
        of nested components inside Head. It went unnoticed while every cluster
        had at most three members: about-us and contact are the first concepts
        published in five locales, and at that size the canonical and the
        description stopped being deduplicated and appeared TWICE in the live
        DOM. Server HTML was correct in both cases, so only a browser-level
        assertion could see it.
      */}
      <Head>
        <title key="title">{content.title}</title>
        <meta key="description" name="description" content={content.description} />
        <link key="canonical" rel="canonical" href={`${ORIGIN}${selfUrl}`} />
        {/*
          Social metadata.

          Absent from this component until adversarial review counted it: all 43
          candidate pages and all 100 en/de pages shipped with no og:* or
          twitter:* at all, while 177 Czech pages had them. §39 requires a
          localized title, description, OG pair, locale and canonical URL on
          every localized page, and this corpus needs them more than most — a
          pt-BR/es candidate audience shares pages on WhatsApp and Telegram, and
          every one of those shares rendered as a bare link.

          og:image is deliberately omitted rather than pointed at
          /assets/og.svg: Facebook, WhatsApp, LinkedIn and X all reject SVG, so
          declaring it would produce an imageless card AND a broken declaration
          instead of just an imageless card. Recorded as a bounded gap pending a
          1200x630 PNG.
        */}
        <meta key="og:type" property="og:type" content="article" />
        <meta key="og:site_name" property="og:site_name" content="TalentPartnerID" />
        <meta key="og:url" property="og:url" content={`${ORIGIN}${selfUrl}`} />
        <meta key="og:title" property="og:title" content={content.title} />
        <meta key="og:description" property="og:description" content={content.description} />
        <meta key="og:locale" property="og:locale" content={LOCALE_OG[locale]} />
        {alternatesFor(primaryUrl(concept))
          .filter((a) => a.locale !== locale)
          .map((a) => (
            <meta
              key={`og:locale:alternate:${a.locale}`}
              property="og:locale:alternate"
              content={LOCALE_OG[a.locale]}
            />
          ))}
        <meta key="twitter:card" name="twitter:card" content="summary" />
        <meta key="twitter:title" name="twitter:title" content={content.title} />
        <meta key="twitter:description" name="twitter:description" content={content.description} />
        {localeAlternateTags({ route: primaryUrl(concept) })}
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

      <main
        className={`section locale-page${candidate ? ' locale-page--candidate' : ''}`}
        lang={locale}
      >
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
            <aside className="locale-verified">
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
