// Employer problems / hiring solutions cluster (Wave 2B).
//
// These are decision-support pages, not articles. Each follows the same
// employer reasoning order — situation → diagnosis → operational consequences
// → available options → relevant roles → next step — but the substance under
// that order is different on every page, because the underlying operational
// problem is different. The shared order is deliberate: an employer arriving
// with a problem should recognise the shape of the page immediately.
//
// SCOPE. Wave 2 discovery rejected every candidate whose intent an existing
// page already owns: hard-to-fill vacancies (/proc-se-nedari-obsadit-odbornou-
// pozici), time-to-hire (/jak-dlouho-trva-obsazeni-pozice), sector shortages
// (nedostatek-pracovniku-* ×5), turnover (fluktuace ×3 + /retence-zamestnancu)
// and the agency-versus-direct decision (/jak-funguje-pracovni-agentura +
// /primy-nabor-zamestnancu). What remained were four genuinely uncovered
// operational situations, verified by measurement at baseline 1106bd6:
// "hromadn*" appeared once in the whole corpus and "absenc*" only in passing.
//
// NUMBERS. /hromadny-nabor-pracovniku talks about 20, 50 and 100 people as
// PLANNING SCENARIOS — what changes for the employer at each scale. Nothing on
// that page states or implies that TalentPartnerID has delivered such a volume,
// because no verified evidence of that exists. No completion time, fill rate or
// success percentage appears anywhere in this file.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-08-15'

const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}

const discussCta = {
  eyebrow: 'Personální situace',
  title: 'Řešíte tuto situaci ve svém provozu?',
  text: 'Popište nám, co se děje a jaké pozice se vás to týká. Probereme možnosti a co je v dané lokalitě a termínu reálné.',
  buttonLabel: 'Probrat personální potřebu',
  href: '/poptavka-pracovniku',
}

// ──────────────────────────────────────────────────────────────────────────

