/**
 * Kirchensteuer on the wage-tax deduction.
 *
 * The Programmablaufplan does not compute this. It returns BK and BKS — the
 * Bemessungsgrundlage, which is the Lohnsteuer that a Kirchensteuer would be
 * charged on — and stops. Applying the rate is this module's job, and it is
 * separate for a reason: the rate is not federal law but each Land's
 * Kirchensteuergesetz together with the religious community's own
 * Kirchensteuerbeschluss.
 *
 * IT IS NOT AN EMPLOYER COST. It is withheld from the employee alongside the
 * Lohnsteuer, so it changes the net wage and not the cost of employment. The
 * engine keeps it on the employee side of the ledger, and every total that
 * claims to be "what the employer pays" excludes it.
 *
 * THE RATE FOLLOWS THE WORKPLACE, NOT THE HOME
 * ────────────────────────────────────────────
 * The Betriebsstättenprinzip: an employer withholds at the rate in force where
 * the Betriebsstätte is, for every employee, even those living in another Land
 * with a different rate. An employee resident in Bavaria working in Hesse has
 * 9 % withheld, not 8 %; the difference comes back in their assessment. Keying
 * this on the employee's home would be wrong for exactly the cross-border
 * commuters an employer is most likely to be asking about — which is why the
 * input below is named for the workplace.
 */

import type { Ruled } from '../../../../data/calculators/de-employer-cost/types';
import type { DeLocale } from '../types';

/** The sixteen Länder, by their official abbreviations. */
export type Bundesland =
  | 'BW' | 'BY' | 'BE' | 'BB' | 'HB' | 'HH' | 'HE' | 'MV'
  | 'NI' | 'NW' | 'RP' | 'SL' | 'SN' | 'ST' | 'SH' | 'TH';

/**
 * The sixteen Länder, named in each language the calculator publishes in.
 *
 * A single German-only list rendered "Mecklenburg-Vorpommern" inside the Czech
 * and English pages, while the prose beside the control said "v Sasku" and
 * "Saxony" — so the one Land whose rules actually differ could not be matched
 * by name to the sentence explaining why it matters. The proper nouns are not
 * translated for style; they are translated because the reader has to find one.
 */
export const BUNDESLAND_NAMES: Readonly<Record<Bundesland, Readonly<Record<DeLocale, string>>>> = {
  BW: { de: 'Baden-Württemberg', en: 'Baden-Württemberg', cs: 'Bádensko-Württembersko' },
  BY: { de: 'Bayern', en: 'Bavaria', cs: 'Bavorsko' },
  BE: { de: 'Berlin', en: 'Berlin', cs: 'Berlín' },
  BB: { de: 'Brandenburg', en: 'Brandenburg', cs: 'Braniborsko' },
  HB: { de: 'Bremen', en: 'Bremen', cs: 'Brémy' },
  HH: { de: 'Hamburg', en: 'Hamburg', cs: 'Hamburk' },
  HE: { de: 'Hessen', en: 'Hesse', cs: 'Hesensko' },
  MV: {
    de: 'Mecklenburg-Vorpommern',
    en: 'Mecklenburg-Western Pomerania',
    cs: 'Meklenbursko-Přední Pomořansko',
  },
  NI: { de: 'Niedersachsen', en: 'Lower Saxony', cs: 'Dolní Sasko' },
  NW: {
    de: 'Nordrhein-Westfalen',
    en: 'North Rhine-Westphalia',
    cs: 'Severní Porýní-Vestfálsko',
  },
  RP: { de: 'Rheinland-Pfalz', en: 'Rhineland-Palatinate', cs: 'Porýní-Falc' },
  SL: { de: 'Saarland', en: 'Saarland', cs: 'Sársko' },
  SN: { de: 'Sachsen', en: 'Saxony', cs: 'Sasko' },
  ST: { de: 'Sachsen-Anhalt', en: 'Saxony-Anhalt', cs: 'Sasko-Anhaltsko' },
  SH: { de: 'Schleswig-Holstein', en: 'Schleswig-Holstein', cs: 'Šlesvicko-Holštýnsko' },
  TH: { de: 'Thüringen', en: 'Thuringia', cs: 'Durynsko' },
};

/** Saxony is the one Land with its own Pflegeversicherung split — § 58 Absatz 3 SGB XI. */
export const SAXONY: Bundesland = 'SN';

