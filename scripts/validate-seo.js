// Deterministic SEO regression gate (READ-ONLY, no server required).
//
// Locks in the indexing-coverage fixes so they cannot silently regress:
//   1. No SearchAction / search_term_string / ?s= template anywhere.
//   2. No parameterized internal links (?source=, ?mode=) — crawlers must only
//      ever meet the clean canonical URLs.
//   3. No internal link to the removed /privacy.html duplicate, no old-domain,
//      http:// or www. internal links.
//   4. Every static public HTML page carries a canonical; the ones kept in the
//      sitemap are self-canonical; the privacy translations point their EN link
//      at the canonical /privacy-policy.
//   5. Sitemap is param-free, contains no /privacy.html, and matches the
//      self-canonical inventory (delegated to validate-sitemap).
//
// Run: node scripts/validate-seo.js

const fs = require('fs');
const path = require('path');
const { validateSitemapFile } = require('./validate-sitemap');

const ROOT = path.join(__dirname, '..');
const errors = [];
const checks = [];
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(ROOT, p));

const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

function walk(dir, exts, out = []) {
  const full0 = path.join(ROOT, dir);
  if (!fs.existsSync(full0)) return out;
  for (const e of fs.readdirSync(full0, { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(e.name)) continue;
      walk(rel, exts, out);
    } else if (exts.some((x) => e.name.endsWith(x))) out.push(rel);
  }
  return out;
}

const check = (name, ok, detail) => {
  checks.push(name);
  if (!ok) errors.push(`${name}${detail ? ` — ${detail}` : ''}`);
};

const appFiles = [
  ...walk('components', ['.tsx', '.ts']),
  ...walk('lib', ['.ts', '.tsx']),
  ...walk('pages', ['.tsx', '.ts']),
].filter((f) => !f.endsWith('.test.ts') && !f.endsWith('.test.tsx'));
const htmlFiles = walk('public', ['.html']);

// ── 1. No SearchAction / search template ────────────────────────────────────
for (const f of appFiles) {
  const code = stripComments(read(f));
  if (/SearchAction|search_term_string/.test(code)) {
    errors.push(`SearchAction/search_term_string in ${f}`);
  }
  if (/\/\?s=\{?search_term_string\}?/.test(code)) errors.push(`?s= search template in ${f}`);
}
for (const f of htmlFiles) {
  if (/SearchAction|search_term_string/.test(read(f))) errors.push(`SearchAction/search_term_string in ${f}`);
}
check('no SearchAction / search_term_string / ?s= template anywhere', errors.length === 0);

// ── 2. No parameterized internal links (?source= / ?mode=) ──────────────────
const before2 = errors.length;
const paramLink = /href=["'`][^"'`]*\?(source|mode)=/i;
for (const f of [...appFiles, ...htmlFiles]) {
  const src = stripComments(read(f));
  const m = src.match(paramLink);
  if (m) errors.push(`parameterized internal link in ${f}: ${m[0]}`);
}
check('no parameterized internal links (?source= / ?mode=)', errors.length === before2);

// ── 3. No removed-duplicate / old-domain / insecure internal links ──────────
const before3 = errors.length;
const OLD_DOMAIN = /manpower-tnt\.agency|manpowertnt\.agency|tntgency\.org/i;
for (const f of [...appFiles, ...htmlFiles]) {
  const src = stripComments(read(f));
  for (const m of src.matchAll(/href=["'`]([^"'`]+)["'`]/gi)) {
    const href = m[1];
    if (/^\/privacy\.html(\b|$)/.test(href)) errors.push(`link to removed /privacy.html in ${f}`);
    if (OLD_DOMAIN.test(href)) errors.push(`old-domain link in ${f}: ${href}`);
    if (/^http:\/\//i.test(href)) errors.push(`insecure http:// link in ${f}: ${href}`);
    if (/^https?:\/\/www\.talentpartnerid\.com/i.test(href)) errors.push(`www internal link in ${f}: ${href}`);
  }
}
check('no removed-duplicate, old-domain, http or www internal links', errors.length === before3);

// ── 4. Static HTML canonical hygiene ────────────────────────────────────────
const before4 = errors.length;
const HOST = 'https://talentpartnerid.com';
const canonicalOf = (html) => {
  const m = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  return m ? m[1] : null;
};
const sitemap = read('public/sitemap.xml');
for (const f of htmlFiles) {
  const html = read(f);
  const canon = canonicalOf(html);
  const route = '/' + f.replace(/^public\//, '');
  check(`static page ${route} has a canonical`, !!canon);
  const inSitemap = sitemap.includes(`${HOST}${route}<`);
  if (inSitemap && canon && canon !== `${HOST}${route}`) {
    errors.push(`${route} is in the sitemap but not self-canonical (canonical → ${canon})`);
  }
}
// Privacy translations must point their English switch at the canonical route.
for (const f of ['public/privacy-cs.html', 'public/privacy-de.html']) {
  if (exists(f)) {
    check(`${f} English switch → /privacy-policy`, /href="\/privacy-policy"/.test(read(f)));
  }
}
check('removed EN privacy.html duplicate is gone', !exists('public/privacy.html'));
check('static HTML canonical hygiene', errors.length === before4);

// ── 5. Sitemap hygiene ──────────────────────────────────────────────────────
const before5 = errors.length;
if (/privacy\.html/.test(sitemap)) errors.push('sitemap still contains /privacy.html');
if (/\?(source|mode|s)=/.test(sitemap)) errors.push('sitemap contains a query parameter');
if (/search_term_string/.test(sitemap)) errors.push('sitemap contains a search template');
try {
  const { count } = validateSitemapFile();
  check('sitemap validates against the self-canonical inventory', errors.length === before5, `count=${count}`);
} catch (e) {
  errors.push(`sitemap validation failed: ${e.message}`);
  check('sitemap validates', false);
}

// ── Report ──────────────────────────────────────────────────────────────────
if (errors.length) {
  console.error(`SEO validation: FAIL (${errors.length})`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('SEO validation: PASS');
console.log(`  checks run: ${checks.length}`);
console.log('  no SearchAction / ?s= template');
console.log('  no parameterized (?source= / ?mode=) internal links');
console.log('  no removed-duplicate / old-domain / http / www internal links');
console.log('  static HTML pages self-canonical where indexed; privacy translations point EN → /privacy-policy');
console.log('  sitemap param-free and consistent with the self-canonical inventory');
