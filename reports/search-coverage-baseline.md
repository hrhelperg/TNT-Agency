# Search coverage baseline — TalentPartnerID (Batch A)

_Coverage status is derived only from repository + live-site evidence. Google/Seznam indexation is NOT inferred from sitemap membership. Where authenticated exports are unavailable, status is **unknown**._

## Data sources

- No owner-supplied GSC / Seznam / WebmasterID export found in-repo.

## Owner actions to enrich this baseline (authenticated data)

- Export **Google Search Console → Coverage/Pages** (indexed vs. Discovered-not-indexed vs. Crawled-not-indexed) → `data/gsc-coverage.csv`.
- Export **GSC → Performance (Pages)** (impressions/clicks per URL) → `data/gsc-performance.csv`.
- Export **Seznam Webmaster** indexed pages → `data/seznam.csv`.
- Export **WebmasterID** sessions per route → `data/webmasterid.csv`.
Re-run `npm run seo:coverage` after adding any of these to merge real coverage status in.

## Totals

| metric | value |
|---|---|
| canonical routes | 155 |
| in sitemap | 155 |
| Tier 1 / 2 / 3 / 4 | 14 / 73 / 57 / 11 |
| orphans | 0 |
| near-orphans (all) | 4 |
| Google coverage verified | 0 (no export supplied) |

## Per-route baseline

