// Employer Knowledge Center content (Wave 2C).
//
// The Knowledge Center itself is NOT a new URL. /pro-zamestnavatele already
// holds that role — 71 contextual inbound links at depth 1 at baseline 1106bd6
// — so Wave 2 reorganises that hub around employer jobs-to-be-done rather than
// creating a competing hub that would split its authority.
//
// Only two knowledge pages survived dedup:
//
//   * /cena-neobsazene-pozice — three cost pages exist (kolik-stoji-zamestnanec,
//     skutecne-naklady-na-zamestnance, neprime-naklady-na-zamestnance) and all
//     three are about the cost of an EMPLOYEE. The cost of the vacancy itself —
//     the number that actually justifies a hiring decision — was uncovered.
//
//   * /zadani-pozice-a-profil-kandidata — recorded in Wave 1 as FUTURE under
//     the working name profil-odborne-pozice, broadened here beyond specialist
//     roles because the same failure (a brief that cannot be searched against)
//     affects volume hiring too.
//
// Everything else on the knowledge candidate list was merged into an existing
// page or deferred; see lib/content/growth-cohorts.ts.
//
// COST MODELLING. /cena-neobsazene-pozice teaches a METHOD and states no
// figure of its own. Every input is the employer's own number; the page
// deliberately refuses to publish a benchmark, because a credible one would
// have to come from data this site does not have.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-08-15'

const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}

const knowledgeCta = {
  eyebrow: 'Rozhodování o náboru',
  title: 'Potřebujete si to propočítat na konkrétní pozici?',
  text: 'Náklady na pracovní místo si můžete namodelovat v kalkulačce. Pokud řešíte konkrétní obsazení, popište nám pozici a probereme možnosti.',
  buttonLabel: 'Zadat poptávku',
  href: '/poptavka-pracovniku',
}

// ──────────────────────────────────────────────────────────────────────────

