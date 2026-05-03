import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const articleUrl = 'https://manpower-tnt.agency/socialni-zdravotni-dane-2026'
const modifiedDate = '2026-05-03'
const modifiedTime = '2026-05-03T00:00:00+02:00'

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sociální a zdravotní daně 2026: přehled pro zaměstnance a zaměstnavatele',
  description: 'Praktický přehled sazeb a povinností pro sociální daň 2026, zdravotní pojištění 2026 a odvody zaměstnavatele i zaměstnance v České republice.',
  author: {
    '@type': 'Organization',
    name: 'TNT Agency',
    url: 'https://manpower-tnt.agency',
  },
  publisher: {
    '@type': 'Organization',
    name: 'TNT Agency',
    url: 'https://manpower-tnt.agency',
    logo: {
      '@type': 'ImageObject',
      url: 'https://manpower-tnt.agency/favicon.svg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': articleUrl,
  },
  image: 'https://manpower-tnt.agency/assets/og.jpg',
  datePublished: modifiedDate,
  dateModified: modifiedDate,
  inLanguage: 'cs-CZ',
  url: articleUrl,
}

export default function SocialniZdravotniDane2026() {
  return (
    <>
      <Head>
        <title>Sociální a zdravotní daně 2026: přehled pro zaměstnance a zaměstnavatele | TNT Agency</title>
        <meta name="description" content="Přehled pro sociální daň 2026, zdravotní pojištění 2026, odvody zaměstnavatel a odvody zaměstnanec. Sazby, povinnosti a časté chyby v ČR." />
        <meta name="keywords" content="sociální daň 2026, zdravotní pojištění 2026, odvody zaměstnavatel, odvody zaměstnanec, mzdové odvody 2026" />
        <meta name="robots" content="index, follow" />
        <meta name="last-modified" content={modifiedDate} />
        <link rel="canonical" href={articleUrl} />
        <link rel="alternate" hrefLang="cs" href={articleUrl} />
        <link rel="alternate" hrefLang="x-default" href={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:site_name" content="TNT Agency" />
        <meta property="og:title" content="Sociální a zdravotní daně 2026" />
        <meta property="og:description" content="Přehled sazeb, povinností a častých chyb u sociálního a zdravotního pojištění v roce 2026." />
        <meta property="og:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="article:published_time" content={modifiedTime} />
        <meta property="article:modified_time" content={modifiedTime} />
        <meta property="article:author" content="TNT Agency" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sociální a zdravotní daně 2026" />
        <meta name="twitter:description" content="Praktický přehled sazeb a povinností pro zaměstnance a zaměstnavatele v ČR." />
        <meta name="twitter:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <script key="schema-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Header activePage="article" />

      <section className="article-hero">
        <div className="container">
          <div className="eyebrow eyebrow--light fi">Mzdové odvody 2026</div>
          <h1 className="fi d1">Sociální a zdravotní daně 2026</h1>
          <p className="page-hero__sub fi d2">
            Přehled pro zaměstnance a zaměstnavatele: sazby, povinnosti, termíny a chyby, které mohou zbytečně prodražit mzdy nebo nábor.
          </p>
          <div className="article-meta fi d3">
            <span>TNT Agency</span>
            <span>Aktualizováno 3. května 2026</span>
          </div>
        </div>
      </section>

      <main className="section">
        <article className="container article-content">
          <p>
            Rok 2026 nepřináší u běžných zaměstnanců úplně nový systém odvodů, ale firmy by měly hlídat několik důležitých parametrů. Pro běžné pracovní poměry zůstává sociální pojištění zaměstnance na 7,1 % a běžná sazba zaměstnavatele na 24,8 %. U vybraných rizikových zaměstnání se sazba zaměstnavatele zvyšuje na 27,8 % a u zdravotnických záchranářů nebo podnikových hasičů na 29,8 %. Zdravotní pojištění 2026 se u zaměstnanců počítá celkem 13,5 % z vyměřovacího základu: 4,5 % platí zaměstnanec a 9 % zaměstnavatel.
          </p>
          <p>
            Pro personalisty, účetní i majitele firem je důležité rozlišovat mezi hrubou mzdou, čistou mzdou a celkovou cenou práce. Kandidát obvykle řeší částku na výplatní pásce, zatímco zaměstnavatel musí v rozpočtu počítat i s odvody placenými nad rámec hrubé mzdy. Při plánování náboru v roce 2026 proto nestačí porovnat jen nabízenou mzdu. Praktický výpočet by měl zahrnovat druh pracovního poměru, zdravotní pojišťovnu, případné limity sociálního pojištění a také to, zda pracovní pozice spadá do zvláštní sazby.
          </p>

          <h2>Co jsou sociální a zdravotní daně</h2>
          <p>
            V praxi se často používá výraz <strong>sociální daň 2026</strong>, právně ale jde o pojistné na sociální zabezpečení a příspěvek na státní politiku zaměstnanosti. Z těchto peněz se financuje hlavně důchodové a nemocenské pojištění. Zdravotní pojištění slouží k úhradě zdravotní péče a odvádí se zdravotní pojišťovně zaměstnance. Oba odvody řeší zaměstnavatel při mzdové agendě, i když část nákladů je sražena přímo zaměstnanci z hrubé mzdy.
          </p>

          <h2>Sazby pro rok 2026</h2>
          <p>
            U standardního zaměstnance činí sociální odvod 7,1 % z vyměřovacího základu. Běžné <strong>odvody zaměstnavatel</strong> platí ve výši 24,8 %. U zdravotního pojištění je celková sazba 13,5 %, z toho <strong>odvody zaměstnanec</strong> tvoří 4,5 % a zaměstnavatel doplácí 9 %. Pro vyšší příjmy je důležitý také maximální roční vyměřovací základ pro sociální pojištění, který je pro rok 2026 stanoven na 2 350 416 Kč.
          </p>

          <h2>Povinnosti zaměstnavatele</h2>
          <p>
            Zaměstnavatel musí zaměstnance správně přihlásit, určit jeho zdravotní pojišťovnu, spočítat vyměřovací základ, srazit zaměstnaneckou část a odvést celou částku příslušným institucím. V náboru je proto vhodné počítat s celkovou cenou práce, ne pouze s hrubou mzdou. Pokud řešíte rychlé obsazení pozic nebo vyšší objem náboru, pomůže vám naše stránka pro <a href="/agencies">náborové služby a agentury</a> nebo možnost <a href="/submit-offer">zadat poptávku na pracovníky</a>.
          </p>
          <p>
            Součástí odpovědnosti zaměstnavatele je také archivace mzdových podkladů a včasná komunikace změn. Typicky jde o nástup, ukončení pracovního poměru, dlouhodobou nemoc, neplacené volno nebo změnu pojišťovny. Chyba v těchto údajích může vést k opravám přehledů, doplatkům a zbytečné administrativě.
          </p>

          <h2>Povinnosti zaměstnance</h2>
          <p>
            Zaměstnanec obvykle neodvádí sociální ani zdravotní pojištění samostatně. Zaměstnavatel mu částku srazí ze mzdy a odvede ji za něj. Zaměstnanec by měl kontrolovat výplatní pásku, oznamovat změnu zdravotní pojišťovny a hlídat souběhy zaměstnání, dohod nebo podnikání. Pokud hledáte novou práci, přehled aktuálních možností najdete v sekci <a href="/offers">nabídky a pracovní příležitosti</a>.
          </p>

          <h2>Nejčastější chyby</h2>
          <p>
            Mezi nejčastější chyby patří záměna hrubé mzdy a celkové ceny práce, opožděná registrace zaměstnance, nesprávné zaokrouhlení zdravotního pojištění, špatné určení rizikového zaměstnání nebo zapomenutá změna zdravotní pojišťovny. Firmy také někdy podcení dopad odvodů při nabídce mzdy kandidátovi. U pozic s úzkým trhem práce se vyplatí předem porovnat rozpočet, dostupnost kandidátů a reálnou cenu práce.
          </p>

          <h2>Závěr</h2>
          <p>
            Sociální a zdravotní odvody v roce 2026 zůstávají pro většinu zaměstnanců přehledné, ale vyžadují přesnou mzdovou administrativu. Zaměstnavatelé by měli počítat celkovou cenu práce a hlídat speciální sazby, zaměstnanci zase kontrolovat výplatní pásky a osobní údaje. Při plánování náboru nebo rozšiřování týmu je nejlepší propojit mzdové náklady s realistickou náborovou strategií.
          </p>

          <p className="article-source-note">
            Zdroje: <a href="https://www.mpsv.cz/socialni-pojisteni" target="_blank" rel="noopener noreferrer">MPSV</a>, <a href="https://cssz.gov.cz/web/cz/vyse-a-sazba" target="_blank" rel="noopener noreferrer">ČSSZ</a>, <a href="https://www.vzp.cz/platci/informace/zamestnavatel/splatnost-a-dalsi-zasady-pro-platbu-pojistneho/jakym-zpusobem-se-plati-pojistne-na-zdravotni-pojisteni" target="_blank" rel="noopener noreferrer">VZP</a>.
          </p>
        </article>
      </main>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow">Nábor a mzdy</div>
            <h2>Potřebujete sladit rozpočet a nábor?</h2>
            <p>Pomůžeme vám nastavit nábor tak, aby mzda, odvody a dostupnost kandidátů dávaly ekonomický smysl.</p>
          </div>
          <div style={{ textAlign: 'center' }} className="fi d1">
            <a href="/contact" className="btn btn-primary btn-lg">Domluvit konzultaci</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
