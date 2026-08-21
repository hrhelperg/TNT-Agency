/** The committed route plan must equal what the module produces. */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { renderPlan } from './generate-l1-route-plan.mjs'

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
  console.log('\nL1 route-plan gate: PASS')
}
