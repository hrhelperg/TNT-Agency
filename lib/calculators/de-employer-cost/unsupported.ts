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
  readonly labelCs: string;
  /**
   * Why it is not modelled. Always a fact about the sourcing or the mechanics —
   * never a vague apology, and never "not implemented yet", which tells a reader
   * nothing about whether the answer they need exists.
   */
  readonly reasonDe: string;
  readonly reasonEn: string;
  readonly reasonCs: string;
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
    labelCs: 'Minijob (geringfügige Beschäftigung)',
    reasonDe:
      'Unterhalb der Geringfügigkeitsgrenze gelten pauschale Arbeitgeberabgaben statt der regulären Beitragssätze. Das ist ein anderes Beitragssystem, kein Sonderfall des hier abgebildeten.',
    reasonEn:
      'Below the Minijob threshold the employer pays flat-rate levies instead of the ordinary contribution rates. That is a different contribution system, not a special case of the one modelled here.',
    reasonCs:
      'Do 603 € měsíčně platí jiný režim: zaměstnavatel odvádí paušální příspěvky Minijob-Zentrale místo běžného pojistného. Není to menší verze běžného výpočtu, ale jiná úprava.',
  },
  {
    id: 'uebergangsbereich',
    kind: 'detected',
    labelDe: 'Übergangsbereich / Midijob',
    labelEn: 'Transition zone / Midijob',
    labelCs: 'Übergangsbereich (přechodové pásmo)',
    reasonDe:
      'Im Übergangsbereich wird die beitragspflichtige Einnahme über eine eigene Formel reduziert, und der Arbeitgeberanteil ist nicht die Hälfte des Beitrags. Ein Standardergebnis wäre hier für beide Seiten falsch.',
    reasonEn:
      'In the transition zone the contributory pay is reduced by its own formula and the employer share is not half the contribution. A standard result would be wrong for both parties here.',
    reasonCs:
      'V přechodovém pásmu se vyměřovací základ snižuje vlastním vzorcem a podíl zaměstnavatele není polovinou pojistného. Běžný výpočet by vrátil chybné podíly na obou stranách.',
  },
  {
    id: 'pkv',
    kind: 'declared',
    labelDe: 'Private Krankenversicherung',
    labelEn: 'Private health insurance',
    labelCs: 'Soukromé zdravotní pojištění',
    reasonDe:
      'Der Arbeitgeberzuschuss hängt von der tatsächlichen Prämie und einer gesetzlichen Höchstgrenze ab. Ohne die konkrete Prämie ist kein exaktes Ergebnis möglich.',
    reasonEn:
      'The employer subsidy depends on the actual premium and a statutory cap. Without the specific premium no exact result is possible.',
    reasonCs:
      'Pojistné určuje smlouva s pojišťovnou, nikoli zákonná sazba. Příspěvek zaměstnavatele se řídí § 257 SGB V a je omezen; z hrubé mzdy jej odvodit nelze.',
  },
  {
    id: 'beamte',
    kind: 'declared',
    labelDe: 'Beamte, Richter, Soldaten',
    labelEn: 'Civil servants, judges, soldiers',
    labelCs: 'Úředníci a soudci',
    reasonDe: 'Keine Sozialversicherungspflicht im hier abgebildeten Sinne; eigenes Versorgungssystem.',
    reasonEn: 'Not socially insured in the sense modelled here; a separate provision system applies.',
    reasonCs:
      'Úředníci nepodléhají zákonnému sociálnímu pojištění. Zaopatření a zdravotní podpora se řídí zcela jinými pravidly než tento výpočet.',
  },
  {
    id: 'mehrfachbeschaeftigung',
    kind: 'declared',
    labelDe: 'Mehrfachbeschäftigung',
    labelEn: 'Employment with several employers',
    labelCs: 'Souběh více zaměstnání',
    reasonDe:
      'Die Beitragsbemessungsgrenzen wirken über alle Beschäftigungen zusammen. Ein einzelner Arbeitgeber kennt die anderen Entgelte nicht, und dieser Rechner sieht nur eines.',
    reasonEn:
      'The contribution ceilings operate across all employments together. A single employer cannot see the other pay, and this calculator sees only one.',
    reasonCs:
      'Stropy pro odvody působí přes všechna zaměstnání dohromady. Jednotlivý zaměstnavatel ostatní mzdy nezná a tato kalkulačka vidí jen jednu.',
  },
  {
    id: 'rentner-beschaeftigt',
    kind: 'declared',
    labelDe: 'Beschäftigte Altersrentner',
    labelEn: 'Employed old-age pensioners',
    labelCs: 'Pracující důchodci',
    reasonDe:
      'Ab der Regelaltersgrenze entfällt der Arbeitnehmeranteil zur Arbeitslosenversicherung (§ 28 Absatz 1 Nummer 1 SGB III), während der Arbeitgeber seinen Anteil weiter trägt (§ 346 Absatz 3 SGB III); bei Bezug einer Altersvollrente entfällt zusätzlich der Arbeitnehmeranteil zur Rentenversicherung. Das gilt unabhängig davon, ob tatsächlich eine Rente bezogen wird, und ist aus der Entgelthöhe nicht erkennbar.',
    reasonEn:
      'From state pension age the employee’s unemployment-insurance share falls away (§ 28 Absatz 1 Nummer 1 SGB III) while the employer keeps paying its own (§ 346 Absatz 3 SGB III); drawing a full old-age pension additionally removes the employee’s pension share. This holds whether or not a pension is actually drawn, and nothing in the pay reveals it.',
    reasonCs:
      'Od dosažení důchodového věku odpadá zaměstnancův podíl na pojištění v nezaměstnanosti (§ 28 odst. 1 č. 1 SGB III), zatímco zaměstnavatel svůj podíl platí dál (§ 346 odst. 3 SGB III); při pobírání plného starobního důchodu odpadá navíc zaměstnancův podíl na důchodovém pojištění. Platí to bez ohledu na to, zda je důchod skutečně pobírán, a z výše mzdy to poznat nelze.',
  },
  {
    id: 'knappschaft',
    kind: 'declared',
    labelDe: 'Knappschaftliche Rentenversicherung',
    labelEn: 'Miners’ pension insurance',
    labelCs: 'Hornické pojištění',
    reasonDe: 'Eigene Beitragssätze und eine eigene Bemessungsgrenze.',
    reasonEn: 'Its own contribution rates and its own assessment ceiling.',
    reasonCs:
      'Hornické pojištění má vlastní sazby a vlastní strop 10 400 € měsíčně. Jde o samostatný systém, nikoli o variantu obecného.',
  },
  {
    id: 'versorgungswerk',
    kind: 'declared',
    labelDe: 'Versorgungswerk statt gesetzlicher Rentenversicherung',
    labelEn: 'Professional pension scheme instead of statutory pension insurance',
    labelCs: 'Profesní zaopatřovací instituce',
    reasonDe:
      'Befreiung von der Rentenversicherungspflicht mit Arbeitgeberzuschuss zum Versorgungswerk — eine andere Beitragsstruktur.',
    reasonEn:
      'Exemption from statutory pension insurance with an employer subsidy to the scheme — a different contribution structure.',
    reasonCs:
      'Členové profesních komor jsou osvobozeni od zákonného důchodového pojištění a odvádějí do vlastní instituce. Sazby stanoví každá komora sama.',
  },
  {
    id: 'kurzarbeit',
    kind: 'declared',
    labelDe: 'Kurzarbeit',
    labelEn: 'Short-time work',
    labelCs: 'Kurzarbeit (zkrácená práce)',
    reasonDe:
      'Kurzarbeitergeld und die Beitragstragung während des Arbeitsausfalls folgen eigenen Regeln.',
    reasonEn:
      'Short-time allowance and who bears contributions during the lost hours follow their own rules.',
    reasonCs:
      'Při kurzarbeitu se odvody počítají z fiktivního vyměřovacího základu a část hradí Spolková agentura práce. Běžný výpočet zde neplatí.',
  },
  {
    id: 'einmalzahlung',
    kind: 'declared',
    labelDe: 'Einmalzahlungen (Sonstige Bezüge)',
    labelEn: 'One-off payments',
    labelCs: 'Jednorázové platby',
    reasonDe:
      'Einmalzahlungen werden steuerlich und beitragsrechtlich anders behandelt als laufender Arbeitslohn, mit eigener Jahresbetrachtung und Märzklausel. Sie als Monatsgehalt zu behandeln wäre falsch.',
    reasonEn:
      'One-off payments are treated differently from ongoing pay for both tax and contributions, with their own annual view and the March rule. Treating one as monthly salary would be wrong.',
    reasonCs:
      'Jednorázové platby se daňově i pojistně posuzují jinak než běžná mzda, s vlastním ročním pohledem a březnovou klauzulí. Počítat je jako měsíční mzdu by bylo chybné.',
  },
  {
    id: 'grenzueberschreitend',
    kind: 'declared',
    labelDe: 'Grenzüberschreitende Beschäftigung',
    labelEn: 'Cross-border employment',
    labelCs: 'Přeshraniční zaměstnání',
    reasonDe:
      'Welches Sozialversicherungsrecht gilt, entscheidet sich nach europäischem Koordinierungsrecht und nicht nach dem Arbeitsort allein.',
    reasonEn:
      'Which social-security law applies is decided by European coordination rules, not by the place of work alone.',
    reasonCs:
      'O tom, které sociální právo se použije, rozhoduje evropská koordinační úprava, nikoli samotné místo výkonu práce.',
  },
  {
    id: 'werkstudent',
    kind: 'declared',
    labelDe: 'Werkstudentinnen und Werkstudenten',
    labelEn: 'Working students (Werkstudenten)',
    labelCs: 'Studenti při studiu (Werkstudenten)',
    reasonDe:
      'Das Werkstudentenprivileg befreit eingeschriebene Studierende, die neben dem Studium höchstens 20 Wochenstunden arbeiten, von der Kranken-, Pflege- und Arbeitslosenversicherung; nur die Rentenversicherung bleibt. Der Rechner würde drei Zweige berechnen, die gar nicht geschuldet sind.',
    reasonEn:
      'The Werkstudent exemption relieves enrolled students working at most 20 hours a week of health, long-term care and unemployment contributions; only pension remains. The calculator would charge three branches that are not owed at all.',
    reasonCs:
      'Werkstudentské privilegium osvobozuje zapsané studenty pracující nejvýše 20 hodin týdně od zdravotního, pečovatelského pojištění i pojištění v nezaměstnanosti; zůstává jen důchodové. Kalkulačka by naúčtovala tři složky, které se vůbec neodvádějí.',
  },
  {
    id: 'praktikum',
    kind: 'declared',
    labelDe: 'Praktika',
    labelEn: 'Internships',
    labelCs: 'Praxe a stáže',
    reasonDe:
      'Die Beitragspflicht hängt davon ab, ob das Praktikum vorgeschrieben oder freiwillig ist, ob es vor, während oder nach dem Studium liegt und ob ein Entgelt gezahlt wird. Aus dem Entgelt allein lässt sich das nicht ableiten.',
    reasonEn:
      'Whether contributions are owed depends on whether the internship is compulsory or voluntary, whether it falls before, during or after study, and whether it is paid. None of that can be derived from the pay alone.',
    reasonCs:
      'Zda se pojistné odvádí, závisí na tom, je-li praxe povinná či dobrovolná, zda předchází studiu, probíhá při něm nebo po něm, a zda je placená. Ze samotné mzdy to odvodit nelze.',
  },
  {
    id: 'baugewerbe',
    kind: 'declared',
    labelDe: 'Baugewerbe und andere Branchen mit eigenen Umlagen',
    labelEn: 'Construction and other sectors with their own levies',
    labelCs: 'Stavebnictví a další obory s vlastními odvody',
    reasonDe:
      'Im Baugewerbe kommen die Winterbeschäftigungs-Umlage nach § 354 SGB III und die Beiträge zu den Sozialkassen hinzu. Beide sind tarifvertraglich geregelt und branchenabhängig, nicht gesetzlich einheitlich — die Arbeitgeberkosten lägen also höher als hier berechnet.',
    reasonEn:
      'Construction adds the Winterbeschäftigungs-Umlage under § 354 SGB III and contributions to the sector’s social funds. Both are set by collective agreement and vary by trade rather than being uniform statute, so employer cost would be higher than calculated here.',
    reasonCs:
      'Ve stavebnictví přistupuje zimní odvod podle § 354 SGB III a příspěvky do oborových sociálních kas. Náklady zaměstnavatele by proto byly vyšší, než kolik zde vychází.',
  },
  {
    id: 'sachbezug',
    kind: 'declared',
    labelDe: 'Sachbezüge und Dienstwagenversteuerung',
    labelEn: 'Benefits in kind and company-car taxation',
    labelCs: 'Nepeněžní plnění a služební vozidla',
    reasonDe:
      'Geldwerte Vorteile erhöhen das steuer- und beitragspflichtige Entgelt nach eigenen Bewertungsregeln. Dieser Rechner behandelt Arbeitgeberkosten für Sachleistungen als reine Kosten und verändert damit das Bruttoentgelt nicht.',
    reasonEn:
      'Benefits in kind raise taxable and contributory pay under their own valuation rules. This calculator treats employer spending on benefits as cost only, and therefore does not change gross pay.',
    reasonCs:
      'Nepeněžní výhody zvyšují zdanitelnou i pojistnou mzdu podle vlastních oceňovacích pravidel. Tato kalkulačka je pokládá pouze za náklad a hrubou mzdu jimi nemění.',
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
