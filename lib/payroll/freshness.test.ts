import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { assessFreshness, verifiedOnFromSources, authoritiesFromSources } from './freshness'
import { CZ_2026_VERIFICATION, assessShippedRuleset } from './freshness-registry'
import { CZ_2026 } from './rules/cz-2026'
import { PAYROLL_SOURCES } from './sources'
import type { RuleRegistry } from './types'
import type { PayrollSource } from './sources'

// The year boundary is the whole point, and it cannot be tested by waiting for
// January. `today` is always an argument, never the clock.

const ruleset = (over: Partial<RuleRegistry> = {}) =>
  ({ ...CZ_2026, ...over }) as RuleRegistry

const V = { verifiedOn: '2026-07-18', reviewDueFrom: '2026-10-01', verifiedAgainst: ['ČSSZ'] }

describe('status across the effective window', () => {
  const cases: Array<[string, string]> = [
    ['2026-01-01', 'VERIFIED'],
    ['2026-07-18', 'VERIFIED'],
    ['2026-09-30', 'VERIFIED'],
    ['2026-10-01', 'REVIEW_DUE'],
    ['2026-12-31', 'REVIEW_DUE'],
    ['2027-01-01', 'STALE'],
    ['2030-06-01', 'STALE'],
    ['2025-12-31', 'DRAFT'],
  ]
  for (const [today, expected] of cases) {
    it(`${today} → ${expected}`, () => {
      expect(assessFreshness(ruleset(), V, today).status).toBe(expected)
    })
  }

  it('REVIEW_DUE still applies — it is a prompt to re-check, not a warning to the visitor', () => {
    const a = assessFreshness(ruleset(), V, '2026-11-15')
    expect(a.status).toBe('REVIEW_DUE')
    expect(a.requiresNotice).toBe(false)
  })

  it('STALE demands a visible notice', () => {
    expect(assessFreshness(ruleset(), V, '2027-02-01').requiresNotice).toBe(true)
  })
})

describe('the year boundary is safe', () => {
  it('does not invent next-year values — the assessment carries the OLD year', () => {
    const a = assessFreshness(ruleset(), V, '2027-03-01')
    expect(a.taxYear).toBe(2026)
    expect(a.effectiveTo).toBe('2026-12-31')
  })

  it('says what changed rather than guessing what it changed to', () => {
    const a = assessFreshness(ruleset(), V, '2027-01-01')
    expect(a.reason).toMatch(/past effectiveTo/)
    expect(a.reason).not.toMatch(/2027 (rate|value)/)
  })

  it('going stale never zeroes or alters the engine values', () => {
    // The rules object is untouched by assessment: same references, same numbers.
    const before = JSON.stringify(CZ_2026)
    assessShippedRuleset('2029-01-01')
    expect(JSON.stringify(CZ_2026)).toBe(before)
    expect(CZ_2026.minimumWageMonthly.value).toBeGreaterThan(0)
    expect(CZ_2026.employeeSocialRate.value).toBeGreaterThan(0)
  })

  it('a successor ruleset supersedes rather than leaving the old one VERIFIED', () => {
    const next = ruleset({ taxYear: 2027, effectiveFrom: '2027-01-01', effectiveTo: '2027-12-31' })
    const a = assessFreshness(ruleset(), V, '2027-05-01', [next])
    expect(a.status).toBe('SUPERSEDED')
    expect(a.reason).toContain('2027')
  })

  it('a successor that does not cover today does not supersede', () => {
    const next = ruleset({ taxYear: 2027, effectiveFrom: '2027-01-01', effectiveTo: '2027-12-31' })
    expect(assessFreshness(ruleset(), V, '2026-06-01', [next]).status).toBe('VERIFIED')
  })
})

describe('a verification claim must be earned', () => {
  it('a check made before the window opened is DRAFT, never VERIFIED', () => {
    const stale = { ...V, verifiedOn: '2025-11-02' }
    expect(assessFreshness(ruleset(), stale, '2026-06-01').status).toBe('DRAFT')
  })

  it('takes the OLDEST source access date — a claim is as strong as its weakest source', () => {
    const sources = [
      { accessed: '2026-07-18', authority: 'ČSSZ' },
      { accessed: '2024-01-01', authority: 'MPSV' },
    ] as PayrollSource[]
    expect(verifiedOnFromSources(sources)).toBe('2024-01-01')
  })

  it('refuses to produce a date when no source records one', () => {
    expect(() => verifiedOnFromSources([])).toThrow(/cannot be claimed/)
  })

  it('derives the authority list from the sources rather than from page copy', () => {
    const a = authoritiesFromSources(PAYROLL_SOURCES)
    expect(a).toContain('ČSSZ')
    expect(a).toContain('MPSV')
    expect(a.length).toBe(new Set(a).size)
  })

  it('rejects a malformed date instead of silently comparing strings', () => {
    expect(() => assessFreshness(ruleset(), V, '20/08/2026')).toThrow(/ISO date/)
    expect(() => assessFreshness(ruleset(), { ...V, reviewDueFrom: 'soon' }, '2026-08-20')).toThrow(/ISO date/)
  })
})

describe('the shipped ruleset', () => {
  it('has exactly one recorded verification date, and the page does not carry a second', () => {
    const page = fs.readFileSync(path.join(process.cwd(), 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx'), 'utf8')
    expect(CZ_2026_VERIFICATION.verifiedOn).toBe(verifiedOnFromSources(PAYROLL_SOURCES))
    expect(page).toContain('const LAST_VERIFIED = CZ_2026_VERIFICATION.verifiedOn')
    expect(page, 'the page must not hardcode a verification date').not.toMatch(/const LAST_VERIFIED = '\d{4}-\d{2}-\d{2}'/)
  })

  it('declares a review date inside its own effective window', () => {
    expect(CZ_2026.reviewDueFrom >= CZ_2026.effectiveFrom).toBe(true)
    expect(CZ_2026.reviewDueFrom <= CZ_2026.effectiveTo).toBe(true)
  })

  it('has an effective window matching its tax year', () => {
    expect(CZ_2026.effectiveFrom).toBe(`${CZ_2026.taxYear}-01-01`)
    expect(CZ_2026.effectiveTo).toBe(`${CZ_2026.taxYear}-12-31`)
  })

  it('every authority named in the page copy is backed by a real source', () => {
    const page = fs.readFileSync(path.join(process.cwd(), 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx'), 'utf8')
    const authorities = authoritiesFromSources(PAYROLL_SOURCES)
    // The page names these four institutions as having been checked.
    for (const named of ['ČSSZ', 'MPSV', 'VZP']) {
      expect(page).toContain(named)
      expect(authorities.some((a) => a.includes(named)), `page claims ${named}, which no source supplies`).toBe(true)
    }
  })
})
