// Canonical Czech terminology registry (typed view over czech-terms.json).
//
// Czech is the primary market version of TalentPartnerID, so terminology must be
// consistent and precise across every Czech surface. This module is the single
// typed source for the app and tests; scripts/validate-czech.js reads the same
// JSON so the gate and the product can never drift apart.
//
// The registry describes APPROVED terms and their definitions (aligned with the
// on-site glossary at /slovnik-pojmu-pro-zamestnavatele), the role distinctions
// that must stay clear (zaměstnavatel vs. uživatel vs. agentura vs. zaměstnanec
// vs. uchazeč vs. cizinec), and the phrasing that must never ship (unsupported
// superlatives, guarantee/urgency claims, unverified permit/endorsement claims).

import registry from './czech-terms.json'

export type TermCategory =
  | 'subjekt' | 'role' | 'cinnost' | 'dokument' | 'ekonomika' | 'provoz' | 'zazemi' | 'compliance'

export interface CzechTerm {
  id: string
  term: string
  category: TermCategory
  definition: string
  /** Preferred canonical form to use in prose. */
  prefer?: string
  /** Non-canonical variants/calques a validator surfaces as review candidates. */
  flag?: string[]
  flagSeverity?: 'info' | 'warn'
  flagNote?: string
  note?: string
  allowedEnglish?: string
  englishAccepted?: boolean
}

export const CZECH_TERMS: readonly CzechTerm[] = registry.terms as readonly CzechTerm[]
export const ROLE_DISTINCTIONS: readonly string[] = registry.roleDistinctions
export const ALLOWED_ENGLISH: readonly string[] = registry.allowedEnglish
export const FORBIDDEN_SUPERLATIVES: readonly string[] = registry.forbiddenSuperlatives
export const FORBIDDEN_CLAIMS: readonly string[] = registry.forbiddenClaims
export const FAKE_URGENCY: readonly string[] = registry.fakeUrgency
export const TERMS_VERSION: string = registry.version

const BY_ID = new Map(CZECH_TERMS.map((t) => [t.id, t]))
const BY_TERM = new Map(CZECH_TERMS.map((t) => [t.term.toLowerCase(), t]))

/** Look up an approved term by its id (e.g. 'agentura-prace'). */
export const termById = (id: string): CzechTerm | undefined => BY_ID.get(id)

/** Look up an approved term by its exact Czech form (case-insensitive). */
export const termByName = (term: string): CzechTerm | undefined => BY_TERM.get(term.toLowerCase())
