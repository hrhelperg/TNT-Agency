import { test, expect, type Page } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

/**
 * The progressive-enhancement boundary, proved on both paths.
 *
 * The calculator's arithmetic needs BigInt — the Programmablaufplan squares a
 * six-decimal intermediate and passes 2^53, so no Number implementation of it
 * is exact. That requirement is accepted. What is not acceptable is failing
 * silently: BigInt literals are SYNTAX, so on a browser without BigInt the
 * chunk does not misbehave, it fails to parse, React never hydrates, and the
 * form sits there looking interactive and ignoring every keystroke.
 *
 * So the contract is:
 *
 *   SUPPORTED    the lazy chunk loads and the calculator works, with the exact
 *                arithmetic unchanged.
 *   UNSUPPORTED  the lazy chunk is NEVER REQUESTED, a localized notice appears,
 *                the methodology and sources stay on the page, no interactive
 *                control is shown, and nothing throws.
 *
 * The unsupported path is simulated by deleting `globalThis.BigInt` in an init
 * script, which runs before any page script — so this exercises the real
 * feature test rather than hiding a calculator that has already loaded.
 */

const ROUTES = [
  ['de', '/de/arbeitgeberkosten-rechner-deutschland', 'Dieser Rechner benötigt einen neueren Browser. Die Erläuterungen und Quellen bleiben verfügbar.'],
  ['en', '/en/germany-employer-cost-calculator', 'This calculator requires a newer browser. The methodology and sources remain available.'],
  ['cs', '/kalkulacka-nakladu-zamestnavatele-nemecko', 'Tato kalkulačka vyžaduje novější prohlížeč. Metodika a zdroje zůstávají dostupné.'],
] as const

/**
 * The chunk carrying the BigInt literals, discovered from the build rather than
 * hard-coded — a hash changes on every content edit, and a stale constant would
 * make "never requested" vacuously true.
 */

/**
 * Strip string and template literals from minified JS before looking for BigInt
 * literals.
 *
 * Without this the detector is useless here: the Czech source registry contains
 * the word "48násobek", which minifies to "48n\xe1sobek", and `48n` inside a
 * string matched a BigInt-literal pattern. That produced a list of ~170
 * pre-existing pages supposedly shipping BigInt — every one of them a Czech
 * sentence about a multiple of the average wage.
 */
function stripJsStrings(src: string): string {
  let out = '';
  let i = 0;
  let quote: string | null = null;
  while (i < src.length) {
    const c = src[i];
    if (quote) {
      if (c === '\\') { i += 2; continue; }
      if (c === quote) { quote = null; out += ' '; }
      i++;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { quote = c; i++; continue; }
    out += c;
    i++;
  }
  return out;
}

/** A BigInt literal: digits followed by `n`, not part of an identifier. */
const BIGINT_LITERAL = /(?<![A-Za-z0-9_$.])\d+n(?![A-Za-z0-9_$])/

/**
 * A chunk "carries BigInt" only if BOTH signals are present.
 *
 * Neither alone is reliable on minified output. The literal pattern still fires
 * inside one chunk after string-stripping — a hand-rolled quote tracker
 * desynchronises on a regex literal, and writing a full JS tokenizer to settle
 * it would be a worse cure than the disease. The identifier alone is no good
 * either: `typeof BigInt` is exactly what the bootstrap does, and that chunk
 * MUST be allowed in the initial bundle.
 *
 * Together they are precise for this codebase, and the invariant is asserted
 * rather than assumed: every module here that writes a BigInt literal also
 * calls `BigInt(...)`, so the lazy chunk carries both and is checked for both.
 */
function carriesBigInt(src: string): boolean {
  return /\bBigInt\s*\(/.test(src) && BIGINT_LITERAL.test(stripJsStrings(src))
}

function bigintChunkNames(): string[] {
  const dir = path.join(process.cwd(), '.next/static/chunks')
  const out: string[] = []
  const walk = (d: string) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name)
      if (e.isDirectory()) walk(full)
      else if (e.name.endsWith('.js') && carriesBigInt(fs.readFileSync(full, 'utf8'))) {
        out.push(e.name)
      }
    }
  }
  walk(dir)
  return out
}

const BIGINT_CHUNKS = bigintChunkNames()

async function withoutBigInt(page: Page) {
  await page.addInitScript(() => {
    try {
      Reflect.deleteProperty(globalThis as unknown as Record<string, unknown>, 'BigInt')
    } catch {
      /* some engines make it non-configurable; the test below asserts it went */
    }
  })
}

