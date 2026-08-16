# /submit-offer Routing Cleanup

**Baseline:** `04e4f38` (PR #37 merged) · **Branch:** `fix/submit-offer-routing`
19 CTAs audited · **19 rerouted** · 0 retained · 0 new URLs · 0 redirects

---

## 1. The audit, and why it did not become a blind sweep

The brief said not to blindly replace all 19, and to keep `/submit-offer` where the intent is genuinely posting a public offer. So the marketplace hypothesis was tested before any edit, not assumed away:

| Test | Result |
|---|---|
| Directory/marketplace phrasing in page bodies (*"vyberte agenturu"*, *"porovnejte agentury"*, *"seznam agentur"*) | **0 matches** across the sampled pages |
| Any of the 19 linking to `/agencies` | **none** |
| Contextual internal links to `/submit-offer` anywhere in the registry | **0** — these 19 CTAs were its only registry inbound |
| CTA copy | every one offers TNT's own help — *"Pomůžeme vám s náborem"*, *"zajistit pracovníky"* — not a match with a third-party agency |

`/submit-offer` describes itself as *"Post your recruitment or staffing requirement and get matched with the right agency"* — the legacy marketplace product. None of these 19 pages is a marketplace page; they are TNT's own regional, sector and service content. An employer reading *"Nabíráte v Ústeckém kraji?"* on TNT's own regional page and clicking should reach **TNT's** 25-field staffing form, not a posting that matches them with some other agency.

**All 19 classify as `EMPLOYER_STAFFING_REQUEST`.** That is the conclusion the evidence forced, not a shortcut.

## 2. Classification — all 19

| Classification | Count | Action |
|---|---:|---|
| **EMPLOYER_STAFFING_REQUEST** | **19** | → `/poptavka-pracovniku` |
| EMPLOYER_MARKETPLACE_JOB_POSTING | 0 | — |
| CANDIDATE | 0 | — |
| GENERAL_CONTACT | 0 | — |
| OTHER | 0 | — |

| Page | CTA | Evidence |
|---|---|---|
| `nabor-zahranicnich-pracovniku` | "Hledáte zahraniční pracovníky?" | *"Pomůžeme vám s náborem od definice potřeby až po nástup"* |
| `docasne-prideleni-zamestnancu` | "Potřebujete pokrýt sezónní špičku?" | *"Pomůžeme vám zajistit pracovníky formou dočasného přidělení"* |
| `agentura-prace-praha` / `-brno` | "Hledáte pracovníky v Praze/Brně?" | *"Pomůžeme vám s náborem i agenturním zaměstnáváním"* |
| `nedostatek-pracovniku-v-cr` | "Řešíte nedostatek pracovníků?" | *"Pomůžeme vám s náborem i s pružným pokrytím kapacity"* |
| 14 × `trh-prace-<region>` | "Nabíráte v `<region>`?" | *"zajistit pracovníky včetně koordinace administrativy u cizinců"* |

**Retained on `/submit-offer`: none.** There is nothing to justify, because no page among the 19 posts a public offer.

Button labels were left as **"Poslat poptávku"** (*send a request*) — already accurate for the request form, so the copy needed no change to stop misdescribing its destination.

## 3. `/submit-offer` is not deprecated

This is the check that had to pass before rerouting all 19: removing every registry CTA must not orphan a live, indexed page.

| | |
|---|---|
| Linked from Header (desktop + mobile nav) and Footer | **yes — site-wide** |
| Built pages linking to it | **175** (unchanged) |
| In sitemap | **yes**, 1 entry (unchanged) |
| Production status | **200** |

It keeps every piece of site-wide reachability. What changed is that **staffing intent no longer lands there** — and it remains the correct destination for genuine marketplace posting intent, which the gate now explicitly permits.

## 4. Before / after

| Measure | Before | After |
|---|---:|---:|
| CTA → `/poptavka-pracovniku` | 115 | **134** |
| CTA → `/contact` | 28 | 28 |
| CTA → `/submit-offer` | 19 | **0** |
| Pages with a path to `/poptavka-pracovniku` (link or CTA) | 162/162 | **162/162** |
| Registry inbound to `/submit-offer` | 19 | **0** |
| Site-wide inbound to `/submit-offer` (nav + footer) | 175 | **175** |

Six definition sites changed, covering 19 pages: `cornerstone.ts` (1), `geo.ts` (2), `employer-intelligence.ts` (4), `regions.ts` (1 template → 11 pages), `support.ts` (1).

## 5. Gate changes — the rule is inverted

`SUBMIT_OFFER_BASELINE` was `19` with a "must not grow" rule. It is now **`0`** with a "must not appear" rule:

- **FAIL** — a CTA declaring employer staffing intent that routes to `/submit-offer`
- **ALLOWED** — a CTA declaring genuine marketplace posting intent (*"zveřejnit nabídku"*, *"vystavit nabídku"*, *"inzerovat pozici"*), or one listed in `MARKETPLACE_EXCEPTIONS` with a stated reason
- **FAIL** — candidate-facing intent routed to the employer request form (unchanged)
- **FAIL — new** — an **ambiguous** CTA: one matching neither a staffing request nor an explicit non-request nor marketplace posting, yet pointing somewhere other than the request form

That last rule matters most. An unclassified commercial CTA passing silently is exactly how the `/contact` group (57 pages) and this `/submit-offer` group (19 pages) both accumulated unnoticed across four waves. Ambiguity now fails review instead of accruing.

`MARKETPLACE_EXCEPTIONS` is intentionally **empty** — the audit found no page needing it.

### Mutation-tested — 11 defects, plus two controls

| # | Mutation | Caught |
|---|---|---|
| 1–2 | A repaired CTA, or a new regional page, drifts back to `/contact` | ✓ |
| 3 | Candidate CTA re-routed to the employer form | ✓ |
| 4 | Documented GENERAL CONTACT CTA re-routed without updating its record | ✓ |
| 5 | Destination gains a tracking query string | ✓ |
| 6 | Destination outside the allowed set | ✓ |
| **7** | **Staffing intent routed to `/submit-offer`** | ✓ |
| **7b** | **A regional page drifts back to `/submit-offer`** | ✓ |
| **7c** | **An ambiguous CTA points somewhere other than the request form** | ✓ |
| 8 | A documented exception goes stale | ✓ |
| 9 | A candidate exception's copy rewritten to address employers | ✓ |

## 6. Constraints held

No query parameters · no `?source=` · no salary or calculator values in any URL · no personal data in any URL · no backend · no Supabase · no `/api/leads` · mailto-first preserved · WebmasterID unchanged (1 install) · no new telemetry.

Verified in built HTML: **zero** `poptavka-pracovniku?` occurrences.

## 7. Invariants

| | Before → After |
|---|---|
| Canonical URLs | 185 → **185** |
| Sitemap | 185 → **185**, byte-identical |
| Routes added / removed | **0 / 0** |
| Redirects added | **0** |
| Static / dynamic | 175 / 0 → **175 / 0** |

## 8. Gate

`git diff --check` clean · lint · typecheck · **505 unit tests** · production build · **21/21 validators** · security · Seznam · mutations cta-routing **11**, locale-registry **28**, hreflang **10**, authority-v4 **11**.

### Browser QA — and a pre-existing flake, root-caused

Playwright: **158 passed, 2 failed** on `legal-pages.spec.ts` — then **20/20 on a clean re-run**, then 2 failed again on *different* pages.

**It is not caused by this branch.** Verified by stashing the change and running the same spec twice on clean `main`: run 1 passed 20/20, **run 2 failed on `/privacy-de.html`**. This also corrects my Step 3 report, which called main clean on the strength of a single passing run.

**Root cause:** the spec filters console noise by URL —

```
/webmasterid|ERR_BLOCKED_BY_ORB|fonts\.googleapis|fonts\.gstatic|favicon|net::ERR_/i
```

— but Chrome emits `"Failed to load resource: the server responded with a status of 404 ()"`, which **contains no URL**, so no URL-based pattern can ever match it. A transient third-party fetch therefore surfaces as an unfilterable generic error. Its sibling `seo-crawlability.spec.ts` already solved this by also matching `Failed to load resource` and `status of 40`.

**Not fixed here** — this PR is scoped to CTA routing, and the fix belongs to the test suite. Recommended as a one-line follow-up: align the legal spec's filter with its sibling's. Until then, every full-suite run has roughly a coin-flip chance of a false failure, which erodes the credibility of any "full gate green" claim.

## 9. State

IMPLEMENTED ✅ · VALIDATED ✅ · PUSHED ⏳ · MERGED ❌ · DEPLOYED ❌ · CRAWLED ❌ · INDEXED ❌ · RANKED ❌
