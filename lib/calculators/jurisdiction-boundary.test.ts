import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * §47 — one calculator's law may never reach another's.
 *
 * WHY THIS EXISTS
 * ───────────────
 * There are now two payroll engines in this repository, for two countries, and
 * they look alike. Both compute employer cost and a net wage, both have a
 * `social` module and a `health` module, both round contributions, both carry a
 * ruleset keyed by year. The temptation to reach across — to reuse a rounding
 * helper that "does the same thing", to import a rate constant while wiring up a
 * comparison — is exactly as strong as the resemblance, and the consequence is
 * that a Czech rule silently decides a German payslip.
 *
 * Nothing about the resemblance is meaningful. 13,5 % is Czech health insurance
 * and has no counterpart in Germany; a German Beitragsbemessungsgrenze has no
 * Czech counterpart. A shared constant between them would be a coincidence
 * pretending to be a fact.
 *
 * So the rule is structural rather than a matter of care: the two engines may
 * not import each other, and neither may import the other's source registry.
 *
 * WHAT IS ALLOWED
 * ───────────────
 * Arithmetic and presentation. `lib/payroll/money.ts` is exact integer
 * arithmetic that knows nothing about any country; React components, formatting
 * primitives and the provenance TYPES are structure, not law. The boundary is
 * drawn around legal content, not around code reuse — a rule that forbade all
 * sharing would push each engine to reimplement exact money arithmetic, which
 * is how a rounding bug gets written twice.
 */

const ROOT = path.join(__dirname, '..', '..');

const ENGINES = [
  { name: 'cz-employer-cost', dir: 'lib/calculators/cz-employer-cost', data: 'data/calculators/cz-employer-cost' },
  { name: 'de-employer-cost', dir: 'lib/calculators/de-employer-cost', data: 'data/calculators/de-employer-cost' },
];

/** Every .ts/.tsx file under a directory, recursively. Empty if it does not exist yet. */
function sourceFiles(rel: string): string[] {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return [];
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.tsx?$/.test(entry.name)) out.push(path.relative(ROOT, full));
    }
  };
  walk(abs);
  return out;
}

/** Import specifiers in a file, resolved to a repo-relative path where relative. */
function imports(rel: string): string[] {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const specs = Array.from(
    src.matchAll(/(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g),
    (m) => m[1],
  );
  return specs.map((s) => {
    if (!s.startsWith('.')) return s;
    return path.relative(ROOT, path.resolve(path.dirname(path.join(ROOT, rel)), s));
  });
}

describe('§47 jurisdiction boundary', () => {
  for (const engine of ENGINES) {
    const others = ENGINES.filter((e) => e.name !== engine.name);

    it(`${engine.name}: imports no other jurisdiction's engine or registry`, () => {
      const files = sourceFiles(engine.dir);
      const violations: string[] = [];
      for (const file of files) {
        for (const spec of imports(file)) {
          for (const other of others) {
            if (spec.startsWith(other.dir) || spec.startsWith(other.data)) {
              violations.push(`${file} imports ${spec}`);
            }
          }
        }
      }
      expect(violations, violations.join('\n')).toEqual([]);
    });

    it(`${engine.name}: its data registry imports no engine at all`, () => {
      // A source registry states facts about law. It has no reason to reach into
      // any engine, and a registry that imports one can be made to depend on the
      // very code it is supposed to be independent evidence for.
      const violations: string[] = [];
      for (const file of sourceFiles(engine.data)) {
        for (const spec of imports(file)) {
          if (spec.startsWith('lib/calculators/')) violations.push(`${file} imports ${spec}`);
        }
      }
      expect(violations, violations.join('\n')).toEqual([]);
    });
  }

  it('no ruleset or registry names another country’s law', () => {
    // A cheap smell test on the files that carry legal CONSTANTS — the rulesets
    // and the source registries. A German ruleset citing a Czech statute is
    // either a copied comment or a copied rule, and both want a human to look.
    //
    // SCOPED DELIBERATELY. Copy and notes files are excluded, because their
    // whole job is to speak other languages: the Czech calculator's German
    // strings legitimately contain "Lohnsteuervorauszahlung" — that is the
    // translation of "záloha na daň", not an import of German tax law. An
    // earlier version of this test flagged it, which would have taught everyone
    // to ignore the gate. Speaking a language is not importing its law.
    const LEGAL_FILE = /(jurisdictions|rules|sources|ruleset)/i;
    const FOREIGN: Array<[string, RegExp, string]> = [
      ['de-employer-cost', /zákon[ao]?\s+č\.|\bSb\.|vyměřovací|\bKč\b|ČSSZ|VZP/i, 'Czech legal vocabulary'],
      ['cz-employer-cost', /\bSGB\s+[IVX]+|Beitragsbemessungsgrenze|Programmablaufplan|Pflegeversicherung/i, 'German legal vocabulary'],
    ];
    const violations: string[] = [];
    for (const [engineName, re, what] of FOREIGN) {
      const engine = ENGINES.find((e) => e.name === engineName)!;
      for (const file of [...sourceFiles(engine.dir), ...sourceFiles(engine.data)]) {
        if (/\.test\.tsx?$/.test(file)) continue;
        if (!LEGAL_FILE.test(file)) continue;
        const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
        // Strip comments: prose explaining the boundary is not a breach of it.
        const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
        if (re.test(code)) violations.push(`${file} contains ${what}`);
      }
    }
    expect(violations, violations.join('\n')).toEqual([]);
  });

  it('any engine that does arithmetic does it with the shared module', () => {
    // The positive half of the rule. If an engine grows its own money
    // arithmetic, the same rounding bug gets written twice and fixed once.
    //
    // Keyed on whether the engine HAS an arithmetic surface yet: a directory
    // holding only a list of unsupported cases needs no money module, and
    // demanding one would make this fail for a reason that is not a defect.
    for (const engine of ENGINES) {
      const files = sourceFiles(engine.dir).filter((f) => !/\.test\.tsx?$/.test(f));
      const hasEngine = files.some((f) => /\/(engine|social|health|tax|care|pension)\w*\.ts$/.test(f));
      if (!hasEngine) continue;
      const usesShared = files.some((f) =>
        imports(f).some((s) => s === 'lib/payroll/money' || s.endsWith('payroll/money')),
      );
      expect(usesShared, `${engine.name} has an engine but no shared money module`).toBe(true);
    }
  });
});
