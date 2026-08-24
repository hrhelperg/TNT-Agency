/**
 * The frozen L1 publication manifest.
 *
 * Every other L1 gate derives its universe from `LOCALE_CONCEPTS`, and
 * `LOCALE_CONCEPTS` derives `published` from the content existing. That makes
 * the suite self-consistent and, in one specific way, blind: remove a concept's
 * content, its route file and its map entry together and every gate agrees
 * about a smaller world. Agreement then reads as correctness. An independent
 * refuter deleted the whole `role-brief` concept this way and the tree returned
 * 29/29 validators, 5/5 mutation suites and 642/642 unit tests green, with the
 * fidelity gate announcing "set equality holds: 621 Czech source items, 621
 * mapped, both directions equal".
 *
 * `validate-l1-publication.mjs` already states the principle this file exists to
 * satisfy — "a single derived source would simply agree with itself and report
 * nothing" — and then checked two conditions that were both derived from the
 * same registry. This is the missing independent half: a literal, human-owned
 * record of what L1 is supposed to contain, which nothing computes.
 *
 * Editing this list is how the release scope changes, and the diff is the review
 * signal. It must never be regenerated from the registry; doing so restores
 * exactly the blindness it was written against.
 *
 * PROVENANCE. These 38 ids were frozen from the registry state at 991fd02 —
 * a state independently corroborated at that SHA by refuters who did not read
 * this file: one derived 38 concepts / 76 pages / 96 localized routes /
 * 281 sitemap URLs from the registry and the served site, another proved the
 * 175 Czech routes byte-identical to origin/main and the build exactly 271
 * static routes, and a third reproduced the 634 Czech source items from the
 * source files alone. Anchoring to a corroborated state is not the same as a
 * map certifying itself; the anchor's value is that it cannot move quietly.
 */

/** Every L1 concept, by id. Sorted for a readable diff; order is not meaningful. */
export const L1_MANIFEST_CONCEPTS: readonly string[] = [
  'absence-cover',
  'agency-contract',
  'agency-employment',
  'agency-fees',
  'automation-technicians',
  'automotive-workers',
  'choosing-an-agency',
  'cnc-operators',
  'construction-workers',
  'direct-hire',
  'direct-sourcing',
  'editorial-policy',
  'electricians',
  'employee-retention',
  'employer-faq',
  'employer-glossary',
  'engineering-roles',
  'engineering-trades',
  'food-production-workers',
  'hard-to-fill-roles',
  'logistics-specialists',
  'logistics-workers',
  'maintenance-technicians',
  'onboarding',
  'process-and-design-engineers',
  'production-ramp-up',
  'purchasing-and-supply',
  'quality-roles',
  'recruitment-overview',
  'recruitment-planning',
  'role-brief',
  'seasonal-capacity',
  'shift-supervisors',
  'technical-office-roles',
  'time-to-hire',
  'volume-hiring',
  'warehouse-workers',
  'welders',
]

/** Each L1 concept ships in both non-Czech locales. A concept in one only is a defect, not a variant. */
export const L1_MANIFEST_LOCALES: readonly ('en' | 'de')[] = ['en', 'de']

/**
 * The frozen architecture totals.
 *
 * `staticRoutes` counts real page routes; `prerenderedPages` additionally counts
 * the /404 and /500 documents Next emits, which is what a build-artifact check
 * sees. Both are recorded because gates read different artifacts and a single
 * number invites a silent off-by-two.
 */
export const L1_EXPECTED = {
  l1Concepts: 38,
  l1Pages: 76,
  localizedRoutes: 96,
  czechRoutes: 185,
  staticRoutes: 271,
  prerenderedPages: 273,
  sitemapUrls: 281,
} as const

/**
 * Routes added AFTER the L1 release, declared tier by tier.
 *
 * Why this exists rather than editing the numbers above.
 *
 * L1_EXPECTED is evidence: it records that the L1 release shipped exactly the
 * set that was reviewed, 38 concepts and 76 localized pages. If a later feature
 * simply incremented `czechRoutes` from 185 to 186, that evidence would quietly
 * become a description of "the site as it is now" — which proves nothing,
 * because it would agree with whatever the site happened to contain.
 *
 * So L1's numbers are never touched again. Anything added later declares itself
 * here, and the gate checks the SUM. The effect is that adding a route stays a
 * decision someone has to write down, while L1's frozen totals keep meaning what
 * they meant on the day they were frozen.
 */
export const POST_L1_ADDITIONS = {
  /**
   * Two calculators, three routes each.
   *
   *   1. Czech employer cost — /kalkulacka-nakladu-zamestnavatele plus its
   *      /en and /de views. Those three are CZECH payroll in three languages.
   *   2. German employer cost — /kalkulacka-nakladu-zamestnavatele-nemecko plus
   *      /en/germany-employer-cost-calculator and
   *      /de/arbeitgeberkosten-rechner-deutschland. A different JURISDICTION,
   *      not a translation: separate engine, separate sources, separate
   *      unsupported cases.
   *
   * The two German-language pages are the pair worth naming, because they are
   * the ones a reader can confuse: /de/arbeitgeberkosten-rechner-tschechien is
   * Czech payroll in German, /de/arbeitgeberkosten-rechner-deutschland is German
   * payroll in German, and only the country in the slug separates them.
   */
  czechRoutes: 2,
  /** Their /en and /de pages — two each. */
  localizedRoutes: 4,
  /** All six appear in the sitemap. */
  sitemapUrls: 6,
  /** All six are real page routes. */
  staticRoutes: 6,
  /** …and all six are prerendered as static documents. */
  prerenderedPages: 6,
} as const

/** Site-wide totals: the frozen L1 baseline plus everything declared since. */
export const SITE_EXPECTED = {
  czechRoutes: L1_EXPECTED.czechRoutes + POST_L1_ADDITIONS.czechRoutes,
  localizedRoutes: L1_EXPECTED.localizedRoutes + POST_L1_ADDITIONS.localizedRoutes,
  sitemapUrls: L1_EXPECTED.sitemapUrls + POST_L1_ADDITIONS.sitemapUrls,
  staticRoutes: L1_EXPECTED.staticRoutes + POST_L1_ADDITIONS.staticRoutes,
  prerenderedPages: L1_EXPECTED.prerenderedPages + POST_L1_ADDITIONS.prerenderedPages,
} as const
