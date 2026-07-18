// Updates all <lastmod> entries in sitemap.xml to today and returns the full URL list.
const fs = require('fs');
const path = require('path');

const SITEMAP_PATHS = [
  path.join(__dirname, '..', 'public', 'sitemap.xml'),
  path.join(__dirname, '..', 'sitemap.xml'),
];
const CANONICAL_ORIGIN = 'https://talentpartnerid.com';
// Any legacy host (old canonical with/without hyphen, tntgency.org, any www or
// http/https variant) is normalized to the new canonical origin, so old domains
// are only ever redirect sources — never sitemap or canonical destinations.
const LEGACY_ORIGIN_RE = /https?:\/\/(?:www\.)?(?:manpower-tnt\.agency|manpowertnt\.agency|tntgency\.org)/g;

function updateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  for (const sitemapPath of SITEMAP_PATHS) {
    if (!fs.existsSync(sitemapPath)) continue;
    let content = fs.readFileSync(sitemapPath, 'utf8');
    content = content.replace(LEGACY_ORIGIN_RE, CANONICAL_ORIGIN);
    content = content.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

    const locs = [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    const invalidUrls = locs.filter((url) => !url.startsWith(`${CANONICAL_ORIGIN}/`));
    if (invalidUrls.length) {
      throw new Error(`Sitemap contains URLs outside ${CANONICAL_ORIGIN}: ${invalidUrls.join(', ')}`);
    }

    fs.writeFileSync(sitemapPath, content, 'utf8');
    console.log(`Sitemap updated: ${sitemapPath} → <lastmod>${today}</lastmod>`);
  }

  // Extract URLs from the canonical public sitemap
  const canonicalPath = SITEMAP_PATHS[0];
  const content = fs.readFileSync(canonicalPath, 'utf8');
  const urls = [];
  const urlRegex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }

  console.log(`Extracted ${urls.length} URLs from sitemap`);
  return urls;
}

module.exports = { updateSitemap };
