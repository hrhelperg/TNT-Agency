// Site-wide B2B conversion gate (Batch D, READ-ONLY, dependency-free).
//
// lib/employer-request/conversion.test.ts already guards the request flow, but
// only over ~6 hardcoded files. This validator lifts those guarantees to the
// whole tree so a NEW page/component cannot regress the mailto-first, backend-
// free, honest conversion path. It fails when:
//   1. any request CTA (a link to /poptavka-pracovniku) carries a ?query or #hash;
//   2. a data-request-source value is not a declared CtaSource;
//   3. a transmission API (fetch/XHR/beacon/gtag/dataLayer/axios/ajax/WebSocket/
//      EventSource) appears anywhere in the request path;
//   4. a backend/API/Supabase surface is (re)introduced;
//   5. the sole transport is no longer the user-initiated mailto;
//   6. a fabricated conversion metric appears in conversion copy.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const REQUEST_PATH = '/poptavka-pracovniku';
const errors = [];

const code = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));
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

// Declared CtaSource allowlist.
const attribution = read('lib/attribution/index.ts');
const tuple = attribution.match(/CTA_SOURCES\s*=\s*\[([\s\S]*?)\]/);
const declaredSources = tuple ? [...tuple[1].matchAll(/'([a-z-]+)'/g)].map((m) => m[1]) : [];
if (!declaredSources.length) errors.push('could not read the CtaSource allowlist from lib/attribution');

// Request-path file set: the explicit flow + any file that references the
// request path or the source hint (so a new request surface is covered too).
const requestPathFiles = new Set([
  ...walk('lib/employer-request', ['.ts', '.tsx']),
  ...walk('lib/attribution', ['.ts', '.tsx']),
  ...walk('lib/leads-lite', ['.ts', '.tsx']),
].filter((f) => !f.endsWith('.test.ts') && !f.endsWith('.test.tsx')));
for (const f of appFiles) {
  const raw = read(f);
  if (raw.includes('data-request-source') || raw.includes(REQUEST_PATH)) requestPathFiles.add(f);
}

// 1. Request-CTA canonicalization: no query/hash on a request link.
for (const f of appFiles) {
  const src = code(read(f));
  for (const m of src.matchAll(new RegExp(`${REQUEST_PATH}(\\?[^"'\\\`\\s)]*|#[^"'\\\`\\s)]*)`, 'g'))) {
    errors.push(`${f}: request link carries a parameter: ${REQUEST_PATH}${m[1]}`);
  }
}

// 2. data-request-source allowlist (site-wide).
for (const f of appFiles) {
  const src = code(read(f));
  const labels = [
    ...[...src.matchAll(/(?:data-request-source|source)=["']([a-z-]+)["']/g)].map((m) => m[1]),
    ...[...src.matchAll(/data-request-source=\{[^}]*?'([a-z-]+)'/g)].map((m) => m[1]),
  ];
  for (const l of labels) {
    // `source="..."` also matches unrelated attrs; only flag values that look like
    // a request-source (appear alongside data-request-source in the flow) but are
    // undeclared. We check membership only for data-request-source-shaped labels.
    if (/^[a-z]+(-[a-z]+)+$/.test(l) && !declaredSources.includes(l) && src.includes('data-request-source')) {
      errors.push(`${f}: undeclared data-request-source value "${l}"`);
    }
  }
}

// 3. No transmission API in the request path.
const TRANSMIT = /\bfetch\s*\(|XMLHttpRequest|navigator\.sendBeacon|\bgtag\s*\(|\bdataLayer\b|\baxios\b|\$\.ajax|new WebSocket|\bEventSource\b/;
for (const f of requestPathFiles) {
  const m = code(read(f)).match(TRANSMIT);
  if (m) errors.push(`${f}: transmission API "${m[0].trim()}" in the request path (must stay backend-free)`);
}

// 4. No backend / API / Supabase.
if (exists('pages/api')) errors.push('pages/api exists — the request flow must stay backend-free');
if (exists('lib/server')) errors.push('lib/server exists — the request flow must stay backend-free');
const BACKEND_IMPORT = /@supabase\/|createClient\(|from ['"]pg['"]|SERVICE_ROLE|DATABASE_URL|postgres:\/\//;
for (const f of requestPathFiles) {
  const m = code(read(f)).match(BACKEND_IMPORT);
  if (m) errors.push(`${f}: backend surface "${m[0]}" in the request path`);
}
const pkg = read('package.json');
const BACKEND_DEP = /"(@supabase\/[^"]+|prisma|drizzle-orm|nodemailer|resend|@sendgrid\/[^"]+|postmark|@aws-sdk\/[^"]+|pg|mysql2?|firebase)"\s*:/;
if (BACKEND_DEP.test(pkg)) errors.push(`package.json declares a backend/email dependency: ${pkg.match(BACKEND_DEP)[1]}`);

// 5. Mailto is the only transport.
const transport = read('lib/leads-lite/transport.ts');
if (!/window\.location\.href\s*=\s*prepared\.mailtoUrl/.test(transport)) {
  errors.push('lib/leads-lite/transport.ts no longer hands off via the user-initiated mailto');
}
if (/\bfetch\s*\(|XMLHttpRequest|navigator\.sendBeacon|new WebSocket|\bEventSource\b/.test(code(transport))) {
  errors.push('lib/leads-lite/transport.ts introduced a networked transport (must stay mailto-only)');
}

// 6. No fabricated conversion metric in conversion copy.
const copyFiles = ['lib/employer-request/copy.ts', 'lib/employer-request/cta.ts', 'pages/poptavka-pracovniku.tsx', 'components/EmployerCta.tsx', 'components/EmployerSituations.tsx'].filter(exists);
const FABRICATED = [
  /\d+\s*%\s*konverz/i, /konverz\w*\s*\d+\s*%/i, /\d+\s*%\s*conversion/i,
  /odezv\w*\s+do\s+\d+/i, /odpov\w+\s+do\s+\d+\s*hod/i, /response\s+within\s+\d+/i, /Antwort\s+innerhalb\s+von\s+\d+/i,
  /ušetř\w*\s+\d+\s*%/i, /\bsave\s+\d+\s*%/i, /\d+\s*%\s+sparen/i,
  /\d+\s*%\s*(úspěš|spokoj|klient|firem|success|satisf|zufrieden)/i,
];
for (const f of copyFiles) {
  const src = code(read(f));
  for (const re of FABRICATED) {
    const m = src.match(re);
    if (m) errors.push(`${f}: fabricated conversion metric "${m[0].trim()}" (unsubstantiable — request volume is unmeasurable client-side)`);
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
if (errors.length) {
  console.error(`Conversion gate: FAIL (${errors.length})`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('Conversion gate: PASS');
console.log(`  ${declaredSources.length} declared CtaSources | ${requestPathFiles.size} request-path files scanned`);
console.log(`  request CTAs canonical (no query/hash) | no transmission API | backend-free | mailto-only transport | no fabricated metrics`);
