import { describe, it, expect } from 'vitest';
import { calculate, createDefaultInput, CZ_2026, daysInMonth } from './engine';
import { moneyFlowTotal } from './metrics';
import { validateInput } from './validation';
import { toCzkNumber } from '../../payroll/money';
import type { EmployerCostInput } from './types';

/** Deep-clone the default so each test can mutate freely. */
type Mutable<T> = { -readonly [K in keyof T]: Mutable<T[K]> };
function input(): Mutable<EmployerCostInput> {
  return JSON.parse(JSON.stringify(createDefaultInput(2026, 3))) as Mutable<EmployerCostInput>;
}

/** Everything a test wants, in koruny. */
function run(i: EmployerCostInput) {
  const r = calculate(i, CZ_2026);
  const k = (h: number) => toCzkNumber(h as never);
  return {
    gross: k(r.gross.grossTaxable),
    socialEmployee: k(r.social.employee),
    socialEmployer: k(r.social.employer),
    socialEmployerNet: k(r.social.employerNet),
    socialDiscount: k(r.social.employerDiscount),
    socialBase: k(r.social.assessmentBase),
    healthTotalOnActual: k(r.health.employeeOnActual) + k(r.health.employerOnActual),
    healthEmployee: k(r.health.employee),
    healthEmployer: k(r.health.employer),
    healthEmployeeOnActual: k(r.health.employeeOnActual),
    healthEmployerOnActual: k(r.health.employerOnActual),
    topUpEmployee: k(r.health.topUpPaidByEmployee),
    topUpEmployer: k(r.health.topUpPaidByEmployer),
    shortfall: k(r.health.shortfall),
    taxBase: k(r.tax.roundedBase),
    taxBefore: k(r.tax.advanceBeforeCredits),
    taxCredits: k(r.tax.creditsApplied),
    taxFinal: k(r.tax.advanceFinal),
    taxBonus: k(r.tax.taxBonus),
    net: k(r.employeeNet.net),
    employerStatutory: k(r.employerStatutory.total),
    totalReal: k(r.totalRealEmployerCost),
    liability: k(r.liability.monthlyAllocated),
    raw: r,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Canonical fixture — every figure worked by hand from the statute
// ─────────────────────────────────────────────────────────────────────────────
describe('1. canonical: 40 000 Kč, resident, declaration signed, no children', () => {
  // social  employee ceil(7,1 % × 40 000) = ceil(2 840,00)  = 2 840
  //         employer ceil(24,8 % × 40 000) = ceil(9 920,00) = 9 920
  // health  P = ceil(13,5 % × 40 000) = 5 400; E = ceil(5 400/3) = 1 800; R = 3 600
  // tax     base 40 000 (already whole hundreds); 15 % = 6 000; sleva 2 570 → 3 430
  // net     40 000 − 2 840 − 1 800 − 3 430 = 31 930
  // cost    40 000 + 9 920 + 3 600 = 53 520
  const i = input();
  i.salary.grossMonthlyCzk = 40_000;
  const r = run(i);

  it('employee social is 7,1 % rounded up', () => expect(r.socialEmployee).toBe(2_840));
  it('employer social is 24,8 % rounded up', () => expect(r.socialEmployer).toBe(9_920));
  it('health is one 13,5 % premium split into thirds', () => {
    expect(r.healthTotalOnActual).toBe(5_400);
    expect(r.healthEmployeeOnActual).toBe(1_800);
    expect(r.healthEmployerOnActual).toBe(3_600);
  });
  it('tax advance is 15 % less the basic credit', () => {
    expect(r.taxBefore).toBe(6_000);
    expect(r.taxCredits).toBe(2_570);
    expect(r.taxFinal).toBe(3_430);
  });
  it('net salary', () => expect(r.net).toBe(31_930));
  it('employer statutory cost', () => expect(r.employerStatutory).toBe(53_520));
  it('on-costs are 33,8 % of gross', () =>
    expect(r.raw.metrics.statutoryAboveGrossPercent).toBeCloseTo(33.8, 2));
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. The health minimum assessment base — §13, the part calculators get wrong
// ─────────────────────────────────────────────────────────────────────────────
describe('2. health minimum base: gross 10 000 Kč', () => {
  // P_actual = ceil(13,5 % × 10 000) = 1 350; E = 450; R = 900
  // shortfall = 22 400 − 10 000 = 12 400
  // top-up   = ceil(13,5 % × 12 400) = ceil(1 674,00) = 1 674 — EMPLOYEE ALONE
  const i = input();
  i.salary.grossMonthlyCzk = 10_000;
  const r = run(i);

  it('computes the shortfall against the full minimum', () => {
    expect(r.shortfall).toBe(12_400);
  });

  it('charges the whole top-up to the employee, not one third of it', () => {
    expect(r.topUpEmployee).toBe(1_674);
    expect(r.topUpEmployer).toBe(0);
    expect(r.healthEmployee).toBe(450 + 1_674);
  });

  // The defect §13 names: max(gross, minimum) × 9 % would make the employer pay
  // 2 016 Kč. The employer's health cost is unchanged by the shortfall.
  it('does NOT raise the employer share to 9 % of the minimum base', () => {
    expect(r.healthEmployerOnActual).toBe(900);
    expect(r.healthEmployer).not.toBe(2_016);
  });

  it('employer statutory cost excludes the employee-borne top-up', () => {
    // 10 000 + ceil(24,8 % × 10 000)=2 480 + 900 = 13 380
    expect(r.employerStatutory).toBe(13_380);
  });

  it('net salary carries the top-up as a deduction', () => {
    // tax: base 10 000 → 15 % = 1 500; credit 2 570 caps at 1 500 → 0
    // net = 10 000 − 710 − 2 124 − 0
    expect(r.taxFinal).toBe(0);
    expect(r.net).toBe(7_166);
  });
});

describe('2b. the same shortfall, but caused by an employer-side obstacle', () => {
  const i = input();
  i.salary.grossMonthlyCzk = 10_000;
  i.healthMinimum.situation = 'employer_obstacle';
  const r = run(i);

  it('moves the top-up to the employer', () => {
    expect(r.topUpEmployer).toBe(1_674);
    expect(r.topUpEmployee).toBe(0);
  });

  it('raises the employer cost and leaves the employee better off', () => {
    expect(r.employerStatutory).toBe(10_000 + 2_480 + 900 + 1_674);
    expect(r.net).toBe(10_000 - 710 - 450);
  });
});

describe('2c. a statutory exemption removes the minimum entirely', () => {
  const i = input();
  i.salary.grossMonthlyCzk = 10_000;
  i.healthMinimum.situation = 'statutory_exemption';
  const r = run(i);

  it('computes no shortfall and no top-up', () => {
    expect(r.raw.health.minimumApplies).toBe(false);
    expect(r.shortfall).toBe(0);
    expect(r.topUpEmployee).toBe(0);
  });
});

// § 3 odst. 9 — a SHORT MONTH does reduce the minimum, by calendar days. This
// is the branch a review found unreachable: the UI hardcoded applicableDays to
// the whole month, so choosing "employment did not last the whole month"
// changed nothing while the engine still told the user it had pro-rated.
describe('2ca. a partial month reduces the minimum by calendar days', () => {
  // 10 of 31 days: 22 400 × 10/31 = 7 225,8 → 7 226.
  // gross 5 000 → premium on actual ceil(675) = 675; on the minimum
  // ceil(975,51) = 976; top-up = 976 − 675 = 301.
  const i = input();
  i.salary.grossMonthlyCzk = 5_000;
  i.healthMinimum.situation = 'partial_month';
  i.healthMinimum.daysInMonth = 31;
  i.healthMinimum.applicableDays = 10;
  const r = run(i);

  it('pro-rates the minimum base', () => {
    expect(toCzkNumber(r.raw.health.minimumBase as never)).toBe(7_226);
  });

  it('charges the reduced top-up, not the full-month one', () => {
    expect(r.topUpEmployee).toBe(301);
  });

  it('is materially different from the same salary over a whole month', () => {
    const whole = input();
    whole.salary.grossMonthlyCzk = 5_000;
    const w = run(whole);
    // The whole-month case charges 2 349 Kč — 2 048 Kč more.
    expect(w.topUpEmployee).toBe(2_349);
    expect(w.topUpEmployee - r.topUpEmployee).toBe(2_048);
  });

  it('says the pro-rata formula is an assumption, not a published rule', () => {
    expect(r.raw.health.notes.some((n) => n.key === 'health.minimumProRated')).toBe(true);
  });
});

// The minimum is NOT pro-rated for part time — VZP: "bez ohledu na délku
// pracovního úvazku". A 0,2 FTE employee faces the whole 22 400 Kč floor.
describe('2d. part-time does not reduce the health minimum', () => {
  it('applies the full minimum at a 20 % agreed working time', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 5_000;
    i.salary.workingTimePercent = 20;
    const r = run(i);
    expect(toCzkNumber(r.raw.health.minimumBase as never)).toBe(22_400);
    expect(r.shortfall).toBe(17_400);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. The one-koruna rounding boundary — §32
// ─────────────────────────────────────────────────────────────────────────────
describe('3. statutory rounding at a sub-haléř boundary', () => {
  // 4 662 × 7,1 % = 331,002 Kč. ČSSZ: compute at full precision, then round UP
  // once. A two-step implementation returns 331 and is one koruna short.
  it('rounds the employee premium up from 331,002 to 332', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 4_662;
    expect(run(i).socialEmployee).toBe(332);
  });

  it('rounds the employer premium up from 1 156,176 to 1 157', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 4_662;
    expect(run(i).socialEmployer).toBe(1_157);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. Participation threshold and the withholding regime
// ─────────────────────────────────────────────────────────────────────────────
describe('4. below the rozhodný příjem of 4 500 Kč', () => {
  // Participation follows the AGREED income (§ 6 odst. 1 písm. b) z. 187/2006),
  // not what happened to be paid this month. An employee on an agreed 22 400 Kč
  // paid 4 000 Kč — a mid-month start, or unpaid leave — is still participating,
  // so the premium is due from both sides. An earlier version zeroed both and
  // understated the employer's cost by 992 Kč.
  it('still charges social insurance — participation follows the agreed income', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 4_000;
    const r = run(i);
    expect(r.socialEmployee).toBe(284); // ceil(7,1 % × 4 000)
    expect(r.socialEmployer).toBe(992); // ceil(24,8 % × 4 000)
  });

  it('says small-scale employment is outside what it models', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 4_000;
    const r = run(i);
    expect(
      r.raw.social.notes.some((n) => n.key === 'social.smallScaleEmploymentNotModelled'),
    ).toBe(true);
  });

  it('still charges health insurance — it has no participation threshold', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 4_000;
    const r = run(i);
    expect(r.healthTotalOnActual).toBe(540); // ceil(13,5 % × 4 000)
  });

  it('switches to withholding tax when no declaration is signed', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 4_000;
    i.taxProfile.signedDeclaration = false;
    i.taxProfile.applyBasicCredit = false;
    const r = run(i);
    // § 36 odst. 3 rounds DOWN: 15 % × 4 000 = 600
    expect(r.taxFinal).toBe(600);
    expect(r.taxCredits).toBe(0);
  });

  it('stays on the advance regime when a declaration IS signed', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 4_000;
    const r = run(i);
    // base 4 000 → 15 % = 600; basic credit caps it at 0
    expect(r.taxFinal).toBe(0);
  });

  it('at exactly 4 500 Kč the advance regime applies — "nedosahující" is strict', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 4_500;
    i.taxProfile.signedDeclaration = false;
    i.taxProfile.applyBasicCredit = false;
    const r = run(i);
    expect(r.taxBase).toBe(4_500);
    expect(r.taxFinal).toBe(675); // 15 % of 4 500, advance regime, rounded up
    expect(r.socialEmployee).toBe(320); // ceil(7,1 % × 4 500) = ceil(319,5)
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. The 23 % band
// ─────────────────────────────────────────────────────────────────────────────
describe('5. crossing the 146 901 Kč monthly threshold', () => {
  it('taxes only the excess at 23 %', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 200_000;
    const r = run(i);
    // 15 % × 146 901 = 22 035,15; 23 % × 53 099 = 12 212,77; sum 34 247,92 → 34 248
    expect(r.taxBefore).toBe(34_248);
    expect(r.taxFinal).toBe(34_248 - 2_570);
  });

  it('nothing is taxed at 23 % when the ROUNDED base is at or below the threshold', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 146_900;
    const r = run(i);
    expect(r.taxBase).toBe(146_900);
    expect(toCzkNumber(r.raw.tax.upperBandTax as never)).toBe(0);
  });

  // A subtlety worth pinning: the threshold is tested against the base AFTER
  // § 38h odst. 1 rounds it up to whole hundreds. A gross of exactly 146 901 Kč
  // therefore rounds to 147 000 and puts 99 Kč into the 23 % band — the split
  // is not applied to the gross figure the employee sees on their contract.
  it('rounds the base to hundreds BEFORE splitting, which can create an upper band', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 146_901;
    const r = run(i);
    expect(r.taxBase).toBe(147_000);
    expect(toCzkNumber(r.raw.tax.upperBandTax as never)).toBeCloseTo(22.77, 2);
  });

  it('a bonus can push an otherwise sub-threshold salary over it', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 140_000;
    i.salary.bonusesCzk = 20_000;
    const r = run(i);
    expect(r.gross).toBe(160_000);
    expect(toCzkNumber(r.raw.tax.upperBandTax as never)).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. The annual social maximum — §8
// ─────────────────────────────────────────────────────────────────────────────
describe('6. annual maximum assessment base', () => {
  it('assumes it has not been reached in simple mode, and says so', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 200_000;
    const r = run(i);
    expect(r.socialBase).toBe(200_000);
    expect(r.raw.social.notes.some((n) => n.key === 'social.assumeMaximumNotReached')).toBe(true);
  });

  it('caps the base at the remaining capacity in advanced mode', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 200_000;
    i.socialMaximum.mode = 'explicit_ytd';
    i.socialMaximum.ytdAssessmentBaseCzk = 2_300_000;
    const r = run(i);
    // remaining = 2 350 416 − 2 300 000 = 50 416
    expect(r.socialBase).toBe(50_416);
    expect(r.socialEmployee).toBe(3_580); // ceil(7,1 % × 50 416) = ceil(3 579,536)
    expect(r.socialEmployer).toBe(12_504); // ceil(24,8 % × 50 416) = ceil(12 503,168)
  });

  // § 15a odst. 4 — above the ceiling the EMPLOYER stops too.
  it('stops both sides once the maximum is exhausted', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 200_000;
    i.socialMaximum.mode = 'explicit_ytd';
    i.socialMaximum.ytdAssessmentBaseCzk = 2_350_416;
    const r = run(i);
    expect(r.socialBase).toBe(0);
    expect(r.socialEmployee).toBe(0);
    expect(r.socialEmployer).toBe(0);
  });

  it('leaves health insurance uncapped — it has no maximum', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 200_000;
    i.socialMaximum.mode = 'explicit_ytd';
    i.socialMaximum.ytdAssessmentBaseCzk = 2_350_416;
    const r = run(i);
    expect(r.healthTotalOnActual).toBe(27_000); // 13,5 % × 200 000, uncapped
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Child benefit and the monthly tax bonus
// ─────────────────────────────────────────────────────────────────────────────
describe('7. children', () => {
  it('applies the benefit in birth order', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 60_000;
    i.taxProfile.children = [{ ztpp: false }, { ztpp: false }, { ztpp: false }];
    const r = run(i);
    // 1 267 + 1 860 + 2 320 = 5 447
    expect(toCzkNumber(r.raw.tax.childBenefitApplied as never)).toBe(5_447);
  });

  it('doubles a ZTP/P child', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 60_000;
    i.taxProfile.children = [{ ztpp: true }];
    const r = run(i);
    expect(toCzkNumber(r.raw.tax.childBenefitApplied as never)).toBe(2_534);
  });

  it('pays the excess as a monthly bonus, and never calls it salary', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 20_000;
    i.taxProfile.children = [{ ztpp: false }, { ztpp: false }, { ztpp: false }];
    const r = run(i);
    // tax 3 000 − credit 2 570 = 430; benefit 5 447 → 430 applied, 5 017 bonus
    expect(r.taxFinal).toBe(0);
    expect(r.taxBonus).toBe(5_017);
    // net exceeds gross, which is what a tax bonus does
    expect(r.net).toBe(20_000 - 1_420 - 1_224 + 5_017);
    expect(r.net).toBeGreaterThan(r.gross);
  });

  it('withholds the bonus below half the minimum wage', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 11_199;
    i.taxProfile.children = [{ ztpp: false }];
    const r = run(i);
    expect(r.taxBonus).toBe(0);
    expect(r.raw.tax.notes.some((n) => n.key === 'tax.bonusIncomeTooLow')).toBe(true);
  });

  it('pays it at exactly half the minimum wage', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 11_200;
    i.taxProfile.children = [{ ztpp: false }];
    const r = run(i);
    expect(r.taxBonus).toBeGreaterThan(0);
  });

  it('withholds a bonus below the 50 Kč payout floor', () => {
    // Engineer a bonus between 1 and 49 Kč: benefit 1 267, tax after credits 1 230.
    // base 25 400 → 15 % = 3 810 − 2 570 = 1 240 → benefit leaves 27 Kč.
    const i = input();
    i.salary.grossMonthlyCzk = 25_400;
    i.taxProfile.children = [{ ztpp: false }];
    const r = run(i);
    expect(r.taxFinal).toBe(0);
    expect(r.taxBonus).toBe(0);
    expect(r.raw.tax.notes.some((n) => n.key === 'tax.bonusBelowMinimumPayout')).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. Declaration and residency
// ─────────────────────────────────────────────────────────────────────────────
describe('8. declaration and residency restrictions', () => {
  it('applies nothing monthly without a signed declaration', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    i.taxProfile.signedDeclaration = false;
    i.taxProfile.applyBasicCredit = false;
    i.taxProfile.children = [{ ztpp: false }];
    const r = run(i);
    expect(r.taxCredits).toBe(0);
    expect(r.taxFinal).toBe(6_000);
    expect(r.taxBonus).toBe(0);
  });

  it('gives a non-resident the basic credit but not disability or ZTP/P', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    i.taxProfile.residency = 'non_resident';
    i.taxProfile.disability = 'third';
    i.taxProfile.ztpp = true;
    const r = run(i);
    expect(r.taxCredits).toBe(2_570);
    expect(r.raw.tax.notes.some((n) => n.key === 'tax.nonResidentCredits')).toBe(true);
  });

  it('gives a non-resident no monthly child benefit', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    i.taxProfile.residency = 'non_resident';
    i.taxProfile.children = [{ ztpp: false }];
    const r = run(i);
    expect(toCzkNumber(r.raw.tax.childBenefitApplied as never)).toBe(0);
    expect(r.taxBonus).toBe(0);
  });

  it('gives a resident the disability and ZTP/P credits', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    i.taxProfile.disability = 'third';
    i.taxProfile.ztpp = true;
    const r = run(i);
    expect(r.taxCredits).toBe(2_570 + 420 + 1_345);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. Working old-age pensioner — §11
// ─────────────────────────────────────────────────────────────────────────────
describe('9. working old-age pensioner', () => {
  const i = input();
  i.salary.grossMonthlyCzk = 40_000;
  i.employerOptions.employeeCategory = 'working_old_age_pensioner';
  const r = run(i);

  // § 7e — premium 7,1 % rounded up, THEN a 6,5 % sleva rounded up separately.
  it('applies a 6,5 % sleva rather than a reduced rate', () => {
    expect(r.socialEmployee).toBe(2_840 - 2_600);
  });

  it('leaves the employer rate untouched', () => {
    expect(r.socialEmployer).toBe(9_920);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 10. Employer social discount — §10
// ─────────────────────────────────────────────────────────────────────────────
describe('10. employer social-insurance discount', () => {
  function claimed() {
    const i = input();
    i.salary.grossMonthlyCzk = 20_000;
    i.employerOptions.claimEmployerSocialDiscount = true;
    i.employerOptions.employerDiscountCategory = 'age_over_55';
    i.employerOptions.discountFacts.agreedWeeklyHours = 20;
    i.employerOptions.discountFacts.fullTimeWeeklyHours = 40;
    i.employerOptions.discountFacts.hoursWorkedThisMonth = 80;
    return i;
  }

  it('applies 5 % when every measurable condition passes', () => {
    const r = run(claimed());
    expect(r.socialDiscount).toBe(1_000);
    expect(r.socialEmployerNet).toBe(4_960 - 1_000);
  });

  it('refuses it outside the 8–30 hour band', () => {
    const i = claimed();
    i.employerOptions.discountFacts.agreedWeeklyHours = 35;
    expect(run(i).socialDiscount).toBe(0);
  });

  it('refuses it when the agreed time is not shorter than full time', () => {
    const i = claimed();
    i.employerOptions.discountFacts.agreedWeeklyHours = 30;
    i.employerOptions.discountFacts.fullTimeWeeklyHours = 30;
    expect(run(i).socialDiscount).toBe(0);
  });

  it('refuses it above the 73 451 Kč monthly base ceiling', () => {
    const i = claimed();
    i.salary.grossMonthlyCzk = 73_452;
    expect(run(i).socialDiscount).toBe(0);
  });

  it('allows it at exactly the ceiling — "vyšší než" is strict', () => {
    const i = claimed();
    i.salary.grossMonthlyCzk = 73_451;
    // 73 451 / 131 = 560,7 → ceil 561 Kč/h, inside the 564 Kč per-hour ceiling,
    // and 131 hours is inside the 138-hour cap.
    i.employerOptions.discountFacts.hoursWorkedThisMonth = 131;
    expect(run(i).socialDiscount).toBeGreaterThan(0);
  });

  it('refuses it above 138 worked hours', () => {
    const i = claimed();
    i.employerOptions.discountFacts.hoursWorkedThisMonth = 139;
    expect(run(i).socialDiscount).toBe(0);
  });

  it('exempts an under-21 from the hours cap', () => {
    const i = claimed();
    i.employerOptions.employerDiscountCategory = 'under_21';
    i.employerOptions.discountFacts.hoursWorkedThisMonth = 160;
    i.employerOptions.discountFacts.agreedWeeklyHours = 40;
    expect(run(i).socialDiscount).toBeGreaterThan(0);
  });

  it('refuses it above the 564 Kč per-hour ceiling', () => {
    const i = claimed();
    i.salary.grossMonthlyCzk = 60_000;
    i.employerOptions.discountFacts.hoursWorkedThisMonth = 100; // 600 Kč/h
    expect(run(i).socialDiscount).toBe(0);
  });

  it('is never applied unless claimed', () => {
    const i = claimed();
    i.employerOptions.claimEmployerSocialDiscount = false;
    expect(run(i).socialDiscount).toBe(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 11. Statutory employer liability insurance — §14
// ─────────────────────────────────────────────────────────────────────────────
describe('11. employer liability insurance', () => {
  it('is excluded from the total unless enabled', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    const r = run(i);
    expect(r.liability).toBe(0);
    expect(r.employerStatutory).toBe(53_520);
  });

  it('applies the selected activity rate per mille', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    i.liabilityInsurance = { enabled: true, activityKey: 'rate_9_8', customRatePerMille: null };
    const r = run(i);
    expect(r.liability).toBe(392); // 40 000 × 9,8 ‰
    expect(r.employerStatutory).toBe(53_520 + 392);
  });

  it('reports the quarterly basis as three months of the uncapped base', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    i.liabilityInsurance = { enabled: true, activityKey: 'agriculture', customRatePerMille: null };
    const r = run(i);
    expect(toCzkNumber(r.raw.liability.quarterlyBasisForThisEmployee as never)).toBe(120_000);
    expect(toCzkNumber(r.raw.liability.quarterlyAllocated as never)).toBe(840); // 120 000 × 7 ‰
  });

  // The annual social maximum does not reach this premium.
  it('does not cap the base at the annual social maximum', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 200_000;
    i.socialMaximum.mode = 'explicit_ytd';
    i.socialMaximum.ytdAssessmentBaseCzk = 2_350_416;
    i.liabilityInsurance = { enabled: true, activityKey: 'other_economic', customRatePerMille: null };
    const r = run(i);
    expect(r.socialBase).toBe(0); // social IS capped
    expect(r.liability).toBe(1_120); // 200 000 × 5,6 ‰ — liability is NOT
  });

  it('accepts a rate the employer enters directly', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    i.liabilityInsurance = { enabled: true, activityKey: null, customRatePerMille: 3.5 };
    expect(run(i).liability).toBe(140);
  });

  it('never adds the 100 Kč quarterly floor to one employee', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 5_000;
    i.liabilityInsurance = { enabled: true, activityKey: 'rate_2_8', customRatePerMille: null };
    const r = run(i);
    expect(r.liability).toBe(14); // 5 000 × 2,8 ‰ — not raised to 100/3
    expect(r.raw.liability.notes.some((n) => n.key === 'liability.belowEmployerFloor')).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 12. Company costs stay separate from statutory cost — §17
// ─────────────────────────────────────────────────────────────────────────────
describe('12. the two totals are different numbers', () => {
  const i = input();
  i.salary.grossMonthlyCzk = 40_000;
  i.additionalCosts = { ...i.additionalCosts, mealContribution: 1_500, recruitment: 30_000 };
  const r = run(i);

  it('leaves the statutory total untouched by company spending', () => {
    expect(r.employerStatutory).toBe(53_520);
  });

  it('adds only recurring monthly cost to the real monthly total', () => {
    expect(r.totalReal).toBe(53_520 + 1_500);
  });

  it('keeps the one-off cost out of the monthly figure but in the annual one', () => {
    expect(toCzkNumber(r.raw.companyCosts.annualTotal as never)).toBe(1_500 * 12 + 30_000);
  });

  it('does not let a benefit change the employee taxable base', () => {
    expect(r.gross).toBe(40_000);
    expect(r.taxBase).toBe(40_000);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 13. The money-flow breakdown must actually add up — §25
// ─────────────────────────────────────────────────────────────────────────────
describe('13. money flow sums to the total real employer cost', () => {
  const cases: Array<[string, (i: Mutable<EmployerCostInput>) => void]> = [
    ['plain 40 000', (i) => { i.salary.grossMonthlyCzk = 40_000; }],
    ['below the health minimum', (i) => { i.salary.grossMonthlyCzk = 10_000; }],
    ['employer-side obstacle', (i) => { i.salary.grossMonthlyCzk = 10_000; i.healthMinimum.situation = 'employer_obstacle'; }],
    ['tax bonus', (i) => { i.salary.grossMonthlyCzk = 20_000; i.taxProfile.children = [{ ztpp: false }, { ztpp: false }, { ztpp: false }]; }],
    ['above the 23 % threshold', (i) => { i.salary.grossMonthlyCzk = 250_000; }],
    ['social maximum exhausted', (i) => { i.salary.grossMonthlyCzk = 200_000; i.socialMaximum.mode = 'explicit_ytd'; i.socialMaximum.ytdAssessmentBaseCzk = 2_350_416; }],
    ['with liability insurance and company costs', (i) => {
      i.salary.grossMonthlyCzk = 40_000;
      i.liabilityInsurance = { enabled: true, activityKey: 'rate_8_4', customRatePerMille: null };
      i.additionalCosts = { ...i.additionalCosts, mealContribution: 1_500 };
    }],
    ['no participation', (i) => { i.salary.grossMonthlyCzk = 4_000; }],
    ['zero gross', (i) => { i.salary.grossMonthlyCzk = 0; }],
  ];

  for (const [name, mutate] of cases) {
    it(name, () => {
      const i = input();
      mutate(i);
      const r = calculate(i, CZ_2026);
      expect(toCzkNumber(moneyFlowTotal(r.moneyFlow) as never)).toBe(
        toCzkNumber(r.totalRealEmployerCost as never),
      );
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 14. Edge cases — §33
// ─────────────────────────────────────────────────────────────────────────────
describe('14. edges', () => {
  // Zero gross is a real situation, not only an empty form: a whole month of
  // unpaid leave produces it. The health minimum still applies — VZP confirms
  // unpaid leave has not reduced it since 1 January 2015 — so the employee owes
  // 13,5 % of the whole 22 400 Kč minimum through the employer, and their net
  // for the month is NEGATIVE. That is the correct answer, and clamping it to
  // zero would hide a debt the employee actually has.
  it('handles zero gross without throwing or dividing by zero', () => {
    const r = run(input());
    expect(r.gross).toBe(0);
    expect(r.employerStatutory).toBe(0);
    expect(r.raw.metrics.netToGrossPercent).toBeNull();
    expect(r.raw.metrics.statutoryAboveGrossPercent).toBeNull();
  });

  it('at zero gross the employee still owes the minimum-base premium', () => {
    const r = run(input());
    expect(r.shortfall).toBe(22_400);
    expect(r.topUpEmployee).toBe(3_024); // 13,5 % × 22 400 exactly
    expect(r.net).toBe(-3_024);
    expect(r.socialEmployee).toBe(0); // no participation, so no social premium
  });

  it('a statutory exemption at zero gross leaves nothing owed', () => {
    const i = input();
    i.healthMinimum.situation = 'statutory_exemption';
    const r = run(i);
    expect(r.net).toBe(0);
    expect(r.topUpEmployee).toBe(0);
  });

  it('handles exactly the minimum wage', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 22_400;
    const r = run(i);
    expect(r.shortfall).toBe(0);
    expect(r.healthTotalOnActual).toBe(3_024); // 13,5 % × 22 400 exactly
  });

  // The month's premium is computed ONCE from the minimum base, so the parts
  // always sum to the published 3 024 Kč minimum premium. Two independent
  // ceilings would return 3 025 here — and on 22 288 of the 22 400 whole-koruna
  // grosses below the minimum, contradicting a figure VZP prints.
  it('handles one koruna below the minimum wage without over-remitting', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 22_399;
    const r = run(i);
    expect(r.shortfall).toBe(1);
    // ceil(13,5 % × 22 399) = 3 024 already, so nothing remains to top up.
    expect(r.topUpEmployee).toBe(0);
    expect(r.healthTotalOnActual + r.topUpEmployee).toBe(3_024);
  });

  it('always remits exactly the minimum premium below the minimum base', () => {
    for (const gross of [0, 1, 5_000, 10_000, 18_500, 22_398, 22_399]) {
      const i = input();
      i.salary.grossMonthlyCzk = gross;
      const r = run(i);
      const remitted =
        r.healthEmployeeOnActual + r.healthEmployerOnActual + r.topUpEmployee + r.topUpEmployer;
      expect(remitted, `gross ${gross}`).toBe(3_024);
    }
  });

  // The declaration stays SIGNED in both, so the advance regime applies. With it
  // unsigned these tiny amounts fall under withholding tax instead, which rounds
  // DOWN — a different rule that would silently mask the branch being tested.
  it('handles a tax base of exactly 100 Kč — the low rounding branch', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 100;
    i.taxProfile.applyBasicCredit = false;
    const r = run(i);
    // "do 100 Kč" is inclusive: the base stays 100, not rounded up to hundreds
    expect(r.taxBase).toBe(100);
  });

  it('handles a tax base of 101 Kč — the high rounding branch', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 101;
    i.taxProfile.applyBasicCredit = false;
    const r = run(i);
    expect(r.taxBase).toBe(200);
  });

  // The engine's arithmetic throws a RangeError outside the safe-integer range,
  // which is right for arithmetic and wrong for a visitor to meet. Validation
  // has to reject these first, so the form explains rather than crashes.
  it('rejects an oversized bonus rather than overflowing', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 0;
    i.salary.bonusesCzk = 5e8;
    const v = validateInput(i, CZ_2026);
    expect(v.ok).toBe(false);
    expect(v.issues.some((x) => x.key === 'salary.bonuses.tooLarge')).toBe(true);
  });

  it('rejects an oversized other-taxable amount', () => {
    const i = input();
    i.salary.otherTaxableCzk = 1e12;
    const v = validateInput(i, CZ_2026);
    expect(v.ok).toBe(false);
  });

  // Three components each just inside their own ceiling still sum past it.
  it('rejects a sum that is too large even when each component passes', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 100_000_000;
    i.salary.bonusesCzk = 100_000_000;
    i.salary.otherTaxableCzk = 100_000_000;
    const v = validateInput(i, CZ_2026);
    expect(v.ok).toBe(false);
    expect(v.issues.some((x) => x.key === 'salary.total.tooLarge')).toBe(true);
  });

  it('still computes at the largest accepted total', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 100_000_000;
    expect(validateInput(i, CZ_2026).ok).toBe(true);
    expect(() => calculate(i, CZ_2026)).not.toThrow();
  });

  it('never returns NaN or Infinity anywhere in the result', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 37_777;
    i.taxProfile.children = [{ ztpp: true }, { ztpp: false }];
    const r = calculate(i, CZ_2026);
    const walk = (v: unknown, path: string): void => {
      if (typeof v === 'number') {
        expect(Number.isFinite(v), `${path} = ${v}`).toBe(true);
        return;
      }
      if (Array.isArray(v)) return v.forEach((x, n) => walk(x, `${path}[${n}]`));
      if (v && typeof v === 'object') {
        for (const [k, val] of Object.entries(v)) walk(val, `${path}.${k}`);
      }
    };
    walk(r, 'result');
  });

  it('never produces a negative employer contribution', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 20_000;
    i.employerOptions.claimEmployerSocialDiscount = true;
    i.employerOptions.employerDiscountCategory = 'age_over_55';
    i.employerOptions.discountFacts.agreedWeeklyHours = 20;
    i.employerOptions.discountFacts.fullTimeWeeklyHours = 40;
    i.employerOptions.discountFacts.hoursWorkedThisMonth = 80;
    const r = run(i);
    expect(r.socialEmployerNet).toBeGreaterThanOrEqual(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 15. Determinism and property tests — §35
// ─────────────────────────────────────────────────────────────────────────────
describe('15. properties', () => {
  it('is deterministic', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 45_678;
    expect(JSON.stringify(calculate(i, CZ_2026))).toBe(JSON.stringify(calculate(i, CZ_2026)));
  });

  it('adding a taxable bonus cannot reduce gross taxable income', () => {
    const a = input();
    a.salary.grossMonthlyCzk = 40_000;
    const b = input();
    b.salary.grossMonthlyCzk = 40_000;
    b.salary.bonusesCzk = 5_000;
    expect(run(b).gross).toBeGreaterThan(run(a).gross);
  });

  it('a tax credit never changes an employer contribution', () => {
    const a = input();
    a.salary.grossMonthlyCzk = 40_000;
    a.taxProfile.disability = 'third';
    const b = input();
    b.salary.grossMonthlyCzk = 40_000;
    expect(run(a).socialEmployer).toBe(run(b).socialEmployer);
    expect(run(a).healthEmployerOnActual).toBe(run(b).healthEmployerOnActual);
  });

  it('changing the liability rate moves only that line and the totals', () => {
    const a = input();
    a.salary.grossMonthlyCzk = 40_000;
    a.liabilityInsurance = { enabled: true, activityKey: 'rate_2_8', customRatePerMille: null };
    const b = input();
    b.salary.grossMonthlyCzk = 40_000;
    b.liabilityInsurance = { enabled: true, activityKey: 'mining', customRatePerMille: null };
    const ra = run(a);
    const rb = run(b);
    expect(ra.taxFinal).toBe(rb.taxFinal);
    expect(ra.socialEmployee).toBe(rb.socialEmployee);
    expect(ra.net).toBe(rb.net);
    expect(rb.liability).toBeGreaterThan(ra.liability);
    expect(rb.employerStatutory).toBeGreaterThan(ra.employerStatutory);
  });

  it('net never exceeds gross unless a tax bonus is paid', () => {
    for (const g of [5_000, 22_400, 40_000, 146_901, 300_000]) {
      const i = input();
      i.salary.grossMonthlyCzk = g;
      const r = run(i);
      expect(r.net, `gross ${g}`).toBeLessThanOrEqual(r.gross);
    }
  });

  it('a one-off cost never becomes recurring', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    i.additionalCosts = { ...i.additionalCosts, recruitment: 30_000 };
    const r = run(i);
    expect(r.totalReal).toBe(r.employerStatutory);
  });
});

// §22 — the annual view is built from real periodicity, and its arithmetic is
// exact. The earlier implementation round-tripped through koruny, which would
// shed a haléř on any company cost entered with decimals.
describe('15b. annual view', () => {
  it('scales the statutory cost by twelve, exactly', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    const r = calculate(i, CZ_2026);
    expect(toCzkNumber(r.annual.totalStatutoryEmployerCost as never)).toBe(53_520 * 12);
  });

  it('keeps a decimal company cost exact across twelve months', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    i.additionalCosts = { ...i.additionalCosts, mealContribution: 1_500.5 };
    const r = calculate(i, CZ_2026);
    // 1 500,50 × 12 = 18 006,00 — not 18 000 and not 18 012.
    expect(toCzkNumber(r.annual.recurringMonthlyTimesTwelve as never)).toBe(18_006);
  });

  it('does not fold a one-off cost into the recurring line', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    i.additionalCosts = { ...i.additionalCosts, recruitment: 30_000 };
    const r = calculate(i, CZ_2026);
    expect(toCzkNumber(r.annual.recurringMonthlyTimesTwelve as never)).toBe(0);
    expect(toCzkNumber(r.annual.oneOffItems as never)).toBe(30_000);
    expect(toCzkNumber(r.annual.totalRealEmployerCost as never)).toBe(53_520 * 12 + 30_000);
  });

  it('says the annual statutory figure is a twelve-identical-month scenario', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 40_000;
    const r = calculate(i, CZ_2026);
    expect(r.annual.notes.some((n) => n.key === 'annual.statutoryIsAScenario')).toBe(true);
  });
});

describe('16. calendar helper', () => {
  it('returns the right number of days', () => {
    expect(daysInMonth(2026, 1)).toBe(31);
    expect(daysInMonth(2026, 2)).toBe(28);
    expect(daysInMonth(2024, 2)).toBe(29);
    expect(daysInMonth(2026, 4)).toBe(30);
  });
});
