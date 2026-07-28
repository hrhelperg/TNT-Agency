// Tier 1 graph validator (READ-ONLY). Reads the Tier 1 registry, the route
// inventory, and — when a production server is reachable at BASE — the real
// rendered HTML of every Tier 1 route.
//
// Static failures: duplicate id/route/purpose; a route/parent/conversion/related
// route that does not exist; a parameterized, redirected or .html route.
// Rendered failures (BASE server up): non-200; not self-canonical; English or
// missing Czech <title>/<h1>; a parameterized internal link; a missing
// request-workers path where the page requires the request form.
//
// Run: node scripts/validate-tier1.js            (static only)
//      BASE=http://localhost:4123 node scripts/validate-tier1.js   (+ rendered)

const fs = require('fs');
const path = require('path');
const { extractSignals } = require('./seo-audit');

const ROOT = path.join(__dirname, '..');
const HOST = 'https://talentpartnerid.com';
const BASE = process.env.BASE || '';
const errors = [];

// ── Load the registry (eval the first-party array literal; dev script only) ──
const SRC = fs.readFileSync(path.join(ROOT, 'lib/content/tier1-registry.ts'), 'utf8');
function loadRegistry() {
  const consts = {};
  for (const m of SRC.matchAll(/const (REQUEST|HUB|CALC)\s*=\s*'([^']+)'/g)) consts[m[1]] = m[2];
  const start = SRC.indexOf('TIER_ONE');
  const open = SRC.indexOf('= [', start) + 2; // the array's '[', not TierOnePage[]'s
  let depth = 0, i = open, end = open;
  for (; i < SRC.length; i++) { if (SRC[i] === '[') depth++; else if (SRC[i] === ']') { depth--; if (!depth) { end = i; break; } } }
  const arr = SRC.slice(open, end + 1);
  const fn = new Function('REQUEST', 'HUB', 'CALC', `return (${arr});`);
  return fn(consts.REQUEST, consts.HUB, consts.CALC);
}
const TIER_ONE = loadRegistry();

// ── Route existence (files) ─────────────────────────────────────────────────
const routeExists = (route) => {
  if (route === '/') return fs.existsSync(path.join(ROOT, 'pages/index.tsx'));
  const slug = route.replace(/^\//, '');
  return fs.existsSync(path.join(ROOT, `pages/${slug}.tsx`)) || fs.existsSync(path.join(ROOT, `public/${slug}`));
};
const cleanRoute = (route) => route === '/' || /^\/[a-z0-9-]+$/.test(route);

// ── Static checks ───────────────────────────────────────────────────────────
const ids = TIER_ONE.map((p) => p.id);
if (new Set(ids).size !== ids.length) errors.push('duplicate Tier 1 id');
const routes = TIER_ONE.map((p) => p.route);
if (new Set(routes).size !== routes.length) errors.push('duplicate Tier 1 route');
const purposes = TIER_ONE.map((p) => p.distinctPurpose);
if (new Set(purposes).size !== purposes.length) errors.push('duplicate Tier 1 distinctPurpose');

for (const p of TIER_ONE) {
  if (!cleanRoute(p.route)) errors.push(`${p.id}: route "${p.route}" is not a clean canonical route`);
  if (!routeExists(p.route)) errors.push(`${p.id}: route "${p.route}" does not exist`);
  if (p.parentRoute && !routeExists(p.parentRoute)) errors.push(`${p.id}: parentRoute "${p.parentRoute}" does not exist`);
  if (!routeExists(p.conversionRoute)) errors.push(`${p.id}: conversionRoute "${p.conversionRoute}" does not exist`);
  for (const r of p.relatedRoutes) {
    if (!cleanRoute(r)) errors.push(`${p.id}: related "${r}" is not clean`);
    if (!routeExists(r)) errors.push(`${p.id}: relatedRoute "${r}" does not exist`);
  }
}

// ── Rendered checks (optional) ──────────────────────────────────────────────
const ENGLISH_META = /Employment\s*&|Employment Agency|Staffing Agency|Recruitment Services|your trusted|We Connect|Request workers|Payroll calculator/i;
let renderedChecked = 0;

async function crawl(route) {
  const chain = [];
  let url = BASE + route;
  let res;
  for (let i = 0; i < 5; i++) {
    res = await fetch(url, { redirect: 'manual' });
    chain.push({ url, status: res.status, loc: res.headers.get('location') });
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) { url = new URL(res.headers.get('location'), BASE).href; continue; }
    break;
  }
  const html = (res.headers.get('content-type') || '').includes('text/html') ? await res.text() : '';
  return { status: res.status, redirects: chain.length - 1, finalUrl: url, html };
}

async function renderedChecks() {
  for (const p of TIER_ONE) {
    let c;
    try { c = await crawl(p.route); } catch (e) { errors.push(`${p.id}: fetch failed (${e.message})`); continue; }
    if (c.status !== 200) { errors.push(`${p.id} (${p.route}): status ${c.status}`); continue; }
    if (c.redirects > 0) errors.push(`${p.id} (${p.route}): redirects ${c.redirects}×`);
    const s = extractSignals(c.html);
    renderedChecked++;
    // Self-canonical.
    const canonPath = s.canonical ? s.canonical.replace(HOST, '') : null;
    if (canonPath !== p.route) errors.push(`${p.id}: canonical "${s.canonical}" is not self (${p.route})`);
    // Czech title + H1, not English.
    if (!s.title || ENGLISH_META.test(s.title)) errors.push(`${p.id}: <title> is English/missing: "${s.title}"`);
    if (!s.h1s.length || !s.h1s[0].trim()) errors.push(`${p.id}: missing H1`);
    else if (ENGLISH_META.test(s.h1s[0])) errors.push(`${p.id}: H1 looks English: "${s.h1s[0]}"`);
    if (s.description && ENGLISH_META.test(s.description)) errors.push(`${p.id}: meta description is English: "${s.description}"`);
    // No parameterized internal links (?source= / ?mode=).
    for (const href of s.links) {
      if (/^\/[^"']*\?(source|mode)=/.test(href) || /poptavka-pracovniku\?/.test(href)) errors.push(`${p.id}: parameterized internal link "${href}"`);
    }
    // Request-workers path present where required.
    if (p.requiredAssets.includes('request-form')) {
      const hasReq = s.links.some((h) => h.split('?')[0].split('#')[0] === '/poptavka-pracovniku') || p.route === '/poptavka-pracovniku';
      if (!hasReq) errors.push(`${p.id}: no crawlable request-workers link (required asset)`);
    }
  }
}

(async () => {
  if (BASE) await renderedChecks();
  if (errors.length) {
    console.error(`Tier 1 graph validator: FAIL (${errors.length})`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log('Tier 1 graph validator: PASS');
  console.log(`  ${TIER_ONE.length} Tier 1 routes; unique ids/routes/purposes; parents/conversion/related exist`);
  console.log(BASE ? `  rendered checks: ${renderedChecked} routes (200, self-canonical, Czech title+H1, request path, no param links)` : '  rendered checks skipped (set BASE to a running server to enable)');
})();