/**
 * The Hebesatz, in percentage points of the Lohnsteuer.
 *
 * Two rates in the whole country: 8 % in Baden-Württemberg and Bavaria, 9 %
 * everywhere else, for every community that has handed administration to the
 * tax authorities.
 */
export const CHURCH_TAX_RATE_PERCENT: Ruled<Readonly<Record<Bundesland, string>>> = {
  value: {
    BW: '8', BY: '8',
    BE: '9', BB: '9', HB: '9', HH: '9', HE: '9', MV: '9', NI: '9', NW: '9',
    RP: '9', SL: '9', SN: '9', ST: '9', SH: '9', TH: '9',
  },
  sourceId: 'kirchensteuer-hebesatz',
  legalBasis: 'Kirchensteuergesetze der Länder i. V. m. den Kirchensteuerbeschlüssen',
  status: 'confirmed-official',
  note:
    'Applied by Betriebsstätte, not by the employee’s residence. A community that has NOT delegated administration to the tax office collects its own contribution outside the payroll, and this calculator does not model that.',
};

export interface ChurchTaxInput {
  /** Where the Betriebsstätte is — not where the employee lives. */
  readonly workplace: Bundesland;
  /** Whether the employee belongs to a community that levies through payroll. */
  readonly liable: boolean;
}

export interface ChurchTaxResult {
  readonly amountCent: bigint;
  readonly ratePercent: string;
  /** The PAP's BK, i.e. the Lohnsteuer the rate is applied to, in cent. */
  readonly baseCent: bigint;
  /**
   * True when the Kappung der Progression could reduce this figure and has not
   * been applied. See the note on `KAPPUNG`.
   */
  readonly kappungUnmodelled: boolean;
}

/**
 * WHY THE KAPPUNG IS NOT APPLIED
 * ──────────────────────────────
 * Most Länder cap church tax at a percentage of taxable income — between about
 * 2,75 % and 4 % depending on the Land and the community — so that it stops
 * tracking the income-tax progression at high incomes. Bavaria has no cap at
 * all.
 *
 * It is left out of the monthly figure deliberately, and the result says so
 * rather than quietly omitting it. Three reasons, each sufficient:
 *
 *   • It is a feature of the ASSESSMENT, not of the deduction. In most Länder
 *     it is granted on application to the church after the year, and the
 *     employer withholds the uncapped amount regardless. A monthly figure that
 *     applied it would not match the payslip it is meant to predict.
 *   • Its base is the zu versteuerndes Einkommen, which an employer running
 *     payroll does not know — it depends on income and deductions the employer
 *     never sees.
 *   • The cap percentage is set by each community's Kirchensteuerbeschluss, and
 *     those are not published as a single authoritative machine-readable table.
 *     Assembling one from secondary sources would put unsourced numbers beside
 *     sourced ones, which §1 of the brief forbids.
 *
 * So the calculator computes what is actually withheld and tells the reader the
 * cap exists. That is a smaller answer than a capped figure and a truer one.
 */
export const KAPPUNG = {
  modelled: false,
  reason: 'kirchensteuer.kappungNotModelled',
} as const;

/** Rate for a workplace, or null when the employee is not liable. */
export function churchTaxRatePercent(input: ChurchTaxInput): string | null {
  return input.liable ? CHURCH_TAX_RATE_PERCENT.value[input.workplace] : null;
}

/**
 * Kirchensteuer from the PAP's Bemessungsgrundlage.
 *
 * `baseCent` must be BK (or BKS), not LSTLZZ. They are equal whenever there is
 * no Kinderfreibetrag, which is most of the time — and that coincidence is
 * exactly why passing the wrong one survives casual testing. With children BK
 * is smaller, because the Kinderfreibetrag reduces the church-tax and
 * Solidaritätszuschlag base while leaving the Lohnsteuer alone.
 */
export function churchTax(baseCent: bigint, input: ChurchTaxInput): ChurchTaxResult {
  const rate = churchTaxRatePercent(input);
  if (rate === null) {
    return { amountCent: 0n, ratePercent: '0', baseCent, kappungUnmodelled: false };
  }
  // Whole cent, truncated: § 51a EStG carries no rounding rule of its own and
  // the Länder's Kirchensteuergesetze follow the Lohnsteuer's own truncation.
  const amountCent = (baseCent * BigInt(rate)) / 100n;
  return {
    amountCent,
    ratePercent: rate,
    baseCent,
    kappungUnmodelled: input.workplace !== 'BY',
  };
}
