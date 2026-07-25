// Focused, dependency-free Seznam Webmaster Tools verification-file gate
// (READ-ONLY). Fails loudly if the single ownership-verification asset for
// talentpartnerid.com is missing, malformed, duplicated, or leaks into the
// application/SEO surface. It never writes or mutates anything.
//
// Run with: `node scripts/verify-seznam.js`  (or `npm run verify:seznam`)
//
// The verification file is a public ownership token — intentionally reachable
// at the web root — NOT an SEO page and NOT application code. These checks
// encode exactly that contract.

const fs = require('fs');
const path = require('path');
const { buildRouteInventory, validateSitemapFile, CANONICAL_ORIGIN } = require('./validate-sitemap');

const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

// The one approved Seznam verification asset. Filename matching is
// case-sensitive; the file body must resolve to TOKEN after trimming at most a
// single conventional final newline.
const TOKEN = 'nIf3doTxFhoSwV6L7jtPP9VSbuYRwSw1';
const FILENAME = `seznam-wmt-${TOKEN}.txt`;
const PUBLIC_PATH = `/${FILENAME}`;

/** Recursively collect files matching `predicate(name)` under `dir`. */
function walk(dir, predicate, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, predicate, out);
    else if (predicate(entry.name)) out.push(full);
  }
  return out;
}

/**
 * Validate the Seznam verification asset and its isolation from the app/SEO
 * surface. Throws an Error listing every problem found. Returns a summary.
 */
function verifySeznam(root = ROOT) {
  const errors = [];
  const publicDir = path.join(root, 'public');
  const filePath = path.join(publicDir, FILENAME);

  // 1. The file exists in the actual public directory.
  const exists = fs.existsSync(filePath);
  if (!exists) errors.push(`Verification file missing at public/${FILENAME}`);

  // 2. The filename is exactly the required, case-sensitive name.
  if (exists) {
    const actualName = fs.readdirSync(publicDir).find((n) => n.toLowerCase() === FILENAME.toLowerCase());
    if (actualName && actualName !== FILENAME) {
      errors.push(`Filename case mismatch: found "${actualName}", expected "${FILENAME}"`);
    }
  }

  // 3./4. Content: trimmed body is exactly TOKEN, no BOM, no HTML, no stray
  //       whitespace, at most one conventional trailing newline.
  let raw = '';
  if (exists) {
    raw = fs.readFileSync(filePath, 'utf8');
    if (raw.charCodeAt(0) === 0xfeff) errors.push('BOM present at start of verification file');
    if (/[<>]/.test(raw)) errors.push('Verification file contains HTML markup (< or >)');
    if (/^\s/.test(raw)) errors.push('Verification file has leading whitespace');
    // Only a single conventional final newline is tolerated; nothing else.
    const body = raw.replace(/\n$/, '');
    if (/\s/.test(body)) errors.push('Verification token contains internal or trailing whitespace');
    if (body.trim() !== TOKEN) {
      errors.push(`Trimmed content "${body.trim()}" does not equal token "${TOKEN}"`);
    }
    if (raw !== TOKEN && raw !== `${TOKEN}\n`) {
      errors.push('File body is not exactly the token (optionally + one trailing newline)');
    }
  }

  // 5. Exactly one Seznam verification file exists (no duplicate anywhere under public/).
  const seznamFiles = walk(publicDir, (n) => /^seznam-wmt-.*\.txt$/i.test(n))
    .map((f) => path.relative(publicDir, f));
  if (seznamFiles.length !== 1) {
    errors.push(`Expected exactly one seznam-wmt-*.txt under public/, found ${seznamFiles.length}: ${seznamFiles.join(', ')}`);
  } else if (seznamFiles[0] !== FILENAME) {
    errors.push(`The sole Seznam file is at "${seznamFiles[0]}", expected it at public root "${FILENAME}"`);
  }

  // 6./9. No route or component implements this verification URL, and the token
  //       never leaks into application source (pages/components/lib). The asset
  //       must live only in public/ — never in the React tree or a route.
  const appDirs = ['pages', 'components', 'lib'];
  const appHits = [];
  for (const d of appDirs) {
    const dir = path.join(root, d);
    if (!fs.existsSync(dir)) continue;
    for (const f of walk(dir, (n) => /\.(tsx?|jsx?|json)$/.test(n))) {
      const src = fs.readFileSync(f, 'utf8');
      if (src.includes(TOKEN) || src.includes('seznam-wmt-')) {
        appHits.push(path.relative(root, f));
      }
    }
  }
  if (appHits.length) errors.push(`Verification token/filename leaked into application source: ${appHits.join(', ')}`);

  // A page route can never legitimately serve this path; a catch-all route
  // could shadow it. Assert neither a matching page file nor a catch-all exists.
  const pagesDir = path.join(root, 'pages');
  if (fs.existsSync(pagesDir)) {
    const routeFiles = walk(pagesDir, (n) => /\.(tsx?|jsx?)$/.test(n)).map((f) => path.relative(pagesDir, f));
    const shadowing = routeFiles.filter((r) => /^\[\.{3}/.test(path.basename(r)) || /seznam-wmt/i.test(r));
    if (shadowing.length) errors.push(`Route(s) could implement/shadow the verification URL: ${shadowing.join(', ')}`);
  }

  // 7. Sitemap route count is unaffected: a .txt asset is not part of the
  //    canonical inventory (Next pages + static public HTML), so the sitemap
  //    still validates and its count still equals the derived inventory.
  const inventory = buildRouteInventory(root);
  const verificationUrl = `${CANONICAL_ORIGIN}${PUBLIC_PATH}`;
  if (inventory.urls.has(verificationUrl)) {
    errors.push('Verification URL unexpectedly appears in the canonical route inventory');
  }
  let sitemapCount = null;
  try {
    sitemapCount = validateSitemapFile(path.join(publicDir, 'sitemap.xml')).count;
    if (sitemapCount !== inventory.urls.size) {
      errors.push(`Sitemap count ${sitemapCount} != canonical inventory ${inventory.urls.size}`);
    }
  } catch (err) {
    errors.push(`Sitemap validation failed: ${err.message}`);
  }

  // 8. The verification URL/token is absent from sitemap.xml.
  const sitemapXml = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');
  if (sitemapXml.includes(TOKEN) || sitemapXml.includes('seznam-wmt-')) {
    errors.push('Verification token/filename present in sitemap.xml (must be absent)');
  }

  if (errors.length) {
    throw new Error(`Seznam verification check failed (${errors.length}):\n - ${errors.join('\n - ')}`);
  }
  return { file: `public/${FILENAME}`, url: verificationUrl, bytes: Buffer.byteLength(raw), sitemapCount };
}

module.exports = { TOKEN, FILENAME, PUBLIC_PATH, verifySeznam };

// CLI: `node scripts/verify-seznam.js`
if (require.main === module) {
  try {
    const r = verifySeznam();
    console.log('Seznam verification check: PASS');
    console.log(`  file:            ${r.file} (${r.bytes} bytes)`);
    console.log(`  public URL:      ${r.url}`);
    console.log(`  token:           ${TOKEN}`);
    console.log(`  sitemap URLs:    ${r.sitemapCount} (unchanged; .txt is not an indexable route)`);
    console.log('  isolation:       not in sitemap, not in pages/components/lib, exactly one seznam file');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
