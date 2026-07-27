// Deterministic Google-indexability audit (READ-ONLY crawler).
//
// Crawls a locally-served PRODUCTION build over the canonical route inventory,
// the sitemap, and a set of known duplicate/parameter probe URLs, recording the
// raw server-HTML SEO signals (no JavaScript execution — exactly what Googlebot
// sees first). It then derives the cross-page graph: duplicate titles/H1s/
// descriptions, near-duplicate bodies, orphan pages, links to redirects/params,
// and broken internal links.
//
// Usage:
//   BASE=http://localhost:4123 node scripts/seo-audit.js
//
// Writes reports/google-indexability.json (machine) and .md (human). It never
// mutates application code. Absolutely no network calls leave the given BASE.

const fs = require('fs');
const path = require('path');
const { buildRouteInventory, validateSitemapFile, CANONICAL_ORIGIN } = require('./validate-sitemap');

const ROOT = path.join(__dirname, '..');
const REPORTS = path.join(ROOT, 'reports');
const BASE = process.env.BASE || 'http://localhost:4123';
const HOST = CANONICAL_ORIGIN; // https://talentpartnerid.com

// ── HTML signal extraction (regex, matching the repo's dependency-free style) ─
const rawText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'));
  return m ? m[1] : null;
};

function firstTag(html, re) {
  const m = html.match(re);
  return m ? m[0] : null;
}

function extractSignals(html) {
  const titleM = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const descTag = firstTag(html, /<meta[^>]+name="description"[^>]*>/i);
  const robotsTag = firstTag(html, /<meta[^>]+name="robots"[^>]*>/i);
  const canonicalTag = firstTag(html, /<link[^>]+rel="canonical"[^>]*>/i);
  const ogUrlTag = firstTag(html, /<meta[^>]+property="og:url"[^>]*>/i);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => rawText(m[1]));
  const langM = html.match(/<html[^>]*\slang="([^"]*)"/i);
  const hreflangs = [...html.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]*)"[^>]*>/gi)].map(
    (m) => ({ lang: m[1], href: attr(m[0], 'href') }),
  );
  const ldTypes = [];
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const json = JSON.parse(m[1].trim());
      const arr = Array.isArray(json) ? json : [json];
      for (const node of arr) if (node && node['@type']) ldTypes.push(node['@type']);
    } catch {
      ldTypes.push('UNPARSEABLE');
    }
  }
  const hasSearchAction = /SearchAction|search_term_string/.test(html);
  const links = [...html.matchAll(/<a\b[^>]*\shref="([^"]*)"[^>]*>/gi)].map((m) => m[1]);
  const body = rawText(html);
  return {
    title: titleM ? rawText(titleM[1]) : null,
    description: descTag ? attr(descTag, 'content') : null,
    robots: robotsTag ? attr(robotsTag, 'content') : null,
    canonical: canonicalTag ? attr(canonicalTag, 'href') : null,
    ogUrl: ogUrlTag ? attr(ogUrlTag, 'content') : null,
    h1s,
    htmlLang: langM ? langM[1] : null,
    hreflangs,
    ldTypes,
    hasSearchAction,
    links,
    textLen: body.length,
    body,
  };
}

// ── Normalization + similarity ────────────────────────────────────────────────
const normText = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function shingles(text, k = 5) {
  const words = normText(text).split(' ').filter(Boolean);
  const set = new Set();
  for (let i = 0; i + k <= words.length; i++) set.add(words.slice(i, i + k).join(' '));
  return set;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  for (const x of small) if (large.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

// ── Fetch with manual redirect chain ─────────────────────────────────────────
async function crawl(pathname) {
  const chain = [];
  let url = pathname.startsWith('http') ? pathname : BASE + pathname;
  let res;
  for (let i = 0; i < 6; i++) {
    res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'seo-audit/1.0' } });
    const loc = res.headers.get('location');
    chain.push({ url, status: res.status, location: loc });
    if (res.status >= 300 && res.status < 400 && loc) {
      url = loc.startsWith('http') ? loc : BASE + loc;
      continue;
    }
    break;
  }
  const ct = res.headers.get('content-type') || '';
  const xRobots = res.headers.get('x-robots-tag') || null;
  let html = '';
  if (ct.includes('text/html')) html = await res.text();
  return {
    finalStatus: res.status,
    finalUrl: url,
    redirectCount: chain.length - 1,
    chain,
    contentType: ct,
    xRobots,
    html,
  };
}

