/**
 * Every string the calculator renders, in the three languages it publishes in.
 *
 * WHY THE COPY IS DATA AND NOT JSX
 * ────────────────────────────────
 * Because then it is countable. `copy.test.ts` walks this object and asserts
 * that every entry has all three languages and that none of them is a copy of
 * another — which is the only reliable way to catch the failure mode of
 * multilingual work, where a translation is quietly the English text again and
 * nobody notices until a reader does.
 *
 * A NOTE ON THE THREE AUDIENCES
 * ─────────────────────────────
 * German is the primary language: the reader is a German employer or an employee
 * looking at a German payslip, and the terms of art — Beitragsbemessungsgrenze,
 * Steuerklasse, Zusatzbeitrag — are what they see on their own documents, so
 * they are used unhedged.
 *
 * English and Czech readers are mostly NOT in that position. They are typically
 * an employer considering hiring in Germany, or a Czech worker weighing an offer
 * there. For them the German term is the thing they will actually encounter, so
 * the translations name the concept and keep the German word alongside rather
 * than inventing an equivalent that appears on no document.
 */

import type { DeLocale, Localised } from './types';

export type Copy = Localised;

export const t = (copy: Copy, locale: DeLocale): string => copy[locale];

export const JURISDICTION_STAMP: Copy = {
  de: 'Deutsches Lohn- und Sozialversicherungsrecht · 2026',
  en: 'German payroll and social-insurance law · 2026',
  cs: 'Německé mzdové a pojistné právo · 2026',
};

export const PAGE_TITLE: Copy = {
  de: 'Arbeitgeberkosten-Rechner Deutschland 2026',
  en: 'Germany employer cost calculator 2026',
  cs: 'Kalkulačka nákladů zaměstnavatele — Německo 2026',
};

export const PAGE_KICKER: Copy = {
  de: 'Was ein Beschäftigter im Monat wirklich kostet — und was netto ankommt. Nach dem Programmablaufplan des BMF für 2026 und den Beitragssätzen der Sozialversicherung.',
  en: 'What an employee actually costs per month, and what reaches their account. Built on the German Ministry of Finance’s 2026 payroll-tax algorithm and the statutory contribution rates.',
  cs: 'Kolik zaměstnanec skutečně stojí za měsíc a kolik mu zůstane čistého. Podle oficiálního výpočetního postupu německého ministerstva financí pro rok 2026 a zákonných sazeb pojistného.',
};

export const SECTION: Record<string, Copy> = {
  employment: {
    de: 'Beschäftigung',
    en: 'Employment',
    cs: 'Zaměstnání',
  },
  tax: {
    de: 'Lohnsteuer',
    en: 'Wage tax',
    cs: 'Daň ze mzdy',
  },
  insurance: {
    de: 'Sozialversicherung',
    en: 'Social insurance',
    cs: 'Sociální pojištění',
  },
  employerCosts: {
    de: 'Umlagen und Unfallversicherung',
    en: 'Employer levies and accident insurance',
    cs: 'Odvody zaměstnavatele a úrazové pojištění',
  },
  advanced: {
    de: 'Weitere Angaben',
    en: 'More detail',
    cs: 'Další údaje',
  },
  advancedHint: {
    de: 'Die Voreinstellungen beschreiben den häufigsten Fall: gesetzlich versicherte Vollbeschäftigung ohne Besonderheiten.',
    en: 'The defaults describe the commonest case — ordinary employment with statutory cover in every branch.',
    cs: 'Výchozí nastavení popisuje nejběžnější případ: běžné zaměstnání se zákonným pojištěním ve všech složkách.',
  },
};

