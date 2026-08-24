/**
 * Lohnsteuer, Solidaritätszuschlag and the Kirchensteuer base for 2026.
 *
 * A hand transcription of the BMF Programmablaufplan 2026 (Anlage 1 to the
 * BMF-Schreiben of 12 November 2025), announced under § 39b Absatz 6 and § 51
 * Absatz 4 Nummer 1a EStG. Provenance, publication identity and the vendored
 * source document are recorded in
 * `data/calculators/de-employer-cost/2026/pap/provenance.ts`.
 *
 * WHY A TRANSCRIPTION AND NOT A FORMULA
 * ─────────────────────────────────────
 * German wage tax is not `gross × rate`, and it is not the § 32a EStG tariff
 * applied to gross either. Between the two sits an algorithm: annualise, strip
 * the Versorgungsfreibetrag and Altersentlastungsbetrag, subtract the
 * Pauschbeträge that this Steuerklasse gets, compute a Vorsorgepauschale from
 * FICTITIOUS social-insurance rates, run the tariff, halve-and-double for
 * splitting, apply the Steuerklasse V/VI band construction, then de-annualise.
 * Order matters, every intermediate has a prescribed number of decimal places,
 * and the rounding direction alternates between down and up 56 times.
 *
 * So this file follows the flowchart step for step and keeps ITS variable names
 * — ZRE4J, ZTABFB, VSPKVPV, ZZX. They are opaque out of context and that is the
 * point: a reviewer holding Anlage 1 open beside this file can check it line by
 * line, which is the only review that can actually find a defect here. Renaming
 * them to something readable would make the code look better and be unreviewable.
 *
 * HOW IT IS CHECKED
 * ─────────────────
 * Two ways, both independent of the author's reading of the flowchart:
 *
 *   1. Against the 516 cells of the two official Prüftabellen (Anlage 1 pages
 *      39–40), which are the only published outputs of the announced algorithm.
 *   2. Differentially against `../reference/pap-interpreter.ts`, which executes
 *      the published XML directly and therefore cannot share a transcription
 *      error with this file.
 *
 * WHAT IT DOES NOT COMPUTE
 * ────────────────────────
 * Kirchensteuer — it returns the BASE (BK, BKS) and the caller applies the
 * Land's rate and any Kappung.
 *
 * Social-security contributions. RVSATZAN, AVSATZAN, KVSATZAN and PVSATZAN
 * below are the PAP's own fictitious rates and exist only to size the
 * Vorsorgepauschale, a notional deduction from the tax base. They are NOT the
 * contributions withheld from pay, they are near enough to the real rates to
 * look right, and reusing them for the actual SV deduction is a classic silent
 * error. The real contributions live in `../social/`.
 */

import { Decimal, type RoundingMode } from '../decimal';

const DOWN: RoundingMode = 'DOWN';
const UP: RoundingMode = 'UP';

const d = (v: string | number) => Decimal.of(v);
const ZERO = Decimal.ZERO;

// ─────────────────────────────────────────────────────────────────────────────
// Konstanten
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TAB1–TAB5, indexed by the year of the first Versorgungsbezug (TAB1–TAB3) or
 * the year after the employee turned 64 (TAB4–TAB5), offset by 2004.
 *
 * Index 0 is unused: the PAP computes J = VJAHR − 2004 with a floor of 1, so
 * the leading zero keeps the transcription's indexing identical to the
 * flowchart's rather than introducing an off-by-one that would be invisible
 * except in the cohorts nobody tests.
 */
const TAB1 = [
  0, 0.4, 0.384, 0.368, 0.352, 0.336, 0.32, 0.304, 0.288, 0.272, 0.256, 0.24, 0.224, 0.208,
  0.192, 0.176, 0.16, 0.152, 0.144, 0.14, 0.136, 0.132, 0.128, 0.124, 0.12, 0.116, 0.112,
  0.108, 0.104, 0.1, 0.096, 0.092, 0.088, 0.084, 0.08, 0.076, 0.072, 0.068, 0.064, 0.06,
  0.056, 0.052, 0.048, 0.044, 0.04, 0.036, 0.032, 0.028, 0.024, 0.02, 0.016, 0.012, 0.008,
  0.004, 0,
].map((v) => d(v));

const TAB2 = [
  0, 3000, 2880, 2760, 2640, 2520, 2400, 2280, 2160, 2040, 1920, 1800, 1680, 1560, 1440,
  1320, 1200, 1140, 1080, 1050, 1020, 990, 960, 930, 900, 870, 840, 810, 780, 750, 720, 690,
  660, 630, 600, 570, 540, 510, 480, 450, 420, 390, 360, 330, 300, 270, 240, 210, 180, 150,
  120, 90, 60, 30, 0,
].map((v) => d(v));

const TAB3 = [
  0, 900, 864, 828, 792, 756, 720, 684, 648, 612, 576, 540, 504, 468, 432, 396, 360, 342,
  324, 315, 306, 297, 288, 279, 270, 261, 252, 243, 234, 225, 216, 207, 198, 189, 180, 171,
  162, 153, 144, 135, 126, 117, 108, 99, 90, 81, 72, 63, 54, 45, 36, 27, 18, 9, 0,
].map((v) => d(v));

/** Identical to TAB1 for 2026, but a separate table in the flowchart — kept separate. */
const TAB4 = TAB1.slice();

const TAB5 = [
  0, 1900, 1824, 1748, 1672, 1596, 1520, 1444, 1368, 1292, 1216, 1140, 1064, 988, 912, 836,
  760, 722, 684, 665, 646, 627, 608, 589, 570, 551, 532, 513, 494, 475, 456, 437, 418, 399,
  380, 361, 342, 323, 304, 285, 266, 247, 228, 209, 190, 171, 152, 133, 114, 95, 76, 57, 38,
  19, 0,
].map((v) => d(v));

const ZAHL1 = d(1);
const ZAHL2 = d(2);
const ZAHL7 = d(7);
const ZAHL12 = d(12);
const ZAHL100 = d(100);
const ZAHL360 = d(360);
const ZAHL700 = d(700);
const ZAHL10000 = d(10_000);

// ─────────────────────────────────────────────────────────────────────────────
// Ein- und Ausgaben
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The PAP's own inputs, in the PAP's own units.
 *
 * MONETARY VALUES ARE IN CENT. Every one of them. Passing euro produces a
 * result that is wrong by a factor of a hundred in a direction that looks like
 * a tax bracket rather than a unit error.
 */
