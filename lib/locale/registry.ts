// Locale pilot registry — PREPARATION ONLY.
//
// Nothing in this file creates a route. It is a plan that a validator can check
// and that a later wave can execute from, so that when the first localized URL
// does exist it is already deterministic, already mapped, and already reversible.
//
// ARCHITECTURE (Strategy B, owner-approved):
//   Czech keeps every existing URL, unprefixed and unchanged. English and German
//   arrive at /en/... and /de/... alongside it. There is no /cs/, no /cs-cz/, and
//   no redirect of any Czech URL — the Czech corpus keeps its URL equity and its
//   Search Console history, which is the whole reason Strategy B was chosen over
//   prefixing everything.
//
// STATE: every entry below is NOT_STARTED and indexingEligible = false. No
// translation exists, and no human has reviewed one. That is the honest state and
// scripts/validate-locale-registry.mjs enforces that it cannot be overstated:
// indexing eligibility requires an APPROVED translation AND a completed editorial
// review AND, where flagged, a completed legal review.
//
// SLUGS ARE A CONTRACT, NOT AN OUTPUT.
// Every localized path below is a hand-written, owner-approved literal. They must
// never be generated at build time from a translation dictionary or a model:
// a slug that can regenerate is a slug that can silently change, and a changed
// slug after publication is a broken URL plus a redirect on a page Google has
// already indexed. Once published, treat a localized slug as fixed — changing one
// is a migration decision, not an edit. This file therefore imports nothing, and
// the gate asserts both that it imports nothing and that every futureRoute is a
// plain string literal rather than an expression.

export const LOCALES = ['cs', 'en', 'de'] as const
export type Locale = (typeof LOCALES)[number]

/** Czech is served unprefixed — the reason this whole architecture is low-risk. */
export const LOCALE_PREFIX: Readonly<Record<Locale, string>> = {
  cs: '',
  en: '/en',
  de: '/de',
}

/** hreflang value emitted for each locale, once a real page exists. */
export const LOCALE_HREFLANG: Readonly<Record<Locale, string>> = {
  cs: 'cs-CZ',
  en: 'en',
  de: 'de',
}

/**
 * Market is NOT language. Every pilot page describes the Czech market and Czech
 * employment context, whichever language it is written in. A German-language page
 * about hiring in Czechia is not a Germany-targeted service page, and mislabelling
 * it as one would be a legal-context error, not just an SEO one.
 */
export const PILOT_MARKET = 'cz'

export type TranslationStatus =
  | 'NOT_STARTED'
  | 'MACHINE_DRAFT'
  | 'EDITORIAL_REVIEW_PENDING'
  | 'APPROVED'
  | 'PUBLISHED'

export type ReviewStatus = 'NOT_REQUIRED' | 'PENDING' | 'COMPLETE'

export type PilotStatus = 'PLANNED' | 'IN_PROGRESS' | 'READY' | 'PUBLISHED' | 'ROLLED_BACK'

export type CanonicalPolicy = 'SELF'

/**
 * Owner approval of the pilot itself — the route set and the URL policy — as
 * distinct from approval of any translation. Recorded as data so a later wave can
 * tell "the owner chose these twelve routes and these slugs" apart from "someone
 * added a route to the list". Adding a route without approval is a gate failure.
 */
export const PILOT_APPROVAL = {
  approvedOn: '2026-08-17',
  approvedBy: 'repository owner',
  urlPolicy: 'TRANSLATED_SLUGS',
  /** Slugs are hand-written and owner-approved; never generated at build time. */
  slugsAreGenerated: false,
  /** After publication a localized slug is a stable SEO contract. */
  slugStabilityContract: true,
  note: 'Eleven routes approved in the L0 decision message; /pracovnici-pro-vyrobu approved as the twelfth on the measured evidence recorded in its rationale.',
} as const

