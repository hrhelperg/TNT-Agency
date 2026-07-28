// Internal-authority / discovery gate (READ-ONLY). Locks in the Batch A
// discovery recovery so it cannot silently regress.
//
// With a running production build (BASE set) it crawls fresh; otherwise it reads
// the committed reports/internal-authority-graph.json.
//
// Fails when: any orphan (0 inbound) exists; a Tier 1–3 page is a near-orphan
// (no contextual inbound, or contextually unreachable from the homepage); a
// Tier 1 page lacks contextual inbound or is contextually deeper than the
// threshold; an internal link points at a redirect; or a parameterized internal
// link is emitted. (Tier 4 legal/utility pages are footer-discoverable and are
// reported, not failed.)

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MAX_TIER1_DEPTH = 3;
const errors = [];
const warnings = [];

async function loadModel() {
  if (process.env.BASE) {
    const { main } = require('./authority-graph');
    return main(); // crawls BASE, writes reports, returns { summary, pages }
  }
  const p = path.join(ROOT, 'reports/internal-authority-graph.json');
  if (!fs.existsSync(p)) throw new Error('reports/internal-authority-graph.json missing — run `BASE=… npm run seo:authority` first');
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

(async () => {
  const { summary, pages } = await loadModel();
  const t = summary.totals;

  // 1. No orphans anywhere.
  if (summary.orphans.length) errors.push(`${summary.orphans.length} orphan page(s): ${summary.orphans.join(', ')}`);

  // 2. No Tier 1–3 near-orphans.
  const t13NearOrphans = summary.nearOrphans.filter((n) => n.tier < 4);
  for (const n of t13NearOrphans) {
    errors.push(`Tier ${n.tier} near-orphan ${n.route} (contextual inbound ${n.inContextual}, contextual depth ${n.depthCtx ?? '∞'})`);
  }
  // Tier 4 near-orphans are footer-discoverable — report only.
  for (const n of summary.nearOrphans.filter((n) => n.tier === 4)) warnings.push(`Tier 4 (legal/utility) footer-discoverable near-orphan: ${n.route}`);

  // 3. Tier 1 discovery quality.
  for (const p of summary.tier1) {
    if (p.inContextual === 0) errors.push(`Tier 1 ${p.route} has no contextual inbound link`);
    if (p.depthCtx == null) errors.push(`Tier 1 ${p.route} is contextually unreachable from the homepage`);
    else if (p.depthCtx > MAX_TIER1_DEPTH) errors.push(`Tier 1 ${p.route} contextual depth ${p.depthCtx} > ${MAX_TIER1_DEPTH}`);
  }
  if (t.tier1WithContextualInbound < t.tier1) errors.push(`only ${t.tier1WithContextualInbound}/${t.tier1} Tier 1 pages have contextual inbound`);

  // 4. Link hygiene.
  if (t.linksToRedirect.length) errors.push(`internal links to redirects: ${t.linksToRedirect.join(', ')}`);
  if (t.paramLinkedPages) errors.push(`${t.paramLinkedPages} page(s) linked with a query parameter`);

  // 5. Raw-HTML discovery quality (A9): contextual links must carry descriptive
  // anchor text. Generic/empty anchors to Tier 1–3 pages fail; Tier 4 warns.
  for (const a of summary.genericAnchors || []) {
    const msg = `non-descriptive contextual anchor "${a.text || '(empty)'}" ${a.from} → ${a.to} (tier ${a.tier})`;
    if (a.tier < 4) errors.push(msg); else warnings.push(msg);
  }

  // ── Report ────────────────────────────────────────────────────────────────
  if (warnings.length) { console.log('Internal-authority gate — notes:'); for (const w of warnings) console.log(`  · ${w}`); }
  if (errors.length) {
    console.error(`Internal-authority gate: FAIL (${errors.length})`);
    for (const e of errors) console.error(`  ✗ ${e}`);
    process.exit(1);
  }
  console.log('Internal-authority gate: PASS');
  console.log(`  ${t.canonical} canonical | orphans ${t.orphans} | Tier1–3 near-orphans 0 | Tier1 contextual inbound ${t.tier1WithContextualInbound}/${t.tier1}`);
  console.log(`  avg contextual depth ${t.avgDepthContextual} | links-to-redirect ${t.linksToRedirect.length} | param-linked ${t.paramLinkedPages}`);
})().catch((e) => { console.error(e.message); process.exit(1); });