export interface Pap2026Inputs {
  /** 1 = Faktorverfahren active (only meaningful in Steuerklasse IV). */
  readonly af?: number;
  /** Faktor with three decimals; ignored unless `af` is 1. */
  readonly f?: number;
  /** Year after the employee turned 64 — required when ALTER1 is 1. */
  readonly AJAHR?: number;
  /** 1 if the 64th birthday fell before the start of this calendar year (§ 24a EStG). */
  readonly ALTER1?: number;
  /** 0 = compulsorily insured against unemployment. NEW FOR 2026 — see below. */
  readonly ALV?: number;
  /** Jahresfreibetrag for sonstige Bezüge, in Cent. */
  readonly JFREIB?: number;
  /** Jahreshinzurechnungsbetrag, in Cent. */
  readonly JHINZU?: number;
  /** Voraussichtlicher Jahresarbeitslohn without sonstige Bezüge, in Cent. */
  readonly JRE4?: number;
  /** Entschädigungen im Sinne des § 24 Nummer 1 EStG inside JRE4, in Cent. */
  readonly JRE4ENT?: number;
  /** Versorgungsbezüge inside JRE4, in Cent. */
  readonly JVBEZ?: number;
  /** 0 = compulsorily insured in the statutory pension or a Versorgungswerk. */
  readonly KRV?: number;
  /** Kassenindividueller Zusatzbeitragssatz in PERCENT, e.g. 2.90 — not 0.029. */
  readonly KVZ?: number | string;
  /** 1 = year, 2 = month, 3 = week, 4 = day. */
  readonly LZZ?: number;
  /** Freibetrag for this Lohnzahlungszeitraum, in Cent. */
  readonly LZZFREIB?: number;
  /** Hinzurechnungsbetrag for this Lohnzahlungszeitraum, in Cent. */
  readonly LZZHINZU?: number;
  /** Nicht besteuerte Vorteile bei Vermögensbeteiligungen (§ 19a EStG), in Cent. */
  readonly MBV?: number;
  /** Private Basiskranken- und Pflege-Pflichtversicherung, in Cent — ALWAYS MONTHLY. */
  readonly PKPV?: number;
  /** Steuerfreier Arbeitgeberzuschuss to that insurance, in Cent — ALWAYS MONTHLY. */
  readonly PKPVAGZ?: number;
  /** 0 = statutory health insurance, 1 = private only. */
  readonly PKV?: number;
  /** Number of Beitragsabschläge in the Pflegeversicherung (0–4), for 2+ children. */
  readonly PVA?: number | string;
  /** 1 = the Saxon Pflegeversicherung rules apply. */
  readonly PVS?: number;
  /** 1 = the employee owes the childless surcharge. */
  readonly PVZ?: number;
  /** Religionsgemeinschaft; 0 = none. Only its sign is used. */
  readonly R?: number;
  /** Steuerpflichtiger Arbeitslohn for this Lohnzahlungszeitraum, in Cent. */
  readonly RE4?: number;
  /** Sonstige Bezüge, in Cent. */
  readonly SONSTB?: number;
  /** Entschädigungen inside SONSTB, in Cent. */
  readonly SONSTENT?: number;
  /** Sterbegeld inside VBEZBSO, in Cent. */
  readonly STERBE?: number;
  /** Steuerklasse, 1–6. */
  readonly STKL?: number;
  /** Versorgungsbezüge inside RE4, in Cent. */
  readonly VBEZ?: number;
  /** Versorgungsbezug for the month of the first payment, in Cent. */
  readonly VBEZM?: number;
  /** Einmalzahlung of Versorgungsbezüge in that month, in Cent. */
  readonly VBEZS?: number;
  /** Versorgungsbezüge inside SONSTB, in Cent. */
  readonly VBS?: number;
  /** Year the Versorgungsbezug began. */
  readonly VJAHR?: number;
  /** Zahl der Kinderfreibeträge. */
  readonly ZKF?: number | string;
  /** Number of months the Versorgungsbezug ran in this year (0 = full year). */
  readonly ZMVB?: number;
}

/** Both output blocks the XML declares: the six STANDARD and the six DBA values. */
export interface Pap2026Outputs {
  /** Bemessungsgrundlage für die Kirchenlohnsteuer, in Cent. NOT the tax. */
  readonly BK: Decimal;
  /** Same, for sonstige Bezüge. */
  readonly BKS: Decimal;
  /** Lohnsteuer for this Lohnzahlungszeitraum, in Cent. */
  readonly LSTLZZ: Decimal;
  /** Solidaritätszuschlag for this Lohnzahlungszeitraum, in Cent. */
  readonly SOLZLZZ: Decimal;
  /** Solidaritätszuschlag on sonstige Bezüge, in Cent. */
  readonly SOLZS: Decimal;
  /** Lohnsteuer on sonstige Bezüge, in Cent. */
  readonly STS: Decimal;
  /** Verbrauchter Freibetrag, in Cent — for the DBA-Bescheinigung. */
  readonly VFRB: Decimal;
  readonly VFRBS1: Decimal;
  readonly VFRBS2: Decimal;
  /** Für die Vorsorgepauschale wirksamer Freibetrag, in Cent. */
  readonly WVFRB: Decimal;
  readonly WVFRBO: Decimal;
  readonly WVFRBM: Decimal;
}

/**
 * Every variable at the end of the run.
 *
 * Exposed because a differential mismatch against the reference interpreter is
 * useless if all you can see is that two euro figures differ — the first
 * intermediate that diverges is the answer, and it is usually thirty steps
 * earlier.
 */
export type Pap2026Trace = Readonly<Record<string, Decimal | number>>;

export interface Pap2026Result {
  readonly outputs: Pap2026Outputs;
  readonly trace: Pap2026Trace;
}

// ─────────────────────────────────────────────────────────────────────────────
// Zustand
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The PAP's variables, all of them, in one mutable record.
 *
 * Deliberately a bag of mutable state rather than pure functions returning
 * values. The flowchart's subroutines communicate exclusively through shared
 * variables and several of them depend on it: MBERECH calls MZTABFB, mutates
 * ZTABFB afterwards and calls MLSTJAHR again to get a second answer out of the
 * same code; MSOLZ multiplies SOLZFREI by KZTAB in place and MSOLZSTS later
 * compares against the multiplied value. Rewriting that as pure functions means
 * deciding what each subroutine "really" takes and returns, and every such
 * decision is a chance to be wrong in a way the flowchart cannot be checked
 * against.
 */
