/**
 * Input validation for the Czech employer-cost calculator.
 *
 * ISSUES ARE KEYS, NOT SENTENCES
 * ──────────────────────────────
 * Every issue carries a `key`, and the three locale UIs look the message up.
 * The engine holds no Czech, English or German prose at all.
 *
 * That is not tidiness. §37 requires one mathematical engine behind cs / en / de,
 * and the fastest way to lose that is for the engine to emit a Czech sentence
 * which the English page then has to special-case. A key cannot be translated
 * wrongly into a different rule.
 *
 * ERROR VERSUS WARNING
 * ────────────────────
 * An `error` means the engine cannot compute a trustworthy result and must not
 * try. A `warning` means the input is unusual but lawful and the result stands.
 *
 * The distinction matters most for a gross below the minimum wage. That is NOT
 * an error: part-time work, a partial month and an unpaid-leave month all
 * legitimately produce one, and refusing to calculate would be wrong. It is a
 * warning, because at full working time it is very likely a typo — and because
 * it is the input that triggers the health minimum-base machinery, which the
 * user should know is now in play.
 */

import type {
  EmployerCostInput,
  ValidationIssue,
  ValidationOutcome,
} from './types';
import type { CzRuleset } from './jurisdictions/cz/ruleset';

/** Largest gross the engine will accept, CZK/month. */
const MAX_MONTHLY_GROSS = 100_000_000;
/** Largest year-to-date assessment base, CZK. */
const MAX_YTD_BASE = 1_000_000_000;
/** More children than this is a data-entry error, not a family. */
const MAX_CHILDREN = 15;

function isMoney(n: number): boolean {
  return Number.isFinite(n) && n >= 0;
}

/**
 * Validate an input against a ruleset.
 *
 * The ruleset is a parameter rather than an import so that validation stays
 * pure with respect to the tax year: the same function validates a 2027 input
 * against a 2027 ruleset without a line changing here.
 */