test.describe('the build isolates the BigInt dependency', () => {
  test('exactly one family of chunks carries BigInt literals, and it is not in any initial bundle', () => {
    expect(BIGINT_CHUNKS.length, 'no chunk carries BigInt literals — has the engine stopped shipping?').toBeGreaterThan(0)

    // The invariant the two-signal detector rests on: the chunk that carries
    // literals also calls BigInt(). If a build ever separated them, the
    // detector would go quiet and this is where that shows up.
    for (const name of BIGINT_CHUNKS) {
      const src = fs.readFileSync(path.join(process.cwd(), '.next/static/chunks', name), 'utf8')
      expect(BIGINT_LITERAL.test(stripJsStrings(src)), `${name} has no literal`).toBe(true)
      expect(/\bBigInt\s*\(/.test(src), `${name} never calls BigInt()`).toBe(true)
    }

    const manifest = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), '.next/build-manifest.json'), 'utf8'),
    ) as { pages: Record<string, string[]> }

    const offenders: string[] = []
    for (const [page, files] of Object.entries(manifest.pages)) {
      for (const f of files) {
        if (BIGINT_CHUNKS.some((c) => f.endsWith(c))) offenders.push(`${page} -> ${f}`)
      }
    }
    expect(offenders, 'a BigInt-literal chunk is in a page’s INITIAL bundle').toEqual([])
  })
})

for (const [locale, route, notice] of ROUTES) {
  test.describe(`${locale} — modern browser`, () => {
    test('loads the calculator chunk and calculates exactly', async ({ page }) => {
      const requested: string[] = []
      const errors: string[] = []
      page.on('request', (r) => requested.push(r.url()))
      page.on('pageerror', (e) => errors.push(String(e)))

      await page.goto(route, { waitUntil: 'networkidle' })
      await expect(page.locator('#decc-gross')).toBeVisible()

      expect(
        requested.some((u) => BIGINT_CHUNKS.some((c) => u.includes(c))),
        'the calculator chunk was not requested on a capable browser',
      ).toBe(true)

      await page.locator('#decc-gross').fill('4000')
      await expect(page.locator('.ecc__total-value').first()).toContainText(/\d/)

      // The arithmetic is unchanged: 4 000 EUR gross, childless, U3 only, is
      // 4 852,00 EUR of employer cost — the figure all three pages quote.
      const totals = await page.locator('.ecc__total-value').allTextContents()
      expect(totals.map((t) => t.replace(/[^0-9]/g, ''))).toContain('485200')

      await expect(page.locator('.ecc__unsupported')).toHaveCount(0)
      expect(errors, errors.join('\n')).toEqual([])
    })
  })

  test.describe(`${locale} — browser without BigInt`, () => {
    test('never fetches the chunk, shows the notice, keeps the prose, and throws nothing', async ({ page }) => {
      const requested: string[] = []
      const errors: string[] = []
      page.on('request', (r) => requested.push(r.url()))
      page.on('pageerror', (e) => errors.push(String(e)))

      await withoutBigInt(page)
      await page.goto(route, { waitUntil: 'networkidle' })
      await page.waitForTimeout(600)

      expect(await page.evaluate(() => typeof BigInt === 'function'), 'BigInt survived removal').toBe(false)

      // THE LOAD-BEARING ASSERTION. Not "the calculator is hidden" — the bytes
      // must never be fetched, because parsing them is the failure.
      const fetched = requested.filter((u) => BIGINT_CHUNKS.some((c) => u.includes(c)))
      expect(fetched, 'the BigInt chunk was requested on an incapable browser').toEqual([])

      await expect(page.locator('.ecc__unsupported')).toHaveText(notice)

      // No control that pretends to work, and no stale figures.
      await expect(page.locator('#decc-gross')).toHaveCount(0)
      await expect(page.locator('.ecc__total-value')).toHaveCount(0)
      await expect(page.locator('.ecc__form')).toHaveCount(0)

      // The methodology and sources the notice promises are still there.
      const body = await page.locator('body').innerText()
      expect(body.length).toBeGreaterThan(2000)
      expect(body, 'the contribution ceilings are gone').toMatch(/5[.,\s ]?812/)
      expect(body, 'the Jahresarbeitsentgeltgrenze is gone').toMatch(/77[.,\s ]?400/)
      expect(body, 'the statutory provisions are gone').toMatch(/SGB VI/)

      expect(errors, errors.join('\n')).toEqual([])
    })

    test('no privacy or network regression on the fallback path', async ({ page }) => {
      const external: string[] = []
      page.on('request', (r) => {
        const u = r.url()
        if (/^https?:\/\//.test(u) && !u.includes('127.0.0.1') && !u.includes('localhost')) external.push(new URL(u).origin)
      })
      await withoutBigInt(page)
      await page.goto(route, { waitUntil: 'networkidle' })
      await page.waitForTimeout(400)

      const control = new Set(['https://fonts.gstatic.com', 'https://fonts.googleapis.com'])
      expect(
        [...new Set(external)].filter((o) => !control.has(o)),
        'the fallback path reaches an origin an ordinary page does not',
      ).toEqual([])
      expect(page.url()).not.toContain('?')
    })
  })
}
