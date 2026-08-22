import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import vm from 'vm'
import {
  CHROME_NAV,
  CHROME_FOOTER,
  NAV_TARGETS,
  FOOTER_TARGETS,
  REQUEST_WORKERS,
  resolveNavHref,
  footerTarget,
  type NavKey,
  type FooterKey,
} from './chrome'
import { ALL_CONCEPTS, urlFor, LOCALE_CONCEPTS } from './registry'

/**
 * chrome.ts duplicates strings that already exist in public/script.js. A second
 * copy is only acceptable if it cannot drift, so these tests parse the real
 * dictionary out of the shipped client file and compare every label.
 */
function clientDictionary(): Record<string, Record<string, Record<string, string>>> {
  const src = fs.readFileSync(path.join(process.cwd(), 'public/script.js'), 'utf8')
  const start = src.search(/const T\s*=\s*\{/)
  expect(start, 'const T dictionary not found in public/script.js').toBeGreaterThan(-1)
  const open = src.indexOf('{', start)
  let depth = 0
  let end = -1
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') {
      depth--
      if (depth === 0) { end = i + 1; break }
    }
  }
  expect(end, 'unbalanced braces in the T dictionary').toBeGreaterThan(-1)
  return vm.runInNewContext(`(${src.slice(open, end)})`)
}

