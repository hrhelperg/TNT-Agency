// Internal-authority graph (READ-ONLY). Crawls a locally-served production build
// over the canonical route inventory, classifies every internal link by the DOM
// region it sits in (chrome nav/footer vs breadcrumb vs contextual body/hub), and
// computes the discovery signals Batch A needs: inbound (all + contextual),
// unique contextual sources, outbound, click depth from the homepage and the
// employer hub, Tier assignment, orphan / near-orphan status, and a diagnostic
// internal-authority score (NOT a Google PageRank claim).
//
// Usage: BASE=http://localhost:4123 node scripts/authority-graph.js
// Writes reports/internal-authority-graph.{json,md} and returns the model to
// callers (search-coverage-baseline.js, indexing-recovery-dashboard.js).

const fs = require('fs');
const path = require('path');
const { buildRouteInventory, validateSitemapFile, CANONICAL_ORIGIN } = require('./validate-sitemap');

const ROOT = path.join(__dirname, '..');
const REPORTS = path.join(ROOT, 'reports');
const HOST = CANONICAL_ORIGIN;
const BASE = process.env.BASE || 'http://localhost:4123';
const HOME = '/';
const HUB = '/pro-zamestnavatele';
const NEAR_ORPHAN_DEPTH = 4; // contextual click depth beyond this is "deep"

