// Phase E Lite — Lead transport abstraction.
//
// One small seam so a real backend can be added later without touching the
// form, the schema or the copy. Today there is exactly ONE implementation,
// MailtoLeadTransport, and it is the only active transport.
//
// Deliberately NOT implemented here (they would be speculative complexity):
// NetlifyFunctionLeadTransport, EmailApiLeadTransport, DatabaseLeadTransport.
//
// The critical honesty rule lives in this file: a mailto hand-off cannot know
// whether a message was ever sent. `deliver` therefore returns an *attempt*
// outcome — never a delivery confirmation — and nothing in the UI may claim a
// request was sent.

import type { Locale } from '../content/types'
import type { Attribution } from '../attribution'
import type { RequestValues } from '../employer-request/schema'
import { validateRequest, type ValidationErrors } from '../employer-request/validate'
import { buildRequestBody, buildRequestSubject } from '../employer-request/mailto'
import { REQUEST_COPY, OPERATOR_EMAIL } from '../employer-request/copy'
import { generateLeadReference } from './reference'

export interface PreparedLead {
  /** Local, non-sensitive tracking reference (TPID-YYYY-MMDD-XXXX). */
  reference: string
  to: string
  subject: string
  /** Plain-text body, also shown verbatim in the copy/paste fallback. */
  body: string
  /** Full mailto: URI handed to the user's mail client. */
  mailtoUrl: string
}

/**
 * The result of *attempting* the hand-off. There is no `sent: true` here by
 * design — the browser cannot observe whether the mail client sent anything.
 */
export interface DeliveryAttempt {
  attempted: boolean
  /** True when the environment has no way to open a mail client at all. */
  unsupported: boolean
}

export interface PrepareContext {
  locale: Locale
  attribution?: Attribution
  /** Injected for testability; defaults to now. */
  now?: Date
  /** Injected for testability; defaults to the operator address. */
  to?: string
}

export interface LeadTransport {
  readonly id: string
  validate(values: RequestValues): ValidationErrors
  prepare(values: RequestValues, ctx: PrepareContext): PreparedLead
  deliver(prepared: PreparedLead): DeliveryAttempt
}

/** Subject: "<base> — <reference> · <role> · <headcount>× · <city>". */
function subjectWithReference(values: RequestValues, locale: Locale, reference: string): string {
  const base = REQUEST_COPY[locale].emailSubject
  const triage = buildRequestSubject(values, locale).replace(base, '').replace(/^\s*[–-]\s*/, '').trim()
  return triage ? `${base} — ${reference} · ${triage}` : `${base} — ${reference}`
}

export class MailtoLeadTransport implements LeadTransport {
  readonly id = 'mailto'

  validate(values: RequestValues): ValidationErrors {
    return validateRequest(values)
  }

  prepare(values: RequestValues, ctx: PrepareContext): PreparedLead {
    const to = ctx.to ?? OPERATOR_EMAIL
    const reference = generateLeadReference(ctx.now ?? new Date())
    const copy = REQUEST_COPY[ctx.locale]
    const subject = subjectWithReference(values, ctx.locale, reference)

    // The reference heads the body so it is visible in a preview pane.
    const body = [
      `${copy.referenceLabel}: ${reference}`,
      '',
      buildRequestBody(values, ctx.locale, ctx.attribution ?? {}),
    ].join('\n')

    const encode = (s: string) =>
      encodeURIComponent(s).replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29')

    return {
      reference,
      to,
      subject,
      body,
      mailtoUrl: `mailto:${to}?subject=${encode(subject)}&body=${encode(body)}`,
    }
  }

  /**
   * Attempts to hand off to the user's mail client. Returns whether the attempt
   * was made — never whether anything was sent.
   */
  deliver(prepared: PreparedLead): DeliveryAttempt {
    if (typeof window === 'undefined') return { attempted: false, unsupported: true }
    try {
      window.location.href = prepared.mailtoUrl
      return { attempted: true, unsupported: false }
    } catch {
      return { attempted: false, unsupported: true }
    }
  }
}

/** The single active transport. */
export const activeLeadTransport: LeadTransport = new MailtoLeadTransport()
