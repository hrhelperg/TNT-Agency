// Structured legal/labour-law topics + the article registry. Article HTML
// rendered for blog posts is composed deterministically from these objects;
// no rates, percentages or government rules are embedded as free-text prose.

import type { ArticleData, LegalTopic } from './types'

export const LEGAL_TOPICS: ReadonlyArray<LegalTopic> = [
  {
    slug: 'socialni-pojisteni',
    title: 'Sociální pojištění v ČR',
    summary:
      'Sociální pojištění zahrnuje povinné odvody na důchodové pojištění, nemocenské pojištění a státní politiku zaměstnanosti. Konkrétní sazby jsou určovány zákonem a mohou se každoročně měnit.',
    jurisdiction: 'Česká republika',
    legalReferences: [
      {
        name: 'Zákon č. 589/1992 Sb., o pojistném na sociální zabezpečení a příspěvku na státní politiku zaměstnanosti',
        publisher: 'Sbírka zákonů ČR',
      },
      {
        name: 'Česká správa sociálního zabezpečení – přehled pro plátce',
        publisher: 'ČSSZ',
        url: 'https://www.cssz.cz/',
      },
    ],
    notes: [
      'Aktuální sazby a maximální vyměřovací základ je nutné každoročně ověřit u ČSSZ.',
      'Zaměstnavatel odvádí pojistné za sebe i za zaměstnance, jehož část strhává ze mzdy.',
    ],
    meta: {
      locale: 'cs',
      lastUpdated: '2026-05-05',
      jurisdiction: 'CZ',
      isGeneralInformation: true,
    },
  },
  {
    slug: 'zdravotni-pojisteni',
    title: 'Zdravotní pojištění v ČR',
    summary:
      'Zdravotní pojištění je v ČR povinné a zajišťuje úhradu zdravotní péče. Pojistné odvádí zaměstnavatel za zaměstnance i sám za sebe v zákonem stanovených sazbách.',
    jurisdiction: 'Česká republika',
    legalReferences: [
      {
        name: 'Zákon č. 592/1992 Sb., o pojistném na veřejné zdravotní pojištění',
        publisher: 'Sbírka zákonů ČR',
      },
      {
        name: 'Všeobecná zdravotní pojišťovna – informace pro zaměstnavatele',
        publisher: 'VZP ČR',
        url: 'https://www.vzp.cz/',
      },
    ],
    notes: [
      'Aktuální výši minimálního vyměřovacího základu je nutné ověřit u příslušné zdravotní pojišťovny.',
      'Zaměstnanec si může zvolit zdravotní pojišťovnu; zaměstnavatel odvádí pojistné té, u které je zaměstnanec registrován.',
    ],
    meta: {
      locale: 'cs',
      lastUpdated: '2026-05-05',
      jurisdiction: 'CZ',
      isGeneralInformation: true,
    },
  },
]

export const findLegalTopic = (slug: string): LegalTopic | undefined =>
  LEGAL_TOPICS.find((t) => t.slug === slug)

// ─────────────────────────────────────────────────────────────────────────────
// Article registry — structured data for blog articles. The Czech 2026 piece
// on social/health levies is intentionally cautious: no rates, no invented
// numbers. The article body asks the reader to verify exact values with ČSSZ,
// finanční správa, and zdravotní pojišťovny.
// ─────────────────────────────────────────────────────────────────────────────

