/**
 * L3 — the candidate tier (pt-BR, es).
 *
 * WHY A TIER OF ITS OWN
 * ─────────────────────
 * L1 is frozen: scripts/validate-l1-publication.mjs asserts the registry matches
 * l1-manifest.ts concept for concept, and that freeze is the proof the L1
 * release shipped exactly the reviewed set. L2 exists for the same reason.
 * Appending the candidate corpus to either would break a proof about a release
 * it was never part of.
 *
 * The tier is organisational only. Everything downstream — hreflang, canonicals,
 * the switcher, the sitemap, the collapse rules — reads LOCALE_CONCEPTS, which
 * this joins. There is still one registry.
 *
 * MOST OF THIS TIER IS LOCALE-NATIVE, AND THAT IS THE POINT
 * ────────────────────────────────────────────────────────
 * Five Czech pages looked like natural sources for candidate concepts. Reading
 * them settled it: /uznavani-kvalifikace-zahranicnich-pracovniku says outright
 * "Rozcestí popsané z pohledu zaměstnavatele", /zamestnanecka-karta-2026 carries
 * a "Povinnosti zaměstnavatele" section addressed to the employer, and
 * /dokumenty-pro-zamestnani-cizincu is the employer's paperwork overview. A
 * candidate's document checklist and an employer's paperwork overview name some
 * of the same papers and are not the same deliverable — clustering them would
 * declare a translation that is not one.
 *
 * Only /prava-a-povinnosti-cizincu and /kde-overit-informace-pro-cizince are
 * genuinely audience-neutral, so only those two are Czech-derived here.
 *
 * Consequence: no existing Czech page changes at all.
 *
 * Slugs are frozen by docs/locale-ptbr-es-route-matrix.md after native review.
 * Two defects were caught there and must not come back: *checo* is European
 * Portuguese (Brazilian is *tcheco*), and *sanitario* is Peninsular Spanish that
 * reads as bathroom-related across much of Latin America.
 */
import type { CzechDerivedInput, LocaleNativeInput } from './registry'
import { LOCALIZED_LOCALES, type Locale } from './locales'
import { hasLocaleContent } from './content/corpus'

/** Both candidate locales, for concepts that exist in each. */
const BOTH = ['pt-BR', 'es'] as const

