import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { TRUST_DATA, OFFICIAL_SOURCES } from '../lib/content/trust-data'

// Editorial-standards / methodology page (Batch C — Trust / E-E-A-T).
//
// This page introduces NO new claim about the world. Every statement restates
// editorial practice already published verbatim elsewhere on the site: the
// o-nas "Jak ověřujeme obsah my" section, the per-article "Metodika"/"Zdroje"
// blocks, and the seo-editorial-note. It asserts NO licence/permit number, NO
// rating/review, NO certification or "state-approved" wording. Authorship is
// organisation-level ("redakce TalentPartnerID") — no fabricated individual
// authors or credentials. Consumed by validate-eeat.js and referenced from the
// site-wide Organization node (publishingPrinciples) in pages/_document.tsx.

const URL = 'https://talentpartnerid.com/redakcni-zasady'
const REVIEWED = '2026-07-29'

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Redakční zásady a zdroje',
  description:
    'Jak na TalentPartnerID tvoříme a ověřujeme obsah: kdo obsah zpracovává, z jakých oficiálních zdrojů čerpáme a co zásadně netvrdíme.',
  url: URL,
  inLanguage: 'cs-CZ',
  dateModified: REVIEWED,
  isPartOf: { '@type': 'WebSite', name: 'TalentPartnerID', url: 'https://talentpartnerid.com' },
  publisher: {
    '@type': 'Organization',
    name: 'TalentPartnerID',
    legalName: TRUST_DATA.legalName.value,
    url: 'https://talentpartnerid.com',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://talentpartnerid.com/' },
    { '@type': 'ListItem', position: 2, name: 'Redakční zásady a zdroje', item: URL },
  ],
}

