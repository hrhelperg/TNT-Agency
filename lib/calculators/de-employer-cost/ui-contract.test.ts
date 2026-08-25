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

  it('every field error is rendered with the name of its field', () => {
    // The messages describe a SHAPE ("an amount in euro") and the form has four
    // amount fields. Without the label the reader gets a puzzle.
    expect(/ERROR_FIELD\[key\]/.test(COMPONENT), 'field errors do not name their field').toBe(true);
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
