/**
 * What one employee costs an employer for one month, and what they take home.
 *
 * The composition point. Everything hard has already happened by the time this
 * file runs: the Programmablaufplan is in `tax/`, the Beitragsverfahrens-
 * verordnung's arithmetic is in `social/`, and the refusals are in `scope.ts`.
 * What is left is deciding what belongs on which side of the ledger, and that
 * is where an employer-cost calculator is usually wrong.
 *
 * THE LEDGER
 * ──────────
 * Employer cost is the gross plus the employer's contribution shares plus the
 * levies the employer bears alone. It does NOT include the Lohnsteuer, the
 * Solidaritätszuschlag, the Kirchensteuer, or the employee's contribution
 * shares — every one of those is withheld FROM the gross, which the employer is
 * already paying. Adding them would double-count the gross, and doing so is the
 * classic way these calculators overstate cost by roughly a third.
 *
 * MONTHLY, AND MEANT IT
 * ─────────────────────
 * § 1 Absatz 1 BVV takes the month as it stands against the monthly ceiling. So
 * this engine answers for ONE month at a stated gross and does not annualise;
 * the annual figures it reports are twelve identical months, which is what an
 * employer planning a hire wants and is not the same as a year's actual payroll
 * for someone whose pay varies.
 */

import { DE_RULES_2026 } from '../../../data/calculators/de-employer-cost/2026/rules';
import { churchTax, SAXONY, type Bundesland, type ChurchTaxResult } from './tax/church-tax';
import { runPap2026 } from './tax/pap-2026';
import {
  accidentInsurance,
  aagLevy,
  care,
  health,
  insolvencyLevy,
  pension,
  unemployment,
} from './social/branches';
import { checkScope } from './scope';
import { validateDeInput, type ValidationIssue } from './validation';
import type { ContributionLine, EngineNote, Localised } from './types';
import type { UnsupportedCase } from './unsupported';

export interface DeEmployerCostInput {
  /** Regular monthly gross, in cent. */
  readonly monthlyGrossCent: bigint;
  /** Lohnsteuerklasse, 1–6. */
  readonly steuerklasse: number;
  /** Zahl der Kinderfreibeträge from ELStAM — "0", "0.5", "1", "1.5", … */
  readonly kinderfreibetraege: string;
  /** Where the Betriebsstätte is. Drives church tax AND the Saxon care split. */
  readonly workplace: Bundesland;
  readonly churchTaxLiable: boolean;
  /** The employee's own Krankenkasse's Zusatzbeitragssatz, in percentage points. */
  readonly healthSupplementPercent: string;
  /** § 243 SGB V — members with no Krankengeld entitlement. */
  readonly reducedHealthRate: boolean;
  readonly care: {
    readonly childrenUnder25: number;
    readonly isParent: boolean;
    readonly atLeast23: boolean;
  };
  readonly employer: {
    /** U1 rate, or null when the employer has more than 30 employees. */
    readonly u1Percent: string | null;
    readonly u2Percent: string;
    /** § 358 Absatz 1 SGB III exempts public bodies and private households. */
    readonly owesInsolvencyLevy: boolean;
    /** Monthly accrual for the Berufsgenossenschaft, in cent. */
    readonly accidentMonthlyCent: bigint;
  };
  /** Unsupported cases the user has declared. */
  readonly declared?: readonly string[];
}

export interface DeEmployerCostResult {
  readonly supported: true;
  readonly monthlyGrossCent: bigint;

  /** Every contribution, with both shares — never a total that hides the split. */
  readonly contributions: readonly ContributionLine[];

  readonly employer: {
    readonly contributionsCent: bigint;
    readonly levyCent: bigint;
    /** Gross + employer contributions + levies. */
    readonly totalMonthlyCent: bigint;
    readonly totalAnnualCent: bigint;
    /** Employer cost as a multiple of gross, e.g. 1.2078. */
    readonly loadFactor: string;
  };

  readonly employee: {
    readonly socialCent: bigint;
    readonly lohnsteuerCent: bigint;
    readonly soliCent: bigint;
    readonly churchTaxCent: bigint;
    readonly totalDeductionsCent: bigint;
    readonly netCent: bigint;
  };

  readonly churchTax: ChurchTaxResult;
  readonly notes: readonly EngineNote[];
}

/**
 * Three outcomes, discriminated twice.
 *
 * `supported` separates an answer from a non-answer; `reason` separates the two
 * kinds of non-answer, because they mean opposite things to a reader. A refusal
 * says the calculator understood the question and will not answer it — a real
 * statement about German payroll. An invalid input says the question was not
 * asked properly. Collapsing them would tell someone who typed a stray digit
 * that their employment is out of scope.
 */
