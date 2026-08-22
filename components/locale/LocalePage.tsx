import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import LocaleAlternates from './LocaleAlternates'
import { ALL_CONCEPTS, urlFor, type Locale } from '../../lib/locale/registry'
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
export default function LocalePage({ conceptId, locale, content, afterContent }: LocalePageProps) {
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
  const localeHome = locale === 'en' ? '/en' : '/de'

  return (
    <>
      <Head>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <link rel="canonical" href={`${ORIGIN}${selfUrl}`} />
        <LocaleAlternates route={concept.csPrimary} />
      </Head>

      <Header activePage={undefined} locale={locale} />

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

          {ctaHref && (
            <p className="locale-cta">
              <a className="btn btn-primary" href={ctaHref}>{content.cta.label}</a>
              {content.cta.note ? <span className="locale-cta__note"> {content.cta.note}</span> : null}
            </p>
          )}
        </div>
      </main>

      <Footer locale={locale} />
    </>
  )
}
