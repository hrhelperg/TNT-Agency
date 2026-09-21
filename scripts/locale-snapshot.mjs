/**
 * Deterministic dump of every registry-derived fact, for inertness proofs.
 *
 * The P3 generalization rewrites the concept model from a single shape to a
 * discriminated union. The claim that it changed nothing about cs/en/de is only
 * worth as much as the evidence for it, so this emits the registry's entire
 * observable surface — every route, every locale mapping, every hreflang
 * cluster, every publication fact — as sorted JSON that can be diffed byte for
 * byte across the change.
 *
 * Deliberately reads ONLY exported behaviour, never internals: a snapshot that
 * inspected concept objects directly would diff on `kind` being added and prove
 * nothing about what the site serves.
 *
 * Usage: node --import ./scripts/ts-resolve.mjs scripts/locale-snapshot.mjs > out.json
 */
import * as R from '../lib/locale/registry.ts'

const sorted = (a) => [...a].sort()

const routes = sorted([
  ...R.CZECH_ROUTES,
  ...R.LOCALIZED_ROUTES,
  ...R.COLLAPSED_CZECH_ROUTES,
])

const perRoute = {}
for (const route of routes) {
  const concept = R.conceptForRoute(route)
  perRoute[route] = {
    concept: concept ? concept.id : null,
    locale: R.localeForRoute(route) ?? null,
    alternates: R.alternatesFor(route).map((a) => `${a.locale}=${a.url}`),
  }
}

const concepts = {}
for (const c of sorted(R.ALL_CONCEPTS.map((c) => c.id))) {
  const concept = R.ALL_CONCEPTS.find((x) => x.id === c)
  const urls = {}
  for (const locale of R.LOCALES) {
    const u = R.urlFor(concept, locale)
    if (u) urls[locale] = u
  }
  concepts[c] = {
    urls,
    published: sorted(R.LOCALES.filter((l) => R.isPublished(concept, l))),
    pageType: concept.pageType,
    collapsed: sorted(concept.csCollapsed ?? []),
  }
}

process.stdout.write(
  JSON.stringify(
    {
      locales: [...R.LOCALES],
      localePrefix: R.LOCALE_PREFIX,
      localeHreflang: R.LOCALE_HREFLANG,
      localeLang: R.LOCALE_LANG,
      xDefaultRoute: R.X_DEFAULT_ROUTE,
      czechRoutes: [...R.CZECH_ROUTES],
      localizedRoutes: sorted(R.LOCALIZED_ROUTES),
      publishedLocalizedRoutes: sorted(R.PUBLISHED_LOCALIZED_ROUTES),
      collapsedCzechRoutes: sorted(R.COLLAPSED_CZECH_ROUTES),
      concepts,
      perRoute,
    },
    null,
    2,
  ) + '\n',
)
