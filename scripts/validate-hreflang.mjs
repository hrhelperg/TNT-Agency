// hreflang + document-language gate (READ-ONLY).
//
// The corpus previously declared hreflang that was simply untrue: the homepage
// listed en, cs, de and x-default all pointing at itself, claiming three
// language versions existed at one URL when only Czech HTML was ever served.
// Meanwhile the nine legal documents — which ARE genuinely translated, at nine
// separate canonical URLs — declared nothing at all.
//
// So this gate does not ask "is hreflang present". It asks whether every
// declaration corresponds to a document that exists, is in the language it is
// claimed to be, and names the declaring page back.
//
//   FAIL  an alternate pointing at a URL that does not exist
//         the same URL declared under two different language codes
//         a non-reciprocal set (A lists B; B does not list A)
//         an alternate whose target is not self-canonical
//         a language code outside the allowed set
//         a target whose <html lang> contradicts the hreflang claimed for it
//         a duplicate hreflang entry on one page
//         x-default without a declared neutral fallback
//         hreflang on a page with no genuine translation set
//         a drop in the prerendered static route count
//
// It runs against BUILT HTML (.next/server/pages + public/), not source, because
// what ships is what crawlers read. Run `next build` first.
//
// Run: node scripts/validate-hreflang.mjs   (npm run validate:hreflang)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
export const BASE = 'https://talentpartnerid.com'
const NEXT_PAGES = path.join(ROOT, '.next/server/pages')
const PUBLIC = path.join(ROOT, 'public')

/** Language codes this site is allowed to declare. */
export const ALLOWED = new Set(['en', 'cs-CZ', 'de'])

/**
 * A hreflang code and an <html lang> need not be byte-equal: cs-CZ is a regional
 * specialisation of cs, and declaring lang="cs" on the cs-CZ member of a set is
 * correct, not a mismatch. Compare primary subtags.
 */
const primary = (tag) => String(tag).toLowerCase().split('-')[0]

/**
 * Pages permitted to declare an x-default, with the reason.
 *
 * This was empty by design while the only multi-language sets were the three
 * legal documents: none has a neutral or language-selection page, so pointing
 * x-default at an arbitrary language would have asserted something untrue.
 *
 * Locale L0 changed the facts. Every concept in the locale registry has a real
 * Czech primary with real English and German counterparts, and the registry
 * declares X_DEFAULT_ROUTE — the Czech root — as the deliberate fallback: this
 * is a Czech company serving the Czech market, so an unmatched visitor belongs
 * there rather than on a translation. The permission is DERIVED from the
 * registry, so a page cannot claim an x-default without being a published
 * member of a real cluster.
 */
const LOCALE_REGISTRY = await import('../lib/locale/registry.ts')
const { L1_EXPECTED } = await import('../lib/locale/l1-manifest.ts')

export const XDEFAULT_ALLOWED = Object.fromEntries(
  LOCALE_REGISTRY.LOCALE_CONCEPTS.flatMap((c) => {
    const reason = `locale cluster "${c.id}"; x-default is ${LOCALE_REGISTRY.X_DEFAULT_ROUTE}, declared in the locale registry`
    const routes = [c.csPrimary]
    for (const locale of ['en', 'de']) {
      if (c.published.includes(locale) && c.urls[locale]) routes.push(c.urls[locale])
    }
    return routes.length > 1 ? routes.map((r) => [r, reason]) : []
  }),
)

/**
 * The exact number of prerendered Next documents, from the frozen manifest
 * (271 route pages + /404 + /500).
 *
 * This was a floor, `MIN_STATIC_PAGES = 195`, re-baselined by hand in Locale L0.
 * L1 added 76 pages and did not re-baseline it, so the floor sat 78 pages below
 * reality and the one gate whose stated job is catching a page-count drop could
 * not see 78 pages disappear. An independent refuter removed a five-page EN
 * cluster and every gate in the repo stayed green.
 *
 * A floor is the wrong shape for this: it only ever detects catastrophe, and it
 * silently decays every time the site grows. An exact count derived from the
 * manifest cannot decay, and an intended change has to be stated in one place
 * a reviewer reads.
 */
export const EXPECTED_STATIC_PAGES = L1_EXPECTED.prerenderedPages

