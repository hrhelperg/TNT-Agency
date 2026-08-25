# Inherited site-wide accessibility debt (site chrome)

Two findings, both in chrome shared with every route, both recorded rather than
fixed inside the Germany calculator branch: the `--accent` token failing WCAG AA
as text, and the closed mobile navigation leaving 12–15 focusable links in the
tab order with nothing painted.

## `--accent` fails WCAG AA as text

Recorded during the sixth refutation of the Germany 2026 employer-cost
calculator. **Not fixed in that branch, deliberately** — the cause is a brand
token used on all 276+ routes, and repainting it is a site-wide decision, not a
detail of one calculator.

## The defect

`--accent: #f05a28` (styles.css:15) is used as a **text** colour in several
shared components. Measured against the backgrounds it actually paints on:

| Where | Foreground | Background | Ratio | Required |
|---|---|---|---|---|
| Header logo, the `ID` in `.logo__word` | `#f05a28` | `#ffffff` | **3.38:1** | 4.5:1 |
| `.internal-links > ul > li > a` | `#f05a28` | `#ffffff` | **3.38:1** | 4.5:1 |
| Source list links `a[rel="nofollow noopener"]` | `#f05a28` | `#f6f8fc` | **3.18:1** | 4.5:1 |
| `.seo-editorial-note > a` | `#f05a28` | `#ffffff` | **3.38:1** | 4.5:1 |
| Language selector, active chip | `#ffffff` | `#f05a28` | **3.38:1** | 4.5:1 |

The logo is 18.08px bold. WCAG "large scale" starts at 18.66px bold, so the
4.5:1 threshold applies rather than 3:1 — by half a pixel.

## Evidence

axe-core, tags `wcag2a wcag2aa wcag21a wcag21aa`, run against the whole document
(not scoped to the calculator) on all three Germany routes at 320 / 390 / 1440
with a calculated result present: **18 unique violating nodes, all
`color-contrast`, all the same cause.** Measured per route and width, after the header change that removed the legacy
language switcher from the Czech calculator route: **17 unique nodes**, and now
width-independent — cs 15 at 320/390/1024/1440, en 1, de 1. The Czech 15 are its
logo, 8 source links, 5 internal links and the editorial-note anchor, i.e. **14
anchors** plus the logo. The German and English routes carry the logo only.

(The count was 18 before, because at 1024 and above the Czech route also showed
the legacy switcher's active language chip. That switcher no longer renders on
this route — it could not change the page language there and is documented in
the header component — so the chip is gone with it. Two earlier versions of this
paragraph stated the split wrongly; it is stated per width now so it cannot be
read as a single-page total.)

Reproduce:

```
npx next start -p 3996
node scratchpad/axefull.mjs      # see the sixth-refutation working copy
```

## Why it was not fixed with the Germany calculator

Three contrast defects found in the same pass WERE fixed, because each was local
or was a plain bug rather than a brand decision:

* `.cookie-banner__text` painted `#435269` on `#0d1e3d` — **2.09:1** — because
  the global `p { color: var(--text-2) }` beat the banner's inherited
  `color: #fff`. Fixed at source: 14.11:1.
* `.cookie-btn--accept` was `#fff` on `--accent` — 3.39:1 at 13.6px/600, which
  is not large scale. Now `--accent-dark`: 4.86:1.
* The focus ring `rgba(240, 90, 40, .40)` painted 1.63:1 against white, below
  the 3:1 of SC 1.4.11. Fixed **scoped to `.ecc--de`** rather than repainting
  every focus ring on the site — and, one round later, scoped to the cookie
  banner as well, where the same ring measured **1.70:1** against `#0d1e3d` and
  2.15:1 against the accept button's fill. The first pass claimed this ring
  defect fixed while leaving the one piece of chrome the acceptance contract
  names explicitly still carrying it. Everywhere ELSE on the site the ring is
  unchanged and remains part of the debt below.
* `.ecc__total-label` on the tinted net panel was 4.43:1. Fixed scoped, 6.84:1.

What is left is the token itself. Changing `--accent` changes the visual
identity of every page, every button, every link on the site; scoping a
correction to the Germany routes would leave the same components looking
different on the 276 routes beside them, which is worse than the defect.

## Also outstanding: 12–15 invisible tab stops before the calculator

Found in the same review round and left here for the same reason — it is site
chrome, unchanged since the base commit, and shared with every route.

The closed `.mobile-nav` is `display:flex; visibility:visible; opacity:0;
pointer-events:none`, with no `inert`, no `aria-hidden` and no
`visibility:hidden`. Its links therefore stay focusable and stay in the
accessibility tree. Measured with Chromium over the full three-locale ×
eight-width matrix: **12 focusable links on `/en/…` and `/de/…`, 15 on the Czech
route**, all at cumulative opacity 0, in the tab order at 280/320/360/390/430/
768/1024 and `display:none` only at 1440. CDP `Accessibility.getPartialAXTree`
reports the first as `{role:'link', name:'Startseite', ignored:false}`. There is
no skip link anywhere on the site (`a[href^="#"]` returns nothing), so a
keyboard user crosses 12 or 15 invisible stops before reaching the gross field.

That is a WCAG 2.1 SC 2.4.7 (Focus Visible, AA) failure on these routes. It does
not touch the calculator's own controls — those were verified at cumulative
opacity 1 with a visible ring — which is why it is recorded rather than fixed
inside this branch.

Fix, when the chrome is next opened: add `visibility: hidden` to the closed
state and `visibility: visible` to `.mobile-nav.open`, transitioning
`visibility 0s linear .3s` so the opacity animation still runs on the way out.
Then re-run a Tab traversal at 390px on one route per language and confirm the
first stop after the header is the page's own content. A skip link would be
worth adding in the same pass.

## Corrective plan

1. Add `--accent-text` (candidate `#c94415`, which measures **4.86:1** on white
   and **4.57:1** on `#f6f8fc`) and leave `--accent` as the fill/brand colour.
2. Switch every TEXT use of `--accent` to `--accent-text`: `.logo__word .id`,
   `.internal-links a`, source-list links, `.seo-editorial-note a`, and any
   other rule where `--accent` is a `color` rather than a `background`.
3. For the language-selector active chip, either darken the chip background to
   `--accent-dark` or keep `--accent` and darken the label.
4. Re-run whole-page axe on a representative route per language and per
   template, not only on the calculator routes.
5. Add a validator so a future `color: var(--accent)` on a light background
   fails the build rather than shipping.

Scope: `styles.css` plus any component that sets the colour inline. No
TypeScript change expected. Should be its own PR, after Germany.
