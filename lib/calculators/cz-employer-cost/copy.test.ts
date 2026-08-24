import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  EXACTNESS_NOTICE,
  INPUT_LABELS,
  JURISDICTION_STAMP,
  PAGE_KICKER,
  REQUIRES_INDIVIDUAL_CALCULATION,
  VALIDATION_MESSAGES,
  message,
  type Copy,
} from './copy';
import { ENGINE_NOTES, RESULT_LABELS } from './notes-copy';
import type { CalculatorLocale } from './formatting';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LOCALES: readonly CalculatorLocale[] = ['cs', 'en', 'de'];

const CATALOGUES: ReadonlyArray<[string, Readonly<Record<string, Copy>>]> = [
  ['INPUT_LABELS', INPUT_LABELS],
  ['VALIDATION_MESSAGES', VALIDATION_MESSAGES],
];

const SINGLES: ReadonlyArray<[string, Copy]> = [
  ['JURISDICTION_STAMP', JURISDICTION_STAMP],
  ['PAGE_KICKER', PAGE_KICKER],
  ['EXACTNESS_NOTICE', EXACTNESS_NOTICE],
  ['REQUIRES_INDIVIDUAL_CALCULATION', REQUIRES_INDIVIDUAL_CALCULATION],
];

describe('every string exists in all three locales', () => {
  it('covers every catalogue entry', () => {
    for (const [name, catalogue] of CATALOGUES) {
      for (const [key, entry] of Object.entries(catalogue)) {
        for (const locale of LOCALES) {
          expect(entry[locale], `${name}.${key}.${locale}`).toBeTruthy();
          expect(entry[locale].trim().length, `${name}.${key}.${locale} is blank`).toBeGreaterThan(0);
        }
      }
    }
  });

  it('covers every standalone string', () => {
    for (const [name, entry] of SINGLES) {
      for (const locale of LOCALES) {
        expect(entry[locale], `${name}.${locale}`).toBeTruthy();
      }
    }
  });
});

/**
 * The gate that keeps the engine mute.
 *
 * validation.ts emits keys; this asserts every key it can emit has a message in
 * all three locales. Without it, adding a validation rule and forgetting the
 * copy produces a form that rejects an input and explains nothing — and only in
 * the locale nobody tested.
 */
