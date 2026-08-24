import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  calculateDeEmployerCost,
  type DeEmployerCostInput,
} from '../lib/calculators/de-employer-cost/engine'
import {
  BUNDESLAND_NAMES,
  type Bundesland,
} from '../lib/calculators/de-employer-cost/tax/church-tax'
import {
  formatEuro,
  formatEuroWhole,
  formatFactor,
  formatPercent,
  parseEuroToCent,
  parsePercent,
} from '../lib/calculators/de-employer-cost/formatting'
import {
  CROSS_LINK,
  CROSS_LINK_PATH,
  ERROR_TEXT,
  ISSUE_TEXT,
  FIELD,
  JURISDICTION_STAMP,
  METHODOLOGY,
  NOTE_TEXT,
  PAGE_KICKER,
  PAGE_TITLE,
  REFUSAL,
  RESULT,
  SECTION,
  t,
} from '../lib/calculators/de-employer-cost/copy'
import { DE_RULES_2026 } from '../data/calculators/de-employer-cost/2026/rules'
import { DECLARED_CASES } from '../lib/calculators/de-employer-cost/unsupported'
import type { DeLocale } from '../lib/calculators/de-employer-cost/types'

/**
 * The German employer-cost calculator.
 *
 * NOTHING LEAVES THIS COMPONENT. No transmission, no storage, no URL writing,
 * no absolute URL of any kind — see lib/calculators/de-employer-cost/privacy.test.ts,
 * which reads this file's source and fails on any of them. A salary, a family
 * situation and a religious affiliation go into these fields; the last of those
 * is special-category data under GDPR Article 9, and the only safe way to hold
 * it is not to move it anywhere.
 *
 * The single link on the page is an internal canonical path with no query
 * string, and that is deliberately the only outbound reference.
 *
 * WHY THE RESULT IS RECOMPUTED RATHER THAN STORED
 * ───────────────────────────────────────────────
 * `useMemo` over the raw inputs, with no result state at all. State that holds
 * a computed result can drift from the inputs that produced it — the user
 * changes a field, an update path is missed, and the page shows a confident
 * figure for a question nobody asked. Recomputing costs nothing here and makes
 * that class of bug impossible rather than unlikely.
 */

export interface DeEmployerCostCalculatorProps {
  readonly locale: DeLocale
}

const LANG: Record<DeLocale, string> = { de: 'de', en: 'en', cs: 'cs' }

const STEUERKLASSEN = [1, 2, 3, 4, 5, 6] as const
const BUNDESLAENDER = Object.keys(BUNDESLAND_NAMES) as Bundesland[]
const KINDERFREIBETRAEGE = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '4'] as const

interface Raw {
  gross: string
  supplement: string
  u1: string
  u2: string
  accident: string
  children: string
}

const EMPTY: Raw = {
  gross: '',
  // The announced average for 2026. A default, labelled as one — the rate that
  // applies to any given employee comes from their own Krankenkasse.
  supplement: '2,9',
  u1: '',
  u2: '',
  accident: '',
  children: '0',
}

