# Request-surface inventory — TalentPartnerID (Batch D)

_A deterministic inventory of the **declared** employer request CTAs in the code — which surface labels exist and where. It is **not** a conversion rate or a request volume._

## What can and cannot be measured

- **Measurable in-repo (below):** which request CTAs exist, their surface label, the components/pages they live on, and that each resolves to the clean canonical `/poptavka-pracovniku` with no query param.
- **NOT measurable in-repo:** request *volume* or *completion*. CTA sources travel in `sessionStorage` (never the URL), and mailto sends are classified "no event" by the consent-gated WebmasterID tracker — so the mail hand-off cannot be observed client-side. Volume is recorded as **unknown**; it is never inferred from CTA counts or sitemap membership.

## Owner action for real reach

- Export **WebmasterID → page_views / sessions** for `/poptavka-pracovniku` (and by entry route/referrer) → `data/webmasterid.csv`. This yields request-page **reach**, not mailto completion (which remains unmeasurable). No second tracker, no backend, no PII.

## Declared request-surface labels (single source of truth: `lib/attribution`)

- `homepage-calculator`
- `dedicated-calculator`
- `agency-comparison`
- `agency-value`
- `responsibility-matrix`
- `employer-hub`
- `service-page`
- `direct`

## Emitted request CTAs (from code)

| surface label | wired on | resolves to | query param |
|---|---|---|---|
| `agency-comparison` | 1 file(s): pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx | `/poptavka-pracovniku` | none |
| `agency-value` | 1 file(s): components/HomeAgencyValue.tsx | `/poptavka-pracovniku` | none |
| `dedicated-calculator` | 1 file(s): pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx | `/poptavka-pracovniku` | none |
| `employer-hub` | 2 file(s): components/EmployerSituations.tsx, components/Header.tsx | `/poptavka-pracovniku` | none |
| `homepage-calculator` | 1 file(s): components/HomePayrollCalculator.tsx | `/poptavka-pracovniku` | none |
| `responsibility-matrix` | 1 file(s): components/ResponsibilityMatrix.tsx | `/poptavka-pracovniku` | none |
| `service-page` | 1 file(s): components/SeoArticle.tsx | `/poptavka-pracovniku` | none |

`components/EmployerCta.tsx` additionally emits `data-request-source={source}` (typed `CtaSource` prop) at its call sites.

Declared but never emitted on a link (fallback/default only): `direct`.

## Hygiene

- All request CTAs resolve to the bare canonical path — **0** carry a query or hash parameter.