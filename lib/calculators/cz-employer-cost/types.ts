/**
 * Types for the Czech employer-cost & net-salary calculator, tax year 2026.
 *
 * SCOPE
 * ─────
 * Standard Czech employment relationship — pracovní poměr / HPP — only.
 * DPP and DPČ are deliberately absent, and not as an oversight: their 2026
 * participation thresholds, insurance treatment and taxation are a separate
 * ruleset, and §"DO NOT implement DPP/DPČ" of the brief is explicit that a
 * half-verified version of them is worse than their absence. There is no
 * `contractType` field, so no code path can be added later without this
 * decision being revisited on purpose.
 *
 * CONVENTIONS
 * ───────────
 * - Money crossing the engine boundary is `Halere` (integer hundredths of CZK),
 *   from lib/payroll/money.ts. User input is plain CZK numbers and is converted
 *   at the validation boundary, once.
 * - Every rate/threshold is a `Ruled<T>` carrying its source, legal basis and
 *   confidence. Nothing in the engine may read a bare number.
 * - No `any`. No optional field that silently defaults to a tax benefit.
 *
 * THE TWO THINGS THIS ENGINE REFUSES TO DO
 * ────────────────────────────────────────
 * 1. Approximate a rule it cannot model. Where a circumstance is outside what
 *    the verified ruleset covers, the result carries an `unsupported` entry and
 *    the UI says the case requires an individual payroll calculation (§28).
 *    It never returns a number that is nearly right.
 * 2. Guess at facts it was not given. The annual social maximum is cumulative
 *    over a year; a single monthly salary does not contain enough information
 *    to know whether it has been reached. So the engine is told, explicitly,
 *    which assumption it is operating under (§8) rather than picking one.
 */

import type { Halere } from '../../payroll/money';

// ─────────────────────────────────────────────────────────────────────────────
// Provenance
// ─────────────────────────────────────────────────────────────────────────────

/**
 * How well established a rule value is.
 *
 * `unresolved` is a first-class state, not a failure. A rule that could not be
 * established from a primary source is carried as unresolved and excluded from
 * the statutory result — which is the honest outcome, and is what lets the UI
 * distinguish "we checked and it does not apply" from "we did not check".
 */
export type RuleStatus =
  | 'confirmed-official'
  | 'derived-from-official'
  | 'configurable-default'
  | 'unresolved';

export interface Ruled<T> {
  readonly value: T;
  readonly sourceId: string;
  readonly legalBasis: string;
  readonly status: RuleStatus;
  readonly note?: string;
}

/** Statutory rounding, named so each call site declares which rule it is applying. */
export type RoundingRule =
  | 'up_to_czk'
  | 'up_to_hundred_czk'
  | 'nearest_czk'
  | 'down_to_czk'
  | 'none';

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — §5 salary components
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Salary components, kept separate on purpose (§5).
 *
 * Folding these into one "gross" field loses the distinction between contractual
 * salary and variable pay, which is the distinction an employer is usually
 * trying to see. They are summed into the taxable gross by the engine, in one
 * place, so the sum is visible in the audit trail.
 */
export interface SalaryInput {
  /** Contractual monthly gross salary, CZK. */
  readonly grossMonthlyCzk: number;
  /** Monthly bonuses and premiums, CZK. Taxable, and part of both assessment bases. */
  readonly bonusesCzk: number;
  /** Other taxable remuneration, CZK. */
  readonly otherTaxableCzk: number;
  /**
   * Agreed working time as a percentage of full time (100 = full time).
   *
   * Presentational and eligibility-relevant only — it does NOT scale the salary.
   * The employer enters the actual gross they pay; scaling it here would double
   * count against a part-time salary that is already stated as such.
   */
  readonly workingTimePercent: number;
}

export type TaxResidency = 'resident' | 'non_resident';
export type DisabilityStatus = 'none' | 'first_second' | 'third';

export interface ChildEntry {
  /** Holder of a ZTP/P card — doubles that child's benefit. */
  readonly ztpp: boolean;
}

