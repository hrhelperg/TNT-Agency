import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * THE PRODUCT SUPPORT BOUNDARY, STATED AND ENFORCED.
 *
 *   FRAMEWORK TARGET       Next compiles against its own MODERN_BROWSERSLIST_TARGET
 *                          when a project declares no browserslist:
 *                          chrome 64, edge 79, firefox 67, opera 51, safari 12.
 *
 *   CALCULATOR REQUIREMENT The German employer-cost calculator needs native
 *                          BigInt. The BMF Programmablaufplan squares a
 *                          six-decimal intermediate, which passes 2^53, so no
 *                          Number implementation of the tariff is exact. BigInt
 *                          arrived in chrome 67, edge 79, firefox 68, opera 54,
 *                          safari 14 — later than four of the five targets.
 *
 *   SUPPORT BOUNDARY       ONLY THIS CALCULATOR requires a BigInt-capable
 *                          browser. The other 276 routes are unaffected and the
 *                          site's global target is unchanged. That distinction
 *                          is load-bearing and is asserted below.
 *
 *   FALLBACK               components/DeEmployerCostCalculatorBoundary.tsx tests
 *                          the capability with `typeof` and loads the
 *                          arithmetic chunk only if it exists. On a browser
 *                          without BigInt the chunk is never requested, a
 *                          localized notice appears, and the methodology,
 *                          sources and prose stay on the page. No approximate
 *                          result is ever produced.
 *
 * WHY THIS FILE WAS REWRITTEN
 * ───────────────────────────
 * Its first version ran `npx browserslist` and passed. That measured a list the
 * build never consults: with nothing declared, browserslist resolves `defaults`
 * (chrome 109+, safari 26+) while Next uses its own, much older, target. The
 * gate asserted a property of the wrong list and reported "supported" because a
 * local browserslist configuration did not exist. It now reads Next's target,
 * and a negative control below proves it can still tell supported from not.
 */

const ROOT = path.join(__dirname, '..', '..', '..');
const BUILD = path.join(ROOT, '.next');
const CHUNKS = path.join(BUILD, 'static/chunks');

/** First version with BigInt, by browserslist key. */
const BIGINT_SINCE: Record<string, number> = {
  chrome: 67, and_chr: 67, android: 67, edge: 79, firefox: 68, and_ff: 68,
  safari: 14, ios_saf: 14, opera: 54, op_mob: 48, samsung: 9,
};
/** Browsers with no BigInt in any shipping version. */
const NO_BIGINT_EVER = new Set(['ie', 'ie_mob', 'op_mini', 'bb', 'kaios', 'and_uc', 'and_qq', 'baidu']);

/** The four targets that cannot run the calculator, accepted with reasons. */
const ACCEPTED_WITHOUT_BIGINT: Record<string, string> = {
  'chrome 64': 'Released January 2018; BigInt arrived in Chrome 67 four months later. Negligible residual share, and the page still serves its prose and now says plainly that the calculator needs a newer browser.',
  'firefox 67': 'Released May 2019; BigInt arrived in Firefox 68 the following month. Negligible residual share, and the fallback notice covers it.',
  'opera 51': 'Chromium 64 under another name, superseded by Opera 54 in 2018. Negligible residual share, and the fallback notice covers it.',
  'safari 12':
    'The one with real residual usage — iOS 12, on hardware that can no longer update. It is also where the cost was worst before the boundary existed: the form rendered and ignored every keystroke. It now shows the localized notice instead, and the methodology and sources remain.',
};

/** Next's actual compile target, read from Next itself. */
function nextTarget(): string[] {
  const { createRequire } = require('node:module') as typeof import('node:module');
  const req = createRequire(__filename);
  const { MODERN_BROWSERSLIST_TARGET } = req('next/dist/shared/lib/constants') as {
    MODERN_BROWSERSLIST_TARGET: string[];
  };
  return MODERN_BROWSERSLIST_TARGET;
}

/**
 * Which of the given targets lack a capability.
 *
 * Parameterised on the capability so the negative control can drive it with
 * something other than BigInt — a gate that only ever asks one question cannot
 * demonstrate it is asking it properly.
 */
function targetsLacking(
  targets: readonly string[],
  since: Record<string, number>,
  never: ReadonlySet<string>,
): string[] {
  const out: string[] = [];
  for (const entry of targets) {
    const [name, versionRange] = entry.split(' ');
    // `never` is checked FIRST: an unparseable version ("all", as op_mini
    // reports) must not skip a browser already known to lack the capability.
    if (never.has(name)) { out.push(entry); continue; }
    const version = Number(String(versionRange).split('-')[0]);
    if (!Number.isFinite(version)) { out.push(`${entry} (unparseable version)`); continue; }
    const first = since[name];
    if (first === undefined) { out.push(`${entry} (unknown engine)`); continue; }
    if (version < first) out.push(entry);
  }
  return out.sort();
}

