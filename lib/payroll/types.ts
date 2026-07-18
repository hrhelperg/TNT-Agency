/**
 * Exhaustive types for the 2026 Czech payroll & workforce-cost engine.
 *
 * Conventions:
 * - Monetary amounts crossing the engine boundary are `Halere` (integer haléře).
 * - Rate/threshold constants live in a versioned `RuleRegistry` where every
 *   value is wrapped in `Ruled<T>` carrying its source id, legal basis and
 *   confidence status. Nothing is invented; unresolved values are flagged.
 * - No `any`.
 */

import type { Halere } from './money';
import type { PayrollSourceId } from './sources';

/** Provenance/confidence of a single rule value. */
export type RuleStatus =
  | 'confirmed-official' // read directly from an official source
  | 'derived-from-official' // arithmetic from an official value
  | 'configurable-default' // sensible default the user should confirm
  | 'unresolved'; // could not be verified — excluded from statutory defaults

/** A rule value tied to its source and legal basis. */
export interface Ruled<T> {
  readonly value: T;
  readonly sourceId: PayrollSourceId;
  readonly legalBasis: string;
  readonly status: RuleStatus;
  readonly note?: string;
}

/** Direction of a statutory money rounding. */
export type RoundingRule = 'up_to_czk' | 'up_to_hundred_czk' | 'nearest_czk';

// ─────────────────────────────────────────────────────────────────────────────
// Rule registry (versioned, per jurisdiction + tax year)
// ─────────────────────────────────────────────────────────────────────────────

export type PremiumKey =
  | 'overtime'
  | 'night'
  | 'saturday'
  | 'sunday'
  | 'holiday'
  | 'difficultEnvironment';

/** Base against which a statutory premium percentage is applied. */
export type PremiumBase = 'average_earnings' | 'minimum_wage' | 'achieved_wage';

export interface PremiumRule {
  readonly key: PremiumKey;
  readonly labelCs: string;
  /** Statutory minimum premium as a percentage of `base` (null if CZK-based). */
  readonly minPercent: number | null;
  /** Fixed minimum CZK/hour where the statute expresses a CZK floor (difficult env). */
  readonly minCzkPerHour: number | null;
  readonly base: PremiumBase;
  readonly editable: boolean;
  readonly sourceId: PayrollSourceId;
  readonly legalBasis: string;
  readonly status: RuleStatus;
  readonly note: string;
}

export interface ChildBenefitRule {
  readonly firstMonthly: number; // CZK
  readonly secondMonthly: number;
  readonly thirdPlusMonthly: number;
  /** ZTP/P child amounts are doubled. */
  readonly ztppMultiplier: number;
  /** Minimum monthly income to be paid a monthly tax bonus (½ minimum wage). */
  readonly bonusMinMonthlyIncome: Ruled<number>;
  readonly sourceId: PayrollSourceId;
  readonly legalBasis: string;
  readonly status: RuleStatus;
  readonly note: string;
}

export interface RuleRegistry {
  readonly jurisdiction: 'CZ';
  readonly taxYear: number;
  readonly effectiveFrom: string;
  readonly effectiveTo: string;

  // Insurance
  readonly employeeSocialRate: Ruled<number>; // %
  readonly employerSocialRate: Ruled<number>; // %
  readonly employeeHealthRate: Ruled<number>; // %
  readonly employerHealthRate: Ruled<number>; // %
  readonly healthTotalRate: Ruled<number>; // % (13.5, rounded then split)
  readonly maxAnnualSocialBase: Ruled<number>; // CZK, annual cumulative
  readonly minHealthBaseMonthly: Ruled<number>; // CZK
  /** Optional employer statutory accident insurance — industry-dependent, left unresolved. */
  readonly employerAccidentInsuranceRate: Ruled<number | null>; // % or null

  // Tax
  readonly taxLowerRate: Ruled<number>; // 15 %
  readonly taxUpperRate: Ruled<number>; // 23 %
  readonly taxUpperMonthlyThreshold: Ruled<number>; // CZK/month (3× avg wage)
  readonly basicTaxpayerCreditMonthly: Ruled<number>; // CZK/month
  readonly disabilityFirstSecondCreditMonthly: Ruled<number>;
  readonly disabilityThirdCreditMonthly: Ruled<number>;
  readonly ztppCreditMonthly: Ruled<number>;
  readonly childBenefit: ChildBenefitRule;