interface S {
  [k: string]: Decimal | number;
}

function initialState(input: Pap2026Inputs): S {
  const int = (v: number | undefined, fallback = 0) => v ?? fallback;
  const dec = (v: number | string | undefined) => (v === undefined ? ZERO : d(v));

  return {
    // ── Eingaben ──
    af: int(input.af, 1),
    f: input.f ?? 1,
    AJAHR: int(input.AJAHR),
    ALTER1: int(input.ALTER1),
    ALV: int(input.ALV),
    JFREIB: dec(input.JFREIB),
    JHINZU: dec(input.JHINZU),
    JRE4: dec(input.JRE4),
    JRE4ENT: dec(input.JRE4ENT),
    JVBEZ: dec(input.JVBEZ),
    KRV: int(input.KRV),
    KVZ: dec(input.KVZ),
    LZZ: int(input.LZZ, 1),
    LZZFREIB: dec(input.LZZFREIB),
    LZZHINZU: dec(input.LZZHINZU),
    MBV: dec(input.MBV),
    PKPV: dec(input.PKPV),
    PKPVAGZ: dec(input.PKPVAGZ),
    PKV: int(input.PKV),
    PVA: dec(input.PVA),
    PVS: int(input.PVS),
    PVZ: int(input.PVZ),
    R: int(input.R),
    RE4: dec(input.RE4),
    SONSTB: dec(input.SONSTB),
    SONSTENT: dec(input.SONSTENT),
    STERBE: dec(input.STERBE),
    STKL: int(input.STKL, 1),
    VBEZ: dec(input.VBEZ),
    VBEZM: dec(input.VBEZM),
    VBEZS: dec(input.VBEZS),
    VBS: dec(input.VBS),
    // The XML misspells this declaration's attribute as `defaul`, so the
    // published document itself gives VJAHR no default. Zero is what an int
    // field initialises to either way, and MRE4 only reads it when there are
    // Versorgungsbezüge, where the caller must supply it.
    VJAHR: int(input.VJAHR),
    ZKF: dec(input.ZKF),
    ZMVB: int(input.ZMVB),

    // ── Interne Felder: alle 69 beginnen bei null ──
    ALTE: ZERO, ANP: ZERO, ANTEIL1: ZERO, AVSATZAN: ZERO, BBGKVPV: ZERO, BBGRVALV: ZERO,
    BMG: ZERO, DIFF: ZERO, EFA: ZERO, FVB: ZERO, FVBSO: ZERO, FVBZ: ZERO, FVBZSO: ZERO,
    GFB: ZERO, HBALTE: ZERO, HFVB: ZERO, HFVBZ: ZERO, HFVBZSO: ZERO, HOCH: ZERO, J: 0,
    JBMG: ZERO, JLFREIB: ZERO, JLHINZU: ZERO, JW: ZERO, K: 0, KFB: ZERO, KVSATZAN: ZERO,
    KZTAB: 1, LSTJAHR: ZERO, LSTOSO: ZERO, LSTSO: ZERO, MIST: ZERO, PKPVAGZJ: ZERO,
    PVSATZAN: ZERO, RVSATZAN: ZERO, RW: ZERO, SAP: ZERO, SOLZFREI: ZERO, SOLZJ: ZERO,
    SOLZMIN: ZERO, SOLZSBMG: ZERO, SOLZSZVE: ZERO, ST: ZERO, ST1: ZERO, ST2: ZERO,
    VBEZB: ZERO, VBEZBSO: ZERO, VERGL: ZERO, VSP: ZERO, VSPALV: ZERO, VSPHB: ZERO,
    VSPKVPV: ZERO, VSPN: ZERO, VSPR: ZERO, W1STKL5: ZERO, W2STKL5: ZERO, W3STKL5: ZERO,
    X: ZERO, Y: ZERO, ZRE4: ZERO, ZRE4J: ZERO, ZRE4VP: ZERO, ZRE4VPR: ZERO, ZTABFB: ZERO,
    ZVBEZ: ZERO, ZVBEZJ: ZERO, ZVE: ZERO, ZX: ZERO, ZZX: ZERO,

    // ── Ausgaben ──
    BK: ZERO, BKS: ZERO, LSTLZZ: ZERO, SOLZLZZ: ZERO, SOLZS: ZERO, STS: ZERO,
    VFRB: ZERO, VFRBS1: ZERO, VFRBS2: ZERO, WVFRB: ZERO, WVFRBO: ZERO, WVFRBM: ZERO,
  };
}

/** Read a BigDecimal field. Throws rather than coercing, so a typo is loud. */
function B(s: S, name: string): Decimal {
  const v = s[name];
  if (!(v instanceof Decimal)) throw new TypeError(`pap-2026: ${name} is not a BigDecimal`);
  return v;
}

/** Read an int field. */
function I(s: S, name: string): number {
  const v = s[name];
  if (typeof v !== 'number') throw new TypeError(`pap-2026: ${name} is not an int`);
  return v;
}

// ─────────────────────────────────────────────────────────────────────────────
// Unterprogramme
// ─────────────────────────────────────────────────────────────────────────────

/** Parameter für 2026 — § 39b Absatz 2 Satz 5 EStG und SVRechGrV 2026. */
function MPARA(s: S): void {
  s.BBGRVALV = d(101_400);
  s.AVSATZAN = d(0.013);
  s.RVSATZAN = d(0.093);
  s.BBGKVPV = d(69_750);
  // KVZ arrives as a percentage (2,90), so it is halved and divided by 100 to
  // become a rate. The 0,07 is the employee's half of the 14 % allgemeiner
  // Beitragssatz — fictitious, like the rest of these.
  s.KVSATZAN = B(s, 'KVZ').divideExact(ZAHL2).divideExact(ZAHL100).add(d(0.07));

  s.PVSATZAN = I(s, 'PVS') === 1 ? d(0.023) : d(0.018);

  // THE TRAP. The Abschlag for a second and further children is the ELSE of
  // `PVZ == 1`, not an unconditional adjustment: someone who owes the childless
  // surcharge cannot simultaneously have children to discount, and the
  // flowchart encodes that as an either/or. Applying both is arithmetically
  // tempting and legally impossible.
  s.PVSATZAN =
    I(s, 'PVZ') === 1
      ? B(s, 'PVSATZAN').add(d(0.006))
      : B(s, 'PVSATZAN').subtract(B(s, 'PVA').multiply(d(0.0025)));

  s.W1STKL5 = d(14_071);
  s.W2STKL5 = d(34_939);
  s.W3STKL5 = d(222_260);
  s.GFB = d(12_348);
  s.SOLZFREI = d(20_350);
}

