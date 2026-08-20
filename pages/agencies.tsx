import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RecruitmentProcess from '../components/RecruitmentProcess'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Agencies Directory',
  description: 'Directory of recruitment and staffing agencies on TalentPartnerID',
  url: 'https://talentpartnerid.com/agencies',
  numberOfItems: 0,
}

export default function Agencies() {
  return (
    <>
      <Head>
        <title>Agencies &amp; Recruitment Services | TalentPartnerID</title>
        <meta name="description" content="Přehled služeb TalentPartnerID pro zaměstnavatele: přímý nábor do kmenového stavu, nábor odborných a technických pozic, agenturní zaměstnávání a podpora náborových procesů. Provozovatel: TNT agency s.r.o." />
        <meta name="keywords" content="personální agentura, agentura práce, přímý nábor, nábor odborných pozic, agenturní zaměstnávání, zprostředkování zaměstnání" />
        <meta name="robots" content="index, follow" />
        <meta name="last-modified" content="2026-05-03" />
        <meta property="article:modified_time" content="2026-05-03T00:00:00+02:00" />
        <link rel="canonical" href="https://talentpartnerid.com/agencies" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://talentpartnerid.com/agencies" />
        <meta property="og:site_name" content="TalentPartnerID" />
        <meta property="og:title" content="Agencies &amp; Recruitment Services | TalentPartnerID" />
        <meta property="og:description" content="Explore recruitment services, browse verified agencies, or submit your own agency to get discovered by new clients." />
        <meta property="og:image" content="https://talentpartnerid.com/assets/og.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Agencies &amp; Recruitment Services | TalentPartnerID" />
        <meta name="twitter:description" content="Find verified agencies and learn about TalentPartnerID's recruitment services across all industries." />
        <meta name="twitter:image" content="https://talentpartnerid.com/assets/og.svg" />
        <script key="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header activePage="agencies" />

      {/* PAGE HERO */}
      <section className="page-hero" id="home">
        <div className="container">
          <div className="eyebrow eyebrow--light fi" data-i18n="pages.agenciesEyebrow">Katalog agentur a služby</div>
          <h1 className="fi d1" data-i18n="pages.agenciesH1">Najděte správného agenturního partnera</h1>
          <p className="page-hero__sub fi d2" data-i18n="pages.agenciesSub">Procházejte ověřené personální a pracovní agentury, prozkoumejte naše služby a zjistěte, jak vám TalentPartnerID rychle obsadí další pozici.</p>
        </div>
        <div className="page-hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* LISTINGS */}
      <section className="section" id="listings">
        <div className="container">
          <div className="listing-placeholder fi">
            <div className="listing-placeholder__icon">🏢</div>
            <h3 data-i18n="pages.agenciesListTitle">Seznam agentur již brzy</h3>
            <p data-i18n="pages.agenciesListBody">Katalog teprve budujeme. Agentury zadávají jejich majitelé a před zveřejněním je ručně kontrolujeme. Buďte mezi prvními v seznamu.</p>
            <a href="/submit-agency" className="btn btn-accent btn-lg" data-i18n="pages.agenciesListBtn">Registrovat agenturu</a>
          </div>
          <p className="listing-cta-note fi d1" data-i18n="pages.agenciesCtaNote">
            Jste klient a hledáte agenturu? <a href="/submit-offer">Zadejte poptávku</a> a nechte agentury přijít za vámi.
          </p>
        </div>
      </section>

      {/* SERVICES — FOR EMPLOYERS */}
      <section className="section services section--alt" id="employers">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="employers.eyebrow">Pro zaměstnavatele</div>
            <h2 data-i18n="employers.h2">Personální služby<br />přizpůsobené vašemu byznysu</h2>
            <p data-i18n="employers.sub">Od jediné pozice po budování celých týmů — máme řešení, které odpovídá vašim potřebám a časovému harmonogramu.</p>
          </div>
          {/* Rendered by script.js */}
          <div className="services-grid" id="svcGrid"></div>
        </div>
      </section>

      {/* HOW IT WORKS — the shared, server-rendered component.
          This section used to inject its steps from the script.js dictionary
          into an empty div after hydration. Now that the same three steps are
          server-rendered from lib/content/recruitment-process.ts, keeping the
          old client-side copy would leave two sources of truth that could drift
          apart silently. The consultation CTA stays: it belongs to this page. */}
      <section className="section process" id="process">
        <RecruitmentProcess headingId="jak-to-funguje-agentury" />
        <div className="container">
          <div className="process-cta fi d4">
            <a href="/contact" className="btn btn-primary btn-lg" data-i18n="process.cta">Sjednat bezplatnou konzultaci</a>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section industries section--alt" id="industries">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="industries.eyebrow">Odvětví</div>
            <h2 data-i18n="industries.h2">Obsazujeme pozice<br />ve všech klíčových sektorech</h2>
            <p data-i18n="industries.sub">Hluboká specializace v každém sektoru znamená rychlejší výsledky, lepší kandidáty a chytřejší tržní přehled pro váš byznys.</p>
          </div>
          {/* Rendered by script.js */}
          <div className="industries-grid" id="industriesGrid"></div>
          <p className="industries-note fi">Don&apos;t see your industry? <a href="/contact">Get in touch</a> — we place candidates across many more sectors.</p>
        </div>
      </section>

      {/* WHY TNT AGENCY */}
      <section className="section why" id="about">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="why.eyebrow">Proč TalentPartnerID</div>
            <h2 data-i18n="why.h2">Neobsazujeme jen pozice.<br />Budujeme trvalé týmy.</h2>
          </div>
          {/* Rendered by script.js */}
          <div className="why-grid" id="whyGrid"></div>
        </div>
      </section>

      {/* TESTIMONIALS */}

      {/* SUBMIT CTA */}
      <section className="section">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="pages.agGetEyebrow">Zviditelněte se</div>
            <h2 data-i18n="pages.agGetH2">Jste personální nebo pracovní agentura?</h2>
            <p data-i18n="pages.agGetSub">Zadejte svůj profil a začněte být vidět u firem, které hledají přesně vaše služby. Zdarma, rychle a bez registrace účtu.</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }} className="fi d1">
            <a href="/submit-agency" className="btn btn-accent btn-lg" data-i18n="pages.agGetBtn">Registrovat agenturu →</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
