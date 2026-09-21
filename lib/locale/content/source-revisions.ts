/**
 * When each cited source last changed.
 *
 * The calendar ceiling is a floor on diligence, not the whole of it. A document
 * list can be replaced the week after a page is verified, and a 90-day window
 * would let the stale version stand for eighty-nine more days. So a page is
 * stale the moment any source it cites has a `revisedAt` later than the page's
 * `lastVerifiedAt`, regardless of age.
 *
 * Entries are added when a revision is OBSERVED, not predicted. An empty ledger
 * means no cited source is known to have changed since it was read — which is
 * a claim about our knowledge, and exactly why the calendar ceiling still runs
 * underneath it.
 */
export interface SourceRevision {
  readonly sourceId: string
  /** ISO date the source itself changed. */
  readonly revisedAt: string
  readonly note: string
}

export const SOURCE_REVISIONS: readonly SourceRevision[] = [
  {
    sourceId: 'mpo-program-kvalifikovany',
    revisedAt: '2026-03-15',
    note:
      'Programme text amended with effect from 15 March 2026. Country list read at this version: Armenia, Belarus, Montenegro, Philippines, Georgia, India, Kazakhstan, Moldova, Mongolia, North Macedonia, Serbia, Thailand, Ukraine. Brazil absent.',
  },
  {
    sourceId: 'mpo-program-vysoce-kvalifikovany',
    revisedAt: '2026-06-01',
    note:
      'Programme text amended with effect from 1 June 2026. Territorial scope read at this version: "Program není teritoriálně omezen a vztahuje se na zaměstnance ze všech třetích zemí", CZ-ISCO main classes 1-3.',
  },
  {
    sourceId: 'nv-220-2019',
    revisedAt: '2026-07-01',
    note:
      'Per-mission application maxima in force from 1 July 2026. Brasília and São Paulo are not listed; the only Latin American missions with maxima are Bogotá and Havana. The MZV page attributes the amendment to nv 520/2025 Sb. while a secondary source cites nv 109/2026 Sb. — unreconciled, so no amendment number is published in candidate content.',
  },
  {
    sourceId: 'ec-mercosur',
    revisedAt: '2026-05-01',
    note:
      'EU-Mercosur agreement entered provisional application on 1 May 2026. Movement of persons limited to Mode 4 service suppliers (intra-corporate transferees, contractual suppliers) entering temporarily for business purposes.',
  },
  {
    sourceId: 'zakon-96-2004',
    revisedAt: '2026-01-01',
    note: 'Amended by 236/2025 Sb. with effect from 1 January 2026.',
  },
]

/** The latest observed revision date for a source, or null if none is recorded. */
export const revisionFor = (sourceId: string): string | null => {
  const dates = SOURCE_REVISIONS.filter((r) => r.sourceId === sourceId).map((r) => r.revisedAt)
  return dates.length ? dates.sort().at(-1)! : null
}
