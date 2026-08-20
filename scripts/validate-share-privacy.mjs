// Share-privacy gate (READ-ONLY) — W4.
//
// WHY THIS EXISTS
// The payroll calculator used to base64 the entire PayrollInput into a ?d=
// query and put it on the clipboard. Two things made that worse than it looked:
//
//   1. PayrollInput.taxProfile carries `disability`, `ztpp` (ZTP/P severe
//      disability card) and `children[].ztpp` — health data — next to wage and
//      cost figures.
//   2. Opening such a link handed the encoded blob to the analytics tracker,
//      whose payload includes the full location.href
//      (lib/analytics/webmasterid.ts:19). Demonstrated: one ingest request
//      carried the base64, and a wage sentinel decoded straight back out.
//
// Base64 is encoding, not encryption. Anyone holding the link could read it.
//
// WHAT THIS GATE ENFORCES
// Not "is there a ?d= today" — that would pass forever once removed and catch
// nothing. It enforces the shape that made the defect possible:
//
//   FAIL  a page/component serialises application state into a URL
//         (btoa/JSON.stringify feeding a query or hash)
//   FAIL  the calculator reads a state payload back out of the URL
//   FAIL  any economic or personal field name appears in URL-building code
//   FAIL  an internal link or the sitemap carries a query string
//   FAIL  payroll state is written to any persistent storage
//   FAIL  a value-bearing export affordance exists that is not declared below
//
// Declared affordances are the honest part: the clipboard summary and the CSV
// DO contain economic values. They are explicit, user-initiated exports of the
// user's own figures, they never touch a URL or the network, and this gate
// records them rather than pretending the risk is zero.
//
// Run: node scripts/validate-share-privacy.mjs   (npm run validate:share-privacy)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8')

// Single source of truth for which parameters may survive in a served URL.
// Imported from the app itself (via scripts/ts-resolve.mjs) so the gate and the
// runtime scrub cannot drift apart.
const { PERMITTED_PARAMS } = await import('../lib/privacy/url-policy.ts')
const code = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')

/** Field names that must never appear in URL-building code. */
export const VALUE_FIELDS = [
  'monthlyWageCzk', 'hourlyWageCzk', 'averageHourlyEarningsCzk',
  'performanceBonus', 'attendanceBonus', 'productionBonus', 'personalBonus',
  'feePercentOfPayroll', 'feePerHour', 'feeFixedMonthly',
  'disability', 'ztpp', 'residency', 'signedDeclaration',
  'grossWage', 'netWage', 'totalEconomicCost',
]

/** The one page that computes and can export payroll values. */
export const CALCULATOR_PAGE = 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx'

/**
 * Export affordances that may legitimately carry economic values, because the
 * user explicitly asked for them. Each records what leaves the page and by
 * which route. An undeclared one fails.
 */
export const DECLARED_AFFORDANCES = {
  copySummary: {
    file: 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx',
    carries: 'computed results (gross, net, contributions, employer cost) as plain text',
    route: 'clipboard, on an explicit button press',
    urlBorne: false,
  },
  downloadCsv: {
    file: 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx',
    carries: 'the calculation as CSV',
    route: 'local Blob download, on an explicit button press',
    urlBorne: false,
  },
  copyLink: {
    file: 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx',
    carries: 'the page address only — no values',
    route: 'clipboard, on an explicit button press',
    urlBorne: false,
  },
}


/**
 * Query parameters a page may read into state. Each must name where it is read
 * and how its value is constrained. A parameter that carries VALUES rather than
 * a hint does not belong here at all — that was ?d=.
 */
export const PERMITTED_QUERY_PARAMS = {
  mode: {
    files: ['pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx'],
    carries: 'which calculator view to open — no values',
    validatedBy: "mode === 'agency' \\|\\| mode === 'direct' \\|\\| mode === 'comparison'",
  },
  source: {
    files: ['components/EmployerRequestForm.tsx'],
    carries: 'legacy CTA surface hint — no values',
    validatedBy: 'isCtaSource\\(',
  },
}

