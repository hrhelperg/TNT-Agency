# LATAM worker legal source audit — 2026

**Purpose:** every material immigration or employment statement in the PT-BR and
ES candidate corpus traces to a primary source recorded here.
**Access date for all entries below:** 2026-09-21.
**Design baseline:** `8ae4f537fd39325f468d30349683e57aa0a6b7d9`
**Status:** P1 complete. Findings below gate P5 content authoring.

No claim is written from memory. Several facts verified here post-date the
assistant's training data (EU–Mercosur provisional application, the 1 June 2026
programme amendment, the 1 July 2026 quota schedule) and would have been wrong
if assumed.

---

## 1. Verified propositions

### A — Brazil is NOT in *Program kvalifikovaný zaměstnanec* ✅ CONFIRMED

> "Program se vztahuje na zaměstnance z Arménie, Běloruska, Černé Hory, Filipín,
> Gruzie, Indie, Kazachstánu, Moldavska, Mongolska, Severní Makedonie, Srbska,
> **Thajska** a Ukrajiny."

Thirteen countries. **Brazil is absent. No Latin American country appears.**
Covers CZ-ISCO main classes **4–8**. Employer conditions: operating in ČR ≥ 2
years, no arrears to the state, ≥ 6 employees for 3 consecutive months.

- **Source:** Ministerstvo průmyslu a obchodu — *Program kvalifikovaný zaměstnanec*
- **URL:** https://mpo.gov.cz/cz/zahranicni-obchod/ekonomicka-migrace/program-kvalifikovany-zamestnanec--248247/
- **Effective:** 15. 3. 2026
- **Supports:** negative control #1. No page may imply a programme route for Brazilians in ISCO 4–8.

> **Note on method.** A search-result summary of this same list omitted Thailand.
> The primary text was authoritative and the summary was not. No country list is
> ever taken from a summary.

### B — *Program vysoce kvalifikovaný zaměstnanec* is territorially open ✅ CONFIRMED

> "Program **není** teritoriálně omezen a vztahuje se na zaměstnance ze všech
> třetích zemí."

Covers CZ-ISCO main classes **1–3**:

> "kteří dle platného znění aktualizované Klasifikace zaměstnání CZ-ISCO
> vykonávají činnost v hlavních třídách 1 – 3"

- **Source:** MPO — *Program vysoce kvalifikovaný zaměstnanec*
- **URL:** https://mpo.gov.cz/cz/zahranicni-obchod/ekonomicka-migrace/program-vysoce-kvalifikovany-zamestnanec--248246/
- **Effective:** 1. 6. 2026
- **Supports:** Brazilians may participate **where the CZ-ISCO class, position and
  employer conditions are satisfied** — never "every Brazilian qualifies".

> **Verification note.** A first fetch returned the quoted fragment
> `"teritoriálně omezen"` glossed as "not territorially limited" — the quote and
> the gloss asserted opposite things. Re-fetched demanding the literal sentence;
> the negation `není` is present. Had the gloss been trusted without the
> negation, the eligibility model would have been inverted.

### C — Brazilians may use the standard Employee Card route ✅ CONFIRMED

The Czech Embassy in Brasília accepts and processes Employee Card applications,
with appointments booked by email to `brasilia.consulate@mzv.gov.cz`.

- **Source:** Velvyslanectví ČR v Brasílii — konzulární a vízové informace
- **URL:** https://mzv.gov.cz/brasilia/cz/konzularni_a_vizove_info/vizove_informace/index.html
- **Supports:** the standard Employee Card is the realistic route for most
  Brazilian candidates, subject to statutory conditions.

### D — Employee Card: >3 months, tied to a specific registered job ✅ CONFIRMED

> "Zaměstnanecká karta je určena pro občany tzv. třetích zemí, kteří budou v ČR
> zaměstnáni **déle než 3 měsíce**."
> "Zaměstnanecká karta se vydává **pro konkrétní pracovní místo**."
> "Předpokladem pro podání žádosti o zaměstnaneckou kartu je mít **číslo volného
> pracovního místa**."

- **Source:** Ministerstvo zahraničních věcí — Zaměstnanecká karta
- **URL:** https://mzv.gov.cz/jnp/cz/informace_pro_cizince/pobytova_opravneni_k_pobytu_nad_90_dnu/zamestnanecka_karta.html
- **Supports:** no application exists without a registered vacancy number. This
  is why no page may promise a card, or a timeline, in the abstract.

