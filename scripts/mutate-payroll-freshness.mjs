// Mutation tests for the payroll freshness gate.
//
// The defect this gate exists to stop is silent: nothing crashes when a page
// keeps calling last year's rules "verified". So the gate's value is entirely
// in what it refuses, and that has to be demonstrated rather than assumed.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/mutate-payroll-freshness.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { auditPayrollFreshness } from './validate-payroll-freshness.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')
const PAGE = read('pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx')

const { CZ_2026 } = await import('../lib/payroll/rules/cz-2026.ts')
const { PAYROLL_SOURCES } = await import('../lib/payroll/sources.ts')
const { CZ_2026_VERIFICATION } = await import('../lib/payroll/freshness-registry.ts')

const run = (over = {}) => auditPayrollFreshness({ page: PAGE, today: '2026-08-20', ...over })

const MUTATIONS = [
  {
    name: '1. the original defect: the page hardcodes its own verification date',
    expect: /hardcodes a verification date/,
    run: () => run({ page: PAGE.replace('const LAST_VERIFIED = CZ_2026_VERIFICATION.verifiedOn', "const LAST_VERIFIED = '2026-07-18'") }),
  },
  {
    name: '2. a rule-year claim hardcoded in visitor-facing copy',
    expect: /hardcodes rule year 2026 in a claim/,
    run: () => run({ page: PAGE.replace('pravidla pro rok ${RULE_YEAR}', 'pravidla pro rok 2026') }),
  },
  {
    name: '3. the ruleset rolls to a new tax year but the copy does not',
    expect: /mentions year\(s\) .* while the ruleset is 2027/,
    run: () => run({
      registry: { ...CZ_2026, taxYear: 2027, effectiveFrom: '2027-01-01', effectiveTo: '2027-12-31', reviewDueFrom: '2027-10-01' },
      verification: { ...CZ_2026_VERIFICATION, verifiedOn: '2027-02-01' },
      sources: PAYROLL_SOURCES.map((s) => ({ ...s, accessed: '2027-02-01' })),
      today: '2027-03-01',
    }),
  },
  {
    name: '4. the effective window stops matching the tax year',
    expect: /does not match taxYear/,
    run: () => run({ registry: { ...CZ_2026, effectiveTo: '2027-12-31' } }),
  },
  {
    name: '5. the ruleset goes stale and is relabelled instead of replaced',
    expect: /ruleset is STALE as of 2027-04-01/,
    run: () => run({ today: '2027-04-01' }),
  },
  {
    name: '6. the verification date drifts ahead of the sources behind it',
    expect: /does not match the oldest source access date/,
    run: () => run({ verification: { ...CZ_2026_VERIFICATION, verifiedOn: '2026-12-01' } }),
  },
  {
    name: '7. effectiveFrom becomes a dead field again',
    expect: /effectiveFrom has no consumer/,
    run: () => {
      // Drive the real rule by pointing it at a tree where nothing consumes it.
      const orig = read('lib/payroll/freshness.ts')
      const tmp = path.join(ROOT, 'lib/payroll/freshness.ts')
      fs.writeFileSync(tmp, orig.replace(/effectiveFrom/g, 'windowOpens'))
      try { return run() } finally { fs.writeFileSync(tmp, orig) }
    },
  },
  {
    name: '8. a source predating the rules it claims to verify',
    expect: /accessed 2024-01-01, before the 2026 rules existed/,
    run: () => run({ sources: PAYROLL_SOURCES.map((s, i) => (i === 0 ? { ...s, accessed: '2024-01-01' } : s)) }),
  },
  {
    name: '9. reviewDueFrom placed outside the window it governs',
    expect: /falls outside its own effective window/,
    run: () => run({ registry: { ...CZ_2026, reviewDueFrom: '2027-03-01' } }),
  },
  {
    name: '10. the page stops assessing freshness at runtime',
    expect: /does not assess freshness at runtime/,
    run: () => run({ page: PAGE.replace(/assessShippedRuleset/g, 'noop') }),
  },
]

let failures = 0
console.log('Mutation tests — payroll freshness gate\n')

const control = run()
if (control.errors.length) {
  console.error(`  ✗ CONTROL: the real tree already fails (${control.errors.length})`)
  for (const e of control.errors.slice(0, 4)) console.error(`      ${e}`)
  failures++
} else {
  console.log('  ✓ control: the real tree passes at 2026-08-20')
}

for (const m of MUTATIONS) {
  const { errors } = m.run()
  if (errors.some((e) => m.expect.test(e))) console.log(`  ✓ ${m.name}`)
  else {
    console.error(`  ✗ ${m.name}\n      NOT CAUGHT — ${errors.length} error(s), none matching ${m.expect}`)
    if (errors.length) console.error(`      first: ${errors[0]}`)
    failures++
  }
}

// Negative controls: legitimate states must NOT fail.
{
  const reviewDue = run({ today: '2026-11-01' })
  if (!reviewDue.errors.length) console.log('  ✓ negative control: REVIEW_DUE is not a build failure — the rules still apply')
  else { console.error(`  ✗ negative control: REVIEW_DUE failed the build: ${reviewDue.errors[0]}`); failures++ }

  const lastDay = run({ today: '2026-12-31' })
  if (!lastDay.errors.length) console.log('  ✓ negative control: the last day of the window still passes')
  else { console.error(`  ✗ negative control: ${lastDay.errors[0]}`); failures++ }
}

console.log(failures
  ? `\nMutation tests: FAIL — ${failures} check(s) did not behave as specified`
  : `\nMutation tests: PASS — ${MUTATIONS.length} defects caught, control + 2 negative controls correct`)
process.exit(failures ? 1 : 0)
