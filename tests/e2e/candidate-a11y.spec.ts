import { test, expect } from '@playwright/test'

const ratio = (a: string, b: string) => {
  const lum = (c: string) => {
    const m = c.match(/[\d.]+/g)!.map(Number)
    const [r, g, bl] = m.slice(0, 3).map((v) => {
      const s = v / 255
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl
  }
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

test('candidate footer text is readable on its dark ground', async ({ page }) => {
  await page.goto('/pt-br/candidatar-se')
  const samples = await page.evaluate(() => {
    const bgOf = (el: Element): string => {
      let n: Element | null = el
      while (n) {
        const c = getComputedStyle(n).backgroundColor
        if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c
        n = n.parentElement
      }
      return 'rgb(255,255,255)'
    }
    const pick = ['.footer__notice-title', '.footer__notice p', '.footer__top p', '.footer__discovery-label']
    return pick.map((sel) => {
      const el = document.querySelector(sel)
      if (!el) return { sel, missing: true, fg: '', bg: '' }
      return { sel, missing: false, fg: getComputedStyle(el).color, bg: bgOf(el) }
    })
  })
  for (const s of samples) {
    expect(s.missing, `${s.sel} not found`).toBe(false)
    const r = ratio(s.fg, s.bg)
    expect(r, `${s.sel}: ${s.fg} on ${s.bg} = ${r.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5)
  }
})

test('the page intro is not white on white', async ({ page }) => {
  for (const route of ['/pt-br/candidatar-se', '/es/postularme', '/en/about-us']) {
    await page.goto(route)
    const s = await page.evaluate(() => {
      // Walk up for a real background: body is often transparent, and reading
      // it as rgba(0,0,0,0) makes every foreground look like black-on-black.
      const bgOf = (el: Element): string => {
        let n: Element | null = el
        while (n) {
          const c = getComputedStyle(n).backgroundColor
          if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c
          n = n.parentElement
        }
        return 'rgb(255, 255, 255)'
      }
      const el = document.querySelector('.page-hero__sub')!
      return { fg: getComputedStyle(el).color, bg: bgOf(el) }
    })
    const r = ratio(s.fg, s.bg)
    expect(r, `${route} intro: ${s.fg} on ${s.bg} = ${r.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5)
  }
})

test('form errors are visually distinct from hints', async ({ page }) => {
  await page.goto('/pt-br/candidatar-se')
  // Wait for hydration: clicking before React attaches submits natively.
  await page.waitForFunction(() => {
    const b = document.querySelector('.caf form button[type="submit"]')
    return !!b && !!(b as HTMLElement).offsetParent
  })
  await page.waitForTimeout(300)
  await page.locator('button[type="submit"]').click()
  await page.waitForSelector('.caf__summary', { timeout: 5000 })
  const d = await page.evaluate(() => {
    const err = document.querySelector('.caf__error')
    const hint = document.querySelector('.caf__hint')
    if (!err || !hint) return null
    const e = getComputedStyle(err), h = getComputedStyle(hint)
    return { same: e.color === h.color && e.fontWeight === h.fontWeight, errColor: e.color }
  })
  expect(d, 'no error or hint rendered').not.toBeNull()
  expect(d!.same, `error and hint are byte-identical (${d!.errColor})`).toBe(false)
})

test('the consent banner speaks the page language', async ({ page }) => {
  await page.goto('/pt-br/candidatar-se')
  const banner = page.locator('.cookie-banner')
  if (await banner.count()) {
    await expect(banner).toContainText(/cookies para melhorar/i)
    await expect(banner).not.toContainText(/Používáme/i)
  }
})

test('no stray checkbox and no invisible focusable links in the candidate chrome', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/pt-br')
  await expect(page.locator('.mobile-nav__toggle')).toHaveCount(0)
  const invisible = await page.evaluate(() => {
    const out: string[] = []
    for (const a of Array.from(document.querySelectorAll('a[href], button, input, select, textarea'))) {
      const el = a as HTMLElement
      if (el.tabIndex < 0) continue
      let n: HTMLElement | null = el, opacity = 1
      while (n) { opacity *= Number(getComputedStyle(n).opacity); n = n.parentElement }
      const r = el.getBoundingClientRect()
      if (opacity < 0.05 && r.width > 0) out.push(el.textContent?.trim().slice(0, 30) ?? el.tagName)
    }
    return out
  })
  expect(invisible, `focusable but invisible: ${invisible.join(' | ')}`).toEqual([])
})
