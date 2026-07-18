/**
 * Deterministic money arithmetic for the payroll engine.
 *
 * All monetary amounts are represented as an INTEGER number of *haléře*
 * (1 CZK = 100 haléře). Integer arithmetic on JavaScript numbers is EXACT as
 * long as every value and every intermediate product stays within
 * Number.MAX_SAFE_INTEGER (2^53 − 1). For realistic payroll magnitudes this
 * always holds — even the annual maximum assessment base of 2 350 416 Kč
 * (235 041 600 haléře) multiplied by the largest scaled rate stays far below
 * 2^53. Every multiplication is guarded and throws if the range is ever
 * exceeded, so the engine can never silently drift.
 *
 * No binary floating-point money math. Division uses a floor-plus-correction
 * step so a float-division rounding error can never produce an off-by-one
 * quotient. Every rounding step is explicit and chosen by the caller to match
 * a specific statutory rule.
 */

/** An integer amount of haléře (hundredths of a Czech koruna). */
export type Halere = number & { readonly __brand: 'Halere' };

/** Rounding direction: 'up' = toward +∞ (statutory "nahoru"), 'down' = toward −∞, 'nearest' = half up. */
export type RoundMode = 'up' | 'down' | 'nearest';

const HALERE_PER_CZK = 100;
const HALERE_PER_HUNDRED_CZK = 10_000;
/** Percentages are scaled by 10^4 → up to four decimal places, exact and overflow-safe. */
const PERCENT_SCALE = 10_000;

function assertSafeInteger(value: number, context: string): void {
  if (!Number.isFinite(value) || !Number.isSafeInteger(value)) {
    throw new RangeError(`money: ${context} must be a safe integer, got ${value}`);
  }
}

function assertSafeProduct(a: number, b: number, context: string): number {
  const product = a * b;
  if (!Number.isSafeInteger(product)) {
    throw new RangeError(`money: ${context} overflowed the safe-integer range (${a} × ${b})`);
  }
  return product;
}

/**
 * Integer division numerator/denominator (denominator > 0) rounded per `mode`.
 * numerator and denominator are exact integers; the floor result is corrected
 * so no float-division artefact can shift the quotient.
 */
function divRound(numerator: number, denominator: number, mode: RoundMode): number {
  if (denominator <= 0) throw new RangeError('money: denominator must be positive');
  let q = Math.floor(numerator / denominator);
  let r = numerator - q * denominator;
  // Normalise the remainder into [0, denominator) against float error.
  while (r < 0) {
    q -= 1;
    r += denominator;
  }
  while (r >= denominator) {
    q += 1;
    r -= denominator;
  }
  if (r === 0) return q;
  if (mode === 'up') return q + 1;
  if (mode === 'down') return q;
  return r * 2 >= denominator ? q + 1 : q; // nearest, half up
}

/** Brand a raw integer count of haléře as `Halere`. */
export function halere(rawHalere: number): Halere {
  assertSafeInteger(rawHalere, 'halere()');
  return rawHalere as Halere;
}

/**
 * Convert a koruna amount (which may include up to two decimal places, e.g.
 * 134.4) into exact haléře, rounding to the nearest haléř (half away from zero).
 */
export function czk(korunaAmount: number): Halere {
  if (!Number.isFinite(korunaAmount)) {
    throw new RangeError(`money: czk() requires a finite number, got ${korunaAmount}`);
  }
  const rounded = Math.round(korunaAmount * HALERE_PER_CZK);
  const normalized = Object.is(rounded, -0) ? 0 : rounded;
  assertSafeInteger(normalized, 'czk() result');
  return normalized as Halere;
}

export const ZERO: Halere = 0 as Halere;

/** Numeric koruna value (may include haléře as decimals) for formatting/display. */
export function toCzkNumber(value: Halere): number {
  return value / HALERE_PER_CZK;
}

export function add(a: Halere, b: Halere): Halere {
  return halere(a + b);
}

