# Cost of Vacancy Tool

**Baseline:** `b02a50f` (merge of PR #34) · **Branch:** `feat/cost-of-vacancy-tool`
**No new URL.** The tool ships on `/cena-neobsazene-pozice`, the page that already owns the intent.

---

## 1. Input model

Twelve fields, every one labelled with its unit, every one defaulting to **empty**. Nothing is pre-filled, because we do not have the reader's figures and inventing them would turn a planning aid into a sales prop.

| Field | Unit | Feeds |
|---|---|---|
| Doba neobsazení | days | Vacancy duration cost |
| Odhadovaný denní výpadek přínosu pozice | CZK / day | Vacancy duration cost |
| Náklad na přesčasy pro pokrytí | CZK / day | Temporary coverage |
| Náklad na dočasné či agenturní pokrytí | CZK / day | Temporary coverage |
| Čas interního náboru | hours | Internal recruitment |
| Hodinový náklad náborového pracovníka | CZK / hour | Internal recruitment |
| Čas vedoucích na pohovory a výběr | hours | Management time |
| Hodinový náklad vedoucího | CZK / hour | Management time |
| Inzerce a sourcing | CZK one-off | Advertising and sourcing |
| Náklad zpoždění zakázky nebo projektu | CZK one-off | Delay and operational impact |
| Příprava nástupu a zaškolení | CZK one-off | Other costs |
| Další konkrétní náklad | CZK one-off | Other costs |

**Parsing.** Blank is 0, not an error — most lines stay unused. A comma is accepted as a decimal separator and spaced thousands are accepted, because that is what a Czech keyboard produces. A negative number is **rejected**, not silently absolute-valued. A value beyond 1e12 is clamped and flagged rather than allowed to become `Infinity`.

## 2. Calculation model

```
durationCost        = vacancyDays × dailyContribution
temporaryCoverage   = vacancyDays × (overtimePerDay + contractorPerDay)
internalRecruitment = recruiterHours × recruiterHourlyCost
advertising         = advertisingCost
managementTime      = managerHours × managerHourlyCost
operationalImpact   = projectDelayCost
otherCosts          = onboardingCost + otherCost
────────────────────────────────────────────────────────
total               = sum of the seven lines above
```

**The total is the sum of the displayed lines**, so the result reconciles by construction rather than by a parallel formula that could drift from the parts. Each line renders its own operands — the reader sees `30 × 4 000`, not just `120 000`.

No average cost of a vacancy, no average time-to-hire, no assumed productivity loss, no benchmark, no guaranteed saving. The result header is qualified in all three languages:

- CS — *Odhadované náklady podle zadaných předpokladů*
- EN — *Estimated cost based on entered assumptions*
- DE — *Geschätzte Kosten auf Grundlage der eingegebenen Annahmen*

Empty state says so explicitly: *"We show no default amount, because we do not know it."*

## 3. Vacancy cost is not a recruitment fee (§F)

The tool states the distinction and refuses to over-claim: a fee is a one-off amount known in advance, vacancy cost accrues every day the seat is empty, so a more expensive way of filling a role **can** work out cheaper overall — *"if it shortens the vacancy enough that the saved cost outweighs the difference in fee. Whether it does is decided by your numbers above, not by a claim from us. With zero in the daily-contribution field, this effect does not follow from the calculation at all."*

A test asserts no string ever claims the agency always reduces vacancy cost.

## 4. Privacy proof

The employer's cost figures are commercially sensitive. The way to deserve that input is not to collect it.

**Source-level** (`lib/vacancy-cost/privacy.test.ts`) — the tool, model, copy and page are each asserted to contain no `fetch`, `XMLHttpRequest`, `sendBeacon`, `WebSocket`, `EventSource`, `axios`, `gtag`, `dataLayer`, WebmasterID reference, `localStorage`, `sessionStorage`, IndexedDB, `document.cookie`, `pushState`/`replaceState`, location assignment, `URLSearchParams`, or form `action`/`method`. The model imports **nothing at all**; the component imports only React, the language bridge, its own model and its own copy.

Source assertions are deliberate: a runtime test only proves the paths it exercised, while a source assertion catches a `fetch` added to a branch no test happens to hit.

**Runtime** (`tests/e2e/vacancy-cost-tool.spec.ts`) — with sentinel values typed into two fields, the test asserts that **no network request is made at all** while typing, that no request URL anywhere contains either sentinel, that the page URL and query string stay clean, and that neither sentinel appears in `localStorage`, `sessionStorage`, `document.cookie` or `location.href`.

The request CTA is a plain link to the clean canonical path; clicking it after entering a value lands on `/poptavka-pracovniku` with an empty query string and no sentinel in the URL. Form submit is blocked so Enter cannot serialise values into a query string.

**Classification.** `/cena-neobsazene-pozice` now classifies as `knowledgeFacet: 'recruitment_economics'` — pathname-derived, offline, and transmitting nothing. This was added as a **facet of `knowledge`, not a new cluster**: every cross-cluster authority measurement from Waves 2–4 is defined over the 11-cluster taxonomy, so splitting `knowledge` into three clusters would have silently invalidated those baselines while looking like a refinement.

## 5. Localization result

Full CS / EN / DE across labels, helper text, units, validation messages, result states, methodology, the fee explanation, CTA, privacy disclosure and the ARIA region label. Parity is tested: every field, group, unit, error and result string must exist in all three, and the methodology and fee sections must have the same paragraph count in each.

**Numbers and formulas are identical across languages** — only `Intl.NumberFormat` locale grouping changes. Asserted in the browser for all three.

Per §H, EN and DE carry a scope note that Czech does not need:

> *"This is a general employer planning aid, not a statutory payroll calculator. It applies no Czech or other national payroll rule; every amount is your own figure."*

## 6. Internal-link path (§F)

```
knowledge (/cena-neobsazene-pozice + tool)
  → /proc-se-nedari-obsadit-odbornou-pozici   (hard-to-fill)
  → /nabor-odbornych-pozic                    (professional/technical recruitment — added)
  → /technologove-a-konstrukteri              (specific role family)
  → /kalkulacka-mzdy-agenturniho-zamestnance  (decision aid)
  → /poptavka-pracovniku                      (request — page CTA and tool CTA)
```

Only one link was missing and was added: the professional-recruitment hub. An employer who has just quantified what an empty specialist seat costs per day needs the page that owns specialist recruitment, not only one role family inside it.

## 7. Tests

| Suite | Count |
|---|---|
| Unit — vacancy-cost model + copy + privacy | **103 new** |
| Unit — total | **480** (was 377), 20 files |
| Playwright — vacancy-cost tool | **22 new** |
| Playwright — total | **160** (was 138) |

Covered: all-zero · single component · mixed components · duration multiplication · hourly HR time · manager time · project delay · other cost · decimals · zero · negative rejection · very large input clamping · rounding to two places · reconciliation · language parity · privacy (source + runtime) · no URL leakage · no analytics leakage · CTA target · pathname classification · no new route.

## 8. Browser QA

Widths **320 / 390 / 768 / 1024 / 1440**, in German (the longest labels), with large values in every field. Also: labels for every input (no placeholder standing in for a label), keyboard operability, `aria-live="polite"` plus an ARIA label on the result region, `aria-invalid` on rejected input, `inputMode="decimal"` for mobile keypads.

**One real defect found and fixed by this QA.** At 320px the German CTA — *"Besetzung dieser Position besprechen"* — pushed the page 10px wide, because site buttons do not wrap. Fixed by allowing that button to wrap, scoped to the tool. The result table scrolls inside its own container so a wide table never scrolls the page body.

**One flake, disclosed.** During the first full-suite run, one `legal-pages.spec.ts` case failed on transient resource 404s. The failing page differed between runs (`/terms-cs.html`, then `/terms.html`), it does not reproduce in isolation, a direct probe of every resource those pages reference returns 200, and the full suite re-ran **160/160 green**. Recorded as a flake rather than hidden; worth watching rather than acting on.

## 9. Invariants

| | Before → After |
|---|---|
| Canonical URLs | 185 → **185** |
| Sitemap URLs | 185 → **185** |
| Routes added / removed | **0 / 0** |
| Static routes | 175 → **175** |
| Dynamic / SSG / ISR | 0 → **0** |
| Backend / Supabase / API route | none → **none** |
| WebmasterID installs | 1 (`_app.tsx`) → **1** |

Validators: **18/18 PASS** on this branch + security + Seznam + hreflang and authority-v4 mutation suites.

`validate:cta-routing` is **not** on this branch — it lives in PR #35, which is unmerged, and this branch was cut from `main` as instructed so the two stay independent.

## 10. State

IMPLEMENTED ✅ · VALIDATED ✅ · PUSHED ⏳ · MERGED ❌ · DEPLOYED ❌ · CRAWLED ❌ · INDEXED ❌ · RANKED ❌
