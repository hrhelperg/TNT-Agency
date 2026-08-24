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
 * Accepts both separators in every locale, because people paste figures from
 * payroll software that does not care what language the page is in. Returns null
 * for anything it cannot read, so the caller can say so rather than silently
 * treating a typo as zero — which would produce a confident answer to a question
 * nobody asked.
 */
export function parseEuroToCent(raw: string): bigint | null {
  const s = raw.trim().replace(/\s| |€/g, '');
  if (s === '') return null;

  // "1.234,56" (German) and "1,234.56" (English) both mean the same amount. The
  // decisive character is the LAST separator; anything before it is grouping.
  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');

  let integerPart: string;
  let fraction = '';
  let grouping: string;
  if (lastComma === -1 && lastDot === -1) {
    integerPart = s;
    grouping = '';
  } else if (lastComma > lastDot) {
    integerPart = s.slice(0, lastComma);
    fraction = s.slice(lastComma + 1);
    grouping = '.';
  } else {
    integerPart = s.slice(0, lastDot);
    fraction = s.slice(lastDot + 1);
    grouping = ',';
  }

  // The grouping separators must actually be grouping. Stripping every dot from
  // "1.2.3,4" turns nonsense into a confident 123,40 EUR, which is worse than
  // rejecting it: the reader gets an answer to a number they did not type. So
  // the groups are checked — one to three digits, then threes.
  if (grouping !== '') {
    const groups = integerPart.split(grouping);
    if (groups.length > 1) {
      if (!/^\d{1,3}$/.test(groups[0])) return null;
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
