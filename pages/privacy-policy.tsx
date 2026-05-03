import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | TNT Agency</title>
        <meta
          name="description"
          content="TNT Agency privacy policy — how we collect, use, and protect your personal data in compliance with GDPR and Czech data protection law."
        />
        <meta name="robots" content="index, follow" />
        <meta name="last-modified" content="2026-05-03" />
        <meta property="article:modified_time" content="2026-05-03T00:00:00+02:00" />
        <link rel="canonical" href="https://manpower-tnt.agency/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manpower-tnt.agency/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | TNT Agency" />
        <meta property="og:description" content="How TNT Agency collects, uses and protects your personal data." />
        <meta property="og:image" content="https://manpower-tnt.agency/assets/og.jpg" />
      </Head>

      <Header />

      <section className="page-hero" id="top">
        <div className="container">
          <div className="eyebrow eyebrow--light fi">Legal</div>
          <h1 className="fi d1">Privacy Policy</h1>
          <p className="page-hero__sub fi d2">
            Last updated: 27 April 2026 &nbsp;·&nbsp; TNT agency s.r.o.
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
          <div className="legal-content">

            <p className="legal-intro">
              This Privacy Policy explains how TNT agency s.r.o. (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
              &ldquo;our&rdquo;) collects, uses, stores, and protects your personal data when you use
              our website at <strong>manpower-tnt.agency</strong> or submit any form. We comply with
              Regulation (EU) 2016/679 (GDPR) and Act No. 110/2019 Coll. on personal data
              processing.
            </p>

            {/* 1 */}
            <h2>1. Data Controller</h2>
            <table className="legal-table">
              <tbody>
                <tr><th>Company</th><td>TNT agency s.r.o.</td></tr>
                <tr><th>Address</th><td>Na Spravedlnosti 1533, Zelené Předměstí, 530 02 Pardubice, Czech Republic</td></tr>
                <tr><th>Email</th><td><a href="mailto:jobbohemiacz@gmail.com">jobbohemiacz@gmail.com</a></td></tr>
                <tr><th>Phone</th><td><a href="tel:+420776858284">+420 776 858 284</a></td></tr>
              </tbody>
            </table>

            {/* 2 */}
            <h2>2. Personal Data We Collect</h2>
            <p>Depending on how you interact with our website, we may collect:</p>

            <h3>2.1 Contact form</h3>
            <ul>
              <li>Full name and company name</li>
              <li>Email address and phone number</li>
              <li>Service enquiry details (role, message)</li>
            </ul>

            <h3>2.2 Agency submission form</h3>
            <ul>
              <li>Agency name, website URL</li>
              <li>Services offered, description, location</li>
              <li>Contact email address</li>
            </ul>

            <h3>2.3 Client offer / request form</h3>
            <ul>
              <li>Company name, website URL</li>
              <li>Staffing requirement details, budget, timeline</li>
              <li>Contact email address</li>
            </ul>

            <h3>2.4 Technical data collected automatically</h3>
            <ul>
              <li>IP address (retained in server logs)</li>
              <li>Browser type and version</li>
              <li>Date and time of access</li>
              <li>Referring URL</li>
            </ul>

            <h3>2.5 Cookies and tracking</h3>
            <p>
              We use cookies only with your explicit consent. Before consent is given, no analytics or
              tracking cookies are loaded. See Section 8 for full details.
            </p>

            {/* 3 */}
            <h2>3. Purposes and Legal Basis for Processing</h2>
            <table className="legal-table">
              <thead>
                <tr><th>Purpose</th><th>Legal basis (GDPR Art. 6)</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Responding to contact enquiries</td>
                  <td>Art. 6(1)(b) — contract / pre-contractual steps</td>
                </tr>
                <tr>
                  <td>Processing agency submissions</td>
                  <td>Art. 6(1)(a) — consent given at submission</td>
                </tr>
                <tr>
                  <td>Processing client offers</td>
                  <td>Art. 6(1)(a) — consent given at submission</td>
                </tr>
                <tr>
                  <td>Sending recruitment-related emails</td>
                  <td>Art. 6(1)(b) — contract / Art. 6(1)(a) — consent</td>
                </tr>
                <tr>
                  <td>Website analytics (Google Analytics)</td>
                  <td>Art. 6(1)(a) — consent (opt-in via cookie banner)</td>
                </tr>
                <tr>
                  <td>Server security and fraud prevention</td>
                  <td>Art. 6(1)(f) — legitimate interests</td>
                </tr>
              </tbody>
            </table>

            {/* 4 */}
            <h2>4. Data Retention</h2>
            <table className="legal-table">
              <thead>
                <tr><th>Data category</th><th>Retention period</th></tr>
              </thead>
              <tbody>
                <tr><td>Contact / form submissions</td><td>2 years from last interaction, then deleted</td></tr>
                <tr><td>Candidate CV and placement data</td><td>3 years, or until you withdraw consent</td></tr>
                <tr><td>Server access logs</td><td>30 days (security purposes)</td></tr>
                <tr><td>Email records (sent / received)</td><td>2 years</td></tr>
                <tr><td>Cookie consent record</td><td>Stored in your browser until you clear it</td></tr>
                <tr><td>Analytics cookies (if consented)</td><td>Up to 2 years (Google Analytics default)</td></tr>
              </tbody>
            </table>

            {/* 5 */}
            <h2>5. Who We Share Your Data With</h2>
            <p>We do <strong>not</strong> sell your personal data. We may share data with:</p>
            <ul>
              <li>
                <strong>Resend (email infrastructure)</strong> — processes form submission data to
                deliver notification emails to us. Resend is GDPR-compliant and processes data within
                the EU/EEA. See{' '}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                  resend.com/legal/privacy-policy
                </a>.
              </li>
              <li>
                <strong>Google Analytics</strong> — only if you have given explicit consent via the
                cookie banner. Data may be transferred to the USA under Google&apos;s Standard
                Contractual Clauses. See{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  policies.google.com/privacy
                </a>.
              </li>
              <li>
                <strong>Netlify (hosting)</strong> — our website is hosted on Netlify. Netlify may
                process IP addresses in server logs. See{' '}
                <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">
                  netlify.com/privacy
                </a>.
              </li>
            </ul>
            <p>
              We may disclose personal data if required by law, court order, or competent authority.
            </p>

            {/* 6 */}
            <h2>6. International Transfers</h2>
            <p>
              Your data is processed primarily within the European Economic Area (EEA). Where data
              is transferred outside the EEA (e.g. Google Analytics in the USA), it is protected by
              Standard Contractual Clauses (SCCs) approved by the European Commission under
              Art. 46(2)(c) GDPR.
            </p>

            {/* 7 */}
            <h2>7. Your Rights Under GDPR</h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Right of access</strong> — request a copy of the data we hold about you (Art. 15).</li>
              <li><strong>Right to rectification</strong> — ask us to correct inaccurate data (Art. 16).</li>
              <li><strong>Right to erasure</strong> — ask us to delete your data (&ldquo;right to be forgotten&rdquo;) (Art. 17).</li>
              <li><strong>Right to restriction</strong> — ask us to restrict processing in certain circumstances (Art. 18).</li>
              <li><strong>Right to data portability</strong> — receive your data in a structured, machine-readable format (Art. 20).</li>
              <li><strong>Right to object</strong> — object to processing based on legitimate interests (Art. 21).</li>
              <li><strong>Right to withdraw consent</strong> — where processing is based on consent, you may withdraw it at any time without affecting prior processing.</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:jobbohemiacz@gmail.com">jobbohemiacz@gmail.com</a> with the subject
              line <em>&ldquo;GDPR Request&rdquo;</em>. We will respond within 30 days.
            </p>

            {/* 8 */}
            <h2>8. Cookies</h2>
            <p>We use the following types of cookies:</p>
            <table className="legal-table">
              <thead>
                <tr><th>Type</th><th>Name / Provider</th><th>Purpose</th><th>Basis</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Essential</td>
                  <td><code>cookie_consent</code> (localStorage)</td>
                  <td>Stores your cookie preference</td>
                  <td>Legitimate interest — always active</td>
                </tr>
                <tr>
                  <td>Analytics</td>
                  <td>Google Analytics (_ga, _gid)</td>
                  <td>Anonymous usage statistics</td>
                  <td>Consent — only after you click Accept</td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>How to manage cookies:</strong> You can change your preference at any time by
              clearing your browser&apos;s localStorage (DevTools → Application → Local Storage →
              delete <code>cookie_consent</code>) and reloading the page. The banner will reappear.
            </p>
            <p>
              You can also control cookies through your browser settings. Note that blocking all
              cookies may affect website functionality.
            </p>

            {/* 9 */}
            <h2>9. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your data,
              including HTTPS encryption, access controls, and minimal data collection. Form
              submissions are transmitted over TLS and processed server-side without being stored in
              a public database.
            </p>

            {/* 10 */}
            <h2>10. Minors</h2>
            <p>
              Our services are not directed at persons under 16 years of age. We do not knowingly
              collect personal data from minors. If you believe a minor has submitted data to us,
              please contact us immediately for deletion.
            </p>

            {/* 11 */}
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo;
              date at the top of this page will reflect any changes. Significant changes will be
              communicated via a notice on the website. Continued use of the site after changes
              constitutes acceptance of the updated policy.
            </p>

            {/* 12 */}
            <h2>12. Complaints</h2>
            <p>
              If you believe we have mishandled your personal data, you have the right to lodge a
              complaint with the Czech supervisory authority:
            </p>
            <address className="legal-address">
              <strong>Úřad pro ochranu osobních údajů (ÚOOÚ)</strong><br />
              Pplk. Sochora 27, 170 00 Praha 7<br />
              Web: <a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">www.uoou.cz</a><br />
              Email: <a href="mailto:posta@uoou.cz">posta@uoou.cz</a>
            </address>
            <p>
              We encourage you to contact us first at{' '}
              <a href="mailto:jobbohemiacz@gmail.com">jobbohemiacz@gmail.com</a> so we can resolve
              any issues directly.
            </p>

            {/* 13 */}
            <h2>13. Contact Us</h2>
            <p>
              For any questions about this Privacy Policy or your personal data, please contact us:
            </p>
            <address className="legal-address">
              <strong>TNT agency s.r.o.</strong><br />
              Na Spravedlnosti 1533, Zelené Předměstí, 530 02 Pardubice<br />
              Email: <a href="mailto:jobbohemiacz@gmail.com">jobbohemiacz@gmail.com</a><br />
              Phone: <a href="tel:+420776858284">+420 776 858 284</a>
            </address>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
