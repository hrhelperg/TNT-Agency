# Wave 2 — Implementation Map

**Baseline SHA:** `1106bd6dce7a5312a450939129982334af27d926` (origin/main, clean tree)
**Status:** DISCOVERY COMPLETE · nothing implemented, merged or deployed.

Every number below was measured from the repository at this SHA — registry objects imported directly, and a real `next build` + `next start` crawl. No figure is carried over from a previous report.

---

## A. Exact current baseline

| Measure | Value |
|---|---|
| Canonical URLs (sitemap = route inventory) | **175** |
| Next routes / static public HTML | 165 / 10 |
| `SeoPage` registry objects | 152 |
| Tier 1 / 2 / 3 / 4 | 14 / 76 / 74 / 11 |
| Orphans | **0** |
| Near-orphans | 4 (all Tier 4 legal, footer-discoverable) |
| Contextually unreachable | 3 (`terms*.html`) |
| Avg click depth (all) / (contextual) | 1.98 / **2.54** |
| **Max contextual depth** | **5** |
| Contextual inbound: min / median / avg / max | **1** / 4 / 9.8 / 155 |
| Request-page inbound (all / contextual) | 164 / **154** |
| Calculator inbound (all / contextual) | 164 / **155** |
| Registry pages reaching request + calculator | 152 / 152 |
| Duplicate title / description / intro / heroSubtitle | 0 / 0 / 0 / 0 |
| Vitest | 360 passing |

### Registry composition (152 objects)

cornerstone 3 · support 10 · geo 5 · employer-intelligence 7 · regions 22 (generated) · foreign-workers 20 · employer-operations 22 · industry-recruitment 24 · city-recruitment 20 · professional-recruitment 19.

### Two pre-existing weaknesses found (not caused by Wave 1)

1. **The generated regional cluster is the corpus's doorway risk.** 146 page pairs sit at ≥0.55 body similarity; the top 15 are all `naklady-na-zamestnance-*` / `trh-prace-*` pairs at **0.81–0.85**, just under the 0.90 gate. These 22 pages are A/B-varied template output.
2. **The thinnest and least-linked pages are the city and nationality pages.** `pracovnici-<city>` ×10 have exactly **1 contextual inbound each at depth 3** and 194–201 words; `prace-pro-<nationality>-v-cr` ×4 have 1 inbound at depth 4. The two FAQ hubs are the thinnest in the corpus (163 and 166 words).

**Consequence for Wave 2: no new regional or city pages, and no new page may depend on that cluster for its inbound links.**

---

## B. Cannibalization map (what already owns each intent)

| Intent territory | Owner | Wave 2 implication |
|---|---|---|
| Specialist hub / taxonomy | `/nabor-odbornych-pozic` (19 inbound, depth 1) | **EXPAND — do not create a second technical hub** |
| Employer hub / knowledge | `/pro-zamestnavatele` (71 inbound, depth 1) | **EXPAND into the Knowledge Center** |
| CNC ladder incl. programmer | `/nabor-cnc-operatoru` | blocks a separate CNC-programmer page |
| Welding | `/nabor-svarecu` | blocks welding candidates |
| Electrical | `/nabor-elektrikaru` | blocks electrician candidates |
| Maintenance / mechanics / mechatronics | `/udrzba-a-technicky-servis` | blocks maintenance candidates |
| Quality ladder incl. quality engineer, metrology | `/pozice-v-rizeni-kvality` | blocks quality candidates |
| Foreman / team leader / supervisor | `/mistri-a-vedouci-smen` | blocks leadership candidates |
| Logistics professional tier | `/odborne-pozice-v-logistice` | blocks logistics-planner candidates |
| Qualification & authorisations | `/odborna-zpusobilost-a-opravneni` | blocks qualification-verification page |
| Time-to-hire | `/jak-dlouho-trva-obsazeni-pozice` | blocks "how to reduce time-to-hire" |
| Stuck vacancy diagnosis | `/proc-se-nedari-obsadit-odbornou-pozici` | blocks "hard-to-fill" page |
| Agency vs direct model | `/jak-funguje-pracovni-agentura` + `/primy-nabor-zamestnancu` | blocks agency-vs-HR comparison pages |
| Shortage by sector | `nedostatek-pracovniku-*` ×5 | blocks a 6th entry in the series |
| Turnover / retention | `fluktuace-*` ×3 + `/retence-zamestnancu` | blocks turnover pages |
| Employee cost | `/kolik-stoji-zamestnanec`, `/skutecne-naklady-*`, `/neprime-naklady-*` | **does not** cover *vacancy* cost |