export const FIELD: Record<string, Copy> = {
  gross: {
    de: 'Monatliches Bruttoentgelt',
    en: 'Monthly gross pay',
    cs: 'Měsíční hrubá mzda',
  },
  grossHint: {
    de: 'Das laufende Arbeitsentgelt für einen Monat. Einmalzahlungen werden nicht berechnet.',
    en: 'Regular pay for one month. One-off payments are not calculated.',
    cs: 'Běžná mzda za jeden měsíc. Jednorázové platby se nepočítají.',
  },
  steuerklasse: {
    de: 'Steuerklasse',
    en: 'Tax class (Steuerklasse)',
    cs: 'Daňová třída (Steuerklasse)',
  },
  steuerklasseHint: {
    de: 'Steht in den ELStAM. Klasse I gilt für Ledige, IV für Verheiratete ohne Faktor, VI für ein zweites Dienstverhältnis.',
    en: 'From the employee’s ELStAM record. Class I is for single people, IV for married couples without a factor, VI for a second job.',
    cs: 'Uvedena v ELStAM. Třída I pro svobodné, IV pro manžele bez faktoru, VI pro druhý pracovní poměr.',
  },
  kinderfreibetraege: {
    de: 'Kinderfreibeträge',
    en: 'Child allowances (Kinderfreibeträge)',
    cs: 'Daňové úlevy na děti (Kinderfreibeträge)',
  },
  kinderfreibetraegeHint: {
    de: 'Senkt nur die Bemessungsgrundlage für Solidaritätszuschlag und Kirchensteuer, nicht die Lohnsteuer selbst.',
    en: 'Lowers the base for the solidarity surcharge and church tax only — it does not reduce the wage tax itself.',
    cs: 'Snižuje pouze základ pro solidární příplatek a církevní daň, nikoli samotnou daň ze mzdy.',
  },
  workplace: {
    de: 'Bundesland der Betriebsstätte',
    en: 'Federal state of the workplace',
    cs: 'Spolková země pracoviště',
  },
  workplaceHint: {
    de: 'Maßgeblich ist der Ort der Betriebsstätte, nicht der Wohnort. Er bestimmt den Kirchensteuersatz und in Sachsen die Aufteilung der Pflegeversicherung.',
    en: 'The workplace decides, not where the employee lives. It sets the church-tax rate and, in Saxony, how the care-insurance contribution is split.',
    cs: 'Rozhoduje místo pracoviště, nikoli bydliště. Určuje sazbu církevní daně a v Sasku rozdělení pojištění dlouhodobé péče.',
  },
  churchTax: {
    de: 'Kirchensteuerpflichtig',
    en: 'Liable to church tax',
    cs: 'Podléhá církevní dani',
  },
  supplement: {
    de: 'Zusatzbeitragssatz der Krankenkasse',
    en: 'Health fund’s supplementary rate (Zusatzbeitrag)',
    cs: 'Doplňková sazba zdravotní pojišťovny (Zusatzbeitrag)',
  },
  supplementHint: {
    de: 'Jede Krankenkasse legt ihn selbst fest. Der Durchschnitt für 2026 beträgt 2,9 %; der Satz Ihrer Kasse kann darüber oder darunter liegen.',
    en: 'Each health fund sets its own. The announced average for 2026 is 2.9 %; a particular fund may charge more or less.',
    cs: 'Každá pojišťovna si ji stanoví sama. Průměr pro rok 2026 je 2,9 %; sazba konkrétní pojišťovny může být vyšší i nižší.',
  },
  reducedRate: {
    de: 'Ermäßigter Beitragssatz (kein Krankengeldanspruch)',
    en: 'Reduced health rate (no sick-pay entitlement)',
    cs: 'Snížená sazba (bez nároku na nemocenské)',
  },
  children: {
    de: 'Kinder unter 25 Jahren',
    en: 'Children under 25',
    cs: 'Děti do 25 let',
  },
  childrenHint: {
    de: 'Ab dem zweiten bis zum fünften Kind sinkt der Arbeitnehmeranteil zur Pflegeversicherung um je 0,25 Punkte. Der Arbeitgeberanteil bleibt unverändert.',
    en: 'From the second to the fifth child the employee’s care-insurance share falls by 0.25 points each. The employer’s share does not change.',
    cs: 'Od druhého do pátého dítěte klesá zaměstnancův podíl na pojištění péče o 0,25 bodu za dítě. Podíl zaměstnavatele se nemění.',
  },
  isParent: {
    de: 'Elterneigenschaft nachgewiesen',
    en: 'Parenthood proved to the employer',
    cs: 'Doloženo rodičovství',
  },
  isParentHint: {
    de: 'Gilt lebenslang, auch wenn die Kinder längst erwachsen sind. Ohne Nachweis fällt ab 23 der Zuschlag für Kinderlose an.',
    en: 'Once a parent, always a parent — it holds even when the children are long grown. Without proof, the childless surcharge applies from age 23.',
    cs: 'Platí trvale, i když jsou děti dávno dospělé. Bez doložení se od 23 let uplatní příplatek pro bezdětné.',
  },
  atLeast23: {
    // § 55 Absatz 3 Satz 1 SGB XI: the surcharge starts AFTER the month in which
    // the 23rd birthday falls, not on the birthday. "At least 23" charges it a
    // month early for everyone born in the current month, and the label is the
    // only place this flag is defined for the user.
    de: 'Der Monat, in dem die beschäftigte Person 23 wird, ist bereits abgelaufen',
    en: 'The month in which the employee turned 23 has already ended',
    cs: 'Měsíc, v němž zaměstnanec dovršil 23 let, již uplynul',
  },
  u1: {
    de: 'Umlage U1 (Entgeltfortzahlung)',
    en: 'Levy U1 (sick-pay reimbursement)',
    cs: 'Odvod U1 (náhrada mzdy v nemoci)',
  },
  u1Hint: {
    de: 'Nur für Betriebe mit höchstens 30 Beschäftigten. Der Satz steht in der Satzung Ihrer Krankenkasse.',
    en: 'Only for employers with at most 30 staff. The rate is set in your health fund’s own rules.',
    cs: 'Jen pro zaměstnavatele s nejvýše 30 zaměstnanci. Sazbu stanoví stanovy vaší pojišťovny.',
  },
  u2: {
    de: 'Umlage U2 (Mutterschaft)',
    en: 'Levy U2 (maternity)',
    cs: 'Odvod U2 (mateřství)',
  },
  u2Hint: {
    de: 'Gilt für jeden Arbeitgeber. Der Satz steht ebenfalls in der Satzung der Krankenkasse.',
    en: 'Applies to every employer. The rate likewise comes from the health fund’s own rules.',
    cs: 'Platí pro každého zaměstnavatele. Sazbu rovněž stanoví pojišťovna.',
  },
  insolvency: {
    de: 'Insolvenzgeldumlage (U3) fällt an',
    en: 'Insolvency benefit levy (U3) applies',
    cs: 'Platí se odvod na insolvenční dávku (U3)',
  },
  insolvencyHint: {
    de: 'Bund, Länder, Gemeinden und private Haushalte sind ausgenommen.',
    en: 'Federal and state bodies, municipalities and private households are exempt.',
    cs: 'Spolek, země, obce a domácnosti jsou osvobozeny.',
  },
  accident: {
    de: 'Unfallversicherung, monatlich',
    en: 'Accident insurance, monthly',
    cs: 'Úrazové pojištění, měsíčně',
  },
  accidentHint: {
    de: 'Die Berufsgenossenschaft rechnet jährlich nach Gefahrtarif ab. Tragen Sie den monatlichen Rückstellungsbetrag ein — einen allgemeinen Satz gibt es nicht.',
    en: 'The trade association bills annually from its own risk tariff. Enter the monthly accrual — there is no general rate to assume.',
    cs: 'Profesní sdružení účtuje ročně podle rizikového tarifu. Zadejte měsíční rezervu — obecná sazba neexistuje.',
  },
};

