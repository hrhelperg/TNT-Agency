/**
 * Statutory employer liability insurance for work injuries and occupational
 * disease — "zákonné pojištění odpovědnosti zaměstnavatele za škodu při
 * pracovním úrazu nebo nemoci z povolání", vyhláška č. 125/1993 Sb.
 *
 * IT IS STILL IN FORCE IN 2026
 * ────────────────────────────
 * § 365 odst. 1 zákoníku práce, in its 1.1.2026–31.12.2026 wording, still routes
 * the whole regime to vyhláška č. 125/1993 Sb. The intended replacement — zákon
 * č. 266/2006 Sb. o úrazovém pojištění zaměstnanců — was repealed by zákon
 * č. 205/2015 Sb. before it ever took effect, so its repealing clause never
 * operated. The rate annex has stood in its 487/2001 Sb. wording since 1.1.2002,
 * and the power to issue an implementing decree is gone: the table can now change
 * only by amending the Labour Code. It is a frozen constant, not an annual
 * parameter.
 *
 * COVER ARISES BY LAW. No policy is concluded, and there is no choice of
 * insurer: Generali Česká pojišťovna covers employers who held a contract with
 * Česká pojišťovna on 31.12.1992 and their legal successors; Kooperativa covers
 * everyone else by residual clause.
 *
 * ONE RATE FOR THE WHOLE EMPLOYER
 * ───────────────────────────────
 * § 12 odst. 2 sets a single rate from the employer's "převažující základní
 * činnost tvořící předmět podnikání", applied to one pooled base. There is no
 * per-employee rate and no per-activity split. Everything this module reports
 * per employee is therefore an ALLOCATION of an employer-level amount, and the
 * result says so in the field names — §14 is explicit that presenting an
 * allocated monthly figure as the employer's actual quarterly invoice is a
 * misrepresentation.
 *
 * THE BASE IS QUARTERLY, AGGREGATE, AND LAGS BY A QUARTER
 * ──────────────────────────────────────────────────────
 * § 12 odst. 2: the "souhrn vyměřovacích základů za uplynulé kalendářní čtvrtletí
 * všech zaměstnanců", determined the same way as the social-insurance base. And
 * § 12 odst. 3 sets the due dates at the end of the first month of the quarter
 * being insured — so the premium due 31 January 2026 covers Q1 2026 and is
 * computed from Q4 2025 payroll. "This quarter's payroll × rate" is a different
 * number from the amount actually due.
 *
 * This calculator models one employee in one month. It therefore reports what
 * that employee contributes to such a base, on a steady-state assumption, and
 * names it an allocation rather than an invoice.
 *
 * THE ANNUAL SOCIAL MAXIMUM DOES NOT APPLY — WITH A CAVEAT WORTH STATING
 * ─────────────────────────────────────────────────────────────────────
 * Both administrators publish that § 15a of zákon č. 589/1992 Sb. "se
 * nevztahuje" to this premium, and a calculator must follow that: the base is
 * never capped. But no statutory text says it. The decree borrows the social
 * "postup pro určení vyměřovacího základu", and § 15a odst. 4 is itself part of
 * that procedure — so a literal reading would arguably cap it. The rule rests
 * entirely on the two administrators' methodology, which is weaker footing than
 * anything else in this module, and the result carries a note saying so.
 *
 * NO ROUNDING RULE EXISTS
 * ───────────────────────
 * The decree contains no form of the stem "zaokrouhl" at any step, and neither
 * administrator publishes one. So nothing here is rounded to satisfy a statute;
 * the figure is computed exactly and any rounding is presentation.
 *
 * THE 100 KČ FLOOR IS PER EMPLOYER, NOT PER EMPLOYEE
 * ──────────────────────────────────────────────────
 * The annex closes with "Minimální pojistné za kalendářní čtvrtletí je 100 Kč."
 * That is one floor for the whole employer for the whole quarter. Applying it to
 * a single employee's allocated share would inflate a small employer's modelled
 * cost by up to 400 Kč a year per head. It is reported as context, never added.
 */

import {
  fractionOf,
  multiplyByInteger,
  toCzkNumber,
  ZERO,
  type Halere,
} from '../../payroll/money';
import type { CzRuleset, LiabilityActivityRate } from './jurisdictions/cz/ruleset';
import type {
  EngineNote,
  LiabilityInsuranceInput,
  LiabilityInsuranceResult,
  LineItem,
} from './types';

/** Months in the quarter the statutory base is measured over. */
const MONTHS_PER_QUARTER = 3;