/** Parses one HTML document into the shape the audit works on. */
export function parseDoc(html, file = '') {
  return {
    file,
    lang: html.match(/<html[^>]*\slang="([^"]+)"/i)?.[1] ?? null,
    canonical: html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? null,
    alts: [...html.matchAll(/<link[^>]+rel="alternate"[^>]*>/gi)]
      .map((m) => m[0])
      .filter((tag) => /hreflang=/i.test(tag))
      .map((tag) => ({
        lang: tag.match(/hreflang="([^"]+)"/i)?.[1] ?? '',
        href: tag.match(/href="([^"]+)"/i)?.[1] ?? '',
      })),
  }
}

// ── Collect every built HTML document ───────────────────────────────────────
const docs = new Map() // route -> { file, html }

const walk = (dir, base = '') => {
  if (!fs.existsSync(dir)) return
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, `${base}/${e.name}`)
    else if (e.name.endsWith('.html')) {
      const name = e.name.replace(/\.html$/, '')
      const route = base === '' && name === 'index' ? '/' : `${base}/${name}`
      docs.set(route, { file: p, html: fs.readFileSync(p, 'utf8') })
    }
  }
}
walk(NEXT_PAGES)
if (!docs.size) {
  console.error('hreflang gate: no built pages found in .next/server/pages — run `next build` first')
  process.exit(1)
}
// public/*.html ship verbatim at their own paths
for (const f of fs.readdirSync(PUBLIC)) {
  if (!f.endsWith('.html')) continue
  docs.set(`/${f}`, { file: path.join(PUBLIC, f), html: fs.readFileSync(path.join(PUBLIC, f), 'utf8') })
}
for (const f of fs.existsSync(path.join(PUBLIC, 'blog')) ? fs.readdirSync(path.join(PUBLIC, 'blog')) : []) {
  if (!f.endsWith('.html')) continue
  docs.set(`/blog/${f}`, { file: path.join(PUBLIC, 'blog', f), html: fs.readFileSync(path.join(PUBLIC, 'blog', f), 'utf8') })
}

// ── Parse each document ─────────────────────────────────────────────────────
const parsed = new Map()
for (const [route, { file, html }] of docs) parsed.set(route, parseDoc(html, file))

export const routeOf = (url) => {
  try {
    return new URL(url, BASE).pathname
  } catch {
    return null
  }
}

/**
 * The whole gate as a pure function over a parsed document map, so
 * scripts/mutate-hreflang.mjs can run the REAL checks against deliberately
 * damaged documents. A harness that reimplemented them would prove nothing.
 */