export const ARTICLE_SOCIALNI_ZDRAVOTNI_DANE_2026: ArticleData = {
  slug: 'socialni-zdravotni-dane-2026',
  title:
    'Sociální a zdravotní daně 2026: přehled pro zaměstnance a zaměstnavatele',
  description:
    'Praktický přehled povinných odvodů – sociálního pojištění a zdravotního pojištění – pro zaměstnance a zaměstnavatele v ČR pro rok 2026. Bez vymyšlených sazeb, s odkazy na oficiální zdroje.',
  keywords: [
    'sociální daň 2026',
    'zdravotní pojištění 2026',
    'odvody zaměstnavatel',
    'odvody zaměstnanec',
    'zaměstnávání pracovníků',
    'pracovní agentura',
  ],
  intro:
    'Sociální a zdravotní pojištění tvoří v České republice základní povinné odvody, které musí každý zaměstnavatel odvádět za své zaměstnance. Tento přehled vysvětluje, co se pod těmito pojmy skrývá, jaké povinnosti mají zaměstnavatelé a zaměstnanci a co je vhodné v roce 2026 sledovat. Konkrétní sazby a limity se mohou měnit a je nutné je vždy ověřit u oficiálních institucí (ČSSZ, finanční správa, zdravotní pojišťovny). Cílem tohoto textu není nahradit právní nebo daňové poradenství, ale poskytnout srozumitelný úvod do problematiky.',
  sections: [
    {
      heading: 'Co znamenají sociální a zdravotní odvody',
      body: [
        'Sociální pojištění zahrnuje pojistné na důchodové pojištění, nemocenské pojištění a příspěvek na státní politiku zaměstnanosti. Sleduje a vybírá ho Česká správa sociálního zabezpečení (ČSSZ).',
        'Zdravotní pojištění slouží k financování veřejné zdravotní péče. Odvádí se příslušné zdravotní pojišťovně, u které je zaměstnanec registrován.',
        'Z hlediska zaměstnavatele jde o povinné odvody, které jsou vázané na vyměřovací základ – obvykle hrubou mzdu zaměstnance v rámci limitů stanovených zákonem.',
      ],
    },
    {
      heading: 'Povinnosti zaměstnavatele',
      body: [
        'Zaměstnavatel přihlašuje zaměstnance k sociálnímu i zdravotnímu pojištění při nástupu a odhlašuje ho při ukončení pracovního poměru. Tyto úkony se provádějí elektronicky vůči ČSSZ a vůči zdravotní pojišťovně zaměstnance.',
        'Zaměstnavatel měsíčně vypočítá pojistné, část srazí zaměstnanci ze mzdy, část hradí sám a v zákonem stanovených lhůtách odvede správným příjemcům.',
        'Mzdové výpočty, evidenci a zasílání hlášení musí zaměstnavatel uchovávat po dobu stanovenou zákonem (typicky řadu let) pro účely případných kontrol.',
      ],
      bullets: [
        'Přihlašování a odhlašování zaměstnanců u ČSSZ a zdravotní pojišťovny',
        'Měsíční výpočet a odvod pojistného z hrubé mzdy',
        'Vedení mzdové evidence, výplatních pásek a archivace',
        'Reakce na kontroly ČSSZ, zdravotních pojišťoven nebo finanční správy',
      ],
    },
    {
      heading: 'Povinnosti zaměstnance',
      body: [
        'Zaměstnanec se obvykle nemusí o samotný odvod pojistného starat – výpočet a odvod zajišťuje zaměstnavatel ze mzdy. Důležité je však sledovat výplatní pásku, kde je sražené pojistné vidět.',
        'Zaměstnanec si vybírá zdravotní pojišťovnu a její změnu hlásí zaměstnavateli, aby pojistné putovalo správně.',
        'Při souběhu více pracovních poměrů, dohod nebo samostatné výdělečné činnosti je vhodné zkontrolovat, zda nedochází k nesprávnému výpočtu nebo k překročení limitů. V případě pochybností je nejlepší obrátit se přímo na ČSSZ nebo na příslušnou zdravotní pojišťovnu.',
      ],
    },
    {
      heading: 'Co sledovat v roce 2026',
      body: [
        'Pro rok 2026 doporučujeme zejména sledovat aktuální sazby pojistného, výši minimálního a maximálního vyměřovacího základu, případné změny u dohod o provedení práce a dohod o pracovní činnosti a pravidla pro souběh více příjmů.',
        'Tato stránka záměrně neuvádí konkrétní procentní sazby nebo limity pro rok 2026 – pravidla se mohou v průběhu roku měnit a každý zaměstnavatel by měl vycházet přímo z aktuálních informací ČSSZ, finanční správy a vlastní zdravotní pojišťovny.',
      ],
      bullets: [
        'Aktuální sazby pojistného na sociální a zdravotní pojištění',
        'Minimální a maximální vyměřovací základ',
        'Pravidla pro DPP, DPČ a souběh příjmů',
        'Termíny pro odvod pojistného a podání hlášení',
      ],
    },
    {
      heading: 'Nejčastější chyby',
      body: [
        'Mezi opakující se chyby u zaměstnavatelů patří pozdní přihlášení zaměstnance, nesprávné určení vyměřovacího základu (zejména u dohod a souběhů), chybný odvod ke zdravotní pojišťovně, u které zaměstnanec již není registrován, nebo opomenutí ohlásit změnu trvalého pobytu cizince.',
        'Tyto chyby vedou k doměrkům, penále a v některých případech k pokutám. Většině z nich lze předejít pravidelnou kontrolou mzdové evidence a včasnou aktualizací vstupních údajů zaměstnance.',
      ],
    },
    {
      heading: 'Shrnutí',
      body: [
        'Sociální a zdravotní pojištění představuje pro zaměstnavatele i zaměstnance pravidelnou administrativní povinnost s přímým dopadem na čistou mzdu i na rozpočet firmy. V roce 2026 se vyplatí mít přehled o aktuálních sazbách, evidenci kvalitně vést a v případě nejistoty raději ověřit konkrétní situaci u oficiálních institucí, případně u personální či účetní firmy.',
        'TNT Agency jako personální agentura se sídlem v Pardubicích pomáhá zaměstnavatelům i pracovníkům orientovat se v náboru a v základním rámci pracovněprávních povinností. Pro konkrétní výpočty a přesné sazby vždy doporučujeme oficiální zdroje uvedené níže.',
      ],
    },
  ],
  faq: [
    {
      q: 'Kdo platí sociální a zdravotní pojištění za zaměstnance?',
      a: 'Pojistné se hradí společně. Část odvádí zaměstnavatel ze svých prostředků a část strhává zaměstnanci ze mzdy. Celkový odvod a způsob výpočtu se řídí platnými zákony a aktuálními sazbami, které jsou dostupné u ČSSZ a u zdravotních pojišťoven.',
    },
    {
      q: 'Kde najdu aktuální sazby pojistného pro rok 2026?',
      a: 'Aktuální sazby je nejlépe ověřit přímo na webu České správy sociálního zabezpečení (ČSSZ), na webech jednotlivých zdravotních pojišťoven a u finanční správy. Tato stránka neuvádí konkrétní sazby, aby nedošlo k zobrazení neaktuálních údajů.',
    },
    {
      q: 'Co když mám více pracovních poměrů zároveň?',
      a: 'Při souběhu více pracovních poměrů, dohod nebo samostatné výdělečné činnosti se uplatňují zvláštní pravidla. Doporučujeme situaci konzultovat s mzdovou účetní, daňovým poradcem nebo přímo s ČSSZ a se zdravotní pojišťovnou, u které jste registrován/a.',
    },
    {
      q: 'Týkají se tato pravidla i agenturních pracovníků?',
      a: 'Ano. U agenturního zaměstnávání je formálním zaměstnavatelem pracovní agentura, která za pracovníka odvádí sociální a zdravotní pojistné stejně jako kterýkoliv jiný zaměstnavatel. Konkrétní podmínky musí odpovídat zákonu č. 435/2004 Sb., o zaměstnanosti.',
    },
  ],
  sources: [
    {
      name: 'Česká správa sociálního zabezpečení (ČSSZ)',
      publisher: 'ČSSZ',
      url: 'https://www.cssz.cz/',
      note: 'Oficiální zdroj informací o sociálním pojištění, sazbách a vyměřovacím základu.',
    },
    {
      name: 'Finanční správa ČR',
      publisher: 'Generální finanční ředitelství',
      url: 'https://www.financnisprava.cz/',
      note: 'Informace k dani z příjmů a souvisejícím povinnostem zaměstnavatele.',
    },
    {
      name: 'Všeobecná zdravotní pojišťovna ČR',
      publisher: 'VZP ČR',
      url: 'https://www.vzp.cz/',
      note: 'Informace pro plátce zdravotního pojištění.',
    },
    {
      name: 'Zákon č. 589/1992 Sb., o pojistném na sociální zabezpečení',
      publisher: 'Sbírka zákonů ČR',
    },
    {
      name: 'Zákon č. 592/1992 Sb., o pojistném na veřejné zdravotní pojištění',
      publisher: 'Sbírka zákonů ČR',
    },
  ],
  internalLinks: [
    {
      href: '/agencies',
      label: 'Podívejte se na služby pracovní agentury',
    },
    {
      href: '/offers',
      label: 'Aktuální nabídky a poptávky',
    },
    {
      href: '/zamestnavani-cizincu',
      label: 'Zaměstnávání cizinců v ČR',
    },
    {
      href: '/contact',
      label: 'Kontaktujte nás ohledně náboru pracovníků',
    },
    {
      href: '/blog/agenturni-pracovnici-vs-interni-zamestnanci.html',
      label: 'Agenturní pracovníci vs. interní zaměstnanci',
    },
    {
      href: '/blog/nezamestnanost-brezen-2026.html',
      label: 'Nezaměstnanost ČR – březen 2026',
    },
  ],
  meta: {
    locale: 'cs',
    lastUpdated: '2026-05-05',
    dataYear: 2026,
    jurisdiction: 'CZ',
    isGeneralInformation: true,
  },
  datePublished: '2026-05-05',
  dateModified: '2026-05-05',
}

export const ARTICLES: ReadonlyArray<ArticleData> = [
  ARTICLE_SOCIALNI_ZDRAVOTNI_DANE_2026,
]

export const findArticle = (slug: string): ArticleData | undefined =>
  ARTICLES.find((a) => a.slug === slug)
