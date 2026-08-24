# Czech Employer Cost Calculator 2026 — starting state

Recorded before any code was written, per §0 of the build brief.

## Branch

| | |
|---|---|
| Branch | `feat/czech-employer-cost-calculator-2026` |
| Forked from | `origin/main` |
| Starting SHA | `78ff950` — *Merge pull request #46 from hrhelperg/feat/locale-l1-commercial-expansion* |
| Worktree at fork | clean |

The §0 precondition is satisfied: the L1 locale release is merged into `origin/main`
(PR #46), and `release-evidence/` carries the production verification screenshots
for that release (homepage cs/en/de, employer hub, tier-1 industry and region,
legal pages), captured 2026-08-22.

## Route architecture

Three locales, one registry.

- **Czech spine** — unprefixed URLs, immutable, the production canonical. Pages are
  `pages/<slug>.tsx`, thin wrappers around a `SeoPage` content object from
  `lib/content/pages/*`, rendered by `components/SeoArticle`.
- **EN / DE** — `/en/*` and `/de/*`, native slugs, never derived by prefixing a Czech
  slug. Pages are thin wrappers around `components/locale/LocalePage`, fed a
  `LocalePageContent` object from `lib/locale/content/{en,de}/*`.
- `lib/locale/registry.ts` is the single source of truth for page identity. It owns
  `CZECH_ROUTES` (order-significant — the sitemap generator must reproduce the
  existing artifact byte-identically), the concept list, and which locales are
  actually *published* as opposed to merely declared.
- `LocalePage` already accepts `afterContent`, used by the request-staff concept to
  mount **the same** form component the Czech page mounts. That is the established
  precedent for putting one interactive component on all three locale pages without
  a second implementation.

## Existing calculator surfaces

Three, and they must stay distinct.

| Surface | Code | Answers |
|---|---|---|
| Cost of Vacancy | `lib/vacancy-cost/`, `components/VacancyCostTool.tsx`, `/cena-neobsazene-pozice`, `/en/cost-of-vacancy`, `/de/kosten-unbesetzter-stellen` | what an *unfilled* position costs |
| Agency vs. direct payroll | `lib/payroll/`, `/kalkulacka-mzdy-agenturniho-zamestnance` | what an *agency* worker costs vs. hiring directly |
| Homepage teaser | `components/HomePayrollCalculator.tsx` | a reduced view of the above |

Cost of Vacancy shares **no code** with the payroll engine. Nothing in this build
touches `lib/vacancy-cost/**` beyond, possibly, a cross-link.

## What already exists that this build must reckon with

`lib/payroll/` is not a stub. It already contains a rigorously sourced Czech 2026
payroll engine, verified 2026-07-18 against ČSSZ, Finanční správa, MPSV and VZP:

- `money.ts` — exact integer arithmetic in **haléře**, overflow-guarded, with
  explicit per-call rounding modes. No floating-point money math anywhere.
- `sources.ts` — 14 official sources with authority, title, URL, legal basis and a
  single shared `ACCESSED` date that the UI derives its "verified on" claim from.
- `rules/cz-2026.ts` — the 2026 rule registry. Every value carries `sourceId`,
  `legalBasis` and a confidence `status`.
- `freshness.ts` — turns the ruleset's own effective window and declared review date
  into a `VERIFIED / REVIEW_DUE / STALE / SUPERSEDED / DRAFT` status the page must show.
- `calculate-tax.ts` — §38h monthly advance: base rounding, 15/23 split, advance
  rounding, personal credits, child benefit, monthly bonus, resident/non-resident
  and signed-declaration gating.

**This is a second source of truth risk.** The brief asks for a fresh registry under
`data/calculators/cz-employer-cost/2026/`. Two registries of the *same* Czech legal
facts means the next time MPSV moves the minimum wage, one of them silently goes
stale. Resolution is recorded in the methodology document.

### Gaps in the existing engine, relative to this brief

These are real, and they are the substance of the build:

1. **Annual social maximum is not honestly modelled.** `calculate-employee-contributions.ts`
   computes `min(monthlyGross, 2 350 416)` — a *monthly* gross against an *annual*
   cumulative ceiling. Harmless at realistic salaries, but it is not the rule, and
   there is no year-to-date input. §8 of the brief requires either an explicit
   "maximum not yet reached" statement or a YTD input.
2. **The health minimum assessment base is absent entirely.** `healthBase = grossWage`,
   with no top-up and no payer allocation. §13 is unimplemented.
3. **Statutory employer liability insurance is `unresolved`** and excluded from the
   total, with a note. §14 requires a real CZ-NACE rate model.
4. **No employer social-insurance discount** (§10).
5. **No working-pensioner relief** (§11).
6. **No separation of statutory payroll cost from company-specific real cost** (§17).

## Invariants this build must not break

- **W4 / privacy.** `lib/privacy/url-policy.ts` is a strict query-parameter allowlist.
  It exists because the payroll calculator once base64'd its entire input — including
  disability and ZTP/P, GDPR Art. 9 health data — into a `?d=` parameter, which
  WebmasterID's `page_view` then transmitted as part of `url`. No salary, tax profile,
  child, disability or result may enter a URL, a fragment, or any encoded state.
  Enforced by `validate:share-privacy` and two mutation tests.
- **Analytics.** WebmasterID may receive event names and page identity only. Never a
  financial or tax-profile value. `lib/analytics/webmasterid.test.ts` asserts the
  tracker's actual payload surface.
- **German jurisdiction.** `validate:locale-jurisdiction` fails the build when a German
  page uses a legally loaded German term (`Mindestlohn`, `Sozialversicherung`-adjacent
  terms, `zuständige Behörde`, …) without naming Czechia at or before that point, in
  reading order — description first, then intro, then each section. The DE calculator
  page will be dense with exactly these terms and must anchor Czech jurisdiction early.
- **Freshness.** `validate:payroll-freshness` plus a mutation test bind the page's
  "verified on" claim to `sources.ts`, so no page can assert a check that the registry
  does not support.
- **Route collisions and locale duplicates.** `validate:route-collisions`,
  `validate:locale-duplicates` and `validate:locale-fidelity` gate new routes. The Czech
  corpus already carries `/kolik-stoji-zamestnanec`, `/naklady-na-zamestnance-cr` and
  `/skutecne-naklady-na-zamestnance`; the new calculator must be a distinct concept,
  not a fourth paraphrase of them.

## Gate inventory

61 npm scripts. There is no single aggregate `gate` script; the release contract runs
`lint`, `typecheck`, `test`, `build`, then the `validate:*` family and the `test:mutate-*`
mutation tests, then Playwright E2E.
