/**
 * The canonical locale route registry.
 *
 * ONE source of truth for page identity across cs / en / de. Rendering, the
 * sitemap, hreflang, the language switcher and internal links all resolve
 * through this file; nothing derives a localized URL by string manipulation.
 *
 * Design rules, enforced by scripts/validate-locale-registry.mjs:
 *
 *   1. The Czech URL is IMMUTABLE. It is the existing production canonical and
 *      never changes, is never prefixed, and never gains a /cs/ form.
 *   2. EN and DE URLs are EXPLICIT. A localized route is never inferred by
 *      prepending a prefix to a Czech slug — the slugs are native wording,
 *      frozen by owner review before any route was created.
 *   3. A concept declares exactly ONE Czech primary. Where the Czech corpus
 *      carries several keyword variants of the same idea, only the primary
 *      joins the hreflang cluster; the rest stay Czech-only and self-canonical.
 *      Pointing five Czech pages at one English page would be an invalid
 *      many-to-one hreflang mapping that search engines discard.
 *   4. A missing translation is represented as MISSING. There is no synthesized
 *      URL and no fallback to a locale home — the switcher simply does not
 *      offer that language for that page.
 *   5. Legal pages are mapped READ-ONLY to their existing legacy URLs. They are
 *      already translated as static .html and are not migrated for tidiness.
 *
 * This supersedes the earlier LOCALE_PILOT planning data, which proposed slugs
 * that the owner-frozen L0 set later revised (/en/request-staff not
 * /en/request-workers, /de/fachkraefterekrutierung not /de/fachkraefte-recruiting,
 * and so on). Keeping both would have been two sources of truth.
 */
import { L1_CONCEPTS } from './l1-concepts'

export const LOCALES = ['cs', 'en', 'de'] as const
export type Locale = (typeof LOCALES)[number]

/** URL prefix per locale. Czech is never prefixed — its URLs are unchanged. */
export const LOCALE_PREFIX: Readonly<Record<Locale, string>> = {
  cs: '',
  en: '/en',
  de: '/de',
}

/** hreflang attribute value per locale. */
export const LOCALE_HREFLANG: Readonly<Record<Locale, string>> = {
  cs: 'cs-CZ',
  en: 'en',
  de: 'de',
}

/** html lang attribute per locale. */
export const LOCALE_LANG: Readonly<Record<Locale, string>> = {
  cs: 'cs',
  en: 'en',
  de: 'de',
}

/**
 * x-default points at the Czech root: this is a Czech company serving the Czech
 * market, and an unmatched visitor belongs there rather than on a translation.
 */
export const X_DEFAULT_ROUTE = '/'

export interface LocaleConcept {
  /** Stable, locale-free identity. Never changes once shipped. */
  readonly id: string
  /**
   * The single Czech page that joins this concept's hreflang cluster.
   * Must be one of CZECH_ROUTES.
   */
  readonly csPrimary: string
  /**
   * Czech keyword variants of the same concept. They stay Czech-only,
   * self-canonical, and receive NO locale alternates.
   */
  readonly csCollapsed?: readonly string[]
  /**
   * Explicit localized URLs. An absent locale means the translation does not
   * exist — never a synthesized route.
   */
  readonly urls: Readonly<Partial<Record<Exclude<Locale, 'cs'>, string>>>
  /**
   * Locales whose page is actually BUILT AND SERVED.
   *
   * Declaring a URL and publishing it are different facts, and conflating them
   * is how a sitemap ends up advertising a 404. A locale appears here only once
   * its page exists; until then the URL is a reserved identity, absent from the
   * sitemap, absent from hreflang, and not offered by the switcher.
   */
  readonly published: readonly Locale[]
  readonly pageType: string
  /** Why this concept is localized, and anything a reviewer should know. */
  readonly notes: string
}

/**
 * Every Czech canonical URL, in the exact order of the hand-maintained
 * sitemap this registry replaces.
 *
 * The order is preserved deliberately: scripts/generate-sitemap.mjs must
 * reproduce the existing artifact BYTE-IDENTICALLY before a single localized
 * URL is added. Sorting these would have made the generator look tidier and
 * broken that proof.
 */
