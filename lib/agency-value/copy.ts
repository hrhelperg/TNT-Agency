import type { Lang } from '../i18n/react';

// Phase B — agency-value copy + responsibility model (cs/en/de).
//
// No payroll math here: the statutory/direct/agency numbers come from the shared
// engine (lib/payroll). This module only holds qualified, contract-aware copy and
// the indicative responsibility allocation for agency employment (temporary
// assignment) under Czech law. Every claim is qualified; nothing is guaranteed.

export type Responsibility = 'agency' | 'client' | 'shared' | 'depends';

export interface RespRow {
  readonly key: string;
  readonly resp: Responsibility;
}

// Indicative allocation for agency employment (dočasné přidělení). Conservative:
// anything genuinely contract-dependent is "depends", not asserted.
export const RESPONSIBILITY_ROWS: readonly RespRow[] = [
  { key: 'sourcing', resp: 'agency' },
  { key: 'screening', resp: 'agency' },
  { key: 'contract', resp: 'agency' },
  { key: 'payroll', resp: 'agency' },
  { key: 'contributions', resp: 'agency' },
  { key: 'assignmentDocs', resp: 'shared' },
  { key: 'attendance', resp: 'shared' },
  { key: 'supervision', resp: 'client' },
  { key: 'instructions', resp: 'client' },
  { key: 'safety', resp: 'shared' },
  { key: 'ppe', resp: 'depends' },
  { key: 'medical', resp: 'depends' },
  { key: 'accommodation', resp: 'depends' },
  { key: 'transport', resp: 'depends' },
  { key: 'foreignDocs', resp: 'agency' },
  { key: 'replacement', resp: 'depends' },
  { key: 'termination', resp: 'shared' },
  { key: 'records', resp: 'agency' },
];

export interface AgencyValueCopy {
  // Homepage agency-value layer
  avEyebrow: string;
  avHeading: string;
  avPoints: readonly string[];
  avCta: string;
  // Benefits
  benefitsTitle: string;
  benefits: readonly string[];
  benefitsNote: string;
  // Responsibility matrix
  respTitle: string;
  respIntro: string;
  respColCategory: string;
  respColWho: string;
  respDisclaimer: string;
  respAgency: string;
  respClient: string;
  respShared: string;
  respDepends: string;
  cat: Record<string, string>;
  // Qualified difference framing
  diffLabel: string;
  stateDirectCheaper: string;
  stateAgencyCheaper: string;
  stateBreakEven: string;
  stateInsufficient: string;
  diffNote: string;
  context: string;
}

const cs: AgencyValueCopy = {
  avEyebrow: 'Přímé vs. agenturní zaměstnávání',
  avHeading: 'Zákonná mzda není celý náklad na obsazení pozice',
  avPoints: [
    'K hrubé mzdě a zákonným odvodům se přidávají interní náklady na nábor, administrativu, onboarding a náhrady.',
    'Agentura může převzít nábor, mzdovou agendu, dočasné přidělení i koordinaci – hodnota je často provozní, ne daňová.',
    'Agenturní zaměstnávání automaticky nesnižuje zákonné odvody.',
    'Skutečný rozdíl závisí na vašich interních nákladech a zadaných předpokladech.',
  ],
  avCta: 'Porovnat přímé a agenturní zaměstnávání',
  benefitsTitle: 'Co může agentura převzít',
  benefits: [
    'Vyhledání a předvýběr kandidátů',
    'Rychlejší obsazení kapacity',
    'Pracovněprávní dokumentaci',
    'Zpracování mezd a odvodů',
    'Administrativu dočasného přidělení',
    'Koordinaci onboardingu',
    'Koordinaci ubytování a dopravy',
    'Podporu při náhradě pracovníka',
    'Snížení interní zátěže HR',
    'Flexibilní kapacitu',
    'Podporu vícejazyčných pracovníků',
    'Jeden provozní kontakt',
    'Asistenci s procesy pro cizince, pokud je nabízena',
  ],
  benefitsNote: 'Rozsah služeb a odpovědnosti závisí na konkrétní smlouvě. Nejde o garantované výsledky.',
  respTitle: 'Kdo za co odpovídá',
  respIntro: 'Orientační rozdělení odpovědností u agenturního zaměstnávání (dočasného přidělení).',
  respColCategory: 'Oblast',
  respColWho: 'Odpovědnost',
  respDisclaimer:
    'Skutečné rozdělení odpovědností závisí na českém právu (zejména zákoníku práce), struktuře přidělení a konkrétní smlouvě mezi agenturou a uživatelem. Nejde o právní poradenství.',
  respAgency: 'Agentura',
  respClient: 'Uživatel (klient)',
  respShared: 'Sdílené',
  respDepends: 'Dle smlouvy',
  cat: {
    sourcing: 'Vyhledání kandidátů',
    screening: 'Screening a předvýběr',
    contract: 'Pracovní smlouva',
    payroll: 'Zpracování mezd',
    contributions: 'Sociální a zdravotní odvody',
    assignmentDocs: 'Dohoda o dočasném přidělení',
    attendance: 'Evidence docházky',
    supervision: 'Každodenní řízení práce',
    instructions: 'Pracovní pokyny',
    safety: 'Bezpečnost práce (BOZP)',
    ppe: 'Osobní ochranné pomůcky (OOPP)',
    medical: 'Vstupní lékařská prohlídka',
    accommodation: 'Ubytování',
    transport: 'Doprava',
    foreignDocs: 'Dokumenty cizinců',
    replacement: 'Náhrada pracovníka',
    termination: 'Ukončení / přidělení',
    records: 'Archivace dokladů',
  },
  diffLabel: 'Odhadovaný rozdíl podle zadaných předpokladů',
  stateDirectCheaper: 'Přímé zaměstnání vychází podle zadání levněji',
  stateAgencyCheaper: 'Agenturní zaměstnání vychází podle zadání levněji',
  stateBreakEven: 'Náklady jsou zhruba vyrovnané',
  stateInsufficient: 'Zadejte provozní náklady pro smysluplné porovnání',
  diffNote:
    'Rozdíl vychází výhradně ze zadaných částek. Pokud je agentura dražší, dodatečná cena obvykle pokrývá nábor, administrativu, flexibilitu a náhrady.',
  context: 'Výpočet podle pravidel České republiky pro rok 2026.',
};

