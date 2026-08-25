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
      /\{problems\.length > 0 \? \(/.test(COMPONENT),
      'the message list is not the first branch',
    ).toBe(true);
    expect(
      /\) : outcome === null \? \(\s*\/\*[\s\S]*?\*\/\s*<p className="ecc__empty">/.test(COMPONENT),
      'the empty-state message is not guarded by the absence of field errors',
    ).toBe(true);
  });

  it('both error layers render into one list, so simultaneous faults are all visible', () => {
    // Parse failures and engine validation issues used to be rendered by
    // mutually exclusive branches: one unreadable field nulled `outcome`, so
    // validateDeInput never ran and its messages appeared NOWHERE. With a bad
    // accident amount, a 99 % Zusatzbeitrag and 25 children entered at once,
    // the reader was shown one of the three.
    expect(/const problems = useMemo/.test(COMPONENT), 'the merged list is gone').toBe(true);
    expect(
      /validateDeInput\(candidate\)/.test(COMPONENT),
      'the fields that parsed are no longer validated when another field fails',
    ).toBe(true);
  });

  it('every message is programmatically tied to the control it is about', () => {
    // Not one input carried aria-invalid or aria-describedby: the messages sat
    // in a live region with no relationship to the field at fault, so a screen
    // reader user sitting on the offending control was told nothing at all.
    expect(/id=\{`decc-err-\$\{p\.control\}`\}/.test(COMPONENT), 'messages carry no anchor').toBe(true);
    const described = COMPONENT.match(/aria-describedby=\{errorId\('[a-z0-9]+'\)\}/g) ?? [];
    const invalid = COMPONENT.match(/aria-invalid=\{invalid\('[a-z0-9]+'\)\}/g) ?? [];
    expect(described.length, 'too few controls point at their message').toBeGreaterThanOrEqual(9);
    expect(invalid.length, 'too few controls report their invalid state').toBe(described.length);
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
    // BOTH the lookup AND the render, because the two can drift apart: the
    // maps kept being referenced in the memo while the <strong> that shows
    // their result was deleted from the list, and a grep for the map name
    // passed on a page that named no field at all.
    expect(/ERROR_FIELD\[key\]/.test(COMPONENT), 'parse errors do not look up their field').toBe(true);
    expect(
      /ISSUE_FIELD\[i\.field\]/.test(COMPONENT),
      'engine validation issues do not look up their field',
    ).toBe(true);
    expect(
      /<strong>\{tr\(p\.field\)\}:<\/strong>/.test(COMPONENT),
      'the message list renders no field name',
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

  it('the result wrappers are named landmarks and not scroll containers', () => {
    // The pair went together: `overflow-x: auto` made axe demand
    // `tabIndex={0}`, and the overflow it guarded against never happened — the
    // table is width:100% over wrappable cells, so its box tracks the
    // container. What the pair did produce was two tab stops that go nowhere,
    // one of which scrolled a full-height container under the cookie banner at
    // 280px. Both halves must stay gone, together.
    expect(/ecc__table-wrap" role="region"/.test(COMPONENT), 'the wrappers lost their landmark role').toBe(true);
    expect(/ecc__table-wrap" tabIndex/.test(COMPONENT), 'a dead tab stop is back on the wrapper').toBe(false);
    expect(
      /\.ecc--de \.ecc__table-wrap \{[^}]*overflow-x/.test(CSS),
      'the wrapper declares an overflow it does not need',
    ).toBe(false);
  });
});

describe('the calculator is reachable, and only one language control claims to be one', () => {
  const HEADER = fs.readFileSync(path.join(ROOT, 'components/Header.tsx'), 'utf8');
  const PAGE = fs.readFileSync(
    path.join(ROOT, 'pages/kalkulacka-nakladu-zamestnavatele-nemecko.tsx'),
    'utf8',
  );

  it('the Czech route does not render the legacy switcher beside the real one', () => {
    // Two controls sat side by side there and the one that LOOKS like the
    // language switcher was the one that could not change the language: it
    // swaps `data-i18n` text in place, so on a page whose body is a
    // locale-fixed React island it translated the navigation and the footer
    // around a calculator that stayed Czech — 269 characters, none of them in
    // the tool — and set html lang="de" on a Czech document.
    expect(PAGE).toMatch(/legacyLanguage=\{false\}/);
    expect(HEADER).toMatch(/locale \|\| !legacyLanguage \? null :/);
  });

  it('the header renders the calculators as a group rather than one slot', () => {
    // The Germany calculator shipped with one inbound link on the whole site.
    // Two more flat nav items do not fit — 53-64px of slack at 1280-1440 — so
    // the wage calculator's slot became a group holding all three.
    expect(HEADER).toMatch(/target\.key === 'calc' \? calculatorGroup\(\)/);
    expect(HEADER).toMatch(/CALCULATOR_TARGETS\.map/);
  });
});
