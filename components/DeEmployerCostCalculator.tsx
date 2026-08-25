import { useMemo, useState } from 'react'
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
  ERROR_FIELD,
  ISSUE_FIELD,
  PARSE_ERROR_CONTROL,
  ISSUE_CONTROL,
  ERROR_TEXT,
  ISSUE_TEXT,
  FIELD,
  NOTE_TEXT,
  REFUSAL,
  RESULT,
  SECTION,
  t,
} from '../lib/calculators/de-employer-cost/copy'
import { validateDeInput } from '../lib/calculators/de-employer-cost/validation'
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

/** Alphabetical in the reader's own language, not in German. */
const sortedBundeslaender = (locale: DeLocale): Bundesland[] =>
  [...BUNDESLAENDER].sort((a, b) =>
    BUNDESLAND_NAMES[a][locale].localeCompare(BUNDESLAND_NAMES[b][locale], locale),
  )
const KINDERFREIBETRAEGE = ['0', '0.5', '1', '1.5', '2', '2.5', '3', '4'] as const

interface Raw {
  gross: string
  supplement: string
  u1: string
  u2: string
  accident: string
  children: string
}

/**
 * The announced 2026 average, written the way the reader's own page writes
 * numbers.
 *
 * It was a hard-coded '2,9' on all three routes, so the English page showed a
 * German decimal comma in a control whose own hint one line below said "2.9 %"
 * — on the one route whose parser contract is that a lone dot is the decimal
 * separator. No wrong number resulted (parsePercent normalises either
 * separator), but a form that contradicts itself about its own notation is
 * teaching the reader the wrong thing about what it will accept.
 */
const empty = (locale: DeLocale): Raw => ({
  gross: '',
  supplement: formatPercent(DE_RULES_2026.health.averageSupplementPercent.value, locale).replace(' %', ''),
  u1: '',
  u2: '',
  accident: '',
  children: '0',
})

