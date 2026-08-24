/**
 * Presentation for the Czech employer-cost calculator, in cs / en / de.
 *
 * THE RULE THIS FILE EXISTS TO KEEP
 * ─────────────────────────────────
 * Locale is presentation. It is not arithmetic.
 *
 * The same employee costs the same koruny whether the page is read in Czech,
 * English or German, because the money is Czech and so is the law. Everything
 * in this module takes an already-computed `Halere` and turns it into a string.
 * Nothing here rounds, scales, converts a currency or picks a different rule.
 * §35 of the build brief requires cs → en → de to leave every number identical,
 * and `formatting.test.ts` asserts it against the whole engine, not just here.
 *
 * That is also why the currency is CZK in all three locales and is never
 * converted. A German-language page showing euro would be inventing an exchange
 * rate and, worse, would read as German payroll — the exact jurisdiction
 * confusion §37 forbids.
 *
 * WHY Intl, AND WHAT IS PINNED
 * ────────────────────────────
 * Number formatting differs genuinely between these locales:
 *
 *     cs-CZ    22 400 Kč        1 234,56        7,1 %
 *     en       CZK 22,400       1,234.56        7.1%
 *     de-DE    22.400 CZK       1.234,56        7,1 %
 *
 * Getting that wrong makes a page look machine-translated. Intl knows it, so
 * Intl does it. What is NOT left to Intl is the digits: fraction digits are
 * pinned explicitly on every formatter, because the default for CZK is two
 * decimals and a payroll figure printed as "22 400,00 Kč" in a summary reads as
 * false precision — the statutory amounts are whole koruny by law.
 *
 * Formatters are built once per locale and memoised. Constructing an
 * Intl.NumberFormat is not free, and a result table builds a few hundred
 * strings.
 */

import { toCzkNumber, type Halere } from '../../payroll/money';

/** The three locales this calculator is published in. All are Czech-jurisdiction views. */
export type CalculatorLocale = 'cs' | 'en' | 'de';

/**
 * BCP 47 tag per locale.
 *
 * `en` deliberately, not `en-GB` or `en-US`: the English page is not aimed at
 * one English-speaking country, and the two differ only in ways irrelevant here.
 * `de-DE` and `cs-CZ` are explicit because their separators are the point.
 */
const INTL_LOCALE: Readonly<Record<CalculatorLocale, string>> = {
  cs: 'cs-CZ',
  en: 'en',
  de: 'de-DE',
};

type FormatterSet = {
  readonly czk: Intl.NumberFormat;
  readonly czkPrecise: Intl.NumberFormat;
  readonly number: Intl.NumberFormat;
  readonly percent: Intl.NumberFormat;
};

const CACHE = new Map<CalculatorLocale, FormatterSet>();

function formatters(locale: CalculatorLocale): FormatterSet {
  const cached = CACHE.get(locale);
  if (cached) return cached;

  const tag = INTL_LOCALE[locale];
  const set: FormatterSet = {
    czk: new Intl.NumberFormat(tag, {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
    czkPrecise: new Intl.NumberFormat(tag, {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    number: new Intl.NumberFormat(tag, { minimumFractionDigits: 0, maximumFractionDigits: 2 }),
    percent: new Intl.NumberFormat(tag, { minimumFractionDigits: 0, maximumFractionDigits: 2 }),
  };
  CACHE.set(locale, set);
  return set;
}

/**
 * Whole-koruna money: "22 400 Kč" / "CZK 22,400" / "22.400 CZK".
 *
 * The default presentation for every statutory line, because every statutory
 * amount is rounded to whole koruny by law before it is ever displayed.
 */
export function formatCzk(value: Halere, locale: CalculatorLocale): string {
  return formatters(locale).czk.format(toCzkNumber(value));
}

/**
 * Money to the haléř: "1 234,56 Kč".
 *
 * For intermediate values in the audit trail — an unrounded percentage of an
 * assessment base, an hourly rate — where hiding the haléře would make a
 * rounding step look like an arithmetic error.
 */
export function formatCzkPrecise(value: Halere, locale: CalculatorLocale): string {
  return formatters(locale).czkPrecise.format(toCzkNumber(value));
}

/** A plain number with locale separators. */
export function formatNumber(value: number, locale: CalculatorLocale): string {
  return formatters(locale).number.format(value);
}

/**
 * A rate: "7,1 %" / "7.1%" / "7,1 %".
 *
 * Built from a plain number rather than Intl's `style: 'percent'`, which would
 * require dividing by 100 first and thereby put an arithmetic operation into a
 * formatting function — the one thing this module must not contain.
 *
 * The space before the sign follows each locale's own convention: Czech and
 * German set it, English does not.
 */
export function formatPercent(value: number, locale: CalculatorLocale): string {
  const n = formatters(locale).percent.format(value);
  return locale === 'en' ? `${n}%` : `${n} %`;
}

/** Per-mille, used only by the statutory employer-liability insurance rate: "5,04 ‰". */
export function formatPerMille(value: number, locale: CalculatorLocale): string {
  const n = formatters(locale).percent.format(value);
  return locale === 'en' ? `${n}‰` : `${n} ‰`;
}

/** An hourly money rate: "134,40 Kč/h". */
export function formatCzkPerHour(value: Halere, locale: CalculatorLocale): string {
  return `${formatCzkPrecise(value, locale)}/h`;
}

/** Hours: "162,5 h". */
export function formatHours(value: number, locale: CalculatorLocale): string {
  return `${formatNumber(value, locale)} h`;
}

/**
 * A signed difference, for the derived metrics in §24: "+3 456 Kč".
 *
 * An explicit "+" on a positive number, because these figures are read as
 * "how much ABOVE gross", and an unsigned number in a column that can go either
 * way is ambiguous. Zero gets no sign.
 */
export function formatCzkSigned(value: Halere, locale: CalculatorLocale): string {
  const formatted = formatCzk(value, locale);
  return value > 0 ? `+${formatted}` : formatted;
}

/**
 * A ratio expressed as a percentage, e.g. net-to-gross.
 *
 * Returns null for an undefined ratio rather than "0 %" or "NaN %": when gross
 * is zero the ratio does not exist, and printing a number for it would assert
 * something false. The UI renders "—".
 */
export function formatRatioPercent(
  numerator: Halere,
  denominator: Halere,
  locale: CalculatorLocale,
  decimals = 1,
): string | null {
  if (denominator === 0) return null;
  const ratio = (numerator / denominator) * 100;
  if (!Number.isFinite(ratio)) return null;
  const rounded = Math.round(ratio * 10 ** decimals) / 10 ** decimals;
  const n = new Intl.NumberFormat(INTL_LOCALE[locale], {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(rounded);
  return locale === 'en' ? `${n}%` : `${n} %`;
}
