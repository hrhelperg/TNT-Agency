// Phase 6 — Employer Intelligence geo expansion across the remaining Czech
// regions. Each region has a hand-written RegionProfile of real, qualitative
// economic characteristics (regional centre, sector mix, border/university/
// industry character) with NO invented numbers, rates, rankings or statistics.
// Two deterministic builders compose the cost page and the labor-market page
// from a profile, weaving the region-specific facts into the intro, the lead
// "regional context" section and the FAQ so each page carries genuinely
// distinct content. Shared mechanics (which are national rules, honestly the
// same everywhere) are phrased with regional framing and light A/B variation to
// avoid verbatim duplication. Pages remain structured SeoPage data objects.

import type { SeoPage } from '../seo-page'
import type { InternalLink } from '../types'
import { SRC } from '../sources'

const TODAY = '2026-05-25'
const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}
const faqHubLink: InternalLink = {
  href: '/faq-zamestnavani-pracovniku',
  label: 'Časté dotazy k zaměstnávání pracovníků',
}

export interface RegionProfile {
  /** URL-safe slug suffix without diacritics (e.g. 'jihomoravsky-kraj'). */
  slug: string
  /** Nominative name with correct diacritics (e.g. 'Jihomoravský kraj'). */
  name: string
  /** Locative phrase incl. preposition (e.g. 'v Jihomoravském kraji'). */
  inName: string
  /** True only for grammatically feminine names (Praha) — affects "spojován/a". */
  feminine?: boolean
  /** Sector list in instrumental case, to follow "tradičně spojován s …". */
  sectorsInstr: string
  /** One unique sentence describing the region (ends with a period). */
  character: string
  /** Optional cautious, region-specific nuance (ends with a period). */
  note?: string
  /**
   * Region-specific labour-supply character: commuting, borders, settlement
   * pattern, seasonality. Qualitative only — no numbers, rates or rankings.
   */
  workforce: string
  /** Roles employers in the region most commonly staff. Qualitative only. */
  staffingFocus: string
  /** Extra cluster links (e.g. to existing geo pages for Praha / Brno). */
  relatedGeo?: InternalLink[]
}

