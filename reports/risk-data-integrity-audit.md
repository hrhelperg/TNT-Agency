# Risk & Data Integrity — Discovery Audit (W4 · W5 · W7)

**Baseline SHA:** `e9cfd067779211751bf6cddbd8f3af33a28105ec` · **Branch:** `fix/risk-data-integrity-hardening`
**Method:** direct measurement + 4 parallel repository audits + adversarial verification of the two highest-stakes conclusions. No implementation written before this report.

**All three historical findings are still present on current main. One is materially worse than previously recorded.**

---

# W4 — Payroll share-link privacy

## W4.1 Exact current behaviour

`pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx`

| | |
|---|---|
| Producer | `copyLink` at **:379–384** — `btoa(unescape(encodeURIComponent(JSON.stringify(inp))))` → `?d=<base64>` → `navigator.clipboard.writeText` |
| Consumer | restore effect at **:317–337** — `JSON.parse(decodeURIComponent(escape(atob(d)))) as PayrollInput` → `setInp(prev => ({...prev, ...decoded}))` |
| Payload | the **entire `PayrollInput`** |
| Base64 is **encoding, not encryption** | anyone holding the link can decode it in one line |

## W4.2 What the payload actually contains — worse than recorded

The historical finding described this as *wage data*. Reading `lib/payroll/types.ts`, `PayrollInput.taxProfile` also carries:

| Field | Content |
|---|---|
| `taxProfile.disability` | `'none' \| 'first_second' \| 'third'` — **invalidity degree** |
| `taxProfile.ztpp` | ZTP/P severe-disability card holder — **health status** |
| `taxProfile.children[].ztpp` | per-child ZTP/P — **health status of a child** |
| `taxProfile.residency` | tax residency |
| `wage`, `adjustments`, `agency`, `direct` | wage, four bonus types, agency fee model and rates, operational costs |

**Adversarial verification: NOT REFUTED. Corrected severity — special-category (health) personal data under GDPR Art. 9**, alongside business-confidential economic data. The fields are user-settable in the form and pass into the payload unsanitised.

## W4.3 Exposure surfaces — measured

| Surface | Reachable | Note |
|---|---|---|
| Clipboard (the URL itself) | **YES** | explicit user action |
| Recipient address bar + browser history | **YES** | the payload is never scrubbed after decode |
| **Third-party analytics ingest** | **YES** | ⚠️ see W4.4 |
| Netlify/CDN edge access logs | **YES** | full request line |
| Same-origin `Referer` | **YES** | `strict-origin-when-cross-origin` sends the full URL same-origin |
| Cross-origin `Referer` | no | mitigated by `Referrer-Policy` in `netlify.toml` |
| Print header/footer | **YES** | browser prints the URL |
| localStorage · cookies · IndexedDB · attribution · CTA source | **no** | verified, no writer touches the URL |
| `fetch`/XHR/`sendBeacon` from the page | **no** | zero network calls in the page or `lib/payroll/**` |
| Internal links carrying `?d=` | **0** | verified in built HTML |
| `eval` / dynamic code | **no** | none |

## W4.4 The load-bearing finding — and a correction to my own earlier statement

**In the previous phase I described this feature as "user-initiated, clipboard-only, nothing transmitted". That was wrong for the case that matters: when a recipient opens the link.**

`lib/analytics/webmasterid.ts:19` records the tracker's verified payload as including **`url`** — the full `location.href`. So opening a shared link transmits the base64 payload to a third-party ingest endpoint.

**Empirically demonstrated.** With consent accepted and the tracker stubbed to emit its *documented* shape, navigating to a `?d=` link produced one ingest request whose `url` contained the payload, and the wage sentinel `987654321` decoded straight back out of it.

> **Precision about this proof.** The live third-party bundle was **not** exercised — doing so would have sent real data to a third party. The stub emits the payload shape the repository's own verified notes attribute to the bundle. The finding is therefore: *given the documented `url` field, a shared link's contents are transmitted.* Chain: recipient accepts cookies → opens link → payload leaves the origin.

## W4.5 Decode robustness — no validation at all

`JSON.parse(...) as PayrollInput` is a **compile-time cast only**. Any JSON object is spread into application state: no schema, no allowlist, no type check, no size cap, no version.

Measured with crafted links:

