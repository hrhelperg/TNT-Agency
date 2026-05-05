// Shared types for the content layer.
// All structured data feeding the SEO content layer must use these types
// so generators can produce factual, source-backed text without invention.

export type Locale = 'cs' | 'en' | 'de'

export interface ContentSource {
  name: string
  publisher?: string
  url?: string
  retrieved?: string
  note?: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface InternalLink {
  href: string
  label: string
  rel?: string
}

export interface ContentMeta {
  locale: Locale
  lastUpdated: string
  dataYear?: number
  jurisdiction?: string
  isGeneralInformation?: boolean
}

export interface EmploymentTopic {
  slug: string
  title: string
  summary: string
  audience: Array<'employer' | 'employee' | 'foreign-worker' | 'agency'>
  keyPoints: string[]
  sources: ContentSource[]
  meta: ContentMeta
}

export interface RecruitmentService {
  slug: string
  title: string
  summary: string
  whoFor: string[]
  process: string[]
  compliance: string[]
  sources?: ContentSource[]
  meta: ContentMeta
}

export interface LegalTopic {
  slug: string
  title: string
  summary: string
  jurisdiction: string
  legalReferences: ContentSource[]
  notes: string[]
  meta: ContentMeta
}

export interface ArticleData {
  slug: string
  title: string
  description: string
  keywords: string[]
  intro: string
  sections: Array<{
    heading: string
    body: string[]
    bullets?: string[]
  }>
  faq?: FAQItem[]
  sources: ContentSource[]
  internalLinks: InternalLink[]
  meta: ContentMeta
  datePublished: string
  dateModified: string
}
