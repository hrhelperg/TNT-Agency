/**
 * The two official Prüftabellen from Anlage 1, pages 39 and 40.
 *
 * WHY THESE ARE THE GATE
 * ──────────────────────
 * BMF publishes them for exactly one purpose: so that an implementer can check
 * a program against the announced algorithm. They are the only numbers in the
 * whole document that are OUTPUTS rather than instructions, which makes them
 * the one place where a transcription can be falsified rather than merely
 * re-read. Everything else in this build — the interpreter, the production
 * engine, the differential test between them — is checked against these 516
 * cells first, and nothing downstream is trusted until they pass.
 *
 * The numbers are extracted from the published PDF rather than typed, because
 * 516 hand-copied figures would contain errors and the errors would look like
 * engine defects. They are whole EURO, as the tables state.
 *
 * THE TWO TABLES ARE NOT TWO SCENARIOS — THEY ARE THE TWO ENDS OF THE
 * VORSORGEPAUSCHALE
 * ─────────────────────────────────────────────────────────────────────
 * "Allgemeine Lohnsteuer" is the tax for an employee insured in EVERY branch of
 * social insurance; "besondere Lohnsteuer" is the tax for an employee insured in
 * NONE. Between them they exercise both halves of every branch in the
 * Vorsorgepauschale, which is where the algorithm is hardest and where a
 * plausible-looking engine goes wrong quietly. A calculator that matches only
 * the first table has not been tested at all on the private-insurance path.
 *
 * NOTE THE 2026 INPUT THAT DID NOT EXIST IN 2025
 * ─────────────────────────────────────────────
 * The footnote reads "mit den Merkern ALV, KRV und PKV" — three flags, where
 * 2025 had two. ALV is new for 2026 and splits the unemployment-insurance
 * assumption out of KRV, which previously carried both. Anyone porting a 2025
 * implementation forward keeps a single flag, gets the general table right
 * because there both are 0, and is wrong on every employee who is in one scheme
 * but not the other.
 */

export interface PrueftabelleRow {
  /** Jahresbruttolohn in whole euro. */
  readonly brutto: number;
  /** Jahreslohnsteuer in whole euro, indexed by Steuerklasse I…VI. */
  readonly lohnsteuer: readonly [number, number, number, number, number, number];
}

const row = (
  brutto: number,
  i: number, ii: number, iii: number, iv: number, v: number, vi: number,
): PrueftabelleRow => ({ brutto, lohnsteuer: [i, ii, iii, iv, v, vi] });

/**
 * Page 39. Footnotes 1 and 2, verbatim:
 *   "Berechnet mit den Merkern ALV, KRV und PKV = 0 sowie KVZ = 2,90."
 *   "In der Steuerklasse II gilt PVZ = 0, in den anderen Steuerklassen gilt PVZ = 1."
 *
 * The PVZ split is not decoration. Steuerklasse II presupposes a child (the
 * Entlastungsbetrag für Alleinerziehende), and someone with a child does not pay
 * the childless surcharge — so the table encodes a consistency the algorithm
 * itself does not enforce. Running class II with PVZ = 1 reproduces neither this
 * table nor any real payslip.
 */
export const PRUEFTABELLE_ALLGEMEIN: readonly PrueftabelleRow[] = [
  [5000, 0, 0, 0, 0, 372, 558],
  [7500, 0, 0, 0, 0, 647, 838],
  [10000, 0, 0, 0, 0, 922, 1117],
  [12500, 0, 0, 0, 0, 1197, 1397],
  [15000, 0, 0, 0, 0, 1472, 1676],
  [17500, 51, 0, 0, 51, 1778, 1956],
  [20000, 380, 0, 0, 380, 2234, 2766],
  [22500, 782, 32, 0, 782, 3073, 3604],
  [25000, 1251, 359, 0, 1251, 3911, 4443],
  [27500, 1742, 759, 0, 1742, 4749, 5281],
  [30000, 2248, 1230, 0, 2248, 5588, 6120],
  [32500, 2767, 1724, 0, 2767, 6426, 6952],
  [35000, 3300, 2233, 294, 3300, 7216, 7682],
  [37500, 3847, 2756, 628, 3847, 7954, 8436],
  [40000, 4407, 3293, 1000, 4407, 8720, 9218],
  [42500, 4982, 3843, 1406, 4982, 9512, 10030],
  [45000, 5570, 4408, 1850, 5570, 10334, 10865],
  [47500, 6172, 4987, 2324, 6172, 11171, 11703],
  [50000, 6788, 5580, 2810, 6788, 12010, 12542],
  [52500, 7417, 6186, 3302, 7417, 12848, 13380],
  [55000, 8060, 6807, 3802, 8060, 13687, 14218],
  [57500, 8718, 7442, 4308, 8718, 14525, 15057],
  [60000, 9389, 8091, 4822, 9389, 15364, 15895],
  [62500, 10073, 8754, 5342, 10073, 16202, 16734],
  [65000, 10772, 9430, 5870, 10772, 17040, 17572],
  [67500, 11484, 10121, 6402, 11484, 17879, 18410],
  [70000, 12220, 10835, 6952, 12220, 18729, 19260],
  [72500, 13062, 11647, 7574, 13062, 19681, 20213],
  [75000, 13922, 12476, 8206, 13922, 20633, 21165],
  [77500, 14799, 13323, 8846, 14799, 21585, 22117],
  [80000, 15694, 14188, 9496, 15694, 22538, 23070],
  [82500, 16607, 15071, 10154, 16607, 23490, 24022],
  [85000, 17538, 15971, 10822, 17538, 24443, 24974],
  [87500, 18486, 16890, 11498, 18486, 25395, 25927],
  [90000, 19438, 17826, 12182, 19438, 26347, 26879],
  [92500, 20390, 18777, 12876, 20390, 27300, 27831],
  [95000, 21343, 19729, 13580, 21343, 28252, 28784],
  [97500, 22295, 20682, 14292, 22295, 29204, 29736],
  [100000, 23248, 21634, 15012, 23248, 30157, 30689],
  [102500, 24243, 22629, 15774, 24243, 31152, 31684],
  [105000, 25293, 23679, 16590, 25293, 32202, 32734],
  [107500, 26343, 24729, 17416, 26343, 33252, 33784],
  [110000, 27393, 25779, 18252, 27393, 34302, 34834],
].map((r) => row(...(r as [number, number, number, number, number, number, number])));

