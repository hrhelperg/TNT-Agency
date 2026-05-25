// Support SEO pages — topical depth around the cornerstones. Each page targets
// a specific long-tail topic, links back to the relevant pillars and keeps all
// facts qualitative and source-backed. No invented rates, amounts or deadlines.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-05-23'
const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}
const faqHubLink = {
  href: '/faq-zamestnavani-pracovniku',
  label: 'Časté dotazy k zaměstnávání pracovníků',
}
const consultCta = {
  eyebrow: 'Nábor a administrativa',
  title: 'Potřebujete s tím pomoci?',
  text: 'Pomůžeme vám s náborem i s orientací v administrativě tak, aby vše odpovídalo aktuálním pravidlům a oficiálním zdrojům.',
  buttonLabel: 'Domluvit konzultaci',
  href: '/contact',
}

export const MODRA_KARTA_CR: SeoPage = {
  slug: 'modra-karta-cr',
  breadcrumbLabel: 'Modrá karta',
  eyebrow: 'Pracovní právo · Cizinci',
  title: 'Modrá karta v ČR: oprávnění pro vysoce kvalifikované pracovníky',
  heroSubtitle:
    'Co je modrá karta, pro koho je určená a jak souvisí s evropským rámcem pro vysoce kvalifikované pracovníky. Obecné informace s odkazy na oficiální zdroje.',
  description:
    'Modrá karta v ČR – duální oprávnění k pobytu a zaměstnání pro vysoce kvalifikované pracovníky ze třetích zemí. Komu je určená, jak se o ni žádá a kde ověřit podmínky.',
  keywords: ['modrá karta', 'modrá karta ČR', 'EU Blue Card', 'vysoce kvalifikovaní pracovníci', 'pobyt cizinců', 'zaměstnanecká karta'],
  intro:
    'Modrá karta je duální oprávnění, které spojuje povolení k dlouhodobému pobytu i k zaměstnání a je určené pro vysoce kvalifikované pracovníky ze třetích zemí. Vychází z evropského rámce pro modrou kartu a v České republice ji vydává Ministerstvo vnitra. Tato stránka vysvětluje, pro koho je modrá karta vhodná, jak se obecně liší od zaměstnanecké karty a kde ověřit aktuální podmínky. Neuvádíme konkrétní lhůty ani poplatky, protože se mohou měnit a měly by se ověřit u příslušného úřadu.',
  sections: [
    {
      heading: 'Pro koho je modrá karta určená',
      body: [
        'Modrá karta cílí na pracovníky s vysokou kvalifikací, typicky doloženou vyšším vzděláním nebo srovnatelnou odbornou kvalifikací, kteří mají v ČR sjednanou odpovídající pracovní pozici. Slouží jako jedno oprávnění pro pobyt i pro výkon práce.',
        'Oproti zaměstnanecké kartě je modrá karta zaměřená na kvalifikované pozice a je součástí celoevropského schématu, které usnadňuje mobilitu vysoce kvalifikovaných pracovníků v rámci EU.',
      ],
    },
    {
      heading: 'Jak žádost obvykle probíhá',
      body: [
        'Před podáním žádosti bývá nutné nahlásit volné pracovní místo Úřadu práce ČR. Žádost o modrou kartu se poté podává Ministerstvu vnitra (Odbor azylové a migrační politiky), které o ní rozhoduje.',
        'Konkrétní přílohy, lhůty a podmínky (například požadovaná výše odměny u kvalifikovaných pozic) se mohou měnit. Aktuální informace zveřejňuje Ministerstvo vnitra; tato stránka je záměrně neuvádí.',
      ],
      bullets: [
        'Nahlášení volného místa Úřadu práce ČR',
        'Podání žádosti u Ministerstva vnitra (OAMP)',
        'Doložení kvalifikace a pracovní smlouvy',
        'Nástup až po nabytí platnosti karty',
      ],
    },
    {
      heading: 'Praktická interpretace pro zaměstnavatele',
      body: [
        'Modrá karta je vhodná tam, kde firma obsazuje odbornou pozici a kandidát splňuje kvalifikační předpoklady. Pro zaměstnavatele je důležité hlídat platnost karty a plnit oznamovací povinnosti při změnách pracovního poměru.',
      ],
    },
  ],
  faq: [
    { q: 'Jaký je rozdíl mezi modrou a zaměstnaneckou kartou?', a: 'Modrá karta je zaměřená na vysoce kvalifikované pozice a je součástí evropského schématu. Zaměstnanecká karta je obecnější duální oprávnění. Obě vydává Ministerstvo vnitra; vhodný typ závisí na kvalifikaci a pozici.' },
    { q: 'Kdo modrou kartu vydává?', a: 'Modrou kartu vydává Ministerstvo vnitra ČR, Odbor azylové a migrační politiky. Před podáním žádosti je obvykle nutné nahlásit volné pracovní místo Úřadu práce ČR.' },
    { q: 'Jaké podmínky musí pracovník splnit?', a: 'Obvykle jde o vysokou kvalifikaci a sjednanou odpovídající pracovní pozici. Konkrétní podmínky včetně případných požadavků na výši odměny ověřte u Ministerstva vnitra.' },
  ],
  sources: [SRC.zakonOPobytuCizincu, SRC.blueCardSmernice, SRC.mvcr, SRC.upcr],
  internalLinks: [
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení v ČR' },
    { href: '/zamestnanecka-karta-2026', label: 'Zaměstnanecká karta podrobně' },
    { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Potřebné dokumenty' },
    faqHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const ZAMESTNANECKA_KARTA_2026: SeoPage = {
  slug: 'zamestnanecka-karta-2026',
  breadcrumbLabel: 'Zaměstnanecká karta 2026',
  eyebrow: 'Pracovní právo · Cizinci',
  title: 'Zaměstnanecká karta 2026: duální oprávnění k pobytu i práci',
  heroSubtitle:
    'Jak funguje zaměstnanecká karta v roce 2026 – nejčastější oprávnění pro dlouhodobé zaměstnání občanů třetích zemí v ČR. Strukturované vysvětlení s odkazy na zdroje.',
  description:
    'Zaměstnanecká karta v roce 2026 – co spojuje, kdo ji potřebuje, jak probíhá žádost a jaké jsou povinnosti zaměstnavatele. Obecné informace s odkazy na oficiální zdroje.',
  keywords: ['zaměstnanecká karta', 'zaměstnanecká karta 2026', 'pobyt cizinců', 'povolení k zaměstnání', 'třetí země', 'Ministerstvo vnitra'],
  intro:
    'Zaměstnanecká karta je nejčastěji využívané oprávnění pro dlouhodobé zaměstnání občanů třetích zemí v České republice. Spojuje v jednom dokladu povolení k pobytu i k zaměstnání. V roce 2026 platí, stejně jako v předchozích letech, že konkrétní podmínky, lhůty a přílohy stanovuje právní úprava a může se měnit. Tato stránka vysvětluje principy zaměstnanecké karty, obvyklý průběh řízení a povinnosti zaměstnavatele a u proměnlivých údajů odkazuje na oficiální zdroje.',
  sections: [
    {
      heading: 'Co zaměstnanecká karta spojuje',
      body: [
        'Zaměstnanecká karta je duální dokument – současně opravňuje k pobytu na území ČR i k výkonu konkrétní práce u konkrétního zaměstnavatele. Je vázaná na pracovní místo, které musí být zařazeno do evidence míst obsaditelných držitelem karty.',
        'Vydává ji Ministerstvo vnitra, Odbor azylové a migrační politiky. Při změně zaměstnavatele nebo pozice je obvykle nutné splnit oznamovací povinnost, případně požádat o souhlas se změnou.',
      ],
    },
    {
      heading: 'Jak řízení probíhá',
      body: [
        'Postup obvykle začíná nahlášením volného pracovního místa Úřadu práce ČR. Po splnění podmínek se podává žádost s požadovanými přílohami, mezi které typicky patří pracovní smlouva nebo příslib zaměstnání, doklad o kvalifikaci a doklad o zajištění ubytování.',
        'Aktuální seznam příloh, lhůty a poplatky zveřejňuje Ministerstvo vnitra. Tato stránka konkrétní hodnoty pro rok 2026 záměrně neuvádí, aby nezobrazovala neaktuální údaje.',
      ],
      bullets: [
        'Nahlášení volného místa Úřadu práce ČR',
        'Pracovní smlouva nebo příslib zaměstnání',
        'Doklad o kvalifikaci a o zajištění ubytování',
        'Nástup až po nabytí platnosti karty',
      ],
    },
    {
      heading: 'Povinnosti zaměstnavatele',
      body: [
        'Zaměstnavatel by měl ověřit platnost karty před nástupem, plnit oznamovací povinnosti při změnách a hlídat termíny prodloužení. U zaměstnaneckých karet je vazba na konkrétní místo důležitá – změny je třeba řešit včas a správným postupem.',
      ],
    },
  ],
  faq: [
    { q: 'Kdo zaměstnaneckou kartu potřebuje?', a: 'Zpravidla občané třetích zemí, kteří nemají volný vstup na trh práce a hodlají v ČR dlouhodobě pracovat. Vhodný typ oprávnění závisí na zemi původu, kvalifikaci a pozici.' },
    { q: 'Co se stane při změně zaměstnavatele?', a: 'Zaměstnanecká karta je vázaná na konkrétní místo. Při změně zaměstnavatele nebo pozice je obvykle nutné splnit oznamovací povinnost, případně požádat o souhlas. Postup ověřte u Ministerstva vnitra.' },
    { q: 'Jak dlouho karta platí?', a: 'Karta se vydává na časově omezené období s možností prodloužení. Konkrétní dobu platnosti a podmínky prodloužení ověřte u Ministerstva vnitra, protože se mohou měnit.' },
    { q: 'Kdy může pracovník nastoupit?', a: 'Práci lze zahájit až po nabytí platnosti zaměstnanecké karty. Nástup před tímto okamžikem se může posuzovat jako nelegální práce.' },
  ],
  sources: [SRC.zakonOPobytuCizincu, SRC.zakonOZamestnanosti, SRC.mvcr, SRC.upcr],
  internalLinks: [
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení v ČR' },
    { href: '/modra-karta-cr', label: 'Modrá karta pro kvalifikované pracovníky' },
    { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Potřebné dokumenty' },
    faqHubLink,
  ],
  cta: consultCta,
  meta: { ...meta, dataYear: 2026 },
  datePublished: TODAY,
  dateModified: TODAY,
}

export const DOKUMENTY_PRO_ZAMESTNANI_CIZINCU: SeoPage = {
  slug: 'dokumenty-pro-zamestnani-cizincu',
  breadcrumbLabel: 'Dokumenty pro zaměstnání cizinců',
  eyebrow: 'Administrativa · Cizinci',
  title: 'Dokumenty pro zaměstnání cizinců: přehled obvyklých podkladů',
  heroSubtitle:
    'Jaké dokumenty obvykle provázejí zaměstnání cizince v ČR – od cestovního dokladu po doklad o ubytování. Orientační přehled, konkrétní seznam ověřte u úřadu.',
  description:
    'Přehled dokumentů obvykle potřebných pro zaměstnání cizince v ČR – cestovní doklad, oprávnění, smlouva, kvalifikace, ubytování. Orientační, konkrétní seznam u úřadu.',
  keywords: ['dokumenty zaměstnání cizinců', 'doklady cizinci práce', 'pracovní smlouva cizinec', 'doklad o ubytování', 'kvalifikace', 'zaměstnanecká karta'],
  intro:
    'Zaměstnání cizince provází více dokumentů než zaměstnání tuzemského pracovníka. Přesná sada se liší podle země původu pracovníka, typu oprávnění a charakteru pozice. Tato stránka uvádí obvyklé kategorie dokladů, se kterými je vhodné počítat, a zdůrazňuje, že závazný seznam vždy stanovuje příslušný úřad. Cílem je poskytnout orientační přehled pro plánování náboru, nikoli vyčerpávající právní výčet.',
  sections: [
    {
      heading: 'Obvyklé kategorie dokumentů',
      body: [
        'V praxi se setkáváme s několika opakujícími se kategoriemi dokladů. Konkrétní podoba a počet závisí na typu oprávnění a na požadavcích úřadu, který o žádosti rozhoduje.',
      ],
      bullets: [
        'Cestovní doklad (pas) v platné podobě',
        'Pobytové nebo pracovní oprávnění podle situace pracovníka',
        'Pracovní smlouva nebo příslib zaměstnání',
        'Doklad o kvalifikaci či vzdělání, je-li vyžadován',
        'Doklad o zajištění ubytování',
      ],
    },
    {
      heading: 'Na co si dát pozor',
      body: [
        'Dokumenty bývají často potřeba v ověřených překladech a s omezenou dobou platnosti. Je proto vhodné plánovat jejich obstarání s předstihem a sledovat, zda nevyprší dříve, než řízení skončí.',
        'U dokladů o vzdělání může být nutné uznání kvalifikace. Konkrétní požadavky se liší podle pozice i podle typu oprávnění – ověřte je u příslušného úřadu.',
      ],
    },
    {
      heading: 'Praktická interpretace',
      body: [
        'Doporučujeme vést kontrolní seznam dokladů ke každému pracovníkovi a evidovat data platnosti. U agenturního zaměstnávání část dokumentace spravuje pracovní agentura jako formální zaměstnavatel.',
      ],
    },
  ],
  faq: [
    { q: 'Existuje univerzální seznam dokumentů?', a: 'Ne. Závazný seznam příloh stanovuje úřad podle typu oprávnění a situace pracovníka. Tato stránka uvádí pouze obvyklé kategorie pro orientaci.' },
    { q: 'Musí být dokumenty přeložené?', a: 'Některé doklady bývají vyžadovány v ověřených překladech a s omezenou platností. Konkrétní požadavky ověřte u úřadu, který o žádosti rozhoduje.' },
    { q: 'Kdo dokumenty u agenturního pracovníka spravuje?', a: 'U agenturního zaměstnávání je formálním zaměstnavatelem agentura, která vede příslušnou dokumentaci ve spolupráci s uživatelem a pracovníkem.' },
  ],
  sources: [SRC.zakonOPobytuCizincu, SRC.zakonOZamestnanosti, SRC.mvcr, SRC.upcr],
  internalLinks: [
    { href: '/zamestnanecka-karta-2026', label: 'Zaměstnanecká karta podrobně' },
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Jak probíhá nábor zahraničních pracovníků' },
    { href: '/ubytovani-pro-pracovniky', label: 'Ubytování pro pracovníky' },
    faqHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const POVINNOSTI_ZAMESTNAVATELE: SeoPage = {
  slug: 'povinnosti-zamestnavatele',
  breadcrumbLabel: 'Povinnosti zaměstnavatele',
  eyebrow: 'Pracovní právo · Zaměstnavatelé',
  title: 'Povinnosti zaměstnavatele v ČR: přehled základních oblastí',
  heroSubtitle:
    'Strukturovaný přehled hlavních povinností zaměstnavatele v České republice – smlouvy, odvody, BOZP, evidence a ochrana osobních údajů. Obecné informace.',
  description:
    'Základní povinnosti zaměstnavatele v ČR – pracovní smlouvy, registrace u ČSSZ a zdravotní pojišťovny, odvody, BOZP, evidence a GDPR. Přehled s odkazy na zdroje.',
  keywords: ['povinnosti zaměstnavatele', 'zaměstnavatel ČR', 'BOZP', 'odvody zaměstnavatel', 'mzdová evidence', 'GDPR zaměstnavatel'],
  intro:
    'Zaměstnavatel v České republice plní řadu povinností, které vyplývají především ze zákoníku práce, předpisů o pojistném a o bezpečnosti práce. Tyto povinnosti se prolínají celým pracovním poměrem – od jeho vzniku přes pravidelné měsíční úkony až po ukončení a archivaci. Tato stránka shrnuje hlavní oblasti, na které je dobré pamatovat, a u proměnlivých údajů, jako jsou sazby a lhůty, odkazuje na oficiální zdroje. Nejde o vyčerpávající právní výčet, ale o praktickou orientaci.',
  sections: [
    {
      heading: 'Vznik pracovního poměru',
      body: [
        'Při vzniku pracovního poměru zaměstnavatel uzavírá pracovní smlouvu nebo dohodu, plní informační povinnosti vůči zaměstnanci a přihlašuje ho k sociálnímu a zdravotnímu pojištění. U cizinců navíc plní oznamovací povinnosti vůči Úřadu práce ČR.',
      ],
      bullets: [
        'Uzavření pracovní smlouvy nebo dohody',
        'Přihlášení k ČSSZ a ke zdravotní pojišťovně',
        'Splnění informačních povinností vůči zaměstnanci',
        'Oznamovací povinnosti u cizinců (Úřad práce ČR)',
      ],
    },
    {
      heading: 'Průběžné povinnosti',
      body: [
        'Během trvání pracovního poměru zaměstnavatel počítá a odvádí pojistné a daně, vede mzdovou evidenci, zajišťuje bezpečnost a ochranu zdraví při práci a respektuje pravidla pracovní doby a odměňování.',
        'Konkrétní sazby pojistného, lhůty pro odvody a hodnoty minimální mzdy se mohou měnit – aktuální údaje zveřejňují ČSSZ, finanční správa a MPSV.',
      ],
      bullets: [
        'Výpočet a odvod pojistného a daní',
        'Vedení mzdové evidence a výplatních pásek',
        'Zajištění BOZP a vstupních školení',
        'Dodržování pravidel pracovní doby a odměňování',
      ],
    },
    {
      heading: 'Ochrana osobních údajů a evidence',
      body: [
        'Zaměstnavatel zpracovává osobní údaje zaměstnanců a musí postupovat v souladu s pravidly ochrany osobních údajů (GDPR). Dokumentaci a mzdové podklady je nutné archivovat po dobu stanovenou předpisy.',
      ],
    },
  ],
  faq: [
    { q: 'Jaké jsou hlavní povinnosti při nástupu zaměstnance?', a: 'Uzavření smlouvy, přihlášení k sociálnímu a zdravotnímu pojištění, splnění informačních povinností a u cizinců oznámení Úřadu práce ČR. Konkrétní lhůty ověřte u příslušných institucí.' },
    { q: 'Kde zjistím aktuální sazby odvodů?', a: 'Aktuální sazby pojistného zveřejňují ČSSZ a zdravotní pojišťovny, daňové povinnosti finanční správa. Tato stránka konkrétní sazby neuvádí.' },
    { q: 'Týkají se povinnosti i agentur?', a: 'Ano. U agenturního zaměstnávání plní povinnosti zaměstnavatele pracovní agentura jako formální zaměstnavatel, část odpovědnosti (například za BOZP) sdílí s uživatelem.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonSocialni, SRC.zakonZdravotni, SRC.zakonBozp, SRC.cssz, SRC.financniSprava],
  internalLinks: [
    { href: '/naklady-na-zamestnance-cr', label: 'Náklady na zaměstnance' },
    { href: '/socialni-zdravotni-dane-2026', label: 'Přehled odvodů v roce 2026' },
    { href: '/minimalni-mzda-2026', label: 'Minimální mzda 2026' },
    { href: '/chyby-pri-zamestnavani-cizincu', label: 'Nejčastější chyby při zaměstnávání cizinců' },
    faqHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const NAKLADY_NA_ZAMESTNANCE_CR: SeoPage = {
  slug: 'naklady-na-zamestnance-cr',
  breadcrumbLabel: 'Náklady na zaměstnance',
  eyebrow: 'Mzdy · Náklady',
  title: 'Náklady na zaměstnance v ČR: z čeho se skládají',
  heroSubtitle:
    'Z jakých složek se skládají celkové náklady na zaměstnance v České republice – hrubá mzda, odvody zaměstnavatele a další položky. Bez konkrétních sazeb.',
  description:
    'Z čeho se skládají náklady na zaměstnance v ČR – hrubá mzda, povinné odvody zaměstnavatele a další položky. Přehled struktury nákladů, konkrétní sazby u ČSSZ.',
  keywords: ['náklady na zaměstnance', 'mzdové náklady', 'odvody zaměstnavatel', 'cena práce', 'hrubá mzda', 'náklady práce ČR'],
  intro:
    'Celkové náklady na zaměstnance jsou vyšší než samotná hrubá mzda. K mzdě se připojují povinné odvody, které hradí zaměstnavatel, a podle situace i další položky spojené s výkonem práce. Tato stránka popisuje, z jakých složek se náklady obvykle skládají, aby si zaměstnavatel mohl udělat strukturovanou představu. Konkrétní procentní sazby a limity záměrně neuvádíme – mohou se měnit a je nutné je ověřit u ČSSZ, zdravotních pojišťoven a finanční správy.',
  sections: [
    {
      heading: 'Hlavní složky nákladů',
      body: [
        'Základem je hrubá mzda. Na ni navazují povinné odvody zaměstnavatele na sociální a zdravotní pojištění, které se počítají z vyměřovacího základu podle zákonem stanovených sazeb.',
        'Podle konkrétní situace mohou přistupovat další náklady spojené se zaměstnáním. Jejich rozsah závisí na oboru, pozici a interních pravidlech firmy.',
      ],
      bullets: [
        'Hrubá mzda zaměstnance',
        'Povinné odvody zaměstnavatele (sociální a zdravotní pojištění)',
        'Náklady na BOZP, ochranné pomůcky a vstupní školení',
        'Případné benefity, stravování, doprava nebo ubytování',
        'Náklady na nábor a adaptaci',
      ],
    },
    {
      heading: 'Proč náklady kolísají',
      body: [
        'Náklady ovlivňuje výše mzdy, typ pracovněprávního vztahu a meziroční změny sazeb i minimální mzdy. Proto se vyplatí plánovat rozpočet s rezervou a aktualizovat ho podle oficiálních údajů.',
        'Tato stránka neuvádí konkrétní sazby pojistného. Pro přesný výpočet doporučujeme aktuální údaje ČSSZ, zdravotních pojišťoven a finanční správy, případně konzultaci s mzdovou účetní.',
      ],
    },
  ],
  faq: [
    { q: 'Jsou náklady na zaměstnance vyšší než hrubá mzda?', a: 'Ano. K hrubé mzdě se připojují povinné odvody zaměstnavatele a podle situace i další položky. Přesné sazby ověřte u ČSSZ a zdravotních pojišťoven.' },
    { q: 'Kolik činí odvody zaměstnavatele?', a: 'Konkrétní procentní sazby tato stránka neuvádí, protože se mohou měnit. Aktuální hodnoty zveřejňují ČSSZ, zdravotní pojišťovny a finanční správa.' },
    { q: 'Jak nejlépe naplánovat mzdové náklady?', a: 'Vyjít z aktuální hrubé mzdy a platných sazeb odvodů, počítat s minimální mzdou a meziročními změnami a v případě potřeby konzultovat mzdovou účetní.' },
  ],
  sources: [SRC.zakonSocialni, SRC.zakonZdravotni, SRC.cssz, SRC.financniSprava, SRC.vzp],
  internalLinks: [
    { href: '/socialni-zdravotni-dane-2026', label: 'Přehled odvodů v roce 2026' },
    { href: '/minimalni-mzda-2026', label: 'Minimální mzda 2026' },
    { href: '/povinnosti-zamestnavatele', label: 'Povinnosti zaměstnavatele' },
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    { href: '/naklady-na-zamestnance-pardubice', label: 'Náklady na zaměstnance v Pardubicích' },
    { href: '/naklady-na-zamestnance-hradec-kralove', label: 'Náklady na zaměstnance v Hradci Králové' },
    { href: '/naklady-na-zamestnance-stredni-cechy', label: 'Náklady na zaměstnance ve Středních Čechách' },
    { href: '/naklady-na-zamestnance-praha', label: 'Náklady na zaměstnance v Praze' },
    faqHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const JAK_FUNGUJE_PRACOVNI_AGENTURA: SeoPage = {
  slug: 'jak-funguje-pracovni-agentura',
  breadcrumbLabel: 'Jak funguje pracovní agentura',
  eyebrow: 'Nábor · Agenturní práce',
  title: 'Jak funguje pracovní agentura: modely spolupráce a pravidla',
  heroSubtitle:
    'Jak pracují personální a pracovní agentury v ČR – jaké služby nabízejí, jak vypadá vztah mezi agenturou, pracovníkem a firmou a jaká pravidla musí dodržovat.',
  description:
    'Jak funguje pracovní agentura v ČR – permanentní nábor vs. dočasné přidělení, povolení ke zprostředkování a trojstranný vztah agentura–pracovník–firma. Přehled.',
  keywords: ['pracovní agentura', 'personální agentura', 'agenturní zaměstnávání', 'zprostředkování zaměstnání', 'dočasné přidělení', 'nábor'],
  intro:
    'Pracovní agentura propojuje firmy hledající pracovníky s lidmi, kteří hledají práci. V praxi nabízí dva hlavní modely: vyhledání kandidáta pro přímé zaměstnání u firmy (permanentní nábor) a agenturní zaměstnávání, kdy je pracovník zaměstnancem agentury a je dočasně přidělen k uživateli. Tato stránka vysvětluje, jak oba modely fungují, jaký je vztah mezi zúčastněnými stranami a jaká pravidla musí agentura dodržovat. Vychází ze zákona o zaměstnanosti a ze zákoníku práce.',
  sections: [
    {
      heading: 'Dva základní modely',
      body: [
        'Při permanentním náboru agentura vyhledá a předvybere kandidáty a firma s vybraným pracovníkem uzavře pracovní poměr sama. Při agenturním zaměstnávání zůstává zaměstnavatelem agentura a pracovníka dočasně přiděluje k uživateli.',
        'Volba modelu závisí na potřebě firmy – zda hledá stálého zaměstnance, nebo potřebuje pokrýt sezónní špičku či dočasný výpadek kapacity.',
      ],
      bullets: [
        'Permanentní nábor – firma zaměstná pracovníka přímo',
        'Agenturní zaměstnávání – pracovník je zaměstnancem agentury',
        'Dočasné přidělení k uživateli na základě dohody',
      ],
    },
    {
      heading: 'Pravidla a oprávnění',
      body: [
        'Pro zprostředkování zaměstnání musí mít agentura platné povolení podle zákona o zaměstnanosti. U agenturního zaměstnávání platí požadavek srovnatelných mzdových a pracovních podmínek s kmenovými zaměstnanci uživatele.',
        'Za bezpečnost a ochranu zdraví při práci nesou agentura i uživatel společnou odpovědnost. Pravidla pro dočasné přidělení vymezuje zákoník práce.',
      ],
    },
    {
      heading: 'Trojstranný vztah',
      body: [
        'U agenturního zaměstnávání vzniká vztah mezi třemi stranami: agenturou (formální zaměstnavatel), pracovníkem a uživatelem (firma, kde se práce odvádí). Každá strana má svá práva a povinnosti, které je vhodné mít jasně ošetřené ve smlouvách.',
      ],
    },
  ],
  faq: [
    { q: 'Kdo je u agenturního pracovníka zaměstnavatelem?', a: 'Formálním zaměstnavatelem je pracovní agentura. Pracovník je k firmě (uživateli) dočasně přidělen na základě dohody mezi agenturou a uživatelem.' },
    { q: 'Potřebuje agentura zvláštní povolení?', a: 'Ano. Ke zprostředkování zaměstnání musí mít agentura platné povolení podle zákona o zaměstnanosti.' },
    { q: 'Mají agenturní pracovníci stejné podmínky jako kmenoví?', a: 'U agenturního zaměstnávání platí požadavek srovnatelných mzdových a pracovních podmínek s kmenovými zaměstnanci uživatele.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonikPrace, SRC.upcr],
  internalLinks: [
    { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    { href: '/agentura-prace-praha', label: 'Agentura práce v Praze' },
    { href: '/agentura-prace-brno', label: 'Agentura práce v Brně' },
    faqHubLink,
  ],
  cta: {
    eyebrow: 'Spolupráce',
    title: 'Zvažujete spolupráci s agenturou?',
    text: 'Rádi vám vysvětlíme, který model spolupráce dává pro vaši situaci smysl, a pomůžeme s náborem i administrativou.',
    buttonLabel: 'Kontaktujte nás',
    href: '/contact',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const CHYBY_PRI_ZAMESTNAVANI_CIZINCU: SeoPage = {
  slug: 'chyby-pri-zamestnavani-cizincu',
  breadcrumbLabel: 'Chyby při zaměstnávání cizinců',
  eyebrow: 'Compliance · Cizinci',
  title: 'Nejčastější chyby při zaměstnávání cizinců a jak jim předejít',
  heroSubtitle:
    'Přehled opakujících se chyb při zaměstnávání cizinců v ČR a praktická doporučení, jak jim předcházet. Obecné informace, nikoli právní poradenství.',
  description:
    'Nejčastější chyby při zaměstnávání cizinců v ČR – předčasný nástup, zmeškané lhůty, nesprávné pojištění a další – a jak jim předejít. Praktický přehled.',
  keywords: ['chyby zaměstnávání cizinců', 'nelegální práce', 'compliance cizinci', 'oznamovací povinnost', 'zaměstnávání cizinců', 'sankce'],
  intro:
    'Zaměstnávání cizinců má více administrativních kroků než zaměstnání tuzemského pracovníka a chyby zde mívají citelnější dopady. Většina pochybení se přitom opakuje a dá se jim předejít včasnou kontrolou a přehlednou evidencí. Tato stránka shrnuje nejčastější chyby, se kterými se zaměstnavatelé setkávají, a nabízí praktická doporučení. Nejde o právní poradenství – konkrétní situace je vhodné ověřit u Úřadu práce ČR nebo Ministerstva vnitra.',
  sections: [
    {
      heading: 'Chyby kolem oprávnění',
      body: [
        'Nejzávažnější skupinou jsou chyby u pracovních a pobytových oprávnění. Zahájení práce před nabytím platnosti oprávnění se posuzuje jako nelegální práce a může vést k sankcím podle zákona o zaměstnanosti.',
        'Časté je také mylné předpokládání, že na občany třetích zemí platí stejná pravidla jako na občany EU, nebo opomenutí hlídat platnost a včasné prodloužení oprávnění.',
      ],
      bullets: [
        'Nástup před nabytím platnosti oprávnění',
        'Záměna pravidel pro EU a třetí země',
        'Zmeškané prodloužení oprávnění',
      ],
    },
    {
      heading: 'Chyby v oznamovacích povinnostech a evidenci',
      body: [
        'Druhou skupinou jsou zmeškané nebo nesprávně podané oznamovací povinnosti vůči Úřadu práce ČR, nesprávné přihlášení k pojištění a neúplná evidence. Tyto chyby často vyjdou najevo až při kontrole.',
        'Předcházet jim pomáhá kontrolní seznam u každého pracovníka, hlídání lhůt a pravidelná aktualizace vstupních údajů.',
      ],
    },
    {
      heading: 'Jak chybám předcházet',
      body: [
        'Doporučujeme ověřovat platnost oprávnění před nástupem, vést přehlednou evidenci s daty platnosti a plnit oznamovací povinnosti ve lhůtách. U agenturního zaměstnávání část těchto úkonů přebírá agentura jako formální zaměstnavatel.',
      ],
    },
  ],
  faq: [
    { q: 'Co je považováno za nelegální práci?', a: 'Mimo jiné výkon práce bez platného oprávnění tam, kde je vyžadováno. Konkrétní vymezení obsahuje zákon o zaměstnanosti; situaci ověřte u Úřadu práce ČR.' },
    { q: 'Platí na občany třetích zemí stejná pravidla jako na EU?', a: 'Ne. Občané EU, EHP a Švýcarska mají volný vstup na trh práce, zatímco občané třetích zemí zpravidla potřebují oprávnění. Záměna je častou chybou.' },
    { q: 'Jak nejlépe hlídat lhůty a platnost?', a: 'Osvědčuje se kontrolní seznam u každého pracovníka s daty platnosti oprávnění a termíny prodloužení, doplněný pravidelnou kontrolou evidence.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonOPobytuCizincu, SRC.upcr, SRC.mvcr],
  internalLinks: [
    { href: '/legalizace-prace-cizincu', label: 'Jak legálně zaměstnat cizince' },
    { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' },
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení' },
    { href: '/povinnosti-zamestnavatele', label: 'Povinnosti zaměstnavatele' },
    faqHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const LEGALIZACE_PRACE_CIZINCU: SeoPage = {
  slug: 'legalizace-prace-cizincu',
  breadcrumbLabel: 'Legalizace práce cizinců',
  eyebrow: 'Compliance · Cizinci',
  title: 'Legalizace práce cizinců: jak zajistit legální zaměstnání',
  heroSubtitle:
    'Co znamená legální zaměstnání cizince v ČR a jaké kroky k němu vedou – od správného oprávnění po evidenci a oznamovací povinnosti. Obecné informace.',
  description:
    'Jak zajistit legální zaměstnání cizince v ČR – správné oprávnění, registrace, smlouva a oznamovací povinnosti. Co je nelegální práce a jak jí předejít.',
  keywords: ['legalizace práce cizinců', 'legální zaměstnání cizince', 'nelegální práce', 'oprávnění k zaměstnání', 'oznamovací povinnost', 'compliance'],
  intro:
    'Legální zaměstnání cizince stojí na souběhu několika podmínek: pracovník musí mít odpovídající oprávnění, zaměstnavatel musí splnit registrační a oznamovací povinnosti a celý vztah musí odpovídat pracovněprávním předpisům. Tato stránka popisuje, co legální zaměstnání obnáší a jaké kroky k němu vedou, a vymezuje, co se naopak považuje za nelegální práci. Jde o obecný přehled; konkrétní situaci je vhodné ověřit u Úřadu práce ČR a Ministerstva vnitra.',
  sections: [
    {
      heading: 'Co znamená legální zaměstnání',
      body: [
        'Legální zaměstnání cizince znamená, že pracovník má platné oprávnění k pobytu i k práci tam, kde je vyžadováno, a že práci vykonává v souladu s tímto oprávněním (u konkrétního zaměstnavatele a na konkrétní pozici, pokud je tak oprávnění vázáno).',
        'Zaměstnavatel zároveň plní povinnosti běžné u každého zaměstnání – uzavření smlouvy, přihlášení k pojištění – a u cizinců navíc oznamovací povinnosti vůči Úřadu práce ČR.',
      ],
    },
    {
      heading: 'Kroky k legálnímu zaměstnání',
      body: [
        'Postup se liší podle země původu a typu oprávnění, obvykle však zahrnuje ověření, zda má pracovník volný vstup na trh práce, případně získání správného oprávnění, a teprve poté nástup.',
      ],
      bullets: [
        'Ověření přístupu pracovníka na trh práce',
        'Získání správného oprávnění, je-li potřeba',
        'Uzavření smlouvy a přihlášení k pojištění',
        'Splnění oznamovacích povinností vůči Úřadu práce ČR',
        'Nástup až po nabytí platnosti oprávnění',
      ],
    },
    {
      heading: 'Co je nelegální práce',
      body: [
        'Za nelegální práci se mimo jiné považuje výkon práce bez potřebného oprávnění tam, kde je vyžadováno. Nelegální zaměstnávání může vést k sankcím podle zákona o zaměstnanosti. Tato stránka neuvádí konkrétní výši sankcí – aktuální informace zveřejňuje Úřad práce ČR.',
      ],
    },
  ],
  faq: [
    { q: 'Jak poznám, že je zaměstnání cizince legální?', a: 'Pracovník má platné oprávnění k pobytu i práci tam, kde je vyžadováno, práce odpovídá tomuto oprávnění a zaměstnavatel splnil registrační a oznamovací povinnosti.' },
    { q: 'Jaké jsou důsledky nelegální práce?', a: 'Nelegální zaměstnávání může vést k sankcím podle zákona o zaměstnanosti. Konkrétní výši tato stránka neuvádí; informace poskytuje Úřad práce ČR.' },
    { q: 'Pomáhá s legalizací pracovní agentura?', a: 'Agentura může proces koordinovat a u agenturního zaměstnávání je formálním zaměstnavatelem. Odpovědnost za soulad s předpisy je vždy nutné mít jasně ošetřenou.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonOPobytuCizincu, SRC.upcr, SRC.mvcr],
  internalLinks: [
    { href: '/chyby-pri-zamestnavani-cizincu', label: 'Nejčastější chyby a jak jim předejít' },
    { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' },
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Potřebné dokumenty' },
    faqHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const DOCASNE_PRIDELENI_ZAMESTNANCU: SeoPage = {
  slug: 'docasne-prideleni-zamestnancu',
  breadcrumbLabel: 'Dočasné přidělení zaměstnanců',
  eyebrow: 'Agenturní práce · Pracovní právo',
  title: 'Dočasné přidělení zaměstnanců: jak agenturní přidělení funguje',
  heroSubtitle:
    'Co je dočasné přidělení zaměstnance k uživateli, jak je upraveno a jaká pravidla platí pro mzdové a pracovní podmínky. Obecné informace s odkazy na zdroje.',
  description:
    'Dočasné přidělení zaměstnanců (agenturní přidělení) v ČR – jak funguje, jaký je vztah agentura–pracovník–uživatel a požadavek srovnatelných podmínek. Přehled.',
  keywords: ['dočasné přidělení', 'agenturní přidělení', 'agenturní zaměstnávání', 'přidělení k uživateli', 'zákoník práce', 'srovnatelné podmínky'],
  intro:
    'Dočasné přidělení je jádrem agenturního zaměstnávání. Pracovník je zaměstnancem pracovní agentury a ta ho na sjednanou dobu přiděluje k uživateli, u něhož skutečně vykonává práci. Model je vhodný pro pokrytí sezónních špiček, projektů s definovaným koncem nebo dočasných výpadků kapacity. Tato stránka popisuje, jak dočasné přidělení funguje, jaký je vztah mezi stranami a jaká pravidla platí pro mzdové a pracovní podmínky. Vychází ze zákoníku práce a ze zákona o zaměstnanosti.',
  sections: [
    {
      heading: 'Jak dočasné přidělení funguje',
      body: [
        'Pracovní agentura uzavře s pracovníkem pracovní poměr a na základě dohody o dočasném přidělení ho přidělí k uživateli. Pracovník odvádí práci u uživatele podle jeho pokynů, formálním zaměstnavatelem však zůstává agentura.',
        'Doba přidělení je obvykle časově vymezená a může být na základě dohody prodloužena nebo ukončena. Konkrétní podmínky se sjednávají ve smlouvách mezi stranami.',
      ],
    },
    {
      heading: 'Srovnatelné podmínky a odpovědnost',
      body: [
        'U dočasného přidělení platí požadavek srovnatelných mzdových a pracovních podmínek agenturního pracovníka s kmenovými zaměstnanci uživatele na obdobné pozici. Za bezpečnost a ochranu zdraví při práci nesou agentura i uživatel společnou odpovědnost.',
      ],
      bullets: [
        'Srovnatelné mzdové a pracovní podmínky s kmenovými zaměstnanci',
        'Společná odpovědnost agentury a uživatele za BOZP',
        'Časově vymezená doba přidělení',
        'Jasné rozdělení rolí ve smlouvách',
      ],
    },
    {
      heading: 'Pro koho je vhodné',
      body: [
        'Dočasné přidělení se hodí firmám, které potřebují pružně reagovat na výkyvy poptávky, aniž by samy přebíraly veškerou administrativu zaměstnávání. Část povinností zaměstnavatele přebírá agentura.',
      ],
    },
  ],
  faq: [
    { q: 'Kdo je zaměstnavatelem dočasně přiděleného pracovníka?', a: 'Formálním zaměstnavatelem je pracovní agentura. Pracovník je k uživateli přidělen na základě dohody a pracuje podle jeho pokynů.' },
    { q: 'Musí mít přidělený pracovník stejné podmínky jako kmenoví?', a: 'Platí požadavek srovnatelných mzdových a pracovních podmínek s kmenovými zaměstnanci uživatele na obdobné pozici.' },
    { q: 'Kdo odpovídá za bezpečnost práce?', a: 'Za BOZP nesou agentura i uživatel společnou odpovědnost. Konkrétní rozdělení je vhodné ošetřit smluvně.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonOZamestnanosti, SRC.upcr],
  internalLinks: [
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    { href: '/povinnosti-zamestnavatele', label: 'Povinnosti zaměstnavatele' },
    { href: '/ubytovani-pro-pracovniky', label: 'Ubytování pro pracovníky' },
    faqHubLink,
  ],
  cta: {
    eyebrow: 'Pružná pracovní síla',
    title: 'Potřebujete pokrýt sezónní špičku?',
    text: 'Pomůžeme vám zajistit pracovníky formou dočasného přidělení a postaráme se o administrativu zaměstnávání.',
    buttonLabel: 'Poslat poptávku',
    href: '/submit-offer',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const UBYTOVANI_PRO_PRACOVNIKY: SeoPage = {
  slug: 'ubytovani-pro-pracovniky',
  breadcrumbLabel: 'Ubytování pro pracovníky',
  eyebrow: 'Praktické zázemí · Pracovníci',
  title: 'Ubytování pro pracovníky: na co myslet při zajištění bydlení',
  heroSubtitle:
    'Praktický přehled k zajištění ubytování pro pracovníky v ČR – standardy, transparentnost a vztah ke mzdě. Obecné informace, nikoli právní poradenství.',
  description:
    'Ubytování pro pracovníky v ČR – jaké zásady platí pro kvalitu bydlení, transparentnost podmínek a případné srážky ze mzdy. Praktický přehled s odkazy na zdroje.',
  keywords: ['ubytování pro pracovníky', 'ubytování zaměstnanci', 'ubytovny', 'bydlení cizinci práce', 'srážky ze mzdy', 'doklad o ubytování'],
  intro:
    'Zajištění ubytování bývá u zahraničních i dojíždějících pracovníků důležitou součástí pracovní nabídky a u některých pobytových oprávnění je doklad o ubytování dokonce vyžadovanou přílohou. Kvalita bydlení, jasné podmínky a férový vztah k případným srážkám ze mzdy přitom přímo ovlivňují spokojenost a stabilitu pracovníků. Tato stránka shrnuje, na co je vhodné myslet, a u konkrétních pravidel odkazuje na příslušné předpisy a oficiální zdroje. Nejde o právní poradenství.',
  sections: [
    {
      heading: 'Kvalita a standardy bydlení',
      body: [
        'Ubytování by mělo splňovat hygienické a stavebně-technické požadavky platné pro daný typ objektu (například ubytovny). Cílem je důstojné a bezpečné bydlení, které odpovídá počtu ubytovaných osob.',
        'Konkrétní technické požadavky upravují příslušné předpisy; jejich dodržení je vhodné ověřit u poskytovatele ubytování a u příslušných úřadů.',
      ],
    },
    {
      heading: 'Transparentnost a vztah ke mzdě',
      body: [
        'Podmínky ubytování by měly být pro pracovníka jasné předem – cena, co je v ní zahrnuto a jak se případně promítá do mzdy. Srážky ze mzdy za ubytování podléhají pravidlům zákoníku práce a měly by být podloženy souhlasem a srozumitelnou dohodou.',
        'Transparentní nastavení předchází nedorozuměním a posiluje důvěru mezi pracovníkem a zaměstnavatelem nebo agenturou.',
      ],
      bullets: [
        'Jasná cena a rozsah služeb předem',
        'Srážky ze mzdy podle pravidel zákoníku práce',
        'Srozumitelná písemná dohoda',
        'Doklad o ubytování pro účely oprávnění, je-li potřeba',
      ],
    },
    {
      heading: 'Praktická interpretace',
      body: [
        'U agenturního zaměstnávání ubytování často zajišťuje agentura. I v takovém případě platí, že podmínky mají být férové a transparentní a že kvalita bydlení ovlivňuje udržení pracovníků.',
      ],
    },
  ],
  faq: [
    { q: 'Musí zaměstnavatel zajistit ubytování?', a: 'Povinnost zajistit ubytování obecně nevzniká, u některých pobytových oprávnění je však doklad o ubytování vyžadovanou přílohou. Konkrétní požadavky ověřte u příslušného úřadu.' },
    { q: 'Lze srazit cenu ubytování ze mzdy?', a: 'Srážky ze mzdy podléhají pravidlům zákoníku práce a měly by být podloženy souhlasem a srozumitelnou dohodou. Doporučujeme transparentní nastavení předem.' },
    { q: 'Jaké standardy má ubytování splňovat?', a: 'Mělo by odpovídat hygienickým a stavebně-technickým požadavkům pro daný typ objektu a počtu ubytovaných osob. Dodržení ověřte u poskytovatele a příslušných úřadů.' },
  ],
  sources: [SRC.zakonikPrace, SRC.zakonOPobytuCizincu, SRC.mvcr],
  internalLinks: [
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Potřebné dokumenty pro zaměstnání cizinců' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    faqHubLink,
  ],
  cta: consultCta,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const SUPPORT_PAGES: ReadonlyArray<SeoPage> = [
  MODRA_KARTA_CR,
  ZAMESTNANECKA_KARTA_2026,
  DOKUMENTY_PRO_ZAMESTNANI_CIZINCU,
  POVINNOSTI_ZAMESTNAVATELE,
  NAKLADY_NA_ZAMESTNANCE_CR,
  JAK_FUNGUJE_PRACOVNI_AGENTURA,
  CHYBY_PRI_ZAMESTNAVANI_CIZINCU,
  LEGALIZACE_PRACE_CIZINCU,
  DOCASNE_PRIDELENI_ZAMESTNANCU,
  UBYTOVANI_PRO_PRACOVNIKY,
]
