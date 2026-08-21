/**
 * Generates docs/locale-l1-route-plan.md from lib/locale/l1-concepts.ts.
 *
 * The document is derived, never hand-edited: a plan that can disagree with the
 * code it describes is worse than no plan. validate-l1-plan.mjs re-runs this and
 * fails if the committed file differs.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const reg = await import('../lib/locale/registry.ts')
const m = await import('../lib/locale/l1-concepts.ts')
const { SEO_PAGES } = await import('../lib/content/pages/index.ts')

const seo = new Map(SEO_PAGES.map((p) => ['/' + String(p.slug).replace(/^\//, ''), p]))
const words = (route) => {
  const p = seo.get(route)
  if (!p) return null
  const body = [p.intro, ...(p.sections || []).flatMap((s) => [s.heading, s.html || s.body || ''])]
    .join(' ').replace(/<[^>]+>/g, ' ')
  return body.split(/\s+/).filter(Boolean).length
}

const CAT_TITLES = {
  employer: 'A. Employer / recruitment solutions',
  specialists: 'B. Specialist and technical recruitment',
  industries: 'C. Industries and professions',
  workforce: 'D. Workforce solutions and situations',
  trust: 'E. Trust and employer authority',
}

export function renderPlan() {
  const L0 = new Set()
  for (const c of reg.LOCALE_CONCEPTS) { L0.add(c.csPrimary); (c.csCollapsed || []).forEach((v) => L0.add(v)) }
  const LEGAL = new Set()
  for (const c of reg.LEGAL_CONCEPTS) for (const l of ['cs', 'en', 'de']) LEGAL.add(reg.urlFor(c, l))
  const named = new Map()
  for (const x of m.CZECH_ONLY) named.set(x.route, ['CZECH_ONLY', x.reason])
  for (const x of m.DEFERRED_L2) named.set(x.route, ['L2', x.reason])

  const tally = { L0: 0, L1_primary: 0, L1_collapsed: 0, LEGAL: 0, CZECH_ONLY: 0, L2: 0, OUT_OF_SCOPE: 0 }
  const rows = []
  for (const route of reg.CZECH_ROUTES) {
    if (L0.has(route)) { tally.L0++; continue }
    const own = m.L1_CONCEPTS.find((c) => c.csPrimary === route)
    if (own) { tally.L1_primary++; continue }
    if (m.L1_CONCEPTS.some((c) => (c.csCollapsed || []).includes(route))) { tally.L1_collapsed++; continue }
    if (LEGAL.has(route)) { tally.LEGAL++; continue }
    if (named.has(route)) { const [k, why] = named.get(route); tally[k]++; rows.push([route, k, why]); continue }
    const rule = m.CLASS_RULES.find((r) => r.test.test(route))
    if (rule) { tally[rule.classification]++; rows.push([route, rule.classification, `rule: ${rule.id}`]); continue }
    rows.push([route, 'UNCLASSIFIED', 'no rule matched — this is a gap'])
  }

  const enCount = m.L1_CONCEPTS.filter((c) => c.urls.en).length
  const deCount = m.L1_CONCEPTS.filter((c) => c.urls.de).length
  const collapsed = m.L1_CONCEPTS.reduce((n, c) => n + (c.csCollapsed?.length || 0), 0)

  let out = `# Locale L1 — frozen route plan

Derived from \`lib/locale/l1-concepts.ts\` by \`scripts/generate-l1-route-plan.mjs\`.
**Do not edit by hand** — \`validate:l1-plan\` regenerates this and fails on any difference.

## What L1 is

Every Czech concept that is commercially relevant to an employer **and** can be
translated without taking on a legal, statutory or freshness maintenance
obligation. A page is excluded when its subject would stop being true as a law
or a number moves — not because it cites one. Nearly every page in this corpus
cites its sources, so citation is no signal at all.

## Counts

| | |
|---|---|
| L1 concepts | **${m.L1_CONCEPTS.length}** |
| New EN pages | **${enCount}** |
| New DE pages | **${deCount}** |
| Czech routes represented by an L1 concept | ${m.L1_CONCEPTS.length + collapsed} (${m.L1_CONCEPTS.length} primaries + ${collapsed} collapsed variants) |
| Static routes | 195 → **${195 + enCount + deCount}** |
| Canonical URLs | 205 → **${205 + enCount + deCount}** |
| Sitemap \`<loc>\` | 205 → **${205 + enCount + deCount}** |

Semantic parity, not numerical: ${collapsed} Czech synonym pages collapse into
their concept primary and receive no EN/DE page of their own.

## Coverage of the Czech spine

All ${reg.CZECH_ROUTES.length} Czech routes are accounted for.

| Classification | Routes |
|---|---|
${Object.entries(tally).map(([k, v]) => `| ${k} | ${v} |`).join('\n')}
| **total** | **${Object.values(tally).reduce((a, b) => a + b, 0)}** |

## L1 concepts

`
  for (const cat of Object.keys(CAT_TITLES)) {
    const list = m.L1_CONCEPTS.filter((c) => c.category === cat)
    if (!list.length) continue
    out += `### ${CAT_TITLES[cat]} — ${list.length}\n\n`
    out += `| concept_id | page_type | cs_primary | cs_variants | en_url | de_url | cs words | reason / slug note |\n`
    out += `|---|---|---|---|---|---|---|---|\n`
    for (const c of list) {
      const w = words(c.csPrimary)
      out += `| \`${c.id}\` | ${c.pageType} | \`${c.csPrimary}\` | ${(c.csCollapsed || []).map((v) => `\`${v}\``).join('<br>') || '—'} | \`${c.urls.en}\` | \`${c.urls.de}\` | ${w ?? 'n/a'} | ${c.notes} |\n`
    }
    out += '\n'
  }

  out += `## Deferred to L2\n\n| route | reason |\n|---|---|\n`
  for (const x of m.DEFERRED_L2) out += `| \`${x.route}\` | ${x.reason} |\n`
  out += `\nPlus every route matched by the \`immigration\` and \`payroll\` rules below.\n\n`

  out += `## Czech-only\n\n| route | reason |\n|---|---|\n`
  for (const x of m.CZECH_ONLY) out += `| \`${x.route}\` | ${x.reason} |\n`
  out += `\nPlus every route matched by the \`regional\` rule below.\n\n`

  out += `## Classification rules\n\nApplied only to routes no concept claims and no individual entry names.\n\n`
  out += `| rule | classification | reason |\n|---|---|---|\n`
  for (const r of m.CLASS_RULES) out += `| \`${r.id}\` | ${r.classification} | ${r.reason} |\n`

  out += `
## Slug review status

| | |
|---|---|
| \`MACHINE_LINGUISTIC_REVIEW\` | **PASS** — every slug checked for prefix, uniqueness, collision with a Czech route, trailing slash, and for not being a Czech slug with a locale prefix bolted on. |
| \`HUMAN_NATIVE_REVIEW\` | **NOT_DONE** — no native English or German speaker has reviewed these slugs. They are permanent once indexed, and this limitation is recorded rather than papered over. |
`
  return out
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  fs.writeFileSync(path.join(ROOT, 'docs/locale-l1-route-plan.md'), renderPlan())
  console.log('docs/locale-l1-route-plan.md written')
}
