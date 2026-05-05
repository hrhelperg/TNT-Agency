// Deterministic content generators. Same input → same output. No randomness,
// no external calls, no invented facts. Generators read structured data and
// emit HTML strings safe for server-rendered output.

import type {
  ContentSource,
  EmploymentTopic,
  FAQItem,
  InternalLink,
  LegalTopic,
  RecruitmentService,
} from './types'
import {
  articleSchemaTemplate,
  employmentTopicIntroTemplate,
  escapeHtml,
  faqBlockTemplate,
  faqSchemaTemplate,
  internalLinksTemplate,
  legalTopicTemplate,
  methodologyNoteTemplate,
  recruitmentServiceIntroTemplate,
  sourceBlockTemplate,
} from './templates'
import { FALLBACK_DATA_CS } from './tone'

export const generateEmploymentTopicIntro = (topic: EmploymentTopic): string =>
  employmentTopicIntroTemplate(topic)

export const generateEmploymentTopicExplanation = (
  topic: EmploymentTopic,
  sources: ContentSource[] = topic.sources,
): string => {
  const points = topic.keyPoints
    .map((p) => `<li>${escapeHtml(p)}</li>`)
    .join('')
  const explanation = points
    ? `<h2>${escapeHtml(topic.title)} – co je důležité</h2><ul>${points}</ul>`
    : `<p class="data-note">${escapeHtml(FALLBACK_DATA_CS)}</p>`
  return [explanation, sourceBlockTemplate(sources)].join('\n')
}

export const generateRecruitmentServiceIntro = (
  service: RecruitmentService,
): string => recruitmentServiceIntroTemplate(service)

export const generateRecruitmentServiceExplanation = (
  service: RecruitmentService,
  sources: ContentSource[] = service.sources ?? [],
): string => {
  const process = service.process
    .map((step, i) => `<li><strong>${i + 1}.</strong> ${escapeHtml(step)}</li>`)
    .join('')
  const compliance = service.compliance
    .map((c) => `<li>${escapeHtml(c)}</li>`)
    .join('')
  return [
    `<h2>Jak služba probíhá</h2><ol>${process}</ol>`,
    compliance
      ? `<h2>Soulad s předpisy</h2><ul>${compliance}</ul>`
      : '',
    sources.length ? sourceBlockTemplate(sources) : '',
  ]
    .filter(Boolean)
    .join('\n')
}

export const generateForeignWorkerIntro = (countryOrTopic: string): string =>
  `<p>Zaměstnávání pracovníků z ${escapeHtml(countryOrTopic)} se řídí českou legislativou o pobytu cizinců, povoleními k zaměstnání a přístupu na trh práce. Konkrétní podmínky závisí na zemi původu, typu povolení k pobytu a charakteru pracovní pozice.</p>`

export const generateEmployerObligationsBlock = (
  topicTitle: string,
  obligations: string[],
  sources: ContentSource[] = [],
): string => {
  if (!obligations.length) {
    return `<section class="obligations"><h2>Povinnosti zaměstnavatele</h2><p class="data-note">${escapeHtml(FALLBACK_DATA_CS)}</p></section>`
  }
  const items = obligations.map((o) => `<li>${escapeHtml(o)}</li>`).join('')
  return [
    '<section class="obligations">',
    `<h2>Povinnosti zaměstnavatele – ${escapeHtml(topicTitle)}</h2>`,
    `<ul>${items}</ul>`,
    sources.length ? sourceBlockTemplate(sources) : '',
    '</section>',
  ].join('\n')
}

export const generateEmployeeObligationsBlock = (
  topicTitle: string,
  obligations: string[],
  sources: ContentSource[] = [],
): string => {
  if (!obligations.length) {
    return `<section class="obligations"><h2>Povinnosti zaměstnance</h2><p class="data-note">${escapeHtml(FALLBACK_DATA_CS)}</p></section>`
  }
  const items = obligations.map((o) => `<li>${escapeHtml(o)}</li>`).join('')
  return [
    '<section class="obligations">',
    `<h2>Povinnosti zaměstnance – ${escapeHtml(topicTitle)}</h2>`,
    `<ul>${items}</ul>`,
    sources.length ? sourceBlockTemplate(sources) : '',
    '</section>',
  ].join('\n')
}

export const generateTaxInsuranceIntro = (
  topic: string,
  year: number,
  sources: ContentSource[] = [],
): string => {
  const sourceLine = sources.length
    ? `Aktuální sazby a limity pro rok ${year} ověřte v oficiálních zdrojích uvedených níže.`
    : `Pro rok ${year} nejsou v této stránce uvedeny konkrétní sazby; ověřte je z oficiálních zdrojů (ČSSZ, finanční správa, zdravotní pojišťovny).`
  return [
    `<p>Téma <strong>${escapeHtml(topic)}</strong> patří mezi pravidelně aktualizované oblasti. Ve většině případů se jedná o povinné odvody, jejichž přesná výše a pravidla se mohou rok od roku měnit.</p>`,
    `<p>${escapeHtml(sourceLine)}</p>`,
  ].join('\n')
}

export const generateMethodologyNote = (sources: ContentSource[]): string =>
  methodologyNoteTemplate(sources)

export const generateSourceBlock = (sources: ContentSource[]): string =>
  sourceBlockTemplate(sources)

export const generateFAQBlock = (faqs: FAQItem[]): string =>
  faqBlockTemplate(faqs)

export const generateFAQSchema = (faqs: FAQItem[]): string =>
  faqSchemaTemplate(faqs)

export const generateInternalLinks = (
  currentPath: string,
  related: InternalLink[],
): string => {
  const filtered = related.filter((l) => l.href !== currentPath)
  return internalLinksTemplate(filtered)
}

export const generateLegalTopicBlock = (topic: LegalTopic): string =>
  legalTopicTemplate(topic)

export const generateArticleSchema = (input: {
  url: string
  title: string
  description: string
  datePublished: string
  dateModified: string
  inLanguage?: string
}): string => articleSchemaTemplate(input)
