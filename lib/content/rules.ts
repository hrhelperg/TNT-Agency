// Editorial / quality thresholds shared by templates, generators, and quality checks.
// These constants exist so every content surface uses the same rules instead of
// each page re-deciding what counts as "enough" content.

export const CONTENT_RULES = {
  minIntroChars: 220,
  minExplanationChars: 600,
  minBulletItems: 3,
  minFAQItems: 3,
  minSourcesForLegalClaims: 1,
  maxKeywordDensityPercent: 3,
  maxParagraphChars: 900,
} as const

export const REQUIRED_FIELDS = {
  topic: ['slug', 'title', 'summary', 'sources', 'meta'] as const,
  service: ['slug', 'title', 'summary', 'process', 'meta'] as const,
  legal: ['slug', 'title', 'jurisdiction', 'legalReferences', 'meta'] as const,
  article: ['slug', 'title', 'description', 'intro', 'sections', 'sources'] as const,
}

export const SITE = {
  domain: 'manpower-tnt.agency',
  baseUrl: 'https://manpower-tnt.agency',
  brand: 'TNT Agency',
  legalName: 'TNT agency s.r.o.',
} as const
