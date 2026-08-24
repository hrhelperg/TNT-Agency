/**
 * A reference interpreter for the BMF Programmablaufplan 2026.
 *
 * WHAT THIS IS FOR
 * ────────────────
 * §42 of the build brief requires differential testing of the tax engine against
 * an INDEPENDENT implementation, and is explicit that "a test that imports the
 * same production functions is not independent".
 *
 * This is that independent implementation. It does not implement German tax law
 * at all — it is a small interpreter for the pseudocode language ITZBund
 * publishes on behalf of BMF, and it executes the vendored
 * `Lohnsteuer2026.xml` verbatim. Where the production engine in
 * `../tax/pap-2026.ts` is a hand transcription of that same algorithm into
 * readable TypeScript, this one never reads the algorithm at all: it walks the
 * XML.
 *
 * The independence is therefore real in the way that matters. A transcription
 * error — a truncation dropped, a branch inverted, a constant mistyped, an ELSE
 * attached to the wrong IF — changes the production engine and cannot change
 * this one, so it shows up as a diff. That is the whole point: the PVA/PVZ
 * ordering in MPARA and the HOCH/VERGL minimum in MST5_6 are both places where
 * the flowchart reads one way and means another, and both are the kind of
 * mistake that a test written by the same hand as the code will happily confirm.
 *
 * WHAT IT DELIBERATELY IS NOT
 * ───────────────────────────
 * Not production code, and not on the page's code path. It is slower than the
 * production engine by a wide margin — it parses expressions at runtime — and it
 * has no reason to be fast: it runs in tests, over a large input matrix, once.
 *
 * THE LANGUAGE
 * ────────────
 * Small and regular. The whole 2026 document uses eight BigDecimal operations
 * (add, subtract, multiply, divide, setScale, compareTo, longValue, valueOf),
 * two rounding modes, six node types, and conditions built from `==`, `<`, `<=`
 * and `&&`. Everything below implements exactly that and refuses anything else,
 * loudly — an unrecognised construct means BMF changed the language, and
 * guessing at it would be worse than stopping.
 */

import { Decimal, type RoundingMode } from '../decimal';

// ─────────────────────────────────────────────────────────────────────────────
// Values
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A PAP variable is a BigDecimal, an int, or an array of BigDecimal.
 *
 * The int/BigDecimal distinction is the XML's own and is load-bearing: the
 * integer inputs (STKL, LZZ, KRV, PVS…) are compared with `==` against integer
 * literals, while everything monetary flows through BigDecimal. Collapsing them
 * to one numeric type would make `STKL == 1` a decimal comparison and quietly
 * change nothing until it did.
 */
export type PapValue = Decimal | number | Decimal[];

export interface PapDeclaration {
  readonly name: string;
  readonly type: 'BigDecimal' | 'int' | 'double' | 'BigDecimal[]';
  /** `default=` on INPUT / INTERNAL / OUTPUT. */
  readonly defaultExpr?: string;
  /**
   * `value=` on CONSTANT — a different attribute name for the same job, which
   * is why reading only `default` left every ZAHLn constant at zero and turned
   * the first `.divide(ZAHL100)` into a division by zero.
   */
  readonly valueExpr?: string;
}

export interface PapDocument {
  readonly name: string;
  readonly version: string;
  readonly inputs: readonly PapDeclaration[];
  readonly constants: readonly PapDeclaration[];
  readonly internals: readonly PapDeclaration[];
  readonly outputs: readonly PapDeclaration[];
  readonly methods: ReadonlyMap<string, readonly Stmt[]>;
  readonly main: readonly Stmt[];
}

type Stmt =
  | { kind: 'eval'; exec: string }
  | { kind: 'execute'; method: string }
  | { kind: 'if'; expr: string; then: Stmt[]; else: Stmt[] };

// ─────────────────────────────────────────────────────────────────────────────
// XML parsing
// ─────────────────────────────────────────────────────────────────────────────

/** Undo the five XML entities this document uses. */
function unescapeXml(s: string): string {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([A-Za-z_][\w-]*)\s*=\s*"([^"]*)"/g)) {
    out[m[1]] = unescapeXml(m[2]);
  }
  return out;
}

/**
 * Parse the statement list inside one element body.
 *
 * A hand-rolled scanner rather than a DOM: the repository carries three runtime
 * dependencies and this document's subset is small enough that adding an XML
 * parser to the tree would cost more than it saves. It handles exactly the
 * shapes present — EVAL, EXECUTE, IF/THEN/ELSE, nested — and throws on anything
 * else.
 */
