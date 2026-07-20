// Privacy-safe, first-party attribution (Phase C5).
//
// Design rules, enforced by tests in ./attribution.test.ts:
//
//   1. STRICT ALLOWLIST. Only the fields in ATTRIBUTION_FIELDS may ever be
//      captured. Anything not on the list is dropped, even if a caller passes
//      it explicitly — there is no pass-through path.
//   2. NO SENSITIVE VALUES. Calculator inputs/results (gross, net, employer
//      cost, agency fee) and personal data (name, email, phone, company) must
//      never enter attribution. `assertNoSensitiveKeys` fails loudly if a
//      denylisted key appears.
//   3. SESSION-LIMITED. Attribution lives in sessionStorage only, so it is
//      discarded when the tab closes. It is never written to localStorage,
//      cookies, IndexedDB, the URL or browser history.
//   4. NO NETWORK. This module never transmits. In Phase C the snapshot is
//      only read at submit time and rendered into the mailto body the user
//      themselves sends.

export const ATTRIBUTION_FIELDS = [
  'landingRoute',
  'currentRoute',
  'referrerDomain',
  'utmSource',
  'utmMedium',
  'utmCampaign',
  'utmContent',
  'utmTerm',
  'ctaSource',
  'language',
  'startedAt',
] as const

export type AttributionField = (typeof ATTRIBUTION_FIELDS)[number]

export type Attribution = Partial<Record<AttributionField, string>>

/**
 * Keys that must NEVER appear in attribution. Calculator economics and
 * personal identifiers are the two categories we actively defend against.
 */
export const ATTRIBUTION_DENYLIST = [
  'gross', 'grossSalary', 'hrubaMzda', 'net', 'netSalary', 'cistaMzda',
  'employerCost', 'nakladZamestnavatele', 'agencyFee', 'margin', 'marze',
  'salary', 'mzda', 'wage', 'budget', 'rozpocet', 'price', 'cena',
  'email', 'phone', 'telefon', 'name', 'jmeno', 'contactName', 'company',
  'companyName', 'firma', 'note', 'notes', 'poznamka', 'message',
] as const

const SESSION_KEY = 'tnt-attribution'

/** Only these UTM params are read; everything else in the query is ignored. */
const UTM_MAP: Record<string, AttributionField> = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_content: 'utmContent',
  utm_term: 'utmTerm',
}

/** Non-sensitive CTA origins. A CTA may identify its surface, never a value. */
export const CTA_SOURCES = [
  'homepage-calculator',
  'dedicated-calculator',
  'agency-comparison',
  'agency-value',
  'responsibility-matrix',
  'employer-hub',
  'service-page',
  'direct',
] as const

export type CtaSource = (typeof CTA_SOURCES)[number]

export const isCtaSource = (v: unknown): v is CtaSource =>
  typeof v === 'string' && (CTA_SOURCES as readonly string[]).includes(v)

/**
 * Throws if an object carries a denylisted key. Used as a runtime guard at the
 * boundaries (capture + serialise) so a future refactor cannot quietly widen
 * what we collect.
 */
export function assertNoSensitiveKeys(obj: Record<string, unknown>): void {
  const lower = Object.keys(obj).map((k) => k.toLowerCase())
  for (const banned of ATTRIBUTION_DENYLIST) {
    if (lower.includes(banned.toLowerCase())) {
      throw new Error(`Attribution denylist violation: "${banned}" must never be collected`)
    }
  }
}

/** Keep only allowlisted, non-empty, string values — and cap length. */
export function sanitizeAttribution(input: Record<string, unknown>): Attribution {
  assertNoSensitiveKeys(input)
  const out: Attribution = {}
  for (const field of ATTRIBUTION_FIELDS) {
    const v = input[field]
    if (typeof v === 'string') {
      const trimmed = v.trim().slice(0, 200)
      if (trimmed) out[field] = trimmed
    }
  }
  return out
}

/** Hostname only — never the full referring URL (it can carry query data). */
export function referrerDomain(referrer: string): string {
  if (!referrer) return ''
  try {
    const host = new URL(referrer).hostname
    return host || ''
  } catch {
    return ''
  }
}

/**
 * Builds the attribution snapshot from an explicit environment description.
 * Pure, so it is fully testable without a DOM.
 */
export function buildAttribution(env: {
  landingRoute: string
  currentRoute: string
  referrer?: string
  query?: Record<string, string>
  ctaSource?: string
  language?: string
  startedAt?: string
}): Attribution {
  const utm: Record<string, string> = {}
  for (const [param, field] of Object.entries(UTM_MAP)) {
    const v = env.query?.[param]
    if (v) utm[field] = v
  }
  return sanitizeAttribution({
    landingRoute: env.landingRoute,
    currentRoute: env.currentRoute,
    referrerDomain: referrerDomain(env.referrer ?? ''),
    ctaSource: isCtaSource(env.ctaSource) ? env.ctaSource : 'direct',
    language: env.language,
    startedAt: env.startedAt,
    ...utm,
  })
}

const hasSession = (): boolean =>
  typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined'

/**
 * Reads the stored snapshot (session-scoped). Returns {} on the server, when
 * storage is unavailable/blocked, or when the stored value is malformed.
 */
export function readAttribution(): Attribution {
  if (!hasSession()) return {}
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return {}
    return sanitizeAttribution(parsed as Record<string, unknown>)
  } catch {
    return {}
  }
}

/**
 * Captures attribution once per session (first landing wins for landingRoute),
 * then keeps currentRoute/ctaSource fresh. Safe to call on every page view.
 */
export function captureAttribution(env: {
  landingRoute: string
  currentRoute: string
  referrer?: string
  query?: Record<string, string>
  ctaSource?: string
  language?: string
  startedAt?: string
}): Attribution {
  const existing = readAttribution()
  const fresh = buildAttribution(env)
  // First landing + first-touch UTMs win; route/CTA/language stay current.
  const merged: Attribution = {
    ...fresh,
    landingRoute: existing.landingRoute || fresh.landingRoute,
    utmSource: existing.utmSource || fresh.utmSource,
    utmMedium: existing.utmMedium || fresh.utmMedium,
    utmCampaign: existing.utmCampaign || fresh.utmCampaign,
    utmContent: existing.utmContent || fresh.utmContent,
    utmTerm: existing.utmTerm || fresh.utmTerm,
    referrerDomain: existing.referrerDomain || fresh.referrerDomain,
  }
  const clean = sanitizeAttribution(merged as Record<string, unknown>)
  if (hasSession()) {
    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(clean))
    } catch {
      /* storage blocked — attribution is best-effort, never a hard failure */
    }
  }
  return clean
}

/** Clears the session snapshot (used after a completed request). */
export function clearAttribution(): void {
  if (!hasSession()) return
  try {
    window.sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

/** Human-readable lines appended to the mailto body after the user submits. */
export function formatAttributionLines(
  a: Attribution,
  labels: Record<AttributionField, string>,
): string[] {
  return ATTRIBUTION_FIELDS.filter((f) => a[f]).map((f) => `${labels[f]}: ${a[f]}`)
}
