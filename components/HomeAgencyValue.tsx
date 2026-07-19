import { useLang } from '../lib/i18n/react'
import { AGENCY_VALUE } from '../lib/agency-value/copy'

// Compact homepage agency-value layer shown after the statutory calculator.
// It only explains that statutory payroll is not the whole staffing cost and
// links to the dedicated comparison mode with a NON-SENSITIVE mode hint — never
// any salary or cost value in the URL.
const COMPARE_URL = '/kalkulacka-mzdy-agenturniho-zamestnance?mode=comparison'

export default function HomeAgencyValue() {
  const lang = useLang()
  const c = AGENCY_VALUE[lang]

  return (
    <div className="agv" lang={lang}>
      <div className="section-head fi">
        <div className="eyebrow">{c.avEyebrow}</div>
        <h2>{c.avHeading}</h2>
      </div>
      <div className="agv__grid">
        <ul className="agv__points">
          {c.avPoints.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <div className="agv__benefits">
          <h3 className="agv__benefits-title">{c.benefitsTitle}</h3>
          <ul className="agv__benefits-list">
            {c.benefits.slice(0, 8).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <p className="agv__benefits-note">{c.benefitsNote}</p>
        </div>
      </div>
      <div className="agv__cta-wrap">
        <a className="btn btn-primary btn-lg" href={COMPARE_URL}>{c.avCta}</a>
      </div>
    </div>
  )
}
