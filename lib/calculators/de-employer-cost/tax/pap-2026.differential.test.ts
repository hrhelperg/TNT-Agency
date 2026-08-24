import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { runPap2026, type Pap2026Inputs } from './pap-2026';
import { parsePap, runPap, type PapInputs } from '../reference/pap-interpreter';

/**
 * §42 — differential testing of the tax engine against an INDEPENDENT
 * implementation.
 *
 * The brief is explicit that "a test that imports the same production functions
 * is not independent", and this is the answer to that. `pap-2026.ts` is a hand
 * transcription of the flowchart into readable TypeScript; the reference
 * interpreter never reads the flowchart at all, it executes the published XML.
 * A transcription error — a truncation dropped, a branch inverted, an ELSE
 * attached to the wrong IF, a constant off by one — changes one and cannot
 * change the other.
 *
 * That independence has already earned its keep: building the interpreter
 * surfaced three defects that produced plausible, monotonic, wrong numbers, and
 * the Prüftabellen were what caught them. This test is the standing version of
 * that check, run over an input space far larger than 516 cells.
 *
 * ALL TWELVE OUTPUTS ARE COMPARED, not just the Lohnsteuer. Comparing LSTLZZ
 * alone would leave the Soli, the Kirchensteuer base, the sonstige-Bezüge path
 * and all six DBA values unchecked — and those are the parts a reader is least
 * likely to verify by eye.
 */

const XML = fs.readFileSync(
  path.join(__dirname, '..', '..', '..', '..', 'data/calculators/de-employer-cost/2026/pap/Lohnsteuer2026.xml'),
  'utf8',
);
const doc = parsePap(XML);

const OUTPUTS = [
  'BK', 'BKS', 'LSTLZZ', 'SOLZLZZ', 'SOLZS', 'STS',
  'VFRB', 'VFRBS1', 'VFRBS2', 'WVFRB', 'WVFRBO', 'WVFRBM',
] as const;

/** A deterministic LCG, so a failure is reproducible from the seed alone. */
function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Case = Pap2026Inputs & PapInputs;

function compare(name: string, cases: Case[]) {
  const mismatches: string[] = [];
  for (const c of cases) {
    const mine = runPap2026(c as Pap2026Inputs).outputs;
    const theirs = runPap(doc, c as PapInputs).outputs;
    for (const key of OUTPUTS) {
      // compareTo, not string equality: BigDecimal carries scale, and 0 vs 0.00
      // is the same number. A scale difference is not a defect in the tax.
      if (mine[key].compareTo(theirs[key]) !== 0) {
        mismatches.push(
          `${key}: mine=${mine[key].toString()} ref=${theirs[key].toString()} for ${JSON.stringify(c)}`,
        );
        if (mismatches.length > 5) break;
      }
    }
    if (mismatches.length > 5) break;
  }
  expect(mismatches, `${name}\n${mismatches.join('\n')}`).toEqual([]);
}

