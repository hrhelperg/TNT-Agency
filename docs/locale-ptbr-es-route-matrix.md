# PT-BR + ES candidate route matrix — FROZEN

**Status:** FROZEN at P2. Changes require a §16.1 amendment.
**Design:** `docs/superpowers/specs/2026-09-21-ptbr-es-worker-localization-design.md` (`8ae4f53`)
**Legal audit:** `docs/latam-worker-legal-source-audit-2026.md` (`278d6050`)
**Baseline sitemap:** 287 URLs (187 cs / 50 en / 50 de)

| | PT-BR | ES | total |
|---|---|---|---|
| Concepts | 22 | 21 | — |
| New routes | 22 | 21 | **43** |
| **Sitemap after** | | | **330** |

Ceiling unchanged by P2. Six slugs revised, zero routes added or removed.

---

## 1. Classification

| Cat. | Meaning |
|---|---|
| **A** | MUST LOCALIZE — candidate journey |
| **B** | SHARED TRUST — genuine cs/pt-BR/es equivalence |
| **D** | DO NOT LOCALIZE — excluded, reason recorded |

No category C. Every concept that survived P1 is A or B; everything else is D.

---

## 2. Category A — locale-native candidate concepts

Cluster: PT-BR ↔ ES only. Self-canonical. **No `x-default`.** No Czech member.

| # | concept id | PT-BR | ES | fresh. |
|---|---|---|---|---|
| 1 | `candidate-home` | `/pt-br` | `/es` | conc. |
| 2 | `work-in-czechia` | `/pt-br/trabalhar-na-republica-tcheca` | `/es/trabajar-en-chequia` | conc. |
| 3 | `employee-card` | `/pt-br/cartao-de-empregado-tcheco` ⚑ | `/es/tarjeta-de-empleado-checa` ⚑ | conc. |
| 4 | `documents-required` | `/pt-br/documentos-necessarios` | `/es/documentos-necesarios` | **proc.** |
| 5 | `qualification-recognition` | `/pt-br/reconhecimento-de-qualificacoes` | `/es/reconocimiento-de-titulos` | **proc.** |
| 6 | `how-recruitment-works` | `/pt-br/como-funciona-o-recrutamento` | `/es/como-funciona-el-reclutamiento` | conc. |
| 7 | `before-you-travel` | `/pt-br/antes-de-viajar` | `/es/antes-de-viajar` | **proc.** |
| 8 | `after-arrival` | `/pt-br/depois-de-chegar` ⚑ | `/es/despues-de-llegar` | **proc.** |
| 9 | `life-and-work` | `/pt-br/vida-e-trabalho-na-republica-tcheca` | `/es/vida-y-trabajo-en-chequia` | conc. |
| 10 | `candidate-faq` | `/pt-br/perguntas-frequentes` | `/es/preguntas-frecuentes` | conc. |
| 11 | `candidate-apply` | `/pt-br/candidatar-se` | `/es/postularme` | **proc.** |
| 12 | `candidate-data-notice` | `/pt-br/tratamento-de-dados-do-candidato` ⚑ | `/es/tratamiento-de-datos-del-candidato` ⚑ | conc. |
| 13 | `work-in-manufacturing` | `/pt-br/trabalho-na-industria` | `/es/trabajar-en-la-industria` | conc. |
| 14 | `technical-professions` | `/pt-br/profissoes-tecnicas` | `/es/profesiones-tecnicas` | conc. |
| 15 | `work-in-logistics` | `/pt-br/trabalho-em-logistica` | `/es/trabajar-en-logistica` | conc. |
| 16 | `work-for-engineers` | `/pt-br/trabalho-para-engenheiros` | `/es/trabajar-como-ingeniero` | conc. |
| 17 | `healthcare-regulated-professions` | `/pt-br/profissoes-de-saude-regulamentadas` ⚑ | `/es/profesiones-de-la-salud-reguladas` ⚑ | **proc.** |

**PT-BR only** — single-member cluster, no alternates, no `x-default`:

