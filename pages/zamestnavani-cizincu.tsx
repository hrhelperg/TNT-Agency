import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PAGE_URL = 'https://manpowertnt.agency/zamestnavani-cizincu'
const SOURCE_URL = 'https://up.gov.cz/zamestnavani-cizincu'
const MODIFIED_DATE = '2026-04-30'
const MODIFIED_TIME = '2026-04-30T00:00:00Z'

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Zaměstnávání cizinců v ČR: pravidla pro zaměstnavatele',
  description:
    'Přehled pravidel pro zaměstnávání cizinců v ČR podle země původu, typu oprávnění a povinností zaměstnavatele.',
  author: {
    '@type': 'Organization',
    name: 'TNT Agency',
    url: 'https://manpowertnt.agency',
  },
  publisher: {
    '@type': 'Organization',
    name: 'TNT Agency',
    url: 'https://manpowertnt.agency',
    logo: {
      '@type': 'ImageObject',
      url: 'https://manpowertnt.agency/favicon.svg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': PAGE_URL,
  },
  datePublished: '2026-03-31',
  dateModified: MODIFIED_DATE,
  inLanguage: 'cs-CZ',
  url: PAGE_URL,
  citation: SOURCE_URL,
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Domů',
      item: 'https://manpowertnt.agency/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Zaměstnávání cizinců',
      item: PAGE_URL,
    },
  ],
}

