// High-skilled & technical talent cluster (Wave 2A).
//
// Wave 1 established the specialist recruitment foundation: trades (svářeči,
// CNC, elektrikáři), operational families (údržba, kvalita, provozní vedení)
// and the qualification anchor. This batch adds the four families that Wave 2
// discovery proved were genuinely uncovered — measured, not assumed:
//
//   * automation / PLC     — 0 occurrences of "PLC" or "automatizac*" anywhere
//                            in the corpus at baseline 1106bd6
//   * engineering roles    — "inženýr" appeared 4 times, all passing mentions
//   * technolog / konstruktér — 5 job-title occurrences (disambiguated from 29
//                            uses of "technologie", the trap that produced a
//                            false "already covered" reading in Wave 1)
//   * procurement / supply — 7 passing mentions, no page
//
// Everything else on the Wave 2 candidate list was rejected because an existing
// page already owns the intent; those decisions are recorded in
// lib/content/growth-cohorts.ts so a later wave cannot silently recreate them.
//
// EDITORIAL CONTRACT. Identical to the rest of the corpus: no invented salary,
// market statistic, placement count, candidate-pool size, lead time or
// guarantee. Where a figure would be natural the page defers to the official
// source (MPSV, ÚP ČR, ČSÚ, ISPV, NSP/NSK) or to the on-site calculator.
//
// REQUIREMENT CLASSES. These pages exist because employers routinely confuse a
// legal duty with an industry habit. Each page therefore separates:
//   LEGAL REQUIREMENT        — follows from legislation
//   REGULATED QUALIFICATION  — a specific instrument governs competence
//   INDUSTRY PRACTICE        — common expectation, not a legal duty
//   EMPLOYER-SPECIFIC        — depends on the plant, system or customer
//   SCREENING CONSIDERATION  — a signal worth checking, nothing more
// A common expectation is never presented as law.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-08-15'

const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}

const hireCta = {
  eyebrow: 'Nábor technických pozic',
  title: 'Hledáte techniky nebo inženýry?',
  text: 'Popište nám pozici, technologie, se kterými se pracuje, a požadovaná oprávnění. Ozveme se a probereme, co obsazení v dané lokalitě obnáší.',
  buttonLabel: 'Zadat poptávku',
  href: '/poptavka-pracovniku',
}

// ──────────────────────────────────────────────────────────────────────────
// AUTOMATION & PLC
// ──────────────────────────────────────────────────────────────────────────