describe('the gate reads the target the BUILD uses', () => {
  it('Next exposes a target, and it is not empty', () => {
    expect(nextTarget().length).toBeGreaterThan(0);
  });

  it('no browserslist is declared, so Next’s own target governs', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')) as {
      browserslist?: unknown;
    };
    expect(
      pkg.browserslist,
      'a browserslist is now declared — Next would use it instead, and this gate must be re-pointed',
    ).toBeUndefined();
    expect(fs.existsSync(path.join(ROOT, '.browserslistrc'))).toBe(false);
  });
});

describe('negative control — the gate can tell supported from unsupported', () => {
  const target = nextTarget();

  it('reports NOTHING lacking for a capability every target has', () => {
    // Array.prototype.includes: chrome 47, edge 14, firefox 43, opera 34,
    // safari 9 — older than every target, so the honest answer is an empty list.
    const OLD = { chrome: 47, edge: 14, firefox: 43, opera: 34, safari: 9 };
    expect(targetsLacking(target, OLD, new Set())).toEqual([]);
  });

  it('reports EVERY target lacking for a capability none of them has', () => {
    // A capability newer than anything shipped. If the gate returned [] here it
    // would be incapable of ever failing, which is exactly how its first
    // version passed.
    const FUTURE = { chrome: 9999, edge: 9999, firefox: 9999, opera: 9999, safari: 9999 };
    expect(targetsLacking(target, FUTURE, new Set()).length).toBe(target.length);
  });

  it('does not let an unparseable version smuggle a browser through', () => {
    const withOpMini = [...target, 'op_mini all'];
    expect(targetsLacking(withOpMini, BIGINT_SINCE, NO_BIGINT_EVER)).toContain('op_mini all');
  });
});

describe('the BigInt requirement, measured against that target', () => {
  it('the set of targets that cannot run the calculator is exactly the recorded one', () => {
    expect(targetsLacking(nextTarget(), BIGINT_SINCE, NO_BIGINT_EVER)).toEqual(
      Object.keys(ACCEPTED_WITHOUT_BIGINT).sort(),
    );
  });

  it('each accepted browser carries a reason and a description of what it gets instead', () => {
    for (const [name, why] of Object.entries(ACCEPTED_WITHOUT_BIGINT)) {
      expect(why.length, `${name} has no stated reason`).toBeGreaterThan(80);
    }
  });
});

/**
 * The blast radius. Two signals, because neither is reliable alone on minified
 * output: the literal pattern fires inside Czech strings ("48násobek" minifies
 * to "48n\xe1sobek"), and the identifier alone would flag the bootstrap chunk,
 * whose only mention of BigInt is the `typeof` test that must stay in the
 * initial bundle.
 */
function stripJsStrings(src: string): string {
  let out = '';
  let i = 0;
  let quote: string | null = null;
  while (i < src.length) {
    const c = src[i];
    if (quote) {
      if (c === '\\') { i += 2; continue; }
      if (c === quote) { quote = null; out += ' '; }
      i++;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; i++; continue; }
    out += c;
    i++;
  }
  return out;
}
const BIGINT_LITERAL = /(?<![A-Za-z0-9_$.])\d+n(?![A-Za-z0-9_$])/;
const carriesBigInt = (src: string) =>
  /\bBigInt\s*\(/.test(src) && BIGINT_LITERAL.test(stripJsStrings(src));

describe.skipIf(!fs.existsSync(CHUNKS))('only this calculator requires BigInt', () => {
  const bigintChunks = () => {
    const out: string[] = [];
    const walk = (dir: string) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walk(full);
        else if (e.name.endsWith('.js') && carriesBigInt(fs.readFileSync(full, 'utf8'))) {
          out.push(path.relative(CHUNKS, full));
        }
      }
    };
    walk(CHUNKS);
    return out;
  };

  it('the arithmetic lives in a chunk no page loads initially', () => {
    const chunks = bigintChunks();
    expect(chunks.length, 'no chunk carries BigInt — has the engine stopped shipping?').toBeGreaterThan(0);

    const manifest = JSON.parse(
      fs.readFileSync(path.join(BUILD, 'build-manifest.json'), 'utf8'),
    ) as { pages: Record<string, string[]> };

    const offenders: string[] = [];
    for (const [page, files] of Object.entries(manifest.pages)) {
      for (const f of files) {
        if (chunks.some((c) => f.endsWith(c))) offenders.push(`${page} -> ${f}`);
      }
    }
    expect(offenders, 'a BigInt chunk is in an INITIAL page bundle — the fallback cannot work').toEqual([]);
  });

  it('the bootstrap that guards it contains no BigInt syntax of its own', () => {
    // The guard has to parse on the browsers it protects. It may NAME BigInt —
    // `typeof BigInt === 'function'` is the whole point — but a literal would
    // make it unparseable exactly where it is needed.
    for (const rel of [
      'components/DeEmployerCostCalculatorBoundary.tsx',
      'lib/calculators/de-employer-cost/unsupported-browser.ts',
      'lib/calculators/de-employer-cost/display-facts.ts',
      'lib/calculators/de-employer-cost/copy.ts',
    ]) {
      const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
      expect(BIGINT_LITERAL.test(stripJsStrings(src)), `${rel} contains a BigInt literal`).toBe(false);
      expect(/\bBigInt\s*\(/.test(src), `${rel} CALLS BigInt`).toBe(false);
    }
  });
});
