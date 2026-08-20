// Locale route registry gate.
//
// The registry is the single source of truth for page identity across cs/en/de.
// Rendering, the sitemap, hreflang, the switcher and internal links all resolve
// through it, so a defect here is a defect everywhere at once.
//
// The rules that matter are the ones whose violation is INVISIBLE in a browser:
// a many-to-one hreflang mapping is silently discarded by search engines, and a
// synthesized locale URL 404s only for the visitor who follows it.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/validate-locale-registry.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')

const R = await import('../lib/locale/registry.ts')

const sitemapLocs = () =>
  Array.from(read('public/sitemap.xml').matchAll(/<loc>https:\/\/talentpartnerid\.com([^<]*)<\/loc>/g)).map((m) => m[1])

export function auditLocaleRegistry({
  czechRoutes = R.CZECH_ROUTES,
  concepts = R.LOCALE_CONCEPTS,
  legal = R.LEGAL_CONCEPTS,
  locs = sitemapLocs(),
} = {}) {
  const errors = []
  const notes = []

  // 1. The Czech spine is the sitemap, in order.
  if (czechRoutes.length !== locs.length || czechRoutes.some((r, i) => r !== locs[i])) {
    const firstDiff = czechRoutes.findIndex((r, i) => r !== locs[i])
    errors.push(`CZECH_ROUTES does not match the sitemap in order (first difference at index ${firstDiff}: registry "${czechRoutes[firstDiff]}" vs sitemap "${locs[firstDiff]}") — order is load-bearing for the byte-identical generator`)
  }
  if (new Set(czechRoutes).size !== czechRoutes.length) {
    errors.push('CZECH_ROUTES contains duplicates')
  }
  for (const r of czechRoutes) {
    if (r.startsWith('/cs/')) errors.push(`${r}: Czech is never prefixed — there is no /cs/ form`)
  }

  // 2. Concept integrity.
  const ids = new Set()
  const primaries = new Set()
  const localized = []
  for (const c of concepts) {
    if (ids.has(c.id)) errors.push(`duplicate concept id "${c.id}"`)
    ids.add(c.id)

    if (!czechRoutes.includes(c.csPrimary)) {
      errors.push(`${c.id}: csPrimary "${c.csPrimary}" is not an existing Czech canonical`)
    }
    if (primaries.has(c.csPrimary)) {
      errors.push(`${c.id}: "${c.csPrimary}" is already another concept's primary — a Czech page belongs to exactly one cluster`)
    }
    primaries.add(c.csPrimary)

    if (!c.notes || c.notes.length < 20) {
      errors.push(`${c.id}: needs a note explaining why it is localized — a registry entry without a reason is undocumented scope`)
    }

    for (const locale of ['en', 'de']) {
      const url = c.urls[locale]
      if (!url) continue
      const prefix = R.LOCALE_PREFIX[locale]
      // The locale root IS the prefix (/en); every other route sits under it.
      if (url !== prefix && !url.startsWith(`${prefix}/`)) {
        errors.push(`${c.id}/${locale}: "${url}" does not carry the ${locale} prefix`)
      }
      if (url !== prefix && url.endsWith('/')) {
        errors.push(`${c.id}/${locale}: "${url}" ends with a slash, but next.config.js sets trailingSlash:false and redirects /:path+/ — a sitemap must not carry a redirecting URL`)
      }
      if (czechRoutes.includes(url)) {
        errors.push(`${c.id}/${locale}: "${url}" collides with an existing Czech canonical`)
      }
      localized.push([url, `${c.id}/${locale}`])
    }
  }

  // 3. No two concepts claim the same localized URL.
  const seen = new Map()
  for (const [url, owner] of localized) {
    if (seen.has(url)) errors.push(`localized URL "${url}" is claimed by both ${seen.get(url)} and ${owner}`)
    seen.set(url, owner)
  }

  // 4. Collapsed variants: Czech-only, never a primary, never with alternates.
  //
  // This is the rule that protects the hreflang cluster. Five Czech pages
  // pointing at one English page is an invalid many-to-one mapping that search
  // engines discard wholesale — and nothing in a browser would show it.
  const collapsedSeen = new Map()
  for (const c of concepts) {
    for (const v of c.csCollapsed ?? []) {
      if (!czechRoutes.includes(v)) errors.push(`${c.id}: collapsed variant "${v}" is not an existing Czech canonical`)
      if (primaries.has(v)) errors.push(`${c.id}: "${v}" is collapsed here but is a concept primary elsewhere`)
      if (collapsedSeen.has(v)) errors.push(`"${v}" is collapsed under both ${collapsedSeen.get(v)} and ${c.id}`)
      collapsedSeen.set(v, c.id)
      const alts = R.alternatesFor(v)
      if (alts.length) {
        errors.push(`collapsed variant "${v}" reports ${alts.length} locale alternates — it must have none, or the cluster becomes an invalid many-to-one mapping`)
      }
    }
  }

  // 5. Legal concepts are read-only mappings onto URLs that already exist.
  for (const c of legal) {
    for (const [locale, url] of [['cs', c.csPrimary], ['en', c.urls.en], ['de', c.urls.de]]) {
      if (!url) continue
      if (!locs.includes(url)) {
        errors.push(`legal ${c.id}/${locale}: "${url}" is not an existing URL — legal pages are mapped read-only, never created`)
      }
    }
  }

  // 6. x-default must be a real Czech route.
  if (!czechRoutes.includes(R.X_DEFAULT_ROUTE)) {
    errors.push(`X_DEFAULT_ROUTE "${R.X_DEFAULT_ROUTE}" is not an existing Czech canonical`)
  }

  // 7. Every primary genuinely resolves to a cluster; every alternate resolves back.
  for (const c of concepts) {
    for (const alt of R.alternatesFor(c.csPrimary)) {
      const back = R.conceptForRoute(alt.url)
      if (!back || back.id !== c.id) {
        errors.push(`${c.id}: alternate "${alt.url}" does not resolve back to the same concept`)
      }
    }
  }

  notes.push(`${czechRoutes.length} Czech canonicals (immutable spine)`)
  notes.push(`${concepts.length} localized concepts, ${localized.length} localized URLs`)
  notes.push(`${collapsedSeen.size} collapsed Czech variants — Czech-only, no alternates`)
  notes.push(`${legal.length} legal concepts mapped read-only`)
  return { errors, notes }
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, notes } = auditLocaleRegistry()
  console.log('Locale registry gate')
  for (const n of notes) console.log(`  · ${n}`)
  if (errors.length) {
    console.error(`\n${errors.length} registry violation(s):`)
    for (const e of errors) console.error(`  ✗ ${e}`)
    console.error('\nLocale registry gate: FAIL')
    process.exit(1)
  }
  console.log('\nLocale registry gate: PASS')
}
