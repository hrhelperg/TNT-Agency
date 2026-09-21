/**
 * Locale → content corpus, in one place.
 *
 * `hasContent` was duplicated in l1-published.ts and l2-calculators.ts, each
 * with its own `locale === 'en' ? EN_CONTENT : DE_CONTENT` ternary. A ternary
 * is not a lookup: adding a third locale makes it silently answer DE for
 * everything that is not EN, so every new-locale concept would have reported
 * itself unpublished — or worse, published against the wrong corpus — with no
 * error anywhere.
 *
 * Typed as a total Record over LocalizedLocale, so adding a locale to
 * locales.ts fails the build here until its corpus exists. That is the forcing
 * function the ternary lacked.
 */
import type { LocalizedLocale } from '../locales'
import { EN_CONTENT } from './en'
import { DE_CONTENT } from './de'
import { PTBR_CONTENT } from './pt-BR'
import { ES_CONTENT } from './es'

export const CORPUS: Readonly<Record<LocalizedLocale, Record<string, unknown>>> = {
  en: EN_CONTENT as Record<string, unknown>,
  de: DE_CONTENT as Record<string, unknown>,
  'pt-BR': PTBR_CONTENT as Record<string, unknown>,
  es: ES_CONTENT as Record<string, unknown>,
}

/**
 * True when this concept has authored content for this locale.
 *
 * Publication is derived from this rather than declared, so a concept cannot
 * claim a locale it has no text for. The route file existing is a SECOND,
 * independent condition checked against the filesystem by
 * scripts/validate-l1-publication.mjs.
 */
export const hasLocaleContent = (id: string, locale: LocalizedLocale): boolean => {
  const entry = CORPUS[locale]?.[id] as Record<string, unknown> | undefined
  return Boolean(entry && entry[locale])
}
