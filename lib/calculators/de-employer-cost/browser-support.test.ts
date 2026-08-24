import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * This calculator is the first thing on the site to ship BigInt to a browser.
 *
 * WHY IT DOES
 * ───────────
 * The exact-decimal module is built on bigint because the Programmablaufplan is
 * specified in Java BigDecimal, whose intermediates exceed 2^53 the moment a
 * division asks for scale. Numbers cannot carry it. So the dependency is real
 * and is not going to be refactored away for the sake of browsers that predate
 * it.
 *
 * WHAT THAT COSTS, STATED RATHER THAN ASSUMED
 * ───────────────────────────────────────────
 * BigInt LITERALS are syntax. A browser without BigInt does not fail the
 * calculator — it fails to parse the whole chunk, so nothing in that chunk
 * runs. Two facts make that acceptable here, and both are asserted below rather
 * than believed:
 *
 *   1. BLAST RADIUS. The chunk is loaded by the three German-calculator routes
 *      and by nothing else. No pre-existing page can be taken down by it.
 *   2. TARGET. The resolved browserslist contains no browser that lacks BigInt,
 *      except the explicitly-listed exceptions below.
 *
 * On a browser that cannot parse it the page still serves its
 * server-rendered prose, which is the same behaviour the no-JS test already
 * pins. The form would render inert, which is worse than absent — recorded here
 * as the known cost rather than discovered later.
 *
 * WHY A TEST AND NOT A COMMENT
 * ────────────────────────────
 * Because the only automated signal that this was happening was `tsconfig
 * target: es5`, which made `tsc` reject BigInt literals outright — and this
 * branch raised the target to es2020 to let them compile. That removed the
 * warning. This restores one that says what is actually true.
 */

const ROOT = path.join(__dirname, '..', '..', '..');
const BUILD = path.join(ROOT, '.next');

/** Browsers with no BigInt in any shipping version. */
const NO_BIGINT_EVER = new Set(['ie', 'ie_mob', 'op_mini', 'bb', 'kaios', 'and_uc', 'and_qq', 'baidu']);
/** First version with BigInt, by browserslist key. */
const BIGINT_SINCE: Record<string, number> = {
  chrome: 67, and_chr: 67, android: 67, edge: 79, firefox: 68, and_ff: 68,
  safari: 14, ios_saf: 14, opera: 54, op_mob: 48, samsung: 9,
};

/**
 * Known exceptions, each a deliberate decision rather than an oversight.
 * Adding one is a claim that the audience does not matter for this page.
 */
const ACCEPTED_WITHOUT_BIGINT: Record<string, string> = {
  'chrome 64': 'Released January 2018; BigInt arrived in Chrome 67, four months later. Residual share is negligible and the page still serves its prose.',
  'firefox 67': 'Released May 2019; BigInt arrived in Firefox 68 the following month. Negligible residual share.',
  'opera 51': 'Chromium 64 under a different name, and superseded by Opera 54 in 2018. Negligible residual share.',
  'safari 12':
    'The one with real residual usage — iOS 12, released 2018, on hardware that can no longer update. ' +
    'It is also the one where the cost is clearest: the form renders and does not respond. Accepted ' +
    'because the alternative fixes three pages by breaking the other 276 on the same browsers.',
};

describe.skipIf(!fs.existsSync(BUILD))('BigInt reaches only the pages that need it', () => {
  const chunkDir = path.join(BUILD, 'static/chunks');

  const bigintChunks = () => {
    const out: string[] = [];
    const walk = (dir: string) => {
      if (!fs.existsSync(dir)) return;
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walk(full);
        else if (e.name.endsWith('.js')) {
          const src = fs.readFileSync(full, 'utf8');
          // Keyed on the `BigInt` identifier, not on an `\d+n` literal pattern.
          // Minified bundles are full of byte sequences that look like BigInt
          // literals and are not — three unrelated chunks matched that pattern
          // — and every path into this arithmetic goes through the identifier.
          if (/\bBigInt\b/.test(src)) out.push(path.relative(chunkDir, full));
        }
      }
    };
    walk(chunkDir);
    return out;
  };

  it('is confined to the three German-calculator routes', () => {
    const manifest = JSON.parse(
      fs.readFileSync(path.join(BUILD, 'build-manifest.json'), 'utf8'),
    ) as { pages: Record<string, string[]> };

    const chunks = bigintChunks();
    expect(chunks.length, 'no chunk carries BigInt — has the engine stopped shipping?').toBeGreaterThan(0);

    const carriers = new Set<string>();
    for (const [page, files] of Object.entries(manifest.pages)) {
      if (files.some((f) => chunks.some((c) => f.includes(c)))) carriers.add(page);
    }

    expect([...carriers].sort()).toEqual([
      '/de/arbeitgeberkosten-rechner-deutschland',
      '/en/germany-employer-cost-calculator',
      '/kalkulacka-nakladu-zamestnavatele-nemecko',
    ]);
  });
});