export interface LocaleTarget {
  locale: Exclude<Locale, 'cs'>
  /** The URL this page WILL have. Nothing serves it yet. */
  futureRoute: string
  translationStatus: TranslationStatus
  editorialReviewStatus: ReviewStatus
  /** Only ever 'SELF'. An EN/DE page canonicalising to Czech would un-index it. */
  canonicalPolicy: CanonicalPolicy
  /** Gate for build, sitemap, hreflang and internal links. */
  indexingEligible: boolean
  pilotStatus: PilotStatus
}

export interface PilotEntry {
  /** Existing Czech canonical route. Never changes. */
  sourceRoute: string
  /** Explicitly approved by the owner for the pilot. No route enters without it. */
  ownerApproved: true
  /** Groups the CS/EN/DE versions of one page for hreflang. */
  hreflangGroup: string
  contentOwner: string
  intent: string
  cluster: string
  commercialIntent: 'high' | 'medium' | 'low'
  /** True where the page states a statutory or contractual rule. */
  legalReviewRequired: boolean
  legalReviewStatus: ReviewStatus
  targets: LocaleTarget[]
  /** Why this page is in the pilot at all. */
  rationale: string
}

const target = (
  locale: 'en' | 'de',
  futureRoute: string,
): LocaleTarget => ({
  locale,
  futureRoute,
  translationStatus: 'NOT_STARTED',
  editorialReviewStatus: 'PENDING',
  canonicalPolicy: 'SELF',
  indexingEligible: false,
  pilotStatus: 'PLANNED',
})

/**
 * The 12-page pilot.
 *
 * Eleven routes are the owner-approved set. The twelfth, /pracovnici-pro-vyrobu,
 * was selected from measurement rather than preference: it carries 35 unique
 * contextual inbound sources across 5 source clusters — the highest authority of
 * any industry page — has high commercial intent and an existing request path,
 * and it fills the only Tier A cluster the approved eleven leave unrepresented.
 */
