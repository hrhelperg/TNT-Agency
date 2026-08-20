// Mutation tests for the legacy-URL privacy boundary.
//
// PR #41 shipped 12 passing mutations, 584 unit tests and 192 e2e tests — and
// still leaked, because every one of those gates inspected source text or pure
// functions and none attacked the runtime lifecycle where the defect lived.
//
// So these remove a real protection and ask whether the suite notices. A
// mutation that survives is a gap in the suite, reported as a failure here.
//
// Run: node scripts/mutate-url-privacy.mjs

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')
const write = (rel, s) => fs.writeFileSync(path.join(ROOT, rel), s)

const SUITE = ['lib/privacy/', 'lib/analytics/webmasterid.test.ts']

const suitePasses = () => {
  try { execFileSync('npx', ['vitest', 'run', ...SUITE], { cwd: ROOT, stdio: 'pipe' }); return true } catch { return false }
}
const gatePasses = () => {
  try {
    execFileSync('node', ['--import', './scripts/ts-resolve.mjs', 'scripts/validate-share-privacy.mjs'], { cwd: ROOT, stdio: 'pipe' })
    return true
  } catch { return false }
}

const POLICY = 'lib/privacy/url-policy.ts'
const GUARD = 'lib/privacy/url-guard.ts'
const HYGIENE = 'components/privacy/UrlHygiene.tsx'
const TRACKER = 'components/analytics/WebmasterIDTracker.tsx'

const MUTATIONS = [
  {
    n: 1, name: 'sanitization no longer runs before analytics initialisation',
    file: HYGIENE,
    apply: (s) => s.replace(/if \(typeof window !== 'undefined'\) \{\s*installUrlGuard\(\)\s*\}/, ''),
  },
  {
    n: 2, name: 'back to one-shot sanitization (mount effect only)',
    file: HYGIENE,
    apply: (s) => s
      .replace(/if \(typeof window !== 'undefined'\) \{\s*installUrlGuard\(\)\s*\}/, '')
      .replace('enforceCurrentUrl()', 'installUrlGuard()'),
  },
  {
    n: 3, name: '"d" is permitted again',
    file: POLICY,
    apply: (s) => s.replace('export const PERMITTED_PARAMS: Readonly<Record<string, ParamRule>> = {',
                            "export const PERMITTED_PARAMS: Readonly<Record<string, ParamRule>> = {\n  d: { carries: 'legacy share payload', accepts: () => true },"),
  },
  {
    n: 4, name: 'undeclared parameters are kept instead of dropped',
    file: POLICY,
    apply: (s) => s.replace('if (!rule || !rule.accepts(value)) {', 'if (false) {'),
  },
  {
    n: 5, name: 'mode becomes arbitrary text instead of a closed enum',
    file: POLICY,
    apply: (s) => s.replace('accepts: (v) => (MODES as readonly string[]).includes(v),', 'accepts: () => true,'),
  },
  {
    n: 6, name: 'popstate protection removed',
    file: GUARD,
    apply: (s) => s.replace(/win\.addEventListener\('popstate',[^\n]*\n/, ''),
  },
  {
    n: 7, name: 'hashchange protection removed',
    file: GUARD,
    apply: (s) => s.replace(/win\.addEventListener\('hashchange',[^\n]*\n/, ''),
  },
  {
    n: 8, name: 'replaceState no longer wrapped (the warm-navigation race reopens)',
    file: GUARD,
    apply: (s) => s.replace(/win\.history\.replaceState = function[\s\S]*?\} as typeof win\.history\.replaceState/, ''),
  },
  {
    n: 9, name: 'pushState no longer wrapped',
    file: GUARD,
    apply: (s) => s.replace(/win\.history\.pushState = function[\s\S]*?\} as typeof win\.history\.pushState/, ''),
  },
  {
    n: 10, name: 'the url argument is passed through unsanitized',
    file: GUARD,
    apply: (s) => s.replace('nativeReplace(sanitizeState(state, win), title, sanitizeArg(url, win) as string)',
                            'nativeReplace(sanitizeState(state, win), title, url as string)'),
  },
  {
    n: 11, name: 'history state keeps the dirty url/as (Back resurrects it)',
    file: GUARD,
    apply: (s) => s.replace('  const next: Record<string, unknown> = { ...s }',
                            '  const next: Record<string, unknown> = { ...s }\n  return state'),
  },
  {
    n: 12, name: 'analytics fails OPEN instead of closed',
    file: TRACKER,
    apply: (s) => s.replace("readConsent() === 'accepted' && isUrlSafe()", "readConsent() === 'accepted'"),
  },
  {
    n: 13, name: 'the guard reports safe even when it could not install',
    file: GUARD,
    apply: (s) => s.replace(/    urlSafe = false\n    return\n  \}/, '    return\n  }'),
  },
  {
    n: 14, name: 'an unparseable url argument is passed straight to native history',
    file: GUARD,
    apply: (s) => s.replace(/    urlSafe = false\n    try \{\n      return win\.location\.pathname/,
                            '    try {\n      return raw as unknown as string'),
  },
  {
    n: 15, name: 'window resolution goes back to an eager default parameter (SSR crash)',
    file: GUARD,
    apply: (s) => s.replace('function resolveWindow(win?: Win): Win | undefined {\n  if (win) return win\n  return typeof window !== \'undefined\' ? (window as Win) : undefined\n}',
                            'function resolveWindow(win?: Win): Win | undefined {\n  return (win ?? (window as Win))\n}'),
  },
  {
    n: 16, name: 'the guard double-wraps on repeated evaluation (HMR leak)',
    file: GUARD,
    apply: (s) => s.replace('  if (flagged[INSTALLED]) {\n    enforceCurrentUrl(win)\n    return\n  }', ''),
  },
  {
    n: 17, name: 'SCOPE GUARD — payload decoding is reintroduced',
    file: POLICY,
    scope: true,
    apply: (s) => s.replace('export type ParamRule = {',
                            'const decodesToPayload = (v: string): boolean => /ztpp/.test(atob(v))\n\nexport type ParamRule = {'),
  },
  {
    n: 18, name: 'SCOPE GUARD — fragment classification is reintroduced',
    file: POLICY,
    scope: true,
    apply: (s) => s.replace('export type ParamRule = {',
                            "export const FRAGMENT_GRAMMAR = /^[a-z0-9-]{1,80}$/\n\nexport type ParamRule = {"),
  },
  {
    n: 19, name: 'SCOPE GUARD — the pathname stops passing through unchanged',
    file: POLICY,
    scope: true,
    apply: (s) => s.replace('    path: `${pathname}${query ? `?${query}` : \'\'}${fragment}`,',
                            "    path: `${query ? `?${query}` : ''}${fragment}`,"),
  },
]

