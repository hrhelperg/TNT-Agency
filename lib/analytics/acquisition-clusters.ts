// Acquisition-cluster classification (Wave 2D).
//
// ── WHAT THIS IS, AND WHAT IT DELIBERATELY IS NOT ────────────────────────────
//
// Wave 2 does not measure completed mailto delivery. WebmasterID currently
// measures page/navigation activity using its existing tracker. Employer intent
// is inferred from canonical pathname classification; no additional form or
// visitor data is transmitted.
//
// This module adds NO browser telemetry. It transmits nothing, imports no
// tracker, and runs no client code. It is a pure, deterministic function from a
// canonical pathname — a value the WebmasterID bundle already sends as part of
// its fixed payload — to a cluster label, so that an eventual export can be
// grouped by acquisition cluster offline.
//
// The integration constraints that forced this design were read from the
// vendor bundle behaviour documented in ./webmasterid.ts, not assumed:
//   * the payload is fixed (site_id, timestamp, language, user_agent,
//     screen_width, anonymous_session_id, anonymous_visitor_id, event_name,
//     url, pathname, referrer, title) — there is no custom-dimension API;
//   * mailto: clicks are never transmitted, and the entire lead flow is mailto,
//     so there is no click event to enrich;
//   * form events fire only for an element carrying data-wmid-form. The owner
//     decision for this Wave was explicitly NOT to add that attribute.
//
// Consequently nothing here may be called a lead or a conversion. A visit to
// /poptavka-pracovniku is REQUEST-PAGE ENTRY — commercial-intent navigation,
// not a verified request. Delivery of a mailto message cannot be observed by
// this site, so it is never claimed.
//
// ── DERIVED FROM REPOSITORY TRUTH ───────────────────────────────────────────
//
// Cluster membership is derived from the content registries and the growth
// cohorts, not from a hand-maintained duplicate list that would drift the first
// time a page moved between registries. Only the small set of routes that have
// no registry entry (homepage, calculator, request page, marketplace and legal
// utilities) is named explicitly.

import { SEO_PAGE_TIERS } from '../content/pages'

/** Stable classification version. Bump when the taxonomy itself changes. */
export const CLASSIFICATION_VERSION = '2026-08-15.1'

export const ACQUISITION_CLUSTERS = [
  'technical_talent',
  'employer_problem',
  'knowledge',
  'industry',
  'region',
  'foreign_workers',
  'calculator',
  'homepage',
  'request',
  'trust',
  'other',
] as const

export type AcquisitionCluster = (typeof ACQUISITION_CLUSTERS)[number]

export const PAGE_TYPES = ['hub', 'profession', 'problem', 'knowledge', 'industry', 'region', 'legal', 'tool', 'utility'] as const
export type PageType = (typeof PAGE_TYPES)[number]

export const FUNNEL_STAGES = ['awareness', 'consideration', 'decision', 'action'] as const
export type FunnelStage = (typeof FUNNEL_STAGES)[number]

export const COMMERCIAL_INTENT = ['high', 'medium', 'low', 'none'] as const
export type CommercialIntent = (typeof COMMERCIAL_INTENT)[number]

export interface RouteClassification {
  route: string
  cluster: AcquisitionCluster
  pageType: PageType
  funnelStage: FunnelStage
  commercialIntent: CommercialIntent
}

const slugsOf = (pages: ReadonlyArray<{ slug: string }>): string[] => pages.map((p) => p.slug)

/** A classification without the route, which classifyRoute fills in. */
type Classification = Omit<RouteClassification, 'route'>

/** Routes with no registry entry. Kept short and explicit on purpose. */
const EXPLICIT: Readonly<Record<string, Classification>> = {
  '/': { cluster: 'homepage', pageType: 'hub', funnelStage: 'awareness', commercialIntent: 'medium' },
  '/poptavka-pracovniku': { cluster: 'request', pageType: 'tool', funnelStage: 'action', commercialIntent: 'high' },
  '/kalkulacka-mzdy-agenturniho-zamestnance': { cluster: 'calculator', pageType: 'tool', funnelStage: 'decision', commercialIntent: 'high' },
  '/contact': { cluster: 'request', pageType: 'utility', funnelStage: 'action', commercialIntent: 'high' },
  '/o-nas': { cluster: 'trust', pageType: 'utility', funnelStage: 'consideration', commercialIntent: 'medium' },
  '/redakcni-zasady': { cluster: 'trust', pageType: 'utility', funnelStage: 'awareness', commercialIntent: 'none' },
  '/agencies': { cluster: 'knowledge', pageType: 'hub', funnelStage: 'consideration', commercialIntent: 'medium' },
  '/offers': { cluster: 'other', pageType: 'utility', funnelStage: 'awareness', commercialIntent: 'low' },
  '/submit-agency': { cluster: 'other', pageType: 'utility', funnelStage: 'action', commercialIntent: 'low' },
  '/submit-offer': { cluster: 'other', pageType: 'utility', funnelStage: 'action', commercialIntent: 'medium' },
  '/privacy-policy': { cluster: 'other', pageType: 'legal', funnelStage: 'awareness', commercialIntent: 'none' },
}

/** Registry-derived membership sets, computed once. */
const technicalTalent = new Set([
  ...slugsOf(SEO_PAGE_TIERS.professionalRecruitment),
  ...slugsOf(SEO_PAGE_TIERS.technicalTalent),
])
const employerProblems = new Set(slugsOf(SEO_PAGE_TIERS.employerProblems))
const employerKnowledge = new Set(slugsOf(SEO_PAGE_TIERS.employerKnowledge))
const industry = new Set(slugsOf(SEO_PAGE_TIERS.industryRecruitment))
const region = new Set([...slugsOf(SEO_PAGE_TIERS.cityRecruitment), ...slugsOf(SEO_PAGE_TIERS.employerIntelligence), ...slugsOf(SEO_PAGE_TIERS.geo)])
const foreign = new Set(slugsOf(SEO_PAGE_TIERS.foreignWorkers))
const operations = new Set(slugsOf(SEO_PAGE_TIERS.employerOperations))
const cornerstone = new Set([...slugsOf(SEO_PAGE_TIERS.cornerstone), ...slugsOf(SEO_PAGE_TIERS.support)])

