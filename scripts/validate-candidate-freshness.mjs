/**
 * Risk-based freshness for the candidate corpus.
 *
 * TWO TIERS, NOT ONE CEILING
 * ──────────────────────────
 * A consular procedure and the definition of an Employee Card do not decay at
 * the same rate. A document list can be replaced the week after it is checked,
 * and a stale one costs a candidate a consular appointment and a flight; the
 * statutory definition of the permit changes when the statute changes. A single
 * 180-day window would let procedure rot for half a year; a single 90-day window
 * would churn stable explainers for nothing.
 *
 *   procedural   90 days   consular procedure, application mechanics, document
 *                          requirements, programme eligibility, quotas
 *   conceptual  180 days   stable Employee Card explainers, rights overviews,
 *                          stable conceptual legal content
 *
 * BLOCK-LEVEL OVERRIDE
 * ────────────────────
 * A page can be conceptual while one of its sections is not: the Employee Card
 * explainer is stable, and the paragraph inside it naming processing times and
 * appointment mechanics is not. A section may tighten its tier, never loosen it,
 * so a 90-day block cannot hide inside a 180-day page.
 *
 * SOURCE REVISION BEATS THE CALENDAR
 * ──────────────────────────────────
 * The ceiling is a floor on diligence, not the whole of it. A page is stale the
 * moment any source it cites has a recorded revision later than the page's
 * lastVerifiedAt — regardless of age. Waiting out eighty-nine more days on
 * content already known to be superseded is the failure this prevents.
 */
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const R = await import('../lib/locale/registry.ts')
const { FRESHNESS_DAYS, TIER_PRECEDENCE } = await import('../lib/locale/content/types.ts')
const { revisionFor, SOURCE_REVISIONS } = await import('../lib/locale/content/source-revisions.ts')
const { LATAM_SRC } = await import('../lib/locale/content/sources-latam.ts')
const { LABOUR_SRC } = await import('../lib/locale/content/sources-labour.ts')
// Both registries, or every labour citation would be rejected as an unknown id.
// The set is deliberately built from the registries rather than from the ids
// actually cited: an id nobody cites yet must still be recognised, and an id
// that exists nowhere must still fail.
const KNOWN_SOURCE_IDS = new Set(
  [...Object.values(LATAM_SRC), ...Object.values(LABOUR_SRC)].map((x) => x.id),
)
const PTBR = (await import('../lib/locale/content/pt-BR/index.ts')).PTBR_CONTENT
const ES = (await import('../lib/locale/content/es/index.ts')).ES_CONTENT

const CORPORA = { 'pt-BR': PTBR, es: ES }

const DAY = 86_400_000
const isIsoDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s))
const daysBetween = (a, b) => Math.floor((a - Date.parse(b)) / DAY)

/**
 * The strictest of the page tier and any section override.
 *
 * Driven by TIER_PRECEDENCE rather than a chain of includes() checks, so adding
 * a fourth tier cannot silently fall through to the loosest ceiling — which is
 * exactly what the previous `includes('procedural') ? ... : 'conceptual'` form
 * would have done to statutory-annual.
 */
const effectiveTier = (entry) => {
  const tiers = [entry.freshness.freshness, ...entry.sections.map((s) => s.freshness).filter(Boolean)]
  return TIER_PRECEDENCE.find((t) => tiers.includes(t)) ?? 'conceptual'
}

