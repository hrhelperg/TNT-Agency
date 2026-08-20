# Employer Journey Repair — Final Report

**Baseline SHA:** `81a56f77eca76088299b55502d22fabab9fdaa63` (PHASE 0 audit)
**Branch:** `feat/employer-intelligence-growth`
**Approved scope:** W1, W2, W3, W6 only.

---

## 1. What shipped

| | |
|---|---|
| Files changed vs `main` | 13 |
| **URL delta** | **0** — no route created, changed or removed |
| New URLs | **0** · Case-study pages | **0** · Wave 6 profession pages | **0** · Locale routes | **0** |

Commits: CTA destinations → CTA gate extension → recruitment process → consolidation + journey cover → this report.

## 2. W1 — homepage primary employer CTA

| | Before | After |
|---|---|---|
| `"Hledám pracovníky"` (hero, largest employer button) | `/agencies` | **`/poptavka-pracovniku`** |

`/agencies` is the agency **directory**; its `<h1>` is *"Najděte správného agenturního partnera"* and its first section still reads *"Seznam agentur již brzy"*. The site's biggest employer button sent buying employers to a coming-soon list.

The label is employer intent in every locale (`Hledám pracovníky` / `I'm Looking for Talent`), so only the `href` moved — CS/EN/DE parity untouched.

## 3. W2 — bespoke high-intent CTAs

**All 13 hand-written pages audited; 36 CTAs classified. Four changed, 32 deliberately left.**

| Page | CTA | Before | After | Intent |
|---|---|---|---|---|
| `index.tsx` | "Hledám pracovníky" | `/agencies` | `/poptavka-pracovniku` | EMPLOYER_STAFFING_REQUEST |
| `index.tsx` | "Poslat poptávku →" | `/contact` | `/poptavka-pracovniku` | EMPLOYER_STAFFING_REQUEST |
| `index.tsx` | "Prozkoumat služby a odvětví →" | `/agencies` | `/pro-zamestnavatele` | KNOWLEDGE |
| `kalkulacka-…tsx` | `{t.ctaRequest}` = "Poptat pracovníky" | `/submit-offer` | `/poptavka-pracovniku` | EMPLOYER_STAFFING_REQUEST |

`"poptat pracovníky"` is literally one of the ten `EMPLOYER_REQUEST` patterns in the gate — that CTA would have failed it the moment the page became visible to it, which is exactly W3.

**Deliberately unchanged**, with reasons recorded in the inventory: marketplace CTAs (`"Zadat poptávku"`, `"Zveřejnit agenturu"` → `/submit-offer`, `/submit-agency`); candidate CTAs (`"Poslat životopis"`, `"Promluvit s náborářem"`); consultation CTAs (`"Domluvit konzultaci"`, `"Sjednat bezplatnou konzultaci"` → `/contact`); the payroll-guide regulatory CTA.

**Not done, deliberately:** no `data-request-source` was added to the changed CTAs. There is no `homepage-hero` value in `CTA_SOURCES`, and adding one would widen the attribution allowlist this batch is fenced from touching.

## 4. W3 — CTA validator coverage

`validate:cta-routing` audited `SEO_PAGES` only — 162 pages — and never saw the 13 bespoke routes. My own PR #35/#38 work fixed the registry and left the two highest-intent surfaces ungated.

Now: **21 files in `SCANNED_SURFACES`, 36 CTAs in `BESPOKE_CTAS`**, each with an intent from the brief's vocabulary and, where static, an expected destination.

Explicit inventory, not a glob — a wildcard that silently matches nothing is indistinguishable from one that matches everything, and the failure being fixed is *"a surface nobody was looking at"*. Two independent checks: every **declared** CTA must still exist and still point where declared; every CTA **found** must be declared, and any CTA-bearing `.tsx` outside the scan list fails.

Fails on: employer request intent anywhere but the request form · candidate intent **on** it · an undeclared CTA · destination drift · a query or fragment · a stale declaration · a declared file missing from the scan list · an intent outside the vocabulary.

## 5. Mutation results

| | Mutation | Expected | Result |
|---|---|---|---|
| A | homepage employer CTA → `/agencies` | FAIL | ✅ |
| B | calculator "Poptat pracovníky" → `/submit-offer` | FAIL | ✅ |
| C | bespoke employer CTA → `/contact` | FAIL | ✅ |
| D | candidate CTA → employer request form | FAIL | ✅ |
| E | regulatory CTA staying on `/contact` | **PASS** | ✅ |
| F | marketplace CTA → `/submit-offer` | **PASS** | ✅ |
| G | query-param employer CTA | FAIL | ✅ |
| H | bespoke page removed from the inventory | FAIL | ✅ |
| I | declared CTA deleted from the page | FAIL | ✅ |

Plus the 11 pre-existing registry mutations. **20 CTA mutations total, all behaving as specified.**

Two defects of my own, found by *running* the mutations rather than assuming they worked: the bespoke block was appended after the existing `process.exit` so it never executed, and mutation B pre-escaped a label that the helper escapes again.

## 6. W6 — recruitment process placement

The three steps existed only in the client-side dictionary, injected into an empty `<div id="processSteps">` on `/agencies` **after hydration** — so the server HTML answered none of *"what happens after I get in touch"*.

| Surface | Process steps in server HTML, before → after |
|---|---|
| `/` | **0 → 3** |
| `/pro-zamestnavatele` | **0 → 3** |
| `/agencies` | **0 → 3** (was client-injected) |

