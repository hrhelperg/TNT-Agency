import type { Lang } from './react';

// Typed cs/en/de registry for the homepage payroll calculator chrome.
//
// Numeric rules, rates, formulas and source IDs are NOT here — they live in the
// engine (lib/payroll). This registry only translates visible chrome, using the
// approved employment/payroll terminology. Official Czech institution names
// (ČSSZ, Finanční správa ČR, the employee's health insurer) stay in Czech; the
// English/German context lines make the Czech-Republic scope explicit.

export interface CalcCopy {
  inputLabel: string;
  hint: string;
  errEmpty: string;
  errNumber: string;
  errPositive: string;
  errLarge: string;
  context: string;
  ctaDetail: string;
  rulesYear: string; // "... {y}"
  verified: string; // "... {d}"
  methodology: string;
  disclaimer: string;
  empty: string;
  net: string;
  netNote: string;
  gross: string;
  grossNote: string;
  cost: string;
  costNote: string;
  employeeTitle: string;
  employerTitle: string;
  empSocial: string;
  empHealth: string;
  tax: string;
  empTotal: string;
  erSocial: string;
  erHealth: string;
  erTotal: string;
  fromEmployee: string;
  fromEmployer: string;
  toState: string;
  routesSummary: string;
  payerEmployee: string;
  payerEmployer: string;
  rateBase: string; // "... {r} ... {b}"
  recipient: string;
  verifiedSource: string;
  purposeSocial: string;
  purposeHealth: string;
  purposeTax: string;
}

