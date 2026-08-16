// Internal authority gate v4 (READ-ONLY).
//
// Wave 3 established that raw contextual inbound count hides closed loops: a
// page can show 4 inbound links and still be fed entirely by its own cluster.
// This gate scores the SHAPE of a commercial page's inbound authority, not its
// volume, and it deliberately does NOT make ">= 3 clusters" a universal hard
// fail — §30. Three clusters is a target. A third cluster that is semantically
// artificial is worse than two that are real.
//
//   FAIL   0 or 1 source cluster without a documented exception
//          a closed same-cluster loop (100% of inbound from own cluster)
//          single-cluster dominance above 90%
//          no request path (no employer journey)
//          a growth-cohort page launching without diversified inbound
//          a growth-cohort page below the minimum unique inbound sources
//          an internal link to a non-existent route, or to itself
//          a parameterized internal link
//          a contextual link into the static .html layer
//   REVIEW exactly 2 source clusters — reported, not failed
//   PASS   diversified authority that is semantically justified
//
// Documented exceptions live in TWO_CLUSTER_EXCEPTIONS: each records WHY a third
// cluster would be artificial for that page. An undocumented page that drops to
// one cluster fails; a documented one is reported and allowed.
//
// The audit is exported as a function so scripts/mutate-authority-v4.mjs can run
// the REAL gate against deliberately damaged registries. A mutation harness that
// reimplements the checks proves nothing about the gate that ships.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/validate-authority-v4.mjs
//      (npm run validate:authority-v4)

import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

export const COMMERCIAL = ['technical_talent', 'employer_problem', 'industry', 'knowledge']
export const MIN_CLUSTERS = 2
export const MIN_COHORT_SOURCES = 3
export const MAX_DOMINANCE = 0.9

/**
 * Pages where fewer than three source clusters is the honest answer. Each entry
 * states why another cluster would be manufactured rather than useful, and
 * declares the floor it is documented AT.
 *
 * `floor` matters. An exception is permission to sit at a stated level, not
 * blanket immunity from the diversity check: a page documented as a genuine
 * two-cluster page that later degrades to one cluster has developed a new
 * defect, and the gate must still say so. Only an entry that explicitly
 * declares `floor: 1` may be fed by a single cluster.
 */
export const TWO_CLUSTER_EXCEPTIONS = {
  'nabor-odbornych-pozic': {
    floor: 2,
    reason: 'Cluster hub. Its inbound is knowledge + technical_talent by design; industry pages route to the specific role families beneath it rather than to the umbrella.',
  },
  'minimalni-mzda-2026': {
    floor: 2,
    reason: 'National wage-floor reference. Regional cost pages and knowledge pages are its genuine referrers; an industry or problem page linking here would be decoration.',
  },
  'technicti-inzenyri': {
    floor: 2,
    reason: 'Fed by region (sector mix) + technical_talent. Industry pages route to the concrete engineering roles, not to the umbrella page.',
  },
  'uznavani-kvalifikace-zahranicnich-pracovniku': {
    floor: 2,
    reason: 'Fed by foreign_workers + technical_talent, which is exactly the intersection the page serves.',
  },
  'proc-se-nedari-obsadit-odbornou-pozici': {
    floor: 2,
    reason: 'Diagnostic page fed by knowledge + technical_talent; a shortage page linking here would duplicate its own diagnosis section.',
  },
}

/**
 * Runs the whole gate against a page set. `pages` and `routes` are injected so a
 * mutation harness can damage them; production passes the real registry.
 */