export function subtract(a: Halere, b: Halere): Halere {
  return halere(a - b);
}

export function negate(a: Halere): Halere {
  return halere(-a);
}

export function sum(values: readonly Halere[]): Halere {
  return halere(values.reduce((acc, v) => acc + v, 0));
}

export function isNegative(a: Halere): boolean {
  return a < 0;
}

export function isZero(a: Halere): boolean {
  return a === 0;
}

export function compare(a: Halere, b: Halere): number {
  return a === b ? 0 : a < b ? -1 : 1;
}

export function maxHalere(a: Halere, b: Halere): Halere {
  return a >= b ? a : b;
}

export function minHalere(a: Halere, b: Halere): Halere {
  return a <= b ? a : b;
}

/** Clamp negatives to zero (e.g. net wage or tax after credits cannot go below 0). */
export function clampNonNegative(a: Halere): Halere {
  return a < 0 ? ZERO : a;
}

/** Multiply a money amount by an exact non-negative integer (hours, workers, months). */
export function multiplyByInteger(base: Halere, factor: number): Halere {
  assertSafeInteger(factor, 'multiplyByInteger() factor');
  return halere(assertSafeProduct(base, factor, 'multiplyByInteger()'));
}

/**
 * Multiply a money amount by a decimal quantity expressed with a fixed number
 * of decimal places, e.g. 162.5 worked hours. Exact integer arithmetic.
 */
export function multiplyByQuantity(
  base: Halere,
  quantity: number,
  decimals: number,
  mode: RoundMode = 'nearest',
): Halere {
  if (!Number.isFinite(quantity)) {
    throw new RangeError(`money: multiplyByQuantity() quantity must be finite, got ${quantity}`);
  }
  const scale = 10 ** decimals;
  const scaledQuantity = Math.round(quantity * scale);
  const numerator = assertSafeProduct(base, scaledQuantity, 'multiplyByQuantity()');
  return halere(divRound(numerator, scale, mode));
}

/**
 * Apply a percentage rate to a base amount, rounded to whole haléře. `percent`
 * may carry up to four decimal places (7.1, 4.5, 24.8, a custom 12.5 …).
 */
export function percentOf(base: Halere, percent: number, mode: RoundMode = 'nearest'): Halere {
  if (!Number.isFinite(percent)) {
    throw new RangeError(`money: percentOf() percent must be finite, got ${percent}`);
  }
  const scaledPercent = Math.round(percent * PERCENT_SCALE);
  const numerator = assertSafeProduct(base, scaledPercent, 'percentOf()');
  return halere(divRound(numerator, 100 * PERCENT_SCALE, mode));
}

/** Apply an exact rational fraction (num/den) to a base amount, rounded to haléře. */
export function fractionOf(base: Halere, num: number, den: number, mode: RoundMode = 'nearest'): Halere {
  assertSafeInteger(num, 'fractionOf() num');
  assertSafeInteger(den, 'fractionOf() den');
  if (den === 0) throw new RangeError('money: fractionOf() denominator must not be 0');
  const numerator = assertSafeProduct(base, num, 'fractionOf()');
  return halere(divRound(numerator, den, mode));
}

/**
 * Round to whole koruny (social/health premiums and the monthly income-tax
 * advance are all "na celé koruny nahoru", i.e. mode 'up').
 */
export function roundToCzk(value: Halere, mode: RoundMode): Halere {
  return roundToUnit(value, HALERE_PER_CZK, mode);
}

/** Round to whole hundreds of koruny (monthly income-tax base "na celé stokoruny nahoru"). */
export function roundToHundredCzk(value: Halere, mode: RoundMode): Halere {
  return roundToUnit(value, HALERE_PER_HUNDRED_CZK, mode);
}

function roundToUnit(value: Halere, unitHalere: number, mode: RoundMode): Halere {
  const units = divRound(value, unitHalere, mode);
  return halere(assertSafeProduct(units, unitHalere, 'roundToUnit()'));
}
