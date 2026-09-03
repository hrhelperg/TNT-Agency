/**
 * Live verification of the Media proxy. Run against a deploy preview BEFORE
 * merging, and against production after.
 *
 * Nothing in either repository can prove the thing this checks. The proxy is
 * six `status = 200` rules in netlify.toml, and @netlify/plugin-nextjs installs
 * a handler at `path: '/*'`. Whether a redirect rule is evaluated before that
 * handler is not documented for the v5 runtime — the ordering appears only on
 * the legacy v4 page. The evidence that it is comes from the plugin's own
 * source, which pushes 200-rewrites so the edge can answer "instead of booting
 * the server function". Strong, indirect, and not a substitute for asking.
 *
 * Usage: node scripts/verify-media-proxy-live.mjs https://deploy-preview-51--<site>.netlify.app
 */
const base = process.argv[2]
if (!base) {
  console.error('usage: node scripts/verify-media-proxy-live.mjs <base-url>')
  process.exit(2)
}
const origin = base.replace(/\/$/, '')
const results = []

async function head(path, { redirect = 'manual' } = {}) {
  const res = await fetch(origin + path, { redirect, headers: { 'user-agent': 'media-proxy-check' } })
  return { status: res.status, location: res.headers.get('location'), type: res.headers.get('content-type'), res }
}

function check(id, ok, detail) {
  results.push({ id, ok, detail })
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${id}  ${detail}`)
}

// F1 — the proxy fires at all, for each prefix, with and without a slash.
for (const prefix of ['/media', '/en/media', '/de/media']) {
  for (const p of [prefix, prefix + '/']) {
    const r = await head(p, { redirect: 'follow' })
    const body = r.status === 200 ? await r.res.text() : ''
    const isAstro = body.includes('TalentPartnerID Media') && body.includes('/media/_assets/')
    check(`F1 ${p}`, r.status === 200 && isAstro,
      `http=${r.status}${r.status === 200 ? (isAstro ? ' · Astro content' : ' · WRONG CONTENT (Next 404?)') : ''}`)
  }
}

// F2 — the assets the pages reference are reachable through the proxy.
const home = await (await fetch(origin + '/media')).text()
const css = home.match(/\/media\/_assets\/[^"]+\.css/)?.[0]
const font = home.match(/\/media\/_static\/fonts\/[^"]+\.woff2/)?.[0]
for (const [id, p] of [['F2a css', css], ['F2b og', '/media/_og/default-cs.png'],
                       ['F2c search', '/media/pagefind/pagefind-entry.json'], ['F2d font', font]]) {
  if (!p) { check(id, false, 'not referenced by /media — could not test'); continue }
  const r = await head(p, { redirect: 'follow' })
  check(id, r.status === 200, `${p} http=${r.status}`)
}

// F3 — an /en/media page must load its CSS from the /media prefix. The three
// prefixes are NOT independent; /en/media cannot ship without the /media rule.
const enHome = await (await fetch(origin + '/en/media')).text()
check('F3 cross-prefix assets', /\/media\/_assets\//.test(enHome),
  'an /en/media page loads assets from /media/_assets/')

// F4 — nested paths.
const nested = await head('/media/odvody-zamestnavatele-2026', { redirect: 'follow' })
check('F4 nested article', nested.status === 200, `http=${nested.status}`)

// F5 — the origin must never redirect through the proxy. A 3xx here is passed
// through and sends the browser to the deploy hostname.
for (const p of ['/media', '/en/media', '/de/media', '/media/odvody-zamestnavatele-2026']) {
  const r = await head(p)
  const leaks = r.location && /netlify\.app/.test(r.location)
  check(`F5 no origin redirect ${p}`, r.status === 200 && !leaks,
    `http=${r.status}${r.location ? ` location=${r.location}` : ''}`)
}

// F6 — a missing page under the prefix is a real 404, not a soft 200.
const missing = await head('/media/definitely-not-a-page', { redirect: 'follow' })
check('F6 404 under prefix', missing.status === 404, `http=${missing.status}`)

// F7 — the splat must not over-match.
const near = await head('/mediafoo', { redirect: 'follow' })
const nearBody = near.status !== 200 ? '' : await near.res.text()
check('F7 /mediafoo not captured', near.status === 404 || !nearBody.includes('/media/_assets/'),
  `http=${near.status}`)

// F8 — the highest-value check: canonicalization still wins over the proxy.
// Only meaningful against production, where the legacy hosts resolve.
if (/talentpartnerid\.com/.test(origin)) {
  for (const host of ['https://www.talentpartnerid.com', 'https://manpower-tnt.agency',
                      'https://tntgency.org']) {
    const r = await fetch(host + '/media/odvody-zamestnavatele-2026', { redirect: 'manual' })
    const loc = r.headers.get('location') || ''
    check(`F8 ${host}`, r.status === 301 && loc.startsWith('https://talentpartnerid.com/media/'),
      `http=${r.status} location=${loc}`)
  }
} else {
  console.log('  SKIP  F8 host canonicalization — only meaningful on production')
}

// F9 — canonicals must name the public origin, never the deploy host.
const canonical = home.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
check('F9 canonical origin', canonical === 'https://talentpartnerid.com/media',
  `canonical=${canonical}`)

// F10 — the sitemap and feeds are reachable at their public URLs.
for (const p of ['/media/sitemap.xml', '/media/rss.xml', '/en/media/rss.xml', '/de/media/rss.xml']) {
  const r = await head(p, { redirect: 'follow' })
  check(`F10 ${p}`, r.status === 200 && /xml/.test(r.type || ''), `http=${r.status} type=${r.type}`)
}

const failed = results.filter((r) => !r.ok)
console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
if (failed.length) {
  console.error('\nFAILED:')
  for (const f of failed) console.error(`  ${f.id} — ${f.detail}`)
  console.error(
    '\nIf every F1 failed with the Next 404 page, the runtime beat the rewrite:\n' +
      'escalate to public/_redirects, moving the seven host 301s there too so they\n' +
      'keep their precedence. See docs/routing.md in the media repository.',
  )
  process.exit(1)
}
