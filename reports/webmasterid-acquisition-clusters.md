# WebmasterID export grouping — acquisition clusters

**Generated from** `lib/analytics/acquisition-clusters.ts` · classification version pinned in that module.

## What this report is, and is not

Wave 2 does not measure completed mailto delivery. WebmasterID currently measures
page/navigation activity using its existing tracker. Employer intent is inferred from
canonical pathname classification; **no additional form or visitor data is transmitted.**

No browser event, attribute or payload field was added in this Wave. The owner decision
was option (a): pathname-derived mapping only, no `data-wmid-form`, no second tracker,
no parallel emitter. The classification runs offline over a `pathname` value the vendor
bundle already sends as part of its fixed payload.

## Terminology (deliberate)

| Use | Do not use |
|---|---|
| page visits | leads |
| commercial-intent navigation | conversions |
| request-page entry | successful request / submitted request |
| calculator entry | calculator conversion |
| cluster transition | funnel conversion |

A visit to `/poptavka-pracovniku` is **request-page entry**. Whether an e-mail was
actually composed and sent cannot be observed by this site and is never claimed.

## How to group an export

Join the export's `pathname` column against `classifyRoute(pathname).cluster`.
`normalizeRoute()` handles query strings, fragments, trailing slashes and absolute
URLs, so the raw column can be passed in unchanged.

Available dimensions, all derived from repository truth and none of them visitor data:
`cluster`, `pageType`, `funnelStage`, `commercialIntent`.

## Current grouping of the canonical inventory

```
Acquisition-cluster gate
  classification version: 2026-08-15.1
  canonical routes classified: 185
  tracker files referencing the WebmasterID bundle: 1 (expected 1)
  grouping:
    technical_talent    23
    employer_problem    11
    knowledge           25
    industry            24
    region              54
    foreign_workers     28
    calculator           1
    homepage             1
    request              2
    trust                2
    other               14
  routes in "other" (14, none may be commercial):
    · /offers
    · /privacy-policy
    · /submit-agency
    · /submit-offer
    · /blog/agenturni-pracovnici-vs-interni-zamestnanci.html
    · /blog/nezamestnanost-brezen-2026.html
    · /cookies-cs.html
    · /cookies-de.html
    · /cookies.html
    · /privacy-cs.html
    · /privacy-de.html
    · /terms-cs.html
    · /terms-de.html
    · /terms.html

Acquisition-cluster gate: PASS
  NOTE: this measures page/navigation activity only. Wave 2 does not measure
  completed mailto delivery; no additional form or visitor data is transmitted.
```

## Coverage guarantee

`npm run validate:clusters` fails if a commercial route (any growth-cohort page, the
employer hub, the technical hub, the request page or the calculator) classifies as
`other`. A route added later that should be classified therefore makes itself visible
instead of silently disappearing from the grouping.
