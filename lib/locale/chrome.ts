/**
 * Server-rendered header chrome for locale-locked pages.
 *
 * WHY THIS EXISTS. Until now every page shipped the Czech header and relied on
 * public/script.js to rewrite it from `data-i18n` keys after hydration. On the
 * Czech spine that is harmless — the served text is already correct and the
 * swap only runs if a visitor opts into another language. On an /en or /de page
 * it is not: the initial HTML declared `lang="en"` around Czech navigation, and
 * only JavaScript made the two agree. Anything reading the page without running
 * scripts saw a mixed-language document.
 *
 * So the labels live here too, in a form the build can render. That is a second
 * copy of strings that already exist in public/script.js, which is a real cost —
 * paid deliberately, because the alternative is worse. Reading script.js at
 * build time would mean getStaticProps, and getStaticProps would turn statically
 * optimized pages into SSG entries; this site is asserted at 0 SSG and 0 ISR.
 *
 * The copy is kept honest by lib/locale/chrome.test.ts, which parses the real
 * dictionary out of public/script.js and fails if a single label here differs.
 * Drift is therefore a red test, not a silent inconsistency.
 */
import {
  ALL_CONCEPTS,
  csPrimaryOf,
  urlFor,
  type Locale,
} from './registry'

export type LocaleLocked = Exclude<Locale, 'cs'>

/** Keys used by the header and mobile nav. `mnav.*` resolves to `nav.*`. */
export type NavKey =
  | 'home'
  | 'agencies'
  | 'offers'
  | 'calc'
  | 'calcGroup'
  | 'calcCostDe'
  | 'calcCostCz'
  | 'article'
  | 'media'
  | 'submitAgency'
  | 'postOffer'
  | 'contact'
  | 'requestWorkers'
  | 'language'

/** Mirror of `T[lang].nav` in public/script.js. Verified by chrome.test.ts. */
export const CHROME_NAV: Readonly<Record<Locale, Readonly<Record<NavKey, string>>>> = {
  cs: {
    home: 'Úvod',
    agencies: 'Agentury',
    offers: 'Nabídky',
    calc: 'Kalkulačka mezd',
    calcGroup: 'Kalkulačky',
    calcCostDe: 'Náklady zaměstnavatele — Německo',
    calcCostCz: 'Náklady zaměstnavatele — Česko',
    article: 'Průvodce',
    media: 'Média',
    submitAgency: 'Registrovat agenturu',
    postOffer: 'Zadat poptávku',
    contact: 'Kontakt',
    requestWorkers: 'Poptat pracovníky',
    language: 'Jazyk',
  },
  en: {
    home: 'Home',
    agencies: 'Agencies',
    offers: 'Offers',
    calc: 'Payroll calculator',
    calcGroup: 'Calculators',
    calcCostDe: 'Employer costs — Germany',
    calcCostCz: 'Employer costs — Czechia',
    article: 'Guide',
    media: 'Media',
    submitAgency: 'List your agency',
    postOffer: 'Post a request',
    contact: 'Contact',
    requestWorkers: 'Request workers',
    language: 'Language',
  },
  de: {
    home: 'Startseite',
    agencies: 'Agenturen',
    offers: 'Angebote',
    calc: 'Lohnrechner',
    calcGroup: 'Rechner',
    calcCostDe: 'Arbeitgeberkosten — Deutschland',
    calcCostCz: 'Arbeitgeberkosten — Tschechien',
    article: 'Ratgeber',
    media: 'Media',
    submitAgency: 'Agentur eintragen',
    postOffer: 'Anfrage stellen',
    contact: 'Kontakt',
    requestWorkers: 'Personal anfragen',
    language: 'Sprache',
  },
} as const

/**
 * A header destination.
 *
 * `conceptId` is an OVERRIDE, not the mechanism. It is needed only where the
 * Czech URL is not the concept's own primary — the legal pages, whose Czech
 * hrefs are `/terms-cs.html` and friends. Everywhere else resolveNavHref finds
 * the concept by `czechHref === csPrimary`, so a target cannot silently miss a
 * localization just because nobody added an id. A target with no matching
 * concept is a Czech-only page and stays Czech.
 */
