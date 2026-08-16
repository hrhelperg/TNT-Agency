// Mutation tests for the locale pilot gate.
//
// This gate guards a plan rather than a shipped feature, which makes it unusually
// easy to fool: nothing 404s, nothing renders, so a broken registry looks exactly
// like a correct one. Each mutation below injects one way the plan could go wrong
// — most of them ways that would only become visible in Search Console weeks
// after launch — and asserts the real exported auditLocaleRegistry() rejects it.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/mutate-locale-registry.mjs
//      (npm run test:mutate-locale-registry)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { auditLocaleRegistry } from './validate-locale-registry.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const { LOCALE_PILOT, LOCALES, LOCALE_PREFIX, PILOT_APPROVAL } = await import(path.join(ROOT, 'lib/locale/registry.ts'))
const REGISTRY_SRC = fs.readFileSync(path.join(ROOT, 'lib/locale/registry.ts'), 'utf8')

const canonicalRoutes = Array.from(
  fs.readFileSync(path.join(ROOT, 'public/sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g),
  (m) => new URL(m[1]).pathname,
)

const BASE = {
  locales: LOCALES,
  prefixes: LOCALE_PREFIX,
  canonicalRoutes,
  staticPages: 175,
  appSources: [],
  builtHtml: [],
  registrySource: REGISTRY_SRC,
  approval: PILOT_APPROVAL,
}
const clone = () => JSON.parse(JSON.stringify(LOCALE_PILOT))
const run = (over = {}) => auditLocaleRegistry({ pilot: clone(), ...BASE, ...over })
const withPilot = (mutate, over = {}) => {
  const pilot = clone()
  mutate(pilot)
  return auditLocaleRegistry({ pilot, ...BASE, ...over })
}
const first = (pilot) => pilot[0].targets[0]

const MUTATIONS = [
  {
    name: '1. a future route collides with an existing Czech URL',
    expect: /collides with an existing Czech canonical/,
    run: () => withPilot((p) => { first(p).futureRoute = '/o-nas' }),
  },
  {
    name: '2. two pilot pages claim the same future route',
    expect: /already claimed by/,
    run: () => withPilot((p) => { p[1].targets[0].futureRoute = p[0].targets[0].futureRoute }),
  },
  {
    name: '3. a future route loses its locale prefix',
    expect: /does not sit under the/,
    run: () => withPilot((p) => { first(p).futureRoute = '/about' }),
  },
  {
    name: '4. a route is filed under the wrong locale',
    expect: /is declared "en"|does not sit under/,
    run: () => withPilot((p) => { first(p).futureRoute = '/de/about' }),
  },
  {
    name: '5. Czech is added as a prefixed locale target',
    expect: /Czech is served unprefixed/,
    run: () => withPilot((p) => { first(p).locale = 'cs' }),
  },
  {
    name: '6. a localized page canonicalises back to Czech',
    expect: /must self-canonicalise/,
    run: () => withPilot((p) => { first(p).canonicalPolicy = 'SOURCE' }),
  },
  {
    name: '7. indexing enabled on an untranslated page',
    expect: /only an APPROVED translation may be indexed/,
    run: () => withPilot((p) => { first(p).indexingEligible = true }),
  },
  {
    name: '8. indexing enabled without editorial review',
    expect: /without a completed editorial review/,
    run: () => withPilot((p) => {
      const t = first(p)
      t.translationStatus = 'APPROVED'
      t.indexingEligible = true
    }),
  },
  {
    name: '9. a legal-review page is indexed without legal sign-off',
    expect: /flagged legalReviewRequired, without legal sign-off/,
    run: () => withPilot((p) => {
      const e = p.find((x) => x.legalReviewRequired)
      const t = e.targets[0]
      t.translationStatus = 'APPROVED'
      t.editorialReviewStatus = 'COMPLETE'
      t.indexingEligible = true
    }),
  },
  {
    name: '10. pilotStatus claims PUBLISHED with no published translation',
    expect: /pilotStatus PUBLISHED but translationStatus/,
    run: () => withPilot((p) => { first(p).pilotStatus = 'PUBLISHED' }),
  },
  {
    name: '11. a locale URL is added to the sitemap before it exists',
    // The real sitemap is read from disk, so simulate by pointing a future route
    // at a URL the sitemap already contains.
    expect: /appears in the sitemap before it exists|collides with an existing Czech canonical/,
    run: () => withPilot((p) => { first(p).futureRoute = '/pro-zamestnavatele' }),
  },
  {
    name: '12. speculative hreflang for an unpublished locale route',
    expect: /planned but not published — speculative hreflang/,
    run: () => run({
      builtHtml: [['x.html', '<link rel="alternate" hreflang="en" href="https://talentpartnerid.com/en/about">']],
    }),
  },
  {
    name: '13. hreflang for a locale route that is not in the registry at all',
    expect: /not in the pilot registry/,
    run: () => run({
      builtHtml: [['x.html', '<link rel="alternate" hreflang="de" href="https://talentpartnerid.com/de/erfundene-seite">']],
    }),
  },
  {
    name: '14. getServerSideProps introduced on a page',
    expect: /locale must never be resolved at request time/,
    run: () => run({ appSources: [['pages/x.tsx', 'export async function getServerSideProps() { return { props: {} } }']] }),
  },
  {
    name: '15. Accept-Language read during render',
    expect: /locale must never be resolved at request time/,
    run: () => run({ appSources: [['pages/x.tsx', "const l = req.headers['accept-language']"]] }),
  },
  {
    name: '16. geo lookup during render',
    expect: /locale must never be resolved at request time/,
    run: () => run({ appSources: [['pages/x.tsx', 'const c = req.geo.country']] }),
  },
  {
    name: '17. next/headers cookies() pulled into a page',
    expect: /locale must never be resolved at request time/,
    run: () => run({ appSources: [['pages/x.tsx', "import { cookies } from 'next/headers'"]] }),
  },
  {
    name: '18. middleware rewriting locale',
    expect: /locale must never be resolved at request time/,
    run: () => run({ appSources: [['lib/x.ts', 'return NextResponse.rewrite(url)']] }),
  },
  {
    name: '19. the prerendered page count collapses (locale went dynamic)',
    expect: /static prerender regression/,
    run: () => run({ staticPages: 12 }),
  },
  {
    name: '20. a future route carries a tracking query string',
    expect: /carries a query or fragment/,
    run: () => withPilot((p) => { first(p).futureRoute = '/en/about?utm_source=x' }),
  },
  {
    name: '21. a non-ASCII slug invites encoding drift',
    expect: /outside \[a-z0-9\/-\]/,
    run: () => withPilot((p) => { p[1].targets[1].futureRoute = '/de/über-uns' }),
  },
  {
    name: '22. a route enters the pilot without owner approval',
    expect: /without explicit owner approval/,
    run: () => withPilot((p) => { delete p[0].ownerApproved }),
  },
  {
    name: '23. a slug is generated from a dictionary instead of hand-written',
    expect: /slugs must be hand-written literals|computes a futureRoute/,
    run: () => run({ registrySource: REGISTRY_SRC.replace("target('en', '/en/about')", "target('en', DICT.en.about)") }),
  },
  {
    name: '24. the registry starts importing a translation module',
    expect: /must not derive from a dictionary/,
    run: () => run({ registrySource: "import { DICT } from '../i18n/dict'\n" + REGISTRY_SRC }),
  },
  {
    name: '25. build-time slug generation is switched on',
    expect: /build-time slug generation is not approved/,
    run: () => run({ approval: { ...PILOT_APPROVAL, slugsAreGenerated: true } }),
  },
  {
    name: '26. the URL policy is silently changed away from the approved one',
    expect: /the approved policy is TRANSLATED_SLUGS/,
    run: () => run({ approval: { ...PILOT_APPROVAL, urlPolicy: 'CZECH_SLUGS' } }),
  },
  {
    name: '27. the slug-stability contract is dropped',
    expect: /must be treated as stable/,
    run: () => run({ approval: { ...PILOT_APPROVAL, slugStabilityContract: false } }),
  },
  {
    name: '28. two pages share an hreflang group',
    expect: /is used by more than one page/,
    run: () => withPilot((p) => { p[1].hreflangGroup = p[0].hreflangGroup }),
  },
]

let failures = 0
console.log('Mutation tests — locale pilot gate\n')

const control = run()
if (control.errors.length) {
  console.error(`  ✗ CONTROL: the real registry already fails (${control.errors.length})`)
  for (const e of control.errors.slice(0, 5)) console.error(`      ${e}`)
  failures++
} else {
  console.log(`  ✓ control: the real registry passes (${control.futureRouteCount} planned routes, none published)`)
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

// Negative control: "/en/... returns 404" must NOT be an error today.
{
  const { errors } = run()
  const wrongly = errors.filter((e) => /404|does not resolve|not reachable/i.test(e))
  if (!wrongly.length) console.log('  ✓ negative control: unbuilt locale routes are not treated as defects')
  else {
    console.error(`  ✗ negative control: gate demands routes that intentionally do not exist: ${wrongly[0]}`)
    failures++
  }
}

console.log(
  failures
    ? `\nMutation tests: FAIL — ${failures} check(s) did not behave as specified`
    : `\nMutation tests: PASS — ${MUTATIONS.length} defects caught, control + negative control correct`,
)
process.exit(failures ? 1 : 0)