// Resolve an internal href to a comparable pathname, correctly handling
// root-relative (/foo), document-relative (foo.html) and absolute-canonical
// (https://host/foo) links relative to the page they were found on.
function normPath(href, fromRoute = '/') {
  if (!href) return null;
  const h = href.trim();
  if (h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('tel:') || h.startsWith('javascript:')) return null;
  const base = HOST + (fromRoute.startsWith('/') ? fromRoute : '/' + fromRoute);
  let u;
  try {
    u = new URL(h, base);
  } catch {
    return { external: true, raw: href };
  }
  if (u.origin !== HOST) return { external: true, raw: href };
  return { external: false, path: u.pathname || '/', query: u.search.replace(/^\?/, ''), raw: href };
}

async function main() {
  const inventory = buildRouteInventory(ROOT); // Set of canonical URLs + route lists
  const sitemap = validateSitemapFile();
  const sitemapPaths = new Set(sitemap.urls.map((u) => u.replace(HOST, '')));

  // Route universe: inventory routes + special probes.
  const inventoryPaths = [...inventory.urls].map((u) => u.replace(HOST, '')).sort();
  const probes = [
    '/?s=test-query',
    '/poptavka-pracovniku?source=service-page',
    '/poptavka-pracovniku?source=employer-hub',
    '/privacy', '/privacy-cs', '/privacy-de',
    '/cookies', '/cookies-cs', '/cookies-de',
    '/terms', '/terms-cs', '/terms-de',
    '/nonexistent-audit-probe-xyz',
  ];
  const allPaths = [...new Set([...inventoryPaths, ...probes])];

  const pages = {};
  for (const p of allPaths) {
    const c = await crawl(p);
    const sig = c.html ? extractSignals(c.html) : null;
    pages[p] = {
      route: p,
      inSitemap: sitemapPaths.has(p.split('?')[0]) && !p.includes('?'),
      inInventory: inventoryPaths.includes(p),
      status: c.finalStatus,
      redirectCount: c.redirectCount,
      finalUrl: c.finalUrl,
      chain: c.chain,
      contentType: c.contentType,
      xRobots: c.xRobots,
      title: sig?.title ?? null,
      description: sig?.description ?? null,
      robots: sig?.robots ?? null,
      canonical: sig?.canonical ?? null,
      ogUrl: sig?.ogUrl ?? null,
      h1: sig?.h1s ?? [],
      htmlLang: sig?.htmlLang ?? null,
      hreflangs: sig?.hreflangs ?? [],
      ldTypes: sig?.ldTypes ?? [],
      hasSearchAction: sig?.hasSearchAction ?? false,
      textLen: sig?.textLen ?? 0,
      links: sig?.links ?? [],
      _shingles: sig ? shingles(sig.body) : new Set(),
    };
  }

  // Self-canonical: canonical path equals the served path (query-stripped).
  const canonPath = (u) => (u ? u.replace(HOST, '').split('#')[0] : null);
  for (const p of Object.values(pages)) {
    p.canonicalPath = canonPath(p.canonical);
    p.selfCanonical =
      p.canonical != null &&
      p.canonical.startsWith(HOST) &&
      p.canonicalPath === p.route.split('?')[0];
  }

  // Internal link graph over indexable inventory routes (query-stripped targets).
  const indexable = inventoryPaths.filter((p) => {
    const pg = pages[p];
    return pg.status === 200 && !/noindex/i.test(pg.robots || '') && !/noindex/i.test(pg.xRobots || '');
  });
  const inbound = Object.fromEntries(inventoryPaths.map((p) => [p, new Set()]));
  const linksToRedirect = [];
  const linksToParam = [];
  const brokenLinks = [];
  for (const src of inventoryPaths) {
    const seen = new Set();
    for (const href of pages[src].links) {
      const n = normPath(href, src);
      if (!n || n.external) continue;
      const target = n.path;
      if (n.query) linksToParam.push({ from: src, href });
      if (!(target in inbound)) {
        // target not an inventory route: could be a static twin, legal, 404
        const tp = pages[target];
        if (tp) {
          if (tp.redirectCount > 0) linksToRedirect.push({ from: src, to: target, hop: tp.finalUrl });
        }
        continue;
      }
      if (target !== src && !seen.has(target)) {
        inbound[target].add(src);
        seen.add(target);
      }
      if (pages[target].redirectCount > 0) linksToRedirect.push({ from: src, to: target });
    }
  }
  const orphans = indexable.filter((p) => p !== '/' && inbound[p].size === 0);

  // Duplicate title / H1 / description clusters (normalized).
  const cluster = (keyFn) => {
    const m = {};
    for (const p of indexable) {
      const k = keyFn(pages[p]);
      if (!k) continue;
      (m[k] ||= []).push(p);
    }
    return Object.entries(m).filter(([, v]) => v.length > 1).map(([k, v]) => ({ value: k, routes: v }));
  };
  const dupTitles = cluster((pg) => normText(pg.title));
  const dupH1 = cluster((pg) => normText(pg.h1[0]));
  const dupDesc = cluster((pg) => normText(pg.description));

  // Near-duplicate bodies (Jaccard over 5-word shingles), same "family" prioritized.
  const family = (p) => p.replace(/^\//, '').replace(/-[a-z-]+$/i, '');
  const simPairs = [];
  for (let i = 0; i < indexable.length; i++) {
    for (let j = i + 1; j < indexable.length; j++) {
      const a = indexable[i], b = indexable[j];
      const s = jaccard(pages[a]._shingles, pages[b]._shingles);
      if (s >= 0.6) simPairs.push({ a, b, similarity: Number(s.toFixed(3)), sameFamily: family(a) === family(b) });
    }
  }
  simPairs.sort((x, y) => y.similarity - x.similarity);

  const soft404 = indexable.filter((p) => pages[p].textLen < 600);

  // Strip heavy fields for JSON.
  const pagesOut = {};
  for (const [k, v] of Object.entries(pages)) {
    const { _shingles, links, ...rest } = v;
    pagesOut[k] = { ...rest, outboundInternal: links.filter((h) => { const n = normPath(h, k); return n && !n.external; }).length, inboundInternal: inbound[k] ? inbound[k].size : null };
  }

  const summary = {
    base: BASE,
    generatedFor: HOST,
    routeCounts: {
      inventory: inventoryPaths.length,
      sitemap: sitemapPaths.size,
      probes: probes.length,
      crawled: allPaths.length,
      indexable: indexable.length,
    },
    findings: {
      searchActionPages: Object.values(pages).filter((p) => p.hasSearchAction).map((p) => p.route),
      non200Inventory: inventoryPaths.filter((p) => pages[p].status !== 200),
      redirectingInventory: inventoryPaths.filter((p) => pages[p].redirectCount > 0),
      notSelfCanonical: indexable.filter((p) => !pages[p].selfCanonical),
      canonicalOffHost: indexable.filter((p) => pages[p].canonical && !pages[p].canonical.startsWith(HOST)),
      orphanIndexable: orphans,
      linksToRedirect: dedupe(linksToRedirect.map((x) => `${x.from} -> ${x.to || x.hop}`)),
      linksToParam: dedupe(linksToParam.map((x) => `${x.from} -> ${x.href}`)),
      duplicateTitles: dupTitles,
      duplicateH1: dupH1,
      duplicateDescriptions: dupDesc,
      highSimilarityPairs: simPairs.slice(0, 60),
      softOrThin: soft404,
      paramProbes: probes.filter((p) => p.includes('?')).map((p) => ({ probe: p, status: pages[p].status, canonical: pages[p].canonical, redirect: pages[p].redirectCount })),
      cleanLegalTwins: ['/privacy', '/privacy-cs', '/privacy-de', '/cookies', '/cookies-cs', '/cookies-de', '/terms', '/terms-cs', '/terms-de']
        .map((p) => ({ probe: p, status: pages[p].status, canonical: pages[p].canonical, redirect: pages[p].redirectCount })),
    },
  };

  fs.mkdirSync(REPORTS, { recursive: true });
  fs.writeFileSync(path.join(REPORTS, 'google-indexability.json'), JSON.stringify({ summary, pages: pagesOut }, null, 2));
  fs.writeFileSync(path.join(REPORTS, 'google-indexability.md'), renderMd(summary, pagesOut));
  console.log('SEO audit complete.');
  console.log(`  crawled: ${allPaths.length}  indexable: ${indexable.length}`);
  console.log(`  SearchAction pages: ${summary.findings.searchActionPages.length}`);
  console.log(`  non-200 inventory: ${summary.findings.non200Inventory.length}`);
  console.log(`  redirecting inventory: ${summary.findings.redirectingInventory.length}`);
  console.log(`  not self-canonical (indexable): ${summary.findings.notSelfCanonical.length}`);
  console.log(`  orphan indexable: ${orphans.length}`);
  console.log(`  internal links to params: ${summary.findings.linksToParam.length}`);
  console.log(`  duplicate titles: ${dupTitles.length}  dup H1: ${dupH1.length}  dup desc: ${dupDesc.length}`);
  console.log(`  high-similarity pairs (>=0.6): ${simPairs.length}`);
  console.log(`  thin (<600 chars): ${soft404.length}`);
  console.log(`  reports/google-indexability.{json,md} written`);
}

function dedupe(a) { return [...new Set(a)]; }

function renderMd(s, pages) {
  const L = [];
  L.push('# Google Indexability Audit — TalentPartnerID');
  L.push('');
  L.push(`Base crawled: \`${s.base}\` · canonical host: \`${s.generatedFor}\``);
  L.push('');
  L.push('## Route counts');
  L.push('');
  L.push('| metric | value |');
  L.push('|---|---|');
  for (const [k, v] of Object.entries(s.routeCounts)) L.push(`| ${k} | ${v} |`);
  L.push('');
  const f = s.findings;
  const section = (title, arr, fmt = (x) => `- ${x}`) => {
    L.push(`## ${title} (${Array.isArray(arr) ? arr.length : Object.keys(arr).length})`);
    L.push('');
    if (!arr || (Array.isArray(arr) && !arr.length)) { L.push('_none_'); L.push(''); return; }
    for (const x of arr) L.push(fmt(x));
    L.push('');
  };
  section('SearchAction / search_term_string pages', f.searchActionPages);
  section('Inventory routes not returning 200', f.non200Inventory, (x) => `- ${x} → ${pages[x].status}`);
  section('Inventory routes that redirect', f.redirectingInventory, (x) => `- ${x} → ${pages[x].finalUrl} (${pages[x].redirectCount} hop)`);
  section('Indexable pages NOT self-canonical', f.notSelfCanonical, (x) => `- ${x} → canonical \`${pages[x].canonical}\``);
  section('Canonical off canonical-host', f.canonicalOffHost, (x) => `- ${x} → \`${pages[x].canonical}\``);
  section('Orphan indexable pages (0 internal inbound links)', f.orphanIndexable);
  section('Internal links to parameterized URLs', f.linksToParam);
  section('Internal links to redirects', f.linksToRedirect);
  section('Parameter probes', f.paramProbes, (x) => `- \`${x.probe}\` → ${x.status}, canonical \`${x.canonical}\`, ${x.redirect} redirect`);
  section('Clean legal twins (Netlify pretty-URL)', f.cleanLegalTwins, (x) => `- \`${x.probe}\` → ${x.status}, canonical \`${x.canonical}\`, ${x.redirect} redirect`);
  L.push('## Duplicate titles');
  L.push('');
  if (!f.duplicateTitles.length) L.push('_none_');
  for (const d of f.duplicateTitles) L.push(`- **${d.value}** → ${d.routes.join(', ')}`);
  L.push('');
  L.push('## Duplicate H1');
  L.push('');
  if (!f.duplicateH1.length) L.push('_none_');
  for (const d of f.duplicateH1) L.push(`- **${d.value}** → ${d.routes.join(', ')}`);
  L.push('');
  L.push('## Duplicate meta descriptions');
  L.push('');
  if (!f.duplicateDescriptions.length) L.push('_none_');
  for (const d of f.duplicateDescriptions) L.push(`- ${d.routes.join(', ')}`);
  L.push('');
  L.push('## High body similarity pairs (Jaccard ≥ 0.6, top 60)');
  L.push('');
  L.push('| a | b | similarity | same family |');
  L.push('|---|---|---|---|');
  for (const p of f.highSimilarityPairs) L.push(`| ${p.a} | ${p.b} | ${p.similarity} | ${p.sameFamily ? 'yes' : ''} |`);
  L.push('');
  L.push('## Thin pages (< 600 chars server text)');
  L.push('');
  if (!f.softOrThin.length) L.push('_none_');
  for (const x of f.softOrThin) L.push(`- ${x} (${pages[x].textLen} chars)`);
  L.push('');
  return L.join('\n');
}

module.exports = { extractSignals, jaccard, shingles, normText };

if (require.main === module) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