export const RESULT: Record<string, Copy> = {
  employerTotal: {
    de: 'Arbeitgeberkosten gesamt',
    en: 'Total employer cost',
    cs: 'Celkové náklady zaměstnavatele',
  },
  employerTotalAnnual: {
    de: 'Hochgerechnet auf zwölf gleiche Monate',
    en: 'Projected over twelve identical months',
    cs: 'Přepočet na dvanáct stejných měsíců',
  },
  net: {
    de: 'Nettoentgelt',
    en: 'Net pay',
    cs: 'Čistá mzda',
  },
  gross: {
    de: 'Bruttoentgelt',
    en: 'Gross pay',
    cs: 'Hrubá mzda',
  },
  loadFactor: {
    de: 'Faktor auf das Brutto',
    en: 'Multiple of gross',
    cs: 'Násobek hrubé mzdy',
  },
  employerShare: {
    de: 'Arbeitgeber',
    en: 'Employer',
    cs: 'Zaměstnavatel',
  },
  employeeShare: {
    de: 'Arbeitnehmer',
    en: 'Employee',
    cs: 'Zaměstnanec',
  },
  base: {
    de: 'Bemessungsgrundlage',
    en: 'Assessment base',
    cs: 'Vyměřovací základ',
  },
  cappedAt: {
    de: 'auf die Beitragsbemessungsgrenze begrenzt',
    en: 'capped at the contribution ceiling',
    cs: 'omezeno stropem pro odvody',
  },
  lohnsteuer: {
    de: 'Lohnsteuer',
    en: 'Wage tax (Lohnsteuer)',
    cs: 'Daň ze mzdy (Lohnsteuer)',
  },
  soli: {
    de: 'Solidaritätszuschlag',
    en: 'Solidarity surcharge',
    cs: 'Solidární příplatek',
  },
  kirchensteuer: {
    de: 'Kirchensteuer',
    en: 'Church tax',
    cs: 'Církevní daň',
  },
  deductions: {
    de: 'Abzüge gesamt',
    en: 'Total deductions',
    cs: 'Srážky celkem',
  },
  employeeSocial: {
    de: 'Sozialversicherung, Arbeitnehmeranteil',
    en: 'Social insurance, employee share',
    cs: 'Sociální pojištění, podíl zaměstnance',
  },
  empty: {
    de: 'Tragen Sie ein monatliches Bruttoentgelt ein, um die Berechnung zu sehen.',
    en: 'Enter a monthly gross to see the calculation.',
    cs: 'Zadejte měsíční hrubou mzdu a zobrazí se výpočet.',
  },
  ledgerNote: {
    de: 'Die Arbeitgeberkosten enthalten Lohnsteuer, Solidaritätszuschlag, Kirchensteuer und den Arbeitnehmeranteil zur Sozialversicherung NICHT: diese Beträge werden vom Bruttoentgelt einbehalten, das der Arbeitgeber ohnehin zahlt.',
    en: 'Employer cost excludes wage tax, the solidarity surcharge, church tax and the employee’s own contributions — all of those are withheld FROM the gross the employer is already paying.',
    cs: 'Náklady zaměstnavatele nezahrnují daň ze mzdy, solidární příplatek, církevní daň ani zaměstnancův podíl na pojištění — ty se srážejí z hrubé mzdy, kterou zaměstnavatel platí tak jako tak.',
  },
};

