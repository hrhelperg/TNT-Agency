# Legal-pages Playwright Flake — Diagnosis and Fix

**Baseline:** `aff39f7` (PR #38 merged) · **Branch:** `fix/legal-pages-console-filter`
Test infrastructure only. **No product, content or SEO file is touched.**

---

## 1. REPRODUCED ON CLEAN MAIN

Six consecutive runs of `tests/e2e/legal-pages.spec.ts` on unmodified `main`, `workers: 1`, `retries: 0`:

| Run | Result |
|---|---|
| 1 | **3 failed**, 17 passed |
| 2 | 20 passed |
| 3 | 20 passed |
| 4 | **1 failed**, 19 passed |
| 5 | 20 passed |
| 6 | **1 failed**, 19 passed |

**3 of 6 runs failed — a ~50% failure rate on a clean tree**, with a different page failing each time. Not caused by any of my branches.

> This corrects my earlier report, which called `main` clean on the strength of a single passing run. One run cannot characterise a coin-flip.

---

## 2. ROOT CAUSE

### What Chrome emits

Captured by instrumenting a replica of the spec's exact conditions and correlating console output with response status:

```
CONSOLE: "Failed to load resource: the server responded with a status of 404 ()"
FAILED : 404 https://fonts.gstatic.com/s/inter/v20/UcCB3FwrK3iLTeHuS_nVMrMxCp50…woff2
FAILED : REQFAIL  …woff2  net::ERR_ABORTED
```

The failing resource is a **`fonts.gstatic.com` woff2 font file**, 404-ing intermittently. The spec loads each page **five times** — once per breakpoint, `waitUntil: 'networkidle'` — so eight pages produce **40 rapid loads** of the same Google Fonts assets. That burst is what triggers the intermittent 404.

### Why the existing filter could never catch it

```js
const IGNORE = /webmasterid|ERR_BLOCKED_BY_ORB|fonts\.googleapis|fonts\.gstatic|favicon|net::ERR_/i
```

The pattern lists `fonts\.gstatic`, so it *looks* like it covers exactly this case. It cannot: **Chrome's message contains no URL.** `"Failed to load resource: the server responded with a status of 404 ()"` has nothing for a hostname pattern to match against.

The filter's intent was right. Its mechanism — identifying an origin from message text — is impossible for this class of message.

An earlier diagnostic of mine missed this because it navigated once per page rather than five times, and never triggered the burst.

---

## 3. FIX

### What was explicitly *not* done

Adding `Failed to load resource|status of 40` to the text pattern — which the sibling `seo-crawlability.spec.ts` does — would suppress that message for **every origin, including our own**. A missing `/legal-pages.css` or `/script.js` would then pass silently. That is precisely the bug this suite was written to catch: it exists because of a real `/styles.css` MIME failure.

So the sibling was inspected and deliberately **not** copied.

### What was done

`lib/testing/console-noise.ts` classifies a console error by **correlating it with the actual failed response URLs** observed during the same navigation — which do carry URLs — instead of guessing an origin from message text.

```
a URL-less generic resource error is noise
    ONLY IF no first-party resource failed during that navigation
```

The spec now also records `page.on('response')` failures and asserts separately:

```ts
expect(firstPartyFailures(failedUrls), `first-party resource failures on ${route}`).toEqual([])
```

so a missing first-party asset is reported **by URL** rather than as an anonymous console line.

Two behaviours follow, and both are required:

- A third-party font 404 is ignored — no first-party failure, so the generic message is noise.
- A first-party 404 fails **twice over**: the explicit URL assertion fires, *and* the generic console message is no longer suppressed.

---

## 4. NEGATIVE CONTROLS

The danger in fixing a flaky test is fixing it into uselessness. 17 unit tests (`lib/testing/console-noise.test.ts`) assert the classifier still surfaces every failure class the suite exists to catch.

| | Control | Expected | Result |
|---|---|---|---|
| **A** | Known irrelevant browser 404 (third-party font) | ignored | ✅ |
| **B** | Required stylesheet 404 (first-party) | **FAIL** | ✅ |
| **C** | Required script 404 (first-party) | **FAIL** | ✅ |
| **D** | Application JS exception / `console.error` | **FAIL** | ✅ |
| **E** | Hydration error (both variants) | **FAIL** | ✅ |

Plus, guarding against the fix becoming a broad ignore rule:

| Case | Expected | Result |
|---|---|---|
| MIME / "Refused to apply style" | FAIL | ✅ |
| 404 message that *does* carry a first-party URL | FAIL | ✅ |
| CSP violation | FAIL | ✅ |
| Generic **5xx** from our own origin | FAIL | ✅ |
| Lookalike host `fonts.gstatic.com.evil.test` | **not trusted** | ✅ |
| First-party failure alongside third-party noise | FAIL, not masked | ✅ |

### Browser-level proof

Unit tests alone would only prove the classifier's logic, not that it is wired in correctly. Two live-browser tests were run against the real build using request interception:

| Scenario | Observed |
|---|---|
| Block `**/legal-pages.css` → 404 | first-party failures `["http://127.0.0.1:3000/legal-pages.css"]`, real console errors **1** — **still fails** |
| Block `https://fonts.gstatic.com/**` → 404 | 2 third-party failures, 0 first-party, **0 real errors** — correctly ignored |

Existing assertions are untouched: `<html lang>`, single visible localized H1, `.legal-body` max-width 760px (proving the stylesheet applied), horizontal overflow ≤2px at all five breakpoints, and `pageerror`.

---

## 5. 10-RUN STABILITY

`tests/e2e/legal-pages.spec.ts`, `workers: 1`, `retries: 0`:

| Runs | Result |
|---|---|
| 1–10 | **20 passed** every run |

**10/10 clean, against 3-of-6 failing before.**

## 6. FULL-SUITE STABILITY

| Run | Result |
|---|---|
| 1 | **160 passed** |
| 2 | **160 passed** |
| 3 | **160 passed** |

**3/3 clean full-suite runs.**

---

## 7. Gate

| | |
|---|---|
| `git diff --check` · lint · typecheck | clean · PASS · PASS |
| Unit tests | **522** (was 505; +17 negative controls), 22 files |
| Playwright | **160**, 3/3 clean full runs |
| Validators | **21/21 PASS** + security + Seznam |

## 8. Scope

Files changed: `lib/testing/console-noise.ts`, `lib/testing/console-noise.test.ts`, `tests/e2e/legal-pages.spec.ts`.

**No `pages/`, no `lib/content/`, no `public/`, no `components/`, no `netlify.toml`.** No product, content or SEO change of any kind.

## 9. State

IMPLEMENTED ✅ · VALIDATED ✅ · PUSHED ⏳ · MERGED ❌ · DEPLOYED ❌
