// Cornerstone SEO pages — the long-form, authoritative pillars of the cluster.
// Two cornerstones (zamestnavani-cizincu, socialni-zdravotni-dane-2026) keep
// their existing dedicated page implementations; the three below are built on
// the shared SeoArticle layer. Content is qualitative and source-backed — no
// invented rates, amounts or statistics.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-05-23'

const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}

export const PRACOVNI_POVOLENI_CR: SeoPage = {
  slug: 'pracovni-povoleni-cr',
  breadcrumbLabel: 'Pracovní povolení v ČR',
  eyebrow: 'Pracovní právo · Cizinci',
  title: 'Pracovní povolení v ČR: kdo ho potřebuje a jak proces probíhá',
  heroSubtitle:
    'Přehledné vysvětlení pracovního povolení a souvisejících oprávnění v České republice – kdo je potřebuje, jak se o ně žádá a na co si dát pozor. Obecné informace, nikoli právní poradenství.',
  description:
    'Co je pracovní povolení v ČR, kdo ho potřebuje a kdo má volný vstup na trh práce, jak proces probíhá a jaké typy oprávnění existují. Vysvětlení s odkazy na oficiální zdroje.',
  keywords: [
    'pracovní povolení ČR',
    'povolení k zaměstnání',
    'zaměstnanecká karta',
    'modrá karta',
    'volný vstup na trh práce',
    'Úřad práce ČR',
  ],
  intro:
    'Pojem „pracovní povolení“ se v praxi používá pro několik různých oprávnění, která cizinci umožňují legálně pracovat v České republice. Pro správné rozhodnutí je nutné rozlišit, zda má pracovník volný vstup na trh práce, nebo zda potřebuje samostatné povolení k zaměstnání, případně duální oprávnění typu zaměstnanecké nebo modré karty. Tato stránka vysvětluje rozdíly, popisuje obvyklý průběh řízení a upozorňuje na nejčastější nejasnosti. Konkrétní podmínky se mohou měnit a vždy je vhodné je ověřit u Úřadu práce ČR a Ministerstva vnitra.',
  sections: [
    {
      heading: 'Co je pracovní povolení a jaké typy oprávnění existují',
      body: [
        'V českém právním prostředí je „pracovní povolení“ zastřešující výraz. Samotné povolení k zaměstnání vydává Úřad práce ČR a používá se zejména u krátkodobých, sezónních nebo specifických pracovních poměrů. Vedle něj existují duální oprávnění, která spojují povolení k pobytu i k zaměstnání do jednoho dokladu.',
        'Pro dlouhodobé zaměstnání občanů třetích zemí se nejčastěji využívá zaměstnanecká karta, pro vysoce kvalifikované pozice modrá karta a pro vnitropodnikové převedení karta ICT. Volba správného typu oprávnění závisí na zemi původu, kvalifikaci, délce pracovního poměru a charakteru pozice.',
      ],
      bullets: [
        'Povolení k zaměstnání – vydává Úřad práce ČR (typicky sezónní a krátkodobé poměry)',
        'Zaměstnanecká karta – duální oprávnění k pobytu i zaměstnání',
        'Modrá karta – pro vysoce kvalifikované pracovníky',
        'Karta ICT – vnitropodnikové převedení zaměstnance',
      ],
    },
    {
      heading: 'Kdo pracovní povolení potřebuje a kdo má volný vstup',
      body: [
        'Občané EU, států Evropského hospodářského prostoru (Norsko, Island, Lichtenštejnsko) a Švýcarska a jejich rodinní příslušníci mají na český trh práce volný vstup a pracovní povolení nepotřebují. Jejich zaměstnání však podléhá ohlašovací povinnosti zaměstnavatele vůči Úřadu práce ČR.',
        'Vybrané skupiny cizinců ze třetích zemí mají rovněž volný vstup na trh práce – například osoby s trvalým pobytem nebo s udělenou mezinárodní ochranou. Ostatní občané třetích zemí zpravidla potřebují platné pracovní i pobytové oprávnění. Konkrétní výjimky vymezuje zákon o zaměstnanosti.',
      ],
    },
    {
      heading: 'Jak řízení obvykle probíhá',
      body: [
        'U pozic, kde je vyžadováno oprávnění, je častým prvním krokem nahlášení volného pracovního místa do evidence Úřadu práce ČR. Teprve poté se podává žádost o příslušné povolení nebo kartu. Žádosti o zaměstnaneckou, modrou nebo ICT kartu vyřizuje Ministerstvo vnitra, Odbor azylové a migrační politiky.',
        'Lhůty, správní poplatky a požadované přílohy se liší podle typu oprávnění a mohou se v čase měnit. Tato stránka záměrně neuvádí konkrétní lhůty ani poplatky – aktuální hodnoty je nutné ověřit u příslušného úřadu.',
      ],
      bullets: [
        'Nahlášení volného pracovního místa Úřadu práce ČR (je-li vyžadováno)',
        'Podání žádosti o správný typ oprávnění',
        'Doložení požadovaných dokladů (smlouva, kvalifikace, doklad o ubytování)',
        'Vyčkání na rozhodnutí a nástup až po nabytí platnosti oprávnění',
      ],
    },
    {
      heading: 'Praktická interpretace pro zaměstnavatele',
      body: [
        'Z pohledu zaměstnavatele je klíčové ověřit, že pracovník smí danou práci vykonávat ještě před nástupem. Zahájení práce před nabytím platnosti oprávnění se posuzuje jako nelegální práce a může vést k sankcím podle zákona o zaměstnanosti.',
        'Doporučujeme vést přehlednou evidenci platnosti oprávnění, hlídat termíny prodloužení a plnit informační a oznamovací povinnosti vůči Úřadu práce ČR. Pracovní agentura může tyto kroky koordinovat, formálním zaměstnavatelem agenturního pracovníka přitom zůstává agentura.',
      ],
    },
  ],
  faq: [
    {
      q: 'Potřebuje občan EU pracovní povolení v ČR?',
      a: 'Ne. Občané EU, EHP a Švýcarska mají na český trh práce volný vstup a pracovní povolení nepotřebují. Zaměstnavatel však má vůči Úřadu práce ČR ohlašovací a evidenční povinnost.',
    },
    {
      q: 'Jaký je rozdíl mezi povolením k zaměstnání a zaměstnaneckou kartou?',
      a: 'Povolení k zaměstnání vydává Úřad práce ČR a řeší pouze přístup k práci; používá se zejména u krátkodobých a sezónních poměrů. Zaměstnanecká karta je duální oprávnění, které spojuje povolení k pobytu i k zaměstnání a vydává ji Ministerstvo vnitra.',
    },
    {
      q: 'Může cizinec nastoupit do práce hned po podání žádosti?',
      a: 'Zpravidla ne. Práci je možné zahájit až poté, co je příslušné oprávnění platné. Nástup před nabytím platnosti se může posuzovat jako nelegální práce. Konkrétní situaci ověřte u Úřadu práce ČR nebo Ministerstva vnitra.',
    },
    {
      q: 'Kde zjistím aktuální lhůty a poplatky?',
      a: 'Aktuální lhůty, správní poplatky a seznam příloh zveřejňují Úřad práce ČR a Ministerstvo vnitra (Odbor azylové a migrační politiky). Tato stránka konkrétní hodnoty neuvádí, aby nezobrazovala neaktuální údaje.',
    },
  ],
  sources: [
    SRC.zakonOZamestnanosti,
    SRC.zakonOPobytuCizincu,
    SRC.upcr,
    SRC.mvcr,
  ],
  internalLinks: [
    { href: '/zamestnavani-cizincu', label: 'Zjistěte více o zaměstnávání cizinců v ČR' },
    { href: '/zamestnanecka-karta-2026', label: 'Podrobně k zaměstnanecké kartě' },
    { href: '/modra-karta-cr', label: 'Modrá karta pro kvalifikované pracovníky' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Jaké dokumenty jsou potřeba' },
    { href: '/legalizace-prace-cizincu', label: 'Jak legálně zaměstnat cizince' },
    { href: '/faq-zamestnavani-pracovniku', label: 'Časté dotazy k zaměstnávání pracovníků' },
  ],
  cta: {
    eyebrow: 'Nábor a administrativa',
    title: 'Potřebujete se zorientovat v povoleních?',
    text: 'Pomůžeme vám nastavit nábor zahraničních pracovníků tak, aby odpovídal aktuálním pravidlům a navazoval na ověřené oficiální zdroje.',
    buttonLabel: 'Domluvit konzultaci',
    href: '/contact',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const MINIMALNI_MZDA_2026: SeoPage = {
  slug: 'minimalni-mzda-2026',
  breadcrumbLabel: 'Minimální mzda 2026',
  eyebrow: 'Mzdy · Pracovní právo',
  title: 'Minimální mzda 2026 v ČR: co znamená a koho se týká',
  heroSubtitle:
    'Vysvětlení pojmu minimální mzda a zaručené mzdy v České republice pro rok 2026 – komu náleží, jaké má dopady a kde ověřit aktuální výši. Bez vymyšlených částek.',
  description:
    'Co je minimální mzda v ČR pro rok 2026, koho se týká, jak souvisí se zaručenou mzdou a jaké má dopady pro zaměstnavatele. Aktuální částky ověřte u MPSV – tato stránka je neuvádí.',
  keywords: [
    'minimální mzda 2026',
    'minimální mzda ČR',
    'zaručená mzda',
    'MPSV minimální mzda',
    'mzdové náklady',
    'odměňování zaměstnanců',
  ],
  intro:
    'Minimální mzda je nejnižší přípustná odměna za práci v pracovněprávním vztahu. Pro rok 2026 jako v každém roce platí, že její konkrétní výši stanovují právní předpisy a může se meziročně měnit. Tato stránka vysvětluje, co minimální mzda znamená, jak se liší od zaručené mzdy, koho se týká a jaké má praktické dopady pro zaměstnavatele i zaměstnance. Záměrně neuvádíme konkrétní částku pro rok 2026 – aktuální hodnotu je nutné ověřit u Ministerstva práce a sociálních věcí, protože nesprávné číslo by mohlo vést k chybnému rozhodnutí.',
  sections: [
    {
      heading: 'Co je minimální mzda',
      body: [
        'Minimální mzda představuje zákonem chráněnou spodní hranici odměny za vykonanou práci. Vztahuje se na zaměstnance v pracovním poměru i na osoby pracující na základě dohod o pracích konaných mimo pracovní poměr. Pravidla pro minimální mzdu vycházejí ze zákoníku práce a navazujících předpisů.',
        'Vedle minimální mzdy český systém pracuje také s pojmem nejnižších úrovní zaručené mzdy, které zohledňují složitost, odpovědnost a namáhavost práce. Konkrétní výše obou hodnot se může v čase měnit a stanovuje ji prováděcí právní úprava.',
      ],
    },
    {
      heading: 'Koho se minimální mzda týká',
      body: [
        'Minimální mzda se týká prakticky všech zaměstnavatelů a zaměstnanců bez ohledu na obor. Uplatňuje se i u zkrácených úvazků, kde se posuzuje poměrně podle odpracované doby. Týká se rovněž agenturních pracovníků, u nichž je formálním zaměstnavatelem pracovní agentura.',
        'U cizinců nemá státní příslušnost na nárok na minimální mzdu vliv – rozhodující je existence pracovněprávního vztahu na území ČR. U některých pobytových oprávnění navíc bývá dostatečná výše odměny jednou z podmínek jejich vydání.',
      ],
    },
    {
      heading: 'Dopady pro zaměstnavatele',
      body: [
        'Výše minimální a zaručené mzdy ovlivňuje nejen samotnou mzdu, ale i navazující veličiny, například minimální vyměřovací základy pro pojistné. Zaměstnavatel by měl při plánování rozpočtu počítat s tím, že se tyto hodnoty mohou meziročně měnit.',
        'Pro správné nastavení mezd doporučujeme vycházet z aktuálních údajů MPSV a sledovat změny předpisů. Tato stránka neuvádí konkrétní částky pro rok 2026, aby nedošlo k použití neaktuální hodnoty.',
      ],
      bullets: [
        'Kontrola, zda všechny pozice odpovídají aktuální minimální a zaručené mzdě',
        'Zohlednění dopadu na pojistné a další odvody',
        'Sledování meziročních změn předpisů',
        'Zvláštní pozornost u zkrácených úvazků a dohod',
      ],
    },
    {
      heading: 'Kde ověřit aktuální výši',
      body: [
        'Aktuální výši minimální mzdy a nejnižších úrovní zaručené mzdy pro rok 2026 zveřejňuje Ministerstvo práce a sociálních věcí. Doporučujeme vycházet vždy z oficiálního zdroje a u konkrétních výpočtů případně konzultovat mzdovou účetní.',
      ],
    },
  ],
  faq: [
    {
      q: 'Jaká je minimální mzda v roce 2026?',
      a: 'Konkrétní částku tato stránka záměrně neuvádí, protože se výše může měnit a uvedení neaktuálního čísla by mohlo vést k chybě. Aktuální hodnotu pro rok 2026 ověřte přímo u Ministerstva práce a sociálních věcí (MPSV).',
    },
    {
      q: 'Jaký je rozdíl mezi minimální a zaručenou mzdou?',
      a: 'Minimální mzda je obecná spodní hranice odměny za práci. Nejnižší úrovně zaručené mzdy navíc zohledňují složitost a náročnost práce a mohou být vyšší. Obě hodnoty stanovují právní předpisy.',
    },
    {
      q: 'Týká se minimální mzda i cizinců a agenturních pracovníků?',
      a: 'Ano. Nárok na minimální mzdu se odvíjí od existence pracovněprávního vztahu v ČR, nikoli od státní příslušnosti. U agenturních pracovníků je formálním zaměstnavatelem agentura, která odpovídá za dodržení minimální mzdy.',
    },
    {
      q: 'Mění se minimální mzda u zkráceného úvazku?',
      a: 'U zkrácených úvazků se minimální mzda posuzuje poměrně podle odpracované doby. Konkrétní výpočet vychází z aktuálních hodnot a z rozsahu sjednané práce.',
    },
  ],
  sources: [SRC.zakonikPrace, SRC.mpsv, SRC.cssz],
  internalLinks: [
    { href: '/naklady-na-zamestnance-cr', label: 'Z čeho se skládají náklady na zaměstnance' },
    { href: '/socialni-zdravotni-dane-2026', label: 'Přehled odvodů v roce 2026' },
    { href: '/povinnosti-zamestnavatele', label: 'Povinnosti zaměstnavatele' },
    { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' },
    { href: '/faq-zamestnavani-pracovniku', label: 'Časté dotazy k zaměstnávání pracovníků' },
  ],
  cta: {
    eyebrow: 'Mzdy a nábor',
    title: 'Plánujete mzdové rozpočty a nábor?',
    text: 'Pomůžeme vám nastavit nábor a odměňování tak, aby dávaly ekonomický smysl a odpovídaly aktuálním předpisům.',
    buttonLabel: 'Domluvit konzultaci',
    href: '/contact',
  },
  meta: { ...meta, dataYear: 2026 },
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ZAHRANICNICH_PRACOVNIKU: SeoPage = {
  slug: 'nabor-zahranicnich-pracovniku',
  breadcrumbLabel: 'Nábor zahraničních pracovníků',
  eyebrow: 'Nábor · Cizinci',
  title: 'Nábor zahraničních pracovníků: jak proces probíhá krok za krokem',
  heroSubtitle:
    'Praktický průvodce náborem zahraničních pracovníků do České republiky – od definice potřeby přes výběr a dokumentaci až po nástup a compliance. Strukturovaně a srozumitelně.',
  description:
    'Jak probíhá nábor zahraničních pracovníků do ČR – sourcing, výběr, dokumentace, onboarding a compliance. Praktický průvodce pro zaměstnavatele s odkazy na oficiální zdroje.',
  keywords: [
    'nábor zahraničních pracovníků',
    'nábor cizinců',
    'sourcing pracovníků',
    'onboarding cizinců',
    'pracovní agentura',
    'zaměstnávání cizinců',
  ],
  intro:
    'Nábor zahraničních pracovníků kombinuje běžné personální činnosti s administrativou spojenou s pobytovými a pracovními oprávněními. Úspěšný proces stojí na přesné definici potřeby, korektním výběru kandidátů a důsledné dokumentaci. Tato stránka popisuje jednotlivé fáze náboru tak, jak obvykle probíhají v praxi, a upozorňuje na místa, kde je vhodné ověřit aktuální podmínky u Úřadu práce ČR a Ministerstva vnitra. Cílem je poskytnout praktický rámec, nikoli individuální právní poradenství.',
  sections: [
    {
      heading: 'Definice potřeby a sourcing',
      body: [
        'Prvním krokem je přesné vymezení pozice: počet pracovníků, požadovaná kvalifikace, lokalita, předpokládaná délka pracovního poměru a jazykové nároky. Tato definice rozhoduje o tom, jaké typy oprávnění budou připadat v úvahu a z jakých zemí má smysl pracovníky oslovovat.',
        'Sourcing může probíhat přes vlastní databáze, partnerské sítě, portál EURES pro občany EU nebo přes specializované náborové kanály. U občanů třetích zemí je vhodné už ve fázi sourcingu zohlednit dostupnost a náročnost povolovacího řízení.',
      ],
      bullets: [
        'Profil pozice, kvalifikace a lokalita',
        'Předpokládaná délka pracovního poměru',
        'Volba zdrojových zemí podle dostupnosti a oprávnění',
        'Využití EURES u občanů EU',
      ],
    },
    {
      heading: 'Výběr a ověření',
      body: [
        'Výběr kandidátů zahrnuje pohovory, ověření kvalifikace a referencí a posouzení, zda profil odpovídá potřebě zaměstnavatele. U zahraničních pracovníků je vhodné ověřit i jazykové předpoklady a očekávání ohledně ubytování a dopravy.',
        'Transparentnost vůči kandidátům je zároveň povinností vyplývající z ochrany osobních údajů (GDPR). Kandidáti by měli být informováni o tom, jak se s jejich údaji nakládá a kdo je zpracovává.',
      ],
    },
    {
      heading: 'Dokumentace a oprávnění',
      body: [
        'Po výběru následuje shromáždění dokladů a podání žádostí o příslušná oprávnění. Konkrétní sada dokumentů se liší podle země původu a typu oprávnění, obvykle však zahrnuje cestovní doklad, doklad o kvalifikaci, pracovní smlouvu nebo příslib zaměstnání a doklad o zajištění ubytování.',
        'U pozic vyžadujících oprávnění bývá nutné nejprve nahlásit volné pracovní místo Úřadu práce ČR. Aktuální seznam příloh a lhůt ověřte u příslušného úřadu – tato stránka je neuvádí, aby nezobrazovala neaktuální údaje.',
      ],
    },
    {
      heading: 'Onboarding a compliance',
      body: [
        'Nástup pracovníka je možný až po nabytí platnosti potřebných oprávnění. Onboarding zahrnuje vstupní školení BOZP, seznámení s pracovištěm, mzdové a evidenční úkony a u cizinců splnění oznamovacích povinností vůči úřadům.',
        'Po nástupu je důležité hlídat platnost oprávnění, termíny prodloužení a hlásit změny. U agenturního zaměstnávání plní část těchto povinností pracovní agentura jako formální zaměstnavatel, vždy však ve spolupráci s uživatelem.',
      ],
      bullets: [
        'Nástup až po nabytí platnosti oprávnění',
        'Vstupní školení BOZP a seznámení s pracovištěm',
        'Splnění oznamovacích povinností u cizinců',
        'Sledování platnosti a prodloužení oprávnění',
      ],
    },
  ],
  faq: [
    {
      q: 'Jak dlouho nábor zahraničního pracovníka trvá?',
      a: 'Délka závisí na zemi původu, typu oprávnění a aktuálních lhůtách úřadů. U pozic vyžadujících povolení je třeba počítat s časem na povolovací řízení. Aktuální lhůty zveřejňuje Úřad práce ČR a Ministerstvo vnitra.',
    },
    {
      q: 'Mohu pracovníka zaměstnat ještě před vyřízením povolení?',
      a: 'Práci lze zahájit až po nabytí platnosti potřebného oprávnění. Dřívější nástup se může posuzovat jako nelegální práce. Doporučujeme nástup vázat na potvrzenou platnost dokladů.',
    },
    {
      q: 'Jakou roli hraje pracovní agentura?',
      a: 'Pracovní agentura může koordinovat sourcing, výběr i administrativu a u agenturního zaměstnávání je formálním zaměstnavatelem pracovníka. Musí mít platné povolení ke zprostředkování zaměstnání podle zákona o zaměstnanosti.',
    },
    {
      q: 'Jaké dokumenty bude pracovník potřebovat?',
      a: 'Obvykle cestovní doklad, doklad o kvalifikaci, pracovní smlouvu nebo příslib zaměstnání a doklad o zajištění ubytování. Přesný seznam se liší podle oprávnění; ověřte jej u příslušného úřadu.',
    },
  ],
  sources: [
    SRC.zakonOZamestnanosti,
    SRC.zakonOPobytuCizincu,
    SRC.upcr,
    SRC.mvcr,
    SRC.eures,
  ],
  internalLinks: [
    { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' },
    { href: '/pracovni-povoleni-cr', label: 'Jak funguje pracovní povolení' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Potřebné dokumenty pro zaměstnání cizinců' },
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    { href: '/ubytovani-pro-pracovniky', label: 'Ubytování pro pracovníky' },
    { href: '/chyby-pri-zamestnavani-cizincu', label: 'Nejčastější chyby při zaměstnávání cizinců' },
    { href: '/nedostatek-pracovniku-v-cr', label: 'Nedostatek pracovníků v ČR' },
  ],
  cta: {
    eyebrow: 'Nábor pracovníků',
    title: 'Hledáte zahraniční pracovníky?',
    text: 'Pomůžeme vám s náborem od definice potřeby až po nástup, včetně koordinace administrativy a souladu s předpisy.',
    buttonLabel: 'Poslat poptávku',
    href: '/submit-offer',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const CORNERSTONE_PAGES: ReadonlyArray<SeoPage> = [
  PRACOVNI_POVOLENI_CR,
  MINIMALNI_MZDA_2026,
  NABOR_ZAHRANICNICH_PRACOVNIKU,
]