/** Employer-operations slugs that are situational problems rather than guides. */
const PROBLEM_PREFIXES = ['nedostatek-pracovniku', 'fluktuace', 'priciny-fluktuace', 'jak-snizit-fluktuaci']

/**
 * Foreign-worker topics that live in the cornerstone/support registries for
 * historical reasons. Registry membership is the default signal, but it records
 * where a page was WRITTEN, not what an employer came looking for — and
 * /zamestnanecka-karta-2026 or /pracovni-povoleni-cr are foreign-worker intent
 * whichever file they sit in. Matching on topic keeps the cluster honest.
 */
const FOREIGN_TOPIC = /cizinc|zahranicni|zamestnanecka-karta|modra-karta|pracovni-povoleni|legalizace-prace|dokumenty-pro-zamestnani/

/**
 * Classifies a canonical pathname. Deterministic and total: every input yields
 * a classification, and anything unrecognised is explicitly 'other' rather than
 * silently dropped.
 */
export function classifyRoute(pathname: string): RouteClassification {
  const route = normalizeRoute(pathname)
  const explicit = EXPLICIT[route]
  if (explicit) return { ...explicit, route }

  const slug = route.replace(/^\//, '')

  if (technicalTalent.has(slug)) {
    return { route, cluster: 'technical_talent', pageType: slug === 'nabor-odbornych-pozic' ? 'hub' : 'profession', funnelStage: 'consideration', commercialIntent: 'high' }
  }
  if (employerProblems.has(slug)) {
    return { route, cluster: 'employer_problem', pageType: 'problem', funnelStage: 'consideration', commercialIntent: 'high' }
  }
  if (employerKnowledge.has(slug)) {
    return { route, cluster: 'knowledge', pageType: 'knowledge', funnelStage: 'consideration', commercialIntent: 'medium' }
  }
  if (foreign.has(slug)) {
    return { route, cluster: 'foreign_workers', pageType: 'knowledge', funnelStage: 'awareness', commercialIntent: 'medium' }
  }
  if (industry.has(slug)) {
    return { route, cluster: 'industry', pageType: 'industry', funnelStage: 'consideration', commercialIntent: 'high' }
  }
  if (region.has(slug)) {
    return { route, cluster: 'region', pageType: 'region', funnelStage: 'awareness', commercialIntent: 'medium' }
  }
  if (operations.has(slug)) {
    const isProblem = PROBLEM_PREFIXES.some((p) => slug.startsWith(p))
    return {
      route,
      cluster: isProblem ? 'employer_problem' : 'knowledge',
      pageType: slug === 'pro-zamestnavatele' ? 'hub' : isProblem ? 'problem' : 'knowledge',
      funnelStage: 'consideration',
      commercialIntent: slug === 'pro-zamestnavatele' ? 'high' : 'medium',
    }
  }
  if (cornerstone.has(slug)) {
    const isForeign = FOREIGN_TOPIC.test(slug)
    return {
      route,
      cluster: isForeign ? 'foreign_workers' : 'knowledge',
      pageType: 'knowledge',
      funnelStage: 'awareness',
      commercialIntent: 'medium',
    }
  }
  // Bespoke .tsx content pages that predate the registries and therefore have no
  // registry entry. /zamestnavani-cizincu in particular is a cornerstone page
  // (51 contextual inbound links at baseline) and must not sit in "other".
  if (FOREIGN_TOPIC.test(slug)) {
    return { route, cluster: 'foreign_workers', pageType: 'knowledge', funnelStage: 'awareness', commercialIntent: 'medium' }
  }
  if (/^socialni-zdravotni-dane|^minimalni-mzda|^naklady-na-zamestnance-cr$/.test(slug)) {
    return { route, cluster: 'knowledge', pageType: 'knowledge', funnelStage: 'awareness', commercialIntent: 'medium' }
  }
  if (/\.html$/.test(slug)) {
    return { route, cluster: 'other', pageType: /blog\//.test(slug) ? 'knowledge' : 'legal', funnelStage: 'awareness', commercialIntent: 'none' }
  }
  return { route, cluster: 'other', pageType: 'utility', funnelStage: 'awareness', commercialIntent: 'none' }
}

/**
 * Normalises a pathname to the canonical route form used across the site:
 * query and fragment removed, trailing slash removed except for the root.
 * A full URL is accepted so an export column can be passed in unchanged.
 */
export function normalizeRoute(input: string): string {
  let p = (input || '').trim()
  if (!p) return '/'
  if (/^https?:\/\//i.test(p)) {
    try {
      p = new URL(p).pathname
    } catch {
      /* fall through and treat as a path */
    }
  }
  p = p.split('#')[0].split('?')[0]
  if (!p.startsWith('/')) p = `/${p}`
  if (p.length > 1 && p.endsWith('/')) p = p.replace(/\/+$/, '')
  return p || '/'
}

/** Every cluster present in the classification of a set of routes. */
export function summariseByCluster(routes: readonly string[]): Record<AcquisitionCluster, number> {
  const out = Object.fromEntries(ACQUISITION_CLUSTERS.map((c) => [c, 0])) as Record<AcquisitionCluster, number>
  for (const r of routes) out[classifyRoute(r).cluster]++
  return out
}
