/**
 * A proxied prefix must not shadow anything this repository serves.
 *
 * The Media section is a separate deployment reached through six `status = 200`
 * rules in netlify.toml. Those rules carry `force = true`, so they win
 * unconditionally: from the day they ship, `/media`, `/en/media` and
 * `/de/media` are reserved. A Next page or a static HTML file added under one
 * of them later would be built, deployed, and never served — with no error at
 * build time and no failing test.
 *
 * Nothing else here can see that. validate-route-collisions.mjs derives routes
 * from the filesystem and shadowing from public/**\/*.html, and never parses
 * netlify.toml; neither does any other gate. This closes that gap.
 *
 * It also pins the ordering that matters. The proxy rules are host-agnostic
 * and first-match-wins, so above the host-canonicalization 301s they would
 * capture every legacy hostname and serve the publication with 200 on hosts
 * that exist only to redirect away. This asserts they stay below all of them.
 *
 * Exported as checkMediaProxy(root) so the mutation tests can run it against a
 * scratch copy rather than the real tree.
 *
 * Usage: node scripts/validate-media-proxy.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pageRoutes } from './validate-route-collisions.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Returns { errors, reserved, proxies, hostRedirects, origins }. */
export function checkMediaProxy(root = ROOT) {
const errors = []

const toml = fs.readFileSync(path.join(root, 'netlify.toml'), 'utf8')

/**
 * Parse the redirect blocks in document order. A hand-rolled reader rather
 * than a TOML dependency: the file is a flat list of `[[redirects]]` blocks
 * with three fields, and order is the thing being checked.
 */
const blocks = []
for (const chunk of toml.split(/^\[\[redirects\]\]$/m).slice(1)) {
  const from = /^\s*from\s*=\s*"([^"]+)"/m.exec(chunk)?.[1]
  const to = /^\s*to\s*=\s*"([^"]+)"/m.exec(chunk)?.[1]
  const status = /^\s*status\s*=\s*(\d+)/m.exec(chunk)?.[1]
  if (from) blocks.push({ from, to, status: Number(status) })
}

const proxies = blocks.filter((b) => b.status === 200)
const hostRedirects = blocks.filter((b) => b.status === 301 && b.from.startsWith('http'))

if (proxies.length === 0) return { errors, reserved: [], proxies, hostRedirects, origins: [] }

// ---- 1. Ordering ------------------------------------------------------
const firstProxy = blocks.findIndex((b) => b.status === 200)
const lastHostRedirect = blocks.reduce(
  (acc, b, i) => (b.status === 301 && b.from.startsWith('http') ? i : acc),
  -1,
)
if (lastHostRedirect > firstProxy) {
  errors.push(
    `a status=200 proxy rule (${blocks[firstProxy].from}) is declared BEFORE the ` +
      `host-canonicalization 301 for ${blocks[lastHostRedirect].from}. Proxy rules are ` +
      `host-agnostic and first-match-wins, so this serves proxied content on every ` +
      `legacy hostname instead of redirecting it to the apex. Move the proxy block below ` +
      `all ${hostRedirects.length} host redirects.`,
  )
}

// ---- 2. Shadowing -----------------------------------------------------
/** The path prefixes those rules reserve, e.g. "/media". */
const reserved = [...new Set(proxies.map((p) => p.from.replace(/\/\*$/, '')))]

function isUnder(route, prefix) {
  return route === prefix || route.startsWith(prefix + '/')
}

for (const [file, route] of pageRoutes(root)) {
  for (const prefix of reserved) {
    if (isUnder(route, prefix)) {
      errors.push(
        `${path.relative(root, file)} builds route ${route}, which falls under the proxied ` +
          `prefix ${prefix}. It would be deployed and never served.`,
      )
    }
  }
}

function staticHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) staticHtml(full, out)
    else if (entry.name.endsWith('.html')) out.push(full)
  }
  return out
}

for (const file of staticHtml(path.join(root, 'public'))) {
  const route = '/' + path.relative(path.join(root, 'public'), file).split(path.sep).join('/')
  for (const prefix of reserved) {
    if (isUnder(route.replace(/\.html$/, ''), prefix) || isUnder(route, prefix)) {
      errors.push(
        `public${route} falls under the proxied prefix ${prefix}. It would be deployed and ` +
          `never served.`,
      )
    }
  }
}

// ---- 3. The rules themselves are coherent -----------------------------
for (const prefix of reserved) {
  const exact = proxies.some((p) => p.from === prefix)
  const splat = proxies.some((p) => p.from === prefix + '/*')
  if (!exact) errors.push(`proxied prefix ${prefix} has a splat rule but no exact-match rule`)
  if (!splat) errors.push(`proxied prefix ${prefix} has an exact rule but no splat rule`)
}

const origins = new Set(proxies.map((p) => new URL(p.to).origin))
if (origins.size > 1) {
  errors.push(`proxy rules point at more than one origin: ${[...origins].join(', ')}`)
}

return { errors, reserved, proxies, hostRedirects, origins: [...origins] }
}

// ---- CLI --------------------------------------------------------------
if (import.meta.url === `file://${process.argv[1]}`) {
  const { errors, reserved, proxies, hostRedirects, origins } = checkMediaProxy()
  if (errors.length) {
    console.error(`media proxy gate: FAIL — ${errors.length} problem(s)\n`)
    for (const e of errors) console.error(`  - ${e}`)
    process.exit(1)
  }
  console.log(
    `media proxy gate: PASS · ${proxies.length} rules reserving ${reserved.join(', ')} ` +
      `· below all ${hostRedirects.length} host redirects · origin ${origins[0]}`,
  )
}