export type DeEmployerCostOutcome =
  | DeEmployerCostResult
  | { readonly supported: false; readonly reason: 'unsupported'; readonly case: UnsupportedCase }
  | { readonly supported: false; readonly reason: 'invalid'; readonly issues: readonly ValidationIssue[] };

const LABEL_GROSS: Localised = {
  de: 'Bruttoentgelt',
  en: 'Gross pay',
  cs: 'Hrubá mzda',
};

export function calculateDeEmployerCost(input: DeEmployerCostInput): DeEmployerCostOutcome {
  // Validation first, and before scope: a negative gross must be reported as
  // not-a-wage rather than as a Minijob, which is true of every number below
  // 603 EUR and is not why −100 EUR is wrong.
  const issues = validateDeInput(input);
  if (issues.length > 0) return { supported: false, reason: 'invalid', issues };

  const scope = checkScope({
    monthlyGrossCent: input.monthlyGrossCent,
    declared: input.declared,
  });
  // `scope.supported === false` rather than `!scope.supported`: this repository
  // compiles with `strict: false`, and without strictNullChecks the negated
  // form does not narrow the discriminated union.
  if (scope.supported === false) {
    return { supported: false, reason: 'unsupported', case: scope.case };
  }

  const gross = input.monthlyGrossCent;
  const notes: EngineNote[] = [];

  // ── Sozialversicherung ────────────────────────────────────────────────────
  const saxony = input.workplace === SAXONY;
  const contributions: ContributionLine[] = [
    pension(gross),
    unemployment(gross),
    health(gross, {
      supplementPercent: input.healthSupplementPercent,
      reducedRate: input.reducedHealthRate,
    }),
    care(gross, { ...input.care, saxony }),
  ];

  const levies: ContributionLine[] = [];
  if (input.employer.owesInsolvencyLevy) levies.push(insolvencyLevy(gross));
  if (input.employer.u1Percent !== null) {
    levies.push(aagLevy('u1', gross, input.employer.u1Percent));
    if (Number(input.employer.u1Percent) === 0) {
      // Ticking "takes part in U1" and leaving the rate blank is a missing
      // input, not a rate of zero — the same situation as U2 and as the
      // accident figure, both of which warn. This one did not, so the total was
      // reported as complete with a U1 line of 0,00 EUR.
      notes.push({ key: 'u1.missing', severity: 'warning', text: 'de.note.u1Missing' });
    }
  } else {
    notes.push({ key: 'u1.notApplicable', severity: 'info', text: 'de.note.u1OverThirty' });
  }
  levies.push(aagLevy('u2', gross, input.employer.u2Percent));
  if (Number(input.employer.u2Percent) === 0) {
    // § 1 Absatz 2 AAG imposes U2 whatever the headcount, where U1 stops at 30
    // employees, so for an ordinary employer a zero rate is a missing input
    // rather than a real one — the same situation as a missing
    // accident-insurance figure, and it warns in the same way. NOT "without
    // exception", which is what this comment used to say: § 11 Absatz 2 AAG
    // disapplies § 1 entirely in FOUR listed cases — and only one of the four is
    // an employer. The other three are defined by the PERSON or the MEASURE:
    // mitarbeitende Familienangehörige of a farming business, subsidised
    // Einstiegsqualifizierungen and geförderte Berufsausbildungen under § 54a
    // and § 76 Absatz 7 SGB III, and people with disabilities in a recognised
    // Werkstatt. (§ 11 Absatz 1 separately disapplies § 1 Absatz 1 — U1 only —
    // to the public sector and others.) An earlier correction called all four
    // "groups of employers", which is what happens when a count is checked and
    // the content is not. None is modelled here, and the warning is worded so it
    // does not assert something false of them.
    notes.push({ key: 'u2.missing', severity: 'warning', text: 'de.note.u2Missing' });
  }
  if (input.employer.accidentMonthlyCent > 0n) {
    levies.push(accidentInsurance(input.employer.accidentMonthlyCent));
  } else {
    notes.push({ key: 'accident.absent', severity: 'warning', text: 'de.note.accidentMissing' });
  }

  // ── Lohnsteuer ────────────────────────────────────────────────────────────
  //
  // The care flags reach the Programmablaufplan too, because they change the
  // Vorsorgepauschale as well as the contribution. PVZ and PVA are exclusive
  // there, exactly as they are in § 55 Absatz 3 SGB XI.
  const childless = !input.care.isParent && input.care.atLeast23;
  // Keyed on the PROOF, exactly as the contribution is — § 55 Absatz 3a SGB XI.
  // An employee whose parenthood is not proved gets no Abschlag in the
  // Vorsorgepauschale either, or the tax base and the contribution would
  // disagree about the same person.
  const discountedChildren = input.care.isParent
    ? Math.min(
        Math.max(input.care.childrenUnder25 - 1, 0),
        DE_RULES_2026.care.maxDiscountedChildren.value,
      )
    : 0;

  const pap = runPap2026({
    LZZ: 2,
    RE4: Number(gross),
    STKL: input.steuerklasse,
    ZKF: input.kinderfreibetraege,
    KVZ: input.healthSupplementPercent,
    PVS: saxony ? 1 : 0,
    PVZ: childless ? 1 : 0,
    PVA: childless ? 0 : discountedChildren,
    // The calculator's supported case: statutory cover in every branch. The
    // alternatives are refusals, not inputs — see unsupported.ts.
    KRV: 0,
    ALV: 0,
    PKV: 0,
    R: input.churchTaxLiable ? 1 : 0,
  });

  const lohnsteuerCent = pap.outputs.LSTLZZ.longValue();
  const soliCent = pap.outputs.SOLZLZZ.longValue();
  const kirchensteuer = churchTax(pap.outputs.BK.longValue(), {
    workplace: input.workplace,
    liable: input.churchTaxLiable,
  });

  // Steuerklasse VI ordinarily means a SECOND employment, and the ceilings work
  // across all of them — which is precisely the case the registry refuses as
  // `mehrfachbeschaeftigung`. It is not certain (class VI also arises on a first
  // job when no tax ID is supplied), so this warns rather than refuses.
  if (input.steuerklasse === 6) {
    notes.push({ key: 'stkl6.secondJob', severity: 'warning', text: 'de.note.stkl6SecondJob' });
  }

  // Class II presupposes a child, and a Kinderfreibetrag is only granted for
  // one — yet parenthood is recorded as unproved. The engine honours what it is
  // told, because § 55 Absatz 3a SGB XI makes the PROOF the entitlement, but the
  // combination is worth pointing at.
  if (!input.care.isParent && (input.steuerklasse === 2 || Number(input.kinderfreibetraege) > 0)) {
    notes.push({ key: 'care.proofMissing', severity: 'warning', text: 'de.note.parenthoodUnproved' });
  }

  if (kirchensteuer.kappungUnmodelled && input.churchTaxLiable) {
    notes.push({
      key: 'kirchensteuer.kappung',
      severity: 'assumption',
      text: 'de.note.kappungNotModelled',
    });
  }

  // ── Zusammenführung ───────────────────────────────────────────────────────
  const sum = (xs: readonly ContributionLine[], side: 'employerCent' | 'employeeCent') =>
    xs.reduce((a, l) => a + l[side], 0n);

  const employerContributions = sum(contributions, 'employerCent');
  const employerLevies = sum(levies, 'employerCent');
  const employeeSocial = sum(contributions, 'employeeCent');

  const employerTotal = gross + employerContributions + employerLevies;
  const employeeDeductions =
    employeeSocial + lohnsteuerCent + soliCent + kirchensteuer.amountCent;

  return {
    supported: true,
    monthlyGrossCent: gross,
    contributions: [...contributions, ...levies],
    employer: {
      contributionsCent: employerContributions,
      levyCent: employerLevies,
      totalMonthlyCent: employerTotal,
      totalAnnualCent: employerTotal * 12n,
      loadFactor: loadFactor(employerTotal, gross),
    },
    employee: {
      socialCent: employeeSocial,
      lohnsteuerCent,
      soliCent,
      churchTaxCent: kirchensteuer.amountCent,
      totalDeductionsCent: employeeDeductions,
      netCent: gross - employeeDeductions,
    },
    churchTax: kirchensteuer,
    notes,
  };
}

/**
 * Employer cost ÷ gross, to four decimal places.
 *
 * Exact integer arithmetic rather than a float division, because this number
 * gets displayed as a headline ("1,21 ×") and a last-place wobble in a headline
 * is the kind of thing that makes a reader distrust everything under it.
 */
function loadFactor(totalCent: bigint, grossCent: bigint): string {
  if (grossCent === 0n) return '0.0000';
  const scaled = (totalCent * 10_000n) / grossCent;
  const whole = scaled / 10_000n;
  const frac = (scaled % 10_000n).toString().padStart(4, '0');
  return `${whole}.${frac}`;
}

export { LABEL_GROSS };
