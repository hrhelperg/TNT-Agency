/**
 * Agency (agenturní zaměstnávání) cost from the USER COMPANY's perspective.
 *
 * The invoice is decomposed so the agency service fee (margin) is never
 * conflated with recoverable pass-through costs or with the worker's pay:
 *   invoice (ex VAT) = payroll cost + service fee + recoverable operational
 *                      + one-time onboarding
 * VAT is applied to the whole taxable service and kept on its own line — it is
 * never mixed into wage costs. If the company can deduct input VAT, the
 * economic cost excludes it; the cash outflow still includes it.
 */

import {
  add,
  czk,
  multiplyByQuantity,
  percentOf,
  subtract,
  sum,
  ZERO,
  type Halere,
} from './money';
import type {
  AgencyCostResult,
  AgencyInput,
  EmployerContributionsResult,
  GrossWageResult,
  LineItem,
  RuleRegistry,
} from './types';

export function calculateAgencyCost(
  agency: AgencyInput,
  gross: GrossWageResult,
  employer: EmployerContributionsResult,
  workedHours: number,
  _rules: RuleRegistry,
): AgencyCostResult {
  const lines: LineItem[] = [];
  const notes: string[] = [];

  const payrollCost = employer.totalPayrollCost;

  // Service fee (margin) per selected model.
  const feePercent = percentOf(payrollCost, agency.feePercentOfPayroll, 'nearest');
  const feeHourly = multiplyByQuantity(czk(agency.feePerHour), workedHours, 2, 'nearest');
  const feeFixed = czk(agency.feeFixedMonthly);

  let serviceFee: Halere;
  let feeFormula: string;
  switch (agency.feeModel) {
    case 'percent_of_payroll':
      serviceFee = feePercent;
      feeFormula = `${agency.feePercentOfPayroll} % z mzdových nákladů`;
      break;
    case 'per_hour':
      serviceFee = feeHourly;
      feeFormula = `${agency.feePerHour} Kč × ${workedHours} odpracovaných hodin`;
      break;
    case 'fixed_monthly':
      serviceFee = feeFixed;
      feeFormula = 'fixní měsíční poplatek';
      break;
    case 'combined':
    default:
      serviceFee = sum([feePercent, feeHourly, feeFixed]);
      feeFormula = 'kombinace: % z mezd + Kč/h + fixní poplatek';
      break;
  }

  const recoverableOperational = sum([
    czk(agency.operational.recruitment),
    czk(agency.operational.administration),
    czk(agency.operational.payrollProcessing),
    czk(agency.operational.accommodation),
    czk(agency.operational.transport),
    czk(agency.operational.ppe),
    czk(agency.operational.interpreterCoordinator),
    czk(agency.operational.medicalExam),
    czk(agency.operational.training),
    czk(agency.operational.otherRecurring),
  ]);
  const oneTimeOnboarding = czk(agency.operational.oneTimeOnboarding);

  const netInvoiceExVat = sum([payrollCost, serviceFee, recoverableOperational, oneTimeOnboarding]);
  const vat = percentOf(netInvoiceExVat, agency.vatRatePercent, 'nearest');
  const grossInvoice = add(netInvoiceExVat, vat);
  const economicCost = agency.companyCanDeductVat ? netInvoiceExVat : grossInvoice;

  lines.push({
    key: 'agencyPayrollCost',
    labelCs: 'Mzdové náklady pracovníka (fakturované)',
    amount: payrollCost,
    formula: 'hrubá mzda + zákonné odvody zaměstnavatele',
    baseNote: 'Agentura vyplácí mzdu a odvádí pojistné; jde o přeúčtované mzdové náklady, nikoli marži.',
    origin: 'derived',
  });
  lines.push({
    key: 'agencyServiceFee',
    labelCs: 'Poplatek / marže agentury',
    amount: serviceFee,
    formula: feeFormula,
    baseNote: 'Odměna agentury za službu – NEjde o celý rozdíl mezi mzdou a fakturou.',
    origin: 'user-entered',
  });
  if (recoverableOperational !== ZERO) {
    lines.push({
      key: 'agencyOperational',
      labelCs: 'Přeúčtované provozní náklady',
      amount: recoverableOperational,
      formula: 'nábor, administrativa, ubytování, doprava, OOPP, koordinátor, prohlídky, školení…',
      baseNote: 'Vratné/pass-through náklady, oddělené od marže agentury.',
      origin: 'user-entered',
    });
  }
  if (oneTimeOnboarding !== ZERO) {
    lines.push({
      key: 'agencyOneTime',
      labelCs: 'Jednorázové náklady na nástup',
      amount: oneTimeOnboarding,
      formula: 'jednorázový onboarding',
      origin: 'user-entered',
    });
  }
  lines.push({
    key: 'agencyVat',
    labelCs: `DPH (${agency.vatRatePercent} %)`,
    amount: vat,
    formula: `${agency.vatRatePercent} % z fakturované částky bez DPH`,
    baseNote: 'DPH se nikdy nesměšuje se mzdovými náklady; u plátce je zpravidla odpočitatelná.',
    origin: 'user-entered',
  });

  notes.push(
    'DPH závisí na konkrétní faktuře a postavení plátce. Rozdíl mezi mzdou zaměstnance a fakturou agentury není „zisk“ – zahrnuje odvody zaměstnavatele, provozní náklady a teprve poté marži.',
  );
  notes.push(
    'Agenturní zaměstnávání se řídí pravidlem srovnatelných pracovních a mzdových podmínek (§ 309 zákoníku práce): pracovník agentury nesmí mít horší mzdové podmínky než srovnatelný kmenový zaměstnanec uživatele.',
  );

  return {
    payrollCost,
    serviceFee,
    recoverableOperational,
    oneTimeOnboarding,
    netInvoiceExVat,
    vat,
    grossInvoice,
    vatDeductible: agency.companyCanDeductVat,
    economicCost,
    lines,
    notes,
  };
}
