// Sends a batch of URLs to IndexNow (Bing/Yandex/etc.)
const https = require('https');

const HOST = 'manpower-tnt.agency';

// The IndexNow key is NEVER hard-coded. It is read from the environment so the
// same value can be managed in Netlify env vars and GitHub Secrets. The value
// MUST match the committed public key file (public/<INDEXNOW_KEY>.txt), which is
// what IndexNow fetches from keyLocation to verify ownership.
function submitToIndexNow(urlList) {
  // .trim() guards against a stray trailing newline/space in the env var or
  // GitHub Secret, which would otherwise corrupt keyLocation and cause a 403.
  const key = (process.env.INDEXNOW_KEY || '').trim();

  if (!key) {
    console.warn('IndexNow: INDEXNOW_KEY is not set — skipping IndexNow submission.');
    return Promise.resolve({ skipped: true, reason: 'missing-key' });
  }

  if (!Array.isArray(urlList) || urlList.length === 0) {
    console.warn('IndexNow: no URLs to submit — skipping IndexNow submission.');
    return Promise.resolve({ skipped: true, reason: 'no-urls' });
  }

  const keyLocation = `https://${HOST}/${key}.txt`;
  const body = JSON.stringify({
    host: HOST,
    key,
    keyLocation,
    urlList,
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.indexnow.org',
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log(`IndexNow: success (HTTP ${res.statusCode})`);
          resolve({ status: res.statusCode, body: data });
        } else {
          console.error(`IndexNow: failed (HTTP ${res.statusCode}): ${data}`);
          reject(new Error(`IndexNow HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    // Guard against a stalled endpoint (connection accepted, no response):
    // without this the Promise never settles and the CI job would hang until
    // the 6-hour job timeout. Destroying rejects -> caller treats non-fatal.
    req.setTimeout(10000, () => {
      req.destroy(new Error('IndexNow request timed out after 10s'));
    });
    req.write(body);
    req.end();
  });
}

module.exports = { submitToIndexNow };