/** Jahreswerte aus den Werten des Lohnzahlungszeitraums. */
function MRE4JL(s: S): void {
  const lzz = I(s, 'LZZ');
  const scale = (v: Decimal, mul: Decimal | null, div: Decimal) =>
    (mul ? v.multiply(mul) : v).divideScaled(div, 2, DOWN);

  if (lzz === 1) {
    s.ZRE4J = scale(B(s, 'RE4'), null, ZAHL100);
    s.ZVBEZJ = scale(B(s, 'VBEZ'), null, ZAHL100);
    s.JLFREIB = scale(B(s, 'LZZFREIB'), null, ZAHL100);
    s.JLHINZU = scale(B(s, 'LZZHINZU'), null, ZAHL100);
  } else if (lzz === 2) {
    s.ZRE4J = scale(B(s, 'RE4'), ZAHL12, ZAHL100);
    s.ZVBEZJ = scale(B(s, 'VBEZ'), ZAHL12, ZAHL100);
    s.JLFREIB = scale(B(s, 'LZZFREIB'), ZAHL12, ZAHL100);
    s.JLHINZU = scale(B(s, 'LZZHINZU'), ZAHL12, ZAHL100);
  } else if (lzz === 3) {
    // A week is 7/360 of a year here, not 1/52.
    s.ZRE4J = scale(B(s, 'RE4'), ZAHL360, ZAHL700);
    s.ZVBEZJ = scale(B(s, 'VBEZ'), ZAHL360, ZAHL700);
    s.JLFREIB = scale(B(s, 'LZZFREIB'), ZAHL360, ZAHL700);
    s.JLHINZU = scale(B(s, 'LZZHINZU'), ZAHL360, ZAHL700);
  } else {
    s.ZRE4J = scale(B(s, 'RE4'), ZAHL360, ZAHL100);
    s.ZVBEZJ = scale(B(s, 'VBEZ'), ZAHL360, ZAHL100);
    s.JLFREIB = scale(B(s, 'LZZFREIB'), ZAHL360, ZAHL100);
    s.JLHINZU = scale(B(s, 'LZZHINZU'), ZAHL360, ZAHL100);
  }

  if (I(s, 'af') === 0) s.f = 1;
}

/** Freibeträge für Versorgungsbezüge — § 19 Absatz 2 EStG. */
function MRE4(s: S): void {
  if (B(s, 'ZVBEZJ').compareTo(ZERO) === 0) {
    s.FVBZ = ZERO;
    s.FVB = ZERO;
    s.FVBZSO = ZERO;
    s.FVBSO = ZERO;
  } else {
    const vjahr = I(s, 'VJAHR');
    s.J = vjahr < 2006 ? 1 : vjahr < 2058 ? vjahr - 2004 : 54;
    const J = I(s, 'J');

    if (I(s, 'LZZ') === 1) {
      s.VBEZB = B(s, 'VBEZM').multiply(d(I(s, 'ZMVB'))).add(B(s, 'VBEZS'));
      s.HFVB = TAB2[J].divideExact(ZAHL12).multiply(d(I(s, 'ZMVB'))).setScale(0, UP);
      s.FVBZ = TAB3[J].divideExact(ZAHL12).multiply(d(I(s, 'ZMVB'))).setScale(0, UP);
    } else {
      s.VBEZB = B(s, 'VBEZM').multiply(ZAHL12).add(B(s, 'VBEZS')).setScale(2, DOWN);
      s.HFVB = TAB2[J];
      s.FVBZ = TAB3[J];
    }

    s.FVB = B(s, 'VBEZB').multiply(TAB1[J]).divideExact(ZAHL100).setScale(2, UP);
    if (B(s, 'FVB').compareTo(B(s, 'HFVB')) === 1) s.FVB = B(s, 'HFVB');
    if (B(s, 'FVB').compareTo(B(s, 'ZVBEZJ')) === 1) s.FVB = B(s, 'ZVBEZJ');

    s.FVBSO = B(s, 'FVB')
      .add(B(s, 'VBEZBSO').multiply(TAB1[J]).divideExact(ZAHL100))
      .setScale(2, UP);
    if (B(s, 'FVBSO').compareTo(TAB2[J]) === 1) s.FVBSO = TAB2[J];

    s.HFVBZSO = B(s, 'VBEZB')
      .add(B(s, 'VBEZBSO'))
      .divideExact(ZAHL100)
      .subtract(B(s, 'FVBSO'))
      .setScale(2, DOWN);
    s.FVBZSO = B(s, 'FVBZ').add(B(s, 'VBEZBSO').divideExact(ZAHL100)).setScale(0, UP);
    if (B(s, 'FVBZSO').compareTo(B(s, 'HFVBZSO')) === 1) {
      s.FVBZSO = B(s, 'HFVBZSO').setScale(0, UP);
    }
    if (B(s, 'FVBZSO').compareTo(TAB3[J]) === 1) s.FVBZSO = TAB3[J];

    s.HFVBZ = B(s, 'VBEZB').divideExact(ZAHL100).subtract(B(s, 'FVB')).setScale(2, DOWN);
    if (B(s, 'FVBZ').compareTo(B(s, 'HFVBZ')) === 1) {
      s.FVBZ = B(s, 'HFVBZ').setScale(0, UP);
    }
  }
  MRE4ALTE(s);
}

/** Altersentlastungsbetrag — § 24a EStG. */
function MRE4ALTE(s: S): void {
  if (I(s, 'ALTER1') === 0) {
    s.ALTE = ZERO;
    return;
  }
  const ajahr = I(s, 'AJAHR');
  s.K = ajahr < 2006 ? 1 : ajahr < 2058 ? ajahr - 2004 : 54;
  const K = I(s, 'K');

  s.BMG = B(s, 'ZRE4J').subtract(B(s, 'ZVBEZJ'));
  s.ALTE = B(s, 'BMG').multiply(TAB4[K]).setScale(0, UP);
  s.HBALTE = TAB5[K];
  if (B(s, 'ALTE').compareTo(B(s, 'HBALTE')) === 1) s.ALTE = B(s, 'HBALTE');
}

