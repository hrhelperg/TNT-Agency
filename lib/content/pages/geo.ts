// Geo-focused pages (Praha, Brno) + the FAQ hub. Local context is described
// qualitatively — no invented statistics; data points are deferred to ČSÚ.
// The FAQ hub aggregates cross-cluster questions and links every major page to
// improve crawl depth.

import type { SeoPage } from '../seo-page'
import { SRC } from '../sources'

const TODAY = '2026-05-23'
const meta = {
  locale: 'cs' as const,
  lastUpdated: TODAY,
  jurisdiction: 'CZ',
  isGeneralInformation: true,
}

export const AGENTURA_PRACE_PRAHA: SeoPage = {
  slug: 'agentura-prace-praha',
  breadcrumbLabel: 'Agentura práce Praha',
  eyebrow: 'Nábor · Praha',
  title: 'Agentura práce Praha: nábor a personální služby v hlavním městě',
  heroSubtitle:
    'Jak funguje nábor a agenturní zaměstnávání v Praze – kontext pražského trhu práce a praktické informace pro zaměstnavatele i pracovníky.',
  description:
    'Agentura práce v Praze – nábor, agenturní zaměstnávání a personální služby v kontextu pražského trhu práce. Praktické informace pro zaměstnavatele i pracovníky.',
  keywords: ['agentura práce Praha', 'pracovní agentura Praha', 'nábor Praha', 'práce Praha', 'personální agentura Praha', 'agenturní zaměstnávání'],
  intro:
    'Praha jako hlavní město a největší ekonomické centrum České republiky soustřeďuje širokou poptávku po pracovní síle napříč službami, administrativou, logistikou, obchodem i specializovanými obory. Pro zaměstnavatele to znamená konkurenci o kandidáty, pro pracovníky pestrou nabídku pozic. Tato stránka popisuje, jak v pražském kontextu funguje nábor a agenturní zaměstnávání, a odkazuje na podrobnější informace o pravidlech. Konkrétní statistické údaje o trhu práce ověřte u Českého statistického úřadu.',
  sections: [
    {
      heading: 'Pražský trh práce v kostce',
      body: [
        'Praha se vyznačuje rozmanitou strukturou zaměstnavatelů a poptávkou po pozicích od méně kvalifikovaných až po vysoce specializované. Tato rozmanitost zvyšuje význam cíleného náboru a dobré orientace v dostupných kandidátech.',
        'Konkrétní čísla, jako je míra nezaměstnanosti nebo počet volných míst, se v čase mění. Aktuální statistiky zveřejňuje Český statistický úřad a Úřad práce ČR – tato stránka je záměrně neuvádí.',
      ],
    },
    {
      heading: 'Jak agentura práce v Praze pomáhá',
      body: [
        'Pracovní agentura pomáhá zaměstnavatelům obsadit pozice rychleji a pracovníkům najít vhodnou práci. Nabízí permanentní nábor i agenturní zaměstnávání s dočasným přidělením k uživateli.',
        'U zahraničních pracovníků agentura koordinuje také administrativu spojenou s oprávněními a může pomoci se zázemím, například s ubytováním.',
      ],
      bullets: [
        'Permanentní nábor pro stálé pozice',
        'Agenturní zaměstnávání pro pružné pokrytí kapacity',
        'Koordinace administrativy u zahraničních pracovníků',
        'Podpora při onboardingu a zázemí',
      ],
    },
    {
      heading: 'Pravidla platí celostátně',
      body: [
        'Pravidla pro zaměstnávání, povolení a odvody jsou celostátní – v Praze platí stejně jako jinde v ČR. Lokální je především trh práce a dostupnost kandidátů. Podrobnosti k pravidlům najdete v navazujících článcích.',
      ],
    },
  ],
  faq: [
    { q: 'Liší se pravidla zaměstnávání v Praze od zbytku ČR?', a: 'Pravidla pro povolení, odvody a pracovní právo jsou celostátní a v Praze platí stejně jako jinde. Lokální je trh práce a dostupnost kandidátů.' },
    { q: 'Jaké pozice agentura v Praze nejčastěji obsazuje?', a: 'Spektrum je široké – od méně kvalifikovaných pozic ve službách a logistice po specializované role. Konkrétní zaměření závisí na aktuální poptávce.' },
    { q: 'Kde najdu statistiky pražského trhu práce?', a: 'Aktuální statistiky zveřejňuje Český statistický úřad a Úřad práce ČR. Tato stránka konkrétní čísla neuvádí, aby nezobrazovala neaktuální údaje.' },
  ],
  sources: [SRC.czso, SRC.upcr, SRC.zakonOZamestnanosti],
  internalLinks: [
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    { href: '/prace-pro-cizince-praha', label: 'Práce pro cizince v Praze' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
    { href: '/faq-zamestnavani-pracovniku', label: 'Časté dotazy k zaměstnávání pracovníků' },
  ],
  cta: {
    eyebrow: 'Nábor v Praze',
    title: 'Hledáte pracovníky v Praze?',
    text: 'Pomůžeme vám s náborem i agenturním zaměstnáváním v pražském regionu, včetně administrativy u zahraničních pracovníků.',
    buttonLabel: 'Poslat poptávku',
    href: '/submit-offer',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const AGENTURA_PRACE_BRNO: SeoPage = {
  slug: 'agentura-prace-brno',
  breadcrumbLabel: 'Agentura práce Brno',
  eyebrow: 'Nábor · Brno',
  title: 'Agentura práce Brno: nábor a personální služby na jižní Moravě',
  heroSubtitle:
    'Jak funguje nábor a agenturní zaměstnávání v Brně – kontext brněnského trhu práce a praktické informace pro zaměstnavatele i pracovníky.',
  description:
    'Agentura práce v Brně – nábor, agenturní zaměstnávání a personální služby v kontextu brněnského trhu práce. Praktické informace pro zaměstnavatele i pracovníky.',
  keywords: ['agentura práce Brno', 'pracovní agentura Brno', 'nábor Brno', 'práce Brno', 'personální agentura Brno', 'agenturní zaměstnávání'],
  intro:
    'Brno je druhým největším městem České republiky a významným centrem jižní Moravy s rozvinutým sektorem technologií, výroby, služeb a s výraznou rolí univerzit. Trh práce zde kombinuje poptávku po kvalifikovaných i provozních pozicích. Tato stránka popisuje, jak v brněnském kontextu funguje nábor a agenturní zaměstnávání, a odkazuje na podrobnější informace o pravidlech. Konkrétní statistické údaje o trhu práce ověřte u Českého statistického úřadu.',
  sections: [
    {
      heading: 'Brněnský trh práce v kostce',
      body: [
        'Brno spojuje silný technologický a univerzitní ekosystém s výrobou a službami. Poptávka tak míří jak po specializovaných, tak po provozních a sezónních pozicích.',
        'Aktuální čísla o trhu práce se mění; statistiky zveřejňuje Český statistický úřad a Úřad práce ČR. Tato stránka je záměrně neuvádí.',
      ],
    },
    {
      heading: 'Jak agentura práce v Brně pomáhá',
      body: [
        'Pracovní agentura pomáhá brněnským zaměstnavatelům obsadit pozice a pracovníkům najít práci. Nabízí permanentní nábor i agenturní zaměstnávání s dočasným přidělením.',
        'U zahraničních pracovníků agentura koordinuje administrativu spojenou s oprávněními a může pomoci se zázemím včetně ubytování.',
      ],
      bullets: [
        'Permanentní nábor pro stálé pozice',
        'Agenturní zaměstnávání pro sezónní a projektové potřeby',
        'Koordinace administrativy u zahraničních pracovníků',
        'Podpora při onboardingu a zázemí',
      ],
    },
    {
      heading: 'Pravidla platí celostátně',
      body: [
        'Pravidla pro zaměstnávání, povolení a odvody jsou celostátní – v Brně platí stejně jako jinde v ČR. Lokální je trh práce a dostupnost kandidátů. Podrobnosti najdete v navazujících článcích.',
      ],
    },
  ],
  faq: [
    { q: 'Liší se pravidla zaměstnávání v Brně od zbytku ČR?', a: 'Pravidla pro povolení, odvody a pracovní právo jsou celostátní a v Brně platí stejně jako jinde. Lokální je trh práce a dostupnost kandidátů.' },
    { q: 'Jaké pozice agentura v Brně nejčastěji obsazuje?', a: 'Od provozních a sezónních pozic ve výrobě a službách po specializované technologické role. Konkrétní zaměření závisí na aktuální poptávce.' },
    { q: 'Kde najdu statistiky brněnského trhu práce?', a: 'Aktuální statistiky zveřejňuje Český statistický úřad a Úřad práce ČR. Tato stránka konkrétní čísla neuvádí.' },
  ],
  sources: [SRC.czso, SRC.upcr, SRC.zakonOZamestnanosti],
  internalLinks: [
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    { href: '/prace-pro-cizince-brno', label: 'Práce pro cizince v Brně' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
    { href: '/faq-zamestnavani-pracovniku', label: 'Časté dotazy k zaměstnávání pracovníků' },
  ],
  cta: {
    eyebrow: 'Nábor v Brně',
    title: 'Hledáte pracovníky v Brně?',
    text: 'Pomůžeme vám s náborem i agenturním zaměstnáváním v brněnském regionu, včetně administrativy u zahraničních pracovníků.',
    buttonLabel: 'Poslat poptávku',
    href: '/submit-offer',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRACE_PRO_CIZINCE_PRAHA: SeoPage = {
  slug: 'prace-pro-cizince-praha',
  breadcrumbLabel: 'Práce pro cizince Praha',
  eyebrow: 'Cizinci · Praha',
  title: 'Práce pro cizince v Praze: jak začít a co je potřeba',
  heroSubtitle:
    'Co potřebují cizinci k práci v Praze – přístup na trh práce, oprávnění a praktické kroky. Pravidla jsou celostátní, lokální je nabídka pozic.',
  description:
    'Práce pro cizince v Praze – přístup na trh práce, potřebná oprávnění a praktické kroky. Pravidla platí celostátně; přehled s odkazy na oficiální zdroje.',
  keywords: ['práce pro cizince Praha', 'práce cizinci Praha', 'zaměstnání cizinci Praha', 'pracovní povolení Praha', 'zaměstnanecká karta', 'volný vstup trh práce'],
  intro:
    'Praha nabízí cizincům širokou škálu pracovních příležitostí, samotná pravidla pro práci cizinců jsou však celostátní a v Praze se neliší od zbytku republiky. Klíčové je vědět, zda má pracovník volný vstup na trh práce, nebo zda potřebuje oprávnění, a jaké kroky ho čekají. Tato stránka shrnuje základní orientaci pro cizince hledající práci v Praze a odkazuje na podrobnější informace. Nejde o právní poradenství – konkrétní situaci ověřte u příslušných úřadů.',
  sections: [
    {
      heading: 'Přístup na trh práce',
      body: [
        'Občané EU, EHP a Švýcarska mají v ČR volný vstup na trh práce a pracovní povolení nepotřebují. Část cizinců ze třetích zemí má rovněž volný vstup (například osoby s trvalým pobytem). Ostatní zpravidla potřebují platné pracovní i pobytové oprávnění.',
        'Zjistit, do které kategorie pracovník patří, je prvním a nejdůležitějším krokem. Od toho se odvíjí celý další postup.',
      ],
    },
    {
      heading: 'Praktické kroky',
      body: [
        'Pokud pracovník potřebuje oprávnění, je obvyklé, že zaměstnavatel nejprve nahlásí volné místo Úřadu práce ČR a následně se podá žádost o příslušné oprávnění. Práci lze zahájit až po nabytí jeho platnosti.',
      ],
      bullets: [
        'Zjistit přístup na trh práce podle situace pracovníka',
        'U pozic s oprávněním nahlásit volné místo Úřadu práce ČR',
        'Podat žádost o správný typ oprávnění',
        'Nastoupit až po nabytí platnosti oprávnění',
      ],
    },
    {
      heading: 'Kde hledat příležitosti',
      body: [
        'Volná místa pro občany EU zprostředkovává mimo jiné portál EURES. Pracovní agentura může pomoci najít vhodnou pozici a zorientovat se v administrativě. V Praze je nabídka pozic díky velikosti trhu obvykle pestrá.',
      ],
    },
  ],
  faq: [
    { q: 'Potřebuji k práci v Praze pracovní povolení?', a: 'Záleží na vaší situaci. Občané EU, EHP a Švýcarska povolení nepotřebují. Občané třetích zemí zpravidla ano, pokud nemají volný vstup na trh práce. Pravidla jsou celostátní.' },
    { q: 'Jsou pravidla v Praze jiná než jinde?', a: 'Ne. Pravidla pro práci cizinců jsou celostátní. Lokální je pouze nabídka pracovních pozic, která je v Praze obvykle široká.' },
    { q: 'Kdy mohu nastoupit do práce?', a: 'Pokud potřebujete oprávnění, lze nastoupit až po nabytí jeho platnosti. Dřívější nástup se může posuzovat jako nelegální práce.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonOPobytuCizincu, SRC.eures, SRC.upcr],
  internalLinks: [
    { href: '/agentura-prace-praha', label: 'Agentura práce v Praze' },
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení v ČR' },
    { href: '/zamestnanecka-karta-2026', label: 'Zaměstnanecká karta' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Potřebné dokumenty' },
    { href: '/faq-zamestnavani-pracovniku', label: 'Časté dotazy k zaměstnávání pracovníků' },
  ],
  cta: {
    eyebrow: 'Hledáte práci?',
    title: 'Hledáte práci v Praze?',
    text: 'Ozvěte se nám – pomůžeme vám najít vhodnou pozici a zorientovat se v tom, co je k práci v ČR potřeba.',
    buttonLabel: 'Kontaktujte nás',
    href: '/contact',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const PRACE_PRO_CIZINCE_BRNO: SeoPage = {
  slug: 'prace-pro-cizince-brno',
  breadcrumbLabel: 'Práce pro cizince Brno',
  eyebrow: 'Cizinci · Brno',
  title: 'Práce pro cizince v Brně: jak začít a co je potřeba',
  heroSubtitle:
    'Co potřebují cizinci k práci v Brně – přístup na trh práce, oprávnění a praktické kroky. Pravidla jsou celostátní, lokální je nabídka pozic.',
  description:
    'Práce pro cizince v Brně – přístup na trh práce, potřebná oprávnění a praktické kroky. Pravidla platí celostátně; přehled s odkazy na oficiální zdroje.',
  keywords: ['práce pro cizince Brno', 'práce cizinci Brno', 'zaměstnání cizinci Brno', 'pracovní povolení Brno', 'zaměstnanecká karta', 'volný vstup trh práce'],
  intro:
    'Brno se svým technologickým a univerzitním zázemím nabízí cizincům příležitosti v kvalifikovaných i provozních oborech. Pravidla pro práci cizinců jsou ovšem celostátní a v Brně se neliší od zbytku ČR. Zásadní je zjistit, zda má pracovník volný vstup na trh práce, nebo potřebuje oprávnění. Tato stránka shrnuje základní orientaci pro cizince hledající práci v Brně a odkazuje na podrobnější informace. Nejde o právní poradenství – konkrétní situaci ověřte u příslušných úřadů.',
  sections: [
    {
      heading: 'Přístup na trh práce',
      body: [
        'Občané EU, EHP a Švýcarska mají volný vstup na trh práce a povolení nepotřebují. Část cizinců ze třetích zemí má rovněž volný vstup. Ostatní zpravidla potřebují platné pracovní i pobytové oprávnění.',
        'Určení kategorie, do které pracovník patří, je výchozím krokem celého postupu.',
      ],
    },
    {
      heading: 'Praktické kroky',
      body: [
        'U pozic vyžadujících oprávnění zaměstnavatel obvykle nejprve nahlásí volné místo Úřadu práce ČR a poté se podá žádost. Nástup je možný až po nabytí platnosti oprávnění.',
      ],
      bullets: [
        'Zjistit přístup na trh práce podle situace pracovníka',
        'U pozic s oprávněním nahlásit volné místo Úřadu práce ČR',
        'Podat žádost o správný typ oprávnění',
        'Nastoupit až po nabytí platnosti oprávnění',
      ],
    },
    {
      heading: 'Kde hledat příležitosti',
      body: [
        'Volná místa pro občany EU zprostředkovává portál EURES. Pracovní agentura může pomoci s vyhledáním pozice i s administrativou. V Brně bývá silná poptávka po technických i provozních profesích.',
      ],
    },
  ],
  faq: [
    { q: 'Potřebuji k práci v Brně pracovní povolení?', a: 'Záleží na vaší situaci. Občané EU, EHP a Švýcarska povolení nepotřebují. Občané třetích zemí zpravidla ano, pokud nemají volný vstup na trh práce. Pravidla jsou celostátní.' },
    { q: 'Jsou pravidla v Brně jiná než jinde?', a: 'Ne. Pravidla pro práci cizinců jsou celostátní. Lokální je pouze nabídka pracovních pozic.' },
    { q: 'Kdy mohu nastoupit do práce?', a: 'Pokud potřebujete oprávnění, lze nastoupit až po nabytí jeho platnosti. Dřívější nástup se může posuzovat jako nelegální práce.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonOPobytuCizincu, SRC.eures, SRC.upcr],
  internalLinks: [
    { href: '/agentura-prace-brno', label: 'Agentura práce v Brně' },
    { href: '/pracovni-povoleni-cr', label: 'Přehled pracovních povolení v ČR' },
    { href: '/zamestnanecka-karta-2026', label: 'Zaměstnanecká karta' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Potřebné dokumenty' },
    { href: '/faq-zamestnavani-pracovniku', label: 'Časté dotazy k zaměstnávání pracovníků' },
  ],
  cta: {
    eyebrow: 'Hledáte práci?',
    title: 'Hledáte práci v Brně?',
    text: 'Ozvěte se nám – pomůžeme vám najít vhodnou pozici a zorientovat se v tom, co je k práci v ČR potřeba.',
    buttonLabel: 'Kontaktujte nás',
    href: '/contact',
  },
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const FAQ_ZAMESTNAVANI_PRACOVNIKU: SeoPage = {
  slug: 'faq-zamestnavani-pracovniku',
  breadcrumbLabel: 'FAQ zaměstnávání pracovníků',
  eyebrow: 'Rozcestník · Časté dotazy',
  title: 'FAQ: zaměstnávání pracovníků a cizinců v ČR',
  heroSubtitle:
    'Časté dotazy k zaměstnávání pracovníků a cizinců v České republice na jednom místě, s odkazy na podrobné stránky. Obecné informace, nikoli právní poradenství.',
  description:
    'Často kladené dotazy k zaměstnávání pracovníků a cizinců v ČR – povolení, odvody, minimální mzda, agenturní zaměstnávání a další. Rozcestník na podrobné stránky.',
  keywords: ['FAQ zaměstnávání', 'časté dotazy zaměstnávání cizinců', 'pracovní povolení FAQ', 'odvody FAQ', 'agenturní zaměstnávání', 'zaměstnávání pracovníků'],
  intro:
    'Tato stránka shromažďuje nejčastější dotazy k zaměstnávání pracovníků a cizinců v České republice na jednom místě a u každého tématu odkazuje na podrobnou stránku. Slouží jako rozcestník pro zaměstnavatele i pracovníky, kteří hledají rychlou orientaci. Odpovědi mají obecný informační charakter a u proměnlivých údajů, jako jsou sazby, lhůty a částky, odkazují na oficiální zdroje. Nejde o právní poradenství.',
  sections: [
    {
      heading: 'Jak rozcestník používat',
      body: [
        'Níže najdete odpovědi na opakující se otázky rozdělené podle témat. U každé oblasti existuje samostatná stránka s podrobnostmi – odkazy na ně jsou shrnuté v sekci Související na konci stránky.',
        'U konkrétních hodnot (sazby pojistného, výše minimální mzdy, lhůty a poplatky) vždy doporučujeme ověření u příslušné instituce, protože se mohou měnit.',
      ],
    },
    {
      heading: 'Témata, kterým se věnujeme',
      body: [
        'Cluster pokrývá zaměstnávání cizinců, pracovní povolení a karty, odvody a mzdové náklady, minimální mzdu, fungování pracovní agentury, dočasné přidělení i praktické zázemí jako ubytování. Geograficky se věnujeme také Praze a Brnu.',
      ],
      bullets: [
        'Zaměstnávání cizinců a pracovní povolení',
        'Odvody, mzdové náklady a minimální mzda',
        'Agenturní zaměstnávání a dočasné přidělení',
        'Dokumenty, legalizace práce a ubytování',
        'Lokální kontext: Praha a Brno',
      ],
    },
  ],
  faq: [
    { q: 'Potřebuje cizinec k práci v ČR povolení?', a: 'Občané EU, EHP a Švýcarska povolení nepotřebují. Občané třetích zemí zpravidla ano, pokud nemají volný vstup na trh práce. Podrobnosti najdete na stránce o pracovních povoleních a o zaměstnávání cizinců.' },
    { q: 'Jaký je rozdíl mezi zaměstnaneckou a modrou kartou?', a: 'Zaměstnanecká karta je obecné duální oprávnění k pobytu i práci, modrá karta cílí na vysoce kvalifikované pozice. Obě vydává Ministerstvo vnitra.' },
    { q: 'Jaká je minimální mzda v roce 2026?', a: 'Konkrétní částku neuvádíme, protože se může měnit. Aktuální výši zveřejňuje MPSV. Více vysvětluje stránka o minimální mzdě 2026.' },
    { q: 'Kdo platí sociální a zdravotní pojištění?', a: 'Pojistné se hradí společně – část odvádí zaměstnavatel, část se strhává zaměstnanci ze mzdy. Aktuální sazby zveřejňují ČSSZ a zdravotní pojišťovny.' },
    { q: 'Co je agenturní zaměstnávání?', a: 'Pracovník je zaměstnancem agentury a je dočasně přidělen k uživateli. Agentura musí mít platné povolení ke zprostředkování zaměstnání a platí požadavek srovnatelných podmínek.' },
    { q: 'Kdy může cizinec nastoupit do práce?', a: 'Pokud je vyžadováno oprávnění, lze nastoupit až po nabytí jeho platnosti. Dřívější nástup se může posuzovat jako nelegální práce.' },
    { q: 'Jaké dokumenty cizinec potřebuje?', a: 'Obvykle cestovní doklad, oprávnění, pracovní smlouvu nebo příslib, doklad o kvalifikaci a o ubytování. Závazný seznam stanovuje úřad podle typu oprávnění.' },
    { q: 'Jsou náklady na zaměstnance vyšší než hrubá mzda?', a: 'Ano. K hrubé mzdě se připojují povinné odvody zaměstnavatele a podle situace další položky. Přesné sazby zveřejňují ČSSZ a zdravotní pojišťovny.' },
  ],
  sources: [SRC.zakonOZamestnanosti, SRC.zakonOPobytuCizincu, SRC.mpsv, SRC.cssz, SRC.mvcr, SRC.upcr],
  internalLinks: [
    { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' },
    { href: '/pracovni-povoleni-cr', label: 'Pracovní povolení v ČR' },
    { href: '/socialni-zdravotni-dane-2026', label: 'Sociální a zdravotní daně 2026' },
    { href: '/minimalni-mzda-2026', label: 'Minimální mzda 2026' },
    { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
    { href: '/modra-karta-cr', label: 'Modrá karta' },
    { href: '/zamestnanecka-karta-2026', label: 'Zaměstnanecká karta 2026' },
    { href: '/dokumenty-pro-zamestnani-cizincu', label: 'Dokumenty pro zaměstnání cizinců' },
    { href: '/povinnosti-zamestnavatele', label: 'Povinnosti zaměstnavatele' },
    { href: '/naklady-na-zamestnance-cr', label: 'Náklady na zaměstnance' },
    { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
    { href: '/chyby-pri-zamestnavani-cizincu', label: 'Chyby při zaměstnávání cizinců' },
    { href: '/legalizace-prace-cizincu', label: 'Legalizace práce cizinců' },
    { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
    { href: '/ubytovani-pro-pracovniky', label: 'Ubytování pro pracovníky' },
    { href: '/agentura-prace-praha', label: 'Agentura práce Praha' },
    { href: '/agentura-prace-brno', label: 'Agentura práce Brno' },
    { href: '/prace-pro-cizince-praha', label: 'Práce pro cizince Praha' },
    { href: '/prace-pro-cizince-brno', label: 'Práce pro cizince Brno' },
  ],
  cta: {
    eyebrow: 'Nenašli jste odpověď?',
    title: 'Máte konkrétní dotaz?',
    text: 'Rádi vám pomůžeme s náborem i s orientací v administrativě zaměstnávání. Ozvěte se nám.',
    buttonLabel: 'Kontaktujte nás',
    href: '/contact',
  },
  showToc: false,
  meta,
  datePublished: TODAY,
  dateModified: TODAY,
}

export const GEO_PAGES: ReadonlyArray<SeoPage> = [
  AGENTURA_PRACE_PRAHA,
  AGENTURA_PRACE_BRNO,
  PRACE_PRO_CIZINCE_PRAHA,
  PRACE_PRO_CIZINCE_BRNO,
  FAQ_ZAMESTNAVANI_PRACOVNIKU,
]