function parseStatements(body: string): Stmt[] {
  const out: Stmt[] = [];
  let i = 0;

  while (i < body.length) {
    const lt = body.indexOf('<', i);
    if (lt === -1) break;
    // Skip comments.
    if (body.startsWith('<!--', lt)) {
      const end = body.indexOf('-->', lt);
      i = end === -1 ? body.length : end + 3;
      continue;
    }
    const gt = body.indexOf('>', lt);
    if (gt === -1) break;
    const tag = body.slice(lt, gt + 1);
    const nameMatch = /^<\/?([A-Z_][\w]*)/.exec(tag);
    if (!nameMatch) {
      i = gt + 1;
      continue;
    }
    const name = nameMatch[1];
    const selfClosing = tag.endsWith('/>');
    const closing = tag.startsWith('</');

    if (closing) {
      i = gt + 1;
      continue;
    }

    if (name === 'EVAL') {
      out.push({ kind: 'eval', exec: attrs(tag).exec });
      i = selfClosing ? gt + 1 : skipTo(body, gt + 1, 'EVAL');
      continue;
    }
    if (name === 'EXECUTE') {
      out.push({ kind: 'execute', method: attrs(tag).method });
      i = selfClosing ? gt + 1 : skipTo(body, gt + 1, 'EXECUTE');
      continue;
    }
    if (name === 'IF') {
      const end = matchingClose(body, lt, 'IF');
      const inner = body.slice(gt + 1, end.openOfClose);
      const thenBody = sectionBody(inner, 'THEN');
      const elseBody = sectionBody(inner, 'ELSE');
      out.push({
        kind: 'if',
        expr: attrs(tag).expr,
        then: thenBody === null ? [] : parseStatements(thenBody),
        else: elseBody === null ? [] : parseStatements(elseBody),
      });
      i = end.afterClose;
      continue;
    }
    // THEN/ELSE are consumed by their IF; anything else is unexpected.
    if (name === 'THEN' || name === 'ELSE') {
      i = gt + 1;
      continue;
    }
    throw new Error(`pap-interpreter: unexpected element <${name}> in a statement list`);
  }

  return out;
}

function skipTo(body: string, from: number, tag: string): number {
  const close = body.indexOf(`</${tag}>`, from);
  return close === -1 ? from : close + tag.length + 3;
}

/** Find the `</TAG>` that closes the `<TAG …>` beginning at `openIdx`, honouring nesting. */
function matchingClose(
  body: string,
  openIdx: number,
  tag: string,
): { openOfClose: number; afterClose: number } {
  const openRe = new RegExp(`<${tag}(\\s|>)`, 'g');
  const closeStr = `</${tag}>`;
  let depth = 0;
  let i = openIdx;
  while (i < body.length) {
    openRe.lastIndex = i;
    const nextOpen = openRe.exec(body);
    const nextClose = body.indexOf(closeStr, i);
    if (nextClose === -1) break;
    if (nextOpen && nextOpen.index < nextClose) {
      depth++;
      i = nextOpen.index + tag.length + 1;
      continue;
    }
    depth--;
    if (depth === 0) return { openOfClose: nextClose, afterClose: nextClose + closeStr.length };
    i = nextClose + closeStr.length;
  }
  throw new Error(`pap-interpreter: unbalanced <${tag}>`);
}

/**
 * The body of the top-level `<TAG>…</TAG>` in `inner`, or null if there is none.
 *
 * "Top-level" means at `<IF>` nesting depth 0 relative to `inner`, and it must
 * be found by SCANNING rather than by testing the first occurrence. The
 * difference is not academic — it was a real defect here, and a quiet one.
 *
 * An IF whose THEN branch contains a nested IF puts that nested `<ELSE>` earlier
 * in the string than its own:
 *
 *     <IF expr="…">                    ← the one being parsed
 *       <THEN>
 *         <IF expr="…">
 *           <THEN>…</THEN>
 *           <ELSE>…</ELSE>             ← FIRST <ELSE> in the body, depth 1
 *         </IF>
 *       </THEN>
 *       <ELSE>…</ELSE>                 ← the one we want, depth 0
 *     </IF>
 *
 * Checking only the first occurrence and rejecting it when nested returns null,
 * so the outer ELSE branch is dropped and the interpreter silently executes
 * nothing where the algorithm says to do something. That shape is not rare in
 * the 2026 document — it is MST5_6 (where the ELSE holds the whole Steuerklasse
 * V and VI low-income path, including the 14 % minimum) and MVSPKVPV (where the
 * ELSE holds the entire statutory KV/PV Vorsorgepauschale). Both produced
 * plausible, monotonic, wrong numbers.
 */
