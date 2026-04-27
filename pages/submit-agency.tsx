import Head from 'next/head'
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Submit Your Agency',
  description: 'Submit your recruitment or staffing agency to the TNT Agency directory',
  url: 'https://manpower-tnt.agency/submit-agency',
}

export default function SubmitAgency() {
  useEffect(() => {
    const form = document.getElementById('agencyForm') as HTMLFormElement | null
    const success = document.getElementById('formSuccess') as HTMLElement | null
    const errorBox = document.getElementById('formError') as HTMLElement | null
    const submitBtn = document.getElementById('submitBtn') as HTMLButtonElement | null
    const descArea = document.getElementById('agencyDescription') as HTMLTextAreaElement | null
    const descCount = document.getElementById('descCount') as HTMLElement | null

    if (!form || !success || !errorBox || !submitBtn || !descArea || !descCount) return

    function showError(msg: string) {
      errorBox!.textContent = msg
      errorBox!.style.display = 'block'
      errorBox!.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    function clearError() {
      errorBox!.style.display = 'none'
      errorBox!.textContent = ''
    }
    function handleInput() {
      const len = descArea!.value.length
      descCount!.textContent = len + ' / 1000'
      descCount!.style.color = len < 200 || len > 1000 ? '#991b1b' : 'var(--text-3)'
    }
    function handleSubmit(e: Event) {
      e.preventDefault()
      clearError()

      const name = (document.getElementById('agencyName') as HTMLInputElement).value.trim()
      const website = (document.getElementById('agencyWebsite') as HTMLInputElement).value.trim()
      const services = (document.getElementById('agencyServices') as HTMLInputElement).value.trim()
      const desc = descArea!.value.trim()
      const email = (document.getElementById('agencyEmail') as HTMLInputElement).value.trim()

      if (!name) { showError('Agency Name is required.'); return }
      if (!website) { showError('Website URL is required.'); return }
      if (!services) { showError('Services field is required.'); return }
      if (desc.length < 200) { showError('Description must be at least 200 characters (currently ' + desc.length + ').'); return }
      if (desc.length > 1000) { showError('Description must not exceed 1000 characters.'); return }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('Please enter a valid contact email address.')
        return
      }

      const emailSubject = document.getElementById('emailSubject') as HTMLInputElement | null
      if (emailSubject) emailSubject.value = 'New Agency Submission - ' + name

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
          submitBtn!.textContent = 'Submit Agency →'
          showError('Something went wrong. Please email us directly at jobbohemiacz@gmail.com')
        })
    }

    descArea.addEventListener('input', handleInput)
    form.addEventListener('submit', handleSubmit)
    return () => {
      descArea.removeEventListener('input', handleInput)
      form.removeEventListener('submit', handleSubmit)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Submit Your Agency | TNT Agency</title>
        <meta name="description" content="Submit your recruitment or staffing agency to the TNT Agency directory. Get discovered by companies looking for your services. Every submission is reviewed manually before publication." />
        <meta name="keywords" content="submit agency, list agency, agency directory, recruitment agency submission" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://manpower-tnt.agency/submit-agency" />
        <link rel="alternate" hrefLang="en" href="https://manpower-tnt.agency/submit-agency" />
        <link rel="alternate" hrefLang="x-default" href="https://manpower-tnt.agency/submit-agency" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manpower-tnt.agency/submit-agency" />
        <meta property="og:site_name" content="TNT Agency" />
        <meta property="og:title" content="Submit Your Agency | TNT Agency" />
        <meta property="og:description" content="List your recruitment or staffing agency and get discovered by new clients. Free submission, manually reviewed." />
        <meta property="og:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Submit Your Agency | TNT Agency" />
        <meta name="twitter:description" content="Get your agency listed and start receiving new client inquiries. Free and manually moderated." />
        <meta name="twitter:image" content="https://manpower-tnt.agency/assets/og.jpg" />
        <script key="schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <Header activePage="submit-agency" />

      {/* PAGE HERO */}
      <section className="page-hero" id="home">
        <div className="container">
          <div className="eyebrow eyebrow--light fi">Agency Submission</div>
          <h1 className="fi d1">Submit Your Agency</h1>
          <p className="page-hero__sub fi d2">
            Get your agency in front of companies looking for recruitment and staffing services. Every submission is reviewed manually — nothing is published automatically.
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
              <h3>Submission Received!</h3>
              <p>
                Thank you. Your agency submission has been sent to our team for review. We&apos;ll be in touch if your profile is approved for publication.<br /><br />
                <a href="/agencies" style={{ color: 'var(--accent)', fontWeight: 600 }}>Browse the agency directory →</a>
              </p>
            </div>

            {/* Form */}
            <form
              className="contact-form"
              id="agencyForm"
              name="submit-agency"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              noValidate
            >
              <input type="hidden" name="form-name" value="submit-agency" />
              <input type="hidden" name="_subject" id="emailSubject" value="New Agency Submission" />
              <input type="hidden" name="bot-field" style={{ display: 'none' }} />

              <h3>Agency Details</h3>

              <div className="form-error-msg" id="formError" role="alert" style={{ display: 'none' }}></div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="agencyName">Agency Name *</label>
                  <input
                    type="text"
                    id="agencyName"
                    name="agency-name"
                    placeholder="e.g. Acme Recruitment Ltd."
                    required
                    autoComplete="organization"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="agencyWebsite">Website URL *</label>
                  <input
                    type="url"
                    id="agencyWebsite"
                    name="website"
                    placeholder="https://youragency.com"
                    required
                    autoComplete="url"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="agencyServices">Services *</label>
                <input
                  type="text"
                  id="agencyServices"
                  name="services"
                  placeholder="e.g. Permanent Placement, Executive Search, Temp Staffing"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="agencyDescription">
                  Description * <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(200–1000 characters)</span>
                </label>
                <textarea
                  id="agencyDescription"
                  name="description"
                  rows={5}
                  placeholder="Describe your agency: specializations, industries you serve, typical client profile, years in business..."
                  required
                  minLength={200}
                  maxLength={1000}
                ></textarea>
                <span id="descCount" style={{ fontSize: '0.78rem', color: 'var(--text-3)', marginTop: '4px', display: 'block' }}>0 / 1000</span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="agencyLocation">
                    Location <span style={{ fontWeight: 400, color: 'var(--text-3)' }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="agencyLocation"
                    name="location"
                    placeholder="e.g. Prague, Czech Republic"
                    autoComplete="address-level2"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="agencyEmail">Contact Email *</label>
                  <input
                    type="email"
                    id="agencyEmail"
                    name="contact-email"
                    placeholder="contact@youragency.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <label className="form-check">
                <input type="checkbox" id="lookingForClients" name="looking-for-clients" value="Yes" />
                <span className="form-check__label">We are actively looking for new clients</span>
              </label>

              <button type="submit" className="btn btn-accent btn-lg btn-full" id="submitBtn">
                Submit Agency →
              </button>
              <p className="form-note">Submissions are reviewed manually. Nothing is published automatically. We may contact you for additional details.</p>
            </form>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
