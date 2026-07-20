// Phase E9 — Provider-abstracted transactional email.
//
// Business logic depends on EmailAdapter, never on a concrete vendor. Swapping
// provider is a one-line change in `resolveAdapter`, and with no credentials
// configured the safe development logger is used and production sending stays
// disabled — which is the current state (no provider credentials are available).

import type { Locale } from '../../content/types'
import { OPERATOR, OPERATOR_EMAIL } from '../../employer-request/copy'

export interface EmailMessage {
  to: string
  subject: string
  /** Plain text only: no tracking pixels, no remote content. */
  text: string
  replyTo?: string
}

export interface SendResult {
  ok: boolean
  provider: string
  /** Provider-side id, when the provider returns one. */
  reference?: string
  error?: string
  /** True when the adapter intentionally did not send (no credentials). */
  suppressed?: boolean
}

export interface EmailAdapter {
  readonly name: string
  send(message: EmailMessage): Promise<SendResult>
}

/**
 * Development / unconfigured adapter. Never contacts the network. Records what
 * *would* have been sent so the flow is testable end to end without a provider.
 */
export class LoggerEmailAdapter implements EmailAdapter {
  readonly name = 'logger'
  public readonly sent: EmailMessage[] = []

  async send(message: EmailMessage): Promise<SendResult> {
    this.sent.push(message)
    if (process.env.NODE_ENV !== 'test') {
      // Recipient only — never the body, which contains personal data.
      console.info(`[email:logger] would send "${message.subject}" to ${message.to}`)
    }
    return { ok: true, provider: this.name, suppressed: true }
  }
}

/**
 * Generic HTTP provider adapter. Credentials come from the environment and are
 * never committed. Kept deliberately small so a real provider can be wired by
 * setting EMAIL_PROVIDER_ENDPOINT + EMAIL_PROVIDER_API_KEY.
 */
export class HttpEmailAdapter implements EmailAdapter {
  readonly name: string

  constructor(
    private readonly endpoint: string,
    private readonly apiKey: string,
    private readonly from: string,
    name = 'http',
  ) {
    this.name = name
  }

  async send(message: EmailMessage): Promise<SendResult> {
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          from: this.from,
          to: message.to,
          subject: message.subject,
          text: message.text,
          reply_to: message.replyTo,
        }),
      })
      if (!res.ok) {
        // Never echo the response body: it can contain the payload back.
        return { ok: false, provider: this.name, error: `HTTP ${res.status}` }
      }
      const data = (await res.json().catch(() => ({}))) as { id?: string }
      return { ok: true, provider: this.name, reference: data.id }
    } catch (err) {
      return { ok: false, provider: this.name, error: err instanceof Error ? err.message : 'send failed' }
    }
  }
}

/**
 * Chooses the adapter from the environment. With no credentials present this
 * returns the logger, so the application degrades safely instead of throwing
 * or silently dropping a lead.
 */
export function resolveAdapter(env: NodeJS.ProcessEnv = process.env): EmailAdapter {
  const endpoint = env.EMAIL_PROVIDER_ENDPOINT
  const apiKey = env.EMAIL_PROVIDER_API_KEY
  const from = env.EMAIL_FROM_ADDRESS
  if (endpoint && apiKey && from) {
    return new HttpEmailAdapter(endpoint, apiKey, from, env.EMAIL_PROVIDER_NAME ?? 'http')
  }
  return new LoggerEmailAdapter()
}

// ── Localized templates ──────────────────────────────────────────────────
//
// Deliberately minimal: the operator notification carries the reference and the
// routing facts, not a second copy of every field (which lives in the record).
// The employer confirmation contains no personal data beyond their own name.

export interface OperatorNotificationInput {
  publicReference: string
  companyName: string
  profession: string
  headcount: number
  city?: string
  ctaSource?: string
}

export function operatorNotification(input: OperatorNotificationInput): EmailMessage {
  const where = input.city ? ` · ${input.city}` : ''
  return {
    to: OPERATOR_EMAIL,
    subject: `Nová poptávka ${input.publicReference} – ${input.profession} ${input.headcount}×${where}`,
    text: [
      `Byla přijata nová poptávka pracovníků.`,
      ``,
      `Reference: ${input.publicReference}`,
      `Firma: ${input.companyName}`,
      `Profese: ${input.profession}`,
      `Počet: ${input.headcount}`,
      input.city ? `Lokalita: ${input.city}` : '',
      input.ctaSource ? `Vstupní bod: ${input.ctaSource}` : '',
      ``,
      `Detail poptávky je v operátorském přehledu.`,
    ]
      .filter(Boolean)
      .join('\n'),
  }
}

type ConfirmationTemplate = (ref: string, name: string) => { subject: string; text: string }

const CONFIRMATION: Record<Locale, ConfirmationTemplate> = {
  cs: (ref, name) => ({
    subject: `Potvrzení poptávky ${ref}`,
    text: [
      `Dobrý den, ${name},`,
      ``,
      `přijali jsme vaši poptávku pracovníků. Referenční číslo je ${ref}.`,
      `Ozveme se s upřesněním a s tím, co je v daném termínu a lokalitě reálné. Dostupnost pracovníků nelze zaručit předem.`,
      ``,
      `Tato zpráva je potvrzením přijetí, nikoli nabídkou ani potvrzením objednávky.`,
      ``,
      `${OPERATOR}`,
      `${OPERATOR_EMAIL}`,
    ].join('\n'),
  }),
  en: (ref, name) => ({
    subject: `Request confirmation ${ref}`,
    text: [
      `Hello ${name},`,
      ``,
      `we have received your staffing request. Your reference is ${ref}.`,
      `We will follow up to confirm details and tell you what is realistic for that timeframe and location. Worker availability cannot be guaranteed in advance.`,
      ``,
      `This message confirms receipt only; it is not a proposal or an order confirmation.`,
      ``,
      `${OPERATOR}`,
      `${OPERATOR_EMAIL}`,
    ].join('\n'),
  }),
  de: (ref, name) => ({
    subject: `Bestätigung der Anfrage ${ref}`,
    text: [
      `Guten Tag ${name},`,
      ``,
      `wir haben Ihre Personalanfrage erhalten. Ihre Referenz lautet ${ref}.`,
      `Wir melden uns zur Abstimmung der Details und dazu, was für diesen Zeitraum und Standort realistisch ist. Die Verfügbarkeit von Mitarbeitern kann nicht im Voraus garantiert werden.`,
      ``,
      `Diese Nachricht bestätigt nur den Eingang; sie ist weder ein Angebot noch eine Auftragsbestätigung.`,
      ``,
      `${OPERATOR}`,
      `${OPERATOR_EMAIL}`,
    ].join('\n'),
  }),
}

export function employerConfirmation(
  to: string,
  publicReference: string,
  contactName: string,
  locale: Locale = 'cs',
): EmailMessage {
  const t = CONFIRMATION[locale](publicReference, contactName)
  return { to, subject: t.subject, text: t.text, replyTo: OPERATOR_EMAIL }
}