const NATIVE_DECLARED: readonly Omit<LocaleNativeInput, 'published'>[] = [
  {
    id: 'candidate-home',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br', es: '/es' },
    pageType: 'hub',
    notes:
      'Candidate locale root. Deliberately NOT clustered with the Czech or English home: those sell staffing to employers, this explains lawful work to candidates. Same company, opposite intent — the case §4 forbids declaring as a translation.',
  },
  {
    id: 'work-in-czechia',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/trabalhar-na-republica-tcheca', es: '/es/trabajar-en-chequia' },
    pageType: 'hub',
    notes:
      'The candidate hub. Carries the EU–Mercosur clarification in its legal-pathway section, per the owner decision to answer that misconception without giving it a route of its own.',
  },
  {
    id: 'employee-card',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/cartao-de-empregado-tcheco', es: '/es/tarjeta-de-empleado-checa' },
    pageType: 'knowledge',
    notes:
      'Employee Card explained for the applicant. Locale-native because the Czech page is employer-framed. Slug carries -tcheco/-checa to disambiguate from Brazil\'s own Carteira de Trabalho (CTPS). "Cartão de empregado" is a descriptive gloss, not an official name — no official PT or ES term exists — so zaměstnanecká karta must appear alongside it.',
  },
  {
    id: 'documents-required',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/documentos-necessarios', es: '/es/documentos-necesarios' },
    pageType: 'knowledge',
    notes:
      'The applicant\'s document checklist. Procedural freshness: document requirements change without notice and a stale list costs a candidate a consular appointment.',
  },
  {
    id: 'qualification-recognition',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/reconhecimento-de-qualificacoes', es: '/es/reconocimiento-de-titulos' },
    pageType: 'knowledge',
    notes:
      'Degree recognition versus professional-qualification recognition — two different Czech procedures routinely confused. The Czech source is explicitly employer-POV, hence locale-native.',
  },
  {
    id: 'how-recruitment-works',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/como-funciona-o-recrutamento', es: '/es/como-funciona-el-reclutamiento' },
    pageType: 'guide',
    notes: 'What TalentPartnerID does and does not do, step by step. The secondary CTA everywhere.',
  },
  {
    id: 'before-you-travel',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/antes-de-viajar', es: '/es/antes-de-viajar' },
    pageType: 'guide',
    notes: 'Practical preparation once a permit is approved. Procedural freshness.',
  },
  {
    id: 'after-arrival',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/depois-de-chegar', es: '/es/despues-de-llegar' },
    pageType: 'guide',
    notes:
      'Registration duties, insurance and first steps. Verbal slug parallels antes-de-viajar; the nominal form read stiff in pt-BR. Procedural freshness.',
  },
  {
    id: 'life-and-work',
    primaryLocale: 'pt-BR',
    urls: {
      'pt-BR': '/pt-br/vida-e-trabalho-na-republica-tcheca',
      es: '/es/vida-y-trabajo-en-chequia',
    },
    pageType: 'knowledge',
    notes: 'Working conditions, wages in context, cost of living, what daily life is actually like.',
  },
  {
    id: 'candidate-faq',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/perguntas-frequentes', es: '/es/preguntas-frecuentes' },
    pageType: 'faq',
    notes:
      'Direct answers to the questions candidates actually ask, including the EU–Mercosur one. Every legal answer is source-backed.',
  },
  {
    id: 'candidate-apply',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/candidatar-se', es: '/es/postularme' },
    pageType: 'tool',
    notes:
      'The application. Mailto-first: the candidate attaches their own CV in their own mail client, so no CV ever reaches this site. The primary CTA of the whole corpus.',
  },
  {
    id: 'candidate-data-notice',
    primaryLocale: 'pt-BR',
    urls: {
      'pt-BR': '/pt-br/tratamento-de-dados-do-candidato',
      es: '/es/tratamiento-de-datos-del-candidato',
    },
    pageType: 'legal',
    notes:
      'Candidate-specific data-processing notice. NOT a second privacy policy and NOT a summary pointing at an English page — it stands on its own in the reader\'s language, then links the canonical policy.',
  },
  {
    id: 'work-for-engineers',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/trabalho-para-engenheiros', es: '/es/trabajar-como-ingeniero' },
    pageType: 'occupation',
    notes:
      'FLAGSHIP. CZ-ISCO 1–3, where Program vysoce kvalifikovaný zaměstnanec "není teritoriálně omezen" and is genuinely open to Brazilians — where the role, employer and class conditions are met, never for every engineer.',
  },
  {
    id: 'technical-professions',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/profissoes-tecnicas', es: '/es/profesiones-tecnicas' },
    pageType: 'occupation',
    notes:
      'Straddles the CZ-ISCO boundary and must say so: maintenance and automation technicians may reach class 3 (programme open), CNC and welding sit at 7–8 (no programme route for Brazilians).',
  },
  {
    id: 'work-in-manufacturing',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/trabalho-na-industria', es: '/es/trabajar-en-la-industria' },
    pageType: 'occupation',
    notes:
      'CZ-ISCO 4–8. Brazil is NOT among the thirteen countries in Program kvalifikovaný zaměstnanec, so the only route is the standard Employee Card against a registered vacancy. Informational slug: there is no vacancy source, so no URL may promise openings.',
  },
  {
    id: 'work-in-logistics',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/trabalho-em-logistica', es: '/es/trabajar-en-logistica' },
    pageType: 'occupation',
    notes:
      'Weakest legal footing in the corpus: CZ-ISCO 8–9, and class 9 falls outside even the qualified programme\'s 4–8 range. Retained only because the owner confirmed real recruitment demand. An honest account of a hard route, never an invitation.',
  },
  {
    id: 'healthcare-regulated-professions',
    primaryLocale: 'pt-BR',
    urls: {
      'pt-BR': '/pt-br/profissoes-de-saude-regulamentadas',
      es: '/es/profesiones-de-la-salud-reguladas',
    },
    pageType: 'knowledge',
    notes:
      'A regulated-profession pathway, never a recruitment pitch. Immigration is the easier half (ISCO 2–3 reaches the open programme); the binding constraint is the practice licence under Acts 95/2004 §34 and 96/2004. Slug carries "regulamentadas"/"reguladas" so the URL itself does not imply ordinary recruitment.',
  },
  {
    id: 'brazil-consular-route',
    primaryLocale: 'pt-BR',
    urls: { 'pt-BR': '/pt-br/embaixada-e-consulado-tchecos-no-brasil' },
    pageType: 'region',
    notes:
      'PT-BR only, per §32: Czech consular procedure for Brazil must never be generalised to Peru, Argentina or Mexico. Single-member cluster — no alternates, no x-default. Names the Embassy in Brasília and the Consulate General in São Paulo separately, because sending a candidate to the wrong one is the expensive mistake this page exists to prevent.',
  },
]

