// Controlled content-growth gate (READ-ONLY).
//
// The site previously sat in "Discovered – currently not indexed", so every
// batch of new URLs has to earn its place. This validator holds each declared
// cohort in lib/content/growth-cohorts.ts to a standard STRICTER than the
// site-wide gates: more inbound contextual links, more depth, tighter
// duplication limits, and a hard ban on the claim classes that would make a
// page untrustworthy.
//
// It runs entirely offline against the REAL page objects (imported through
// scripts/ts-resolve.mjs, so withConversionPath injection is included) plus the
// filesystem — no server needed. scripts/validate-authority.js remains the gate
// for the rendered crawl; this one catches problems before a build exists.
//
// Fails on:
//   - a cohort page with no registry entry, no route file, or missing from the sitemap
//   - an orphan or near-orphan cohort page (inbound contextual links below the cohort floor)
//   - a cohort page not reachable from its hub (or '/') within the cohort's hop budget
//   - a duplicate canonical, title, description, H1/intro or hero subtitle
//   - a thin cohort page (below the cohort word floor)
//   - two cohort pages that are materially similar (template-swap guard)
//   - a parameterized internal link, a link to a redirect/.html, or a self-link
//   - a cohort page with no path to the staffing request form
//   - prohibited unsupported claims anywhere in user-facing content
//   - accidental backend introduction (Supabase, /api routes, lead storage, marketingConsent)
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/validate-growth.mjs
//      (npm run validate:growth)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

const { SEO_PAGES } = await import(path.join(ROOT, 'lib/content/pages/index.ts'))
const { GROWTH_COHORTS } = await import(path.join(ROOT, 'lib/content/growth-cohorts.ts'))
const { normalise, similarity, wordCount, buildRouteSet } = await import(
  path.join(ROOT, 'lib/content/quality-metrics.ts')
)

const errors = []
const notes = []
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8')
const exists = (p) => fs.existsSync(path.join(ROOT, p))

const bySlug = new Map(SEO_PAGES.map((p) => [p.slug, p]))
const ROUTES = buildRouteSet(ROOT)
const SITEMAP = exists('public/sitemap.xml') ? read('public/sitemap.xml') : ''

// ── Chrome vs contextual ────────────────────────────────────────────────────
// Header/Footer links are site-wide chrome: they prove a page is crawlable but
// say nothing about topical relevance, which is what the authority gate
// measures. Links from the homepage body and from the employer-hub situation
// cards ARE contextual, so they count here — mirroring scripts/authority-graph.js.
const CHROME_FILES = ['components/Header.tsx', 'components/Footer.tsx']
const CONTEXTUAL_COMPONENT_FILES = [
  'pages/index.tsx',
  'components/EmployerSituations.tsx',
  'components/EmployerCta.tsx',
  'components/HomeAgencyValue.tsx',
]

const hrefsIn = (file) => {
  if (!exists(file)) return []
  const src = read(file)
  return [...src.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1])
}

