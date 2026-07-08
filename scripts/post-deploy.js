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

    // As the final pipeline step, a stalled Bing connection would otherwise
    // hang the job until the 6-hour timeout. Time out and continue (non-fatal).
    req.setTimeout(10000, () => {
      req.destroy();
      console.error('Bing ping timed out — skipping (non-fatal)');
      resolve(null);
    });

    req.end();
  });
}

// Submits URLs to IndexNow. IndexNow is best-effort: a missing key or an
// IndexNow API error must NOT fail the deploy pipeline. This function never
// throws — it logs and continues so the workflow can complete successfully.
async function submitIndexNowStep(urls) {
  if (!process.env.INDEXNOW_KEY) {
    console.warn('IndexNow: INDEXNOW_KEY not set — skipping IndexNow submission (non-fatal).');
    return { skipped: true, reason: 'missing-key' };
  }

  try {
    return await submitToIndexNow(urls);
  } catch (err) {
    console.error(`IndexNow submission failed (non-fatal): ${err.message}`);
    return { error: err.message };
  }
}

async function main() {
  console.log('=== Post-deploy indexing pipeline ===\n');

  console.log('[1/3] Updating sitemap...');
  const urls = updateSitemap();

  console.log('\n[2/3] Submitting URLs to IndexNow...');
  await submitIndexNowStep(urls);

  console.log('\n[3/3] Pinging Bing sitemap index...');
  await pingBing();

  console.log('\n=== Done ===');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Post-deploy pipeline error:', err.message);
    process.exit(1);
  });
}

module.exports = { main, submitIndexNowStep, pingBing };