describe('validation keys and messages stay in step', () => {
  const source = readFileSync(path.join(HERE, 'validation.ts'), 'utf8');
  const emitted = new Set(
    Array.from(source.matchAll(/\b(?:err|warn)\([^,]+,\s*'([^']+)'\s*\)/g), (m) => m[1]),
  );

  it('finds the emitted keys at all — the regex is not silently matching nothing', () => {
    expect(emitted.size).toBeGreaterThan(15);
  });

  it('has a message for every key validation.ts emits', () => {
    const missing = Array.from(emitted).filter((k) => !(k in VALIDATION_MESSAGES));
    expect(missing, `validation keys with no copy: ${missing.join(', ')}`).toEqual([]);
  });

  it('has no message for a key nothing emits', () => {
    const orphans = Object.keys(VALIDATION_MESSAGES).filter((k) => !emitted.has(k));
    expect(orphans, `copy with no emitting rule: ${orphans.join(', ')}`).toEqual([]);
  });
});

/**
 * §37 — the German jurisdiction rule, checked here as well as by
 * scripts/validate-locale-jurisdiction.mjs.
 *
 * The build gate reads the rendered page. This one reads the strings, so a bad
 * string fails in the unit suite in milliseconds rather than after a full build.
 * Both are worth having: this catches it early, the gate catches it in context.
 */
describe('German copy never implies German payroll law', () => {
  // Terms a German reader reads as German law unless the sentence says otherwise.
  const LOADED = [
    'Mindestlohn',
    'Sozialversicherung',
    'Krankenversicherung',
    'Arbeitgeberhaftpflichtversicherung',
    'Steuererklärung',
    'Jahresausgleich',
    'Lohnabrechnung',
  ];
  const ANCHOR = /tschechisch\w*|Tschechien|Tschechische[nrs]?\b/i;

  const allGerman: Array<[string, string]> = [
    ...SINGLES.map(([name, e]) => [name, e.de] as [string, string]),
    ...CATALOGUES.flatMap(([name, c]) =>
      Object.entries(c).map(([k, e]) => [`${name}.${k}`, e.de] as [string, string]),
    ),
  ];

  it('anchors Czechia in any German string carrying a legally loaded term', () => {
    const offenders: string[] = [];
    for (const [where, text] of allGerman) {
      const hit = LOADED.find((term) => text.includes(term));
      if (!hit) continue;
      if (!ANCHOR.test(text)) offenders.push(`${where}: "${hit}" with no Czech anchor — ${text}`);
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  it('states the jurisdiction in the German stamp and kicker', () => {
    expect(JURISDICTION_STAMP.de).toMatch(/Tschechische Republik/);
    expect(PAGE_KICKER.de).toMatch(ANCHOR);
  });
});

describe('the jurisdiction and year are stated in every locale', () => {
  it('names the year 2026', () => {
    for (const locale of LOCALES) {
      expect(JURISDICTION_STAMP[locale], locale).toMatch(/2026/);
    }
  });

  it('names the Czech Republic, not a language', () => {
    expect(JURISDICTION_STAMP.cs).toMatch(/Česká republika/);
    expect(JURISDICTION_STAMP.en).toMatch(/Czech Republic/);
    expect(JURISDICTION_STAMP.de).toMatch(/Tschechische Republik/);
  });
});

// §28 — the page must not promise a guaranteed payroll result.
describe('exactness language', () => {
  it('does not claim a guarantee', () => {
    for (const locale of LOCALES) {
      const text = EXACTNESS_NOTICE[locale].toLowerCase();
      expect(text, locale).not.toMatch(/100\s*%/);
      expect(text, locale).not.toMatch(/guarantee|garantie|zaruč/);
    }
  });

  it('says the calculation follows the entered data and the 2026 rules', () => {
    expect(EXACTNESS_NOTICE.cs).toMatch(/zadaných údajů/);
    expect(EXACTNESS_NOTICE.en).toMatch(/data you entered/);
    expect(EXACTNESS_NOTICE.de).toMatch(/eingegebenen Daten/);
  });
});

describe('lookup', () => {
  it('returns the requested locale', () => {
    expect(message(VALIDATION_MESSAGES, 'liability.rateNegative', 'en')).toMatch(/cannot be negative/);
  });

  it('throws on an unknown key rather than rendering nothing', () => {
    expect(() => message(VALIDATION_MESSAGES, 'no.such.key', 'cs')).toThrow(/unknown key/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// The same two-way gate, for the notes the ENGINE emits.
//
// The engine emits note keys from social.ts, health.ts, tax.ts and
// employer-insurance.ts. A note with no text renders an empty line in the UI —
// and an assumption the user never sees is exactly the failure §28 is about.
// ─────────────────────────────────────────────────────────────────────────────
describe('engine note keys and their text stay in step', () => {
  const ENGINE_FILES = [
    'social.ts',
    'health.ts',
    'tax.ts',
    'employer-insurance.ts',
    'engine.ts',
  ];

  const emitted = new Set<string>();
  for (const file of ENGINE_FILES) {
    const src = readFileSync(path.join(HERE, file), 'utf8');
    for (const m of Array.from(src.matchAll(/text:\s*'([a-zA-Z.]+)'/g), (x) => x[1])) {
      emitted.add(m);
    }
    // The discount condition checker returns a key instead of pushing a note.
    for (const m of Array.from(src.matchAll(/return\s*'([a-z]+\.fail\.[a-zA-Z]+)'/g), (x) => x[1])) {
      emitted.add(m);
    }
  }

  it('finds the note keys at all', () => {
    expect(emitted.size).toBeGreaterThan(25);
  });

  it('has text in all three locales for every note the engine emits', () => {
    const missing = Array.from(emitted).filter((k) => !(k in ENGINE_NOTES));
    expect(missing, `engine notes with no text: ${missing.join(', ')}`).toEqual([]);
    for (const key of Array.from(emitted)) {
      for (const locale of LOCALES) {
        expect(ENGINE_NOTES[key][locale], `${key}.${locale}`).toBeTruthy();
      }
    }
  });

  it('has no text for a note nothing emits', () => {
    const orphans = Object.keys(ENGINE_NOTES).filter((k) => !emitted.has(k));
    expect(orphans, `note text with no emitter: ${orphans.join(', ')}`).toEqual([]);
  });
});

describe('result labels exist in all three locales', () => {
  it('covers every label', () => {
    for (const [key, entry] of Object.entries(RESULT_LABELS)) {
      for (const locale of LOCALES) {
        expect(entry[locale], `${key}.${locale}`).toBeTruthy();
      }
    }
  });
});

describe('German note text never implies German payroll law', () => {
  // Extended after an independent review found three German strings that read
  // as German law and passed every gate: a section asserting "Lohnfortzahlung
  // für die ersten 14 Tage der Arbeitsunfähigkeit" with no Czech anchor at all
  // (German EFZG gives six weeks, so the sentence was wrong for the reader's own
  // country), and "Grundfreibetrag"/"Kinderfreibetrag" for reliefs that reduce
  // the TAX rather than the base — the vocabulary of §§ 32/32a EStG describing a
  // different mechanism from the Czech and English pages.
  //
  // `Freibetrag` is on the list not because it is jurisdiction-loaded but
  // because it is MECHANISM-loaded: no Czech relief in this calculator is one,
  // so its presence in German text is a defect regardless of anchoring. It is
  // checked separately below.
  const LOADED = [
    'Mindestlohn',
    'Sozialversicherung',
    'Krankenversicherung',
    'Haftpflichtversicherung',
    'Steuererklärung',
    'Arbeitnehmererklärung',
    'Jahresausgleich',
    'Lohnabrechnung',
    'Lohnfortzahlung',
    'Arbeitsunfähigkeit',
    'Arbeitsgesetzbuch',
    'Quellensteuer',
    'Steuerbonus',
    'Behörde',
  ];
  const ANCHOR = /tschechisch\w*|Tschechien|Tschechische[nrs]?\b|ČSSZ|CZK|§/i;

  it('anchors every loaded German term', () => {
    const offenders: string[] = [];
    for (const [key, entry] of [
      ...Object.entries(ENGINE_NOTES),
      ...Object.entries(RESULT_LABELS),
    ]) {
      const hit = LOADED.find((term) => entry.de.includes(term));
      if (!hit) continue;
      if (!ANCHOR.test(entry.de)) offenders.push(`${key}: "${hit}" — ${entry.de}`);
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  // A Freibetrag reduces the tax BASE. Every relief this calculator models —
  // sleva na poplatníka, sleva na invaliditu, ZTP/P, daňové zvýhodnění na dítě —
  // reduces the TAX itself, after it is computed. Calling any of them a
  // Freibetrag states a different mechanism, and makes the German page
  // contradict its own sentence that reliefs are subtracted after the tax is
  // rounded. No anchor rescues it, so it is banned outright.
  it('never calls a Czech tax credit a Freibetrag', () => {
    const offenders: string[] = [];
    for (const [key, entry] of [
      ...Object.entries(ENGINE_NOTES),
      ...Object.entries(RESULT_LABELS),
      ...Object.entries(INPUT_LABELS),
      ...Object.entries(VALIDATION_MESSAGES),
    ]) {
      if (/Freibetr[aä]g/.test(entry.de)) offenders.push(`${key}: ${entry.de}`);
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  // prohlášení poplatníka is signed with the EMPLOYER to switch monthly reliefs
  // on. A Steuererklärung is filed annually with the tax office. A reader who
  // answers the checkbox on the second fact moves the result by at least the
  // 2 570 CZK basic credit.
  it('calls the prohlášení poplatníka an Arbeitnehmererklärung, never a Steuererklärung', () => {
    const declaration = INPUT_LABELS['taxProfile.signedDeclaration'].de;
    expect(declaration).toContain('Arbeitnehmererklärung');
    expect(declaration).not.toMatch(/Steuererklärung/);
  });
});