export function auditHreflang(parsed, { staticPages = Infinity } = {}) {
const errors = []
let withAlts = 0
for (const [route, d] of parsed) {
  if (!d.alts.length) continue
  withAlts++

  const seenLang = new Map()
  const seenHref = new Map()

  for (const a of d.alts) {
    // language code allowed
    if (a.lang !== 'x-default' && !ALLOWED.has(a.lang)) {
      errors.push(`${route}: hreflang="${a.lang}" is not an allowed code (${[...ALLOWED].join(', ')})`)
    }
    // duplicate code on one page
    if (seenLang.has(a.lang)) errors.push(`${route}: duplicate hreflang="${a.lang}"`)
    seenLang.set(a.lang, a.href)
    // same URL under two different codes
    // One URL cannot be two LANGUAGES — but x-default is not a language, and
    // pointing it at the same URL as one of the language versions is both
    // standard and, here, the correct statement: the Czech root is genuinely
    // where an unmatched visitor belongs.
    if (a.lang !== 'x-default' && seenHref.has(a.href) && seenHref.get(a.href) !== a.lang && seenHref.get(a.href) !== 'x-default') {
      errors.push(`${route}: ${a.href} is declared as both "${seenHref.get(a.href)}" and "${a.lang}" — one URL cannot be two language versions`)
    }
    if (a.lang !== 'x-default') seenHref.set(a.href, a.lang)

    // x-default needs a declared, deliberate fallback
    if (a.lang === 'x-default' && !XDEFAULT_ALLOWED[route]) {
      errors.push(`${route}: x-default declared with no documented neutral fallback page`)
      continue
    }

    // target must exist
    const target = routeOf(a.href)
    const t = target && parsed.get(target)
    if (!t) {
      errors.push(`${route}: alternate "${a.lang}" points at ${a.href}, which does not exist`)
      continue
    }
    // target must be self-canonical
    if (t.canonical && routeOf(t.canonical) !== target) {
      errors.push(`${route}: alternate target ${target} is not self-canonical (canonical=${t.canonical})`)
    }
    // target document language must match the claim
    //
    // x-default is exempt: it is a FALLBACK, not a language claim. Pointing it
    // at the Czech root is correct and asserts nothing about that page's
    // language. Likewise the fallback target is not required to nominate every
    // page that falls back to it, so reciprocity below is exempt too.
    if (a.lang !== 'x-default' && t.lang && primary(t.lang) !== primary(a.lang)) {
      errors.push(`${route}: declares ${target} as "${a.lang}" but that document is <html lang="${t.lang}">`)
    }
    // reciprocity — the target must name this page back
    const back = t.alts.some((b) => routeOf(b.href) === route)
    if (a.lang !== 'x-default' && !back) {
      errors.push(`${route}: declares ${target} as "${a.lang}", but ${target} does not link back — set is not reciprocal`)
    }
  }

  // a set of one is not a set
  const real = d.alts.filter((a) => a.lang !== 'x-default')
  if (real.length < 2) {
    errors.push(`${route}: declares hreflang with no genuine translation set (${real.length} alternate)`)
  }
  // self-reference required
  if (real.length && !real.some((a) => routeOf(a.href) === route)) {
    errors.push(`${route}: declares alternates but does not list itself`)
  }
}

// ── Static-render guarantee ─────────────────────────────────────────────────
// The locale programme's stated constraint is that public HTML stays statically
// prerendered. _document now resolves <html lang> per route; if that ever opts
// pages into request-time rendering, the built HTML files disappear and this
// count collapses — so the count is the gate.
if (staticPages !== Infinity && staticPages !== EXPECTED_STATIC_PAGES) {
  errors.push(
    `prerendered page count is ${staticPages}, but lib/locale/l1-manifest.ts freezes it at ${EXPECTED_STATIC_PAGES} — ` +
      `${staticPages < EXPECTED_STATIC_PAGES ? 'pages have gone missing or opted into request-time rendering' : 'pages were added without updating the manifest'}`,
  )
}

  return { errors, withAlts }
}

// Exported so the mutation harness can damage real, freshly built documents
// rather than fixtures that could drift from what actually ships.
export const DOCUMENTS = parsed
export const STATIC_PAGE_COUNT = [...docs.keys()].filter((r) => !r.endsWith('.html')).length

// ── CLI ─────────────────────────────────────────────────────────────────────
const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
const builtNextPages = STATIC_PAGE_COUNT
const { errors, withAlts } = auditHreflang(parsed, { staticPages: builtNextPages })
const notes = []

// ── Report ──────────────────────────────────────────────────────────────────
const sets = new Map()
for (const [route, d] of parsed) {
  if (!d.alts.length) continue
  const key = d.alts.map((a) => routeOf(a.href)).sort().join(' | ')
  if (!sets.has(key)) sets.set(key, [])
  sets.get(key).push(route)
}
console.log('hreflang + document-language gate')
console.log(`  documents scanned            : ${parsed.size} (${builtNextPages} prerendered Next pages + ${parsed.size - builtNextPages} static .html)`)
console.log(`  documents declaring hreflang : ${withAlts}`)
console.log(`  reciprocal sets              : ${sets.size}`)
for (const [key, members] of sets) console.log(`    · ${members.length} members: ${key}`)
console.log(`  documents with no hreflang   : ${parsed.size - withAlts} (correct when a page has no translation)`)
const langs = {}
for (const d of parsed.values()) langs[d.lang ?? 'none'] = (langs[d.lang ?? 'none'] ?? 0) + 1
console.log(`  <html lang> distribution     : ${JSON.stringify(langs)}`)
for (const n of notes) console.log(`  · ${n}`)

if (errors.length) {
  console.error(`\nhreflang gate: FAIL (${errors.length})`)
  for (const e of errors.slice(0, 40)) console.error(`  ✗ ${e}`)
  if (errors.length > 40) console.error(`  … and ${errors.length - 40} more`)
  process.exit(1)
}
console.log('\nhreflang gate: PASS')
}
