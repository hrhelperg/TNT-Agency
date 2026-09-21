/**
 * Builds the candidate application email.
 *
 * The generated mailto: URI is the ONLY place application values may appear.
 * They are never written to the page URL, history, storage or analytics — the
 * candidate sends the message from their own mail client, and the CV is
 * attached there, so no CV ever reaches this site.
 *
 * Mirrors lib/employer-request/mailto.ts, whose privacy properties are already
 * proven by lib/privacy/url-guard and the share-privacy mutation suite.
 */
import { OPERATOR_EMAIL } from '../content/trust-data'
import type { CandidateLocale } from '../locale/chrome'
import { APPLICATION_COPY } from './copy'
import {
  APPLICATION_GROUPS,
  fieldByName,
  fieldsInGroup,
  type ApplicationValues,
} from './schema'

export interface ApplicationMailto {
  /** Full mailto: URI, ready for location.href. */
  readonly href: string
  /** Plain-text body — the copy/paste fallback when no mail client opens. */
  readonly body: string
  readonly subject: string
  readonly to: string
}

/** Renders one field as "Label: value", resolving select options to labels. */
function renderValue(
  name: string,
  raw: string | boolean | undefined,
  locale: CandidateLocale,
): string | null {
  const copy = APPLICATION_COPY[locale]
  const field = fieldByName(name)
  if (!field) return null

  if (field.kind === 'checkbox') {
    // Consent is reported explicitly rather than as a raw boolean, so the
    // recipient can see what was agreed to rather than that "true" was sent.
    if (name === 'consent') return raw === true ? `${copy.labels[name]}: ${copy.consentLabel}` : null
    return null
  }

  const value = typeof raw === 'string' ? raw.trim() : ''
  if (!value) return null

  const label = copy.labels[name] ?? name
  if (field.kind === 'select') return `${label}: ${copy.options[`${name}.${value}`] ?? value}`
  return `${label}: ${value}`
}

/** Grouped, human-readable body. Empty groups are omitted. */
export function buildApplicationBody(values: ApplicationValues, locale: CandidateLocale): string {
  const copy = APPLICATION_COPY[locale]
  const blocks: string[] = []

  for (const group of APPLICATION_GROUPS) {
    const lines = fieldsInGroup(group)
      .map((f) => renderValue(f.name, values[f.name], locale))
      .filter((l): l is string => Boolean(l))
    if (!lines.length) continue
    blocks.push(`${copy.groupTitles[group]}\n${lines.join('\n')}`)
  }

  // The attachment reminder is part of the MESSAGE, not only the page. A
  // candidate who reaches their mail client and forgets the CV has sent us an
  // application we cannot act on, and the page they read the warning on is now
  // behind them.
  blocks.push(copy.attachWarning)

  return blocks.join('\n\n')
}

export function buildApplicationMailto(
  values: ApplicationValues,
  locale: CandidateLocale,
): ApplicationMailto {
  const copy = APPLICATION_COPY[locale]
  const name = typeof values.fullName === 'string' ? values.fullName.trim() : ''
  const subject = name ? `${copy.subject} — ${name}` : copy.subject
  const body = buildApplicationBody(values, locale)
  const href = `mailto:${OPERATOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { href, body, subject, to: OPERATOR_EMAIL }
}