| # | concept id | PT-BR | ES | fresh. |
|---|---|---|---|---|
| 18 | `brazil-consular-route` | `/pt-br/embaixada-e-consulado-tchecos-no-brasil` ⚑ | — (§32) | **proc.** |

⚑ = revised at P2 slug review, §5 below.

## 3. Category B — czech-derived, `audience: 'shared'`

`x-default → /` retained per existing policy.

| # | concept id | Czech primary | PT-BR | ES |
|---|---|---|---|---|
| 19 | `worker-rights` | `/prava-a-povinnosti-cizincu` | `/pt-br/direitos-do-trabalhador` | `/es/derechos-del-trabajador` |
| 20 | `verify-official-info` | `/kde-overit-informace-pro-cizince` | `/pt-br/onde-verificar-informacoes-oficiais` ⚑ | `/es/donde-verificar-informacion-oficial` ⚑ |
| 21 | `about-us` | `/o-nas` | `/pt-br/sobre-nos` | `/es/sobre-nosotros` |
| 22 | `contact` | `/contact` | `/pt-br/contato` | `/es/contacto` |

`/pt-br/contato` (not *contacto*) and `/es/contacto` are the correct
Brazilian-Portuguese and Spanish forms respectively; the divergence is intended.

## 4. Category D — excluded

| Excluded | Reason |
|---|---|
| Any *vagas / empleos / available jobs* route | No vacancy source of truth. §16 · §44 · change #10 |
| Standalone EU–Mercosur concept | Owner decision: option (a). Integrated into #2 and #10 instead — see §7 |
| `/es/<country>/…` (Peru, Argentina, Colombia, Mexico…) | §32. Bogotá/Havana quotas are country-specific; no page until real content and demand |
| `/zamestnanecka-karta-2026`, `/dokumenty-pro-zamestnani-cizincu`, `/uznavani-kvalifikace-zahranicnich-pracovniku` as cluster members | Employer-framed in their own words — design §3.4. Remain Czech-only and self-canonical |
| Czech regional datasets, employer L1 long-tail, `/blog/*`, marketplace, calculators | Design §3.5 · §47 |

---

## 5. P2 native slug review

Seventeen slugs confirmed unchanged. **Six revised**, two of them for genuine
dialect defects that would have shipped.

### 5.1 Defects found

**#18 `consulado-checo` → `embaixada-e-consulado-tchecos` — dialect defect.**
*Checo* is **European** Portuguese. Brazilian Portuguese is **tcheco**, and §22
forbids European-Portuguese phrasing a Brazilian would find unnatural. Shipping
`checo` in a pt-BR slug would have been a permanent, visible error in the URL of
the page Brazilian candidates need most. Second correction in the same slug:
the page covers the **Embassy** in Brasília *and* the **Consulate General** in
São Paulo, and the entire value of the page is stopping candidates going to the
wrong one — calling both "consulado" reproduces the error the page exists to
prevent.

**#17 `profesiones-sanitarias` → `profesiones-de-la-salud-reguladas` — Spain-specific vocabulary.**
*Sanitario* is Peninsular usage; across much of Latin America it reads as
bathroom-related. §23 forbids Spain-specific vocabulary. `profesiones de la
salud` is the neutral Latin-American form. `reguladas` added to match the P1
MODIFY verdict — the URL itself should not imply ordinary recruitment.

### 5.2 Improvements

| # | Was | Now | Why |
|---|---|---|---|
| 3 | `cartao-de-empregado` / `tarjeta-de-empleado` | `…-tcheco` / `…-checa` | Disambiguates from Brazil's own **Carteira de Trabalho (CTPS)** and from a company ID badge; matches brief §7/§8 search intent ("cartão de empregado República Tcheca", "tarjeta de empleado en Chequia") |
| 8 | `depois-da-chegada` | `depois-de-chegar` | Parallel verbal construction with `antes-de-viajar`; the nominal form reads stiff in pt-BR |
| 12 | `tratamento-de-dados` / `tratamiento-de-datos` | `…-do-candidato` / `…-del-candidato` | Must not read as a second general privacy policy — design §7.4 |
| 17 | *(see 5.1)* | | |
| 20 | `verificar-…` | `onde-verificar-…` / `donde-verificar-…` | Source fidelity: the Czech concept is *Kde ověřit* — "**where** to verify" — and the intent is locational |

