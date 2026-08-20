// Payroll freshness gate.
//
// Why this exists
// ───────────────
// The calculator asserted "pravidla pro rok 2026, ověřená k 2026-07-18 u ČSSZ,
// Finanční správy, MPSV a VZP" from a string constant typed into the page,
// while the ruleset's own `effectiveFrom` / `effectiveTo` had no consumer at
// all. Nothing connected the claim to the data, so the page would have gone on
// making it in January 2027 — when the annual decrees change the minimum wage,
// the average wage, the 23 % threshold and the maximum assessment base, and
// every figure on the page is wrong while still labelled verified.
//
// What this gate does NOT do
// ──────────────────────────
// It does not impose a freshness interval. Czech payroll parameters move on an
// annual decree cycle effective 1 January; "verified more than N days ago" is
// not a fact about this domain. The gate checks that the DATA is internally
// consistent and that the page derives its claims from it — not that a value
// is young.
//
// It also does not decide whether the sources were really checked. It cannot:
// only a person opening those pages can establish that. What it can do is
// refuse to let the recorded date drift ahead of the sources, refuse a page
// that hardcodes its own date, and refuse a VERIFIED claim the window does not
// support.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/validate-payroll-freshness.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')

const CALC_PAGE = 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx'

const { CZ_2026 } = await import('../lib/payroll/rules/cz-2026.ts')
const { PAYROLL_SOURCES } = await import('../lib/payroll/sources.ts')
const { assessFreshness, verifiedOnFromSources } = await import('../lib/payroll/freshness.ts')
const { CZ_2026_VERIFICATION } = await import('../lib/payroll/freshness-registry.ts')

const ISO = /^\d{4}-\d{2}-\d{2}$/

/**
 * Strip comments before scanning for year claims.
 *
 * Comments legitimately discuss other years — this gate exists because of what
 * happens in January 2027, and saying so is not a claim the page makes to a
 * visitor. What reaches a visitor is string literals, which survive stripping.
 */
const code = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

