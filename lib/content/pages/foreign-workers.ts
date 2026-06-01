// Foreign workers authority cluster — topical depth around the cornerstone
// /zamestnavani-cizincu. Each page targets one specific, source-backed topic
// (cards & documents, employer compliance, practical employment, country
// orientation, glossary/FAQ) and links back to the pillar and across the
// cluster. All content is qualitative and source-backed: no invented rates,
// amounts, fees, processing times, statistics, approval odds or guarantees.
// Where a value is variable, pages use cautious language and point to the
// official source instead of printing a number that could become stale.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-06-01'

const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}

// Shared cluster anchors so every page links upward and to the hubs.
const cornerstoneLink = { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' }
const faqHubLink = { href: '/faq-zamestnavani-cizincu', label: 'FAQ: zaměstnávání cizinců v ČR' }
const verifyHubLink = { href: '/kde-overit-informace-pro-cizince', label: 'Kde ověřit informace pro cizince' }
const glossaryLink = { href: '/slovnik-pojmu-zamestnavani-cizincu', label: 'Slovník pojmů k zaměstnávání cizinců' }

const consultCta = {
  eyebrow: 'Nábor a administrativa',
  title: 'Potřebujete s tím pomoci?',
  text: 'Pomůžeme vám s náborem i s orientací v administrativě tak, aby vše odpovídalo aktuálním pravidlům a oficiálním zdrojům.',
  buttonLabel: 'Domluvit konzultaci',
  href: '/contact',
}

const hireCta = {
  eyebrow: 'Nábor pracovníků',
  title: 'Hledáte zahraniční pracovníky?',
  text: 'Pomůžeme vám s náborem od definice potřeby až po nástup a postaráme se o koordinaci administrativy v souladu s předpisy.',
  buttonLabel: 'Poslat poptávku',
  href: '/submit-offer',
}

// ──────────────────────────────────────────────────────────────────────────
// LEVEL 2 — DOCUMENTS & CARDS
// ──────────────────────────────────────────────────────────────────────────

export const JAK_ZISKAT_ZAMESTNANECKOU_KARTU: SeoPage = {
  slug: 'jak-ziskat-zamestnaneckou-kartu',
  breadcrumbLabel: 'Jak získat zaměstnaneckou kartu',
  eyebrow: 'Pracovní právo · Cizinci',
  title: 'Jak získat zaměstnaneckou kartu v ČR',
  heroSubtitle:
    'Praktický průchod krok za krokem: od nahlášení volného místa přes podání žádosti až po nástup. Obecné informace s odkazy na oficiální zdroje, nikoli právní poradenství.',
  description:
    'Jak získat zaměstnaneckou kartu v ČR krok za krokem – nahlášení volného místa, podání žádosti u MV ČR, přílohy a nástup. Postup vysvětlený obecně, bez vymyšlených lhůt a poplatků.',
  keywords: ['jak získat zaměstnaneckou kartu', 'žádost zaměstnanecká karta', 'zaměstnanecká karta postup', 'volné místo evidence', 'OAMP', 'třetí země'],
  intro:
    'Získání zaměstnanecké karty je řízení, které propojuje zaměstnavatele, pracovníka a dva úřady – Úřad práce ČR a Ministerstvo vnitra. Tato stránka popisuje obvyklý sled kroků tak, jak na sebe v praxi navazují, aby si zaměstnavatel i kandidát udělali realistickou představu o průběhu. Neuvádíme konkrétní lhůty, poplatky ani seznam příloh do posledního dokladu, protože se mohou měnit; u těchto údajů odkazujeme na příslušný úřad. Cílem je srozumitelný procesní rámec, ne výčet, který by mohl zastarat.',
  sections: [
    {
      heading: 'Než žádost vznikne: volné místo a nabídka',
      body: [
        'Prvním krokem bývá obsazované pracovní místo, které je zařazené do evidence míst obsaditelných držitelem zaměstnanecké karty. Zaměstnavatel volné místo nahlašuje Úřadu práce ČR a s kandidátem si ujasní pozici, odměnu a podmínky.',
        'Teprve s konkrétní pracovní nabídkou nebo smlouvou má smysl připravovat žádost. Bez doloženého místa řízení obvykle nezačíná.',
      ],
      bullets: [
        'Volné místo zařazené do evidence Úřadu práce ČR',
        'Pracovní smlouva nebo příslib zaměstnání',
        'Ujasnění pozice, odměny a místa výkonu práce',
      ],
    },
    {
      heading: 'Podání žádosti a doložení podkladů',
      body: [
        'Žádost o zaměstnaneckou kartu podává pracovník, zpravidla na zastupitelském úřadu ČR v zahraničí nebo – je-li to v jeho situaci možné – na pracovišti Ministerstva vnitra. O žádosti rozhoduje Ministerstvo vnitra, Odbor azylové a migrační politiky (OAMP).',
        'K žádosti se dokládají podklady, mezi které obvykle patří cestovní doklad, doklad o účelu pobytu (smlouva nebo příslib), doklad o kvalifikaci, je-li vyžadován, a doklad o zajištění ubytování. Závazný a aktuální seznam příloh zveřejňuje Ministerstvo vnitra.',
      ],
    },
    {
      heading: 'Rozhodnutí, převzetí a nástup',
      body: [
        'Po posouzení žádosti úřad rozhodne. Při kladném výsledku pracovník kartu převezme a teprve poté může legálně začít pracovat. Zahájení práce před nabytím platnosti karty se může posuzovat jako nelegální práce.',
        'Pro zaměstnavatele je proto klíčové vázat nástup na potvrzenou platnost karty a od počátku hlídat termíny pro pozdější prodloužení a oznamovací povinnosti.',
      ],
    },
  ],
  faq: [
    { q: 'Kdo žádost o zaměstnaneckou kartu podává?', a: 'Žádost podává sám pracovník, zpravidla na zastupitelském úřadu ČR v zahraničí. Rozhoduje o ní Ministerstvo vnitra (OAMP). Zaměstnavatel zajišťuje volné místo v evidenci a podklady ze své strany.' },
    { q: 'Jak dlouho vyřízení trvá a kolik stojí?', a: 'Konkrétní lhůty a poplatky tato stránka neuvádí, protože se mohou měnit. Aktuální hodnoty zveřejňuje Ministerstvo vnitra; doporučujeme z nich vždy vycházet.' },
    { q: 'Může pracovník nastoupit hned po podání žádosti?', a: 'Zpravidla ne. Práci lze zahájit až po nabytí platnosti karty. Dřívější nástup se může posuzovat jako nelegální práce.' },
    { q: 'Co když se v průběhu řízení změní pozice?', a: 'Změny je vhodné řešit včas a správným postupem u příslušného úřadu. Konkrétní situaci ověřte u Ministerstva vnitra, podmínky se mohou lišit.' },
  ],
  sources: [SRC.zakonOPobytuCizincu, SRC.zakonOZamestnanosti, SRC.mvcr, SRC.upcr],
  internalLinks: [
    cornerstoneLink,
    { href: '/zamestnanecka-karta-2026', label: 'Zaměstnanecká karta podrobně' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Jaké dokumenty jsou potřeba' },
    { href: '/prodlouzeni-zamestnanecke-karty', label: 'Prodloužení zaměstnanecké karty' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRODLOUZENI_ZAMESTNANECKE_KARTY: SeoPage = {
  slug: 'prodlouzeni-zamestnanecke-karty',
  breadcrumbLabel: 'Prodloužení zaměstnanecké karty',
  eyebrow: 'Pracovní právo · Cizinci',
  title: 'Prodloužení zaměstnanecké karty: základní přehled',
  heroSubtitle:
    'Kdy a jak se zaměstnanecká karta prodlužuje, na co myslet u termínů a jaké podklady bývají potřeba. Obecné informace s odkazy na oficiální zdroje.',
  description:
    'Prodloužení zaměstnanecké karty v ČR – kdy o ně žádat, jaké podklady bývají potřeba a proč hlídat termíny. Přehled bez konkrétních lhůt a poplatků, ty ověřte u MV ČR.',
  keywords: ['prodloužení zaměstnanecké karty', 'platnost zaměstnanecké karty', 'žádost o prodloužení', 'termín prodloužení', 'OAMP', 'pobyt cizinců'],
  intro:
    'Zaměstnanecká karta se vydává na časově omezené období a před jeho koncem je obvykle možné požádat o prodloužení, pokud trvá důvod pobytu i zaměstnání. Pro zaměstnavatele i pracovníka je nejdůležitější včasnost: zmeškaný termín může vést k přerušení oprávnění a tím i k nutnosti přerušit práci. Tato stránka shrnuje, jak prodloužení obvykle funguje a na co si dát pozor. Konkrétní lhůty pro podání, poplatky a přesný seznam příloh záměrně neuvádíme – stanovuje je právní úprava a aktuální hodnoty zveřejňuje Ministerstvo vnitra.',
  sections: [
    {
      heading: 'Kdy o prodloužení žádat',
      body: [
        'O prodloužení se žádá v určitém období před skončením platnosti karty, ještě za jejího trvání. Cílem je zajistit návaznost oprávnění bez prodlevy. Konkrétní časové rozmezí pro podání stanovuje právní úprava; ověřte je u Ministerstva vnitra.',
        'Předpokladem prodloužení obvykle je, že trvá účel – tedy pokračující zaměstnání u zaměstnavatele a platná pracovní smlouva či její pokračování.',
      ],
    },
    {
      heading: 'Co je obvykle potřeba doložit',
      body: [
        'K žádosti o prodloužení se zpravidla dokládají aktuální podklady prokazující pokračující účel pobytu a zaměstnání a doklad o zajištění ubytování. Přesnou sadu a její podobu stanovuje úřad.',
      ],
      bullets: [
        'Doklad o pokračujícím zaměstnání (smlouva nebo její pokračování)',
        'Platný cestovní doklad',
        'Doklad o zajištění ubytování',
        'Další přílohy podle požadavku úřadu',
      ],
    },
    {
      heading: 'Proč je důležité hlídat termíny',
      body: [
        'Pozdní podání žádosti může znamenat, že oprávnění mezitím skončí a pracovník nesmí dál pracovat, dokud není situace vyřešena. Pro zaměstnavatele je proto vhodné vést přehled platnosti karet svých zaměstnanců a termíny pro prodloužení sledovat s rezervou.',
        'U agenturního zaměstnávání tuto evidenci obvykle vede agentura jako formální zaměstnavatel, vždy však ve spolupráci s uživatelem.',
      ],
    },
  ],
  faq: [
    { q: 'Kdy se podává žádost o prodloužení?', a: 'V období před skončením platnosti karty, ještě za jejího trvání. Konkrétní časové rozmezí stanovuje právní úprava – ověřte je u Ministerstva vnitra.' },
    { q: 'Co se stane, když termín zmeškám?', a: 'Oprávnění může skončit a pracovník nesmí dál pracovat, dokud se situace nevyřeší. Proto doporučujeme sledovat termíny s rezervou.' },
    { q: 'Mohu během řízení o prodloužení pracovat?', a: 'Záleží na konkrétní situaci a na tom, zda byla žádost podána včas. Postup a důsledky ověřte u Ministerstva vnitra, podmínky se mohou lišit.' },
  ],
  sources: [SRC.zakonOPobytuCizincu, SRC.zakonOZamestnanosti, SRC.mvcr, SRC.upcr],
  internalLinks: [
    cornerstoneLink,
    { href: '/jak-ziskat-zamestnaneckou-kartu', label: 'Jak získat zaměstnaneckou kartu' },
    { href: '/zamestnanecka-karta-2026', label: 'Zaměstnanecká karta podrobně' },
    { href: '/zmena-zamestnavatele-zamestnanecka-karta', label: 'Změna zaměstnavatele při kartě' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const ZMENA_ZAMESTNAVATELE_ZAMESTNANECKA_KARTA: SeoPage = {
  slug: 'zmena-zamestnavatele-zamestnanecka-karta',
  breadcrumbLabel: 'Změna zaměstnavatele při kartě',
  eyebrow: 'Pracovní právo · Cizinci',
  title: 'Změna zaměstnavatele při zaměstnanecké kartě',
  heroSubtitle:
    'Co dělat, když držitel zaměstnanecké karty mění zaměstnavatele nebo pozici. Vysvětlení vazby karty na konkrétní místo a obvyklého postupu. Obecné informace.',
  description:
    'Změna zaměstnavatele u zaměstnanecké karty v ČR – proč je karta vázaná na místo, kdy je nutné oznámení nebo souhlas a na co si dát pozor. Přehled s odkazy na oficiální zdroje.',
  keywords: ['změna zaměstnavatele zaměstnanecká karta', 'změna pozice karta', 'oznámení změny OAMP', 'vázanost karty na místo', 'pobyt cizinců', 'zaměstnanecká karta'],
  intro:
    'Zaměstnanecká karta je vázaná na konkrétní pracovní místo u konkrétního zaměstnavatele. Když chce držitel karty změnit zaměstnavatele, pozici nebo některé další údaje, není to jen interní personální krok – obvykle to vyžaduje součinnost s Ministerstvem vnitra. Tato stránka vysvětluje, proč je karta na místo vázaná a jaký bývá postup při změně, aby se předešlo nechtěnému přerušení oprávnění k práci. Konkrétní lhůty a podmínky se mohou měnit; u nich odkazujeme na příslušný úřad a doporučujeme jejich ověření před samotnou změnou.',
  sections: [
    {
      heading: 'Proč je karta vázaná na konkrétní místo',
      body: [
        'Zaměstnanecká karta se vydává pro konkrétní pracovní pozici, která je zařazená v evidenci volných míst. Tato vazba znamená, že změna zaměstnavatele nebo pozice se dotýká samotného účelu, pro který byla karta vydána.',
        'Proto se na rozdíl od běžné změny zaměstnání u tuzemského pracovníka řeší i administrativní krok vůči Ministerstvu vnitra.',
      ],
    },
    {
      heading: 'Obvyklý postup při změně',
      body: [
        'Podle situace bývá nutné změnu Ministerstvu vnitra oznámit, případně požádat o souhlas se změnou ještě před jejím uskutečněním. Konkrétní režim (oznámení vs. souhlas) a lhůty stanovuje právní úprava a může se měnit.',
        'Dokud není změna úřadem ošetřena, je riskantní práci u nového zaměstnavatele zahájit. I zde platí, že nástup na nové místo by měl navazovat na splnění příslušných podmínek.',
      ],
      bullets: [
        'Ověřit, zda jde o oznámení, nebo o žádost o souhlas',
        'Vyřídit administrativní krok u Ministerstva vnitra včas',
        'Nezahajovat práci u nového zaměstnavatele předčasně',
        'Vést evidenci provedených kroků',
      ],
    },
    {
      heading: 'Na co si dát pozor',
      body: [
        'Nejčastější chybou je nástup u nového zaměstnavatele dříve, než je změna vyřízena. Druhou je zmeškání lhůty pro oznámení. Obojí může mít důsledky pro pracovníka i zaměstnavatele.',
        'U agenturního zaměstnávání je třeba odlišit změnu uživatele (kam je pracovník přidělen) od změny formálního zaměstnavatele. Konkrétní dopady ověřte u Ministerstva vnitra.',
      ],
    },
  ],
  faq: [
    { q: 'Mohu po změně zaměstnavatele nastoupit hned?', a: 'Zpravidla až po vyřízení příslušného administrativního kroku u Ministerstva vnitra. Předčasný nástup je rizikový. Konkrétní podmínky ověřte u úřadu.' },
    { q: 'Jde o oznámení, nebo o žádost o souhlas?', a: 'Záleží na situaci a na aktuální právní úpravě. Tato stránka konkrétní režim neuvádí napevno; ověřte jej u Ministerstva vnitra před provedením změny.' },
    { q: 'Týká se to i změny pracovní pozice u stejného zaměstnavatele?', a: 'Může se týkat i změny pozice, protože karta je vázaná na konkrétní místo. Postup ověřte u Ministerstva vnitra.' },
  ],
  sources: [SRC.zakonOPobytuCizincu, SRC.zakonOZamestnanosti, SRC.mvcr, SRC.upcr],
  internalLinks: [
    cornerstoneLink,
    { href: '/zamestnanecka-karta-2026', label: 'Zaměstnanecká karta podrobně' },
    { href: '/jak-ziskat-zamestnaneckou-kartu', label: 'Jak získat zaměstnaneckou kartu' },
    { href: '/povinnosti-pri-zamestnavani-cizincu', label: 'Povinnosti při zaměstnávání cizinců' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const MODRA_KARTA_VS_ZAMESTNANECKA_KARTA: SeoPage = {
  slug: 'modra-karta-vs-zamestnanecka-karta',
  breadcrumbLabel: 'Modrá vs zaměstnanecká karta',
  eyebrow: 'Pracovní právo · Cizinci',
  title: 'Modrá karta vs zaměstnanecká karta',
  heroSubtitle:
    'Srovnání dvou nejčastějších duálních oprávnění – v čem se modrá a zaměstnanecká karta liší a kdy která dává smysl. Obecné informace s odkazy na oficiální zdroje.',
  description:
    'Modrá karta vs zaměstnanecká karta v ČR – srovnání účelu, cílové skupiny a zaměření. Která je vhodná pro koho. Přehled bez konkrétních lhůt a částek, ty ověřte u MV ČR.',
  keywords: ['modrá karta vs zaměstnanecká karta', 'rozdíl modrá zaměstnanecká karta', 'srovnání karet', 'vysoce kvalifikovaní pracovníci', 'duální oprávnění', 'pobyt cizinců'],
  intro:
    'Modrá karta i zaměstnanecká karta jsou duální oprávnění – obě spojují povolení k pobytu i k práci do jednoho dokladu a obě vydává Ministerstvo vnitra. Liší se ale zaměřením a cílovou skupinou, a právě podle toho se zaměstnavatel rozhoduje, o které oprávnění usilovat. Tato stránka nabízí srozumitelné srovnání obou typů z praktického pohledu. Nejde o vyčerpávající právní rozbor a neuvádí konkrétní podmínky, jako je požadovaná výše odměny u kvalifikovaných pozic – ty se mohou měnit a je nutné je ověřit u Ministerstva vnitra.',
  sections: [
    {
      heading: 'Co mají společné',
      body: [
        'Obě karty jsou duální: v jednom dokladu spojují pobytové i pracovní oprávnění. Obě vydává Ministerstvo vnitra (OAMP) a u obou bývá v úvodu řízení nahlášení volného místa Úřadu práce ČR. U obou platí, že práci lze zahájit až po nabytí platnosti karty.',
      ],
    },
    {
      heading: 'V čem se liší',
      body: [
        'Zaměstnanecká karta je obecnější a používá se pro širokou škálu pozic. Modrá karta cílí na vysoce kvalifikované pracovníky, typicky doloženou vyšší kvalifikací a odpovídající pozicí, a je součástí celoevropského schématu pro modrou kartu.',
        'Z toho plynou rozdíly v podmínkách – například v požadavcích na kvalifikaci a v některých parametrech odměny u kvalifikovaných pozic. Konkrétní hodnoty se mohou měnit; tato stránka je neuvádí.',
      ],
      bullets: [
        'Zaměstnanecká karta – širší okruh pozic',
        'Modrá karta – vysoce kvalifikované pozice',
        'Modrá karta navazuje na evropské schéma a mobilitu v EU',
        'Rozdílné požadavky na kvalifikaci a parametry odměny',
      ],
    },
    {
      heading: 'Kdy která dává smysl',
      body: [
        'Pokud zaměstnavatel obsazuje odbornou pozici a kandidát splňuje kvalifikační předpoklady, připadá v úvahu modrá karta. U běžnějších pozic bývá cestou zaměstnanecká karta. Vhodný typ vždy závisí na konkrétní pozici, kvalifikaci a situaci pracovníka.',
        'Při nejistotě je vhodné porovnat aktuální podmínky obou oprávnění u Ministerstva vnitra ještě před zahájením náboru.',
      ],
    },
  ],
  faq: [
    { q: 'Kdo vydává modrou i zaměstnaneckou kartu?', a: 'Obě vydává Ministerstvo vnitra ČR, Odbor azylové a migrační politiky. V úvodu řízení bývá nahlášení volného místa Úřadu práce ČR.' },
    { q: 'Která karta je pro vysoce kvalifikované pozice?', a: 'Modrá karta cílí na vysoce kvalifikované pracovníky a je součástí evropského schématu. Zaměstnanecká karta je obecnější.' },
    { q: 'Jaké jsou konkrétní podmínky odměny u modré karty?', a: 'Konkrétní parametry tato stránka neuvádí, protože se mohou měnit. Aktuální podmínky ověřte u Ministerstva vnitra.' },
    { q: 'Lze mezi kartami přejít?', a: 'Volba typu oprávnění závisí na pozici a kvalifikaci. Možnosti a postup ověřte u Ministerstva vnitra podle konkrétní situace.' },
  ],
  sources: [SRC.zakonOPobytuCizincu, SRC.blueCardSmernice, SRC.mvcr, SRC.upcr],
  internalLinks: [
    cornerstoneLink,
    { href: '/modra-karta-cr', label: 'Modrá karta pro kvalifikované pracovníky' },
    { href: '/zamestnanecka-karta-2026', label: 'Zaměstnanecká karta podrobně' },
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení' },
    faqHubLink,
    glossaryLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// LEVEL 3 — EMPLOYER COMPLIANCE
// ──────────────────────────────────────────────────────────────────────────

export const POVINNOSTI_PRI_ZAMESTNAVANI_CIZINCU: SeoPage = {
  slug: 'povinnosti-pri-zamestnavani-cizincu',
  breadcrumbLabel: 'Povinnosti při zaměstnávání cizinců',
  eyebrow: 'Compliance · Zaměstnavatelé',
  title: 'Povinnosti při zaměstnávání cizinců',
  heroSubtitle:
    'Co musí zaměstnavatel navíc plnit, když zaměstnává cizince – oznamovací povinnosti, evidence a kontrola oprávnění. Obecné informace, nikoli právní poradenství.',
  description:
    'Povinnosti zaměstnavatele při zaměstnávání cizinců v ČR – kontrola oprávnění před nástupem, oznámení Úřadu práce ČR, evidence a uchování kopií dokladů. Přehled s odkazy na zdroje.',
  keywords: ['povinnosti zaměstnávání cizinců', 'oznamovací povinnost cizinci', 'evidence cizinců', 'Úřad práce ČR oznámení', 'kopie dokladů', 'compliance cizinci'],
  intro:
    'Zaměstnání cizince přináší vedle běžných povinností zaměstnavatele i specifické úkony navíc, které se u tuzemských pracovníků neřeší. Týkají se zejména ověření oprávnění, oznámení vůči Úřadu práce ČR a vedení evidence. Tato stránka shrnuje hlavní povinnosti spojené přímo se zaměstnáváním cizinců, aby zaměstnavatel věděl, na co nezapomenout. Doplňuje obecnou stránku o povinnostech zaměstnavatele a u proměnlivých lhůt odkazuje na oficiální zdroje. Nejde o vyčerpávající právní výčet ani o individuální poradenství.',
  sections: [
    {
      heading: 'Před nástupem: ověření oprávnění',
      body: [
        'Klíčovou povinností je ověřit, že cizinec smí danou práci vykonávat – tedy že má platné pobytové i pracovní oprávnění tam, kde je vyžadováno, a že práce odpovídá jeho oprávnění. Zahájení práce bez platného oprávnění se posuzuje jako nelegální práce.',
        'U cizinců bez volného vstupu na trh práce zaměstnavatel obvykle uchovává kopii dokladu opravňujícího k pobytu po dobu trvání zaměstnání.',
      ],
      bullets: [
        'Kontrola platnosti pobytového i pracovního oprávnění',
        'Soulad pozice s tím, na co je oprávnění vázáno',
        'Uchování kopie dokladu po dobu zaměstnání',
        'Nástup až po nabytí platnosti oprávnění',
      ],
    },
    {
      heading: 'Oznamovací povinnosti a evidence',
      body: [
        'Zaměstnavatel plní vůči Úřadu práce ČR oznamovací a evidenční povinnosti – například ohlášení nástupu, změn a ukončení u vymezených skupin cizinců a vedení evidence. Konkrétní lhůty a způsob podání stanovuje právní úprava a mohou se měnit.',
        'Podle informací úřadů se způsob ohlašování v čase vyvíjí (například přechod na elektronické nástroje), proto je vhodné aktuální postup ověřit u Úřadu práce ČR.',
      ],
    },
    {
      heading: 'Během zaměstnání a při změnách',
      body: [
        'Po nástupu je třeba hlídat platnost oprávnění a termíny prodloužení a hlásit relevantní změny. U zaměstnanecké karty má zvláštní význam vazba na konkrétní místo, takže změny pozice nebo zaměstnavatele se řeší samostatným postupem.',
        'U agenturního zaměstnávání část těchto povinností přebírá agentura jako formální zaměstnavatel, vždy však ve spolupráci s uživatelem.',
      ],
    },
  ],
  faq: [
    { q: 'Co musí zaměstnavatel ověřit před nástupem cizince?', a: 'Že má platné pobytové i pracovní oprávnění tam, kde je vyžadováno, a že práce odpovídá tomuto oprávnění. Bez toho jde o riziko nelegální práce.' },
    { q: 'Komu se zaměstnání cizince oznamuje?', a: 'Oznamovací a evidenční povinnosti se plní vůči Úřadu práce ČR. Konkrétní lhůty a způsob podání ověřte u úřadu, protože se mohou měnit.' },
    { q: 'Musím uchovávat kopie dokladů?', a: 'U cizinců bez volného vstupu na trh práce zaměstnavatel obvykle uchovává kopii dokladu opravňujícího k pobytu po dobu zaměstnání. Rozsah ověřte u Úřadu práce ČR.' },
    { q: 'Platí povinnosti i u agenturních pracovníků?', a: 'Ano. U agenturního zaměstnávání je plní agentura jako formální zaměstnavatel ve spolupráci s uživatelem.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonOPobytuCizincu, SRC.upcr, SRC.mvcr],
  internalLinks: [
    cornerstoneLink,
    { href: '/povinnosti-zamestnavatele', label: 'Obecné povinnosti zaměstnavatele' },
    { href: '/legalizace-prace-cizincu', label: 'Jak zajistit legální zaměstnání cizince' },
    { href: '/nelegalni-zamestnavani-cizincu', label: 'Nelegální zaměstnávání cizinců' },
    { href: '/chyby-pri-zamestnavani-cizincu', label: 'Nejčastější chyby při zaměstnávání cizinců' },
    faqHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NELEGALNI_ZAMESTNAVANI_CIZINCU: SeoPage = {
  slug: 'nelegalni-zamestnavani-cizincu',
  breadcrumbLabel: 'Nelegální zaměstnávání cizinců',
  eyebrow: 'Compliance · Zaměstnavatelé',
  title: 'Nelegální zaměstnávání cizinců: co to je a jak mu předejít',
  heroSubtitle:
    'Co se v ČR rozumí nelegální prací cizinců, jaké má obvyklé podoby a jak jí předcházet. Obecné informace s odkazy na oficiální zdroje, nikoli právní poradenství.',
  description:
    'Co je nelegální zaměstnávání cizinců v ČR – výkon práce bez oprávnění, před jeho platností nebo v rozporu s ním – a jak mu předejít. Přehled s odkazy na oficiální zdroje.',
  keywords: ['nelegální zaměstnávání cizinců', 'nelegální práce', 'práce bez povolení', 'umožnění nelegální práce', 'zákon o zaměstnanosti', 'compliance'],
  intro:
    'Pojem „nelegální práce“ má v českém právu konkrétní obrysy a jeho podstatou je výkon práce v rozporu s tím, co dovoluje pobytové a pracovní oprávnění. U cizinců je toto téma citlivější než u tuzemských pracovníků, protože roli hraje i pobytový status. Tato stránka vysvětluje, co se za nelegální zaměstnávání obvykle považuje a jak mu lze předcházet přehlednou evidencí a včasnou kontrolou. Neuvádí konkrétní výši sankcí – tu zveřejňují příslušné úřady a může se měnit. Jde o obecný přehled, nikoli o právní poradenství.',
  sections: [
    {
      heading: 'Co se za nelegální práci obvykle považuje',
      body: [
        'Mezi typické situace patří výkon práce bez potřebného oprávnění tam, kde je vyžadováno, zahájení práce před nabytím platnosti oprávnění a výkon práce v rozporu s oprávněním – například na jiné pozici nebo u jiného zaměstnavatele, než na který je oprávnění vázáno.',
        'Vymezení nelegální práce obsahuje zákon o zaměstnanosti. Konkrétní posouzení vždy závisí na okolnostech; v nejasných případech je vhodné situaci ověřit u Úřadu práce ČR.',
      ],
      bullets: [
        'Práce bez potřebného oprávnění',
        'Nástup před nabytím platnosti oprávnění',
        'Práce v rozporu s vázaností oprávnění (pozice, zaměstnavatel)',
      ],
    },
    {
      heading: 'Proč k nelegální práci dochází',
      body: [
        'Nejde vždy o úmysl – časté jsou omyly, jako záměna pravidel pro občany EU a třetích zemí, přehlédnutá vázanost karty na konkrétní místo nebo zmeškané prodloužení oprávnění. Právě tyto nechtěné chyby se přitom dají dobře předvídat.',
      ],
    },
    {
      heading: 'Jak nelegální práci předejít',
      body: [
        'Osvědčuje se ověřovat oprávnění před nástupem, vést evidenci s daty platnosti, vázat nástup na potvrzenou platnost dokladů a včas řešit prodloužení i změny. U agenturního zaměstnávání část kontroly zajišťuje agentura jako formální zaměstnavatel.',
        'Přehledné procesy snižují riziko jak pro zaměstnavatele, tak pro pracovníka, kterého by nelegální práce mohla poškodit.',
      ],
    },
  ],
  faq: [
    { q: 'Co je nelegální práce u cizinců?', a: 'Mimo jiné výkon práce bez potřebného oprávnění, před jeho platností nebo v rozporu s ním. Vymezení obsahuje zákon o zaměstnanosti; konkrétní situaci ověřte u Úřadu práce ČR.' },
    { q: 'Je nelegální práce vždy úmyslná?', a: 'Ne. Často jde o omyl – například záměnu pravidel pro EU a třetí země nebo zmeškané prodloužení. Předvídatelným chybám lze předejít evidencí a kontrolou.' },
    { q: 'Jak nelegální práci nejlépe předejít?', a: 'Ověřovat oprávnění před nástupem, vést evidenci s daty platnosti, vázat nástup na platnost dokladů a včas řešit prodloužení a změny.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonOPobytuCizincu, SRC.upcr, SRC.suip],
  internalLinks: [
    cornerstoneLink,
    { href: '/legalizace-prace-cizincu', label: 'Jak zajistit legální zaměstnání cizince' },
    { href: '/sankce-za-nelegalni-zamestnavani', label: 'Sankce za nelegální zaměstnávání' },
    { href: '/kontrola-inspektoratu-prace', label: 'Kontrola inspektorátu práce' },
    { href: '/povinnosti-pri-zamestnavani-cizincu', label: 'Povinnosti při zaměstnávání cizinců' },
    faqHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const SANKCE_ZA_NELEGALNI_ZAMESTNAVANI: SeoPage = {
  slug: 'sankce-za-nelegalni-zamestnavani',
  breadcrumbLabel: 'Sankce za nelegální zaměstnávání',
  eyebrow: 'Compliance · Zaměstnavatelé',
  title: 'Sankce za nelegální zaměstnávání: jak je rámec nastaven',
  heroSubtitle:
    'Jak je v ČR nastaven sankční rámec za nelegální zaměstnávání a jaké druhy důsledků mohou nastat. Bez vymyšlených částek – konkrétní výši uvádějí úřady.',
  description:
    'Sankce za nelegální zaměstnávání cizinců v ČR – jaké druhy důsledků zákon předpokládá a kdo je ukládá. Bez konkrétních částek, ty zveřejňují Úřad práce ČR a SÚIP.',
  keywords: ['sankce nelegální zaměstnávání', 'pokuty zaměstnávání cizinců', 'umožnění nelegální práce', 'inspekce práce sankce', 'zákon o zaměstnanosti', 'compliance'],
  intro:
    'Zákon o zaměstnanosti počítá s postihy za umožnění nelegální práce i za její výkon. Pro zaměstnavatele je užitečné rozumět tomu, jak je sankční rámec nastaven a kdo ho uplatňuje, protože důsledky se neomezují jen na peněžitou pokutu. Tato stránka popisuje druhy možných následků v obecné rovině. Záměrně neuvádíme konkrétní částky ani rozpětí – jejich aktuální výši stanovují předpisy a zveřejňují příslušné úřady, a uvedení neaktuálního čísla by mohlo vést k chybnému rozhodnutí. Nejde o právní poradenství.',
  sections: [
    {
      heading: 'Kdo sankce uplatňuje',
      body: [
        'Kontrolu v oblasti nelegálního zaměstnávání a uplatňování postihů zajišťují zejména Úřad práce ČR a Státní úřad inspekce práce (SÚIP) v rozsahu svých působností. Postup a pravomoci vycházejí ze zákona o zaměstnanosti a zákona o inspekci práce.',
      ],
    },
    {
      heading: 'Jaké druhy důsledků mohou nastat',
      body: [
        'Vedle peněžité pokuty mohou podle situace přicházet v úvahu i další navazující důsledky – například v oblasti dalších povinností zaměstnavatele. Konkrétní výše a rozpětí pokut stanovuje právní úprava; tato stránka je neuvádí a odkazuje na oficiální zdroje.',
        'Důsledky se mohou týkat zaměstnavatele i zprostředkovatele, podle toho, kdo nelegální práci umožnil. Posouzení vždy závisí na okolnostech konkrétního případu.',
      ],
      bullets: [
        'Peněžité pokuty podle právní úpravy (výši neuvádíme)',
        'Možné navazující důsledky podle situace',
        'Odpovědnost podle role (zaměstnavatel, zprostředkovatel)',
      ],
    },
    {
      heading: 'Jak riziku předcházet',
      body: [
        'Nejúčinnější obranou je prevence: ověřovat oprávnění před nástupem, vést evidenci, plnit oznamovací povinnosti a včas řešit prodloužení a změny. Přehledná dokumentace také usnadní průběh případné kontroly.',
        'Konkrétní aktuální výši sankcí i rozsah kontrol ověřte u Úřadu práce ČR a SÚIP.',
      ],
    },
  ],
  faq: [
    { q: 'Jaká je výše pokuty za nelegální zaměstnávání?', a: 'Konkrétní částky tato stránka neuvádí, protože se mohou měnit. Aktuální výši a rozpětí stanovuje právní úprava a zveřejňují Úřad práce ČR a SÚIP.' },
    { q: 'Kdo sankce ukládá?', a: 'V rozsahu svých působností zejména Úřad práce ČR a Státní úřad inspekce práce (SÚIP), na základě zákona o zaměstnanosti a zákona o inspekci práce.' },
    { q: 'Může být postižen i zprostředkovatel?', a: 'Důsledky se mohou týkat zaměstnavatele i zprostředkovatele podle toho, kdo nelegální práci umožnil. Posouzení závisí na okolnostech případu.' },
    { q: 'Jak riziko sankcí snížit?', a: 'Prevencí: ověřováním oprávnění před nástupem, evidencí, plněním oznamovacích povinností a včasným řešením prodloužení a změn.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonInspekcePrace, SRC.upcr, SRC.suip],
  internalLinks: [
    cornerstoneLink,
    { href: '/nelegalni-zamestnavani-cizincu', label: 'Co je nelegální zaměstnávání cizinců' },
    { href: '/kontrola-inspektoratu-prace', label: 'Kontrola inspektorátu práce' },
    { href: '/povinnosti-pri-zamestnavani-cizincu', label: 'Povinnosti při zaměstnávání cizinců' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const KONTROLA_INSPEKTORATU_PRACE: SeoPage = {
  slug: 'kontrola-inspektoratu-prace',
  breadcrumbLabel: 'Kontrola inspektorátu práce',
  eyebrow: 'Compliance · Zaměstnavatelé',
  title: 'Kontrola inspektorátu práce: na co se zaměřuje',
  heroSubtitle:
    'Kdo provádí kontroly v oblasti zaměstnávání, na co se obvykle zaměřují a jak se na ně připravit. Obecné informace s odkazy na oficiální zdroje.',
  description:
    'Kontrola inspektorátu práce v ČR – kdo ji provádí (SÚIP, Úřad práce ČR), na co se zaměřuje u zaměstnávání cizinců a jak se připravit dokumentací. Přehled s odkazy na zdroje.',
  keywords: ['kontrola inspektorátu práce', 'SÚIP kontrola', 'inspekce práce cizinci', 'kontrola zaměstnávání cizinců', 'zákon o inspekci práce', 'compliance'],
  intro:
    'Kontroly v oblasti zaměstnávání jsou běžnou součástí dohledu nad dodržováním pracovněprávních a souvisejících předpisů. U zaměstnávání cizinců se pozornost soustředí zejména na to, zda mají pracovníci platná oprávnění a zda zaměstnavatel plní oznamovací a evidenční povinnosti. Tato stránka vysvětluje, kdo kontroly provádí a na co se obvykle zaměřují, aby se zaměstnavatel mohl připravit. Vychází ze zákona o inspekci práce a zákona o zaměstnanosti a u konkrétních postupů odkazuje na oficiální zdroje. Nejde o právní poradenství.',
  sections: [
    {
      heading: 'Kdo kontroly provádí',
      body: [
        'Dohled vykonávají zejména Státní úřad inspekce práce (SÚIP) a oblastní inspektoráty práce a v oblasti zaměstnávání cizinců a zprostředkování zaměstnání také Úřad práce ČR. Působnost a pravomoci vymezuje zákon o inspekci práce a zákon o zaměstnanosti.',
      ],
    },
    {
      heading: 'Na co se kontroly obvykle zaměřují',
      body: [
        'U zaměstnávání cizinců se kontrola typicky soustředí na platnost pobytových a pracovních oprávnění, soulad vykonávané práce s oprávněním, plnění oznamovacích a evidenčních povinností a dodržování pracovněprávních pravidel.',
        'Konkrétní rozsah a předmět kontroly se liší podle situace. Tato stránka uvádí pouze obvyklé oblasti pro orientaci.',
      ],
      bullets: [
        'Platnost pobytových a pracovních oprávnění',
        'Soulad práce s tím, na co je oprávnění vázáno',
        'Oznamovací a evidenční povinnosti',
        'Dodržování pracovněprávních pravidel a BOZP',
      ],
    },
    {
      heading: 'Jak se na kontrolu připravit',
      body: [
        'Připravenosti pomáhá přehledná dokumentace: evidence pracovníků s daty platnosti oprávnění, kopie dokladů tam, kde se uchovávají, doklady o oznámeních a pracovněprávní dokumentace. Pořádek v dokumentech zpravidla usnadní průběh kontroly.',
        'Aktuální informace o průběhu a předmětu kontrol zveřejňuje SÚIP a Úřad práce ČR; doporučujeme z nich vycházet.',
      ],
    },
  ],
  faq: [
    { q: 'Kdo provádí kontroly zaměstnávání cizinců?', a: 'Zejména Státní úřad inspekce práce (SÚIP) a oblastní inspektoráty a v oblasti zaměstnávání cizinců a zprostředkování také Úřad práce ČR.' },
    { q: 'Na co se kontrola u cizinců zaměřuje?', a: 'Obvykle na platnost oprávnění, soulad práce s oprávněním, oznamovací a evidenční povinnosti a dodržování pracovněprávních pravidel.' },
    { q: 'Jak se na kontrolu připravit?', a: 'Vést přehlednou evidenci s daty platnosti oprávnění, uchovávat doklady tam, kde je to vyžadováno, a mít v pořádku pracovněprávní dokumentaci.' },
  ],
  sources: [SRC.zakonInspekcePrace, SRC.zakonOZamestnanosti, SRC.suip, SRC.upcr],
  internalLinks: [
    cornerstoneLink,
    { href: '/sankce-za-nelegalni-zamestnavani', label: 'Sankce za nelegální zaměstnávání' },
    { href: '/nelegalni-zamestnavani-cizincu', label: 'Co je nelegální zaměstnávání cizinců' },
    { href: '/povinnosti-pri-zamestnavani-cizincu', label: 'Povinnosti při zaměstnávání cizinců' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// LEVEL 4 — PRACTICAL EMPLOYMENT
// ──────────────────────────────────────────────────────────────────────────

export const ZDRAVOTNI_POJISTENI_CIZINCU: SeoPage = {
  slug: 'zdravotni-pojisteni-cizincu',
  breadcrumbLabel: 'Zdravotní pojištění cizinců',
  eyebrow: 'Pojištění a daně · Cizinci',
  title: 'Zdravotní pojištění cizinců v ČR',
  heroSubtitle:
    'Kdy cizinec spadá do veřejného zdravotního pojištění a kdy přichází v úvahu komerční pojištění. Obecné informace bez konkrétních sazeb, ty ověřte u pojišťovny.',
  description:
    'Zdravotní pojištění cizinců v ČR – kdo spadá do veřejného systému, role zaměstnání a kdy je potřeba komerční pojištění. Přehled bez konkrétních sazeb, ty uvádějí pojišťovny.',
  keywords: ['zdravotní pojištění cizinců', 'veřejné zdravotní pojištění', 'komerční zdravotní pojištění', 'VZP cizinci', 'pojištění zaměstnanců cizinců', 'pobyt cizinců'],
  intro:
    'Zdravotní pojištění je u cizinců častým zdrojem nejasností, protože ne každý cizinec automaticky spadá do veřejného systému. Rozhoduje zejména to, zda je v ČR zaměstnán a jaký má pobytový status. Tato stránka vysvětluje, kdy se uplatní veřejné zdravotní pojištění a kdy přichází v úvahu komerční pojištění, aby se zaměstnavatel i pracovník zorientovali. Neuvádíme konkrétní sazby pojistného ani ceny komerčních produktů – mohou se měnit a je nutné je ověřit u zdravotních pojišťoven. Jde o obecný přehled, nikoli o právní poradenství.',
  sections: [
    {
      heading: 'Kdy se uplatní veřejné zdravotní pojištění',
      body: [
        'Zaměstnání u zaměstnavatele se sídlem v ČR zpravidla zakládá účast ve veřejném zdravotním pojištění bez ohledu na státní příslušnost. Za zaměstnance se pojistné odvádí obdobně jako u tuzemských pracovníků a část hradí zaměstnavatel.',
        'Do veřejného systému spadají i další skupiny, například osoby s trvalým pobytem. Konkrétní zařazení závisí na situaci a pobytovém statusu.',
      ],
    },
    {
      heading: 'Kdy přichází v úvahu komerční pojištění',
      body: [
        'Cizinci, kteří nespadají do veřejného systému (například v některých fázích pobytu bez zaměstnání zakládajícího účast), si obvykle sjednávají komerční zdravotní pojištění. U některých pobytových oprávnění bývá doklad o zdravotním pojištění vyžadovanou podmínkou.',
        'Rozsah krytí a podmínky komerčních produktů se liší. Doporučujeme porovnat podmínky a ověřit, zda odpovídají požadavkům pro daný účel pobytu.',
      ],
      bullets: [
        'Veřejné pojištění typicky při zaměstnání v ČR',
        'Komerční pojištění tam, kde veřejné nevzniká',
        'Doklad o pojištění jako podmínka u některých oprávnění',
        'Pozor na rozsah krytí u komerčních produktů',
      ],
    },
    {
      heading: 'Praktická interpretace pro zaměstnavatele',
      body: [
        'Po nástupu zaměstnavatel přihlašuje zaměstnance ke zdravotní pojišťovně a odvádí pojistné. U cizinců je vhodné předem ověřit, do jakého systému pracovník spadá, aby nedošlo k mezeře v pojištění.',
        'Aktuální sazby a postupy zveřejňují zdravotní pojišťovny (například VZP); tato stránka konkrétní hodnoty neuvádí.',
      ],
    },
  ],
  faq: [
    { q: 'Spadá zaměstnaný cizinec do veřejného zdravotního pojištění?', a: 'Zaměstnání u zaměstnavatele se sídlem v ČR zpravidla zakládá účast ve veřejném zdravotním pojištění bez ohledu na státní příslušnost. Konkrétní zařazení závisí na situaci.' },
    { q: 'Kdy je potřeba komerční zdravotní pojištění?', a: 'Tam, kde veřejné pojištění nevzniká. U některých pobytových oprávnění je doklad o zdravotním pojištění vyžadovanou podmínkou. Rozsah krytí ověřte u poskytovatele.' },
    { q: 'Jaké jsou sazby pojistného?', a: 'Konkrétní sazby tato stránka neuvádí, protože se mohou měnit. Aktuální hodnoty zveřejňují zdravotní pojišťovny.' },
  ],
  sources: [SRC.zakonZdravotni, SRC.vzp, SRC.mvcr],
  internalLinks: [
    cornerstoneLink,
    { href: '/socialni-pojisteni-cizincu', label: 'Sociální pojištění cizinců' },
    { href: '/dane-cizincu-v-cr', label: 'Daně cizinců v ČR' },
    { href: '/socialni-zdravotni-dane-2026', label: 'Přehled odvodů v roce 2026' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const SOCIALNI_POJISTENI_CIZINCU: SeoPage = {
  slug: 'socialni-pojisteni-cizincu',
  breadcrumbLabel: 'Sociální pojištění cizinců',
  eyebrow: 'Pojištění a daně · Cizinci',
  title: 'Sociální pojištění cizinců v ČR',
  heroSubtitle:
    'Kdy cizinec podléhá českému sociálnímu pojištění a jak do toho vstupuje koordinace v rámci EU. Obecné informace bez konkrétních sazeb, ty ověřte u ČSSZ.',
  description:
    'Sociální pojištění cizinců v ČR – kdy vzniká účast, role zaměstnání a koordinace sociálního zabezpečení v EU. Přehled bez konkrétních sazeb, ty zveřejňuje ČSSZ.',
  keywords: ['sociální pojištění cizinců', 'sociální zabezpečení cizinci', 'koordinace EU', 'ČSSZ cizinci', 'účast na pojištění', 'odvody zaměstnavatel'],
  intro:
    'U sociálního pojištění cizinců platí podobné východisko jako u zdravotního: rozhodující je výkon zaměstnání a příslušnost k systému sociálního zabezpečení. Situaci ale komplikuje mezinárodní rozměr – u občanů EU a u vyslaných pracovníků vstupují do hry koordinační pravidla, která určují, ve kterém státě se pojistné platí. Tato stránka vysvětluje základní logiku účasti a roli koordinace, aby se zaměstnavatel zorientoval. Neuvádíme konkrétní sazby ani vyměřovací základy – mohou se měnit a aktuální hodnoty zveřejňuje ČSSZ. Nejde o právní poradenství.',
  sections: [
    {
      heading: 'Kdy vzniká účast na českém pojištění',
      body: [
        'Zaměstnání u zaměstnavatele se sídlem v ČR zpravidla zakládá účast na českém sociálním pojištění bez ohledu na státní příslušnost. Pojistné se odvádí obdobně jako u tuzemských pracovníků – část hradí zaměstnavatel a část se strhává zaměstnanci.',
        'Z odvodů se financuje mimo jiné důchodové a nemocenské pojištění; nárok na dávky se posuzuje podle pravidel platných pro daný systém.',
      ],
    },
    {
      heading: 'Koordinace sociálního zabezpečení v EU',
      body: [
        'U přeshraničních situací – například u občanů EU pracujících ve více státech nebo u vyslaných pracovníků – platí koordinační pravidla EU, která určují příslušnost k jednomu systému sociálního zabezpečení. Příslušnost se může dokládat příslušným potvrzením.',
        'U pracovníků ze třetích zemí mohou hrát roli mezinárodní smlouvy o sociálním zabezpečení, pokud jsou s danou zemí uzavřeny. Konkrétní posouzení ověřte u ČSSZ.',
      ],
      bullets: [
        'Zaměstnání v ČR zpravidla zakládá českou účast',
        'Koordinace EU určuje jeden příslušný stát',
        'U vyslání může platit pojistné v jiném státě',
        'Roli mohou hrát mezinárodní smlouvy se třetími zeměmi',
      ],
    },
    {
      heading: 'Praktická interpretace pro zaměstnavatele',
      body: [
        'Po nástupu zaměstnavatel přihlašuje zaměstnance u ČSSZ a odvádí pojistné. U přeshraničních situací je vhodné předem ověřit, ve kterém státě má být pracovník pojištěn, aby nedošlo k dvojímu nebo chybějícímu pojištění.',
        'Aktuální sazby, vyměřovací základy a postupy zveřejňuje ČSSZ; tato stránka konkrétní hodnoty neuvádí.',
      ],
    },
  ],
  faq: [
    { q: 'Platí zaměstnaný cizinec české sociální pojištění?', a: 'Zaměstnání u zaměstnavatele se sídlem v ČR zpravidla zakládá účast na českém sociálním pojištění bez ohledu na státní příslušnost. U přeshraničních situací rozhoduje koordinace.' },
    { q: 'Co určuje koordinace sociálního zabezpečení v EU?', a: 'Určuje, ve kterém jednom státě se pojistné platí, aby nedocházelo k dvojímu pojištění. Příslušnost se může dokládat příslušným potvrzením.' },
    { q: 'Jaké jsou sazby pojistného?', a: 'Konkrétní sazby a vyměřovací základy tato stránka neuvádí, protože se mohou měnit. Aktuální hodnoty zveřejňuje ČSSZ.' },
  ],
  sources: [SRC.zakonSocialni, SRC.cssz],
  internalLinks: [
    cornerstoneLink,
    { href: '/zdravotni-pojisteni-cizincu', label: 'Zdravotní pojištění cizinců' },
    { href: '/dane-cizincu-v-cr', label: 'Daně cizinců v ČR' },
    { href: '/socialni-zdravotni-dane-2026', label: 'Přehled odvodů v roce 2026' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const DANE_CIZINCU_V_CR: SeoPage = {
  slug: 'dane-cizincu-v-cr',
  breadcrumbLabel: 'Daně cizinců v ČR',
  eyebrow: 'Pojištění a daně · Cizinci',
  title: 'Daně cizinců v ČR: rezidence a zdanění příjmů',
  heroSubtitle:
    'Jak se u cizinců posuzuje daňová rezidence a kde se zdaňují příjmy ze zaměstnání. Obecné informace bez konkrétních sazeb, ty ověřte u finanční správy.',
  description:
    'Daně cizinců v ČR – daňový rezident vs nerezident, zdanění příjmů ze závislé činnosti a role smluv o zamezení dvojího zdanění. Přehled bez sazeb, ty uvádí finanční správa.',
  keywords: ['daně cizinců', 'daňový rezident', 'daňový nerezident', 'zdanění příjmů cizinci', 'dvojí zdanění', 'finanční správa'],
  intro:
    'Zdanění příjmů cizince závisí především na tom, zda je v České republice daňovým rezidentem, nebo nerezidentem, a na tom, odkud příjem plyne. U zaměstnanců navíc daň z příjmů ze závislé činnosti obvykle sráží a odvádí zaměstnavatel. Tato stránka vysvětluje základní pojmy a logiku zdanění, aby se zaměstnavatel i pracovník zorientovali, kde je vhodné věc ověřit. Neuvádíme konkrétní sazby, slevy ani limity – mohou se měnit a aktuální hodnoty zveřejňuje finanční správa. Jde o obecný přehled, nikoli o daňové poradenství.',
  sections: [
    {
      heading: 'Daňový rezident vs nerezident',
      body: [
        'Daňová rezidence určuje rozsah zdanění v ČR. Daňový rezident zde zpravidla zdaňuje své celosvětové příjmy, zatímco nerezident zdaňuje obvykle jen příjmy ze zdrojů na území ČR. Kritéria rezidence (například bydliště nebo doba pobytu) vymezuje zákon o daních z příjmů.',
        'Posouzení rezidence může být u přeshraničních situací složité a může ho ovlivnit i smlouva o zamezení dvojího zdanění. Konkrétní posouzení ověřte u finanční správy.',
      ],
    },
    {
      heading: 'Zdanění příjmů ze zaměstnání',
      body: [
        'U příjmů ze závislé činnosti daň obvykle sráží a odvádí zaměstnavatel jako plátce. Zaměstnanec může uplatňovat slevy a po skončení roku případně řešit roční zúčtování nebo daňové přiznání podle své situace.',
        'Konkrétní sazba daně, slevy a postup se mohou měnit; tato stránka je neuvádí a odkazuje na finanční správu.',
      ],
      bullets: [
        'Rezident – zpravidla celosvětové příjmy',
        'Nerezident – obvykle jen příjmy ze zdrojů v ČR',
        'U zaměstnání daň typicky sráží zaměstnavatel',
        'Roli mohou hrát smlouvy o zamezení dvojího zdanění',
      ],
    },
    {
      heading: 'Dvojí zdanění a praktická interpretace',
      body: [
        'Aby tentýž příjem nebyl zdaněn dvakrát, uzavírá ČR s řadou států smlouvy o zamezení dvojího zdanění. Tyto smlouvy mohou upravit, který stát má právo příjem zdanit a jak se vyloučí dvojí zdanění.',
        'Pro zaměstnavatele je vhodné u zahraničních pracovníků předem ujasnit jejich daňový status. U složitějších situací doporučujeme konzultaci s daňovým poradcem a ověření u finanční správy.',
      ],
    },
  ],
  faq: [
    { q: 'Co rozhoduje o zdanění cizince v ČR?', a: 'Především daňová rezidence a zdroj příjmu. Rezident zpravidla zdaňuje celosvětové příjmy, nerezident obvykle jen příjmy ze zdrojů v ČR. Kritéria vymezuje zákon o daních z příjmů.' },
    { q: 'Kdo odvádí daň ze mzdy u zaměstnaného cizince?', a: 'U příjmů ze závislé činnosti daň obvykle sráží a odvádí zaměstnavatel jako plátce. Konkrétní sazby a slevy zveřejňuje finanční správa.' },
    { q: 'Jak se řeší dvojí zdanění?', a: 'ČR má s řadou států smlouvy o zamezení dvojího zdanění, které upravují, který stát příjem zdaní. Konkrétní situaci ověřte u finanční správy nebo daňového poradce.' },
  ],
  sources: [SRC.zakonDaneZPrijmu, SRC.financniSprava],
  internalLinks: [
    cornerstoneLink,
    { href: '/zdravotni-pojisteni-cizincu', label: 'Zdravotní pojištění cizinců' },
    { href: '/socialni-pojisteni-cizincu', label: 'Sociální pojištění cizinců' },
    { href: '/socialni-zdravotni-dane-2026', label: 'Přehled odvodů v roce 2026' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRAVA_A_POVINNOSTI_CIZINCU: SeoPage = {
  slug: 'prava-a-povinnosti-cizincu',
  breadcrumbLabel: 'Práva a povinnosti cizinců',
  eyebrow: 'Práva · Cizinci',
  title: 'Práva a povinnosti cizinců při práci v ČR',
  heroSubtitle:
    'Jaká práva má cizinec jako zaměstnanec a jaké povinnosti se pojí s jeho pobytem a prací. Obecné informace s odkazy na oficiální zdroje, nikoli právní poradenství.',
  description:
    'Práva a povinnosti cizinců při práci v ČR – rovné pracovní podmínky, mzda a BOZP na straně práv; platné oprávnění a hlášení změn na straně povinností. Přehled se zdroji.',
  keywords: ['práva a povinnosti cizinců', 'práva zahraničních pracovníků', 'rovné zacházení', 'povinnosti cizince pobyt', 'zákoník práce cizinci', 'pobyt cizinců'],
  intro:
    'Cizinec, který v České republice pracuje, má v zásadě stejná pracovněprávní práva jako tuzemský zaměstnanec, a zároveň má povinnosti vyplývající z jeho pobytového statusu. Tato dvojí rovina – pracovní a pobytová – je pro orientaci klíčová. Tato stránka shrnuje hlavní práva, na která má pracovník nárok, i povinnosti, na které je dobré pamatovat, aby zaměstnání i pobyt probíhaly v souladu s předpisy. Vychází ze zákoníku práce a předpisů o pobytu cizinců a u konkrétních podmínek odkazuje na oficiální zdroje. Nejde o právní poradenství.',
  sections: [
    {
      heading: 'Práva v pracovněprávním vztahu',
      body: [
        'Pracovněprávní ochrana se vztahuje na zaměstnance bez ohledu na státní příslušnost. Patří sem zejména nárok na sjednanou mzdu nejméně ve výši minimální mzdy, na rovné zacházení a na bezpečné pracovní podmínky (BOZP).',
        'U agenturního zaměstnávání navíc platí požadavek srovnatelných mzdových a pracovních podmínek s kmenovými zaměstnanci uživatele na obdobné pozici.',
      ],
      bullets: [
        'Mzda nejméně ve výši minimální mzdy',
        'Rovné zacházení a zákaz diskriminace',
        'Bezpečnost a ochrana zdraví při práci',
        'Srovnatelné podmínky u agenturního zaměstnávání',
      ],
    },
    {
      heading: 'Povinnosti spojené s pobytem a prací',
      body: [
        'Na straně povinností je především mít platné oprávnění k pobytu i práci tam, kde je vyžadováno, a vykonávat práci v souladu s ním. K pobytovým povinnostem může patřit i hlášení vybraných změn příslušnému úřadu.',
        'Konkrétní oznamovací povinnosti a jejich lhůty stanovují předpisy o pobytu cizinců; aktuální informace zveřejňuje Ministerstvo vnitra.',
      ],
    },
    {
      heading: 'Kde hledat pomoc',
      body: [
        'Při nejasnostech ohledně pracovních podmínek se lze obrátit na zaměstnavatele nebo agenturu, v oblasti dohledu na inspekci práce a v pobytových otázkách na Ministerstvo vnitra (OAMP). Přehled oficiálních zdrojů shrnuje samostatná stránka.',
      ],
    },
  ],
  faq: [
    { q: 'Má cizinec stejná pracovní práva jako Čech?', a: 'V pracovněprávním vztahu má v zásadě stejná práva bez ohledu na státní příslušnost – například nárok na mzdu nejméně ve výši minimální mzdy a na rovné zacházení.' },
    { q: 'Jaké má cizinec povinnosti navíc?', a: 'Zejména mít platné oprávnění k pobytu i práci tam, kde je vyžadováno, a vykonávat práci v souladu s ním. Může sem patřit i hlášení vybraných změn úřadu.' },
    { q: 'Kam se obrátit při problému s podmínkami práce?', a: 'Na zaměstnavatele nebo agenturu, v oblasti dohledu na inspekci práce a v pobytových otázkách na Ministerstvo vnitra (OAMP).' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonOPobytuCizincu, SRC.mvcr, SRC.upcr],
  internalLinks: [
    cornerstoneLink,
    { href: '/zdravotni-pojisteni-cizincu', label: 'Zdravotní pojištění cizinců' },
    { href: '/ubytovani-pro-pracovniky', label: 'Ubytování pro pracovníky' },
    { href: '/povinnosti-pri-zamestnavani-cizincu', label: 'Povinnosti při zaměstnávání cizinců' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// LEVEL 5 — COUNTRY CLUSTER (orientation only; no salary/approval/permit
// promises, no fake comparisons)
// ──────────────────────────────────────────────────────────────────────────

export const PRACE_PRO_UKRAJINCE_V_CR: SeoPage = {
  slug: 'prace-pro-ukrajince-v-cr',
  breadcrumbLabel: 'Práce pro Ukrajince v ČR',
  eyebrow: 'Orientace · Země původu',
  title: 'Práce pro Ukrajince v ČR: orientační přehled',
  heroSubtitle:
    'Orientace pro pracovníky z Ukrajiny i pro zaměstnavatele – dočasná ochrana, standardní oprávnění a praktické kroky. Obecné informace, podmínky ověřte u úřadů.',
  description:
    'Práce pro Ukrajince v ČR – orientační přehled: režim dočasné ochrany (Lex Ukrajina), standardní oprávnění a praktické kroky. Bez slibů zaměstnání či schválení, s odkazy na zdroje.',
  keywords: ['práce pro Ukrajince', 'dočasná ochrana', 'Lex Ukrajina', 'zaměstnání Ukrajinci ČR', 'volný vstup trh práce', 'pobyt cizinců'],
  intro:
    'Tato stránka slouží jako orientační přehled pro pracovníky z Ukrajiny a pro zaměstnavatele, kteří je zaměstnávají nebo zaměstnat chtějí. Specifikem je režim dočasné ochrany (tzv. Lex Ukrajina), který se u části ukrajinských pracovníků uplatňuje a má vlastní pravidla. Vedle něj existuje standardní cesta přes pobytová a pracovní oprávnění jako u jiných třetích zemí. Neuvádíme žádné sliby zaměstnání, schválení ani konkrétní lhůty – jde o obecné informace, které je vždy nutné ověřit u příslušných úřadů, protože podmínky se mohou měnit podle aktuální legislativy a individuální situace.',
  sections: [
    {
      heading: 'Režim dočasné ochrany',
      body: [
        'Část pracovníků z Ukrajiny pobývá v ČR v režimu dočasné ochrany. Držitelé dočasné ochrany mají podle aktuální úpravy volný vstup na trh práce a nepotřebují samostatné pracovní povolení; zaměstnavatel u nich plní oznamovací a evidenční povinnosti.',
        'Pravidla dočasné ochrany se mohou v čase měnit a prodlužovat. Aktuální podmínky zveřejňuje Ministerstvo vnitra; doporučujeme z nich vždy vycházet.',
      ],
    },
    {
      heading: 'Standardní cesta přes oprávnění',
      body: [
        'Pokud se na pracovníka režim dočasné ochrany nevztahuje, platí standardní pravidla pro občany třetích zemí – tedy potřeba odpovídajícího pobytového a pracovního oprávnění, nejčastěji zaměstnanecké karty. Postup je shodný jako u jiných třetích zemí.',
        'Konkrétní volba oprávnění závisí na situaci pracovníka, pozici a kvalifikaci.',
      ],
      bullets: [
        'Dočasná ochrana – volný vstup na trh práce u držitelů',
        'Jinak standardní oprávnění (např. zaměstnanecká karta)',
        'Oznamovací a evidenční povinnosti zaměstnavatele',
        'Podmínky ověřit u Ministerstva vnitra a Úřadu práce ČR',
      ],
    },
    {
      heading: 'Praktické kroky',
      body: [
        'Pro zaměstnavatele je vhodné nejprve zjistit pobytový status pracovníka (dočasná ochrana vs. jiné oprávnění), z něj odvodit potřebné kroky a vázat nástup na platné oprávnění. Pro pracovníka je užitečné mít doklady v pořádku a sledovat platnost statusu.',
        'Tato stránka nenahrazuje individuální posouzení; konkrétní situaci ověřte u úřadů uvedených ve zdrojích.',
      ],
    },
  ],
  faq: [
    { q: 'Potřebuje držitel dočasné ochrany pracovní povolení?', a: 'Podle aktuální úpravy mají držitelé dočasné ochrany volný vstup na trh práce a nepotřebují samostatné pracovní povolení. Zaměstnavatel plní oznamovací a evidenční povinnosti. Podmínky ověřte u Ministerstva vnitra.' },
    { q: 'Co když se na pracovníka dočasná ochrana nevztahuje?', a: 'Pak platí standardní pravidla pro třetí země – potřeba odpovídajícího pobytového a pracovního oprávnění, nejčastěji zaměstnanecké karty.' },
    { q: 'Garantujete zaměstnání nebo schválení?', a: 'Ne. Tato stránka neslibuje zaměstnání ani schválení a neuvádí lhůty. Jde o obecné informace; konkrétní podmínky se mohou měnit a je nutné je ověřit u úřadů.' },
  ],
  sources: [SRC.lexUkrajina, SRC.zakonOPobytuCizincu, SRC.zakonOZamestnanosti, SRC.mvcr, SRC.upcr],
  internalLinks: [
    cornerstoneLink,
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení v ČR' },
    { href: '/zamestnanecka-karta-2026', label: 'Zaměstnanecká karta podrobně' },
    { href: '/prava-a-povinnosti-cizincu', label: 'Práva a povinnosti cizinců' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRACE_PRO_MOLDAVANY_V_CR: SeoPage = {
  slug: 'prace-pro-moldavany-v-cr',
  breadcrumbLabel: 'Práce pro Moldavany v ČR',
  eyebrow: 'Orientace · Země původu',
  title: 'Práce pro Moldavany v ČR: orientační přehled',
  heroSubtitle:
    'Orientace pro pracovníky z Moldavska i pro zaměstnavatele – standardní oprávnění, dokumentace a praktické kroky. Obecné informace, podmínky ověřte u úřadů.',
  description:
    'Práce pro Moldavany v ČR – orientační přehled: oprávnění pro třetí země, dokumentace a praktické kroky. Bez slibů zaměstnání či schválení, s odkazy na oficiální zdroje.',
  keywords: ['práce pro Moldavany', 'zaměstnání Moldavané ČR', 'třetí země oprávnění', 'zaměstnanecká karta', 'dokumentace cizinci', 'pobyt cizinců'],
  intro:
    'Tato stránka je orientačním přehledem pro pracovníky z Moldavska a pro zaměstnavatele, kteří s nimi spolupracují. Moldavsko je z pohledu českého práva třetí zemí (mimo EU, EHP a Švýcarsko), a proto se pro dlouhodobou práci uplatňují standardní pravidla – tedy potřeba odpovídajícího pobytového a pracovního oprávnění, nejčastěji zaměstnanecké karty. Neuvádíme žádné sliby zaměstnání ani schválení, žádné lhůty ani srovnání. Jde o obecné informace, které je vždy nutné ověřit u příslušných úřadů, protože podmínky se mohou měnit podle aktuální legislativy a individuální situace.',
  sections: [
    {
      heading: 'Jaké oprávnění obvykle připadá v úvahu',
      body: [
        'Jako u jiných třetích zemí je pro dlouhodobé zaměstnání obvykle potřeba duální oprávnění – nejčastěji zaměstnanecká karta, u vysoce kvalifikovaných pozic modrá karta. U krátkodobých nebo sezónních poměrů může přicházet v úvahu povolení k zaměstnání.',
        'Volba oprávnění závisí na délce poměru, pozici a kvalifikaci. Rozhoduje o pobytových oprávněních Ministerstvo vnitra.',
      ],
      bullets: [
        'Zaměstnanecká karta pro běžné dlouhodobé pozice',
        'Modrá karta u vysoce kvalifikovaných pozic',
        'Povolení k zaměstnání u krátkodobých/sezónních poměrů',
      ],
    },
    {
      heading: 'Dokumentace a uznání kvalifikace',
      body: [
        'U pracovníků ze třetích zemí bývá potřeba více dokladů – cestovní doklad, doklad o účelu pobytu, doklad o kvalifikaci a o zajištění ubytování. Některé doklady mohou vyžadovat ověřené překlady a u dokladů o vzdělání může být nutné uznání kvalifikace.',
        'Závazný seznam příloh stanovuje úřad; doporučujeme jej ověřit předem a doklady připravovat s předstihem.',
      ],
    },
    {
      heading: 'Praktické kroky a vládní programy',
      body: [
        'Pro některé skupiny pracovníků mohou existovat vládní programy ekonomické migrace s vlastními podmínkami a vymezenými zeměmi. Jejich aktuální nastavení i zařazení konkrétních zemí zveřejňují MPSV a Ministerstvo vnitra a může se měnit – ověřte je tam.',
        'Zaměstnavateli pomáhá začít definicí pozice a ověřením postupu u úřadů; nástup je vždy vázán na platné oprávnění.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké oprávnění Moldavan pro práci v ČR potřebuje?', a: 'Jako u jiných třetích zemí obvykle duální oprávnění, nejčastěji zaměstnaneckou kartu, u kvalifikovaných pozic modrou kartu. U krátkodobých poměrů povolení k zaměstnání. Konkrétní volbu ověřte u úřadů.' },
    { q: 'Je potřeba uznání kvalifikace?', a: 'U dokladů o vzdělání může být uznání kvalifikace nutné a některé doklady se předkládají v ověřených překladech. Závazné požadavky stanovuje úřad.' },
    { q: 'Slibujete zaměstnání nebo schválení?', a: 'Ne. Stránka neslibuje zaměstnání ani schválení a neuvádí lhůty. Jde o obecné informace; podmínky se mohou měnit a je nutné je ověřit u úřadů.' },
  ],
  sources: [SRC.zakonOPobytuCizincu, SRC.zakonOZamestnanosti, SRC.mvcr, SRC.upcr, SRC.mzv],
  internalLinks: [
    cornerstoneLink,
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení v ČR' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Potřebné dokumenty' },
    { href: '/jak-ziskat-zamestnaneckou-kartu', label: 'Jak získat zaměstnaneckou kartu' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRACE_PRO_GRUZINCE_V_CR: SeoPage = {
  slug: 'prace-pro-gruzince-v-cr',
  breadcrumbLabel: 'Práce pro Gruzínce v ČR',
  eyebrow: 'Orientace · Země původu',
  title: 'Práce pro Gruzínce v ČR: orientační přehled',
  heroSubtitle:
    'Orientace pro pracovníky z Gruzie i pro zaměstnavatele – standardní oprávnění, nábor přes agentury a praktické kroky. Obecné informace, podmínky ověřte u úřadů.',
  description:
    'Práce pro Gruzínce v ČR – orientační přehled: oprávnění pro třetí země, role licencovaných agentur a praktické kroky. Bez slibů zaměstnání či schválení, s odkazy na zdroje.',
  keywords: ['práce pro Gruzínce', 'zaměstnání Gruzie ČR', 'třetí země oprávnění', 'zaměstnanecká karta', 'zprostředkování zaměstnání', 'pobyt cizinců'],
  intro:
    'Tato stránka je orientačním přehledem pro pracovníky z Gruzie a pro zaměstnavatele, kteří je chtějí zaměstnat. Gruzie je z pohledu českého práva třetí zemí, a proto pro dlouhodobou práci obvykle platí potřeba pobytového a pracovního oprávnění, nejčastěji zaměstnanecké karty. Vedle samotného oprávnění hraje u náboru ze vzdálenějších zemí roli i to, přes jaké kanály nábor probíhá. Neuvádíme žádné sliby zaměstnání ani schválení a žádná srovnání. Jde o obecné informace, které je nutné ověřit u příslušných úřadů – podmínky se mohou měnit podle aktuální legislativy a individuální situace.',
  sections: [
    {
      heading: 'Jaké oprávnění obvykle připadá v úvahu',
      body: [
        'Pro dlouhodobé zaměstnání občana Gruzie obvykle připadá v úvahu zaměstnanecká karta, u vysoce kvalifikovaných pozic modrá karta. U krátkodobých nebo sezónních poměrů může přicházet v úvahu povolení k zaměstnání.',
        'O pobytových oprávněních rozhoduje Ministerstvo vnitra; v úvodu řízení bývá nahlášení volného místa Úřadu práce ČR.',
      ],
      bullets: [
        'Zaměstnanecká karta pro běžné dlouhodobé pozice',
        'Modrá karta u vysoce kvalifikovaných pozic',
        'Nahlášení volného místa Úřadu práce ČR v úvodu řízení',
      ],
    },
    {
      heading: 'Role náboru a licencovaných agentur',
      body: [
        'Při náboru ze vzdálenějších zemí se často využívají zprostředkovatelské kanály. Ke zprostředkování zaměstnání musí mít agentura platné povolení podle zákona o zaměstnanosti, a je proto vhodné spolupracovat s licencovaným subjektem.',
        'Transparentní podmínky a férový vztah k pracovníkovi jsou stejně důležité jako samotná administrativa oprávnění.',
      ],
    },
    {
      heading: 'Praktické kroky',
      body: [
        'Zaměstnavateli pomáhá začít definicí pozice, ověřit potřebné oprávnění a postup u úřadů a připravit dokumentaci s předstihem. Nástup je vždy vázán na platné oprávnění.',
        'Pro pracovníka je užitečné mít doklady v pořádku, počítat s případným uznáním kvalifikace a sledovat platnost oprávnění. Konkrétní podmínky ověřte u úřadů uvedených ve zdrojích.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké oprávnění Gruzínec pro práci v ČR potřebuje?', a: 'Obvykle zaměstnaneckou kartu, u kvalifikovaných pozic modrou kartu, u krátkodobých poměrů povolení k zaměstnání. Konkrétní volbu ověřte u Ministerstva vnitra a Úřadu práce ČR.' },
    { q: 'Musí mít agentura povolení ke zprostředkování?', a: 'Ano. Ke zprostředkování zaměstnání musí mít agentura platné povolení podle zákona o zaměstnanosti. Doporučujeme spolupráci s licencovaným subjektem.' },
    { q: 'Slibujete zaměstnání nebo schválení?', a: 'Ne. Stránka neslibuje zaměstnání ani schválení a neuvádí lhůty. Jde o obecné informace; podmínky se mohou měnit a je nutné je ověřit u úřadů.' },
  ],
  sources: [SRC.zakonOPobytuCizincu, SRC.zakonOZamestnanosti, SRC.mvcr, SRC.upcr, SRC.mzv],
  internalLinks: [
    cornerstoneLink,
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení v ČR' },
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRACE_PRO_FILIPINCE_V_CR: SeoPage = {
  slug: 'prace-pro-filipince-v-cr',
  breadcrumbLabel: 'Práce pro Filipínce v ČR',
  eyebrow: 'Orientace · Země původu',
  title: 'Práce pro Filipínce v ČR: orientační přehled',
  heroSubtitle:
    'Orientace pro pracovníky z Filipín i pro zaměstnavatele – standardní oprávnění, dokumentace a logistika náboru. Obecné informace, podmínky ověřte u úřadů.',
  description:
    'Práce pro Filipínce v ČR – orientační přehled: oprávnění pro třetí země, vízum a dokumentace, logistika náboru. Bez slibů zaměstnání či schválení, s odkazy na oficiální zdroje.',
  keywords: ['práce pro Filipínce', 'zaměstnání Filipíny ČR', 'třetí země oprávnění', 'zaměstnanecká karta', 'vízum dokumentace', 'pobyt cizinců'],
  intro:
    'Tato stránka je orientačním přehledem pro pracovníky z Filipín a pro zaměstnavatele, kteří zvažují jejich nábor. Filipíny jsou z pohledu českého práva třetí zemí a u náboru ze vzdálené země se kromě pobytového a pracovního oprávnění více řeší i vízová a logistická stránka. Pro dlouhodobou práci obvykle platí potřeba odpovídajícího oprávnění, nejčastěji zaměstnanecké karty. Neuvádíme žádné sliby zaměstnání ani schválení, žádné lhůty ani srovnání. Jde o obecné informace, které je nutné ověřit u příslušných úřadů – podmínky se mohou měnit podle aktuální legislativy a individuální situace.',
  sections: [
    {
      heading: 'Oprávnění, vízum a vstup',
      body: [
        'Pro dlouhodobé zaměstnání občana Filipín obvykle připadá v úvahu zaměstnanecká karta, u vysoce kvalifikovaných pozic modrá karta. S pobytovým oprávněním se u vzdálenějších zemí pojí i vízová stránka vstupu.',
        'Vízový režim a konzulární náležitosti spadají do působnosti Ministerstva zahraničních věcí a zastupitelských úřadů; o pobytových oprávněních rozhoduje Ministerstvo vnitra. Aktuální podmínky ověřte u těchto úřadů.',
      ],
      bullets: [
        'Zaměstnanecká karta pro běžné dlouhodobé pozice',
        'Modrá karta u vysoce kvalifikovaných pozic',
        'Vízová a konzulární stránka vstupu (MZV, zastupitelský úřad)',
      ],
    },
    {
      heading: 'Dokumentace a uznání kvalifikace',
      body: [
        'U pracovníků ze vzdálené třetí země je vhodné počítat s delší přípravou dokladů – cestovní doklad, doklad o účelu pobytu, doklad o kvalifikaci a o zajištění ubytování. Některé doklady mohou vyžadovat ověřené překlady a vyšší ověření a u vzdělání může být nutné uznání kvalifikace.',
        'Závazný seznam příloh stanovuje úřad; doporučujeme ověřit jej předem a doklady připravovat s rezervou.',
      ],
    },
    {
      heading: 'Logistika náboru a praktické kroky',
      body: [
        'Vzdálenost zvyšuje význam dobře nastaveného náboru – jasné podmínky, koordinace dokumentace a férový vztah k pracovníkovi. Ke zprostředkování zaměstnání musí mít agentura platné povolení podle zákona o zaměstnanosti.',
        'Zaměstnavateli pomáhá začít definicí pozice a ověřením postupu u úřadů; nástup je vždy vázán na platné oprávnění. Konkrétní podmínky ověřte u úřadů uvedených ve zdrojích.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké oprávnění Filipínec pro práci v ČR potřebuje?', a: 'Obvykle zaměstnaneckou kartu, u kvalifikovaných pozic modrou kartu. U vzdálenějších zemí se navíc řeší vízová stránka vstupu. Konkrétní podmínky ověřte u Ministerstva vnitra a MZV.' },
    { q: 'Co obnáší dokumentace u vzdálené země?', a: 'Je vhodné počítat s delší přípravou dokladů, ověřenými překlady, případně vyšším ověřením a uznáním kvalifikace u vzdělání. Závazný seznam stanovuje úřad.' },
    { q: 'Slibujete zaměstnání nebo schválení?', a: 'Ne. Stránka neslibuje zaměstnání ani schválení a neuvádí lhůty. Jde o obecné informace; podmínky se mohou měnit a je nutné je ověřit u úřadů.' },
  ],
  sources: [SRC.zakonOPobytuCizincu, SRC.zakonOZamestnanosti, SRC.mvcr, SRC.mzv, SRC.upcr],
  internalLinks: [
    cornerstoneLink,
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení v ČR' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Potřebné dokumenty' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRACE_PRO_SRBY_V_CR: SeoPage = {
  slug: 'prace-pro-srby-v-cr',
  breadcrumbLabel: 'Práce pro Srby v ČR',
  eyebrow: 'Orientace · Země původu',
  title: 'Práce pro Srby v ČR: orientační přehled',
  heroSubtitle:
    'Orientace pro pracovníky ze Srbska i pro zaměstnavatele – standardní oprávnění, dokumentace a praktické kroky. Obecné informace, podmínky ověřte u úřadů.',
  description:
    'Práce pro Srby v ČR – orientační přehled: oprávnění pro třetí země, dokumentace a praktické kroky. Bez slibů zaměstnání či schválení, s odkazy na oficiální zdroje.',
  keywords: ['práce pro Srby', 'zaměstnání Srbsko ČR', 'třetí země oprávnění', 'zaměstnanecká karta', 'dokumentace cizinci', 'pobyt cizinců'],
  intro:
    'Tato stránka je orientačním přehledem pro pracovníky ze Srbska a pro zaměstnavatele, kteří s nimi spolupracují. Srbsko je z pohledu českého práva třetí zemí, a proto se pro dlouhodobou práci uplatňují standardní pravidla – tedy potřeba odpovídajícího pobytového a pracovního oprávnění, nejčastěji zaměstnanecké karty. Neuvádíme žádné sliby zaměstnání ani schválení, žádné lhůty ani srovnání mezi zeměmi. Jde o obecné informace, které je vždy nutné ověřit u příslušných úřadů, protože podmínky se mohou měnit podle aktuální legislativy a individuální situace.',
  sections: [
    {
      heading: 'Jaké oprávnění obvykle připadá v úvahu',
      body: [
        'Pro dlouhodobé zaměstnání občana Srbska obvykle připadá v úvahu zaměstnanecká karta, u vysoce kvalifikovaných pozic modrá karta. U krátkodobých nebo sezónních poměrů může přicházet v úvahu povolení k zaměstnání.',
        'O pobytových oprávněních rozhoduje Ministerstvo vnitra; v úvodu řízení bývá nahlášení volného místa Úřadu práce ČR. Krátkodobý bezvízový vstup, pokud se uplatní, sám o sobě neopravňuje k práci – pracovní oprávnění je třeba řešit samostatně.',
      ],
      bullets: [
        'Zaměstnanecká karta pro běžné dlouhodobé pozice',
        'Modrá karta u vysoce kvalifikovaných pozic',
        'Povolení k zaměstnání u krátkodobých/sezónních poměrů',
        'Krátkodobý vstup nenahrazuje pracovní oprávnění',
      ],
    },
    {
      heading: 'Dokumentace a uznání kvalifikace',
      body: [
        'U pracovníků ze třetích zemí bývá potřeba více dokladů – cestovní doklad, doklad o účelu pobytu, doklad o kvalifikaci a o zajištění ubytování. Některé doklady mohou vyžadovat ověřené překlady a u vzdělání může být nutné uznání kvalifikace.',
        'Závazný seznam příloh stanovuje úřad; doporučujeme jej ověřit předem a doklady připravovat s předstihem.',
      ],
    },
    {
      heading: 'Praktické kroky a vládní programy',
      body: [
        'Pro některé skupiny pracovníků mohou existovat vládní programy ekonomické migrace s vlastními podmínkami a vymezenými zeměmi. Jejich aktuální nastavení i zařazení konkrétních zemí zveřejňují MPSV a Ministerstvo vnitra a může se měnit – ověřte je tam.',
        'Zaměstnavateli pomáhá začít definicí pozice a ověřením postupu u úřadů; nástup je vždy vázán na platné oprávnění.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké oprávnění Srb pro práci v ČR potřebuje?', a: 'Obvykle zaměstnaneckou kartu, u kvalifikovaných pozic modrou kartu, u krátkodobých poměrů povolení k zaměstnání. Konkrétní volbu ověřte u Ministerstva vnitra a Úřadu práce ČR.' },
    { q: 'Opravňuje krátkodobý bezvízový vstup k práci?', a: 'Ne. Krátkodobý vstup, pokud se uplatní, sám o sobě neopravňuje k výkonu práce. Pracovní oprávnění je třeba řešit samostatně; podmínky ověřte u úřadů.' },
    { q: 'Slibujete zaměstnání nebo schválení?', a: 'Ne. Stránka neslibuje zaměstnání ani schválení a neuvádí lhůty. Jde o obecné informace; podmínky se mohou měnit a je nutné je ověřit u úřadů.' },
  ],
  sources: [SRC.zakonOPobytuCizincu, SRC.zakonOZamestnanosti, SRC.mvcr, SRC.upcr, SRC.mzv],
  internalLinks: [
    cornerstoneLink,
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení v ČR' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Potřebné dokumenty' },
    { href: '/jak-ziskat-zamestnaneckou-kartu', label: 'Jak získat zaměstnaneckou kartu' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// LEVEL 6 — AUTHORITY + FAQ
// ──────────────────────────────────────────────────────────────────────────

export const FAQ_ZAMESTNAVANI_CIZINCU: SeoPage = {
  slug: 'faq-zamestnavani-cizincu',
  breadcrumbLabel: 'FAQ zaměstnávání cizinců',
  eyebrow: 'Rozcestník · Cizinci',
  title: 'FAQ: zaměstnávání cizinců v ČR',
  heroSubtitle:
    'Časté dotazy k zaměstnávání cizinců na jednom místě, s odkazy na podrobné stránky celého clusteru. Obecné informace, nikoli právní poradenství.',
  description:
    'Často kladené dotazy k zaměstnávání cizinců v ČR – karty a povolení, povinnosti, pojištění, daně i orientace podle zemí. Rozcestník na podrobné stránky se zdroji.',
  keywords: ['FAQ zaměstnávání cizinců', 'časté dotazy cizinci práce', 'zaměstnanecká karta FAQ', 'povinnosti cizinci', 'pojištění daně cizinci', 'pobyt cizinců'],
  intro:
    'Tato stránka shromažďuje nejčastější dotazy k zaměstnávání cizinců v České republice na jednom místě a slouží jako rozcestník celého tematického clusteru. U každé oblasti existuje samostatná podrobná stránka, na kterou odkazujeme v sekci Související. Odpovědi mají obecný informační charakter a u proměnlivých údajů, jako jsou sazby, lhůty, poplatky a podmínky oprávnění, odkazují na oficiální zdroje. Neslibujeme zaměstnání ani schválení a neuvádíme vymyšlená čísla – podmínky se mohou měnit podle aktuální legislativy a individuální situace. Nejde o právní poradenství.',
  sections: [
    {
      heading: 'Jak rozcestník používat',
      body: [
        'Níže najdete odpovědi na opakující se otázky napříč celým clusterem – od karet a povolení přes povinnosti a kontroly až po pojištění, daně a orientaci podle zemí. U každé oblasti vede odkaz na podrobnou stránku v sekci Související na konci.',
        'U konkrétních hodnot vždy doporučujeme ověření u příslušné instituce, protože se mohou měnit.',
      ],
    },
    {
      heading: 'Oblasti, které cluster pokrývá',
      body: [
        'Cluster pokrývá zaměstnaneckou a modrou kartu a jejich získání, prodloužení a změny, povinnosti při zaměstnávání cizinců, nelegální práci a kontroly, zdravotní a sociální pojištění, daně a také orientaci pro pracovníky podle země původu.',
      ],
      bullets: [
        'Karty a povolení: získání, prodloužení, změna zaměstnavatele',
        'Compliance: povinnosti, nelegální práce, sankce, kontroly',
        'Pojištění a daně cizinců',
        'Orientace podle zemí původu',
        'Slovník pojmů a kde ověřit informace',
      ],
    },
  ],
  faq: [
    { q: 'Potřebuje cizinec k práci v ČR povolení?', a: 'Občané EU, EHP a Švýcarska povolení nepotřebují. Občané třetích zemí zpravidla ano, pokud nemají volný vstup na trh práce. Podrobnosti vysvětluje stránka o pracovních povoleních a o zaměstnávání cizinců.' },
    { q: 'Jak získám zaměstnaneckou kartu a jak ji prodloužím?', a: 'Řízení vede přes nahlášení volného místa a žádost u Ministerstva vnitra; prodloužení se řeší včas před koncem platnosti. Konkrétní lhůty a přílohy ověřte u úřadu. Viz stránky o získání a prodloužení karty.' },
    { q: 'Co je nelegální práce a jaké hrozí sankce?', a: 'Mimo jiné práce bez oprávnění, před jeho platností nebo v rozporu s ním. Sankce stanovuje zákon o zaměstnanosti; konkrétní výši neuvádíme a zveřejňují ji Úřad práce ČR a SÚIP.' },
    { q: 'Spadá zaměstnaný cizinec do pojištění a jak je to s daněmi?', a: 'Zaměstnání v ČR zpravidla zakládá účast ve zdravotním i sociálním pojištění; u daní rozhoduje daňová rezidence a zdroj příjmu. Konkrétní sazby uvádějí ČSSZ, zdravotní pojišťovny a finanční správa.' },
    { q: 'Liší se postup podle země původu pracovníka?', a: 'Rámec je společný pro třetí země; specifika má například režim dočasné ochrany u části pracovníků z Ukrajiny. Orientační přehledy najdete na stránkách podle zemí.' },
    { q: 'Slibujete zaměstnání, schválení nebo víza v daném termínu?', a: 'Ne. Neuvádíme sliby zaměstnání, schválení ani termíny vyřízení. Jde o obecné informace; konkrétní podmínky se mohou měnit a je nutné je ověřit u úřadů.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonOPobytuCizincu, SRC.mvcr, SRC.upcr, SRC.cssz, SRC.financniSprava],
  internalLinks: [
    cornerstoneLink,
    { href: '/jak-ziskat-zamestnaneckou-kartu', label: 'Jak získat zaměstnaneckou kartu' },
    { href: '/prodlouzeni-zamestnanecke-karty', label: 'Prodloužení zaměstnanecké karty' },
    { href: '/zmena-zamestnavatele-zamestnanecka-karta', label: 'Změna zaměstnavatele při kartě' },
    { href: '/modra-karta-vs-zamestnanecka-karta', label: 'Modrá karta vs zaměstnanecká karta' },
    { href: '/povinnosti-pri-zamestnavani-cizincu', label: 'Povinnosti při zaměstnávání cizinců' },
    { href: '/nelegalni-zamestnavani-cizincu', label: 'Nelegální zaměstnávání cizinců' },
    { href: '/sankce-za-nelegalni-zamestnavani', label: 'Sankce za nelegální zaměstnávání' },
    { href: '/kontrola-inspektoratu-prace', label: 'Kontrola inspektorátu práce' },
    { href: '/zdravotni-pojisteni-cizincu', label: 'Zdravotní pojištění cizinců' },
    { href: '/socialni-pojisteni-cizincu', label: 'Sociální pojištění cizinců' },
    { href: '/dane-cizincu-v-cr', label: 'Daně cizinců v ČR' },
    { href: '/prava-a-povinnosti-cizincu', label: 'Práva a povinnosti cizinců' },
    { href: '/prace-pro-ukrajince-v-cr', label: 'Práce pro Ukrajince v ČR' },
    { href: '/prace-pro-moldavany-v-cr', label: 'Práce pro Moldavany v ČR' },
    { href: '/prace-pro-gruzince-v-cr', label: 'Práce pro Gruzínce v ČR' },
    { href: '/prace-pro-filipince-v-cr', label: 'Práce pro Filipínce v ČR' },
    { href: '/prace-pro-srby-v-cr', label: 'Práce pro Srby v ČR' },
    glossaryLink,
    verifyHubLink,
    { href: '/faq-zamestnavani-pracovniku', label: 'Obecné FAQ k zaměstnávání pracovníků' },
  ],
  cta: {
    eyebrow: 'Nenašli jste odpověď?',
    title: 'Máte konkrétní dotaz?',
    text: 'Rádi vám pomůžeme s náborem i s orientací v administrativě zaměstnávání cizinců. Ozvěte se nám.',
    buttonLabel: 'Kontaktujte nás',
    href: '/contact',
  },
  showToc: false,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const SLOVNIK_POJMU_ZAMESTNAVANI_CIZINCU: SeoPage = {
  slug: 'slovnik-pojmu-zamestnavani-cizincu',
  breadcrumbLabel: 'Slovník pojmů',
  eyebrow: 'Slovník · Cizinci',
  title: 'Slovník pojmů: zaměstnávání cizinců',
  heroSubtitle:
    'Stručná a srozumitelná vysvětlení klíčových pojmů, se kterými se při zaměstnávání cizinců setkáte. Obecné informace s odkazy na podrobné stránky a zdroje.',
  description:
    'Slovník pojmů k zaměstnávání cizinců v ČR – zaměstnanecká a modrá karta, duální oprávnění, volný vstup na trh práce, dočasná ochrana, oznamovací povinnost a další. Se zdroji.',
  keywords: ['slovník pojmů cizinci', 'zaměstnanecká karta pojem', 'duální oprávnění', 'volný vstup na trh práce', 'dočasná ochrana', 'oznamovací povinnost'],
  intro:
    'Zaměstnávání cizinců provází řada pojmů, které se snadno zamění. Tento slovník vysvětluje klíčové termíny stručně a srozumitelně, aby se v nich zaměstnavatel i pracovník zorientovali a používali je správně. U pojmů, jejichž obsah určují předpisy nebo úřady, odkazujeme na podrobné stránky a oficiální zdroje. Definice jsou zjednodušené pro orientaci a nenahrazují závazné znění předpisů ani individuální posouzení; konkrétní podmínky se mohou měnit a je vhodné je ověřit u příslušného úřadu.',
  sections: [
    {
      heading: 'Oprávnění a pobyt',
      body: [
        'Tato skupina pojmů se týká toho, na základě čeho cizinec v ČR pobývá a pracuje.',
      ],
      bullets: [
        'Duální oprávnění – jeden doklad spojující pobyt i práci (např. zaměstnanecká karta).',
        'Zaměstnanecká karta – nejčastější duální oprávnění pro dlouhodobé zaměstnání.',
        'Modrá karta – duální oprávnění pro vysoce kvalifikované pozice, součást evropského schématu.',
        'Povolení k zaměstnání – vydává Úřad práce ČR, typicky pro krátkodobé a sezónní poměry.',
        'Volný vstup na trh práce – stav, kdy pracovník nepotřebuje pracovní povolení (např. občané EU).',
        'Dočasná ochrana – zvláštní pobytový režim s vlastními pravidly (tzv. Lex Ukrajina).',
      ],
    },
    {
      heading: 'Administrativa a compliance',
      body: [
        'Tato skupina pojmů se týká povinností zaměstnavatele a souladu s předpisy.',
      ],
      bullets: [
        'Oznamovací povinnost – povinnost ohlásit Úřadu práce ČR vymezené skutečnosti.',
        'Evidenční povinnost – vedení evidence zaměstnávaných cizinců.',
        'Nelegální práce – výkon práce bez oprávnění, před jeho platností nebo v rozporu s ním.',
        'Inspekce práce – dohled nad dodržováním předpisů (SÚIP, oblastní inspektoráty).',
        'Agenturní zaměstnávání – pracovník je zaměstnancem agentury a je dočasně přidělen k uživateli.',
      ],
    },
    {
      heading: 'Pojištění a daně',
      body: [
        'Tato skupina pojmů se týká odvodů a daňového postavení pracovníka.',
      ],
      bullets: [
        'Veřejné zdravotní pojištění – systém, do kterého zpravidla spadá zaměstnanec v ČR.',
        'Sociální pojištění – odvody na sociální zabezpečení; u přeshraničních situací rozhoduje koordinace.',
        'Koordinace sociálního zabezpečení – pravidla EU určující jeden příslušný stát pojištění.',
        'Daňový rezident / nerezident – status určující rozsah zdanění příjmů v ČR.',
      ],
    },
  ],
  faq: [
    { q: 'Co je duální oprávnění?', a: 'Doklad, který v jednom spojuje povolení k pobytu i k práci – například zaměstnanecká nebo modrá karta. Vydává je Ministerstvo vnitra.' },
    { q: 'Co znamená volný vstup na trh práce?', a: 'Stav, kdy pracovník nepotřebuje pracovní povolení – typicky občané EU, EHP a Švýcarska a vybrané skupiny cizinců (např. osoby s trvalým pobytem).' },
    { q: 'Je tento slovník závazný?', a: 'Ne. Definice jsou zjednodušené pro orientaci a nenahrazují závazné znění předpisů. Konkrétní podmínky ověřte u příslušného úřadu.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonOPobytuCizincu, SRC.mvcr, SRC.upcr],
  internalLinks: [
    cornerstoneLink,
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení' },
    { href: '/modra-karta-vs-zamestnanecka-karta', label: 'Modrá karta vs zaměstnanecká karta' },
    { href: '/nelegalni-zamestnavani-cizincu', label: 'Nelegální zaměstnávání cizinců' },
    faqHubLink,
    verifyHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const KDE_OVERIT_INFORMACE_PRO_CIZINCE: SeoPage = {
  slug: 'kde-overit-informace-pro-cizince',
  breadcrumbLabel: 'Kde ověřit informace',
  eyebrow: 'Zdroje · Cizinci',
  title: 'Kde ověřit informace pro cizince: oficiální zdroje',
  heroSubtitle:
    'Přehled oficiálních institucí a zdrojů, kde si ověřit aktuální podmínky pobytu, práce, pojištění a daní. Obecné informace s odkazy na oficiální zdroje.',
  description:
    'Kde ověřit informace pro cizince v ČR – přehled oficiálních zdrojů: MV ČR (OAMP), Úřad práce ČR, MPSV, ČSSZ, zdravotní pojišťovny, finanční správa, MZV, SÚIP a EURES.',
  keywords: ['kde ověřit informace cizinci', 'oficiální zdroje cizinci', 'OAMP', 'Úřad práce ČR', 'ČSSZ finanční správa', 'EURES MZV SÚIP'],
  intro:
    'Podmínky pobytu, práce, pojištění a daní se mohou měnit, a proto je u konkrétních údajů vždy nejlepší vyjít z oficiálního zdroje. Tato stránka přehledně shrnuje, která instituce je k jaké oblasti příslušná, abyste věděli, kde si aktuální informaci ověřit. Slouží jako rozcestník k oficiálním zdrojům celého clusteru. Záměrně neuvádíme konkrétní hodnoty (sazby, lhůty, poplatky) – ty patří právě do oficiálních zdrojů uvedených níže, které se průběžně aktualizují. Jde o obecné informace, nikoli o právní poradenství.',
  sections: [
    {
      heading: 'Pobyt a oprávnění',
      body: [
        'V otázkách pobytu cizinců a pobytových oprávnění (zaměstnanecká karta, modrá karta, ICT karta, dočasná ochrana) je příslušné Ministerstvo vnitra, Odbor azylové a migrační politiky (OAMP). V otázkách víz a konzulárních náležitostí Ministerstvo zahraničních věcí a zastupitelské úřady.',
      ],
      bullets: [
        'Pobyt a pobytová oprávnění – MV ČR (OAMP)',
        'Víza a konzulární náležitosti – MZV ČR a zastupitelské úřady',
      ],
    },
    {
      heading: 'Práce, povolení a trh práce',
      body: [
        'Pro povolení k zaměstnání, nahlašování volných míst, oznamovací povinnosti a otázky zprostředkování zaměstnání je příslušný Úřad práce ČR; metodicky pak Ministerstvo práce a sociálních věcí. Dohled v oblasti pracovněprávní a nelegální práce vykonává Státní úřad inspekce práce.',
        'Pro nabídku práce v rámci EU slouží portál EURES; statistické přehledy trhu práce zveřejňuje Český statistický úřad.',
      ],
      bullets: [
        'Povolení a oznamovací povinnosti – Úřad práce ČR, MPSV',
        'Dohled a kontroly – Státní úřad inspekce práce (SÚIP)',
        'Pracovní mobilita v EU – EURES',
        'Statistiky trhu práce – ČSÚ',
      ],
    },
    {
      heading: 'Pojištění a daně',
      body: [
        'Sociální pojištění a koordinaci sociálního zabezpečení řeší Česká správa sociálního zabezpečení; veřejné zdravotní pojištění zdravotní pojišťovny (například VZP). Daňové otázky včetně rezidence a zdanění příjmů řeší finanční správa.',
      ],
      bullets: [
        'Sociální pojištění a koordinace – ČSSZ',
        'Zdravotní pojištění – zdravotní pojišťovny (např. VZP)',
        'Daně z příjmů – finanční správa',
      ],
    },
  ],
  faq: [
    { q: 'Kam se obrátit ohledně zaměstnanecké nebo modré karty?', a: 'Na Ministerstvo vnitra, Odbor azylové a migrační politiky (OAMP), které o pobytových oprávněních rozhoduje a zveřejňuje aktuální podmínky.' },
    { q: 'Kde ověřit povinnosti a oznamování u zaměstnávání cizinců?', a: 'U Úřadu práce ČR, metodicky u MPSV. Dohled vykonává Státní úřad inspekce práce (SÚIP).' },
    { q: 'Kde zjistím aktuální sazby pojistného a daní?', a: 'Sazby sociálního pojištění u ČSSZ, zdravotního u zdravotních pojišťoven a daňové otázky u finanční správy. Tato stránka konkrétní hodnoty neuvádí.' },
  ],
  sources: [SRC.mvcr, SRC.upcr, SRC.mpsv, SRC.cssz, SRC.financniSprava, SRC.vzp, SRC.mzv, SRC.suip, SRC.eures, SRC.czso],
  internalLinks: [
    cornerstoneLink,
    { href: '/povinnosti-pri-zamestnavani-cizincu', label: 'Povinnosti při zaměstnávání cizinců' },
    { href: '/dane-cizincu-v-cr', label: 'Daně cizinců v ČR' },
    { href: '/zdravotni-pojisteni-cizincu', label: 'Zdravotní pojištění cizinců' },
    glossaryLink,
    faqHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────
// Registry — ordered by cluster level.
// ──────────────────────────────────────────────────────────────────────────

export const FOREIGN_WORKER_PAGES: ReadonlyArray<SeoPage> = [
  // Level 2 — documents & cards
  JAK_ZISKAT_ZAMESTNANECKOU_KARTU,
  PRODLOUZENI_ZAMESTNANECKE_KARTY,
  ZMENA_ZAMESTNAVATELE_ZAMESTNANECKA_KARTA,
  MODRA_KARTA_VS_ZAMESTNANECKA_KARTA,
  // Level 3 — employer compliance
  POVINNOSTI_PRI_ZAMESTNAVANI_CIZINCU,
  NELEGALNI_ZAMESTNAVANI_CIZINCU,
  SANKCE_ZA_NELEGALNI_ZAMESTNAVANI,
  KONTROLA_INSPEKTORATU_PRACE,
  // Level 4 — practical employment
  ZDRAVOTNI_POJISTENI_CIZINCU,
  SOCIALNI_POJISTENI_CIZINCU,
  DANE_CIZINCU_V_CR,
  PRAVA_A_POVINNOSTI_CIZINCU,
  // Level 5 — country cluster
  PRACE_PRO_UKRAJINCE_V_CR,
  PRACE_PRO_MOLDAVANY_V_CR,
  PRACE_PRO_GRUZINCE_V_CR,
  PRACE_PRO_FILIPINCE_V_CR,
  PRACE_PRO_SRBY_V_CR,
  // Level 6 — authority + FAQ
  FAQ_ZAMESTNAVANI_CIZINCU,
  SLOVNIK_POJMU_ZAMESTNAVANI_CIZINCU,
  KDE_OVERIT_INFORMACE_PRO_CIZINCE,
]