export const CENA_NEOBSAZENE_POZICE: SeoPage = {
  slug: 'cena-neobsazene-pozice',
  breadcrumbLabel: 'Cena neobsazené pozice',
  eyebrow: 'Náklady · Rozhodování',
  title: 'Cena neobsazené pozice: jak spočítat, co vás stojí prázdné místo',
  heroSubtitle:
    'Neobsazená pozice není úspora ušetřené mzdy. Návod, jak si sestavit vlastní propočet ze čtyř složek, které lze doložit z provozních dat vaší firmy.',
  description:
    'Cena neobsazené pozice – jak si sestavit vlastní propočet ze ztraceného výkonu, přesčasů, dopadů na kvalitu a nákladů náboru. Metoda bez vymyšlených čísel.',
  keywords: ['cena neobsazené pozice', 'náklady neobsazeného místa', 'ztráta z neobsazené pozice', 'kalkulace nákladů náboru', 'vacancy cost', 'ekonomika náboru'],
  intro:
    'Když se pozice nedaří obsadit, bývá prvním dojmem, že firma zatím šetří mzdu. Ve skutečnosti se náklad jen přesouvá jinam – do přesčasů, do zpomaleného výkonu, do kvality a do zatížení lidí, kteří práci pokrývají navíc. Dokud tento náklad nikdo nevyčíslí, vypadá prázdné místo levněji než jeho obsazení, a rozhodnutí o náboru se odkládá. Tato stránka nabízí metodu, jak si vlastní číslo sestavit. Žádnou konkrétní částku ani obecný násobek mzdy zde neuvádíme – všechny vstupy pocházejí z dat vašeho provozu, protože jen ta jsou pro vaše rozhodnutí použitelná.',
  sections: [
    {
      heading: 'Čtyři složky, ze kterých se náklad skládá',
      body: [
        'Propočet je smysluplný, když se drží toho, co lze doložit. V praxi se náklad neobsazené pozice skládá ze čtyř částí, z nichž každá se počítá jinak.',
        'Ztracený nebo odložený výkon je první a obvykle největší. Druhou tvoří náklady na pokrytí – přesčasy, příplatky, agenturní výpomoc nebo přesuny lidí z jiných pracovišť. Třetí jsou nepřímé dopady, které se projeví se zpožděním: chybovost, zmetkovitost, skluz termínů, přetížení zbylých lidí. Čtvrtou jsou vlastní náklady náboru, které se s délkou obsazování opakují.',
      ],
      bullets: [
        'Ztracený nebo odložený výkon',
        'Náklady na dočasné pokrytí (přesčasy, příplatky, výpomoc)',
        'Nepřímé dopady na kvalitu, termíny a zbytek týmu',
        'Opakované náklady vlastního náboru',
      ],
    },
    {
      heading: 'Jak vyčíslit ztracený výkon',
      body: [
        'Nejjednodušší použitelný postup vychází z toho, co dané pracovní místo za jednotku času přináší. U výrobní pozice je to obvykle podíl na objemu výroby, u obchodní role hodnota zpracovaných zakázek, u technické pozice odložené projekty.',
        'Klíčové je rozlišit, zda výkon skutečně mizí, nebo se jen odkládá. Odložená zakázka, kterou firma stihne později, není totéž jako neodvedená směna. Toto rozlišení je pro věrohodnost propočtu důležitější než přesnost na koruny – nadhodnocený propočet ztratí důvěru vedení stejně rychle jako žádný.',
      ],
    },
    {
      heading: 'Náklady na pokrytí se dají doložit nejsnáz',
      body: [
        'Tato část je z celého propočtu nejlépe doložitelná, protože už je zaúčtovaná. Stačí zjistit, kolik přesčasových hodin, příplatků nebo agenturních hodin připadá na pokrytí neobsazeného místa.',
        'PRÁVNÍ RÁMEC: příplatky za práci přesčas, v noci, o víkendu a ve svátek stanoví zákoník práce; jejich konkrétní výše i limity práce přesčas vycházejí z platné úpravy. Do propočtu patří skutečně vyplacené částky z vašeho mzdového systému, nikoli obecné sazby.',
        'Samotnou strukturu mzdových nákladů na pracovní místo si můžete namodelovat v kalkulačce, která pracuje s pravidly platnými v ČR.',
      ],
    },
    {
      heading: 'Nepřímé dopady: počítat opatrně, ale nevynechávat',
      body: [
        'Nepřímé dopady jsou nejhůř měřitelné a zároveň často nejdražší. Přetížený tým dělá víc chyb, roste zmetkovitost, klouzají termíny a v krajním případě začnou odcházet lidé, kteří výpadek pokrývali.',
        'Doporučený postup je nepokoušet se o přesnost, ale pracovat s rozpětím: jaký dopad je při současném stavu nejmenší představitelný a jaký největší. Rozpětí je poctivější než jediné číslo a pro rozhodování obvykle stačí, protože ukáže řádovou velikost.',
      ],
    },
    {
      heading: 'K čemu je propočet dobrý',
      body: [
        'Vyčíslení neslouží k tomu, aby se nábor za každou cenu zrychlil. Slouží k tomu, aby se rozhodovalo o srovnatelných věcech.',
        'Jakmile je náklad prázdného místa známý, dá se srovnat s náklady jednotlivých cest obsazení – s vyšší nabízenou mzdou, s náklady na zaškolení někoho méně zkušeného, s cenou agenturního zaměstnávání nebo s dopadem odloženého náběhu. Bez tohoto čísla se všechny tyto možnosti jeví jako výdaj, zatímco setrvalý stav vypadá zdarma.',
      ],
      bullets: [
        'Srovnání s náklady jednotlivých cest obsazení',
        'Podklad pro rozhodnutí o úpravě podmínek pozice',
        'Argument pro dřívější zahájení náboru u plánovaných potřeb',
        'Podklad pro rozhodnutí o zastupitelnosti a rezervě',
      ],
    },
    {
      heading: 'Čemu se v propočtu vyhnout',
      body: [
        'Nejčastější chybou je použít převzatý obecný násobek roční mzdy. Taková čísla kolují, ale nevztahují se k vašemu provozu a při první diskusi s finančním oddělením neobstojí.',
        'Druhou chybou je dvojí započtení – například vykázat současně plnou ztrátu výkonu i náklady na přesčasy, kterými byl tentýž výkon pokryt. Buď se výkon neodvedl, nebo se odvedl dráž; obojí zároveň neplatí.',
      ],
    },
  ],
  faq: [
    { q: 'Kolik stojí neobsazená pozice?', a: 'Univerzální částka neexistuje a neuvádíme ji. Náklad závisí na tom, co dané místo přináší, jak se výpadek pokrývá a jak dlouho trvá. Stránka popisuje metodu, jak si vlastní číslo sestavit z dat vašeho provozu.' },
    { q: 'Dá se použít obecný násobek roční mzdy?', a: 'Nedoporučujeme to. Takové násobky se nevztahují ke konkrétnímu provozu a při obhajobě rozpočtu neobstojí. Vlastní propočet ze čtyř složek je průkaznější, i když je hrubý.' },
    { q: 'Jak zahrnout dopady na kvalitu a termíny?', a: 'Nejlépe rozpětím od nejmenšího po největší představitelný dopad, nikoli jedním číslem. Rozpětí je poctivější a pro rozhodování zpravidla dostačuje, protože ukáže řádovou velikost.' },
    { q: 'Souvisí to s náklady na zaměstnance?', a: 'Ano, ale jde o opačnou stranu rovnice. Náklady na zaměstnance popisují, co stojí obsazené místo; tato stránka to, co stojí místo prázdné. Pro rozhodnutí jsou potřeba obě čísla.' },
  ],
  sources: [SRC.zakonikPrace, SRC.mpsv, SRC.czso, SRC.ispv, SRC.cssz],
  internalLinks: [
    { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' },
    { href: '/kolik-stoji-zamestnanec', label: 'Kolik stojí zaměstnanec' },
    { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
    { href: '/neprime-naklady-na-zamestnance', label: 'Nepřímé náklady na zaměstnance' },
    { href: '/jak-dlouho-trva-obsazeni-pozice', label: 'Jak dlouho trvá obsazení pozice' },
    { href: '/proc-se-nedari-obsadit-odbornou-pozici', label: 'Proč se nedaří obsadit odbornou pozici' },
  ],
  cta: knowledgeCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────

export const ZADANI_POZICE_A_PROFIL_KANDIDATA: SeoPage = {
  slug: 'zadani-pozice-a-profil-kandidata',
  breadcrumbLabel: 'Zadání pozice',
  eyebrow: 'Nábor · Zadání a profil',
  title: 'Zadání pozice a profil kandidáta: co musí obsahovat, aby se dalo hledat',
  heroSubtitle:
    'Většina neúspěšných náborů selhává na zadání, ne na trhu. Jak popsat pozici tak, aby se podle ní dalo skutečně vyhledávat a aby šlo kandidáty srovnávat.',
  description:
    'Jak sestavit zadání pozice a profil kandidáta – oddělení nutných a vítaných požadavků, popis práce místo výčtu vlastností a časté chyby v profilech.',
  keywords: ['zadání pozice', 'profil kandidáta', 'popis pracovní pozice', 'hiring brief', 'požadavky na kandidáta', 'jak zadat nábor'],
  intro:
    'Když se pozice dlouho nedaří obsadit, hledá se příčina obvykle na trhu. V praxi ale bývá dřív v zadání – v tom, jak je pozice popsaná. Profil, který vyjmenuje dvacet požadavků bez rozlišení důležitosti, nebo popíše vlastnosti místo práce, se nedá použít k vyhledávání ani ke srovnání uchazečů, a výběr se pak řídí dojmem. Tato stránka popisuje, co má zadání obsahovat, aby podle něj šlo skutečně hledat, jak oddělit nutné požadavky od vítaných a kterých chyb se v profilech opakovaně dopouštíme.',
  sections: [
    {
      heading: 'Zadání popisuje práci, ne ideálního člověka',
      body: [
        'Nejužitečnější posun je přestat popisovat, jaký má být člověk, a začít popisovat, co bude dělat. Formulace „samostatný, pečlivý a spolehlivý“ nevymezuje nikoho – takto by se popsala většina uchazečů a nedá se podle toho vybírat.',
        'Použitelný popis odpovídá na to, co konkrétně bude člověk dělat v prvních třech měsících, s čím a s kým bude pracovat a podle čeho se pozná, že práci zvládá. Z takového popisu se dá odvodit jak inzerát, tak otázky k pohovoru.',
      ],
      bullets: [
        'Co bude člověk dělat první tři měsíce',
        'S jakým vybavením, systémy a dokumentací',
        'S kým spolupracuje a komu předává výsledek',
        'Podle čeho se pozná, že práci zvládá',
      ],
    },
    {
      heading: 'Oddělte nutné od vítaného — a udělejte to nahlas',
      body: [
        'Toto je jediná úprava, která zpravidla pomůže nejvíc. Každý požadavek patří do jedné ze dvou skupin: bez čeho člověk nemůže nastoupit, a co usnadní zapracování, ale dá se doučit.',
        'Rozdělení má dva efekty. Rozšíří okruh lidí, které má smysl oslovit, a zároveň zrychlí rozhodování – u kandidáta, který splňuje vše nutné a část vítaného, není o čem dlouho jednat. Bez tohoto rozdělení se každý požadavek chová jako podmínka a profil se stane nedosažitelným.',
      ],
    },
    {
      heading: 'Rozlište, odkud požadavek pochází',
      body: [
        'U kvalifikovaných pozic se vyplatí u každého požadavku vědět, co za ním stojí. Praxe zaměňuje čtyři různé věci a důsledkem bývá zbytečně zúžený profil.',
        'PRÁVNÍ POŽADAVEK: vyplývá z předpisů a nelze jej prominout – například odborná způsobilost pro činnost na elektrických zařízeních nebo posouzení zdravotní způsobilosti k práci podle zařazení do kategorie.',
        'REGULOVANÁ KVALIFIKACE: konkrétní doklad, jehož obsah a rozsah stanoví daný předpis nebo norma. Rozsah je dán tím, na co byl doklad vydán, ne názvem profese.',
        'ZVYKLOST OBORU: běžný požadavek, který ale ze zákona nevyplývá – například praxe v konkrétním odvětví.',
        'POŽADAVEK PROVOZU: konkrétní systém, jazyk dokumentace nebo směnný režim. Je legitimní, ale je vhodné vědět, že jde o volbu firmy, nikoli o vlastnost profese.',
      ],
    },
    {
      heading: 'Co v zadání chybí nejčastěji',
      body: [
        'Vedle požadavků na kandidáta patří do zadání i informace, které rozhodují o tom, zda vhodný člověk nabídku vůbec zváží: směnný režim, lokalita a dostupnost pracoviště, forma a délka zaškolení a to, kdo bude nového člověka vést.',
        'Zvlášť u kvalifikovaných rolí bývá rozhodující i to, co v zadání nikdo neuvádí – proč je místo volné. Nová pozice z důvodu růstu a opakovaně se uvolňující místo jsou pro kandidáta dvě různé nabídky a zkušení lidé se na to ptají.',
      ],
      bullets: [
        'Směnný režim a jeho pravidelnost',
        'Lokalita, dostupnost a případná doprava',
        'Rozsah a délka zaškolení',
        'Kdo je přímý nadřízený a jak velký je tým',
        'Důvod, proč je pozice volná',
      ],
    },
    {
      heading: 'Zadání jako podklad pro srovnání kandidátů',
      body: [
        'Dobré zadání se vyplatí i po zahájení výběru, protože z něj vzniká srovnávací měřítko. Když jsou nutné požadavky pojmenované předem, dá se u každého uchazeče doložit, v čem vyhovuje a v čem ne.',
        'Bez toho se srovnání opírá o pořadí pohovorů a o dojem, což je nejen méně spolehlivé, ale hůř se to i obhajuje uvnitř firmy. Při zpracování údajů uchazečů je přitom potřeba držet se pravidel ochrany osobních údajů a shromažďovat jen to, co s posouzením pozice souvisí.',
      ],
    },
    {
      heading: 'Jak poznat, že je zadání hotové',
      body: [
        'Praktická zkouška: dejte zadání někomu, kdo pozici nezná, a nechte ho popsat, koho by hledal. Pokud popíše někoho jiného, než koho máte na mysli, zadání ještě není hotové.',
        'Druhá zkouška je odvodit z něj tři otázky k pohovoru. Jestli to nejde, chybí v zadání popis skutečné práce a zůstal v něm jen výčet vlastností.',
      ],
    },
  ],
  faq: [
    { q: 'Proč se nedaří obsadit pozici, na kterou je dost uchazečů?', a: 'Častou příčinou je zadání, které nerozlišuje nutné a vítané požadavky. Každý požadavek se pak chová jako podmínka a profil se stane nedosažitelným, přestože vhodní lidé mezi uchazeči jsou.' },
    { q: 'Kolik požadavků má profil obsahovat?', a: 'Počet není podstatný, rozdělení ano. Užitečné je vědět, bez čeho člověk nemůže nastoupit a co se dá doučit — u dlouho neobsazené pozice pomůže tento seznam projít znovu.' },
    { q: 'Máme uvádět mzdové rozpětí?', a: 'Rozhodnutí je na zaměstnavateli. Uvedení rozpětí zpravidla zvyšuje relevanci reakcí a šetří čas oběma stranám. Orientaci podle profese a regionu poskytuje ISPV; konkrétní částky zde neuvádíme.' },
    { q: 'Liší se zadání u provozních a odborných pozic?', a: 'Struktura je stejná, těžiště jiné. U provozních rolí rozhodují směnný režim, dostupnost a zaškolení, u odborných pozic přesné vymezení požadované kvalifikace a oprávnění.' },
  ],
  sources: [SRC.zakonikPrace, SRC.nsp, SRC.nsk, SRC.ispv, SRC.zakonPracovnelekarske],
  internalLinks: [
    { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' },
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/proc-se-nedari-obsadit-odbornou-pozici', label: 'Proč se nedaří obsadit odbornou pozici' },
    { href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' },
    { href: '/nabor-zamestnancu', label: 'Nábor zaměstnanců: výběrový proces' },
    { href: '/cena-neobsazene-pozice', label: 'Cena neobsazené pozice' },
  ],
  cta: knowledgeCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const EMPLOYER_KNOWLEDGE_PAGES: ReadonlyArray<SeoPage> = [
  CENA_NEOBSAZENE_POZICE,
  ZADANI_POZICE_A_PROFIL_KANDIDATA,
]
