# Growth program plan — TalentPartnerID

**Program:** Google indexing recovery + Czech employer authority + Trust / E-E-A-T + B2B conversion system.
**Delivery model:** four reviewable batches (A → B → C → D). Each batch = one feature branch, one PR, one deployment, then **stop for owner review**. No batch starts automatically; no PR auto-merges.

This plan covers all four batches. **Only Batch A is implemented in this branch**
(`feat/indexing-recovery-authority-graph`). Batches B/C/D are specified here for
review and are **not** built yet.

---

## 0. Guardrails (apply to every batch)

**Content honesty (hard rules).** Do not fabricate clients, testimonials, case
studies, ratings, worker/employer counts, vacancies, contracts, savings, response
times, conversion rates, market share, licences, permit numbers, office locations,
or specialist credentials. No doorway pages. No page-per-keyword-variation. No new
city pages purely for geographic SEO. No "top / best / leading" without cited
evidence. TNT agency s.r.o. is the licensed §14 agency in the ecosystem;
TalentPartnerID content must not imply a licence it does not hold.

**Technical invariants (preserve).** Next.js Pages Router on Netlify; Czech SSR
default with cs/en/de switching; self-referential canonicals to `.html`; correct
sitemap; legal pages; WebmasterID; Seznam verification; mailto-first request flow.
No backend / Supabase / auth / localized routes / hreflang introduced.

**Measurement discipline.** Every report distinguishes: technical crawlability →
internal discovery → search-engine crawl → indexing → ranking. Indexing/ranking
claims require owner Search Console / Seznam evidence and are never inferred from
sitemap membership.

---

## 1. Repository snapshot (as inspected)

- **155 canonical routes** (crawled), 154 in the sitemap; `output: export` removed,
  served through `@netlify/plugin-nextjs`; `public/` at web root.
- **Tier 1 registry** (`lib/content/tier1-registry.ts`, 13 routes + `/o-nas`) is the
  canonical source of the strongest employer pages.
- **Content model** in `lib/content/pages/*.ts` (SeoPage objects) rendered through
  `components/SeoArticle.tsx` (supports a `topSlot`); the employer hub
  `/pro-zamestnavatele` renders `components/EmployerSituations.tsx` in that slot.
- **Request flow** is mailto-first via `/poptavka-pracovniku`, with the surface hint
  carried by `data-request-source` (session capture) — never a query parameter.
- **Existing validators** (`npm run validate:*`): i18n, sitemap, seo, czech,
  czech-default, trust, tier1, legal, plus `security` and `verify:seznam`.
- **Netlify Asset Optimization / Pretty URLs** rewrites deployed HTML (minifies,
  strips `.html` from internal links). Pages stay reachable and canonical to
  `.html`. **Not modified in Batch A** (see A8).

---

## 2. Batch A — Google indexing recovery (crawl & internal-authority recovery) — **DELIVERED**

**Objective:** not to create more URLs, but to make the strongest existing canonical
pages easier to discover and interconnect, and to lock that in with a gate.

| Sub-task | Delivered |
|---|---|
| A1 Search-coverage baseline | `reports/search-coverage-baseline.{md,json}` — per-route tier, sitemap, HTTP, contextual inbound, click depth, word count, coverage status (**unknown** without owner GSC/Seznam export) + owner-action import list. |
| A2 Internal-authority graph | `scripts/authority-graph.js` → `reports/internal-authority-graph.{json,md}`. Region-aware link classification (chrome / breadcrumb / contextual / banner), inbound (all + contextual), unique sources, BFS click depth from homepage and hub, diagnostic authority score (explicitly **not** PageRank). |
| A3 4-tier classification | Tier 1 from the registry; Tier 2/3 by content family; Tier 4 legal/utility. |
| A4 Strengthen entry points | Employer hub regional entry point (see A6). |
| A5 Topical hub architecture | Region/city families connected through the homepage-reachable employer hub. |
| A6 Near-orphan recovery | Regional block on `/pro-zamestnavatele`: **Tier 1–3 near-orphans 24 → 0**; flagship Tier 1 `/trh-prace-stredocesky-kraj` contextual depth 4 → 3. Zero new URLs. |
| A7 Consolidation review | `reports/content-consolidation.md` §9 re-review — no consolidation/deletion performed; near-duplicate region families unchanged and still an owner decision. |
| A8 Crawl efficiency | Netlify Pretty URLs **measured, not disabled** — pages remain reachable and canonical to `.html`; no production SEO defect proven, so no change (per instruction). |
| A9 Raw-HTML discovery quality | Anchor-text quality folded into the crawl: **0** non-descriptive/empty contextual anchors sitewide. |
| A10 Dashboard | `reports/indexing-recovery-dashboard.md` — repository monitoring snapshot; Google/Seznam rows read **"unknown — export required"** until owner data is supplied. |

**Gate:** `scripts/validate-authority.js` (`npm run validate:authority`) fails on any
orphan, any Tier 1–3 near-orphan, a Tier 1 page without contextual inbound / deeper
than depth 3, links to redirects, parameterized internal links, or non-descriptive
Tier 1–3 contextual anchors. Currently **PASS** (4 Tier 4 legal pages are
footer-discoverable warnings only).

