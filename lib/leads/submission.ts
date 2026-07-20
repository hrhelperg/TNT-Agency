// Phase E7 — Server-side submission logic, kept free of Next/Supabase imports
// so it is unit-testable and reusable from an Edge Function.

import { validateRequest, isValid, type ValidationErrors } from '../employer-request/validate'
import { sanitizeAttribution, type Attribution } from '../attribution'
import type { RequestValues } from '../employer-request/schema'

export const CONSENT_VERSION = '2026-07-20'
export const PRIVACY_NOTICE_VERSION = '2026-07-20'

export interface SubmissionPayload {
  values: RequestValues
  attribution?: Record<string, unknown>
  marketingConsent?: boolean
  /** Honeypot: must be empty. Bots fill every field they find. */
  website?: string
  /** Milliseconds the form was on screen before submit. */
  elapsedMs?: number
}

export type SubmissionRejection =
  | { kind: 'validation'; errors: ValidationErrors }
  | { kind: 'spam'; reason: 'honeypot' | 'too-fast' | 'rate-limited' | 'duplicate' }

export interface SubmissionAccepted {
  kind: 'accepted'
  rpcArgs: Record<string, unknown>
}

/** A human cannot complete 23 fields faster than this. */
export const MIN_ELAPSED_MS = 3000

/**
 * Deterministic, non-reversible fingerprint of the exact consent text shown,
 * so we can prove what was agreed without storing another copy of it.
 * FNV-1a is sufficient here: this is an integrity marker, not a secret.
 */
export function hashConsentText(text: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return `fnv1a-${h.toString(16).padStart(8, '0')}`
}

/** Stable key for duplicate detection: same requester, same role, same day. */
export function duplicateKey(values: RequestValues, day: string): string {
  const s = (k: string) => String(values[k] ?? '').trim().toLowerCase()
  return [s('email'), s('profession'), s('workplaceCity'), day].join('|')
}

/**
 * Validates and converts a payload into the arguments for the submit_lead RPC.
 * Pure: no I/O, no clock, no randomness — the caller supplies `now`.
 */
export function prepareSubmission(
  payload: SubmissionPayload,
  consentText: string,
  marketingText: string,
): SubmissionAccepted | SubmissionRejection {
  // 1. Anti-spam before anything expensive.
  if (payload.website && payload.website.trim() !== '') {
    return { kind: 'spam', reason: 'honeypot' }
  }
  if (typeof payload.elapsedMs === 'number' && payload.elapsedMs < MIN_ELAPSED_MS) {
    return { kind: 'spam', reason: 'too-fast' }
  }

  // 2. Server-side validation — the client's result is never trusted.
  const errors = validateRequest(payload.values)
  if (!isValid(errors)) return { kind: 'validation', errors }

  // 3. Attribution is re-sanitised server-side: allowlist only.
  const attribution: Attribution = sanitizeAttribution(payload.attribution ?? {})

  const v = payload.values
  const str = (k: string): string | null => {
    const raw = v[k]
    const s = typeof raw === 'string' ? raw.trim() : ''
    return s === '' ? null : s
  }

  return {
    kind: 'accepted',
    rpcArgs: {
      p_company_name: str('companyName'),
      p_contact_name: str('contactName'),
      p_email: (str('email') ?? '').toLowerCase(),
      p_phone: str('phone'),
      p_workplace_city: str('workplaceCity'),
      p_workplace_region: str('workplaceRegion'),
      p_preferred_contact: str('preferredContact') ?? 'email',
      p_locale: str('locale') ?? 'cs',
      p_consent_version: CONSENT_VERSION,
      p_privacy_notice_version: PRIVACY_NOTICE_VERSION,
      p_consent_text_hash: hashConsentText(consentText),
      p_marketing_consent: payload.marketingConsent === true,
      p_marketing_text_hash: hashConsentText(marketingText),
      p_requirements: [
        {
          profession: str('profession'),
          headcount: Number(str('headcount') ?? 0),
          startDate: str('startDate'),
          duration: str('duration'),
          shiftModel: str('shiftModel'),
          weeklyHours: str('weeklyHours'),
          experience: str('experience'),
          languages: str('languages'),
          accommodation: str('accommodation'),
          transport: str('transport'),
          ppe: str('ppe'),
          foreignWorkerSupport: str('foreignWorkerSupport'),
          employmentModel: str('employmentModel') ?? 'unsure',
          budget: str('budget'),
          notes: str('notes'),
        },
      ],
      p_attribution: attribution,
    },
  }
}

// ── Rate limiting ────────────────────────────────────────────────────────
//
// In-memory fixed window. Adequate for a single instance and, importantly,
// fails open for legitimate traffic rather than dropping leads.

export interface RateLimitState {
  hits: Map<string, { count: number; windowStart: number }>
}

export const createRateLimitState = (): RateLimitState => ({ hits: new Map() })

export const RATE_LIMIT_MAX = 5
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

export function checkRateLimit(
  state: RateLimitState,
  key: string,
  now: number,
): { allowed: boolean; remaining: number } {
  const entry = state.hits.get(key)
  if (!entry || now - entry.windowStart >= RATE_LIMIT_WINDOW_MS) {
    state.hits.set(key, { count: 1, windowStart: now })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }
  entry.count += 1
  return { allowed: entry.count <= RATE_LIMIT_MAX, remaining: Math.max(0, RATE_LIMIT_MAX - entry.count) }
}