  // Reference figures
  readonly averageWageMonthly: Ruled<number>; // CZK
  readonly minimumWageMonthly: Ruled<number>; // CZK
  readonly minimumWageHourly: Ruled<number>; // CZK

  // Premiums (private-sector "mzda")
  readonly premiums: Readonly<Record<PremiumKey, PremiumRule>>;

  // VAT (agency service)
  readonly vatStandardRate: Ruled<number>; // %

  // Statutory rounding
  readonly rounding: {
    readonly socialInsurance: RoundingRule;
    readonly healthInsurance: RoundingRule;
    readonly taxBaseMonthly: RoundingRule;
    readonly taxAdvance: RoundingRule;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs
// ─────────────────────────────────────────────────────────────────────────────

export type CalculationMode = 'agency' | 'direct' | 'comparison';
export type WageInputMode = 'hourly' | 'monthly';
export type TaxResidency = 'resident' | 'non_resident';
export type DisabilityStatus = 'none' | 'first_second' | 'third';

export interface CalculationPeriod {
  readonly year: number;
  readonly month: number; // 1–12
  /** Monthly working-hour fund used as the base scenario (default 160). */
  readonly monthlyHoursFund: number;
}

/**
 * Worked time. `regularHours` + `overtimeHours` are the paid worked hours.
 * The remaining fields are PREMIUM OVERLAYS: counts of worked hours that also
 * qualify for a premium. They may overlap with each other and with overtime
 * (an hour can be overtime + night + Saturday at once), so they are entered
 * and priced independently — never assumed mutually exclusive.
 */
export interface WorkedTime {
  readonly regularHours: number;
  readonly overtimeHours: number;
  readonly nightHours: number;
  readonly saturdayHours: number;
  readonly sundayHours: number;
  readonly holidayHours: number;
  readonly difficultEnvironmentHours: number;
}

/** One editable premium setting (percentage OR fixed CZK/hour). */
export interface PremiumSetting {
  readonly enabled: boolean;
  /** Percentage of the statutory base; used when `mode` = 'percent'. */
  readonly percent: number;
  /** Fixed CZK per hour; used when `mode` = 'czk_per_hour'. */
  readonly czkPerHour: number;
  readonly mode: 'percent' | 'czk_per_hour';
}

export interface PremiumSettings {
  readonly overtime: PremiumSetting;
  readonly night: PremiumSetting;
  readonly saturday: PremiumSetting;
  readonly sunday: PremiumSetting;
  readonly holiday: PremiumSetting;
  readonly difficultEnvironment: PremiumSetting;
  /** Optional custom employer premium (always % of average earnings, taxable). */
  readonly custom: {
    readonly enabled: boolean;
    readonly labelCs: string;
    readonly hours: number;
    readonly percent: number;
  };
  /** Overtime settled by compensatory leave instead of the premium (§114). */
  readonly overtimeCompensatoryLeave: boolean;
  /** Holiday settled by compensatory leave instead of the +100 % premium (§115). */
  readonly holidayCompensatoryLeave: boolean;
}

export interface WageInput {
  readonly mode: WageInputMode;
  /** CZK per hour (mode = 'hourly'). */
  readonly hourlyWageCzk: number;
  /** CZK per month (mode = 'monthly'). */
  readonly monthlyWageCzk: number;
  /**
   * Average hourly earnings (průměrný výdělek) used for statutory premiums.
   * Distinct from the contractual wage. If `useWageAsAverageEstimate` is true
   * the engine substitutes the achieved hourly wage and flags it as an estimate.
   */
  readonly averageHourlyEarningsCzk: number;
  readonly useWageAsAverageEstimate: boolean;
}

/** Taxable and non-taxable additions/deductions (all CZK/month). */
export interface Adjustments {
  readonly performanceBonus: number;
  readonly attendanceBonus: number;
  readonly productionBonus: number;
  readonly personalBonus: number;
  readonly otherTaxable: number;
  /**
   * Employer non-wage contributions (meal, transport, accommodation). Treated
   * as employer operating cost, NOT added to taxable gross by default — tax
   * exemption limits are complex and left out of the statutory base.
   */
  readonly mealContributionEmployer: number;
  readonly transportContributionEmployer: number;
  readonly accommodationContributionEmployer: number;
  /** Lawful deductions taken from net pay (accommodation, transport, other). */
  readonly accommodationDeduction: number;
  readonly transportDeduction: number;
  readonly otherNetDeduction: number;
}

export interface ChildEntry {
  readonly ztpp: boolean;
}

export interface TaxProfile {
  readonly signedDeclaration: boolean; // Prohlášení poplatníka
  readonly applyBasicCredit: boolean;
  readonly disability: DisabilityStatus;
  readonly ztpp: boolean;
  /** Ordered children; order determines 1st/2nd/3rd+ benefit amount. */
  readonly children: readonly ChildEntry[];
  readonly residency: TaxResidency;
}

export type AgencyFeeModel = 'percent_of_payroll' | 'per_hour' | 'fixed_monthly' | 'combined';

export interface AgencyOperationalCosts {
  readonly recruitment: number;
  readonly administration: number;
  readonly payrollProcessing: number;
  readonly accommodation: number;
  readonly transport: number;
  readonly ppe: number;
  readonly interpreterCoordinator: number;
  readonly medicalExam: number;
  readonly training: number;
  readonly otherRecurring: number;
  readonly oneTimeOnboarding: number;
}

export interface AgencyInput {
  readonly feeModel: AgencyFeeModel;
  readonly feePercentOfPayroll: number; // %
  readonly feePerHour: number; // CZK per worked hour
  readonly feeFixedMonthly: number; // CZK
  readonly operational: AgencyOperationalCosts;
  readonly vatRatePercent: number;
  readonly companyCanDeductVat: boolean;
}

export interface DirectEmploymentInput {
  readonly recruitment: number;
  readonly onboarding: number;
  readonly hrAdministration: number;
  readonly payrollProcessing: number;
  readonly ppe: number;
  readonly medicalExam: number;
  readonly training: number;
  readonly accommodation: number;
  readonly transport: number;
  readonly oneTimeSetup: number;
  /** Optional user-entered turnover/replacement cost (no default is invented). */
  readonly turnoverReplacementCost: number;
}

export interface PayrollInput {
  readonly mode: CalculationMode;
  readonly period: CalculationPeriod;
  readonly wage: WageInput;
  readonly workedTime: WorkedTime;
  readonly premiums: PremiumSettings;
  readonly adjustments: Adjustments;
  readonly taxProfile: TaxProfile;
  readonly agency: AgencyInput;
  readonly direct: DirectEmploymentInput;
  readonly workerCount: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Results
// ─────────────────────────────────────────────────────────────────────────────

/** A single computed money line with an audit trail for the UI "explain" panel. */
export interface LineItem {
  readonly key: string;
  readonly labelCs: string;
  readonly amount: Halere;
  readonly formula: string;
  readonly rateNote?: string;
  readonly baseNote?: string;
  readonly roundingNote?: string;
  readonly sourceId?: PayrollSourceId;
  readonly origin: 'statutory' | 'user-entered' | 'estimated' | 'derived';
}

export interface PremiumLine extends LineItem {
  readonly premiumKey: PremiumKey | 'custom';
  readonly hours: number;
}

export interface BaseWageResult {
  readonly achievedHourlyWage: Halere;
  readonly achievedHourlyWageIsEstimate: boolean;
  readonly regularPay: Halere;
  readonly overtimeBasePay: Halere;
  readonly baseWage: Halere; // dosažená mzda (regular + overtime base)
  readonly lines: readonly LineItem[];
}

export interface PremiumsResult {
  readonly total: Halere;
  readonly averageHourlyEarnings: Halere;
  readonly averageIsEstimate: boolean;
  readonly lines: readonly PremiumLine[];
}

export interface GrossWageResult {
  readonly baseWage: Halere;
  readonly premiumsTotal: Halere;
  readonly taxableBonuses: Halere;
  readonly grossWage: Halere;
  readonly lines: readonly LineItem[];
}

export interface EmployeeContributionsResult {
  readonly socialBase: Halere;
  readonly healthBase: Halere;
  readonly social: Halere;
  readonly health: Halere;
  readonly total: Halere;
  readonly lines: readonly LineItem[];
}

export interface TaxResult {
  readonly taxBase: Halere; // rounded monthly base
  readonly taxBeforeCredits: Halere;
  readonly appliedCredits: Halere;
  readonly childBenefitApplied: Halere;
  readonly taxAfterCredits: Halere; // ≥ 0
  readonly taxBonus: Halere; // daňový bonus paid to employee
  readonly netTaxEffect: Halere; // taxAfterCredits (deducted) minus bonus (added)
  readonly lines: readonly LineItem[];
  readonly notes: readonly string[];
}

export interface EmployeeResult {
  readonly gross: GrossWageResult;
  readonly contributions: EmployeeContributionsResult;
  readonly tax: TaxResult;
  readonly netDeductions: Halere; // lawful net deductions
  readonly netWage: Halere; // čistá mzda after deductions
  readonly lines: readonly LineItem[];
}

export interface EmployerContributionsResult {
  readonly social: Halere;
  readonly health: Halere;
  readonly accidentInsurance: Halere;
  readonly employerContributionsNonWage: Halere; // meal/transport/accommodation
  readonly statutoryTotal: Halere; // social + health (+ accident if modeled)
  readonly totalPayrollCost: Halere; // gross + statutory (+ accident)
  readonly lines: readonly LineItem[];
  readonly notes: readonly string[];
}

export interface AgencyCostResult {
  readonly payrollCost: Halere; // gross + employer statutory
  readonly serviceFee: Halere; // agency fee (margin/service), ex VAT
  readonly recoverableOperational: Halere; // pass-through operating costs
  readonly oneTimeOnboarding: Halere;
  readonly netInvoiceExVat: Halere; // fee + operational (+ one-time)
  readonly vat: Halere;
  readonly grossInvoice: Halere; // incl. VAT (cash outflow)
  readonly vatDeductible: boolean;
  readonly economicCost: Halere; // grossInvoice minus deductible VAT
  readonly lines: readonly LineItem[];
  readonly notes: readonly string[];
}

export interface DirectCostResult {
  readonly payrollCost: Halere; // gross + employer statutory
  readonly recurringOperational: Halere;
  readonly oneTimeCosts: Halere;
  readonly turnoverReplacement: Halere;
  readonly totalMonthlyCashOutflow: Halere;
  readonly totalEconomicCost: Halere;
  readonly lines: readonly LineItem[];
  readonly notes: readonly string[];
}

export type WorkerScope = 'per_worker' | 'all_workers';

export interface ScenarioTotals {
  readonly perWorker: Halere;
  readonly allWorkers: Halere;
  readonly annualizedAllWorkers: Halere; // scenario, not a forecast
}

export interface EffectiveHourlyCost {
  readonly workedHours: number;
  readonly regularHours: number;
  readonly costPerRegularHour: Halere;
  readonly costPerWorkedHour: Halere;
}

/** A full single-model result (agency OR direct). */
export interface ModelResult {
  readonly model: 'agency' | 'direct';
  readonly employee: EmployeeResult;
  readonly employer: EmployerContributionsResult;
  readonly agency?: AgencyCostResult;
  readonly direct?: DirectCostResult;
  readonly totalMonthlyCashOutflow: Halere;
  readonly totalEconomicCost: Halere;
  readonly effectiveHourly: EffectiveHourlyCost;
  readonly scenario: {
    readonly cashOutflow: ScenarioTotals;
    readonly economicCost: ScenarioTotals;
  };
}

export interface ComparisonRow {
  readonly key: string;
  readonly labelCs: string;
  readonly agency: Halere;
  readonly direct: Halere;
  readonly kind: 'employee_income' | 'employer_payroll' | 'operating' | 'invoice' | 'vat' | 'summary';
}

export interface ComparisonResult {
  readonly rows: readonly ComparisonRow[];
  readonly agencyTotalCashOutflow: Halere;
  readonly directTotalCashOutflow: Halere;
  readonly agencyEconomicCost: Halere;
  readonly directEconomicCost: Halere;
  readonly differenceCzk: Halere; // agency − direct (economic)
  readonly differencePercent: number | null; // null if direct is 0
  readonly notes: readonly string[];
}

export interface CalculationResult {
  readonly mode: CalculationMode;
  readonly ruleYear: number;
  readonly agencyResult?: ModelResult;
  readonly directResult?: ModelResult;
  readonly comparison?: ComparisonResult;
  readonly warnings: readonly string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

export type ValidationSeverity = 'error' | 'warning';

export interface ValidationIssue {
  readonly field: string;
  readonly messageCs: string;
  readonly severity: ValidationSeverity;
}

export interface ValidationOutcome {
  readonly ok: boolean; // false if any error
  readonly issues: readonly ValidationIssue[];
}
