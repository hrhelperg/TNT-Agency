import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import LocaleAlternates from './LocaleAlternates'
import { ALL_CONCEPTS, urlFor, type Locale } from '../../lib/locale/registry'
import { CHROME_ARIA, HOME_LABEL } from '../../lib/locale/chrome'
import type { LocalePageContent } from '../../lib/locale/content/types'

const ORIGIN = 'https://talentpartnerid.com'

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
