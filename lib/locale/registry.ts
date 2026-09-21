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
import { L1_REGISTRY_CONCEPTS } from './l1-published'
import { CALCULATOR_CONCEPTS } from './l2-calculators'
import {
  CANDIDATE_NATIVE_CONCEPTS,
  CANDIDATE_CZECH_DERIVED_CONCEPTS,
} from './l3-candidate'
import { hasLocaleContent } from './content/corpus'

// The locale list lives in a leaf module so that l1-published.ts and
// l2-calculators.ts — which the registry imports — can read it without a cycle.
// Re-exported here so every existing `from './registry'` import is unaffected.
import { LOCALES, LOCALIZED_LOCALES } from './locales'
import type { Locale, LocalizedLocale, Audience } from './locales'

export {
  LOCALES,
  LOCALIZED_LOCALES,
  LOCALE_PREFIX,
  LOCALE_HREFLANG,
  LOCALE_LANG,
  LOCALE_AUDIENCE,
  CANDIDATE_LOCALES,
  isCandidateLocale,
  X_DEFAULT_ROUTE,
} from './locales'
export type { Locale, LocalizedLocale, Audience } from './locales'


interface ConceptBase {
  /** Stable, locale-free identity. Never changes once shipped. */
  readonly id: string
  /** Who the page is for. Drives CTA ownership and cluster legality. */
  readonly audience: Audience
  /**
   * Explicit localized URLs. An absent locale means the translation does not
   * exist — never a synthesized route.
   */
  readonly urls: Readonly<Partial<Record<LocalizedLocale, string>>>
  /**
   * Locales whose page is actually BUILT AND SERVED.
   *
   * Declaring a URL and publishing it are different facts, and conflating them
   * is how a sitemap ends up advertising a 404. A locale appears here only once
   * its page exists; until then the URL is a reserved identity, absent from the
   * sitemap, absent from hreflang, and not offered by the switcher.
   *
   * Typed `Locale[]` on BOTH variants rather than narrowing the locale-native
   * case to exclude 'cs'. A narrower type would be marginally stronger and would
   * force edits to a dozen consumers that legitimately ask
   * `published.includes(locale)` without caring which kind they hold — churn
   * that buys nothing, since a locale-native concept publishing 'cs' is caught
   * by scripts/validate-locale-registry.mjs and by registry.test.ts.
   */
  readonly published: readonly Locale[]
  readonly pageType: string
  /** Why this concept is localized, and anything a reviewer should know. */
  readonly notes: string
}

/**
 * A concept whose identity originates in an existing Czech canonical.
 *
 * Every concept was this shape until the candidate corpus arrived.
 */
export interface CzechDerivedConcept extends ConceptBase {
  readonly kind: 'czech-derived'
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
}

/**
 * A concept with no Czech source page at all.
 *
 * The PT-BR/ES candidate corpus is mostly this. Forcing a Czech primary would
 * have meant authoring a dozen Czech pages no Czech employer searches for, and
 * mutating the production CS spine for an architectural convenience; making
 * `csPrimary` merely optional would have weakened the assertion for the 48
 * concepts that genuinely have one. So the absence is modelled explicitly and
 * the type system makes every consumer acknowledge it.
 */
export interface LocaleNativeConcept extends ConceptBase {
  readonly kind: 'locale-native'
  /** The locale owning this concept's identity. Must appear in `urls`. */
  readonly primaryLocale: LocalizedLocale
}

export type LocaleConcept = CzechDerivedConcept | LocaleNativeConcept

/** Declaration shape for a Czech-derived concept; `kind` is stamped centrally. */
export type CzechDerivedInput = Omit<CzechDerivedConcept, 'kind' | 'audience'> & {
  readonly audience?: Audience
}

/** Declaration shape for a locale-native concept; `kind` is stamped centrally. */
export type LocaleNativeInput = Omit<LocaleNativeConcept, 'kind' | 'audience'> & {
  readonly audience?: Audience
}

