import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Agencies Directory',
  description: 'Directory of recruitment and staffing agencies on TNT Agency',
  url: 'https://manpower-tnt.agency/agencies',
  numberOfItems: 0,
}

export default function Agencies() {
  return (
    <>
      <Head>
        <title>Agencies &amp; Recruitment Services | TNT Agency</title>
        <meta name="description" content="Explore TNT Agency's recruitment and staffing services: permanent placement, executive search, temporary staffing, and HR consulting. Browse the agency directory or submit your own agency profile." />
        <meta name="keywords" content="recruitment agencies, staffing services, permanent placement, executive search, temporary staffing, HR consulting, agency directory" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://manpower-tnt.agency/agencies" />
        <link rel="alternate" hrefLang="en" href="https://manpower-tnt.agency/agencies" />
        <link rel="alternate" hrefLang="x-default" href="https://manpower-tnt.agency/agencies" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manpower-tnt.agency/agencies" />
        <meta property="og:site_name" content="TNT Agency" />
        <meta property="og:title" content="Agencies &amp; Recruitment Services | TNT Agency" />
        <meta property="og:description" content="Explore recruitment services, browse verified agencies, or submit your own agency to get discovered by new clients." />
        <meta property="og:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Agencies &amp; Recruitment Services | TNT Agency" />
        <meta name="twitter:description" content="Find verified agencies and learn about TNT Agency's recruitment services across all industries." />
        <meta name="twitter:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <script key="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header activePage="agencies" />

      {/* PAGE HERO */}
      <section className="page-hero" id="home">
        <div className="container">
          <div className="eyebrow eyebrow--light fi">Agency Directory &amp; Services</div>
          <h1 className="fi d1">Find the Right<br />Agency Partner</h1>
          <p className="page-hero__sub fi d2">
            Browse verified recruitment and staffing agencies, explore our services, and discover how TNT Agency can fill your next role — fast.
          </p>
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
            <h3>Agency Listings Coming Soon</h3>
            <p>
              We&apos;re building this directory. Agencies are submitted by their owners and reviewed manually before appearing here. Be among the first to get listed.
            </p>
            <a href="/submit-agency" className="btn btn-accent btn-lg">Submit Your Agency</a>
          </div>
          <p className="listing-cta-note fi d1">
            Are you a client looking for an agency? <a href="/submit-offer">Post your offer</a> and let agencies come to you.
          </p>
        </div>
      </section>

      {/* SERVICES — FOR EMPLOYERS */}
      <section className="section services section--alt" id="employers">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="employers.eyebrow">For Employers</div>
            <h2 data-i18n="employers.h2">Recruitment Services<br />Built Around Your Business</h2>
            <p data-i18n="employers.sub">From a single hire to building entire departments — we have a solution that fits your hiring needs and timeline.</p>
          </div>
          {/* Rendered by script.js */}
          <div className="services-grid" id="svcGrid"></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section process" id="process">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="process.eyebrow">How It Works</div>
            <h2 data-i18n="process.h2">From Brief to Hire<br />in Three Steps</h2>
            <p data-i18n="process.sub">A clear, efficient process that respects your time and delivers results — every time.</p>
          </div>
          {/* Rendered by script.js */}
          <div className="process-steps" id="processSteps"></div>
          <div className="process-cta fi d4">
            <a href="/contact" className="btn btn-primary btn-lg" data-i18n="process.cta">Book a Free Consultation</a>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section industries section--alt" id="industries">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="industries.eyebrow">Industries</div>
            <h2 data-i18n="industries.h2">We Recruit Across<br />All Key Sectors</h2>
            <p data-i18n="industries.sub">Deep specialization in each sector means faster results, better candidates, and smarter market insights for your business.</p>
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
            <div className="eyebrow" data-i18n="why.eyebrow">Why TNT Agency</div>
            <h2 data-i18n="why.h2">We Don&apos;t Just Fill Positions.<br />We Build Lasting Teams.</h2>
          </div>
          {/* Rendered by script.js */}
          <div className="why-grid" id="whyGrid"></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials section--alt" id="testimonials">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow" data-i18n="testi.eyebrow">Client Reviews</div>
            <h2 data-i18n="testi.h2">What Our Clients Say</h2>
          </div>
          {/* Rendered by script.js */}
          <div className="testi-grid" id="testiGrid"></div>
        </div>
      </section>

      {/* SUBMIT CTA */}
      <section className="section">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow">Get Listed</div>
            <h2>Are You a Recruitment<br />or Staffing Agency?</h2>
            <p>Submit your profile and start getting discovered by companies looking for your exact services. Free, fast, and no account needed.</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }} className="fi d1">
            <a href="/submit-agency" className="btn btn-accent btn-lg">Submit Your Agency →</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
