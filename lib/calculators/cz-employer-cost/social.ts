/**
 * Czech social insurance — zákon č. 589/1992 Sb., tax year 2026.
 *
 * ORDER OF OPERATIONS (§ 5, § 5a, § 5d, § 7, § 7b, § 7e, § 15a)
 * ─────────────────────────────────────────────────────────────
 *   1. test participation — below the rozhodný příjem there is no premium at all
 *   2. round the assessment base UP to whole koruny            § 5d
 *   3. apply the annual maximum, year-to-date                  § 15a
 *   4. employee premium  = 7,1 % of the chargeable base, UP    § 7 odst. 1 d), odst. 3
 *   5. less the working-pensioner sleva, rounded separately    § 7e
 *   6. employer premium  = class rate of the chargeable base   § 5a, § 7 odst. 1 a)–c)
 *   7. less the §7a employer discount, rounded once            § 7b
 *
 * ROUNDING — AND A CITATION THE OLDER MATERIAL GETS WRONG
 * ──────────────────────────────────────────────────────
 * § 20 of this act is PENÁLE, not rounding. The rounding provisions are:
 *   § 5d          assessment bases, UP to whole koruny
 *   § 7 odst. 3   the premium, UP to whole koruny
 *   § 7b odst. 1  the employer discount, UP to whole koruny
 *   § 7e odst. 1  the working-pensioner sleva, UP to whole koruny, SEPARATELY
 * There is no rounding to hundreds anywhere in this statute and no round-to-
 * nearest anywhere. Every rule is a directed round to a whole koruna.
 *
 * ČSSZ additionally requires full precision before the single round-up:
 * "Mzdový software musí při výpočtu počítat se všemi desetinnými místy, která
 * jsou následně zaokrouhlena na celé koruny nahoru." That is why this module
 * uses `percentOfRoundedToCzk` rather than a percentage followed by a rounding —
 * at 7,1 % the two differ by a koruna on 782 realistic assessment bases.
 *
 * THE ANNUAL MAXIMUM IS ANNUAL, CUMULATIVE, AND STOPS BOTH SIDES
 * ─────────────────────────────────────────────────────────────
 * § 15a. The 2 350 416 Kč ceiling for 2026 is a running year-to-date sum of the
 * employee's assessment bases, not a monthly cap. Two things follow that
 * calculators routinely get wrong:
 *
 *   • Above the ceiling the EMPLOYER stops paying too. § 15a odst. 4 removes the
 *     excess from the employer's base as well, and ČSSZ states the consequence
 *     plainly: "z částky přesahující maximální vyměřovací základ pak
 *     zaměstnavatel neodvádí ani pojistné za zaměstnance ani pojistné za
 *     zaměstnavatele." The marginal social cost above the cap is 0 % + 0 %, not
 *     0 % + 24,8 %.
 *
 *   • The stop applies ONLY where the year's employment is with this one
 *     employer (§ 15a odst. 2 písm. a)). With several employers in the year, no
 *     employer stops; the employee reclaims the excess afterwards, and the
 *     employer share is never refunded. A single employer's payroll cannot see
 *     other employers' bases, so this engine models only the single-employer
 *     case and says so.
 *
 * A monthly salary does not reveal the year-to-date figure. So the caller states
 * which assumption is in force rather than the engine picking one — §8.
 */

import {
  add,
  clampNonNegative,
  czk,
  maxHalere,
  minHalere,
  percentOfRoundedToCzk,
  roundToCzk,
  subtract,
  toCzkNumber,
  ZERO,
  type Halere,
} from '../../payroll/money';
import type { CzRuleset } from './jurisdictions/cz/ruleset';
import type {
  EmployerOptionsInput,
  EngineNote,
  LineItem,
  SocialMaximumInput,
  SocialResult,
} from './types';

/** § 5d — assessment bases round UP to whole koruny. */
export function roundSocialAssessmentBase(base: Halere): Halere {
  return roundToCzk(base, 'up');
}

