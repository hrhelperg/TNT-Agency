# Risk & Data Integrity Hardening — W4 / W5 / W7

**Baseline:** `e9cfd06` · **Branch:** `fix/risk-data-integrity-hardening`
**Discovery audit:** [`reports/risk-data-integrity-audit.md`](./risk-data-integrity-audit.md)

Three workstreams, one theme: **claims that nothing could ever falsify.** A share
link that said it was harmless, a comment that said it was tested, and a page
that said it was verified. In each case the mechanism that would have caught the
claim going false did not exist.

---

## A. Severity correction, stated first

The historical framing of W4 was *"wage data, clipboard-only, nothing is
transmitted."* **Both halves were wrong**, and the correction drove the design.

| Historical claim | Measured reality |
|---|---|
| "wage data" | The payload carried `taxProfile.disability`, `taxProfile.ztpp` and `children[].ztpp` — **disability status, health data under GDPR Art. 9** — alongside wage and employer-cost figures. |
| "clipboard-only, nothing transmitted" | WebmasterID's `page_view` transmits `url`, the full href. **Opening a shared link sent the payload to a third-party ingest endpoint.** |

Base64 is **encoding, not encryption**. Anyone who saw the URL could read it.

### The proof, and how it was obtained

`tests/e2e/payroll-share-privacy.spec.ts` opens a legacy link with analytics
consent granted, **intercepting and stubbing the request** rather than
delivering it. Before the fix, the captured body contained:

```json
{"event_name":"page_view","url":"…?d=eyJtb2RlIjoiYWdlbmN5…IjoidGhpcmQiLCJ6dHBwIjp0cnVlLCJjaGlsZHJlbiI6W3sienRwcCI6dHJ1ZX0…"}
```

Decoded: `"disability":"third"`, `"ztpp":true`, `children[].ztpp`, wage `777333`.

**No real data was ever sent to the third party.** The live bundle was
deliberately never exercised against the real endpoint.

The same test now passes. It is the single most load-bearing artefact in this
branch: the test that demonstrated the leak is the test that proves it closed.

---

## B. W4 — what was done, and what was given up

**Removed** the `?d=` payload — both producing and consuming it.

The decoder also validated nothing: `JSON.parse(...) as PayrollInput` is a
compile-time cast, so a crafted link could spread arbitrary shapes into state
and leave the page with no `<h1>`. (Prototype pollution is **not** reachable —
object spread defines own properties. Checked, not assumed.)

### Removal was necessary but not sufficient

Links already copied and shared still exist, and the tracker reads the address
bar regardless of what the page does. So `lib/privacy/url-hygiene.ts` strips
undeclared query parameters on load.

Two things make it correct rather than merely present:

- **Ordering.** `<UrlHygiene />` is the first child of `_app`; sibling effects
  fire in tree order, ahead of the analytics island. This matters twice over —
  the tracker also patches `replaceState` to emit a `page_view` per URL change,
  so a *late* scrub would both leak the dirty URL **and** double-count.
- **Removal-only, as a tested property.** The output parameter set is asserted
  to be a subset of the input's; `removed` carries names only, never values; and
  history is touched only when something needs removing, so an ordinary page
  load performs no history write at all.

### The trade-off, stated rather than hidden

Users **lose** "reopen my exact inputs from a link."
Users **keep** "share my result" — the clipboard summary and CSV export remain.

Both of those still carry economic values, by explicit user action, and that is
recorded in `DECLARED_AFFORDANCES` rather than glossed. **Explicit clipboard
sharing is not zero-risk**; it is a risk the user chooses, once, per press.

---

## C. W5 — the coverage claims

`lib/attribution/index.ts` opened with *"Design rules, enforced by tests in
`./attribution.test.ts`"*. **That file had never existed.**

Rules 1, 2 and 4 turned out to be partly covered from *other* modules' suites,
which exercise `buildAttribution` as a pure function. **Rule 3 — SESSION-LIMITED,
the storage rule — was enforced by nothing at all.**

`lib/attribution/attribution.test.ts` now exists: 23 tests, one `describe` per
documented rule, with Rule 3 driven through a real fake `sessionStorage` so
first-touch merge, malformed values, blocked storage and the no-window server
case are **behaviours**, not assertions about text.

### Writing those tests surfaced three defects

| Defect | Resolution |
|---|---|
| `assertNoSensitiveKeys` compared key names for **exact equality**, so `grossWage`, `candidateEmail` and `contactPhone` passed a guard documented as failing loudly | Substring match. Nothing had leaked — the allowlist still dropped them — but a defence-in-depth guard that catches only the exact spelling is not the guard the comment describes. |
| Denylist named `employerCost` but not bare `cost`, so `totalEconomicCost` went unrecognised | Added `cost`, `naklad`, `fee`. Safety is itself a test: **no allowlisted field name may trip the denylist**. |
| `clearAttribution()` was dead, claiming it ran "after a completed request" | **Removed, not wired.** Wiring it would mean a second submission in the same session loses its first-touch UTMs — a product decision, not a test-integrity repair. |

