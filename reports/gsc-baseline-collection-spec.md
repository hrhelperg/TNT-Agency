# GSC Baseline Evidence — Collection Specification

**Production baseline:** `419a26c` · 185 canonical Czech URLs · 175 static / 0 dynamic / 0 SSG / 0 ISR · EN/DE pilot unpublished
**Machine-readable inventory:** [`gsc-baseline-inventory.json`](./gsc-baseline-inventory.json) — 185 rows, one per URL

---

## STOP CONDITION TRIGGERED — read this first

**Authenticated GSC data is unavailable.** Re-tested at the start of this phase across three independent endpoints:

| Endpoint | Result |
|---|---|
| `gsc-pages` (page-level clicks/impressions/CTR/position) | `Insufficient plan` |
| `gsc-performance-history` | `Insufficient plan` |
| `management-projects` / `subscription-info-limits-and-usage` | `Insufficient plan` |

The subscription endpoint is documented as free and consuming no API units, and it is still refused — so this is an **entitlement gap, not exhausted quota**.

Per the stop condition, **nothing has been implemented**. This document is the collection specification and owner instruction set required to obtain the missing evidence.

Every GSC-dependent state in this report is therefore **UNKNOWN**. Not zero. Not "not indexed".

---

## Evidence legend, used throughout

| Marker | Meaning |
|---|---|
| **VERIFIED** | Measured from the repository, a real build, or a live production fetch |
| **INFERRED** | Derived by correlation from VERIFIED data; explicitly not proof |
| **UNKNOWN** | No evidence exists. Requires GSC collection |

---

# PHASE G0 — Canonical inventory ✅ VERIFIED

Built from `public/sitemap.xml`, the content registries, and the rendered production build. **No URL was changed.**

## G0.1 Corpus composition

| Dimension | Distribution |
|---|---|
| **Total** | **185 URLs** |
| Content type | 162 registry pages · 13 hand-written `.tsx` · 10 static `.html` |
| Tier | T1 **13** · T2 2 · T3 161 · T4 9 |
| Purpose | informational **107** · commercial **61** · legal 9 · trust 2 · other 6 |
| Publication wave | pre-Wave 1 core **156** · Wave 1 **19** · Wave 2 **10** |
| Body words | min **170** · median **281** · max **1092** |
| Contextual crawl depth | 0:1 · 1:21 · 2:78 · 3:49 · 4:32 · 5:1 · unreachable:3 |
| Rendered inbound | min **1** · median **5** · max 175 |

## G0.2 Cluster profile — the structural map any diagnosis must explain

| Cluster | n | med words | med inbound | med source clusters | med depth | max depth |
|---|---:|---:|---:|---:|---:|---:|
| region | **54** | 418 | **2** | **1** | 3 | 4 |
| foreign_workers | 28 | 271 | 5 | **1** | 3 | 4 |
| knowledge | 25 | 237 | 11 | 4 | 2 | 3 |
| industry | 24 | 266 | 5 | 3 | 2 | 3 |
| technical_talent | 23 | **861** | 7 | 3 | 2 | 3 |
| other | 14 | — | 3 | 1 | 2 | **5** |
| employer_problem | 11 | 238 | 7 | 3 | 2 | 3 |
| trust / request / homepage / calculator | 6 | — | 163–175 | 7–11 | 0–2 | 2 |

**The two structural facts that matter most, both VERIFIED:**

1. **`region` is 29% of the corpus (54 URLs) and the weakest-connected**: median **2** inbound links from a median of **1** source cluster, at depth 3–4. If any part of this corpus has a discovery or crawl-budget problem, this is where it will show first.
2. **`technical_talent` is by far the deepest content** (median 861 words vs 237–418 elsewhere) with reasonable connectivity — the strongest candidate for content that *deserves* to index if index-selection is the constraint.

3 URLs are unreachable by contextual links alone: `/terms.html`, `/terms-cs.html`, `/terms-de.html` — footer-discoverable legal documents, by design.

---

# PHASE G1 — Search Performance ❌ UNKNOWN

**No data.** All cohorts below are defined and empty, awaiting collection.

### Required cohorts (populate during collection)

| Cohort | Definition |
|---|---|
| `IMPRESSIONS > 0` | appears in Performance with ≥1 impression |
| `NO PERFORMANCE EVIDENCE` | absent from Performance, or 0 impressions |
| `GROWING` / `DECLINING` | period-over-period impression delta |
| `NEWLY APPEARING` | present this period, absent previous |
| `HIGH IMPRESSIONS / WEAK CTR` | impressions ≥ 100 and CTR below site median |
| `POSITION 4–20` | avg position 4–20 — the actionable band |
| `COMMERCIAL, WEAK VISIBILITY` | `purpose = commercial` (61 URLs) with impressions below median |

> **Naming rule, non-negotiable.** A URL absent from Performance is labelled **`NO PERFORMANCE EVIDENCE`**. It must never be recorded as "not indexed" — Performance and Index Coverage are different questions, and a page can be indexed with zero impressions for months.

---

# PHASE G2 — Page Indexing ❌ UNKNOWN

