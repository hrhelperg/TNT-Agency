import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { DE_SOURCES, DE_SOURCE_IDS, ACCESSED, deSource } from '../../../data/calculators/de-employer-cost/2026/sources';
import { DE_RULES_2026 } from '../../../data/calculators/de-employer-cost/2026/rules';

const ROOT = path.join(__dirname, '..', '..', '..');

/**
 * Lives under lib/ rather than beside the registry because the test runner
 * includes `lib/**` only. Moving it here was the smaller change than widening
 * that glob, which would have started collecting files from directories nobody
 * has reviewed as tests.
 *
 * §1 — no constant without a source, and no source id that leads nowhere.
 *
 * The registry is only worth having if the link between a number and its
 * evidence is checked mechanically. A hand-written `sourceId` that has quietly
 * stopped matching anything looks exactly like one that still does.
 */
describe('the source registry is complete and reachable', () => {
  it('every id in DE_SOURCE_IDS resolves', () => {
    for (const id of Object.values(DE_SOURCE_IDS)) expect(() => deSource(id)).not.toThrow();
  });

  it('every sourceId cited anywhere in the engine exists', () => {
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walk(full);
        else if (/\.tsx?$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) files.push(full);
      }
    };
    walk(path.join(ROOT, 'lib/calculators/de-employer-cost'));
    walk(path.join(ROOT, 'data/calculators/de-employer-cost'));

    const known = new Set(DE_SOURCES.map((s) => s.id));
    const unknown: string[] = [];
    for (const f of files) {
      const src = fs.readFileSync(f, 'utf8');
      for (const m of src.matchAll(/sourceId:\s*'([^']+)'/g)) {
        if (!known.has(m[1])) unknown.push(`${path.relative(ROOT, f)}: ${m[1]}`);
      }
    }
    expect(unknown, unknown.join('\n')).toEqual([]);
  });

  it('every rule in the 2026 ruleset names a source that exists', () => {
    const walk = (node: unknown, at: string) => {
      if (node === null || typeof node !== 'object') return;
      const rec = node as Record<string, unknown>;
      if (typeof rec.sourceId === 'string' && typeof rec.legalBasis === 'string') {
        expect(() => deSource(rec.sourceId as string), `${at}`).not.toThrow();
        expect(rec.legalBasis, `${at} has an empty legalBasis`).not.toBe('');
        return;
      }
      for (const [k, v] of Object.entries(rec)) walk(v, `${at}.${k}`);
    };
    walk(DE_RULES_2026, 'DE_RULES_2026');
  });

  it('records one accessed date and applies it to every entry', () => {
    expect(ACCESSED).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    for (const s of DE_SOURCES) expect(s.accessed, s.id).toBe(ACCESSED);
  });

  it('cites no secondary source', () => {
    // Blogs, Kassen marketing and software vendors were used to find leads and
    // none may be cited as evidence. Checked by host rather than by promise.
    const ALLOWED = /^(www\.)?(gesetze-im-internet\.de|bundesfinanzministerium\.de|bundesanzeiger\.de|gkv-spitzenverband\.de|recht\.bund\.de)$/;
    for (const s of DE_SOURCES) {
      const host = new URL(s.url).host;
      expect(ALLOWED.test(host), `${s.id} cites ${host}`).toBe(true);
    }
  });

  it('every source says what it establishes', () => {
    for (const s of DE_SOURCES) {
      expect(s.note.length, `${s.id} has a thin note`).toBeGreaterThan(60);
      expect(s.legalBasis, s.id).not.toBe('');
    }
  });
});
