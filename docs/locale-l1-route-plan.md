# Locale L1 — frozen route plan

Derived from `lib/locale/l1-concepts.ts` by `scripts/generate-l1-route-plan.mjs`.
**Do not edit by hand** — `validate:l1-plan` regenerates this and fails on any difference.

## What L1 is

Every Czech concept that is commercially relevant to an employer **and** can be
translated without taking on a legal, statutory or freshness maintenance
obligation. A page is excluded when its subject would stop being true as a law
or a number moves — not because it cites one. Nearly every page in this corpus
cites its sources, so citation is no signal at all.

## Counts

| | |
|---|---|
| L1 concepts | **38** |
| New EN pages | **38** |
| New DE pages | **38** |
| Czech routes represented by an L1 concept | 57 (38 primaries + 19 collapsed variants) |
| Static routes | 195 → **271** |
| Canonical URLs | 205 → **281** |
| Sitemap `<loc>` | 205 → **281** |

Semantic parity, not numerical: 19 Czech synonym pages collapse into
their concept primary and receive no EN/DE page of their own.

## Coverage of the Czech spine

All 185 Czech routes are accounted for.

| Classification | Routes |
|---|---|
| L0 | 16 |
| L1_primary | 38 |
| L1_collapsed | 19 |
| LEGAL | 9 |
| CZECH_ONLY | 57 |
| L2 | 40 |
| OUT_OF_SCOPE | 6 |
| **total** | **185** |

## L1 concepts

### A. Employer / recruitment solutions — 8

| concept_id | page_type | cs_primary | cs_variants | en_url | de_url | cs words | reason / slug note |
|---|---|---|---|---|---|---|---|
| `recruitment-overview` | guide | `/nabor-pracovniku` | `/nabor-zamestnancu`<br>`/jak-najit-pracovniky` | `/en/recruitment` | `/de/personalgewinnung` | 232 | Three Czech pages ask one question — how to go about hiring. English and German do not have three distinct searches for it, so they get one page each. "Personalgewinnung" is the standard German business term; "Personalbeschaffung" reads like a textbook. |
| `recruitment-planning` | guide | `/planovani-naboru` | — | `/en/recruitment-planning` | `/de/personalplanung` | 352 | Distinct from the overview: this is capacity and timing, not method. |
| `role-brief` | guide | `/zadani-pozice-a-profil-kandidata` | — | `/en/role-brief` | `/de/anforderungsprofil` | 583 | "Anforderungsprofil" is what German HR actually calls this document. A literal rendering of the Czech ("Stellenausschreibung und Kandidatenprofil") would name two things where the page is about one. |
| `direct-sourcing` | guide | `/prime-osloveni-kandidatu` | — | `/en/direct-sourcing` | `/de/direktansprache` | 612 | "Direktansprache" is the established German term for this practice. |
| `hard-to-fill-roles` | guide | `/proc-se-nedari-obsadit-odbornou-pozici` | — | `/en/hard-to-fill-roles` | `/de/schwer-besetzbare-stellen` | 689 | Diagnostic page. The Czech title is a question; both target languages read better as a noun phrase. |
| `time-to-hire` | guide | `/jak-dlouho-trva-obsazeni-pozice` | — | `/en/how-long-hiring-takes` | `/de/dauer-einer-stellenbesetzung` | 803 | Safe to translate precisely because the Czech refuses to give a number — it explains what governs the date instead. That refusal must survive translation; see the language audit. |
| `onboarding` | guide | `/onboarding-zamestnancu` | `/adaptace-zamestnancu`<br>`/checklist-pro-nove-zamestnance` | `/en/onboarding` | `/de/onboarding` | 203 | Onboarding, adaptation and the new-starter checklist are one subject split three ways for Czech search. "Onboarding" is current usage in German business writing; "Einarbeitung" is the process itself and appears in the body. |
| `employee-retention` | guide | `/retence-zamestnancu` | — | `/en/employee-retention` | `/de/mitarbeiterbindung` | 213 | Adjacent to the L0 turnover concept but a different decision: keeping people, not measuring departures. |

