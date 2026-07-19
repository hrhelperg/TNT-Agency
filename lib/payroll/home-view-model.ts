/**
 * View-model for the compact homepage payroll calculator.
 *
 * It is a thin, PURE adapter over the shared engine (`calculate`) — it contains
 * NO tax or insurance arithmetic. It only:
 *   1. reshapes a single "gross monthly salary" input into the engine's
 *      `PayrollInput` (direct-employment scenario, all non-payroll operational
 *      costs zero), and
 *   2. reads the engine's result + versioned rule/source metadata into a
 *      display-ready structure.
 *
 * Every displayed number is traceable to a named engine field or `CZ_2026`
 * rule; nothing is recomputed here. Keeping this logic outside the React
 * component makes it unit-testable without the DOM.
 */

import { calculate, createDefaultInput } from './index';
import CZ_2026 from './rules/cz-2026';
import { getSource } from './sources';
import type { Halere } from './money';
import type { ModelResult, PayrollInput } from './types';

/** Standard monthly working-hour fund used for the compact scenario. */
export const HOME_MONTHLY_HOURS = 160;

/**
 * ADAPTER ONLY — translate a gross monthly salary into `PayrollInput`.
 * No tax/insurance logic lives here; the engine performs every calculation.
 * The engine natively supports monthly-gross input (`wage.mode = 'monthly'`),
 * so the entered gross is used verbatim as the achieved monthly wage.
 */
export function buildHomeInput(
  grossMonthlyCzk: number,
  hours: number = HOME_MONTHLY_HOURS,
): PayrollInput {
  const base = createDefaultInput();
  const h = hours > 0 ? hours : HOME_MONTHLY_HOURS;
  return {
    ...base,
    mode: 'direct',
    period: { ...base.period, monthlyHoursFund: h },
    wage: {
      mode: 'monthly',
      monthlyWageCzk: grossMonthlyCzk,
      hourlyWageCzk: grossMonthlyCzk / h,
      averageHourlyEarningsCzk: grossMonthlyCzk / h,
      useWageAsAverageEstimate: true,
    },
    workedTime: { ...base.workedTime, regularHours: h },
  };
}

export type Payer = 'employee' | 'employer';

/** One statutory payment, ready for the "Kam odvody směřují?" panel. */
export interface PaymentRoute {
  readonly key: string;
  readonly labelCs: string;
  readonly payer: Payer;
  readonly ratePercent: number;
  readonly base: Halere;
  readonly amount: Halere;
  readonly institution: string; // authoritative name from the source registry
  readonly legalBasis: string;
  readonly sourceUrl: string;
  readonly purposeCs: string;
}

export interface HomeCalcView {
  readonly ok: boolean;
  readonly ruleYear: number;
  readonly grossHalere: Halere;
  readonly netHalere: Halere;
  readonly employerCostHalere: Halere;
  readonly employee: {
    readonly socialHalere: Halere;
    readonly healthHalere: Halere;
    readonly taxHalere: Halere;
    readonly totalDeductionsHalere: Halere;
  };
  readonly employer: {
    readonly socialHalere: Halere;
    readonly healthHalere: Halere;
    readonly totalContributionsHalere: Halere;
  };
  readonly state: {
    readonly fromEmployeeHalere: Halere;
    readonly fromEmployerHalere: Halere;
    readonly totalToStateHalere: Halere;
  };
  readonly routes: readonly PaymentRoute[];
  readonly warnings: readonly string[];
}

// Concise, factual descriptions of what each mandatory payment funds. These are
// not legal interpretations — the authoritative institution name and legal
// basis come from the source registry (PAYROLL_SOURCES).
const PURPOSE_CS: Record<'social' | 'health' | 'tax', string> = {
  social: 'Důchodové a nemocenské pojištění a státní politika zaměstnanosti.',
  health: 'Veřejné zdravotní pojištění – úhrada zdravotní péče (odváděno zdravotní pojišťovně zaměstnance).',
  tax: 'Daň z příjmů fyzických osob odváděná do státního rozpočtu.',
};

/**
 * Run the shared engine for a gross monthly salary and project its result into
 * the compact homepage view-model. Returns `ok: false` (with zeroed figures)
 * when the engine cannot produce a direct-model result (e.g. invalid input).
 */
function emptyView(ruleYear: number, warnings: readonly string[]): HomeCalcView {
  const z = 0 as Halere;
  return {
    ok: false,
    ruleYear,
    grossHalere: z,
    netHalere: z,
    employerCostHalere: z,
    employee: { socialHalere: z, healthHalere: z, taxHalere: z, totalDeductionsHalere: z },
    employer: { socialHalere: z, healthHalere: z, totalContributionsHalere: z },
    state: { fromEmployeeHalere: z, fromEmployerHalere: z, totalToStateHalere: z },
    routes: [],
    warnings: Array.from(warnings),
  };
}