const en: AgencyValueCopy = {
  avEyebrow: 'Direct vs. agency employment',
  avHeading: 'Statutory payroll is not the full staffing cost',
  avPoints: [
    'Beyond gross salary and statutory contributions there are internal costs for recruitment, administration, onboarding and replacements.',
    'An agency can take over recruitment, payroll, temporary assignment and coordination — the value is often operational, not a tax loophole.',
    'Agency employment does not automatically reduce statutory contributions.',
    'The actual difference depends on your internal costs and the assumptions you enter.',
  ],
  avCta: 'Compare direct and agency employment',
  benefitsTitle: 'What an agency can take on',
  benefits: [
    'Candidate sourcing and preselection',
    'Faster capacity response',
    'Employment documentation',
    'Payroll and contribution administration',
    'Temporary-assignment administration',
    'Onboarding coordination',
    'Accommodation and transport coordination',
    'Replacement support',
    'Reduced internal HR workload',
    'Flexible staffing capacity',
    'Multilingual worker support',
    'One operational contact',
    'Foreign-worker process assistance when offered',
  ],
  benefitsNote: 'The scope of services and responsibilities depends on the specific contract. Outcomes are not guaranteed.',
  respTitle: 'Who is responsible for what',
  respIntro: 'Indicative allocation of responsibilities in agency employment (temporary assignment).',
  respColCategory: 'Area',
  respColWho: 'Responsibility',
  respDisclaimer:
    'The actual allocation of responsibilities depends on Czech law (in particular the Labour Code), the assignment structure and the specific contract between the agency and the user undertaking. This is not legal advice.',
  respAgency: 'Agency',
  respClient: 'Client (user undertaking)',
  respShared: 'Shared',
  respDepends: 'Depends on contract',
  cat: {
    sourcing: 'Candidate sourcing',
    screening: 'Screening & preselection',
    contract: 'Employment contract',
    payroll: 'Payroll processing',
    contributions: 'Social & health contributions',
    assignmentDocs: 'Temporary-assignment agreement',
    attendance: 'Attendance records',
    supervision: 'Daily work supervision',
    instructions: 'Workplace instructions',
    safety: 'Occupational safety',
    ppe: 'Personal protective equipment (PPE)',
    medical: 'Entry medical examination',
    accommodation: 'Accommodation',
    transport: 'Transport',
    foreignDocs: 'Foreign-worker documents',
    replacement: 'Worker replacement',
    termination: 'Termination / assignment end',
    records: 'Record retention',
  },
  diffLabel: 'Estimated difference based on entered assumptions',
  stateDirectCheaper: 'Direct employment is estimated cheaper for the entered values',
  stateAgencyCheaper: 'Agency employment is estimated cheaper for the entered values',
  stateBreakEven: 'Costs are roughly at break-even',
  stateInsufficient: 'Enter operational costs for a meaningful comparison',
  diffNote:
    'The difference comes only from the amounts you enter. If the agency is more expensive, the additional price typically covers recruitment, administration, flexibility and replacements.',
  context: 'Calculated under the rules of the Czech Republic for 2026.',
};

