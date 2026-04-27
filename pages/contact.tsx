import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact TNT Agency',
  description: 'Contact page for TNT Agency recruitment and staffing services',
  url: 'https://manpower-tnt.agency/contact',
  mainEntity: {
    '@type': 'EmploymentAgency',
    name: 'TNT agency s.r.o.',
    telephone: '+420776858284',
    email: 'jobbohemiacz@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Na Spravedlnosti 1533',
      addressLocality: 'Pardubice',
      postalCode: '530 02',
      addressCountry: 'CZ',
    },
  },
}

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact TNT Agency | Get a Free Recruitment Consultation</title>
        <meta name="description" content="Contact TNT Agency for a free recruitment consultation. Tell us about your open role and we'll respond within 2 business hours with a clear plan. Based in Pardubice, Czech Republic." />
        <meta name="keywords" content="contact TNT Agency, recruitment consultation, staffing inquiry, employment agency contact" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://manpower-tnt.agency/contact" />
        <link rel="alternate" hrefLang="en" href="https://manpower-tnt.agency/contact" />
        <link rel="alternate" hrefLang="x-default" href="https://manpower-tnt.agency/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manpower-tnt.agency/contact" />
        <meta property="og:site_name" content="TNT Agency" />
        <meta property="og:title" content="Contact TNT Agency | Free Recruitment Consultation" />
        <meta property="og:description" content="Get in touch with TNT Agency. Send us your brief and receive a response within 2 business hours." />
        <meta property="og:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact TNT Agency | Free Recruitment Consultation" />
        <meta name="twitter:description" content="Contact our team for permanent placement, executive search, or staffing inquiries." />
        <meta name="twitter:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <script key="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header activePage="contact" />

      {/* PAGE HERO */}
      <section className="page-hero" id="home">
        <div className="container">
          <div className="eyebrow eyebrow--light fi" data-i18n="contact.eyebrow">Get In Touch</div>
          <h1 className="fi d1">Ready to Find<br />Your Next Great Hire?</h1>
          <p className="page-hero__sub fi d2">
            Tell us about your open role. We&apos;ll get back to you within 2 business hours with a clear plan and honest timeline.
          </p>
        </div>
        <div className="page-hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact" id="contact">
        <div className="container">
          <div className="contact__inner">

            <div className="contact__left fi">
              <div className="eyebrow" data-i18n="contact.eyebrow">Get In Touch</div>
              <h2 data-i18n="contact.h2">Ready to Find<br />Your Next Great Hire?</h2>
              <p data-i18n="contact.sub">Tell us about your open role. We&apos;ll get back to you within 2 hours during business hours with a clear plan and honest timeline.</p>

              <div className="contact-info">

                <div className="contact-info__item">
                  <div className="contact-info__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17z" />
                    </svg>
                  </div>
                  <div>
                    <span className="contact-info__label" data-i18n="contact.labelPhone">Phone</span>
                    <a href="tel:+420776858284">+420 776 858 284</a>
                  </div>
                </div>

                <div className="contact-info__item">
                  <div className="contact-info__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <span className="contact-info__label" data-i18n="contact.labelEmail">Email</span>
                    <a href="mailto:jobbohemiacz@gmail.com">jobbohemiacz@gmail.com</a>
                  </div>
                </div>

                <div className="contact-info__item">
                  <div className="contact-info__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="contact-info__label" data-i18n="contact.labelOffice">Office</span>
                    <span>Na Spravedlnosti 1533, 530 02 Pardubice</span>
                  </div>
                </div>

                <div className="contact-info__item">
                  <div className="contact-info__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <span className="contact-info__label" data-i18n="contact.labelHours">Business Hours</span>
                    <span data-i18n="contact.hours">Mon–Fri: 8:00 – 17:00</span>
                  </div>
                </div>

              </div>

              <div className="contact-socials">
                <a href="https://www.linkedin.com/company/tntgency" target="_blank" rel="noopener noreferrer" className="soc-btn" aria-label="LinkedIn">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/tntgency" target="_blank" rel="noopener noreferrer" className="soc-btn" aria-label="Instagram">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Instagram
                </a>
              </div>
            </div>

            <div className="contact__form-wrap fi d2">
              <form className="contact-form" id="contactForm" noValidate>
                <h3 data-i18n="form.h3">Send Us a Brief</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fname" data-i18n="form.name">Your Name *</label>
                    <input type="text" id="fname" name="name" data-i18n-ph="form.namePh" placeholder="John Smith" required autoComplete="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fcompany" data-i18n="form.company">Company *</label>
                    <input type="text" id="fcompany" name="company" data-i18n-ph="form.companyPh" placeholder="Company Ltd." required autoComplete="organization" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="femail" data-i18n="form.email">Email Address *</label>
                    <input type="email" id="femail" name="email" data-i18n-ph="form.emailPh" placeholder="john@company.com" required autoComplete="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fphone" data-i18n="form.phone">Phone Number</label>
                    <input type="tel" id="fphone" name="phone" data-i18n-ph="form.phonePh" placeholder="+420 776 858 284" autoComplete="tel" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="fservice" data-i18n="form.service">Service Needed</label>
                  <select id="fservice" name="service" defaultValue="">
                    <option value="" disabled>Select a service…</option>
                    <option value="permanent">Permanent Placement</option>
                    <option value="executive">Executive Search</option>
                    <option value="temp">Temporary Staffing</option>
                    <option value="rpo">HR Consulting / RPO</option>
                    <option value="candidate">I&apos;m a Candidate</option>
                    <option value="other">Other / Not sure yet</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="fmessage" data-i18n="form.message">Tell Us About the Role *</label>
                  <textarea id="fmessage" name="message" rows={4} data-i18n-ph="form.messagePh" placeholder="Job title, key requirements, timeline, and any other relevant details…" required></textarea>
                </div>
                <label className="form-check form-check--gdpr">
                  <input type="checkbox" id="contactGdprConsent" name="gdpr-consent" required />
                  <span className="form-check__label">
                    I agree to the processing of my personal data in accordance with the{' '}
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. *
                  </span>
                </label>

                <button type="submit" className="btn btn-primary btn-lg btn-full" id="submitBtn" data-i18n="form.submit">
                  Send Brief →
                </button>
                <p className="form-note" data-i18n="form.note">We respond within 2 business hours. 100% confidential.</p>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
