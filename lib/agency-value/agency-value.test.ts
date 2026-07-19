import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { AGENCY_VALUE, RESPONSIBILITY_ROWS } from './copy';
import { computeHomeView } from '../payroll/home-view-model';
import { calculate, createDefaultInput, toCzkNumber } from '../payroll';

const ROOT = process.cwd();
const LANGS = ['cs', 'en', 'de'] as const;
const HOME_AV = fs.readFileSync(path.join(ROOT, 'components/HomeAgencyValue.tsx'), 'utf8');
const RESP = fs.readFileSync(path.join(ROOT, 'components/ResponsibilityMatrix.tsx'), 'utf8');
const DPAGE = fs.readFileSync(path.join(ROOT, 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx'), 'utf8');

const ALLOWED_RESP = ['agency', 'client', 'shared', 'depends'];

describe('Phase B — agency value & responsibility', () => {
  it('AGENCY_VALUE has parallel structure across cs/en/de', () => {
    const cs = AGENCY_VALUE.cs;
    for (const l of LANGS) {
      const c = AGENCY_VALUE[l];
      expect(Object.keys(c).sort()).toEqual(Object.keys(cs).sort());
      expect(c.avPoints.length).toBe(cs.avPoints.length);
      expect(c.benefits.length).toBe(cs.benefits.length);
      expect(Object.keys(c.cat).sort()).toEqual(Object.keys(cs.cat).sort());
    }
  });

  it('responsibility matrix: 18 rows, allowed values, every key labelled in cs/en/de', () => {
    expect(RESPONSIBILITY_ROWS.length).toBe(18);
    for (const row of RESPONSIBILITY_ROWS) {
      expect(ALLOWED_RESP).toContain(row.resp);
      for (const l of LANGS) expect(typeof AGENCY_VALUE[l].cat[row.key]).toBe('string');
    }
    // Statutory employer duties sit with the agency (it is the employer).
    const byKey = Object.fromEntries(RESPONSIBILITY_ROWS.map((r) => [r.key, r.resp]));
    expect(byKey.contract).toBe('agency');
    expect(byKey.payroll).toBe('agency');
    expect(byKey.contributions).toBe('agency');
    // Genuinely contract-dependent items are not asserted as certain.
    expect(byKey.ppe).toBe('depends');
    expect(byKey.accommodation).toBe('depends');
  });

  it('NO guaranteed-savings / always-cheaper / tax-saving claims anywhere in the copy', () => {
    const forbidden = [
      /zaručen[éá] úspor/i, /garantovan[éá] úspor/i, /daňov[áé] úspor/i, /vždy levnější/i, /nižší odvody/i,
      /guaranteed saving/i, /always cheaper/i, /tax saving/i, /lower (statutory )?contribution/i, /zero risk/i,
      /garantierte einsparung/i, /immer günstiger/i, /steuerersparnis/i, /geringere beiträge/i,
    ];
    for (const l of LANGS) {
      const blob = JSON.stringify(AGENCY_VALUE[l]);
      for (const re of forbidden) expect(re.test(blob), `${l}: ${re}`).toBe(false);
    }
  });

  it('uses the exact approved qualified-difference phrasing', () => {
    expect(AGENCY_VALUE.cs.diffLabel).toBe('Odhadovaný rozdíl podle zadaných předpokladů');
    expect(AGENCY_VALUE.en.diffLabel).toBe('Estimated difference based on entered assumptions');
    expect(AGENCY_VALUE.de.diffLabel).toBe('Geschätzte Differenz auf Grundlage der eingegebenen Annahmen');
    // Explicit statement that agency does not automatically cut statutory contributions.
    expect(AGENCY_VALUE.cs.avPoints.join(' ')).toMatch(/nesnižuje zákonné odvody/);
    expect(AGENCY_VALUE.en.avPoints.join(' ')).toMatch(/does not automatically reduce statutory contributions/);
  });

  it('German copy states the Czech-Republic law context', () => {
    expect(AGENCY_VALUE.de.context).toMatch(/Tschechischen Republik/);
    expect(AGENCY_VALUE.de.respDisclaimer).toMatch(/tschechischen Recht/);
  });

  it('responsibility matrix carries a disclaimer and no absolute legal certainty', () => {
    for (const l of LANGS) expect(AGENCY_VALUE[l].respDisclaimer.length).toBeGreaterThan(40);
    // Component renders the disclaimer + a scoped table (not colour-only meaning).
    expect(RESP).toContain('resp__disclaimer');
    expect(RESP).toContain('label(row.resp)'); // text label always present
  });

  it('reuses the shared engine; default scenario still reconciles (32 000 / 26 058 / 42 816)', () => {
    const v = computeHomeView(32000);
    expect(toCzkNumber(v.grossHalere)).toBe(32000);
    expect(toCzkNumber(v.netHalere)).toBe(26058);
    expect(toCzkNumber(v.employerCostHalere)).toBe(42816);
    // Dedicated page derives the qualified difference from the engine comparison.
    const r = calculate(createDefaultInput());
    expect(r.comparison).toBeTruthy();
    expect(DPAGE).toContain('comparison.differenceCzk');
    expect(DPAGE).not.toMatch(/AGENCY_VALUE.*calculate|duplicate.*formula/);
  });

  it('privacy: no salary/cost values reach fetch/storage/URL from the agency-value UI', () => {
    const forbidden = /fetch\(|XMLHttpRequest|sendBeacon|localStorage\.setItem|sessionStorage|gtag\(|dataLayer/;
    for (const src of [HOME_AV, RESP]) expect(forbidden.test(src)).toBe(false);
    // The homepage compare CTA carries only a non-sensitive mode hint, never salary.
    expect(HOME_AV).toContain('?mode=comparison');
    expect(/\?.*(gross|mzda|salary|d=)/i.test(HOME_AV)).toBe(false);
  });

  it('health-recipient wording remains correct (unchanged by Phase B)', () => {
    const vm = fs.readFileSync(path.join(ROOT, 'lib/payroll/home-view-model.ts'), 'utf8');
    expect(vm).toContain('Příslušná zdravotní pojišťovna zaměstnance');
  });
});
