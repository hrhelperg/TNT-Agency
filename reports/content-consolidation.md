# Content differentiation & consolidation review — TalentPartnerID

Companion to `reports/google-indexability.json` / `.md` (the raw crawl audit).
This document covers route classification (audit Section 3), the content-quality
and near-duplication findings (Sections 11–12), consolidation safety (Section 21)
and legitimate external discovery (Section 22).

Generated from a local production crawl of all 154 canonical routes plus a direct
read of the content model. **No page was deleted or redirected on content grounds
in this branch** — see "Owner decision required" below.

---

## 1. Headline: the site is technically healthy; the risk is near-duplication

The crawl found **0** non-200 routes, **0** redirects among canonical routes,
**0** non-self-canonical indexable pages, **0** thin pages (<600 chars), **0**
orphans (after this branch's fixes) and **0** parameterized internal links (after
this branch's fixes). The classic drivers of "Discovered – currently not indexed"
that this branch removed were: a search-template URL, 208 `?source=` parameter
links diluting crawl budget, a duplicate English privacy page, and 4 orphaned
legal pages.

The **remaining** indexing risk is genuine near-duplication, and it is confined
to exactly **two region families** — no city, industry or foreign-worker page
appears in the high-similarity set.

## 2. Near-duplicate clusters (Jaccard ≥ 0.6 on server text)

All 51 high-similarity pairs fall inside these two families (13 regions each):

| Family | Pattern | Pairwise similarity | Count |
|---|---|---|---|
| Employer cost by region | `naklady-na-zamestnance-<region>` | 0.69 – 0.75 | 13 |
| Labour market by region | `trh-prace-<region>` | 0.65 – 0.72 | 13 |

### Why they are similar (verified from `lib/content/pages/regions.ts`)

These are **not** name-swap doorway pages, and they are scrupulously honest:

- Each region carries a **hand-written `RegionProfile`** of real qualitative
  facts — commuting catchment, sector mix, border/university/industry character,
  the roles actually staffed there — with **no invented numbers, rates, shortage
  counts, salaries or rankings**. All quantitative claims are explicitly deferred
  to ČSÚ and Úřad práce ČR.
- Two deterministic builders weave those facts into the intro, a dedicated
  "Dostupnost pracovníků `<region>`" section, the regional-context paragraph and
  the FAQ, with light A/B variation (`i % 2`) to avoid verbatim text.

The similarity comes from the **~70 % of each page that is national boilerplate**
by necessity: payroll-contribution mechanics, agency-employment rules, OSH,
"verify current rates with ČSSZ/ČSÚ". Those rules are genuinely identical in every
region, so the honest ~30 % of regional signal is diluted across 26 near-sibling
URLs. That dilution — not a technical fault and not fabrication — is the plausible
reason Google discovers but defers indexing them.

## 3. Route classification (audit Section 3)

| Class | Meaning | Routes |
|---|---|---|
| **A — Primary indexable** | Unique, useful | Homepage, `/poptavka-pracovniku`, employer hub `/pro-zamestnavatele`, calculator, comparison, all city (`agentura-prace-*`, `nabor-zamestnancu-*`, `pracovnici-*`, `prace-pro-cizince-*`), all industry (`pracovnici-do-*`, `*-pracovnici`, `operatori-vyroby`, …), all foreign-worker (`prace-pro-*-v-cr`, `nabor-zahranicnich-*`), all compliance/legal-guide, editorial, and the EN/CS/DE legal documents. ~128 routes. **Keep.** |
| **B — Consolidation candidate** | Substantially overlapping | The 26 region pages (`naklady-na-zamestnance-<region>`, `trh-prace-<region>`). **Owner decision — see §4.** |
| **C — Legacy duplicate** | Redirect to canonical | `/privacy.html` → `/privacy-policy` (**done** this branch: file removed, 301 added, dropped from sitemap). |
| **D — Utility / verification** | Reachable, not in sitemap | `robots.txt`, `sitemap.xml`, Seznam file, IndexNow key file, `/assets/*`, `favicon.svg`. Correctly excluded from the sitemap. |
| **E — Invalid / accidental** | Should not be discovered | `/?s={search_term_string}` (**source removed** this branch); `/poptavka-pracovniku?source=*` and `?mode=comparison` internal variants (**removed** this branch). |

## 4. Region families (Class B) — options and recommendation

**No destructive action was taken.** Redirecting or rewriting 26 live, honest,
lawful pages is a business/editorial decision that (a) cannot be made without the
operator's confirmation and (b) cannot be executed well without **real regional
content**, which must come from the operator — fabricating regional facts,
figures or rankings is explicitly forbidden and would defeat the purpose.

Evidence-based options, best first:

- **Option A — Strengthen (recommended).** Raise the unique-to-shared ratio per
  page: extend each `RegionProfile` with 2–3 more genuinely distinct qualitative
  facts the operator can supply from real knowledge (named industrial zones and
  towns, transport corridors, specific cross-border dynamics, typical
  accommodation/commuting realities), and trim/vary the repeated national
  mechanics into a single shared explainer that each region links to rather than
  restates. This preserves all 26 URLs and the honest model. Requires operator
  input; no code redesign.
- **Option B — Consolidate the weaker family.** The `naklady-na-zamestnance-<region>`
  pages are the most boilerplate-heavy (cost mechanics are purely national). One
  defensible move is to fold their genuine regional paragraphs into the national
  `/naklady-na-zamestnance-cr` hub (as a linked regional-context section or table)
  and **301-redirect the 13 region cost URLs** to it, keeping the 13
  `trh-prace-<region>` labour-market pages (which carry more central regional
  framing) and strengthening them per Option A. Net: −13 URLs, authority
  concentrated. Requires operator sign-off (redirecting live pages).
- **Option C — Temporarily de-index.** Keep the pages accessible but drop the
  weaker family from the sitemap until Option A content lands, so crawl budget
  focuses on the differentiated pages. Fully reversible.
- **Option D — Remove.** Not recommended: the pages are honest, lawful and serve a
  real regional search intent; there is no doorway/spam justification for deletion.

**Recommendation:** Option A, or Option B for the cost family if the operator
prefers fewer, stronger URLs. Either way this needs the operator's regional
knowledge; it is queued as an owner decision, not blocked engineering.

## 5. Families confirmed sufficiently differentiated (keep as-is)

The audit found **none** of these in the high-similarity set (each substitutes
more than a name — distinct local/industry framing):

- City: `agentura-prace-*`, `nabor-zamestnancu-*`, `pracovnici-*`, `prace-pro-cizince-*`
- Industry/role: `pracovnici-do-*`, `*-pracovnici`, `operatori-vyroby`, `skladnici`, `picker-packer`, …
- Foreign workers: `prace-pro-ukrajince-v-cr`, `…-moldavany-…`, `…-srby-…`, `…-filipince-…`, `…-gruzince-…`

## 6. Homepage marketing claims — flag for owner (not changed here)

`pages/index.tsx` renders hardcoded social-proof figures — **"500+ Successful
Placements"** and **"100+ Partner Companies"**. These are unverified quantitative
claims. Per the project's honesty policy and audit Section 11 ("do not fabricate
placement numbers"), the operator should either substantiate these or replace them
with non-numeric phrasing. Left unchanged in this branch because it is a marketing/
business claim, not a crawlability defect.

## 7. External discovery (audit Section 22) — no spam, brand-first

Legitimate, non-spam discovery opportunities (no automated submissions, no paid
links, no keyword-rich sitewide cross-domain blocks):

- Official Czech context: Úřad práce ČR employer listings, MPSV agency register
  (TNT agency s.r.o. is a licensed §14 agency — its register entry is a credible
  citation source).
- Regional chambers of commerce (Hospodářská komora) and city business directories
  for the regions actually served (Pardubice HQ + region pages).
- Firmy.cz / Google Business Profile (brand entity consistency with the JSON-LD
  `EmploymentAgency` address/phone already on the homepage).
- HELPERG ecosystem: a single contextual brand link from HELPERG-owned properties
  where relevant (already governed by `lib/ecosystem/registry.ts`).

Do **not** fabricate listings or claim submissions that were not completed.

## 8. Owner decisions still required

1. Region families (§4): choose Option A / B / C and, for A/B, provide real
   regional content or approve the redirects.
2. Homepage figures (§6): substantiate or soften "500+/100+".
3. Post-deploy Search Console actions (deploy access + GSC access — see the PR
   description): submit the updated sitemap once, and URL-inspect the ~10 sampled
   priority pages.

---

## 9. Batch A update — indexing-recovery-authority-graph (A7 re-review)

Batch A performed **no consolidation, deletion or redirect** on content grounds.
The near-duplicate region families in §2/§4 are **unchanged** and remain an owner
decision (Option A/B/C). Adding internal links does **not** resolve
near-duplication and is not represented as doing so.

What Batch A did change, relevant to this review:

- Added one homepage-reachable contextual entry point on the employer hub
  (`/pro-zamestnavatele`) to the per-city recruitment pages and to the flagship
  regional labour-market overview (`/trh-prace-stredocesky-kraj`). This lifts the
  region/city families out of isolated cross-link clusters into contextual
  reachability from the homepage — an **internal-discovery** improvement, not a
  content change.
- Re-ran the near-duplication scan (`reports/internal-authority-graph.json`): the
  crawl still finds the same two 13-page region families as the only high-similarity
  set. Batch A introduced **zero new URLs**, so no new near-duplicate pages.

Net: the §8 owner decisions still stand. Batch A reduces the *internal-discovery*
contribution to "Discovered – currently not indexed" (pages are now easier to reach
and interlink); it does not, and cannot, by itself prove Google indexation — that
requires the Search Console evidence listed in `reports/search-coverage-baseline.md`.