/**
 * §6 employee tax profile.
 *
 * §31: nothing here may default to a benefit the user did not ask for. The safe
 * default is a standard employee with no relief, and `applyBasicCredit` is a
 * separate flag from `signedDeclaration` precisely so that "I signed the
 * declaration" and "I am claiming the basic credit here" stay distinguishable —
 * an employee may have signed with another employer.
 */
export interface TaxProfileInput {
  readonly residency: TaxResidency;
  /** Prohlášení poplatníka signed with THIS employer for this month. */
  readonly signedDeclaration: boolean;
  readonly applyBasicCredit: boolean;
  readonly disability: DisabilityStatus;
  readonly ztpp: boolean;
  /** Ordered — position determines first/second/third-and-further benefit. */
  readonly children: readonly ChildEntry[];
}

/**
 * §8: how the engine should treat the cumulative annual social maximum.
 *
 * A monthly gross salary does not say how much assessment base the employee has
 * already used this year, and the maximum is annual and cumulative. So the mode
 * is stated rather than assumed:
 *
 *   `assume_not_reached`  simple mode. The UI must say, in words, that the
 *                         calculation assumes the annual maximum has not been
 *                         reached. Correct for the overwhelming majority of
 *                         employees and honest about being an assumption.
 *   `explicit_ytd`        advanced mode. The user supplies the assessment base
 *                         already used this calendar year with this employer,
 *                         and the engine stops contributions at the maximum.
 */
export type SocialMaximumMode = 'assume_not_reached' | 'explicit_ytd';

export interface SocialMaximumInput {
  readonly mode: SocialMaximumMode;
  /** Assessment base already used this calendar year, CZK. Read only in `explicit_ytd`. */
  readonly ytdAssessmentBaseCzk: number;
}

/**
 * §13: whether the statutory minimum health assessment base applies, and if the
 * shortfall arises on the employer's side.
 *
 * Not a bare toggle. The minimum does not apply identically to everyone, and
 * who pays the top-up depends on WHY the base is low — a distinction that
 * changes which party the money comes from, not merely the total. The options
 * are therefore situations, not switches.
 *
 *   `standard`            ordinary employee; the minimum applies.
 *   `statutory_exemption` one of the §3(8) categories for whom the minimum does
 *                         not apply. The user confirms which.
 *   `employer_obstacle`   the base is below the minimum because of an obstacle
 *                         on the employer's side. Changes the payer of the
 *                         top-up.
 *   `partial_month`       employment did not last the whole month, so the
 *                         minimum is reduced pro rata.
 */
export type HealthMinimumSituation =
  | 'standard'
  | 'statutory_exemption'
  | 'employer_obstacle'
  | 'partial_month';

export interface HealthMinimumInput {
  readonly situation: HealthMinimumSituation;
  /**
   * Calendar days of the month for which the minimum applies, when
   * `situation` is 'partial_month'. Ignored otherwise.
   */
  readonly applicableDays: number;
  /** Calendar days in the month, for the pro-rata denominator. */
  readonly daysInMonth: number;
}

/**
 * §9 / §10 / §11 employer-side and employee-category options.
 *
 * Each of these is claimed by the user, and each carries conditions the engine
 * cannot see. Where a condition is checkable from the inputs the engine checks
 * it; where it is not, the flag records that the user has confirmed it, and the
 * result says so in the audit trail. A calculator that applies a relief the
 * employee is not entitled to is worse than one that omits it.
 */
export interface EmployerOptionsInput {
  /**
   * The employee's social-insurance category. `standard` unless a verified
   * special class applies. Special classes are NOT applied to ordinary workers.
   */
  readonly employeeCategory: 'standard' | 'working_old_age_pensioner';
  /**
   * The employer's social-insurance rate class.
   *
   * § 5a odst. 1 zákona č. 589/1992 Sb. splits the employer's base into up to
   * three aggregates at different rates. `standard` is the only safe default:
   * the rescue-services and high-risk rates belong to specific work, and
   * applying either to an ordinary employee overstates the employer's cost.
   */
  readonly employerRateClass: 'standard' | 'rescue_services' | 'risk_work';
  /** The user asserts the statutory conditions for the employer discount are met. */
  readonly claimEmployerSocialDiscount: boolean;
  /** Which §7a category is claimed, when the discount is claimed. */
  readonly employerDiscountCategory: EmployerDiscountCategory | null;
  /** Facts the §7a conditions are tested against. Read only when the discount is claimed. */
  readonly discountFacts: EmployerDiscountFacts;
}

