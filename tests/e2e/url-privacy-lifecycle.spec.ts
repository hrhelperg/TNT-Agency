import { test, expect, type Page } from '@playwright/test'

// Legacy `?d=` neutralisation, across the whole page lifecycle.
//
// The calculator used to base64 its entire PayrollInput — including
// taxProfile.disability, taxProfile.ztpp and children[].ztpp, health data under
// GDPR Art. 9 — into `?d=`, and WebmasterID's page_view transmits the full
// location.href. Both halves are gone; these prove the links already shared
// cannot reach the vendor when someone opens one.
//
// The first fix sanitized once from a mount effect and shipped green while
// leaking on 4 of 6 warm loads, because Next's async router.replace lands after
// the effect. So these drive the real lifecycle, not just the load.
//
// The vendor is stubbed with a tracker mirroring its documented behaviour —
// page_view carrying location.href on load, on every history write, and on
// popstate. Nothing is ever sent to the third party.

const PATH = '/kalkulacka-mzdy-agenturniho-zamestnance'

const SENTINEL = Buffer.from(
  JSON.stringify({
    mode: 'agency',
    wage: { monthlyWageCzk: 918273645 },
    taxProfile: { disability: 'third', ztpp: true, children: [{ ztpp: true }] },
  }),
).toString('base64')

const MARKERS = ['918273645', 'ztpp', 'disability', SENTINEL.slice(0, 18)]

const FAKE_TRACKER = `
window.WebmasterID = { q: [] };
(function () {
  var last = '';
  function emit() {
    if (location.href === last) return;
    last = location.href;
    try {
      fetch('https://webmasterid-ingest-api.vercel.app/api/events', {
        method: 'POST',
        body: JSON.stringify({ events: [{ event_name: 'page_view', url: location.href }] }),
      });
    } catch (e) {}
  }
  emit();
  var p = history.pushState, r = history.replaceState;
  history.pushState = function () { var x = p.apply(this, arguments); emit(); return x; };
  history.replaceState = function () { var x = r.apply(this, arguments); emit(); return x; };
  window.addEventListener('popstate', emit);
  document.addEventListener('click', function () { last = ''; emit(); }, true);
})();
`

type Probe = { sent: string[]; leaks: () => string[] }

async function analytics(page: Page, consent: 'accepted' | 'rejected' = 'accepted'): Promise<Probe> {
  const sent: string[] = []
  // Both hosts stubbed before any navigation; the ingest route always fulfills,
  // so continue() is never reached and no payload can leave the machine.
  await page.route('**://webmasterid-ingest-api.vercel.app/**', async (r) => {
    sent.push(r.request().postData() ?? '')
    await r.fulfill({ status: 204, body: '' })
  })
  await page.route('**://webmasterid.com/**', async (r) =>
    r.fulfill({ status: 200, contentType: 'application/javascript', body: FAKE_TRACKER }))
  await page.addInitScript((c) => window.localStorage.setItem('cookie_consent', c), consent)
  return { sent, leaks: () => sent.filter((b) => MARKERS.some((m) => b.includes(m))) }
}

const assertClean = async (page: Page, probe: Probe, label: string) => {
  expect(probe.leaks(), `${label}: analytics must never observe the payload`).toEqual([])
  for (const m of MARKERS) expect(page.url(), `${label}: address bar`).not.toContain(m)
  const state = await page.evaluate(() => JSON.stringify(history.state))
  for (const m of MARKERS) expect(state ?? '', `${label}: history.state`).not.toContain(m)
}

