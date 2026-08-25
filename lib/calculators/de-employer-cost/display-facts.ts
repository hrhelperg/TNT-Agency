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

/**
 * The statutory bases, per branch, LOCALIZED.
 *
 * The PROVISION IDENTIFIERS stay in German — the code name "SGB XI", the
 * section number, the letter suffixes. They are what a reader types into
 * gesetze-im-internet.de, so translating them would break the one thing this
 * panel exists for. The STRUCTURAL WORDS around them follow the reader's
 * language: English gets "split under" and "together with", Czech gets "odst."
 * and "č.", so "§ 55 odst. 1a SGB XI" still resolves to the same provision.
 * An earlier version of this comment said flatly that the provisions "stay in
 * German", which the Czech entries below have never done and should not.
 * What must not stay in one language is the connective tissue. A single locale-neutral string
 * put the English "for the split" inside a `lang="de"` section and the German
 * "i. V. m." inside a `lang="en"` one, which is a locale falling back to
 * another's words in the one panel that exists to be checked against the law.
 */
export const DISPLAY_BASIS: Readonly<Record<string, Readonly<Record<DeLocale, string>>>> = {
  pension: {
    de: '§ 158 SGB VI; Aufteilung nach § 168 Absatz 1 Nummer 1 SGB VI',
    en: '§ 158 SGB VI; split under § 168 Absatz 1 Nummer 1 SGB VI',
    cs: '§ 158 SGB VI; rozdělení podle § 168 odst. 1 č. 1 SGB VI',
  },
  unemployment: {
    de: '§ 341 Absatz 2 SGB III; Aufteilung nach § 346 Absatz 1 SGB III',
    en: '§ 341 Absatz 2 SGB III; split under § 346 Absatz 1 SGB III',
    cs: '§ 341 odst. 2 SGB III; rozdělení podle § 346 odst. 1 SGB III',
  },
  health: {
    de: '§ 241 SGB V; § 242 SGB V; § 249 Absatz 1 SGB V',
    en: '§ 241 SGB V; § 242 SGB V; § 249 Absatz 1 SGB V',
    cs: '§ 241 SGB V; § 242 SGB V; § 249 odst. 1 SGB V',
  },
  care: {
    de: '§ 55 Absatz 1a SGB XI i. V. m. § 1 PBAV 2025; § 55 Absatz 3 SGB XI; § 58 SGB XI',
    en: '§ 55 Absatz 1a SGB XI together with § 1 PBAV 2025; § 55 Absatz 3 SGB XI; § 58 SGB XI',
    cs: '§ 55 odst. 1a SGB XI ve spojení s § 1 PBAV 2025; § 55 odst. 3 SGB XI; § 58 SGB XI',
  },
  levies: {
    de: '§ 360 SGB III; § 1, § 7 AAG; §§ 150, 153 SGB VII',
    en: '§ 360 SGB III; § 1, § 7 AAG; §§ 150, 153 SGB VII',
    cs: '§ 360 SGB III; § 1, § 7 AAG; §§ 150, 153 SGB VII',
  },
  tax: {
    de: '§ 39b Absatz 2 und 6 EStG; § 32a EStG; § 51a EStG',
    en: '§ 39b Absatz 2 and Absatz 6 EStG; § 32a EStG; § 51a EStG',
    cs: '§ 39b odst. 2 a 6 EStG; § 32a EStG; § 51a EStG',
  },
};

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
