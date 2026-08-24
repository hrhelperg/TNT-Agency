/**
 * The shape of a Czech payroll ruleset for one tax year.
 *
 * The TYPE lives here; the VALUES live in `2026.ts` and in the sourced registry
 * under data/calculators/cz-employer-cost/. That separation is what makes §26
 * work: adding CZ/2027 means adding a file, never editing 2026, and a 2026
 * result stays reproducible for as long as this type is satisfied.
 *
 * Every rate and threshold is `Ruled<T>` — value plus source id, legal basis and
 * confidence. There is no bare number in this interface, deliberately: a field
 * typed as `number` is a field somebody can fill in without saying where it came
 * from, and §1 of the brief exists because that is how magic constants get in.
 *
 * A rule whose `status` is `unresolved` is carried, not omitted. The engine reads
 * the status and declines to model the feature (§28), which is a different and
 * far more useful outcome than the value silently being absent.
 */

import type { RuleStatus, Ruled } from '../../types';

export type { RuleStatus, Ruled };

/**
 * Employer social-insurance rate classes.
 *
 * § 5a odst. 1 zákona č. 589/1992 Sb. splits the employer's assessment base into
 * up to three aggregates, one per class, each generating its own premium. Only
 * `standard` may ever be the default: applying a rescue-service or high-risk
 * rate to an ordinary worker would overstate the employer's cost, which §9 of
 * the brief forbids explicitly.
 */
export type EmployerSocialClass = 'standard' | 'rescue_services' | 'risk_work';

export interface EmployerSocialRate {
  readonly class: EmployerSocialClass;
  readonly rate: Ruled<number>;
  /** Who the class covers, in Czech, for the UI. */
  readonly appliesToCs: string;
}

/**
 * One row of the statutory employer-liability insurance rate table
 * (vyhláška č. 125/1993 Sb.).
 */
export interface LiabilityActivityRate {
  readonly key: string;
  readonly labelCs: string;
  readonly labelEn: string;
  readonly labelDe: string;
  /** Rate in per mille (‰) of the assessment base. */
  readonly ratePerMille: number;
  /** The classification code the vyhláška's table row carries. */
  readonly classificationCode: string;
}

export interface LiabilityInsuranceRules {
  readonly status: RuleStatus;
  readonly sourceId: string;
  readonly legalBasis: string;
  readonly activities: readonly LiabilityActivityRate[];
  /** Statutory minimum premium per quarter, CZK, or null when none is established. */
  readonly minimumQuarterlyPremium: Ruled<number | null>;
  /**
   * Whether the annual social maximum assessment base applies to this premium.
   *
   * Recorded explicitly because getting it wrong silently caps a high earner's
   * contribution to an insurance that has no such cap.
   */
  readonly annualSocialMaximumApplies: Ruled<boolean>;
  readonly note: string;
}

/** §10 employer social-insurance discount (sleva na pojistném), § 7a zákona č. 589/1992 Sb. */
export interface EmployerDiscountRules {
  readonly status: RuleStatus;
  readonly sourceId: string;
  readonly legalBasis: string;
  readonly ratePercent: Ruled<number>;
  /** Agreed weekly working time must fall within this band, in hours. */
  readonly weeklyHoursMin: Ruled<number>;
  readonly weeklyHoursMax: Ruled<number>;
  /** Monthly assessment-base ceiling, as a multiple of the average wage. */
  readonly monthlyBaseCeilingMultiple: Ruled<number>;
  /** Per-hour assessment-base ceiling, as a percentage of the average wage. */
  readonly hourlyBaseCeilingPercent: Ruled<number>;
  /** Categories exempt from the reduced-working-time condition. */
  readonly categoriesExemptFromHoursCondition: readonly string[];
  /** Conditions a calculator cannot verify from its inputs — surfaced to the user. */
  readonly unverifiableConditionsCs: readonly string[];
  readonly note: string;
}

/** §11 working old-age pensioner relief. */
export interface WorkingPensionerRules {
  readonly status: RuleStatus;
  readonly sourceId: string;
  readonly legalBasis: string;
  /** The employee's social rate for a working old-age pensioner, or null when unresolved. */
  readonly employeeSocialRate: Ruled<number | null>;
  /** Whether the employer's rate changes. */
  readonly employerRateChanges: Ruled<boolean>;
  readonly note: string;
}

