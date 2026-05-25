// Aggregated registry of all SeoArticle-driven SEO pages, grouped by tier so
// the sitemap helper and any future index page can reason about priority.

import type { SeoPage } from '../seo-page'
import { CORNERSTONE_PAGES } from './cornerstone'
import { SUPPORT_PAGES } from './support'
import { GEO_PAGES } from './geo'
import { EMPLOYER_INTELLIGENCE_PAGES } from './employer-intelligence'
import { REGION_PAGES } from './regions'

export * from './cornerstone'
export * from './support'
export * from './geo'
export * from './employer-intelligence'
export * from './regions'

export const SEO_PAGE_TIERS = {
  cornerstone: CORNERSTONE_PAGES,
  support: SUPPORT_PAGES,
  geo: GEO_PAGES,
  employerIntelligence: [...EMPLOYER_INTELLIGENCE_PAGES, ...REGION_PAGES],
} as const

export const SEO_PAGES: ReadonlyArray<SeoPage> = [
  ...CORNERSTONE_PAGES,
  ...SUPPORT_PAGES,
  ...GEO_PAGES,
  ...EMPLOYER_INTELLIGENCE_PAGES,
  ...REGION_PAGES,
]

export const findSeoPage = (slug: string): SeoPage | undefined =>
  SEO_PAGES.find((p) => p.slug === slug)
