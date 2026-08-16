# hreflang Audit & Hygiene Fix

**Baseline:** `b90e8d8` (merge of PR #33, the locale decision map) — not `7b1180d`; main advanced while the map was under review.
**Branch:** `fix/hreflang-hygiene`
**Scope:** hreflang correctness only. No locale routing, no new routes, no URL changes.

---

## 1. Where hreflang lived

Scanned React pages, shared SEO components, `_document`, head helpers, static legal HTML, the sitemap and the content registries.

| Source | hreflang found |
|---|---|
| `pages/*.tsx` (9 files) | 20 declarations |
| `components/SeoArticle.tsx` | 2 declarations → applied to **162** registry pages |
| `pages/_document.tsx` | none |
| `public/*.html` (10 static files) | **0** |
| `public/sitemap.xml` | **0** |
| Content registries (`lib/content/**`) | none |

Two existing tests already asserted the *absence* of hreflang on specific surfaces (`lib/ecosystem/ecosystem.test.ts`, `lib/employer-request/conversion.test.ts`) — so "no hreflang" was already an accepted state in parts of this codebase.

---

## 2. Before — every declaration, audited

| Page | Canonical | Declared alternates | Target exists? | Genuine translation? | Reciprocal? | Verdict |
|---|---|---|---|---|---|---|
| `/` | self | `en`, `cs`, `de`, `x-default` — **all → `/`** | yes (itself) | **No** — one Czech document | n/a | **FALSE ×4** |
| `/contact` | self | `en`, `x-default` → self | yes | **No** — renders Czech | n/a | **FALSE** |
| `/agencies` | self | `en`, `x-default` → self | yes | **No** — renders Czech | n/a | **FALSE** |
| `/offers` | self | `en`, `x-default` → self | yes | **No** — renders Czech | n/a | **FALSE** |
| `/submit-agency` | self | `en`, `x-default` → self | yes | **No** — renders Czech | n/a | **FALSE** |
| `/submit-offer` | self | `en`, `x-default` → self | yes | **No** — renders Czech | n/a | **FALSE** |
| `/kalkulacka-mzdy-…` | self | `cs`, `x-default` → self | yes | No alternate set | n/a | Redundant |
| `/zamestnavani-cizincu` | self | `cs`, `x-default` → self | yes | No alternate set | n/a | Redundant |
| `/socialni-zdravotni-dane-2026` | self | `cs`, `x-default` → self | yes | No alternate set | n/a | Redundant |
| **162 SeoArticle pages** | self | `cs`, `x-default` → self | yes | No alternate set | n/a | Redundant |
| `/privacy-policy` | self | **none** | — | **Yes — EN of a real 3-language set** | **No** | **MISSING** |
| `/privacy-cs.html` | self | **none** | — | **Yes** | **No** | **MISSING** |
| `/privacy-de.html` | self | **none** | — | **Yes** | **No** | **MISSING** |
| `/cookies.html` `-cs` `-de` | self | **none** | — | **Yes** | **No** | **MISSING ×3** |
| `/terms.html` `-cs` `-de` | self | **none** | — | **Yes** | **No** | **MISSING ×3** |

### The two failure modes, stated plainly

**Declared where nothing exists.** The homepage told crawlers that English, Czech and German versions of the page existed, at one URL, in one Czech document. Five more pages claimed an English version of Czech HTML. This was an accurate description of the *client-side* language swap and an untrue description of anything indexable.

**Missing where translations are real.** The nine legal documents are genuinely translated, each at its own canonical URL, each with a correct `<html lang>` — and they declared nothing. Three complete reciprocal sets, entirely undeclared.

### One further defect found during the audit

`/privacy-policy` is the canonical **English** privacy document, but `pages/_document.tsx` hardcoded `<Html lang="cs">` for every Next route. English prose was being served declared as Czech. Adding `hreflang="en"` pointing at it would have made that hreflang untrue at the moment it was added, so the `lang` had to be fixed first.

---

## 3. After

| Change | Count |
|---|---|
| Pages that **lost** false/redundant hreflang | **171** (9 hand-written + 162 registry pages) |
| Individual `<link rel="alternate">` tags removed | **22 source lines**, affecting 171 rendered pages |
| Legal documents that **gained** reciprocal hreflang | **9** |
| Reciprocal sets now declared | **3** (privacy, cookies, terms) |
| Documents declaring hreflang | 9 of 187 |
| Documents correctly declaring nothing | 178 |

Rendered `<html lang>` distribution: **cs 181 · en 3 · de 3**.

### Why no `x-default`

Deliberately omitted from all three sets. `x-default` is for a page that targets no particular language — a language selector, or a genuine neutral fallback. None of the nine legal documents is one; each is written in a specific language. Pointing `x-default` at whichever happened to be English would state something untrue, which is the exact class of defect this PR removes. The validator fails any `x-default` that is not backed by a documented neutral page, and the allowlist is intentionally empty.

### Language codes

`en`, `cs-CZ`, `de`. The Czech documents carry `<html lang="cs">` while being declared `cs-CZ`; `cs-CZ` is a regional specialisation of `cs`, so the validator compares primary subtags rather than requiring byte equality.

---

## 4. Verification

| Check | Result |
|---|---|
| Canonical URLs | **185 → 185** |
| Sitemap URLs | **185 → 185**, file unchanged |
| Routes added / removed | **0 / 0** |
| Redirects added | **0** (`netlify.toml` unchanged) |
| Build: static routes | **175 → 175** |
| Build: dynamic / SSG / ISR routes | **0 → 0** |
| Locale routing started | **No** |
| `/en/` or `/de/` routes created | **No** |
| Middleware / GeoIP added | **No** |
| Canonical strategy changed | **No** — every canonical is byte-identical |
| Legal text changed | **No** — only `<head>` link tags |
| WebmasterID / conversion flow | **Untouched** |

Rendered-HTML QA against a production build:

| URL | `<html lang>` | alternates | canonical |
|---|---|---|---|
| `/` | cs | **0** | self |
| `/nabor-svarecu` | cs | **0** | self |
| `/privacy-policy` | **en** | 3 | self |
| `/privacy-cs.html` | cs | 3 | self |
| `/privacy-de.html` | de | 3 | self |
| `/cookies.html` | en | 3 | self |
| `/cookies-cs.html` | cs | 3 | self |
| `/cookies-de.html` | de | 3 | self |
| `/terms.html` | en | 3 | self |
| `/terms-cs.html` | cs | 3 | self |
| `/terms-de.html` | de | 3 | self |

---

## 5. New gate: `validate:hreflang`

Runs against **built HTML** (`.next/server/pages` + `public/`), not source, because what ships is what crawlers read.

Fails on: an alternate pointing at a URL that does not exist · the same URL declared under two language codes · a non-reciprocal set · an alternate target that is not self-canonical · a language code outside the allowed set · a target whose `<html lang>` contradicts the hreflang claimed for it · a duplicate hreflang entry · `x-default` without a documented neutral fallback · hreflang on a page with no genuine translation set · **a drop in the prerendered static route count**.

That last one is deliberate: it is the locale programme's tripwire. `_document` now resolves `<html lang>` per route, and if that ever opts pages into request-time rendering the built HTML disappears and the count collapses — so the count is gated at ≥175.

### Mutation-tested — 10 defects, plus two controls

Runs the real exported `auditHreflang()` against deep-cloned copies of the actual build. All five mutations required by the brief, plus five more:

| # | Mutation | Caught |
|---|---|---|
| 1 | Fake `en` alternate on a Czech-only page | ✓ |
| 2 | Reciprocal `de` link removed from a set member | ✓ |
| 3 | `cs-CZ` alternate pointed at a 404 | ✓ |
| 4 | `x-default` added to an unrelated page | ✓ |
| 5 | `<html lang>` contradicting the hreflang claimed | ✓ |
| 6 | One URL declared under two language codes | ✓ |
| 7 | Duplicate hreflang entry | ✓ |
| 8 | Disallowed language code (`de-AT`) | ✓ |
| 9 | Alternate target not self-canonical | ✓ |
| 10 | Static prerender regression | ✓ |
| control | Real build passes | ✓ |
| negative control | A Czech page with no hreflang is **legal**, not a failure | ✓ |

---

## 6. One existing validator was modified — and made stricter

`scripts/validate-czech-default.js` asserted the literal string `<Html lang="cs">` in `_document.tsx`. That string no longer exists, because `lang` is now resolved per route.

**This is disclosed rather than buried, because "do not weaken a validator to make a change pass" is a standing rule.** The literal was a *proxy* for the real property — "Czech is the server default". The proxy was replaced with checks of the property itself:

- `DEFAULT_LANG === 'cs'` must be declared
- `<Html lang={lang}>` must be rendered
- the fallback must be `lang = DEFAULT_LANG`
- a `DOCUMENT_LANG` override map must exist
- **every override must name a route that actually exists**
- **no override may be `'cs'`** (redundant with the default)
- **more than 3 overrides fails** — at that point Czech-default is no longer the rule and the architecture needs review

The new version rejects strictly more broken states than the old one. The old check would have passed a file that kept the literal string somewhere while changing the actual default; the new one would not.

---

## 7. Full gate

| | |
|---|---|
| `git diff --check` | clean |
| Lint · Typecheck | PASS · PASS |
| Unit tests | **377 passing** (18 files) |
| Playwright | **138 passing** |
| Production build | PASS — 175 static, 0 dynamic |
| Validators | **18/18 PASS** — hreflang, seo, sitemap, i18n, czech, czech-default, legal, trust, eeat, conversion, authority, authority-v4, growth, claims, clusters, regional, tier1, + security |
| Seznam verification | PASS |
| Mutation tests | hreflang **10 caught** · authority-v4 **11 caught** |

---

## 8. State

IMPLEMENTED ✅ · VALIDATED ✅ · PUSHED ⏳ · MERGED ❌ · DEPLOYED ❌ · CRAWLED ❌ · INDEXED ❌ · RANKED ❌

**No locale migration began.** No `/en/` or `/de/` route exists. No Czech URL moved. No redirect was added. The public site remains 100% statically prerendered.