// ── Region registry — qualitative facts only, no numbers/rankings ───────────
export const REGION_PROFILES: ReadonlyArray<RegionProfile> = [
  {
    slug: 'praha',
    workforce: 'Do Prahy denně dojíždí značná část pracovní síly ze Středočeského kraje, takže zaměstnavatelé soutěží o tytéž kandidáty.',
    staffingFocus: 'Nejčastěji se obsazují pozice ve službách, v logistice a skladech v okolí města a v gastronomii.',
    name: 'Praha',
    inName: 'v Praze',
    feminine: true,
    sectorsInstr: 'službami, informačními technologiemi, financemi, cestovním ruchem a veřejnou správou',
    character: 'Praha je největším a oborově nejrozmanitějším trhem práce v České republice.',
    note: 'Vysoká koncentrace zaměstnavatelů obvykle znamená silnou konkurenci o kandidáty.',
    relatedGeo: [
      { href: '/agentura-prace-praha', label: 'Agentura práce v Praze' },
      { href: '/prace-pro-cizince-praha', label: 'Práce pro cizince v Praze' },
    ],
  },
  {
    slug: 'jihomoravsky-kraj',
    workforce: 'Brno je univerzitním centrem, takže na trh pravidelně vstupují absolventi, zároveň je o ně silná konkurence.',
    staffingFocus: 'Obsazují se pozice ve výzkumu a IT, ve strojírenství a sezónně v zemědělství a vinařství.',
    name: 'Jihomoravský kraj',
    inName: 'v Jihomoravském kraji',
    sectorsInstr: 'informačními technologiemi, výzkumem, strojírenstvím a službami',
    character: 'Jihomoravský kraj s centrem v Brně patří k významným technologickým, univerzitním a výzkumným regionům.',
    note: 'Silné univerzitní a výzkumné zázemí může ovlivňovat poptávku po kvalifikovaných profesích.',
    relatedGeo: [
      { href: '/agentura-prace-brno', label: 'Agentura práce v Brně' },
      { href: '/prace-pro-cizince-brno', label: 'Práce pro cizince v Brně' },
    ],
  },
  {
    slug: 'moravskoslezsky-kraj',
    workforce: 'Jde o velký, ale nerovnoměrný trh práce, který dlouhodobě prochází restrukturalizací tradičních odvětví.',
    staffingFocus: 'Obsazují se pozice v hutnictví a navazující výrobě, v automobilovém průmyslu a v logistice.',
    name: 'Moravskoslezský kraj',
    inName: 'v Moravskoslezském kraji',
    sectorsInstr: 'průmyslem, strojírenstvím, energetikou a navazujícími službami',
    character: 'Moravskoslezský kraj s centrem v Ostravě je historicky spojen s těžkým průmyslem a postupně prochází strukturální proměnou.',
    note: 'Útlum tradičních odvětví a nástup nových oborů může ovlivňovat strukturu poptávky po pracovní síle.',
  },
  {
    slug: 'olomoucky-kraj',
    workforce: 'Mezi Olomoucí a periferními oblastmi Jesenicka jsou v dostupnosti pracovní síly znatelné rozdíly.',
    staffingFocus: 'Nejčastěji se obsazuje strojírenská a potravinářská výroba a zemědělské pozice.',
    name: 'Olomoucký kraj',
    inName: 'v Olomouckém kraji',
    sectorsInstr: 'výrobou, potravinářstvím, zemědělstvím a službami',
    character: 'Olomoucký kraj s centrem v Olomouci kombinuje zemědělství a potravinářství s výrobou a má i univerzitní zázemí.',
    note: 'Region zahrnuje městské i venkovské oblasti s odlišnou dostupností pracovní síly.',
  },
  {
    slug: 'zlinsky-kraj',
    workforce: 'Kraj má silnou vazbu na tradiční průmyslové obory soustředěné kolem Zlína.',
    staffingFocus: 'Typicky jde o gumárenskou a plastikářskou výrobu, strojírenství a leteckou výrobu na Uherskohradišťsku.',
    name: 'Zlínský kraj',
    inName: 've Zlínském kraji',
    sectorsInstr: 'zpracovatelským a strojírenským průmyslem a službami',
    character: 'Zlínský kraj s centrem ve Zlíně má dlouhou výrobní a zpracovatelskou tradici.',
    note: 'Region je spojován mimo jiné s plastikářským, gumárenským a strojírenským průmyslem.',
  },
  {
    slug: 'vysocina',
    workforce: 'Osídlení je rozptýlené do menších obcí, takže doprava na pracoviště bývá při náboru zásadní téma.',
    staffingFocus: 'Nejčastěji jde o strojírenství, výrobu automobilových komponent, dřevozpracující obory a zemědělství.',
    name: 'Kraj Vysočina',
    inName: 'v Kraji Vysočina',
    sectorsInstr: 'výrobou, strojírenstvím, zemědělstvím a logistikou',
    character: 'Kraj Vysočina s centrem v Jihlavě leží mezi Prahou a Brnem a má významnou výrobní a zemědělskou základnu.',
    note: 'Poloha na hlavní dopravní ose mezi Prahou a Brnem může ovlivňovat logistiku i dostupnost pracovní síly.',
  },
  {
    slug: 'jihocesky-kraj',
    workforce: 'Osídlení je rozptýlené a dojezdové vzdálenosti bývají delší; blízkost rakouských hranic rozšiřuje možnosti kandidátů.',
    staffingFocus: 'Nejčastěji jde o strojírenství, potravinářskou výrobu a sezónní pozice navázané na cestovní ruch.',
    name: 'Jihočeský kraj',
    inName: 'v Jihočeském kraji',
    sectorsInstr: 'výrobou, zemědělstvím, potravinářstvím a cestovním ruchem',
    character: 'Jihočeský kraj s centrem v Českých Budějovicích kombinuje výrobu a zemědělství s cestovním ruchem.',
    note: 'Příhraniční poloha u Rakouska může podle dostupných údajů ovlivňovat dostupnost pracovní síly.',
  },
  {
    slug: 'plzensky-kraj',
    workforce: 'Bavorské příhraničí znamená, že o část pracovní síly soutěží i zaměstnavatelé za hranicí.',
    staffingFocus: 'Obsazují se zejména pozice v automobilovém průmyslu, strojírenství a v logistice u dálničního koridoru.',
    name: 'Plzeňský kraj',
    inName: 'v Plzeňském kraji',
    sectorsInstr: 'strojírenstvím, výrobou, potravinářstvím a logistikou',
    character: 'Plzeňský kraj s centrem v Plzni má silnou průmyslovou a strojírenskou tradici.',
    note: 'Blízkost německého trhu práce může podle dostupných údajů ovlivňovat dostupnost pracovní síly.',
  },
  {
    slug: 'karlovarsky-kraj',
    workforce: 'Jde o menší trh práce s výraznou sezónností navázanou na lázeňství a s blízkostí německých hranic.',
    staffingFocus: 'Poptávka se soustředí na lázeňské a ubytovací služby, sklářskou a porcelánovou výrobu a lehkou výrobu.',
    name: 'Karlovarský kraj',
    inName: 'v Karlovarském kraji',
    sectorsInstr: 'lázeňstvím, cestovním ruchem, sklářstvím a výrobou',
    character: 'Karlovarský kraj s centrem v Karlových Varech je spojován především s lázeňstvím a cestovním ruchem.',
    note: 'Menší a specificky zaměřený trh práce může mít odlišnou strukturu poptávky než větší regiony.',
  },
  {
    slug: 'ustecky-kraj',
    workforce: 'Kraj zahrnuje strukturálně postižené oblasti a rozdíly mezi okresy bývají výrazné.',
    staffingFocus: 'Obsazují se především pozice v chemii, energetice a v logistice.',
    name: 'Ústecký kraj',
    inName: 'v Ústeckém kraji',
    sectorsInstr: 'průmyslem, chemickým průmyslem, energetikou a výrobou',
    character: 'Ústecký kraj s centrem v Ústí nad Labem je historicky spojen s průmyslem, energetikou a chemickou výrobou a prochází strukturální proměnou.',
    note: 'Příhraniční poloha u Německa a útlum tradičních odvětví mohou ovlivňovat trh práce.',
  },
  {
    slug: 'liberecky-kraj',
    workforce: 'Kraj sousedí s Německem i Polskem, což ovlivňuje nabídku práce i očekávání kandidátů.',
    staffingFocus: 'Nejčastěji jde o výrobu automobilových komponent a o sklářskou a bižuterní výrobu na Jablonecku.',
    name: 'Liberecký kraj',
    inName: 'v Libereckém kraji',
    sectorsInstr: 'zpracovatelským průmyslem, strojírenstvím a službami',
    character: 'Liberecký kraj s centrem v Liberci má v severních Čechách dlouhou výrobní tradici.',
    note: 'Příhraniční poloha u Německa a Polska může ovlivňovat dostupnost pracovní síly.',
  },
]

