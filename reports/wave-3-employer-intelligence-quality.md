# Wave 3 — Employer Intelligence & Content Quality Consolidation

## A. Executive summary

Wave 3 created **zero new URLs** and that is the intended result. It was a repair-and-connect wave, and the two defects it targeted were both measured, not assumed.

The regional problem turned out not to be the cosine score. **49.9% of all body words** across the 28 generated regional pages sat in a paragraph appearing on more than one page — and none of that duplicated mass was regional. It was national law, generic employer advice and source disclaimers, every one of which already had a page that owned it. Removing it and linking instead cut duplication by two thirds and made the pages shorter *and* more regional.

The authority problem was that raw inbound count had been hiding closed loops. **14 commercial pages received contextual inbound from exactly one cluster** — including two of my own Wave 2 technical pages, which passed the Wave 2 cohort gate on raw count while being as closed as the city pages. That is now **0**.

## B. Baseline SHA — `6322a7bae0533a3816ac6f4ed529a735f0fa7244`
## C. Final SHA — see §AB (commit at end of this report)
## D. Architecture discovered

185 canonical (= sitemap = routes), 162 registry objects, Tier 1/2/3/4 = 14/77/83/11, 0 orphans, 4 Tier-4 near-orphans, avg contextual depth 2.53, max 5. Hygiene was already clean: 0 non-200, 0 non-self-canonical, 0 broken links, 0 redirects, 0 duplicate titles/H1s/descriptions, 0 SearchAction, 1 WebmasterID installation. Wave 3's value was therefore never going to be in hygiene.

## E–G. Wave 3A regional audit and repair

Duplicated blocks were classified by cause, not just detected. Every one fell into class **A** (national law), **E** (generic employer advice) or **H** (source disclaimer) — never regional content. Legally identical statements were **not** artificially varied (§2B forbids it); they are now stated once, briefly, with a contextual link to the page that owns them (`/naklady-na-zamestnance-cr`, `/kolik-stoji-zamestnanec`, `/docasne-prideleni-zamestnancu`, `/nabor-zahranicnich-pracovniku`).

The freed words went to region-specific substance: `regionalCostDrivers()` (what actually varies — competition for the same professions, commuting catchment), `regionalHiringFocus()` (which professions the region actually staffs), and per-region `focusLinks` matched to each region's real sector mix.

| Measure | Before | After |
|---|---|---|
| Same-family max body similarity | 0.851 | **0.793** |
| Family shared-paragraph word share | 49.9% | **16.9%** |
| Family duplicated paragraphs | 17 | **5** |
| Corpus pairs ≥0.80 | 28 | **0** |
| Corpus duplicated paragraphs | 30 | **18** |
| Unapproved duplicated paragraphs (≥3 pages) | — | **0** |
| Family words min/median/max | 335/~470/585 | 312/411/585 |

Pages are shorter because what was removed was duplicated boilerplate.

**Correction to my own Phase 2 audit:** I classified the three hand-written regional pages (Pardubice, Hradec Králové, Střední Čechy) as KEEP AS-IS — "the model the generated pages should reach". That was wrong. They shared all five section headings, **5 of 5 bullets** and 3 of 4 FAQ answers with each other. Same defect, hand-written. They received the same treatment.

## H–I. Wave 3B employer-problem dedup — 0 CREATE

25 candidate intents tested lexically against the live registry: **18 OWNED, 6 partial, 1 apparent gap**.

| Candidate | Decision | Owner |
|---|---|---|
| Nedostatek kvalifikovaných pracovníků | REJECT | `nedostatek-pracovniku-*` ×5 |
| Jak snížit time-to-hire | REJECT | `/jak-dlouho-trva-obsazeni-pozice` |
| Nábor pro novou směnu | REJECT | `/nabor-pri-nabehu-vyroby` |
| Vysoká fluktuace | REJECT | 4 existing pages |
| Agentura vs vlastní HR / direct hiring | REJECT | `/primy-nabor-zamestnancu`, `/jak-funguje-pracovni-agentura` |
| Staffing reserve | REJECT | `/absence-v-provozu` |
| Těžko obsaditelná pozice | REJECT | `/proc-se-nedari-obsadit-odbornou-pozici` |
| **Replacement hiring** | **EXPAND** | see below |

**A registry-drift defect found:** Wave 2 recorded replacement hiring as MERGED into `/planovani-naboru` — but the merge was never executed. That page had **zero** mentions of a departure. The recorded decision was executed rather than reversed: `/planovani-naboru` gained a section on filling a role after someone leaves. Still zero new URLs.

## J–K. Wave 3C Knowledge Center — 0 CREATE

All 17 knowledge candidates resolved to existing owners. Turnover cost was verified as genuinely covered — `/fluktuace-zamestnancu` explicitly hands off to `/neprime-naklady-na-zamestnance`, which discusses fluktuace 8 times. `/pro-zamestnavatele` remains the hub; no competing hub was created.

## L–N. Wave 3D authority engineering

New first-class metric: **source-cluster diversity**, not raw inbound.

| Measure | Before | After |
|---|---|---|
| Commercial pages fed by **1** cluster | **14** | **0** |
| Source clusters: min / avg / max | 1 / 2.49 / 6 | **2** / **2.88** / 6 |
| Pages with dominance ≥90% | — | **0** |
| Unique inbound source pages: min / median | 1 / 4 | **3** / 6 |
| Commercial pages at ≥3 clusters (Wave 4 target) | — | 40/81 |

