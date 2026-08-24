/**
 * The Czech employer-cost and net-salary engine.
 *
 * Pure. Deterministic. No browser, no network, no analytics, no `Date.now()`.
 * Given the same input and the same ruleset it returns the same result forever,
 * which is what makes a 2026 calculation still reproducible in 2028.
 *
 * WHAT IT COMPOSES
 * ────────────────
 *   gross      salary components summed into one taxable figure
 *   social     participation, § 5d base rounding, the annual maximum, the
 *              employee premium, the working-pensioner sleva, the employer
 *              premium by rate class, the § 7a employer discount
 *   health     one 13,5 % premium rounded once and split into thirds, plus the
 *              minimum-base top-up and — the part that matters — WHICH PARTY
 *              bears it
 *   tax        § 38h base rounding, the 15/23 split, advance rounding, § 35ba
 *              credits, the child benefit, the monthly bonus, and the
 *              withholding regime where it applies
 *   liability  the statutory employer insurance, as an allocation of a
 *              quarterly employer-level premium
 *
 * THE TWO TOTALS ARE DELIBERATELY DIFFERENT NUMBERS
 * ─────────────────────────────────────────────────
 * `totalStatutoryEmployerCost` is a legal fact: the same gross, the same tax
 * year, the same figure for every employer in the country. `totalRealEmployerCost`
 * adds what this particular company chose to spend. Collapsing them into one
 * number would present a company's decisions as law, which is what §15 and §17
 * separate and why they stay separate all the way to the UI.
 *
 * ASSEMBLY WITHOUT DOUBLE COUNTING
 * ────────────────────────────────
 * The health module reports the premium on actual earnings and the minimum-base
 * top-up separately as well as combined. The statutory total uses the SEPARATE
 * figures, so a top-up can never be added once inside the employer's share and
 * again as its own line. `engine.test.ts` asserts the resulting identity to the
 * koruna rather than trusting this comment.
 */

import {
  add,
  clampNonNegative,
  czk,
  multiplyByInteger,
  subtract,
  sum,
  ZERO,
  type Halere,
} from '../../payroll/money';
import {
  calculateAdditionalCosts,
  EMPTY_ADDITIONAL_COSTS,
  type AdditionalCostInput,
  type AdditionalCostKey,
} from './additional-costs';
import { calculateHealth } from './health';
import { calculateLiabilityInsurance } from './employer-insurance';
import { calculateSocial } from './social';
import { calculateTax } from './tax';
import { deriveMetrics, deriveMoneyFlow } from './metrics';
import { validateInput } from './validation';
import CZ_2026 from './jurisdictions/cz/2026';
import type { CzRuleset } from './jurisdictions/cz/ruleset';
import type {
  EmployerCostInput,
  EmployerCostResult,
  EngineNote,
  GrossResult,
  LineItem,
  UnsupportedCase,
} from './types';

export { CZ_2026 };

/** Calendar days in a month, without touching the clock. */
export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/**
 * A safe default input.
 *
 * §31: nothing here may hand the user a tax benefit they did not ask for. The
 * default is a Czech-resident standard employee with a signed declaration
 * claiming the basic credit, no children, no disability, no special category and
 * no discount — and every company cost at zero.
 *
 * The signed declaration IS defaulted on, because it is the ordinary case for a
 * single full-time job and because defaulting it OFF would show most visitors a
 * net wage roughly 2 570 Kč below what they actually receive, which is a worse
 * error than the reverse. The control is prominent and the result names it.
 */
export function createDefaultInput(year = 2026, month = 1): EmployerCostInput {
  return {
    period: { year, month },
    salary: {
      grossMonthlyCzk: 0,
      bonusesCzk: 0,
      otherTaxableCzk: 0,
      workingTimePercent: 100,
    },
    taxProfile: {
      residency: 'resident',
      signedDeclaration: true,
      applyBasicCredit: true,
      disability: 'none',
      ztpp: false,
      children: [],
    },
    socialMaximum: { mode: 'assume_not_reached', ytdAssessmentBaseCzk: 0 },
    healthMinimum: {
      situation: 'standard',
      applicableDays: daysInMonth(year, month),
      daysInMonth: daysInMonth(year, month),
    },
    employerOptions: {
      employeeCategory: 'standard',
      employerRateClass: 'standard',
      claimEmployerSocialDiscount: false,
      employerDiscountCategory: null,
      discountFacts: {
        agreedWeeklyHours: 40,
        fullTimeWeeklyHours: 40,
        hoursWorkedThisMonth: 0,
        employmentDaysInMonth: daysInMonth(year, month),
      },
    },
    liabilityInsurance: { enabled: false, activityKey: null, customRatePerMille: null },
    additionalCosts: { ...EMPTY_ADDITIONAL_COSTS },
  };
}

