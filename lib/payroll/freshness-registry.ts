/**
 * Binds the freshness model to the shipped ruleset.
 *
 * Separate from freshness.ts so the model stays pure and testable against
 * synthetic rulesets, while this file holds the one real assembly the app uses.
 */

import { CZ_2026 } from './rules/cz-2026';
import { PAYROLL_SOURCES } from './sources';
import {
  assessFreshness,
  authoritiesFromSources,
  verifiedOnFromSources,
  type FreshnessAssessment,
  type RulesetVerification,
} from './freshness';

export { assessFreshness, verifiedOnFromSources, authoritiesFromSources };

/**
 * Verification facts for the shipped CZ 2026 ruleset — every field derived,
 * none typed in twice.
 */
export const CZ_2026_VERIFICATION: RulesetVerification = {
  verifiedOn: verifiedOnFromSources(PAYROLL_SOURCES),
  reviewDueFrom: CZ_2026.reviewDueFrom,
  verifiedAgainst: authoritiesFromSources(PAYROLL_SOURCES),
};

/** Rulesets that could supersede CZ_2026. None exists yet — see the gate. */
const SUCCESSORS: never[] = [];

/** Assess the shipped ruleset against a date the caller supplies. */
export function assessShippedRuleset(today: string): FreshnessAssessment {
  return assessFreshness(CZ_2026, CZ_2026_VERIFICATION, today, SUCCESSORS);
}
