import type { Lang } from './react';

// Typed cs/en/de registry for the DEDICATED payroll calculator's interactive
// chrome (headings, mode selector, field labels, results, actions, disclaimer,
// CTA). Numeric rules/rates/formulas/source IDs stay in lib/payroll; the
// engine's own Czech line labels (line.labelCs / row.labelCs) and the long-form
// legal editorial (FAQ + explanatory sections) are handled by Strategy-2 (Czech
// preserved) — only the tool chrome is translated here, using the approved
// employment/payroll terminology. German copy states the Czech-Republic scope.

export interface DCalcCopy {
  // hero
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  h1: string;
  heroSub: string;
  metaEstimate: string;
  metaRules: string;
  metaVerified: string; // "... {d}"
  // methodology
  methodology: string;
  // mode selector
  legMode: string;
  modeAgency: string;
  modeDirect: string;
  modeComparison: string;
  // section 2 period
  legPeriod: string;
  month: string;
  hoursFund: string;
  hoursFundHint: string;
  // section 3 wage
  legWage: string;
  wageHourly: string;
  wageMonthly: string;
  avgEarnings: string;
  avgEarningsHint: string;
  useEstimate: string;
  // section 4 worked time
  legWorked: string;
  regularHours: string;
  overtime: string;
  nightHours: string;
  saturday: string;
  sunday: string;
  holiday: string;
  difficult: string;
  workedNote: string;
  // section 5 premiums
  legPremiums: string;
  pOvertime: string;
  pNight: string;
  pSat: string;
  pSun: string;
  pHoliday: string;
  pDifficult: string;
  pDifficultHint: string;
  otLeave: string;
  holLeave: string;
  // section 6 adjustments
  legAdjust: string;
  perfBonus: string;
  attBonus: string;
  prodBonus: string;
  persBonus: string;
  accDed: string;
  transDed: string;
  adjustNote: string;
  // section 7 tax profile
  legTax: string;
  signed: string;
  basicCredit: string;
  disability: string;
  disNone: string;
  disFirst: string;
  disThird: string;
  residency: string;
  resResident: string;
  resNon: string;
  childrenCount: string;
  ztpp: string;
  childZtpp: string; // "{n}. ..."
  nonResidentNote: string;
  // section 8 agency
  legAgency: string;
  feeModel: string;
  feePercentOpt: string;
  feePerHourOpt: string;
  feeFixedOpt: string;
  feeCombinedOpt: string;
  feePct: string;
  feeHour: string;
  feeFixed: string;
  vat: string;
  agAcc: string;
  agTrans: string;
  agRec: string;
  agOnb: string;
  vatDeduct: string;
  // section 9 direct
  legDirect: string;
  dRec: string;
  dOnb: string;
  dHr: string;
  dPay: string;
  dAcc: string;
  dTrans: string;
  dMed: string;
  dTrain: string;
  dTurn: string;
  dTurnHint: string;
  // section 10 workers
  legWorkers: string;
  workersCustom: string;
  // results
  resultsTitle: string;
  cGross: string;
  cNet: string;
  cEmpDeductions: string;
  cErStatutory: string;
  cAgencyFee: string;
  cTotalEconomic: string;
  cPerHour: string;
  cVsDirect: string;
  // actions
  aReset: string;
  aPrint: string;
  aCopySummary: string;
  aCopyLink: string;
  aExportCsv: string;
  // subheads + tables
  subNet: string;
  subEmployer: string;
  subAgencyInvoice: string;
  subComparison: string;
  subScenario: string; // "... {n} ..."
  thItem: string;
  thAgency: string;
  thDirect: string;
  scWorker1: string;
  scWorkersMonth: string; // "{n} ..."
  scWorkersYear: string; // "{n} ..."
  scenarioNote: string;
  invalid: string;
  disclaimer: string; // includes {d}
  // line detail chrome
  lFormula: string;
  lRateBase: string;
  lBase: string;
  lRounding: string;
  lSource: string;
  originStatutory: string;
  originUser: string;
  originEstimated: string;
  originDerived: string;
  // CTA
  ctaEyebrow: string;
  ctaHeading: string;
  ctaBody: string;
  ctaRequest: string;
  ctaConsult: string;
  ctaNote: string;
}

