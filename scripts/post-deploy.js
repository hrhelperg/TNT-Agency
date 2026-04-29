// Runs after every deploy: updates sitemap, pings IndexNow, pings Bing.
const https = require('https');
const { updateSitemap } = require('./update-sitemap');
const { submitToIndexNow } = require('./indexnow');

function pingBing() {
  const sitemapUrl = encodeURIComponent('https://manpower-tnt.agency/sitemap.xml');
  return new Promise((resolve) => {
    const options = {
      hostname: 'www.bing.com',
      path: `/ping?sitemap=${sitemapUrl}`,
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      console.log(`Bing ping: HTTP ${res.statusCode}`);
      res.resume();
      resolve(res.statusCode);
    });

    req.on('error', (err) => {
      console.error(`Bing ping failed: ${err.message}`);
      resolve(null); // non-fatal
    });

    req.end();
  });
}

async function main() {
  console.log('=== Post-deploy indexing pipeline ===\n');

  console.log('[1/3] Updating sitemap...');
  const urls = updateSitemap();

  console.log('\n[2/3] Submitting URLs to IndexNow...');
  await submitToIndexNow(urls);

  console.log('\n[3/3] Pinging Bing sitemap index...');
  await pingBing();

  console.log('\n=== Done ===');
}

main().catch((err) => {
  console.error('Post-deploy pipeline error:', err.message);
  process.exit(1);
});
