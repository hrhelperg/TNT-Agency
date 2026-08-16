// Mutation tests for the internal authority gate v4.
//
// A gate that has never rejected anything is not evidence. Each mutation below
// injects exactly one defect the gate claims to catch, runs the REAL exported
// auditAuthority() (not a reimplementation), and asserts the gate fails with a
// message that names the mutated page. A mutation that passes is a hole in the
// gate and fails this harness.
//
// The registry is deep-cloned per mutation, so nothing on disk is touched.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/mutate-authority-v4.mjs

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { auditAuthority, TWO_CLUSTER_EXCEPTIONS } from './validate-authority-v4.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const { SEO_PAGES } = await import(path.join(ROOT, 'lib/content/pages/index.ts'))
const { GROWTH_COHORTS } = await import(path.join(ROOT, 'lib/content/growth-cohorts.ts'))
const { classifyRoute } = await import(path.join(ROOT, 'lib/analytics/acquisition-clusters.ts'))
const { buildRouteSet } = await import(path.join(ROOT, 'lib/content/quality-metrics.ts'))

const ROUTES = buildRouteSet(ROOT)
const COHORTS = new Set(GROWTH_COHORTS.flatMap((c) => [...c.slugs]))
const clone = () => JSON.parse(JSON.stringify(SEO_PAGES))
const run = (pages, routes = ROUTES) => auditAuthority({ pages, routes, cohortSlugs: COHORTS, classifyRoute })
const find = (pages, slug) => pages.find((p) => p.slug === slug)