const cs: DCalcCopy = {
  breadcrumbHome: 'Domů',
  breadcrumbCurrent: 'Kalkulačka mezd 2026',
  eyebrow: 'Mzdy a náklady · Pravidla ČR 2026',
  h1: 'Kalkulačka mzdy agenturního a kmenového zaměstnance 2026',
  heroSub:
    'Spočítejte hrubou a čistou mzdu, přesčasy a příplatky, odvody zaměstnance, náklady zaměstnavatele, agenturní marži a celkovou cenu pracovníka – a porovnejte agenturního zaměstnance s kmenovým. Orientační výpočet, pravidla ČR 2026.',
  metaEstimate: 'Orientační výpočet',
  metaRules: 'Pravidla ČR 2026',
  metaVerified: 'Naposledy ověřeno {d}',
  methodology:
    'Kalkulačka počítá výhradně ve vašem prohlížeči (client-side). Žádné mzdové údaje se neodesílají na server ani do analytiky. Výpočet je orientační a nenahrazuje mzdovou účtárnu ani daňové poradenství. Sazby vycházejí z oficiálních zdrojů pro rok 2026 (viz sekce Zdroje).',
  legMode: '1 · Režim výpočtu',
  modeAgency: 'Agenturní zaměstnanec',
  modeDirect: 'Kmenový zaměstnanec',
  modeComparison: 'Porovnání obou variant',
  legPeriod: '2 · Období a fond hodin',
  month: 'Měsíc',
  hoursFund: 'Měsíční fond hodin',
  hoursFundHint: 'Výchozí scénář 160 h. Skutečný fond závisí na měsíci, svátcích a rozvrhu směn.',
  legWage: '3 · Mzda',
  wageHourly: 'Hodinová mzda',
  wageMonthly: 'Měsíční mzda',
  avgEarnings: 'Průměrný výdělek pro příplatky',
  avgEarningsHint: 'Zákonná veličina z předchozího čtvrtletí – nemusí se rovnat smluvní mzdě.',
  useEstimate: 'Použít základní hodinovou mzdu jako orientační průměrný výdělek (odhad)',
  legWorked: '4 · Odpracovaný čas',
  regularHours: 'Řádné hodiny',
  overtime: 'Přesčas',
  nightHours: 'Noční hodiny',
  saturday: 'Sobota',
  sunday: 'Neděle',
  holiday: 'Svátek',
  difficult: 'Ztížené prostředí',
  workedNote:
    'Kategorie se mohou překrývat – jedna hodina může být zároveň přesčas, noční i víkendová. Zadávejte je samostatně; nesmí ale překročit celkový počet odpracovaných hodin.',
  legPremiums: '5 · Příplatky',
  pOvertime: 'Přesčas (% prům. výdělku)',
  pNight: 'Noc (%)',
  pSat: 'Sobota (%)',
  pSun: 'Neděle (%)',
  pHoliday: 'Svátek (%)',
  pDifficult: 'Ztížené prostředí',
  pDifficultHint: 'Zákonné minimum 13,44 Kč/h (10 % minimální mzdy).',
  otLeave: 'Přesčas řešen náhradním volnem (bez příplatku)',
  holLeave: 'Svátek řešen náhradním volnem (bez příplatku 100 %)',
  legAdjust: '6 · Odměny a srážky',
  perfBonus: 'Výkonnostní bonus',
  attBonus: 'Docházkový bonus',
  prodBonus: 'Výrobní bonus',
  persBonus: 'Osobní ohodnocení',
  accDed: 'Srážka za ubytování',
  transDed: 'Srážka za dopravu',
  adjustNote: 'Bonusy jsou zdanitelné a vstupují do hrubé mzdy. Srážky se odečítají z čisté mzdy.',
  legTax: '7 · Daňový profil',
  signed: 'Podepsané prohlášení poplatníka',
  basicCredit: 'Uplatnit základní slevu na poplatníka (2 570 Kč/měs)',
  disability: 'Invalidita',
  disNone: 'Žádná',
  disFirst: '1. / 2. stupeň (210 Kč)',
  disThird: '3. stupeň (420 Kč)',
  residency: 'Daňové rezidentství',
  resResident: 'Rezident ČR',
  resNon: 'Nerezident',
  childrenCount: 'Počet dětí',
  ztpp: 'Držitel ZTP/P (1 345 Kč/měs)',
  childZtpp: '{n}. dítě – ZTP/P (dvojnásobek)',
  nonResidentNote:
    'Nerezident uplatní měsíčně jen základní slevu; ostatní slevy a zvýhodnění jen v ročním přiznání za zákonných podmínek.',
  legAgency: '8 · Náklady agentury',
  feeModel: 'Model poplatku',
  feePercentOpt: '% z mzdových nákladů',
  feePerHourOpt: 'Kč za odpracovanou hodinu',
  feeFixedOpt: 'Fixní měsíční poplatek',
  feeCombinedOpt: 'Kombinovaný',
  feePct: 'Marže (%)',
  feeHour: 'Poplatek (Kč/h)',
  feeFixed: 'Fixní poplatek',
  vat: 'Sazba DPH',
  agAcc: 'Ubytování',
  agTrans: 'Doprava',
  agRec: 'Nábor',
  agOnb: 'Jednorázový nástup',
  vatDeduct: 'Firma je plátce DPH a může DPH odečíst',
  legDirect: '9 · Náklady kmenového zaměstnance',
  dRec: 'Nábor',
  dOnb: 'Onboarding',
  dHr: 'HR administrativa (měs)',
  dPay: 'Mzdová agenda (měs)',
  dAcc: 'Ubytování (měs)',
  dTrans: 'Doprava (měs)',
  dMed: 'Lékařská prohlídka',
  dTrain: 'Školení',
  dTurn: 'Fluktuace / náhrada (volitelné)',
  dTurnHint: 'Kalkulačka nevymýšlí žádnou míru fluktuace.',
  legWorkers: '10 · Počet pracovníků',
  workersCustom: 'Vlastní počet',
  resultsTitle: 'Souhrn výsledků',
  cGross: 'Hrubá mzda',
  cNet: 'Čistá mzda',
  cEmpDeductions: 'Odvody zaměstnance',
  cErStatutory: 'Zákonné náklady zaměstnavatele',
  cAgencyFee: 'Agenturní poplatek',
  cTotalEconomic: 'Celkový měsíční náklad (ekonomický)',
  cPerHour: 'Náklad / odpracovaná hodina',
  cVsDirect: 'Rozdíl oproti kmenovému',
  aReset: 'Reset',
  aPrint: 'Tisk / PDF',
  aCopySummary: 'Kopírovat souhrn',
  aCopyLink: 'Kopírovat odkaz',
  aExportCsv: 'Export CSV',
  subNet: 'Čistá mzda – rozpad (klikněte pro vzorec a zdroj)',
  subEmployer: 'Náklady zaměstnavatele',
  subAgencyInvoice: 'Agenturní faktura',
  subComparison: 'Agentura vs. kmenový zaměstnanec',
  subScenario: 'Scénář pro {n} pracovníků',
  thItem: 'Položka',
  thAgency: 'Agenturní',
  thDirect: 'Kmenový',
  scWorker1: '1 pracovník / měsíc',
  scWorkersMonth: '{n} pracovníků / měsíc',
  scWorkersYear: '{n} pracovníků / rok (scénář)',
  scenarioNote: 'Roční částka je scénář (12× modelovaný měsíc), nikoli predikce.',
  invalid: 'Opravte zvýrazněné vstupy – výpočet nelze dokončit.',
  disclaimer:
    'Orientační výpočet · Pravidla ČR 2026 · Naposledy ověřeno {d}. Skutečná mzda se může lišit podle individuálních okolností, kolektivních a vnitřních mzdových předpisů, skutečného průměrného výdělku, srážek, daňového rezidentství, benefitů, absencí a zaokrouhlení. Doporučujeme ověřit finální výpočet u účetní nebo mzdové specialistky. Kalkulačka nenahrazuje mzdovou účtárnu ani právní poradenství.',
  lFormula: 'Vzorec:',
  lRateBase: 'Sazba / základ:',
  lBase: 'Základ:',
  lRounding: 'Zaokrouhlení:',
  lSource: 'Zdroj:',
  originStatutory: 'zákonné',
  originUser: 'zadané',
  originEstimated: 'odhad',
  originDerived: 'odvozené',
  ctaEyebrow: 'Nábor a nákladová kalkulace',
  ctaHeading: 'Potřebujete spočítat skutečnou cenu pracovníků pro váš provoz?',
  ctaBody:
    'Pomůžeme vám nastavit nábor, směnový model a rozpočet tak, aby mzdy, odvody a dostupnost kandidátů dávaly ekonomický smysl. Napište nám počet pracovníků, lokalitu, obor, směnový model a požadovaný termín nástupu.',
  ctaRequest: 'Poptat pracovníky',
  ctaConsult: 'Domluvit konzultaci',
  ctaNote:
    'Do poptávky nevyplňujte konkrétní mzdové údaje z kalkulačky – ty zůstávají jen ve vašem prohlížeči.',
};

