// Kalkulačka nákladů zaměstnavatele pro Německo — stránka, na které nástroj žije.
//
// POZOR: TATO STRÁNKA POPISUJE NĚMECKÉ PRÁVO, nikoli české. Je to první stránka
// tohoto webu, která to dělá, a text to říká hned v úvodu a v každé sekci, kde
// by si český čtenář mohl domyslet českou úpravu.
//
// KAŽDÉ ČÍSLO NA TÉTO STRÁNCE MÁ ZDROJ. Sazby a stropy pocházejí z
// data/calculators/de-employer-cost/2026/sources.ts a byly ověřeny
// 24. srpna 2026 přímo v textu zákonů (SGB III, V, VI, XI, BVV), v nařízení
// SVRechGrV 2026 a v přehledu GKV-Spitzenverbandu. Žádný údaj nepochází
// z mzdového blogu ani z marketingové stránky pojišťovny.
//
// TŘI VĚCI, KTERÉ TATO STRÁNKA ŘÍKÁ JINAK, než jak se běžně píše:
//
//   1. Strop pro zdravotní a pečovatelské pojištění (69 750 €) NENÍ totéž co
//      hranice povinné účasti (77 400 €). Rozdíl je 7 650 € ročně a záměna
//      obou čísel je nejčastější chyba v této jurisdikci.
//   2. Sleva na pečovatelském pojištění od druhého dítěte snižuje POUZE podíl
//      zaměstnance. Zaměstnavatel platí 1,8 % bez ohledu na počet dětí.
//   3. Sasko nepřidává procentní bod navíc — přesouvá půl bodu ze
//      zaměstnavatele na zaměstnance. Celková sazba zůstává 3,6 %.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-08-24'

const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'DE',
  isGeneralInformation: true,
}

