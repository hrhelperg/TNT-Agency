/**
 * The locale list, as a leaf module.
 *
 * WHY THIS IS NOT IN registry.ts
 * ──────────────────────────────
 * It was, and that is precisely why `l1-published.ts` and `l2-calculators.ts`
 * each spelled `['en', 'de']` by hand: they are imported BY the registry, so
 * importing the locale list back out of it would have been a cycle. The
 * hardcoded pairs were not carelessness — they were the only thing that worked.
 *
 * Extracting the list to a module that imports nothing removes the cycle, and
 * with it the reason to ever write a locale pair by hand again. registry.ts
 * re-exports everything here, so every existing `from './registry'` import keeps
 * working and the change stays invisible downstream.
 */

export const LOCALES = ['cs', 'en', 'de', 'pt-BR', 'es'] as const
export type Locale = (typeof LOCALES)[number]

/** Every locale behind a URL prefix — all but the unprefixed Czech spine. */
export type LocalizedLocale = Exclude<Locale, 'cs'>
export const LOCALIZED_LOCALES: readonly LocalizedLocale[] = LOCALES.filter(
  (l): l is LocalizedLocale => l !== 'cs',
)

/** URL prefix per locale. Czech is never prefixed — its URLs are unchanged. */
export const LOCALE_PREFIX: Readonly<Record<Locale, string>> = {
  cs: '',
  en: '/en',
  de: '/de',
  // Lowercase, unlike the BCP 47 locale id. Nothing may compose this prefix
  // from the id — see localeFromPathname in route-locale.ts.
  'pt-BR': '/pt-br',
  es: '/es',
}

/** hreflang attribute value per locale. */
export const LOCALE_HREFLANG: Readonly<Record<Locale, string>> = {
  cs: 'cs-CZ',
  en: 'en',
  de: 'de',
  // pt-BR, not pt: the corpus is Brazilian Portuguese specifically, and a bare
  // `pt` would offer it to Portugal, where half its vocabulary reads wrong.
  'pt-BR': 'pt-BR',
  // Plain `es`: neutral Latin-American Spanish serving every Spanish-speaking
  // market, not a country-specialised variant. Country pages, if they ever
  // exist, would be es-PE and friends underneath this.
  es: 'es',
}

/** html lang attribute per locale. */
export const LOCALE_LANG: Readonly<Record<Locale, string>> = {
  cs: 'cs',
  en: 'en',
  de: 'de',
  'pt-BR': 'pt-BR',
  es: 'es',
}

/**
 * x-default points at the Czech root: this is a Czech company serving the Czech
 * market, and an unmatched visitor belongs there rather than on a translation.
 *
 * Applies to Czech-derived clusters only — see `hasXDefault` in registry.ts.
 */
export const X_DEFAULT_ROUTE = '/'

/**
 * Who a page is written for.
 *
 * Not decoration: an employer page and a candidate page can describe the same
 * statute and still not be translations of each other, and clustering them
 * would tell a search engine something false. It also lets CTA ownership be
 * checked structurally — a candidate page linking to the employer request form
 * becomes a build failure rather than a review note.
 */
export type Audience = 'employer' | 'candidate' | 'shared'

/**
 * The audience a whole locale serves.
 *
 * cs/en/de are the employer corpus; pt-BR/es are the candidate corpus. This is
 * a property of the locale, not only of individual pages, because the entire
 * navigation differs: rendering the employer header on a Brazilian candidate
 * page would show "Agencies", "Post a request" and "Request workers", and
 * resolveNavHref would point every one of them at a Czech URL, since none is
 * published in pt-BR. That is Czech chrome leakage and employer CTA routing in
 * one — the two failures §34 and §37 name.
 *
 * A total Record, so a new locale cannot be added without deciding who it is
 * for.
 */
export const LOCALE_AUDIENCE: Readonly<Record<Locale, Audience>> = {
  cs: 'employer',
  en: 'employer',
  de: 'employer',
  'pt-BR': 'candidate',
  es: 'candidate',
}

/** True when this locale's corpus is written for candidates. */
export const isCandidateLocale = (locale: Locale): boolean =>
  LOCALE_AUDIENCE[locale] === 'candidate'

/** Candidate locales, in registry order. */
export const CANDIDATE_LOCALES: readonly Locale[] = LOCALES.filter(isCandidateLocale)