### Verified zero-coverage (grep across all registries, sense-checked)

- **`PLC` / `automatizac*` — 0 occurrences sitewide.** Complete gap.
- `inženýr` — 4 occurrences, all passing mentions in one file.
- `konstruktér` — 2 passing mentions.
- `technolog` as a **job title** — 5 occurrences (disambiguated from 29 uses of `technologie`, the same trap that produced a false "covered" reading in Wave 1 discovery).
- `hromadn*` — 1 occurrence.
- `absenc*` — 6 passing mentions, no dedicated page.

---

## C. Candidate matrix and decisions

### Cluster A — High-skilled & technical talent (27 candidates → 4 CREATE)

| Candidate | Decision | Evidence |
|---|---|---|
| Automation technician | **CREATE** `/nabor-techniku-automatizace` | 0 sitewide coverage; distinct qualification stack (elektro + PLC + robotics) |
| PLC specialist / programmer | MERGE → automation page | same buyer, same brief; alone too narrow |
| Mechanical / electrical engineer | **CREATE** `/technicti-inzenyri` | engineering tier absent; 4 passing mentions only |
| Production / process / industrial engineer | MERGE → `/technicti-inzenyri` | one buyer, one brief structure |
| Technologist | **CREATE** `/technologove-a-konstrukteri` | 5 passing mentions; named in `/thp-pozice` but never explained |
| CAD / CAM / CAD-CAM specialist | MERGE → `/technologove-a-konstrukteri` | tooling skill, not a separate hiring intent |
| Procurement specialist / buyer / supply chain | **CREATE** `/nakup-a-zasobovani` | 7 passing mentions; distinct buyer and screening axis |
| CNC programmer | **EXPAND** `/nabor-cnc-operatoru` | page already teaches the obsluha→seřizovač→programátor ladder |
| CNC setter, CNC operator | REJECT | in the existing page's own title |
| Electrical technician, industrial electrician | REJECT | `/nabor-elektrikaru` |
| Maintenance technician, industrial maintenance, industrial mechanic, mechatronics | REJECT | `/udrzba-a-technicky-servis` |
| Quality engineer, QC specialist, metrology | REJECT | `/pozice-v-rizeni-kvality` covers the full ladder |
| Welding specialist | REJECT | `/nabor-svarecu` |
| Foreman, team leader, production supervisor | REJECT | `/mistri-a-vedouci-smen` |
| Logistics specialist / planner | REJECT | `/odborne-pozice-v-logistice` |

### Cluster B — Employer problems (13 candidates → 4 CREATE)

| Candidate | Decision | Evidence |
|---|---|---|
| Ramp-up of a new line / new shift | **CREATE** `/nabor-pri-nabehu-vyroby` | `/planovani-naboru` is generic; ramp-up has its own sequencing |
| Seasonal capacity increase | **CREATE** `/sezonni-navyseni-kapacity` | named nowhere as an intent |
| High absence | **CREATE** `/absence-v-provozu` | 6 passing mentions; turnover has 4 pages, absence none |
| Large-volume hiring (20/50/100) | **CREATE** `/hromadny-nabor-pracovniku` | 1 occurrence sitewide; **framed strictly as planning scenarios** (§6) |
| Staffing reserve | MERGE → `/absence-v-provozu` | reserve is the answer to absence/attrition |
| Replacement hiring | MERGE → `/planovani-naboru` (EXPAND) | |
| Shortage of qualified workers | MERGE → `/nedostatek-pracovniku-v-cr` (EXPAND) | avoids a 6th `nedostatek-*` template sibling |
| Hard-to-fill / reduce time-to-hire / technical specialist hiring | REJECT | owned by three Wave 1 pages |
| Agency vs in-house HR / when to use an agency / direct hiring | REJECT | owned by `/jak-funguje-pracovni-agentura` + `/primy-nabor-zamestnancu` |

### Cluster C — Knowledge Center (17 candidates → 2 CREATE)

