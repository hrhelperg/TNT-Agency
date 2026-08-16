import { describe, it, expect } from 'vitest'
import {
  FIELDS,
  GROUPS,
  EMPTY_INPUTS,
  MAX_INPUT,
  parseField,
  computeVacancyCost,
  type Inputs,
} from './model'

const withInputs = (partial: Partial<Inputs>): Inputs => ({ ...EMPTY_INPUTS, ...partial })
const lineFor = (input: Inputs, group: string) =>
  computeVacancyCost(input).lines.find((l) => l.group === group)!

describe('vacancy-cost input parsing', () => {
  it('treats an empty field as zero rather than an error', () => {
    expect(parseField('')).toEqual({ value: 0 })
    expect(parseField('   ')).toEqual({ value: 0 })
  })

  it('rejects a negative number instead of silently flipping its sign', () => {
    const r = parseField('-500')
    expect(r.error).toBe('negative')
    expect(r.value).toBe(0)
  })

  it('rejects text', () => {
    expect(parseField('abc').error).toBe('notANumber')
  })

  it('accepts decimals with either separator — a Czech keyboard produces a comma', () => {
    expect(parseField('7.5').value).toBe(7.5)
    expect(parseField('7,5').value).toBe(7.5)
  })

  it('accepts spaced thousands as typed by Czech users', () => {
    expect(parseField('12 000').value).toBe(12000)
  })

  it('clamps an out-of-range value and says so, rather than producing Infinity', () => {
    const r = parseField('1e18')
    expect(r.error).toBe('tooLarge')
    expect(r.value).toBe(MAX_INPUT)
    expect(Number.isFinite(r.value)).toBe(true)
  })
})

describe('vacancy-cost calculation', () => {
  it('shows nothing when nothing has been entered — there is no default amount', () => {
    const r = computeVacancyCost(EMPTY_INPUTS)
    expect(r.isEmpty).toBe(true)
    expect(r.total).toBe(0)
    expect(r.lines.every((l) => l.amount === 0)).toBe(true)
  })

  it('multiplies vacancy duration by daily contribution', () => {
    const input = withInputs({ vacancyDays: 30, dailyContribution: 4000 })
    expect(lineFor(input, 'durationCost').amount).toBe(120000)
    expect(computeVacancyCost(input).total).toBe(120000)
  })

  it('applies duration to both overtime and contractor coverage', () => {
    const input = withInputs({ vacancyDays: 10, overtimePerDay: 1500, contractorPerDay: 2500 })
    expect(lineFor(input, 'temporaryCoverage').amount).toBe(40000)
  })

  it('multiplies recruiter hours by the recruiter hourly cost', () => {
    const input = withInputs({ recruiterHours: 12, recruiterHourlyCost: 450 })
    expect(lineFor(input, 'internalRecruitment').amount).toBe(5400)
  })

  it('multiplies manager hours by the manager hourly cost', () => {
    const input = withInputs({ managerHours: 6, managerHourlyCost: 900 })
    expect(lineFor(input, 'managementTime').amount).toBe(5400)
  })

  it('carries one-off costs through unmultiplied', () => {
    const input = withInputs({ advertisingCost: 8000, projectDelayCost: 50000 })
    expect(lineFor(input, 'advertising').amount).toBe(8000)
    expect(lineFor(input, 'operationalImpact').amount).toBe(50000)
  })

  it('sums onboarding and other costs into one line', () => {
    const input = withInputs({ onboardingCost: 3000, otherCost: 1500 })
    expect(lineFor(input, 'otherCosts').amount).toBe(4500)
  })

  it('handles a single component with every other line at zero', () => {
    const input = withInputs({ advertisingCost: 8000 })
    const r = computeVacancyCost(input)
    expect(r.total).toBe(8000)
    expect(r.lines.filter((l) => l.amount !== 0)).toHaveLength(1)
  })

  it('reconciles: the total is exactly the sum of the displayed lines', () => {
    const input = withInputs({
      vacancyDays: 45,
      dailyContribution: 3200,
      overtimePerDay: 800,
      contractorPerDay: 1200,
      recruiterHours: 18.5,
      recruiterHourlyCost: 420,
      managerHours: 7,
      managerHourlyCost: 950,
      advertisingCost: 12000,
      projectDelayCost: 60000,
      onboardingCost: 5000,
      otherCost: 2500,
    })
    const r = computeVacancyCost(input)
    const summed = r.lines.reduce((s, l) => s + l.amount, 0)
    expect(r.total).toBe(Math.round(summed * 100) / 100)
    expect(r.isEmpty).toBe(false)
  })

  it('keeps decimal money exact to two places instead of drifting on floats', () => {
    const input = withInputs({ recruiterHours: 0.1, recruiterHourlyCost: 0.2 })
    expect(lineFor(input, 'internalRecruitment').amount).toBe(0.02)
  })

  it('stays finite and exact at the top of the supported range', () => {
    const input = withInputs({ vacancyDays: 1000, dailyContribution: MAX_INPUT })
    const r = computeVacancyCost(input)
    expect(Number.isFinite(r.total)).toBe(true)
  })

  it('exposes the operands so the UI can show the arithmetic, not just the answer', () => {
    const input = withInputs({ vacancyDays: 30, dailyContribution: 4000 })
    expect(lineFor(input, 'durationCost').factors).toEqual([30, 4000])
  })

  it('produces exactly one line per declared group', () => {
    const r = computeVacancyCost(EMPTY_INPUTS)
    expect(r.lines.map((l) => l.group).sort()).toEqual([...GROUPS].sort())
  })

  it('starts every field at zero — no market average is pre-filled', () => {
    expect(FIELDS.every((f) => EMPTY_INPUTS[f.name] === 0)).toBe(true)
  })
})
