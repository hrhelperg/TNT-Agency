import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * §29 — the non-negotiable half.
 *
 * What gets typed into this calculator is a salary, a family situation, a
 * Bundesland, and whether the person belongs to a church. The last of those is
 * data about religious belief: special-category data under GDPR Article 9, and
 * the only reliable way to protect it is for it never to leave the browser.
 *
 * The rules and their shape are inherited from the Czech calculator's suite,
 * which was written after a reviewer got a working tracking pixel past 315
 * assertions by using `<img src>` — an attribute, not one of the transmission
 * APIs the sink list chased. The lesson was that enumerating sinks is the wrong
 * shape of rule, because the next sink is always the one nobody listed. So the
 * rule is inverted: this component needs no external origin at all, and any
 * absolute URL in it fails regardless of what would have carried it.
 *
 * Source assertions rather than runtime ones, deliberately: a runtime test
 * proves only the paths it happened to exercise, while reading the source
 * catches a `fetch` added to a branch no test reaches.
 */

const ROOT = path.join(__dirname, '..', '..', '..');
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const COMPONENT = 'components/DeEmployerCostCalculator.tsx';
const ENGINE_DIR = 'lib/calculators/de-employer-cost';

const ENGINE_FILES = [
  'engine.ts',
  'scope.ts',
  'validation.ts',
  'decimal.ts',
  'formatting.ts',
  'copy.ts',
  'types.ts',
  'unsupported.ts',
  'social/bvv.ts',
  'social/branches.ts',
  'tax/pap-2026.ts',
  'tax/church-tax.ts',
].map((f) => `${ENGINE_DIR}/${f}`);

const DATA_FILES = [
  'data/calculators/de-employer-cost/2026/rules.ts',
  'data/calculators/de-employer-cost/2026/sources.ts',
  'data/calculators/de-employer-cost/2026/pap/provenance.ts',
  'data/calculators/de-employer-cost/2026/pap/prueftabellen.ts',
  'data/calculators/de-employer-cost/types.ts',
];

const ALL = [COMPONENT, ...ENGINE_FILES, ...DATA_FILES];

/** Strip comments so prose ABOUT `fetch` cannot fail a code assertion. */
const code = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

/**
 * Strip string literals as well, for the assertions that are about what the
 * code DOES rather than what it references.
 *
 * The source registry's notes are English prose describing evidence, and one of
 * them contains the sentence "The one document that states every 2026 rate…".
 * A bare /\bdocument\b/ read that as the browser global and failed a purity
 * check on a file that has no code in it at all. The registry's whole job is to
 * talk about documents.
 *
 * Deliberately NOT applied to the component's URL assertions: there, a string
 * literal is exactly the thing being checked.
 */
const codeOnly = (src: string) =>
  code(src)
    .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``');

describe('every file exists — the list cannot silently stop covering things', () => {
  // A path that has been renamed makes its assertions vacuous rather than
  // failing, which is the quietest way for a privacy gate to stop working.
  for (const f of ALL) {
    it(`${f} is present`, () => {
      expect(fs.existsSync(path.join(ROOT, f)), f).toBe(true);
    });
  }

  it('covers every non-test source file in the engine', () => {
    const found: string[] = [];
    const walk = (dir: string) => {
      for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
        const rel = `${dir}/${e.name}`;
        if (e.isDirectory()) walk(rel);
        else if (/\.tsx?$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) found.push(rel);
      }
    };
    walk(ENGINE_DIR);
    walk('data/calculators/de-employer-cost');
    // The reference interpreter is test-only and never reaches a page, so it is
    // the one exception — named explicitly rather than pattern-matched away.
    const covered = new Set([...ENGINE_FILES, ...DATA_FILES, `${ENGINE_DIR}/reference/pap-interpreter.ts`]);
    const uncovered = found.filter((f) => !covered.has(f));
    expect(uncovered, `not covered by the privacy gate:\n${uncovered.join('\n')}`).toEqual([]);
  });
});

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
    for (const file of [...ENGINE_FILES, ...DATA_FILES]) {
      const src = codeOnly(read(file));
      expect(/\bwindow\b/.test(src), `${file} touches window`).toBe(false);
      expect(/\bdocument\b/.test(src), `${file} touches document`).toBe(false);
      expect(/\bnavigator\b/.test(src), `${file} touches navigator`).toBe(false);
    }
  });

  it('never reads the clock, so a 2026 result stays reproducible', () => {
    for (const file of [...ENGINE_FILES, ...DATA_FILES]) {
      const src = codeOnly(read(file));
      expect(/Date\.now\s*\(/.test(src), `${file} calls Date.now()`).toBe(false);
      expect(/new Date\s*\(\s*\)/.test(src), `${file} reads the current date`).toBe(false);
    }
  });

  it('uses no randomness', () => {
    for (const file of [...ENGINE_FILES, ...DATA_FILES]) {
      expect(/Math\.random/.test(codeOnly(read(file))), `${file}`).toBe(false);
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

  it('offers no share or copy-link mechanism', () => {
    expect(/navigator\s*\.\s*share/.test(src)).toBe(false);
    expect(/navigator\s*\.\s*clipboard/.test(src)).toBe(false);
    expect(/writeText/.test(src)).toBe(false);
    expect(/execCommand/.test(src)).toBe(false);
  });

  it('the cross-link targets are clean canonical paths', () => {
    const copySrc = code(read(`${ENGINE_DIR}/copy.ts`));
    const literals = Array.from(copySrc.matchAll(/'(\/[a-z/-]+)'/g), (m) => m[1]);
    for (const target of ['/cena-neobsazene-pozice', '/en/cost-of-vacancy', '/de/kosten-unbesetzter-stellen']) {
      expect(literals, `missing cross-link ${target}`).toContain(target);
    }
    for (const l of literals) {
      expect(l.includes('?'), `path ${l} carries a query string`).toBe(false);
      expect(l.includes('#'), `path ${l} carries a fragment`).toBe(false);
    }
  });
});

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

  /**
   * The registry legitimately holds absolute URLs — they are the evidence. It
   * must never be imported by the component, because that would put those URLs
   * in the page's bundle where an attribute could reach them.
   */
  it('the source registry with its URLs is not reachable from the component', () => {
    expect(/sources['"]/.test(src), 'component imports the source registry').toBe(false);
  });
});
