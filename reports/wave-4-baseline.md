# Wave 4 — Phase 0–1: Baseline & Observation

**Baseline SHA:** `0b75b1b` (Wave 3 merged as PR #31) · **Branch:** `feat/wave-4-cross-cluster-authority-high-skilled`
**Measured:** 2026-08-15, from the repository and a real `next build` + `next start` crawl. Nothing carried over from the Wave 3 report.

---

## Stop-condition check

| Condition | Status |
|---|---|
| main materially differs from the assumed architecture | **No** |
| Wave 3 not actually merged | **Merged** — PR #31; merged tree byte-identical to the validated tip |
| Unresolved conflict | None; working tree clean |
| Baseline gates failing | **None** — 377 unit tests, 15 validators, typecheck, security, Seznam all green |

No stop condition triggered.

---

## A. Deployment state — correcting the previous report

Wave 3's own report recorded `DEPLOYED ❌`. **That is wrong, and this wave corrects it.** Production at `talentpartnerid.com` was fetched directly:

| Probe | Expectation if deployed | Result |
|---|---|---|
| `"Co cenu práce ovlivňuje"` (Wave 3 heading) | present | **present** |
| `"Celostátní pravidla a kde je ověřit"` (Wave 3 heading) | present | **present** |
| `"Obsazení po odchodu zaměstnance"` (Wave 3 §4 addition) | present | **present** |
| `"Agenturní zaměstnávání a soulad s předpisy"` (removed in Wave 3) | absent | **0 occurrences** |

**Wave 2 and Wave 3 are both DEPLOYED.** The removed block returning zero is the stronger signal — it proves the live HTML is the post-repair build, not a cached pre-repair one.

---

## B. Crawl baseline

| Measure | Value |
|---|---|
| Canonical URLs (sitemap = routes) | 185 |
| Non-200 · broken links · links to redirects · parameterized links | 0 · 0 · 0 · 0 |
| Non-self-canonical | 0 |
| Duplicate rendered titles / H1s | 0 / 0 |
| Orphans | 0 |
| Near-orphans (Tier 4, footer-discoverable legal) | 4 |
| Avg click depth (all links) | 1.99 |
| Avg click depth (contextual only) | 2.53 · max 5 |
| Request-page inbound | 164 |

The hygiene layer is clean. Wave 4 has nothing to fix in canonicals, duplicates, redirects or crawl errors — consistent with Wave 3's finding. **The remaining value is in topology, not hygiene.**

> **Instrument note.** These figures come from the Phase 1 crawler. Phase 17 found and fixed a defect in that crawler (it stripped every `<nav>`, deleting the `nav.internal-links` related-links block — precisely the links this programme edits). The before/after comparison in `wave-4-authority-after.md` therefore re-measures **both** sides with the corrected instrument rather than comparing across two different ones. Where the two instruments disagree, the corrected one is right and the numbers in this table are superseded.

---

## C. Commercial authority baseline (registry view)

81 commercial pages (`technical_talent`, `employer_problem`, `industry`, `knowledge`):

| Measure | Baseline |
|---|---|
| Fed by **1** source cluster | **0** |
| Fed by exactly **2** | **41** |
| Fed by **3+** | 40 |
| Source clusters min / median / avg / max | 2 / 2 / 2.88 / 6 |
| Unique inbound source pages min / median / avg | 3 / 6 / 9.8 |
| Single-cluster dominance ≥75% | 17 |
| Single-cluster dominance >90% | 0 |

Wave 3 eliminated the one-cluster pages. **Wave 4's target is the 41 pages sitting at exactly two** — half the commercial corpus.

---

## D. The defect Wave 4 exists to address

The cluster-edge matrix shows where authority actually flows. The headline:

```
technical_talent -> employer_problem = 1        (against 106 technical_talent self-links)
```

A reader on `/nabor-svarecu` is, by definition, an employer who cannot fill a welding role — they already have the hiring problem `/proc-se-nedari-obsadit-odbornou-pozici` diagnoses. The corpus almost never made that connection: **one edge in the entire technical→problem direction.** Meanwhile the same cluster linked to itself 106 times.

That is the shape of a site that has been built cluster by cluster and never connected across. It is a topology defect, not a content defect, and it cannot be fixed by publishing more pages.

---

## E. Expected shape of Wave 4

**New URLs expected: 0.** §23 of the brief makes zero an acceptable successful outcome, and the evidence gate (Phase 10) makes it the likely one — see `wave-4-search-evidence.md`.

This is a connect-and-verify wave:
1. cross-cluster link engineering against the measured edge matrix,
2. a gate that measures the *shape* of inbound authority rather than its volume,
3. high-skilled expansion decided on evidence — or explicitly deferred when the evidence does not exist.

---

## F. State

IMPLEMENTED ❌ · VALIDATED ❌ · PUSHED ❌ · MERGED ❌ · DEPLOYED ❌ · CRAWLED ❌ · INDEXED ❌ · RANKED ❌

Observation only.
