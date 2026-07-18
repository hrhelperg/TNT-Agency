/**
 * Public API of the pure 2026 Czech payroll & workforce-cost engine.
 *
 * `calculate()` is the single deterministic entry point. It has no UI or
 * network dependencies and returns a fully audited result (every money line
 * carries its formula, rate, base, rounding and source). All rate constants
 * come from the versioned `CZ_2026` registry.
 */

import CZ_2026 from './rules/cz-2026';
import { validateInput } from './validation';
import {
  calculateEmployee,
  calculateAgencyModel,
  calculateDirectModel,
} from './calculate-scenario';
import { calculateEmployerContributions } from './calculate-employer-contributions';
import { compareEmploymentModels } from './compare-employment-models';
import type { CalculationResult, PayrollInput, RuleRegistry } from './types';

export * from './types';
export * from './money';
export * from './formatting';
export { validateInput } from './validation';
export { PAYROLL_SOURCES, getSource } from './sources';
export type { PayrollSource, PayrollSourceId } from './sources';
export { CZ_2026 };
export {
  calculateEmployee,
  calculateAgencyModel,
  calculateDirectModel,
  totalWorkedHours,
} from './calculate-scenario';
export { compareEmploymentModels } from './compare-employment-models';

export function calculate(input: PayrollInput, rules: RuleRegistry = CZ_2026): CalculationResult {
  const validation = validateInput(input);
  const warnings: string[] = validation.issues.map((i) => i.messageCs);

  if (!validation.ok) {
    return { mode: input.mode, ruleYear: rules.taxYear, warnings };
  }

  const employee = calculateEmployee(input, rules);
  const employer = calculateEmployerContributions(
    employee.gross,
    employee.contributions,
    input.adjustments,
    rules,
  );

  warnings.push(...employee.tax.notes, ...employer.notes);

  const needsAgency = input.mode === 'agency' || input.mode === 'comparison';
  const needsDirect = input.mode === 'direct' || input.mode === 'comparison';

  const agencyResult = needsAgency ? calculateAgencyModel(input, rules, employee, employer) : undefined;
  const directResult = needsDirect ? calculateDirectModel(input, employee, employer) : undefined;

  if (agencyResult) warnings.push(...(agencyResult.agency?.notes ?? []));

  const comparison =
    input.mode === 'comparison' && agencyResult && directResult
      ? compareEmploymentModels(agencyResult, directResult)
      : undefined;

  return {
    mode: input.mode,
    ruleYear: rules.taxYear,
    agencyResult,
    directResult,
    comparison,
    warnings: Array.from(new Set(warnings)),
  };
}

/** A sensible default input (160 h scenario) for the UI initial state and tests. */
export function createDefaultInput(): PayrollInput {
  return {
    mode: 'comparison',
    period: { year: 2026, month: 6, monthlyHoursFund: 160 },
    wage: {
      mode: 'hourly',
      hourlyWageCzk: 200,
      monthlyWageCzk: 32000,
      averageHourlyEarningsCzk: 200,
      useWageAsAverageEstimate: true,
    },
    workedTime: {
      regularHours: 160,
      overtimeHours: 0,
      nightHours: 0,
      saturdayHours: 0,
      sundayHours: 0,
      holidayHours: 0,
      difficultEnvironmentHours: 0,
    },
    premiums: {
      overtime: { enabled: true, percent: 25, czkPerHour: 0, mode: 'percent' },
      night: { enabled: true, percent: 10, czkPerHour: 0, mode: 'percent' },
      saturday: { enabled: true, percent: 10, czkPerHour: 0, mode: 'percent' },
      sunday: { enabled: true, percent: 10, czkPerHour: 0, mode: 'percent' },
      holiday: { enabled: true, percent: 100, czkPerHour: 0, mode: 'percent' },
      difficultEnvironment: { enabled: true, percent: 10, czkPerHour: 13.44, mode: 'czk_per_hour' },
      custom: { enabled: false, labelCs: '', hours: 0, percent: 0 },
      overtimeCompensatoryLeave: false,
      holidayCompensatoryLeave: false,
    },
    adjustments: {
      performanceBonus: 0,
      attendanceBonus: 0,
      productionBonus: 0,
      personalBonus: 0,
      otherTaxable: 0,
      mealContributionEmployer: 0,
      transportContributionEmployer: 0,
      accommodationContributionEmployer: 0,
      accommodationDeduction: 0,
      transportDeduction: 0,
      otherNetDeduction: 0,
    },
    taxProfile: {
      signedDeclaration: true,
      applyBasicCredit: true,
      disability: 'none',
      ztpp: false,
      children: [],
      residency: 'resident',
    },
    agency: {
      feeModel: 'percent_of_payroll',
      feePercentOfPayroll: 15,
      feePerHour: 0,
      feeFixedMonthly: 0,
      operational: {
        recruitment: 0,
        administration: 0,
        payrollProcessing: 0,
        accommodation: 0,
        transport: 0,
        ppe: 0,
        interpreterCoordinator: 0,
        medicalExam: 0,
        training: 0,
        otherRecurring: 0,
        oneTimeOnboarding: 0,
      },
      vatRatePercent: 21,
      companyCanDeductVat: true,
    },
    direct: {
      recruitment: 0,
      onboarding: 0,
      hrAdministration: 0,
      payrollProcessing: 0,
      ppe: 0,
      medicalExam: 0,
      training: 0,
      accommodation: 0,
      transport: 0,
      oneTimeSetup: 0,
      turnoverReplacementCost: 0,
    },
    workerCount: 1,
  };
}