export const KALKULACKA_NAKLADU_ZAMESTNAVATELE_NEMECKO: SeoPage = {
  slug: 'kalkulacka-nakladu-zamestnavatele-nemecko',
  breadcrumbLabel: 'Kalkulačka nákladů zaměstnavatele — Německo',
  eyebrow: 'Mzdy a odvody · Německo · 2026',
  title: 'Kalkulačka nákladů zaměstnavatele Německo 2026: odvody, čistá mzda, celkový náklad',
  heroSubtitle:
    'Spočítejte, kolik zaměstnanec stojí německého zaměstnavatele a kolik mu zůstane čistého. Výpočet podle německých pravidel pro rok 2026, s uvedením paragrafu u každé položky.',
  description:
    'Kalkulačka nákladů zaměstnavatele v Německu pro rok 2026: důchodové, zdravotní, pečovatelské pojištění a pojištění v nezaměstnanosti, daň ze mzdy podle oficiálního postupu BMF, čistá mzda a celkový náklad. Německá pravidla 2026 s odkazem na zákon u každé částky.',
  keywords: [
    'náklady zaměstnavatele Německo 2026',
    'kolik stojí zaměstnanec v Německu',
    'čistá mzda Německo 2026',
    'sociální pojištění Německo sazby 2026',
    'Beitragsbemessungsgrenze 2026',
    'daňová třída Německo',
    'práce v Německu odvody',
    'minijob hranice 2026',
  ],
  intro:
    'Hrubá mzda v Německu není nákladem zaměstnavatele a není ani tím, co zaměstnanec dostane. Mezi těmito dvěma čísly stojí čtyři složky německého sociálního pojištění, daň ze mzdy počítaná podle oficiálního algoritmu německého ministerstva financí, solidární příplatek a případně církevní daň — každá s vlastním vyměřovacím základem, vlastním stropem a vlastním zaokrouhlením. Tato stránka nese kalkulačku, která je spočítá podle německých pravidel platných pro rok 2026, a text pod ní vysvětluje, odkud se každá bere. Pozor: jde o německé právo, nikoli české; obě úpravy se v této oblasti liší podstatně, nikoli jen výší sazeb.',
  sections: [
    {
      heading: 'Kolik stojí zaměstnanec německého zaměstnavatele',
      body: [
        'Zákonný mzdový náklad německého zaměstnavatele má tři vrstvy: hrubou mzdu, podíl zaměstnavatele na čtyřech složkách sociálního pojištění a odvody, které nese zaměstnavatel sám. U běžného zaměstnance pod stropy činí podíl zaměstnavatele na pojištění zhruba 21 % hrubé mzdy.',
        'K tomu se přidávají odvody U1, U2 a U3 a zákonné úrazové pojištění. U1 a U2 stanoví každá zdravotní pojišťovna vlastními stanovami, takže se mezi pojišťovnami liší o celé procentní body; úrazové pojištění vyměřuje profesní sdružení podle rizikového tarifu až zpětně za celý rok. Ani jedno nemá obecnou sazbu, kterou by šlo předpokládat — kalkulačka se na ně proto ptá a neodhaduje je.',
        'Při hrubé mzdě 4 000 € měsíčně a průměrné doplňkové sazbě zdravotní pojišťovny dávají čtyři složky pojištění spolu s odvodem na insolvenční dávku náklad zaměstnavatele 4 852,00 €, tedy faktor 1,21 na hrubou mzdu. Odvody U1 a U2 ani úrazové pojištění v tom záměrně nejsou: obecnou sazbu nemají, jakékoli uvedené číslo by bylo vymyšlené. Nad stropy tento faktor klesá, protože odvody se zastaví a hrubá mzda roste dál.',
      ],
      bullets: [
        'Hrubá mzda',
        'Důchodové pojištění — polovina z 18,6 %',
        'Pojištění v nezaměstnanosti — polovina z 2,6 %',
        'Zdravotní pojištění — polovina z 14,6 % a polovina doplňkové sazby pojišťovny',
        'Pečovatelské pojištění — 1,8 % (v Sasku 1,3 %)',
        'Odvod na insolvenční dávku U3 ve výši 0,15 %',
        'Odvody U1 a U2 podle stanov zdravotní pojišťovny',
        'Zákonné úrazové pojištění podle rizikového tarifu profesního sdružení',
      ],
    },
    {
      heading: 'Dva stropy, které se pletou nejčastěji',
      body: [
        'Německo má pro rok 2026 dva různé stropy a jednu hranici, která stropem není. Zdravotní a pečovatelské pojištění se odvádí z příjmu do 5 812,50 € měsíčně (69 750 € ročně). Důchodové pojištění a pojištění v nezaměstnanosti mají strop vyšší: 8 450 € měsíčně, tedy 101 400 € ročně.',
        'Třetím číslem je hranice povinné účasti ve veřejném zdravotním pojištění — 77 400 € ročně. Nad ní se zaměstnanec může pojistit soukromě. Není to strop pro odvody a nikdy jím nebyla; kdo ji za strop zamění, nadhodnotí vyměřovací základ o 7 650 € ročně. Kalkulačka obě čísla vede odděleně a v metodice je pojmenovává.',
        'Pro rok 2026 platí jediná sada hodnot pro celé Německo. Oddělený strop pro nové spolkové země, který starší tabulky ještě uvádějí, v nařízení SVRechGrV 2026 už není — rozlišení východ/západ se u těchto veličin nepoužívá.',
      ],
      bullets: [
        'Zdravotní a pečovatelské pojištění: 5 812,50 € měsíčně',
        'Důchodové pojištění a pojištění v nezaměstnanosti: 8 450 € měsíčně',
        'Hranice povinné účasti ve zdravotním pojištění: 77 400 € ročně — nikoli strop',
        'Referenční veličina (Bezugsgröße): 3 955 € měsíčně',
      ],
    },
    {
      heading: 'Daň ze mzdy se nepočítá procentem',
      body: [
        'Německá daň ze mzdy není součin hrubé mzdy a sazby. Ministerstvo financí každoročně vydává Programmablaufplan — závazný algoritmus o 23 podprogramech, který příjem převede na roční hodnotu, odečte paušály příslušné dané daňové třídě, spočítá takzvanou Vorsorgepauschale z fiktivních pojistných sazeb, aplikuje tarif podle § 32a EStG a výsledek zase rozpočítá na období. Pořadí kroků je součástí předpisu a každý mezivýsledek má předepsaný počet desetinných míst.',
        'Kalkulačka tento postup provádí krok za krokem podle znění pro rok 2026 (sdělení BMF z 12. listopadu 2025). Implementace beze zbytku reprodukuje obě úřední kontrolní tabulky, které ministerstvo k algoritmu zveřejňuje — 516 hodnot napříč všemi šesti daňovými třídami, pro zaměstnance pojištěného ve všech složkách i pro zaměstnance nepojištěného v žádné.',
        'Daňová třída sama o sobě neurčuje roční daň, jen její zálohové rozdělení během roku. Třídy V a VI mají vlastní konstrukci: nejméně 14 % základu, pak pásmo se sazbou 42 % a nad 222 260 € ročně 45 %. Běžným tarifem se z nich proto počítat nedá.',
      ],
    },
    {
      heading: 'Pečovatelské pojištění: děti, bezdětnost a Sasko',
      body: [
        'Pečovatelské pojištění je jediná složka, kde se podíly obou stran liší. Základní sazba činí 3,6 %; zákon v § 55 odst. 1 SGB XI stále uvádí 3,4 % a aktuální hodnotu stanoví nařízení vydané podle odstavce 1a — kdo si přečte jen zákon, počítá o 0,2 bodu méně.',
        'Zaměstnanec bez dětí platí od konce měsíce, v němž mu bylo 23 let, příplatek 0,6 bodu navíc. Naopak od druhého do pátého dítěte mladšího 25 let se jeho podíl snižuje o 0,25 bodu za dítě. Obojí nese zaměstnanec sám: podíl zaměstnavatele zůstává 1,8 % ve všech rodinných situacích. Zákonný text zní, jako by sleva snižovala celou sazbu, a tedy i podíl zaměstnavatele — publikované tabulky pojišťoven i oficiální daňový algoritmus však ukazují opak.',
        'V Sasku platí zvláštní pravidlo podle § 58 odst. 3 SGB XI: zaměstnanec nese jeden procentní bod sám a zbytek se dělí napůl, takže vychází 2,3 % zaměstnanec a 1,3 % zaměstnavatel. Celková sazba se nemění — bod se přesouvá, nikoli přidává.',
      ],
      bullets: [
        'Základní sazba 3,6 %, dělená napůl',
        'Bezdětný zaměstnanec od 23 let: +0,6 bodu, nese sám',
        'Druhé až páté dítě do 25 let: −0,25 bodu za dítě, jen zaměstnanci',
        'Sasko: 2,3 % zaměstnanec / 1,3 % zaměstnavatel',
      ],
    },
    {
      heading: 'Doplňková sazba zdravotní pojišťovny není jedno číslo',
      body: [
        'Vedle obecné sazby 14,6 % vybírá každá německá zdravotní pojišťovna vlastní doplňkovou sazbu podle § 242 SGB V. Ministerstvo zdravotnictví vyhlašuje pouze průměr — pro rok 2026 činí 2,9 % — a ten platí jen pro případy, které zákon vyjmenovává. Sazba konkrétní pojišťovny může být výrazně vyšší i nižší.',
        'Od 1. ledna 2019 se doplňková sazba dělí mezi zaměstnance a zaměstnavatele stejně jako obecná. Starší popisy, podle kterých ji nese zaměstnanec sám, jsou překonané, a rozdíl je citelný: při sazbě 2,9 % jde o zhruba 1,45 % hrubé mzdy navíc na straně zaměstnavatele.',
        'Kalkulačka proto doplňkovou sazbu bere jako vstup s předvyplněným průměrem 2,9 % a označuje ji jako předvolbu, nikoli jako fakt o konkrétním zaměstnanci.',
      ],
    },
    {
      heading: 'Co kalkulačka nepočítá a proč',
      body: [
        'Minijob a přechodové pásmo (Übergangsbereich) kalkulačka odmítne spočítat. Do 603 € měsíčně platí zaměstnavatel paušální odvody místo běžných; od této hranice do 2 000 € se vyměřovací základ snižuje faktorem F a rozdíl nese zaměstnavatel. V obou případech nejde o menší verzi běžného výpočtu, ale o jiný režim — běžný výpočet by vrátil číslo, které vypadá věrohodně a odpovídá na jinou otázku.',
        'Dále kalkulačka odmítá případy, které z čísel poznat nelze a na které se proto ptá: krátkodobé zaměstnání, učně, dobrovolnickou službu, soukromé zdravotní pojištění, úředníky, souběh zaměstnání, pracující důchodce, hornické pojištění, profesní komory, kurzarbeit, jednorázové výplaty, přeshraniční situace, studenty pracující při studiu, praxe a stáže, stavebnictví a nepeněžní plnění. U každého případu uvádí důvod.',
        'Nezohledňuje se ani zastropení progrese církevní daně. Přiznává se zpravidla až v ročním zúčtování a obvykle na žádost, jeho základem je zdanitelný příjem, který zaměstnavatel nezná, a sazbu určuje usnesení konkrétní církve. Zaměstnavatel proto sráží nezastropenou částku a kalkulačka ukazuje totéž — s poznámkou, že zastropení existuje.',
      ],
      bullets: [
        'Minijob do 603 € měsíčně',
        'Přechodové pásmo do 2 000 € měsíčně',
        'Soukromé zdravotní pojištění',
        'Úředníci a osoby s profesním zaopatřením',
        'Souběh více zaměstnání',
        'Jednorázové výplaty a nepeněžní plnění',
      ],
    },
    {
      heading: 'Zdroje a metodika',
      body: [
        'Daň ze mzdy vychází z Programmablaufplanu Spolkového ministerstva financí pro rok 2026, sociální pojištění z SGB III, V, VI a XI, aritmetika odvodů z Beitragsverfahrensverordnung a stropy z nařízení SVRechGrV 2026 (BGBl. 2025 I Nr. 278). Hodnoty byly ověřeny 24. srpna 2026 přímo v textu předpisů a porovnány s přehledem GKV-Spitzenverbandu z 26. listopadu 2025.',
        'Odvody se počítají podle § 2 odst. 1 BVV: u rovnoměrně dělených složek se použije poloviční sazba, výsledek se zaokrouhlí a teprve pak zdvojnásobí. Není to totéž jako spočítat celý odvod a rozdělit jej — obě cesty se u běžných mezd liší o cent. Mezivýsledky se podle § 1 odst. 2 BVV nezaokrouhlují vůbec.',
        'Pravidla jsou vedena po ročnících. Výpočet za rok 2026 zůstane reprodukovatelný i po vydání parametrů pro rok 2027. Stojí za zmínku, že německý zákon o stabilizaci sazeb zdravotního pojištění z 24. července 2026 změnil § 223 SGB V uprostřed roku — všechna jeho ustanovení však míří až na rok 2027 a na mzdu za rok 2026 nedopadají.',
      ],
    },
  ],
  faq: [
    {
      q: 'Kolik procent odvádí zaměstnavatel za zaměstnance v Německu v roce 2026?',
      a: 'U běžného zaměstnance pod stropy zhruba 21 % hrubé mzdy: 9,3 % důchodové pojištění, 1,3 % pojištění v nezaměstnanosti, 7,3 % zdravotní pojištění plus polovina doplňkové sazby pojišťovny a 1,8 % pečovatelské pojištění. K tomu se přidávají odvody U1, U2, U3 a zákonné úrazové pojištění, které obecnou sazbu nemají.',
    },
    {
      q: 'Jaký je rozdíl mezi 69 750 € a 77 400 €?',
      a: 'První číslo je strop pro odvody na zdravotní a pečovatelské pojištění: nad ním se z vyšší mzdy neodvádí. Druhé je hranice povinné účasti ve veřejném zdravotním pojištění — nad ní se zaměstnanec může pojistit soukromě. Záměna obou nadhodnotí vyměřovací základ o 7 650 € ročně a je nejčastější chybou v německé mzdové agendě.',
    },
    {
      q: 'Sníží se zaměstnavateli odvod, když má zaměstnanec děti?',
      a: 'Nesníží. Podíl zaměstnavatele na pečovatelském pojištění činí 1,8 % bez ohledu na počet dětí. Sleva 0,25 bodu za každé druhé až páté dítě mladší 25 let se promítá pouze do podílu zaměstnance, stejně jako příplatek 0,6 bodu pro bezdětné.',
    },
    {
      q: 'Platí se v Sasku vyšší pečovatelské pojištění?',
      a: 'Celkově ne. Sazba zůstává 3,6 %, ale rozděluje se jinak: zaměstnanec nese 2,3 % a zaměstnavatel 1,3 %. Podle § 58 odst. 3 SGB XI nese zaměstnanec jeden procentní bod sám, protože Sasko na rozdíl od ostatních zemí nezrušilo státní svátek připadající na pracovní den.',
    },
    {
      q: 'Proč kalkulačka nespočítá mzdu 1 800 €?',
      a: 'Protože spadá do přechodového pásma, které sahá do 2 000 € měsíčně. V něm se vyměřovací základ snižuje faktorem F a rozdíl nese zaměstnavatel, takže běžný výpočet by vrátil chybné podíly na obou stranách. Kalkulačka proto výpočet odmítne a řekne proč.',
    },
    {
      q: 'Podle čeho se určuje sazba církevní daně?',
      a: 'Podle spolkové země, kde sídlí provozovna, nikoli podle bydliště zaměstnance. V Bavorsku a Bádensku-Württembersku činí 8 %, v ostatních čtrnácti zemích 9 %. Zaměstnanec bydlící v Bavorsku a pracující v Hesensku má tedy sraženo 9 % a rozdíl mu vrátí až roční zúčtování.',
    },
    {
      q: 'Snižuje Kinderfreibetrag daň ze mzdy?',
      a: 'Nesnižuje. Snižuje pouze základ pro solidární příplatek a církevní daň. Samotná daň ze mzdy zůstává stejná, protože rodina dostává během roku přídavky na děti; teprve roční zúčtování porovná, co je výhodnější.',
    },
    {
      q: 'Je výsledek použitelný jako mzdový výměr?',
      a: 'Není. Jde o modelový výpočet za jeden celý měsíc při stálé mzdě. Skutečné zúčtování pracuje s neúplnými měsíci, jednorázovými výplatami, nepeněžními plněními a individuálními údaji z ELStAM, které kalkulačka nezná.',
    },
  ],
  sources: [
    SRC.bmfPap2026,
    SRC.svRechgroessen2026,
    SRC.sgbV,
    SRC.sgbVI,
    SRC.sgbXI,
    SRC.sgbIII,
    SRC.bvv,
    SRC.gkvRechengroessen2026,
  ],
  internalLinks: [
    { href: '/kalkulacka-nakladu-zamestnavatele', label: 'Kalkulačka nákladů zaměstnavatele ČR' },
    { href: '/kolik-stoji-zamestnanec', label: 'Kolik stojí zaměstnanec' },
    { href: '/cena-neobsazene-pozice', label: 'Cena neobsazené pozice' },
    { href: '/pro-zamestnavatele', label: 'Pro zaměstnavatele: rozcestník' },
  ],
  cta: {
    eyebrow: 'Nábor a mzdové náklady',
    title: 'Řešíte konkrétní pozici?',
    text: 'Náklad pracovního místa si můžete namodelovat výše. Pokud potřebujete pozici obsadit, popište nám ji a probereme možnosti.',
    buttonLabel: 'Zadat poptávku',
    href: '/poptavka-pracovniku',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}
