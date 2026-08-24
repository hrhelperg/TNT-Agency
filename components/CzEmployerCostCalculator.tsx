import { useMemo, useState } from 'react'
import { useLang } from '../lib/i18n/react'
import {
  calculate,
  createDefaultInput,
  CZ_2026,
  daysInMonth,
} from '../lib/calculators/cz-employer-cost/engine'
import {
  formatCzk,
  formatCzkSigned,
  formatPerMille,
  formatPercent,
  formatRatioPercent,
  type CalculatorLocale,
} from '../lib/calculators/cz-employer-cost/formatting'
import {
  EXACTNESS_NOTICE,
  INPUT_LABELS,
  JURISDICTION_STAMP,
  PAGE_KICKER,
  VALIDATION_MESSAGES,
} from '../lib/calculators/cz-employer-cost/copy'
import { ENGINE_NOTES, RESULT_LABELS } from '../lib/calculators/cz-employer-cost/notes-copy'
import { ADDITIONAL_COSTS } from '../lib/calculators/cz-employer-cost/additional-costs'
import { validateInput } from '../lib/calculators/cz-employer-cost/validation'
import { ACCESSED, SOURCE_AUTHORITIES } from '../data/calculators/cz-employer-cost/2026/sources'
import type {
  DisabilityStatus,
  EmployerCostInput,
  EmployerDiscountCategory,
  HealthMinimumSituation,
} from '../lib/calculators/cz-employer-cost/types'

// Czech employer-cost and net-salary calculator, 2026.
//
// PRIVACY — the constraint this component is built around.
//
// Everything typed here is either a salary or a fact about a person's health,
// disability, family or tax status. Under GDPR Art. 9 the disability and ZTP/P
// fields are special-category data. So the numbers live in React state and
// nowhere else: no fetch, no XHR, no sendBeacon, no WebSocket, no gtag or
// dataLayer, no cookie, no localStorage, no sessionStorage, no IndexedDB, and
// nothing is ever written to the URL, the hash or history.
//
// This is not a theoretical concern here. The agency payroll calculator on this
// site once base64'd its whole input — including taxProfile.disability and
// children[].ztpp — into a `?d=` parameter for a share link, and WebmasterID's
// page_view transmits `url`, so merely OPENING a shared link handed that blob to
// a third-party endpoint. Both halves are gone, lib/privacy/url-policy.ts
// neutralises links already in the wild, and
// lib/calculators/cz-employer-cost/privacy.test.ts reads THIS FILE's source and
// fails if a transmission is ever added back.
//
// There is deliberately no share button and no "copy link". §39 allows a
// cross-link to the Cost of Vacancy tool, and it is a plain link to a clean
// path — the figure does not travel with it.
//
// STYLING reuses the .pcalc-* classes the agency calculator established, so the
// two calculators look like one product. Only genuinely new furniture — the two
// headline totals, the money-flow bars, the notes list — gets .ecc-* classes.

const CROSS_LINK_PATH: Record<CalculatorLocale, string> = {
  cs: '/cena-neobsazene-pozice',
  en: '/en/cost-of-vacancy',
  de: '/de/kosten-unbesetzter-stellen',
}

