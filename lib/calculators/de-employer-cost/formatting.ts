/**
 * Turning cent into something a reader can check against a payslip.
 *
 * WHY THE LOCALE IS PASSED AND NEVER DETECTED
 * ───────────────────────────────────────────
 * `Intl` with an undefined locale takes the runtime's, which on a server is
 * whatever the container was built with and on a client is whatever the browser
 * says. Either way the same page can render "1.234,56" on the server and
 * "1,234.56" in the browser, which React reports as a hydration mismatch and a
 * reader reports as a number that changed while they were looking at it. The
 * locale comes from the route, so it is always known.
 *
 * THE CURRENCY IS ALWAYS EURO AND ALWAYS SAYS SO
 * ──────────────────────────────────────────────
 * This site also publishes a Czech calculator whose German-language view shows
 * koruna. Two calculators, one language, two currencies — so every figure here
 * carries its symbol rather than relying on the reader remembering which page
 * they are on.
 */

import type { DeLocale } from './types';

const LOCALE_TAG: Readonly<Record<DeLocale, string>> = {
  de: 'de-DE',
  en: 'en-GB',
  cs: 'cs-CZ',
};

/** Euro amount from cent, with the symbol. */
export function formatEuro(cent: bigint, locale: DeLocale): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(centToNumber(cent));
}

/** Euro amount with no fractional part — for headline totals. */
export function formatEuroWhole(cent: bigint, locale: DeLocale): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(centToNumber(cent));
}

/**
 * A contribution rate, as the source states it.
 *
 * Takes the decimal STRING the engine carries, not a number: "1.55" must render
 * as "1,55 %" and not as "1.5500000000000003 %", and it must not silently gain
 * or lose a decimal place on the way. Trailing zeros are trimmed because the
 * rates are written to different precisions — "1.8" and "1.05" are both correct
 * as published — but a rate that is genuinely two decimals keeps both.
 */
export function formatPercent(value: string, locale: DeLocale): string {
  const trimmed = value.includes('.') ? value.replace(/0+$/, '').replace(/\.$/, '') : value;
  const decimals = trimmed.includes('.') ? trimmed.split('.')[1].length : 0;
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(trimmed)) + ' %';
}

/** The employer's cost as a multiple of gross — "1,22 ×". */
export function formatFactor(value: string, locale: DeLocale): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value)) + ' ×';
}

/**
 * Cent → a JS number, for Intl only.
 *
 * The one place a monetary value becomes a float, and it is safe because it is
 * the last thing that happens to it: Intl needs a number, and no arithmetic
 * follows. Amounts beyond 2^53 cent — ninety trillion euro — would lose
 * precision, so they are refused rather than rendered wrongly.
 */
function centToNumber(cent: bigint): number {
  if (cent > BigInt(Number.MAX_SAFE_INTEGER) || cent < -BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new RangeError('de-employer-cost: amount too large to format');
  }
  return Number(cent) / 100;
}

/**
 * Parse what the user typed into cent.
 *
 * Accepts both separator conventions, because people paste figures from payroll
 * software that does not care what language the page is in. Returns null for
 * anything it cannot read, so the caller can say so rather than silently
 * treating a typo as zero — which would produce a confident answer to a question
 * nobody asked.
 *
 * TAKES THE LOCALE, and the reason is a thousandfold misread.
 *
 * With a lone separator followed by exactly three digits, "12,500" is genuinely
 * ambiguous IN ISOLATION: twelve thousand five hundred to an English reader,
 * twelve euro fifty written with a stray zero to a German one. This function
 * used to resolve it by digit count alone and always chose grouping, so a
 * German three-decimal payroll export typed into the accident-insurance field
 * became 12 500,00 EUR — added to employer cost with no error and no warning.
 * A leading-zero guard was added, which closed "0,500" and left every other
 * leading group open.
 *
 * The ambiguity is not resolvable from the digits, and it does not have to be:
 * the route knows its own language, and every formatter here is already told
 * it. So when the lone separator IS the reader's decimal separator, three
 * digits after it are refused rather than guessed at — an explicit error the
 * reader can see and correct, instead of a plausible number a thousand times
 * too large. When it is NOT the reader's decimal separator, three digits are
 * grouping, which is exactly what this module's own output looks like.
 *
 * Everything unambiguous is untouched. Both separators present: the later one
 * is the decimal point, whatever the locale. A REPEATED separator is grouping,
 * because a decimal separator cannot occur twice — so "1,000,000" still reads
 * as a million on the German page.
 */
