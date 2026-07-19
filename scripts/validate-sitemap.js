// Dedicated, dependency-free sitemap validator (READ-ONLY).
//
// Fails loudly on any hygiene violation so a bad sitemap can never ship. Used
// both as a CLI gate (`node scripts/validate-sitemap.js`) and by the reader in
// update-sitemap.js / the regression tests. It never writes or mutates anything.
//
// The canonical URL inventory is derived from the filesystem (Next page routes
// + intentional static public HTML routes) — never hardcoded — so the check
// stays honest if routes are added or removed.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITEMAP_PATH = path.join(ROOT, 'public', 'sitemap.xml');
const CANONICAL_ORIGIN = 'https://talentpartnerid.com';
const CANONICAL_HOST = 'talentpartnerid.com';
const OFFICIAL_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const OLD_DOMAIN_RE = /manpower-tnt\.agency|manpowertnt\.agency|tntgency\.org/i;
const FORBIDDEN_ELEMENTS = ['lastmod', 'changefreq', 'priority', 'xhtml:link'];

/** Recursively collect files with a given extension under `dir`. */
function walk(dir, ext, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, ext, out);
    else if (entry.name.endsWith(ext)) out.push(full);
  }
  return out;
}

/**
 * Build the canonical, indexable URL inventory from the filesystem:
 *   - Next page routes: pages/*.tsx (excluding framework files + any /api),
 *     with `index` mapping to `/`.
 *   - Intentional static public HTML routes: public/**‍/*.html.
 * Returns { urls:Set, nextRoutes:string[], staticRoutes:string[] }.
 */