const de: AgencyValueCopy = {
  avEyebrow: 'Direkte Beschäftigung vs. Zeitarbeit',
  avHeading: 'Der gesetzliche Lohn sind nicht die gesamten Personalkosten',
  avPoints: [
    'Neben Bruttolohn und gesetzlichen Beiträgen entstehen interne Kosten für Rekrutierung, Verwaltung, Onboarding und Ersatz.',
    'Eine Agentur kann Rekrutierung, Lohnabrechnung, Überlassung und Koordination übernehmen – der Wert ist oft operativ, kein Steuervorteil.',
    'Zeitarbeit senkt die gesetzlichen Beiträge nicht automatisch.',
    'Die tatsächliche Differenz hängt von Ihren internen Kosten und den eingegebenen Annahmen ab.',
  ],
  avCta: 'Direkte Beschäftigung und Zeitarbeit vergleichen',
  benefitsTitle: 'Was eine Agentur übernehmen kann',
  benefits: [
    'Kandidatensuche und Vorauswahl',
    'Schnellere Kapazitätsdeckung',
    'Arbeitsrechtliche Dokumentation',
    'Lohn- und Beitragsverwaltung',
    'Verwaltung der Überlassung',
    'Koordination des Onboardings',
    'Koordination von Unterkunft und Fahrt',
    'Unterstützung beim Ersatz von Arbeitskräften',
    'Entlastung der internen HR',
    'Flexible Kapazität',
    'Unterstützung mehrsprachiger Mitarbeiter',
    'Ein operativer Ansprechpartner',
    'Unterstützung bei Verfahren für ausländische Arbeitskräfte, sofern angeboten',
  ],
  benefitsNote: 'Umfang der Leistungen und Verantwortlichkeiten hängt vom konkreten Vertrag ab. Ergebnisse sind nicht garantiert.',
  respTitle: 'Wer ist wofür verantwortlich',
  respIntro: 'Orientierende Verteilung der Verantwortlichkeiten bei Zeitarbeit (Überlassung).',
  respColCategory: 'Bereich',
  respColWho: 'Verantwortung',
  respDisclaimer:
    'Die tatsächliche Verteilung der Verantwortlichkeiten hängt vom tschechischen Recht (insbesondere dem Arbeitsgesetzbuch), der Struktur der Überlassung und dem konkreten Vertrag zwischen Agentur und Einsatzunternehmen ab. Dies ist keine Rechtsberatung.',
  respAgency: 'Agentur',
  respClient: 'Einsatzunternehmen (Kunde)',
  respShared: 'Gemeinsam',
  respDepends: 'Je nach Vertrag',
  cat: {
    sourcing: 'Kandidatensuche',
    screening: 'Screening & Vorauswahl',
    contract: 'Arbeitsvertrag',
    payroll: 'Lohnabrechnung',
    contributions: 'Sozial- und Krankenversicherungsbeiträge',
    assignmentDocs: 'Überlassungsvereinbarung',
    attendance: 'Anwesenheitserfassung',
    supervision: 'Tägliche Arbeitsaufsicht',
    instructions: 'Arbeitsanweisungen',
    safety: 'Arbeitssicherheit',
    ppe: 'Persönliche Schutzausrüstung (PSA)',
    medical: 'Ärztliche Eingangsuntersuchung',
    accommodation: 'Unterkunft',
    transport: 'Fahrt',
    foreignDocs: 'Dokumente ausländischer Arbeitskräfte',
    replacement: 'Ersatz von Arbeitskräften',
    termination: 'Beendigung / Einsatzende',
    records: 'Aufbewahrung von Unterlagen',
  },
  diffLabel: 'Geschätzte Differenz auf Grundlage der eingegebenen Annahmen',
  stateDirectCheaper: 'Direkte Beschäftigung ist bei den eingegebenen Werten günstiger',
  stateAgencyCheaper: 'Zeitarbeit ist bei den eingegebenen Werten günstiger',
  stateBreakEven: 'Die Kosten sind ungefähr ausgeglichen',
  stateInsufficient: 'Geben Sie Betriebskosten für einen aussagekräftigen Vergleich ein',
  diffNote:
    'Die Differenz ergibt sich ausschließlich aus den eingegebenen Beträgen. Ist die Agentur teurer, deckt der Aufpreis in der Regel Rekrutierung, Verwaltung, Flexibilität und Ersatz ab.',
  context: 'Berechnet nach den Regeln der Tschechischen Republik für 2026.',
};

export const AGENCY_VALUE: Record<Lang, AgencyValueCopy> = { cs, en, de };