const en: DCalcCopy = {
  breadcrumbHome: 'Home',
  breadcrumbCurrent: 'Payroll calculator 2026',
  eyebrow: 'Salaries & costs · Czech Republic rules 2026',
  h1: 'Payroll calculator for agency and in-house employees 2026',
  heroSub:
    'Calculate gross and net salary, overtime and premiums, employee deductions, employer costs, the agency margin and the total cost of a worker — and compare an agency worker with an in-house employee. Informational estimate, Czech Republic rules 2026.',
  metaEstimate: 'Informational estimate',
  metaRules: 'Czech Republic rules 2026',
  metaVerified: 'Last verified {d}',
  methodology:
    'The calculator runs entirely in your browser (client-side). No salary data is sent to a server or to analytics. It is an informational estimate and does not replace a payroll office or tax advice. Rates come from official 2026 sources for the Czech Republic (see Sources).',
  legMode: '1 · Calculation mode',
  modeAgency: 'Agency employee',
  modeDirect: 'In-house employee',
  modeComparison: 'Compare both options',
  legPeriod: '2 · Period and hours fund',
  month: 'Month',
  hoursFund: 'Monthly hours fund',
  hoursFundHint: 'Default scenario 160 h. The real fund depends on the month, public holidays and shift schedule.',
  legWage: '3 · Wage',
  wageHourly: 'Hourly wage',
  wageMonthly: 'Monthly wage',
  avgEarnings: 'Average earnings for premiums',
  avgEarningsHint: 'A statutory figure from the previous quarter — it need not equal the contractual wage.',
  useEstimate: 'Use the base hourly wage as an approximate average earnings (estimate)',
  legWorked: '4 · Time worked',
  regularHours: 'Regular hours',
  overtime: 'Overtime',
  nightHours: 'Night hours',
  saturday: 'Saturday',
  sunday: 'Sunday',
  holiday: 'Public holiday',
  difficult: 'Difficult environment',
  workedNote:
    'Categories may overlap — one hour can be overtime, night and weekend at once. Enter them separately; together they must not exceed the total hours worked.',
  legPremiums: '5 · Premiums',
  pOvertime: 'Overtime (% of avg. earnings)',
  pNight: 'Night (%)',
  pSat: 'Saturday (%)',
  pSun: 'Sunday (%)',
  pHoliday: 'Holiday (%)',
  pDifficult: 'Difficult environment',
  pDifficultHint: 'Statutory minimum 13.44 CZK/h (10% of the minimum wage).',
  otLeave: 'Overtime settled by compensatory leave (no premium)',
  holLeave: 'Holiday settled by compensatory leave (no 100% premium)',
  legAdjust: '6 · Bonuses and deductions',
  perfBonus: 'Performance bonus',
  attBonus: 'Attendance bonus',
  prodBonus: 'Production bonus',
  persBonus: 'Personal bonus',
  accDed: 'Accommodation deduction',
  transDed: 'Transport deduction',
  adjustNote: 'Bonuses are taxable and enter the gross wage. Deductions are taken from the net salary.',
  legTax: '7 · Tax profile',
  signed: 'Signed taxpayer declaration',
  basicCredit: 'Apply the basic taxpayer credit (2,570 CZK/month)',
  disability: 'Disability',
  disNone: 'None',
  disFirst: '1st / 2nd degree (210 CZK)',
  disThird: '3rd degree (420 CZK)',
  residency: 'Tax residency',
  resResident: 'Czech tax resident',
  resNon: 'Non-resident',
  childrenCount: 'Number of children',
  ztpp: 'ZTP/P holder (1,345 CZK/month)',
  childZtpp: 'Child {n} – ZTP/P (double)',
  nonResidentNote:
    'A non-resident may claim only the basic monthly credit; other credits apply only in the annual return under statutory conditions.',
  legAgency: '8 · Agency costs',
  feeModel: 'Fee model',
  feePercentOpt: '% of payroll cost',
  feePerHourOpt: 'CZK per hour worked',
  feeFixedOpt: 'Fixed monthly fee',
  feeCombinedOpt: 'Combined',
  feePct: 'Margin (%)',
  feeHour: 'Fee (CZK/h)',
  feeFixed: 'Fixed fee',
  vat: 'VAT rate',
  agAcc: 'Accommodation',
  agTrans: 'Transport',
  agRec: 'Recruitment',
  agOnb: 'One-time onboarding',
  vatDeduct: 'The company is VAT-registered and can deduct VAT',
  legDirect: '9 · In-house employee costs',
  dRec: 'Recruitment',
  dOnb: 'Onboarding',
  dHr: 'HR administration (monthly)',
  dPay: 'Payroll administration (monthly)',
  dAcc: 'Accommodation (monthly)',
  dTrans: 'Transport (monthly)',
  dMed: 'Medical examination',
  dTrain: 'Training',
  dTurn: 'Turnover / replacement (optional)',
  dTurnHint: 'The calculator invents no turnover rate.',
  legWorkers: '10 · Number of workers',
  workersCustom: 'Custom number',
  resultsTitle: 'Results summary',
  cGross: 'Gross salary',
  cNet: 'Net salary',
  cEmpDeductions: 'Employee deductions',
  cErStatutory: 'Statutory employer cost',
  cAgencyFee: 'Agency fee',
  cTotalEconomic: 'Total monthly cost (economic)',
  cPerHour: 'Cost / hour worked',
  cVsDirect: 'Difference vs. in-house',
  aReset: 'Reset',
  aPrint: 'Print / PDF',
  aCopySummary: 'Copy summary',
  aCopyLink: 'Copy link',
  aExportCsv: 'Export CSV',
  subNet: 'Net salary – breakdown (click for formula and source)',
  subEmployer: 'Employer costs',
  subAgencyInvoice: 'Agency invoice',
  subComparison: 'Agency vs. in-house employee',
  subScenario: 'Scenario for {n} workers',
  thItem: 'Item',
  thAgency: 'Agency',
  thDirect: 'In-house',
  scWorker1: '1 worker / month',
  scWorkersMonth: '{n} workers / month',
  scWorkersYear: '{n} workers / year (scenario)',
  scenarioNote: 'The annual figure is a scenario (12× the modelled month), not a forecast.',
  invalid: 'Correct the highlighted inputs — the calculation cannot be completed.',
  disclaimer:
    'Informational estimate · Czech Republic rules 2026 · Last verified {d}. The actual salary may differ depending on individual circumstances, collective and internal wage rules, actual average earnings, deductions, tax residency, benefits, absences and rounding. We recommend verifying the final calculation with an accountant or payroll specialist. The calculator does not replace a payroll office or legal advice.',
  lFormula: 'Formula:',
  lRateBase: 'Rate / base:',
  lBase: 'Base:',
  lRounding: 'Rounding:',
  lSource: 'Source:',
  originStatutory: 'statutory',
  originUser: 'entered',
  originEstimated: 'estimate',
  originDerived: 'derived',
  ctaEyebrow: 'Recruitment and cost planning',
  ctaHeading: 'Need to calculate the true cost of workers for your operation?',
  ctaBody:
    'We help you set up recruitment, the shift model and the budget so that wages, contributions and candidate availability make economic sense. Tell us the number of workers, location, industry, shift model and required start date.',
  ctaRequest: 'Request workers',
  ctaConsult: 'Arrange a consultation',
  ctaNote:
    'Do not put specific salary figures from the calculator into the request — they stay only in your browser.',
};