### B. Specialist and technical recruitment — 13

| concept_id | page_type | cs_primary | cs_variants | en_url | de_url | cs words | reason / slug note |
|---|---|---|---|---|---|---|---|
| `welders` | occupation | `/nabor-svarecu` | — | `/en/welder-recruitment` | `/de/schweisser-rekrutierung` | 809 | Certification scope is the whole point of this page and is a factual constraint, not a claim about us. |
| `cnc-operators` | occupation | `/nabor-cnc-operatoru` | — | `/en/cnc-operator-recruitment` | `/de/cnc-fachkraefte` | 829 | CNC is the same token in all three languages. |
| `electricians` | occupation | `/nabor-elektrikaru` | — | `/en/electrician-recruitment` | `/de/elektriker-rekrutierung` | 923 | The Czech references the electrotechnical competence regulation. Kept, framed as Czech law per the jurisdiction rule, and not extended with any German equivalent. |
| `maintenance-technicians` | occupation | `/udrzba-a-technicky-servis` | — | `/en/maintenance-technicians` | `/de/instandhaltung-technischer-service` | 775 | German splits maintenance into Instandhaltung and Wartung; Instandhaltung is the wider term the page needs. |
| `quality-roles` | occupation | `/pozice-v-rizeni-kvality` | — | `/en/quality-roles` | `/de/qualitaetssicherung-positionen` | 700 | Quality assurance rather than quality management — the page is about operational roles. |
| `shift-supervisors` | occupation | `/mistri-a-vedouci-smen` | — | `/en/shift-supervisors` | `/de/schichtleiter-und-meister` | 711 | "Meister" carries a specific Czech/German trade meaning and is paired with Schichtleiter rather than replaced by it. |
| `automation-technicians` | occupation | `/nabor-techniku-automatizace` | — | `/en/automation-technicians` | `/de/automatisierungstechniker` | 547 | PLC roles. Same occupational family in all three markets. |
| `engineering-roles` | occupation | `/technicti-inzenyri` | — | `/en/engineering-roles` | `/de/ingenieurpositionen` | 543 | Deliberately not "engineers" alone: the page covers a family of positions. |
| `process-and-design-engineers` | occupation | `/technologove-a-konstrukteri` | — | `/en/process-and-design-engineers` | `/de/technologen-und-konstrukteure` | 499 | The Czech page exists because the two roles are confused with each other; the distinction is the content, so both are named in both slugs. |
| `engineering-trades` | occupation | `/strojirenske-profese` | — | `/en/engineering-trades` | `/de/metallberufe` | 726 | "Metallberufe" is how the German labour market groups these trades; "Maschinenbauberufe" is narrower than the Czech. |
| `technical-office-roles` | occupation | `/thp-pozice` | — | `/en/technical-office-roles` | `/de/technische-angestellte` | 651 | THP is a Czech administrative category with no direct equivalent. Translating the abbreviation would be meaningless; the slug describes what the roles are. |
| `logistics-specialists` | occupation | `/odborne-pozice-v-logistice` | — | `/en/logistics-specialists` | `/de/logistik-fachkraefte` | 805 | Distinct from the operational logistics-workers concept: qualified and planning roles. |
| `purchasing-and-supply` | occupation | `/nakup-a-zasobovani` | — | `/en/purchasing-and-supply` | `/de/einkauf-und-beschaffung` | 543 | Einkauf and Beschaffung are both needed: the Czech covers buying and supply planning. |

### C. Industries and professions — 5