export function auditCandidateFreshness({ corpora = CORPORA, now = Date.now(), revisions = null } = {}) {
  const errors = []
  const notes = []
  const revision = revisions ? (id) => revisions[id] ?? null : revisionFor
  let checked = 0
  const perTier = { procedural: 0, conceptual: 0, 'statutory-annual': 0 }

  for (const [locale, corpus] of Object.entries(corpora)) {
    for (const concept of R.ALL_CONCEPTS) {
      if (!concept.published.includes(locale)) continue
      const entry = corpus[concept.id]?.[locale]
      if (!entry) continue

      const f = entry.freshness
      if (!f) {
        errors.push(
          `${locale}/${concept.id}: candidate content carries no freshness metadata — immigration content with no ` +
            `verification date cannot be told apart from content that is current`,
        )
        continue
      }

      checked++

      if (f.jurisdiction !== 'CZ') errors.push(`${locale}/${concept.id}: jurisdiction is "${f.jurisdiction}", expected CZ`)
      if (f.timeSensitive !== true) errors.push(`${locale}/${concept.id}: timeSensitive must be true`)
      if (!['BR', 'LATAM'].includes(f.audienceMarket)) {
        errors.push(`${locale}/${concept.id}: audienceMarket "${f.audienceMarket}" is not BR or LATAM`)
      }
      if (!isIsoDate(f.lastVerifiedAt)) {
        errors.push(`${locale}/${concept.id}: lastVerifiedAt "${f.lastVerifiedAt}" is not an ISO date`)
        continue
      }
      if (f.effectiveFrom && !isIsoDate(f.effectiveFrom)) {
        errors.push(`${locale}/${concept.id}: effectiveFrom "${f.effectiveFrom}" is not an ISO date`)
      }
      if (!Array.isArray(f.officialSources) || f.officialSources.length === 0) {
        errors.push(`${locale}/${concept.id}: cites no official source — a claim with no source cannot be re-verified`)
        continue
      }
      // Normalise once, before any loop reads a property off an entry.
      // A hole in the array — `[a, , b]` — yields undefined, type-checks clean,
      // and used to crash with a TypeError rather than report anything. Doing
      // this per-loop was not enough: a real edit produced the hole, the first
      // loop was guarded, and the revision loop below still crashed on it.
      const holes = f.officialSources.filter((x) => !x || typeof x !== 'object').length
      if (holes) {
        errors.push(
          `${locale}/${concept.id}: officialSources contains ${holes} hole(s) or non-object entr(ies) — a sparse ` +
            `array literal type-checks clean and silently drops a source from every check below`,
        )
      }
      const sources = f.officialSources.filter((x) => x && typeof x === 'object')

      for (const src of sources) {
        if (!src.id || !src.url || !isIsoDate(src.accessedAt)) {
          errors.push(`${locale}/${concept.id}: source "${src.name ?? src.id}" is missing an id, url or accessedAt`)
          continue
        }
        // An id not in LATAM_SRC silently disables the revision override for
        // that source forever — revisionFor returns null and says nothing. The
        // corpus cites both zakon-95-2004 and zakon-96-2004, so a one-digit
        // slip between two real ids is a realistic way to lose the check.
        if (!KNOWN_SOURCE_IDS.has(src.id)) {
          errors.push(
            `${locale}/${concept.id}: cites unknown source id "${src.id}" — it is not in LATAM_SRC, so no ` +
              `revision of it can ever invalidate this page`,
          )
        }
        // accessedAt is evidence that the source was actually reopened. Never
        // age-checking it let "last verified today" rest on a source last
        // opened years ago.
        const accessAge = daysBetween(now, src.accessedAt)
        if (accessAge > FRESHNESS_DAYS.conceptual) {
          errors.push(
            `${locale}/${concept.id}: source "${src.id}" was last accessed ${accessAge} days ago — ` +
              `a verification date cannot rest on evidence older than the conceptual ceiling`,
          )
        }
      }

      // Calendar ceiling, by the stricter of page and section tier.
      const tier = effectiveTier(entry)
      perTier[tier]++
      const age = daysBetween(now, f.lastVerifiedAt)
      // A future date passes every ceiling, permanently.
      if (age < 0) {
        errors.push(
          `${locale}/${concept.id}: lastVerifiedAt ${f.lastVerifiedAt} is in the future, which would satisfy ` +
            `every ceiling forever`,
        )
      }
      const ceiling = FRESHNESS_DAYS[tier]
      if (age > ceiling) {
        errors.push(
          `${locale}/${concept.id}: last verified ${age} days ago, over the ${ceiling}-day ${tier} ceiling — ` +
            `re-verify against its sources and update lastVerifiedAt`,
        )
      }

      // A statutory figure expires on a date, not after a number of days. The
      // 2026 minimum wage is false on 1 January 2027 while still comfortably
      // inside its 90-day window, so the day ceiling cannot be what catches it.
      if (tier === 'statutory-annual') {
        if (!Number.isInteger(f.validForYear)) {
          errors.push(
            `${locale}/${concept.id}: is statutory-annual but declares no validForYear — a figure with a known ` +
              `expiry date cannot be governed by a rolling day count alone`,
          )
        } else {
          const currentYear = new Date(now).getUTCFullYear()
          if (currentYear > f.validForYear) {
            errors.push(
              `${locale}/${concept.id}: carries statutory figures declared for ${f.validForYear}, but the year is ` +
                `${currentYear} — re-read the amounts from the MPSV notice for ${currentYear} and update the copy, ` +
                `not just the metadata`,
            )
          }
        }
      } else if (f.validForYear !== undefined) {
        // Otherwise a page could carry a reassuring year that gates nothing.
        errors.push(
          `${locale}/${concept.id}: declares validForYear ${f.validForYear} on a ${tier} page — the year is only ` +
            `enforced on statutory-annual content, so this would gate nothing`,
        )
      }

      // Source revision, which overrides the calendar in the strict direction.
      for (const src of sources) {
        const revised = revision(src.id)
        if (revised && Date.parse(revised) >= Date.parse(f.lastVerifiedAt)) {
          errors.push(
            `${locale}/${concept.id}: cites "${src.id}", revised ${revised}, but was last verified ` +
              `${f.lastVerifiedAt} — a known source change makes the page stale immediately, ahead of any ceiling`,
          )
        }
      }
    }
  }

  notes.push(`${checked} candidate page(s) carry freshness metadata`)
  notes.push(
    `${perTier.procedural} procedural (${FRESHNESS_DAYS.procedural}d) · ${perTier.conceptual} conceptual ` +
      `(${FRESHNESS_DAYS.conceptual}d) · ${perTier['statutory-annual']} statutory-annual (${FRESHNESS_DAYS['statutory-annual']}d + year gate)`,
  )
  notes.push(`${SOURCE_REVISIONS.length} recorded source revision(s) checked against every citation`)
  return { errors, notes }
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, notes } = auditCandidateFreshness()
  console.log('Candidate freshness gate')
  notes.forEach((n) => console.log('  · ' + n))
  if (errors.length) {
    console.log(`\n${errors.length} violation(s):`)
    errors.forEach((e) => console.log('  ✗ ' + e))
    console.log('\nCandidate freshness gate: FAIL')
    process.exit(1)
  }
  console.log('\nCandidate freshness gate: PASS')
}
