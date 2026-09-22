/**
 * Freshness metadata constructor for candidate content.
 *
 * A helper rather than repeated literals: `jurisdiction`, `timeSensitive` and
 * `lastVerifiedAt` are the same on every candidate page, and hand-copying a
 * verification date across forty-three files is how one of them ends up a year
 * out of date while claiming otherwise.
 */
import type { FreshnessTier, LocaleFreshness, LocaleSource } from './types'

/**
 * The date the whole candidate corpus was verified against its sources.
 *
 * One date for the corpus, not one per page, because they were all checked in
 * the same pass — see docs/latam-worker-legal-source-audit-2026.md. Re-verifying
 * a single page later means giving that page its own date, not moving this one.
 */
export const CORPUS_VERIFIED_AT = '2026-09-21'

export const freshness = (
  tier: FreshnessTier,
  sources: readonly LocaleSource[],
  market: 'BR' | 'LATAM',
  effectiveFrom?: string,
  validForYear?: number,
): LocaleFreshness => ({
  jurisdiction: 'CZ',
  audienceMarket: market,
  lastVerifiedAt: CORPUS_VERIFIED_AT,
  ...(effectiveFrom ? { effectiveFrom } : {}),
  ...(validForYear ? { validForYear } : {}),
  officialSources: sources,
  freshness: tier,
  timeSensitive: true,
})

/**
 * The calendar year the statutory figures in this corpus are declared for.
 *
 * Named once so the wage figures, the copy that prints the year to the reader
 * and the gate cannot drift apart. Changing this is not a metadata edit: the
 * amounts in the content must be re-read from the MPSV notice for the new year
 * in the same commit, and MPSV publishes the following year's by 30 September.
 */
export const STATUTORY_YEAR = 2026
