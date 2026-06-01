// Employer operations authority cluster — business-intent pages that help
// employers make staffing decisions: recruitment operations, workforce
// stability (turnover/retention), onboarding, sector labor shortages and the
// true cost of employment. Each page is decision-oriented ("what can an
// employer do after reading this?") and reuses the shared SeoArticle/SeoPage
// layer. All content is qualitative and source-backed: no invented statistics,
// HR benchmarks, turnover/retention metrics, salary figures, payroll rates,
// cost percentages, case studies or guarantees. Variable values defer to
// official sources with cautious language.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-06-01'

const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}

// Shared cluster anchors.
const employerHubLink = { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' }
const empFaqLink = { href: '/faq-pro-zamestnavatele', label: 'FAQ pro zaměstnavatele' }
const empGlossaryLink = { href: '/slovnik-pojmu-pro-zamestnavatele', label: 'Slovník pojmů pro zaměstnavatele' }
const foreignWorkersLink = { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' }
const naborCizincuLink = { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' }

const consultCta = {
  eyebrow: 'Nábor a personální zázemí',
  title: 'Řešíte obsazení pozic?',
  text: 'Pomůžeme vám nastavit nábor i personální procesy tak, aby odpovídaly vaší situaci a aktuálním pravidlům. Rádi probereme konkrétní potřebu.',
  buttonLabel: 'Domluvit konzultaci',
  href: '/contact',
}

const hireCta = {
  eyebrow: 'Nábor pracovníků',
  title: 'Potřebujete obsadit pozice?',
  text: 'Pomůžeme vám s náborem od definice potřeby až po nástup a postaráme se o koordinaci administrativy v souladu s předpisy.',
  buttonLabel: 'Poslat poptávku',
  href: '/submit-offer',
}

// ──────────────────────────────────────────────────────────────────────────
// LEVEL 1 — CORNERSTONE HUB
// ──────────────────────────────────────────────────────────────────────────

export const PRO_ZAMESTNAVATELE: SeoPage = {
  slug: 'pro-zamestnavatele',
  breadcrumbLabel: 'Pro zaměstnavatele',
  eyebrow: 'Rozcestník · Zaměstnavatelé',
  title: 'Pro zaměstnavatele: nábor, stabilita týmu a náklady',
  heroSubtitle:
    'Rozcestník pro zaměstnavatele, kteří řeší obsazení pozic, fluktuaci, onboarding, nedostatek pracovníků v oboru a skutečné náklady na zaměstnance. Praktické informace pro rozhodování.',
  description:
    'Rozcestník pro zaměstnavatele: nábor a jeho plánování, snižování fluktuace a retence, onboarding, nedostatek pracovníků podle oborů a skutečné náklady na zaměstnance. Se zdroji.',
  keywords: ['pro zaměstnavatele', 'nábor pracovníků', 'fluktuace', 'retence zaměstnanců', 'onboarding', 'náklady na zaměstnance'],
  intro:
    'Tato stránka je rozcestníkem pro zaměstnavatele, kteří řeší praktické personální otázky – od obsazení pozic přes stabilitu týmu až po náklady na zaměstnance. Provazuje tematické okruhy clusteru tak, abyste rychle našli stránku odpovídající na konkrétní rozhodnutí, které právě řešíte. Obsah je praktický a u proměnlivých údajů, jako jsou sazby a statistiky trhu práce, odkazuje na oficiální zdroje místo vymyšlených čísel. Nejde o právní poradenství; cílem je usnadnit personální rozhodování a navázat na ověřené informace.',
  sections: [
    {
      heading: 'Nábor a jeho plánování',
      body: [
        'Pokud řešíte obsazení pozic, začněte u toho, jakou cestou nabírat a jak proces zorganizovat. Samostatné stránky se věnují přehledu náboru, organizaci výběrového procesu, hledání kandidátů, plánování náboru a náboru zahraničních pracovníků.',
      ],
      bullets: [
        'Přehled náboru pro zaměstnavatele',
        'Organizace výběrového procesu',
        'Kde hledat kandidáty',
        'Plánování náboru a kapacit',
        'Nábor zahraničních pracovníků',
      ],
    },
    {
      heading: 'Stabilita týmu, onboarding a obory',
      body: [
        'Udržení lidí a jejich úspěšný nástup ovlivňují náklady i výkon. Cluster pokrývá fluktuaci, její příčiny a snižování, retenci, onboarding a adaptaci a také nedostatek pracovníků v konkrétních oborech (výroba, logistika, sklady, stavebnictví).',
      ],
      bullets: [
        'Fluktuace, její příčiny a snižování',
        'Retence a onboarding zaměstnanců',
        'Nedostatek pracovníků podle oborů',
      ],
    },
    {
      heading: 'Náklady a další zdroje',
      body: [
        'Pro rozpočtové rozhodování slouží stránky o skutečných a nepřímých nákladech na zaměstnance a o tom, jak odhadnout náklady na jednu pozici. Doplňují je FAQ pro zaměstnavatele, přehled častých chyb a slovník pojmů.',
        'U konkrétních sazeb odvodů a daní vždy vycházejte z aktuálních oficiálních zdrojů uvedených na příslušných stránkách.',
      ],
    },
  ],
  faq: [
    { q: 'Jak mám začít, když potřebuji obsadit pozice?', a: 'Začněte definicí potřeby a volbou cesty náboru (interně vs. přes agenturu) a u zahraničních pracovníků zohledněte administrativu oprávnění. Odkazy na podrobné stránky najdete v sekci Související.' },
    { q: 'Co dělat s vysokou fluktuací?', a: 'Nejprve zjistit příčiny, pak nasadit konkrétní opatření a systematicky pracovat na retenci. Tématu se věnují samostatné stránky o fluktuaci a retenci.' },
    { q: 'Kde zjistím skutečné náklady na zaměstnance?', a: 'Stránky o nákladech vysvětlují strukturu nákladů a jak si sestavit vlastní odhad. Konkrétní sazby odvodů a daní ověřte u ČSSZ, zdravotních pojišťoven a finanční správy.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonOZamestnanosti, SRC.mpsv, SRC.upcr, SRC.czso],
  internalLinks: [
    { href: '/nabor-pracovniku', label: 'Nábor pracovníků: přehled' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
    naborCizincuLink,
    { href: '/jak-snizit-fluktuaci', label: 'Jak snížit fluktuaci' },
    { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    { href: '/onboarding-zamestnancu', label: 'Onboarding zaměstnanců' },
    { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
    { href: '/nedostatek-pracovniku-v-cr', label: 'Nedostatek pracovníků v ČR' },
    foreignWorkersLink,
    empFaqLink,
    empGlossaryLink,
  ],
  cta: hireCta,
  showToc: false,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER A — RECRUITMENT OPERATIONS
// ──────────────────────────────────────────────────────────────────────────

export const NABOR_PRACOVNIKU: SeoPage = {
  slug: 'nabor-pracovniku',
  breadcrumbLabel: 'Nábor pracovníků',
  eyebrow: 'Nábor · Zaměstnavatelé',
  title: 'Nábor pracovníků: praktický přehled pro zaměstnavatele',
  heroSubtitle:
    'Jaké cesty náboru existují a kdy která dává smysl – přímý nábor, agenturní zaměstnávání a nábor ze zahraničí. Praktický přehled pro rozhodnutí, jak obsadit pozice.',
  description:
    'Nábor pracovníků pro zaměstnavatele – přímý nábor vs. agentura vs. nábor ze zahraničí a kdy která cesta dává smysl. Praktický přehled pro rozhodnutí o obsazení pozic.',
  keywords: ['nábor pracovníků', 'nábor zaměstnanců', 'přímý nábor', 'agenturní zaměstnávání', 'obsazení pozic', 'personální nábor'],
  intro:
    'Nábor pracovníků není jediná činnost, ale několik různých cest, které se liší rychlostí, náklady a mírou administrativy. Zaměstnavatel se nejprve rozhoduje, zda nabírat přímo vlastními silami, využít pracovní agenturu, nebo sáhnout po náboru ze zahraničí – a každá varianta se hodí na jinou situaci. Tato stránka nabízí praktický přehled těchto cest a kritérií, podle kterých se mezi nimi rozhodovat. U konkrétních pravidel a sazeb odkazuje na oficiální zdroje a na podrobné stránky. Nejde o právní poradenství, ale o rozhodovací rámec.',
  sections: [
    {
      heading: 'Hlavní cesty náboru',
      body: [
        'Přímý nábor znamená, že firma sama hledá, vybírá a zaměstnává pracovníky. Agenturní zaměstnávání přenáší část administrativy a flexibility na pracovní agenturu, která pracovníky dočasně přiděluje. Nábor ze zahraničí rozšiřuje okruh kandidátů, ale přidává administrativu spojenou s oprávněními.',
        'Volba závisí na tom, jak rychle potřebujete obsadit pozice, zda jde o stálou potřebu nebo výkyv a jakou kapacitu má vaše personální oddělení.',
      ],
      bullets: [
        'Přímý nábor – plná kontrola, vyšší nároky na vlastní kapacitu',
        'Agenturní zaměstnávání – flexibilita a přenesení administrativy',
        'Nábor ze zahraničí – širší okruh kandidátů, více administrativy',
      ],
    },
    {
      heading: 'Podle čeho se rozhodnout',
      body: [
        'Užitečná kritéria jsou naléhavost, charakter potřeby (stálá vs. dočasná), dostupnost kandidátů na trhu a interní kapacita na vedení náboru a administrativu. Pro sezónní špičky a dočasné výpadky bývá vhodné agenturní zaměstnávání; pro klíčové stálé role přímý nábor.',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po projití těchto kritérií byste měli umět určit, kterou cestou (nebo kombinací) pozici obsadit a koho do procesu zapojit. Navazující stránky pomohou s organizací výběru, hledáním kandidátů a plánováním náboru.',
        'Pokud zvažujete nábor ze zahraničí, počítejte s administrativou oprávnění popsanou na stránkách o zaměstnávání cizinců.',
      ],
    },
  ],
  faq: [
    { q: 'Kdy se vyplatí agentura místo přímého náboru?', a: 'Typicky u sezónních špiček, dočasných výpadků kapacity nebo když nemáte interní kapacitu vést nábor. Agentura přebírá část administrativy a u agenturního zaměstnávání je formálním zaměstnavatelem.' },
    { q: 'Je nábor ze zahraničí složitější?', a: 'Přidává administrativu spojenou s pobytovými a pracovními oprávněními. Rozšiřuje ale okruh kandidátů. Podrobnosti popisují stránky o zaměstnávání cizinců a náboru zahraničních pracovníků.' },
    { q: 'Jak rychle lze obsadit pozici?', a: 'Závisí na dostupnosti kandidátů, zvolené cestě a u cizinců na povolovacím řízení. Tato stránka neuvádí konkrétní lhůty; u oprávnění je ověřte u příslušných úřadů.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.eures, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/jak-najit-pracovniky', label: 'Jak najít pracovníky pro firmu' },
    { href: '/nabor-zamestnancu', label: 'Nábor zaměstnanců: organizace procesu' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    naborCizincuLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAMESTNANCU: SeoPage = {
  slug: 'nabor-zamestnancu',
  breadcrumbLabel: 'Nábor zaměstnanců',
  eyebrow: 'Nábor · Zaměstnavatelé',
  title: 'Nábor zaměstnanců: plánování a organizace',
  heroSubtitle:
    'Jak zorganizovat výběrový proces od profilu pozice po nabídku – kdo se zapojí, jaké jsou fáze a jak nepřijít o kandidáty. Praktický návod pro vedení náboru.',
  description:
    'Nábor zaměstnanců – jak zorganizovat výběrový proces: profil pozice, screening, pohovory, rozhodnutí a nabídka. Praktický návod pro zaměstnavatele, jak vést nábor efektivně.',
  keywords: ['nábor zaměstnanců', 'výběrový proces', 'organizace náboru', 'pohovory', 'profil pozice', 'nábor proces'],
  intro:
    'Když je rozhodnuto, že se bude nabírat, rozhoduje o výsledku organizace výběrového procesu. Dobře vedený nábor má jasné fáze, určené role a tempo, které neodradí kvalitní kandidáty. Tato stránka popisuje, jak výběrový proces strukturovat – od profilu pozice po nabídku – a kde nejčastěji vznikají ztráty kandidátů. Soustředí se na praktickou stránku vedení náboru, nikoli na to, kde kandidáty hledat (tomu se věnuje samostatná stránka). Cílem je dát zaměstnavateli použitelný rámec pro organizaci náboru, ne univerzální šablonu.',
  sections: [
    {
      heading: 'Fáze výběrového procesu',
      body: [
        'Základní fáze obvykle zahrnují definici profilu pozice, screening přihlášek, pohovory, ověření a rozhodnutí a nakonec nabídku. Každá fáze má svůj účel a je vhodné předem určit, kdo za ni odpovídá a jaké jsou výstupy.',
        'Srozumitelný profil pozice je základ – z něj se odvíjí inzerce, screening i kritéria výběru.',
      ],
      bullets: [
        'Profil pozice a kritéria výběru',
        'Screening přihlášek',
        'Pohovory a ověření',
        'Rozhodnutí a nabídka',
        'Předání do onboardingu',
      ],
    },
    {
      heading: 'Kde se ztrácejí kandidáti',
      body: [
        'Časté ztráty vznikají z pomalého tempa, nejasné komunikace nebo příliš mnoha kol pohovorů. Kvalitní kandidáti mívají více možností, takže rychlost a jasnost reakce hrají roli. Pomáhá předem dohodnout interní termíny a kdo rozhoduje.',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po promyšlení procesu byste měli mít nastavené fáze, role a tempo náboru a jasné předání úspěšného kandidáta do onboardingu. Tím se zvyšuje šance, že nábor skončí přijetím vhodného člověka, který skutečně nastoupí.',
        'Na organizaci navazuje úspěšný nástup – tomu se věnují stránky o onboardingu a adaptaci.',
      ],
    },
  ],
  faq: [
    { q: 'Kolik kol pohovorů je vhodných?', a: 'Tato stránka neuvádí univerzální počet – závisí na pozici. Obecně platí, že příliš mnoho kol a pomalé tempo zvyšují riziko ztráty kandidátů. Vyplatí se proces zjednodušit na nezbytné fáze.' },
    { q: 'Kdo by měl rozhodovat o přijetí?', a: 'Vhodné je předem určit, kdo rozhoduje a kdo proces vede, aby nedocházelo k prodlevám. Konkrétní nastavení závisí na velikosti firmy a typu pozice.' },
    { q: 'Co po přijetí kandidáta?', a: 'Následuje předání do onboardingu a adaptace. Dobře připravený nástup snižuje riziko brzkého odchodu; tématu se věnují samostatné stránky.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonOZamestnanosti, SRC.upcr],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-pracovniku', label: 'Nábor pracovníků: přehled cest' },
    { href: '/jak-najit-pracovniky', label: 'Jak najít pracovníky pro firmu' },
    { href: '/onboarding-zamestnancu', label: 'Onboarding zaměstnanců' },
    { href: '/checklist-pro-nove-zamestnance', label: 'Checklist pro nové zaměstnance' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const JAK_NAJIT_PRACOVNIKY: SeoPage = {
  slug: 'jak-najit-pracovniky',
  breadcrumbLabel: 'Jak najít pracovníky',
  eyebrow: 'Nábor · Zaměstnavatelé',
  title: 'Jak najít pracovníky pro firmu',
  heroSubtitle:
    'Kde hledat kandidáty – inzerce, doporučení, pracovní agentury, EURES a nábor ze zahraničí. Přehled náborových kanálů a kdy který použít. Praktický pohled pro zaměstnavatele.',
  description:
    'Jak najít pracovníky pro firmu – přehled náborových kanálů: inzerce, doporučení, agentury, EURES a nábor ze zahraničí. Kdy který kanál použít. Praktický pohled pro zaměstnavatele.',
  keywords: ['jak najít pracovníky', 'náborové kanály', 'kde hledat zaměstnance', 'sourcing kandidátů', 'EURES', 'doporučení zaměstnanců'],
  intro:
    'Hledání kandidátů je samostatná disciplína – stejná pozice se obsazuje různě podle toho, jaké kanály zaměstnavatel zvolí. Vedle klasické inzerce existují doporučení od stávajících zaměstnanců, spolupráce s pracovními agenturami, portál EURES pro občany EU a nábor ze zahraničí. Tato stránka přehledně shrnuje hlavní náborové kanály a to, kdy který dává smysl, aby zaměstnavatel věnoval energii tam, kde má největší šanci najít vhodné lidi. Nejde o vyčerpávající návod, ale o praktickou orientaci v kanálech a jejich silných stránkách.',
  sections: [
    {
      heading: 'Hlavní náborové kanály',
      body: [
        'Každý kanál má jiný dosah a jiné nároky. Inzerce oslovuje aktivně hledající, doporučení přivádějí prověřené kontakty, agentury zrychle dodají kapacitu a EURES pomáhá oslovit kandidáty z EU. Nábor ze zahraničí rozšiřuje okruh tam, kde na tuzemském trhu lidé chybí.',
      ],
      bullets: [
        'Inzerce (pracovní portály, web firmy, sociální sítě)',
        'Doporučení od stávajících zaměstnanců',
        'Spolupráce s pracovní agenturou',
        'EURES pro kandidáty z EU',
        'Nábor ze zahraničí (třetí země)',
      ],
    },
    {
      heading: 'Kdy který kanál použít',
      body: [
        'U běžných pozic bývá efektivní kombinace inzerce a doporučení. U rychlé nebo dočasné potřeby agentura. U nedostatkových profesí se vyplatí rozšířit hledání i mimo tuzemský trh, byť s vyšší administrativou. Volba kanálu by měla odpovídat typu pozice a naléhavosti.',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po zvážení kanálů byste měli vědět, kde danou pozici inzerovat a koho oslovit, případně zda zapojit agenturu nebo nábor ze zahraničí. Tím nasměrujete náborové úsilí efektivněji.',
        'Pokud zvažujete zahraniční kandidáty, navažte na stránky o zaměstnávání cizinců a náboru zahraničních pracovníků kvůli administrativě oprávnění.',
      ],
    },
  ],
  faq: [
    { q: 'Který kanál je nejúčinnější?', a: 'Univerzální odpověď neexistuje – závisí na pozici a naléhavosti. U běžných rolí bývá silná kombinace inzerce a doporučení, u rychlé potřeby agentura, u nedostatkových profesí i nábor ze zahraničí.' },
    { q: 'Co je EURES?', a: 'EURES je evropský portál pracovní mobility, který pomáhá propojovat zaměstnavatele a uchazeče z EU. Pro občany EU nevzniká potřeba pracovního povolení.' },
    { q: 'Kdy zapojit nábor ze zahraničí?', a: 'Zejména u profesí, kde na tuzemském trhu chybí lidé. Počítejte s administrativou pobytových a pracovních oprávnění popsanou na stránkách o zaměstnávání cizinců.' },
  ],
  sources: [SRC.eures, SRC.upcr, SRC.zakonOZamestnanosti, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-pracovniku', label: 'Nábor pracovníků: přehled cest' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
    naborCizincuLink,
    foreignWorkersLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PLANOVANI_NABORU: SeoPage = {
  slug: 'planovani-naboru',
  breadcrumbLabel: 'Plánování náboru',
  eyebrow: 'Nábor · Zaměstnavatelé',
  title: 'Plánování náboru zaměstnanců',
  heroSubtitle:
    'Jak předvídat potřebu lidí, zohlednit sezónnost a fluktuaci a naplánovat nábor s předstihem. Praktický pohled na kapacitní plánování pro zaměstnavatele.',
  description:
    'Plánování náboru zaměstnanců – jak předvídat potřebu lidí, zohlednit sezónnost a fluktuaci a plánovat s předstihem. Praktický pohled na kapacitní plánování pro zaměstnavatele.',
  keywords: ['plánování náboru', 'kapacitní plánování', 'předvídání potřeby lidí', 'sezónnost nábor', 'plán náboru', 'workforce planning'],
  intro:
    'Reaktivní nábor – tedy hledání lidí až ve chvíli, kdy chybí – bývá dražší a pomalejší než nábor plánovaný s předstihem. Plánování náboru propojuje obchodní výhled s personální potřebou: kolik lidí, na jaké pozice a kdy bude firma potřebovat. Tato stránka popisuje, jak k plánování přistoupit, jak zohlednit sezónnost a fluktuaci a proč se vyplatí počítat s rezervou a s časem na povolovací řízení u zahraničních pracovníků. Neuvádí konkrétní čísla ani benchmarky; jde o metodický rámec, který si každá firma naplní vlastními daty.',
  sections: [
    {
      heading: 'Od obchodního výhledu k personální potřebě',
      body: [
        'Plánování začíná u očekávaného objemu práce – zakázek, výroby, sezóny. Z něj se odvozuje, kolik lidí a s jakou kvalifikací bude potřeba a kdy. Vhodné je rozlišit stálou potřebu od dočasných špiček, protože každou pokrývá jiná cesta náboru.',
      ],
      bullets: [
        'Odhad objemu práce a jeho vývoje',
        'Převod na počty a profily pozic',
        'Rozlišení stálé a dočasné potřeby',
        'Rezerva na fluktuaci a výpadky',
      ],
    },
    {
      heading: 'Sezónnost, fluktuace a lhůty',
      body: [
        'Do plánu patří sezónní výkyvy, očekávaná fluktuace a čas potřebný na samotný nábor. U náboru ze zahraničí je nutné počítat i s časem na pobytová a pracovní oprávnění, který plán prodlužuje.',
        'Tato stránka neuvádí konkrétní lhůty řízení; u oprávnění je ověřte u příslušných úřadů a zahrňte do harmonogramu.',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Výsledkem je plán, který říká, kdy spustit nábor na které pozice a jakou cestou, aby lidé byli k dispozici včas. Plánování tak snižuje riziko nákladného akutního obsazování na poslední chvíli.',
        'Na plán navazuje volba kanálů a organizace výběru; u dočasných špiček zvažte agenturní zaměstnávání.',
      ],
    },
  ],
  faq: [
    { q: 'Proč plánovat nábor předem?', a: 'Akutní nábor na poslední chvíli bývá dražší a pomalejší a zvyšuje riziko ústupků v kvalitě. Plánování umožní spustit hledání včas a počítat s rezervou.' },
    { q: 'Jak zohlednit nábor ze zahraničí v plánu?', a: 'Připočtěte čas na pobytová a pracovní oprávnění, který harmonogram prodlužuje. Konkrétní lhůty ověřte u příslušných úřadů.' },
    { q: 'Jak naplánovat sezónní špičky?', a: 'Oddělte stálou potřebu od dočasné. Sezónní špičky lze pokrýt například agenturním zaměstnáváním, které nabízí flexibilitu.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.mpsv, SRC.upcr, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-pracovniku', label: 'Nábor pracovníků: přehled cest' },
    { href: '/jak-najit-pracovniky', label: 'Jak najít pracovníky pro firmu' },
    { href: '/nedostatek-pracovniku-v-cr', label: 'Nedostatek pracovníků v ČR' },
    { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER B — WORKFORCE STABILITY
// ──────────────────────────────────────────────────────────────────────────

export const FLUKTUACE_ZAMESTNANCU: SeoPage = {
  slug: 'fluktuace-zamestnancu',
  breadcrumbLabel: 'Fluktuace zaměstnanců',
  eyebrow: 'Stabilita týmu · Zaměstnavatelé',
  title: 'Fluktuace zaměstnanců: co to je a jak ji sledovat',
  heroSubtitle:
    'Co je fluktuace, jak si ji změřit ve vlastní firmě a proč ovlivňuje náklady i výkon. Praktický pohled pro zaměstnavatele bez vymyšlených benchmarků.',
  description:
    'Fluktuace zaměstnanců – co to je, jak si ji změřit ve vlastní firmě a proč ovlivňuje náklady a výkon. Praktický pohled pro zaměstnavatele bez vymyšlených benchmarků.',
  keywords: ['fluktuace zaměstnanců', 'míra fluktuace', 'měření fluktuace', 'odchody zaměstnanců', 'stabilita týmu', 'náklady fluktuace'],
  intro:
    'Fluktuace zaměstnanců vyjadřuje, jak často lidé z firmy odcházejí a jsou nahrazováni. Pro zaměstnavatele je důležitá proto, že odchody s sebou nesou náklady na nábor, zaškolení a dočasný výpadek výkonu. Tato stránka vysvětluje, co fluktuace je, jak si ji ve vlastní firmě jednoduše změřit a jak ji interpretovat – bez vymyšlených benchmarků, protože „správná“ míra se liší podle oboru a typu práce. Cílem je, aby zaměstnavatel uměl fluktuaci pojmenovat a začít ji sledovat jako podklad pro rozhodování o stabilizaci týmu.',
  sections: [
    {
      heading: 'Co fluktuace zahrnuje',
      body: [
        'Fluktuace popisuje pohyb zaměstnanců ven z firmy a jejich nahrazování. Rozlišuje se odchod z vůle zaměstnance a z vůle zaměstnavatele; pro řízení stability bývá zajímavější dobrovolná fluktuace, kterou lze ovlivnit pracovními podmínkami.',
      ],
    },
    {
      heading: 'Jak si fluktuaci změřit',
      body: [
        'Základní ukazatel poměřuje počet odchodů za období vůči průměrnému počtu zaměstnanců. Smysl dává sledovat trend v čase a rozdíly mezi týmy nebo pozicemi, spíše než porovnávání s cizími čísly. Tato stránka záměrně neuvádí „obvyklé“ hodnoty – liší se podle oboru.',
      ],
      bullets: [
        'Sledujte vlastní trend v čase, ne cizí benchmarky',
        'Rozlišujte dobrovolné a nedobrovolné odchody',
        'Všímejte si rozdílů mezi týmy a pozicemi',
        'Sledujte odchody v prvních měsících po nástupu',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Jakmile fluktuaci měříte, můžete rozpoznat, kde je nejvyšší a zda roste. To je vstup pro cílená opatření – ať už v náboru, onboardingu, nebo pracovních podmínkách. Bez měření se problém těžko řídí.',
        'Na sledování navazují stránky o příčinách fluktuace, jejím snižování a retenci.',
      ],
    },
  ],
  faq: [
    { q: 'Jaká míra fluktuace je „normální“?', a: 'Univerzální hodnota neexistuje a liší se podle oboru a typu práce. Tato stránka cizí benchmarky neuvádí; smysluplnější je sledovat vlastní trend v čase.' },
    { q: 'Jak fluktuaci jednoduše změřit?', a: 'Poměřte počet odchodů za období vůči průměrnému počtu zaměstnanců a sledujte vývoj v čase a rozdíly mezi týmy a pozicemi.' },
    { q: 'Proč je fluktuace pro firmu drahá?', a: 'Odchody přinášejí náklady na nový nábor, zaškolení a dočasný výpadek výkonu. Tématu nepřímých nákladů se věnuje samostatná stránka.' },
  ],
  sources: [SRC.zakonikPrace, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/priciny-fluktuace-zamestnancu', label: 'Příčiny fluktuace zaměstnanců' },
    { href: '/jak-snizit-fluktuaci', label: 'Jak snížit fluktuaci' },
    { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    { href: '/neprime-naklady-na-zamestnance', label: 'Nepřímé náklady na zaměstnance' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRICINY_FLUKTUACE_ZAMESTNANCU: SeoPage = {
  slug: 'priciny-fluktuace-zamestnancu',
  breadcrumbLabel: 'Příčiny fluktuace',
  eyebrow: 'Stabilita týmu · Zaměstnavatelé',
  title: 'Příčiny fluktuace zaměstnanců',
  heroSubtitle:
    'Jaké jsou nejčastější příčiny odchodů a které z nich může zaměstnavatel ovlivnit. Diagnostický přehled jako podklad pro cílená opatření.',
  description:
    'Příčiny fluktuace zaměstnanců – nejčastější důvody odchodů (podmínky, vedení, onboarding, kariéra) a které z nich zaměstnavatel ovlivní. Diagnostický přehled pro cílená opatření.',
  keywords: ['příčiny fluktuace', 'důvody odchodů zaměstnanců', 'proč zaměstnanci odcházejí', 'fluktuace příčiny', 'stabilita týmu', 'retence'],
  intro:
    'Snižovat fluktuaci má smysl až tehdy, když víte, proč lidé odcházejí. Příčiny se přitom liší firma od firmy a často se kombinují – jiné důvody vedou k odchodu v prvních týdnech a jiné po letech. Tato stránka nabízí diagnostický přehled nejčastějších příčin fluktuace a rozlišuje ty, které zaměstnavatel může ovlivnit, od těch mimo jeho dosah. Slouží jako podklad pro cílená opatření, ne jako seznam univerzálních pravd. Neuvádí žádné statistiky ani podíly důvodů – ty by se bez vlastního zjišťování jen odhadovaly.',
  sections: [
    {
      heading: 'Příčiny, které zaměstnavatel ovlivní',
      body: [
        'Mezi ovlivnitelné příčiny patří pracovní podmínky a odměňování, kvalita vedení a komunikace, nezvládnutý onboarding, nejasné očekávání, chybějící perspektiva růstu nebo nadměrná zátěž. Právě tyto oblasti bývají vděčným místem pro zlepšení.',
      ],
      bullets: [
        'Pracovní podmínky a odměňování',
        'Vedení, komunikace a zpětná vazba',
        'Nezvládnutý onboarding a adaptace',
        'Chybějící perspektiva a rozvoj',
        'Nadměrná nebo nerovnoměrná zátěž',
      ],
    },
    {
      heading: 'Příčiny mimo dosah firmy',
      body: [
        'Část odchodů souvisí s životní situací zaměstnance, stěhováním nebo změnou oboru – ty zaměstnavatel přímo neovlivní. I tak je užitečné je odlišit, aby se opatření soustředila tam, kde mají efekt.',
      ],
    },
    {
      heading: 'Jak příčiny zjistit a co s nimi',
      body: [
        'Konkrétní příčiny ve vlastní firmě pomáhají odhalit výstupní rozhovory, krátké dotazníky a sledování, kdy k odchodům dochází (například v prvních měsících). Z toho plyne rozhodnutí, na které oblasti zacílit – ať už onboarding, vedení, nebo podmínky.',
        'Na diagnostiku navazují stránky o snižování fluktuace a o retenci.',
      ],
    },
  ],
  faq: [
    { q: 'Které příčiny fluktuace lze ovlivnit?', a: 'Zejména pracovní podmínky a odměňování, vedení a komunikaci, onboarding, jasnost očekávání a perspektivu růstu. Část příčin (životní situace) je mimo dosah firmy.' },
    { q: 'Jak zjistit, proč u nás lidé odcházejí?', a: 'Pomáhají výstupní rozhovory, krátké dotazníky a sledování, kdy k odchodům dochází. Tato stránka neuvádí cizí statistiky; smysl dává vlastní zjišťování.' },
    { q: 'Kdy lidé odcházejí nejčastěji?', a: 'Riziková bývají první období po nástupu, kdy se projeví nezvládnutý onboarding. Sledování načasování odchodů pomáhá zacílit opatření.' },
  ],
  sources: [SRC.zakonikPrace, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/fluktuace-zamestnancu', label: 'Fluktuace zaměstnanců: co to je' },
    { href: '/jak-snizit-fluktuaci', label: 'Jak snížit fluktuaci' },
    { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    { href: '/onboarding-zamestnancu', label: 'Onboarding zaměstnanců' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const JAK_SNIZIT_FLUKTUACI: SeoPage = {
  slug: 'jak-snizit-fluktuaci',
  breadcrumbLabel: 'Jak snížit fluktuaci',
  eyebrow: 'Stabilita týmu · Zaměstnavatelé',
  title: 'Jak snížit fluktuaci zaměstnanců',
  heroSubtitle:
    'Konkrétní oblasti, kde lze snižovat odchody – nábor, onboarding, vedení a podmínky – a jak postupovat od měření k opatřením. Praktický pohled pro zaměstnavatele.',
  description:
    'Jak snížit fluktuaci zaměstnanců – konkrétní oblasti (nábor, onboarding, vedení, podmínky) a postup od měření k opatřením. Praktický pohled pro zaměstnavatele bez prázdných slibů.',
  keywords: ['jak snížit fluktuaci', 'snižování fluktuace', 'stabilizace týmu', 'opatření proti fluktuaci', 'retence', 'odchody zaměstnanců'],
  intro:
    'Snižování fluktuace není jednorázový krok, ale propojení několika oblastí, které ovlivňují, zda lidé zůstávají. Účinné bývá začít měřením a diagnostikou a teprve poté nasadit opatření tam, kde odchody skutečně vznikají. Tato stránka shrnuje konkrétní oblasti, ve kterých lze fluktuaci ovlivnit, a navrhuje postup od měření k akci. Nepřináší zaručené recepty ani čísla úspory – ta by byla bez vlastních dat smyšlená. Cílem je dát zaměstnavateli použitelný směr, jak na stabilitu týmu systematicky pracovat.',
  sections: [
    {
      heading: 'Postup: od měření k opatřením',
      body: [
        'Smysluplný postup vede od měření fluktuace přes zjištění příčin až k cíleným opatřením a jejich vyhodnocení. Bez tohoto pořadí hrozí, že se energie vloží do oblasti, která za odchody nestojí.',
      ],
      bullets: [
        'Změřit fluktuaci a její vývoj',
        'Zjistit příčiny (rozhovory, dotazníky)',
        'Nasadit opatření v rizikových oblastech',
        'Vyhodnotit dopad a upravit',
      ],
    },
    {
      heading: 'Oblasti, kde lze fluktuaci ovlivnit',
      body: [
        'Mezi nejčastější páky patří kvalitní nábor (správné očekávání už při výběru), zvládnutý onboarding, vedení a zpětná vazba, spravedlivé a srozumitelné podmínky a perspektiva rozvoje. U dělnických profesí hrají roli i praktické věci jako organizace směn nebo zázemí.',
        'Konkrétní mix opatření závisí na zjištěných příčinách – proto je diagnostika nezbytná.',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Výsledkem je výběr několika konkrétních opatření zacílených na vaše hlavní příčiny odchodů, s jasným způsobem, jak změřit, zda fungují. Tím se ze snižování fluktuace stává řiditelný proces, ne náhoda.',
        'Na snižování fluktuace navazuje širší téma retence, tedy systematického udržení lidí.',
      ],
    },
  ],
  faq: [
    { q: 'Jak začít se snižováním fluktuace?', a: 'Nejprve měřením a zjištěním příčin, teprve poté nasazením opatření v rizikových oblastech. Opatření bez diagnostiky míří naslepo.' },
    { q: 'Jaká opatření fungují?', a: 'Záleží na zjištěných příčinách. Časté páky jsou kvalitní nábor, zvládnutý onboarding, vedení, srozumitelné podmínky a perspektiva rozvoje. Tato stránka neslibuje konkrétní úsporu.' },
    { q: 'Jak poznám, že opatření zabírají?', a: 'Sledováním vývoje fluktuace v čase a v rizikových týmech. Vyhodnocení je součástí postupu, aby šlo opatření upravit.' },
  ],
  sources: [SRC.zakonikPrace, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/fluktuace-zamestnancu', label: 'Fluktuace zaměstnanců: co to je' },
    { href: '/priciny-fluktuace-zamestnancu', label: 'Příčiny fluktuace' },
    { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    { href: '/onboarding-zamestnancu', label: 'Onboarding zaměstnanců' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const RETENCE_ZAMESTNANCU: SeoPage = {
  slug: 'retence-zamestnancu',
  breadcrumbLabel: 'Retence zaměstnanců',
  eyebrow: 'Stabilita týmu · Zaměstnavatelé',
  title: 'Retence zaměstnanců: jak udržet lidi ve firmě',
  heroSubtitle:
    'Jak k udržení lidí přistoupit systematicky – co je retence, čím se liší od pouhého snižování fluktuace a kde hledat páky. Praktický pohled pro zaměstnavatele.',
  description:
    'Retence zaměstnanců – jak systematicky udržet lidi ve firmě, čím se liší od snižování fluktuace a kde hledat páky (onboarding, rozvoj, vedení). Praktický pohled pro zaměstnavatele.',
  keywords: ['retence zaměstnanců', 'udržení zaměstnanců', 'stabilizace týmu', 'employee retention', 'loajalita zaměstnanců', 'stabilita týmu'],
  intro:
    'Retence znamená systematické udržení zaměstnanců – nejde jen o to zabránit odchodům, ale aktivně vytvářet důvody, proč lidé zůstávají a podávají dobrý výkon. Oproti pouhému „hašení“ fluktuace je retence dlouhodobější a propojuje nábor, onboarding, rozvoj a kulturu. Tato stránka vysvětluje, co retence obnáší, čím se liší od reaktivního snižování fluktuace a kde hledat hlavní páky. Nepracuje s vymyšlenými čísly návratnosti; nabízí rámec, jak k udržení lidí přistupovat jako k průběžné činnosti, která se vyplatí zejména u nedostatkových profesí.',
  sections: [
    {
      heading: 'Retence vs. snižování fluktuace',
      body: [
        'Snižování fluktuace je často reakce na zvýšené odchody. Retence je proaktivní – počítá s udržením lidí už od náboru a onboardingu a věnuje se i spokojeným zaměstnancům, aby důvody k odchodu nevznikaly. Obě se doplňují.',
      ],
    },
    {
      heading: 'Hlavní páky retence',
      body: [
        'Mezi páky retence patří kvalitní nástup a adaptace, srozumitelné a spravedlivé podmínky, vedení a zpětná vazba, možnost rozvoje a uznání. U dělnických a směnných provozů hrají roli také stabilita rozvrhů a praktické zázemí.',
        'Účinnost konkrétních opatření je vhodné ověřovat na vlastních datech, nikoli přebírat cizí čísla.',
      ],
      bullets: [
        'Kvalitní onboarding a adaptace',
        'Srozumitelné a spravedlivé podmínky',
        'Vedení, zpětná vazba a uznání',
        'Možnost rozvoje a perspektiva',
        'Stabilita směn a praktické zázemí',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po promyšlení retence byste měli umět určit, do kterých fází životního cyklu zaměstnance investovat (nábor, onboarding, rozvoj) a jak udržení sledovat. Retence se tím stává součástí běžného řízení, ne jen krizovým opatřením.',
        'Retence úzce souvisí s fluktuací a onboardingem, kterým se věnují propojené stránky.',
      ],
    },
  ],
  faq: [
    { q: 'Jaký je rozdíl mezi retencí a snižováním fluktuace?', a: 'Snižování fluktuace je obvykle reakce na zvýšené odchody, retence je proaktivní a počítá s udržením lidí už od náboru a onboardingu. Obě se doplňují.' },
    { q: 'Kde začít s retencí?', a: 'U fází s největším dopadem – kvalitní nábor a onboarding, srozumitelné podmínky a vedení. Účinnost ověřujte na vlastních datech.' },
    { q: 'Vyplatí se retence i u dělnických profesí?', a: 'Ano, zejména u nedostatkových profesí, kde je nový nábor nákladný. Roli hraje i stabilita směn a praktické zázemí.' },
  ],
  sources: [SRC.zakonikPrace, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/fluktuace-zamestnancu', label: 'Fluktuace zaměstnanců' },
    { href: '/jak-snizit-fluktuaci', label: 'Jak snížit fluktuaci' },
    { href: '/onboarding-zamestnancu', label: 'Onboarding zaměstnanců' },
    { href: '/adaptace-zamestnancu', label: 'Adaptace zaměstnanců' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER C — ONBOARDING
// ──────────────────────────────────────────────────────────────────────────

export const ONBOARDING_ZAMESTNANCU: SeoPage = {
  slug: 'onboarding-zamestnancu',
  breadcrumbLabel: 'Onboarding zaměstnanců',
  eyebrow: 'Onboarding · Zaměstnavatelé',
  title: 'Onboarding zaměstnanců: jak zvládnout nástup',
  heroSubtitle:
    'Co dobrý onboarding obsahuje, proč ovlivňuje setrvání nového člověka a jak ho zorganizovat od podpisu smlouvy po první týdny. Praktický pohled pro zaměstnavatele.',
  description:
    'Onboarding zaměstnanců – co dobrý nástup obsahuje, proč ovlivňuje setrvání a jak ho zorganizovat od podpisu smlouvy po první týdny. Praktický pohled pro zaměstnavatele.',
  keywords: ['onboarding zaměstnanců', 'nástup zaměstnance', 'zapracování', 'první den v práci', 'adaptace', 'onboarding proces'],
  intro:
    'Onboarding je proces uvedení nového zaměstnance do firmy – od formalit při nástupu přes seznámení s prací až po první týdny, kdy se rozhoduje, zda u vás člověk zůstane. Dobře zvládnutý nástup zkracuje dobu, než je nový pracovník produktivní, a snižuje riziko brzkého odchodu. Tato stránka popisuje, co onboarding obvykle obsahuje a jak ho zorganizovat, s důrazem na praktickou stránku i na povinnosti při nástupu. Nejde o právní poradenství; u konkrétních povinností, jako je vstupní školení BOZP, odkazuje na předpisy a oficiální zdroje.',
  sections: [
    {
      heading: 'Co onboarding obsahuje',
      body: [
        'Onboarding spojuje administrativní část (smlouva, přihlášení k pojištění, vstupní školení BOZP) s praktickou (seznámení s pracovištěm, nástroji, týmem a očekáváním). Obě části je vhodné připravit předem, aby první den proběhl hladce.',
      ],
      bullets: [
        'Smlouva a nástupní administrativa',
        'Přihlášení k pojištění a evidence',
        'Vstupní školení BOZP',
        'Seznámení s pracovištěm a týmem',
        'Jasná očekávání a první úkoly',
      ],
    },
    {
      heading: 'Proč na onboardingu záleží',
      body: [
        'První dny a týdny silně ovlivňují, zda nový člověk zůstane. Nezvládnutý nástup – chaos, chybějící informace, nejasná očekávání – patří mezi časté příčiny brzkých odchodů. Naopak připravený onboarding urychluje zapracování.',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po promyšlení onboardingu byste měli mít připravený sled kroků pro nástup a jasné, kdo za co odpovídá – tak, aby žádná část (administrativa ani zaškolení) nechyběla. To snižuje riziko brzkého odchodu a urychluje produktivitu.',
        'Pro praktické vedení nástupu slouží checklist pro nové zaměstnance; na onboarding navazuje delší adaptace.',
      ],
    },
  ],
  faq: [
    { q: 'Co má onboarding obsahovat?', a: 'Administrativní část (smlouva, přihlášení k pojištění, vstupní školení BOZP) a praktickou (seznámení s pracovištěm, nástroji, týmem a očekáváním). Obě je vhodné připravit předem.' },
    { q: 'Proč onboarding ovlivňuje fluktuaci?', a: 'První dny a týdny rozhodují, zda člověk zůstane. Nezvládnutý nástup patří mezi časté příčiny brzkých odchodů, zatímco připravený onboarding urychluje zapracování.' },
    { q: 'Je vstupní školení BOZP povinné?', a: 'Bezpečnost a ochrana zdraví při práci patří mezi povinnosti zaměstnavatele. Konkrétní rozsah ověřte podle předpisů; jde o standardní součást nástupu.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonBozp, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/adaptace-zamestnancu', label: 'Adaptace zaměstnanců' },
    { href: '/checklist-pro-nove-zamestnance', label: 'Checklist pro nové zaměstnance' },
    { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    { href: '/nabor-zamestnancu', label: 'Nábor zaměstnanců: organizace procesu' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const ADAPTACE_ZAMESTNANCU: SeoPage = {
  slug: 'adaptace-zamestnancu',
  breadcrumbLabel: 'Adaptace zaměstnanců',
  eyebrow: 'Onboarding · Zaměstnavatelé',
  title: 'Adaptace zaměstnanců: prvních pár měsíců',
  heroSubtitle:
    'Co se děje po nástupu – jak vést adaptaci v prvních týdnech a měsících, kdy je riziko odchodu nejvyšší. Praktický pohled na zapracování pro zaměstnavatele.',
  description:
    'Adaptace zaměstnanců – jak vést prvních pár měsíců po nástupu, kdy je riziko odchodu nejvyšší: cíle, zpětná vazba a opora. Praktický pohled na zapracování pro zaměstnavatele.',
  keywords: ['adaptace zaměstnanců', 'zapracování', 'adaptační období', 'zkušební doba', 'mentor buddy', 'adaptace nováčka'],
  intro:
    'Adaptace navazuje na onboarding a pokrývá delší období – první týdny až měsíce, během nichž se z nového člověka stává plnohodnotný člen týmu. Právě v tomto období bývá riziko odchodu nejvyšší, protože se potkává realita práce s očekáváním. Tato stránka popisuje, jak adaptaci vést tak, aby měl nováček jasné cíle, oporu a zpětnou vazbu. Odlišuje adaptaci od jednorázového nástupu a propojuje ji s retencí. Neuvádí žádné benchmarky délky ani úspěšnosti adaptace; jde o praktický rámec, který si firma přizpůsobí typu práce.',
  sections: [
    {
      heading: 'Co adaptace zahrnuje',
      body: [
        'Adaptace zahrnuje postupné zaučování, jasné cíle pro první období, pravidelnou zpětnou vazbu a oporu v podobě kolegy nebo nadřízeného. Cílem je, aby nováček rozuměl tomu, co se od něj čeká, a měl se na koho obrátit.',
      ],
      bullets: [
        'Postupné zaučování a jasné cíle',
        'Pravidelná zpětná vazba',
        'Opora (mentor, buddy, nadřízený)',
        'Kontrolní body v průběhu zkušební doby',
      ],
    },
    {
      heading: 'Proč je adaptace kritická',
      body: [
        'V prvních měsících se rozhoduje, zda člověk u firmy zůstane. Nejasná očekávání, chybějící zpětná vazba nebo pocit, že je na vše sám, vedou k odchodům, které předchozí nábor znehodnotí. Vedená adaptace toto riziko snižuje.',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po promyšlení adaptace byste měli mít nastavený plán prvních týdnů a měsíců včetně kontrolních bodů a role opory. To zvyšuje šanci, že nový člověk překlene rizikové období a zůstane.',
        'Adaptace je spojnicí mezi onboardingem a retencí; navazují na ni propojené stránky.',
      ],
    },
  ],
  faq: [
    { q: 'Jaký je rozdíl mezi onboardingem a adaptací?', a: 'Onboarding je samotný nástup a první dny, adaptace pokrývá delší období zapracování (týdny až měsíce). Obojí na sebe navazuje.' },
    { q: 'Proč je adaptační období rizikové?', a: 'Potkává se realita práce s očekáváním. Nejasná očekávání a chybějící opora vedou k odchodům, které znehodnotí předchozí nábor.' },
    { q: 'Jak adaptaci vést?', a: 'Postupným zaučováním, jasnými cíli, pravidelnou zpětnou vazbou a oporou (mentor nebo nadřízený), s kontrolními body v průběhu zkušební doby.' },
  ],
  sources: [SRC.zakonikPrace, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/onboarding-zamestnancu', label: 'Onboarding zaměstnanců' },
    { href: '/checklist-pro-nove-zamestnance', label: 'Checklist pro nové zaměstnance' },
    { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    { href: '/priciny-fluktuace-zamestnancu', label: 'Příčiny fluktuace' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const CHECKLIST_PRO_NOVE_ZAMESTNANCE: SeoPage = {
  slug: 'checklist-pro-nove-zamestnance',
  breadcrumbLabel: 'Checklist pro nové zaměstnance',
  eyebrow: 'Onboarding · Zaměstnavatelé',
  title: 'Checklist pro nové zaměstnance',
  heroSubtitle:
    'Praktický kontrolní seznam kroků při nástupu – před prvním dnem, první den a první týdny. Pomůcka pro zaměstnavatele, aby na nic nezapomněli.',
  description:
    'Checklist pro nové zaměstnance – kontrolní seznam kroků při nástupu: před prvním dnem, první den a první týdny. Praktická pomůcka pro zaměstnavatele, aby na nic nezapomněli.',
  keywords: ['checklist nový zaměstnanec', 'onboarding checklist', 'nástup zaměstnance seznam', 'kontrolní seznam nástup', 'první den', 'zapracování'],
  intro:
    'Kontrolní seznam je nejjednodušší způsob, jak zajistit, že při nástupu nového člověka na nic nezapomenete – od administrativy přes vybavení po seznámení s týmem. Tato stránka nabízí praktický rámec checklistu rozdělený podle času: co připravit před prvním dnem, co zvládnout první den a co v prvních týdnech. Je to orientační pomůcka, kterou si firma upraví podle své situace a typu práce; závazné povinnosti (například vstupní školení BOZP) vždy vycházejí z předpisů. Cílem je, aby nástup proběhl hladce a nový člověk se rychle zorientoval.',
  sections: [
    {
      heading: 'Před prvním dnem',
      body: [
        'Část kroků je vhodné vyřídit ještě před nástupem, aby první den nebyl o čekání. Patří sem příprava smlouvy a dokumentů, vybavení a přístupů a informování týmu o příchodu nového kolegy.',
      ],
      bullets: [
        'Připravená smlouva a nástupní dokumenty',
        'Pracovní místo, vybavení a přístupy',
        'Plán prvního dne a určená opora',
        'Informovaný tým',
      ],
    },
    {
      heading: 'První den a první týdny',
      body: [
        'První den obvykle zahrnuje administrativu, vstupní školení BOZP, seznámení s pracovištěm a týmem a první úkoly. V prvních týdnech navazuje postupné zaučování, zpětná vazba a kontrolní body.',
      ],
      bullets: [
        'Nástupní administrativa a přihlášení k pojištění',
        'Vstupní školení BOZP',
        'Seznámení s pracovištěm, nástroji a týmem',
        'Jasné první úkoly a očekávání',
        'Zpětná vazba a kontrolní body v dalších týdnech',
      ],
    },
    {
      heading: 'Jak checklist používat',
      body: [
        'Checklist slouží jako základ, který si přizpůsobíte své firmě a pozici – jiný bude u kancelářské role a jiný u směnného provozu. Pomáhá určit, kdo za jednotlivé kroky odpovídá, aby žádný nezůstal opomenutý.',
        'Checklist je praktickou součástí onboardingu a adaptace, kterým se věnují navazující stránky.',
      ],
    },
  ],
  faq: [
    { q: 'Co připravit před prvním dnem?', a: 'Smlouvu a dokumenty, pracovní místo, vybavení a přístupy, plán prvního dne s určenou oporou a informovat tým. Předpřipravené kroky zrychlí nástup.' },
    { q: 'Co patří do prvního dne?', a: 'Nástupní administrativa a přihlášení k pojištění, vstupní školení BOZP, seznámení s pracovištěm a týmem a jasné první úkoly a očekávání.' },
    { q: 'Je checklist univerzální?', a: 'Slouží jako základ, který si firma upraví podle pozice a provozu. Závazné povinnosti, jako školení BOZP, vždy vycházejí z předpisů.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonBozp, SRC.cssz],
  internalLinks: [
    employerHubLink,
    { href: '/onboarding-zamestnancu', label: 'Onboarding zaměstnanců' },
    { href: '/adaptace-zamestnancu', label: 'Adaptace zaměstnanců' },
    { href: '/povinnosti-zamestnavatele', label: 'Povinnosti zaměstnavatele' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER D — LABOR SHORTAGE (by sector)
// ──────────────────────────────────────────────────────────────────────────

export const NEDOSTATEK_PRACOVNIKU_VE_VYROBE: SeoPage = {
  slug: 'nedostatek-pracovniku-ve-vyrobe',
  breadcrumbLabel: 'Nedostatek pracovníků ve výrobě',
  eyebrow: 'Nedostatek pracovníků · Obory',
  title: 'Nedostatek pracovníků ve výrobě',
  heroSubtitle:
    'Proč výroba naráží na nedostatek lidí a jaké cesty mají zaměstnavatelé k dispozici – směny, agenturní kapacita, nábor ze zahraničí a retence. Praktický pohled.',
  description:
    'Nedostatek pracovníků ve výrobě – proč vzniká a jaké cesty mají zaměstnavatelé: směnové modely, agenturní kapacita, nábor ze zahraničí a retence. Praktický pohled, bez vymyšlených čísel.',
  keywords: ['nedostatek pracovníků ve výrobě', 'výroba nábor', 'operátoři výroby', 'směnný provoz', 'agenturní zaměstnávání výroba', 'zahraniční pracovníci výroba'],
  intro:
    'Výroba patří mezi obory, které dlouhodobě citelně pociťují nedostatek pracovníků, zejména u operátorských a dělnických pozic ve směnném provozu. Tato stránka se nezabývá tím, jak velký nedostatek je v číslech – ta nevymýšlíme a aktuální údaje patří do statistik trhu práce – ale tím, jaké praktické cesty mají výrobní firmy k obsazení a udržení lidí. Soustředí se na rozhodnutí, která může provozní nebo HR manažer udělat: jak kombinovat směnové modely, agenturní kapacitu, nábor ze zahraničí a opatření pro stabilizaci týmu.',
  sections: [
    {
      heading: 'Proč výroba naráží na nedostatek',
      body: [
        'Výrobní pozice často znamenají směnný provoz, fyzickou práci a sezónní výkyvy objednávek, což zužuje okruh dostupných kandidátů. Konkurence o stejné profese mezi firmami v regionu situaci zostřuje. Aktuální rozsah nedostatku ověřte ve statistikách trhu práce.',
      ],
    },
    {
      heading: 'Cesty, které mají výrobní firmy',
      body: [
        'Pro pokrytí potřeby se nabízí kombinace více cest. Agenturní zaměstnávání pomáhá pružně reagovat na výkyvy objednávek; nábor ze zahraničí rozšiřuje okruh kandidátů u nedostatkových profesí; a opatření v retenci a organizaci směn snižují tlak tím, že udrží stávající lidi.',
      ],
      bullets: [
        'Agenturní kapacita pro výkyvy objednávek',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Stabilní rozvrhy směn a praktické zázemí',
        'Retence a kvalitní onboarding',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po zvážení možností byste měli umět určit mix cest pro vaši výrobu – například stálé jádro doplněné agenturní kapacitou na špičky a cílený nábor ze zahraničí u kritických profesí, podpořený retencí. U zahraničních pracovníků počítejte s administrativou oprávnění.',
        'Navazují stránky o náboru, agenturním zaměstnávání a o zaměstnávání cizinců.',
      ],
    },
  ],
  faq: [
    { q: 'Jak rychle pokrýt výpadek lidí ve výrobě?', a: 'Pružnou cestou bývá agenturní zaměstnávání, které umožní reagovat na výkyvy objednávek. U nedostatkových profesí pomáhá i nábor ze zahraničí, byť s delší přípravou kvůli oprávněním.' },
    { q: 'Pomůže nábor ze zahraničí?', a: 'U profesí, kde na tuzemském trhu chybí lidé, rozšiřuje okruh kandidátů. Je třeba počítat s administrativou pobytových a pracovních oprávnění; podrobnosti popisují stránky o zaměstnávání cizinců.' },
    { q: 'Jaká čísla nedostatku uvádíte?', a: 'Žádná nevymýšlíme. Aktuální rozsah nedostatku a volných míst patří do statistik trhu práce (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme.' },
  ],
  sources: [SRC.czso, SRC.mpsv, SRC.upcr, SRC.zakonOZamestnanosti],
  internalLinks: [
    employerHubLink,
    { href: '/nedostatek-pracovniku-v-cr', label: 'Nedostatek pracovníků v ČR' },
    { href: '/nedostatek-pracovniku-v-logistice', label: 'Nedostatek pracovníků v logistice' },
    naborCizincuLink,
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NEDOSTATEK_PRACOVNIKU_V_LOGISTICE: SeoPage = {
  slug: 'nedostatek-pracovniku-v-logistice',
  breadcrumbLabel: 'Nedostatek pracovníků v logistice',
  eyebrow: 'Nedostatek pracovníků · Obory',
  title: 'Nedostatek pracovníků v logistice',
  heroSubtitle:
    'Proč logistika naráží na nedostatek lidí, jak se projevují sezónní špičky a jaké cesty mají zaměstnavatelé k obsazení pozic. Praktický pohled bez vymyšlených čísel.',
  description:
    'Nedostatek pracovníků v logistice – role sezónních špiček a e-commerce a jaké cesty mají zaměstnavatelé: agenturní kapacita, nábor ze zahraničí a retence. Praktický pohled.',
  keywords: ['nedostatek pracovníků v logistice', 'logistika nábor', 'sezónní špičky', 'e-commerce logistika', 'agenturní zaměstnávání logistika', 'řidiči skladníci'],
  intro:
    'Logistika je oborem s výraznou sezónností a citlivostí na výkyvy poptávky – objem práce roste v období špiček a klesá mimo ně. To z náboru a plánování kapacity dělá klíčové téma. Tato stránka popisuje, proč logistika naráží na nedostatek lidí a jaké praktické cesty mají zaměstnavatelé k obsazení pozic, od manipulačních a skladových rolí po další provozní profese. Konkrétní čísla nedostatku nevymýšlíme; patří do statistik trhu práce. Soustředíme se na rozhodnutí, jak pokrýt sezónní špičky i stálou potřebu.',
  sections: [
    {
      heading: 'Čím je logistika specifická',
      body: [
        'Pro logistiku jsou typické sezónní špičky (například v období zvýšeného objemu objednávek), tlak na rychlost a směnný provoz. Poptávka po lidech tak silně kolísá v čase, což ztěžuje plánování stálého stavu.',
        'Aktuální rozsah nedostatku a volných míst patří do statistik trhu práce, na které odkazujeme.',
      ],
    },
    {
      heading: 'Cesty, které mají logistické firmy',
      body: [
        'Kolísavou potřebu dobře pokrývá agenturní zaměstnávání, které umožní navýšit kapacitu na špičky a snížit ji mimo ně. U stálého jádra pomáhá retence a kvalitní onboarding, u nedostatkových profesí nábor ze zahraničí.',
      ],
      bullets: [
        'Agenturní kapacita na sezónní špičky',
        'Stálé jádro stabilizované retencí',
        'Nábor ze zahraničí u nedostatkových profesí',
        'Plánování náboru s předstihem před špičkou',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po zvážení možností byste měli umět nastavit poměr stálého stavu a flexibilní agenturní kapacity a naplánovat nábor před sezónními špičkami. Tím snížíte riziko, že špičku nezvládnete obsadit, nebo naopak ponesete náklady mimo sezónu.',
        'Navazují stránky o plánování náboru, agenturním zaměstnávání a o zaměstnávání cizinců.',
      ],
    },
  ],
  faq: [
    { q: 'Jak zvládnout sezónní špičky v logistice?', a: 'Osvědčuje se kombinace stálého jádra a flexibilní agenturní kapacity, kterou lze navýšit na špičku a snížit mimo ni, spolu s plánováním náboru s předstihem.' },
    { q: 'Vyplatí se nábor ze zahraničí?', a: 'U nedostatkových profesí rozšiřuje okruh kandidátů. Počítejte s administrativou oprávnění; podrobnosti popisují stránky o zaměstnávání cizinců.' },
    { q: 'Jaká čísla nedostatku uvádíte?', a: 'Žádná nevymýšlíme. Aktuální údaje o nedostatku a volných místech patří do statistik trhu práce (ČSÚ, MPSV, Úřad práce ČR).' },
  ],
  sources: [SRC.czso, SRC.mpsv, SRC.upcr, SRC.zakonOZamestnanosti],
  internalLinks: [
    employerHubLink,
    { href: '/nedostatek-pracovniku-v-cr', label: 'Nedostatek pracovníků v ČR' },
    { href: '/nedostatek-pracovniku-ve-skladech', label: 'Nedostatek pracovníků ve skladech' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
    { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NEDOSTATEK_PRACOVNIKU_VE_SKLADECH: SeoPage = {
  slug: 'nedostatek-pracovniku-ve-skladech',
  breadcrumbLabel: 'Nedostatek pracovníků ve skladech',
  eyebrow: 'Nedostatek pracovníků · Obory',
  title: 'Nedostatek pracovníků ve skladech',
  heroSubtitle:
    'Proč sklady a fulfillment naráží na nedostatek lidí, jak řešit nárazové objemy a jak udržet skladníky. Praktický pohled pro zaměstnavatele bez vymyšlených čísel.',
  description:
    'Nedostatek pracovníků ve skladech – nárazové objemy ve fulfillmentu a jaké cesty mají zaměstnavatelé: agenturní kapacita, retence skladníků a nábor ze zahraničí. Praktický pohled.',
  keywords: ['nedostatek pracovníků ve skladech', 'skladníci nábor', 'fulfillment', 'naskladňování', 'agenturní zaměstnávání sklad', 'brigádníci sklad'],
  intro:
    'Sklady a fulfillment centra patří mezi provozy s nárazovými objemy práce a vysokým podílem manuálních pozic, u kterých bývá obtížné zajistit dostatek lidí ve správný čas. Tato stránka se věnuje tomu, proč skladové provozy naráží na nedostatek pracovníků a jaké praktické cesty mají zaměstnavatelé k jejich obsazení a udržení. Konkrétní statistiky nedostatku nevymýšlíme; patří do oficiálních přehledů trhu práce. Důraz je na rozhodnutích, která pomohou pokrýt nárazové objemy a zároveň udržet stálé skladníky, u nichž je opakovaný nábor nákladný.',
  sections: [
    {
      heading: 'Čím jsou skladové provozy specifické',
      body: [
        'Skladové pozice (naskladňování, vychystávání, balení) jsou často manuální, závislé na objemu objednávek a provozované na směny. Objem práce kolísá nárazově, takže potřeba lidí je v čase nerovnoměrná.',
        'Aktuální rozsah nedostatku patří do statistik trhu práce, na které odkazujeme.',
      ],
    },
    {
      heading: 'Cesty, které mají skladové firmy',
      body: [
        'Nárazové objemy dobře pokrývá agenturní zaměstnávání a flexibilní formy práce, zatímco stálé jádro skladníků je vhodné stabilizovat retencí a dobrým onboardingem. U nedostatkových profesí lze rozšířit hledání o nábor ze zahraničí.',
      ],
      bullets: [
        'Flexibilní a agenturní kapacita na objemové špičky',
        'Stálé jádro skladníků stabilizované retencí',
        'Kvalitní onboarding pro rychlé zaučení',
        'Nábor ze zahraničí u nedostatkových profesí',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po zvážení možností byste měli umět rozdělit potřebu na stálou a nárazovou a ke každé přiřadit vhodnou cestu – stálé jádro stabilizovat, špičky řešit flexibilní kapacitou. Tím snížíte riziko nezvládnutých objemů i zbytečných nákladů mimo špičku.',
        'Navazují stránky o náboru, agenturním zaměstnávání a o zaměstnávání cizinců.',
      ],
    },
  ],
  faq: [
    { q: 'Jak pokrýt nárazové objemy ve skladu?', a: 'Flexibilní a agenturní kapacitou, kterou lze navýšit na špičku, doplněnou stálým jádrem skladníků stabilizovaným retencí a rychlým onboardingem.' },
    { q: 'Jak udržet stálé skladníky?', a: 'Kvalitním onboardingem, srozumitelnými podmínkami, stabilitou směn a praktickým zázemím. Opakovaný nábor je nákladný, proto se retence vyplatí.' },
    { q: 'Uvádíte čísla nedostatku skladníků?', a: 'Ne. Aktuální údaje patří do statistik trhu práce (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme; nevymýšlíme je.' },
  ],
  sources: [SRC.czso, SRC.mpsv, SRC.upcr, SRC.zakonOZamestnanosti],
  internalLinks: [
    employerHubLink,
    { href: '/nedostatek-pracovniku-v-logistice', label: 'Nedostatek pracovníků v logistice' },
    { href: '/nedostatek-pracovniku-v-cr', label: 'Nedostatek pracovníků v ČR' },
    { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NEDOSTATEK_PRACOVNIKU_VE_STAVEBNICTVI: SeoPage = {
  slug: 'nedostatek-pracovniku-ve-stavebnictvi',
  breadcrumbLabel: 'Nedostatek pracovníků ve stavebnictví',
  eyebrow: 'Nedostatek pracovníků · Obory',
  title: 'Nedostatek pracovníků ve stavebnictví',
  heroSubtitle:
    'Proč stavebnictví naráží na nedostatek lidí, jak roli hraje sezónnost a projektovost a jaké cesty mají firmy k obsazení řemeslných profesí. Praktický pohled.',
  description:
    'Nedostatek pracovníků ve stavebnictví – role sezónnosti, projektů a kvalifikovaných řemesel a jaké cesty mají firmy: subdodávky, nábor ze zahraničí, retence. Praktický pohled.',
  keywords: ['nedostatek pracovníků ve stavebnictví', 'stavebnictví nábor', 'řemeslníci', 'kvalifikované profese', 'sezónní práce stavebnictví', 'zahraniční pracovníci stavebnictví'],
  intro:
    'Stavebnictví kombinuje projektový charakter práce, sezónnost a vysoký podíl kvalifikovaných řemesel, což z náboru dělá trvalou výzvu. Potřeba lidí se mění podle rozjetých zakázek a počasí a u řady profesí jde o specializace, které nelze rychle nahradit. Tato stránka popisuje, proč stavebnictví naráží na nedostatek pracovníků a jaké praktické cesty mají firmy k obsazení pozic. Čísla nedostatku nevymýšlíme; patří do statistik trhu práce. Soustředíme se na rozhodnutí, jak zajistit kapacitu na projekty a udržet klíčové řemeslníky.',
  sections: [
    {
      heading: 'Čím je stavebnictví specifické',
      body: [
        'Stavební práce jsou často vázané na konkrétní projekty s definovaným začátkem a koncem, podléhají sezónnosti a počasí a u mnoha profesí vyžadují kvalifikaci a praxi. To zužuje okruh dostupných lidí a komplikuje plánování stálého stavu.',
        'Aktuální rozsah nedostatku patří do statistik trhu práce, na které odkazujeme.',
      ],
    },
    {
      heading: 'Cesty, které mají stavební firmy',
      body: [
        'Projektovou potřebu lze řešit kombinací vlastního jádra, subdodávek a flexibilní kapacity. U nedostatkových řemesel rozšiřuje okruh nábor ze zahraničí, byť s administrativou oprávnění. Klíčové řemeslníky je vhodné udržet retencí, protože jejich nahrazení je obtížné.',
      ],
      bullets: [
        'Vlastní jádro klíčových řemeslníků',
        'Flexibilní a subdodavatelská kapacita na projekty',
        'Nábor ze zahraničí u nedostatkových řemesel',
        'Retence a férové podmínky pro udržení specialistů',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po zvážení možností byste měli umět nastavit, které profese držet ve vlastním jádru, co pokrýt flexibilní nebo subdodavatelskou kapacitou a kde zapojit nábor ze zahraničí. U zahraničních pracovníků počítejte s časem na oprávnění při plánování projektů.',
        'Navazují stránky o náboru, plánování náboru a o zaměstnávání cizinců.',
      ],
    },
  ],
  faq: [
    { q: 'Jak zajistit kapacitu na stavební projekty?', a: 'Kombinací vlastního jádra klíčových řemeslníků, flexibilní nebo subdodavatelské kapacity a u nedostatkových řemesel náboru ze zahraničí, naplánovaného s ohledem na lhůty oprávnění.' },
    { q: 'Proč udržet klíčové řemeslníky?', a: 'Specializovaná řemesla se obtížně a draze nahrazují. Retence a férové podmínky proto u těchto profesí dávají velký smysl.' },
    { q: 'Uvádíte statistiky nedostatku?', a: 'Ne. Aktuální čísla patří do statistik trhu práce (ČSÚ, MPSV, Úřad práce ČR), na které odkazujeme; sami je nevymýšlíme.' },
  ],
  sources: [SRC.czso, SRC.mpsv, SRC.upcr, SRC.zakonOZamestnanosti],
  internalLinks: [
    employerHubLink,
    { href: '/nedostatek-pracovniku-v-cr', label: 'Nedostatek pracovníků v ČR' },
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
    naborCizincuLink,
    empFaqLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER E — EMPLOYER COSTS (concepts only; no invented figures)
// ──────────────────────────────────────────────────────────────────────────

export const SKUTECNE_NAKLADY_NA_ZAMESTNANCE: SeoPage = {
  slug: 'skutecne-naklady-na-zamestnance',
  breadcrumbLabel: 'Skutečné náklady na zaměstnance',
  eyebrow: 'Náklady · Zaměstnavatelé',
  title: 'Skutečné náklady na zaměstnance',
  heroSubtitle:
    'Proč jsou skutečné náklady vyšší než hrubá mzda – z jakých složek se skládají, včetně nepřímých a nákladů příležitosti. Rámec pro rozhodování bez vymyšlených čísel.',
  description:
    'Skutečné náklady na zaměstnance – proč jsou vyšší než hrubá mzda a z jakých složek se skládají (odvody, nepřímé náklady, náklady příležitosti). Rámec pro rozhodování bez čísel.',
  keywords: ['skutečné náklady na zaměstnance', 'celkové náklady zaměstnanec', 'cena práce', 'nepřímé náklady', 'náklady příležitosti', 'náklady zaměstnance'],
  intro:
    'Při rozhodování o nové pozici je užitečné vidět celý obraz nákladů, ne jen hrubou mzdu. Skutečné náklady na zaměstnance zahrnují kromě mzdy i povinné odvody zaměstnavatele a celou řadu nepřímých položek, které se snadno přehlédnou. Tato stránka nabízí rámec, jak o skutečných nákladech přemýšlet, aby rozpočet odpovídal realitě. Konkrétní sazby a částky zde záměrně neuvádíme – mohou se měnit a patří do oficiálních zdrojů; uvedení vymyšleného čísla by mohlo vést k chybnému rozhodnutí. Jde o koncepční model, který si firma naplní vlastními a ověřenými daty.',
  sections: [
    {
      heading: 'Z čeho se skutečné náklady skládají',
      body: [
        'Základem je hrubá mzda, na kterou navazují povinné odvody zaměstnavatele. K tomu se přidávají nepřímé náklady (nábor, onboarding, vybavení, benefity) a méně viditelné položky jako čas managementu nebo náklady příležitosti při neobsazené pozici.',
      ],
      bullets: [
        'Hrubá mzda',
        'Povinné odvody zaměstnavatele',
        'Nepřímé náklady (nábor, onboarding, vybavení)',
        'Čas vedení a administrativy',
        'Náklady příležitosti při neobsazené pozici',
      ],
    },
    {
      heading: 'Proč na celkovém pohledu záleží',
      body: [
        'Rozhodování jen podle hrubé mzdy podhodnocuje skutečnou cenu pozice a může vést k chybným závěrům – například při srovnání vlastního zaměstnance a jiné formy zajištění práce. Celkový pohled umožňuje rozhodovat se realisticky.',
        'Konkrétní sazby odvodů ověřte u ČSSZ, zdravotních pojišťoven a finanční správy; tato stránka je neuvádí.',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po projití složek nákladů byste měli umět sestavit realističtější rozpočet pozice a porovnat varianty zajištění práce na stejném základě. To je vstup pro rozhodnutí, zda a jak pozici obsadit.',
        'Pro praktický odhad slouží stránka o tom, kolik stojí zaměstnanec; nepřímým nákladům se věnuje samostatná stránka.',
      ],
    },
  ],
  faq: [
    { q: 'Jsou skutečné náklady vyšší než hrubá mzda?', a: 'Ano. K hrubé mzdě se připojují povinné odvody zaměstnavatele a nepřímé náklady (nábor, onboarding, vybavení) i méně viditelné položky. Konkrétní sazby ověřte u ČSSZ a zdravotních pojišťoven.' },
    { q: 'Jaké sazby odvodů uvádíte?', a: 'Žádné konkrétní – mohou se měnit a patří do oficiálních zdrojů. Aktuální hodnoty zveřejňují ČSSZ, zdravotní pojišťovny a finanční správa.' },
    { q: 'Proč počítat i nepřímé náklady?', a: 'Protože rozhodování jen podle hrubé mzdy podhodnocuje skutečnou cenu pozice. Celkový pohled umožní realistické srovnání variant.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonSocialni, SRC.zakonZdravotni, SRC.cssz, SRC.financniSprava],
  internalLinks: [
    employerHubLink,
    { href: '/naklady-na-zamestnance-cr', label: 'Náklady na zaměstnance v ČR' },
    { href: '/kolik-stoji-zamestnanec', label: 'Kolik stojí zaměstnanec' },
    { href: '/neprime-naklady-na-zamestnance', label: 'Nepřímé náklady na zaměstnance' },
    { href: '/socialni-zdravotni-dane-2026', label: 'Přehled odvodů v roce 2026' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const KOLIK_STOJI_ZAMESTNANEC: SeoPage = {
  slug: 'kolik-stoji-zamestnanec',
  breadcrumbLabel: 'Kolik stojí zaměstnanec',
  eyebrow: 'Náklady · Zaměstnavatelé',
  title: 'Kolik stojí zaměstnanec: jak si odhad sestavit',
  heroSubtitle:
    'Návod, jak si pro konkrétní pozici sestavit vlastní odhad nákladů – jaké položky zahrnout a kde vzít aktuální sazby. Bez vymyšlených čísel.',
  description:
    'Kolik stojí zaměstnanec – návod, jak si pro konkrétní pozici sestavit vlastní odhad nákladů: jaké položky zahrnout a kde vzít aktuální sazby. Bez vymyšlených čísel a paušálních částek.',
  keywords: ['kolik stojí zaměstnanec', 'náklady na zaměstnance výpočet', 'odhad nákladů pozice', 'cena zaměstnance', 'rozpočet pozice', 'mzdové náklady'],
  intro:
    'Otázku „kolik stojí zaměstnanec“ nelze poctivě zodpovědět jedním číslem – odpověď závisí na mzdě, pozici, oboru a aktuálních sazbách odvodů. Místo vymyšlené částky proto tato stránka nabízí návod, jak si pro konkrétní pozici sestavit vlastní odhad: jaké položky do něj zahrnout a kde vzít aktuální a ověřené hodnoty. Cílem je, aby si zaměstnavatel uměl spočítat realistický rozpočet pozice sám, s daty z oficiálních zdrojů. Žádné paušální částky ani procenta zde neuvádíme, protože by bez vašich vstupů a aktuálních sazeb byly zavádějící.',
  sections: [
    {
      heading: 'Jaké položky do odhadu zahrnout',
      body: [
        'Realistický odhad začíná hrubou mzdou a připočítává povinné odvody zaměstnavatele. Dále je vhodné zahrnout jednorázové a průběžné nepřímé náklady – nábor, onboarding, vybavení, případné benefity – a u některých pozic i náklady na zaškolení.',
      ],
      bullets: [
        'Hrubá mzda pro danou pozici',
        'Povinné odvody zaměstnavatele (aktuální sazby z oficiálních zdrojů)',
        'Jednorázové náklady (nábor, vybavení, zaškolení)',
        'Průběžné nepřímé náklady (benefity, správa)',
      ],
    },
    {
      heading: 'Kde vzít aktuální sazby',
      body: [
        'Sazby pojistného a daňové parametry se mění, proto je nutné je čerpat z aktuálních oficiálních zdrojů – ČSSZ, zdravotní pojišťovny a finanční správa. Tato stránka konkrétní hodnoty neuvádí, aby nezobrazovala neaktuální čísla.',
        'Pro přesnější výpočet se vyplatí konzultace s mzdovou účetní.',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Výsledkem je vlastní, ověřitelný odhad nákladů na konkrétní pozici, který můžete použít pro rozpočet a pro porovnání variant zajištění práce. Je to praktický nástroj, ne univerzální číslo.',
        'Koncepční rámec celkových nákladů popisuje stránka o skutečných nákladech; nepřímým nákladům se věnuje samostatná stránka.',
      ],
    },
  ],
  faq: [
    { q: 'Kolik tedy stojí zaměstnanec?', a: 'Jedním číslem to poctivě říct nelze – závisí na mzdě, pozici, oboru a aktuálních sazbách. Tato stránka místo paušální částky nabízí návod, jak si odhad sestavit z ověřených dat.' },
    { q: 'Kde vzít aktuální sazby odvodů?', a: 'U ČSSZ, zdravotních pojišťoven a finanční správy. Sazby se mění, proto je vhodné čerpat je z aktuálních oficiálních zdrojů, případně konzultovat s mzdovou účetní.' },
    { q: 'Mám do odhadu počítat i nábor a zaškolení?', a: 'Ano. Realistický odhad zahrnuje i jednorázové a průběžné nepřímé náklady, jako jsou nábor, vybavení a zaškolení.' },
  ],
  sources: [SRC.zakonSocialni, SRC.zakonZdravotni, SRC.cssz, SRC.financniSprava, SRC.vzp],
  internalLinks: [
    employerHubLink,
    { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
    { href: '/neprime-naklady-na-zamestnance', label: 'Nepřímé náklady na zaměstnance' },
    { href: '/naklady-na-zamestnance-cr', label: 'Náklady na zaměstnance v ČR' },
    { href: '/socialni-zdravotni-dane-2026', label: 'Přehled odvodů v roce 2026' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NEPRIME_NAKLADY_NA_ZAMESTNANCE: SeoPage = {
  slug: 'neprime-naklady-na-zamestnance',
  breadcrumbLabel: 'Nepřímé náklady na zaměstnance',
  eyebrow: 'Náklady · Zaměstnavatelé',
  title: 'Nepřímé náklady na zaměstnance',
  heroSubtitle:
    'Kde se skrývají náklady, které nejsou ve mzdě – nábor, onboarding, fluktuace, prostoje a vybavení. Praktický pohled, jak je rozpoznat a snížit.',
  description:
    'Nepřímé náklady na zaměstnance – kde se skrývají náklady mimo mzdu (nábor, onboarding, fluktuace, prostoje, vybavení) a jak je rozpoznat a snížit. Praktický pohled bez vymyšlených čísel.',
  keywords: ['nepřímé náklady na zaměstnance', 'skryté náklady', 'náklady fluktuace', 'náklady náboru', 'náklady onboardingu', 'prostoje'],
  intro:
    'Vedle mzdy a povinných odvodů nese zaměstnání i řadu nepřímých nákladů, které se v účetnictví těžko vidí, ale reálně zatěžují firmu. Patří sem náklady na nábor a onboarding, dopady fluktuace, prostoje při neobsazené pozici nebo vybavení a správa. Tato stránka pomáhá tyto skryté náklady rozpoznat a ukazuje, kde je lze snižovat – často právě přes stabilitu týmu a kvalitní nábor. Konkrétní částky nevymýšlíme; jde o to, kde náklady vznikají a jak je řídit. Každá firma si rozsah naplní vlastními daty.',
  sections: [
    {
      heading: 'Kde nepřímé náklady vznikají',
      body: [
        'Nepřímé náklady se objevují napříč celým cyklem zaměstnance. Při získávání jde o nábor a výběr, při nástupu o onboarding a zaškolení, během zaměstnání o správu, vybavení a benefity a při odchodu o fluktuaci a opětovné obsazení.',
      ],
      bullets: [
        'Nábor a výběr (inzerce, čas, případně agentura)',
        'Onboarding a zaškolení',
        'Prostoje a snížený výkon při neobsazené pozici',
        'Fluktuace a opakovaný nábor',
        'Vybavení, správa a benefity',
      ],
    },
    {
      heading: 'Proč jsou důležité',
      body: [
        'Nepřímé náklady často převýší očekávání právě u pozic s vysokou fluktuací, kde se nábor a zaškolení opakují. Jejich přehlížení zkresluje pohled na skutečnou cenu pracovní síly a může vést k podceňování investic do stability.',
      ],
    },
    {
      heading: 'Jaké rozhodnutí z toho plyne',
      body: [
        'Po rozpoznání nepřímých nákladů byste měli umět určit, kde u vás nejvíce „utíkají“ – typicky u fluktuace a opakovaného náboru – a nasměrovat opatření tam (retence, onboarding, kvalitní nábor). To bývá levnější než náklady samotné.',
        'Souvislosti popisují stránky o fluktuaci, retenci a o skutečných nákladech na zaměstnance.',
      ],
    },
  ],
  faq: [
    { q: 'Co patří mezi nepřímé náklady na zaměstnance?', a: 'Nábor a výběr, onboarding a zaškolení, prostoje a snížený výkon při neobsazené pozici, dopady fluktuace a vybavení, správa a benefity.' },
    { q: 'Proč jsou nepřímé náklady důležité?', a: 'Často převýší očekávání, zejména u pozic s vysokou fluktuací, kde se nábor a zaškolení opakují. Jejich přehlížení zkresluje skutečnou cenu pracovní síly.' },
    { q: 'Jak nepřímé náklady snížit?', a: 'Zpravidla přes stabilitu týmu – retenci, kvalitní onboarding a nábor, který sníží opakované obsazování. Tato stránka neuvádí konkrétní úspory.' },
  ],
  sources: [SRC.zakonikPrace, SRC.mpsv, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
    { href: '/kolik-stoji-zamestnanec', label: 'Kolik stojí zaměstnanec' },
    { href: '/fluktuace-zamestnancu', label: 'Fluktuace zaměstnanců' },
    { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// CLUSTER F — AUTHORITY + FAQ
// ──────────────────────────────────────────────────────────────────────────

export const FAQ_PRO_ZAMESTNAVATELE: SeoPage = {
  slug: 'faq-pro-zamestnavatele',
  breadcrumbLabel: 'FAQ pro zaměstnavatele',
  eyebrow: 'Rozcestník · Zaměstnavatelé',
  title: 'FAQ pro zaměstnavatele: nábor, stabilita a náklady',
  heroSubtitle:
    'Časté dotazy zaměstnavatelů k náboru, fluktuaci, onboardingu, nedostatku pracovníků a nákladům na jednom místě, s odkazy na podrobné stránky. Obecné informace.',
  description:
    'Často kladené dotazy zaměstnavatelů – nábor, fluktuace a retence, onboarding, nedostatek pracovníků v oborech a náklady na zaměstnance. Rozcestník na podrobné stránky se zdroji.',
  keywords: ['FAQ pro zaměstnavatele', 'časté dotazy nábor', 'fluktuace FAQ', 'onboarding FAQ', 'náklady na zaměstnance FAQ', 'nedostatek pracovníků'],
  intro:
    'Tato stránka shromažďuje časté dotazy zaměstnavatelů k personálním operacím – náboru, stabilitě týmu, onboardingu, nedostatku pracovníků v oborech a nákladům – a slouží jako rozcestník celého clusteru. U každého tématu vede odkaz na podrobnou stránku v sekci Související. Odpovědi mají obecný a praktický charakter a u proměnlivých údajů (sazby, statistiky trhu práce) odkazují na oficiální zdroje místo vymyšlených čísel. Neslibujeme zázračné výsledky ani konkrétní úspory; cílem je pomoci s personálním rozhodováním. Nejde o právní poradenství.',
  sections: [
    {
      heading: 'Jak rozcestník používat',
      body: [
        'Níže najdete odpovědi na opakující se otázky napříč clusterem. U každé oblasti existuje samostatná podrobná stránka, na kterou vede odkaz v sekci Související na konci.',
        'U konkrétních hodnot (sazby odvodů, čísla trhu práce) doporučujeme ověření u příslušné instituce, protože se mění.',
      ],
    },
    {
      heading: 'Oblasti, které cluster pokrývá',
      body: [
        'Cluster pokrývá nábor a jeho plánování, stabilitu týmu (fluktuace a retence), onboarding a adaptaci, nedostatek pracovníků v oborech (výroba, logistika, sklady, stavebnictví) a náklady na zaměstnance.',
      ],
      bullets: [
        'Nábor: přehled, organizace, hledání kandidátů, plánování',
        'Stabilita: fluktuace, příčiny, snižování, retence',
        'Onboarding a adaptace',
        'Nedostatek pracovníků podle oborů',
        'Náklady na zaměstnance',
      ],
    },
  ],
  faq: [
    { q: 'Jak se rozhodnout mezi přímým náborem a agenturou?', a: 'Podle naléhavosti, charakteru potřeby (stálá vs. dočasná) a vlastní kapacity. Pro špičky a dočasné výpadky bývá vhodná agentura, pro klíčové stálé role přímý nábor. Viz stránka o náboru pracovníků.' },
    { q: 'Jak snížit fluktuaci?', a: 'Začít měřením a zjištěním příčin, pak nasadit cílená opatření a pracovat na retenci. Tématu se věnují stránky o fluktuaci, jejích příčinách, snižování a retenci.' },
    { q: 'Jak zvládnout nedostatek pracovníků v našem oboru?', a: 'Kombinací stálého jádra, flexibilní či agenturní kapacity a u nedostatkových profesí náboru ze zahraničí. Samostatné stránky se věnují výrobě, logistice, skladům a stavebnictví.' },
    { q: 'Kolik skutečně stojí zaměstnanec?', a: 'Více než hrubá mzda – k ní patří odvody a nepřímé náklady. Jedním číslem to říct nelze; stránky o nákladech ukazují, jak si odhad sestavit z ověřených sazeb (ČSSZ, pojišťovny, finanční správa).' },
    { q: 'Proč je onboarding tak důležitý?', a: 'První dny a týdny rozhodují, zda nový člověk zůstane. Zvládnutý onboarding urychluje zapracování a snižuje brzké odchody. Viz stránky o onboardingu a adaptaci.' },
    { q: 'Slibujete konkrétní výsledky nebo úspory?', a: 'Ne. Neuvádíme vymyšlená čísla úspor ani záruky. Nabízíme praktické rámce a u dat odkazujeme na oficiální zdroje.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonOZamestnanosti, SRC.mpsv, SRC.upcr, SRC.czso],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-pracovniku', label: 'Nábor pracovníků: přehled' },
    { href: '/nabor-zamestnancu', label: 'Nábor zaměstnanců: organizace' },
    { href: '/jak-najit-pracovniky', label: 'Jak najít pracovníky' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
    { href: '/fluktuace-zamestnancu', label: 'Fluktuace zaměstnanců' },
    { href: '/priciny-fluktuace-zamestnancu', label: 'Příčiny fluktuace' },
    { href: '/jak-snizit-fluktuaci', label: 'Jak snížit fluktuaci' },
    { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    { href: '/onboarding-zamestnancu', label: 'Onboarding zaměstnanců' },
    { href: '/adaptace-zamestnancu', label: 'Adaptace zaměstnanců' },
    { href: '/checklist-pro-nove-zamestnance', label: 'Checklist pro nové zaměstnance' },
    { href: '/nedostatek-pracovniku-ve-vyrobe', label: 'Nedostatek pracovníků ve výrobě' },
    { href: '/nedostatek-pracovniku-v-logistice', label: 'Nedostatek pracovníků v logistice' },
    { href: '/nedostatek-pracovniku-ve-skladech', label: 'Nedostatek pracovníků ve skladech' },
    { href: '/nedostatek-pracovniku-ve-stavebnictvi', label: 'Nedostatek pracovníků ve stavebnictví' },
    { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
    { href: '/kolik-stoji-zamestnanec', label: 'Kolik stojí zaměstnanec' },
    { href: '/neprime-naklady-na-zamestnance', label: 'Nepřímé náklady na zaměstnance' },
    { href: '/nejcastejsi-chyby-zamestnavatelu', label: 'Nejčastější chyby zaměstnavatelů' },
    empGlossaryLink,
    foreignWorkersLink,
    { href: '/faq-zamestnavani-cizincu', label: 'FAQ: zaměstnávání cizinců v ČR' },
  ],
  cta: {
    eyebrow: 'Nenašli jste odpověď?',
    title: 'Máte konkrétní personální dotaz?',
    text: 'Rádi probereme vaši situaci a pomůžeme s náborem i personálními procesy. Ozvěte se nám.',
    buttonLabel: 'Kontaktujte nás',
    href: '/contact',
  },
  showToc: false,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NEJCASTEJSI_CHYBY_ZAMESTNAVATELU: SeoPage = {
  slug: 'nejcastejsi-chyby-zamestnavatelu',
  breadcrumbLabel: 'Nejčastější chyby zaměstnavatelů',
  eyebrow: 'Compliance · Zaměstnavatelé',
  title: 'Nejčastější chyby zaměstnavatelů v personální oblasti',
  heroSubtitle:
    'Opakující se chyby v náboru, onboardingu, stabilizaci týmu a plánování nákladů – a jak jim předejít. Praktický přehled pro zaměstnavatele, nikoli právní poradenství.',
  description:
    'Nejčastější chyby zaměstnavatelů – v náboru, onboardingu, stabilizaci týmu a plánování nákladů – a jak jim předejít. Praktický přehled pro zaměstnavatele se zdroji.',
  keywords: ['nejčastější chyby zaměstnavatelů', 'chyby v náboru', 'chyby onboarding', 'fluktuace chyby', 'personální chyby', 'řízení lidí chyby'],
  intro:
    'Mnoho personálních problémů nevzniká kvůli vnějším okolnostem, ale kvůli opakujícím se chybám, kterým lze předejít. Tato stránka shrnuje nejčastější chyby zaměstnavatelů napříč náborem, onboardingem, stabilizací týmu a plánováním nákladů a u každé nabízí praktickou prevenci. Není to seznam pro kritiku, ale kontrolní přehled, podle kterého si firma ověří vlastní postupy. Nejde o právní poradenství a neobsahuje žádné statistiky; u povinností a sazeb odkazuje na předpisy a oficiální zdroje. Cílem je, aby se zaměstnavatel vyvaroval drahých a přitom předvídatelných chyb.',
  sections: [
    {
      heading: 'Chyby v náboru a nástupu',
      body: [
        'Mezi časté chyby patří nejasný profil pozice, pomalé tempo výběru, kterým firma ztrácí kandidáty, a podceněný onboarding. Důsledkem bývá neobsazená pozice nebo brzký odchod nového člověka, který znehodnotí předchozí úsilí.',
      ],
      bullets: [
        'Nejasný profil pozice a očekávání',
        'Pomalé tempo a příliš mnoho kol výběru',
        'Podceněný onboarding a adaptace',
      ],
    },
    {
      heading: 'Chyby ve stabilizaci a nákladech',
      body: [
        'Další skupinou jsou zanedbaná stabilita týmu (žádné měření fluktuace, žádná retence) a rozhodování o nákladech jen podle hrubé mzdy, které opomíjí odvody a nepřímé náklady. U zaměstnávání cizinců je častou chybou podceněná administrativa oprávnění.',
        'Konkrétní povinnosti a sazby ověřte v předpisech a u příslušných institucí.',
      ],
      bullets: [
        'Neměřená fluktuace a chybějící retence',
        'Rozpočet jen podle hrubé mzdy',
        'Podceněná administrativa u cizinců',
      ],
    },
    {
      heading: 'Jak chybám předejít',
      body: [
        'Prevence spočívá v jednoduchých návycích: jasný profil pozice, svižný a přehledný výběr, připravený onboarding, měření fluktuace a práce s retencí a realistický rozpočet pozice. U cizinců se vyplatí počítat s administrativou předem.',
        'Ke každé oblasti existuje podrobná stránka v sekci Související.',
      ],
    },
  ],
  faq: [
    { q: 'Jaká je nejčastější chyba v náboru?', a: 'Časté jsou nejasný profil pozice a pomalé tempo výběru, kterým firma ztrácí kvalitní kandidáty. Pomáhá svižný a přehledný proces s jasnými kritérii.' },
    { q: 'Proč nestačí počítat náklady podle hrubé mzdy?', a: 'Protože opomíjí povinné odvody zaměstnavatele a nepřímé náklady (nábor, onboarding, fluktuace). Realistický rozpočet pozice s nimi počítá.' },
    { q: 'Jaká chyba hrozí u zaměstnávání cizinců?', a: 'Podceněná administrativa oprávnění a jejich platnosti. Podrobnosti a povinnosti popisují stránky o zaměstnávání cizinců; konkrétní pravidla ověřte u úřadů.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-zamestnancu', label: 'Nábor zaměstnanců: organizace procesu' },
    { href: '/onboarding-zamestnancu', label: 'Onboarding zaměstnanců' },
    { href: '/jak-snizit-fluktuaci', label: 'Jak snížit fluktuaci' },
    { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
    foreignWorkersLink,
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const SLOVNIK_POJMU_PRO_ZAMESTNAVATELE: SeoPage = {
  slug: 'slovnik-pojmu-pro-zamestnavatele',
  breadcrumbLabel: 'Slovník pojmů pro zaměstnavatele',
  eyebrow: 'Slovník · Zaměstnavatelé',
  title: 'Slovník pojmů pro zaměstnavatele',
  heroSubtitle:
    'Stručná vysvětlení pojmů z náboru, stabilizace týmu, onboardingu a nákladů, se kterými se zaměstnavatel setká. Obecné informace s odkazy na podrobné stránky.',
  description:
    'Slovník pojmů pro zaměstnavatele – nábor, fluktuace, retence, onboarding, adaptace, agenturní zaměstnávání, nepřímé náklady a další. Stručná vysvětlení s odkazy na podrobné stránky.',
  keywords: ['slovník pojmů zaměstnavatelé', 'fluktuace pojem', 'retence pojem', 'onboarding pojem', 'agenturní zaměstnávání', 'nepřímé náklady'],
  intro:
    'Personální oblast používá řadu pojmů, které se snadno zamění nebo chápou nejednotně. Tento slovník vysvětluje klíčové termíny z náboru, stabilizace týmu, onboardingu a nákladů stručně a srozumitelně, aby je zaměstnavatel používal jednoznačně. U pojmů, které mají i právní rozměr, odkazuje na podrobné stránky a oficiální zdroje. Definice jsou zjednodušené pro orientaci a nenahrazují závazné znění předpisů ani individuální posouzení; konkrétní podmínky se mohou měnit a je vhodné je ověřit u příslušného úřadu nebo na podrobné stránce.',
  sections: [
    {
      heading: 'Nábor a kapacity',
      body: [
        'Tato skupina pojmů se týká získávání pracovníků a plánování kapacit.',
      ],
      bullets: [
        'Přímý nábor – firma sama vyhledá a zaměstná pracovníka.',
        'Agenturní zaměstnávání – pracovník je zaměstnancem agentury a je dočasně přidělen k uživateli.',
        'Dočasné přidělení – přidělení agenturního pracovníka k uživateli na sjednanou dobu.',
        'Plánování náboru – předvídání potřeby lidí a jejího načasování.',
        'Sourcing – vyhledávání a oslovování kandidátů přes různé kanály.',
      ],
    },
    {
      heading: 'Stabilita týmu a nástup',
      body: [
        'Tato skupina pojmů se týká udržení lidí a jejich uvedení do firmy.',
      ],
      bullets: [
        'Fluktuace – míra odchodů a nahrazování zaměstnanců.',
        'Retence – systematické udržení zaměstnanců.',
        'Onboarding – proces nástupu a prvních dnů nového zaměstnance.',
        'Adaptace – delší zapracování v prvních týdnech a měsících.',
      ],
    },
    {
      heading: 'Náklady',
      body: [
        'Tato skupina pojmů se týká ceny pracovní síly.',
      ],
      bullets: [
        'Skutečné náklady na zaměstnance – celkové náklady nad rámec hrubé mzdy.',
        'Nepřímé náklady – položky mimo mzdu a odvody (nábor, onboarding, fluktuace).',
        'Náklady příležitosti – ztráta z neobsazené nebo nevýkonné pozice.',
        'Povinné odvody zaměstnavatele – pojistné hrazené zaměstnavatelem (sazby u oficiálních zdrojů).',
      ],
    },
  ],
  faq: [
    { q: 'Jaký je rozdíl mezi fluktuací a retencí?', a: 'Fluktuace popisuje míru odchodů a nahrazování zaměstnanců, retence je systematické udržení lidí ve firmě. Snižování fluktuace a retence se doplňují.' },
    { q: 'Co je agenturní zaměstnávání?', a: 'Model, kdy je pracovník zaměstnancem pracovní agentury a je dočasně přidělen k uživateli, u něhož vykonává práci. Agentura musí mít platné povolení ke zprostředkování.' },
    { q: 'Je slovník závazný?', a: 'Ne. Definice jsou zjednodušené pro orientaci a nenahrazují závazné znění předpisů. Konkrétní podmínky ověřte u příslušného úřadu nebo na podrobné stránce.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonOZamestnanosti, SRC.mpsv, SRC.upcr],
  internalLinks: [
    employerHubLink,
    { href: '/nabor-pracovniku', label: 'Nábor pracovníků' },
    { href: '/fluktuace-zamestnancu', label: 'Fluktuace zaměstnanců' },
    { href: '/onboarding-zamestnancu', label: 'Onboarding zaměstnanců' },
    { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
    empFaqLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// Registry — ordered by cluster.
// ──────────────────────────────────────────────────────────────────────────

export const EMPLOYER_OPERATIONS_PAGES: ReadonlyArray<SeoPage> = [
  // Level 1 — cornerstone hub
  PRO_ZAMESTNAVATELE,
  // Cluster A — recruitment operations
  NABOR_PRACOVNIKU,
  NABOR_ZAMESTNANCU,
  JAK_NAJIT_PRACOVNIKY,
  PLANOVANI_NABORU,
  // Cluster B — workforce stability
  FLUKTUACE_ZAMESTNANCU,
  PRICINY_FLUKTUACE_ZAMESTNANCU,
  JAK_SNIZIT_FLUKTUACI,
  RETENCE_ZAMESTNANCU,
  // Cluster C — onboarding
  ONBOARDING_ZAMESTNANCU,
  ADAPTACE_ZAMESTNANCU,
  CHECKLIST_PRO_NOVE_ZAMESTNANCE,
  // Cluster D — labor shortage by sector
  NEDOSTATEK_PRACOVNIKU_VE_VYROBE,
  NEDOSTATEK_PRACOVNIKU_V_LOGISTICE,
  NEDOSTATEK_PRACOVNIKU_VE_SKLADECH,
  NEDOSTATEK_PRACOVNIKU_VE_STAVEBNICTVI,
  // Cluster E — employer costs
  SKUTECNE_NAKLADY_NA_ZAMESTNANCE,
  KOLIK_STOJI_ZAMESTNANEC,
  NEPRIME_NAKLADY_NA_ZAMESTNANCE,
  // Cluster F — authority + FAQ
  FAQ_PRO_ZAMESTNAVATELE,
  NEJCASTEJSI_CHYBY_ZAMESTNAVATELU,
  SLOVNIK_POJMU_PRO_ZAMESTNAVATELE,
]