No process was invented — the same three steps, moved into `lib/content/recruitment-process.ts` and rendered by one shared component. On the homepage they replace a "Pro zaměstnavatele" section that carried a heading, one line and a button with **no content at all**.

## 7. Legal claims deliberately withheld / corrected

**Corrected, not propagated:** the standfirst read *"…respektuje váš čas a přináší výsledky — **pokaždé**"* — an outcome guarantee ("delivers results, every time") the operator cannot support. Replaced everywhere with a description of the process that promises nothing about its result, **including on `/agencies` where it was already live**, and in EN (*"delivers results — every time"*) and DE (*"Ergebnisse liefert — jedes Mal"*), which carried the same promise. Leaving those translated would have breached the rule that no locale may promise what Czech does not.

**Withheld:** no response time, shortlist size, candidate volume, time-to-hire, replacement guarantee, or claim about permitted mediation scope. `agencyPermission`, `permissionScope`, `permissionValidity` and `companyId` remain **unverified with null values**, so no new copy implies a verified legal scope. Step three commits only to terms being agreed contractually — true, and promises nothing.

## 8. Measurement correction — affects figures I published in Phase 0

The Phase 0 baseline defined contextual scope as "everything between the global `<header>` and `<footer>`". **That was wrong.** The mobile nav is a **sibling after `</header>`**, so it survived the strip, and every page appeared to link contextually to `/contact`, `/agencies`, `/submit-offer`, `/offers` and `/poptavka-pracovniku` — which is why all five read exactly **174**.

With `nav.mobile-nav` stripped, measured on both SHAs with the same corrected instrument:

| Destination | Before (`81a56f7`) | After |
|---|---:|---:|
| `/poptavka-pracovniku` | **164** | **164** |
| calculator | 165 | 165 |
| `/contact` | 34 | **33** |
| `/agencies` | 4 | **3** |
| `/submit-offer` | 4 | **3** |

**Request-page inbound is unchanged, and that is the honest result.** The homepage already linked to the form through the nested `EmployerCta` inside the calculator and agency-value blocks. What changed is **which button the buyer meets first**, not whether a link exists. This batch improves the primary conversion path, not the link count. The baseline report has been corrected in place.

## 9. Adversarial review

| Check | Result |
|---|---|
| Remaining employer CTA → `/agencies` / `/submit-offer` / `/contact` | **none** |
| Candidate CTA on the employer request form | **none** |
| Regulatory CTA on the request form | **none** |
| Unclassified bespoke CTA | **none** — 0 CTA-bearing files outside the inventory |
| Button-label / destination mismatch | none remaining |
| CS/EN/DE semantic drift | none — the outcome promise was removed from all three |
| Unsupported legal-scope claim | none introduced |
| **Duplicate process copy** | **FOUND AND FIXED** — see below |
| Validator blind spots | closed for CTAs; W4/W5/W7 remain (§11) |

**The duplicate-copy finding was against my own W6 change.** After adding the shared component I had left `/agencies` still injecting the same steps from `script.js` — two sources of truth for one piece of copy, free to drift. `/agencies` now uses the shared component; the dead injector, its host div and the `process.steps` arrays are gone. Removing the dead keys broke locale parity on the first attempt (my regex matched only the EN block) and `validate:i18n` caught it.

## 10. Verification

| | |
|---|---|
| `git diff --check` · lint · typecheck | clean · PASS · PASS |
| Unit tests | **522 passed** (22 files) |
| Playwright | **170 passed** (160 existing + 10 new employer-journey) |
| Validators | **21/21 PASS** + security + Seznam |
| Mutation suites | cta-routing **20** · locale-registry 28 · hreflang 10 · authority-v4 11 |
| Build | **175 static / 0 dynamic / 0 SSG / 0 ISR** |
| Canonical / sitemap | **185 / 185** |
| Routes added / removed · redirects | **0 / 0 · 0** |
| WebmasterID installs | **1**, unchanged; no new telemetry, no new transmitted field |

Employer-journey QA: hero → request form ✅ · calculator → request form ✅ · process server-rendered on all three surfaces ✅ · **no horizontal overflow in German at 320/360/375/390/430/768/1024/1440** ✅ · candidate CTA still avoids the employer form ✅.

## 11. Retained debt — deliberately not touched

| | Finding | Why deferred |
|---|---|---|
| **W4** | The calculator share link base64-encodes the entire `PayrollInput`, wage included, into `?d=`. User-initiated, clipboard-only, nothing transmitted — but ungated | Outside approved scope |
| **W5** | `lib/attribution/index.ts` cites tests in `./attribution.test.ts` that do not exist | Outside approved scope |
| **W7** | Payroll `LAST_VERIFIED = '2026-07-18'` with no staleness gate | Outside approved scope |
| Case studies | Zero verified client evidence; zero pages and zero schema built | Correct outcome, not debt |
| Permit scope | `agencyPermission` / `permissionScope` / `permissionValidity` / `companyId` unverified | Unsupplied **owner input**, not a code defect |

## 12. GSC status

Still `Insufficient plan` across all endpoints. **8 DEFER_FOR_DATA candidates remain deferred — not rejected, and not zero-demand.** Nothing in this batch depended on search evidence; §21 explicitly permits UX, internal-linking, truthful-positioning and CTA-semantics work without it.

## 13. State

IMPLEMENTED ✅ · VALIDATED ✅ · PUSHED ✅ · PR_OPEN ✅ · MERGED ❌ · DEPLOYED ❌ · CRAWLED ❌ · INDEXED ❌ · RANKED ❌

Native Czech editorial review: **pending**. Legal review: **pending**. Technical-specialist review: **pending**. None claimed.
