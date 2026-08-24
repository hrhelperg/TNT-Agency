import { describe, it, expect } from 'vitest';
import * as COPY from './copy';
import { UNSUPPORTED_CASES, REQUIRES_INDIVIDUAL_PAYROLL } from './unsupported';

/**
 * Every string the calculator can render exists in all three languages.
 *
 * The failure this catches is not a missing key — TypeScript would find that.
 * It is a language QUIETLY FALLING BACK to another: the refusal registry
 * carried only German and English, so the Czech page rendered the whole "this
 * case is not calculated" panel in English inside a `lang="cs"` section, and
 * three more English entries were added to it without anything noticing.
 */

const LOCALES = ['de', 'en', 'cs'] as const;

describe('the copy module is complete in all three languages', () => {
  it('every Localised value has all three, and none is empty', () => {
    const missing: string[] = [];
    for (const [group, value] of Object.entries(COPY)) {
      if (!value || typeof value !== 'object') continue;
      const entries =
        typeof (value as Record<string, unknown>).de === 'string'
          ? ([[group, value]] as const)
          : Object.entries(value as Record<string, unknown>).map(([k, v]) => [`${group}.${k}`, v] as const);
      for (const [name, v] of entries) {
        if (!v || typeof v !== 'object' || typeof (v as Record<string, unknown>).de !== 'string') continue;
        for (const l of LOCALES) {
          const text = (v as Record<string, string>)[l];
          if (typeof text !== 'string' || text.trim() === '') missing.push(`${name}.${l}`);
        }
      }
    }
    expect(missing, missing.join('\n')).toEqual([]);
  });

  it('no two languages carry an identical sentence', () => {
    // A translation that is a copy of another is the commonest way a
    // multilingual page ships untranslated. Short shared tokens are excluded —
    // "U1", "%", a proper noun — by requiring some length.
    const duplicates: string[] = [];
    for (const [group, value] of Object.entries(COPY)) {
      if (!value || typeof value !== 'object') continue;
      const entries =
        typeof (value as Record<string, unknown>).de === 'string'
          ? ([[group, value]] as const)
          : Object.entries(value as Record<string, unknown>).map(([k, v]) => [`${group}.${k}`, v] as const);
      for (const [name, v] of entries) {
        const o = v as Record<string, string>;
        if (typeof o?.de !== 'string') continue;
        if (o.de.length > 25 && o.de === o.en) duplicates.push(`${name}: de === en`);
        if (o.de.length > 25 && o.de === o.cs) duplicates.push(`${name}: de === cs`);
        if (o.en?.length > 25 && o.en === o.cs) duplicates.push(`${name}: en === cs`);
      }
    }
    expect(duplicates, duplicates.join('\n')).toEqual([]);
  });
});

describe('the refusal registry speaks all three languages', () => {
  it('every case has a Czech label and reason as well', () => {
    const missing: string[] = [];
    for (const c of UNSUPPORTED_CASES) {
      for (const [field, text] of [
        ['labelDe', c.labelDe], ['labelEn', c.labelEn], ['labelCs', c.labelCs],
        ['reasonDe', c.reasonDe], ['reasonEn', c.reasonEn], ['reasonCs', c.reasonCs],
      ] as const) {
        if (typeof text !== 'string' || text.trim().length < 8) missing.push(`${c.id}.${field}`);
      }
    }
    expect(missing, missing.join('\n')).toEqual([]);
  });

  it('no case has the same text in two languages', () => {
    for (const c of UNSUPPORTED_CASES) {
      expect(c.reasonCs, `${c.id} Czech reason is the English one`).not.toBe(c.reasonEn);
      expect(c.reasonCs, `${c.id} Czech reason is the German one`).not.toBe(c.reasonDe);
      expect(c.labelCs, `${c.id} Czech label is the English one`).not.toBe(c.labelEn);
    }
  });

  it('the shared refusal sentence carries all three', () => {
    for (const l of LOCALES) expect(REQUIRES_INDIVIDUAL_PAYROLL[l].length).toBeGreaterThan(20);
  });
});

describe('the component renders each locale from its own field', () => {
  it('picks labelCs/reasonCs for Czech rather than falling back to English', () => {
    // A source assertion, because the bug was a missing branch: the ternary read
    // `locale === 'de' ? labelDe : labelEn`, so Czech silently took the English
    // arm. Checking the source is what distinguishes "Czech is rendered" from
    // "Czech happens to look right in this test's fixture".
    const src = require('node:fs').readFileSync(
      require('node:path').join(__dirname, '..', '..', '..', 'components/DeEmployerCostCalculator.tsx'),
      'utf8',
    ) as string;
    for (const field of ['labelCs', 'reasonCs']) {
      expect(src.includes(field), `the component never reads ${field}`).toBe(true);
    }
  });
});