/** Abzug der Freibeträge vom Jahresarbeitslohn. */
function MRE4ABZ(s: S): void {
  s.ZRE4 = B(s, 'ZRE4J')
    .subtract(B(s, 'FVB'))
    .subtract(B(s, 'ALTE'))
    .subtract(B(s, 'JLFREIB'))
    .add(B(s, 'JLHINZU'))
    .setScale(2, DOWN);
  if (B(s, 'ZRE4').compareTo(ZERO) === -1) s.ZRE4 = ZERO;

  // ZRE4VP is the base for the Vorsorgepauschale and is deliberately taken
  // BEFORE the Freibeträge — the notional contributions are sized on the gross,
  // not on the taxable remainder.
  s.ZRE4VP = B(s, 'ZRE4J');

  s.ZVBEZ = B(s, 'ZVBEZJ').subtract(B(s, 'FVB')).setScale(2, DOWN);
  if (B(s, 'ZVBEZ').compareTo(ZERO) === -1) s.ZVBEZ = ZERO;
}

/** Ermittlung der Jahreslohnsteuer und der Steuer des Lohnzahlungszeitraums. */
function MBERECH(s: S): void {
  MZTABFB(s);
  s.VFRB = B(s, 'ANP').add(B(s, 'FVB').add(B(s, 'FVBZ'))).multiply(ZAHL100).setScale(0, DOWN);
  MLSTJAHR(s);

  s.WVFRB = B(s, 'ZVE').subtract(B(s, 'GFB')).multiply(ZAHL100).setScale(0, DOWN);
  if (B(s, 'WVFRB').compareTo(ZERO) === -1) s.WVFRB = ZERO;

  s.LSTJAHR = B(s, 'ST').multiply(d(s.f as number)).setScale(0, DOWN);
  UPLSTLZZ(s);

  if (B(s, 'ZKF').compareTo(ZERO) === 1) {
    // The Kinderfreibetrag does not reduce the Lohnsteuer — it only reduces the
    // base for Soli and Kirchensteuer. So the whole calculation runs a SECOND
    // time with ZTABFB raised by KFB, and the result becomes JBMG while
    // LSTJAHR, already computed above, stands.
    //
    // Note the addition happens once, directly, with no second call to
    // MZTABFB — which would recompute ZTABFB from scratch and discard KFB.
    s.ZTABFB = B(s, 'ZTABFB').add(B(s, 'KFB'));
    MRE4ABZ(s);
    MLSTJAHR(s);
    s.JBMG = B(s, 'ST').multiply(d(s.f as number)).setScale(0, DOWN);
  } else {
    s.JBMG = B(s, 'LSTJAHR');
  }

  MSOLZ(s);
}

/** Freibeträge für Versorgungsbezüge, Altersentlastungsbetrag und Pauschbeträge. */
function MZTABFB(s: S): void {
  s.ANP = ZERO;

  if (B(s, 'ZVBEZ').compareTo(ZERO) >= 0 && B(s, 'ZVBEZ').compareTo(B(s, 'FVBZ')) === -1) {
    s.FVBZ = d(B(s, 'ZVBEZ').longValue().toString());
  }

  if (I(s, 'STKL') < 6) {
    if (B(s, 'ZVBEZ').compareTo(ZERO) === 1) {
      // Werbungskosten-Pauschbetrag for Versorgungsbezüge: 102 EUR, capped at
      // what is actually left.
      const rest = B(s, 'ZVBEZ').subtract(B(s, 'FVBZ'));
      s.ANP = rest.compareTo(d(102)) === -1 ? rest.setScale(0, UP) : d(102);
    }
  } else {
    s.FVBZ = ZERO;
    s.FVBZSO = ZERO;
  }

  if (I(s, 'STKL') < 6) {
    if (B(s, 'ZRE4').compareTo(B(s, 'ZVBEZ')) === 1) {
      // Arbeitnehmer-Pauschbetrag, 1 230 EUR (§ 9a Satz 1 Nummer 1 Buchstabe a
      // EStG). Note it is NOT touched by the Entfernungspauschale rising to
      // 0,38 EUR from the first kilometre in 2026 — actual Werbungskosten reach
      // this algorithm only as an ELStAM-Freibetrag through LZZFREIB/JFREIB.
      const rest = B(s, 'ZRE4').subtract(B(s, 'ZVBEZ'));
      s.ANP =
        rest.compareTo(d(1230)) === -1
          ? B(s, 'ANP').add(B(s, 'ZRE4')).subtract(B(s, 'ZVBEZ')).setScale(0, UP)
          : B(s, 'ANP').add(d(1230));
    }
  }

  s.KZTAB = 1;
  const stkl = I(s, 'STKL');
  if (stkl === 1) {
    s.SAP = d(36);
    s.KFB = B(s, 'ZKF').multiply(d(9756)).setScale(0, DOWN);
  } else if (stkl === 2) {
    s.EFA = d(4260);
    s.SAP = d(36);
    s.KFB = B(s, 'ZKF').multiply(d(9756)).setScale(0, DOWN);
  } else if (stkl === 3) {
    // Splitting: the tariff is applied to half the income and the result
    // doubled. KZTAB carries that through UPMLST and UPTAB26.
    s.KZTAB = 2;
    s.SAP = d(36);
    s.KFB = B(s, 'ZKF').multiply(d(9756)).setScale(0, DOWN);
  } else if (stkl === 4) {
    s.SAP = d(36);
    s.KFB = B(s, 'ZKF').multiply(d(4878)).setScale(0, DOWN);
  } else if (stkl === 5) {
    s.SAP = d(36);
    s.KFB = ZERO;
  } else {
    s.KFB = ZERO;
  }

  s.ZTABFB = B(s, 'EFA').add(B(s, 'ANP')).add(B(s, 'SAP')).add(B(s, 'FVBZ')).setScale(2, DOWN);
}

/** Jahreslohnsteuer. */
function MLSTJAHR(s: S): void {
  UPEVP(s);
  s.ZVE = B(s, 'ZRE4').subtract(B(s, 'ZTABFB')).subtract(B(s, 'VSP'));
  UPMLST(s);
}

