# Czech Market Leadership Program — plan & status

Companion to `reports/czech-editorial-audit.md`, `reports/content-consolidation.md`
and `reports/google-indexability.{json,md}`. Czech is the **primary market**;
Czech quality is prioritised over EN/DE expansion. **No market-leadership claim
is made** — that requires external evidence (organic visibility, qualified Czech
traffic, citations, employer leads, branded search) that only later data can show.

## What Batch 1 delivered (this branch)

- **Canonical Czech terminology registry** — `lib/content/czech-terms.json` (data)
  + `lib/content/czech-terms.ts` (typed) + `lib/content/czech-terms.test.ts`.
- **Czech editorial gate** — `npm run validate:czech`: hard-fails on superlatives/
  guarantees/urgency/unverified-permit/placeholder copy in Czech content; reports
  terminology/diacritics/English-fragment/duplicated-intro review candidates
  (never rewrites). Aligned with the existing `lib/content/tone.ts`.
- **Editorial governance** — `docs/czech-editorial-governance.md` + an honest
  editorial-responsibility disclosure rendered on every content page
  (`SeoArticle`): "Redakčně zpracovala redakce TalentPartnerID … nikoli
  individuální právní poradenství."
- **Editorial audit** — `reports/czech-editorial-audit.md` (0 hard violations; 21
  review candidates; top finding = English-default chrome).

## Priority tiers (29.20)

**Tier 1 — commercial authority** (strongest editorial/trust/conversion work):
homepage, `/pro-zamestnavatele`, `/poptavka-pracovniku`, `/kalkulacka-mzdy-
agenturniho-zamestnance`, direct-vs-agency comparison, `/pracovnici-do-vyroby`,
`/pracovnici-do-logistiky`, `/pracovnici-do-skladu`, `/pracovnici-pro-automotive`,
`/pracovnici-pro-potravinarskou-vyrobu`, `/nabor-zahranicnich-pracovniku`,
`/nabor-zamestnancu-pardubice`, `/pracovnici-hradec-kralove`,
`/trh-prace-stredocesky-kraj`.

**Tier 2 — decision support:** employment costs, workforce planning, turnover,
onboarding, accommodation, transport, shift planning, compliance, permits,
employee card, blue card, inspections.

**Tier 3 — supporting long-tail:** individual roles, secondary cities/regions,
narrow glossary topics. **Do not create new Tier 3 pages until Tier 1 & Tier 2
reach the quality threshold.** (This aligns with `content-consolidation.md`:
strengthen or consolidate the templated region families rather than adding more.)

## Page-review rubric (29.19) — internal, 0–3 per dimension

Search-intent clarity · original value · Czech language quality · factual
accuracy · official sourcing · practical usefulness · first-hand operational
insight · author/reviewer transparency · distinct purpose · internal linking ·
conversion usefulness · mobile usability · accessibility · structured-data
accuracy · update governance. **Threshold:** a primary page below threshold is
improved / consolidated / temporarily removed from the sitemap / redirected —
never auto-deleted by score; editorial review required. (Scores kept internal,
not published.)

## Batches 2–8 (one reviewed production release per batch; no placeholders)

