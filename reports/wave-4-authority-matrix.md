# Wave 4 — Phase 4: Cluster Authority Matrix

Machine-readable source: [`wave-4-authority-matrix.json`](./wave-4-authority-matrix.json).
Measured from the **rendered** contextual link graph (185 URLs, real production build), before and after the Phase 5 repair.

Contextual scope = everything between the global `<header>` and `<footer>`: `<main>` including the `nav.internal-links` related-links block, plus the page-level CTA section. Site chrome is excluded.

---

## 1. Self-links versus cross-cluster links

| | Before | After |
|---|---|---|
| Same-cluster edges (self-loops) | 710 | **710** |
| Cross-cluster edges | 2,376 | **2,404** |
| Cross-cluster share | 77.0% | **77.2%** |

**Every link Wave 4 added crosses a cluster boundary. Not one reinforced an existing loop.** The self-loop count is byte-identical before and after — the repair was purely additive across boundaries, which is the only kind of link this wave was permitted to add.

---

## 2. Edges that changed

| From | To | Before | After | Δ |
|---|---|---:|---:|---:|
| knowledge | industry | 11 | 20 | **+9** |
| employer_problem | industry | 16 | 22 | +6 |
| employer_problem | technical_talent | 8 | 12 | +4 |
| technical_talent | industry | 18 | 20 | +2 |
| technical_talent | region | 0 | 2 | +2 |
| technical_talent | employer_problem | 1 | 2 | +1 |
| industry | knowledge | 103 | 104 | +1 |
| employer_problem | knowledge | 62 | 63 | +1 |
| region | knowledge | 222 | 223 | +1 |
| region | technical_talent | 34 | 35 | +1 |

Ten edge types moved; **28 new cross-cluster edges** in total. No edge decreased.

---

## 3. Self-loop profile (unchanged)

| Cluster | Self-links |
|---|---:|
| foreign_workers | 168 |
| knowledge | 164 |
| region | 153 |
| technical_talent | 106 |
| industry | 63 |
| other | 32 |
| employer_problem | 20 |
| request / trust | 2 / 2 |

`technical_talent` at 106 self-links against 1 outbound edge to `employer_problem` was the baseline's starkest imbalance. It is now 2 — still small in absolute terms, and honestly so: the repair added the connections that were *semantically justified*, not the number that would make the ratio look better. See §5.

---

## 4. What the repair did, by pattern

Twenty edge groups were added to the two central injection maps in `lib/content/pages/index.ts` (9 merged into existing keys, 11 new keys). Each follows one of three justified patterns:

1. **Sector shortage → the roles that are actually short.** `/nedostatek-pracovniku-ve-vyrobe` now names `/nabor-svarecu` and `/nabor-cnc-operatoru`. A reader researching a production shortage is looking for exactly these roles; previously the shortage page described the problem and stopped.
2. **Operational knowledge → the roles it governs.** Onboarding and induction pages now route to the operational role families they apply to.
3. **Commercial terms → industry context.** Contract and fee pages now route to the sector pages that give those terms a concrete setting.

Each group was checked against §9 of the brief before being added. Groups that could not be justified were not added — which is why 15 pages remain at two clusters.

---

## 5. What was deliberately *not* linked

`technical_talent → employer_problem` remains at 2, not 15. The obvious way to raise it would be to link every trade page to `/proc-se-nedari-obsadit-odbornou-pozici`. That was rejected: those trade pages already carry their own diagnosis section, so the link would send a reader to a page that repeats what they just read. A link that wastes the reader's click is worse than a missing link, and it is exactly the "irrelevant link" the Phase 15 gate is built to fail.

Three clusters is a target, not a quota.
