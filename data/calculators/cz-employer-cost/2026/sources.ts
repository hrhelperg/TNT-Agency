/**
 * Official sources behind every constant in the Czech employer-cost calculator
 * for tax year 2026.
 *
 * WHAT COUNTS AS A SOURCE HERE
 * ────────────────────────────
 * A primary one: the statute or decree itself, or the authority that administers
 * it — ČSSZ, Finanční správa, MPSV, MF, a public health insurer's published
 * methodology, or, for the statutory employer-liability insurance, the two
 * insurers that administer that regime by legal mandate.
 *
 * Payroll blogs, accounting-software marketing pages and news summaries are not
 * sources. They were used during research only to find leads, and several turned
 * out to be circulating figures that no authority publishes — a 143,40 Kč hourly
 * minimum wage for a 37,5-hour week, a 138,88 Kč rate for 38,75 hours, four-tier
 * "zaručená mzda 2026" tables that were repealed for the private sector in 2025,
 * and a fabricated health top-up example applying the OSVČ minimum base to an
 * employee. None of them are in this file, and the methodology document names
 * them so a later reader does not rediscover them and assume they were missed.
 *
 * EVERY ENTRY WAS OPENED
 * ──────────────────────
 * `ACCESSED` is the single date on which these pages were read. It is the only
 * place a verification date is recorded, so nothing downstream can claim a check
 * that this file does not support. Moving it forward asserts that someone opened
 * these pages again on the new date.
 *
 * A retrieval note worth keeping, because it will recur at the next re-check:
 * zakonyprolidi.cz answers a bare fetcher with HTTP 403 and a browser
 * User-Agent with 200. Statutory text quoted in the registry was retrieved
 * accordingly, not inherited from a secondary summary.
 */

export type SourceAuthority =
  | 'ČSSZ'
  | 'Finanční správa ČR'
  | 'Ministerstvo financí ČR'
  | 'MPSV'
  | 'VZP ČR'
  | 'Sbírka zákonů'
  | 'Kooperativa pojišťovna, a.s.'
  | 'Generali Česká pojišťovna a.s.'
  | 'portal.gov.cz';

export interface CalculatorSource {
  readonly id: string;
  readonly authority: SourceAuthority;
  readonly title: string;
  readonly url: string;
  /** The statute or decree provision this source evidences. */
  readonly legalBasis: string;
  /** ISO date the page was read. */
  readonly accessed: string;
  /** What this source establishes, and any caveat about its standing. */
  readonly note: string;
}

/**
 * The date every source below was read.
 *
 * Deliberately a single constant rather than a per-entry date: a registry where
 * each row carries its own date invites a partial re-check that leaves most rows
 * stale while the page still reports the newest one.
 */
export const ACCESSED = '2026-08-24';