/** Sum the salary components into one taxable gross. */
function buildGross(input: EmployerCostInput): GrossResult {
  const contractualSalary = czk(input.salary.grossMonthlyCzk);
  const bonuses = czk(input.salary.bonusesCzk);
  const otherTaxable = czk(input.salary.otherTaxableCzk);
  const grossTaxable = sum([contractualSalary, bonuses, otherTaxable]);

  const lines: LineItem[] = [
    {
      key: 'contractualSalary',
      amount: contractualSalary,
      formula: 'gross.formula.contractual',
      origin: 'user-entered',
    },
  ];
  if (bonuses > ZERO) {
    lines.push({
      key: 'bonuses',
      amount: bonuses,
      formula: 'gross.formula.bonuses',
      baseNote: 'gross.note.bonusesEnterBothBases',
      origin: 'user-entered',
    });
  }
  if (otherTaxable > ZERO) {
    lines.push({
      key: 'otherTaxable',
      amount: otherTaxable,
      formula: 'gross.formula.otherTaxable',
      origin: 'user-entered',
    });
  }
  lines.push({
    key: 'grossTaxable',
    amount: grossTaxable,
    formula: 'gross.formula.total',
    origin: 'derived',
  });

  return { contractualSalary, bonuses, otherTaxable, grossTaxable, lines };
}

