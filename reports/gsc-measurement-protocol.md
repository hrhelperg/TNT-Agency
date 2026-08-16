# Search Console Measurement Protocol — prerequisite for the public locale pilot

**Status: BLOCKING.** The locale foundation may merge and deploy without this. The **public locale pilot may not launch** until the measurement below is obtainable, because without it the pilot cannot be evaluated — only guessed at.

Current access: Ahrefs and its GSC integration both return `Insufficient plan`, including the endpoint documented as free and consuming no API units. That is an entitlement gap, not exhausted quota.

**Unavailable data is UNKNOWN, never zero.** No absence of evidence here may be read as absence of demand, absence of crawling, or absence of indexing.

---

## 1. The question the pilot exists to answer

> Does Google discover, crawl, canonicalise, index and surface the localized URLs correctly **on this domain**?

Not "does the architecture render correctly" — that is already provable locally and will be proved before launch. The unknown is Google's behaviour on a domain whose recorded failure mode is *"Discovered – currently not indexed."*

A pilot that ships without the ability to answer this produces 24 URLs and no knowledge.

---

## 2. Minimum required observations

Per pilot URL — 24 localized URLs plus their 12 Czech sources as the control group.

| # | Observation | Why the pilot is unevaluable without it |
|---|---|---|
| 1 | **Discovered** (yes/no, date) | If Google never discovers them, nothing downstream matters and the cause is internal linking or the sitemap, not content |
| 2 | **Crawled** (yes/no, last crawl date) | Discovered-but-never-crawled is this domain's known failure mode. It is the single most likely outcome and must be distinguishable from a content problem |
| 3 | **Indexed** (yes/no) | The actual success criterion |
| 4 | **Google-selected canonical** | The critical hreflang failure mode: Google may index the Czech page *instead* and treat EN/DE as duplicates. Invisible without this field |
| 5 | **Coverage/exclusion reason** | Distinguishes *Crawled – currently not indexed*, *Discovered – currently not indexed*, *Duplicate, Google chose different canonical*, *Alternate page with proper canonical tag*, and soft 404 — each implies a different fix |
| 6 | **Impressions**, per page | Whether the URL surfaces at all |
| 7 | **Clicks**, per page | Whether it surfaces usefully |
| 8 | **Queries**, per page | Whether it surfaces for *localized* queries or only brand terms — the difference between the pilot working and merely existing |
| 9 | **Country** | An `/en/` page drawing only Czech impressions has not reached its intended audience |
| 10 | **Device** | Sanity check against the mobile QA already done |
| 11 | **hreflang errors** (International Targeting, where still present) | Reciprocity and return-tag errors that on-page validation cannot see |
| 12 | **Crawl frequency / crawl stats** | Whether locale URLs enter the normal crawl budget or are visited once and dropped |

Control comparison is mandatory: the same fields for the 12 Czech sources over the same window. Without a control, a flat pilot result cannot be told apart from a flat site.

---

## 3. Preferred access — API

Google Search Console API, read-only, property `talentpartnerid.com`:

| Endpoint | Supplies |
|---|---|
| `searchanalytics.query` (dimensions: `page`, `query`, `country`, `device`, `date`) | Observations 6–10 |
| `urlInspection.index.inspect` | Observations 1–5, 11 — the only source of Google-selected canonical and per-URL indexing verdict |
| `sitemaps.get` | Submitted vs indexed counts per sitemap |

Minimum role: **Restricted** user on the property is sufficient for Search Analytics; **URL Inspection requires Full user**. Owner-level access is not required.

Either an Ahrefs plan covering the GSC integration, or a direct Google service-account/OAuth credential with read scope, satisfies this.

---

## 4. Fallback — manual protocol, if no API

**The pilot must not be blocked on API access when the owner's dashboard already shows this.** A person with Search Console dashboard access can supply everything in §2 manually. This is slower, not weaker.

### Cadence

