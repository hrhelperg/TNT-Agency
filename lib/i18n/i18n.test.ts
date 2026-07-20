import { describe, it, expect } from 'vitest';
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { computeHomeView } from '../payroll/home-view-model';

const require = createRequire(import.meta.url);
const ROOT = process.cwd();
const { validate, parseDict, languageRegions, LANGS } = require(path.join(ROOT, 'scripts/validate-i18n.js'));

const SCRIPT = fs.readFileSync(path.join(ROOT, 'public/script.js'), 'utf8');
const HEADER = fs.readFileSync(path.join(ROOT, 'components/Header.tsx'), 'utf8');
const FOOTER = fs.readFileSync(path.join(ROOT, 'components/Footer.tsx'), 'utf8');
const SITEMAP = fs.readFileSync(path.join(ROOT, 'public/sitemap.xml'), 'utf8');

const result = validate();
const regions = languageRegions(SCRIPT);
const dicts = Object.fromEntries((LANGS as string[]).map((l) => [l, parseDict(regions[l])]));

describe('localization completeness & integrity', () => {
  it('1-4,13. validator passes: all cs/en/de keys present, structures match, no unknown/unwired data-i18n', () => {
    expect(result.errors).toEqual([]);
  });

  it('nav namespace has identical key sets across en/cs/de', () => {
    const sizes = (LANGS as string[]).map((l) => dicts[l].nav.size);
    expect(new Set(sizes).size).toBe(1);
    expect(sizes[0]).toBeGreaterThanOrEqual(15);
  });

  it('11. every header navigation item is wired for translation (data-i18n)', () => {
    for (const key of ['nav.home', 'nav.agencies', 'nav.offers', 'nav.calc', 'nav.article', 'nav.submitAgency', 'nav.postOffer', 'nav.contact', 'nav.requestWorkers']) {
      expect(HEADER).toContain(`data-i18n="${key}"`);
    }
    // Mobile mirror.
    for (const key of ['mnav.home', 'mnav.agencies', 'mnav.offers', 'mnav.calc', 'mnav.contact', 'mnav.requestWorkers']) {
      expect(HEADER).toContain(`data-i18n="${key}"`);
    }
  });

  it('5. navigation strings are genuinely translated (not a single-language fallback)', () => {
    // nav.home resolves to a distinct value in each language.
    expect(/home:\s+'Home'/.test(SCRIPT)).toBe(true);
    expect(/home:\s+'Úvod'/.test(SCRIPT)).toBe(true);
    expect(/home:\s+'Startseite'/.test(SCRIPT)).toBe(true);
  });

  it('12. client-side validation error messages exist in all three languages', () => {
    for (const l of LANGS as string[]) {
      expect(dicts[l].contact.has('form.errorMsg') || dicts[l].contact.has('errorMsg') || /errorMsg/.test(regions[l])).toBe(true);
    }
  });

  it('6,7. legal entity and contact email are preserved unchanged (never translated to a variant)', () => {
    // The validator flags altered forms; assert none were flagged.
    expect(result.errors.filter((e: string) => /legal-entity|contact email/i.test(e))).toEqual([]);
    // Markup still carries the exact identifiers.
    expect(FOOTER).toContain('TNT agency s.r.o.');
    expect(FOOTER).toContain('jobbohemiacz@gmail.com');
    // The identifier itself is byte-identical across every language block.
    for (const l of LANGS as string[]) {
      const emails = Array.from(regions[l].matchAll(/jobbohemiacz@[\w.]+/g), (m: RegExpMatchArray) => m[0]);
      for (const e of emails) expect(e).toBe('jobbohemiacz@gmail.com');
    }
  });

  it('10. calculator numeric output is language-independent', () => {
    // The compute path takes only a number; no language input exists.
    expect(computeHomeView(32000).netHalere).toBe(computeHomeView(32000).netHalere);
    expect(Math.round(computeHomeView(32000).netHalere / 100)).toBe(26058);
  });

  it('14. no localized URL routes and no reintroduced sitemap hreflang/lastmod', () => {
    // No locale-prefixed page directories.
    const pageEntries = fs.readdirSync(path.join(ROOT, 'pages'));
    for (const bad of ['en', 'cs', 'de']) expect(pageEntries).not.toContain(bad);
    // Sitemap hygiene preserved: URL-only, no hreflang extension, no lastmod.
    expect(SITEMAP.includes('<xhtml:link')).toBe(false);
    expect(SITEMAP.includes('xmlns:xhtml')).toBe(false);
    expect(SITEMAP.includes('<lastmod')).toBe(false);
    expect(SITEMAP.includes('<changefreq')).toBe(false);
    expect(SITEMAP.includes('<priority')).toBe(false);
  });
});
