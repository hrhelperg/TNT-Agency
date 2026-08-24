// Czech employer-cost calculator — the page the tool lives on.
//
// The prose is not decoration around a widget. A calculator that returns a
// number without saying which rule produced it is unauditable, and the numbers
// here decide what an employer budgets and what an employee is paid. So the
// article states the rules, names the statute behind each, and — more usefully
// than most such pages — says plainly what the calculator does NOT model and
// why.
//
// EVERY FIGURE ON THIS PAGE IS SOURCED. The rates, thresholds and amounts come
// from data/calculators/cz-employer-cost/2026/sources.ts, verified against
// ČSSZ, Finanční správa, MPSV and the public health insurers on 2026-08-24.
// Nothing here is a market average, a benchmark or a "typical" figure — the one
// category of number this site does not publish.
//
// THREE CORRECTIONS THIS PAGE MAKES ON PURPOSE, because the wrong version is
// what most Czech payroll material says:
//
//   1. Health insurance is ONE rate of 13,5 % rounded up ONCE and then split
//      into thirds. There is no statutory 9 % and no statutory 4,5 % — the
//      string "4,5" does not occur in zákon č. 592/1992 Sb. at all.
//   2. When the base falls below the minimum, the 13,5 % on the difference is
//      paid by the EMPLOYEE ALONE, not split with the employer.
//   3. Above the annual social maximum the EMPLOYER stops paying too, not just
//      the employee.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-08-24'

const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}

