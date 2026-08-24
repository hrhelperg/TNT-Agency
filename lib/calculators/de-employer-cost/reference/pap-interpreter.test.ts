import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { parsePap, runPap, type PapDocument } from './pap-interpreter';
import {
  PRUEFTABELLE_ALLGEMEIN,
  PRUEFTABELLE_BESONDERS,
  BESONDERS_PKPV_CENT,
} from '../../../../data/calculators/de-employer-cost/2026/pap/prueftabellen';
import { PAP_2026_PROVENANCE } from '../../../../data/calculators/de-employer-cost/2026/pap/provenance';
import crypto from 'node:crypto';

/**
 * Does the interpreter actually execute the announced algorithm?
 *
 * This is the load-bearing test of the whole German tax path. The interpreter is
 * the independent oracle that §42 requires, and an oracle that is wrong is worse
 * than no oracle at all: it certifies the production engine's mistakes. So it is
 * not checked against the production engine, or against my reading of the
 * flowchart, or against a third-party calculator. It is checked against the 516
 * figures BMF published for the purpose.
 */

const XML_PATH = 'data/calculators/de-employer-cost/2026/pap/Lohnsteuer2026.xml';
const ROOT = path.join(__dirname, '..', '..', '..', '..');
const xml = fs.readFileSync(path.join(ROOT, XML_PATH), 'utf8');

let doc: PapDocument;
const getDoc = () => (doc ??= parsePap(xml));

describe('the vendored XML is the one the provenance record describes', () => {
  // A silent swap of the source document would invalidate every number below
  // while leaving every test green, so the hash is asserted rather than trusted.
  it('hashes to the recorded sha256', () => {
    const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, XML_PATH))).digest('hex');
    expect(hash).toBe(PAP_2026_PROVENANCE.xml.sha256);
  });

  it('declares the recorded name and version', () => {
    expect(getDoc().name).toBe(PAP_2026_PROVENANCE.xml.papName);
    expect(getDoc().version).toBe(PAP_2026_PROVENANCE.xml.version);
  });

  it('defines exactly the 23 recorded subroutines', () => {
    expect([...getDoc().methods.keys()].sort()).toEqual([...PAP_2026_PROVENANCE.methods].sort());
  });

  it('declares ALV — the input 2025 did not have', () => {
    // Guards against a future "cleanup" that drops it as unused, and documents
    // that its absence would silently change every partially-insured case.
    expect(getDoc().inputs.map((i) => i.name)).toContain('ALV');
  });
});

/**
 * Conservation: every statement in the XML survives into the parsed tree.
 *
 * The Prüftabellen catch a dropped branch only if the branch changes one of 516
 * particular numbers. This catches it whatever it does — a silently discarded
 * ELSE, a subroutine whose body failed to parse, an EVAL swallowed by a
 * mis-terminated tag — by counting elements on both sides.
 *
 * Written after exactly that defect: `sectionBody` rejected any ELSE that was
 * not the first one in an IF body, which dropped the ELSE of every IF whose THEN
 * contained a nested IF. The Prüftabellen did catch it, loudly. This makes the
 * next one fail with a message that says what happened rather than "8317 is not
 * 6788".
 */
describe('the parsed tree conserves every statement in the XML', () => {
  const countTags = (re: RegExp) => (xml.match(re) ?? []).length;

  const walk = (stmts: readonly unknown[], acc: { eval: number; execute: number; if: number; else: number }) => {
    for (const s of stmts as Array<{ kind: string; then?: unknown[]; else?: unknown[] }>) {
      if (s.kind === 'eval') acc.eval++;
      else if (s.kind === 'execute') acc.execute++;
      else {
        acc.if++;
        if (s.else!.length > 0) acc.else++;
        walk(s.then!, acc);
        walk(s.else!, acc);
      }
    }
    return acc;
  };

  const parsed = () => {
    const acc = { eval: 0, execute: 0, if: 0, else: 0 };
    walk(getDoc().main, acc);
    for (const body of getDoc().methods.values()) walk(body, acc);
    return acc;
  };

  it('keeps every <EVAL>', () => {
    expect(parsed().eval).toBe(countTags(/<EVAL\b/g));
  });

  it('keeps every <EXECUTE>', () => {
    expect(parsed().execute).toBe(countTags(/<EXECUTE\b/g));
  });

  it('keeps every <IF>', () => {
    expect(parsed().if).toBe(countTags(/<IF\b/g));
  });

  it('keeps every <ELSE> — the one that was actually broken', () => {
    expect(parsed().else).toBe(countTags(/<ELSE\s*>/g));
  });
});

/**
 * LZZ = 1 is the annual Lohnzahlungszeitraum, which is what both tables use, so
 * RE4 is the annual gross in cent and LSTLZZ comes back as annual tax in cent.
 */
const annualTaxEuro = (
  inputs: Record<string, number | string>,
): number => {
  const cents = runPap(getDoc(), { LZZ: 1, ...inputs }).outputs.LSTLZZ;
  // The tables are whole euro and the PAP already truncates to whole euro
  // internally (STS/JBMG), so this division is exact — assert that rather than
  // rounding and hiding a discrepancy.
  expect(Number(cents.longValue()) % 100).toBe(0);
  return Number(cents.longValue()) / 100;
};

describe('Anlage 1 page 39 — allgemeine maschinelle Jahreslohnsteuer', () => {
  for (const { brutto, lohnsteuer } of PRUEFTABELLE_ALLGEMEIN) {
    it(`${brutto.toLocaleString('de-DE')} EUR reproduces all six Steuerklassen`, () => {
      const got = [1, 2, 3, 4, 5, 6].map((stkl) =>
        annualTaxEuro({
          RE4: brutto * 100,
          STKL: stkl,
          ALV: 0,
          KRV: 0,
          PKV: 0,
          KVZ: '2.90',
          // Footnote 2: class II has a child, so no childless surcharge.
          PVZ: stkl === 2 ? 0 : 1,
        }),
      );
      expect(got).toEqual([...lohnsteuer]);
    });
  }
});

describe('Anlage 1 page 40 — besondere maschinelle Jahreslohnsteuer', () => {
  for (const { brutto, lohnsteuer } of PRUEFTABELLE_BESONDERS) {
    it(`${brutto.toLocaleString('de-DE')} EUR reproduces all six Steuerklassen`, () => {
      const got = [1, 2, 3, 4, 5, 6].map((stkl) =>
        annualTaxEuro({
          RE4: brutto * 100,
          STKL: stkl,
          ALV: 1,
          KRV: 1,
          PKV: 1,
          // Monthly, despite every other figure in the table being annual.
          PKPV: BESONDERS_PKPV_CENT[stkl],
          PVZ: stkl === 2 ? 0 : 1,
        }),
      );
      expect(got).toEqual([...lohnsteuer]);
    });
  }
});