export const NOTE_TEXT: Record<string, Copy> = {
  'de.note.u1OverThirty': {
    de: 'Ohne U1: Betriebe mit mehr als 30 Beschäftigten nehmen am Ausgleichsverfahren U1 nicht teil (§ 1 Absatz 1 AAG).',
    en: 'No U1: employers with more than 30 staff do not take part in the U1 reimbursement scheme (§ 1 Absatz 1 AAG).',
    cs: 'Bez U1: zaměstnavatelé s více než 30 zaměstnanci se schématu U1 neúčastní (§ 1 odst. 1 AAG).',
  },
  'de.note.accidentMissing': {
    de: 'Ohne Unfallversicherung sind die Arbeitgeberkosten unvollständig. Der Beitrag wird von der Berufsgenossenschaft nach Gefahrtarif erhoben und ist betriebsindividuell — er kann hier nicht geschätzt werden.',
    en: 'Without accident insurance the employer cost is incomplete. The trade association charges it from its own risk tariff, and it is specific to the business — it cannot be estimated here.',
    cs: 'Bez úrazového pojištění jsou náklady zaměstnavatele neúplné. Pojistné vyměřuje profesní sdružení podle rizikového tarifu a je individuální — nelze je zde odhadnout.',
  },
  'de.note.stkl6SecondJob': {
    de: 'Steuerklasse VI steht in der Regel für ein zweites Dienstverhältnis. Die Beitragsbemessungsgrenzen wirken über alle Beschäftigungen zusammen, und dieser Rechner sieht nur diese eine — die Beiträge können daher zu hoch ausgewiesen sein.',
    en: 'Tax class VI normally means a second job. The contribution ceilings work across all employments and this calculator sees only one, so the contributions may be overstated.',
    cs: 'Daňová třída VI zpravidla znamená druhý pracovní poměr. Stropy pro odvody působí přes všechna zaměstnání dohromady a kalkulačka vidí jen toto jedno — pojistné proto může být nadhodnoceno.',
  },
  'de.note.parenthoodUnproved': {
    de: 'Steuerklasse II oder ein Kinderfreibetrag setzt ein Kind voraus, die Elterneigenschaft ist hier aber nicht als nachgewiesen angegeben. Ohne Nachweis fällt der Zuschlag für Kinderlose an (§ 55 Absatz 3a SGB XI). Bitte prüfen, ob der Nachweis vorliegt.',
    en: 'Tax class II, or a child allowance, presupposes a child — but parenthood is not marked as proved here. Without proof the childless surcharge applies (§ 55 Absatz 3a SGB XI). Please check whether the proof is on file.',
    cs: 'Daňová třída II nebo úleva na dítě předpokládá dítě, rodičovství zde ale není označeno jako doložené. Bez doložení se uplatní příplatek pro bezdětné (§ 55 odst. 3a SGB XI). Zkontrolujte prosím, zda je doklad k dispozici.',
  },
  'de.note.u2Missing': {
    de: 'Ohne U2-Satz sind die Arbeitgeberkosten unvollständig. Die Umlage U2 ist nach § 1 Absatz 2 AAG für jeden Arbeitgeber verpflichtend; den Satz legt die Krankenkasse in ihrer Satzung fest.',
    en: 'Without a U2 rate the employer cost is incomplete. Levy U2 is compulsory for every employer under § 1 Absatz 2 AAG; the rate is set by the health fund in its own rules.',
    cs: 'Bez sazby U2 jsou náklady zaměstnavatele neúplné. Odvod U2 je podle § 1 odst. 2 AAG povinný pro každého zaměstnavatele; sazbu stanoví zdravotní pojišťovna ve svých stanovách.',
  },
  'de.note.kappungNotModelled': {
    de: 'Die Kappung der Kirchensteuer-Progression ist nicht berücksichtigt. Sie wird in der Regel erst bei der Veranlagung und meist auf Antrag gewährt; der Arbeitgeber behält den ungekappten Betrag ein.',
    en: 'The cap on church-tax progression is not applied. It is generally granted in the annual assessment and usually on application; the employer withholds the uncapped amount.',
    cs: 'Zastropení progrese církevní daně není zohledněno. Přiznává se zpravidla až při ročním zúčtování a obvykle na žádost; zaměstnavatel sráží nezastropenou částku.',
  },
};

