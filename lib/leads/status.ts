// Phase E3 — Lead status lifecycle (application mirror of migration 0002).
//
// The database is the enforcement point; this module lets the UI and the API
// reason about the same rules without a round-trip. A test asserts that the two
// definitions stay identical, so they cannot drift.

export const LEAD_STATUSES = [
  'new',
  'needs_review',
  'qualified',
  'awaiting_employer_information',
  'proposal_in_preparation',
  'proposal_sent',
  'negotiation',
  'won',
  'lost',
  'archived',
] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]

/** Statuses from which no further work is expected. */
export const TERMINAL_STATUSES: readonly LeadStatus[] = ['won', 'lost', 'archived']

export const ALLOWED_TRANSITIONS: Readonly<Record<LeadStatus, readonly LeadStatus[]>> = {
  new: ['needs_review', 'qualified', 'lost', 'archived'],
  needs_review: ['qualified', 'awaiting_employer_information', 'lost', 'archived'],
  qualified: ['awaiting_employer_information', 'proposal_in_preparation', 'lost', 'archived'],
  awaiting_employer_information: ['qualified', 'proposal_in_preparation', 'lost', 'archived'],
  proposal_in_preparation: ['proposal_sent', 'awaiting_employer_information', 'lost', 'archived'],
  proposal_sent: ['negotiation', 'won', 'lost', 'proposal_in_preparation', 'archived'],
  negotiation: ['proposal_in_preparation', 'won', 'lost', 'archived'],
  won: ['archived'],
  lost: ['archived'],
  archived: [],
}

export const canTransition = (from: LeadStatus, to: LeadStatus): boolean =>
  ALLOWED_TRANSITIONS[from]?.includes(to) ?? false

export class InvalidTransitionError extends Error {
  constructor(public readonly from: LeadStatus, public readonly to: LeadStatus) {
    super(`Invalid lead status transition: ${from} -> ${to}`)
    this.name = 'InvalidTransitionError'
  }
}

/** Throws unless the transition is permitted. Use before issuing an update. */
export function assertTransition(from: LeadStatus, to: LeadStatus): void {
  if (!canTransition(from, to)) throw new InvalidTransitionError(from, to)
}

/** Localized labels for the operator and employer workspaces. */
export const STATUS_LABELS: Record<'cs' | 'en' | 'de', Record<LeadStatus, string>> = {
  cs: {
    new: 'Nová',
    needs_review: 'K posouzení',
    qualified: 'Kvalifikovaná',
    awaiting_employer_information: 'Čeká na doplnění od zaměstnavatele',
    proposal_in_preparation: 'Nabídka se připravuje',
    proposal_sent: 'Nabídka odeslána',
    negotiation: 'Jednání',
    won: 'Uzavřeno',
    lost: 'Neúspěšné',
    archived: 'Archivováno',
  },
  en: {
    new: 'New',
    needs_review: 'Needs review',
    qualified: 'Qualified',
    awaiting_employer_information: 'Awaiting employer information',
    proposal_in_preparation: 'Proposal in preparation',
    proposal_sent: 'Proposal sent',
    negotiation: 'Negotiation',
    won: 'Won',
    lost: 'Lost',
    archived: 'Archived',
  },
  de: {
    new: 'Neu',
    needs_review: 'Zu prüfen',
    qualified: 'Qualifiziert',
    awaiting_employer_information: 'Wartet auf Angaben des Arbeitgebers',
    proposal_in_preparation: 'Angebot in Vorbereitung',
    proposal_sent: 'Angebot gesendet',
    negotiation: 'Verhandlung',
    won: 'Gewonnen',
    lost: 'Verloren',
    archived: 'Archiviert',
  },
}
