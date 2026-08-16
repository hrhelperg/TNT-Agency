# Wave 4 — Phases 9 & 11: High-Skilled Candidate Dedup and Decisions

Fresh dedup against the current registry — not carried over from Waves 1–3. Decisions are recorded in `lib/content/growth-cohorts.ts` under cohort `wave-4-cross-cluster-authority`, so a later wave cannot silently resurrect them.

---

## 1. What the corpus already owns

The high-skilled surface is not thin. 23 `technical_talent` pages are live:

**Hubs & positioning** — `nabor-odbornych-pozic`, `primy-nabor-zamestnancu`, `thp-pozice`
**Qualification & compliance** — `odborna-zpusobilost-a-opravneni`, `uznavani-kvalifikace-zahranicnich-pracovniku`
**Engineering trades** — `nabor-svarecu`, `nabor-cnc-operatoru`, `nabor-elektrikaru`, `strojirenske-profese`
**Technical functions** — `nabor-techniku-automatizace`, `technicti-inzenyri`, `technologove-a-konstrukteri`, `udrzba-a-technicky-servis`, `pozice-v-rizeni-kvality`
**Operations & logistics** — `mistri-a-vedouci-smen`, `odborne-pozice-v-logistice`, `nakup-a-zasobovani`
**Process & commercial** — `prime-osloveni-kandidatu`, `proc-se-nedari-obsadit-odbornou-pozici`, `jak-dlouho-trva-obsazeni-pozice`, `cena-sluzeb-personalni-agentury`, `jak-vybrat-personalni-agenturu`, `smlouva-s-personalni-agenturou`

Any new high-skilled URL must prove it is not a slice of one of these.

---

## 2. Decisions

| Candidate | Decision | Reason |
|---|---|---|
| High-skilled expansion **as a set** | **DEFER_FOR_DATA** | Every candidate turns on one question — does the intent have search demand separate from the page already covering it? That question has no answer (see `wave-4-search-evidence.md`). Deferred as a set rather than guessed at individually. |
| `mzdove-rozpeti-odborne-pozice` | **DEFER_FOR_DATA** | Deferred a third time, but for a new reason. Waves 2 and 3 deferred it on judgement; this time the blocker is a missing input. A salary-band page is the most evidence-sensitive page the site could publish and must not ship on an assumption. |
| `prubeh-naboru-odborne-pozice` | **DEFER_FOR_DATA** | Ships today as a section of `/nabor-odbornych-pozic`. Promotion was to be decided on whether that section draws independent impressions — exactly the unavailable measurement. |
| `nabor-projektovych-manazeru` | **REJECTED** | Not deferred — rejected on the merits, no data required. TNT places technical and operational staff; project management is a service line the agency does not run. The page would describe work we do not do. |
| `nabor-it-specialistu` | **REJECTED** | Rejected on the merits. A distinct market with distinct competitors and no operational overlap with manufacturing/logistics placement. Keyword coverage, not employer usefulness. |
| City × profession (`/cnc-operator-praha`, `/svarec-brno`, `/elektrikar-ostrava`, `/technici-pardubice`, siblings) | **REJECTED** | Frozen by §22 and independently indefensible: the profession page and the city page both already exist, and their intersection carries no information neither one has. Doorway pages by construction. |
| New regional / city pages | **REJECTED** | Regional freeze (§21) carried forward. Wave 3 repaired this family by removing duplicated national-law mass; adding members reopens the defect it just closed. |

**CREATE: 0. MERGE: 0. New URLs this wave: 0.**

---

## 3. Why DEFER_FOR_DATA is recorded as its own status

`lib/content/growth-cohorts.ts` previously had three statuses: `REJECTED`, `MERGED`, `FUTURE`. Wave 4 adds a fourth, because `FUTURE` would have been a lie here.

- `FUTURE` means *we assessed this and it is not worth a URL yet* — a judgement.
- `DEFER_FOR_DATA` means *we could not assess it, because the input was missing* — a gap.

Collapsing the second into the first is how a missing measurement quietly becomes a settled decision. Three of this wave's candidates are genuinely undecided; the registry now says so in a way the next wave cannot misread.

---

## 4. Zero new URLs is the finding, not a shortfall

§23 makes zero an acceptable outcome. It is also the correct one here: the corpus's measured defect was that its existing high-skilled pages were disconnected from the employer problems their readers arrive with — `technical_talent → employer_problem` was **1 edge against 106 self-links**. That is not fixed by adding a 24th technical page. It was fixed by connecting the 23 that already exist.
