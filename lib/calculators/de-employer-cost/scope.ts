/**
 * Is this employment one the calculator may answer at all? — §30.
 *
 * Runs before anything is computed, and stops rather than approximating.
 *
 * THE TWO DETECTED CASES ARE THE DANGEROUS ONES
 * ─────────────────────────────────────────────
 * A Minijob and a Midijob look like ordinary employment from the input side —
 * a monthly gross, nothing else. Both replace the contribution arithmetic
 * entirely: below the Geringfügigkeitsgrenze the employer pays pauschale
 * Beiträge to the Minijob-Zentrale instead of the ordinary shares, and inside
 * the Übergangsbereich the contributory base is reduced by the Faktor F with
 * the employer carrying the difference. Running the ordinary calculation on
 * either produces a result that is not approximately right — it is the answer
 * to a different question, and it looks entirely plausible.
 *
 * So the boundary is checked on the gross, and it fails closed: if the gross is
 * at or below 603 EUR, or at or below 2 000 EUR, no figures come back.
 */

import { DE_RULES_2026 } from '../../../data/calculators/de-employer-cost/2026/rules';
import { unsupportedCase, type UnsupportedCase } from './unsupported';

export interface ScopeInput {
  /** Regular monthly gross in cent. */
  readonly monthlyGrossCent: bigint;
  /** Cases the user has declared. Any one of them stops the calculation. */
  readonly declared?: readonly string[];
}

export type ScopeResult =
  | { readonly supported: true }
  | { readonly supported: false; readonly case: UnsupportedCase };

/**
 * The Übergangsbereich runs from ABOVE the Geringfügigkeitsgrenze up to and
 * including 2 000 EUR. § 20 Absatz 2 Satz 1 SGB IV, verbatim: "Der
 * Übergangsbereich im Sinne dieses Gesetzbuches umfasst Arbeitsentgelte aus
 * mehr als geringfügigen Beschäftigungen nach § 8 Absatz 1 Nummer 1, die
 * regelmäßig 2 000 Euro im Monat nicht übersteigen". So exactly 2 000,00 EUR is
 * inside it, and 2 000,01 EUR is ordinary employment — a one-cent boundary that
 * a `<` in the wrong place gets backwards.
 *
 * The lower edge comes from the cross-reference rather than from this sentence:
 * § 8 Absatz 1 Nummer 1 SGB IV is the Minijob definition, so "more than
 * geringfügig" means above the Geringfügigkeitsgrenze. An earlier version of
 * this comment put that phrase inside the quotation marks, where it is not.
 */
export function checkScope(input: ScopeInput): ScopeResult {
  // EVERY declared id is validated before any is acted on. The loop used to
  // return inside its first iteration, so only element 0 was ever checked: the
  // same set of declarations either threw or silently accepted a bad entry
  // depending on the order the caller happened to pass them in.
  const declared = input.declared ?? [];
  for (const id of declared) {
    const c = unsupportedCase(id);
    if (c.kind !== 'declared') {
      // A declared id registered as detected means the caller and the registry
      // disagree about how this case is discovered — a programming error worth
      // surfacing rather than silently accepting.
      throw new Error(`de-employer-cost: "${id}" is a detected case, not a declarable one`);
    }
  }
  if (declared.length > 0) {
    return { supported: false, case: unsupportedCase(declared[0]) };
  }

  const gross = input.monthlyGrossCent;
  if (gross <= DE_RULES_2026.scope.minijobMonthlyCent.value) {
    return { supported: false, case: unsupportedCase('minijob') };
  }
  if (gross <= DE_RULES_2026.scope.transitionUpperMonthlyCent.value) {
    return { supported: false, case: unsupportedCase('uebergangsbereich') };
  }
  return { supported: true };
}
