import { describe, it, expect } from 'vitest';
import {
  ADDITIONAL_COSTS,
  EMPTY_ADDITIONAL_COSTS,
  additionalCostDefinition,
  calculateAdditionalCosts,
  type AdditionalCostInput,
  type AdditionalCostKey,
} from './additional-costs';
import { toCzkNumber } from '../../payroll/money';

function costs(overrides: Partial<Record<AdditionalCostKey, number>> = {}): AdditionalCostInput {
  return { ...EMPTY_ADDITIONAL_COSTS, ...overrides };
}

const czkOf = (h: number) => toCzkNumber(h as never);

describe('catalogue integrity', () => {
  it('has no duplicate keys', () => {
    const keys = ADDITIONAL_COSTS.map((d) => d.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('carries a label in all three locales for every item', () => {
    for (const d of ADDITIONAL_COSTS) {
      expect(d.labelCs.length, `${d.key} cs`).toBeGreaterThan(0);
      expect(d.labelEn.length, `${d.key} en`).toBeGreaterThan(0);
      expect(d.labelDe.length, `${d.key} de`).toBeGreaterThan(0);
    }
  });

  // §18: no benefit may be silently treated as tax-exempt. V1 calculates no
  // benefit tax treatment at all, and this asserts the whole catalogue says so.
  it('declares every item as tax-treatment-not-calculated', () => {
    for (const d of ADDITIONAL_COSTS) {
      expect(d.taxTreatment, d.key).toBe('not_calculated');
    }
  });

  it('exposes a definition for every catalogue key and throws on an unknown one', () => {
    for (const d of ADDITIONAL_COSTS) {
      expect(additionalCostDefinition(d.key).key).toBe(d.key);
    }
    expect(() => additionalCostDefinition('nope' as AdditionalCostKey)).toThrow(/unknown cost key/);
  });
});

// §17: "Do NOT assign fake default prices. 0 by default."
describe('no invented defaults', () => {
  it('defaults every catalogue item to zero', () => {
    for (const d of ADDITIONAL_COSTS) {
      expect(EMPTY_ADDITIONAL_COSTS[d.key], d.key).toBe(0);
    }
  });

  it('covers every catalogue key — a new item cannot be left out of the default', () => {
    expect(Object.keys(EMPTY_ADDITIONAL_COSTS).sort()).toEqual(
      ADDITIONAL_COSTS.map((d) => d.key).sort(),
    );
  });

  it('produces an empty, all-zero result from the default input', () => {
    const r = calculateAdditionalCosts(EMPTY_ADDITIONAL_COSTS);
    expect(r.isEmpty).toBe(true);
    expect(r.lines).toHaveLength(0);
    expect(czkOf(r.monthlyRecurring)).toBe(0);
    expect(czkOf(r.annualTotal)).toBe(0);
    expect(czkOf(r.monthlyCashCost)).toBe(0);
  });
});

describe('periodicity is respected — §22', () => {
  it('does not multiply a one-off cost by twelve', () => {
    const r = calculateAdditionalCosts(costs({ recruitment: 30_000 }));
    expect(czkOf(r.oneOffTotal)).toBe(30_000);
    expect(czkOf(r.annualTotal)).toBe(30_000);
    // A one-off cost is not a monthly cash cost.
    expect(czkOf(r.monthlyCashCost)).toBe(0);
    expect(czkOf(r.monthlyRecurring)).toBe(0);
  });

  it('multiplies a monthly cost by twelve and nothing else', () => {
    const r = calculateAdditionalCosts(costs({ mealContribution: 1_500 }));
    expect(czkOf(r.monthlyRecurring)).toBe(1_500);
    expect(czkOf(r.annualTotal)).toBe(18_000);
    expect(czkOf(r.monthlyCashCost)).toBe(1_500);
  });

  it('counts an annual-only cost once per year, not once per month', () => {
    const r = calculateAdditionalCosts(costs({ occupationalMedical: 1_200 }));
    expect(czkOf(r.annualOnly)).toBe(1_200);
    expect(czkOf(r.annualTotal)).toBe(1_200);
    expect(czkOf(r.monthlyCashCost)).toBe(0);
  });

  it('builds the annual total from each periodicity, not by scaling the monthly view', () => {
    const r = calculateAdditionalCosts(
      costs({
        mealContribution: 1_500, // monthly  → 18 000
        transport: 500, //          monthly  →  6 000
        occupationalMedical: 1_200, //  annual   →  1 200
        trainingCertification: 8_000, // annual   →  8 000
        recruitment: 30_000, //     one-off  → 30 000
        onboarding: 12_000, //      one-off  → 12 000
      }),
    );
    expect(czkOf(r.monthlyRecurring)).toBe(2_000);
    expect(czkOf(r.annualOnly)).toBe(9_200);
    expect(czkOf(r.oneOffTotal)).toBe(42_000);
    expect(czkOf(r.annualTotal)).toBe(2_000 * 12 + 9_200 + 42_000); // 75 200
    // The failure this guards: annualTotal === monthlyRecurring * 12 would be 24 000.
    expect(czkOf(r.annualTotal)).not.toBe(czkOf(r.monthlyRecurring) * 12);
  });

  it('keeps the allocated run-rate distinct from the monthly cash cost', () => {
    const r = calculateAdditionalCosts(costs({ mealContribution: 1_000, recruitment: 24_000 }));
    expect(czkOf(r.monthlyCashCost)).toBe(1_000);
    // (1 000 × 12 + 24 000) / 12 = 3 000
    expect(czkOf(r.monthlyAllocatedRunRate)).toBe(3_000);
    expect(czkOf(r.monthlyAllocatedRunRate)).not.toBe(czkOf(r.monthlyCashCost));
  });
});

describe('lines', () => {
  it('omits zero rows and keeps catalogue order', () => {
    const r = calculateAdditionalCosts(costs({ recruitment: 10_000, mealContribution: 1_000 }));
    expect(r.lines.map((l) => l.key)).toEqual(['mealContribution', 'recruitment']);
    expect(r.isEmpty).toBe(false);
  });

  it('carries the definition on each line so the UI never re-derives it', () => {
    const r = calculateAdditionalCosts(costs({ ppeWorkwear: 300 }));
    expect(r.lines[0].definition.periodicity).toBe('monthly');
    expect(r.lines[0].definition.taxTreatment).toBe('not_calculated');
  });
});

describe('input validation', () => {
  it('rejects a negative amount rather than netting it off the employer total', () => {
    expect(() => calculateAdditionalCosts(costs({ recruitment: -1 }))).toThrow(/must not be negative/);
  });

  it('rejects a non-finite amount', () => {
    expect(() => calculateAdditionalCosts(costs({ transport: Number.NaN }))).toThrow(/finite/);
    expect(() => calculateAdditionalCosts(costs({ transport: Number.POSITIVE_INFINITY }))).toThrow(/finite/);
  });
});

describe('determinism', () => {
  it('returns the same totals for the same input', () => {
    const i = costs({ mealContribution: 1_234, recruitment: 5_678, occupationalMedical: 900 });
    const a = calculateAdditionalCosts(i);
    const b = calculateAdditionalCosts(i);
    expect(a.annualTotal).toBe(b.annualTotal);
    expect(a.monthlyCashCost).toBe(b.monthlyCashCost);
  });

  // Exact integer haléře arithmetic: a koruna amount can never produce a
  // fractional total, however many items are summed.
  it('keeps totals exact across many items', () => {
    const all = ADDITIONAL_COSTS.reduce(
      (acc, d, idx) => ({ ...acc, [d.key]: 1_00 + idx }),
      {} as Record<AdditionalCostKey, number>,
    );
    const r = calculateAdditionalCosts(all);
    expect(Number.isInteger(r.annualTotal)).toBe(true);
    expect(Number.isInteger(czkOf(r.annualTotal))).toBe(true);
  });
});
