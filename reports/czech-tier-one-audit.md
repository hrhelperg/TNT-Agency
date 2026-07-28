# Czech Tier 1 audit — TalentPartnerID (Batch 2b)

Source of truth: `lib/content/tier1-registry.ts` (13 unique-route entries). The
"direct-versus-agency comparison" asset is delivered by the payroll calculator's
`#srovnani` mode (not a separate URL), so it is folded into the calculator entry
rather than inventing a route. Titles/descriptions/H1 are verified Czech by
`BASE=… npm run validate:tier1` (rendered check) — no Tier 1 page ships with
English initial metadata.

Human-review status is per-page in the registry (`editorialStatus`). This is an
automated structural + metadata pass; it is **not** native-human or specialist
review.

| # | Route | Audience / intent | Distinct purpose | Decision asset | Conversion | Review status |
|---|---|---|---|---|---|---|
| 1 | `/` | Zaměstnavatelé / zorientovat se v možnostech a nákladech | Rozcestník zaměstnavatele | Kalkulačka + poptávka | `/poptavka-pracovniku` | automated |
| 2 | `/pro-zamestnavatele` | Řeší konkrétní personální situaci | Rozcestník **podle situace** (11 vstupů) | Situace → checklist → služba → kalkulačka | `/poptavka-pracovniku` | native pending |
| 3 | `/poptavka-pracovniku` | Připraven zadat poptávku | Konverzní příprava e-mailové poptávky (mailto-first) | Formulář + checklist | self | automated |
| 4 | `/kalkulacka-mzdy-agenturniho-zamestnance` | Odhaduje cenu práce | Kalkulačka nákladů + režim srovnání (#srovnani) | Kalkulačka + srovnání | `/poptavka-pracovniku` | specialist pending |
| 5 | `/pracovnici-do-vyroby` | Výrobní podniky | Zajištění výroby: směny, požadavky, plán | Sekce + FAQ + zdroje | `/poptavka-pracovniku` | native pending |
| 6 | `/pracovnici-do-logistiky` | Logistika/distribuce | Zajištění logistiky: směnnost, špičky, doprava | Sekce + FAQ + zdroje | `/poptavka-pracovniku` | native pending |
| 7 | `/pracovnici-do-skladu` | Sklady/e-commerce | Sklad: příjem, picking, packing, expedice | Sekce + FAQ + zdroje | `/poptavka-pracovniku` | native pending |
| 8 | `/pracovnici-pro-automotive` | Automotive | Automotive: takt, kvalita, směny, BOZP | Sekce + FAQ + zdroje | `/poptavka-pracovniku` | native pending |
| 9 | `/pracovnici-pro-potravinarskou-vyrobu` | Potravinářství | Potravinářství: hygiena, teploty, prohlídky | Sekce + FAQ + zdroje | `/poptavka-pracovniku` | native pending |
| 10 | `/nabor-zahranicnich-pracovniku` | Zvažují cizince | EU vs. třetí země, dokumentace, povinnosti | Zdroje + odkazy na povolení | `/poptavka-pracovniku` | specialist pending |
| 11 | `/nabor-zamestnancu-pardubice` | Zaměstnavatelé v Pardubicích | Regionální nábor (sídlo provozovatele) | Regionální kontext + poptávka | `/poptavka-pracovniku` | native pending |
| 12 | `/nabor-zamestnancu-hradec-kralove` | Zaměstnavatelé v HK | Regionální nábor | Regionální kontext + poptávka | `/poptavka-pracovniku` | native pending |
| 13 | `/trh-prace-stredocesky-kraj` | Zaměstnavatelé ve Stř. kraji | Regionální trh práce | Kvalitativní kontext + zdroje | `/poptavka-pracovniku` | native pending |

## Overlap control
Each entry has a distinct `distinctPurpose` (enforced unique by the validator).
Region pages (11–13) are the two-region families flagged in
`content-consolidation.md`; they remain honest qualitative pages and are queued
for the strengthen-or-consolidate decision (owner). No two Tier 1 pages share a
route or purpose.

## Metadata status
- Homepage: Czech title/description/OG (Batch 2).
- `/poptavka-pracovniku`, `/kalkulacka-…`: Czech titles from their own copy.
- All SeoArticle Tier 1 pages: Czech title/description/H1 from the content model.
- `validate:tier1` (rendered) asserts none is English.

## Structural improvement note (#8, honest)
The industry/region Tier 1 pages already carry multi-section bodies, FAQ, official
sources and a CTA (0 thin pages in the recovery audit). The page-specific
operational depth requested (shift models, PPE, medical, hygiene, etc.) is
partly present; deeper per-page operational detail is marked **native-review
pending** rather than machine-expanded, to avoid fabricated operational claims.
The situation hub (`/pro-zamestnavatele`) now routes each employer situation to
the relevant page + tool + clean request CTA.