### 5.3 Confirmed correct, recorded so review is not repeated

- **`República Tcheca`** (pt-BR) vs **`Chequia`** (es) — both correct for their
  locale; *República Checa* would be the pt-PT form.
- **`contato`** (pt-BR) vs **`contacto`** (es) — divergence intended.
- **`candidatar-se`** / **`postularme`** — match the CTA labels exactly.
- **`reconocimiento-de-titulos`** — preferred over *homologación*, which carries
  a narrower Spain-specific administrative meaning.
- **`reclutamiento`** — neutral Latin-American; *selección de personal* is
  Spain-leaning.

---

## 6. P2 CTA review

### 6.1 Three CTAs from the original brief are REJECTED

§4 and §33 propose CTAs that presuppose a vacancy listing this site does not
have. Using them would breach change #10 at the most visible point of the
funnel:

| Rejected | Why |
|---|---|
| *Ver vagas na República Tcheca* / *Ver empleos en Chequia* | "Vagas"/"empleos" promise listings. No vacancy source exists |
| *Encontrar oportunidades* / *Ver oportunidades* | Same promise, softer wording. A CTA leading to prose about role families is a broken promise |

### 6.2 Approved CTA set

| Slot | PT-BR | ES | Destination |
|---|---|---|---|
| Primary | **Candidatar-se** | **Postularme** | `candidate-apply` |
| Secondary | **Como funciona o recrutamento** | **Cómo funciona el reclutamiento** | `how-recruitment-works` |
| Hub | **Trabalhar na República Tcheca** | **Trabajar en Chequia** | `work-in-czechia` |
| Application | **Enviar currículo** | **Enviar CV** | `candidate-apply` |
| Trust | **Fale conosco** | **Contáctenos** | `contact` |

*Enviar currículo* is the natural pt-BR form (not *CV*). *Enviar CV* is the
neutral Latin-American choice — *hoja de vida* is Colombia-leaning,
*currículum* Spain-leaning.

### 6.3 Ownership

Forbidden on every `audience: 'candidate'` page, enforced at build time:
`/poptavka-pracovniku` · `/en/request-staff` · `/de/personal-anfragen` ·
`/offers` · `/submit-offer` · `/agencies` · `/submit-agency`.

---

## 7. EU–Mercosur integration — option (a), no route

Answered in exactly two places per locale. **No separate canonical URL.**

**`work-in-czechia`** — one paragraph inside the legal-pathway section. States
that the EU–Mercosur agreement does not by itself give a Brazilian citizen a
general right to work in Czechia; distinguishes trade-agreement status from
Czech immigration and work authorisation; routes the reader to the lawful path —
the Employee Card / *zaměstnanecká karta*, or the Highly Qualified Employee
Programme where the specific role and employer qualify. Does not restate the FAQ
answer.

**`candidate-faq`** — one direct question, short and source-backed:

- PT-BR — **"O acordo UE–Mercosul permite trabalhar na República Tcheca sem autorização?"**
- ES — **"¿El acuerdo UE–Mercosur permite trabajar en Chequia sin autorización?"**

Banned phrasing in both locales: *visto Mercosul* / *visa Mercosur*, "direito de
trabalho na UE" / "derecho a trabajar en la UE", or any wording implying the
agreement confers work authorisation.

Source: European Commission DG Trade, provisional application **1 May 2026**;
Mode 4 covers only intra-corporate transferees and contractual service
suppliers entering temporarily for business purposes.

---

## 8. MODIFY content models from P1

Load-bearing. A page contradicting its model fails the publication gate.

### 8.1 `work-in-manufacturing` — MODIFY

ISCO 4–8. **Brazil is not in *Program kvalifikovaný zaměstnanec*** (13 countries,
eff. 15. 3. 2026). Must state plainly that the qualified-worker programme is
unavailable to Brazilian candidates and the route is the standard Employee Card,
which cannot start without a vacancy registered by the employer. No programme
shortcut, no promised timeline, no implication that volume demand means easy
access.