export function computeHomeView(grossMonthlyCzk: number): HomeCalcView {
  const rules = CZ_2026;

  // Domain guard: the homepage scenario is a single positive monthly gross.
  // Non-positive / non-finite input is not a valid scenario — never produce
  // a misleading zero-filled "result" that looks calculated.
  if (!Number.isFinite(grossMonthlyCzk) || grossMonthlyCzk <= 0) {
    return emptyView(rules.taxYear, ['Zadejte kladnou hrubou měsíční mzdu.']);
  }

  const result = calculate(buildHomeInput(grossMonthlyCzk));
  const model = result.directResult as ModelResult | undefined;

  if (!model) {
    return emptyView(result.ruleYear, result.warnings);
  }

  const emp = model.employee;
  const er = model.employer;
  const gross = emp.gross.grossWage;

  // Employee income-tax actually deducted (advance after statutory credits).
  const taxHalere = emp.tax.taxAfterCredits;
  const totalDeductions = (emp.contributions.total + taxHalere + emp.netDeductions) as Halere;

  const socialSrc = getSource(rules.employeeSocialRate.sourceId);
  const healthSrc = getSource(rules.employeeHealthRate.sourceId);
  const taxSrc = getSource(rules.taxLowerRate.sourceId);
  const erSocialSrc = getSource(rules.employerSocialRate.sourceId);
  const erHealthSrc = getSource(rules.employerHealthRate.sourceId);

  const routes: PaymentRoute[] = [
    {
      key: 'employee-social',
      labelCs: 'Sociální pojištění zaměstnance',
      payer: 'employee',
      ratePercent: rules.employeeSocialRate.value,
      base: emp.contributions.socialBase,
      amount: emp.contributions.social,
      institution: socialSrc.authority,
      legalBasis: socialSrc.legalBasis,
      sourceUrl: socialSrc.url,
      purposeCs: PURPOSE_CS.social,
    },
    {
      key: 'employee-health',
      labelCs: 'Zdravotní pojištění zaměstnance',
      payer: 'employee',
      ratePercent: rules.employeeHealthRate.value,
      base: emp.contributions.healthBase,
      amount: emp.contributions.health,
      institution: healthSrc.authority,
      legalBasis: healthSrc.legalBasis,
      sourceUrl: healthSrc.url,
      purposeCs: PURPOSE_CS.health,
    },
    {
      key: 'employee-tax',
      labelCs: 'Záloha na daň z příjmů',
      payer: 'employee',
      ratePercent: rules.taxLowerRate.value,
      base: emp.tax.taxBase,
      amount: taxHalere,
      institution: taxSrc.authority,
      legalBasis: taxSrc.legalBasis,
      sourceUrl: taxSrc.url,
      purposeCs: PURPOSE_CS.tax,
    },
    {
      key: 'employer-social',
      labelCs: 'Sociální pojištění zaměstnavatele',
      payer: 'employer',
      ratePercent: rules.employerSocialRate.value,
      base: emp.contributions.socialBase,
      amount: er.social,
      institution: erSocialSrc.authority,
      legalBasis: erSocialSrc.legalBasis,
      sourceUrl: erSocialSrc.url,
      purposeCs: PURPOSE_CS.social,
    },
    {
      key: 'employer-health',
      labelCs: 'Zdravotní pojištění zaměstnavatele',
      payer: 'employer',
      ratePercent: rules.employerHealthRate.value,
      base: emp.contributions.healthBase,
      amount: er.health,
      institution: erHealthSrc.authority,
      legalBasis: erHealthSrc.legalBasis,
      sourceUrl: erHealthSrc.url,
      purposeCs: PURPOSE_CS.health,
    },
  ];

  return {
    ok: true,
    ruleYear: result.ruleYear,
    grossHalere: gross,
    netHalere: emp.netWage,
    employerCostHalere: er.totalPayrollCost,
    employee: {
      socialHalere: emp.contributions.social,
      healthHalere: emp.contributions.health,
      taxHalere,
      totalDeductionsHalere: totalDeductions,
    },
    employer: {
      socialHalere: er.social,
      healthHalere: er.health,
      totalContributionsHalere: er.statutoryTotal,
    },
    state: {
      fromEmployeeHalere: totalDeductions,
      fromEmployerHalere: er.statutoryTotal,
      totalToStateHalere: (totalDeductions + er.statutoryTotal) as Halere,
    },
    routes,
    warnings: Array.from(result.warnings),
  };
}
