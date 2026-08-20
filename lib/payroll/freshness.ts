/**
 * Verification status for a payroll ruleset.
 *
 * The problem this solves
 * ───────────────────────
 * The calculator told visitors its rules were "ověřená k 2026-07-18 u ČSSZ,
 * Finanční správy, MPSV a VZP" from a string constant typed into the page, next
 * to a hardcoded "2026". The ruleset carried `effectiveFrom` and `effectiveTo`
 * that nothing read. So the page could keep asserting a verified 2026 ruleset
 * indefinitely — including in January 2027, when the government's annual decrees
 * have changed the minimum wage, the average wage, the 23 % threshold and the
 * maximum assessment base, and every number on the page would be wrong while
 * still labelled verified.
 *
 * What this is NOT
 * ────────────────
 * There is no universal freshness interval here. "Thirty days old therefore
 * stale" would be a fiction: Czech payroll parameters are set by government
 * decree on an annual cycle effective 1 January, so a ruleset verified in July
 * is not more suspect in August than it was in July. The meaningful boundary is
 * the ruleset's own effective window, plus a review date the ruleset declares
 * for itself. Both come from the data, not from a constant in this file.
 *
 * Statuses
 * ────────
 *   VERIFIED    today is inside the effective window, and the verification
 *               happened on or after the window opened — so what was checked is
 *               the ruleset that currently applies.
 *   REVIEW_DUE  still inside the window and still correct to use, but past the
 *               date this ruleset declared for its own re-check. For CZ this is
 *               when next year's decrees start being published, so the next
 *               ruleset becomes knowable while this one still applies.
 *   STALE       today is past effectiveTo and no successor covers today. The
 *               figures are last year's. They are still returned — see below.
 *   SUPERSEDED  a ruleset for a later tax year covers today, so this one should
 *               no longer be the default.
 *   DRAFT       the ruleset has not been verified against official sources at
 *               all, or was verified before its own window opened. Never shown
 *               as verified.
 *
 * What happens at the year boundary
 * ─────────────────────────────────
 * Nothing is guessed. When a ruleset goes STALE the engine keeps returning the
 * last known official figures — it does not switch to invented new-year values,
 * and it does not return zeros, either of which would be worse than a clearly
 * labelled out-of-date answer. The status is what changes, and the UI is
 * required to surface it.
 */

import type { RuleRegistry } from './types';
import { PAYROLL_SOURCES, type PayrollSource } from './sources';

export type VerificationStatus = 'VERIFIED' | 'REVIEW_DUE' | 'STALE' | 'SUPERSEDED' | 'DRAFT';

export interface RulesetVerification {
  /**
   * ISO date the ruleset's values were checked against official sources.
   *
   * Derived from lib/payroll/sources.ts, which records the access date on every
   * source entry. It is deliberately NOT a second constant: the page used to
   * carry its own copy, and two copies of a verification date are two chances
   * to claim a check that did not happen.
   */
  readonly verifiedOn: string;
  /**
   * ISO date from which this ruleset should be re-checked, declared by the
   * ruleset itself rather than computed from an interval. For CZ rulesets this
   * is the point in the year when the following year's decrees begin appearing.
   */
  readonly reviewDueFrom: string;
  /** Authorities actually cited by the sources behind this ruleset. */
  readonly verifiedAgainst: readonly string[];
}

export interface FreshnessAssessment {
  readonly status: VerificationStatus;
  readonly taxYear: number;
  readonly verifiedOn: string;
  readonly effectiveFrom: string;
  readonly effectiveTo: string;
  /** Machine-readable reason, for gates and tests. */
  readonly reason: string;
  /** True when the figures may no longer be the ones in force. */
  readonly requiresNotice: boolean;
}

/** The single recorded verification date: the newest access date on any source. */
export function verifiedOnFromSources(sources: readonly PayrollSource[] = PAYROLL_SOURCES): string {
  const dates = sources.map((s) => s.accessed).filter(Boolean).sort();
  if (!dates.length) throw new Error('payroll sources carry no access date — verification cannot be claimed');
  // The OLDEST access date, not the newest: a claim of verification is only as
  // strong as its weakest source. Taking the newest would let one freshly
  // re-checked source make a stale registry look current.
  return dates[0];
}

/** Authorities actually behind the ruleset — derived, never typed into copy. */
export function authoritiesFromSources(sources: readonly PayrollSource[] = PAYROLL_SOURCES): readonly string[] {
  const seen: string[] = [];
  for (const s of sources) if (!seen.includes(s.authority)) seen.push(s.authority);
  return seen;
}

const isIsoDate = (s: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(s);

/**
 * Assess a ruleset against a date. Pure: `today` is always passed in, never read
 * from the clock, so the year boundary is testable rather than a thing that
 * happens to production on 1 January.
 */
export function assessFreshness(
  registry: RuleRegistry,
  verification: RulesetVerification,
  today: string,
  successors: readonly RuleRegistry[] = [],
): FreshnessAssessment {
  for (const [label, value] of [
    ['today', today],
    ['verifiedOn', verification.verifiedOn],
    ['reviewDueFrom', verification.reviewDueFrom],
    ['effectiveFrom', registry.effectiveFrom],
    ['effectiveTo', registry.effectiveTo],
  ] as const) {
    if (!isIsoDate(value)) throw new Error(`freshness: ${label} must be an ISO date, received "${value}"`);
  }

  const base = {
    taxYear: registry.taxYear,
    verifiedOn: verification.verifiedOn,
    effectiveFrom: registry.effectiveFrom,
    effectiveTo: registry.effectiveTo,
  };

  // A verification that predates the window checked a different ruleset.
  if (verification.verifiedOn < registry.effectiveFrom) {
    return { ...base, status: 'DRAFT', requiresNotice: true, reason: `verified ${verification.verifiedOn}, before the window opened ${registry.effectiveFrom}` };
  }

  const successor = successors.find((r) => r.taxYear > registry.taxYear && today >= r.effectiveFrom && today <= r.effectiveTo);
  if (successor) {
    return { ...base, status: 'SUPERSEDED', requiresNotice: true, reason: `tax year ${successor.taxYear} covers ${today}` };
  }

  if (today > registry.effectiveTo) {
    return { ...base, status: 'STALE', requiresNotice: true, reason: `${today} is past effectiveTo ${registry.effectiveTo}; annual decrees have very likely changed these values` };
  }

  if (today < registry.effectiveFrom) {
    return { ...base, status: 'DRAFT', requiresNotice: true, reason: `${today} is before effectiveFrom ${registry.effectiveFrom}` };
  }

  if (today >= verification.reviewDueFrom) {
    return { ...base, status: 'REVIEW_DUE', requiresNotice: false, reason: `past the declared review date ${verification.reviewDueFrom}; still in force until ${registry.effectiveTo}` };
  }

  return { ...base, status: 'VERIFIED', requiresNotice: false, reason: `verified ${verification.verifiedOn}, in force ${registry.effectiveFrom}–${registry.effectiveTo}` };
}
