# Wave 4 — Phase 10: Search Evidence Review

The brief requires that evidence-sensitive decisions be made on measurements, and that unavailable measurements be recorded as **UNKNOWN, never as 0**. This report records what could and could not be measured.

---

## 1. Availability

| Source | Status | Evidence |
|---|---|---|
| **Google Search Console** (impressions, queries, positions) | **UNAVAILABLE** | Reached via the Ahrefs GSC integration; the account returned `Insufficient plan` for `management-projects`. No project is accessible, so no GSC data can be read at all. |
| **Ahrefs Site Explorer** (keywords, traffic, backlinks) | **UNAVAILABLE** | `site-explorer-metrics` returned `Insufficient plan`. |
| **SERP inspection** | **NOT PERFORMED** | Would produce a single ungeneralisable observation from one location at one moment. Recorded as not-evidence rather than presented as data. |
| **WebmasterID** | **NOT A DEMAND SOURCE** | Measures on-site page/navigation activity for existing visitors. It cannot report search demand for a page that does not exist, which is the question every candidate turns on. |
| **Internal link graph** | **AVAILABLE** | Measured directly from the repository and a real crawl — this is the evidence Wave 4's authority work actually rests on. |

---

## 2. What this does and does not block

Per §38: *"If the only missing thing is GSC/WebmasterID access: do NOT stop the entire program… new high-skilled URLs requiring search-demand evidence should normally become DEFER_FOR_DATA rather than CREATE."*

| Work | Needs search data? | Outcome |
|---|---|---|
| Cross-cluster authority repair | No — measured internally | **Proceeded** |
| `validate:authority-v4` gate | No | **Proceeded** |
| Two-cluster audit | No | **Proceeded** |
| Crawl / browser QA | No | **Proceeded** |
| New high-skilled URLs | **Yes** | **DEFER_FOR_DATA** |

The wave was not stopped. Only the part that genuinely depends on the missing input was deferred.

---

## 3. Recorded values

| Metric | Value |
|---|---|
| Impressions per candidate intent | **UNKNOWN** |
| Queries per candidate intent | **UNKNOWN** |
| Current ranking positions | **UNKNOWN** |
| Indexed-page count | **UNKNOWN** |
| Cannibalisation risk from search data | **UNKNOWN** |

**None of these is 0.** Zero would assert that the demand was measured and found absent. It was not measured.

---

## 4. What would change the decision

A single input unblocks the deferred set: read access to Search Console for `talentpartnerid.com`, or an Ahrefs plan covering Site Explorer for the domain. With either, Phase 9's candidates can be decided on impressions-per-intent rather than deferred.

Until then, publishing them would mean guessing at demand and calling the guess evidence.
