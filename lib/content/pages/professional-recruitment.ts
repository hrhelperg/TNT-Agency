// Professional / specialist recruitment cluster (Wave 1).
//
// The site's server-rendered corpus covered volume staffing (výroba, sklady,
// logistika) and nothing above it, while the only specialist positioning that
// existed lived in a client-side script and rested on claims that could not be
// substantiated. These pages are the honest, indexable version of that
// positioning: they explain how qualified hiring actually works and where the
// real constraints sit — qualification instruments, authorisations, passive
// candidates, notice periods and the employer's own decision loop.
//
// Editorial contract, identical to the rest of the corpus and stricter in
// practice: no invented salaries, market statistics, placement counts, client
// references, candidate-pool sizes, lead times or replacement guarantees.
// Where a figure would be natural the page defers to the official source
// (MPSV, Úřad práce ČR, ČSSZ, ČSÚ, ISPV) or to the on-site payroll calculator.
// Qualification claims are anchored in named instruments — NV 194/2022 Sb.,
// zák. 250/2021 Sb., zák. 18/2004 Sb., zák. 179/2006 Sb. (NSK), zák. 505/1990
// Sb., ČSN EN ISO 9606-1 — rather than in assertions about our own capability.
//
// Growth of this cluster is governed by lib/content/growth-cohorts.ts and gated
// by scripts/validate-growth.mjs (npm run validate:growth).

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-08-15'

const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}

// Shared closing call to action. The request page is the single conversion
// destination for the whole cluster; the copy promises a conversation, never an
// outcome or a date.
const hireCta = {
  eyebrow: 'Nábor odborných pozic',
  title: 'Potřebujete obsadit odbornou nebo technickou pozici?',
  text: 'Popište nám pozici, požadovanou kvalifikaci a pracoviště. Ozveme se a probereme, co je pro obsazení potřeba.',
  buttonLabel: 'Zadat poptávku',
  href: '/poptavka-pracovniku',
}


// ── HUBS ───────────────────────────────────────────────