**No data.** States to be quantified: Indexed · Crawled – currently not indexed · Discovered – currently not indexed · Duplicate without user-selected canonical · Duplicate, Google chose different canonical · Alternate page with proper canonical tag · Soft 404 · Not found (404) · Blocked by robots.txt · Excluded by noindex · Page with redirect · plus any other state the property exposes.

Reconcile each against the 185-row inventory wherever GSC exposes URL-level detail. Where GSC reports only a count without URLs, record the **count as VERIFIED and the per-URL attribution as UNKNOWN** — do not distribute a bucket total across URLs by guesswork.

---

# PHASE G3 — URL Inspection cohort ✅ VERIFIED (selection) / ❌ UNKNOWN (results)

**81 of 185 URLs (44%)** — not all 185, and not an arbitrary subset. Homogeneous template families are **sampled**, because a family's indexing state is a property of the family: inspecting 3 of 14 identical regional pages answers the question that inspecting all 14 would.

## Priority A — 50 URLs, all inspected (decision-critical)

Every Tier 1 page (13), every `employer_problem` page (11), every `technical_talent` page (23), both trust pages, plus `/pro-zamestnavatele`, `/poptavka-pracovniku`, `/cena-neobsazene-pozice`.

These are the pages whose indexing state determines Wave 6, Wave 7, Wave 8 and the locale-pilot decision. Full list in `gsc-baseline-inventory.json` (`tier === 1 || cluster ∈ {employer_problem, technical_talent, trust}`).

## Priority B — 24 URLs, stratified samples of the at-risk families

| Family | Siblings | Sampled (weakest / median / strongest by inbound) |
|---|---:|---|
| regional cost (generated) | 14 | `/naklady-na-zamestnance-pardubice`, `-plzensky-kraj`, `-praha` |
| regional labour (generated) | 13 | `/trh-prace-vysocina`, `-olomoucky-kraj`, `-kralovehradecky-kraj` |
| city workers | 10 | `/pracovnici-praha`, `-liberec`, `-pardubice` |
| city recruitment | 8 | `/nabor-zamestnancu-praha`, `-liberec`, `-zlin` |
| foreign-worker reference | 22 | `/prace-pro-moldavany-v-cr`, `/modra-karta-cr`, `/pracovni-povoleni-cr` |
| legal / blog static | 10 | `/blog/agenturni-pracovnici-vs-interni-zamestnanci.html`, `/cookies.html`, `/cookies-de.html` |
| structural outliers | — | `/terms.html`, `/terms-cs.html`, `/terms-de.html` (contextually unreachable), `/blog/nezamestnanost-brezen-2026.html`, `/cookies-cs.html`, `/prace-pro-cizince-praha` |

## Control — 7 URLs

`/` · `/agencies` · `/socialni-zdravotni-dane-2026` · `/zamestnavani-cizincu` · `/faq-zamestnavani-pracovniku` · `/pracovnici-pro-vyrobu` · `/docasne-prideleni-zamestnancu`

> The brief asks for controls "known to receive impressions". **That cannot be an input** — it is an output of G1. These are selected on internal strength and age instead; G1 confirms which actually have Performance data. Without a control group, a uniformly bad result is indistinguishable from a property-wide problem.

## Fields to capture per inspected URL

URL is on Google (yes/no) · indexing state · last crawl date · crawled as (user agent) · crawl allowed · indexing allowed · **user-declared canonical** · **Google-selected canonical** · referring sitemap · referring page (if exposed) · enhancements/rich results (if relevant).

> **The two canonical fields are the ones that matter most and the easiest to skip.** If Google-selected ≠ user-declared on a commercial URL, that is a content-differentiation or duplication problem — and it is the single most likely way the EN/DE pilot fails later, since Google would simply pick the Czech page.

> **Never substitute Live Test for indexed-state evidence.** Live Test shows what Google *could* fetch now; the "URL is on Google" panel shows what is *actually indexed*. Recording the former as the latter invalidates the entire baseline.

---

# PHASE G4 — Diagnosis ❌ UNKNOWN

Cannot be performed. What the diagnosis will correlate indexing state against — all **VERIFIED** and already in the inventory: rendered inbound · source-cluster diversity · crawl depth · body words · content family · commercial vs informational · publication wave.

**Hypotheses to test, stated in advance so the data cannot be fitted to a preferred story:**

| # | Hypothesis | Would be supported by |
|---|---|---|
| H1 | **Discovery** is the constraint | Discovered-not-indexed concentrated at depth ≥3 and inbound ≤2 |
| H2 | **Crawl budget** is the constraint | Crawled-not-indexed spread evenly; stale last-crawl dates across the corpus |
| H3 | **Index selection / quality** is the constraint | Crawled-not-indexed concentrated in thin, low-differentiation families regardless of depth |
| H4 | **Canonicalisation** is the constraint | Google-selected ≠ user-declared on multiple regional/city siblings |
| H5 | **Low-value URL mass** is the constraint | The 54 region + 22 city URLs indexing poorly while technical_talent indexes well |
| H6 | **Insufficient elapsed time** | Wave 1/2 pages (29 URLs) unindexed while pre-Wave-1 core indexes normally |