/**
 * The measurable facts behind a §7a claim.
 *
 * §7a has conditions of two kinds. These are the ones a calculator can actually
 * test — hours and money. The rest (the care relationship, the study status, who
 * registered the intent with ČSSZ first) are facts about a person and a filing,
 * and no arithmetic reaches them; they stay as the user's attestation.
 */
export interface EmployerDiscountFacts {
  /** Agreed weekly working time, hours. Tested against the 8–30 band. */
  readonly agreedWeeklyHours: number;
  /** The employer's own full-time weekly norm. The agreed time must be strictly shorter. */
  readonly fullTimeWeeklyHours: number;
  /**
   * Hours worked in the month, per § 7a odst. 3 písm. c).
   *
   * Note this is NOT a raw timesheet figure: the (b) and (c) tests count
   * different hours, and leave beyond the statutory entitlement counts for one
   * and not the other. The UI says so; the engine uses what it is given.
   */
  readonly hoursWorkedThisMonth: number;
  /** Calendar days of the employment in the month, for the 138-hour pro-ration. */
  readonly employmentDaysInMonth: number;
}

/**
 * §7a eligible employee categories for the employer social-insurance discount.
 *
 * Enumerated rather than free-text so the engine can apply the per-category
 * conditions — several categories carry a reduced-working-time requirement that
 * one does not.
 */
export type EmployerDiscountCategory =
  | 'age_over_55'
  | 'parent_of_child_under_10'
  | 'carer_of_close_person'
  | 'disability'
  | 'under_21'
  | 'student_preparing'
  | 'retraining';

/**
 * §14: the statutory employer-liability insurance rate.
 *
 * The rate is a property of the EMPLOYER's prevailing economic activity, not of
 * the employee. It is therefore selected once, and its per-employee figure is an
 * allocation of a quarterly aggregate premium — never a bill.
 */
export interface LiabilityInsuranceInput {
  /** Whether to include it in the employer total at all. */
  readonly enabled: boolean;
  /** Chosen activity classification key, or null when a custom rate is entered. */
  readonly activityKey: string | null;
  /**
   * Rate in per mille of the assessment base, entered directly.
   *
   * Read only when `activityKey` is null. Present because the statutory table is
   * long and an employer who knows their own rate should not have to find their
   * row in it.
   */
  readonly customRatePerMille: number | null;
}

export interface PeriodInput {
  readonly year: number;
  /** 1–12. */
  readonly month: number;
}

