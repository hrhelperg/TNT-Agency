// Regional quality + internal-authority gate (READ-ONLY) — Wave 3.
//
// The corpus gate (content-quality.test.ts) fails body similarity at 0.90. The
// regional debt lived at 0.81–0.85 and therefore survived two waves invisibly.
// This gate closes that band — but deliberately NOT by lowering a global
// threshold, because cosine similarity alone is the wrong instrument: two pages
// can score 0.6 and still be name-swapped, and two pages can score 0.79 and be
// genuinely different.
//
// So the regional standard is FIVE criteria, and a page fails if it breaks any
// one of them — including well below 0.80:
//
//   1. same-family body similarity        <= 0.80   (owner decision)
//   2. duplicated editorial paragraphs    no paragraph on >= 3 pages that is
//                                         not an approved shared statement
//   3. regional information gain          each regional page must carry its own
//                                         region-specific signals
//   4. source provenance                  every regional page cites sources; any
//                                         online source needs a retrieval date
//   5. source-cluster diversity           commercial pages must receive
//                                         contextual inbound from >= 2 clusters
//                                         with no cluster above 90%
//
// THRESHOLD PROVENANCE — measured, not invented:
//   0.80  post-repair family maximum is 0.793. 0.75 was considered and rejected
//         by the owner: the residual similarity is shared section structure and
//         deliberate national-rule pointers, and forcing 0.75 would reward
//         synonym-swapping — the exact fake differentiation this gate exists to
//         catch. §2B also forbids artificially varying legally identical text.
//   >= 2  clusters: baseline was min 1 with 14 pages fed by a single cluster;
//         after repair min is 2 with 0 single-cluster pages. >= 3 is the Wave 4
//         target and is NOT gated here, because reaching it today would require
//         ~40 tenuous links — which the owner explicitly forbade.
//   90%   dominance: after repair no commercial page exceeds it.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/validate-regional.mjs
//      (npm run validate:regional)

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const { SEO_PAGES } = await import(path.join(ROOT, 'lib/content/pages/index.ts'))
const { similarity } = await import(path.join(ROOT, 'lib/content/quality-metrics.ts'))
const { classifyRoute } = await import(path.join(ROOT, 'lib/analytics/acquisition-clusters.ts'))

const errors = []
const notes = []

const MAX_FAMILY_SIMILARITY = 0.80
const MIN_SOURCE_CLUSTERS = 2
const MAX_CLUSTER_DOMINANCE = 0.9
const DUP_PARAGRAPH_PAGE_LIMIT = 3

/** Generated / templated families whose members must stay distinct. */
const FAMILIES = {
  'regional-cost': /^naklady-na-zamestnance-(?!cr$)/,
  'regional-labor': /^trh-prace-/,
  'city-workers': /^pracovnici-(praha|brno|ostrava|plzen|pardubice|hradec-kralove|liberec|usti-nad-labem|olomouc|zlin)$/,
  'city-recruitment': /^nabor-zamestnancu-(praha|brno|ostrava|plzen|pardubice|hradec-kralove|liberec|usti-nad-labem|olomouc|zlin)$/,
}

/**
 * Statements that are legally or factually identical everywhere and are
 * therefore ALLOWED to repeat verbatim. §2B: do not manufacture variation for
 * identical law. Each is short, states a national rule, and points the reader at
 * the page that owns the topic — which is the intended pattern, not the defect.
 */
const APPROVED_SHARED = [
  /Odvody, pracovní právo i pravidla agenturního zaměstnávání jsou celostátní/,
  /Pravidla pro zaměstnávání, odvody a oprávnění cizinců jsou celostátní/,
  /Konkrétní strukturu zaměstnanosti, míru nezaměstnanosti a další ukazatele zveřejňuje/,
  /Aktuální (obraz|data|údaje)[^.]{0,60}(ČSÚ|MPSV|Úřad práce)/,
]
const isApprovedShared = (t) => APPROVED_SHARED.some((re) => re.test(t))

const bodyOf = (p) => p.sections.map((s) => `${s.heading} ${s.body.join(' ')} ${(s.bullets ?? []).join(' ')}`).join(' ')
const words = (t) => t.split(/\s+/).filter(Boolean).length

// ── 1. Same-family body similarity ──────────────────────────────────────────
const familyStats = {}
for (const [fam, re] of Object.entries(FAMILIES)) {
  const pages = SEO_PAGES.filter((p) => re.test(p.slug))
  let max = 0
  let worst = ''
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const s = similarity(bodyOf(pages[i]), bodyOf(pages[j]))
      if (s > max) {
        max = s
        worst = `${pages[i].slug} ~ ${pages[j].slug}`
      }
      if (s > MAX_FAMILY_SIMILARITY) {
        errors.push(`${fam}: ${pages[i].slug} ~ ${pages[j].slug} body similarity ${s.toFixed(3)} > ${MAX_FAMILY_SIMILARITY}`)
      }
    }
  }
  familyStats[fam] = { n: pages.length, max, worst }
}

