# Wave 3 — Phase 2: Regional Quality Audit

**Baseline SHA:** `6322a7b` · **Branch:** `feat/wave-3-employer-intelligence-quality`
**Status:** audit complete, no content changed yet.

---

## 1. Regional / city inventory

53 location-driven canonical pages in five families:

| Family | n | Generated? | Words min/med/max | Max intra-family body similarity | Shared-paragraph word share |
|---|---|---|---|---|---|
| `naklady-na-zamestnance-*` | 14 | 11 generated + 3 hand-written | 374 / 502 / 516 | 0.851 | — |
| `trh-prace-*` | 14 | 11 generated + 3 hand-written | 335 / 438 / 585 | 0.830 | — |
| **both above combined** | **28** | 22 generated | — | **0.851** | **49.9%** |
| `pracovnici-<city>` | 10 | hand-written | 194 / 210 / 525 | 0.746 | 18.8% (with the 10 below) |
| `nabor-zamestnancu-<city>` | 10 | hand-written | — | — | — |
| `agentura-prace-*`, `prace-pro-cizince-*` | 5 | hand-written | 194–~300 | — | — |

---

## 2. The headline measurement

**49.9% of all body words in the 28 `naklady-*` / `trh-prace-*` pages sit in a paragraph that appears on more than one page** (4,418 of 8,847 words). 17 distinct duplicated paragraphs, 7 duplicated FAQ answers, 24 duplicated bullets.

This — not the 0.851 cosine score — is the actionable defect. The similarity score is a symptom.

---

## 3. Template-core analysis (§2B)

The duplication is not random. It concentrates in blocks that are **not regional at all**:

| Dup. | Words | Block | Class | Verdict |
|---|---|---|---|---|
| ×14 | 25 | "Konkrétní strukturu zaměstnanosti… zveřejňuje ČSÚ…" | **H** source disclaimer | Centralise — keep one short form |
| ×14 | 23 | "Pro plánování je klíčové vědět, zda pracovník má volný vstup na trh práce…" | **E** generic advice | Owned by `/zamestnavani-cizincu` → link |
| ×13 | 22 | "Regionální rozměr se týká hlavně náboru a zázemí…" | **E** generic advice | Rewrite per region or drop |
| ×12 | 27 | "Odvody na sociální a zdravotní pojištění tvoří podstatnou část…" | **A** national law | Owned by `/naklady-na-zamestnance-cr` → link |
| ×12 | 29 | "Po nástupu je třeba počítat se vstupním školením BOZP…" | **E** generic advice | Owned by `/povinnosti-zamestnavatele` → link |
| ×11 | 21 | "Doporučujeme nevycházet z paměti ani z orientačních čísel…" | **H** source disclaimer | Centralise |
| ×11 | 28 | "Před nástupem vznikají náklady na inzerci, výběr…" | **E** generic advice | Owned by `/kolik-stoji-zamestnanec` → link |
| ×11 | 34 | "U agenturního zaměstnávání nese mzdovou administrativu agentura…" | **A** legal | Owned by `/docasne-prideleni-zamestnancu` → link |
| ×11 | 34 | "Z hlediska souladu platí požadavek srovnatelných podmínek…" | **A** legal | Owned by `/docasne-prideleni-zamestnancu` → link |
| ×11 | 28 | "Pro zaměstnavatele je podstatná dostupnost kandidátů…" | **E** generic advice | Rewrite per region |
| ×11 | 28 | "Zahraniční pracovníci mohou pomoci doplnit chybějící kapacitu…" | **E** generic advice | Owned by `/nabor-zahranicnich-pracovniku` → link |
| ×7 | 25 | "Hrubá mzda je jen výchozím bodem…" | **A** national law | Owned by `/naklady-na-zamestnance-cr` → link |

**Conclusion.** Roughly half of every regional page restates national law (class A), generic employer advice (class E) or source disclaimers (class H). **None of it is regional.** Worse, every one of those blocks already has a dedicated page that owns the topic properly.

Legally identical statements will **not** be artificially varied (§2B). They will be **removed from the regional pages and replaced with a contextual link to the page that owns them** — which cuts duplication, raises regional information density, and strengthens the link graph in one move.

---

## 4. Similarity pairs (121 total)

119 of 121 pairs ≥0.60 are regional↔regional. Distribution: 28 pairs ≥0.80, 1 pair ≥0.85 (worst 0.851). The two non-regional pairs are unrelated and benign.

---

## 5. Page-by-page plan — 22 generated regional pages

All 22 receive the **same structural treatment** because they share one generator; the *content* added is per-region.

| | Action |
|---|---|
| **REWRITE SUBSTANTIAL** — all 11 `naklady-na-zamestnance-<region>` and all 11 `trh-prace-<region>` | Remove the class A/E/H blocks; replace with one contextual link each to the owning page. Expand the per-region fields (`character`, `workforce`, `staffingFocus`) into genuinely distinct regional decision content. Add region-relevant profession/industry/problem links derived from the region's actual sector mix. |
| **KEEP AS-IS** — the 3 hand-written `employer-intelligence` pages (Pardubice, Hradec Králové, Střední Čechy) | Already differentiated with unique headings and content; they are the model the generated pages should reach. |

**What must stay:** the region's own `character` / `workforce` / `staffingFocus` sentences; the honest "we publish no figures" posture; every existing source citation; the CTA.
**What is removed:** the ~50% duplicated national-law, generic-advice and disclaimer mass.
**What is added:** region-specific onward paths (profession/industry/problem) that make the page useful rather than merely present.

No page is deleted, redirected, merged or noindexed. **No destructive action is required**, so Phase 3 proceeds automatically per §2J.

---

## 6. City-page decision table (10 `pracovnici-<city>` + 10 `nabor-zamestnancu-<city>`)

