import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Rendering rules that no engine test can see.
 *
 * These are source assertions, in the same spirit as the privacy gate: the
 * behaviour lives in JSX, the failure is what a reader is told, and a unit test
 * over the engine cannot reach it. Each one is here because it was WRONG in a
 * shipped candidate, not because the shape looked risky.
 */

const ROOT = path.join(__dirname, '..', '..', '..');
const COMPONENT = fs.readFileSync(
  path.join(ROOT, 'components/DeEmployerCostCalculator.tsx'),
  'utf8',
);

describe('a refusal never carries a false explanation', () => {
  it('the empty-state line appears only when no field is at fault', () => {
    // RESULT.empty says "enter a monthly gross". `outcome` is null for ANY
    // unreadable field, so rendering it unconditionally told a reader who had
    // typed a perfectly good gross and a bad accident-insurance amount to enter
    // a gross — naming the one field on screen that was correct.
    expect(
      /parsed\.errors\.length === 0 \? \(\s*<p className="ecc__empty">/.test(COMPONENT),
      'the empty-state message is not guarded by the absence of field errors',
    ).toBe(true);
  });

  it('every field error is rendered with the name of its field — on BOTH refusal paths', () => {
    // The messages describe a SHAPE ("an amount in euro") and the form has four
    // amount fields. Without the label the reader gets a puzzle.
    //
    // BOTH PATHS, because the first version of this test asserted only the
    // first and its title claimed all of them. Parse errors and engine
    // validation issues render into the same list and look identical to a
    // reader, but only the parse half named its field: an accident-insurance
    // amount of 200000000 produced the bare sentence "Please enter a monthly
    // amount below 100 million euro." with four monthly amounts on screen.
    expect(/ERROR_FIELD\[key\]/.test(COMPONENT), 'parse errors do not name their field').toBe(true);
    expect(
      /ISSUE_FIELD\[i\.field\]/.test(COMPONENT),
      'engine validation issues do not name their field',
    ).toBe(true);
  });

  it('every issue a validator can emit has a field label to render', () => {
    // Otherwise the fallback fires and the reader is told the wrong field is at
    // fault, which is worse than telling them none.
    const VALIDATION = fs.readFileSync(
      path.join(ROOT, 'lib/calculators/de-employer-cost/validation.ts'),
      'utf8',
    );
    const COPY = fs.readFileSync(
      path.join(ROOT, 'lib/calculators/de-employer-cost/copy.ts'),
      'utf8',
    );
    const fields = new Set(
      Array.from(VALIDATION.matchAll(/issues\.push\(\{\s*field:\s*'([^']+)'/g), (m) => m[1]),
    );
    // checkRate is called with the field name as a positional argument.
    // checkRate takes the field name positionally, on one line or several.
    for (const m of VALIDATION.matchAll(/checkRate\(\s*issues,\s*'([^']+)'/g)) fields.add(m[1]);
    for (const m of VALIDATION.matchAll(/checkRate\(\s*\n\s*issues,\s*\n\s*'([^']+)'/g)) fields.add(m[1]);
    // Named explicitly so this cannot pass by finding nothing: the multi-line
    // checkRate call is the one a single-line regex misses, and a test that
    // silently stops seeing a field reads exactly like a test that passes.
    for (const known of [
      'monthlyGrossCent', 'steuerklasse', 'kinderfreibetraege', 'workplace',
      'healthSupplementPercent', 'care.childrenUnder25', 'employer.u1Percent',
      'employer.u2Percent', 'employer.accidentMonthlyCent',
    ]) {
      expect(fields.has(known), `the scan stopped finding '${known}'`).toBe(true);
    }
    expect(fields.size, 'no validation fields found — has validation.ts moved?').toBeGreaterThan(4);
    const labelled = new Set(
      Array.from(
        COPY.slice(COPY.indexOf('export const ISSUE_FIELD')).matchAll(/^\s{2}'?([A-Za-z0-9._]+)'?:/gm),
        (m) => m[1],
      ),
    );
    for (const f of fields) {
      expect(labelled.has(f), `ValidationIssue field '${f}' has no entry in ISSUE_FIELD`).toBe(true);
    }
  });
});

describe('the result table reflows rather than scrolling on a phone', () => {
  const CSS = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');

  it('carries a narrow-viewport reflow scoped to this calculator', () => {
    // The horizontal-scroll container was the wrong answer: at 320 px it gave
    // 15 px of scroll, the first column was not sticky, and the shared
    // `th { min-width: 0; overflow-wrap: anywhere }` collapsed the label column
    // to 20 px so "Rentenversicherung" became a vertical stack of letters.
    const block = CSS.slice(CSS.indexOf('@media (max-width: 480px)'));
    expect(block.length, 'no narrow-viewport block found').toBeGreaterThan(200);
    expect(block).toMatch(/\.ecc--de \.ecc__table[\s\S]*display: block/);
    expect(block).toMatch(/content: attr\(data-label\)/);
    expect(block).toMatch(/overflow-wrap: normal/);
    // Scoped: the shared rules belong to the Czech calculator too.
    const narrowRules = block.split('}').filter((r) => r.includes('.ecc__table'));
    for (const r of narrowRules) {
      expect(r, `an unscoped narrow rule: ${r.trim().slice(0, 70)}`).toContain('.ecc--de');
    }
  });

  it('labels both figure columns so a stacked row still says whose share it is', () => {
    expect(/data-label=\{tr\(RESULT\.employerShare\)\}/.test(COMPONENT)).toBe(true);
    expect(/data-label=\{tr\(RESULT\.employeeShare\)\}/.test(COMPONENT)).toBe(true);
  });

  it('keeps the scroll region keyboard-reachable where it still scrolls', () => {
    expect(/className="ecc__table-wrap" tabIndex=\{0\} role="region"/.test(COMPONENT)).toBe(true);
  });
});
