// Vacancy-cost model.
//
// Every number in this file comes from the employer. There is no benchmark, no
// "average cost of a vacancy", no assumed time-to-hire and no assumed
// productivity loss — because we do not have those figures for the reader's
// operation, and inventing them would turn a planning aid into a sales prop.
//
// The model is therefore deliberately boring: it multiplies and adds what the
// employer typed, groups the result so the arithmetic is legible, and shows the
// formula for every line. An employer who disagrees with a line can set it to
// zero and the total follows.
//
// Pure functions only — no React, no DOM, no storage, no network. The tool
// component owns all of that, which is what makes the privacy tests meaningful.

/** How an input is entered, so the UI can label it and the model can use it. */
export type Unit = 'days' | 'perDay' | 'hours' | 'perHour' | 'oneTime'

export type FieldName =
  | 'vacancyDays'
  | 'dailyContribution'
  | 'overtimePerDay'
  | 'contractorPerDay'
  | 'recruiterHours'
  | 'recruiterHourlyCost'
  | 'managerHours'
  | 'managerHourlyCost'
  | 'advertisingCost'
  | 'projectDelayCost'
  | 'onboardingCost'
  | 'otherCost'

export type GroupName =
  | 'durationCost'
  | 'temporaryCoverage'
  | 'internalRecruitment'
  | 'advertising'
  | 'managementTime'
  | 'operationalImpact'
  | 'otherCosts'

export interface FieldSpec {
  name: FieldName
  unit: Unit
  /** Which breakdown line this feeds. */
  group: GroupName
}

/**
 * Field order is the form order and the reading order of the result. Grouping a
 * quantity next to its rate (hours beside hourly cost) keeps the multiplication
 * visible while the employer types it.
 */
export const FIELDS: readonly FieldSpec[] = [
  { name: 'vacancyDays', unit: 'days', group: 'durationCost' },
  { name: 'dailyContribution', unit: 'perDay', group: 'durationCost' },
  { name: 'overtimePerDay', unit: 'perDay', group: 'temporaryCoverage' },
  { name: 'contractorPerDay', unit: 'perDay', group: 'temporaryCoverage' },
  { name: 'recruiterHours', unit: 'hours', group: 'internalRecruitment' },
  { name: 'recruiterHourlyCost', unit: 'perHour', group: 'internalRecruitment' },
  { name: 'managerHours', unit: 'hours', group: 'managementTime' },
  { name: 'managerHourlyCost', unit: 'perHour', group: 'managementTime' },
  { name: 'advertisingCost', unit: 'oneTime', group: 'advertising' },
  { name: 'projectDelayCost', unit: 'oneTime', group: 'operationalImpact' },
  { name: 'onboardingCost', unit: 'oneTime', group: 'otherCosts' },
  { name: 'otherCost', unit: 'oneTime', group: 'otherCosts' },
]

export const GROUPS: readonly GroupName[] = [
  'durationCost',
  'temporaryCoverage',
  'internalRecruitment',
  'advertising',
  'managementTime',
  'operationalImpact',
  'otherCosts',
]

export type Inputs = Record<FieldName, number>

export const EMPTY_INPUTS: Inputs = FIELDS.reduce(
  (acc, f) => ({ ...acc, [f.name]: 0 }),
  {} as Inputs,
)

export type ParseError = 'notANumber' | 'negative' | 'tooLarge'

/**
 * Upper bound per field. Not a business rule — a guard so a pasted digit string
 * cannot produce Infinity or a total that silently loses precision in float
 * arithmetic. 1e12 CZK is far beyond any real vacancy while staying exact.
 */
export const MAX_INPUT = 1e12

export interface ParsedField {
  value: number
  error?: ParseError
}

/** Parses one raw form value. Blank is 0, not an error: most lines stay unused. */
export function parseField(raw: string): ParsedField {
  const trimmed = raw.trim()
  if (trimmed === '') return { value: 0 }
  // Accept both decimal separators — Czech keyboards produce a comma.
  const normalised = trimmed.replace(/\s/g, '').replace(',', '.')
  const n = Number(normalised)
  if (!Number.isFinite(n)) return { value: 0, error: 'notANumber' }
  if (n < 0) return { value: 0, error: 'negative' }
  if (n > MAX_INPUT) return { value: MAX_INPUT, error: 'tooLarge' }
  return { value: n }
}

export interface BreakdownLine {
  group: GroupName
  /** Operands in reading order, so the UI can render "12 × 4 000 = 48 000". */
  factors: number[]
  amount: number
}

export interface Breakdown {
  lines: BreakdownLine[]
  total: number
  /** True when the employer has entered nothing yet. */
  isEmpty: boolean
}

const round2 = (n: number) => Math.round(n * 100) / 100

/**
 * The whole calculation. Each line states its own arithmetic; the total is the
 * sum of the lines, so the result reconciles by construction rather than by a
 * separate formula that could drift from the parts.
 */
export function computeVacancyCost(input: Inputs): Breakdown {
  const days = input.vacancyDays

  const line = (group: GroupName, factors: number[], amount: number): BreakdownLine => ({
    group,
    factors,
    amount: round2(amount),
  })

  const lines: BreakdownLine[] = [
    line('durationCost', [days, input.dailyContribution], days * input.dailyContribution),
    line(
      'temporaryCoverage',
      [days, input.overtimePerDay + input.contractorPerDay],
      days * (input.overtimePerDay + input.contractorPerDay),
    ),
    line(
      'internalRecruitment',
      [input.recruiterHours, input.recruiterHourlyCost],
      input.recruiterHours * input.recruiterHourlyCost,
    ),
    line('advertising', [input.advertisingCost], input.advertisingCost),
    line(
      'managementTime',
      [input.managerHours, input.managerHourlyCost],
      input.managerHours * input.managerHourlyCost,
    ),
    line('operationalImpact', [input.projectDelayCost], input.projectDelayCost),
    line(
      'otherCosts',
      [input.onboardingCost, input.otherCost],
      input.onboardingCost + input.otherCost,
    ),
  ]

  return {
    lines,
    total: round2(lines.reduce((sum, l) => sum + l.amount, 0)),
    isEmpty: FIELDS.every((f) => input[f.name] === 0),
  }
}
