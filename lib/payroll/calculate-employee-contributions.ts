/**
 * Employee statutory insurance deductions (2026).
 *  - Social: 7,1 % of gross assessment base, capped at the annual maximum
 *    (2 350 416 Kč, cumulative) — § 7, § 15a zákona č. 589/1992 Sb.
 *  - Health: 4,5 % of gross assessment base, no cap, minimum base = minimum
 *    wage (doplatek has statutory exceptions) — § 2, § 3 zákona č. 592/1992 Sb.
 * Both premiums are rounded UP to whole koruny.
 *
 * The employee (4,5 %) and employer (9 %) health shares are each rounded up
 * independently; VZP officially rounds the combined 13,5 % — the difference is
 * at most 1 Kč and is documented in the result note.
 */

import { add, czk, minHalere, percentOf, roundToCzk, type Halere } from './money';
import type {
  EmployeeContributionsResult,
  GrossWageResult,
  LineItem,
  RuleRegistry,
} from './types';

export function calculateEmployeeContributions(
  gross: GrossWageResult,
  rules: RuleRegistry,
): EmployeeContributionsResult {
  const lines: LineItem[] = [];
  const grossWage = gross.grossWage;

  const annualMax = czk(rules.maxAnnualSocialBase.value);
  const socialBase = minHalere(grossWage, annualMax);
  const healthBase = grossWage;

  const social = roundToCzk(percentOf(socialBase, rules.employeeSocialRate.value, 'nearest'), 'up');
  const health = roundToCzk(percentOf(healthBase, rules.employeeHealthRate.value, 'nearest'), 'up');

  lines.push({
    key: 'employeeSocial',
    labelCs: 'Sociální pojištění zaměstnance',
    amount: social,
    formula: `${rules.employeeSocialRate.value} % z vyměřovacího základu`,
    rateNote: `${rules.employeeSocialRate.value} %`,
    baseNote: 'Vyměřovací základ = hrubá mzda (strop 2 350 416 Kč ročně).',
    roundingNote: 'Zaokrouhleno na celé koruny nahoru.',
    sourceId: rules.employeeSocialRate.sourceId,
    origin: 'statutory',
  });
  lines.push({
    key: 'employeeHealth',
    labelCs: 'Zdravotní pojištění zaměstnance',
    amount: health,
    formula: `${rules.employeeHealthRate.value} % z vyměřovacího základu`,
    rateNote: `${rules.employeeHealthRate.value} %`,
    baseNote: 'Vyměřovací základ = hrubá mzda (bez stropu; minimální základ = minimální mzda).',
    roundingNote: 'Zaokrouhleno na celé koruny nahoru.',
    sourceId: rules.employeeHealthRate.sourceId,
    origin: 'statutory',
  });

  const total = add(social, health);

  return { socialBase, healthBase, social, health, total, lines };
}