function buildRouteInventory(root = ROOT) {
  const pagesDir = path.join(root, 'pages');
  const nextRoutes = fs
    .readdirSync(pagesDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.tsx'))
    .map((e) => e.name.replace(/\.tsx$/, ''))
    .filter((n) => !['_app', '_document', '_error'].includes(n))
    .map((n) => (n === 'index' ? '/' : `/${n}`));

  const publicDir = path.join(root, 'public');
  const staticRoutes = walk(publicDir, '.html').map(
    (f) => '/' + path.relative(publicDir, f).split(path.sep).join('/'),
  );

  const paths = [...nextRoutes, ...staticRoutes];
  const urls = new Set(paths.map((p) => `${CANONICAL_ORIGIN}${p}`));
  return { urls, nextRoutes, staticRoutes };
}

/**
 * Validate sitemap XML text. Throws an Error listing every problem found.
 * Returns { urls:string[], count:number } on success.
 */
function validateSitemapXml(xml, { inventory = buildRouteInventory() } = {}) {
  const errors = [];

  // 1. No BOM / leading whitespace; exactly one XML declaration at byte 0.
  if (xml.charCodeAt(0) === 0xfeff) errors.push('BOM present before XML declaration');
  if (!xml.startsWith('<?xml')) errors.push('Does not start with the XML declaration');
  const declCount = (xml.match(/<\?xml/g) || []).length;
  if (declCount !== 1) errors.push(`Expected exactly one XML declaration, found ${declCount}`);

  // 2. Exactly one <urlset> using the official namespace and no leftover xhtml ns.
  const urlsetOpen = xml.match(/<urlset\b[^>]*>/g) || [];
  if (urlsetOpen.length !== 1) errors.push(`Expected exactly one <urlset>, found ${urlsetOpen.length}`);
  if ((xml.match(/<\/urlset>/g) || []).length !== 1) errors.push('Expected exactly one </urlset>');
  if (urlsetOpen[0] && !urlsetOpen[0].includes(`xmlns="${OFFICIAL_NS}"`)) {
    errors.push(`<urlset> missing official namespace xmlns="${OFFICIAL_NS}"`);
  }

  // 3. No forbidden metadata / extension elements anywhere.
  for (const el of FORBIDDEN_ELEMENTS) {
    if (new RegExp(`<${el.replace(':', '\\:')}\\b`).test(xml)) {
      errors.push(`Unexpected <${el}> element present (must be removed)`);
    }
  }
  if (/xmlns:xhtml=/.test(xml)) errors.push('Unused xmlns:xhtml declaration present (must be removed)');

  // 4. Each <url> block: exactly one <loc>, and no forbidden children.
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) || [];
  if (urlBlocks.length === 0) errors.push('No <url> entries found');
  const locs = [];
  urlBlocks.forEach((block, i) => {
    const blockLocs = block.match(/<loc>([^<]+)<\/loc>/g) || [];
    if (blockLocs.length !== 1) {
      errors.push(`<url> #${i + 1} has ${blockLocs.length} <loc> elements (expected exactly 1)`);
    }
    const m = block.match(/<loc>([^<]+)<\/loc>/);
    if (m) locs.push(m[1]);
  });

  // A well-formedness sanity check: the count of <url> equals </url> equals <loc>.
  const openUrl = (xml.match(/<url>/g) || []).length;
  const closeUrl = (xml.match(/<\/url>/g) || []).length;
  const locCount = (xml.match(/<loc>/g) || []).length;
  if (!(openUrl === closeUrl && openUrl === locCount)) {
    errors.push(`Malformed structure: <url>=${openUrl} </url>=${closeUrl} <loc>=${locCount} must be equal`);
  }

  // 5. Per-URL hygiene.
  const seen = new Set();
  for (const loc of locs) {
    if (seen.has(loc)) errors.push(`Duplicate URL: ${loc}`);
    seen.add(loc);

    if (OLD_DOMAIN_RE.test(loc)) errors.push(`Old-domain URL: ${loc}`);
    if (/localhost|127\.0\.0\.1/.test(loc)) errors.push(`localhost URL: ${loc}`);
    if (/\.netlify\.app/.test(loc)) errors.push(`Netlify preview URL: ${loc}`);

    let u;
    try {
      u = new URL(loc);
    } catch {
      errors.push(`Malformed URL value: ${loc}`);
      continue;
    }
    if (u.protocol !== 'https:') errors.push(`Non-HTTPS URL: ${loc}`);
    if (u.hostname !== CANONICAL_HOST) errors.push(`Host is not ${CANONICAL_HOST}: ${loc}`);
    if (u.hostname.startsWith('www.')) errors.push(`www URL: ${loc}`);
    if (u.search) errors.push(`URL contains a query string: ${loc}`);
    if (u.hash) errors.push(`URL contains a fragment: ${loc}`);
    if (/\/api\//.test(u.pathname)) errors.push(`API route in sitemap: ${loc}`);
  }

  // 6. Membership: sitemap URL set must equal the canonical route inventory.
  const sitemapSet = new Set(locs);
  const inSitemapNotInventory = [...sitemapSet].filter((u) => !inventory.urls.has(u));
  const inInventoryNotSitemap = [...inventory.urls].filter((u) => !sitemapSet.has(u));
  if (inSitemapNotInventory.length) {
    errors.push(`Sitemap URLs not in canonical inventory (stale): ${inSitemapNotInventory.join(', ')}`);
  }
  if (inInventoryNotSitemap.length) {
    errors.push(`Canonical routes missing from sitemap: ${inInventoryNotSitemap.join(', ')}`);
  }

  if (errors.length) {
    throw new Error(`Sitemap validation failed (${errors.length}):\n - ${errors.join('\n - ')}`);
  }
  return { urls: locs, count: locs.length };
}

/** Validate the on-disk public/sitemap.xml. Throws on any problem. */
function validateSitemapFile(sitemapPath = SITEMAP_PATH) {
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`Authoritative sitemap not found at ${sitemapPath}`);
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  return validateSitemapXml(xml);
}

module.exports = {
  SITEMAP_PATH,
  CANONICAL_ORIGIN,
  buildRouteInventory,
  validateSitemapXml,
  validateSitemapFile,
};

// CLI: `node scripts/validate-sitemap.js` — the dedicated sitemap-validation gate.
if (require.main === module) {
  try {
    const inv = buildRouteInventory();
    const { urls, count } = validateSitemapFile();
    console.log('Sitemap validation: PASS');
    console.log(`  total URLs:            ${count}`);
    console.log(`  unique URLs:           ${new Set(urls).size}`);
    console.log(`  canonical inventory:   ${inv.urls.size} (${inv.nextRoutes.length} Next routes + ${inv.staticRoutes.length} static public HTML)`);
    console.log(`  route-inventory diff:  0`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
