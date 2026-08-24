/**
 * The cases this calculator refuses to answer — §30.
 *
 * WHY A REGISTRY RATHER THAN SCATTERED CHECKS
 * ───────────────────────────────────────────
 * An unsupported case is a product decision, not an implementation detail. Each
 * entry here says: we looked at this, we could not model it to the standard the
 * rest of the engine holds, and rather than return a number that is nearly right
 * we return no number at all.
 *
 * Keeping them in one list has three effects a scattered `if` cannot. The set is
 * countable, so "what does this thing refuse?" has an answer. Each refusal
 * carries its reason, so a later reader can tell a gap in the sources from a gap
 * in the work. And the UI can enumerate them on the page, which is the
 * difference between a calculator that quietly omits a case and one that tells
 * you it is omitting it.
 *
 * DETECTED VERSUS DECLARED
 * ────────────────────────
 * Two kinds of refusal, and the distinction matters.
 *
 *   DETECTED — the engine can see it in the numbers. A gross inside the Minijob
 *   or Übergangsbereich range is detectable from the gross alone, so the engine
 *   must detect it and stop. Returning a standard-employment result for a
 *   Midijob salary is the single most likely way this calculator could be
 *   confidently wrong, because the input looks perfectly ordinary.
 *
 *   DECLARED — the engine cannot see it and must be told. Nothing about a salary
 *   reveals that its earner is a Beamter, privately insured, or working for two
 *   employers. These appear as inputs the user sets, and selecting one stops the
 *   calculation.
 *
 * A case that is neither detected nor declared is not refused at all — it is
 * silently mis-answered. Every entry below therefore states which it is.
 */

export type RefusalKind = 'detected' | 'declared';

export interface UnsupportedCase {
  readonly id: string;
  readonly kind: RefusalKind;
  /** What the case is, in one line, for the methodology page. */
  readonly labelDe: string;
  readonly labelEn: string;
  /**
   * Why it is not modelled. Always a fact about the sourcing or the mechanics —
   * never a vague apology, and never "not implemented yet", which tells a reader
   * nothing about whether the answer they need exists.
   */
  readonly reasonDe: string;
  readonly reasonEn: string;
}

/**
 * The refusal message. Deliberately the same sentence for every case: the user
 * needs to know the calculator will not answer, and which case triggered it —
 * not a bespoke apology per case.
 */
export const REQUIRES_INDIVIDUAL_PAYROLL = {
  de: 'Dieser Fall erfordert eine individuelle Lohnabrechnung.',
  en: 'This case requires an individual payroll calculation.',
  cs: 'Tento případ vyžaduje individuální mzdový výpočet.',
} as const;