**Correlation is not causation, and the samples are small.** With 185 URLs and heavily unbalanced families, several of these will co-occur. The honest output is a ranked set of *candidate* constraints with the evidence for each — not a single named cause.

---

# PHASE G5 — Decision matrix ❌ ALL BLOCKED

| Decision | Status | Gate |
|---|---|---|
| **Wave 6 — High-skilled expansion** | **BLOCKED** | 4 candidates sit at `DEFER_FOR_DATA` (`mzdove-rozpeti-odborne-pozice`, `prubeh-naboru-odborne-pozice`, mechanical/electrical engineers, supply-chain, technical managers). Reconsideration requires query evidence of distinct search intent. `profession exists ≠ CREATE` still governs. **If the 23 existing technical_talent pages are not indexing, adding a 24th is the wrong move regardless of demand.** |
| **Wave 7 — Employer Intelligence** | **BLOCKED** | Needs query evidence to separate real gaps from generic HR-blog topics. The existing 25 knowledge pages must be shown to earn impressions first. |
| **Wave 8 — Conversion 4.0** | **BLOCKED** | Requires knowing which clusters actually generate employer-intent traffic. CTA architecture must not be redesigned from assumptions — the 2025 CTA routing work (PRs #35, #38) was justified by *intent-copy mismatch*, which is verifiable internally; traffic-based redesign is not. |
| **Locale pilot (12 pages, EN/DE)** | **HOLD** | Unchanged. Publishing 24 localized URLs onto a corpus whose own indexing behaviour is unmeasured would produce 24 more unmeasurable URLs. |

### Locale-pilot decision rule, committed in advance

| G2/G3 finding for the 185 Czech URLs | Locale recommendation |
|---|---|
| Majority Indexed, canonicals correct, commercial pages drawing impressions | **GO** — publish the 12-page pilot |
| Majority Indexed but Google-selected ≠ user-declared on several | **NO-GO** — fix canonicalisation first; localization would multiply it |
| Majority *Crawled – currently not indexed* | **NO-GO** — index selection is the constraint; more URLs make it worse |
| Majority *Discovered – currently not indexed* | **NO-GO** — discovery/crawl budget is the constraint; adding URLs competes for the same budget |
| Mixed, with Tier 1 + technical_talent indexed and only regional weak | **GO, reduced** — pilot the commercial subset only |

---

# OWNER COLLECTION SHEET

Property: `talentpartnerid.com` · Access needed: **Full user** (URL Inspection requires it; Search Analytics alone would work at Restricted).

### Step 1 — Search Performance exports (~15 min)

In **Performance → Search results**:

| # | Filter | Export | Save as |
|---|---|---|---|
| 1 | Last **28 days**, tab **Pages** | full page table | `gsc-pages-28d.csv` |
| 2 | Last **3 months**, tab **Pages** | full page table | `gsc-pages-3m.csv` |
| 3 | Last **3 months**, tab **Queries** | full query table | `gsc-queries-3m.csv` |
| 4 | Last 3 months, tab **Countries** | full table | `gsc-countries-3m.csv` |
| 5 | Last 3 months, tab **Devices** | full table | `gsc-devices-3m.csv` |
| 6 | Last 3 months **+ Compare to previous period**, tab Pages | comparison table | `gsc-pages-3m-compare.csv` |

Set the row limit to maximum before exporting; the default view truncates.

### Step 2 — Page Indexing (~10 min)

**Indexing → Pages**: screenshot the summary, then for every non-indexed reason with an exportable URL list, export it as `gsc-index-<reason>.csv`. Record the **count** for every reason, including those without URL lists.

Also record: total indexed, total not indexed, and the sitemap's submitted-vs-indexed figures from **Indexing → Sitemaps**.

### Step 3 — URL Inspection, 81 URLs (~80–90 min)

The list is in `gsc-baseline-inventory.json`; filter as described in G3. For each: paste the URL, wait for the **indexed** result (not Live Test), and record the fields listed above into `gsc-inspection.csv`.

If time is short, **Priority A (50) alone is enough to make the Wave 6/7/8 and locale decisions.** Priority B and the control add diagnostic power for G4 but are not decision-blocking.

### Step 4 — Hand back

Place the CSVs and screenshots anywhere in the repo (or share them) and say so. I will produce the populated baseline report: Performance mapping, indexing-state distribution, cluster-level visibility, indexing-risk cohorts, commercial-opportunity cohorts, the G4 diagnosis, and the G5 decisions with a GO/HOLD/NO-GO on the locale pilot.

### What I will not do with the data

Call a page indexed without GSC evidence · call a page unindexed because it has zero impressions · claim crawl or indexing improvements from internal validators · assert a single root cause from a small sample.

---

## State

G0 **VERIFIED** · G1 **UNKNOWN** · G2 **UNKNOWN** · G3 selection **VERIFIED**, results **UNKNOWN** · G4 **UNKNOWN** · G5 **BLOCKED**

Wave 6 ❌ · Wave 7 ❌ · Wave 8 ❌ · L1 locale ❌ — none started, none authorized.
No production code, content, route, sitemap, canonical or hreflang was modified in this phase.
