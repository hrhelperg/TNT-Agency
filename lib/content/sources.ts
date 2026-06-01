// Shared, named source references reused across SEO pages.
//
// Only real, verifiable Czech laws and official institutions are listed here.
// No source is invented. Pages reference subsets of these constants so the
// citation wording stays consistent and a source URL is updated in one place.
// `retrieved` marks when the online reference was last checked.

import type { ContentSource } from './types'

const RETRIEVED = '2026-05-23'

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
