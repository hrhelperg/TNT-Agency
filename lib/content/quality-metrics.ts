// Shared metrics for the Phase D content quality gates.
//
// Kept separate from quality.ts (which validates a single ArticleData) because
// these operate across the whole corpus and against the real route inventory.

import fs from 'fs'
import path from 'path'
import type { SeoPage } from './seo-page'

export const CALCULATOR_PATH = 'kalkulacka-mzdy-agenturniho-zamestnance'
/** Named with a suffix to avoid clashing with the Phase C export. */
export const REQUEST_PATH_D = 'poptavka-pracovniku'

/** Lowercased, whitespace-collapsed text for comparison. */
export const normalise = (s: string): string => s.toLowerCase().replace(/\s+/g, ' ').trim()

/**
 * Jaccard similarity over word sets. Deliberately simple and dependency-free:
 * it reliably catches templated text where only a place or industry name was
 * swapped, which is the doorway-page pattern we must not ship.
 */
export function similarity(a: string, b: string): number {
  const A = new Set(normalise(a).split(' ').filter(Boolean))
  const B = new Set(normalise(b).split(' ').filter(Boolean))
  if (A.size === 0 || B.size === 0) return 0
  let inter = 0
  A.forEach((w) => {
    if (B.has(w)) inter++
  })
  return inter / (A.size + B.size - inter)
}

/** Total body words: intro + every section body and bullet. */
export function wordCount(p: SeoPage): number {
  const text = [
    p.intro,
    ...p.sections.map((s) => `${s.body.join(' ')} ${(s.bullets ?? []).join(' ')}`),
  ].join(' ')
  return text.split(/\s+/).filter(Boolean).length
}

/**
 * The real, filesystem-derived set of routable paths — Next pages plus static
 * public HTML. Using this (rather than only the content registry) means the
 * link check knows about standalone routes such as /contact and
 * /zamestnavani-cizincu and cannot report false breakage.
 */
export function buildRouteSet(root: string = process.cwd()): Set<string> {
  const routes = new Set<string>()

  const pagesDir = path.join(root, 'pages')
  for (const entry of fs.readdirSync(pagesDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.tsx')) continue
    const name = entry.name.replace(/\.tsx$/, '')
    if (['_app', '_document', '_error'].includes(name)) continue
    routes.add(name === 'index' ? '' : name)
  }

  const publicDir = path.join(root, 'public')
  const walk = (dir: string) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name)
      if (e.isDirectory()) walk(full)
      else if (e.name.endsWith('.html')) {
        routes.add(path.relative(publicDir, full).split(path.sep).join('/'))
      }
    }
  }
  walk(publicDir)

  return routes
}
