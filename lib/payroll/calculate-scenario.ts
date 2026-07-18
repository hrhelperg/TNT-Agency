/**
 * Assembles full single-worker and multi-worker results from the per-step
 * calculators, and derives the scenario totals (per worker, all workers,
 * annualized). Annualized figures are a SCENARIO (12 × the modeled month),
 * never a forecast.
 */

import {
  add,
  clampNonNegative,
  czk,
  halere,
  multiplyByInteger,
  subtract,
  sum,
  ZERO,
  type Halere,
} from './money';
import type {
  EmployeeResult,
  EmployerContributionsResult,
  LineItem,
  ModelResult,
  PayrollInput,
  RuleRegistry,
  ScenarioTotals,
  EffectiveHourlyCost,
  AgencyCostResult,
  DirectCostResult,
} from './types';
import { calculateBaseWage } from './calculate-base-wage';
import { calculatePremiums } from './calculate-premiums';
import { calculateGrossWage } from './calculate-gross-wage';
import { calculateEmployeeContributions } from './calculate-employee-contributions';
import { calculateTax } from './calculate-tax';
import { calculateEmployerContributions } from './calculate-employer-contributions';
import { calculateAgencyCost } from './calculate-agency-cost';
import { calculateDirectEmploymentCost } from './calculate-direct-employment-cost';

function dividePerHour(total: Halere, hours: number): Halere {
  if (!(hours > 0)) return ZERO;
  return halere(Math.round(total / hours));
}

export function totalWorkedHours(input: PayrollInput): number {
  return input.workedTime.regularHours + input.workedTime.overtimeHours;
}

/** Full employee net-wage result (shared by both employment models). */
export function calculateEmployee(input: PayrollInput, rules: RuleRegistry): EmployeeResult {
  const base = calculateBaseWage(input);
  const premiums = calculatePremiums(input, base, rules);
  const gross = calculateGrossWage(input, base, premiums);
  const contributions = calculateEmployeeContributions(gross, rules);
  const tax = calculateTax(gross, contributions, input.taxProfile, rules);

  const netDeductions = sum([
    czk(input.adjustments.accommodationDeduction),
    czk(input.adjustments.transportDeduction),
    czk(input.adjustments.otherNetDeduction),
  ]);

  // Net = gross − insurance − tax(after credits) + tax bonus − lawful net deductions.
  const afterInsurance = subtract(gross.grossWage, contributions.total);
  const afterTax = add(subtract(afterInsurance, tax.taxAfterCredits), tax.taxBonus);
  const netWage = clampNonNegative(subtract(afterTax, netDeductions));

  const lines: LineItem[] = [
    ...base.lines,
    ...premiums.lines,
    ...gross.lines,
    ...contributions.lines,
    ...tax.lines,
    {
      key: 'netWage',
      labelCs: 'Čistá mzda k výplatě',
      amount: netWage,
      formula: 'hrubá mzda − pojistné − záloha na daň + daňový bonus − srážky',
      origin: 'derived',
    },
  ];

  return { gross, contributions, tax, netDeductions, netWage, lines };
}

function scenarioTotals(perWorker: Halere, workerCount: number): ScenarioTotals {
  const allWorkers = multiplyByInteger(perWorker, workerCount);
  return {
    perWorker,
    allWorkers,
    annualizedAllWorkers: multiplyByInteger(allWorkers, 12),
  };
}

function effectiveHourly(input: PayrollInput, economicCost: Halere): EffectiveHourlyCost {
  const worked = totalWorkedHours(input);
  const regular = input.workedTime.regularHours;
  return {
    workedHours: worked,
    regularHours: regular,
    costPerRegularHour: dividePerHour(economicCost, regular),
    costPerWorkedHour: dividePerHour(economicCost, worked),
  };
}

export function calculateAgencyModel(
  input: PayrollInput,
  rules: RuleRegistry,
  employee: EmployeeResult,
  employer: EmployerContributionsResult,
): ModelResult {
  const agency: AgencyCostResult = calculateAgencyCost(
    input.agency,
    employee.gross,
    employer,
    totalWorkedHours(input),
    rules,
  );

  const totalMonthlyCashOutflow = agency.grossInvoice;
  const totalEconomicCost = agency.economicCost;

  return {
    model: 'agency',
    employee,
    employer,
    agency,
    totalMonthlyCashOutflow,
    totalEconomicCost,
    effectiveHourly: effectiveHourly(input, totalEconomicCost),
    scenario: {
      cashOutflow: scenarioTotals(totalMonthlyCashOutflow, input.workerCount),
      economicCost: scenarioTotals(totalEconomicCost, input.workerCount),
    },
  };
}

export function calculateDirectModel(
  input: PayrollInput,
  employee: EmployeeResult,
  employer: EmployerContributionsResult,
): ModelResult {
  const direct: DirectCostResult = calculateDirectEmploymentCost(input.direct, employer);

  const totalMonthlyCashOutflow = direct.totalMonthlyCashOutflow;
  const totalEconomicCost = direct.totalEconomicCost;

  return {
    model: 'direct',
    employee,
    employer,
    direct,
    totalMonthlyCashOutflow,
    totalEconomicCost,
    effectiveHourly: effectiveHourly(input, totalEconomicCost),
    scenario: {
      cashOutflow: scenarioTotals(totalMonthlyCashOutflow, input.workerCount),
      economicCost: scenarioTotals(totalEconomicCost, input.workerCount),
    },
  };
}
