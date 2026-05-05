// Typed template helpers. Each function turns structured data into a small
// piece of HTML/text. Templates are duplicate-aware: they vary phrasing based
// on their input so different topics do not share identical paragraphs.

import type {
  ContentSource,
  EmploymentTopic,
  FAQItem,
  InternalLink,
  LegalTopic,
  RecruitmentService,
} from './types'
import { DISCLAIMER_CS, FALLBACK_DATA_CS } from './tone'

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export const employmentTopicIntroTemplate = (topic: EmploymentTopic): string => {
  const audienceCs = topic.audience
    .map((a) =>
      a === 'employer'
        ? 'zaměstnavatele'
        : a === 'employee'
          ? 'zaměstnance'
          : a === 'foreign-worker'
            ? 'pracovníky ze zahraničí'
            : 'pracovní agentury',
    )
    .join(', ')

  return [
    `<p>${escapeHtml(topic.summary)}</p>`,
    `<p>Tento přehled je určen především pro ${escapeHtml(audienceCs)} a vychází z ověřitelných zdrojů. Cílem je poskytnout jasné a praktické informace bez zjednodušení, které by mohly vést k chybnému rozhodnutí.</p>`,
  ].join('\n')
}

export const recruitmentServiceIntroTemplate = (
  service: RecruitmentService,
): string => {
  const audience = service.whoFor.length
    ? service.whoFor.map((w) => `<li>${escapeHtml(w)}</li>`).join('')
    : ''

  return [
    `<p>${escapeHtml(service.summary)}</p>`,
    audience
      ? `<p>Komu je služba určena:</p><ul>${audience}</ul>`
      : '<p>Služba je dostupná po individuálním posouzení potřeb.</p>',
  ].join('\n')
}

export const legalTopicTemplate = (topic: LegalTopic): string => {
  const refs = topic.legalReferences
    .map(
      (r) =>
        `<li>${escapeHtml(r.name)}${r.publisher ? ` – ${escapeHtml(r.publisher)}` : ''}${
          r.url ? ` (<a href="${escapeHtml(r.url)}" rel="nofollow noopener">zdroj</a>)` : ''
        }</li>`,
    )
    .join('')

  const notes = topic.notes.map((n) => `<li>${escapeHtml(n)}</li>`).join('')

  return [
    `<p>${escapeHtml(topic.summary)}</p>`,
    `<p><strong>Jurisdikce:</strong> ${escapeHtml(topic.jurisdiction)}</p>`,
    refs ? `<p><strong>Právní reference:</strong></p><ul>${refs}</ul>` : '',
    notes ? `<p><strong>Praktické poznámky:</strong></p><ul>${notes}</ul>` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

export const sourceBlockTemplate = (sources: ContentSource[]): string => {
  if (!sources.length) {
    return `<p class="data-note">${escapeHtml(FALLBACK_DATA_CS)}</p>`
  }
  const items = sources
    .map((s) => {
      const label = `${escapeHtml(s.name)}${s.publisher ? ` – ${escapeHtml(s.publisher)}` : ''}`
      const link = s.url
        ? `<a href="${escapeHtml(s.url)}" rel="nofollow noopener">${label}</a>`
        : label
      const retrieved = s.retrieved ? ` (ověřeno ${escapeHtml(s.retrieved)})` : ''
      const note = s.note ? ` – ${escapeHtml(s.note)}` : ''
      return `<li>${link}${retrieved}${note}</li>`
    })
    .join('')
  return `<aside class="sources"><h2>Zdroje</h2><ul>${items}</ul></aside>`
}

export const methodologyNoteTemplate = (sources: ContentSource[]): string => {
  const list = sources
    .map((s) => `<li>${escapeHtml(s.name)}${s.publisher ? ` – ${escapeHtml(s.publisher)}` : ''}</li>`)
    .join('')
  const intro =
    sources.length > 0
      ? 'Metodika a zdroje:'
      : 'Tato stránka obsahuje obecné informace bez konkrétních číselných údajů, dokud nejsou ověřitelně dostupné.'
  return [
    '<section class="methodology">',
    '<h2>Metodika</h2>',
    `<p>${escapeHtml(intro)}</p>`,
    list ? `<ul>${list}</ul>` : '',
    `<p class="data-note">${escapeHtml(DISCLAIMER_CS)}</p>`,
    '</section>',
  ].join('\n')
}

export const faqBlockTemplate = (faqs: FAQItem[]): string => {
  if (!faqs.length) return ''
  const items = faqs
    .map(
      (f) =>
        `<details><summary>${escapeHtml(f.q)}</summary><p>${escapeHtml(f.a)}</p></details>`,
    )
    .join('')
  return `<section class="faq"><h2>Časté dotazy</h2>${items}</section>`
}

export const internalLinksTemplate = (links: InternalLink[]): string => {
  if (!links.length) return ''
  const items = links
    .map(
      (l) =>
        `<li><a href="${escapeHtml(l.href)}"${l.rel ? ` rel="${escapeHtml(l.rel)}"` : ''}>${escapeHtml(l.label)}</a></li>`,
    )
    .join('')
  return `<nav class="internal-links" aria-label="Související obsah"><h2>Související</h2><ul>${items}</ul></nav>`
}

export const articleSchemaTemplate = (input: {
  url: string
  title: string
  description: string
  datePublished: string
  dateModified: string
  inLanguage?: string
}): string => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    author: {
      '@type': 'Organization',
      name: 'TNT Agency',
      url: 'https://manpower-tnt.agency',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TNT Agency',
      url: 'https://manpower-tnt.agency',
      logo: {
        '@type': 'ImageObject',
        url: 'https://manpower-tnt.agency/favicon.svg',
      },
    },
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: input.inLanguage ?? 'cs-CZ',
    url: input.url,
  }
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`
}

export const faqSchemaTemplate = (faqs: FAQItem[]): string => {
  if (!faqs.length) return ''
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`
}

export { escapeHtml }
