/**
 * UI copy for the Czech employer-cost calculator, in cs / en / de.
 *
 * ALL THREE LOCALES DESCRIBE CZECH LAW
 * ────────────────────────────────────
 * This is the point §37 turns on. The English text is Czech payroll explained in
 * English; the German text is Czech payroll explained in German. Neither is a
 * calculator for its own country's rules, and the copy must never let a reader
 * think otherwise.
 *
 * For German that is not a nicety — it is a build gate. scripts/validate-locale-
 * jurisdiction.mjs fails the build when a German page uses a legally loaded term
 * (Mindestlohn, Sozialversicherung, zuständige Behörde, …) without naming
 * Czechia at or before that point in reading order. So German strings here name
 * Tschechien early and keep naming it: "tschechischer Mindestlohn", not
 * "Mindestlohn". The Czech legal term is also kept in parentheses where a reader
 * may need to match it against a payslip or an official form, which no
 * translation can do for them.
 *
 * WHY THE ENGINE HOLDS NO PROSE
 * ─────────────────────────────
 * The engine emits keys. This file turns keys into sentences. That is what makes
 * "one mathematical engine behind three languages" checkable rather than
 * aspirational: there is no code path where a locale could reach a different
 * number, because no locale reaches the arithmetic at all.
 */

import type { CalculatorLocale } from './formatting';

export type Copy = Readonly<Record<CalculatorLocale, string>>;

/** Jurisdiction and year stamp. §3 and §26 require it visibly on every page. */
export const JURISDICTION_STAMP: Copy = {
  cs: 'Česká republika · 2026',
  en: 'Czech Republic · 2026',
  de: 'Tschechische Republik · 2026',
};

export const PAGE_KICKER: Copy = {
  cs: 'Výpočet podle pravidel platných v České republice pro rok 2026.',
  en: 'Calculated under the rules in force in the Czech Republic for 2026.',
  de: 'Berechnung nach den in der Tschechischen Republik für 2026 geltenden Regeln.',
};

/**
 * The exactness disclaimer required by §28.
 *
 * Deliberately not "100 % accurate": real payroll depends on facts this form
 * does not collect. The sentence states what the calculation IS — a computation
 * from the entered data under the 2026 rules — which is both true and more
 * useful than a guarantee nobody can give.
 */
export const EXACTNESS_NOTICE: Copy = {
  cs: 'Výpočet podle zadaných údajů a pravidel pro rok 2026. Skutečná mzdová agenda může záviset na okolnostech, které tento formulář nezjišťuje.',
  en: 'Calculated from the data you entered under the 2026 rules. Actual payroll can depend on circumstances this form does not capture.',
  de: 'Berechnet aus den eingegebenen Daten nach den tschechischen Regeln für 2026. Die tatsächliche Lohnabrechnung kann von Umständen abhängen, die dieses Formular nicht erfasst.',
};

/** Shown in place of a number when the engine will not model a case (§28). */
export const REQUIRES_INDIVIDUAL_CALCULATION: Copy = {
  cs: 'Tento případ vyžaduje individuální mzdový výpočet.',
  en: 'This case requires an individual payroll calculation.',
  de: 'Dieser Fall erfordert eine individuelle tschechische Lohnabrechnung.',
};

// ─────────────────────────────────────────────────────────────────────────────
// Input labels — §36
// ─────────────────────────────────────────────────────────────────────────────