| Payload | Result |
|---|---|
| `{"wage": null}` | **page fails to render** (no `<h1>`) |
| `{"workedTime":5,"premiums":null,"taxProfile":[]}` | **page fails to render** |
| ~50 KB payload | test aborted |
| `{"__proto__":{...}}` | **not exploitable** — object spread defines own properties |

The `try/catch` wraps only the decode; the subsequent `calculate(inp)` is outside it. So a crafted link is a working page-break vector against a recipient.

## W4.6 Indexability

Canonical is the static `PAGE_URL` with no query, so a `?d=` URL self-canonicalises to the clean one and **0 internal links** carry a payload. Nothing *directs* a crawler to a share URL — but nothing prevents one being crawled if it is posted publicly.

## W4.7 Data classification

| Class | Fields |
|---|---|
| **Special category (health)** | `disability`, `ztpp`, `children[].ztpp` |
| **Personal** | `residency`, `signedDeclaration`, children count |
| **Business confidential (economic)** | wage, average earnings, four bonuses, agency fee model/rates, VAT handling, 11 direct-employment cost lines |
| Non-sensitive config | `mode`, `period`, `workedTime`, premium toggles |

Deliberately **not** overclassified: a gross wage alone is not special-category. The health fields are.

## W4.8 Options considered

| | Option | Verdict |
|---|---|---|
| A | Keep encoded URL | **Rejected** — transmits health data to a third party |
| B | Share structure without monetary values | Rejected — strips the numbers, making the link pointless |
| C | Sanitized scenario with opt-in | Rejected — still puts economics in a URL and in analytics |
| D | Local file export/import | Viable, but **adds a feature** in a hardening phase |
| E | **Clipboard text summary** | **Already exists** (`copySummary`, 8 result lines, no URL) |
| F | Hash fragment `#s=` | Rejected — avoids the server and the Referer, but still clipboard, history and print, and still carries health data |
| G | **Remove URL sharing** | **CHOSEN**, together with E |

**Decision: remove the `?d=` payload — both producing and consuming it — and keep the existing explicit clipboard summary and CSV download.**

Consuming must go too: keeping the decoder would preserve an unvalidated deserialization path (W4.5) for a payload we no longer create. An incoming legacy `?d=` must be ignored gracefully, not parsed.

**Stated trade-off, not hidden:** users lose "send a colleague a link that reopens my exact inputs." That is a real functionality loss. `copySummary` and the CSV export preserve *sharing the result*; they do not preserve *restoring the scenario*. If the owner wants scenario sharing back, local file export (option D) is the safe shape.

**Still shareable by explicit user action, after the fix:** the clipboard summary and the CSV both contain computed economic values. That is the user deliberately exporting their own numbers, and it is labelled — it is not eliminated, and this report does not pretend otherwise.

---

# W5 — Attribution test integrity

## W5.1 The stale citation is still present

`lib/attribution/index.ts:3` — *"Design rules, enforced by tests in `./attribution.test.ts`"*. **`lib/attribution/` contains exactly one file: `index.ts`.**

A repo-wide sweep of every `*.test.*` / `*.spec.*` token in source found **exactly one** citation that does not resolve — this one. Every other cited test file exists.

## W5.2 Coverage map — the claims are mostly true, the citation is not

| Rule | Implementation | Test | Gate |
|---|---|---|---|
| 1 — strict allowlist (`ATTRIBUTION_FIELDS`, 11) | `index.ts:19–31, 92–103` | ✅ `employer-request.test.ts` | ✅ |
| 1b — `CTA_SOURCES` sub-allowlist (8) | `index.ts:61–75, 138` | ✅ | ✅ `validate-conversion.js` |
| 2 — no sensitive values (`ATTRIBUTION_DENYLIST`, 31) | `index.ts:41–47, 82–89` | ✅ | ✅ |
| **3 — session-limited** (never localStorage/cookies/IndexedDB/URL/history) | `index.ts:49, 145–206` | ❌ **NONE against the implementing file** | ❌ |
| 4 — no network | absence property | ✅ `validate-conversion.js` | ✅ |
| referrer reduced to hostname | `index.ts:105–114` | ✅ | — |
| values trimmed / capped at 200 | `index.ts:98` | ✅ | — |
| first-touch stickiness | `index.ts:169–200` | ✅ | — |
| safe degradation | `index.ts:145–163` | ✅ | — |
| `clearAttribution()` "used after a completed request" | `index.ts:202–210` | ❌ NONE | ❌ **and no caller — dead code with a false claim** |