export interface LinkTarget {
  readonly czechHref: string
  readonly conceptId?: string
  readonly activePage?: string
  /**
   * Explicit per-locale destinations, for a target whose localized URLs are
   * real but are not Next routes.
   *
   * The Media section is served from a separate Astro deployment through a
   * Netlify proxy, so it has no page file and no LOCALE_CONCEPTS entry — and
   * it must not have one, because validate-l1-publication requires a route
   * file for every published locale. Without this field resolveNavHref would
   * find no concept and send English and German readers to /media stamped
   * hreflang="cs", which is precisely the defect the concept lookup exists to
   * prevent.
   */
  readonly localizedHrefs?: Partial<Record<Locale, string>>
}

export interface NavTarget extends LinkTarget {
  readonly key: NavKey
}

export const NAV_TARGETS: readonly NavTarget[] = [
  { key: 'home', czechHref: '/', conceptId: 'home', activePage: 'home' },
  { key: 'agencies', czechHref: '/agencies', activePage: 'agencies' },
  { key: 'offers', czechHref: '/offers', activePage: 'offers' },
  // The single `calc` slot is rendered by the header as the group below. It
  // stays in this list because everything else — the mobile menu, the active
  // state, the label mirror — is keyed off it.
  { key: 'calc', czechHref: '/kalkulacka-mzdy-agenturniho-zamestnance', activePage: 'calculator' },
  // Served by the Astro publication through a Netlify proxy, not by a Next
  // route — hence localizedHrefs rather than a conceptId. See LinkTarget.
  {
    key: 'media',
    czechHref: '/media',
    activePage: 'media',
    localizedHrefs: { en: '/en/media', de: '/de/media' },
  },
  { key: 'article', czechHref: '/socialni-zdravotni-dane-2026', activePage: 'article' },
  { key: 'submitAgency', czechHref: '/submit-agency', activePage: 'submit-agency' },
  { key: 'postOffer', czechHref: '/submit-offer', activePage: 'submit-offer' },
  { key: 'contact', czechHref: '/contact', conceptId: 'contact', activePage: 'contact' },
]

/**
 * The calculators, as one group in the header.
 *
 * WHY A GROUP AND NOT THREE MORE NAV ITEMS. The Germany employer-cost
 * calculator shipped with exactly one inbound link on the whole site — a
 * related-content entry at the bottom of the Czech calculator — so a German
 * employer landing anywhere under /de/ had no path to it at all. Two more flat
 * nav items would have been the obvious fix and does not fit: the header has
 * 53-64px of slack at 1280-1440, and "Arbeitgeberkosten — Deutschland" alone is
 * wider than that. The group occupies the slot the wage calculator already had,
 * with a SHORTER label, so the nav gets narrower while three calculators become
 * reachable instead of one.
 *
 * The country is spelled out rather than abbreviated on purpose. "DE" here
 * would sit two elements away from the language switcher's "DE" and mean
 * something else entirely — jurisdiction, not page language.
 */
export const CALCULATOR_TARGETS: readonly NavTarget[] = [
  { key: 'calcCostDe', czechHref: '/kalkulacka-nakladu-zamestnavatele-nemecko', activePage: 'de-employer-cost' },
  { key: 'calcCostCz', czechHref: '/kalkulacka-nakladu-zamestnavatele', activePage: 'employer-cost' },
  { key: 'calc', czechHref: '/kalkulacka-mzdy-agenturniho-zamestnance', activePage: 'calculator' },
]

export const REQUEST_WORKERS: NavTarget = {
  key: 'requestWorkers',
  czechHref: '/poptavka-pracovniku',
  conceptId: 'request-staff',
}

/**
 * Where a header link points from a page in `locale`.
 *
 * A target is redirected to its localized equivalent ONLY when that equivalent
 * is actually published in this locale. Otherwise the Czech URL is kept and
 * reported as Czech, because it is: inventing /en/agencies for a page that does
 * not exist would be a 404, and silently sending an English reader to Czech
 * content without saying so is the thing this whole change is fixing.
 *
 * The second element is the value for the anchor's `hreflang` — the language of
 * the DESTINATION, which is exactly what that attribute means. It is omitted
 * when the destination language equals the page language.
 */
