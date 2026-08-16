// Vacancy-cost tool copy, CS / EN / DE.
//
// Czech is the source and the authority: the tool sits on a Czech-market page
// and the Czech wording is the one reviewed. EN and DE are faithful renderings
// of it — the numbers and formulas are identical in all three, and no
// translation may claim more than the Czech does.
//
// The EN and DE result headers say "based on entered assumptions" for the same
// reason the Czech does: the figure belongs to the employer who typed it, not to
// us. And per §H the non-Czech versions state plainly that this is a generic
// planning aid, not a jurisdiction-specific statutory calculator — no Czech
// payroll rule is applied anywhere in this tool.

import type { Lang } from '../i18n/react'
import type { FieldName, GroupName, ParseError, Unit } from './model'

type L<T> = Record<Lang, T>

export const TOOL_TITLE: L<string> = {
  cs: 'Kalkulace nákladů neobsazené pozice',
  en: 'Vacancy cost calculator',
  de: 'Kalkulation der Kosten einer unbesetzten Stelle',
}

export const TOOL_INTRO: L<string> = {
  cs: 'Nástroj nepoužívá žádné průměry ani odhady z trhu. Počítá výhradně s čísly, která zadáte vy. Položky, které pro váš provoz nedávají smysl, nechte na nule.',
  en: 'This tool uses no market averages and no assumed figures. It works only with the numbers you enter. Leave any line at zero if it does not apply to your operation.',
  de: 'Dieses Tool verwendet keine Marktdurchschnitte und keine angenommenen Werte. Es rechnet ausschließlich mit den von Ihnen eingegebenen Zahlen. Positionen, die für Ihren Betrieb nicht zutreffen, lassen Sie auf null.',
}

/** Shown in EN/DE only — §H. */
export const SCOPE_NOTE: L<string | null> = {
  cs: null,
  en: 'This is a general employer planning aid, not a statutory payroll calculator. It applies no Czech or other national payroll rule; every amount is your own figure. Amounts are entered in CZK.',
  de: 'Dies ist eine allgemeine Planungshilfe für Arbeitgeber, kein gesetzlicher Lohnrechner. Es wird keine tschechische oder andere nationale Lohnvorschrift angewendet; jeder Betrag ist Ihre eigene Angabe. Beträge werden in CZK eingegeben.',
}

export const FIELD_LABEL: Record<FieldName, L<string>> = {
  vacancyDays: {
    cs: 'Doba neobsazení',
    en: 'Vacancy duration',
    de: 'Dauer der Vakanz',
  },
  dailyContribution: {
    cs: 'Odhadovaný denní výpadek přínosu pozice',
    en: 'Estimated daily contribution lost',
    de: 'Geschätzter täglicher Beitragsausfall',
  },
  overtimePerDay: {
    cs: 'Náklad na přesčasy pro pokrytí',
    en: 'Overtime cost for coverage',
    de: 'Überstundenkosten für die Abdeckung',
  },
  contractorPerDay: {
    cs: 'Náklad na dočasné či agenturní pokrytí',
    en: 'Temporary or agency coverage cost',
    de: 'Kosten für befristete oder Agenturabdeckung',
  },
  recruiterHours: {
    cs: 'Čas interního náboru',
    en: 'Internal recruitment time',
    de: 'Zeitaufwand interne Rekrutierung',
  },
  recruiterHourlyCost: {
    cs: 'Hodinový náklad náborového pracovníka',
    en: 'Recruiter hourly cost',
    de: 'Stundensatz der Recruiting-Kraft',
  },
  managerHours: {
    cs: 'Čas vedoucích na pohovory a výběr',
    en: 'Manager time on interviews and selection',
    de: 'Zeitaufwand der Führungskräfte für Auswahl',
  },
  managerHourlyCost: {
    cs: 'Hodinový náklad vedoucího',
    en: 'Manager hourly cost',
    de: 'Stundensatz der Führungskraft',
  },
  advertisingCost: {
    cs: 'Inzerce a sourcing',
    en: 'Advertising and sourcing',
    de: 'Anzeigen und Sourcing',
  },
  projectDelayCost: {
    cs: 'Náklad zpoždění zakázky nebo projektu',
    en: 'Cost of delayed order or project',
    de: 'Kosten für verzögerte Aufträge oder Projekte',
  },
  onboardingCost: {
    cs: 'Příprava nástupu a zaškolení',
    en: 'Onboarding and induction preparation',
    de: 'Vorbereitung von Eintritt und Einarbeitung',
  },
  otherCost: {
    cs: 'Další konkrétní náklad',
    en: 'Other specific cost',
    de: 'Weitere konkrete Kosten',
  },
}

