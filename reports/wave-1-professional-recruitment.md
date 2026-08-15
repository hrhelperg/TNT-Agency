# Wave 1 — Professional / specialist recruitment

Branch: `feat/professional-specialist-recruitment` · Prepared 2026-08-15 · Base: `main` @ `ef5e17a`
Commits: `d278358` (Wave 1 content) · `d9601d6` (Terms of Business consistency)

**State: IMPLEMENTED and VALIDATED locally. NOT merged, NOT deployed, NOT crawled by Google, NOT indexed, NOT ranking.**
Every claim below was measured against a real production build (`next build` + `next start`) on this machine.

---

## A. Existing architecture discovered

| Layer | What is actually there |
|---|---|
| Framework | Next.js 14.2.3, **Pages Router**, no dynamic routes, no `pages/api`, statically prerendered |
| Content | 133 `SeoPage` data objects in 9 registry files under `lib/content/pages/`; one hand-written `pages/<slug>.tsx` shim each |
| Rendering | One shared `components/SeoArticle.tsx`; `SeoPage.title` **is** the `<h1>` and the `<title>` |
| Canonical inventory | 156 URLs = 146 Next routes + 10 static `public/**/*.html` |
| Sitemap | `public/sitemap.xml` is **hand-curated**; `scripts/update-sitemap.js` is read-only and only validates |
| i18n | Client-side only — one canonical URL per page, `data-i18n` attributes swapped by `public/script.js` (cs default) |
| Conversion | mailto-first, no backend, 24-field employer request schema |
| Gates | 12 `validate:*` scripts + 17 vitest files (360 tests) + Playwright browser QA |
| Authority | `scripts/authority-graph.js` crawls a running build; `NEAR_ORPHAN_DEPTH = 4`, Tier-1 max depth 3 |

**Baseline before this wave:** 156 canonical · 0 orphans · 4 near-orphans (all Tier 4 legal/utility) · Tier1 14 / Tier2 73 / Tier3 58 / Tier4 11 · avg contextual depth 3.25 · `npm test` 360 passing.

### Three defects found during discovery

1. **Live fabricated claims** in `public/script.js`, rendered on `/agencies` in **all three languages** — `"databáze více než 50 000 profilů"`, `"Záruka bezplatné náhrady na 90 dní"`, `"Dostupní do 24–72 hodin"`, `"První kvalifikovaní kandidáti dodáni do 24 hodin"`, plus Executive Search / C-level positioning and placeholder testimonials with a hard-coded `★★★★★` rating. **No validator scanned this file** — every server-rendered gate passed while these shipped.
2. **The "guaranteed conversion path" was not actually rendered.** `withConversionPath` maps over `SEO_PAGES`, returning *new* objects, but 111 of 133 page files import the raw pre-injection constant. Measured: **54 live pages had no link to `/poptavka-pracovniku` at all** and **108 had no calculator link** — while `content-quality.test.ts` asserted the invariant against `SEO_PAGES` and passed.
3. **Homepage self-contradiction.** `<title>`, meta description and focus strip said *"výroba a logistika / provozní profese"*, while the hero claimed *"kvalifikované kandidáty na trvalé, manažerské i flexibilní pozice napříč všemi odvětvími"* — the only managerial claim in the server-rendered site, backed by no page.

---

## B. URLs rejected because they already existed

Verified against all 146 existing routes before any page was written. Recorded permanently in `lib/content/growth-cohorts.ts` so a later wave cannot silently resurrect them.

