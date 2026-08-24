/**
 * Input validation — the engine's own front door.
 *
 * WHY THE ENGINE VALIDATES RATHER THAN TRUSTING THE FORM
 * ─────────────────────────────────────────────────────
 * The component constrains almost everything: the Steuerklasse and the
 * Bundesland are `<select>`s, the child count is a number field with bounds.
 * So for a user driving the page, most of this never fires.
 *
 * It exists because `calculateDeEmployerCost` is an exported function and the
 * form is not the only caller — tests call it, and anything added later will
 * too. An adversarial pass over the engine found what happens without it, and
 * the answers were worse than a crash:
 *
 *   • Steuerklasse 0, 7, 1.5 and NaN each produced a confident net wage. There
 *     is no seventh tax class; the Programmablaufplan simply falls through its
 *     comparisons and computes something.
 *   • A Zusatzbeitragssatz of 900 returned a net of MINUS 11 109,00 EUR,
 *     rendered as a currency figure like any other.
 *   • A negative Kinderfreibetrag, a negative supplementary rate and an unknown
 *     Bundesland were all accepted.
 *   • A negative gross was rejected — as a Minijob, which is true of every
 *     number below 603 and is not why −100 EUR is wrong.
 *
 * Every one of those is worse than an error, because a number on the page is
 * read as an answer. The rule is the same as everywhere else in this
 * calculator: when the input is outside what the rules describe, say so and
 * return nothing.
 *
 * PLAUSIBILITY BOUNDS ARE NOT LEGAL LIMITS
 * ────────────────────────────────────────
 * A few checks below bound a value that the law does not bound — the
 * supplementary health rate, the U1/U2 rates, the child count. Those are
 * marked as such. They exist to catch a typed decimal point in the wrong place,
 * and each is set far outside anything real so that a genuine outlier still
 * calculates.
 */

import { BUNDESLAND_NAMES, type Bundesland } from './tax/church-tax';

export interface ValidationIssue {
  /** Which input, in the shape the caller passed it. */
  readonly field: string;
  /** A translation key — §33, never a rendered sentence. */
  readonly key: string;
}

/** One euro short of a hundred million a month. Beyond this, someone mistyped. */
const MAX_MONTHLY_CENT = 10_000_000_000n;

/** § 55 Absatz 3 SGB XI discounts stop at the fifth child; twenty is generous. */
const MAX_CHILDREN = 20;

/**
 * Rates are decimal strings with at most two decimals, which is the precision
 * every published German contribution rate uses and the precision beyond which
 * § 1 Absatz 2 BVV's rounding makes a difference invisible anyway.
 */
const RATE = /^\d{1,3}(\.\d{1,2})?$/;

/** Zusatzbeitragssätze sit between 0 and about 5 %. Ten is a typo guard. */
const MAX_SUPPLEMENT = 10;
/** U1 can exceed 4 % at some Kassen; twenty is far outside anything real. */
const MAX_LEVY = 20;

export interface ValidatableInput {
  readonly monthlyGrossCent: bigint;
  readonly steuerklasse: number;
  readonly kinderfreibetraege: string;
  readonly workplace: Bundesland;
  readonly healthSupplementPercent: string;
  readonly care: { readonly childrenUnder25: number };
  readonly employer: {
    readonly u1Percent: string | null;
    readonly u2Percent: string;
    readonly accidentMonthlyCent: bigint;
  };
}

const isInteger = (n: number) => Number.isFinite(n) && Number.isInteger(n);

function checkRate(
  issues: ValidationIssue[],
  field: string,
  key: string,
  value: string,
  max: number,
): void {
  if (!RATE.test(value)) {
    issues.push({ field, key: `${key}.unreadable` });
    return;
  }
  if (Number(value) > max) issues.push({ field, key: `${key}.implausible` });
}

export function validateDeInput(input: ValidatableInput): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // A negative gross is not a Minijob — it is not a wage. Reported for what it
  // is, before scope detection gets a chance to give a true-but-wrong reason.
  if (input.monthlyGrossCent < 0n) {
    issues.push({ field: 'monthlyGrossCent', key: 'gross.negative' });
  } else if (input.monthlyGrossCent > MAX_MONTHLY_CENT) {
    issues.push({ field: 'monthlyGrossCent', key: 'gross.implausible' });
  }

  if (!isInteger(input.steuerklasse) || input.steuerklasse < 1 || input.steuerklasse > 6) {
    issues.push({ field: 'steuerklasse', key: 'steuerklasse.outOfRange' });
  }

  // Halves are real — a Kinderfreibetrag is split between parents — so the
  // pattern allows one decimal and nothing finer.
  if (!/^\d{1,2}(\.\d)?$/.test(input.kinderfreibetraege)) {
    issues.push({ field: 'kinderfreibetraege', key: 'kinderfreibetraege.unreadable' });
  }

  if (!Object.prototype.hasOwnProperty.call(BUNDESLAND_NAMES, input.workplace)) {
    issues.push({ field: 'workplace', key: 'workplace.unknown' });
  }

  checkRate(
    issues,
    'healthSupplementPercent',
    'supplement',
    input.healthSupplementPercent,
    MAX_SUPPLEMENT,
  );

  const children = input.care.childrenUnder25;
  if (!isInteger(children) || children < 0 || children > MAX_CHILDREN) {
    issues.push({ field: 'care.childrenUnder25', key: 'children.outOfRange' });
  }

  if (input.employer.u1Percent !== null) {
    checkRate(issues, 'employer.u1Percent', 'u1', input.employer.u1Percent, MAX_LEVY);
  }
  checkRate(issues, 'employer.u2Percent', 'u2', input.employer.u2Percent, MAX_LEVY);

  if (input.employer.accidentMonthlyCent < 0n) {
    issues.push({ field: 'employer.accidentMonthlyCent', key: 'accident.negative' });
  } else if (input.employer.accidentMonthlyCent > MAX_MONTHLY_CENT) {
    issues.push({ field: 'employer.accidentMonthlyCent', key: 'accident.implausible' });
  }

  return issues;
}
