/**
 * Base wage (dosažená mzda) = pay for hours actually worked, before premiums,
 * bonuses, deductions and tax.
 *
 * Two input modes:
 *  - hourly:  achieved hourly wage is the contractual hourly rate.
 *  - monthly: the monthly wage is the agreed pay for regular time; the hourly
 *             equivalent (monthly wage ÷ monthly hours fund) is CALCULATED and
 *             flagged as an estimate, then used to price overtime hours.
 */

import { czk, multiplyByQuantity, add, ZERO, type Halere } from './money';
import type { BaseWageResult, LineItem, PayrollInput } from './types';

const HOURS_DECIMALS = 2;

export function calculateBaseWage(input: PayrollInput): BaseWageResult {
  const { wage, workedTime, period } = input;
  const lines: LineItem[] = [];

  let achievedHourlyWage: Halere;
  let achievedHourlyWageIsEstimate: boolean;

  if (wage.mode === 'hourly') {
    achievedHourlyWage = czk(wage.hourlyWageCzk);
    achievedHourlyWageIsEstimate = false;
  } else {
    const fund = period.monthlyHoursFund > 0 ? period.monthlyHoursFund : 1;
    achievedHourlyWage = czk(wage.monthlyWageCzk / fund);
    achievedHourlyWageIsEstimate = true;
  }

  let regularPay: Halere;
  if (wage.mode === 'hourly') {
    regularPay = multiplyByQuantity(achievedHourlyWage, workedTime.regularHours, HOURS_DECIMALS, 'nearest');
    lines.push({
      key: 'regularPay',
      labelCs: 'Řádná mzda za odpracované hodiny',
      amount: regularPay,
      formula: `${workedTime.regularHours} h × hodinová mzda`,
      origin: 'user-entered',
    });
  } else {
    regularPay = czk(wage.monthlyWageCzk);
    lines.push({
      key: 'regularPay',
      labelCs: 'Sjednaná měsíční mzda',
      amount: regularPay,
      formula: 'měsíční mzda za řádnou pracovní dobu',
      baseNote: `Orientační hodinový ekvivalent = měsíční mzda ÷ ${period.monthlyHoursFund} h (vypočteno).`,
      origin: 'user-entered',
    });
  }

  const overtimeBasePay =
    workedTime.overtimeHours > 0
      ? multiplyByQuantity(achievedHourlyWage, workedTime.overtimeHours, HOURS_DECIMALS, 'nearest')
      : ZERO;

  if (workedTime.overtimeHours > 0) {
    lines.push({
      key: 'overtimeBasePay',
      labelCs: 'Dosažená mzda za přesčasové hodiny',
      amount: overtimeBasePay,
      formula: `${workedTime.overtimeHours} h × ${wage.mode === 'monthly' ? 'hodinový ekvivalent' : 'hodinová mzda'}`,
      baseNote: 'Bez příplatku za přesčas – ten se počítá zvlášť z průměrného výdělku.',
      origin: wage.mode === 'monthly' ? 'estimated' : 'user-entered',
    });
  }

  const baseWage = add(regularPay, overtimeBasePay);

  return {
    achievedHourlyWage,
    achievedHourlyWageIsEstimate,
    regularPay,
    overtimeBasePay,
    baseWage,
    lines,
  };
}
