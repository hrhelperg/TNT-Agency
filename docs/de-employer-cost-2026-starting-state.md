# Germany Employer Cost Calculator 2026 — starting state

Recorded before any code, per §0 of the build brief.

## Branch

| | |
|---|---|
| Branch | `feat/germany-employer-cost-calculator-2026` |
| Forked from | `origin/main` |
| Starting SHA | `cfed202a923dabc22f586f6c5da6c5c0e4b6ddab` — *Merge pull request #48* |
| Worktree at fork | clean |

§0's start conditions are met, and were checked rather than assumed:

- **PR #47** (Czech calculator) — merged, merge commit `d2f9738a2ccd`.
- **PR #48** (liability-rate label fix) — merged, merge commit `cfed202a923d`.
- **Production verification** — green at `d2f9738`, and the #48 fix confirmed live in production: the
  dropdown now reads `2,8 ‰ — nejnižší sazbová skupina`, not `2,8 ‰ — 2,8 ‰ — …`.

Not branched from any calculator feature branch.

## What may be shared, and what may not

The line is: **arithmetic and presentation may be shared; law may not.**

**Shared, because it is jurisdiction-neutral:**

| Asset | Why sharing it is safe |
|---|---|
| `lib/payroll/money.ts` | Exact integer arithmetic in the smallest currency unit, overflow-guarded, with an explicit rounding mode at every call. It knows nothing about any country. One caveat: `percentOfRoundedToCzk` is misnamed for a shared module — it is really "apply a percent and round to whole currency units in one step" — and Germany rounds to the **cent**, a different unit. Germany therefore gets its own rounding helpers built on the same primitives rather than reusing that function. |
| `components/locale/LocalePage.tsx` | Route identity, canonical, hreflang, and the `beforeContent` slot. It already carries a calculator across three locales. |
| `lib/locale/registry.ts` and the L2 concept-tier pattern | One registry of route identity for the whole site. Germany joins it as its own concept. |
| `lib/privacy/url-policy.ts` | The query-parameter allowlist. Read-only for this build. |
| The `Ruled<T>` provenance shape, and the copy/notes key pattern | Structure, not content. |

**Never shared as legal truth:** rates, ceilings, allowances, tax formulas, health/pension/care logic,
employer levies, rounding rules, jurisdiction assumptions. Germany gets its own source registry under
`data/calculators/de-employer-cost/2026/` and its own engine under `lib/calculators/de-employer-cost/`.

§47 will be enforced by a dependency-boundary test: the German engine may not import from
`lib/calculators/cz-employer-cost/**` or `data/calculators/cz-employer-cost/**`, and the Czech engine
may not import the German ones.

## The Czech calculator — reference only, untouched

`lib/calculators/cz-employer-cost/` (19 modules), its registry, three routes, 509 unit tests and 29
golden tests. Its results must be identical after this branch, and that will be asserted rather than
assumed.

## The route-collision hazard, which is the biggest single risk here

`/de/arbeitgeberkosten-rechner-tschechien` already exists. It is the **German-language view of the
CZECH calculator**.

The new German-jurisdiction page is `/de/arbeitgeberkosten-rechner-deutschland`.

Two German-language pages, both titled "Arbeitgeberkosten-Rechner", differing by one word in the slug,
describing the law of two different countries. No existing gate prevents a reader — or a search engine
— from conflating them. Whatever else this build does, it must make the country unmistakable on both
pages, which may mean strengthening the country signal on the existing Czech page too. That is a
presentation change, not a change to Czech formulas, and it is the only reason this build touches the
Czech surface at all.

## Invariants inherited from the Czech build

- **Privacy.** The stronger rule learned there: the calculator surface needs no external origin, so
  ANY absolute URL in it fails — rather than enumerating known sinks. That rule caught an injected
  tracking pixel which 315 sink-enumerating assertions had passed.
- **Analytics.** Event names only, never a value.
- **Fail closed.** A validation error suppresses the result entirely; the engine returns no number for
  input it has already rejected.
- **One engine, N locales.** The engine emits keys; locale files turn them into sentences. No locale
  reaches the arithmetic.
- **Golden tests are immutable.** If an authority's published example disagrees with the engine, the
  engine is wrong.
- **Year versioning.** DE/2027 will be a new file beside DE/2026, never an edit to it.

## Gate inventory at the fork point

61 npm scripts: `lint`, `typecheck`, `test`, `build`, the `validate:*` family (34) and the
`test:mutate-*` mutation suites (13), plus Playwright E2E. All green at `cfed202`.
