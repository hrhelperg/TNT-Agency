import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { alternatesFor, LOCALE_HREFLANG, X_DEFAULT_ROUTE } from '../../locale/registry';

/**
 * The Germany cluster advertises itself.
 *
 * Google's requirement is explicit: each localized version must list ITSELF and
 * every other language version. A cluster missing its self-reference, or
 * pointing one way only, is ambiguous and may simply be disregarded — which
 * would leave three pages competing rather than one being chosen per language.
 *
 * WHY THIS TEST EXISTS EVEN THOUGH NOTHING WAS BROKEN
 * ──────────────────────────────────────────────────
 * A review pass reported the self-reference missing. It was not: the probe used
 * `hreflang="([a-z-]+)"`, which is lowercase-only, and `cs-CZ` carries an
 * uppercase region subtag. The property held by construction and the report was
 * an artefact of how it was measured.
 *
 * The lesson is not "the reviewer was careless" — it is that the property was
 * resting on nobody having looked wrongly at it. So it rests on a gate now. The
 * assertions below deliberately compare against the registry rather than
 * against a hand-written list of expected tags, because a hand-written list is
 * the same kind of artefact as the regex was.
 */

const ROOT = path.join(__dirname, '..', '..', '..');

const CONCEPT = {
  cs: '/kalkulacka-nakladu-zamestnavatele-nemecko',
  en: '/en/germany-employer-cost-calculator',
  de: '/de/arbeitgeberkosten-rechner-deutschland',
} as const;

describe('the registry produces a complete, reciprocal cluster', () => {
  it('every route in the cluster resolves to the same three alternates', () => {
    const expected = Object.entries(CONCEPT)
      .map(([locale, url]) => `${locale}:${url}`)
      .sort();
    for (const route of Object.values(CONCEPT)) {
      const got = alternatesFor(route)
        .map((a) => `${a.locale}:${a.url}`)
        .sort();
      expect(got, `alternates for ${route}`).toEqual(expected);
    }
  });

  it('each route appears in its own alternate list', () => {
    for (const [locale, url] of Object.entries(CONCEPT)) {
      const self = alternatesFor(url).find((a) => a.locale === locale);
      expect(self, `${url} does not list itself`).toBeTruthy();
      expect(self!.url, `${url} lists itself under the wrong URL`).toBe(url);
    }
  });

  it('the Germany cluster is disjoint from the Czechia cluster', () => {
    // The two exist one path segment apart under /de/. A cluster that leaked
    // across them would tell a search engine that German payroll and Czech
    // payroll are translations of each other.
    const germany = new Set(alternatesFor(CONCEPT.de).map((a) => a.url));
    const czechia = new Set(
      alternatesFor('/de/arbeitgeberkosten-rechner-tschechien').map((a) => a.url),
    );
    expect([...germany].filter((u) => czechia.has(u))).toEqual([]);
    expect(czechia.size).toBe(3);
  });
});

/**
 * The rendered proof. Skipped when there is no build, because `npm test` is
 * expected to run without one — but never silently: if the directory exists the
 * assertions run, and the repository's own gates build before validating.
 */
const BUILD = path.join(ROOT, '.next/server/pages');
const built = (route: string) =>
  fs.readFileSync(path.join(BUILD, `${route.replace(/^\//, '')}.html`), 'utf8');

describe.skipIf(!fs.existsSync(BUILD))('the built pages emit what the registry says', () => {
  const links = (route: string) =>
    Array.from(
      built(route).matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\s*\/?>/g),
      (m) => [m[1], m[2]] as const,
    );

  for (const [locale, route] of Object.entries(CONCEPT)) {
    it(`${route} lists all three languages, itself included`, () => {
      const emitted = links(route);
      const tags = emitted.map(([tag]) => tag);

      for (const [l, u] of Object.entries(CONCEPT)) {
        expect(emitted, `${route} omits the ${l} alternate`).toContainEqual([
          LOCALE_HREFLANG[l as keyof typeof LOCALE_HREFLANG],
          `https://talentpartnerid.com${u}`,
        ]);
      }

      // The self-reference, stated separately so a failure names it.
      expect(
        tags,
        `${route} does not carry its own hreflang (${LOCALE_HREFLANG[locale as 'cs' | 'en' | 'de']})`,
      ).toContain(LOCALE_HREFLANG[locale as 'cs' | 'en' | 'de']);

      expect(tags).toContain('x-default');
      expect(emitted.find(([t]) => t === 'x-default')![1]).toBe(
        `https://talentpartnerid.com${X_DEFAULT_ROUTE}`,
      );
    });
  }

  it('all three pages advertise an identical cluster', () => {
    const canonicalise = (route: string) =>
      links(route)
        .filter(([t]) => t !== 'x-default')
        .map(([t, u]) => `${t} ${u}`)
        .sort()
        .join('\n');
    const first = canonicalise(CONCEPT.cs);
    expect(canonicalise(CONCEPT.en), 'en differs from cs').toBe(first);
    expect(canonicalise(CONCEPT.de), 'de differs from cs').toBe(first);
    expect(first.split('\n')).toHaveLength(3);
  });

  it('each page is self-canonical', () => {
    for (const route of Object.values(CONCEPT)) {
      const m = /<link rel="canonical" href="([^"]+)"/.exec(built(route));
      expect(m?.[1], `${route} canonical`).toBe(`https://talentpartnerid.com${route}`);
    }
  });
});
