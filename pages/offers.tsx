import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Job Offers & Client Requests',
  description: 'Open positions and client staffing requests on TNT Agency',
  url: 'https://manpower-tnt.agency/offers',
  numberOfItems: 0,
}

export default function Offers() {
  return (
    <>
      <Head>
        <title>Job Offers &amp; Client Requests | TNT Agency</title>
        <meta name="description" content="Browse open job offers and client requests from companies looking for recruitment support. Find your next role or post your staffing requirement. TNT Agency — free for candidates, always." />
        <meta name="keywords" content="job offers, client requests, staffing requirements, find agency, recruitment needs, job opportunities Czech Republic" />
        <meta name="robots" content="index, follow" />
        <meta name="last-modified" content="2026-05-03" />
        <meta property="article:modified_time" content="2026-05-03T00:00:00+02:00" />
        <link rel="canonical" href="https://manpower-tnt.agency/offers" />
        <link rel="alternate" hrefLang="en" href="https://manpower-tnt.agency/offers" />
        <link rel="alternate" hrefLang="x-default" href="https://manpower-tnt.agency/offers" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manpower-tnt.agency/offers" />
        <meta property="og:site_name" content="TNT Agency" />
        <meta property="og:title" content="Job Offers &amp; Client Requests | TNT Agency" />
        <meta property="og:description" content="Browse open positions and client offers or post your own staffing requirement to get matched with the right agency." />
        <meta property="og:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Job Offers &amp; Client Requests | TNT Agency" />
        <meta name="twitter:description" content="Find your next role or post your hiring requirement. TNT Agency connects talent with companies." />
        <meta name="twitter:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <script key="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header activePage="offers" />

      {/* PAGE HERO */}
      <section className="page-hero" id="home">
        <div className="container">
          <div className="eyebrow eyebrow--light fi">Offers &amp; Opportunities</div>
          <h1 className="fi d1">Browse Offers &amp;<br />Find Your Next Role</h1>
          <p className="page-hero__sub fi d2">
            Client requests from companies seeking staffing support, plus open positions for candidates. All reviewed manually before going live.
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
            <div className="listing-placeholder__icon">🔍</div>
            <h3>Offers Coming Soon</h3>
            <p>
              Companies are posting their requirements and we review them before they appear here. Be first to get matched — post your offer today.
            </p>
            <a href="/submit-offer" className="btn btn-accent btn-lg">Post Your Offer</a>
          </div>
          <p className="listing-cta-note fi d1">
            Are you an agency? <a href="/agencies">Browse the agency directory</a> or <a href="/submit-agency">submit your profile</a>.
          </p>
        </div>
      </section>

      {/* FOR CANDIDATES */}
      <section className="section candidates section--navy" id="candidates">
        <div className="container">
          <div className="candidates__inner">
            <div className="fi">
              <div className="eyebrow eyebrow--light" data-i18n="candidates.eyebrow">For Candidates</div>
              <h2 data-i18n="candidates.h2">Looking for Your<br />Next Career Move?</h2>
              <p data-i18n="candidates.sub">Join thousands of professionals we&apos;ve successfully placed across Europe. Our service is completely <strong>free</strong> for candidates — always.</p>
              {/* Rendered by script.js */}
              <div className="cand-benefits" id="candBenefits"></div>
              <div className="cand-ctas">
                <a href="mailto:jobbohemiacz@gmail.com?subject=Job%20Application" className="btn btn-accent btn-lg" data-i18n="candidates.cta1">Send Your CV</a>
                <a href="/contact" className="btn btn-outline-white btn-lg" data-i18n="candidates.cta2">Talk to a Recruiter</a>
              </div>
            </div>
            <div className="cand-visual fi d2" aria-hidden="true">
              <div className="cand-card">
                <div className="cand-card__label" data-i18n="candidates.card.label">Currently recruiting for</div>
                {/* Rendered by script.js */}
                <div className="cand-card__roles" id="candRoles"></div>
                <a href="mailto:jobbohemiacz@gmail.com?subject=Job%20Application" className="cand-card__cta" data-i18n="candidates.card.link">View all positions →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POST OFFER CTA */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head fi">
            <div className="eyebrow">Post Your Requirement</div>
            <h2>Looking for a Recruitment<br />or Staffing Agency?</h2>
            <p>Tell us what you need and qualified agencies will be able to review your offer. Free, fast, and fully moderated.</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }} className="fi d1">
            <a href="/submit-offer" className="btn btn-accent btn-lg">Post Your Offer →</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