export default function DeEmployerCostCalculator({ locale }: DeEmployerCostCalculatorProps) {
  const tr = (copy: Parameters<typeof t>[0]) => t(copy, locale)

  const [raw, setRaw] = useState<Raw>(() => empty(locale))
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

    const grossCent = parseEuroToCent(raw.gross, locale)
    if (raw.gross.trim() !== '' && grossCent === null) errors.push('gross.unreadable')

    const supplement = parsePercent(raw.supplement)
    if (supplement === null) errors.push('supplement.unreadable')

    const u1 = smallEmployer ? parsePercent(raw.u1 === '' ? '0' : raw.u1) : null
    if (smallEmployer && u1 === null) errors.push('u1.unreadable')

    const u2 = parsePercent(raw.u2 === '' ? '0' : raw.u2)
    if (u2 === null) errors.push('u2.unreadable')

    const accidentCent = raw.accident.trim() === '' ? 0n : parseEuroToCent(raw.accident, locale)
    if (accidentCent === null) errors.push('accident.unreadable')

    return { grossCent, supplement, u1, u2, accidentCent, errors }
  }, [raw, smallEmployer])

  /**
   * The input as far as it could be read, with a neutral stand-in for anything
   * that could not.
   *
   * IT EXISTS SO THE FIELDS THAT DID PARSE CAN STILL BE VALIDATED. Before this,
   * a single unreadable field returned null from the outcome memo, so
   * validateDeInput never ran at all: with a bad accident amount, a 99 %
   * Zusatzbeitrag and 25 children entered at once, the reader was shown ONE
   * message and the other two did not appear anywhere on the page. They
   * reappeared only after fixing the first — which is the opposite of what a
   * form should do, and the opposite of what clause 5 requires.
   *
   * The stand-ins never reach a result: `outcome` is still null whenever
   * anything failed to parse, so nothing is computed from a placeholder.
   */
  const candidate = useMemo<DeEmployerCostInput>(() => {
    const { grossCent, supplement, u1, u2, accidentCent } = parsed
    return {
      monthlyGrossCent: grossCent ?? 0n,
      steuerklasse,
      kinderfreibetraege,
      workplace,
      churchTaxLiable,
      healthSupplementPercent: supplement ?? '0',
      reducedHealthRate,
      care: {
        childrenUnder25: Number(raw.children) || 0,
        isParent,
        atLeast23,
      },
      employer: {
        u1Percent: smallEmployer ? (u1 ?? '0') : null,
        u2Percent: u2 ?? '0',
        owesInsolvencyLevy,
        accidentMonthlyCent: accidentCent ?? 0n,
      },
      declared,
    }
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

  const outcome = useMemo(
    () =>
      parsed.errors.length > 0 || parsed.grossCent === null
        ? null
        : calculateDeEmployerCost(candidate),
    [parsed, candidate],
  )

  /**
   * Every field currently at fault, from BOTH layers, in one list.
   *
   * Parse failures (formatting.ts) and engine validation issues
   * (validation.ts) are different mechanisms and were rendered by mutually
   * exclusive branches. They are one list to a reader, so they are one list
   * here. A field that failed to parse is not reported twice: its placeholder
   * would otherwise produce a second, misleading complaint about a value the
   * reader never typed.
   */
  const problems = useMemo(() => {
    const rows = parsed.errors.map((key) => ({
      control: PARSE_ERROR_CONTROL[key],
      field: ERROR_FIELD[key],
      text: ERROR_TEXT[key],
    }))
    const already = new Set(rows.map((r) => r.control))
    const issues =
      parsed.errors.length > 0
        ? validateDeInput(candidate)
        : outcome !== null && outcome.supported === false && outcome.reason === 'invalid'
          ? outcome.issues
          : []
    for (const i of issues) {
      const control = ISSUE_CONTROL[i.field] ?? 'gross'
      if (already.has(control)) continue
      already.add(control)
      rows.push({
        control,
        field: ISSUE_FIELD[i.field] ?? FIELD.gross,
        text: ISSUE_TEXT[i.key] ?? ISSUE_TEXT['generic'],
      })
    }
    return rows
  }, [parsed, outcome, candidate])

  /**
   * Which control each message belongs to, so the input can point at it.
   *
   * Not one input carried aria-invalid or aria-describedby: the messages lived
   * in a separate live region with no programmatic relationship to the field at
   * fault, so a screen-reader user sitting on the offending control was told
   * nothing at all. The ids below are what make that relationship exist.
   */
  // An INVALID outcome never reaches the render below: `problems` is non-empty
  // whenever the engine reports one, so that branch is taken first. Narrowing
  // here says so in the types instead of relying on the reader to notice.
  const refusal =
    outcome !== null && outcome.supported === false && outcome.reason === 'unsupported'
      ? outcome.case
      : null
  const result = outcome !== null && outcome.supported ? outcome : null

  const faulty = new Set(problems.map((p) => p.control))
  const errorId = (control: string) => (faulty.has(control) ? `decc-err-${control}` : undefined)
  const invalid = (control: string) => (faulty.has(control) ? true : undefined)

  const toggleDeclared = (id: string) =>
    setDeclared((current) =>
      current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
    )

  return (
    // ONLY the interactive grid. The heading, methodology, ceilings, statutory
    // bases and cross-link live in DeEmployerCostCalculatorBoundary, which
    // renders on the server so they survive on a browser that cannot load this
    // file at all. This component is reached exclusively through that boundary's
    // dynamic import, and only after BigInt has been shown to exist.
        <div className="pcalc__grid">
          <form className="ecc__form" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="pcalc-fieldset">
              <legend>{tr(SECTION.employment)}</legend>

              <div className="pcalc-field">
                <label htmlFor="decc-gross">{tr(FIELD.gross)}</label>
                <div className="pcalc-field__input">
                  <input
                    id="decc-gross"
                    aria-invalid={invalid('gross')}
                    aria-describedby={errorId('gross')}
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
                    aria-invalid={invalid('steuerklasse')}
                    aria-describedby={errorId('steuerklasse')}
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
                    aria-invalid={invalid('workplace')}
                    aria-describedby={errorId('workplace')}
                    value={workplace}
                    onChange={(e) => setWorkplace(e.target.value as Bundesland)}
                  >
                    {sortedBundeslaender(locale).map((b) => (
                      <option key={b} value={b}>
                        {BUNDESLAND_NAMES[b][locale]}
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
                    aria-invalid={invalid('supplement')}
                    aria-describedby={errorId('supplement')}
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
                  aria-invalid={invalid('children')}
                  aria-describedby={errorId('children')}
                  type="number"
                  min={0}
                  max={20}
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
                    aria-invalid={invalid('kinderfreibetraege')}
                    aria-describedby={errorId('kinderfreibetraege')}
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

              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{tr(SECTION.insuranceAdvanced)}</legend>

                {/*
                  The ermäßigter Beitragssatz of § 243 SGB V is a HEALTH rate,
                  and it sat under the legend "Wage tax" in all three locales —
                  offering what read as a reduced tax rate. It changes the
                  health contribution from 14,6 % to 14,0 %, so it belongs to
                  the branch it changes.
                */}
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
                        aria-label={tr(FIELD.u1Rate)}
                      aria-invalid={invalid('u1')}
                      aria-describedby={errorId('u1')}
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
                      aria-invalid={invalid('u2')}
                      aria-describedby={errorId('u2')}
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
                      aria-invalid={invalid('accident')}
                      aria-describedby={errorId('accident')}
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

          {/*
            role="region", not role="status".
            
            role="status" implies aria-atomic="true", so every keystroke queued
            the WHOLE block — two tables, both totals and all notes — for
            re-announcement as one flat string. A live region that announces
            everything on every change is a live region a reader turns off. With
            the implicit atomicity gone, assistive technology announces the
            nodes that actually changed, and the name below still identifies the
            region when a reader navigates to it deliberately.
          */}
          <div className="ecc__results" aria-live="polite" role="region" aria-label={tr(RESULT.results)}>
            {problems.length > 0 ? (
              <ul className="ecc__errors">
                {/*
                  Each message names its own field AND carries the id the field
                  points at. Without the label the reader is told "please enter
                  an amount in euro" with four amount fields on screen; without
                  the id a screen-reader user on the offending control hears
                  nothing, because the list is in a different subtree.
                */}
                {problems.map((p) => (
                  <li key={p.control} id={`decc-err-${p.control}`}>
                    <strong>{tr(p.field)}:</strong> {tr(p.text)}
                  </li>
                ))}
              </ul>
            ) : outcome === null ? (
              /*
                Only when the gross is genuinely missing. `outcome` is null for
                ANY unreadable field, and this line speaks solely about the
                gross — so a bad accident-insurance amount used to display
                "enter a monthly gross" beside a gross that was already there
                and already valid. The one field named on screen was the one
                field that was correct.
              */
              <p className="ecc__empty">{tr(RESULT.empty)}</p>
            ) : refusal !== null ? (
              <div className="ecc__notes">
                <h3>{tr(REFUSAL.heading)}</h3>
                <p>
                  <strong>
                    {locale === 'de'
                      ? refusal.labelDe
                      : locale === 'cs'
                        ? refusal.labelCs
                        : refusal.labelEn}
                  </strong>
                </p>
                <p>
                  {tr(REFUSAL.why)}{' '}
                  {locale === 'de'
                    ? refusal.reasonDe
                    : locale === 'cs'
                      ? refusal.reasonCs
                      : refusal.reasonEn}
                </p>
              </div>
            ) : result !== null ? (
              <>
                <div className="ecc__totals">
                  <div className="ecc__total">
                    <span className="ecc__total-label">{tr(RESULT.employerTotal)}</span>
                    <span className="ecc__total-value">
                      {formatEuro(result.employer.totalMonthlyCent, locale)}
                    </span>
                  </div>
                  <div className="ecc__total ecc__total--net">
                    <span className="ecc__total-label">{tr(RESULT.net)}</span>
                    <span className="ecc__total-value">
                      {formatEuro(result.employee.netCent, locale)}
                    </span>
                  </div>
                </div>

                <p className="ecc__periodicity">
                  {tr(RESULT.loadFactor)}: {formatFactor(result.employer.loadFactor, locale)} ·{' '}
                  {tr(RESULT.employerTotalAnnual)}:{' '}
                  {formatEuroWhole(result.employer.totalAnnualCent, locale)}
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
                {/*
                  A NAMED LANDMARK, NOT A SCROLL CONTAINER.

                  It carried `tabIndex={0}` because the stylesheet declared
                  `overflow-x: auto` and axe reports a mouse-only scroll region
                  as `scrollable-region-focusable`. The overflow never occurred —
                  measured 0 at thirteen widths in three languages — so the tab
                  stop was inert, and at 280 px it scrolled a container taller
                  than the viewport underneath the cookie banner. The overflow
                  declaration and the tab stop are both gone; the role and the
                  name stay, because a reader navigating by landmark should
                  still be able to find each table.
                */}
                <div className="ecc__table-wrap" role="region" aria-label={tr(SECTION.insurance)}>
                <table className="ecc__table">
                  <thead>
                    <tr>
                      <th scope="col">{tr(SECTION.insurance)}</th>
                      <th scope="col">{tr(RESULT.employerShare)}</th>
                      <th scope="col">{tr(RESULT.employeeShare)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.contributions.map((c) => (
                      <tr key={c.key}>
                        <th scope="row">
                          {c.label[locale]}
                          {c.baseCent < result.monthlyGrossCent && c.baseCent > 0n ? (
                            <span className="ecc__flow-pct">
                              {' '}
                              — {tr(RESULT.cappedAt)} {formatEuro(c.baseCent, locale)}
                            </span>
                          ) : null}
                        </th>
                        <td data-label={tr(RESULT.employerShare)}>
                          {formatEuro(c.employerCent, locale)}
                          {c.employerRatePercent !== '0' ? (
                            <span className="ecc__flow-pct">
                              {' '}
                              ({formatPercent(c.employerRatePercent, locale)})
                            </span>
                          ) : null}
                        </td>
                        <td data-label={tr(RESULT.employeeShare)}>
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

                <div className="ecc__table-wrap" role="region" aria-label={tr(RESULT.breakdown)}>
                <table className="ecc__table ecc__table--metrics">
                  <tbody>
                    <tr>
                      <th scope="row">{tr(RESULT.gross)}</th>
                      <td>{formatEuro(result.monthlyGrossCent, locale)}</td>
                    </tr>
                    <tr>
                      <th scope="row">{tr(RESULT.employeeSocial)}</th>
                      <td>−{formatEuro(result.employee.socialCent, locale)}</td>
                    </tr>
                    <tr>
                      <th scope="row">{tr(RESULT.lohnsteuer)}</th>
                      <td>−{formatEuro(result.employee.lohnsteuerCent, locale)}</td>
                    </tr>
                    <tr>
                      <th scope="row">{tr(RESULT.soli)}</th>
                      <td>−{formatEuro(result.employee.soliCent, locale)}</td>
                    </tr>
                    {result.employee.churchTaxCent > 0n ? (
                      <tr>
                        <th scope="row">
                          {tr(RESULT.kirchensteuer)}{' '}
                          <span className="ecc__flow-pct">
                            ({formatPercent(result.churchTax.ratePercent, locale)})
                          </span>
                        </th>
                        <td>−{formatEuro(result.employee.churchTaxCent, locale)}</td>
                      </tr>
                    ) : null}
                    <tr>
                      <th scope="row">{tr(RESULT.deductions)}</th>
                      <td>−{formatEuro(result.employee.totalDeductionsCent, locale)}</td>
                    </tr>
                    <tr>
                      <th scope="row">{tr(RESULT.net)}</th>
                      <td>{formatEuro(result.employee.netCent, locale)}</td>
                    </tr>
                  </tbody>
                </table>
                </div>

                <p className="ecc__exactness">{tr(RESULT.ledgerNote)}</p>

                {result.notes.length > 0 ? (
                  <ul className="ecc__notes">
                    {result.notes.map((n) => (
                      <li key={n.key} data-severity={n.severity}>
                        {tr(NOTE_TEXT[n.text])}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
  )
}