### 8.2 `technical-professions` — MODIFY

Straddles the ISCO boundary and must say so. Maintenance and automation
technicians may reach **class 3** → the *vysoce kvalifikovaný* programme is
territorially open. CNC machining and welding trades sit at **7–8** → no
programme route for Brazilians. Split the explanation by band; promise the
programme for neither trade by default. Occupational qualification evidence
(welding, electrical) is a separate obstacle from immigration — the Czech source
page makes this point and it survives into the candidate page.

### 8.3 `work-in-logistics` — MODIFY, heaviest caveats

Weakest legal footing in the corpus. ISCO 8–9; class 9 falls outside even the
qualified programme's 4–8 range, and Brazil is outside that programme anyway.
Retained **only** because the owner confirmed genuine recruitment demand. The
page is an honest account of a hard route, never an invitation. It must not
suggest warehouse work is an accessible entry point to Europe.

### 8.4 `work-for-engineers` — KEEP, flagship

ISCO 1–3. *"Program není teritoriálně omezen a vztahuje se na zaměstnance ze
všech třetích zemí"* (eff. 1. 6. 2026). The one genuinely open programme route
for Brazilians — and therefore the page that must be most careful to say
**where the specific role, employer and CZ-ISCO class conditions are met**, never
that every Brazilian engineer qualifies.

### 8.5 `healthcare-regulated-professions` — MODIFY

Immigration is the easier half: ISCO 2–3 reaches the open programme. The binding
constraint is the **practice licence**. Must cover: recognition of the foreign
degree as equivalent to an accredited Czech master's programme; the **aprobační
zkouška** under **§ 34 of Act 95/2004 Sb.** (physicians, dentists, pharmacists) or
**Act 96/2004 Sb.** (non-physician professions, incl. nurses; amended 236/2025 Sb.,
eff. 1. 1. 2026); testing of theory, the Czech healthcare system and
**professional communication in Czech**; the Ministry of Health's **240-day**
decision period; and an explicit statement of what TalentPartnerID cannot
shortcut. Must not imply a Brazilian doctor or nurse can be recruited by the
same path as a CNC operator.

### 8.6 `brazil-consular-route` — KEEP, upgraded

Must surface the **jurisdiction split** prominently — Embassy Brasília covers DF
+ 18 states (plus Guyana and Suriname); Consulate General São Paulo covers SP,
RJ, PR, RS, SC, MG, MS, ES. Links the **official Portuguese** consular pages
rather than rewriting procedure (§12). **No "unlimited" language** about
appointment capacity: the annex to nv 220/2019 Sb. sets no maximum for either
mission, which is not the same as unlimited, and practical appointment capacity
is the real constraint. Appointment windows, per-day slot counts, fees and
processing times are **never** published as static facts — describe the mechanism
and carry `lastVerifiedAt`. The amendment number for the 1. 7. 2026 quota
schedule stays unpublished pending reconciliation (audit §2.3).

---

## 9. Standing terminology rules

| Rule | Detail |
|---|---|
| **Employee Card** | *Cartão de empregado* / *Tarjeta de empleado* are **descriptive glosses, not official names** — no official Portuguese or Spanish term exists. **`zaměstnanecká karta` must appear alongside** on every page that names the card (§11) |
| **Two-year wording** | Permitted: *can be issued for up to two years, depending on the contract and the approved permit.* Forbidden: "we provide/guarantee a two-year visa", "issued for two years" |
| **Programme names** | Never translated as if official English/PT/ES titles exist; cite the Czech name with a gloss |
| **Capacity** | Never "unlimited", "guaranteed", "fast-track" |
| **Authority** | TalentPartnerID never appears as government, embassy, visa authority or EU institution; no state logos; official sources cited, never impersonated |

---

## 10. Publication gate

A route ships only when **all** hold: content exists · chrome localized ·
metadata localized · CTA destination valid and audience-correct · source
fidelity passes · legal claims pass · language review passes · freshness
metadata present and within tier · MODIFY content model satisfied.

**Matrix frozen. P5 content authoring may begin once P3 and P4 land.**
