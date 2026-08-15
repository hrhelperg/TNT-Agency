import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  ACQUISITION_CLUSTERS,
  CLASSIFICATION_VERSION,
  INTENT_CLASSES,
  classifyRoute,
  normalizeRoute,
  summariseByCluster,
} from './acquisition-clusters'
import { GROWTH_COHORTS } from '../content/growth-cohorts'
import { buildRouteSet } from '../content/quality-metrics'

// Wave 2D — acquisition-cluster classification.
//
// These tests exist to prove three things: the mapping is deterministic and
// total, every canonical route resolves to a real cluster (so a route added
// later cannot silently fall into "other" unnoticed), and the module carries no
// telemetry and no visitor data. The last point is the important one: the whole
// design of this Wave rests on classification being an OFFLINE operation over a
// pathname the tracker already sends.

const ROOT = path.join(__dirname, '..', '..')
const allRoutes = ['/', ...Array.from(buildRouteSet(ROOT)).filter(Boolean).map((r) => `/${r}`)]

describe('acquisition clusters — determinism and totality', () => {
  it('is deterministic: the same input always yields the same output', () => {
    for (const r of allRoutes) {
      const a = classifyRoute(r)
      const b = classifyRoute(r)
      expect(a).toEqual(b)
    }
  })

  it('is total: every canonical route classifies to a known cluster', () => {
    for (const r of allRoutes) {
      const c = classifyRoute(r)
      expect(ACQUISITION_CLUSTERS, `unknown cluster for ${r}`).toContain(c.cluster)
      expect(c.route).toBe(normalizeRoute(r))
    }
  })

  it('normalises query, fragment, trailing slash and absolute URLs to the canonical route', () => {
    expect(normalizeRoute('/pro-zamestnavatele/')).toBe('/pro-zamestnavatele')
    expect(normalizeRoute('/pro-zamestnavatele?utm_source=x')).toBe('/pro-zamestnavatele')
    expect(normalizeRoute('/pro-zamestnavatele#faq')).toBe('/pro-zamestnavatele')
    expect(normalizeRoute('https://talentpartnerid.com/pro-zamestnavatele')).toBe('/pro-zamestnavatele')
    expect(normalizeRoute('pro-zamestnavatele')).toBe('/pro-zamestnavatele')
    expect(normalizeRoute('')).toBe('/')
    expect(normalizeRoute('/')).toBe('/')
  })

  it('classifies the anchor routes exactly', () => {
    expect(classifyRoute('/').cluster).toBe('homepage')
    expect(classifyRoute('/poptavka-pracovniku').cluster).toBe('request')
    expect(classifyRoute('/kalkulacka-mzdy-agenturniho-zamestnance').cluster).toBe('calculator')
    expect(classifyRoute('/nabor-odbornych-pozic').cluster).toBe('technical_talent')
    expect(classifyRoute('/nabor-odbornych-pozic').pageType).toBe('hub')
    expect(classifyRoute('/absence-v-provozu').cluster).toBe('employer_problem')
    expect(classifyRoute('/cena-neobsazene-pozice').cluster).toBe('knowledge')
    expect(classifyRoute('/pracovnici-praha').cluster).toBe('region')
    expect(classifyRoute('/zamestnanecka-karta-2026').cluster).toBe('foreign_workers')
    expect(classifyRoute('/pracovnici-pro-vyrobu').cluster).toBe('industry')
  })
})

describe('acquisition clusters — Wave 2 coverage', () => {
  it('classifies every Wave 2 route into its intended commercial cluster', () => {
    const wave2 = GROWTH_COHORTS.find((c) => c.id === 'wave-2-technical-talent-and-employer-solutions')
    expect(wave2, 'wave 2 cohort must exist').toBeDefined()
    const expected: Record<string, string> = {
      'nabor-techniku-automatizace': 'technical_talent',
      'technicti-inzenyri': 'technical_talent',
      'technologove-a-konstrukteri': 'technical_talent',
      'nakup-a-zasobovani': 'technical_talent',
      'hromadny-nabor-pracovniku': 'employer_problem',
      'nabor-pri-nabehu-vyroby': 'employer_problem',
      'sezonni-navyseni-kapacity': 'employer_problem',
      'absence-v-provozu': 'employer_problem',
      'cena-neobsazene-pozice': 'knowledge',
      'zadani-pozice-a-profil-kandidata': 'knowledge',
    }
    for (const slug of wave2!.slugs) {
      expect(classifyRoute(`/${slug}`).cluster, `cluster for /${slug}`).toBe(expected[slug])
    }
  })

  it('leaves no Wave 1 or Wave 2 commercial page in "other"', () => {
    for (const cohort of GROWTH_COHORTS) {
      for (const slug of cohort.slugs) {
        expect(classifyRoute(`/${slug}`).cluster, `/${slug} fell into "other"`).not.toBe('other')
      }
    }
  })

  it('makes an unclassified new route visible rather than silently absorbing it', () => {
    // A route that does not exist yet must be reported as "other", which is what
    // scripts/validate-clusters.mjs fails on for commercial pages.
    expect(classifyRoute('/nejaka-nova-stranka-ktera-neexistuje').cluster).toBe('other')
  })

  it('summarises a route list by cluster', () => {
    const s = summariseByCluster(['/', '/poptavka-pracovniku', '/absence-v-provozu', '/nabor-techniku-automatizace'])
    expect(s.homepage).toBe(1)
    expect(s.request).toBe(1)
    expect(s.employer_problem).toBe(1)
    expect(s.technical_talent).toBe(1)
  })

  it('carries a stable classification version', () => {
    expect(CLASSIFICATION_VERSION).toMatch(/^\d{4}-\d{2}-\d{2}\.\d+$/)
  })
})

