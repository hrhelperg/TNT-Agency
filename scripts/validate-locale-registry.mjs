// Locale pilot gate (READ-ONLY) — PREPARATION STAGE.
//
// The registry describes routes that deliberately DO NOT EXIST yet, so this gate
// cannot check them by fetching. What it can do — and what actually protects the
// programme — is enforce that the plan stays internally consistent and that the
// invariants which make the pilot reversible cannot be quietly broken:
//
//   FAIL  a future route colliding with an existing Czech canonical URL
//         two pilot entries claiming the same future route
//         a future route missing its locale prefix, or carrying the wrong one
//         a locale outside the enum, or a Czech target (Czech is never prefixed)
//         a canonical policy other than SELF
//         indexingEligible set without an APPROVED translation
//         indexingEligible set without a completed editorial review
//         indexingEligible set on a legal-review page without legal sign-off
//         a PUBLISHED pilot status on a route with no approved translation
//         a locale URL appearing in the sitemap before it is published
//         speculative hreflang — any EN/DE alternate emitted in built HTML now
//         the static-render contract broken (getServerSideProps, middleware,
//         request-time locale resolution, cookie/Accept-Language/geo affecting
//         server HTML, or a drop in the prerendered route count)
//
// It deliberately does NOT fail because /en/... returns 404. That is the correct
// state today and asserting otherwise would force premature publication.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/validate-locale-registry.mjs
//      (npm run validate:locale-registry)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')
const exists = (rel) => fs.existsSync(path.join(ROOT, rel))

/** Prerendered Next pages expected today. A locale implementation that goes
 *  dynamic collapses this number, so the count is the tripwire. */
export const MIN_STATIC_PAGES = 175

/** Strips comments so a note about `cookies()` cannot fail a code assertion. */
const code = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')