const BEFORE = Object.fromEntries(
  [...new Set(MUTATIONS.map((m) => m.file))].map((f) => [f, createHash('sha256').update(read(f)).digest('hex')]),
)

console.log('Mutation tests — legacy-URL privacy boundary\n')
let failures = 0

if (suitePasses() && gatePasses()) console.log('  ✓ control: unit suite and share-privacy gate both pass on the real tree')
else { console.error('  ✗ CONTROL FAILED'); failures++ }

for (const m of MUTATIONS) {
  const original = read(m.file)
  const mutated = m.apply(original)
  if (mutated === original) {
    console.error(`  ✗ ${m.n}. ${m.name}\n      MUTATION DID NOT APPLY — the pattern no longer matches ${m.file}`)
    failures++
    continue
  }
  const caughtBy = []
  try {
    write(m.file, mutated)
    if (!suitePasses()) caughtBy.push('unit')
    if (!gatePasses()) caughtBy.push('gate')
  } finally {
    write(m.file, original)
  }
  const kind = m.scope ? 'scope' : 'behavioural'
  if (caughtBy.length) console.log(`  ✓ ${m.n}. ${m.name}  [${kind}; caught by: ${caughtBy.join(' + ')}]`)
  else {
    console.error(`  ✗ ${m.n}. ${m.name}\n      SURVIVED — no test or gate noticed this protection disappearing`)
    failures++
  }
}

const drifted = [...new Set(MUTATIONS.map((m) => m.file))].filter(
  (f) => createHash('sha256').update(read(f)).digest('hex') !== BEFORE[f],
)
if (drifted.length) { console.error(`\n  ✗ INTEGRITY: mutations left changes behind in ${drifted.join(', ')}`); failures++ }
else console.log('\n  ✓ integrity: every mutated file restored byte-identically')

const scope = MUTATIONS.filter((m) => m.scope).length
console.log(failures
  ? `\nMutation tests: FAIL — ${failures} check(s) did not behave as specified`
  : `\nMutation tests: PASS — ${MUTATIONS.length} mutations caught\n` +
    `  ${MUTATIONS.length - scope} BEHAVIOURAL — removing the protection lets a legacy payload survive or reach analytics.\n` +
    `  ${scope} SCOPE — proving the out-of-scope covert-channel machinery cannot return unnoticed.`)
process.exit(failures ? 1 : 0)