| When | Action |
|---|---|
| **T+0** (launch day) | Submit updated sitemap. Record the submission timestamp. Do **not** use IndexNow or manual URL submission — the pilot is a test of *organic* discovery, and forcing discovery destroys the measurement |
| **T+7 days** | Round 1 |
| **T+21 days** | Round 2 |
| **T+42 days** | Round 3 — decision point |

Three rounds because a single reading cannot distinguish "not yet" from "never". Six weeks is the shortest window in which *Discovered – currently not indexed* can be told apart from ordinary crawl latency on a site of this size.

### Round procedure

**A. URL Inspection — all 24 localized URLs, plus 12 Czech controls.**
For each, record from the dashboard: URL on Google · Coverage state · Discovery (sitemap/referring page) · Last crawl date · Crawled as · Indexing allowed · **User-declared canonical** · **Google-selected canonical**.

The two canonical fields are the ones that matter most and the ones easiest to skip. If Google-selected ≠ user-declared on any localized URL, the hreflang or content-differentiation model has failed and expansion must stop regardless of impressions.

**B. Pages indexing report.** Record counts per status, and which pilot URLs sit in each non-indexed bucket.

**C. Search Performance.** Filter to each locale prefix, last 28 days, and export: page · query · country · device · impressions · clicks · position. Repeat unfiltered for the Czech controls.

**D. Record into a versioned file** — `reports/locale-pilot-measurement-<round>.md` — including the observation date, the window, and **explicit UNKNOWN for anything the dashboard did not show**. A blank cell must never be recorded as zero.

### Effort

Roughly 45–60 minutes per round: 36 URL inspections at ~1 minute each, plus three exports. Three rounds is about three hours of owner time across six weeks — materially less than the cost of publishing 102 URLs on an unvalidated architecture.

---

## 5. Decision rule

Set before the data arrives, so the result cannot be rationalised afterwards.

| Outcome at T+42 | Decision |
|---|---|
| ≥ 8 of 12 EN or DE URLs **indexed**, Google-selected canonical matches user-declared on all indexed URLs, and non-brand localized queries appear | **EXPAND** — proceed to the next tier |
| Indexed but Google selects the Czech page as canonical for ≥ 2 localized URLs | **STOP AND FIX** — a content-differentiation or hreflang problem. Do not add URLs |
| Crawled but *currently not indexed* for the majority | **STOP** — the domain's existing indexation problem also applies to localized URLs. Adding URLs makes it worse |
| **Discovered – currently not indexed** for the majority | **STOP** — discovery works, crawl budget does not. An internal-linking and authority problem, not a translation problem |
| Not discovered at all | **STOP AND FIX** — sitemap or internal linking. A content fix would be treating the wrong cause |
| Indexed, but impressions only on brand/Czech-language queries | **HOLD** — the architecture works and the market interest does not. Expansion would multiply an unread corpus |

Note the asymmetry: only one outcome expands. That is deliberate — the cost of wrongly expanding (102 URLs on a domain already struggling to get indexed) is far higher than the cost of wrongly waiting.

---

## 6. What this does *not* block

- Merging and deploying the **locale foundation** (registry, validators, documentation) — it changes no route and no URL
- PRs #35, #36 and the `/submit-offer` follow-up — unrelated to locale
- Preparing translations up to `EDITORIAL_REVIEW_PENDING`, if the owner chooses to start that work in parallel

It blocks exactly one thing: **publishing the first localized public URL**.

---

## 7. State

LOCALE FOUNDATION — IMPLEMENTED ✅ · VALIDATED ✅ · PUSHED ✅ · MERGED ❌ · DEPLOYED ❌
LOCALE PILOT ROUTES — IMPLEMENTED ❌ · DEPLOYED ❌ · CRAWLED **UNKNOWN** · INDEXED **UNKNOWN**

UNKNOWN, not zero. Nothing has been measured because nothing has been published and no measurement access exists.