export function auditPayrollFreshness({
  registry = CZ_2026,
  sources = PAYROLL_SOURCES,
  verification = CZ_2026_VERIFICATION,
  page = read(CALC_PAGE),
  today,
} = {}) {
  const errors = []
  const notes = []

  // 1. The ruleset must describe its own validity completely.
  for (const f of ['effectiveFrom', 'effectiveTo', 'reviewDueFrom']) {
    if (!ISO.test(registry[f] ?? '')) errors.push(`ruleset.${f} is not an ISO date ("${registry[f]}") — freshness cannot be assessed`)
  }
  if (registry.effectiveFrom !== `${registry.taxYear}-01-01` || registry.effectiveTo !== `${registry.taxYear}-12-31`) {
    errors.push(`ruleset effective window ${registry.effectiveFrom}–${registry.effectiveTo} does not match taxYear ${registry.taxYear}`)
  }
  if (ISO.test(registry.reviewDueFrom ?? '') && (registry.reviewDueFrom < registry.effectiveFrom || registry.reviewDueFrom > registry.effectiveTo)) {
    errors.push(`ruleset.reviewDueFrom ${registry.reviewDueFrom} falls outside its own effective window`)
  }

  // 2. effectiveFrom / effectiveTo must actually be consumed.
  //
  // They were dead fields for the whole life of the module. A gate that only
  // checked their VALUES would have passed then too.
  const consumers = ['lib/payroll/freshness.ts', 'lib/payroll/freshness-registry.ts']
  for (const f of ['effectiveFrom', 'effectiveTo', 'reviewDueFrom']) {
    if (!consumers.some((c) => read(c).includes(f))) {
      errors.push(`ruleset.${f} has no consumer — it is documentation pretending to be a rule`)
    }
  }

  // 3. One verification date, derived from the sources.
  const derived = verifiedOnFromSources(sources)
  if (verification.verifiedOn !== derived) {
    errors.push(`verification date ${verification.verifiedOn} does not match the oldest source access date ${derived}`)
  }
  if (verification.verifiedOn > registry.effectiveTo) {
    errors.push(`verification date ${verification.verifiedOn} is after the ruleset's own window closes — impossible`)
  }
  for (const s of sources) {
    if (!ISO.test(s.accessed ?? '')) errors.push(`source "${s.id}" has no ISO access date — it cannot support a verification claim`)
    if (ISO.test(s.accessed ?? '') && s.accessed < registry.effectiveFrom) {
      errors.push(`source "${s.id}" was accessed ${s.accessed}, before the ${registry.taxYear} rules existed — it cannot verify them`)
    }
  }

  // 4. The page must derive, not restate.
  const pageCode = code(page)
  if (/const LAST_VERIFIED = ['"]\d{4}-\d{2}-\d{2}['"]/.test(pageCode)) {
    errors.push(`${CALC_PAGE}: hardcodes a verification date — it must derive from the ruleset, or the two can disagree`)
  }
  if (!pageCode.includes('CZ_2026_VERIFICATION.verifiedOn')) {
    errors.push(`${CALC_PAGE}: does not derive its verification date from the ruleset`)
  }
  // A rule-year claim in prose must interpolate, not hardcode.
  for (const m of pageCode.matchAll(/pravidla (?:pro rok|ČR) (\d{4})/gi)) {
    errors.push(`${CALC_PAGE}: hardcodes rule year ${m[1]} in a claim about the ruleset — interpolate the tax year instead`)
  }

  // 5. Titles and slugs legitimately carry a literal year. They are content and
  // must not silently disagree with the ruleset.
  const literalYears = new Set([...pageCode.matchAll(/\b(20\d{2})\b/g)].map((m) => Number(m[1])))
  literalYears.delete(registry.taxYear)
  const foreign = [...literalYears].filter((y) => y >= 2020 && y <= 2100)
  if (foreign.length) {
    errors.push(`${CALC_PAGE}: mentions year(s) ${foreign.join(', ')} while the ruleset is ${registry.taxYear} — update the copy deliberately or the page and the data disagree`)
  }

  // 6. Status must be supportable. Assessed only when a date is supplied: this
  // gate must not silently depend on the day it happens to run.
  if (today) {
    const a = assessFreshness(registry, verification, today)
    notes.push(`assessed ${today}: ${a.status} — ${a.reason}`)
    if (a.status === 'STALE' || a.status === 'SUPERSEDED') {
      errors.push(`ruleset is ${a.status} as of ${today} (${a.reason}) — ship an updated ruleset rather than relabelling this one`)
    }
    if (!pageCode.includes('assessShippedRuleset')) {
      errors.push(`${CALC_PAGE}: does not assess freshness at runtime, so a stale build would keep claiming currency`)
    }
  }

  notes.push(`ruleset ${registry.taxYear}: ${registry.effectiveFrom}→${registry.effectiveTo}, review due ${registry.reviewDueFrom}, verified ${verification.verifiedOn}`)
  notes.push(`${sources.length} sources, ${verification.verifiedAgainst.length} distinct authorities`)
  return { errors, notes }
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  // The runtime date is passed explicitly so the gate's behaviour is a function
  // of its input, and so CI failing "one day" is a real signal, not a surprise.
  const today = process.env.PAYROLL_TODAY || new Date().toISOString().slice(0, 10)
  const { errors, notes } = auditPayrollFreshness({ today })
  console.log('Payroll freshness gate')
  for (const n of notes) console.log(`  · ${n}`)
  if (errors.length) {
    console.error(`\n${errors.length} freshness violation(s):`)
    for (const e of errors) console.error(`  ✗ ${e}`)
    console.error('\nPayroll freshness gate: FAIL')
    process.exit(1)
  }
  console.log('\nPayroll freshness gate: PASS')
}