const SECTION_COPY = {
  simple: { cs: 'Základní údaje', en: 'Basic details', de: 'Grunddaten' },
  advanced: { cs: 'Rozšířené nastavení', en: 'Advanced settings', de: 'Erweiterte Einstellungen' },
  advancedHint: {
    cs: 'Otevřete jen tehdy, řešíte-li konkrétní případ — výchozí nastavení odpovídá běžnému zaměstnanci.',
    en: 'Open only for a specific case — the defaults describe an ordinary employee.',
    de: 'Nur für einen konkreten Fall öffnen — die Voreinstellungen beschreiben einen gewöhnlichen Beschäftigten.',
  },
  notes: { cs: 'Co je třeba vědět k tomuto výpočtu', en: 'What to know about this calculation', de: 'Was zu dieser Berechnung zu wissen ist' },
  sources: { cs: 'Ověřeno k', en: 'Verified on', de: 'Geprüft am' },
  crossLink: {
    cs: 'Spočítat, co stojí neobsazená pozice',
    en: 'Calculate what an unfilled position costs',
    de: 'Berechnen, was eine unbesetzte Stelle kostet',
  },
  crossLinkNote: {
    cs: 'Výsledek se nepřenáší — kalkulačky spolu nesdílejí žádná data. Částku si případně zadejte ručně.',
    en: 'The result is not carried over — the calculators share no data. Enter the figure by hand if you need it there.',
    de: 'Das Ergebnis wird nicht übertragen — die Rechner teilen keine Daten. Geben Sie den Betrag bei Bedarf manuell ein.',
  },
  emptyState: {
    cs: 'Zadejte hrubou mzdu a výpočet se zobrazí.',
    en: 'Enter a gross salary and the calculation appears.',
    de: 'Geben Sie ein Bruttogehalt ein, und die Berechnung erscheint.',
  },
  addCost: { cs: 'Kč / měsíc nebo dle periodicity', en: 'CZK, per its own period', de: 'CZK, je nach Periodizität' },
} as const

type Raw = {
  gross: string
  bonuses: string
  otherTaxable: string
  workingTime: string
  ytd: string
  weeklyHours: string
  fullTimeHours: string
  hoursWorked: string
  customRate: string
  costs: Record<string, string>
}

const EMPTY_RAW: Raw = {
  gross: '',
  bonuses: '',
  otherTaxable: '',
  workingTime: '100',
  ytd: '',
  weeklyHours: '40',
  fullTimeHours: '40',
  hoursWorked: '',
  customRate: '',
  costs: ADDITIONAL_COSTS.reduce((acc, d) => ({ ...acc, [d.key]: '' }), {}),
}

