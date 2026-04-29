// Updates all <lastmod> entries in sitemap.xml to today and returns the full URL list.
const fs = require('fs');
const path = require('path');

const SITEMAP_PATHS = [
  path.join(__dirname, '..', 'public', 'sitemap.xml'),
  path.join(__dirname, '..', 'sitemap.xml'),
];

function updateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  for (const sitemapPath of SITEMAP_PATHS) {
    if (!fs.existsSync(sitemapPath)) continue;
    let content = fs.readFileSync(sitemapPath, 'utf8');
    content = content.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
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
