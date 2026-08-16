# Locale Pilot Foundation — Preparation Only

**Baseline:** `b02a50f` · **Branch:** `feat/locale-pilot-foundation`
**Zero public locale routes created. Zero Czech URLs changed. Zero redirects. Zero sitemap entries. Zero hreflang emitted.**

Cut from `main`, not stacked on PR #35 or PR #36.

---

## 1. Baseline

| Measure | Value |
|---|---|
| main SHA | `b02a50fc73e1db9fa057086b9b4b1a4fd24f0588` |
| Canonical URLs | **185** |
| Sitemap `<loc>` | **185** |
| Next routes | **175** |
| Static (○) / SSG / dynamic / ISR | **175 / 0 / 0 / 0** |
| Built HTML pages | 177 (175 + 404 + 500), 175 carry a canonical |
| `getServerSideProps` / `getStaticProps` | 0 / 0 |
| `getInitialProps` | 1 — `_document.tsx` only (per-route `<html lang>`, prerendered) |
| middleware / `pages/api` / `next.config` i18n | **none / none / none** |
| robots.txt | `Allow: /`, one `Disallow: /assets/private/`, sitemap declared |
| `Cache-Control` (prod) | `public,max-age=0,must-revalidate` |
| `Vary` (prod) | `Accept-Encoding` **only** — no `Accept-Language`, no `Cookie` |
| CDN | Netlify, edge-cached with ETag revalidation (`age` up to ~10.8h observed) |
| Localization today | client-side only: 265 strings × 3 locales in `public/script.js`, `localStorage['tnt-lang']`, default `cs` |
| Legal-page languages | 9 documents at 9 URLs, correct `<html lang>`, reciprocal hreflang (PR #34) |
| WebmasterID | 1 install (`_app.tsx`), pathname-derived classification, no values transmitted |

### No locale URL currently exists — verified, not assumed

| Probe | Result |
|---|---|
| `/en` `/de` `/cs` `/cs-cz` `/en/about` `/de/uber-uns` `/en/o-nas` | **404** |
| `/en/` `/de/` | 308 → `/en` `/de` → **404** (generic trailing-slash normalisation; `/nonexistent-xyz/` behaves identically) |
| Locale paths in sitemap | **0** |

---

## 2. Chosen URL architecture — Strategy B, unchanged

```
Czech    /                      /o-nas          /poptavka-pracovniku      ← unchanged forever
English  /en                    /en/about       /en/request-workers
German   /de                    /de/ueber-uns   /de/personal-anfragen
```

No `/cs/`, no `/cz/`, no `/cs-cz/`. No Czech URL moves. No redirect is introduced. The Czech corpus keeps every piece of URL equity and its entire Search Console history — which is the whole reason Strategy B was chosen over prefixing everything, on a domain whose known failure mode is *"Discovered – currently not indexed."*

A test asserts no planned route matches `^/(cs|cz|cs-cz)(/|$)`.

---

## 3. The exact 12-page pilot

> **Provenance note.** The brief asked me to recover the approved set from the committed L0 report. **That report does not enumerate it** — `reports/global-locale-and-waves-6-8-map.md` §L specifies *"12 high-value Tier A pages"* and the tiering method, but lists no routes. The eleven named routes exist only in the owner's approval message, and are used verbatim from there rather than guessed.

| # | Czech source | Cluster | Commercial | Legal review |
|---|---|---|---|---|
| 1 | `/` | homepage | medium | — |
| 2 | `/pro-zamestnavatele` | knowledge | high | — |
| 3 | `/poptavka-pracovniku` | request | high | **required** |
| 4 | `/kalkulacka-mzdy-agenturniho-zamestnance` | calculator | high | **required** |
| 5 | `/nabor-odbornych-pozic` | technical_talent | high | — |
| 6 | `/nabor-techniku-automatizace` | technical_talent | high | — |
| 7 | `/technicti-inzenyri` | technical_talent | high | — |
| 8 | `/proc-se-nedari-obsadit-odbornou-pozici` | technical_talent | high | — |
| 9 | `/cena-neobsazene-pozice` | knowledge | medium | — |
| 10 | `/o-nas` | trust | low | **required** |
| 11 | `/redakcni-zasady` | trust | low | — |
| **12** | **`/pracovnici-pro-vyrobu`** | **industry** | **high** | — |

### Why `/pracovnici-pro-vyrobu` is the twelfth — **OWNER-APPROVED 2026-08-17**

Selected by measurement, not preference. The approved eleven cover homepage, hub, request, calculator, 4× technical_talent, knowledge and 2× trust — and **no industry page at all**, though industry is Tier A in the L0 tiering.

Measured against every industry page:

| Candidate | Words | Unique inbound | Source clusters | Intent | Request path |
|---|---:|---:|---:|---|---|
| **`pracovnici-pro-vyrobu`** | 326 | **35** | **5** | high | yes |
| `pracovnici-do-logistiky` | 467 | 23 | 5 | high | yes |
| `skladnici` | 261 | 10 | 4 | high | yes |
| `stavebni-pracovnici` | 260 | 6 | 4 | high | yes |

It has the **highest contextual inbound authority of any industry page** (35 sources across 5 clusters), high commercial intent, an existing request path, and production staffing is the core volume service. It is also sector content rather than Czech-law content, so it translates without becoming misleading — unlike Tier C.

Trust dependency is already satisfied by `/o-nas` and `/redakcni-zasady` being in the pilot.

---

## 4. EN/DE future URL mapping

### Policy decision: translated slugs (option A) — **OWNER-APPROVED 2026-08-17**

| | A — `/en/cost-of-vacancy` | B — `/en/cena-neobsazene-pozice` |
|---|---|---|
| Usability | **wins** — the URL means something to the reader | an English speaker learns nothing |
| Search intent | **wins** — slug words match query language, visible in SERP | mismatched |
| Maintenance | 24 slug decisions | **wins** — mechanical |
| hreflang mapping | tie — both need an explicit registry | tie |
| Translation drift | slug can drift from title | **wins** |
| Collision risk | two Czech pages could translate alike | **wins** — none |
| Redirect risk | a wrong slug needs a redirect later | **wins** |
| Future expansion | 2 decisions per new page | **wins** |
| Registry complexity | explicit `futureRoute` | derivable |

**A is chosen** despite losing five of nine criteria, because the pilot's entire purpose is to learn whether Google will index and rank localized content for localized queries. A Czech slug under `/en/` tests a weaker version of that question and would leave the result ambiguous. The risks A carries — collisions, drift, redirects — are exactly the ones an explicit, validated registry removes: uniqueness, prefix correctness, ASCII-only and no-collision are all gated.

| Czech | English | German |
|---|---|---|
| `/` | `/en` | `/de` |
| `/pro-zamestnavatele` | `/en/for-employers` | `/de/fuer-arbeitgeber` |
| `/poptavka-pracovniku` | `/en/request-workers` | `/de/personal-anfragen` |
| `/kalkulacka-mzdy-agenturniho-zamestnance` | `/en/agency-worker-payroll-calculator` | `/de/lohnrechner-zeitarbeit` |
| `/nabor-odbornych-pozic` | `/en/specialist-recruitment` | `/de/fachkraefte-recruiting` |
| `/nabor-techniku-automatizace` | `/en/automation-technician-recruitment` | `/de/automatisierungstechniker-recruiting` |
| `/technicti-inzenyri` | `/en/engineering-roles` | `/de/technische-ingenieure` |
| `/proc-se-nedari-obsadit-odbornou-pozici` | `/en/hard-to-fill-specialist-roles` | `/de/schwer-besetzbare-fachpositionen` |
| `/cena-neobsazene-pozice` | `/en/cost-of-vacancy` | `/de/kosten-einer-unbesetzten-stelle` |
| `/pracovnici-pro-vyrobu` | `/en/production-workers` | `/de/produktionsmitarbeiter` |
| `/o-nas` | `/en/about` | `/de/ueber-uns` |
| `/redakcni-zasady` | `/en/editorial-standards` | `/de/redaktionelle-standards` |

German umlauts are transliterated (`ueber-uns`, `fachkraefte`) — a non-ASCII slug invites percent-encoding drift between the registry, the sitemap and hreflang. Gated.

### Slugs are a contract, not an output

Every localized path is a hand-written, owner-approved literal. They are **never** generated at build time from a translation dictionary or a model: a slug that can regenerate is a slug that can silently change, and a changed slug after publication is a broken URL plus a redirect on a page Google has already indexed. Once published, a localized slug is fixed — changing one is a migration decision, not an edit.

The gate enforces this structurally: the registry must import nothing, every `futureRoute` must be a string literal rather than an expression, and `PILOT_APPROVAL` must continue to record `slugsAreGenerated: false`, `urlPolicy: 'TRANSLATED_SLUGS'` and `slugStabilityContract: true`. Mutations 23–27 prove each rejection.

---

## 5. Cache model

Target: `/page`, `/en/page`, `/de/page` are **three independent static documents**, cache-keyed by URL alone.

| Header | Contract |
|---|---|
| `Cache-Control` | unchanged: `public,max-age=0,must-revalidate` (CDN absorbs revalidation via ETag) |
| `Vary` | **`Accept-Encoding` only** — never `Accept-Language`, `Cookie` or any geo header |
| Locale negotiation | never on a content URL |

**No production headers are changed in this PR.** The current contract is already correct for the target model; the risk is future work breaking it, so the gate enforces it rather than the config re-stating it.

---

## 6. Location/language UX model — architected, not shipped

**Location must never change the canonical HTML response.** A URL returns one document to every visitor, bot or human, from any country.

Priority order:

1. Explicit user choice (persisted)
2. Locale already in the URL — **authoritative; never overridden**
3. Browser language (`navigator.language`)
4. Coarse country signal, only once a real market variant exists
5. Czech fallback

Progressive enhancement only: after load, a **dismissible suggestion** may offer *"Diese Seite ist auch auf Deutsch verfügbar."* linking to the real `/de/...` equivalent. Never a server redirect, never a silent content swap. No precise geolocation, no GPS permission prompt, nothing persisted beyond the language choice already stored.

### Edge cases

| Case | Behaviour |
|---|---|
| Czech user in Germany | Czech page renders. German suggestion may appear; ignoring it changes nothing |
| German browser in Czechia | Czech page renders; German suggestion may appear |
| VPN / wrong country | Irrelevant — country never alters HTML, only a dismissible hint |
| Bot / no cookies / no `Accept-Language` | Deterministic URL-specific HTML. Discovery via links and sitemap, never via geo |
| Unsupported locale (e.g. `fr`) | Czech fallback; no suggestion |
| Direct `/de/` visit | German renders. **No redirect to Czech**, whatever the visitor's country |
| Manual switch | Explicit choice outranks every signal and persists |

---

## 7. Canonical model

Every localized page **self-canonicalises**. `canonicalPolicy` is a union of exactly one value, `SELF`, so canonicalising EN/DE back to Czech is unrepresentable rather than merely discouraged — that mistake would remove the localized pages from the index and defeat the pilot entirely. Mutation 6 proves the gate rejects it.

---

## 8. hreflang model

`publishedAlternates(group)` returns alternates **only** for siblings that are both `indexingEligible` and `PUBLISHED`. Today it returns `[]` for all 12 groups.

A set of one is not a set: the Czech source is listed only once at least one sibling is live, because a lone self-referencing alternate says nothing. Once a triplet publishes, all three declare the same reciprocal set: `cs-CZ` → Czech, `en` → English, `de` → German.

**No `x-default`.** Evaluated separately and rejected for the same reason as the legal sets in PR #34: `x-default` marks a page targeting no particular language, and none of these is one. Pointing it at whichever version happens to be English would assert something untrue. Revisit only if a genuine language-selection page is ever built.

The gate fails any hreflang pointing at a locale-prefixed route that is planned-but-unpublished, or at a locale route absent from the registry.

> An earlier version of this check flagged the legal pages' genuine `en`/`de` alternates as speculative. It was over-broad, and is now scoped to locale-prefixed targets only.

---

## 9. Sitemap model

**Recommendation: one sitemap.** 185 today → ~209 if all 24 pilot routes publish. Sharding at that scale adds an index file, three documents and a drift surface to solve a problem this site does not have. Operational simplicity wins.

Locale URLs enter the sitemap **only** when `indexingEligible && pilotStatus === 'PUBLISHED'`. The gate fails if a planned route appears in the sitemap before it exists, and today the sitemap is byte-identical to `main`.

---

## 10. Static-render proof

**175 static / 0 dynamic / 0 SSG / 0 ISR — before and after.** This branch adds no route and no data-fetching method.

The gate fails on `getServerSideProps`, `NextResponse.rewrite`, `next/headers`, request-time `Accept-Language`, geo lookup during render, the presence of `middleware.ts`, or the prerendered page count dropping below 175. Mutations 14–19 prove each rejection.

Locale routing must never be middleware-based: it would defeat static caching and make the cache key depend on something other than the URL.

---

## 11. WebmasterID privacy proof

**No new telemetry. No change to the tracker. One install, unchanged.**

Locale is derived from the pathname alone — `localeOf('/en/about') === 'en'` — by a pure function taking one argument, asserted to reference no `document`, `window`, `navigator`, header, cookie or geo. No form values, no calculator values, no personal data, no geo value, no browser-language value enters classification. Locale reporting stays offline, joined against the pathname classification as every prior wave's reporting has been.

`localeOf` also correctly refuses false positives: `/enderskeho-typu` and `/design-manual` remain Czech.

---

## 12. Rollback plan

The pilot is reversible **because no Czech URL ever moves**. There is no irreversible step.

| Stage | Rollback |
|---|---|
| Registry / validators (this PR) | `git revert`. No public URL exists to affect |
| After build, before publication | Flip `indexingEligible` to false — routes leave build, sitemap, hreflang and internal links together |
| After publication, **no impressions/backlinks** | Remove localized internal links → remove hreflang → remove sitemap entries → **410 Gone**. Clean withdrawal of something nothing points at |
| After publication, **with impressions or backlinks** | Keep live, add `noindex`, retain for at least one full crawl cycle. Do **not** 404 a URL Google has indexed and users may have linked; that discards signal and looks like site decay |
| Any stage | **Czech canonicals unchanged. No Czech redirect is ever required.** |

The impressions/backlinks question decides between 410 and noindex — which is why the MEASURE gate must produce that data before any withdrawal decision.

---

## 13. MEASURE gate

**After pilot deployment, stop.** Do not publish the remaining corpus because the pilot technically works.

Required before expansion:

- GSC: discovered · crawled · indexed · impressions · queries · country · device, per locale URL
- Canonical selection — is Google choosing our canonical or substituting the Czech page?
- hreflang errors reported in GSC
- Crawl frequency for locale URLs
- Soft 404s
- *Crawled – currently not indexed*
- *Discovered – currently not indexed* ← this site's known failure mode
- Cache: zero regression, `Vary` still `Accept-Encoding` only

Expansion requires evidence that **Google is accepting the localized architecture** — not merely that it renders.

Standing blocker: GSC and Ahrefs both return `Insufficient plan`, including the free subscription endpoint. Search-demand and indexation evidence is **UNKNOWN, not zero**. The MEASURE gate cannot be satisfied until read access exists.

**The exact access required, the manual dashboard protocol that substitutes for it, and the pre-committed decision rule are specified in [`gsc-measurement-protocol.md`](./gsc-measurement-protocol.md).** The pilot is not blocked on API access — an owner with dashboard access can supply every required observation manually in roughly three hours spread over six weeks.

---

## 14. Validators and tests

**`validate:locale-registry`** — registry integrity, unique future URLs, no Czech collisions, locale enum, prefix correctness, ASCII-only lowercase slugs, no query/fragment, self-canonical policy, publication-state consistency, translation-status consistency, no speculative sitemap inclusion, no speculative hreflang, static-render contract, no middleware, prerender floor.

It deliberately does **not** fail because `/en/...` 404s. That is the correct state today, and a gate demanding otherwise would force premature publication. A negative control asserts this.

**Mutation-tested — 28 defects caught**, plus control and negative control: Czech collision · duplicate route · missing prefix · wrong locale prefix · Czech as a prefixed target · canonical-to-Czech · indexing without translation · without editorial review · without legal sign-off · false PUBLISHED status · sitemap pre-publication · speculative hreflang · unregistered locale hreflang · `getServerSideProps` · `Accept-Language` at render · geo at render · `next/headers` · middleware rewrite · prerender collapse · query string in route · non-ASCII slug · duplicate hreflang group · route without owner approval · slug generated from a dictionary · registry importing a translation module · build-time generation enabled · URL policy changed · slug-stability contract dropped.

**Unit tests — 21**, covering pathname-only locale derivation, honest current status, uniqueness, no `/cs/`, self-canonical, market ≠ language, legal-review flagging, the twelfth route's recorded rationale, publication gating, and that hreflang is empty today.

| | |
|---|---|
| Unit tests | 377 → **398** (21 new, 19 files) |
| Playwright | **138**, unchanged |
| Validators | **20/20 PASS** + security + Seznam |
| Mutation suites | locale-registry **28** · hreflang **10** · authority-v4 **11** |

---

## 15. Unchanged Czech invariants

| | Before → After |
|---|---|
| Canonical URLs | 185 → **185** |
| Sitemap | 185 → **185**, file byte-identical |
| Next routes | 175 → **175** |
| Static / dynamic | 175 / 0 → **175 / 0** |
| `pages/` files changed | **0** |
| Redirects added | **0** (`netlify.toml` untouched) |
| robots.txt | untouched |
| hreflang emitted | unchanged (9 legal documents only) |
| WebmasterID installs | 1 → **1** |

Files changed: `lib/locale/registry.ts`, `lib/locale/registry.test.ts`, `scripts/validate-locale-registry.mjs`, `scripts/mutate-locale-registry.mjs`, `package.json`, this report. **No `pages/` file, no sitemap, no netlify config, no robots.**

---

## 16. Implementation state

**LOCALE FOUNDATION** *(this PR — registry, validators, tests, documentation)*
IMPLEMENTED ✅ · VALIDATED ✅ · PUSHED ✅ · MERGED ❌ · DEPLOYED ❌

**LOCALE PILOT ROUTES** *(not started, and on hold)*
IMPLEMENTED ❌ · DEPLOYED ❌ · CRAWLED **UNKNOWN** · INDEXED **UNKNOWN**

The two are tracked separately on purpose. The foundation may merge and deploy on approval; the public pilot is on hold until measurement access exists. UNKNOWN is not zero — nothing has been measured because nothing has been published.

**No `/en/` route. No `/de/` route. No Czech URL changed. No redirect. No middleware. No geo. No sitemap entry. No hreflang. Nothing deployed. Nothing submitted to any search engine.**

The next step is **not** implementation — it is owner approval of the URL policy in §4 and the twelfth route in §3.
