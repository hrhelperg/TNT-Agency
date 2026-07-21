import { defineConfig, devices } from '@playwright/test'

// Browser QA for the WebmasterID analytics integration.
//
// Runs against a real production build (next build && next start), not the dev
// server: consent gating, script injection and hydration all behave differently
// under React's development double-invocation, and the point of this suite is to
// assert what production visitors actually get.
//
// Unit/integration tests remain in vitest (lib/**/*.test.ts). This config only
// picks up tests/e2e, so the two runners never collide.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false, // the suite asserts on network traffic to one endpoint
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'off',
    // Never persist storage or payload artefacts between tests: each test opens
    // a clean context so a previous test's consent choice cannot leak into it.
    video: 'off',
    screenshot: 'off',
  },
  // Real Google Chrome, not Playwright's bundled Chromium.
  //
  // Both Playwright's bundled Chromium and Microsoft Edge refuse to fetch
  // https://webmasterid.com/tracker.iife.min.js at all, failing with
  // net::ERR_BLOCKED_BY_ORB. This was verified to be a client-side blocklist
  // entry against the webmasterid.com domain, not a fault in this integration:
  // a control cross-origin script from another CDN loads fine in the same
  // browser and page, the block persists with Edge tracking prevention
  // disabled and with a cache-busting query string, and the origin itself
  // serves a correct 200 application/javascript response. Real Chrome loads
  // the bundle and the ingest endpoint answers 202.
  //
  // Analytics blocked by a client is expected and handled (the site is fully
  // functional without it — see the "site works when analytics does not"
  // tests). It is deliberately NOT worked around: proxying the tracker through
  // this domain to evade blockers is out of the question.
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'mobile', use: { ...devices['Pixel 5'], channel: 'chrome' } },
  ],
  webServer: {
    command: 'npm run start -- --port 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
})
