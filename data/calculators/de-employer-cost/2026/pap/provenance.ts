/**
 * Provenance for the vendored BMF Programmablaufplan 2026.
 *
 * WHY THE XML IS VENDORED AND NOT FETCHED
 * ───────────────────────────────────────
 * §4 of the build brief: the 2026 implementation is frozen in-repo and never
 * fetched at runtime. A calculator whose tax law arrives over the network is a
 * calculator whose answer changes without a commit, cannot be reproduced for a
 * past payroll period, and fails when the far end does.
 *
 * WHY THE XML AND NOT THE PDF
 * ───────────────────────────
 * This is the decision the whole tax engine rests on, and it was made on
 * evidence rather than convenience.
 *
 * BMF publishes the PAP as Anlage 1, a 40-page PDF of DIN 66001 flowcharts, and
 * ITZBund publishes the same algorithm as this XML pseudocode. The PDF is the
 * legally announced form. But it LOSES INFORMATION that the XML preserves, and
 * loses it silently:
 *
 *   • The zone-3 subtrahend 17799 in UPTAB26 lives inside a graphic. Text
 *     extraction yields "Y = (X – [ ] / 10000" — the constant is simply gone,
 *     and nothing marks its absence.
 *   • The two rounding symbols defined in §2.3 are glyphs. Extraction leaves the
 *     bare words "Euro" and "Cent" floating beside boxes, so the DIRECTION of
 *     every rounding step — down or up — is unrecoverable from the extracted
 *     text. There are 56 such steps.
 *
 * Any pipeline that parses the PDF programmatically therefore produces a wrong
 * engine without failing. The XML is unambiguous at exactly the points the PDF
 * is not, so the XML is the implementation source and the PDF is the
 * cross-check — not the other way round.
 *
 * IS THIS XML THE FINAL PAP?
 * ──────────────────────────
 * It carries an internal comment "Stand: 2025-10-23 12:40", which is EARLIER
 * than the final BMF-Schreiben of 12 November 2025 and could suggest it reflects
 * the 25 September draft. It does not. Verified by diffing every constant
 * against the final Anlage 1 — GFB 12348, BBGRVALV 101400, BBGKVPV 69750,
 * SOLZFREI 20350, W1/W2/W3STKL5 14071/34939/222260, and all five tariff zones —
 * and by confirming the XML reproduces both official Prüftabellen cell for cell.
 * The comment is ITZBund's generation timestamp for the variable block, not the
 * legal Stand.
 *
 * EXACTLY ONE 2026 VERSION
 * ────────────────────────
 * Checked four ways, because a mid-year amended PAP would silently make every
 * result wrong for part of the year:
 *
 *   1. BMF's own calculator lists a single "2026" entry, where 2024 — which DID
 *      have a mid-year change — is still listed split as "2024 (Dezember)" and
 *      "2024 (bis November)".
 *   2. The XML declares version="1.0" versionNummer="1.0".
 *   3. The interface endpoint 2026Version1.xhtml is live; 2026Version2.xhtml
 *      does not exist.
 *   4. Every page of Anlage 1 is headed "Stand: 12.11.2025 (endgültig)".
 *
 * So a payment made at any point in 2026 is governed by this one document, and
 * there is no version-selection logic to write.
 *
 * A NEAR-MISS WORTH RECORDING. The Steueränderungsgesetz 2025 raised the
 * Entfernungspauschale to 0,38 EUR from the first kilometre with effect from
 * 1 January 2026, and no amended PAP followed. That is correct, not an
 * oversight: actual Werbungskosten never enter the algorithm — they reach it
 * only as an ELStAM Freibetrag through LZZFREIB/JFREIB. Do not "update"
 * ANP = 1230 or add commuting logic to the tax engine.
 */