export function resolveNavHref(
  target: LinkTarget,
  locale: Locale,
): { href: string; hreflang?: string } {
  if (locale === 'cs') return { href: target.czechHref }

  // An explicit localized URL wins over the concept lookup, and carries no
  // hreflang: the destination is in the reader's own language, which is the
  // condition this function already documents for omitting the attribute.
  const explicit = target.localizedHrefs?.[locale]
  if (explicit) return { href: explicit }

  // A declared conceptId wins. Where none is declared, the concept is DERIVED
  // from the Czech URL, because the alternative failed in exactly the way you
  // would predict: localization happened only when someone remembered to add an
  // id by hand, so publishing an EN/DE page and forgetting its chrome entry left
  // every localized page linking to Czech with no signal anything was wrong.
  // Three entries drifted that way. Route identity already knows the answer, so
  // this asks it rather than trusting a second, hand-kept copy of the mapping.
  const concept = target.conceptId
    ? ALL_CONCEPTS.find((c) => c.id === target.conceptId)
    : ALL_CONCEPTS.find((c) => csPrimaryOf(c) === target.czechHref)

  if (target.conceptId && !concept) {
    throw new Error(`NAV_TARGETS references unknown concept "${target.conceptId}"`)
  }
  if (!concept || !concept.published.includes(locale)) {
    return { href: target.czechHref, hreflang: 'cs' }
  }

  // published implies a declared URL, but a missing one must not become
  // href="undefined" in shipped HTML — fall back to the Czech page and say so.
  const href = urlFor(concept, locale)
  if (!href) return { href: target.czechHref, hreflang: 'cs' }
  return { href }
}

/** Keys the footer renders. Mirrors `T[lang].footer` in public/script.js. */
export type FooterKey =
  | 'tagline'
  | 'colServices'
  | 'links.permanent'
  | 'links.specialist'
  | 'links.temp'
  | 'links.employers'
  | 'colNavigate'
  | 'navAgencies'
  | 'navOffers'
  | 'navCalc'
  | 'navCostDe'
  | 'navCostCz'
  | 'navSubmitAgency'
  | 'navPostOffer'
  | 'navTaxes'
  | 'navBlog'
  | 'colTrust'
  | 'navAbout'
  | 'navEditorial'
  | 'navMedia'
  | 'navContact'
  | 'colGuides'
  | 'guide1'
  | 'guide2'
  | 'guide3'
  | 'guide4'
  | 'guide5'
  | 'colContact'
  | 'copy'
  | 'terms'
  | 'priv'
  | 'cook'