export const FIELD_HELP: Partial<Record<FieldName, L<string>>> = {
  dailyContribution: {
    cs: 'Kolik podle vás pozice denně přináší — marže, výkon, ušetřený čas. Pokud to nedokážete vyčíslit, nechte nulu.',
    en: 'What you judge the role contributes per day — margin, output, time saved. If you cannot quantify it, leave zero.',
    de: 'Was die Stelle Ihrer Einschätzung nach täglich beiträgt — Marge, Leistung, eingesparte Zeit. Wenn nicht bezifferbar, null lassen.',
  },
  projectDelayCost: {
    cs: 'Jednorázový dopad, pokud neobsazení posunulo termín. Ne opakovaný denní náklad.',
    en: 'One-off impact if the vacancy pushed a deadline. Not a repeating daily cost.',
    de: 'Einmalige Auswirkung, wenn die Vakanz einen Termin verschoben hat. Kein wiederkehrender Tageskost.',
  },
}

export const UNIT_LABEL: Record<Unit, L<string>> = {
  days: { cs: 'dní', en: 'days', de: 'Tage' },
  perDay: { cs: 'Kč / den', en: 'CZK / day', de: 'CZK / Tag' },
  hours: { cs: 'hodin', en: 'hours', de: 'Stunden' },
  perHour: { cs: 'Kč / hod', en: 'CZK / hour', de: 'CZK / Stunde' },
  oneTime: { cs: 'Kč jednorázově', en: 'CZK one-off', de: 'CZK einmalig' },
}

export const GROUP_LABEL: Record<GroupName, L<string>> = {
  durationCost: {
    cs: 'Náklad doby neobsazení',
    en: 'Vacancy duration cost',
    de: 'Kosten der Vakanzdauer',
  },
  temporaryCoverage: {
    cs: 'Dočasné pokrytí',
    en: 'Temporary coverage',
    de: 'Befristete Abdeckung',
  },
  internalRecruitment: {
    cs: 'Interní náborová práce',
    en: 'Internal recruitment effort',
    de: 'Interner Rekrutierungsaufwand',
  },
  advertising: {
    cs: 'Inzerce a sourcing',
    en: 'Advertising and sourcing',
    de: 'Anzeigen und Sourcing',
  },
  managementTime: {
    cs: 'Čas vedení',
    en: 'Management time',
    de: 'Zeitaufwand der Führung',
  },
  operationalImpact: {
    cs: 'Zpoždění a provozní dopad',
    en: 'Delay and operational impact',
    de: 'Verzögerung und betriebliche Auswirkung',
  },
  otherCosts: {
    cs: 'Ostatní náklady',
    en: 'Other costs',
    de: 'Sonstige Kosten',
  },
}

/** The qualified result header required by §D. */
export const RESULT_HEADING: L<string> = {
  cs: 'Odhadované náklady podle zadaných předpokladů',
  en: 'Estimated cost based on entered assumptions',
  de: 'Geschätzte Kosten auf Grundlage der eingegebenen Annahmen',
}

export const TOTAL_LABEL: L<string> = {
  cs: 'Celkem odhadem',
  en: 'Total estimate',
  de: 'Gesamtschätzung',
}

export const EMPTY_STATE: L<string> = {
  cs: 'Zadejte alespoň jednu položku. Nezobrazujeme žádnou výchozí částku, protože ji neznáme.',
  en: 'Enter at least one line. We show no default amount, because we do not know it.',
  de: 'Geben Sie mindestens eine Position ein. Wir zeigen keinen Standardbetrag an, weil wir ihn nicht kennen.',
}

export const ERROR_TEXT: Record<ParseError, L<string>> = {
  notANumber: {
    cs: 'Zadejte prosím číslo.',
    en: 'Please enter a number.',
    de: 'Bitte geben Sie eine Zahl ein.',
  },
  negative: {
    cs: 'Zadejte kladné číslo nebo nulu.',
    en: 'Enter a positive number or zero.',
    de: 'Geben Sie eine positive Zahl oder null ein.',
  },
  tooLarge: {
    cs: 'Hodnota je mimo rozsah nástroje.',
    en: 'That value is outside the tool’s range.',
    de: 'Dieser Wert liegt außerhalb des Bereichs des Tools.',
  },
}

