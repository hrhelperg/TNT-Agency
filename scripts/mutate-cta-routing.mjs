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
process.exit(failures ? 1 : 0)
