// Quality checks. Run before publishing or building any page that uses
// the content layer. The goal is to fail loudly when content would be thin,
// missing sources, or contain forbidden marketing claims — never to silently
// downgrade content quality.

import type {
  ArticleData,
  ContentSource,
  EmploymentTopic,
  LegalTopic,
  RecruitmentService,
} from './types'
import { CONTENT_RULES, REQUIRED_FIELDS } from './rules'
import { FORBIDDEN_PHRASES_CS, FORBIDDEN_PHRASES_EN } from './tone'

export interface QualityIssue {
  level: 'error' | 'warning'
  field: string
  message: string
}

export interface QualityReport {
  ok: boolean
  errors: QualityIssue[]
  warnings: QualityIssue[]
}

const issue = (
  level: QualityIssue['level'],
  field: string,
  message: string,
): QualityIssue => ({ level, field, message })

const report = (issues: QualityIssue[]): QualityReport => {
  const errors = issues.filter((i) => i.level === 'error')
  const warnings = issues.filter((i) => i.level === 'warning')
  return { ok: errors.length === 0, errors, warnings }
}

const checkForbiddenPhrases = (text: string, field: string): QualityIssue[] => {
  const lower = text.toLowerCase()
  const matches: QualityIssue[] = []
  for (const p of FORBIDDEN_PHRASES_CS) {
    if (lower.includes(p.toLowerCase())) {
      matches.push(issue('error', field, `Forbidden marketing phrase: "${p}"`))
    }
  }
  for (const p of FORBIDDEN_PHRASES_EN) {
    if (lower.includes(p.toLowerCase())) {
      matches.push(issue('error', field, `Forbidden marketing phrase: "${p}"`))
    }
  }
  return matches
}

const checkRequiredFields = <T extends object>(
  data: T,
  required: ReadonlyArray<keyof T & string>,
): QualityIssue[] =>
  required
    .filter((key) => {
      const v = (data as Record<string, unknown>)[key]
      if (v === undefined || v === null) return true
      if (typeof v === 'string' && v.trim().length === 0) return true
      if (Array.isArray(v) && v.length === 0) return true
      return false
    })
    .map((key) => issue('error', key, 'Required field missing or empty.'))

const checkSources = (sources: ContentSource[], field: string): QualityIssue[] => {
  if (sources.length < CONTENT_RULES.minSourcesForLegalClaims) {
    return [
      issue(
        'warning',
        field,
        `Fewer than ${CONTENT_RULES.minSourcesForLegalClaims} sources — generators will show a transparent fallback.`,
      ),
    ]
  }
  return sources.flatMap((s, i) => {
    if (!s.name) return [issue('error', `${field}[${i}].name`, 'Source name missing.')]
    return []
  })
}

export const validateEmploymentTopic = (topic: EmploymentTopic): QualityReport =>
  report([
    ...checkRequiredFields(topic, REQUIRED_FIELDS.topic),
    ...checkForbiddenPhrases(`${topic.title} ${topic.summary}`, 'topic'),
    ...checkSources(topic.sources, 'topic.sources'),
    ...(topic.summary && topic.summary.length < CONTENT_RULES.minIntroChars
      ? [issue('warning', 'summary', `Intro shorter than ${CONTENT_RULES.minIntroChars} chars.`)]
      : []),
  ])

export const validateRecruitmentService = (
  service: RecruitmentService,
): QualityReport =>
  report([
    ...checkRequiredFields(service, REQUIRED_FIELDS.service),
    ...checkForbiddenPhrases(`${service.title} ${service.summary}`, 'service'),
    ...(service.process.length < CONTENT_RULES.minBulletItems
      ? [issue('warning', 'process', 'Process should describe at least three steps.')]
      : []),
  ])

export const validateLegalTopic = (topic: LegalTopic): QualityReport =>
  report([
    ...checkRequiredFields(topic, REQUIRED_FIELDS.legal),
    ...checkForbiddenPhrases(`${topic.title} ${topic.summary}`, 'legal'),
    ...checkSources(topic.legalReferences, 'legal.legalReferences'),
  ])

export const validateArticle = (article: ArticleData): QualityReport => {
  const allBodyText = article.sections
    .flatMap((s) => [s.heading, ...s.body, ...(s.bullets ?? [])])
    .join(' ')

  const issues: QualityIssue[] = [
    ...checkRequiredFields(article, REQUIRED_FIELDS.article),
    ...checkForbiddenPhrases(`${article.title} ${article.intro} ${allBodyText}`, 'article'),
    ...checkSources(article.sources, 'article.sources'),
  ]

  if (article.intro.length < CONTENT_RULES.minIntroChars) {
    issues.push(
      issue(
        'warning',
        'intro',
        `Intro shorter than ${CONTENT_RULES.minIntroChars} chars (${article.intro.length}).`,
      ),
    )
  }

  const explanationLength = allBodyText.length
  if (explanationLength < CONTENT_RULES.minExplanationChars) {
    issues.push(
      issue(
        'warning',
        'sections',
        `Combined body shorter than ${CONTENT_RULES.minExplanationChars} chars (${explanationLength}).`,
      ),
    )
  }

  if (article.faq && article.faq.length > 0 && article.faq.length < CONTENT_RULES.minFAQItems) {
    issues.push(
      issue(
        'warning',
        'faq',
        `FAQ has fewer than ${CONTENT_RULES.minFAQItems} items — consider expanding or removing.`,
      ),
    )
  }

  return report(issues)
}

export const requireDisclaimerForLegalTopics = (article: ArticleData): boolean =>
  /daň|odvod|pojištění|zákon|zaměstnávání cizinců|povolení/i.test(
    `${article.title} ${article.description}`,
  )