export const UNSUPPORTED_CASES: readonly UnsupportedCase[] = [
  {
    id: 'minijob',
    kind: 'detected',
    labelDe: 'Minijob / geringfügige Beschäftigung',
    labelEn: 'Minijob / marginal employment',
    reasonDe:
      'Unterhalb der Geringfügigkeitsgrenze gelten pauschale Arbeitgeberabgaben statt der regulären Beitragssätze. Das ist ein anderes Beitragssystem, kein Sonderfall des hier abgebildeten.',
    reasonEn:
      'Below the Minijob threshold the employer pays flat-rate levies instead of the ordinary contribution rates. That is a different contribution system, not a special case of the one modelled here.',
  },
  {
    id: 'uebergangsbereich',
    kind: 'detected',
    labelDe: 'Übergangsbereich / Midijob',
    labelEn: 'Transition zone / Midijob',
    reasonDe:
      'Im Übergangsbereich wird die beitragspflichtige Einnahme über eine eigene Formel reduziert, und der Arbeitgeberanteil ist nicht die Hälfte des Beitrags. Ein Standardergebnis wäre hier für beide Seiten falsch.',
    reasonEn:
      'In the transition zone the contributory pay is reduced by its own formula and the employer share is not half the contribution. A standard result would be wrong for both parties here.',
  },
  {
    id: 'pkv',
    kind: 'declared',
    labelDe: 'Private Krankenversicherung',
    labelEn: 'Private health insurance',
    reasonDe:
      'Der Arbeitgeberzuschuss hängt von der tatsächlichen Prämie und einer gesetzlichen Höchstgrenze ab. Ohne die konkrete Prämie ist kein exaktes Ergebnis möglich.',
    reasonEn:
      'The employer subsidy depends on the actual premium and a statutory cap. Without the specific premium no exact result is possible.',
  },
  {
    id: 'beamte',
    kind: 'declared',
    labelDe: 'Beamte, Richter, Soldaten',
    labelEn: 'Civil servants, judges, soldiers',
    reasonDe: 'Keine Sozialversicherungspflicht im hier abgebildeten Sinne; eigenes Versorgungssystem.',
    reasonEn: 'Not socially insured in the sense modelled here; a separate provision system applies.',
  },
  {
    id: 'mehrfachbeschaeftigung',
    kind: 'declared',
    labelDe: 'Mehrfachbeschäftigung',
    labelEn: 'Employment with several employers',
    reasonDe:
      'Die Beitragsbemessungsgrenzen wirken über alle Beschäftigungen zusammen. Ein einzelner Arbeitgeber kennt die anderen Entgelte nicht, und dieser Rechner sieht nur eines.',
    reasonEn:
      'The contribution ceilings operate across all employments together. A single employer cannot see the other pay, and this calculator sees only one.',
  },
  {
    id: 'rentner-beschaeftigt',
    kind: 'declared',
    labelDe: 'Beschäftigte Altersrentner',
    labelEn: 'Employed old-age pensioners',
    reasonDe:
      'Für Bezieher einer Altersrente gelten abweichende Beitragspflichten, insbesondere in der Renten- und Arbeitslosenversicherung.',
    reasonEn:
      'Different contribution liabilities apply to recipients of an old-age pension, particularly in pension and unemployment insurance.',
  },
  {
    id: 'knappschaft',
    kind: 'declared',
    labelDe: 'Knappschaftliche Rentenversicherung',
    labelEn: 'Miners’ pension insurance',
    reasonDe: 'Eigene Beitragssätze und eine eigene Bemessungsgrenze.',
    reasonEn: 'Its own contribution rates and its own assessment ceiling.',
  },
  {
    id: 'versorgungswerk',
    kind: 'declared',
    labelDe: 'Versorgungswerk statt gesetzlicher Rentenversicherung',
    labelEn: 'Professional pension scheme instead of statutory pension insurance',
    reasonDe:
      'Befreiung von der Rentenversicherungspflicht mit Arbeitgeberzuschuss zum Versorgungswerk — eine andere Beitragsstruktur.',
    reasonEn:
      'Exemption from statutory pension insurance with an employer subsidy to the scheme — a different contribution structure.',
  },
  {
    id: 'kurzarbeit',
    kind: 'declared',
    labelDe: 'Kurzarbeit',
    labelEn: 'Short-time work',
    reasonDe:
      'Kurzarbeitergeld und die Beitragstragung während des Arbeitsausfalls folgen eigenen Regeln.',
    reasonEn:
      'Short-time allowance and who bears contributions during the lost hours follow their own rules.',
  },
  {
    id: 'einmalzahlung',
    kind: 'declared',
    labelDe: 'Einmalzahlungen (Sonstige Bezüge)',
    labelEn: 'One-off payments',
    reasonDe:
      'Einmalzahlungen werden steuerlich und beitragsrechtlich anders behandelt als laufender Arbeitslohn, mit eigener Jahresbetrachtung und Märzklausel. Sie als Monatsgehalt zu behandeln wäre falsch.',
    reasonEn:
      'One-off payments are treated differently from ongoing pay for both tax and contributions, with their own annual view and the March rule. Treating one as monthly salary would be wrong.',
  },
  {
    id: 'grenzueberschreitend',
    kind: 'declared',
    labelDe: 'Grenzüberschreitende Beschäftigung',
    labelEn: 'Cross-border employment',
    reasonDe:
      'Welches Sozialversicherungsrecht gilt, entscheidet sich nach europäischem Koordinierungsrecht und nicht nach dem Arbeitsort allein.',
    reasonEn:
      'Which social-security law applies is decided by European coordination rules, not by the place of work alone.',
  },
  {
    id: 'werkstudent',
    kind: 'declared',
    labelDe: 'Werkstudentinnen und Werkstudenten',
    labelEn: 'Working students (Werkstudenten)',
    reasonDe:
      'Das Werkstudentenprivileg befreit eingeschriebene Studierende, die neben dem Studium höchstens 20 Wochenstunden arbeiten, von der Kranken-, Pflege- und Arbeitslosenversicherung; nur die Rentenversicherung bleibt. Der Rechner würde drei Zweige berechnen, die gar nicht geschuldet sind.',
    reasonEn:
      'The Werkstudent exemption relieves enrolled students working at most 20 hours a week of health, long-term care and unemployment contributions; only pension remains. The calculator would charge three branches that are not owed at all.',
  },
  {
    id: 'praktikum',
    kind: 'declared',
    labelDe: 'Praktika',
    labelEn: 'Internships',
    reasonDe:
      'Die Beitragspflicht hängt davon ab, ob das Praktikum vorgeschrieben oder freiwillig ist, ob es vor, während oder nach dem Studium liegt und ob ein Entgelt gezahlt wird. Aus dem Entgelt allein lässt sich das nicht ableiten.',
    reasonEn:
      'Whether contributions are owed depends on whether the internship is compulsory or voluntary, whether it falls before, during or after study, and whether it is paid. None of that can be derived from the pay alone.',
  },
  {
    id: 'baugewerbe',
    kind: 'declared',
    labelDe: 'Baugewerbe und andere Branchen mit eigenen Umlagen',
    labelEn: 'Construction and other sectors with their own levies',
    reasonDe:
      'Im Baugewerbe kommen die Winterbeschäftigungs-Umlage nach § 354 SGB III und die Beiträge zu den Sozialkassen hinzu. Beide sind tarifvertraglich geregelt und branchenabhängig, nicht gesetzlich einheitlich — die Arbeitgeberkosten lägen also höher als hier berechnet.',
    reasonEn:
      'Construction adds the Winterbeschäftigungs-Umlage under § 354 SGB III and contributions to the sector’s social funds. Both are set by collective agreement and vary by trade rather than being uniform statute, so employer cost would be higher than calculated here.',
  },
  {
    id: 'sachbezug',
    kind: 'declared',
    labelDe: 'Sachbezüge und Dienstwagenversteuerung',
    labelEn: 'Benefits in kind and company-car taxation',
    reasonDe:
      'Geldwerte Vorteile erhöhen das steuer- und beitragspflichtige Entgelt nach eigenen Bewertungsregeln. Dieser Rechner behandelt Arbeitgeberkosten für Sachleistungen als reine Kosten und verändert damit das Bruttoentgelt nicht.',
    reasonEn:
      'Benefits in kind raise taxable and contributory pay under their own valuation rules. This calculator treats employer spending on benefits as cost only, and therefore does not change gross pay.',
  },
];

const BY_ID: ReadonlyMap<string, UnsupportedCase> = new Map(
  UNSUPPORTED_CASES.map((c) => [c.id, c]),
);

/** Look one up. Throws on an unknown id rather than rendering a blank refusal. */
export function unsupportedCase(id: string): UnsupportedCase {
  const found = BY_ID.get(id);
  if (!found) throw new Error(`de-employer-cost: unknown unsupported case "${id}"`);
  return found;
}

/** The cases the engine must detect from the numbers alone. */
export const DETECTED_CASES: readonly UnsupportedCase[] = UNSUPPORTED_CASES.filter(
  (c) => c.kind === 'detected',
);

/** The cases the user must declare, because no figure reveals them. */
export const DECLARED_CASES: readonly UnsupportedCase[] = UNSUPPORTED_CASES.filter(
  (c) => c.kind === 'declared',
);
