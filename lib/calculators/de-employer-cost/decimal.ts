/**
 * Exact decimal arithmetic with Java `BigDecimal` semantics.
 *
 * WHY THE GERMAN ENGINE DOES NOT USE `lib/payroll/money.ts`
 * ────────────────────────────────────────────────────────
 * Because it cannot. That module is not a generic money type — it is a Czech
 * one. Its unit is the haléř, its brand is `Halere`, and its rounding helpers
 * are `roundToCzk` and `roundToHundredCzk`, which exist because Czech payroll
 * rounds to whole koruna in places German payroll never rounds at all. Passing
 * a euro amount through it would be a type error at best and a silent
 * mis-rounding at worst.
 *
 * So the rule "shared arithmetic stays shared" is honoured the way it can
 * actually be honoured: this engine has exactly ONE arithmetic module — this
 * one — and every German module that touches money goes through it. The
 * rounding is written once per jurisdiction, not once per file, which is the
 * property that mattered.
 *
 * WHY BIGDECIMAL AND NOT INTEGER CENTS
 * ────────────────────────────────────
 * Integer minor units are the right model for a payroll amount, and they are
 * what the Czech module uses. They are the wrong model for executing the BMF
 * Programmablaufplan. The PAP is
 * written as Java `BigDecimal` operations, and BigDecimal is not "a number" — it
 * is a pair of (unscaled value, scale), where the SCALE is carried through every
 * operation and is itself load-bearing. `multiply` adds the scales.
 * `divide(d, 6, ROUND_DOWN)` produces exactly six decimal places. `setScale(0,
 * ROUND_DOWN)` truncates. The algorithm's correctness depends on values holding
 * a specific number of decimal places at specific moments — the tariff formula
 * carries Y to six places, and losing that changes the tax.
 *
 * So this is a faithful BigDecimal, not a money type. It exists to execute the
 * PAP exactly as specified, and nothing else uses it.
 *
 * WHAT IS IMPLEMENTED
 * ───────────────────
 * Only what the 2026 PAP actually uses, which is a small and regular subset:
 * add, subtract, multiply, divide (exact and scaled), setScale, compareTo,
 * longValue, and the two rounding modes that appear — ROUND_DOWN (70
 * operations) and ROUND_UP (12). The XML contains 71 textual occurrences of
 * ROUND_DOWN, one of which is inside a comment in MSONST rather than an
 * operation; 82 rounding operations in total. Both are MAGNITUDE-based in Java: DOWN truncates toward
 * zero and UP goes away from zero. That distinction is not academic here — the
 * PAP produces negative intermediates, and the flowchart says so explicitly
 * ("negative Zahlen werden nach ihrem Betrag gerundet").
 *
 * Implemented over `bigint`, so there is no precision limit and no floating
 * point anywhere in the tax path.
 */

export type RoundingMode = 'DOWN' | 'UP' | 'HALF_UP';

/** Ten to the power n, as a bigint. Cached because the hot loop asks repeatedly. */
const POW10: bigint[] = [1n];
function pow10(n: number): bigint {
  if (n < 0) throw new RangeError(`decimal: negative scale ${n}`);
  while (POW10.length <= n) POW10.push(POW10[POW10.length - 1] * 10n);
  return POW10[n];
}

export class Decimal {
  /** value = unscaled / 10^scale */
  readonly unscaled: bigint;
  readonly scale: number;

  private constructor(unscaled: bigint, scale: number) {
    this.unscaled = unscaled;
    this.scale = scale;
  }

  static readonly ZERO = new Decimal(0n, 0);
  static readonly ONE = new Decimal(1n, 0);

  /**
   * Parse a decimal literal exactly as written.
   *
   * The scale comes from the literal's own digits, which is how BigDecimal
   * behaves and why `valueOf(0.013)` is scale 3 rather than a float.
   */
  static of(literal: string | number | bigint): Decimal {
    if (typeof literal === 'bigint') return new Decimal(literal, 0);
    const s = String(literal).trim();
    if (!/^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(s)) {
      throw new RangeError(`decimal: cannot parse "${s}"`);
    }
    // Exponent form appears only if a caller passes a JS number that stringifies
    // that way; normalise it rather than silently losing digits.
    if (/[eE]/.test(s)) {
      const [mant, exp] = s.split(/[eE]/);
      const e = Number(exp);
      const base = Decimal.of(mant);
      return e >= 0
        ? new Decimal(base.unscaled * pow10(e), base.scale)
        : new Decimal(base.unscaled, base.scale + -e);
    }
    const neg = s.startsWith('-');
    const body = s.replace(/^[+-]/, '');
    const [int, frac = ''] = body.split('.');
    const unscaled = BigInt(int + frac);
    return new Decimal(neg ? -unscaled : unscaled, frac.length);
  }

  /** Both operands raised to a common scale, for add/subtract/compare. */
  private static align(a: Decimal, b: Decimal): [bigint, bigint, number] {
    const scale = Math.max(a.scale, b.scale);
    return [a.unscaled * pow10(scale - a.scale), b.unscaled * pow10(scale - b.scale), scale];
  }

