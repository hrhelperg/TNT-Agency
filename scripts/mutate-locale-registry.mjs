// Mutation tests for the locale registry gate.
//
// The rules worth having are the ones whose violation is invisible: a
// many-to-one hreflang cluster is discarded silently by search engines, and a
// synthesized locale URL 404s only for the visitor who follows it. So each
// mutation introduces a defect that would NOT show up in a browser.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/mutate-locale-registry.mjs

import { auditLocaleRegistry } from './validate-locale-registry.mjs'
const R = await import('../lib/locale/registry.ts')

const base = {
  czechRoutes: R.CZECH_ROUTES,
  concepts: R.LOCALE_CONCEPTS,
  legal: R.LEGAL_CONCEPTS,
  locs: R.CZECH_ROUTES.slice(),
}
const clone = (c) => JSON.parse(JSON.stringify(c))
const withConcepts = (mutate) => {
  const concepts = clone(R.LOCALE_CONCEPTS)
  mutate(concepts)
  return auditLocaleRegistry({ ...base, concepts })
}

const MUTATIONS = [
  {
    name: '1. the Czech spine is reordered (breaks byte-identical sitemap)',
    expect: /does not match the sitemap in order/,
    run: () => auditLocaleRegistry({ ...base, czechRoutes: [...R.CZECH_ROUTES].reverse() }),
  },
  {
    name: '2. a Czech canonical is dropped from the spine',
    expect: /does not match the sitemap in order/,
    run: () => auditLocaleRegistry({ ...base, czechRoutes: R.CZECH_ROUTES.slice(1) }),
  },
  {
    name: '3. a concept primary is not a real Czech canonical',
    expect: /is not an existing Czech canonical/,
    run: () => withConcepts((c) => { c[1].csPrimary = '/invented-route' }),
  },
  {
    name: '4. two concepts claim the same Czech primary',
    expect: /already another concept's primary/,
    run: () => withConcepts((c) => { c[1].csPrimary = c[0].csPrimary }),
  },
  {
    name: '5. a localized URL loses its locale prefix',
    expect: /does not carry the en prefix/,
    run: () => withConcepts((c) => { c[1].urls.en = '/for-employers' }),
  },
  {
    name: '6. a localized URL collides with an existing Czech canonical',
    expect: /collides with an existing Czech canonical/,
    run: () => withConcepts((c) => { c[1].urls.en = '/skladnici' }),
  },
  {
    name: '7. two concepts claim the same localized URL',
    expect: /is claimed by both/,
    run: () => withConcepts((c) => { c[2].urls.en = c[1].urls.en }),
  },
  {
    name: '8. a collapsed variant is invented rather than real',
    expect: /collapsed variant "\/not-real" is not an existing Czech canonical/,
    run: () => withConcepts((c) => {
      const t = c.find((x) => x.csCollapsed)
      t.csCollapsed = ['/not-real']
    }),
  },
  {
    name: '9. a collapsed variant is also a concept primary',
    expect: /is collapsed here but is a concept primary elsewhere/,
    run: () => withConcepts((c) => {
      const t = c.find((x) => x.csCollapsed)
      t.csCollapsed = [c[0].csPrimary]
    }),
  },
  {
    name: '10. a legal page is mapped to a URL that does not exist',
    expect: /is not an existing URL — legal pages are mapped read-only/,
    run: () => {
      const legal = clone(R.LEGAL_CONCEPTS)
      legal[0].urls.de = '/de/datenschutz'
      return auditLocaleRegistry({ ...base, legal })
    },
  },
  {
    name: '11. a concept ships without a documented reason',
    expect: /needs a note explaining why it is localized/,
    run: () => withConcepts((c) => { c[1].notes = 'tbd' }),
  },
  {
    name: '12. duplicate concept ids',
    expect: /duplicate concept id/,
    run: () => withConcepts((c) => { c[1].id = c[0].id }),
  },
]

let failures = 0
console.log('Mutation tests — locale registry gate\n')

const control = auditLocaleRegistry()
if (control.errors.length) {
  console.error(`  ✗ CONTROL: the real registry already fails (${control.errors.length})`)
  control.errors.slice(0, 3).forEach((e) => console.error(`      ${e}`))
  failures++
} else {
  console.log('  ✓ control: the real registry passes')
}

for (const m of MUTATIONS) {
  const { errors } = m.run()
  if (errors.some((e) => m.expect.test(e))) console.log(`  ✓ ${m.name}`)
  else {
    console.error(`  ✗ ${m.name}\n      NOT CAUGHT — ${errors.length} error(s), none matching ${m.expect}`)
    if (errors.length) console.error(`      first: ${errors[0]}`)
    failures++
  }
}

// Negative control: the collapse design itself must not be flagged.
{
  const { errors } = auditLocaleRegistry()
  const flagged = errors.filter((e) => /collapsed/.test(e))
  if (!flagged.length) console.log('  ✓ negative control: the real collapsed variants pass unflagged')
  else { console.error(`  ✗ negative control: ${flagged[0]}`); failures++ }
}

console.log(failures
  ? `\nMutation tests: FAIL — ${failures} check(s) did not behave as specified`
  : `\nMutation tests: PASS — ${MUTATIONS.length} defects caught, control + negative control correct`)
process.exit(failures ? 1 : 0)
