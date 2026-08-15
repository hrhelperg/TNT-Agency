# Wave 1 — Professional / specialist recruitment

Branch: `feat/professional-specialist-recruitment` · Prepared 2026-08-15 · Base: `main` @ `ef5e17a`

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
| czech · czech-default · trust · tier1 · legal · eeat · conversion · seo · sitemap · i18n · security | **PASS** |
| authority (live crawl) | **PASS** — 175 canonical, 0 orphans, 0 Tier1–3 near-orphans |
| **growth** (new) | **PASS** |

### New gate: `npm run validate:growth`

`lib/content/growth-cohorts.ts` declares each wave as a cohort with its own thresholds; `scripts/validate-growth.mjs` enforces them offline against the **real page objects** (loaded through a small resolver hook, `scripts/ts-resolve.mjs`, so post-injection links are included). It fails on: missing registry entry / route file / sitemap entry, orphan or near-orphan below the cohort floor, exceeding the hop budget, duplicate canonical/title/description/H1/hero, thin page below the cohort word floor, cohort-internal or corpus-wide similarity, parameterized or broken or self internal links, missing request-form path, prohibited claim classes **across every user-facing surface including `public/script.js`** (the gap that let the fabrications ship), and any backend reintroduction (Supabase, `/api`, lead storage, `marketingConsent`, backend dependencies).

Cohort result: 19/19 pages · inbound min 2 / median 5 / avg 6.6 · words min 745 / median 853 · max 3 hops · 12 rejected-or-deferred URLs recorded with reasons.

---

## N. Browser QA

Playwright, real Chrome, against a production build: **56 passed, 10 failed**.

All 10 failures are the same assertion — 6px horizontal overflow — and **all 10 reproduce identically on `main`**. Verified by building `main` in a separate worktree and measuring the same routes side by side:

```
MAIN (before)    / = 6   /privacy-policy = 6   /pro-zamestnavatele = 6
WAVE1 (after)    / = 6   /privacy-policy = 6   /pro-zamestnavatele = 6
```

Cause: Next.js's own injected `<p id="__next-route-announcer__">`, present on every route including pages this branch never touched. **Pre-existing defect, not introduced here, and not fixed here** — it is a framework artifact and outside this wave's scope. Recommended fix for a separate change: constrain the announcer (e.g. `#__next-route-announcer__ { left: 0 }` plus `overflow-x: clip` on `body`), then re-enable the assertion.

---

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

1. **`public/terms*.html` still offers Executive Search, C-level recruitment, RPO and a 90-day replacement guarantee** — in all three languages, and `terms-cs.html` / `terms.html` also assert the operating permit as verified fact (`disponuje povolením … § 14 odst. 1 písm. a), b) a c)`) while `/o-nas` deliberately withholds exactly that until it is checked against the official register.

   These are now the **only** surfaces where those claims survive — the marketing layer, the contact form and the blog have all been corrected. **I did not change the terms: editing contractual terms alters what the company has undertaken to deliver, and that is an owner decision with legal weight, not a content release's call.** `validate:growth` reports all 11 occurrences as `OWNER DECISION` on every run, and the site-wide rendered audit confirms they are confined to these three files.

   **My recommendation: resolve this before merging.** Two clean paths — (a) if these services are genuinely offered, say so consistently and remove the denials of scope; (b) if they are not, delete §5 and the Executive Search/RPO bullets from all three terms files and align the permit wording with `/o-nas`. Either is fine; shipping both positions is not. The new pages no longer contradict the terms (they now describe page scope rather than company scope), so this is a pre-existing inconsistency rather than one this wave created — but it is more visible now that the rest of the site is honest.
2. **`/agencies` remains client-side-rendered** with an English `<title>` on a Czech-default site. Its claims are now honest, but the services content is still injected by `script.js` and therefore carries no SEO weight. Server-rendering it is a Wave 2 candidate.
3. **Native Czech editorial review is still owed.** The content passed the repo's terminology and diacritics gates and was audited by six independent reviewers, but automated checks do not replace a native editor on register and rhythm.
4. `validate:czech` reports 20 non-failing review candidates (terminology variants) across the corpus — pre-existing, unchanged.
5. The pre-existing 6px overflow (N) is unfixed.
6. **Nothing here is merged, deployed, crawled or indexed.**

---

## R. Recommended Wave 2

Do **not** start on the strength of this wave shipping. Gate Wave 2 on evidence: merge → deploy → confirm the 19 URLs are crawled → observe indexation in Search Console. If the new cluster does not index, the problem is authority or demand, and more URLs will not fix it.

When that evidence exists, in priority order:

1. **Owner decision on service scope** (Q1) — settle whether Executive Search / RPO / the 90-day guarantee are offered, then align terms, blog and marketing. This is a prerequisite, not a page.
2. **Server-render `/agencies`** (Q2) — a crawlable services surface for zero new URLs.
3. **Employer-problem + knowledge cluster**, ~15 pages: `prubeh-naboru-odborne-pozice`, `profil-odborne-pozice`, `mzdove-rozpeti-odborne-pozice` (ISPV-derived method, no figures), směnný provoz a rozvrhy, GDPR v náboru, zkušební doba, hromadný a sezónní nábor.
4. **Role pages under the now-proven family hubs**: technolog, konstruktér under `/thp-pozice`; zámečník, obráběč under `/strojirenske-profese`; kontrolor kvality under `/pozice-v-rizeni-kvality`.
5. **Regional authority — only if indexation evidence supports it.** No city × profession pages under any circumstances.
