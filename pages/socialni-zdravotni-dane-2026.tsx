import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  ARTICLE_SOCIALNI_ZDRAVOTNI_DANE_2026 as article,
  generateArticleSchema,
  generateFAQBlock,
  generateFAQSchema,
  generateInternalLinks,
  generateMethodologyNote,
  generateSourceBlock,
} from '../lib/content'

const PAGE_URL = 'https://manpower-tnt.agency/socialni-zdravotni-dane-2026'
const PAGE_PATH = '/socialni-zdravotni-dane-2026'

const stripScriptTags = (s: string): string =>
  s.replace(/<\/?script[^>]*>/g, '')

const articleSchemaScript = generateArticleSchema({
  url: PAGE_URL,
  title: article.title,
  description: article.description,
  datePublished: article.datePublished,
  dateModified: article.dateModified,
})

const faqSchemaScript = article.faq?.length
  ? generateFAQSchema(article.faq)
  : ''

const faqHtml = article.faq?.length ? generateFAQBlock(article.faq) : ''
const sourcesHtml = generateSourceBlock(article.sources)
const methodologyHtml = generateMethodologyNote(article.sources)
const internalLinksHtml = generateInternalLinks(PAGE_PATH, article.internalLinks)

export default function SocialniZdravotniDane2026() {
  return (
    <>
      <Head>
        <title>{`${article.title} | TNT Agency`}</title>
        <meta name="description" content={article.description} />
        <meta name="keywords" content={article.keywords.join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta name="last-modified" content={article.dateModified} />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="cs" href={PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="TNT Agency" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="article:published_time" content={`${article.datePublished}T00:00:00+02:00`} />
        <meta property="article:modified_time" content={`${article.dateModified}T00:00:00Z`} />
        <meta property="article:author" content="TNT Agency" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content="https://manpower-tnt.agency/assets/og.jpg" />

        <script
          key="schema-article"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stripScriptTags(articleSchemaScript) }}
        />
        {faqSchemaScript ? (
          <script
            key="schema-faq"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: stripScriptTags(faqSchemaScript) }}
          />
        ) : null}
      </Head>

      <Header activePage="article" />

      <section className="article-hero">
        <div className="container">
          <div className="eyebrow">Pracovní právo · Odvody 2026</div>
          <h1>{article.title}</h1>
          <p className="page-hero__sub">
            Praktický přehled povinných odvodů – sociálního pojištění a zdravotního pojištění – pro
            zaměstnance a zaměstnavatele. Bez vymyšlených sazeb: konkrétní hodnoty je nutné ověřit
            u oficiálních institucí.
          </p>
          <div className="article-meta">
            <span>TNT Agency</span>
            <span>Aktualizováno {article.dateModified}</span>
            <span>Obecné informace, nejedná se o právní poradenství</span>
          </div>
        </div>
      </section>

      <main className="section">
        <article className="container article-content">
          <p>{article.intro}</p>

          {article.sections.map((section) => (
            <section key={section.heading}>
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

          <p className="article-data-note">
            Tato stránka záměrně neuvádí konkrétní procentní sazby ani limity pro rok 2026.
            Pravidla se mohou v průběhu roku měnit – aktuální hodnoty ověřte přímo u České správy
            sociálního zabezpečení (ČSSZ), finanční správy a u příslušné zdravotní pojišťovny.
          </p>

          {faqHtml ? <div dangerouslySetInnerHTML={{ __html: faqHtml }} /> : null}
          <div dangerouslySetInnerHTML={{ __html: methodologyHtml }} />
          <div dangerouslySetInnerHTML={{ __html: sourcesHtml }} />
          <div dangerouslySetInnerHTML={{ __html: internalLinksHtml }} />
        </article>
      </main>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Nábor a mzdy</div>
            <h2>Potřebujete sladit rozpočet a nábor?</h2>
            <p>
              Pomůžeme vám nastavit nábor tak, aby mzda, odvody a dostupnost kandidátů dávaly
              ekonomický smysl.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="/contact" className="btn btn-primary btn-lg">
              Domluvit konzultaci
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
