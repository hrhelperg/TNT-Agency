// Structured recruitment service descriptions.

import type { RecruitmentService } from './types'

export const RECRUITMENT_SERVICES: ReadonlyArray<RecruitmentService> = [
  {
    slug: 'permanentni-nabor',
    title: 'Permanentní nábor',
    summary:
      'Vyhledávání kandidátů na trvalý pracovní poměr u zaměstnavatele. Cílem je obsadit pozici dlouhodobě a kvalitně, nikoli rychle a za každou cenu.',
    whoFor: [
      'Firmy hledající stálé zaměstnance na klíčové pozice',
      'Pozice s vyšší kvalifikací (technika, IT, administrativa, management)',
      'Zaměstnavatele s potřebou stabilního personálního zázemí',
    ],
    process: [
      'Definice pozice, požadavků a kontextu týmu se zaměstnavatelem',
      'Vyhledání a předvýběr kandidátů z databáze a aktivních zdrojů',
      'Osobní rozhovory a ověření referencí',
      'Předání kandidátů zaměstnavateli pro finální výběr',
      'Podpora při nástupu a první adaptační fázi',
    ],
    compliance: [
      'Soulad se zákonem č. 435/2004 Sb. o zaměstnanosti',
      'Dodržování GDPR při práci s osobními údaji uchazečů',
      'Transparentní informování kandidátů o zpracování dat',
    ],
    meta: {
      locale: 'cs',
      lastUpdated: '2026-05-05',
      jurisdiction: 'CZ',
      isGeneralInformation: true,
    },
  },
  {
    slug: 'agenturni-prideleni',
    title: 'Agenturní přidělení (dočasné přidělení)',
    summary:
      'Pracovník je zaměstnancem agentury a je dočasně přidělen k uživateli. Vhodné pro pokrytí sezónních špiček, dlouhodobých nemocí a projektů s definovaným koncem.',
    whoFor: [
      'Výrobní podniky se sezónními výkyvy poptávky',
      'Logistické a skladové provozy',
      'Firmy řešící krátkodobý nedostatek pracovní síly',
    ],
    process: [
      'Analýza potřeb uživatele (počet pracovníků, profil, lokalita)',
      'Vyhledání a uzavření pracovní smlouvy s pracovníky agentury',
      'Dočasné přidělení k uživateli na základě dohody o přidělení',
      'Průběžná evidence docházky a koordinace s uživatelem',
      'Ukončení přidělení podle dohody nebo prodloužení',
    ],
    compliance: [
      'Srovnatelné mzdové a pracovní podmínky s kmenovými zaměstnanci uživatele',
      'Společná odpovědnost agentury a uživatele za BOZP',
      'Pravidla pro přiměřenou pracovní dobu, bezpečnostní školení a evidenci',
    ],
    meta: {
      locale: 'cs',
      lastUpdated: '2026-05-05',
      jurisdiction: 'CZ',
      isGeneralInformation: true,
    },
  },
]

export const findRecruitmentService = (
  slug: string,
): RecruitmentService | undefined =>
  RECRUITMENT_SERVICES.find((s) => s.slug === slug)
