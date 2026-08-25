/**
 * The four statutory branches, plus the levies the employer carries alone.
 *
 * Each function does one thing: turn a month's gross pay and the employee's
 * circumstances into an employer share and an employee share, in cent, through
 * the BVV procedure. None of them knows about tax, and none of them uses a rate
 * from the Programmablaufplan.
 */

import { DE_RULES_2026 } from '../../../../data/calculators/de-employer-cost/2026/rules';
import { Decimal } from '../decimal';
import type { ContributionLine, Localised } from '../types';
import {
  assessmentBase,
  employerOnly,
  splitEqually,
  splitExplicitly,
  type Cent,
  type SplitResult,
} from './bvv';

const R = DE_RULES_2026;

function line(
  key: string,
  label: Localised,
  baseCent: Cent,
  split: SplitResult,
  legalBasis: string,
  sourceId: string,
): ContributionLine {
  return {
    key,
    label,
    employerCent: split.employerCent,
    employeeCent: split.employeeCent,
    baseCent,
    employerRatePercent: split.employerPercent,
    employeeRatePercent: split.employeePercent,
    legalBasis,
    sourceId,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Rentenversicherung
// ─────────────────────────────────────────────────────────────────────────────

export function pension(monthlyGrossCent: Cent): ContributionLine {
  const base = assessmentBase(monthlyGrossCent, R.pension.monthlyCeilingCent.value);
  return line(
    'pension',
    {
      de: 'Rentenversicherung',
      en: 'Pension insurance',
      cs: 'Důchodové pojištění',
    },
    base,
    splitEqually(base, R.pension.totalPercent.value),
    R.pension.totalPercent.legalBasis,
    R.pension.totalPercent.sourceId,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Arbeitslosenversicherung
// ─────────────────────────────────────────────────────────────────────────────

export function unemployment(monthlyGrossCent: Cent): ContributionLine {
  const base = assessmentBase(monthlyGrossCent, R.unemployment.monthlyCeilingCent.value);
  return line(
    'unemployment',
    {
      de: 'Arbeitslosenversicherung',
      en: 'Unemployment insurance',
      cs: 'Pojištění v nezaměstnanosti',
    },
    base,
    splitEqually(base, R.unemployment.totalPercent.value),
    R.unemployment.totalPercent.legalBasis,
    R.unemployment.totalPercent.sourceId,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Krankenversicherung
// ─────────────────────────────────────────────────────────────────────────────

export interface HealthInput {
  /** The employee's own Krankenkasse's Zusatzbeitragssatz, in percentage points. */
  readonly supplementPercent: string;
  /** True for members with no Krankengeld entitlement — § 243 SGB V. */
  readonly reducedRate: boolean;
}

/**
 * Health insurance: the general rate and the Zusatzbeitrag, both split in half.
 *
 * They are computed as ONE contribution at the combined rate rather than two,
 * because that is how § 249 Absatz 1 SGB V arranges them and because rounding
 * them separately would round twice. The employee's Krankenkasse sets the
 * supplement, so it is an input rather than a constant — the 2,9 % in the
 * registry is the announced AVERAGE and applies to nobody in particular.
 */
export function health(monthlyGrossCent: Cent, input: HealthInput): ContributionLine {
  const base = assessmentBase(monthlyGrossCent, R.health.monthlyCeilingCent.value);
  const general = input.reducedRate ? R.health.reducedPercent : R.health.generalPercent;
  const total = Decimal.of(general.value).add(Decimal.of(input.supplementPercent)).toString();
  return line(
    'health',
    {
      de: 'Krankenversicherung',
      en: 'Health insurance',
      cs: 'Zdravotní pojištění',
    },
    base,
    splitEqually(base, total),
    `${general.legalBasis}; § 242 SGB V; § 249 Absatz 1 SGB V`,
    general.sourceId,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pflegeversicherung
// ─────────────────────────────────────────────────────────────────────────────

export interface CareInput {
  /**
   * Children under 25 whose parentage is proved to the employer.
   *
   * Under 25 matters: § 55 Absatz 3 Satz 4 SGB XI ends each child's discount
   * with the month in which that child turns 25, and a child already 25 does not
   * count at all. So this figure falls over time with nothing else changing.
   */
  readonly childrenUnder25: number;
  /** Whether the employee has ever had a child, however old that child now is. */
  readonly isParent: boolean;
  /** Employee is past the month of their 23rd birthday — § 55 Absatz 3 Satz 1. */
  readonly atLeast23: boolean;
  /** Place of work is in Saxony — § 58 Absatz 3 SGB XI. */
  readonly saxony: boolean;
}

/**
 * Long-term care insurance — the only branch where the two sides differ.
 *
 * THE EMPLOYER'S SHARE DOES NOT MOVE. It is half the base rate, less the Saxon
 * point, and nothing about the employee's children changes it. Everything else
 * here — the childless surcharge and the discounts for a second through fifth
 * child — lands on the employee alone.
 *
 * That is worth stating because § 55 Absatz 3 Satz 4 SGB XI reads as though the
 * discounts reduce "der Beitragssatz", the whole rate, and § 58 then splits the
 * Beiträge in halves. Read literally the employer would benefit from the
 * employee's children by half of each discount. It does not: the published
 * employer share is 1,8 % for every family situation, and the Programmablaufplan
 * subtracts the FULL 0,25 points per child from the employee-side rate it uses
 * for the Vorsorgepauschale, which would be 0,125 if the reduction were shared.
 *
 * SAXONY MOVES A POINT ACROSS; IT DOES NOT ADD ONE. § 58 Absatz 3 has the
 * employee bear one percentage point alone and splits the remaining 2,6 %, so
 * 2,3 % against 1,3 % — the same 3,6 % total, half a point further onto the
 * employee. An engine that adds a point instead of shifting it overstates every
 * Saxon employer's cost.
 */
export function care(monthlyGrossCent: Cent, input: CareInput): ContributionLine {
  const base = assessmentBase(monthlyGrossCent, R.care.monthlyCeilingCent.value);

  const total = Decimal.of(R.care.basePercent.value);
  const two = Decimal.of(2);
  const saxonPoint = Decimal.of(R.care.saxonyEmployeeExtraPoints.value);

  let employer: Decimal;
  let employee: Decimal;
  if (input.saxony) {
    const rest = total.subtract(saxonPoint).divideExact(two);
    employer = rest;
    employee = rest.add(saxonPoint);
  } else {
    employer = total.divideExact(two);
    employee = employer;
  }

  // NOT MODELLED — § 55 Absatz 3 Satz 2 SGB XI exempts three groups from the
  // childless surcharge outright: members born before 1 January 1940, people
  // doing Wehr- or Zivildienst, and recipients of Grundsicherungsgeld under
  // § 19 Absatz 1 Satz 1 SGB II. None of the three is asked about, so a member
  // of one of them who leaves "Elterneigenschaft nachgewiesen" unticked is
  // charged 0,6 points they do not owe. The first group is vanishing (86 or
  // older in 2026) and the other two are narrow, but the calculator does not
  // detect them and does not claim to.
  //
  // TWO INDEPENDENT TESTS, not an either/or.
  //
  // The surcharge is owed by someone who has NOT proved parenthood and is past
  // 23. The discounts are owed to someone who HAS proved it and has a second
  // child under 25. Writing them as if/else makes a third state — parenthood
  // unproved AND under 23 — fall into the discount branch, which granted
  // discounts on the strength of children the employer has no proof of.
  // § 55 Absatz 3a SGB XI makes the proof the entitlement, so it is what the
  // discount must key on.
  if (!input.isParent && input.atLeast23) {
    employee = employee.add(Decimal.of(R.care.childlessSurchargePercent.value));
  }
  if (input.isParent) {
    // Only children from the SECOND count, and only the first four of those.
    const discounted = Math.min(
      Math.max(input.childrenUnder25 - 1, 0),
      R.care.maxDiscountedChildren.value,
    );
    if (discounted > 0) {
      employee = employee.subtract(
        Decimal.of(R.care.perChildDiscountPercent.value).multiply(Decimal.of(discounted)),
      );
    }
  }

  return line(
    'care',
    {
      de: 'Pflegeversicherung',
      en: 'Long-term care insurance',
      cs: 'Pojištění dlouhodobé péče',
    },
    base,
    splitExplicitly(base, employer.toString(), employee.toString()),
    '§ 55 Absatz 1 und 3 SGB XI; § 58 SGB XI',
    R.care.basePercent.sourceId,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Umlagen
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Insolvenzgeldumlage (U3) — § 358 SGB III.
 *
 * Employer alone, on the pay that bears pension contributions, hence the pension
 * ceiling rather than the health one. Not every employer owes it: § 358 Absatz 1
 * excludes the Bund, the Länder, Gemeinden, public-law bodies over whose assets
 * no insolvency proceedings are possible, and private households — which is why
 * the caller can switch it off rather than the engine assuming it.
 */
export function insolvencyLevy(monthlyGrossCent: Cent): ContributionLine {
  const base = assessmentBase(monthlyGrossCent, R.insolvencyLevy.monthlyCeilingCent.value);
  return line(
    'insolvencyLevy',
    {
      de: 'Insolvenzgeldumlage (U3)',
      en: 'Insolvency benefit levy (U3)',
      cs: 'Odvod na insolvenční dávku (U3)',
    },
    base,
    employerOnly(base, R.insolvencyLevy.percent.value),
    R.insolvencyLevy.percent.legalBasis,
    R.insolvencyLevy.percent.sourceId,
  );
}

/**
 * U1 and U2 under the Aufwendungsausgleichsgesetz.
 *
 * NO RATE IS SUPPLIED, and none could be. Each Krankenkasse fixes its own in its
 * Satzung, and a Kasse typically offers several U1 rates against different
 * reimbursement percentages, so two employers with identical payroll and
 * different Kassen owe genuinely different amounts. A "typical" default here
 * would be a number with no source, presented beside numbers that all have one.
 *
 * U1 also applies only to employers with at most 30 employees (§ 1 Absatz 1
 * AAG); U2 applies whatever the headcount (§ 1 Absatz 2), subject to § 11 AAG,
 * whose Absatz 2 disapplies § 1 altogether in four listed cases — only one of
 * which is an employer; the rest turn on the person or the measure. The caller
 * decides, because the headcount rule has counting conventions this calculator
 * does not model.
 */
export function aagLevy(
  key: 'u1' | 'u2',
  monthlyGrossCent: Cent,
  percent: string,
): ContributionLine {
  const label: Localised =
    key === 'u1'
      ? {
          de: 'Umlage U1 (Entgeltfortzahlung)',
          en: 'Levy U1 (sick-pay reimbursement)',
          cs: 'Odvod U1 (náhrada mzdy v nemoci)',
        }
      : {
          de: 'Umlage U2 (Mutterschaft)',
          en: 'Levy U2 (maternity)',
          cs: 'Odvod U2 (mateřství)',
        };
  // § 7 Absatz 2 Satz 1 AAG fixes this by STATUTE, not by Kassen practice: the
  // levy is "ein Prozentsatz des Entgelts …, nach dem die Beiträge zur
  // gesetzlichen Rentenversicherung … bemessen werden", so the pension ceiling
  // governs because the provision says so. An earlier version of this comment
  // attributed it to what the Kassen happen to do, which made a statutory rule
  // sound like a convention a Kasse could vary.
  //
  // NOT MODELLED, and stated because the same sentence excludes them: Satz 2
  // leaves out pay of employees whose contract has run under four weeks with no
  // Entgeltfortzahlung claim, and einmalig gezahltes Arbeitsentgelt under § 23a
  // SGB IV — and this calculator refuses Einmalzahlungen as a declared case.
  const base = assessmentBase(monthlyGrossCent, R.pension.monthlyCeilingCent.value);
  return line(
    key,
    label,
    base,
    employerOnly(base, percent),
    key === 'u1' ? '§ 1 Absatz 1, § 7 AAG' : '§ 1 Absatz 2, § 7 AAG',
    'aag-u1-u2',
  );
}

/**
 * Gesetzliche Unfallversicherung — § 150 SGB VII.
 *
 * Employer alone, and deliberately modelled as an amount rather than a rate.
 * § 153 SGB VII assesses it on the ANNUAL Arbeitsentgelt and the Gefahrklasse of
 * the trade, and the Berufsgenossenschaft levies it in arrears after the year
 * ends. It is not a percentage of this month's pay, and presenting it as one
 * would put a made-up rate next to five sourced ones.
 */
export function accidentInsurance(monthlyAmountCent: Cent): ContributionLine {
  if (monthlyAmountCent < 0n) throw new RangeError('accident insurance: negative amount');
  return line(
    'accident',
    {
      de: 'Gesetzliche Unfallversicherung',
      en: 'Statutory accident insurance',
      cs: 'Zákonné úrazové pojištění',
    },
    0n,
    {
      employerCent: monthlyAmountCent,
      employeeCent: 0n,
      employerPercent: '0',
      employeePercent: '0',
    },
    '§§ 150, 153 SGB VII',
    'sgb-vii-150-153',
  );
}