describe('§42 production engine ≡ XML interpreter', () => {
  it('systematic grid: every Steuerklasse × period × insurance combination', () => {
    const cases: Case[] = [];
    for (const STKL of [1, 2, 3, 4, 5, 6]) {
      for (const LZZ of [1, 2, 3, 4]) {
        for (const [KRV, ALV, PKV] of [
          [0, 0, 0], [1, 1, 1], [0, 1, 0], [1, 0, 0], [0, 0, 1], [1, 1, 2],
        ]) {
          for (const RE4 of [0, 1, 50_000, 250_000, 500_000, 1_000_000, 2_500_000, 10_000_000]) {
            cases.push({
              RE4, STKL, LZZ, KRV, ALV, PKV,
              KVZ: '2.90',
              PKPV: PKV > 0 ? 30_000 : 0,
              PVZ: STKL === 2 ? 0 : 1,
              R: 1,
            });
          }
        }
      }
    }
    compare(`grid (${cases.length} cases)`, cases);
  });

  it('the Pflegeversicherung flags: Sachsen, childless, and up to four Abschläge', () => {
    const cases: Case[] = [];
    for (const PVS of [0, 1]) {
      for (const PVZ of [0, 1]) {
        for (const PVA of [0, 1, 2, 3, 4]) {
          for (const RE4 of [200_000, 500_000, 3_000_000, 9_000_000]) {
            for (const STKL of [1, 3, 5]) {
              cases.push({ RE4, STKL, LZZ: 2, PVS, PVZ, PVA, KVZ: '2.90', R: 1 });
            }
          }
        }
      }
    }
    compare(`Pflegeversicherung (${cases.length} cases)`, cases);
  });

  it('Kinderfreibeträge, including halves', () => {
    const cases: Case[] = [];
    for (const ZKF of ['0', '0.5', '1', '1.5', '2', '2.5', '3', '4']) {
      for (const STKL of [1, 2, 3, 4, 5, 6]) {
        for (const RE4 of [150_000, 400_000, 800_000, 2_000_000]) {
          cases.push({ RE4, STKL, LZZ: 2, ZKF, KVZ: '2.90', PVZ: 1, R: 1 });
        }
      }
    }
    compare(`ZKF (${cases.length} cases)`, cases);
  });

  it('Versorgungsbezüge across every cohort year and both period shapes', () => {
    const cases: Case[] = [];
    for (const VJAHR of [1995, 2005, 2006, 2010, 2020, 2026, 2040, 2057, 2058, 2080]) {
      for (const ZMVB of [0, 1, 6, 12]) {
        for (const LZZ of [1, 2]) {
          cases.push({
            RE4: 400_000, VBEZ: 150_000, VBEZM: 150_000, VBEZS: 20_000,
            VJAHR, ZMVB, LZZ, STKL: 1, KVZ: '2.90', PVZ: 1, R: 1,
          });
        }
      }
    }
    compare(`Versorgungsbezüge (${cases.length} cases)`, cases);
  });

  it('Altersentlastungsbetrag across every cohort year', () => {
    const cases: Case[] = [];
    for (const AJAHR of [1995, 2005, 2006, 2015, 2026, 2057, 2058, 2090]) {
      for (const ALTER1 of [0, 1]) {
        for (const RE4 of [100_000, 500_000, 2_000_000]) {
          cases.push({ RE4, ALTER1, AJAHR, STKL: 1, LZZ: 2, KVZ: '2.90', PVZ: 1, R: 1 });
        }
      }
    }
    compare(`Altersentlastung (${cases.length} cases)`, cases);
  });

  it('sonstige Bezüge, including the negative-STS offset path', () => {
    const cases: Case[] = [];
    for (const SONSTB of [0, 100_000, 500_000, 5_000_000]) {
      for (const MBV of [0, 200_000]) {
        for (const JRE4 of [0, 3_000_000, 6_000_000]) {
          for (const STKL of [1, 3, 5, 6]) {
            for (const R of [0, 1]) {
              cases.push({
                RE4: 500_000, LZZ: 2, STKL, SONSTB, MBV, JRE4, R,
                KVZ: '2.90', PVZ: 1,
              });
            }
          }
        }
      }
    }
    compare(`sonstige Bezüge (${cases.length} cases)`, cases);
  });

  it('the Faktorverfahren', () => {
    const cases: Case[] = [];
    for (const f of [0.5, 0.75, 0.9, 0.999, 1]) {
      for (const af of [0, 1]) {
        for (const RE4 of [300_000, 700_000, 3_000_000]) {
          cases.push({ RE4, af, f, STKL: 4, LZZ: 2, KVZ: '2.90', PVZ: 1, R: 1 });
        }
      }
    }
    compare(`Faktorverfahren (${cases.length} cases)`, cases);
  });

  it('Freibeträge and Hinzurechnungsbeträge from ELStAM', () => {
    const cases: Case[] = [];
    for (const LZZFREIB of [0, 10_000, 100_000, 900_000]) {
      for (const LZZHINZU of [0, 5_000, 50_000]) {
        for (const STKL of [1, 3, 5]) {
          cases.push({
            RE4: 400_000, LZZ: 2, STKL, LZZFREIB, LZZHINZU,
            JFREIB: LZZFREIB * 12, JHINZU: LZZHINZU * 12,
            KVZ: '2.90', PVZ: 1, R: 1,
          });
        }
      }
    }
    compare(`Freibeträge (${cases.length} cases)`, cases);
  });

  it('randomised sweep of the whole input space', () => {
    const rnd = lcg(20260101);
    const pick = <T,>(xs: readonly T[]) => xs[Math.floor(rnd() * xs.length)];
    const cases: Case[] = [];
    for (let i = 0; i < 4000; i++) {
      const PKV = pick([0, 0, 0, 1, 2]);
      cases.push({
        RE4: Math.floor(rnd() * 2_000_000),
        STKL: pick([1, 2, 3, 4, 5, 6]),
        LZZ: pick([1, 2, 3, 4]),
        KRV: pick([0, 1]),
        ALV: pick([0, 1]),
        PKV,
        PKPV: PKV > 0 ? Math.floor(rnd() * 80_000) : 0,
        PKPVAGZ: PKV > 0 ? Math.floor(rnd() * 40_000) : 0,
        KVZ: pick(['0', '1.70', '2.90', '3.55', '4.40']),
        PVS: pick([0, 1]),
        PVZ: pick([0, 1]),
        PVA: pick([0, 1, 2, 3, 4]),
        ZKF: pick(['0', '0.5', '1', '2']),
        R: pick([0, 1]),
        ALTER1: pick([0, 1]),
        AJAHR: pick([2005, 2020, 2060]),
        VBEZ: pick([0, 0, 50_000]),
        VBEZM: pick([0, 50_000]),
        VBEZS: pick([0, 10_000]),
        VJAHR: pick([2004, 2015, 2059]),
        ZMVB: pick([0, 3, 12]),
        SONSTB: pick([0, 0, 200_000, 2_000_000]),
        SONSTENT: pick([0, 50_000]),
        JRE4: pick([0, 2_400_000]),
        JRE4ENT: pick([0, 100_000]),
        JVBEZ: pick([0, 300_000]),
        VBS: pick([0, 40_000]),
        STERBE: pick([0, 100_000]),
        MBV: pick([0, 150_000]),
        LZZFREIB: pick([0, 20_000]),
        LZZHINZU: pick([0, 10_000]),
        JFREIB: pick([0, 240_000]),
        JHINZU: pick([0, 120_000]),
        af: pick([0, 1]),
        f: pick([0.8, 1]),
      });
    }
    compare('randomised sweep (4000 cases, seed 20260101)', cases);
  });
});
