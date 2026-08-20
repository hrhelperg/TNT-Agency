// Mutation tests for the CTA intent-routing gate.
//
// The defect this gate exists to prevent shipped and survived four waves: 57
// commercial pages asked "Řešíte obsazení pozic?" and then routed the reader to
// a general contact page. Nothing failed, because nothing was checking that a
// CTA's destination matched the intent its own wording declared.
//
// Each mutation injects one drift, runs the REAL exported auditCtaRouting(), and
// asserts the gate rejects it. Pages are deep-cloned; nothing on disk changes.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/mutate-cta-routing.mjs
//      (npm run test:mutate-cta-routing)

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { auditCtaRouting, REQUEST_PATH } from './validate-cta-routing.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const { SEO_PAGES } = await import(path.join(ROOT, 'lib/content/pages/index.ts'))

const clone = () => JSON.parse(JSON.stringify(SEO_PAGES))
const find = (pages, slug) => pages.find((p) => p.slug === slug)

const MUTATIONS = [
  {
    name: '1. a repaired employer-request CTA drifts back to /contact',
    expect: /declares employer staffing intent but routes to \/contact/,
    slug: 'fluktuace-zamestnancu',
    apply(pages) {
      find(pages, 'fluktuace-zamestnancu').cta.href = '/contact'
    },
  },
  {
    name: '2. a new regional page ships with a /contact CTA',
    expect: /declares employer staffing intent but routes to \/contact/,
    slug: 'naklady-na-zamestnance-praha',
    apply(pages) {
      find(pages, 'naklady-na-zamestnance-praha').cta.href = '/contact'
    },
  },
  {
    name: '3. a candidate-facing CTA is re-routed to the employer request form',
    expect: /documented as CANDIDATE CONTACT/,
    slug: 'prace-pro-cizince-praha',
    apply(pages) {
      find(pages, 'prace-pro-cizince-praha').cta.href = REQUEST_PATH
    },
  },
  {
    name: '4. a documented GENERAL CONTACT CTA is re-routed without updating its record',
    expect: /documented as GENERAL CONTACT/,
    slug: 'faq-pro-zamestnavatele',
    apply(pages) {
      find(pages, 'faq-pro-zamestnavatele').cta.href = REQUEST_PATH
    },
  },
  {
    name: '5. a CTA destination gains a tracking query string',
    expect: /carries a query or fragment/,
    slug: 'nabor-svarecu',
    apply(pages) {
      find(pages, 'nabor-svarecu').cta.href = `${REQUEST_PATH}?source=profession`
    },
  },
  {
    name: '6. a CTA points at a destination outside the allowed set',
    expect: /outside the allowed set/,
    slug: 'nabor-cnc-operatoru',
    apply(pages) {
      find(pages, 'nabor-cnc-operatoru').cta.href = '/kontakt-novy'
    },
  },
  {
    name: '7. staffing intent routed to /submit-offer',
    expect: /declares employer staffing intent but routes to \/submit-offer/,
    slug: 'nabor-elektrikaru',
    apply(pages) {
      find(pages, 'nabor-elektrikaru').cta.href = '/submit-offer'
    },
  },
  {
    name: '7b. a regional page drifts back to /submit-offer',
    expect: /declares employer staffing intent but routes to \/submit-offer/,
    slug: 'trh-prace-praha',
    apply(pages) {
      find(pages, 'trh-prace-praha').cta.href = '/submit-offer'
    },
  },
  {
    name: '7c. an ambiguous CTA points somewhere other than the request form',
    expect: /matches no known intent/,
    slug: 'nabor-cnc-operatoru',
    apply(pages) {
      const p = find(pages, 'nabor-cnc-operatoru')
      p.cta.title = 'Zajímá vás to?'
      p.cta.text = 'Napište nám.'
      p.cta.eyebrow = 'Info'
      p.cta.buttonLabel = 'Napsat'
      p.cta.href = '/contact'
    },
  },
  {
    name: '8. a documented exception goes stale (its CTA no longer exists)',
    expect: /stale exception/,
    slug: null,
    apply(pages) {
      for (const p of pages) {
        if (p.cta.title === 'Potřebujete se zorientovat v povoleních?') p.cta.title = 'Něco jiného?'
      }
    },
  },
  {
    // The copy under a candidate-facing title is rewritten to address employers.
    // The title still says "Hledáte práci", so the exception key still matches —
    // which is why the gate must judge the body copy, not the key.
    name: '9. a CANDIDATE CONTACT exception has its copy rewritten to address employers',
    expect: /copy now reads as an employer request/,
    slug: 'prace-pro-cizince-brno',
    apply(pages) {
      const p = find(pages, 'prace-pro-cizince-brno')
      p.cta.text = 'Hledáte pracovníky v Brně? Pomůžeme vám je zajistit.'
      p.cta.eyebrow = 'Nábor'
      p.cta.buttonLabel = 'Poptat pracovníky'
    },
  },
]