| concept_id | page_type | cs_primary | cs_variants | en_url | de_url | cs words | reason / slug note |
|---|---|---|---|---|---|---|---|
| `warehouse-workers` | occupation | `/skladnici` | `/skladovi-pracovnici`<br>`/picker-packer`<br>`/pracovnici-do-skladu`<br>`/manipulacni-pracovnici` | `/en/warehouse-workers` | `/de/lagermitarbeiter` | 237 | Five Czech synonym pages, one warehouse-staffing intent in English and German. |
| `logistics-workers` | occupation | `/pracovnici-do-logistiky` | `/logisticti-pracovnici`<br>`/pracovnici-pro-distribucni-centra`<br>`/pracovnici-pro-ecommerce-sklady` | `/en/logistics-workers` | `/de/logistikmitarbeiter` | 391 | Distribution centres and e-commerce warehouses are Czech search variants of one operational need. |
| `construction-workers` | occupation | `/stavebni-pracovnici` | `/pracovnici-pro-stavebnictvi`<br>`/pomocni-stavebni-pracovnici`<br>`/stavebni-profese` | `/en/construction-workers` | `/de/baumitarbeiter` | 238 | Four Czech pages, one concept. |
| `food-production-workers` | occupation | `/pracovnici-pro-potravinarskou-vyrobu` | `/baleni-potravin-pracovnici`<br>`/vyroba-potravin-pracovnici` | `/en/food-production-workers` | `/de/lebensmittelproduktion-mitarbeiter` | 399 | Packing and production are one hiring intent outside Czech long-tail search. |
| `automotive-workers` | occupation | `/pracovnici-pro-automotive` | `/automobilovy-prumysl-pracovnici`<br>`/montazni-linky-pracovnici` | `/en/automotive-workers` | `/de/automotive-mitarbeiter` | 410 | "Automotive" is used as-is in German industry writing. |

### D. Workforce solutions and situations — 9

| concept_id | page_type | cs_primary | cs_variants | en_url | de_url | cs words | reason / slug note |
|---|---|---|---|---|---|---|---|
| `volume-hiring` | guide | `/hromadny-nabor-pracovniku` | — | `/en/volume-hiring` | `/de/massenrekrutierung` | 571 | A distinct operational situation, not a synonym of the recruitment overview. |
| `production-ramp-up` | guide | `/nabor-pri-nabehu-vyroby` | — | `/en/production-ramp-up-hiring` | `/de/personal-fuer-produktionsanlauf` | 453 | "Produktionsanlauf" is the standard German term for a line or shift starting up. |
| `seasonal-capacity` | guide | `/sezonni-navyseni-kapacity` | — | `/en/seasonal-capacity` | `/de/saisonale-kapazitaet` | 484 | Peaks and campaigns. |
| `absence-cover` | guide | `/absence-v-provozu` | — | `/en/absence-cover` | `/de/personalausfall-abdecken` | 448 | Unplanned absence in an operation, as distinct from a planned vacancy. |
| `direct-hire` | service | `/primy-nabor-zamestnancu` | — | `/en/direct-hire` | `/de/direktvermittlung` | 669 | "Direktvermittlung" is the German staffing-market term for permanent placement. |
| `agency-employment` | service | `/docasne-prideleni-zamestnancu` | — | `/en/temporary-agency-employment` | `/de/arbeitnehmerueberlassung-tschechien` | 191 | The German slug carries "tschechien" deliberately. Arbeitnehmerüberlassung is also the term of the German AÜG, and this page describes the Czech arrangement — the jurisdiction belongs in the URL as well as the first legally meaningful sentence. |
| `agency-fees` | guide | `/cena-sluzeb-personalni-agentury` | — | `/en/agency-fee-models` | `/de/verguetungsmodelle-personalagentur` | 714 | Safe to translate because the Czech names no prices — it explains how fee models differ. No figure may be introduced. |
| `choosing-an-agency` | guide | `/jak-vybrat-personalni-agenturu` | — | `/en/choosing-a-staffing-agency` | `/de/personalagentur-auswaehlen` | 697 | Buyer-side guidance, including how to verify a provider. |
| `agency-contract` | guide | `/smlouva-s-personalni-agenturou` | — | `/en/staffing-agency-contract` | `/de/vertrag-mit-personalagentur` | 657 | Contract terms to look at. Czech law framing is explicit throughout so a German reader cannot take it as German contract guidance. |