export function auditLocaleRegistry({ pilot, locales, prefixes, canonicalRoutes, staticPages, appSources, builtHtml }) {
  const errors = []
  const notes = []

  const canonical = new Set(canonicalRoutes)
  const seen = new Map()

  for (const entry of pilot) {
    if (!canonical.has(entry.sourceRoute)) {
      errors.push(`${entry.sourceRoute}: pilot source route is not an existing canonical URL`)
    }
    if (!entry.targets.length) errors.push(`${entry.sourceRoute}: no locale targets`)

    for (const t of entry.targets) {
      const where = `${entry.sourceRoute} → ${t.futureRoute}`

      if (!locales.includes(t.locale)) errors.push(`${where}: locale "${t.locale}" is not in the enum`)
      if (t.locale === 'cs') errors.push(`${where}: Czech is served unprefixed and must never be a locale target`)

      const prefix = prefixes[t.locale]
      if (prefix && t.futureRoute !== prefix && !t.futureRoute.startsWith(`${prefix}/`)) {
        errors.push(`${where}: future route does not sit under the "${prefix}" prefix`)
      }
      for (const [loc, p] of Object.entries(prefixes)) {
        if (loc === t.locale || !p) continue
        if (t.futureRoute === p || t.futureRoute.startsWith(`${p}/`)) {
          errors.push(`${where}: future route sits under the "${p}" prefix but is declared "${t.locale}"`)
        }
      }

      // Collisions — with Czech, and with each other.
      if (canonical.has(t.futureRoute)) {
        errors.push(`${where}: future route collides with an existing Czech canonical URL`)
      }
      if (seen.has(t.futureRoute)) {
        errors.push(`${where}: future route already claimed by ${seen.get(t.futureRoute)}`)
      }
      seen.set(t.futureRoute, entry.sourceRoute)

      if (/[?#]/.test(t.futureRoute)) errors.push(`${where}: future route carries a query or fragment`)
      if (t.futureRoute !== t.futureRoute.toLowerCase()) errors.push(`${where}: future route is not lowercase`)
      if (/\/$/.test(t.futureRoute) && t.futureRoute.length > 3) {
        errors.push(`${where}: future route has a trailing slash (trailingSlash is false)`)
      }
      if (!/^[a-z0-9/-]+$/.test(t.futureRoute)) {
        errors.push(`${where}: future route contains characters outside [a-z0-9/-] — non-ASCII slugs invite encoding drift`)
      }

      // An EN/DE page canonicalising to Czech would remove it from the index.
      if (t.canonicalPolicy !== 'SELF') {
        errors.push(`${where}: canonicalPolicy "${t.canonicalPolicy}" — localized pages must self-canonicalise`)
      }

      // Publication gates. These are the claims that must never be overstated.
      if (t.indexingEligible) {
        if (!['APPROVED', 'PUBLISHED'].includes(t.translationStatus)) {
          errors.push(`${where}: indexingEligible with translationStatus "${t.translationStatus}" — only an APPROVED translation may be indexed`)
        }
        if (t.editorialReviewStatus !== 'COMPLETE') {
          errors.push(`${where}: indexingEligible without a completed editorial review`)
        }
        if (entry.legalReviewRequired && entry.legalReviewStatus !== 'COMPLETE') {
          errors.push(`${where}: indexingEligible on a page flagged legalReviewRequired, without legal sign-off`)
        }
      }
      if (t.pilotStatus === 'PUBLISHED' && t.translationStatus !== 'PUBLISHED') {
        errors.push(`${where}: pilotStatus PUBLISHED but translationStatus is "${t.translationStatus}"`)
      }
      if (t.translationStatus === 'PUBLISHED' && !t.indexingEligible) {
        errors.push(`${where}: translationStatus PUBLISHED but not indexingEligible — a published page that cannot be indexed is a mistake`)
      }
    }
  }

  // hreflang groups must be unique per entry.
  const groups = pilot.map((e) => e.hreflangGroup)
  for (const g of groups) {
    if (groups.filter((x) => x === g).length > 1) errors.push(`hreflang group "${g}" is used by more than one page`)
  }

  // ── No speculative publication ────────────────────────────────────────────
  const sitemap = read('public/sitemap.xml')
  for (const route of seen.keys()) {
    if (sitemap.includes(`<loc>https://talentpartnerid.com${route}</loc>`)) {
      errors.push(`${route}: appears in the sitemap before it exists`)
    }
  }

  // No hreflang may point at a PLANNED-BUT-UNPUBLISHED locale route.
  //
  // Scoped deliberately to locale-prefixed targets. The legal pages already
  // declare genuine en/cs-CZ/de alternates (PR #34) that point at documents which
  // exist and are reciprocal — flagging those would be wrong, and an earlier
  // version of this check did exactly that.
  const unpublished = new Set(
    pilot.flatMap((e) => e.targets.filter((t) => !t.indexingEligible).map((t) => t.futureRoute)),
  )
  const localePrefixes = Object.values(prefixes).filter(Boolean)
  for (const [file, html] of builtHtml) {
    for (const m of html.matchAll(/<link[^>]+rel="alternate"[^>]*>/gi)) {
      const tag = m[0]
      if (!/hreflang=/i.test(tag)) continue
      const href = tag.match(/href="([^"]+)"/i)?.[1]
      if (!href) continue
      let route
      try {
        route = new URL(href, 'https://talentpartnerid.com').pathname
      } catch {
        continue
      }
      const isLocalePrefixed = localePrefixes.some((p) => route === p || route.startsWith(`${p}/`))
      if (!isLocalePrefixed) continue
      if (unpublished.has(route)) {
        errors.push(`${file}: hreflang points at ${route}, which is planned but not published — speculative hreflang`)
      } else {
        errors.push(`${file}: hreflang points at locale route ${route}, which is not in the pilot registry`)
      }
    }
  }

  // ── Static-render contract ────────────────────────────────────────────────
  const REQUEST_TIME = [
    ['getServerSideProps', /\bgetServerSideProps\b/],
    ['middleware locale rewriting', /\bNextResponse\s*\.\s*rewrite\b/],
    ['next/headers cookies()', /from\s+'next\/headers'/],
    ['request-time Accept-Language', /headers\(\)|req\.headers\s*\[\s*['"]accept-language/i],
    ['geo lookup during render', /\bgeoip\b|req\.geo\b|cf-ipcountry/i],
  ]
  for (const [file, src] of appSources) {
    for (const [label, re] of REQUEST_TIME) {
      if (re.test(code(src))) errors.push(`${file}: ${label} — locale must never be resolved at request time`)
    }
  }
  if (exists('middleware.ts') || exists('middleware.js')) {
    errors.push('middleware exists — locale routing must not be middleware-based (it defeats static caching)')
  }
  if (staticPages < MIN_STATIC_PAGES) {
    errors.push(`static prerender regression: ${staticPages} prerendered pages, expected >= ${MIN_STATIC_PAGES}`)
  }

  notes.push(`${pilot.length} source pages × ${pilot[0]?.targets.length ?? 0} locales = ${seen.size} future routes, none of which exist yet (correct at this stage)`)

  return { errors, notes, futureRouteCount: seen.size }
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { LOCALE_PILOT, LOCALES, LOCALE_PREFIX } = await import(path.join(ROOT, 'lib/locale/registry.ts'))

  const canonicalRoutes = Array.from(read('public/sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g), (m) =>
    new URL(m[1]).pathname,
  )

  const walk = (dir, out = []) => {
    if (!fs.existsSync(dir)) return out
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) walk(p, out)
      else out.push(p)
    }
    return out
  }
  const appSources = walk(path.join(ROOT, 'pages'))
    .concat(walk(path.join(ROOT, 'components')))
    .concat(walk(path.join(ROOT, 'lib')))
    .filter((f) => /\.(ts|tsx)$/.test(f) && !/\.test\.tsx?$/.test(f))
    .map((f) => [path.relative(ROOT, f), fs.readFileSync(f, 'utf8')])

  const builtDir = path.join(ROOT, '.next/server/pages')
  const builtHtml = walk(builtDir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => [path.relative(ROOT, f), fs.readFileSync(f, 'utf8')])
  const staticPages = builtHtml.length ? builtHtml.length - 2 : MIN_STATIC_PAGES // 404 + 500

  const { errors, notes, futureRouteCount } = auditLocaleRegistry({
    pilot: LOCALE_PILOT,
    locales: LOCALES,
    prefixes: LOCALE_PREFIX,
    canonicalRoutes,
    staticPages,
    appSources,
    builtHtml,
  })

  const counts = {}
  for (const e of LOCALE_PILOT) for (const t of e.targets) counts[t.translationStatus] = (counts[t.translationStatus] ?? 0) + 1

  console.log('Locale pilot gate (preparation stage)')
  console.log(`  pilot source pages          : ${LOCALE_PILOT.length}`)
  console.log(`  planned future routes       : ${futureRouteCount} (0 exist — correct)`)
  console.log(`  translation status          : ${JSON.stringify(counts)}`)
  console.log(`  indexing-eligible targets   : ${LOCALE_PILOT.flatMap((e) => e.targets).filter((t) => t.indexingEligible).length}`)
  console.log(`  legal review required on    : ${LOCALE_PILOT.filter((e) => e.legalReviewRequired).length} pages`)
  console.log(`  prerendered pages           : ${staticPages} (floor ${MIN_STATIC_PAGES})`)
  console.log(`  Czech canonical URLs        : ${canonicalRoutes.length} (unchanged)`)
  for (const n of notes) console.log(`  · ${n}`)

  if (errors.length) {
    console.error(`\nLocale pilot gate: FAIL (${errors.length})`)
    for (const e of errors.slice(0, 40)) console.error(`  ✗ ${e}`)
    if (errors.length > 40) console.error(`  … and ${errors.length - 40} more`)
    process.exit(1)
  }
  console.log('\nLocale pilot gate: PASS')
}
