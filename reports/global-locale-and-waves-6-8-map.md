# Global Locale Architecture & Waves 6–8 — Decision Map

**Phase L0 — audit only. No implementation. No locale migration.**
Every figure below was measured from the repository at the SHA in §A, a real `next build`, and live production HTTP probes on 2026-08-16.

---

## A. Current main SHA

```
7b1180dc847a30a5a24e7d12ed94592227d0a878
```

`Merge pull request #32 from hrhelperg/feat/wave-4-cross-cluster-authority-high-skilled`
Parent: `0b75b1b` (Wave 3, PR #31). Working tree clean, local `main` == `origin/main`.

**Wave 4 is DEPLOYED.** Verified against production, not assumed: `/nedostatek-pracovniku-ve-vyrobe` now links to `/nabor-svarecu` and `/nabor-cnc-operatoru`, and `/onboarding-zamestnancu` links to `/montazni-pracovnici` and `/skladovi-pracovnici` — all four Wave 4 edges are live. This supersedes the `DEPLOYED ❌` recorded in `wave-4-final.md` §8.

---

## B. Current route count

| | Count |
|---|---|
| Canonical URLs in `public/sitemap.xml` | **185** |
| Next.js routes (all prerendered) | **175** |
| Static `.html` files in `public/` | **10** |
| Of the 175: `SeoArticle`-driven registry pages | **162** |
| Of the 175: hand-written pages with `data-i18n` chrome | 6 |
| Of the 175: other hand-written pages | 7 |

Cluster distribution across all 185:

| Cluster | n | | Cluster | n |
|---|---:|---|---|---:|
| region | 54 | | industry | 24 |
| foreign_workers | 28 | | technical_talent | 23 |
| knowledge | 25 | | other | 14 |
| employer_problem | 11 | | trust / request / homepage / calculator | 2 / 2 / 1 / 1 |

Corpus health: word count min **170**, median **281**, max **1092**; **0 pages under 150 words**.

---

## C. Current localization architecture

**Entirely client-side. There is no server-side locale of any kind.**

| Element | Reality |
|---|---|
| Dictionary | `const T` in `public/script.js` — **265 leaf strings × 3 locales** (cs/en/de), 15 groups |
| Swap mechanism | `[data-i18n]` attribute → `textContent` replacement after hydration |
| Persistence | `localStorage['tnt-lang']`, default `'cs'` |
| `<html lang>` | Server renders `lang="cs"` (`_document.tsx:42`); JS overwrites `document.documentElement.lang` client-side |
| Next.js i18n config | **None** — `next.config.js` has no `i18n` block |
| Middleware | **None** |
| Locale routes | **None** — one canonical URL per page |
| Article bodies | **Not translated, by policy** |

### The existing editorial policy is already correct

`components/ArticleLanguageNotice.tsx` documents a deliberate decision ("Strategy 2"): when a visitor selects EN/DE, the chrome localizes but **the article body stays Czech**, with an honest on-page notice explaining that Czech employment and legal terminology is not machine-translated.

This matters enormously for §8 and §36 of the brief: the product has *already* refused to auto-translate Czech legal content into German. That instinct should be preserved, not overwritten.

### What this means for search engines

Google, Seznam and every other crawler see **only the Czech HTML**. The 265 EN/DE strings exist solely in a JavaScript object applied after hydration. There is currently **no indexable English or German content anywhere on the site except the legal pages** (§H).

So the honest statement of today's position is: *the site is monolingual to search engines and trilingual to human visitors.*

---

## D. Static vs dynamic rendering baseline

From a clean `npm run build` at `7b1180d`:

| Render mode | Routes |
|---|---:|
| ○ Static (prerendered) | **175** |
| ● SSG (`getStaticProps`) | 0 |
| λ/ƒ Dynamic (server-rendered) | **0** |
| ISR | 0 |

**100% static. Zero dynamic routes. No `pages/api`, no `app/` directory, no middleware.**

This is the single most valuable property the site currently has, and the locale programme's primary risk is destroying it. §37's before/after target is therefore: **175 static / 0 dynamic → N static / 0 dynamic.** Any dynamic route introduced by locale work is a failure unless separately justified.

---

## E. Cache behaviour (measured in production)

```
cache-control: public,max-age=0,must-revalidate
vary:          Accept-Encoding
etag:          "mypa0pvao11hl"
age:           38930          ← ~10.8 hours at the CDN edge
server:        Netlify
```

Findings:

1. **The CDN is genuinely caching.** `age: 38930` on the homepage proves edge retention; revalidation is ETag-based.
2. **`Vary` does not include `Accept-Language` or `Cookie`.** The HTML does not vary by locale today — correct, because locale is applied client-side. This is exactly the "stable URL = stable HTML" property §10 wants gated.
3. `max-age=0, must-revalidate` means browsers revalidate every navigation; the CDN absorbs it. This is Netlify's Next runtime default, not a misconfiguration.

Deployment: Netlify + `@netlify/plugin-nextjs`, publish `.next`. `netlify.toml` carries 7 host-canonicalisation 301s, 1 path 301 (`/privacy.html → /privacy-policy`), and security headers only — **no `Cache-Control` overrides and no locale redirects**.

> Stale comment found: `netlify.toml` and `next.config.js` both reference API routes (`/api/send-email`, "API routes require a server runtime") that **do not exist**. Harmless today, but `output: 'export'` was disabled for a reason that no longer applies. Worth revisiting separately — not part of this programme.

---

## F. Recommended locale URL strategy

### Recommendation: **Strategy B — keep Czech legacy URLs canonical; prefix only translations.**

```
/nabor-svarecu              ← Czech, unchanged, canonical
/en/welder-recruitment      ← new
/de/schweisser-recruiting   ← new
```

Evaluated against the brief's criteria:

| Criterion | Strategy A (prefix everything, `/cs-cz/…`) | **Strategy B (recommended)** |
|---|---|---|
| Migration risk | **Severe** — every one of 185 URLs changes | **None** — zero existing URLs move |
| Redirect volume | **185 permanent 301s**, forever | **0** |
| Existing indexed URLs | All must be re-earned | All preserved |
| Backlinks | Every external link becomes a redirect hop | Unaffected |
| GSC state | Full re-discovery; historical data splits at the URL level | Continuous |
| Sitemap impact | Full rewrite | Additive only |
| Canonical stability | Breaks and re-forms | Untouched |
| Netlify routing | 185 redirect rules to maintain | Prefix rules only |
| Cacheability | Equivalent | Equivalent |
| Maintainability | Marginally tidier | Slight asymmetry (cs unprefixed) |
| Future countries | Equivalent — `/de-de/` works under both | Equivalent |

**The aesthetic argument favours A. Every risk-bearing criterion favours B.**

The decisive factor: this site's recorded indexation history is *"Discovered – currently not indexed"* — the reason the growth-cohort system exists at all. A corpus with fragile indexation is the worst possible candidate for a wholesale URL migration. Redirecting 185 URLs on a domain that is already struggling to get crawled would risk the entire Czech corpus to gain a cosmetic symmetry.

Strategy B's only real cost is asymmetry: Czech has no prefix, EN/DE do. That is a maintenance nuisance, solvable with a typed locale registry (§J) where Czech's prefix is simply the empty string.

**§3 of the brief anticipates exactly this conclusion** — *"PREFER avoiding unnecessary migration of established Czech canonical URLs."* The measurement supports it.

---

## G. Czech migration decision

**Do not migrate Czech URLs. Not in this programme, and not later without search-data evidence that the current URLs are actively harmed.**

Recorded so a future wave cannot silently reverse it:

- 185 Czech canonical URLs stay exactly where they are.
- Czech remains the default locale, served at the unprefixed path.
- Czech remains self-canonical.
- No `/cs-cz/` prefix is introduced for existing content.
- If a future market genuinely requires `/cs-cz/`, it is introduced *alongside* — never as a replacement — and only with GSC evidence in hand.

---

## H. hreflang strategy

### Two live defects found

**1. `pages/index.tsx` emits false alternates.** Lines 64–67 declare four hreflang values — `en`, `cs`, `de`, `x-default` — **all pointing at the same URL** `https://talentpartnerid.com/`.

This claims three distinct language versions exist at one URL. They do not; there is one Czech HTML document whose chrome is swapped by JavaScript. It is an accurate description of the *client-side* model and an invalid description of the *indexable* one. It is precisely the antipattern §10 asks to be gated: same canonical URL, different language HTML claimed.

**This should be corrected regardless of whether the locale programme proceeds.** The honest current-state declaration for the homepage is `cs` + `x-default`, both self-referencing — matching what `SeoArticle` already emits for all 162 registry pages.

`pages/submit-offer.tsx` and four others declare `en` + `x-default` on a Czech-rendered page — the same error in milder form.

**2. Real translations exist with zero hreflang.** The legal layer already has genuine per-locale content at distinct URLs:

| Language | Terms | Privacy | Cookies |
|---|---|---|---|
| EN | `/terms.html` | `/privacy-policy` | `/cookies.html` |
| CS | `/terms-cs.html` | `/privacy-cs.html` | `/cookies-cs.html` |
| DE | `/terms-de.html` | `/privacy-de.html` | `/cookies-de.html` |

Each carries the correct `<html lang>` and a correct self-canonical. **None carries a single hreflang tag** — 0 across all nine files. Three complete, reciprocal alternate sets are sitting there undeclared.

### Proposed strategy

| Stage | Action |
|---|---|
| **Now (low risk, high value)** | Fix the false alternates in `index.tsx` and the five `en`-declaring pages. Add reciprocal hreflang to the nine legal pages — 3 sets × 3 languages, each self-canonical. |
| **Phase L4** | Emit hreflang only for pages that have a genuinely published equivalent, generated from the locale registry so reciprocity is structural rather than hand-maintained. |
| **Never** | Emit hreflang for a translation that does not exist; canonicalise EN/DE back to Czech; invent regional alternates (`de-AT` etc.) without market-specific content. |

**One source of truth: on-page `<link rel="alternate">`, generated from the registry.** Sitemap hreflang is explicitly *not* recommended — it would create the competing second source of truth §4 warns against, and this corpus's sitemap is hand-curated with a read-only validator, so drift would be silent.

---

## I. GeoIP / Accept-Language strategy

### Recommendation: **no GeoIP at all in Phase 1. No `Vary: Accept-Language` on content pages. Ever.**

The brief permits geo/language detection to *suggest* a locale. The measured constraint is §D/§E: the site is 100% static and CDN-cached with no language-varying `Vary`. Any per-request language negotiation on a content URL converts that page to dynamic rendering or fragments the cache — the exact failure §2 and §37 forbid.

Proposed precedence, resolved **client-side only**, and only ever used to *offer* a switch:

1. Explicit user selection this session
2. Locale already present in the URL path — **authoritative; never overridden**
3. Persisted preference (`localStorage`)
4. `navigator.language`
5. Country hint — *only* once a real market variant exists
6. Fallback: Czech

Rules that follow from the brief and from the cache constraint:

- A visitor on `/en/...` is **never** redirected to Czech because their IP is Czech. URL beats inference, always.
- A Czech visitor who chooses German **keeps German** across navigations.
- Inference produces a **dismissible suggestion banner**, not a redirect.
- If a root-path redirect is ever added, it lives at the edge (Netlify redirect / edge function) on `/` only, uses **302**, and never touches a content URL.
- No `Vary: Accept-Language` on any content page.

The one honest cost: a first-time German visitor landing on a deep Czech URL sees Czech until they act. That is strictly better than the alternatives — invisible content swapping (breaks caching and search clarity) or auto-redirects (locks users out of content they navigated to deliberately).

---

## J. Market vs language data model

§7's distinction is the most architecturally important requirement in the brief, and the current codebase has **no representation of it at all** — `lang` is a bare string `'cs' | 'en' | 'de'`.

Proposed typed model (illustrative, not implemented):

```ts
interface Locale {
  id: string             // 'cs' | 'en' | 'de'  — later 'de-de', 'en-gb'
  language: string       // ISO 639-1
  pathPrefix: string     // '' for cs, '/en', '/de'
  hreflang: string       // 'cs-CZ' | 'en' | 'de'
  market: Market         // WHICH MARKET the content describes
  isDefault: boolean
}

interface Market {
  id: string             // 'cz'
  country: string        // 'CZ'
  jurisdiction: string   // 'CZ' — the legal system the content describes
  serviceAvailable: boolean
  legalNotice: string    // rendered on every page in this market
}
```

The critical invariant, stated as a rule a validator can enforce:

> **`locale.market` is independent of `locale.language`.** German-language content describing Czech recruitment has `language: 'de', market: 'cz', jurisdiction: 'CZ'`. It is **not** a Germany-targeted service page and must never be labelled as one.

Every EN/DE page in Phase 1 therefore carries `market: 'cz'` and renders the §8 legal-context statement:

> *"Diese Seite bezieht sich auf Beschäftigung und Personalvermittlung in der Tschechischen Republik."*

A future `market: 'de'` requires separate legal and content review and is explicitly **out of scope** for Waves 6–8.

---

## K. Locale page tiers

Classifying all 185 URLs per §9 and §35:

| Template class | Pages | Tier | Locale treatment |
|---|---:|---|---|
| `technical_talent` (23), `industry` (24), `request` (2), `calculator` (1), `homepage` (1) | **51** | **A** — commercial | Candidates for full cs/en/de |
| `knowledge` (25), `employer_problem` (11) | **36** | **B** — employer knowledge | Selective; only where an EN/DE employer genuinely needs it |
| `region` (54), `foreign_workers` (28) | **82** | **C** — Czech-specific | **Czech canonical only.** Czech labour-market and permit content; translating it risks reading as foreign-market guidance |
| `trust` (2), `other` (14) incl. legal | **16** | **D** — utility/legal | Deliberate per-page treatment; legal already trilingual |

Template classification per §9:

| Class | Which |
|---|---|
| **FULLY TRANSLATABLE** | Tier A commercial pages, the request form, the calculator UI |
| **CHROME-ONLY** | All 162 `SeoArticle` pages today (265 chrome strings; bodies Czech) |
| **CZECH-AUTHORITATIVE** | All 82 Tier C pages; all regional/permit/payroll content |
| **LEGAL-TRANSLATION** | The 9 legal files — already done, needs hreflang only |
| **NOT YET LOCALIZED** | Everything else |

---

## L. Expected URL multiplication

| Scenario | New URLs | Total | Verdict |
|---|---:|---:|---|
| Naive: translate everything × 3 | +370 | **555** | **Rejected.** §35 forbids it; 82 Tier C pages would become misleading, and the corpus would triple while indexation is already fragile |
| All Tier A + all Tier B × 2 | +174 | 359 | Too much at once |
| **All Tier A × 2 (recommended ceiling)** | **+102** | **287** | Defensible, but still a 55% corpus increase |
| **Pilot: 12 Tier A pages × 2 (recommended start)** | **+24** | **209** | **Recommended.** Proves the architecture at low risk |

**Recommendation: pilot first.** Publish 12 high-value Tier A pages in EN and DE, plus the request form and calculator, and *measure whether they get indexed at all* before scaling. On a domain whose known failure mode is "Discovered – currently not indexed", publishing 102 new URLs on an unproven architecture would be exactly the wrong bet — and it is the bet the naive reading of this brief invites.

---

## M. Wave 6 — high-skilled candidate decisions

Deduped against the 23 live `technical_talent` pages by reading their actual titles, keywords and headings.

| Candidate | Already owned by | Decision |
|---|---|---|
| PLC programmers | `nabor-techniku-automatizace` — keyword *"PLC programátor"*, heading on control-system platforms | **EXPAND EXISTING** |
| Automation engineers | `nabor-techniku-automatizace` | **EXPAND EXISTING** |
| Production engineers | `technicti-inzenyri` — keyword *"výrobní inženýr"* | **REJECT** (covered) |
| Process engineers | `technicti-inzenyri` — keyword *"procesní inženýr"* | **REJECT** (covered) |
| Industrial engineers | `technicti-inzenyri` — keyword *"průmyslový inženýr"* | **REJECT** (covered) |
| CAD specialists | `technologove-a-konstrukteri` — heading *"CAD a CAM systémy"* | **REJECT** (covered) |
| CAM specialists | same | **REJECT** (covered) |
| CAD/CAM specialists | same | **REJECT** (covered) |
| Technologists | `technologove-a-konstrukteri` + `thp-pozice` | **REJECT** (covered) |
| Procurement specialists | `nakup-a-zasobovani` | **REJECT** (covered) |
| Buyers | `nakup-a-zasobovani` — keyword *"nábor nákupčího"* | **REJECT** (covered) |
| Quality specialists | `pozice-v-rizeni-kvality` (575w: kontrolor → metrolog → manažer) | **REJECT** (covered) |
| Maintenance specialists | `udrzba-a-technicky-servis` (643w) | **REJECT** (covered) |
| Supervisors | `mistri-a-vedouci-smen` (594w) | **REJECT** (covered) |
| Specialist logistics roles | `odborne-pozice-v-logistice` (670w) | **REJECT** (covered) |
| Mechanical engineers | Split across `technicti-inzenyri` (umbrella) and `strojirenske-profese` (trades); *strojní konstruktér* sits in `technologove-a-konstrukteri` | **DEFER_FOR_DATA** |
| Electrical engineers | `nabor-elektrikaru` covers electricians and §6 competence — **not** design/project engineers | **DEFER_FOR_DATA** |
| Supply-chain specialists | Split between `nakup-a-zasobovani` and `odborne-pozice-v-logistice`; strategic SCM thin | **DEFER_FOR_DATA** |
| Technical managers | `mistri-a-vedouci-smen` covers first-line only; *vedoucí údržby/výroby* partial | **DEFER_FOR_DATA** |

**CREATE: 0 · EXPAND EXISTING: 2 · REJECT: 13 · DEFER_FOR_DATA: 4**

This is the §11 principle holding: *profession exists ≠ page should exist.* Fifteen of nineteen candidates are already covered, several explicitly by keyword. The four deferrals are genuine gaps whose resolution depends on search demand — see §12 below.

---

## N. Wave 7 — Employer Intelligence decisions

Existing coverage measured:

| §14 taxonomy area | Existing pages | Gap |
|---|---|---|
| Recruitment economics | `cena-neobsazene-pozice` (607w), `skutecne-naklady-na-zamestnance` (245w), `kolik-stoji-zamestnanec` (235w), `neprime-naklady-na-zamestnance` (234w) | **No tool.** Content exists; calculators do not |
| Workforce planning | `planovani-naboru`, `absence-v-provozu`, `sezonni-navyseni-kapacity`, `nabor-pri-nabehu-vyroby` | Shift/capacity planning absent (twice deferred as HR-ops) |
| Hiring operations | `zadani-pozice-a-profil-kandidata` (475w), `jak-dlouho-trva-obsazeni-pozice`, `proc-se-nedari-obsadit-odbornou-pozici` | Reference checking absent |
| Legal / compliance | `povinnosti-zamestnavatele`, `docasne-prideleni-zamestnancu`, + foreign-worker cluster (28) | Well covered |
| Qualification / screening | `odborna-zpusobilost-a-opravneni`, `uznavani-kvalifikace-zahranicnich-pracovniku`, `nabor-elektrikaru` | Strong; §24 cross-linking would deepen it |
| Foreign workforce | 28 pages | Well covered |
| Staffing strategy | `jak-funguje-pracovni-agentura`, `primy-nabor-zamestnancu`, `jak-vybrat-personalni-agenturu` | Covered |

> I initially read the three cost pages as thin near-duplicates because they share a closing heading. Measured: 234–245 words with pairwise Jaccard similarity **0.15–0.22**. They are distinct. The shared heading is a deliberate editorial pattern, not duplication. No consolidation warranted.

### The real Wave 7 finding

**The site has exactly one calculator** — the agency payroll calculator, backed by a genuine model in `lib/payroll/` (10 modules). Every economics topic in §15–§18 exists as *prose* and none as a *tool*.

That is the gap worth filling, and it needs **zero new URLs**: a cost-of-vacancy tool belongs on `/cena-neobsazene-pozice`, which already ranks for the intent and already explains the method.

Proposed priority, all requiring §15's four-way labelling (KNOWN STATUTORY VALUE / EMPLOYER INPUT / MODEL ASSUMPTION / UNKNOWN VARIABLE):

1. **Cost of vacancy tool** on the existing page — highest value, existing content, no new URL
2. **Cost of turnover tool** — existing turnover cluster (4 pages) has no quantification
3. **Shift-planning tool** — would settle `planovani-smen`, deferred twice as a *page* but plausible as a *tool*
4. **Cost per hire** — DEFER; §18's "do not mix recruitment cost with total employment cost" risk is high and the existing cost pages already skirt it
5. **Capacity planning** — DEFER; §21 admits the model may not be honestly generalisable

**Hub decision:** strengthen `/pro-zamestnavatele` (19 internal links, Tier 1). Do **not** build a separate intelligence hub — it would compete with an established hub for the same intent, which is the cannibalisation Wave 3 spent a phase repairing.

---

## O. Wave 8 — conversion architecture

Measured current state across the 162 registry pages:

| Measure | Value |
|---|---|
| Distinct CTA (title + destination) combinations | **48** |
| Most common CTA | *"Potřebujete obsadit pozice?"* → `/poptavka-pracovniku` — **52 pages** |
| …spanning clusters | **4** (knowledge, employer_problem, industry, region) |
| Second | *"Potřebujete s tím pomoci?"* → `/contact` — 22 pages |
| CTA destinations in use | `/poptavka-pracovniku`, `/contact`, `/submit-offer` |
| **Pages whose CTA goes to `/contact`, not the request form** | **38** |

Two findings:

1. **The dominant CTA is cluster-agnostic.** One generic line serves 52 pages across four different intents — exactly the genericity §25 targets.
2. **38 pages send commercial intent to `/contact`** rather than the structured 25-field request form. A generic contact page is a weaker conversion surface than a form built for the purpose. This is the single highest-value conversion finding in the audit, and it is independent of the locale programme.

Proposed: one typed CTA registry per §26 (`REQUEST_WORKERS`, `REQUEST_SPECIALISTS`, `DISCUSS_HIRING`, `COMPARE_OPTIONS`, `CALCULATE_COSTS`, `READ_RELATED_GUIDE`, `VERIFY_REQUIREMENTS`), each entry declaring label-by-locale, destination, allowed clusters, commercial intensity, analytics classification and sticky eligibility — replacing 48 scattered literals.

**Sticky CTA: evaluate, do not assume.** §27 requires evidence first. Wave 3 already assessed and declined it. Without behavioural data (unavailable — §12), the honest decision is to defer again rather than ship an intrusive element on assumption.

---

## P. WebmasterID implications

**No telemetry change is required or proposed.** The existing single tracker stays; classification remains pathname-derived and offline.

Current: 11 clusters, 9 page types, 4 funnel stages, 5 intent classes, version `2026-08-15.1`.

§30 requests classification for `high_skill`, `employer_intelligence`, `recruitment_economics`, `workforce_planning`, `hiring_operations`, `technical_recruitment`, `request`, `calculator`. Most are already representable — `technical_talent` ≈ technical_recruitment/high_skill, `request` and `calculator` exist verbatim. The genuinely new dimensions are `recruitment_economics`, `workforce_planning` and `hiring_operations`, which are **sub-facets of `knowledge`**, not new top-level clusters.

Recommendation: add them as a `knowledgeFacet` dimension rather than fragmenting the 11-cluster taxonomy that Waves 2–4 built the authority metrics on. Splitting `knowledge` into three clusters would silently change every historical cross-cluster measurement — including Wave 4's baseline.

Locale adds one classification dimension: **locale must be derived from the URL prefix**, never from a header or IP. No visitor-entered data enters classification. No second tracker. No new browser event.

---

## Q. SEO risks

| Risk | Severity | Mitigation |
|---|---|---|
| Czech corpus loses indexation through migration | **Critical** | Strategy B — do not migrate (§F/§G) |
| False hreflang already live on the homepage | **High — active today** | Fix independently of this programme (§H) |
| EN/DE pages published but never indexed | **High** | Pilot 12 pages and measure before scaling (§L) |
| Thin translations cannibalise strong Czech pages | High | Tier C stays Czech-only; no machine translation |
| German-language Czech-law content read as German law | **High — legal exposure** | Mandatory §8 legal-context notice; `market` ≠ `language` in the model (§J) |
| Duplicate content across locales | Medium | Self-canonical per locale; reciprocal hreflang from one source of truth |
| Sitemap drift as locale URLs multiply | Medium | Extend the existing read-only sitemap validator |
| Hand-curated sitemap not scaling to 287+ URLs | Medium | Generate locale entries; keep validation read-only |

## R. Migration risks

| Risk | Severity | Mitigation |
|---|---|---|
| **Locale routing converts static pages to dynamic** | **Critical** | §37 gate: before/after static-vs-dynamic counts; fail on any dynamic content route |
| Cache fragmentation via `Vary: Accept-Language` | **Critical** | Forbidden by validator (§10); no header-based negotiation on content URLs |
| Redirect loops between inferred and chosen locale | High | URL beats inference; 302 not 301; root path only |
| Hydration language flash | Medium | Server renders the locale of the URL; no post-hydration swap on locale routes |
| Mixed-language pages (translated chrome, Czech body) | Medium | Already handled by `ArticleLanguageNotice`; keep the pattern |
| 265-string dictionary drifting out of parity | Medium | Parity tests per §36 |
| Netlify edge behaviour differing from local | Medium | Verify on a deploy preview before merge |

---

## S. Rollback plan

Strategy B makes rollback genuinely cheap — **the Czech corpus is never touched, so rolling back cannot damage it.**

| Stage | Rollback |
|---|---|
| L1–L2 (routing + static generation) | Revert the commit. No public URL changed |
| L3 (selector + auto-selection) | Feature-flag the suggestion banner; disable without redeploying content |
| L4 (canonical/hreflang/sitemap) | Remove locale entries from the sitemap and the alternate links. **EN/DE URLs 410 or 301 to their Czech equivalent** — decided per page, not in bulk |
| Any stage | `git revert` on `main`; the 185 Czech URLs are unaffected at every stage |

Rollback trigger conditions, decided in advance: static route count falls; any content URL becomes dynamic; `Vary` gains `Accept-Language`; a redirect loop is observed; Czech impressions drop after locale launch.

**Because no Czech URL moves, there is no irreversible step in this programme.** That is the main reason to prefer Strategy B.

---

## T. Batching plan

| Phase | Content | Gate |
|---|---|---|
| **L0** | *This report* | Owner approval |
| **H-fix** | Correct false hreflang on `index.tsx` + 5 pages; add reciprocal hreflang to the 9 legal pages | Independent of locale work; shippable immediately |
| **L1** | Locale registry + typed locale/market model (§J). No routes yet | Types compile; no route change |
| **L2** | Locale routing + static generation for a **12-page pilot** | **175 static / 0 dynamic → 199 static / 0 dynamic** |
| **L3** | Language selector, client-side suggestion, precedence rules | Browser QA, 3 locales × 5 widths, no loops |
| **L4** | Canonical + hreflang + sitemap for the pilot | hreflang reciprocity validator |
| **MEASURE** | **Stop. Wait for indexation evidence on the 12 pilot URLs** | Owner decision to scale or stop |
| **W6** | Expand `nabor-techniku-automatizace` (PLC/automation); 4 deferrals stay deferred | Authority-v4 + dedup |
| **W7** | Cost-of-vacancy tool on the existing page; then cost-of-turnover | Zero new URLs; §15 four-way labelling |
| **W8** | Typed CTA registry; re-point the 38 `/contact` CTAs where justified | Conversion + claims validators |
| **QA** | Full validators, crawl, browser, cache, bot QA | All gates |
| **ADVERSARIAL** | Attack cache, routing, canonical, hreflang, claim parity, privacy, mobile | — |
| **REPORT** | Final report → commit → push → **STOP** | No merge, no deploy |

**The MEASURE gate is the most important line in this table.** Everything after it is conditional on evidence that locale URLs actually get indexed on this domain.

---

## Evidence availability (§12)

Re-tested today, not carried over:

| Source | Status |
|---|---|
| Ahrefs `management-projects` | `Insufficient plan` |
| Ahrefs `subscription-info-limits-and-usage` | `Insufficient plan` |
| GSC (via Ahrefs integration) | Unreachable — no accessible project |

The subscription endpoint is documented as **free and consuming no API units**, and it is still refused. This means the connected workspace lacks entitlement entirely — it is not a matter of exhausted quota. Search-demand evidence is therefore **UNKNOWN**, not zero, and the four Wave 6 deferrals and the sticky-CTA decision stay deferred on that basis.

One input unblocks all of them: Search Console read access for `talentpartnerid.com`, or an Ahrefs plan covering Site Explorer.

---

## Recommended decisions requiring owner approval

1. **Adopt Strategy B** — keep Czech URLs; prefix only translations. (§F/§G)
2. **Fix the live hreflang defects now**, separately from the locale programme. (§H)
3. **Pilot 12 Tier A pages**, measure indexation, then decide on scaling — do not publish 102 URLs upfront. (§L)
4. **Tier C (82 region + foreign-worker pages) stays Czech-only.** (§K)
5. **Wave 6 creates zero pages**: 2 expansions, 13 rejections, 4 deferrals. (§M)
6. **Wave 7 builds tools, not pages** — cost-of-vacancy first, on the URL that already owns the intent. (§N)
7. **Re-point the 38 `/contact` CTAs** to the structured request form where justified. (§O)
8. **No GeoIP, no `Vary: Accept-Language`, no dynamic content routes.** (§I/§R)

---

## State

IMPLEMENTED ❌ · VALIDATED ❌ · PUSHED ❌ · MERGED ❌ · DEPLOYED ❌ · CRAWLED ❌ · INDEXED ❌ · RANKED ❌

Audit only. No code written. **Stopping for owner approval as required by §42.**
