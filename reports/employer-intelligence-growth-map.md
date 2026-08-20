# Employer Intelligence & Growth — Implementation Map

**Branch:** `feat/employer-intelligence-growth` · **Baseline:** `419a26c` · **Measured:** 2026-08-20
**Method:** 8 parallel repository audits + adversarial verification of every CREATE/EXPAND proposal (13 agents, 0 errors), plus direct measurement recorded in [`employer-intelligence-growth-baseline.md`](./employer-intelligence-growth-baseline.md).

---

## ⚠️ STOP — the audit materially contradicts the programme brief

Per §24, this map stops before substantial implementation and reports the contradiction.

**63 candidate intents were audited across four families. The result was ZERO CREATE decisions.** Not one. The brief's planning ceiling of "approximately 5–10 genuinely justified new Employer Intelligence URLs" is not reachable on evidence — every candidate is already owned, already adjudicated, or blocked on search-demand evidence that does not exist.

Three further assumptions in the brief are already delivered:

| Brief assumption | Reality |
|---|---|
| §3.2 — homepage should communicate "finding people is easy, finding the *right* people is not" | **Already live, verbatim in Czech.** `pages/index.tsx:154-156`: *"Najít lidi je snadné. Najít ty **správné** už ne."* with the exact supporting argument at `:161-162` |
| §3.2 — homepage must not look like warehouse-only staffing | **Already dual-positioned.** Focus strip names *"Odborné a technické pozice"*; two named pillars with 5 role links each; hero sub covers both |
| §7.1 — build a path-derived attribution model with a `recruitment_economics` cluster | **Already exists**, and deliberately as a **facet** of `knowledge`, not a cluster — precisely to avoid invalidating the 11-cluster history the Wave 2–4 authority measurements are defined over |

**What the audit did find is a different, smaller and more valuable problem than the one the brief describes.** It is set out in §W.

---

## A. Verified baseline

See the baseline report. Headlines: 175 static / 0 dynamic; 185 canonical; **0** duplicate titles/descriptions/H1s/intros; **0** orphans; **0** query-param links; **0** broken links; commercial source-cluster diversity min 2 / median 3 / avg 3.64; max body similarity 0.765 (under every gate).

The hygiene and authority layers are clean. This programme cannot create value there.

## B. Current information architecture

```
homepage (identity + routing, funnelStage=awareness, commercialIntent=medium)
   ├── pillar A  Provozní profese      → 5 industry roles
   ├── pillar B  Odborné a technické   → 5 technical roles → /nabor-odbornych-pozic
   ├── payroll calculator (embedded)
   └── /pro-zamestnavatele  (pageType=hub, commercialIntent=high)
            └── EmployerSituations — 13 situation cards, volume AND technical
                     → /poptavka-pracovniku (25-field schema, mailto-first)
```

## C. Current employer journey — the five questions

| Question | Answered? | Evidence |
|---|---|---|
| Who are you? | **Weakly** | Badge *"Personální agentura"* + H1. The legal operator appears only in JSON-LD and the footer |
| What can you recruit? | **Yes — strongest answer** | Focus strip + two pillars with 10 role links |
| How does the process work? | **NO** | No process section on the homepage or `/pro-zamestnavatele`. The 3-step *"Od zadání po nástup ve třech krocích"* exists **only on `/agencies`, and only client-side** in `public/script.js` |
| Why trust you? | **NO** | No trust layer above the fold, by deliberate design after unverifiable figures were retired |
| What next? | **Misrouted** | See §W1 |

## D. Current professional / high-skilled coverage

23 `technical_talent` pages, **median 861 body words** — by far the deepest cluster in the corpus (others: 237–418). Coverage is genuinely strong; the positioning problem the brief describes is not a content problem.

## E–J. Candidate decisions — 63 audited, 0 CREATE

| Family | Audited | CREATE | EXPAND | MERGE | LINK_ONLY | DEFER_FOR_DATA | REJECT |
|---|---:|---:|---:|---:|---:|---:|---:|
| Recruitment economics | 8 | **0** | 0¹ | 0 | 1 | 1 | 6 |
| Workforce planning | 9 | **0** | 0 | 0 | 7 | 1 | 1 |
| Hiring operations | 12 | **0** | 0¹ | 1 | 0 | 0 | 11 |
| High-skilled (incl. 10 historical records) | 34 | **0** | 0¹ | 3 | 14 | 6 | 11 |
| **Total** | **63** | **0** | **0** | **4** | **22** | **8** | **29** |

