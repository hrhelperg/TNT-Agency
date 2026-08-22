/**
 * The publication contract.
 *
 * `published` is derived from the CONTENT existing (lib/locale/l1-published.ts).
 * This gate checks the other half independently, from the FILESYSTEM: a route
 * file must exist for every published locale, and no locale route file may
 * exist for a concept that is not published.
 *
 * The two conditions are deliberately not derived from one another. If content
 * and routes disagree, one of them is wrong, and a single derived source would
 * simply agree with itself and report nothing.
 *
 * The two conditions above are both derived from the registry, so they agree
 * with each other about a world that has quietly shrunk. The third condition —
 * auditManifest() — is not derived from anything: it compares the registry
 * against lib/locale/l1-manifest.ts, a literal list a human maintains. Without
 * it, deleting a concept's content, route file and map entry together passes
 * every gate in this repo.
 *
 * What this catches:
 *   - content written, route never generated → a concept the sitemap advertises
 *     with no page behind it
 *   - route generated, content removed → a page rendering an undefined entry
 *   - a stale route file for a concept whose slug changed
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const reg = await import('../lib/locale/registry.ts')
const { L1_CONCEPTS } = await import('../lib/locale/l1-concepts.ts')
const { L1_MANIFEST_CONCEPTS, L1_MANIFEST_LOCALES, L1_EXPECTED } = await import('../lib/locale/l1-manifest.ts')

/** Where the generator puts a route file for a URL. */
const fileFor = (url) => {
  const rel = url.replace(/^\//, '')
  return path.join(ROOT, 'pages', rel.includes('/') ? rel + '.tsx' : path.join(rel, 'index.tsx'))
}

/**
 * The registry must match the frozen manifest exactly.
 *
 * This is the only check in the L1 suite whose expectation is not computed from
 * the thing it checks. Set equality runs in both directions on purpose: a
 * concept vanishing from the registry and a concept appearing without being
 * declared are different mistakes, and only one of them is caught by counting.
 */
export function auditManifest() {
  const errors = []
  const notes = []

  const declared = new Set(L1_MANIFEST_CONCEPTS)
  const actual = new Set(L1_CONCEPTS.map((c) => c.id))

  for (const id of declared) {
    if (!actual.has(id)) {
      errors.push(
        `${id} is declared in lib/locale/l1-manifest.ts but is absent from L1_CONCEPTS — ` +
          `the concept was removed without removing it from the manifest, so its pages, sitemap entries ` +
          `and source-map records have all silently left the release`,
      )
    }
  }
  for (const id of actual) {
    if (!declared.has(id)) {
      errors.push(
        `${id} exists in L1_CONCEPTS but is not declared in lib/locale/l1-manifest.ts — ` +
          `add it there deliberately if the release scope really is growing`,
      )
    }
  }

  // A concept present in one locale only is a defect, not a supported variant:
  // the switcher, hreflang set and sitemap all assume the pair.
  for (const id of declared) {
    const concept = reg.LOCALE_CONCEPTS.find((c) => c.id === id)
    if (!concept) continue
    for (const locale of L1_MANIFEST_LOCALES) {
      if (!concept.published.includes(locale)) {
        errors.push(
          `${id} is declared in the manifest but is not published in ${locale} — ` +
            `its ${locale} content or route file is missing, which no derived gate can see because ` +
            `\`published\` is itself derived from that content`,
        )
      }
    }
  }

  // Totals, asserted rather than printed.
  const czechRoutes = reg.CZECH_ROUTES.length
  const localized = reg.PUBLISHED_LOCALIZED_ROUTES.length
  const l1Pages = L1_CONCEPTS.reduce((n, c) => {
    const concept = reg.LOCALE_CONCEPTS.find((x) => x.id === c.id)
    return n + (concept ? concept.published.filter((l) => l !== 'cs').length : 0)
  }, 0)

  const check = (label, got, want) => {
    if (got !== want) {
      errors.push(`${label}: ${got}, but lib/locale/l1-manifest.ts freezes it at ${want}`)
    }
  }
  check('L1 concepts', L1_CONCEPTS.length, L1_EXPECTED.l1Concepts)
  check('L1 localized pages', l1Pages, L1_EXPECTED.l1Pages)
  check('localized routes (L0 + L1)', localized, L1_EXPECTED.localizedRoutes)
  check('Czech routes', czechRoutes, L1_EXPECTED.czechRoutes)

  // The sitemap is a committed artifact, so this needs no build.
  const sitemapPath = path.join(ROOT, 'public/sitemap.xml')
  if (!fs.existsSync(sitemapPath)) {
    errors.push('public/sitemap.xml is missing — the sitemap total cannot be checked, and that check is load-bearing')
  } else {
    const locs = (fs.readFileSync(sitemapPath, 'utf8').match(/<loc>/g) || []).length
    check('sitemap <loc> entries', locs, L1_EXPECTED.sitemapUrls)
  }

  notes.push(`${L1_CONCEPTS.length} L1 concepts, matching the frozen manifest exactly`)
  return { errors, notes }
}

export function auditPublication() {
  const errors = []
  const notes = []
  let published = 0
  let declaredOnly = 0

  for (const concept of reg.LOCALE_CONCEPTS) {
    for (const locale of ['en', 'de']) {
      const url = concept.urls?.[locale]
      if (!url) continue
      const isPublished = concept.published.includes(locale)
      const exists = fs.existsSync(fileFor(url))
      if (isPublished) {
        published++
        if (!exists) {
          errors.push(
            `${concept.id} is published in ${locale} (its content exists) but ${path.relative(ROOT, fileFor(url))} does not — ` +
              `the sitemap, hreflang and switcher would all advertise ${url} with no page behind it`,
          )
        }
      } else {
        declaredOnly++
        if (exists) {
          errors.push(
            `${path.relative(ROOT, fileFor(url))} exists but ${concept.id} is NOT published in ${locale} — ` +
              `the page would render an undefined content entry`,
          )
        }
      }
    }
  }

  // Every locale route file on disk must belong to a published concept.
  const known = new Set()
  for (const c of reg.LOCALE_CONCEPTS) {
    for (const l of c.published) {
      if (l === 'cs') continue
      const u = reg.urlFor(c, l)
      if (u) known.add(path.relative(ROOT, fileFor(u)))
    }
  }
  const walk = (dir, out = []) => {
    if (!fs.existsSync(dir)) return out
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) walk(full, out)
      else if (e.name.endsWith('.tsx')) out.push(path.relative(ROOT, full))
    }
    return out
  }
  for (const locale of ['en', 'de']) {
    for (const file of walk(path.join(ROOT, 'pages', locale))) {
      if (!known.has(file)) {
        errors.push(`${file} is a locale route file that no published concept claims — stale slug, or a page nothing points at`)
      }
    }
  }

  notes.push(`${published} published locale route(s), each with a page file`)
  notes.push(`${declaredOnly} concept locale(s) declared but not published — correctly absent from the build`)
  const manifest = auditManifest()
  errors.push(...manifest.errors)
  notes.push(...manifest.notes)
  return { errors, notes }
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, notes } = auditPublication()
  console.log('L1 publication gate')
  for (const n of notes) console.log(`  · ${n}`)
  if (errors.length) {
    console.error(`\n${errors.length} violation(s):`)
    for (const e of errors) console.error(`  ✗ ${e}`)
    console.error('\nL1 publication gate: FAIL')
    process.exit(1)
  }
  console.log('\nL1 publication gate: PASS')
}
