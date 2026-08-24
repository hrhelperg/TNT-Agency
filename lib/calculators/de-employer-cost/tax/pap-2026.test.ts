import { describe, it, expect } from 'vitest';
import { runPap2026, type Pap2026Inputs } from './pap-2026';
import {
  PRUEFTABELLE_ALLGEMEIN,
  PRUEFTABELLE_BESONDERS,
  BESONDERS_PKPV_CENT,
} from '../../../../data/calculators/de-employer-cost/2026/pap/prueftabellen';

/**
 * The production engine against the published outputs of the announced
 * algorithm. Same 516 cells the reference interpreter is held to — if the two
 * implementations were checked against different things, agreeing would mean
 * less than it does.
 */

const annualTaxEuro = (inputs: Pap2026Inputs): number => {
  const cents = runPap2026({ LZZ: 1, ...inputs }).outputs.LSTLZZ;
  expect(Number(cents.longValue()) % 100).toBe(0);
  return Number(cents.longValue()) / 100;
};

describe('Anlage 1 page 39 — allgemeine maschinelle Jahreslohnsteuer', () => {
  for (const { brutto, lohnsteuer } of PRUEFTABELLE_ALLGEMEIN) {
    it(`${brutto.toLocaleString('de-DE')} EUR`, () => {
      const got = [1, 2, 3, 4, 5, 6].map((STKL) =>
        annualTaxEuro({
          RE4: brutto * 100,
          STKL,
          ALV: 0,
          KRV: 0,
          PKV: 0,
          KVZ: '2.90',
          PVZ: STKL === 2 ? 0 : 1,
        }),
      );
      expect(got).toEqual([...lohnsteuer]);
    });
  }
});

describe('Anlage 1 page 40 — besondere maschinelle Jahreslohnsteuer', () => {
  for (const { brutto, lohnsteuer } of PRUEFTABELLE_BESONDERS) {
    it(`${brutto.toLocaleString('de-DE')} EUR`, () => {
      const got = [1, 2, 3, 4, 5, 6].map((STKL) =>
        annualTaxEuro({
          RE4: brutto * 100,
          STKL,
          ALV: 1,
          KRV: 1,
          PKV: 1,
          PKPV: BESONDERS_PKPV_CENT[STKL],
          PVZ: STKL === 2 ? 0 : 1,
        }),
      );
      expect(got).toEqual([...lohnsteuer]);
    });
  }
});