export function validateInput(input: EmployerCostInput, rules: CzRuleset): ValidationOutcome {
  const issues: ValidationIssue[] = [];
  const err = (field: string, key: string) =>
    issues.push({ field, key, severity: 'error' as const });
  const warn = (field: string, key: string) =>
    issues.push({ field, key, severity: 'warning' as const });

  // ── Period ───────────────────────────────────────────────────────────────
  const { year, month } = input.period;
  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    err('period.year', 'period.year.outOfRange');
  }
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    err('period.month', 'period.month.outOfRange');
  }
  if (Number.isInteger(year) && year !== rules.taxYear) {
    // Not an error: the ruleset is still returned and still labelled. But the
    // page must not imply it computed a year it has no rules for.
    warn('period.year', 'period.year.rulesetMismatch');
  }

  // ── Salary ───────────────────────────────────────────────────────────────
  const { grossMonthlyCzk, bonusesCzk, otherTaxableCzk, workingTimePercent } = input.salary;

  if (!isMoney(grossMonthlyCzk)) err('salary.grossMonthlyCzk', 'salary.gross.invalid');
  else if (grossMonthlyCzk > MAX_MONTHLY_GROSS) err('salary.grossMonthlyCzk', 'salary.gross.tooLarge');

  if (!isMoney(bonusesCzk)) err('salary.bonusesCzk', 'salary.bonuses.invalid');
  if (!isMoney(otherTaxableCzk)) err('salary.otherTaxableCzk', 'salary.otherTaxable.invalid');

  if (!Number.isFinite(workingTimePercent) || workingTimePercent <= 0 || workingTimePercent > 100) {
    err('salary.workingTimePercent', 'salary.workingTime.outOfRange');
  }

  const totalGross = (grossMonthlyCzk || 0) + (bonusesCzk || 0) + (otherTaxableCzk || 0);

  // Below the minimum wage at full working time — lawful in several situations,
  // suspicious at 100 %, and the trigger for the health minimum-base rules.
  if (
    isMoney(grossMonthlyCzk) &&
    totalGross > 0 &&
    totalGross < rules.minimumWageMonthly.value &&
    workingTimePercent >= 100
  ) {
    warn('salary.grossMonthlyCzk', 'salary.gross.belowMinimumWageAtFullTime');
  }

  // ── Tax profile ──────────────────────────────────────────────────────────
  const p = input.taxProfile;

  // §31: a credit the user did not ask for must never appear. Claiming the basic
  // credit without a signed declaration is not a lawful monthly claim, so it is
  // an error rather than something quietly ignored — silently dropping it would
  // change the net wage with no explanation.
  if (p.applyBasicCredit && !p.signedDeclaration) {
    err('taxProfile.applyBasicCredit', 'taxProfile.basicCredit.requiresDeclaration');
  }

  if (p.children.length > MAX_CHILDREN) {
    err('taxProfile.children', 'taxProfile.children.tooMany');
  }

  // Non-resident restrictions are applied by the tax engine, not rejected here —
  // the input is lawful, the monthly claim is simply narrower. A warning tells
  // the user why their result differs from what they expected.
  if (p.residency === 'non_resident' && (p.disability !== 'none' || p.ztpp)) {
    warn('taxProfile.residency', 'taxProfile.nonResident.personalCreditsRestricted');
  }
  if (p.residency === 'non_resident' && p.children.length > 0) {
    warn('taxProfile.residency', 'taxProfile.nonResident.childBenefitRestricted');
  }
  if (!p.signedDeclaration && (p.children.length > 0 || p.disability !== 'none' || p.ztpp)) {
    warn('taxProfile.signedDeclaration', 'taxProfile.noDeclaration.reliefsNotApplied');
  }

  // ── Annual social maximum ────────────────────────────────────────────────
  const s = input.socialMaximum;
  if (s.mode === 'explicit_ytd') {
    if (!isMoney(s.ytdAssessmentBaseCzk)) {
      err('socialMaximum.ytdAssessmentBaseCzk', 'socialMaximum.ytd.invalid');
    } else if (s.ytdAssessmentBaseCzk > MAX_YTD_BASE) {
      err('socialMaximum.ytdAssessmentBaseCzk', 'socialMaximum.ytd.tooLarge');
    }
  }

  // ── Health minimum assessment base ───────────────────────────────────────
  const h = input.healthMinimum;
  if (!Number.isInteger(h.daysInMonth) || h.daysInMonth < 28 || h.daysInMonth > 31) {
    err('healthMinimum.daysInMonth', 'healthMinimum.daysInMonth.outOfRange');
  }
  if (h.situation === 'partial_month') {
    if (!Number.isInteger(h.applicableDays) || h.applicableDays < 0) {
      err('healthMinimum.applicableDays', 'healthMinimum.applicableDays.invalid');
    } else if (h.applicableDays > h.daysInMonth) {
      err('healthMinimum.applicableDays', 'healthMinimum.applicableDays.exceedsMonth');
    }
  }

  // ── Employer options ─────────────────────────────────────────────────────
  const e = input.employerOptions;
  if (e.claimEmployerSocialDiscount && e.employerDiscountCategory === null) {
    err('employerOptions.employerDiscountCategory', 'employerDiscount.categoryRequired');
  }
  if (!e.claimEmployerSocialDiscount && e.employerDiscountCategory !== null) {
    // Harmless, but it means the UI is holding a category nobody is claiming.
    warn('employerOptions.employerDiscountCategory', 'employerDiscount.categoryWithoutClaim');
  }

  // ── Liability insurance ──────────────────────────────────────────────────
  const l = input.liabilityInsurance;
  if (l.enabled) {
    if (l.activityKey === null) {
      if (l.customRatePerMille === null || !Number.isFinite(l.customRatePerMille)) {
        err('liabilityInsurance.customRatePerMille', 'liability.rateRequired');
      } else if (l.customRatePerMille < 0) {
        err('liabilityInsurance.customRatePerMille', 'liability.rateNegative');
      } else if (l.customRatePerMille > 100) {
        // 100 ‰ is ten percent of payroll — far outside any statutory rate and
        // almost certainly a percent typed into a per-mille field.
        err('liabilityInsurance.customRatePerMille', 'liability.rateImplausible');
      }
    } else if (!rules.liabilityInsurance.activities.some((a) => a.key === l.activityKey)) {
      err('liabilityInsurance.activityKey', 'liability.unknownActivity');
    }
  }

  // ── Additional costs ─────────────────────────────────────────────────────
  for (const [key, value] of Object.entries(input.additionalCosts)) {
    if (!isMoney(value)) {
      err(`additionalCosts.${key}`, 'additionalCosts.invalid');
    }
  }

  return { ok: !issues.some((i) => i.severity === 'error'), issues };
}
