/**
 * Derived metrics (§24) and the "where does the money go" breakdown (§25).
 *
 * Nothing in this file is a rule. Every number here is arithmetic on figures the
 * statutory engine already produced, and it is kept separate from that engine so
 * the distinction is structural rather than a comment: a reader auditing the
 * legal correctness of this calculator never has to read this file, and a change
 * here can never alter a contribution or a tax.
 *
 * THE SLICES MUST SUM
 * ───────────────────
 * §25 asks for a breakdown of where an employer's money goes. A breakdown whose
 * parts do not add up to the whole is not a breakdown — it is six numbers next
 * to a seventh. So the decomposition is exact, and a test asserts the identity
 * on every fixture rather than approximately, to the koruna:
 *
 *     gross = net
 *           + employee social + employee health + employee health top-up
 *           + (income-tax advance − tax bonus)
 *
 *     total real employer cost = gross
 *           + employer social (after discount) + employer health
 *           + employer health top-up + liability insurance + company costs
 *
 * which rearranges into the six slices below with nothing left over.
 *
 * WHY THE TAX SLICE CAN GO NEGATIVE
 * ─────────────────────────────────
 * The income-tax slice is the advance actually withheld MINUS the monthly tax
 * bonus. For a low earner with several children the bonus exceeds the tax, and
 * the slice is negative: the state is a net contributor to that payslip, which
 * is exactly what the child tax benefit is for.
 *
 * That is not a defect to be clamped away. Clamping it to zero would silently
 * break the sum identity above and overstate what the employee costs. The UI
 * renders a negative slice as what it is, and `percentOfTotal` is left null for
 * it so no chart tries to draw a negative wedge.
 */

import { subtract, sum, ZERO, type Halere } from '../../payroll/money';
import type {
  DerivedMetrics,
  EmployeeNetResult,
  EmployerStatutoryResult,
  HealthResult,
  MoneyFlowSlice,
  SocialResult,
  TaxResult,
} from './types';

/**
 * A percentage of one amount against another, or null when it does not exist.
 *
 * Null rather than 0 when the denominator is zero. A gross of zero has no
 * net-to-gross ratio, and "0 %" would assert that the employee receives none of
 * their pay, which is a statement about a situation that is not happening.
 */
function percentOf(numerator: Halere, denominator: Halere): number | null {
  if (denominator === 0) return null;
  const pct = (numerator / denominator) * 100;
  return Number.isFinite(pct) ? Math.round(pct * 100) / 100 : null;
}

export interface MetricsInput {
  readonly grossTaxable: Halere;
  readonly employerStatutory: EmployerStatutoryResult;
  readonly employeeNet: EmployeeNetResult;
  /** Recurring monthly company-specific cost. One-off and annual items are excluded by design. */
  readonly companyMonthlyCash: Halere;
}

/**
 * §24 metrics.
 *
 * "Above gross" is the employer's cost beyond the gross wage — the number an
 * employer means by "on-costs". Expressed both in koruny and as a percentage of
 * gross, because the percentage is comparable across salaries and the koruna
 * figure is the one that gets budgeted.
 */
export function deriveMetrics(input: MetricsInput): DerivedMetrics {
  const { grossTaxable, employerStatutory, employeeNet, companyMonthlyCash } = input;

  const statutoryAboveGross = subtract(employerStatutory.total, grossTaxable);
  const configuredAboveGross = sum([statutoryAboveGross, companyMonthlyCash]);
  const totalRealCost = sum([employerStatutory.total, companyMonthlyCash]);

  return {
    statutoryAboveGross,
    statutoryAboveGrossPercent: percentOf(statutoryAboveGross, grossTaxable),
    configuredAboveGross,
    configuredAboveGrossPercent: percentOf(configuredAboveGross, grossTaxable),
    netToGrossPercent: percentOf(employeeNet.net, grossTaxable),
    // How many koruny the employer spends for each koruna the employee receives,
    // as a percentage. Undefined when net is zero — which happens at zero gross,
    // and also when deductions consume the whole wage.
    employerCostToNetPercent: percentOf(totalRealCost, employeeNet.net),
  };
}

export interface MoneyFlowInput {
  readonly social: SocialResult;
  readonly health: HealthResult;
  readonly tax: TaxResult;
  readonly employeeNet: EmployeeNetResult;
  /** Statutory employer liability insurance allocated to this month. */
  readonly liabilityInsurance: Halere;
  readonly companyMonthlyCash: Halere;
}

/**
 * §25 breakdown.
 *
 * Slices are returned in a fixed order — what the employee gets first, then each
 * destination of what they do not. Order is part of the output because a UI
 * sorting by size would put a different thing first at different salaries, and
 * the point of this breakdown is that the same reader can compare two of them.
 */
export function deriveMoneyFlow(input: MoneyFlowInput): readonly MoneyFlowSlice[] {
  const { social, health, tax, employeeNet, liabilityInsurance, companyMonthlyCash } = input;

  const employeeNetAmount = employeeNet.net;
  // Employer social is taken AFTER the §10 discount: the discount is money the
  // employer does not pay, so it must not appear in a chart of money that moved.
  const socialTotal = sum([social.employee, social.employerNet]);
  // `employee` and `employer` on the health result ALREADY include whichever
  // top-up that party bears. Adding the top-ups again here double-counted them,
  // which broke the sum identity below at every salary under the minimum base.
  const healthTotal = sum([health.employee, health.employer]);
  // Net position of the tax authority. Negative when the bonus exceeds the tax.
  const incomeTaxNet = subtract(tax.advanceFinal, tax.taxBonus);

  const slices: Array<{ key: MoneyFlowSlice['key']; amount: Halere }> = [
    { key: 'employee_net', amount: employeeNetAmount },
    { key: 'social', amount: socialTotal },
    { key: 'health', amount: healthTotal },
    { key: 'income_tax', amount: incomeTaxNet },
    { key: 'employer_overhead', amount: liabilityInsurance },
    { key: 'company_costs', amount: companyMonthlyCash },
  ];

  const total = sum(slices.map((s) => s.amount));

  return slices.map(({ key, amount }) => ({
    key,
    amount,
    // Null for a negative slice: a share of a total is not meaningful for a
    // negative part, and a chart must not attempt to draw one.
    percentOfTotal: total === 0 || amount < 0 ? null : Math.round((amount / total) * 10_000) / 100,
  }));
}

/**
 * The sum of the money-flow slices.
 *
 * Exported so the identity can be asserted by tests and by the engine itself,
 * rather than being an invariant that lives only in a comment.
 */
export function moneyFlowTotal(slices: readonly MoneyFlowSlice[]): Halere {
  return slices.length ? sum(slices.map((s) => s.amount)) : ZERO;
}
