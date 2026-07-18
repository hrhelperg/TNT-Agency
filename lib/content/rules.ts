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
  domain: 'talentpartnerid.com',
  baseUrl: 'https://talentpartnerid.com',
  // Public product/agency brand.
  brand: 'TalentPartnerID',
  // Registered legal operator — unchanged. Shown as "Provozovatel: TNT agency s.r.o."
  legalName: 'TNT agency s.r.o.',
  // Short Czech positioning used wherever a brand description is needed.
  positioning: 'Partner pro nábor, agenturní zaměstnávání a řízení nákladů na pracovní sílu.',
  // Official social profiles. Empty until confirmed URLs exist — the footer and
  // JSON-LD sameAs render nothing while empty. Add confirmed https URLs here to
  // surface them. Do NOT reuse the previous brand's social handles as if official.
  social: [] as readonly string[],
} as const
