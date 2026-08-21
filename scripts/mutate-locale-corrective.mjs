/**
 * Mutation tests for the corrective-pass gates in validate-locale-pages.mjs.
 *
 * Each gate here exists because a specific defect reached production. A gate
 * that passes proves nothing on its own — these damage the built HTML in the
 * exact shape of the original defect and require the gate to fail. The control
 * asserts the real build passes, so a gate that fails everything scores zero.
 *
 * BEHAVIOURAL, not structural: the mutations alter served HTML, which is what
 * a visitor and a crawler actually receive.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { auditLocalePages } from './validate-locale-pages.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const BUILD = path.join(ROOT, '.next/server/pages')
const R = await import('../lib/locale/registry.ts')

const pageFile = (route) => {
  const rel = route === '/' ? 'index' : route.replace(/^\//, '')
  return path.join(BUILD, `${rel}.html`)
}
const realHtml = (route) => {
  const f = pageFile(route)
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null
}

/** A readPage that applies `mutate` to one route and serves the rest intact. */
const damage = (targetRoute, mutate) => (route) => {
  const html = realHtml(route)
  if (html === null || route !== targetRoute) return html
  return mutate(html)
}

const EN = '/en/for-employers'
const DE = '/de/fuer-arbeitgeber'
const CS_PRIMARY = '/pro-zamestnavatele'
const EN_FORM = '/en/request-staff'

const MUTATIONS = [
  {
    name: '1. ecosystem ribbon reverts to Czech SSR on an English page',
    readPage: damage(EN, (h) => h.replace(/<div class="eco-bar"([^>]*)lang="en"/, '<div class="eco-bar"$1lang="cs"')),
    expect: /ecosystem ribbon server-rendered as lang="cs"/,
  },
  {
    name: '2. ecosystem ribbon reverts to Czech SSR on a German page',
    readPage: damage(DE, (h) => h.replace(/<div class="eco-bar"([^>]*)lang="de"/, '<div class="eco-bar"$1lang="cs"')),
    expect: /ecosystem ribbon server-rendered as lang="cs"/,
  },
  {
    name: '3. ecosystem ribbon disappears entirely',
    readPage: damage(EN, (h) => h.replace(/<div class="eco-bar"/, '<div class="eco-bar-removed"')),
    expect: /no ecosystem ribbon found/,
  },
  {
    name: '4. ARIA language group renders with no controls (the original defect)',
    readPage: damage(EN, (h) =>
      h.replace(/(<div class="lang-select"[^>]*>)([\s\S]*?)(<\/div>)/, '$1<span class="lang-select__label">Language</span>$3')),
    expect: /ARIA group "Website language" renders with no interactive control/,
  },
  {
    name: '5. Czech concept primary loses the page-to-page switcher',
    readPage: damage(CS_PRIMARY, (h) => h.replace(/class="locale-switcher/g, 'class="was-switcher')),
    expect: /has published translations but no page-to-page switcher/,
  },
  {
    name: '6. locale page regains the legacy text-swap widget',
    readPage: damage(EN, (h) => h.replace('</body>', '<div class="lang-btn" data-lang="cs">CS</div></body>')),
    expect: /locale page renders the legacy text-swap widget/,
  },
  {
    name: '7. German page reverts to English ARIA landmark names',
    readPage: damage(DE, (h) => h.replace('aria-label="Hauptnavigation"', 'aria-label="Main navigation"')),
    expect: /missing localized aria-label mainNav/,
  },
  {
    name: '8. German legal link points at the English page (the original defect)',
    readPage: damage(DE, (h) => h.replace('href="/terms-de.html"', 'href="/terms.html"')),
    expect: /legal link terms does not point at \/terms-de\.html/,
  },
  {
    name: '9. legal link stamped hreflang="cs" (the original defect)',
    readPage: damage(EN, (h) =>
      h.replace(/(<div class="footer__legal">)/, '$1<a href="/terms.html" hreflang="cs">Terms</a>')),
    expect: /declared hreflang="cs"/,
  },
  {
    name: '10. English request page loses its form (the original defect)',
    readPage: damage(EN_FORM, (h) => h.replace(/<form/g, '<div data-was-form').replace(/<input/g, '<span data-was-input')),
    expect: /conversion path not equivalent/,
  },
  {
    name: '11. English form silently loses a select',
    readPage: damage(EN_FORM, (h) => h.replace('<select', '<span data-was-select')),
    expect: /<select> count 8 does not match the Czech primary's 9/,
  },
]

let caught = 0
const failures = []

const control = await auditLocalePages()
if (control.errors.length) {
  console.error('CONTROL FAILED — the real build does not pass the gate:')
  for (const e of control.errors) console.error(`    ${e}`)
  process.exit(1)
}
console.log('  ✓ control: the real build passes')

for (const m of MUTATIONS) {
  const { errors } = await auditLocalePages({ readPage: m.readPage })
  const hit = errors.find((e) => m.expect.test(e))
  if (hit) {
    caught++
    console.log(`  ✓ ${m.name}`)
  } else {
    failures.push(`${m.name}\n      expected /${m.expect.source}/\n      got: ${errors.slice(0, 3).join(' | ') || '(no errors at all)'}`)
    console.log(`  ✗ ${m.name}`)
  }
}

// Negative control: an untouched extra read must not invent errors.
const noop = await auditLocalePages({ readPage: (r) => realHtml(r) })
if (noop.errors.length) {
  failures.push(`negative control: injecting the REAL html produced ${noop.errors.length} error(s)`)
} else {
  console.log('  ✓ negative control: injecting the real html changes nothing')
}

if (failures.length) {
  console.error(`\nMutation tests: FAIL — ${failures.length} gate(s) did not catch their defect`)
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log(`\nMutation tests: PASS — ${caught} defects caught, control + negative control correct`)
