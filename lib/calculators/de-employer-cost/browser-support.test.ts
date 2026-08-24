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
  kaios:
    'KaiOS 2.5 is Firefox 48 and has no BigInt. It is a feature-phone platform with no plausible ' +
    'overlap with a German employer-cost calculator, and the page still serves its prose there.',
  and_uc:
    'UC Browser reports a product version, not an engine version; current builds are Chromium-based ' +
    'and do have BigInt. Listed because the version string cannot be checked mechanically.',
  and_qq:
    'QQ Browser, same reasoning as UC: the reported version is the product’s, and current builds are ' +
    'Chromium-based.',
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

describe('the build targets no browser that would fail to parse it', () => {
  it('every browserslist target supports BigInt, or is an accepted exception', async () => {
    // Resolved through browserslist itself rather than read from package.json,
    // because none is declared and the resolution is what actually governs the
    // emitted output.
    // Resolved by running browserslist itself, because none is declared in
    // package.json and the resolution is what actually governs the emitted
    // output. It is a nested dependency of Next rather than a direct one, so a
    // bare import does not find it — asking the CLI is both simpler and closer
    // to what the build does.
    let resolved: string[];
    try {
      const { execFileSync } = await import('node:child_process');
      resolved = execFileSync('npx', ['--no-install', 'browserslist'], {
        cwd: ROOT,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      })
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);
    } catch (err) {
      // Silently passing would be the failure mode this file exists to avoid.
      throw new Error(`browserslist did not resolve, so the browser-target claim cannot be checked: ${String(err)}`);
    }
    expect(resolved.length, 'browserslist resolved to nothing').toBeGreaterThan(5);

    const failures: string[] = [];
    for (const entry of resolved) {
      const [name, versionRange] = entry.split(' ');
      if (ACCEPTED_WITHOUT_BIGINT[name]) continue;
      const version = Number(String(versionRange).split('-')[0]);
      if (!Number.isFinite(version)) continue;
      if (NO_BIGINT_EVER.has(name)) {
        failures.push(`${entry} has no BigInt in any version`);
        continue;
      }
      const since = BIGINT_SINCE[name];
      if (since !== undefined && version < since) {
        failures.push(`${entry} lacks BigInt (needs >= ${since})`);
      }
    }
    expect(failures, failures.join('\n')).toEqual([]);
  });

  it('records why each exception is accepted', () => {
    for (const [name, why] of Object.entries(ACCEPTED_WITHOUT_BIGINT)) {
      expect(why.length, `${name} has no stated reason`).toBeGreaterThan(60);
    }
  });
});
