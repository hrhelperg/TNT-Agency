/**
 * Official sources behind every constant in the German employer-cost calculator
 * for 2026.
 *
 * WHAT COUNTS AS A SOURCE HERE
 * ────────────────────────────
 * The statute or ordinance itself, the ministry that announces a figure it is
 * empowered to announce, or the Spitzenverband that administers the branch.
 * Payroll blogs, Krankenkasse marketing pages and software vendors' summaries
 * are not sources; several were consulted to find leads and none is cited.
 *
 * TWO TRAPS THIS FILE EXISTS TO DOCUMENT
 * ──────────────────────────────────────
 * FIRST — the statutes do not carry the rates. § 55 Absatz 1 SGB XI still reads
 * "bundeseinheitlich 3,4 Prozent", and has since 2024; the rate actually in
 * force is 3,6 % and comes from an ordinance made under Absatz 1a. § 158 SGB VI
 * describes a mechanism and states no percentage at all. Reading the statute and
 * stopping there produces a calculator that is wrong by 0,2 points in the
 * Pflegeversicherung and has no pension rate whatsoever.
 *
 * SECOND — a mid-2026 amendment that does NOT apply to 2026. The
 * GKV-Beitragssatzstabilisierungsgesetz of 24 July 2026 (BGBl. 2026 I Nr. 228)
 * came into force on 30 July 2026 and rewrote § 223 Absatz 4 SGB V, which now
 * reads "Die Beitragsbemessungsgrenze im Jahr 2027 entspricht der um 3.600 Euro
 * erhöhten Jahresarbeitsentgeltgrenze …". Every operative word of it is about
 * 2027. Anyone reading the consolidated statute today — which is what a
 * "current law" lookup returns — sees a changed Beitragsbemessungsgrenze rule
 * and can apply it to a 2026 payslip. The 2026 ceilings are the
 * SVRechGrV 2026 figures and nothing else.
 */

export type SourceAuthority =
  | 'Bundesministerium der Finanzen'
  | 'Bundesministerium für Gesundheit'
  | 'Bundesministerium für Arbeit und Soziales'
  | 'Bundesregierung'
  | 'GKV-Spitzenverband'
  | 'Bundesgesetzblatt'
  | 'gesetze-im-internet.de';

export interface CalculatorSource {
  readonly id: string;
  readonly authority: SourceAuthority;
  readonly title: string;
  readonly url: string;
  /** The provision this source evidences. */
  readonly legalBasis: string;
  /** ISO date the page was read. */
  readonly accessed: string;
  /** What it establishes, and any caveat about its standing. */
  readonly note: string;
}

/**
 * The date every source below was opened.
 *
 * The only verification date in the build. Moving it forward asserts that
 * someone read these pages again on the new date — nothing downstream may claim
 * a check this file does not support.
 */
export const ACCESSED = '2026-08-24';

export const DE_SOURCE_IDS = {
  pap: 'pap-2026',
  svRechgr: 'svrechgrv-2026',
  gkvRechengroessen: 'gkv-sv-rechengroessen-2026',
  kvBeitragssatz: 'sgb-v-241-243',
  kvZusatzbeitrag: 'bmg-zusatzbeitrag-2026',
  kvTragung: 'sgb-v-249',
  pvBeitragssatz: 'pbav-2025',
  pvStatut: 'sgb-xi-55',
  pvTragung: 'sgb-xi-58',
  rvBeitragssatz: 'sgb-vi-158',
  avBeitragssatz: 'sgb-iii-341',
  insolvenzgeld: 'sgb-iii-358-360',
  aag: 'aag-u1-u2',
  bvv: 'bvv',
  minijob: 'sgb-iv-8-20',
  unfall: 'sgb-vii-150-153',
  gkvStabG: 'gkv-beitragssatzstabilisierungsgesetz',
  kirchensteuer: 'kirchensteuer-hebesatz',
} as const;

