// Builds the structured staffing-request email (Phase C3).
//
// The generated mailto: URI is the ONLY place request values may appear. They
// are never written to the page URL, history, storage or analytics — the user
// sends the message from their own mail client.

import type { Locale } from '../content/types'
import type { Attribution } from '../attribution'
import { formatAttributionLines } from '../attribution'
import { REQUEST_COPY, OPERATOR_EMAIL, type RequestCopy } from './copy'
import { REQUEST_GROUPS, fieldsInGroup, fieldByName, type RequestValues } from './schema'

export interface MailtoResult {
  /** Full mailto: URI, ready for location.href. */
  href: string
  /** Plain-text body — shown as a copy/paste fallback if the client fails. */
  body: string
  subject: string
  to: string
}

/** Renders one field as "Label: value", resolving select options to labels. */
function renderValue(name: string, raw: string | boolean | undefined, copy: RequestCopy): string | null {
  const field = fieldByName(name)
  if (!field) return null

  if (field.kind === 'checkbox') {
    // Consent is reported explicitly rather than as a raw boolean.
    if (name === 'consent') return raw === true ? `${copy.labels[name]}: ${copy.consentLabel}` : null
    return raw === true ? `${copy.labels[name]}: ${copy.options[`${name}.yes`] ?? 'yes'}` : null
  }

  const value = typeof raw === 'string' ? raw.trim() : ''
  if (!value) return null

  const label = copy.labels[name] ?? name
  if (field.kind === 'select') {
    const optionLabel = copy.options[`${name}.${value}`]
    return `${label}: ${optionLabel ?? value}`
  }
  return `${label}: ${value}`
}

/**
 * Builds a grouped, human-readable body. Empty groups are omitted so the
 * operator never receives a wall of blank labels.
 */
export function buildRequestBody(
  values: RequestValues,
  locale: Locale,
  attribution: Attribution = {},
): string {
  const copy = REQUEST_COPY[locale]
  const lines: string[] = [copy.emailIntro, '']

  for (const group of REQUEST_GROUPS) {
    const rendered = fieldsInGroup(group)
      .map((f) => renderValue(f.name, values[f.name], copy))
      .filter((l): l is string => Boolean(l))

    if (rendered.length === 0) continue
    lines.push(`— ${copy.groups[group]} —`)
    lines.push(...rendered)
    lines.push('')
  }

  const attrLines = formatAttributionLines(attribution, copy.attributionLabels)
  if (attrLines.length) {
    lines.push(`— ${copy.emailAttributionTitle} —`)
    lines.push(...attrLines)
    lines.push('')
  }

  // Trailing blank lines are noise in a mail client.
  while (lines.length && lines[lines.length - 1] === '') lines.pop()
  return lines.join('\n')
}

/** Subject carries just enough to triage: role, headcount, city. */
export function buildRequestSubject(values: RequestValues, locale: Locale): string {
  const copy = REQUEST_COPY[locale]
  const parts: string[] = [copy.emailSubject]
  const profession = typeof values.profession === 'string' ? values.profession.trim() : ''
  const headcount = typeof values.headcount === 'string' ? values.headcount.trim() : ''
  const city = typeof values.workplaceCity === 'string' ? values.workplaceCity.trim() : ''

  const detail = [profession, headcount ? `${headcount}×` : '', city].filter(Boolean).join(' · ')
  if (detail) parts.push(detail)
  return parts.join(' – ')
}

/**
 * RFC-compliant mailto. encodeURIComponent leaves some characters that mail
 * clients mis-handle in query values, so the few that matter are escaped too.
 */
const encodeComponent = (s: string): string =>
  encodeURIComponent(s).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29')

export function buildMailto(
  values: RequestValues,
  locale: Locale,
  attribution: Attribution = {},
  to: string = OPERATOR_EMAIL,
): MailtoResult {
  const subject = buildRequestSubject(values, locale)
  const body = buildRequestBody(values, locale, attribution)
  const href = `mailto:${to}?subject=${encodeComponent(subject)}&body=${encodeComponent(body)}`
  return { href, body, subject, to }
}