export const ERROR_TEXT: Record<string, Copy> = {
  'gross.unreadable': {
    de: 'Bitte einen Betrag in Euro eingeben, zum Beispiel 3.500 oder 3500,00.',
    en: 'Please enter an amount in euro, for example 3,500 or 3500.00.',
    cs: 'Zadejte prosím částku v eurech, například 3 500 nebo 3500,00.',
  },
  'supplement.unreadable': {
    de: 'Bitte einen Prozentsatz mit höchstens zwei Nachkommastellen eingeben, zum Beispiel 2,9.',
    en: 'Please enter a percentage with at most two decimals, for example 2.9.',
    cs: 'Zadejte prosím procento nejvýše na dvě desetinná místa, například 2,9.',
  },
  'u1.unreadable': {
    de: 'Bitte einen U1-Satz mit höchstens zwei Nachkommastellen eingeben.',
    en: 'Please enter a U1 rate with at most two decimals.',
    cs: 'Zadejte prosím sazbu U1 nejvýše na dvě desetinná místa.',
  },
  'u2.unreadable': {
    de: 'Bitte einen U2-Satz mit höchstens zwei Nachkommastellen eingeben.',
    en: 'Please enter a U2 rate with at most two decimals.',
    cs: 'Zadejte prosím sazbu U2 nejvýše na dvě desetinná místa.',
  },
  'accident.unreadable': {
    de: 'Bitte einen monatlichen Betrag in Euro eingeben oder das Feld leer lassen.',
    en: 'Please enter a monthly amount in euro, or leave the field empty.',
    cs: 'Zadejte prosím měsíční částku v eurech, nebo pole ponechte prázdné.',
  },
};