export const CZECH_ROUTES: readonly string[] = [
  '/',
  '/o-nas',
  '/redakcni-zasady',
  '/blog/agenturni-pracovnici-vs-interni-zamestnanci.html',
  '/zamestnavani-cizincu',
  '/terms.html',
  '/terms-cs.html',
  '/terms-de.html',
  '/privacy-cs.html',
  '/privacy-de.html',
  '/agencies',
  '/submit-agency',
  '/offers',
  '/submit-offer',
  '/contact',
  '/blog/nezamestnanost-brezen-2026.html',
  '/privacy-policy',
  '/cookies.html',
  '/cookies-cs.html',
  '/cookies-de.html',
  '/socialni-zdravotni-dane-2026',
  '/pracovni-povoleni-cr',
  '/minimalni-mzda-2026',
  '/nabor-zahranicnich-pracovniku',
  '/modra-karta-cr',
  '/zamestnanecka-karta-2026',
  '/dokumenty-pro-zamestnani-cizincu',
  '/povinnosti-zamestnavatele',
  '/naklady-na-zamestnance-cr',
  '/jak-funguje-pracovni-agentura',
  '/chyby-pri-zamestnavani-cizincu',
  '/legalizace-prace-cizincu',
  '/docasne-prideleni-zamestnancu',
  '/ubytovani-pro-pracovniky',
  '/agentura-prace-praha',
  '/agentura-prace-brno',
  '/prace-pro-cizince-praha',
  '/prace-pro-cizince-brno',
  '/faq-zamestnavani-pracovniku',
  '/naklady-na-zamestnance-pardubice',
  '/nedostatek-pracovniku-v-cr',
  '/trh-prace-pardubickykraj',
  '/naklady-na-zamestnance-hradec-kralove',
  '/trh-prace-kralovehradecky-kraj',
  '/naklady-na-zamestnance-stredni-cechy',
  '/trh-prace-stredocesky-kraj',
  '/naklady-na-zamestnance-praha',
  '/trh-prace-praha',
  '/naklady-na-zamestnance-jihomoravsky-kraj',
  '/trh-prace-jihomoravsky-kraj',
  '/naklady-na-zamestnance-moravskoslezsky-kraj',
  '/trh-prace-moravskoslezsky-kraj',
  '/naklady-na-zamestnance-olomoucky-kraj',
  '/trh-prace-olomoucky-kraj',
  '/naklady-na-zamestnance-zlinsky-kraj',
  '/trh-prace-zlinsky-kraj',
  '/naklady-na-zamestnance-vysocina',
  '/trh-prace-vysocina',
  '/naklady-na-zamestnance-jihocesky-kraj',
  '/trh-prace-jihocesky-kraj',
  '/naklady-na-zamestnance-plzensky-kraj',
  '/trh-prace-plzensky-kraj',
  '/naklady-na-zamestnance-karlovarsky-kraj',
  '/trh-prace-karlovarsky-kraj',
  '/naklady-na-zamestnance-ustecky-kraj',
  '/trh-prace-ustecky-kraj',
  '/naklady-na-zamestnance-liberecky-kraj',
  '/trh-prace-liberecky-kraj',
  '/jak-ziskat-zamestnaneckou-kartu',
  '/prodlouzeni-zamestnanecke-karty',
  '/zmena-zamestnavatele-zamestnanecka-karta',
  '/modra-karta-vs-zamestnanecka-karta',
  '/povinnosti-pri-zamestnavani-cizincu',
  '/nelegalni-zamestnavani-cizincu',
  '/sankce-za-nelegalni-zamestnavani',
  '/kontrola-inspektoratu-prace',
  '/zdravotni-pojisteni-cizincu',
  '/socialni-pojisteni-cizincu',
  '/dane-cizincu-v-cr',
  '/prava-a-povinnosti-cizincu',
  '/prace-pro-ukrajince-v-cr',
  '/prace-pro-moldavany-v-cr',
  '/prace-pro-gruzince-v-cr',
  '/prace-pro-filipince-v-cr',
  '/prace-pro-srby-v-cr',
  '/faq-zamestnavani-cizincu',
  '/slovnik-pojmu-zamestnavani-cizincu',
  '/kde-overit-informace-pro-cizince',
  '/pro-zamestnavatele',
  '/poptavka-pracovniku',
  '/nabor-pracovniku',
  '/nabor-zamestnancu',
  '/jak-najit-pracovniky',
  '/planovani-naboru',
  '/fluktuace-zamestnancu',
  '/priciny-fluktuace-zamestnancu',
  '/jak-snizit-fluktuaci',
  '/retence-zamestnancu',
  '/onboarding-zamestnancu',
  '/adaptace-zamestnancu',
  '/checklist-pro-nove-zamestnance',
  '/nedostatek-pracovniku-ve-vyrobe',
  '/nedostatek-pracovniku-v-logistice',
  '/nedostatek-pracovniku-ve-skladech',
  '/nedostatek-pracovniku-ve-stavebnictvi',
  '/skutecne-naklady-na-zamestnance',
  '/kolik-stoji-zamestnanec',
  '/neprime-naklady-na-zamestnance',
  '/faq-pro-zamestnavatele',
  '/nejcastejsi-chyby-zamestnavatelu',
  '/slovnik-pojmu-pro-zamestnavatele',
  '/pracovnici-pro-vyrobu',
  '/operatori-vyroby',
  '/montazni-pracovnici',
  '/pracovnici-do-vyroby',
  '/vyrobni-zamestnanci',
  '/skladnici',
  '/skladovi-pracovnici',
  '/picker-packer',
  '/pracovnici-do-skladu',
  '/manipulacni-pracovnici',
  '/pracovnici-do-logistiky',
  '/logisticti-pracovnici',
  '/pracovnici-pro-distribucni-centra',
  '/pracovnici-pro-ecommerce-sklady',
  '/stavebni-pracovnici',
  '/pracovnici-pro-stavebnictvi',
  '/pomocni-stavebni-pracovnici',
  '/stavebni-profese',
  '/pracovnici-pro-potravinarskou-vyrobu',
  '/baleni-potravin-pracovnici',
  '/vyroba-potravin-pracovnici',
  '/pracovnici-pro-automotive',
  '/automobilovy-prumysl-pracovnici',
  '/montazni-linky-pracovnici',
  '/pracovnici-praha',
  '/nabor-zamestnancu-praha',
  '/pracovnici-brno',
  '/nabor-zamestnancu-brno',
  '/pracovnici-ostrava',
  '/nabor-zamestnancu-ostrava',
  '/pracovnici-plzen',
  '/nabor-zamestnancu-plzen',
  '/pracovnici-pardubice',
  '/nabor-zamestnancu-pardubice',
  '/pracovnici-hradec-kralove',
  '/nabor-zamestnancu-hradec-kralove',
  '/pracovnici-liberec',
  '/nabor-zamestnancu-liberec',
  '/pracovnici-usti-nad-labem',
  '/nabor-zamestnancu-usti-nad-labem',
  '/pracovnici-olomouc',
  '/nabor-zamestnancu-olomouc',
  '/pracovnici-zlin',
  '/nabor-zamestnancu-zlin',
  '/kalkulacka-mzdy-agenturniho-zamestnance',
  '/nabor-odbornych-pozic',
  '/primy-nabor-zamestnancu',
  '/thp-pozice',
  '/odborna-zpusobilost-a-opravneni',
  '/uznavani-kvalifikace-zahranicnich-pracovniku',
  '/nabor-svarecu',
  '/strojirenske-profese',
  '/nabor-cnc-operatoru',
  '/nabor-elektrikaru',
  '/udrzba-a-technicky-servis',
  '/pozice-v-rizeni-kvality',
  '/mistri-a-vedouci-smen',
  '/odborne-pozice-v-logistice',
  '/prime-osloveni-kandidatu',
  '/proc-se-nedari-obsadit-odbornou-pozici',
  '/jak-dlouho-trva-obsazeni-pozice',
  '/cena-sluzeb-personalni-agentury',
  '/jak-vybrat-personalni-agenturu',
  '/smlouva-s-personalni-agenturou',
  '/nabor-techniku-automatizace',
  '/technicti-inzenyri',
  '/technologove-a-konstrukteri',
  '/nakup-a-zasobovani',
  '/hromadny-nabor-pracovniku',
  '/nabor-pri-nabehu-vyroby',
  '/sezonni-navyseni-kapacity',
  '/absence-v-provozu',
  '/cena-neobsazene-pozice',
  '/zadani-pozice-a-profil-kandidata',
]