export const NABOR_ODBORNYCH_POZIC: SeoPage = {
  slug: 'nabor-odbornych-pozic',
  breadcrumbLabel: 'Nábor odborných pozic',
  eyebrow: 'Nábor · Odborné pozice',
  title: 'Nábor odborných a technických pozic: čím se liší od provozních rolí',
  heroSubtitle:
    'Proč se obsazení kvalifikované technické pozice řídí jinými pravidly než nábor do objemových provozních rolí – které rodiny profesí sem patří, co musí upřesnit zaměstnavatel a jak hledání probíhá.',
  description:
    'Nábor odborných a technických pozic: čím se liší od objemového náboru, které rodiny profesí zahrnuje, co upřesnit v zadání a jak probíhá hledání kandidátů.',
  keywords: [
    'nábor odborných pozic',
    'nábor technických pozic',
    'obsazení kvalifikované pozice',
    'technický nábor',
    'kvalifikovaní pracovníci do výroby',
    'odborné profese ve výrobě',
  ],
  intro:
    'Obsazení dvaceti míst na lince a obsazení jednoho místa seřizovače nebo technika kvality jsou dvě různé disciplíny, i když se obojímu říká nábor. U provozních rolí pracujete se širokým okruhem uchazečů a o výsledku rozhoduje organizace výběru; u odborných pozic je okruh lidí, kteří danou činnost umějí a zároveň ji smějí vykonávat, řádově užší a část z nich je vázána doklady o odborné způsobilosti. Tato stránka popisuje, čím se odborný nábor strukturálně liší, které rodiny profesí do něj v našem záběru patří, co k hledání potřebujeme od vás a jak postup probíhá. Mzdové úrovně ani lhůty obsazení zde neuvádíme a odkazujeme místo nich na veřejné a ověřitelné zdroje.',
  sections: [
    {
      heading: 'Čím se odborný nábor strukturálně liší',
      body: [
        'První rozdíl je početní. U pomocných a operátorských rolí je vstupní bariéra nízká a okruh lidí, kteří mohou nastoupit, je široký. U kvalifikované profese je okruh dán vyučením, praxí na konkrétní technologii nebo platným dokladem – a ten okruh se dále zužuje o dojezdovou vzdálenost a o ochotu měnit směnný režim. Hledání proto nelze postavit na dosahu inzerce, ale na tom, jak přesně je definovaná potřebná kompetence.',
        'Druhý rozdíl je v chování kandidátů. Lidé s poptávanou kvalifikací obvykle práci mají a aktivně nehledají, takže na inzerci reagují málo a často nemají připravený životopis. Oslovení je proto adresné a první reakce bývá zdrženlivá. Třetí rozdíl je časový: u zaměstnaného člověka se nástup zpravidla posouvá o výpovědní dobu podle zákoníku práce, pokud se strany nedohodnou na dřívějším skončení pracovního poměru – s tím je nutné počítat už při plánování. A čtvrtý rozdíl je v posuzování – odbornou úroveň spolehlivě rozliší jen technik na vaší straně, ne personální screening.',
      ],
      bullets: [
        'Okruh lidí s danou kvalifikací je podstatně užší než u provozních rolí',
        'U části činností rozhoduje platný doklad, nikoli jen odpracované roky',
        'Vhodní kandidáti většinou práci mají a na inzerci nereagují',
        'Nástup se zpravidla odsouvá o výpovědní dobu u stávajícího zaměstnavatele',
        'Technickou úroveň posoudí odborník na straně zaměstnavatele',
      ],
    },
    {
      heading: 'Rodiny profesí, které pokrýváme',
      body: [
        'Náš záběr vychází z výroby, skladů a logistiky a pokračuje do technických a odborných rolí, které na tyto provozy navazují. Každé rodině se věnuje samostatná stránka, protože se liší tím, co je v ní skutečnou překážkou obsazení – jednou je to doklad, jindy směnný režim, jindy šíře kompetence.',
      ],
      bullets: [
        'Strojírenské profese – obrábění, svařování, zámečnictví, nástrojařina',
        'Údržba a technický servis – mechanika, elektro, pneumatika a hydraulika, řídicí systémy',
        'Řízení kvality – kontrola, měření a metrologie, dokumentace a audity',
        'THP – technolog, konstruktér, plánovač, nákup, výrobní administrativa',
        'Provozní vedení – mistři a vedoucí směn jako první linie řízení',
        'Odborné pozice v logistice – dispečink, plánování, řízení skladu',
      ],
    },
    {
      heading: 'Doklady a kvalifikace: co skutečně brání nástupu',
      body: [
        'U řady technických činností nerozhoduje jen dovednost, ale oprávnění k výkonu činnosti. Odborná způsobilost k činnostem na elektrických zařízeních se řídí nařízením vlády o odborné způsobilosti v elektrotechnice, které nahradilo dříve užívanou vyhlášku 50/1978 Sb., a bezpečnost práce při provozu vyhrazených technických zařízení má vlastní zákonnou úpravu. U svařování určuje rozsah kvalifikace zkušební rozsah uvedený v osvědčení o zkoušce svářeče, ne označení „svářeč“ v inzerátu. Vedle toho existují profesní kvalifikace popsané v Národní soustavě kvalifikací, které lze ověřit zkouškou bez opakování celého studia.',
        'Pro nábor z toho plyne praktický důsledek: doklady mají platnost a omezený rozsah, takže je nutné je před nástupem číst, ne jen evidovat. Podrobný rozbor jednotlivých instrumentů i toho, kdo za ověření odpovídá, najdete na stránce o odborné způsobilosti a oprávněních.',
      ],
    },
    {
      heading: 'Co potřebujeme od vás, aby hledání dávalo smysl',
      body: [
        'Zadání odborné pozice není seznam přání, ale popis práce, kterou má člověk odvádět. Čím konkrétněji ho dostaneme, tím užší a použitelnější je okruh oslovených lidí. Nejčastější příčinou uvíznutí je zadání, které míchá dvě různé role dohromady nebo požaduje kompetenci, kterou by si provoz dokázal doučit.',
      ],
      bullets: [
        'Jakou činnost má člověk vykonávat a na jakém zařízení či technologii',
        'Které doklady jsou podmínkou nástupu a které lze doplnit po nástupu',
        'Směnný režim, pohotovost a místo výkonu práce včetně dojezdu',
        'Co je vstupní požadavek a co se zaškolí – rozdíl mezi nutným a vítaným',
        'Kdo na vaší straně kandidáta technicky posoudí a kdo rozhoduje',
        'Jak rychle dokážete dát zpětnou vazbu po pohovoru',
      ],
    },
    {
      heading: 'Jak postup probíhá',
      body: [
        'Začínáme upřesněním zadání – projdeme popis práce, zařízení, doklady a podmínky a doplníme, co v poptávce chybí. Následuje mapování, ve kterých typech provozů daná kompetence v regionu vzniká, a adresné oslovení. S kandidáty vedeme rozhovor o skutečné náplni jejich dosavadní práce, ne o výčtu z životopisu, a ověřujeme doklady včetně jejich platnosti a rozsahu.',
        'Předáváme vám kandidáty s poznámkou, co je ověřeno a co je potřeba posoudit technicky u vás. Praktické ověření – zkušební práce, měření, ukázka na stroji – zůstává na vaší straně a je to krok, na kterém se výsledek zpravidla láme. Po výběru zbývá doladit nástupní termín podle způsobu a termínu skončení předchozího pracovního poměru a připravit zapracování, protože u odborných rolí končí nábor až fungujícím člověkem na směně.',
      ],
    },
    {
      heading: 'Co na těchto stránkách nenajdete',
      body: [
        'Neuvádíme mzdové úrovně ani doby obsazení. Mzdové rozpětí pro konkrétní profesi a region patří do Informačního systému o průměrném výdělku, údaje o trhu práce zveřejňuje MPSV, Úřad práce ČR a ČSÚ. Popisy požadavků na jednotlivá povolání vede Národní soustava povolání, kterou používáme jako neutrální slovník při upřesňování zadání.',
        'Stejně tak je vymezený rozsah těchto stránek. Celý tento okruh se týká technických a odborných rolí navázaných na výrobní, skladové a logistické provozy včetně první linie řízení. Vyhledávání do vrcholového vedení, psychodiagnostiku ani převzetí celého náborového procesu zde nepopisujeme.',
      ],
    },
  ],
  faq: [
    {
      q: 'Čím se liší nábor odborné pozice od náboru operátorů?',
      a: 'Užším okruhem lidí, kteří danou činnost umějí a smějí vykonávat, nutností ověřit doklady a jejich rozsah, pasivitou kandidátů a odloženým nástupem kvůli výpovědní době. U provozních rolí rozhoduje organizace výběru, u odborných přesnost zadání a adresné oslovení.',
    },
    {
      q: 'Musí být u pohovoru náš technik?',
      a: 'U technických rolí to doporučujeme. Personální rozhovor ověří praxi, motivaci a podmínky, ale rozdíl mezi obsluhou a seřizovačem nebo mezi kontrolorem a technikem kvality spolehlivě pozná jen odborník z provozu. Praktické ověření proto necháváme na straně zaměstnavatele.',
    },
    {
      q: 'Obsazujete i vedoucí pozice?',
      a: 'Tyto stránky se věnují provoznímu vedení – mistrům, vedoucím směn a vedoucím úseků navázaným na výrobu, sklad nebo údržbu. Vyhledávání do vrcholového vedení ani specializované role mimo výrobní a logistické zázemí zde nerozebíráme.',
    },
    {
      q: 'Za jak dlouho se odborná pozice obsadí?',
      a: 'Termín nesdělujeme dopředu a nezavazujeme se k němu. Dobu určuje hlavně výpovědní doba vybraného kandidáta, dostupnost kvalifikace v regionu a rychlost rozhodování na straně zaměstnavatele. Jednotlivé vlivy rozebírá samostatná stránka o délce obsazení pozice.',
    },
    {
      q: 'Kde zjistíme mzdovou úroveň konkrétní profese?',
      a: 'Použijte Informační systém o průměrném výdělku (ISPV), který uvádí mzdová rozpětí podle profesí a regionů. Vlastní čísla neuvádíme, protože by nebyla ověřitelná a rychle by zastarala.',
    },
  ],
  sources: [SRC.nsp, SRC.nsk, SRC.nvElektrotechnika, SRC.zakonVyhrazenaZarizeni, SRC.csnSvarovani, SRC.zakonikPrace, SRC.ispv],
  internalLinks: [
    { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' },
    { href: '/primy-nabor-zamestnancu', label: 'Přímý nábor do kmenového stavu' },
    { href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' },
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
    { href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' },
    { href: '/thp-pozice', label: 'THP pozice' },
    { href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' },
    { href: '/odborne-pozice-v-logistice', label: 'Odborné pozice v logistice' },
    { href: '/prime-osloveni-kandidatu', label: 'Přímé oslovení kandidátů' },
    { href: '/proc-se-nedari-obsadit-odbornou-pozici', label: 'Proč se nedaří obsadit odbornou pozici' },
    { href: '/nabor-pracovniku', label: 'Nábor pracovníků: přehled cest' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRIMY_NABOR_ZAMESTNANCU: SeoPage = {
  slug: 'primy-nabor-zamestnancu',
  breadcrumbLabel: 'Přímý nábor zaměstnanců',
  eyebrow: 'Nábor · Kmenový stav',
  title: 'Přímý nábor zaměstnanců: kdy obsadit pozici do kmenového stavu',
  heroSubtitle:
    'Kdy zaměstnat člověka přímo a kdy sáhnout po dočasném přidělení – kdo je v obou případech zaměstnavatelem, jaké povinnosti tím přebíráte a podle čeho se rozhodnout.',
  description:
    'Přímý nábor zaměstnanců do kmenového stavu: co je zprostředkování zaměstnání podle zák. 435/2004 Sb., čím se liší od dočasného přidělení a co firma přebírá.',
  keywords: [
    'přímý nábor zaměstnanců',
    'nábor do kmenového stavu',
    'zprostředkování zaměstnání',
    'přímý nábor nebo agentura',
    'permanentní nábor',
    'povinnosti zaměstnavatele při náboru',
  ],
  intro:
    'Rozhodnutí, zda člověka zaměstnat přímo do vlastního stavu, nebo potřebu pokrýt dočasným přidělením, není jen otázkou ceny. Mění se s ním to, kdo je zaměstnavatelem, kdo vede mzdovou agendu, kdo zajišťuje pracovnělékařskou prohlídku a školení BOZP a jak se spolupráce ukončuje. Tato stránka vysvětluje, co přímý nábor znamená v režimu zákona o zaměstnanosti, čím se odlišuje od agenturního zaměstnávání a co konkrétně na sebe firma bere, když si zaměstnance vede sama. Součástí je i srovnání obou cest podle kritérií, která o volbě rozhodují v provozní praxi.',
  sections: [
    {
      heading: 'Co přímý nábor znamená právně',
      body: [
        'Při přímém náboru vzniká pracovní poměr přímo mezi vaší firmou a zaměstnancem podle zákoníku práce. Vy jste zaměstnavatel se vším, co k tomu patří, a člověk se stává kmenovým zaměstnancem. Role agentury práce končí u vyhledání, oslovení a předvýběru kandidáta; do pracovněprávního vztahu nevstupuje.',
        'Samotné vyhledávání zaměstnanců pro zaměstnavatele je ovšem zprostředkováním zaměstnání ve smyslu zákona č. 435/2004 Sb., o zaměstnanosti, a podléhá povolení. Totéž platí pro zaměstnávání osob za účelem jejich dočasného přidělení k uživateli. Rozdíl tedy není v tom, zda je povolení potřeba, ale v tom, kdo zůstane zaměstnavatelem. Zda konkrétní agentura povolení má, si ověřte ve veřejné evidenci agentur práce, kterou zpřístupňuje státní správa zaměstnanosti (MPSV a Úřad práce ČR).',
      ],
    },
    {
      heading: 'Kdy dává kmenový stav smysl',
      body: [
        'Do vlastního stavu patří to, co má trvat a co si nechcete nechat odejít. Typicky jde o stálé jádro provozu, role nesoucí know-how a nastavení technologie, držitele dokladů vázaných na osobu a všechny pozice, které řídí lidi nebo rozhodují o kvalitě. U těchto rolí se vyplatí delší hledání, protože náklad na obměnu je vyšší než u snadno nahraditelných míst.',
        'Naopak sezónní špičky, zástupy za dlouhodobé absence, náběh nové linky nebo zakázka s definovaným koncem se pokrývají lépe dočasným přidělením – potřeba skončí a s ní i přidělení, bez ukončování pracovního poměru na vaší straně. Řada firem obě cesty kombinuje: stabilní jádro v kmenovém stavu a pružná vrstva nad ním.',
      ],
      bullets: [
        'Kmenový stav – stálé jádro, technické know-how, vedení lidí, kvalita',
        'Dočasné přidělení – sezóna, náběh, zástupy, projekt s koncem',
        'Kombinace obojího – stabilní jádro doplněné pružnou kapacitou',
      ],
    },
    {
      heading: 'Co s vlastním zaměstnancem přebíráte',
      body: [
        'Přímý nábor znamená, že veškeré zaměstnavatelské povinnosti zůstávají u vás. To není argument proti němu, jen položka, se kterou je nutné počítat při srovnávání obou cest – část z ní totiž u dočasného přidělení nese agentura jako formální zaměstnavatel.',
      ],
      bullets: [
        'Pracovní smlouva, mzdové ujednání a vnitřní předpisy',
        'Mzdová agenda, odvody a daňové povinnosti – sazby ověřte u ČSSZ, zdravotní pojišťovny a finanční správy',
        'Vstupní pracovnělékařská prohlídka před nástupem a další prohlídky v rozsahu daném kategorií práce',
        'Vstupní i opakovaná školení BOZP, přidělení a evidence OOPP',
        'Evidence pracovní doby, plánování směn a náhrady',
        'Ukončení pracovního poměru v mezích zákoníku práce včetně výpovědní doby',
      ],
    },
    {
      heading: 'Srovnání: přímý nábor a agenturní zaměstnávání',
      body: [
        'Obě cesty vedou k tomu, že na pracovišti stojí člověk a odvádí práci. Liší se v tom, kdo je jeho zaměstnavatelem, kdo nese administrativu a jak pružně lze vztah ukončit. U dočasného přidělení navíc platí zákonný požadavek srovnatelných mzdových a pracovních podmínek s vašimi kmenovými zaměstnanci na obdobné pozici – není to vyjednávatelná položka, ale podmínka modelu.',
        'Praktické vodítko: čím trvalejší je potřeba a čím víc je role svázaná s vaším know-how, tím víc mluví ve prospěch kmenového stavu. Čím kolísavější je objem práce a čím dřív musí být kapacita k dispozici, tím spíš dává smysl přidělení. Naléhavost sama o sobě není argument pro jednu ani druhou cestu, protože u kvalifikovaných rolí naráží obojí na dostupnost lidí a na výpovědní doby.',
      ],
      bullets: [
        'Zaměstnavatel – u přímého náboru vaše firma, u přidělení agentura práce',
        'Pokyny k práci – v obou případech dává uživatel, tedy váš provoz',
        'Mzdová agenda a odvody – u přidělení je vede agentura',
        'BOZP na pracovišti – po dobu přidělení ji zajišťuje uživatel, agentuře zůstávají povinnosti zaměstnavatele',
        'Ukončení – skončení pracovního poměru podle zákoníku práce vs. ukončení přidělení za sjednaných podmínek',
        'Mzdové podmínky – u přidělení zákonný požadavek srovnatelnosti',
      ],
    },
    {
      heading: 'Modely odměny v obrysu',
      body: [
        'U přímého náboru se odměna agentury obvykle váže na nástup vybraného kandidáta a odvozuje se od jeho sjednaného výdělku; konkrétní podíl je předmětem smlouvy. U dočasného přidělení platíte hodinovou sazbu, která musí pokrýt mzdu odpovídající požadavku srovnatelných podmínek, zákonné odvody, dovolenou a náhrady – proto ji nelze poměřovat s hrubou mzdou.',
        'Žádné částky ani procenta zde neuvádíme. Strukturu modelů, včetně exkluzivity, etapového placení a smluvních ujednání o náhradě při předčasném odchodu, rozebírá stránka o ceně služeb; pro vlastní propočet nákladů na pracovní místo použijte kalkulačku na tomto webu.',
      ],
    },
    {
      heading: 'Co si ujasnit před podpisem',
      body: [
        'Než hledání začne, mějte písemně rozsah zadání, způsob a splatnost odměny, dobu platnosti ujednání, zacházení s údaji kandidátů a podmínky ukončení spolupráce. U dočasného přidělení k tomu patří rozdělení odpovědnosti za BOZP a OOPP na pracovišti a to, kdo zajišťuje pracovnělékařské prohlídky.',
        'Jak se postupuje, když vybraný člověk brzy odejde, je věcí smluvního ujednání – dohodněte si je písemně dřív, než hledání začne. Žádnou náhradu ani setrvání kandidáta nelze slibovat dopředu, protože o obojím rozhoduje jeho vlastní rozhodnutí. Podrobněji se tomu věnuje stránka o smlouvě s personální agenturou.',
      ],
    },
  ],
  faq: [
    {
      q: 'Kdo je zaměstnavatelem u přímého náboru?',
      a: 'Vaše firma. Pracovní poměr vzniká přímo mezi vámi a zaměstnancem podle zákoníku práce a agentura do něj nevstupuje. U dočasného přidělení je to naopak: formálním zaměstnavatelem zůstává agentura práce a vy jste v postavení uživatele.',
    },
    {
      q: 'Potřebuje agentura povolení, i když kandidáta jen vyhledá?',
      a: 'Vyhledávání zaměstnanců pro zaměstnavatele je zprostředkováním zaměstnání podle zákona o zaměstnanosti a povolení vyžaduje. Zda je konkrétní agentura držitelem povolení, si ověřte ve veřejné evidenci agentur práce zpřístupňované státní správou zaměstnanosti.',
    },
    {
      q: 'Lze agenturního zaměstnance převést do kmenového stavu?',
      a: 'Přechod je věcí dohody mezi uživatelem, agenturou a zaměstnancem. Není to automatický nárok ani zakázaný krok – podmínky včetně případné odměny je vhodné sjednat písemně předem, aby se o nich neřešilo až ve chvíli, kdy o člověka stojíte.',
    },
    {
      q: 'Kolik přímý nábor stojí?',
      a: 'Ceny ani procenta zde neuvádíme. Odměna se u přímého náboru obvykle váže na nástup a odvozuje od sjednaného výdělku kandidáta; strukturu modelů popisuje stránka o ceně služeb a vlastní propočet umožní kalkulačka nákladů.',
    },
    {
      q: 'Které povinnosti zůstávají nám při dočasném přidělení?',
      a: 'Přidělujete práci a dáváte pokyny, odpovídáte za podmínky na pracovišti a po dobu dočasného přidělení zajišťujete bezpečnost a ochranu zdraví při práci; agentuře přitom zůstávají povinnosti, které vůči svému zaměstnanci má jako zaměstnavatel. Zajišťujete také srovnatelné pracovní podmínky ve vztahu ke svým kmenovým zaměstnancům na obdobné pozici. Mzdovou agendu vede agentura.',
    },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr, SRC.mpsv, SRC.cssz],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje agentura práce' },
    { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
    { href: '/cena-sluzeb-personalni-agentury', label: 'Cena služeb personální agentury' },
    { href: '/smlouva-s-personalni-agenturou', label: 'Smlouva s personální agenturou' },
    { href: '/jak-dlouho-trva-obsazeni-pozice', label: 'Jak dlouho trvá obsazení pozice' },
    { href: '/nabor-pracovniku', label: 'Nábor pracovníků: přehled cest' },
    { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const THP_POZICE: SeoPage = {
  slug: 'thp-pozice',
  breadcrumbLabel: 'THP pozice',
  eyebrow: 'Nábor · THP',
  title: 'THP pozice: co do nich patří a jak je obsazovat',
  heroSubtitle:
    'Co se ve výrobních firmách označuje jako THP, které role sem obvykle spadají a proč u nich rozhoduje přesnost zadání víc než u dělnických profesí.',
  description:
    'THP pozice: co znamená technicko-hospodářský pracovník, které role sem patří – technolog, plánovač, nákupčí, kvalita, dispečink – a jak je obsazovat.',
  keywords: [
    'THP pozice',
    'technicko-hospodářský pracovník',
    'nábor THP',
    'technolog výroby',
    'plánovač výroby',
    'administrativní pozice ve výrobě',
  ],
  intro:
    'Zkratka THP – technicko-hospodářský pracovník – se ve výrobních a logistických firmách používá denně, ale hranice této kategorie si každý provoz vede po svém. Někde do ní spadá jen technická příprava výroby, jinde i mistři, plánování, nákup a mzdová účtárna. Pro nábor to má jeden zásadní důsledek: stejný název pozice znamená v každé firmě jinou práci, takže inzerát bez popisu skutečné náplně přitáhne lidi, kteří dělali něco jiného. Tato stránka vysvětluje, co do THP v praxi patří, čím se kategorie liší od dělnických profesí, proč je zde zadání rozhodující a jak k popisu požadavků využít Národní soustavu povolání.',
  sections: [
    {
      heading: 'Co THP v české praxi znamená',
      body: [
        'Technicko-hospodářský pracovník je provozní členění, nikoli právní pojem – zákoník práce takovou kategorii nezná a nespojuje s ní žádná zvláštní práva ani povinnosti. Firmy ji používají ve své organizační struktuře, v rozpočtech a ve výkaznictví, aby odlišily dělnické profese, jejichž práce je přímo navázaná na výrobní operaci, od technických a hospodářských funkcí, které výrobu připravují, plánují, kontrolují a administrativně obsluhují.',
        'V praxi se s tím pojí i jiný způsob odměňování a jiný denní rytmus: THP pozice bývají mimo směnný takt, zpravidla se u nich sjednává měsíční mzda a jejich výkon se neměří počtem kusů, ale včasností a správností výstupu – hotovou dokumentací, sestaveným plánem, objednaným materiálem, uzavřenou mzdovou uzávěrkou. Právě proto se špatně obsazují: chybí u nich jednoduché kritérium, podle kterého by šel kandidát rychle posoudit.',
      ],
    },
    {
      heading: 'Které role sem obvykle patří',
      body: [
        'Rozsah se liší podle velikosti provozu. V menší firmě jeden člověk pokrývá technologii i plánování, ve větší jsou to oddělená pracovní místa s vlastními rozhraními. Následující výčet odpovídá tomu, co se v českých výrobních a logistických provozech pod THP nejčastěji řadí.',
      ],
      bullets: [
        'Technolog a technická příprava výroby – postupy, normy spotřeby, náběh nových dílů',
        'Konstruktér – výkresová a modelová dokumentace, změnové řízení',
        'Plánovač výroby a dispečer – rozvrh zakázek, materiálová dostupnost, reakce na výpadky',
        'Nákupčí a zásobovač – poptávky, objednávky, termíny a dodavatelé',
        'Technik a inženýr kvality – dokumentace, měření, reklamace a nápravná opatření',
        'Mzdová a personální administrativa – mzdová agenda, docházka, evidence a smluvní podklady',
        'Administrativa expedice a fakturace – doklady k odeslání zboží a jejich návaznost na účetnictví',
      ],
    },
    {
      heading: 'Proč THP nábor stojí a padá na zadání',
      body: [
        'U dělnických profesí lze poměrně dobře popsat práci strojem a operací. U technicko-hospodářských rolí je náplň dána tím, jaké systémy provoz používá, kolik zakázek plánuje, jak je organizována změna dokumentace a s kolika lidmi se dotyčný denně domlouvá. Dva plánovači výroby se stejným názvem pozice tak mohou dělat práci, která nemá společného skoro nic – jeden rozpouští plán do směn v podnikovém systému, druhý ho ručně skládá v tabulce a obtelefonovává dodavatele.',
        'Zadání se upřesňuje snáz přes výstupy a rozhraní než přes osobnostní vlastnosti. Místo „samostatný a zodpovědný technolog“ raději: připravuje postupy pro obrábění na tři pracoviště, vede změnové řízení, komunikuje s konstrukcí a kvalitou. Takové zadání jde použít při oslovení i při pohovoru a rovnou z něj plynou otázky, kterými se dá kompetence ověřit.',
      ],
      bullets: [
        'Jaké výstupy má člověk odevzdávat a v jakém rytmu',
        'V jakých systémech pracuje – podnikový systém, CAD, tabulky, plánovací nástroj',
        'S kým se denně domlouvá a kdo na jeho výstup navazuje',
        'Jak velký rozsah agendy má na starosti – počet pracovišť, zakázek, dodavatelů',
        'Co je nutná vstupní znalost a co si člověk osvojí u vás',
      ],
    },
    {
      heading: 'Jak k popisu požadavků využít NSP',
      body: [
        'Národní soustava povolání spravovaná MPSV popisuje jednotlivá povolání a jejich typové pozice včetně obvyklých pracovních činností, potřebných znalostí a dovedností a odpovídající úrovně vzdělání. Pro zadání THP pozice je užitečná hlavně jako neutrální slovník: srovnáte-li popis v katalogu s tím, co má člověk skutečně dělat u vás, rychle vyjde najevo, které požadavky jsou pro dané povolání běžné a které jsou vaším specifikem, jež je nutné v nabídce vysvětlit.',
        'Tam, kde existuje odpovídající profesní kvalifikace, popisuje její požadavky Národní soustava kvalifikací. U mzdových rozpětí se držte Informačního systému o průměrném výdělku, který uvádí údaje podle profesí a regionů – vlastní čísla neuvádíme, protože by nebyla ověřitelná.',
      ],
    },
    {
      heading: 'Hospodářská a administrativní část THP',
      body: [
        'Vedle technických rolí patří pod THP i hospodářské zázemí provozu – mzdová a personální administrativa, fakturace, evidence a nákupní agenda. Tato místa se obsazují jinak než technické role: rozhoduje u nich znalost konkrétního systému, v němž se agenda vede, návaznost na aktuální předpisy a spolehlivost v termínech, protože mzdová uzávěrka ani odeslání dokladů nepočkají. Právě proto je u nich klíčová zastupitelnost – jeden nezastupitelný člověk je provozní riziko, které se projeví při první delší absenci.',
        'Součástí zadání by měla být i práce s citlivými údaji: mzdová a personální agenda pracuje s osobními údaji zaměstnanců a přístupová práva i mlčenlivost je vhodné ošetřit hned při nástupu. Tato stránka se drží administrativního a technického zázemí výrobních, skladových a logistických provozů; vrcholové finanční řízení ani úzce specializované role mimo tento kontext zde nerozebíráme.',
      ],
    },
  ],
  faq: [
    {
      q: 'Je THP právní kategorie?',
      a: 'Není. Zákoník práce pojem technicko-hospodářský pracovník nezná a nepojí s ním žádná zvláštní práva ani povinnosti. Jde o provozní a organizační členění, které si firmy vedou samy, takže jeho hranice se podnik od podniku liší.',
    },
    {
      q: 'Patří mistr mezi THP pozice?',
      a: 'V mnoha provozech ano, protože jde o první linii řízení mimo dělnickou kategorii; jinde se vede odděleně. Pro nábor je podstatnější než zařazení popis toho, co má mistr dělat – tomu se věnuje samostatná stránka o mistrech a vedoucích směn.',
    },
    {
      q: 'Proč se u THP tak často míjí představa firmy a kandidáta?',
      a: 'Protože název pozice nese v každé firmě jiný obsah. Plánovač, technolog i nákupčí mohou znamenat výrazně odlišnou práci podle velikosti provozu a používaných systémů. Pomáhá popsat výstupy, systémy a rozhraní místo obecných vlastností.',
    },
    {
      q: 'Obsazujete i mzdovou účtárnu a personální administrativu?',
      a: 'Tyto stránky se věnují zázemí výrobních, skladových a logistických provozů. Vrcholové finanční řízení a úzce specializované role mimo tento kontext zde nepopisujeme, protože mají jiné nároky na posouzení odbornosti.',
    },
    {
      q: 'Podle čeho poznáme, že je zadání THP pozice hotové?',
      a: 'Když z něj jde sestavit otázka na pohovor. Pokud si z popisu nedokážete odvodit, co se kandidáta zeptáte, aby se ukázal rozdíl mezi tím, kdo práci dělal, a tím, kdo ji viděl dělat, chybí v zadání výstupy, systémy nebo rozsah agendy. Pomůže i porovnání s popisem povolání v Národní soustavě povolání.',
    },
  ],
  sources: [SRC.nsp, SRC.nsk, SRC.ispv, SRC.zakonikPrace, SRC.mpsv],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' },
    { href: '/odborne-pozice-v-logistice', label: 'Odborné pozice v logistice' },
    { href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' },
    { href: '/slovnik-pojmu-pro-zamestnavatele', label: 'Slovník pojmů pro zaměstnavatele' },
    { href: '/nabor-zamestnancu', label: 'Nábor zaměstnanců: výběrový proces' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ── QUALIFICATION ──────────────────────────────────────

export const ODBORNA_ZPUSOBILOST_A_OPRAVNENI: SeoPage = {
  slug: 'odborna-zpusobilost-a-opravneni',
  breadcrumbLabel: 'Odborná způsobilost',
  eyebrow: 'Kvalifikace · Zaměstnavatelé',
  title: 'Odborná způsobilost a oprávnění: co ověřit před nástupem',
  heroSubtitle:
    'Které doklady skutečně podmiňují výkon konkrétní práce, kdo odpovídá za jejich ověření a co si o nich vést v evidenci. Orientace pro zaměstnavatele i uživatele.',
  description:
    'Odborná způsobilost a oprávnění: rozdíl mezi vzděláním, profesní kvalifikací a oprávněním k činnosti, elektro podle NV 194/2022 Sb. i vyhrazená zařízení.',
  keywords: [
    'odborná způsobilost',
    'oprávnění k činnosti',
    'profesní kvalifikace',
    'vyhrazená technická zařízení',
    'odborná způsobilost v elektrotechnice',
    'pracovnělékařská prohlídka',
    'ověření dokladů pracovníka',
  ],
  intro:
    'Doklad, který uchazeč přinese k pohovoru, a doklad, který ho opravňuje vykonávat konkrétní práci, nemusí být totéž. V zadání pozic se do jediné kolonky „kvalifikace“ mísí čtyři různé věci: dosažené vzdělání, odborná způsobilost vyžadovaná právním předpisem pro určitou činnost, profesní kvalifikace podle Národní soustavy kvalifikací a oprávnění vykonávat konkrétní práci na konkrétním zařízení. Tato stránka je od sebe odděluje, ukazuje, kde se v technických provozech chybuje nejčastěji, a shrnuje, co si u pracovníka před nástupem ověřit a zaevidovat. Nejde o právní poradenství – u konkrétních požadavků vycházejte vždy z platného znění předpisu.',
  sections: [
    {
      heading: 'Čtyři pojmy, které se v zadání slévají dohromady',
      body: [
        'Vzdělání je to, co člověk vystudoval – výuční list, maturitní vysvědčení, diplom. Vypovídá o průpravě, samo o sobě ale neopravňuje k žádné konkrétní činnosti. Odborná způsobilost je naproti tomu požadavek konkrétního předpisu na konkrétní činnost: typicky kombinace odborného vzdělání v daném oboru, doložené praxe a zkoušky, kterou je nutné v určitých intervalech opakovat.',
        'Profesní kvalifikace podle zákona č. 179/2006 Sb. je třetí kategorie. Umožňuje prokázat způsobilost pro vymezenou činnost před autorizovanou osobou a získat osvědčení, aniž by člověk absolvoval celý studijní obor; standardy jednotlivých kvalifikací zveřejňuje Národní soustava kvalifikací a požadavky povolání popisuje Národní soustava povolání. Čtvrtou kategorií je oprávnění k činnosti – pověření pracovat na určitém zařízení nebo pracovišti, které buď vydává k tomu určený orgán, nebo je uděluje zaměstnavatel na základě ověření a školení.',
      ],
      bullets: [
        'Vzdělání – co uchazeč vystudoval; dokládá průpravu, nikoli oprávnění',
        'Odborná způsobilost – požadavek předpisu na činnost, obvykle vzdělání, praxe a zkouška',
        'Profesní kvalifikace (NSK) – osvědčení pro vymezenou činnost od autorizované osoby',
        'Oprávnění k činnosti – pověření pracovat na konkrétním zařízení či pracovišti',
        'Zdravotní způsobilost – samostatná podmínka doložená lékařským posudkem',
      ],
    },
    {
      heading: 'Elektrotechnika: co dnes platí místo „vyhlášky 50“',
      body: [
        'Zaměstnavatelé stále hledají „vyhlášku 50“ a ptají se na paragrafy podle vyhlášky č. 50/1978 Sb. Ta už účinná není. Odbornou způsobilost v elektrotechnice dnes upravuje nařízení vlády č. 194/2022 Sb., které navazuje na zákon č. 250/2021 Sb. Pojmenování stupňů se změnilo, logika zůstala: předpis rozlišuje osobu poučenou a osoby znalé, mezi něž řadí elektrotechnika, vedoucího elektrotechnika a revizního technika. Přesné podmínky jednotlivých stupňů ověřte v platném znění předpisu.',
        'Dopad na nábor je přitom zásadní. Poučená osoba není držitelem státem vydaného dokladu – je to pracovník, kterého zaměstnavatel prokazatelně poučil, a záznam o poučení je součástí vaší dokumentace. Do kategorií osoby znalé se naopak nelze dostat pouhým absolvováním kurzu: předpis požaduje odborné vzdělání v elektrotechnice, doloženou praxi a zkoušku. Uchazeč s letitou praxí „u elektriky“, ale bez elektrotechnického vzdělání tuto podmínku nesplní a žádné školení to nenahradí. Doklad navíc není trvalý a váže se na rozsah, pro který byl vydán.',
      ],
    },
    {
      heading: 'Vyhrazená technická zařízení a další doklady k technice',
      body: [
        'Zákon č. 250/2021 Sb. upravuje bezpečnost práce v souvislosti s provozem vyhrazených technických zařízení – tlakových, zdvihacích, elektrických a plynových. Stanoví, jaké činnosti na nich smí kdo vykonávat, jak se prokazuje odborná způsobilost a jaká oprávnění potřebuje sama organizace, která na těchto zařízeních pracuje nebo je reviduje. Osvědčení fyzických osob a oprávnění organizací vydává pověřená organizace, kterou je podle tohoto zákona Technická inspekce České republiky.',
        'Pozor na časté zaměňování: ne každý „průkaz“ je doklad podle tohoto zákona. Typickým příkladem je obsluha motorových vozíků. Průkaz obsluhy je výstupem školení a zaměstnavatel na jeho základě pracovníka písemně pověřuje k obsluze konkrétního typu techniky na konkrétním pracovišti. Nejde o státní licenci a doklad z jiné firmy sám o sobě neznamená, že u vás může pracovník okamžitě usednout za VZV.',
      ],
      bullets: [
        'Určete, zda zařízení patří mezi vyhrazená technická zařízení',
        'Rozlišujte osvědčení fyzické osoby a oprávnění organizace',
        'U obsluhy techniky doplňte školení písemným pověřením k danému typu',
        'U kontroly a měření pamatujte na požadavky předpisů o metrologii',
        'U každého dokladu zjistěte, na jaký rozsah a na jakou dobu byl vydán',
      ],
    },
    {
      heading: 'Zdravotní způsobilost a pracovnělékařská prohlídka',
      body: [
        'Odborná a zdravotní způsobilost jsou dvě samostatné podmínky a splnění jedné neříká nic o druhé. Zdravotní způsobilost se posuzuje pracovnělékařskou prohlídkou a jejím výstupem je lékařský posudek. Zda je vstupní prohlídka před nástupem povinná, závisí na zařazení práce do kategorie a na tom, zda jsou pro danou činnost stanoveny podmínky zdravotní způsobilosti prováděcím předpisem – u prací na elektrických a vyhrazených technických zařízeních nebo u obsluhy techniky s ní počítejte. Posudek se vztahuje ke konkrétní práci a ke konkrétnímu pracovišti, ne k člověku obecně – poskytovatel pracovnělékařských služeb proto musí znát skutečné podmínky, ve kterých bude pracovník pracovat, včetně zařazení práce do kategorie, rizikových faktorů a režimu směn.',
        'To má přímý dopad na agenturní zaměstnávání. Je-li pracovník dočasně přidělen, musí posudek odpovídat pracovišti uživatele, nikoli sídlu agentury. Uživatel proto potřebuje předat informace o rizicích a o charakteru práce dřív, než prohlídka proběhne. Periodické prohlídky pak běží podle zařazení práce a jsou dalším datem, které je nutné hlídat.',
      ],
    },
    {
      heading: 'Kdo odpovídá za ověření',
      body: [
        'Povinnost zajistit, aby práci vykonával jen pracovník s potřebnou způsobilostí, leží na zaměstnavateli. U přímého náboru je to vaše firma. U dočasného přidělení je formálním zaměstnavatelem agentura práce – ta uzavírá pracovní poměr, zajišťuje pracovnělékařskou prohlídku, je-li vyžadována, a vede osobní dokumentaci včetně dokladů o způsobilosti.',
        'Tím ale role uživatele nekončí. Uživatel zná skutečná rizika svého pracoviště, ukládá pracovní úkoly, organizuje a kontroluje práci a podle zákoníku práce zajišťuje po dobu dočasného přidělení bezpečnost a ochranu zdraví při práci; agentuře přitom zůstávají povinnosti, které vůči svému zaměstnanci má jako zaměstnavatel. Osvědčuje se, aby si strany ve smlouvě výslovně rozdělily, kdo který doklad obstarává, kdo ověřuje jeho platnost a komu se hlásí, když doklad propadne. Nejasné rozdělení těchto úkolů bývá tím, co se ukáže až při kontrole.',
      ],
      bullets: [
        'Zaměstnavatel odpovídá za to, že práci vykonává způsobilý pracovník',
        'U dočasného přidělení je zaměstnavatelem agentura práce',
        'Uživatel zajišťuje seznámení s riziky pracoviště, OOPP a pokyny k práci',
        'BOZP na pracovišti zajišťuje po dobu dočasného přidělení uživatel',
        'Rozdělení úkolů kolem dokladů patří do smlouvy, ne do ústní dohody',
      ],
    },
    {
      heading: 'Platnost dokladů a co si evidovat',
      body: [
        'Většina zmíněných dokladů má omezenou platnost nebo vyžaduje pravidelné potvrzení. Riziko proto nevzniká při nástupu, ale několik měsíců či let poté – pracovník je na směně, doklad mezitím propadl a nikdo si toho nevšiml. Předchází se tomu jedinou evidencí, ve které jsou u každého pracovníka data platnosti, a pravidlem, že po uplynutí data se příslušná práce nepřiděluje, dokud není doklad obnoven.',
        'Evidence má smysl i mimo kontrolu. Když víte, komu za dva měsíce končí zkouška nebo prohlídka, můžete obnovu naplánovat do klidnějšího období místo do výrobní špičky.',
      ],
      bullets: [
        'Jméno pracovníka, typ dokladu a jeho číslo',
        'Rozsah – na jakou činnost, zařízení a pracoviště se doklad vztahuje',
        'Datum vydání, datum platnosti a datum příštího potvrzení či prohlídky',
        'Kdo doklad vydal a kdo u vás ověřil jeho pravost',
        'Záznamy o školeních, poučeních a písemných pověřeních',
      ],
    },
  ],
  faq: [
    {
      q: 'Platí ještě vyhláška č. 50/1978 Sb.?',
      a: 'Ne. Odbornou způsobilost v elektrotechnice dnes upravuje nařízení vlády č. 194/2022 Sb., které navazuje na zákon č. 250/2021 Sb. Označení „padesátka“ se v provozech drží, doklady i názvosloví se však řídí novou úpravou. Konkrétní požadavky ověřte v platném znění předpisu.',
    },
    {
      q: 'Stačí u elektrikáře kurz, když nemá elektrotechnické vzdělání?',
      a: 'Ne. Pro kategorie osoby znalé předpis požaduje odborné vzdělání v elektrotechnice, doloženou praxi a zkoušku; praxe bez odpovídajícího vzdělání tuto podmínku nenahrazuje. Poučená osoba je jiná kategorie s jiným rozsahem činností a jiným způsobem doložení.',
    },
    {
      q: 'Kdo ověřuje doklady u agenturního zaměstnance?',
      a: 'Formálním zaměstnavatelem je agentura práce, která uzavírá pracovní poměr, zajišťuje pracovnělékařskou prohlídku, je-li vyžadována, a vede dokumentaci. Uživatel seznamuje pracovníka s riziky svého pracoviště, poskytuje OOPP a po dobu dočasného přidělení zajišťuje BOZP. Rozdělení úkolů kolem dokladů je vhodné mít ve smlouvě.',
    },
    {
      q: 'Je profesní kvalifikace z NSK totéž co výuční list?',
      a: 'Není. Osvědčení o profesní kvalifikaci prokazuje způsobilost pro vymezenou činnost podle standardu v Národní soustavě kvalifikací a vydává je autorizovaná osoba, zatímco stupeň vzdělání se získává ve školském systému. U řady činností je osvědčení uznávaným dokladem způsobilosti – rozhodující je, co pro danou činnost vyžaduje předpis nebo zákazník.',
    },
    {
      q: 'Co dělat, když pracovníkovi propadne doklad?',
      a: 'Do obnovení mu nepřidělujte práci, která doklad vyžaduje, a přeřaďte ho na činnost, kterou vykonávat může. Právě proto se vyplatí evidovat data platnosti a sledovat je s předstihem, ne až v den, kdy doklad končí.',
    },
  ],
  sources: [
    SRC.nvElektrotechnika,
    SRC.zakonVyhrazenaZarizeni,
    SRC.zakonDalsiVzdelavani,
    SRC.nsk,
    SRC.nsp,
    SRC.zakonMetrologie,
    SRC.zakonBozp,
    SRC.zakonPracovnelekarske,
    SRC.vyhlaskaPracovnelekarske,
    SRC.zakonikPrace,
    SRC.suip,
  ],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/nabor-svarecu', label: 'Nábor svářečů' },
    { href: '/nabor-elektrikaru', label: 'Nábor elektrikářů' },
    { href: '/uznavani-kvalifikace-zahranicnich-pracovniku', label: 'Uznávání kvalifikace zahraničních pracovníků' },
    { href: '/manipulacni-pracovnici', label: 'Manipulační pracovníci a VZV' },
    { href: '/povinnosti-zamestnavatele', label: 'Povinnosti zaměstnavatele' },
    { href: '/kontrola-inspektoratu-prace', label: 'Kontrola inspektorátu práce' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const UZNAVANI_KVALIFIKACE_ZAHRANICNICH_PRACOVNIKU: SeoPage = {
  slug: 'uznavani-kvalifikace-zahranicnich-pracovniku',
  breadcrumbLabel: 'Uznávání zahraniční kvalifikace',
  eyebrow: 'Kvalifikace · Cizinci',
  title: 'Uznávání kvalifikace zahraničních pracovníků: co platí a co ne',
  heroSubtitle:
    'Kdy potřebujete uznání zahraničního vzdělání, kdy uznání odborné kvalifikace pro regulovanou činnost a kdy nepomůže ani jedno. Rozcestí popsané z pohledu zaměstnavatele.',
  description:
    'Uznávání kvalifikace zahraničních pracovníků: rozdíl mezi nostrifikací vzdělání a uznáním odborné kvalifikace, regulované činnosti a souběh s pobytovým řízením.',
  keywords: [
    'uznávání kvalifikace zahraničních pracovníků',
    'nostrifikace vzdělání',
    'uznání odborné kvalifikace',
    'regulovaná činnost',
    'doklady o vzdělání cizinců',
    'zaměstnanecká karta kvalifikace',
    'zahraniční svářečské osvědčení',
  ],
  intro:
    'Zahraniční uchazeč přinese diplom, zaměstnavatel se ptá, zda „platí v Česku“, a odpověď zní: záleží na tom, k čemu ho potřebujete. Jiné řízení se vede, jde-li o uznání dosaženého vzdělání, jiné, jde-li o výkon činnosti, kterou český předpis reguluje – a u části technických prací nepomůže ani jedno, protože způsobilost se prokazuje českou zkouškou bez ohledu na to, co má člověk vystudováno. Tato stránka tyto cesty od sebe odděluje, aby je bylo možné naplánovat souběžně s pobytovým řízením a nestavět jednu lhůtu za druhou. Konkrétní lhůty ani poplatky neuvádíme; ty stanovují příslušné úřady.',
  sections: [
    {
      heading: 'Dvě různá řízení, která se pletou',
      body: [
        'Uznání zahraničního vzdělání, kterému se běžně říká nostrifikace, odpovídá na otázku, jakému českému stupni vzdělání odpovídá doklad získaný v cizině. Týká se dokladu jako takového a uplatní se všude, kde se prokazuje dosažené vzdělání – například v pobytovém řízení nebo u pozice, kde zaměstnavatel určitý stupeň vyžaduje. O uznání zahraničního základního, středního a vyššího odborného vzdělání rozhodují krajské úřady, u vysokoškolského vzdělání zpravidla veřejné vysoké školy s odpovídajícím akreditovaným programem; postup a metodiku zveřejňuje MŠMT.',
        'Uznání odborné kvalifikace podle zákona č. 18/2004 Sb. řeší něco jiného: zda smí konkrétní člověk vykonávat v České republice konkrétní regulovanou činnost. Neposuzuje se jen diplom, ale kvalifikace jako celek včetně obsahu přípravy a praxe, a rozhoduje orgán příslušný pro danou činnost. MŠMT v této oblasti plní koordinační roli a vede přehled regulovaných povolání a činností. U některých států navíc uznávání dokladů o vzdělání zjednodušuje mezinárodní smlouva.',
      ],
    },
    {
      heading: 'Regulovaná, nebo neregulovaná činnost',
      body: [
        'Klíčová otázka nestojí u diplomu, ale u pozice: je činnost, kterou má člověk vykonávat, v České republice regulovaná? Pokud ne, žádné uznávací řízení se nevede a posouzení, zda je uchazeč způsobilý, je na vás. To je situace většiny pozic ve výrobě, ve skladech a v logistice.',
        'Je-li činnost regulovaná, bez rozhodnutí příslušného orgánu ji člověk vykonávat nesmí, ani kdyby ji v zahraničí dělal roky. A pozor na třetí variantu, která se přehlíží často: povolání jako celek regulované být nemusí, ale dílčí činnost v jeho rámci vyžaduje odbornou způsobilost podle jiného předpisu. Tak je to u prací na elektrických zařízeních nebo na vyhrazených technických zařízeních – tento požadavek platí bez ohledu na státní příslušnost pracovníka.',
      ],
      bullets: [
        'Zjistěte, zda je činnost v ČR regulovaná; přehled vede MŠMT',
        'U neregulované činnosti posuzuje způsobilost zaměstnavatel sám',
        'U regulované činnosti je nutné rozhodnutí příslušného orgánu',
        'Zvlášť ověřte dílčí činnosti s vlastním požadavkem odborné způsobilosti',
        'Požadavek na způsobilost platí stejně pro tuzemské i zahraniční pracovníky',
      ],
    },
    {
      heading: 'Občané EU a EHP versus třetí země',
      body: [
        'Zákon č. 18/2004 Sb. stojí na evropském režimu uznávání a je určen především občanům členských států Evropské unie, států Evropského hospodářského prostoru a Švýcarska a osobám, které jim právní úprava klade naroveň. U nich se hodnotí kvalifikace získaná v jiném členském státě a řízení má podobu porovnání s českými požadavky, případně s doplňujícím opatřením.',
        'U občanů třetích zemí bývá postup jiný a delší. Obvykle se začíná uznáním dokladu o vzdělání a teprve na ně navazuje splnění požadavků, které pro danou činnost stanoví český předpis. Souběžně běží pobytové a pracovní oprávnění, které se řídí vlastními pravidly. Tato stránka lhůty neuvádí – závazné informace poskytují MŠMT, orgán příslušný pro danou činnost, Ministerstvo vnitra ČR a Úřad práce ČR.',
      ],
    },
    {
      heading: 'Svařování a elektro: proč zahraniční diplom nestačí',
      body: [
        'U dvou skupin profesí naráží zaměstnavatelé nejčastěji. První je svařování. Rozsah, ve kterém smí svářeč pracovat, neurčuje diplom, ale zkouška svářeče a osvědčení vydané podle ČSN EN ISO 9606-1. Zahraniční osvědčení podle téže normy může být použitelné, je ale nutné ověřit, kdo je vydal, jaký rozsah obsahuje, zda je v platnosti a zda je akceptuje váš zákazník; jinak se přistupuje ke zkoušce v Česku. Vysvědčení ze střední školy tuto otázku nezodpoví ani u uchazeče, který svařuje řadu let.',
        'Druhou skupinou je elektrotechnika. Nařízení vlády č. 194/2022 Sb. váže odbornou způsobilost na odborné vzdělání v elektrotechnice, praxi a zkoušku. Zahraniční vzdělání může posloužit k doložení vzdělanostní podmínky – po jeho uznání – ale zkouška se skládá podle české úpravy. Počítejte tedy se dvěma kroky za sebou, ne s jedním.',
      ],
    },
    {
      heading: 'Souběh s pobytovým řízením',
      body: [
        'Uznávání kvalifikace a pobytové oprávnění jsou dvě samostatné linky, které se ale potkávají v dokladech. U zaměstnanecké karty se prokazuje odborná způsobilost požadovaná pro obsazované pracovní místo, a je-li způsobilost pro danou činnost regulovaná, i doklad o jejím splnění. U modré karty je podmínkou vysoká kvalifikace; ta se dokládá zpravidla vzděláním, u vymezených povolání může postačit odborná praxe. Ministerstvo vnitra ČR přitom může vyžadovat doklad o vzdělání v uznané podobě, proto si požadavky ověřte předem.',
        'Praktický důsledek je jednoduchý: pokud s žádostí o uznání vzdělání čekáte až na výsledek pobytového řízení, postavíte si obě řízení za sebe místo vedle sebe. Vyplatí se proto zjistit požadavky na doklady dřív, než uchazeči nabídnete místo. Závazné informace o pobytových titulech poskytuje Ministerstvo vnitra ČR, k zaměstnávání cizinců Úřad práce ČR.',
      ],
    },
    {
      heading: 'Co s tím udělat prakticky',
      body: [
        'Než začnete shánět razítka, ujasněte si, co po dokladu vlastně chcete: prokázat stupeň vzdělání, získat přístup k regulované činnosti, nebo doložit způsobilost ke konkrétní technické práci. Každá z těch tří odpovědí vede jinam a jejich zaměňování bývá častým důvodem, proč se nástup odkládá.',
        'U neregulovaných technických činností existuje ještě jedna cesta, na kterou se zapomíná: pracovník může v Česku složit zkoušku z profesní kvalifikace podle zákona č. 179/2006 Sb. před autorizovanou osobou a získat osvědčení. Uznání vzdělání to nenahrazuje, ale pro doložení konkrétní dovednosti jde o samostatnou a jednoznačně vymezenou cestu, protože standard požadavků je veřejný.',
      ],
      bullets: [
        'Popište činnost, ne titul – teprve z ní plyne, co je potřeba uznat',
        'Ověřte, zda je činnost regulovaná, ještě před nabídkou místa',
        'U technických prací počítejte se zkouškou podle české úpravy',
        'Zajistěte překlady a vyšší ověření dokladů podle požadavků úřadu',
        'Sledujte platnost dokladů, aby nevypršely v průběhu řízení',
      ],
    },
  ],
  faq: [
    {
      q: 'Je nostrifikace totéž co uznání odborné kvalifikace?',
      a: 'Není. Uznání zahraničního vzdělání říká, jakému českému stupni doklad odpovídá. Uznání odborné kvalifikace podle zákona č. 18/2004 Sb. říká, zda smí konkrétní osoba vykonávat konkrétní regulovanou činnost. Jedno druhé nenahrazuje a v některých situacích potřebujete obojí.',
    },
    {
      q: 'Potřebuje skladník nebo operátor výroby uznání kvalifikace?',
      a: 'U neregulovaných činností se uznávací řízení nevede a posouzení způsobilosti je na zaměstnavateli. Pokud ale má pracovník obsluhovat techniku nebo pracovat na zařízeních, u nichž předpis vyžaduje odbornou způsobilost, platí tento požadavek i pro něj – bez ohledu na to, odkud přichází.',
    },
    {
      q: 'Uzná se zahraniční svářečské osvědčení?',
      a: 'Záleží na tom, kdo je vydal, podle jaké normy, v jakém rozsahu a zda je v platnosti, a také na tom, co akceptuje váš zákazník. Osvědčení podle ČSN EN ISO 9606-1 vydané v zahraničí může být použitelné, jinak se skládá zkouška v Česku. Rozhodující je vždy rozsah uvedený v dokladu.',
    },
    {
      q: 'Jak dlouho uznávání trvá a kolik stojí?',
      a: 'Lhůty ani poplatky zde neuvádíme, protože se liší podle typu řízení a orgánu, který o něm rozhoduje. Závazné informace poskytuje MŠMT a orgán příslušný pro danou činnost, u pobytových titulů Ministerstvo vnitra ČR.',
    },
    {
      q: 'Můžeme pracovníka zaměstnat, dokud řízení běží?',
      a: 'U neregulované činnosti nic nebrání tomu, aby pracoval, má-li platné pobytové a pracovní oprávnění. U regulované činnosti nebo u práce vyžadující odbornou způsobilost ho na ni nasadit nelze; do vydání dokladu se přiděluje jiná práce. Postup ověřte u příslušného orgánu.',
    },
  ],
  sources: [
    SRC.zakonUznavaniKvalifikace,
    SRC.msmt,
    SRC.zakonDalsiVzdelavani,
    SRC.nvElektrotechnika,
    SRC.csnSvarovani,
    SRC.zakonOPobytuCizincu,
    SRC.blueCardSmernice,
    SRC.mvcr,
    SRC.upcr,
  ],
  internalLinks: [
    { href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    { href: '/povinnosti-pri-zamestnavani-cizincu', label: 'Povinnosti při zaměstnávání cizinců' },
    { href: '/modra-karta-cr', label: 'Modrá karta v ČR' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Dokumenty pro zaměstnání cizinců' },
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_SVARECU: SeoPage = {
  slug: 'nabor-svarecu',
  breadcrumbLabel: 'Nábor svářečů',
  eyebrow: 'Nábor · Strojírenství',
  title: 'Nábor svářečů: metody, průkazy a rozsah kvalifikace',
  heroSubtitle:
    'Proč „svářeč“ není jedna kvalifikace, jak popsat zadání pozice rozsahem zkoušky a proč o výsledku výběru nakonec rozhodne zkušební svar. Pohled z provozu.',
  description:
    'Nábor svářečů: rozsah kvalifikace podle ČSN EN ISO 9606-1 – metoda, materiál, poloha i tloušťka, svářečský průkaz versus osvědčení o zkoušce a zkušební svar.',
  keywords: [
    'nábor svářečů',
    'svářečský průkaz',
    'zkouška svářeče',
    'rozsah kvalifikace svářeče',
    'metody svařování',
    'zkušební svar',
    'osvědčení svářeče',
  ],
  intro:
    'Inzerát, který hledá „svářeče“, je pro uchazeče stejně nekonkrétní, jako by výrobní firma hledala „člověka na stroje“. Svařování není jedna dovednost, ale řada kombinací metody, materiálu, tvaru výrobku a polohy – a doklad, který svářeč přinese, není vysvědčení o povolání, nýbrž popis rozsahu, ve kterém prošel zkouškou. Když se zadání pozice s tímto rozsahem nepotká, výběrové řízení se naplní lidmi, kteří svařovat umí, ale ne to, co potřebujete. Tato stránka ukazuje, jak zadání popsat, co číst v dokladu, jak postavit zkušební svar a co u této profese přidává BOZP.',
  sections: [
    {
      heading: 'Co doklad svářeče ve skutečnosti říká',
      body: [
        'Zkouška svářeče podle ČSN EN ISO 9606-1 neprobíhá obecně. Svářeč svaří zkušební kus za přesně definovaných podmínek a osvědčení pak popisuje rozsah, který je tím ověřen. Právě tento rozsah – nikoli slovo svářeč – je informace, se kterou má nábor pracovat.',
        'Rozsah se skládá z několika proměnných najednou a změna kterékoli z nich může znamenat, že doklad na vaši práci nestačí. Uvedená norma se navíc týká ocelí; hliník a jeho slitiny řeší jiná část téže normy, takže doklad na ocel nevypovídá nic o schopnosti svařovat hliník.',
      ],
      bullets: [
        'Metoda svařování v číselném označení podle ČSN EN ISO 4063 – například 111 (ruční obloukové svařování obalenou elektrodou), 135 (MAG plným drátem), 136 (plněná elektroda), 141 (TIG wolframovou elektrodou)',
        'Skupina základního materiálu – nelegovaná a korozivzdorná ocel nejsou totéž',
        'Typ výrobku – plech, nebo trubka',
        'Typ svaru – tupý, nebo koutový',
        'Poloha svařování v označení podle ČSN EN ISO 6947, například PA, PB, PC nebo PF; některé polohy pokrývají jiné',
        'Tloušťka materiálu a u trubek průměr, z nichž se odvozuje rozsah platnosti',
        'Provedení kořene – s podložením, nebo bez podložení',
      ],
    },
    {
      heading: 'Proč inzerát na „svářeče“ přivede nepoužitelné uchazeče',
      body: [
        'Chybí-li v inzerátu rozsah, uchazeč si ho domyslí. Přihlásí se člověk se základním kurzem metody 111 na plechy, protože o sobě právem říká, že je svářeč – a přijde na pracoviště, kde je předepsána metoda 141 na korozivzdorných trubkách, poloha PF a svar bez podložení kořene. Nikdo nelhal, obě strany si jen pod stejným slovem představily jinou práci.',
        'Náklad není jen v promarněných pohovorech. Nepřesné zadání zkresluje i to, jak pozice vypadá na trhu: firma nabývá dojmu, že svářeči nejsou, přestože ve skutečnosti nepopsala, jaké svářeče hledá. Zadání s rozsahem naopak funguje jako filtr – kdo daný rozsah nemá, většinou se nepřihlásí, a kdo se přihlásí, přinese doklad, který lze porovnat s požadavkem.',
      ],
      bullets: [
        'Uveďte metodu, skupinu materiálu, typ výrobku, polohu a rozsah tlouštěk',
        'Rozlište dílenskou práci a montáž na stavbě nebo u zákazníka',
        'Napište, zda se pracuje podle postupu svařování (WPS) a podle výkresu',
        'Uveďte, zda požadujete platné osvědčení, nebo zda stačí průkaz a zaučení',
        'Zmiňte režim směn – u této profese výrazně ovlivňuje zájem uchazečů',
      ],
    },
    {
      heading: 'Svářečský průkaz, základní kurz a osvědčení o zkoušce',
      body: [
        'V praxi se míchají dva různé doklady. Svářečský průkaz se záznamem o základním kurzu dokládá, že člověk prošel výukou dané metody ve svářečské škole a umí s ní pracovat. Osvědčení o zkoušce svářeče podle ČSN EN ISO 9606-1 je výsledkem zkoušky před zkušebním orgánem a vymezuje rozsah, ve kterém smí svářeč pracovat tam, kde to výrobková norma nebo zákazník požaduje.',
        'Pro běžnou dílenskou výrobu bez zvláštních požadavků může postačit průkaz a zaučení. Jakmile ale kvalitu svařování dokládáte zákazníkovi nebo podle norem, které stanovují požadavky na jakost při tavném svařování, potřebujete zkoušku a s ní i svářečský dozor, který postupy svařování a kvalifikace svářečů spravuje. Tuto otázku vyřešte dřív, než začnete nabírat – mění okruh uchazečů i to, co po nich budete chtít.',
        'Osvědčení není doživotní. Norma na ně váže pravidelné potvrzování, že svářeč v daném rozsahu skutečně pracuje, a časově omezenou platnost s podmínkami pro obnovení. Data i rozsah jsou uvedena přímo na dokladu; při ověřování je to první, co si přečtěte.',
      ],
    },
    {
      heading: 'Zkušební svar jako rozhodující krok výběru',
      body: [
        'Doklad říká, co člověk zvládl v den zkoušky za podmínek zkušebny. O tom, zda zvládne vaši práci, rozhodne zkušební svar. Připravte kus, který odpovídá vaší běžné zakázce – stejný materiál, tloušťka, poloha, příprava svarových ploch a pokud možno i postup svařování, podle kterého se u vás pracuje.',
        'Sledujte přitom víc než výsledný vzhled svaru: jak si člověk nastaví zdroj, zda si přečte výkres, jak připraví a očistí materiál, jak zachází s ochranným plynem a jak si svar sám zkontroluje. Hodnocení nechte na tom, kdo u vás za svařování odpovídá, a zapište je – u sporných případů i u dalšího kola náboru se záznam vyplatí. A protože jde o práci se skutečným rizikem, musí i uchazeč při zkušebním svaru dostat OOPP a být seznámen s pravidly pracoviště.',
      ],
      bullets: [
        'Zkušební kus podle reálné zakázky, ne podle učebnicového vzorku',
        'Stejná poloha a tloušťka, jaká uchazeče na pozici čeká',
        'Sledujte i přípravu materiálu, nastavení zdroje a čtení výkresu',
        'Hodnotí odpovědná osoba za svařování, výsledek se zapisuje',
        'OOPP a poučení o rizicích platí i pro uchazeče při zkoušce',
      ],
    },
    {
      heading: 'Zahraniční svářeči a jejich doklady',
      body: [
        'U svařování je nábor ze zahraničí běžný a doklad bývá vydán podle stejné normy jako v Česku, protože jde o převzatou mezinárodní normu. To ale neznamená, že je bez dalšího použitelný. Ověřte, kdo osvědčení vydal, jaký rozsah obsahuje, zda je v platnosti a zda je akceptuje váš zákazník – u dodávek s dokládanou jakostí svařování to bývá rozhodující. Pokud podmínky nesplňuje, přistupuje se ke zkoušce v Česku.',
        'Druhou věcí je dorozumění. Svářeč pracuje podle výkresu a podle postupu svařování a musí rozumět pokynům k bezpečnosti. Zvažte předem, jak zajistíte, aby těmto podkladům rozuměl; u montážních prací mimo dílnu to platí dvojnásob.',
      ],
    },
    {
      heading: 'BOZP, OOPP a zdravotní způsobilost',
      body: [
        'Svařování má vlastní rizikový profil a nábor se s ním potká hned při nástupu. Vedle popálení a odletujících jisker jde o záření z oblouku, které poškozuje zrak i kůži, a o svařovací dýmy – u korozivzdorných ocelí a povrchově upravených materiálů zvlášť sledované. Proto se řeší odsávání na pracovišti a u části prací i ochrana dýchacích cest.',
        'Svařování mimo stálé svařovací pracoviště se navíc pojí se zvláštními požadavky požární bezpečnosti: písemným stanovením podmínek pro danou práci a dohledem i po jejím skončení. To má dopad na plánování – montážní svářeč není jen svářeč, který jezdí, ale role s další administrativou a odpovědností.',
      ],
      bullets: [
        'Svářečská kukla se správným stupněm zatemnění a nehořlavý oděv',
        'Odsávání svařovacích dýmů, u některých materiálů i ochrana dýchacích cest',
        'Vstupní pracovnělékařská prohlídka se zohledněním zraku a pracovních poloh',
        'Zvláštní režim pro svařování mimo stálé svařovací pracoviště',
        'Seznámení s riziky pracoviště; u dočasného přidělení je zajišťuje uživatel',
      ],
    },
  ],
  faq: [
    {
      q: 'Co má být v inzerátu na svářeče?',
      a: 'Metoda podle číselného označení, skupina materiálu, typ výrobku a svaru, poloha, rozsah tlouštěk a informace o podložení kořene. Dále to, zda jde o dílnu, nebo montáž, zda se pracuje podle postupu svařování a jaký doklad požadujete. Bez toho se uchazeči nemají podle čeho rozhodnout.',
    },
    {
      q: 'Stačí svářečský průkaz, nebo je potřeba osvědčení o zkoušce?',
      a: 'Záleží na tom, co po vás chce výrobková norma nebo zákazník. Pro běžnou dílenskou práci bez zvláštních požadavků může stačit průkaz a zaučení; tam, kde se kvalita svařování dokládá, je potřeba zkouška podle ČSN EN ISO 9606-1 a svářečský dozor, který kvalifikace spravuje.',
    },
    {
      q: 'Jak dlouho platí osvědčení svářeče?',
      a: 'Platnost je omezená a norma ji váže na pravidelné potvrzování, že svářeč v daném rozsahu pracuje. Konkrétní data i rozsah jsou uvedeny přímo v dokladu a podmínky obnovení ověřte u orgánu, který osvědčení vydal. Proto si u svářečů veďte evidenci dat platnosti.',
    },
    {
      q: 'Jakou mzdu u svářečů nabídnout?',
      a: 'Konkrétní mzdy ani rozpětí zde neuvádíme. Orientaci podle profesí a regionů poskytuje Informační systém o průměrném výdělku (ISPV). Do rozhodování promítněte i rozsah kvalifikace, režim směn a to, zda jde o dílenskou práci, nebo o montáž mimo provoz.',
    },
    {
      q: 'Můžeme zkušební svar požadovat po každém uchazeči?',
      a: 'Praktické ověření je u této profese obvyklé a bývá rozhodujícím krokem výběru. Podmínky mají být pro všechny uchazeče o stejnou pozici shodné, uchazeč musí dostat OOPP a být seznámen s riziky a hodnocení má provádět ten, kdo u vás za svařování odpovídá.',
    },
  ],
  sources: [
    SRC.csnSvarovani,
    SRC.nsk,
    SRC.nsp,
    SRC.zakonBozp,
    SRC.zakonPracovnelekarske,
    SRC.zakonikPrace,
    SRC.zakonUznavaniKvalifikace,
    SRC.ispv,
  ],
  internalLinks: [
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
    { href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' },
    { href: '/stavebni-profese', label: 'Stavební profese' },
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ── ENGINEERING ────────────────────────────────────────

export const STROJIRENSKE_PROFESE: SeoPage = {
  slug: 'strojirenske-profese',
  breadcrumbLabel: 'Strojírenské profese',
  eyebrow: 'Nábor · Strojírenství',
  title: 'Strojírenské profese: obrábění, svařování a zámečnictví',
  heroSubtitle:
    'Přehled kvalifikovaných strojírenských řemesel – od obrábění a svařování po zámečnictví a nástrojařinu – a toho, co u nich při náboru skutečně rozhoduje.',
  description:
    'Strojírenské profese – obráběč, CNC seřizovač, svářeč, zámečník i nástrojař: čím se liší, co ověřit u výkresu a měřidla a jak profesi popsat v zadání náboru.',
  keywords: [
    'strojírenské profese',
    'nábor obráběčů',
    'kvalifikované profese strojírenství',
    'obráběč kovů',
    'zámečník nástrojař',
    'čtení výkresové dokumentace',
  ],
  intro:
    'Pod pojmem strojírenské profese se skrývá několik samostatných řemesel, která mají odlišný výcvik, odlišné doklady a odlišně široký okruh kandidátů. Zadání „hledáme strojaře“ proto v praxi nikam nevede – obráběč, svářeč, zámečník a nástrojař se neliší jen tím, co dělají, ale hlavně tím, podle čeho se dá jejich způsobilost ověřit. Tato stránka rozebírá jednotlivé rodiny profesí, hranici mezi obsluhou, seřízením a programováním a důvod, proč o obsaditelnosti nakonec rozhoduje čtení výkresu a práce s měřidlem víc než značka stroje. Mzdové ani tržní údaje zde neuvádíme; patří do oficiálních zdrojů.',
  sections: [
    {
      heading: 'Rodiny strojírenských profesí a čím se liší',
      body: [
        'Strojírenská výroba stojí na několika řemeslech, která spolu sousedí, ale nezastupují se. Rozdíl mezi nimi není v úrovni šikovnosti, nýbrž v tom, s čím pracují: obráběč ubírá materiál, svářeč jej spojuje, zámečník sestavuje a lícuje, nástrojař vyrábí a udržuje nástroje a přípravky, kterými se pak vyrábí všechno ostatní. Když se v zadání tyto role slijí do jedné, hledá výběrové řízení člověka, který na trhu buď není, nebo je na danou práci překvalifikovaný.',
        'Následující přehled slouží jako společný slovník pro poradu mezi výrobou a personálním útvarem. Podrobný popis pracovních činností i odborných požadavků ke každé z těchto profesí vede Národní soustava povolání.',
      ],
      bullets: [
        'Obráběč kovů – soustružení, frézování, vrtání na klasických i CNC strojích, důraz na rozměr a toleranci',
        'CNC operátor a seřizovač – obsluha stroje a jeho příprava na zakázku; hranice mezi nimi je pro nábor zásadní',
        'Svářeč – spojování materiálu podle metody a polohy, rozsah kvalifikace je dán zkušebním rozsahem uvedeným v osvědčení',
        'Zámečník – sestavování, lícování, opravy a údržba konstrukcí a strojních celků',
        'Nástrojař – výroba a údržba forem, přípravků a střižných nástrojů s vysokými nároky na přesnost a opakovatelnost',
        'Brusič – dokončovací operace, kde se rozhoduje o drsnosti povrchu a konečném rozměru',
        'Montér a mechanik – montáž, uvedení do provozu a servis strojů ve vlastním provozu i u zákazníka',
      ],
    },
    {
      heading: 'Obsluha, seřízení a programování nejsou totéž',
      body: [
        'Nejčastější chyba v zadání se netýká oboru, ale úrovně. Obsluha stroj hlídá, zakládá a odebírá díly, kontroluje rozměry a řeší běžné situace. Seřizovač stroj připravuje na jinou zakázku – upne přípravek, vyměří nástroje, najede nulový bod, doladí korekce a odjede první kus. Programátor tvoří technologii a dráhu nástroje, ať už dílenským programováním přímo u stroje, nebo v systému CAM.',
        'Každá z těchto úrovní má jinou dostupnost na trhu a jinou dobu zapracování. Firma, která do jednoho inzerátu napíše všechny tři, obvykle dostane přihlášky od obsluhy a přitom čeká na seřizovače. Rozdílu i tomu, co z něj plyne pro obsaditelnost, se podrobně věnuje samostatná stránka o náboru CNC operátorů a seřizovačů.',
      ],
    },
    {
      heading: 'Výkres a měřidlo jako skutečná dělicí čára',
      body: [
        'Při výběru se nejvíc informací získá dvěma okruhy otázek: co kandidát vyčte z výkresu a co udělá s měřidlem. Čtení výkresu neznamená jen najít kótu. Jde o to, zda člověk rozumí tolerančnímu poli, geometrickým tolerancím, předepsané drsnosti povrchu, řezům a pohledům i značkám svarů – tedy tomu, co se stane, když se rozměr trefí a tvar ne.',
        'Druhý okruh je metrologický. Posuvné měřítko, mikrometr, číselníkový úchylkoměr a mezní kalibry se používají jinak a měří s jinou přesností; zkušený pracovník pozná, kdy který nástroj nestačí a kdy je namístě měření na souřadnicovém měřicím stroji. Do stejné roviny patří pořádek v kalibraci měřidel: obecný rámec pro měřidla a jejich návaznost dává zákon o metrologii, konkrétní režim pracovních měřidel si provoz stanoví vlastním metrologickým řádem a ptají se na něj i zákaznické audity.',
      ],
      bullets: [
        'Nechte kandidáta přečíst reálný výkres z vaší výroby, ne obecné zadání',
        'Zeptejte se, jak by konkrétní rozměr změřil a proč právě tímto měřidlem',
        'Ptejte se na situaci, kdy díl nevyhověl – co udělal a koho informoval',
        'Ověřte, zda pracoval podle kontrolního plánu a jak zapisoval výsledky',
      ],
    },
    {
      heading: 'Jeden stroj, více strojů a přenositelnost mezi obory',
      body: [
        'Druhá rozlišovací osa je šíře záběru. Pracovník zapracovaný na jednom typu stroje v dlouhé sérii má jiný profil než ten, kdo v kusové a malosériové výrobě přechází mezi stroji, sám si čte výkres a sám se seřizuje. Vícestrojová obsluha přitom není jen otázkou dovednosti, ale i uspořádání pracoviště a délky strojních časů – bez toho ji nelze očekávat ani po zapracování.',
        'Praxe z jiného odvětví se přenáší nerovnoměrně. Řemeslný základ – měření, čtení výkresu, upínání, práce s nástrojem – přechází dobře. Hůř se přenáší to, co je navázané na materiál, sériovost a dokumentaci: kdo obráběl hliníkové odlitky v automobilové sériové výrobě, nemusí být hned doma v kusové výrobě z nerezu, a naopak. U svařování je hranice tvrdší, protože rozsah kvalifikace určuje zkušební rozsah uvedený v osvědčení, nikoli délka praxe.',
      ],
    },
    {
      heading: 'Jak profesi popsat v zadání: NSP a NSK jako společný slovník',
      body: [
        'Pro popis pozice se vyplatí nevymýšlet vlastní názvosloví. Národní soustava povolání popisuje povolání, typové pozice a jejich odborné požadavky; Národní soustava kvalifikací k nim přiřazuje profesní kvalifikace s hodnoticím standardem, které lze doložit osvědčením po složení zkoušky u autorizované osoby podle zákona o ověřování a uznávání výsledků dalšího vzdělávání. Pro zaměstnavatele je to praktické dvakrát: zadání dostane srozumitelný tvar a zároveň se otevře cesta ke kandidátům, kteří řemeslo umějí, ale nemají odpovídající výuční list.',
        'Vedle toho existují doklady, které nelze nahradit ničím jiným. U svařování je to osvědčení o zkoušce svářeče podle příslušné normy s uvedeným zkušebním rozsahem, u prací na elektrických zařízeních doklad o odborné způsobilosti v elektrotechnice, u vyhrazených technických zařízení pak příslušné osvědčení. Tyto doklady mají omezenou platnost a patří do zadání hned na začátku, ne až k podpisu smlouvy.',
      ],
      bullets: [
        'Uveďte profesi názvem podle NSP, ne interní zkratkou nebo číslem střediska',
        'Rozlište úroveň: obsluha, samostatná práce podle výkresu, nebo seřízení',
        'Vyjmenujte stroje, obráběné materiály a typickou velikost série',
        'Popište směnný režim a pracoviště dřív, než se dostanete na mzdu',
        'Vypište povinné doklady včetně rozsahu a požadované platnosti',
      ],
    },
  ],
  faq: [
    {
      q: 'Proč nestačí zadání „hledáme strojaře“?',
      a: 'Protože obráběč, svářeč, zámečník a nástrojař mají odlišný výcvik i doklady a jejich okruhy kandidátů se překrývají jen zčásti. Zadání bez konkrétní profese, úrovně a strojů obvykle přinese přihlášky mimo potřebu provozu.',
    },
    {
      q: 'Podle čeho se pozná zkušený obráběč u pohovoru?',
      a: 'Především podle práce s výkresem a měřidlem: co vyčte z tolerancí a drsnosti, čím by rozměr ověřil a jak postupoval, když díl nevyhověl. Tyto otázky odliší rutinu od samostatnosti lépe než délka praxe v životopisu.',
    },
    {
      q: 'Má smysl oslovit kandidáta z jiného odvětví?',
      a: 'Často ano. Řemeslný základ se přenáší dobře, hůř přechází zkušenost navázaná na materiál, velikost série a dokumentaci. U svařování je ale rozhodující zkušební rozsah uvedený v osvědčení, který praxe z jiného oboru nenahradí.',
    },
    {
      q: 'Jak doložit kvalifikaci u kandidáta bez výučního listu?',
      a: 'Cestou je profesní kvalifikace podle Národní soustavy kvalifikací – zkouška u autorizované osoby a osvědčení k dané kvalifikaci. U činností, které upravuje zvláštní předpis, tím ovšem nelze nahradit doklad, který tento předpis vyžaduje.',
    },
    {
      q: 'Uvádíte mzdové rozpětí strojírenských profesí?',
      a: 'Ne, mzdová data nevymýšlíme. Členěné údaje o výdělcích podle povolání zveřejňuje Informační systém o průměrném výdělku (ISPV); obraz trhu práce pak MPSV, Úřad práce ČR a ČSÚ.',
    },
  ],
  sources: [SRC.nsp, SRC.nsk, SRC.zakonDalsiVzdelavani, SRC.csnSvarovani, SRC.zakonMetrologie, SRC.ispv],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/nabor-cnc-operatoru', label: 'Nábor CNC operátorů a seřizovačů' },
    { href: '/nabor-svarecu', label: 'Nábor svářečů' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
    { href: '/operatori-vyroby', label: 'Operátoři výroby' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    { href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_CNC_OPERATORU: SeoPage = {
  slug: 'nabor-cnc-operatoru',
  breadcrumbLabel: 'Nábor CNC operátorů',
  eyebrow: 'Nábor · Obrábění',
  title: 'Nábor CNC operátorů a seřizovačů: co ovlivňuje obsaditelnost',
  heroSubtitle:
    'Proč se poptávka po „CNC operátorovi“ obsazuje pomalu a co s tím jde udělat – od rozlišení úrovní přes řídicí systém a měření až po směnný model a praktickou zkoušku.',
  description:
    'Nábor CNC operátorů a seřizovačů – rozdíl mezi obsluhou, seřizovačem a programátorem, role řídicího systému, měření, směnný model a praktická zkouška u stroje.',
  keywords: [
    'nábor CNC operátorů',
    'CNC seřizovač',
    'obsluha CNC strojů',
    'řídicí systém Heidenhain Siemens Fanuc',
    'programátor CNC',
    'obsazení pozice ve strojírenství',
  ],
  intro:
    'Řada zaseknutých náborů na CNC nezačíná nedostatkem lidí, ale zadáním, které míchá tři různé pozice. Obsluha, seřizovač a programátor mají jinou dostupnost, jinou dobu zapracování i jinou cenu, a inzerát, který je spojí do jednoho profilu, hledá kandidáta odpovídajícího nejvyšší úrovni za podmínek té nejnižší. Tato stránka rozebírá, co obsaditelnost CNC pozice skutečně ovlivňuje: znalost řídicího systému, práci s měřidlem a výkresem, obsluhu jednoho nebo více strojů, směnný režim a podobu praktické zkoušky. Konkrétní mzdy ani lhůty obsazení zde neuvádíme.',
  sections: [
    {
      heading: 'Obsluha, seřizovač, programátor – tři pozice v jednom inzerátu',
      body: [
        'Obsluha CNC hlídá stroj v běžícím programu: zakládá a odebírá díly, sleduje průběh, kontroluje rozměry podle kontrolního plánu, mění otupené nástroje podle pokynu a hlásí odchylky. Přechod stroje na jinou zakázku ale nedělá.',
        'Seřizovač je ten, kdo zakázku na stroji rozjede. Upne přípravek nebo čelisti, vyměří a zadá nástroje včetně korekcí, najede nulový bod obrobku, projede program nasucho, odjede a proměří první kus a teprve pak předá stroj do sériového chodu. Právě tady se rozhoduje o čase přestavby i o zmetkovitosti, a proto bývá seřizovač hůř dostupný než obsluha.',
        'Programátor tvoří technologii a dráhu nástroje – buď dílenským programováním přímo na stroji, nebo v systému CAM s následným postprocesem. Firma, která shání programátora, řeší jinou potřebu než firma, které chybí lidé na noční směnu. Spojit obojí do jednoho zadání znamená čekat na kandidáta, který se objeví jen výjimečně. Pro pojmenování jednotlivých úrovní se vyplatí sáhnout po popisu typové pozice v Národní soustavě povolání, ne po interní zkratce.',
      ],
      bullets: [
        'Určete, kdo u vás seřizuje – seřizovač, mistr, nebo si operátor seřizuje sám',
        'Podle toho zvolte název pozice i požadavky, ne naopak',
        'U obsluhy popište, co se od ní očekává při změně zakázky',
        'U seřizovače uveďte typy strojů, způsob upínání a velikost série',
      ],
    },
    {
      heading: 'Řídicí systém: skutečné, ale naučitelné omezení',
      body: [
        'Heidenhain, Siemens a Fanuc se ovládají odlišně a člověk zvyklý na jeden systém není v prvních dnech u jiného stejně rychlý. To je reálné omezení a nemá smysl je zlehčovat. Zároveň jde ale o omezení naučitelné: kdo rozumí technologii obrábění, čte výkres a umí měřit, přeučí se na jiné rozhraní snáz než ten, kdo zná pouze posloupnost kroků na jednom konkrétním stroji.',
        'Pro nábor z toho plyne praktický závěr. Trváte-li na přesné shodě systému, zúžíte okruh kandidátů natolik, že se pozice obsazuje déle. Berete-li shodu jako výhodu, a ne jako podmínku, musíte mít připravené zapracování a člověka, který je odvede. Toto rozhodnutí patří do zadání – jinak je za vás v praxi udělá předvýběr.',
      ],
      bullets: [
        'Uveďte konkrétní řídicí systémy a rozhraní, které v provozu skutečně máte',
        'Řekněte rovnou, zda je znalost systému podmínkou, nebo výhodou',
        'Dílenské programování posuzujte zvlášť – není totéž co práce v CAM',
        'Mějte určeno, kdo nového člověka na systému zaučí a v jakém rozsahu',
      ],
    },
    {
      heading: 'Měření a výkres rozhodují víc než značka stroje',
      body: [
        'Ve výběrovém řízení se osvědčuje ptát se na měření dřív než na stroje. Posuvné měřítko, mikrometr, číselníkový úchylkoměr a mezní kalibry mají různou přesnost i různé použití a odpověď na otázku „čím byste tento rozměr ověřil a proč“ prozradí o kandidátovi víc než výčet značek, na kterých pracoval.',
        'Totéž platí o výkresové dokumentaci. Toleranční pole, geometrické tolerance a předepsaná drsnost povrchu určují, co se stane s dílem, který má správný rozměr a špatný tvar. Do stejné roviny patří i to, zda kandidát ví, proč se proměřuje první kus, jak se zápis promítne do kontrolního plánu a co se dělá s dílem, který nevyhověl. Návaznost a kalibrace používaných měřidel má obecný rámec v zákoně o metrologii a v metrologickém řádu provozu.',
      ],
    },
    {
      heading: 'Jeden stroj, nebo obsluha více strojů',
      body: [
        'Vícestrojová obsluha se do inzerátů píše častěji, než odpovídá realitě provozu. Aby dávala smysl, musí ji dovolit strojní časy, uspořádání pracoviště a povaha dílů; jinak se z ní stane trvalý zdroj přesčasů a chyb. Pokud ji požadujete, uveďte, o kolik strojů a o jaké operace jde.',
        'Rozdíl je i v profilu člověka. Kdo léta pracoval na jednom stroji v dlouhé sérii, zvládá jej dokonale, ale střídání zakázek pro něj znamená zapracování. Naopak pracovník z kusové a malosériové výroby bývá zvyklý na časté přestavby a na samostatnost, nemusí však být zvyklý na tempo a disciplínu velké série. Ani jedno není horší – jen je potřeba vědět, co provoz skutečně potřebuje.',
      ],
    },
    {
      heading: 'Směnný model bývá rozhodující faktor',
      body: [
        'U CNC pozic rozhoduje o obsaditelnosti překvapivě často směna, nikoli dovednost. Třísměnný a nepřetržitý provoz zužuje okruh kandidátů jinak než dvousměnný, a to i mezi lidmi, kteří o práci stojí. Roli hraje dojezd, rodinná situace i to, zda se směny střídají předvídatelně a zda je rozvrh známý s dostatečným předstihem.',
        'Je-li směnnost daná a nelze ji měnit, je lepší to napsat rovnou a otevřeně; pozdější odhalení stojí obě strany čas. Pokud měnit lze, bývá právě tady největší rezerva pro obsazení pozice – například vyčleněním jedné stálé denní pozice pro seřizovače nebo stabilním rozvrhem na delší období. Pravidla pro rozvržení pracovní doby, přestávky a odpočinek stanoví zákoník práce.',
      ],
      bullets: [
        'Uveďte směnný režim a délku směny přímo v inzerátu',
        'Řekněte, jak dlouho dopředu je znám rozvrh směn',
        'Zvažte, zda musí být seřizovač ve stejném režimu jako obsluha',
        'Ověřte dostupnost pracoviště na začátku a konci směny',
      ],
    },
    {
      heading: 'Praktická zkouška u stroje místo delšího pohovoru',
      body: [
        'Spolehlivým sítem u těchto pozic bývá krátká praktická ukázka přímo v provozu. Nejde o zkoušení, ale o to vidět, jak člověk přistupuje ke stroji, jak drží měřidlo, na co se ptá a co si ověřuje. Chvíle u stroje řekne o kandidátovi víc než výčet značek strojů v životopisu a zároveň mu dá realistickou představu o práci, na kterou nastupuje.',
        'Praktická zkouška má i své náležitosti. Kandidát musí být před vstupem do provozu seznámen s riziky a vybaven OOPP, ukázka se odehrává pod dohledem a v rozsahu, který je bezpečný. Při nástupu pak platí obvyklé kroky – pracovnělékařská prohlídka, vstupní školení BOZP a seznámení s konkrétním pracovištěm a stroji.',
      ],
    },
  ],
  faq: [
    {
      q: 'Jaký je rozdíl mezi operátorem a seřizovačem CNC?',
      a: 'Operátor obsluhuje stroj v běžícím programu a kontroluje díly. Seřizovač připravuje stroj na novou zakázku – upnutí, nástroje a korekce, nulový bod, první kus. Jde o dvě různé pozice s odlišnou dostupností na trhu i odlišnou dobou zapracování.',
    },
    {
      q: 'Musí kandidát znát právě náš řídicí systém?',
      a: 'Znalost systému je reálná výhoda, ale bývá naučitelná. Kdo rozumí technologii, čte výkres a umí měřit, přejde na jiné rozhraní rychleji. Pokud shodu vyžadujete jako podmínku, počítejte s užším okruhem kandidátů a delším obsazováním.',
    },
    {
      q: 'Má smysl zvát kandidáta z jiného oboru obrábění?',
      a: 'Ano, pokud rozdíl pojmenujete. Přenáší se měření, čtení výkresu a práce s nástrojem; hůř se přenáší zkušenost s konkrétním materiálem, velikostí série a zákaznickou dokumentací. Praktická ukázka u stroje to ověří lépe než životopis.',
    },
    {
      q: 'Proč se nám pozice neobsazuje, i když nabídka není špatná?',
      a: 'Obvykle za tím stojí jedna ze tří věcí: zadání míchá obsluhu se seřizovačem, znalost řídicího systému je nastavena jako tvrdá podmínka, nebo je překážkou směnný režim. Vyplatí se projít je v tomto pořadí, než se sáhne k úpravě mzdové nabídky.',
    },
    {
      q: 'Uvádíte mzdy CNC operátorů a seřizovačů?',
      a: 'Ne. Konkrétní částky ani rozpětí nevymýšlíme. Údaje o výdělcích členěné podle povolání zveřejňuje ISPV, aktuální situaci na trhu práce pak MPSV a Úřad práce ČR.',
    },
  ],
  sources: [SRC.nsp, SRC.zakonMetrologie, SRC.zakonikPrace, SRC.zakonBozp, SRC.ispv],
  internalLinks: [
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
    { href: '/operatori-vyroby', label: 'Operátoři výroby' },
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NABOR_ELEKTRIKARU: SeoPage = {
  slug: 'nabor-elektrikaru',
  breadcrumbLabel: 'Nábor elektrikářů',
  eyebrow: 'Nábor · Elektrotechnika',
  title: 'Nábor elektrikářů: odborná způsobilost v elektrotechnice',
  heroSubtitle:
    'Jak se vyznat v požadavcích na elektrikáře – od nařízení vlády č. 194/2022 Sb. přes vyhrazená technická zařízení až po rozdíl mezi údržbářem, provozním elektrikářem a elektromontérem.',
  description:
    'Nábor elektrikářů – co dnes znamená „vyhláška 50“ a „paragraf 6“, proč se způsobilost váže na činnost a zařízení a co uvést v zadání, aby výběr dával smysl.',
  keywords: [
    'nábor elektrikářů',
    'odborná způsobilost v elektrotechnice',
    'vyhláška 50 nahrazena',
    'vyhrazená technická zařízení',
    'údržbář elektrikář',
    'elektromontér do výroby',
  ],
  intro:
    'Poptávka po elektrikáři se skoro vždy zasekne na stejném místě: v zadání stojí „paragraf 6“ nebo „vyhláška 50“, jenže tato označení pocházejí z předpisu, který už neplatí, a sama o sobě neříkají, co bude člověk dělat a na jakém zařízení. Odborná způsobilost v elektrotechnice se dnes řídí nařízením vlády č. 194/2022 Sb., které nahradilo vyhlášku č. 50/1978 Sb., a navazuje na zákon o vyhrazených technických zařízeních. Tato stránka vysvětluje, jak se v tom zorientovat jako zaměstnavatel, aniž bychom nahrazovali text předpisu – konkrétní stupně, lhůty a náležitosti patří do jeho aktuálního znění.',
  sections: [
    {
      heading: '„Vyhláška 50“ a „paragraf 6“: co ta slova dnes znamenají',
      body: [
        'Vyhláška č. 50/1978 Sb. platila desítky let a její číslování se vžilo natolik, že se dodnes používá na obou stranách – zaměstnavatel napíše do inzerátu „paragraf 6“ a kandidát v životopisu odpoví totéž. Odbornou způsobilost v elektrotechnice ale dnes upravuje nařízení vlády č. 194/2022 Sb., které tuto vyhlášku nahradilo. Hovorové označení tedy nemá oporu v platném předpisu a mezi starým a novým členěním nelze převádět mechanicky.',
        'Nařízení vlády rozlišuje několik stupňů odborné způsobilosti, které se odvíjejí od dosaženého odborného vzdělání, délky odborné praxe a složení zkoušky, a odlišuje mimo jiné práci pod dohledem, samostatnou činnost a řízení činnosti. Konkrétní vymezení jednotlivých stupňů, požadovanou praxi ani náležitosti dokladu zde záměrně necitujeme po jednotlivostech; patří do aktuálního znění nařízení a je namístě je ověřit přímo tam.',
        'Praktický postup pro nábor z toho vychází jednoduše: nespoléhejte na to, co je napsáno v inzerátu ani v životopisu, a vyžádejte si samotný doklad. Z něj je vidět, kdo jej vydal, na jakou činnost a na jaká zařízení se vztahuje a do kdy platí.',
      ],
    },
    {
      heading: 'Způsobilost se váže na činnost a na zařízení, ne jen na osobu',
      body: [
        'Doklad o odborné způsobilosti není univerzální průkaz. Rozhoduje kombinace tří věcí: jaká činnost se má vykonávat, na jakém zařízení a v jakém režimu. Jinou způsobilost předpokládá obsluha rozvaděče, jinou montáž a opravy, jinou práce na zařízení bez napětí a jinou práce v blízkosti částí pod napětím. Roli hraje i napěťová hladina – nízké napětí není totéž co vysoké.',
        'Zadání typu „hledáme elektrikáře s papíry“ proto výběru nedává žádnou oporu. Jakmile v poptávce zazní napěťová hladina, druh zařízení a činnost, začne být zřejmé, koho hledáte, a kandidát dokáže odpovědět, zda to jeho doklad pokrývá. Chrání to i vás: za to, jaká práce je pracovníkovi přidělena a zda na ni má potřebnou způsobilost, odpovídá zaměstnavatel, nikoli pracovník.',
      ],
      bullets: [
        'Napěťová hladina – nízké, vysoké, případně velmi vysoké napětí',
        'Druh zařízení – rozvaděče, elektrická výbava strojů, pohony, rozvody, fotovoltaika',
        'Činnost – obsluha, práce (montáž, opravy, údržba), revize, projektování',
        'Režim práce – bez napětí, v blízkosti částí pod napětím, práce pod napětím',
        'Míra samostatnosti – práce pod dohledem, samostatná činnost, nebo řízení činnosti',
      ],
    },
    {
      heading: 'Vyhrazená technická zařízení a co z toho plyne',
      body: [
        'Elektrická zařízení patří spolu se zdvihacími, tlakovými a plynovými mezi vyhrazená technická zařízení podle zákona č. 250/2021 Sb. Ten upravuje požadavky na jejich bezpečný provoz i na způsobilost osob a organizací, které na nich vykonávají činnost; nařízení vlády k odborné způsobilosti v elektrotechnice je jeho prováděcím předpisem.',
        'Pro zaměstnavatele z toho plynou dvě roviny, které se v poptávkách často zaměňují. První se týká osob – kdo smí co dělat. Druhá se týká organizace a zařízení – oprávnění k činnostem na vyhrazených zařízeních, revize a kontroly, dokumentace a lhůty. Revize je přitom samostatná činnost, kterou vykonává osoba s příslušným osvědčením; profil provozního elektrikáře ji zpravidla nezahrnuje, a pokud ji potřebujete pokrýt, patří do zadání výslovně.',
      ],
    },
    {
      heading: 'Údržbář-elektrikář, provozní elektrikář a elektromontér',
      body: [
        'Tři nejčastěji poptávané profily se liší povahou práce natolik, že se mezi sebou nezastupují. Údržbář-elektrikář hledá a odstraňuje poruchy na strojích za chodu výroby: čte schémata, orientuje se v periferii řídicích systémů, ve frekvenčních měničích, pohonech a snímačích a rozhoduje se pod tlakem prostoje. Klíčová je diagnostika, nikoli rutina.',
        'Provozní elektrikář se stará o elektrická zařízení areálu a jejich provoz – rozvody, rozvaděče, osvětlení, drobné úpravy, podklady k revizím a odstraňování zjištěných závad. Elektromontér naopak pracuje projektově: montuje kabelové trasy, osazuje a zapojuje rozvaděče, postupuje podle projektové dokumentace, často v týmu a na zakázkách mimo firmu. Každý z těchto profilů má jiný okruh kandidátů, a tedy i jinou obsaditelnost.',
      ],
      bullets: [
        'Údržbář-elektrikář – diagnostika poruch, čtení schémat, pohony a snímače, obvykle směnný provoz',
        'Provozní elektrikář – provoz a údržba zařízení areálu, podklady k revizím, odstraňování závad',
        'Elektromontér – montáže podle dokumentace, kabelové trasy a rozvaděče, práce na zakázkách',
        'Kombinaci rolí lze poptat, ale musí být uvedena v zadání i ve mzdovém zařazení',
      ],
    },
    {
      heading: 'Platnost dokladu, přezkoušení a zdravotní způsobilost',
      body: [
        'Doklad o odborné způsobilosti není trvalý. Předpis počítá s tím, že se způsobilost v daných intervalech ověřuje znovu, a doklad má omezenou platnost; konkrétní lhůty i podobu přezkoušení stanoví nařízení vlády a je namístě je ověřit v jeho aktuálním znění. Do personální evidence proto patří nejen kopie dokladu, ale i datum, kdy platnost končí – hlídat se to musí předem, ne až ve chvíli, kdy pracovník nesmí na zařízení.',
        'Vedle toho platí obvyklé nástupní povinnosti. U prací na elektrických zařízeních má zvláštní váhu zdravotní způsobilost posouzená v rámci pracovnělékařské prohlídky a důkladné seznámení s konkrétním pracovištěm a jeho riziky nad rámec obecného školení BOZP. Součástí bývá vybavení OOPP odpovídajícími dané práci a prostředí.',
        'U kandidáta s kvalifikací získanou v zahraničí je třeba počítat s tím, že doklad vydaný v jiné zemi se automaticky nepřebírá. Uznávání odborné kvalifikace získané v jiném členském státě Evropské unie, ve státě Evropského hospodářského prostoru nebo ve Švýcarsku upravuje zákon č. 18/2004 Sb.; u dokladů ze třetích zemí se postupuje jinak a postup se dále liší podle toho, o jakou činnost jde. Informace k uznávání zahraničního vzdělání zveřejňuje MŠMT. Tento krok se vyplatí zahájit dřív, než se s kandidátem domluvíte na termínu nástupu.',
      ],
    },
    {
      heading: 'Co uvést v poptávce, aby měl výběr smysl',
      body: [
        'Spolehlivou kontrolou zadání je otázka, zda by podle něj dokázal odpovědět elektrikář, který vaši firmu nezná. Pokud ano, výběrové řízení se nerozhodne až u kontroly dokladů před nástupem, ale mnohem dřív – a rovnou mezi kandidáty, kteří na danou práci skutečně mají způsobilost.',
        'Takto popsané zadání zároveň zrychlí předvýběr. Když víme, o jaké zařízení a jakou činnost jde, projdeme s kandidátem jeho doklad ještě před pohovorem a ověřujeme jej i totožnost podle originálů. Co dál z pohledu způsobilosti a oprávnění řešit, shrnuje samostatná stránka věnovaná odborné způsobilosti.',
      ],
      bullets: [
        'Napěťová hladina a druh zařízení, na kterých se bude pracovat',
        'Činnost a požadovaná míra samostatnosti, případně řízení činnosti',
        'Zda je součástí revizní činnost, nebo pouze příprava podkladů k revizím',
        'Prostředí a provoz – výrobní hala, areál, zakázky mimo firmu, směnnost či pohotovost',
        'Požadované doklady včetně jejich rozsahu a doby platnosti',
      ],
    },
  ],
  faq: [
    {
      q: 'Kandidát píše, že má „paragraf 6“. Co si z toho můžeme vzít?',
      a: 'Že se hlásí k některému ze stupňů dřívější vyhlášky č. 50/1978 Sb. Doklady se dnes vydávají podle nařízení vlády č. 194/2022 Sb., proto si vyžádejte samotný doklad a přečtěte z něj činnost, zařízení a platnost. Hovorové označení není podkladem pro přidělení práce.',
    },
    {
      q: 'Platí doklady vydané ještě podle staré vyhlášky?',
      a: 'Přechod mezi předpisy řeší přechodná ustanovení, jejichž znění je nutné ověřit v aktuálním textu zákona č. 250/2021 Sb. a nařízení vlády č. 194/2022 Sb. Vlastní znění zde neinterpretujeme; u konkrétního dokladu vycházejte z jeho obsahu a z data platnosti.',
    },
    {
      q: 'Jak poznáme, jaký stupeň způsobilosti potřebujeme?',
      a: 'Odvíjí se od činnosti, zařízení a míry samostatnosti, ne od názvu pozice. Popište, co se bude dělat, na čem, při jakém napětí a zda pod dohledem, samostatně, či s řízením dalších lidí; podle toho se stupeň určí podle nařízení vlády.',
    },
    {
      q: 'Potřebujeme údržbáře, nebo elektromontéra?',
      a: 'Jde-li o odstraňování poruch strojů za chodu výroby, hledáte údržbáře-elektrikáře a rozhoduje diagnostika a čtení schémat. Jde-li o montáž podle projektové dokumentace, hledáte elektromontéra. Profily se běžně nezastupují a mají odlišný okruh kandidátů.',
    },
    {
      q: 'Uvádíte mzdy elektrikářů?',
      a: 'Ne, mzdové údaje nevymýšlíme. Členěná data o výdělcích podle povolání zveřejňuje ISPV; aktuální obraz trhu práce MPSV, Úřad práce ČR a ČSÚ.',
    },
  ],
  sources: [
    SRC.nvElektrotechnika,
    SRC.zakonVyhrazenaZarizeni,
    SRC.zakonBozp,
    SRC.zakonPracovnelekarske,
    SRC.zakonikPrace,
    SRC.zakonUznavaniKvalifikace,
    SRC.msmt,
    SRC.ispv,
  ],
  internalLinks: [
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
    { href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' },
    { href: '/stavebni-profese', label: 'Stavební profese' },
    { href: '/pracovnici-pro-stavebnictvi', label: 'Pracovníci pro stavebnictví' },
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ── OPERATIONS ─────────────────────────────────────────

export const UDRZBA_A_TECHNICKY_SERVIS: SeoPage = {
  slug: 'udrzba-a-technicky-servis',
  breadcrumbLabel: 'Údržba a technický servis',
  eyebrow: 'Nábor · Údržba a servis',
  title: 'Údržba a technický servis: obsazování technických pozic',
  heroSubtitle:
    'Proč patří údržba k obtížně obsaditelným rodinám pozic, jaké role do ní spadají a které podmínky rozhodují – šíře kompetence, pohotovost a předávání směn.',
  description:
    'Údržba a technický servis – jak obsazovat údržbáře, mechaniky, seřizovače a servisní techniky: šíře kompetence, pohotovost, dokumentace a povýšení zevnitř.',
  keywords: ['údržba nábor', 'údržbář do výroby', 'mechanik údržby', 'seřizovač nábor', 'servisní technik', 'vedoucí údržby', 'elektromechanik'],
  intro:
    'Údržba je místo, kde se nedostatek lidí projeví rychle a draze: stroj stojí, plán se posouvá a operátoři čekají. Obsazuje se přitom jinak než výroba kolem ní – požadavek nezní na jednu dovednost, ale na kombinaci mechaniky, elektra, pneumatiky či hydrauliky a stále častěji i základní práce s řídicím systémem stroje. K tomu se přidávají podmínky, které kandidát váží dřív než náplň práce: pohotovost, dojezd a pokrytí směn. Tato stránka popisuje, co si u údržbářských a servisních pozic vyjasnit v zadání, jak posuzovat doklady o odborné způsobilosti a proč je povýšení operátora zevnitř plnohodnotnou cestou, ne nouzovým řešením.',
  sections: [
    {
      heading: 'Proč se údržba obsazuje hůř než okolní výroba',
      body: [
        'Operátora hledáte podle jedné hlavní schopnosti a doby zaučení. U údržby je zadání jiné: jeden člověk má na směně pokrýt různorodý strojní park a poradit si s mechanickou závadou, s pneumatikou nebo hydraulikou i s tím, co se děje v rozvaděči. V řadě provozů přibývá práce s řídicím systémem stroje – ne programování, ale schopnost poznat, zda je problém v čidle, v mechanice, nebo v programu.',
        'Šíře kompetence má i právní stránku. Zásah do elektrické části zařízení je vázán na odbornou způsobilost v elektrotechnice podle nařízení vlády č. 194/2022 Sb., které nahradilo dřívější vyhlášku č. 50/1978 Sb. a rozlišuje rozsah činností podle stupně způsobilosti. Část zařízení navíc spadá pod zákon č. 250/2021 Sb. o bezpečnosti práce v souvislosti s provozem vyhrazených technických zařízení, tedy zařízení tlakových, zdvihacích, elektrických a plynových. Rozsah dokladu kandidáta proto porovnávejte s tím, co má na pracovišti skutečně dělat.',
      ],
    },
    {
      heading: 'Role v údržbě a čím se od sebe liší',
      body: [
        'Názvy pozic se firma od firmy liší a samotný titul o obsahu práce mnoho neřekne. Užitečnější je popsat, kde končí odpovědnost dané role a kde začíná externí servis nebo dodavatel stroje.',
        'Nedorozumění vzniká hlavně mezi seřizovačem a údržbářem: seřizovač drží stroj v chodu mezi zakázkami a poměřuje se časem přestavby, údržbář odpovídá za technický stav zařízení v delším horizontu. Pokud obě role plní jeden člověk, uveďte to v zadání.',
      ],
      bullets: [
        'Údržbář – běžná preventivní a provozní údržba, výměny dílů, mazání, drobné opravy',
        'Mechanik – mechanické opravy a seřízení, ustavování, práce s dokumentací stroje',
        'Elektromechanik – zásahy do elektrické části v rozsahu své odborné způsobilosti',
        'Mechatronik – mechanika, elektro a řídicí systém dohromady, diagnostika složitějších závad',
        'Seřizovač – přestavby a nastavení strojů mezi zakázkami, náběh po přestavbě',
        'Servisní technik – zásahy u zákazníka nebo na více pracovištích, s cestováním',
        'Vedoucí údržby – plán oprav, odstávky, náhradní díly, dodavatelé a lidé',
      ],
    },
    {
      heading: 'Preventivní a reaktivní údržba: jiné zadání, jiný člověk',
      body: [
        'Provoz na plánované údržbě potřebuje disciplínu: dodržet plán, vést záznamy, hlídat náhradní díly a připravit odstávku dopředu. Provoz, kde se převážně hasí poruchy, potřebuje jinou povahu – rychlou diagnostiku pod tlakem, odvahu rozhodnout o provizorním řešení a odolnost vůči tomu, že telefon zazvoní v noci.',
        'Poměr mezi plánovanou a poruchovou prací patří k nejcennějším údajům, které v zadání můžete uvést. Když v nabídce chybí, riskujete rozchod už ve zkušební době: člověk nastoupil do plánované údržby a našel nepřetržité hašení poruch, nebo naopak.',
      ],
      bullets: [
        'Uveďte přibližný poměr plánované a poruchové práce',
        'Popište strojní park – typy zařízení, stáří, výrobce, jazyk dokumentace',
        'Vymezte, co řeší interní údržba a co externí servis',
        'Řekněte, zda se čeká zavádění preventivního plánu, nebo jen jeho plnění',
      ],
    },
    {
      heading: 'Pohotovost, dojezd a pokrytí směn',
      body: [
        'O přijetí nabídky tu často rozhoduje podmínka, která s odborností nesouvisí: jak často a v jakém režimu se drží pohotovost. Zákoník práce upravuje pracovní pohotovost jako dobu, kdy je zaměstnanec mimo rozvrh svých směn a na dohodnutém místě mimo pracoviště připraven k práci; musí být sjednána, náleží za ni odměna podle zákoníku práce a výkon práce v jejím průběhu nad stanovenou týdenní pracovní dobu je prací přesčas.',
        'Pro kandidáta je to zásah do soukromí, který posuzuje spolu s dojezdovou vzdáleností. Uveďte proto už v nabídce, jak často pohotovost vychází, mezi kolika lidmi rotuje a jaký dojezd očekáváte. Provoz, který má na nepřetržitý režim jediného údržbáře, bývá pro kandidáty těžko přijatelný a zůstává slabinou i po obsazení.',
      ],
      bullets: [
        'Kolik lidí se v pohotovosti střídá a jak je rozpis sestaven',
        'Očekávaný dojezd a zda je k dispozici vozidlo',
        'Zda lze část zásahů vyřešit vzdáleně nebo telefonicky',
        'Kdo drží pohotovost o svátcích a v době odstávek',
      ],
    },
    {
      heading: 'Dokumentace a předání mezi směnami',
      body: [
        'Údržba je role, kde se nepředává rozpracovaný kus, ale rozpracovaný stav stroje. Když člověk odejde ze směny s tím, že „to zatím jede na provizorku“, a nikde to není zapsané, ztráta se projeví až u další poruchy. Mezi ověřované schopnosti proto patří to, jak kandidát vede záznam o zásahu: co bylo příčinou, co vyměnil a co zůstalo dočasné.',
        'Část dokumentace je povinná. U vyhrazených technických zařízení upravuje zákon č. 250/2021 Sb. požadavky na kontroly, revize a odbornou způsobilost osob, které je provádějí; revizní činnost není totéž co běžná údržba a mělo by být předem jasné, kdo ji zajišťuje. Zaměstnavatel zároveň podle zákoníku práce a předpisů o BOZP odpovídá za bezpečný stav zařízení i za způsobilost zaměstnance pro danou práci, včetně pracovnělékařské prohlídky a poskytnutých OOPP.',
      ],
      bullets: [
        'Ptejte se na konkrétní situaci: jak předával rozdělanou opravu',
        'Zjistěte, v čem vedl záznamy – deník, systém údržby, tabulka',
        'Porovnejte rozsah dokladů o odborné způsobilosti s reálnou náplní práce',
      ],
    },
    {
      heading: 'Pasivní kandidáti a cesta zevnitř',
      body: [
        'Zkušený údržbář obvykle práci nehledá. Je zaměstnaný a nabídku posuzuje z pozice člověka, kterému nic nehoří. To mění celý proces: samotný inzerát zpravidla nestačí, roli hrají doporučení a přímé oslovení, výběr běží déle a nabídka musí být srozumitelná napoprvé.',
        'Druhá reálná cesta vede zevnitř. Operátor nebo seřizovač, který zná strojní park, technologii i lidi, má náskok, který zvenčí koupit nelze. Chybí mu doklad a systematika – a obojí je řešitelné: odbornou způsobilost v elektrotechnice lze získat postupem podle nařízení vlády č. 194/2022 Sb. a kompetence formalizovat profesní kvalifikací v Národní soustavě kvalifikací. Tato cesta ale potřebuje čas, mentora z údržby a pojmenované období, kdy člověk ještě nezasahuje sám.',
      ],
      bullets: [
        'Vybírejte podle zájmu o techniku, ne podle výkonu na lince',
        'Naplánujte kvalifikační cestu dřív, než pozici otevřete',
        'Určete, které zásahy smí dělat samostatně a od kdy',
        'Počítejte s tím, že jeho místo ve výrobě bude třeba obsadit',
      ],
    },
  ],
  faq: [
    { q: 'Jakou odbornou způsobilost potřebuje údržbář, který zasahuje do elektrické části stroje?', a: 'Požadavky stanoví nařízení vlády č. 194/2022 Sb., které nahradilo dřívější vyhlášku č. 50/1978 Sb. a rozlišuje rozsah činností podle stupně způsobilosti. Rozhodující je, aby rozsah dokladu odpovídal tomu, co má člověk skutečně dělat; u vyhrazených technických zařízení platí navíc úprava podle zákona č. 250/2021 Sb. Konkrétní zařazení ověřte podle platného znění.' },
    { q: 'Má být pohotovost uvedena už v inzerátu?', a: 'Ano. Pohotovost a dojezd patří k podmínkám, kvůli kterým kandidáti nabídku odmítají, a to obvykle až ve chvíli, kdy do výběru investovaly obě strany. Uvedení režimu, četnosti a způsobu odměňování předem výběr zkracuje.' },
    { q: 'Vyplatí se povýšit operátora do údržby?', a: 'Je to plnohodnotná cesta, pokud ji připravíte. Člověk z provozu zná strojní park i technologii a odpadá dlouhé seznamování. Potřebuje ale kvalifikační cestu (u elektra podle nařízení vlády č. 194/2022 Sb.), mentora a vymezené období, kdy zatím nezasahuje samostatně.' },
    { q: 'Proč na údržbářské pozice nereaguje inzerce?', a: 'Protože vhodní lidé zpravidla práci aktivně nehledají. U pasivních kandidátů rozhoduje doporučení, přímé oslovení a srozumitelnost nabídky, ne objem inzerce. Konkrétní dostupnost závisí na trhu práce a regionu.' },
    { q: 'Uvádíte mzdová rozpětí pro pozice v údržbě?', a: 'Ne, žádné částky ani rozpětí zde neuvádíme a nedovozujeme je. Úrovně výdělků podle povolání zveřejňuje Informační systém o průměrném výdělku (ISPV) a obsah jednotlivých povolání popisuje Národní soustava povolání. U údržby počítejte s tím, že odměna za pracovní pohotovost je podle zákoníku práce samostatné plnění vedle mzdy, a v nabídce je proto vhodné obojí odlišit.' },
  ],
  sources: [SRC.nvElektrotechnika, SRC.zakonVyhrazenaZarizeni, SRC.zakonikPrace, SRC.zakonBozp, SRC.nsk, SRC.nsp, SRC.ispv],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/nabor-elektrikaru', label: 'Nábor elektrikářů' },
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
    { href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' },
    { href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const POZICE_V_RIZENI_KVALITY: SeoPage = {
  slug: 'pozice-v-rizeni-kvality',
  breadcrumbLabel: 'Pozice v řízení kvality',
  eyebrow: 'Nábor · Kvalita',
  title: 'Pozice v řízení kvality: kontrola, metrologie a audity',
  heroSubtitle:
    'Jak specifikovat a obsazovat role v kvalitě – od kontrolora přes metrologa po manažera kvality. Měřicí kompetence, dokumentace a nezávislost útvaru jako hlavní osy výběru.',
  description:
    'Pozice v řízení kvality – kontrolor, technik kvality, metrolog, inženýr i manažer kvality: jak je specifikovat, co ověřovat u měření a proč zde váží obor.',
  keywords: ['pozice v řízení kvality', 'kontrolor kvality', 'technik kvality', 'metrolog', 'inženýr kvality', 'manažer kvality', 'nábor do kvality'],
  intro:
    'Zadání na pozici „do kvality“ patří k nejméně přesným, se kterými se v náboru pracuje. Pod stejným označením se skrývá člověk, který třídí díly u linky, i člověk, který vede zákaznický audit – a mezi nimi leží několik úrovní kompetence, jiná odpovědnost i jiný okruh kandidátů. Tato stránka rozkládá řízení kvality na role, které se ve výrobních provozech skutečně obsazují, a popisuje, co u nich ověřovat: schopnost měřit a číst výkres, práci s kalibrací a dokumentací, zvládnutí reklamací a rozsah pravomoci zastavit dodávku. Systémové standardy zde uvádíme tak, jak je formulují zaměstnavatelé ve svém zadání.',
  sections: [
    {
      heading: 'Žebříček rolí od kontroly po řízení',
      body: [
        'Role v kvalitě tvoří poměrně jasnou posloupnost a vyplatí se vědět, na které příčce zadání skutečně je. Rozdíl mezi sousedními stupni není v pracovitosti, ale v tom, co člověk rozhoduje a jaké výstupy po něm zůstávají.',
        'V menších provozech se stupně slévají a jeden člověk dělá kontrolu, metrologii i reklamace. To je legitimní, ale v zadání to musí zaznít – jinak přicházejí kandidáti z jedné příčky a firma přitom očekává člověka, který pokryje tři příčky najednou.',
      ],
      bullets: [
        'Kontrolor kvality – měření a vizuální kontrola podle kontrolního plánu, záznam výsledků, blokace neshodných kusů',
        'Technik kvality – kontrolní návodky, řešení neshod v provozu, komunikace s výrobou a dodavatelem',
        'Metrolog – správa měřidel, kalibrace a návaznost, metrologický řád firmy',
        'Inženýr kvality – uvolňování vzorků a procesů, analýzy příčin, zákaznická komunikace',
        'Manažer kvality – útvar, systém, audity a zastupování firmy vůči zákazníkovi',
      ],
    },
    {
      heading: 'Měřicí kompetence jako hlavní osa výběru',
      body: [
        'Rozdíly mezi kandidáty se spolehlivě ukážou u měření. Posuvné měřítko a mikrometr zvládne po zaučení téměř každý; rozdíl je v tom, zda člověk přečte výkres včetně tolerancí a geometrických specifikací, vybere ke kótě vhodné měřidlo a pozná, kdy daná přesnost nestačí a je třeba jít na souřadnicový měřicí stroj.',
        'Praktická zkouška je krátká a přesvědčivá: dejte kandidátovi výkres a díl a nechte ho popsat, čím a jak by kótu měřil a co udělá s výsledkem na hranici tolerance. Odpověď „změřím a zapíšu“ a odpověď, která zmíní opakovatelnost měření i stav měřidla, popisují dvě různé úrovně.',
      ],
      bullets: [
        'Čtení výkresu včetně tolerancí a geometrických specifikací',
        'Volba měřidla podle požadované přesnosti',
        'Práce s kalibrovaným měřidlem a kalibračním listem',
        'Zkušenost se souřadnicovým měřením a vyhodnocením protokolu',
        'Postup při hraničním a neshodném výsledku',
      ],
    },
    {
      heading: 'Kalibrace a rámec zákona o metrologii',
      body: [
        'Metrologická část role stojí na tom, aby výsledek měření někdo dokázal obhájit. Zákon č. 505/1990 Sb. o metrologii vymezuje členění měřidel a u tzv. stanovených měřidel vyžaduje ověření; to je podle tohoto zákona svěřeno státní metrologii a autorizovaným subjektům, nikoli podnikovému metrologovi. Ostatní pracovní měřidla firma udržuje kalibrací podle vlastního metrologického řádu a lhůt, které si stanoví.',
        'Pro nábor z toho plyne konkrétní otázka do zadání: má firma stanovená měřidla, kdo vede jejich evidenci a kdo odpovídá za lhůty. Konkrétní zařazení měřidel a povinnosti ověřte podle platného znění zákona a navazujících předpisů.',
      ],
    },
    {
      heading: 'Systémové standardy, jak je zaměstnavatelé zadávají',
      body: [
        'V zadání se pravidelně objevují systémové normy a standardy: ISO 9001 jako obecný rámec systému managementu kvality, IATF 16949 u dodavatelů do automobilového průmyslu a HACCP jako systém pro bezpečnost potravin v potravinářské výrobě. Popisujeme je jako požadavky, které zaměstnavatelé uvádějí, nikoli jako certifikace držené agenturou práce.',
        'Pro profil kandidáta je podstatné, co z požadavku plyne prakticky: znalost dokumentace a záznamů, zkušenost s interním nebo zákaznickým auditem a schopnost obhájit postup před auditorem. Pokud firma certifikaci teprve připravuje, jde o jiné zadání než udržování zavedeného systému – a hledá se jiný člověk.',
      ],
      bullets: [
        'Uveďte, zda systém běží, zavádí se, nebo se obnovuje',
        'Rozlište zkušenost auditovaného a zkušenost interního auditora',
        'Řekněte, kdo vede dokumentaci a kdo jedná se zákazníkem',
        'U potravinářské výroby popište, jak jsou nastaveny hygienické záznamy',
      ],
    },
    {
      heading: 'Reklamace, 8D a každodenní dokumentace',
      body: [
        'Denní práce v kvalitě není měření, ale psaní. Kontrolní záznamy, protokoly, uvolnění dávky, blokace, popis neshody a odpovědi na reklamace tvoří většinu výstupu – a jsou tím, co po firmě zůstane, když se problém řeší zpětně po měsících.',
        'Zákaznické reklamace mají v dodavatelských řetězcích ustálenou strukturu; v automobilovém průmyslu se běžně požaduje forma 8D s okamžitým opatřením, analýzou příčiny a ověřením účinnosti. Ověřit to lze jednoduše: nechte kandidáta popsat jednu reklamaci, kterou vedl od přijetí po uzavření, a poslouchejte, zda rozliší příčinu od projevu a zda umí říct, jak si ověřil, že opatření zabralo.',
      ],
      bullets: [
        'Požádejte o popis jedné reklamace vedené od začátku do konce',
        'Ptejte se na rozdíl mezi okamžitým opatřením a odstraněním příčiny',
        'Ověřte srozumitelnost písemného projevu, ideálně na krátkém úkolu',
      ],
    },
    {
      heading: 'Nezávislost kvality a proč zde váží obor',
      body: [
        'Kvalita plní svou funkci jen tehdy, když člověk, který zastaví dávku, není hodnocen podle výkonu směny, kterou zastavuje. Před otevřením pozice proto vyjasněte, komu role podléhá, jaké rozhodnutí smí udělat sama a kdo rozhoduje ve sporu s výrobou. Kandidáti se na to ptají a vyhýbavá odpověď je pro zkušené lidi varovný signál.',
        'Obor tu váží víc než u ostatních technických pozic. Automobilový dodavatel pracuje s jinou dokumentační kulturou a jiným tempem eskalace než potravinářská výroba, kde vedle měření vstupuje hygiena, sledovatelnost šarže a smyslové posouzení. Přechod mezi obory je možný, znamená ale období, kdy člověk zná metodu a učí se prostředí. U kandidátů se zahraničním vzděláním si předem vyjasněte, zda a v jaké formě uznání vzdělání požadujete; rámec popisuje MŠMT a zákon o uznávání odborné kvalifikace.',
      ],
    },
  ],
  faq: [
    { q: 'Jaký je rozdíl mezi kontrolorem a technikem kvality?', a: 'Kontrolor měří a kontroluje podle daného kontrolního plánu a zaznamenává výsledky. Technik kvality kontrolní postupy připravuje, řeší neshody v provozu a komunikuje s výrobou i dodavatelem. Rozdíl je v tom, kdo pravidla tvoří a kdo je plní; podle toho se liší i okruh kandidátů.' },
    { q: 'Musí mít podnikový metrolog zvláštní oprávnění?', a: 'Zákon č. 505/1990 Sb. o metrologii vymezuje členění měřidel a u stanovených měřidel vyžaduje ověření, které je svěřeno státní metrologii a autorizovaným subjektům, nikoli podnikovému metrologovi. Interní metrolog obvykle odpovídá za evidenci měřidel, kalibrační lhůty a metrologický řád firmy. Konkrétní povinnosti ověřte podle platného znění.' },
    { q: 'Požadujeme zkušenost s IATF 16949 – co to znamená pro zadání?', a: 'Uveďte, zda systém u vás běží, zavádí se, nebo se obnovuje, a zda hledáte člověka auditovaného, nebo interního auditora. Standardy tohoto typu zmiňujeme jako požadavky zaměstnavatelů, nejde o certifikace držené agenturou práce. Prakticky z nich plyne nárok na práci s dokumentací, záznamy a audity.' },
    { q: 'Proč trváte na vyjasnění, komu kvalita podléhá?', a: 'Protože pravomoc zastavit dávku je jádrem role. Pokud je kontrola hodnocena podle výstupu směny, dostává se do konfliktu zájmů a zkušení kandidáti to poznají už na pohovoru. Vymezení nadřízenosti a rozsahu rozhodování patří do zadání, ne až k nástupu.' },
    { q: 'Uvádíte mzdová rozpětí pro pozice v kvalitě?', a: 'Ne, konkrétní částky na této stránce nenajdete. Údaje o výdělcích podle povolání zveřejňuje Informační systém o průměrném výdělku (ISPV), požadavky povolání popisuje Národní soustava povolání a standardy profesních kvalifikací Národní soustava kvalifikací. V kvalitě navíc rozhoduje, na které příčce žebříčku role skutečně stojí – proto začněte vymezením role, ne úvahou o částce.' },
  ],
  sources: [SRC.zakonMetrologie, SRC.zakonUznavaniKvalifikace, SRC.msmt, SRC.nsp, SRC.nsk, SRC.ispv],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/automobilovy-prumysl-pracovnici', label: 'Pracovníci v automobilovém průmyslu' },
    { href: '/pracovnici-pro-potravinarskou-vyrobu', label: 'Pracovníci pro potravinářskou výrobu' },
    { href: '/thp-pozice', label: 'THP pozice' },
    { href: '/pracovnici-pro-automotive', label: 'Pracovníci pro automotive' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const MISTRI_A_VEDOUCI_SMEN: SeoPage = {
  slug: 'mistri-a-vedouci-smen',
  breadcrumbLabel: 'Mistři a vedoucí směn',
  eyebrow: 'Nábor · Provozní vedení',
  title: 'Mistři a vedoucí směn: povýšit zevnitř, nebo najmout zvenčí',
  heroSubtitle:
    'Srovnání obou cest u první linie vedení – co získáte povýšením operátora, co přinese člověk zvenčí a co je u této role potřeba skutečně ověřit.',
  description:
    'Mistři a vedoucí směn – povýšit zevnitř, nebo najmout zvenčí: co která cesta stojí, co u kandidáta ověřovat a proč tato role rozhoduje o stabilitě celé směny.',
  keywords: ['mistr ve výrobě', 'vedoucí směny', 'nábor mistra', 'první linie vedení', 'povýšení operátora', 'obsazení pozice mistra'],
  intro:
    'Pozice mistra nebo vedoucího směny se obvykle otevírá ve chvíli, kdy je zle: někdo odešel, směna se rozpadá a rozhodnutí padá mezi dvě možnosti – povýšit zkušeného člověka z provozu, nebo hledat zvenčí. Obě cesty mají odlišnou cenu i odlišné riziko a ani jedna není správná univerzálně. Tato stránka obě varianty srovnává bez příkras, popisuje, co u první linie vedení skutečně ověřovat, a věnuje se tomu, co povýšený mistr potřebuje v prvních měsících, aby firma nepřišla o dobrého operátora a zároveň nezískala nefunkčního vedoucího.',
  sections: [
    {
      heading: 'Čtyři úlohy najednou: co role obnáší',
      body: [
        'Mistr nebo vedoucí směny drží ve stejnou chvíli čtyři věci: lidi, plán, kvalitu a bezpečnost. Během jedné směny přepíná mezi rozdělením lidí na pozice, reakcí na výpadek stroje nebo absenci, rozhodnutím o neshodném kusu a dohledem nad tím, že se pracuje bezpečně a v předepsaných OOPP. Popis pozice, který říká pouze „řízení směny“, kandidátovi nesděluje nic a firmě neposlouží při výběru.',
        'Bezpečnostní část není doplněk. Zákoník práce řadí péči o bezpečnost a ochranu zdraví při práci mezi nedílné součásti pracovních povinností vedoucích zaměstnanců na všech stupních řízení; dodržování povinností v této oblasti kontroluje inspekce práce. Rozsah odpovědnosti mistra proto vymezte písemně, ne ústně při předání funkce.',
      ],
      bullets: [
        'Lidé – obsazení pozic na směně, zaučování, konflikty, hodnocení',
        'Plán – průchodnost, priority, reakce na výpadky a absence',
        'Kvalita – rozhodnutí o neshodě, eskalace, spolupráce s kontrolou',
        'BOZP – dohled nad bezpečným postupem, OOPP, hlášení incidentů',
      ],
    },
    {
      heading: 'Povýšit zevnitř: co získáte a co bude chybět',
      body: [
        'Člověk z provozu přináší to, co se nedá koupit: zná technologii, strojní park, zvyky směny i místa, kde se obvykle stane chyba. Nepotřebuje měsíce na pochopení produktu a lidé ho berou jako někoho, kdo ví, o čem mluví. Tam, kde jde především o kontinuitu, je to zásadní výhoda.',
        'Chybí mu ale zpravidla to druhé: vést lidi, se kterými byl včera na stejné pozici. Znamená to zvládnout nepříjemný rozhovor, rozdělit nepopulární práci, říct ne kamarádovi a udržet odstup, aniž by se ze vztahů stala formalita. K tomu přibývá plánování za horizont jedné směny a práce s výkazy. Výborný operátor není automaticky dobrý vedoucí a povýšení bez přípravy může firmu připravit o obojí.',
      ],
    },
    {
      heading: 'Najmout zvenčí: co přinese a co to bude stát',
      body: [
        'Člověk zvenčí přináší metodu a srovnání. Viděl jiné uspořádání směn, jinou práci s odchylkami, jiný způsob vedení porady – a není zatížen historií vztahů na dílně. Pokud je cílem změnit způsob vedení, ne jen zaplnit místo v rozpisu, bývá tato cesta účinnější.',
        'Cenou je čas a legitimita. Bez znalosti technologie a produktu nemůže první týdny rozhodovat sám a směna ho zkouší – zejména pokud na jeho místo aspiroval někdo zevnitř. Rozhoduje se v prvních týdnech: kdo ho uvede, jaká rozhodnutí smí dělat hned, kdo je jeho oporou při první konfliktní situaci a kdy dostane zpětnou vazbu. Bez toho hrozí odchod ještě ve zkušební době a výběr začíná znovu.',
      ],
    },
    {
      heading: 'Co u této role opravdu ověřovat',
      body: [
        'Sebehodnocení tu neposlouží – téměř každý kandidát o sobě řekne, že umí vést lidi. Použitelné jsou konkrétní situace z jeho praxe a otázka, co udělal, nikoli co si o vedení myslí.',
        'Velikost týmu uvádějte v zadání číslem z vlastního provozu: vedení pěti lidí a vedení padesáti jsou dvě různé práce, i když se pozice jmenuje stejně. Doplňte směnný režim, komu role podléhá a jaká rozhodnutí dělá bez konzultace.',
      ],
      bullets: [
        'Kolik lidí přímo vedl, na jaké směně a v jakém provozu',
        'Jak předával směnu a co konkrétně předával dál',
        'Co udělal, když ráno chyběli dva lidé a plán zůstal stejný',
        'Kdy volal nadřízenému a co rozhodl sám',
        'Jak řešil konflikt mezi dvěma lidmi na směně',
        'Jak se zachoval, když kontrola zastavila dávku uprostřed směny',
      ],
    },
    {
      heading: 'Proč tato role rozhoduje o stabilitě směny',
      body: [
        'První linie vedení je místo, kde se každodenně rozhoduje, jestli lidé zůstanou. Nadřízený určuje, jak se s nováčkem mluví první den, zda si někdo všimne, že se člověku nedaří, jak se rozdělí přesčas a jestli se stížnost někam dostane. Obsazení této role se proto do stability celé směny promítá zpravidla silněji než obsazení jednotlivé dělnické pozice.',
        'Adaptaci nového pracovníka na směně přitom v praxi vede právě tento člověk, i když je proces popsán jinak. Pokud tedy řešíte odchody v prvních týdnech, je mistr to první, u čeho začít, dřív než sáhnete k plošným opatřením. Souvislostem se věnují navazující stránky o příčinách fluktuace, retenci a adaptaci.',
      ],
    },
    {
      heading: 'Příprava povýšeného mistra',
      body: [
        'Povýšení není okamžik, ale období. Nový mistr potřebuje vědět, co rozhoduje sám a co ne, mít v prvních týdnech dostupného nadřízeného, projít školením k povinnostem vedoucího zaměstnance včetně BOZP a mít formát, ve kterém předává směnu. Užitečné je také směně dopředu říct, proč byl vybrán – nevyřčené povýšení si tým vyloží po svém.',
        'Součástí poctivé přípravy je i cesta zpět. Domluvte předem, co se stane, pokud role nesedne: návrat na původní pozici bez ostudy je pro obě strany lepší než setrvávání ve funkci, kterou člověk nechce. Právě tato varianta zvyšuje ochotu lidí do povýšení vůbec jít.',
      ],
      bullets: [
        'Písemně vymezený rozsah rozhodování a odpovědnosti',
        'Školení k povinnostem vedoucího zaměstnance, včetně BOZP',
        'Dostupný nadřízený a domluvené kontrolní body',
        'Jasný formát předání směny',
        'Předem dohodnutá varianta návratu na původní pozici',
      ],
    },
  ],
  faq: [
    { q: 'Je lepší povýšit zevnitř, nebo najmout zvenčí?', a: 'Univerzální odpověď neexistuje. Povýšení zevnitř vyhrává tam, kde jde o kontinuitu a znalost technologie; nábor zvenčí tam, kde chcete změnit způsob vedení. Liší se i riziko: u povýšení riskujete ztrátu dobrého operátora, u externího nástupu období, kdy člověk ještě nemůže rozhodovat sám.' },
    { q: 'Co má být v zadání pozice mistra?', a: 'Počet přímo vedených lidí, směnný režim, typ provozu a technologie, komu role podléhá, jaká rozhodnutí dělá samostatně a kdo provádí hodnocení. Bez těchto údajů přicházejí kandidáti z nesrovnatelně odlišných provozů a výběr se protahuje.' },
    { q: 'Jak ověřit, že kandidát skutečně vedl lidi?', a: 'Ptejte se na konkrétní situace – předání směny, reakci na dva chybějící lidi při nezměněném plánu, konflikt na směně, moment, kdy volal nadřízenému. Popis toho, co člověk udělal, rozliší kandidáty spolehlivěji než obecné otázky na styl vedení.' },
    { q: 'Nese mistr odpovědnost za BOZP?', a: 'Zákoník práce řadí péči o bezpečnost a ochranu zdraví při práci mezi nedílné součásti pracovních povinností vedoucích zaměstnanců na všech stupních řízení. Konkrétní rozsah odpovědnosti je vhodné vymezit písemně; dodržování povinností v této oblasti kontroluje inspekce práce.' },
    { q: 'Uvádíte mzdová rozpětí pro mistry a vedoucí směn?', a: 'Ne, mzdové údaje si nedovozujeme a na stránce je neuvádíme. Podklady k výdělkům podle povolání spravuje Informační systém o průměrném výdělku (ISPV), popis požadavků povolání Národní soustava povolání. U první linie vedení je vedle výdělku podstatné i to, jaká rozhodovací pravomoc je s rolí spojena – kandidáti obojí posuzují společně.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonBozp, SRC.zakonInspekcePrace, SRC.suip, SRC.nsp, SRC.ispv],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/thp-pozice', label: 'THP pozice' },
    { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    { href: '/priciny-fluktuace-zamestnancu', label: 'Příčiny fluktuace zaměstnanců' },
    { href: '/vyrobni-zamestnanci', label: 'Výrobní zaměstnanci' },
    { href: '/adaptace-zamestnancu', label: 'Adaptace zaměstnanců' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ── SOURCING ───────────────────────────────────────────

export const ODBORNE_POZICE_V_LOGISTICE: SeoPage = {
  slug: 'odborne-pozice-v-logistice',
  breadcrumbLabel: 'Odborné pozice v logistice',
  eyebrow: 'Odborné pozice · Logistika',
  title: 'Odborné pozice v logistice: plánování, dispečink a řízení skladu',
  heroSubtitle:
    'Vrstva nad provozem – dispečink, plánování dopravy, vedení skladu, zásobování a celní agenda. Co u těchto rolí skutečně ověřovat a proč je jich na trhu málo.',
  description:
    'Odborné pozice v logistice – dispečer, plánovač dopravy, vedoucí skladu, specialista zásobování i celní deklarant: co ověřovat a proč je tato vrstva tenká.',
  keywords: [
    'odborné pozice v logistice',
    'nábor dispečera',
    'plánovač dopravy',
    'vedoucí skladu nábor',
    'specialista WMS',
    'celní deklarant',
    'vedoucí směny skladu',
  ],
  intro:
    'Většina náborových textů o logistice popisuje provozní vrstvu – lidi, kteří zboží fyzicky přijmou, uskladní, vychystají a vypraví. Nad ní ale stojí podstatně tenčí vrstva odborných rolí, které rozhodují o tom, co se kdy a kam pohne: dispečink, plánování dopravy, řízení skladu, zásobování a celní agenda. Tyto pozice se obsazují jinak než provozní směny. Rozhoduje u nich znalost konkrétních systémů, schopnost plánovat v podmínkách, které se mění během dne, a odpovědnost za rozhodnutí, jehož cena se ukáže až s odstupem. Tato stránka popisuje, co u této vrstvy ověřovat a proč je její obsazení jiný úkol než nábor do provozu.',
  sections: [
    {
      heading: 'Kde končí provozní vrstva a kde začíná odborná',
      body: [
        'Hranici je užitečné vést podle toho, kdo plán vykonává a kdo ho tvoří. Skladník, manipulační pracovník, pracovník vychystávání nebo expedice pracují podle zadání, které jim systém a směna přinesou. Dispečer, plánovač nebo vedoucí skladu toto zadání sestavují, mění ho v průběhu dne a nesou jeho důsledky. Provozním rolím se věnují samostatné stránky Logističtí pracovníci a Pracovníci do logistiky; tato stránka se zabývá výhradně vrstvou nad nimi.',
        'Rozdíl se projeví hned při zadání pozice. U provozní role stačí popsat pracoviště, směnný režim a fyzické nároky. U odborné role je nutné popsat odpovědnost: jaký objem, kolik lidí, jaké systémy, jaká rozhodovací pravomoc a co se má stát ve chvíli, kdy se plán rozejde se skutečností.',
      ],
    },
    {
      heading: 'Které role tuto vrstvu tvoří',
      body: [
        'Označení se firma od firmy liší, obsah rolí se ale opakuje. Při zadání je proto lepší popsat odpovědnost než název – stejný titul znamená v malém skladu a v distribučním centru něco jiného. Popisy povolání a jejich obvyklé požadavky vede Národní soustava povolání a je vhodným výchozím bodem, pokud si potřebujete zadání ujasnit.',
      ],
      bullets: [
        'Dispečer – řídí denní tok vozidel a zásilek a rozhoduje v reálném čase, když plán přestane platit',
        'Plánovač dopravy – sestavuje trasy a jízdy, sdružuje objednávky a hlídá vytížení i návaznost na časová okna',
        'Koordinátor expedice – drží návaznost mezi vychystáním, kontrolou a odbavením dopravce',
        'Vedoucí směny skladu – odpovídá za obsazení směny, tempo, kvalitu a předání směně následující',
        'Vedoucí skladu – odpovídá za provoz jako celek: kapacitu, zásobu, techniku, lidi a náklady',
        'Specialista zásobování – hlídá dostupnost materiálu nebo zboží, objednací hladiny a komunikaci s dodavateli',
        'Celní deklarant – připravuje a podává celní doklady a hlídá režimy u zásilek mimo unijní celní území',
        'Specialista WMS – spravuje skladový systém, jeho procesy, kmenová data a výstupy pro řízení',
      ],
    },
    {
      heading: 'Práce se systémy jako skutečné kritérium výběru',
      body: [
        'U této vrstvy je práce se systémy jedním z mála kritérií, která lze při výběru poctivě ověřit. Nejde přitom o značku WMS nebo ERP uvedenou v životopise. Rozhodující je hloubka: jiná je práce člověka, který v systému pouze potvrzuje úkoly, a člověka, který zakládá kmenová data, nastavuje pravidla zaskladnění, řeší rozdíly v zásobě a umí ze systému dostat použitelný podklad pro rozhodnutí.',
        'Ověřuje se to otázkami na situace, ne na názvy modulů. Přenositelnost mezi systémy bývá u zkušeného člověka vysoká, pokud rozumí logice procesu; naopak znalost jednoho konkrétního systému bez pochopení procesu se v inzerátech přeceňuje a zbytečně zužuje okruh kandidátů.',
      ],
      bullets: [
        'Co v systému dělal sám a co po něm dělal někdo jiný',
        'Jak řešil rozdíl mezi systémovým a fyzickým stavem zásoby a kdo korekci schvaloval',
        'Jakou roli měl při inventuře a co se po ní měnilo',
        'Jaká data ze systému pravidelně sledoval a jaké rozhodnutí podle nich dělal',
        'Zda prošel zavedením nebo úpravou systému a co konkrétně měl na starosti',
      ],
    },
    {
      heading: 'Celní agenda a zásilky mimo unijní celní území',
      body: [
        'Část logistických provozů se bez celní agendy obejde, část na ní stojí. Pokud zboží překračuje hranici unijního celního území, potřebujete člověka, který umí připravit a podat celní doklady, pracovat s celními režimy a zastupováním v celním řízení a hlídat návaznou dokumentaci. Tato kompetence bývá úzce vázaná na konkrétní typ zboží a na směr toku, což okruh vhodných lidí dále zužuje.',
        'Konkrétní podmínky, rozsah zastupování, lhůty ani poplatky zde neuvádíme – celní pravidla vycházejí z unijní úpravy a jejího českého provedení a ověřují se u celní správy. Pro zadání pozice je podstatné popsat, jaké režimy a jaké směry toku bude člověk skutečně řešit; bez toho nelze životopisy rozumně porovnat.',
      ],
    },
    {
      heading: 'Plánování za nestability a rozhraní s provozem',
      body: [
        'Plánovací role se v logistice liší od plánování ve výrobě tím, jak rychle se mění vstupy: zpožděná dodávka, odřeknutý dopravce, chybějící lidé na směně, mimořádná objednávka. Kvalifikace se tu neprojeví na klidném dni, ale ve chvíli, kdy plán přestane platit. Při výběru proto stojí za to nechat kandidáta popsat konkrétní den, kdy se plán rozpadl: co udělal jako první, koho informoval, čeho se vzdal a podle čeho se rozhodl.',
        'Druhou polovinou role je rozhraní s provozem. Dispečer i vedoucí směny stojí mezi plánem a lidmi, kteří ho vykonávají, a zadání musí být srozumitelné pro směnu pracující ve vysokém tempu, jejíž část nastoupila nedávno. Vedoucí směny bývá navíc v postavení vedoucího zaměstnance ve smyslu zákoníku práce – tedy tam, kde mu jsou podřízeni další zaměstnanci, jimž zadává a organizuje práci; s tímto postavením je spojena i odpovědnost za dodržování pravidel BOZP na svěřeném úseku. To je jiná odpovědnost než koordinace a je vhodné ji v profilu pojmenovat.',
      ],
    },
    {
      heading: 'Proč je tato vrstva na trhu tenká',
      body: [
        'Provozních rolí bývá v každém skladu mnoho, odborných jen několik – vedení skladu, dispečink, plánování, správa systému. Kompetence navíc vzniká dlouhodobě uvnitř konkrétního provozu, nikoli ve škole, takže lidé, kteří ji mají, obvykle práci nehledají a na inzerát nereagují. Konkrétní čísla o dostupnosti těchto profesí zde neuvádíme; údaje o trhu práce zveřejňují MPSV, Úřad práce ČR a ČSÚ.',
        'Reálné cesty jsou proto dvě a obvykle se kombinují: povýšení zevnitř z provozní vrstvy a oslovení lidí, kteří dnes pracují jinde. U povýšení zevnitř rozhoduje, zda dokážete člověku dát čas a oporu na to, co dosud nedělal – plánování, jednání s dopravci, vedení lidí. Formální doplnění kvalifikace umožňuje systém profesních kvalifikací, jehož standardy vede Národní soustava kvalifikací.',
        'Mzdové rozpětí neodhadujte a nepřebírejte je z inzerátů ostatních firem. Veřejně dostupná data o výdělcích podle profesí poskytuje ISPV; tato stránka žádné částky neuvádí.',
      ],
    },
  ],
  faq: [
    {
      q: 'Čím se odborné pozice v logistice liší od skladových rolí?',
      a: 'Provozní role plán vykonávají, odborné ho tvoří a mění. Z toho plyne jiná odpovědnost, jiné kritérium výběru (systémy, plánování, vedení lidí) i jiný způsob hledání kandidátů. Provozním rolím se věnují samostatné stránky o pracovnících do logistiky a o logistických pracovnících.',
    },
    {
      q: 'Má smysl vyžadovat konkrétní systém WMS?',
      a: 'Obvykle ne jako tvrdou podmínku. Podstatnější je hloubka práce se systémem a pochopení procesu, které je mezi systémy přenositelné. Konkrétní značka jako povinný požadavek zužuje okruh kandidátů víc, než kolik přinese.',
    },
    {
      q: 'Kdy potřebujeme vlastního celního deklaranta?',
      a: 'Tehdy, když zboží překračuje hranici unijního celního území a agendu neřeší externí zástupce. Rozsah role popište podle režimů a směrů toku, které skutečně máte. Konkrétní celní pravidla a podmínky zastupování ověřujte u celní správy; zde je neuvádíme.',
    },
    {
      q: 'Vyplatí se povýšit vedoucího směny z vlastních lidí?',
      a: 'Často ano, protože zná provoz i lidi. Počítejte ale s tím, že plánování, jednání s dopravci a vedení lidí jsou nové dovednosti, které potřebují čas a oporu. Bez připraveného zaškolení se povýšení často vrací zpět.',
    },
    {
      q: 'Uvádíte mzdy pro tyto pozice?',
      a: 'Ne. Žádné částky ani rozpětí zde neuvádíme. Pro mzdové srovnání podle profesí a kvalifikace použijte ISPV; ostatní údaje o trhu práce zveřejňují MPSV, Úřad práce ČR a ČSÚ.',
    },
  ],
  sources: [SRC.nsp, SRC.nsk, SRC.ispv, SRC.zakonikPrace, SRC.mpsv, SRC.upcr, SRC.czso],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    { href: '/logisticti-pracovnici', label: 'Logističtí pracovníci' },
    { href: '/pracovnici-pro-distribucni-centra', label: 'Pracovníci pro distribuční centra' },
    { href: '/thp-pozice', label: 'THP pozice' },
    { href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRIME_OSLOVENI_KANDIDATU: SeoPage = {
  slug: 'prime-osloveni-kandidatu',
  breadcrumbLabel: 'Přímé oslovení kandidátů',
  eyebrow: 'Nábor · Vyhledávání kandidátů',
  title: 'Přímé oslovení kandidátů: jak funguje aktivní vyhledávání',
  heroSubtitle:
    'Proč na inzerát odpovídají jen lidé, kteří právě hledají, co obnáší aktivní vyhledávání v praxi a co k němu musí dodat zaměstnavatel, aby mělo smysl.',
  description:
    'Přímé oslovení kandidátů – rozdíl mezi aktivním a pasivním kandidátem, jak probíhá aktivní vyhledávání, diskrétnost, práce s údaji a co dodává zaměstnavatel.',
  keywords: [
    'přímé oslovení kandidátů',
    'aktivní vyhledávání kandidátů',
    'pasivní kandidát',
    'oslovení kandidátů',
    'nábor odborných pozic',
    'vyhledávání kandidátů na odborné pozice',
  ],
  intro:
    'Zaměstnavatelé, kterým visí odborná pozice měsíce, popisují většinou stejnou zkušenost: inzerát běží, reakce chodí, ale ne od lidí s hledanou kompetencí. Důvod bývá prostý – člověk, který tu práci umí, ji nejspíš právě dělá a nikde nehledá. Přímé oslovení, tedy aktivní vyhledávání, je odpovědí na tuto situaci: místo čekání na reakci se hledá, kde daná kompetence vzniká, a vhodné lidi oslovujeme přímo. Tato stránka popisuje, jak takový postup vypadá krok za krokem, co je na něm pro obě strany nepříjemné a co musí dodat zaměstnavatel, aby oslovení mělo šanci uspět.',
  sections: [
    {
      heading: 'Aktivní a pasivní kandidát: proč to není totéž',
      body: [
        'Aktivní kandidát práci hledá – sleduje inzeráty, posílá životopisy a reaguje rychle. Pasivní kandidát nehledá nic: svou dnešní práci umí, má v ní zaběhnuté vztahy a o změně uvažuje jen tehdy, když se objeví konkrétní důvod. U provozních rolí tvoří aktivní kandidáti dost velkou skupinu na to, aby inzerce fungovala. U odborných a technických rolí je poměr obrácený.',
        'Z toho plyne mez inzerátu. Inzerát je pasivní nástroj a osloví jen průnik dvou skupin: lidí s hledanou kompetencí a lidí, kteří se právě dívají. Čím vzácnější kompetence, tím menší tento průnik je. Pokud u odborné pozice inzerce nefunguje, obvykle to není chyba textu inzerátu ani volby portálu.',
      ],
    },
    {
      heading: 'Co přímé oslovení obnáší v praxi',
      body: [
        'Aktivní vyhledávání není jedna činnost, ale sled kroků, z nichž každý může selhat. Podstatná část práce leží před prvním telefonátem – v tom, že je nutné vědět, v jakém typu provozu hledaná kompetence vůbec vzniká.',
      ],
      bullets: [
        'Určit, kde daná kompetence reálně vzniká – v jakém typu provozu, u jaké technologie, v jak velkém týmu',
        'Ověřit profil ještě před oslovením, aby se nevolalo lidem, pro které role nedává smysl',
        'Oslovit srozumitelně a bez nátlaku: kdo volá, proč právě jemu a o jakou roli jde',
        'Popsat roli natolik konkrétně, aby se člověk mohl rozhodnout, zda je vůbec o čem mluvit',
        'Dohodnout se na důvěrnosti dřív, než se cokoli předá zaměstnavateli',
        'Udržet korektní kontakt i tam, kde odpověď zní „ne“',
      ],
    },
    {
      heading: 'Proč je první „ne“ normální',
      body: [
        'Odmítnutí při prvním oslovení je běžná reakce a obvykle se netýká role, ale okamžiku. Člověk má rozdělanou práci, čerstvě dostal přidáno, čeká na vyhodnocení roku nebo právě rozjel změnu, kterou chce dokončit. Odpověď proto neříká, že nabídka je špatná, ale že teď není vhodná doba.',
        'Praktický důsledek je nepohodlný: kdo staví na jediném kole oslovení a rychlém výsledku, přímým oslovením ničeho nedosáhne. Smysl má rozhovor korektně ukončit, poděkovat a nechat otevřené dveře – k části oslovených se lze vrátit později. Konkrétní termín obsazení proto u tohoto postupu neuvádíme.',
      ],
    },
    {
      heading: 'Diskrétnost a nakládání s údaji kandidáta',
      body: [
        'Oslovený člověk má zaměstnání, o které nechce přijít. Diskrétnost tu proto není zdvořilost, ale podmínka celého postupu. Porušení důvěry přitom nepoškodí jen jednoho kandidáta – v odborných profesích, kde se lidé mezi provozy znají, se rozšíří rychle.',
        'Stejná opatrnost platí pro údaje. Životopis, kontakt i poznámky z rozhovoru jsou osobními údaji od prvního okamžiku a platí pro ně pravidla ochrany osobních údajů. Kandidát má vědět, kdo ho oslovil, k čemu budou jeho údaje použity a jak dlouho se uchovají; předání konkrétnímu zaměstnavateli je samostatný krok, ke kterému se vyjadřuje vědomě a předem.',
        'Ještě jedna věc patří na rovinu: zprostředkování zaměstnání je činnost upravená zákonem o zaměstnanosti a vyžaduje povolení, přičemž úhradu za zprostředkování nelze požadovat po uchazeči. Náklady nese zaměstnavatel, nikdy oslovený člověk.',
      ],
      bullets: [
        'Nekontaktovat na pracovní telefon ani firemní e-mail a nemluvit o oslovení s kolegy kandidáta',
        'Nesdělovat jméno kandidáta zaměstnavateli bez jeho souhlasu',
        'Neověřovat reference u současného zaměstnavatele bez vědomí kandidáta',
        'Uchovávat jen údaje, které mají účel, a jen po dobu, kdy ten účel trvá',
      ],
    },
    {
      heading: 'Co musí dodat zaměstnavatel',
      body: [
        'Přímé oslovení stojí a padá na tom, co má oslovující v ruce. Člověku, který práci má, nestačí seznam požadavků – potřebuje důvod, proč by měl o změně vůbec uvažovat, a protistranu, která se umí rychle rozhodnout.',
      ],
      bullets: [
        'Věrohodný příběh role – proč je otevřená, co po ní člověk převezme a o čem bude rozhodovat sám',
        'Pravdivý popis podmínek – směnnost, dojezd, tempo, technika i to, co je na provozu nepříjemné',
        'Rozhodující osoba, která odpoví rychle a je ochotná se sejít i mimo běžnou pracovní dobu',
        'Ochota vést první schůzku diskrétně, mimo pracoviště nebo online',
        'Zpětná vazba do dohodnutého termínu, i když je zamítavá',
      ],
    },
    {
      heading: 'Co o svém dosahu neuvádíme',
      body: [
        'Na personálním trhu jsou běžné formulace o rozsáhlé databázi profilů nebo o kandidátech dostupných bez čekání. Žádný takový údaj o dosahu ani o velikosti databáze neuvádíme a uvádět nebudeme. Ověřit jej nelze a pro zaměstnavatele nic neznamená: rozhoduje, kolik lidí s hledanou kompetencí je dosažitelných ve vašem regionu a ochotných o změně mluvit, ne velikost jakéhokoli seznamu.',
        'Popsat naopak umíme postup: jak upřesníme zadání, jak vymezíme okruh provozů a rolí, jak oslovujeme a co vám průběžně sdělujeme o průběhu. Obsah této stránky se týká odborných, technických a provozně vedoucích pozic ve výrobě, skladech a logistice; vyhledávání do vrcholového vedení ani psychologické testování kandidátů zde nepopisujeme.',
      ],
    },
  ],
  faq: [
    {
      q: 'Proč nám na inzerát neodpovídají vhodní lidé?',
      a: 'Inzerát osloví jen ty, kdo právě hledají. U odborných rolí je tato skupina malá, protože kdo hledanou kompetenci má, obvykle ji právě uplatňuje jinde. Řešením není delší text inzerátu, ale aktivní vyhledávání a oslovení konkrétních lidí.',
    },
    {
      q: 'Kolik kandidátů máte v databázi?',
      a: 'Žádné číslo neuvádíme. Údaj o velikosti databáze nebo o dosahu není ověřitelný a nevypovídá o tom, kolik lidí s vaší konkrétní kompetencí je v daném regionu dosažitelných. Popsat vám umíme postup, ne velikost seznamu.',
    },
    {
      q: 'Je oslovení člověka pracujícího u jiné firmy korektní?',
      a: 'Ano, pokud probíhá diskrétně a bez nátlaku: mimo pracovní kontakty, bez sdělování jména třetí straně bez souhlasu a bez ověřování referencí u současného zaměstnavatele. Rozhodnutí zůstává na kandidátovi a odmítnutí se respektuje.',
    },
    {
      q: 'Co když kandidát nabídku odmítne?',
      a: 'Je to běžné a obvykle to vypovídá o načasování, ne o roli. Rozhovor se korektně ukončí a kontakt zůstává otevřený; k části oslovených má smysl se vrátit později, až se jejich situace změní.',
    },
    {
      q: 'Platí za oslovení kandidát?',
      a: 'Ne. Zákon o zaměstnanosti neumožňuje požadovat úhradu za zprostředkování zaměstnání po uchazeči. Náklady nese zaměstnavatel a kandidát za účast ve výběru neplatí nic.',
    },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.upcr, SRC.mpsv],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/jak-najit-pracovniky', label: 'Jak najít pracovníky pro firmu' },
    { href: '/proc-se-nedari-obsadit-odbornou-pozici', label: 'Proč se nedaří obsadit odbornou pozici' },
    { href: '/nabor-pracovniku', label: 'Nábor pracovníků: přehled cest' },
    { href: '/primy-nabor-zamestnancu', label: 'Přímý nábor do kmenového stavu' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PROC_SE_NEDARI_OBSADIT_ODBORNOU_POZICI: SeoPage = {
  slug: 'proc-se-nedari-obsadit-odbornou-pozici',
  breadcrumbLabel: 'Neobsazená odborná pozice',
  eyebrow: 'Nábor · Diagnostika',
  title: 'Proč se nedaří obsadit odbornou pozici: diagnostika náboru',
  heroSubtitle:
    'Pozice visí měsíce a vhodní lidé nechodí. Otázky, které si projděte nad vlastními podklady dřív, než přidáte další inzertní kanál nebo zvýšíte tlak na nábor.',
  description:
    'Neobsazená odborná pozice – diagnostika po krocích: rozpor v profilu, zděděné požadavky, vázané místo, ztráty ve výběru a srovnání, které kandidát dělá.',
  keywords: [
    'nedaří se obsadit pozici',
    'neobsazená odborná pozice',
    'proč nemáme kandidáty',
    'diagnostika náboru',
    'profil pozice chyby',
    'ztráta kandidátů ve výběru',
  ],
  intro:
    'Odborná pozice otevřená několik měsíců obvykle nemá jednu příčinu, ale několik menších, které se sčítají. Dokud je zaměstnavatel nepojmenuje, opakuje stejné hledání s očekáváním jiného výsledku – přidá další inzertní kanál, zvýší tlak na personální oddělení a čeká. Tato stránka nabízí místo toho diagnostickou posloupnost: otázky, které lze zodpovědět nad vlastními podklady a které se ptají nejprve na zadání, potom na omezení a teprve nakonec na trh. Konkrétní mzdové sazby ani rozpětí zde neuvádíme.',
  sections: [
    {
      heading: 'Než přidáte další kanál, projděte zadání',
      body: [
        'Diagnostika má smysl v pořadí. Nejprve se ověřuje zadání, protože chyba v něm znehodnotí jakýkoli kanál. Potom vlastní omezení, která inzerátem změnit nelze. Teprve nakonec proces a nabídka. Obrácené pořadí – nejdřív přidat kanály, ptát se až potom – je obvyklý postup a zároveň ten dražší.',
        'Připravte si podklady, bez kterých je debata o příčinách jen dohadem: text inzerátu, interní popis pozice, seznam kandidátů, kteří procesem prošli, s poznámkou, ve které fázi a proč vypadli, a data jednotlivých kroků. Většina odpovědí je v těchto čtyřech podkladech, ne na trhu práce.',
      ],
    },
    {
      heading: 'Není profil vnitřně rozporný?',
      body: [
        'Obvyklý rozpor je mezi požadovanou úrovní kompetence a nabízenými podmínkami: profil popisuje samostatného člověka s praxí a platnými doklady, podmínky odpovídají nástupní roli. Takový inzerát nepřitáhne ani jednu skupinu – zkušení ho přeskočí, začínající se nepřihlásí kvůli požadavkům. Pozice pak visí, aniž by se cokoli dělo špatně na trhu.',
        'Rozpory bývají i uvnitř samotného profilu: úzká specializace a zároveň široký záběr, plná směnnost a zároveň jednání s dodavateli v běžné pracovní době, odpovědnost za tým bez rozhodovací pravomoci. Jednoduchý test: přečtěte si profil jako člověk, který takovou práci dnes dělá, a ptejte se, co by ho zaujalo a co by ho odradilo.',
        'Mzdové rozpětí neodhadujte a nepřebírejte z inzerátů jiných firem. Veřejně dostupná data o výdělcích podle profese, kvalifikace a regionu poskytuje ISPV; tato stránka žádné částky neuvádí.',
      ],
    },
    {
      heading: 'Je požadavek požadavkem, nebo zděděným seznamem přání?',
      body: [
        'Požadavky v inzerátech se dědí. Text vznikl při minulém obsazování, doplnil se o přání předchozího vedoucího a od té doby ho nikdo neporovnal se skutečnou náplní práce. Užitečné je rozdělit každý bod do tří skupin a u každé skupiny vědět, co s ní lze dělat.',
        'Kontrolní otázka, která rozdíl mezi podmínkou a přáním obvykle odhalí: splnil by dnešní inzerát člověk, který tu práci u vás aktuálně dělá? Pokud ne, je zadání přísnější než skutečná potřeba. Formální doplnění kvalifikace navíc umožňuje systém profesních kvalifikací, jehož standardy vede Národní soustava kvalifikací; obvyklé požadavky povolání popisuje Národní soustava povolání.',
      ],
      bullets: [
        'Podmínky dané předpisem nebo dokladem – bez nich činnost vykonávat nelze a prominout je nejde',
        'Dovednosti dané provozem – lze je doplnit zaškolením v přiměřené době, pokud má kdo zaškolovat',
        'Přání – zužují okruh kandidátů, ale nerozhodují o tom, zda člověk práci zvládne',
      ],
    },
    {
      heading: 'Co je skutečně vázaným místem: lokalita, směny, nebo doklad?',
      body: [
        'U odborných pozic bývá rozhodující jediné omezení, které obejít nelze, a vyplatí se vědět které. Nejčastěji jde o lokalitu, směnný režim nebo doklad – každé z nich má jiné řešení, jiný náklad a jiný dopad na velikost okruhu kandidátů.',
        'Pokud je vázaným místem doklad, položte si jednu doplňující otázku: musí ho mít kandidát už při nástupu, nebo jste ochotni jeho získání financovat a počkat na něj? Tato jediná odpověď mění velikost okruhu kandidátů víc než většina ostatních úprav zadání.',
      ],
      bullets: [
        'Lokalita – řeší se dojezdem, svozem zaměstnanců, ubytováním nebo částí práce mimo pracoviště, pokud to role dovolí',
        'Směnný režim – zužuje okruh výrazněji, než se čeká; zvažte, zda je plná směnnost u této role opravdu nutná',
        'Doklad nebo oprávnění – buď je podmínkou výkonu činnosti, nebo ho lze doplnit; rozdíl musí být jasný před hledáním',
        'Zdravotní způsobilost – posuzuje ji poskytovatel pracovnělékařských služeb a u některých prací je limitem sama o sobě',
      ],
    },
    {
      heading: 'Neztrácíte kandidáty ve vlastním procesu?',
      body: [
        'Část neobsazených pozic nemá málo kandidátů – má je a ztrácí je. Ztráta má obvykle podobu prodlevy: mezi pohovorem a zpětnou vazbou uplynou dny, technické posouzení se plánuje na termín, kdy má odborný garant čas, a nabídka dorazí ve chvíli, kdy se člověk už rozhodl jinak. Prodlevy se přitom dají změřit, na rozdíl od dojmu, že kandidáti nejsou.',
        'U odborných rolí je rozhodování pomalejší i po přijetí nabídky, protože kandidát musí ukončit stávající pracovní poměr a dodržet výpovědní dobu, jejíž minimální délku a běh upravuje zákoník práce. Kdo s tímto časem v plánu nepočítá, vyhodnotí nábor jako neúspěšný dřív, než mohl skončit.',
      ],
      bullets: [
        'Kolik dní uplynulo mezi jednotlivými kroky u posledních kandidátů',
        'Kolik kol proces má a co každé z nich k rozhodnutí přidává',
        'Kdo o přijetí rozhoduje a zda byl přítomen tam, kde měl být',
        'Kdy se poprvé mluví o podmínkách – pozdní informace o mzdě nebo směnách maří čas oběma stranám',
        'Zda kandidát dostane odpověď i tehdy, když neuspěl',
      ],
    },
    {
      heading: 'Vůči čemu se vaše nabídka porovnává',
      body: [
        'Zaměstnavatelé srovnávají svou nabídku s jinými inzeráty. Odborný kandidát ji ale srovnává se svou dnešní prací, kterou zná do detailu: s vedoucím, kterému rozumí, s technikou, kterou má nastavenou, s dojezdem, který má vyzkoušený, a s jistotou, že tam už uspěl. Proti takovému srovnání nestačí být jen o kousek jiný.',
        'Prakticky to znamená pojmenovat, co je ve vaší nabídce lepší než to, co má člověk dnes, a nezakrývat, co je horší. Pravdivá informace sdělená včas šetří obě strany víc než pečlivě napsaný inzerát, po kterém přijde zklamání ve zkušební době.',
      ],
      bullets: [
        'Projít profil proti realitě práce a odstranit rozpory',
        'Rozdělit požadavky na podmínky, doplnitelné dovednosti a přání',
        'Pojmenovat jediné vázané místo a rozhodnout, zda ho lze uvolnit',
        'Změřit prodlevy ve vlastním výběru a zkrátit je',
        'Ověřit mzdové rozpětí v datech, ne odhadem',
        'Teprve potom měnit kanály a zvážit přímé oslovení kandidátů',
      ],
    },
  ],
  faq: [
    {
      q: 'Jak poznáme, že je problém v zadání, a ne na trhu?',
      a: 'Porovnejte inzerát s lidmi, kteří tu práci u vás dnes dělají. Pokud by dnešní požadavky sami nesplnili, je zadání přísnější než skutečná potřeba. Druhým vodítkem je počet kandidátů, kteří prošli prvním kolem výběru, ale vypadli až v kolech pozdějších.',
    },
    {
      q: 'Máme zvýšit nabízenou mzdu?',
      a: 'Obecně to říct nelze a žádné rozpětí zde neuvádíme. Vycházejte z dat o výdělcích podle profese, kvalifikace a regionu, která poskytuje ISPV, a teprve potom z toho, co pozice ve vašem rozpočtu unese. Mzda navíc nebývá jediným vázaným místem.',
    },
    {
      q: 'Kolik kol výběru je u odborné pozice únosné?',
      a: 'Univerzální počet neexistuje. Rozhoduje, co každé kolo k rozhodnutí přidává a jak dlouhá je prodleva mezi nimi. Kola bez vlastního výstupu a čekání na volný termín odborného garanta patří k častým příčinám ztráty kandidátů.',
    },
    {
      q: 'Pozice visí několik měsíců – má smysl hledat dál stejným způsobem?',
      a: 'Opakování téhož postupu obvykle přinese stejný výsledek. Projděte nejprve profil, požadavky a vlastní proces. Teprve potom má smysl měnit kanály nebo přejít na přímé oslovení lidí, kteří práci aktivně nehledají.',
    },
    {
      q: 'Může za to nedostatek lidí na trhu?',
      a: 'Někdy ano, jenže na tuto příčinu zaměstnavatel reagovat nemůže. Diagnostika proto začíná u toho, co ovlivnit lze. Údaje o trhu práce zveřejňují MPSV, Úřad práce ČR a ČSÚ; tato stránka konkrétní čísla neuvádí.',
    },
  ],
  sources: [SRC.ispv, SRC.nsk, SRC.nsp, SRC.zakonikPrace, SRC.mpsv, SRC.upcr, SRC.czso],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/prime-osloveni-kandidatu', label: 'Přímé oslovení kandidátů' },
    { href: '/jak-dlouho-trva-obsazeni-pozice', label: 'Jak dlouho trvá obsazení pozice' },
    { href: '/nejcastejsi-chyby-zamestnavatelu', label: 'Nejčastější chyby zaměstnavatelů' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
    { href: '/jak-najit-pracovniky', label: 'Jak najít pracovníky pro firmu' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

// ── COMMERCIAL ─────────────────────────────────────────

export const JAK_DLOUHO_TRVA_OBSAZENI_POZICE: SeoPage = {
  slug: 'jak-dlouho-trva-obsazeni-pozice',
  breadcrumbLabel: 'Doba obsazení pozice',
  eyebrow: 'Nábor · Termíny a lhůty',
  title: 'Jak dlouho trvá obsazení pozice: co dobu ovlivňuje',
  heroSubtitle:
    'Proč na otázku „za jak dlouho“ neexistuje jedna odpověď a co dobu obsazení odborné pozice skutečně tvoří – od výpovědní doby kandidáta po platnost odborných dokladů a lhůty úřadů.',
  description:
    'Jak dlouho trvá obsazení pozice? Konkrétní datum neslibujeme. Co dobu určuje: výpovědní doba, doklady a kvalifikace, rozhodování firmy i lhůty úřadů.',
  keywords: [
    'jak dlouho trvá obsazení pozice',
    'doba obsazení pozice',
    'výpovědní doba nástup',
    'termín nástupu zaměstnance',
    'obsazení technické pozice',
    'harmonogram náboru',
  ],
  intro:
    'Na otázku „za jak dlouho pozici obsadíte“ nedáváme datum. Termín nástupu totiž z větší části neurčuje agentura ani zaměstnavatel, ale okolnosti na straně kandidáta, úřadů a kalendáře: výpovědní doba u dosavadní práce, platnost a rozsah odborných dokladů, volný termín pracovnělékařské prohlídky, u pracovníků ze třetích zemí povolovací řízení vedené státem a sezóna, do které nábor spadne. Tato stránka místo slibu popisuje, z čeho se doba obsazení skutečně skládá – aby si zaměstnavatel dokázal sestavit vlastní realistický harmonogram a poznal, které části může ovlivnit sám.',
  sections: [
    {
      heading: 'Proč zde nenajdete slíbený termín',
      body: [
        'Slíbený počet dní zní v nabídce dobře, ale je to slib za osoby, které slibující nemá pod kontrolou – za kandidáta, jeho dosavadního zaměstnavatele, zkušebnu, poskytovatele pracovnělékařských služeb a správní úřad. Datum nástupu proto neslibujeme a nepracujeme ani s průměrnou dobou obsazení: u odborných a technických pozic se jednotlivá zadání liší natolik, že by průměr zaměstnavatele spíše zmátl než zorientoval.',
        'Co popsat lze, je průběh. Po upřesnění zadání víte, jaké kroky mají proběhnout, kdo je na řadě a kde se hledání právě nachází. Odhad termínu se pak upřesňuje postupně – nejdřív podle toho, kdo z oslovených lidí je vůbec dostupný, a teprve po přijetí nabídky podle výpovědní doby konkrétního kandidáta a stavu jeho dokladů.',
      ],
    },
    {
      heading: 'Výpovědní doba je položka, kterou neovlivníte',
      body: [
        'U odborných pozic oslovujete převážně lidi, kteří pracují. Jakmile takový kandidát nabídku přijme, musí u dosavadního zaměstnavatele ukončit pracovní poměr podle pravidel zákoníku práce. Ten stanoví minimální délku výpovědní doby i okamžik, od kterého začíná běžet. Obojí se v čase novelizovalo, proto vycházejte z aktuálního znění zákoníku práce, nikoli z dřívější praxe. Prakticky to znamená, že odstup mezi přijetím nabídky a prvním dnem na vaší směně určuje zákonná úprava a dohoda kandidáta s dosavadním zaměstnavatelem, nikoli vaše potřeba.',
        'Zkrátit ji nedokáže agentura ani vy. Dřívější odchod je možný jen dohodou mezi kandidátem a jeho dosavadním zaměstnavatelem – a u obtížně nahraditelných pozic k ní protistrana zpravidla nemá důvod. Kratší náběh mívají lidé ve zkušební době, po skončení projektu nebo po ukončení předchozího pracovního poměru; na jejich dostupnost však nelze harmonogram stavět.',
      ],
    },
    {
      heading: 'Kvalifikace a doklady, které musí sedět',
      body: [
        'Druhým typickým zdržením je kvalifikace. U odborných pozic nerozhoduje jen praxe, ale konkrétní doklad a jeho rozsah: u svářeče je rozhodující zkušební rozsah uvedený v osvědčení podle ČSN EN ISO 9606-1, u činností na elektrických zařízeních odborná způsobilost podle nařízení vlády č. 194/2022 Sb. a u vyhrazených technických zařízení odborná způsobilost, případně osvědčení podle zákona č. 250/2021 Sb. Doklad, který na papíře existuje, ještě nemusí pokrývat práci, kterou pozice skutečně obnáší.',
        'Tyto doklady mají navíc omezenou platnost a jejich obnova závisí na kapacitě zkušebny nebo školicího zařízení, ne na dodavateli náboru. U kvalifikace získané v zahraničí přistupuje uznávací řízení podle zákona č. 18/2004 Sb., u zahraničního vzdělání postup v gesci MŠMT. Konkrétní lhůty ani intervaly zde neuvádíme – vyplývají z příslušného předpisu a z podmínek konkrétního dokladu.',
      ],
      bullets: [
        'Rozsah, na který byl doklad vydán, nejen jeho existence',
        'Datum platnosti a čas potřebný na přezkoušení nebo obnovu',
        'Uznání kvalifikace nebo vzdělání získaného mimo ČR',
        'Volný termín vstupní pracovnělékařské prohlídky',
        'Doložení praxe, kterou pozice skutečně vyžaduje',
      ],
    },
    {
      heading: 'Rozhodovací smyčka na straně zaměstnavatele',
      body: [
        'Část doby obsazení vzniká uvnitř vaší firmy – a je to zpravidla ta část, se kterou lze nejsnáz něco udělat. Patří sem prodleva mezi zasláním profilu a zpětnou vazbou, počet kol pohovorů, dostupnost člověka, který rozhoduje, a rychlost, s jakou po pohovoru přijde konkrétní nabídka. U kandidáta, který má práci a k tomu další jednání, se každá prodleva bez zprávy promítne do pravděpodobnosti, že vaši nabídku bude ještě zvažovat.',
        'Zdržení působí i nestabilní zadání. Pokud se v průběhu mění požadovaný rozsah oprávnění, směnnost nebo místo výkonu práce, výběr fakticky začíná znovu a dosud oslovení lidé už nejsou k dispozici. Vyplatí se proto vyjasnit sporné body dřív, než se osloví první kandidát.',
      ],
      bullets: [
        'Kdo dává zpětnou vazbu k profilům a do kdy',
        'Kolik kol pohovorů je skutečně nutných',
        'Kdy je rozhodující osoba dostupná, včetně dovolených',
        'Jak rychle po pohovoru odchází konkrétní nabídka',
        'Zda je zadání stabilní, nebo se během výběru mění',
      ],
    },
    {
      heading: 'Stěhování, dojíždění a ubytování',
      body: [
        'Pokud pozici nelze obsadit ze spádové oblasti, přibývá do harmonogramu logistika kandidátova života. Výpověď z nájmu, škola dětí, práce partnera nebo prodej auta bývají důvodem, proč se nástup posouvá i po vyřešení všeho ostatního. U dojíždějících hraje roli návaznost směn na spoje a u ubytování to, zda je kapacita volná právě k požadovanému datu.',
        'Ubytování a svoz zaměstnanců je proto vhodné vyjasnit ještě před oslovením lidí mimo region, ne až ve chvíli, kdy kandidát nabídku zvažuje. Podmínky, cena a to, co je v ní zahrnuto, patří do nabídky od začátku – dodatečné vyjednávání o bydlení může nástup výrazně posunout.',
      ],
    },
    {
      heading: 'Oprávnění u zahraničních pracovníků a sezónnost',
      body: [
        'U pracovníků ze třetích zemí vstupuje do harmonogramu správní řízení, které vede stát. Délku řízení o pobytovém a pracovním oprávnění neurčuje agentura ani zaměstnavatel; postup a lhůty stanoví předpisy a průběh závisí na příslušném úřadu a u části žádostí i na zastupitelském úřadu v zahraničí. Aktuální informace zveřejňují Ministerstvo vnitra ČR, Úřad práce ČR a Ministerstvo zahraničních věcí ČR; konkrétní lhůty na této stránce neuvádíme.',
        'Svou roli má i kalendář. Celozávodní dovolené, letní prázdniny a konec roku zpomalují pohovory, prohlídky i termíny zkoušek, zatímco sezónní špičky ve výrobě a logistice zvyšují konkurenci o stejné lidi. Nábor spuštěný v době, kdy rozhodující lidé nejsou k dispozici, se prodlouží i bez jakékoli komplikace.',
      ],
    },
  ],
  faq: [
    {
      q: 'Za jak dlouho nám dodáte kandidáty?',
      a: 'Konkrétní datum neslibujeme, protože ho z podstatné části určují třetí strany – dosavadní zaměstnavatel kandidáta, zkušebny, poskytovatel pracovnělékařských služeb a u cizinců správní úřady. Po upřesnění zadání vám popíšeme, jaké kroky mají proběhnout a kde se hledání nachází.',
    },
    {
      q: 'Můžete zkrátit výpovědní dobu kandidáta?',
      a: 'Ne. Délku i běh výpovědní doby stanoví zákoník práce a dřívější odchod je možný pouze dohodou mezi kandidátem a jeho dosavadním zaměstnavatelem. Agentura ani nový zaměstnavatel do tohoto vztahu nevstupuje.',
    },
    {
      q: 'Co dobu obsazení nejvíc zkrátí na naší straně?',
      a: 'Rychlá zpětná vazba k profilům, omezení počtu kol pohovorů na nezbytné minimum, předem známá dostupnost rozhodující osoby a stabilní zadání. Tyto části harmonogramu má zaměstnavatel plně ve svých rukou.',
    },
    {
      q: 'Jak dlouho trvá vyřízení oprávnění u pracovníka ze třetí země?',
      a: 'Řízení vede stát a jeho délku neurčujeme. Postup a lhůty vyplývají z předpisů; aktuální informace zveřejňují Ministerstvo vnitra ČR, Úřad práce ČR a Ministerstvo zahraničních věcí ČR. Do plánu je vhodné tento krok zahrnout jako samostatnou fázi.',
    },
    {
      q: 'Uvádíte průměrnou dobu obsazení pozice?',
      a: 'Neuvádíme. U odborných a technických pozic se zadání liší rozsahem oprávnění, směnností i regionem natolik, že by průměr nesl zdání přesnosti bez skutečné vypovídací hodnoty.',
    },
  ],
  sources: [
    SRC.zakonikPrace,
    SRC.zakonOZamestnanosti,
    SRC.csnSvarovani,
    SRC.nvElektrotechnika,
    SRC.zakonVyhrazenaZarizeni,
    SRC.zakonUznavaniKvalifikace,
    SRC.msmt,
    SRC.upcr,
    SRC.mvcr,
    SRC.mzv,
  ],
  internalLinks: [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/primy-nabor-zamestnancu', label: 'Přímý nábor do kmenového stavu' },
    { href: '/planovani-naboru', label: 'Plánování náboru' },
    { href: '/proc-se-nedari-obsadit-odbornou-pozici', label: 'Proč se nedaří obsadit odbornou pozici' },
    { href: '/prime-osloveni-kandidatu', label: 'Přímé oslovení kandidátů' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const CENA_SLUZEB_PERSONALNI_AGENTURY: SeoPage = {
  slug: 'cena-sluzeb-personalni-agentury',
  breadcrumbLabel: 'Cena služeb agentury',
  eyebrow: 'Spolupráce · Odměna a rozsah',
  title: 'Cena služeb personální agentury: modely odměny',
  heroSubtitle:
    'Jak jsou postavené modely odměny personálních agentur – jednorázová odměna u přímého náboru a hodinová sazba u dočasného přidělení – a proč se dvě nabídky často porovnávají na různém základě.',
  description:
    'Cena služeb personální agentury: modely odměny – jednorázová odměna u přímého náboru a hodinová sazba u dočasného přidělení. Bez konkrétních čísel.',
  keywords: [
    'cena služeb personální agentury',
    'odměna personální agentury',
    'hodinová sazba agentury práce',
    'poplatek za nábor',
    'exkluzivita nábor',
    'srovnání nabídek agentur',
  ],
  intro:
    'Nabídky personálních agentur se srovnávají hůř, než se na první pohled zdá: dvě z nich mohou znít podobně a přitom obsahovat jiný rozsah služby, jiný základ pro výpočet odměny a jiné rozdělení rizika mezi dodavatele a zadavatele. Na této stránce proto nenajdete žádnou částku, sazbu ani podíl. Popisuje, jak jsou jednotlivé modely odměny postavené, co u agenturního zaměstnávání musí hodinová sazba ze zákona unést a podle čeho poznáte, že dvě nabídky ve skutečnosti neporovnáváte na stejném základě. Vlastní čísla si dosadíte v kalkulačce mzdových nákladů.',
  sections: [
    {
      heading: 'Dva modely, které se neporovnávají přímo',
      body: [
        'Přímý nábor a agenturní zaměstnávání se neliší jen cenou, ale hlavně tím, co se kupuje. U přímého náboru platíte za vyhledání a předvýběr kandidáta, kterého následně zaměstnáte sami; odměna je jednorázová a bývá vázaná na nástup. U agenturního zaměstnávání zůstává zaměstnavatelem agentura práce, zaměstnance dočasně přiděluje k vám jako uživateli a fakturuje se odpracovaný čas.',
        'V prvním případě je platba dodavateli jednorázová a mzdové náklady nesete dál sami. Ve druhém je celá mzdová a odvodová část obsažena v hodinové sazbě. Porovnávat jednorázovou odměnu se sazbou za hodinu bez přepočtu na stejné období a stejný rozsah proto nedává smysl – vycházejí z odlišné logiky.',
      ],
    },
    {
      heading: 'Jak je postavená jednorázová odměna u přímého náboru',
      body: [
        'Odměna za přímý nábor se obvykle odvozuje od výdělku obsazované pozice a vyjadřuje se jako podíl z dohodnutého základu. Rozhodující proto není samotný podíl, ale definice základu: zda jde o hrubou měsíční mzdu nebo o roční výdělek, zda se do něj počítá pohyblivá složka, příplatky za směnnost nebo náborový příspěvek. Dvě nabídky se shodným podílem mohou při jiné definici základu skončit výrazně jinde.',
        'Ve smlouvě má být rovněž jasné, co nárok na odměnu zakládá – podpis pracovní smlouvy, nebo skutečný nástup – kdy je splatná a jak se postupuje, pokud kandidát nastoupí na jinou pozici, než pro kterou byl předán. Konkrétní podíl ani částku tato stránka neuvádí; vychází ze zadání, rozsahu služby a náročnosti konkrétní pozice.',
      ],
      bullets: [
        'Přesná definice základu, ze kterého se odměna počítá',
        'Okamžik vzniku nároku: podpis smlouvy, nebo nástup',
        'Splatnost a fakturační podmínky',
        'Postup, pokud kandidát nastoupí na jinou pozici',
      ],
    },
    {
      heading: 'Co musí hodinová sazba u dočasného přidělení obsahovat',
      body: [
        'U dočasného přidělení není hodinová sazba volnou obchodní úvahou. Agenturní zaměstnanec má podle zákoníku práce nárok na srovnatelné mzdové a pracovní podmínky jako srovnatelný kmenový zaměstnanec uživatele, a sazba proto musí unést mzdu na této úrovni včetně všeho, co se k ní váže. Teprve nad tímto základem stojí vlastní náklady agentury.',
        'Nabídka citelně pod úrovní ostatních obvykle neznamená lepší obchod, ale jiný obsah: chybějící příplatky, odlišný předpoklad odpracovaných hodin nebo položky přesunuté do samostatné fakturace. Užitečnější otázka než „kolik“ je proto „co je v sazbě obsaženo a co se doúčtuje“.',
      ],
      bullets: [
        'Mzdu na úrovni srovnatelných mzdových podmínek u uživatele',
        'Povinné odvody zaměstnavatele na sociální a zdravotní pojištění',
        'Dovolenou a náhradu mzdy podle zákoníku práce',
        'Příplatky a náhrady plynoucí z rozvržení směn a práce přesčas',
        'Vlastní náklady agentury na nábor, mzdovou agendu a administrativu',
      ],
    },
    {
      heading: 'Exkluzivita, fázování a vazba odměny na výsledek',
      body: [
        'Modely se liší i tím, kdy se platí. Odměna vázaná výhradně na výsledek přenáší riziko neúspěšného hledání na dodavatele a toto rozdělení rizika se promítá do její výše. Fázovaný model, kdy se část platí při zahájení a zbytek při nástupu, riziko rozděluje a dává dodavateli důvod věnovat kapacitu i zadání, které je obtížné a nemusí skončit obsazením.',
        'Exkluzivita je samostatné ujednání, ne přirážka. Zadání svěřené jedinému dodavateli odstraňuje situaci, kdy stejného kandidáta předloží dvě strany a začne spor o to, kdo ho přivedl; zároveň vás na sjednanou dobu váže. Pokud exkluzivitu sjednáváte, patří k ní doba platnosti a jasný postup pro případ, že se zadání nenaplní.',
      ],
    },
    {
      heading: 'Náhrada při předčasném odchodu patří do smlouvy',
      body: [
        'Otázka „co když nový člověk brzy odejde“ nepatří do nabídky jako slib, ale do smlouvy jako ujednání. Písemně má být určeno rozhodné období, důvody, které se do něj počítají, a případy, které nárok vylučují – například zrušení pozice, podstatná změna zadání nebo ukončení ze strany uživatele.',
        'Slib, že k odchodu nedojde, je tvrzením o budoucím chování třetí osoby, nikoli parametrem služby. Poctivější je dohodnout dopředu, co se stane, pokud k němu dojde. Podrobněji se tomuto bodu věnuje stránka o smlouvě s personální agenturou.',
      ],
    },
    {
      heading: 'Proč nabídky nejsou srovnatelné a kam patří neobsazená pozice',
      body: [
        'Nabídky se často rozcházejí spíš v rozsahu než v ceně. Zjistěte proto, co je zahrnuto a co se doúčtuje: inzerce, ověřování dokladů, koordinace pracovnělékařských prohlídek, OOPP, doprava a ubytování, administrativa u zahraničních pracovníků nebo mzdová agenda. Rozdíl v obsahu bývá větší než rozdíl v čísle.',
        'Do srovnání patří i položka, která v žádné faktuře není – náklad neobsazené pozice. Neodvedená výroba, přesčasy zbytku směny, odmítnuté zakázky a přetížení provozního vedení běží každý týden, kdy pozice zůstává prázdná. Vlastní vstupy si dosaďte v kalkulačce mzdových nákladů; mzdové úrovně pro danou profesi zveřejňuje ISPV.',
      ],
      bullets: [
        'Stejný rozsah služby na obou stranách srovnání',
        'Stejná definice základu pro výpočet odměny',
        'Stejné podmínky splatnosti a fakturace',
        'Přehled toho, co je zahrnuto a co se účtuje zvlášť',
        'Zahrnutý náklad neobsazené pozice za dobu hledání',
      ],
    },
  ],
  faq: [
    {
      q: 'Kolik stojí služby personální agentury?',
      a: 'Jedním číslem to říct nelze a tato stránka žádné neuvádí. Odměna se odvíjí od modelu spolupráce, rozsahu služby a náročnosti konkrétní pozice. Nabídku dáváme vždy ke konkrétnímu zadání, ne jako ceník.',
    },
    {
      q: 'Proč zde není uvedeno procento ani hodinová sazba?',
      a: 'Bez definovaného základu, rozsahu služby a parametrů pozice by takové číslo bylo zavádějící. Stejný podíl při jiné definici základu znamená jinou částku, a stejná sazba může obsahovat jiné položky.',
    },
    {
      q: 'Co všechno musí obsahovat hodinová sazba u dočasného přidělení?',
      a: 'Musí unést mzdu na úrovni srovnatelných mzdových podmínek u uživatele, povinné odvody zaměstnavatele, dovolenou a náhrady mzdy a příplatky plynoucí z rozvržení směn. Teprve nad tím stojí náklady agentury.',
    },
    {
      q: 'Znamená nižší sazba nižší náklad?',
      a: 'Nemusí. Nižší sazba často znamená jiný obsah – například odlišný předpoklad odpracovaných hodin nebo položky fakturované zvlášť. Porovnávejte rozsah a obsah, nikoli jen výslednou číslici.',
    },
    {
      q: 'Musíme sjednat exkluzivitu?',
      a: 'Nemusíte. Je to obchodní ujednání, které odstraňuje spory o původ kandidáta a dodavateli usnadňuje plánování kapacity, ale zároveň vás na sjednanou dobu váže. Pokud ji sjednáte, sjednejte i její dobu a postup při nenaplnění zadání.',
    },
  ],
  sources: [
    SRC.zakonikPrace,
    SRC.zakonOZamestnanosti,
    SRC.zakonSocialni,
    SRC.zakonZdravotni,
    SRC.cssz,
    SRC.ispv,
    SRC.upcr,
  ],
  internalLinks: [
    { href: '/primy-nabor-zamestnancu', label: 'Přímý nábor do kmenového stavu' },
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje agentura práce' },
    { href: '/smlouva-s-personalni-agenturou', label: 'Smlouva s personální agenturou' },
    { href: '/jak-vybrat-personalni-agenturu', label: 'Jak vybrat personální agenturu' },
    { href: '/kolik-stoji-zamestnanec', label: 'Kolik stojí zaměstnanec' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const JAK_VYBRAT_PERSONALNI_AGENTURU: SeoPage = {
  slug: 'jak-vybrat-personalni-agenturu',
  breadcrumbLabel: 'Výběr personální agentury',
  eyebrow: 'Spolupráce · Výběr dodavatele',
  title: 'Jak vybrat personální agenturu: kritéria a ověření',
  heroSubtitle:
    'Co si u dodavatele ověřit dřív, než mu svěříte zadání – povolení ke zprostředkování a jeho rozsah, pojištění, kdo je zaměstnavatelem, metoda výběru a varovné signály. Kritéria platí i na nás.',
  description:
    'Jak vybrat personální agenturu: ověření povolení ke zprostředkování, pojištění, kdo je zaměstnavatelem, otázky na metodu výběru a varovné signály.',
  keywords: [
    'jak vybrat personální agenturu',
    'ověření agentury práce',
    'povolení ke zprostředkování zaměstnání',
    'evidence agentur práce',
    'výběr dodavatele náboru',
    'varovné signály agentura',
  ],
  intro:
    'Výběr personální agentury je nákupní rozhodnutí, které lze udělat ověřitelně. Většina toho, na čem záleží, je totiž dohledatelná ve veřejné evidenci nebo se dá zjistit jedinou otázkou: zda má dodavatel povolení ke zprostředkování zaměstnání a v jakém rozsahu, zda je pojištěn pro případ úpadku, kdo bude u přidělených lidí zaměstnavatelem a jak se u něj ověřují doklady kandidátů. Následující text je psán jako kontrolní seznam pro kupujícího a je záměrně použitelný i proti nám – vlastní stav zde neprohlašujeme za ověřený, ověřte si ho ve veřejné evidenci sami.',
  sections: [
    {
      heading: 'Povolení ke zprostředkování zaměstnání a jeho rozsah',
      body: [
        'Zprostředkování zaměstnání je podle zákona č. 435/2004 Sb., o zaměstnanosti, činnost vázaná na povolení. Povolení se přitom vydává pro určité formy zprostředkování, takže věta „máme povolení“ sama o sobě nestačí. Rozhodující je, zda pokrývá i tu formu, kterou po dodavateli chcete – typicky dočasné přidělení zaměstnanců k uživateli.',
        'Agentury práce s povolením jsou vedeny ve veřejně dostupné evidenci a ověření je věcí několika minut: povolení ke zprostředkování zaměstnání vydává Úřad práce ČR a evidenci agentur práce zveřejňuje MPSV. Kontrolujte přitom název a identifikační číslo subjektu, který bude smlouvu skutečně podepisovat – může se lišit od obchodní značky uvedené v nabídce.',
      ],
      bullets: [
        'Existence povolení a jeho číslo',
        'Formy zprostředkování, které povolení pokrývá',
        'Platnost povolení k dnešnímu dni',
        'Shoda mezi subjektem v evidenci a subjektem na smlouvě',
      ],
    },
    {
      heading: 'Pojištění a otázka, kdo je zaměstnavatelem',
      body: [
        'Agentura, která přiděluje své zaměstnance k uživateli, musí být podle zákona o zaměstnanosti pojištěna pro případ svého úpadku, aby byly zajištěny mzdové nároky přidělených lidí. Doklad o pojištění a údaj o době, do kdy je platné, je zcela legitimní vyžádat si před podpisem smlouvy.',
        'Druhá otázka zní jednoduše: kdo bude zaměstnavatelem lidí, kteří budou pracovat u vás. U agenturního zaměstnávání je jím agentura práce – vede mzdovou agendu, odvádí pojistné a nese povinnosti zaměstnavatele. U přímého náboru se zaměstnavatelem stáváte vy a role dodavatele končí zprostředkováním. Pokud na tuto otázku přichází nejednoznačná odpověď, je to samo o sobě zjištění.',
      ],
    },
    {
      heading: 'Jak dodavatel zajišťuje srovnatelné podmínky',
      body: [
        'Srovnatelné mzdové a pracovní podmínky agenturního zaměstnance vůči srovnatelnému kmenovému zaměstnanci uživatele jsou zákonný požadavek, nikoli prvek nabídky. Zajímavé proto není, zda je dodavatel „dodržuje“, ale jak je zjišťuje: jaké údaje po vás bude chtít, kdo u vás určí srovnatelného zaměstnance a jak se ošetří příplatky plynoucí z rozvržení směn a práce přesčas.',
        'Dodavatel, který tuto otázku odbývá, přenáší riziko na vás. Dodržování pravidel agenturního zaměstnávání je předmětem kontroly ze strany orgánů inspekce práce, a to u obou stran vztahu – u agentury i u uživatele, na jehož pracovišti se práce odvádí.',
      ],
    },
    {
      heading: 'Otázky na metodu výběru',
      body: [
        'Rozdíl mezi dodavateli se ukáže především na tom, jak vybírají. U odborných pozic je podstatné, zda někdo doklady skutečně viděl a rozumí jejich obsahu – například že u svářečského osvědčení rozhoduje zkušební rozsah, ne jeho pouhá existence, a že odborná způsobilost v elektrotechnice se člení podle vykonávané činnosti. Stejně podstatné je, kdo vede pohovor a zda má provozní zkušenost s danou profesí.',
        'Ptejte se také, co dodavatel dělat nebude a kde končí jeho služba. Kdo umí popsat hranice, obvykle popsal i to, co je uvnitř. Odpověď typu „zvládneme cokoliv“ hranice nepopisuje.',
      ],
      bullets: [
        'Kdo vede pohovor a jakou má zkušenost s danou profesí',
        'Jak se ověřuje rozsah a platnost odborných dokladů',
        'Jak se ověřuje praxe a co se dělá s nesrovnalostmi v životopise',
        'Jak se kandidátovi komunikuje směnnost, prostředí a místo výkonu práce',
        'Co se stane, když se po nástupu ukáže, že kandidát požadavky nesplňuje',
      ],
    },
    {
      heading: 'Varovné signály',
      body: [
        'Některé signály jsou spolehlivé právě proto, že se týkají věcí, které dodavatel nemá pod kontrolou. Slíbený termín nástupu je jedním z nich: závisí na výpovědní době kandidáta a u pracovníků ze třetích zemí na správním řízení, tedy na třetích osobách. Podobně opatrně přistupujte k tvrzením o velikosti vlastní databáze, která nelze nijak ověřit, nebo k tvrzení, že dodavatele prověřil či doporučil stát – státní orgány vydávají povolení a vedou evidenci, doporučení dodavatelů nevystavují.',
        'Samostatnou kategorií je tlak na rychlý podpis. Zadání, které opravdu spěchá, se dá zahájit i s krátkou, ale písemnou dohodou; ochota dát podmínky na papír je proto lepším ukazatelem než rychlost reakce.',
      ],
      bullets: [
        'Slib výsledku nebo konkrétního data nástupu',
        'Neověřitelná tvrzení o rozsahu vlastní databáze kandidátů',
        'Tvrzení o schválení či doporučení ze strany státních orgánů',
        'Tlak na rychlý podpis a neochota dát podmínky písemně',
        'Sazba u dočasného přidělení, která zjevně nepokryje zákonné nároky zaměstnance',
        'Chybějící konkrétní kontaktní osoba odpovědná za zadání',
      ],
    },
    {
      heading: 'Reference a písemné podmínky před zahájením',
      body: [
        'Reference řeknou méně, než se od nich čeká. Doloží, že dodavatel s někým spolupracoval, ale nikoli to, jak si povede na vaší pozici, ve vašem regionu a ve vaší směnnosti. Užitečnější je ptát se referenční firmy na konkrétní věci: kolik předaných lidí skutečně nastoupilo, jak se řešila situace, kdy někdo požadavky nesplnil, a jak probíhala komunikace při neshodě.',
        'Před zahájením hledání mějte podmínky písemně – rozsah zadání, odměnu a její splatnost, exkluzivitu, ochranu předaných kandidátů i postup při předčasném ukončení. Dodavatel, který začne pracovat „zatím bez papíru“, vytváří prostor pro spor přesně ve chvíli, kdy budete potřebovat jistotu.',
      ],
    },
  ],
  faq: [
    {
      q: 'Kde ověřím, že agentura má povolení ke zprostředkování zaměstnání?',
      a: 'Ve veřejně dostupné evidenci agentur práce: povolení vydává podle zákona č. 435/2004 Sb., o zaměstnanosti, Úřad práce ČR a evidenci zveřejňuje MPSV. Ověřte číslo povolení, formy zprostředkování, které pokrývá, jeho platnost i shodu s názvem a IČO subjektu na smlouvě.',
    },
    {
      q: 'Platí tato kritéria i na vás?',
      a: 'Ano, a to je celý smysl této stránky. Náš vlastní stav zde neprohlašujeme za ověřený; ověřte si ho v evidenci stejně jako u kohokoli jiného a stejné otázky nám položte.',
    },
    {
      q: 'Co si mám myslet o dodavateli, který slíbí termín nástupu?',
      a: 'Slibuje za osoby, které neovlivňuje – za kandidáta, jeho dosavadního zaměstnavatele a u cizinců za správní úřad. Poctivá odpověď popisuje kroky a jejich pořadí, nikoli datum.',
    },
    {
      q: 'Jak poznám, že je nabídnutá hodinová sazba udržitelná?',
      a: 'Ptejte se, co obsahuje. U dočasného přidělení musí unést mzdu na úrovni srovnatelných podmínek u uživatele, odvody zaměstnavatele, dovolenou a náhrady i příplatky za rozvržení směn. Sazba, která na to zjevně nestačí, je riziko pro obě strany.',
    },
    {
      q: 'Musí být podmínky sjednané ještě před zahájením hledání?',
      a: 'Doporučujeme to. Rozsah, odměna, splatnost, exkluzivita a ochrana předaných kandidátů se nejhůř dojednávají zpětně. Jednotlivým bodům se věnuje stránka o smlouvě s personální agenturou.',
    },
  ],
  sources: [
    SRC.zakonOZamestnanosti,
    SRC.zakonikPrace,
    SRC.zakonInspekcePrace,
    SRC.upcr,
    SRC.mpsv,
    SRC.suip,
  ],
  internalLinks: [
    { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' },
    { href: '/cena-sluzeb-personalni-agentury', label: 'Cena služeb personální agentury' },
    { href: '/smlouva-s-personalni-agenturou', label: 'Smlouva s personální agenturou' },
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje agentura práce' },
    { href: '/o-nas', label: 'O nás a ověření agentury' },
    { href: '/nejcastejsi-chyby-zamestnavatelu', label: 'Nejčastější chyby zaměstnavatelů' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const SMLOUVA_S_PERSONALNI_AGENTUROU: SeoPage = {
  slug: 'smlouva-s-personalni-agenturou',
  breadcrumbLabel: 'Smlouva s agenturou',
  eyebrow: 'Spolupráce · Smluvní podmínky',
  title: 'Smlouva s personální agenturou: na co si dát pozor',
  heroSubtitle:
    'Čím se liší smlouva u přímého náboru a dohoda o dočasném přidělení a které body musí být sjednané písemně – od odměny a exkluzivity po BOZP, OOPP a ochranu údajů kandidátů.',
  description:
    'Smlouva s personální agenturou: čím se liší přímý nábor a dočasné přidělení a co má být písemně – odměna, exkluzivita, BOZP a OOPP, náhrada i ukončení.',
  keywords: [
    'smlouva s personální agenturou',
    'dohoda o dočasném přidělení',
    'smluvní podmínky agentura práce',
    'exkluzivita smlouva nábor',
    'odpovědnost za BOZP uživatel',
    'ochrana údajů kandidátů',
  ],
  intro:
    'Smlouva s personální agenturou rozhoduje o situacích, které se v nabídce neřeší: co se stane, když kandidát nenastoupí, když se zadání v průběhu změní, když dojde k pracovnímu úrazu na vašem pracovišti nebo když spolupráce skončí dřív, než se čekalo. Podoba smlouvy se přitom zásadně liší podle toho, zda kupujete vyhledání kandidáta do vlastního kmenového stavu, nebo dočasné přidělení agenturních zaměstnanců. Následující přehled shrnuje body, které mají být sjednané písemně, a role, které mezi stranami nelze přesunout dohodou. Jde o obecné informace, nikoli o právní poradenství.',
  sections: [
    {
      heading: 'Dva různé smluvní vztahy',
      body: [
        'U přímého náboru uzavíráte s agenturou smlouvu, jejímž předmětem je vyhledání a předvýběr kandidáta. Pracovní smlouvu pak uzavíráte přímo s ním a všechny povinnosti zaměstnavatele nesete vy. Vztah s dodavatelem tím fakticky končí – s výjimkou ujednání, která mají přesah do budoucna, tedy odměny, ochrany předaných kandidátů a ujednání o náhradě.',
        'U agenturního zaměstnávání je struktura jiná. Zaměstnavatelem zůstává agentura práce, s vámi jako uživatelem uzavírá dohodu o dočasném přidělení a vy zaměstnanci přidělujete práci a dáváte pokyny. Smlouva zde neupravuje jen obchodní podmínky, ale i rozdělení povinností, které se týkají bezpečnosti a zdraví lidí pracujících na vašem pracovišti.',
      ],
    },
    {
      heading: 'Co má být sjednáno písemně',
      body: [
        'Nezávisle na modelu platí, že spory vznikají tam, kde se spoléhalo na ústní dohodu nebo na to, že „to je přece obvyklé“. Následující výčet není vyčerpávající, ale pokrývá body, které se v praxi ukazují jako rozhodující a jejichž doplnění po zahájení spolupráce už bývá jednostranně nevýhodné.',
      ],
      bullets: [
        'Rozsah zadání: pozice, kvalifikační požadavky, místo výkonu práce, směnnost',
        'Odměna, základ pro její výpočet a splatnost',
        'Exkluzivita a doba, na kterou se sjednává',
        'Doba platnosti smlouvy a způsob jejího prodloužení',
        'Ochrana předaných kandidátů a doba, po kterou se předání uplatní',
        'Ujednání o náhradě nebo vrácení části odměny při předčasném ukončení',
        'Rozdělení odpovědnosti za BOZP a OOPP na pracovišti uživatele',
        'Zajištění pracovnělékařských prohlídek a předání informací o rizicích',
        'Nakládání s osobními údaji kandidátů a zaměstnanců',
        'Způsob ukončení spolupráce a vypořádání rozpracovaných zadání',
      ],
    },
    {
      heading: 'Srovnatelné podmínky nejsou předmětem vyjednávání',
      body: [
        'U dočasného přidělení má agenturní zaměstnanec podle zákoníku práce nárok na srovnatelné mzdové a pracovní podmínky jako srovnatelný kmenový zaměstnanec uživatele. Není to ústupek, na kterém by šlo v jednání ušetřit; je to zákonný požadavek a smlouva jej může jen provést, nikoli změnit nebo vyloučit.',
        'Prakticky to znamená, že uživatel musí agentuře poskytnout údaje potřebné k jeho naplnění: kdo je srovnatelným zaměstnancem, jaké mzdové podmínky u dané práce platí a jaké příplatky a náhrady se vážou k rozvržení směn. Dodržování je předmětem kontroly orgánů inspekce práce, a proto by smlouva měla určit, kdo tyto údaje poskytuje a jak se aktualizují, když se podmínky u uživatele změní.',
      ],
    },
    {
      heading: 'BOZP, OOPP a pracovnělékařské prohlídky',
      body: [
        'Pracoviště řídí uživatel, formálním zaměstnavatelem je ale agentura – odpovědnost proto není jednostranná a smlouva by ji měla rozepsat na konkrétní úkony místo obecné věty o „součinnosti“. Uživatel zná rizika, prostředí a zařízení; agentura vede pracovněprávní dokumentaci a je adresátem povinností zaměstnavatele.',
        'Do smlouvy patří především to, kdo provádí školení o rizicích konkrétního pracoviště, kdo poskytuje a hradí OOPP, jak se předávají údaje potřebné pro pracovnělékařské prohlídky, kdo eviduje odpracovanou dobu a jak se postupuje při pracovním úrazu včetně hlášení a součinnosti při jeho šetření.',
      ],
      bullets: [
        'Vstupní a opakovaná školení o rizicích konkrétního pracoviště',
        'Poskytnutí a úhrada OOPP',
        'Předání údajů potřebných pro pracovnělékařské prohlídky',
        'Evidence odpracované doby a její předávání mezi stranami',
        'Postup a součinnost při pracovním úrazu',
      ],
    },
    {
      heading: 'Ochrana osobních údajů kandidátů',
      body: [
        'Při náboru mezi stranami putují životopisy, doklady o kvalifikaci a další osobní údaje. Smlouva by měla určit, v jakém rozsahu se předávají, k jakému účelu je smíte použít, jak dlouho je uchováváte a co se s nimi stane u kandidátů, kteří nenastoupí. Zvlášť pozorně je vhodné ošetřit kopie dokladů, které se u odborných pozic pořizují běžně – od certifikátů po podklady o zdravotní způsobilosti.',
        'Rozsah předávaných údajů má odpovídat účelu. Pokud dodavatel posílá víc, než je pro rozhodnutí o obsazení potřeba, není to služba navíc, ale riziko, které přechází na vás jako na příjemce.',
      ],
    },
    {
      heading: 'Náhrada při předčasném ukončení a konec spolupráce',
      body: [
        'Ujednání o náhradě patří k citlivým bodům a zároveň k těm, které se začnou řešit až ve chvíli, kdy jsou potřeba. Nejde o slib, že k odchodu nedojde – takový slib nikdo nemůže dát. Jde o dohodu, co se stane, pokud k němu dojde. Písemně proto patří rozhodné období, důvody, které se do něj počítají, a případy, které nárok vylučují: zrušení pozice, podstatná změna zadání, ukončení ze strany uživatele nebo nesplnění podmínek nástupu na jeho straně.',
        'Stejně tak má být jasné, jak spolupráce končí: výpovědní podmínky, vypořádání rozpracovaných zadání, osud dosud předaných kandidátů a to, která ujednání trvají i po ukončení. U dočasného přidělení k tomu přistupuje způsob odvolání přidělení a doběh mzdových nároků přidělených zaměstnanců.',
      ],
    },
  ],
  faq: [
    {
      q: 'Čím se liší smlouva u přímého náboru a dohoda o dočasném přidělení?',
      a: 'U přímého náboru je předmětem vyhledání kandidáta a zaměstnavatelem se stáváte vy. U dočasného přidělení zůstává zaměstnavatelem agentura práce a dohoda navíc řeší rozdělení povinností na pracovišti uživatele, srovnatelné podmínky a dobu přidělení.',
    },
    {
      q: 'Slibujete náhradu, když zaměstnanec brzy odejde?',
      a: 'Předem nic takového neslibujeme. Podmínky náhrady nebo vrácení části odměny jsou smluvní ujednání – s určeným rozhodným obdobím, důvody a případy, které nárok vylučují. Sjednávají se před zahájením spolupráce, ne po odchodu.',
    },
    {
      q: 'Kdo odpovídá za BOZP a OOPP u přidělených zaměstnanců?',
      a: 'BOZP na pracovišti zajišťuje po dobu dočasného přidělení uživatel, který pracoviště řídí a zná jeho rizika; agentuře jako zaměstnavateli zůstávají povinnosti, které vůči svému zaměstnanci má. Smlouva by měla rozepsat konkrétní úkony: školení o rizicích, poskytnutí a úhradu OOPP, evidenci pracovní doby a postup při pracovním úrazu.',
    },
    {
      q: 'Lze se smluvně dohodnout na horších podmínkách, než mají kmenoví zaměstnanci?',
      a: 'Nelze. Nárok na srovnatelné mzdové a pracovní podmínky vyplývá ze zákoníku práce a smlouva jej může pouze provést. Ujednání, které by jej obcházelo, vystavuje riziku obě strany včetně uživatele.',
    },
    {
      q: 'Nahrazuje tato stránka právní poradenství?',
      a: 'Nenahrazuje. Jde o obecné informace o tom, které body je vhodné mít ošetřené písemně. Konkrétní znění smlouvy je namístě posoudit s vlastním právním zástupcem.',
    },
  ],
  sources: [
    SRC.zakonikPrace,
    SRC.zakonOZamestnanosti,
    SRC.zakonBozp,
    SRC.zakonInspekcePrace,
    SRC.upcr,
    SRC.suip,
  ],
  internalLinks: [
    { href: '/jak-vybrat-personalni-agenturu', label: 'Jak vybrat personální agenturu' },
    { href: '/cena-sluzeb-personalni-agentury', label: 'Cena služeb personální agentury' },
    { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
    { href: '/primy-nabor-zamestnancu', label: 'Přímý nábor do kmenového stavu' },
    { href: '/povinnosti-zamestnavatele', label: 'Povinnosti zaměstnavatele' },
  ],
  cta: hireCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PROFESSIONAL_RECRUITMENT_PAGES: ReadonlyArray<SeoPage> = [
  NABOR_ODBORNYCH_POZIC,
  PRIMY_NABOR_ZAMESTNANCU,
  THP_POZICE,
  ODBORNA_ZPUSOBILOST_A_OPRAVNENI,
  UZNAVANI_KVALIFIKACE_ZAHRANICNICH_PRACOVNIKU,
  NABOR_SVARECU,
  STROJIRENSKE_PROFESE,
  NABOR_CNC_OPERATORU,
  NABOR_ELEKTRIKARU,
  UDRZBA_A_TECHNICKY_SERVIS,
  POZICE_V_RIZENI_KVALITY,
  MISTRI_A_VEDOUCI_SMEN,
  ODBORNE_POZICE_V_LOGISTICE,
  PRIME_OSLOVENI_KANDIDATU,
  PROC_SE_NEDARI_OBSADIT_ODBORNOU_POZICI,
  JAK_DLOUHO_TRVA_OBSAZENI_POZICE,
  CENA_SLUZEB_PERSONALNI_AGENTURY,
  JAK_VYBRAT_PERSONALNI_AGENTURU,
  SMLOUVA_S_PERSONALNI_AGENTUROU,
]