/**
 * Messages for the engine's own validation.
 *
 * Separate from ERROR_TEXT, which belongs to the form's parsing. These fire for
 * a value that PARSED and is still outside what the rules describe — a seventh
 * Steuerklasse, a 900 % Zusatzbeitrag — and each says what the acceptable range
 * is rather than only that the value is wrong.
 */
export const ISSUE_TEXT: Record<string, Copy> = {
  generic: {
    de: 'Diese Eingabe liegt außerhalb des Bereichs, den der Rechner abbilden kann.',
    en: 'This entry is outside the range the calculator can model.',
    cs: 'Tento údaj je mimo rozsah, který kalkulačka umí zpracovat.',
  },
  'gross.negative': {
    de: 'Das Bruttoentgelt kann nicht negativ sein.',
    en: 'Gross pay cannot be negative.',
    cs: 'Hrubá mzda nemůže být záporná.',
  },
  'gross.implausible': {
    de: 'Bitte ein monatliches Bruttoentgelt unter 100 Millionen Euro eingeben.',
    en: 'Please enter a monthly gross below 100 million euro.',
    cs: 'Zadejte prosím měsíční hrubou mzdu nižší než 100 milionů eur.',
  },
  'steuerklasse.outOfRange': {
    de: 'Es gibt sechs Steuerklassen, I bis VI.',
    en: 'There are six tax classes, I to VI.',
    cs: 'Existuje šest daňových tříd, I až VI.',
  },
  'kinderfreibetraege.unreadable': {
    de: 'Kinderfreibeträge werden in halben Schritten angegeben, zum Beispiel 0,5 oder 2.',
    en: 'Child allowances come in halves, for example 0.5 or 2.',
    cs: 'Úlevy na děti se uvádějí po polovinách, například 0,5 nebo 2.',
  },
  'workplace.unknown': {
    de: 'Bitte eines der sechzehn Bundesländer wählen.',
    en: 'Please choose one of the sixteen federal states.',
    cs: 'Vyberte prosím jednu ze šestnácti spolkových zemí.',
  },
  'supplement.unreadable': {
    de: 'Der Zusatzbeitragssatz wird in Prozent mit höchstens zwei Nachkommastellen angegeben.',
    en: 'The supplementary rate is a percentage with at most two decimals.',
    cs: 'Doplňková sazba se uvádí v procentech nejvýše na dvě desetinná místa.',
  },
  'supplement.implausible': {
    de: 'Kein Zusatzbeitragssatz liegt über 10 %. Bitte den Wert prüfen.',
    en: 'No supplementary rate exceeds 10 %. Please check the figure.',
    cs: 'Žádná doplňková sazba nepřesahuje 10 %. Zkontrolujte prosím údaj.',
  },
  'kinderfreibetraege.implausible': {
    de: 'Bitte höchstens 20 Kinderfreibeträge eingeben.',
    en: 'Please enter at most 20 child allowances.',
    cs: 'Zadejte prosím nejvýše 20 úlev na děti.',
  },
  'children.outOfRange': {
    de: 'Bitte eine Kinderzahl zwischen 0 und 20 eingeben.',
    en: 'Please enter a number of children between 0 and 20.',
    cs: 'Zadejte prosím počet dětí mezi 0 a 20.',
  },
  'u1.unreadable': {
    de: 'Der U1-Satz wird in Prozent mit höchstens zwei Nachkommastellen angegeben.',
    en: 'The U1 rate is a percentage with at most two decimals.',
    cs: 'Sazba U1 se uvádí v procentech nejvýše na dvě desetinná místa.',
  },
  'u1.implausible': {
    de: 'Kein U1-Satz liegt über 20 %. Bitte den Wert prüfen.',
    en: 'No U1 rate exceeds 20 %. Please check the figure.',
    cs: 'Žádná sazba U1 nepřesahuje 20 %. Zkontrolujte prosím údaj.',
  },
  'u2.unreadable': {
    de: 'Der U2-Satz wird in Prozent mit höchstens zwei Nachkommastellen angegeben.',
    en: 'The U2 rate is a percentage with at most two decimals.',
    cs: 'Sazba U2 se uvádí v procentech nejvýše na dvě desetinná místa.',
  },
  'u2.implausible': {
    de: 'Kein U2-Satz liegt über 20 %. Bitte den Wert prüfen.',
    en: 'No U2 rate exceeds 20 %. Please check the figure.',
    cs: 'Žádná sazba U2 nepřesahuje 20 %. Zkontrolujte prosím údaj.',
  },
  'accident.negative': {
    de: 'Der Beitrag zur Unfallversicherung kann nicht negativ sein.',
    en: 'The accident-insurance amount cannot be negative.',
    cs: 'Částka úrazového pojištění nemůže být záporná.',
  },
  'accident.implausible': {
    de: 'Bitte einen monatlichen Betrag unter 100 Millionen Euro eingeben.',
    en: 'Please enter a monthly amount below 100 million euro.',
    cs: 'Zadejte prosím měsíční částku nižší než 100 milionů eur.',
  },
};