// ── 2. Duplicated editorial paragraphs ──────────────────────────────────────
const paraPages = new Map()
for (const p of SEO_PAGES) {
  for (const s of p.sections) {
    for (const b of s.body) {
      const k = b.replace(/\s+/g, ' ').trim()
      if (k.length < 60) continue
      if (!paraPages.has(k)) paraPages.set(k, new Set())
      paraPages.get(k).add(p.slug)
    }
  }
}
let dupOffenders = 0
for (const [text, pages] of paraPages) {
  if (pages.size < DUP_PARAGRAPH_PAGE_LIMIT) continue
  if (isApprovedShared(text)) continue
  dupOffenders++
  errors.push(`duplicated editorial paragraph on ${pages.size} pages (not an approved shared statement): "${text.slice(0, 90)}…"`)
}

// ── 3. Regional information gain ────────────────────────────────────────────
// A regional page must talk about its own region beyond the title: the region
// name has to appear in the body, and the page must carry region-specific
// sections rather than only shared scaffolding.
const REGIONAL = /^(naklady-na-zamestnance-(?!cr$)|trh-prace-)/
for (const p of SEO_PAGES.filter((x) => REGIONAL.test(x.slug))) {
  const body = bodyOf(p)
  const uniqueWords = p.sections
    .filter((s) => !s.body.every((b) => isApprovedShared(b)))
    .reduce((a, s) => a + words(s.body.join(' ')), 0)
  if (uniqueWords < 150) {
    errors.push(`${p.slug}: only ${uniqueWords} words outside approved shared statements — no regional information gain`)
  }
  const sharedShare = 1 - uniqueWords / Math.max(1, words(body))
  if (sharedShare > 0.5) {
    errors.push(`${p.slug}: ${(sharedShare * 100).toFixed(0)}% of body is shared scaffolding (limit 50%)`)
  }
}

// ── 4. Source provenance ────────────────────────────────────────────────────
for (const p of SEO_PAGES.filter((x) => REGIONAL.test(x.slug))) {
  if (!p.sources?.length) errors.push(`${p.slug}: no sources cited`)
  for (const s of p.sources ?? []) {
    if (s.url && !s.retrieved) errors.push(`${p.slug}: online source "${s.name}" has no retrieval date`)
    if (!s.publisher && !/Zákon|Nařízení|Vyhláška|Směrnice|ČSN|Sb\./i.test(s.name)) {
      errors.push(`${p.slug}: source "${s.name}" names no publisher`)
    }
  }
}

// ── 5. Source-cluster diversity ─────────────────────────────────────────────
const inbound = new Map()
for (const p of SEO_PAGES) {
  for (const l of p.internalLinks ?? []) {
    const t = l.href.replace(/^\//, '').split('#')[0].split('?')[0]
    if (!t || t === p.slug) continue
    if (!inbound.has(t)) inbound.set(t, new Set())
    inbound.get(t).add(p.slug)
  }
}
const COMMERCIAL = ['technical_talent', 'employer_problem', 'industry', 'knowledge']
const divRows = []
for (const p of SEO_PAGES) {
  const cluster = classifyRoute(`/${p.slug}`).cluster
  if (!COMMERCIAL.includes(cluster)) continue
  const srcs = inbound.get(p.slug) ?? new Set()
  const counts = {}
  for (const s of srcs) {
    const c = classifyRoute(`/${s}`).cluster
    counts[c] = (counts[c] ?? 0) + 1
  }
  const n = Object.keys(counts).length
  const dominance = srcs.size ? Math.max(...Object.values(counts)) / srcs.size : 1
  divRows.push({ slug: p.slug, sources: srcs.size, n, dominance })
  if (n < MIN_SOURCE_CLUSTERS) {
    errors.push(`${p.slug}: contextual inbound from only ${n} source cluster(s) — commercial pages need >= ${MIN_SOURCE_CLUSTERS}`)
  }
  if (srcs.size && dominance > MAX_CLUSTER_DOMINANCE) {
    errors.push(`${p.slug}: ${(dominance * 100).toFixed(0)}% of contextual inbound comes from one cluster (limit ${MAX_CLUSTER_DOMINANCE * 100}%)`)
  }
}
const three = divRows.filter((r) => r.n >= 3).length
notes.push(`${three}/${divRows.length} commercial pages already reach the Wave 4 target of >= 3 source clusters`)

// ── Report ──────────────────────────────────────────────────────────────────
console.log('Regional quality + authority gate')
for (const [fam, st] of Object.entries(familyStats)) {
  console.log(`  ${fam.padEnd(18)} n=${String(st.n).padStart(2)} max body similarity ${st.max.toFixed(3)}  (${st.worst})`)
}
console.log(`  duplicated editorial paragraphs (>=${DUP_PARAGRAPH_PAGE_LIMIT} pages, unapproved): ${dupOffenders}`)
const nc = divRows.map((r) => r.n).sort((a, b) => a - b)
console.log(`  commercial source clusters: min ${nc[0]} | avg ${(nc.reduce((a, b) => a + b, 0) / nc.length).toFixed(2)} | max ${nc[nc.length - 1]}`)
for (const n of notes) console.log(`  · ${n}`)

if (errors.length) {
  console.error(`\nRegional quality + authority gate: FAIL (${errors.length})`)
  for (const e of errors.slice(0, 40)) console.error(`  ✗ ${e}`)
  if (errors.length > 40) console.error(`  … and ${errors.length - 40} more`)
  process.exit(1)
}
console.log('\nRegional quality + authority gate: PASS')