### E — Maximum two years per issuance, repeatedly extendable ✅ CONFIRMED

> "Zaměstnanecká karta se vydává na dobu, na kterou byla uzavřena pracovní
> smlouva nebo dohoda o pracovní činnosti, **nejdéle však na dobu 2 let**."
> "…platnost zaměstnanecké karty lze **opakovaně prodloužit** … vždy však
> nejdéle na dobu 2 let."

- **Source:** Zákon č. 326/1999 Sb., o pobytu cizinců na území ČR, **§ 42g**
- **Supports:** negative control #5. The card follows the **contract**, capped at
  two years — it is not "issued for two years". Permitted wording only:
  *an Employee Card can be issued for up to two years, depending on the contract
  and the approved permit.*

### F — Visa-free short stay does NOT authorize work ✅ CONFIRMED

> "Občané Brazílie nepodléhají pro krátkodobé pobyty do 90 dnů v
> ČR/schengenském prostoru vízové povinnosti, **pokud účelem cesty není
> výdělečná činnost**."

- **Source:** Velvyslanectví ČR v Brasílii — vízové informace
- **URL:** https://mzv.gov.cz/brasilia/cz/konzularni_a_vizove_info/vizove_informace/index.html
- **Supports:** negative control #3, in the issuing authority's own words. The
  exemption is conditioned on the purpose **not** being gainful activity.

### G — EU–Mercosur creates no general Czech work authorization ✅ CONFIRMED

Provisionally applied from **1 May 2026**. Movement of persons is limited to
Mode 4 service suppliers:

> "Service suppliers like intra-corporate transferees and contractual suppliers
> can temporarily enter the EU and Mercosur for business purposes"

No provision creates a right for Mercosur nationals to take up employment with
an EU employer.

- **Source:** European Commission, DG Trade — provisional application factsheet
- **URL:** https://policy.trade.ec.europa.eu/eu-trade-relationships-country-and-region/countries-and-regions/mercosur/eu-mercosur-agreement/factsheet-provisional-application-eu-mercosur-agreement-how-export-goods-and-services_en
- **Also:** Council of the EU, signature greenlit 2026-01-09; signed 2026-01-17
- **Supports:** negative control #2.
- **Risk note:** the agreement is now *live*, which raises rather than lowers the
  risk of false "Mercosur lets Brazilians work in Europe" claims circulating.
  This must be addressed explicitly in content, not merely avoided.

### H — Healthcare is a regulated profession ✅ CONFIRMED

**Physicians, dentists, pharmacists** — Zákon č. 95/2004 Sb., **§ 34**.
Third-country qualification holders must prove health fitness and good character
and pass the **aprobační zkouška**, which tests theory, knowledge of the Czech
healthcare system, and **professional communication in Czech**. The Ministry of
Health decides within **240 days** of complete submission. Recognition of the
foreign degree as equivalent to an accredited Czech master's programme is a
prerequisite.

**Non-physician healthcare professions (incl. nurses)** — Zákon č. 96/2004 Sb.,
applying to qualifications obtained outside the EU/EEA/Switzerland; recognition
is tied to passing the aprobační zkouška. Amended by 236/2025 Sb., effective
1. 1. 2026.