The audit **contradicts the Phase 0–1 assumption** that these are the worst pages:

- shared-paragraph word share **18.8%** (vs 49.9% regional)
- max intra-family body similarity **0.746** — below even the 0.80 band
- **outbound cluster diversity already 3–5** — `pracovnici-*` link to knowledge, region, industry, foreign_workers and calculator

Their defect is **entirely inbound**: 1 contextual inbound each (2 for `nabor-zamestnancu-*`), all from the region cluster.

| Page | Distinct city intent? | Useful beyond the name? | Verdict |
|---|---|---|---|
| all 10 `pracovnici-<city>` | Yes — city-level employer search intent | Yes — each already routes to industry + foreign-worker + calculator | **KEEP + STRENGTHEN (inbound only)** |
| all 10 `nabor-zamestnancu-<city>` | Yes | Yes | **KEEP + STRENGTHEN (inbound only)** |

They are thin (194–210 words) but *not* duplicative and they route well. This is a link-graph repair (Phase 8), **not** a content rewrite. **No consolidation candidate identified.**

---

## 7. Thin-page classification (§2H) — by function, not word count

| Function | Pages | Verdict |
|---|---|---|
| FAQ hubs (`faq-pro-zamestnavatele` 163w, `faq-zamestnavani-pracovniku` 166w) | 2 | **JUSTIFIABLY SHORT** — link hubs; depth would harm them |
| City pages 194–210w | 20 | **NEEDS DIFFERENTIATION** via inbound, not padding |
| Generated regional 335–516w | 22 | **NEEDS DIFFERENTIATION** — half the words are not theirs |
| `dokumenty-pro-zamestnani-cizincu` 185w | 1 | **JUSTIFIABLY SHORT** — checklist by design |
| `naklady-na-zamestnance-cr` 193w | 1 | **NEEDS DEPTH** — it is about to receive the national-law content moved off 11 regional pages |

No page will be padded to clear a threshold.

---

## 8. Source-cluster diversity baseline (§2F)

81 commercial pages. Source clusters: **min 1 · median 2 · avg 2.49 · max 6**.
**14 pages fed by exactly one cluster. 53 of 81 (65%) fed by ≤2.**

Worst offenders are closed loops — industry linked only by industry, city only by city.

## 9. Wave 1 / Wave 2 closed loops (§2G)

| Page | Inbound | Source clusters | Verdict |
|---|---|---|---|
| `/nabor-techniku-automatizace` | 4 | **1** (technical_talent) | Needs industry + problem + knowledge inbound |
| `/technicti-inzenyri` | 4 | **1** (technical_talent) | Same |
| `/technologove-a-konstrukteri` | 5 | 1–2 | Same |
| `/nakup-a-zasobovani` | 4 | 1–2 | Same |
| `pracovnici-do-vyroby` | 1 | **1** (industry) | Needs problem/knowledge/region inbound |
| 9 further industry pages | 2–3 | **1** | Same |

**This is a defect in my own Wave 2 link design**: those pages passed the cohort gate on raw count (min 3) while being as closed as the city pages. Raw inbound count is confirmed inadequate as a quality metric.

---

## 10. Proposed validator architecture (§2I)

Layered, with thresholds derived from the measured corpus — not invented:

| Gate | Threshold | Why this number |
|---|---|---|
| Global body similarity | keep **0.90** | Existing corpus gate; only 1 pair is near it |
| **Same-family similarity** (generated families) | **0.75** | Current family max is 0.851; healthy hand-written city family peaks at 0.746, so 0.75 is achievable and proven by an existing family |
| **Shared-paragraph word share** per family | **≤25%** | Currently 49.9% regional / 18.8% city — the city family proves ≤25% is reachable |
| **Duplicated paragraph count** (≥3 pages) | **0 new**, regional total must fall | Direct measure of the actual defect |
| **Source-cluster diversity** for commercial pages | **≥3 clusters** | Current median 2, max 6; ≥3 is above median and demonstrably achievable |
| Regional information gain | ≥1 region-specific signal per page | Prevents name-substitution |

Mutation tests must prove the gate catches: region-name substitution, copied intro, copied body paragraph, closed-loop inbound, and synonym-swap fake differentiation.

---

## 11. Source requirements

The rewrite adds **no new numeric claims**, so no new source is strictly required. Existing citations (ČSÚ, MPSV, ÚP ČR, ČSSZ, finanční správa, VZP) are retained. Any region-specific factual assertion introduced must carry publisher + dataset + period + retrieval date, or it does not ship. Where region-specific evidence is unavailable, the page uses qualitative decision support — never padding.

## 12. Pages requiring owner review

**None.** No destructive action is proposed.

## 13. Expected measurable outcomes

Shared-paragraph word share in the regional family **49.9% → ≤25%**; duplicated paragraphs ≥3 pages materially reduced; same-family max similarity **0.851 → <0.75**; commercial pages with 1 source cluster **14 → 0**; city inbound diversity **1 → ≥3**; **0** new URLs, orphans, near-orphans; no crawl-depth regression.

## 14. Pages explicitly NOT being deleted

All 53 location pages: 22 generated regional, 20 city, 3 hand-written regional, `agentura-prace-praha`, `agentura-prace-brno`, `prace-pro-cizince-praha`, `prace-pro-cizince-brno`, plus `naklady-na-zamestnance-cr`.

## 15. Future consolidation candidates (evidence-based wave only)

**None identified.** The city pages — the presumed candidates — measured healthier than the generated regional pages on every content axis. Any future consolidation should be driven by Search Console impression data, not by similarity scores.

---

**Proceeding to Phase 3** (regional repair): no destructive decision required, no unsourceable claim required, no owner decision required.
