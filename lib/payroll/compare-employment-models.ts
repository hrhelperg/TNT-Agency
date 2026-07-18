/**
 * Side-by-side comparison of the agency and direct-employment models.
 *
 * Keeps five distinct cost concepts separate — employee net income, employer
 * payroll cost, employer operating cost, invoice cash outflow, VAT-adjusted
 * economic cost — and never collapses them into one ambiguous "cost".
 */

import { subtract, toCzkNumber, ZERO, type Halere } from './money';
import type { ComparisonResult, ComparisonRow, ModelResult } from './types';

function row(
  key: string,
  labelCs: string,
  agency: Halere,
  direct: Halere,
  kind: ComparisonRow['kind'],
): ComparisonRow {
  return { key, labelCs, agency, direct, kind };
}

export function compareEmploymentModels(
  agencyModel: ModelResult,
  directModel: ModelResult,
): ComparisonResult {
  const a = agencyModel;
  const d = directModel;
  const aAgency = a.agency;
  const dDirect = d.direct;

  const rows: ComparisonRow[] = [
    row('baseWage', 'Základní (dosažená) mzda', a.employee.gross.baseWage, d.employee.gross.baseWage, 'employee_income'),
    row('premiums', 'Příplatky', a.employee.gross.premiumsTotal, d.employee.gross.premiumsTotal, 'employee_income'),
    row('bonuses', 'Bonusy a odměny', a.employee.gross.taxableBonuses, d.employee.gross.taxableBonuses, 'employee_income'),
    row('grossWage', 'Hrubá mzda', a.employee.gross.grossWage, d.employee.gross.grossWage, 'employee_income'),
    row('employeeDeductions', 'Odvody zaměstnance', a.employee.contributions.total, d.employee.contributions.total, 'employee_income'),
    row('netWage', 'Čistá mzda', a.employee.netWage, d.employee.netWage, 'employee_income'),
    row('employerSocial', 'Sociální pojištění zaměstnavatele', a.employer.social, d.employer.social, 'employer_payroll'),
    row('employerHealth', 'Zdravotní pojištění zaměstnavatele', a.employer.health, d.employer.health, 'employer_payroll'),
    row('payrollCost', 'Mzdové náklady celkem', a.employer.totalPayrollCost, d.employer.totalPayrollCost, 'employer_payroll'),
    row(
      'agencyFee',
      'Poplatek / marže agentury',
      aAgency ? aAgency.serviceFee : ZERO,
      ZERO,
      'operating',
    ),
    row(
      'operational',
      'Provozní náklady (ubytování, doprava, nábor…)',
      aAgency ? aAgency.recoverableOperational : ZERO,
      dDirect ? dDirect.recurringOperational : ZERO,
      'operating',
    ),
    row(
      'oneTime',
      'Jednorázové náklady (nábor / onboarding)',
      aAgency ? aAgency.oneTimeOnboarding : ZERO,
      dDirect ? dDirect.oneTimeCosts : ZERO,
      'operating',
    ),
    row('vat', 'DPH', aAgency ? aAgency.vat : ZERO, ZERO, 'vat'),
    row('cashOutflow', 'Celkový měsíční peněžní tok', a.totalMonthlyCashOutflow, d.totalMonthlyCashOutflow, 'invoice'),
    row('economicCost', 'Celkový ekonomický náklad', a.totalEconomicCost, d.totalEconomicCost, 'summary'),
    row(
      'costPerWorkedHour',
      'Náklad na odpracovanou hodinu',
      a.effectiveHourly.costPerWorkedHour,
      d.effectiveHourly.costPerWorkedHour,
      'summary',
    ),
  ];

  const differenceCzk = subtract(a.totalEconomicCost, d.totalEconomicCost);
  const directEconomic = toCzkNumber(d.totalEconomicCost);
  const differencePercent =
    directEconomic !== 0
      ? (toCzkNumber(differenceCzk) / directEconomic) * 100
      : null;

  const notes: string[] = [
    'Porovnání rozlišuje pět různých veličin: čistý příjem zaměstnance, mzdové náklady zaměstnavatele, provozní náklady, peněžní tok (faktura) a ekonomický náklad po zohlednění DPH.',
    'Agentura má ze zákona povinnost zajistit srovnatelné pracovní a mzdové podmínky (§ 309 zákoníku práce) – nižší cena nesmí vznikat nižší mzdou pracovníka.',
    'Ekonomický náklad je nejférovější srovnávací veličina; peněžní tok u agentury zahrnuje DPH (u plátce zpravidla odpočitatelnou) a případné jednorázové náklady.',
  ];

  return {
    rows,
    agencyTotalCashOutflow: a.totalMonthlyCashOutflow,
    directTotalCashOutflow: d.totalMonthlyCashOutflow,
    agencyEconomicCost: a.totalEconomicCost,
    directEconomicCost: d.totalEconomicCost,
    differenceCzk,
    differencePercent,
    notes,
  };
}
