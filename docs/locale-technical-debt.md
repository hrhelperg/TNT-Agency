# Locale L0 — recorded technical debt

Deliberate, temporary compromises left by the Locale L0 work. Each is recorded
because it is a decision someone will otherwise rediscover as a bug, and because
the reasoning for leaving it is not visible from the code.

Nothing here is scheduled. This file exists so the next person changing these
surfaces knows what is intentional.

---

## 1. Two language controls on the ten Czech concept primaries

**Status:** intentional, temporary. Do not remove either control without
resolving the dependency described below.

The ten Czech concept-primary pages — the Czech half of a published cs/en/de
cluster — currently render two different language controls:

| Control | Markup | What it does |
|---|---|---|
| **A. Registry locale switcher** | `.locale-switcher` (`components/locale/LanguageSwitcher.tsx`) | Navigates to the real translated URL — `/pro-zamestnavatele` → `/de/fuer-arbeitgeber`. Resolved through `lib/locale/registry.ts`, so it only offers a locale that genuinely publishes an equivalent page. Persists the choice to `tnt-lang`, because clicking it is an explicit choice. |
| **B. Legacy language widget** | `.lang-btn` (`components/Header.tsx`) | Rewrites the current page's chrome in place from the `T` dictionary in `public/script.js`. Never changes the URL. |

Two controls labelled "DE" that do different things is a genuine wart, and B can
still produce the state that motivated A in the first place: German chrome over
an untranslated Czech body.

### Why B has not been removed

B is not really locale navigation. It is what drives the **trilingual
client-side islands** — the payroll calculator, the vacancy-cost tool, and the
other components that read `useLang()` and render in cs/en/de on a Czech page.

Removing B from the concept primaries was attempted during the corrective pass
and reverted. It made the vacancy-cost tool on `/cena-neobsazene-pozice`
unreachable in German: the German equivalent `/de/kosten-unbesetzter-stellen`
carries the prose but not the tool, and with B gone there was no way to reach
the German rendering of the tool at all. Sixteen tests failed, correctly.

So the dependency is: **B cannot go until the islands are reachable in each
locale by URL.**

### Target end state

One visible locale control per page:

- a single switcher that navigates to a real locale URL, and
- interactive islands that take their language from the route, the way
  `EcosystemBanner` and `EmployerRequestForm` now do via
  `lib/locale/route-locale.ts`.

The pattern already exists. `request-staff` shows the shape: the Czech primary
is a form page, and the EN and DE pages mount the *same* `EmployerRequestForm`
component through `LocalePage`'s `afterContent` slot, so field names, validation
and submission cannot drift between locales. Applying that to the calculator and
the vacancy-cost tool would remove the reason B exists.

### What NOT to do

- Do not delete `.lang-btn` from the Czech spine before the islands are
  locale-addressable. That is the reverted change.
- Do not have B navigate instead of swapping text. It would then be a second,
  differently-styled copy of A, and the islands would still be unreachable.
- Do not remove A. It is the only page-to-page locale navigation that exists.

`scripts/validate-locale-pages.mjs` enforces the current arrangement: the legacy
widget is forbidden on locale pages, where it cannot work, and permitted on the
Czech spine, where it still has a job.

---

## 2. Czech accessibility landmark names are in English

**Status:** known defect, deliberately out of scope so far.

`CHROME_ARIA.cs` in `lib/locale/chrome.ts` holds the *English* strings —
"Main navigation", "Open menu", "Breadcrumb" — because that is what the Czech
pages have always announced. The English and German entries are correct for
their languages.

It was left alone in the corrective pass because fixing it edits the rendered
markup of all 185 Czech pages, which deserves its own change and its own
verification rather than riding along inside a locale fix.

The dictionary is already in place, so the fix is to replace the `cs` values and
re-baseline whatever asserts on the current strings.

---

## 3. The pre-CSSOM measurement window can look like an overflow

**Status:** not a defect. Recorded because it was investigated once and the
investigation should not have to be repeated.

Sampling `/de/*` at 320px immediately after `DOMContentLoaded` — particularly
with JavaScript disabled — intermittently reports a 69px horizontal overflow,
roughly one run in five. It resolves within about 400ms.

It was first mislabelled a font reflow, on the strength of two readings taken
before and after `fonts.ready`. Sampling every frame instead showed the cause is
not font swapping at all: it is a **pre-CSSOM measurement window**. The name
matters, because a font reflow would be a real if minor rendering event, whereas
this is a state the renderer passes through and never presents.

That reading is the document **before CSSOM is applied**. At those frames
`header.header` computes `position: static` although it is fixed, `.mobile-nav`
computes `transform: none` although it is translated off-canvas, and the nav
anchors compute `display: inline`. Every element is in its default rendering, so
asking whether a control is "displaced" has no meaningful answer — all of them
are.

It is not shown to anyone. The stylesheet is a render-blocking `<link>` in
`<head>` with no `media`/`onload` trick, and first paint measures earlier than
`DOMContentLoaded`, so Chromium does not present the unstyled layout. It is also
independent of any CSS rule, since no CSS has applied at that point.

Across roughly 26,000 samples over six routes and both JavaScript modes, the
hamburger was never outside the viewport and no sample offered a usable
horizontal scroll surface (tested by writing `scrollLeft` and reading it back).

`tests/e2e/locale-mobile.spec.ts` encodes the distinction rather than the
tolerance: overflow is permitted **only** in frames where the stylesheet has not
applied, and any overflow in a styled frame fails. Removing the `.locale-page`
rule makes it fail on `styled=true` frames, which is the property that keeps the
allowance from becoming a blind spot.

That tolerance rests on a claim about painting, so painting is measured too. A
second test samples every frame from document start and records when the
stylesheet applies, alongside the browser's own First Contentful Paint, and
requires every unstyled frame to precede FCP. Measured at 320px:

| Route | stylesheet applied | FCP | unstyled frames |
|---|---|---|---|
| `/de/fuer-arbeitgeber` | 20.8ms | 56ms | 0 |
| `/de/kosten-unbesetzter-stellen` | 12.2ms | 36ms | 0 |
| `/pro-zamestnavatele` | 16.3ms | 48ms | 0 |
| `/en/for-employers` | 23.6ms | 40ms | 0 |

The window is therefore not merely brief, it is invisible: the first frame
carrying content is already styled. A screenshot is captured the moment FCP is
reported and attached to the Playwright report, so this can be looked at rather
than believed.