function sectionBody(inner: string, tag: string): string | null {
  const openRe = new RegExp(`<${tag}(\\s[^>]*)?>`, 'g');
  for (const m of inner.matchAll(openRe)) {
    const before = inner.slice(0, m.index);
    const depth =
      (before.match(/<IF(\s|>)/g) ?? []).length - (before.match(/<\/IF>/g) ?? []).length;
    if (depth !== 0) continue;
    const { openOfClose } = matchingClose(inner, m.index, tag);
    return inner.slice(m.index + m[0].length, openOfClose);
  }
  return null;
}

/** Parse the whole document. */
export function parsePap(xml: string): PapDocument {
  const src = xml.replace(/^﻿/, '');
  const papTag = /<PAP\b[^>]*>/.exec(src);
  if (!papTag) throw new Error('pap-interpreter: no <PAP> root');
  const papAttrs = attrs(papTag[0]);

  const decls = (section: string, tag: string): PapDeclaration[] => {
    // Two things the obvious regex gets wrong here. The OUTPUTS sections carry a
    // `type` attribute, so the opening tag is not simply `<OUTPUTS>`; and there
    // are TWO of them — `type="STANDARD"` holds the six withholding figures and
    // `type="DBA"` holds the six Doppelbesteuerungsabkommen bases. Matching only
    // the first silently drops VFRB, VFRBS1, VFRBS2, WVFRB, WVFRBO and WVFRBM,
    // which is exactly the half a differential test would then never compare.
    const out: PapDeclaration[] = [];
    for (const sec of src.matchAll(new RegExp(`<${section}[^>]*>([\\s\\S]*?)</${section}>`, 'g'))) {
      for (const m of sec[1].matchAll(new RegExp(`<${tag}\\b[^>]*/>`, 'g'))) {
        const a = attrs(m[0]);
        out.push({
          name: a.name,
          type: a.type as PapDeclaration['type'],
          defaultExpr: a.default,
          valueExpr: a.value,
        });
      }
    }
    return out;
  };

  const methods = new Map<string, Stmt[]>();
  for (const m of src.matchAll(/<METHOD\s+name="([A-Z0-9_]+)"\s*>([\s\S]*?)<\/METHOD>/g)) {
    methods.set(m[1], parseStatements(m[2]));
  }

  const mainMatch = /<MAIN>([\s\S]*?)<\/MAIN>/.exec(src);
  if (!mainMatch) throw new Error('pap-interpreter: no <MAIN>');

  return {
    name: papAttrs.name,
    version: papAttrs.version,
    inputs: decls('INPUTS', 'INPUT'),
    constants: decls('CONSTANTS', 'CONSTANT'),
    internals: decls('INTERNALS', 'INTERNAL'),
    outputs: decls('OUTPUTS', 'OUTPUT'),
    methods,
    main: parseStatements(mainMatch[1]),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Expression evaluation
// ─────────────────────────────────────────────────────────────────────────────

type Token = { t: 'id' | 'num' | 'op'; v: string };

function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++;
      out.push({ t: 'id', v: src.slice(i, j) });
      i = j;
      continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      out.push({ t: 'num', v: src.slice(i, j) });
      i = j;
      continue;
    }
    const two = src.slice(i, i + 2);
    if (two === '==' || two === '<=' || two === '>=' || two === '&&' || two === '!=') {
      out.push({ t: 'op', v: two });
      i += 2;
      continue;
    }
    if ('().,[]=<>-+*/'.includes(c)) {
      out.push({ t: 'op', v: c });
      i++;
      continue;
    }
    throw new Error(`pap-interpreter: unexpected character "${c}" in "${src}"`);
  }
  return out;
}

class Evaluator {
  private toks: Token[] = [];
  private pos = 0;

  constructor(private readonly env: Map<string, PapValue>) {}

  /** Execute `NAME = expression`. */
  assign(exec: string): void {
    const eq = splitAssignment(exec);
    if (!eq) throw new Error(`pap-interpreter: not an assignment: "${exec}"`);
    const value = this.evaluate(eq.rhs);
    this.env.set(eq.name, value);
  }

  /** Evaluate a boolean condition. */
  condition(expr: string): boolean {
    this.toks = tokenize(expr);
    this.pos = 0;
    const result = this.parseOr();
    this.expectEnd(expr);
    return result;
  }