| Rejected | Status | Reason |
|---|---|---|
| `/executive-search`, `/headhunting` | REJECTED | Only available copy was the unverifiable script.js block. The credible part (provozní vedení) became `/mistri-a-vedouci-smen`. |
| `/nabor-it-specialistu` | REJECTED | No corpus, no differentiation, no delivery reference — the page could only assert capability. |
| `/nabor-ucetnich`, finance recruitment | REJECTED | Same credibility gap; query mix skews to jobseekers. Employer slice absorbed by `/thp-pozice`. |
| `/nase-sluzby` | MERGED | Fourth hub colliding with `/pro-zamestnavatele`, `/agencies`, `/nabor-pracovniku`. |
| `/faq-odborne-pozice` | MERGED | Near-template of three existing FAQ hubs. |
| `/nedostatek-technickych-profesi` | MERGED | Fifth entry in the existing `nedostatek-*` series — template swap by construction. |
| `/agenturni-zamestnavani-vs-primy-nabor` | MERGED | Comparison rides inside `/primy-nabor-zamestnancu`. |
| city × profession combinations (~40) | REJECTED | Doorway pattern; 52 regional pages already exist. |
| region-scoped specialist hubs | REJECTED | Doorway pattern at regional scale. |
| salary / market-rate / lead-time pages | REJECTED | Would require invented figures. |
| `/mzdove-rozpeti-odborne-pozice` | FUTURE | Wave 2 — defensible from ISPV, but needs the cluster established first. |
| `/prubeh-naboru-odborne-pozice`, `/profil-odborne-pozice` | FUTURE | Wave 2 — ship first as sections of the hub. |
| `/nabor-ridicu` | FUTURE | Later logistics wave; different buyer. |

**31 candidates proposed → 19 built.**

---

## C. URLs improved rather than recreated

- `/pro-zamestnavatele` — new "Odborné a technické pozice" section; keywords widened; now the contextual parent of the cluster.
- `/agencies` + `public/script.js` — fabricated claims retired in cs/en/de; service set rewritten to what can be evidenced.
- `/` — new positioning section, focus strip repointed, `<title>`/description/OG/Twitter widened, hero claim brought back to what the site supports.
- `/contact`, `/agencies` — "executive search" removed from meta.
- `components/EmployerSituations.tsx` — two new situation cards (stuck specialist vacancy; hiring a mistr).
- `components/Footer.tsx` — four service links previously all pointing at `/agencies` (incl. an unevidenced RPO claim) now resolve to four distinct real pages.
- **54 pages** gained a rendered request-form link and **108** a calculator link via the `SeoArticle` resolution fix.
- ~35 existing pages gained contextual links into the new cluster via `CLUSTER_LINKS`.
- `public/terms.html` / `terms-cs.html` / `terms-de.html` — §1 permit assertion, §2 Executive Search + RPO bullets and §5 90-day guarantee corrected in all three languages (commit `d9601d6`); every unrelated clause preserved.
- `public/blog/agenturni-pracovnici-vs-interni-zamestnanci.html` — Executive Search and RPO links retired; four dead homepage anchors (`#employers`, `#industries`, `#about`, `#contact`) repointed to real routes.
- Contact form — the `HR Consulting / RPO` service option retitled in all three languages to match the renamed service card.
- `styles.css` footer columns — a pre-existing 6px horizontal overflow fixed (see N).

---

## D. New URLs created (19)

| # | URL | Cluster | Ctx. inbound | Depth | Rendered words |
|---|---|---|---|---|---|
| 1 | `/nabor-odbornych-pozic` | hub (master) | 19 | 1 | 1796 |
| 2 | `/primy-nabor-zamestnancu` | hub | 10 | 2 | 1570 |
| 3 | `/thp-pozice` | hub | 8 | 1 | 1553 |
| 4 | `/odborna-zpusobilost-a-opravneni` | knowledge anchor | 12 | 2 | 2045 |
| 5 | `/uznavani-kvalifikace-zahranicnich-pracovniku` | knowledge | 4 | 2 | 1924 |
| 6 | `/nabor-svarecu` | role | 3 | 2 | 1925 |
| 7 | `/strojirenske-profese` | family | 8 | 1 | 1735 |
| 8 | `/nabor-cnc-operatoru` | role | 2 | 2 | 1722 |
| 9 | `/nabor-elektrikaru` | role | 4 | 2 | 1939 |
| 10 | `/udrzba-a-technicky-servis` | family | 9 | 1 | 1908 |
| 11 | `/pozice-v-rizeni-kvality` | family | 6 | 1 | 1698 |
| 12 | `/mistri-a-vedouci-smen` | role | 11 | 1 | 1640 |
| 13 | `/odborne-pozice-v-logistice` | family | 5 | 2 | 1792 |
| 14 | `/prime-osloveni-kandidatu` | knowledge | 4 | 2 | 1484 |
| 15 | `/proc-se-nedari-obsadit-odbornou-pozici` | employer problem | 6 | 2 | 1725 |
| 16 | `/jak-dlouho-trva-obsazeni-pozice` | employer problem | 4 | 3 | 1832 |
| 17 | `/cena-sluzeb-personalni-agentury` | knowledge | 6 | 3 | 1609 |
| 18 | `/jak-vybrat-personalni-agenturu` | knowledge | 5 | 3 | 1578 |
| 19 | `/smlouva-s-personalni-agenturou` | knowledge | 4 | 3 | 1537 |