export const LOCALE_PILOT: readonly PilotEntry[] = [
  {
    sourceRoute: '/',
    ownerApproved: true,
    hreflangGroup: 'home',
    contentOwner: 'pages/index.tsx',
    intent: 'Brand entry and service overview',
    cluster: 'homepage',
    commercialIntent: 'medium',
    legalReviewRequired: false,
    legalReviewStatus: 'NOT_REQUIRED',
    targets: [target('en', '/en'), target('de', '/de')],
    rationale: 'Locale root. Without it an EN/DE visitor has no entry point and the internal link graph for the locale has no origin.',
  },
  {
    sourceRoute: '/pro-zamestnavatele',
    ownerApproved: true,
    hreflangGroup: 'employer-hub',
    contentOwner: 'pages/pro-zamestnavatele.tsx',
    intent: 'Employer hub — routes to every commercial path',
    cluster: 'knowledge',
    commercialIntent: 'high',
    legalReviewRequired: false,
    legalReviewStatus: 'NOT_REQUIRED',
    targets: [target('en', '/en/for-employers'), target('de', '/de/fuer-arbeitgeber')],
    rationale: 'Tier 1 hub with 19 internal links. The locale corpus needs its own hub or every localized page is an island.',
  },
  {
    sourceRoute: '/poptavka-pracovniku',
    ownerApproved: true,
    hreflangGroup: 'employer-request',
    contentOwner: 'pages/poptavka-pracovniku.tsx',
    intent: 'Structured 25-field staffing request',
    cluster: 'request',
    commercialIntent: 'high',
    legalReviewRequired: true,
    legalReviewStatus: 'PENDING',
    targets: [target('en', '/en/request-workers'), target('de', '/de/personal-anfragen')],
    rationale: 'The conversion endpoint. A localized corpus that routes to a Czech-only form converts badly. Legal review required: the form carries a consent statement and a data-handling disclosure.',
  },
  {
    sourceRoute: '/kalkulacka-mzdy-agenturniho-zamestnance',
    ownerApproved: true,
    hreflangGroup: 'payroll-calculator',
    contentOwner: 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx',
    intent: 'Agency payroll cost calculator',
    cluster: 'calculator',
    commercialIntent: 'high',
    legalReviewRequired: true,
    legalReviewStatus: 'PENDING',
    targets: [target('en', '/en/agency-worker-payroll-calculator'), target('de', '/de/lohnrechner-zeitarbeit')],
    rationale: 'Highest-value decision aid. Legal review is mandatory: it applies real Czech statutory rates, so the EN/DE versions must state the Czech jurisdiction explicitly or they read as German/UK payroll guidance.',
  },
  {
    sourceRoute: '/nabor-odbornych-pozic',
    ownerApproved: true,
    hreflangGroup: 'specialist-recruitment',
    contentOwner: 'lib/content/pages/professional-recruitment.ts',
    intent: 'Specialist/professional recruitment hub',
    cluster: 'technical_talent',
    commercialIntent: 'high',
    legalReviewRequired: false,
    legalReviewStatus: 'NOT_REQUIRED',
    targets: [target('en', '/en/specialist-recruitment'), target('de', '/de/fachkraefte-recruiting')],
    rationale: 'Cluster hub for high-skilled recruitment — the service line most likely to attract non-Czech employer search.',
  },
  {
    sourceRoute: '/nabor-techniku-automatizace',
    ownerApproved: true,
    hreflangGroup: 'automation-technicians',
    contentOwner: 'lib/content/pages/technical-talent.ts',
    intent: 'Automation and PLC technician recruitment',
    cluster: 'technical_talent',
    commercialIntent: 'high',
    legalReviewRequired: false,
    legalReviewStatus: 'NOT_REQUIRED',
    targets: [target('en', '/en/automation-technician-recruitment'), target('de', '/de/automatisierungstechniker-recruiting')],
    rationale: 'Concrete technical role with international vocabulary (PLC, SCADA) — the clearest test of whether localized technical pages attract query traffic.',
  },
  {
    sourceRoute: '/technicti-inzenyri',
    ownerApproved: true,
    hreflangGroup: 'engineering-roles',
    contentOwner: 'lib/content/pages/professional-recruitment.ts',
    intent: 'Engineering role families and what the title hides',
    cluster: 'technical_talent',
    commercialIntent: 'high',
    legalReviewRequired: false,
    legalReviewStatus: 'NOT_REQUIRED',
    targets: [target('en', '/en/engineering-roles'), target('de', '/de/technische-ingenieure')],
    rationale: 'Umbrella engineering page. Its argument — that the job title alone tells you nothing — survives translation without needing Czech legal context.',
  },
  {
    sourceRoute: '/proc-se-nedari-obsadit-odbornou-pozici',
    ownerApproved: true,
    hreflangGroup: 'hard-to-fill',
    contentOwner: 'lib/content/pages/professional-recruitment.ts',
    intent: 'Diagnosis of a hard-to-fill specialist role',
    cluster: 'technical_talent',
    commercialIntent: 'high',
    legalReviewRequired: false,
    legalReviewStatus: 'NOT_REQUIRED',
    targets: [target('en', '/en/hard-to-fill-specialist-roles'), target('de', '/de/schwer-besetzbare-fachpositionen')],
    rationale: 'Problem-first entry point. An employer searching in English or German for why a role will not fill is expressing the same intent as the Czech reader.',
  },
  {
    sourceRoute: '/cena-neobsazene-pozice',
    ownerApproved: true,
    hreflangGroup: 'cost-of-vacancy',
    contentOwner: 'lib/content/pages/employer-operations.ts',
    intent: 'Vacancy cost — explanation and calculation tool',
    cluster: 'knowledge',
    commercialIntent: 'medium',
    legalReviewRequired: false,
    legalReviewStatus: 'NOT_REQUIRED',
    targets: [target('en', '/en/cost-of-vacancy'), target('de', '/de/kosten-einer-unbesetzten-stelle')],
    rationale: 'Carries a decision tool whose CS/EN/DE copy already exists and is parity-tested (PR #36), so its translation risk is the lowest in the pilot.',
  },
  {
    sourceRoute: '/pracovnici-pro-vyrobu',
    ownerApproved: true,
    hreflangGroup: 'production-workers',
    contentOwner: 'lib/content/pages/industries.ts',
    intent: 'Production staffing — core volume service',
    cluster: 'industry',
    commercialIntent: 'high',
    legalReviewRequired: false,
    legalReviewStatus: 'NOT_REQUIRED',
    targets: [target('en', '/en/production-workers'), target('de', '/de/produktionsmitarbeiter')],
    rationale: 'THE TWELFTH, SELECTED BY MEASUREMENT: 35 unique contextual inbound sources across 5 source clusters — the highest-authority industry page in the corpus — high commercial intent, an existing request path, and the only Tier A cluster missing from the approved eleven.',
  },
  {
    sourceRoute: '/o-nas',
    ownerApproved: true,
    hreflangGroup: 'about',
    contentOwner: 'pages/o-nas.tsx',
    intent: 'Operator identity and verifiable company record',
    cluster: 'trust',
    commercialIntent: 'low',
    legalReviewRequired: true,
    legalReviewStatus: 'PENDING',
    targets: [target('en', '/en/about'), target('de', '/de/ueber-uns')],
    rationale: 'Trust dependency. A localized commercial page with no localized trust page behind it converts badly. Legal review required: it states company registration and permit facts that must not drift in translation.',
  },
  {
    sourceRoute: '/redakcni-zasady',
    ownerApproved: true,
    hreflangGroup: 'editorial-standards',
    contentOwner: 'pages/redakcni-zasady.tsx',
    intent: 'Editorial standards and sourcing policy',
    cluster: 'trust',
    commercialIntent: 'low',
    legalReviewRequired: false,
    legalReviewStatus: 'NOT_REQUIRED',
    targets: [target('en', '/en/editorial-standards'), target('de', '/de/redaktionelle-standards')],
    rationale: 'Every article cites it as its editorial authority. Localized articles pointing at a Czech-only standards page weaken the E-E-A-T chain they depend on.',
  },
]