  add(other: Decimal): Decimal {
    const [x, y, scale] = Decimal.align(this, other);
    return new Decimal(x + y, scale);
  }

  subtract(other: Decimal): Decimal {
    const [x, y, scale] = Decimal.align(this, other);
    return new Decimal(x - y, scale);
  }

  /** Java: the product's scale is the SUM of the operand scales. */
  multiply(other: Decimal): Decimal {
    return new Decimal(this.unscaled * other.unscaled, this.scale + other.scale);
  }

  /**
   * Divide to an explicit scale with an explicit rounding mode — the three-arg
   * Java form, which is what the PAP uses wherever the quotient may not
   * terminate.
   */
  divideScaled(divisor: Decimal, scale: number, mode: RoundingMode): Decimal {
    if (divisor.unscaled === 0n) throw new RangeError('decimal: division by zero');
    // numerator / denominator, expressed so the quotient lands at `scale`.
    const num = this.unscaled * pow10(divisor.scale + scale);
    const den = divisor.unscaled * pow10(this.scale);
    return new Decimal(divideRounded(num, den, mode), scale);
  }

  /**
   * The one-argument Java form: an exact quotient, which throws when the result
   * does not terminate. The PAP uses it only where the division is exact (by
   * 100, by 12 on values already scaled for it), so a throw here means the
   * engine has drifted from the specification and should be loud, not silent.
   */
  divideExact(divisor: Decimal): Decimal {
    if (divisor.unscaled === 0n) throw new RangeError('decimal: division by zero');
    // Try increasing scales up to a sane bound; BigDecimal picks the preferred
    // scale (this.scale - divisor.scale) and extends only as needed.
    const preferred = Math.max(0, this.scale - divisor.scale);
    for (let scale = preferred; scale <= preferred + 40; scale++) {
      const num = this.unscaled * pow10(divisor.scale + scale);
      const den = divisor.unscaled * pow10(this.scale);
      if (num % den === 0n) return new Decimal(num / den, scale);
    }
    throw new RangeError(
      `decimal: non-terminating exact division (${this.toString()} / ${divisor.toString()}) — ` +
        'the PAP uses the one-argument divide only where it terminates, so this means the ' +
        'interpreter has diverged from the specification',
    );
  }

  /** Rescale, rounding as instructed. */
  setScale(scale: number, mode: RoundingMode): Decimal {
    if (scale === this.scale) return this;
    if (scale > this.scale) return new Decimal(this.unscaled * pow10(scale - this.scale), scale);
    const den = pow10(this.scale - scale);
    return new Decimal(divideRounded(this.unscaled, den, mode), scale);
  }

  /** -1, 0 or 1. Numeric comparison; scale is irrelevant. */
  compareTo(other: Decimal): number {
    const [x, y] = Decimal.align(this, other);
    return x < y ? -1 : x > y ? 1 : 0;
  }

  /** Java `longValue()`: truncates toward zero. */
  longValue(): bigint {
    return this.scale === 0 ? this.unscaled : this.unscaled / pow10(this.scale);
  }

  negate(): Decimal {
    return new Decimal(-this.unscaled, this.scale);
  }

  isZero(): boolean {
    return this.unscaled === 0n;
  }

  /** Plain decimal string, preserving scale — so 0.00 stays 0.00. */
  toString(): string {
    const neg = this.unscaled < 0n;
    const digits = (neg ? -this.unscaled : this.unscaled).toString().padStart(this.scale + 1, '0');
    const int = digits.slice(0, digits.length - this.scale) || '0';
    const frac = this.scale > 0 ? '.' + digits.slice(digits.length - this.scale) : '';
    return `${neg ? '-' : ''}${int}${frac}`;
  }

  /** For assertions and reporting only — never for arithmetic. */
  toNumber(): number {
    return Number(this.toString());
  }
}

/**
 * Integer division of `num` by `den` under a Java rounding mode.
 *
 * MAGNITUDE-BASED, deliberately. Java's ROUND_DOWN truncates toward zero and
 * ROUND_UP moves away from zero, so both are defined on |value| and the sign is
 * reattached afterwards. Implementing DOWN as a floor would round -1.5 to -2
 * instead of -1, which is a real divergence: the PAP carries negative
 * intermediates and its own text says negative numbers are rounded by their
 * magnitude.
 */
function divideRounded(num: bigint, den: bigint, mode: RoundingMode): bigint {
  const negative = num < 0n !== den < 0n;
  const a = num < 0n ? -num : num;
  const b = den < 0n ? -den : den;
  const q = a / b;
  const r = a % b;
  let mag: bigint;
  if (r === 0n) mag = q;
  else if (mode === 'DOWN') mag = q;
  else if (mode === 'UP') mag = q + 1n;
  else mag = r * 2n >= b ? q + 1n : q; // HALF_UP
  return negative ? -mag : mag;
}