  /** Evaluate a value expression. */
  evaluate(expr: string): PapValue {
    this.toks = tokenize(expr);
    this.pos = 0;
    const v = this.parseAdditive();
    this.expectEnd(expr);
    return v;
  }

  /**
   * Infix `+` and `-` on INTEGERS only.
   *
   * The 2026 document contains exactly two such expressions — `VJAHR - 2004`
   * and `AJAHR - 2004`, the cohort index for the Versorgungsbezug and
   * Altersentlastung tables. Everything monetary goes through `.add()` and
   * `.subtract()`, where the scale rules are explicit.
   *
   * So this is deliberately narrow: applying it to a BigDecimal would silently
   * pick a scale the document never specified, which is exactly the class of
   * quiet wrongness this interpreter exists to rule out. It throws instead.
   *
   * Worth noting how this gap stayed hidden: the two Prüftabellen have no
   * Versorgungsbezüge and no Altersentlastungsbetrag, so all 516 official cells
   * pass without ever reaching either line. It surfaced the moment the
   * differential test swept the cohort years — which is the argument for
   * sweeping rather than spot-checking.
   */
  private parseAdditive(): PapValue {
    let left = this.parsePostfix();
    for (;;) {
      const op = this.peek();
      if (!op || op.t !== 'op' || (op.v !== '+' && op.v !== '-')) return left;
      this.pos++;
      const right = this.parsePostfix();
      if (typeof left !== 'number' || typeof right !== 'number') {
        throw new Error(
          `pap-interpreter: infix "${op.v}" is supported on ints only — a BigDecimal here ` +
            'would need a scale the document does not state',
        );
      }
      left = op.v === '+' ? left + right : left - right;
    }
  }

  private expectEnd(expr: string): void {
    if (this.pos !== this.toks.length) {
      throw new Error(
        `pap-interpreter: trailing tokens in "${expr}" at ${this.toks[this.pos]?.v}`,
      );
    }
  }

  private peek(): Token | undefined {
    return this.toks[this.pos];
  }

  private eat(v: string): void {
    const t = this.toks[this.pos];
    if (!t || t.v !== v) throw new Error(`pap-interpreter: expected "${v}", got "${t?.v}"`);
    this.pos++;
  }

  private parseOr(): boolean {
    let left = this.parseComparison();
    while (this.peek()?.v === '&&') {
      this.pos++;
      const right = this.parseComparison();
      left = left && right;
    }
    return left;
  }

  private parseComparison(): boolean {
    const left = this.parsePostfix();
    const op = this.peek();
    if (!op || op.t !== 'op' || !['==', '<', '<=', '>', '>=', '!='].includes(op.v)) {
      throw new Error(`pap-interpreter: expected a comparison operator, got "${op?.v}"`);
    }
    this.pos++;
    const right = this.parsePostfix();
    const l = toComparableNumber(left);
    const r = toComparableNumber(right);
    switch (op.v) {
      case '==':
        return l === r;
      case '!=':
        return l !== r;
      case '<':
        return l < r;
      case '<=':
        return l <= r;
      case '>':
        return l > r;
      default:
        return l >= r;
    }
  }

  private parsePostfix(): PapValue {
    let value = this.parsePrimary();
    while (this.peek()?.v === '.') {
      this.pos++;
      const method = this.toks[this.pos];
      if (!method || method.t !== 'id') throw new Error('pap-interpreter: expected a method name');
      this.pos++;
      const args = this.parseArgs();
      value = applyMethod(value, method.v, args);
    }
    return value;
  }

  private parseArgs(): PapValue[] {
    this.eat('(');
    const args: PapValue[] = [];
    if (this.peek()?.v === ')') {
      this.pos++;
      return args;
    }
    for (;;) {
      args.push(this.parseArgValue());
      const next = this.peek();
      if (next?.v === ',') {
        this.pos++;
        continue;
      }
      this.eat(')');
      return args;
    }
  }

  /** An argument may be a full expression, an int literal, or a rounding-mode name. */
  private parseArgValue(): PapValue {
    const t = this.peek();
    if (t?.t === 'id' && t.v === 'BigDecimal' && this.toks[this.pos + 1]?.v === '.') {
      const member = this.toks[this.pos + 2];
      if (member?.t === 'id' && member.v.startsWith('ROUND_')) {
        this.pos += 3;
        return ROUNDING_SENTINEL[member.v] ?? -1;
      }
    }
    return this.parsePostfix();
  }

