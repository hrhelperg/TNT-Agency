// Sitemap equality gate.
//
// The registry is the source of truth for indexable routes; public/sitemap.xml
// is a build artifact of it. This asserts the two cannot drift:
//
//   registry indexable URLs  ==  sitemap <loc> URLs      (set AND order)
//   generator output         ==  the committed file      (byte-for-byte)
//
// The second is the stronger check and the reason this exists. During the
// migration from a hand-maintained sitemap it proved that switching to a
// generator changed nothing: same bytes, same sha256
// (5ec24046b3744ec850f05673ad50c4504a9c2a2061d5cd1537ad88e76161e698), same 185
// entries in the same order. Afterwards it keeps the artifact honest — a URL
// cannot appear in the sitemap without existing in the registry, and a
// registry route cannot be silently omitted.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/validate-sitemap-equality.mjs

import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')

const G = await import('./generate-sitemap.mjs')

export function auditSitemapEquality({ committed = read('public/sitemap.xml'), generated = null, expected = null } = {}) {
  const errors = []
  const notes = []

  const xml = generated ?? G.renderSitemap(G.indexableUrls())
  const sha = (s) => createHash('sha256').update(s).digest('hex')

  if (xml !== committed) {
    const a = xml.split('\n')
    const b = committed.split('\n')
    const i = a.findIndex((l, n) => l !== b[n])
    errors.push(
      `public/sitemap.xml is not what the generator produces — first difference at line ${i + 1}: generated ${JSON.stringify(a[i])} vs committed ${JSON.stringify(b[i])}. Run \`npm run sitemap\` rather than editing the file by hand.`,
    )
    if (a.length !== b.length) errors.push(`line count differs: generated ${a.length}, committed ${b.length}`)
  }

  const locs = Array.from(committed.matchAll(/<loc>https:\/\/talentpartnerid\.com([^<]*)<\/loc>/g)).map((m) => m[1])
  const registry = expected ?? G.indexableUrls()

  const missing = registry.filter((u) => !locs.includes(u))
  const extra = locs.filter((u) => !registry.includes(u))
  for (const u of missing) errors.push(`registry route "${u}" is missing from the sitemap`)
  for (const u of extra) errors.push(`sitemap contains "${u}", which no registry route declares`)

  if (!missing.length && !extra.length && registry.some((u, i) => u !== locs[i])) {
    errors.push('sitemap order does not match registry order')
  }

  if (new Set(locs).size !== locs.length) errors.push('sitemap contains duplicate <loc> entries')
  for (const u of locs) {
    if (u.includes('?')) errors.push(`sitemap contains a parameterised URL: ${u}`)
    if (u.includes('#')) errors.push(`sitemap contains a fragment URL: ${u}`)
  }

  notes.push(`${locs.length} <loc>; sha256 ${sha(committed).slice(0, 16)}…`)
  notes.push(`${registry.length} indexable registry routes`)
  return { errors, notes }
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, notes } = auditSitemapEquality()
  console.log('Sitemap equality gate')
  for (const n of notes) console.log(`  · ${n}`)
  if (errors.length) {
    console.error(`\n${errors.length} violation(s):`)
    for (const e of errors) console.error(`  ✗ ${e}`)
    console.error('\nSitemap equality gate: FAIL')
    process.exit(1)
  }
  console.log('\nSitemap equality gate: PASS')
}