// Generic / non-descriptive anchor text hurts raw-HTML discovery quality (A9):
// a search engine gets no topical signal from "zde" / "click here".
const GENERIC_ANCHORS = new Set([
  'zde', 'tady', 'sem', 'klikněte', 'klikněte zde', 'klikni', 'více', 'více zde',
  'číst více', 'čtěte více', 'zjistit více', 'odkaz', 'tento odkaz', 'link',
  'here', 'click here', 'read more', 'more', 'this link', 'go', 'přejít',
]);
const anchorTextOf = (inner) =>
  inner.replace(/<[^>]+>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ').replace(/\s+/g, ' ').trim();

// ── Tier assignment (diagnostic). Tier 1 = the registry; the rest by family. ──
function tierOf(route) {
  if (TIER1.has(route)) return 1;
  if (/^\/(privacy|cookies|terms)|\/blog\//.test(route)) return 4;
  if (
    /naklad|kolik-stoji|skutecne-naklady|neprime-naklady|planovani-naboru|fluktuace|retence|onboarding|adaptace|ubytovani|svoz|docasne-prideleni|povinnosti|pracovni-povoleni|zamestnanecka-karta|modra-karta|kontrola-inspektoratu|zamestnavani-cizincu|nabor-zahranicnich|nabor-pracovniku|nabor-zamestnancu|jak-|faq-|slovnik|checklist|nedostatek|kde-overit|dokumenty-pro|dane-cizincu|socialni|zdravotni|prava-a-povinnosti|legalizace|nelegalni|sankce|prodlouzeni|zmena-zamestnavatele|kalkulacka|minimalni-mzda|zamestnanecka-karta-2026|jak-ziskat/.test(route)
  ) return 2;
  return 3;
}

// ── Region-aware link extraction ──────────────────────────────────────────────
function regionRanges(html) {
  const ranges = [];
  const add = (re, type) => { const m = html.match(re); if (m) ranges.push({ type, start: m.index, end: m.index + m[0].length }); };
  add(/<header\b[\s\S]*?<\/header>/i, 'chrome');
  add(/<nav class="mobile-nav"[\s\S]*?<\/nav>/i, 'chrome');
  add(/<footer\b[\s\S]*?<\/footer>/i, 'chrome');
  add(/<nav class="seo-breadcrumb"[\s\S]*?<\/nav>/i, 'breadcrumb');
  add(/<div class="eco-bar"[\s\S]*?<\/nav>\s*<\/div>/i, 'banner');
  return ranges;
}
const classify = (pos, ranges) => {
  for (const r of ranges) if (pos >= r.start && pos < r.end) return r.type;
  return 'contextual';
};

function normPath(href, fromRoute) {
  if (!href) return null;
  const h = href.trim();
  if (h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('tel:') || h.startsWith('javascript:')) return null;
  let u; try { u = new URL(h, HOST + (fromRoute.startsWith('/') ? fromRoute : '/' + fromRoute)); } catch { return { external: true }; }
  if (u.origin !== HOST) return { external: true };
  return { external: false, path: u.pathname || '/', query: u.search };
}

async function fetchHtml(route) {
  const res = await fetch(BASE + route, { redirect: 'manual', headers: { 'user-agent': 'authority-graph/1.0' } });
  const ct = res.headers.get('content-type') || '';
  return { status: res.status, html: ct.includes('text/html') ? await res.text() : '', redirect: res.status >= 300 && res.status < 400 };
}

let TIER1;
async function main() {
  const inv = buildRouteInventory(ROOT);
  const sitemap = validateSitemapFile();
  const sitemapSet = new Set(sitemap.urls.map((u) => u.replace(HOST, '')));
  const routes = [...inv.urls].map((u) => u.replace(HOST, '')).sort();
  // Tier 1 from the registry (+ /o-nas trust).
  const reg = fs.readFileSync(path.join(ROOT, 'lib/content/tier1-registry.ts'), 'utf8');
  TIER1 = new Set([...reg.matchAll(/route:\s*(?:'([^']+)'|REQUEST|HUB|CALC)/g)].map((m) => m[1]).filter(Boolean));
  for (const [k, v] of [['REQUEST', '/poptavka-pracovniku'], ['HUB', HUB], ['CALC', '/kalkulacka-mzdy-agenturniho-zamestnance']]) { if (reg.includes(`${k} = '${v}'`)) TIER1.add(v); }
  TIER1.add('/o-nas');

  // Crawl.
  const page = {};
  for (const route of routes) {
    const { status, html, redirect } = await fetchHtml(route);
    const ranges = html ? regionRanges(html) : [];
    const edges = [];
    if (html) {
      for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)) {
        const n = normPath(m[1], route);
        if (!n || n.external) continue;
        const text = anchorTextOf(m[2]);
        edges.push({ to: n.path, param: !!n.query, type: classify(m.index, ranges), text, generic: text === '' || GENERIC_ANCHORS.has(text.toLowerCase()) });
      }
    }
    const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1];
    const bodyText = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ').replace(/\s+/g, ' ').trim();
    page[route] = {
      route, tier: tierOf(route), status, redirect,
      inSitemap: sitemapSet.has(route),
      h1: h1 ? h1.replace(/<[^>]+>/g, '').trim() : null,
      words: bodyText ? bodyText.split(' ').length : 0,
      edges,
      outContextual: new Set(edges.filter((e) => e.type === 'contextual' && e.to !== route).map((e) => e.to)),
    };
  }

  // Inbound aggregation.
  for (const p of Object.values(page)) { p.inAll = new Set(); p.inContextual = new Set(); p.inChrome = 0; p.inBreadcrumb = 0; p.inTier1 = new Set(); p.paramLinkedFrom = new Set(); }
  for (const src of Object.values(page)) {
    const seen = new Set();
    for (const e of src.edges) {
      if (!(e.to in page)) { if (e.param) src._paramExternalish = true; continue; }
      if (e.to === src.route) continue;
      if (e.param) page[e.to].paramLinkedFrom.add(src.route);
      page[e.to].inAll.add(src.route);
      if (e.type === 'contextual') { page[e.to].inContextual.add(src.route); if (src.tier === 1) page[e.to].inTier1.add(src.route); }
      else if (e.type === 'chrome') page[e.to].inChrome++;
      else if (e.type === 'breadcrumb') page[e.to].inBreadcrumb++;
    }
  }

  // Anchor-text quality on contextual internal edges (A9: raw-HTML discovery).
  const genericContextual = [];
  for (const src of Object.values(page)) {
    for (const e of src.edges) {
      if (e.type !== 'contextual' || !(e.to in page) || e.to === src.route) continue;
      if (e.generic) genericContextual.push({ from: src.route, to: e.to, tier: page[e.to].tier, text: e.text });
    }
  }

  // Click depth (BFS). all = every internal edge; contextual = contextual+breadcrumb only.
  const bfs = (startRoutes, edgeFilter) => {
    const depth = {}; const q = [];
    for (const s of startRoutes) if (s in page) { depth[s] = 0; q.push(s); }
    while (q.length) {
      const cur = q.shift();
      for (const e of page[cur].edges) {
        if (!(e.to in page) || !edgeFilter(e)) continue;
        if (!(e.to in depth)) { depth[e.to] = depth[cur] + 1; q.push(e.to); }
      }
    }
    return depth;
  };
  const depthAll = bfs([HOME], () => true);
  const depthCtx = bfs([HOME], (e) => e.type === 'contextual' || e.type === 'breadcrumb');
  const depthHub = bfs([HUB], () => true);

  // Score (diagnostic only).
  for (const p of Object.values(page)) {
    p.depthAll = depthAll[p.route] ?? null;
    p.depthContextual = depthCtx[p.route] ?? null;
    p.depthFromHub = depthHub[p.route] ?? null;
    p.orphan = p.inAll.size === 0 && p.route !== HOME;
    p.nearOrphan = !p.orphan && p.route !== HOME && (p.inContextual.size === 0 || (p.depthContextual == null) || (p.depthContextual > NEAR_ORPHAN_DEPTH));
    const depthTerm = p.depthContextual == null ? 0 : 1 / (1 + p.depthContextual);
    p.authority = Math.round((p.inContextual.size * 3 + p.inTier1.size * 4 + depthTerm * 6 + (p.inChrome > 0 ? 1 : 0)) * 10) / 10;
  }

  const list = Object.values(page);
  const summary = {
    base: BASE, generatedFor: HOST,
    totals: {
      canonical: routes.length, sitemap: sitemapSet.size,
      tier1: list.filter((p) => p.tier === 1).length, tier2: list.filter((p) => p.tier === 2).length,
      tier3: list.filter((p) => p.tier === 3).length, tier4: list.filter((p) => p.tier === 4).length,
      orphans: list.filter((p) => p.orphan).length, nearOrphans: list.filter((p) => p.nearOrphan).length,
      avgDepthAll: round(avg(list.map((p) => p.depthAll).filter((d) => d != null))),
      avgDepthContextual: round(avg(list.map((p) => p.depthContextual).filter((d) => d != null))),
      unreachableContextual: list.filter((p) => p.depthContextual == null && p.route !== HOME).length,
      tier1WithContextualInbound: list.filter((p) => p.tier === 1 && p.inContextual.size > 0).length,
      tier2WithContextualInbound: list.filter((p) => p.tier === 2 && p.inContextual.size > 0).length,
      paramLinkedPages: list.filter((p) => p.paramLinkedFrom.size).length,
      linksToRedirect: list.filter((p) => p.redirect && p.inAll.size).map((p) => p.route),
      genericContextualAnchors: genericContextual.length,
    },
    genericAnchors: genericContextual,
    orphans: list.filter((p) => p.orphan).map((p) => p.route),
    nearOrphans: list.filter((p) => p.nearOrphan).map((p) => ({ route: p.route, tier: p.tier, inContextual: p.inContextual.size, depthCtx: p.depthContextual, inChrome: p.inChrome })),
    tier1: list.filter((p) => p.tier === 1).map((p) => ({ route: p.route, inContextual: p.inContextual.size, inTier1: p.inTier1.size, depthCtx: p.depthContextual, depthHub: p.depthFromHub })),
  };
  const pages = {};
  for (const p of list) pages[p.route] = {
    route: p.route, tier: p.tier, status: p.status, inSitemap: p.inSitemap, h1: p.h1, words: p.words,
    inboundAll: p.inAll.size, inboundContextual: p.inContextual.size, uniqueContextualSources: p.inContextual.size,
    inboundChrome: p.inChrome, inboundBreadcrumb: p.inBreadcrumb, inboundFromTier1: p.inTier1.size,
    outboundContextual: p.outContextual.size, depthAll: p.depthAll, depthContextual: p.depthContextual, depthFromHub: p.depthFromHub,
    orphan: p.orphan, nearOrphan: p.nearOrphan, paramLinkedFrom: [...p.paramLinkedFrom], authority: p.authority,
  };

  fs.mkdirSync(REPORTS, { recursive: true });
  fs.writeFileSync(path.join(REPORTS, 'internal-authority-graph.json'), JSON.stringify({ summary, pages }, null, 2));
  fs.writeFileSync(path.join(REPORTS, 'internal-authority-graph.md'), renderMd(summary, pages));
  console.log('Internal-authority graph complete.');
  console.log(`  canonical ${summary.totals.canonical} | tier1 ${summary.totals.tier1} t2 ${summary.totals.tier2} t3 ${summary.totals.tier3} t4 ${summary.totals.tier4}`);
  console.log(`  orphans ${summary.totals.orphans} | near-orphans ${summary.totals.nearOrphans} | unreachable-contextual ${summary.totals.unreachableContextual}`);
  console.log(`  avg depth all ${summary.totals.avgDepthAll} | contextual ${summary.totals.avgDepthContextual}`);
  console.log(`  Tier1 with contextual inbound ${summary.totals.tier1WithContextualInbound}/${summary.totals.tier1} | Tier2 ${summary.totals.tier2WithContextualInbound}/${summary.totals.tier2}`);
  console.log(`  param-linked pages ${summary.totals.paramLinkedPages} | links-to-redirect ${summary.totals.linksToRedirect.length}`);
  return { summary, pages };
}

const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
const round = (x) => Math.round(x * 100) / 100;

function renderMd(s, pages) {
  const L = ['# Internal-authority graph — TalentPartnerID', '', `Base: \`${s.base}\` · host: \`${s.generatedFor}\``, '',
    '_Diagnostic model of internal discovery. The authority score is a relative internal-linking heuristic, NOT a Google PageRank value._', '',
    '## Totals', '', '| metric | value |', '|---|---|'];
  for (const [k, v] of Object.entries(s.totals)) if (!Array.isArray(v)) L.push(`| ${k} | ${v} |`);
  L.push('', '## Orphans (0 inbound links)', '', s.orphans.length ? s.orphans.map((r) => `- ${r}`).join('\n') : '_none_', '',
    '## Near-orphans (reachable only via chrome / no contextual inbound / deep)', '', '| route | tier | contextual inbound | contextual depth | chrome inbound |', '|---|---|---|---|---|');
  for (const n of s.nearOrphans) L.push(`| ${n.route} | ${n.tier} | ${n.inContextual} | ${n.depthCtx ?? '∞'} | ${n.inChrome} |`);
  L.push('', '## Tier 1 discovery', '', '| route | contextual inbound | from Tier1 | contextual depth | depth from hub |', '|---|---|---|---|---|');
  for (const t of s.tier1) L.push(`| ${t.route} | ${t.inContextual} | ${t.inTier1} | ${t.depthCtx ?? '∞'} | ${t.depthHub ?? '∞'} |`);
  return L.join('\n');
}

module.exports = { main };
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
