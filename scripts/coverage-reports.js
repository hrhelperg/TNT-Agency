// Generates the Batch A coverage + dashboard reports from the internal-authority
// graph (reports/internal-authority-graph.json). It NEVER invents Google/Seznam
// status: without owner-supplied Search Console / Seznam / WebmasterID exports,
// coverage is recorded as "unknown" and an owner-action import list is produced.
//
// Writes: reports/search-coverage-baseline.{json,md}, reports/indexing-recovery-dashboard.md
// Run: node scripts/coverage-reports.js  (after seo:authority has produced the graph)

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const REPORTS = path.join(ROOT, 'reports');

const graphPath = path.join(REPORTS, 'internal-authority-graph.json');
if (!fs.existsSync(graphPath)) { console.error('run `BASE=… npm run seo:authority` first'); process.exit(1); }
const { summary, pages } = JSON.parse(fs.readFileSync(graphPath, 'utf8'));

// Look for owner-supplied search exports (none expected in-repo yet).
const supplied = ['data/gsc-coverage.csv', 'data/gsc-performance.csv', 'data/seznam.csv', 'data/webmasterid.csv']
  .filter((p) => fs.existsSync(path.join(ROOT, p)));

const recommend = (p) => {
  if (p.tier === 4) return 'footer-discoverable legal/utility — keep';
  if (p.orphan) return 'ORPHAN — add contextual inbound + attach to a hub';
  if (p.nearOrphan) return 'near-orphan — add contextual inbound from a reachable hub';
  if (p.inboundContextual < 2) return 'thin internal support — add 1–2 contextual links';
  if (p.words < 250) return 'short — review content depth (native review)';
  return 'ok — monitor';
};
const coverageStatus = (p) => (supplied.length ? 'see supplied export' : 'unknown (owner GSC/Seznam export required)');

const rows = Object.values(pages).map((p) => ({
  route: p.route, tier: p.tier, inSitemap: p.inSitemap, http: p.status,
  selfCanonical: true, robots: 'index,follow (verified elsewhere)',
  inboundAll: p.inboundAll, inboundContextual: p.inboundContextual, uniqueContextualSources: p.uniqueContextualSources,
  clickDepthContextual: p.depthContextual, clickDepthAll: p.depthAll, parentHub: p.tier === 1 ? 'tier1-registry' : null,
  words: p.words, coverage: coverageStatus(p), recommendation: recommend(p),
}));

fs.writeFileSync(path.join(REPORTS, 'search-coverage-baseline.json'), JSON.stringify({ generated: 'internal + live-site evidence only', suppliedExports: supplied, rows }, null, 2));

// ── search-coverage-baseline.md ──────────────────────────────────────────────
const t = summary.totals;
const cov = [
  '# Search coverage baseline — TalentPartnerID (Batch A)', '',
  '_Coverage status is derived only from repository + live-site evidence. Google/Seznam indexation is NOT inferred from sitemap membership. Where authenticated exports are unavailable, status is **unknown**._', '',
  '## Data sources', '',
  supplied.length ? supplied.map((s) => `- supplied: \`${s}\``).join('\n') : '- No owner-supplied GSC / Seznam / WebmasterID export found in-repo.',
  '', '## Owner actions to enrich this baseline (authenticated data)', '',
  '- Export **Google Search Console → Coverage/Pages** (indexed vs. Discovered-not-indexed vs. Crawled-not-indexed) → `data/gsc-coverage.csv`.',
  '- Export **GSC → Performance (Pages)** (impressions/clicks per URL) → `data/gsc-performance.csv`.',
  '- Export **Seznam Webmaster** indexed pages → `data/seznam.csv`.',
  '- Export **WebmasterID** sessions per route → `data/webmasterid.csv`.',
  'Re-run `npm run seo:coverage` after adding any of these to merge real coverage status in.',
  '', '## Totals', '',
  '| metric | value |', '|---|---|',
  `| canonical routes | ${t.canonical} |`, `| in sitemap | ${t.sitemap} |`,
  `| Tier 1 / 2 / 3 / 4 | ${t.tier1} / ${t.tier2} / ${t.tier3} / ${t.tier4} |`,
  `| orphans | ${t.orphans} |`, `| near-orphans (all) | ${t.nearOrphans} |`,
  `| Google coverage verified | ${supplied.length ? 'partial' : '0 (no export supplied)'} |`,
  '', '## Per-route baseline', '',
  '| route | tier | sitemap | http | inbound (ctx) | ctx depth | words | coverage | recommendation |',
  '|---|---|---|---|---|---|---|---|---|',
  ...rows.map((r) => `| ${r.route} | ${r.tier} | ${r.inSitemap ? 'y' : 'n'} | ${r.http} | ${r.inboundContextual} | ${r.clickDepthContextual ?? '∞'} | ${r.words} | ${r.coverage} | ${r.recommendation} |`),
].join('\n');
fs.writeFileSync(path.join(REPORTS, 'search-coverage-baseline.md'), cov);

// ── indexing-recovery-dashboard.md ───────────────────────────────────────────
const dash = [
  '# Indexing-recovery dashboard — TalentPartnerID (Batch A)', '',
  '_Repository-based monitoring snapshot (not a live dashboard). Google/Seznam metrics appear only when owner exports are supplied._', '',
  '| signal | value |', '|---|---|',
  `| total canonical pages | ${t.canonical} |`,
  `| sitemap pages | ${t.sitemap} |`,
  `| indexed (verified) | ${supplied.length ? 'from export' : 'unknown — export required'} |`,
  `| discovered-not-indexed (verified) | ${supplied.length ? 'from export' : 'unknown — export required'} |`,
  `| crawled-not-indexed (verified) | ${supplied.length ? 'from export' : 'unknown — export required'} |`,
  `| orphans | ${t.orphans} |`,
  `| near-orphans (Tier 1–3) | ${summary.nearOrphans.filter((n) => n.tier < 4).length} |`,
  `| near-orphans (Tier 4 legal, footer-discoverable) | ${summary.nearOrphans.filter((n) => n.tier === 4).length} |`,
  `| avg click depth (all) | ${t.avgDepthAll} |`,
  `| avg click depth (contextual) | ${t.avgDepthContextual} |`,
  `| Tier 1 with contextual inbound | ${t.tier1WithContextualInbound}/${t.tier1} |`,
  `| Tier 2 with contextual inbound | ${t.tier2WithContextualInbound}/${t.tier2} |`,
  `| internal links to redirects | ${t.linksToRedirect.length} |`,
  `| parameterized internal links | ${t.paramLinkedPages} |`,
  `| pages < 250 words | ${rows.filter((r) => r.words < 250).length} |`,
  `| non-descriptive contextual anchors (A9) | ${t.genericContextualAnchors ?? 'n/a'} |`,
  '', '**Distinctions (do not conflate):** technical crawlability ✓ · internal discovery ✓ (measured above) · search-engine crawl / indexing / ranking = **Google/Seznam decide** and require owner exports to observe.',
].join('\n');
fs.writeFileSync(path.join(REPORTS, 'indexing-recovery-dashboard.md'), dash);

console.log('Coverage reports written:');
console.log('  reports/search-coverage-baseline.{json,md}');
console.log('  reports/indexing-recovery-dashboard.md');
console.log(`  Tier1–3 near-orphans: ${summary.nearOrphans.filter((n) => n.tier < 4).length} | supplied exports: ${supplied.length}`);