| Batch | Deliverable | Key owner inputs / gates |
|---|---|---|
| **2 — Tier 1 authority + CS default** | Make Czech the server default (chrome), rewrite Tier-1 SERP titles/descriptions (29.13, natural Czech, no *nejlepší/číslo 1/garantujeme*), reorganise the employer hub by **situation** (Chybí pracovníci na směně, Vysoká fluktuace, Pracovníci ze zahraničí, Nový provoz, Sezónní pracovníci, Přímý vs. agenturní, …) with decision checklist → calculator → legal guide → required-input checklist → request form. | Native-Czech review of every Tier-1 page. |
| **3 — Employer decision tools** | Client-side only, no backend, transmit nothing: (A) total employer-cost calculator with a **versioned Czech statutory ruleset** separated from employer assumptions; (B) direct-vs-agency model (no "agency is cheaper" claim); (C) shift-staffing planner (labelled planning support); (D) vacancy-cost estimator (employer's own inputs, no invented averages); (E) worker-request checklist generator (printable); (F) agency-comparison checklist. | Confirm statutory values per period; legal review of the ruleset. |
| **4 — Cornerstone guides** | ~15 definitive Czech guides (agenturní zaměstnávání; přímý vs. agenturní; skutečné náklady; příprava závodu; směny/doprava/ubytování; fluktuace; kvalitní poptávka; ověření agentury; EU vs. třetí země; kontrola inspektorátu; zaměstnanecká karta; nábor ze zahraničí; hodnocení dodavatele; contingency plan; prvních 30 dní). Each: exec summary, audience, decision framework, steps, responsibility matrix, documents, risks, mistakes, checklist, sources, review date, tool links, CTA — **distinct** intros/FAQ. | Specialist review for legal/immigration/payroll guides before claiming specialist review. |
| **5 — Labour-market intelligence** | Decision-oriented reports from primary sources (ČSÚ, MPSV, ÚP ČR, ČSSZ, MV ČR, Eurostat). Each states data period, publication date, source, retrieval date, methodology, scope, limitations, and whether it is official data / calculated / editorial. **Staffing Index (29.7): publish methodology + component dashboard first; no composite score until defensible data exists.** No press-release republishing. | Access to and interpretation of current official datasets. |
| **6 — Tier 2 decision-support** | Strengthen costs/planning/turnover/onboarding/accommodation/transport/shift/compliance/permits/cards/inspections to threshold. | Native-Czech review. |
| **7 — Consolidate weak Tier 3** | Apply `content-consolidation.md`: strengthen or consolidate the two templated region families (`naklady-na-zamestnance-*`, `trh-prace-*`); redirect only with sign-off. | Real regional content OR redirect approval. |
| **8 — Authority & distribution** | Brand-first, non-spam off-site plan (MPSV agency evidence, business registries, regional chambers, industry associations, real partners, HELPERG-owned sites). Business-profile (NAP) consistency. Per-opportunity record: target/relevance/eligibility/cost/policy/status/evidence. **No** bulk/auto/farm/reciprocal/paid-undisclosed links, **no** fake reviews/citations. | Owner to execute outreach; verified NAP. |

## Trust layer (29.3) — status: BLOCKED on verified data

There is **no dedicated company/trust page** and **no IČO / permit number /
permission scope** in the repository. Per the anti-fabrication rules I did **not**
invent them. What exists and is safe to state today (verified in-repo): legal
operator **TNT agency s.r.o.**, Pardubice address, phone `+420 776 858 284`,
email `jobbohemiacz@gmail.com`, and §14 zákona č. 435/2004 Sb. as the governing
statute. To build the trust page correctly, the owner must supply / confirm from
the **official MPSV agency evidence**: exact registered name, IČO, registered
seat, permitted form of mediation, permitted categories, permission validity,
and the source access date — plus a direct link to the evidence.

**Planned (Batch 2/8):** a `/o-nas` (or `/tnt-agency`) trust page + a deterministic
**trust-data validator** that refuses to render a permit number or scope unless a
`verified: true` flag with a source + access date is present, and that blocks the
forbidden claims (*licensed for all forms*, *verified by MPSV*, *government
approved*, …). The existing `validate:czech` already blocks those claim strings
site-wide.

## Two-audience architecture (29.12)

Separate **Pro zaměstnavatele** and **Pro uchazeče a pracovníky** journeys.
**No fake vacancy pages.** Use `JobPosting` only for a real, current,
individually described vacancy (hiring org, workplace, employment type,
description, datePosted, validThrough, application path); expired vacancies are
removed/marked. Until real vacancies exist, the candidate side stays informational
(process, documents, rights, safe recruitment, contact).

## Query & vocabulary research (29.15) — needs data access

Build the Czech intent map from GSC, Bing/Seznam Webmaster, WebmasterID, and
first-party form-source attribution + real employer questions — not third-party
volume tools alone. Group by intent (urgent staffing, agency comparison, employer
cost, workforce planning, foreign-worker compliance, city/industry demand, roles,
accommodation, transport, legal risk, RFQ) and map variants to one strong page.
**Owner access required** (GSC/Seznam are owner-authenticated).

## Conversion credibility (29.18)

Every Tier-1 employer page: clear service scope, required inputs, next step, what
happens after contact, real contact details, request form, printable checklist,
privacy note. The request form must keep saying an email was **prepared**, not
delivered (already enforced by `security-check.js`). No fake counters, timers,
worker counts, client logos, or live-chat.

## Maintenance calendar (29.21)

Track page · editor · sources · legal/data period · last verified · next review ·
change trigger · risk. Do not rewrite on a date; a review may conclude "no
change". Do not bump the public modification date without a material change.

## Owner inputs required to proceed

1. **MPSV agency evidence** for TNT agency s.r.o. (name, IČO, seat, permitted
   mediation form/categories, validity, source + access date) — unblocks the
   trust page.
2. **Search Console / Seznam / WebmasterID access** — unblocks query research and
   post-deploy monitoring.
3. **Statutory ruleset values per period** + legal review — unblocks the tools.
4. **Native-Czech editor** (and specialist reviewers for legal/payroll/
   immigration) for Tier-1 sign-off.
5. **Real case studies with client approval** (none exist — until then, only
   clearly-labelled illustrative scenarios, never called case studies).
6. Substantiate or soften homepage "500+/100+".
7. Region-family decision (strengthen vs. consolidate).

## Honest status ladder (29.24)

| Stage | Status after Batch 1 |
|---|---|
| Technically indexable | ✅ (from the indexing-recovery branch) |
| Editorially improved (Czech) | ⚙️ Standard + gate + governance in place; Tier-1 rewrites are Batch 2 |
| Reviewed by a native Czech editor | ⬜ Required, not yet done |
| Reviewed by a legal/payroll/immigration specialist | ⬜ Not done; not claimed |
| Deployed | ⬜ Needs merge + Netlify deploy |
| Crawled by Google | ⬜ Google's action |
| Indexed by Google | ⬜ Not guaranteed |
| Ranking / market leadership | ⬜ Only with external evidence — never claimed on internal completion |
