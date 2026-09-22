# PT-BR + ES LATAM worker localization — design

**Status:** frozen design, pre-implementation.
**Date:** 2026-09-21
**Branch:** `feat/ptbr-es-worker-localization`
**Baseline:** `origin/main` = `2c2ca8db32b554edd6d1b799be518796fbd270a0` (PR #51)

Supersedes nothing. Extends the locale architecture frozen by the L0/L1/L2 EN/DE
waves (`docs/locale-route-matrix.md`, `docs/locale-l1-route-plan.md`).

---

## 1. Purpose and audience

Attract legitimate candidates in Brazil and Spanish-speaking Latin America for
real vacancies in the Czech Republic, in Brazilian Portuguese and neutral
Latin-American Spanish.

This is the site's **first candidate-facing layer**. Everything shipped in
cs/en/de to date is employer-facing. That distinction is the single most
important constraint in this design and is enforced structurally, not by
convention (§4, §6, §8).

### 1.1 Baseline facts recorded before any change

| Fact | Value |
|---|---|
| `origin/main` SHA | `2c2ca8db32b554edd6d1b799be518796fbd270a0` |
| Page files | 279 |
| Sitemap URLs | **287** — 187 cs / 50 en / 50 de |
| Locale registry | `lib/locale/registry.ts` — `LOCALES = ['cs','en','de']` |
| Concept tiers | L0 (10, `registry.ts`) · L1 (38, `l1-concepts.ts`, frozen) · L2 calculators · LEGAL (read-only legacy `.html`) |
| Switcher | route-equivalent, registry-driven, no locale-home fallback |
| Chrome | `lib/locale/chrome.ts` — `CHROME_NAV` / `CHROME_FOOTER` / `CHROME_ARIA` keyed `Record<Locale, …>` |
| Analytics | WebmasterID, page-level only |
| Forms | `EmployerRequestForm` only, `mailto:`-based; values never in URL/storage/analytics (`lib/privacy/url-guard`) |
| Vacancy data | **none.** `/offers` is static, schema `numberOfItems: 0` |
| Candidate application | **none.** Does not exist in any locale |
| Operator | `TNT agency s.r.o.`; `companyId` and MPSV agency permit both `state: 'unverified'` in `lib/content/trust-data.ts` |

### 1.2 The key structural discovery

`lib/locale/l1-concepts.ts` `CLASS_RULES` classifies every Czech route matching
`cizinc|kart[aeuy]|povoleni|ukrajin|…|legalizac` as **`L2` — deferred** from
EN/DE, with the reason: *"Immigration, permits, residence and employment
authorisation, and the compliance content built on them."* It was held back
because it needs a source-and-freshness programme.

**That deferred tier is the candidate journey.** This wave is therefore
predominantly greenfield content authoring under a freshness regime, not a
translation pass. The infrastructure work is the smaller half.

---

## 2. Registry model — discriminated concepts

### 2.1 Why the current model cannot express this wave

`LocaleConcept` requires `csPrimary: string`, and
`scripts/validate-locale-registry.mjs:62` asserts it exists in `CZECH_ROUTES`.
Most candidate concepts have no Czech source page. Making `csPrimary` nullable
everywhere would silently weaken that assertion for the 48 existing concepts
that *must* keep it. Rejected.

Two alternatives were rejected explicitly:

- **Author Czech pages for every candidate concept** so each keeps a Czech
  primary — adds ~13 Czech pages no Czech employer searches for, and mutates the
  production CS spine for an architectural convenience. Rejected under §47.
- **A separate candidate registry** — `registry.ts`'s own header rejects this:
  *"Keeping both would have been two sources of truth."* Rejected.

### 2.2 The model

One registry, two concept kinds, discriminated on `kind`. No validator may
assume a concept is Czech-primary.

```ts
export const LOCALES = ['cs', 'en', 'de', 'pt-BR', 'es'] as const
export type Locale = (typeof LOCALES)[number]
export type LocalizedLocale = Exclude<Locale, 'cs'>

/** Who the page is written for. Drives CTA ownership and cluster legality. */
export type Audience = 'employer' | 'candidate' | 'shared'

interface ConceptBase {
  readonly id: string
  readonly audience: Audience
  readonly pageType: string
  readonly notes: string
  /** Explicit localized URLs. Absent locale = translation does not exist. */
  readonly urls: Readonly<Partial<Record<LocalizedLocale, string>>>
}

/** A concept whose identity originates in an existing Czech canonical. */
export interface CzechDerivedConcept extends ConceptBase {
  readonly kind: 'czech-derived'
  readonly csPrimary: string
  readonly csCollapsed?: readonly string[]
  readonly published: readonly Locale[]
}

/** A concept with no Czech source. Its identity originates in a locale. */
export interface LocaleNativeConcept extends ConceptBase {
  readonly kind: 'locale-native'
  /** The locale that owns the concept's identity; must appear in `urls`. */
  readonly primaryLocale: LocalizedLocale
  readonly published: readonly LocalizedLocale[]
}

export type LocaleConcept = CzechDerivedConcept | LocaleNativeConcept
```

### 2.3 Shared helpers

Every downstream consumer goes through these. None branches on `kind` itself.

| Helper | Behaviour |
|---|---|
| `primaryUrl(c)` | `csPrimary` for czech-derived; `urls[primaryLocale]` for locale-native |
| `urlFor(c, locale)` | `csPrimary` when `locale === 'cs'` **and** czech-derived; otherwise `urls[locale]`; `undefined` if absent |
| `publishedLocales(c)` | `readonly Locale[]`, derived from content existence (never declared) |
| `alternatesFor(route)` | published locales of the owning concept, reciprocal in every direction |
| `hasXDefault(c)` | `true` for czech-derived, `false` for locale-native (§5 below) |
| `conceptForRoute(route)` | resolves cs, en, de, pt-BR and es routes alike |
| `localeForRoute(route)` | unchanged contract, extended locale set |

### 2.4 Migration of existing concepts

The 48 existing concepts are all `kind: 'czech-derived'`. To avoid editing 48
object literals — and the review burden of a 48-site diff that must provably
change nothing — the declaration arrays stay typed as
`Omit<CzechDerivedConcept, 'kind'>` and `kind` is stamped centrally:

```ts
const asCzechDerived = (c: Omit<CzechDerivedConcept, 'kind'>): CzechDerivedConcept =>
  ({ ...c, kind: 'czech-derived' })
```

Audience is likewise defaulted to `'employer'` centrally, then overridden on the
four shared concepts named in §3.3.

**Proof obligation:** the generated sitemap and every rendered cs/en/de page must
be **byte-identical** before and after the migration. That is the evidence the
generalization changed nothing.

### 2.5 Locale constants

```ts
LOCALE_PREFIX  = { cs: '', en: '/en', de: '/de', 'pt-BR': '/pt-br', es: '/es' }
LOCALE_HREFLANG= { cs: 'cs-CZ', en: 'en', de: 'de', 'pt-BR': 'pt-BR', es: 'es' }
LOCALE_LANG    = { cs: 'cs', en: 'en', de: 'de', 'pt-BR': 'pt-BR', es: 'es' }
```

Locale id is `pt-BR` (mixed case, per BCP 47); the URL prefix is lowercase
`/pt-br`. `localeFromPathname` maps prefix → id and must not assume they match.

Locale homes are `/pt-br` and `/es` — **no trailing slash**. `next.config.js`
sets `trailingSlash: false` and emits a 308 from `/:path+/`; a trailing-slash
form would be a redirect URL, which must never enter a sitemap. Same rule that
produced `/en` and `/de`.

### 2.6 Hardcoded locale pairs to generalize

All nine derive from the registry after this change:

1. `lib/locale/route-locale.ts:26` — `LOCKED = ['en','de']`
2. `lib/locale/l1-published.ts` — `hasContent` ternary + `['en','de']` loop
3. `lib/locale/l2-calculators.ts` — `hasContent` ternary
4. `scripts/validate-locale-registry.mjs:74,120`
5. `scripts/validate-hreflang.mjs:39` (`ALLOWED` set), `:70`
6. `scripts/generate-sitemap.mjs:49`
7. `scripts/validate-locale-fidelity.mjs:255,411,594,684`
8. `scripts/validate-locale-jurisdiction.mjs` — currently DE-specific; gains a CZ-jurisdiction guard for pt-BR/es
9. `lib/locale/chrome.ts` — `Record<Locale, …>` maps fail typecheck until filled. **This is desirable**: the type system enforces §2 rather than a reviewer.

The `hasContent` ternaries become one registry-derived corpus map:

```ts
const CORPUS: Record<LocalizedLocale, LocaleCorpus> =
  { en: EN_CONTENT, de: DE_CONTENT, 'pt-BR': PTBR_CONTENT, es: ES_CONTENT }
```

---

## 3. Route matrix

**22 PT-BR concepts · 21 ES concepts · 43 new routes. Sitemap 287 → 330.**

Slugs below are **proposals**. They are frozen only after the P1 native-language
review (§6 of the brief). A slug is permanent and a bad one is expensive.

### 3.1 Locale-native, candidate audience (17 concepts, 34 routes)

Cluster = PT-BR ↔ ES only. Self-canonical. No `x-default`. No Czech member.

| # | concept id | PT-BR | ES | freshness |
|---|---|---|---|---|
| 1 | `candidate-home` | `/pt-br` | `/es` | conceptual |
| 2 | `work-in-czechia` | `/pt-br/trabalhar-na-republica-tcheca` | `/es/trabajar-en-chequia` | conceptual |
| 3 | `employee-card` | `/pt-br/cartao-de-empregado` | `/es/tarjeta-de-empleado` | conceptual |
| 4 | `documents-required` | `/pt-br/documentos-necessarios` | `/es/documentos-necesarios` | **procedural** |
| 5 | `qualification-recognition` | `/pt-br/reconhecimento-de-qualificacoes` | `/es/reconocimiento-de-titulos` | **procedural** |
| 6 | `how-recruitment-works` | `/pt-br/como-funciona-o-recrutamento` | `/es/como-funciona-el-reclutamiento` | conceptual |
| 7 | `before-you-travel` | `/pt-br/antes-de-viajar` | `/es/antes-de-viajar` | **procedural** |
| 8 | `after-arrival` | `/pt-br/depois-da-chegada` | `/es/despues-de-llegar` | **procedural** |
| 9 | `life-and-work` | `/pt-br/vida-e-trabalho-na-republica-tcheca` | `/es/vida-y-trabajo-en-chequia` | conceptual |
| 10 | `candidate-faq` | `/pt-br/perguntas-frequentes` | `/es/preguntas-frecuentes` | conceptual |
| 11 | `candidate-apply` | `/pt-br/candidatar-se` | `/es/postularme` | **procedural** |
| 12 | `candidate-data-notice` | `/pt-br/tratamento-de-dados` | `/es/tratamiento-de-datos` | conceptual |
| 13 | `work-in-manufacturing` | `/pt-br/trabalho-na-industria` | `/es/trabajar-en-la-industria` | conceptual |
| 14 | `technical-professions` | `/pt-br/profissoes-tecnicas` | `/es/profesiones-tecnicas` | conceptual |
| 15 | `work-in-logistics` | `/pt-br/trabalho-em-logistica` | `/es/trabajar-en-logistica` | conceptual |
| 16 | `work-for-engineers` | `/pt-br/trabalho-para-engenheiros` | `/es/trabajar-como-ingeniero` | conceptual |
| 17 | `healthcare-regulated-professions` | `/pt-br/profissoes-de-saude` | `/es/profesiones-sanitarias` | **procedural** |

### 3.2 Locale-native, PT-BR only (1 concept, 1 route)

| # | concept id | PT-BR | ES | freshness |
|---|---|---|---|---|
| 18 | `brazil-consular-route` | `/pt-br/consulado-checo-no-brasil` | *none — §32* | **procedural** |

Single-member cluster: no alternates, no `x-default`, self-canonical.
`LocaleAlternates` already returns `null` below two members, so this is correct
without change.

Czech consular procedure for Brazil must never be generalized to Peru,
Argentina, Colombia or Mexico. The ES corpus explains **general Czech rules**
only. Architecture permits future `/es/<country>/…` pages; **none are created
now.**

### 3.3 Czech-derived, shared audience (4 concepts, 8 routes)

These four cluster legitimately: their intent is identical for an employer and a
candidate. Each keeps `x-default → /` under existing policy.

| # | concept id | Czech primary | PT-BR | ES |
|---|---|---|---|---|
| 19 | `worker-rights` | `/prava-a-povinnosti-cizincu` | `/pt-br/direitos-do-trabalhador` | `/es/derechos-del-trabajador` |
| 20 | `verify-official-info` | `/kde-overit-informace-pro-cizince` | `/pt-br/verificar-informacoes-oficiais` | `/es/verificar-informacion-oficial` |
| 21 | `about-us` | `/o-nas` *(extends L0)* | `/pt-br/sobre-nos` | `/es/sobre-nosotros` |
| 22 | `contact` | `/contact` *(extends L0)* | `/pt-br/contato` | `/es/contacto` |

### 3.4 Why three immigration concepts are locale-native, not Czech-derived

Read before assuming these should cluster with their Czech namesakes:

| Czech route | Evidence of employer framing | Verdict |
|---|---|---|
| `/zamestnanecka-karta-2026` | eyebrow `Pracovní právo · Cizinci`; dedicated section **`Povinnosti zaměstnavatele`**; guidance addressed to the employer ("Zaměstnavatel by měl ověřit platnost karty před nástupem") | employer-framed → `employee-card` is locale-native |
| `/dokumenty-pro-zamestnani-cizincu` | titled *"Dokumenty pro zaměstnání cizinců"* — the employer's overview of paperwork accompanying employing a foreigner | employer-framed → `documents-required` is locale-native |
| `/uznavani-kvalifikace-zahranicnich-pracovniku` | heroSubtitle states outright: **"Rozcestí popsané z pohledu zaměstnavatele"** | employer-framed → `qualification-recognition` is locale-native |
| `/prava-a-povinnosti-cizincu` | *"Jaká práva má cizinec jako zaměstnanec"*; headings: rights in employment, residence obligations, where to seek help | audience-neutral → czech-derived, `audience: 'shared'` |
| `/kde-overit-informace-pro-cizince` | directory of official institutions; identical utility to both audiences | audience-neutral → czech-derived, `audience: 'shared'` |

Facts overlapping is not the test. The test is whether the **page's purpose**
differs. A candidate's document checklist and an employer's paperwork overview
are different deliverables that happen to name some of the same papers.

**Consequence: no existing Czech page changes.** The three employer-framed pages
stay Czech-only and self-canonical exactly as today.

### 3.5 Excluded, with reasons

| Excluded | Reason |
|---|---|
| Any *Available jobs / Vagas / Empleos* route | No vacancy source of truth exists. §16, §44, and change #10. No fake listings, no placeholder vacancies, no `JobPosting`, no invented counts. Enforced by a permanent negative control (§7.2). |
| `/es/peru/…`, `/es/argentina/…`, `/es/colombia/…`, `/es/mexico/…` | §32 — no real content or demand yet. Architecture allows them later. |
| Czech regional datasets (`trh-prace-*`, `naklady-na-zamestnance-*`) | §3-D. No LATAM search intent; locality-specific figures with their own freshness obligation. |
| Employer long-tail (L1's 38 concepts) | §3-D. Employer intent; candidates are not the audience. |
| `/blog/*` | Dated CS news items. |
| Marketplace (`/offers`, `/agencies`, `/submit-*`) | CS market surfaces. English-looking slugs are not evidence of an English audience. |
| Payroll/Cost-of-Vacancy calculators | §47 — untouched. Employer tools. |

### 3.6 Occupation-page naming rule

Concept ids and slugs deliberately avoid *jobs / vagas / empleos*. There is no
live vacancy source, and a URL promising openings is a promise the site cannot
keep. All five occupation concepts use **informational work/profession intent**.

`healthcare-regulated-professions` is a regulated-profession **pathway** page,
never a recruitment pitch. It must cover: recognition of qualifications; the
Czech Ministry of Health process; aprobační zkouška / recognition requirements
where applicable; Czech-language requirements where applicable; and an explicit
statement of what TalentPartnerID can and cannot do. It must not imply a
Brazilian doctor or nurse can be recruited by the same path as a CNC operator.
Governing law to verify in P1: Acts 95/2004 Sb. and 96/2004 Sb.

---

## 4. Discovery path — candidate layer reachable, switcher uncorrupted

Two mechanisms, deliberately separate. Conflating them is the failure mode this
section exists to prevent.

### 4.1 The language switcher — unchanged semantics

Offers **only genuine hreflang alternates of the current route**, resolved from
the registry. Because `candidate-home` is locale-native, the Czech employer
homepage has **no** pt-BR alternate, so the switcher does not offer Portuguese
there. Correct by construction, not by a special case.

The four shared concepts (§3.3) *do* gain pt-BR/es in the switcher — correct,
because those are genuine equivalents.

### 4.2 The discovery entry — a navigational link, never an alternate

A distinct footer block on **cs / en / de**:

```
International candidates  →  Português  ·  Español
(cs: Pro uchazeče ze zahraničí | de: Internationale Bewerber)
```

targeting `/pt-br` and `/es`. On **pt-BR / es**, the reciprocal block points at
the employer layer (`Para empregadores` / `Para empleadores`).

Hard constraints, each with a test:

- These links are **never** produced by `alternatesFor()` and **never** emit a
  `<link rel="alternate" hreflang>`.
- They are visibly labelled as a different-audience destination, not a
  translation.
- They live in `CHROME_FOOTER` as their own `FooterKey`, not in `NAV_TARGETS`
  and not in the switcher component.

**Test:** `scripts/mutate-hreflang.mjs` gains a control asserting that adding a
discovery target to any hreflang cluster fails the build.

---

## 5. Canonical and hreflang

| Rule | Decision |
|---|---|
| Canonical | Every PT-BR/ES page self-canonical. Never canonicalized to Czech. |
| Cluster membership | Only semantically equivalent pages. Self-reference plus every **published** equivalent, reciprocal in all directions. |
| `x-default`, czech-derived clusters | `/` — unchanged existing policy. |
| `x-default`, locale-native clusters | **Omitted.** There is no semantically correct default: the Czech root is an employer homepage and is the wrong destination for an unmatched candidate. `hasXDefault(c)` returns `false`. |
| hreflang values | `pt-BR` for Brazilian Portuguese; `es` for the general Spanish version. |
| Phantom alternates | Impossible by construction — `published` is derived from content existence, never declared. |

`scripts/validate-hreflang.mjs` `ALLOWED` extends to
`['cs-CZ','en','de','pt-BR','es']`, and gains an assertion that a locale-native
cluster emits **no** `x-default` while a czech-derived cluster emits exactly one.

---

## 6. Candidate CTA model

### 6.1 Ownership

| Audience | Permitted CTA destinations |
|---|---|
| `candidate` | `candidate-apply`, `how-recruitment-works`, `work-in-czechia`, `contact`, `candidate-data-notice`, any other `candidate`/`shared` concept in the same locale |
| `employer` | unchanged |
| `shared` | either, but must resolve within the reader's own locale |

**Forbidden from any `audience: 'candidate'` page**, at build time:
`/poptavka-pracovniku`, `/en/request-staff`, `/de/personal-anfragen`, `/offers`,
`/submit-offer`, `/agencies`, `/submit-agency`.

`scripts/validate-cta-routing.mjs` is extended to assert audience ownership;
`scripts/mutate-cta-routing.mjs` gains the negative control.

### 6.2 Labels (proposals — frozen after P1 native review)

| Slot | PT-BR | ES |
|---|---|---|
| Primary | `Candidatar-se` | `Postularme` |
| Secondary | `Como funciona o recrutamento` | `Cómo funciona el reclutamiento` |
| Hub | `Trabalhar na República Tcheca` | `Trabajar en Chequia` |

Hero directions (not mandatory final copy): *"Trabalhe na República Tcheca —
oportunidades para profissionais qualificados e trabalhadores técnicos"* /
*"Trabaja en Chequia — oportunidades para profesionales cualificados y
trabajadores técnicos"*. Availability is never promised where no matching
recruitment exists.

---

## 7. Candidate application flow

### 7.1 Mailto-first, CV attached manually

Reuses `EmployerRequestForm`'s architecture and inherits its
`lib/privacy/url-guard` proofs. Server-rendered; readable with JS unavailable.

The four-step model is **rendered in the page**, before the form:

1. Preencha o formulário · *Complete el formulario*
2. O seu programa de e-mail abrirá com a mensagem pronta · *Se abrirá su programa de correo con el mensaje listo*
3. **Anexe o seu currículo antes de enviar** · ***Adjunte su CV antes de enviar*** — visually prominent
4. Envie a mensagem · *Envíe el mensaje*

Step 3 is repeated in the success state. The wording must state plainly that the
message is **not sent** until the candidate sends it from their own mail client.

### 7.2 Fallback for readers with no configured mail client

Always rendered, never JS-dependent:

- the operator email address as literal text,
- the full plain-text body in a read-only `textarea` for manual copy
  (`MailtoResult.body` already supports this),
- a copy-to-clipboard button as progressive enhancement only.

### 7.3 Hard prohibitions, each with a build-time control

- **No `<input type="file">`** anywhere in the candidate layer. A file field that
  cannot upload is a lie about what the page does.
- No candidate values in query strings, hashes, history, storage, logs or
  analytics payloads.
- No third-party candidate tracking.
- No collection beyond what a recruiter needs to respond.

### 7.4 Candidate data notice

`candidate-data-notice` is **not** a second privacy policy, and equally **not a
short summary that redirects the reader to an English page**. A transparency
notice that is only transparent in a language the reader does not have is not
transparency. It must stand on its own in native-quality PT-BR / ES and cover,
at minimum:

1. who operates TalentPartnerID
2. what candidate data is processed
3. why it is processed
4. how the candidate submits it
5. who may receive it
6. the **actual** retention and deletion model
7. applicable legal basis where relevant
8. candidate rights
9. how to exercise those rights
10. contact information
11. whether data may be transferred outside the EEA, if applicable
12. that submitting by email also involves **the candidate's own email
    provider**, which is outside TalentPartnerID's control

Only after covering these may it link to the canonical Privacy Policy. It never
contradicts that policy and never states an obligation the policy does not.

**Escalation clause.** If the P6 privacy audit concludes this notice is not
sufficient for the transparency actually required, then **full PT-BR / ES
Privacy Policy translations enter scope.** They are not kept out artificially to
protect the route ceiling. Scope yields to the transparency obligation, not the
reverse.

---

## 8. Freshness model — risk-based

Replaces a single calendar ceiling with two tiers plus source-change
invalidation.

```ts
export type FreshnessTier = 'procedural' | 'conceptual'
export const FRESHNESS_DAYS: Record<FreshnessTier, number> =
  { procedural: 90, conceptual: 180 }
```

| Tier | Ceiling | Covers |
|---|---|---|
| `procedural` | **90 days** | embassy / consular procedure · application mechanics · document requirements · programme eligibility · quotas and procedural detail |
| `conceptual` | **180 days** | stable Employee Card explainers · worker-rights overviews · stable conceptual legal content |

A concept declares a default tier (§3 tables). **An individual content block may
override to `procedural`** — an Employee Card explainer is conceptual, but its
processing-time and appointment mechanics inside that page are procedural. The
stricter tier always wins.

### 8.1 Source-change invalidation beats the calendar

`lib/content/source-revisions.ts` holds a ledger of
`{ sourceId, revisedAt, note }`. A concept is stale the moment its
`lastVerifiedAt` predates the `revisedAt` of **any** source it cites —
regardless of calendar age. A known source change must never wait out a 90- or
180-day window.

### 8.2 Required metadata per candidate content entry

`jurisdiction: 'CZ'` · `audienceMarket: 'BR' | 'LATAM'` · `lastVerifiedAt` ·
`effectiveFrom` where applicable · `officialSources: SourceRef[]` ·
`freshness: FreshnessTier` · `timeSensitive: true`.

### 8.3 Surface and gate

Every candidate page renders a visible *"Verificado em «date» · Fontes
oficiais"* / *"Verificado el «date» · Fuentes oficiales"* line.
`scripts/validate-candidate-freshness.mjs` fails the build on breach;
`scripts/mutate-candidate-freshness.mjs` proves the gate detects one. Expired
immigration content must never silently present itself as current.

---

## 9. Legal truth gates

### 9.1 Research precedes writing (P1, blocking)

`docs/latam-worker-legal-source-audit-2026.md`. Every material
immigration/employment statement records: **source · effective date ·
jurisdiction · access date · claim supported**. Primary sources only — MZV,
MV ČR (OAMP), MPO, MPSV, Úřad práce, Embassy of the Czech Republic in Brasília,
Consulate General in São Paulo, Sbírka zákonů. No old claim is translated.

Propositions to independently verify before any content is written:

| | Proposition |
|---|---|
| A | Brazil is **not** among the countries covered by *Program kvalifikovaný zaměstnanec* for normal CZ-ISCO 4–8 qualified-worker recruitment |
| B | *Program vysoce kvalifikovaný zaměstnanec* is territorially unrestricted and may apply to Brazilians **where the CZ-ISCO / position / employer conditions are satisfied** — not to every Brazilian candidate |
| C | Brazilian citizens may use the standard Employee Card route where statutory conditions are met |
| D | The Employee Card generally corresponds to employment over three months and is tied to a specific qualifying job |
| E | The Employee Card may be issued for the duration of the employment relationship, **but no longer than two years per issuance** |
| F | Short-stay visa exemption for Brazilian citizens does **not** itself authorize gainful employment |
| G | EU–Mercosur does **not** create general Czech work authorization for Brazilian workers |
| H | Healthcare is a regulated profession under Acts 95/2004 and 96/2004 Sb. — recognition, aprobační zkouška and language requirements as applicable |

If a source does not support a truthful, substantial page, **the concept is cut,
not padded.** `healthcare-regulated-professions`, `work-in-logistics` (largely
CZ-ISCO 8–9, where the qualified-worker route is unavailable to Brazilians and
Employee Card conditions are hardest to meet) and `brazil-consular-route` are
the likeliest casualties. Cutting one reduces the route count; it does not
relax any gate.

### 9.2 Permanent negative controls

`scripts/validate-worker-claims.mjs` + `scripts/mutate-worker-claims.mjs`.
Patterns are checked in PT, ES and EN. Each mutation **must fail the build**:

| # | Injected claim | From |
|---|---|---|
| 1 | "Brazil is in Program kvalifikovaný zaměstnanec" | §46 |
| 2 | "EU-Mercosur gives Brazilians the right to work in Czechia" | §46 |
| 3 | "Brazilian citizens can work visa-free in Czechia for 90 days" | §46 |
| 4 | "TalentPartnerID guarantees a two-year visa" | §46 |
| 5 | "Employee Card is always issued for two years" | §46 |
| 6 | "TalentPartnerID issues residence permits" | §46 |
| 7 | a route matching `/vagas|/empleos|available-jobs` exists | change #10 |
| 8 | `JobPosting` structured data on a candidate page | §38 |
| 9 | `<input type="file">` in a candidate component | change #8 |
| 10 | a `candidate` CTA resolving to an employer destination | §34 |
| 11 | a discovery link entering an hreflang cluster | change #6 |
| 12 | a locale-native cluster emitting `x-default` | change #5 |

### 9.3 Positioning constraints

- **Two-year wording.** Permitted: *"Depending on the employment contract and the
  approved residence permit, an Employee Card can be issued for up to two
  years."* Forbidden: any form of "our guaranteed two-year visa" or
  "TalentPartnerID issues two-year visas."
- **No government affiliation.** TalentPartnerID must never appear to be the
  Czech government, an embassy, a visa authority or an EU institution. No
  Czech/EU government logos. Official sources are linked and cited, and the page
  distinguishes TalentPartnerID recruitment information from official
  immigration decisions.
- **No nationality-based characterisation.** Country- and language-targeted
  recruitment is legitimate; describing any nationality as more reliable,
  harder-working, cheaper or more obedient is not. Candidate assessment is
  described only through experience, qualification, skills, availability, job
  fit, legal eligibility and language where relevant.
- **Employee Card content** keeps the Czech legal term `zaměstnanecká karta`
  visible at least once alongside *Cartão de empregado* / *Tarjeta de empleado*,
  and never turns general information into individual immigration advice.
- **Embassy procedure** carries *last verified* + official source, and publishes
  no appointment dates or slots as static facts.
- **Operator facts.** `trust-data.ts` keeps `companyId` and the MPSV agency
  permit gated as `unverified`. Trust pages name `TNT agency s.r.o.` and link
  ARES for independent lookup; no IČO or permit number is asserted. No invented
  licence number, government or embassy partnership, visa-authority status,
  employer name or success count. Recorded as a bounded gap.

---

## 10. Content, language and fidelity

### 10.1 Source fidelity

For the four czech-derived concepts, an **independent source inventory** is built
per concept before writing (`npm run locale:source-inventory`). Every source
fact and list item must be preserved, intentionally collapsed without meaning
loss, or explicitly excluded with a reason. Completeness is never defined by
word count or by what happened to get translated.

The 18 locale-native concepts have no Czech source; their obligation is instead
that every material claim traces to `docs/latam-worker-legal-source-audit-2026.md`.

### 10.2 Language quality

- **PT-BR** — native Brazilian Portuguese. European-Portuguese phrasing that
  reads unnaturally to Brazilians is a defect. Independent reviewer checks
  recruitment, employment and immigration vocabulary, forms, CTAs, legal/trust
  copy, grammar and natural Brazilian usage.
- **ES** — professional neutral Latin-American Spanish. No `vosotros`, no
  Spain-specific recruitment vocabulary, no Spain-specific employment
  messaging; equally not artificially Mexican, Argentine or Peruvian. *Chequia*
  and *República Checa* both used per natural Spanish usage.
- No raw machine translation ships.
- Terminology docs (`docs/ptbr-terminology.md`, `docs/es-terminology.md`) are
  **draft, not law**. Per `feedback-locale-rollout-playbook`: if independent
  writers converge on a usage the doc forbids, that is evidence the rule was
  miscalibrated — verify the substantive goal is still met, then fix the doc
  rather than rewriting the content.

### 10.3 Server-rendered, no post-load translation

Genuine static/server-rendered pages via the existing `LocalePage` engine.
Initial HTML already contains the correct `lang`, title, description, H1,
navigation, footer, article copy and form labels. Direct entry works. Content
remains readable with JavaScript disabled. No Czech-HTML-then-translate.

### 10.4 Structured data and social metadata

Only truthful types. **No `JobPosting`** on any page in this wave — none of them
is a current job satisfying its requirements. Each page carries localized title,
description, OG title, OG description, OG locale and canonical URL. No Czech
social previews.

---

## 11. Protected surfaces (§47)

Unchanged unless locale infrastructure strictly requires it, and any change
proven inert by byte-identical output:

Czech payroll calculator · German payroll calculator · Cost of Vacancy ·
privacy/URL protections · existing legal calculations · **all existing CS, EN
and DE URLs** · no existing locale migration · no `/cs/` prefix.

---

## 12. Verification

### 12.1 Build gate

`next build` (fresh) · `tsc --noEmit` · `eslint` · `vitest run` · every
`validate:*` script · every `test:mutate-*` harness · `validate:route-collisions`
· `validate:sitemap-equality` · `validate:hreflang` · `validate:cta-routing` ·
new `validate:worker-claims` · new `validate:candidate-freshness`.

Plus: byte-identical cs/en/de sitemap and page output vs. baseline; JS-off
render; Playwright E2E for both locales; responsive at **280, 320, 360, 390,
430, 768, 1024, 1280, 1440** using actual bounding boxes (header, mobile menu,
switcher, CTA, forms, tables, FAQ, legal copy, cookie banner); accessibility —
correct `html lang`, accessible language selector, localized `aria-label`s,
localized form errors, visible focus, keyboard navigation, heading hierarchy, no
CTA trapped behind the consent banner, and no English ARIA on a PT-BR/ES page.

No material failure is reclassified as debt in order to ship.

**Known pre-existing issues, not introduced here and not silently inherited:**
the `--accent` contrast defect and the closed-`.mobile-nav` focus-order defect
recorded in `docs/followup-accent-contrast.md`. New candidate chrome must not
add to either.

### 12.2 Independent review (§45)

Eight reviewers, each attempting to falsify independently:

| | Scope |
|---|---|
| A | Brazil → Czech Employee Card and consular rules |
| B | Czech economic migration programmes |
| C | Worker/legal claims |
| D | PT-BR language |
| E | Spanish LATAM language |
| F | SEO / hreflang / canonical / sitemap |
| G | Functional candidate journey |
| H | Privacy / accessibility / responsive |

#### REVIEW EXIT CONDITION

Adversarial review stops after the first full round with **no material finding in
shipped content, shipped code, or load-bearing verification infrastructure**.

A finding in tests, validators, mutation harnesses or review tooling **IS
material** if it can make a release gate vacuous, incomplete, misleading or
unable to detect a shipped defect. A gate that cannot fail is not a gate, and
discovering that fact is a finding about the release, not about the test suite.

Only **non-load-bearing** issues may become follow-ups without another round:

- comments
- wording in internal docs
- cosmetic test naming
- test-code cleanup with no effect on proof strength

Any material correction — to shipped code, to shipped content, **or to
load-bearing verification** — requires: **new SHA → affected or full proof →
another adversarial round.**

This supersedes the weaker formulation considered earlier, under which a finding
located in a validator would have been filed as a follow-up regardless of whether
it disabled a gate. `feedback-verification-proportion` still applies to
*non-load-bearing* findings: volume of proof is not the deliverable. It is not a
licence to ship past a gate that has been shown not to work.

### 12.3 Publication gate (§44)

A route ships only when **all** hold: content exists · chrome localized ·
metadata localized · CTA destination valid and audience-correct · source
fidelity passes · legal claims pass · language review passes · freshness
metadata present and within tier. No placeholder locale pages.

---

## 13. Sequence

| Phase | Work | Gate |
|---|---|---|
| P0 | Branch `feat/ptbr-es-worker-localization` from `origin/main` `2c2ca8d` | clean tree |
| P1 | Legal research → `docs/latam-worker-legal-source-audit-2026.md`; native slug + CTA review | **blocks all content** |
| P2 | Freeze `docs/locale-ptbr-es-route-matrix.md` | matrix frozen before bulk writing |
| P3 | Registry discriminated model, 5 locales, all nine hardcoded pairs generalized, validators updated | **cs/en/de output byte-identical** |
| P4 | Chrome: nav, footer, aria, switcher, discovery entry | typecheck forces completeness |
| P5 | Content corpora + page files, both locales | source fidelity + freshness metadata |
| P6 | Candidate application form + data notice | privacy controls green |
| P7 | Truth gates: worker-claims, candidate-freshness, extended cta-routing, 12 negative controls | every mutation fails the build |
| P8 | Full QA (§12.1) | no material failure carried as debt |
| P9 | Independent review A–H | §12.2 exit condition |
| P10 | Freeze SHA → push exact SHA → PR → CI → merge → verify tree identity → production verification | §50 |

Production verification covers, for both locales: direct arrival · navigation ·
candidate CTA · application · language switcher · canonical · hreflang · JS-off
content · mobile; and proves absence of: Czech chrome flash · untranslated
English candidate errors · employer-form routing from a candidate CTA · phantom
localized routes · false legal claims · form-data analytics leakage.

No other locale begins in this run. No Peru/Argentina/Mexico expansion.

---

## 14. Final report contents (§51)

Starting main SHA · final feature SHA · PR · merge SHA · production identity ·
locale registry changes · PT-BR route count · ES route count · full route matrix
· candidate concepts · legal-source audit · Brazil Employee Card model ·
unsupported claims blocked · PT-BR language review · ES language review ·
candidate application flow · privacy · canonical · hreflang · sitemap ·
structured data · responsive · accessibility · JS-off · validators · mutations ·
review matrix · remaining bounded gaps.

---

## 15. Known bounded gaps accepted at design time

1. **Operator identity** — IČO and MPSV agency permit remain `unverified`; trust
   pages assert neither and link ARES instead.
2. **Privacy Policy translation** — the PT-BR/ES candidate data notices are
   self-sufficient per §7.4 and additionally link the English canonical policy.
   Full PT-BR/ES translation of that policy is out of scope **unless** the P6
   privacy audit invokes the §7.4 escalation clause, in which case it enters
   scope and this ceases to be a gap.
3. **No vacancy layer** — no jobs route, no `JobPosting`, no live vacancy
   status, until a real source of truth exists.
4. **Pre-existing chrome a11y debt** — `docs/followup-accent-contrast.md`;
   untouched here, and not added to.
5. **No OG image.** The only image asset is `public/assets/og.svg`, and
   Facebook, WhatsApp, LinkedIn and X all reject SVG for `og:image`. The tag is
   therefore omitted rather than declared and broken. Needs a 1200×630 PNG.
6. **x-default points at the site root, not at the cluster's own primary.**
   Site-wide L0 policy, affecting 51 existing employer clusters. Correct to
   change, and changing it here would be an SEO change to the employer corpus
   made sideways.
7. **`hreflang="pt-BR"` claims Brazil only.** Deliberate — the corpus is
   Brazilian Portuguese and a bare `pt` would offer it to Portugal, where its
   vocabulary reads wrong. The cost, priced and accepted: Portuguese speakers in
   Angola and Mozambique are not claimed by the annotation, and the
   locale-native clusters carry no x-default to catch them.
8. **No `BreadcrumbList` or `dateModified` structured data** on the candidate
   pages, though both render visibly. `inLanguage` was corrected; these were
   not, and are worth a follow-up.
9. **`/contact` indexes an English title on a Czech page.** Pre-existing; the
   cluster it anchors grew from three members to five in this wave, so the
   defect is now more visible without being newly introduced.
10. **The mailto body can still exceed ~2,048 characters** at the top of the
    allowed input. Field order was changed so contact details and the consent
    record lead the message and the free-text tail is what truncates; the free
    text was capped at 600 characters. Not eliminated, bounded.
11. **The legal set is English-only for candidate locales.** Terms, Privacy and
    Cookies exist as cs/en/de static documents; candidate pages link the English
    ones and declare `hreflang="en"` so the destination language is stated
    rather than implied. The candidate data notice itself is in-language and
    self-sufficient per §7.4.

---

## 16. Amendment protocol — the frozen design is not silently rewritten

From the commit that freezes this document, no part of it is changed quietly
during implementation. Reality may force a change; concealing that it happened is
what this section forbids.

### 16.1 P1 LEGAL AUDIT AMENDMENT

If P1 legal research changes the route set or the legal model, each affected
concept is recorded as an explicit amendment carrying **all six** fields:

| Field | Meaning |
|---|---|
| Concept | registry concept id |
| Verdict | **KEEP** / **MODIFY** / **CUT** |
| Reason | what the sources did or did not support |
| Primary source | publisher · URL · effective date · access date |
| Route-count impact | PT-BR and ES deltas |
| hreflang / sitemap impact | clusters altered, sitemap total after |

Amendments are appended to
`docs/latam-worker-legal-source-audit-2026.md` and summarized to the owner at the
P1 checkpoint. A concept is never quietly dropped from the matrix, and never
quietly padded to survive.

### 16.2 Standing constraints that no amendment may relax

**43 routes is a ceiling, not a KPI.** Falling short because the sources did not
support a page is a correct outcome. Reaching it by padding is not.

- No fake vacancy routes — none, at any count.
- Healthcare stays a regulated-profession pathway, never a recruitment pitch.
- IČO and the MPSV permit stay unpublished while unverified.
- The registry stays one discriminated source of truth.
- Discovery stays separate from hreflang equivalence.
- The 90 / 180-day risk-based freshness model stands.

Any change to a constraint in §16.2 is an owner decision, not an implementation
decision.
