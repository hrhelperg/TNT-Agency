import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import {
  WEBMASTERID_ENDPOINT,
  WEBMASTERID_SCRIPT_ID,
  WEBMASTERID_SITE_ID,
  WEBMASTERID_SRC,
  WEBMASTERID_STORAGE_KEYS,
  clearWebmasterIdStorage,
} from './webmasterid'
import { CONSENT_KEY, CONSENT_EVENT, readConsent, writeConsent } from '../consent'

// These tests run in the repo's standard Node environment (no DOM), so the
// component-level assertions are made against source text — the same technique
// already used by lib/ecosystem/ecosystem.test.ts and the conversion guards in
// lib/employer-request/conversion.test.ts.

const ROOT = path.join(__dirname, '..', '..')
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8')
const exists = (p: string) => fs.existsSync(path.join(ROOT, p))

/**
 * Source with comments stripped. Assertions about what the code DOES must not
 * be tripped by documentation describing what the tracker does — this module is
 * heavily commented precisely because the bundle's behaviour was verified by
 * reading it. Mirrors the `code()` helper in scripts/security-check.js.
 */
const code = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')

/**
 * The ecosystem product directory links to the WebmasterID *product page*. That
 * is a public marketing link, not an analytics endpoint, and predates this
 * integration (lib/ecosystem/registry.ts, shipped with the ecosystem banner).
 */
const ECOSYSTEM_PRODUCT_URL = 'https://webmasterid.com/'

const TRACKER = read('components/analytics/WebmasterIDTracker.tsx')
const APP = read('pages/_app.tsx')
const BANNER = read('components/CookieBanner.tsx')

/** Every .ts/.tsx under these roots, excluding tests. */
const walk = (dir: string, out: string[] = []): string[] => {
  const full = path.join(ROOT, dir)
  if (!fs.existsSync(full)) return out
  for (const e of fs.readdirSync(full, { withFileTypes: true })) {
    const rel = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(e.name)) continue
      walk(rel, out)
    } else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) {
      out.push(rel)
    }
  }
  return out
}

const APP_FILES = [...walk('components'), ...walk('lib'), ...walk('pages')]