/**
 * The L0 concepts. Exactly ten, owner-frozen.
 *
 * L1/L2/L3 concepts are NOT here yet: L2 in particular (immigration, payroll,
 * wage and tax content) is gated behind source and freshness review, because a
 * translated statutory claim inherits every accuracy obligation of the original.
 */
const L0_CONCEPTS: readonly LocaleConcept[] = [
  {
    id: 'home',
    csPrimary: '/',
    urls: { en: '/en', de: '/de' },
    published: ['cs', 'en', 'de'],
    pageType: 'hub',
    notes:
      'Locale root. Without it a localized page has no entry point and the locale link graph has no origin. ' +
      'Note the slug is /en and /de, NOT /en/ — next.config.js sets trailingSlash:false and the build emits a ' +
      '308 from /:path+/ , so a trailing-slash form would be a redirect URL, which must never appear in a sitemap. ' +
      'Honouring /en/ would mean flipping trailingSlash globally and changing all 185 Czech canonicals, which the ' +
      'immutable-Czech-URL rule forbids.',
  },
  {
    id: 'for-employers',
    csPrimary: '/pro-zamestnavatele',
    urls: { en: '/en/for-employers', de: '/de/fuer-arbeitgeber' },
    published: ['cs', 'en', 'de'],
    pageType: 'hub',
    notes: 'Employer hub. The locale corpus needs its own hub or every localized page is an island.',
  },
  {
    id: 'cost-of-vacancy',
    csPrimary: '/cena-neobsazene-pozice',
    urls: { en: '/en/cost-of-vacancy', de: '/de/kosten-unbesetzter-stellen' },
    published: ['cs', 'en', 'de'],
    pageType: 'tool',
    notes: 'Calculator driven entirely by values the visitor enters; it asserts no statutory rate, which is why it is L0 rather than L2.',
  },
  {
    id: 'request-staff',
    csPrimary: '/poptavka-pracovniku',
    urls: { en: '/en/request-staff', de: '/de/personal-anfragen' },
    published: ['cs', 'en', 'de'],
    pageType: 'tool',
    notes: 'The conversion path. Exercises form copy, CTA routing and attribution in a locale.',
  },
  {
    id: 'about-us',
    csPrimary: '/o-nas',
    urls: { en: '/en/about-us', de: '/de/ueber-uns' },
    published: ['cs', 'en', 'de'],
    pageType: 'utility',
    notes: 'Trust surface. Company facts must translate without gaining strength.',
  },
  {
    id: 'contact',
    csPrimary: '/contact',
    urls: { en: '/en/contact', de: '/de/kontakt' },
    published: ['cs', 'en', 'de'],
    pageType: 'utility',
    notes: 'Trust surface. An EN/DE visitor needs a contact route in their own language or the locale corpus dead-ends.',
  },
  {
    id: 'specialist-recruitment',
    csPrimary: '/nabor-odbornych-pozic',
    urls: { en: '/en/specialist-recruitment', de: '/de/fachkraefterekrutierung' },
    published: ['cs', 'en', 'de'],
    pageType: 'hub',
    notes: 'Specialist/technical hub.',
  },
  {
    id: 'how-agency-works',
    csPrimary: '/jak-funguje-pracovni-agentura',
    urls: { en: '/en/how-a-staffing-agency-works', de: '/de/wie-eine-personalagentur-funktioniert' },
    published: ['cs', 'en', 'de'],
    pageType: 'knowledge',
    notes: 'Explanatory content with no statutory claim — the lowest-risk knowledge page to prove the architecture on.',
  },
  {
    id: 'employee-turnover',
    csPrimary: '/fluktuace-zamestnancu',
    csCollapsed: ['/priciny-fluktuace-zamestnancu', '/jak-snizit-fluktuaci'],
    urls: { en: '/en/employee-turnover', de: '/de/mitarbeiterfluktuation' },
    published: ['cs', 'en', 'de'],
    pageType: 'problem',
    notes: 'Three Czech pages split turnover into topic, causes and remedies — a Czech search-intent split that does not exist in EN/DE, so they collapse to one localized page.',
  },
  {
    id: 'production-workers',
    csPrimary: '/pracovnici-pro-vyrobu',
    csCollapsed: [
      '/operatori-vyroby',
      '/montazni-pracovnici',
      '/pracovnici-do-vyroby',
      '/vyrobni-zamestnanci',
    ],
    urls: { en: '/en/production-workers', de: '/de/produktionsmitarbeiter' },
    published: ['cs', 'en', 'de'],
    pageType: 'industry',
    notes: 'Five Czech phrasings of the same staffing need. Food and automotive production are separate concepts and are deliberately NOT collapsed in here.',
  },
]

