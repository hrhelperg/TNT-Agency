import { describe, it, expect } from 'vitest';
import {
  czk,
  halere,
  toCzkNumber,
  add,
  subtract,
  sum,
  percentOf,
  fractionOf,
  multiplyByInteger,
  multiplyByQuantity,
  percentOfRoundedToCzk,
  roundToCzk,
  roundToHundredCzk,
  clampNonNegative,
  maxHalere,
  minHalere,
  type Halere,
} from './money';

describe('money: construction', () => {
  it('stores koruna as exact haléře', () => {
    expect(czk(1234.56)).toBe(123456);
    expect(czk(134.4)).toBe(13440);
    expect(czk(0)).toBe(0);
    expect(toCzkNumber(czk(1234.56))).toBe(1234.56);
  });

  it('rejects non-finite input', () => {
    expect(() => czk(Infinity)).toThrow();
    expect(() => czk(NaN)).toThrow();
    expect(() => halere(1.5)).toThrow();
  });
});

describe('money: additive ops', () => {
  it('adds and subtracts exactly', () => {
    expect(add(czk(100.1), czk(0.2))).toBe(czk(100.3));
    expect(subtract(czk(100), czk(30.5))).toBe(czk(69.5));
    expect(sum([czk(10.1), czk(20.2), czk(30.3)])).toBe(czk(60.6));
  });

  it('no floating-point drift on classic 0.1 + 0.2', () => {
    // 0.1 + 0.2 !== 0.3 in IEEE754; in haléře it is exact.
    expect(add(czk(0.1), czk(0.2))).toBe(30);
    expect(toCzkNumber(add(czk(0.1), czk(0.2)))).toBe(0.3);
  });

  it('clampNonNegative floors at zero', () => {
    expect(clampNonNegative(czk(-5))).toBe(0);
    expect(clampNonNegative(czk(5))).toBe(czk(5));
  });

  it('min/max', () => {
    expect(maxHalere(czk(5), czk(9))).toBe(czk(9));
    expect(minHalere(czk(5), czk(9))).toBe(czk(5));
  });
});

describe('money: percentOf with statutory-style rounding', () => {
  it('7.1% of 30000 Kč nearest', () => {
    // 7.1% of 30000 = 2130.00 exactly
    expect(percentOf(czk(30000), 7.1, 'nearest')).toBe(czk(2130));
  });

  it('rounds up to whole koruna (social/health rule)', () => {
    // 7.1% of 23456 = 1665.376 Kč -> round premium UP to whole CZK = 1666
    const raw = percentOf(czk(23456), 7.1, 'nearest'); // 166538 haléře
    expect(roundToCzk(raw, 'up')).toBe(czk(1666));
  });

  it('13.5% of min base 22400 = 3024 exactly', () => {
    expect(roundToCzk(percentOf(czk(22400), 13.5, 'nearest'), 'up')).toBe(czk(3024));
  });

  it('handles a decimal custom percentage exactly (12.5%)', () => {
    expect(percentOf(czk(48000), 12.5, 'nearest')).toBe(czk(6000));
  });

  it('is exact for the annual maximum assessment base (no overflow)', () => {
    // 24.8% of 2 350 416 Kč = 582 903.168 Kč
    const base = czk(2_350_416);
    const raw = percentOf(base, 24.8, 'nearest');
    expect(toCzkNumber(roundToCzk(raw, 'up'))).toBe(582_904);
  });
});

describe('money: fractionOf', () => {
  it('one third of a rounded total', () => {
    // Health: total 13.5% rounded up, employee share = 1/3
    const total = roundToCzk(percentOf(czk(37123), 13.5, 'nearest'), 'up'); // 5012 Kč (5011.605 -> up)
    expect(toCzkNumber(total)).toBe(5012);
    // employee third, rounded up
    const employee = roundToCzk(fractionOf(total, 1, 3, 'nearest'), 'up');
    expect(toCzkNumber(employee)).toBe(1671); // 5012/3 = 1670.67 -> up 1671
  });
});

describe('money: scaling', () => {
  it('multiplyByInteger for workers/hours', () => {
    expect(multiplyByInteger(czk(48967), 100)).toBe(czk(4_896_700));
  });

  it('multiplyByQuantity for fractional hours', () => {
    // 134.40 Kč/h * 162.5 h = 21840.00 Kč
    expect(toCzkNumber(multiplyByQuantity(czk(134.4), 162.5, 2, 'nearest'))).toBe(21840);
  });

  it('multiplyByQuantity rounds to haléře deterministically', () => {
    // 100.00 Kč * 0.333 = 33.30 Kč
    expect(toCzkNumber(multiplyByQuantity(czk(100), 0.333, 3, 'nearest'))).toBe(33.3);
  });
});

