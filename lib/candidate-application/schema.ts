/**
 * Candidate application field schema.
 *
 * One typed schema drives the form UI, the validation, the generated email and
 * the tests, so a field cannot exist in the UI and be missing from the message.
 * Modelled on lib/employer-request/schema.ts, which has the same property for
 * the employer side.
 *
 * DELIBERATELY SMALL. §18 says collect no more personal data than necessary,
 * and a candidate audience makes that concrete: date of birth, marital status,
 * photograph, passport number and nationality are all things a recruiter does
 * not need to decide whether to read a CV, and all things that cost the
 * candidate if mishandled. None is asked for here. The CV the candidate
 * attaches may contain some of them — which is why the data notice says so, and
 * says they may remove them.
 */

export type FieldKind = 'text' | 'email' | 'tel' | 'select' | 'textarea' | 'checkbox'

/** Groups map 1:1 to the sections of the generated email, in this order. */
export const APPLICATION_GROUPS = ['about', 'work', 'contact'] as const
export type ApplicationGroup = (typeof APPLICATION_GROUPS)[number]

export interface ApplicationField {
  readonly name: string
  readonly group: ApplicationGroup
  readonly kind: FieldKind
  readonly required: boolean
  readonly options?: readonly string[]
  readonly autoComplete?: string
  readonly maxLength?: number
}

/**
 * Occupation families, matching the frozen route matrix.
 *
 * Engineering first — P1 established that CZ-ISCO 1-3 is the only band with a
 * territorially open programme route for Latin-American candidates, so it leads
 * here for the same reason it leads the corpus.
 */
export const FIELDS_OF_WORK = [
  'engineering',
  'technical',
  'manufacturing',
  'logistics',
  'healthcare',
  'other',
] as const

export const EXPERIENCE_BANDS = ['lt1', '1to3', '3to5', '5to10', 'gt10'] as const

export const AVAILABILITY = ['immediately', 'within3months', 'later', 'unsure'] as const

export const APPLICATION_FIELDS: readonly ApplicationField[] = [
  { name: 'fullName', group: 'about', kind: 'text', required: true, autoComplete: 'name', maxLength: 120 },
  { name: 'country', group: 'about', kind: 'text', required: true, autoComplete: 'country-name', maxLength: 80 },
  { name: 'city', group: 'about', kind: 'text', required: false, autoComplete: 'address-level2', maxLength: 80 },

  { name: 'fieldOfWork', group: 'work', kind: 'select', required: true, options: FIELDS_OF_WORK },
  { name: 'currentRole', group: 'work', kind: 'text', required: true, maxLength: 120 },
  { name: 'experience', group: 'work', kind: 'select', required: true, options: EXPERIENCE_BANDS },
  { name: 'languages', group: 'work', kind: 'text', required: false, maxLength: 160 },
  { name: 'availability', group: 'work', kind: 'select', required: true, options: AVAILABILITY },
    // 600, not 1200. Measured: the encoded mailto href crosses 2,000 characters
  // at roughly 480 characters of accented Portuguese, and mail handlers
  // truncate near 2,048. A limit the transport cannot carry is not a limit.
  { name: 'message', group: 'work', kind: 'textarea', required: false, maxLength: 600 },

  { name: 'email', group: 'contact', kind: 'email', required: true, autoComplete: 'email', maxLength: 160 },
  { name: 'phone', group: 'contact', kind: 'tel', required: false, autoComplete: 'tel', maxLength: 40 },
  { name: 'consent', group: 'contact', kind: 'checkbox', required: true },
]

export type ApplicationValues = Record<string, string | boolean | undefined>

export const fieldByName = (name: string): ApplicationField | undefined =>
  APPLICATION_FIELDS.find((f) => f.name === name)

export const fieldsInGroup = (group: ApplicationGroup): readonly ApplicationField[] =>
  APPLICATION_FIELDS.filter((f) => f.group === group)
