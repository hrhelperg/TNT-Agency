// Employer staffing-request field schema (Phase C3).
//
// One typed schema drives the form UI, validation, the mailto body and the
// tests, so a field can never exist in the UI but be missing from the email
// (or vice versa). No field value is ever placed in the URL, storage, history
// or analytics — see lib/employer-request/mailto.ts and the privacy tests.

export type FieldKind = 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox'

/** Groups map 1:1 to the sections of the generated email, in this order. */
export const REQUEST_GROUPS = [
  'company',
  'workplace',
  'role',
  'schedule',
  'conditions',
  'contact',
] as const

export type RequestGroup = (typeof REQUEST_GROUPS)[number]

export interface RequestField {
  /** Stable key: form name, copy key, and email label key. */
  name: string
  group: RequestGroup
  kind: FieldKind
  required: boolean
  /** Option value list for selects/radios; labels come from the copy registry. */
  options?: readonly string[]
  /** HTML autocomplete token, where a standard one applies. */
  autoComplete?: string
  min?: number
  max?: number
  maxLength?: number
}

export const EMPLOYMENT_MODELS = ['agency', 'recruitment', 'unsure'] as const
export const SHIFT_MODELS = ['single', 'two-shift', 'three-shift', 'continuous', 'flexible', 'unsure'] as const
export const DURATIONS = ['short-term', 'seasonal', 'long-term', 'permanent', 'unsure'] as const
export const YES_NO_MAYBE = ['yes', 'no', 'unsure'] as const
export const CONTACT_METHODS = ['email', 'phone', 'either'] as const

/**
 * Czech regions (kraje) — used for the workplace region select. Values are
 * stable slugs; localized labels live in the copy registry.
 */
export const CZ_REGIONS = [
  'praha', 'stredocesky', 'jihocesky', 'plzensky', 'karlovarsky', 'ustecky',
  'liberecky', 'kralovehradecky', 'pardubicky', 'vysocina', 'jihomoravsky',
  'olomoucky', 'zlinsky', 'moravskoslezsky',
] as const

export const REQUEST_FIELDS: readonly RequestField[] = [
  // ── Company ──────────────────────────────────────────────────────────
  { name: 'companyName', group: 'company', kind: 'text', required: true, autoComplete: 'organization', maxLength: 160 },
  { name: 'contactName', group: 'company', kind: 'text', required: true, autoComplete: 'name', maxLength: 120 },
  { name: 'email', group: 'company', kind: 'email', required: true, autoComplete: 'email', maxLength: 160 },
  { name: 'phone', group: 'company', kind: 'tel', required: false, autoComplete: 'tel', maxLength: 40 },

  // ── Workplace ────────────────────────────────────────────────────────
  { name: 'workplaceCity', group: 'workplace', kind: 'text', required: true, autoComplete: 'address-level2', maxLength: 120 },
  { name: 'workplaceRegion', group: 'workplace', kind: 'select', required: true, options: CZ_REGIONS },

  // ── Role ─────────────────────────────────────────────────────────────
  { name: 'profession', group: 'role', kind: 'text', required: true, maxLength: 160 },
  { name: 'headcount', group: 'role', kind: 'number', required: true, min: 1, max: 5000 },
  { name: 'employmentModel', group: 'role', kind: 'select', required: true, options: EMPLOYMENT_MODELS },
  { name: 'experience', group: 'role', kind: 'textarea', required: false, maxLength: 800 },
  { name: 'languages', group: 'role', kind: 'text', required: false, maxLength: 300 },

  // ── Schedule ─────────────────────────────────────────────────────────
  { name: 'startDate', group: 'schedule', kind: 'date', required: false },
  { name: 'duration', group: 'schedule', kind: 'select', required: false, options: DURATIONS },
  { name: 'shiftModel', group: 'schedule', kind: 'select', required: false, options: SHIFT_MODELS },
  { name: 'weeklyHours', group: 'schedule', kind: 'number', required: false, min: 1, max: 60 },

  // ── Conditions ───────────────────────────────────────────────────────
  { name: 'accommodation', group: 'conditions', kind: 'select', required: false, options: YES_NO_MAYBE },
  { name: 'transport', group: 'conditions', kind: 'select', required: false, options: YES_NO_MAYBE },
  { name: 'ppe', group: 'conditions', kind: 'textarea', required: false, maxLength: 600 },
  { name: 'medicalExam', group: 'conditions', kind: 'textarea', required: false, maxLength: 600 },
  { name: 'foreignWorkerSupport', group: 'conditions', kind: 'select', required: false, options: YES_NO_MAYBE },
  { name: 'budget', group: 'conditions', kind: 'text', required: false, maxLength: 160 },
  { name: 'notes', group: 'conditions', kind: 'textarea', required: false, maxLength: 2000 },

  // ── Contact preferences + consent ────────────────────────────────────
  { name: 'preferredContact', group: 'contact', kind: 'select', required: false, options: CONTACT_METHODS },
  { name: 'consent', group: 'contact', kind: 'checkbox', required: true },
]

export type RequestValues = Record<string, string | boolean>

export const fieldByName = (name: string): RequestField | undefined =>
  REQUEST_FIELDS.find((f) => f.name === name)

export const requiredFieldNames = (): string[] =>
  REQUEST_FIELDS.filter((f) => f.required).map((f) => f.name)

/** Fields whose values are free text the employer typed about their business. */
export const fieldsInGroup = (group: RequestGroup): RequestField[] =>
  REQUEST_FIELDS.filter((f) => f.group === group)
