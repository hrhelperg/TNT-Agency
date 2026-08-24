import { describe, it, expect } from 'vitest';
import { calculate, createDefaultInput, CZ_2026 } from './engine';
import { roundTaxAdvance, roundTaxBase } from './tax';
import { employeeThird } from './health';
import { czk, percentOfRoundedToCzk, toCzkNumber } from '../../payroll/money';
import type { EmployerCostInput } from './types';

/**
 * GOLDEN TESTS — worked examples published BY the authorities.
 *
 * These are not our arithmetic. Every input and every expected output below was
 * printed by Finanční správa, ČSSZ, VZP or another public health insurer, and
 * each is recorded with the URL it came from.
 *
 * THE RULE FOR THIS FILE: if the engine disagrees with one of these, the ENGINE
 * IS WRONG. An expected value here is never edited to make a test pass. If an
 * authority republishes a figure, that is a new fact and needs a new source
 * entry and a dated note — not a quiet edit.
 *
 * WHAT IS DELIBERATELY ABSENT
 * ───────────────────────────
 * There is no golden test for the health minimum-base top-up, for the pro-rated
 * minimum, for the working-pensioner two-step on a non-round base, or for the
 * employer-liability premium. Two independent research passes searched vzp.cz,
 * zpmvcr.cz, cpzp.cz, vozp.cz, ozp.cz, cssz.gov.cz, koop.cz, generaliceska.cz
 * and mfcr.gov.cz: those rules are published, but no authority publishes a
 * calculation of them. Inventing an example and calling it golden would be
 * worse than having none, because it would look like external verification.
 *
 * One warning worth leaving here: a confident-looking "example" yielding
 * 605,27 Kč for a health top-up circulates in search-engine summaries. It
 * appears on no insurer page and is doubly wrong — it applies the OSVČ minimum
 * base of 24 483,50 Kč to an EMPLOYEE, whose minimum is 22 400 Kč, and it does
 * not round. It must never be used.
 */

type Mutable<T> = { -readonly [K in keyof T]: Mutable<T[K]> };
function input(): Mutable<EmployerCostInput> {
  return JSON.parse(JSON.stringify(createDefaultInput(2026, 3))) as Mutable<EmployerCostInput>;
}
const k = (h: number) => toCzkNumber(h as never);

// ─────────────────────────────────────────────────────────────────────────────
// Finanční správa — monthly income-tax advance, § 38h
// https://financnisprava.gov.cz/cs/dane/dane/dan-z-prijmu/zamestnanci-zamestnavatele/obecne-informace
// ─────────────────────────────────────────────────────────────────────────────
describe('GOLDEN · Finanční správa · monthly tax advance below the threshold', () => {
  // Published: gross 45 810 Kč → base 45 900 Kč → 15 % → 6 885 Kč.
  const i = input();
  i.salary.grossMonthlyCzk = 45_810;
  i.taxProfile.applyBasicCredit = false;
  const r = calculate(i, CZ_2026);

  it('rounds the base up to whole hundreds', () => {
    expect(k(r.tax.roundedBase)).toBe(45_900);
  });

  it('computes the advance as published', () => {
    expect(k(r.tax.advanceBeforeCredits)).toBe(6_885);
  });
});