const DECIMAL_SEPARATOR: Readonly<Record<DeLocale, string>> = { de: ',', en: '.', cs: ',' };

export function parseEuroToCent(raw: string, locale: DeLocale): bigint | null {
  const s = raw.trim().replace(/\s| |€/g, '');
  if (s === '') return null;

  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');

  let integerPart: string;
  let fraction = '';
  let grouping: string;

  if (lastComma === -1 && lastDot === -1) {
    integerPart = s;
    grouping = '';
  } else if (lastComma !== -1 && lastDot !== -1) {
    // Both present: the later one is the decimal point. No locale needed — no
    // convention writes the same character as both.
    const decimalAt = Math.max(lastComma, lastDot);
    integerPart = s.slice(0, decimalAt);
    fraction = s.slice(decimalAt + 1);
    grouping = lastComma > lastDot ? '.' : ',';
  } else {
    const sep = lastComma !== -1 ? ',' : '.';
    const at = Math.max(lastComma, lastDot);
    const tail = s.slice(at + 1);
    const repeated = s.split(sep).length > 2;
    const isDecimalSeparatorHere = sep === DECIMAL_SEPARATOR[locale];

    if (repeated) {
      // A decimal separator cannot occur twice, so this is grouping in any
      // locale. "1.000.000" and "1,000,000" both read as a million.
      integerPart = s;
      grouping = sep;
    } else if (/^\d{3}$/.test(tail)) {
      // The ambiguous case, and the only one the locale decides.
      if (isDecimalSeparatorHere) return null;
      integerPart = s;
      grouping = sep;
    } else {
      // One or two digits is a decimal amount; four or more is neither and
      // falls to the fraction check below.
      integerPart = s.slice(0, at);
      fraction = tail;
      grouping = sep === ',' ? '.' : ',';
    }
  }

  // The grouping separators must actually be grouping. Stripping every dot from
  // "1.2.3,4" turns nonsense into a confident 123,40 EUR, which is worse than
  // rejecting it: the reader gets an answer to a number they did not type. So
  // the groups are checked — one to three digits, then threes.
  if (grouping !== '') {
    const groups = integerPart.split(grouping);
    if (groups.length > 1) {
      // No grouped number is written "0.500" or "00.500".
      if (!/^[1-9]\d{0,2}$/.test(groups[0])) return null;
      if (!groups.slice(1).every((g) => /^\d{3}$/.test(g))) return null;
    }
    integerPart = groups.join('');
  }
  if (fraction !== '' && !/^\d{1,2}$/.test(fraction)) return null;

  const normalised = fraction === '' ? integerPart : `${integerPart}.${fraction}`;
  if (!/^\d+(\.\d{1,2})?$/.test(normalised)) return null;
  const [whole, frac = ''] = normalised.split('.');
  return BigInt(whole) * 100n + BigInt(frac.padEnd(2, '0'));
}

/**
 * Parse a percentage the user typed, e.g. a Zusatzbeitragssatz.
 *
 * Returned as a decimal STRING rather than a number, so it reaches the exact
 * arithmetic unchanged. Capped at two decimals because that is the precision
 * Krankenkassen publish and because a third decimal cannot survive the
 * contribution rounding anyway.
 */
export function parsePercent(raw: string): string | null {
  const s = raw.trim().replace(/\s| |%/g, '').replace(',', '.');
  if (s === '') return null;
  if (!/^\d{1,2}(\.\d{1,2})?$/.test(s)) return null;
  return s;
}
