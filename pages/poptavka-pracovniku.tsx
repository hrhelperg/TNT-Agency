import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EmployerRequestForm from '../components/EmployerRequestForm'
import { useLang } from '../lib/i18n/react'
import { REQUEST_COPY, OPERATOR, OPERATOR_EMAIL } from '../lib/employer-request/copy'
import { SITE } from '../lib/content/rules'

// Employer staffing-request page (Phase C3/C7).
//
// One canonical URL, no localized routes and therefore no hreflang. Czech is
// the authoritative language for <Head> and structured data; the visible body
// localizes client-side through the shared language bridge, and at SSR it
// renders Czech — so the emitted FAQ schema always matches the served markup.

const SLUG = 'poptavka-pracovniku'
const URL = `${SITE.baseUrl}/${SLUG}`
const OG_IMAGE = `${SITE.baseUrl}/assets/og.svg`

// Schema is built from the Czech copy — the same content the page renders on
// the server. No Review/AggregateRating/JobPosting claims are made.
const csCopy = REQUEST_COPY.cs

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Agenturní zaměstnávání a nábor pracovníků',
  serviceType: 'Personální agentura – dočasné přidělení a nábor',
  areaServed: { '@type': 'Country', name: 'Česká republika' },
  provider: {
    '@type': 'Organization',
    name: OPERATOR,
    email: OPERATOR_EMAIL,
    url: `${SITE.baseUrl}/`,
  },
  audience: { '@type': 'BusinessAudience', audienceType: 'Zaměstnavatelé' },
  url: URL,
  description: csCopy.pageDescription,
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: csCopy.pageTitle,
  description: csCopy.pageDescription,
  url: URL,
  inLanguage: 'cs',
  isPartOf: { '@type': 'WebSite', name: SITE.brand, url: `${SITE.baseUrl}/` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: csCopy.faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Domů', item: `${SITE.baseUrl}/` },
    { '@type': 'ListItem', position: 2, name: 'Pro zaměstnavatele', item: `${SITE.baseUrl}/pro-zamestnavatele` },
    { '@type': 'ListItem', position: 3, name: 'Poptávka pracovníků', item: URL },
  ],
}

const ld = (obj: unknown) => JSON.stringify(obj)

export default function PoptavkaPracovnikuPage() {
  const lang = useLang()
  const copy = REQUEST_COPY[lang]

  return (
    <>
      <Head>
        <title>{`${csCopy.pageTitle} | ${SITE.brand}`}</title>
        <meta name="description" content={csCopy.pageDescription} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href={URL} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:site_name" content={SITE.brand} />
        <meta property="og:title" content={csCopy.pageTitle} />
        <meta property="og:description" content={csCopy.pageDescription} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:locale" content="cs_CZ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={csCopy.pageTitle} />
        <meta name="twitter:description" content={csCopy.pageDescription} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script key="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(serviceSchema) }} />
        <script key="schema-webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(webPageSchema) }} />
        <script key="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(faqSchema) }} />
        <script key="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld(breadcrumbSchema) }} />
      </Head>

      <Header activePage="poptavka-pracovniku" />

      <section className="seo-hero">
        <div className="container">
          <nav className="seo-breadcrumb" aria-label="Drobečková navigace">
            <a href="/">Domů</a>
            <span aria-hidden="true">/</span>
            <a href="/pro-zamestnavatele">Pro zaměstnavatele</a>
            <span aria-hidden="true">/</span>
            <span>{copy.h1}</span>
          </nav>
          <div className="eyebrow eyebrow--light">{copy.eyebrow}</div>
          <h1>{copy.h1}</h1>
          <p className="seo-hero__sub">{copy.lead}</p>
        </div>
      </section>

      <main className="section">
        <div className="container">
          <div className="erf-layout">
            <div className="erf-layout__main">
              <EmployerRequestForm />
            </div>

            <aside className="erf-layout__aside" aria-label={copy.whatWeNeedTitle}>
              <div className="erf-card">
                <h2>{copy.whatWeNeedTitle}</h2>
                <ul>
                  {copy.whatWeNeed.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="erf-card">
                <h2>{copy.whatHappensTitle}</h2>
                <ol>
                  {copy.whatHappens.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
              <div className="erf-card erf-card--muted">
                <h2>{copy.faqTitle}</h2>
                <dl className="erf-faq">
                  {copy.faq.map((item) => (
                    <div key={item.q}>
                      <dt>{item.q}</dt>
                      <dd>{item.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