describe('acquisition clusters — privacy invariants', () => {
  const raw = fs.readFileSync(path.join(__dirname, 'acquisition-clusters.ts'), 'utf8')
  // Assertions run against CODE, not comments: the header deliberately names
  // the tracker constraints it is explaining, and documenting why something is
  // not used must not read as using it.
  const src = raw.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/.*$/gm, '$1')

  it('adds no telemetry: no network call of any kind', () => {
    expect(src).not.toMatch(/\bfetch\s*\(/)
    expect(src).not.toMatch(/sendBeacon/)
    expect(src).not.toMatch(/XMLHttpRequest/)
    expect(src).not.toMatch(/WebSocket/)
    expect(src).not.toMatch(/navigator\./)
  })

  it('installs no second tracker and touches no tracker API', () => {
    expect(src).not.toMatch(/webmasterid\.com/i)
    expect(src).not.toMatch(/tracker\.iife/i)
    expect(src).not.toMatch(/data-wmid-form/i)
    expect(src).not.toMatch(/createElement\(\s*['"]script/i)
    expect(src).not.toMatch(/gtag|dataLayer|analytics\.track/i)
  })

  it('reads no browser storage and no document', () => {
    expect(src).not.toMatch(/localStorage|sessionStorage|document\.cookie/)
  })

  it('contains no sensitive field name', () => {
    const forbidden = [
      'salary', 'mzda', 'wage', 'hrubaMzda', 'cistaMzda', 'employerCost', 'agencyFee',
      'budget', 'rozpocet', 'email', 'phone', 'telefon', 'companyName', 'contactName',
      'message', 'poznamka', 'note', 'nationality', 'narodnost', 'medical',
    ]
    for (const f of forbidden) {
      expect(src.toLowerCase(), `sensitive field "${f}" must not appear`).not.toContain(f.toLowerCase() + ':')
    }
  })

  it('never calls pathname-derived intent a lead or a conversion', () => {
    // The classification describes navigation, not verified outcomes. Delivery
    // of a mailto message cannot be observed, so those words are banned here.
    expect(src).not.toMatch(/\blead\b/i)
    expect(src).not.toMatch(/\bconversion\b/i)
    expect(src).not.toMatch(/\bsuccessfulRequest\b/i)
  })
})

describe('acquisition clusters — Wave 3 intent class', () => {
  it('derives an intent class for every canonical route', () => {
    for (const r of allRoutes) {
      const c = classifyRoute(r)
      expect(INTENT_CLASSES, `unknown intent class for ${r}`).toContain(c.intentClass)
    }
  })

  it('maps the anchor routes to the intended intent class', () => {
    expect(classifyRoute('/poptavka-pracovniku').intentClass).toBe('REQUEST_ENTRY')
    expect(classifyRoute('/kalkulacka-mzdy-agenturniho-zamestnance').intentClass).toBe('COMMERCIAL_RESEARCH')
    expect(classifyRoute('/absence-v-provozu').intentClass).toBe('HIRING_PROBLEM')
    expect(classifyRoute('/nabor-svarecu').intentClass).toBe('PROFESSION_DEMAND')
    expect(classifyRoute('/nabor-odbornych-pozic').intentClass).toBe('COMMERCIAL_RESEARCH')
    expect(classifyRoute('/zamestnanecka-karta-2026').intentClass).toBe('INFORMATIONAL')
  })

  it('calls arriving on the request page an ENTRY, never a conversion', () => {
    // Delivery of a mailto message is not observable, so the taxonomy itself
    // must not contain a word that implies a completed outcome.
    expect(INTENT_CLASSES.join(' ')).not.toMatch(/conversion|lead|success/i)
    expect(classifyRoute('/poptavka-pracovniku').intentClass).toBe('REQUEST_ENTRY')
  })
})