/**
 * Page 40. Footnotes 3 and 4, verbatim:
 *   "Berechnet mit den Merkern ALV, KRV und PKV = 1."
 *   "In der Steuerklasse III gilt PKPV = 50.000, in der Steuerklasse VI gilt
 *    PKPV = 0, in den anderen Steuerklassen gilt PKPV = 30.000."
 *
 * PKPV is stated in CENT and — this is the trap — "der Wert ist unabhängig vom
 * Lohnzahlungszeitraum immer als Monatsbetrag anzugeben". So 50.000 is 500 EUR
 * A MONTH even though every other figure in this table is annual. Feeding it as
 * an annual amount produces a table that is wrong only in the private-insurance
 * classes, which is precisely the kind of failure that survives a spot check.
 */
export const PRUEFTABELLE_BESONDERS: readonly PrueftabelleRow[] = [
  [5000, 0, 0, 0, 0, 18, 700],
  [7500, 0, 0, 0, 0, 368, 1050],
  [10000, 0, 0, 0, 0, 718, 1400],
  [12500, 0, 0, 0, 0, 1068, 1750],
  [15000, 0, 0, 0, 0, 1418, 2359],
  [17500, 40, 0, 0, 40, 1768, 3409],
  [20000, 461, 0, 0, 461, 2415, 4459],
  [22500, 995, 153, 0, 995, 3465, 5509],
  [25000, 1604, 607, 0, 1604, 4515, 6559],
  [27500, 2234, 1173, 0, 2234, 5565, 7514],
  [30000, 2886, 1788, 0, 2886, 6615, 8460],
  [32500, 3559, 2424, 76, 3559, 7564, 9446],
  [35000, 4254, 3083, 466, 4254, 8510, 10473],
  [37500, 4971, 3763, 914, 4971, 9498, 11523],
  [40000, 5710, 4464, 1420, 5710, 10529, 12573],
  [42500, 6470, 5188, 1982, 6470, 11579, 13623],
  [45000, 7252, 5932, 2584, 7252, 12629, 14673],
  [47500, 8055, 6699, 3198, 8055, 13679, 15723],
  [50000, 8880, 7487, 3824, 8880, 14729, 16773],
  [52500, 9727, 8297, 4458, 9727, 15779, 17823],
  [55000, 10595, 9128, 5106, 10595, 16829, 18873],
  [57500, 11485, 9981, 5762, 11485, 17879, 19923],
  [60000, 12396, 10856, 6430, 12396, 18929, 20973],
  [62500, 13330, 11752, 7110, 13330, 19979, 22023],
  [65000, 14284, 12670, 7798, 14284, 21029, 23073],
  [67500, 15261, 13610, 8500, 15261, 22079, 24123],
  [70000, 16259, 14571, 9210, 16259, 23129, 25173],
  [72500, 17279, 15554, 9932, 17279, 24179, 26223],
  [75000, 18320, 16559, 10666, 18320, 25229, 27273],
  [77500, 19370, 17585, 11410, 19370, 26279, 28323],
  [80000, 20420, 18631, 12164, 20420, 27329, 29373],
  [82500, 21470, 19681, 12930, 21470, 28379, 30423],
  [85000, 22520, 20731, 13706, 22520, 29429, 31473],
  [87500, 23570, 21781, 14492, 23570, 30479, 32523],
  [90000, 24620, 22831, 15290, 24620, 31529, 33573],
  [92500, 25670, 23881, 16098, 25670, 32579, 34623],
  [95000, 26720, 24931, 16918, 26720, 33629, 35673],
  [97500, 27770, 25981, 17748, 27770, 34679, 36723],
  [100000, 28820, 27031, 18590, 28820, 35729, 37773],
  [102500, 29870, 28081, 19442, 29870, 36779, 38823],
  [105000, 30920, 29131, 20304, 30920, 37829, 39873],
  [107500, 31970, 30181, 21178, 31970, 38879, 40923],
  [110000, 33020, 31231, 22062, 33020, 39929, 41973],
].map((r) => row(...(r as [number, number, number, number, number, number, number])));

/** The PKPV monthly amount per Steuerklasse for the besondere table, in Cent. */
export const BESONDERS_PKPV_CENT: Readonly<Record<number, number>> = {
  1: 30_000, 2: 30_000, 3: 50_000, 4: 30_000, 5: 30_000, 6: 0,
};