/** §13 minimum health assessment base, § 3 zákona č. 592/1992 Sb. */
export interface HealthMinimumRules {
  readonly status: RuleStatus;
  readonly sourceId: string;
  readonly legalBasis: string;
  readonly monthlyMinimum: Ruled<number>;
  /** The statutory exemption categories, in Czech, for the UI to enumerate honestly. */
  readonly exemptionCategoriesCs: readonly string[];
  /**
   * Whether the shortfall top-up is borne by the EMPLOYER when the low base
   * arises from an obstacle on the employer's side.
   */
  readonly employerBearsTopUpOnEmployerObstacle: Ruled<boolean>;
  /** The rate applied to the shortfall. */
  readonly topUpRatePercent: Ruled<number>;
  readonly note: string;
}

export interface ChildBenefitRules {
  readonly firstMonthly: Ruled<number>;
  readonly secondMonthly: Ruled<number>;
  readonly thirdPlusMonthly: Ruled<number>;
  readonly ztppMultiplier: Ruled<number>;
  /** Minimum monthly income for a monthly bonus — half the minimum wage. */
  readonly bonusMinMonthlyIncome: Ruled<number>;
  /** A monthly bonus below this is not paid out. § 35d odst. 4 ZDP. */
  readonly bonusMinPayout: Ruled<number>;
}

export interface RoundingRules {
  /** § 5d zákona č. 589/1992 Sb. — assessment bases, up to whole CZK. */
  readonly socialAssessmentBase: 'up_to_czk';
  /** § 7 odst. 3 zákona č. 589/1992 Sb. — the premium, up to whole CZK. */
  readonly socialPremium: 'up_to_czk';
  /** Health premium, up to whole CZK. */
  readonly healthPremium: 'up_to_czk';
  /** § 38h odst. 1 ZDP — base of 100 CZK or less, up to whole CZK. */
  readonly taxBaseLow: 'up_to_czk';
  /** § 38h odst. 1 ZDP — base above 100 CZK, up to whole hundreds. */
  readonly taxBaseHigh: 'up_to_hundred_czk';
  /** § 38h odst. 3 ZDP — the advance, up to whole CZK. */
  readonly taxAdvance: 'up_to_czk';
  /** § 36 odst. 3 ZDP — withholding tax, DOWN to whole CZK. The only downward tax rounding. */
  readonly withholdingTax: 'down_to_czk';
}

export interface CzRuleset {
  readonly jurisdiction: 'CZ';
  readonly taxYear: number;
  readonly effectiveFrom: string;
  readonly effectiveTo: string;
  /** Date from which this ruleset should be re-checked — when next year's decrees appear. */
  readonly reviewDueFrom: string;

  // ── Social insurance ─────────────────────────────────────────────────────
  readonly employeeSocialRate: Ruled<number>;
  readonly employerSocialRates: readonly EmployerSocialRate[];
  readonly maxAnnualSocialBase: Ruled<number>;
  /**
   * Monthly income at or above which employment founds participation in
   * sickness insurance — the rozhodný příjem. Below it, no social premium is
   * due from either side, and (absent a signed declaration) the income is taxed
   * by withholding rather than by advance.
   */
  readonly participationThresholdMonthly: Ruled<number>;
  readonly employerDiscount: EmployerDiscountRules;
  readonly workingPensioner: WorkingPensionerRules;

  // ── Health insurance ─────────────────────────────────────────────────────
  readonly employeeHealthRate: Ruled<number>;
  readonly employerHealthRate: Ruled<number>;
  readonly healthTotalRate: Ruled<number>;
  readonly healthMinimum: HealthMinimumRules;

  // ── Income tax ───────────────────────────────────────────────────────────
  readonly taxLowerRate: Ruled<number>;
  readonly taxUpperRate: Ruled<number>;
  readonly taxUpperMonthlyThreshold: Ruled<number>;
  readonly withholdingTaxRate: Ruled<number>;
  readonly basicTaxpayerCreditMonthly: Ruled<number>;
  readonly disabilityFirstSecondCreditMonthly: Ruled<number>;
  readonly disabilityThirdCreditMonthly: Ruled<number>;
  readonly ztppCreditMonthly: Ruled<number>;
  readonly childBenefit: ChildBenefitRules;

  // ── Employer liability insurance ─────────────────────────────────────────
  readonly liabilityInsurance: LiabilityInsuranceRules;

  // ── Reference figures ────────────────────────────────────────────────────
  readonly averageWageMonthly: Ruled<number>;
  readonly minimumWageMonthly: Ruled<number>;
  readonly minimumWageHourly: Ruled<number>;

  readonly rounding: RoundingRules;
}
