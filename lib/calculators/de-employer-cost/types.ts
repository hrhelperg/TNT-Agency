/**
 * The German employer-cost calculator's own vocabulary.
 *
 * WHY `Ruled<T>` IS REDECLARED HERE RATHER THAN IMPORTED
 * ─────────────────────────────────────────────────────
 * The Czech calculator has an interface of the same shape, and importing it
 * would save five lines. It would also put a `import … from '../cz-employer-cost'`
 * in the German engine, which is the exact edge §47 exists to keep empty — and a
 * boundary that holds only for the imports someone judged "legal enough" is not
 * a boundary. Five lines is a cheap price for a rule that needs no judgement.
 */

import type { RuleStatus, Ruled } from '../../../data/calculators/de-employer-cost/types';

export type { RuleStatus, Ruled };

/** The three languages the calculator publishes in. */
export type DeLocale = 'de' | 'en' | 'cs';

export type Localised = Readonly<Record<DeLocale, string>>;

/**
 * A contribution or cost line, in cent.
 *
 * Employer and employee shares are carried SEPARATELY and are not derived from
 * each other. § 2 Absatz 1 BVV rounds each side in its own right wherever the
 * split is unequal, so a "total minus employer" employee share would be wrong by
 * a cent in exactly the cases that matter — the Pflegeversicherung with a
 * childless surcharge, and Saxony.
 */
export interface ContributionLine {
  readonly key: string;
  readonly label: Localised;
  /** Cent borne by the employer. */
  readonly employerCent: bigint;
  /** Cent borne by the employee. */
  readonly employeeCent: bigint;
  /** The assessment base actually used, in cent — after any ceiling. */
  readonly baseCent: bigint;
  /** Percentage points applied, for the workings panel. */
  readonly employerRatePercent: string;
  readonly employeeRatePercent: string;
  readonly legalBasis: string;
  readonly sourceId: string;
}

/** Severity of something the engine needs the reader to know. */
export type NoteSeverity = 'info' | 'assumption' | 'warning';

export interface EngineNote {
  readonly key: string;
  readonly severity: NoteSeverity;
  /** A translation key, never a rendered sentence — §33. */
  readonly text: string;
}