  private parsePrimary(): PapValue {
    const t = this.peek();
    if (!t) throw new Error('pap-interpreter: unexpected end of expression');

    if (t.v === '(') {
      this.pos++;
      const v = this.parsePostfix();
      this.eat(')');
      return v;
    }

    if (t.v === '-') {
      this.pos++;
      const v = this.parsePrimary();
      return typeof v === 'number' ? -v : (v as Decimal).negate();
    }

    if (t.t === 'num') {
      this.pos++;
      return t.v.includes('.') ? Decimal.of(t.v) : Number(t.v);
    }

    if (t.t === 'id') {
      // BigDecimal.valueOf(x) / BigDecimal.ZERO / BigDecimal.ONE
      if (t.v === 'BigDecimal' && this.toks[this.pos + 1]?.v === '.') {
        const member = this.toks[this.pos + 2];
        if (!member) throw new Error('pap-interpreter: malformed BigDecimal reference');
        if (member.v === 'valueOf') {
          this.pos += 3;
          const args = this.parseArgs();
          const a = args[0];
          if (typeof a === 'number') return Decimal.of(a);
          if (a instanceof Decimal) return a;
          throw new Error('pap-interpreter: valueOf expects a scalar');
        }
        if (member.v === 'ZERO') {
          this.pos += 3;
          return Decimal.ZERO;
        }
        if (member.v === 'ONE') {
          this.pos += 3;
          return Decimal.ONE;
        }
        throw new Error(`pap-interpreter: unknown BigDecimal member "${member.v}"`);
      }

      this.pos++;
      // Array access: TAB1[J]
      if (this.peek()?.v === '[') {
        this.pos++;
        const idxTok = this.toks[this.pos];
        if (!idxTok) throw new Error('pap-interpreter: malformed array index');
        this.pos++;
        this.eat(']');
        const arr = this.env.get(t.v);
        if (!Array.isArray(arr)) throw new Error(`pap-interpreter: "${t.v}" is not an array`);
        const idx =
          idxTok.t === 'num' ? Number(idxTok.v) : toComparableNumber(this.lookup(idxTok.v));
        const el = arr[idx];
        if (el === undefined) {
          throw new Error(`pap-interpreter: ${t.v}[${idx}] is out of range (len ${arr.length})`);
        }
        return el;
      }
      return this.lookup(t.v);
    }

    throw new Error(`pap-interpreter: unexpected token "${t.v}"`);
  }

  private lookup(name: string): PapValue {
    if (!this.env.has(name)) throw new Error(`pap-interpreter: undefined variable "${name}"`);
    return this.env.get(name)!;
  }
}

/** Rounding modes are passed as arguments; carry them as distinguishable sentinels. */
const ROUNDING_SENTINEL: Record<string, number> = {
  ROUND_DOWN: -1001,
  ROUND_UP: -1002,
  ROUND_HALF_UP: -1003,
};

function sentinelToMode(v: PapValue): RoundingMode {
  if (v === ROUNDING_SENTINEL.ROUND_DOWN) return 'DOWN';
  if (v === ROUNDING_SENTINEL.ROUND_UP) return 'UP';
  if (v === ROUNDING_SENTINEL.ROUND_HALF_UP) return 'HALF_UP';
  throw new Error(`pap-interpreter: not a rounding mode (${String(v)})`);
}

function asDecimal(v: PapValue): Decimal {
  if (v instanceof Decimal) return v;
  if (typeof v === 'number') return Decimal.of(v);
  throw new Error('pap-interpreter: expected a scalar, got an array');
}

function toComparableNumber(v: PapValue): number {
  if (typeof v === 'number') return v;
  if (v instanceof Decimal) return v.toNumber();
  throw new Error('pap-interpreter: cannot compare an array');
}

function applyMethod(target: PapValue, method: string, args: PapValue[]): PapValue {
  switch (method) {
    case 'add':
      return asDecimal(target).add(asDecimal(args[0]));
    case 'subtract':
      return asDecimal(target).subtract(asDecimal(args[0]));
    case 'multiply':
      return asDecimal(target).multiply(asDecimal(args[0]));
    case 'divide':
      if (args.length === 1) return asDecimal(target).divideExact(asDecimal(args[0]));
      if (args.length === 3) {
        return asDecimal(target).divideScaled(
          asDecimal(args[0]),
          toComparableNumber(args[1]),
          sentinelToMode(args[2]),
        );
      }
      throw new Error(`pap-interpreter: divide with ${args.length} arguments`);
    case 'setScale':
      return asDecimal(target).setScale(toComparableNumber(args[0]), sentinelToMode(args[1]));
    case 'compareTo':
      return asDecimal(target).compareTo(asDecimal(args[0]));
    case 'longValue':
      return Number(asDecimal(target).longValue());
    default:
      throw new Error(`pap-interpreter: unsupported method ".${method}()"`);
  }
}