export default function DeEmployerCostCalculator({ locale }: DeEmployerCostCalculatorProps) {
  const tr = (copy: Parameters<typeof t>[0]) => t(copy, locale)

  const [raw, setRaw] = useState<Raw>(EMPTY)
  const [steuerklasse, setSteuerklasse] = useState<number>(1)
  const [kinderfreibetraege, setKinderfreibetraege] = useState<string>('0')
  const [workplace, setWorkplace] = useState<Bundesland>('NW')
  const [churchTaxLiable, setChurchTaxLiable] = useState(false)
  const [reducedHealthRate, setReducedHealthRate] = useState(false)
  const [isParent, setIsParent] = useState(false)
  const [atLeast23, setAtLeast23] = useState(true)
  const [smallEmployer, setSmallEmployer] = useState(true)
  const [owesInsolvencyLevy, setOwesInsolvencyLevy] = useState(true)
  const [declared, setDeclared] = useState<string[]>([])

  const set = (key: keyof Raw) => (value: string) => setRaw((r) => ({ ...r, [key]: value }))

  const parsed = useMemo(() => {
    const errors: string[] = []

    const grossCent = parseEuroToCent(raw.gross)
    if (raw.gross.trim() !== '' && grossCent === null) errors.push('gross.unreadable')

    const supplement = parsePercent(raw.supplement)
    if (supplement === null) errors.push('supplement.unreadable')

    const u1 = smallEmployer ? parsePercent(raw.u1 === '' ? '0' : raw.u1) : null
    if (smallEmployer && u1 === null) errors.push('u1.unreadable')

    const u2 = parsePercent(raw.u2 === '' ? '0' : raw.u2)
    if (u2 === null) errors.push('u2.unreadable')

    const accidentCent = raw.accident.trim() === '' ? 0n : parseEuroToCent(raw.accident)
    if (accidentCent === null) errors.push('accident.unreadable')

    return { grossCent, supplement, u1, u2, accidentCent, errors }
  }, [raw, smallEmployer])

  const outcome = useMemo(() => {
    const { grossCent, supplement, u2, accidentCent, errors } = parsed
    if (errors.length > 0 || grossCent === null || supplement === null || u2 === null) return null
    if (accidentCent === null) return null

    const input: DeEmployerCostInput = {
      monthlyGrossCent: grossCent,
      steuerklasse,
      kinderfreibetraege,
      workplace,
      churchTaxLiable,
      healthSupplementPercent: supplement,
      reducedHealthRate,
      care: {
        childrenUnder25: Number(raw.children) || 0,
        isParent,
        atLeast23,
      },
      employer: {
        u1Percent: smallEmployer ? parsed.u1 : null,
        u2Percent: u2,
        owesInsolvencyLevy,
        accidentMonthlyCent: accidentCent,
      },
      declared,
    }
    return calculateDeEmployerCost(input)
  }, [
    parsed,
    steuerklasse,
    kinderfreibetraege,
    workplace,
    churchTaxLiable,
    reducedHealthRate,
    raw.children,
    isParent,
    atLeast23,
    smallEmployer,
    owesInsolvencyLevy,
    declared,
  ])

  const toggleDeclared = (id: string) =>
    setDeclared((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    )

  return (
    // `ecc--de` carries the German calculator's own narrow-viewport rules. The
    // shared `ecc` styles are also used by the Czech calculator, which is
    // production-verified and which this branch may not change, so anything
    // specific to this component hangs off the modifier instead.
    <section className="ecc ecc--de" aria-labelledby="decc-title" lang={LANG[locale]}>
      <div className="container">
        <p className="ecc__stamp">{tr(JURISDICTION_STAMP)}</p>
        <h2 id="decc-title">{tr(PAGE_TITLE)}</h2>
        <p className="ecc__kicker">{tr(PAGE_KICKER)}</p>

        <div className="pcalc__grid">
          <form className="ecc__form" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="pcalc-fieldset">
              <legend>{tr(SECTION.employment)}</legend>

              <div className="pcalc-field">
                <label htmlFor="decc-gross">{tr(FIELD.gross)}</label>
                <div className="pcalc-field__input">
                  <input
                    id="decc-gross"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={raw.gross}
                    onChange={(e) => set('gross')(e.target.value)}
                  />
                  <span className="pcalc-field__suffix">€</span>
                </div>
                <p className="pcalc-field__hint">{tr(FIELD.grossHint)}</p>
              </div>

              <div className="pcalc-grid-2">
                <div className="pcalc-field">
                  <label htmlFor="decc-stkl">{tr(FIELD.steuerklasse)}</label>
                  <select
                    id="decc-stkl"
                    value={steuerklasse}
                    onChange={(e) => setSteuerklasse(Number(e.target.value))}
                  >
                    {STEUERKLASSEN.map((k) => (
                      <option key={k} value={k}>
                        {['I', 'II', 'III', 'IV', 'V', 'VI'][k - 1]}
                      </option>
                    ))}
                  </select>
                  <p className="pcalc-field__hint">{tr(FIELD.steuerklasseHint)}</p>
                </div>

                <div className="pcalc-field">
                  <label htmlFor="decc-land">{tr(FIELD.workplace)}</label>
                  <select
                    id="decc-land"
                    value={workplace}
                    onChange={(e) => setWorkplace(e.target.value as Bundesland)}
                  >
                    {BUNDESLAENDER.map((b) => (
                      <option key={b} value={b}>
                        {BUNDESLAND_NAMES[b]}
                      </option>
                    ))}
                  </select>
                  <p className="pcalc-field__hint">{tr(FIELD.workplaceHint)}</p>
                </div>
              </div>
            </fieldset>

            <fieldset className="pcalc-fieldset">
              <legend>{tr(SECTION.insurance)}</legend>

              <div className="pcalc-field">
                <label htmlFor="decc-kvz">{tr(FIELD.supplement)}</label>
                <div className="pcalc-field__input">
                  <input
                    id="decc-kvz"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={raw.supplement}
                    onChange={(e) => set('supplement')(e.target.value)}
                  />
                  <span className="pcalc-field__suffix">%</span>
                </div>
                <p className="pcalc-field__hint">{tr(FIELD.supplementHint)}</p>
              </div>

              <div className="pcalc-field">
                <label htmlFor="decc-children">{tr(FIELD.children)}</label>
                <input
                  id="decc-children"
                  type="number"
                  min={0}
                  max={12}
                  step={1}
                  value={raw.children}
                  onChange={(e) => set('children')(e.target.value)}
                />
                <p className="pcalc-field__hint">{tr(FIELD.childrenHint)}</p>
              </div>

              <label className="pcalc-toggle">
                <input
                  type="checkbox"
                  checked={isParent}
                  onChange={(e) => setIsParent(e.target.checked)}
                />
                <span>{tr(FIELD.isParent)}</span>
              </label>
              <p className="pcalc-field__hint">{tr(FIELD.isParentHint)}</p>

              <label className="pcalc-toggle">
                <input
                  type="checkbox"
                  checked={atLeast23}
                  onChange={(e) => setAtLeast23(e.target.checked)}
                />
                <span>{tr(FIELD.atLeast23)}</span>
              </label>
            </fieldset>

            <details className="ecc__advanced">
              <summary>{tr(SECTION.advanced)}</summary>
              <p className="pcalc-field__hint">{tr(SECTION.advancedHint)}</p>

              <fieldset className="pcalc-fieldset">
                <legend>{tr(SECTION.tax)}</legend>

                <div className="pcalc-field">
                  <label htmlFor="decc-kfb">{tr(FIELD.kinderfreibetraege)}</label>
                  <select
                    id="decc-kfb"
                    value={kinderfreibetraege}
                    onChange={(e) => setKinderfreibetraege(e.target.value)}
                  >
                    {KINDERFREIBETRAEGE.map((k) => (
                      <option key={k} value={k}>
                        {formatPercent(k, locale).replace(' %', '')}
                      </option>
                    ))}
                  </select>
                  <p className="pcalc-field__hint">{tr(FIELD.kinderfreibetraegeHint)}</p>
                </div>

                <label className="pcalc-toggle">
                  <input
                    type="checkbox"
                    checked={churchTaxLiable}
                    onChange={(e) => setChurchTaxLiable(e.target.checked)}
                  />
                  <span>{tr(FIELD.churchTax)}</span>
                </label>

                <label className="pcalc-toggle">
                  <input
                    type="checkbox"
                    checked={reducedHealthRate}
                    onChange={(e) => setReducedHealthRate(e.target.checked)}
                  />
                  <span>{tr(FIELD.reducedRate)}</span>
                </label>
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{tr(SECTION.employerCosts)}</legend>

                <label className="pcalc-toggle">
                  <input
                    type="checkbox"
                    checked={smallEmployer}
                    onChange={(e) => setSmallEmployer(e.target.checked)}
                  />
                  <span>{tr(FIELD.u1)}</span>
                </label>
                <p className="pcalc-field__hint">{tr(FIELD.u1Hint)}</p>
                {smallEmployer ? (
                  <div className="pcalc-field">
                    <div className="pcalc-field__input">
                      <input
                        aria-label={tr(FIELD.u1)}
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        value={raw.u1}
                        onChange={(e) => set('u1')(e.target.value)}
                      />
                      <span className="pcalc-field__suffix">%</span>
                    </div>
                  </div>
                ) : null}

                <div className="pcalc-field">
                  <label htmlFor="decc-u2">{tr(FIELD.u2)}</label>
                  <div className="pcalc-field__input">
                    <input
                      id="decc-u2"
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      value={raw.u2}
                      onChange={(e) => set('u2')(e.target.value)}
                    />
                    <span className="pcalc-field__suffix">%</span>
                  </div>
                  <p className="pcalc-field__hint">{tr(FIELD.u2Hint)}</p>
                </div>

                <label className="pcalc-toggle">
                  <input
                    type="checkbox"
                    checked={owesInsolvencyLevy}
                    onChange={(e) => setOwesInsolvencyLevy(e.target.checked)}
                  />
                  <span>{tr(FIELD.insolvency)}</span>
                </label>
                <p className="pcalc-field__hint">{tr(FIELD.insolvencyHint)}</p>

                <div className="pcalc-field">
                  <label htmlFor="decc-accident">{tr(FIELD.accident)}</label>
                  <div className="pcalc-field__input">
                    <input
                      id="decc-accident"
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      value={raw.accident}
                      onChange={(e) => set('accident')(e.target.value)}
                    />
                    <span className="pcalc-field__suffix">€</span>
                  </div>
                  <p className="pcalc-field__hint">{tr(FIELD.accidentHint)}</p>
                </div>
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{tr(REFUSAL.heading)}</legend>
                {DECLARED_CASES.map((c) => (
                  <label className="pcalc-toggle" key={c.id}>
                    <input
                      type="checkbox"
                      checked={declared.includes(c.id)}
                      onChange={() => toggleDeclared(c.id)}
                    />
                    <span>{locale === 'de' ? c.labelDe : locale === 'cs' ? c.labelCs : c.labelEn}</span>
                  </label>
                ))}
              </fieldset>
            </details>
          </form>

          <div className="ecc__results" aria-live="polite">
            {parsed.errors.length > 0 ? (
              <ul className="ecc__errors">
                {parsed.errors.map((key) => (
                  <li key={key}>{tr(ERROR_TEXT[key])}</li>
                ))}
              </ul>
            ) : null}

            {outcome === null ? (
              <p className="ecc__empty">{tr(RESULT.empty)}</p>
            ) : outcome.supported === false && outcome.reason === 'invalid' ? (
              // An invalid input is the reader's typo, not a statement about
              // German payroll. It must not look like a refusal.
              <ul className="ecc__errors">
                {outcome.issues.map((i) => (
                  <li key={i.field}>{tr(ISSUE_TEXT[i.key] ?? ISSUE_TEXT['generic'])}</li>
                ))}
              </ul>
            ) : outcome.supported === false ? (
              <div className="ecc__notes">
                <h3>{tr(REFUSAL.heading)}</h3>
                <p>
                  <strong>
                    {locale === 'de'
                      ? outcome.case.labelDe
                      : locale === 'cs'
                        ? outcome.case.labelCs
                        : outcome.case.labelEn}
                  </strong>
                </p>
                <p>
                  {tr(REFUSAL.why)}{' '}
                  {locale === 'de'
                    ? outcome.case.reasonDe
                    : locale === 'cs'
                      ? outcome.case.reasonCs
                      : outcome.case.reasonEn}
                </p>
              </div>
            ) : (
              <>
                <div className="ecc__totals">
                  <div className="ecc__total">
                    <span className="ecc__total-label">{tr(RESULT.employerTotal)}</span>
                    <span className="ecc__total-value">
                      {formatEuro(outcome.employer.totalMonthlyCent, locale)}
                    </span>
                  </div>
                  <div className="ecc__total ecc__total--net">
                    <span className="ecc__total-label">{tr(RESULT.net)}</span>
                    <span className="ecc__total-value">
                      {formatEuro(outcome.employee.netCent, locale)}
                    </span>
                  </div>
                </div>

                <p className="ecc__periodicity">
                  {tr(RESULT.loadFactor)}: {formatFactor(outcome.employer.loadFactor, locale)} ·{' '}
                  {tr(RESULT.employerTotalAnnual)}:{' '}
                  {formatEuroWhole(outcome.employer.totalAnnualCent, locale)}
                </p>

                {/*
                  The statutory basis for each branch is NOT repeated in this
                  table. It lives in the methodology block below, which is
                  rendered unconditionally — so a crawler and a no-JS reader see
                  it too, which a results table cannot deliver.

                  It was briefly here as well, and put a long citation inside a
                  narrow cell: the table's min-content rose to 663 px and dragged
                  the whole container past the viewport at 320 px and 360 px.
                */}
                <div className="ecc__table-wrap">
                <table className="ecc__table">
                  <thead>
                    <tr>
                      <th scope="col">{tr(SECTION.insurance)}</th>
                      <th scope="col">{tr(RESULT.employerShare)}</th>
                      <th scope="col">{tr(RESULT.employeeShare)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outcome.contributions.map((c) => (
                      <tr key={c.key}>
                        <th scope="row">
                          {c.label[locale]}
                          {c.baseCent < outcome.monthlyGrossCent && c.baseCent > 0n ? (
                            <span className="ecc__flow-pct">
                              {' '}
                              — {tr(RESULT.cappedAt)} {formatEuro(c.baseCent, locale)}
                            </span>
                          ) : null}
                        </th>
                        <td>
                          {formatEuro(c.employerCent, locale)}
                          {c.employerRatePercent !== '0' ? (
                            <span className="ecc__flow-pct">
                              {' '}
                              ({formatPercent(c.employerRatePercent, locale)})
                            </span>
                          ) : null}
                        </td>
                        <td>
                          {c.employeeCent > 0n ? formatEuro(c.employeeCent, locale) : '—'}
                          {c.employeeRatePercent !== '0' ? (
                            <span className="ecc__flow-pct">
                              {' '}
                              ({formatPercent(c.employeeRatePercent, locale)})
                            </span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>

                <div className="ecc__table-wrap">
                <table className="ecc__table ecc__table--metrics">
                  <tbody>
                    <tr>
                      <th scope="row">{tr(RESULT.gross)}</th>
                      <td>{formatEuro(outcome.monthlyGrossCent, locale)}</td>
                    </tr>
                    <tr>
                      <th scope="row">{tr(RESULT.employeeSocial)}</th>
                      <td>−{formatEuro(outcome.employee.socialCent, locale)}</td>
                    </tr>
                    <tr>
                      <th scope="row">{tr(RESULT.lohnsteuer)}</th>
                      <td>−{formatEuro(outcome.employee.lohnsteuerCent, locale)}</td>
                    </tr>
                    <tr>
                      <th scope="row">{tr(RESULT.soli)}</th>
                      <td>−{formatEuro(outcome.employee.soliCent, locale)}</td>
                    </tr>
                    {outcome.employee.churchTaxCent > 0n ? (
                      <tr>
                        <th scope="row">
                          {tr(RESULT.kirchensteuer)}{' '}
                          <span className="ecc__flow-pct">
                            ({formatPercent(outcome.churchTax.ratePercent, locale)})
                          </span>
                        </th>
                        <td>−{formatEuro(outcome.employee.churchTaxCent, locale)}</td>
                      </tr>
                    ) : null}
                    <tr>
                      <th scope="row">{tr(RESULT.deductions)}</th>
                      <td>−{formatEuro(outcome.employee.totalDeductionsCent, locale)}</td>
                    </tr>
                    <tr>
                      <th scope="row">{tr(RESULT.net)}</th>
                      <td>{formatEuro(outcome.employee.netCent, locale)}</td>
                    </tr>
                  </tbody>
                </table>
                </div>

                <p className="ecc__exactness">{tr(RESULT.ledgerNote)}</p>

                {outcome.notes.length > 0 ? (
                  <ul className="ecc__notes">
                    {outcome.notes.map((n) => (
                      <li key={n.key} data-severity={n.severity}>
                        {tr(NOTE_TEXT[n.text])}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            )}
          </div>
        </div>

        <div className="ecc__verified">
          <h3>{tr(METHODOLOGY.heading)}</h3>
          <p>{tr(METHODOLOGY.taxSource)}</p>
          <p>{tr(METHODOLOGY.socialSource)}</p>
          <p>{tr(METHODOLOGY.privacy)}</p>
          <p>{tr(METHODOLOGY.notAdvice)}</p>
          {/*
            The statutory bases, rendered ALWAYS rather than only beside a
            result. All three pages promise "the statute named for every figure";
            until this list existed that was true only after the reader entered a
            salary, so a no-JS reader and a crawler saw the promise and not the
            substance.
          */}
          <dl className="ecc__periodicity">
            <dt>{tr(METHODOLOGY.basisPension)}</dt>
            <dd>{DE_RULES_2026.pension.totalPercent.legalBasis}</dd>
            <dt>{tr(METHODOLOGY.basisUnemployment)}</dt>
            <dd>{DE_RULES_2026.unemployment.totalPercent.legalBasis}</dd>
            <dt>{tr(METHODOLOGY.basisHealth)}</dt>
            <dd>{DE_RULES_2026.health.generalPercent.legalBasis}; § 242 SGB V; § 249 Absatz 1 SGB V</dd>
            <dt>{tr(METHODOLOGY.basisCare)}</dt>
            <dd>{DE_RULES_2026.care.basePercent.legalBasis}; § 55 Absatz 3 SGB XI; § 58 SGB XI</dd>
            <dt>{tr(METHODOLOGY.basisLevies)}</dt>
            <dd>{DE_RULES_2026.insolvencyLevy.percent.legalBasis}; § 1, § 7 AAG; §§ 150, 153 SGB VII</dd>
            <dt>{tr(METHODOLOGY.basisTax)}</dt>
            <dd>§ 39b Absatz 2 und 6 EStG; § 32a EStG; § 51a EStG</dd>
          </dl>

          <dl className="ecc__periodicity">
            <dt>{tr(METHODOLOGY.ceilingHealth)}</dt>
            <dd>{formatEuro(DE_RULES_2026.health.monthlyCeilingCent.value, locale)}</dd>
            <dt>{tr(METHODOLOGY.ceilingPension)}</dt>
            <dd>{formatEuro(DE_RULES_2026.pension.monthlyCeilingCent.value, locale)}</dd>
            {/*
              The Jahresarbeitsentgeltgrenze is rendered BESIDE the ceilings and
              labelled as not being one. All three pages tell the reader these
              two numbers are constantly confused and that the calculator keeps
              them apart — a claim that was untrue of the calculator itself
              until this figure appeared here.
            */}
            <dt>{tr(METHODOLOGY.insuranceThreshold)}</dt>
            <dd>{formatEuroWhole(DE_RULES_2026.scope.insuranceObligationAnnualCent.value, locale)}</dd>
            <dt>{tr(METHODOLOGY.minijobThreshold)}</dt>
            <dd>{formatEuro(DE_RULES_2026.scope.minijobMonthlyCent.value, locale)}</dd>
            <dt>{tr(METHODOLOGY.transitionThreshold)}</dt>
            <dd>{formatEuro(DE_RULES_2026.scope.transitionUpperMonthlyCent.value, locale)}</dd>
          </dl>
        </div>

        <p className="ecc__crosslink">
          <Link href={CROSS_LINK_PATH[locale]}>{tr(CROSS_LINK.label)}</Link>
        </p>
      </div>
    </section>
  )
}