¹ Five EXPAND proposals were raised by the first-pass auditors and **all five were refuted** by adversarial verification. See §K.

**DEFER_FOR_DATA (8)** — genuinely uncovered, but a CREATE decision requires search-demand evidence that does not exist: shift planning · recruitment budget · automation engineers · electrical engineers · mechanical engineers · supply-chain specialists · plus the historical `mzdove-rozpeti-odborne-pozice` and `prubeh-naboru-odborne-pozice`.

**Notable REJECTs with hard evidence:** *hiring brief* — `/zadani-pozice-a-profil-kandidata` carries the literal English phrase `'hiring brief'` in its keyword array and 743 body words across six sections. *Cost of Vacancy* — owned outright and now tool-backed.

## K. Cannibalisation analysis — and a correction to my own first pass

The adversarial pass overturned **every** EXPAND proposal. This is worth stating plainly, because I would otherwise have reported three "unexecuted merges" as findings and been wrong on all three:

| Proposal | First-pass claim | Verified verdict |
|---|---|---|
| Cost per Hire → expand `/cena-neobsazene-pozice` | "the tool already computes CPH line by line" | **REJECT.** False. The tool has **no hire-count divisor** — the defining operation of cost-per-hire. 6 of its 12 fields are vacancy-only. The proposed host's charter excludes the topic |
| Cost of Turnover → expand `/neprime-naklady-na-zamestnance` | "the Wave 2 merge was never executed" | **LINK_ONLY.** The merge *was* executed — that page already carries the full turnover component list as its primary bullets |
| candidate screening → expand `/nabor-zamestnancu` | "merge never executed; 0 occurrences of 'screening'" | **REJECT.** The grep is accurate but tests for a loanword, not for the decision the merge describes |
| reference checking → expand | — | **MERGE_WITH_EXISTING** |
| PLC programmers → expand `/nabor-techniku-automatizace` | "PLC appears 0× in body" | **DEFER_FOR_DATA.** The literal claim holds; the "act now" half does not |

**Conclusion: there is no unexecuted-merge debt.** The corpus is in better shape than the first pass suggested.

## L. Internal graph plan

No new page ⇒ no new graph work is required. Current state already satisfies the brief's standard: 0 pages fed by a single cluster, median 3 source clusters, 0 orphans.

## M–N. Conversion architecture & homepage positioning

Positioning is done (§⚠️). Conversion is not — see §W.

## O. Case-study architecture

**Verified client evidence: zero.** Recommendation: **publish nothing, and build no infrastructure yet.**

Building a schema now would create a validator, a content type and a registry for a data set that does not exist and has no supply date — and it collides head-on with gates written to keep exactly these claims off the site (`validate:claims` bans placement counts and success rates; `validate:eeat` bans every `Review`/`AggregateRating` token site-wide). The honest sequence is: obtain one real, permissioned engagement first; build the model to fit it.

## P. Attribution architecture

No change required or proposed. One installation, 12 fixed fields, no custom-event API, no PII reachable, `recruitment_economics` already modelled as a facet.

## Q. Legal / trust constraints — a hard blocker on part of §3.2

`agencyPermission`, `permissionScope`, `permissionValidity` and `companyId` are **all `unverified` with null values**. The brief asks the homepage to communicate *"workforce solutions where supported by the operator's verified legal scope"* — **that scope is not verified.**

This is a §23 stop condition ("licence scope is unknown but required by copy"). It is an unsupplied owner input, not a code defect: the operator must supply MPSV evidence (permitted mediation form/categories, validity, source + access date).

## R. Privacy constraints

No new telemetry proposed. One risk item found — §W4.

## S. Static / cache constraints

175 static / 0 dynamic must hold. Nothing proposed here changes rendering.

## T–U. Validator & mutation plan

Only if the §W work is approved. The genuinely missing gate is CTA coverage of bespoke pages — not a new employer-intelligence registry gate, since there are no new pages to register.