| Candidate | Decision | Evidence |
|---|---|---|
| Cost of an unfilled position | **CREATE** `/cena-neobsazene-pozice` | three cost pages exist, all about *employee* cost; vacancy cost is the missing decision aid |
| Hiring brief / candidate profile | **CREATE** `/zadani-pozice-a-profil-kandidata` | Wave 1 recorded this as FUTURE (`profil-odborne-pozice`); broadened beyond specialist-only |
| Candidate screening, reference checks, evaluating technical candidates | MERGE → the brief page | one decision, one page |
| Cost of turnover | MERGE → `fluktuace` pages (EXPAND) | |
| Workforce planning / demand forecasting | MERGE → `/planovani-naboru` (EXPAND) | |
| Onboarding larger cohorts | MERGE → `/hromadny-nabor-pracovniku` | |
| Shift planning | **DEFER** | HR-ops rather than hiring intent; revisit once the cluster is proven |
| Recruitment risk | **DEFER** | no differentiated substance yet |
| Onboarding, absence, retention, direct-vs-agency, qualification verification, recruitment process | REJECT | all owned |

### Re-confirmed Wave 1 deferrals

`prubeh-naboru-odborne-pozice` **DEFER again** (ships as a hub section) · `mzdove-rozpeti-odborne-pozice` **DEFER again** (salary-adjacent; needs the cluster proven first) · `nabor-ridicu` **DEFER again** (different buyer) · city × profession **REJECTED permanently**.

---

## D. Proposed URL additions — 10 new pages

**175 → 185 canonical (+5.7%).**

| # | URL | Cluster | Parent hub |
|---|---|---|---|
| 1 | `/nabor-techniku-automatizace` | A | `/nabor-odbornych-pozic` |
| 2 | `/technicti-inzenyri` | A | `/nabor-odbornych-pozic` |
| 3 | `/technologove-a-konstrukteri` | A | `/nabor-odbornych-pozic` + `/thp-pozice` |
| 4 | `/nakup-a-zasobovani` | A | `/nabor-odbornych-pozic` + `/odborne-pozice-v-logistice` |
| 5 | `/nabor-pri-nabehu-vyroby` | B | `/pro-zamestnavatele` |
| 6 | `/sezonni-navyseni-kapacity` | B | `/pro-zamestnavatele` |
| 7 | `/absence-v-provozu` | B | `/pro-zamestnavatele` |
| 8 | `/hromadny-nabor-pracovniku` | B | `/pro-zamestnavatele` |
| 9 | `/cena-neobsazene-pozice` | C | `/pro-zamestnavatele` |
| 10 | `/zadani-pozice-a-profil-kandidata` | C | `/pro-zamestnavatele` + `/nabor-odbornych-pozic` |

### Existing pages expanded (no new URL)

`/nabor-odbornych-pozic` (4 new families) · `/pro-zamestnavatele` (Knowledge Center IA) · `/nabor-cnc-operatoru` (programmer intent) · `/thp-pozice` · `/udrzba-a-technicky-servis` · `/odborne-pozice-v-logistice` · `/planovani-naboru` · `/nedostatek-pracovniku-v-cr` · `fluktuace` cluster.

---

## E. Internal-link architecture

```
/  homepage  (both pillars already server-rendered, depth 0)
├── /pro-zamestnavatele — KNOWLEDGE CENTER hub (d1, 71 inbound)
│     ├── Hiring        → nabor-pri-nabehu-vyroby · sezonni-navyseni-kapacity · hromadny-nabor-pracovniku
│     ├── Costs         → cena-neobsazene-pozice → calculator
│     ├── Operations    → absence-v-provozu
│     └── Screening     → zadani-pozice-a-profil-kandidata
└── /nabor-odbornych-pozic — TECHNICAL TALENT hub (d1, 19 inbound)
      ├── nabor-techniku-automatizace ── udrzba-a-technicky-servis · nabor-elektrikaru
      ├── technicti-inzenyri ─────────── technologove-a-konstrukteri · pozice-v-rizeni-kvality
      ├── technologove-a-konstrukteri ── thp-pozice · strojirenske-profese
      └── nakup-a-zasobovani ─────────── odborne-pozice-v-logistice · thp-pozice
                          ↓
        every page → /poptavka-pracovniku (auto-injected + contextual)
```

Both hubs sit at **contextual depth 1**, so all 10 new pages land at **depth 2** — well inside the `NEAR_ORPHAN_DEPTH = 4` budget and below the current max of 5. Target: **≥3 contextual inbound per new page**, sourced from the hubs and from topically adjacent existing pages, never from the weak city/region cluster.

---

## F. Conversion architecture (Layer 2.0)

