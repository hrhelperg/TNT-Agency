// Reads the authoritative sitemap (public/sitemap.xml) and returns its canonical
// URL list for IndexNow. It is READ-ONLY: it does not stamp dates, normalize
// hostnames, rewrite XML, or add metadata. Invalid content (wrong host, old
// domain, duplicates, non-HTTPS, unexpected metadata, or a mismatch with the
// canonical route inventory) fails validation loudly instead of being silently
// "corrected".
//
// The sitemap is a single, hand-curated source of truth (public/sitemap.xml);
// there is no second copy. See scripts/validate-sitemap.js for the checks.

const { validateSitemapFile } = require('./validate-sitemap');

/**
 * Return the validated list of canonical URLs from public/sitemap.xml.
 * Throws if the sitemap is missing or fails any hygiene check.
 */
function getSitemapUrls() {
  const { urls, count } = validateSitemapFile();
  console.log(`Sitemap validated: ${count} canonical URLs`);
  return urls;
}

module.exports = { getSitemapUrls };