/** Everything the engine is given. */
export interface EmployerCostInput {
  readonly period: PeriodInput;
  readonly salary: SalaryInput;
  readonly taxProfile: TaxProfileInput;
  readonly socialMaximum: SocialMaximumInput;
  readonly healthMinimum: HealthMinimumInput;
  readonly employerOptions: EmployerOptionsInput;
  readonly liabilityInsurance: LiabilityInsuranceInput;
  /** §17 company-specific costs. Keyed by the additional-costs catalogue. */
  readonly additionalCosts: Readonly<Record<string, number>>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Results
// ─────────────────────────────────────────────────────────────────────────────

/**
 * One computed money line, with enough provenance for the UI to explain it
 * without re-deriving anything.
 *
 * `origin` separates what the law fixes from what the user typed — the
 * distinction §15 and §17 are built around, and the one a reader needs in order
 * to know which figures they could argue with.
 */
export interface LineItem {
  readonly key: string;
  readonly amount: Halere;
  /** Human-readable formula, e.g. "24,8 % z vyměřovacího základu". */
  readonly formula: string;
  readonly rateNote?: string;
  readonly baseNote?: string;
  /** Which statutory rounding was applied, in words. */
  readonly roundingNote?: string;
  readonly sourceId?: string;
  readonly legalBasis?: string;
  readonly origin: 'statutory' | 'user-entered' | 'derived' | 'allocated';
}

/**
 * A circumstance the engine will not model.
 *
 * §28: when a user selects something outside the verified ruleset, the engine
 * does not approximate. It returns one of these, and the UI stops offering a
 * number for the affected part.
 */
export interface UnsupportedCase {
  readonly key: string;
  /** What the user selected or entered that cannot be modelled. */
  readonly circumstance: string;
  /** Why — always a fact about the sourcing, never a vague apology. */
  readonly reason: string;
  /** True when it invalidates the whole result rather than one line. */
  readonly blocksResult: boolean;
}

/** A note the UI must surface — an assumption in force, a condition the user asserted. */
export interface EngineNote {
  readonly key: string;
  readonly severity: 'info' | 'assumption' | 'warning';
  readonly text: string;
}

export interface GrossResult {
  readonly contractualSalary: Halere;
  readonly bonuses: Halere;
  readonly otherTaxable: Halere;
  /** The taxable gross — the base for tax and for both assessment bases. */
  readonly grossTaxable: Halere;
  readonly lines: readonly LineItem[];
}

export interface SocialResult {
  /** Base after the annual maximum is applied. */
  readonly assessmentBase: Halere;
  /** Base before the maximum — equal to `assessmentBase` when the cap did not bind. */
  readonly uncappedBase: Halere;
  readonly employee: Halere;
  readonly employer: Halere;
  /** Employer discount actually applied (§10). Zero when not claimed or not eligible. */
  readonly employerDiscount: Halere;
  /** Employer contribution after the discount. */
  readonly employerNet: Halere;
  readonly maximumReached: boolean;
  readonly mode: SocialMaximumMode;
  readonly lines: readonly LineItem[];
  readonly notes: readonly EngineNote[];
}

/**
 * §13 health insurance, including the minimum-base top-up and — critically —
 * which party bears it.
 *
 * `topUpPaidByEmployee` and `topUpPaidByEmployer` are separate fields rather
 * than one amount plus a payer flag, because both can be non-zero in principle
 * and because a single field invites a UI that shows the total and drops the
 * allocation, which is the defect §13 names.
 */
export interface HealthResult {
  /** Actual assessment base from the gross. */
  readonly actualBase: Halere;
  /** Statutory minimum applicable this month, after any pro-rata reduction. */
  readonly minimumBase: Halere;
  /** Whether the minimum applied at all. */
  readonly minimumApplies: boolean;
  /** Shortfall between actual and minimum. Zero when the actual base is sufficient. */
  readonly shortfall: Halere;
  /**
   * The premium on what was actually earned, before any top-up.
   *
   * Reported separately from the totals so a caller assembling an employer cost
   * cannot accidentally add a top-up twice — once inside `employer` and again
   * from `topUpPaidByEmployer`. The statutory total uses these two fields; the
   * `employee` / `employer` totals below are for display.
   */
  readonly employeeOnActual: Halere;
  readonly employerOnActual: Halere;
  /** Employee's whole health deduction, including any top-up they bear. */
  readonly employee: Halere;
  /** Employer's whole health cost, including any top-up they bear. */
  readonly employer: Halere;
  /** 13,5 % of the shortfall borne by the employee, deducted from net pay. */
  readonly topUpPaidByEmployee: Halere;
  /** 13,5 % of the shortfall borne by the employer, added to employer cost. */
  readonly topUpPaidByEmployer: Halere;
  readonly lines: readonly LineItem[];
  readonly notes: readonly EngineNote[];
}

export interface TaxResult {
  /** Base after statutory rounding. */
  readonly roundedBase: Halere;
  readonly lowerBandTax: Halere;
  readonly upperBandTax: Halere;
  /** Advance after statutory rounding, before any credit. */
  readonly advanceBeforeCredits: Halere;
  /** Personal credits that could be claimed. */
  readonly creditsAvailable: Halere;
  /** Personal credits actually applied — capped at the advance, never a refund. */
  readonly creditsApplied: Halere;
  /** Child benefit applied against remaining tax. */
  readonly childBenefitApplied: Halere;
  /** Child benefit paid out beyond the tax — the monthly tax bonus. Never called salary. */
  readonly taxBonus: Halere;
  /** Final advance withheld. Never negative. */
  readonly advanceFinal: Halere;
  readonly lines: readonly LineItem[];
  readonly notes: readonly EngineNote[];
}

/** §14 result. Deliberately distinguishes the statutory basis from the per-employee allocation. */
export interface LiabilityInsuranceResult {
  readonly included: boolean;
  readonly ratePerMille: number | null;
  readonly activityLabel: string | null;
  /**
   * This employee's assessment base for the quarter — three months of the
   * social assessment base, UNCAPPED by the annual social maximum.
   */
  readonly quarterlyBasisForThisEmployee: Halere;
  /** Premium attributable to this employee for the quarter. */
  readonly quarterlyAllocated: Halere;
  /** One third of the quarterly figure. An allocation, never an invoice. */
  readonly monthlyAllocated: Halere;
  readonly lines: readonly LineItem[];
  readonly notes: readonly EngineNote[];
}

/** §15 employer statutory payroll cost. */
export interface EmployerStatutoryResult {
  readonly gross: Halere;
  readonly social: Halere;
  readonly health: Halere;
  readonly healthMinimumTopUp: Halere;
  readonly liabilityInsurance: Halere;
  readonly total: Halere;
  readonly lines: readonly LineItem[];
}

/** §16 employee net salary. */
export interface EmployeeNetResult {
  readonly grossTaxable: Halere;
  readonly social: Halere;
  readonly health: Halere;
  readonly healthMinimumTopUp: Halere;
  readonly taxAdvance: Halere;
  readonly taxBonus: Halere;
  readonly net: Halere;
  readonly lines: readonly LineItem[];
}

/** §24 derived metrics. Mathematical outputs, not legal rules. */
export interface DerivedMetrics {
  readonly statutoryAboveGross: Halere;
  readonly statutoryAboveGrossPercent: number | null;
  readonly configuredAboveGross: Halere;
  readonly configuredAboveGrossPercent: number | null;
  readonly netToGrossPercent: number | null;
  readonly employerCostToNetPercent: number | null;
}

/** §25 "where does the money go". Slices sum to the total real employer cost. */
export interface MoneyFlowSlice {
  readonly key: 'employee_net' | 'social' | 'health' | 'income_tax' | 'employer_overhead' | 'company_costs';
  readonly amount: Halere;
  readonly percentOfTotal: number | null;
}

/** §22 annual view, built from real periodicity — never monthly × 12. */
export interface AnnualView {
  readonly recurringMonthlyTimesTwelve: Halere;
  readonly quarterlyItems: Halere;
  readonly annualOnlyItems: Halere;
  readonly oneOffItems: Halere;
  readonly totalRealEmployerCost: Halere;
  readonly totalStatutoryEmployerCost: Halere;
  readonly notes: readonly EngineNote[];
}

export interface EmployerCostResult {
  readonly jurisdiction: 'CZ';
  readonly taxYear: number;
  readonly period: PeriodInput;

  readonly gross: GrossResult;
  readonly social: SocialResult;
  readonly health: HealthResult;
  readonly tax: TaxResult;
  readonly liability: LiabilityInsuranceResult;

  readonly employerStatutory: EmployerStatutoryResult;
  readonly employeeNet: EmployeeNetResult;

  /** §17 second layer, kept apart from the statutory figure to the end. */
  readonly companyCosts: {
    readonly monthlyCash: Halere;
    readonly annualTotal: Halere;
    readonly lines: readonly LineItem[];
  };

  readonly totalStatutoryEmployerCost: Halere;
  readonly totalRealEmployerCost: Halere;

  readonly metrics: DerivedMetrics;
  readonly moneyFlow: readonly MoneyFlowSlice[];
  readonly annual: AnnualView;

  /** Non-empty means at least one part of the result is withheld — see §28. */
  readonly unsupported: readonly UnsupportedCase[];
  readonly notes: readonly EngineNote[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

export type ValidationSeverity = 'error' | 'warning';

export interface ValidationIssue {
  readonly field: string;
  readonly key: string;
  readonly severity: ValidationSeverity;
}

export interface ValidationOutcome {
  readonly ok: boolean;
  readonly issues: readonly ValidationIssue[];
}
