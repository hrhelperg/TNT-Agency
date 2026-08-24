/**
 * The figures and citations the methodology panel shows, as PLAIN NUMBERS.
 *
 * WHY A SECOND COPY OF NUMBERS THAT ALREADY EXIST
 * ───────────────────────────────────────────────
 * `data/calculators/de-employer-cost/2026/rules.ts` holds these as `bigint`,
 * which is correct: it is the registry the engine computes from, and cent must
 * be exact there.
 *
 * But bigint is also SYNTAX. A `100n` literal anywhere in a module makes the
 * whole emitted chunk unparseable on a browser without BigInt, and the
 * methodology panel has to render on exactly those browsers — it is the part of
 * the page that survives when the calculator cannot run. Importing the registry
 * to render a ceiling would put the bootstrap chunk beyond the reach of the
 * browsers the bootstrap exists to serve.
 *
 * So these are plain numbers. Every value is a cent amount below 2^53, so the
 * representation is exact, and `display-facts.test.ts` asserts each one equals
 * the registry's bigint — a duplicated constant that drifts is worse than no
 * constant, and this is the only thing keeping them honest.
 *
 * NOTHING IN THIS FILE MAY USE BIGINT SYNTAX. A test asserts that too.
 */

import type { DeLocale } from './types';

/** Cent, as ordinary numbers. Exact: all are far below 2^53. */
export const DISPLAY_CENT = {
  healthCeilingMonthly: 581_250,
  pensionCeilingMonthly: 845_000,
  insuranceThresholdAnnual: 7_740_000,
  minijobMonthly: 60_300,
  transitionUpperMonthly: 200_000,
} as const;

/** The statutory bases, per branch, exactly as the registry states them. */
export const DISPLAY_BASIS = {
  pension: '§ 158 SGB VI; § 168 Absatz 1 Nummer 1 SGB VI for the split',
  unemployment: '§ 341 Absatz 2 SGB III; § 346 Absatz 1 SGB III for the split',
  health: '§ 241 SGB V; § 242 SGB V; § 249 Absatz 1 SGB V',
  care: '§ 55 Absatz 1a SGB XI i. V. m. § 1 PBAV 2025; § 55 Absatz 3 SGB XI; § 58 SGB XI',
  levies: '§ 360 SGB III; § 1, § 7 AAG; §§ 150, 153 SGB VII',
  tax: '§ 39b Absatz 2 und 6 EStG; § 32a EStG; § 51a EStG',
} as const;

const LOCALE_TAG: Readonly<Record<DeLocale, string>> = {
  de: 'de-DE',
  en: 'en-GB',
  cs: 'cs-CZ',
};

/**
 * Euro from a NUMBER of cent.
 *
 * Deliberately not `formatting.ts`'s `formatEuro`, which takes a bigint and
 * would drag the whole exact-arithmetic module — and its literals — into this
 * chunk. Same output, different input type, and that difference is the entire
 * point of the file.
 */
export function formatCentNumber(cent: number, locale: DeLocale, whole = false): string {
  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(cent / 100);
}