describe('the shape of the algorithm, pinned', () => {
  // These are not extra coverage — each one is a place where a transcription
  // can go wrong in a way the Prüftabellen do NOT catch, because the tables
  // hold ZKF = 0, LZZ = 1, R = 0 and no Versorgungsbezüge throughout.

  it('the Kinderfreibetrag lowers the Soli base but not the Lohnsteuer', () => {
    const base = { RE4: 6_000_000, STKL: 1, KVZ: '2.90', PVZ: 1, R: 1 } as const;
    const without = runPap2026({ LZZ: 1, ...base }).outputs;
    const withChild = runPap2026({ LZZ: 1, ...base, ZKF: 1 }).outputs;
    expect(withChild.LSTLZZ.toString()).toBe(without.LSTLZZ.toString());
    expect(withChild.BK.compareTo(without.BK)).toBe(-1);
  });

  it('returns a Kirchensteuer BASE, never the tax — and zero without a Religion', () => {
    const base = { LZZ: 2 as const, RE4: 500_000, STKL: 1, KVZ: '2.90', PVZ: 1 };
    expect(runPap2026({ ...base, R: 0 }).outputs.BK.toString()).toBe('0');
    const withR = runPap2026({ ...base, R: 1 }).outputs;
    // The base is the Bemessungsgrundlage, i.e. of the same order as the tax
    // itself — not 8 % or 9 % of it. A transcription that applied a Land rate
    // here would produce something an order of magnitude smaller.
    expect(withR.BK.compareTo(withR.LSTLZZ)).toBe(0);
  });

  it('the monthly period is the annual figure divided by twelve, truncated', () => {
    const annual = runPap2026({ LZZ: 1, RE4: 6_000_000, STKL: 1, KVZ: '2.90', PVZ: 1 });
    const monthly = runPap2026({ LZZ: 2, RE4: 500_000, STKL: 1, KVZ: '2.90', PVZ: 1 });
    const expected = Number(annual.outputs.LSTLZZ.longValue()) / 12;
    expect(Number(monthly.outputs.LSTLZZ.longValue())).toBe(Math.trunc(expected));
  });

  it('a week is 7/360 of a year, not 1/52', () => {
    // Getting this wrong changes weekly payroll by about 0,4 %, which looks
    // like a rounding difference rather than a bug.
    const weekly = runPap2026({ LZZ: 3, RE4: 100_000, STKL: 1, KVZ: '2.90', PVZ: 1 });
    const annual = runPap2026({ LZZ: 1, RE4: (100_000 * 360) / 7, STKL: 1, KVZ: '2.90', PVZ: 1 });
    const expected = (Number(annual.outputs.LSTLZZ.longValue()) * 7) / 360;
    expect(Number(weekly.outputs.LSTLZZ.longValue())).toBe(Math.trunc(expected));
  });

  it('the childless surcharge and the multi-child discount are exclusive', () => {
    // PVA is the ELSE of PVZ == 1. Someone flagged childless cannot also
    // receive an Abschlag for a second child, and an implementation that
    // applies both silently enlarges the Vorsorgepauschale.
    const base = { LZZ: 1 as const, RE4: 5_000_000, STKL: 1, KVZ: '2.90' };
    const childless = runPap2026({ ...base, PVZ: 1, PVA: 0 });
    const childlessWithPva = runPap2026({ ...base, PVZ: 1, PVA: 4 });
    expect(childlessWithPva.outputs.LSTLZZ.toString()).toBe(childless.outputs.LSTLZZ.toString());

    const withChildren = runPap2026({ ...base, PVZ: 0, PVA: 4 });
    expect(withChildren.outputs.LSTLZZ.compareTo(childless.outputs.LSTLZZ)).toBe(1);
  });

  it('ALV is read independently of KRV, and only where it can bind', () => {
    // The 2026 split, tested on its actual mechanism rather than one salary.
    //
    // ALV decides whether the Höchstbetrag construction (MVSPHB) runs at all.
    // That construction can only ever RAISE the Vorsorgepauschale, and it is
    // capped at 1 900 EUR, so above roughly 17 500 EUR a year the ordinary
    // construction already exceeds it and the flag makes no difference. Asserting
    // a difference at a comfortable salary therefore fails against a correct
    // engine — which is how this test was first written, and wrong.
    //
    // Steuerklasse VI is the control: MVSPHB is skipped there whatever ALV says,
    // so it must show no difference anywhere.
    const scan = (STKL: number) => {
      const hits: number[] = [];
      for (let eur = 1000; eur <= 40_000; eur += 100) {
        const base = { LZZ: 1 as const, RE4: eur * 100, STKL, KVZ: '2.90', PVZ: 1, PKV: 0, KRV: 0 };
        const a = runPap2026({ ...base, ALV: 0 }).outputs.LSTLZZ.toString();
        const b = runPap2026({ ...base, ALV: 1 }).outputs.LSTLZZ.toString();
        if (a !== b) hits.push(eur);
      }
      return hits;
    };

    // Steuerklasse V is taxed from the first euro, so the whole band shows.
    const v = scan(5);
    expect(v.length).toBeGreaterThan(100);
    expect(Math.max(...v)).toBeLessThan(17_500);

    // Steuerklasse I only differs where it is taxed at all — the top of the band.
    expect(scan(1)).toEqual([17_100, 17_200, 17_300, 17_400]);

    // Steuerklasse VI: never.
    expect(scan(6)).toEqual([]);
  });

  it('Steuerklasse V never falls below the 14 % floor', () => {
    // UP5_6's MIST. Below the Grundfreibetrag the tariff difference is zero, so
    // the floor is the only thing producing tax at all — and it is exactly the
    // branch a dropped ELSE removes.
    const r = runPap2026({ LZZ: 1, RE4: 500_000, STKL: 5, ALV: 1, KRV: 1, PKV: 1, PVZ: 1 });
    expect(Number(r.outputs.LSTLZZ.longValue())).toBeGreaterThan(0);
  });

  it('the Solidaritätszuschlag is zero below the Freigrenze and capped by the Milderungszone', () => {
    const mk = (annual: number) =>
      runPap2026({ LZZ: 1, RE4: annual * 100, STKL: 1, KVZ: '2.90', PVZ: 1 }).outputs;
    expect(Number(mk(60_000).SOLZLZZ.longValue())).toBe(0);
    const high = mk(120_000);
    const solz = Number(high.SOLZLZZ.longValue());
    const lst = Number(high.LSTLZZ.longValue());
    expect(solz).toBeGreaterThan(0);
    // Inside the Milderungszone the charge is below the full 5,5 %.
    expect(solz).toBeLessThan(lst * 0.055);
  });

  it('splitting doubles the Soli-Freigrenze too', () => {
    // SOLZFREI is multiplied by KZTAB, so Steuerklasse III gets twice the
    // threshold. Missing that charges Soli to couples who owe none.
    const iii = runPap2026({ LZZ: 1, RE4: 7_000_000, STKL: 3, KVZ: '2.90', PVZ: 1 });
    expect(Number(iii.outputs.SOLZLZZ.longValue())).toBe(0);
  });
});