**So the honest position: coverage is largely real but lives under other filenames; one rule (3) is genuinely untested; one function is dead; the citation is false.**

## W5.3 A second false coverage claim — in my own code

`scripts/validate-cta-routing.mjs:258` waives a CTA-routing exception for `EmployerSituations.tsx` with the reason *"the constant is /poptavka-pracovniku and is **asserted in the component tests**"*. **Those tests do not exist** — zero hits for `EmployerSituations` in any `*.test.ts` / `*.spec.ts`.

I wrote that line in the previous phase. It is the same defect class as W5, inside the gate whose job is to stop unroutable CTAs. Note the deliberate contrast with the sibling exception at `:263`, whose citation **is** backed by a real assertion.

## W5.4 Context worth recording

**No validator or vitest suite runs in CI.** The only GitHub workflow is `indexing.yml` (post-deploy). Every gate in this repo is manually invoked. That does not make the gates worthless, but "the gate would catch it" means "if someone runs it".

---

# W7 — Payroll freshness

## W7.1 What already exists — better than the historical finding implied

All statutory values live in **one** file, `lib/payroll/rules/cz-2026.ts`, and **every value is wrapped in `Ruled<T>` carrying its own `sourceId` and `legalBasis`**. `lib/payroll/sources.ts` holds 14 sources with authority, title, URL and retrieval date.

**Per-value source provenance already exists.** W7 is not a provenance gap.

## W7.2 What is missing

| | Finding |
|---|---|
| **No clock comparison anywhere** | verified: no `Date.now`/`new Date()`/`getFullYear` staleness logic in `scripts/` or `lib/` |
| `effectiveFrom` / `effectiveTo` exist at `cz-2026.ts:103–104` | **dead — no consumer anywhere** |
| `LAST_VERIFIED` | defined in **3 unlinked places**; all read `2026-07-18` today, so nothing is user-visibly wrong — the defect is structural |
| Year literals | **41**, several hardcoded, e.g. `HomePayrollCalculator.tsx:93` falls back to a literal `2026`; page title and description hardcode "2026" |
| Engine year guard | none — `taxYear: 2026` is the only machine-readable year |

## W7.3 Year-boundary behaviour — measured

**On 1 January 2027 nothing changes.** The site serves byte-identical 2026 output with no banner, no warning, no build failure and no degraded state, while the UI continues to describe the rules as verified against official sources.

**Adversarial verification: NOT REFUTED.** The UI does carry a disclaimer recommending confirmation with a payroll specialist, which limits the harm — but the verification claim itself is unconditional and would silently become false.

---

# Cross-cutting inventory

**Persistence today** — `cookie_consent` (localStorage), `tnt-lang` (localStorage), `tnt-cta-source` (sessionStorage), `tnt-attribution` (sessionStorage), plus three WebmasterID keys. One stray `cookie-consent.js` sits at the repository root, unserved and unreferenced.

**Existing payroll-leak gate:** partial — `tests/e2e/webmasterid.spec.ts:338` asserts calculator inputs never reach analytics, but it exercises a *normal* calculation, **not a shared `?d=` link**. That is precisely the gap W4.4 exploits.

**24 npm gate scripts** (19 `validate:*`, 4 `test:mutate*`, 1 `verify:*`) plus `security`.

---

# Planned implementation

| | Change |
|---|---|
| **W4** | Remove `?d=` production and consumption; ignore legacy payloads gracefully; keep `copySummary` + CSV; new gate + mutations |
| **W5** | Correct the citation to the real files; add the missing session-limited test; remove or wire `clearAttribution`; fix my own false citation at `validate-cta-routing.mjs:258` |
| **W7** | Wire the dead `effectiveFrom`/`effectiveTo`; single source of truth for `LAST_VERIFIED`; explicit `verificationStatus`; freshness gate with a safe year-boundary transition; UI year derived from ruleset metadata |

**Invariants to hold:** 185 canonical · 185 sitemap · 175 static · 0 dynamic/SSG/ISR · 1 WebmasterID · no backend · no new persistence · no new URL.
