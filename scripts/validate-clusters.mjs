// Acquisition-cluster coverage gate (READ-ONLY).
//
// Guards the Wave 2D classification layer described in
// lib/analytics/acquisition-clusters.ts. It exists so that a canonical route
// added later cannot silently fall into "other" and quietly disappear from any
// cluster grouping — the failure mode that makes a classification layer worse
// than useless, because the report still looks complete.
//
// Fails when:
//   - a commercial route (any growth-cohort page, hub, industry, problem,
//     knowledge or request/calculator route) classifies as "other";
//   - two canonical routes normalise to the same classification key;
//   - the classification is not deterministic across repeated calls;
//   - the module acquired network, storage or tracker access;
//   - a second analytics tracker appeared anywhere in the app;
//   - the classification mentions leads or conversions.
//
// It also PRINTS the cluster grouping for the whole canonical inventory, which
// is the artefact an eventual WebmasterID export is joined against.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/validate-clusters.mjs
//      (npm run validate:clusters)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8')

const { classifyRoute, normalizeRoute, ACQUISITION_CLUSTERS, CLASSIFICATION_VERSION } = await import(
  path.join(ROOT, 'lib/analytics/acquisition-clusters.ts')
)
const { GROWTH_COHORTS } = await import(path.join(ROOT, 'lib/content/growth-cohorts.ts'))
const { buildRouteSet } = await import(path.join(ROOT, 'lib/content/quality-metrics.ts'))

const errors = []
const routes = ['/', ...Array.from(buildRouteSet(ROOT)).filter(Boolean).map((r) => `/${r}`)]

// ── 1. Commercial routes must never be "other" ──────────────────────────────
const cohortSlugs = new Set(GROWTH_COHORTS.flatMap((c) => [...c.slugs]))
const ALWAYS_COMMERCIAL = ['/pro-zamestnavatele', '/poptavka-pracovniku', '/kalkulacka-mzdy-agenturniho-zamestnance', '/nabor-odbornych-pozic']

for (const route of routes) {
  const c = classifyRoute(route)
  const slug = route.replace(/^\//, '')
  const isCommercial = cohortSlugs.has(slug) || ALWAYS_COMMERCIAL.includes(route)
  if (isCommercial && c.cluster === 'other') {
    errors.push(`${route} is a commercial route but classifies as "other" — add it to the classification layer`)
  }
  if (!ACQUISITION_CLUSTERS.includes(c.cluster)) {
    errors.push(`${route} produced an unknown cluster "${c.cluster}"`)
  }
}

// ── 2. Determinism + canonical-key uniqueness ───────────────────────────────
const seen = new Map()
for (const route of routes) {
  const a = JSON.stringify(classifyRoute(route))
  const b = JSON.stringify(classifyRoute(route))
  if (a !== b) errors.push(`${route}: classification is not deterministic`)
  const key = normalizeRoute(route)
  if (seen.has(key) && seen.get(key) !== route) {
    errors.push(`canonical key collision: ${route} and ${seen.get(key)} both normalise to ${key}`)
  }
  seen.set(key, route)
}

// ── 3. Privacy + single-tracker invariants ──────────────────────────────────
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/.*$/gm, '$1')
const clsSrc = stripComments(read('lib/analytics/acquisition-clusters.ts'))

const FORBIDDEN_IN_CLASSIFIER = [
  [/\bfetch\s*\(|sendBeacon|XMLHttpRequest|WebSocket/, 'network access'],
  [/localStorage|sessionStorage|document\.cookie/, 'browser storage access'],
  [/data-wmid-form/, 'a WebmasterID form event (explicitly excluded by the owner decision)'],
  [/webmasterid\.com|tracker\.iife/, 'tracker bundle reference'],
  [/gtag|dataLayer|analytics\.track|posthog|mixpanel|plausible|matomo/i, 'a second analytics tracker'],
  [/\blead\b|\bconversion\b/i, 'lead/conversion wording (delivery is not verifiable)'],
  // Field-like context only. A bare substring match flags the route slug
  // "minimalni-mzda", which is a page name, not a data field — the same
  // over-blunt matching that flagged Consent Mode as a tracker above.
  [/\b(salary|mzda|wage|employerCost|agencyFee|budget|email|phone|telefon|companyName|contactName)\s*[:=]/i, 'a sensitive field name'],
]
for (const [re, label] of FORBIDDEN_IN_CLASSIFIER) {
  if (re.test(clsSrc)) errors.push(`lib/analytics/acquisition-clusters.ts contains ${label}`)
}

// Single-tracker invariant across the whole app.
const appFiles = []
const walk = (dir) => {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) walk(rel)
    else if (/\.(tsx?|js)$/.test(e.name) && !/\.test\./.test(e.name)) appFiles.push(rel)
  }
}
walk('components')
walk('pages')
walk('lib')
appFiles.push('public/script.js')

// Detects a tracker being LOADED, not consent signalling. The site runs Google
// Consent Mode v2 (a gtag() stub in _document.tsx plus consent updates from the
// cookie banner) with NO Google tag attached — verified: no googletagmanager,
// google-analytics or gtag/js reference exists anywhere. Matching on gtag(/
// dataLayer would therefore flag the privacy mechanism itself as a tracker.
const TRACKER_PATTERNS = [
  /googletagmanager\.com/i,
  /google-analytics\.com/i,
  /gtag\/js/i,
  /posthog/i,
  /mixpanel/i,
  /plausible\.io/i,
  /matomo/i,
  /segment\.com/i,
  /hotjar/i,
  /clarity\.ms/i,
]
for (const f of appFiles) {
  const src = stripComments(read(f))
  for (const re of TRACKER_PATTERNS) {
    if (re.test(src)) errors.push(`${f}: a second analytics tracker (${re}) — only WebmasterID is permitted`)
  }
}
const trackerScriptRefs = appFiles.filter((f) => /webmasterid\.com\/tracker/.test(read(f)))
if (trackerScriptRefs.length > 1) {
  errors.push(`WebmasterID tracker URL referenced in ${trackerScriptRefs.length} files (${trackerScriptRefs.join(', ')}) — expected exactly one`)
}

// ── Report: the grouping an export is joined against ────────────────────────
const byCluster = {}
for (const route of routes) {
  const c = classifyRoute(route)
  ;(byCluster[c.cluster] ??= []).push(route)
}

console.log('Acquisition-cluster gate')
console.log(`  classification version: ${CLASSIFICATION_VERSION}`)
console.log(`  canonical routes classified: ${routes.length}`)
console.log(`  tracker files referencing the WebmasterID bundle: ${trackerScriptRefs.length} (expected 1)`)
console.log('  grouping:')
for (const cluster of ACQUISITION_CLUSTERS) {
  const n = (byCluster[cluster] ?? []).length
  if (n) console.log(`    ${cluster.padEnd(18)} ${String(n).padStart(3)}`)
}
const other = byCluster.other ?? []
if (other.length) {
  console.log(`  routes in "other" (${other.length}, none may be commercial):`)
  for (const r of other) console.log(`    · ${r}`)
}

if (errors.length) {
  console.error(`\nAcquisition-cluster gate: FAIL (${errors.length})`)
  for (const e of errors) console.error(`  ✗ ${e}`)
  process.exit(1)
}
console.log('\nAcquisition-cluster gate: PASS')
console.log('  NOTE: this measures page/navigation activity only. Wave 2 does not measure')
console.log('  completed mailto delivery; no additional form or visitor data is transmitted.')