Three of these are the honest replacements for retired fabrications: `/prime-osloveni-kandidatu` (for the 50 000-profile database), `/jak-dlouho-trva-obsazeni-pozice` (for "24–72 hours"), `/smlouva-s-personalni-agenturou` (for the 90-day guarantee).

---

## E. Homepage changes

New section `#pozice-a-lide`, placed **between the focus strip and the calculator** — a visitor learns what is offered before being handed a tool.

> **Najít lidi je snadné. Najít ty správné už ne.**
> Uchazečů bývá na trhu dost. Rozpoznat mezi nimi ty, kdo skutečně odpovídají dané roli, požadavkům a provozu, ale znamená čas, ověřování a pečlivý výběr.
> Tuhle část práce bereme na sebe — pomáháme firmám kandidáty najít, ověřit jejich kvalifikaci a spojit se s lidmi, které na dané místo skutečně potřebují.
> `Nábor · Agenturní zaměstnávání · Personální zajištění provozu`

Then two pillars — *Dělníci a provozní pracovníci* and *Odborníci a kvalifikovaní specialisté* — each with five contextual role links and its own CTA. Full cs/en/de copy added to the dictionary (`positioning.*`, `pillars.*`), `validate:i18n` PASS at 148 wired keys. The dead `stats.*` keys (which still held *"Úspěšných umístění"* / *"Firemních partnerů"* — the retired fabricated metrics) were repurposed to the live focus strip and wired, so the strip now translates and the fabricated labels are gone.

No redesign: the section uses the existing token system (`--accent`, `--radius-lg`, `--s*`, `--shadow-*`).

---

## F/G. Professional-recruitment coverage

Before: **zero**. Verified — no slug in either the router or the registry contained `technik`, `inzeny`, `cnc`, `svarec`, `elektrik`, `udrzb`, `kvalit`, `specialist`, `odborn` or `profesion`. The single `CNC` occurrence sitewide was an unused keyword string; all 23 `technik` hits were declensions of *"manipulační technika"* (forklift equipment).

After: engineering trades, CNC, welding, electrical, maintenance, quality, first-line leadership, THP, professional logistics, sourcing method, hiring diagnosis, and the four commercial decision-support pages.

Differentiation is anchored in **real Czech qualification instruments**, not in assertions about our own capability: NV 194/2022 Sb. (and that it superseded vyhl. 50/1978 Sb., which employers still search for), zák. 250/2021 Sb., zák. 18/2004 Sb., zák. 179/2006 Sb. (NSK), zák. 505/1990 Sb., ČSN EN ISO 9606-1, NSP/NSK registers, ISPV. All ten new source URLs returned HTTP 200 on 2026-08-15 before being added.

---

## H. Internal-link architecture

```
/  (homepage body — contextual, depth 0)
├── Provozní pillar  → výroba · sklad · logistika · stavebnictví · cizinci
└── Odborný pillar   → /nabor-odbornych-pozic  (depth 1)
                        ├── /strojirenske-profese ──── /nabor-cnc-operatoru · /nabor-svarecu
                        ├── /udrzba-a-technicky-servis ── /nabor-elektrikaru
                        ├── /pozice-v-rizeni-kvality
                        ├── /mistri-a-vedouci-smen · /thp-pozice
                        ├── /odborne-pozice-v-logistice
                        ├── /odborna-zpusobilost-a-opravneni ── /uznavani-kvalifikace-…
                        ├── /prime-osloveni-kandidatu · /proc-se-nedari-obsadit-…
                        └── /primy-nabor-zamestnancu ── /cena-… · /jak-vybrat-… · /smlouva-…
                                          ↓
                              /poptavka-pracovniku   (every page, always)
```