describe('the server chrome copy cannot drift from the client dictionary', () => {
  const T = clientDictionary()

  it('covers exactly the three shipped languages', () => {
    expect(Object.keys(T).sort()).toEqual(['cs', 'de', 'en'])
    expect(Object.keys(CHROME_NAV).sort()).toEqual(['cs', 'de', 'en'])
  })

  for (const lang of ['cs', 'en', 'de'] as const) {
    it(`every ${lang} label matches public/script.js byte for byte`, () => {
      for (const key of Object.keys(CHROME_NAV[lang]) as NavKey[]) {
        expect(T[lang].nav[key], `${lang}.nav.${key}`).toBe(CHROME_NAV[lang][key])
      }
    })
  }

  for (const lang of ['cs', 'en', 'de'] as const) {
    it(`every ${lang} FOOTER label matches public/script.js byte for byte`, () => {
      for (const key of Object.keys(CHROME_FOOTER[lang]) as FooterKey[]) {
        // 'links.permanent' is nested one level in the client dictionary.
        const value = key.split('.').reduce<any>((acc, part) => acc?.[part], T[lang].footer)
        expect(value, `${lang}.footer.${key}`).toBe(CHROME_FOOTER[lang][key])
      }
    })
  }

  it('covers every footer string the component renders — none left behind', () => {
    const footer = fs.readFileSync(path.join(process.cwd(), 'components/Footer.tsx'), 'utf8')
    const rendered = Array.from(footer.matchAll(/footer\.([A-Za-z0-9.]+)'/g), (m) => m[1])
    expect(rendered.length, 'no footer.* keys found — did the component change shape?').toBeGreaterThan(0)
    for (const key of Array.from(new Set(rendered))) {
      expect(Object.keys(CHROME_FOOTER.cs), `Footer renders footer.${key} but CHROME_FOOTER has no such key`).toContain(key)
    }
  })

  it('every footer link key has a destination', () => {
    for (const key of Object.keys(CHROME_FOOTER.cs) as FooterKey[]) {
      const isLink = FOOTER_TARGETS.some((t) => t.key === key)
      if (isLink) expect(() => footerTarget(key)).not.toThrow()
    }
    for (const t of FOOTER_TARGETS) {
      expect(Object.keys(CHROME_FOOTER.cs), `FOOTER_TARGETS names ${t.key}`).toContain(t.key)
    }
  })

  it('the chrome components hold no hardcoded labels of their own', () => {
    // This replaces an earlier check that Header.tsx CONTAINED the Czech
    // literals. That was the right guard while the markup carried the strings:
    // it caught markup and dictionary drifting apart. Both components now
    // render from CHROME_NAV/CHROME_FOOTER, so there is one source and that
    // drift is impossible by construction.
    //
    // The remaining risk is the reverse — someone re-introducing a literal and
    // creating a second source that the dictionary check cannot see. So the
    // assertion is inverted: no label may appear verbatim in the markup.
    // Only JSX TEXT NODES are examined. A raw substring scan would flag
    // 'footer.navBlog' for containing the label "Blog", which is a key name,
    // not a rendered string.
    const labels = new Set([...Object.values(CHROME_NAV.cs), ...Object.values(CHROME_FOOTER.cs)])
    for (const file of ['components/Header.tsx', 'components/Footer.tsx']) {
      const src = fs
        .readFileSync(path.join(process.cwd(), file), 'utf8')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/^\s*\/\/.*$/gm, '')
      const textNodes = Array.from(src.matchAll(/>([^<>{}]+)</g), (m) => m[1].trim()).filter(Boolean)
      for (const node of textNodes) {
        expect(labels.has(node), `${file} hardcodes the label "${node}" instead of reading the dictionary`).toBe(false)
      }
    }
  })
})

/**
 * The concept a chrome target resolves to, mirroring resolveNavHref.
 *
 * `conceptId` is an OVERRIDE, needed only where the Czech URL is not the
 * concept's own primary — the legal pages, whose hrefs are /terms-cs.html and
 * friends. Everywhere else the concept is DERIVED from `czechHref === csPrimary`.
 *
 * These tests previously encoded the id as the only path, which is why they
 * agreed with the defect they were meant to catch: when L1 published English and
 * German pages for direct-hire, agency-employment and editorial-policy, their
 * three footer entries kept pointing at Czech on all 96 localized pages, and
 * this suite asserted that was correct. Deriving here means the test fails if
 * the resolver ever stops deriving.
 */
const conceptForTarget = (t: { conceptId?: string; czechHref: string }) =>
  (t.conceptId ? ALL_CONCEPTS.find((c) => c.id === t.conceptId) : undefined) ??
  ALL_CONCEPTS.find((c) => c.csPrimary === t.czechHref)

describe('header links from a locale page', () => {
  it('never invents a localized URL for a page that has none', () => {
    // A localized destination is NOT identifiable by a /en or /de prefix. The
    // legal cluster predates the prefix scheme and keeps flat filenames, so
    // /terms-de.html is the German page and /terms.html is the English one.
    // Testing the prefix would have called both of those "not localized".
    // The real rule is the registry: resolve to the concept's URL for this
    // locale when it publishes one, and to the Czech URL otherwise.
    for (const locale of ['en', 'de'] as const) {
      for (const t of [...NAV_TARGETS, REQUEST_WORKERS, ...FOOTER_TARGETS]) {
        const { href } = resolveNavHref(t, locale)
        const concept = conceptForTarget(t)
        if (concept && concept.published.includes(locale)) {
          expect(href, `${t.key} in ${locale}`).toBe(urlFor(concept, locale))
        } else {
          expect(href, `${t.key} in ${locale} has no translation`).toBe(t.czechHref)
        }
      }
    }
  })

  it('declares hreflang="cs" on exactly the links that stay Czech', () => {
    // hreflang states the DESTINATION's language, so it belongs on a link only
    // when the destination is not in the page's own language. The bug this
    // pins: the legal links resolved to /terms.html — the ENGLISH page — while
    // being stamped hreflang="cs", so a German page announced an English
    // document as Czech.
    for (const locale of ['en', 'de'] as const) {
      for (const t of [...NAV_TARGETS, REQUEST_WORKERS, ...FOOTER_TARGETS]) {
        const { href, hreflang } = resolveNavHref(t, locale)
        const concept = conceptForTarget(t)
        const servedInPageLocale = Boolean(concept && concept.published.includes(locale))
        expect(hreflang, `${locale} ${t.key} -> ${href}`).toBe(servedInPageLocale ? undefined : 'cs')
      }
    }
  })

  it('no legal link is ever labelled as a language it is not', () => {
    // Direct regression for the production defect: every legal destination must
    // be the page for THIS locale, and carry no hreflang at all.
    for (const key of ['terms', 'priv', 'cook'] as const) {
      const target = footerTarget(key)
      const concept = ALL_CONCEPTS.find((c) => c.id === target.conceptId)
      expect(concept, `${key} must map to a LEGAL_CONCEPTS entry`).toBeDefined()
      for (const locale of ['cs', 'en', 'de'] as const) {
        expect(concept!.published).toContain(locale)
        const { href, hreflang } = resolveNavHref(target, locale)
        expect(href, `${key} in ${locale}`).toBe(urlFor(concept!, locale))
        expect(hreflang, `${key} in ${locale} must not claim another language`).toBeUndefined()
      }
    }
  })

  it('the Czech legal links point at the CZECH legal pages', () => {
    // They pointed at the English ones (/terms.html) for as long as the footer
    // has existed, in a field literally named czechHref.
    expect(footerTarget('terms').czechHref).toBe('/terms-cs.html')
    expect(footerTarget('priv').czechHref).toBe('/privacy-cs.html')
    expect(footerTarget('cook').czechHref).toBe('/cookies-cs.html')
  })

  it('adds no hreflang at all on the Czech spine', () => {
    for (const t of [...NAV_TARGETS, REQUEST_WORKERS, ...FOOTER_TARGETS]) {
      expect(resolveNavHref(t, 'cs')).toEqual({ href: t.czechHref })
    }
  })

  it('every declared conceptId is a real concept whose Czech URL is the link', () => {
    for (const t of [...NAV_TARGETS, REQUEST_WORKERS, ...FOOTER_TARGETS]) {
      if (!t.conceptId) continue
      const c = ALL_CONCEPTS.find((x) => x.id === t.conceptId)
      expect(c, `unknown concept ${t.conceptId}`).toBeDefined()
      expect(urlFor(c!, 'cs')).toBe(t.czechHref)
    }
  })

  it('does not quietly drop a concept that gains a translation later', () => {
    // If a NAV_TARGET names a concept, every locale that concept publishes must
    // be reachable from the nav — otherwise a launched translation stays orphaned.
    for (const t of [...NAV_TARGETS, REQUEST_WORKERS, ...FOOTER_TARGETS]) {
      if (!t.conceptId) continue
      const c = LOCALE_CONCEPTS.find((x) => x.id === t.conceptId)
      if (!c) continue
      for (const locale of c.published) {
        if (locale === 'cs') continue
        expect(resolveNavHref(t, locale).href).toBe(urlFor(c, locale))
      }
    }
  })
})