export const PAP_2026_PROVENANCE = {
  /** The legally announced document. */
  bmfSchreiben: {
    title:
      'Programmablaufplan für die maschinelle Berechnung der vom Arbeitslohn einzubehaltenden Lohnsteuer und Programmablaufplan für die Erstellung von Lohnsteuertabellen jeweils für 2026 sowie Programmablaufplan für die Begrenzung der von Versorgungsbezügen einzubehaltenden Lohnsteuer und des Solidaritätszuschlags nach den Abkommen zur Vermeidung der Doppelbesteuerung ab 2026',
    date: '2025-11-12',
    geschaeftszeichen: 'IV C 5 - S 2361/00025/016/028',
    dok: 'COO.7005.100.2.13473826',
    legalBasis: '§ 39b Absatz 6 und § 51 Absatz 4 Nummer 1a EStG',
    publishedIn: 'Bundessteuerblatt Teil I',
    url: 'https://www.bundesfinanzministerium.de/Content/DE/Downloads/Steuern/Steuerarten/Lohnsteuer/Programmablaufplan/2025-11-12-PAP-2026.html',
  },

  /** Anlage 1 — the flowchart this engine implements. */
  anlage1: {
    title:
      'Programmablaufplan für die maschinelle Berechnung der vom Arbeitslohn einzubehaltenden Lohnsteuer, des Solidaritätszuschlags und der Maßstabsteuer für die Kirchenlohnsteuer für 2026',
    stand: '12.11.2025 (endgültig)',
    pages: 40,
    url: 'https://www.bundesfinanzministerium.de/Content/DE/Downloads/Steuern/Steuerarten/Lohnsteuer/Programmablaufplan/2025-11-12-PAP-2026-anlage-1.pdf',
  },

  /** The vendored machine-readable form — the implementation source. */
  xml: {
    file: 'data/calculators/de-employer-cost/2026/pap/Lohnsteuer2026.xml',
    publisher: 'ITZBund (Informationstechnikzentrum Bund) for BMF',
    retrievedFrom:
      'https://www.bmf-steuerrechner.de/javax.faces.resource/daten/xmls/Lohnsteuer2026.xml.xhtml',
    retrievedOn: '2026-08-24',
    papName: 'Lohnsteuer2026',
    version: '1.0',
    versionNummer: '1.0',
    bytes: 65_585,
    sha256: '63d8981646d139eba2f4dd990c13b43c4fb3883b402a5a40cddf253aa7aa96b4',
  },

  /**
   * Applicability, quoted from Anlage 1 §1.
   *
   * A single window covering the whole of 2026, which is why no version
   * selection exists.
   */
  scope:
    'Lohnzahlungszeiträume, die nach dem 31. Dezember 2025, aber vor dem 1. Januar 2027 enden; sonstige Bezüge, die nach dem 31. Dezember 2025, aber vor dem 1. Januar 2027 zufließen.',

  /**
   * The 23 subroutines, in the XML's spelling.
   *
   * Recorded because the build brief's §1 sketch names a subroutine that does
   * not exist — "MLSTPV" — and scaffolding modules from that list would create a
   * file with nothing to put in it while omitting MST5_6, which is where
   * Steuerklasse V and VI are actually computed. Pflegeversicherung is handled
   * inside MPARA and MVSPKVPV, not in a routine of its own.
   *
   * Note also the PDF/XML naming differences that break a literal
   * transcription: the PDF writes MST5-6 and UP5-6 with hyphens (illegal
   * identifiers, so the XML uses underscores), the PDF writes the inputs AF and
   * F in uppercase while the XML declares them lowercase, and the PDF names the
   * entry point LST2026 where the XML uses an unnamed MAIN block.
   */
  methods: [
    'MPARA', 'MRE4JL', 'MRE4', 'MRE4ALTE', 'MRE4ABZ', 'MBERECH', 'MZTABFB',
    'MLSTJAHR', 'UPLSTLZZ', 'UPMLST', 'UPEVP', 'MVSPKVPV', 'MVSPHB', 'MST5_6',
    'UP5_6', 'MSOLZ', 'UPANTEIL', 'MSONST', 'STSMIN', 'MSOLZSTS', 'MOSONST',
    'MRE4SONST', 'UPTAB26',
  ],

  /**
   * What the PAP does NOT do. Both halves of this have burned implementers.
   *
   * It does not compute Kirchensteuer — it returns only the BASE (BK, BKS), and
   * the engine must apply the Land rate and any Kappung itself.
   *
   * It does not compute social-security contributions. RVSATZAN, AVSATZAN,
   * KVSATZAN and PVSATZAN inside the PAP are FICTITIOUS rates whose only job is
   * to size the Vorsorgepauschale — a notional deduction in the tax base. They
   * are not the contributions withheld from pay. Reusing them for the actual SV
   * deduction is a classic and invisible error: the numbers look plausible
   * because they are near the real rates, and they are not the real rates.
   */
  doesNotCompute: ['Kirchensteuer (returns BK/BKS only)', 'social-security contributions'],
} as const;