## V. Expected URL delta

**0 new URLs. 0 changed URLs. 0 redirects.**

## W. What the audit actually found — verified defects, ranked

Each verified by me directly, not only by an agent.

### W1. The homepage's primary employer CTA points at a placeholder — **most severe**

`pages/index.tsx:103` — the hero's largest button, **`"Hledám pracovníky"`** (*I'm looking for workers*), points to **`/agencies`**, whose `<h1>` is *"Najděte správného agenturního partnera"* and whose first section reads **`"Seznam agentur již brzy"`** (*agency list coming soon*).

The site's biggest employer button sends buying employers to a marketplace page with a "coming soon" placeholder — not to the 25-field request form.

### W2. Zero in-body conversion links on any hand-written page

**0** button CTAs to `/poptavka-pracovniku` across all 13 hand-written pages. The flagship calculator's primary CTA is `"Poptat pracovníky"` → **`/submit-offer`** (`pages/kalkulacka-…tsx:955`), a bare mailto page. `"poptat pracovníky"` is literally one of the ten `EMPLOYER_REQUEST` patterns in `validate:cta-routing` — this CTA **would fail that gate today** if the page were in the registry.

Also mislabelled: `index.tsx:290` `"Poslat poptávku →"` → `/contact`.

### W3. `validate:cta-routing` structurally cannot see any of this

`scripts/validate-cta-routing.mjs:220` audits `SEO_PAGES` only. The 13 hand-written pages — including the homepage and the calculator, the two highest-intent surfaces — are invisible to it. My own PR #35/#38 work fixed the 162 registry pages and left the most valuable surfaces ungated.

### W4. The calculator share link encodes wage data into a URL

`pages/kalkulacka-…tsx:381` base64-encodes the **entire `PayrollInput`** — wage, bonuses, deductions, agency fee — into `?d=`.

Stated fairly: this is a **deliberate, user-initiated share feature**; it is clipboard-only and the site transmits nothing. But the resulting URL carries salary data, nothing warns the user, and **nothing gates what a future edit may put in `?d=`**. Note the sibling `?mode=` param carries the comment *"Non-sensitive mode hint… No salary"* — the authors were thinking about exactly this risk for the other parameter.

### W5. `lib/attribution/index.ts` cites tests that do not exist

Its header says *"Design rules, enforced by tests in ./attribution.test.ts"*. `lib/attribution/` contains **only `index.ts`**. Several rules *are* enforced elsewhere, but the session-limited rule (never localStorage/cookies/URL) is asserted for no file that implements it.

### W6. No process explanation where buyers land

The 3-step *"Od zadání po nástup ve třech krocích"* exists only on `/agencies` and only client-side. §4.1C is a real gap.

### W7. Payroll freshness is ungated

`LAST_VERIFIED = '2026-07-18'`; today is 2026-08-20. Not wrong today, but no gate compares any date to the clock.

## X. Stop-condition status

| Condition | Status |
|---|---|
| Existing intent ownership unclear | **No** — 63 candidates adjudicated with evidence |
| Proposed URL overlaps another | **N/A** — zero proposed |
| Legal claim unverifiable | **YES** — permit scope unverified (§Q) |
| GSC evidence required for a CREATE | **YES** — 8 DEFER_FOR_DATA |
| Static rendering would regress | No |
| Czech URL migration needed | No |
| Backend required | No |
| WebmasterID would transmit new data | No |
| Implementation requires weakening a validator | No |
| main changed underneath the branch | No |

---

## Recommended scope, if approved

Not the programme as written. A single focused batch addressing W1–W3 and W6:

1. Re-point the homepage hero employer CTA and the calculator CTA to `/poptavka-pracovniku`; fix the mislabelled `/contact` button.
2. Extend `validate:cta-routing` to cover bespoke pages and components, with mutation tests — closing the gap that let W1/W2 exist.
3. Surface the existing 3-step process on the employer surfaces (content already written, only client-side on the wrong page).
4. Record W4/W5/W7 as tracked debt with owner decisions.

**0 new URLs. 0 content expansion. No GSC dependency.** §21 explicitly permits this work without search evidence.

**Awaiting approval — nothing implemented.**