export const CZ_EMPLOYER_COST_SOURCES_2026: readonly CalculatorSource[] = [
  // ── Minimum wage ─────────────────────────────────────────────────────────
  {
    id: 'mpsv-minimalni-mzda-2026',
    authority: 'MPSV',
    title: 'Minimální mzda',
    url: 'https://mpsv.gov.cz/minimalni-mzda',
    legalBasis: '§ 111 zákona č. 262/2006 Sb.; sdělení MPSV č. 356/2025 Sb.',
    accessed: ACCESSED,
    note: 'Od 1. 1. 2026 do 31. 12. 2026 činí minimální mzda při 40h týdnu 22 400 Kč měsíčně nebo 134,40 Kč za hodinu. Částku nestanoví nařízení vlády, ale sdělení MPSV; nařízení vlády č. 285/2024 Sb. stanoví pouze koeficient.',
  },
  {
    id: 'nv-285-2024-koeficient',
    authority: 'Sbírka zákonů',
    title: 'Nařízení vlády č. 285/2024 Sb., o koeficientu pro výpočet minimální mzdy v roce 2025 a 2026',
    url: 'https://www.zakonyprolidi.cz/cs/2024-285',
    legalBasis: '§ 1 odst. 2 nařízení vlády č. 285/2024 Sb.',
    accessed: ACCESSED,
    note: '„Koeficient pro výpočet minimální mzdy pro rok 2026 činí 0,434." 51 497 × 0,434 = 22 349,698 → zaokrouhleno na celé stokoruny nahoru = 22 400 Kč.',
  },
  {
    id: 'mf-sdeleni-312-2025',
    authority: 'Ministerstvo financí ČR',
    title: 'Sdělení Ministerstva financí č. 312/2025 Sb. — predikce průměrné hrubé měsíční nominální mzdy pro rok 2026',
    url: 'https://www.zakonyprolidi.cz/cs/2025-312',
    legalBasis: '§ 111 odst. 7 písm. a) zákona č. 262/2006 Sb.',
    accessed: ACCESSED,
    note: 'Predikce 51 497 Kč — vstup do vzorce minimální mzdy. NENÍ totožná se statutární „průměrnou mzdou" 48 967 Kč podle nařízení vlády č. 365/2025 Sb.; záměna dává 21 300 místo 22 400.',
  },

  // ── Social insurance ─────────────────────────────────────────────────────
  {
    id: 'cssz-sazby-2026',
    authority: 'ČSSZ',
    title: 'Výše a sazba pojistného na sociální zabezpečení',
    url: 'https://www.cssz.gov.cz/vyse-a-sazba',
    legalBasis: '§ 7 zákona č. 589/1992 Sb.',
    accessed: ACCESSED,
    note: 'Zaměstnanec 7,1 %. Zaměstnavatel 24,8 % standardně; 29,8 % u zdravotnických záchranářů a členů HZS podniku; 27,8 % u rizikových zaměstnání v roce 2026 (28,8 % v 2027, 29,8 % od 2028).',
  },
  {
    id: 'cssz-prehled-2026',
    authority: 'ČSSZ',
    title: 'Přehled nejdůležitějších údajů pro sociální zabezpečení v roce 2026',
    url: 'https://www.cssz.gov.cz/prehled-nejdulezitejsich-udaju',
    legalBasis: 'nařízení vlády č. 365/2025 Sb.; § 23b odst. 4 zákona č. 589/1992 Sb.',
    accessed: ACCESSED,
    note: 'Průměrná mzda 2026 = 46 278 × 1,0581 = 48 966,7518 → zaokrouhleno nahoru = 48 967 Kč. Rozhodný příjem pro účast na nemocenském pojištění 4 500 Kč; u DPP 12 000 Kč.',
  },
  {
    id: 'cssz-max-vz-2026',
    authority: 'ČSSZ',
    title: 'Maximální vyměřovací základ',
    url: 'https://www.cssz.gov.cz/maximalni-vymerovaci-zaklad',
    legalBasis: '§ 15a zákona č. 589/1992 Sb.',
    accessed: ACCESSED,
    note: '48 × 48 967 = 2 350 416 Kč. Roční, kumulativní. U jediného zaměstnavatele se nad strop neodvádí ani část zaměstnance, ani část zaměstnavatele.',
  },
  {
    id: 'zakon-589-1992',
    authority: 'Sbírka zákonů',
    title: 'Zákon č. 589/1992 Sb., o pojistném na sociální zabezpečení',
    url: 'https://www.zakonyprolidi.cz/cs/1992-589',
    legalBasis: '§ 5, § 5a, § 5d, § 7, § 7a, § 7b, § 7d, § 7e, § 15a, § 23b–23g',
    accessed: ACCESSED,
    note: 'Zaokrouhlování: § 5d (vyměřovací základy nahoru na Kč), § 7 odst. 3 (pojistné nahoru na Kč), § 7b odst. 1 a § 7e odst. 1 (slevy nahoru na Kč, samostatně). § 20 je PENÁLE, nikoli zaokrouhlování — častá chybná citace.',
  },
  {
    id: 'cssz-sleva-zamestnavatele',
    authority: 'ČSSZ',
    title: 'Sleva na pojistném na sociální zabezpečení zaměstnavatele',
    url: 'https://www.cssz.gov.cz/sleva-na-pojistnem',
    legalBasis: '§ 7a–§ 7c, § 23c–§ 23f zákona č. 589/1992 Sb.',
    accessed: ACCESSED,
    note: '5 % z úhrnu vyměřovacích základů zaměstnanců, na které se sleva uplatňuje; zaokrouhluje se nahoru jednou z úhrnu. Pro rok 2026 beze změny — ověřeno porovnáním znění účinných 1. 1. 2026, 1. 7. 2026 a 1. 1. 2027 (shodná).',
  },
  {
    id: 'cssz-pracujici-duchodci',
    authority: 'ČSSZ',
    title: 'Sleva na pojistném pro pracující starobní důchodce',
    url: 'https://www.cssz.gov.cz/sleva-na-pojistnem-duchodci',
    legalBasis: '§ 7d, § 7e, § 23g zákona č. 589/1992 Sb.',
    accessed: ACCESSED,
    note: 'Právní forma je SLEVA 6,5 % z vyměřovacího základu, nikoli snížená sazba. Účinnost od 1. 1. 2025. Nejprve pojistné 7,1 % (nahoru), poté sleva 6,5 % (nahoru, samostatně), rozdíl se srazí. Sazba zaměstnavatele se nemění.',
  },

  // ── Health insurance ─────────────────────────────────────────────────────
  {
    id: 'zakon-592-1992',
    authority: 'Sbírka zákonů',
    title: 'Zákon č. 592/1992 Sb., o pojistném na veřejné zdravotní pojištění',
    url: 'https://www.zakonyprolidi.cz/cs/1992-592',
    legalBasis: '§ 2, § 3, § 4',
    accessed: ACCESSED,
    note: '§ 2 odst. 1: „Výše pojistného činí 13,5 % z vyměřovacího základu." § 2 odst. 2: pojistné se zaokrouhluje na celé koruny nahoru. Řetězec „4,5" se v zákoně nevyskytuje ani jednou. § 3 odst. 6: minimálním vyměřovacím základem je minimální mzda. § 3 odst. 10: doplatek do minima hradí zaměstnanec sám.',
  },
  {
    id: 'zakon-48-1997',
    authority: 'Sbírka zákonů',
    title: 'Zákon č. 48/1997 Sb., o veřejném zdravotním pojištění',
    url: 'https://www.zakonyprolidi.cz/cs/1997-48',
    legalBasis: '§ 7, § 9',
    accessed: ACCESSED,
    note: '§ 9 odst. 2: „Pojistné za zaměstnance hradí z jedné třetiny zaměstnanec, ze dvou třetin zaměstnavatel." § 9 odst. 1 výslovně říká, že výši pojistného stanoví zvláštní zákon — tento zákon tedy žádnou sazbu nestanoví, pouze dělí pojistné vypočtené jinde.',
  },
  {
    id: 'vzp-metodika-vymerovaci-zaklad',
    authority: 'VZP ČR',
    title: 'Vyměřovací základ a výpočet pojistného (metodika pro zaměstnavatele)',
    url: 'https://www.vzp.cz/platci/informace/zamestnavatel/vymerovaci-zaklad-a-vypocet-pojistneho',
    legalBasis: '§ 2, § 3 zákona č. 592/1992 Sb.',
    accessed: ACCESSED,
    note: 'Pořadí operací: vypočíst 13,5 % z vyměřovacího základu, zaokrouhlit na 1 Kč nahoru, teprve poté srazit zaměstnanci jednu třetinu. Minimální vyměřovací základ se NEKRÁTÍ podle úvazku — „bez ohledu na délku pracovního úvazku". Neplacené volno není od 1. 1. 2015 důvodem pro poměrné snížení minima.',
  },
  {
    id: 'zakon-289-2025',
    authority: 'Sbírka zákonů',
    title: 'Zákon č. 289/2025 Sb. (novela zákona č. 592/1992 Sb. účinná od 1. 1. 2026)',
    url: 'https://www.zakonyprolidi.cz/cs/2025-289',
    legalBasis: 'čl. I a čl. XI zákona č. 289/2025 Sb.',
    accessed: ACCESSED,
    note: 'Ruší § 3 odst. 8 písm. c) (péče o dítě do 7 let) a přeznačuje písmena d) až f) na c) až e). Výjimky z minimálního vyměřovacího základu jsou tedy pro rok 2026 pětipoložkové; pečující rodiče se k výjimce dostávají jen přes „stát je plátcem".',
  },

  // ── Income tax ───────────────────────────────────────────────────────────
  {
    id: 'zakon-586-1992',
    authority: 'Sbírka zákonů',
    title: 'Zákon č. 586/1992 Sb., o daních z příjmů',
    url: 'https://www.zakonyprolidi.cz/cs/1992-586',
    legalBasis: '§ 6, § 16, § 35ba, § 35c, § 35d, § 36, § 38h',
    accessed: ACCESSED,
    note: '§ 38h odst. 1: základ do 100 Kč nahoru na celé koruny, nad 100 Kč nahoru na celé stokoruny. § 38h odst. 3: záloha nahoru na celé koruny. § 6 odst. 12: základem daně jsou příjmy ze závislé činnosti — superhrubá mzda zrušena. § 35d odst. 4: měsíční bonus jen od 50 Kč a při příjmu alespoň poloviny minimální mzdy.',
  },
  {
    id: 'fs-zalohy-zavisla-cinnost',
    authority: 'Finanční správa ČR',
    title: 'Daň z příjmů — zaměstnanci a zaměstnavatelé',
    url: 'https://financnisprava.gov.cz/cs/dane/dane/dan-z-prijmu/zamestnanci-zamestnavatele/obecne-informace',
    legalBasis: '§ 38h zákona č. 586/1992 Sb.',
    accessed: ACCESSED,
    note: 'Měsíční hranice pro sazbu 23 % v roce 2026 = 3 × 48 967 = 146 901 Kč. Nerezident může měsíčně uplatnit pouze základní slevu na poplatníka.',
  },
  {
    id: 'portal-slevy-2026',
    authority: 'portal.gov.cz',
    title: 'Daňové zvýhodnění a slevy na dani z příjmů (INF-410)',
    url: 'https://portal.gov.cz/informace/danove-zvyhodneni-a-slevy-na-dani-z-prijmu-INF-410',
    legalBasis: '§ 35ba, § 35c zákona č. 586/1992 Sb.',
    accessed: ACCESSED,
    note: 'Základní sleva 30 840 Kč/rok = 2 570 Kč/měs; invalidita 2 520 / 5 040 Kč/rok; ZTP/P 16 140 Kč/rok. Dítě 15 204 / 22 320 / 27 840 Kč/rok = 1 267 / 1 860 / 2 320 Kč/měs. Sleva na manžela je pouze roční.',
  },

  // ── Statutory employer liability insurance ───────────────────────────────
  {
    id: 'vyhlaska-125-1993',
    authority: 'Sbírka zákonů',
    title: 'Vyhláška č. 125/1993 Sb., zákonné pojištění odpovědnosti zaměstnavatele',
    url: 'https://www.zakonyprolidi.cz/cs/1993-125',
    legalBasis: '§ 12 a příloha č. 2 vyhlášky č. 125/1993 Sb.',
    accessed: ACCESSED,
    note: 'Sazby v ‰ z vyměřovacího základu, osm pásem (2,8 / 4,2 / 5,6 / 7 / 8,4 / 9,8 / 10,5 / 50,4). Základ je souhrn vyměřovacích základů všech zaměstnanců za UPLYNULÉ čtvrtletí. Minimální pojistné za čtvrtletí 100 Kč. Vyhláška neobsahuje žádné pravidlo zaokrouhlování — kmen „zaokrouhl" se v ní nevyskytuje.',
  },
  {
    id: 'koop-zakonne-pojisteni',
    authority: 'Kooperativa pojišťovna, a.s.',
    title: 'Zákonné pojištění odpovědnosti zaměstnavatele — výpočet a placení pojistného',
    url: 'https://www.koop.cz/pojisteni/pojisteni-odpovednosti/zakonne-pojisteni-odpovednosti-zamestnavatele',
    legalBasis: 'vyhláška č. 125/1993 Sb.',
    accessed: ACCESSED,
    note: 'Maximální vyměřovací základ podle § 15a zákona č. 589/1992 Sb. se na toto pojištění NEVZTAHUJE. Pozor: jde o metodiku správce, nikoli o text předpisu — vyhláška sama disaplikaci nestanoví. Kooperativa rovněž vydává převodník OKEČ → CZ-NACE; sedm kódů CZ-NACE v něm vede na dvě různé sazby.',
  },
  {
    id: 'generali-zakonne-pojisteni',
    authority: 'Generali Česká pojišťovna a.s.',
    title: 'Zákonné pojištění odpovědnosti zaměstnavatele',
    url: 'https://www.generaliceska.cz/zakonne-pojisteni-odpovednosti-zamestnavatele',
    legalBasis: 'vyhláška č. 125/1993 Sb.',
    accessed: ACCESSED,
    note: 'Spravuje zaměstnavatele, kteří měli k 31. 12. 1992 sjednáno pojištění u České pojišťovny, a jejich právní nástupce; ostatní spadají pod Kooperativu. Potvrzuje minimální čtvrtletní pojistné 100 Kč.',
  },
] as const;

export type CalculatorSourceId = (typeof CZ_EMPLOYER_COST_SOURCES_2026)[number]['id'];

const INDEX: ReadonlyMap<string, CalculatorSource> = new Map(
  CZ_EMPLOYER_COST_SOURCES_2026.map((s) => [s.id, s]),
);

/** Look up a source. Throws on an unknown id so a typo cannot render a blank citation. */
export function getSource(id: string): CalculatorSource {
  const source = INDEX.get(id);
  if (!source) throw new Error(`cz-employer-cost sources: unknown source id "${id}"`);
  return source;
}

export function hasSource(id: string): boolean {
  return INDEX.has(id);
}

/** Distinct authorities, for the "verified against" line on the page. */
export const SOURCE_AUTHORITIES: readonly SourceAuthority[] = Array.from(
  new Set(CZ_EMPLOYER_COST_SOURCES_2026.map((s) => s.authority)),
);
