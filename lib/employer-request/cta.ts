// Employer conversion CTA copy + link building (Phase C4).
//
// A CTA may identify the SURFACE it was clicked from and nothing else. No
// salary, net pay, employer cost, agency fee or operational assumption is ever
// placed in the URL — `buildCtaHref` accepts only a CtaSource, so there is no
// code path that could add one.

import type { Locale } from '../content/types'
import type { CtaSource } from '../attribution'

export const REQUEST_PATH = '/poptavka-pracovniku'

/** The ONLY query parameter a CTA may carry. */
export function buildCtaHref(source: CtaSource): string {
  return `${REQUEST_PATH}?source=${encodeURIComponent(source)}`
}

export interface CtaCopy {
  title: string
  text: string
  primary: string
  secondary: string
  note: string
}

/** Surface-specific framing so the CTA reads as a next step, not a banner. */
export type CtaVariant = 'calculator' | 'comparison' | 'agencyValue' | 'responsibility'

const cs: Record<CtaVariant, CtaCopy> = {
  calculator: {
    title: 'Máte spočítáno – co dál?',
    text: 'Kalkulačka ukazuje zákonnou mzdovou část nákladu. Pokud řešíte konkrétní obsazení, zadejte požadavek a připravíme nabídku podle profese, lokality a směnného modelu.',
    primary: 'Nezávazně poptat pracovníky',
    secondary: 'Porovnat přímé a agenturní zaměstnávání',
    note: 'Zadané částky se do poptávky nepřenášejí.',
  },
  comparison: {
    title: 'Chcete rozdíl ověřit na konkrétním zadání?',
    text: 'Výsledek porovnání vychází z vámi zadaných předpokladů. Na konkrétní profesi, počet lidí a lokalitu lze připravit nabídku, která pracuje s reálnými provozními vstupy.',
    primary: 'Získat nabídku agenturního zaměstnávání',
    secondary: 'Probrat požadavky s agenturou',
    note: 'Do poptávky se nepřenášejí žádné hodnoty z kalkulačky.',
  },
  agencyValue: {
    title: 'Řešíte obsazení konkrétní pozice?',
    text: 'Zadejte profesi, počet pracovníků, lokalitu a termín nástupu. Ozveme se s tím, co je v daném regionu a termínu reálné.',
    primary: 'Nezávazně poptat pracovníky',
    secondary: 'Spočítat náklady v kalkulačce',
    note: 'Dostupnost pracovníků nelze zaručit předem – vždy závisí na profesi, lokalitě a podmínkách.',
  },
  responsibility: {
    title: 'Rozdělení odpovědnosti se řeší ve smlouvě',
    text: 'Tabulka popisuje obvyklé rozdělení podle českého práva. Konkrétní rozsah – BOZP, OOPP, ubytování, doprava – se nastavuje smluvně podle provozu.',
    primary: 'Probrat požadavky s agenturou',
    secondary: 'Zadat poptávku pracovníků',
    note: 'Obecné informace, nejedná se o právní poradenství.',
  },
}

const en: Record<CtaVariant, CtaCopy> = {
  calculator: {
    title: 'You have the numbers — what next?',
    text: 'The calculator shows the statutory payroll part of the cost. If you are staffing a specific role, submit the requirement and we will prepare a proposal based on profession, location and shift model.',
    primary: 'Request workers',
    secondary: 'Compare direct and agency employment',
    note: 'The amounts you entered are not transferred into the request.',
  },
  comparison: {
    title: 'Want to test the difference on a real requirement?',
    text: 'The comparison result follows the assumptions you entered. For a specific profession, headcount and location we can prepare a proposal built on actual operational inputs.',
    primary: 'Request an agency staffing proposal',
    secondary: 'Discuss staffing requirements',
    note: 'No calculator values are carried into the request.',
  },
  agencyValue: {
    title: 'Staffing a specific role?',
    text: 'Provide the profession, headcount, location and start date. We will come back with what is realistic in that region and timeframe.',
    primary: 'Request workers',
    secondary: 'Calculate the cost',
    note: 'Worker availability cannot be guaranteed in advance — it always depends on profession, location and conditions.',
  },
  responsibility: {
    title: 'The split of responsibility is set in the contract',
    text: 'The table describes the usual split under Czech law. The concrete scope — OSH, PPE, accommodation, transport — is agreed contractually per operation.',
    primary: 'Discuss staffing requirements',
    secondary: 'Submit a staffing request',
    note: 'General information, not legal advice.',
  },
}

const de: Record<CtaVariant, CtaCopy> = {
  calculator: {
    title: 'Die Zahlen stehen – wie weiter?',
    text: 'Der Rechner zeigt den gesetzlichen Lohnanteil der Kosten. Wenn Sie eine konkrete Position besetzen, übermitteln Sie den Bedarf – wir erstellen ein Angebot nach Beruf, Standort und Schichtmodell.',
    primary: 'Personalbedarf anfragen',
    secondary: 'Direkte Beschäftigung und Zeitarbeit vergleichen',
    note: 'Die eingegebenen Beträge werden nicht in die Anfrage übernommen.',
  },
  comparison: {
    title: 'Möchten Sie die Differenz an einem konkreten Bedarf prüfen?',
    text: 'Das Vergleichsergebnis folgt Ihren eingegebenen Annahmen. Für einen konkreten Beruf, eine Anzahl und einen Standort erstellen wir ein Angebot auf Basis tatsächlicher betrieblicher Eingaben.',
    primary: 'Angebot für Zeitarbeit anfordern',
    secondary: 'Personalbedarf besprechen',
    note: 'Es werden keine Werte aus dem Rechner in die Anfrage übernommen.',
  },
  agencyValue: {
    title: 'Besetzen Sie eine konkrete Position?',
    text: 'Geben Sie Beruf, Anzahl, Standort und Eintrittstermin an. Wir melden uns mit dem, was in dieser Region und diesem Zeitraum realistisch ist.',
    primary: 'Personalbedarf anfragen',
    secondary: 'Kosten berechnen',
    note: 'Die Verfügbarkeit von Mitarbeitern kann nicht im Voraus garantiert werden – sie hängt stets von Beruf, Standort und Bedingungen ab.',
  },
  responsibility: {
    title: 'Die Aufteilung der Verantwortung wird vertraglich geregelt',
    text: 'Die Tabelle beschreibt die übliche Aufteilung nach tschechischem Recht. Der konkrete Umfang – Arbeitsschutz, PSA, Unterkunft, Transport – wird je Betrieb vertraglich vereinbart.',
    primary: 'Personalbedarf besprechen',
    secondary: 'Personalanfrage stellen',
    note: 'Allgemeine Informationen, keine Rechtsberatung.',
  },
}

export const CTA_COPY: Record<Locale, Record<CtaVariant, CtaCopy>> = { cs, en, de }