export const INPUT_LABELS: Readonly<Record<string, Copy>> = {
  'salary.gross': {
    cs: 'Měsíční hrubá mzda',
    en: 'Gross monthly salary',
    de: 'Monatliches Bruttogehalt',
  },
  'salary.bonuses': {
    cs: 'Měsíční prémie a bonusy',
    en: 'Monthly bonuses and premiums',
    de: 'Monatliche Prämien und Boni',
  },
  'salary.otherTaxable': {
    cs: 'Jiné zdanitelné plnění',
    en: 'Other taxable remuneration',
    de: 'Sonstige steuerpflichtige Vergütung',
  },
  'salary.workingTime': {
    cs: 'Úvazek (% plné pracovní doby)',
    en: 'Working time (% of full time)',
    de: 'Arbeitszeit (% der Vollzeit)',
  },
  'taxProfile.residency': {
    cs: 'Daňové rezidentství',
    en: 'Tax residency',
    de: 'Steuerliche Ansässigkeit',
  },
  'taxProfile.residency.resident': {
    cs: 'Daňový rezident ČR',
    en: 'Czech tax resident',
    de: 'In Tschechien steuerlich ansässig',
  },
  'taxProfile.residency.nonResident': {
    cs: 'Daňový nerezident',
    en: 'Non-resident',
    de: 'Nicht in Tschechien ansässig',
  },
  'taxProfile.signedDeclaration': {
    cs: 'Podepsané prohlášení poplatníka',
    en: 'Signed taxpayer declaration (prohlášení poplatníka)',
    de: 'Unterzeichnete tschechische Steuererklärung des Arbeitnehmers (prohlášení poplatníka)',
  },
  'taxProfile.basicCredit': {
    cs: 'Uplatnit základní slevu na poplatníka',
    en: 'Apply the basic taxpayer credit',
    de: 'Grundfreibetrag für Steuerpflichtige anwenden',
  },
  'taxProfile.disability': {
    cs: 'Invalidita',
    en: 'Disability',
    de: 'Invalidität',
  },
  'taxProfile.disability.none': { cs: 'Žádná', en: 'None', de: 'Keine' },
  'taxProfile.disability.firstSecond': {
    cs: 'Invalidita 1. nebo 2. stupně',
    en: 'Disability, degree I or II',
    de: 'Invalidität 1. oder 2. Grades',
  },
  'taxProfile.disability.third': {
    cs: 'Invalidita 3. stupně',
    en: 'Disability, degree III',
    de: 'Invalidität 3. Grades',
  },
  'taxProfile.ztpp': {
    cs: 'Držitel průkazu ZTP/P',
    en: 'Holder of a ZTP/P card',
    de: 'Inhaber eines tschechischen ZTP/P-Ausweises',
  },
  'taxProfile.children': {
    cs: 'Vyživované děti',
    en: 'Dependent children',
    de: 'Unterhaltsberechtigte Kinder',
  },
  'taxProfile.child.ztpp': {
    cs: 'Dítě je držitelem průkazu ZTP/P',
    en: 'Child holds a ZTP/P card',
    de: 'Kind ist Inhaber eines ZTP/P-Ausweises',
  },
  'socialMaximum.mode': {
    cs: 'Maximální vyměřovací základ sociálního pojištění',
    en: 'Annual social-insurance maximum assessment base',
    de: 'Jährliche Höchstbemessungsgrundlage der tschechischen Sozialversicherung',
  },
  'socialMaximum.assumeNotReached': {
    cs: 'Předpokládat, že maxima nebylo letos dosaženo',
    en: 'Assume the annual maximum has not been reached this year',
    de: 'Annehmen, dass die Jahreshöchstgrenze noch nicht erreicht ist',
  },
  'socialMaximum.explicitYtd': {
    cs: 'Zadat vyměřovací základ využitý od začátku roku',
    en: 'Enter the assessment base already used this year',
    de: 'Bereits in diesem Jahr genutzte Bemessungsgrundlage eingeben',
  },
  'socialMaximum.ytdAmount': {
    cs: 'Vyměřovací základ využitý od 1. ledna',
    en: 'Assessment base used since 1 January',
    de: 'Seit 1. Januar genutzte Bemessungsgrundlage',
  },
  'healthMinimum.situation': {
    cs: 'Uplatňuje se minimální vyměřovací základ zdravotního pojištění?',
    en: 'Does the statutory minimum health assessment base apply?',
    de: 'Gilt die gesetzliche Mindestbemessungsgrundlage der tschechischen Krankenversicherung?',
  },
  'healthMinimum.standard': {
    cs: 'Standardní zaměstnanec — minimum se uplatní',
    en: 'Standard employee — the minimum applies',
    de: 'Standardbeschäftigter — die Mindestgrundlage gilt',
  },
  'healthMinimum.exemption': {
    cs: 'Zaměstnanec s zákonnou výjimkou z minima',
    en: 'Employee with a statutory exemption from the minimum',
    de: 'Beschäftigter mit gesetzlicher Ausnahme von der Mindestgrundlage',
  },
  'healthMinimum.employerObstacle': {
    cs: 'Nízký základ z důvodu překážky na straně zaměstnavatele',
    en: 'Low base due to an obstacle on the employer’s side',
    de: 'Niedrige Grundlage wegen eines Hindernisses aufseiten des Arbeitgebers',
  },
  'healthMinimum.partialMonth': {
    cs: 'Zaměstnání netrvalo celý měsíc',
    en: 'Employment did not last the whole month',
    de: 'Beschäftigung bestand nicht den ganzen Monat',
  },
  'employerOptions.category': {
    cs: 'Kategorie zaměstnance pro sociální pojištění',
    en: 'Employee category for social insurance',
    de: 'Beschäftigtenkategorie für die tschechische Sozialversicherung',
  },
  'employerOptions.standard': {
    cs: 'Standardní zaměstnanec',
    en: 'Standard employee',
    de: 'Standardbeschäftigter',
  },
  'employerOptions.discount': {
    cs: 'Sleva na pojistném zaměstnavatele',
    en: 'Employer social-insurance discount',
    de: 'Ermäßigung der Arbeitgeberbeiträge zur tschechischen Sozialversicherung',
  },
  'employerOptions.discountConfirm': {
    cs: 'Potvrzuji, že zákonné podmínky pro tohoto zaměstnance jsou splněny.',
    en: 'I confirm that the statutory conditions are met for this employee.',
    de: 'Ich bestätige, dass die gesetzlichen Voraussetzungen für diesen Beschäftigten erfüllt sind.',
  },
  'liability.enabled': {
    cs: 'Zahrnout zákonné pojištění odpovědnosti zaměstnavatele',
    en: 'Include statutory employer liability insurance',
    de: 'Gesetzliche tschechische Arbeitgeberhaftpflichtversicherung einbeziehen',
  },
  'liability.activity': {
    cs: 'Převažující činnost zaměstnavatele (CZ-NACE)',
    en: 'Employer’s prevailing economic activity (CZ-NACE)',
    de: 'Überwiegende Wirtschaftstätigkeit des Arbeitgebers (CZ-NACE)',
  },
  'liability.customRate': {
    cs: 'Vlastní sazba (‰ z vyměřovacího základu)',
    en: 'Own rate (‰ of the assessment base)',
    de: 'Eigener Satz (‰ der Bemessungsgrundlage)',
  },
  'additionalCosts.section': {
    cs: 'Další náklady zaměstnavatele',
    en: 'Additional employer costs',
    de: 'Zusätzliche Arbeitgeberkosten',
  },
  'additionalCosts.taxNotice': {
    cs: 'Pouze náklad — daňový režim se nepočítá.',
    en: 'Cost only — tax treatment not calculated.',
    de: 'Nur Kosten — steuerliche Behandlung wird nicht berechnet.',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Validation messages — keys emitted by validation.ts
// ─────────────────────────────────────────────────────────────────────────────

export const VALIDATION_MESSAGES: Readonly<Record<string, Copy>> = {
  'period.year.outOfRange': {
    cs: 'Zadejte platný rok.',
    en: 'Enter a valid year.',
    de: 'Geben Sie ein gültiges Jahr ein.',
  },
  'period.month.outOfRange': {
    cs: 'Zadejte měsíc 1 až 12.',
    en: 'Enter a month from 1 to 12.',
    de: 'Geben Sie einen Monat von 1 bis 12 ein.',
  },
  'period.year.rulesetMismatch': {
    cs: 'Kalkulačka počítá podle pravidel pro rok 2026. Pro jiný rok platí jiné sazby a hranice.',
    en: 'This calculator applies the 2026 Czech rules. Other years have different rates and thresholds.',
    de: 'Dieser Rechner wendet die tschechischen Regeln für 2026 an. Für andere Jahre gelten andere Sätze und Grenzen.',
  },
  'salary.gross.invalid': {
    cs: 'Zadejte hrubou mzdu jako nezáporné číslo.',
    en: 'Enter the gross salary as a non-negative number.',
    de: 'Geben Sie das Bruttogehalt als nicht negative Zahl ein.',
  },
  'salary.gross.tooLarge': {
    cs: 'Zadaná hrubá mzda je mimo použitelný rozsah.',
    en: 'The gross salary entered is outside the usable range.',
    de: 'Das eingegebene Bruttogehalt liegt außerhalb des nutzbaren Bereichs.',
  },
  'salary.bonuses.invalid': {
    cs: 'Zadejte prémie jako nezáporné číslo.',
    en: 'Enter bonuses as a non-negative number.',
    de: 'Geben Sie Prämien als nicht negative Zahl ein.',
  },
  'salary.otherTaxable.invalid': {
    cs: 'Zadejte jiné zdanitelné plnění jako nezáporné číslo.',
    en: 'Enter other taxable remuneration as a non-negative number.',
    de: 'Geben Sie sonstige steuerpflichtige Vergütung als nicht negative Zahl ein.',
  },
  'salary.workingTime.outOfRange': {
    cs: 'Úvazek zadejte v rozmezí 1 až 100 %.',
    en: 'Enter working time between 1 and 100 %.',
    de: 'Geben Sie die Arbeitszeit zwischen 1 und 100 % ein.',
  },
  'salary.gross.belowMinimumWageAtFullTime': {
    cs: 'Zadaná mzda je při plném úvazku nižší než minimální mzda v ČR pro rok 2026. Výpočet proběhne, ale zkontrolujte zadání — uplatní se pravidla minimálního vyměřovacího základu zdravotního pojištění.',
    en: 'At full working time this is below the 2026 Czech minimum wage. The calculation still runs, but check the figure — the minimum health assessment base rules now apply.',
    de: 'Bei Vollzeit liegt dieser Betrag unter dem tschechischen Mindestlohn für 2026. Die Berechnung läuft weiter, prüfen Sie aber die Eingabe — die Regeln zur Mindestbemessungsgrundlage der tschechischen Krankenversicherung greifen nun.',
  },
  'taxProfile.basicCredit.requiresDeclaration': {
    cs: 'Základní slevu na poplatníka lze měsíčně uplatnit jen při podepsaném prohlášení poplatníka.',
    en: 'The basic taxpayer credit can be claimed monthly only with a signed taxpayer declaration.',
    de: 'Der Grundfreibetrag kann monatlich nur bei unterzeichneter tschechischer Arbeitnehmererklärung geltend gemacht werden.',
  },
  'taxProfile.children.tooMany': {
    cs: 'Zkontrolujte počet dětí.',
    en: 'Check the number of children.',
    de: 'Prüfen Sie die Anzahl der Kinder.',
  },
  'taxProfile.nonResident.personalCreditsRestricted': {
    cs: 'Daňový nerezident může měsíčně uplatnit pouze základní slevu na poplatníka. Slevy na invaliditu a ZTP/P lze uplatnit až v ročním zúčtování.',
    en: 'A non-resident may claim only the basic taxpayer credit monthly. Disability and ZTP/P credits are available only in the annual settlement.',
    de: 'Ein nicht in Tschechien Ansässiger kann monatlich nur den Grundfreibetrag geltend machen. Ermäßigungen für Invalidität und ZTP/P sind erst im tschechischen Jahresausgleich möglich.',
  },
  'taxProfile.nonResident.childBenefitRestricted': {
    cs: 'Daňové zvýhodnění na dítě může nerezident uplatnit pouze za zákonných podmínek v daňovém přiznání, nikoli měsíčně.',
    en: 'A non-resident may claim the child tax benefit only in the annual tax return under statutory conditions, not monthly.',
    de: 'Der Kinderfreibetrag kann von nicht Ansässigen nur unter gesetzlichen Voraussetzungen in der tschechischen Jahressteuererklärung geltend gemacht werden, nicht monatlich.',
  },
  'taxProfile.noDeclaration.reliefsNotApplied': {
    cs: 'Bez podepsaného prohlášení poplatníka se měsíční slevy ani daňové zvýhodnění na děti neuplatní.',
    en: 'Without a signed taxpayer declaration, monthly credits and the child tax benefit are not applied.',
    de: 'Ohne unterzeichnete tschechische Arbeitnehmererklärung werden monatliche Ermäßigungen und der Kinderfreibetrag nicht angewendet.',
  },
  'socialMaximum.ytd.invalid': {
    cs: 'Zadejte dosud využitý vyměřovací základ jako nezáporné číslo.',
    en: 'Enter the assessment base used so far as a non-negative number.',
    de: 'Geben Sie die bisher genutzte Bemessungsgrundlage als nicht negative Zahl ein.',
  },
  'socialMaximum.ytd.tooLarge': {
    cs: 'Zadaný vyměřovací základ je mimo použitelný rozsah.',
    en: 'The assessment base entered is outside the usable range.',
    de: 'Die eingegebene Bemessungsgrundlage liegt außerhalb des nutzbaren Bereichs.',
  },
  'healthMinimum.daysInMonth.outOfRange': {
    cs: 'Počet dnů v měsíci musí být 28 až 31.',
    en: 'Days in the month must be between 28 and 31.',
    de: 'Die Anzahl der Tage im Monat muss zwischen 28 und 31 liegen.',
  },
  'healthMinimum.applicableDays.invalid': {
    cs: 'Zadejte počet dnů jako celé nezáporné číslo.',
    en: 'Enter the number of days as a non-negative whole number.',
    de: 'Geben Sie die Anzahl der Tage als nicht negative ganze Zahl ein.',
  },
  'healthMinimum.applicableDays.exceedsMonth': {
    cs: 'Počet dnů nemůže překročit počet dnů v měsíci.',
    en: 'The number of days cannot exceed the days in the month.',
    de: 'Die Anzahl der Tage kann die Tage des Monats nicht überschreiten.',
  },
  'employerDiscount.categoryRequired': {
    cs: 'Vyberte kategorii, na jejímž základě se sleva uplatňuje.',
    en: 'Select the category the discount is claimed under.',
    de: 'Wählen Sie die Kategorie, unter der die Ermäßigung geltend gemacht wird.',
  },
  'employerDiscount.categoryWithoutClaim': {
    cs: 'Kategorie je vybrána, ale sleva není uplatněna.',
    en: 'A category is selected but the discount is not claimed.',
    de: 'Eine Kategorie ist gewählt, die Ermäßigung wird aber nicht geltend gemacht.',
  },
  'liability.rateRequired': {
    cs: 'Zadejte sazbu nebo vyberte převažující činnost.',
    en: 'Enter a rate or select the prevailing activity.',
    de: 'Geben Sie einen Satz ein oder wählen Sie die überwiegende Tätigkeit.',
  },
  'liability.rateNegative': {
    cs: 'Sazba nemůže být záporná.',
    en: 'The rate cannot be negative.',
    de: 'Der Satz kann nicht negativ sein.',
  },
  'liability.rateImplausible': {
    cs: 'Sazba se zadává v promile (‰). Zkontrolujte zadanou hodnotu.',
    en: 'The rate is entered in per mille (‰). Check the value.',
    de: 'Der Satz wird in Promille (‰) angegeben. Prüfen Sie den Wert.',
  },
  'liability.unknownActivity': {
    cs: 'Vybraná činnost není v sazebníku.',
    en: 'The selected activity is not in the rate table.',
    de: 'Die gewählte Tätigkeit ist nicht in der Satztabelle enthalten.',
  },
  'additionalCosts.invalid': {
    cs: 'Zadejte částku jako nezáporné číslo.',
    en: 'Enter the amount as a non-negative number.',
    de: 'Geben Sie den Betrag als nicht negative Zahl ein.',
  },
};

/** Look a message up. Throws on an unknown key rather than rendering an empty string. */
export function message(
  catalogue: Readonly<Record<string, Copy>>,
  key: string,
  locale: CalculatorLocale,
): string {
  const entry = catalogue[key];
  if (!entry) throw new Error(`copy: unknown key "${key}"`);
  return entry[locale];
}
