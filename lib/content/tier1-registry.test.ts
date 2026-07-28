import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { TIER_ONE, tierOneById, tierOneRoutes, isTierOne, type TierOnePageKind } from './tier1-registry'

const ROOT = process.cwd()
const routeExists = (route: string): boolean => {
  if (route === '/') return fs.existsSync(path.join(ROOT, 'pages/index.tsx'))
  const slug = route.replace(/^\//, '')
  return (
    fs.existsSync(path.join(ROOT, `pages/${slug}.tsx`)) ||
    fs.existsSync(path.join(ROOT, `public/${slug}`))
  )
}
const cleanRoute = (r: string) => r === '/' || /^\/[a-z0-9-]+$/.test(r)

describe('Tier 1 registry', () => {
  it('has the required minimum size and kinds', () => {
    expect(TIER_ONE.length).toBeGreaterThanOrEqual(13)
    const kinds = new Set<TierOnePageKind>(TIER_ONE.map((p) => p.kind))
    for (const k of ['homepage', 'employer-hub', 'conversion', 'calculator', 'industry', 'region', 'foreign-workforce'] as TierOnePageKind[]) {
      expect(kinds.has(k), `missing kind ${k}`).toBe(true)
    }
  })

  it('has unique ids, routes and purposes', () => {
    const ids = TIER_ONE.map((p) => p.id)
    const routes = TIER_ONE.map((p) => p.route)
    const purposes = TIER_ONE.map((p) => p.distinctPurpose)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(routes).size).toBe(routes.length)
    expect(new Set(purposes).size).toBe(purposes.length)
  })

  it('every route is a clean canonical route that exists', () => {
    for (const p of TIER_ONE) {
      expect(cleanRoute(p.route), `${p.id}: not clean`).toBe(true)
      expect(p.route.includes('?'), `${p.id}: parameterized`).toBe(false)
      expect(p.route.endsWith('.html'), `${p.id}: .html`).toBe(false)
      expect(routeExists(p.route), `${p.id}: missing route ${p.route}`).toBe(true)
    }
  })

  it('every parent, conversion and related route exists', () => {
    for (const p of TIER_ONE) {
      if (p.parentRoute) expect(routeExists(p.parentRoute), `${p.id}: parent ${p.parentRoute}`).toBe(true)
      expect(routeExists(p.conversionRoute), `${p.id}: conversion ${p.conversionRoute}`).toBe(true)
      for (const r of p.relatedRoutes) expect(routeExists(r.split('#')[0]), `${p.id}: related ${r}`).toBe(true)
    }
  })

  it('the homepage and hub anchor the graph', () => {
    expect(tierOneById('homepage')?.route).toBe('/')
    expect(tierOneById('homepage')?.parentRoute).toBeNull()
    expect(tierOneById('employer-hub')?.route).toBe('/pro-zamestnavatele')
    // Every non-homepage Tier 1 page has a parent hub.
    for (const p of TIER_ONE) if (p.id !== 'homepage') expect(p.parentRoute, `${p.id} has no parent`).toBeTruthy()
  })

  it('every page has a request-workers conversion path', () => {
    for (const p of TIER_ONE) {
      expect(p.conversionRoute === '/poptavka-pracovniku' || p.route === '/poptavka-pracovniku').toBe(true)
    }
  })

  it('helpers behave', () => {
    expect(tierOneRoutes()).toContain('/pracovnici-do-vyroby')
    expect(isTierOne('/pro-zamestnavatele')).toBe(true)
    expect(isTierOne('/nonexistent')).toBe(false)
  })
})