let failures = 0
console.log('Mutation tests — CTA intent-routing gate\n')

const control = auditCtaRouting(clone())
if (control.errors.length) {
  console.error(`  ✗ CONTROL: the real registry already fails (${control.errors.length})`)
  for (const e of control.errors.slice(0, 5)) console.error(`      ${e}`)
  failures++
} else {
  console.log(`  ✓ control: the real registry passes (${control.review.length} in REVIEW)`)
}

for (const m of MUTATIONS) {
  const pages = clone()
  m.apply(pages)
  const { errors } = auditCtaRouting(pages)
  const matched = errors.filter((e) => m.expect.test(e))
  const named = m.slug ? matched.some((e) => e.startsWith(`${m.slug}:`)) : matched.length > 0
  if (matched.length && named) console.log(`  ✓ ${m.name}`)
  else if (matched.length) {
    console.error(`  ✗ ${m.name}\n      caught, but no message names ${m.slug}: ${matched[0]}`)
    failures++
  } else {
    console.error(`  ✗ ${m.name}\n      NOT CAUGHT — ${errors.length} error(s), none matching ${m.expect}`)
    failures++
  }
}

// Negative control: the documented /contact exceptions must NOT fail.
{
  const { errors } = auditCtaRouting(clone())
  const flagged = errors.filter((e) => /Potřebujete s tím pomoci|Hledáte práci|Máte konkrétní/.test(e))
  if (!flagged.length) console.log('  ✓ negative control: documented /contact exceptions pass unflagged')
  else {
    console.error(`  ✗ negative control: documented exceptions were flagged: ${flagged[0]}`)
    failures++
  }
}

console.log(
  failures
    ? `\nMutation tests: FAIL — ${failures} check(s) did not behave as specified`
    : `\nMutation tests: PASS — ${MUTATIONS.length} defects caught, control + negative control correct`,
)

// ─────────────────────────────────────────────────────────────────────────────
// BESPOKE-SURFACE MUTATIONS (W3)
//
// The registry mutations above prove the gate sees SEO_PAGES. These prove it
// sees the hand-written surfaces — the blind spot that let the homepage's
// largest employer button point at the agency directory and the flagship
// calculator's "Poptat pracovníky" point at /submit-offer. A gate that cannot
// fail on those two files would be theatre.

import fsx from 'node:fs'
import {
  auditBespokeCtas,
  SCANNED_SURFACES,
  BESPOKE_CTAS,
} from './validate-cta-routing.mjs'

const readSurfaces = () => {
  const m = new Map()
  for (const rel of SCANNED_SURFACES) {
    const abs = path.join(ROOT, rel)
    if (fsx.existsSync(abs)) m.set(rel, fsx.readFileSync(abs, 'utf8'))
  }
  return m
}
const swapHref = (src, label, to) => {
  // Rewrite the href of the <a> whose visible label matches.
  const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp('(<a\\b[^>]*?href=)"[^"]*"([^>]*>(?:(?!</a>)[\\s\\S])*?' + esc + ')')
  return src.replace(re, '$1"' + to + '"$2')
}

