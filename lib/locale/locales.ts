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

export const LOCALES = ['cs', 'en', 'de'] as const
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