Cross-cluster inbound edges are declared centrally in `CLUSTER_LINKS` (`lib/content/pages/index.ts`) rather than hand-edited across nine registry files — the same pattern the codebase already uses for `withConversionPath`, and one place to audit which existing page vouches for which new page.

---

## I–L. Indexation safety (measured, live crawl)

| Metric | Before | After |
|---|---|---|
| Canonical URLs | 156 | **175** (+19, +12.2%) |
| Sitemap URLs | 156 | 175 (0 diff vs route inventory) |
| Registry pages | 133 | 152 |
| Orphans | 0 | **0** |
| Near-orphans (Tier 1–3) | 0 | **0** |
| Near-orphans (Tier 4, footer-discoverable) | 4 | 4 (unchanged, same legal pages) |
| Avg click depth (all links) | 2.51 | **1.98** |
| Avg contextual depth | 3.25 | **2.54** |
| Duplicate titles (rendered, 175 URLs) | — | **0** |
| Duplicate H1s (rendered, 175 URLs) | — | **0** |
| Non-200 responses | — | **0 / 175** |
| Parameterized internal links | 0 | 0 |
| Links to redirects | 0 | 0 |
| Tier-1 with contextual inbound | 14/14 | 14/14 |

New-page link quality: **min 2 contextual inbound, median 6, avg 6.8, max 19**; contextual depth **1–3** against a budget of 4.