- **Sources:** Ministerstvo zdravotnictví — *Aprobační zkouška*
  (https://mzd.gov.cz/aprobacni-zkouska/) and *Uznávání kvalifikací lékařských
  pracovníků, kteří získali vzdělání mimo státy EU*; Zákon 95/2004 Sb. § 34;
  Zákon 96/2004 Sb.
- **Supports:** the binding constraint for healthcare is the **practice licence,
  not immigration**. A Brazilian physician cannot be placed the way a CNC
  operator can.

---

## 2. Additional findings not in the original proposition set

### 2.1 Consular jurisdiction is split — and it is not optional

| Mission | Covers |
|---|---|
| **Embassy, Brasília** | Distrito Federal + 18 states, plus **Guyana and Suriname** |
| **Consulate General, São Paulo** | São Paulo, Rio de Janeiro, Paraná, Rio Grande do Sul, Santa Catarina, Minas Gerais, Mato Grosso do Sul, Espírito Santo |

- **Source:** https://mzv.gov.cz/brasilia/pt/informacoes_vistos/index.html
- **Relevance:** a candidate in São Paulo who books at Brasília has made a
  wasted, expensive mistake. This is among the most practically valuable facts
  in the corpus.

### 2.2 Official Portuguese-language consular pages exist

The Brasília embassy publishes a Portuguese version of its visa information
(`/brasilia/pt/informacoes_vistos/`). Terminology it uses: *visto de curta ou
longa duração*, *autorização de residência*. It does **not** use a Portuguese
term for the Employee Card.

- **Relevance:** satisfies §12 — link candidates to the official Portuguese
  source rather than rewriting procedure. **Consequence for terminology:** since
  no official Portuguese term for *zaměstnanecká karta* exists, our
  *Cartão de empregado* is a descriptive gloss, not an official name, and must
  always appear alongside the Czech legal term.

### 2.3 No Employee Card quota applies to Brazil

Nařízení vlády č. 220/2019 Sb. caps Employee Card applications per mission. The
annex names 43 missions. **Brasília and São Paulo are not among them.** The only
Latin American missions with quotas are:

| Mission | Highly qualified | Qualified | Investment |
|---|---|---|---|
| Bogotá | 280 | 80 | 0 |
| Havana | 130 | 80 | 0 |

- **Source:** MZV — Nařízení vlády o maximálním počtu žádostí
  (https://mzv.gov.cz/jnp/cz/informace_pro_cizince/legislativa/narizeni_vlady_o_maximalnim_poctu.html)
- **Stated as:** amended by nařízení vlády č. 520/2025 Sb., figures **platí od 1. 7. 2026**.
- **Wording constraint:** state that *no maximum is set in the annex for Brasília
  or São Paulo* — **never** "unlimited". Practical appointment capacity, not the
  regulation, is the real constraint.
- ⚠️ **Open discrepancy:** a secondary source attributes the 1. 7. 2026 changes to
  nařízení vlády č. **109/2026 Sb.**, while the MZV page cites **520/2025 Sb.**
  The MZV page is primary and is followed. The amendment number is **not
  published** in candidate content until reconciled against the Sbírka zákonů.

### 2.4 Volatile mechanics that must never be frozen as static facts

Brasília publishes specific appointment windows and a per-day slot count, and
booking runs by email with responses in roughly 5–7 days. Under §12 these are
**not** published as static facts. Content describes the *mechanism* — booking
is by email request, allocated in order received — and links the official page
with a `lastVerifiedAt` date. Same treatment for fees and processing times.

---

## 3. KEEP / MODIFY / CUT — every high-risk concept

**No concept is cut. Five require a changed content model.**
Route count impact: **0**. PT-BR 22 · ES 21 · 43 routes. No hreflang or sitemap
impact. The ceiling is unchanged and was not a target.

| Concept | Verdict | Reason | Primary source | Routes | hreflang/sitemap |
|---|---|---|---|---|---|
| `employee-card` | **KEEP** | §42g fully supports a substantial, truthful explainer: >3 months, specific registered job, vacancy number required, max 2 years, repeatedly extendable | Zákon 326/1999 Sb. §42g; MZV | 0 | none |
| `brazil-consular-route` | **KEEP** *(upgraded)* | Strongest evidence base in the wave: split jurisdiction, official Portuguese pages, no quota in the annex. Highest practical value to a candidate | MZV Brasília (cs + pt); nv 220/2019 Sb. annex | 0 | none |
| `work-for-engineers` | **KEEP** *(flagship)* | ISCO 1–3 → *vysoce kvalifikovaný* programme is territorially open to Brazilians where position and employer conditions are met. The one genuinely open programme route | MPO, eff. 1. 6. 2026 | 0 | none |
| `work-in-manufacturing` | **MODIFY** | ISCO 4–8. Brazil is **not** in the qualified-worker programme. Must state plainly that the only route is the standard Employee Card, dependent on a registered vacancy, with no programme shortcut and no promised timeline | MPO, eff. 15. 3. 2026 | 0 | none |
| `technical-professions` | **MODIFY** | Spans the ISCO boundary: maintenance and automation technicians may reach class 3 (programme open); CNC and welding trades sit at 7–8 (no programme). Page must split by band and promise the programme for neither trade by default | MPO, both programmes | 0 | none |
| `work-in-logistics` | **MODIFY** *(heaviest caveats)* | Weakest legal footing. ISCO 8–9; class 9 falls outside even the qualified programme's 4–8 range, and Brazil is outside that programme regardless. Owner confirms real recruitment demand, so the page stays — but as an honest account of a hard route, never an invitation | MPO; Zákon 326/1999 Sb. §42g | 0 | none |
| `healthcare-regulated-professions` | **MODIFY** | Immigration may be the *easier* half: ISCO 2–3 reaches the open programme. The binding constraint is the practice licence — recognition, aprobační zkouška, Czech-language competence, 240-day decision. Page must state what TalentPartnerID cannot shortcut | Zákon 95/2004 Sb. §34; Zákon 96/2004 Sb.; MZ ČR | 0 | none |

### 3.1 The strategic inversion this audit produces

The usual recruitment-marketing emphasis is **backwards** for Brazilian
candidates, and the corpus must reflect the real order:

1. **Engineers, technicians and specialists (ISCO 1–3)** — a territorially open
   programme route. Strongest and most honest offer.
2. **Skilled trades (ISCO 7–8)** — standard Employee Card only. Legal, slower,
   vacancy-dependent.
3. **Manufacturing and logistics (ISCO 4–9)** — hardest. No programme route
   exists for Brazilians at all.

Writing these pages in the reverse order — leading with volume manufacturing —
would be the single most misleading thing this wave could do.

---

## 4. Recommended amendment for owner decision

**EU–Mercosur deserves an explicit answer, not silence.** The agreement entered
provisional application on 1 May 2026, and "Mercosur lets Brazilians work in
Europe" is a predictable and now highly searchable falsehood. Options:

- **(a) Fold into existing pages** *(default, no amendment needed)* — a dedicated
  section in `work-in-czechia` plus a `candidate-faq` entry, both PT-BR and ES.
  Route count unchanged at 43.
- **(b) Add a concept** — `mercosur-and-working-in-czechia`, 2 routes, taking
  PT-BR to 23 and ES to 22, sitemap to 332. Requires an owner decision under
  §16.2, since it raises the ceiling.

Proceeding with **(a)** unless directed otherwise.

---

## 5. Sources consulted

| Publisher | Document | URL | Effective / version |
|---|---|---|---|
| MPO | Program kvalifikovaný zaměstnanec | mpo.gov.cz/…/248247 | 15. 3. 2026 |
| MPO | Program vysoce kvalifikovaný zaměstnanec | mpo.gov.cz/…/248246 | 1. 6. 2026 |
| MZV | Zaměstnanecká karta | mzv.gov.cz/…/zamestnanecka_karta.html | accessed 2026-09-21 |
| MZV | Nařízení vlády o maximálním počtu žádostí | mzv.gov.cz/…/narizeni_vlady_o_maximalnim_poctu.html | nv 220/2019 Sb. as amended; figures from 1. 7. 2026 |
| MZV Brasília | Vízové informace (cs) | mzv.gov.cz/brasilia/cz/… | accessed 2026-09-21 |
| MZV Brasília | Informações de vistos (pt) | mzv.gov.cz/brasilia/pt/informacoes_vistos/index.html | accessed 2026-09-21 |
| Sbírka zákonů | Zákon č. 326/1999 Sb. § 42g | — | in force |
| Sbírka zákonů | Zákon č. 95/2004 Sb. § 34 | — | in force |
| Sbírka zákonů | Zákon č. 96/2004 Sb. | — | as amended by 236/2025 Sb., 1. 1. 2026 |
| MZ ČR | Aprobační zkouška | mzd.gov.cz/aprobacni-zkouska/ | accessed 2026-09-21 |
| European Commission, DG Trade | EU–Mercosur provisional application factsheet | policy.trade.ec.europa.eu/… | provisional application 1. 5. 2026 |
| Council of the EU | Signature greenlit | consilium.europa.eu/…/2026/01/09/ | 2026-01-09 |

---

## 6. P1 LEGAL AUDIT AMENDMENTS

Per design §16.1. **None recorded.** No concept changed KEEP/CUT status and no
route was added or removed. The five MODIFY verdicts in §3 change content
models, not the route matrix, and are recorded there rather than as amendments.

Further amendments are appended here as they arise.