export const DE_SOURCES: readonly CalculatorSource[] = [
  {
    id: DE_SOURCE_IDS.pap,
    authority: 'Bundesministerium der Finanzen',
    title:
      'Programmablaufplan für die maschinelle Berechnung der vom Arbeitslohn einzubehaltenden Lohnsteuer … für 2026',
    url: 'https://www.bundesfinanzministerium.de/Content/DE/Downloads/Steuern/Steuerarten/Lohnsteuer/Programmablaufplan/2025-11-12-PAP-2026.html',
    legalBasis: '§ 39b Absatz 6 und § 51 Absatz 4 Nummer 1a EStG',
    accessed: ACCESSED,
    note:
      'BMF-Schreiben vom 12.11.2025, GZ IV C 5 - S 2361/00025/016/028. The tax engine implements Anlage 1 to this Schreiben. Full provenance, including why the machine-readable XML rather than the PDF is the implementation source, is in ./pap/provenance.ts.',
  },
  {
    id: DE_SOURCE_IDS.svRechgr,
    authority: 'Bundesregierung',
    title: 'Sozialversicherungsrechengrößen-Verordnung 2026 (SVBezGrV 2026)',
    url: 'https://www.gesetze-im-internet.de/svbezgrv_2026/',
    legalBasis: 'Verordnung vom 24.11.2025, BGBl. 2025 I Nr. 278',
    accessed: ACCESSED,
    note:
      'Sets every 2026 ceiling: Bezugsgröße 47 460 EUR (§ 1), Jahresarbeitsentgeltgrenze 77 400 EUR and 69 750 EUR (§ 2), Beitragsbemessungsgrenzen 101 400 EUR and 124 800 EUR (§ 4). NOTE WHAT IS ABSENT: no separate Ost value for any of them. Until 2025 § 1 carried a Bezugsgröße (Ost) and § 4 an eastern Beitragsbemessungsgrenze; for 2026 the ordinance states one figure each. A Rechtskreis West/Ost flag must not touch any 2026 ceiling.',
  },
  {
    id: DE_SOURCE_IDS.gkvRechengroessen,
    authority: 'GKV-Spitzenverband',
    title: 'Rechengrößen und Grenzwerte im Versicherungs- und Beitragsrecht für das Jahr 2026',
    url: 'https://www.gkv-spitzenverband.de/media/dokumente/presse/zahlen_und_grafiken/20260101_Faktenblatt_Rechengroessen_Beitragsrecht.pdf',
    legalBasis: 'Faktenblatt vom 26.11.2025',
    accessed: ACCESSED,
    note:
      'The one document that states every 2026 rate and ceiling together, from the body that administers them: KV 14,6 % / 14,0 %, durchschnittlicher Zusatzbeitrag 2,9 %, PV 3,6 % with 0,6 Zuschlag and 0,25 Abschlag, RV 18,6 %, AV 2,6 %, Insolvenzgeldumlage 0,15 %, Geringfügigkeitsgrenze 603 EUR, Übergangsbereich bis 2 000 EUR, Faktor F 0,6619. Used as cross-confirmation for figures whose primary instrument is cited separately, never as the sole authority for any of them.',
  },
  {
    id: DE_SOURCE_IDS.kvBeitragssatz,
    authority: 'gesetze-im-internet.de',
    title: '§ 241 SGB V (allgemeiner Beitragssatz), § 243 SGB V (ermäßigter Beitragssatz)',
    url: 'https://www.gesetze-im-internet.de/sgb_5/__241.html',
    legalBasis: '§§ 241, 243 SGB V',
    accessed: ACCESSED,
    note:
      'Allgemeiner Beitragssatz 14,6 %; ermäßigter 14,0 % for members with no Krankengeld entitlement. Both stated in the statute itself, unlike the pension and care rates.',
  },
  {
    id: DE_SOURCE_IDS.kvZusatzbeitrag,
    authority: 'Bundesministerium für Gesundheit',
    title:
      'Bekanntmachung des durchschnittlichen Zusatzbeitragssatzes nach § 242a Absatz 2 SGB V für das Jahr 2026',
    url: 'https://www.bundesanzeiger.de/',
    legalBasis: '§ 242a SGB V; Bekanntmachung vom 07.11.2025, BAnz vom 10.11.2025',
    accessed: ACCESSED,
    note:
      'Durchschnittlicher Zusatzbeitragssatz 2,9 % from 1 January 2026, up 0,4 points on 2025. IT IS NOT THE RATE ANY GIVEN EMPLOYEE PAYS: § 242 SGB V makes the Zusatzbeitrag kassenindividuell, and this average governs only the cases the statute names. The calculator therefore takes the rate as an input and uses 2,9 % only as the stated default.',
  },
  {
    id: DE_SOURCE_IDS.kvTragung,
    authority: 'gesetze-im-internet.de',
    title: '§ 249 SGB V — Tragung der Beiträge bei versicherungspflichtig Beschäftigten',
    url: 'https://www.gesetze-im-internet.de/sgb_5/__249.html',
    legalBasis: '§ 249 SGB V',
    accessed: ACCESSED,
    note:
      'Employer and employee each bear half of the allgemeiner Beitragssatz AND half of the kassenindividueller Zusatzbeitrag. The Zusatzbeitrag has been split since 1 January 2019; before that the employee bore it alone, and that older arrangement is still widely repeated.',
  },
  {
    id: DE_SOURCE_IDS.pvStatut,
    authority: 'gesetze-im-internet.de',
    title: '§ 55 SGB XI — Beitragssatz, Beitragsbemessungsgrenze, Verordnungsermächtigung',
    url: 'https://www.gesetze-im-internet.de/sgb_11/__55.html',
    legalBasis: '§ 55 Absatz 1, 1a und 3 SGB XI',
    accessed: ACCESSED,
    note:
      'Absatz 1 still reads 3,4 % — the figure in force comes from the ordinance under Absatz 1a, cited separately. Absatz 3 is the source for the surcharge and the discounts: +0,6 points after the month in which the member turns 23, unless a parent; −0,25 points for each of the second to fifth child until the month in which that child turns 25.',
  },
  {
    id: DE_SOURCE_IDS.pvBeitragssatz,
    authority: 'Bundesregierung',
    title: 'Pflege-Beitragssatz-Anpassungsverordnung 2025 (PBAV 2025)',
    url: 'https://www.gesetze-im-internet.de/pbav_2025/',
    legalBasis: 'Verordnung vom 20.12.2024, BGBl. 2024 I Nr. 446',
    accessed: ACCESSED,
    note:
      'Raises the Beitragssatz to 3,6 % with effect from 1 January 2025, under § 55 Absatz 1a SGB XI. It carries no expiry, and no superseding ordinance exists for 2026 — confirmed against the GKV-Spitzenverband Rechengrößen for 2026, which states 3,6 %.',
  },
  {
    id: DE_SOURCE_IDS.pvTragung,
    authority: 'gesetze-im-internet.de',
    title: '§ 58 SGB XI — Tragung der Beiträge bei versicherungspflichtig Beschäftigten',
    url: 'https://www.gesetze-im-internet.de/sgb_11/__58.html',
    legalBasis: '§ 58 Absatz 1 und 3 SGB XI',
    accessed: ACCESSED,
    note:
      'Absatz 1: halves, except the childless surcharge, which the employee bears alone. Absatz 3: in a Land that never abolished a working-day public holiday in exchange for the employer share — Sachsen — the employee bears one further percentage point alone. So Saxony is 2,3 % employee against 1,3 % employer at a 3,6 % rate, not a different total.',
  },
  {
    id: DE_SOURCE_IDS.rvBeitragssatz,
    authority: 'gesetze-im-internet.de',
    title: '§ 158 SGB VI — Beitragssätze',
    url: 'https://www.gesetze-im-internet.de/sgb_6/__158.html',
    legalBasis: '§ 158 SGB VI',
    accessed: ACCESSED,
    note:
      'States the mechanism by which the rate changes and no percentage. The rate in force for 2026 is 18,6 % — unchanged since 2018 — per the GKV-Spitzenverband Rechengrößen 2026. § 168 SGB VI splits it in half between employer and employee.',
  },
  {
    id: DE_SOURCE_IDS.avBeitragssatz,
    authority: 'gesetze-im-internet.de',
    title: '§ 341 SGB III — Beitragssatz und Beitragsbemessung',
    url: 'https://www.gesetze-im-internet.de/sgb_3/__341.html',
    legalBasis: '§ 341 Absatz 2 und 4 SGB III',
    accessed: ACCESSED,
    note:
      'Beitragssatz 2,6 %, in the statute itself and unchanged since the Qualifizierungschancengesetz of 2019. Absatz 4 ties the ceiling to the allgemeine Rentenversicherung, so the unemployment ceiling is 101 400 EUR and has no entry of its own in the SVRechGrV.',
  },
  {
    id: DE_SOURCE_IDS.insolvenzgeld,
    authority: 'gesetze-im-internet.de',
    title: '§§ 358, 360 SGB III — Insolvenzgeldumlage und Umlagesatz',
    url: 'https://www.gesetze-im-internet.de/sgb_3/__360.html',
    legalBasis: '§§ 358–360 SGB III',
    accessed: ACCESSED,
    note:
      'Umlagesatz 0,15 %, employer alone, on the pay that bears pension contributions. § 360 has been overridden for single years before (InsoGeldFestV 2022, 2023, 2024); its Fußnote lists none for 2026, so the statutory rate stands. § 358 Absatz 1 exempts the Bund, Länder, Gemeinden and private households.',
  },
  {
    id: DE_SOURCE_IDS.bvv,
    authority: 'gesetze-im-internet.de',
    title: 'Beitragsverfahrensverordnung (BVV)',
    url: 'https://www.gesetze-im-internet.de/beitrvv/',
    legalBasis: '§ 1 Absatz 1 und 2, § 2 Absatz 1 BVV',
    accessed: ACCESSED,
    note:
      'The arithmetic, not the rates. § 1 Absatz 1: the base is pay up to the MONTHLY ceiling, a full calendar month counting 30 Sozialversicherungstage. § 1 Absatz 2: intermediate results are not rounded at all; the total goes to two decimals and the second is raised by one when the third is 5 to 9. § 2 Absatz 1: an equally split contribution is computed by applying HALF the rate and doubling the ROUNDED result — not by computing the whole and halving it, which differs by a cent; an unequally split one is the sum of separately rounded shares.',
  },
  {
    id: DE_SOURCE_IDS.aag,
    authority: 'gesetze-im-internet.de',
    title: 'Aufwendungsausgleichsgesetz (AAG) — Umlagen U1 und U2',
    url: 'https://www.gesetze-im-internet.de/aufag/',
    legalBasis: '§§ 1, 7 AAG',
    accessed: ACCESSED,
    note:
      'U1 (Entgeltfortzahlung im Krankheitsfall) applies only to employers with at most 30 employees; U2 (Mutterschaft) applies whatever the headcount, subject to § 11 AAG, whose Absatz 2 disapplies § 1 entirely to four listed groups of employers. Both are borne by the employer alone. THE RATES ARE NOT STATUTORY — each Krankenkasse sets its own in its Satzung, and they differ by several percentage points between Kassen and between the reimbursement levels a Kasse offers. There is therefore no correct default, and the calculator takes them as inputs.',
  },
  {
    id: DE_SOURCE_IDS.unfall,
    authority: 'gesetze-im-internet.de',
    title: '§§ 150, 153, 157 SGB VII — Beitragspflicht und Berechnung der Unfallversicherung',
    url: 'https://www.gesetze-im-internet.de/sgb_7/__150.html',
    legalBasis: '§§ 150, 153, 157 SGB VII',
    accessed: ACCESSED,
    note:
      'Borne by the employer alone and levied in arrears by the Berufsgenossenschaft from its own Gefahrtarif, so the rate depends on the trade and the class within it and no single figure exists. It is also NOT a percentage of monthly pay in the way the other branches are: § 153 bases it on the annual Arbeitsentgelt and the Gefahrklasse, settled after the year ends. The calculator takes an employer-supplied figure and says what it is.',
  },
  {
    id: DE_SOURCE_IDS.minijob,
    authority: 'gesetze-im-internet.de',
    title: '§ 8 SGB IV (geringfügige Beschäftigung), § 20 Absatz 2 SGB IV (Übergangsbereich)',
    url: 'https://www.gesetze-im-internet.de/sgb_4/__8.html',
    legalBasis: '§ 8 und § 20 Absatz 2 SGB IV',
    accessed: ACCESSED,
    note:
      'The two thresholds the calculator uses to refuse rather than to compute: the Geringfügigkeitsgrenze, 603 EUR a month for 2026, and the upper edge of the Übergangsbereich, 2 000 EUR. Both regimes replace the ordinary contribution arithmetic entirely, so producing an ordinary result below either threshold would not be approximately right, it would be a different regime.',
  },
  {
    id: DE_SOURCE_IDS.gkvStabG,
    authority: 'Bundesgesetzblatt',
    title: 'GKV-Beitragssatzstabilisierungsgesetz',
    url: 'https://www.gesetze-im-internet.de/sgb_5/__223.html',
    legalBasis: 'Gesetz vom 24.07.2026, BGBl. 2026 I Nr. 228, in Kraft seit 30.07.2026',
    accessed: ACCESSED,
    note:
      'Cited for what it does NOT do. It amended § 223 SGB V during 2026, and the consolidated text a reader sees today says "Die Beitragsbemessungsgrenze im Jahr 2027 …". Every operative provision — the extra 300 EUR a month on the ceiling and 3 600 EUR on the Versicherungspflichtgrenze, the higher pauschaler Beitragssatz for Minijobs — bites from 2027. Nothing in it changes a 2026 payslip, and the 2026 ceilings remain the SVRechGrV 2026 figures.',
  },
  {
    id: DE_SOURCE_IDS.kirchensteuer,
    authority: 'gesetze-im-internet.de',
    title: 'Kirchensteuergesetze der Länder und § 51a EStG',
    url: 'https://www.gesetze-im-internet.de/estg/__51a.html',
    legalBasis: '§ 51a EStG; Kirchensteuergesetze der Länder',
    accessed: ACCESSED,
    note:
      'Hebesatz 8 % in Baden-Württemberg and Bayern, 9 % in the other fourteen Länder. Withheld by BETRIEBSSTÄTTE, not by the employee’s residence, so an employee living in Bavaria and working in Hesse has 9 % withheld. The Kappung der Progression is a feature of the assessment rather than the deduction, its base is the zu versteuerndes Einkommen the employer never sees, and its percentage comes from each community’s own Kirchensteuerbeschluss — so it is declared unmodelled rather than approximated.',
  },
];

const seen = new Set<string>();
for (const s of DE_SOURCES) {
  if (seen.has(s.id)) throw new Error(`de-employer-cost: duplicate source id "${s.id}"`);
  seen.add(s.id);
}

export function deSource(id: string): CalculatorSource {
  const found = DE_SOURCES.find((s) => s.id === id);
  if (!found) throw new Error(`de-employer-cost: unknown source id "${id}"`);
  return found;
}
