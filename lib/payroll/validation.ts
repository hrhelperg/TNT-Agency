/**
 * Input validation for the payroll calculator. Pure — returns a structured
 * outcome (errors + warnings) in Czech. Rejects negatives and impossible hour
 * combinations; warns about estimates and modeling limitations.
 */

import type { PayrollInput, ValidationIssue, ValidationOutcome } from './types';

function nonNegative(field: string, label: string, value: number, issues: ValidationIssue[]): void {
  if (!Number.isFinite(value)) {
    issues.push({ field, messageCs: `${label}: zadejte platné číslo.`, severity: 'error' });
  } else if (value < 0) {
    issues.push({ field, messageCs: `${label}: hodnota nesmí být záporná.`, severity: 'error' });
  }
}

export function validateInput(input: PayrollInput): ValidationOutcome {
  const issues: ValidationIssue[] = [];
  const { period, wage, workedTime, agency, workerCount } = input;

  // Period
  if (period.month < 1 || period.month > 12) {
    issues.push({ field: 'period.month', messageCs: 'Měsíc musí být 1–12.', severity: 'error' });
  }
  nonNegative('period.monthlyHoursFund', 'Měsíční fond hodin', period.monthlyHoursFund, issues);
  if (period.monthlyHoursFund <= 0) {
    issues.push({
      field: 'period.monthlyHoursFund',
      messageCs: 'Měsíční fond hodin musí být větší než 0 (používá se pro přepočet hodinové mzdy).',
      severity: 'error',
    });
  }

  // Wage
  if (wage.mode === 'hourly') {
    nonNegative('wage.hourlyWageCzk', 'Hodinová mzda', wage.hourlyWageCzk, issues);
  } else {
    nonNegative('wage.monthlyWageCzk', 'Měsíční mzda', wage.monthlyWageCzk, issues);
  }
  nonNegative('wage.averageHourlyEarningsCzk', 'Průměrný výdělek', wage.averageHourlyEarningsCzk, issues);
  if (wage.useWageAsAverageEstimate) {
    issues.push({
      field: 'wage.averageHourlyEarningsCzk',
      messageCs:
        'Průměrný výdělek je odhadnut ze základní hodinové mzdy. Skutečný průměrný výdělek se počítá z předchozího čtvrtletí a bývá odlišný.',
      severity: 'warning',
    });
  }

  // Worked time
  const hourFields: Array<[keyof typeof workedTime, string]> = [
    ['regularHours', 'Řádné hodiny'],
    ['overtimeHours', 'Přesčasové hodiny'],
    ['nightHours', 'Noční hodiny'],
    ['saturdayHours', 'Sobotní hodiny'],
    ['sundayHours', 'Nedělní hodiny'],
    ['holidayHours', 'Hodiny ve svátek'],
    ['difficultEnvironmentHours', 'Hodiny ve ztíženém prostředí'],
  ];
  for (const [key, label] of hourFields) {
    nonNegative(`workedTime.${key}`, label, workedTime[key], issues);
  }

  const totalWorked = workedTime.regularHours + workedTime.overtimeHours;
  // Premium overlays may overlap each other, but none can exceed total worked hours.
  const overlays: Array<[string, string, number]> = [
    ['workedTime.nightHours', 'Noční hodiny', workedTime.nightHours],
    ['workedTime.saturdayHours', 'Sobotní hodiny', workedTime.saturdayHours],
    ['workedTime.sundayHours', 'Nedělní hodiny', workedTime.sundayHours],
    ['workedTime.holidayHours', 'Hodiny ve svátek', workedTime.holidayHours],
    ['workedTime.difficultEnvironmentHours', 'Hodiny ve ztíženém prostředí', workedTime.difficultEnvironmentHours],
  ];
  for (const [field, label, value] of overlays) {
    if (value > totalWorked + 1e-9) {
      issues.push({
        field,
        messageCs: `${label} (${value} h) nemohou překročit celkový počet odpracovaných hodin (${totalWorked} h).`,
        severity: 'error',
      });
    }
  }

  // Worker count
  if (!Number.isInteger(workerCount) || workerCount < 1) {
    issues.push({
      field: 'workerCount',
      messageCs: 'Počet pracovníků musí být celé číslo ≥ 1.',
      severity: 'error',
    });
  }

  // Agency / VAT
  nonNegative('agency.vatRatePercent', 'Sazba DPH', agency.vatRatePercent, issues);
  nonNegative('agency.feePercentOfPayroll', 'Marže agentury (%)', agency.feePercentOfPayroll, issues);
  nonNegative('agency.feePerHour', 'Poplatek agentury (Kč/h)', agency.feePerHour, issues);
  nonNegative('agency.feeFixedMonthly', 'Fixní poplatek agentury', agency.feeFixedMonthly, issues);

  const ok = !issues.some((i) => i.severity === 'error');
  return { ok, issues };
}
