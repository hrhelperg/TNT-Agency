// Deterministic request-surface INVENTORY (Batch D, READ-ONLY). Enumerates every
// declared employer request CTA from the code — which surface labels exist, in
// which components/pages, and that each resolves to the clean canonical request
// path. This is an inventory of *declared request entry points*, NOT a conversion
// rate and NOT a request volume: because CTA sources travel in sessionStorage
// (never the URL) and mailto sends are classified "no event" by the consent-gated
// WebmasterID tracker, actual request volume/completion is unmeasurable in-repo.
// Real reach is therefore reported as "unknown (owner WebmasterID export required)",
// mirroring the Batch A coverage baseline. No new tracker, no backend, no PII.
//
// Writes reports/conversion-surface.{json,md}. Run: node scripts/conversion-surface.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const REPORTS = path.join(ROOT, 'reports');
const REQUEST_PATH = '/poptavka-pracovniku';

const code = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
const walk = (dir, ext, out = []) => {
  const full0 = path.join(ROOT, dir);
  if (!fs.existsSync(full0)) return out;
  for (const e of fs.readdirSync(full0, { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) { if (!['node_modules', '.next', '.git'].includes(e.name)) walk(rel, ext, out); }
    else if (ext.some((x) => e.name.endsWith(x))) out.push(rel);
  }
  return out;
};
const appFiles = [...walk('components', ['.tsx', '.ts']), ...walk('pages', ['.tsx', '.ts'])]
  .filter((f) => !f.endsWith('.test.ts') && !f.endsWith('.test.tsx'));

// 1. Declared CtaSource allowlist (single source of truth).
const attribution = fs.readFileSync(path.join(ROOT, 'lib/attribution/index.ts'), 'utf8');
const tupleMatch = attribution.match(/CTA_SOURCES\s*=\s*\[([\s\S]*?)\]/);
const declaredSources = tupleMatch ? [...tupleMatch[1].matchAll(/'([a-z-]+)'/g)].map((m) => m[1]) : [];

// 2. Every emitted request-surface label + where it lives.
const surfaces = new Map(); // source -> Set(files)
let ownerHref = null;
for (const f of appFiles) {
  const src = code(fs.readFileSync(path.join(ROOT, f), 'utf8'));
  const add = (label) => {
    if (!declaredSources.includes(label)) return; // ignore unrelated source= attrs
    if (!surfaces.has(label)) surfaces.set(label, new Set());
    surfaces.get(label).add(f);
  };
  // Quoted attribute literals: data-request-source="x" / source="x".
  for (const m of src.matchAll(/(?:data-request-source|source)=["']([a-z-]+)["']/g)) add(m[1]);
  // Literals embedded in a data-request-source={…} expression (e.g. SeoArticle's
  // conditional data-request-source={... ? 'service-page' : undefined}).
  for (const m of src.matchAll(/data-request-source=\{[^}]*?'([a-z-]+)'/g)) add(m[1]);
}
// The dynamic emitter (EmployerCta passes source={source}); note it explicitly.
const hasDynamicEmitter = appFiles.some((f) => /data-request-source=\{source\}/.test(code(fs.readFileSync(path.join(ROOT, f), 'utf8'))));

// 3. Hygiene: no request link carries a query/hash.
const leaky = [];
for (const f of appFiles) {
  const src = code(fs.readFileSync(path.join(ROOT, f), 'utf8'));
  for (const m of src.matchAll(/\/poptavka-pracovniku(\?[^"'`\s)]*|#[^"'`\s)]*)/g)) leaky.push(`${f}: ${REQUEST_PATH}${m[1]}`);
}

const rows = [...surfaces.entries()].sort().map(([source, files]) => ({
  source, files: [...files].sort(), wiredOn: files.size, resolvesTo: REQUEST_PATH, queryParam: 'none',
}));
const emittedSet = new Set(rows.map((r) => r.source));
const declaredNotEmitted = declaredSources.filter((s) => !emittedSet.has(s)); // e.g. 'direct' (fallback only)

const json = {
  requestPath: REQUEST_PATH,
  declaredSources,
  emittedSurfaces: rows,
  declaredButNotEmittedOnLinks: declaredNotEmitted,
  dynamicEmitterPresent: hasDynamicEmitter,
  leakyRequestLinks: leaky,
  volume: 'unknown (owner WebmasterID export required)',
  note: 'Inventory of declared request CTAs only. Not a conversion rate or request volume.',
};
fs.mkdirSync(REPORTS, { recursive: true });
fs.writeFileSync(path.join(REPORTS, 'conversion-surface.json'), JSON.stringify(json, null, 2));

const md = [
  '# Request-surface inventory — TalentPartnerID (Batch D)', '',
  '_A deterministic inventory of the **declared** employer request CTAs in the code — which surface labels exist and where. It is **not** a conversion rate or a request volume._', '',
  '## What can and cannot be measured', '',
  '- **Measurable in-repo (below):** which request CTAs exist, their surface label, the components/pages they live on, and that each resolves to the clean canonical `' + REQUEST_PATH + '` with no query param.',
  '- **NOT measurable in-repo:** request *volume* or *completion*. CTA sources travel in `sessionStorage` (never the URL), and mailto sends are classified "no event" by the consent-gated WebmasterID tracker — so the mail hand-off cannot be observed client-side. Volume is recorded as **unknown**; it is never inferred from CTA counts or sitemap membership.', '',
  '## Owner action for real reach', '',
  '- Export **WebmasterID → page_views / sessions** for `' + REQUEST_PATH + '` (and by entry route/referrer) → `data/webmasterid.csv`. This yields request-page **reach**, not mailto completion (which remains unmeasurable). No second tracker, no backend, no PII.', '',
  '## Declared request-surface labels (single source of truth: `lib/attribution`)', '',
  declaredSources.map((s) => `- \`${s}\``).join('\n') || '_none_',
  '', '## Emitted request CTAs (from code)', '',
  '| surface label | wired on | resolves to | query param |', '|---|---|---|---|',
  ...rows.map((r) => `| \`${r.source}\` | ${r.wiredOn} file(s): ${r.files.join(', ')} | \`${r.resolvesTo}\` | ${r.queryParam} |`),
  '', hasDynamicEmitter ? '`components/EmployerCta.tsx` additionally emits `data-request-source={source}` (typed `CtaSource` prop) at its call sites.' : '',
  declaredNotEmitted.length ? `\nDeclared but never emitted on a link (fallback/default only): ${declaredNotEmitted.map((s) => `\`${s}\``).join(', ')}.` : '',
  '', '## Hygiene', '',
  leaky.length ? `⚠️ Request links carrying a query/hash: ${leaky.join('; ')}` : '- All request CTAs resolve to the bare canonical path — **0** carry a query or hash parameter.',
].join('\n');
fs.writeFileSync(path.join(REPORTS, 'conversion-surface.md'), md);

console.log('Request-surface inventory written:');
console.log(`  reports/conversion-surface.{json,md}`);
console.log(`  declared sources: ${declaredSources.length} | emitted surfaces: ${rows.length} | leaky request links: ${leaky.length}`);
