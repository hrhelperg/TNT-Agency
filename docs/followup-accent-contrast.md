# Inherited site-wide debt: `--accent` fails WCAG AA as text

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
`color-contrast`, all the same cause.** The split is 16 on the Czech route — the
15 internal-link, source-link and editorial-note anchors plus its own logo — and
one logo each on the German and English routes. (An earlier version of this
paragraph said "15 … the German and English routes carry the logo only", which
adds up to 17 and undercounts the Czech route by one: the Czech logo was being
counted in neither group.)

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
  every focus ring on the site.
* `.ecc__total-label` on the tinted net panel was 4.43:1. Fixed scoped, 6.84:1.

What is left is the token itself. Changing `--accent` changes the visual
identity of every page, every button, every link on the site; scoping a
correction to the Germany routes would leave the same components looking
different on the 276 routes beside them, which is worse than the defect.

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
