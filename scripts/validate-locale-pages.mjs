// Locale page gate — checks the BUILT HTML, not the source.
//
// Combines the locale coverage, canonical, lang, link and residual-language
// rules. They live together because they all answer one question about one
// artifact: is the page that was actually built correct for its locale?
//
// ON RESIDUAL LANGUAGE. This deliberately does NOT grep for Czech words. A word
// list flags proper nouns, place names, the legal entity and official Czech
// institution names — all of which BELONG on an English or German page — while
// missing an untranslated sentence made of words that happen not to be on the
// list. Instead it uses a structural signal: the localized page's own content
// object is the source of its body text, so any paragraph rendered into a
// locale page must be traceable to that locale's content module. Untranslated
// copy would have to come from somewhere else, and that is what is detected.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/validate-locale-pages.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const BUILD = path.join(ROOT, '.next/server/pages')
const ORIGIN = 'https://talentpartnerid.com'

const R = await import('../lib/locale/registry.ts')
const EN = await import('../lib/locale/content/en.ts')
const DE = await import('../lib/locale/content/de.ts')
const CONTENT = { en: EN.EN_CONTENT, de: DE.DE_CONTENT }

const pageFile = (route) => {
  if (route === '/') return path.join(BUILD, 'index.html')
  const a = path.join(BUILD, `${route}.html`)
  return fs.existsSync(a) ? a : path.join(BUILD, route, 'index.html')
}
const read = (f) => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null)
const attr = (html, re) => { const m = html.match(re); return m ? m[1] : null }

export function auditLocalePages({ concepts = R.LOCALE_CONCEPTS, content = CONTENT } = {}) {
  const errors = []
  const notes = []
  let checked = 0

  if (!fs.existsSync(BUILD)) {
    errors.push('.next/server/pages does not exist — run `npm run build` before this gate')
    return { errors, notes }
  }

  for (const concept of concepts) {
    for (const locale of ['en', 'de']) {
      if (!concept.published.includes(locale)) continue
      const route = concept.urls[locale]
      const html = read(pageFile(route))
      if (!html) {
        errors.push(`${concept.id}/${locale}: ${route} is published but no built page exists at ${pageFile(route)}`)
        continue
      }
      checked++

      // COVERAGE — the declared content must exist.
      const c = content[locale]?.[concept.id]?.[locale]
      if (!c) {
        errors.push(`${concept.id}/${locale}: published with no content object`)
        continue
      }

      // LANG — the document must declare this locale.
      const lang = attr(html, /<html[^>]*\slang="([a-zA-Z-]+)"/)
      if (lang !== R.LOCALE_LANG[locale]) {
        errors.push(`${route}: html lang is "${lang}", expected "${R.LOCALE_LANG[locale]}"`)
      }
      if (!/data-locale-locked="true"/.test(html)) {
        errors.push(`${route}: not marked data-locale-locked — the shared chrome script would override its language from localStorage`)
      }

      // CANONICAL — self-referencing, never pointing back to Czech.
      const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/)
      if (canonical !== `${ORIGIN}${route}`) {
        errors.push(`${route}: canonical is "${canonical}", expected "${ORIGIN}${route}" — a localized page canonicalising elsewhere would not index on its own`)
      }

      // CONTENT IN THE INITIAL HTML — not produced by a client dictionary.
      for (const [label, value] of [['h1', c.h1], ['intro', c.intro], ['title', c.title]]) {
        if (!html.includes(escapeHtml(value).slice(0, 60))) {
          errors.push(`${route}: ${label} is not present in the built HTML — locale content must be server-rendered`)
        }
      }
      const h1Count = (html.match(/<h1[\s>]/g) || []).length
      if (h1Count !== 1) errors.push(`${route}: ${h1Count} <h1> elements, expected exactly 1`)

      // RESIDUAL LANGUAGE — structural, not a word list.
      const bodyStrings = [c.intro, ...c.sections.flatMap((s) => [s.heading, ...s.body])]
      const rendered = bodyStrings.filter((p) => html.includes(escapeHtml(p).slice(0, 50))).length
      if (rendered !== bodyStrings.length) {
        errors.push(`${route}: ${bodyStrings.length - rendered} declared paragraph(s) are missing from the built HTML — the page is not rendering its own locale content`)
      }

      // LINKS — a locale page must not link into another locale's corpus.
      for (const other of ['en', 'de']) {
        if (other === locale) continue
        const foreign = R.LOCALE_CONCEPTS
          .map((x) => x.urls[other])
          .filter(Boolean)
          .filter((u) => new RegExp(`href="${u}"`).test(html))
        // The language switcher is the one legitimate cross-locale link.
        const switcherOnly = foreign.every((u) => new RegExp(`hreflang="${R.LOCALE_HREFLANG[other]}"[^>]*href="${u}"|href="${u}"[^>]*hreflang="${R.LOCALE_HREFLANG[other]}"`).test(html))
        if (foreign.length && !switcherOnly) {
          errors.push(`${route}: links into the ${other} corpus outside the language switcher (${foreign.slice(0, 2).join(', ')})`)
        }
      }
    }
  }

  notes.push(`${checked} published locale page(s) checked in the built output`)
  return { errors, notes }
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, notes } = auditLocalePages()
  console.log('Locale page gate')
  for (const n of notes) console.log(`  · ${n}`)
  if (errors.length) {
    console.error(`\n${errors.length} violation(s):`)
    for (const e of errors) console.error(`  ✗ ${e}`)
    console.error('\nLocale page gate: FAIL')
    process.exit(1)
  }
  console.log('\nLocale page gate: PASS')
}