/**
 * Legal pages, mapped READ-ONLY to URLs that already exist as static .html.
 * Listed so the switcher and hreflang can resolve them; never rewritten.
 */
export const LEGAL_CONCEPTS: readonly LocaleConcept[] = [
  {
    id: 'privacy-policy',
    csPrimary: '/privacy-cs.html',
    urls: { en: '/privacy-policy', de: '/privacy-de.html' },
    published: ['cs', 'en', 'de'],
    pageType: 'legal',
    notes: 'Existing legacy translations. Not migrated: changing a live legal URL for registry tidiness is not a reason.',
  },
  {
    id: 'terms',
    csPrimary: '/terms-cs.html',
    urls: { en: '/terms.html', de: '/terms-de.html' },
    published: ['cs', 'en', 'de'],
    pageType: 'legal',
    notes: 'Existing legacy translations.',
  },
  {
    id: 'cookies',
    csPrimary: '/cookies-cs.html',
    urls: { en: '/cookies.html', de: '/cookies-de.html' },
    published: ['cs', 'en', 'de'],
    pageType: 'legal',
    notes: 'Existing legacy translations.',
  },
]

/** Every concept that participates in locale resolution. */
/**
 * L1 concepts join the same registry rather than forming a second one.
 *
 * Everything downstream — hreflang, canonicals, the switcher, the sitemap
 * generator, the collapse rules — reads LOCALE_CONCEPTS. A parallel registry
 * would mean two sources of route truth and, inevitably, two answers.
 *
 * Only PUBLISHED locales are ever emitted, so a concept can be frozen and
 * slugged here long before its pages exist without advertising a phantom URL.
 */