describe('WebmasterID — exact configuration', () => {
  it('uses the exact registered site id', () => {
    expect(WEBMASTERID_SITE_ID).toBe('wm_wfywm8g9qkoonabl')
  })

  it('uses the exact ingest endpoint', () => {
    expect(WEBMASTERID_ENDPOINT).toBe('https://webmasterid-ingest-api.vercel.app/api/events')
  })

  it('loads the official tracker bundle from WebmasterID', () => {
    expect(WEBMASTERID_SRC).toBe('https://webmasterid.com/tracker.iife.min.js')
  })

  it('preserves the documented script id', () => {
    expect(WEBMASTERID_SCRIPT_ID).toBe('webmasterid-tracker')
  })

  it('satisfies the tracker bundle own site-id format (wm_ + 16 lowercase alnum)', () => {
    // The official bundle refuses to initialise if this does not match.
    expect(WEBMASTERID_SITE_ID).toMatch(/^wm_[0-9a-z]{16}$/)
  })

  it('uses HTTPS everywhere', () => {
    for (const url of [WEBMASTERID_ENDPOINT, WEBMASTERID_SRC]) {
      expect(url.startsWith('https://')).toBe(true)
    }
  })

  it('carries no private key or credential', () => {
    const src = code(read('lib/analytics/webmasterid.ts'))
    expect(src).not.toMatch(/api[_-]?key|secret|token|password|Bearer/i)
    expect(src).not.toMatch(/['"`]eyJ[A-Za-z0-9_-]{20,}/)
  })
})

describe('WebmasterID — exactly one integration', () => {
  it('renders the tracker script in exactly one component', () => {
    // A file "renders" the tracker if it emits a script element configured with
    // the tracker source. lib/analytics/webmasterid.ts merely *declares* the
    // URL as a constant and renders nothing.
    const rendering = APP_FILES.filter((f) => {
      const src = code(read(f))
      return src.includes('<Script') && src.includes('WEBMASTERID_SRC')
    })
    expect(rendering).toEqual(['components/analytics/WebmasterIDTracker.tsx'])
  })

  it('mounts that component exactly once, from the shared app layer', () => {
    const mounts = APP_FILES.filter((f) => /<WebmasterIDTracker\s*\/>/.test(read(f)))
    expect(mounts).toEqual(['pages/_app.tsx'])
    expect(APP.match(/<WebmasterIDTracker\s*\/>/g)).toHaveLength(1)
  })

  it('is not added to any individual page, footer, form or article template', () => {
    const INTEGRATION_FILES = [
      'pages/_app.tsx', // the single mount point
      'components/analytics/WebmasterIDTracker.tsx', // the single renderer
      'lib/analytics/webmasterid.ts', // declares the constants, renders nothing
    ]
    for (const f of APP_FILES) {
      if (INTEGRATION_FILES.includes(f)) continue
      const src = code(read(f))
      // Naming the provider in prose is fine (the privacy policy must, and the
      // ecosystem directory links to the product). Mounting or configuring it
      // outside the shared layer is not.
      expect(src, `${f} must not mount the tracker`).not.toMatch(/WebmasterIDTracker/)
      expect(src, `${f} must not configure the tracker`).not.toMatch(/data-wmid|WEBMASTERID_SRC|WEBMASTERID_SITE_ID|WEBMASTERID_ENDPOINT/)
    }
  })

  it('does not install the Next.js SDK alongside the script tag', () => {
    const pkg = JSON.parse(read('package.json'))
    const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
    expect(Object.keys(deps)).not.toContain('@webmasterid/sdk-next')
    for (const f of APP_FILES) {
      expect(read(f)).not.toMatch(/@webmasterid\/sdk-next/)
    }
  })

  it('does not vendor, proxy or self-host the tracker bundle', () => {
    expect(exists('public/tracker.iife.min.js')).toBe(false)
    expect(exists('public/webmasterid.js')).toBe(false)
    // The src must point at webmasterid.com, never at a first-party path.
    expect(TRACKER).not.toMatch(/src=["']\/(?!\/)/)
  })

  it('declares no alternative site id or ingest endpoint anywhere', () => {
    const ALLOWED = [WEBMASTERID_SRC, WEBMASTERID_ENDPOINT, ECOSYSTEM_PRODUCT_URL]
    for (const f of APP_FILES) {
      const src = code(read(f))
      for (const m of src.match(/wm_[0-9a-z]{16}/g) ?? []) {
        expect(m, `unexpected site id in ${f}`).toBe(WEBMASTERID_SITE_ID)
      }
      for (const m of src.match(/https:\/\/[a-z0-9.-]*webmasterid[a-z0-9.-]*[^\s'"`)]*/gi) ?? []) {
        expect(ALLOWED, `unexpected WebmasterID URL in ${f}`).toContain(m)
      }
    }
  })
})

describe('WebmasterID — consent gating', () => {
  it('reads the canonical consent store rather than creating a second one', () => {
    expect(TRACKER).toMatch(/from '\.\.\/\.\.\/lib\/consent'/)
    expect(CONSENT_KEY).toBe('cookie_consent')
    // The tracker must not invent its own persisted consent flag.
    expect(TRACKER).not.toMatch(/localStorage\.setItem/)
  })

  it('renders nothing at all until consent is granted', () => {
    expect(TRACKER).toMatch(/if \(!granted\) return null/)
    // The gate must be the accepted state specifically, not merely "answered".
    expect(TRACKER).toMatch(/readConsent\(\) === 'accepted'/)
  })

  it('places the gate before the script element in the component source', () => {
    expect(TRACKER.indexOf('if (!granted) return null')).toBeLessThan(TRACKER.indexOf('<Script'))
  })

  it('re-evaluates the gate when consent changes, in this tab and other tabs', () => {
    expect(TRACKER).toMatch(/addEventListener\(CONSENT_EVENT, sync\)/)
    expect(TRACKER).toMatch(/addEventListener\('storage', sync\)/)
    expect(TRACKER).toMatch(/removeEventListener\(CONSENT_EVENT, sync\)/)
    expect(TRACKER).toMatch(/removeEventListener\('storage', sync\)/)
  })

  it('treats blocked storage as no consent', () => {
    const consent = read('lib/consent/index.ts')
    expect(consent).toMatch(/catch\s*\{[\s\S]*?return 'unset'/)
  })

  it('clears the tracker identifiers when consent is rejected, and only then', () => {
    const body = (fn: string) => {
      const m = code(BANNER).match(new RegExp(`function ${fn}\\(\\)\\s*\\{([\\s\\S]*?)\\n  \\}`))
      expect(m, `${fn}() body not found`).toBeTruthy()
      return m![1]
    }
    expect(body('reject')).toMatch(/clearWebmasterIdStorage\(\)/)
    expect(body('accept')).not.toMatch(/clearWebmasterIdStorage/)
    expect(body('reject')).toMatch(/writeConsent\('rejected'\)/)
    expect(body('accept')).toMatch(/writeConsent\('accepted'\)/)
  })

  it('keeps accept and reject equally prominent', () => {
    // Both are plain buttons in the same actions row; neither is hidden or
    // visually demoted to a link.
    expect(BANNER).toMatch(/cookie-btn cookie-btn--reject/)
    expect(BANNER).toMatch(/cookie-btn cookie-btn--accept/)
    expect(BANNER).toMatch(/<button type="button" onClick={reject}/)
    expect(BANNER).toMatch(/<button type="button" onClick={accept}/)
  })

  it('enumerates exactly the storage keys the official bundle writes', () => {
    expect([...WEBMASTERID_STORAGE_KEYS]).toEqual(['wmid:av:v1', 'wmid:as:v1', 'wmid:as:last:v1'])
  })

  it('clearWebmasterIdStorage is a no-op on the server rather than throwing', () => {
    expect(typeof globalThis.window).toBe('undefined')
    expect(() => clearWebmasterIdStorage()).not.toThrow()
  })

  it('readConsent/writeConsent are server-safe', () => {
    expect(readConsent()).toBe('unset')
    expect(() => writeConsent('accepted')).not.toThrow()
  })

  it('names the consent event distinctly from the language event', () => {
    expect(CONSENT_EVENT).toBe('tnt-consent')
    expect(CONSENT_EVENT).not.toBe('tnt-lang')
  })
})

describe('WebmasterID — route tracking and duplicate protection', () => {
  it('adds no manual router tracking (the official bundle already handles it)', () => {
    expect(TRACKER).not.toMatch(/useRouter|routeChangeComplete|router\.events/)
    expect(APP).not.toMatch(/routeChangeComplete|router\.events/)
  })

  it('emits no custom or conversion events', () => {
    expect(TRACKER).not.toMatch(/\.track\(|trackConversion|pageView\(|identify\(/)
  })

  it('relies on the next/script id cache for single injection', () => {
    expect(TRACKER).toMatch(/id={WEBMASTERID_SCRIPT_ID}/)
    expect(TRACKER).toMatch(/from 'next\/script'/)
  })

  it('uses a non-blocking post-hydration strategy', () => {
    expect(TRACKER).toMatch(/strategy="afterInteractive"/)
    expect(TRACKER).not.toMatch(/beforeInteractive/)
  })

  it('preserves the documented defer attribute', () => {
    expect(TRACKER).toMatch(/\n\s+defer\n/)
  })

  it('uses no inline executable script', () => {
    expect(TRACKER).not.toMatch(/dangerouslySetInnerHTML/)
  })
})

describe('WebmasterID — no personal data may reach analytics', () => {
  const FORBIDDEN = [
    'companyName', 'contactName', 'email', 'phone', 'telefon', 'requirements',
    'budget', 'netSalary', 'grossSalary', 'employerCost', 'agencyFee', 'margin',
    'savings', 'marketingConsent', 'mailto', 'clipboard', 'leadReference',
  ]

  it('the tracker component references no form, calculator or lead field', () => {
    for (const term of FORBIDDEN) {
      expect(TRACKER, `tracker must not reference ${term}`).not.toMatch(new RegExp(term, 'i'))
    }
  })

  it('the tracker reads no input, form or field value', () => {
    expect(TRACKER).not.toMatch(/\.value\b|querySelector|getElementsBy|FormData|addEventListener\('(input|change|submit)'/)
  })

  it('the tracker performs no network I/O of its own', () => {
    expect(TRACKER).not.toMatch(/\bfetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket/)
    expect(read('lib/analytics/webmasterid.ts')).not.toMatch(/\bfetch\s*\(|XMLHttpRequest|sendBeacon/)
  })

  it('the tracker writes no cookie and no new analytics storage', () => {
    expect(TRACKER).not.toMatch(/document\.cookie|localStorage\.setItem|sessionStorage\.setItem|indexedDB/)
    // The analytics module only ever REMOVES the bundle's own keys.
    const mod = read('lib/analytics/webmasterid.ts')
    expect(mod).not.toMatch(/setItem/)
    expect(mod).toMatch(/removeItem/)
  })

  it('the employer request form is untouched by analytics', () => {
    const form = read('components/EmployerRequestForm.tsx')
    expect(form).not.toMatch(/webmasterid|WebmasterID|wm_|data-wmid/i)
  })

  it('no form on the site opts into the bundle form_submit listener', () => {
    // The official bundle emits form_submit ONLY for a form carrying
    // data-wmid-form. Nothing here does, so no form event can ever fire.
    for (const f of APP_FILES) {
      expect(code(read(f)), `${f} must not opt a form into tracking`).not.toMatch(/data-wmid-form/)
    }
  })

  it('no element opts into declarative CTA, purchase or signup events', () => {
    for (const f of APP_FILES) {
      const src = code(read(f))
      expect(src, f).not.toMatch(/data-wmid-(cta|event|value|currency|product|plan|source)/)
      expect(src, f).not.toMatch(/data-cta-id/)
    }
  })

  it('the calculator is untouched by analytics', () => {
    const calc = read('pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx')
    expect(calc).not.toMatch(/webmasterid|data-wmid|wm_wfy/i)
  })

  it('nothing writes sensitive values into the URL, which page_view transmits', () => {
    // page_view carries location.href, so a URL write would be a leak vector.
    for (const f of APP_FILES) {
      expect(code(read(f)), f).not.toMatch(/history\.(push|replace)State|location\.search\s*=|location\.hash\s*=/)
    }
  })
})

describe('WebmasterID — architecture is preserved', () => {
  it('adds no backend, API route or serverless function', () => {
    expect(exists('pages/api')).toBe(false)
    expect(exists('netlify/functions')).toBe(false)
    expect(exists('lib/server')).toBe(false)
  })

  it('adds no Supabase or database dependency', () => {
    const pkg = JSON.parse(read('package.json'))
    const deps = Object.keys({ ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) })
    expect(deps.filter((d) => /supabase|prisma|drizzle|mongoose|firebase|^pg$|mysql/i.test(d))).toEqual([])
    expect(exists('supabase')).toBe(false)
  })

  it('adds no runtime dependency at all', () => {
    const pkg = JSON.parse(read('package.json'))
    expect(Object.keys(pkg.dependencies).sort()).toEqual(['next', 'react', 'react-dom'])
  })

  it('does not proxy the tracker or ingest through this site', () => {
    const netlify = read('netlify.toml')
    expect(netlify).not.toMatch(/webmasterid/i)
  })

  it('requires no environment variable', () => {
    for (const f of ['lib/analytics/webmasterid.ts', 'components/analytics/WebmasterIDTracker.tsx']) {
      expect(read(f)).not.toMatch(/process\.env/)
    }
  })

  it('leaves server-rendered markup unchanged: the tracker is client-gated only', () => {
    // Nothing is emitted during SSR, so canonical tags, structured data,
    // robots directives and article markup are byte-identical to before.
    expect(read('pages/_document.tsx')).not.toMatch(/webmasterid/i)
    expect(TRACKER).toMatch(/useState\(false\)/)
  })

  it('does not touch the sitemap or add the endpoint to it', () => {
    const sitemap = read('public/sitemap.xml')
    expect(sitemap).not.toMatch(/webmasterid/i)
  })

  it('does not alter robots directives', () => {
    expect(read('public/robots.txt')).not.toMatch(/webmasterid/i)
  })
})

describe('WebmasterID — failure handling', () => {
  it('handles a tracker load failure silently', () => {
    expect(TRACKER).toMatch(/onError=\{\(\) => \{\}\}/)
  })

  it('shows no analytics error UI and blocks nothing', () => {
    expect(TRACKER).not.toMatch(/alert\(|throw new Error|role="alert"|setTimeout|setInterval|retry/i)
  })

  it('renders null rather than a wrapper when analytics is unavailable', () => {
    // No layout shift, no placeholder, no Core Web Vitals impact.
    expect(TRACKER).toMatch(/return null/)
    expect(TRACKER).not.toMatch(/<div|<span|<noscript/)
  })
})