export const CHROME_FOOTER: Readonly<Record<Locale, Readonly<Record<FooterKey, string>>>> = {
  cs: {
    'tagline': 'Váš spolehlivý partner v oblasti zaměstnávání. Spojujeme správné lidi se správnými firmami od prvního dne.',
    'colServices': 'Naše služby',
    'links.permanent': 'Přímý nábor do kmenového stavu',
    'links.specialist': 'Nábor odborných a technických pozic',
    'links.temp': 'Agenturní zaměstnávání',
    'links.employers': 'Pro zaměstnavatele: rozcestník',
    'colNavigate': 'Navigace',
    'navAgencies': 'Agentury',
    'navOffers': 'Nabídky',
    'navCalc': 'Kalkulačka mezd',
    'navCostDe': 'Náklady zaměstnavatele — Německo',
    'navCostCz': 'Náklady zaměstnavatele — Česko',
    'navSubmitAgency': 'Registrovat agenturu',
    'navPostOffer': 'Zadat poptávku',
    'navTaxes': 'Sociální a zdravotní odvody 2026',
    'navBlog': 'Blog',
    'colTrust': 'Důvěra a transparentnost',
    'navAbout': 'O nás a ověření agentury',
    'navEditorial': 'Redakční zásady a zdroje',
    'navMedia': 'TalentPartnerID Media',
    'navContact': 'Kontakt',
    'colGuides': 'Průvodci',
    'guide1': 'Zaměstnávání cizinců',
    'guide2': 'Pracovní povolení v ČR',
    'guide3': 'Nábor zahraničních pracovníků',
    'guide4': 'Minimální mzda 2026',
    'guide5': 'Časté dotazy',
    'colContact': 'Kontakt',
    'copy': '© 2026 TNT agency s.r.o. Všechna práva vyhrazena.',
    'terms': 'Podmínky',
    'priv': 'Ochrana dat',
    'cook': 'Cookies',
  },
  en: {
    'tagline': 'Your trusted employment and staffing partner. Connecting the right people with the right companies since day one.',
    'colServices': 'Our services',
    'links.permanent': 'Direct hire',
    'links.specialist': 'Specialist & technical recruitment',
    'links.temp': 'Temporary agency employment',
    'links.employers': 'For employers: start here',
    'colNavigate': 'Navigate',
    'navAgencies': 'Agencies',
    'navOffers': 'Offers',
    'navCalc': 'Payroll calculator',
    'navCostDe': 'Employer costs — Germany',
    'navCostCz': 'Employer costs — Czechia',
    'navSubmitAgency': 'List your agency',
    'navPostOffer': 'Post a request',
    'navTaxes': 'Social & health contributions 2026',
    'navBlog': 'Blog',
    'colTrust': 'Trust & transparency',
    'navAbout': 'About & agency verification',
    'navEditorial': 'Editorial standards & sources',
    'navMedia': 'TalentPartnerID Media',
    'navContact': 'Contact',
    'colGuides': 'Guides',
    'guide1': 'Employing foreigners',
    'guide2': 'Work permit in the Czech Republic',
    'guide3': 'Recruiting foreign workers',
    'guide4': 'Minimum wage 2026',
    'guide5': 'Frequently asked questions',
    'colContact': 'Contact',
    'copy': '© 2026 TNT agency s.r.o. All rights reserved.',
    'terms': 'Terms',
    'priv': 'Privacy',
    'cook': 'Cookies',
  },
  de: {
    'tagline': 'Ihr zuverlässiger Partner für Personalvermittlung. Wir verbinden die richtigen Menschen mit den richtigen Unternehmen seit dem ersten Tag.',
    'colServices': 'Unsere Leistungen',
    'links.permanent': 'Direktvermittlung',
    'links.specialist': 'Fach- und Technikpositionen',
    'links.temp': 'Zeitarbeit',
    'links.employers': 'Für Arbeitgeber: Übersicht',
    'colNavigate': 'Navigation',
    'navAgencies': 'Agenturen',
    'navOffers': 'Angebote',
    'navCalc': 'Lohnrechner',
    'navCostDe': 'Arbeitgeberkosten — Deutschland',
    'navCostCz': 'Arbeitgeberkosten — Tschechien',
    'navSubmitAgency': 'Agentur eintragen',
    'navPostOffer': 'Anfrage stellen',
    'navTaxes': 'Sozial- und Krankenversicherung 2026',
    'navBlog': 'Blog',
    'colTrust': 'Vertrauen & Transparenz',
    'navAbout': 'Über uns & Agenturprüfung',
    'navEditorial': 'Redaktionsrichtlinien & Quellen',
    'navMedia': 'TalentPartnerID Media',
    'navContact': 'Kontakt',
    'colGuides': 'Ratgeber',
    'guide1': 'Ausländer beschäftigen',
    'guide2': 'Arbeitserlaubnis in Tschechien',
    'guide3': 'Rekrutierung ausländischer Arbeitskräfte',
    'guide4': 'Mindestlohn 2026',
    'guide5': 'Häufige Fragen',
    'colContact': 'Kontakt',
    'copy': '© 2026 TNT agency s.r.o. Alle Rechte vorbehalten.',
    'terms': 'AGB',
    'priv': 'Datenschutz',
    'cook': 'Cookies',
  },
} as const

/**
 * Footer destinations. As with NAV_TARGETS, localization is derived from route
 * identity rather than declared here, so `links.permanent`, `links.temp` and
 * `navEditorial` reach their EN/DE equivalents without carrying an id. Targets
 * with no matching concept are Czech-only pages that stay Czech and say so.
 */
export interface FooterTarget extends LinkTarget {
  readonly key: FooterKey
}