/** Strips every inbound contextual link to `slug` except those from `keep` clusters. */
function keepOnlyClusters(pages, slug, keep) {
  for (const p of pages) {
    if (keep.includes(classifyRoute(`/${p.slug}`).cluster)) continue
    p.internalLinks = (p.internalLinks ?? []).filter((l) => l.href.replace(/^\//, '').split('#')[0] !== slug)
  }
}

// A page that is NOT in the documented-exception list, so a drop to one cluster
// must fail rather than be excused.
const UNDOCUMENTED = 'nabor-svarecu'
if (TWO_CLUSTER_EXCEPTIONS[UNDOCUMENTED]) throw new Error(`fixture ${UNDOCUMENTED} is a documented exception — pick another`)

const MUTATIONS = [
  {
    name: '1. commercial page starved to a single source cluster (undocumented)',
    expect: /only 1 source cluster|closed same-cluster loop/,
    slug: UNDOCUMENTED,
    apply(pages) {
      keepOnlyClusters(pages, UNDOCUMENTED, ['technical_talent'])
    },
  },
  {
    name: '2. closed same-cluster loop — fed only by its own cluster',
    expect: /closed same-cluster loop/,
    slug: 'nabor-cnc-operatoru',
    apply(pages) {
      keepOnlyClusters(pages, 'nabor-cnc-operatoru', ['technical_talent'])
    },
  },
  {
    name: '3. commercial page with zero contextual inbound',
    expect: /only 0 source cluster/,
    slug: 'nabor-elektrikaru',
    apply(pages) {
      keepOnlyClusters(pages, 'nabor-elektrikaru', [])
    },
  },
  {
    name: '4. request path removed — no employer journey',
    expect: /no request path/,
    slug: 'fluktuace-zamestnancu',
    apply(pages) {
      const p = find(pages, 'fluktuace-zamestnancu')
      p.internalLinks = (p.internalLinks ?? []).filter((l) => !l.href.includes('poptavka-pracovniku'))
      if (p.cta?.href?.includes('poptavka-pracovniku')) p.cta.href = '/pro-zamestnavatele'
    },
  },
  {
    name: '5. growth-cohort page below the minimum unique inbound sources',
    expect: /growth-cohort page has \d+ unique inbound source/,
    slug: [...COHORTS][0],
    apply(pages) {
      const target = [...COHORTS][0]
      let kept = 0
      for (const p of pages) {
        p.internalLinks = (p.internalLinks ?? []).filter((l) => {
          if (l.href.replace(/^\//, '').split('#')[0] !== target) return true
          return kept++ < 1
        })
      }
    },
  },
  {
    name: '6. growth-cohort page launched without diversified inbound',
    expect: /growth-cohort page launched without diversified inbound|closed same-cluster loop/,
    slug: [...COHORTS].find((s) => classifyRoute(`/${s}`).cluster === 'technical_talent') ?? [...COHORTS][0],
    apply(pages) {
      const target = [...COHORTS].find((s) => classifyRoute(`/${s}`).cluster === 'technical_talent') ?? [...COHORTS][0]
      keepOnlyClusters(pages, target, [classifyRoute(`/${target}`).cluster])
    },
  },
  {
    name: '7. internal link to a non-existent route',
    expect: /link to non-existent route/,
    slug: 'nabor-svarecu',
    apply(pages) {
      find(pages, 'nabor-svarecu').internalLinks.push({ href: '/svarec-brno', label: 'Svářeči Brno' })
    },
  },
  {
    name: '8. page linking to itself',
    expect: /links to itself/,
    slug: 'nabor-cnc-operatoru',
    apply(pages) {
      find(pages, 'nabor-cnc-operatoru').internalLinks.push({ href: '/nabor-cnc-operatoru', label: 'CNC operátoři' })
    },
  },
  {
    name: '9. parameterized internal request link',
    expect: /parameterized internal link/,
    slug: 'fluktuace-zamestnancu',
    apply(pages) {
      find(pages, 'fluktuace-zamestnancu').internalLinks.push({
        href: '/poptavka-pracovniku?utm_source=fluktuace',
        label: 'Poptávka',
      })
    },
  },
  {
    name: '10. contextual link into the static .html layer',
    expect: /contextual link into the static layer/,
    slug: 'onboarding-zamestnancu',
    apply(pages) {
      find(pages, 'onboarding-zamestnancu').internalLinks.push({ href: '/index-cs.html', label: 'Úvod' })
    },
  },
]

// ── Control: the unmutated registry must pass ────────────────────────────────
const control = run(clone())
let failures = 0
console.log('Mutation tests — internal authority gate v4\n')
if (control.errors.length) {
  console.error(`  ✗ CONTROL: unmutated registry already fails (${control.errors.length}) — mutations prove nothing`)
  for (const e of control.errors.slice(0, 5)) console.error(`      ${e}`)
  failures++
} else {
  console.log('  ✓ control: unmutated registry passes')
}

// ── Each mutation must be caught ─────────────────────────────────────────────
for (const m of MUTATIONS) {
  const pages = clone()
  m.apply(pages)
  const { errors } = run(pages)
  const matched = errors.filter((e) => m.expect.test(e))
  const named = matched.some((e) => e.startsWith(`${m.slug}:`))
  if (matched.length && named) {
    console.log(`  ✓ ${m.name}`)
  } else if (matched.length) {
    console.error(`  ✗ ${m.name}\n      caught, but no message names ${m.slug}: ${matched[0]}`)
    failures++
  } else {
    console.error(`  ✗ ${m.name}\n      NOT CAUGHT — gate returned ${errors.length} error(s), none matching ${m.expect}`)
    failures++
  }
}

// ── 11. A documented exception must not become blanket immunity ──────────────
// Found in adversarial review: the first version of this gate excused ANY count
// below the minimum once a page appeared in TWO_CLUSTER_EXCEPTIONS, so a page
// documented as a genuine two-cluster page could silently degrade to one and
// still pass. The exception now declares the floor it is documented AT.
{
  const slug = 'proc-se-nedari-obsadit-odbornou-pozici'
  const pages = clone()
  keepOnlyClusters(pages, slug, ['technical_talent'])
  const { errors } = run(pages)
  const caught = errors.some((e) => e.startsWith(`${slug}:`) && /below the floor|closed same-cluster loop/.test(e))
  if (caught) console.log('  ✓ 11. documented two-cluster page degraded to one cluster (exception is not blanket immunity)')
  else {
    console.error(`  ✗ 11. documented two-cluster page degraded to one cluster — NOT CAUGHT`)
    failures++
  }
}

// ── Negative control: a documented two-cluster page at its floor must NOT fail ─
{
  const slug = Object.keys(TWO_CLUSTER_EXCEPTIONS)[0]
  const pages = clone()
  keepOnlyClusters(pages, slug, ['knowledge', 'technical_talent'])
  const { errors, review } = run(pages)
  const failed = errors.some((e) => e.startsWith(`${slug}:`) && /source cluster/.test(e))
  const reviewed = review.some((r) => r.startsWith(slug) && r.includes('documented'))
  if (!failed && reviewed) {
    console.log(`  ✓ negative control: documented two-cluster page ${slug} is REVIEWed, not failed`)
  } else {
    console.error(`  ✗ negative control: ${slug} failed=${failed} reviewed=${reviewed} — exceptions are not working`)
    failures++
  }
}

console.log(
  failures
    ? `\nMutation tests: FAIL — ${failures} of ${MUTATIONS.length + 2} checks did not behave as specified`
    : `\nMutation tests: PASS — ${MUTATIONS.length + 1} defects caught, control + negative control correct`,
)
process.exit(failures ? 1 : 0)