/**
 * Stamps `kind` and the default audience.
 *
 * Done here rather than on 48 object literals on purpose: the P3 generalization
 * has to be provably inert for cs/en/de, and a 48-site diff is far harder to
 * read than one function. `...c` follows the default so an explicit audience on
 * a concept wins.
 */
export const asCzechDerived = (c: CzechDerivedInput): CzechDerivedConcept => ({
  audience: 'employer',
  ...c,
  kind: 'czech-derived',
})

export const asLocaleNative = (c: LocaleNativeInput): LocaleNativeConcept => ({
  audience: 'candidate',
  ...c,
  kind: 'locale-native',
})

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
  '/kalkulacka-nakladu-zamestnavatele',
  '/kalkulacka-nakladu-zamestnavatele-nemecko',
]

/**
 * The L0 concepts. Exactly ten, owner-frozen.
 *
 * L1/L2/L3 concepts are NOT here yet: L2 in particular (immigration, payroll,
 * wage and tax content) is gated behind source and freshness review, because a
 * translated statutory claim inherits every accuracy obligation of the original.
 */
const L0_DECLARED: readonly CzechDerivedInput[] = [
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
    audience: 'shared',
    urls: {
      en: '/en/about-us',
      de: '/de/ueber-uns',
      'pt-BR': '/pt-br/sobre-nos',
      es: '/es/sobre-nosotros',
    },
    published: ['cs', 'en', 'de'],
    pageType: 'utility',
    notes: 'Trust surface. Company facts must translate without gaining strength.',
  },
  {
    id: 'contact',
    csPrimary: '/contact',
    audience: 'shared',
    urls: {
      en: '/en/contact',
      de: '/de/kontakt',
      'pt-BR': '/pt-br/contato',
      es: '/es/contacto',
    },
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
const LEGAL_DECLARED: readonly CzechDerivedInput[] = [
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
/**
 * Adds candidate locales to a hand-declared concept when its content exists.
 *
 * L0's `published` lists are written by hand and frozen for cs/en/de. Rather
 * than convert them — which would churn ten concepts and weaken the L0 freeze —
 * candidate locales are appended by the same derived rule the other tiers use:
 * a URL plus authored content. about-us and contact are the only L0 concepts
 * with candidate URLs, so nothing else moves.
 */
const withCandidateLocales = (c: CzechDerivedConcept): CzechDerivedConcept => {
  const extra = LOCALIZED_LOCALES.filter(
    (l) => !c.published.includes(l) && c.urls[l] && hasLocaleContent(c.id, l),
  )
  return extra.length ? { ...c, published: [...c.published, ...extra] } : c
}

const L0_CONCEPTS: readonly CzechDerivedConcept[] = L0_DECLARED.map(asCzechDerived).map(
  withCandidateLocales,
)

/**
 * Legal pages, mapped READ-ONLY to URLs that already exist as static .html.
 * Shared audience: a privacy policy is not written for one side of the market.
 */
export const LEGAL_CONCEPTS: readonly CzechDerivedConcept[] = LEGAL_DECLARED.map((c) =>
  asCzechDerived({ audience: 'shared', ...c }),
)

export const LOCALE_CONCEPTS: readonly LocaleConcept[] = [
  ...L0_CONCEPTS,
  ...L1_REGISTRY_CONCEPTS.map(asCzechDerived),
  ...CALCULATOR_CONCEPTS.map(asCzechDerived),
  ...CANDIDATE_CZECH_DERIVED_CONCEPTS.map((c) => asCzechDerived({ audience: 'shared', ...c })),
  ...CANDIDATE_NATIVE_CONCEPTS.map(asLocaleNative),
]

export const ALL_CONCEPTS: readonly LocaleConcept[] = [...LOCALE_CONCEPTS, ...LEGAL_CONCEPTS]

/**
 * The URL that owns a concept's identity.
 *
 * The Czech canonical for a Czech-derived concept; the primary locale's URL for
 * a locale-native one. Anything that used to reach for `.csPrimary` because
 * every concept had one should ask for this instead.
 */
export function primaryUrl(concept: LocaleConcept): string {
  if (concept.kind === 'czech-derived') return concept.csPrimary
  const url = concept.urls[concept.primaryLocale]
  /* istanbul ignore next — validator guarantees this; the throw documents it. */
  if (!url) throw new Error(`${concept.id}: primaryLocale ${concept.primaryLocale} has no URL`)
  return url
}

/** The Czech canonical, or undefined for a concept that has no Czech source. */
export function csPrimaryOf(concept: LocaleConcept): string | undefined {
  return concept.kind === 'czech-derived' ? concept.csPrimary : undefined
}

/** Collapsed Czech variants; always empty for a locale-native concept. */
export function collapsedOf(concept: LocaleConcept): readonly string[] {
  return concept.kind === 'czech-derived' ? concept.csCollapsed ?? [] : []
}

/** Locales this concept actually serves today. */
export function publishedLocales(concept: LocaleConcept): readonly Locale[] {
  return concept.published
}

/**
 * Whether this concept's hreflang cluster carries x-default.
 *
 * Czech-derived clusters do: x-default points at the Czech root, which is where
 * an unmatched visitor to a Czech company's page belongs. Locale-native
 * candidate clusters do NOT — the Czech root is an employer homepage, and
 * sending an unmatched Brazilian candidate there would be a worse answer than
 * sending them nowhere. No truthful default destination exists, so none is
 * claimed.
 */
export function hasXDefault(concept: LocaleConcept): boolean {
  return concept.kind === 'czech-derived'
}

/** The URL for a concept in a locale, or undefined when it does not exist. */
export function urlFor(concept: LocaleConcept, locale: Locale): string | undefined {
  if (locale === 'cs') return csPrimaryOf(concept)
  return concept.urls[locale]
}

/** Find the concept that owns a route, in any locale. Undefined if none does. */
export function conceptForRoute(route: string): LocaleConcept | undefined {
  return ALL_CONCEPTS.find(
    (c) =>
      csPrimaryOf(c) === route ||
      LOCALIZED_LOCALES.some((l) => c.urls[l] === route),
  )
}

/** The locale a route belongs to, by registry membership — never by prefix. */
export function localeForRoute(route: string): Locale | undefined {
  const c = conceptForRoute(route)
  if (!c) return CZECH_ROUTES.indexOf(route) !== -1 ? 'cs' : undefined
  if (csPrimaryOf(c) === route) return 'cs'
  return LOCALIZED_LOCALES.find((l) => c.urls[l] === route)
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
  const cs = csPrimaryOf(concept)
  if (cs && concept.published.includes('cs')) out.push({ locale: 'cs', url: cs })
  for (const locale of LOCALIZED_LOCALES) {
    const url = concept.urls[locale]
    // PUBLISHED, not merely declared: hreflang must never point at a page that
    // does not exist yet.
    if (url && concept.published.includes(locale)) out.push({ locale, url })
  }
  return out.length > 1 ? out : []
}

/** Czech routes that are collapsed variants — Czech-only, no alternates. */
export const COLLAPSED_CZECH_ROUTES: readonly string[] = LOCALE_CONCEPTS.flatMap(collapsedOf)

/** Every localized (non-Czech) route the registry DECLARES, published or not. */
export const LOCALIZED_ROUTES: readonly string[] = LOCALE_CONCEPTS.flatMap((c) =>
  LOCALIZED_LOCALES.map((l) => c.urls[l]).filter((u): u is string => Boolean(u)),
)

/** Localized routes that are actually built and served — what the sitemap carries. */
export const PUBLISHED_LOCALIZED_ROUTES: readonly string[] = LOCALE_CONCEPTS.flatMap((c) =>
  LOCALIZED_LOCALES.filter((l) => c.published.includes(l))
    .map((l) => c.urls[l])
    .filter((u): u is string => Boolean(u)),
)

/** True when a concept serves this locale today. */
export const isPublished = (concept: LocaleConcept, locale: Locale): boolean =>
  concept.published.includes(locale) && Boolean(urlFor(concept, locale))
