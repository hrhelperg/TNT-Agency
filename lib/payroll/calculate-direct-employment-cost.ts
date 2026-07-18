/**
 * Direct-employment (kmenový zaměstnanec) cost from the employer's perspective.
 *
 * No default turnover rate or replacement cost is invented — the user supplies
 * them. One-time costs (recruitment, onboarding, medical, training, PPE, setup)
 * are shown separately from the recurring monthly operating cost so the
 * comparison with the agency model stays honest.
 */

import { add, czk, sum, ZERO, type Halere } from './money';
import type {
  DirectCostResult,
  DirectEmploymentInput,
  EmployerContributionsResult,
  LineItem,
} from './types';

export function calculateDirectEmploymentCost(
  direct: DirectEmploymentInput,
  employer: EmployerContributionsResult,
): DirectCostResult {
  const lines: LineItem[] = [];
  const notes: string[] = [];

  const payrollCost = employer.totalPayrollCost;

  const recurringOperational = sum([
    czk(direct.hrAdministration),
    czk(direct.payrollProcessing),
    czk(direct.accommodation),
    czk(direct.transport),
  ]);

  const oneTimeCosts = sum([
    czk(direct.recruitment),
    czk(direct.onboarding),
    czk(direct.ppe),
    czk(direct.medicalExam),
    czk(direct.training),
    czk(direct.oneTimeSetup),
  ]);

  const turnoverReplacement = czk(direct.turnoverReplacementCost);

  lines.push({
    key: 'directPayrollCost',
    labelCs: 'Mzdové náklady (hrubá mzda + odvody zaměstnavatele)',
    amount: payrollCost,
    formula: 'hrubá mzda + sociální + zdravotní pojištění zaměstnavatele',
    origin: 'derived',
  });
  if (recurringOperational !== ZERO) {
    lines.push({
      key: 'directRecurring',
      labelCs: 'Pravidelné provozní náklady (měsíčně)',
      amount: recurringOperational,
      formula: 'HR administrativa + mzdová agenda + ubytování + doprava',
      origin: 'user-entered',
    });
  }
  if (oneTimeCosts !== ZERO) {
    lines.push({
      key: 'directOneTime',
      labelCs: 'Jednorázové náklady',
      amount: oneTimeCosts,
      formula: 'nábor + onboarding + OOPP + prohlídka + školení + zřízení',
      baseNote: 'Vznikají zpravidla jen při nástupu – v měsíčním porovnání jde o scénář prvního měsíce.',
      origin: 'user-entered',
    });
  }
  if (turnoverReplacement !== ZERO) {
    lines.push({
      key: 'directTurnover',
      labelCs: 'Náklady na fluktuaci / náhradu (zadané uživatelem)',
      amount: turnoverReplacement,
      formula: 'uživatelský vstup',
      baseNote: 'Kalkulačka nevymýšlí žádnou míru fluktuace ani náklad na náhradu.',
      origin: 'user-entered',
    });
  }

  const totalMonthlyCashOutflow = add(payrollCost, recurringOperational);
  const totalEconomicCost = sum([payrollCost, recurringOperational, oneTimeCosts, turnoverReplacement]);

  notes.push('Kmenový zaměstnanec: bez marže a DPH agentury; zaměstnavatel nese nábor a administrativu sám.');

  return {
    payrollCost,
    recurringOperational,
    oneTimeCosts,
    turnoverReplacement,
    totalMonthlyCashOutflow,
    totalEconomicCost,
    lines,
    notes,
  };
}