/** Vorsorgepauschale — § 39b Absatz 2 Satz 5 Nummer 3 EStG. */
function UPEVP(s: S): void {
  if (I(s, 'KRV') === 1) {
    s.VSPR = ZERO;
  } else {
    s.ZRE4VPR =
      B(s, 'ZRE4VP').compareTo(B(s, 'BBGRVALV')) === 1 ? B(s, 'BBGRVALV') : B(s, 'ZRE4VP');
    s.VSPR = B(s, 'ZRE4VPR').multiply(B(s, 'RVSATZAN')).setScale(2, DOWN);
  }

  MVSPKVPV(s);

  // The Höchstbetrag comparison is skipped entirely when the employee is not
  // compulsorily insured against unemployment, and in Steuerklasse VI. ALV is
  // new for 2026 — until 2025 this condition read on KRV alone, so a
  // straight port keeps one flag and is wrong for anyone in one scheme but not
  // the other.
  if (I(s, 'ALV') !== 1 && I(s, 'STKL') !== 6) MVSPHB(s);
}

/** Teilbetrag für die Kranken- und Pflegeversicherung. */
function MVSPKVPV(s: S): void {
  s.ZRE4VPR =
    B(s, 'ZRE4VP').compareTo(B(s, 'BBGKVPV')) === 1 ? B(s, 'BBGKVPV') : B(s, 'ZRE4VP');

  if (I(s, 'PKV') > 0) {
    if (I(s, 'STKL') === 6) {
      s.VSPKVPV = ZERO;
    } else {
      // PKPV and PKPVAGZ are MONTHLY amounts whatever the Lohnzahlungszeitraum,
      // which is why they are multiplied by twelve here and not scaled by LZZ.
      s.PKPVAGZJ = B(s, 'PKPVAGZ').multiply(ZAHL12).divideExact(ZAHL100).setScale(2, DOWN);
      s.VSPKVPV = B(s, 'PKPV').multiply(ZAHL12).divideExact(ZAHL100).setScale(2, DOWN);
      s.VSPKVPV = B(s, 'VSPKVPV').subtract(B(s, 'PKPVAGZJ'));
      if (B(s, 'VSPKVPV').compareTo(ZERO) === -1) s.VSPKVPV = ZERO;
    }
  } else {
    s.VSPKVPV = B(s, 'ZRE4VPR')
      .multiply(B(s, 'KVSATZAN').add(B(s, 'PVSATZAN')))
      .setScale(2, DOWN);
  }

  s.VSP = B(s, 'VSPKVPV').add(B(s, 'VSPR')).setScale(0, UP);
}

/** Höchstbetragsberechnung der Vorsorgepauschale. */
function MVSPHB(s: S): void {
  s.ZRE4VPR =
    B(s, 'ZRE4VP').compareTo(B(s, 'BBGRVALV')) === 1 ? B(s, 'BBGRVALV') : B(s, 'ZRE4VP');
  s.VSPALV = B(s, 'AVSATZAN').multiply(B(s, 'ZRE4VPR')).setScale(2, DOWN);
  s.VSPHB = B(s, 'VSPALV').add(B(s, 'VSPKVPV')).setScale(2, DOWN);
  if (B(s, 'VSPHB').compareTo(d(1900)) === 1) s.VSPHB = d(1900);

  s.VSPN = B(s, 'VSPR').add(B(s, 'VSPHB')).setScale(0, UP);
  // The larger of the two constructions wins.
  if (B(s, 'VSPN').compareTo(B(s, 'VSP')) === 1) s.VSP = B(s, 'VSPN');
}

/** Anwendung der Tarifformel bzw. der Steuerklassen V/VI. */
function UPMLST(s: S): void {
  if (B(s, 'ZVE').compareTo(ZAHL1) === -1) {
    s.ZVE = ZERO;
    s.X = ZERO;
  } else {
    s.X = B(s, 'ZVE').divideScaled(d(I(s, 'KZTAB')), 0, DOWN);
  }

  if (I(s, 'STKL') < 5) UPTAB26(s);
  else MST5_6(s);
}

/** § 32a Absatz 1 EStG in der Fassung für 2026. */
function UPTAB26(s: S): void {
  const X = B(s, 'X');
  if (X.compareTo(B(s, 'GFB').add(ZAHL1)) === -1) {
    s.ST = ZERO;
  } else if (X.compareTo(d(17_800)) === -1) {
    s.Y = X.subtract(B(s, 'GFB')).divideScaled(ZAHL10000, 6, DOWN);
    s.RW = B(s, 'Y').multiply(d(914.51));
    s.RW = B(s, 'RW').add(d(1400));
    s.ST = B(s, 'RW').multiply(B(s, 'Y')).setScale(0, DOWN);
  } else if (X.compareTo(d(69_879)) === -1) {
    // 17799, not 17800. The subtrahend and the zone boundary differ by one euro
    // and the PDF loses this constant inside a graphic — it is legible only in
    // the XML. The coefficient 173,1 is also 2026's; 2025 used 176,64.
    s.Y = X.subtract(d(17_799)).divideScaled(ZAHL10000, 6, DOWN);
    s.RW = B(s, 'Y').multiply(d(173.1));
    s.RW = B(s, 'RW').add(d(2397));
    s.RW = B(s, 'RW').multiply(B(s, 'Y'));
    s.ST = B(s, 'RW').add(d(1034.87)).setScale(0, DOWN);
  } else if (X.compareTo(d(277_826)) === -1) {
    s.ST = X.multiply(d(0.42)).subtract(d(11_135.63)).setScale(0, DOWN);
  } else {
    s.ST = X.multiply(d(0.45)).subtract(d(19_470.38)).setScale(0, DOWN);
  }
  s.ST = B(s, 'ST').multiply(d(I(s, 'KZTAB')));
}

