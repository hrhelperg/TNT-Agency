// Coverage-truth gate.
//
// Why this exists
// ───────────────
// lib/attribution/index.ts opened with "Design rules, enforced by tests in"
// a sibling file — lib/attribution/attribution.test.ts — that had never existed. Four documented privacy
// rules cited an enforcement that was not there, and the citation had survived
// every review precisely because it read like evidence.
//
// The same defect was then found in a gate this project wrote itself:
// scripts/validate-cta-routing.mjs excused a CTA from its destination check
// "asserted in the component tests", with no such assertion anywhere.
//
// The goal is not to add tests until the comments look true. It is to make a
// coverage claim mechanically checkable, so writing a false one fails the build
// rather than reassuring the next reader.
//
// What it checks
// ──────────────
//   1. Every `*.test.ts(x)` cited in a source comment or a gate `reason:`
//      exists — resolved relative to the citing file, then to the repo root.
//   2. Every cited test file is inside the vitest `include` glob, so it
//      actually runs. A test outside it is not coverage; it is a file.
//   3. A citation that names a symbol ("asserted by X") is backed by that
//      symbol appearing in the cited test.
//   4. No test is skipped or stubbed while still counting as coverage:
//      describe.skip / it.skip / it.todo / xit / xdescribe / empty bodies.
//   5. Every `lib/**/*.test.ts` file contains at least one real expectation.
//
// Run: node scripts/validate-coverage-truth.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')
const exists = (rel) => fs.existsSync(path.join(ROOT, rel))

const walk = (dir, filter, out = []) => {
  const abs = path.join(ROOT, dir)
  if (!fs.existsSync(abs)) return out
  for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) walk(rel, filter, out)
    else if (filter(e.name)) out.push(rel)
  }
  return out
}

/** Files that may contain coverage claims. */
const CLAIM_SOURCES = [
  ...walk('lib', (n) => /\.(ts|tsx)$/.test(n) && !/\.test\./.test(n)),
  ...walk('components', (n) => /\.(ts|tsx)$/.test(n) && !/\.test\./.test(n)),
  ...walk('pages', (n) => /\.(ts|tsx)$/.test(n)),
  // Mutation scripts are excluded on purpose: their entire job is to contain
  // synthetic false claims and feed them to the gate. Scanning them would make
  // every mutation file a permanent failure. The gates they test are scanned.
  ...walk('scripts', (n) => /\.(mjs|js)$/.test(n) && !n.startsWith('mutate-')),
]

const TEST_FILES = walk('lib', (n) => /\.test\.tsx?$/.test(n))
/** Test files anywhere else in the tree — these do NOT run under the config. */
const STRAY_TESTS = [
  ...walk('components', (n) => /\.test\.tsx?$/.test(n)),
  ...walk('pages', (n) => /\.test\.tsx?$/.test(n)),
]

/** Mirrors vitest.config.ts `include`. Read, not assumed. */
function includeGlob() {
  const cfg = read('vitest.config.ts')
  const m = cfg.match(/include:\s*\[([^\]]*)\]/)
  if (!m) return null
  return m[1].split(',').map((s) => s.trim().replace(/['"]/g, '')).filter(Boolean)
}

const globMatches = (globs, rel) =>
  globs.some((g) => {
    const re = new RegExp('^' + g.replace(/\./g, '\\.').replace(/\*\*\//g, '(?:.*/)?').replace(/\*/g, '[^/]*') + '$')
    return re.test(rel)
  })

/** A citation: a .test.ts(x) path mentioned in prose, with its context line. */
function citations(file, src) {
  const out = []
  const lines = src.split('\n')
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/([.\w/-]*[\w-]+\.test\.tsx?)/g)) {
      // Skip the file's own self-reference in an import statement.
      if (/^\s*import\b/.test(line)) continue
      out.push({ file, line: i + 1, cited: m[1], context: line.trim() })
    }
  })
  return out
}

/**
 * Resolve a cited test path: relative to the citing file, then to the repo
 * root, then by basename across the test corpus.
 *
 * The basename fallback matters. Comments legitimately cite a test by its bare
 * filename ("the corpus gate (content-quality.test.ts)"), and such a claim is
 * still fully checkable as long as exactly one test carries that name. Rejecting
 * it would churn accurate comments to satisfy the gate, which is the opposite of
 * the point. An ambiguous basename IS reported, because then the claim does not
 * identify what enforces it.
 */
