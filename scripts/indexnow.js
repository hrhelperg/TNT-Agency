// Sends a batch of URLs to IndexNow (Bing/Yandex/etc.)
const https = require('https');

const HOST = 'manpower-tnt.agency';
const KEY = '782b9d75b2104f97a302868b55930222';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function submitToIndexNow(urlList) {
  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
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
    req.write(body);
    req.end();
  });
}

module.exports = { submitToIndexNow };
