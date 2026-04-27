import Head from 'next/head'
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Post Your Offer',
  description: 'Submit a client offer or staffing request to be matched with recruitment and staffing agencies',
  url: 'https://manpower-tnt.agency/submit-offer',
}

export default function SubmitOffer() {
  useEffect(() => {
    const form = document.getElementById('offerForm') as HTMLFormElement | null
    const success = document.getElementById('formSuccess') as HTMLElement | null
    const errorBox = document.getElementById('formError') as HTMLElement | null
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement | null

    if (!form || !success || !errorBox || !submitBtn) return

    function showError(msg: string) {
      errorBox!.textContent = msg
      errorBox!.style.display = 'block'
      errorBox!.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    function clearError() {
      errorBox!.style.display = 'none'
      errorBox!.textContent = ''
    }
    function handleSubmit(e: Event) {
      e.preventDefault()
      clearError()

      const company = (document.getElementById('companyName') as HTMLInputElement).value.trim()
      const request = (document.getElementById('offerRequest') as HTMLTextAreaElement).value.trim()
      const email = (document.getElementById('offerEmail') as HTMLInputElement).value.trim()

      if (!company) { showError('Company Name is required.'); return }
      if (!request) { showError('Please describe what you need.'); return }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('Please enter a valid contact email address.')
        return
      }

      const emailSubject = document.getElementById('emailSubject') as HTMLInputElement | null
      if (emailSubject) emailSubject.value = 'New Client Offer Submission - ' + company

      submitBtn!.disabled = true
      submitBtn!.textContent = 'Sending…'

      const data = new FormData(form!)
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as any).toString(),
      })
        .then((res) => {
          if (res.ok) {
            form!.style.display = 'none'
            success!.style.display = 'block'
            success!.scrollIntoView({ behavior: 'smooth', block: 'start' })
          } else {
            throw new Error('Server error ' + res.status)
          }
        })
        .catch(() => {
          submitBtn!.disabled = false
          submitBtn!.textContent = 'Submit Offer →'
          showError('Something went wrong. Please email us directly at jobbohemiacz@gmail.com')
        })
    }

    form.addEventListener('submit', handleSubmit)
    return () => {
      form.removeEventListener('submit', handleSubmit)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Post Your Offer | TNT Agency</title>
        <meta name="description" content="Post your recruitment or staffing requirement and get matched with the right agency. Tell us what you need — budget, timeline, and team size — and we'll take it from there. Reviewed manually, never auto-published." />
        <meta name="keywords" content="post offer, hiring request, find recruitment agency, staffing requirement, client offer" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://manpower-tnt.agency/submit-offer" />
        <link rel="alternate" hrefLang="en" href="https://manpower-tnt.agency/submit-offer" />
        <link rel="alternate" hrefLang="x-default" href="https://manpower-tnt.agency/submit-offer" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manpower-tnt.agency/submit-offer" />
        <meta property="og:site_name" content="TNT Agency" />
        <meta property="og:title" content="Post Your Offer | TNT Agency" />
        <meta property="og:description" content="Describe your hiring needs and get matched with recruitment agencies. Free, fast, and manually reviewed." />
        <meta property="og:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Post Your Offer | TNT Agency" />
        <meta name="twitter:description" content="Post your staffing requirement and get matched with the right agency partner." />
        <meta name="twitter:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <script key="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header activePage="submit-offer" />

      {/* PAGE HERO */}
      <section className="page-hero" id="home">
        <div className="container">
          <div className="eyebrow eyebrow--light fi">Client Offer</div>
          <h1 className="fi d1">Post Your Offer</h1>
          <p className="page-hero__sub fi d2">
            Tell us what you need and we&apos;ll forward your request to relevant agencies. All submissions go to the site owner for manual review — nothing is published automatically.
          </p>
        </div>
        <div className="page-hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* FORM */}
      <section className="section" id="form">
        <div className="container">
          <div className="submit-wrap">

            {/* Success message */}
            <div className="form-success" id="formSuccess" role="alert" style={{ display: 'none' }}>
              <div className="form-success__icon">✅</div>
              <h3>Offer Submitted!</h3>
              <p>
                Thank you. Your offer has been sent to our team for review. If approved, it will be published in the offers directory and relevant agencies will be notified.<br /><br />
                <a href="/offers" style={{ color: 'var(--accent)', fontWeight: 600 }}>Browse current offers →</a>
              </p>
            </div>

            {/* Form */}
            <form
              className="contact-form"
              id="offerForm"
              name="submit-offer"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              noValidate
            >
              <input type="hidden" name="form-name" value="submit-offer" />
              <input type="hidden" name="_subject" id="emailSubject" value="New Client Offer Submission" />
              <input type="hidden" name="bot-field" style={{ display: 'none' }} />

              <h3>Your Requirement</h3>

              <div className="form-error-msg" id="formError" role="alert" style={{ display: 'none' }}></div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name *</label>
                  <input
                    type="text"
                    id="companyName"
                    name="company-name"
                    placeholder="e.g. Acme Corp s.r.o."
                    required
                    autoComplete="organization"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyWebsite">
                    Website <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(optional)</span>
                  </label>
                  <input
                    type="url"
                    id="companyWebsite"
                    name="website"
                    placeholder="https://yourcompany.com"
                    autoComplete="url"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="offerRequest">What do you need? *</label>
                <textarea
                  id="offerRequest"
                  name="request"
                  rows={5}
                  placeholder="Describe your requirement: role(s), number of positions, industry, skills needed, working conditions, etc."
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="offerBudget">
                    Budget Range <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="offerBudget"
                    name="budget"
                    placeholder="e.g. €5,000–€10,000/month"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="offerTimeline">
                    Timeline <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="offerTimeline"
                    name="timeline"
                    placeholder="e.g. ASAP, within 4 weeks, Q3 2026"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="offerEmail">Contact Email *</label>
                <input
                  type="email"
                  id="offerEmail"
                  name="contact-email"
                  placeholder="you@yourcompany.com"
                  required
                  autoComplete="email"
                />
              </div>

              <label className="form-check">
                <input type="checkbox" id="needAgency" name="need-agency-team" value="Yes" />
                <span className="form-check__label">I specifically need an agency or team (not individual freelancers)</span>
              </label>

              <button type="submit" className="btn btn-accent btn-lg btn-full" id="submitBtn">
                Submit Offer →
              </button>
              <p className="form-note">Submissions are reviewed manually. Nothing is published automatically. We may contact you before your offer goes live.</p>
            </form>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