const spojovan = (p: RegionProfile): string => (p.feminine ? 'spojována' : 'spojován')
const regionalContext = (p: RegionProfile): string =>
  `${p.name} je tradičně ${spojovan(p)} s ${p.sectorsInstr}.${p.note ? ` ${p.note}` : ''}`


/**
 * Region-specific section. This is what makes each regional page genuinely
 * different rather than a name-swapped template: the labour-supply character
 * and the roles actually staffed there. Qualitative only — no invented
 * numbers, shortage counts, salaries or rankings.
 */
const regionalWorkforceSection = (p: RegionProfile, v: number) => ({
  heading: `Dostupnost pracovníků ${p.inName}`,
  body:
    v === 0
      ? [
          `${p.workforce} Právě tyto lokální podmínky, nikoli celostátní pravidla, rozhodují o tom, jak rychle se daří pozice obsadit.`,
          `${p.staffingFocus} Pro plánování náboru je proto užitečné vycházet z toho, jaké profese jsou ${p.inName} skutečně poptávané a s kým o ně soutěžíte.`,
        ]
      : [
          `${p.staffingFocus} Struktura poptávky se promítá do toho, jak dlouho obsazení trvá a jaké podmínky je potřeba nabídnout.`,
          `${p.workforce} Tyto okolnosti se liší region od regionu, zatímco odvodová a pracovněprávní pravidla jsou stejná v celé ČR.`,
        ],
  bullets: [
    `Odkud pracovníci na pracoviště dojíždějí a jak daleko.`,
    `Které profese jsou ${p.inName} nejvíce poptávané.`,
    `Kteří další zaměstnavatelé o stejné kandidáty soutěží.`,
    `Zda je potřeba řešit dopravu na pracoviště nebo ubytování.`,
  ],
})