describe('the browser floor is stated, not assumed', () => {
  /**
   * THE TARGET IS NEXT'S, NOT BROWSERSLIST'S.
   *
   * The first version of this gate ran `npx browserslist` and passed. That was
   * measuring the wrong thing: browserslist with no configuration resolves
   * `defaults` (chrome 109+, safari 26+), but Next IGNORES that when the project
   * declares nothing and compiles against its own MODERN_BROWSERSLIST_TARGET.
   * The gate therefore asserted a property of a list the build never consulted,
   * and passed vacuously.
   *
   * Next's actual target is chrome 64, edge 79, firefox 67, opera 51, safari 12.
   * BigInt arrived in chrome 67, edge 79, firefox 68, opera 54, safari 14. So
   * FOUR of the five targeted browsers cannot parse the calculator's chunk.
   *
   * That is recorded here rather than hidden, because it is a real and knowing
   * limitation:
   *
   *   • the chunk is loaded by the three calculator routes and nothing else, so
   *     no other page on the site is affected — asserted above;
   *   • on those browsers the page still serves its full server-rendered prose,
   *     which is the substance and what a crawler reads;
   *   • the form renders and does not respond, which is worse than absent and is
   *     the actual cost.
   *
   * The alternatives were weighed and rejected. Removing BigInt is not possible:
   * the Programmablaufplan's intermediates exceed 2^53 (the tariff carries Y to
   * six places and squares it). Declaring a modern browserslist would fix these
   * three pages by dropping the other 276 off the same browsers. Loading the
   * calculator behind a BigInt guard would work but makes the form client-only
   * for everyone, a real regression for ~99.9 % to serve ~0.1 %.
   *
   * So the gate's job is to keep the exposure from GROWING: the set of targeted
   * browsers without BigInt must stay exactly this, and the chunk must stay
   * confined to these three routes.
   */
  const EXPECTED_WITHOUT_BIGINT = ['chrome 64', 'firefox 67', 'opera 51', 'safari 12'];

  const nextTarget = (): string[] => {
    const { createRequire } = require('node:module') as typeof import('node:module');
    const req = createRequire(__filename);
    const { MODERN_BROWSERSLIST_TARGET } = req('next/dist/shared/lib/constants') as {
      MODERN_BROWSERSLIST_TARGET: string[];
    };
    return MODERN_BROWSERSLIST_TARGET;
  };

  it('reads the target the BUILD uses, and it is not empty', () => {
    const target = nextTarget();
    expect(target.length, 'Next exposed no browser target').toBeGreaterThan(0);
    // If Next ever starts honouring a declared browserslist, this is where that
    // shows up — the two must agree or the gate is measuring the wrong list again.
    const declared = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'),
    ) as { browserslist?: unknown };
    expect(
      declared.browserslist,
      'a browserslist is now declared — this gate must be re-pointed at it, because Next would then use it',
    ).toBeUndefined();
  });

  it('the set of targeted browsers without BigInt is exactly the recorded one', () => {
    const failures: string[] = [];
    for (const entry of nextTarget()) {
      const [name, versionRange] = entry.split(' ');
      const version = Number(String(versionRange).split('-')[0]);
      // NO_BIGINT_EVER is checked FIRST: an unparseable version ("all", as
      // op_mini reports) must not skip a browser this file already declares has
      // no BigInt in any version.
      if (NO_BIGINT_EVER.has(name)) {
        failures.push(entry);
        continue;
      }
      if (!Number.isFinite(version)) {
        failures.push(`${entry} (unparseable version — cannot be shown to support BigInt)`);
        continue;
      }
      const since = BIGINT_SINCE[name];
      if (since === undefined) {
        failures.push(`${entry} (unknown engine — no BigInt data)`);
        continue;
      }
      if (version < since) failures.push(entry);
    }
    expect(failures.sort()).toEqual([...EXPECTED_WITHOUT_BIGINT].sort());
  });

  it('records what that costs and why it is accepted', () => {
    for (const [name, why] of Object.entries(ACCEPTED_WITHOUT_BIGINT)) {
      expect(why.length, `${name} has no stated reason`).toBeGreaterThan(60);
    }
  });
});
