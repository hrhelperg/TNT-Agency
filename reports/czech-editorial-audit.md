# Czech editorial audit — TalentPartnerID (Batch 1)

Scope: the Czech editorial surfaces (`lib/content/pages/*`, `employment-content`,
`recruitment-content`, CS legal pages). Produced by `npm run validate:czech`
(registry v2026-07) plus a direct read of the content model. Automated checks
identify **review candidates only** — a native-Czech editorial review is still
required and is not replaced by this audit. Nothing was auto-rewritten.

## Headline

The existing Czech content is **genuinely good professional Czech** — not
translated English/Ukrainian/Russian, not machine-generated, not keyword-stuffed.
The `validate:czech` gate found **zero hard violations**: no unsupported
superlatives, no guarantee/urgency claims, no unverified permit claims, no
placeholder copy. The honesty model is strong (numbers are consistently deferred
to ČSÚ / MPSV / Úřad práce ČR / ČSSZ rather than invented). The work here is
therefore refinement and governance, not remediation of bad copy.

## Top finding (architecture, not language)

**The server-rendered site chrome defaults to English.** The React tree defaults
to Czech (`DEFAULT_LANG='cs'`, `<html lang="cs">`), but the header/footer/nav
render English literals swapped client-side, and the `EN` language button is
hard-coded `active`. For a Czech-primary market this means Googlebot's initial
HTML shows English navigation around Czech article bodies. **Recommendation
(Tier 1, Batch 2):** make Czech the server default — flip the active language to
CS, render Czech nav/footer literals by default, and keep EN/DE as client
switches. Deferred from Batch 1 because it touches the legacy `script.js` +
Header/Footer and needs its own QA pass.

## Review candidates (21) — for native editorial review

| Category | Count | Action |
|---|---|---|
| `pracovní agentura` used where `agentura práce` is the statutory term | 10 files | Prefer the statutory *agentura práce* in formal/legal passages; *pracovní agentura* is acceptable colloquially. Editorial pass. |
| Duplicated disclaimer sentences across region pages (e.g. "Aktuální data … zveřejňují ČSÚ, MPSV a Úřad práce ČR; čísla zde neuvádíme.") | 9 patterns (×8–16) | Honest and correct, but repeated verbatim across the region family. Vary phrasing, or centralise into one shared explainer the pages link to (ties into the region-family consolidation in `content-consolidation.md`). |
| Superlative in benign prose ("…je vždy nejlepší vyjít z oficiálního zdroje") | 1 | Not a marketing claim; leave, or reword to avoid the word. |
| Possible missing diacritics in a keyword string (`prace` in regions.ts) | 1 | Verify the keyword uses `práce`. |

## What is already strong (keep the standard)

- **Region profiles** (`lib/content/pages/regions.ts`): hand-written, per-region
  qualitative facts with correct declension and locatives (`v Praze`, `ve
  Zlínském kraji`, `v Kraji Vysočina`), and an explicit no-invented-numbers rule.
- **Tone governance already exists** (`lib/content/tone.ts`): forbids
  best-agency / guaranteed-job / 100%-success claims and ships the honest
  `DISCLAIMER_CS` / `FALLBACK_DATA_CS`. Batch 1 aligns the new gate with it.
- **Glossary** (`/slovnik-pojmu-pro-zamestnavatele`) already defines core terms
  consistently; the new registry is aligned to it.

## Not fabricated / flagged for owner

- Homepage social-proof figures "500+ Successful Placements" / "100+ Partner
  Companies" (`pages/index.tsx`) are unverified — substantiate or soften (also in
  `content-consolidation.md` §6).
- No named legal/payroll/immigration reviewer exists; pages now state honestly
  that content is editorially prepared from official sources, not individual
  legal advice. Do not invent specialists.

## Method note

The gate scans string/template literals (URLs/slugs excluded so they don't trip
diacritics/terminology checks), applies the registry's approved terms and honesty
lists, and flags duplicated long sentences across pages. It is deterministic and
re-runnable via `npm run validate:czech`.