let bFail = 0
const bcheck = (name, errors, expectFail, pattern) => {
  const matched = pattern ? errors.filter((e) => pattern.test(e)) : errors
  const ok = expectFail ? matched.length > 0 : errors.length === 0
  if (ok) console.log(`  ✓ ${name}`)
  else {
    console.error(`  ✗ ${name}`)
    console.error(`      expected ${expectFail ? 'FAIL' : 'PASS'}; got ${errors.length} error(s)`)
    if (errors.length) console.error(`      first: ${errors[0]}`)
    bFail++
  }
}

console.log('\nBespoke-surface mutations — CTA intent-routing gate\n')

{
  const { errors } = auditBespokeCtas(readSurfaces())
  bcheck('control: real bespoke surfaces pass', errors, false)
}

// A. homepage employer CTA back to /agencies
{
  const f = readSurfaces()
  f.set('pages/index.tsx', swapHref(f.get('pages/index.tsx'), 'Hledám pracovníky', '/agencies'))
  const { errors } = auditBespokeCtas(f)
  bcheck('A. homepage employer CTA -> /agencies', errors, true, /Hledám pracovníky/)
}

// B. calculator request CTA back to /submit-offer
{
  const f = readSurfaces()
  const k = 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx'
  f.set(k, swapHref(f.get(k), '{t.ctaRequest}', '/submit-offer'))
  const { errors } = auditBespokeCtas(f)
  bcheck('B. calculator "Poptat pracovníky" -> /submit-offer', errors, true, /ctaRequest/)
}

// C. bespoke employer CTA to generic /contact
{
  const f = readSurfaces()
  f.set('pages/index.tsx', swapHref(f.get('pages/index.tsx'), 'Poslat poptávku →', '/contact'))
  const { errors } = auditBespokeCtas(f)
  bcheck('C. bespoke employer CTA -> /contact', errors, true, /Poslat poptávku/)
}

// D. candidate CTA into the employer request form
{
  const f = readSurfaces()
  f.set('pages/offers.tsx', swapHref(f.get('pages/offers.tsx'), 'Promluvit s náborářem', '/poptavka-pracovniku'))
  const { errors } = auditBespokeCtas(f)
  bcheck('D. candidate CTA -> employer request form', errors, true, /CANDIDATE_CONTACT|náborářem/)
}

// E. regulatory CTA staying on /contact must PASS
{
  const { errors } = auditBespokeCtas(readSurfaces())
  const flagged = errors.filter((e) => /socialni-zdravotni-dane/.test(e))
  bcheck('E. regulatory CTA deliberately on /contact passes', flagged, false)
}

// F. genuine marketplace CTA on /submit-offer must PASS
{
  const { errors } = auditBespokeCtas(readSurfaces())
  const flagged = errors.filter((e) => /submit-offer/.test(e))
  bcheck('F. marketplace CTA -> /submit-offer passes', flagged, false)
}

// G. query-param employer CTA
{
  const f = readSurfaces()
  f.set('pages/index.tsx', swapHref(f.get('pages/index.tsx'), 'Hledám pracovníky', '/poptavka-pracovniku?utm_source=hero'))
  const { errors } = auditBespokeCtas(f)
  bcheck('G. query-param employer CTA', errors, true, /query or fragment/)
}

// H. a bespoke page dropped from the inventory
{
  const surfaces = SCANNED_SURFACES.filter((s) => s !== 'pages/index.tsx')
  const { errors } = auditBespokeCtas(readSurfaces(), { surfaces })
  bcheck('H. bespoke page removed from the CTA inventory', errors, true, /not in SCANNED_SURFACES/)
}

// I. a declared CTA deleted from the page (stale inventory entry)
{
  const f = readSurfaces()
  f.set('pages/index.tsx', f.get('pages/index.tsx').replace('Poslat poptávku →', 'Něco jiného'))
  const { errors } = auditBespokeCtas(f)
  bcheck('I. declared CTA no longer exists on the page', errors, true, /no longer exists|not declared/)
}

console.log(
  bFail
    ? `\nBespoke mutations: FAIL — ${bFail} check(s) did not behave as specified`
    : '\nBespoke mutations: PASS — 9 defects caught, control + 2 negative controls correct',
)
process.exit(failures + bFail ? 1 : 0)