export const METHOD_HEADING: L<string> = {
  cs: 'Jak se výsledek počítá',
  en: 'How the result is calculated',
  de: 'Wie das Ergebnis berechnet wird',
}

export const METHOD_TEXT: L<string[]> = {
  cs: [
    'Každý řádek je součin nebo součet hodnot, které jste zadali. Celková částka je součtem řádků — nic dalšího se nepřičítá.',
    'Nepracujeme s žádným průměrným nákladem na neobsazenou pozici, průměrnou dobou obsazení ani odhadem ztráty produktivity. Takové údaje pro váš provoz nemáme.',
  ],
  en: [
    'Each line is a product or sum of the values you entered. The total is the sum of the lines — nothing else is added.',
    'No average cost of a vacancy, average time to hire or assumed productivity loss is used anywhere. We do not have those figures for your operation.',
  ],
  de: [
    'Jede Zeile ist ein Produkt oder eine Summe der von Ihnen eingegebenen Werte. Die Gesamtsumme ist die Summe der Zeilen — es kommt nichts hinzu.',
    'Es werden keine Durchschnittskosten einer Vakanz, keine durchschnittliche Besetzungsdauer und keine angenommenen Produktivitätsverluste verwendet. Diese Zahlen liegen uns für Ihren Betrieb nicht vor.',
  ],
}

/** §F — vacancy cost is not a recruitment fee. */
export const FEE_HEADING: L<string> = {
  cs: 'Náklad neobsazení není totéž co cena náboru',
  en: 'Vacancy cost is not the same as a recruitment fee',
  de: 'Vakanzkosten sind nicht dasselbe wie ein Vermittlungshonorar',
}

export const FEE_TEXT: L<string[]> = {
  cs: [
    'Cena náboru je jednorázová položka, kterou znáte předem. Náklad neobsazení běží každý den, dokud je místo prázdné.',
    'Z toho plyne, že dražší varianta obsazení může vyjít celkově levněji, pokud zkrátí dobu neobsazení natolik, že uspořený náklad převáží rozdíl v ceně. Jestli to platí, rozhodují vaše čísla výše — ne naše tvrzení. Při nule v poli denního výpadku tento efekt z výpočtu nevyplývá vůbec.',
  ],
  en: [
    'A recruitment fee is a one-off amount you know in advance. Vacancy cost accrues every day the seat is empty.',
    'So a more expensive way of filling the role can still work out cheaper overall — if it shortens the vacancy enough that the saved cost outweighs the difference in fee. Whether it does is decided by your numbers above, not by a claim from us. With zero in the daily-contribution field, this effect does not follow from the calculation at all.',
  ],
  de: [
    'Ein Vermittlungshonorar ist ein einmaliger Betrag, den Sie im Voraus kennen. Vakanzkosten entstehen an jedem Tag, an dem die Stelle unbesetzt ist.',
    'Eine teurere Besetzungsvariante kann daher insgesamt günstiger sein — wenn sie die Vakanz so weit verkürzt, dass die eingesparten Kosten den Honorarunterschied übersteigen. Ob das zutrifft, entscheiden Ihre Zahlen oben, nicht eine Behauptung von uns. Bei null im Feld für den Tagesbeitrag ergibt sich dieser Effekt aus der Berechnung überhaupt nicht.',
  ],
}

export const CTA_TEXT: L<string> = {
  cs: 'Chcete probrat obsazení této pozice?',
  en: 'Discuss filling this position',
  de: 'Besetzung dieser Position besprechen',
}

export const RESET_LABEL: L<string> = {
  cs: 'Vynulovat',
  en: 'Reset',
  de: 'Zurücksetzen',
}

export const PRIVACY_NOTE: L<string> = {
  cs: 'Výpočet probíhá výhradně ve vašem prohlížeči. Zadané hodnoty se nikam neodesílají, neukládají se a neobjeví se v adrese stránky.',
  en: 'The calculation runs entirely in your browser. The values you enter are not sent anywhere, not stored, and never appear in the page address.',
  de: 'Die Berechnung erfolgt ausschließlich in Ihrem Browser. Die eingegebenen Werte werden nicht übertragen, nicht gespeichert und erscheinen nicht in der Adresszeile.',
}

export const RESULT_REGION_LABEL: L<string> = {
  cs: 'Výsledek kalkulace',
  en: 'Calculation result',
  de: 'Berechnungsergebnis',
}