export default function ZamestnavaniCizincu() {
  return (
    <>
      <Head>
        <title>Zaměstnávání cizinců v ČR: pravidla pro zaměstnavatele</title>
        <meta
          name="description"
          content="Přehled pravidel pro zaměstnávání cizinců v ČR podle země původu, typu oprávnění a povinností zaměstnavatele."
        />
        <meta
          name="keywords"
          content="zaměstnávání cizinců, zaměstnanecká karta, povolení k zaměstnání, modrá karta, ICT karta, Lex Ukrajina, Úřad práce ČR"
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="last-modified" content={MODIFIED_DATE} />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="cs" href={PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="TNT Agency" />
        <meta property="og:title" content="Zaměstnávání cizinců v ČR: pravidla pro zaměstnavatele" />
        <meta
          property="og:description"
          content="Přehled pravidel pro zaměstnávání cizinců v ČR podle země původu, typu oprávnění a povinností zaměstnavatele."
        />
        <meta property="og:image" content="https://manpowertnt.agency/assets/og.jpg" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="article:published_time" content="2026-03-31T00:00:00+02:00" />
        <meta property="article:modified_time" content={MODIFIED_TIME} />
        <meta property="article:author" content="TNT Agency" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zaměstnávání cizinců v ČR: pravidla pro zaměstnavatele" />
        <meta
          name="twitter:description"
          content="Přehled pravidel pro zaměstnávání cizinců v ČR podle země původu, typu oprávnění a povinností zaměstnavatele."
        />
        <meta name="twitter:image" content="https://manpowertnt.agency/assets/og.jpg" />

        <script key="schema-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <script key="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <Header activePage="zamestnavani-cizincu" />

      <section className="legal-article-hero">
        <div className="container">
          <nav className="legal-breadcrumb" aria-label="Drobečková navigace">
            <a href="/">Domů</a>
            <span aria-hidden="true">/</span>
            <span>Zaměstnávání cizinců</span>
          </nav>
          <div className="eyebrow eyebrow--light">Pracovní právo · Informace pro zaměstnavatele</div>
          <h1>Zaměstnávání cizinců v ČR: pravidla pro zaměstnavatele</h1>
          <p>
            Přehled základních pravidel pro zaměstnávání cizinců podle země původu, typu oprávnění a povinností
            zaměstnavatele.
          </p>
          <div className="legal-article-meta">
            <span>Poslední aktualizace: 31. března 2026</span>
            <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
              Zdroj: Úřad práce ČR – oficiální informace o zaměstnávání cizinců
            </a>
          </div>
        </div>
      </section>

      <main className="legal-article">
        <div className="container">
          <div className="legal-article-layout">
            <aside className="legal-article-sidebar" aria-label="Obsah článku">
              <div className="legal-article-sidebar__title">V článku</div>
              <a href="#eu-ehp-svycarsko">EU, EHP a Švýcarsko</a>
              <a href="#volny-vstup">Volný vstup na trh práce</a>
              <a href="#bez-volneho-vstupu">Bez volného vstupu</a>
              <a href="#zamestnanecka-karta">Zaměstnanecká karta</a>
              <a href="#povoleni-k-zamestnani">Povolení k zaměstnání</a>
              <a href="#modra-karta">Modrá karta</a>
              <a href="#ict-karta">ICT karta</a>
              <a href="#lex-ukrajina">Dočasná ochrana</a>
              <a href="#informace-a-nabidky">Informace a nabídky</a>
            </aside>

            <article className="legal-article-body">
              <div className="legal-notice">
                <strong>Upozornění:</strong> Informace mají obecný informační charakter a nenahrazují individuální
                právní poradenství.
              </div>

              <p>
                Zaměstnávání cizinců může zaměstnavatelům pomoci doplnit pracovní sílu tam, kde na českém trhu chybí.
                Povinnosti zaměstnavatele se liší podle země původu pracovníka a podle typu jeho pobytového nebo
                pracovního oprávnění.
              </p>

              <h2 id="eu-ehp-svycarsko">Zaměstnávání občanů EU, EHP a Švýcarska</h2>
              <p>
                Občané členských států EU, Evropského hospodářského prostoru, tedy Norska, Islandu a Lichtenštejnska,
                a Švýcarska mají volný vstup na český trh práce. Stejné pravidlo se vztahuje také na jejich rodinné
                příslušníky. K výkonu práce nepotřebují pracovní povolení.
              </p>

              <h3>Povinnosti zaměstnavatele</h3>
              <ul>
                <li>
                  nahlásit nástup zaměstnance na Úřad práce ČR nejpozději před okamžikem nástupu k výkonu práce,
                  nejdříve 8 dní před předpokládaným nástupem,
                </li>
                <li>nahlásit ukončení pracovního poměru nebo změny evidovaných údajů nejpozději do 8 dní,</li>
                <li>vést evidenci zaměstnaných občanů EU, EHP a Švýcarska.</li>
              </ul>
              <p>
                Podle informací Úřadu práce ČR má od 1. 4. 2026 probíhat ohlašování zaměstnávání cizích státních
                příslušníků pouze prostřednictvím JMHZ.
              </p>

              <h2 id="volny-vstup">Cizinci s volným vstupem na trh práce</h2>
              <p>
                Některé skupiny cizinců ze třetích zemí mohou v České republice pracovat bez pracovního povolení.
                Úřad práce ČR mezi příklady uvádí:
              </p>
              <ul>
                <li>osoby s trvalým pobytem v ČR,</li>
                <li>žadatele s udělenou mezinárodní ochranou, tedy azylem,</li>
                <li>absolventy českých středních a vysokých škol,</li>
                <li>studenty denního studia,</li>
                <li>další vyjmenované skupiny podle §98 zákona o zaměstnanosti.</li>
              </ul>
              <p>I u těchto osob má zaměstnavatel informační a evidenční povinnosti.</p>

              <h2 id="bez-volneho-vstupu">Cizinci bez volného vstupu na trh práce</h2>
              <p>
                Cizinci ze třetích zemí, kteří nespadají do kategorií s volným vstupem na trh práce, mohou pracovat
                pouze s platným pracovním a pobytovým oprávněním. Zaměstnavatel může podle konkrétní situace pracovat
                s níže uvedenými typy oprávnění.
              </p>

              <h3 id="zamestnanecka-karta">Zaměstnanecká karta</h3>
              <ul>
                <li>Spojuje povolení k pobytu i zaměstnání.</li>
                <li>Platnost může být až 2 roky s možností prodloužení.</li>
                <li>Vydává ji Ministerstvo vnitra ČR, Odbor azylové a migrační politiky.</li>
                <li>Před podáním žádosti je nutné nahlásit volné pracovní místo do evidence ÚP ČR.</li>
              </ul>

              <h3 id="povoleni-k-zamestnani">Povolení k zaměstnání</h3>
              <p>
                Povolení k zaměstnání vydává Úřad práce ČR, příslušná krajská pobočka podle místa výkonu práce.
                Typicky se používá například pro:
              </p>
              <ul>
                <li>sezónní práce,</li>
                <li>stáže,</li>
                <li>krátkodobé pracovní poměry.</li>
              </ul>
              <p>
                Cizinec může být zaměstnán pouze tehdy, pokud má současně platné povolení k zaměstnání i pobytové
                oprávnění.
              </p>

              <h3 id="modra-karta">Modrá karta</h3>
              <ul>
                <li>
                  Je určena pro vysoce kvalifikované odborníky a vztahuje se na specializované pozice vyžadující
                  vysokou kvalifikaci.
                </li>
                <li>Jde o pracovní i pobytové oprávnění.</li>
                <li>Platnost může být až 3 roky s možností prodloužení.</li>
                <li>Vydává ji Ministerstvo vnitra ČR, Odbor azylové a migrační politiky.</li>
                <li>Před podáním žádosti je nutné nahlásit Úřadu práce ČR volné pracovní místo.</li>
              </ul>

              <h3 id="ict-karta">ICT karta</h3>
              <p>
                ICT karta, tedy karta vnitropodnikově převedeného zaměstnance, je druh povolení k dlouhodobému
                pobytu. Umožňuje občanům třetích zemí, aby byli ze země svého původu převedeni do České republiky na
                pracovní pozici manažera, specialisty nebo zaměstnaného stážisty.
              </p>
              <p>Vydává ji Ministerstvo vnitra ČR, Odbor azylové a migrační politiky.</p>
              <p>
                Zaměstnavatelé cizinců bez volného vstupu na trh práce musí zároveň plnit informační a evidenční
                povinnost.
              </p>

              <h2 id="lex-ukrajina">Zaměstnávání osob s dočasnou ochranou / Lex Ukrajina</h2>
              <ul>
                <li>Držitelé dočasné ochrany mají volný vstup na trh práce a nepotřebují pracovní povolení.</li>
                <li>Zaměstnavatel nahlašuje jejich nástup, změny nebo ukončení zaměstnání.</li>
              </ul>

              <h2 id="informace-a-nabidky">Informace a nabídky</h2>
              <p>Úřad práce ČR odkazuje zaměstnavatele a uchazeče zejména na tyto informační a nabídkové zdroje:</p>
              <ul>
                <li>volná pracovní místa pro občany EU na portálu EURES,</li>
                <li>volná pracovní místa pro cizince v evidenci MPSV,</li>
                <li>nabídku zájemců o práci na webu MPSV,</li>
                <li>oznamování volných pracovních míst Úřadu práce ČR.</li>
              </ul>

              <div className="legal-source">
                <p>
                  <strong>Zdroj:</strong>{' '}
                  <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer">
                    Úřad práce ČR – oficiální informace o zaměstnávání cizinců
                  </a>
                </p>
                <p>Informace mají obecný informační charakter a nenahrazují individuální právní poradenství.</p>
              </div>

              <div className="legal-related">
                <h2>Praktické další kroky</h2>
                <p>
                  Potřebujete řešit nábor nebo obsazení pracovních pozic? Prohlédněte si služby TNT Agency pro
                  zaměstnavatele nebo nás kontaktujte.
                </p>
                <div className="legal-related__links">
                  <a href="/" className="btn btn-ghost">
                    Domů
                  </a>
                  <a href="/agencies" className="btn btn-primary">
                    Služby a recruitment
                  </a>
                  <a href="/contact" className="btn btn-accent">
                    Kontakt
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .legal-article-hero {
          padding: 150px 0 72px;
          background: linear-gradient(135deg, #0d1e3d 0%, #162c5a 58%, #21406f 100%);
          color: #fff;
        }

        .legal-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          margin-bottom: 24px;
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.72);
        }

        .legal-breadcrumb a {
          color: #fff;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .legal-article-hero h1 {
          max-width: 860px;
          margin-bottom: 20px;
          color: #fff;
          font-size: clamp(2rem, 4vw, 3.6rem);
        }

        .legal-article-hero p {
          max-width: 760px;
          color: rgba(255, 255, 255, 0.82);
          font-size: 1.08rem;
        }

        .legal-article-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px 22px;
          align-items: center;
          margin-top: 28px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.78);
        }

        .legal-article-meta a {
          color: #fff;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .legal-article {
          padding: 72px 0 92px;
          background: #fff;
        }

        .legal-article-layout {
          display: grid;
          grid-template-columns: minmax(180px, 250px) minmax(0, 820px);
          gap: 54px;
          align-items: start;
        }

        .legal-article-sidebar {
          position: sticky;
          top: 104px;
          display: grid;
          gap: 10px;
          padding: 22px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-alt);
        }

        .legal-article-sidebar__title {
          margin-bottom: 4px;
          font-weight: 800;
          color: var(--text);
        }

        .legal-article-sidebar a {
          color: var(--text-2);
          font-size: 0.92rem;
          line-height: 1.45;
        }

        .legal-article-sidebar a:hover {
          color: var(--accent);
        }

        .legal-article-body {
          min-width: 0;
        }

        .legal-article-body p,
        .legal-article-body li {
          color: var(--text-2);
          font-size: 1rem;
          line-height: 1.85;
        }

        .legal-article-body p {
          margin-bottom: 18px;
        }

        .legal-article-body h2 {
          margin: 48px 0 16px;
          padding-top: 22px;
          border-top: 1px solid var(--border);
          font-size: clamp(1.45rem, 2.4vw, 2rem);
        }

        .legal-article-body h3 {
          margin: 30px 0 12px;
          font-size: 1.18rem;
        }

        .legal-article-body ul {
          margin: 0 0 22px 20px;
          list-style: disc;
        }

        .legal-article-body li {
          margin-bottom: 10px;
          padding-left: 4px;
        }

        .legal-article-body a {
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .legal-notice,
        .legal-source,
        .legal-related {
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-alt);
        }

        .legal-notice {
          margin-bottom: 30px;
          padding: 18px 20px;
          color: var(--text-2);
          line-height: 1.7;
        }

        .legal-notice strong {
          color: var(--text);
        }

        .legal-source {
          margin-top: 42px;
          padding: 22px;
        }

        .legal-source p:last-child {
          margin-bottom: 0;
        }

        .legal-related {
          margin-top: 28px;
          padding: 28px;
        }

        .legal-related h2 {
          margin: 0 0 12px;
          padding: 0;
          border: 0;
          font-size: 1.45rem;
        }

        .legal-related__links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
        }

        @media (max-width: 900px) {
          .legal-article-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .legal-article-sidebar {
            position: static;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .legal-article-sidebar__title {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 640px) {
          .legal-article-hero {
            padding: 124px 0 52px;
          }

          .legal-article {
            padding: 52px 0 72px;
          }

          .legal-article-sidebar {
            grid-template-columns: 1fr;
            padding: 18px;
          }

          .legal-related__links,
          .legal-related__links .btn {
            width: 100%;
          }

          .legal-related__links .btn {
            justify-content: center;
            white-space: normal;
          }
        }
      `}</style>
    </>
  )
}
