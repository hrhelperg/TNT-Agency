import { useLang, pick } from '../lib/i18n/react'
import {
  PROCESS_EYEBROW,
  PROCESS_HEADING,
  PROCESS_SUB,
  PROCESS_STEPS,
} from '../lib/content/recruitment-process'

// Server-rendered "how it works" for employers.
//
// The three steps existed only in the client-side dictionary, rendered into an
// empty <div id="processSteps"> on /agencies — so the server HTML answered none
// of "what happens after I get in touch". This renders the same steps as real
// markup, on the surfaces a buying employer actually lands on.
//
// SSR-safe like the other React islands: useLang() returns 'cs' during SSR and
// on first client render, which matches <html lang="cs">, so there is no
// hydration mismatch and the Czech default is what a crawler sees.

export default function RecruitmentProcess({ headingId = 'jak-to-funguje' }: { headingId?: string }) {
  const lang = useLang()
  const steps = pick(lang, PROCESS_STEPS)

  return (
    <section className="section rproc" aria-labelledby={headingId}>
      <div className="container">
        <div className="section-head fi">
          <div className="eyebrow">{pick(lang, PROCESS_EYEBROW)}</div>
          <h2 id={headingId}>{pick(lang, PROCESS_HEADING)}</h2>
          <p>{pick(lang, PROCESS_SUB)}</p>
        </div>
        <ol className="rproc__steps">
          {steps.map((s) => (
            <li className="rproc__step" key={s.num}>
              <div className="rproc__num" aria-hidden="true">{s.num}</div>
              <h3 className="rproc__title">{s.title}</h3>
              <p className="rproc__desc">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