test.describe('legacy URL privacy across the lifecycle', () => {
  test('cold navigation with a legacy ?d= payload', async ({ page }) => {
    const probe = await analytics(page)
    await page.goto(`${PATH}?d=${encodeURIComponent(SENTINEL)}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    await expect(page.locator('h1')).toHaveCount(1)
    await assertClean(page, probe, 'cold ?d=')
  })

  test('warm same-tab navigation — the path that actually leaked', async ({ page }) => {
    const probe = await analytics(page)
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    await page.goto(`${PATH}?d=${encodeURIComponent(SENTINEL)}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1800)
    await assertClean(page, probe, 'warm ?d=')
  })

  test('a malformed payload does not break the page', async ({ page }) => {
    const probe = await analytics(page, 'rejected')
    for (const p of ['not-base64!!', Buffer.from('{"wage":null}').toString('base64'), '']) {
      await page.goto(`${PATH}?d=${encodeURIComponent(p)}`, { waitUntil: 'networkidle' })
      await expect(page.locator('h1'), `payload "${p.slice(0, 12)}"`).toHaveCount(1)
    }
    expect(probe.sent, 'consent rejected means no analytics at all').toEqual([])
  })

  test('back and forward cannot resurrect a dirty history entry', async ({ page }) => {
    const probe = await analytics(page)
    await page.goto(`${PATH}?d=${encodeURIComponent(SENTINEL)}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1500)
    await page.evaluate(() => (window as unknown as { next?: { router?: { push: (u: string) => void } } }).next?.router?.push('/poptavka-pracovniku'))
    await page.waitForTimeout(900)
    await page.goBack(); await page.waitForTimeout(900)
    await page.goForward(); await page.waitForTimeout(900)
    await page.goBack(); await page.waitForTimeout(1200)
    await assertClean(page, probe, 'back/forward')
  })

  test('a direct history write cannot bypass the guard', async ({ page }) => {
    const probe = await analytics(page)
    await page.goto(PATH, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1200)
    await page.evaluate((s) => { history.pushState({}, '', `?d=${s}`) }, SENTINEL)
    await page.waitForTimeout(500)
    await page.evaluate((s) => { history.replaceState({}, '', `?d=${s}`) }, SENTINEL)
    await page.waitForTimeout(1200)
    await assertClean(page, probe, 'direct history writes')
  })

  test('a client-side route change cannot reintroduce it', async ({ page }) => {
    const probe = await analytics(page)
    await page.goto('/', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    await page.evaluate(
      (s) => (window as unknown as { next: { router: { push: (u: string) => Promise<boolean> } } })
        .next.router.push(`/kalkulacka-mzdy-agenturniho-zamestnance?d=${s}`),
      SENTINEL,
    )
    await page.waitForTimeout(1500)
    await assertClean(page, probe, 'router.push')
  })

  test('the product still works — declared params and real anchors survive', async ({ page }) => {
    const probe = await analytics(page, 'rejected')
    await page.goto(`${PATH}?mode=comparison#srovnani`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1200)
    // The policy filters the query only. Fragments and pathnames are untouched
    // by design — restricting them was assessed and ruled out of scope.
    expect(page.url()).toContain('mode=comparison')
    expect(page.url()).toContain('#srovnani')
    await expect(page.locator('h1')).toHaveCount(1)
    expect(probe.sent).toEqual([])
  })

  test('a real in-page anchor is not stripped', async ({ page }) => {
    await analytics(page, 'rejected')
    await page.goto('/naklady-na-zamestnance-stredni-cechy#faq', { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)
    expect(page.url(), 'legitimate anchors must survive').toContain('#faq')
  })

  test('campaign attribution survives the policy', async ({ page }) => {
    const probe = await analytics(page, 'rejected')
    await page.goto(
      `/poptavka-pracovniku?utm_source=linkedin&utm_campaign=jaro&source=employer-hub&d=${SENTINEL}&gclid=zz`,
      { waitUntil: 'networkidle' },
    )
    await page.waitForTimeout(1200)
    const url = page.url()
    expect(url).toContain('utm_source=linkedin')
    expect(url).toContain('utm_campaign=jaro')
    expect(url).toContain('source=employer-hub')
    expect(url).not.toContain('gclid')
    for (const m of MARKERS) expect(url).not.toContain(m)
    const stored = await page.evaluate(() => window.sessionStorage.getItem('tnt-attribution'))
    expect(stored, 'inbound campaign attribution must still be captured').toContain('linkedin')
    expect(probe.sent).toEqual([])
  })

  test('the guard does not break Next\'s router', async ({ page }) => {
    const probe = await analytics(page, 'rejected')
    await page.goto(PATH, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    await page.evaluate(() => {
      const w = window as unknown as { __rc: string[]; next: { router: { events: { on: (e: string, f: () => void) => void } } } }
      w.__rc = []
      for (const ev of ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete'])
        w.next.router.events.on(ev, () => w.__rc.push(ev))
    })
    await page.evaluate(() => (window as unknown as { next: { router: { push: (u: string) => Promise<boolean> } } }).next.router.push('/poptavka-pracovniku'))
    await page.waitForTimeout(900)
    expect(new URL(page.url()).pathname).toBe('/poptavka-pracovniku')
    const events = await page.evaluate(() => (window as unknown as { __rc: string[] }).__rc)
    expect(events).toEqual(expect.arrayContaining(['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete']))

    const writes = await page.evaluate(async () => {
      let n = 0
      const rs = history.replaceState
      history.replaceState = function (...a: unknown[]) { n++; return (rs as (...x: unknown[]) => void).apply(this, a) }
      await new Promise((r) => setTimeout(r, 1500))
      history.replaceState = rs
      return n
    })
    expect(writes, 'a settled URL must produce no further history writes').toBe(0)
    expect(probe.sent).toEqual([])
  })
})