### I had written the same defect myself

`scripts/validate-cta-routing.mjs` excused the EmployerSituations CTA *"asserted
in the component tests"*, with no such assertion anywhere. The assertion now
exists in `lib/employer-request/conversion.test.ts`, and the citation names it.

### The generalisable fix

`scripts/validate-coverage-truth.mjs`. Every test file cited in a comment or a
gate `reason:` must **exist**, must sit **inside the vitest `include` glob** so
it actually runs, and must **mention the symbol** it is cited for. No skipped,
empty, or expectation-free test may stand in for coverage.

> A test in `components/` would never have run — `include` is `lib/**/*.test.ts`.
> That is now a gate rule, not a trap.

**It found two further citations on its first run.** Both, on inspection, were
*accurate* claims written as bare filenames (`content-quality.test.ts` — a real
file at `lib/content/`). The **resolver was corrected, not the comments**: a
bare basename is fully checkable when exactly one test carries that name.
Ambiguous basenames are still reported. The goal was never to churn true
comments until a gate stopped complaining.

---

## D. W7 — a verification status that can be lost

The page asserted *"pravidla pro rok 2026, ověřená k 2026-07-18 u ČSSZ, Finanční
správy, MPSV a VZP"* from a string typed into it, while the ruleset's own
`effectiveFrom` / `effectiveTo` **had no consumer anywhere in the tree**.

Nothing connected the claim to the data. The page would have gone on making it
in January 2027 — when the annual decrees change the minimum wage, the average
wage, the 23 % threshold and the maximum assessment base, and **every figure on
the page is wrong while still labelled verified**.

### There is deliberately no freshness interval

*"Verified more than N days ago"* is not a fact about this domain. Czech payroll
parameters move on an **annual decree cycle effective 1 January**, so a ruleset
checked in July is no more suspect in August than it was in July. **No universal
30-day rule was invented.**

The boundaries come from the data: the ruleset's own effective window, plus a
`reviewDueFrom` date **the ruleset declares for itself**. `CZ_2026` sets it to
1 October — when the following year's decrees begin appearing — and the
reasoning sits next to the value instead of inside a threshold constant.

| Status | Meaning |
|---|---|
| `VERIFIED` | Inside the window, verified on/after it opened |
| `REVIEW_DUE` | Past the declared re-check date, **still in force** — not a visitor-facing warning |
| `STALE` | Past `effectiveTo`, no successor covers today |
| `SUPERSEDED` | A later tax year covers today |
| `DRAFT` | Verified before the window opened, or not at all |

### The year boundary is safe by construction

Going `STALE` changes the **status**, never the numbers. The engine keeps
returning the last known official figures — it does **not** switch to guessed
new-year values and does **not** return zeros, either of which is worse than a
clearly-labelled out-of-date answer. A test asserts the rules object is
byte-identical before and after an assessment made in 2029.

### VERIFIED has to be earned

`verifiedOnFromSources` takes the **oldest** access date across the registry, not
the newest: a verification claim is only as strong as its weakest source, and
taking the newest would let one re-checked source make a stale registry look
current. A check dated before the window opened yields `DRAFT`.

**No date was fabricated.** The existing recorded `2026-07-18` is carried
through unchanged — moving it forward would assert that someone opened those
pages on a new date. The authority list is **derived from the sources that
actually exist**, not typed into Czech prose.

### Assessed against the visitor's clock, not the build's

A bundle built in August 2026 would otherwise keep telling a January 2027
visitor that the 2026 rules are current — the exact failure being fixed. The
assessment runs in an effect after mount, which also leaves the prerendered HTML
byte-identical, so there is no hydration mismatch.

Page titles, H1s and slugs keep their literal year — they are content, and
`/minimalni-mzda-2026` must never migrate — but the gate **fails the build if
that literal drifts from the ruleset's tax year**, making the copy update a
deliberate act rather than an omission.

---

## E. Gates and their mutations

Every gate exports a pure audit function taking its inputs as arguments, so
mutations exercise **real code**. Two gates initially reached past their inputs
to read from disk; both were fixed, because an audit that cannot be
mutation-tested is the thing this branch exists to stop shipping.

| Gate | Mutations | Controls |
|---|---|---|
| `validate-share-privacy.mjs` | **12 caught** | control + negative control |
| `validate-coverage-truth.mjs` | **9 caught** | control + negative control |
| `validate-payroll-freshness.mjs` | **10 caught** | control + **2** negative controls |

**Negative controls matter as much as the mutations.** `REVIEW_DUE` and the last
day of the effective window must **not** fail the build, because the rules still
apply. The declared clipboard and CSV affordances must **not** be flagged. An
accurate bare-basename citation must **not** be reported.

### Two adaptations, labelled rather than quietly reframed

