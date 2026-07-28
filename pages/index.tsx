import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HomePayrollCalculator from '../components/HomePayrollCalculator'
import HomeAgencyValue from '../components/HomeAgencyValue'

const employmentAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  name: 'TalentPartnerID',
  legalName: 'TNT agency s.r.o.',
  url: 'https://talentpartnerid.com',
  logo: 'https://talentpartnerid.com/favicon.svg',
  description: 'TNT agency s.r.o. je personální agentura se sídlem v Pardubicích. Zprostředkujeme zaměstnání dle §14 zákona č. 435/2004 Sb., o zaměstnanosti.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Na Spravedlnosti 1533',
    addressLocality: 'Pardubice',
    addressRegion: 'Zelené Předměstí',
    postalCode: '530 02',
    addressCountry: 'CZ',
  },
  telephone: '+420776858284',
  email: 'jobbohemiacz@gmail.com',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'recruitment',
    telephone: '+420776858284',
    email: 'jobbohemiacz@gmail.com',
    availableLanguage: ['Czech', 'English', 'German'],
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  areaServed: ['CZ', 'DE', 'SK', 'AT'],
}

// WebSite identity only. No SearchAction/potentialAction: the site has no
// on-site search results feature, so the search template previously advertised
// here (…/?s={search_term_string}) made Google discover an invalid parameter
// URL. Removing it at the source stops that URL from ever being emitted.
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TalentPartnerID',
  url: 'https://talentpartnerid.com',
  description: 'Employment and staffing agency connecting talent with opportunity across all industries.',
}

