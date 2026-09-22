/**
 * Primary sources for the LATAM candidate corpus.
 *
 * Every material immigration or employment claim in pt-BR and es points at one
 * of these by id. Named once here so a URL or an access date is corrected in a
 * single place, and so the freshness gate can ask a real question: has any
 * source this page rests on been revised since the page was last verified?
 *
 * Verified 2026-09-21 — see docs/latam-worker-legal-source-audit-2026.md for
 * the quoted sentence behind each entry. Nothing here was written from memory;
 * three of these facts post-date the model's training data.
 */
import type { LocaleSource } from './types'

const ACCESSED = '2026-09-21'

export const LATAM_SRC = {
  programQualified: {
    id: 'mpo-program-kvalifikovany',
    name: 'Program kvalifikovaný zaměstnanec',
    publisher: 'Ministerstvo průmyslu a obchodu ČR',
    url: 'https://mpo.gov.cz/cz/zahranicni-obchod/ekonomicka-migrace/program-kvalifikovany-zamestnanec--248247/',
    accessedAt: ACCESSED,
  },
  programHighlyQualified: {
    id: 'mpo-program-vysoce-kvalifikovany',
    name: 'Program vysoce kvalifikovaný zaměstnanec',
    publisher: 'Ministerstvo průmyslu a obchodu ČR',
    url: 'https://mpo.gov.cz/cz/zahranicni-obchod/ekonomicka-migrace/program-vysoce-kvalifikovany-zamestnanec--248246/',
    accessedAt: ACCESSED,
  },
  programKeyPersonnel: {
    id: 'mpo-program-klicovy-a-vedecky-personal',
    name: 'Program klíčový a vědecký personál',
    publisher: 'Ministerstvo průmyslu a obchodu ČR',
    url: 'https://mpo.gov.cz/cz/zahranicni-obchod/ekonomicka-migrace/program-klicovy-a-vedecky-personal--248245/',
    accessedAt: ACCESSED,
  },
  blueCard: {
    id: 'mzv-modra-karta',
    name: 'Modrá karta',
    publisher: 'Ministerstvo zahraničních věcí ČR',
    url: 'https://mzv.gov.cz/jnp/cz/informace_pro_cizince/pobytova_opravneni_k_pobytu_nad_90_dnu/modre_karty.mobi',
    accessedAt: ACCESSED,
  },
  employeeCardMzv: {
    id: 'mzv-zamestnanecka-karta',
    name: 'Zaměstnanecká karta',
    publisher: 'Ministerstvo zahraničních věcí ČR',
    url: 'https://mzv.gov.cz/jnp/cz/informace_pro_cizince/pobytova_opravneni_k_pobytu_nad_90_dnu/zamestnanecka_karta.html',
    accessedAt: ACCESSED,
  },
  residenceAct: {
    id: 'zakon-326-1999',
    // Three provisions, not one. The two-year ceiling is § 44 odst. 6 and the
    // repeat-extension rule is § 44a odst. 9; § 42g governs who the card is for
    // and what it authorises. This label is RENDERED to the reader under
    // "Fontes oficiais", so a reader following it to check the two-year claim
    // must land on the section that actually contains it.
    name: 'Zákon č. 326/1999 Sb., o pobytu cizinců na území ČR — § 42g, § 44 odst. 6, § 44a odst. 9',
    publisher: 'Sbírka zákonů ČR',
    url: 'https://www.zakonyprolidi.cz/cs/1999-326',
    accessedAt: ACCESSED,
  },
  embassyBrasilia: {
    id: 'mzv-brasilia',
    name: 'Velvyslanectví ČR v Brasílii — vízové informace',
    publisher: 'Ministerstvo zahraničních věcí ČR',
    url: 'https://mzv.gov.cz/brasilia/cz/konzularni_a_vizove_info/vizove_informace/index.html',
    accessedAt: ACCESSED,
  },
  embassyBrasiliaPt: {
    id: 'mzv-brasilia-pt',
    name: 'Embaixada da República Tcheca em Brasília — informações de vistos',
    publisher: 'Ministério dos Negócios Estrangeiros da República Tcheca',
    url: 'https://mzv.gov.cz/brasilia/pt/informacoes_vistos/index.html',
    accessedAt: ACCESSED,
  },
  consulateSaoPauloPt: {
    id: 'mzv-saopaulo-pt',
    name: 'Consulado-Geral da República Tcheca em São Paulo — informações consulares',
    publisher: 'Ministério dos Negócios Estrangeiros da República Tcheca',
    url: 'https://mzv.gov.cz/saopaulo/pt/index.html',
    accessedAt: ACCESSED,
  },
  consulateSaoPauloScope: {
    id: 'mzv-saopaulo-pusobnost',
    name: 'Konzulární působnost — Generální konzulát ČR v São Paulu',
    publisher: 'Ministerstvo zahraničních věcí ČR',
    url: 'https://mzv.gov.cz/saopaulo/cz/rozdeleni_pusobnosti/index.html',
    accessedAt: ACCESSED,
  },
  quotaRegulation: {
    id: 'nv-220-2019',
    name: 'Nařízení vlády č. 220/2019 Sb. — maximální počet žádostí na zastupitelském úřadu',
    publisher: 'Ministerstvo zahraničních věcí ČR',
    url: 'https://mzv.gov.cz/jnp/cz/informace_pro_cizince/legislativa/narizeni_vlady_o_maximalnim_poctu.html',
    accessedAt: ACCESSED,
  },
  healthProfessionsAct: {
    id: 'zakon-95-2004',
    name: 'Zákon č. 95/2004 Sb., § 34 — uznávání způsobilosti lékaře, zubního lékaře a farmaceuta',
    publisher: 'Sbírka zákonů ČR',
    url: 'https://www.zakonyprolidi.cz/cs/2004-95',
    accessedAt: ACCESSED,
  },
  nonMedicalHealthAct: {
    id: 'zakon-96-2004',
    name: 'Zákon č. 96/2004 Sb. — nelékařská zdravotnická povolání',
    publisher: 'Sbírka zákonů ČR',
    url: 'https://www.zakonyprolidi.cz/cs/2004-96',
    accessedAt: ACCESSED,
  },
  approbationExam: {
    id: 'mzd-aprobacni-zkouska',
    name: 'Aprobační zkouška',
    publisher: 'Ministerstvo zdravotnictví ČR',
    url: 'https://mzd.gov.cz/aprobacni-zkouska/',
    accessedAt: ACCESSED,
  },
  mercosur: {
    id: 'ec-mercosur',
    name: 'EU–Mercosur agreement — provisional application factsheet',
    publisher: 'European Commission, DG Trade',
    url: 'https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/mercosur/eu-mercosur-agreement/factsheet-provisional-application-eu-mercosur-agreement-how-export-goods-and-services_en',
    accessedAt: ACCESSED,
  },
  labourOffice: {
    id: 'up-zamestnavani-cizincu',
    name: 'Zaměstnávání cizinců',
    publisher: 'Úřad práce ČR',
    url: 'https://up.gov.cz/zamestnavani-cizincu',
    accessedAt: ACCESSED,
  },
} as const satisfies Record<string, LocaleSource>

export type LatamSourceKey = keyof typeof LATAM_SRC