/** Rate per mille applied to a base, exact — the decree prescribes no rounding. */
function premiumFor(base: Halere, ratePerMille: number): Halere {
  // Per mille with up to two decimals (50,4 / 9,8 / 2,8 …) → scale by 100 and
  // divide by 100 000, all in exact integer arithmetic.
  const scaled = Math.round(ratePerMille * 100);
  return fractionOf(base, scaled, 100_000, 'nearest');
}

/** Resolve the rate the user selected, or the one they typed. */
function resolveRate(
  input: LiabilityInsuranceInput,
  rules: CzRuleset,
): { rate: number | null; activity: LiabilityActivityRate | null } {
  if (input.activityKey !== null) {
    const activity =
      rules.liabilityInsurance.activities.find((a) => a.key === input.activityKey) ?? null;
    return { rate: activity ? activity.ratePerMille : null, activity };
  }
  return { rate: input.customRatePerMille, activity: null };
}

export interface LiabilityInput {
  readonly settings: LiabilityInsuranceInput;
  /**
   * The employee's social assessment base for the month, BEFORE the annual
   * maximum is applied. Passing the capped base would silently cap a premium
   * that both administrators say is uncapped.
   */
  readonly uncappedMonthlySocialBase: Halere;
}

export function calculateLiabilityInsurance(
  input: LiabilityInput,
  rules: CzRuleset,
): LiabilityInsuranceResult {
  const notes: EngineNote[] = [];
  const lines: LineItem[] = [];
  const { settings, uncappedMonthlySocialBase } = input;

  if (!settings.enabled) {
    notes.push({
      key: 'liability.excluded',
      severity: 'info',
      text: 'liability.note.excludedFromTotal',
    });
    return {
      included: false,
      ratePerMille: null,
      activityLabel: null,
      quarterlyBasisForThisEmployee: ZERO,
      quarterlyAllocated: ZERO,
      monthlyAllocated: ZERO,
      lines,
      notes,
    };
  }

  const { rate, activity } = resolveRate(settings, rules);
  if (rate === null) {
    notes.push({
      key: 'liability.rateUnknown',
      severity: 'warning',
      text: 'liability.note.rateNotResolved',
    });
    return {
      included: false,
      ratePerMille: null,
      activityLabel: null,
      quarterlyBasisForThisEmployee: ZERO,
      quarterlyAllocated: ZERO,
      monthlyAllocated: ZERO,
      lines,
      notes,
    };
  }

  // Steady-state quarterly contribution of this one employee. Explicitly the
  // UNCAPPED base — § 15a is not applied here.
  const quarterlyBasis = multiplyByInteger(uncappedMonthlySocialBase, MONTHS_PER_QUARTER);
  const quarterlyAllocated = premiumFor(quarterlyBasis, rate);
  const monthlyAllocated = premiumFor(uncappedMonthlySocialBase, rate);

  notes.push({
    key: 'liability.isAllocation',
    severity: 'info',
    text: 'liability.note.allocationNotInvoice',
  });
  notes.push({
    key: 'liability.maximumDisapplication',
    severity: 'assumption',
    text: 'liability.note.annualMaximumDisapplicationRestsOnAdministrators',
  });
  notes.push({
    key: 'liability.quarterLag',
    severity: 'info',
    text: 'liability.note.premiumComputedFromPrecedingQuarter',
  });

  const floor = rules.liabilityInsurance.minimumQuarterlyPremium.value;
  if (floor !== null && toCzkNumber(quarterlyAllocated) < floor) {
    // Context, never added: the floor is the employer's, for its whole payroll.
    notes.push({
      key: 'liability.belowEmployerFloor',
      severity: 'info',
      text: 'liability.note.employerLevelQuarterlyFloor',
    });
  }

  lines.push({
    key: 'liabilityQuarterlyBasis',
    amount: quarterlyBasis,
    formula: 'liability.formula.quarterlyBasis',
    baseNote: 'liability.base.uncappedSocialBaseTimesThree',
    sourceId: rules.liabilityInsurance.sourceId,
    legalBasis: '§ 12 odst. 2 vyhlášky č. 125/1993 Sb.',
    origin: 'allocated',
  });
  lines.push({
    key: 'liabilityMonthlyAllocated',
    amount: monthlyAllocated,
    formula: 'liability.formula.monthlyAllocated',
    rateNote: `${rate} ‰`,
    roundingNote: 'liability.rounding.noStatutoryRule',
    sourceId: rules.liabilityInsurance.sourceId,
    legalBasis: '§ 12 odst. 2 a příloha č. 2 vyhlášky č. 125/1993 Sb.',
    origin: 'allocated',
  });

  return {
    included: true,
    ratePerMille: rate,
    activityLabel: activity ? activity.labelCs : null,
    quarterlyBasisForThisEmployee: quarterlyBasis,
    quarterlyAllocated,
    monthlyAllocated,
    lines,
    notes,
  };
}