/** Parse a user-typed amount. Blank is zero; anything unparseable is zero and the field shows why. */
function num(value: string): number {
  if (!value.trim()) return 0
  const parsed = Number(value.replace(/\s/g, '').replace(',', '.'))
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

export interface CzEmployerCostCalculatorProps {
  /**
   * Locale of the PAGE, on /en and /de where the URL fixes the language.
   *
   * Omitted on the Czech spine, where the visitor's own language toggle governs
   * and useLang() is the right question. Passing it explicitly on a locked page
   * is what stops an English page rendering Czech labels until hydration.
   */
  readonly locale?: CalculatorLocale
}

export default function CzEmployerCostCalculator({ locale }: CzEmployerCostCalculatorProps) {
  const detected = useLang()
  const lang: CalculatorLocale = locale ?? detected

  const [raw, setRaw] = useState<Raw>(EMPTY_RAW)
  const [residency, setResidency] = useState<'resident' | 'non_resident'>('resident')
  const [declaration, setDeclaration] = useState(true)
  const [basicCredit, setBasicCredit] = useState(true)
  const [disability, setDisability] = useState<DisabilityStatus>('none')
  const [ztpp, setZtpp] = useState(false)
  const [children, setChildren] = useState<Array<{ ztpp: boolean }>>([])
  const [ytdMode, setYtdMode] = useState<'assume_not_reached' | 'explicit_ytd'>('assume_not_reached')
  const [healthSituation, setHealthSituation] = useState<HealthMinimumSituation>('standard')
  const [category, setCategory] = useState<'standard' | 'working_old_age_pensioner'>('standard')
  const [rateClass, setRateClass] = useState<'standard' | 'rescue_services' | 'risk_work'>('standard')
  const [claimDiscount, setClaimDiscount] = useState(false)
  const [discountCategory, setDiscountCategory] = useState<EmployerDiscountCategory>('age_over_55')
  const [liabilityOn, setLiabilityOn] = useState(false)
  const [activityKey, setActivityKey] = useState<string>('other_economic')
  const [useCustomRate, setUseCustomRate] = useState(false)

  const t = (rec: Record<CalculatorLocale, string>) => rec[lang]

  const input: EmployerCostInput = useMemo(() => {
    const base = createDefaultInput(2026, 1)
    const dim = daysInMonth(2026, 1)
    return {
      ...base,
      salary: {
        grossMonthlyCzk: num(raw.gross),
        bonusesCzk: num(raw.bonuses),
        otherTaxableCzk: num(raw.otherTaxable),
        workingTimePercent: num(raw.workingTime) || 100,
      },
      taxProfile: {
        residency,
        signedDeclaration: declaration,
        applyBasicCredit: declaration && basicCredit,
        disability,
        ztpp,
        children,
      },
      socialMaximum: { mode: ytdMode, ytdAssessmentBaseCzk: num(raw.ytd) },
      healthMinimum: { situation: healthSituation, applicableDays: dim, daysInMonth: dim },
      employerOptions: {
        employeeCategory: category,
        employerRateClass: rateClass,
        claimEmployerSocialDiscount: claimDiscount,
        employerDiscountCategory: claimDiscount ? discountCategory : null,
        discountFacts: {
          agreedWeeklyHours: num(raw.weeklyHours) || 40,
          fullTimeWeeklyHours: num(raw.fullTimeHours) || 40,
          hoursWorkedThisMonth: num(raw.hoursWorked),
          employmentDaysInMonth: dim,
        },
      },
      liabilityInsurance: {
        enabled: liabilityOn,
        activityKey: useCustomRate ? null : activityKey,
        customRatePerMille: useCustomRate ? num(raw.customRate) : null,
      },
      additionalCosts: Object.fromEntries(
        ADDITIONAL_COSTS.map((d) => [d.key, num(raw.costs[d.key] ?? '')]),
      ),
    }
  }, [
    raw, residency, declaration, basicCredit, disability, ztpp, children, ytdMode,
    healthSituation, category, rateClass, claimDiscount, discountCategory,
    liabilityOn, activityKey, useCustomRate,
  ])

  const validation = useMemo(() => validateInput(input, CZ_2026), [input])
  const result = useMemo(() => calculate(input, CZ_2026), [input])

  const hasGross = input.salary.grossMonthlyCzk > 0 || input.salary.bonusesCzk > 0
  const money = (h: number) => formatCzk(h as never, lang)

  const setField = (key: keyof Omit<Raw, 'costs'>, value: string) =>
    setRaw((r) => ({ ...r, [key]: value }))
  const setCost = (key: string, value: string) =>
    setRaw((r) => ({ ...r, costs: { ...r.costs, [key]: value } }))

  const errors = validation.issues.filter((i) => i.severity === 'error')
  const warnings = validation.issues.filter((i) => i.severity === 'warning')

  // De-duplicate: several modules can raise the same assumption in one pass.
  const notes = useMemo(() => {
    const seen = new Set<string>()
    return result.notes.filter((n) => (seen.has(n.text) ? false : (seen.add(n.text), true)))
  }, [result])

  return (
    <section className="ecc" aria-labelledby="ecc-title" lang={lang}>
      <div className="container">
        <p className="ecc__stamp">{t(JURISDICTION_STAMP)}</p>
        <h2 id="ecc-title">
          {lang === 'cs'
            ? 'Kalkulačka nákladů zaměstnavatele'
            : lang === 'en'
              ? 'Czech employer cost calculator'
              : 'Arbeitgeberkosten-Rechner Tschechien'}
        </h2>
        <p className="ecc__kicker">{t(PAGE_KICKER)}</p>

        <div className="pcalc__grid">
          {/* A calculator has nothing to submit. Blocking submit also stops Enter
              from turning these values into a query string. */}
          <form className="ecc__form" onSubmit={(e) => e.preventDefault()}>
            <fieldset className="pcalc-fieldset">
              <legend>{t(SECTION_COPY.simple)}</legend>

              <div className="pcalc-field">
                <label htmlFor="ecc-gross">{t(INPUT_LABELS['salary.gross'])}</label>
                <div className="pcalc-field__input">
                  <input
                    id="ecc-gross"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={raw.gross}
                    onChange={(e) => setField('gross', e.target.value)}
                  />
                  <span className="pcalc-field__suffix">Kč</span>
                </div>
              </div>

              <div className="pcalc-field">
                <label htmlFor="ecc-residency">{t(INPUT_LABELS['taxProfile.residency'])}</label>
                <select
                  id="ecc-residency"
                  value={residency}
                  onChange={(e) => setResidency(e.target.value as 'resident' | 'non_resident')}
                >
                  <option value="resident">{t(INPUT_LABELS['taxProfile.residency.resident'])}</option>
                  <option value="non_resident">{t(INPUT_LABELS['taxProfile.residency.nonResident'])}</option>
                </select>
              </div>

              <label className="pcalc-toggle">
                <input
                  type="checkbox"
                  checked={declaration}
                  onChange={(e) => setDeclaration(e.target.checked)}
                />
                <span>{t(INPUT_LABELS['taxProfile.signedDeclaration'])}</span>
              </label>

              <label className="pcalc-toggle">
                <input
                  type="checkbox"
                  checked={basicCredit}
                  disabled={!declaration}
                  onChange={(e) => setBasicCredit(e.target.checked)}
                />
                <span>{t(INPUT_LABELS['taxProfile.basicCredit'])}</span>
              </label>

              <div className="pcalc-field">
                <label htmlFor="ecc-children">{t(INPUT_LABELS['taxProfile.children'])}</label>
                <select
                  id="ecc-children"
                  value={String(children.length)}
                  onChange={(e) => {
                    const n = Number(e.target.value)
                    setChildren((prev) =>
                      Array.from({ length: n }, (_, idx) => prev[idx] ?? { ztpp: false }),
                    )
                  }}
                >
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {children.map((child, idx) => (
                <label className="pcalc-toggle" key={`child-${idx}`}>
                  <input
                    type="checkbox"
                    checked={child.ztpp}
                    onChange={(e) =>
                      setChildren((prev) =>
                        prev.map((c, i) => (i === idx ? { ztpp: e.target.checked } : c)),
                      )
                    }
                  />
                  <span>
                    {idx + 1}. {t(INPUT_LABELS['taxProfile.child.ztpp'])}
                  </span>
                </label>
              ))}
            </fieldset>

            <details className="ecc__advanced">
              <summary>{t(SECTION_COPY.advanced)}</summary>
              <p className="pcalc-field__hint">{t(SECTION_COPY.advancedHint)}</p>

              <fieldset className="pcalc-fieldset">
                <legend>{t(INPUT_LABELS['salary.bonuses'])}</legend>
                <div className="pcalc-grid-2">
                  <div className="pcalc-field">
                    <label htmlFor="ecc-bonuses">{t(INPUT_LABELS['salary.bonuses'])}</label>
                    <input id="ecc-bonuses" type="text" inputMode="decimal" autoComplete="off"
                      value={raw.bonuses} onChange={(e) => setField('bonuses', e.target.value)} />
                  </div>
                  <div className="pcalc-field">
                    <label htmlFor="ecc-other">{t(INPUT_LABELS['salary.otherTaxable'])}</label>
                    <input id="ecc-other" type="text" inputMode="decimal" autoComplete="off"
                      value={raw.otherTaxable} onChange={(e) => setField('otherTaxable', e.target.value)} />
                  </div>
                  <div className="pcalc-field">
                    <label htmlFor="ecc-wt">{t(INPUT_LABELS['salary.workingTime'])}</label>
                    <input id="ecc-wt" type="text" inputMode="decimal" autoComplete="off"
                      value={raw.workingTime} onChange={(e) => setField('workingTime', e.target.value)} />
                  </div>
                </div>
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t(INPUT_LABELS['taxProfile.disability'])}</legend>
                <div className="pcalc-field">
                  <label htmlFor="ecc-disability">{t(INPUT_LABELS['taxProfile.disability'])}</label>
                  <select id="ecc-disability" value={disability}
                    onChange={(e) => setDisability(e.target.value as DisabilityStatus)}>
                    <option value="none">{t(INPUT_LABELS['taxProfile.disability.none'])}</option>
                    <option value="first_second">{t(INPUT_LABELS['taxProfile.disability.firstSecond'])}</option>
                    <option value="third">{t(INPUT_LABELS['taxProfile.disability.third'])}</option>
                  </select>
                </div>
                <label className="pcalc-toggle">
                  <input type="checkbox" checked={ztpp} onChange={(e) => setZtpp(e.target.checked)} />
                  <span>{t(INPUT_LABELS['taxProfile.ztpp'])}</span>
                </label>
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t(INPUT_LABELS['socialMaximum.mode'])}</legend>
                <div className="pcalc-field">
                  <select
                    aria-label={t(INPUT_LABELS['socialMaximum.mode'])}
                    value={ytdMode}
                    onChange={(e) => setYtdMode(e.target.value as 'assume_not_reached' | 'explicit_ytd')}
                  >
                    <option value="assume_not_reached">{t(INPUT_LABELS['socialMaximum.assumeNotReached'])}</option>
                    <option value="explicit_ytd">{t(INPUT_LABELS['socialMaximum.explicitYtd'])}</option>
                  </select>
                </div>
                {ytdMode === 'explicit_ytd' && (
                  <div className="pcalc-field">
                    <label htmlFor="ecc-ytd">{t(INPUT_LABELS['socialMaximum.ytdAmount'])}</label>
                    <input id="ecc-ytd" type="text" inputMode="decimal" autoComplete="off"
                      value={raw.ytd} onChange={(e) => setField('ytd', e.target.value)} />
                  </div>
                )}
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t(INPUT_LABELS['healthMinimum.situation'])}</legend>
                <div className="pcalc-field">
                  <select
                    aria-label={t(INPUT_LABELS['healthMinimum.situation'])}
                    value={healthSituation}
                    onChange={(e) => setHealthSituation(e.target.value as HealthMinimumSituation)}
                  >
                    <option value="standard">{t(INPUT_LABELS['healthMinimum.standard'])}</option>
                    <option value="statutory_exemption">{t(INPUT_LABELS['healthMinimum.exemption'])}</option>
                    <option value="employer_obstacle">{t(INPUT_LABELS['healthMinimum.employerObstacle'])}</option>
                    <option value="partial_month">{t(INPUT_LABELS['healthMinimum.partialMonth'])}</option>
                  </select>
                </div>
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t(INPUT_LABELS['employerOptions.category'])}</legend>
                <div className="pcalc-field">
                  <select
                    aria-label={t(INPUT_LABELS['employerOptions.category'])}
                    value={category}
                    onChange={(e) => setCategory(e.target.value as typeof category)}
                  >
                    <option value="standard">{t(INPUT_LABELS['employerOptions.standard'])}</option>
                    <option value="working_old_age_pensioner">
                      {lang === 'cs'
                        ? 'Pracující starobní důchodce'
                        : lang === 'en'
                          ? 'Working old-age pensioner'
                          : 'Erwerbstätiger Altersrentner'}
                    </option>
                  </select>
                </div>
                <div className="pcalc-field">
                  <label htmlFor="ecc-rateclass">
                    {lang === 'cs'
                      ? 'Sazbová skupina zaměstnavatele'
                      : lang === 'en'
                        ? 'Employer rate class'
                        : 'Satzgruppe des Arbeitgebers'}
                  </label>
                  <select id="ecc-rateclass" value={rateClass}
                    onChange={(e) => setRateClass(e.target.value as typeof rateClass)}>
                    {CZ_2026.employerSocialRates.map((r) => (
                      <option key={r.class} value={r.class}>
                        {formatPercent(r.rate.value, lang)} — {r.appliesToCs}
                      </option>
                    ))}
                  </select>
                </div>
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t(INPUT_LABELS['employerOptions.discount'])}</legend>
                <label className="pcalc-toggle">
                  <input type="checkbox" checked={claimDiscount}
                    onChange={(e) => setClaimDiscount(e.target.checked)} />
                  <span>{t(INPUT_LABELS['employerOptions.discountConfirm'])}</span>
                </label>
                {claimDiscount && (
                  <div className="pcalc-grid-2">
                    <div className="pcalc-field">
                      <label htmlFor="ecc-dcat">
                        {lang === 'cs' ? 'Důvod slevy' : lang === 'en' ? 'Ground for the discount' : 'Grund der Ermäßigung'}
                      </label>
                      <select id="ecc-dcat" value={discountCategory}
                        onChange={(e) => setDiscountCategory(e.target.value as EmployerDiscountCategory)}>
                        <option value="age_over_55">55+</option>
                        <option value="parent_of_child_under_10">
                          {lang === 'cs' ? 'Péče o dítě do 10 let' : lang === 'en' ? 'Care of a child under 10' : 'Betreuung eines Kindes unter 10'}
                        </option>
                        <option value="carer_of_close_person">
                          {lang === 'cs' ? 'Péče o osobu blízkou' : lang === 'en' ? 'Care of a close person' : 'Pflege einer nahestehenden Person'}
                        </option>
                        <option value="disability">
                          {lang === 'cs' ? 'Invalidita' : lang === 'en' ? 'Disability' : 'Invalidität'}
                        </option>
                        <option value="under_21">21−</option>
                        <option value="student_preparing">
                          {lang === 'cs' ? 'Studium' : lang === 'en' ? 'Study' : 'Studium'}
                        </option>
                        <option value="retraining">
                          {lang === 'cs' ? 'Rekvalifikace' : lang === 'en' ? 'Retraining' : 'Umschulung'}
                        </option>
                      </select>
                    </div>
                    <div className="pcalc-field">
                      <label htmlFor="ecc-wh">
                        {lang === 'cs' ? 'Sjednaná doba (h/týden)' : lang === 'en' ? 'Agreed hours per week' : 'Vereinbarte Stunden/Woche'}
                      </label>
                      <input id="ecc-wh" type="text" inputMode="decimal" autoComplete="off"
                        value={raw.weeklyHours} onChange={(e) => setField('weeklyHours', e.target.value)} />
                    </div>
                    <div className="pcalc-field">
                      <label htmlFor="ecc-fth">
                        {lang === 'cs' ? 'Stanovená doba (h/týden)' : lang === 'en' ? 'Full-time hours per week' : 'Vollzeitstunden/Woche'}
                      </label>
                      <input id="ecc-fth" type="text" inputMode="decimal" autoComplete="off"
                        value={raw.fullTimeHours} onChange={(e) => setField('fullTimeHours', e.target.value)} />
                    </div>
                    <div className="pcalc-field">
                      <label htmlFor="ecc-hw">
                        {lang === 'cs' ? 'Odpracované hodiny v měsíci' : lang === 'en' ? 'Hours worked this month' : 'Geleistete Stunden im Monat'}
                      </label>
                      <input id="ecc-hw" type="text" inputMode="decimal" autoComplete="off"
                        value={raw.hoursWorked} onChange={(e) => setField('hoursWorked', e.target.value)} />
                    </div>
                  </div>
                )}
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t(INPUT_LABELS['liability.enabled'])}</legend>
                <label className="pcalc-toggle">
                  <input type="checkbox" checked={liabilityOn}
                    onChange={(e) => setLiabilityOn(e.target.checked)} />
                  <span>{t(INPUT_LABELS['liability.enabled'])}</span>
                </label>
                {liabilityOn && (
                  <>
                    <label className="pcalc-toggle">
                      <input type="checkbox" checked={useCustomRate}
                        onChange={(e) => setUseCustomRate(e.target.checked)} />
                      <span>{t(INPUT_LABELS['liability.customRate'])}</span>
                    </label>
                    {useCustomRate ? (
                      <div className="pcalc-field">
                        <label htmlFor="ecc-rate">{t(INPUT_LABELS['liability.customRate'])}</label>
                        <div className="pcalc-field__input">
                          <input id="ecc-rate" type="text" inputMode="decimal" autoComplete="off"
                            value={raw.customRate} onChange={(e) => setField('customRate', e.target.value)} />
                          <span className="pcalc-field__suffix">‰</span>
                        </div>
                      </div>
                    ) : (
                      <div className="pcalc-field">
                        <label htmlFor="ecc-activity">{t(INPUT_LABELS['liability.activity'])}</label>
                        <select id="ecc-activity" value={activityKey}
                          onChange={(e) => setActivityKey(e.target.value)}>
                          {CZ_2026.liabilityInsurance.activities.map((a) => (
                            <option key={a.key} value={a.key}>
                              {formatPerMille(a.ratePerMille, lang)} — {lang === 'cs' ? a.labelCs : lang === 'en' ? a.labelEn : a.labelDe}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t(INPUT_LABELS['additionalCosts.section'])}</legend>
                <p className="pcalc-field__hint">{t(INPUT_LABELS['additionalCosts.taxNotice'])}</p>
                <div className="pcalc-grid-2">
                  {ADDITIONAL_COSTS.map((d) => (
                    <div className="pcalc-field" key={d.key}>
                      <label htmlFor={`ecc-cost-${d.key}`}>
                        {lang === 'cs' ? d.labelCs : lang === 'en' ? d.labelEn : d.labelDe}
                      </label>
                      <input
                        id={`ecc-cost-${d.key}`}
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        value={raw.costs[d.key] ?? ''}
                        onChange={(e) => setCost(d.key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </fieldset>
            </details>
          </form>

          <div className="pcalc__results" role="region" aria-live="polite" aria-label={t(RESULT_LABELS['result.employerHeading'])}>
            {errors.length > 0 && (
              <ul className="ecc__errors">
                {errors.map((e) => (
                  <li key={e.key}>{VALIDATION_MESSAGES[e.key]?.[lang] ?? e.key}</li>
                ))}
              </ul>
            )}

            {!hasGross ? (
              <p className="ecc__empty">{t(SECTION_COPY.emptyState)}</p>
            ) : (
              <>
                <div className="ecc__totals">
                  <div className="ecc__total">
                    <span className="ecc__total-label">{t(RESULT_LABELS['result.statutoryTotal'])}</span>
                    <strong className="ecc__total-value">{money(result.totalStatutoryEmployerCost)}</strong>
                  </div>
                  <div className="ecc__total ecc__total--net">
                    <span className="ecc__total-label">{t(RESULT_LABELS['result.net'])}</span>
                    <strong className="ecc__total-value">{money(result.employeeNet.net)}</strong>
                  </div>
                </div>

                <h3 className="pcalc-results__title">{t(RESULT_LABELS['result.employerHeading'])}</h3>
                <table className="ecc__table">
                  <tbody>
                    <Row label={t(RESULT_LABELS['result.gross'])} value={money(result.employerStatutory.gross)} />
                    <Row label={t(RESULT_LABELS['result.employerSocial'])} value={money(result.employerStatutory.social)} />
                    <Row label={t(RESULT_LABELS['result.employerHealth'])} value={money(result.employerStatutory.health)} />
                    {result.employerStatutory.healthMinimumTopUp > 0 && (
                      <Row label={t(RESULT_LABELS['result.employerHealthTopUp'])} value={money(result.employerStatutory.healthMinimumTopUp)} />
                    )}
                    {result.employerStatutory.liabilityInsurance > 0 && (
                      <Row label={t(RESULT_LABELS['result.employerLiability'])} value={money(result.employerStatutory.liabilityInsurance)} />
                    )}
                    <Row strong label={t(RESULT_LABELS['result.statutoryTotal'])} value={money(result.totalStatutoryEmployerCost)} />
                    {result.companyCosts.monthlyCash > 0 && (
                      <>
                        <Row label={t(RESULT_LABELS['result.companyCosts'])} value={money(result.companyCosts.monthlyCash)} />
                        <Row strong label={t(RESULT_LABELS['result.realTotal'])} value={money(result.totalRealEmployerCost)} />
                      </>
                    )}
                  </tbody>
                </table>

                <h3 className="pcalc-results__title">{t(RESULT_LABELS['result.employeeHeading'])}</h3>
                <table className="ecc__table">
                  <tbody>
                    <Row label={t(RESULT_LABELS['result.gross'])} value={money(result.employeeNet.grossTaxable)} />
                    <Row label={t(RESULT_LABELS['result.employeeSocial'])} value={money(result.employeeNet.social)} />
                    <Row label={t(RESULT_LABELS['result.employeeHealth'])} value={money(result.employeeNet.health)} />
                    {result.employeeNet.healthMinimumTopUp > 0 && (
                      <Row label={t(RESULT_LABELS['result.employeeHealthTopUp'])} value={money(result.employeeNet.healthMinimumTopUp)} />
                    )}
                    <Row label={t(RESULT_LABELS['result.taxBase'])} value={money(result.tax.roundedBase)} />
                    <Row label={t(RESULT_LABELS['result.taxBefore'])} value={money(result.tax.advanceBeforeCredits)} />
                    {result.tax.creditsApplied > 0 && (
                      <Row label={t(RESULT_LABELS['result.taxCredits'])} value={`− ${money(result.tax.creditsApplied)}`} />
                    )}
                    {result.tax.childBenefitApplied > 0 && (
                      <Row label={t(RESULT_LABELS['result.childBenefit'])} value={`− ${money(result.tax.childBenefitApplied)}`} />
                    )}
                    <Row label={t(RESULT_LABELS['result.taxFinal'])} value={money(result.tax.advanceFinal)} />
                    {result.tax.taxBonus > 0 && (
                      <Row label={t(RESULT_LABELS['result.taxBonus'])} value={`+ ${money(result.tax.taxBonus)}`} />
                    )}
                    <Row strong label={t(RESULT_LABELS['result.net'])} value={money(result.employeeNet.net)} />
                  </tbody>
                </table>

                <h3 className="pcalc-results__title">{t(RESULT_LABELS['flow.heading'])}</h3>
                <ul className="ecc__flow">
                  {result.moneyFlow
                    .filter((s) => s.amount !== 0)
                    .map((s) => (
                      <li key={s.key}>
                        <span className="ecc__flow-label">{t(RESULT_LABELS[`flow.${s.key}`])}</span>
                        <span className="ecc__flow-value">
                          {money(s.amount)}
                          {s.percentOfTotal !== null && (
                            <span className="ecc__flow-pct"> · {formatPercent(s.percentOfTotal, lang)}</span>
                          )}
                        </span>
                      </li>
                    ))}
                </ul>

                <table className="ecc__table ecc__table--metrics">
                  <tbody>
                    <Row label={t(RESULT_LABELS['result.aboveGross'])}
                      value={`${formatCzkSigned(result.metrics.statutoryAboveGross as never, lang)}${
                        result.metrics.statutoryAboveGrossPercent !== null
                          ? ` · ${formatPercent(result.metrics.statutoryAboveGrossPercent, lang)}`
                          : ''
                      }`} />
                    <Row label={t(RESULT_LABELS['result.netToGross'])}
                      value={formatRatioPercent(result.employeeNet.net as never, result.gross.grossTaxable as never, lang) ?? '—'} />
                    <Row label={t(RESULT_LABELS['result.costToNet'])}
                      value={formatRatioPercent(result.totalRealEmployerCost as never, result.employeeNet.net as never, lang) ?? '—'} />
                  </tbody>
                </table>

                {(notes.length > 0 || warnings.length > 0) && (
                  <div className="ecc__notes">
                    <h3 className="pcalc-results__title">{t(SECTION_COPY.notes)}</h3>
                    <ul>
                      {warnings.map((w) => (
                        <li key={`w-${w.key}`}>{VALIDATION_MESSAGES[w.key]?.[lang] ?? w.key}</li>
                      ))}
                      {notes.map((n) => (
                        <li key={n.key} data-severity={n.severity}>
                          {ENGINE_NOTES[n.text]?.[lang] ?? n.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            <p className="ecc__exactness">{t(EXACTNESS_NOTICE)}</p>
            <p className="ecc__verified">
              {t(SECTION_COPY.sources)} {ACCESSED} · {SOURCE_AUTHORITIES.join(' · ')}
            </p>

            <p className="ecc__crosslink">
              <a href={CROSS_LINK_PATH[lang]}>{t(SECTION_COPY.crossLink)}</a>
              <span className="pcalc-field__hint"> {t(SECTION_COPY.crossLinkNote)}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <tr className={strong ? 'ecc__row--strong' : undefined}>
      <th scope="row">{label}</th>
      <td>{strong ? <strong>{value}</strong> : value}</td>
    </tr>
  )
}