/** Steuerklassen V und VI — § 39b Absatz 2 Satz 7 EStG. */
function MST5_6(s: S): void {
  s.ZZX = B(s, 'X');

  if (B(s, 'ZZX').compareTo(B(s, 'W2STKL5')) === 1) {
    s.ZX = B(s, 'W2STKL5');
    UP5_6(s);
    if (B(s, 'ZZX').compareTo(B(s, 'W3STKL5')) === 1) {
      s.ST = B(s, 'ST')
        .add(B(s, 'W3STKL5').subtract(B(s, 'W2STKL5')).multiply(d(0.42)))
        .setScale(0, DOWN);
      s.ST = B(s, 'ST')
        .add(B(s, 'ZZX').subtract(B(s, 'W3STKL5')).multiply(d(0.45)))
        .setScale(0, DOWN);
    } else {
      s.ST = B(s, 'ST')
        .add(B(s, 'ZZX').subtract(B(s, 'W2STKL5')).multiply(d(0.42)))
        .setScale(0, DOWN);
    }
  } else {
    s.ZX = B(s, 'ZZX');
    UP5_6(s);
    if (B(s, 'ZZX').compareTo(B(s, 'W1STKL5')) === 1) {
      // The statutory "höchstens 42 %" ceiling. Without this comparison the
      // band construction can exceed the flat 42 % it is meant to approach, so
      // the smaller of the two is taken. There is no ELSE: below W1STKL5 the
      // result of UP5_6 stands.
      s.VERGL = B(s, 'ST');
      s.ZX = B(s, 'W1STKL5');
      UP5_6(s);
      s.HOCH = B(s, 'ST')
        .add(B(s, 'ZZX').subtract(B(s, 'W1STKL5')).multiply(d(0.42)))
        .setScale(0, DOWN);
      s.ST = B(s, 'HOCH').compareTo(B(s, 'VERGL')) === -1 ? B(s, 'HOCH') : B(s, 'VERGL');
    }
  }
}

/**
 * The Steuerklasse V/VI band: twice the tariff difference between 125 % and
 * 75 % of the income, with a floor of 14 % of it.
 */
function UP5_6(s: S): void {
  s.X = B(s, 'ZX').multiply(d(1.25)).setScale(0, DOWN);
  UPTAB26(s);
  s.ST1 = B(s, 'ST');

  s.X = B(s, 'ZX').multiply(d(0.75)).setScale(0, DOWN);
  UPTAB26(s);
  s.ST2 = B(s, 'ST');

  s.DIFF = B(s, 'ST1').subtract(B(s, 'ST2')).multiply(ZAHL2);
  s.MIST = B(s, 'ZX').multiply(d(0.14)).setScale(0, DOWN);

  s.ST = B(s, 'MIST').compareTo(B(s, 'DIFF')) === 1 ? B(s, 'MIST') : B(s, 'DIFF');
}

/** Lohnsteuer des Lohnzahlungszeitraums. */
function UPLSTLZZ(s: S): void {
  s.JW = B(s, 'LSTJAHR').multiply(ZAHL100);
  UPANTEIL(s);
  s.LSTLZZ = B(s, 'ANTEIL1');
}

/** Solidaritätszuschlag und Bemessungsgrundlage der Kirchenlohnsteuer. */
function MSOLZ(s: S): void {
  // In place, and it stays multiplied — MSOLZSTS compares against the doubled
  // value later in the same run.
  s.SOLZFREI = B(s, 'SOLZFREI').multiply(d(I(s, 'KZTAB')));

  if (B(s, 'JBMG').compareTo(B(s, 'SOLZFREI')) === 1) {
    s.SOLZJ = B(s, 'JBMG').multiply(d(5.5)).divideExact(ZAHL100).setScale(2, DOWN);
    // The Milderungszone: 11,9 % of the excess over the Freigrenze, where that
    // is less than the full 5,5 %.
    s.SOLZMIN = B(s, 'JBMG')
      .subtract(B(s, 'SOLZFREI'))
      .multiply(d(11.9))
      .divideExact(ZAHL100)
      .setScale(2, DOWN);
    if (B(s, 'SOLZMIN').compareTo(B(s, 'SOLZJ')) === -1) s.SOLZJ = B(s, 'SOLZMIN');

    s.JW = B(s, 'SOLZJ').multiply(ZAHL100).setScale(0, DOWN);
    UPANTEIL(s);
    s.SOLZLZZ = B(s, 'ANTEIL1');
  } else {
    s.SOLZLZZ = ZERO;
  }

  if (I(s, 'R') > 0) {
    s.JW = B(s, 'JBMG').multiply(ZAHL100);
    UPANTEIL(s);
    s.BK = B(s, 'ANTEIL1');
  } else {
    s.BK = ZERO;
  }
}

