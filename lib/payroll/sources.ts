/**
 * Versioned registry of the official sources behind every rate and threshold
 * used by the 2026 Czech payroll engine. Each rule in `rules/cz-2026.ts`
 * references one of these by `id`. Nothing in the engine is invented: values
 * are either read from these official sources ("confirmed-official"), derived
 * by arithmetic from an official value ("derived-from-official"), or left as a
 * documented configurable default the user must confirm ("configurable-default").
 */

export type SourceAuthority =
  | 'ČSSZ'
  | 'Finanční správa ČR'
  | 'Ministerstvo financí ČR'
  | 'MPSV'
  | 'VZP ČR'
  | 'Zákoník práce'
  | 'Sbírka zákonů'
  | 'portal.gov.cz';

export interface PayrollSource {
  id: string;
  authority: SourceAuthority;
  title: string;
  url: string;
  /** Statute paragraph / decree that is the legal basis. */
  legalBasis: string;
  /** ISO date the value was verified. */
  accessed: string;
  note?: string;
}

const ACCESSED = '2026-07-18';

export const PAYROLL_SOURCES: readonly PayrollSource[] = [
  {
    id: 'cssz-sazby-2026',
    authority: 'ČSSZ',
    title: 'Výše a sazba pojistného na sociální zabezpečení 2026',
    url: 'https://www.cssz.gov.cz/vyse-a-sazba',
    legalBasis: '§ 7 zákona č. 589/1992 Sb.',
    accessed: ACCESSED,
    note: 'Zaměstnanec 7,1 % (6,5 % důchodové + 0,6 % nemocenské); zaměstnavatel 24,8 % (21,5 % + 2,1 % + 1,2 %).',
  },
  {
    id: 'cssz-prehled-2026',
    authority: 'ČSSZ',
    title: 'Přehled nejdůležitějších údajů pro sociální zabezpečení v roce 2026',
    url: 'https://www.cssz.gov.cz/-/prehled-nejdulezitejsich-udaju-pro-socialni-zabezpeceni-v-roce-2026',
    legalBasis: 'nařízení vlády č. 365/2025 Sb.',
    accessed: ACCESSED,
    note: 'Všeobecný vyměřovací základ 46 278 Kč × přepočítací koeficient 1,0581 = průměrná mzda 48 967 Kč.',
  },
  {
    id: 'cssz-max-vz-2026',
    authority: 'ČSSZ',
    title: 'Maximální vyměřovací základ 2026',
    url: 'https://www.cssz.gov.cz/maximalni-vymerovaci-zaklad',
    legalBasis: '§ 15a zákona č. 589/1992 Sb.',
    accessed: ACCESSED,
    note: '48násobek průměrné mzdy = 2 350 416 Kč pro rok 2026 (roční, kumulativní).',
  },
  {
    id: 'cssz-zaokrouhleni',
    authority: 'ČSSZ',
    title: 'Výpočet pojistného – zaokrouhlování',
    url: 'https://www.cssz.gov.cz/vypocet-pojistneho',
    legalBasis: '§ 20 zákona č. 589/1992 Sb.',
    accessed: ACCESSED,
    note: 'Vyměřovací základy i pojistné se zaokrouhlují na celé koruny směrem nahoru.',
  },
  {
    id: 'vzp-vymerovaci-zaklad-2026',
    authority: 'VZP ČR',
    title: 'Vyměřovací základ a výpočet pojistného (zdravotní pojištění)',
    url: 'https://www.vzp.cz/platci/informace/zamestnavatel/vymerovaci-zaklad-a-vypocet-pojistneho',
    legalBasis: '§ 2, § 3 zákona č. 592/1992 Sb.',
    accessed: ACCESSED,
    note: 'Celkem 13,5 % (zaměstnanec 4,5 %, zaměstnavatel 9 %); bez maxima; minimální základ = minimální mzda 22 400 Kč; zaokrouhlení na celou korunu nahoru.',
  },
  {
    id: 'fs-danove-novinky-2026',
    authority: 'Finanční správa ČR',
    title: 'Daňové novinky pro rok 2026',
    url: 'https://financnisprava.gov.cz/cs/financni-sprava/media-a-verejnost/tiskove-zpravy-gfr/tiskove-zpravy-2026/danove-novinky-pro-rok-2026',
    legalBasis: '§ 16 zákona č. 586/1992 Sb.',
    accessed: ACCESSED,
    note: 'Sazba 15 % do 36násobku průměrné mzdy a 23 % nad tuto hranici.',
  },
  {
    id: 'fs-obecne-informace-zalohy',
    authority: 'Finanční správa ČR',
    title: 'Daň z příjmů – zaměstnanci a zaměstnavatelé, obecné informace',
    url: 'https://financnisprava.gov.cz/cs/dane/dane/dan-z-prijmu/zamestnanci-zamestnavatele/obecne-informace',
    legalBasis: '§ 38h zákona č. 586/1992 Sb.',
    accessed: ACCESSED,
    note: 'Měsíční limit pro 23 % = 146 901 Kč (2026). Základ nad 100 Kč se zaokrouhluje na celé stokoruny nahoru, záloha na celé koruny nahoru. Nerezident uplatní měsíčně jen základní slevu na poplatníka.',
  },
  {
    id: 'portal-slevy-2026',
    authority: 'portal.gov.cz',
    title: 'Daňové zvýhodnění a slevy na dani z příjmů (INF-410)',
    url: 'https://portal.gov.cz/informace/danove-zvyhodneni-a-slevy-na-dani-z-prijmu-INF-410',
    legalBasis: '§ 35ba, § 35c zákona č. 586/1992 Sb.',
    accessed: ACCESSED,
    note: 'Základní sleva 30 840 Kč/rok (2 570 Kč/měs); dítě 15 204 / 22 320 / 27 840 Kč/rok; invalidita 2 520 / 5 040 Kč/rok; ZTP/P 16 140 Kč/rok.',
  },
  {
    id: 'mf-zmeny-2024',
    authority: 'Ministerstvo financí ČR',
    title: 'Přehledně: které změny přinese rok 2024 (konsolidační balíček)',
    url: 'https://mf.gov.cz/cs/ministerstvo/media/tiskove-zpravy/2023/prehledne-ktere-zmeny-prinese-rok-2024-nejen-pro-o-54178',
    legalBasis: 'zákon č. 349/2023 Sb.',
    accessed: ACCESSED,
    note: 'Sleva na studenta zrušena od 2024; sleva na manžela/manželku omezena (péče o dítě do 3 let). Platí i pro 2026.',
  },
  {
    id: 'mpsv-minimalni-mzda-2026',
    authority: 'MPSV',
    title: 'Minimální mzda od ledna 2026 (informační leták)',
    url: 'https://mpsv.gov.cz/minimalni-mzda-od-ledna-2026-vzroste-o-1-600-korun-na-22-400-korun-mesicne',
    legalBasis: '§ 111 zákoníku práce; nařízení vlády č. 285/2024 Sb.; sdělení MPSV č. 356/2025 Sb.',
    accessed: ACCESSED,
    note: 'Minimální mzda 2026: 22 400 Kč/měs, 134,40 Kč/hod (40h týden). Zaručená mzda v soukromém sektoru zrušena od 2025.',
  },
  {
    id: 'zp-preplatky',
    authority: 'Zákoník práce',
    title: 'Příplatky ke mzdě – zákoník práce (zákon č. 262/2006 Sb.)',
    url: 'https://ppropo.mpsv.gov.cz/',
    legalBasis: '§ 114–118, § 78 zákona č. 262/2006 Sb.',
    accessed: ACCESSED,
    note: 'Přesčas +25 % (nebo náhradní volno); noc +10 %; So/Ne +10 %; svátek náhradní volno nebo +100 %; vše z průměrného výdělku. Ztížené prostředí ≥10 % minimální mzdy. Noční doba 22:00–06:00.',
  },
  {
    id: 'nv-365-2025',
    authority: 'Sbírka zákonů',
    title: 'Nařízení vlády č. 365/2025 Sb. (VVZ a přepočítací koeficient pro 2026)',
    url: 'https://www.zakonyprolidi.cz/cs/2025-365',
    legalBasis: 'nařízení vlády č. 365/2025 Sb.',
    accessed: ACCESSED,
    note: 'Stanovuje všeobecný vyměřovací základ 46 278 Kč a koeficient 1,0581 → průměrná mzda 48 967 Kč. Text zakonyprolidi.cz blokuje automatický přístup; hodnoty ověřeny na ČSSZ.',
  },
  {
    id: 'cz-vat-standard',
    authority: 'Finanční správa ČR',
    title: 'Sazby DPH (zákon č. 235/2004 Sb.)',
    url: 'https://financnisprava.gov.cz/cs/dane/dane/dan-z-pridane-hodnoty',
    legalBasis: '§ 47 zákona č. 235/2004 Sb.',
    accessed: ACCESSED,
    note: 'Základní sazba DPH 21 %. Přiřazení sazby k agenturní/personální službě závisí na konkrétní fakturaci a postavení plátce – v kalkulačce ponecháno jako editovatelný vstup (výchozí 21 %).',
  },
  {
    id: 'vyhlaska-125-1993-uraz',
    authority: 'Sbírka zákonů',
    title: 'Zákonné pojištění odpovědnosti zaměstnavatele za pracovní úraz / nemoc z povolání',
    url: 'https://www.zakonyprolidi.cz/cs/1993-125',
    legalBasis: 'vyhláška č. 125/1993 Sb.',
    accessed: ACCESSED,
    note: 'Sazba je odstupňována podle převažující činnosti zaměstnavatele (cca 0,28 %–5,04 %) – konkrétní sazbu pro rok 2026 nelze určit bez znalosti oboru, proto je v kalkulačce NEVYŘEŠENÁ a modelovaná jako volitelný vstup.',
  },
] as const;

export type PayrollSourceId = (typeof PAYROLL_SOURCES)[number]['id'];

const SOURCE_INDEX: ReadonlyMap<string, PayrollSource> = new Map(
  PAYROLL_SOURCES.map((s) => [s.id, s]),
);

export function getSource(id: PayrollSourceId): PayrollSource {
  const source = SOURCE_INDEX.get(id);
  if (!source) throw new Error(`payroll: unknown source id "${id}"`);
  return source;
}

export function hasSource(id: string): id is PayrollSourceId {
  return SOURCE_INDEX.has(id);
}