export function calculate(
  input: EmployerCostInput,
  rules: CzRuleset = CZ_2026,
): EmployerCostResult {
  const notes: EngineNote[] = [];
  const unsupported: UnsupportedCase[] = [];

  const validation = validateInput(input, rules);
  if (!validation.ok) {
    for (const issue of validation.issues) {
      if (issue.severity === 'error') {
        unsupported.push({
          key: issue.key,
          circumstance: issue.field,
          reason: issue.key,
          blocksResult: true,
        });
      }
    }
  }

  const gross = buildGross(input);
  const dim = input.healthMinimum.daysInMonth || daysInMonth(input.period.year, input.period.month);

  const social = calculateSocial(
    {
      grossTaxable: gross.grossTaxable,
      socialMaximum: input.socialMaximum,
      employerOptions: input.employerOptions,
      daysInMonth: dim,
    },
    rules,
  );

  const health = calculateHealth(gross.grossTaxable, input.healthMinimum, rules);
  const tax = calculateTax(gross.grossTaxable, input.taxProfile, rules);

  const liability = calculateLiabilityInsurance(
    {
      settings: input.liabilityInsurance,
      // Deliberately the UNCAPPED base: both administrators publish that the
      // annual social maximum does not reach this premium.
      uncappedMonthlySocialBase: social.uncappedBase,
    },
    rules,
  );

  // ── §15 employer statutory payroll cost ──────────────────────────────────
  const employerStatutoryTotal = sum([
    gross.grossTaxable,
    social.employerNet,
    health.employerOnActual,
    health.topUpPaidByEmployer,
    liability.monthlyAllocated,
  ]);

  const employerStatutory = {
    gross: gross.grossTaxable,
    social: social.employerNet,
    health: health.employerOnActual,
    healthMinimumTopUp: health.topUpPaidByEmployer,
    liabilityInsurance: liability.monthlyAllocated,
    total: employerStatutoryTotal,
    lines: [
      { key: 'gross', amount: gross.grossTaxable, formula: 'employer.formula.gross', origin: 'derived' as const },
      { key: 'employerSocial', amount: social.employerNet, formula: 'employer.formula.social', origin: 'statutory' as const },
      { key: 'employerHealth', amount: health.employerOnActual, formula: 'employer.formula.health', origin: 'statutory' as const },
      ...(health.topUpPaidByEmployer > ZERO
        ? [{ key: 'employerHealthTopUp', amount: health.topUpPaidByEmployer, formula: 'employer.formula.healthTopUp', origin: 'statutory' as const }]
        : []),
      ...(liability.monthlyAllocated > ZERO
        ? [{ key: 'employerLiability', amount: liability.monthlyAllocated, formula: 'employer.formula.liability', origin: 'allocated' as const }]
        : []),
      { key: 'employerStatutoryTotal', amount: employerStatutoryTotal, formula: 'employer.formula.total', origin: 'derived' as const },
    ],
  };

  // ── §16 employee net salary ──────────────────────────────────────────────
  const netBeforeBonus = subtract(
    subtract(subtract(gross.grossTaxable, social.employee), health.employee),
    tax.advanceFinal,
  );
  const net = add(netBeforeBonus, tax.taxBonus);

  const employeeNet = {
    grossTaxable: gross.grossTaxable,
    social: social.employee,
    health: health.employeeOnActual,
    healthMinimumTopUp: health.topUpPaidByEmployee,
    taxAdvance: tax.advanceFinal,
    taxBonus: tax.taxBonus,
    net,
    lines: [
      { key: 'grossTaxable', amount: gross.grossTaxable, formula: 'employee.formula.gross', origin: 'derived' as const },
      { key: 'employeeSocial', amount: social.employee, formula: 'employee.formula.social', origin: 'statutory' as const },
      { key: 'employeeHealth', amount: health.employeeOnActual, formula: 'employee.formula.health', origin: 'statutory' as const },
      ...(health.topUpPaidByEmployee > ZERO
        ? [{ key: 'employeeHealthTopUp', amount: health.topUpPaidByEmployee, formula: 'employee.formula.healthTopUp', origin: 'statutory' as const }]
        : []),
      { key: 'taxAdvance', amount: tax.advanceFinal, formula: 'employee.formula.tax', origin: 'statutory' as const },
      ...(tax.taxBonus > ZERO
        ? [{ key: 'taxBonus', amount: tax.taxBonus, formula: 'employee.formula.bonus', origin: 'statutory' as const }]
        : []),
      { key: 'net', amount: net, formula: 'employee.formula.net', origin: 'derived' as const },
    ],
  };

  // ── §17 company-specific costs ───────────────────────────────────────────
  const additional = calculateAdditionalCosts(
    input.additionalCosts as AdditionalCostInput,
  );

  const totalStatutoryEmployerCost = employerStatutoryTotal;
  const totalRealEmployerCost = add(employerStatutoryTotal, additional.monthlyCashCost);

  // ── §24 and §25 ──────────────────────────────────────────────────────────
  const metrics = deriveMetrics({
    grossTaxable: gross.grossTaxable,
    employerStatutory,
    employeeNet,
    companyMonthlyCash: additional.monthlyCashCost,
  });

  const moneyFlow = deriveMoneyFlow({
    social,
    health,
    tax,
    employeeNet,
    liabilityInsurance: liability.monthlyAllocated,
    companyMonthlyCash: additional.monthlyCashCost,
  });

  // ── §22 annual view — built from real periodicity, never monthly × 12 ────
  //
  // Every multiplication here is exact integer arithmetic on haléře. An earlier
  // version converted to koruny, multiplied, rounded and converted back, which
  // would have shed a haléř on any company cost entered with decimals.
  const statutoryAnnual = multiplyByInteger(totalStatutoryEmployerCost, 12);
  const annual = {
    recurringMonthlyTimesTwelve: multiplyByInteger(additional.monthlyRecurring, 12),
    quarterlyItems: multiplyByInteger(additional.quarterlyTotal, 4),
    annualOnlyItems: additional.annualOnly,
    oneOffItems: additional.oneOffTotal,
    totalRealEmployerCost: add(statutoryAnnual, additional.annualTotal),
    totalStatutoryEmployerCost: statutoryAnnual,
    notes: [
      {
        key: 'annual.notATwelveFoldMonthly',
        severity: 'info' as const,
        text: 'annual.note.builtFromPeriodicity',
      },
      {
        key: 'annual.statutoryIsAScenario',
        severity: 'assumption' as const,
        text: 'annual.note.statutoryAnnualAssumesTwelveIdenticalMonths',
      },
    ],
  };

  notes.push(...social.notes, ...health.notes, ...tax.notes, ...liability.notes);

  return {
    jurisdiction: 'CZ',
    taxYear: rules.taxYear,
    period: input.period,
    gross,
    social,
    health,
    tax,
    liability,
    employerStatutory,
    employeeNet,
    companyCosts: {
      monthlyCash: additional.monthlyCashCost,
      annualTotal: additional.annualTotal,
      lines: additional.lines.map((l) => ({
        key: l.key as AdditionalCostKey,
        amount: l.amount,
        formula: `additionalCosts.${l.definition.periodicity}`,
        origin: 'user-entered' as const,
      })),
    },
    totalStatutoryEmployerCost,
    totalRealEmployerCost,
    metrics,
    moneyFlow,
    annual,
    unsupported,
    notes,
  };
}

/** Net wage only — for the compact view, without assembling employer totals. */
export function calculateNet(input: EmployerCostInput, rules: CzRuleset = CZ_2026): Halere {
  return clampNonNegative(calculate(input, rules).employeeNet.net);
}