// ── Derived helpers (no side effects, no routes) ─────────────────────────────

export const futureRoutes = (): string[] =>
  LOCALE_PILOT.flatMap((e) => e.targets.map((t) => t.futureRoute))

export const sourceRoutes = (): string[] => LOCALE_PILOT.map((e) => e.sourceRoute)

/** Locale of any route, derived from the pathname alone — never from a header. */
export function localeOf(pathname: string): Locale {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de'
  return 'cs'
}

/**
 * The alternates a page may declare. Deliberately returns ONLY published,
 * indexable siblings: an hreflang pointing at a page that does not yet exist is
 * the exact defect PR #34 removed from this codebase, and it must not return via
 * the locale programme.
 */
export function publishedAlternates(group: string): Array<{ hreflang: string; route: string }> {
  const entry = LOCALE_PILOT.find((e) => e.hreflangGroup === group)
  if (!entry) return []
  const live = entry.targets.filter(
    (t) => t.indexingEligible && t.pilotStatus === 'PUBLISHED',
  )
  // The Czech source is only listed once at least one sibling is live; a set of
  // one is not a set, and a lone self-referencing alternate says nothing.
  if (!live.length) return []
  return [
    { hreflang: LOCALE_HREFLANG.cs, route: entry.sourceRoute },
    ...live.map((t) => ({ hreflang: LOCALE_HREFLANG[t.locale], route: t.futureRoute })),
  ]
}

/** A future route may enter build/sitemap/links only when all gates are met. */
export function isPublishable(entry: PilotEntry, t: LocaleTarget): boolean {
  if (!['APPROVED', 'PUBLISHED'].includes(t.translationStatus)) return false
  if (t.editorialReviewStatus !== 'COMPLETE') return false
  if (entry.legalReviewRequired && entry.legalReviewStatus !== 'COMPLETE') return false
  return true
}
