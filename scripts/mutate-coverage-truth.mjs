// Mutation tests for the coverage-truth gate.
//
// A gate whose entire subject is "coverage claims must be true" would be a
// self-refuting joke if its own effectiveness were assumed. Each mutation
// re-introduces one of the defects that motivated it.
//
// Run: node scripts/mutate-coverage-truth.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { auditCoverageTruth } from './validate-coverage-truth.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')

const GLOBS = ['lib/**/*.test.ts']
const CORPUS = ['lib/attribution/attribution.test.ts', 'lib/content/content-quality.test.ts']
const base = (over = {}) =>
  auditCoverageTruth({
    claimSources: [['lib/attribution/index.ts', read('lib/attribution/index.ts')]],
    testFiles: CORPUS,
    strayTests: [],
    globs: GLOBS,
    ...over,
  })

const MUTATIONS = [
  {
    name: '1. the original defect: a rule citing a test file that does not exist',
    expect: /cites "\.\/nonexistent\.test\.ts", which does not exist/,
    run: () => base({ claimSources: [['lib/attribution/index.ts', '// enforced by tests in ./nonexistent.test.ts\n']] }),
  },
  {
    name: '2. a citation pointing outside the vitest include glob',
    expect: /outside the vitest include glob/,
    run: () => base({
      claimSources: [['components/EmployerSituations.tsx', '// asserted by components/situations.test.ts\n']],
      testFiles: [...CORPUS, 'components/situations.test.ts'],
      readFile: (rel) => (rel.startsWith('components/') ? "import { it, expect } from 'vitest'\nit('x', () => { expect(1).toBe(1) })\n" : read(rel)),
    }),
  },
  {
    name: '3. a test file that exists but can never run',
    expect: /never runs, so it is not coverage/,
    run: () => base({ strayTests: ['components/EmployerSituations.test.tsx'] }),
  },
  {
    name: '4. a skipped test still presented as coverage',
    expect: /a skipped test must not stand in for coverage/,
    run: () => base({ testFiles: ['lib/skipped.test.ts'], readFile: () => "import { describe, it, expect } from 'vitest'\ndescribe.skip('x', () => { it('y', () => { expect(1).toBe(1) }) })\n" }),
  },
  {
    name: '5. it.todo standing in for an unwritten test',
    expect: /it\.todo — a skipped test must not stand in/,
    run: () => base({ testFiles: ['lib/todo.test.ts'], readFile: () => "import { it, expect } from 'vitest'\nit.todo('session-limited storage')\nit('real', () => { expect(1).toBe(1) })\n" }),
  },
  {
    name: '6. an empty test body that asserts nothing',
    expect: /empty test body "session-limited"/,
    run: () => base({ testFiles: ['lib/empty.test.ts'], readFile: () => "import { it, expect } from 'vitest'\nit('session-limited', () => {})\nit('r', () => { expect(1).toBe(1) })\n" }),
  },
  {
    name: '7. a test file with no expectation at all',
    expect: /contains no expect\(\)/,
    run: () => base({ testFiles: ['lib/noexpect.test.ts'], readFile: () => "import { it } from 'vitest'\nit('looks like coverage', () => { const x = 1; void x })\n" }),
  },
  {
    name: '8. an ambiguous basename that names nothing in particular',
    expect: /matches 2 test files/,
    run: () => base({
      claimSources: [['lib/x.ts', '// enforced by privacy.test.ts\n']],
      testFiles: ['lib/a/privacy.test.ts', 'lib/b/privacy.test.ts'],
    }),
  },
  {
    name: '9. the vitest include glob made unreadable — coverage scope unknown',
    expect: /coverage scope is unverifiable/,
    run: () => base({ globs: null }),
  },
]

let failures = 0
console.log('Mutation tests — coverage-truth gate\n')

const control = auditCoverageTruth()
if (control.errors.length) {
  console.error(`  ✗ CONTROL: the real tree already fails (${control.errors.length})`)
  for (const e of control.errors.slice(0, 4)) console.error(`      ${e}`)
  failures++
} else {
  console.log('  ✓ control: the real tree passes')
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

// Negative control: an accurate bare-basename citation must NOT be flagged.
{
  const { errors } = base({ claimSources: [['scripts/validate-regional.mjs', '// The corpus gate (content-quality.test.ts) fails body similarity at 0.90.\n']] })
  if (!errors.length) console.log('  ✓ negative control: an accurate bare-basename citation passes')
  else { console.error(`  ✗ negative control flagged a true claim: ${errors[0]}`); failures++ }
}

console.log(failures
  ? `\nMutation tests: FAIL — ${failures} check(s) did not behave as specified`
  : `\nMutation tests: PASS — ${MUTATIONS.length} defects caught, control + negative control correct`)
process.exit(failures ? 1 : 0)
