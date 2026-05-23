// Phase 4 — Employer Intelligence Layer. High-intent, employer-oriented Czech
// labor-market pages for B2B lead generation and topical authority. Content is
// qualitative and source-backed: no invented salary data, shortage numbers,
// unemployment rates or regional statistics. Where hard data would be needed,
// the text uses cautious language and defers to ČSÚ, MPSV and Úřad práce ČR.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-05-23'
const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}
const faqHubLink = {
  href: '/faq-zamestnavani-pracovniku',
  label: 'Časté dotazy k zaměstnávání pracovníků',
}

export const NAKLADY_NA_ZAMESTNANCE_PARDUBICE: SeoPage = {
  slug: 'naklady-na-zamestnance-pardubice',
  breadcrumbLabel: 'Náklady na zaměstnance v Pardubicích',
  eyebrow: 'Náklady · Pardubice',
  title: 'Náklady na zaměstnance v Pardubicích: co musí zaměstnavatel zohlednit',
  heroSubtitle:
    'Praktický přehled nákladů na zaměstnance pro pardubické zaměstnavatele – přímé i nepřímé náklady, rozdíl mezi mzdou a celkovou cenou práce a nákladová logika agenturního zaměstnávání. Bez konkrétních sazeb.',
  description:
    'Náklady na zaměstnance v Pardubicích z pohledu zaměstnavatele – přímé a nepřímé náklady, mzda vs. celková cena práce, nábor, dokumentace a agenturní zaměstnávání. Konkrétní sazby u ČSSZ a finanční správy.',
  keywords: [
    'náklady na zaměstnance Pardubice',
    'cena práce Pardubice',
    'mzdové náklady Pardubice',
    'zaměstnavatel Pardubice',
    'agenturní zaměstnávání náklady',
    'odvody zaměstnavatel',
  ],
  intro:
    'Pro zaměstnavatele v Pardubicích a okolí je dobrý odhad nákladů na zaměstnance základem zdravého rozpočtu i konkurenceschopné nabídky. Celkové náklady jsou přitom vyšší než samotná hrubá mzda – tvoří je povinné odvody a podle situace i další přímé a nepřímé položky. Tato stránka shrnuje, z čeho se náklady skládají a na co je vhodné myslet při plánování, včetně nákladové logiky agenturního zaměstnávání. Konkrétní procentní sazby a částky záměrně neuvádíme; mění se a je nutné je ověřit u oficiálních institucí.',
  sections: [
    {
      heading: 'Náklady z pohledu pardubického zaměstnavatele',
      body: [
        'Pravidla pro odvody a pracovní právo jsou celostátní, takže se v Pardubicích neliší od zbytku republiky. Lokální je především dostupnost kandidátů a konkurence o pracovní sílu, která se promítá do nabízené mzdy a do nákladů na nábor.',
        'Při plánování se vyplatí oddělit jednorázové náklady (nábor, nástup) od opakovaných (mzda, odvody, provoz) a počítat s rezervou na meziroční změny sazeb a minimální mzdy.',
      ],
    },
    {
      heading: 'Přímé a nepřímé náklady',
      body: [
        'Přímé náklady jsou ty, které přímo souvisejí s odměnou za práci – hrubá mzda a povinné odvody zaměstnavatele. Nepřímé náklady stojí mimo výplatní pásku, ale s výkonem práce souvisejí.',
        'Poměr přímých a nepřímých nákladů se liší podle oboru a pozice. U provozních a sezónních pozic mohou hrát větší roli náklady na nábor a zaškolení, u kvalifikovaných pozic náklady na udržení pracovníka.',
      ],
      bullets: [
        'Přímé: hrubá mzda a povinné odvody zaměstnavatele',
        'Nepřímé: BOZP, ochranné pomůcky a vstupní školení',
        'Nepřímé: nábor, výběr a adaptace',
        'Nepřímé: případné benefity, stravování, doprava nebo ubytování',
      ],
    },
    {
      heading: 'Hrubá mzda vs. celková cena práce',
      body: [
        'Hrubá mzda je východiskem, nikoli celkovým nákladem. K ní se připojují odvody zaměstnavatele na sociální a zdravotní pojištění, počítané z vyměřovacího základu podle zákonem stanovených sazeb.',
        'Pro odhad celkové ceny práce je proto třeba vyjít z aktuálních sazeb. Tato stránka konkrétní procenta neuvádí – aktuální hodnoty zveřejňují ČSSZ, zdravotní pojišťovny a finanční správa.',
      ],
    },
    {
      heading: 'Sociální a zdravotní pojištění – opatrně se sazbami',
      body: [
        'Sociální a zdravotní pojištění tvoří podstatnou část nákladů zaměstnavatele nad rámec mzdy. Přesná výše se odvíjí od vyměřovacího základu a platných sazeb, které se mohou meziročně měnit.',
        'Doporučujeme nepracovat s pamětí ani s orientačními čísly z internetu, ale vždy s aktuálními údaji ČSSZ a zdravotních pojišťoven, případně s mzdovou účetní.',
      ],
    },
    {
      heading: 'Náklady na nábor, nástup a dokumentaci',
      body: [
        'Před samotným nástupem vznikají náklady na inzerci, výběr a administrativu. U zahraničních pracovníků k nim přistupuje administrativa spojená s oprávněními a dokumentací, která může nábor prodloužit.',
        'Po nástupu je třeba počítat se vstupním školením BOZP, případně se zaškolením na konkrétní práci. Tyto položky se v krátkodobém horizontu sčítají, proto je vhodné je v rozpočtu zviditelnit.',
      ],
      bullets: [
        'Inzerce, výběr a předvýběr kandidátů',
        'Administrativa pracovního poměru a u cizinců oprávnění',
        'Vstupní školení BOZP a zaškolení',
        'Případné náklady na zázemí (ubytování, doprava)',
      ],
    },
    {
      heading: 'Nákladová logika agenturního zaměstnávání',
      body: [
        'U agenturního zaměstnávání je formálním zaměstnavatelem pracovní agentura, která nese mzdovou a personální administrativu. Náklad pro uživatele má obvykle podobu sjednané ceny za přidělení, jež tyto položky zahrnuje.',
        'Tento model může zjednodušit plánování u sezónních a projektových potřeb, protože část variabilních nákladů a administrativy přechází na agenturu. U agenturního zaměstnávání zároveň platí požadavek srovnatelných mzdových a pracovních podmínek s kmenovými zaměstnanci uživatele.',
      ],
    },
  ],
  faq: [
    {
      q: 'Jsou náklady na zaměstnance v Pardubicích jiné než jinde v ČR?',
      a: 'Pravidla pro odvody a pracovní právo jsou celostátní a v Pardubicích se neliší. Lokální je dostupnost kandidátů a konkurence o pracovní sílu, která ovlivňuje nabízenou mzdu a náklady na nábor.',
    },
    {
      q: 'Kolik činí odvody zaměstnavatele?',
      a: 'Konkrétní procentní sazby tato stránka neuvádí, protože se mohou měnit. Aktuální hodnoty zveřejňují ČSSZ, zdravotní pojišťovny a finanční správa. Pro přesný výpočet doporučujeme mzdovou účetní.',
    },
    {
      q: 'Jak do nákladů promítnout agenturní zaměstnávání?',
      a: 'U agenturního zaměstnávání má náklad obvykle podobu sjednané ceny za přidělení, která zahrnuje mzdu, odvody a administrativu nesené agenturou. Platí přitom požadavek srovnatelných podmínek s kmenovými zaměstnanci.',
    },
    {
      q: 'Které náklady se nejčastěji opomíjejí?',
      a: 'Bývají to nepřímé náklady – nábor, zaškolení, BOZP a zázemí. V rozpočtu je vhodné je zviditelnit vedle mzdy a odvodů, aby celková cena práce odpovídala realitě.',
    },
  ],
  sources: [SRC.zakonSocialni, SRC.zakonZdravotni, SRC.cssz, SRC.financniSprava, SRC.vzp],
  internalLinks: [
    { href: '/naklady-na-zamestnance-cr', label: 'Náklady na zaměstnance v ČR (obecně)' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    { href: '/povinnosti-zamestnavatele', label: 'Povinnosti zaměstnavatele' },
    faqHubLink,
  ],
  cta: {
    eyebrow: 'Nábor v Pardubicích',
    title: 'Plánujete nábor v Pardubickém regionu?',
    text: 'Pomůžeme vám odhadnout náklady a zajistit pracovníky tak, aby rozpočet i nábor dávaly ekonomický smysl.',
    buttonLabel: 'Domluvit konzultaci',
    href: '/contact',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NEDOSTATEK_PRACOVNIKU_V_CR: SeoPage = {
  slug: 'nedostatek-pracovniku-v-cr',
  breadcrumbLabel: 'Nedostatek pracovníků v ČR',
  eyebrow: 'Trh práce · Intelligence',
  title: 'Nedostatek pracovníků v ČR: co to znamená pro zaměstnavatele',
  heroSubtitle:
    'Co pro zaměstnavatele znamená nedostatek pracovníků na českém trhu práce, proč může nábor trvat déle a jak na situaci reagovat. Opatrný, zdrojově podložený pohled bez vymyšlených čísel.',
  description:
    'Nedostatek pracovníků v ČR z pohledu zaměstnavatele – co to znamená v praxi, proč nábor často trvá déle, role zahraničních pracovníků a checklist plánování. Bez vymyšlených statistik.',
  keywords: [
    'nedostatek pracovníků ČR',
    'nedostatek pracovní síly',
    'trh práce ČR',
    'nábor pracovníků',
    'zahraniční pracovníci',
    'plánování pracovní síly',
  ],
  intro:
    'Téma nedostatku pracovníků se na českém trhu práce objevuje opakovaně a pro řadu zaměstnavatelů znamená, že obsazení pozic je náročnější a trvá déle než dříve. Skutečná míra napětí na trhu se přitom v čase i mezi regiony a obory liší. Tato stránka vysvětluje, co nedostatek pracovníků v praxi znamená pro zaměstnavatele a jak na něj lze reagovat, a u konkrétních údajů odkazuje na oficiální statistiky. Pracuje záměrně s opatrným jazykem a neuvádí konkrétní čísla, která by mohla být neaktuální.',
  sections: [
    {
      heading: 'Co znamená nedostatek pracovníků',
      body: [
        'Nedostatkem pracovníků se obvykle rozumí stav, kdy poptávka zaměstnavatelů po určitých profesích převyšuje dostupnou nabídku uchazečů. Podle dostupných údajů se míra tohoto napětí liší podle oboru, kvalifikace i regionu.',
        'Konkrétní rozsah – například počty volných míst nebo míra nezaměstnanosti – se v čase mění. Aktuální data zveřejňují Úřad práce ČR, ČSÚ a MPSV; tato stránka je záměrně neuvádí.',
      ],
    },
    {
      heading: 'Co to znamená pro zaměstnavatele v praxi',
      body: [
        'Pro zaměstnavatele se napjatý trh práce může projevit delším časem na obsazení pozice, vyšší konkurencí o kandidáty a tlakem na mzdové a pracovní podmínky. V některých regionech a oborech může být situace výraznější než v jiných.',
        'Praktickým důsledkem bývá, že nábor je vhodné plánovat s předstihem a nespoléhat na to, že se pozice obsadí okamžitě.',
      ],
    },
    {
      heading: 'Které oblasti to může zasahovat',
      body: [
        'Napětí na trhu práce se podle dostupných údajů často týká vybraných profesí a oborů, jejich konkrétní výčet se však v čase mění a liší se regionálně. Z toho důvodu zde neuvádíme konkrétní seznam ani čísla.',
        'Pro aktuální obraz o tom, které profese jsou nejhůře obsaditelné, doporučujeme statistiky a analýzy Úřadu práce ČR a ČSÚ.',
      ],
    },
    {
      heading: 'Proč nábor může trvat déle',
      body: [
        'Delší nábor často nevyplývá jen z počtu uchazečů, ale i z náročnosti výběru a u zahraničních pracovníků z administrativy spojené s oprávněními. Čas si žádá také ověření kvalifikace, zaškolení a adaptace.',
        'Realistický harmonogram, který s těmito kroky počítá, pomáhá předejít provozním výpadkům a unáhleným rozhodnutím.',
      ],
    },
    {
      heading: 'Role zahraničních pracovníků',
      body: [
        'Zahraniční pracovníci mohou pomoci doplnit pracovní sílu tam, kde na domácím trhu chybí. U občanů třetích zemí je ovšem třeba počítat s pravidly pro pobytová a pracovní oprávnění, která nábor prodlužují.',
        'Pro zaměstnavatele je proto důležité předem vědět, zda pracovník má volný vstup na trh práce, nebo potřebuje oprávnění, a podle toho naplánovat.',
      ],
    },
    {
      heading: 'Checklist plánování pracovní síly',
      body: [
        'Jednoduchý kontrolní seznam pomáhá převést obecné téma nedostatku pracovníků do konkrétních kroků pro vaši firmu.',
      ],
      bullets: [
        'Plánovat nábor s dostatečným předstihem',
        'Zvážit kombinaci kmenových a agenturních pracovníků',
        'U zahraničních pracovníků počítat s časem na oprávnění',
        'Sledovat aktuální data ÚP ČR a ČSÚ pro svůj obor a region',
        'Mít realistický harmonogram zaškolení a adaptace',
      ],
    },
  ],
  faq: [
    {
      q: 'Jak velký je nedostatek pracovníků v ČR?',
      a: 'Konkrétní čísla tato stránka neuvádí, protože se mění a liší se podle oboru i regionu. Aktuální data zveřejňují Úřad práce ČR, ČSÚ a MPSV.',
    },
    {
      q: 'Kterých oborů se nedostatek týká nejvíce?',
      a: 'Výčet nejhůře obsaditelných profesí se v čase mění a má regionální rozdíly. Pro aktuální obraz doporučujeme analýzy Úřadu práce ČR a ČSÚ.',
    },
    {
      q: 'Pomohou nedostatek řešit zahraniční pracovníci?',
      a: 'Mohou pomoci doplnit chybějící pracovní sílu. U občanů třetích zemí je ale nutné počítat s pravidly pro oprávnění, která nábor prodlužují. Klíčové je předem ověřit přístup pracovníka na trh práce.',
    },
    {
      q: 'Proč nám nábor trvá déle než dřív?',
      a: 'Důvodů může být více – nižší dostupnost uchazečů, vyšší konkurence i náročnost výběru a u cizinců administrativa oprávnění. Pomáhá plánovat s předstihem a počítat se zaškolením.',
    },
  ],
  sources: [SRC.mpsv, SRC.upcr, SRC.czso, SRC.zakonOZamestnanosti],
  internalLinks: [
    { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    { href: '/pracovni-povoleni-cr', label: 'Pracovní povolení v ČR' },
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    faqHubLink,
  ],
  cta: {
    eyebrow: 'Pružná pracovní síla',
    title: 'Řešíte nedostatek pracovníků?',
    text: 'Pomůžeme vám s náborem i s pružným pokrytím kapacity, včetně koordinace administrativy u zahraničních pracovníků.',
    buttonLabel: 'Poslat poptávku',
    href: '/submit-offer',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const TRH_PRACE_PARDUBICKYKRAJ: SeoPage = {
  slug: 'trh-prace-pardubickykraj',
  breadcrumbLabel: 'Trh práce v Pardubickém kraji',
  eyebrow: 'Trh práce · Pardubický kraj',
  title: 'Trh práce v Pardubickém kraji: přehled pro zaměstnavatele',
  heroSubtitle:
    'Přehled trhu práce v Pardubickém kraji z pohledu zaměstnavatele – kontext regionu, náborové výzvy a význam zahraničních pracovníků. Bez vymyšlených regionálních čísel.',
  description:
    'Trh práce v Pardubickém kraji z pohledu zaměstnavatele – regionální kontext, náborové výzvy, role zahraničních pracovníků a praktické úvahy při náboru. Konkrétní data u ČSÚ a ÚP ČR.',
  keywords: [
    'trh práce Pardubický kraj',
    'práce Pardubický kraj',
    'zaměstnavatel Pardubický kraj',
    'nábor Pardubice',
    'zahraniční pracovníci Pardubicko',
    'regionální trh práce',
  ],
  intro:
    'Pardubický kraj patří mezi regiony s tradiční vazbou na průmysl, výrobu, logistiku a služby a jeho trh práce má svá specifika v dostupnosti kandidátů. Pro zaměstnavatele je užitečné rozumět regionálnímu kontextu, ten se ale opírá o aktuální data, která se mění. Tato stránka shrnuje regionální trh práce z pohledu zaměstnavatele kvalitativně a u konkrétních čísel – jako je míra nezaměstnanosti, počty volných míst nebo mzdové úrovně – odkazuje na oficiální statistiky ČSÚ a Úřadu práce ČR. Konkrétní regionální údaje záměrně neuvádíme.',
  sections: [
    {
      heading: 'Regionální kontext trhu práce',
      body: [
        'Pardubický kraj je tradičně spojován s průmyslem, výrobou, dopravou a logistikou i se sektorem služeb. Tato struktura se promítá do poptávky po různých typech pozic – od provozních a technických po kvalifikované.',
        'Konkrétní strukturu zaměstnanosti, míru nezaměstnanosti a další ukazatele zveřejňuje Český statistický úřad a Úřad práce ČR. Tato stránka tyto údaje neuvádí, aby nezobrazovala neaktuální čísla.',
      ],
    },
    {
      heading: 'Pohled zaměstnavatele',
      body: [
        'Pro zaměstnavatele v kraji je podstatná dostupnost kandidátů s potřebnou kvalifikací a konkurence o pracovní sílu. Pravidla pro zaměstnávání, odvody a oprávnění jsou přitom celostátní a v kraji se neliší.',
        'Regionální rozměr se proto týká hlavně náboru a zázemí – kde a jak hledat kandidáty a jaké podmínky nabídnout, aby byly konkurenceschopné.',
      ],
    },
    {
      heading: 'Náborové výzvy',
      body: [
        'Mezi obvyklé náborové výzvy patří delší čas na obsazení vybraných pozic, potřeba oslovit kandidáty i mimo region a u některých profesí omezená dostupnost kvalifikované pracovní síly.',
        'Míra těchto výzev se liší podle oboru a v čase. Pro aktuální obraz doporučujeme regionální data Úřadu práce ČR a ČSÚ.',
      ],
    },
    {
      heading: 'Význam zahraničních pracovníků',
      body: [
        'V regionech s tradičním průmyslem a logistikou mohou zahraniční pracovníci pomoci doplnit chybějící kapacitu. U občanů třetích zemí je ale nutné počítat s pravidly pro pobytová a pracovní oprávnění.',
        'Pro plánování je proto klíčové předem vědět, zda pracovník má volný vstup na trh práce, nebo potřebuje oprávnění, a podle toho nastavit harmonogram.',
      ],
    },
    {
      heading: 'Praktické úvahy při náboru',
      body: [
        'Následující body pomáhají převést regionální kontext do konkrétních kroků při náboru v Pardubickém kraji.',
      ],
      bullets: [
        'Plánovat nábor s předstihem a počítat se zaškolením',
        'Zvážit oslovení kandidátů i mimo region',
        'Nabídnout konkurenceschopné a transparentní podmínky',
        'U zahraničních pracovníků počítat s časem na oprávnění a zázemí',
        'Vycházet z aktuálních regionálních dat ČSÚ a ÚP ČR',
      ],
    },
  ],
  faq: [
    {
      q: 'Jaká je nezaměstnanost v Pardubickém kraji?',
      a: 'Konkrétní míru nezaměstnanosti tato stránka neuvádí, protože se mění. Aktuální regionální údaje zveřejňuje Český statistický úřad a Úřad práce ČR.',
    },
    {
      q: 'Které obory v kraji nejčastěji nabírají?',
      a: 'Pardubický kraj je tradičně spojován s průmyslem, výrobou, logistikou a službami. Konkrétní strukturu poptávky a volných míst zveřejňují ČSÚ a Úřad práce ČR.',
    },
    {
      q: 'Liší se pravidla zaměstnávání v kraji od zbytku ČR?',
      a: 'Ne. Pravidla pro odvody, oprávnění a pracovní právo jsou celostátní. Regionální je dostupnost kandidátů a konkurence o pracovní sílu.',
    },
    {
      q: 'Jak v kraji řešit nedostatek kvalifikovaných lidí?',
      a: 'Pomáhá plánovat nábor s předstihem, oslovit kandidáty i mimo region, nabídnout konkurenceschopné podmínky a případně zapojit zahraniční pracovníky s ohledem na pravidla oprávnění.',
    },
  ],
  sources: [SRC.czso, SRC.upcr, SRC.mpsv],
  internalLinks: [
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' },
    { href: '/pracovni-povoleni-cr', label: 'Pracovní povolení v ČR' },
    { href: '/naklady-na-zamestnance-cr', label: 'Náklady na zaměstnance' },
    faqHubLink,
  ],
  cta: {
    eyebrow: 'Nábor v regionu',
    title: 'Nabíráte v Pardubickém kraji?',
    text: 'Pomůžeme vám zorientovat se v regionálním náboru a zajistit pracovníky včetně koordinace administrativy u cizinců.',
    buttonLabel: 'Poslat poptávku',
    href: '/submit-offer',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const EMPLOYER_INTELLIGENCE_PAGES: ReadonlyArray<SeoPage> = [
  NAKLADY_NA_ZAMESTNANCE_PARDUBICE,
  NEDOSTATEK_PRACOVNIKU_V_CR,
  TRH_PRACE_PARDUBICKYKRAJ,
]
