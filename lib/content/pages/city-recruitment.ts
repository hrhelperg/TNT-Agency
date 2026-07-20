// City recruitment authority cluster — commercial-intent pages for employers
// who want to recruit workers in a specific Czech city. Two pages per city: an
// overview of the local labour market and where to find workers
// (pracovnici-<city>), and how to run recruitment locally
// (nabor-zamestnancu-<city>). Each page answers "how can an employer recruit
// workers in this city?" and is differentiated by the city's qualitative
// economic profile.
//
// All content is qualitative and source-backed. No invented unemployment
// rates, worker counts, salary figures or labour-shortage statistics — local
// data defers to ČSÚ, MPSV and Úřad práce ČR (incl. the regional trh-prace
// pages). Cautious language throughout.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-06-02'

const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}

const employerHubLink = { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' }
const empFaqLink = { href: '/faq-pro-zamestnavatele', label: 'FAQ pro zaměstnavatele' }
const naborLink = { href: '/nabor-pracovniku', label: 'Nábor pracovníků: přehled cest' }
const jakNajitLink = { href: '/jak-najit-pracovniky', label: 'Jak najít pracovníky pro firmu' }
const naborCizincuLink = { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' }
const foreignWorkersLink = { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' }

const hireCta = {
  eyebrow: 'Nábor pracovníků',
  title: 'Potřebujete obsadit pozice?',
  text: 'Pomůžeme vám s náborem od definice potřeby až po nástup a postaráme se o koordinaci administrativy v souladu s předpisy. Rádi probereme konkrétní potřebu ve vašem regionu.',
  buttonLabel: 'Poptat pracovníky',
  href: '/poptavka-pracovniku?source=service-page',
}

// ──────────────────────────────────────────────────────────────────────────
// PRAHA
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_PRAHA: SeoPage = {
  slug: 'pracovnici-praha',
  breadcrumbLabel: 'Pracovníci Praha',
  eyebrow: 'Nábor · Praha',
  title: 'Pracovníci Praha: nábor a hledání pracovní síly v Praze',
  heroSubtitle:
    'Jak v Praze najít pracovníky v prostředí velkého trhu práce a silné konkurence o kandidáty. Praktický přehled pro zaměstnavatele v metropoli a okolí.',
  description:
    'Pracovníci Praha – jak v Praze najít pracovní sílu na velkém, ale konkurenčním trhu práce: dominantní sektory, náborové kanály a plánování. Praktický přehled bez vymyšlených čísel.',
  keywords: ['pracovníci Praha', 'nábor Praha', 'hledání pracovníků Praha', 'trh práce Praha', 'pracovní síla Praha', 'zaměstnanci Praha'],
  intro:
    'Praha je největším trhem práce v České republice, což zaměstnavatelům přináší široký okruh kandidátů, ale i silnou konkurenci o pracovníky mezi firmami. Vedle administrativy a služeb je v metropoli i okolí významná logistika a navazující provozy. Tato stránka shrnuje, jak v Praze hledat pracovní sílu a na co brát ohled v konkurenčním prostředí. Konkrétní mzdy ani statistiky neuvádíme – patří do oficiálních zdrojů; nabízíme praktický přehled pro zaměstnavatele, který zohledňuje specifika pražského trhu a dojížďku ze Středočeského kraje.',
  sections: [
    {
      heading: 'Trh práce v Praze',
      body: [
        'Pražský trh práce je rozsáhlý a rozmanitý – vedle kancelářských a servisních pozic zahrnuje i logistiku, sklady a provozní role v metropoli a jejím okolí. Velký objem příležitostí ovšem znamená, že o kandidáty soutěží mnoho zaměstnavatelů najednou.',
        'Roli hraje i dojížďka z přilehlého Středočeského kraje, která rozšiřuje dostupný okruh pracovníků za hranice samotné Prahy.',
      ],
    },
    {
      heading: 'Kde v Praze hledat pracovníky',
      body: [
        'V konkurenčním prostředí rozhoduje rychlost a srozumitelnost nabídky. Osvědčuje se kombinace inzerce, doporučení a spolupráce s pracovní agenturou; u dělnických a logistických pozic pomáhá agenturní kapacita a u nedostatkových profesí nábor ze zahraničí.',
      ],
      bullets: [
        'Inzerce a doporučení s důrazem na rychlost reakce',
        'Agenturní kapacita pro provozní a logistické pozice',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Zohlednění dojížďky ze Středočeského kraje',
      ],
    },
    {
      heading: 'Plánování pracovní síly v Praze',
      body: [
        'Kvůli konkurenci je v Praze vhodné plánovat nábor s předstihem a počítat s tím, že obsazení pozice může trvat déle. Pro zaměstnavatele z toho plyne rozhodnutí kombinovat stálé jádro s flexibilní kapacitou a nespoléhat na okamžité obsazení.',
        'Aktuální obraz regionálního trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; tato stránka konkrétní čísla neuvádí.',
      ],
    },
  ],
  faq: [
    { q: 'Proč je nábor v Praze náročný i přes velký trh práce?', a: 'Velký počet příležitostí znamená i silnou konkurenci mezi zaměstnavateli o stejné kandidáty. Rozhoduje rychlost a srozumitelnost nabídky.' },
    { q: 'Kde hledat provozní a logistické pracovníky v Praze?', a: 'Kombinací inzerce, doporučení a agenturní kapacity, u nedostatkových profesí i náborem ze zahraničí. Pomáhá zohlednit dojížďku ze Středočeského kraje.' },
    { q: 'Uvádíte mzdy nebo statistiky pro Prahu?', a: 'Ne. Konkrétní mzdy ani čísla nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.czso, SRC.eures],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-zamestnancu-praha', label: 'Nábor zaměstnanců v Praze' },
    { href: '/trh-prace-praha', label: 'Trh práce v Praze' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    { href: '/skladnici', label: 'Skladníci' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAMESTNANCU_PRAHA: SeoPage = {
  slug: 'nabor-zamestnancu-praha',
  breadcrumbLabel: 'Nábor zaměstnanců Praha',
  eyebrow: 'Nábor · Praha',
  title: 'Nábor zaměstnanců Praha: jak v Praze obsadit pozice',
  heroSubtitle:
    'Jak v Praze zorganizovat nábor v podmínkách silné konkurence o kandidáty – cesty náboru, tempo a plánování. Praktický pohled pro zaměstnavatele.',
  description:
    'Nábor zaměstnanců Praha – jak v konkurenčním pražském prostředí obsadit pozice: cesty náboru, rychlé tempo výběru a plánování s předstihem. Praktický pohled bez vymyšlených čísel.',
  keywords: ['nábor zaměstnanců Praha', 'nábor Praha', 'obsazení pozic Praha', 'výběrový proces Praha', 'pracovní agentura Praha', 'recruitment Praha'],
  intro:
    'Nábor zaměstnanců v Praze probíhá na největším, ale zároveň nejkonkurenčnějším trhu práce v zemi. Pro zaměstnavatele to znamená, že kvalitní kandidáti mívají více nabídek a o úspěchu rozhoduje rychlost a kvalita celého procesu. Tato stránka se věnuje tomu, jak nábor v Praze zorganizovat a jakými cestami obsazovat pozice. Doplňuje přehled o pražských pracovnících o pohled na samotný proces náboru. Konkrétní mzdy ani statistiky neuvádíme; nabízíme praktická doporučení, jak v pražských podmínkách zvýšit šanci na obsazení pozice.',
  sections: [
    {
      heading: 'Nábor v Praze: čemu čelíte',
      body: [
        'V Praze soutěží o kandidáty mnoho firem současně, takže pomalý nebo nepřehledný výběr vede ke ztrátě uchazečů. Kvalitní kandidáti často zvažují více nabídek najednou, proto hraje roli rychlost reakce, jasná komunikace a srozumitelná nabídka.',
      ],
    },
    {
      heading: 'Cesty náboru v Praze',
      body: [
        'Podle typu pozice se volí kombinace cest: přímý nábor pro stálé jádro, agenturní zaměstnávání pro pružné pokrytí provozních a logistických pozic a u nedostatkových profesí nábor ze zahraničí. Spolupráce s agenturou pomáhá zvládnout objem i tempo.',
      ],
      bullets: [
        'Přímý nábor pro klíčové stálé role',
        'Agenturní kapacita pro provoz a logistiku',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Svižné a přehledné výběrové kolo',
      ],
    },
    {
      heading: 'Plánování a rozhodnutí pro zaměstnavatele',
      body: [
        'Z konkurenčního prostředí plyne rozhodnutí plánovat nábor s předstihem, zkrátit a zjednodušit výběrový proces a kombinovat stálé jádro s flexibilní kapacitou. Tím se zvyšuje šance, že pozici obsadíte dříve než konkurence.',
        'Aktuální obraz trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak v Praze nepřijít o kandidáty?', a: 'Svižným a přehledným výběrem a rychlou, jasnou komunikací. Kvalitní kandidáti zvažují více nabídek, takže pomalý proces vede k jejich ztrátě.' },
    { q: 'Vyplatí se v Praze spolupráce s agenturou?', a: 'U provozních a logistických pozic a při objemové nebo rychlé potřebě ano – agentura pomáhá zvládnout tempo a objem. U nedostatkových profesí pomáhá nábor ze zahraničí.' },
    { q: 'Uvádíte mzdy nebo počty pro Prahu?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.eures],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-praha', label: 'Pracovníci Praha: kde hledat' },
    { href: '/agentura-prace-praha', label: 'Agentura práce v Praze' },
    jakNajitLink,
    naborLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// BRNO
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_BRNO: SeoPage = {
  slug: 'pracovnici-brno',
  breadcrumbLabel: 'Pracovníci Brno',
  eyebrow: 'Nábor · Brno',
  title: 'Pracovníci Brno: nábor a hledání pracovní síly v Brně',
  heroSubtitle:
    'Jak v Brně najít pracovníky v prostředí s technologickým, výrobním a logistickým zázemím. Praktický přehled pro zaměstnavatele na jihu Moravy.',
  description:
    'Pracovníci Brno – jak v Brně najít pracovní sílu v prostředí technologií, výroby a logistiky: dominantní sektory, kanály a plánování. Praktický přehled bez vymyšlených čísel.',
  keywords: ['pracovníci Brno', 'nábor Brno', 'hledání pracovníků Brno', 'trh práce Brno', 'pracovní síla Brno', 'výroba logistika Brno'],
  intro:
    'Brno je druhým největším městem republiky a kombinuje technologické a univerzitní zázemí s výrobou a logistikou. Zaměstnavatelé zde tak hledají jak kvalifikované, tak dělnické a provozní pracovníky. Tato stránka shrnuje, jak v Brně a okolí hledat pracovní sílu a které sektory určují poptávku. Konkrétní mzdy ani statistiky neuvádíme – patří do oficiálních zdrojů; nabízíme praktický přehled pro zaměstnavatele, který zohledňuje pestrou skladbu brněnského trhu práce a jeho výrobně-logistické zázemí.',
  sections: [
    {
      heading: 'Trh práce v Brně',
      body: [
        'Brněnský trh práce je rozmanitý: vedle technologických a kancelářských pozic zahrnuje výrobu, logistiku a navazující provozy. Univerzitní zázemí přináší příliv kvalifikovaných lidí, zatímco dělnické a provozní pozice soutěží o pracovníky podobně jako v jiných průmyslových regionech.',
        'Poptávka se liší podle sektoru, což ovlivňuje volbu náborových cest.',
      ],
    },
    {
      heading: 'Kde v Brně hledat pracovníky',
      body: [
        'Pro kvalifikované role pomáhá inzerce a doporučení, pro výrobní a logistické pozice agenturní kapacita a u nedostatkových profesí nábor ze zahraničí. Volba kanálu by měla odpovídat typu pozice a naléhavosti.',
      ],
      bullets: [
        'Inzerce a doporučení pro kvalifikované role',
        'Agenturní kapacita pro výrobu a logistiku',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Kanál volit podle typu pozice',
      ],
    },
    {
      heading: 'Plánování pracovní síly v Brně',
      body: [
        'Vzhledem k pestré skladbě poptávky se v Brně vyplatí plánovat nábor podle sektoru a sezónnosti a kombinovat stálé jádro s flexibilní kapacitou. Pro zaměstnavatele z toho plyne rozhodnutí přizpůsobit náborovou strategii konkrétnímu typu pozic.',
        'Aktuální obraz regionálního trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké pracovníky firmy v Brně nejčastěji hledají?', a: 'Mix kvalifikovaných (technologie, kanceláře) i dělnických a provozních pozic ve výrobě a logistice. Poptávka se liší podle sektoru.' },
    { q: 'Jak v Brně obsadit výrobní a logistické pozice?', a: 'Osvědčuje se agenturní kapacita doplněná inzercí a doporučeními, u nedostatkových profesí nábor ze zahraničí.' },
    { q: 'Uvádíte mzdy nebo statistiky pro Brno?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.czso, SRC.eures],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-zamestnancu-brno', label: 'Nábor zaměstnanců v Brně' },
    { href: '/trh-prace-jihomoravsky-kraj', label: 'Trh práce v Jihomoravském kraji' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAMESTNANCU_BRNO: SeoPage = {
  slug: 'nabor-zamestnancu-brno',
  breadcrumbLabel: 'Nábor zaměstnanců Brno',
  eyebrow: 'Nábor · Brno',
  title: 'Nábor zaměstnanců Brno: jak v Brně obsadit pozice',
  heroSubtitle:
    'Jak v Brně zorganizovat nábor napříč kvalifikovanými i provozními pozicemi – cesty náboru a plánování. Praktický pohled pro zaměstnavatele na jihu Moravy.',
  description:
    'Nábor zaměstnanců Brno – jak obsadit pozice napříč technologiemi, výrobou a logistikou: cesty náboru a plánování podle sektoru. Praktický pohled bez vymyšlených čísel.',
  keywords: ['nábor zaměstnanců Brno', 'nábor Brno', 'obsazení pozic Brno', 'výběrový proces Brno', 'pracovní agentura Brno', 'recruitment Brno'],
  intro:
    'Nábor zaměstnanců v Brně se odehrává na rozmanitém trhu, kde se potkává poptávka po kvalifikovaných i provozních pracovnících. Pro zaměstnavatele to znamená přizpůsobit nábor konkrétnímu typu pozice – jiný postup vyžaduje technologická role a jiný obsazení výrobní linky. Tato stránka se věnuje tomu, jak nábor v Brně zorganizovat a jakými cestami obsazovat pozice. Doplňuje přehled o brněnských pracovnících o pohled na proces náboru. Konkrétní mzdy ani statistiky neuvádíme; nabízíme praktická doporučení pro různé typy pozic.',
  sections: [
    {
      heading: 'Nábor v Brně: na co myslet',
      body: [
        'Brněnský trh kombinuje kvalifikovanou i dělnickou pracovní sílu, takže náborová strategie by měla odpovídat typu pozice. U kvalifikovaných rolí rozhoduje kvalita oslovení a výběru, u provozních pozic spíše rychlost a objemová kapacita.',
      ],
    },
    {
      heading: 'Cesty náboru v Brně',
      body: [
        'Pro stálé a kvalifikované role se hodí přímý nábor s důrazem na výběr; pro výrobní a logistické pozice agenturní zaměstnávání a u nedostatkových profesí nábor ze zahraničí. Kombinace cest umožní pokrýt různorodou poptávku.',
      ],
      bullets: [
        'Přímý nábor pro kvalifikované a stálé role',
        'Agenturní kapacita pro výrobu a logistiku',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Strategii přizpůsobit typu pozice',
      ],
    },
    {
      heading: 'Plánování a rozhodnutí pro zaměstnavatele',
      body: [
        'Z rozmanitosti trhu plyne rozhodnutí plánovat nábor odděleně pro různé typy pozic a kombinovat stálé jádro s flexibilní kapacitou podle sektoru. Tak lze efektivně pokrýt jak kvalifikované, tak provozní role.',
        'Aktuální obraz trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Liší se nábor kvalifikovaných a provozních pozic v Brně?', a: 'Ano. U kvalifikovaných rolí rozhoduje kvalita oslovení a výběru, u provozních pozic spíše rychlost a objemová kapacita. Strategii je vhodné přizpůsobit typu pozice.' },
    { q: 'Jak obsadit větší počet výrobních pozic?', a: 'Osvědčuje se agenturní zaměstnávání pro pružné pokrytí objemu, u nedostatkových profesí doplněné náborem ze zahraničí.' },
    { q: 'Uvádíte čísla pro brněnský trh?', a: 'Ne. Konkrétní statistiky ani mzdy nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.eures],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-brno', label: 'Pracovníci Brno: kde hledat' },
    { href: '/agentura-prace-brno', label: 'Agentura práce v Brně' },
    jakNajitLink,
    naborLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// OSTRAVA
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_OSTRAVA: SeoPage = {
  slug: 'pracovnici-ostrava',
  breadcrumbLabel: 'Pracovníci Ostrava',
  eyebrow: 'Nábor · Ostrava',
  title: 'Pracovníci Ostrava: nábor a hledání pracovní síly v Ostravě',
  heroSubtitle:
    'Jak v Ostravě najít pracovníky v regionu s průmyslovou tradicí a transformující se ekonomikou. Praktický přehled pro zaměstnavatele na severu Moravy.',
  description:
    'Pracovníci Ostrava – jak v regionu s průmyslovou tradicí najít pracovní sílu: dominantní sektory, kanály a plánování. Praktický přehled pro zaměstnavatele bez vymyšlených čísel.',
  keywords: ['pracovníci Ostrava', 'nábor Ostrava', 'hledání pracovníků Ostrava', 'trh práce Ostrava', 'průmysl Ostrava', 'výroba Ostrava'],
  intro:
    'Ostrava a Moravskoslezský region mají silnou průmyslovou tradici, která se postupně proměňuje směrem k novým výrobním a navazujícím odvětvím. Pro zaměstnavatele to znamená dostupnost pracovní síly se zkušeností z průmyslu i potřebu reagovat na strukturální změny. Tato stránka shrnuje, jak v Ostravě hledat pracovníky a které sektory poptávku určují. Konkrétní mzdy ani statistiky neuvádíme – patří do oficiálních zdrojů; nabízíme praktický přehled, který zohledňuje průmyslový charakter regionu a jeho transformaci.',
  sections: [
    {
      heading: 'Trh práce v Ostravě',
      body: [
        'Ostravský trh práce je úzce spjatý s průmyslem – výrobou, zpracovatelskými obory a navazující logistikou a stavebnictvím. Průmyslová tradice znamená dostupnost lidí se zkušeností z provozů, zároveň region prochází proměnou, která ovlivňuje strukturu poptávky.',
        'Tyto faktory je vhodné zohlednit při hledání i udržení pracovníků.',
      ],
    },
    {
      heading: 'Kde v Ostravě hledat pracovníky',
      body: [
        'U průmyslových a provozních pozic pomáhá inzerce cílená na zkušené pracovníky, doporučení a agenturní kapacita. U nedostatkových profesí rozšiřuje okruh nábor ze zahraničí. Pro klíčové role je důležité i udržení stávajících lidí.',
      ],
      bullets: [
        'Cílená inzerce na zkušené provozní pracovníky',
        'Agenturní kapacita pro výrobu a stavebnictví',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Důraz na udržení klíčových lidí',
      ],
    },
    {
      heading: 'Plánování pracovní síly v Ostravě',
      body: [
        'Vzhledem k proměně regionu se vyplatí plánovat pracovní sílu s ohledem na strukturální změny a kombinovat stálé jádro se zkušeností s flexibilní kapacitou. Pro zaměstnavatele z toho plyne rozhodnutí investovat do udržení i do náboru nových profesí.',
        'Aktuální obraz regionálního trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jaká je výhoda náboru v Ostravě?', a: 'Průmyslová tradice znamená dostupnost lidí se zkušeností z výroby a provozů. Region zároveň prochází proměnou, kterou je vhodné v plánování zohlednit.' },
    { q: 'Jak obsadit průmyslové pozice v Ostravě?', a: 'Cílenou inzercí na zkušené pracovníky, doporučeními a agenturní kapacitou; u nedostatkových profesí náborem ze zahraničí. Důležité je i udržení klíčových lidí.' },
    { q: 'Uvádíte statistiky pro Ostravu?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-zamestnancu-ostrava', label: 'Nábor zaměstnanců v Ostravě' },
    { href: '/trh-prace-moravskoslezsky-kraj', label: 'Trh práce v Moravskoslezském kraji' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    { href: '/stavebni-pracovnici', label: 'Stavební pracovníci' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAMESTNANCU_OSTRAVA: SeoPage = {
  slug: 'nabor-zamestnancu-ostrava',
  breadcrumbLabel: 'Nábor zaměstnanců Ostrava',
  eyebrow: 'Nábor · Ostrava',
  title: 'Nábor zaměstnanců Ostrava: jak v Ostravě obsadit pozice',
  heroSubtitle:
    'Jak v Ostravě zorganizovat nábor s ohledem na průmyslový charakter regionu a jeho proměnu – cesty náboru a plánování. Praktický pohled pro zaměstnavatele.',
  description:
    'Nábor zaměstnanců Ostrava – jak obsadit pozice v průmyslovém regionu v proměně: cesty náboru, udržení zkušených lidí a plánování. Praktický pohled bez vymyšlených čísel.',
  keywords: ['nábor zaměstnanců Ostrava', 'nábor Ostrava', 'obsazení pozic Ostrava', 'průmysl nábor', 'pracovní agentura Ostrava', 'recruitment Ostrava'],
  intro:
    'Nábor zaměstnanců v Ostravě se opírá o region s průmyslovou tradicí, který zároveň prochází strukturální proměnou. Pro zaměstnavatele to přináší dostupnost zkušených pracovníků i nutnost reagovat na měnící se poptávku po profesích. Tato stránka se věnuje tomu, jak nábor v Ostravě zorganizovat a jakými cestami obsazovat pozice. Doplňuje přehled o ostravských pracovnících o pohled na proces náboru. Konkrétní mzdy ani statistiky neuvádíme; nabízíme praktická doporučení pro průmyslové i navazující provozy.',
  sections: [
    {
      heading: 'Nábor v Ostravě: na co myslet',
      body: [
        'Průmyslový charakter regionu znamená, že část kandidátů má zkušenost z provozů, což usnadňuje obsazení provozních pozic. Zároveň je vhodné počítat s tím, že proměna regionu mění poptávku a u některých profesí může být nabídka užší.',
      ],
    },
    {
      heading: 'Cesty náboru v Ostravě',
      body: [
        'Pro provozní a výrobní pozice se osvědčuje kombinace cílené inzerce, doporučení a agenturní kapacity; u nedostatkových profesí nábor ze zahraničí. U klíčových rolí se vyplatí věnovat pozornost udržení, protože nahrazení zkušeného pracovníka je náročné.',
      ],
      bullets: [
        'Cílená inzerce a doporučení pro provoz',
        'Agenturní kapacita pro výrobu a stavebnictví',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Udržení zkušených klíčových pracovníků',
      ],
    },
    {
      heading: 'Plánování a rozhodnutí pro zaměstnavatele',
      body: [
        'Z proměny regionu plyne rozhodnutí plánovat nábor i udržení současně a kombinovat stálé jádro se zkušeností s flexibilní kapacitou na výkyvy. Tak lze pokrýt poptávku i v měnícím se prostředí.',
        'Aktuální obraz trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Je v Ostravě dostatek zkušených pracovníků?', a: 'Průmyslová tradice znamená dostupnost lidí se zkušeností z provozů. U některých profesí ale může být nabídka užší kvůli proměně regionu; ověřte aktuální data.' },
    { q: 'Jak udržet klíčové pracovníky?', a: 'Férovými podmínkami, kontinuitou a dobrým vedením. Nahrazení zkušeného provozního pracovníka je náročné, proto se udržení vyplatí.' },
    { q: 'Uvádíte čísla pro ostravský trh?', a: 'Ne. Konkrétní statistiky ani mzdy nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-ostrava', label: 'Pracovníci Ostrava: kde hledat' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    jakNajitLink,
    naborLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// PLZEŇ
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_PLZEN: SeoPage = {
  slug: 'pracovnici-plzen',
  breadcrumbLabel: 'Pracovníci Plzeň',
  eyebrow: 'Nábor · Plzeň',
  title: 'Pracovníci Plzeň: nábor a hledání pracovní síly v Plzni',
  heroSubtitle:
    'Jak v Plzni najít pracovníky v regionu se silnou výrobou a logistikou a dobrou dopravní polohou. Praktický přehled pro zaměstnavatele na západě Čech.',
  description:
    'Pracovníci Plzeň – jak v regionu se silnou výrobou a logistikou najít pracovní sílu: dominantní sektory, kanály a plánování. Praktický přehled pro zaměstnavatele bez vymyšlených čísel.',
  keywords: ['pracovníci Plzeň', 'nábor Plzeň', 'hledání pracovníků Plzeň', 'trh práce Plzeň', 'výroba Plzeň', 'logistika Plzeň'],
  intro:
    'Plzeň a okolí patří mezi výrazně průmyslové regiony se silnou výrobou a logistikou, k čemuž přispívá i dobrá dopravní poloha směrem k Německu. Zaměstnavatelé zde poptávají zejména výrobní a logistické pracovníky. Tato stránka shrnuje, jak v Plzni hledat pracovní sílu a které sektory určují poptávku. Konkrétní mzdy ani statistiky neuvádíme – patří do oficiálních zdrojů; nabízíme praktický přehled, který zohledňuje výrobně-logistický charakter regionu a jeho dopravní polohu.',
  sections: [
    {
      heading: 'Trh práce v Plzni',
      body: [
        'Plzeňský trh práce je tažený výrobou a logistikou; dobrá dopravní poloha podporuje rozvoj skladových a distribučních provozů. Poptávka po výrobních a logistických pracovnících je proto výrazná a soutěží o ně více zaměstnavatelů.',
        'Region zároveň profituje z blízkosti hranice, která ovlivňuje pohyb pracovní síly.',
      ],
    },
    {
      heading: 'Kde v Plzni hledat pracovníky',
      body: [
        'U výrobních a logistických pozic se osvědčuje inzerce, doporučení a agenturní kapacita pro pružné pokrytí objemu. U nedostatkových profesí rozšiřuje okruh nábor ze zahraničí. Kanály je vhodné cílit na konkrétní typ provozu.',
      ],
      bullets: [
        'Inzerce a doporučení pro výrobu a logistiku',
        'Agenturní kapacita pro objemové a sezónní potřeby',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Cílení podle typu provozu',
      ],
    },
    {
      heading: 'Plánování pracovní síly v Plzni',
      body: [
        'Vzhledem k silné výrobní a logistické poptávce se v Plzni vyplatí plánovat nábor s předstihem a kombinovat stálé jádro s flexibilní kapacitou na výkyvy. Pro zaměstnavatele z toho plyne rozhodnutí připravit zajištění kapacity před nárůsty objemu.',
        'Aktuální obraz regionálního trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké pracovníky firmy v Plzni nejčastěji hledají?', a: 'Zejména výrobní a logistické pracovníky, čemuž odpovídá průmyslový charakter regionu a rozvoj skladových a distribučních provozů.' },
    { q: 'Jak v Plzni pokrýt objemové potřeby?', a: 'Agenturní kapacitou doplněnou inzercí a doporučeními, u nedostatkových profesí náborem ze zahraničí; nábor je vhodné plánovat s předstihem.' },
    { q: 'Uvádíte statistiky pro Plzeň?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.czso, SRC.eures],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-zamestnancu-plzen', label: 'Nábor zaměstnanců v Plzni' },
    { href: '/trh-prace-plzensky-kraj', label: 'Trh práce v Plzeňském kraji' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAMESTNANCU_PLZEN: SeoPage = {
  slug: 'nabor-zamestnancu-plzen',
  breadcrumbLabel: 'Nábor zaměstnanců Plzeň',
  eyebrow: 'Nábor · Plzeň',
  title: 'Nábor zaměstnanců Plzeň: jak v Plzni obsadit pozice',
  heroSubtitle:
    'Jak v Plzni zorganizovat nábor pro výrobu a logistiku – cesty náboru, zvládání objemu a plánování. Praktický pohled pro zaměstnavatele na západě Čech.',
  description:
    'Nábor zaměstnanců Plzeň – jak obsadit výrobní a logistické pozice: cesty náboru, agenturní kapacita na objem a plánování s předstihem. Praktický pohled bez vymyšlených čísel.',
  keywords: ['nábor zaměstnanců Plzeň', 'nábor Plzeň', 'obsazení pozic Plzeň', 'výroba logistika nábor', 'pracovní agentura Plzeň', 'recruitment Plzeň'],
  intro:
    'Nábor zaměstnanců v Plzni se odehrává v prostředí silné výrobní a logistické poptávky, kde o pracovníky soutěží více zaměstnavatelů. Pro firmy je proto klíčové zvládnout objem a tempo náboru, zejména před nárůsty výroby a sezónními špičkami. Tato stránka se věnuje tomu, jak nábor v Plzni zorganizovat a jakými cestami obsazovat pozice. Doplňuje přehled o plzeňských pracovnících o pohled na proces náboru. Konkrétní mzdy ani statistiky neuvádíme; nabízíme praktická doporučení pro výrobní a logistické provozy.',
  sections: [
    {
      heading: 'Nábor v Plzni: na co myslet',
      body: [
        'V průmyslovém regionu soutěží o výrobní a logistické pracovníky více firem, takže rychlost a objemová kapacita náboru hrají velkou roli. Před nárůsty výroby nebo sezónními špičkami je vhodné zajistit kapacitu předem.',
      ],
    },
    {
      heading: 'Cesty náboru v Plzni',
      body: [
        'Pro stálé jádro se hodí přímý nábor, pro pokrytí objemu a špiček agenturní zaměstnávání a u nedostatkových profesí nábor ze zahraničí. Kombinace cest umožní reagovat na kolísavou poptávku výroby a logistiky.',
      ],
      bullets: [
        'Přímý nábor pro stálé jádro',
        'Agenturní kapacita pro objem a špičky',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Zajištění kapacity před nárůsty výroby',
      ],
    },
    {
      heading: 'Plánování a rozhodnutí pro zaměstnavatele',
      body: [
        'Z konkurenční poptávky plyne rozhodnutí plánovat nábor s předstihem a kombinovat stálé jádro s flexibilní kapacitou, aby firma zvládla objem bez výpadků i bez zbytečných nákladů mimo špičku.',
        'Aktuální obraz trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak v Plzni zvládnout objemový nábor?', a: 'Kombinací stálého jádra a agenturní kapacity zajištěné s předstihem, doplněné u nedostatkových profesí náborem ze zahraničí.' },
    { q: 'Proč plánovat nábor s předstihem?', a: 'Protože o výrobní a logistické pracovníky soutěží více firem a obsazení může trvat déle. Předstih před nárůsty výroby snižuje riziko výpadků.' },
    { q: 'Uvádíte mzdy pro Plzeň?', a: 'Ne. Konkrétní mzdy ani statistiky nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.eures],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-plzen', label: 'Pracovníci Plzeň: kde hledat' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    jakNajitLink,
    naborLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// PARDUBICE
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_PARDUBICE: SeoPage = {
  slug: 'pracovnici-pardubice',
  breadcrumbLabel: 'Pracovníci Pardubice',
  eyebrow: 'Nábor · Pardubice',
  title: 'Pracovníci Pardubice: nábor a hledání pracovní síly v Pardubicích',
  heroSubtitle:
    'Jak v Pardubicích najít pracovníky v regionu s logistikou a výrobou a dobrou dopravní dostupností. Praktický přehled pro zaměstnavatele.',
  description:
    'Pracovníci Pardubice – jak v regionu s logistikou a výrobou najít pracovní sílu: dominantní sektory, kanály a plánování. Praktický přehled pro zaměstnavatele bez vymyšlených čísel.',
  keywords: ['pracovníci Pardubice', 'nábor Pardubice', 'hledání pracovníků Pardubice', 'trh práce Pardubice', 'logistika Pardubice', 'výroba Pardubice'],
  intro:
    'Pardubice leží na významné dopravní křižovatce, což z regionu dělá zázemí pro logistiku i výrobu. Zaměstnavatelé zde poptávají zejména logistické a výrobní pracovníky a využívají dobré dostupnosti regionu. Tato stránka shrnuje, jak v Pardubicích hledat pracovní sílu a které sektory určují poptávku. Konkrétní mzdy ani statistiky neuvádíme – patří do oficiálních zdrojů; nabízíme praktický přehled, který zohledňuje logisticko-výrobní charakter regionu a jeho dopravní polohu.',
  sections: [
    {
      heading: 'Trh práce v Pardubicích',
      body: [
        'Pardubický trh práce je spjatý s logistikou a výrobou, čemuž napomáhá poloha na dopravních tazích. Rozvoj skladových a distribučních provozů zvyšuje poptávku po logistických pracovnících, vedle stálé poptávky výroby.',
        'Dopravní dostupnost rozšiřuje okruh dojíždějících pracovníků.',
      ],
    },
    {
      heading: 'Kde v Pardubicích hledat pracovníky',
      body: [
        'U logistických a výrobních pozic pomáhá inzerce, doporučení a agenturní kapacita pro pružné pokrytí objemu. U nedostatkových profesí rozšiřuje okruh nábor ze zahraničí. Kanály je vhodné cílit podle typu provozu a sezónnosti.',
      ],
      bullets: [
        'Inzerce a doporučení pro logistiku a výrobu',
        'Agenturní kapacita pro objemové a sezónní potřeby',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Zohlednění dojížďky a dopravní dostupnosti',
      ],
    },
    {
      heading: 'Plánování pracovní síly v Pardubicích',
      body: [
        'Vzhledem k logistické poptávce se v Pardubicích vyplatí plánovat nábor podle sezónních špiček a kombinovat stálé jádro s flexibilní kapacitou. Pro zaměstnavatele z toho plyne rozhodnutí zajistit posily před nárůsty objemu.',
        'Aktuální obraz regionálního trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké pracovníky firmy v Pardubicích hledají?', a: 'Zejména logistické a výrobní pracovníky, čemuž odpovídá poloha regionu na dopravních tazích a rozvoj skladových a distribučních provozů.' },
    { q: 'Jak pokrýt sezónní špičky v Pardubicích?', a: 'Agenturní kapacitou zajištěnou s předstihem, doplněnou inzercí a doporučeními; u nedostatkových profesí náborem ze zahraničí.' },
    { q: 'Uvádíte statistiky pro Pardubice?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-zamestnancu-pardubice', label: 'Nábor zaměstnanců v Pardubicích' },
    { href: '/trh-prace-pardubickykraj', label: 'Trh práce v Pardubickém kraji' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAMESTNANCU_PARDUBICE: SeoPage = {
  slug: 'nabor-zamestnancu-pardubice',
  breadcrumbLabel: 'Nábor zaměstnanců Pardubice',
  eyebrow: 'Nábor · Pardubice',
  title: 'Nábor zaměstnanců Pardubice: jak v Pardubicích obsadit pozice',
  heroSubtitle:
    'Jak v Pardubicích zorganizovat nábor pro logistiku a výrobu – cesty náboru, sezónní špičky a plánování. Praktický pohled pro zaměstnavatele.',
  description:
    'Nábor zaměstnanců Pardubice – jak obsadit logistické a výrobní pozice: cesty náboru, agenturní kapacita na špičky a plánování. Praktický pohled bez vymyšlených čísel.',
  keywords: ['nábor zaměstnanců Pardubice', 'nábor Pardubice', 'obsazení pozic Pardubice', 'logistika výroba nábor', 'pracovní agentura Pardubice', 'recruitment Pardubice'],
  intro:
    'Nábor zaměstnanců v Pardubicích se opírá o logisticko-výrobní charakter regionu a jeho dobrou dopravní dostupnost. Pro zaměstnavatele to znamená pružně reagovat na sezónní výkyvy logistiky a zajistit kapacitu před nárůsty objemu. Tato stránka se věnuje tomu, jak nábor v Pardubicích zorganizovat a jakými cestami obsazovat pozice. Doplňuje přehled o pardubických pracovnících o pohled na proces náboru. Konkrétní mzdy ani statistiky neuvádíme; nabízíme praktická doporučení pro logistické a výrobní provozy.',
  sections: [
    {
      heading: 'Nábor v Pardubicích: na co myslet',
      body: [
        'Logistická poptávka v regionu kolísá podle sezóny, takže náborová kapacita musí být pružná. Dobrá dopravní dostupnost přitom rozšiřuje okruh dojíždějících kandidátů, což je vhodné využít při oslovení.',
      ],
    },
    {
      heading: 'Cesty náboru v Pardubicích',
      body: [
        'Pro stálé jádro se hodí přímý nábor, pro pokrytí sezónních špiček agenturní zaměstnávání a u nedostatkových profesí nábor ze zahraničí. Kombinace cest umožní zvládnout kolísavou logistickou poptávku.',
      ],
      bullets: [
        'Přímý nábor pro stálé jádro',
        'Agenturní kapacita na sezónní špičky',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Oslovení dojíždějících kandidátů',
      ],
    },
    {
      heading: 'Plánování a rozhodnutí pro zaměstnavatele',
      body: [
        'Z kolísavé poptávky plyne rozhodnutí plánovat nábor podle sezónních cyklů a zajišťovat flexibilní kapacitu s předstihem. Tak firma zvládne špičky bez výpadků i bez zbytečných nákladů mimo sezónu.',
        'Aktuální obraz trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak v Pardubicích zvládnout sezónní špičky?', a: 'Kombinací stálého jádra a agenturní kapacity zajištěné s předstihem, doplněné u nedostatkových profesí náborem ze zahraničí.' },
    { q: 'Jak využít dopravní dostupnost regionu?', a: 'Oslovením dojíždějících kandidátů, kterým dobrá dostupnost rozšiřuje okruh možných pozic. Vyplatí se to zohlednit v inzerci.' },
    { q: 'Uvádíte čísla pro pardubický trh?', a: 'Ne. Konkrétní statistiky ani mzdy nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-pardubice', label: 'Pracovníci Pardubice: kde hledat' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    jakNajitLink,
    naborLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// HRADEC KRÁLOVÉ
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_HRADEC_KRALOVE: SeoPage = {
  slug: 'pracovnici-hradec-kralove',
  breadcrumbLabel: 'Pracovníci Hradec Králové',
  eyebrow: 'Nábor · Hradec Králové',
  title: 'Pracovníci Hradec Králové: nábor a hledání pracovní síly',
  heroSubtitle:
    'Jak v Hradci Králové najít pracovníky v regionálním centru zaměstnanosti s vyváženou skladbou ekonomiky. Praktický přehled pro zaměstnavatele.',
  description:
    'Pracovníci Hradec Králové – jak v regionálním centru zaměstnanosti najít pracovní sílu: vyvážená skladba sektorů, kanály a plánování. Praktický přehled bez vymyšlených čísel.',
  keywords: ['pracovníci Hradec Králové', 'nábor Hradec Králové', 'hledání pracovníků Hradec Králové', 'trh práce Hradec Králové', 'regionální centrum', 'výroba služby'],
  intro:
    'Hradec Králové je regionálním centrem zaměstnanosti s vyváženou skladbou ekonomiky, která zahrnuje výrobu, služby i navazující provozy. Pro zaměstnavatele to znamená dostupnost různorodé pracovní síly, ale i konkurenci o ni v rámci spádové oblasti. Tato stránka shrnuje, jak v Hradci Králové hledat pracovní sílu a které sektory poptávku určují. Konkrétní mzdy ani statistiky neuvádíme – patří do oficiálních zdrojů; nabízíme praktický přehled, který zohledňuje roli města jako regionálního centra a jeho spádovou oblast.',
  sections: [
    {
      heading: 'Trh práce v Hradci Králové',
      body: [
        'Jako regionální centrum přitahuje Hradec Králové pracovní sílu ze spádové oblasti a kombinuje poptávku výroby, služeb a navazujících provozů. Vyvážená skladba znamená různorodé profese, o které soutěží zaměstnavatelé z širšího okolí.',
        'Spádovost města rozšiřuje okruh dostupných kandidátů za jeho hranice.',
      ],
    },
    {
      heading: 'Kde v Hradci Králové hledat pracovníky',
      body: [
        'Vzhledem k pestré poptávce se osvědčuje kombinace inzerce, doporučení a agenturní kapacity podle typu pozice. U nedostatkových profesí rozšiřuje okruh nábor ze zahraničí. Spádovou oblast je vhodné zohlednit v oslovení.',
      ],
      bullets: [
        'Inzerce a doporučení podle typu pozice',
        'Agenturní kapacita pro provozní a výrobní role',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Oslovení kandidátů ze spádové oblasti',
      ],
    },
    {
      heading: 'Plánování pracovní síly v Hradci Králové',
      body: [
        'Díky roli regionálního centra se vyplatí plánovat nábor s ohledem na spádovou oblast a kombinovat stálé jádro s flexibilní kapacitou podle sektoru. Pro zaměstnavatele z toho plyne rozhodnutí přizpůsobit nábor různorodým profesím.',
        'Aktuální obraz regionálního trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Čím je výhodný nábor v Hradci Králové?', a: 'Jako regionální centrum přitahuje pracovní sílu ze spádové oblasti a nabízí různorodé profese. Zároveň o ně soutěží zaměstnavatelé z širšího okolí.' },
    { q: 'Jak oslovit kandidáty ze spádové oblasti?', a: 'Inzercí a doporučeními cílenými na širší okolí a zohledněním dojížďky. U provozních pozic pomáhá agenturní kapacita.' },
    { q: 'Uvádíte statistiky pro Hradec Králové?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-zamestnancu-hradec-kralove', label: 'Nábor zaměstnanců v Hradci Králové' },
    { href: '/trh-prace-kralovehradecky-kraj', label: 'Trh práce v Královéhradeckém kraji' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    { href: '/skladnici', label: 'Skladníci' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAMESTNANCU_HRADEC_KRALOVE: SeoPage = {
  slug: 'nabor-zamestnancu-hradec-kralove',
  breadcrumbLabel: 'Nábor zaměstnanců Hradec Králové',
  eyebrow: 'Nábor · Hradec Králové',
  title: 'Nábor zaměstnanců Hradec Králové: jak obsadit pozice',
  heroSubtitle:
    'Jak v Hradci Králové zorganizovat nábor v regionálním centru s pestrou poptávkou – cesty náboru a plánování. Praktický pohled pro zaměstnavatele.',
  description:
    'Nábor zaměstnanců Hradec Králové – jak obsadit pozice v regionálním centru s vyváženou skladbou sektorů: cesty náboru a plánování se spádovou oblastí. Bez vymyšlených čísel.',
  keywords: ['nábor zaměstnanců Hradec Králové', 'nábor Hradec Králové', 'obsazení pozic Hradec Králové', 'spádová oblast', 'pracovní agentura', 'recruitment Hradec Králové'],
  intro:
    'Nábor zaměstnanců v Hradci Králové těží z role města jako regionálního centra, které přitahuje pracovní sílu ze spádové oblasti. Pro zaměstnavatele to znamená přizpůsobit nábor pestré poptávce a využít širší okruh kandidátů. Tato stránka se věnuje tomu, jak nábor v Hradci Králové zorganizovat a jakými cestami obsazovat pozice. Doplňuje přehled o místních pracovnících o pohled na proces náboru. Konkrétní mzdy ani statistiky neuvádíme; nabízíme praktická doporučení pro různorodé profese regionálního centra.',
  sections: [
    {
      heading: 'Nábor v Hradci Králové: na co myslet',
      body: [
        'Regionální centrum přitahuje různorodou pracovní sílu, ale o ni soutěží i firmy z okolí. Náborová strategie by proto měla odpovídat typu pozice a využít spádovou oblast pro širší oslovení kandidátů.',
      ],
    },
    {
      heading: 'Cesty náboru v Hradci Králové',
      body: [
        'Pro kvalifikované a stálé role se hodí přímý nábor, pro provozní a výrobní pozice agenturní zaměstnávání a u nedostatkových profesí nábor ze zahraničí. Kombinace cest pokryje různorodou poptávku centra.',
      ],
      bullets: [
        'Přímý nábor pro kvalifikované a stálé role',
        'Agenturní kapacita pro provoz a výrobu',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Využití spádové oblasti pro oslovení',
      ],
    },
    {
      heading: 'Čím je hradecký trh práce specifický',
      body: [
        'Hradec Králové je dlouhodobě spojen se zdravotnictvím, lékařským vzděláváním a farmaceutickou tradicí; vedle toho zde působí strojírenské a zpracovatelské provozy. Tato skladba znamená, že vedle provozních a výrobních pozic je ve městě poptávka i po kvalifikovaných a odborných profesích.',
        'Hradec Králové a Pardubice leží blízko sebe a jejich spádové oblasti se částečně překrývají. Pro zaměstnavatele to znamená širší okruh kandidátů, ale také konkurenci o tytéž lidi napříč oběma městy – a nutnost počítat s dojížďkou mezi nimi.',
      ],
      bullets: [
        'Zdravotnictví, vzdělávání a farmaceutická tradice ovlivňují skladbu poptávky.',
        'Strojírenské a zpracovatelské provozy poptávají provozní profese.',
        'Spádová oblast se překrývá s Pardubicemi – širší nabídka i větší konkurence.',
        'U dojíždějících kandidátů je vhodné řešit dopravu na pracoviště.',
      ],
    },
    {
      heading: 'Plánování a rozhodnutí pro zaměstnavatele',
      body: [
        'Z různorodosti poptávky plyne rozhodnutí plánovat nábor odděleně pro různé typy pozic a využít širší spádovou oblast. Kombinace stálého jádra a flexibilní kapacity pomáhá pokrýt rozmanité profese.',
        'Aktuální obraz trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak v Hradci Králové oslovit více kandidátů?', a: 'Využitím spádové oblasti – inzercí a doporučeními cílenými na širší okolí a zohledněním dojížďky. U provozních pozic pomáhá agenturní kapacita.' },
    { q: 'Liší se nábor podle typu pozice?', a: 'Ano. U kvalifikovaných rolí rozhoduje kvalita výběru, u provozních pozic rychlost a kapacita. Strategii je vhodné přizpůsobit.' },
    { q: 'Uvádíte čísla pro místní trh?', a: 'Ne. Konkrétní statistiky ani mzdy nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-hradec-kralove', label: 'Pracovníci Hradec Králové: kde hledat' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    jakNajitLink,
    naborLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// LIBEREC
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_LIBEREC: SeoPage = {
  slug: 'pracovnici-liberec',
  breadcrumbLabel: 'Pracovníci Liberec',
  eyebrow: 'Nábor · Liberec',
  title: 'Pracovníci Liberec: nábor a hledání pracovní síly v Liberci',
  heroSubtitle:
    'Jak v Liberci najít pracovníky v regionu s výrobou a příhraničním kontextem. Praktický přehled pro zaměstnavatele na severu Čech.',
  description:
    'Pracovníci Liberec – jak v regionu s výrobou a příhraniční polohou najít pracovní sílu: dominantní sektory, vliv hranice a plánování. Praktický přehled bez vymyšlených čísel.',
  keywords: ['pracovníci Liberec', 'nábor Liberec', 'hledání pracovníků Liberec', 'trh práce Liberec', 'výroba Liberec', 'příhraniční region'],
  intro:
    'Liberec a okolí mají výrobní zázemí a zároveň příhraniční polohu, která ovlivňuje pohyb pracovní síly přes hranice. Pro zaměstnavatele to znamená specifickou konkurenci o pracovníky, kteří mohou volit i příležitosti v zahraničí. Tato stránka shrnuje, jak v Liberci hledat pracovní sílu a jak příhraniční kontext ovlivňuje nábor. Konkrétní mzdy ani statistiky neuvádíme – patří do oficiálních zdrojů; nabízíme praktický přehled, který zohledňuje výrobní charakter regionu a vliv blízké hranice.',
  sections: [
    {
      heading: 'Trh práce v Liberci',
      body: [
        'Liberecký trh práce je tažený výrobou a zpracovatelskými obory. Příhraniční poloha přináší specifikum: část pracovní síly zvažuje i příležitosti za hranicí, což zostřuje konkurenci o domácí pracovníky.',
        'Tento kontext je vhodné zohlednit při nastavení nabídky a udržení lidí.',
      ],
    },
    {
      heading: 'Kde v Liberci hledat pracovníky',
      body: [
        'U výrobních pozic pomáhá inzerce, doporučení a agenturní kapacita. Vzhledem k příhraničnímu kontextu a možnému nedostatku domácích pracovníků rozšiřuje okruh nábor ze zahraničí, který je v regionu častou cestou.',
      ],
      bullets: [
        'Inzerce a doporučení pro výrobní pozice',
        'Agenturní kapacita pro objem a výkyvy',
        'Nábor ze zahraničí jako častá cesta',
        'Konkurenceschopná nabídka kvůli blízkosti hranice',
      ],
    },
    {
      heading: 'Plánování pracovní síly v Liberci',
      body: [
        'Vzhledem k příhraničnímu kontextu se vyplatí věnovat pozornost udržení lidí a nastavení konkurenceschopných podmínek a kombinovat stálé jádro s flexibilní a zahraniční kapacitou. Pro zaměstnavatele z toho plyne rozhodnutí počítat s vyšší konkurencí o pracovníky.',
        'Aktuální obraz regionálního trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak příhraniční poloha ovlivňuje nábor v Liberci?', a: 'Část pracovní síly zvažuje i příležitosti za hranicí, což zostřuje konkurenci o domácí pracovníky. Vyplatí se konkurenceschopná nabídka a důraz na udržení.' },
    { q: 'Je v Liberci běžný nábor ze zahraničí?', a: 'U výrobních a nedostatkových profesí je nábor ze zahraničí častou cestou, jak rozšířit okruh kandidátů. Počítejte s administrativou oprávnění.' },
    { q: 'Uvádíte statistiky pro Liberec?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.czso, SRC.eures],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-zamestnancu-liberec', label: 'Nábor zaměstnanců v Liberci' },
    { href: '/trh-prace-liberecky-kraj', label: 'Trh práce v Libereckém kraji' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    foreignWorkersLink,
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAMESTNANCU_LIBEREC: SeoPage = {
  slug: 'nabor-zamestnancu-liberec',
  breadcrumbLabel: 'Nábor zaměstnanců Liberec',
  eyebrow: 'Nábor · Liberec',
  title: 'Nábor zaměstnanců Liberec: jak v Liberci obsadit pozice',
  heroSubtitle:
    'Jak v Liberci zorganizovat nábor s ohledem na výrobu a příhraniční konkurenci o pracovníky – cesty náboru a plánování. Praktický pohled pro zaměstnavatele.',
  description:
    'Nábor zaměstnanců Liberec – jak obsadit výrobní pozice v příhraničním regionu: cesty náboru, nábor ze zahraničí, udržení a plánování. Praktický pohled bez vymyšlených čísel.',
  keywords: ['nábor zaměstnanců Liberec', 'nábor Liberec', 'obsazení pozic Liberec', 'příhraniční nábor', 'pracovní agentura Liberec', 'recruitment Liberec'],
  intro:
    'Nábor zaměstnanců v Liberci ovlivňuje výrobní charakter regionu a jeho příhraniční poloha, kvůli které část pracovní síly zvažuje i zahraniční příležitosti. Pro zaměstnavatele to znamená nastavit konkurenceschopnou nabídku a počítat s vyšší konkurencí o pracovníky. Tato stránka se věnuje tomu, jak nábor v Liberci zorganizovat a jakými cestami obsazovat pozice. Doplňuje přehled o libereckých pracovnících o pohled na proces náboru. Konkrétní mzdy ani statistiky neuvádíme; nabízíme praktická doporučení pro výrobní provozy v příhraničním regionu.',
  sections: [
    {
      heading: 'Nábor v Liberci: na co myslet',
      body: [
        'Blízkost hranice zostřuje konkurenci o pracovníky, protože část z nich zvažuje i příležitosti za hranicí. Náborová strategie by proto měla počítat s konkurenceschopnou nabídkou a důrazem na udržení stávajících lidí.',
      ],
    },
    {
      heading: 'Cesty náboru v Liberci',
      body: [
        'Pro stálé jádro se hodí přímý nábor, pro pokrytí objemu agenturní zaměstnávání a u nedostatkových profesí nábor ze zahraničí, který je v regionu častou cestou. Kombinace umožní reagovat na konkurenční prostředí.',
      ],
      bullets: [
        'Přímý nábor pro stálé jádro',
        'Agenturní kapacita pro objem a výkyvy',
        'Nábor ze zahraničí jako častá cesta',
        'Udržení stávajících pracovníků',
      ],
    },
    {
      heading: 'Plánování a rozhodnutí pro zaměstnavatele',
      body: [
        'Z příhraniční konkurence plyne rozhodnutí věnovat pozornost retenci, nastavit konkurenceschopné podmínky a kombinovat stálé jádro s flexibilní a zahraniční kapacitou. U náboru ze zahraničí je nutné počítat s lhůtami na oprávnění.',
        'Aktuální obraz trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Proč je v Liberci důležitá retence?', a: 'Kvůli příhraniční konkurenci, kdy část pracovní síly zvažuje i příležitosti za hranicí. Udržení stávajících lidí snižuje tlak na neustálý nový nábor.' },
    { q: 'Jak rozšířit okruh kandidátů?', a: 'U výrobních a nedostatkových profesí náborem ze zahraničí, který je v regionu častou cestou. Počítejte s lhůtami na pobytová a pracovní oprávnění.' },
    { q: 'Uvádíte čísla pro liberecký trh?', a: 'Ne. Konkrétní statistiky ani mzdy nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.eures],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-liberec', label: 'Pracovníci Liberec: kde hledat' },
    naborCizincuLink,
    foreignWorkersLink,
    jakNajitLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// ÚSTÍ NAD LABEM
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_USTI_NAD_LABEM: SeoPage = {
  slug: 'pracovnici-usti-nad-labem',
  breadcrumbLabel: 'Pracovníci Ústí nad Labem',
  eyebrow: 'Nábor · Ústí nad Labem',
  title: 'Pracovníci Ústí nad Labem: nábor a hledání pracovní síly',
  heroSubtitle:
    'Jak v Ústí nad Labem najít pracovníky v regionu s průmyslovým a logistickým zázemím a dopravní polohou. Praktický přehled pro zaměstnavatele.',
  description:
    'Pracovníci Ústí nad Labem – jak v průmyslovém a logistickém regionu najít pracovní sílu: dominantní sektory, kanály a plánování. Praktický přehled bez vymyšlených čísel.',
  keywords: ['pracovníci Ústí nad Labem', 'nábor Ústí nad Labem', 'hledání pracovníků Ústí', 'trh práce Ústí nad Labem', 'průmysl logistika', 'výroba Ústí'],
  intro:
    'Ústí nad Labem a okolí mají průmyslové a logistické zázemí a výhodnou dopravní polohu na severu Čech. Zaměstnavatelé zde poptávají zejména výrobní a logistické pracovníky. Tato stránka shrnuje, jak v Ústí nad Labem hledat pracovní sílu a které sektory poptávku určují. Konkrétní mzdy ani statistiky neuvádíme – patří do oficiálních zdrojů; nabízíme praktický přehled, který zohledňuje průmyslově-logistický charakter regionu a jeho dopravní dostupnost.',
  sections: [
    {
      heading: 'Trh práce v Ústí nad Labem',
      body: [
        'Ústecký trh práce je spjatý s průmyslem a logistikou; dopravní poloha podporuje skladové a distribuční provozy. Poptávka po výrobních a logistických pracovnících je proto výrazná.',
        'Charakter regionu ovlivňuje skladbu poptávaných profesí i volbu náborových cest.',
      ],
    },
    {
      heading: 'Kde v Ústí nad Labem hledat pracovníky',
      body: [
        'U výrobních a logistických pozic se osvědčuje inzerce, doporučení a agenturní kapacita pro pružné pokrytí objemu. U nedostatkových profesí rozšiřuje okruh nábor ze zahraničí. Kanály je vhodné cílit podle typu provozu.',
      ],
      bullets: [
        'Inzerce a doporučení pro výrobu a logistiku',
        'Agenturní kapacita pro objemové potřeby',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Cílení podle typu provozu',
      ],
    },
    {
      heading: 'Plánování pracovní síly v Ústí nad Labem',
      body: [
        'Vzhledem k průmyslové a logistické poptávce se vyplatí plánovat nábor s předstihem a kombinovat stálé jádro s flexibilní kapacitou na výkyvy. Pro zaměstnavatele z toho plyne rozhodnutí zajistit kapacitu před nárůsty objemu.',
        'Aktuální obraz regionálního trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké pracovníky firmy v Ústí nad Labem hledají?', a: 'Zejména výrobní a logistické pracovníky, čemuž odpovídá průmyslový charakter regionu a jeho dopravní poloha.' },
    { q: 'Jak pokrýt objemové potřeby v Ústí?', a: 'Agenturní kapacitou doplněnou inzercí a doporučeními, u nedostatkových profesí náborem ze zahraničí; nábor je vhodné plánovat s předstihem.' },
    { q: 'Uvádíte statistiky pro Ústí nad Labem?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-zamestnancu-usti-nad-labem', label: 'Nábor zaměstnanců v Ústí nad Labem' },
    { href: '/trh-prace-ustecky-kraj', label: 'Trh práce v Ústeckém kraji' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAMESTNANCU_USTI_NAD_LABEM: SeoPage = {
  slug: 'nabor-zamestnancu-usti-nad-labem',
  breadcrumbLabel: 'Nábor zaměstnanců Ústí nad Labem',
  eyebrow: 'Nábor · Ústí nad Labem',
  title: 'Nábor zaměstnanců Ústí nad Labem: jak obsadit pozice',
  heroSubtitle:
    'Jak v Ústí nad Labem zorganizovat nábor pro výrobu a logistiku – cesty náboru a plánování. Praktický pohled pro zaměstnavatele na severu Čech.',
  description:
    'Nábor zaměstnanců Ústí nad Labem – jak obsadit výrobní a logistické pozice: cesty náboru, agenturní kapacita a plánování s předstihem. Praktický pohled bez vymyšlených čísel.',
  keywords: ['nábor zaměstnanců Ústí nad Labem', 'nábor Ústí', 'obsazení pozic Ústí', 'výroba logistika nábor', 'pracovní agentura Ústí', 'recruitment Ústí nad Labem'],
  intro:
    'Nábor zaměstnanců v Ústí nad Labem se opírá o průmyslový a logistický charakter regionu a jeho dopravní polohu. Pro zaměstnavatele to znamená pružně reagovat na objem výroby a logistiky a zajistit kapacitu před nárůsty poptávky. Tato stránka se věnuje tomu, jak nábor v Ústí nad Labem zorganizovat a jakými cestami obsazovat pozice. Doplňuje přehled o ústeckých pracovnících o pohled na proces náboru. Konkrétní mzdy ani statistiky neuvádíme; nabízíme praktická doporučení pro výrobní a logistické provozy.',
  sections: [
    {
      heading: 'Nábor v Ústí nad Labem: na co myslet',
      body: [
        'Průmyslová a logistická poptávka v regionu kolísá podle objemu výroby a sezóny, takže náborová kapacita musí být pružná. Před nárůsty objemu je vhodné zajistit posily předem, aby provoz nezadrhl.',
      ],
    },
    {
      heading: 'Cesty náboru v Ústí nad Labem',
      body: [
        'Pro stálé jádro se hodí přímý nábor, pro pokrytí objemu a špiček agenturní zaměstnávání a u nedostatkových profesí nábor ze zahraničí. Kombinace cest umožní zvládnout kolísavou poptávku výroby a logistiky.',
      ],
      bullets: [
        'Přímý nábor pro stálé jádro',
        'Agenturní kapacita pro objem a špičky',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Zajištění kapacity před nárůsty objemu',
      ],
    },
    {
      heading: 'Plánování a rozhodnutí pro zaměstnavatele',
      body: [
        'Z kolísavé poptávky plyne rozhodnutí plánovat nábor podle objemových cyklů a zajišťovat flexibilní kapacitu s předstihem. Tak firma zvládne nárůsty bez výpadků i bez zbytečných nákladů mimo špičku.',
        'Aktuální obraz trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak v Ústí zvládnout objemové nárůsty?', a: 'Kombinací stálého jádra a agenturní kapacity zajištěné s předstihem, doplněné u nedostatkových profesí náborem ze zahraničí.' },
    { q: 'Proč zajišťovat kapacitu předem?', a: 'Protože poptávka kolísá podle objemu výroby a sezóny a obsazení může trvat déle. Předstih snižuje riziko provozních výpadků.' },
    { q: 'Uvádíte čísla pro ústecký trh?', a: 'Ne. Konkrétní statistiky ani mzdy nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-usti-nad-labem', label: 'Pracovníci Ústí nad Labem: kde hledat' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    jakNajitLink,
    naborLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// OLOMOUC
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_OLOMOUC: SeoPage = {
  slug: 'pracovnici-olomouc',
  breadcrumbLabel: 'Pracovníci Olomouc',
  eyebrow: 'Nábor · Olomouc',
  title: 'Pracovníci Olomouc: nábor a hledání pracovní síly v Olomouci',
  heroSubtitle:
    'Jak v Olomouci najít pracovníky v regionálním centru pracovní síly s výrobou, službami a navazujícími obory. Praktický přehled pro zaměstnavatele.',
  description:
    'Pracovníci Olomouc – jak v regionálním centru pracovní síly najít pracovní sílu: dominantní sektory, kanály a plánování. Praktický přehled pro zaměstnavatele bez vymyšlených čísel.',
  keywords: ['pracovníci Olomouc', 'nábor Olomouc', 'hledání pracovníků Olomouc', 'trh práce Olomouc', 'regionální centrum', 'výroba služby Olomouc'],
  intro:
    'Olomouc je regionálním centrem pracovní síly na střední Moravě s vyváženou skladbou výroby, služeb a navazujících oborů a s univerzitním zázemím. Pro zaměstnavatele to znamená dostupnost různorodé pracovní síly ze spádové oblasti. Tato stránka shrnuje, jak v Olomouci hledat pracovní sílu a které sektory poptávku určují. Konkrétní mzdy ani statistiky neuvádíme – patří do oficiálních zdrojů; nabízíme praktický přehled, který zohledňuje roli města jako regionálního centra a jeho spádovou oblast.',
  sections: [
    {
      heading: 'Trh práce v Olomouci',
      body: [
        'Jako regionální centrum přitahuje Olomouc pracovní sílu ze spádové oblasti a kombinuje poptávku výroby, služeb a navazujících oborů. Univerzitní zázemí přináší příliv kvalifikovaných lidí, zatímco provozní a výrobní pozice soutěží o pracovníky v rámci regionu.',
        'Spádovost rozšiřuje okruh dostupných kandidátů.',
      ],
    },
    {
      heading: 'Kde v Olomouci hledat pracovníky',
      body: [
        'Vzhledem k pestré poptávce se osvědčuje kombinace inzerce, doporučení a agenturní kapacity podle typu pozice. U nedostatkových profesí rozšiřuje okruh nábor ze zahraničí. Spádovou oblast je vhodné zohlednit v oslovení.',
      ],
      bullets: [
        'Inzerce a doporučení podle typu pozice',
        'Agenturní kapacita pro provoz a výrobu',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Oslovení kandidátů ze spádové oblasti',
      ],
    },
    {
      heading: 'Plánování pracovní síly v Olomouci',
      body: [
        'Díky roli regionálního centra se vyplatí plánovat nábor s ohledem na spádovou oblast a kombinovat stálé jádro s flexibilní kapacitou podle sektoru. Pro zaměstnavatele z toho plyne rozhodnutí přizpůsobit nábor různorodým profesím.',
        'Aktuální obraz regionálního trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Čím je výhodný nábor v Olomouci?', a: 'Jako regionální centrum přitahuje různorodou pracovní sílu ze spádové oblasti a má univerzitní zázemí. O pracovníky ale soutěží firmy z regionu.' },
    { q: 'Jak oslovit kandidáty ze spádové oblasti?', a: 'Inzercí a doporučeními cílenými na širší okolí a zohledněním dojížďky. U provozních pozic pomáhá agenturní kapacita.' },
    { q: 'Uvádíte statistiky pro Olomouc?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-zamestnancu-olomouc', label: 'Nábor zaměstnanců v Olomouci' },
    { href: '/trh-prace-olomoucky-kraj', label: 'Trh práce v Olomouckém kraji' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    { href: '/skladnici', label: 'Skladníci' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAMESTNANCU_OLOMOUC: SeoPage = {
  slug: 'nabor-zamestnancu-olomouc',
  breadcrumbLabel: 'Nábor zaměstnanců Olomouc',
  eyebrow: 'Nábor · Olomouc',
  title: 'Nábor zaměstnanců Olomouc: jak v Olomouci obsadit pozice',
  heroSubtitle:
    'Jak v Olomouci zorganizovat nábor v regionálním centru s pestrou poptávkou – cesty náboru a plánování. Praktický pohled pro zaměstnavatele na střední Moravě.',
  description:
    'Nábor zaměstnanců Olomouc – jak obsadit pozice v regionálním centru pracovní síly: cesty náboru a plánování se spádovou oblastí. Praktický pohled bez vymyšlených čísel.',
  keywords: ['nábor zaměstnanců Olomouc', 'nábor Olomouc', 'obsazení pozic Olomouc', 'spádová oblast', 'pracovní agentura Olomouc', 'recruitment Olomouc'],
  intro:
    'Nábor zaměstnanců v Olomouci těží z role města jako regionálního centra pracovní síly se spádovou oblastí na střední Moravě. Pro zaměstnavatele to znamená přizpůsobit nábor pestré poptávce a využít širší okruh kandidátů. Tato stránka se věnuje tomu, jak nábor v Olomouci zorganizovat a jakými cestami obsazovat pozice. Doplňuje přehled o olomouckých pracovnících o pohled na proces náboru. Konkrétní mzdy ani statistiky neuvádíme; nabízíme praktická doporučení pro různorodé profese regionálního centra.',
  sections: [
    {
      heading: 'Nábor v Olomouci: na co myslet',
      body: [
        'Regionální centrum přitahuje různorodou pracovní sílu, o kterou ale soutěží i firmy z okolí. Náborová strategie by proto měla odpovídat typu pozice a využít spádovou oblast pro širší oslovení kandidátů.',
      ],
    },
    {
      heading: 'Cesty náboru v Olomouci',
      body: [
        'Pro kvalifikované a stálé role se hodí přímý nábor, pro provozní a výrobní pozice agenturní zaměstnávání a u nedostatkových profesí nábor ze zahraničí. Kombinace cest pokryje různorodou poptávku centra.',
      ],
      bullets: [
        'Přímý nábor pro kvalifikované a stálé role',
        'Agenturní kapacita pro provoz a výrobu',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Využití spádové oblasti pro oslovení',
      ],
    },
    {
      heading: 'Čím je olomoucký trh práce specifický',
      body: [
        'Olomouc je univerzitní město, takže na trh práce pravidelně vstupují absolventi – zároveň je o ně mezi zaměstnavateli silná konkurence a část z nich odchází za prací do větších center. Vedle toho je město obklopeno úrodnou Hanou s tradicí zemědělství a potravinářské výroby.',
        'Spádová oblast zahrnuje blízký Přerov a Prostějov, kde působí strojírenské a zpracovatelské provozy. Pro obsazování provozních pozic je proto obvykle nutné počítat s dojížďkou a s tím, že o stejné kandidáty soutěží zaměstnavatelé z celé aglomerace.',
      ],
      bullets: [
        'Univerzitní zázemí přivádí absolventy, ale i konkurenci o ně.',
        'Zemědělská a potravinářská tradice regionu Haná ovlivňuje sezónní poptávku.',
        'Spádová oblast zasahuje k Přerovu a Prostějovu.',
        'U provozních pozic je dojížďka a doprava častým tématem náboru.',
      ],
    },
    {
      heading: 'Plánování a rozhodnutí pro zaměstnavatele',
      body: [
        'Z různorodosti poptávky plyne rozhodnutí plánovat nábor odděleně pro různé typy pozic a využít širší spádovou oblast. Kombinace stálého jádra a flexibilní kapacity pomáhá pokrýt rozmanité profese.',
        'Aktuální obraz trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak v Olomouci oslovit více kandidátů?', a: 'Využitím spádové oblasti – inzercí a doporučeními cílenými na širší okolí a zohledněním dojížďky. U provozních pozic pomáhá agenturní kapacita.' },
    { q: 'Liší se nábor podle typu pozice?', a: 'Ano. U kvalifikovaných rolí rozhoduje kvalita výběru, u provozních pozic rychlost a kapacita. Strategii je vhodné přizpůsobit.' },
    { q: 'Uvádíte čísla pro místní trh?', a: 'Ne. Konkrétní statistiky ani mzdy nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-olomouc', label: 'Pracovníci Olomouc: kde hledat' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    jakNajitLink,
    naborLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// ZLÍN
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_ZLIN: SeoPage = {
  slug: 'pracovnici-zlin',
  breadcrumbLabel: 'Pracovníci Zlín',
  eyebrow: 'Nábor · Zlín',
  title: 'Pracovníci Zlín: nábor a hledání pracovní síly ve Zlíně',
  heroSubtitle:
    'Jak ve Zlíně najít pracovníky v regionu s tradicí zpracovatelského průmyslu a službami. Praktický přehled pro zaměstnavatele na východě Moravy.',
  description:
    'Pracovníci Zlín – jak v regionu s tradicí zpracovatelského průmyslu a službami najít pracovní sílu: dominantní sektory, kanály a plánování. Praktický přehled bez vymyšlených čísel.',
  keywords: ['pracovníci Zlín', 'nábor Zlín', 'hledání pracovníků Zlín', 'trh práce Zlín', 'výroba Zlín', 'zpracovatelský průmysl'],
  intro:
    'Zlín a okolí mají tradici zpracovatelského průmyslu doplněnou službami a navazujícími obory. Zaměstnavatelé zde poptávají výrobní i provozní pracovníky a profitují z regionální pracovní síly se zkušeností. Tato stránka shrnuje, jak ve Zlíně hledat pracovní sílu a které sektory poptávku určují. Konkrétní mzdy ani statistiky neuvádíme – patří do oficiálních zdrojů; nabízíme praktický přehled, který zohledňuje výrobně-servisní charakter regionu a jeho tradici.',
  sections: [
    {
      heading: 'Trh práce ve Zlíně',
      body: [
        'Zlínský trh práce stojí na tradici zpracovatelského průmyslu a kombinuje výrobní poptávku se službami a navazujícími obory. Tradice znamená dostupnost lidí se zkušeností z výroby, zároveň o provozní pracovníky soutěží firmy v regionu.',
        'Charakter regionu ovlivňuje skladbu poptávaných profesí.',
      ],
    },
    {
      heading: 'Kde ve Zlíně hledat pracovníky',
      body: [
        'U výrobních a provozních pozic pomáhá inzerce, doporučení a agenturní kapacita. U nedostatkových profesí rozšiřuje okruh nábor ze zahraničí. U klíčových rolí je důležité i udržení zkušených lidí.',
      ],
      bullets: [
        'Inzerce a doporučení pro výrobu a provoz',
        'Agenturní kapacita pro objem a výkyvy',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Udržení zkušených klíčových pracovníků',
      ],
    },
    {
      heading: 'Plánování pracovní síly ve Zlíně',
      body: [
        'Vzhledem k výrobní tradici se vyplatí plánovat nábor i udržení a kombinovat stálé jádro se zkušeností s flexibilní kapacitou na výkyvy. Pro zaměstnavatele z toho plyne rozhodnutí investovat do retence i náboru.',
        'Aktuální obraz regionálního trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké pracovníky firmy ve Zlíně hledají?', a: 'Zejména výrobní a provozní pracovníky, čemuž odpovídá tradice zpracovatelského průmyslu doplněná službami a navazujícími obory.' },
    { q: 'Jak udržet zkušené pracovníky?', a: 'Férovými podmínkami, kontinuitou a dobrým vedením. Nahrazení zkušeného provozního pracovníka je náročné, proto se udržení vyplatí.' },
    { q: 'Uvádíte statistiky pro Zlín?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-zamestnancu-zlin', label: 'Nábor zaměstnanců ve Zlíně' },
    { href: '/trh-prace-zlinsky-kraj', label: 'Trh práce ve Zlínském kraji' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    { href: '/skladnici', label: 'Skladníci' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAMESTNANCU_ZLIN: SeoPage = {
  slug: 'nabor-zamestnancu-zlin',
  breadcrumbLabel: 'Nábor zaměstnanců Zlín',
  eyebrow: 'Nábor · Zlín',
  title: 'Nábor zaměstnanců Zlín: jak ve Zlíně obsadit pozice',
  heroSubtitle:
    'Jak ve Zlíně zorganizovat nábor s ohledem na tradici zpracovatelského průmyslu a služby – cesty náboru a plánování. Praktický pohled pro zaměstnavatele.',
  description:
    'Nábor zaměstnanců Zlín – jak obsadit výrobní a provozní pozice: cesty náboru, udržení zkušených lidí a plánování. Praktický pohled bez vymyšlených čísel.',
  keywords: ['nábor zaměstnanců Zlín', 'nábor Zlín', 'obsazení pozic Zlín', 'výroba služby nábor', 'pracovní agentura Zlín', 'recruitment Zlín'],
  intro:
    'Nábor zaměstnanců ve Zlíně se opírá o tradici zpracovatelského průmyslu doplněnou službami. Pro zaměstnavatele to přináší dostupnost zkušených výrobních pracovníků i nutnost soutěžit o ně s ostatními firmami v regionu. Tato stránka se věnuje tomu, jak nábor ve Zlíně zorganizovat a jakými cestami obsazovat pozice. Doplňuje přehled o zlínských pracovnících o pohled na proces náboru. Konkrétní mzdy ani statistiky neuvádíme; nabízíme praktická doporučení pro výrobní a servisní provozy.',
  sections: [
    {
      heading: 'Nábor ve Zlíně: na co myslet',
      body: [
        'Tradice zpracovatelského průmyslu znamená dostupnost lidí se zkušeností z výroby, zároveň o provozní pracovníky soutěží firmy v regionu. Náborová strategie by měla odpovídat typu pozice a počítat s konkurencí o zkušené lidi.',
      ],
    },
    {
      heading: 'Cesty náboru ve Zlíně',
      body: [
        'Pro stálé jádro se hodí přímý nábor s důrazem na udržení, pro pokrytí objemu agenturní zaměstnávání a u nedostatkových profesí nábor ze zahraničí. Kombinace cest pokryje výrobní i servisní poptávku.',
      ],
      bullets: [
        'Přímý nábor a udržení pro stálé jádro',
        'Agenturní kapacita pro objem a výkyvy',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Strategie podle typu pozice',
      ],
    },
    {
      heading: 'Plánování a rozhodnutí pro zaměstnavatele',
      body: [
        'Z konkurence o zkušené pracovníky plyne rozhodnutí plánovat nábor i retenci a kombinovat stálé jádro s flexibilní kapacitou. Tak firma pokryje poptávku a udrží klíčové lidi.',
        'Aktuální obraz trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Je ve Zlíně dostatek zkušených pracovníků?', a: 'Tradice zpracovatelského průmyslu znamená dostupnost lidí se zkušeností z výroby. O provozní pracovníky ale soutěží firmy v regionu; ověřte aktuální data.' },
    { q: 'Proč věnovat pozornost retenci?', a: 'Nahrazení zkušeného provozního pracovníka je náročné a konkurence o ně je v regionu citelná. Retence snižuje tlak na neustálý nový nábor.' },
    { q: 'Uvádíte čísla pro zlínský trh?', a: 'Ne. Konkrétní statistiky ani mzdy nevymýšlíme. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-zlin', label: 'Pracovníci Zlín: kde hledat' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    jakNajitLink,
    naborLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// Registry — ordered by city (overview page, then recruitment page).
// ──────────────────────────────────────────────────────────────────────────

export const CITY_RECRUITMENT_PAGES: ReadonlyArray<SeoPage> = [
  PRACOVNICI_PRAHA,
  NABOR_ZAMESTNANCU_PRAHA,
  PRACOVNICI_BRNO,
  NABOR_ZAMESTNANCU_BRNO,
  PRACOVNICI_OSTRAVA,
  NABOR_ZAMESTNANCU_OSTRAVA,
  PRACOVNICI_PLZEN,
  NABOR_ZAMESTNANCU_PLZEN,
  PRACOVNICI_PARDUBICE,
  NABOR_ZAMESTNANCU_PARDUBICE,
  PRACOVNICI_HRADEC_KRALOVE,
  NABOR_ZAMESTNANCU_HRADEC_KRALOVE,
  PRACOVNICI_LIBEREC,
  NABOR_ZAMESTNANCU_LIBEREC,
  PRACOVNICI_USTI_NAD_LABEM,
  NABOR_ZAMESTNANCU_USTI_NAD_LABEM,
  PRACOVNICI_OLOMOUC,
  NABOR_ZAMESTNANCU_OLOMOUC,
  PRACOVNICI_ZLIN,
  NABOR_ZAMESTNANCU_ZLIN,
]
