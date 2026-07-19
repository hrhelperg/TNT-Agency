import { useLang } from '../lib/i18n/react'
import { AGENCY_VALUE, RESPONSIBILITY_ROWS, type Responsibility } from '../lib/agency-value/copy'

// Indicative responsibility allocation for agency employment (temporary
// assignment) under Czech law. Meaning is carried by text labels (never colour
// alone); every value is qualified and the disclaimer states it depends on law,
// the assignment structure and the contract.

const RESP_CLASS: Record<Responsibility, string> = {
  agency: 'resp-badge--agency',
  client: 'resp-badge--client',
  shared: 'resp-badge--shared',
  depends: 'resp-badge--depends',
}

export default function ResponsibilityMatrix() {
  const lang = useLang()
  const c = AGENCY_VALUE[lang]
  const label = (r: Responsibility) =>
    r === 'agency' ? c.respAgency : r === 'client' ? c.respClient : r === 'shared' ? c.respShared : c.respDepends

  return (
    <section className="resp" lang={lang} aria-labelledby="resp-title">
      <h3 className="resp__title" id="resp-title">{c.respTitle}</h3>
      <p className="resp__intro">{c.respIntro}</p>
      <div className="resp__wrap">
        <table className="resp__table">
          <thead>
            <tr>
              <th scope="col">{c.respColCategory}</th>
              <th scope="col">{c.respColWho}</th>
            </tr>
          </thead>
          <tbody>
            {RESPONSIBILITY_ROWS.map((row) => (
              <tr key={row.key}>
                <th scope="row">{c.cat[row.key]}</th>
                <td>
                  <span className={`resp-badge ${RESP_CLASS[row.resp]}`}>{label(row.resp)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="resp__disclaimer">{c.respDisclaimer}</p>
    </section>
  )
}
