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

export async function auditLocalePages({ concepts = R.LOCALE_CONCEPTS, content = CONTENT, readPage = null } = {}) {
  // readPage lets the mutation harness substitute damaged HTML for a route, so
  // every gate below can be proven to fail on the defect it exists to catch.
  // Nothing else overrides it; production runs read the real build.
  const readRoute = (route) => (readPage ? readPage(route) : read(pageFile(route)))
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

  // ── Corrective-pass gates ────────────────────────────────────────────────
  //
  // Each of these pins a defect that reached production. They read the BUILT
  // HTML, because every one of them was a difference between what the server
  // sent and what the page looked like after hydration — the exact gap a
  // source-level check cannot see.

  const C = await import('../lib/locale/chrome.ts')

  // 1. The ecosystem ribbon was server-rendered in Czech on every /en and /de
  //    page and swapped after hydration.
  for (const [route, locale] of localeRoutes(concepts)) {
    const html = readRoute(route)
    if (!html) continue
    const bar = html.match(/<div class="eco-bar"[^>]*lang="([^"]+)"/)
    if (!bar) { errors.push(`${route}: no ecosystem ribbon found — did it stop rendering?`); continue }
    if (bar[1] !== locale) {
      errors.push(`${route}: ecosystem ribbon server-rendered as lang="${bar[1]}", expected "${locale}" (Czech flash)`)
    }
  }

  // 2. No page may announce a language group that holds no controls.
  for (const [route] of allCheckedRoutes(concepts)) {
    const html = readRoute(route)
    if (!html) continue
    for (const m of html.matchAll(/<div class="lang-select"[^>]*>([\s\S]*?)<\/div>/g)) {
      const inner = m[1]
      const hasControls = /lang-btn|locale-switcher/.test(inner)
      if (!hasControls) errors.push(`${route}: ARIA group "Website language" renders with no interactive control`)
    }
  }

  // 3. Every Czech concept primary must expose the registry switcher, and must
  //    not also expose the legacy text-swapping widget beside it.
  for (const concept of concepts) {
    const cs = R.urlFor(concept, 'cs')
    if (R.alternatesFor(cs).length < 2) continue
    const html = readRoute(cs)
    if (!html) { errors.push(`${cs}: Czech concept primary has no built page`); continue }
    if (!/class="locale-switcher/.test(html)) {
      errors.push(`${cs}: Czech concept primary has published translations but no page-to-page switcher`)
    }
    // The legacy widget legitimately remains on the Czech spine — it is what
    // translates the trilingual client islands, which is a different job from
    // locale navigation. What must NOT happen is a locale page carrying it.
  }
  for (const [route] of localeRoutes(concepts)) {
    const html = readRoute(route)
    if (html && /class="lang-btn/.test(html)) {
      errors.push(`${route}: locale page renders the legacy text-swap widget, which cannot change the URL`)
    }
  }

  // 4. Accessibility strings must be in the page's own language, and legal
  //    links must point at the page for that locale carrying no false hreflang.
  for (const [route, locale] of localeRoutes(concepts)) {
    const html = readRoute(route)
    if (!html) continue
    for (const key of ['mainNav', 'mobileNav', 'openMenu', 'footerNav']) {
      const expected = C.CHROME_ARIA[locale][key]
      if (!html.includes(`aria-label="${escapeHtml(expected)}"`)) {
        errors.push(`${route}: missing localized aria-label ${key}="${expected}"`)
      }
    }
    const legal = html.match(/<div class="footer__legal">([\s\S]*?)<\/div>/)
    if (!legal) { errors.push(`${route}: no legal footer block`); continue }
    for (const key of ['terms', 'priv', 'cook']) {
      const target = C.footerTarget(key)
      const { href, hreflang } = C.resolveNavHref(target, locale)
      if (!legal[1].includes(`href="${href}"`)) {
        errors.push(`${route}: legal link ${key} does not point at ${href}`)
      }
      if (hreflang) errors.push(`${route}: legal link ${key} resolved with hreflang="${hreflang}" — it has a ${locale} page`)
    }
    if (/<div class="footer__legal">[\s\S]*?hreflang="cs"[\s\S]*?<\/div>/.test(html)) {
      errors.push(`${route}: a legal link is declared hreflang="cs"`)
    }
  }

  // 5. A concept whose Czech primary is a form must serve that form in every
  //    published locale, with the same field set.
  const fieldCount = (html) => {
    const main = html.match(/<main[\s\S]*?<\/main>/)
    const scope = main ? main[0] : html
    return {
      form: (scope.match(/<form/g) || []).length,
      input: (scope.match(/<input/g) || []).length,
      select: (scope.match(/<select/g) || []).length,
      textarea: (scope.match(/<textarea/g) || []).length,
    }
  }
  for (const concept of concepts) {
    if (concept.pageType !== 'tool') continue
    const csHtml = readRoute(R.urlFor(concept, 'cs'))
    if (!csHtml) continue
    const cs = fieldCount(csHtml)
    if (cs.form === 0) continue
    for (const locale of concept.published) {
      if (locale === 'cs') continue
      const route = R.urlFor(concept, locale)
      const html = readRoute(route)
      if (!html) continue
      const got = fieldCount(html)
      for (const k of ['form', 'input', 'select', 'textarea']) {
        if (got[k] !== cs[k]) {
          errors.push(`${route}: <${k}> count ${got[k]} does not match the Czech primary's ${cs[k]} — conversion path not equivalent`)
        }
      }
    }
  }

  return { errors, notes }
}

/** [route, locale] for every published localized page. */
function localeRoutes(concepts) {
  const out = []
  for (const c of concepts) for (const l of c.published) if (l !== 'cs') out.push([R.urlFor(c, l), l])
  return out
}

/** Every route this gate inspects: localized pages plus the Czech primaries. */
function allCheckedRoutes(concepts) {
  const out = localeRoutes(concepts)
  for (const c of concepts) out.push([R.urlFor(c, 'cs'), 'cs'])
  return out
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, notes } = await auditLocalePages()
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
