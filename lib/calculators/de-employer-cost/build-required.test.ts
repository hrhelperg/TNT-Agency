import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Several gates can only assert against the BUILT output — the hreflang cluster,
 * the rendered claims, the BigInt blast radius. Each of those uses
 * `describe.skipIf(!fs.existsSync(BUILD))`, which is right: `npm test` should
 * not require a build to run at all.
 *
 * The danger is that skipping is INVISIBLE. A green run with no build looks
 * identical to a green run with one, so a release could be waved through on the
 * strength of assertions that never executed — and this repository has no
 * script that builds before the unit suite.
 *
 * So the skip is made loud here, once, rather than in each file: without a
 * build the suite fails unless somebody has said in so many words that they are
 * running the unit tests only.
 *
 *     npm test                          → requires .next
 *     SKIP_BUILD_ASSERTIONS=1 npm test  → unit only, and says so
 */

const BUILD = path.join(__dirname, '..', '..', '..', '.next/server/pages');

describe('the build-dependent assertions are not silently skipped', () => {
  it('has a build, or an explicit acknowledgement that there is none', () => {
    if (fs.existsSync(BUILD)) return;
    expect(
      process.env.SKIP_BUILD_ASSERTIONS,
      'No .next build is present, so the hreflang, rendered-claim and BigInt-blast-radius ' +
        'assertions did NOT run. Run `npm run build` first, or set SKIP_BUILD_ASSERTIONS=1 to ' +
        'state deliberately that this is a unit-only run.',
    ).toBe('1');
  });
});