### E. Trust and employer authority — 3

| concept_id | page_type | cs_primary | cs_variants | en_url | de_url | cs words | reason / slug note |
|---|---|---|---|---|---|---|---|
| `employer-faq` | faq | `/faq-pro-zamestnavatele` | `/faq-zamestnavani-pracovniku` | `/en/employer-faq` | `/de/haeufige-fragen-arbeitgeber` | 148 | Two Czech FAQ hubs answer the same employer questions. |
| `employer-glossary` | reference | `/slovnik-pojmu-pro-zamestnavatele` | — | `/en/employer-glossary` | `/de/glossar-fuer-arbeitgeber` | 114 | Terminology, including terms that have no clean equivalent — which is itself useful to a foreign reader. |
| `editorial-policy` | utility | `/redakcni-zasady` | — | `/en/editorial-standards` | `/de/redaktionelle-grundsaetze` | n/a | How the site sources and dates its content. Non-statistical, and the page a sceptical reader looks for; the E-E-A-T gate already requires the Czech one to be linked. |

## Deferred to L2

| route | reason |
|---|---|
| `/odborna-zpusobilost-a-opravneni` | Subject IS statutory competence (vyhláška 50, NV 194/2022). Structurally legal. |
| `/ubytovani-pro-pracovniky` | States that accommodation proof is required for some residence permits — immigration-adjacent. |
| `/skutecne-naklady-na-zamestnance` | Employer cost including statutory contributions — payroll. |
| `/kolik-stoji-zamestnanec` | As above. |
| `/neprime-naklady-na-zamestnance` | As above. |
| `/povinnosti-zamestnavatele` | Statutory employer duties. |
| `/minimalni-mzda-2026` | Statutory wage figure, dated. |
| `/naklady-na-zamestnance-cr` | Payroll cost figures. |

Plus every route matched by the `immigration` and `payroll` rules below.

## Czech-only

| route | reason |
|---|---|
| `/nedostatek-pracovniku-ve-vyrobe` | Sector shortage page. Carries no figures, but its intent overlaps the industry concept, and separate EN/DE pages would be near-duplicates of those. |
| `/nedostatek-pracovniku-v-logistice` | As above. |
| `/nedostatek-pracovniku-ve-skladech` | As above. |
| `/nedostatek-pracovniku-ve-stavebnictvi` | As above. |
| `/nedostatek-pracovniku-v-cr` | National labour-market intelligence. Statistical, needs a freshness programme. |

Plus every route matched by the `regional` rule below.

## Classification rules

Applied only to routes no concept claims and no individual entry names.

| rule | classification | reason |
|---|---|---|
| `regional` | CZECH_ONLY | Regional labour-market and cost pages. Their value is locality-specific figures that need a source and freshness programme per locale; translating them would create exactly the maintenance obligation L1 is defined to avoid. |
| `immigration` | L2 | Immigration, permits, residence and employment authorisation, and the compliance content built on them. |
| `payroll` | L2 | Statutory contribution rates and payroll calculation. |
| `marketplace` | OUT_OF_SCOPE | Marketplace surfaces for the Czech market. English-looking slugs are not evidence of an English audience. |
| `blog` | OUT_OF_SCOPE | Dated news items, not evergreen commercial content. |

## Slug review status

| | |
|---|---|
| `MACHINE_LINGUISTIC_REVIEW` | **PASS** — every slug checked for prefix, uniqueness, collision with a Czech route, trailing slash, and for not being a Czech slug with a locale prefix bolted on. |
| `HUMAN_NATIVE_REVIEW` | **NOT_DONE** — no native English or German speaker has reviewed these slugs. They are permanent once indexed, and this limitation is recorded rather than papered over. |
