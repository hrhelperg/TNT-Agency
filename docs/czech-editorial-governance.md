# Czech editorial governance — TalentPartnerID

Czech is the **primary market version**. Czech content quality is prioritised
above English/German expansion. This document defines the editorial standard,
the review workflow, and the honesty rules that the automated gates enforce.

Automated checks (`npm run validate:czech`, `validate:seo`, `security`) only
identify **review candidates**. They never rewrite text and never replace a
**native-Czech editorial review**, which every Tier-1 page must receive.

## 1. Terminology

The canonical terminology registry is `lib/content/czech-terms.json` (typed view:
`lib/content/czech-terms.ts`), aligned with the on-site glossary
`/slovnik-pojmu-pro-zamestnavatele`. Use the approved term for each concept and
keep the role distinctions clear:

- **zaměstnavatel** vs **uživatel** vs **agentura práce** vs **(kmenový /
  agenturní) zaměstnanec** vs **uchazeč / kandidát** vs **cizinec / zahraniční
  pracovník** — never conflate them, especially in legal/compliance prose.

Prefer the statutory term **agentura práce** in formal/legal context (the
colloquial *pracovní agentura* is flagged as a review candidate). Abbreviations
**BOZP** and **OOPP** are upper-case.

## 2. Voice and honesty (see also `lib/content/tone.ts`)

- Professional, calm, factual, practical. Employer- and worker-friendly.
- **Never** ship: unsupported superlatives (*nejlepší agentura*, *číslo 1*,
  *lídr trhu*), guarantees (*garantujeme pracovníky*, *okamžitý nástup*, *bez
  rizika*, *100% úspěch*), fake urgency, or unverified permit/state-endorsement
  claims (*ověřeno MPSV*, *schváleno vládou*). These are **hard build failures**.
- **Never fabricate** salaries, shortage counts, vacancy numbers, placement
  numbers, time-to-hire, savings, retention, testimonials, case results, or
  regional rankings. When current data is not available, say so and link the
  official source (ČSÚ, MPSV, Úřad práce ČR, ČSSZ, MV ČR) — see
  `tone.ts` `FALLBACK_DATA_CS`.

## 3. Per-page editorial metadata (high-impact pages)

Every high-impact Czech page carries: an identifiable editorial entity;
publication date; a meaningful update date (changed only when content materially
changes); a source list; the applicable legal/data period; factual limitations;
and, where substantively revised, a note on what changed.

Where **no named specialist** (lawyer, payroll, immigration) has reviewed the
page, state it honestly rather than inventing an author. The content template
(`components/SeoArticle.tsx`) renders:

> „Redakčně zpracovala redakce TalentPartnerID na základě oficiálních zdrojů
> uvedených výše. Obsah je obecná informace, nikoli individuální právní
> poradenství.“

Do not create author/reviewer profiles for people who do not exist, and do not
claim qualifications, years of experience or professional memberships that
cannot be evidenced.

## 4. Review workflow

1. **Draft / update** content in the structured model (never inline HTML prose
   that bypasses the quality checks).
2. **Automated gates**: `validate:czech` (terminology, superlatives, guarantees,
   urgency, placeholders, diacritics, English fragments, duplicated intros),
   `validate:seo`, `security`, `test`, `build`.
3. **Native-Czech editorial review** of every Tier-1 page (see the page-review
   rubric in `reports/czech-market-leadership-plan.md`). Legal/payroll/
   immigration content additionally needs specialist review before any claim of
   specialist review is made.
4. **Publish** only complete pages — never placeholder sections.
5. **Maintenance**: statutory/payroll on legislative change (min. annual);
   foreign-worker rules on regulatory change; regional data when the source
   publishes a new period; evergreen guides annually or on operational change.
   A review may conclude no change is needed — do **not** bump the public
   modification date without a material change.

## 5. Gates in this repository

| Gate | Enforces |
|---|---|
| `npm run validate:czech` | terminology + honesty (hard) + review candidates |
| `npm run validate:seo` | canonical / param / structured-data hygiene |
| `npm run security` | backend-free, analytics/consent, operator identity |
| `npm run validate:sitemap` | sitemap == self-canonical inventory |
| `npm run test` / `test:e2e` | unit + browser QA |