Existing architecture to reuse, not replace: `CTA_SOURCES` allowlist + `buildCtaHref()` (which structurally cannot put a value in the URL) + `data-request-source` captured to sessionStorage by `CtaSourceCapture`.

Planned: extend `CTA_SOURCES` with `technical-talent`, `employer-problem`, `knowledge`, and add matching `CtaVariant` copy in cs/en/de so a profession page asks for *candidates for that role*, a problem page offers to *discuss that problem*, and a knowledge page routes to the relevant decision aid. Sticky CTA: **evaluate at 320/390/768/1024/1440 before committing** — it is not pre-approved.

---

## G. WebmasterID measurement — OWNER DECISION REQUIRED

I read `lib/analytics/webmasterid.ts` and its verified-behaviour notes rather than assuming. The integration loads the vendor's own bundle (`webmasterid.com/tracker.iife.min.js`); **the repository holds no custom-event or custom-dimension API.** The verified payload is fixed:

`site_id, timestamp, language, user_agent, screen_width, anonymous_session_id, anonymous_visitor_id, event_name, url, pathname, referrer, title`

Consequences for the requested design:

- **`source_cluster`, `cta_type`, `recruitment_intent` as event dimensions cannot be implemented.** The tracker accepts no such fields. Inventing a parallel emitter would mean installing a second tracker, which §15 forbids.
- **`mailto:` clicks are never transmitted** by the bundle — and the entire lead flow is mailto. There is no click event to enrich.
- Form events fire **only** for an element carrying `data-wmid-form`, sending only that attribute's literal value and never input values.

**What is achievable without new data collection:** cluster and intent are already derivable from `pathname`, which the tracker sends today. A documented, versioned path→cluster mapping in the repo turns existing data into the requested report with **zero** new payload fields and zero new privacy surface.

**Decision needed from you:** (a) ship the pathname-derived cluster mapping only — my recommendation; or (b) additionally add `data-wmid-form="employer-request"` to the request form, which would emit one extra event carrying that static string and nothing else. I will not add (b) unilaterally: it changes what leaves the visitor's browser.

---

## H. Source requirements

New factual ground needing primary sources: NV 194/2022 Sb. (already in registry) for automation/electrical competence · zák. 250/2021 Sb. for VTZ · zák. 179/2006 Sb. / NSK and NSP for engineering and technologist role definitions · zák. 373/2011 Sb. + vyhl. 79/2013 Sb. for occupational medical examinations in ramp-up and volume hiring · ISPV for any salary-adjacent question (deferred to the source, never stated).

Every claim will be labelled by class — **LEGAL REQUIREMENT · REGULATED QUALIFICATION · COMMON INDUSTRY REQUIREMENT · EMPLOYER-SPECIFIC · RECOMMENDED SCREENING SIGNAL** — per §3, so a common industry expectation is never presented as law.

---

## I. Risks

1. **Similarity.** Four technical family pages share a structure. Mitigation: the cohort gate already enforces stricter-than-corpus thresholds (0.70 intro / 0.85 body); each page is anchored to a different qualification instrument.
2. **Volume-hiring numbers.** `/hromadny-nabor-pracovniku` must never imply delivered volumes. Mitigation: framed as planning scenarios; the claims gate already blocks placement counts.
3. **Hub dilution.** `/nabor-odbornych-pozic` gains 4 children and `/pro-zamestnavatele` 6. Both are depth 1 with strong inbound; measured after the crawl.
4. **Absence page drifting into HR-blog territory.** Mitigation: employer-decision structure per §5, not an article.

---

## J. Batching

| Batch | Content | Gate |
|---|---|---|
| **2A** | Cluster A: 4 pages + hub expansion + cohort registry | full gate + crawl |
| **2B** | Cluster B: 4 problem pages | full gate + crawl |
| **2C** | Cluster C: 2 pages + Knowledge Center IA on `/pro-zamestnavatele` | full gate + crawl |
| **2D** | Conversion 2.0 + pathname→cluster mapping + validator extensions | full gate + crawl + browser QA |

One shared taxonomy (the growth cohort registry) and one internal-link architecture across all four — not four mini-systems.

---

## K. Explicit state

IMPLEMENTED ❌ · VALIDATED ❌ · MERGED ❌ · DEPLOYED ❌ · CRAWLED ❌ · INDEXED ❌ · RANKED ❌

Discovery only. No branch created yet, no file modified.
