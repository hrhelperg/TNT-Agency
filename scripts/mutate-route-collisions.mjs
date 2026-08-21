/**
 * Mutation tests for the route-collision gate.
 *
 * Each mutation reproduces a real way two sources can claim one route. They run
 * against a COPY of pages/ in a temp directory rather than the real tree, so a
 * failed run cannot leave a stray page behind.
 */
import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import { findCollisions } from './validate-route-collisions.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Copy pages/ and public/ into a scratch root so mutations are throwaway. */
function scratch() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'route-collide-'))
  fs.cpSync(path.join(ROOT, 'pages'), path.join(dir, 'pages'), { recursive: true })
  fs.mkdirSync(path.join(dir, 'public'), { recursive: true })
  for (const f of fs.readdirSync(path.join(ROOT, 'public'))) {
    if (f.endsWith('.html')) fs.copyFileSync(path.join(ROOT, 'public', f), path.join(dir, 'public', f))
  }
  return dir
}

const MUTATIONS = [
  {
    name: '1. pages/en.tsx beside pages/en/index.tsx (the defect that shipped)',
    apply: (d) => fs.writeFileSync(path.join(d, 'pages/en.tsx'), 'export default function X(){return null}'),
    expect: /route \/en is produced by 2 page sources/,
  },
  {
    name: '2. pages/de.tsx beside pages/de/index.tsx',
    apply: (d) => fs.writeFileSync(path.join(d, 'pages/de.tsx'), 'export default function X(){return null}'),
    expect: /route \/de is produced by 2 page sources/,
  },
  {
    name: '3. same route, two extensions',
    apply: (d) => fs.writeFileSync(path.join(d, 'pages/en/recruitment.jsx'), 'export default function X(){return null}'),
    expect: /route \/en\/recruitment is produced by 2 page sources/,
  },
  {
    name: '4. a nested index colliding with a sibling file',
    apply: (d) => {
      fs.mkdirSync(path.join(d, 'pages/en/onboarding'), { recursive: true })
      fs.writeFileSync(path.join(d, 'pages/en/onboarding/index.tsx'), 'export default function X(){return null}')
    },
    expect: /route \/en\/onboarding is produced by 2 page sources/,
  },
  {
    name: '5. a static public/ file shadowing a Next route',
    apply: (d) => fs.writeFileSync(path.join(d, 'public/contact.html'), '<html></html>'),
    expect: /shadows the Next route \/contact/,
  },
]

let caught = 0
const failures = []

const control = findCollisions(ROOT)
if (control.errors.length) {
  console.error('CONTROL FAILED — the real tree already has collisions:')
  control.errors.forEach((e) => console.error('    ' + e))
  process.exit(1)
}
console.log(`  ✓ control: the real tree has ${control.routeCount} routes and no collision`)

for (const m of MUTATIONS) {
  const dir = scratch()
  try {
    m.apply(dir)
    const { errors } = findCollisions(dir)
    if (errors.some((e) => m.expect.test(e))) {
      caught++
      console.log(`  ✓ ${m.name}`)
    } else {
      failures.push(`${m.name}\n      expected /${m.expect.source}/\n      got: ${errors.join(' | ') || '(no errors)'}`)
      console.log(`  ✗ ${m.name}`)
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

// Negative control: an untouched copy must stay clean.
const clean = scratch()
const { errors: noopErrors } = findCollisions(clean)
fs.rmSync(clean, { recursive: true, force: true })
if (noopErrors.length) failures.push(`negative control: an untouched copy reported ${noopErrors.length} collision(s)`)
else console.log('  ✓ negative control: an untouched copy stays clean')

if (failures.length) {
  console.error(`\nMutation tests: FAIL — ${failures.length}`)
  failures.forEach((f) => console.error('  ✗ ' + f))
  process.exit(1)
}
console.log(`\nMutation tests: PASS — ${caught} collisions caught, control + negative control correct`)