Wave 2 closed loops, specifically: `nabor-techniku-automatizace` 1→2 clusters (4→8 sources), `technicti-inzenyri` 1→2 (4→6), `technologove-a-konstrukteri` 1→**3** (5→9), `nakup-a-zasobovani` →2 (4).

Every edge is justified by the source page's own subject — commissioning a new line genuinely needs automation technicians; a seasonal peak is a supply problem before it is a staffing one. No link was added purely to raise a number.

**Crawl depth: avg contextual 2.53 → 2.53, avg all 2.00 → 1.99, max 5 → 5.** No regression, no material improvement. Stated plainly rather than dressed up.

## O–P. Wave 3E conversion

The contextual CTA taxonomy already existed from Waves 1–2 (`hireCta`, `discussCta`, `knowledgeCta`, regional CTAs). It was verified, not duplicated. **Request-path coverage: 185/185 pages.**

**Sticky CTA: evaluated and deliberately NOT implemented.** §9.2 requires proving where it is useful first. There is no evidence it would help — no interaction data exists, the site is static-first, and every page already carries a contextual CTA plus a header request button. Adding a floating element would risk CLS, mobile safe-area collisions and obstruction of the cookie controls for no measured gain. Revisit when WebmasterID cluster data shows where employers actually drop off.

## Q–R. WebmasterID and privacy

Wave 2's pathname-derived model preserved exactly. Added a second **offline** dimension, `intentClass` (INFORMATIONAL / COMMERCIAL_RESEARCH / HIRING_PROBLEM / PROFESSION_DEMAND / REQUEST_ENTRY), derived from route metadata alone.

**No browser telemetry was added.** No `data-wmid-form`, no second tracker, no emitter, no network call, no storage access, no new payload field. `REQUEST_ENTRY` is named "entry" deliberately — a test asserts the taxonomy contains no word implying a completed outcome, because mailto delivery is not observable.

## S. Sources

No new numeric claim was introduced, so no new source was required. All existing citations retained. The regional gate now **fails** any regional page that cites no source or carries an online source without a retrieval date.

## T–U. Validators and mutation evidence

New `npm run validate:regional` — the owner's five combined criteria: same-family similarity ≤0.80, duplicated-paragraph detection, regional information gain, source provenance, cluster diversity. A page fails **below** 0.80 if it lacks differentiation or carries boilerplate.

Threshold provenance is documented in the file: 0.80 per owner decision (measured max 0.793; 0.75 rejected because it would reward synonym-swapping); ≥2 clusters because that is what is achievable without tenuous links, with ≥3 recorded as the Wave 4 target.

**Mutation tests — 5 injected defects, 5 caught, 0 missed:** region-name substitution, duplicated editorial paragraph, removed source, closed-loop inbound, and synonym-swap fake differentiation.

## V–W. Browser QA and full gate

**14 page types × 7 breakpoints (320/360/390/430/768/1024/1440) = 98 combinations: 0 overflow, 0 console errors, 0 hydration errors, H1 visible and unique everywhere, `lang="cs"` everywhere, keyboard focus reachable.**

`git diff --check` clean · lint clean · typecheck clean · **377 tests** (was 374) · production build clean · **16 validators PASS** (claims, clusters, growth, **regional**, trust, eeat, conversion, seo, sitemap, i18n, czech, czech-default, legal, tier1, security, seznam) · authority gate PASS · fresh crawl 185 canonical, 0 orphans, 0 Tier1–3 near-orphans, 0 broken links, 0 redirects.

**Playwright 66/66.** One run showed a single failure on `/cookies-cs.html`; it passed in isolation and the full suite passed on re-run, so it is a flake, not a regression. Reported rather than hidden.

## X–Y. Defects found during implementation

1. **Wave 2 registry drift** — replacement hiring recorded as MERGED but never merged. Fixed.
2. **My Phase 2 audit misclassified the hand-written regional pages** as healthy. Fixed.
3. **My Wave 2 link design created closed loops** — 4 technical pages fed by one cluster. Fixed.
4. Duplicate-key trap in `CLUSTER_LINKS` avoided this time by merging into existing keys; verified 58 keys, 0 duplicates.

## Z. Remaining technical debt

- **41 of 81 commercial pages still sit at 2 source clusters** (target ≥3). Closing this needs genuinely relevant links, not filler; it is Wave 4 work.
- Same-family similarity is **0.793** — under the 0.80 gate but not the 0.75 originally proposed. The residual is shared section structure and deliberate national-rule pointers.
- **18 duplicated paragraphs remain corpus-wide** (from 30); the survivors are approved shared statements plus a few outside the regional families.
- City pages remain thin (194–210 registry words) by design; they were measured healthier than the generated regional pages and were not padded.

## AA. Review limitations

Automated validation only. **No native Czech editorial review, no legal review, no technical-specialist review has been performed.** Machine gates do not substitute for any of them.

## AB. Search-engine status

IMPLEMENTED ✅ · VALIDATED ✅ · PUSHED ✅ · **MERGED ❌ · DEPLOYED ❌ · CRAWLED ❌ · INDEXED ❌ · RANKED ❌**

No indexing claim is made. Internal linking changes do not "fix indexing" without Search Console evidence.

## AC. Recommended Wave 4

Gate on evidence, not on this having shipped. Once deployed and crawled: (1) use WebmasterID cluster + intent-class traffic to see which clusters employers actually enter through; (2) raise commercial pages from 2 to ≥3 source clusters where a genuine relationship exists; (3) only then consider the high-skilled expansion candidates (PLC, process/industrial engineering, CAD/CAM, supply chain), each justified by impressions rather than by the fact that the role exists.
