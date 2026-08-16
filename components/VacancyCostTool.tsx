import { useMemo, useState } from 'react'
import { useLang, pick } from '../lib/i18n/react'
import {
  FIELDS,
  GROUPS,
  EMPTY_INPUTS,
  parseField,
  computeVacancyCost,
  type FieldName,
  type ParseError,
} from '../lib/vacancy-cost/model'
import * as C from '../lib/vacancy-cost/copy'

// Vacancy-cost decision tool.
//
// PRIVACY — the whole point of this component. Entered values live in React
// state and nowhere else. There is no fetch, no XHR, no sendBeacon, no gtag or
// dataLayer push, no cookie, no localStorage, no sessionStorage, no IndexedDB,
// and nothing is ever written to the URL or history. The employer's numbers are
// commercially sensitive, and the honest way to earn that input is not to
// collect it. lib/vacancy-cost/privacy.test.ts asserts this against the source
// so a later edit cannot quietly add a transmission.
//
// The request CTA is a plain link to the clean canonical path — no query string,
// so the calculated figure cannot ride along into analytics or a referrer.

const REQUEST_PATH = '/poptavka-pracovniku'

export default function VacancyCostTool() {
  const lang = useLang()
  const [raw, setRaw] = useState<Record<FieldName, string>>(
    () => FIELDS.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {} as Record<FieldName, string>),
  )

  const { inputs, errors } = useMemo(() => {
    const values = { ...EMPTY_INPUTS }
    const errs: Partial<Record<FieldName, ParseError>> = {}
    for (const f of FIELDS) {
      const parsed = parseField(raw[f.name])
      values[f.name] = parsed.value
      if (parsed.error) errs[f.name] = parsed.error
    }
    return { inputs: values, errors: errs }
  }, [raw])

  const result = useMemo(() => computeVacancyCost(inputs), [inputs])

  const nf = useMemo(
    () => new Intl.NumberFormat(lang === 'cs' ? 'cs-CZ' : lang === 'de' ? 'de-DE' : 'en-GB', {
      maximumFractionDigits: 2,
    }),
    [lang],
  )
  const money = (n: number) => `${nf.format(n)} Kč`
  const scopeNote = pick(lang, C.SCOPE_NOTE)

  return (
    <section className="vct" aria-labelledby="vct-title">
      <div className="container">
        <h2 id="vct-title">{pick(lang, C.TOOL_TITLE)}</h2>
        <p className="vct__intro">{pick(lang, C.TOOL_INTRO)}</p>
        {scopeNote ? <p className="vct__scope" lang={lang}>{scopeNote}</p> : null}

        <div className="vct__grid">
          <form
            className="vct__form"
            // A calculator has nothing to submit — the result updates as you
            // type. Blocking submit also stops Enter from turning field values
            // into a query string.
            onSubmit={(e) => e.preventDefault()}
          >
            {FIELDS.map((f) => {
              const id = `vct-${f.name}`
              const err = errors[f.name]
              const help = C.FIELD_HELP[f.name]
              const describedBy = [help ? `${id}-help` : null, err ? `${id}-err` : null]
                .filter(Boolean)
                .join(' ')
              return (
                <div className="vct__field" key={f.name}>
                  <label htmlFor={id}>
                    {pick(lang, C.FIELD_LABEL[f.name])}
                    <span className="vct__unit"> ({pick(lang, C.UNIT_LABEL[f.unit])})</span>
                  </label>
                  {help ? (
                    <p className="vct__help" id={`${id}-help`}>
                      {pick(lang, help)}
                    </p>
                  ) : null}
                  <input
                    id={id}
                    name={f.name}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    className={err ? 'vct__input vct__input--error' : 'vct__input'}
                    value={raw[f.name]}
                    placeholder="0"
                    aria-invalid={err ? true : undefined}
                    aria-describedby={describedBy || undefined}
                    onChange={(e) => setRaw((s) => ({ ...s, [f.name]: e.target.value }))}
                  />
                  {err ? (
                    <p className="vct__error" id={`${id}-err`} role="alert">
                      {pick(lang, C.ERROR_TEXT[err])}
                    </p>
                  ) : null}
                </div>
              )
            })}
            <button
              type="button"
              className="btn btn-ghost vct__reset"
              onClick={() => setRaw(FIELDS.reduce((a, f) => ({ ...a, [f.name]: '' }), {} as Record<FieldName, string>))}
            >
              {pick(lang, C.RESET_LABEL)}
            </button>
          </form>

          <output
            className="vct__result"
            aria-live="polite"
            aria-label={pick(lang, C.RESULT_REGION_LABEL)}
          >
            <h3 className="vct__result-title">{pick(lang, C.RESULT_HEADING)}</h3>
            {result.isEmpty ? (
              <p className="vct__empty">{pick(lang, C.EMPTY_STATE)}</p>
            ) : (
              <>
                <table className="vct__table">
                  <tbody>
                    {GROUPS.map((g) => {
                      const line = result.lines.find((l) => l.group === g)
                      if (!line) return null
                      return (
                        <tr key={g}>
                          <th scope="row">{pick(lang, C.GROUP_LABEL[g])}</th>
                          {/* The arithmetic is shown, not just its answer. */}
                          <td className="vct__formula">
                            {line.factors.map((n) => nf.format(n)).join(' × ')}
                          </td>
                          <td className="vct__amount">{money(line.amount)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row">{pick(lang, C.TOTAL_LABEL)}</th>
                      <td />
                      <td className="vct__amount vct__amount--total">{money(result.total)}</td>
                    </tr>
                  </tfoot>
                </table>
                <p className="vct__privacy">{pick(lang, C.PRIVACY_NOTE)}</p>
              </>
            )}
          </output>
        </div>

        <div className="vct__method">
          <h3>{pick(lang, C.METHOD_HEADING)}</h3>
          {pick(lang, C.METHOD_TEXT).map((t) => (
            <p key={t}>{t}</p>
          ))}
          <h3>{pick(lang, C.FEE_HEADING)}</h3>
          {pick(lang, C.FEE_TEXT).map((t) => (
            <p key={t}>{t}</p>
          ))}
          <p className="vct__cta">
            <a className="btn btn-primary" href={REQUEST_PATH} data-request-source="service-page">
              {pick(lang, C.CTA_TEXT)}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
