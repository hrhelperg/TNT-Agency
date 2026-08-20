// Build-time sitemap generator.
//
// The registry is the source of truth for indexable routes. This emits the
// artifact; nothing is computed at request time and there is no dynamic
// sitemap route.
//
// M1 — THE MIGRATION GATE
// ───────────────────────
// Before a single localized URL is added, this generator must reproduce the
// existing hand-maintained sitemap BYTE-IDENTICALLY. That is what makes the
// migration provable rather than plausible: if the bytes match, no Czech URL
// moved, none disappeared, the order is preserved, and nothing was quietly
// reformatted.
//
// So the output shape here mirrors the existing file exactly — two-space
// indent, one <loc> per <url>, no lastmod/changefreq/priority, trailing
// newline. It is NOT "tidied up". Making the generator look cleaner would
// destroy the only evidence that the migration changed nothing.
//
// Usage:
//   node --import ./scripts/ts-resolve.mjs scripts/generate-sitemap.mjs          print
//   node --import ./scripts/ts-resolve.mjs scripts/generate-sitemap.mjs --write  write the file

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const SITEMAP = path.join(ROOT, 'public/sitemap.xml')
const ORIGIN = 'https://talentpartnerid.com'

const R = await import('../lib/locale/registry.ts')

/**
 * Every indexable URL, in emission order.
 *
 * Czech first, in the registry's (= the existing sitemap's) order, then the
 * localized routes grouped by concept. Appending rather than interleaving keeps
 * the Czech prefix of the file byte-stable as locales are added.
 */
export function indexableUrls({ concepts = R.LOCALE_CONCEPTS, czechRoutes = R.CZECH_ROUTES } = {}) {
  const urls = [...czechRoutes]
  // Grouped BY LOCALE, not interleaved per concept.
  //
  // Interleaving en/de per concept means publishing a new locale displaces the
  // previous one's block, so a diff of the artifact shows movement that is not
  // a real change. Grouping makes every locale launch a pure APPEND: the proof
  // that nothing moved is then just "the old list is a prefix of the new one".
  for (const locale of ['en', 'de']) {
    for (const c of concepts) {
      const url = c.urls[locale]
      // PUBLISHED only. A declared-but-unbuilt URL in the sitemap would be
      // advertising a 404.
      if (url && c.published.includes(locale)) urls.push(url)
    }
  }
  return urls
}

/** Render the sitemap XML. Shape is fixed by the existing artifact. */
export function renderSitemap(urls) {
  const body = urls.map((u) => `  <url>\n    <loc>${ORIGIN}${u}</loc>\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const xml = renderSitemap(indexableUrls())
  if (process.argv.includes('--write')) {
    fs.writeFileSync(SITEMAP, xml)
    console.log(`wrote public/sitemap.xml — ${xml.length} bytes, ${(xml.match(/<loc>/g) || []).length} <loc>`)
  } else {
    process.stdout.write(xml)
  }
}