Similarity (Jaccard, the repo's own metric): highest intro pair among new pages **0.14**, against the 133 existing pages **≤0.14** — the corpus gates fail at 0.80 (intro) and 0.90 (body); the new cohort gate is stricter still at 0.70/0.85.

Adding 19 pages **reduced** average crawl depth across the whole site.

---

## M. Validation results

`npm test` **360/360 pass** · `tsc --noEmit` clean · `next build` clean (175 static routes)

| Gate | Result |
|---|---|
| czech · czech-default · trust · tier1 · legal · eeat · conversion · seo · sitemap · i18n · security · seznam | **PASS** |
| authority (live crawl) | **PASS** — 175 canonical, 0 orphans, 0 Tier1–3 near-orphans |
| **growth** (new) | **PASS** |
| **claims** (new) | **PASS** — 224 surfaces, 24 structured-data blocks, 13 claim families |
| `git diff --check` · lint · typecheck | clean |
| Playwright browser QA | **66/66** |

### New gate: `npm run validate:growth`

`lib/content/growth-cohorts.ts` declares each wave as a cohort with its own thresholds; `scripts/validate-growth.mjs` enforces them offline against the **real page objects** (loaded through a small resolver hook, `scripts/ts-resolve.mjs`, so post-injection links are included). It fails on: missing registry entry / route file / sitemap entry, orphan or near-orphan below the cohort floor, exceeding the hop budget, duplicate canonical/title/description/H1/hero, thin page below the cohort word floor, cohort-internal or corpus-wide similarity, parameterized or broken or self internal links, missing request-form path, prohibited claim classes **across every user-facing surface including `public/script.js`** (the gap that let the fabrications ship), and any backend reintroduction (Supabase, `/api`, lead storage, `marketingConsent`, backend dependencies).

Cohort result: 19/19 pages · inbound min 2 / median 5 / avg 6.6 · words min 745 / median 853 · max 3 hops · 12 rejected-or-deferred URLs recorded with reasons.

---

## N. Browser QA — 66/66, with no test modified

**Final: 66 passed, 0 failed.** `tests/` is byte-identical to `main` (`git diff main -- tests/` is empty); both overflow assertions still read `toBeLessThanOrEqual(1)` and `toBeLessThanOrEqual(2)`. The suite is green because two real layout defects were fixed, not because the QA was relaxed.

### Correction to the earlier diagnosis

An earlier draft of this report attributed the 10 failures to the Next.js route announcer. **That was wrong.** The decisive experiment — removing `#__next-route-announcer__` from the DOM and re-measuring — left the overflow at exactly 6px. The announcer was simply the only element whose bounding box crossed the viewport edge (1px wide at `left: -1px`), which made it a plausible but incorrect culprit.

### The exact assertion

```js
// tests/e2e/webmasterid.spec.ts:456-458
const overflow = await page.evaluate(() =>
  document.documentElement.scrollWidth - document.documentElement.clientWidth)
expect(overflow, `${route} overflows horizontally`).toBeLessThanOrEqual(1)

// tests/e2e/seo-crawlability.spec.ts:54-58 — same measure, <= 2, across
// BREAKPOINTS = [320, 390, 768, 1024, 1440]
```

### Real cause 1 — the footer (pre-existing, verified identical on main)

Bisecting the DOM: hiding `<footer>` dropped the overflow from 6 to 0. Two tokens could not break inside ~109px columns —

| Token | Rendered width | Column |
|---|---|---|
| `TRANSPARENTNOST` (uppercase, `letter-spacing: 0.12em`) | ~140px | 109px |
| `jobbohemiacz@gmail.com` (one unbreakable string) | ~180px | 109px |

They overflowed `.footer__col` → `.footer__nav` (745 vs 675) → `.footer__inner` (1222 vs 1152) → `.container` (1246 vs 1200) → `documentElement.scrollWidth` 1286 vs 1280. `body { overflow-x: hidden }` clipped it, so the page could not actually scroll horizontally (`scrollLeft` stayed 0) and nothing looked broken — which is exactly why it survived. It was still a real overflow of real product content, so the assertion was correct to fail.

Side-by-side against `main`, built in a separate worktree:

```
MAIN   start:6  withoutFooter:0  navSW:745/675  innerSW:1222/1152
WAVE1  start:6  withoutFooter:0  navSW:745/675  innerSW:1222/1152
```

Identical — pre-existing, and not worsened by Wave 1 (one column's content grew 109→111px from a longer link label, absorbed without changing the document-level figure). Fixed with `overflow-wrap: anywhere` on `.footer__col`: 0 overflow at 500/900/1150/1280/1340/1500px, column heights unchanged.

### Real cause 2 — the Wave 1 pillar cards (introduced here, now fixed)

Fixing the footer surfaced a second failure at **320px only**, and this one was mine: the `.pillar` cards had a min-content width of 328px in a 320px container. The card carries 40px side padding and its CTA is a `.btn`, which is `white-space: nowrap` — "Pro zaměstnavatele: rozcestník →" is 248px unbreakable. Fixed below 520px with narrower padding and a wrapping CTA, which holds for the longer Czech labels as well as EN/DE.

### Why this is a fix and not a weakening

The brief's condition for editing a test was that it "interprets Next.js route announcer output as visible product content". Once the announcer was excluded by experiment, that condition did not hold — the tests were measuring genuine overflow of genuine content. So no test was touched; the product was fixed instead. The assertions still detect real regressions: re-introducing either defect fails them again, and they continue to guard every route at all five breakpoints.

## N2. Adversarial review round

After the content was integrated and every gate was green, an independent adversarial review was run over the full diff with instructions to assume the work was flawed. It found real defects that the green gates had not caught. All were fixed and re-verified.

**The most important finding was a bug in the new gate itself.** `validate:growth` was written specifically to catch replacement guarantees — and its Czech pattern could not match the Czech text. Two causes, both now fixed:

- Czech puts the number *inside* the adjective (`90denní záruka`), while the pattern expected `záruka … 90 dní`.
- More subtly, the pattern used `\b` after a Czech suffix. **JavaScript's `\b` is ASCII-only even under the `/u` flag**, so there is no word boundary after `í` and the assertion could never match. Verified directly: the same pattern with and without `\b` returns `false` / `true` on the real file.

Net effect before the fix: the guarantee was detected in the English and German terms and **invisible in Czech — the site's primary market.** The gate now also detects RPO offers and permit-claimed-as-verified, neither of which it checked at all.

Other confirmed findings, all fixed:

| # | Finding | Resolution |
|---|---|---|
| 1 | New pages asserted what the company does *not* offer ("vyhledávání vrcholového managementu nenabízíme") — an unverifiable negative claim about commercial scope that also contradicted `terms*.html` | All 5 reframed from company-scope to **page-scope** ("…zde nepopisujeme"). The release no longer contradicts the terms; it simply does not speak for them. |
| 2 | Contact form still sold `HR Consulting / RPO` in all three languages while the service cards had been renamed | Retitled to *Podpora náborových procesů* / *Recruitment process support* / *Unterstützung im Rekrutierungsprozess*; `rpo` value renamed |
| 3 | Blog post carried 4 dead homepage anchors (`#employers`, `#industries`, `#about`, `#contact` — none of those ids exist) plus Executive Search and RPO links | Repointed to real routes; both claims retired |
| 4 | Welder qualifications called *oprávnění* / *certifikát* in 9 places — destroying the very distinction the cluster is built on (a welder holds an **osvědčení**; *oprávnění* is a statutory authorisation, correct only for elektro under NV 194/2022 Sb. and VTZ under 250/2021 Sb.) | Corrected in all 9 places and in `sources.ts` |
| 5 | `zákon 18/2004 Sb.` stated as covering qualifications "získané v jiném státě" — it is the EU/EEA/Switzerland regime | Narrowed to mirror the correct statement elsewhere in the same file |
| 6 | The BOZP duty during dočasné přidělení was allocated three incompatible ways ("sdílená odpovědnost" vs § 309 odst. 1 ZP) | All four places aligned: the **uživatel** ensures workplace BOZP; the agency retains its employer obligations |
| 7 | A whole section on pracovnělékařské prohlídky cited no instrument | Added zák. 373/2011 Sb. and vyhl. 79/2013 Sb. to `sources.ts`, cited on the three affected pages |
| 8 | 16 Czech language defects — including two sentences that stated the opposite of what was meant (`ztrátou dobrého operátora i nefunkčního vedoucího`; `lidé se oslovují sami`), four English calques, four spoken-register forms | All corrected |
| 9 | 8 meta descriptions over 160 characters | All trimmed to ≤160, key terms kept |

The review also independently confirmed three categories **clean**: fabrication (every numeral in the new file is a statute, ISO process code or standard number), duplication (worst new↔new intro pair **0.152** against a 0.70 gate; worst new↔existing body **0.145** against 0.90; zero shared 4-word sentences against 166 such repeats in the pre-existing corpus), and rendered correctness (FAQ JSON-LD byte-identical and in order to the visible items on all 19; all 69 distinct internal hrefs and all 118 in-page anchors resolve).

---

## O. Fabrication audit

Scanned all 175 rendered URLs plus every source surface.

**Retired in this wave** (was live in production, cs/en/de): 50 000-profile database · 90-day replacement guarantee · 24–72h availability · "first candidates within 24 hours" · guaranteed discretion · 3–5 candidate shortlist promise · Executive Search / C-level positioning · placeholder testimonials with hard-coded ★★★★★ · "Úspěšných umístění" / "Firemních partnerů" metric labels · RPO delivery claim · "we'll be in touch within 24 hours".

**Also retired after the adversarial review:** the `HR Consulting / RPO` option in the live contact form (all three languages) and the Executive Search / RPO links plus four dead homepage anchors in the legacy blog post.

**Introduced in this wave:** none. Zero placement counts, client names, testimonials, case studies, success rates, database sizes, salary figures, wage ranges, market statistics, vacancy counts, shortage percentages, lead times or guarantees across the 19 new pages. The only numerals are statute numbers, ISO process codes (111/135/136/141) and standard numbers — verified by extracting every numeral from all 2,382 lines. Six independent cluster audits plus one full adversarial review each ran the repo's own forbidden-phrase lists.

The 19 new pages also no longer assert what the company does **not** sell: five such denials were reframed to page scope, because an unverifiable negative claim about commercial scope is no better than an unverifiable positive one.

**Still live, requiring an owner decision — see Q.**

---

## P. Legal / source audit

Every legal statement is either attributable to a cited instrument or written at a level of generality that is unambiguously correct. Auditors specifically corrected: an invented NV 194/2022 Sb. category name; `zák. 250/2021 Sb.` attributing *oprávnění* to a natural person when the instrument gives them *odborná způsobilost / osvědčení*; notice period stated as absolute where `zákoník práce` also permits *dohoda*; medical examinations asserted universally rather than by *kategorie práce*; and the agency-permit register attributed too confidently to a single body.

No immigration timeline, fee, deadline or paragraph number is invented anywhere. Ten new sources added to `lib/content/sources.ts`, each verified HTTP 200 on 2026-08-15.

---

## Q. Remaining limitations

1. **RESOLVED — Terms of Business** (commit `d9601d6`). Executive Search, C-level recruitment, RPO, the 90-day replacement guarantee and the verified-permit assertion are removed from all three language variants. §5 now states plainly that no replacement guarantee is given and that any replacement is a matter for the Service Agreement; it was **not** replaced with a different guarantee. Permit wording is now conditional and points at the MPSV/ÚP ČR register, matching `/o-nas` and the `unverified` state in `TRUST_DATA`. Operator identity and all unrelated clauses are untouched, and section numbering (1–15) is unchanged. `npm run validate:claims` keeps all of it from returning, on every surface.

   *Open, for the operator:* if the permit is verified against the official register, fill `TRUST_DATA.agencyPermission` (value, scope, validity, source URL, access date). The claims gate reads that state and will then permit a factual permit statement without any gate edit. Until then the conditional wording is the correct one.

2. **`/agencies` remains client-side-rendered** with an English `<title>` on a Czech-default site. Its claims are now honest, but the services content is still injected by `script.js` and therefore carries no SEO weight. Server-rendering it is a Wave 2 candidate.
3. **Native Czech editorial review is still owed.** The content passed the repo's terminology and diacritics gates and was audited by six independent reviewers, but automated checks do not replace a native editor on register and rhythm.
4. `validate:czech` reports 20 non-failing review candidates (terminology variants) across the corpus — pre-existing, unchanged.
5. **RESOLVED** — the 6px overflow is fixed (N). The earlier attribution to the Next.js route announcer was incorrect and has been corrected; the real causes were the footer columns (pre-existing) and, at 320px only, the Wave 1 pillar cards (introduced here).
6. **Nothing here is merged, deployed, crawled or indexed.**

---

## R. Recommended Wave 2

Do **not** start on the strength of this wave shipping. Gate Wave 2 on evidence: merge → deploy → confirm the 19 URLs are crawled → observe indexation in Search Console. If the new cluster does not index, the problem is authority or demand, and more URLs will not fix it.

When that evidence exists, in priority order:

1. **Verify the agency permit** and fill `TRUST_DATA.agencyPermission` so the site can state it as fact. Cheapest credibility gain available, and it unblocks factual permit wording in the Terms and on `/o-nas`.
2. **Server-render `/agencies`** (Q2) — a crawlable services surface for zero new URLs.
3. **Employer-problem + knowledge cluster**, ~15 pages: `prubeh-naboru-odborne-pozice`, `profil-odborne-pozice`, `mzdove-rozpeti-odborne-pozice` (ISPV-derived method, no figures), směnný provoz a rozvrhy, GDPR v náboru, zkušební doba, hromadný a sezónní nábor.
4. **Role pages under the now-proven family hubs**: technolog, konstruktér under `/thp-pozice`; zámečník, obráběč under `/strojirenske-profese`; kontrolor kvality under `/pozice-v-rizeni-kvality`.
5. **Regional authority — only if indexation evidence supports it.** No city × profession pages under any circumstances.
