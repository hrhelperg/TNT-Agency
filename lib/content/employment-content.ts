// Structured employment topics. Generators read from this registry — never
// from invented prose. Every entry must declare at least one source; if real
// sources are missing the page is expected to render the transparent fallback.

import type { EmploymentTopic } from './types'

export const EMPLOYMENT_TOPICS: ReadonlyArray<EmploymentTopic> = [
  {
    slug: 'agenturni-zamestnavani',
    title: 'Agenturní zaměstnávání',
    summary:
      'Agenturní zaměstnávání umožňuje firmám pružně doplňovat pracovní sílu prostřednictvím pracovní agentury, která je zaměstnavatelem pracovníka a přiděluje ho k uživateli (cílové firmě).',
    audience: ['employer', 'employee', 'agency'],
    keyPoints: [
      'Pracovní agentura musí mít platné povolení ke zprostředkování zaměstnání podle zákona č. 435/2004 Sb.',
      'Mzdové a pracovní podmínky agenturního pracovníka musí být srovnatelné s kmenovými zaměstnanci uživatele.',
      'Uživatel a agentura nesou společnou odpovědnost za bezpečnost a ochranu zdraví při práci.',
    ],
    sources: [
      {
        name: 'Zákon č. 435/2004 Sb., o zaměstnanosti',
        publisher: 'Sbírka zákonů ČR',
      },
      {
        name: 'Úřad práce ČR – Zprostředkování zaměstnání',
        publisher: 'Úřad práce ČR',
        url: 'https://www.uradprace.cz/',
      },
    ],
    meta: {
      locale: 'cs',
      lastUpdated: '2026-05-05',
      jurisdiction: 'CZ',
      isGeneralInformation: true,
    },
  },
  {
    slug: 'zamestnavani-cizincu',
    title: 'Zaměstnávání cizinců v ČR',
    summary:
      'Zaměstnávání cizinců v České republice se řídí zvláštními pravidly podle země původu, druhu pobytu a typu pracovní pozice. Pravidla se liší pro občany EU/EHP/Švýcarska a pro občany třetích zemí.',
    audience: ['employer', 'foreign-worker', 'agency'],
    keyPoints: [
      'Občané EU/EHP a Švýcarska mají na trh práce v ČR volný přístup, ale jejich zaměstnání podléhá ohlašovací povinnosti.',
      'Občané třetích zemí obvykle potřebují povolení k pobytu i přístup na trh práce (zaměstnanecká karta, modrá karta apod.).',
      'Zaměstnavatel má informační povinnost vůči Úřadu práce ČR a v některých případech je povinen vést evidenci.',
    ],
    sources: [
      {
        name: 'Zákon č. 326/1999 Sb., o pobytu cizinců na území ČR',
        publisher: 'Sbírka zákonů ČR',
      },
      {
        name: 'Ministerstvo vnitra ČR – Pobyt cizinců',
        publisher: 'MV ČR',
        url: 'https://www.mvcr.cz/',
      },
    ],
    meta: {
      locale: 'cs',
      lastUpdated: '2026-05-05',
      jurisdiction: 'CZ',
      isGeneralInformation: true,
    },
  },
]

export const findEmploymentTopic = (slug: string): EmploymentTopic | undefined =>
  EMPLOYMENT_TOPICS.find((t) => t.slug === slug)