export function auditAuthority({ pages, routes, cohortSlugs, classifyRoute }) {
  const errors = []
  const review = []

  // ── Build the contextual link graph ───────────────────────────────────────
  const inbound = new Map()
  for (const p of pages) {
    for (const l of p.internalLinks ?? []) {
      const t = l.href.replace(/^\//, '').split('#')[0].split('?')[0]
      if (!t || t === p.slug) continue
      if (!inbound.has(t)) inbound.set(t, new Set())
      inbound.get(t).add(p.slug)
    }
  }

  // ── Link hygiene (every page, not just commercial) ────────────────────────
  for (const p of pages) {
    for (const l of p.internalLinks ?? []) {
      const t = l.href.replace(/^\//, '').split('#')[0].split('?')[0]
      if (l.href.includes('?')) errors.push(`${p.slug}: parameterized internal link ${l.href}`)
      if (t === p.slug) errors.push(`${p.slug}: links to itself`)
      else if (/\.html($|#)/.test(l.href)) errors.push(`${p.slug}: contextual link into the static layer ${l.href}`)
      else if (!routes.has(t)) errors.push(`${p.slug}: link to non-existent route ${l.href}`)
    }
  }

  // ── Commercial authority shape ────────────────────────────────────────────
  const rows = []
  for (const p of pages) {
    const cluster = classifyRoute(`/${p.slug}`).cluster
    if (!COMMERCIAL.includes(cluster)) continue

    const srcs = inbound.get(p.slug) ?? new Set()
    const counts = {}
    for (const s of srcs) {
      const c = classifyRoute(`/${s}`).cluster
      counts[c] = (counts[c] ?? 0) + 1
    }
    const nClusters = Object.keys(counts).length
    const dominance = srcs.size ? Math.max(...Object.values(counts)) / srcs.size : 1
    const hrefs = [...(p.internalLinks ?? []).map((l) => l.href), p.cta?.href ?? '']
    const hasRequest = hrefs.some((h) => h.includes('poptavka-pracovniku'))
    rows.push({ slug: p.slug, cluster, sources: srcs.size, nClusters, dominance })

    const exception = TWO_CLUSTER_EXCEPTIONS[p.slug]
    const floor = exception ? exception.floor : MIN_CLUSTERS
    if (nClusters < floor) {
      errors.push(
        exception
          ? `${p.slug}: contextual inbound from only ${nClusters} source cluster(s) — below the floor of ${floor} its documented exception declares`
          : `${p.slug}: contextual inbound from only ${nClusters} source cluster(s), and no documented exception`,
      )
    }
    if (nClusters === 1 && dominance >= 1) {
      errors.push(`${p.slug}: closed same-cluster loop — 100% of contextual inbound comes from its own cluster`)
    }
    if (srcs.size && dominance > MAX_DOMINANCE && nClusters < MIN_CLUSTERS) {
      errors.push(`${p.slug}: ${(dominance * 100).toFixed(0)}% single-cluster dominance (limit ${MAX_DOMINANCE * 100}%)`)
    }
    if (!hasRequest) errors.push(`${p.slug}: no request path — the page offers the employer no way to act`)
    if (cohortSlugs.has(p.slug)) {
      if (srcs.size < MIN_COHORT_SOURCES) {
        errors.push(`${p.slug}: growth-cohort page has ${srcs.size} unique inbound source page(s), minimum ${MIN_COHORT_SOURCES}`)
      }
      if (nClusters < MIN_CLUSTERS) errors.push(`${p.slug}: growth-cohort page launched without diversified inbound`)
    }
    if (nClusters === 2) {
      review.push(`${p.slug} [${cluster}]${TWO_CLUSTER_EXCEPTIONS[p.slug] ? ' (documented)' : ''}`)
    }
  }

  return { errors, review, rows }
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { SEO_PAGES } = await import(path.join(ROOT, 'lib/content/pages/index.ts'))
  const { GROWTH_COHORTS } = await import(path.join(ROOT, 'lib/content/growth-cohorts.ts'))
  const { classifyRoute } = await import(path.join(ROOT, 'lib/analytics/acquisition-clusters.ts'))
  const { buildRouteSet } = await import(path.join(ROOT, 'lib/content/quality-metrics.ts'))

  const { errors, review, rows } = auditAuthority({
    pages: SEO_PAGES,
    routes: buildRouteSet(ROOT),
    cohortSlugs: new Set(GROWTH_COHORTS.flatMap((c) => [...c.slugs])),
    classifyRoute,
  })

  const med = (a) => {
    const s = [...a].sort((x, y) => x - y)
    return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2
  }
  const nc = rows.map((r) => r.nClusters)
  const src = rows.map((r) => r.sources)
  console.log('Internal authority gate v4')
  console.log(`  commercial pages: ${rows.length}`)
  console.log(`  source clusters   <=1: ${rows.filter((r) => r.nClusters <= 1).length} | 2: ${rows.filter((r) => r.nClusters === 2).length} | 3+: ${rows.filter((r) => r.nClusters >= 3).length}`)
  console.log(`  clusters min ${Math.min(...nc)} | median ${med(nc)} | avg ${(nc.reduce((a, b) => a + b, 0) / nc.length).toFixed(2)} | max ${Math.max(...nc)}`)
  console.log(`  unique sources min ${Math.min(...src)} | median ${med(src)} | avg ${(src.reduce((a, b) => a + b, 0) / src.length).toFixed(1)}`)
  console.log(`  dominance >=75%: ${rows.filter((r) => r.dominance >= 0.75).length} | >90%: ${rows.filter((r) => r.dominance > MAX_DOMINANCE).length}`)
  console.log(`  documented two-cluster exceptions: ${Object.keys(TWO_CLUSTER_EXCEPTIONS).length}`)
  if (review.length) {
    console.log(`  REVIEW — exactly 2 source clusters (${review.length}; reported, not failed):`)
    for (const r of review) console.log(`    · ${r}`)
  }

  if (errors.length) {
    console.error(`\nInternal authority gate v4: FAIL (${errors.length})`)
    for (const e of errors.slice(0, 40)) console.error(`  ✗ ${e}`)
    if (errors.length > 40) console.error(`  … and ${errors.length - 40} more`)
    process.exit(1)
  }
  console.log('\nInternal authority gate v4: PASS')
}