The brief listed six W4 mutations, two of which presuppose a **versioned
serialized payload** ("allow unknown payload field", "remove version check").
The chosen design removed the payload entirely rather than versioning it, so
those two are adapted to *undeclared-parameter* and *unvalidated-reader* — the
properties whose absence made `?d=` dangerous. They print as `(adapted)` in the
mutation output.

---

## F. Corrections to my own work during this branch

Recorded because a report that only lists other people's defects is not a report.

1. **Mutation 8 was defined but skipped.** The share-privacy gate read the
   calculator from disk instead of its injected sources, so the mutation could
   not run. Fixed the **gate**, not the test.
2. **Mutation 10 reimplemented the rule** instead of driving the gate — exactly
   the pattern W5 exists to eliminate. Made the gate accept injected allowlists.
3. **The coverage-truth gate flagged three false positives on first run**, one
   of which was its own header quoting the historical defect. Resolver fixed;
   two "missing" files turned out to exist.
4. **I committed W5 on an unconditional `echo`** that printed "TS OK" while
   typecheck was failing on three iterator-spread errors. Caught on the next
   run, fixed, amended.
5. **A vendor name in an explanatory comment tripped a real guard**
   (`the calculator is untouched by analytics`). **The comment was reworded, not
   the guard** — precision survives because there is exactly one tracker.

---

## G. Verification

| | Result |
|---|---|
| `git diff --check` | clean |
| `tsc --noEmit` | **PASS** |
| `next lint` | 0 errors |
| `npm run build` | **PASS** |
| Unit tests | **584 passed**, 25 files (was 536) |
| Playwright | **190 passed**, 2 projects, `workers: 1`, `retries: 0` |
| Validators | **22 / 22 PASS** (exit code, not text match) |
| Mutation suites | **7 / 7 PASS** — 3 new, 4 pre-existing |

### Browser QA — 6 routes × 5 breakpoints, all clean

`/kalkulacka-mzdy-agenturniho-zamestnance`, `/poptavka-pracovniku`,
`/cena-neobsazene-pozice`, `/`, `/socialni-zdravotni-dane-2026`,
`/minimalni-mzda-2026` at 320 / 390 / 768 / 1024 / 1440.

Each checked for exactly one `<h1>`, ≤2px horizontal overflow, a clean URL
(no query survives the scrub), and zero first-party console errors.
**30/30 clean.**

### Architectural invariants — unchanged

| Invariant | Expected | Measured |
|---|---|---|
| Static routes | 175 | **175** |
| Dynamic routes | 0 | **0** |
| SSG / ISR | 0 | **0** |
| Canonical tags | 185 | **185** (175 prerendered + 10 static HTML in `public/`) |
| Sitemap `<loc>` | 185 | **185** |
| WebmasterID mounts | 1 | **1** |
| `btoa` / `atob` in app source | — | **0** |

> The 185 canonical figure resolves as 175 Next-prerendered pages plus the 10
> legacy static HTML files under `public/`. Recording the breakdown because the
> Next build alone reports 175, and a bare "175 ≠ 185" would read as a
> regression when nothing changed: `public/sitemap.xml` and the page inventory
> are untouched by this branch.

---

## H. Explicitly not done

Per the brief: no new profession or employer-intelligence pages, no locale
pilot, no `/en/` or `/de/` routes, no backend, no Supabase, no API lead storage,
no analytics vendors, no case studies, no canonical-architecture change, no
sitemap change, no weakened validator, no hidden test failure.

**No crawl, index, or ranking improvement is claimed.** Nothing here is
observable to a search engine; it is a privacy fix, a test-integrity repair and
a data-freshness model.

**No mutation remains in the branch.** Mutation 7 of the freshness suite
rewrites `lib/payroll/freshness.ts` and restores it in a `finally`; verified
restored via `git diff --stat` after the run.

---

## I. Residual risks, stated

- **Legacy links already in circulation** still contain the payload in whatever
  medium they were shared through (chat logs, email, someone's bookmarks). The
  scrub removes it at the moment of opening; it cannot reach backwards. Netlify
  CDN access logs for past requests are equally out of reach.
- **The clipboard summary and CSV export still carry economic values.** By
  explicit user action, declared, and deliberately retained.
- **The freshness boundary uses UTC** (`new Date().toISOString()`). A visitor in
  Prague between 00:00 and 01:00 CET on 1 January sees the previous UTC day —
  a one-hour window in which the notice appears a day late. Not fixed: the
  alternative is timezone handling on a static page for a status that is
  advisory, and the notice's own text names the exact end date.
- **A `VERIFIED` status still cannot prove a human opened the source pages.**
  The gate refuses dates the data cannot support; it cannot manufacture
  diligence. `2026-07-18` is carried through as recorded, not re-asserted.

---

## J. State

IMPLEMENTED ✅ · VALIDATED ✅ · PUSHED ⏳ · MERGED ❌ · DEPLOYED ❌

Not merged. Not deployed. No claim is made about crawling, indexing or ranking.