function resolveCitation(fromFile, cited, corpus) {
  const candidates = []
  if (cited.startsWith('.')) candidates.push(path.posix.normalize(path.posix.join(path.posix.dirname(fromFile), cited)))
  else {
    candidates.push(cited)
    candidates.push(path.posix.join(path.posix.dirname(fromFile), cited))
  }
  const direct = candidates.find((c) => corpus.includes(c) || exists(c))
  if (direct) return { resolved: direct }

  if (!cited.includes('/')) {
    const matches = corpus.filter((t) => path.posix.basename(t) === cited)
    if (matches.length === 1) return { resolved: matches[0] }
    if (matches.length > 1) return { ambiguous: matches }
  }
  return {}
}

export function auditCoverageTruth(opts = {}) {
  const { claimSources, testFiles, strayTests, readFile } = opts
  // Injectable so mutations can exercise the real rules against synthetic test
  // files without writing them to disk. Same reason the share-privacy gate
  // takes its sources as an argument: an audit that reaches past its inputs
  // cannot be mutation-tested.
  const readTest = readFile ?? ((rel) => (exists(rel) ? read(rel) : ''))
  const errors = []
  const notes = []
  const sources = claimSources ?? CLAIM_SOURCES.map((f) => [f, read(f)])
  const tests = testFiles ?? TEST_FILES
  const strays = strayTests ?? STRAY_TESTS
  const include = 'globs' in opts ? opts.globs : includeGlob()

  if (!include) errors.push('vitest.config.ts: could not read the `include` glob — coverage scope is unverifiable')

  // 1 + 2 + 3. Citations. `tests` is the corpus a bare basename resolves against.
  let checked = 0
  for (const [file, src] of sources) {
    for (const c of citations(file, src)) {
      checked++
      const { resolved, ambiguous } = resolveCitation(file, c.cited, tests)
      if (ambiguous) {
        errors.push(`${file}:${c.line}: cites "${c.cited}", which matches ${ambiguous.length} test files (${ambiguous.join(', ')}) — name the one that enforces the claim`)
        continue
      }
      if (!resolved) {
        errors.push(`${file}:${c.line}: cites "${c.cited}", which does not exist — a coverage claim must name a real test file`)
        continue
      }
      if (include && !globMatches(include, resolved)) {
        errors.push(`${file}:${c.line}: cites "${resolved}", which is outside the vitest include glob (${include.join(', ')}) and therefore never runs`)
        continue
      }
      // 3. "asserted by X" / "enforced by X" naming a symbol.
      const symbol = c.context.match(/href=\{(\w+)\}|\bconst (\w+) =/)
      if (symbol) {
        const name = symbol[1] ?? symbol[2]
        if (name && !readTest(resolved).includes(name)) {
          errors.push(`${file}:${c.line}: cites ${resolved} for "${name}", but that test never mentions it`)
        }
      }
    }
  }
  notes.push(`${checked} coverage citation(s) checked across ${sources.length} files`)

  // 2b. Test files that exist but can never run.
  for (const s of strays) {
    if (include && !globMatches(include, s)) {
      errors.push(`${s}: is a test file outside the vitest include glob — it never runs, so it is not coverage`)
    }
  }

  // 4. Skipped or stubbed tests still presented as coverage.
  for (const t of tests) {
    const src = readTest(t)
    for (const m of src.matchAll(/\b(describe|it|test)\.(skip|todo|failing)\b|\bx(it|describe)\s*\(/g)) {
      const line = src.slice(0, m.index).split('\n').length
      errors.push(`${t}:${line}: ${m[0]} — a skipped test must not stand in for coverage; delete it or make it pass`)
    }
    for (const m of src.matchAll(/\b(it|test)\(\s*(['"`])(.*?)\2\s*,\s*(?:async\s*)?\(\s*\)\s*=>\s*\{\s*\}\s*\)/g)) {
      const line = src.slice(0, m.index).split('\n').length
      errors.push(`${t}:${line}: empty test body "${m[3]}" — asserts nothing`)
    }
  }

  // 5. Every test file asserts something.
  for (const t of tests) {
    const src = readTest(t)
    if (!/\bexpect\s*\(/.test(src)) errors.push(`${t}: contains no expect() — it cannot enforce anything`)
  }
  notes.push(`${tests.length} test file(s) in scope; ${strays.length} outside lib/`)

  return { errors, notes }
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, notes } = auditCoverageTruth()
  console.log('Coverage-truth gate')
  console.log(`  claim sources scanned     : ${CLAIM_SOURCES.length}`)
  console.log(`  test files in scope       : ${TEST_FILES.length}`)
  for (const n of notes) console.log(`  · ${n}`)
  if (errors.length) {
    console.error(`\n${errors.length} coverage-truth violation(s):`)
    for (const e of errors) console.error(`  ✗ ${e}`)
    console.error('\nCoverage-truth gate: FAIL')
    process.exit(1)
  }
  console.log('\nCoverage-truth gate: PASS')
}