export function auditSharePrivacy({ sources, sitemap, builtHtml, appSource, permittedParams = PERMITTED_PARAMS, readableParams = PERMITTED_QUERY_PARAMS }) {
  const errors = []
  const notes = []

  for (const [file, raw] of sources) {
    const src = code(raw)

    // 1. State must not be serialised into a URL.
    if (/btoa\s*\(/.test(src) || /\batob\s*\(/.test(src)) {
      errors.push(`${file}: uses btoa/atob — application state must not be encoded into a shareable string`)
    }
    // JSON.stringify feeding a query or hash on the same line.
    for (const m of src.matchAll(/^.*JSON\.stringify[\s\S]{0,120}$/gm)) {
      if (/[?#]\s*[a-z]+\s*=|search\s*=|hash\s*=/.test(m[0])) {
        errors.push(`${file}: serialises state into a URL — ${m[0].trim().slice(0, 90)}`)
      }
    }
    // 2. Reading a payload back out of the URL.
    //
    // The rule is not "only ?mode" — that would be arbitrary. What made ?d=
    // dangerous is that it was parsed into state with NO validation, so any
    // shape could arrive. A query parameter may therefore be read only if it is
    // declared here AND its value is checked against a closed set. Both current
    // readers qualify: `mode` is compared to three literals, and `source` goes
    // through isCtaSource() against an 8-value allowlist.
    for (const m of src.matchAll(/params\.get\(\s*['"]([a-zA-Z]+)['"]\s*\)/g)) {
      const param = m[1]
      const decl = PERMITTED_QUERY_PARAMS[param]
      if (!decl) {
        errors.push(`${file}: reads query parameter "${param}" into state without declaring it — a URL parameter may only be read if it is declared and validated against a closed set`)
        continue
      }
      if (!decl.files.includes(file)) {
        errors.push(`${file}: reads declared parameter "${param}", but the declaration names ${decl.files.join(', ')}`)
      }
      if (!new RegExp(decl.validatedBy).test(src)) {
        errors.push(`${file}: reads "${param}" but the declared validation (${decl.validatedBy}) is not present — unvalidated URL input must never reach state`)
      }
    }
    // 3. Value field names near URL construction.
    const urlLines = src.split('\n').filter((l) => /location\.(href|search|hash)|URLSearchParams|\?[a-z]+=|history\.(push|replace)State/.test(l))
    for (const l of urlLines) {
      for (const f of VALUE_FIELDS) {
        if (l.includes(f)) errors.push(`${file}: value field "${f}" appears in URL-building code — ${l.trim().slice(0, 80)}`)
      }
    }
    // 4. Payroll state must not be persisted.
    if (/(localStorage|sessionStorage|indexedDB|document\s*\.\s*cookie)/.test(src)) {
      if (/PayrollInput|\binp\b|payroll/i.test(src) && /kalkulacka|payroll/i.test(file)) {
        errors.push(`${file}: payroll surface writes to persistent storage`)
      }
    }
  }

  // 4b. The guard must be installed at MODULE scope, and must cover the whole
  //     lifecycle. A mount effect measurably lost a race against Next's
  //     router.replace, which resolves asynchronously and restored the dirty
  //     URL after the scrub ran.
  const hygiene = code(read('components/privacy/UrlHygiene.tsx'))
  if (!/typeof window !== 'undefined'[\s\S]{0,120}installUrlGuard\(\)/.test(hygiene)) {
    errors.push("components/privacy/UrlHygiene.tsx: the URL guard is not installed at module scope — an effect-only install races Next's router.replace and loses")
  }
  const guard = code(read('lib/privacy/url-guard.ts'))
  for (const [hook, why] of [
    ['history.replaceState', 'Next router.replace and the tracker both write through it'],
    ['history.pushState', 'a client navigation must not reintroduce a legacy payload'],
    ["'popstate'", 'back/forward can restore a dirty entry'],
    ["'hashchange'", 'a hash write can change the href the tracker reads'],
  ]) {
    if (!guard.includes(hook)) errors.push(`lib/privacy/url-guard.ts: does not cover ${hook} — ${why}`)
  }
  if (!/sanitizeState/.test(guard)) {
    errors.push('lib/privacy/url-guard.ts: does not sanitize the history STATE object — Next stores {url, as}, and a dirty entry resurrects a legacy payload on Back')
  }

  // 4c. Analytics must fail CLOSED on the URL boundary.
  const trackerSrc = code(read('components/analytics/WebmasterIDTracker.tsx'))
  if (!/isUrlSafe\(\)/.test(trackerSrc)) {
    errors.push('components/analytics/WebmasterIDTracker.tsx: analytics is not gated on the URL boundary — consent alone does not make a URL safe to transmit')
  }

  // 4d. SCOPE GUARD — the covert-channel machinery must not come back.
  //
  // An earlier iteration decoded base64/base32/hex out of query values, scored
  // segment lengths and digit runs, and classified fragments and pathnames, to
  // stop someone hand-encoding facts they already possess into legitimate
  // campaign strings. That threat was assessed and ruled OUT OF SCOPE: it
  // protects nobody's data (the attacker already has it) and it cost real
  // product behaviour — it stripped legitimate in-page anchors.
  //
  // This rule makes the absence a tested property rather than a habit.
  const FORBIDDEN = [
    'assessAssembledUrl', 'decodesToPayload', 'decodeBase64ish', 'base32Decode',
    'hasLongSegment', 'MAX_SEGMENT', 'LONG_DIGITS', 'looksLikePayload',
    'isPlausibleFragment', 'FRAGMENT_GRAMMAR', 'fragmentAllowed',
    'enforceFragmentAgainstDom', 'pathnameTrusted', 'SENSITIVE_STEMS',
  ]
  for (const file of ['lib/privacy/url-policy.ts', 'lib/privacy/url-guard.ts']) {
    const src = code(read(file))
    for (const symbol of FORBIDDEN) {
      if (src.includes(symbol)) {
        errors.push(`${file}: reintroduces "${symbol}" — payload decoding, fragment and pathname classification are deliberately out of scope; see the scope note in url-policy.ts`)
      }
    }
    if (/\batob\s*\(/.test(src)) {
      errors.push(`${file}: decodes with atob — the policy is an allowlist, not a content classifier`)
    }
  }
  // The fragment and the pathname must reach the output untouched.
  const policy = code(read('lib/privacy/url-policy.ts'))
  if (!/\$\{pathname\}/.test(policy)) {
    errors.push('lib/privacy/url-policy.ts: the pathname is no longer passed through unchanged — pathname classification is out of scope')
  }
  notes.push(`scope guard: ${FORBIDDEN.length} out-of-scope symbols asserted absent`)

  // 5. No query strings in the sitemap.
  const qs = [...sitemap.matchAll(/<loc>([^<]*\?[^<]*)<\/loc>/g)]
  for (const m of qs) errors.push(`sitemap contains a parameterised URL: ${m[1]}`)

  // 6. No internal link carries a query payload.
  for (const [file, html] of builtHtml) {
    for (const m of html.matchAll(/href="(\/[^"]*\?[^"]*)"/g)) {
      errors.push(`${file}: internal link carries a query string — ${m[1].slice(0, 70)}`)
    }
  }

  // 7. Every value-bearing affordance is declared.
  // Read from the injected sources, not from disk: an audit that reaches past
  // its own inputs cannot be mutation-tested, and an untestable gate is the
  // thing this branch exists to stop shipping.
  const calcEntry = sources.find(([f]) => f === CALCULATOR_PAGE)
  if (!calcEntry) throw new Error(`share-privacy: ${CALCULATOR_PAGE} was not among the ${sources.length} scanned sources`)
  const calc = code(calcEntry[1])
  const found = [...calc.matchAll(/const\s+(copy[A-Z]\w*|download[A-Z]\w*|share[A-Z]\w*|export[A-Z]\w*)\s*=/g)].map((m) => m[1])
  for (const f of found) {
    if (!DECLARED_AFFORDANCES[f]) {
      errors.push(`pages/kalkulacka-…: export affordance "${f}" is not declared in DECLARED_AFFORDANCES — classify what it carries and by which route`)
    }
  }
  for (const name of Object.keys(DECLARED_AFFORDANCES)) {
    if (!found.includes(name)) errors.push(`DECLARED_AFFORDANCES lists "${name}" but it no longer exists — remove the stale entry`)
  }
  notes.push(`${found.length} declared export affordances; ${Object.values(DECLARED_AFFORDANCES).filter((a) => a.urlBorne).length} are URL-borne`)

  // 8. Anything readable must also be allowed to survive the scrub.
  //
  // The scrub strips undeclared parameters on load. If a parameter is declared
  // readable here but missing from PERMITTED_PARAMS, it is removed before the
  // code that reads it ever runs — the feature breaks silently. This is the
  // invariant that keeps the two lists honest with each other.
  for (const param of Object.keys(readableParams)) {
    if (!Object.prototype.hasOwnProperty.call(permittedParams, param)) {
      errors.push(`query parameter "${param}" is declared readable, but lib/privacy/url-policy.ts would strip it before any reader runs — add it to PERMITTED_PARAMS or stop reading it`)
    }
  }
  notes.push(`${Object.keys(permittedParams).length} parameters survive the scrub; ${Object.keys(readableParams).length} are read into state`)

  // 9. The scrub must run before the analytics island can read location.href.
  //
  // Sibling effects fire in tree order, so this is a positional guarantee and a
  // JSX reorder would silently defeat it. Asserted structurally rather than
  // trusted to a comment.
  const app = appSource ?? read('pages/_app.tsx')
  const iHygiene = app.indexOf('<UrlHygiene')
  const iTracker = app.indexOf('<WebmasterIDTracker')
  if (iHygiene === -1) {
    errors.push('pages/_app.tsx: <UrlHygiene /> is not mounted — legacy links would keep their payload in the address bar')
  } else if (iTracker !== -1 && iHygiene > iTracker) {
    errors.push('pages/_app.tsx: <UrlHygiene /> is mounted after the analytics island — sibling effects fire in tree order, so the tracker would read the unscrubbed URL')
  }

  return { errors, notes, affordances: found }
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const walk = (dir, out = []) => {
    for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
      const rel = `${dir}/${e.name}`
      if (e.isDirectory()) walk(rel, out)
      else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) out.push(rel)
    }
    return out
  }
  const sources = [...walk('pages'), ...walk('components'), ...walk('lib')].map((rel) => [rel, read(rel)])
  const builtDir = path.join(ROOT, '.next/server/pages')
  const builtHtml = []
  if (fs.existsSync(builtDir)) {
    const wh = (d) => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name)
        if (e.isDirectory()) wh(p)
        else if (e.name.endsWith('.html')) builtHtml.push([path.relative(ROOT, p), fs.readFileSync(p, 'utf8')])
      }
    }
    wh(builtDir)
  }
  const { errors, notes, affordances } = auditSharePrivacy({ sources, sitemap: read('public/sitemap.xml'), builtHtml })

  console.log('Share-privacy gate')
  console.log(`  source files scanned      : ${sources.length}`)
  console.log(`  built pages scanned       : ${builtHtml.length}`)
  console.log(`  export affordances        : ${affordances.join(', ') || 'none'}`)
  for (const n of notes) console.log(`  · ${n}`)

  if (errors.length) {
    console.error(`\nShare-privacy gate: FAIL (${errors.length})`)
    for (const e of errors.slice(0, 40)) console.error(`  ✗ ${e}`)
    process.exit(1)
  }
  console.log('\nShare-privacy gate: PASS')
}
