// Mutation tests for the share-privacy gate (W4).
//
// The defect this gate exists to stop shipped and survived: the calculator
// base64'd the whole PayrollInput — health fields included — into ?d=, and
// opening such a link handed it to a third-party analytics endpoint. A gate
// that merely notices "?d= is absent today" would pass forever and catch
// nothing, so each mutation re-introduces the SHAPE of that defect.
//
// Two of the six mutations the brief listed presuppose a serialized payload
// with a version field. There is no payload any more, so those are adapted
// rather than faked: instead of "remove the version check" and "allow an
// unknown payload field", they re-introduce an unvalidated reader and an
// undeclared parameter — the properties whose absence made ?d= dangerous.
//
// Run: node scripts/mutate-share-privacy.mjs   (npm run test:mutate-share-privacy)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { auditSharePrivacy, PERMITTED_QUERY_PARAMS } from './validate-share-privacy.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const CALC = 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx'
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')

const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) walk(rel, out)
    else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) out.push(rel)
  }
  return out
}
const baseSources = () => [...walk('pages'), ...walk('components'), ...walk('lib')].map((rel) => [rel, read(rel)])
const sitemap = read('public/sitemap.xml')
const appSource = read('pages/_app.tsx')
const builtHtml = []
{
  const d = path.join(ROOT, '.next/server/pages')
  if (fs.existsSync(d)) {
    const wh = (dir) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name)
        if (e.isDirectory()) wh(p)
        else if (e.name.endsWith('.html')) builtHtml.push([path.relative(ROOT, p), fs.readFileSync(p, 'utf8')])
      }
    }
    wh(d)
  }
}
const run = (over = {}) => auditSharePrivacy({ sources: baseSources(), sitemap, builtHtml, appSource, ...over })
const patched = (rel, mutate) => {
  const s = baseSources()
  return s.map(([f, src]) => (f === rel ? [f, mutate(src)] : [f, src]))
}

const MUTATIONS = [
  {
    name: '1. wage re-encoded into a share URL',
    expect: /btoa|serialises state into a URL|value field/,
    run: () => run({ sources: patched(CALC, (s) => s.replace(
      'const copyLink = useCallback(() => {',
      'const copyLink = useCallback(() => {\n    const enc = btoa(JSON.stringify({ monthlyWageCzk: inp.wage.monthlyWageCzk }));\n    void navigator.clipboard?.writeText(`${window.location.origin}${PAGE_PATH}?d=${enc}`);')) }),
  },
  {
    name: '2. an economic value pushed into the URL for analytics to pick up',
    expect: /value field "monthlyWageCzk" appears in URL-building code/,
    run: () => run({ sources: patched(CALC, (s) => s.replace(
      'const result = useMemo(() => calculate(inp), [inp]);',
      'const result = useMemo(() => calculate(inp), [inp]);\n  if (typeof window !== "undefined") history.replaceState(null, "", `?w=${inp.wage.monthlyWageCzk}`);')) }),
  },
  {
    name: '3. an internal link carrying a query payload',
    expect: /internal link carries a query string/,
    run: () => run({ builtHtml: [['x.html', '<a href="/kalkulacka-mzdy-agenturniho-zamestnance?d=eyJ3YWdlIjp7fX0">share</a>']] }),
  },
  {
    name: '4. (adapted) an undeclared query parameter read into state',
    expect: /without declaring it/,
    run: () => run({ sources: patched(CALC, (s) => s.replace(
      "const mode = params.get('mode')",
      "const payload = params.get('state');\n      void payload;\n      const mode = params.get('mode')")) }),
  },
  {
    name: '5. (adapted) a declared parameter read without its validation',
    expect: /declared validation .* is not present/,
    run: () => run({ sources: patched(CALC, (s) => s.replace(
      "if (mode === 'agency' || mode === 'direct' || mode === 'comparison') {",
      'if (mode) {')) }),
  },
  {
    name: '6. payroll state persisted to storage',
    expect: /writes to persistent storage/,
    run: () => run({ sources: patched(CALC, (s) => s.replace(
      'const result = useMemo(() => calculate(inp), [inp]);',
      'const result = useMemo(() => calculate(inp), [inp]);\n  if (typeof window !== "undefined") window.localStorage.setItem("payroll", JSON.stringify(inp));')) }),
  },
  {
    name: '7. a share URL added to the sitemap',
    expect: /sitemap contains a parameterised URL/,
    run: () => run({ sitemap: sitemap.replace('</urlset>', '<url><loc>https://talentpartnerid.com/kalkulacka-mzdy-agenturniho-zamestnance?d=abc</loc></url></urlset>') }),
  },
  {
    name: '8. a new undeclared export affordance',
    expect: /"shareEverything" is not declared in DECLARED_AFFORDANCES/,
    run: () => run({ sources: patched(CALC, (s) => s.replace(
      'const copySummary = useCallback',
      'const shareEverything = useCallback(() => {}, []);\n  const copySummary = useCallback')) }),
  },
  {
    name: '9. a declared affordance silently removed leaves a stale claim',
    expect: /DECLARED_AFFORDANCES lists "downloadCsv" but it no longer exists/,
    run: () => run({ sources: patched(CALC, (s) => s.replace('const downloadCsv = useCallback', 'const dlCsv = useCallback')) }),
  },
  {
    name: '10. a readable parameter the scrub would strip before any reader runs',
    expect: /"ref" is declared readable, but .* would strip it/,
    run: () => run({ readableParams: { ...PERMITTED_QUERY_PARAMS, ref: { files: [CALC], carries: 'x', validatedBy: '.' } } }),
  },
  {
    name: '11. the URL scrub unmounted from _app',
    expect: /<UrlHygiene \/> is not mounted/,
    run: () => run({ appSource: appSource.replace('<UrlHygiene />', '') }),
  },
  {
    name: '12. the URL scrub mounted AFTER the analytics island',
    expect: /mounted after the analytics island/,
    run: () => run({ appSource: appSource.replace('<UrlHygiene />', '').replace('<WebmasterIDTracker />', '<WebmasterIDTracker />\n      <UrlHygiene />') }),
  },
]

let failures = 0
console.log('Mutation tests — share-privacy gate\n')

const control = run()
if (control.errors.length) {
  console.error(`  ✗ CONTROL: the real tree already fails (${control.errors.length})`)
  for (const e of control.errors.slice(0, 4)) console.error(`      ${e}`)
  failures++
} else {
  console.log(`  ✓ control: the real tree passes (${control.affordances.length} declared affordances)`)
}

for (const m of MUTATIONS) {
  if (m.skipIfDiskScan) continue
  const { errors } = m.run()
  const hit = errors.filter((e) => m.expect.test(e))
  if (hit.length) console.log(`  ✓ ${m.name}`)
  else {
    console.error(`  ✗ ${m.name}\n      NOT CAUGHT — ${errors.length} error(s), none matching ${m.expect}`)
    if (errors.length) console.error(`      first: ${errors[0]}`)
    failures++
  }
}

// Negative control: the declared clipboard/CSV affordances must NOT fail.
{
  const { errors } = run()
  const flagged = errors.filter((e) => /copySummary|downloadCsv|copyLink/.test(e))
  if (!flagged.length) console.log('  ✓ negative control: declared export affordances pass unflagged')
  else { console.error(`  ✗ negative control: ${flagged[0]}`); failures++ }
}

const ran = MUTATIONS.length
console.log(failures
  ? `\nMutation tests: FAIL — ${failures} check(s) did not behave as specified`
  : `\nMutation tests: PASS — ${ran} defects caught, control + negative control correct`)
process.exit(failures ? 1 : 0)