export const NABOR_TECHNIKU_AUTOMATIZACE: SeoPage = {
  slug: 'nabor-techniku-automatizace',
  breadcrumbLabel: 'Technici automatizace',
  eyebrow: 'Nábor · Automatizace a PLC',
  title: 'Nábor techniků automatizace a PLC: co pozici skutečně vymezuje',
  heroSubtitle:
    'Automatizace stojí na rozhraní elektrotechniky, mechaniky a softwaru. Přehled toho, co u těchto pozic vyplývá z předpisů, co je zvyklost oboru a co si určuje sám provoz.',
  description:
    'Nábor techniků automatizace a PLC – jaká oprávnění pozice vyžaduje, co je jen zvyklostí oboru a jak zadání upřesnit, aby odpovídalo vašemu provozu.',
  keywords: ['nábor techniků automatizace', 'PLC programátor', 'automatizace ve výrobě', 'technik automatizace', 'řídicí systémy', 'obsazení technické pozice'],
  intro:
    'Automatizace je mezi technickými profesemi zvláštní tím, že se nedá popsat jedním oborem. Člověk, který u linky nastavuje řídicí systém, se pohybuje na rozhraní elektrotechniky, mechaniky a softwaru, a podle toho, kterou z těchto tří stran váš provoz potřebuje nejvíc, vypadá jinak i vhodný kandidát. Zadání typu „hledáme technika automatizace“ proto samo o sobě neříká skoro nic. Tato stránka rozebírá, co u těchto pozic vyplývá z právní úpravy, co je pouze zvyklostí oboru a co si stanovuje každý provoz sám – a jak to promítnout do zadání.',
  sections: [
    {
      heading: 'Co se pod automatizací skrývá',
      body: [
        'Pod jedním názvem se v praxi potkávají role s velmi odlišnou náplní. Někde jde především o údržbu a diagnostiku již běžících linek, jinde o uvádění nových zařízení do provozu, o úpravy programů podle změn výroby nebo o návrh řídicí části nového stroje. Každá z těchto variant klade důraz na jinou dovednost.',
        'Rozdíl mezi nimi je pro nábor podstatnější než samotný název pozice. Technik, který roky spolehlivě udržuje stávající linky, nemusí být tím, kdo připraví řídicí systém nového zařízení – a naopak.',
      ],
      bullets: [
        'Údržba a diagnostika již provozovaných zařízení',
        'Uvádění nových linek do provozu a jejich odladění',
        'Úpravy programů podle změn ve výrobě',
        'Návrh řídicí části zařízení a její dokumentace',
      ],
    },
    {
      heading: 'Co vyplývá z předpisů a co ne',
      body: [
        'Tady je užitečné oddělit tři různé věci, které se v inzerátech běžně mísí dohromady.',
        'REGULOVANÁ ZPŮSOBILOST: pokud má člověk vykonávat činnost na elektrickém zařízení, řídí se jeho odborná způsobilost nařízením vlády č. 194/2022 Sb. To je právní požadavek vázaný na činnost a na zařízení, nikoli na název pozice. Provozuje-li firma vyhrazená technická zařízení, uplatní se navíc úprava podle zákona č. 250/2021 Sb.',
        'ZVYKLOST OBORU: znalost konkrétní platformy řídicího systému, zkušenost s určitým typem sběrnice nebo praxe s roboty daného výrobce. Nic z toho nevyplývá ze zákona, byť to zaměstnavatelé často uvádějí jako podmínku.',
        'SPECIFIKUM PROVOZU: použité systémy, jazyk dokumentace, způsob správy programů, přístup k zařízení na dálku. Toto si určuje výhradně firma sama a kandidát to nemůže znát předem.',
      ],
    },
    {
      heading: 'Platformy řídicích systémů a jak s nimi pracovat v zadání',
      body: [
        'Znalost konkrétní platformy je nejčastější důvod, proč zadání zbytečně zúží okruh kandidátů. Prostředí se mezi výrobci liší, logika práce se ale z velké části přenáší – a technik, který rozumí tomu, co má řídicí systém dělat, se v jiném prostředí zorientuje, pokud na to dostane čas.',
        'Vyplatí se proto v zadání odlišit, co je skutečně nutné hned od prvního dne, a co se lze doučit. U provozu s jedinou platformou a bez kapacity na zaškolení je požadavek oprávněný. Tam, kde je vedle sebe víc systémů, bývá důležitější schopnost číst dokumentaci a systematicky hledat příčinu poruchy.',
      ],
      bullets: [
        'Které systémy jsou v provozu skutečně nasazené',
        'Zda jde o úpravy stávajících programů, nebo o tvorbu nových',
        'Zda je k dispozici někdo, kdo nováčka uvede do prostředí',
        'Jaká část práce probíhá u zařízení a jaká mimo něj',
      ],
    },
    {
      heading: 'Bezpečnostní část a proč se na ni ptát zvlášť',
      body: [
        'Bezpečnostní obvody strojních zařízení jsou oblast, kde se zkušenost kandidátů liší nejvíc a kde se to zároveň nejhůř pozná z životopisu. Někdo se pohyboval pouze v provozní logice, jiný pravidelně řešil i bezpečnostní funkce a jejich dokumentaci.',
        'Pro provoz je to podstatné, protože zásah do bezpečnostní části zařízení má jiné důsledky než úprava provozního programu. Tuto zkušenost je vhodné ověřovat samostatnou otázkou, ne ji předpokládat podle délky praxe.',
      ],
    },
    {
      heading: 'Na co se ptát při výběru',
      body: [
        'U automatizace se osvědčuje ptát se na konkrétní situace, ne na seznam technologií. Popis skutečně řešené poruchy, včetně toho, jak se kandidát dostal k příčině, řekne o jeho způsobu práce víc než výčet zkratek.',
        'Stejně tak stojí za to probrat, jak kandidát pracuje s dokumentací a co po sobě zanechává. V provozu, kde se zařízení obsluhuje roky, je dohledatelnost provedených úprav často cennější než rychlost samotného zásahu.',
      ],
      bullets: [
        'Popis konkrétní poruchy a postupu k jejímu odstranění',
        'Zkušenost s uváděním zařízení do provozu',
        'Přístup k dokumentaci a evidenci provedených změn',
        'Zkušenost s bezpečnostní částí zařízení',
        'Ochota k výjezdům nebo pohotovosti, pokud je provoz vyžaduje',
      ],
    },
  ],
  faq: [
    { q: 'Potřebuje technik automatizace elektrotechnickou způsobilost?', a: 'Pokud má vykonávat činnost na elektrickém zařízení, řídí se jeho odborná způsobilost nařízením vlády č. 194/2022 Sb. Rozhoduje charakter činnosti a zařízení, nikoli název pozice. Rozsah je proto vhodné vymezit už v zadání.' },
    { q: 'Je znalost konkrétní platformy nutná?', a: 'Ze žádného předpisu nevyplývá – jde o požadavek provozu. Zda je nezbytná od prvního dne, závisí na tom, kolik systémů máte nasazených a zda má kdo nového člověka uvést do prostředí.' },
    { q: 'Jaký je rozdíl mezi technikem automatizace a údržbářem?', a: 'Hranice se v praxi překrývají a v menších provozech jde často o jednoho člověka. Podstatný je poměr mezi diagnostikou a zásahy do řídicí části. Obsazování údržby popisujeme samostatně.' },
    { q: 'Uvádíte mzdové úrovně těchto pozic?', a: 'Ne. Mzdové údaje nevymýšlíme. Orientaci poskytuje Informační systém o průměrném výdělku (ISPV) provozovaný MPSV, kde lze pracovat s údaji podle profese a regionu.' },
    { q: 'Dá se tato pozice obsadit ze zahraničí?', a: 'Ano, s tím, že u dokladů ze zahraničí je potřeba ověřit, zda a jak se uznávají pro danou činnost. Této otázce se věnuje samostatná stránka o uznávání kvalifikace.' },
  ],
  sources: [SRC.nvElektrotechnika, SRC.zakonVyhrazenaZarizeni, SRC.zakonikPrace, SRC.nsp, SRC.ispv],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
    { href: '/nabor-elektrikaru', label: 'Nábor elektrikářů' },
    { href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' },
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
    { href: '/uznavani-kvalifikace-zahranicnich-pracovniku', label: 'Uznávání kvalifikace zahraničních pracovníků' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// ENGINEERING ROLES
// ──────────────────────────────────────────────────────────────────────────

export const TECHNICTI_INZENYRI: SeoPage = {
  slug: 'technicti-inzenyri',
  breadcrumbLabel: 'Techničtí inženýři',
  eyebrow: 'Nábor · Inženýrské pozice',
  title: 'Techničtí inženýři: proč název pozice o kandidátovi nic neřekne',
  heroSubtitle:
    'Procesní, výrobní, průmyslový nebo konstrukční inženýr mohou znamenat velmi odlišnou práci. Jak rozlišit, koho hledáte, a co u inženýrských pozic v Česku skutečně podléhá regulaci.',
  description:
    'Inženýrské pozice ve výrobě – jak rozlišit procesní, výrobní a průmyslové inženýrství, co podléhá autorizaci a jak sestavit zadání, které dává smysl.',
  keywords: ['nábor inženýrů', 'procesní inženýr', 'výrobní inženýr', 'průmyslový inženýr', 'technické pozice ve výrobě', 'inženýrské profese'],
  intro:
    'Slovo inženýr se v českých provozech používá pro role, které spolu mají společné jen to, že se zabývají technikou. Jeden zlepšuje průběh výroby, druhý řeší náběh nového produktu, třetí navrhuje uspořádání pracoviště a čtvrtý se stará o měření a data. Zadání, které říká pouze „hledáme inženýra do výroby“, proto obvykle přinese uchazeče, kteří spolu nejsou srovnatelní. Tato stránka pomáhá pojmenovat, o kterou z těchto rolí vám skutečně jde, a upozorňuje na jeden rozdíl, který se v náboru běžně přehlíží – kdy je titul inženýra jen označením a kdy jde o regulovanou činnost.',
  sections: [
    {
      heading: 'Čtyři odlišné světy pod jedním názvem',
      body: [
        'V praxi se dají inženýrské role ve výrobě rozdělit podle toho, k čemu se váže jejich výsledek. Procesní inženýrství se točí kolem toho, jak výroba probíhá a proč se chová, jak se chová. Výrobní inženýrství stojí blíž náběhům a změnám – zavedení nového dílu, přesun linky, úprava postupu.',
        'Průmyslové inženýrství se zabývá organizací práce, kapacitami a tokem materiálu. Konstrukce a technologie tvoří samostatnou skupinu, které se věnuje vlastní stránka. Tyto světy se překrývají, ale těžiště mají jinde a kandidáti se mezi nimi nepřesouvají automaticky.',
      ],
      bullets: [
        'Procesní inženýrství – stabilita a chování výrobního procesu',
        'Výrobní inženýrství – náběhy, změny, zavádění do výroby',
        'Průmyslové inženýrství – organizace práce, kapacity, tok materiálu',
        'Konstrukce a technologie – návrh a příprava výroby',
      ],
    },
    {
      heading: 'Kdy je inženýr regulovaná činnost a kdy jen označení',
      body: [
        'Toto je rozdíl, který stojí za to znát, protože bývá zdrojem nedorozumění.',
        'REGULOVANÁ ČINNOST: autorizace ve výstavbě podle zákona č. 360/1992 Sb. se vztahuje na vybrané činnosti ve výstavbě a projektování. Kdo takovou činnost vykonává, potřebuje autorizaci – a to je právní požadavek, nikoli zvyklost.',
        'POUHÉ OZNAČENÍ: u naprosté většiny inženýrských pozic ve zpracovatelském průmyslu žádná obdobná regulace neexistuje. Označení „procesní inženýr“ nebo „výrobní inženýr“ je název pracovní pozice, který si určuje zaměstnavatel. Z toho plyne praktický důsledek: dva kandidáti se stejným názvem pozice v životopise mohli dělat zcela odlišnou práci, a titul sám o sobě nic negarantuje.',
        'Popis rolí a jejich obvyklých požadavků zveřejňuje Národní soustava povolání; pro profesní kvalifikace slouží Národní soustava kvalifikací podle zákona č. 179/2006 Sb.',
      ],
    },
    {
      heading: 'Vzdělání versus praxe',
      body: [
        'U inženýrských pozic se často automaticky požaduje vysokoškolské technické vzdělání. V řadě provozů je to opodstatněné, jinde jde spíš o zvyklost, která zbytečně vyřadí zkušené lidi, kteří se k roli dopracovali z výroby.',
        'Užitečnější než stupeň vzdělání bývá otázka, jaký typ problému má člověk umět samostatně rozebrat. Pokud pozice stojí na statistickém vyhodnocování a práci s daty, formální průprava dává smysl. Pokud stojí na znalosti konkrétní technologie a schopnosti prosadit změnu v provozu, rozhoduje spíš praxe a to, jak člověk komunikuje s mistry a operátory.',
      ],
    },
    {
      heading: 'Co má obsahovat zadání',
      body: [
        'Inženýrské pozice se obsazují lépe, když zadání popisuje výsledek, nikoli seznam nástrojů. Formulace „hledáme někoho, kdo sníží počet neshodných kusů na lince X“ je pro vyhledávání použitelnější než výčet metodik.',
        'Stejně důležité je uvést, s kým bude člověk pracovat a jaké má pravomoci. Inženýr, který má měnit zaběhnutý postup, ale nemá oporu ve vedení provozu, obvykle skončí dřív, než se změna projeví. Tuto informaci kandidáti při rozhodování zohledňují.',
      ],
      bullets: [
        'Jaký konkrétní výsledek se od role očekává',
        'Kdo je zadavatel a kdo o změně rozhoduje',
        'Zda jde o roli projektovou, nebo o trvalou agendu',
        'Jak velká část práce probíhá přímo v provozu',
      ],
    },
    {
      heading: 'Odkud tito lidé přicházejí',
      body: [
        'Inženýrské pozice se obsazují ze tří zdrojů: povýšením zevnitř, přechodem z jiného provozu v témže oboru a přechodem z jiného odvětví. Každý zdroj má jinou nevýhodu, kterou je dobré předem znát.',
        'Člověk zevnitř zná provoz a lidi, ale nemusí mít metodu. Kandidát z jiné firmy v oboru přináší srovnání, ale očekává obdobné podmínky. Kandidát z jiného odvětví přináší jiný pohled, potřebuje ale čas na pochopení technologie – a právě tato doba bývá v zadání podceněná.',
      ],
    },
  ],
  faq: [
    { q: 'Musí mít inženýr ve výrobě vysokou školu?', a: 'Ze zákona ne. U většiny inženýrských pozic ve zpracovatelském průmyslu jde o název pozice, nikoli o regulovanou činnost. Výjimkou jsou vybrané činnosti ve výstavbě, kde se uplatní autorizace podle zákona č. 360/1992 Sb.' },
    { q: 'Jaký je rozdíl mezi procesním a výrobním inženýrem?', a: 'Procesní inženýrství se soustředí na chování a stabilitu procesu, výrobní inženýrství na náběhy a změny. V menších firmách je to jedna role, ve větších dvě oddělené. V zadání je proto vhodné popsat očekávaný výsledek.' },
    { q: 'Jak poznáme, že kandidát skutečně dělal to, co uvádí?', a: 'Nejspolehlivější je nechat ho popsat jeden konkrétní případ od zadání po výsledek – co měřil, co změnil a jak se to projevilo. Obecné metodiky se naučí rychleji než schopnost prosadit změnu v provozu.' },
    { q: 'Uvádíte platy inženýrských pozic?', a: 'Ne. Konkrétní mzdové úrovně zde neuvádíme. Orientaci podle profese a regionu poskytuje ISPV; celkové náklady na pozici si můžete propočítat v naší kalkulačce.' },
  ],
  sources: [SRC.nsp, SRC.nsk, SRC.zakonDalsiVzdelavani, SRC.zakonikPrace, SRC.ispv],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/technologove-a-konstrukteri', label: 'Technologové a konstruktéři' },
    { href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' },
    { href: '/thp-pozice', label: 'THP pozice' },
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
    { href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// TECHNOLOGISTS & DESIGNERS
// ──────────────────────────────────────────────────────────────────────────

export const TECHNOLOGOVE_A_KONSTRUKTERI: SeoPage = {
  slug: 'technologove-a-konstrukteri',
  breadcrumbLabel: 'Technologové a konstruktéři',
  eyebrow: 'Nábor · Příprava výroby',
  title: 'Technologové a konstruktéři: dvě role, které se často zaměňují',
  heroSubtitle:
    'Konstruktér navrhuje, co se má vyrobit. Technolog určuje, jak se to vyrobí. Rozdíl mezi nimi rozhoduje o tom, koho vlastně hledáte – a podle čeho kandidáty posuzovat.',
  description:
    'Technolog a konstruktér – čím se liší, co znamená technická příprava výroby a jak posuzovat práci s výkresovou dokumentací a CAD/CAM systémy.',
  keywords: ['nábor technologa', 'konstruktér', 'technická příprava výroby', 'CAD CAM', 'výkresová dokumentace', 'TPV'],
  intro:
    'Technolog a konstruktér patří k rolím, které se v inzerátech zaměňují nejčastěji, přestože jejich práce začíná na opačných koncích. Konstruktér odpovídá za to, jak má díl vypadat a co má splňovat. Technolog odpovídá za to, jak se takový díl v konkrétním provozu skutečně vyrobí – jakým postupem, na jakém stroji, s jakým nástrojem a v jakém čase. Zaměnit je znamená hledat člověka s úplně jinou zkušeností. Tato stránka rozebírá, čím se obě role liší, co v nich lze ověřit a co už závisí na vybavení a zvyklostech vašeho provozu.',
  sections: [
    {
      heading: 'Kde jedna role končí a druhá začíná',
      body: [
        'Konstruktér pracuje s požadavkem na funkci a výsledkem jeho práce je dokumentace popisující díl nebo sestavu – tvar, rozměry, materiál, tolerance, požadavky na povrch.',
        'Technolog přebírá tuto dokumentaci a převádí ji do výrobního postupu. Řeší volbu stroje a nástroje, upnutí, pořadí operací, časy a to, zda je díl v daném provozu vůbec vyrobitelný hospodárně. Právě tady vzniká zpětná vazba ke konstrukci – technolog je často první, kdo upozorní, že navržený tvar se bude vyrábět obtížně.',
        'V menších firmách obě role splývají do jedné a v zadání je pak potřeba říct, která část převažuje.',
      ],
    },
    {
      heading: 'Technická příprava výroby jako samostatná disciplína',
      body: [
        'Technická příprava výroby zahrnuje víc než tvorbu postupu. Patří sem správa dokumentace a jejích verzí, evidence změn, nástrojové hospodářství, normy spotřeby času a součinnost s nákupem a kvalitou.',
        'Pro nábor z toho plyne jedna praktická věc: kandidát, který vytvářel postupy pro kusovou výrobu, řešil něco jiného než člověk z velkosériového provozu. V kusové výrobě rozhoduje rychlost přípravy a univerzálnost, v sérii se vyplatí optimalizovat i drobnosti. Tento rozdíl je vhodné v zadání pojmenovat.',
      ],
      bullets: [
        'Tvorba a údržba výrobních postupů',
        'Správa dokumentace, verzí a změnového řízení',
        'Volba nástrojů a jejich evidence',
        'Normování času a součinnost s plánováním',
      ],
    },
    {
      heading: 'Výkresová dokumentace jako hlavní ověřitelná dovednost',
      body: [
        'Práce s výkresem je u obou rolí to nejlépe ověřitelné, co lze při výběru posoudit. Nejde jen o čtení rozměrů, ale o porozumění tolerancím, předepsané jakosti povrchu a geometrickým požadavkům.',
        'SCREENINGOVÁ ÚVAHA: praktické ověření nad reálným výkresem z vašeho provozu řekne během chvíle víc než výčet programů v životopise. Zároveň je férové vůči kandidátům, kteří pracovali v jiném systému, ale řemeslu rozumějí.',
      ],
    },
    {
      heading: 'CAD a CAM systémy: požadavek provozu, ne oboru',
      body: [
        'SPECIFIKUM PROVOZU: konkrétní CAD nebo CAM systém si volí firma. Žádný předpis ho nestanovuje a mezi systémy se přechází snáz, než se obvykle předpokládá – zvlášť u zkušených lidí, kteří rozumějí tomu, co po systému chtějí.',
        'Rozhodující je, zda má provoz kapacitu na zaučení. Pokud technolog nastupuje jako jediný a má okamžitě přebírat zakázky, znalost konkrétního prostředí má váhu. Pokud nastupuje do zavedeného týmu, je pružnější požadovat rozumění postupu a ochotu se doučit.',
        'Podobně je to se systémy pro správu dat o výrobku. Zkušenost s nimi je výhodou, ale bývá vázaná na konkrétní nasazení a nedá se přenášet mechanicky.',
      ],
    },
    {
      heading: 'Jak zadání zúžit smysluplně',
      body: [
        'Nejčastější chybou je zadání, které vyjmenuje všechny systémy používané ve firmě a všechny typy výroby. Vznikne profil, kterému nikdo neodpovídá.',
        'Lepší je popsat, co bude člověk dělat první tři měsíce, a k tomu uvést, co je nutné umět hned a co se lze doučit. Toto rozdělení zároveň usnadní samotný pohovor – ptáte se pak na věci, které skutečně rozhodují.',
      ],
      bullets: [
        'Převažuje konstrukce, nebo příprava výroby',
        'Kusová, malosériová, nebo sériová výroba',
        'Které dovednosti jsou nutné od prvního dne',
        'Kdo předává zadání a kdo přebírá výsledek',
      ],
    },
  ],
  faq: [
    { q: 'Je technolog totéž co konstruktér?', a: 'Ne. Konstruktér odpovídá za návrh dílu a jeho dokumentaci, technolog za způsob, jakým se díl v daném provozu vyrobí. V menších firmách se role spojují, v zadání je pak vhodné uvést, která část převažuje.' },
    { q: 'Je nutná znalost konkrétního CAD systému?', a: 'Nevyplývá z žádného předpisu, jde o požadavek provozu. Zkušení lidé mezi systémy přecházejí, otázkou je, zda máte kapacitu na zaučení a jak rychle má člověk přebírat samostatnou práci.' },
    { q: 'Jak ověřit skutečnou úroveň kandidáta?', a: 'Nejspolehlivější je krátké praktické ověření nad reálným výkresem z vašeho provozu, doplněné rozhovorem o tom, jak by kandidát postupoval. Ověřuje to porozumění, ne znalost prostředí.' },
    { q: 'Hledáme technologa i konstruktéra v jedné osobě. Je to reálné?', a: 'V menších provozech to běžné je, u složitější výroby to zpravidla znamená ústupek v jedné z obou částí. Vyplatí se předem určit, která z nich je pro vás důležitější.' },
  ],
  sources: [SRC.nsp, SRC.nsk, SRC.zakonDalsiVzdelavani, SRC.zakonikPrace, SRC.ispv],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/technicti-inzenyri', label: 'Techničtí inženýři' },
    { href: '/thp-pozice', label: 'THP pozice' },
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
    { href: '/nabor-cnc-operatoru', label: 'Nábor CNC operátorů a seřizovačů' },
    { href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// PROCUREMENT & SUPPLY
// ──────────────────────────────────────────────────────────────────────────

export const NAKUP_A_ZASOBOVANI: SeoPage = {
  slug: 'nakup-a-zasobovani',
  breadcrumbLabel: 'Nákup a zásobování',
  eyebrow: 'Nábor · Nákup a zásobování',
  title: 'Nákup a zásobování: obsazování pozic, kde rozhoduje odpovědnost',
  heroSubtitle:
    'Nákupčí, plánovač zásob a strategický nákup jsou tři různé role s odlišnou mírou rozhodovací pravomoci. Jak je rozlišit a co u nich při výběru skutečně ověřovat.',
  description:
    'Nábor do nákupu a zásobování – rozdíl mezi operativním nákupem, plánováním zásob a strategickým nákupem a co u těchto pozic ověřovat při výběru.',
  keywords: ['nábor nákupčího', 'zásobování', 'strategický nákup', 'plánovač zásob', 'dodavatelé', 'nákupní oddělení'],
  intro:
    'Nákup patří k oblastem, kde se název pozice a skutečná odpovědnost rozcházejí nejvíc. Pod označením nákupčí se skrývá jak člověk, který objednává podle plánu a hlídá termíny, tak člověk, který vybírá dodavatele a vyjednává rámcové podmínky na roky dopředu. Rozdíl mezi nimi není ve zkušenosti, ale v míře rozhodovací pravomoci – a právě ta rozhoduje o tom, koho má smysl oslovovat. Tato stránka pomáhá pozici vymezit a upozorňuje na to, co lze u kandidátů ověřit a co zůstává vázané na konkrétní firmu a její dodavatelský řetězec.',
  sections: [
    {
      heading: 'Tři úrovně, které se sdružují pod jedním názvem',
      body: [
        'Operativní nákup pracuje uvnitř zadaných pravidel: objednává podle potřeb výroby, hlídá potvrzení a termíny, řeší urgence a odchylky. Rozhoduje o průběhu, nikoli o tom, od koho se nakupuje.',
        'Plánování zásob stojí mezi nákupem a výrobou. Určuje, kolik čeho a kdy má být k dispozici, a nese důsledky obou chyb – zastavené výroby i zbytečně vázaných peněz v zásobách.',
        'Strategický nákup vybírá dodavatele, vyjednává podmínky a nese odpovědnost za dodavatelské riziko. Tato role vyžaduje jiný typ člověka a bývá také jinak ohodnocená.',
      ],
      bullets: [
        'Operativní nákup – objednávky, termíny, urgence',
        'Plánování zásob – množství, časování, vázané prostředky',
        'Strategický nákup – výběr dodavatele, podmínky, riziko',
      ],
    },
    {
      heading: 'Co je znalost oboru a co se dá naučit',
      body: [
        'ZVYKLOST OBORU: znalost konkrétní komoditní skupiny – hutní materiál, plasty, elektronické součástky, obalové materiály – má reálnou váhu. Kdo roky nakupoval odlitky, rozumí tomu, kde vznikají problémy s termíny a jakostí, a to se rychle nedohání.',
        'SPECIFIKUM FIRMY: konkrétní podnikový systém, nastavení schvalovacích pravidel, historie vztahů s dodavateli. Nic z toho kandidát nemůže znát předem a je to otázka zapracování, nikoli výběru.',
        'Praktický důsledek pro zadání: požadovat znalost komodity dává smysl, požadovat znalost systému obvykle zbytečně zužuje okruh lidí.',
      ],
    },
    {
      heading: 'Kde nákup naráží na kvalitu a logistiku',
      body: [
        'Nákup nefunguje odděleně. Při reklamacích vůči dodavateli se prolíná s řízením kvality, u dovozu s celní problematikou a dopravou, u plánování s výrobou.',
        'Pro nábor to znamená, že se vyplatí zjistit, jaká část těchto styčných ploch spadá do role. Firma, kde nákupčí sám řeší reklamace a hodnocení dodavatelů, hledá jiného člověka než firma, kde tuto agendu vede kvalita.',
      ],
    },
    {
      heading: 'Co se dá při výběru skutečně ověřit',
      body: [
        'U nákupu se špatně ověřují dovednosti, o kterých se nejvíc mluví. Vyjednávání se z životopisu poznat nedá a obecné otázky na ně nepomohou.',
        'Použitelnější je nechat kandidáta popsat konkrétní situaci, kdy dodavatel nedodržel termín nebo jakost – co udělal, koho zapojil a jak to dopadlo. Odpověď ukáže, zda uvažuje v souvislostech provozu, nebo jen administruje objednávky.',
      ],
      bullets: [
        'Popis konkrétního výpadku dodávky a řešení',
        'Zkušenost s danou komoditní skupinou',
        'Rozsah samostatného rozhodování v předchozí roli',
        'Zkušenost s hodnocením a auditem dodavatelů',
        'Jazyková vybavenost, pokud jde o zahraniční dodavatele',
      ],
    },
    {
      heading: 'Dodavatelské riziko jako samostatná dovednost',
      body: [
        'Nákup se hodnotí podle ceny, ale poznat se dá podle toho, jak zvládá výpadky. Právě práce s dodavatelským rizikem odlišuje zkušeného člověka od toho, kdo umí jen objednávat.',
        'Patří sem sledování finanční kondice dodavatele, vědomí, kde je firma závislá na jediném zdroji, příprava záložní varianty dřív, než je potřeba, a schopnost rozpoznat varovné signály v komunikaci nebo v postupném zhoršování termínů.',
        'ZVYKLOST OBORU: v dodavatelských řetězcích s doloženou jakostí bývá součástí role i hodnocení a audit dodavatelů. Rozsah se liší podle odvětví a podle požadavků odběratelů; není to zákonná povinnost nákupu, ale u řady zákazníků smluvní podmínka.',
      ],
      bullets: [
        'Přehled o tom, kde je firma závislá na jediném dodavateli',
        'Připravená záložní varianta u kritických položek',
        'Hodnocení dodavatelů a jeho pravidelnost',
        'Reakce na postupné zhoršování termínů, ne až na výpadek',
      ],
    },
    {
      heading: 'Jak roli popsat v zadání',
      body: [
        'Nejspolehlivější způsob, jak si zadání ujasnit, je odpovědět na jedinou otázku: o čem tento člověk rozhoduje sám a co předkládá ke schválení. Odpověď vymezí roli přesněji než jakýkoli název pozice.',
        'K tomu stačí doplnit, s jakými komoditami se pracuje, zda jde o tuzemské, nebo zahraniční dodavatele, a kdo je v procesu protistranou uvnitř firmy.',
      ],
    },
  ],
  faq: [
    { q: 'Jaký je rozdíl mezi nákupčím a strategickým nákupem?', a: 'Rozhodovací pravomocí. Operativní nákup pracuje uvnitř zadaných pravidel a hlídá průběh, strategický nákup vybírá dodavatele a vyjednává podmínky. Rozdíl je vhodné popsat přímo v zadání.' },
    { q: 'Je nutná znalost konkrétního podnikového systému?', a: 'Zpravidla ne. Systém je specifikum firmy a patří do zapracování. Podstatnější bývá znalost komoditní skupiny, kterou nelze rychle dohnat.' },
    { q: 'Patří do nákupu i celní agenda?', a: 'Záleží na firmě. U dovozu ze třetích zemí se nákup s celní problematikou potkává, samotné celní odbavení ale často zajišťuje logistika nebo externí zástupce. Rozdělení je vhodné vymezit předem.' },
    { q: 'Uvádíte obvyklé mzdy v nákupu?', a: 'Ne. Konkrétní částky zde neuvádíme. Orientaci podle profese a regionu poskytuje ISPV provozovaný MPSV.' },
  ],
  sources: [SRC.nsp, SRC.nsk, SRC.zakonikPrace, SRC.ispv, SRC.czso],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/odborne-pozice-v-logistice', label: 'Odborné pozice v logistice' },
    { href: '/thp-pozice', label: 'THP pozice' },
    { href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const TECHNICAL_TALENT_PAGES: ReadonlyArray<SeoPage> = [
  NABOR_TECHNIKU_AUTOMATIZACE,
  TECHNICTI_INZENYRI,
  TECHNOLOGOVE_A_KONSTRUKTERI,
  NAKUP_A_ZASOBOVANI,
]