**Honesty boundary:** Batch A improves technical crawlability and internal discovery
only. It does **not** claim to have eliminated "Discovered – currently not indexed";
that determination needs current Search Console evidence, listed as an owner action
in the coverage baseline.

**Owner actions to close the loop:** supply GSC coverage + performance exports,
Seznam Webmaster indexed pages, and WebmasterID sessions (paths in the baseline);
after production verification, submit the sitemap once.

---

## 3. Batch B — Czech employer authority (topical depth) — *planned*

**Objective:** deepen genuine topical authority on the employer decisions the site
already serves, so the Tier 1 hubs are supported by substantive, non-duplicative
Czech content — without inflating the URL count.

**Proposed scope (subject to approval):**

1. **Tier 1 hub enrichment, not new slugs.** Expand the existing strongest pages
   (`/pro-zamestnavatele`, `/nabor-zahranicnich-pracovniku`, cost + labour-market
   flagships) with sourced, decision-oriented sections (legal basis, process,
   what to prepare), each citing primary Czech sources (MPSV, Úřad práce, Zákoník
   práce, zákon o zaměstnanosti). No claims beyond what the source supports.
2. **Entity consistency.** Align JSON-LD `EmploymentAgency` / `Organization` and
   on-page facts (name, address, contact) across hubs; make the TNT agency §14
   licence relationship explicit and correctly attributed (TNT holds the licence,
   not TalentPartnerID).
3. **Editorial internal linking.** Add descriptive contextual links from enriched
   hubs to supporting guides (reusing the A2 graph to target under-supported Tier 1/2
   pages), keeping anchor text descriptive (A9 gate stays green).
4. **Honest region strategy.** Resolve the §4 near-duplicate region families per the
   owner's Option A/B/C decision — either differentiate with real regional data or
   consolidate; **no** name-swap expansion.

**Validators added:** `validate:authority-content` (source-citation presence on Tier 1
sections, no forbidden superlatives), extend `validate:trust` for entity/licence
wording. **Explicitly not** in scope: fabricated stats, new city pages, keyword-variant pages.

---

## 4. Batch C — Trust / E-E-A-T — *planned*

**Objective:** make experience, expertise, authoritativeness and trust legible to
users and crawlers using **only verifiable** signals.

**Proposed scope (subject to approval):**

1. **Operator identity & authorship.** Clear operator/legal identity, contact, and
   (where a real named author/reviewer exists) `author` / `reviewedBy` metadata —
   never invented credentials.
2. **Sourcing & transparency.** A visible "sources / last reviewed" convention on
   guidance pages, backed by the citations added in Batch B; a methodology / editorial-
   policy page describing how content is produced and what the site does *not* claim.
3. **Trust surfaces.** Legal/compliance pages (already present) linked into an
   E-E-A-T footer cluster; explicit statement of the TNT §14 licence relationship;
   privacy/WebmasterID transparency.
4. **Structured data (truthful only).** `Organization`, `WebSite`,
   `BreadcrumbList`, and `FAQPage`/`HowTo` **only** where the on-page content
   literally matches — no review/aggregateRating markup (no genuine ratings exist).

**Validators added:** `validate:eeat` (author/reviewer/source blocks are real, no
`aggregateRating`/`review` schema, no fabricated credentials), extend
`validate:trust`. **Explicitly not** in scope: fake testimonials, star ratings,
counts, or awards.

---

## 5. Batch D — B2B conversion system — *planned*

**Objective:** raise qualified-request conversion within the existing mailto-first,
no-backend architecture — improving clarity and pre-qualification, not adding
tracking or a database.

**Proposed scope (subject to approval):**

1. **Request-path clarity.** Tighten `/poptavka-pracovniku` and hub CTAs: a concise,
   honest "what to include" checklist (profession, count, location, shift model,
   timing, requirements, budget) so the mailto body is pre-structured; keep
   `data-request-source` session hints (no query params).
2. **Decision aids.** Surface the existing calculator/comparison
   (`/kalkulacka-mzdy-agenturniho-zamestnance`) at the right decision points from the
   A2 graph, with descriptive anchors.
3. **Objection handling (honest).** Short, sourced answers to real buyer questions
   (agency vs. direct hire, cost structure, foreign-worker legality) — reusing
   Batch B citations; no invented savings/response-time promises.
4. **Measurement (privacy-first).** Rely on WebmasterID session capture already in
   place; report request-surface distribution from `data-request-source`. No new
   trackers, no PII beyond what the mailto flow already carries.

**Validators added:** `validate:conversion` (every CTA resolves to a canonical route,
mailto flow intact, no query-param request links, no new tracker/backend calls).
**Explicitly not** in scope: backend, forms that POST, auth, Supabase, fabricated
conversion metrics.

---

## 6. Cross-batch definition of done

Per batch: `git diff --check`, lint, typecheck, `vitest`, `next build`, all
`validate:*` (incl. `validate:authority` with `BASE`), `security`, `verify:seznam`
green; Playwright/browser QA on the hub + Tier 1 pages across 5 breakpoints; coherent
commits; one PR (base `main`); **stop for owner review**; no auto-merge; no broad
IndexNow for internal-link-only changes before production verification. Every batch
report keeps the crawlability → discovery → crawl → indexing → ranking distinction
and lists the owner data still required.