export const REFUSAL: Record<string, Copy> = {
  heading: {
    de: 'Dieser Fall wird nicht berechnet',
    en: 'This case is not calculated',
    cs: 'Tento případ se nepočítá',
  },
  why: {
    de: 'Warum nicht:',
    en: 'Why not:',
    cs: 'Proč ne:',
  },
};

export const METHODOLOGY: Record<string, Copy> = {
  heading: {
    de: 'Wie gerechnet wird',
    en: 'How this is calculated',
    cs: 'Jak se počítá',
  },
  taxSource: {
    de: 'Die Lohnsteuer folgt dem Programmablaufplan des Bundesministeriums der Finanzen für 2026 (BMF-Schreiben vom 12. November 2025), Schritt für Schritt — nicht einer vereinfachten Formel. Die Umsetzung reproduziert beide amtlichen Prüftabellen der Anlage 1 vollständig.',
    en: 'The wage tax follows the German Ministry of Finance’s 2026 Programmablaufplan (circular of 12 November 2025) step by step, rather than a simplified formula. The implementation reproduces both official verification tables in Annex 1 in full.',
    cs: 'Daň ze mzdy sleduje krok za krokem oficiální výpočetní postup německého ministerstva financí pro rok 2026 (sdělení z 12. listopadu 2025), nikoli zjednodušený vzorec. Implementace beze zbytku reprodukuje obě úřední kontrolní tabulky přílohy 1.',
  },
  socialSource: {
    de: 'Die Beiträge folgen der Beitragsverfahrensverordnung: der halbe Beitragssatz wird angewendet, gerundet und verdoppelt; bei ungleicher Verteilung wird jeder Anteil einzeln gerundet. Die Grenzen stammen aus der Sozialversicherungsrechengrößen-Verordnung 2026.',
    en: 'Contributions follow the Beitragsverfahrensverordnung: half the rate is applied, rounded, then doubled; where the split is unequal each share is rounded on its own. The ceilings come from the 2026 Sozialversicherungsrechengrößen-Verordnung.',
    cs: 'Pojistné sleduje Beitragsverfahrensverordnung: použije se poloviční sazba, zaokrouhlí se a zdvojnásobí; při nerovném dělení se každý podíl zaokrouhluje zvlášť. Stropy vycházejí z nařízení o vyměřovacích veličinách pro rok 2026.',
  },
  privacy: {
    de: 'Die Berechnung läuft vollständig in Ihrem Browser. Es werden keine Eingaben übertragen, gespeichert oder in die Adresszeile geschrieben.',
    en: 'The calculation runs entirely in your browser. Nothing you type is transmitted, stored, or written into the address bar.',
    cs: 'Výpočet probíhá zcela ve vašem prohlížeči. Nic ze zadaného se nepřenáší, neukládá ani nezapisuje do adresního řádku.',
  },
  basisPension: {
    de: 'Rentenversicherung', en: 'Pension insurance', cs: 'Důchodové pojištění',
  },
  basisUnemployment: {
    de: 'Arbeitslosenversicherung', en: 'Unemployment insurance', cs: 'Pojištění v nezaměstnanosti',
  },
  basisHealth: {
    de: 'Krankenversicherung', en: 'Health insurance', cs: 'Zdravotní pojištění',
  },
  basisCare: {
    de: 'Pflegeversicherung', en: 'Long-term care insurance', cs: 'Pojištění dlouhodobé péče',
  },
  basisLevies: {
    de: 'Umlagen und Unfallversicherung', en: 'Levies and accident insurance', cs: 'Odvody a úrazové pojištění',
  },
  basisTax: {
    de: 'Lohnsteuer, Solidaritätszuschlag, Kirchensteuer',
    en: 'Wage tax, solidarity surcharge, church tax',
    cs: 'Daň ze mzdy, solidární příplatek, církevní daň',
  },
  ceilingHealth: {
    de: 'Beitragsbemessungsgrenze Kranken- und Pflegeversicherung, monatlich',
    en: 'Contribution ceiling, health and long-term care, monthly',
    cs: 'Strop pro odvody, zdravotní a pečovatelské pojištění, měsíčně',
  },
  ceilingPension: {
    de: 'Beitragsbemessungsgrenze Renten- und Arbeitslosenversicherung, monatlich',
    en: 'Contribution ceiling, pension and unemployment, monthly',
    cs: 'Strop pro odvody, důchodové pojištění a pojištění v nezaměstnanosti, měsíčně',
  },
  insuranceThreshold: {
    de: 'Jahresarbeitsentgeltgrenze (keine Beitragsbemessungsgrenze), jährlich',
    en: 'Compulsory health-insurance threshold (not a contribution ceiling), annual',
    cs: 'Hranice povinné účasti ve zdravotním pojištění (není strop pro odvody), ročně',
  },
  minijobThreshold: {
    de: 'Geringfügigkeitsgrenze — bis einschließlich hierhin wird nicht gerechnet',
    en: 'Minijob threshold — up to and including this nothing is calculated',
    cs: 'Hranice minijobu — až sem včetně se nepočítá',
  },
  transitionThreshold: {
    de: 'Obergrenze des Übergangsbereichs — bis einschließlich hierhin wird nicht gerechnet',
    en: 'Top of the transition band — up to and including this nothing is calculated',
    cs: 'Horní hranice přechodového pásma — až sem včetně se nepočítá',
  },
  notAdvice: {
    de: 'Das Ergebnis ist eine Modellrechnung für einen vollen Monat und ersetzt keine Lohnabrechnung.',
    en: 'The result models one full month and is not a substitute for a payroll run.',
    cs: 'Výsledek je modelový výpočet za celý měsíc a nenahrazuje mzdové zúčtování.',
  },
};

export const CROSS_LINK: Record<string, Copy> = {
  label: {
    de: 'Was eine unbesetzte Stelle kostet',
    en: 'What an unfilled position costs',
    cs: 'Kolik stojí neobsazená pozice',
  },
};

/** Paths for the cross-link — canonical, and never carrying a query. */
export const CROSS_LINK_PATH: Readonly<Record<DeLocale, string>> = {
  de: '/de/kosten-unbesetzter-stellen',
  en: '/en/cost-of-vacancy',
  cs: '/cena-neobsazene-pozice',
};
