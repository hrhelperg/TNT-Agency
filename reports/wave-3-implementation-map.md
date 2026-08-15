# Wave 3 — Implementation Map

**Baseline SHA:** `6322a7bae0533a3816ac6f4ed529a735f0fa7244` (origin/main, clean tree)
**Phase:** 0–1 complete (baseline + discovery). **No implementation code written. No branch created.**

Every figure below was remeasured from this SHA — registry objects imported directly, plus a real `next build` + `next start` crawl of all 185 URLs. Nothing is carried over from the Wave 2 report.

---

## Stop-condition check (§26)

| Condition | Status |
|---|---|
| Current main materially differs from assumed architecture | **No** — matches |
| Wave 2 not actually merged | **Merged** — PR #30, `6322a7b`; merged tree is byte-identical to the validated tip `84243a2` (`c53f329…`) |
| Unresolved merge conflict | None; working tree clean |
| Baseline gates failing | None — 374 tests, 15 validators, lint + typecheck all green |

No stop condition triggered.

---

## A. Measured baseline

| Measure | Value |
|---|---|
| Canonical URLs (sitemap = routes) | **185** |
| Registry objects / route files | 162 / 175 |
| Tier 1 / 2 / 3 / 4 | 14 / 77 / 83 / 11 |
| Orphans | **0** |
| Near-orphans | 4 (all Tier 4 legal, footer-discoverable) |
| Avg click depth (all / contextual) | 2.0 / **2.53** |
| **Max contextual depth** | **5** |
| Contextual inbound: min / median / avg / max | **1** / 4 / 10.0 / 165 |
| Contextual outbound: min / median / avg / max | **0** / 9 / 10.0 / 55 |
| Request-page / calculator inbound | 164 / 165 |
| Non-200 · non-self-canonical · broken links · redirects | 0 · 0 · 0 · 0 |
| Duplicate rendered titles / H1s / descriptions | **0 / 0 / 0** |
| SearchAction / search_term_string | 0 |
| Pages with no request link | 0 |
| WebmasterID installations | 1 |
| Tests / Playwright | 374 / 66 |

**The hygiene layer is clean.** There is nothing to fix in canonicals, duplicates, broken links, redirects or crawl errors. Wave 3's value is therefore *not* in hygiene — it is in differentiation and link topology.

---

## B. The three real problems

### Problem 1 — regional content is 98% of the similarity mass

| Measure | Value |
|---|---|
| Body pairs ≥0.60 | **121** |
| …of which regional↔regional | **119 (98%)** |
| Pairs ≥0.80 | 28 |
| Pairs ≥0.85 | 1 (worst: 0.851) |
| Duplicated paragraphs | **30**, affecting **70 pages** |
| Regional pages | 53 (29% of the corpus) |
| Regional words min / median / max | 193 / 376 / 585 |

Worst pair `naklady-na-zamestnance-jihocesky-kraj ~ …-liberecky-kraj` at **0.851** — under the 0.90 corpus gate, which is exactly why it has survived two waves. The gate cannot see it.

### Problem 2 — source-cluster diversity is the metric nobody was measuring

Raw inbound count looks healthy (median 4). Diversity does not:

| Measure | Value |
|---|---|
| Commercial pages assessed | 81 |
| Source clusters: min / median / avg / max | **1** / 2 / 2.49 / 6 |
| Pages fed by **only one** cluster | **14** |
| Pages fed by ≤2 clusters | **53 of 81 (65%)** |

The pattern is **closed loops**: industry pages linked only by industry pages, region only by region, city only by city. All 20 city pages have diversity 1.

**This includes my own Wave 2 work.** `nabor-techniku-automatizace` and `technicti-inzenyri` each have 4 inbound links — all four from `technical_talent`. By raw count they passed the cohort gate at min 3; by diversity they are as closed as the city pages. That is a defect in Wave 2's link design, not a pre-existing one, and Wave 3 should fix it.

### Problem 3 — thin pages are concentrated, not spread

73 pages under 250 words, 91 under 300. The thinnest are the two FAQ hubs (163, 166) and the city/region pages (193–201). The FAQ hubs are *structurally* short (they are link hubs), which is defensible; the city pages are short **and** near-duplicate **and** single-cluster, which is not.

---

## C. Decision table

