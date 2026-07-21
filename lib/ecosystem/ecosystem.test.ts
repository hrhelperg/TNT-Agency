import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  ECOSYSTEM_PRODUCTS,
  CATEGORY_ORDER,
  CHANNEL_ORDER,
  currentProduct,
  productsInCategory,
  availableChannels,
  timelineProducts,
  type ChannelKind,
} from './registry'
import { ECOSYSTEM_COPY } from './copy'

const ROOT = process.cwd()
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8')
const stripComments = (s: string) =>
  s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')

const BANNER = read('components/ecosystem/EcosystemBanner.tsx')
const DIRECTORY = read('components/ecosystem/EcosystemDirectory.tsx')
const APP = read('pages/_app.tsx')
const CSS = read('styles.css')
const PKG = JSON.parse(read('package.json'))
const LANGS = ['cs', 'en', 'de'] as const

const allChannels = () =>
  ECOSYSTEM_PRODUCTS.flatMap((p) =>
    availableChannels(p).map((c) => ({ product: p.id, kind: c.kind, url: c.url })),
  )

describe('Ecosystem registry — validity', () => {
  it('has unique product ids', () => {
    const ids = ECOSYSTEM_PRODUCTS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has exactly one current product, and it is TalentPartnerID', () => {
    expect(ECOSYSTEM_PRODUCTS.filter((p) => p.current).length).toBe(1)
    expect(currentProduct().id).toBe('talentpartnerid')
    expect(currentProduct().name).toBe('TalentPartnerID')
  })

  it('every product has at least one real channel', () => {
    for (const p of ECOSYSTEM_PRODUCTS) {
      expect(availableChannels(p).length, `${p.id} has no channel`).toBeGreaterThan(0)
    }
  })

  it('every URL is absolute HTTPS', () => {
    for (const c of allChannels()) {
      expect(c.url.startsWith('https://'), `${c.product}.${c.kind}: ${c.url}`).toBe(true)
    }
  })

  it('contains no placeholder, empty or "#" URL', () => {
    for (const c of allChannels()) {
      expect(c.url.trim().length).toBeGreaterThan(12)
      expect(c.url).not.toBe('#')
      expect(/#$|example\.com|placeholder|TODO|localhost|127\.0\.0\.1/i.test(c.url), c.url).toBe(false)
    }
  })

  it('uses no staging, preview or ephemeral host', () => {
    for (const c of allChannels()) {
      expect(/netlify\.app|vercel\.app|staging\.|\.preview\.|ngrok/i.test(c.url), c.url).toBe(false)
    }
  })

  it('has no duplicate channel URL across the whole ecosystem', () => {
    const urls = allChannels().map((c) => c.url)
    const dupes = urls.filter((u, i) => urls.indexOf(u) !== i)
    expect(dupes).toEqual([])
  })

  it('carries no tracking query parameters on owned links', () => {
    for (const c of allChannels()) {
      expect(/utm_|pcampaignid|gclid|fbclid|ref=/i.test(c.url), `${c.product}: ${c.url}`).toBe(false)
    }
  })

  it('every product belongs to a known category, and every category is ordered', () => {
    for (const p of ECOSYSTEM_PRODUCTS) {
      expect(CATEGORY_ORDER).toContain(p.category)
    }
    for (const cat of CATEGORY_ORDER) {
      expect(productsInCategory(cat).length, `${cat} is empty`).toBeGreaterThan(0)
    }
  })

  it('channel keys are limited to the four supported kinds', () => {
    for (const p of ECOSYSTEM_PRODUCTS) {
      for (const k of Object.keys(p.channels)) {
        expect(CHANNEL_ORDER).toContain(k as ChannelKind)
      }
      // No empty-string channel values.
      for (const v of Object.values(p.channels)) expect(String(v).trim().length).toBeGreaterThan(0)
    }
  })
})

describe('Ecosystem registry — supplied inventory is present and exact', () => {
  const url = (id: string, kind: ChannelKind) =>
    ECOSYSTEM_PRODUCTS.find((p) => p.id === id)?.channels[kind]

  it('every supplied iOS link is present', () => {
    expect(url('zip-archive', 'ios')).toBe('https://apps.apple.com/app/id6753772583')
    expect(url('smart-printer', 'ios')).toBe('https://apps.apple.com/app/id6746067890')
    expect(url('fax', 'ios')).toBe('https://apps.apple.com/app/id6760895885')
    expect(url('pdf-editor', 'ios')).toBe('https://apps.apple.com/app/id6747341672')
    expect(url('cv-resume-builder', 'ios')).toBe('https://apps.apple.com/app/id6745150815')
    expect(url('invoice-maker', 'ios')).toBe('https://apps.apple.com/app/id6747311276')
    expect(url('pocket-manager', 'ios')).toBe('https://apps.apple.com/app/id6743084126')
  })

  it('every supplied Android link is present', () => {
    const play = (pkg: string) => `https://play.google.com/store/apps/details?id=${pkg}`
    expect(url('zip-archive', 'android')).toBe(play('com.ziparchivator.zip'))
    expect(url('smart-printer', 'android')).toBe(play('com.helperg.smart.printer'))
    expect(url('fax', 'android')).toBe(play('com.helperg.fax.app'))
    expect(url('pdf-editor', 'android')).toBe(play('com.helperg.editor.documents'))
    expect(url('invoice-maker', 'android')).toBe(play('com.helperg.invoicer'))
    expect(url('pocket-manager', 'android')).toBe(play('com.helperg.money'))
  })

  it('CV & Resume Builder has NO invented Android link', () => {
    const p = ECOSYSTEM_PRODUCTS.find((x) => x.id === 'cv-resume-builder')
    expect(p?.channels.ios).toBeTruthy()
    expect(p?.channels.android).toBeUndefined()
    expect(availableChannels(p!).map((c) => c.kind)).toEqual(['ios'])
  })

  it('Cash Workspace is omitted rather than given a guessed URL', () => {
    const found = ECOSYSTEM_PRODUCTS.find((p) => /cash.?workspace/i.test(p.id + p.name))
    expect(found).toBeUndefined()
    expect(/cash-?workspace/i.test(JSON.stringify(ECOSYSTEM_PRODUCTS))).toBe(false)
  })

  it('every supplied website is present', () => {
    const sites = allChannels().filter((c) => c.kind === 'website').map((c) => c.url)
    for (const host of [
      'webmasterid.com', 'geobusinessiq.com', 'talentpartnerid.com', 'hrhelperg.com',
      'twin-phone.com', 'socialsporthub.com', 'agricultureid.com', 'asteriastar.com',
      'faunahub.com', 'builddesignhub.com', 'printerarchive.net', 'virtueandpower.com',
      'globalcityintelligence.com', 'petrohrys.com', 'helperg.com',
    ]) {
      expect(sites.some((u) => u.includes(host)), `missing ${host}`).toBe(true)
    }
    expect(sites.length).toBe(15)
  })
})

describe('Ecosystem — timeline', () => {
  it('includes the current product and returns at most the requested count', () => {
    const t = timelineProducts(6)
    expect(t.length).toBeLessThanOrEqual(6)
    expect(t.some((p) => p.current)).toBe(true)
    expect(t[0].id).toBe('talentpartnerid')
  })

  it('every timeline product has a website to link to', () => {
    for (const p of timelineProducts(6)) expect(p.channels.website).toBeTruthy()
  })

  it('timeline priorities are unique', () => {
    const ps = ECOSYSTEM_PRODUCTS.map((p) => p.timelinePriority).filter((x) => typeof x === 'number')
    expect(new Set(ps).size).toBe(ps.length)
  })
})

describe('Ecosystem — localization parity', () => {
  it('cs/en/de have identical key sets', () => {
    const cs = ECOSYSTEM_COPY.cs
    for (const l of LANGS) {
      const c = ECOSYSTEM_COPY[l]
      expect(Object.keys(c).sort()).toEqual(Object.keys(cs).sort())
      expect(Object.keys(c.channels).sort()).toEqual(Object.keys(cs.channels).sort())
      expect(Object.keys(c.categories).sort()).toEqual(Object.keys(cs.categories).sort())
    }
  })

  it('uses the exact prescribed primary copy', () => {
    expect(ECOSYSTEM_COPY.en.partOf).toBe('Part of HELPERG Ecosystem')
    expect(ECOSYSTEM_COPY.en.exploreAll).toBe('Explore all products')
    expect(ECOSYSTEM_COPY.en.currentProduct).toBe('Current product')
    expect(ECOSYSTEM_COPY.cs.partOf).toBe('Součást ekosystému HELPERG')
    expect(ECOSYSTEM_COPY.cs.exploreAll).toBe('Prozkoumat všechny produkty')
    expect(ECOSYSTEM_COPY.cs.currentProduct).toBe('Aktuální produkt')
    expect(ECOSYSTEM_COPY.de.partOf).toBe('Teil des HELPERG-Ökosystems')
    expect(ECOSYSTEM_COPY.de.exploreAll).toBe('Alle Produkte entdecken')
    expect(ECOSYSTEM_COPY.de.currentProduct).toBe('Aktuelles Produkt')
  })

  it('uses the prescribed channel labels', () => {
    expect(ECOSYSTEM_COPY.en.channels).toEqual({ website: 'Website', webApp: 'Web App', ios: 'iOS', android: 'Android' })
    expect(ECOSYSTEM_COPY.cs.channels).toEqual({ website: 'Web', webApp: 'Webová aplikace', ios: 'iOS', android: 'Android' })
    expect(ECOSYSTEM_COPY.de.channels).toEqual({ website: 'Website', webApp: 'Web-App', ios: 'iOS', android: 'Android' })
  })

  it('every category has a label in all three languages', () => {
    for (const cat of CATEGORY_ORDER) {
      for (const l of LANGS) expect(typeof ECOSYSTEM_COPY[l].categories[cat]).toBe('string')
    }
  })
})

describe('Ecosystem — global mounting and markup', () => {
  it('is mounted in the shared layout, not page by page', () => {
    expect(APP).toContain('EcosystemBanner')
    expect(APP).toContain('<EcosystemBanner />')
    // No page may import it directly.
    const pages = fs.readdirSync(path.join(ROOT, 'pages')).filter((f) => f.endsWith('.tsx') && f !== '_app.tsx')
    for (const f of pages) {
      expect(read(`pages/${f}`).includes('EcosystemBanner'), `${f} imports the banner directly`).toBe(false)
    }
  })

  it('renders before the page (and therefore before the site header)', () => {
    expect(APP.indexOf('<EcosystemBanner />')).toBeLessThan(APP.indexOf('<Component'))
  })

  it('marks the current product accessibly', () => {
    expect(BANNER).toContain('aria-current="page"')
    // Meaning is not conveyed by colour alone.
    expect(BANNER).toContain('c.currentProduct')
    expect(BANNER).toContain('sr-only')
  })

  it('uses a semantic navigation landmark with a label', () => {
    expect(BANNER).toContain('<nav')
    expect(BANNER).toContain('aria-label={c.ariaLabel}')
  })

  it('all product links are real anchors (navigation does not require JS)', () => {
    expect(BANNER).toContain('<a')
    expect(BANNER).toContain('href={p.channels.website as string}')
    expect(DIRECTORY).toContain('href={ch.url}')
  })

  it('every external link carries the security attributes', () => {
    const code = stripComments(BANNER) + stripComments(DIRECTORY)
    // Annotated explicitly: `String.match(...) ?? []` infers as
    // `RegExpMatchArray | never[]`, and .filter over that union can resolve the
    // callback parameter to `never` depending on the resolved lib types.
    const anchors: string[] = code.match(/<a[\s\S]*?>/g) ?? []
    const external = anchors.filter((a) => a.includes('href=') && !a.includes("href=\"#"))
    expect(external.length).toBeGreaterThan(0)
    for (const a of external) {
      expect(a.includes('target="_blank"'), a.slice(0, 60)).toBe(true)
      expect(a.includes('rel="noopener noreferrer"'), a.slice(0, 60)).toBe(true)
    }
  })

  it('is not dismissible (permanent ecosystem navigation)', () => {
    expect(/dismiss|localStorage|sessionStorage|document\.cookie/i.test(stripComments(BANNER))).toBe(false)
  })

  it('renders no channel control when the URL does not exist', () => {
    // Rendering is driven by availableChannels(), which filters the registry.
    expect(DIRECTORY).toContain('availableChannels(p)')
    expect(DIRECTORY).toContain('if (channels.length === 0) return null')
    // No control is RENDERED disabled. (`button:not([disabled])` inside the
    // focus-trap selector is a query string, not a rendered attribute.)
    const jsx = stripComments(DIRECTORY)
    expect(/\sdisabled(=|\s|\/|>)/.test(jsx), 'renders a disabled attribute').toBe(false)
    expect(/aria-disabled/.test(jsx)).toBe(false)
  })
})

describe('Ecosystem — directory accessibility', () => {
  it('is a labelled modal dialog', () => {
    expect(DIRECTORY).toContain('role="dialog"')
    expect(DIRECTORY).toContain('aria-modal="true"')
    expect(DIRECTORY).toContain('aria-labelledby="eco-dir-title"')
  })

  it('closes on Escape and traps focus', () => {
    expect(DIRECTORY).toContain("e.key === 'Escape'")
    expect(DIRECTORY).toContain("e.key !== 'Tab'")
  })

  it('returns focus to the trigger on close', () => {
    expect(DIRECTORY).toContain('triggerRef')
    expect(DIRECTORY).toContain('target?.focus?.()')
  })

  it('locks background scroll without shifting layout', () => {
    expect(DIRECTORY).toContain("body.style.overflow = 'hidden'")
    expect(DIRECTORY).toContain('paddingRight')
  })

  it('gives the close control an accessible label', () => {
    expect(DIRECTORY).toContain('aria-label={c.close}')
  })

  it('uses semantic headings per group', () => {
    expect(DIRECTORY).toContain('<h2')
    expect(DIRECTORY).toContain('<h3')
    expect(DIRECTORY).toContain('aria-labelledby={`eco-cat-')
  })

  it('keeps no hidden content focusable (dialog unmounts when closed)', () => {
    expect(DIRECTORY).toContain('if (!open) return null')
  })

  it('the trigger declares its dialog relationship', () => {
    expect(BANNER).toContain('aria-haspopup="dialog"')
    expect(BANNER).toContain('aria-expanded={open}')
  })
})

describe('Ecosystem — layout safety and performance', () => {
  it('reserves its own space so nothing shifts after hydration', () => {
    expect(CSS).toContain('--eco-h:')
    expect(CSS).toContain('--eco-total:')
    expect(CSS).toContain('body { padding-top: var(--eco-total); }')
    expect(CSS).toContain('.header { top: var(--eco-total); }')
  })

  it('accounts for the iPhone safe-area inset', () => {
    expect(CSS).toContain('env(safe-area-inset-top')
  })

  it('sits above the site header but below the cookie banner', () => {
    expect(CSS).toContain('--eco-z: 101')
  })

  it('derives anchor offsets from the banner height, not a magic number', () => {
    expect(CSS).toContain('scroll-padding-top: calc(var(--eco-total) + 88px)')
    expect(CSS).toContain('scroll-margin-top: calc(var(--eco-total) + 88px)')
  })

  it('keeps the mobile menu clear of banner + header', () => {
    expect(CSS).toContain('padding-top: calc(88px + var(--eco-total))')
  })

  it('respects reduced-motion and adds no animation', () => {
    expect(CSS).toContain('prefers-reduced-motion: reduce')
    // Guard against actual motion, not vocabulary: "BlinkMacSystemFont" is a
    // font-stack entry, not a blinking animation.
    expect(/@keyframes\s+eco-/i.test(CSS)).toBe(false)
    expect(/<marquee|display:\s*marquee/i.test(CSS)).toBe(false)
    const ecoBlock = CSS.slice(CSS.indexOf('HELPERG Ecosystem banner'))
    expect(/animation[^;]*infinite/i.test(ecoBlock), 'infinite animation in ecosystem CSS').toBe(false)
    expect(/@keyframes/i.test(ecoBlock), 'ecosystem CSS defines keyframes').toBe(false)
  })

  it('adds no third-party UI, animation or icon dependency', () => {
    const deps = Object.keys({ ...(PKG.dependencies ?? {}), ...(PKG.devDependencies ?? {}) })
    for (const d of deps) {
      expect(
        /framer-motion|gsap|swiper|slick|headlessui|radix|mui|chakra|bootstrap|font-awesome|lucide|heroicons/i.test(d),
        d,
      ).toBe(false)
    }
    // Icons are inline SVG in the components themselves.
    expect(BANNER).toContain('<svg')
    expect(DIRECTORY).toContain('<svg')
  })

  it('requires no backend, API or environment variable', () => {
    const code = stripComments(BANNER) + stripComments(DIRECTORY)
    expect(/fetch\(|XMLHttpRequest|process\.env|\/api\//.test(code)).toBe(false)
  })
})

describe('Ecosystem — must not disturb existing SEO or privacy', () => {
  it('adds no product to structured data', () => {
    const code = stripComments(BANNER) + stripComments(DIRECTORY)
    expect(/application\/ld\+json|schema\.org/i.test(code)).toBe(false)
  })

  it('does not touch canonical tags or the sitemap', () => {
    const code = BANNER + DIRECTORY + APP
    expect(/rel="canonical"|sitemap/i.test(code)).toBe(false)
    // The sitemap keeps its existing size — the banner adds no route.
    const sitemap = read('public/sitemap.xml')
    expect((sitemap.match(/<loc>/g) ?? []).length).toBe(155)
    expect(sitemap).not.toContain('helperg.com')
  })

  it('creates no localized route and adds no hreflang', () => {
    const code = BANNER + DIRECTORY + APP
    expect(/hrefLang|hreflang/.test(code)).toBe(false)
    for (const c of allChannels()) expect(/\/(en|cs|de)\/$/.test(c.url)).toBe(false)
  })

  it('adds no nofollow to owned ecosystem properties', () => {
    expect(/nofollow/i.test(BANNER + DIRECTORY)).toBe(false)
  })

  it('transmits no personal, form or calculator data with a click', () => {
    const code = stripComments(BANNER) + stripComments(DIRECTORY)
    for (const banned of [
      'companyName', 'contactName', 'email', 'phone', 'profession', 'headcount',
      'netSalary', 'employerCost', 'agencyFee', 'grossSalary', 'budget', 'consent',
    ]) {
      expect(code.includes(banned), `banner must not reference ${banned}`).toBe(false)
    }
    // No query string is appended to any ecosystem URL.
    for (const c of allChannels()) expect(c.url.includes('?') && !c.url.includes('play.google.com')).toBe(false)
  })

  it('creates no persistent tracking for the banner', () => {
    const code = stripComments(BANNER) + stripComments(DIRECTORY)
    expect(/localStorage|document\.cookie|indexedDB|gtag\(|dataLayer|sendBeacon/.test(code)).toBe(false)
  })
})