const chromeTargets = new Set(CHROME_FILES.flatMap(hrefsIn).map((h) => h.replace(/^\//, '')))

/** slug -> Set of pages/components that link to it contextually. */
const inboundContextual = new Map()
const addInbound = (targetSlug, from) => {
  if (!inboundContextual.has(targetSlug)) inboundContextual.set(targetSlug, new Set())
  inboundContextual.get(targetSlug).add(from)
}

for (const p of SEO_PAGES) {
  for (const l of p.internalLinks ?? []) {
    const t = l.href.replace(/^\//, '').split('#')[0].split('?')[0]
    if (t && t !== p.slug) addInbound(t, p.slug)
  }
}
for (const f of CONTEXTUAL_COMPONENT_FILES) {
  for (const h of hrefsIn(f)) {
    const t = h.replace(/^\//, '').split('#')[0].split('?')[0]
    if (t) addInbound(t, f)
  }
}

// ── Contextual hop distance from a set of roots ─────────────────────────────
const outEdges = new Map()
for (const p of SEO_PAGES) {
  outEdges.set(
    p.slug,
    (p.internalLinks ?? [])
      .map((l) => l.href.replace(/^\//, '').split('#')[0].split('?')[0])
      .filter((t) => t && t !== p.slug),
  )
}
// The homepage body and the hub's situation cards are real contextual sources.
outEdges.set('', hrefsIn('pages/index.tsx').map((h) => h.replace(/^\//, '').split('#')[0].split('?')[0]))
const hubExtra = hrefsIn('components/EmployerSituations.tsx').map((h) =>
  h.replace(/^\//, '').split('#')[0].split('?')[0],
)

function hopsFrom(roots, extraFromHub) {
  const dist = new Map()
  const q = []
  for (const r of roots) {
    dist.set(r, 0)
    q.push(r)
  }
  while (q.length) {
    const cur = q.shift()
    const outs = [...(outEdges.get(cur) ?? [])]
    if (extraFromHub && cur === extraFromHub.slug) outs.push(...extraFromHub.links)
    for (const t of outs) {
      if (!dist.has(t)) {
        dist.set(t, dist.get(cur) + 1)
        q.push(t)
      }
    }
  }
  return dist
}

// ── Prohibited claim classes ────────────────────────────────────────────────
// Deliberately broader than the Czech editorial gate: that gate scans the Czech
// content registries only, which is how the fabricated claims in
// public/script.js ("databáze více než 50 000 profilů", "Záruka bezplatné
// náhrady na 90 dní", "Dostupní do 24–72 hodin") stayed live in three languages
// while every server-rendered gate passed. These patterns are checked across
// every user-facing surface, in Czech, English and German.
const PROHIBITED = [
  { re: /datab[áa]z[ei][^.]{0,40}\b\d[\d\s.,]{2,}\s*(profil|kandid|životopis)/iu, label: 'candidate-database size claim' },
  { re: /database of\s*\d[\d\s.,]*\+?\s*(profiles|candidates|CVs)/iu, label: 'candidate-database size claim (EN)' },
  { re: /Datenbank[^.]{0,40}\b\d[\d\s.,]{2,}\s*(Profile|Kandidat)/iu, label: 'candidate-database size claim (DE)' },
  { re: /\b\d{1,3}\s*[-–]\s*\d{1,3}\s*(hodin|hodinách|hours|Stunden)\b/iu, label: 'promised availability window' },
  // Czech puts the number INSIDE the adjective ("90denní záruka"), and the
  // guarantee word can come either side of it. The first version of this
  // pattern required "záruka" before a bare numeral followed by "dní", so it
  // matched the English and German terms files and silently missed the Czech
  // one — on the site's primary market. Both orders and both forms now match.
  // NOTE: no \b after a Czech suffix. JavaScript's \b is ASCII-only even under
  // the /u flag, so "denní " has no word boundary after "í" and a \b there
  // silently never matches — which is precisely how the first version of this
  // rule passed over "90denní záruka bezplatné náhrady".
  { re: /(záruk\w*|záruč\w*|garanc\w*)[^.]{0,40}\d{1,3}\s*(denn[íi]|dn[íůi])/iu, label: 'replacement guarantee (CS, guarantee-first)' },
  { re: /\d{1,3}\s*[-–]?\s*(denn[íi]|dn[íůi])[^.]{0,40}(záruk\w*|záruč\w*|garanc\w*)/iu, label: 'replacement guarantee (CS, number-first)' },
  { re: /\b\d{1,3}[-\s]?(day|Tage|tägig\w*)\s*(free\s*)?(replacement\s*)?(guarantee|Garantie|Ersatzgarantie)/iu, label: 'replacement guarantee (EN/DE)' },
  // RPO / process outsourcing: advertised in the contact form and the terms,
  // described by no page. Missing from the first version of this list entirely.
  { re: /\bRPO\b|recruitment process outsourcing|outsourcing náborového procesu/iu, label: 'unevidenced RPO delivery' },
  // A permit claim stated as verified fact. /o-nas deliberately withholds this
  // until it is checked against the official register, so any surface asserting
  // it — including the terms of business — contradicts the site's own position.
  { re: /disponuje povolením|holds a licence for employment mediation|verfügt über eine Erlaubnis/iu, label: 'permit claim stated as verified fact' },
  { re: /\b(kandid[áa]t\w*|candidates?)\b[^.]{0,30}\bdo\s*\d{1,3}\s*(hodin|dn[íůi])/iu, label: 'promised time-to-hire' },
  { re: /\b(úspěšných umístění|successful placements|erfolgreiche vermittlungen)\b/iu, label: 'placement-count label' },
  { re: /\b(100\s*%\s*(úspěch|obsazení|success))\b/iu, label: 'success-rate claim' },
  { re: /\[(jméno klienta|client name|kundenname|position|firma|company|unternehmen)\]/iu, label: 'testimonial placeholder' },
  { re: /★{3,}/u, label: 'hard-coded star rating' },
  { re: /\b(executive search|c-level|headhunting)\b/iu, label: 'unevidenced executive-search capability' },
]

const USER_FACING = []
const walkDir = (dir, filter) => {
  if (!exists(dir)) return
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) walkDir(rel, filter)
    else if (filter(e.name)) USER_FACING.push(rel)
  }
}
// Files whose PURPOSE is to declare banned phrases would otherwise trip every
// pattern below by quoting the very claims they forbid.
const CLAIM_DECLARATION_FILES = new Set(['lib/content/tone.ts', 'lib/content/czech-terms.ts'])

walkDir('pages', (n) => n.endsWith('.tsx'))
walkDir('components', (n) => n.endsWith('.tsx'))
walkDir('lib/content', (n) => n.endsWith('.ts') && !n.endsWith('.test.ts'))
walkDir('lib/employer-request', (n) => n.endsWith('.ts') && !n.endsWith('.test.ts'))
USER_FACING.push('public/script.js')

for (const f of USER_FACING) {
  if (!exists(f) || CLAIM_DECLARATION_FILES.has(f)) continue
  // Strip comments so a comment explaining a retired claim is not read as the claim.
  const src = read(f)
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
  for (const { re, label } of PROHIBITED) {
    const m = src.match(re)
    if (m) errors.push(`${f}: prohibited ${label} — "${m[0].trim().slice(0, 80)}"`)
  }
}

// ── Static legal/blog HTML: reported, never auto-failed ─────────────────────
//
// public/terms*.html and the legacy blog post still offer Executive Search,
// C-level recruitment, RPO and a 90-day replacement guarantee. Those are the
// same claim classes the gate blocks everywhere else, but they sit in a
// CONTRACTUAL document: editing the terms of business changes what the company
// has undertaken to deliver, which is an owner decision with legal weight, not
// something a content release should quietly rewrite. So this surfaces the
// inconsistency on every run — the marketing layer no longer advertises these
// services while the terms still promise them — and leaves the decision to a
// human. Escalate to `errors` once the owner has settled the service scope.
const staticFiles = []
const collectStatic = (dir) => {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) collectStatic(rel)
    else if (e.name.endsWith('.html')) staticFiles.push(rel)
  }
}
collectStatic('public')
for (const f of staticFiles) {
  const src = read(f)
  for (const { re, label } of PROHIBITED) {
    const m = src.match(re)
    if (m) notes.push(`OWNER DECISION — ${f}: ${label} — "${m[0].trim().slice(0, 70)}"`)
  }
}

// ── Backend guard ───────────────────────────────────────────────────────────
// The approved architecture is mailto-first with no backend. These checks exist
// so a future change cannot quietly reintroduce one.
if (exists('pages/api')) errors.push('pages/api exists — the request flow must stay mailto-first with no backend')
const BACKEND_PATTERNS = [
  { re: /@supabase\/|supabase\s*\.|createClient\s*\(/i, label: 'Supabase client' },
  { re: /\/api\/leads/i, label: '/api/leads endpoint' },
  { re: /marketingConsent/i, label: 'marketingConsent field' },
]
for (const f of USER_FACING) {
  if (!exists(f)) continue
  const src = read(f)
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/.*$/gm, '$1')
  for (const { re, label } of BACKEND_PATTERNS) {
    if (re.test(src)) errors.push(`${f}: ${label} reintroduced — the approved architecture has no backend`)
  }
}
if (exists('package.json')) {
  const pkg = JSON.parse(read('package.json'))
  const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) }
  for (const d of Object.keys(deps)) {
    if (/supabase|prisma|drizzle|mongoose/i.test(d)) errors.push(`package.json: backend dependency "${d}"`)
  }
}

// ── Corpus-wide uniqueness (titles are the H1 for every SeoArticle page) ────
for (const key of ['title', 'description', 'intro', 'heroSubtitle']) {
  const seen = new Map()
  for (const p of SEO_PAGES) {
    const k = normalise(p[key] ?? '')
    seen.set(k, [...(seen.get(k) ?? []), p.slug])
  }
  for (const [, slugs] of seen) {
    if (slugs.length > 1) errors.push(`duplicate ${key}: ${slugs.join(' == ')}`)
  }
}
const slugCounts = new Map()
for (const p of SEO_PAGES) slugCounts.set(p.slug, (slugCounts.get(p.slug) ?? 0) + 1)
for (const [slug, n] of slugCounts) {
  if (n > 1) errors.push(`duplicate canonical: /${slug} declared ${n}×`)
}

// ── Per-cohort checks ───────────────────────────────────────────────────────
const summary = []
for (const cohort of GROWTH_COHORTS) {
  const pages = []
  for (const slug of cohort.slugs) {
    const p = bySlug.get(slug)
    if (!p) {
      errors.push(`${cohort.id}: /${slug} is declared in the cohort but has no registry entry`)
      continue
    }
    if (!exists(`pages/${slug}.tsx`)) errors.push(`${cohort.id}: /${slug} has no route file pages/${slug}.tsx`)
    if (SITEMAP && !SITEMAP.includes(`/${slug}<`)) errors.push(`${cohort.id}: /${slug} is missing from public/sitemap.xml`)
    pages.push(p)
  }

  const hubSlug = cohort.hub.replace(/^\//, '')
  const dist = hopsFrom(['', hubSlug], { slug: hubSlug, links: hubExtra })

  for (const p of pages) {
    const inbound = inboundContextual.get(p.slug) ?? new Set()
    if (inbound.size === 0) {
      errors.push(`${cohort.id}: /${p.slug} is an ORPHAN (no contextual inbound link)`)
    } else if (inbound.size < cohort.minInboundContextual) {
      errors.push(
        `${cohort.id}: /${p.slug} is a NEAR-ORPHAN (${inbound.size} contextual inbound, cohort floor ${cohort.minInboundContextual})`,
      )
    }

    const d = dist.get(p.slug)
    if (d == null) {
      errors.push(`${cohort.id}: /${p.slug} is not contextually reachable from ${cohort.hub} or /`)
    } else if (d > cohort.maxHops) {
      errors.push(`${cohort.id}: /${p.slug} sits ${d} hops from the hub (budget ${cohort.maxHops})`)
    }

    const w = wordCount(p)
    if (w < cohort.minWords) {
      errors.push(`${cohort.id}: /${p.slug} is THIN (${w} words, cohort floor ${cohort.minWords})`)
    }

    const links = [...(p.internalLinks ?? []).map((l) => l.href), p.cta?.href ?? '']
    if (!links.some((h) => h.includes('poptavka-pracovniku'))) {
      errors.push(`${cohort.id}: /${p.slug} has no path to the staffing request form`)
    }
    for (const l of p.internalLinks ?? []) {
      if (l.href.includes('?')) errors.push(`${cohort.id}: /${p.slug} emits a parameterized internal link (${l.href})`)
      if (/\.html($|#)/.test(l.href)) errors.push(`${cohort.id}: /${p.slug} links to a static .html route (${l.href})`)
      const t = l.href.replace(/^\//, '').split('#')[0].split('?')[0]
      if (t === p.slug) errors.push(`${cohort.id}: /${p.slug} links to itself`)
      if (!ROUTES.has(t)) errors.push(`${cohort.id}: /${p.slug} links to a non-existent route (${l.href})`)
      if (!l.label || l.label.trim().length < 4) {
        errors.push(`${cohort.id}: /${p.slug} uses a non-descriptive anchor for ${l.href}`)
      }
    }
    if (chromeTargets.has(p.slug) && inbound.size < cohort.minInboundContextual) {
      notes.push(`/${p.slug} is in site chrome but still needs contextual inbound links`)
    }
  }

  // Template-swap guard, stricter than the corpus gate (0.80 intro / 0.90 body).
  const bodyOf = (p) =>
    p.sections.map((s) => `${s.heading} ${s.body.join(' ')} ${(s.bullets ?? []).join(' ')}`).join(' ')
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const si = similarity(pages[i].intro, pages[j].intro)
      if (si >= 0.7) errors.push(`${cohort.id}: intros too similar — /${pages[i].slug} ~ /${pages[j].slug} (${si.toFixed(2)})`)
      const sb = similarity(bodyOf(pages[i]), bodyOf(pages[j]))
      if (sb >= 0.85) errors.push(`${cohort.id}: bodies too similar — /${pages[i].slug} ~ /${pages[j].slug} (${sb.toFixed(2)})`)
    }
  }
  // And against the whole existing corpus, at the corpus threshold.
  const cohortSet = new Set(cohort.slugs)
  for (const p of pages) {
    for (const q of SEO_PAGES) {
      if (cohortSet.has(q.slug)) continue
      const si = similarity(p.intro, q.intro)
      if (si >= 0.8) errors.push(`${cohort.id}: /${p.slug} intro duplicates existing /${q.slug} (${si.toFixed(2)})`)
      const sb = similarity(bodyOf(p), bodyOf(q))
      if (sb >= 0.9) errors.push(`${cohort.id}: /${p.slug} body duplicates existing /${q.slug} (${sb.toFixed(2)})`)
    }
  }

  const inboundCounts = pages.map((p) => (inboundContextual.get(p.slug) ?? new Set()).size).sort((a, b) => a - b)
  const words = pages.map(wordCount).sort((a, b) => a - b)
  const median = (a) => (a.length ? (a.length % 2 ? a[(a.length - 1) / 2] : Math.round((a[a.length / 2 - 1] + a[a.length / 2]) / 2)) : 0)
  summary.push({
    id: cohort.id,
    declared: cohort.slugs.length,
    present: pages.length,
    minInbound: inboundCounts[0] ?? 0,
    medianInbound: median(inboundCounts),
    avgInbound: inboundCounts.length ? (inboundCounts.reduce((a, b) => a + b, 0) / inboundCounts.length).toFixed(1) : '0',
    minWords: words[0] ?? 0,
    medianWords: median(words),
    // A cohort may legitimately declare zero pages — Wave 4 published no URLs
    // and exists to record why. Math.max of an empty list is -Infinity, which
    // reads as a broken measurement rather than an empty one.
    maxHops: pages.length ? Math.max(...pages.map((p) => dist.get(p.slug) ?? 99)) : 'n/a (no pages)',
    rejected: cohort.rejected.length,
  })
}

// ── Report ──────────────────────────────────────────────────────────────────
console.log('Content-growth gate')
console.log(`  corpus: ${SEO_PAGES.length} registry pages | ${ROUTES.size} routable paths`)
for (const s of summary) {
  console.log(`  cohort ${s.id}:`)
  console.log(`    pages ${s.present}/${s.declared} | rejected/deferred recorded ${s.rejected}`)
  console.log(`    contextual inbound  min ${s.minInbound} | median ${s.medianInbound} | avg ${s.avgInbound}`)
  console.log(`    body words          min ${s.minWords} | median ${s.medianWords}`)
  console.log(`    max hops from hub   ${s.maxHops}`)
}
if (notes.length) {
  console.log('  notes:')
  for (const n of notes) console.log(`    · ${n}`)
}

if (errors.length) {
  console.error(`\nContent-growth gate: FAIL (${errors.length})`)
  for (const e of errors) console.error(`  ✗ ${e}`)
  process.exit(1)
}
console.log('\nContent-growth gate: PASS')