describe('GOLDEN · Finanční správa · monthly tax advance above the threshold', () => {
  // The decisive tax example. Published: gross 165 615 Kč.
  //   base                165 700 Kč  (rounded up to hundreds)
  //   15 % slice          146 901 × 0,15 = 22 035,15 Kč
  //   23 % slice   (165 700 − 146 901) × 0,23 =  4 323,77 Kč
  //   sum                              26 358,92 Kč
  //   advance, ceil once               26 359    Kč
  //
  // It proves three separate things at once: the threshold is compared against
  // the ROUNDED base, the 15 % slice runs on exactly 146 901 rather than on the
  // rounded base, and the ceiling is applied ONCE to the sum of two unrounded
  // slices rather than to each slice.
  const i = input();
  i.salary.grossMonthlyCzk = 165_615;
  i.taxProfile.applyBasicCredit = false;
  const r = calculate(i, CZ_2026);

  it('rounds the base up to whole hundreds', () => {
    expect(k(r.tax.roundedBase)).toBe(165_700);
  });

  it('runs the 15 % band on exactly the threshold, not on the rounded base', () => {
    expect(k(r.tax.lowerBandTax)).toBeCloseTo(22_035.15, 2);
  });

  it('runs the 23 % band on the excess over the threshold', () => {
    expect(k(r.tax.upperBandTax)).toBeCloseTo(4_323.77, 2);
  });

  it('rounds the advance up once, to the published figure', () => {
    expect(k(r.tax.advanceBeforeCredits)).toBe(26_359);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ČSSZ — premium rounding at full precision
// https://www.cssz.gov.cz/web/cz/aktuality-pro-sw-vyvojare1
// ─────────────────────────────────────────────────────────────────────────────
describe('GOLDEN · ČSSZ · employer premium computed at full precision', () => {
  // Published: aggregate base 387 371 Kč × 24,8 % = 96 068,008 Kč → 96 069 Kč.
  //
  // ČSSZ states the implementation rule explicitly: "Mzdový software musí při
  // výpočtu počítat se všemi desetinnými místy, která jsou následně zaokrouhlena
  // na celé koruny nahoru." An engine that truncates to two decimals before
  // rounding returns 96 068 and is one koruna short.
  //
  // Published 12. 9. 2019; both the 24,8 % rate and the round-up rule are
  // unchanged for 2026, so it is valid as a 2026 test — but it is not a
  // 2026-dated publication and is not presented as one.
  it('rounds 96 068,008 up to 96 069, not down to 96 068', () => {
    expect(k(percentOfRoundedToCzk(czk(387_371), 24.8, 'up'))).toBe(96_069);
  });

  it('a truncate-then-round implementation would fail this', () => {
    const truncated = Math.ceil(Math.trunc(387_371 * 0.248 * 100) / 100);
    expect(truncated).toBe(96_068); // the defect, pinned
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ČSSZ — the parameter chain every threshold hangs from
// https://www.cssz.gov.cz/-/prehled-nejdulezitejsich-udaju-pro-socialni-zabezpeceni-v-roce-2026
// ─────────────────────────────────────────────────────────────────────────────
describe('GOLDEN · ČSSZ · the 2026 average wage and everything derived from it', () => {
  // nařízení vlády č. 365/2025 Sb.: VVZ 46 278 Kč, koeficient 1,0581.
  // 46 278 × 1,0581 = 48 966,7518 → ceil → 48 967 Kč.
  const averageWage = Math.ceil(46_278 * 1.0581 * 10_000) / 10_000;

  it('derives the average wage the published way', () => {
    expect(46_278 * 1.0581).toBeCloseTo(48_966.7518, 4);
    expect(Math.ceil(46_278 * 1.0581)).toBe(48_967);
    expect(CZ_2026.averageWageMonthly.value).toBe(48_967);
    expect(averageWage).toBeGreaterThan(48_966);
  });

  it('the annual maximum is 48× the average wage, exactly', () => {
    expect(48 * 48_967).toBe(2_350_416);
    expect(CZ_2026.maxAnnualSocialBase.value).toBe(2_350_416);
  });

  it('the monthly 23 % threshold is 3× the average wage', () => {
    expect(3 * 48_967).toBe(146_901);
    expect(CZ_2026.taxUpperMonthlyThreshold.value).toBe(146_901);
  });

  it('the employer-discount ceilings derive from the same average wage', () => {
    // 1,5 × 48 967 = 73 450,5 → ceil → 73 451 Kč
    expect(Math.ceil(48_967 * 1.5)).toBe(73_451);
    // 1,15 % × 48 967 = 563,12… → ceil → 564 Kč/h
    expect(Math.ceil((48_967 * 1.15) / 100)).toBe(564);
  });
});

describe('GOLDEN · ČSSZ · secondary derivations, as a round-UP regression battery', () => {
  // Published: ¼ → 12 242; ½ → 24 484; 40 % → 19 587; 11 % → 5 387.
  // All four reproduce under ceiling and none under round-half or floor.
  const cases: Array<[string, number, number]> = [
    ['quarter', 25, 12_242],
    ['half', 50, 24_484],
    ['forty percent', 40, 19_587],
    ['eleven percent', 11, 5_387],
  ];
  for (const [name, pct, expected] of cases) {
    it(`${name} of the average wage rounds up to ${expected}`, () => {
      expect(k(percentOfRoundedToCzk(czk(48_967), pct, 'up'))).toBe(expected);
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Public health insurers — the 13,5 % ceiling rule
// ─────────────────────────────────────────────────────────────────────────────
describe('GOLDEN · ZP MV ČR · the decisive health rounding example', () => {
  // Published: base 24 483,50 Kč × 13,5 % = 3 305,2725 → 3 306 Kč.
  //
  // The strongest available proof of the DIRECTION: round-to-nearest gives
  // 3 305 and truncation gives 3 305, so only ceiling reproduces the published
  // figure. (An OSVČ base, but it exercises the identical § 2 odst. 2 rule.)
  it('ceils 3 305,2725 to 3 306 — nearest and truncation both give 3 305', () => {
    expect(k(percentOfRoundedToCzk(czk(24_483.5), 13.5, 'up'))).toBe(3_306);
    expect(Math.round(24_483.5 * 0.135)).toBe(3_305);
    expect(Math.trunc(24_483.5 * 0.135)).toBe(3_305);
  });
});

describe('GOLDEN · ZP MV ČR / VZP · state-insured premium', () => {
  // Published: base 16 206 Kč × 13,5 % = 2 187,81 → 2 188 Kč.
  // Excludes truncation but not round-to-nearest — a regression test, not a proof.
  it('gives 2 188', () => {
    expect(k(percentOfRoundedToCzk(czk(16_206), 13.5, 'up'))).toBe(2_188);
  });
});

describe('GOLDEN · VZP · the employee minimum premium for 2026', () => {
  // Published: minimum base 22 400 Kč → premium 3 024 Kč
  // (ZP MV ČR: "zvyšuje se z 2 808 Kč na 3 024 Kč").
  const i = input();
  i.salary.grossMonthlyCzk = 22_400;
  const r = calculate(i, CZ_2026);

  it('computes the published minimum premium', () => {
    expect(k(r.health.employeeOnActual) + k(r.health.employerOnActual)).toBe(3_024);
  });

  it('splits it one third / two thirds', () => {
    // 3 024 is divisible by 3, so this splits cleanly — and therefore does NOT
    // test how the thirds round in the ambiguous case. The caveat is the point.
    expect(k(r.health.employeeOnActual)).toBe(1_008);
    expect(k(r.health.employerOnActual)).toBe(2_016);
  });

  it('leaves no shortfall at exactly the minimum', () => {
    expect(k(r.health.shortfall)).toBe(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ČSSZ — the employer discount, 5 % on the aggregate
// ─────────────────────────────────────────────────────────────────────────────
describe('GOLDEN · ČSSZ · employer discount on an aggregate base', () => {
  // Published (aktualita 28. 4. 2026): two employees, bases 20 000 + 30 000 Kč,
  // aggregate 50 000 Kč, discount 2 500 Kč.
  it('is 5 % of the aggregate — 50 000 → 2 500', () => {
    expect(k(percentOfRoundedToCzk(czk(50_000), 5, 'up'))).toBe(2_500);
  });

  // Published (aktualita 18. 5. 2026): 40 qualifying employees × 30 000 Kč,
  // aggregate 1 200 000 Kč, discount 60 000 Kč.
  it('scales — 1 200 000 → 60 000', () => {
    expect(k(percentOfRoundedToCzk(czk(1_200_000), 5, 'up'))).toBe(60_000);
  });

  // Per employee, the engine applies the same 5 % to that employee's own base.
  it('applies 5 % of one employee’s base in a single-employee calculation', () => {
    const i = input();
    i.salary.grossMonthlyCzk = 20_000;
    i.employerOptions.claimEmployerSocialDiscount = true;
    i.employerOptions.employerDiscountCategory = 'age_over_55';
    i.employerOptions.discountFacts.agreedWeeklyHours = 20;
    i.employerOptions.discountFacts.fullTimeWeeklyHours = 40;
    i.employerOptions.discountFacts.hoursWorkedThisMonth = 80;
    const r = calculate(i, CZ_2026);
    expect(k(r.social.employerDiscount)).toBe(1_000);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Statutory rounding primitives, exercised directly
// ─────────────────────────────────────────────────────────────────────────────
describe('GOLDEN · statutory rounding functions', () => {
  it('roundTaxBase: "do 100 Kč" is inclusive and rounds to koruny', () => {
    expect(k(roundTaxBase(czk(99.4)))).toBe(100);
    expect(k(roundTaxBase(czk(100)))).toBe(100);
  });

  it('roundTaxBase: above 100 Kč rounds up to whole hundreds', () => {
    expect(k(roundTaxBase(czk(100.01)))).toBe(200);
    expect(k(roundTaxBase(czk(45_810)))).toBe(45_900);
    expect(k(roundTaxBase(czk(165_615)))).toBe(165_700);
    expect(k(roundTaxBase(czk(40_000)))).toBe(40_000);
  });

  it('roundTaxAdvance rounds up to whole koruny', () => {
    expect(k(roundTaxAdvance(czk(26_358.92)))).toBe(26_359);
    expect(k(roundTaxAdvance(czk(6_885)))).toBe(6_885);
  });

  it('employeeThird rounds the employee share up and keeps the sum exact', () => {
    for (const premium of [3_024, 3_025, 3_026, 1_350, 5_400, 1]) {
      const e = employeeThird(czk(premium));
      const r = czk(premium) - e;
      expect(k(e) + k(r), `premium ${premium}`).toBe(premium);
      expect(k(e), `premium ${premium}`).toBe(Math.ceil(premium / 3));
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// The registry must agree with the other registry — §5 of the build brief
// ─────────────────────────────────────────────────────────────────────────────
describe('cross-registry consistency with lib/payroll', () => {
  // Two registries of the same Czech law is how one silently goes stale. Where
  // both carry a value for the same legal fact, they must agree — and where they
  // deliberately differ, the difference is asserted here so it is a decision
  // rather than a drift.
  it('shares every constant that both registries carry', async () => {
    const { CZ_2026: LEGACY } = await import('../../payroll/rules/cz-2026');
    expect(CZ_2026.employeeSocialRate.value).toBe(LEGACY.employeeSocialRate.value);
    expect(CZ_2026.employerSocialRates[0].rate.value).toBe(LEGACY.employerSocialRate.value);
    expect(CZ_2026.employeeHealthRate.value).toBe(LEGACY.employeeHealthRate.value);
    expect(CZ_2026.employerHealthRate.value).toBe(LEGACY.employerHealthRate.value);
    expect(CZ_2026.healthTotalRate.value).toBe(LEGACY.healthTotalRate.value);
    expect(CZ_2026.maxAnnualSocialBase.value).toBe(LEGACY.maxAnnualSocialBase.value);
    expect(CZ_2026.healthMinimum.monthlyMinimum.value).toBe(LEGACY.minHealthBaseMonthly.value);
    expect(CZ_2026.taxLowerRate.value).toBe(LEGACY.taxLowerRate.value);
    expect(CZ_2026.taxUpperRate.value).toBe(LEGACY.taxUpperRate.value);
    expect(CZ_2026.taxUpperMonthlyThreshold.value).toBe(LEGACY.taxUpperMonthlyThreshold.value);
    expect(CZ_2026.basicTaxpayerCreditMonthly.value).toBe(LEGACY.basicTaxpayerCreditMonthly.value);
    expect(CZ_2026.disabilityFirstSecondCreditMonthly.value).toBe(
      LEGACY.disabilityFirstSecondCreditMonthly.value,
    );
    expect(CZ_2026.disabilityThirdCreditMonthly.value).toBe(LEGACY.disabilityThirdCreditMonthly.value);
    expect(CZ_2026.ztppCreditMonthly.value).toBe(LEGACY.ztppCreditMonthly.value);
    expect(CZ_2026.childBenefit.firstMonthly.value).toBe(LEGACY.childBenefit.firstMonthly);
    expect(CZ_2026.childBenefit.secondMonthly.value).toBe(LEGACY.childBenefit.secondMonthly);
    expect(CZ_2026.childBenefit.thirdPlusMonthly.value).toBe(LEGACY.childBenefit.thirdPlusMonthly);
    expect(CZ_2026.childBenefit.ztppMultiplier.value).toBe(LEGACY.childBenefit.ztppMultiplier);
    expect(CZ_2026.childBenefit.bonusMinMonthlyIncome.value).toBe(
      LEGACY.childBenefit.bonusMinMonthlyIncome.value,
    );
    expect(CZ_2026.averageWageMonthly.value).toBe(LEGACY.averageWageMonthly.value);
    expect(CZ_2026.minimumWageMonthly.value).toBe(LEGACY.minimumWageMonthly.value);
    expect(CZ_2026.minimumWageHourly.value).toBe(LEGACY.minimumWageHourly.value);
    expect(CZ_2026.taxYear).toBe(LEGACY.taxYear);
    expect(CZ_2026.effectiveFrom).toBe(LEGACY.effectiveFrom);
    expect(CZ_2026.effectiveTo).toBe(LEGACY.effectiveTo);
  });
});
