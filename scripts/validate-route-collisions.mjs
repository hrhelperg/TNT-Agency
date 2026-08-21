/**
 * Two page sources must never resolve to one public route.
 *
 * This exists because it happened. The locale route generator wrote
 * pages/en.tsx while pages/en/index.tsx already existed; both resolve to /en,
 * and Next picks between them without complaining. The build succeeded, the
 * route responded, and which file was serving it was anyone's guess.
 *
 * The collision classes:
 *   - pages/x.tsx        vs pages/x/index.tsx   (file vs index — the one that bit)
 *   - pages/x.tsx        vs pages/x.jsx         (same route, two extensions)
 *   - pages/x/index.tsx  vs pages/x/index.jsx
 *   - public/x.html      vs a Next route /x     (static file shadows a page)
 *
 * Route resolution is derived from the filesystem rather than from the registry
 * on purpose: the registry is what we MEANT to build, and this check is about
 * what is actually on disk.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const PAGE_EXT = ['.tsx', '.ts', '.jsx', '.js']
const NON_ROUTES = new Set(['_app', '_document', '_error', 'middleware'])

/** Every page source file, as [absolutePath, publicRoute]. */
export function pageRoutes(root = ROOT, dir = null, out = []) {
  const base = path.join(root, 'pages')
  const here = dir ?? base
  if (!fs.existsSync(here)) return out
  for (const entry of fs.readdirSync(here, { withFileTypes: true })) {
    const full = path.join(here, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'api') continue
      pageRoutes(root, full, out)
      continue
    }
    const ext = path.extname(entry.name)
    if (!PAGE_EXT.includes(ext)) continue
    const stem = entry.name.slice(0, -ext.length)
    if (NON_ROUTES.has(stem)) continue
    const relDir = path.relative(base, here)
    const segments = relDir ? relDir.split(path.sep) : []
    const route =
      stem === 'index'
        ? '/' + segments.join('/')
        : '/' + [...segments, stem].join('/')
    out.push([full, route.replace(/\/+$/, '') || '/'])
  }
  return out
}

export function findCollisions(root = ROOT) {
  const errors = []
  const byRoute = new Map()
  for (const [file, route] of pageRoutes(root)) {
    const list = byRoute.get(route) ?? []
    list.push(path.relative(root, file))
    byRoute.set(route, list)
  }
  for (const [route, files] of byRoute) {
    if (files.length > 1) {
      errors.push(
        `route ${route} is produced by ${files.length} page sources: ${files.join(' , ')} — ` +
          `Next resolves this silently, so which one serves the route is undefined`,
      )
    }
  }
  // A static file in public/ shadows a Next route of the same path.
  const pub = path.join(root, 'public')
  const shadow = (dir) => {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) { shadow(full); continue }
      if (!entry.name.endsWith('.html')) continue
      const route = '/' + path.relative(pub, full).split(path.sep).join('/').replace(/\.html$/, '')
      if (byRoute.has(route)) {
        errors.push(
          `public${path.relative(pub, full) ? '/' + path.relative(pub, full) : ''} shadows the Next route ${route} ` +
            `(${byRoute.get(route).join(', ')}) — the static file wins and the page never renders`,
        )
      }
    }
  }
  shadow(pub)
  return { errors, routeCount: byRoute.size }
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, routeCount } = findCollisions()
  console.log('Route collision gate')
  console.log(`  · ${routeCount} distinct public routes from page sources`)
  if (errors.length) {
    console.error(`\n${errors.length} collision(s):`)
    for (const e of errors) console.error(`  ✗ ${e}`)
    console.error('\nRoute collision gate: FAIL')
    process.exit(1)
  }
  console.log('\nRoute collision gate: PASS')
}
