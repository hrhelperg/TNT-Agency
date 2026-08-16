# Wave 4 — Phases 6–8: Two-Cluster Audit

Every commercial page fed by exactly two source clusters, classified per §8. The governing instruction: *"3 clusters is a TARGET, not an arbitrary requirement. If the third cluster is semantically artificial: KEEP_TWO_CLUSTERS. Never add irrelevant links merely to produce '3'."*

Registry view (what the gate reads): **41 → 22**.
Rendered view (what Google reads): **32 → 15**.

The two views differ because the rendered page also carries hub-list and prose links the registry's `internalLinks` array does not model. The registry view is the stricter of the two, and it is the one gated.

---

## 1. Repaired — 21 pages gained a third or fourth cluster

| Page | Clusters | Now fed by |
|---|---|---|
| `/pracovnici-do-vyroby` | 3 → 4 | employer_problem, industry, knowledge, technical_talent |
| `/vyrobni-zamestnanci` | 3 → 4 | employer_problem, industry, knowledge, technical_talent |
| `/naklady-na-zamestnance-cr` | 3 → 4 | calculator, employer_problem, knowledge, region |
| `/pozice-v-rizeni-kvality` | 3 → 4 | homepage, industry, region, technical_talent |
| `/nabor-svarecu` | 2 → 3 | employer_problem, industry, technical_talent |
| `/nabor-cnc-operatoru` | 2 → 3 | employer_problem, industry, technical_talent |
| `/nabor-elektrikaru` | 2 → 3 | employer_problem, industry, technical_talent |
| `/stavebni-profese` | 2 → 3 | employer_problem, industry, technical_talent |
| `/odborne-pozice-v-logistice` | 2 → 3 | employer_problem, industry, technical_talent |
| `/manipulacni-pracovnici` | 2 → 3 | employer_problem, industry, technical_talent |
| `/logisticti-pracovnici` | 2 → 3 | employer_problem, industry, technical_talent |
| `/montazni-pracovnici` | 2 → 3 | employer_problem, industry, knowledge |
| `/skladovi-pracovnici` | 2 → 3 | employer_problem, industry, knowledge |
| `/picker-packer` | 2 → 3 | employer_problem, industry, knowledge |
| `/pracovnici-pro-ecommerce-sklady` | 2 → 3 | employer_problem, industry, knowledge |
| `/pomocni-stavebni-pracovnici` | 2 → 3 | employer_problem, industry, knowledge |
| `/baleni-potravin-pracovnici` | 2 → 3 | employer_problem, industry, knowledge |
| `/montazni-linky-pracovnici` | 2 → 3 | employer_problem, industry, knowledge |
| `/nabor-zamestnancu` | 2 → 3 | industry, knowledge, technical_talent |
| `/hromadny-nabor-pracovniku` | 2 → 3 | employer_problem, knowledge, technical_talent |
| `/cena-neobsazene-pozice` | 2 → 3 | knowledge, region, technical_talent |

All 21 classified `ADD_CROSS_CLUSTER_LINKS`. **0 pages regressed.**

---

## 2. KEEP_TWO_CLUSTERS — 15 pages, with the reason each

These are not unfinished work. In each case the available third cluster would have produced a link the reader does not want.

| Page | Fed by | Why two is correct |
|---|---|---|
| `/proc-se-nedari-obsadit-odbornou-pozici` | knowledge, technical_talent | It *is* the diagnosis. A shortage page linking here would duplicate its own diagnosis section. |
| `/jak-dlouho-trva-obsazeni-pozice` | knowledge, technical_talent | Timeline question asked by employers already in a hiring process; industry framing adds nothing. |
| `/cena-sluzeb-personalni-agentury` | knowledge, technical_talent | Commercial-terms page. Its readers arrive from research, not from a sector. |
| `/smlouva-s-personalni-agenturou` | knowledge, technical_talent | As above — a contract question is sector-neutral. |
| `/prime-osloveni-kandidatu` | knowledge, technical_talent | Sourcing method. Applies across sectors, so no sector owns the referral. |
| `/zadani-pozice-a-profil-kandidata` | knowledge, technical_talent | The brief precedes sector choice. |
| `/technicti-inzenyri` | region, technical_talent | Umbrella page; industry pages correctly route to concrete roles instead. |
| `/uznavani-kvalifikace-zahranicnich-pracovniku` | foreign_workers, technical_talent | Its two clusters *are* the intersection it serves. |
| `/nejcastejsi-chyby-zamestnavatelu` | knowledge, technical_talent | General-employer content; a sector link would narrow it falsely. |
| `/fluktuace-zamestnancu` | employer_problem, knowledge | Turnover is diagnosed and solved inside those two clusters. |
| `/jak-snizit-fluktuaci` | employer_problem, knowledge | As above. |
| `/neprime-naklady-na-zamestnance` | employer_problem, knowledge | Cost analysis; sector links would imply sector-specific figures the page does not publish. |
| `/nabor-pri-nabehu-vyroby` | employer_problem, knowledge | Ramp-up is a scenario, not a sector. |
| `/vyroba-potravin-pracovnici` | industry, knowledge | Narrow sector page; the honest third cluster does not exist. |
| `/automobilovy-prumysl-pracovnici` | industry, technical_talent | As above. |

Five of these are additionally recorded as documented exceptions in the Phase 15 gate, each with the floor it is documented at — so the decision is enforced, not just written down.

---

## 3. Classifications not used

| Class | Count | Note |
|---|---|---|
| `IMPROVE_EXISTING_CONTEXT` | 0 | No page needed rewording to justify a link; the gaps were structural. |
| `MERGE_INTENT` | 0 | No two-cluster page duplicated another's intent. |
| `CONTENT_GAP` | 0 | No gap survived Phase 9 dedup — see `wave-4-high-skilled-candidates.md`. |
| `NEEDS_EVIDENCE` | 0 | Diversity repair needs no search data; it is measured internally. |

---

## 4. Aggregate effect

| Measure | Before | After |
|---|---|---|
| Commercial pages at 2 clusters (registry) | 41 | **22** |
| Commercial pages at 3+ clusters (registry) | 40 | **59** |
| Source clusters avg (registry) | 2.88 | **3.14** |
| Source clusters avg (rendered) | 3.39 | **3.64** |
| Unique inbound sources, median (rendered) | 6 | **7** |
| Single-cluster dominance ≥75% (registry) | 17 | **10** |
| Single-cluster dominance ≥75% (rendered) | 13 | **5** |
| Single-cluster dominance >90% | 0 | **0** |
| Pages regressed | — | **0** |

The 22 that remain at two clusters in the registry view are the 15 above plus seven whose third cluster exists only in the rendered graph (hub-list links the registry does not model).