/**
 * Whether the §7a employer discount's measurable conditions are met.
 *
 * Returns the reason it fails, or null when every condition this engine can test
 * passes. The conditions it cannot test are the user's attestation and are
 * listed to them separately — a pass here is not a finding of entitlement.
 */
export function checkDiscountConditions(
  chargeableBase: Halere,
  options: EmployerOptionsInput,
  rules: CzRuleset,
  daysInMonth: number,
): string | null {
  const d = rules.employerDiscount;
  const f = options.discountFacts;
  const category = options.employerDiscountCategory;

  // § 7a odst. 2 — the working-time band. Ground g) (under 21) is exempt.
  const exempt = d.categoriesExemptFromHoursCondition.includes(category ?? '');
  if (!exempt) {
    if (!(f.agreedWeeklyHours >= d.weeklyHoursMin.value && f.agreedWeeklyHours <= d.weeklyHoursMax.value)) {
      return 'discount.fail.weeklyHoursBand';
    }
    // Must be strictly shorter than the employer's own full-time norm.
    if (!(f.agreedWeeklyHours < f.fullTimeWeeklyHours)) {
      return 'discount.fail.notShorterThanFullTime';
    }
  }

  // § 7a odst. 3 písm. a) — monthly assessment-base ceiling. "vyšší než"
  // disqualifies, so exactly the ceiling still qualifies. Never pro-rated.
  const ceiling = czk(
    Math.ceil(rules.averageWageMonthly.value * d.monthlyBaseCeilingMultiple.value),
  );
  if (chargeableBase > ceiling) return 'discount.fail.monthlyBaseCeiling';

  // § 7a odst. 3 písm. c) — the 138-hour cap, pro-rated by calendar days and
  // rounded UP to whole hours. Under-21s are expressly exempt.
  if (category !== 'under_21') {
    const capBase = 138;
    const cap =
      f.employmentDaysInMonth >= daysInMonth || daysInMonth <= 0
        ? capBase
        : Math.ceil((capBase * f.employmentDaysInMonth) / daysInMonth);
    if (f.hoursWorkedThisMonth > cap) return 'discount.fail.hoursCap';
  }

  // § 7a odst. 3 písm. b) — the per-hour ceiling. Both the quotient and the
  // threshold round UP to whole koruny before comparison. ČSSZ treats zero
  // hours as satisfying the test.
  if (f.hoursWorkedThisMonth > 0) {
    const perHourCeiling = Math.ceil(
      (rules.averageWageMonthly.value * d.hourlyBaseCeilingPercent.value) / 100,
    );
    const perHour = Math.ceil(toCzkNumber(chargeableBase) / f.hoursWorkedThisMonth);
    if (perHour > perHourCeiling) return 'discount.fail.perHourCeiling';
  }

  return null;
}

export interface SocialInput {
  readonly grossTaxable: Halere;
  readonly socialMaximum: SocialMaximumInput;
  readonly employerOptions: EmployerOptionsInput;
  readonly daysInMonth: number;
}

