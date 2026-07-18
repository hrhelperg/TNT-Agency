/**
 * Employer statutory payroll costs (2026):
 *  - Social 24,8 % of the assessment base (§ 7 zákona č. 589/1992 Sb.)
 *  - Health 9 % of the assessment base (§ 2 zákona č. 592/1992 Sb.)
 * Both rounded up to whole koruny.
 *
 * Statutory accident insurance (vyhláška č. 125/1993 Sb.) is industry-dependent
 * and left UNRESOLVED — excluded from the default and surfaced as a note so the
 * user can add their own rate rather than the engine inventing one.
 *
 * Employer non-wage contributions (meal/transport/accommodation) are tracked as
 * operating cost, separate from the statutory payroll cost.
 */

import { add, czk, percentOf, roundToCzk, sum, ZERO, type Halere } from './money';
import type {
  Adjustments,
  EmployeeContributionsResult,
  EmployerContributionsResult,
  GrossWageResult,
  LineItem,
  RuleRegistry,
} from './types';

export function calculateEmployerContributions(
  gross: GrossWageResult,
  employeeContrib: EmployeeContributionsResult,
  adjustments: Adjustments,
  rules: RuleRegistry,
): EmployerContributionsResult {
  const lines: LineItem[] = [];
  const notes: string[] = [];

  const socialBase = employeeContrib.socialBase; // same capped base as employee
  const healthBase = employeeContrib.healthBase;

  const social = roundToCzk(percentOf(socialBase, rules.employerSocialRate.value, 'nearest'), 'up');
  const health = roundToCzk(percentOf(healthBase, rules.employerHealthRate.value, 'nearest'), 'up');

  lines.push({
    key: 'employerSocial',
    labelCs: 'Sociální pojištění zaměstnavatele',
    amount: social,
    formula: `${rules.employerSocialRate.value} % z vyměřovacího základu`,
    rateNote: `${rules.employerSocialRate.value} %`,
    roundingNote: 'Zaokrouhleno na celé koruny nahoru.',
    sourceId: rules.employerSocialRate.sourceId,
    origin: 'statutory',
  });
  lines.push({
    key: 'employerHealth',
    labelCs: 'Zdravotní pojištění zaměstnavatele',
    amount: health,
    formula: `${rules.employerHealthRate.value} % z vyměřovacího základu`,
    rateNote: `${rules.employerHealthRate.value} %`,
    roundingNote: 'Zaokrouhleno na celé koruny nahoru.',
    sourceId: rules.employerHealthRate.sourceId,
    origin: 'statutory',
  });

  // Accident insurance — unresolved by design.
  const accidentInsurance: Halere = ZERO;
  if (rules.employerAccidentInsuranceRate.status === 'unresolved') {
    notes.push(
      'Zákonné pojištění odpovědnosti za pracovní úraz (vyhláška č. 125/1993 Sb., cca 0,28–5,04 % dle oboru) není v základním výpočtu zahrnuto – sazba se liší podle převažující činnosti a je třeba ji doplnit ručně.',
    );
  }

  const employerContributionsNonWage = sum([
    czk(adjustments.mealContributionEmployer),
    czk(adjustments.transportContributionEmployer),
    czk(adjustments.accommodationContributionEmployer),
  ]);
  if (employerContributionsNonWage !== ZERO) {
    lines.push({
      key: 'employerContributionsNonWage',
      labelCs: 'Příspěvky zaměstnavatele (stravné, doprava, ubytování)',
      amount: employerContributionsNonWage,
      formula: 'nemzdové příspěvky zaměstnavatele',
      baseNote: 'Nevstupují do hrubé mzdy; daňové osvobození má zákonné limity, které kalkulačka neposuzuje.',
      origin: 'user-entered',
    });
  }

  const statutoryTotal = add(add(social, health), accidentInsurance);
  const totalPayrollCost = add(gross.grossWage, statutoryTotal);

  lines.push({
    key: 'totalPayrollCost',
    labelCs: 'Přímé mzdové náklady zaměstnavatele',
    amount: totalPayrollCost,
    formula: 'hrubá mzda + sociální + zdravotní pojištění zaměstnavatele',
    origin: 'derived',
  });

  return {
    social,
    health,
    accidentInsurance,
    employerContributionsNonWage,
    statutoryTotal,
    totalPayrollCost,
    lines,
    notes,
  };
}
