// Industry recruitment authority cluster — commercial-intent pages for
// employers who actively look for workers in a specific industry (výroba,
// sklady, logistika, stavebnictví, potravinářství, automotive). Each page
// answers "how can an employer recruit workers for this type of operation?"
// and is genuinely differentiated by role and industry, with sections for
// industry context, recruitment, onboarding and workforce planning.
//
// All content is qualitative and source-backed. No invented salary data,
// labor-shortage or recruitment statistics, vacancy counts, productivity or
// workforce benchmarks, placement success rates, ROI claims, rankings or
// staffing guarantees. Variable values defer to official sources with
// cautious language.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-06-02'

const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}

// Shared cluster anchors.
const employerHubLink = { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' }
const empFaqLink = { href: '/faq-pro-zamestnavatele', label: 'FAQ pro zaměstnavatele' }
const naborLink = { href: '/nabor-pracovniku', label: 'Nábor pracovníků: přehled cest' }
const jakNajitLink = { href: '/jak-najit-pracovniky', label: 'Jak najít pracovníky pro firmu' }
const planovaniLink = { href: '/planovani-naboru', label: 'Plánování náboru' }
const foreignWorkersLink = { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' }
const naborCizincuLink = { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' }
const agenturaLink = { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' }
const docasneLink = { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' }

const hireCta = {
  eyebrow: 'Nábor pracovníků',
  title: 'Potřebujete obsadit pozice?',
  text: 'Pomůžeme vám s náborem od definice potřeby až po nástup a postaráme se o koordinaci administrativy v souladu s předpisy. Rádi probereme konkrétní potřebu vašeho provozu.',
  buttonLabel: 'Poslat poptávku',
  href: '/submit-offer',
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER A — VÝROBA (manufacturing)
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_PRO_VYROBU: SeoPage = {
  slug: 'pracovnici-pro-vyrobu',
  breadcrumbLabel: 'Pracovníci pro výrobu',
  eyebrow: 'Nábor · Výroba',
  title: 'Pracovníci pro výrobu: nábor a personální zajištění',
  heroSubtitle:
    'Jak personálně zajistit výrobní provoz – jaké role obsazovat, jakými cestami nabírat a jak udržet kontinuitu výroby. Praktický přehled pro výrobní firmy.',
  description:
    'Pracovníci pro výrobu – jak personálně zajistit výrobní provoz: role, náborové cesty, zaškolení a plánování kapacity pro kontinuitu výroby. Praktický přehled bez vymyšlených čísel.',
  keywords: ['pracovníci pro výrobu', 'nábor do výroby', 'personální zajištění výroby', 'výrobní provoz nábor', 'operátoři montáž', 'směnný provoz'],
  intro:
    'Personální zajištění výroby je úkol, který spojuje obsazení konkrétních pozic s nutností udržet provoz v chodu i při výkyvech objednávek a fluktuaci. Výrobní firmy obvykle kombinují operátorské, montážní a pomocné role ve směnném provozu, a každá z nich má jiné nároky na nábor i zaškolení. Tato stránka nabízí přehled, jak k personálnímu zajištění výroby přistoupit – od volby náborových cest po plánování kapacity. Konkrétní mzdy ani počty volných míst neuvádíme; jde o praktický rámec pro rozhodování, který si firma naplní vlastními a ověřenými daty.',
  sections: [
    {
      heading: 'Specifika výrobního provozu',
      body: [
        'Výroba běžně funguje ve směnách a klade důraz na kontinuitu – výpadek lidí se promítá přímo do plnění objednávek. Pozice se liší od obsluhy strojů přes ruční montáž po pomocné a manipulační práce, což znamená různé požadavky na kvalifikaci a zaškolení.',
        'Roli hraje i sezónnost a kolísání objednávek, kvůli kterým je potřeba lidí v čase nerovnoměrná.',
      ],
    },
    {
      heading: 'Náborové úvahy pro výrobu',
      body: [
        'U výrobních pozic se osvědčuje kombinace náborových cest: přímý nábor pro stálé jádro, agenturní zaměstnávání pro pružné pokrytí výkyvů a u nedostatkových profesí nábor ze zahraničí. Volba závisí na naléhavosti a na tom, zda jde o stálou, nebo dočasnou potřebu.',
      ],
      bullets: [
        'Stálé jádro obsazovat přímým náborem',
        'Výkyvy objednávek pokrýt agenturní kapacitou',
        'U nedostatkových profesí zvážit nábor ze zahraničí',
        'Inzerci cílit na konkrétní typ výrobní práce',
      ],
    },
    {
      heading: 'Zaškolení a nástup',
      body: [
        'Nástup do výroby zahrnuje vstupní školení BOZP, seznámení s pracovištěm a stroji a postupné zaučení. U strojních a montážních pozic je doba do plné produktivity delší, proto se vyplatí zaškolení dobře připravit a mít určenou oporu.',
        'Kvalitní onboarding snižuje riziko brzkých odchodů, které ve směnném provozu narušují obsazení směn.',
      ],
    },
    {
      heading: 'Plánování kapacity výroby',
      body: [
        'Plánování personální kapacity vychází z výrobního plánu a sezónnosti. Vhodné je oddělit stálou potřebu od špiček a ke každé přiřadit jinou cestu zajištění – stálé jádro a flexibilní kapacitu. U náboru ze zahraničí je nutné počítat s časem na oprávnění.',
        'Aktuální data o trhu práce a nedostatkových profesích zveřejňují ČSÚ, MPSV a Úřad práce ČR; tato stránka konkrétní čísla neuvádí.',
      ],
    },
  ],
  faq: [
    { q: 'Jak rychle obsadit výpadek ve výrobě?', a: 'Pružnou cestou bývá agenturní zaměstnávání, které umožní reagovat na výkyvy. U nedostatkových profesí pomáhá i nábor ze zahraničí, byť s delší přípravou kvůli oprávněním. Neslibujeme okamžité obsazení.' },
    { q: 'Jaké role výroba obvykle obsazuje?', a: 'Nejčastěji operátory strojů, montážní a pomocné a manipulační pracovníky. Každá role má jiné nároky na kvalifikaci a zaškolení.' },
    { q: 'Uvádíte mzdy nebo počty volných míst?', a: 'Ne. Konkrétní mzdy ani statistiky nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/operatori-vyroby', label: 'Operátoři výroby' },
    { href: '/montazni-pracovnici', label: 'Montážní pracovníci' },
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    naborCizincuLink,
    naborLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const OPERATORI_VYROBY: SeoPage = {
  slug: 'operatori-vyroby',
  breadcrumbLabel: 'Operátoři výroby',
  eyebrow: 'Nábor · Výroba',
  title: 'Operátoři výroby: nábor výrobních pracovníků',
  heroSubtitle:
    'Jak nabírat operátory výroby pro obsluhu strojů a linek – na co se u této role zaměřit při náboru, zaškolení a plánování směn. Praktický pohled pro výrobní firmy.',
  description:
    'Operátoři výroby – jak nabírat pracovníky pro obsluhu strojů a linek: náborové úvahy, zaškolení na stroje a plánování směnového pokrytí. Praktický pohled bez vymyšlených čísel.',
  keywords: ['operátoři výroby', 'nábor operátorů', 'obsluha strojů', 'výrobní linka', 'směnný provoz', 'operátor CNC'],
  intro:
    'Operátoři výroby obsluhují stroje a výrobní linky a jsou klíčoví pro plynulý chod provozu. Oproti pomocným pozicím u nich roste význam spolehlivosti a zaškolení na konkrétní zařízení, protože chyba nebo výpadek se promítají do celé linky. Tato stránka se věnuje tomu, jak operátory nabírat, zaškolovat a plánovat jejich pokrytí ve směnách. Neuvádí konkrétní mzdy ani statistiky – ty patří do oficiálních zdrojů; nabízí praktické úvahy pro zaměstnavatele, kteří tuto roli obsazují.',
  sections: [
    {
      heading: 'Co role operátora obnáší',
      body: [
        'Operátor obsluhuje stroj nebo linku, sleduje její chod, řeší běžné situace a dbá na kvalitu a bezpečnost. Náročnost se liší podle typu zařízení – od jednodušší obsluhy po pozice vyžadující delší zaučení a zodpovědnost za výstup.',
        'Vzhledem k vazbě na konkrétní stroje je u operátorů důležitá kontinuita a nižší fluktuace.',
      ],
    },
    {
      heading: 'Na co myslet při náboru operátorů',
      body: [
        'Při náboru operátorů se vyplatí jasně popsat typ zařízení a směnný režim už v inzerci a zaměřit se na spolehlivost a ochotu zaučit se. Stálé jádro je vhodné obsazovat přímým náborem; pro pokrytí špiček lze využít agenturní kapacitu.',
      ],
      bullets: [
        'V inzerci uvést typ strojů a směnný režim',
        'Důraz na spolehlivost a ochotu zaučit se',
        'Stálé jádro přímým náborem',
        'Špičky agenturní kapacitou',
      ],
    },
    {
      heading: 'Zaškolení na stroje a BOZP',
      body: [
        'Zaškolení operátora zahrnuje vstupní školení BOZP a praktické zaučení na konkrétní zařízení, často pod vedením zkušeného kolegy. Doba do plné produktivity bývá u složitějších strojů delší, s čímž je nutné počítat při plánování.',
        'Připravené zaškolení zkracuje dobu náběhu a snižuje riziko chyb i úrazů.',
      ],
    },
    {
      heading: 'Plánování směnového pokrytí',
      body: [
        'U operátorů je klíčové plánovat pokrytí směn tak, aby výpadek jednotlivce neohrozil chod linky. Pomáhá zastupitelnost (zaučení na více pozic) a stabilní rozvrhy, které podporují udržení lidí. U náboru ze zahraničí je nutné zahrnout čas na oprávnění.',
        'Aktuální data o nedostatkových profesích zveřejňují ČSÚ, MPSV a Úřad práce ČR.',
      ],
    },
  ],
  faq: [
    { q: 'Co odlišuje nábor operátorů od pomocných pozic?', a: 'U operátorů roste význam spolehlivosti a zaškolení na konkrétní zařízení, protože jejich výpadek ovlivní celou linku. Doba do plné produktivity bývá delší.' },
    { q: 'Jak zajistit pokrytí směn?', a: 'Pomáhá zastupitelnost (zaučení na více pozic), stabilní rozvrhy a kombinace stálého jádra s agenturní kapacitou na špičky.' },
    { q: 'Garantujete dostupnost operátorů?', a: 'Ne. Neslibujeme okamžitou dostupnost ani počty. Pomáháme s náborem; konkrétní situace závisí na trhu práce a typu zařízení.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu: přehled' },
    { href: '/montazni-pracovnici', label: 'Montážní pracovníci' },
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    agenturaLink,
    jakNajitLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const MONTAZNI_PRACOVNICI: SeoPage = {
  slug: 'montazni-pracovnici',
  breadcrumbLabel: 'Montážní pracovníci',
  eyebrow: 'Nábor · Výroba',
  title: 'Montážní pracovníci pro výrobní provozy',
  heroSubtitle:
    'Jak obsazovat montážní pozice – ruční montáž, manuální zručnost a kvalita. Náborové, zaškolovací a plánovací úvahy pro výrobní provozy.',
  description:
    'Montážní pracovníci – jak obsazovat pozice ruční montáže ve výrobě: náborové úvahy, zaškolení na pracovní postupy a plánování kapacity. Praktický pohled bez vymyšlených čísel.',
  keywords: ['montážní pracovníci', 'ruční montáž', 'montážní pozice', 'výrobní montáž', 'manuální zručnost', 'nábor montáž'],
  intro:
    'Montážní pracovníci zajišťují ruční sestavování výrobků a patří k nejčastěji obsazovaným pozicím ve výrobě. Práce bývá opakovaná, vázaná na pracovní postupy a na požadovanou kvalitu a tempo. Tato stránka se věnuje tomu, jak montážní pozice obsazovat, zaškolovat a plánovat, s ohledem na jejich specifika – manuální zručnost, dodržování postupů a kvalitu. Konkrétní mzdy ani normy neuvádíme; jde o praktický pohled pro zaměstnavatele, který si firma doplní podle svého provozu a ověřených dat.',
  sections: [
    {
      heading: 'Specifika montážní práce',
      body: [
        'Montáž obvykle znamená opakované sestavování dílů podle daného postupu, kde záleží na přesnosti, tempu a kvalitě. Vstupní kvalifikace bývá nižší než u obsluhy složitých strojů, o to důležitější je však zaučení na konkrétní postup a zručnost.',
        'Montážní pozice se často obsazují ve větším počtu a ve směnách, což klade nároky na nábor i stabilitu.',
      ],
    },
    {
      heading: 'Náborové úvahy pro montáž',
      body: [
        'Protože vstupní bariéra bývá nižší, lze montážní pozice obsazovat širším okruhem kandidátů a rychleji zaučit. Pro objemové a sezónní potřeby se hodí agenturní zaměstnávání; u nedostatku na trhu rozšiřuje okruh nábor ze zahraničí.',
      ],
      bullets: [
        'Širší okruh kandidátů díky nižší vstupní bariéře',
        'Objemové potřeby řešit agenturní kapacitou',
        'Nábor ze zahraničí u dlouhodobého nedostatku',
        'V inzerci popsat charakter a tempo práce',
      ],
    },
    {
      heading: 'Zaškolení na pracovní postupy',
      body: [
        'Zaškolení montážního pracovníka se soustředí na konkrétní postup, kvalitu a bezpečnost, vedle vstupního školení BOZP. Dobře nastavené zaučení a jasná očekávání zkracují náběh a snižují zmetkovitost.',
        'U opakované práce hraje roli také ergonomické zázemí a střídání úkonů.',
      ],
    },
    {
      heading: 'Plánování kapacity montáže',
      body: [
        'Montážní kapacitu je vhodné plánovat podle objednávek a sezónnosti, se stálým jádrem a flexibilní složkou na špičky. Vzhledem k vyšší fluktuaci u opakované práce se vyplatí věnovat pozornost retenci a kvalitě nástupu.',
        'Aktuální obraz trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak rychle lze obsadit montážní pozice?', a: 'Díky nižší vstupní bariéře bývá zaučení rychlejší a okruh kandidátů širší. Objemové potřeby pomáhá pokrýt agenturní kapacita. Okamžité obsazení neslibujeme.' },
    { q: 'Co je u montáže při náboru důležité?', a: 'Manuální zručnost, spolehlivost a ochota dodržovat postupy a tempo. V inzerci se vyplatí popsat charakter a tempo práce a směnný režim.' },
    { q: 'Pomůže nábor ze zahraničí?', a: 'U dlouhodobého nedostatku rozšiřuje okruh kandidátů. Je třeba počítat s administrativou oprávnění; podrobnosti popisují stránky o zaměstnávání cizinců.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu: přehled' },
    { href: '/operatori-vyroby', label: 'Operátoři výroby' },
    { href: '/montazni-linky-pracovnici', label: 'Pracovníci montážních linek' },
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRACOVNICI_DO_VYROBY: SeoPage = {
  slug: 'pracovnici-do-vyroby',
  breadcrumbLabel: 'Pracovníci do výroby',
  eyebrow: 'Nábor · Výroba',
  title: 'Pracovníci do výroby: přehled pro zaměstnavatele',
  heroSubtitle:
    'Jak rychle a smysluplně obsadit nástupní výrobní pozice – nízká vstupní bariéra, rychlé zaučení a pružné formy zajištění. Praktický pohled pro zaměstnavatele.',
  description:
    'Pracovníci do výroby – jak obsadit nástupní výrobní pozice: nízká vstupní bariéra, rychlé zaučení a pružné formy zajištění (agentura, zahraniční nábor). Praktický pohled bez čísel.',
  keywords: ['pracovníci do výroby', 'nástupní pozice výroba', 'rychlý nábor výroba', 'zaučení výroba', 'brigádníci výroba', 'agenturní pracovníci'],
  intro:
    'Pojmem „pracovníci do výroby“ se obvykle míní nástupní pozice s nízkou vstupní bariérou, které lze obsadit širším okruhem kandidátů a relativně rychle zaučit. Pro zaměstnavatele jsou klíčové tam, kde je potřeba pokrýt objem práce nebo sezónní špičku. Tato stránka se věnuje tomu, jak tyto pozice obsazovat efektivně a férově – od náborových cest po rychlé zaškolení. Neuvádí konkrétní mzdy ani počty; nabízí praktický rámec, který si firma přizpůsobí. Důraz klade na pružnost a na to, aby rychlost nešla na úkor kvality nástupu.',
  sections: [
    {
      heading: 'Charakter nástupních pozic',
      body: [
        'Nástupní výrobní pozice obvykle nevyžadují předchozí kvalifikaci a stojí na ochotě pracovat ve směnách a zaučit se. Právě proto je lze obsadit rychleji a širším okruhem kandidátů než specializované role.',
        'Tyto pozice často slouží i jako vstup do firmy, ze kterého lze postupovat na náročnější role.',
      ],
    },
    {
      heading: 'Jak nástupní pozice obsazovat',
      body: [
        'Pro rychlé a objemové obsazení se hodí kombinace inzerce, doporučení a agenturního zaměstnávání. Agentura pomáhá pružně pokrýt sezónní špičky a dočasné výpadky; u dlouhodobého nedostatku rozšiřuje okruh nábor ze zahraničí.',
      ],
      bullets: [
        'Inzerce s jasným popisem práce a směn',
        'Doporučení od stávajících zaměstnanců',
        'Agenturní kapacita na špičky a výpadky',
        'Nábor ze zahraničí u dlouhodobého nedostatku',
      ],
    },
    {
      heading: 'Rychlé, ale kvalitní zaškolení',
      body: [
        'I u nástupních pozic platí, že připravené zaškolení (vstupní BOZP, seznámení s pracovištěm, jasná očekávání) snižuje brzké odchody. Rychlost obsazení by neměla jít na úkor kvality nástupu, jinak roste fluktuace.',
        'Určená opora pro nového člověka usnadní první dny ve směnném provozu.',
      ],
    },
    {
      heading: 'Plánování objemu a špiček',
      body: [
        'U nástupních pozic je vhodné plánovat dopředu zejména sezónní špičky a počítat s určitou fluktuací. Stálé jádro doplněné flexibilní agenturní kapacitou umožní reagovat na objem bez zbytečných nákladů mimo špičku.',
        'Aktuální data trhu práce poskytují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Potřebují pracovníci do výroby kvalifikaci?', a: 'Nástupní výrobní pozice obvykle nevyžadují předchozí kvalifikaci a stojí na ochotě zaučit se a pracovat ve směnách. Náročnější role vyžadují více.' },
    { q: 'Jak obsadit větší počet lidí najednou?', a: 'Pro objemové a sezónní potřeby se hodí agenturní zaměstnávání doplněné inzercí a doporučeními. U dlouhodobého nedostatku pomáhá nábor ze zahraničí.' },
    { q: 'Nezvýší rychlý nábor fluktuaci?', a: 'Může, pokud rychlost jde na úkor kvality nástupu. Připravené zaškolení a jasná očekávání riziko brzkých odchodů snižují.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu: přehled' },
    { href: '/vyrobni-zamestnanci', label: 'Výrobní zaměstnanci: plánování' },
    docasneLink,
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const VYROBNI_ZAMESTNANCI: SeoPage = {
  slug: 'vyrobni-zamestnanci',
  breadcrumbLabel: 'Výrobní zaměstnanci',
  eyebrow: 'Nábor · Výroba',
  title: 'Výrobní zaměstnanci: plánování náboru a obsazení pozic',
  heroSubtitle:
    'Jak plánovat obsazení výrobních pozic napříč rolemi a směnami – od stálého jádra po flexibilní kapacitu. Pohled zaměřený na plánování pro výrobní firmy.',
  description:
    'Výrobní zaměstnanci – jak plánovat nábor a obsazení pozic napříč rolemi a směnami: stálé jádro vs. flexibilní kapacita, sezónnost a lhůty. Plánovací pohled bez vymyšlených čísel.',
  keywords: ['výrobní zaměstnanci', 'plánování náboru výroba', 'obsazení výrobních pozic', 'směnové pokrytí', 'kapacita výroby', 'workforce planning výroba'],
  intro:
    'Tato stránka pohlíží na výrobní zaměstnance z perspektivy plánování – jak napříč rolemi a směnami zajistit, aby provoz měl dostatek lidí ve správný čas. Na rozdíl od stránek zaměřených na jednotlivé role propojuje operátory, montážní i pomocné pozice do jednoho kapacitního pohledu. Cílem je pomoci výrobním firmám rozhodnout, co držet ve stálém stavu a co pokrývat flexibilně. Neuvádíme konkrétní mzdy ani normy; nabízíme plánovací rámec, který se opírá o vlastní výrobní plán a o aktuální data z oficiálních zdrojů.',
  sections: [
    {
      heading: 'Pohled na výrobu jako celek',
      body: [
        'Výrobní provoz tvoří mix rolí – operátoři strojů, montážní a pomocné a manipulační pozice – které je třeba sladit do směnového pokrytí. Plánování proto nevychází z jedné pozice, ale z celkové potřeby výroby v čase.',
        'Provázanost rolí znamená, že výpadek v jednom místě může omezit celý tok výroby.',
      ],
    },
    {
      heading: 'Stálé jádro a flexibilní kapacita',
      body: [
        'Osvědčuje se rozlišit stálé jádro, které drží know-how a kontinuitu, od flexibilní kapacity na pokrytí špiček. Stálé jádro se obsazuje přímým náborem a stabilizuje retencí; špičky a výpadky pokrývá agenturní zaměstnávání.',
      ],
      bullets: [
        'Stálé jádro: přímý nábor a retence',
        'Špičky a výpadky: agenturní kapacita',
        'Zastupitelnost napříč pozicemi',
        'Nábor ze zahraničí u nedostatkových profesí',
      ],
    },
    {
      heading: 'Nástup a zastupitelnost',
      body: [
        'Z plánovacího pohledu pomáhá, když je onboarding nastavený opakovatelně a část lidí je zaučená na více pozic. Zastupitelnost snižuje zranitelnost provozu vůči výpadkům a usnadňuje sestavování směn.',
      ],
    },
    {
      heading: 'Plánování v čase a lhůty',
      body: [
        'Plán by měl zohlednit sezónnost, očekávanou fluktuaci a čas potřebný na nábor a zaučení. U náboru ze zahraničí je nutné připočíst lhůty na pobytová a pracovní oprávnění, které harmonogram prodlužují.',
        'Aktuální data o trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Co držet ve stálém stavu a co řešit flexibilně?', a: 'Stálé jádro by mělo držet know-how a kontinuitu (přímý nábor, retence), zatímco špičky a výpadky lze pokrývat agenturní kapacitou. Poměr závisí na výkyvech objednávek.' },
    { q: 'Proč je důležitá zastupitelnost?', a: 'Zaučení části lidí na více pozic snižuje zranitelnost provozu vůči výpadkům a usnadňuje sestavování směn.' },
    { q: 'Jak zahrnout nábor ze zahraničí do plánu?', a: 'Připočtěte čas na pobytová a pracovní oprávnění, který harmonogram prodlužuje. Konkrétní lhůty ověřte u příslušných úřadů.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu: přehled' },
    { href: '/pracovnici-do-vyroby', label: 'Pracovníci do výroby' },
    planovaniLink,
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER B — SKLADY (warehousing)
// ──────────────────────────────────────────────────────────────────────────

export const SKLADNICI: SeoPage = {
  slug: 'skladnici',
  breadcrumbLabel: 'Skladníci',
  eyebrow: 'Nábor · Sklady',
  title: 'Skladníci: nábor a personální zajištění skladu',
  heroSubtitle:
    'Jak personálně zajistit skladový provoz – jaké role obsazovat, jak nabírat a jak zvládat nárazové objemy. Praktický přehled pro sklady a fulfillment.',
  description:
    'Skladníci – jak personálně zajistit sklad: role, náborové cesty, zaškolení a plánování kapacity na nárazové objemy. Praktický přehled pro zaměstnavatele bez vymyšlených čísel.',
  keywords: ['skladníci', 'nábor skladníků', 'personální zajištění skladu', 'skladový provoz', 'naskladňování vychystávání', 'fulfillment'],
  intro:
    'Skladníci zajišťují příjem, uskladnění, vychystávání a expedici zboží a jsou základem každého skladového provozu. Charakteristická je pro ně nárazovost objemů a směnný provoz, což z personálního zajištění dělá klíčové téma. Tato stránka nabízí přehled, jak sklad personálně zajistit – od náborových cest po zvládání špiček. Konkrétní mzdy ani počty volných míst neuvádíme; jde o praktický rámec pro rozhodování, který si firma naplní vlastními a ověřenými daty. Důraz je na pružnosti i na udržení stálých skladníků.',
  sections: [
    {
      heading: 'Specifika skladového provozu',
      body: [
        'Skladová práce zahrnuje příjem, naskladňování, vychystávání, balení a expedici a bývá fyzická a vázaná na objem objednávek. Provoz často běží na směny a objem práce kolísá nárazově, zejména v období špiček.',
        'Část pozic vyžaduje oprávnění, například na manipulační techniku, což ovlivňuje nábor i zaškolení.',
      ],
    },
    {
      heading: 'Jak skladníky nabírat',
      body: [
        'Pro sklad se osvědčuje kombinace stálého jádra a flexibilní kapacity. Stálé skladníky je vhodné obsazovat přímým náborem a stabilizovat retencí; nárazové objemy pokrývá agenturní zaměstnávání. U nedostatku rozšiřuje okruh nábor ze zahraničí.',
      ],
      bullets: [
        'Stálé jádro přímým náborem a retencí',
        'Nárazové objemy agenturní kapacitou',
        'Pozice s manipulační technikou podle oprávnění',
        'Nábor ze zahraničí u dlouhodobého nedostatku',
      ],
    },
    {
      heading: 'Zaškolení a bezpečnost',
      body: [
        'Nástup skladníka zahrnuje vstupní školení BOZP, seznámení s procesy skladu a u manipulační techniky příslušné oprávnění a zaučení. Rychlé a přehledné zaškolení je důležité zejména před sezónními špičkami, kdy nastupuje více lidí najednou.',
      ],
    },
    {
      heading: 'Plánování kapacity skladu',
      body: [
        'Skladovou kapacitu je vhodné plánovat podle objemu objednávek a sezónnosti, s předstihem před špičkami. Rozdělení na stálé a nárazové pozice umožní reagovat na objem bez zbytečných nákladů mimo špičku.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak zvládnout sezónní špičky ve skladu?', a: 'Kombinací stálého jádra a flexibilní agenturní kapacity, kterou lze navýšit na špičku a snížit mimo ni, s náborem naplánovaným s předstihem.' },
    { q: 'Potřebují skladníci oprávnění?', a: 'Část pozic ano, například na manipulační techniku. Tyto role vyžadují příslušné oprávnění a zaučení; vstupní školení BOZP je standardní součástí nástupu.' },
    { q: 'Uvádíte mzdy skladníků?', a: 'Ne. Konkrétní mzdy nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/skladovi-pracovnici', label: 'Skladoví pracovníci' },
    { href: '/picker-packer', label: 'Picker / packer' },
    { href: '/manipulacni-pracovnici', label: 'Manipulační pracovníci' },
    { href: '/nedostatek-pracovniku-ve-skladech', label: 'Nedostatek pracovníků ve skladech' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const SKLADOVI_PRACOVNICI: SeoPage = {
  slug: 'skladovi-pracovnici',
  breadcrumbLabel: 'Skladoví pracovníci',
  eyebrow: 'Nábor · Sklady',
  title: 'Skladoví pracovníci: role a personální mix',
  heroSubtitle:
    'Jaké role tvoří skladový tým a jak sestavit personální mix – od příjmu po expedici. Pohled na složení skladového týmu pro zaměstnavatele.',
  description:
    'Skladoví pracovníci – jaké role tvoří skladový tým (příjem, naskladnění, vychystávání, balení, expedice) a jak sestavit personální mix. Praktický pohled bez vymyšlených čísel.',
  keywords: ['skladoví pracovníci', 'skladový tým', 'role ve skladu', 'příjem expedice', 'personální mix sklad', 'skladové pozice'],
  intro:
    'Skladový provoz netvoří jediná role, ale tým různých pozic, které na sebe navazují od příjmu zboží po expedici. Pro zaměstnavatele je užitečné vidět toto složení jako celek a podle něj sestavit personální mix. Tato stránka popisuje typické skladové role a to, jak je vhodné je obsazovat a kombinovat. Doplňuje obecnou stránku o skladnících o pohled na strukturu týmu. Konkrétní mzdy ani počty neuvádíme; nabízíme praktický rámec, který si firma přizpůsobí podle typu skladu a objemu provozu.',
  sections: [
    {
      heading: 'Z jakých rolí se skladový tým skládá',
      body: [
        'Typický skladový tým zahrnuje pracovníky příjmu, naskladnění, vychystávání (picking), balení (packing) a expedice, doplněné o manipulační a kontrolní role. Poměr rolí závisí na typu skladu – jiný bude u distribučního centra a jiný u e-commerce fulfillmentu.',
      ],
    },
    {
      heading: 'Jak sestavit personální mix',
      body: [
        'Personální mix vychází z toho, kde ve skladu vzniká největší objem práce a kde špičky. Stálé jádro pokrývá klíčové a kvalifikovanější role, flexibilní kapacita objemové a nárazové pozice. Mix je vhodné průběžně ladit podle vývoje provozu.',
      ],
      bullets: [
        'Klíčové role ve stálém jádru',
        'Objemové a nárazové pozice flexibilně',
        'Zastupitelnost mezi navazujícími rolemi',
        'Mix ladit podle typu skladu',
      ],
    },
    {
      heading: 'Zaškolení napříč rolemi',
      body: [
        'Protože role na sebe navazují, vyplatí se zaučit část lidí na více pozic. Zastupitelnost usnadňuje pokrytí výpadků a špiček. Vedle vstupního školení BOZP je důležité seznámení s procesy a systémem skladu.',
      ],
    },
    {
      heading: 'Plánování složení týmu',
      body: [
        'Plánování personálního mixu navazuje na objem objednávek a sezónnost. Vhodné je předem vědět, které role posílit před špičkou a které lze pokrýt flexibilně, aby provoz nezadrhl.',
        'Aktuální data trhu práce poskytují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké role tvoří skladový tým?', a: 'Typicky příjem, naskladnění, vychystávání, balení a expedice, doplněné o manipulační a kontrolní role. Poměr závisí na typu skladu.' },
    { q: 'Jak sestavit personální mix?', a: 'Podle toho, kde vzniká největší objem a špičky – klíčové role ve stálém jádru, objemové a nárazové pozice flexibilně. Mix se průběžně ladí.' },
    { q: 'Proč zaučovat na více pozic?', a: 'Zastupitelnost mezi navazujícími rolemi usnadňuje pokrytí výpadků a špiček a snižuje zranitelnost provozu.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/skladnici', label: 'Skladníci: přehled' },
    { href: '/picker-packer', label: 'Picker / packer' },
    { href: '/pracovnici-do-skladu', label: 'Pracovníci do skladu' },
    { href: '/nedostatek-pracovniku-ve-skladech', label: 'Nedostatek pracovníků ve skladech' },
    naborLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PICKER_PACKER: SeoPage = {
  slug: 'picker-packer',
  breadcrumbLabel: 'Picker / packer',
  eyebrow: 'Nábor · Sklady',
  title: 'Picker / packer: nábor pracovníků pro vychystávání a balení',
  heroSubtitle:
    'Jak obsazovat pozice vychystávání (picking) a balení (packing) ve fulfillmentu – tempo, přesnost a nárazové objemy. Praktický pohled pro sklady a e-shopy.',
  description:
    'Picker / packer – jak obsazovat pozice vychystávání a balení ve fulfillmentu: tempo a přesnost, nárazové objemy a zaškolení. Praktický pohled pro sklady bez vymyšlených čísel.',
  keywords: ['picker packer', 'vychystávání', 'balení objednávek', 'fulfillment pracovníci', 'picking packing', 'nábor sklad'],
  intro:
    'Pozice picker a packer patří k jádru zpracování objednávek ve skladech a fulfillment centrech – picker zboží vychystává, packer ho balí k expedici. Práce je vázaná na tempo, přesnost a objem objednávek, který nárazově kolísá. Tato stránka se věnuje tomu, jak tyto pozice obsazovat, zaškolovat a plánovat, s ohledem na jejich specifika. Konkrétní mzdy ani normy výkonu neuvádíme; nabízíme praktický pohled pro zaměstnavatele, zejména v e-commerce a distribuci, který si firma doplní podle svého provozu.',
  sections: [
    {
      heading: 'Co picker a packer dělají',
      body: [
        'Picker vyhledává a vychystává položky podle objednávek, packer je kontroluje a balí k expedici. U obou rolí záleží na přesnosti a tempu, protože chyby a zpoždění se promítají do doručení zákazníkovi.',
        'Objem těchto pozic silně roste v období špiček, typicky ve fulfillmentu pro e-commerce.',
      ],
    },
    {
      heading: 'Náborové úvahy pro picking a packing',
      body: [
        'Vstupní bariéra bývá nižší, takže pozice lze obsadit širším okruhem kandidátů a rychle zaučit. Pro nárazové objemy se hodí agenturní zaměstnávání a flexibilní formy; stálé jádro stabilizuje retence.',
      ],
      bullets: [
        'Širší okruh kandidátů, rychlé zaučení',
        'Nárazové objemy agenturní kapacitou',
        'V inzerci uvést tempo a směnný režim',
        'Stálé jádro stabilizovat retencí',
      ],
    },
    {
      heading: 'Zaškolení na proces a systém',
      body: [
        'Zaškolení se soustředí na proces vychystávání či balení, práci se skladovým systémem a kvalitu, vedle vstupního školení BOZP. Přehledné zaučení je důležité před špičkami, kdy nastupuje více lidí najednou a tempo roste.',
      ],
    },
    {
      heading: 'Plánování objemů a špiček',
      body: [
        'Kapacitu pro picking a packing je vhodné plánovat podle objednávkových špiček a s předstihem zajistit flexibilní posily. Stálé jádro doplněné agenturní kapacitou umožní zvládnout objem bez zbytečných nákladů mimo sezónu.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jaký je rozdíl mezi pickerem a packerem?', a: 'Picker zboží vychystává podle objednávek, packer ho kontroluje a balí k expedici. U obou záleží na přesnosti a tempu.' },
    { q: 'Jak pokrýt objednávkové špičky?', a: 'Flexibilní a agenturní kapacitou navýšenou na špičku, doplněnou stálým jádrem a rychlým zaškolením. Okamžitou dostupnost neslibujeme.' },
    { q: 'Potřebují tyto pozice kvalifikaci?', a: 'Vstupní bariéra bývá nižší a zaučení rychlé. Důležité jsou přesnost, tempo a spolehlivost.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/skladnici', label: 'Skladníci: přehled' },
    { href: '/pracovnici-pro-ecommerce-sklady', label: 'Pracovníci pro e-commerce sklady' },
    { href: '/pracovnici-do-skladu', label: 'Pracovníci do skladu' },
    { href: '/nedostatek-pracovniku-ve-skladech', label: 'Nedostatek pracovníků ve skladech' },
    docasneLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRACOVNICI_DO_SKLADU: SeoPage = {
  slug: 'pracovnici-do-skladu',
  breadcrumbLabel: 'Pracovníci do skladu',
  eyebrow: 'Nábor · Sklady',
  title: 'Pracovníci do skladu: rychlé obsazení nástupních pozic',
  heroSubtitle:
    'Jak rychle a férově obsadit nástupní skladové pozice – nízká vstupní bariéra, pružné formy a kvalitní zaučení. Praktický pohled pro sklady a fulfillment.',
  description:
    'Pracovníci do skladu – jak rychle obsadit nástupní skladové pozice: nízká vstupní bariéra, agenturní kapacita a kvalitní zaučení. Praktický pohled pro zaměstnavatele bez čísel.',
  keywords: ['pracovníci do skladu', 'nástupní pozice sklad', 'rychlý nábor sklad', 'brigádníci sklad', 'agenturní pracovníci sklad', 'sezónní špičky'],
  intro:
    '„Pracovníci do skladu“ obvykle označují nástupní pozice s nízkou vstupní bariérou, které je potřeba obsadit rychle, často ve větším počtu a před sezónními špičkami. Pro zaměstnavatele jsou klíčové při zvládání objemu objednávek. Tato stránka se věnuje tomu, jak tyto pozice obsazovat efektivně a férově – od pružných náborových cest po rychlé, ale kvalitní zaškolení. Neuvádí konkrétní mzdy ani počty; nabízí praktický rámec, který klade důraz na to, aby rychlost obsazení nešla na úkor kvality nástupu a stability.',
  sections: [
    {
      heading: 'Charakter nástupních skladových pozic',
      body: [
        'Nástupní skladové pozice obvykle nevyžadují předchozí praxi a stojí na fyzické práci, spolehlivosti a ochotě pracovat ve směnách. Lze je proto obsadit širším okruhem kandidátů a relativně rychle zaučit.',
        'Často slouží jako vstup do provozu, ze kterého lze postupovat na specializovanější role.',
      ],
    },
    {
      heading: 'Pružné cesty obsazení',
      body: [
        'Pro rychlé a objemové obsazení se hodí kombinace inzerce, doporučení a agenturního zaměstnávání. Agentura pomáhá pokrýt nárazové objemy a sezónní špičky; u dlouhodobého nedostatku rozšiřuje okruh nábor ze zahraničí.',
      ],
      bullets: [
        'Inzerce s jasným popisem práce a směn',
        'Agenturní kapacita na špičky a výpadky',
        'Doporučení od stávajících zaměstnanců',
        'Nábor ze zahraničí u dlouhodobého nedostatku',
      ],
    },
    {
      heading: 'Rychlé a kvalitní zaučení',
      body: [
        'I u nástupních pozic platí, že připravené zaškolení (vstupní BOZP, seznámení s procesy a systémem skladu, jasná očekávání) snižuje brzké odchody. Před špičkou, kdy nastupuje více lidí najednou, je dobrá organizace zaučení obzvlášť důležitá.',
      ],
    },
    {
      heading: 'Plánování objemu a špiček',
      body: [
        'U nástupních pozic je vhodné plánovat zejména sezónní špičky s předstihem a počítat s určitou fluktuací. Stálé jádro doplněné flexibilní kapacitou umožní reagovat na objem bez zbytečných nákladů mimo špičku.',
        'Aktuální data trhu práce poskytují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Potřebují pracovníci do skladu praxi?', a: 'Nástupní skladové pozice obvykle praxi nevyžadují a stojí na spolehlivosti a ochotě pracovat ve směnách. Specializované role vyžadují více.' },
    { q: 'Jak obsadit více lidí před špičkou?', a: 'Pro objemové a sezónní potřeby se hodí agenturní zaměstnávání doplněné inzercí a doporučeními, naplánované s předstihem.' },
    { q: 'Nezvýší rychlý nábor odchody?', a: 'Může, pokud rychlost jde na úkor kvality nástupu. Připravené zaučení a jasná očekávání riziko brzkých odchodů snižují.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/skladnici', label: 'Skladníci: přehled' },
    { href: '/skladovi-pracovnici', label: 'Skladoví pracovníci' },
    docasneLink,
    { href: '/nedostatek-pracovniku-ve-skladech', label: 'Nedostatek pracovníků ve skladech' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const MANIPULACNI_PRACOVNICI: SeoPage = {
  slug: 'manipulacni-pracovnici',
  breadcrumbLabel: 'Manipulační pracovníci',
  eyebrow: 'Nábor · Sklady',
  title: 'Manipulační pracovníci: nábor obsluhy manipulační techniky',
  heroSubtitle:
    'Jak obsazovat manipulační pozice – práce s manipulační technikou, oprávnění a bezpečnost. Náborové a zaškolovací úvahy pro sklady a výrobu.',
  description:
    'Manipulační pracovníci – jak obsazovat pozice obsluhy manipulační techniky: role oprávnění, bezpečnost a zaškolení. Praktický pohled pro sklady a výrobu bez vymyšlených čísel.',
  keywords: ['manipulační pracovníci', 'manipulační technika', 'vysokozdvižný vozík', 'obsluha VZV', 'oprávnění manipulace', 'nábor sklad výroba'],
  intro:
    'Manipulační pracovníci zajišťují přesun materiálu a zboží pomocí manipulační techniky a propojují jednotlivé části skladového i výrobního provozu. Oproti pomocným pozicím je u nich navíc potřeba příslušné oprávnění k obsluze techniky a důraz na bezpečnost. Tato stránka se věnuje tomu, jak manipulační pozice obsazovat, zaškolovat a plánovat. Konkrétní mzdy ani počty neuvádíme; nabízíme praktický pohled pro zaměstnavatele, který zohledňuje specifika práce s technikou a nároky na bezpečnost a zaučení.',
  sections: [
    {
      heading: 'Co manipulační práce obnáší',
      body: [
        'Manipulační pracovníci přesouvají materiál a zboží, nakládají a vykládají a zásobují pracoviště. Část pozic vyžaduje obsluhu manipulační techniky, k níž je potřeba příslušné oprávnění a praxe; jiné jsou ruční.',
        'Tyto pozice jsou často kritické pro plynulost provozu, protože navazují na výrobu i expedici.',
      ],
    },
    {
      heading: 'Nábor s ohledem na oprávnění',
      body: [
        'U pozic s manipulační technikou je vhodné v inzerci jasně uvést požadované oprávnění a typ techniky. Okruh kandidátů s oprávněním je užší, proto se vyplatí cílit nábor a u stálých rolí pracovat na udržení. Ruční manipulační pozice mají nižší bariéru.',
      ],
      bullets: [
        'V inzerci uvést požadované oprávnění a typ techniky',
        'Cílený nábor u kvalifikovaných pozic',
        'Ruční pozice obsadit širším okruhem',
        'Stálé role stabilizovat retencí',
      ],
    },
    {
      heading: 'Bezpečnost a zaškolení',
      body: [
        'U manipulační techniky je bezpečnost na prvním místě. Nástup zahrnuje vstupní školení BOZP, ověření a doplnění oprávnění podle potřeby a zaučení na konkrétní provoz a techniku. Dobré zaškolení snižuje riziko úrazů i poškození zboží.',
      ],
    },
    {
      heading: 'Plánování manipulační kapacity',
      body: [
        'Kapacitu manipulačních pozic je vhodné plánovat tak, aby pokrývala směny i špičky, protože jejich výpadek brzdí navazující procesy. Pomáhá zastupitelnost a kombinace stálého jádra s flexibilní kapacitou.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Potřebují manipulační pracovníci oprávnění?', a: 'Pozice s manipulační technikou ano – je potřeba příslušné oprávnění a praxe. Ruční manipulační pozice mají nižší vstupní bariéru. Vstupní školení BOZP je standardní.' },
    { q: 'Proč je okruh kandidátů užší?', a: 'U pozic vyžadujících oprávnění k obsluze techniky je dostupných kandidátů méně. Pomáhá cílený nábor a u stálých rolí práce na udržení.' },
    { q: 'Uvádíte mzdy nebo počty?', a: 'Ne. Konkrétní mzdy ani statistiky nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/skladnici', label: 'Skladníci: přehled' },
    { href: '/skladovi-pracovnici', label: 'Skladoví pracovníci' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    { href: '/nedostatek-pracovniku-ve-skladech', label: 'Nedostatek pracovníků ve skladech' },
    jakNajitLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER C — LOGISTIKA
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_DO_LOGISTIKY: SeoPage = {
  slug: 'pracovnici-do-logistiky',
  breadcrumbLabel: 'Pracovníci do logistiky',
  eyebrow: 'Nábor · Logistika',
  title: 'Pracovníci do logistiky: nábor a personální zajištění',
  heroSubtitle:
    'Jak personálně zajistit logistický provoz – jaké role obsazovat, jak nabírat a jak zvládat sezónní výkyvy. Praktický přehled pro logistiku a fulfillment.',
  description:
    'Pracovníci do logistiky – jak personálně zajistit logistický provoz: role napříč řetězcem, náborové cesty a zvládání sezónních výkyvů. Praktický přehled bez vymyšlených čísel.',
  keywords: ['pracovníci do logistiky', 'nábor logistika', 'logistický provoz', 'fulfillment', 'sezónní výkyvy', 'personální zajištění logistiky'],
  intro:
    'Logistika propojuje příjem, skladování, kompletaci a distribuci zboží a její personální zajištění je citlivé na sezónní výkyvy poptávky. Pro zaměstnavatele to znamená nutnost pružně reagovat na měnící se objem práce. Tato stránka nabízí přehled, jak logistický provoz personálně zajistit – od náborových cest po zvládání špiček. Konkrétní mzdy ani počty volných míst neuvádíme; jde o praktický rámec pro rozhodování, který si firma naplní vlastními a ověřenými daty. Důraz je na flexibilitě a na udržení stálého jádra.',
  sections: [
    {
      heading: 'Specifika logistického provozu',
      body: [
        'Logistika zahrnuje řadu navazujících rolí – od skladových a manipulačních pozic po podporu distribuce a expedice – a často běží na směny. Objem práce výrazně kolísá podle sezóny a poptávky, což ztěžuje plánování stálého stavu.',
        'Provázanost článků znamená, že výpadek v jednom místě zpomalí celý tok zboží.',
      ],
    },
    {
      heading: 'Jak logistiku nabírat',
      body: [
        'Kolísavou potřebu dobře pokrývá kombinace stálého jádra a flexibilní agenturní kapacity, kterou lze navýšit na špičku a snížit mimo ni. U nedostatkových profesí rozšiřuje okruh nábor ze zahraničí; stálé jádro je vhodné stabilizovat retencí.',
      ],
      bullets: [
        'Stálé jádro přímým náborem a retencí',
        'Sezónní výkyvy agenturní kapacitou',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Plánování náboru s předstihem před špičkou',
      ],
    },
    {
      heading: 'Zaškolení a procesy',
      body: [
        'Nástup do logistiky zahrnuje vstupní školení BOZP, seznámení s procesy a systémy a u techniky příslušná oprávnění. Přehledné zaučení je důležité zejména před sezónními špičkami, kdy nastupuje více lidí najednou.',
      ],
    },
    {
      heading: 'Plánování kapacity v čase',
      body: [
        'Plánování vychází z očekávaného objemu a sezónnosti. Rozdělení potřeby na stálou a nárazovou a její včasné zajištění umožní zvládnout špičky bez výpadků i bez zbytečných nákladů mimo sezónu.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak zvládnout sezónní výkyvy v logistice?', a: 'Kombinací stálého jádra a flexibilní agenturní kapacity navýšené na špičku, s náborem naplánovaným s předstihem. Okamžitou dostupnost neslibujeme.' },
    { q: 'Jaké role logistika obsazuje?', a: 'Skladové a manipulační pozice, kompletaci, podporu distribuce a expedice a další navazující role. Poměr závisí na typu provozu.' },
    { q: 'Uvádíte statistiky nebo mzdy?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/logisticti-pracovnici', label: 'Logističtí pracovníci' },
    { href: '/pracovnici-pro-distribucni-centra', label: 'Pracovníci pro distribuční centra' },
    { href: '/pracovnici-pro-ecommerce-sklady', label: 'Pracovníci pro e-commerce sklady' },
    { href: '/nedostatek-pracovniku-v-logistice', label: 'Nedostatek pracovníků v logistice' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const LOGISTICTI_PRACOVNICI: SeoPage = {
  slug: 'logisticti-pracovnici',
  breadcrumbLabel: 'Logističtí pracovníci',
  eyebrow: 'Nábor · Logistika',
  title: 'Logističtí pracovníci: role napříč logistickým řetězcem',
  heroSubtitle:
    'Jaké role tvoří logistický řetězec a jak je obsazovat – od příjmu a skladu po kompletaci a expedici. Pohled na složení logistického týmu pro zaměstnavatele.',
  description:
    'Logističtí pracovníci – jaké role tvoří logistický řetězec (příjem, sklad, kompletace, expedice, podpora distribuce) a jak je obsazovat. Praktický pohled bez vymyšlených čísel.',
  keywords: ['logističtí pracovníci', 'logistický řetězec', 'role v logistice', 'kompletace expedice', 'logistický tým', 'personální mix logistika'],
  intro:
    'Logistický řetězec netvoří jediná pozice, ale soustava navazujících rolí, které dohromady zajišťují tok zboží od příjmu po expedici. Pro zaměstnavatele je užitečné vidět toto složení jako celek a podle něj sestavit personální mix. Tato stránka popisuje typické logistické role a to, jak je vhodné obsazovat a kombinovat. Doplňuje obecnou stránku o pracovnících do logistiky o pohled na strukturu týmu. Konkrétní mzdy ani počty neuvádíme; nabízíme praktický rámec, který si firma přizpůsobí podle typu provozu.',
  sections: [
    {
      heading: 'Z jakých rolí se logistický tým skládá',
      body: [
        'Logistický tým obvykle zahrnuje pracovníky příjmu a skladu, manipulace, kompletace a balení, expedice a podpory distribuce, doplněné o kontrolní a koordinační role. Konkrétní složení se liší podle typu provozu – jiné u distribučního centra a jiné u e-commerce fulfillmentu.',
      ],
    },
    {
      heading: 'Jak sestavit personální mix',
      body: [
        'Mix vychází z toho, kde v řetězci vzniká největší objem a špičky. Klíčové a kvalifikovanější role drží stálé jádro, objemové a nárazové pozice pokrývá flexibilní kapacita. Mix je vhodné průběžně ladit podle vývoje provozu.',
      ],
      bullets: [
        'Klíčové role ve stálém jádru',
        'Objemové a nárazové pozice flexibilně',
        'Zastupitelnost mezi navazujícími články',
        'Mix ladit podle typu provozu',
      ],
    },
    {
      heading: 'Zaškolení napříč rolemi',
      body: [
        'Protože role na sebe navazují, vyplatí se zaučit část lidí na více pozic. Vedle vstupního školení BOZP je důležité seznámení s procesy a systémy a u manipulační techniky příslušná oprávnění.',
      ],
    },
    {
      heading: 'Plánování složení týmu',
      body: [
        'Plánování personálního mixu navazuje na objem a sezónnost. Vhodné je předem vědět, které články řetězce posílit před špičkou a které lze pokrýt flexibilně, aby tok zboží nezadrhl.',
        'Aktuální data trhu práce poskytují ČSÚ, MPSV a Úřad práce ČR; konkrétní čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké role patří do logistického týmu?', a: 'Typicky příjem a sklad, manipulace, kompletace a balení, expedice a podpora distribuce, doplněné o kontrolní a koordinační role. Složení závisí na typu provozu.' },
    { q: 'Jak sestavit personální mix v logistice?', a: 'Klíčové role do stálého jádra, objemové a nárazové pozice flexibilně. Mix se ladí podle toho, kde vzniká největší objem a špičky.' },
    { q: 'Uvádíte čísla o trhu práce?', a: 'Ne. Aktuální data patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme; nevymýšlíme je.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky: přehled' },
    { href: '/pracovnici-pro-distribucni-centra', label: 'Pracovníci pro distribuční centra' },
    { href: '/manipulacni-pracovnici', label: 'Manipulační pracovníci' },
    { href: '/nedostatek-pracovniku-v-logistice', label: 'Nedostatek pracovníků v logistice' },
    naborLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRACOVNICI_PRO_DISTRIBUCNI_CENTRA: SeoPage = {
  slug: 'pracovnici-pro-distribucni-centra',
  breadcrumbLabel: 'Pracovníci pro distribuční centra',
  eyebrow: 'Nábor · Logistika',
  title: 'Pracovníci pro distribuční centra',
  heroSubtitle:
    'Jak personálně zajistit distribuční centrum – objem, směnný provoz a návaznost na dopravu. Náborové a plánovací úvahy pro velké logistické provozy.',
  description:
    'Pracovníci pro distribuční centra – jak personálně zajistit velký logistický provoz: objem a směny, návaznost na dopravu a plánování kapacity. Praktický pohled bez vymyšlených čísel.',
  keywords: ['pracovníci pro distribuční centra', 'distribuční centrum', 'DC logistika', 'směnný provoz logistika', 'objemový provoz', 'nábor logistika'],
  intro:
    'Distribuční centra zpracovávají velké objemy zboží a propojují sklad s dopravou a navazující distribucí. Personální zajištění zde stojí na schopnosti pokrýt objem ve směnách a navázat na harmonogram dopravy. Tato stránka se věnuje tomu, jak distribuční centrum personálně zajistit – od náborových cest po plánování kapacity. Konkrétní mzdy ani počty neuvádíme; nabízíme praktický pohled pro zaměstnavatele velkých logistických provozů, který zohledňuje objem, směnnost a návaznost na dopravu.',
  sections: [
    {
      heading: 'Specifika distribučního centra',
      body: [
        'Distribuční centrum se vyznačuje velkým objemem zpracovávaného zboží, směnným provozem a těsnou návazností na dopravu a expediční okna. Výpadek lidí se promítá do zpoždění celé navazující distribuce.',
        'Objem a špičky vyžadují pružné personální zajištění a dobrou koordinaci směn.',
      ],
    },
    {
      heading: 'Náborové úvahy pro velký provoz',
      body: [
        'U objemových provozů se osvědčuje kombinace stálého jádra a větší flexibilní složky. Agenturní zaměstnávání pomáhá pokrýt objem a špičky; u nedostatku rozšiřuje okruh nábor ze zahraničí. Důležité je nabírat s předstihem před nárůsty objemu.',
      ],
      bullets: [
        'Stálé jádro pro kontinuitu a know-how',
        'Větší flexibilní složka na objem a špičky',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Předstih před nárůsty objemu',
      ],
    },
    {
      heading: 'Zaškolení pro objemový provoz',
      body: [
        'Zaškolení se soustředí na procesy a systémy centra, bezpečnost a tempo, vedle vstupního školení BOZP. Při náboru více lidí najednou je klíčová opakovatelná organizace onboardingu, aby noví lidé rychle zapadli do směn.',
      ],
    },
    {
      heading: 'Plánování kapacity a směn',
      body: [
        'Plánování kapacity musí sladit objem, směny a návaznost na dopravu. Pomáhá zastupitelnost, rezerva na výpadky a včasné zajištění flexibilní kapacity před objemovými nárůsty.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Co je u distribučního centra při náboru specifické?', a: 'Velký objem, směnný provoz a návaznost na dopravu. Vyžaduje pružné zajištění, koordinaci směn a nábor s předstihem před nárůsty objemu.' },
    { q: 'Jak zvládnout objemové špičky?', a: 'Kombinací stálého jádra a větší flexibilní agenturní kapacity, zajištěné s předstihem, doplněné opakovatelným onboardingem.' },
    { q: 'Uvádíte počty volných míst?', a: 'Ne. Konkrétní počty ani mzdy nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky: přehled' },
    { href: '/pracovnici-pro-ecommerce-sklady', label: 'Pracovníci pro e-commerce sklady' },
    { href: '/logisticti-pracovnici', label: 'Logističtí pracovníci' },
    { href: '/nedostatek-pracovniku-v-logistice', label: 'Nedostatek pracovníků v logistice' },
    planovaniLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRACOVNICI_PRO_ECOMMERCE_SKLADY: SeoPage = {
  slug: 'pracovnici-pro-ecommerce-sklady',
  breadcrumbLabel: 'Pracovníci pro e-commerce sklady',
  eyebrow: 'Nábor · Logistika',
  title: 'Pracovníci pro e-commerce sklady',
  heroSubtitle:
    'Jak personálně zajistit e-commerce fulfillment – výrazné špičky, zpracování vratek a tlak na rychlost. Náborové a plánovací úvahy pro e-shopy a fulfillment.',
  description:
    'Pracovníci pro e-commerce sklady – jak zajistit fulfillment: výrazné sezónní špičky, zpracování vratek a tlak na rychlost. Praktický pohled pro e-shopy bez vymyšlených čísel.',
  keywords: ['pracovníci pro e-commerce sklady', 'e-commerce fulfillment', 'fulfillment e-shop', 'vratky reverzní logistika', 'sezónní špičky e-commerce', 'picking packing'],
  intro:
    'E-commerce sklady (fulfillment pro e-shopy) se vyznačují výraznými sezónními špičkami, vysokým podílem vychystávání a balení a zpracováním vratek. Personální zajištění zde stojí na schopnosti rychle škálovat kapacitu nahoru a dolů. Tato stránka se věnuje tomu, jak fulfillment personálně zajistit – od pružných náborových cest po plánování špiček a vratek. Konkrétní mzdy ani počty neuvádíme; nabízíme praktický pohled pro provozovatele e-shopů a fulfillmentu, který zohledňuje jejich specifika a tlak na rychlost doručení.',
  sections: [
    {
      heading: 'Specifika e-commerce fulfillmentu',
      body: [
        'Fulfillment pro e-commerce je charakteristický velkým podílem pickingu a packingu, výraznými špičkami (například v období zvýšených nákupů) a zpracováním vratek, tedy reverzní logistikou. Tlak na rychlost doručení se promítá do tempa práce.',
        'Objem práce kolísá silněji než u běžných skladů, což klade nároky na pružné škálování kapacity.',
      ],
    },
    {
      heading: 'Jak zajistit pružné škálování',
      body: [
        'Pro e-commerce se osvědčuje menší stálé jádro doplněné výraznou flexibilní složkou, kterou lze rychle navýšit na špičku a snížit mimo ni. Agenturní zaměstnávání a flexibilní formy jsou zde obzvlášť užitečné; u nedostatku pomáhá nábor ze zahraničí.',
      ],
      bullets: [
        'Menší stálé jádro, větší flexibilní složka',
        'Rychlé navýšení kapacity na špičky',
        'Zohlednit i kapacitu na zpracování vratek',
        'Nábor a zaučení připravit s předstihem',
      ],
    },
    {
      heading: 'Zaškolení na tempo a přesnost',
      body: [
        'Zaškolení se soustředí na proces pickingu a packingu, práci se systémem a přesnost při tempu, vedle vstupního školení BOZP. Před špičkou, kdy nastupuje mnoho lidí najednou, je opakovatelný a rychlý onboarding klíčový.',
      ],
    },
    {
      heading: 'Plánování špiček a vratek',
      body: [
        'Plánování musí počítat nejen s objednávkovými špičkami, ale i s následnou vlnou vratek. Včasné zajištění flexibilní kapacity před špičkou a rezerva na reverzní logistiku pomáhají udržet rychlost doručení.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Čím se e-commerce sklad liší od běžného?', a: 'Výraznějšími špičkami, vysokým podílem pickingu a packingu, zpracováním vratek a tlakem na rychlost doručení. Vyžaduje pružnější škálování kapacity.' },
    { q: 'Jak zvládnout sezónní špičky e-shopu?', a: 'Menším stálým jádrem doplněným výraznou flexibilní agenturní kapacitou, zajištěnou s předstihem, a s rezervou na následné vratky.' },
    { q: 'Uvádíte čísla objemů nebo mzdy?', a: 'Ne. Konkrétní čísla ani mzdy nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/picker-packer', label: 'Picker / packer' },
    { href: '/pracovnici-pro-distribucni-centra', label: 'Pracovníci pro distribuční centra' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    { href: '/nedostatek-pracovniku-v-logistice', label: 'Nedostatek pracovníků v logistice' },
    docasneLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER D — STAVEBNICTVÍ
// ──────────────────────────────────────────────────────────────────────────

export const STAVEBNI_PRACOVNICI: SeoPage = {
  slug: 'stavebni-pracovnici',
  breadcrumbLabel: 'Stavební pracovníci',
  eyebrow: 'Nábor · Stavebnictví',
  title: 'Stavební pracovníci: nábor a personální zajištění staveb',
  heroSubtitle:
    'Jak personálně zajistit stavební zakázky – projektovost, sezónnost a mix profesí. Praktický přehled náboru pro stavební firmy.',
  description:
    'Stavební pracovníci – jak personálně zajistit stavební zakázky: projektovost a sezónnost, mix kvalifikovaných a pomocných profesí a plánování. Praktický přehled bez vymyšlených čísel.',
  keywords: ['stavební pracovníci', 'nábor stavebnictví', 'personální zajištění staveb', 'stavební zakázky', 'sezónní práce', 'řemesla pomocné práce'],
  intro:
    'Stavební pracovníci zajišťují realizaci stavebních zakázek a jejich potřeba se mění podle rozjetých projektů, sezóny a počasí. Personální zajištění ve stavebnictví proto stojí na schopnosti sladit kapacitu s harmonogramem projektů. Tato stránka nabízí přehled, jak stavbu personálně zajistit – od mixu profesí po náborové a plánovací úvahy. Konkrétní mzdy ani počty neuvádíme; jde o praktický rámec pro stavební firmy, který zohledňuje projektovost, sezónnost a potřebu kvalifikovaných i pomocných profesí.',
  sections: [
    {
      heading: 'Specifika stavebnictví',
      body: [
        'Stavební práce jsou často vázané na konkrétní projekty s definovaným začátkem a koncem, podléhají sezónnosti a počasí a kombinují kvalifikované řemeslné profese s pomocnými pozicemi. To z plánování stálého stavu dělá výzvu.',
        'Potřeba lidí se mění podle fáze a počtu souběžných zakázek.',
      ],
    },
    {
      heading: 'Jak stavební pozice obsazovat',
      body: [
        'Projektovou potřebu lze řešit kombinací vlastního jádra, subdodávek a flexibilní kapacity. Kvalifikovaná řemesla je vhodné udržet ve vlastním jádru a stabilizovat; pomocné pozice mají nižší bariéru. U nedostatkových řemesel rozšiřuje okruh nábor ze zahraničí.',
      ],
      bullets: [
        'Vlastní jádro klíčových řemesel',
        'Pomocné pozice širším okruhem',
        'Flexibilní a subdodavatelská kapacita na projekty',
        'Nábor ze zahraničí u nedostatkových řemesel',
      ],
    },
    {
      heading: 'Zaškolení a bezpečnost na stavbě',
      body: [
        'Nástup na stavbě klade vysoký důraz na bezpečnost – vstupní školení BOZP, seznámení se staveništěm a riziky a u některých prací potřebná oprávnění. Dobré zaškolení a jasné rozdělení rolí snižují riziko úrazů.',
      ],
    },
    {
      heading: 'Plánování podle projektů',
      body: [
        'Plánování personální kapacity vychází z harmonogramu zakázek a sezónnosti. Vhodné je předem vědět, které profese držet ve vlastním jádru a co pokrýt flexibilně či subdodávkou, a u náboru ze zahraničí počítat s lhůtami na oprávnění.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak zajistit kapacitu na stavební zakázky?', a: 'Kombinací vlastního jádra klíčových řemesel, flexibilní nebo subdodavatelské kapacity a u nedostatkových řemesel náboru ze zahraničí, naplánovaného s ohledem na lhůty oprávnění.' },
    { q: 'Čím je nábor ve stavebnictví specifický?', a: 'Projektovostí, sezónností a počasím a kombinací kvalifikovaných řemesel s pomocnými pozicemi. Potřeba lidí kolísá podle fáze a počtu zakázek.' },
    { q: 'Uvádíte mzdy řemeslníků?', a: 'Ne. Konkrétní mzdy nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-pro-stavebnictvi', label: 'Pracovníci pro stavebnictví' },
    { href: '/pomocni-stavebni-pracovnici', label: 'Pomocní stavební pracovníci' },
    { href: '/stavebni-profese', label: 'Stavební profese' },
    { href: '/nedostatek-pracovniku-ve-stavebnictvi', label: 'Nedostatek pracovníků ve stavebnictví' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRACOVNICI_PRO_STAVEBNICTVI: SeoPage = {
  slug: 'pracovnici-pro-stavebnictvi',
  breadcrumbLabel: 'Pracovníci pro stavebnictví',
  eyebrow: 'Nábor · Stavebnictví',
  title: 'Pracovníci pro stavebnictví: zajištění projektů',
  heroSubtitle:
    'Jak zajistit lidi na stavební projekty – vlastní kapacita, subdodávky a flexibilní posily podle fáze zakázky. Pohled zaměřený na projektové zajištění.',
  description:
    'Pracovníci pro stavebnictví – jak zajistit lidi na stavební projekty: vlastní kapacita vs. subdodávky vs. flexibilní posily podle fáze zakázky. Praktický pohled bez vymyšlených čísel.',
  keywords: ['pracovníci pro stavebnictví', 'zajištění stavebních projektů', 'subdodávky stavebnictví', 'projektové zajištění', 'kapacita na stavbu', 'nábor stavebnictví'],
  intro:
    'Tato stránka pohlíží na zajištění pracovníků pro stavebnictví z perspektivy projektu – jak v jednotlivých fázích zakázky zajistit dostatek lidí ve správný čas. Na rozdíl od obecné stránky o stavebních pracovnících se soustředí na rozhodnutí mezi vlastní kapacitou, subdodávkami a flexibilními posilami. Cílem je pomoci stavebním firmám sladit personální zajištění s harmonogramem projektů. Konkrétní mzdy ani počty neuvádíme; nabízíme projektový rámec, který se opírá o vlastní plán zakázek a o aktuální data z oficiálních zdrojů.',
  sections: [
    {
      heading: 'Projektový pohled na zajištění lidí',
      body: [
        'Stavební zakázka prochází fázemi s různou potřebou profesí a kapacity. Personální zajištění proto nevychází z jedné role, ale z harmonogramu projektu a z toho, kdy a kolik kterých profesí bude potřeba.',
        'Souběh více zakázek nároky na kapacitu dále zvyšuje a vyžaduje koordinaci.',
      ],
    },
    {
      heading: 'Vlastní kapacita, subdodávky a posily',
      body: [
        'Rozhodnutí stojí mezi tím, co pokrýt vlastními lidmi, co subdodávkou a co flexibilními posilami. Klíčová řemesla a kontinuita patří do vlastní kapacity; specializované nebo nárazové práce lze řešit subdodávkou; objemové pomocné práce flexibilně.',
      ],
      bullets: [
        'Klíčová řemesla a kontinuita vlastní kapacitou',
        'Specializované či nárazové práce subdodávkou',
        'Objemové pomocné práce flexibilně',
        'Nábor ze zahraničí u nedostatkových řemesel',
      ],
    },
    {
      heading: 'Bezpečnost a koordinace na projektu',
      body: [
        'Na stavbě je zásadní bezpečnost a koordinace mezi vlastními lidmi a subdodavateli – vstupní školení BOZP, seznámení s riziky staveniště a jasné rozdělení odpovědností. Dobrá koordinace snižuje rizika i prostoje.',
      ],
    },
    {
      heading: 'Plánování fází a lhůt',
      body: [
        'Plán by měl navázat potřebu profesí na fáze projektu a počítat se sezónností a počasím. U náboru ze zahraničí je nutné připočíst lhůty na oprávnění, které je třeba zahrnout do harmonogramu zakázky.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Co pokrýt vlastní kapacitou a co subdodávkou?', a: 'Klíčová řemesla a kontinuitu vlastní kapacitou, specializované nebo nárazové práce subdodávkou a objemové pomocné práce flexibilně. Poměr závisí na typu a souběhu zakázek.' },
    { q: 'Jak zahrnout nábor ze zahraničí do projektu?', a: 'Připočtěte lhůty na pobytová a pracovní oprávnění do harmonogramu zakázky. Konkrétní lhůty ověřte u příslušných úřadů.' },
    { q: 'Uvádíte počty nebo mzdy?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/stavebni-pracovnici', label: 'Stavební pracovníci: přehled' },
    { href: '/stavebni-profese', label: 'Stavební profese' },
    { href: '/pomocni-stavebni-pracovnici', label: 'Pomocní stavební pracovníci' },
    { href: '/nedostatek-pracovniku-ve-stavebnictvi', label: 'Nedostatek pracovníků ve stavebnictví' },
    planovaniLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const POMOCNI_STAVEBNI_PRACOVNICI: SeoPage = {
  slug: 'pomocni-stavebni-pracovnici',
  breadcrumbLabel: 'Pomocní stavební pracovníci',
  eyebrow: 'Nábor · Stavebnictví',
  title: 'Pomocní stavební pracovníci: nábor a zajištění',
  heroSubtitle:
    'Jak obsazovat pomocné pozice na stavbě – nižší vstupní bariéra, podpora řemesel a bezpečnost. Praktický pohled pro stavební firmy.',
  description:
    'Pomocní stavební pracovníci – jak obsazovat pomocné pozice na stavbě: nižší vstupní bariéra, podpora řemesel, bezpečnost a pružné formy. Praktický pohled bez vymyšlených čísel.',
  keywords: ['pomocní stavební pracovníci', 'pomocné práce stavba', 'stavební dělníci', 'podpora řemesel', 'nábor stavebnictví', 'sezónní práce stavba'],
  intro:
    'Pomocní stavební pracovníci podporují řemeslníky a zajišťují přípravné, úklidové a manipulační práce na staveništi. Mají obvykle nižší vstupní bariéru než kvalifikovaná řemesla, a proto je lze obsadit širším okruhem kandidátů a rychleji zaučit. Tato stránka se věnuje tomu, jak pomocné pozice na stavbě obsazovat, zaškolovat a plánovat, s důrazem na bezpečnost. Konkrétní mzdy ani počty neuvádíme; nabízíme praktický pohled pro stavební firmy, který zohledňuje sezónnost a projektovost i nároky na bezpečnost na staveništi.',
  sections: [
    {
      heading: 'Role pomocných pracovníků',
      body: [
        'Pomocní pracovníci zajišťují přípravu materiálu, úklid, manipulaci a podporu řemeslníků. Nevyžadují obvykle řemeslnou kvalifikaci, o to důležitější je však zaučení na konkrétní práci a důsledná bezpečnost.',
        'Tyto pozice často kolísají podle fáze projektu a sezóny.',
      ],
    },
    {
      heading: 'Jak pomocné pozice obsazovat',
      body: [
        'Díky nižší bariéře lze pomocné pozice obsadit širším okruhem kandidátů a rychle zaučit. Pro sezónní a projektové výkyvy se hodí flexibilní formy a agenturní zaměstnávání; u dlouhodobého nedostatku rozšiřuje okruh nábor ze zahraničí.',
      ],
      bullets: [
        'Širší okruh kandidátů, rychlé zaučení',
        'Flexibilní a agenturní kapacita na výkyvy',
        'Nábor ze zahraničí u dlouhodobého nedostatku',
        'V inzerci popsat charakter práce a podmínky',
      ],
    },
    {
      heading: 'Bezpečnost a zaučení na staveništi',
      body: [
        'I u pomocných pozic je bezpečnost zásadní – vstupní školení BOZP, seznámení s riziky staveniště a jasné pokyny. Dobré zaučení a dohled snižují riziko úrazů u méně zkušených pracovníků.',
      ],
    },
    {
      heading: 'Plánování podle fází a sezóny',
      body: [
        'Potřebu pomocných pracovníků je vhodné plánovat podle fází projektu a sezóny a zajišťovat flexibilní kapacitu s předstihem. Tak lze pokrýt nárazové práce bez zbytečných nákladů mimo aktivní fáze.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Potřebují pomocní pracovníci kvalifikaci?', a: 'Obvykle ne řemeslnou. Klíčové jsou zaučení na konkrétní práci, spolehlivost a dodržování bezpečnosti. Vstupní školení BOZP je standardní součástí nástupu.' },
    { q: 'Jak pokrýt sezónní výkyvy?', a: 'Flexibilními formami a agenturní kapacitou zajištěnou s předstihem podle fází projektu. U dlouhodobého nedostatku pomáhá nábor ze zahraničí.' },
    { q: 'Uvádíte mzdy?', a: 'Ne. Konkrétní mzdy nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/stavebni-pracovnici', label: 'Stavební pracovníci: přehled' },
    { href: '/pracovnici-pro-stavebnictvi', label: 'Pracovníci pro stavebnictví' },
    { href: '/stavebni-profese', label: 'Stavební profese' },
    { href: '/nedostatek-pracovniku-ve-stavebnictvi', label: 'Nedostatek pracovníků ve stavebnictví' },
    docasneLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const STAVEBNI_PROFESE: SeoPage = {
  slug: 'stavebni-profese',
  breadcrumbLabel: 'Stavební profese',
  eyebrow: 'Nábor · Stavebnictví',
  title: 'Stavební profese: nábor kvalifikovaných řemesel',
  heroSubtitle:
    'Jak obsazovat kvalifikované stavební profese – užší okruh kandidátů, význam praxe a udržení specialistů. Pohled na nábor řemesel pro stavební firmy.',
  description:
    'Stavební profese – jak obsazovat kvalifikovaná řemesla: užší okruh kandidátů, význam praxe a kvalifikace a udržení specialistů. Praktický pohled pro stavební firmy bez čísel.',
  keywords: ['stavební profese', 'kvalifikovaná řemesla', 'řemeslníci stavebnictví', 'nábor řemesel', 'udržení specialistů', 'stavební kvalifikace'],
  intro:
    'Stavební profese zahrnují kvalifikovaná řemesla, která vyžadují praxi, dovednosti a u některých prací i příslušná oprávnění. Jejich obsazení je náročnější než u pomocných pozic, protože okruh dostupných kandidátů je užší a nahrazení specialisty je obtížné a zdlouhavé. Tato stránka se věnuje tomu, jak kvalifikované stavební profese obsazovat a udržet, s respektem k jejich specifikům. Neuvádíme konkrétní mzdy ani výčty s daty; nabízíme kvalitativní pohled pro stavební firmy, který klade důraz na cílený nábor a udržení specialistů.',
  sections: [
    {
      heading: 'Čím jsou kvalifikovaná řemesla specifická',
      body: [
        'Kvalifikované stavební profese stojí na praxi a dovednostech a u některých prací na příslušných oprávněních. Kvalita jejich práce přímo ovlivňuje výsledek zakázky, a proto má jejich obsazení a udržení velkou váhu.',
        'Okruh dostupných specialistů bývá užší, což nábor prodlužuje a zvyšuje význam udržení.',
      ],
    },
    {
      heading: 'Cílený nábor specialistů',
      body: [
        'U kvalifikovaných profesí se vyplatí cílený nábor – jasný popis požadované kvalifikace a praxe, oslovení přes specializované kanály a doporučení. U dlouhodobého nedostatku konkrétních řemesel rozšiřuje okruh nábor ze zahraničí, s nutnou administrativou oprávnění.',
      ],
      bullets: [
        'Jasný popis kvalifikace a praxe v inzerci',
        'Specializované kanály a doporučení',
        'Nábor ze zahraničí u nedostatkových řemesel',
        'Ověření kvalifikace a případných oprávnění',
      ],
    },
    {
      heading: 'Zaškolení a bezpečnost',
      body: [
        'I u zkušených řemeslníků platí vstupní školení BOZP a seznámení s riziky konkrétního staveniště. U specializovaných prací je na místě ověřit potřebná oprávnění a zajistit koordinaci s ostatními profesemi.',
      ],
    },
    {
      heading: 'Udržení specialistů a plánování',
      body: [
        'Protože nahrazení kvalifikovaného řemeslníka je obtížné, dává u těchto profesí velký smysl udržení – férové podmínky, kontinuita zakázek a dobré vedení. Plánování by mělo navázat dostupnost specialistů na harmonogram projektů.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Proč je obsazení kvalifikovaných řemesel náročnější?', a: 'Okruh dostupných specialistů je užší a nahrazení je obtížné a zdlouhavé. Proto se vyplatí cílený nábor a důraz na udržení.' },
    { q: 'Pomůže nábor ze zahraničí u řemesel?', a: 'U dlouhodobého nedostatku konkrétních řemesel rozšiřuje okruh kandidátů. Je nutné počítat s administrativou oprávnění a ověřením kvalifikace.' },
    { q: 'Uvádíte mzdy řemesel?', a: 'Ne. Konkrétní mzdy nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/stavebni-pracovnici', label: 'Stavební pracovníci: přehled' },
    { href: '/pracovnici-pro-stavebnictvi', label: 'Pracovníci pro stavebnictví' },
    { href: '/pomocni-stavebni-pracovnici', label: 'Pomocní stavební pracovníci' },
    { href: '/nedostatek-pracovniku-ve-stavebnictvi', label: 'Nedostatek pracovníků ve stavebnictví' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER E — POTRAVINÁŘSTVÍ (food production)
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_PRO_POTRAVINARSKOU_VYROBU: SeoPage = {
  slug: 'pracovnici-pro-potravinarskou-vyrobu',
  breadcrumbLabel: 'Pracovníci pro potravinářskou výrobu',
  eyebrow: 'Nábor · Potravinářství',
  title: 'Pracovníci pro potravinářskou výrobu',
  heroSubtitle:
    'Jak personálně zajistit potravinářskou výrobu – hygiena, kontinuita a směnný provoz. Praktický přehled náboru pro potravinářské provozy.',
  description:
    'Pracovníci pro potravinářskou výrobu – jak personálně zajistit provoz: hygienické požadavky, kontinuita a směny, nábor a zaškolení. Praktický přehled bez vymyšlených čísel.',
  keywords: ['pracovníci pro potravinářskou výrobu', 'potravinářství nábor', 'hygiena potravin', 'potravinářský provoz', 'směnný provoz', 'výroba potravin'],
  intro:
    'Potravinářská výroba má svá specifika – přísné hygienické požadavky, nutnost kontinuity provozu a často směnný režim. Personální zajištění zde proto stojí nejen na obsazení pozic, ale i na dodržování hygieny a bezpečnosti potravin. Tato stránka nabízí přehled, jak potravinářský provoz personálně zajistit – od náborových cest po zaškolení a plánování. Konkrétní mzdy ani počty neuvádíme; jde o praktický rámec pro potravinářské firmy, který zohledňuje hygienu, kontinuitu a směnnost a nároky na zaškolení nových pracovníků.',
  sections: [
    {
      heading: 'Specifika potravinářské výroby',
      body: [
        'Potravinářský provoz klade důraz na hygienu, dodržování postupů a bezpečnost potravin a obvykle vyžaduje kontinuitu výroby ve směnách. Pozice zahrnují zpracování, výrobu a balení a často i kontrolní role.',
        'U části pozic mohou platit zvláštní zdravotní a hygienické požadavky, které ovlivňují nástup.',
      ],
    },
    {
      heading: 'Jak potravinářský provoz nabírat',
      body: [
        'Pro potravinářství se osvědčuje stálé jádro doplněné flexibilní kapacitou na výkyvy. Část pozic má nižší vstupní bariéru a lze je rychleji obsadit; u nedostatku rozšiřuje okruh nábor ze zahraničí. V inzerci je vhodné uvést hygienické a směnné nároky.',
      ],
      bullets: [
        'Stálé jádro pro kontinuitu výroby',
        'Flexibilní kapacita na výkyvy',
        'V inzerci uvést hygienické a směnné nároky',
        'Nábor ze zahraničí u nedostatku',
      ],
    },
    {
      heading: 'Zaškolení na hygienu a bezpečnost',
      body: [
        'Zaškolení v potravinářství se vedle vstupního školení BOZP soustředí na hygienické postupy a bezpečnost potravin. U některých pozic mohou být potřeba zdravotní průkazy či splnění hygienických požadavků; konkrétní povinnosti vycházejí z předpisů.',
      ],
    },
    {
      heading: 'Plánování kontinuity provozu',
      body: [
        'Protože potravinářská výroba často vyžaduje kontinuitu, je důležité plánovat směnové pokrytí s rezervou a zastupitelností. Flexibilní kapacita pomáhá zvládat výkyvy bez ohrožení provozu.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Co je u potravinářství při náboru specifické?', a: 'Přísné hygienické požadavky, kontinuita provozu a směnnost. U některých pozic mohou platit zvláštní zdravotní a hygienické požadavky; konkrétní povinnosti vycházejí z předpisů.' },
    { q: 'Potřebují pracovníci zdravotní průkaz?', a: 'U části pozic mohou být potřeba zdravotní průkazy či splnění hygienických požadavků. Konkrétní povinnosti ověřte podle platných předpisů a charakteru provozu.' },
    { q: 'Uvádíte mzdy nebo počty?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/baleni-potravin-pracovnici', label: 'Pracovníci balení potravin' },
    { href: '/vyroba-potravin-pracovnici', label: 'Pracovníci výroby potravin' },
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    naborCizincuLink,
    naborLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const BALENI_POTRAVIN_PRACOVNICI: SeoPage = {
  slug: 'baleni-potravin-pracovnici',
  breadcrumbLabel: 'Pracovníci balení potravin',
  eyebrow: 'Nábor · Potravinářství',
  title: 'Pracovníci balení potravin: nábor a zajištění',
  heroSubtitle:
    'Jak obsazovat pozice balení potravin – tempo, hygiena a nárazové objemy. Náborové a zaškolovací úvahy pro potravinářské provozy.',
  description:
    'Pracovníci balení potravin – jak obsazovat pozice balení: tempo a hygiena, nárazové objemy a zaškolení. Praktický pohled pro potravinářské provozy bez vymyšlených čísel.',
  keywords: ['balení potravin pracovníci', 'balení potravin', 'potravinářské balení', 'nábor balení', 'hygiena balení', 'směnný provoz potraviny'],
  intro:
    'Balení potravin je častou nástupní pozicí v potravinářské výrobě – pracovníci balí a kompletují produkty podle daného postupu, s důrazem na tempo a hygienu. Vstupní bariéra bývá nižší, díky čemuž lze pozice obsadit širším okruhem kandidátů a rychleji zaučit. Tato stránka se věnuje tomu, jak pozice balení obsazovat, zaškolovat a plánovat. Konkrétní mzdy ani normy neuvádíme; nabízíme praktický pohled pro potravinářské provozy, který zohledňuje hygienu, tempo a nárazové objemy spojené s výrobními a sezónními cykly.',
  sections: [
    {
      heading: 'Co práce u balení obnáší',
      body: [
        'Pracovníci balení kompletují, váží, balí a značí produkty podle postupu a hygienických pravidel. Práce bývá opakovaná, vázaná na tempo linky a na kvalitu, a probíhá v hygienicky kontrolovaném prostředí.',
        'Objem práce kolísá podle výrobních a sezónních cyklů.',
      ],
    },
    {
      heading: 'Jak pozice balení obsazovat',
      body: [
        'Díky nižší vstupní bariéře lze pozice balení obsadit širším okruhem kandidátů a rychle zaučit. Pro objemové a sezónní potřeby se hodí agenturní zaměstnávání; u nedostatku rozšiřuje okruh nábor ze zahraničí. V inzerci je vhodné uvést hygienické a směnné nároky.',
      ],
      bullets: [
        'Širší okruh kandidátů, rychlé zaučení',
        'Objemové potřeby agenturní kapacitou',
        'V inzerci uvést hygienu a směny',
        'Nábor ze zahraničí u nedostatku',
      ],
    },
    {
      heading: 'Zaškolení na hygienu a postup',
      body: [
        'Zaškolení se vedle vstupního školení BOZP soustředí na hygienické postupy, balicí proces a kvalitu. U některých pozic mohou platit zdravotní a hygienické požadavky podle předpisů. Přehledné zaučení je důležité před objemovými špičkami.',
      ],
    },
    {
      heading: 'Plánování objemů balení',
      body: [
        'Kapacitu pro balení je vhodné plánovat podle výrobních a sezónních cyklů a flexibilní posily zajišťovat s předstihem. Stálé jádro doplněné agenturní kapacitou umožní zvládnout objem bez zbytečných nákladů mimo špičku.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Potřebují pracovníci balení kvalifikaci?', a: 'Vstupní bariéra bývá nižší a zaučení rychlé. Důležité jsou tempo, spolehlivost a dodržování hygieny. U části pozic mohou platit hygienické požadavky podle předpisů.' },
    { q: 'Jak pokrýt objemové špičky?', a: 'Stálým jádrem doplněným agenturní kapacitou zajištěnou s předstihem podle výrobních a sezónních cyklů.' },
    { q: 'Uvádíte mzdy nebo normy?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-pro-potravinarskou-vyrobu', label: 'Pracovníci pro potravinářskou výrobu' },
    { href: '/vyroba-potravin-pracovnici', label: 'Pracovníci výroby potravin' },
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    docasneLink,
    jakNajitLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const VYROBA_POTRAVIN_PRACOVNICI: SeoPage = {
  slug: 'vyroba-potravin-pracovnici',
  breadcrumbLabel: 'Pracovníci výroby potravin',
  eyebrow: 'Nábor · Potravinářství',
  title: 'Pracovníci výroby potravin: nábor pro zpracování a výrobu',
  heroSubtitle:
    'Jak obsazovat pozice zpracování a výroby potravin – obsluha, postupy a hygiena. Náborové a plánovací úvahy pro potravinářské provozy.',
  description:
    'Pracovníci výroby potravin – jak obsazovat pozice zpracování a výroby: obsluha a postupy, hygiena a kontinuita, nábor a plánování. Praktický pohled bez vymyšlených čísel.',
  keywords: ['výroba potravin pracovníci', 'zpracování potravin', 'potravinářská výroba', 'obsluha výroby potravin', 'hygiena výroba', 'nábor potravinářství'],
  intro:
    'Pracovníci výroby potravin zajišťují samotné zpracování a výrobu produktů – od přípravy surovin po obsluhu výrobních zařízení. Oproti balení jde často o náročnější pozice s důrazem na postupy, hygienu a kontinuitu výroby. Tato stránka se věnuje tomu, jak tyto pozice obsazovat, zaškolovat a plánovat. Konkrétní mzdy ani normy neuvádíme; nabízíme praktický pohled pro potravinářské provozy, který doplňuje obecnou stránku o potravinářské výrobě a stránku o balení o zaměření na zpracování a obsluhu výroby.',
  sections: [
    {
      heading: 'Co práce ve výrobě potravin obnáší',
      body: [
        'Pracovníci výroby připravují suroviny, obsluhují výrobní zařízení a dohlížejí na postupy a kvalitu v hygienicky kontrolovaném prostředí. Náročnost se liší podle pozice – od jednodušších úkonů po obsluhu vyžadující zaučení a zodpovědnost.',
        'Kontinuita výroby a hygiena jsou zde klíčové.',
      ],
    },
    {
      heading: 'Náborové úvahy pro výrobu potravin',
      body: [
        'U výrobních pozic se osvědčuje stálé jádro pro kontinuitu a kvalitu, doplněné flexibilní kapacitou na výkyvy. Část pozic vyžaduje delší zaučení; u nedostatku rozšiřuje okruh nábor ze zahraničí. V inzerci je vhodné uvést hygienické a směnné nároky.',
      ],
      bullets: [
        'Stálé jádro pro kontinuitu a kvalitu',
        'Flexibilní kapacita na výkyvy',
        'Delší zaučení u náročnějších pozic',
        'Nábor ze zahraničí u nedostatku',
      ],
    },
    {
      heading: 'Zaškolení na postupy a hygienu',
      body: [
        'Zaškolení se vedle vstupního školení BOZP soustředí na výrobní postupy, hygienu a bezpečnost potravin. U některých pozic mohou platit zdravotní a hygienické požadavky podle předpisů a delší zaučení na zařízení.',
      ],
    },
    {
      heading: 'Plánování kontinuity výroby',
      body: [
        'Protože výroba potravin často vyžaduje kontinuitu, je vhodné plánovat směnové pokrytí s rezervou a zastupitelností. Stálé jádro doplněné flexibilní kapacitou pomáhá zvládat výkyvy bez ohrožení provozu.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jak se výroba potravin liší od balení?', a: 'Výroba se soustředí na zpracování a obsluhu zařízení a bývá náročnější s důrazem na postupy a kontinuitu, zatímco balení je často nástupní pozicí s nižší bariérou.' },
    { q: 'Vyžadují pozice delší zaučení?', a: 'Náročnější výrobní pozice ano. U některých mohou platit hygienické a zdravotní požadavky podle předpisů. Vstupní školení BOZP je standardní.' },
    { q: 'Uvádíte mzdy nebo počty?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-pro-potravinarskou-vyrobu', label: 'Pracovníci pro potravinářskou výrobu' },
    { href: '/baleni-potravin-pracovnici', label: 'Pracovníci balení potravin' },
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    naborCizincuLink,
    planovaniLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER F — AUTOMOTIVE
// ──────────────────────────────────────────────────────────────────────────

export const PRACOVNICI_PRO_AUTOMOTIVE: SeoPage = {
  slug: 'pracovnici-pro-automotive',
  breadcrumbLabel: 'Pracovníci pro automotive',
  eyebrow: 'Nábor · Automotive',
  title: 'Pracovníci pro automotive: nábor zaměstnanců pro automobilový průmysl',
  heroSubtitle:
    'Jak personálně zajistit provoz v automotive – montážní linky, takt a kvalita ve směnném režimu. Praktický přehled náboru pro automobilový průmysl.',
  description:
    'Pracovníci pro automotive – jak personálně zajistit automobilový provoz: montážní linky a takt, kvalita a směny, nábor a plánování. Praktický přehled bez vymyšlených čísel.',
  keywords: ['pracovníci pro automotive', 'automobilový průmysl nábor', 'montážní linky', 'automotive výroba', 'směnný provoz', 'kvalita výroby'],
  intro:
    'Automobilový průmysl patří mezi náročné výrobní obory s důrazem na takt linky, kvalitu a kontinuitu ve směnném provozu. Personální zajištění zde stojí na schopnosti udržet linku v chodu a dodržet kvalitativní nároky. Tato stránka nabízí přehled, jak provoz v automotive personálně zajistit – od náborových cest po plánování směn. Konkrétní mzdy ani počty neuvádíme; jde o praktický rámec pro firmy v automobilovém průmyslu, který zohledňuje práci na lince, kvalitu a směnnost i nároky na zaškolení nových pracovníků.',
  sections: [
    {
      heading: 'Specifika automobilového provozu',
      body: [
        'Automotive se vyznačuje prací na montážních linkách s daným taktem, vysokými nároky na kvalitu a kontinuitou ve směnném provozu. Výpadek lidí nebo nedodržení kvality se promítá do celé linky a navazujících dodávek.',
        'Provoz často funguje v dodavatelských řetězcích s tlakem na spolehlivost a stabilitu.',
      ],
    },
    {
      heading: 'Jak automotive nabírat',
      body: [
        'Pro automotive se osvědčuje stálé jádro pro kvalitu a kontinuitu doplněné flexibilní kapacitou na výkyvy výroby. Agenturní zaměstnávání pomáhá pokrýt náběhy a špičky; u nedostatku rozšiřuje okruh nábor ze zahraničí. Důležitá je spolehlivost a ochota pracovat na lince.',
      ],
      bullets: [
        'Stálé jádro pro kvalitu a kontinuitu',
        'Flexibilní kapacita na náběhy a výkyvy',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Důraz na spolehlivost a směnný režim',
      ],
    },
    {
      heading: 'Zaškolení na linku a kvalitu',
      body: [
        'Zaškolení se vedle vstupního školení BOZP soustředí na práci v taktu linky, kvalitativní standardy a konkrétní operace. Připravený a opakovatelný onboarding je důležitý zejména při náběhu výroby nebo náboru více lidí najednou.',
      ],
    },
    {
      heading: 'Plánování směn a náběhů',
      body: [
        'Plánování kapacity musí sladit takt linky, směny a náběhy výroby. Pomáhá zastupitelnost, rezerva na výpadky a včasné zajištění flexibilní kapacity. U náboru ze zahraničí je nutné počítat s lhůtami na oprávnění.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Co je u automotive při náboru specifické?', a: 'Práce na lince v daném taktu, vysoké nároky na kvalitu a kontinuita ve směnách. Výpadek nebo nedodržení kvality ovlivní celou linku a dodávky.' },
    { q: 'Jak pokrýt náběhy výroby?', a: 'Stálým jádrem doplněným flexibilní agenturní kapacitou zajištěnou s předstihem, s opakovatelným onboardingem. Okamžitou dostupnost neslibujeme.' },
    { q: 'Uvádíte mzdy nebo počty?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/automobilovy-prumysl-pracovnici', label: 'Pracovníci v automobilovém průmyslu' },
    { href: '/montazni-linky-pracovnici', label: 'Pracovníci montážních linek' },
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    naborCizincuLink,
    naborLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const AUTOMOBILOVY_PRUMYSL_PRACOVNICI: SeoPage = {
  slug: 'automobilovy-prumysl-pracovnici',
  breadcrumbLabel: 'Pracovníci v automobilovém průmyslu',
  eyebrow: 'Nábor · Automotive',
  title: 'Pracovníci v automobilovém průmyslu: role a kvalita',
  heroSubtitle:
    'Jaké role tvoří automobilovou výrobu a jak je obsazovat s ohledem na kvalitu a dodavatelské nároky. Pohled na složení týmu pro automotive.',
  description:
    'Pracovníci v automobilovém průmyslu – jaké role tvoří výrobu (montáž, obsluha, kontrola kvality) a jak je obsazovat s ohledem na kvalitu a dodavatelské nároky. Bez vymyšlených čísel.',
  keywords: ['automobilový průmysl pracovníci', 'role automotive', 'kontrola kvality', 'dodavatelský řetězec', 'automobilová výroba', 'nábor automotive'],
  intro:
    'Automobilovou výrobu netvoří jediná role, ale provázaný tým montážních, obslužných a kontrolních pozic, který musí splnit přísné kvalitativní nároky dodavatelského řetězce. Pro zaměstnavatele je užitečné vidět toto složení jako celek. Tato stránka popisuje typické role v automobilovém průmyslu a to, jak je obsazovat s ohledem na kvalitu a kontinuitu. Doplňuje obecnou stránku o pracovnících pro automotive o pohled na strukturu týmu. Konkrétní mzdy ani počty neuvádíme; nabízíme kvalitativní rámec pro firmy v automobilovém dodavatelském řetězci.',
  sections: [
    {
      heading: 'Z jakých rolí se automobilová výroba skládá',
      body: [
        'Tým v automotive obvykle zahrnuje montážní pracovníky na lince, operátory zařízení, manipulační pozice a pracovníky kontroly kvality, doplněné o koordinační role. Kvalita je průřezovým tématem napříč všemi pozicemi.',
        'Složení a nároky se liší podle místa v dodavatelském řetězci.',
      ],
    },
    {
      heading: 'Jak role obsazovat s ohledem na kvalitu',
      body: [
        'Vzhledem k nárokům na kvalitu se vyplatí klíčové a kontrolní role držet ve stálém jádru a stabilizovat je, zatímco objemové montážní pozice lze doplňovat flexibilní kapacitou. U nedostatku rozšiřuje okruh nábor ze zahraničí.',
      ],
      bullets: [
        'Klíčové a kontrolní role ve stálém jádru',
        'Objemové montážní pozice flexibilně',
        'Zastupitelnost a zaučení na více operací',
        'Nábor ze zahraničí u nedostatkových profesí',
      ],
    },
    {
      heading: 'Zaškolení a standardy kvality',
      body: [
        'Zaškolení se vedle vstupního školení BOZP soustředí na kvalitativní standardy, konkrétní operace a práci v taktu. Důsledné zaučení je v automotive klíčové, protože kvalita ovlivňuje celý dodavatelský řetězec.',
      ],
    },
    {
      heading: 'Plánování složení týmu',
      body: [
        'Plánování personálního mixu navazuje na objem výroby, náběhy a nároky na kvalitu. Vhodné je předem vědět, které role posílit a které lze pokrývat flexibilně, aby kvalita a kontinuita zůstaly zachovány.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké role tvoří automobilovou výrobu?', a: 'Typicky montážní pracovníci na lince, operátoři zařízení, manipulační pozice a kontrola kvality, doplněné o koordinační role. Kvalita je průřezovým tématem.' },
    { q: 'Jak při náboru zohlednit kvalitu?', a: 'Klíčové a kontrolní role držet ve stálém jádru a stabilizovat, objemové pozice doplňovat flexibilně. Důsledné zaučení je klíčové kvůli dodavatelskému řetězci.' },
    { q: 'Uvádíte počty nebo mzdy?', a: 'Ne. Konkrétní čísla nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-pro-automotive', label: 'Pracovníci pro automotive: přehled' },
    { href: '/montazni-linky-pracovnici', label: 'Pracovníci montážních linek' },
    { href: '/operatori-vyroby', label: 'Operátoři výroby' },
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    naborCizincuLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const MONTAZNI_LINKY_PRACOVNICI: SeoPage = {
  slug: 'montazni-linky-pracovnici',
  breadcrumbLabel: 'Pracovníci montážních linek',
  eyebrow: 'Nábor · Automotive',
  title: 'Pracovníci montážních linek: nábor pro práci v taktu',
  heroSubtitle:
    'Jak obsazovat pozice na montážních linkách – práce v taktu, spolehlivost a směnné pokrytí. Náborové a zaškolovací úvahy pro linkovou výrobu.',
  description:
    'Pracovníci montážních linek – jak obsazovat pozice s prací v taktu: spolehlivost a tempo, zaškolení na operace a směnné pokrytí. Praktický pohled pro linkovou výrobu bez čísel.',
  keywords: ['montážní linky pracovníci', 'práce v taktu', 'linková výroba', 'montážní linka', 'směnné pokrytí', 'nábor linka'],
  intro:
    'Pracovníci montážních linek vykonávají operace v daném taktu, kde tempo a spolehlivost přímo určují průchodnost linky. Tyto pozice jsou typické pro automotive i další linkovou výrobu a kladou důraz na zastupitelnost a směnné pokrytí. Tato stránka se věnuje tomu, jak pozice na montážních linkách obsazovat, zaškolovat a plánovat. Konkrétní mzdy ani normy taktu neuvádíme; nabízíme praktický pohled pro zaměstnavatele s linkovou výrobou, který zohledňuje práci v taktu, spolehlivost a nutnost plynulého pokrytí směn.',
  sections: [
    {
      heading: 'Specifika práce v taktu',
      body: [
        'Na montážní lince se operace opakují v daném taktu a jsou navázané na předchozí a následující pozici. Spolehlivost a tempo jednotlivce proto ovlivňují celou linku; výpadek nebo nestíhání se projeví okamžitě.',
        'Práce bývá ve směnách a vyžaduje stabilní obsazení.',
      ],
    },
    {
      heading: 'Náborové úvahy pro linku',
      body: [
        'U linkových pozic se vyplatí v inzerci jasně popsat práci v taktu a směnný režim a zaměřit se na spolehlivost a ochotu zaučit se. Stálé jádro drží plynulost linky; výkyvy a náběhy lze pokrýt agenturní kapacitou, u nedostatku náborem ze zahraničí.',
      ],
      bullets: [
        'V inzerci popsat práci v taktu a směny',
        'Důraz na spolehlivost a tempo',
        'Stálé jádro pro plynulost linky',
        'Agenturní kapacita na náběhy a výkyvy',
      ],
    },
    {
      heading: 'Zaškolení na operace a zastupitelnost',
      body: [
        'Zaškolení se vedle vstupního školení BOZP soustředí na konkrétní operace, tempo a kvalitu. Zaučení na více operací zvyšuje zastupitelnost, která je u linky klíčová pro pokrytí výpadků bez zastavení.',
      ],
    },
    {
      heading: 'Plánování plynulého pokrytí',
      body: [
        'Plánování musí zajistit, aby byla linka plynule obsazená i při výpadcích a absencích. Pomáhá rezerva, zastupitelnost a včasné zajištění flexibilní kapacity před náběhy. U náboru ze zahraničí je nutné počítat s lhůtami na oprávnění.',
        'Aktuální data trhu práce zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.',
      ],
    },
  ],
  faq: [
    { q: 'Co je u linkových pozic při náboru klíčové?', a: 'Spolehlivost a tempo, protože práce v taktu navazuje na okolní pozice. V inzerci se vyplatí jasně popsat takt a směnný režim.' },
    { q: 'Proč je důležitá zastupitelnost?', a: 'Zaučení na více operací umožní pokrýt výpadky a absence bez zastavení linky. Proto se zastupitelnost a rezerva u linky vyplatí.' },
    { q: 'Uvádíte normy taktu nebo mzdy?', a: 'Ne. Konkrétní normy ani mzdy nevymýšlíme. Aktuální údaje patří do oficiálních zdrojů (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.zakonBozp, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/pracovnici-pro-automotive', label: 'Pracovníci pro automotive: přehled' },
    { href: '/automobilovy-prumysl-pracovnici', label: 'Pracovníci v automobilovém průmyslu' },
    { href: '/montazni-pracovnici', label: 'Montážní pracovníci' },
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    docasneLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// Registry — ordered by industry cluster.
// ──────────────────────────────────────────────────────────────────────────

export const INDUSTRY_RECRUITMENT_PAGES: ReadonlyArray<SeoPage> = [
  // Cluster A — výroba
  PRACOVNICI_PRO_VYROBU,
  OPERATORI_VYROBY,
  MONTAZNI_PRACOVNICI,
  PRACOVNICI_DO_VYROBY,
  VYROBNI_ZAMESTNANCI,
  // Cluster B — sklady
  SKLADNICI,
  SKLADOVI_PRACOVNICI,
  PICKER_PACKER,
  PRACOVNICI_DO_SKLADU,
  MANIPULACNI_PRACOVNICI,
  // Cluster C — logistika
  PRACOVNICI_DO_LOGISTIKY,
  LOGISTICTI_PRACOVNICI,
  PRACOVNICI_PRO_DISTRIBUCNI_CENTRA,
  PRACOVNICI_PRO_ECOMMERCE_SKLADY,
  // Cluster D — stavebnictví
  STAVEBNI_PRACOVNICI,
  PRACOVNICI_PRO_STAVEBNICTVI,
  POMOCNI_STAVEBNI_PRACOVNICI,
  STAVEBNI_PROFESE,
  // Cluster E — potravinářství
  PRACOVNICI_PRO_POTRAVINARSKOU_VYROBU,
  BALENI_POTRAVIN_PRACOVNICI,
  VYROBA_POTRAVIN_PRACOVNICI,
  // Cluster F — automotive
  PRACOVNICI_PRO_AUTOMOTIVE,
  AUTOMOBILOVY_PRUMYSL_PRACOVNICI,
  MONTAZNI_LINKY_PRACOVNICI,
]