export function calculateSocial(input: SocialInput, rules: CzRuleset): SocialResult {
  const { grossTaxable, socialMaximum, employerOptions, daysInMonth } = input;
  const notes: EngineNote[] = [];
  const lines: LineItem[] = [];

  const uncappedBase = roundSocialAssessmentBase(grossTaxable);

  // ── 1. Participation ─────────────────────────────────────────────────────
  //
  // PARTICIPATION IS KEYED ON THE AGREED INCOME, NOT ON THIS MONTH'S PAY.
  //
  // § 6 odst. 1 písm. b) zákona č. 187/2006 Sb. founds participation on the
  // SJEDNANÁ částka započitatelného příjmu. Only in a zaměstnání malého rozsahu
  // (§ 7) — where the agreed amount itself is below the rozhodný příjem — does
  // the month's actual income decide.
  //
  // An earlier version tested the month's gross and zeroed both premiums below
  // 4 500 Kč. That is wrong for the calculator's only declared scope. An
  // employee on an agreed 22 400 Kč who is paid 4 000 Kč this month — a
  // mid-month start, or the unpaid-leave month validation.ts explicitly treats
  // as a legitimate input — is still účastný pojištění, and 284 Kč employee /
  // 992 Kč employer are genuinely due. Zeroing them understated the employer's
  // cost and deleted the whole social block from the money-flow breakdown.
  //
  // A single monthly figure cannot distinguish "agreed 22 400, paid 4 000" from
  // "agreed 4 000". So the engine no longer guesses: it charges the premium,
  // which is correct for the common case and never understates the employer's
  // cost, and says that the small-scale-employment case is outside what it
  // models. That is the honest direction of the two.
  const threshold = czk(rules.participationThresholdMonthly.value);
  if (grossTaxable > ZERO && grossTaxable < threshold) {
    notes.push({
      key: 'social.smallScaleEmploymentNotModelled',
      severity: 'assumption',
      text: 'social.note.participationAssumedFromAgreedIncome',
    });
  }

  // ── 2–3. The annual maximum ──────────────────────────────────────────────
  const annualMax = czk(rules.maxAnnualSocialBase.value);
  let chargeableBase = uncappedBase;
  let maximumReached = false;

  if (socialMaximum.mode === 'explicit_ytd') {
    const used = czk(socialMaximum.ytdAssessmentBaseCzk);
    const remaining = clampNonNegative(subtract(annualMax, used));
    chargeableBase = minHalere(uncappedBase, remaining);
    maximumReached = chargeableBase < uncappedBase;
    if (maximumReached) {
      notes.push({
        key: 'social.maximumReached',
        severity: 'info',
        text: 'social.note.maximumReachedBothSidesStop',
      });
    }
    notes.push({
      key: 'social.singleEmployerOnly',
      severity: 'assumption',
      text: 'social.note.maximumSingleEmployerOnly',
    });
  } else {
    notes.push({
      key: 'social.assumeMaximumNotReached',
      severity: 'assumption',
      text: 'social.note.assumesMaximumNotReached',
    });
  }

  lines.push({
    key: 'socialAssessmentBase',
    amount: chargeableBase,
    formula: 'social.formula.assessmentBase',
    roundingNote: 'social.rounding.upToCzk',
    sourceId: rules.employeeSocialRate.sourceId,
    legalBasis: '§ 5, § 5d, § 15a zákona č. 589/1992 Sb.',
    origin: 'statutory',
  });

  // ── 4–5. Employee ────────────────────────────────────────────────────────
  const employeePremium = percentOfRoundedToCzk(
    chargeableBase,
    rules.employeeSocialRate.value,
    'up',
  );

  let pensionerRelief: Halere = ZERO;
  if (employerOptions.employeeCategory === 'working_old_age_pensioner') {
    const wp = rules.workingPensioner;
    if (wp.status === 'unresolved' || wp.employeeSocialRate.value === null) {
      notes.push({
        key: 'social.pensionerUnsupported',
        severity: 'warning',
        text: 'social.note.workingPensionerUnsupported',
      });
    } else {
      // § 7e odst. 1 — a SLEVA of 6,5 % of the assessment base, rounded up to
      // whole koruny SEPARATELY and then subtracted. Deliberately not modelled
      // as a reduced rate of 0,6 %: no provision states such a rate, and the
      // separate rounding of the two amounts makes the results differ.
      pensionerRelief = percentOfRoundedToCzk(chargeableBase, wp.employeeSocialRate.value, 'up');
      notes.push({
        key: 'social.pensionerRelief',
        severity: 'assumption',
        text: 'social.note.workingPensionerClaimAsserted',
      });
      lines.push({
        key: 'socialPensionerRelief',
        amount: pensionerRelief,
        formula: 'social.formula.pensionerRelief',
        rateNote: `${wp.employeeSocialRate.value} %`,
        roundingNote: 'social.rounding.upToCzkSeparately',
        sourceId: wp.sourceId,
        legalBasis: '§ 7e odst. 1 zákona č. 589/1992 Sb.',
        origin: 'statutory',
      });
    }
  }

  const employee = clampNonNegative(subtract(employeePremium, pensionerRelief));

  lines.push({
    key: 'socialEmployee',
    amount: employee,
    formula: 'social.formula.employee',
    rateNote: `${rules.employeeSocialRate.value} %`,
    roundingNote: 'social.rounding.upToCzk',
    sourceId: rules.employeeSocialRate.sourceId,
    legalBasis: '§ 7 odst. 1 písm. d) a odst. 3 zákona č. 589/1992 Sb.',
    origin: 'statutory',
  });

  // ── 6. Employer ──────────────────────────────────────────────────────────
  const rateEntry =
    rules.employerSocialRates.find((r) => r.class === employerOptions.employerRateClass) ??
    rules.employerSocialRates[0];

  const employer = percentOfRoundedToCzk(chargeableBase, rateEntry.rate.value, 'up');

  // The statute rounds the employer premium once on the AGGREGATE of all
  // employees in a rate class, not per employee. For a single employee the two
  // coincide; across a workforce the per-employee sum can exceed the aggregate
  // figure by up to one koruna per employee. Said out loud rather than hidden.
  notes.push({
    key: 'social.employerAggregateRounding',
    severity: 'info',
    text: 'social.note.employerPremiumRoundedOnAggregate',
  });

  lines.push({
    key: 'socialEmployer',
    amount: employer,
    formula: 'social.formula.employer',
    rateNote: `${rateEntry.rate.value} %`,
    roundingNote: 'social.rounding.upToCzk',
    sourceId: rateEntry.rate.sourceId,
    legalBasis: '§ 5a, § 7 odst. 1 zákona č. 589/1992 Sb.',
    origin: 'statutory',
  });

  // ── 7. The §7a employer discount ─────────────────────────────────────────
  let employerDiscount: Halere = ZERO;
  if (employerOptions.claimEmployerSocialDiscount) {
    const d = rules.employerDiscount;
    if (d.status === 'unresolved') {
      notes.push({
        key: 'social.discountUnsupported',
        severity: 'warning',
        text: 'social.note.employerDiscountUnsupported',
      });
    } else {
      const failure = checkDiscountConditions(chargeableBase, employerOptions, rules, daysInMonth);
      if (failure) {
        notes.push({ key: 'social.discountNotApplied', severity: 'warning', text: failure });
      } else {
        employerDiscount = percentOfRoundedToCzk(chargeableBase, d.ratePercent.value, 'up');
        notes.push({
          key: 'social.discountAttested',
          severity: 'assumption',
          text: 'social.note.employerDiscountConditionsAttested',
        });
        lines.push({
          key: 'socialEmployerDiscount',
          amount: employerDiscount,
          formula: 'social.formula.employerDiscount',
          rateNote: `${d.ratePercent.value} %`,
          roundingNote: 'social.rounding.upToCzk',
          sourceId: d.sourceId,
          legalBasis: '§ 7a, § 7b zákona č. 589/1992 Sb.',
          origin: 'statutory',
        });
      }
    }
  }

  const employerNet = clampNonNegative(subtract(employer, employerDiscount));

  return {
    assessmentBase: chargeableBase,
    uncappedBase,
    employee,
    employer,
    employerDiscount,
    employerNet,
    maximumReached,
    mode: socialMaximum.mode,
    lines,
    notes,
  };
}

/** Total of the employee and employer sides, for the money-flow breakdown. */
export function socialTotal(result: SocialResult): Halere {
  return add(result.employee, result.employerNet);
}