export default function Home() {
  return (
    <>
      <Head>
        <title>TalentPartnerID — Employment &amp; Staffing Agency | Pardubice, Czech Republic</title>
        <meta name="description" content="TalentPartnerID — your trusted recruitment partner for permanent placement, executive search, and flexible staffing across all industries. Based in Pardubice, Czech Republic. Provozovatel: TNT agency s.r.o." />
        <meta name="keywords" content="personální agentura, pracovní agentura, zprostředkování zaměstnání, executive search, agenturní zaměstnávání, Pardubice, employment agency" />
        <meta name="robots" content="index, follow" />
        <meta name="last-modified" content="2026-05-03" />
        <meta property="article:modified_time" content="2026-05-03T00:00:00+02:00" />
        <link rel="canonical" href="https://talentpartnerid.com/" />
        <link rel="alternate" hrefLang="en" href="https://talentpartnerid.com/" />
        <link rel="alternate" hrefLang="cs" href="https://talentpartnerid.com/" />
        <link rel="alternate" hrefLang="de" href="https://talentpartnerid.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://talentpartnerid.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://talentpartnerid.com/" />
        <meta property="og:site_name" content="TalentPartnerID" />
        <meta property="og:title" content="TalentPartnerID — Employment &amp; Staffing Agency" />
        <meta property="og:description" content="Your trusted recruitment partner for permanent, temporary, and executive staffing. We connect the right people with the right companies." />
        <meta property="og:image" content="https://talentpartnerid.com/assets/og.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TalentPartnerID — Employment &amp; Staffing Agency" />
        <meta name="twitter:description" content="Your trusted recruitment partner. Permanent placement, executive search, and flexible staffing across all industries." />
        <meta name="twitter:image" content="https://talentpartnerid.com/assets/og.svg" />
        <script key="schema-agency" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(employmentAgencySchema) }} />
        <script key="schema-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </Head>

      <Header activePage="home" />

      {/* HERO */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__badge fi">
              <span className="badge-pulse" aria-hidden="true"></span>
              <span data-i18n="hero.badge">Personální agentura · Talent. Síť. Důvěra.</span>
            </div>
            <h1 className="fi d1">
              <span data-i18n="hero.h1a">Spojujeme</span><br />
              <span data-i18n="hero.h1b">správné lidi</span><br />
              <span data-i18n="hero.h1c">se správnými</span> <span className="text-accent" data-i18n="hero.h1accent">firmami.</span>
            </h1>
            <p className="hero__sub fi d2" data-i18n="hero.sub">TNT agency s.r.o. je váš spolehlivý partner v oblasti náboru — dodáváme kvalifikované kandidáty na trvalé, manažerské i flexibilní pozice napříč všemi odvětvími.</p>
            <div className="hero__ctas fi d3">
              <a href="/agencies" className="btn btn-accent btn-lg" data-i18n="hero.cta1">Hledám pracovníky</a>
              <a href="/offers" className="btn btn-outline-white btn-lg" data-i18n="hero.cta2">Hledám práci</a>
            </div>
          </div>
        </div>
        <div className="hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* FOCUS STRIP — honest, non-quantified positioning (no unverified metrics).
          The previous strip advertised unverifiable figures (500+/100+/24 h);
          replaced with factual focus areas that need no numeric substantiation. */}
      <section className="stats-strip" aria-label="Naše zaměření">
        <div className="container">
          <div className="stats-grid fi">
            <div className="stat-item">
              <strong>Výroba a logistika</strong>
              <span>Zaměření na provozní profese</span>
            </div>
            <div className="stat-divider" aria-hidden="true"></div>
            <div className="stat-item">
              <strong>Přímý i agenturní</strong>
              <span>Modely spolupráce podle potřeby</span>
            </div>
            <div className="stat-divider" aria-hidden="true"></div>
            <div className="stat-item">
              <strong>Zaměstnávání cizinců</strong>
              <span>Podpora u povolení a karet</span>
            </div>
            <div className="stat-divider" aria-hidden="true"></div>
            <div className="stat-item">
              <strong>Odhad nákladů</strong>
              <span>Kalkulačka ceny práce před poptávkou</span>
            </div>
          </div>
        </div>
      </section>

      {/* PAYROLL CALCULATOR — flagship */}
      <section className="section" id="kalkulacka-mezd" aria-labelledby="kalkulacka-mezd-title">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="calc.eyebrow">Kalkulačka nákladů zaměstnance</div>
            <h2 id="kalkulacka-mezd-title" data-i18n="calc.heading">Spočítejte skutečné náklady na zaměstnance</h2>
            <p data-i18n="calc.sub">Zjistěte čistou mzdu zaměstnance, zákonné odvody a celkové měsíční náklady zaměstnavatele podle pravidel platných v České republice.</p>
          </div>
          <HomePayrollCalculator />
        </div>
      </section>

      {/* AGENCY VALUE — statutory payroll is not the whole staffing cost */}
      <section className="section section--alt" id="agenturni-hodnota">
        <div className="container">
          <HomeAgencyValue />
        </div>
      </section>

      {/* FOR EMPLOYERS — PREVIEW */}
      <section className="section section--alt" id="services">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="employers.eyebrow">Pro zaměstnavatele</div>
            <h2 data-i18n="employers.h2">Personální služby<br />přizpůsobené vašemu byznysu</h2>
            <p data-i18n="employers.sub">Od jediné pozice po budování celých týmů — máme řešení, které odpovídá vašim potřebám a časovému harmonogramu.</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }} className="fi d1">
            <a href="/agencies" className="btn btn-primary btn-lg">Prozkoumat služby a odvětví →</a>
          </div>
        </div>
      </section>

      {/* FOR CANDIDATES — PREVIEW */}
      <section className="section candidates section--navy" id="candidates">
        <div className="container">
          <div className="candidates__inner">
            <div className="fi">
              <div className="eyebrow eyebrow--light" data-i18n="candidates.eyebrow">Pro uchazeče</div>
              <h2 data-i18n="candidates.h2">Hledáte<br />novou kariérní příležitost?</h2>
              <p data-i18n="candidates.sub">Pomáháme uchazečům najít vhodné pracovní uplatnění. Naše služba je pro uchazeče zcela <strong>zdarma</strong>.</p>
              <div className="cand-ctas" style={{ marginTop: '32px' }}>
                <a href="mailto:jobbohemiacz@gmail.com?subject=Job%20Application" className="btn btn-accent btn-lg" data-i18n="candidates.cta1">Poslat životopis</a>
                <a href="/offers" className="btn btn-outline-white btn-lg">Procházet nabídky →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETPLACE CTA */}
      <section className="section section--alt" id="marketplace">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow">Tržiště</div>
            <h2>🚀 Získejte klienty nebo najděte agentury</h2>
            <p>Ať už provozujete personální agenturu, nebo ji hledáte — jste na správném místě. Zadejte svůj profil nebo poptávku během několika minut.</p>
          </div>
          <div className="cta-duo__grid">
            <div className="cta-duo__card fi d1">
              <div className="cta-duo__icon">🏢</div>
              <h3>Jste agentura?</h3>
              <p>Nechte se najít firmami, které aktivně hledají partnery pro nábor a personální zajištění. Zadejte svůj profil a oslovte nové klienty.</p>
              <a href="/submit-agency" className="btn btn-accent btn-lg">Zveřejnit agenturu</a>
            </div>
            <div className="cta-duo__card fi d2">
              <div className="cta-duo__icon">🔍</div>
              <h3>Hledáte agenturu?</h3>
              <p>Zadejte své požadavky a nechte kvalifikované agentury, ať se ozvou vám. Zdarma, rychle a před zveřejněním ručně ověřené.</p>
              <a href="/submit-offer" className="btn btn-primary btn-lg">Zadat poptávku</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT TEASER */}
      <section className="section contact-teaser" id="contact-cta">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="contact.eyebrow">Kontaktujte nás</div>
            <h2 data-i18n="contact.h2">Připraveni najít<br />vašeho ideálního kandidáta?</h2>
            <p>Napište nám o své volné pozici. Na zprávy odpovídáme v pracovní dny.</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }} className="fi d1">
            <a href="/contact" className="btn btn-primary btn-lg">Poslat poptávku →</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
