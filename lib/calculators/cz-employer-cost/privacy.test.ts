import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * §29 and §30 — the non-negotiable half of this calculator.
 *
 * What gets typed into this tool is a salary, a disability status, a ZTP/P card,
 * a family. Disability and ZTP/P are special-category data under GDPR Art. 9.
 *
 * This is not a hypothetical risk on this site. The agency payroll calculator
 * once base64'd its entire PayrollInput — taxProfile.disability, taxProfile.ztpp
 * and children[].ztpp included — into a `?d=` parameter behind a "copy link"
 * button. Base64 is encoding, not encryption. And the payload did not sit still:
 * WebmasterID's page_view transmits `url`, the full href, so merely OPENING a
 * shared link handed the blob to a third-party ingest endpoint.
 *
 * These tests read the SOURCE of the calculator's own files and fail if a
 * transmission, a storage write or a URL write is ever added back. Source
 * assertions rather than runtime ones, deliberately: a runtime test proves only
 * the paths it happened to exercise, while reading the source catches a `fetch`
 * added to a branch no test reaches.
 */

const ROOT = path.join(__dirname, '..', '..', '..');
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const COMPONENT = 'components/CzEmployerCostCalculator.tsx';
const ENGINE_DIR = 'lib/calculators/cz-employer-cost';

const ENGINE_FILES = [
  'engine.ts',
  'social.ts',
  'health.ts',
  'tax.ts',
  'employer-insurance.ts',
  'metrics.ts',
  'validation.ts',
  'additional-costs.ts',
  'formatting.ts',
  'copy.ts',
  'notes-copy.ts',
  'types.ts',
  'jurisdictions/cz/2026.ts',
  'jurisdictions/cz/ruleset.ts',
].map((f) => `${ENGINE_DIR}/${f}`);

const ALL = [COMPONENT, ...ENGINE_FILES, 'data/calculators/cz-employer-cost/2026/sources.ts'];

/** Strip comments so prose ABOUT `fetch` cannot fail a code assertion. */
const code = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

