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
| canonical routes | 175 |
| in sitemap | 175 |
| Tier 1 / 2 / 3 / 4 | 14 / 76 / 74 / 11 |
| orphans | 0 |
| near-orphans (all) | 4 |
| Google coverage verified | 0 (no export supplied) |

## Per-route baseline

| route | tier | sitemap | http | inbound (ctx) | ctx depth | words | coverage | recommendation |
|---|---|---|---|---|---|---|---|---|
| / | 1 | y | 200 | 3 | 0 | 1185 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /adaptace-zamestnancu | 2 | y | 200 | 5 | 2 | 683 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /agencies | 3 | y | 200 | 4 | 1 | 362 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /agentura-prace-brno | 3 | y | 200 | 6 | 3 | 703 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /agentura-prace-praha | 3 | y | 200 | 6 | 3 | 734 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /automobilovy-prumysl-pracovnici | 3 | y | 200 | 3 | 2 | 822 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /baleni-potravin-pracovnici | 3 | y | 200 | 2 | 3 | 805 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /blog/agenturni-pracovnici-vs-interni-zamestnanci.html | 4 | y | 200 | 1 | 3 | 1500 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /blog/nezamestnanost-brezen-2026.html | 4 | y | 200 | 1 | 3 | 1788 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /cena-sluzeb-personalni-agentury | 3 | y | 200 | 6 | 3 | 1560 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /checklist-pro-nove-zamestnance | 2 | y | 200 | 4 | 3 | 726 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /chyby-pri-zamestnavani-cizincu | 2 | y | 200 | 5 | 2 | 759 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /contact | 3 | y | 200 | 63 | 1 | 254 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /cookies-cs.html | 4 | y | 200 | 3 | 4 | 829 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /cookies-de.html | 4 | y | 200 | 3 | 4 | 889 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /cookies.html | 4 | y | 200 | 2 | 5 | 942 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /dane-cizincu-v-cr | 2 | y | 200 | 5 | 2 | 784 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /docasne-prideleni-zamestnancu | 2 | y | 200 | 20 | 2 | 706 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /dokumenty-pro-zamestnani-cizincu | 2 | y | 200 | 15 | 2 | 726 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /faq-pro-zamestnavatele | 2 | y | 200 | 31 | 2 | 849 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /faq-zamestnavani-cizincu | 2 | y | 200 | 22 | 3 | 943 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /faq-zamestnavani-pracovniku | 2 | y | 200 | 46 | 3 | 1083 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /fluktuace-zamestnancu | 2 | y | 200 | 7 | 2 | 719 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /jak-dlouho-trva-obsazeni-pozice | 2 | y | 200 | 4 | 3 | 1783 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /jak-funguje-pracovni-agentura | 2 | y | 200 | 22 | 2 | 720 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /jak-najit-pracovniky | 2 | y | 200 | 20 | 2 | 764 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /jak-snizit-fluktuaci | 2 | y | 200 | 6 | 2 | 697 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /jak-vybrat-personalni-agenturu | 2 | y | 200 | 5 | 3 | 1529 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /jak-ziskat-zamestnaneckou-kartu | 2 | y | 200 | 6 | 3 | 868 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /kalkulacka-mzdy-agenturniho-zamestnance | 1 | y | 200 | 155 | 1 | 3290 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /kde-overit-informace-pro-cizince | 2 | y | 200 | 17 | 3 | 907 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /kolik-stoji-zamestnanec | 2 | y | 200 | 7 | 2 | 798 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /kontrola-inspektoratu-prace | 2 | y | 200 | 8 | 2 | 763 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /legalizace-prace-cizincu | 2 | y | 200 | 7 | 2 | 780 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /logisticti-pracovnici | 3 | y | 200 | 3 | 2 | 784 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /manipulacni-pracovnici | 3 | y | 200 | 3 | 3 | 817 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /minimalni-mzda-2026 | 2 | y | 200 | 4 | 2 | 943 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /mistri-a-vedouci-smen | 3 | y | 200 | 11 | 1 | 1591 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /modra-karta-cr | 2 | y | 200 | 5 | 3 | 833 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /modra-karta-vs-zamestnanecka-karta | 2 | y | 200 | 3 | 3 | 847 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /montazni-linky-pracovnici | 3 | y | 200 | 3 | 3 | 827 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /montazni-pracovnici | 3 | y | 200 | 3 | 2 | 827 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-cnc-operatoru | 3 | y | 200 | 2 | 2 | 1673 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-elektrikaru | 3 | y | 200 | 4 | 2 | 1890 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-odbornych-pozic | 3 | y | 200 | 19 | 1 | 1747 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-pracovniku | 2 | y | 200 | 23 | 2 | 801 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-svarecu | 3 | y | 200 | 3 | 2 | 1876 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zahranicnich-pracovniku | 1 | y | 200 | 70 | 1 | 1386 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu | 2 | y | 200 | 5 | 2 | 740 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-brno | 2 | y | 200 | 2 | 2 | 752 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-hradec-kralove | 1 | y | 200 | 2 | 2 | 1195 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-liberec | 2 | y | 200 | 2 | 2 | 745 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-olomouc | 2 | y | 200 | 2 | 2 | 837 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-ostrava | 2 | y | 200 | 2 | 2 | 722 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-pardubice | 1 | y | 200 | 2 | 2 | 1220 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-plzen | 2 | y | 200 | 2 | 2 | 739 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-praha | 2 | y | 200 | 2 | 2 | 761 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-usti-nad-labem | 2 | y | 200 | 2 | 2 | 724 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nabor-zamestnancu-zlin | 2 | y | 200 | 2 | 2 | 712 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-cr | 2 | y | 200 | 21 | 2 | 756 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-hradec-kralove | 2 | y | 200 | 3 | 3 | 1035 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-jihocesky-kraj | 2 | y | 200 | 2 | 4 | 1182 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-jihomoravsky-kraj | 2 | y | 200 | 2 | 4 | 1187 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-karlovarsky-kraj | 2 | y | 200 | 2 | 4 | 1191 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-liberecky-kraj | 2 | y | 200 | 2 | 4 | 1178 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-moravskoslezsky-kraj | 2 | y | 200 | 2 | 4 | 1186 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-olomoucky-kraj | 2 | y | 200 | 2 | 4 | 1167 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-pardubice | 2 | y | 200 | 2 | 3 | 1130 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-plzensky-kraj | 2 | y | 200 | 2 | 4 | 1171 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-praha | 2 | y | 200 | 3 | 3 | 1177 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-stredni-cechy | 2 | y | 200 | 3 | 3 | 1037 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-ustecky-kraj | 2 | y | 200 | 2 | 4 | 1171 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-vysocina | 2 | y | 200 | 2 | 4 | 1177 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /naklady-na-zamestnance-zlinsky-kraj | 2 | y | 200 | 2 | 4 | 1173 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nedostatek-pracovniku-v-cr | 2 | y | 200 | 19 | 2 | 1040 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nedostatek-pracovniku-v-logistice | 2 | y | 200 | 8 | 2 | 739 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nedostatek-pracovniku-ve-skladech | 2 | y | 200 | 8 | 2 | 730 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nedostatek-pracovniku-ve-stavebnictvi | 2 | y | 200 | 6 | 2 | 741 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nedostatek-pracovniku-ve-vyrobe | 2 | y | 200 | 14 | 2 | 766 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nejcastejsi-chyby-zamestnavatelu | 3 | y | 200 | 3 | 3 | 768 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /nelegalni-zamestnavani-cizincu | 2 | y | 200 | 5 | 3 | 814 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /neprime-naklady-na-zamestnance | 2 | y | 200 | 4 | 3 | 709 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /o-nas | 1 | y | 200 | 5 | 1 | 583 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /odborna-zpusobilost-a-opravneni | 3 | y | 200 | 12 | 2 | 1996 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /odborne-pozice-v-logistice | 3 | y | 200 | 5 | 2 | 1743 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /offers | 3 | y | 200 | 2 | 1 | 290 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /onboarding-zamestnancu | 2 | y | 200 | 11 | 2 | 725 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /operatori-vyroby | 3 | y | 200 | 5 | 2 | 856 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /picker-packer | 3 | y | 200 | 3 | 3 | 814 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /planovani-naboru | 2 | y | 200 | 13 | 2 | 748 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pomocni-stavebni-pracovnici | 3 | y | 200 | 3 | 2 | 791 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /poptavka-pracovniku | 1 | y | 200 | 154 | 1 | 1167 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /povinnosti-pri-zamestnavani-cizincu | 2 | y | 200 | 10 | 3 | 841 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /povinnosti-zamestnavatele | 2 | y | 200 | 27 | 2 | 822 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pozice-v-rizeni-kvality | 3 | y | 200 | 6 | 1 | 1649 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /prace-pro-cizince-brno | 3 | y | 200 | 4 | 4 | 740 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /prace-pro-cizince-praha | 3 | y | 200 | 4 | 4 | 769 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /prace-pro-filipince-v-cr | 3 | y | 200 | 1 | 4 | 859 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /prace-pro-gruzince-v-cr | 3 | y | 200 | 1 | 4 | 833 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /prace-pro-moldavany-v-cr | 3 | y | 200 | 1 | 4 | 883 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /prace-pro-srby-v-cr | 3 | y | 200 | 1 | 4 | 891 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /prace-pro-ukrajince-v-cr | 3 | y | 200 | 2 | 3 | 856 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovni-povoleni-cr | 2 | y | 200 | 33 | 2 | 1136 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-brno | 3 | y | 200 | 1 | 3 | 766 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-do-logistiky | 1 | y | 200 | 16 | 1 | 1248 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-do-skladu | 1 | y | 200 | 4 | 1 | 1104 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-do-vyroby | 1 | y | 200 | 2 | 2 | 1234 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-hradec-kralove | 3 | y | 200 | 1 | 3 | 744 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-liberec | 3 | y | 200 | 1 | 3 | 764 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-olomouc | 3 | y | 200 | 1 | 3 | 733 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-ostrava | 3 | y | 200 | 1 | 3 | 751 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-pardubice | 3 | y | 200 | 2 | 3 | 722 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-plzen | 3 | y | 200 | 1 | 3 | 767 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-praha | 3 | y | 200 | 1 | 3 | 804 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-pro-automotive | 1 | y | 200 | 4 | 2 | 1197 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-pro-distribucni-centra | 3 | y | 200 | 5 | 2 | 756 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-pro-ecommerce-sklady | 3 | y | 200 | 3 | 2 | 776 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-pro-potravinarskou-vyrobu | 1 | y | 200 | 4 | 2 | 1182 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-pro-stavebnictvi | 3 | y | 200 | 5 | 1 | 816 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-pro-vyrobu | 3 | y | 200 | 24 | 1 | 868 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /pracovnici-usti-nad-labem | 3 | y | 200 | 1 | 3 | 741 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /pracovnici-zlin | 3 | y | 200 | 1 | 3 | 714 | unknown (owner GSC/Seznam export required) | thin internal support — add 1–2 contextual links |
| /prava-a-povinnosti-cizincu | 2 | y | 200 | 2 | 4 | 811 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /priciny-fluktuace-zamestnancu | 2 | y | 200 | 5 | 2 | 698 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /prime-osloveni-kandidatu | 3 | y | 200 | 4 | 2 | 1435 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /primy-nabor-zamestnancu | 2 | y | 200 | 10 | 2 | 1521 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /privacy-cs.html | 4 | y | 200 | 3 | 3 | 1026 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /privacy-de.html | 4 | y | 200 | 3 | 3 | 956 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /privacy-policy | 4 | y | 200 | 5 | 2 | 1732 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /pro-zamestnavatele | 1 | y | 200 | 71 | 1 | 1608 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /proc-se-nedari-obsadit-odbornou-pozici | 3 | y | 200 | 6 | 2 | 1676 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /prodlouzeni-zamestnanecke-karty | 2 | y | 200 | 2 | 4 | 793 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /redakcni-zasady | 3 | y | 200 | 153 | 2 | 622 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /retence-zamestnancu | 2 | y | 200 | 10 | 2 | 725 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /sankce-za-nelegalni-zamestnavani | 2 | y | 200 | 3 | 3 | 783 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /skladnici | 3 | y | 200 | 10 | 2 | 803 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /skladovi-pracovnici | 3 | y | 200 | 3 | 2 | 766 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /skutecne-naklady-na-zamestnance | 2 | y | 200 | 8 | 2 | 800 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /slovnik-pojmu-pro-zamestnavatele | 2 | y | 200 | 4 | 2 | 749 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /slovnik-pojmu-zamestnavani-cizincu | 2 | y | 200 | 3 | 4 | 818 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /smlouva-s-personalni-agenturou | 3 | y | 200 | 4 | 3 | 1488 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /socialni-pojisteni-cizincu | 2 | y | 200 | 4 | 3 | 772 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /socialni-zdravotni-dane-2026 | 2 | y | 200 | 10 | 2 | 1235 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /stavebni-pracovnici | 3 | y | 200 | 6 | 2 | 805 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /stavebni-profese | 3 | y | 200 | 5 | 2 | 814 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /strojirenske-profese | 3 | y | 200 | 8 | 1 | 1686 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /submit-agency | 3 | y | 200 | 3 | 1 | 223 | unknown (owner GSC/Seznam export required) | short — review content depth (native review) |
| /submit-offer | 3 | y | 200 | 23 | 1 | 228 | unknown (owner GSC/Seznam export required) | short — review content depth (native review) |
| /terms-cs.html | 4 | y | 200 | 2 | ∞ | 1090 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /terms-de.html | 4 | y | 200 | 2 | ∞ | 1117 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /terms.html | 4 | y | 200 | 2 | ∞ | 1267 | unknown (owner GSC/Seznam export required) | footer-discoverable legal/utility — keep |
| /thp-pozice | 3 | y | 200 | 8 | 1 | 1504 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-jihocesky-kraj | 3 | y | 200 | 2 | 4 | 1011 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-jihomoravsky-kraj | 3 | y | 200 | 3 | 4 | 1013 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-karlovarsky-kraj | 3 | y | 200 | 2 | 4 | 1020 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-kralovehradecky-kraj | 3 | y | 200 | 5 | 3 | 889 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-liberecky-kraj | 3 | y | 200 | 3 | 4 | 1006 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-moravskoslezsky-kraj | 3 | y | 200 | 3 | 4 | 1015 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-olomoucky-kraj | 3 | y | 200 | 3 | 4 | 992 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-pardubickykraj | 3 | y | 200 | 3 | 3 | 887 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-plzensky-kraj | 3 | y | 200 | 3 | 4 | 996 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-praha | 3 | y | 200 | 4 | 3 | 1011 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-stredocesky-kraj | 1 | y | 200 | 4 | 2 | 1460 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-ustecky-kraj | 3 | y | 200 | 3 | 4 | 997 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-vysocina | 3 | y | 200 | 2 | 4 | 1002 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /trh-prace-zlinsky-kraj | 3 | y | 200 | 3 | 4 | 1002 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /ubytovani-pro-pracovniky | 2 | y | 200 | 6 | 2 | 736 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /udrzba-a-technicky-servis | 3 | y | 200 | 9 | 1 | 1859 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /uznavani-kvalifikace-zahranicnich-pracovniku | 3 | y | 200 | 4 | 2 | 1875 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /vyroba-potravin-pracovnici | 3 | y | 200 | 2 | 3 | 818 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /vyrobni-zamestnanci | 3 | y | 200 | 2 | 2 | 808 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /zamestnanecka-karta-2026 | 2 | y | 200 | 12 | 3 | 832 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /zamestnavani-cizincu | 2 | y | 200 | 51 | 2 | 1021 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /zdravotni-pojisteni-cizincu | 2 | y | 200 | 5 | 3 | 781 | unknown (owner GSC/Seznam export required) | ok — monitor |
| /zmena-zamestnavatele-zamestnanecka-karta | 2 | y | 200 | 2 | 4 | 825 | unknown (owner GSC/Seznam export required) | ok — monitor |