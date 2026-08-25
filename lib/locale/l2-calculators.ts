import type { Locale, LocaleConcept } from './registry'
import { EN_CONTENT } from './content/en'
import { DE_CONTENT } from './content/de'

/**
 * Calculator concepts — a tier of their own, deliberately.
 *
 * WHY NOT JUST ADD THIS TO L1
 * ───────────────────────────
 * L1 is frozen. scripts/validate-l1-publication.mjs asserts the registry matches
 * lib/locale/l1-manifest.ts exactly, concept for concept, and that freeze is
 * what proved the L1 release shipped the set that was reviewed and nothing else.
 * Appending a thirty-ninth concept to it would break that proof for a page that
 * was never part of that review — so calculators get their own tier, and L1's
 * frozen count stays a fact about L1.
 *
 * The tier is only an organisational boundary. Everything downstream — hreflang,
 * canonicals, the switcher, the sitemap generator, the collapse rules — reads
 * LOCALE_CONCEPTS, which this joins. There is still one registry.
 *
 * PUBLICATION IS DERIVED, NEVER DECLARED
 * ──────────────────────────────────────
 * Same rule as L1, for the same reason: a hand-maintained `published` field is
 * how a sitemap ends up advertising a 404. A locale is published when its
 * content object exists, which the module system can answer and no pattern can
 * get wrong. The route file existing is a SECOND, independent condition checked
 * against the filesystem by scripts/validate-l1-publication.mjs — if the two
 * ever disagree, one of them is a mistake and the gate says so.
 *
 * WHY THIS CONCEPT IS NOT A VARIANT OF AN EXISTING ONE
 * ────────────────────────────────────────────────────
 * The Czech corpus already carries /kolik-stoji-zamestnanec,
 * /naklady-na-zamestnance-cr and /skutecne-naklady-na-zamestnance. Those are
 * PROSE pages explaining what employing someone costs and how to think about it.
 * This is a statutory calculator: it computes contributions, tax, a net wage and
 * an employer total from the 2026 rules, and its substance is the tool rather
 * than the explanation. Collapsing it into one of them would point four Czech
 * pages at one English page — the many-to-one hreflang mapping rule 3 of the
 * registry exists to prevent — and would bury a calculator inside an essay.
 */

const hasContent = (id: string, locale: Exclude<Locale, 'cs'>): boolean => {
  const corpus = locale === 'en' ? EN_CONTENT : DE_CONTENT
  const entry = corpus[id] as Record<string, unknown> | undefined
  return Boolean(entry && entry[locale])
}

/** Declared identity. `published` is computed below and never written by hand. */
const CALCULATOR_CONCEPTS_DECLARED: readonly Omit<LocaleConcept, 'published'>[] = [
  {
    id: 'germany-employer-cost-calculator',
    csPrimary: '/kalkulacka-nakladu-zamestnavatele-nemecko',
    urls: {
      en: '/en/germany-employer-cost-calculator',
      de: '/de/arbeitgeberkosten-rechner-deutschland',
    },
    pageType: 'tool',
    notes:
      'Statutory GERMAN employer-cost and net-pay calculator for 2026 — a different jurisdiction from every other concept in this registry, not a translation of one. Its German page is German payroll in German, which is why the slug says "deutschland" while the Czech calculator\'s German page says "tschechien": the two live one path segment apart under /de/ and the URLs are the first thing that tells them apart. Nothing is shared between the two engines but exact arithmetic and presentation — see lib/calculators/jurisdiction-boundary.test.ts.',
  },
  {
    id: 'employer-cost-calculator',
    csPrimary: '/kalkulacka-nakladu-zamestnavatele',
    urls: {
      en: '/en/czech-employer-cost-calculator',
      de: '/de/arbeitgeberkosten-rechner-tschechien',
    },
    pageType: 'tool',
    notes:
      'Statutory Czech employer-cost and net-salary calculator for tax year 2026. All three locales are CZECH-JURISDICTION views of the same engine — the German page is Czech payroll explained in German, never German payroll, and its slug says "tschechien" so the URL itself carries that. Deliberately NOT collapsed with the kolik-stoji-zamestnanec / naklady-na-zamestnance-cr prose cluster: those explain, this computes.',
  },
]

export const CALCULATOR_CONCEPTS: readonly LocaleConcept[] = CALCULATOR_CONCEPTS_DECLARED.map(
  (concept) => {
    const published: Locale[] = ['cs']
    for (const locale of ['en', 'de'] as const) {
      if (concept.urls[locale] && hasContent(concept.id, locale)) published.push(locale)
    }
    return { ...concept, published }
  },
)
