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

/** Where the generator puts a route file for a URL. */
const fileFor = (url) => {
  const rel = url.replace(/^\//, '')
  return path.join(ROOT, 'pages', rel.includes('/') ? rel + '.tsx' : path.join(rel, 'index.tsx'))
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
  notes.push(`${L1_CONCEPTS.length} L1 concepts frozen`)
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