export const LOCALE_CONCEPTS: readonly LocaleConcept[] = [...L0_CONCEPTS, ...L1_CONCEPTS]

export const ALL_CONCEPTS: readonly LocaleConcept[] = [...LOCALE_CONCEPTS, ...LEGAL_CONCEPTS]

/** The URL for a concept in a locale, or undefined when it does not exist. */
export function urlFor(concept: LocaleConcept, locale: Locale): string | undefined {
  return locale === 'cs' ? concept.csPrimary : concept.urls[locale]
}

/** Find the concept that owns a route, in any locale. Undefined if none does. */
export function conceptForRoute(route: string): LocaleConcept | undefined {
  return ALL_CONCEPTS.find(
    (c) =>
      c.csPrimary === route ||
      c.urls.en === route ||
      c.urls.de === route,
  )
}

/** The locale a route belongs to, by registry membership — never by prefix. */
export function localeForRoute(route: string): Locale | undefined {
  const c = conceptForRoute(route)
  if (!c) return CZECH_ROUTES.indexOf(route) !== -1 ? 'cs' : undefined
  if (c.csPrimary === route) return 'cs'
  if (c.urls.en === route) return 'en'
  if (c.urls.de === route) return 'de'
  return undefined
}

/**
 * The locale alternates for a route, for hreflang and the switcher.
 *
 * A collapsed Czech variant returns NOTHING: it is Czech-only by design, and
 * emitting an alternate for it would create the many-to-one mapping rule 3
 * exists to prevent.
 */
export function alternatesFor(route: string): ReadonlyArray<{ locale: Locale; url: string }> {
  const concept = conceptForRoute(route)
  if (!concept) return []
  const out: Array<{ locale: Locale; url: string }> = []
  if (concept.published.includes('cs')) out.push({ locale: 'cs', url: concept.csPrimary })
  for (const locale of ['en', 'de'] as const) {
    const url = concept.urls[locale]
    // PUBLISHED, not merely declared: hreflang must never point at a page that
    // does not exist yet.
    if (url && concept.published.includes(locale)) out.push({ locale, url })
  }
  return out.length > 1 ? out : []
}

/** Czech routes that are collapsed variants — Czech-only, no alternates. */
export const COLLAPSED_CZECH_ROUTES: readonly string[] = LOCALE_CONCEPTS.flatMap(
  (c) => c.csCollapsed ?? [],
)

/** Every localized (non-Czech) route the registry DECLARES, published or not. */
export const LOCALIZED_ROUTES: readonly string[] = LOCALE_CONCEPTS.flatMap((c) =>
  (['en', 'de'] as const).map((l) => c.urls[l]).filter((u): u is string => Boolean(u)),
)

/** Localized routes that are actually built and served — what the sitemap carries. */
export const PUBLISHED_LOCALIZED_ROUTES: readonly string[] = LOCALE_CONCEPTS.flatMap((c) =>
  (['en', 'de'] as const)
    .filter((l) => c.published.includes(l))
    .map((l) => c.urls[l])
    .filter((u): u is string => Boolean(u)),
)

/** True when a concept serves this locale today. */
export const isPublished = (concept: LocaleConcept, locale: Locale): boolean =>
  concept.published.includes(locale) && Boolean(urlFor(concept, locale))