export default function RedakcniZasady() {
  return (
    <>
      <Head>
        <title>Redakční zásady a zdroje | TalentPartnerID</title>
        <meta
          name="description"
          content="Jak tvoříme a ověřujeme obsah na TalentPartnerID: redakční zpracování, oficiální zdroje (ČSÚ, MPSV, Úřad práce ČR, ČSSZ, MV ČR), zásada neuvádět vymyšlené údaje a co zásadně netvrdíme."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content="Redakční zásady a zdroje | TalentPartnerID" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <Header />

      <section className="page-hero" id="top">
        <div className="container">
          <nav className="seo-breadcrumb" aria-label="Drobečková navigace">
            <a href="/">Domů</a>
            <span aria-hidden="true">/</span>
            <span>Redakční zásady a zdroje</span>
          </nav>
          <div className="eyebrow eyebrow--light fi">Důvěra a transparentnost</div>
          <h1 className="fi d1">Redakční zásady a zdroje</h1>
          <p className="page-hero__sub fi d2">
            Jak na TalentPartnerID tvoříme a ověřujeme obsah, z jakých oficiálních zdrojů čerpáme
            a co zásadně netvrdíme. Aktualizováno {REVIEWED}.
          </p>
        </div>
        <div className="page-hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="legal-content" lang="cs">

            <h2>Kdo obsah zpracovává</h2>
            <p>
              Informativní obsah na tomto webu zpracovává redakce TalentPartnerID. Web provozuje
              společnost <strong>{TRUST_DATA.legalName.value}</strong>. Autorství uvádíme na úrovni
              redakce, nikoli fiktivních jmen — u obsahu neuvádíme vymyšlené autory ani nepravdivé
              odborné tituly či kvalifikace. Jde o obecné informace, nikoli o individuální právní
              poradenství.
            </p>

            <h2>Z jakých zdrojů čerpáme</h2>
            <p>
              Obsah stavíme na oficiálních a veřejně ověřitelných zdrojích. Konkrétní čísla, sazby a
              lhůty odkazujeme přímo do těchto zdrojů, protože se v čase mění:
            </p>
            <ul>
              <li>právní předpisy ze Sbírky zákonů ČR (zejména zákoník práce, zákon o zaměstnanosti, zákon o pobytu cizinců a předpisy o pojistném a BOZP),</li>
              <li>Český statistický úřad (ČSÚ) pro statistická data,</li>
              <li>Ministerstvo práce a sociálních věcí (MPSV) a Úřad práce ČR pro agendu zaměstnanosti a zaměstnávání cizinců,</li>
              <li>Česká správa sociálního zabezpečení (ČSSZ) a zdravotní pojišťovny pro odvody,</li>
              <li>Ministerstvo vnitra ČR (Odbor azylové a migrační politiky) pro pobytovou agendu cizinců.</li>
            </ul>
            <p>
              U každé obsahové stránky uvádíme použité zdroje v sekci „Zdroje“ a stručnou poznámku o
              postupu v sekci „Metodika“. U online institucionálních zdrojů uvádíme datum ověření.
            </p>

            <h2>Co zásadně netvrdíme</h2>
            <p>
              Abychom udrželi obsah poctivý a ověřitelný, dodržujeme jasné hranice:
            </p>
            <ul>
              <li>Neuvádíme vymyšlené údaje, když aktuální data nejsou k dispozici — místo odhadu odkážeme na oficiální zdroj.</li>
              <li>Neuvádíme vymyšlené statistiky, počty pracovníků nebo zaměstnavatelů, mzdy, míry úspěšnosti, úspory ani reakční doby.</li>
              <li>Nezveřejňujeme hodnocení, recenze ani hvězdičky (žádné „hodnocení zákazníků“) a neuvádíme smyšlené reference či případové studie.</li>
              <li>Nepoužíváme formulace jako „ověřeno MPSV“, „licencováno státem“ ani „schváleno státem“ — takové tvrzení by muselo přesně odpovídat oficiálnímu záznamu.</li>
              <li>Neslibujeme „garantované“ pracovníky ani „okamžitý nástup“; nábor a lhůty závisejí na okolnostech a platných předpisech.</li>
              <li>Identifikační a povolovací údaje provozovatele zveřejňujeme jako fakta až po ověření z oficiální evidence — do té doby je označujeme jako „ověření probíhá“.</li>
            </ul>
            <p>
              Podrobnosti o provozovateli, ověřených údajích a o tom, jak si samostatně ověříte
              kteroukoli agenturu práce v ČR, najdete na stránce{' '}
              <a href="/o-nas">O nás a ověření agentury</a>. Registraci společnosti ověříte v
              {' '}<a href={OFFICIAL_SOURCES.ares.url} target="_blank" rel="noopener noreferrer">{OFFICIAL_SOURCES.ares.title}</a>,
              povolení ke zprostředkování zaměstnání v
              {' '}<a href={OFFICIAL_SOURCES.mpsvAgencies.url} target="_blank" rel="noopener noreferrer">{OFFICIAL_SOURCES.mpsvAgencies.title}</a>.
            </p>

            <h2>Aktuálnost a aktualizace</h2>
            <p>
              U každé obsahové stránky uvádíme datum poslední aktualizace. Protože se sazby, lhůty a
              statistiky mění, konkrétní hodnoty vždy ověřujte v aktuálním znění předpisů a v
              uvedených oficiálních zdrojích. Zjistíte-li nepřesnost nebo neaktuální údaj, dejte nám
              vědět a rádi obsah opravíme.
            </p>

            <h2>Oprava a podněty</h2>
            <p>
              Podněty k opravě nebo aktualizaci obsahu posílejte na{' '}
              <a href={`mailto:${TRUST_DATA.contactEmail.value}`}>{TRUST_DATA.contactEmail.value}</a>{' '}
              nebo volejte{' '}
              <a href={`tel:${(TRUST_DATA.telephone.value || '').replace(/\s/g, '')}`}>{TRUST_DATA.telephone.value}</a>.
              Zpracování osobních údajů popisuje naše{' '}
              <a href="/privacy-policy">ochrana osobních údajů</a>.
            </p>

            <p className="seo-editorial-note">
              Redakčně zpracovala redakce TalentPartnerID na základě oficiálních zdrojů. Obsah je
              obecná informace, nikoli individuální právní poradenství.
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
