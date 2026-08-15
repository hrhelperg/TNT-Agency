# Wave 4 — Final Report: Cross-Cluster Authority

**Branch:** `feat/wave-4-cross-cluster-authority-high-skilled` · **Baseline:** `0b75b1b` (Wave 3, PR #31)
**New URLs: 0.** **Pages regressed: 0.**

---

## 1. What this wave found and did

The corpus had no hygiene problem. 185 URLs, zero orphans, zero broken links, zero duplicate titles, zero canonical errors — Wave 3 left it clean. What it had was a **topology** problem, and one number captured it:

```
technical_talent -> employer_problem = 1        against 106 technical_talent self-links
```

An employer reading `/nabor-svarecu` is, by definition, someone who cannot fill a welding role. They already have the problem `/proc-se-nedari-obsadit-odbornou-pozici` diagnoses. The site made that connection once. It linked the technical cluster to itself 106 times.

Wave 4 connected the corpus instead of extending it: **28 new cross-cluster edges, zero new same-cluster edges, zero new URLs.** The self-loop count is byte-identical before and after.

---

## 2. Measured outcome

| Measure | Before | After |
|---|---|---|
| Commercial pages fed by 2 clusters (registry) | 41 | **22** |
| Commercial pages fed by 3+ clusters (registry) | 40 | **59** |
| Source clusters, avg (registry) | 2.88 | **3.14** |
| Commercial pages fed by 2 clusters (rendered) | 32 | **15** |
| Source clusters, avg (rendered) | 3.39 | **3.64** |
| Single-cluster dominance ≥75% (rendered) | 13 | **5** |
| Cross-cluster edges | 2,376 | **2,404** |
| Same-cluster edges | 710 | **710** |
| Pages improved / regressed | — | **21 / 0** |
| Canonical URLs · orphans · broken links | 185 · 0 · 0 | **185 · 0 · 0** |
| Avg contextual depth · max | 2.51 · 5 | **2.51 · 5** |

The 15 pages that remain at two clusters are documented individually in `wave-4-two-cluster-audit.md`. Each would need a link the reader does not want. **Three clusters is a target, not a quota** — and `technical_talent → employer_problem` was left at 2 rather than pushed to 15, because trade pages already carry their own diagnosis section and linking them to the diagnosis page would waste the reader's click.

---

## 3. New gate: `validate:authority-v4`

Measures the **shape** of a commercial page's inbound authority, not its volume — Wave 3 established that raw inbound count hides closed loops.

- **FAIL** — 0/1 source cluster without a documented exception; a closed same-cluster loop; >90% single-cluster dominance; no request path; a growth-cohort page launching without diversified inbound or below the minimum unique sources; a link to a non-existent route, to itself, into the static `.html` layer, or carrying a query string.
- **REVIEW** — exactly 2 source clusters. Reported, never failed.
- **PASS** — diversified authority that is semantically justified.

Documented two-cluster exceptions each declare the **floor** they are documented at, so an exception is permission to sit at a stated level rather than blanket immunity.

### Mutation-tested — 11 defects, plus two controls

The harness imports the gate's real exported `auditAuthority()` and runs it against deliberately damaged registries; a harness that reimplemented the checks would prove nothing about the gate that ships.

All 11 injected defects are caught, the unmutated registry passes (control), and a documented two-cluster page at its floor is REVIEWed rather than failed (negative control).

---

## 4. Two defects I found in my own work

**The gate had a hole.** The first version excused *any* cluster count below the minimum once a page appeared in the exception list. A page documented as a genuine two-cluster page could have degraded to one cluster and still passed — the exception was blanket immunity, not permission to sit at a stated level. Found in Phase 19 adversarial review, fixed by having each exception declare its floor, and mutation #11 now exists specifically to catch it.

**The crawler was wrong.** The Phase 1 crawler stripped every `<nav>` element when computing contextual links — deleting `nav.internal-links`, the related-links block this entire programme edits. Its first Wave 4 output claimed 541 broken links, 166 near-orphans and zero contextual depth, all contradicted by validators that were passing. The site was fine; the instrument was broken. It also counted non-sitemap routes (`/contact`, `/agencies`) and static assets as broken links. Corrected, documented in the script, and **both sides of the before/after were re-measured with the corrected version** rather than compared across two different instruments.

---

## 5. High-skilled expansion: deferred, not decided

GSC and Ahrefs both returned `Insufficient plan`. Search demand per candidate intent is **UNKNOWN — not 0**; zero would assert a measurement that was never taken.

Per §38 the programme did not stop; only the part that genuinely depends on the missing input was deferred. `CREATE: 0`. Three candidates are `DEFER_FOR_DATA`, four `REJECTED` on the merits (project management and IT are service lines the agency does not run; city × profession and new regional pages are frozen and independently indefensible as doorway pages).

`DEFER_FOR_DATA` is a **new status** in `lib/content/growth-cohorts.ts`, deliberately distinct from `FUTURE`. `FUTURE` means *assessed and not worth a URL yet*. `DEFER_FOR_DATA` means *could not be assessed*. Collapsing the second into the first is how a missing measurement quietly becomes a settled decision.

One input unblocks all three: Search Console read access, or an Ahrefs plan covering Site Explorer for the domain.

---

## 6. Gate status

| | |
|---|---|
| Typecheck · Lint | PASS · PASS |
| Unit tests | **377 passing** (18 files) |
| Playwright | **138 passing**, 8 viewports (320/360/375/390/430/768/1024/1440), 18 pages, 2 device projects |
| Validators | **16/16 PASS** — i18n, sitemap, seo, czech, czech-default, trust, tier1, legal, eeat, conversion, authority, growth, claims, clusters, regional, **authority-v4** |
| Security · Seznam | PASS · PASS |
| Mutation tests | **PASS** — 11 defects caught |

No existing validator was weakened. `validate-growth.mjs` changed in one cosmetic respect only: an empty cohort printed `max hops -Infinity`, which now reads `n/a (no pages)`. No threshold moved.

A pre-existing Playwright failure on the `mobile` project was fixed — it fails identically on the baseline tree, it was a defect in the test's element targeting rather than in the product, and no assertion was weakened. Details in `wave-4-authority-after.md` §5.

---

## 7. Constraints honoured

No new URLs · no regional pages · no city × profession pages · no second tracker · no custom emitter · no form-value, salary or personal-data telemetry · no backend · no fabricated claim · no existing gate weakened · UNKNOWN used instead of 0 throughout · no IndexNow submission.

---

## 8. State

**IMPLEMENTED ✅ · VALIDATED ✅ · PUSHED ✅ · MERGED ❌ · DEPLOYED ❌ · CRAWLED ❌ · INDEXED ❌ · RANKED ❌**

Validated means every gate above passes on this branch. It does not mean merged, deployed, crawled, indexed or ranked — those are separate states and none of them has happened.

**Stopping before merge, as instructed.** Awaiting owner review.

---

## 9. Reports

| Report | Covers |
|---|---|
| [`wave-4-baseline.md`](./wave-4-baseline.md) | Phases 0–1: baseline, deployment verification, the defect |
| [`wave-4-authority-matrix.md`](./wave-4-authority-matrix.md) | Phase 4: cluster edge matrix, before/after |
| [`wave-4-two-cluster-audit.md`](./wave-4-two-cluster-audit.md) | Phases 6–8: per-page classification |
| [`wave-4-high-skilled-candidates.md`](./wave-4-high-skilled-candidates.md) | Phases 9, 11: dedup and decisions |
| [`wave-4-search-evidence.md`](./wave-4-search-evidence.md) | Phase 10: evidence availability, UNKNOWN record |
| [`wave-4-authority-after.md`](./wave-4-authority-after.md) | Phase 17–18: post-repair crawl, browser QA |
| **`wave-4-final.md`** | This report |