const CZECH_DERIVED_DECLARED: readonly Omit<CzechDerivedInput, 'published'>[] = [
  {
    id: 'worker-rights',
    csPrimary: '/prava-a-povinnosti-cizincu',
    audience: 'shared',
    urls: { 'pt-BR': '/pt-br/direitos-do-trabalhador', es: '/es/derechos-del-trabajador' },
    pageType: 'knowledge',
    notes:
      'Genuinely audience-neutral: "Jaká práva má cizinec jako zaměstnanec", with sections on rights at work, residence obligations and where to seek help. An employer and a candidate want the same page here, so this one legitimately clusters.',
  },
  {
    id: 'verify-official-info',
    csPrimary: '/kde-overit-informace-pro-cizince',
    audience: 'shared',
    urls: {
      'pt-BR': '/pt-br/onde-verificar-informacoes-oficiais',
      es: '/es/donde-verificar-informacion-oficial',
    },
    pageType: 'reference',
    notes:
      'A directory of official institutions — identical utility to both audiences, so it clusters. Slug keeps the Czech concept\'s locational sense (Kde ověřit = WHERE to verify).',
  },
]

const publishedFor = (
  urls: Readonly<Partial<Record<string, string>>>,
  base: readonly Locale[],
  id: string,
): readonly Locale[] => {
  const out: Locale[] = [...base]
  for (const locale of LOCALIZED_LOCALES) {
    if (urls[locale] && hasLocaleContent(id, locale)) out.push(locale)
  }
  return out
}

/**
 * Publication is DERIVED from content existence, never declared.
 *
 * Same rule as L1 and L2, for the same reason: a hand-maintained flag is how a
 * sitemap ends up advertising a 404. The route file existing is a SECOND,
 * independent condition checked against the filesystem by
 * validate-l1-publication.mjs — if the two disagree, one is wrong and the gate
 * says so.
 */
export const CANDIDATE_NATIVE_CONCEPTS: readonly LocaleNativeInput[] = NATIVE_DECLARED.map((c) => ({
  ...c,
  published: publishedFor(c.urls, [], c.id),
}))

export const CANDIDATE_CZECH_DERIVED_CONCEPTS: readonly CzechDerivedInput[] =
  CZECH_DERIVED_DECLARED.map((c) => ({
    ...c,
    published: publishedFor(c.urls, ['cs'], c.id),
  }))

/** Concepts in the candidate tier that exist in both candidate locales. */
export const CANDIDATE_BOTH_LOCALES = BOTH
