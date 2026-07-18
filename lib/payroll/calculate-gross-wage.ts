/**
 * Gross wage (hrubá mzda) = base wage + premiums + taxable bonuses.
 *
 * Employer non-wage contributions (meal/transport/accommodation) are NOT part
 * of gross: their tax treatment depends on statutory exemption limits that are
 * out of scope here, so they are modeled separately as employer operating cost.
 */

import { add, czk, sum, ZERO, type Halere } from './money';
import type { BaseWageResult, GrossWageResult, LineItem, PayrollInput, PremiumsResult } from './types';

export function calculateGrossWage(
  input: PayrollInput,
  base: BaseWageResult,
  premiums: PremiumsResult,
): GrossWageResult {
  const { adjustments } = input;
  const lines: LineItem[] = [];

  const bonusParts: Halere[] = [
    czk(adjustments.performanceBonus),
    czk(adjustments.attendanceBonus),
    czk(adjustments.productionBonus),
    czk(adjustments.personalBonus),
    czk(adjustments.otherTaxable),
  ];
  const taxableBonuses = sum(bonusParts);

  lines.push({
    key: 'baseWage',
    labelCs: 'Základní (dosažená) mzda',
    amount: base.baseWage,
    formula: 'řádná + přesčasová dosažená mzda',
    origin: 'derived',
  });
  if (premiums.total !== ZERO) {
    lines.push({
      key: 'premiumsTotal',
      labelCs: 'Příplatky celkem',
      amount: premiums.total,
      formula: 'součet zákonných a smluvních příplatků',
      origin: 'derived',
    });
  }
  if (taxableBonuses !== ZERO) {
    lines.push({
      key: 'taxableBonuses',
      labelCs: 'Zdanitelné odměny a bonusy',
      amount: taxableBonuses,
      formula: 'výkonnostní + docházkový + výrobní + osobní + ostatní zdanitelné',
      baseNote: 'Všechny tyto složky vstupují do hrubé mzdy a jsou předmětem daně i pojistného.',
      origin: 'user-entered',
    });
  }

  const grossWage = add(add(base.baseWage, premiums.total), taxableBonuses);

  return {
    baseWage: base.baseWage,
    premiumsTotal: premiums.total,
    taxableBonuses,
    grossWage,
    lines,
  };
}