describe('the calculator transmits nothing', () => {
  const FORBIDDEN: Array<[string, RegExp]> = [
    ['fetch', /\bfetch\s*\(/],
    ['XMLHttpRequest', /XMLHttpRequest/],
    ['sendBeacon', /sendBeacon/],
    ['WebSocket', /\bWebSocket\b/],
    ['EventSource', /\bEventSource\b/],
    ['axios', /\baxios\b/],
    ['gtag', /\bgtag\s*\(/],
    ['dataLayer', /dataLayer/],
    ['WebmasterID', /webmaster|wmid/i],
    ['localStorage', /localStorage/],
    ['sessionStorage', /sessionStorage/],
    ['IndexedDB', /indexedDB/i],
    ['document.cookie', /document\s*\.\s*cookie/],
    ['history writes', /pushState|replaceState/],
    ['location assignment', /location\s*\.\s*(href|search|hash|assign|replace)\s*=/],
    ['URLSearchParams', /URLSearchParams/],
    ['btoa / atob', /\b(btoa|atob)\s*\(/],
    ['form action', /\baction\s*=/],
    ['form method', /\bmethod\s*=/],
  ];

  for (const file of ALL) {
    const src = code(read(file));
    for (const [label, re] of FORBIDDEN) {
      it(`${file} contains no ${label}`, () => {
        expect(re.test(src)).toBe(false);
      });
    }
  }
});

describe('the engine is pure', () => {
  it('reaches no browser global', () => {
    for (const file of ENGINE_FILES) {
      const src = code(read(file));
      expect(/\bwindow\b/.test(src), `${file} touches window`).toBe(false);
      expect(/\bdocument\b/.test(src), `${file} touches document`).toBe(false);
      expect(/\bnavigator\b/.test(src), `${file} touches navigator`).toBe(false);
    }
  });

  it('never reads the clock, so a 2026 result stays reproducible', () => {
    for (const file of ENGINE_FILES) {
      const src = code(read(file));
      expect(/Date\.now\s*\(/.test(src), `${file} calls Date.now()`).toBe(false);
      // `new Date(...)` with arguments is allowed — engine.ts uses it to count
      // the days in a given month, which is arithmetic on values the caller
      // supplied. Reading the CURRENT date is what must not happen.
      expect(/new Date\s*\(\s*\)/.test(src), `${file} reads the current date`).toBe(false);
    }
  });

  it('uses no randomness', () => {
    for (const file of ENGINE_FILES) {
      expect(/Math\.random/.test(code(read(file))), `${file}`).toBe(false);
    }
  });
});

describe('nothing financial or personal can reach a URL', () => {
  const src = code(read(COMPONENT));

  it('the component writes no query string and no fragment', () => {
    const hrefs = Array.from(src.matchAll(/href=\{?["']?([^"'}\s]+)/g), (m) => m[1]);
    for (const h of hrefs) {
      expect(h.includes('?'), `href ${h} carries a query string`).toBe(false);
      expect(h.includes('#'), `href ${h} carries a fragment`).toBe(false);
    }
  });

  it('submitting the form cannot serialise values into a URL', () => {
    expect(/onSubmit=\{\(e\)\s*=>\s*e\.preventDefault\(\)\}/.test(src)).toBe(true);
  });

  // Mechanisms, not the word. The user-facing copy legitimately contains
  // "the calculators share no data", and a gate that fires on its own
  // disclaimer is a gate people learn to ignore.
  it('offers no share or copy-link mechanism', () => {
    expect(/navigator\s*\.\s*share/.test(src)).toBe(false);
    expect(/navigator\s*\.\s*clipboard/.test(src)).toBe(false);
    expect(/writeText/.test(src)).toBe(false);
    expect(/execCommand/.test(src)).toBe(false);
  });

  // §39: the cross-link to Cost of Vacancy is allowed, and must carry nothing.
  it('the cross-link to Cost of Vacancy is a clean canonical path', () => {
    const literals = Array.from(src.matchAll(/'(\/[a-z/-]+)'/g), (m) => m[1]);
    for (const target of ['/cena-neobsazene-pozice', '/en/cost-of-vacancy', '/de/kosten-unbesetzter-stellen']) {
      expect(literals, `missing cross-link ${target}`).toContain(target);
    }
    for (const l of literals) {
      expect(l.includes('?'), `path ${l} carries a query string`).toBe(false);
      expect(l.includes('#'), `path ${l} carries a fragment`).toBe(false);
    }
  });
});

/**
 * The rule this suite was missing, and how it was found.
 *
 * A reviewer added a real tracking pixel to the results panel —
 * `<img src={beaconSrc} />` with `beaconSrc` assembled across several lines as
 * a third-party URL carrying net pay, gross pay, disability and ZTP/P — and
 * every one of the 315 assertions above passed, as did the repo's own
 * share-privacy gate. The sink list chased `fetch`, `XMLHttpRequest`,
 * `sendBeacon`; none of them covers an attribute that makes the browser issue
 * the request for you.
 *
 * Enumerating sinks is the wrong shape of rule: `src`, `srcSet`, `poster`,
 * `<link rel=preload>`, `background-image`, `new Image()`, a dynamically
 * inserted node — the list is open-ended and the next one is always the one
 * nobody listed. So the rule is inverted. A request can only leave for an
 * ORIGIN, and this component legitimately needs none: it renders one internal
 * link and nothing else. Any absolute URL in the file therefore fails,
 * regardless of which attribute or API would have carried it.
 */
describe('no external origin can be referenced at all', () => {
  const src = code(read(COMPONENT));

  it('contains no absolute URL', () => {
    const urls = Array.from(src.matchAll(/https?:\/\/[^\s'"`)]+/g), (m) => m[0]);
    expect(urls, `absolute URLs in the calculator: ${urls.join(', ')}`).toEqual([]);
  });

  it('contains no protocol-relative or bare-host reference', () => {
    expect(/["'`]\/\/[a-z0-9.-]+\./i.test(src), 'protocol-relative URL').toBe(false);
  });

  it('references no request-issuing attribute or API', () => {
    const SINKS: Array<[string, RegExp]> = [
      ['src attribute', /\bsrc\s*=/],
      ['srcSet', /\bsrcSet\b/i],
      ['poster', /\bposter\s*=/],
      ['<link> preload', /rel\s*=\s*["'{]?\s*(preload|prefetch|preconnect)/i],
      ['new Image()', /new\s+Image\s*\(/],
      ['background-image', /background-image/i],
      ['dynamic node insertion', /appendChild|insertBefore|insertAdjacent/],
      ['iframe', /<iframe/i],
      ['import()', /\bimport\s*\(/],
    ];
    for (const [label, re] of SINKS) {
      expect(re.test(src), `${label} is present in the calculator`).toBe(false);
    }
  });

  // The same rule for the engine: it is pure, so it needs no origin either.
  it('the engine references no origin', () => {
    for (const file of ENGINE_FILES) {
      const s = code(read(file));
      const urls = Array.from(s.matchAll(/https?:\/\/[^\s'"`)]+/g), (m) => m[0]);
      expect(urls, `${file} references ${urls.join(', ')}`).toEqual([]);
    }
  });

  // The source registry is the ONE place URLs belong — they are citations, and
  // they are never fetched. Asserted rather than assumed, so the exemption
  // cannot quietly widen.
  it('only the source registry carries URLs, and only as citations', () => {
    const registry = read('data/calculators/cz-employer-cost/2026/sources.ts');
    expect(/https?:\/\//.test(registry)).toBe(true);
    for (const [label, re] of [
      ['fetch', /\bfetch\s*\(/],
      ['src attribute', /\bsrc\s*=/],
      ['new Image', /new\s+Image\s*\(/],
    ] as Array<[string, RegExp]>) {
      expect(re.test(code(registry)), `the registry contains ${label}`).toBe(false);
    }
  });
});

describe('the component imports nothing that could transmit', () => {
  it('imports only React, the language bridge, its own engine and its own sources', () => {
    const imports = Array.from(code(read(COMPONENT)).matchAll(/from\s+'([^']+)'/g), (m) => m[1]);
    for (const i of imports) {
      const allowed =
        i === 'react' ||
        i === '../lib/i18n/react' ||
        i.startsWith('../lib/calculators/cz-employer-cost/') ||
        i.startsWith('../data/calculators/cz-employer-cost/');
      expect(allowed, `unexpected import "${i}"`).toBe(true);
    }
  });
});

// §31 — no default may quietly create a relief the user did not request.
describe('no default personal profile', () => {
  it('defaults to no children, no disability, no ZTP/P and no special category', () => {
    const src = read(`${ENGINE_DIR}/engine.ts`);
    expect(src).toMatch(/disability:\s*'none'/);
    expect(src).toMatch(/ztpp:\s*false/);
    expect(src).toMatch(/children:\s*\[\]/);
    expect(src).toMatch(/employeeCategory:\s*'standard'/);
    expect(src).toMatch(/employerRateClass:\s*'standard'/);
    expect(src).toMatch(/claimEmployerSocialDiscount:\s*false/);
    expect(src).toMatch(/employerDiscountCategory:\s*null/);
    expect(src).toMatch(/situation:\s*'standard'/);
    expect(src).toMatch(/mode:\s*'assume_not_reached'/);
  });

  it('defaults every company cost to zero', () => {
    const src = read(`${ENGINE_DIR}/additional-costs.ts`);
    expect(src).toMatch(/acc\[def\.key\]\s*=\s*0/);
  });

  it('leaves liability insurance off by default — its rate is employer-specific', () => {
    expect(read(`${ENGINE_DIR}/engine.ts`)).toMatch(/liabilityInsurance:\s*\{\s*enabled:\s*false/);
  });
});