// ── TYPE A: employer cost page ──────────────────────────────────────────────
export const buildRegionCostPage = (p: RegionProfile, i: number): SeoPage => {
  const v = i % 2
  const intro =
    v === 0
      ? `Pro zaměstnavatele ${p.inName} je dobrý odhad nákladů na zaměstnance základem udržitelného rozpočtu i konkurenceschopné nabídky. ${p.character} ${p.workforce} Celkové náklady přitom přesahují samotnou hrubou mzdu – tvoří je povinné odvody a podle situace i další přímé a nepřímé položky. Tato stránka shrnuje, z čeho se náklady skládají a na co myslet při plánování. Konkrétní procentní sazby a částky neuvádíme; mění se a je nutné je ověřit u oficiálních institucí.`
      : `Náklady na zaměstnance jsou ${p.inName} stejně jako jinde v ČR vyšší než samotná hrubá mzda – k mzdě se připojují povinné odvody a podle situace další položky. ${p.character} ${p.staffingFocus} Tato stránka pomáhá zaměstnavatelům udělat si strukturovanou představu o jednotlivých složkách ceny práce. Konkrétní sazby a částky záměrně neuvádíme, protože se mění; ověřte je u ČSSZ, zdravotních pojišťoven a finanční správy.`

  const mzdaSection =
    v === 0
      ? [
          'Hrubá mzda je jen výchozím bodem. K ní se připojují povinné odvody zaměstnavatele na sociální a zdravotní pojištění počítané z vyměřovacího základu podle platných sazeb.',
          `Celková cena práce ${p.inName} se proto odvíjí od aktuálních sazeb, které tato stránka neuvádí. Závazné hodnoty zveřejňují ČSSZ, zdravotní pojišťovny a finanční správa.`,
        ]
      : [
          `Celková cena práce ${p.inName} přesahuje hrubou mzdu o povinné odvody zaměstnavatele na sociální a zdravotní pojištění; ty se počítají z vyměřovacího základu podle zákonem stanovených sazeb.`,
          'Pro odhad je proto třeba vyjít z aktuálních sazeb, které se mohou meziročně měnit. Tato stránka je neuvádí – závazné hodnoty zveřejňují ČSSZ, zdravotní pojišťovny a finanční správa.',
        ]

  return {
    slug: `naklady-na-zamestnance-${p.slug}`,
    breadcrumbLabel: `Náklady na zaměstnance ${p.inName}`,
    eyebrow: `Náklady · ${p.name}`,
    title: `Náklady na zaměstnance ${p.inName}: přehled pro zaměstnavatele`,
    heroSubtitle: `Z čeho se skládají náklady na zaměstnance pro zaměstnavatele ${p.inName} – rozdíl mezi mzdou a celkovou cenou práce, nábor, dokumentace a nákladová logika agentury. Bez konkrétních sazeb.`,
    description: `Náklady na zaměstnance ${p.inName} z pohledu zaměstnavatele – mzda vs. celková cena práce, sociální a zdravotní pojištění, nábor, dokumentace a agenturní zaměstnávání. Konkrétní sazby u ČSSZ a finanční správy.`,
    keywords: [
      `náklady na zaměstnance ${p.name}`,
      `cena práce ${p.name}`,
      `mzdové náklady ${p.name}`,
      `zaměstnavatel ${p.name}`,
      'agenturní zaměstnávání náklady',
      'odvody zaměstnavatel',
    ],
    intro,
    sections: [
      {
        heading: `Náklady na zaměstnance ${p.inName}`,
        body: [
          `Pravidla pro odvody a pracovní právo jsou celostátní, takže se ${p.inName} neliší od zbytku republiky. Lokální je dostupnost kandidátů a konkurence o pracovní sílu.`,
          `${regionalContext(p)} Tato struktura se promítá do toho, po jakých profesích je poptávka a jak náročné je je obsadit.`,
        ],
      },
      regionalWorkforceSection(p, v),
      {
        heading: 'Mzda versus celková cena práce',
        body: mzdaSection,
      },
      {
        heading: 'Sociální a zdravotní pojištění – pracujte s aktuálními sazbami',
        body: [
          'Odvody na sociální a zdravotní pojištění tvoří podstatnou část nákladů nad rámec mzdy. Jejich výše se odvíjí od vyměřovacího základu a sazeb, které se mohou meziročně měnit.',
          'Doporučujeme nevycházet z paměti ani z orientačních čísel, ale z aktuálních údajů ČSSZ a zdravotních pojišťoven, případně z výpočtu mzdové účetní.',
        ],
      },
      {
        heading: 'Náklady na nábor, nástup a dokumentaci',
        body: [
          'Před nástupem vznikají náklady na inzerci, výběr a administrativu pracovního poměru. U zahraničních pracovníků k nim přistupuje administrativa spojená s pobytovými a pracovními oprávněními, která může nábor prodloužit.',
          'Po nástupu je třeba počítat se vstupním školením BOZP a se zaškolením na konkrétní práci. Tyto položky se v krátkém období sčítají, proto je vhodné je v rozpočtu zviditelnit.',
        ],
        bullets: [
          'Inzerce, výběr a předvýběr kandidátů',
          'Administrativa pracovního poměru a u cizinců oprávnění',
          'Vstupní školení BOZP a zaškolení',
          'Případné náklady na zázemí (doprava, ubytování)',
        ],
      },
      {
        heading: 'Agenturní zaměstnávání a soulad s předpisy',
        body: [
          'U agenturního zaměstnávání nese mzdovou a personální administrativu pracovní agentura jako formální zaměstnavatel; náklad pro uživatele má obvykle podobu sjednané ceny za přidělení. Model může pomoci pružně reagovat na sezónní a projektové výkyvy poptávky.',
          'Z hlediska souladu s předpisy platí požadavek srovnatelných mzdových a pracovních podmínek agenturního pracovníka s kmenovými zaměstnanci uživatele a společná odpovědnost agentury a uživatele za BOZP. Tyto povinnosti je vhodné mít smluvně jasně ošetřené.',
        ],
      },
    ],
    faq: [
      {
        q: `Jsou náklady na zaměstnance ${p.inName} jiné než jinde v ČR?`,
        a: `Pravidla pro odvody a pracovní právo jsou celostátní a ${p.inName} se neliší. Lokální je dostupnost kandidátů a konkurence o pracovní sílu, která ovlivňuje nabízenou mzdu a náklady na nábor.`,
      },
      {
        q: 'Kolik činí odvody zaměstnavatele?',
        a: 'Konkrétní procentní sazby tato stránka neuvádí, protože se mohou měnit. Aktuální hodnoty zveřejňují ČSSZ, zdravotní pojišťovny a finanční správa; pro přesný výpočet doporučujeme mzdovou účetní.',
      },
      {
        q: 'Které náklady se nejčastěji opomíjejí?',
        a: 'Bývají to nepřímé náklady – nábor, zaškolení, BOZP a zázemí. V rozpočtu je vhodné je zviditelnit vedle mzdy a odvodů, aby celková cena práce odpovídala realitě.',
      },
      {
        q: 'Jak do nákladů promítnout agenturní zaměstnávání?',
        a: 'Náklad má obvykle podobu sjednané ceny za přidělení, která zahrnuje mzdu, odvody a administrativu nesené agenturou. Platí přitom požadavek srovnatelných podmínek s kmenovými zaměstnanci.',
      },
    ],
    sources: [SRC.zakonSocialni, SRC.zakonZdravotni, SRC.cssz, SRC.financniSprava, SRC.vzp],
    internalLinks: [
      { href: '/naklady-na-zamestnance-cr', label: 'Náklady na zaměstnance v ČR (obecně)' },
      { href: `/trh-prace-${p.slug}`, label: `Trh práce ${p.inName}` },
      { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
      { href: '/povinnosti-zamestnavatele', label: 'Povinnosti zaměstnavatele' },
      ...(p.relatedGeo ?? []),
      faqHubLink,
    ],
    cta: {
      eyebrow: `Nábor · ${p.name}`,
      title: `Plánujete nábor ${p.inName}?`,
      text: 'Pomůžeme vám odhadnout náklady a zajistit pracovníky tak, aby rozpočet i nábor dávaly ekonomický smysl.',
      buttonLabel: 'Domluvit konzultaci',
      href: '/contact',
    },
    meta,
    datePublished: TODAY,
    dateModified: TODAY,
  }
}

// ── TYPE B: labor-market page ───────────────────────────────────────────────
export const buildRegionLaborPage = (p: RegionProfile, i: number): SeoPage => {
  const v = i % 2
  const intro =
    v === 0
      ? `${p.character} ${p.workforce} Pro zaměstnavatele je užitečné rozumět regionálnímu kontextu, ten se ale opírá o aktuální data, která se mění. Tato stránka shrnuje trh práce ${p.inName} z pohledu zaměstnavatele kvalitativně a u konkrétních čísel – jako je míra nezaměstnanosti, počty volných míst nebo mzdové úrovně – odkazuje na oficiální statistiky ČSÚ a Úřadu práce ČR. Konkrétní regionální údaje záměrně neuvádíme.`
      : `Trh práce ${p.inName} má svá specifika v dostupnosti kandidátů. ${p.character} ${p.staffingFocus} Tato stránka popisuje regionální kontext z pohledu zaměstnavatele kvalitativně; konkrétní čísla, jako je míra nezaměstnanosti nebo počty volných míst, se mění a zveřejňují je ČSÚ a Úřad práce ČR. Záměrně je proto neuvádíme, abychom nezobrazovali neaktuální údaje.`

  const challenges =
    v === 0
      ? [
          'Mezi obvyklé výzvy patří delší čas na obsazení vybraných pozic, u některých profesí omezená dostupnost kvalifikované pracovní síly a potřeba oslovit kandidáty i mimo bezprostřední okolí.',
          'Míra těchto výzev se podle dostupných údajů liší podle oboru a v čase. Pro aktuální obraz doporučujeme regionální data Úřadu práce ČR a ČSÚ.',
        ]
      : [
          'Náborové výzvy se mohou týkat delšího času na obsazení pozic, konkurence o kandidáty i omezené dostupnosti některých profesí. Situace se může lišit podle oblasti a oboru.',
          'Pro aktuální obraz doporučujeme vycházet z regionálních dat Úřadu práce ČR a ČSÚ; tato stránka konkrétní čísla neuvádí.',
        ]

  return {
    slug: `trh-prace-${p.slug}`,
    breadcrumbLabel: `Trh práce ${p.inName}`,
    eyebrow: `Trh práce · ${p.name}`,
    title: `Trh práce ${p.inName}: přehled pro zaměstnavatele`,
    heroSubtitle: `Přehled trhu práce ${p.inName} z pohledu zaměstnavatele – regionální kontext, náborové výzvy a význam zahraničních pracovníků. Bez vymyšlených regionálních čísel.`,
    description: `Trh práce ${p.inName} z pohledu zaměstnavatele – regionální kontext, náborové výzvy, role zahraničních pracovníků a praktické úvahy při náboru. Konkrétní data u ČSÚ a ÚP ČR.`,
    keywords: [
      `trh práce ${p.name}`,
      `práce ${p.name}`,
      `zaměstnavatel ${p.name}`,
      `nábor ${p.name}`,
      'zahraniční pracovníci',
      'regionální trh práce',
    ],
    intro,
    sections: [
      {
        heading: `Trh práce ${p.inName}`,
        body: [
          `${regionalContext(p)} Tato struktura se promítá do spektra obsazovaných pozic – od provozních po kvalifikované.`,
          'Konkrétní strukturu zaměstnanosti, míru nezaměstnanosti a další ukazatele zveřejňuje Český statistický úřad a Úřad práce ČR. Tato stránka tyto údaje neuvádí, aby nezobrazovala neaktuální čísla.',
        ],
      },
      regionalWorkforceSection(p, (i + 1) % 2),
      {
        heading: 'Pohled zaměstnavatele',
        body: [
          'Pro zaměstnavatele je podstatná dostupnost kandidátů s potřebnou kvalifikací a konkurence o pracovní sílu. Pravidla pro zaměstnávání, odvody a oprávnění jsou přitom celostátní a v regionu se neliší.',
          'Regionální rozměr se proto týká hlavně náboru a zázemí – kde a jak hledat kandidáty a jaké podmínky nabídnout, aby byly konkurenceschopné.',
        ],
      },
      {
        heading: 'Náborové výzvy',
        body: challenges,
      },
      {
        heading: 'Význam zahraničních pracovníků',
        body: [
          'Zahraniční pracovníci mohou pomoci doplnit chybějící kapacitu tam, kde na domácím trhu chybí. U občanů třetích zemí je ale nutné počítat s pravidly pro pobytová a pracovní oprávnění.',
          'Pro plánování je proto klíčové předem vědět, zda pracovník má volný vstup na trh práce, nebo potřebuje oprávnění, a podle toho nastavit harmonogram.',
        ],
      },
      {
        heading: 'Praktické úvahy při náboru',
        body: [
          `Následující body pomáhají převést regionální kontext do konkrétních kroků při náboru ${p.inName}.`,
        ],
        bullets: [
          'Plánovat nábor s předstihem a počítat se zaškolením',
          'Zvážit oslovení kandidátů i mimo bezprostřední okolí',
          'Nabídnout konkurenceschopné a transparentní podmínky',
          'U zahraničních pracovníků počítat s časem na oprávnění a zázemí',
          'Vycházet z aktuálních regionálních dat ČSÚ a ÚP ČR',
        ],
      },
    ],
    faq: [
      {
        q: `Jaká je nezaměstnanost ${p.inName}?`,
        a: 'Konkrétní míru nezaměstnanosti tato stránka neuvádí, protože se mění. Aktuální regionální údaje zveřejňuje Český statistický úřad a Úřad práce ČR.',
      },
      {
        q: `Které obory ${p.inName} nejčastěji nabírají?`,
        a: `Region je tradičně ${spojovan(p)} s ${p.sectorsInstr}. Konkrétní strukturu poptávky a volných míst zveřejňují ČSÚ a Úřad práce ČR.`,
      },
      {
        q: 'Liší se pravidla zaměstnávání v regionu od zbytku ČR?',
        a: 'Ne. Pravidla pro odvody, oprávnění a pracovní právo jsou celostátní. Regionální je dostupnost kandidátů a konkurence o pracovní sílu.',
      },
      {
        q: 'Jak v regionu řešit nedostatek pracovníků?',
        a: 'Pomáhá plánovat nábor s předstihem, oslovit kandidáty i mimo okolí, nabídnout konkurenceschopné podmínky a případně zapojit zahraniční pracovníky s ohledem na pravidla oprávnění.',
      },
    ],
    sources: [SRC.czso, SRC.upcr, SRC.mpsv],
    internalLinks: [
      { href: `/naklady-na-zamestnance-${p.slug}`, label: `Náklady na zaměstnance ${p.inName}` },
      { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
      { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' },
      { href: '/pracovni-povoleni-cr', label: 'Pracovní povolení v ČR' },
      { href: '/nedostatek-pracovniku-v-cr', label: 'Nedostatek pracovníků v ČR' },
      ...(p.relatedGeo ?? []),
      faqHubLink,
    ],
    cta: {
      eyebrow: `Nábor · ${p.name}`,
      title: `Nabíráte ${p.inName}?`,
      text: 'Pomůžeme vám zorientovat se v regionálním náboru a zajistit pracovníky včetně koordinace administrativy u cizinců.',
      buttonLabel: 'Poslat poptávku',
      href: '/submit-offer',
    },
    meta,
    datePublished: TODAY,
    dateModified: TODAY,
  }
}

// All 22 region pages (cost + labor for each profile), in registry order.
export const REGION_PAGES: ReadonlyArray<SeoPage> = REGION_PROFILES.flatMap((p, i) => [
  buildRegionCostPage(p, i),
  buildRegionLaborPage(p, i),
])

// Flat link list for the FAQ hub (links to every region page).
export const REGION_FAQ_LINKS: ReadonlyArray<InternalLink> = REGION_PROFILES.flatMap((p) => [
  { href: `/naklady-na-zamestnance-${p.slug}`, label: `Náklady na zaměstnance ${p.inName}` },
  { href: `/trh-prace-${p.slug}`, label: `Trh práce ${p.inName}` },
])