export const FOOTER_TARGETS: readonly FooterTarget[] = [
  { key: 'links.permanent', czechHref: '/primy-nabor-zamestnancu' },
  { key: 'links.specialist', czechHref: '/nabor-odbornych-pozic', conceptId: 'specialist-recruitment' },
  { key: 'links.temp', czechHref: '/docasne-prideleni-zamestnancu' },
  { key: 'links.employers', czechHref: '/pro-zamestnavatele', conceptId: 'for-employers' },
  { key: 'navAgencies', czechHref: '/agencies' },
  { key: 'navOffers', czechHref: '/offers' },
  { key: 'navCalc', czechHref: '/kalkulacka-mzdy-agenturniho-zamestnance' },
  { key: 'navCostDe', czechHref: '/kalkulacka-nakladu-zamestnavatele-nemecko' },
  { key: 'navCostCz', czechHref: '/kalkulacka-nakladu-zamestnavatele' },
  { key: 'navSubmitAgency', czechHref: '/submit-agency' },
  { key: 'navPostOffer', czechHref: '/submit-offer' },
  { key: 'navTaxes', czechHref: '/socialni-zdravotni-dane-2026' },
  { key: 'navBlog', czechHref: '/blog/agenturni-pracovnici-vs-interni-zamestnanci.html' },
  { key: 'navAbout', czechHref: '/o-nas', conceptId: 'about-us' },
  { key: 'navEditorial', czechHref: '/redakcni-zasady' },
  { key: 'navMedia', czechHref: '/media', localizedHrefs: { en: '/en/media', de: '/de/media' } },
  { key: 'navContact', czechHref: '/contact', conceptId: 'contact' },
  { key: 'guide1', czechHref: '/zamestnavani-cizincu' },
  { key: 'guide2', czechHref: '/pracovni-povoleni-cr' },
  { key: 'guide3', czechHref: '/nabor-zahranicnich-pracovniku' },
  { key: 'guide4', czechHref: '/minimalni-mzda-2026' },
  { key: 'guide5', czechHref: '/faq-zamestnavani-pracovniku' },
  // The legal set is a real three-way cluster in LEGAL_CONCEPTS. These entries
  // previously carried the ENGLISH URLs (/terms.html is the English page) in a
  // field named czechHref, so every locale linked to English legal text and
  // resolveNavHref stamped hreflang="cs" on it — a German reader clicking "AGB"
  // reached English Terms, announced as Czech. The Czech URLs are the Czech
  // ones, and the concept ids let each locale resolve its own.
  { key: 'terms', czechHref: '/terms-cs.html', conceptId: 'terms' },
  { key: 'priv', czechHref: '/privacy-cs.html', conceptId: 'privacy-policy' },
  { key: 'cook', czechHref: '/cookies-cs.html', conceptId: 'cookies' },
]

/** Lookup by footer key, so the component never repeats a URL literal. */
export function footerTarget(key: FooterKey): FooterTarget {
  const t = FOOTER_TARGETS.find((x) => x.key === key)
  if (!t) throw new Error(`No FOOTER_TARGETS entry for "${key}"`)
  return t
}

/**
 * Accessibility strings for the shared chrome.
 *
 * These are landmark and control names that only ever reach a screen reader, so
 * they were never in public/script.js and are not part of the CHROME_NAV mirror
 * — nothing to drift from, this file is their only source.
 *
 * The `cs` values are the EXISTING English strings, preserved byte-for-byte on
 * purpose. Czech pages have always announced "Main navigation", and correcting
 * that means editing the markup of all 185 Czech pages, which is outside this
 * corrective pass. It is a real defect of the same class as the German one and
 * should be fixed deliberately rather than smuggled in here.
 */
export type AriaKey =
  | 'mainNav'
  | 'mobileNav'
  | 'openMenu'
  | 'languageSelector'
  | 'websiteLanguage'
  | 'footerNav'
  | 'breadcrumb'

export const CHROME_ARIA: Readonly<Record<Locale, Readonly<Record<AriaKey, string>>>> = {
  cs: {
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    openMenu: 'Open menu',
    languageSelector: 'Language selector',
    websiteLanguage: 'Website language',
    footerNav: 'Footer navigation',
    breadcrumb: 'Breadcrumb',
  },
  en: {
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    openMenu: 'Open menu',
    languageSelector: 'Language selector',
    websiteLanguage: 'Website language',
    footerNav: 'Footer navigation',
    breadcrumb: 'Breadcrumb',
  },
  de: {
    mainNav: 'Hauptnavigation',
    mobileNav: 'Mobile Navigation',
    openMenu: 'Menü öffnen',
    languageSelector: 'Sprachauswahl',
    websiteLanguage: 'Sprache der Website',
    footerNav: 'Fußzeilennavigation',
    breadcrumb: 'Brotkrümelnavigation',
  },
} as const

/** Localized "back to the top of this locale" breadcrumb label. */
export const HOME_LABEL: Readonly<Record<Locale, string>> = {
  cs: 'Úvod',
  en: 'Home',
  de: 'Startseite',
} as const
