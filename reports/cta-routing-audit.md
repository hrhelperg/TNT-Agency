# CTA Intent-Routing Audit & Fix

**Baseline:** `b02a50f` (merge of PR #34) · **Branch:** `fix/cta-employer-request-routing`
**Scope:** CTA destinations only. No new URLs, no backend, no telemetry change, no locale work.

---

## 1. Correction to the earlier figure

The locale decision map reported *"38 commercial pages route CTA to `/contact`"*. **The real number is 57.** The 38 came from summing only the top-12 CTA groups printed in that audit; the tail was never counted. Corrected here.

A second group was also missed entirely — see §5.

---

## 2. Every `/contact` CTA, classified

162 CTA surfaces audited. All 57 `/contact` CTAs classified by the intent their own Czech wording declares:

| Classification | CTAs | Pages | Action |
|---|---|---:|---|
| **EMPLOYER REQUEST** | 6 definition sites | **29** | → `/poptavka-pracovniku` |
| **GENERAL CONTACT** | 4 definition sites | **26** | keep `/contact` |
| **CANDIDATE CONTACT** | 2 definition sites | **2** | keep `/contact` |
| LEGAL / TRUST CONTACT | 1 (`legal-content.ts`) | — | keep `/contact` |
| OTHER | 0 | 0 | — |

### Changed — 29 pages

| CTA | Pages | Why it is a request |
|---|---:|---|
| "Řešíte obsazení pozic?" | 13 | *"Are you dealing with filling positions?"* — the CTA text offers to set up recruitment and "probereme konkrétní potřebu" |
| "Plánujete nábor `<region>`?" (generated) | 11 | *"Planning recruitment in X?"* — text promises to "**zajistit pracovníky**" (secure workers) |
| "Plánujete nábor v Pardubickém regionu / Hradci Králové / Středních Čechách?" | 3 | Same wording, hand-written regional pages |
| "Plánujete mzdové rozpočty a nábor?" | 1 | Wage budgeting **and recruitment** |
| "Zvažujete spolupráci s agenturou?" | 1 | An employer weighing agency cooperation is a commercial lead |

Button labels were changed with the destinations. `"Domluvit konzultaci"` (*arrange a consultation*) would have misdescribed a 25-field staffing form, so the changed CTAs now use `"Poptat pracovníky"` and `"Probrat personální potřebu"` — both already in use elsewhere for this exact destination.

### Retained — 28 pages, with the reason per group

| CTA | Pages | Classification | Why `/contact` is correct |
|---|---:|---|---|
| "Potřebujete s tím pomoci?" | 22 | GENERAL CONTACT | Foreign-worker permits, insurance, tax, sanctions, labour-inspection reference pages. The next step is a regulatory question about a specific situation — which **cannot be expressed in a staffing request form**. Sending it there would produce worse requests and a worse experience. |
| "Máte konkrétní dotaz?" | 2 | GENERAL CONTACT | FAQ hubs, eyebrow *"Nenašli jste odpověď?"* — an unanswered question, not a requirement |
| "Máte konkrétní personální dotaz?" | 1 | GENERAL CONTACT | Employer FAQ, same reasoning |
| "Potřebujete se zorientovat v povoleních?" | 1 | GENERAL CONTACT | Work-permit orientation — advisory |
| "Hledáte práci v Praze / Brně?" | 2 | **CANDIDATE CONTACT** | **Candidate-facing.** Routing a jobseeker into a 25-field employer staffing form would be actively wrong. Verified in the built HTML: both still render `/contact`. |

---

## 3. Result

| | Before | After |
|---|---:|---:|
| CTA → `/poptavka-pracovniku` | 86 | **115** |
| CTA → `/contact` | 57 | **28** |
| CTA → `/submit-offer` | 19 | 19 |
| Pages with a path to the request form (link or CTA) | 162/162 | **162/162** |

Contextual inbound to `/poptavka-pracovniku` was already 162/162 via internal links; this change converts 29 of those pages' **primary conversion surface** from a general contact page to the structured request form.

---

## 4. Constraints held

No query parameters · no `?source=` · no salary or calculator values in any URL · no personal data in any URL · no backend · no Supabase · no `/api/leads` · mailto-first preserved · WebmasterID unchanged · no new telemetry.

Verified in built HTML: zero `poptavka-pracovniku?` occurrences anywhere. The changed pages render `data-request-source="service-page"` — pre-existing behaviour driven by `SeoArticle`, read only by the existing sessionStorage attribution and never transmitted.

---

## 5. Unresolved finding — 19 pages route employer-request intent to `/submit-offer`

**This is a second instance of the same defect, and I missed it in the earlier audit.**

| Page group | CTA | Destination |
|---|---|---|
| 14 × `trh-prace-<region>` | "Nabíráte v `<region>` kraji?" | `/submit-offer` |
| `agentura-prace-praha` / `-brno` | "Hledáte pracovníky v Praze / Brně?" | `/submit-offer` |
| `nedostatek-pracovniku-v-cr` | "Řešíte nedostatek pracovníků?" | `/submit-offer` |
| `nabor-zahranicnich-pracovniku` | "Hledáte zahraniční pracovníky?" | `/submit-offer` |
| `docasne-prideleni-zamestnancu` | "Potřebujete pokrýt sezónní špičku?" | `/submit-offer` |

`/submit-offer` is a **bare mailto page with no form fields**, carrying the legacy agency-marketplace positioning (*"get matched with the right agency"*). `/poptavka-pracovniku` is the structured 25-field schema that drives the form, validation, the mailto body and the tests.

So 19 pages with unambiguous staffing intent — *"Are you recruiting in Ústecký kraj?"* — end on the weaker surface.

**Not changed in this PR.** The brief scoped this work to `/contact` and said explicitly *"Do NOT blindly replace all of them"*. `/submit-offer` belongs to the agencies/offers side of the product, so re-routing it is a product decision rather than a hygiene fix.

It is **not** whitelisted as correct either. The gate reports all 19 as `REVIEW` on every run and **fails if the group grows**. Recommendation: re-route all 19 to `/poptavka-pracovniku` in a follow-up, subject to owner confirmation that the marketplace flow does not depend on them.

---

## 6. New gate: `validate:cta-routing`

`validate:conversion` already guaranteed the request path was **safe** (no query strings, no telemetry, mailto-first, no backend). Nothing guaranteed it was **reached**.

This gate classifies each CTA by the intent its own Czech wording declares, and requires employer-request intent to route to the request form.

**FAIL** — employer-request wording routed anywhere but the request form without a documented exception · a documented exception routed somewhere other than its recorded destination · a CANDIDATE CONTACT exception whose copy is rewritten to address employers · a stale exception whose CTA no longer exists · a destination outside the allowed set · a destination carrying a query or fragment · the `/submit-offer` group growing.

**REVIEW** — the 19 `/submit-offer` CTAs. Reported, never silently accepted, not failed.

### Mutation-tested — 9 defects, plus two controls

| # | Mutation | Caught |
|---|---|---|
| 1 | A repaired CTA drifts back to `/contact` | ✓ |
| 2 | A new regional page ships with `/contact` | ✓ |
| 3 | A candidate CTA re-routed to the employer form | ✓ |
| 4 | A documented GENERAL CONTACT CTA re-routed without updating its record | ✓ |
| 5 | A destination gains a tracking query string | ✓ |
| 6 | A destination outside the allowed set | ✓ |
| 7 | The unresolved `/submit-offer` group grows | ✓ |
| 8 | A documented exception goes stale | ✓ |
| 9 | A CANDIDATE CONTACT exception's copy rewritten to address employers | ✓ |

**Mutation 9 found a real hole in my own gate.** The candidate check tested the full wording — which includes the title — but exceptions are *keyed* by title, so the check was testing its own key and could never fail. It now judges the copy body independently of the key.

---

## 7. Gate

| | |
|---|---|
| `git diff --check` · lint · typecheck | clean · PASS · PASS |
| Unit tests | **377 passing** |
| Playwright | **138 passing** |
| Build | 175 static / **0 dynamic** |
| Validators | **20/20 PASS** (incl. new `cta-routing`) + security + Seznam |
| Mutation suites | cta-routing **9** · hreflang **10** · authority-v4 **11** |

Canonical URLs 185 → 185 · sitemap 185 → 185 · routes added/removed 0/0 · no redirects · no locale work.

---

## 8. State

IMPLEMENTED ✅ · VALIDATED ✅ · PUSHED ⏳ · MERGED ❌ · DEPLOYED ❌ · CRAWLED ❌ · INDEXED ❌ · RANKED ❌
