# Wave 4 — Phase 17: Post-Repair Crawl & Graph Comparison

Both sides re-measured with the **same corrected instrument** against a real `next build` + `next start`: the Wave 4 tree, then the baseline tree (`git stash`), then the Wave 4 tree restored.

---

## 1. The instrument was wrong first — and that mattered

The Phase 1 crawler computed "contextual" links as everything inside `<main>` **minus every `<nav>` element**. The related-links block that this entire programme edits renders as:

```html
<nav class="internal-links" aria-label="Související obsah">…</nav>
```

So the crawler deleted precisely the links being measured. Its first Wave 4 output claimed 541 broken internal links, 166 near-orphans and zero contextual depth — all three contradicted by validators that were passing. **The site was fine; the measurement was wrong.**

Two further defects in the same script: it counted any link whose target was absent from the sitemap as broken (`/contact`, `/agencies`, `/offers` are real routes that are deliberately not canonical entries), and it counted static assets as page links.

The corrected instrument defines contextual scope as everything between the global `<header>` and `<footer>` — `<main>` including `nav.internal-links`, plus the page-level CTA section — and verifies link targets by fetching them rather than assuming. It is documented in the script so the mistake is not repeated.

---

## 2. Site hygiene — unchanged and clean

| Measure | Before | After |
|---|---|---|
| Canonical URLs | 185 | **185** |
| Non-200 | 0 | 0 |
| Broken internal links | 0 | 0 |
| Links to redirects | 0 | 0 |
| Parameterized internal links | 0 | 0 |
| Non-self-canonical | 0 | 0 |
| Duplicate titles / H1s | 0 / 0 | 0 / 0 |
| Orphans | 0 | 0 |
| Near-orphans (zero contextual inbound) | 0 | 0 |
| Avg click depth (all links) | 1.99 | 1.99 |
| Avg contextual depth · max | 2.51 · 5 | **2.51 · 5** |
| Request-page inbound | 174 | 174 |
| Calculator inbound | 174 | 174 |

**Zero new URLs, zero orphans, zero regressions, no crawl-depth change.**

Three pages are unreachable by contextual links alone: `/terms.html`, `/terms-cs.html`, `/terms-de.html`. They are footer-discoverable static legal files, identical before and after — Wave 4 never touched them, and the new gate now forbids contextual links into the static `.html` layer, so this is by design rather than neglect.

---

## 3. Authority shape — rendered graph, commercial pages

| Measure | Before | After |
|---|---|---|
| Commercial pages | 83 | 83 |
| Fed by **1** cluster | 0 | **0** |
| Fed by **2** clusters | 32 | **15** |
| Fed by **3+** clusters | 51 | **68** |
| Source clusters min / median / avg / max | 2 / 3 / 3.39 / 11 | 2 / 3 / **3.64** / 11 |
| Unique sources min / median / avg / max | 3 / 6 / 14.23 / 174 | 3 / **7** / 14.54 / 174 |
| Dominance ≥75% | 13 | **5** |
| Dominance >90% | 0 | **0** |
| **Pages improved** | — | **21** |
| **Pages regressed** | — | **0** |

Registry view (the stricter view, and the one gated): 2-cluster pages **41 → 22**, 3+ **40 → 59**, avg **2.88 → 3.14**, dominance ≥75% **17 → 10**.

---

## 4. Registry and rendered graph agree

This is the check that matters most: the gate reads the registry, Google reads the HTML. If they disagreed, the gate would be measuring an intention rather than a fact.

They agree on direction and magnitude — 2-cluster pages fell by 19 (registry) and 17 (rendered); average clusters rose by 0.26 both ways. They differ in absolute level because the rendered page also carries hub-list and prose links the registry's `internalLinks` array does not model. The registry view is consistently the more conservative of the two, which is the safe direction for a gate to err in.

---

## 5. Browser QA

Playwright against a real production build, **138 tests, all passing**, across two device projects.

Render QA widened from five breakpoints to the eight the brief specifies — **320, 360, 375, 390, 430, 768, 1024, 1440** — over 18 pages, asserting a single visible H1, no horizontal overflow (≤2px), no uncaught/hydration errors and no application console errors at every width. 360, 375 and 430 had never been rendered before; all pass.

Three pages were added to the QA set specifically because Wave 4 grows their related-links block: `/faq-zamestnavani-pracovniku` (53 links, the corpus maximum), `/nabor-odbornych-pozic` and `/nedostatek-pracovniku-ve-vyrobe`. A long list of unbreakable Czech slugs at 320px is the realistic overflow risk from this wave's changes. No overflow at any width.

### One pre-existing test defect, fixed

`CTA keeps the URL clean and captures the surface hint into session state` failed on the `mobile` project. **It fails identically on the baseline tree** — verified by stashing the Wave 4 changes and re-running — so it is not a Wave 4 regression.

Cause: the test clicked `a[data-request-source="employer-hub"]` `.first()`, which resolves to the header button. That button is `display:none` below the nav breakpoint, where the same action lives behind the hamburger. The test encoded a desktop-only assumption.

This is a defect in the **test**, not the product. Probing the page at mobile width found three visible request links, including the page-level CTA — mobile employers have a working request path. The fix opens the hamburger when the header CTA is hidden and then clicks the control the viewport actually exposes. **No assertion was weakened**: clean canonical URL, empty query string and the sessionStorage attribution hint are all still asserted, and mobile now exercises the real journey instead of skipping it.
