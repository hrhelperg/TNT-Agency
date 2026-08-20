# Locale route matrix — TalentPartnerID

**Baseline:** 185 canonical URLs (175 Next static routes + 10 static `.html`).
**Czech canonical URLs are unchanged and must stay unchanged.** No `/cs/` prefix.

Categories, per the brief:

| | |
|---|---|
| **A** | must have CS + EN + DE |
| **B** | legal translation already exists |
| **C** | locale-specific / intentionally not translated |
| **D** | obsolete / internal / non-public |

`DRAFT` in a slug column means the concept is in scope for translation but the
native slug has **not** been drafted. It is deliberately not machine-translated:
a slug is permanent and a bad one is expensive to correct.

## Summary

| Category | URLs |
|---|---|
| A — must have CS+EN+DE | 141 |
| B — legal translation already exists (legacy static) | 9 |
| C — CS-only for now — see rationale | 35 |
| D — obsolete/internal | 0 |
| **total** | **185** |

## Matrix

| route_id | cs_url | en_url | de_url | page_type | translation_status | canonical_status | hreflang_status | notes |
|---|---|---|---|---|---|---|---|---|
| home | / | /en/ | /de/ | hub | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| o-nas | /o-nas | /en/about-us | /de/ueber-uns | utility | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| redakcni-zasady | /redakcni-zasady | /en/editorial-policy | /de/redaktionelle-grundsaetze | utility | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| blog-agenturni-pracovnici-vs-interni-zamestnanci | /blog/agenturni-pracovnici-vs-interni-zamestnanci.html | — | — | knowledge | not planned | self-referencing (cs) | none (single locale) | dated CS news item |
| zamestnavani-cizincu | /zamestnavani-cizincu | /en/employing-foreign-nationals | /de/beschaeftigung-auslaendischer-mitarbeiter | knowledge | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| terms | /terms.html | /terms.html | /terms-de.html | legal | exists (legacy static) | self-referencing (cs) | present on legal set — verify reciprocity | legal translation already exists (legacy static) |
| terms-cs | /terms-cs.html | /terms.html | /terms-de.html | legal | exists (legacy static) | self-referencing (cs) | present on legal set — verify reciprocity | legal translation already exists (legacy static) |
| terms-de | /terms-de.html | /terms.html | /terms-de.html | legal | exists (legacy static) | self-referencing (cs) | present on legal set — verify reciprocity | legal translation already exists (legacy static) |
| privacy-cs | /privacy-cs.html | /privacy-policy | /privacy-de.html | legal | exists (legacy static) | self-referencing (cs) | present on legal set — verify reciprocity | legal translation already exists (legacy static) |
| privacy-de | /privacy-de.html | /privacy-policy | /privacy-de.html | legal | exists (legacy static) | self-referencing (cs) | present on legal set — verify reciprocity | legal translation already exists (legacy static) |
| agencies | /agencies | — | — | hub | not planned | self-referencing (cs) | none (single locale) | marketplace surface — CS market only |
| submit-agency | /submit-agency | — | — | utility | not planned | self-referencing (cs) | none (single locale) | marketplace surface — CS market only |
| offers | /offers | — | — | utility | not planned | self-referencing (cs) | none (single locale) | marketplace surface — CS market only |
| submit-offer | /submit-offer | — | — | utility | not planned | self-referencing (cs) | none (single locale) | marketplace surface — CS market only |
| contact | /contact | /en/contact | /de/kontakt | utility | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| blog-nezamestnanost-brezen-2026 | /blog/nezamestnanost-brezen-2026.html | — | — | knowledge | not planned | self-referencing (cs) | none (single locale) | dated CS news item |
| privacy-policy | /privacy-policy | /privacy-policy | /privacy-de.html | legal | exists (legacy static) | self-referencing (cs) | present on legal set — verify reciprocity | legal translation already exists (legacy static) |
| cookies | /cookies.html | /cookies.html | /cookies-de.html | legal | exists (legacy static) | self-referencing (cs) | present on legal set — verify reciprocity | legal translation already exists (legacy static) |
| cookies-cs | /cookies-cs.html | /cookies.html | /cookies-de.html | legal | exists (legacy static) | self-referencing (cs) | present on legal set — verify reciprocity | legal translation already exists (legacy static) |
| cookies-de | /cookies-de.html | /cookies.html | /cookies-de.html | legal | exists (legacy static) | self-referencing (cs) | present on legal set — verify reciprocity | legal translation already exists (legacy static) |
| socialni-zdravotni-dane-2026 | /socialni-zdravotni-dane-2026 | /en/payroll-taxes-and-contributions | /de/lohnnebenkosten-tschechien | knowledge | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovni-povoleni-cr | /pracovni-povoleni-cr | /en/work-permit-czech-republic | /de/arbeitserlaubnis-tschechien | knowledge | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| minimalni-mzda-2026 | /minimalni-mzda-2026 | /en/minimum-wage-czech-republic | /de/mindestlohn-tschechien | knowledge | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zahranicnich-pracovniku | /nabor-zahranicnich-pracovniku | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| modra-karta-cr | /modra-karta-cr | /en/eu-blue-card-czech-republic | /de/blaue-karte-eu-tschechien | knowledge | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| zamestnanecka-karta-2026 | /zamestnanecka-karta-2026 | /en/employee-card-czech-republic | /de/arbeitnehmerkarte-tschechien | knowledge | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| dokumenty-pro-zamestnani-cizincu | /dokumenty-pro-zamestnani-cizincu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| povinnosti-zamestnavatele | /povinnosti-zamestnavatele | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| naklady-na-zamestnance-cr | /naklady-na-zamestnance-cr | — | — | knowledge | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| jak-funguje-pracovni-agentura | /jak-funguje-pracovni-agentura | /en/how-a-staffing-agency-works | /de/wie-eine-personalagentur-arbeitet | knowledge | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| chyby-pri-zamestnavani-cizincu | /chyby-pri-zamestnavani-cizincu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| legalizace-prace-cizincu | /legalizace-prace-cizincu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| docasne-prideleni-zamestnancu | /docasne-prideleni-zamestnancu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| ubytovani-pro-pracovniky | /ubytovani-pro-pracovniky | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| agentura-prace-praha | /agentura-prace-praha | /en/staffing-agency-prague | /de/personalagentur-prag | region | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| agentura-prace-brno | /agentura-prace-brno | /en/staffing-agency-brno | /de/personalagentur-bruenn | region | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| prace-pro-cizince-praha | /prace-pro-cizince-praha | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| prace-pro-cizince-brno | /prace-pro-cizince-brno | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| faq-zamestnavani-pracovniku | /faq-zamestnavani-pracovniku | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| naklady-na-zamestnance-pardubice | /naklady-na-zamestnance-pardubice | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| nedostatek-pracovniku-v-cr | /nedostatek-pracovniku-v-cr | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| trh-prace-pardubickykraj | /trh-prace-pardubickykraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-hradec-kralove | /naklady-na-zamestnance-hradec-kralove | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-kralovehradecky-kraj | /trh-prace-kralovehradecky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-stredni-cechy | /naklady-na-zamestnance-stredni-cechy | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-stredocesky-kraj | /trh-prace-stredocesky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-praha | /naklady-na-zamestnance-praha | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-praha | /trh-prace-praha | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-jihomoravsky-kraj | /naklady-na-zamestnance-jihomoravsky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-jihomoravsky-kraj | /trh-prace-jihomoravsky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-moravskoslezsky-kraj | /naklady-na-zamestnance-moravskoslezsky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-moravskoslezsky-kraj | /trh-prace-moravskoslezsky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-olomoucky-kraj | /naklady-na-zamestnance-olomoucky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-olomoucky-kraj | /trh-prace-olomoucky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-zlinsky-kraj | /naklady-na-zamestnance-zlinsky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-zlinsky-kraj | /trh-prace-zlinsky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-vysocina | /naklady-na-zamestnance-vysocina | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-vysocina | /trh-prace-vysocina | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-jihocesky-kraj | /naklady-na-zamestnance-jihocesky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-jihocesky-kraj | /trh-prace-jihocesky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-plzensky-kraj | /naklady-na-zamestnance-plzensky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-plzensky-kraj | /trh-prace-plzensky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-karlovarsky-kraj | /naklady-na-zamestnance-karlovarsky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-karlovarsky-kraj | /trh-prace-karlovarsky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-ustecky-kraj | /naklady-na-zamestnance-ustecky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-ustecky-kraj | /trh-prace-ustecky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| naklady-na-zamestnance-liberecky-kraj | /naklady-na-zamestnance-liberecky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| trh-prace-liberecky-kraj | /trh-prace-liberecky-kraj | — | — | region | not planned | self-referencing (cs) | none (single locale) | regional data page — see risk R3 |
| jak-ziskat-zamestnaneckou-kartu | /jak-ziskat-zamestnaneckou-kartu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| prodlouzeni-zamestnanecke-karty | /prodlouzeni-zamestnanecke-karty | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| zmena-zamestnavatele-zamestnanecka-karta | /zmena-zamestnavatele-zamestnanecka-karta | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| modra-karta-vs-zamestnanecka-karta | /modra-karta-vs-zamestnanecka-karta | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| povinnosti-pri-zamestnavani-cizincu | /povinnosti-pri-zamestnavani-cizincu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nelegalni-zamestnavani-cizincu | /nelegalni-zamestnavani-cizincu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| sankce-za-nelegalni-zamestnavani | /sankce-za-nelegalni-zamestnavani | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| kontrola-inspektoratu-prace | /kontrola-inspektoratu-prace | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| zdravotni-pojisteni-cizincu | /zdravotni-pojisteni-cizincu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| socialni-pojisteni-cizincu | /socialni-pojisteni-cizincu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| dane-cizincu-v-cr | /dane-cizincu-v-cr | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| prava-a-povinnosti-cizincu | /prava-a-povinnosti-cizincu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| prace-pro-ukrajince-v-cr | /prace-pro-ukrajince-v-cr | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| prace-pro-moldavany-v-cr | /prace-pro-moldavany-v-cr | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| prace-pro-gruzince-v-cr | /prace-pro-gruzince-v-cr | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| prace-pro-filipince-v-cr | /prace-pro-filipince-v-cr | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| prace-pro-srby-v-cr | /prace-pro-srby-v-cr | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| faq-zamestnavani-cizincu | /faq-zamestnavani-cizincu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| slovnik-pojmu-zamestnavani-cizincu | /slovnik-pojmu-zamestnavani-cizincu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| kde-overit-informace-pro-cizince | /kde-overit-informace-pro-cizince | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pro-zamestnavatele | /pro-zamestnavatele | /en/for-employers | /de/fuer-arbeitgeber | hub | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| poptavka-pracovniku | /poptavka-pracovniku | /en/request-workers | /de/personal-anfragen | tool | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-pracovniku | /nabor-pracovniku | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zamestnancu | /nabor-zamestnancu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| jak-najit-pracovniky | /jak-najit-pracovniky | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| planovani-naboru | /planovani-naboru | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| fluktuace-zamestnancu | /fluktuace-zamestnancu | /en/employee-turnover | /de/mitarbeiterfluktuation | problem | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| priciny-fluktuace-zamestnancu | /priciny-fluktuace-zamestnancu | DRAFT | DRAFT | problem | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| jak-snizit-fluktuaci | /jak-snizit-fluktuaci | DRAFT | DRAFT | problem | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| retence-zamestnancu | /retence-zamestnancu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| onboarding-zamestnancu | /onboarding-zamestnancu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| adaptace-zamestnancu | /adaptace-zamestnancu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| checklist-pro-nove-zamestnance | /checklist-pro-nove-zamestnance | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nedostatek-pracovniku-ve-vyrobe | /nedostatek-pracovniku-ve-vyrobe | /en/labour-shortage-in-manufacturing | /de/personalmangel-in-der-produktion | problem | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nedostatek-pracovniku-v-logistice | /nedostatek-pracovniku-v-logistice | DRAFT | DRAFT | problem | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nedostatek-pracovniku-ve-skladech | /nedostatek-pracovniku-ve-skladech | DRAFT | DRAFT | problem | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nedostatek-pracovniku-ve-stavebnictvi | /nedostatek-pracovniku-ve-stavebnictvi | DRAFT | DRAFT | problem | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| skutecne-naklady-na-zamestnance | /skutecne-naklady-na-zamestnance | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| kolik-stoji-zamestnanec | /kolik-stoji-zamestnanec | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| neprime-naklady-na-zamestnance | /neprime-naklady-na-zamestnance | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| faq-pro-zamestnavatele | /faq-pro-zamestnavatele | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nejcastejsi-chyby-zamestnavatelu | /nejcastejsi-chyby-zamestnavatelu | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| slovnik-pojmu-pro-zamestnavatele | /slovnik-pojmu-pro-zamestnavatele | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-pro-vyrobu | /pracovnici-pro-vyrobu | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| operatori-vyroby | /operatori-vyroby | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| montazni-pracovnici | /montazni-pracovnici | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-do-vyroby | /pracovnici-do-vyroby | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| vyrobni-zamestnanci | /vyrobni-zamestnanci | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| skladnici | /skladnici | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| skladovi-pracovnici | /skladovi-pracovnici | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| picker-packer | /picker-packer | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-do-skladu | /pracovnici-do-skladu | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| manipulacni-pracovnici | /manipulacni-pracovnici | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-do-logistiky | /pracovnici-do-logistiky | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| logisticti-pracovnici | /logisticti-pracovnici | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-pro-distribucni-centra | /pracovnici-pro-distribucni-centra | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-pro-ecommerce-sklady | /pracovnici-pro-ecommerce-sklady | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| stavebni-pracovnici | /stavebni-pracovnici | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-pro-stavebnictvi | /pracovnici-pro-stavebnictvi | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pomocni-stavebni-pracovnici | /pomocni-stavebni-pracovnici | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| stavebni-profese | /stavebni-profese | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-pro-potravinarskou-vyrobu | /pracovnici-pro-potravinarskou-vyrobu | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| baleni-potravin-pracovnici | /baleni-potravin-pracovnici | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| vyroba-potravin-pracovnici | /vyroba-potravin-pracovnici | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-pro-automotive | /pracovnici-pro-automotive | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| automobilovy-prumysl-pracovnici | /automobilovy-prumysl-pracovnici | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| montazni-linky-pracovnici | /montazni-linky-pracovnici | DRAFT | DRAFT | industry | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-praha | /pracovnici-praha | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zamestnancu-praha | /nabor-zamestnancu-praha | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-brno | /pracovnici-brno | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zamestnancu-brno | /nabor-zamestnancu-brno | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-ostrava | /pracovnici-ostrava | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zamestnancu-ostrava | /nabor-zamestnancu-ostrava | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-plzen | /pracovnici-plzen | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zamestnancu-plzen | /nabor-zamestnancu-plzen | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-pardubice | /pracovnici-pardubice | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zamestnancu-pardubice | /nabor-zamestnancu-pardubice | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-hradec-kralove | /pracovnici-hradec-kralove | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zamestnancu-hradec-kralove | /nabor-zamestnancu-hradec-kralove | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-liberec | /pracovnici-liberec | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zamestnancu-liberec | /nabor-zamestnancu-liberec | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-usti-nad-labem | /pracovnici-usti-nad-labem | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zamestnancu-usti-nad-labem | /nabor-zamestnancu-usti-nad-labem | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-olomouc | /pracovnici-olomouc | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zamestnancu-olomouc | /nabor-zamestnancu-olomouc | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pracovnici-zlin | /pracovnici-zlin | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-zamestnancu-zlin | /nabor-zamestnancu-zlin | DRAFT | DRAFT | region | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| kalkulacka-mzdy-agenturniho-zamestnance | /kalkulacka-mzdy-agenturniho-zamestnance | /en/agency-worker-pay-calculator | /de/lohnrechner-zeitarbeit | tool | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-odbornych-pozic | /nabor-odbornych-pozic | /en/specialist-recruitment | /de/fachkraefte-recruiting | hub | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| primy-nabor-zamestnancu | /primy-nabor-zamestnancu | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| thp-pozice | /thp-pozice | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| odborna-zpusobilost-a-opravneni | /odborna-zpusobilost-a-opravneni | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| uznavani-kvalifikace-zahranicnich-pracovniku | /uznavani-kvalifikace-zahranicnich-pracovniku | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-svarecu | /nabor-svarecu | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| strojirenske-profese | /strojirenske-profese | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-cnc-operatoru | /nabor-cnc-operatoru | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-elektrikaru | /nabor-elektrikaru | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| udrzba-a-technicky-servis | /udrzba-a-technicky-servis | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| pozice-v-rizeni-kvality | /pozice-v-rizeni-kvality | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| mistri-a-vedouci-smen | /mistri-a-vedouci-smen | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| odborne-pozice-v-logistice | /odborne-pozice-v-logistice | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| prime-osloveni-kandidatu | /prime-osloveni-kandidatu | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| proc-se-nedari-obsadit-odbornou-pozici | /proc-se-nedari-obsadit-odbornou-pozici | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| jak-dlouho-trva-obsazeni-pozice | /jak-dlouho-trva-obsazeni-pozice | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| cena-sluzeb-personalni-agentury | /cena-sluzeb-personalni-agentury | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| jak-vybrat-personalni-agenturu | /jak-vybrat-personalni-agenturu | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| smlouva-s-personalni-agenturou | /smlouva-s-personalni-agenturou | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-techniku-automatizace | /nabor-techniku-automatizace | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| technicti-inzenyri | /technicti-inzenyri | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| technologove-a-konstrukteri | /technologove-a-konstrukteri | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nakup-a-zasobovani | /nakup-a-zasobovani | DRAFT | DRAFT | profession | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| hromadny-nabor-pracovniku | /hromadny-nabor-pracovniku | /en/high-volume-recruitment | /de/massenrekrutierung | problem | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| nabor-pri-nabehu-vyroby | /nabor-pri-nabehu-vyroby | DRAFT | DRAFT | problem | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| sezonni-navyseni-kapacity | /sezonni-navyseni-kapacity | DRAFT | DRAFT | problem | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| absence-v-provozu | /absence-v-provozu | DRAFT | DRAFT | problem | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| cena-neobsazene-pozice | /cena-neobsazene-pozice | /en/cost-of-vacancy | /de/kosten-unbesetzter-stellen | knowledge | planned — slug proposed | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
| zadani-pozice-a-profil-kandidata | /zadani-pozice-a-profil-kandidata | DRAFT | DRAFT | knowledge | planned — slug TBD | self-referencing (cs) | to add (cs/en/de + x-default) | must have CS+EN+DE |
