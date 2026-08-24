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

/** Strip comments, preserving line count so reported positions stay true. */
function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ''))
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

/**
 * Import specifiers in a file, resolved to a repo-relative path where relative.
 *
 * Comments are stripped first. Without that, prose EXPLAINING the boundary trips
 * it: the German types file says in so many words that importing
 * `'../cz-employer-cost'` would be a breach, and the extractor read the quoted
 * example as an actual import. A gate that fails on its own documentation is a
 * gate people learn to ignore.
 */
function imports(rel: string): string[] {
  const src = stripComments(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
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

  it('the German engine never reaches the Czech payroll module', () => {
    // lib/payroll is not one of the two ENGINES directories, so nothing above
    // looks at it — and it is Czech: money.ts is branded in haléře and the
    // package re-exports the whole CZ ruleset. A German file importing it would
    // have passed every assertion in this file.
    //
    // The German engine has its own exact-arithmetic module and needs nothing
    // from there, so the rule is simply zero.
    const de = ENGINES.find((e) => e.name === 'de-employer-cost')!;
    const violations: string[] = [];
    for (const file of [...sourceFiles(de.dir), ...sourceFiles(de.data)]) {
      for (const spec of imports(file)) {
        if (/(^|\/)lib\/payroll(\/|$)/.test(spec) || /(^|\/)payroll\/[a-z-]+$/.test(spec)) {
          violations.push(`${file} imports ${spec}`);
        }
      }
    }
    expect(violations, violations.join('\n')).toEqual([]);
  });

  it('the Czech payroll module never reaches either calculator engine', () => {
    // The other direction. lib/payroll is shared infrastructure for the Czech
    // side; if it started importing a calculator, the dependency would invert
    // and the "shared" module would carry one calculator's law into the other.
    const violations: string[] = [];
    for (const file of sourceFiles('lib/payroll')) {
      if (/\.test\.tsx?$/.test(file)) continue;
      for (const spec of imports(file)) {
        if (spec.includes('calculators/')) violations.push(`${file} imports ${spec}`);
      }
    }
    expect(violations, violations.join('\n')).toEqual([]);
  });

  it('no engine file names another country’s law', () => {
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
    // EVERY non-test source file in the engine, not just the ones whose NAME
    // says "rules". The previous pattern scanned 2 of 18 German files and 3 of
    // 15 Czech ones, excluding every module that actually carries a rate —
    // branches.ts, church-tax.ts, social.ts, health.ts. A gate that reads a
    // tenth of the code and reports a clean sweep is worse than none.
    //
    // Translation files are the one exclusion, and for the original reason: the
    // German calculator's Czech strings legitimately say "vyměřovací základ"
    // because that IS the Czech for "assessment base". Speaking a language is
    // not importing its law.
    const TRANSLATION_FILE = /\/(copy|notes-copy)\.tsx?$/i;
    const FOREIGN: Array<[string, RegExp, string]> = [
      ['de-employer-cost', /zákon[ao]?\s+č\.|\bSb\.|vyměřovací|\bKč\b|ČSSZ|VZP/i, 'Czech legal vocabulary'],
      ['cz-employer-cost', /\bSGB\s+[IVX]+|Beitragsbemessungsgrenze|Programmablaufplan|Pflegeversicherung/i, 'German legal vocabulary'],
    ];
    const violations: string[] = [];
    for (const [engineName, re, what] of FOREIGN) {
      const engine = ENGINES.find((e) => e.name === engineName)!;
      for (const file of [...sourceFiles(engine.dir), ...sourceFiles(engine.data)]) {
        if (/\.test\.tsx?$/.test(file)) continue;
        if (TRANSLATION_FILE.test(file)) continue;
        const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
        // Strip comments: prose explaining the boundary is not a breach of it.
        const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
        if (re.test(code)) violations.push(`${file} contains ${what}`);
      }
    }
    expect(violations, violations.join('\n')).toEqual([]);
  });

  it('every engine funnels its money arithmetic through one exact module', () => {
    // The positive half of the rule, corrected.
    //
    // An earlier version demanded that every engine import `lib/payroll/money`.
    // That was simply false: `money.ts` is not a generic money type but a Czech
    // one — unit haléř, brand `Halere`, helpers `roundToCzk` and
    // `roundToHundredCzk` for a rounding step German payroll does not have. The
    // German engine cannot use it, and a gate that demands the impossible gets
    // deleted rather than obeyed.
    //
    // The property actually worth enforcing is not "one module for the repo"
    // but "one module per jurisdiction": exact arithmetic written once, so a
    // rounding bug cannot be written twice and fixed once. Plus the thing that
    // makes it stick — no file in an engine may reach for float rounding
    // behind the module's back.
    const ARITHMETIC: Record<string, string> = {
      'cz-employer-cost': 'lib/payroll/money',
      'de-employer-cost': 'lib/calculators/de-employer-cost/decimal',
    };

    for (const engine of ENGINES) {
      const files = sourceFiles(engine.dir).filter((f) => !/\.test\.tsx?$/.test(f));
      if (files.length === 0) continue;
      // Not named `module`: assigning to that identifier is a build error under
      // the repository's lint rules, and a test that cannot be built is a test
      // that does not run.
      const arithmeticModule = ARITHMETIC[engine.name];
      expect(arithmeticModule, `${engine.name} has no declared arithmetic module`).toBeTruthy();

      const importsModule = files.some((f) =>
        imports(f).some(
          (spec) =>
            spec === arithmeticModule || spec === arithmeticModule.replace(/^lib\//, ''),
        ),
      );
      expect(importsModule, `${engine.name} never imports ${arithmeticModule}`).toBe(true);
    }
  });

  it('no engine rounds money with floating point', () => {
    // `Math.round`, `Math.ceil`, `Math.floor` and `toFixed` are how exact
    // arithmetic gets bypassed: three characters shorter than the correct call,
    // and wrong only on inputs nobody tries by hand. `1800 * 0.135 ===
    // 243.00000000000003` is the one that actually bit this repository.
    //
    // ABSOLUTE, WITH A FROZEN BASELINE
    // ────────────────────────────────
    // For any NEW code the rule admits no exceptions. The Czech engine predates
    // the rule, so its existing sites are listed below as a frozen baseline —
    // every one was checked against exact BigInt arithmetic before being
    // admitted, and the list only ever shrinks. Adding a line to it is a
    // deliberate act that shows up in review; adding a `Math.round` without
    // touching it fails.
    //
    // The exemption is keyed on the expression text rather than a line number,
    // so editing the expression re-opens the question.
    const EXEMPT: Array<{ file: string; snippet: string; why: string }> = [
      // ── Not money: display values, never fed back into a calculation ──────
      {
        file: 'lib/calculators/cz-employer-cost/metrics.ts',
        snippet: 'percentOfTotal: total === 0 || amount < 0 ? null : Math.round((amount / total) * 10_000) / 100,',
        why: 'Share of total cost, two decimals, for display.',
      },
      {
        file: 'lib/calculators/cz-employer-cost/metrics.ts',
        snippet: 'return Number.isFinite(pct) ? Math.round(pct * 100) / 100 : null;',
        why: 'Percentage, two decimals, for display.',
      },
      {
        file: 'lib/calculators/cz-employer-cost/formatting.ts',
        snippet: 'const rounded = Math.round(ratio * 10 ** decimals) / 10 ** decimals;',
        why: 'Presentation rounding inside the formatter.',
      },
      {
        file: 'lib/calculators/cz-employer-cost/social.ts',
        snippet: ': Math.ceil((capBase * f.employmentDaysInMonth) / daysInMonth);',
        why:
          'Hours, not koruny — the 138-hour cap pro-rated by calendar days. Numerator ' +
          '≤ 138×31, denominator ≤ 31.',
      },

      // ── Money, but proven equal to exact arithmetic over the whole domain ─
      {
        file: 'lib/calculators/cz-employer-cost/social.ts',
        snippet: 'Math.ceil(rules.averageWageMonthly.value * d.monthlyBaseCeilingMultiple.value),',
        why:
          '§ 7a odst. 3 písm. a): průměrná mzda × 1,5. ×1,5 is ×3÷2, exact in IEEE-754 for ' +
          'integers. Zero differences vs BigInt for every average wage 10 000–120 000 Kč.',
      },
      {
        file: 'lib/calculators/cz-employer-cost/social.ts',
        // A genuine whole line: the call is broken across three lines and this
        // is the first of them.
        snippet: 'const perHourCeiling = Math.ceil(',
        why:
          '§ 7a odst. 3 písm. b): průměrná mzda × 1,15 % — the one site not exact by ' +
          'construction. Zero differences vs BigInt for every average wage ' +
          '10 000–120 000 Kč, including 2026 (48 967 → 563,1205 → 564 Kč). Revisit if the ' +
          'percentage changes.',
      },
      {
        file: 'lib/calculators/cz-employer-cost/social.ts',
        snippet: 'const perHour = Math.ceil(toCzkNumber(chargeableBase) / f.hoursWorkedThisMonth);',
        why:
          'Integer ÷ integer — § 5d has already rounded the base to whole koruny — and ' +
          'IEEE division is correctly rounded, so an exact whole quotient comes back exact.',
      },
      {
        file: 'lib/calculators/cz-employer-cost/health.ts',
        snippet: 'const reduced = czk(Math.round((toCzkNumber(full) * days) / input.daysInMonth));',
        why:
          '§ 3 odst. 9 pro-rata of the health minimum by calendar days. Zero differences ' +
          'vs exact BigInt half-up across every minimum 10 000–40 000 Kč × month length ' +
          '28–31 × day count — 3,7 M cases, including the 100 722 that land exactly on a ' +
          'half.',
      },
      {
        file: 'lib/calculators/cz-employer-cost/health.ts',
        snippet: 'return czk(Math.ceil(korunas / 3));',
        why: 'Integer ÷ 3. Zero differences vs BigInt over 0–500 000 Kč.',
      },
      {
        file: 'lib/calculators/cz-employer-cost/additional-costs.ts',
        snippet: 'monthlyAllocatedRunRate: Math.floor(annualTotal / 12) as Halere,',
        why: 'Integer ÷ 12 in haléře. Zero differences vs BigInt over 0–5 000 000.',
      },
      {
        file: 'lib/calculators/cz-employer-cost/employer-insurance.ts',
        snippet: 'const scaled = Math.round(ratePerMille * 100);',
        why:
          'Deliberate float→integer normalisation: a per-mille rate with at most two ' +
          'decimals becomes hundredths of a per mille, after which everything is exact. ' +
          'Zero differences vs BigInt for every two-decimal rate 0,00–200,00. KNOWN LIMIT: ' +
          'a user-typed rate with THREE decimals loses the third (0,145 ‰ is applied as ' +
          '0,140 ‰ — 0,50 Kč per 100 000 Kč of base per quarter). No decreed rate has ' +
          'three decimals; validation admits one, so this is an out-of-domain input, ' +
          'recorded rather than silently tolerated.',
      },
    ];

    const FLOAT_ROUNDING = /\bMath\.(round|ceil|floor)\s*\(|\.toFixed\s*\(/;
    const violations: string[] = [];
    const used = new Set<number>();

    for (const engine of ENGINES) {
      for (const file of sourceFiles(engine.dir)) {
        if (/\.test\.tsx?$/.test(file)) continue;
        const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
        // Replace block comments with their own newlines so reported line
        // numbers still point at the real line.
        const code = src
          .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ''))
          .replace(/(^|[^:])\/\/.*$/gm, '$1');
        for (const [i, raw] of code.split('\n').entries()) {
          const line = raw.trim();
          if (!FLOAT_ROUNDING.test(line)) continue;
          // WHOLE-LINE match, not a prefix. `startsWith` let an exempt line be
          // extended with new, unreviewed rounding — `const perHour = Math.ceil(x)`
          // would also exempt `const perHour = Math.ceil(x) + Math.round(y)`,
          // which is exactly the guarantee the comment above claims to give.
          const idx = EXEMPT.findIndex((e) => e.file === file && line === e.snippet);
          if (idx === -1) violations.push(`${file}:${i + 1} ${line}`);
          else used.add(idx);
        }
      }
    }

    expect(violations, violations.join('\n')).toEqual([]);

    // The baseline only shrinks. A stale entry is cover for future code.
    const stale = EXEMPT.filter((_, i) => !used.has(i)).map((e) => `${e.file}: ${e.snippet}`);
    expect(stale, `exemptions that no longer match anything:\n${stale.join('\n')}`).toEqual([]);

    // And nothing in the German engine may be exempt at all.
    expect(EXEMPT.filter((e) => e.file.includes('de-employer-cost'))).toEqual([]);
  });
});