| route | tier | sitemap | http | inbound (ctx) | ctx depth | words | coverage | recommendation |
|---|---|---|---|---|---|---|---|---|
| / | 1 | y | 200 | 3 | 0 | 986 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /adaptace-zamestnancu | 2 | y | 200 | 4 | 3 | 651 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /agencies | 3 | y | 200 | 4 | 1 | 350 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /agentura-prace-brno | 3 | y | 200 | 6 | 3 | 675 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /agentura-prace-praha | 3 | y | 200 | 6 | 3 | 706 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /automobilovy-prumysl-pracovnici | 3 | y | 200 | 2 | 4 | 794 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /baleni-potravin-pracovnici | 3 | y | 200 | 2 | 4 | 781 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /blog/agenturni-pracovnici-vs-interni-zamestnanci.html | 4 | y | 200 | 1 | 3 | 1500 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /blog/nezamestnanost-brezen-2026.html | 4 | y | 200 | 1 | 3 | 1788 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /checklist-pro-nove-zamestnance | 2 | y | 200 | 4 | 3 | 698 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /chyby-pri-zamestnavani-cizincu | 2 | y | 200 | 5 | 3 | 731 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /contact | 3 | y | 200 | 63 | 1 | 240 | unknown (owner GSC/Seznam export required) | short — review content depth (native review) |
| /cookies-cs.html | 4 | y | 200 | 3 | 4 | 829 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /cookies-de.html | 4 | y | 200 | 3 | 4 | 889 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /cookies.html | 4 | y | 200 | 2 | 5 | 942 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /dane-cizincu-v-cr | 2 | y | 200 | 5 | 2 | 756 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /docasne-prideleni-zamestnancu | 2 | y | 200 | 16 | 2 | 669 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /dokumenty-pro-zamestnani-cizincu | 2 | y | 200 | 14 | 3 | 694 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /faq-pro-zamestnavatele | 2 | y | 200 | 31 | 3 | 807 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /faq-zamestnavani-cizincu | 2 | y | 200 | 22 | 3 | 915 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /faq-zamestnavani-pracovniku | 2 | y | 200 | 46 | 3 | 1046 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /fluktuace-zamestnancu | 2 | y | 200 | 7 | 3 | 691 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /jak-funguje-pracovni-agentura | 2 | y | 200 | 14 | 2 | 679 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /jak-najit-pracovniky | 2 | y | 200 | 18 | 3 | 731 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /jak-snizit-fluktuaci | 2 | y | 200 | 6 | 3 | 669 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /jak-ziskat-zamestnaneckou-kartu | 2 | y | 200 | 6 | 3 | 840 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /kalkulacka-mzdy-agenturniho-zamestnance | 1 | y | 200 | 28 | 1 | 3278 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /kde-overit-informace-pro-cizince | 2 | y | 200 | 17 | 3 | 879 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /kolik-stoji-zamestnanec | 2 | y | 200 | 5 | 2 | 770 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /kontrola-inspektoratu-prace | 2 | y | 200 | 3 | 4 | 731 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /legalizace-prace-cizincu | 2 | y | 200 | 6 | 3 | 752 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /logisticti-pracovnici | 3 | y | 200 | 2 | 4 | 756 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /manipulacni-pracovnici | 3 | y | 200 | 2 | 4 | 789 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /minimalni-mzda-2026 | 2 | y | 200 | 4 | 2 | 915 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /modra-karta-cr | 2 | y | 200 | 4 | 4 | 801 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /modra-karta-vs-zamestnanecka-karta | 2 | y | 200 | 3 | 3 | 819 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /montazni-linky-pracovnici | 3 | y | 200 | 3 | 4 | 803 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /montazni-pracovnici | 3 | y | 200 | 3 | 4 | 803 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-pracovniku | 2 | y | 200 | 20 | 3 | 767 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zahranicnich-pracovniku | 1 | y | 200 | 68 | 3 | 993 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu | 2 | y | 200 | 4 | 3 | 710 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-brno | 2 | y | 200 | 2 | 3 | 728 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-hradec-kralove | 1 | y | 200 | 2 | 3 | 817 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-liberec | 2 | y | 200 | 2 | 3 | 721 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-olomouc | 2 | y | 200 | 2 | 3 | 813 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-ostrava | 2 | y | 200 | 2 | 3 | 698 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-pardubice | 1 | y | 200 | 2 | 3 | 668 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-plzen | 2 | y | 200 | 2 | 3 | 715 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-praha | 2 | y | 200 | 2 | 3 | 737 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-usti-nad-labem | 2 | y | 200 | 2 | 3 | 700 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-zlin | 2 | y | 200 | 2 | 3 | 688 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-cr | 2 | y | 200 | 21 | 2 | 732 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-hradec-kralove | 2 | y | 200 | 3 | 3 | 1007 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-jihocesky-kraj | 2 | y | 200 | 2 | 4 | 1162 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-jihomoravsky-kraj | 2 | y | 200 | 2 | 4 | 1167 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-karlovarsky-kraj | 2 | y | 200 | 2 | 4 | 1171 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-liberecky-kraj | 2 | y | 200 | 2 | 4 | 1158 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-moravskoslezsky-kraj | 2 | y | 200 | 2 | 4 | 1166 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-olomoucky-kraj | 2 | y | 200 | 2 | 4 | 1147 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-pardubice | 2 | y | 200 | 2 | 3 | 1102 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-plzensky-kraj | 2 | y | 200 | 2 | 4 | 1151 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-praha | 2 | y | 200 | 3 | 3 | 1157 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-stredni-cechy | 2 | y | 200 | 3 | 3 | 1009 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-ustecky-kraj | 2 | y | 200 | 2 | 4 | 1151 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-vysocina | 2 | y | 200 | 2 | 4 | 1157 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-zlinsky-kraj | 2 | y | 200 | 2 | 4 | 1153 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nedostatek-pracovniku-v-cr | 2 | y | 200 | 19 | 3 | 1012 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nedostatek-pracovniku-v-logistice | 2 | y | 200 | 8 | 4 | 715 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nedostatek-pracovniku-ve-skladech | 2 | y | 200 | 8 | 4 | 706 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nedostatek-pracovniku-ve-stavebnictvi | 2 | y | 200 | 6 | 4 | 717 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nedostatek-pracovniku-ve-vyrobe | 2 | y | 200 | 14 | 4 | 736 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nejcastejsi-chyby-zamestnavatelu | 3 | y | 200 | 1 | 4 | 730 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /nelegalni-zamestnavani-cizincu | 2 | y | 200 | 5 | 4 | 786 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /neprime-naklady-na-zamestnance | 2 | y | 200 | 4 | 3 | 681 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /o-nas | 1 | y | 200 | 3 | 1 | 554 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /offers | 3 | y | 200 | 2 | 1 | 278 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /onboarding-zamestnancu | 2 | y | 200 | 11 | 2 | 697 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /operatori-vyroby | 3 | y | 200 | 3 | 4 | 825 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /picker-packer | 3 | y | 200 | 3 | 4 | 790 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /planovani-naboru | 2 | y | 200 | 11 | 3 | 719 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pomocni-stavebni-pracovnici | 3 | y | 200 | 3 | 4 | 767 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /poptavka-pracovniku | 1 | y | 200 | 81 | 1 | 797 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /povinnosti-pri-zamestnavani-cizincu | 2 | y | 200 | 8 | 3 | 813 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /povinnosti-zamestnavatele | 2 | y | 200 | 22 | 2 | 790 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /prace-pro-cizince-brno | 3 | y | 200 | 4 | 4 | 712 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /prace-pro-cizince-praha | 3 | y | 200 | 4 | 4 | 741 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /prace-pro-filipince-v-cr | 3 | y | 200 | 1 | 4 | 835 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /prace-pro-gruzince-v-cr | 3 | y | 200 | 1 | 4 | 809 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /prace-pro-moldavany-v-cr | 3 | y | 200 | 1 | 4 | 859 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /prace-pro-srby-v-cr | 3 | y | 200 | 1 | 4 | 867 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /prace-pro-ukrajince-v-cr | 3 | y | 200 | 2 | 3 | 832 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovni-povoleni-cr | 2 | y | 200 | 33 | 3 | 1108 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-brno | 3 | y | 200 | 1 | 4 | 742 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-do-logistiky | 1 | y | 200 | 14 | 3 | 764 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-do-skladu | 1 | y | 200 | 3 | 3 | 750 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-do-vyroby | 1 | y | 200 | 2 | 3 | 773 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-hradec-kralove | 3 | y | 200 | 1 | 4 | 720 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-liberec | 3 | y | 200 | 1 | 4 | 740 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-olomouc | 3 | y | 200 | 1 | 4 | 709 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-ostrava | 3 | y | 200 | 1 | 4 | 727 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-pardubice | 3 | y | 200 | 1 | 4 | 698 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-plzen | 3 | y | 200 | 1 | 4 | 743 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-praha | 3 | y | 200 | 1 | 4 | 780 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-pro-automotive | 1 | y | 200 | 3 | 3 | 804 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-pro-distribucni-centra | 3 | y | 200 | 4 | 3 | 728 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-pro-ecommerce-sklady | 3 | y | 200 | 3 | 4 | 752 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-pro-potravinarskou-vyrobu | 1 | y | 200 | 3 | 3 | 781 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-pro-stavebnictvi | 3 | y | 200 | 3 | 4 | 790 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-pro-vyrobu | 3 | y | 200 | 19 | 3 | 838 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-usti-nad-labem | 3 | y | 200 | 1 | 4 | 717 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-zlin | 3 | y | 200 | 1 | 4 | 690 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /prava-a-povinnosti-cizincu | 2 | y | 200 | 2 | 4 | 783 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /priciny-fluktuace-zamestnancu | 2 | y | 200 | 4 | 4 | 666 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /privacy-cs.html | 4 | y | 200 | 3 | 3 | 1026 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /privacy-de.html | 4 | y | 200 | 3 | 3 | 956 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /privacy-policy | 4 | y | 200 | 4 | 2 | 1720 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /pro-zamestnavatele | 1 | y | 200 | 67 | 2 | 1340 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /prodlouzeni-zamestnanecke-karty | 2 | y | 200 | 2 | 4 | 765 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /retence-zamestnancu | 2 | y | 200 | 9 | 3 | 693 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /sankce-za-nelegalni-zamestnavani | 2 | y | 200 | 3 | 4 | 755 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /skladnici | 3 | y | 200 | 10 | 3 | 779 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /skladovi-pracovnici | 3 | y | 200 | 3 | 4 | 742 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /skutecne-naklady-na-zamestnance | 2 | y | 200 | 7 | 2 | 776 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /slovnik-pojmu-pro-zamestnavatele | 2 | y | 200 | 2 | 3 | 715 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /slovnik-pojmu-zamestnavani-cizincu | 2 | y | 200 | 3 | 4 | 790 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /socialni-pojisteni-cizincu | 2 | y | 200 | 3 | 3 | 744 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /socialni-zdravotni-dane-2026 | 2 | y | 200 | 10 | 2 | 1223 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /stavebni-pracovnici | 3 | y | 200 | 6 | 3 | 781 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /stavebni-profese | 3 | y | 200 | 3 | 4 | 782 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /submit-agency | 3 | y | 200 | 3 | 1 | 211 | unknown (owner GSC/Seznam export required) | short — review content depth (native review) |
| /submit-offer | 3 | y | 200 | 23 | 1 | 216 | unknown (owner GSC/Seznam export required) | short — review content depth (native review) |
| /terms-cs.html | 4 | y | 200 | 2 | ∞ | 1090 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /terms-de.html | 4 | y | 200 | 2 | ∞ | 1117 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /terms.html | 4 | y | 200 | 2 | ∞ | 1267 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /trh-prace-jihocesky-kraj | 3 | y | 200 | 2 | 4 | 991 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-jihomoravsky-kraj | 3 | y | 200 | 3 | 4 | 993 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-karlovarsky-kraj | 3 | y | 200 | 2 | 4 | 1000 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-kralovehradecky-kraj | 3 | y | 200 | 4 | 4 | 861 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-liberecky-kraj | 3 | y | 200 | 3 | 4 | 986 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-moravskoslezsky-kraj | 3 | y | 200 | 3 | 4 | 995 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-olomoucky-kraj | 3 | y | 200 | 3 | 4 | 972 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-pardubickykraj | 3 | y | 200 | 2 | 4 | 859 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-plzensky-kraj | 3 | y | 200 | 3 | 4 | 976 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-praha | 3 | y | 200 | 4 | 4 | 991 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-stredocesky-kraj | 1 | y | 200 | 4 | 3 | 885 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-ustecky-kraj | 3 | y | 200 | 3 | 4 | 977 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-vysocina | 3 | y | 200 | 2 | 4 | 982 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-zlinsky-kraj | 3 | y | 200 | 3 | 4 | 982 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /ubytovani-pro-pracovniky | 2 | y | 200 | 6 | 3 | 708 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /vyroba-potravin-pracovnici | 3 | y | 200 | 2 | 4 | 794 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /vyrobni-zamestnanci | 3 | y | 200 | 1 | 4 | 780 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /zamestnanecka-karta-2026 | 2 | y | 200 | 12 | 3 | 804 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /zamestnavani-cizincu | 2 | y | 200 | 51 | 2 | 1009 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /zdravotni-pojisteni-cizincu | 2 | y | 200 | 5 | 3 | 753 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /zmena-zamestnavatele-zamestnanecka-karta | 2 | y | 200 | 2 | 4 | 797 | unknown (owner GSC/Seznam export required) | ok — monitor |