export const CALC_COPY: Record<Lang, CalcCopy> = {
  cs: {
    inputLabel: 'Hrubá měsíční mzda',
    hint: 'Zadejte hrubou měsíční mzdu. Výpočet se přepočítá okamžitě.',
    errEmpty: 'Zadejte hrubou měsíční mzdu.',
    errNumber: 'Zadejte platné číslo v korunách.',
    errPositive: 'Mzda musí být větší než 0 Kč.',
    errLarge: 'Zadejte reálnou měsíční mzdu.',
    context: 'Výpočet mzdových nákladů podle pravidel platných v České republice.',
    ctaDetail: 'Zobrazit podrobný výpočet',
    rulesYear: 'Pravidla pro rok {y}',
    verified: 'ověřeno {d}',
    methodology: 'metodika a zdroje',
    disclaimer:
      'Orientační informativní výpočet. Skutečná částka se může lišit podle individuální daňové situace (slevy, děti, více zaměstnavatelů). Nejde o daňové ani právní poradenství.',
    empty: 'Zadejte hrubou měsíční mzdu pro výpočet.',
    net: 'Čistá mzda',
    netNote: 'měsíčně, kterou obdrží zaměstnanec',
    gross: 'Hrubá mzda',
    grossNote: 'sjednaná měsíční mzda',
    cost: 'Celkové náklady zaměstnavatele',
    costNote: 'hrubá mzda + odvody zaměstnavatele',
    employeeTitle: 'Odvody zaměstnance',
    employerTitle: 'Odvody zaměstnavatele',
    empSocial: 'Sociální pojištění zaměstnance',
    empHealth: 'Zdravotní pojištění zaměstnance',
    tax: 'Záloha na daň z příjmů',
    empTotal: 'Celkové odvody zaměstnance',
    erSocial: 'Sociální pojištění zaměstnavatele',
    erHealth: 'Zdravotní pojištění zaměstnavatele',
    erTotal: 'Celkové odvody zaměstnavatele',
    fromEmployee: 'Sráženo z hrubé mzdy zaměstnance',
    fromEmployer: 'Platí navíc zaměstnavatel',
    toState: 'Celkem daně a povinné pojistné',
    routesSummary: 'Kam odvody směřují?',
    payerEmployee: 'Platí zaměstnanec',
    payerEmployer: 'Platí zaměstnavatel',
    rateBase: 'Sazba {r} ze základu {b}',
    recipient: 'Příjemce',
    verifiedSource: 'Ověřený zdroj',
    purposeSocial: 'Důchodové a nemocenské pojištění a státní politika zaměstnanosti.',
    purposeHealth: 'Veřejné zdravotní pojištění – úhrada zdravotní péče.',
    purposeTax: 'Daň z příjmů fyzických osob odváděná do státního rozpočtu.',
  },
  en: {
    inputLabel: 'Gross monthly salary',
    hint: 'Enter the gross monthly salary — the result updates instantly.',
    errEmpty: 'Enter the gross monthly salary.',
    errNumber: 'Enter a valid amount in CZK.',
    errPositive: 'The salary must be greater than 0 CZK.',
    errLarge: 'Enter a realistic monthly salary.',
    context: 'Payroll cost calculated under the rules of the Czech Republic.',
    ctaDetail: 'See the detailed calculation',
    rulesYear: 'Rules for {y}',
    verified: 'verified {d}',
    methodology: 'methodology & sources',
    disclaimer:
      'Informational estimate. The actual amount may differ depending on individual tax circumstances (credits, children, multiple employers). This is not tax or legal advice.',
    empty: 'Enter a gross monthly salary to calculate.',
    net: 'Net salary',
    netNote: 'the employee’s monthly take-home pay',
    gross: 'Gross salary',
    grossNote: 'agreed monthly salary',
    cost: 'Total employer cost',
    costNote: 'gross salary + employer contributions',
    employeeTitle: 'Employee deductions',
    employerTitle: 'Employer contributions',
    empSocial: 'Employee social insurance',
    empHealth: 'Employee health insurance',
    tax: 'Income tax advance',
    empTotal: 'Total employee deductions',
    erSocial: 'Employer social insurance',
    erHealth: 'Employer health insurance',
    erTotal: 'Total employer contributions',
    fromEmployee: 'Withheld from the employee’s gross pay',
    fromEmployer: 'Paid additionally by the employer',
    toState: 'Total taxes and mandatory insurance',
    routesSummary: 'Where do the contributions go?',
    payerEmployee: 'Paid by employee',
    payerEmployer: 'Paid by employer',
    rateBase: 'Rate {r} on a base of {b}',
    recipient: 'Recipient',
    verifiedSource: 'Verified source',
    purposeSocial: 'Pension and sickness insurance and state employment policy.',
    purposeHealth: 'Public health insurance – funding of health care.',
    purposeTax: 'Personal income tax paid to the state budget.',
  },
  de: {
    inputLabel: 'Bruttomonatslohn',
    hint: 'Geben Sie den Bruttomonatslohn ein – das Ergebnis wird sofort aktualisiert.',
    errEmpty: 'Geben Sie den Bruttomonatslohn ein.',
    errNumber: 'Geben Sie einen gültigen Betrag in CZK ein.',
    errPositive: 'Der Lohn muss größer als 0 CZK sein.',
    errLarge: 'Geben Sie einen realistischen Monatslohn ein.',
    context: 'Lohnkostenberechnung nach den Regeln der Tschechischen Republik.',
    ctaDetail: 'Detaillierte Berechnung anzeigen',
    rulesYear: 'Regeln für {y}',
    verified: 'geprüft {d}',
    methodology: 'Methodik & Quellen',
    disclaimer:
      'Informative Schätzung. Der tatsächliche Betrag kann je nach individueller steuerlicher Situation (Freibeträge, Kinder, mehrere Arbeitgeber) abweichen. Dies ist keine Steuer- oder Rechtsberatung.',
    empty: 'Geben Sie einen Bruttomonatslohn ein, um zu rechnen.',
    net: 'Nettolohn',
    netNote: 'monatlicher Nettobezug des Arbeitnehmers',
    gross: 'Bruttolohn',
    grossNote: 'vereinbarter Monatslohn',
    cost: 'Gesamtkosten des Arbeitgebers',
    costNote: 'Bruttolohn + Arbeitgeberbeiträge',
    employeeTitle: 'Arbeitnehmerabzüge',
    employerTitle: 'Arbeitgeberbeiträge',
    empSocial: 'Sozialversicherung (Arbeitnehmer)',
    empHealth: 'Krankenversicherung (Arbeitnehmer)',
    tax: 'Lohnsteuer-Vorauszahlung',
    empTotal: 'Arbeitnehmerabzüge gesamt',
    erSocial: 'Sozialversicherung (Arbeitgeber)',
    erHealth: 'Krankenversicherung (Arbeitgeber)',
    erTotal: 'Arbeitgeberbeiträge gesamt',
    fromEmployee: 'Vom Bruttolohn des Arbeitnehmers einbehalten',
    fromEmployer: 'Zusätzlich vom Arbeitgeber gezahlt',
    toState: 'Steuern und Pflichtversicherung gesamt',
    routesSummary: 'Wohin fließen die Beiträge?',
    payerEmployee: 'Zahlt Arbeitnehmer',
    payerEmployer: 'Zahlt Arbeitgeber',
    rateBase: 'Satz {r} auf Basis {b}',
    recipient: 'Empfänger',
    verifiedSource: 'Geprüfte Quelle',
    purposeSocial: 'Renten- und Krankenversicherung sowie staatliche Beschäftigungspolitik.',
    purposeHealth: 'Gesetzliche Krankenversicherung – Finanzierung der Gesundheitsversorgung.',
    purposeTax: 'Einkommensteuer natürlicher Personen an den Staatshaushalt.',
  },
};

/** Map an engine route key to its localized label + purpose. */
export function routeLabel(copy: CalcCopy, key: string): string {
  switch (key) {
    case 'employee-social':
      return copy.empSocial;
    case 'employee-health':
      return copy.empHealth;
    case 'employee-tax':
      return copy.tax;
    case 'employer-social':
      return copy.erSocial;
    case 'employer-health':
      return copy.erHealth;
    default:
      return key;
  }
}

export function routePurpose(copy: CalcCopy, key: string): string {
  if (key.includes('tax')) return copy.purposeTax;
  if (key.includes('health')) return copy.purposeHealth;
  return copy.purposeSocial;
}