describe('money: rounding rules', () => {
  it('roundToCzk up/down/nearest', () => {
    expect(toCzkNumber(roundToCzk(czk(1665.376), 'up'))).toBe(1666);
    expect(toCzkNumber(roundToCzk(czk(1665.376), 'down'))).toBe(1665);
    expect(toCzkNumber(roundToCzk(czk(1665.5), 'nearest'))).toBe(1666);
    expect(toCzkNumber(roundToCzk(czk(1665.49), 'nearest'))).toBe(1665);
  });

  it('roundToHundredCzk up (monthly tax base rule)', () => {
    // 27 450,40 Kč base -> hundreds up = 27 500
    expect(toCzkNumber(roundToHundredCzk(czk(27450.4), 'up'))).toBe(27500);
    // exact hundred stays
    expect(toCzkNumber(roundToHundredCzk(czk(27500), 'up'))).toBe(27500);
  });

  it('exact multiples are not bumped', () => {
    expect(roundToCzk(czk(1666), 'up')).toBe(czk(1666));
  });
});

describe('money: large-value boundary safety', () => {
  it('does not lose precision near the annual max base', () => {
    const base: Halere = czk(2_350_416);
    // 23% of base — biggest realistic multiply
    const v = percentOf(base, 23, 'nearest');
    expect(Number.isSafeInteger(v)).toBe(true);
    expect(toCzkNumber(v)).toBeCloseTo(540595.68, 2);
  });
});

// ── percentOfRoundedToCzk — statutory premium rounding in one step ───────────
//
// ČSSZ requires full-precision computation followed by a single round up to
// whole koruny. These pin the difference from the two-step form, which is one
// koruna low on 782 realistic assessment bases at the 7,1 % rate.
describe('percentOfRoundedToCzk', () => {
  it('reproduces the ČSSZ rule on the smallest failing base', () => {
    // 4 662 × 7,1 % = 331,002 Kč → up to whole koruny → 332 Kč
    expect(toCzkNumber(percentOfRoundedToCzk(czk(4_662), 7.1, 'up'))).toBe(332);
  });

  it('differs from percentOf-then-roundToCzk exactly where the fraction is sub-haléř', () => {
    const twoStep = roundToCzk(percentOf(czk(4_662), 7.1, 'nearest'), 'up');
    expect(toCzkNumber(twoStep)).toBe(331); // the defect, pinned
    expect(toCzkNumber(percentOfRoundedToCzk(czk(4_662), 7.1, 'up'))).toBe(332);
  });

  it('agrees with the two-step form when the product is an exact haléř', () => {
    // 4 000 × 7,1 % = 284,00 Kč exactly — no fraction for either form to lose.
    expect(toCzkNumber(percentOfRoundedToCzk(czk(4_000), 7.1, 'up'))).toBe(284);
    expect(toCzkNumber(roundToCzk(percentOf(czk(4_000), 7.1, 'nearest'), 'up'))).toBe(284);
  });

  it('always rounds up, never to nearest', () => {
    // 10 000 × 7,1 % = 710,00 → 710; 10 001 × 7,1 % = 710,071 → 711
    expect(toCzkNumber(percentOfRoundedToCzk(czk(10_000), 7.1, 'up'))).toBe(710);
    expect(toCzkNumber(percentOfRoundedToCzk(czk(10_001), 7.1, 'up'))).toBe(711);
  });

  it('handles the standard 2026 rates on a canonical base', () => {
    const base = czk(40_000);
    expect(toCzkNumber(percentOfRoundedToCzk(base, 7.1, 'up'))).toBe(2_840);
    expect(toCzkNumber(percentOfRoundedToCzk(base, 24.8, 'up'))).toBe(9_920);
    expect(toCzkNumber(percentOfRoundedToCzk(base, 4.5, 'up'))).toBe(1_800);
    expect(toCzkNumber(percentOfRoundedToCzk(base, 9, 'up'))).toBe(3_600);
    expect(toCzkNumber(percentOfRoundedToCzk(base, 13.5, 'up'))).toBe(5_400);
  });

  it('returns a whole number of koruny — never a haléř remainder', () => {
    for (const base of [1, 999, 4_662, 22_400, 48_967, 146_901, 2_350_416]) {
      const out = percentOfRoundedToCzk(czk(base), 7.1, 'up');
      expect(out % 100, `base ${base}`).toBe(0);
    }
  });

  it('is exact at the annual maximum assessment base', () => {
    // 2 350 416 × 7,1 % = 166 879,536 → 166 880
    expect(toCzkNumber(percentOfRoundedToCzk(czk(2_350_416), 7.1, 'up'))).toBe(166_880);
    // 2 350 416 × 24,8 % = 582 903,168 → 582 904
    expect(toCzkNumber(percentOfRoundedToCzk(czk(2_350_416), 24.8, 'up'))).toBe(582_904);
  });

  it('rejects a non-finite percent', () => {
    expect(() => percentOfRoundedToCzk(czk(100), Number.NaN, 'up')).toThrow(RangeError);
  });

  it('returns zero for a zero base', () => {
    expect(percentOfRoundedToCzk(czk(0), 24.8, 'up')).toBe(0);
  });
});