| Current | Problem | Evidence | Action | Expected effect | Risk | Block |
|---|---|---|---|---|---|---|
| 22 generated region pages (`trh-prace-*`, `naklady-*`) | Template A/B output; 119 of 121 similar pairs | max 0.851 body sim; 30 dup paragraphs over 70 pages | **REWRITE the generator's differentiating sections** so each region carries distinct, sourced context; do **not** delete | similarity mass falls; information gain rises | Rewriting 22 pages risks new duplication if done mechanically | 3A |
| 10 `pracovnici-<city>` | 1 inbound, 1 cluster, depth 3, ~195 words | measured | **KEEP + strengthen inbound diversity**, do not merge — each has distinct city search intent and 200 words is thin, not empty | diversity 1 → 3+; depth 3 → 2 | Deleting would lose genuine city intent | 3A/3D |
| 10 `nabor-zamestnancu-<city>` | 2 inbound, 1 cluster | measured | KEEP + diversify inbound | same | low | 3D |
| 14 commercial pages, 1 source cluster | Closed-loop linking | measured | **Cross-cluster link engineering** driven by a new diversity metric | authority spread; better crawl paths | Over-linking → link spam; must stay semantic | 3D |
| Wave 2 technical pages | 4 inbound but all same cluster | measured | Add industry/problem/knowledge inbound | diversity 1 → 3+ | low | 3D |
| Corpus similarity gate at 0.90 | Cannot see the 0.81–0.85 band | 28 pairs sit under it | **New `validate:similarity`** with a paragraph-duplication check and a regional-specific threshold | the debt becomes gate-visible | Too strict → blocks legitimate shared framing | 3A |
| Employer-problem candidates (§6) | 9 candidates proposed | dedup pending | Audit — expectation is mostly REJECT/EXPAND, since Waves 1–2 already own most | avoids cannibalisation | Creating overlapping pages would damage existing rankings | 3B |
| Knowledge candidates (§7) | taxonomy proposed | dedup pending | Audit against `/pro-zamestnavatele` IA | avoids a competing hub | low | 3C |
| CTA taxonomy | one shared CTA per registry file | inspection | Contextual CTA per cluster | relevance | Over-differentiation → maintenance burden | 3E |
| Sticky CTA | not implemented | — | **Evaluate, do not assume.** §9.2 requires proof of usefulness first | — | CLS, obstruction, mobile safe-area | 3E |
| Acquisition clusters | 11 clusters, coverage complete | 0 commercial routes in "other" | Extend with an **intent class** dimension | richer offline reporting | none — no telemetry change | 3F |

---

## D. Expected shape of Wave 3

**New URLs expected: 0–4, and 0 is an acceptable outcome** (§23). This is a repair-and-connect wave. The candidate lists in §6 and §7 will be dedup-audited in Phases 4 and 6, and the strong prior — from the Wave 1 and Wave 2 registries — is that most are already owned:

- *hard-to-fill* → `/proc-se-nedari-obsadit-odbornou-pozici`
- *time-to-hire* → `/jak-dlouho-trva-obsazeni-pozice`
- *new shift* → `/nabor-pri-nabehu-vyroby`
- *replacement hiring / staffing reserve* → `/planovani-naboru`, `/absence-v-provozu`
- *turnover* → 4 existing pages
- *agency vs in-house* → `/jak-funguje-pracovni-agentura`, `/primy-nabor-zamestnancu`
- *screening / brief / qualification* → `/zadani-pozice-a-profil-kandidata`, `/odborna-zpusobilost-a-opravneni`
- *vacancy / turnover / employment cost* → `/cena-neobsazene-pozice` + 3 cost pages

The genuinely open ones are **shift planning** and **capacity planning**, both deferred in Wave 2 as HR-ops rather than hiring intent. They will be re-tested against §23's ten questions, especially #10.

---

## E. Sequenced plan

| Phase | Block | Output |
|---|---|---|
| 2–3 | **3A** regional audit + repair | `reports/regional-quality-audit.md`, per-page KEEP/REWRITE classification, before/after similarity |
| 4–5 | **3B** employer-problem dedup | decisions recorded in the cohort registry |
| 6–7 | **3C** knowledge audit | `/pro-zamestnavatele` IA strengthening |
| 8 | **3D** authority engineering | diversity metric + gate + cross-cluster links |
| 9 | **3E** conversion 3.0 | CTA taxonomy; sticky CTA only if justified |
| 10 | **3F** cluster classification | intent-class dimension, offline only |
| 11–16 | validators, mutation tests, crawl, browser QA, adversarial review, full gate | |
| 17–19 | report, commit, push | **stop** |

---

## F. Constraints carried into implementation

No new regional/city pages in 3A. No deletion or redirect of a region page without documented evidence. No telemetry change — pathname-derived classification only. No backend, no second tracker, no fabricated regional statistic: any number must carry publisher, dataset, period and retrieval date, or it does not ship. Validators may be extended, never weakened.

---

## G. State

IMPLEMENTED ❌ · VALIDATED ❌ · PUSHED ❌ · MERGED ❌ · DEPLOYED ❌ · CRAWLED ❌ · INDEXED ❌ · RANKED ❌

Discovery only. Awaiting approval to proceed to Phase 2.
