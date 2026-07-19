import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import ArticleLanguageNotice from './ArticleLanguageNotice'
import {
  generateArticleSchema,
  generateFAQBlock,
  generateFAQSchema,
  generateInternalLinks,
  generateMethodologyNote,
  generateSourceBlock,
} from '../lib/content'
import {
  buildBreadcrumbSchema,
  pageUrl,
  slugifyHeading,
  type SeoPage,
} from '../lib/content/seo-page'
import { SITE } from '../lib/content/rules'

const OG_IMAGE = `${SITE.baseUrl}/assets/og.svg`

// Reusable server-rendered layout for every long-form SEO content page.
//
// All meaningful content (intro, sections, FAQ, sources, methodology, internal
// links) is rendered into the initial HTML — no client-side data fetching, no
// hydration-only text — so every page stays fully indexable. Structured data
// (Article, FAQPage, BreadcrumbList) is emitted in <Head>.

interface SeoArticleProps {
  page: SeoPage
  /** Header highlight key; defaults to a neutral value. */
  activePage?: string
}

// Generator helpers return complete <script> tags; Next's <Head> needs the
// inner JSON only, so strip the wrapper before injecting.
const stripScriptTags = (s: string): string => s.replace(/<\/?script[^>]*>/g, '')

export default function SeoArticle({ page, activePage = 'guides' }: SeoArticleProps) {
  const url = pageUrl(page.slug)
  const sections = page.sections.map((section) => ({
    ...section,
    id: slugifyHeading(section.heading),
  }))
  const showToc = page.showToc ?? sections.length >= 3

  const articleSchema = generateArticleSchema({
    url,
    title: page.title,
    description: page.description,
    datePublished: page.datePublished,
    dateModified: page.dateModified,
  })
  const faqSchema = page.faq?.length ? generateFAQSchema(page.faq) : ''
  const breadcrumbSchema = JSON.stringify(buildBreadcrumbSchema(page))

  const faqHtml = page.faq?.length ? generateFAQBlock(page.faq) : ''
  const methodologyHtml = generateMethodologyNote(page.sources)
  const sourcesHtml = generateSourceBlock(page.sources)
  const internalLinksHtml = generateInternalLinks(
    `/${page.slug}`,
    page.internalLinks,
  )

  return (
    <>
      <Head>
        <title>{`${page.title} | ${SITE.brand}`}</title>
        <meta name="description" content={page.description} />
        <meta name="keywords" content={page.keywords.join(', ')} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="last-modified" content={page.dateModified} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="cs" href={url} />
        <link rel="alternate" hrefLang="x-default" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={SITE.brand} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="article:published_time" content={`${page.datePublished}T00:00:00+02:00`} />
        <meta property="article:modified_time" content={`${page.dateModified}T00:00:00Z`} />
        <meta property="article:author" content={SITE.brand} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.description} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script
          key="schema-article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stripScriptTags(articleSchema) }}
        />
        <script
          key="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
        />
        {faqSchema ? (
          <script
            key="schema-faq"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: stripScriptTags(faqSchema) }}
          />
        ) : null}
      </Head>

      <Header activePage={activePage} />

      <section className="seo-hero">
        <div className="container">
          <nav className="seo-breadcrumb" aria-label="Drobečková navigace">
            <a href="/">Domů</a>
            <span aria-hidden="true">/</span>
            <span>{page.breadcrumbLabel}</span>
          </nav>
          <div className="eyebrow eyebrow--light">{page.eyebrow}</div>
          <h1>{page.title}</h1>
          <p className="seo-hero__sub">{page.heroSubtitle}</p>
          <div className="seo-article-meta">
            <span>{SITE.brand}</span>
            <span>Aktualizováno {page.dateModified}</span>
            <span>Obecné informace, nejedná se o právní poradenství</span>
          </div>
        </div>
      </section>

      <main className="seo-article">
        <div className="container">
          <div className={`seo-layout${showToc ? '' : ' seo-layout--full'}`}>
            {showToc ? (
              <aside className="seo-sidebar" aria-label="Obsah stránky">
                <div className="seo-sidebar__title">Na této stránce</div>
                {sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`}>
                    {section.heading}
                  </a>
                ))}
                {page.faq?.length ? <a href="#faq">Časté dotazy</a> : null}
              </aside>
            ) : null}

            <article className="seo-body" lang="cs">
              <ArticleLanguageNotice />
              <p className="seo-intro">{page.intro}</p>

              {sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              {faqHtml ? (
                <div id="faq" dangerouslySetInnerHTML={{ __html: faqHtml }} />
              ) : null}
              <div dangerouslySetInnerHTML={{ __html: methodologyHtml }} />
              <div dangerouslySetInnerHTML={{ __html: sourcesHtml }} />
              <div dangerouslySetInnerHTML={{ __html: internalLinksHtml }} />
            </article>
          </div>
        </div>
      </main>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            {page.cta.eyebrow ? <div className="eyebrow">{page.cta.eyebrow}</div> : null}
            <h2>{page.cta.title}</h2>
            <p>{page.cta.text}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href={page.cta.href} className="btn btn-primary btn-lg">
              {page.cta.buttonLabel}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
