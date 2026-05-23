// Presentation model for full SEO content pages.
//
// A SeoPage reuses the structured ArticleData shape (so validateArticle and the
// existing generators apply unchanged) and adds the small amount of
// presentation metadata a standalone page needs: a hero eyebrow + subtitle, a
// breadcrumb label, and a call-to-action block. No prose lives here — every
// page's body, FAQ and sources come from its structured data, which keeps each
// page unique and lets the quality checks run against real content.

import type { ArticleData } from './types'
import { SITE } from './rules'

export interface SeoPageCTA {
  eyebrow?: string
  title: string
  text: string
  buttonLabel: string
  href: string
}

export interface SeoPage extends ArticleData {
  /** Short label shown above the H1 (e.g. "Pracovní právo · Cizinci"). */
  eyebrow: string
  /** One- or two-sentence summary rendered under the H1. */
  heroSubtitle: string
  /** Current-page label for the breadcrumb trail. */
  breadcrumbLabel: string
  /** Closing call to action. */
  cta: SeoPageCTA
  /** Show the in-page table of contents sidebar (default: when >= 3 sections). */
  showToc?: boolean
}

/** Stable, accent-free anchor id derived from a section heading. */
export const slugifyHeading = (heading: string): string =>
  heading
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** Absolute canonical URL for a page slug. */
export const pageUrl = (slug: string): string => `${SITE.baseUrl}/${slug}`

/** Breadcrumb JSON-LD: Domů → page. */
export const buildBreadcrumbSchema = (page: SeoPage): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Domů',
      item: `${SITE.baseUrl}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: page.breadcrumbLabel,
      item: pageUrl(page.slug),
    },
  ],
})