const de: DCalcCopy = {
  breadcrumbHome: 'Startseite',
  breadcrumbCurrent: 'Lohnrechner 2026',
  eyebrow: 'Löhne & Kosten · Regeln Tschechien 2026',
  h1: 'Lohnrechner für Zeitarbeit und Stammbeschäftigung 2026',
  heroSub:
    'Berechnen Sie Brutto- und Nettolohn, Überstunden und Zuschläge, Arbeitnehmerabzüge, Arbeitgeberkosten, die Agenturmarge und die Gesamtkosten eines Mitarbeiters – und vergleichen Sie Zeitarbeit mit Stammbeschäftigung. Informative Schätzung, Regeln der Tschechischen Republik 2026.',
  metaEstimate: 'Informative Schätzung',
  metaRules: 'Regeln Tschechien 2026',
  metaVerified: 'Zuletzt geprüft {d}',
  methodology:
    'Der Rechner läuft vollständig in Ihrem Browser (client-seitig). Es werden keine Lohndaten an einen Server oder an Analytics gesendet. Es handelt sich um eine informative Schätzung und ersetzt weder eine Lohnbuchhaltung noch eine Steuerberatung. Die Sätze stammen aus offiziellen Quellen für 2026 der Tschechischen Republik (siehe Quellen).',
  legMode: '1 · Berechnungsmodus',
  modeAgency: 'Zeitarbeitnehmer',
  modeDirect: 'Stammbeschäftigter',
  modeComparison: 'Beide Varianten vergleichen',
  legPeriod: '2 · Zeitraum und Stundenkontingent',
  month: 'Monat',
  hoursFund: 'Monatliches Stundenkontingent',
  hoursFundHint: 'Standardszenario 160 h. Das tatsächliche Kontingent hängt von Monat, Feiertagen und Schichtplan ab.',
  legWage: '3 · Lohn',
  wageHourly: 'Stundenlohn',
  wageMonthly: 'Monatslohn',
  avgEarnings: 'Durchschnittsverdienst für Zuschläge',
  avgEarningsHint: 'Eine gesetzliche Größe aus dem Vorquartal – muss nicht dem vertraglichen Lohn entsprechen.',
  useEstimate: 'Den Basis-Stundenlohn als ungefähren Durchschnittsverdienst verwenden (Schätzung)',
  legWorked: '4 · Gearbeitete Zeit',
  regularHours: 'Reguläre Stunden',
  overtime: 'Überstunden',
  nightHours: 'Nachtstunden',
  saturday: 'Samstag',
  sunday: 'Sonntag',
  holiday: 'Feiertag',
  difficult: 'Erschwerte Bedingungen',
  workedNote:
    'Kategorien können sich überschneiden – eine Stunde kann zugleich Überstunde, Nacht und Wochenende sein. Geben Sie sie einzeln ein; zusammen dürfen sie die Gesamtstunden nicht überschreiten.',
  legPremiums: '5 · Zuschläge',
  pOvertime: 'Überstunden (% des Durchschnittsverdienstes)',
  pNight: 'Nacht (%)',
  pSat: 'Samstag (%)',
  pSun: 'Sonntag (%)',
  pHoliday: 'Feiertag (%)',
  pDifficult: 'Erschwerte Bedingungen',
  pDifficultHint: 'Gesetzliches Minimum 13,44 CZK/h (10 % des Mindestlohns).',
  otLeave: 'Überstunden durch Freizeitausgleich abgegolten (ohne Zuschlag)',
  holLeave: 'Feiertag durch Freizeitausgleich abgegolten (ohne 100 %-Zuschlag)',
  legAdjust: '6 · Prämien und Abzüge',
  perfBonus: 'Leistungsprämie',
  attBonus: 'Anwesenheitsprämie',
  prodBonus: 'Produktionsprämie',
  persBonus: 'Persönliche Zulage',
  accDed: 'Abzug für Unterkunft',
  transDed: 'Abzug für Fahrt',
  adjustNote: 'Prämien sind steuerpflichtig und fließen in den Bruttolohn ein. Abzüge werden vom Nettolohn abgezogen.',
  legTax: '7 · Steuerprofil',
  signed: 'Unterzeichnete Steuererklärung des Arbeitnehmers',
  basicCredit: 'Grundfreibetrag des Steuerpflichtigen anwenden (2 570 CZK/Monat)',
  disability: 'Behinderung',
  disNone: 'Keine',
  disFirst: '1. / 2. Grad (210 CZK)',
  disThird: '3. Grad (420 CZK)',
  residency: 'Steuerliche Ansässigkeit',
  resResident: 'In Tschechien ansässig',
  resNon: 'Nicht ansässig',
  childrenCount: 'Anzahl der Kinder',
  ztpp: 'ZTP/P-Inhaber (1 345 CZK/Monat)',
  childZtpp: '{n}. Kind – ZTP/P (doppelt)',
  nonResidentNote:
    'Ein Nichtansässiger kann monatlich nur den Grundfreibetrag geltend machen; weitere Freibeträge nur in der Jahreserklärung unter gesetzlichen Bedingungen.',
  legAgency: '8 · Agenturkosten',
  feeModel: 'Gebührenmodell',
  feePercentOpt: '% der Lohnkosten',
  feePerHourOpt: 'CZK pro gearbeitete Stunde',
  feeFixedOpt: 'Feste Monatsgebühr',
  feeCombinedOpt: 'Kombiniert',
  feePct: 'Marge (%)',
  feeHour: 'Gebühr (CZK/h)',
  feeFixed: 'Feste Gebühr',
  vat: 'MwSt.-Satz',
  agAcc: 'Unterkunft',
  agTrans: 'Fahrt',
  agRec: 'Rekrutierung',
  agOnb: 'Einmaliges Onboarding',
  vatDeduct: 'Das Unternehmen ist MwSt.-pflichtig und kann die MwSt. abziehen',
  legDirect: '9 · Kosten der Stammbeschäftigung',
  dRec: 'Rekrutierung',
  dOnb: 'Onboarding',
  dHr: 'HR-Verwaltung (monatlich)',
  dPay: 'Lohnbuchhaltung (monatlich)',
  dAcc: 'Unterkunft (monatlich)',
  dTrans: 'Fahrt (monatlich)',
  dMed: 'Ärztliche Untersuchung',
  dTrain: 'Schulung',
  dTurn: 'Fluktuation / Ersatz (optional)',
  dTurnHint: 'Der Rechner erfindet keine Fluktuationsrate.',
  legWorkers: '10 · Anzahl der Mitarbeiter',
  workersCustom: 'Eigene Anzahl',
  resultsTitle: 'Ergebnisübersicht',
  cGross: 'Bruttolohn',
  cNet: 'Nettolohn',
  cEmpDeductions: 'Arbeitnehmerabzüge',
  cErStatutory: 'Gesetzliche Arbeitgeberkosten',
  cAgencyFee: 'Agenturgebühr',
  cTotalEconomic: 'Monatliche Gesamtkosten (wirtschaftlich)',
  cPerHour: 'Kosten / gearbeitete Stunde',
  cVsDirect: 'Differenz zur Stammbeschäftigung',
  aReset: 'Zurücksetzen',
  aPrint: 'Drucken / PDF',
  aCopySummary: 'Zusammenfassung kopieren',
  aCopyLink: 'Link kopieren',
  aExportCsv: 'CSV exportieren',
  subNet: 'Nettolohn – Aufschlüsselung (für Formel und Quelle klicken)',
  subEmployer: 'Arbeitgeberkosten',
  subAgencyInvoice: 'Agenturrechnung',
  subComparison: 'Zeitarbeit vs. Stammbeschäftigung',
  subScenario: 'Szenario für {n} Mitarbeiter',
  thItem: 'Position',
  thAgency: 'Zeitarbeit',
  thDirect: 'Stamm',
  scWorker1: '1 Mitarbeiter / Monat',
  scWorkersMonth: '{n} Mitarbeiter / Monat',
  scWorkersYear: '{n} Mitarbeiter / Jahr (Szenario)',
  scenarioNote: 'Der Jahresbetrag ist ein Szenario (12× der modellierte Monat), keine Prognose.',
  invalid: 'Korrigieren Sie die markierten Eingaben – die Berechnung kann nicht abgeschlossen werden.',
  disclaimer:
    'Informative Schätzung · Regeln Tschechien 2026 · Zuletzt geprüft {d}. Der tatsächliche Lohn kann je nach individuellen Umständen, Kollektiv- und internen Lohnregelungen, tatsächlichem Durchschnittsverdienst, Abzügen, steuerlicher Ansässigkeit, Leistungen, Abwesenheiten und Rundung abweichen. Wir empfehlen, die endgültige Berechnung mit einer Buchhalterin oder Lohnspezialistin zu prüfen. Der Rechner ersetzt weder eine Lohnbuchhaltung noch eine Rechtsberatung.',
  lFormula: 'Formel:',
  lRateBase: 'Satz / Basis:',
  lBase: 'Basis:',
  lRounding: 'Rundung:',
  lSource: 'Quelle:',
  originStatutory: 'gesetzlich',
  originUser: 'eingegeben',
  originEstimated: 'Schätzung',
  originDerived: 'abgeleitet',
  ctaEyebrow: 'Rekrutierung und Kostenkalkulation',
  ctaHeading: 'Möchten Sie die tatsächlichen Kosten der Mitarbeiter für Ihren Betrieb berechnen?',
  ctaBody:
    'Wir helfen Ihnen, Rekrutierung, Schichtmodell und Budget so zu gestalten, dass Löhne, Beiträge und Kandidatenverfügbarkeit wirtschaftlich sinnvoll sind. Nennen Sie uns die Anzahl der Mitarbeiter, den Standort, die Branche, das Schichtmodell und den gewünschten Eintrittstermin.',
  ctaRequest: 'Mitarbeiter anfragen',
  ctaConsult: 'Beratung vereinbaren',
  ctaNote:
    'Tragen Sie keine konkreten Lohndaten aus dem Rechner in die Anfrage ein – diese bleiben nur in Ihrem Browser.',
};

export const DCALC: Record<Lang, DCalcCopy> = { cs, en, de };
