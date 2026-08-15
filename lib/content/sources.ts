// Shared, named source references reused across SEO pages.
//
// Only real, verifiable Czech laws and official institutions are listed here.
// No source is invented. Pages reference subsets of these constants so the
// citation wording stays consistent and a source URL is updated in one place.
// `retrieved` marks when the online reference was last checked.

import type { ContentSource } from './types'

const RETRIEVED = '2026-05-23'
// Sources added with the professional/specialist cluster; each URL below was
// requested and returned HTTP 200 on this date.
const RETRIEVED_2026_08 = '2026-08-15'

export const SRC = {
  // ── Laws (Sbírka zákonů ČR) ────────────────────────────────────────────
  zakonikPrace: {
    name: 'Zákon č. 262/2006 Sb., zákoník práce',
    publisher: 'Sbírka zákonů ČR',
  },
  zakonOZamestnanosti: {
    name: 'Zákon č. 435/2004 Sb., o zaměstnanosti',
    publisher: 'Sbírka zákonů ČR',
  },
  zakonOPobytuCizincu: {
    name: 'Zákon č. 326/1999 Sb., o pobytu cizinců na území ČR',
    publisher: 'Sbírka zákonů ČR',
  },
  zakonSocialni: {
    name: 'Zákon č. 589/1992 Sb., o pojistném na sociální zabezpečení a příspěvku na státní politiku zaměstnanosti',
    publisher: 'Sbírka zákonů ČR',
  },
  zakonZdravotni: {
    name: 'Zákon č. 592/1992 Sb., o pojistném na veřejné zdravotní pojištění',
    publisher: 'Sbírka zákonů ČR',
  },
  zakonBozp: {
    name: 'Zákon č. 309/2006 Sb., o zajištění dalších podmínek bezpečnosti a ochrany zdraví při práci',
    publisher: 'Sbírka zákonů ČR',
  },
  zakonInspekcePrace: {
    name: 'Zákon č. 251/2005 Sb., o inspekci práce',
    publisher: 'Sbírka zákonů ČR',
  },
  zakonDaneZPrijmu: {
    name: 'Zákon č. 586/1992 Sb., o daních z příjmů',
    publisher: 'Sbírka zákonů ČR',
  },
  lexUkrajina: {
    name: 'Zákon č. 65/2022 Sb. (tzv. Lex Ukrajina) a navazující předpisy o dočasné ochraně',
    publisher: 'Sbírka zákonů ČR',
  },
  blueCardSmernice: {
    name: 'Směrnice EU 2021/1883 o podmínkách vstupu a pobytu vysoce kvalifikovaných pracovníků (modrá karta EU)',
    publisher: 'Evropská unie',
  },

  // ── Qualification, authorisation and technical-competence law ───────────
  // Added for the professional/specialist recruitment cluster. These are the
  // instruments that actually decide whether a qualified candidate may perform
  // a given activity — the substance that distinguishes specialist hiring from
  // volume staffing. Only real, currently effective Czech instruments here.
  nvElektrotechnika: {
    name: 'Nařízení vlády č. 194/2022 Sb., o požadavcích na odbornou způsobilost k výkonu činnosti na elektrických zařízeních a na odbornou způsobilost v elektrotechnice',
    publisher: 'Sbírka zákonů ČR',
    note: 'Nahradilo dřívější vyhlášku č. 50/1978 Sb., na kterou se v praxi stále odkazuje.',
  },
  zakonVyhrazenaZarizeni: {
    name: 'Zákon č. 250/2021 Sb., o bezpečnosti práce v souvislosti s provozem vyhrazených technických zařízení',
    publisher: 'Sbírka zákonů ČR',
  },
  zakonUznavaniKvalifikace: {
    name: 'Zákon č. 18/2004 Sb., o uznávání odborné kvalifikace',
    publisher: 'Sbírka zákonů ČR',
  },
  zakonDalsiVzdelavani: {
    name: 'Zákon č. 179/2006 Sb., o ověřování a uznávání výsledků dalšího vzdělávání (Národní soustava kvalifikací)',
    publisher: 'Sbírka zákonů ČR',
  },
  zakonMetrologie: {
    name: 'Zákon č. 505/1990 Sb., o metrologii',
    publisher: 'Sbírka zákonů ČR',
  },
  zakonPracovnelekarske: {
    name: 'Zákon č. 373/2011 Sb., o specifických zdravotních službách (pracovnělékařské služby)',
    publisher: 'Sbírka zákonů ČR',
  },
  vyhlaskaPracovnelekarske: {
    name: 'Vyhláška č. 79/2013 Sb., o pracovnělékařských službách a některých druzích posudkové péče',
    publisher: 'Sbírka zákonů ČR',
  },
  nsp: {
    name: 'Národní soustava povolání (NSP) – katalog povolání a jejich požadavků',
    publisher: 'MPSV ČR',
    url: 'https://www.nsp.cz/',
    retrieved: RETRIEVED_2026_08,
  },
  nsk: {
    name: 'Národní soustava kvalifikací (NSK) – profesní kvalifikace a jejich standardy',
    publisher: 'MŠMT / MPSV ČR',
    url: 'https://www.narodnikvalifikace.cz/',
    retrieved: RETRIEVED_2026_08,
  },
  msmt: {
    name: 'Ministerstvo školství, mládeže a tělovýchovy – uznávání zahraničního vzdělání',
    publisher: 'MŠMT ČR',
    url: 'https://www.msmt.cz/',
    retrieved: RETRIEVED_2026_08,
  },
  ispv: {
    name: 'Informační systém o průměrném výdělku (ISPV)',
    publisher: 'MPSV ČR',
    url: 'https://www.ispv.cz/',
    retrieved: RETRIEVED_2026_08,
  },
  csnSvarovani: {
    name: 'ČSN EN ISO 9606-1 – Zkoušky svářečů: tavné svařování, část 1 (oceli)',
    publisher: 'Česká agentura pro standardizaci (ČAS)',
    note: 'Norma je vydávaná a zpřístupňovaná ČAS; rozsah kvalifikace svářeče je dán zkušebním rozsahem uvedeným v osvědčení.',
  },

  // ── Institutions (official online sources) ─────────────────────────────
  mpsv: {
    name: 'Ministerstvo práce a sociálních věcí (MPSV)',
    publisher: 'MPSV ČR',
    url: 'https://www.mpsv.cz/',
    retrieved: RETRIEVED,
  },
  upcr: {
    name: 'Úřad práce ČR – zaměstnávání cizinců a zprostředkování zaměstnání',
    publisher: 'Úřad práce ČR',
    url: 'https://www.uradprace.cz/',
    retrieved: RETRIEVED,
  },
  mvcr: {
    name: 'Ministerstvo vnitra ČR – Odbor azylové a migrační politiky (pobyt cizinců)',
    publisher: 'MV ČR',
    url: 'https://www.mvcr.cz/',
    retrieved: RETRIEVED,
  },
  mzv: {
    name: 'Ministerstvo zahraničních věcí ČR – víza a konzulární informace',
    publisher: 'MZV ČR',
    url: 'https://www.mzv.cz/',
    retrieved: RETRIEVED,
  },
  suip: {
    name: 'Státní úřad inspekce práce (SÚIP)',
    publisher: 'SÚIP',
    url: 'https://www.suip.cz/',
    retrieved: RETRIEVED,
  },
  cssz: {
    name: 'Česká správa sociálního zabezpečení (ČSSZ)',
    publisher: 'ČSSZ',
    url: 'https://www.cssz.cz/',
    retrieved: RETRIEVED,
  },
  financniSprava: {
    name: 'Finanční správa ČR',
    publisher: 'Generální finanční ředitelství',
    url: 'https://www.financnisprava.cz/',
    retrieved: RETRIEVED,
  },
  vzp: {
    name: 'Všeobecná zdravotní pojišťovna ČR',
    publisher: 'VZP ČR',
    url: 'https://www.vzp.cz/',
    retrieved: RETRIEVED,
  },
  eures: {
    name: 'EURES – Evropský portál pracovní mobility',
    publisher: 'Evropská komise / MPSV',
    url: 'https://eures.europa.eu/',
    retrieved: RETRIEVED,
  },
  czso: {
    name: 'Český statistický úřad (ČSÚ)',
    publisher: 'ČSÚ',
    url: 'https://www.czso.cz/',
    retrieved: RETRIEVED,
  },
} satisfies Record<string, ContentSource>
