// Aggregated registry of all SeoArticle-driven SEO pages, grouped by tier so
// the sitemap helper and any future index page can reason about priority.

import type { SeoPage } from '../seo-page'
import { CORNERSTONE_PAGES } from './cornerstone'
import { SUPPORT_PAGES } from './support'
import { GEO_PAGES } from './geo'
import { EMPLOYER_INTELLIGENCE_PAGES } from './employer-intelligence'
import { REGION_PAGES } from './regions'
import { FOREIGN_WORKER_PAGES } from './foreign-workers'
import { EMPLOYER_OPERATIONS_PAGES } from './employer-operations'
import { INDUSTRY_RECRUITMENT_PAGES } from './industry-recruitment'
import { CITY_RECRUITMENT_PAGES } from './city-recruitment'

export * from './cornerstone'
export * from './support'
export * from './geo'
export * from './employer-intelligence'
export * from './regions'
export * from './foreign-workers'
export * from './employer-operations'
export * from './industry-recruitment'
export * from './city-recruitment'

export const SEO_PAGE_TIERS = {
  cornerstone: CORNERSTONE_PAGES,
  support: SUPPORT_PAGES,
  geo: GEO_PAGES,
  employerIntelligence: [...EMPLOYER_INTELLIGENCE_PAGES, ...REGION_PAGES],
  foreignWorkers: FOREIGN_WORKER_PAGES,
  employerOperations: EMPLOYER_OPERATIONS_PAGES,
  industryRecruitment: INDUSTRY_RECRUITMENT_PAGES,
  cityRecruitment: CITY_RECRUITMENT_PAGES,
} as const

// ── Phase D7: guaranteed conversion path ────────────────────────────────
//
// Every employer-facing page must be able to reach the two operational tools:
// the payroll calculator (so cost questions are answered by the shared engine
// rather than by duplicated formulas on SEO pages, per D5/D6) and the staffing
// request form. Applying this centrally — rather than hand-editing 133 page
// objects — means the invariant also holds for pages added later, and it is
// enforced by lib/content/content-quality.test.ts.

const CALCULATOR_LINK = {
  href: '/kalkulacka-mzdy-agenturniho-zamestnance',
  label: 'Kalkulačka mzdových nákladů zaměstnance',
}
const REQUEST_LINK = {
  href: '/poptavka-pracovniku',
  label: 'Poptávka pracovníků: zadat požadavek',
}

const hasLink = (page: SeoPage, href: string): boolean =>
  (page.internalLinks ?? []).some((l) => l.href.split('?')[0] === href) ||
  (page.cta?.href ?? '').split('?')[0] === href

/** Appends the conversion links to a page when they are not already present. */
const withConversionPath = (page: SeoPage): SeoPage => {
  const additions = [CALCULATOR_LINK, REQUEST_LINK]
    .filter((l) => !hasLink(page, l.href))
    // A page must never link to itself.
    .filter((l) => l.href !== `/${page.slug}`)
  if (additions.length === 0) return page
  return { ...page, internalLinks: [...(page.internalLinks ?? []), ...additions] }
}

export const SEO_PAGES: ReadonlyArray<SeoPage> = [
  ...CORNERSTONE_PAGES,
  ...SUPPORT_PAGES,
  ...GEO_PAGES,
  ...EMPLOYER_INTELLIGENCE_PAGES,
  ...REGION_PAGES,
  ...FOREIGN_WORKER_PAGES,
  ...EMPLOYER_OPERATIONS_PAGES,
  ...INDUSTRY_RECRUITMENT_PAGES,
  ...CITY_RECRUITMENT_PAGES,
].map(withConversionPath)

export const findSeoPage = (slug: string): SeoPage | undefined =>
  SEO_PAGES.find((p) => p.slug === slug)
