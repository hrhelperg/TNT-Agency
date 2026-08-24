import { describe, it, expect } from 'vitest';
import { DISPLAY_BASIS, DISPLAY_CENT, formatCentNumber } from './display-facts';
import { DE_RULES_2026 as R } from '../../../data/calculators/de-employer-cost/2026/rules';

/**
 * The bootstrap's plain numbers must equal the registry's bigints.
 *
 * `display-facts.ts` exists because a `100n` anywhere in the bootstrap chunk
 * would make it unparseable on the browsers that chunk is there to serve. The
 * price is a duplicated set of constants, and a duplicated constant that drifts
 * is worse than no constant at all — the methodology panel would quietly
 * disagree with the engine that produced the figures beside it.
 *
 * So this is the only thing keeping them honest, and it compares them as
 * bigints rather than through a number conversion, so a value beyond 2^53 could
 * not slip through by rounding to the same double.
 */
describe('the display facts equal the registry', () => {
  const CASES: Array<[string, number, bigint]> = [
    ['health ceiling, monthly', DISPLAY_CENT.healthCeilingMonthly, R.health.monthlyCeilingCent.value],
    ['pension ceiling, monthly', DISPLAY_CENT.pensionCeilingMonthly, R.pension.monthlyCeilingCent.value],
    ['Jahresarbeitsentgeltgrenze, annual', DISPLAY_CENT.insuranceThresholdAnnual, R.scope.insuranceObligationAnnualCent.value],
    ['Geringfügigkeitsgrenze, monthly', DISPLAY_CENT.minijobMonthly, R.scope.minijobMonthlyCent.value],
    ['Übergangsbereich upper, monthly', DISPLAY_CENT.transitionUpperMonthly, R.scope.transitionUpperMonthlyCent.value],
  ];

  for (const [label, shown, registry] of CASES) {
    it(`${label} matches`, () => {
      expect(BigInt(shown), `${label}: panel shows ${shown}, registry holds ${registry}`).toBe(registry);
      // Exactness of the plain-number representation, asserted rather than
      // assumed: every cent value here must be inside the safe integer range.
      expect(Number.isSafeInteger(shown)).toBe(true);
    });
  }

  it('the statutory bases quote the registry, including the ordinance for the care rate', () => {
    expect(DISPLAY_BASIS.pension).toBe(R.pension.totalPercent.legalBasis);
    expect(DISPLAY_BASIS.unemployment).toBe(R.unemployment.totalPercent.legalBasis);
    expect(DISPLAY_BASIS.health).toContain(R.health.generalPercent.legalBasis);
    // The care rate comes from PBAV 2025, not from § 55 Absatz 1, which still
    // says 3,4 % — citing Absatz 1 alone would name the provision that gives
    // the wrong number.
    expect(DISPLAY_BASIS.care).toContain(R.care.basePercent.legalBasis);
    expect(DISPLAY_BASIS.care).toContain('PBAV 2025');
    expect(DISPLAY_BASIS.levies).toContain(R.insolvencyLevy.percent.legalBasis);
  });
});

describe('formatCentNumber matches the bigint formatter it stands in for', () => {
  it('renders the same string in every locale', async () => {
    // Imported lazily so this test file — which the bootstrap chunk's own gate
    // reads — is the only place the two representations meet.
    const { formatEuro, formatEuroWhole } = await import('./formatting');
    for (const locale of ['de', 'en', 'cs'] as const) {
      for (const cent of Object.values(DISPLAY_CENT)) {
        expect(formatCentNumber(cent, locale)).toBe(formatEuro(BigInt(cent), locale));
        expect(formatCentNumber(cent, locale, true)).toBe(formatEuroWhole(BigInt(cent), locale));
      }
    }
  });
});