export const HROMADNY_NABOR_PRACOVNIKU: SeoPage = {
  slug: 'hromadny-nabor-pracovniku',
  breadcrumbLabel: 'Hromadný nábor',
  eyebrow: 'Personální situace · Objem',
  title: 'Hromadný nábor pracovníků: co se mění u 20, 50 a 100 lidí',
  heroSubtitle:
    'Nábor většího počtu lidí není tentýž proces jen ve větším měřítku. Co se láme při jednotlivých objemech a které kapacity je nutné zajistit dřív než samotné kandidáty.',
  description:
    'Hromadný nábor pracovníků – co se v procesu mění u 20, 50 a 100 lidí, které kapacity je nutné zajistit předem a jak si sestavit realistický harmonogram.',
  keywords: ['hromadný nábor', 'nábor většího počtu pracovníků', 'nábor 50 pracovníků', 'personální zajištění provozu', 'plánování náboru', 'objemový nábor'],
  intro:
    'Nábor dvaceti lidí a nábor sta lidí nejsou tatáž úloha v jiném měřítku. S rostoucím objemem se láme něco jiného než počet oslovených kandidátů: nejprve kapacita na pohovory, potom kapacita na zaškolení a nakonec provozní zázemí, které nové lidi vůbec unese. Následující text je plánovací pomůcka – popisuje, co se u jednotlivých velikostí mění a co je potřeba zajistit dřív, než začne samotné oslovování. Uvedené počty jsou modelové situace pro plánování, nikoli popis realizovaných zakázek; konkrétní čísla ani lhůty zde neuvádíme.',
  sections: [
    {
      heading: 'Co se s objemem skutečně mění',
      body: [
        'Do zhruba dvaceti lidí zůstává nábor záležitostí běžného provozu. Pohovory zvládne stávající vedoucí, zaškolení proběhne u linky a nováčci se rozpustí mezi zkušené kolegy.',
        'U padesáti lidí se poprvé projeví kapacitní strop: někdo musí pohovory vést na plný úvazek a zaškolení už nelze nechat na běžném provozu. Zároveň se mění poměr zkušených a nových lidí na směně, což ovlivňuje výkon i kvalitu.',
        'U sta lidí přestává být omezením nábor a stává se jím zázemí – šatny, stravování, doprava, ubytování, počet vstupních prohlídek, kapacita školitelů. Tyto věci mají vlastní dodací lhůty, které nelze zkrátit tím, že se přidá víc náborářů.',
      ],
      bullets: [
        'do ~20 lidí – zvládne stávající provoz vlastními silami',
        '~50 lidí – naráží kapacita na pohovory a zaškolení',
        '~100 lidí – limitem je provozní zázemí, nikoli počet kandidátů',
      ],
    },
    {
      heading: 'Kapacity, které je nutné zajistit dřív než kandidáty',
      body: [
        'Nejčastější chyba u hromadného náboru je začít oslovovat lidi dřív, než je zajištěno, co s nimi bude po nástupu. Kandidát, který se dostaví a zjistí, že na něj nikdo nemá čas, odchází a zpravidla se nevrací.',
        'Vyplatí se proto projít seznam kapacit ještě před zahájením: kdo povede pohovory a kolik jich denně zvládne, kdo zaškolí a v jakých skupinách, kolik lidí lze současně objednat na pracovnělékařskou prohlídku a jak rychle se vystaví přístupové karty a osobní ochranné pracovní prostředky.',
      ],
      bullets: [
        'Kapacita na pohovory v přepočtu na den',
        'Kapacita školitelů a velikost skupin',
        'Objednací lhůty u poskytovatele pracovnělékařských služeb',
        'Vybavení OOPP a jeho dostupnost ve velikostech',
        'Šatny, stravování, doprava na směnu',
      ],
    },
    {
      heading: 'Zdravotní způsobilost jako reálné úzké hrdlo',
      body: [
        'PRÁVNÍ POVINNOST: posouzení zdravotní způsobilosti k práci je součástí povinností zaměstnavatele a jeho rozsah se odvíjí od kategorie práce. Rámec stanoví zákon č. 373/2011 Sb. o specifických zdravotních službách a prováděcí vyhláška č. 79/2013 Sb.',
        'PROVOZNÍ DŮSLEDEK: u hromadného náboru se z formality stává úzké hrdlo. Kapacita poskytovatele pracovnělékařských služeb je konečná a nedá se navýšit tím, že se zvýší tempo náboru. Tuto kapacitu je proto vhodné dohodnout dřív, než se rozjede oslovování, a počítat s ní v harmonogramu jako s pevným bodem.',
      ],
    },
    {
      heading: 'Nástupy ve vlnách místo jednoho data',
      body: [
        'Snaha nechat všechny nastoupit v jeden den bývá zdrojem většiny potíží. Zaškolení se rozmělní, zkušení lidé nestíhají a kvalita první série klesne.',
        'Rozdělení nástupů do vln podle kapacity zaškolení bývá pro provoz snesitelnější, i když celkově trvá déle. Vlny také umožňují poučit se z první skupiny dřív, než nastoupí druhá – a to je u velkých objemů výhoda, kterou nelze koupit zpět.',
      ],
    },
    {
      heading: 'Počítejte s rezervou a s tím, že část lidí odejde',
      body: [
        'U hromadných nástupů je běžné, že část přijatých lidí nenastoupí nebo odejde v prvních týdnech. Není to selhání náboru, je to vlastnost objemu.',
        'Plán proto dává smysl stavět s rezervou a s předem promyšleným postupem pro dodatečné doplňování, ne jako jednorázovou akci s pevným počtem. Jak velkou rezervu zvolit, závisí na profesi, lokalitě a podmínkách – obecné číslo, které by platilo pro každý provoz, neexistuje a neuvádíme ho.',
      ],
    },
    {
      heading: 'Které cesty náboru se u objemu kombinují',
      body: [
        'U většího počtu lidí se v praxi cesty kombinují. Stálé jádro se obvykle obsazuje přímým náborem, protože se vyplatí investovat do zaškolení. Výkyv nebo náběh se pokrývá agenturním zaměstnáváním, u kterého administrativu zaměstnavatele nese agentura.',
        'U nedostatkových profesí přichází ke slovu nábor ze zahraničí, ten ale má vlastní časovou logiku danou oprávněními, kterou nelze zkrátit. Volba mezi cestami je popsána na samostatných stránkách.',
      ],
    },
  ],
  faq: [
    { q: 'Zvládnete obsadit 50 nebo 100 pozic?', a: 'Rozsah vždy závisí na profesi, lokalitě, termínu a nabízených podmínkách. Konkrétní počty ani lhůty předem neslibujeme – po popisu zadání vám řekneme, co je v daném regionu a čase reálné.' },
    { q: 'Za jak dlouho lze hromadný nábor zvládnout?', a: 'Termín zde neuvádíme, protože jej neurčuje nábor sám. Rozhoduje kapacita pohovorů a zaškolení, objednací lhůty pracovnělékařských prohlídek, výpovědní doby kandidátů a u zahraničních pracovníků řízení o oprávněních.' },
    { q: 'Co bývá při hromadném náboru největší překážkou?', a: 'Nejčastěji ne počet kandidátů, ale kapacita provozu je přijmout – pohovory, zaškolení, prohlídky a zázemí. Proto doporučujeme tyto kapacity zajistit dřív, než začne oslovování.' },
    { q: 'Má smysl nechat všechny nastoupit najednou?', a: 'Zpravidla ne. Nástupy ve vlnách podle kapacity zaškolení bývají pro provoz snesitelnější a umožní se poučit z první skupiny dřív, než nastoupí další.' },
  ],
  sources: [SRC.zakonPracovnelekarske, SRC.vyhlaskaPracovnelekarske, SRC.zakonikPrace, SRC.zakonOZamestnanosti, SRC.upcr],
  internalLinks: [
    { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
    { href: '/nabor-pri-nabehu-vyroby', label: 'Nábor při náběhu výroby' },
    { href: '/sezonni-navyseni-kapacity', label: 'Sezónní navýšení kapacity' },
    { href: '/ubytovani-pro-pracovniky', label: 'Ubytování pro pracovníky' },
    { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
  ],
  cta: discussCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────

export const NABOR_PRI_NABEHU_VYROBY: SeoPage = {
  slug: 'nabor-pri-nabehu-vyroby',
  breadcrumbLabel: 'Náběh výroby',
  eyebrow: 'Personální situace · Náběh',
  title: 'Nábor při náběhu výroby: obsazení nové linky nebo směny',
  heroSubtitle:
    'Náběh má pevný termín, ale personálně se rozhoduje mnohem dřív. Jak sestavit pořadí obsazování, aby v den spuštění nechyběli lidé, na kterých vše ostatní stojí.',
  description:
    'Nábor při náběhu nové výrobní linky nebo směny – v jakém pořadí obsazovat pozice, co musí být hotové před spuštěním a kde náběhy nejčastěji váznou.',
  keywords: ['náběh výroby', 'obsazení nové linky', 'nová směna nábor', 'rozjezd výroby', 'personální zajištění náběhu', 'plánování směn'],
  intro:
    'Náběh nové linky nebo otevření další směny se od běžného doplňování stavu liší jednou věcí: má pevné datum, které se odvozuje od zákazníka nebo od investice, a to datum se zpravidla nedá posunout. Personální příprava proto musí běžet pozpátku od tohoto bodu, a ne od okamžiku, kdy někdo zjistí, že chybí lidé. Tato stránka popisuje, v jakém pořadí se pozice při náběhu obsazují, co musí být hotové ještě před spuštěním a kde náběhy nejčastěji uvíznou – přičemž slabým místem bývá zaškolení, nikoli nábor jako takový.',
  sections: [
    {
      heading: 'Náběh se plánuje pozpátku',
      body: [
        'Užitečné je začít u data spuštění a postupovat zpět: kdo musí být na místě v den nula, kdo měsíc předtím, kdo ještě dřív. Z tohoto pohledu vyjde najevo, že nejdřív se neobsazují operátorské pozice, ale lidé, kteří budou ostatní zaškolovat.',
        'Mistr nebo vedoucí směny, seřizovač a údržbář potřebují být na místě dřív, protože se sami musí seznámit s technologií. Pokud nastoupí současně s operátory, nemá je kdo vést a náběh se zdrží bez ohledu na to, kolik operátorů se podařilo sehnat.',
      ],
      bullets: [
        'Nejdřív provozní vedení a klíčové technické role',
        'Poté seřizovači a údržba, kteří odladí zařízení',
        'Nakonec operátorské pozice ve vlnách podle zaškolení',
      ],
    },
    {
      heading: 'Co musí být hotové před prvním dnem',
      body: [
        'Řada věcí, které se v zavedeném provozu dělají mimochodem, u náběhu chybí a musí vzniknout: pracovní postupy, zaškolovací plán, hodnocení rizik pro nová pracoviště, rozsah osobních ochranných pracovních prostředků a zařazení prací do kategorií, od kterého se odvíjí rozsah pracovnělékařských prohlídek.',
        'PRÁVNÍ POVINNOST: povinnosti v oblasti BOZP se vážou na pracoviště a na zaměstnavatele, nikoli na to, zda je provoz nový. U nového pracoviště je proto potřeba je připravit dřív, než na něj někdo nastoupí.',
      ],
    },
    {
      heading: 'Nová směna má jiná pravidla než nová linka',
      body: [
        'Otevření další směny na existující lince vypadá jednodušeji, ale má vlastní úskalí. Nové lidi je nutné zaškolit stávajícím týmem, který přitom musí dál vyrábět – kapacita na zaškolení se tedy odebírá z běžného výkonu.',
        'Zároveň se mění dostupnost kandidátů. Noční nebo víkendová směna zúží okruh lidí ochotných nastoupit, což je vhodné zohlednit v harmonogramu i v podmínkách. Rozdíl mezi směnnými režimy se u kandidátů projeví dřív než rozdíl v samotné mzdě.',
      ],
    },
    {
      heading: 'Kde náběhy nejčastěji váznou',
      body: [
        'V praxi se náběhy zdržují na několika opakujících se místech. Prvním je zaškolení – bývá naplánováno optimisticky a nepočítá s tím, že zkušený člověk, který zaškoluje, mezitím nevyrábí.',
        'Druhým je nesoulad mezi termínem náboru a výpovědními dobami kandidátů. Třetím je zázemí – doprava na netypickou směnu nebo kapacita šaten se řeší až ve chvíli, kdy lidé nastupují.',
      ],
      bullets: [
        'Zaškolení naplánované bez výpadku výkonu školitelů',
        'Nesoulad termínu s výpovědními dobami kandidátů',
        'Doprava a zázemí u netypických směn',
        'Chybějící postupy a dokumentace pro nové pracoviště',
      ],
    },
    {
      heading: 'Jak kombinovat cesty obsazení',
      body: [
        'U náběhu se osvědčuje oddělit stálé jádro od pružné části. Jádro – vedení, seřizovači, údržba – dává smysl obsadit přímým náborem, protože se do těchto lidí investuje nejvíc zaškolení.',
        'Operátorskou část lze pokrýt kombinací přímého náboru a agenturního zaměstnávání, které umožní reagovat na to, že se skutečná potřeba během náběhu obvykle ještě upřesňuje. Rozdělení je vhodné rozhodnout předem, ne až v průběhu.',
      ],
    },
  ],
  faq: [
    { q: 'Kdy začít s náborem před spuštěním nové linky?', a: 'Konkrétní počet týdnů neuvádíme, protože závisí na profesích a lokalitě. Pořadí je ale stálé: nejdřív provozní vedení a technické role, které budou zaškolovat, teprve poté operátorské pozice.' },
    { q: 'Co bývá u náběhu úzkým hrdlem?', a: 'Nejčastěji zaškolení, ne nábor. Zkušený člověk, který zaškoluje, v té době nevyrábí, a s tímto výpadkem harmonogramy zpravidla nepočítají.' },
    { q: 'Je otevření nové směny jednodušší než nová linka?', a: 'Ne nutně. Zaškolení musí zajistit stávající tým při běžícím provozu a netypický směnný režim zužuje okruh kandidátů. Obojí je vhodné zohlednit předem.' },
    { q: 'Co musí být připraveno před nástupem lidí na nové pracoviště?', a: 'Zejména pracovní postupy, zaškolovací plán, hodnocení rizik, rozsah OOPP a zařazení prací do kategorií, od nějž se odvíjí rozsah pracovnělékařských prohlídek.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonBozp, SRC.zakonPracovnelekarske, SRC.zakonOZamestnanosti, SRC.suip],
  internalLinks: [
    { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
    { href: '/hromadny-nabor-pracovniku', label: 'Hromadný nábor pracovníků' },
    { href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
  ],
  cta: discussCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────

export const SEZONNI_NAVYSENI_KAPACITY: SeoPage = {
  slug: 'sezonni-navyseni-kapacity',
  breadcrumbLabel: 'Sezónní kapacita',
  eyebrow: 'Personální situace · Sezóna',
  title: 'Sezónní navýšení kapacity: jak pokrýt špičku bez trvalého stavu',
  heroSubtitle:
    'Sezónní špička je předvídatelná, a přesto se řeší na poslední chvíli. Jak si nachystat kapacitu dopředu a čím se sezónní nábor liší od doplňování stálého stavu.',
  description:
    'Sezónní navýšení kapacity – jak plánovat opakující se špičku, jaké modely zaměstnávání dávají smysl a jak si udržet osvědčené sezónní pracovníky.',
  keywords: ['sezónní nábor', 'sezónní pracovníci', 'navýšení kapacity', 'špička ve výrobě', 'brigádníci do provozu', 'dočasné posílení směn'],
  intro:
    'Sezónní špička má oproti ostatním personálním situacím jednu výhodu: dá se předvídat. Předvánoční provoz ve skladu, zemědělská sezóna nebo letní odstávky se opakují a firma zpravidla ví, kdy přijdou. Přesto se sezónní nábor často řeší až ve chvíli, kdy špička začíná, což je nejdražší možný okamžik. Tato stránka popisuje, jak se sezónní potřeba liší od doplňování stálého stavu, které modely zaměstnávání pro ni dávají smysl a jak si udržet osvědčené lidi na příští sezónu, aby se každý rok nezačínalo od nuly.',
  sections: [
    {
      heading: 'Sezónní potřeba není totéž co nedostatek lidí',
      body: [
        'Rozdíl je zásadní pro volbu řešení. Nedostatek pracovníků znamená, že chybí lidé na trvale obsazená místa. Sezónní potřeba znamená, že místa vzniknou na omezenou dobu a poté zaniknou.',
        'Z toho plyne, že řešením není zvyšovat trvalý stav. Firma, která si na špičku nabere lidi natrvalo, po sezóně řeší přezaměstnanost, a to je horší problém než ten původní.',
      ],
    },
    {
      heading: 'Modely, které pro sezónu přicházejí v úvahu',
      body: [
        'V praxi se používá několik cest a liší se tím, kdo nese odpovědnost zaměstnavatele a jak pružně se dá kapacita měnit.',
        'Agenturní zaměstnávání formou dočasného přidělení podle zákona č. 435/2004 Sb. je pro pravidelně se opakující výkyvy nejobvyklejší, protože formálním zaměstnavatelem zůstává agentura a rozsah lze upravovat podle skutečné potřeby. Vlastní zaměstnanci na dobu určitou dávají smysl u delších a předvídatelných sezón. Dohody konané mimo pracovní poměr mají své zákonné limity a nehodí se na plnohodnotné pokrytí směn.',
        'PRÁVNÍ RÁMEC: u dočasného přidělení platí požadavek srovnatelných mzdových a pracovních podmínek s kmenovými zaměstnanci uživatele. Není to smluvní ujednání, ale zákonná podmínka.',
      ],
    },
    {
      heading: 'Plánujte ze skutečných dat vlastního provozu',
      body: [
        'Nejlepším podkladem pro sezónní plán jsou vlastní údaje z minulých let – kolik lidí navíc bylo skutečně potřeba, jak dlouho, na kterých pracovištích a kolik z nich vydrželo celou sezónu.',
        'Tyto údaje má firma k dispozici a jsou spolehlivější než jakýkoli obecný odhad. Souvislosti o trhu práce lze doplnit z veřejných zdrojů ČSÚ, MPSV a Úřadu práce ČR; konkrétní čísla zde neuvádíme, protože se liší region od regionu.',
      ],
      bullets: [
        'Kolik lidí navíc bylo potřeba v minulých sezónách',
        'Na kterých pracovištích špička vzniká nejdřív',
        'Kolik lidí ze sezóny odešlo předčasně a proč',
        'Kteří sezónní pracovníci se vrátili opakovaně',
      ],
    },
    {
      heading: 'Zaškolení jako hlavní nákladová položka',
      body: [
        'U sezónního náboru se často podceňuje, že zaškolení stojí stejně bez ohledu na to, jak dlouho pak člověk zůstane. U krátké sezóny se tento náklad rozpouští do menšího objemu práce.',
        'Praktickým důsledkem je, že se vyplatí zjednodušit vstupní zaškolení na to nezbytné a složitější práci nechat na stálých lidech. Druhým důsledkem je, že návratový sezónní pracovník má výrazně jinou hodnotu než nový – a právě proto stojí za to o něj pečovat.',
      ],
    },
    {
      heading: 'Jak si udržet osvědčené sezónní lidi',
      body: [
        'Firmy, kterým se sezóna daří, mají obvykle jednu společnou věc: udržují kontakt s lidmi, kteří u nich už pracovali, a oslovují je s předstihem před další sezónou.',
        'Znamená to vést si přehled o tom, kdo se osvědčil, ozvat se dřív, než si najdou jinou práci, a mít připravené podmínky, které dávají důvod se vrátit. Je to podstatně levnější než každý rok začínat s novými lidmi – a při zpracování osobních údajů uchazečů je přitom nutné respektovat pravidla ochrany osobních údajů.',
      ],
    },
  ],
  faq: [
    { q: 'Kdy začít se sezónním náborem?', a: 'Dřív, než začne špička. Konkrétní předstih zde neuvádíme, protože závisí na profesi a regionu; osvědčuje se ale vycházet z vlastních dat o minulých sezónách a oslovit dřívější pracovníky s předstihem.' },
    { q: 'Je pro sezónu vhodnější agentura, nebo vlastní zaměstnanci?', a: 'Záleží na délce a předvídatelnosti. U opakovaných výkyvů bývá pružnější agenturní zaměstnávání, protože administrativu zaměstnavatele nese agentura; u delších a jistých sezón mohou dávat smysl vlastní zaměstnanci na dobu určitou.' },
    { q: 'Musí mít sezónní pracovníci srovnatelné podmínky?', a: 'U dočasného přidělení ano – srovnatelné mzdové a pracovní podmínky s kmenovými zaměstnanci uživatele na obdobné pozici jsou zákonným požadavkem, nikoli předmětem dohody.' },
    { q: 'Kolik lidí navíc na sezónu potřebujeme?', a: 'Obecné číslo neexistuje a neuvádíme ho. Nejspolehlivějším podkladem jsou vlastní údaje z minulých sezón doplněné o plán objemu na tu nadcházející.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr, SRC.mpsv, SRC.czso],
  internalLinks: [
    { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' },
    { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
    { href: '/hromadny-nabor-pracovniku', label: 'Hromadný nábor pracovníků' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
    { href: '/pracovnici-pro-ecommerce-sklady', label: 'Pracovníci pro e-commerce sklady' },
    { href: '/absence-v-provozu', label: 'Absence v provozu' },
  ],
  cta: discussCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ──────────────────────────────────────────────────────────────────────────

export const ABSENCE_V_PROVOZU: SeoPage = {
  slug: 'absence-v-provozu',
  breadcrumbLabel: 'Absence v provozu',
  eyebrow: 'Personální situace · Absence',
  title: 'Absence v provozu: proč chybí lidé na směně a co s tím',
  heroSubtitle:
    'Absence se od fluktuace liší tím, že lidé neodcházejí – jen nejsou. Jak rozlišit její příčiny a proč se plánovaná a neplánovaná nepřítomnost řeší úplně jinak.',
  description:
    'Absence v provozu – jak rozlišit plánovanou a neplánovanou nepřítomnost, kde vzniká a jak nastavit provozní rezervu, aby výpadek neohrozil směnu.',
  keywords: ['absence zaměstnanců', 'nepřítomnost na směně', 'provozní rezerva', 'obsazenost směn', 'výpadky ve výrobě', 'nemocnost'],
  intro:
    'Absence je personální problém, který se špatně pojmenovává, protože na rozdíl od fluktuace není vidět v počtu zaměstnanců. Lidé neodcházejí – jen v konkrétní den nejsou na směně. Provoz to přesto pocítí okamžitě, protože chybějící člověk se musí nahradit přesčasem, přesunem z jiného pracoviště nebo zpomalením linky. Tato stránka pomáhá odlišit jednotlivé druhy nepřítomnosti, protože každý z nich má jinou příčinu i jiné řešení, a ukazuje, jak nastavit rezervu tak, aby výpadek neohrozil obsazení směny.',
  sections: [
    {
      heading: 'Nejdřív rozlišit, o jakou nepřítomnost jde',
      body: [
        'Pod jedním slovem se skrývají situace s naprosto odlišnou logikou. Plánovaná nepřítomnost – dovolená, školení, plánovaný zákrok – je předvídatelná a patří do rozvrhu směn. Nepřítomnost z důvodu dočasné pracovní neschopnosti je nepředvídatelná v konkrétním případě, ale v celku má sezónní chování.',
        'Překážky v práci na straně zaměstnance mají svůj právní rámec v zákoníku práce. A konečně neomluvená absence je věc pracovní kázně, ne plánování.',
        'Rozlišení není formalita: opatření, které pomůže proti jednomu druhu, na jiný nemá vliv. Kdo řeší nemocnost přitvrzením docházkových pravidel, obvykle jen zvýší neomluvené odchody.',
      ],
      bullets: [
        'Plánovaná nepřítomnost – patří do rozvrhu',
        'Dočasná pracovní neschopnost – sezónní chování',
        'Překážky v práci – právní rámec v zákoníku práce',
        'Neomluvená absence – otázka pracovní kázně',
      ],
    },
    {
      heading: 'Kde absence vzniká',
      body: [
        'Absence není rovnoměrně rozložená. Obvykle se koncentruje na určitých pracovištích, směnách nebo skupinách lidí, a právě toto rozložení je nejcennější informace, kterou firma má k dispozici.',
        'Pokud výpadky vznikají hlavně na jednom pracovišti, příčina bývá v samotné práci – fyzická zátěž, prostředí, vztahy nebo vedení. Pokud se váží k noční směně, jde spíš o režim. Pokud se týkají nováčků v prvních týdnech, jde ve skutečnosti o problém adaptace, který se jen projevuje jako absence.',
      ],
    },
    {
      heading: 'Provozní rezerva jako odpověď, ne jako selhání',
      body: [
        'Provoz plánovaný na sto procent obsazenosti je z podstaty nestabilní: jakýkoli výpadek se okamžitě promítne do výkonu. Rezerva proto není známka špatného plánování, ale jeho součást.',
        'Rezerva může mít několik podob – zaškolení lidé, kteří umějí zastat víc pracovišť, dohodnutá pružná kapacita přes agenturní zaměstnávání, nebo záměrně nižší plánovaná obsazenost u kritických pracovišť. Jak velká má být, závisí na skutečné míře výpadků v konkrétním provozu; obecné číslo neuvádíme, protože by pro nikoho neplatilo.',
      ],
      bullets: [
        'Zastupitelnost – kolik lidí umí obsloužit více pracovišť',
        'Pružná kapacita sjednaná předem, ne až při výpadku',
        'Nižší plánovaná obsazenost u kritických míst',
        'Přehled o tom, kde výpadky reálně vznikají',
      ],
    },
    {
      heading: 'Zastupitelnost je levnější než rezerva v lidech',
      body: [
        'Nejúčinnějším opatřením proti absenci bývá to, které s náborem nesouvisí: zvýšit počet lidí, kteří umějí zastat více než jedno pracoviště.',
        'Zaškolení stávajícího zaměstnance na druhé pracoviště je zpravidla levnější než držet volnou kapacitu, a zároveň zvyšuje jeho hodnotu i motivaci. Přehled o tom, kdo co umí, je proto praktičtější nástroj řízení absence než docházková statistika.',
      ],
    },
    {
      heading: 'Kde absence přechází ve fluktuaci',
      body: [
        'Absence a fluktuace spolu souvisejí víc, než se zdá. Zvýšená nepřítomnost na určitém pracovišti často předchází odchodům – lidé nejdřív chybějí, pak odejdou.',
        'Sledovat absenci má proto smysl i jako včasný signál. Pokud se soustředí na jednom místě, vyplatí se hledat příčinu dřív, než se z ní stane odchodová vlna, kterou už řešíte náborem. Příčinám odchodů se věnují samostatné stránky.',
      ],
    },
  ],
  faq: [
    { q: 'Jaká míra absence je normální?', a: 'Obecné číslo zde neuvádíme – liší se podle oboru, typu práce a regionu. Užitečnější než srovnání s cizí hodnotou je sledovat vlastní vývoj a to, kde se výpadky koncentrují.' },
    { q: 'Jak se absence liší od fluktuace?', a: 'U fluktuace lidé odcházejí, u absence chybějí na konkrétní směně. Zvýšená absence na jednom pracovišti ale často odchodům předchází, takže funguje jako včasný signál.' },
    { q: 'Pomůže proti absenci přísnější docházkový režim?', a: 'Jen u neomluvené absence. Na nepřítomnost z důvodu pracovní neschopnosti nebo na překážky v práci, které mají svůj právní rámec, vliv nemá – a může zhoršit ochotu lidí zůstat.' },
    { q: 'Jak velkou rezervu si držet?', a: 'Vychází z vlastní míry výpadků na konkrétních pracovištích. Obecné doporučení neuvádíme; levnější než držet volnou kapacitu bývá zvýšit zastupitelnost stávajících lidí.' },
  ],
  sources: [SRC.zakonikPrace, SRC.cssz, SRC.zakonPracovnelekarske, SRC.mpsv, SRC.czso],
  internalLinks: [
    { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' },
    { href: '/fluktuace-zamestnancu', label: 'Fluktuace zaměstnanců' },
    { href: '/priciny-fluktuace-zamestnancu', label: 'Příčiny fluktuace zaměstnanců' },
    { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    { href: '/adaptace-zamestnancu', label: 'Adaptace zaměstnanců' },
    { href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' },
  ],
  cta: discussCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const EMPLOYER_PROBLEM_PAGES: ReadonlyArray<SeoPage> = [
  HROMADNY_NABOR_PRACOVNIKU,
  NABOR_PRI_NABEHU_VYROBY,
  SEZONNI_NAVYSENI_KAPACITY,
  ABSENCE_V_PROVOZU,
]