/** Split `NAME = rhs` on the first top-level `=` that is not part of `==`, `<=`, `>=`. */
function splitAssignment(exec: string): { name: string; rhs: string } | null {
  for (let i = 0; i < exec.length; i++) {
    if (exec[i] !== '=') continue;
    if (exec[i + 1] === '=') {
      i++;
      continue;
    }
    if (i > 0 && '<>!='.includes(exec[i - 1])) continue;
    const name = exec.slice(0, i).trim();
    if (!/^[A-Za-z_][\w]*$/.test(name)) return null;
    return { name, rhs: exec.slice(i + 1).trim() };
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Execution
// ─────────────────────────────────────────────────────────────────────────────

export type PapInputs = Record<string, number | string>;
export type PapOutputs = Record<string, Decimal>;

/** Parse an array literal `{BigDecimal.ZERO, BigDecimal.valueOf(0.4), …}`. */
function parseArrayLiteral(literal: string): Decimal[] {
  const inner = literal.trim().replace(/^\{/, '').replace(/\}$/, '');
  return inner.split(',').map((part) => {
    const s = part.trim();
    if (/BigDecimal\.ZERO/.test(s)) return Decimal.ZERO;
    const m = /BigDecimal\.valueOf\(\s*([0-9.]+)\s*\)/.exec(s);
    if (!m) throw new Error(`pap-interpreter: bad array element "${s}"`);
    return Decimal.of(m[1]);
  });
}

export interface PapRun {
  readonly outputs: PapOutputs;
  /** Every variable at the end of the run — for diagnosing a differential mismatch. */
  readonly env: ReadonlyMap<string, PapValue>;
}

/**
 * Execute the PAP for one set of inputs.
 *
 * Inputs are given by their PAP names (RE4, LZZ, STKL, …) in the units the PAP
 * declares — which for the monetary ones is CENT, not euro. Anything not given
 * takes the XML's declared default, so a caller states only what it means to
 * vary.
 */
export function runPap(doc: PapDocument, inputs: PapInputs): PapRun {
  const env = new Map<string, PapValue>();

  const initialise = (d: PapDeclaration) => {
    if (d.type === 'BigDecimal[]') {
      env.set(d.name, parseArrayLiteral(d.valueExpr ?? '{}'));
      return;
    }
    const source = d.valueExpr ?? d.defaultExpr;
    if (source === undefined) {
      env.set(d.name, d.type === 'BigDecimal' ? Decimal.ZERO : 0);
      return;
    }
    const raw = source.trim();
    if (d.type === 'int' || d.type === 'double') {
      env.set(d.name, Number(raw));
      return;
    }
    env.set(d.name, new Evaluator(env).evaluate(raw) as Decimal);
  };

  for (const d of doc.constants) initialise(d);
  for (const d of doc.inputs) initialise(d);
  for (const d of doc.internals) initialise(d);
  for (const d of doc.outputs) initialise(d);

  for (const [name, value] of Object.entries(inputs)) {
    const decl =
      doc.inputs.find((d) => d.name === name) ??
      doc.inputs.find((d) => d.name.toLowerCase() === name.toLowerCase());
    if (!decl) throw new Error(`pap-interpreter: "${name}" is not a PAP input`);
    env.set(
      decl.name,
      decl.type === 'int' || decl.type === 'double' ? Number(value) : Decimal.of(value),
    );
  }

  const evaluator = new Evaluator(env);

  const run = (stmts: readonly Stmt[]): void => {
    for (const s of stmts) {
      if (s.kind === 'eval') {
        evaluator.assign(s.exec);
      } else if (s.kind === 'execute') {
        const body = doc.methods.get(s.method);
        if (!body) throw new Error(`pap-interpreter: unknown method "${s.method}"`);
        run(body);
      } else {
        run(evaluator.condition(s.expr) ? s.then : s.else);
      }
    }
  };

  run(doc.main);

  const outputs: PapOutputs = {};
  for (const d of doc.outputs) outputs[d.name] = asDecimal(env.get(d.name)!);
  return { outputs, env };
}