/** Anteil eines Jahreswerts, der auf den Lohnzahlungszeitraum entfällt. */
function UPANTEIL(s: S): void {
  const lzz = I(s, 'LZZ');
  const JW = B(s, 'JW');
  if (lzz === 1) s.ANTEIL1 = JW;
  else if (lzz === 2) s.ANTEIL1 = JW.divideScaled(ZAHL12, 0, DOWN);
  else if (lzz === 3) s.ANTEIL1 = JW.multiply(ZAHL7).divideScaled(ZAHL360, 0, DOWN);
  else s.ANTEIL1 = JW.divideScaled(ZAHL360, 0, DOWN);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sonstige Bezüge
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sonstige Bezüge — § 39b Absatz 3 EStG.
 *
 * Transcribed in full even though the calculator's own UI declares
 * Einmalzahlungen unsupported (see `../unsupported.ts`), for two reasons. The
 * PAP's MAIN calls it unconditionally, so leaving it out would not be a smaller
 * implementation of the algorithm but a different one; and a differential test
 * that never exercises this path could not detect a defect in it if the UI ever
 * exposed the input.
 *
 * Note it sets LZZ = 1 for itself. That happens AFTER MBERECH has already
 * de-annualised LSTLZZ, so it does not corrupt the period figures — but it does
 * mean the state is no longer describing the caller's Lohnzahlungszeitraum
 * afterwards.
 */
function MSONST(s: S): void {
  s.LZZ = 1;
  if (I(s, 'ZMVB') === 0) s.ZMVB = 12;

  if (B(s, 'SONSTB').compareTo(ZERO) === 0 && B(s, 'MBV').compareTo(ZERO) === 0) {
    s.LSTSO = ZERO;
    s.STS = ZERO;
    s.SOLZS = ZERO;
    s.BKS = ZERO;
    return;
  }

  MOSONST(s);

  s.ZRE4J = B(s, 'JRE4').add(B(s, 'SONSTB')).divideExact(ZAHL100).setScale(2, DOWN);
  s.ZVBEZJ = B(s, 'JVBEZ').add(B(s, 'VBS')).divideExact(ZAHL100).setScale(2, DOWN);
  s.VBEZBSO = B(s, 'STERBE');
  MRE4SONST(s);
  MLSTJAHR(s);

  s.WVFRBM = B(s, 'ZVE').subtract(B(s, 'GFB')).multiply(ZAHL100).setScale(2, DOWN);
  if (B(s, 'WVFRBM').compareTo(ZERO) === -1) s.WVFRBM = ZERO;

  s.LSTSO = B(s, 'ST').multiply(ZAHL100);

  // The difference between the annual tax with and without the sonstiger Bezug.
  // Truncated to whole euro before being scaled back to cent, so STS is always
  // a whole number of euro — and ROUND_DOWN truncates by magnitude, which is
  // what makes the sign handling correct without a separate negative branch.
  s.STS = B(s, 'LSTSO')
    .subtract(B(s, 'LSTOSO'))
    .multiply(d(s.f as number))
    .divideScaled(ZAHL100, 0, DOWN)
    .multiply(ZAHL100);

  STSMIN(s);
}

/** Jahreslohnsteuer ohne den sonstigen Bezug. */
function MOSONST(s: S): void {
  s.ZRE4J = B(s, 'JRE4').divideExact(ZAHL100).setScale(2, DOWN);
  s.ZVBEZJ = B(s, 'JVBEZ').divideExact(ZAHL100).setScale(2, DOWN);
  s.JLFREIB = B(s, 'JFREIB').divideScaled(ZAHL100, 2, DOWN);
  s.JLHINZU = B(s, 'JHINZU').divideScaled(ZAHL100, 2, DOWN);
  MRE4(s);
  MRE4ABZ(s);
  s.ZRE4VP = B(s, 'ZRE4VP').subtract(B(s, 'JRE4ENT').divideExact(ZAHL100));
  MZTABFB(s);
  s.VFRBS1 = B(s, 'ANP').add(B(s, 'FVB').add(B(s, 'FVBZ'))).multiply(ZAHL100).setScale(2, DOWN);
  MLSTJAHR(s);
  s.WVFRBO = B(s, 'ZVE').subtract(B(s, 'GFB')).multiply(ZAHL100).setScale(2, DOWN);
  if (B(s, 'WVFRBO').compareTo(ZERO) === -1) s.WVFRBO = ZERO;
  s.LSTOSO = B(s, 'ST').multiply(ZAHL100);
}

/** Freibeträge für den sonstigen Bezug. */
function MRE4SONST(s: S): void {
  MRE4(s);
  s.FVB = B(s, 'FVBSO');
  MRE4ABZ(s);
  s.ZRE4VP = B(s, 'ZRE4VP')
    .add(B(s, 'MBV').divideExact(ZAHL100))
    .subtract(B(s, 'JRE4ENT').divideExact(ZAHL100))
    .subtract(B(s, 'SONSTENT').divideExact(ZAHL100));
  s.FVBZ = B(s, 'FVBZSO');
  MZTABFB(s);
  s.VFRBS2 = B(s, 'ANP')
    .add(B(s, 'FVB'))
    .add(B(s, 'FVBZ'))
    .multiply(ZAHL100)
    .subtract(B(s, 'VFRBS1'));
}

/** Negative Steuer auf sonstige Bezüge verrechnen. */
function STSMIN(s: S): void {
  if (B(s, 'STS').compareTo(ZERO) === -1) {
    if (B(s, 'MBV').compareTo(ZERO) !== 0) {
      s.LSTLZZ = B(s, 'LSTLZZ').add(B(s, 'STS'));
      if (B(s, 'LSTLZZ').compareTo(ZERO) === -1) s.LSTLZZ = ZERO;

      s.SOLZLZZ = B(s, 'SOLZLZZ')
        .add(B(s, 'STS').multiply(d(5.5).divideExact(ZAHL100)))
        .setScale(0, DOWN);
      if (B(s, 'SOLZLZZ').compareTo(ZERO) === -1) s.SOLZLZZ = ZERO;

      s.BK = B(s, 'BK').add(B(s, 'STS'));
      if (B(s, 'BK').compareTo(ZERO) === -1) s.BK = ZERO;
    }
    s.STS = ZERO;
    s.SOLZS = ZERO;
  } else {
    MSOLZSTS(s);
  }

  s.BKS = I(s, 'R') > 0 ? B(s, 'STS') : ZERO;
}

/** Solidaritätszuschlag auf sonstige Bezüge. */
function MSOLZSTS(s: S): void {
  s.SOLZSZVE =
    B(s, 'ZKF').compareTo(ZERO) === 1 ? B(s, 'ZVE').subtract(B(s, 'KFB')) : B(s, 'ZVE');

  if (B(s, 'SOLZSZVE').compareTo(ZAHL1) === -1) {
    s.SOLZSZVE = ZERO;
    s.X = ZERO;
  } else {
    s.X = B(s, 'SOLZSZVE').divideScaled(d(I(s, 'KZTAB')), 0, DOWN);
  }

  if (I(s, 'STKL') < 5) UPTAB26(s);
  else MST5_6(s);

  s.SOLZSBMG = B(s, 'ST').multiply(d(s.f as number)).setScale(0, DOWN);
  s.SOLZS =
    B(s, 'SOLZSBMG').compareTo(B(s, 'SOLZFREI')) === 1
      ? B(s, 'STS').multiply(d(5.5)).divideScaled(ZAHL100, 0, DOWN)
      : ZERO;
}

// ─────────────────────────────────────────────────────────────────────────────
// Einstiegspunkt
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Run the 2026 Programmablaufplan.
 *
 * The order of the six calls is the flowchart's MAIN block and is load-bearing:
 * MPARA seeds the year's parameters, MRE4JL annualises, MRE4 and MRE4ABZ strip
 * the Freibeträge, MBERECH produces the period figures, and MSONST runs last
 * because it needs the period figures to already exist before it can offset a
 * negative sonstiger Bezug against them.
 */
export function runPap2026(input: Pap2026Inputs): Pap2026Result {
  const s = initialState(input);

  MPARA(s);
  MRE4JL(s);
  s.VBEZBSO = ZERO;
  MRE4(s);
  MRE4ABZ(s);
  MBERECH(s);
  MSONST(s);

  return {
    outputs: {
      BK: B(s, 'BK'),
      BKS: B(s, 'BKS'),
      LSTLZZ: B(s, 'LSTLZZ'),
      SOLZLZZ: B(s, 'SOLZLZZ'),
      SOLZS: B(s, 'SOLZS'),
      STS: B(s, 'STS'),
      VFRB: B(s, 'VFRB'),
      VFRBS1: B(s, 'VFRBS1'),
      VFRBS2: B(s, 'VFRBS2'),
      WVFRB: B(s, 'WVFRB'),
      WVFRBO: B(s, 'WVFRBO'),
      WVFRBM: B(s, 'WVFRBM'),
    },
    trace: s,
  };
}
