import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { CALC_COPY, routeLabel, routePurpose } from './calculator-copy';
import { DCALC } from './dedicated-calculator-copy';
import { LANGS, normalizeLang } from './react';

const ROOT = process.cwd();
const NOTICE = fs.readFileSync(path.join(ROOT, 'components/ArticleLanguageNotice.tsx'), 'utf8');
const SEO = fs.readFileSync(path.join(ROOT, 'components/SeoArticle.tsx'), 'utf8');
const CALC = fs.readFileSync(path.join(ROOT, 'components/HomePayrollCalculator.tsx'), 'utf8');

describe('calculator localization (cs/en/de)', () => {
  it('CALC_COPY has identical key sets across cs/en/de', () => {
    const keys = (LANGS as ('cs' | 'en' | 'de')[]).map((l) => Object.keys(CALC_COPY[l]).sort());
    expect(keys[0].length).toBeGreaterThan(30);
    expect(keys[1]).toEqual(keys[0]);
    expect(keys[2]).toEqual(keys[0]);
  });

  it('result labels are genuinely translated (not identical across languages)', () => {
    expect(CALC_COPY.cs.net).toBe('Čistá mzda');
    expect(CALC_COPY.en.net).toBe('Net salary');
    expect(CALC_COPY.de.net).toBe('Nettolohn');
    expect(new Set([CALC_COPY.cs.cost, CALC_COPY.en.cost, CALC_COPY.de.cost]).size).toBe(3);
  });

  it('every language states the Czech-Republic context', () => {
    expect(CALC_COPY.cs.context).toMatch(/České republice/);
    expect(CALC_COPY.en.context).toMatch(/Czech Republic/);
    expect(CALC_COPY.de.context).toMatch(/Tschechischen Republik/);
  });

  it('routeLabel/routePurpose resolve the engine keys to localized strings', () => {
    for (const l of ['cs', 'en', 'de'] as const) {
      const c = CALC_COPY[l];
      expect(routeLabel(c, 'employee-social')).toBe(c.empSocial);
      expect(routeLabel(c, 'employer-health')).toBe(c.erHealth);
      expect(routeLabel(c, 'employee-tax')).toBe(c.tax);
      expect(routePurpose(c, 'employee-tax')).toBe(c.purposeTax);
      expect(routePurpose(c, 'employer-health')).toBe(c.purposeHealth);
      expect(routePurpose(c, 'employee-social')).toBe(c.purposeSocial);
    }
  });

  it('the registry is chrome-only — no rates or numeric amounts', () => {
    for (const l of ['cs', 'en', 'de'] as const) {
      const blob = Object.values(CALC_COPY[l]).join(' | ');
      // No literal percentages or large money amounts hardcoded in copy.
      expect(/\b\d{1,2}[.,]\d\s?%/.test(blob)).toBe(false);
      expect(/26\s?058|42\s?816|32\s?000/.test(blob)).toBe(false);
    }
  });

  it('the calculator component consumes the language bridge + registry', () => {
    expect(CALC).toContain("useLang");
    expect(CALC).toContain('CALC_COPY');
    // No hardcoded Czech result labels left in the component markup.
    expect(CALC).not.toContain('>Čistá mzda<');
    expect(CALC).not.toContain('>Odvody zaměstnance<');
  });

  it('language normalization rejects unknown values (Czech default)', () => {
    expect(normalizeLang('en')).toBe('en');
    expect(normalizeLang('de')).toBe('de');
    expect(normalizeLang('cs')).toBe('cs');
    expect(normalizeLang('fr')).toBe('cs');
    expect(normalizeLang(null)).toBe('cs');
    expect(normalizeLang(undefined)).toBe('cs');
  });
});

describe('dedicated calculator localization (cs/en/de)', () => {
  const DPAGE = fs.readFileSync(path.join(ROOT, 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx'), 'utf8');

  it('DCALC registry has identical key sets across cs/en/de', () => {
    const keys = (['cs', 'en', 'de'] as const).map((l) => Object.keys(DCALC[l]).sort());
    expect(keys[0].length).toBeGreaterThan(80);
    expect(keys[1]).toEqual(keys[0]);
    expect(keys[2]).toEqual(keys[0]);
  });

  it('mode names + key result labels are genuinely translated', () => {
    expect([DCALC.cs.modeAgency, DCALC.en.modeAgency, DCALC.de.modeAgency]).toEqual(['Agenturní zaměstnanec', 'Agency employee', 'Zeitarbeitnehmer']);
    expect([DCALC.cs.cNet, DCALC.en.cNet, DCALC.de.cNet]).toEqual(['Čistá mzda', 'Net salary', 'Nettolohn']);
    expect(new Set([DCALC.cs.legMode, DCALC.en.legMode, DCALC.de.legMode]).size).toBe(3);
  });

  it('German states the calculation uses Czech Republic rules', () => {
    expect(DCALC.de.eyebrow).toMatch(/Tschechien/);
    expect(DCALC.de.methodology).toMatch(/Tschechischen Republik/);
    expect(DCALC.de.disclaimer).toMatch(/Tschechien/);
  });

  it('the page consumes the language bridge + registry and no longer hardcodes Czech chrome', () => {
    expect(DPAGE).toContain('useLang');
    expect(DPAGE).toContain('DCALC');
    expect(DPAGE).toContain('ArticleLanguageNotice');
    // Localized chrome, not hardcoded literals.
    expect(DPAGE).not.toContain('>Souhrn výsledků<');
    expect(DPAGE).not.toContain('label="Měsíc"');
    expect(DPAGE).not.toContain('<legend>1 · Režim výpočtu</legend>');
  });

  it('registry is chrome-only (institution names stay Czech, no rate literals as % copy)', () => {
    for (const l of ['cs', 'en', 'de'] as const) {
      const blob = Object.values(DCALC[l]).join(' | ');
      expect(/\b\d{1,2}[.,]\d\s?%/.test(blob)).toBe(false);
    }
  });
});

describe('editorial Strategy-2 notice', () => {
  it('renders nothing for Czech and shows an honest notice for en/de', () => {
    expect(NOTICE).toMatch(/lang === 'cs'\)\s*return null/);
    expect(NOTICE).toContain('currently available in Czech');
    expect(NOTICE).toContain('auf Tschechisch verfügbar');
    // Does not machine-translate the body — only states availability + offers a switch.
    expect(NOTICE).toContain('lang-btn[data-lang="cs"]');
  });

  it('is wired into the shared SeoArticle template with a lang="cs" body', () => {
    expect(SEO).toContain('ArticleLanguageNotice');
    expect(SEO).toMatch(/className="seo-body" lang="cs"/);
  });
});
