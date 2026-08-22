/**
 * The committed route plan must equal what the module produces — and what the
 * module produces must agree with the frozen manifest.
 *
 * The first check alone was self-validating: it regenerates the document and
 * compares it to the document that regeneration wrote, so it can only catch a
 * hand-edit. It reported PASS on a plan that classified all 56 L1 Czech routes
 * as L0 and printed "L1_primary 0" directly beneath its own statement that 56
 * routes belong to L1 concepts.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { renderPlan, lastTally } from './generate-l1-route-plan.mjs'
const { L1_EXPECTED } = await import('../lib/locale/l1-manifest.ts')
const reg = await import('../lib/locale/registry.ts')
const { L1_CONCEPTS } = await import('../lib/locale/l1-concepts.ts')

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const FILE = path.join(ROOT, 'docs/locale-l1-route-plan.md')

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const expected = await renderPlan()
  const actual = fs.existsSync(FILE) ? fs.readFileSync(FILE, 'utf8') : ''
  console.log('L1 route-plan gate')
  if (actual !== expected) {
    console.error('  ✗ docs/locale-l1-route-plan.md differs from what lib/locale/l1-concepts.ts produces')
    console.error('    Run: node --import ./scripts/ts-resolve.mjs scripts/generate-l1-route-plan.mjs')
    process.exit(1)
  }
  console.log(`  · ${expected.split('\n').length} lines, identical to the generated plan`)

  // Independent of the document: the coverage tally must match the manifest and
  // the registry, neither of which this generator produced.
  const problems = []
  const expectedCollapsed = L1_CONCEPTS.reduce((n, c) => n + (c.csCollapsed?.length || 0), 0)
  const total = Object.values(lastTally).reduce((a, b) => a + b, 0)
  if (lastTally.L1_primary !== L1_EXPECTED.l1Concepts) {
    problems.push(`plan counts ${lastTally.L1_primary} L1 primary routes; the manifest freezes L1 at ${L1_EXPECTED.l1Concepts}`)
  }
  if (lastTally.L1_collapsed !== expectedCollapsed) {
    problems.push(`plan counts ${lastTally.L1_collapsed} collapsed L1 routes; the registry declares ${expectedCollapsed}`)
  }
  if (total !== L1_EXPECTED.czechRoutes) {
    problems.push(`plan classifies ${total} Czech routes; the manifest freezes the spine at ${L1_EXPECTED.czechRoutes}`)
  }
  if (lastTally.UNCLASSIFIED) problems.push(`${lastTally.UNCLASSIFIED} Czech route(s) matched no rule`)
  if (problems.length) {
    console.error('')
    for (const p of problems) console.error(`  ✗ ${p}`)
    console.error('\nL1 route-plan gate: FAIL')
    process.exit(1)
  }
  console.log(`  · coverage tally agrees with the manifest: ${lastTally.L1_primary} primary + ${lastTally.L1_collapsed} collapsed, ${total} Czech routes total`)
  console.log('\nL1 route-plan gate: PASS')
}
