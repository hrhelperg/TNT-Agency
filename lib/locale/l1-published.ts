import { LOCALIZED_LOCALES, type Locale } from './locales'
import { L1_CONCEPTS, type L1Concept } from './l1-concepts'
import { hasLocaleContent } from './content/corpus'

/**
 * L1 concepts with `published` DERIVED, never declared.
 *
 * Publication state was briefly a hand-maintained field, flipped cluster by
 * cluster by pattern-matching the source file. That is exactly the kind of
 * edit that works for eight concepts and quietly corrupts the thirty-eighth:
 * a regex that matches one line too many, or too few, produces a concept that
 * claims to be published and is not — which is a phantom URL in the sitemap,
 * in hreflang and in the switcher.
 *
 * So nothing is edited. A locale is published when its content exists, which is
 * a fact the module system can answer and no pattern can get wrong. Adding a
 * cluster file is the whole act of publishing it.
 *
 * Content is necessary but not sufficient: the route file must exist too, and
 * scripts/validate-l1-publication.mjs checks that separately against the
 * filesystem. Two independent conditions, deliberately not derived from each
 * other — if they disagree, one of them is wrong and the gate says so.
 */
export const L1_REGISTRY_CONCEPTS: readonly (L1Concept & { published: readonly Locale[] })[] =
  L1_CONCEPTS.map((concept) => {
    const published: Locale[] = ['cs']
    for (const locale of LOCALIZED_LOCALES) {
      if (concept.urls[locale] && hasLocaleContent(concept.id, locale)) published.push(locale)
    }
    return { ...concept, published }
  })