export const KALKULACKA_NAKLADU_ZAMESTNAVATELE: SeoPage = {
  slug: 'kalkulacka-nakladu-zamestnavatele',
  breadcrumbLabel: 'Kalkulačka nákladů zaměstnavatele',
  eyebrow: 'Mzdy a odvody · Česká republika · 2026',
  title: 'Kalkulačka nákladů zaměstnavatele ČR 2026: odvody, čistá mzda a celkový náklad',
  heroSubtitle:
    'Spočítejte, kolik zaměstnanec skutečně stojí zaměstnavatele a kolik dostane čistého. Výpočet podle pravidel platných v České republice pro rok 2026, s uvedením paragrafu u každé položky.',
  description:
    'Kalkulačka nákladů zaměstnavatele pro rok 2026: sociální a zdravotní pojištění, záloha na daň, čistá mzda a celkový náklad zaměstnavatele. Pravidla ČR 2026 s odkazem na zákon u každé částky.',
  keywords: [
    'kalkulačka nákladů zaměstnavatele',
    'kolik stojí zaměstnanec 2026',
    'odvody zaměstnavatele 2026',
    'čistá mzda 2026',
    'superhrubá mzda zrušena',
    'minimální vyměřovací základ zdravotního pojištění',
    'maximální vyměřovací základ 2026',
    'zákonné pojištění odpovědnosti zaměstnavatele',
  ],
  intro:
    'Hrubá mzda není náklad zaměstnavatele a není ani to, co zaměstnanec dostane. Mezi těmito dvěma čísly stojí sociální pojištění, zdravotní pojištění a záloha na daň — každé s vlastním vyměřovacím základem, vlastním zaokrouhlením a vlastními výjimkami. Tato stránka nese kalkulačku, která tyto částky spočítá podle pravidel platných v ČR pro rok 2026, a text pod ní vysvětluje, odkud se každá bere. U každé sazby je uveden paragraf, ze kterého plyne; hodnoty byly ověřeny u ČSSZ, Finanční správy, MPSV a zdravotních pojišťoven 24. srpna 2026.',
  sections: [
    {
      heading: 'Kolik stojí zaměstnanec zaměstnavatele v ČR',
      body: [
        'Statutární mzdový náklad zaměstnavatele se skládá ze čtyř položek: hrubé mzdy, sociálního pojištění zaměstnavatele, zdravotního pojištění zaměstnavatele a zákonného pojištění odpovědnosti za pracovní úraz. První tři jsou u standardního zaměstnance dané zákonem a pro danou hrubou mzdu vyjdou u každého zaměstnavatele v zemi stejně. Čtvrtá závisí na převažující činnosti firmy.',
        'U běžného zaměstnance činí sociální a zdravotní pojištění zaměstnavatele dohromady 33,8 % hrubé mzdy. Při hrubé mzdě 40 000 Kč to znamená 13 520 Kč navíc, tedy statutární náklad 53 520 Kč měsíčně — a to ještě bez zákonného pojištění odpovědnosti a bez čehokoli, co firma zaměstnanci poskytuje nad rámec mzdy.',
        'Kalkulačka výše drží tyto dvě vrstvy oddělené až do konce. Statutární náklad je právní fakt; benefity, ubytování, vybavení nebo nábor jsou rozhodnutí konkrétní firmy. Sečíst je do jednoho čísla by znamenalo vydávat firemní rozhodnutí za zákon.',
      ],
      bullets: [
        'Hrubá mzda',
        'Sociální pojištění zaměstnavatele 24,8 %',
        'Zdravotní pojištění zaměstnavatele — dvě třetiny z 13,5 %',
        'Zákonné pojištění odpovědnosti za pracovní úraz podle převažující činnosti',
      ],
    },
    {
      heading: 'Hrubá a čistá mzda: co se z čeho strhává',
      body: [
        'Zaměstnanci se z hrubé mzdy strhává sociální pojištění 7,1 %, zdravotní pojištění ve výši jedné třetiny z 13,5 % a záloha na daň z příjmů. Superhrubá mzda byla zrušena — základem daně jsou od té doby prostě příjmy ze závislé činnosti (§ 6 odst. 12 zákona o daních z příjmů). Hrubá mzda se tedy pro účely daně nenavyšuje o odvody zaměstnavatele.',
        'Druhá polovina téhož omylu je stejně častá: vlastní pojistné zaměstnance NENÍ odečitatelné od základu daně. Základem je hrubá mzda, nikoli hrubá mzda snížená o 7,1 % a 4,5 %.',
        'Při hrubé mzdě 40 000 Kč a podepsaném prohlášení poplatníka vychází čistá mzda 31 930 Kč: 2 840 Kč sociální, 1 800 Kč zdravotní, 3 430 Kč záloha na daň po základní slevě 2 570 Kč.',
      ],
    },
    {
      heading: 'Sociální pojištění zaměstnavatele',
      body: [
        'Standardní sazba zaměstnavatele je 24,8 % z vyměřovacího základu (§ 7 odst. 1 zákona č. 589/1992 Sb.) a dělí se na 21,5 % důchodové pojištění, 2,1 % nemocenské a 1,2 % státní politiku zaměstnanosti. Zaměstnanec platí 7,1 %.',
        '24,8 % ale není „sazba zaměstnavatele" bez dalšího. Zákon zná tři sazbové skupiny: 24,8 % pro běžné zaměstnance, 29,8 % pro zdravotnické záchranáře a členy jednotky HZS podniku a 27,8 % pro riziková zaměstnání v roce 2026. Poslední z nich je ročníkově odstupňovaná — v roce 2027 činí 28,8 % a od roku 2028 pak 29,8 % — takže ji nelze mezi roky přenášet. Kalkulačka nabízí všechny tři, ve výchozím stavu je nastavena běžná skupina.',
        'Důležitá hranice na spodním konci: pokud měsíční příjem nedosáhne rozhodné částky 4 500 Kč, zaměstnání nezakládá účast na nemocenském pojištění a sociální pojistné se neodvádí vůbec — ani za zaměstnance, ani za zaměstnavatele. Zdravotní pojištění žádnou takovou hranici nemá.',
      ],
      bullets: [
        'Běžný zaměstnanec 24,8 %',
        'Zdravotnický záchranář a člen jednotky HZS podniku 29,8 %',
        'Rizikové zaměstnání 27,8 % v roce 2026 (28,8 % v 2027, 29,8 % od 2028)',
        'Pod rozhodným příjmem 4 500 Kč se sociální pojistné neodvádí ani z jedné strany',
      ],
    },
    {
      heading: 'Zdravotní pojištění: jedna sazba, jedno zaokrouhlení, pak teprve třetiny',
      body: [
        'Toto je místo, kde se plete nejvíc kalkulaček. Zákon zná jedinou sazbu: „Výše pojistného činí 13,5 % z vyměřovacího základu" (§ 2 odst. 1 zákona č. 592/1992 Sb.). Pojistné se zaokrouhlí na celé koruny nahoru (§ 2 odst. 2) a teprve VÝSLEDEK se dělí — jednu třetinu hradí zaměstnanec, dvě třetiny zaměstnavatel (§ 9 odst. 2 zákona č. 48/1997 Sb.).',
        'Sazby 9 % a 4,5 % v zákoně nejsou. Řetězec „4,5" se v zákoně č. 592/1992 Sb. nevyskytuje ani jednou a § 9 odst. 1 zákona č. 48/1997 Sb. výslovně říká, že výši pojistného stanoví jiný zákon — tento tedy pouze dělí částku vypočtenou jinde.',
        'Rozdíl není akademický. Při vyměřovacím základu 22 401 Kč dává správný postup 3 025 Kč (0,135 × 22 401 = 3 024,135 → nahoru). Postup přes dvě samostatně zaokrouhlené sazby dá 1 009 + 2 017 = 3 026 Kč, tedy o korunu víc — a Přehled, který nesedí.',
      ],
    },
    {
      heading: 'Minimální vyměřovací základ zdravotního pojištění',
      body: [
        'Minimálním vyměřovacím základem zaměstnance je minimální mzda, tedy 22 400 Kč měsíčně pro rok 2026 (§ 3 odst. 6 zákona č. 592/1992 Sb.). Minimální pojistné z ní činí přesně 3 024 Kč.',
        'Minimum se NEKRÁTÍ podle úvazku. VZP to uvádí doslova — „bez ohledu na délku pracovního úvazku, zařazení zaměstnance, odpracovanou dobu" — takže zaměstnanec na dvacetiprocentní úvazek čelí celé hranici 22 400 Kč. Toto je nejčastější zdroj chyby v českých mzdových kalkulačkách.',
        'Klíčová otázka je, kdo doplatek platí. Ve výchozím případě hradí 13,5 % z rozdílu mezi skutečným a minimálním základem ZAMĚSTNANEC SÁM, prostřednictvím zaměstnavatele — doplatek se nedělí na třetiny a náklad zaměstnavatele nezvyšuje. Výjimka platí tehdy, vznikl-li nízký základ z důvodu překážky na straně zaměstnavatele; pak doplatek hradí zaměstnavatel (§ 3 odst. 10). Kalkulačka tuto okolnost nedokáže odvodit z čísel a ptá se na ni.',
        'Výjimky z minima jsou pro rok 2026 pětipoložkové a musí trvat po celé rozhodné období. Novela provedená zákonem č. 289/2025 Sb. s účinností od 1. ledna 2026 zrušila dosavadní písmeno o péči o dítě do 7 let a přeznačila zbývající; pečující rodiče se k výjimce dostávají nově jen přes kategorii, kde je plátcem pojistného stát.',
      ],
      bullets: [
        'Držitel průkazu ZTP nebo ZTP/P',
        'Osoba, která dosáhla důchodového věku, ale nevznikl jí nárok na starobní důchod',
        'Osoba současně samostatně výdělečně činná, odvádějící zálohy alespoň z minima OSVČ',
        'Osoba, za kterou je plátcem pojistného stát',
        'Osoba, které jsou poskytovány pouze odměny pěstouna',
      ],
    },
    {
      heading: 'Maximální vyměřovací základ sociálního pojištění',
      body: [
        'Maximální vyměřovací základ pro rok 2026 činí 2 350 416 Kč, tedy 48násobek průměrné mzdy 48 967 Kč (§ 15a zákona č. 589/1992 Sb.). Jde o ROČNÍ a KUMULATIVNÍ hranici, nikoli o měsíční strop — mzdová evidence k ní musí vést průběžný součet vyměřovacích základů od začátku roku.',
        'Nad stropem přestává platit i zaměstnavatel. § 15a odst. 4 vylučuje částku přesahující maximum i z vyměřovacího základu zaměstnavatele, takže mezní sociální náklad nad stropem je 0 % + 0 %, nikoli 0 % + 24,8 %. To je opak toho, co bývá uváděno.',
        'Zastavení odvodů ale platí jen tehdy, je-li zaměstnanec v daném roce zaměstnán u jediného zaměstnavatele. Při více zaměstnavatelích neodvádí méně nikdo z nich; zaměstnanec si přeplatek vyžádá sám a část zaměstnavatele se nevrací.',
        'Jediná měsíční mzda tuto informaci neobsahuje. Kalkulačka proto buď výslovně uvede, že předpokládá nedosažení stropu, nebo si v rozšířeném režimu vyžádá základ využitý od začátku roku. Předstírat, že měsíční číslo stačí, by znamenalo tichý odhad tam, kde jde o statisíce.',
      ],
    },
    {
      heading: 'Daň z příjmů zaměstnance a měsíční záloha',
      body: [
        'Postup je dán § 38h zákona o daních z příjmů a jeho pořadí je závazné. Základ pro výpočet zálohy se nejprve zaokrouhlí — do 100 Kč na celé koruny nahoru, nad 100 Kč na celé stokoruny nahoru. Z něj se počítá 15 % do měsíční hranice 146 901 Kč a 23 % z části nad ní. Součet se zaokrouhlí na celé koruny nahoru a teprve pak se odečítají slevy.',
        'Hranice 146 901 Kč je trojnásobek průměrné mzdy 48 967 Kč. Porovnává se se ZAOKROUHLENÝM základem, což má nečekaný důsledek: hrubá mzda přesně 146 901 Kč se zaokrouhlí na 147 000 Kč, a 99 Kč tak spadne do pásma 23 %.',
        'Bez podepsaného prohlášení poplatníka se měsíčně neuplatní nic — ani základní sleva 2 570 Kč, ani daňové zvýhodnění na děti (§ 38h odst. 5). Zaměstnanec je získá až v ročním zúčtování nebo v přiznání. Daňový nerezident může měsíčně uplatnit pouze základní slevu; slevy na invaliditu a ZTP/P až ročně.',
        'Uvnitř pracovního poměru se navíc může uplatnit srážková daň: nepodepsal-li zaměstnanec prohlášení a měsíční příjem nedosahuje 4 500 Kč, jde o samostatný základ daně zdaněný 15 % bez jakýchkoli slev, přičemž základ i daň se zaokrouhlují DOLŮ. U plného úvazku k tomu nedojde, u nástupu v polovině měsíce nebo neplaceného volna ano.',
      ],
      bullets: [
        'Základní sleva na poplatníka 2 570 Kč měsíčně',
        'Invalidita 1. a 2. stupně 210 Kč, 3. stupně 420 Kč měsíčně',
        'Držitel průkazu ZTP/P 1 345 Kč měsíčně',
        'Daňové zvýhodnění na děti 1 267 / 1 860 / 2 320 Kč podle pořadí, u dítěte se ZTP/P dvojnásobek',
      ],
    },
    {
      heading: 'Daňový bonus na děti',
      body: [
        'Přesáhne-li daňové zvýhodnění vypočtenou daň, vzniká rozdílem měsíční daňový bonus, který zaměstnavatel zaměstnanci vyplácí. Bonus není mzda a kalkulačka jej jako mzdu neuvádí — je to vyplacená část daňového zvýhodnění.',
        'Vyplácí se jen při splnění dvou podmínek zároveň: bonus musí činit alespoň 50 Kč a měsíční příjem u tohoto plátce musí dosáhnout alespoň poloviny minimální mzdy, tedy 11 200 Kč pro rok 2026 (§ 35d odst. 4). Horní hranice bonusu neexistuje.',
        'U nižších mezd s více dětmi proto může být čistá mzda vyšší než hrubá. Není to chyba výpočtu — je to přesně to, k čemu daňové zvýhodnění slouží.',
      ],
    },
    {
      heading: 'Zákonné pojištění odpovědnosti zaměstnavatele',
      body: [
        'Zákonné pojištění odpovědnosti za škodu při pracovním úrazu nebo nemoci z povolání je skutečný náklad zaměstnavatele a v kalkulaci celkového nákladu nemá chybět. Vzniká ze zákona, žádná smlouva se neuzavírá, a spravují je dvě pojišťovny podle historického klíče: Generali Česká pojišťovna zaměstnavatele, kteří měli k 31. 12. 1992 sjednáno pojištění u České pojišťovny, Kooperativa všechny ostatní.',
        'Sazba je jediná pro celého zaměstnavatele a odvíjí se od převažující základní činnosti tvořící předmět podnikání (§ 12 odst. 2 vyhlášky č. 125/1993 Sb.). Sazebník má osm pásem od 2,8 ‰ do 50,4 ‰ z vyměřovacího základu. Vyhláška neobsahuje žádné pravidlo zaokrouhlování.',
        'Vyměřovací základ je souhrn vyměřovacích základů všech zaměstnanců za UPLYNULÉ čtvrtletí a platí se do konce prvního měsíce čtvrtletí pojišťovaného. Roční maximální vyměřovací základ sociálního pojištění se na toto pojištění neuplatňuje — uvádějí to oba správci, i když sama vyhláška to nestanoví, a kalkulačka na tuto slabší oporu upozorňuje.',
        'Částka u jednotlivého zaměstnance je proto vždy ROZPOČTENÝ podíl, nikoli faktura. Ze stejného důvodu se minimální pojistné 100 Kč za čtvrtletí k podílu jednoho zaměstnance nepřičítá: je to minimum za celého zaměstnavatele.',
      ],
    },
    {
      heading: 'Co kalkulačka zahrnuje',
      body: [
        'Kalkulačka počítá standardní pracovní poměr (HPP) podle pravidel roku 2026. U každé částky uvádí sazbu, základ, použité zaokrouhlení a paragraf.',
      ],
      bullets: [
        'Sociální pojištění zaměstnance i zaměstnavatele včetně ročního maxima',
        'Zdravotní pojištění včetně minimálního vyměřovacího základu a určení plátce doplatku',
        'Zálohu na daň podle § 38h, slevy na dani a daňové zvýhodnění na děti',
        'Srážkovou daň tam, kde se podle zákona uplatní',
        'Slevu na pojistném zaměstnavatele u zkrácených úvazků v rozsahu měřitelných podmínek',
        'Slevu pro pracujícího starobního důchodce',
        'Zákonné pojištění odpovědnosti jako rozpočtený podíl',
        'Firemní náklady nad rámec mzdy jako oddělenou vrstvu',
      ],
    },
    {
      heading: 'Co kalkulačka nezahrnuje a proč',
      body: [
        'Seznam níže není výčtem chybějících funkcí. Jde o případy, kde pravidlo nelze doložit dostatečně silným primárním pramenem, nebo kde jde o právní posouzení, které z čísel odvodit nelze. V takové situaci kalkulačka raději řekne, že případ vyžaduje individuální mzdový výpočet, než aby vrátila číslo, které je skoro správně.',
        'Dohody o provedení práce a o pracovní činnosti nejsou v této verzi zahrnuty vůbec. Mají vlastní hranice účasti na pojištění a vlastní zdanění a poloviční verze by byla horší než žádná.',
      ],
      bullets: [
        'Zaokrouhlení třetin zdravotního pojištění, není-li pojistné dělitelné třemi — zákon ani metodika je nestanoví',
        'Přesný vzorec poměrného krácení minimálního základu za neúplný měsíc',
        'Rozdělení doplatku, vznikl-li nízký základ zčásti překážkou na straně zaměstnavatele a zčásti jinak',
        'Náhrada mzdy za prvních 14 dnů nemoci',
        'Souběh zaměstnání u více zaměstnavatelů',
        'Dohody DPP a DPČ',
      ],
    },
    {
      heading: 'Dovolená a nemocnost: proč je kalkulačka nepřipočítává',
      body: [
        'Čtyři týdny dovolené se k měsíční mzdě NEPŘIPOČÍTÁVAJÍ jako další procento. U zaměstnance s měsíční mzdou je placené volno už součástí mzdové struktury — mzda za měsíc s dovolenou je táž jako za měsíc bez ní. Přičíst dovolenou zvlášť by znamenalo započítat tutéž mzdu dvakrát.',
        'Chce-li zaměstnavatel modelovat náklad zastoupení po dobu dovolené, jde o samostatný provozní náklad, nikoli o navýšení mzdy. Do pole pro další firemní náklady jej lze zadat, ale kalkulačka jej sama nevymýšlí.',
        'Stejně tak se do výpočtu nezanáší žádná „průměrná nemocnost". Náhradu mzdy za prvních 14 dnů pracovní neschopnosti tato verze nepočítá, protože redukční mechanika a její zaokrouhlení nejsou z primárních pramenů doložitelné v celém rozsahu; vymyšlený průměr by byl horší než přiznaná mezera.',
      ],
    },
    {
      heading: 'Zdroje a metodika',
      body: [
        'Každá sazba, hranice a částka v kalkulačce má v datech uvedený zdroj, právní základ a stav ověření. Hodnoty byly ověřeny 24. srpna 2026 u České správy sociálního zabezpečení, Finanční správy ČR, Ministerstva práce a sociálních věcí a veřejných zdravotních pojišťoven; sazebník zákonného pojištění odpovědnosti pochází z vyhlášky č. 125/1993 Sb. a z metodiky jejích správců.',
        'Pravidla jsou vedena po ročnících. Výpočet za rok 2026 zůstane reprodukovatelný i poté, co vyjdou nařízení vlády pro rok 2027 — ta se přidávají vedle, nikoli přepisem. Podzim je také okamžik, kdy se má tato sada znovu ověřit, protože tehdy začínají být známy parametry následujícího roku.',
        'Tam, kde se prameny rozcházejí nebo kde pravidlo stanoví jen princip bez vzorce, to kalkulačka u konkrétní položky říká. Týká se to zaokrouhlení třetin zdravotního pojištění, poměrného krácení minimálního základu a neuplatnění ročního maxima u zákonného pojištění odpovědnosti.',
      ],
    },
  ],
  faq: [
    {
      q: 'Kolik procent odvádí zaměstnavatel za zaměstnance v roce 2026?',
      a: 'U běžného zaměstnance 24,8 % na sociální pojištění a dvě třetiny z 13,5 % na zdravotní pojištění, dohromady 33,8 % hrubé mzdy. K tomu se přidává zákonné pojištění odpovědnosti za pracovní úraz, jehož sazba se řídí převažující činností zaměstnavatele a pohybuje se od 2,8 ‰ do 50,4 ‰.',
    },
    {
      q: 'Platí se ještě superhrubá mzda?',
      a: 'Ne. Superhrubá mzda byla zrušena a základem daně jsou podle § 6 odst. 12 zákona o daních z příjmů prostě příjmy ze závislé činnosti. Hrubá mzda se o odvody zaměstnavatele nenavyšuje. Zároveň platí, že vlastní pojistné zaměstnance není od základu daně odečitatelné.',
    },
    {
      q: 'Proč je zdravotní pojištění 13,5 % a ne 9 % plus 4,5 %?',
      a: 'Protože sazby 9 % a 4,5 % v zákoně nejsou. Zákon č. 592/1992 Sb. zná jedinou sazbu 13,5 %, pojistné se z ní zaokrouhlí na celé koruny nahoru a teprve výsledek se dělí — třetinu hradí zaměstnanec, dvě třetiny zaměstnavatel. Počítat obě sazby zvlášť a každou zaokrouhlit vede k odvodu o korunu vyššímu.',
    },
    {
      q: 'Kdo platí doplatek do minimálního vyměřovacího základu zdravotního pojištění?',
      a: 'Ve výchozím případě zaměstnanec sám, prostřednictvím zaměstnavatele — 13,5 % z rozdílu mezi skutečným a minimálním základem se nedělí na třetiny. Zaměstnavatel jej hradí jen tehdy, vznikl-li nízký základ z důvodu překážky na jeho straně.',
    },
    {
      q: 'Krátí se minimální vyměřovací základ u zkráceného úvazku?',
      a: 'Nekrátí. VZP to uvádí výslovně: minimum platí bez ohledu na délku pracovního úvazku. Zaměstnanec na dvacetiprocentní úvazek čelí celé hranici 22 400 Kč. Poměrné krácení podle kalendářních dnů je něco jiného a týká se neúplného měsíce nebo zákonem vyjmenovaných překážek.',
    },
    {
      q: 'Co se stane po dosažení maximálního vyměřovacího základu?',
      a: 'U zaměstnance zaměstnaného v daném roce u jediného zaměstnavatele přestává z částky nad 2 350 416 Kč odvádět nejen zaměstnanec, ale i zaměstnavatel. Při více zaměstnavatelích neodvádí méně nikdo; zaměstnanec si přeplatek vyžádá sám a část zaměstnavatele se nevrací.',
    },
    {
      q: 'Kdy může být čistá mzda vyšší než hrubá?',
      a: 'Tehdy, když daňové zvýhodnění na děti přesáhne vypočtenou daň a vznikne měsíční daňový bonus. Vyplácí se, činí-li alespoň 50 Kč a dosahuje-li měsíční příjem alespoň poloviny minimální mzdy, tedy 11 200 Kč pro rok 2026. Bonus není mzda, ale vyplacená část daňového zvýhodnění.',
    },
    {
      q: 'Počítá kalkulačka dohody DPP a DPČ?',
      a: 'Nepočítá. Dohody mají vlastní hranice účasti na pojištění i vlastní zdanění a tato verze je záměrně nezahrnuje — poloviční implementace by u nich vracela čísla, která vypadají správně a nejsou.',
    },
    {
      q: 'Připočítává kalkulačka čtyři týdny dovolené k nákladu?',
      a: 'Nepřipočítává, a je to záměr. U zaměstnance s měsíční mzdou je placené volno součástí mzdové struktury; přičíst dovolenou jako další procento by znamenalo započítat tutéž mzdu dvakrát. Náklad zastoupení po dobu dovolené lze zadat samostatně jako provozní náklad.',
    },
  ],
  sources: [
    SRC.zakonSocialni,
    SRC.zakonZdravotni,
    SRC.zakonDaneZPrijmu,
    SRC.zakonikPrace,
    SRC.vyhlaskaZakonnePojisteni,
    SRC.cssz,
    SRC.financniSprava,
    SRC.mpsv,
    SRC.vzp,
  ],
  internalLinks: [
    { href: '/kolik-stoji-zamestnanec', label: 'Kolik stojí zaměstnanec' },
    { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
    { href: '/neprime-naklady-na-zamestnance', label: 'Nepřímé náklady na zaměstnance' },
    { href: '/socialni-zdravotni-dane-2026', label: 'Sociální, zdravotní a daně 2026' },
    { href: '/minimalni-mzda-2026', label: 'Minimální mzda 2026' },
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
