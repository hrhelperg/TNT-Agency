import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const employmentAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  name: 'TNT agency s.r.o.',
  legalName: 'TNT agency s.r.o.',
  url: 'https://manpower-tnt.agency',
  logo: 'https://manpower-tnt.agency/favicon.svg',
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

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'TNT Agency',
  url: 'https://manpower-tnt.agency',
  description: 'Employment and staffing agency connecting talent with opportunity across all industries.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://manpower-tnt.agency/?s={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function Home() {
  return (
    <>
      <Head>
        <title>TNT Agency — Employment &amp; Staffing Agency | Pardubice, Czech Republic</title>
        <meta name="description" content="TNT Agency s.r.o. — your trusted recruitment partner for permanent placement, executive search, and flexible staffing across all industries. Based in Pardubice, Czech Republic." />
        <meta name="keywords" content="personální agentura, pracovní agentura, zprostředkování zaměstnání, executive search, agenturní zaměstnávání, Pardubice, employment agency" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://manpower-tnt.agency/" />
        <link rel="alternate" hrefLang="en" href="https://manpower-tnt.agency/" />
        <link rel="alternate" hrefLang="cs" href="https://manpower-tnt.agency/" />
        <link rel="alternate" hrefLang="de" href="https://manpower-tnt.agency/" />
        <link rel="alternate" hrefLang="x-default" href="https://manpower-tnt.agency/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manpower-tnt.agency/" />
        <meta property="og:site_name" content="TNT Agency" />
        <meta property="og:title" content="TNT Agency — Employment &amp; Staffing Agency" />
        <meta property="og:description" content="Your trusted recruitment partner for permanent, temporary, and executive staffing. We connect the right people with the right companies." />
        <meta property="og:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="de_DE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TNT Agency — Employment &amp; Staffing Agency" />
        <meta name="twitter:description" content="Your trusted recruitment partner. Permanent placement, executive search, and flexible staffing across all industries." />
        <meta name="twitter:image" content="https://manpower-tnt.agency/assets/og.jpg" />
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
              <span data-i18n="hero.badge">Employment Agency · Talent. Network. Trust.</span>
            </div>
            <h1 className="fi d1">
              <span data-i18n="hero.h1a">We Connect</span><br />
              <span data-i18n="hero.h1b">the Right People</span><br />
              <span data-i18n="hero.h1c">with the Right</span> <span className="text-accent" data-i18n="hero.h1accent">Companies.</span>
            </h1>
            <p className="hero__sub fi d2" data-i18n="hero.sub">
              TNT Agency is your trusted recruitment partner — delivering qualified candidates for permanent roles, executive positions, and flexible staffing needs across all industries.
            </p>
            <div className="hero__ctas fi d3">
              <a href="/agencies" className="btn btn-accent btn-lg" data-i18n="hero.cta1">I&apos;m Looking for Talent</a>
              <a href="/offers" className="btn btn-outline-white btn-lg" data-i18n="hero.cta2">I&apos;m Looking for a Job</a>
            </div>
          </div>
        </div>
        <div className="hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="stats-strip" aria-label="Agency by the numbers">
        <div className="container">
          <div className="stats-grid fi">
            <div className="stat-item">
              <strong>500+</strong>
              <span data-i18n="stats.s1">Successful Placements</span>
            </div>
            <div className="stat-divider" aria-hidden="true"></div>
            <div className="stat-item">
              <strong>100+</strong>
              <span data-i18n="stats.s2">Partner Companies</span>
            </div>
            <div className="stat-divider" aria-hidden="true"></div>
            <div className="stat-item">
              <strong>12+</strong>
              <span data-i18n="stats.s3">Industries Covered</span>
            </div>
            <div className="stat-divider" aria-hidden="true"></div>
            <div className="stat-item">
              <strong>24 h</strong>
              <span data-i18n="stats.s4">First Candidates</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOR EMPLOYERS — PREVIEW */}
      <section className="section section--alt" id="services">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="employers.eyebrow">For Employers</div>
            <h2 data-i18n="employers.h2">Recruitment Services<br />Built Around Your Business</h2>
            <p data-i18n="employers.sub">From a single hire to building entire departments — we have a solution that fits your hiring needs and timeline.</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }} className="fi d1">
            <a href="/agencies" className="btn btn-primary btn-lg">Explore Services &amp; Industries →</a>
          </div>
        </div>
      </section>

      {/* FOR CANDIDATES — PREVIEW */}
      <section className="section candidates section--navy" id="candidates">
        <div className="container">
          <div className="candidates__inner">
            <div className="fi">
              <div className="eyebrow eyebrow--light" data-i18n="candidates.eyebrow">For Candidates</div>
              <h2 data-i18n="candidates.h2">Looking for Your<br />Next Career Move?</h2>
              <p data-i18n="candidates.sub">Join thousands of professionals we&apos;ve successfully placed across Europe. Our service is completely <strong>free</strong> for candidates — always.</p>
              <div className="cand-ctas" style={{ marginTop: '32px' }}>
                <a href="mailto:jobbohemiacz@gmail.com?subject=Job%20Application" className="btn btn-accent btn-lg" data-i18n="candidates.cta1">Send Your CV</a>
                <a href="/offers" className="btn btn-outline-white btn-lg">Browse Offers →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKETPLACE CTA */}
      <section className="section section--alt" id="marketplace">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow">Marketplace</div>
            <h2>🚀 Get Clients or Find Agencies</h2>
            <p>Whether you run a recruitment agency or need one — this is your place. Submit your profile or post your requirement in minutes.</p>
          </div>
          <div className="cta-duo__grid">
            <div className="cta-duo__card fi d1">
              <div className="cta-duo__icon">🏢</div>
              <h3>Are You an Agency?</h3>
              <p>Get discovered by companies actively looking for recruitment and staffing partners. Submit your profile and reach new clients.</p>
              <a href="/submit-agency" className="btn btn-accent btn-lg">Publish Your Agency</a>
            </div>
            <div className="cta-duo__card fi d2">
              <div className="cta-duo__icon">🔍</div>
              <h3>Looking for an Agency?</h3>
              <p>Post your requirements and let qualified agencies find you. Free, fast, and fully moderated before going live.</p>
              <a href="/submit-offer" className="btn btn-primary btn-lg">Post Your Offer</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT TEASER */}
      <section className="section contact-teaser" id="contact-cta">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="contact.eyebrow">Get In Touch</div>
            <h2 data-i18n="contact.h2">Ready to Find<br />Your Next Great Hire?</h2>
            <p>Tell us about your open role. We get back within 2 business hours with a clear plan and honest timeline.</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }} className="fi d1">
            <a href="/contact" className="btn btn-primary btn-lg">Send Us a Brief →</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
