/**
 * The arithmetic of a German social-insurance contribution.
 *
 * Not the rates — those are in the registry. This is the Beitragsverfahrens-
 * verordnung's prescribed *procedure*, which is specific enough that getting it
 * wrong costs a cent per branch per month, and general enough that it is the
 * same for all five branches.
 *
 * THE PART EVERYONE GETS WRONG
 * ────────────────────────────
 * § 2 Absatz 1 Satz 1 BVV, in full: "Beiträge, die der Arbeitgeber und der
 * Beschäftigte je zur Hälfte tragen, werden durch Anwendung des halben
 * Beitragssatzes auf das Arbeitsentgelt und anschließender Verdoppelung des
 * gerundeten Ergebnisses berechnet."
 *
 * Half the rate, ROUND, then double. Not the whole rate rounded and then
 * halved — those differ, and they differ on ordinary salaries. At 18,6 % on
 * 3 000,05 EUR the statutory route gives 9,3 % → 279,00465 → 279,00 → 558,00,
 * while computing the whole first gives 558,0093 → 558,01. One cent, every
 * month, on the branch with the largest base.
 *
 * Where the split is NOT equal — the Pflegeversicherung with a childless
 * surcharge, or anywhere in Saxony — Satz 3 applies instead: each side is
 * computed and rounded on its own, and the total is their sum. So the total is
 * a consequence of the two shares and must never be computed first and split.
 * That is why `ContributionLine` carries both shares and no total.
 *
 * ROUNDING
 * ────────
 * § 1 Absatz 2 BVV: "Die Rechengänge werden ohne Rundung der einzelnen
 * Zwischenergebnisse durchgeführt. Das Gesamtergebnis wird auf zwei
 * Dezimalstellen berechnet; die zweite Dezimalstelle wird um 1 erhöht, wenn
 * sich in der dritten Dezimalstelle eine der Zahlen 5 bis 9 ergibt."
 *
 * Two instructions. Intermediates are not rounded AT ALL — which is why this
 * module works in exact decimals and never in cent until the final step. And
 * the final step is HALF_UP: "third digit 5 to 9" is exactly the condition
 * "remainder ≥ half a cent", because a third digit of 4 caps the remainder
 * below half a cent no matter what follows it.
 *
 * THE BASE
 * ────────
 * § 1 Absatz 1 BVV takes pay up to the MONTHLY ceiling. Not a twelfth of the
 * annual one applied to a running annual total — the month stands alone, and a
 * calculator that annualises first will disagree with the payslip for anyone
 * whose pay varies.
 */

import { Decimal } from '../decimal';

/** Cent as an exact integer. Every monetary value crossing a module boundary. */
export type Cent = bigint;

const HUNDRED = Decimal.of(100);

/**
 * Cent → euro, EXACTLY, at whatever scale the quotient terminates at.
 *
 * Not "as a scale-2 decimal", which is what this said: `divideExact` returns
 * Java's preferred scale, so 350000n comes back as 3500 at scale 0 and 350005n
 * at scale 2. The VALUE is exact in every case, and every consumer either
 * multiplies — where scales add — or finishes with setScale(2, HALF_UP), which
 * pads rather than rounds. No contribution changes. But a reader who took the
 * old sentence literally would expect a property the type does not have.
 */
export function centToEuro(cent: Cent): Decimal {
  return Decimal.of(cent.toString()).divideExact(HUNDRED);
}

/** A rounded euro amount → cent. Exact where the caller has already rounded. */
export function euroToCent(euro: Decimal): Cent {
  return euro.setScale(2, 'HALF_UP').unscaled;
}

/**
 * Pay for the month, capped at the branch ceiling.
 *
 * The cap is the whole of the ceiling's job. Nothing else in the calculation
 * knows the employee earns more, which is the point: above the
 * Beitragsbemessungsgrenze the marginal contribution is zero, for the employer
 * as well as the employee.
 */
export function assessmentBase(monthlyGrossCent: Cent, monthlyCeilingCent: Cent): Cent {
  if (monthlyGrossCent < 0n) throw new RangeError('bvv: negative gross');
  return monthlyGrossCent > monthlyCeilingCent ? monthlyCeilingCent : monthlyGrossCent;
}

/** One side's contribution: rate × base, rounded once, per § 1 Absatz 2 BVV. */
export function share(baseCent: Cent, percent: string): Cent {
  const rate = Decimal.of(percent);
  if (rate.compareTo(Decimal.ZERO) < 0) {
    // A negative rate would mean the branch pays the employee. It cannot arise
    // from the registry, but it CAN arise from arithmetic on the care rate if
    // the child discounts are applied without the statutory cap of four, so
    // this is a real guard rather than a defensive reflex.
    throw new RangeError(`bvv: negative contribution rate ${percent}`);
  }
  // divideExact, not divideScaled: § 1 Absatz 2 BVV says the intermediate
  // results are not rounded, and dividing by 100 always terminates, so there is
  // no reason to choose a scale here. Truncating at four decimals would in fact
  // give the same answer — a third digit of 4 can never reach half a cent — but
  // "the shortcut happens to be safe" is a worse thing to have in a payroll
  // engine than the exact operation the ordinance describes.
  return euroToCent(centToEuro(baseCent).multiply(rate).divideExact(HUNDRED));
}

export interface SplitResult {
  readonly employerCent: Cent;
  readonly employeeCent: Cent;
  readonly employerPercent: string;
  readonly employeePercent: string;
}

/**
 * An equally split contribution — § 2 Absatz 1 Satz 1 BVV.
 *
 * Half the rate, rounded, is each side's share. The doubling the statute
 * describes produces the total, which callers derive by adding rather than
 * being handed, so that the equal and unequal paths return the same shape.
 */
export function splitEqually(baseCent: Cent, totalPercent: string): SplitResult {
  // Halving a terminating decimal always terminates, so this is exact for every
  // rate the registry can hold and every Zusatzbeitrag a user can type.
  const half = Decimal.of(totalPercent).divideExact(Decimal.of(2));
  const halfStr = half.toString();
  const each = share(baseCent, halfStr);
  return {
    employerCent: each,
    employeeCent: each,
    employerPercent: halfStr,
    employeePercent: halfStr,
  };
}

/**
 * An unequally split contribution — § 2 Absatz 1 Satz 3 BVV.
 *
 * "Die Summe der getrennt berechneten gerundeten Anteile": each side rounded in
 * its own right. Deriving one side as total-minus-the-other is off by a cent
 * whenever both halves round the same way, which is about half the time.
 */
export function splitExplicitly(
  baseCent: Cent,
  employerPercent: string,
  employeePercent: string,
): SplitResult {
  return {
    employerCent: share(baseCent, employerPercent),
    employeeCent: share(baseCent, employeePercent),
    employerPercent,
    employeePercent,
  };
}

/** A levy the employer bears alone — Umlagen, Insolvenzgeldumlage. */
export function employerOnly(baseCent: Cent, percent: string): SplitResult {
  return {
    employerCent: share(baseCent, percent),
    employeeCent: 0n,
    employerPercent: percent,
    employeePercent: '0',
  };
}
