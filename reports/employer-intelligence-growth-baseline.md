# Employer Intelligence & Growth — Measured Baseline

**Branch:** `feat/employer-intelligence-growth` · **Baseline SHA:** `419a26c`
**Measured:** 2026-08-20, from this SHA — a clean `next build`, the rendered build output, and live production fetches. **No number in this report is carried forward from any earlier report.**

---

## 1. Build & rendering

| Measure | Value |
|---|---|
| Static (○) | **175** |
| SSG (●) / dynamic (λ) / ISR | **0 / 0 / 0** |
| `getServerSideProps` / `getStaticProps` | 0 / 0 |
| `getInitialProps` | 1 — `pages/_document.tsx` only (per-route `<html lang>`, prerendered) |
| middleware / `pages/api` / `next.config` i18n | **none / none / none** |

## 2. Corpus

| Measure | Value |
|---|---|
| Sitemap `<loc>` | **185** |
| Next route files (excl. `_app`/`_document`) | 175 |
| Static `.html` in `public/` | 10 |
| Registry pages (`SEO_PAGES`) | 162 |
| Body words min / median / max | **170 / 281 / 1092** |
| Pages < 200 words / < 250 words | 5 / 53 |

## 3. Duplication & similarity — clean

| Check | Result |
|---|---|
| Duplicate rendered **titles** | **0 groups** |
| Duplicate **meta descriptions** | **0 groups** |
| Duplicate **H1s** | **0 groups** |
| Duplicate **intros** | **0 groups** |
| Non-self-canonical | **0** |
| Body-similarity pairs ≥ 0.60 | 64 |
| Highest pair | **0.765** — `prace-pro-moldavany-v-cr ~ prace-pro-srby-v-cr` |

Max similarity sits below every enforced threshold (corpus gate 0.90; regional family gate 0.80).

## 4. Internal graph (rendered contextual)

> **Correction.** This section first defined contextual scope as "everything between the global `<header>` and `<footer>`". That was wrong: the mobile nav is a **sibling after `</header>`**, so it survived the strip and every page appeared to link contextually to `/contact`, `/agencies`, `/submit-offer`, `/offers` and `/poptavka-pracovniku` — which is why all five read exactly 174. Scope now also strips `nav.mobile-nav`, and the figures below are the corrected ones.

| Measure | Value |
|---|---|
| Contextual inbound min / median / avg / max | **1 / 5 / 16.84 / 175** |
| Crawl depth min / median / avg / max | **0 / 2 / 2.51 / 5** |
| Orphans (0 inbound) | **0** |
| Contextually unreachable | **3** — `/terms.html`, `/terms-cs.html`, `/terms-de.html` (footer-discoverable legal, by design) |
| Request-page inbound | **164** |
| Calculator inbound | **165** |
| Query-parameter internal links | **0** |
| Links to non-existent routes | **0** |

## 5. Commercial authority

| Measure | Value |
|---|---|
| Commercial pages assessed | **83** |
| Source clusters min / median / avg / max | **2 / 3 / 3.64 / 11** |
| Fed by 1 cluster | **0** |
| Fed by exactly 2 | 15 |
| Fed by 3+ | **68** |

## 6. CTA destinations

**Registry pages (162) — gated by `validate:cta-routing`:**

| Destination | Count |
|---|---:|
| `/poptavka-pracovniku` | **134** |
| `/contact` | 28 (all six groups documented as exceptions) |
| `/submit-offer` | **0** |

**Hand-written pages (13) — NOT gated by anything:**

| Page | Button CTAs point to |
|---|---|
| `index.tsx` | `/agencies`, `/offers`, `/contact`, `/submit-agency`, `/submit-offer`, `/pro-zamestnavatele`, `/nabor-odbornych-pozic` |
| `kalkulacka-mzdy-agenturniho-zamestnance.tsx` | `/submit-offer` (primary), `/contact` |
| `agencies.tsx` | `/contact`, `/submit-agency` |
| `offers.tsx` | `/contact`, `/submit-offer` |
| `zamestnavani-cizincu.tsx` | `/`, `/agencies`, `/contact` |
| `socialni-zdravotni-dane-2026.tsx` | `/contact` |

**Button CTAs pointing at `/poptavka-pracovniku` across all 13 hand-written pages: 0.**

## 7. Attribution / WebmasterID

| Measure | Value |
|---|---|
| Installations | **1** (`pages/_app.tsx` → `components/analytics/WebmasterIDTracker.tsx`) |
| Transmitted fields | 12, fixed: `site_id, timestamp, language, user_agent, screen_width, anonymous_session_id, anonymous_visitor_id, event_name, url, pathname, referrer, title` |
| Custom-event API | **none — no such API exists** |
| PII / form / salary reachable | **no** |
| Classification version | `2026-08-15.1` |
| Clusters / page types / funnel / intent / facet | 11 / 9 / 4 / 5 / **4 (`knowledgeFacet`)** |
| `recruitment_economics` | already exists — as a **facet of `knowledge`**, not a cluster |

## 8. Trust / claims

| Field | State |
|---|---|
| `legalName`, `registeredSeat` | **verified** (ARES, accessed 2026-07-28) |
| `contactEmail`, `telephone` | **verified** (operator record) |
| `companyId` (IČO) | **unverified**, value `null` |
| `agencyPermission` | **unverified**, value `null` |
| `permissionScope` | **unverified**, value `null` |
| `permissionValidity` | **unverified**, value `null` |

`validate:claims` reads `TRUST_DATA.agencyPermission` at runtime; because it is unverified, permit statements must stay conditional. The gate self-updates if the operator ever supplies MPSV evidence.

## 9. Client / case-study evidence

**Zero.** No client name, quote, logo, engagement, placement count, savings, retention or time-to-hire figure exists anywhere in `lib/`, `pages/`, `components/`, `public/`, `reports/`, `scripts/` or `tests/`. There is no `data/` or `fixtures/` directory.

The testimonial block exists as a translated **heading only** with `items: []` in all three locales, and its renderer is deliberately deleted with the reason recorded in code — a previous implementation hard-coded `★★★★★` and `[Jméno klienta]` placeholders.

## 10. Calculators / decision tools

| Route | Tool |
|---|---|
| `/kalkulacka-mzdy-agenturniho-zamestnance` | Full payroll + agency-cost calculator (`lib/payroll/`, 10 modules) |
| `/` | Compact homepage payroll calculator |
| `/cena-neobsazene-pozice` | Vacancy-cost decision tool (`lib/vacancy-cost/`) |
| `/kalkulacka-…#odpovednosti` | Responsibility matrix (not a calculator) |

## 11. Validation infrastructure

**24 validator/mutation scripts** currently exist. All pass at this SHA.

## 12. Production

`/`, `/pro-zamestnavatele`, `/poptavka-pracovniku`, `/cena-neobsazene-pozice`, `/nabor-odbornych-pozic` → all **200**, zero redirects. Sitemap **185**. PRs #35/#38 (CTA routing) and #36 (vacancy tool) confirmed **live**.
