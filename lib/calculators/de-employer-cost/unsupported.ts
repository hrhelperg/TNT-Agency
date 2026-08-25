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
      'Bis einschließlich zur Geringfügigkeitsgrenze gelten pauschale Arbeitgeberabgaben statt der regulären Beitragssätze. Das ist ein anderes Beitragssystem, kein Sonderfall des hier abgebildeten. Auszubildende sind auch bei geringem Entgelt nicht versicherungsfrei (§ 7 Absatz 1 Satz 1 Nummer 1 SGB V und die entsprechenden Vorschriften der übrigen Zweige); in dem Fall bitte „Auszubildende“ wählen.',
    reasonEn:
      'Up to and including the Minijob threshold the employer pays flat-rate levies instead of the ordinary contribution rates. That is a different contribution system, not a special case of the one modelled here. An apprentice is NOT exempt even on low pay (§ 7 Absatz 1 Satz 1 Nummer 1 SGB V, and the parallel provisions in the other branches) — for those, choose “Apprentices in vocational training”.',
    reasonCs:
      'Do 603 € měsíčně platí jiný režim: zaměstnavatel odvádí paušální příspěvky Minijob-Zentrale místo běžného pojistného. Není to menší verze běžného výpočtu, ale jiná úprava. Učeň není osvobozen ani při nízké mzdě (§ 7 odst. 1 věta 1 č. 1 SGB V a obdobná ustanovení v ostatních složkách); v takovém případě zvolte „Učni v odborné přípravě“.',
  },
  {
    id: 'uebergangsbereich',
    kind: 'detected',
    labelDe: 'Übergangsbereich / Midijob',
    labelEn: 'Transition zone / Midijob',
    labelCs: 'Übergangsbereich (přechodové pásmo)',
    reasonDe:
      'Im Übergangsbereich wird die beitragspflichtige Einnahme über eine eigene Formel reduziert, und der Arbeitgeberanteil ist nicht die Hälfte des Beitrags. Ein Standardergebnis wäre hier für beide Seiten falsch. Für Auszubildende gilt der Übergangsbereich nicht (§ 20 Absatz 2a Satz 9 SGB IV); in dem Fall bitte „Auszubildende“ wählen.',
    reasonEn:
      'In the transition zone the contributory pay is reduced by its own formula and the employer share is not half the contribution. A standard result would be wrong for both parties here. The transition band does not apply to apprentices (§ 20 Absatz 2a Satz 9 SGB IV) — for those, choose “Apprentices in vocational training”.',
    reasonCs:
      'V přechodovém pásmu se vyměřovací základ snižuje vlastním vzorcem a podíl zaměstnavatele není polovinou pojistného. Běžný výpočet by vrátil chybné podíly na obou stranách. Na učně se přechodové pásmo nevztahuje (§ 20 odst. 2a věta 9 SGB IV); v takovém případě zvolte „Učni v odborné přípravě“.',
  },
  {
    id: 'kurzfristige-beschaeftigung',
    kind: 'declared',
    labelDe: 'Kurzfristige Beschäftigung',
    labelEn: 'Short-term employment (kurzfristige Beschäftigung)',
    labelCs: 'Krátkodobé zaměstnání',
    reasonDe:
      'Eine von vornherein auf höchstens drei Monate oder 70 Arbeitstage im Kalenderjahr befristete Beschäftigung ist nach § 8 Absatz 1 Nummer 2 SGB IV versicherungsfrei — aber NICHT, wenn sie berufsmäßig ausgeübt wird UND das Entgelt die Geringfügigkeitsgrenze übersteigt. Ob eine Befristung vorliegt und ob sie berufsmäßig ist, verrät das Monatsentgelt nicht.',
    reasonEn:
      'Employment limited from the outset to at most three months or 70 working days in the calendar year is exempt under § 8 Absatz 1 Nummer 2 SGB IV — but NOT where it is carried on occupationally AND the pay exceeds the Geringfügigkeitsgrenze. Neither the time limit nor the occupational character is visible in a monthly figure.',
    reasonCs:
      'Zaměstnání předem omezené na nejvýše tři měsíce nebo 70 pracovních dnů v kalendářním roce je podle § 8 odst. 1 č. 2 SGB IV osvobozeno — ale NE tehdy, je-li vykonáváno výdělečně jako povolání A mzda přesahuje hranici minijobu. Ani časové omezení, ani povahu výdělečnosti z měsíční mzdy poznat nelze.',
  },
  {
    id: 'ausbildung',
    kind: 'declared',
    labelDe: 'Auszubildende',
    labelEn: 'Apprentices in vocational training',
    labelCs: 'Učni v odborné přípravě',
    reasonDe:
      'Für eine Berufsausbildung gelten weder die Geringfügigkeit noch der Übergangsbereich (§ 7 Absatz 1 Satz 1 Nummer 1 SGB V und § 20 Absatz 2a Satz 9 SGB IV), und bis zur Geringverdienergrenze von 325 € trägt der Arbeitgeber nach § 20 Absatz 3 SGB IV den gesamten Gesamtsozialversicherungsbeitrag allein. Der Rechner bildet keine dieser Regeln ab.',
    reasonEn:
      'Vocational training falls outside both the Minijob and the transition regimes (§ 7 Absatz 1 Satz 1 Nummer 1 SGB V and § 20 Absatz 2a Satz 9 SGB IV), and up to the 325 EUR low-earner limit the employer bears the ENTIRE combined contribution alone under § 20 Absatz 3 SGB IV. The calculator models none of that.',
    reasonCs:
      'Na odbornou přípravu se nevztahuje ani režim minijobu, ani přechodové pásmo (§ 7 odst. 1 věta 1 č. 1 SGB V a § 20 odst. 2a věta 9 SGB IV) a do hranice nízkého výdělku 325 € nese podle § 20 odst. 3 SGB IV celé souhrnné pojistné sám zaměstnavatel. Kalkulačka žádné z těchto pravidel nemodeluje.',
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
    labelCs: 'Úředníci, soudci a vojáci',
    reasonDe: 'Keine Sozialversicherungspflicht im hier abgebildeten Sinne; eigenes Versorgungssystem.',
    reasonEn: 'Not socially insured in the sense modelled here; a separate provision system applies.',
    reasonCs:
      'Němečtí Beamte nepodléhají zákonnému sociálnímu pojištění v tom smyslu, který zde počítáme; mají vlastní zaopatřovací systém. (Netýká se to českých úředníků, kteří pojistné odvádějí běžně.)',
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
      'Členové profesních komor mohou být na žádost osvobozeni od zákonného důchodového pojištění (§ 6 odst. 1 věta 1 č. 1 SGB VI) a odvádějí do vlastní zaopatřovací instituce; zaměstnavatel k tomu platí příspěvek (§ 172a SGB VI). Jde o jinou strukturu odvodů, ne o variantu té zdejší.',
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
      'Kurzarbeitergeld a rozdělení odvodů během výpadku práce se řídí vlastními pravidly. Běžný výpočet zde neplatí.',
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
    id: 'freiwilligendienst',
    kind: 'declared',
    labelDe: 'Freiwilligendienste (FSJ, FÖJ, BFD)',
    labelEn: 'Voluntary service years (FSJ, FÖJ, BFD)',
    labelCs: 'Dobrovolnická služba (FSJ, FÖJ, BFD)',
    reasonDe:
      'Nach § 20 Absatz 3 Satz 1 Nummer 2 SGB IV trägt der Träger den gesamten Gesamtsozialversicherungsbeitrag allein — ohne Entgeltgrenze und unabhängig vom Taschengeld. Die hier abgebildete hälftige Tragung gilt dafür nicht, und eine reguläre Rechnung würde die Arbeitgeberkosten deutlich zu niedrig ausweisen.',
    reasonEn:
      'Under § 20 Absatz 3 Satz 1 Nummer 2 SGB IV the organisation bears the ENTIRE social-insurance contribution alone — no earnings limit, whatever the allowance. The half-and-half split modelled here does not apply, and an ordinary calculation would understate the employer cost substantially.',
    reasonCs:
      'Podle § 20 odst. 3 věty 1 č. 2 SGB IV nese celé sociální pojištění výhradně organizace — bez hranice příjmu a bez ohledu na výši kapesného. Zdejší rozdělení na poloviny se zde neuplatní a běžný výpočet by náklady organizace výrazně podhodnotil.',
  },
  {
    id: 'sachbezug',
    kind: 'declared',
    labelDe: 'Sachbezüge und Dienstwagenversteuerung',
    labelEn: 'Benefits in kind and company-car taxation',
    labelCs: 'Nepeněžní plnění a služební vozidla',
    reasonDe:
      'Geldwerte Vorteile erhöhen das steuer- und beitragspflichtige Entgelt nach eigenen Bewertungsregeln — Sachbezugswerte, die 1-%-Regelung, die 50-€-Freigrenze. Dieser Rechner hat dafür kein Eingabefeld und rechnet ausschließlich aus dem eingegebenen Bruttoentgelt; ein geldwerter Vorteil müsste vorher bewertet und dem Brutto zugeschlagen werden.',
    reasonEn:
      'Benefits in kind raise taxable and contributory pay under their own valuation rules — official benefit values, the 1 % company-car rule, the 50 EUR threshold. This calculator has no field for them and works solely from the gross you enter; a benefit would have to be valued and added to that gross first.',
    reasonCs:
      'Nepeněžní výhody zvyšují zdanitelnou i pojistnou mzdu podle vlastních oceňovacích pravidel — úředně stanovené hodnoty, pravidlo 1 % u služebního vozu, hranice 50 €. Tato kalkulačka pro ně nemá vstupní pole a počítá výhradně ze zadané hrubé mzdy; nepeněžní plnění by bylo nutné nejdřív ocenit a k hrubé mzdě přičíst.',
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
