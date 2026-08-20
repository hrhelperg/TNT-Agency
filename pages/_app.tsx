import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import CookieBanner from '../components/CookieBanner'
import EcosystemBanner from '../components/ecosystem/EcosystemBanner'
import WebmasterIDTracker from '../components/analytics/WebmasterIDTracker'
import CtaSourceCapture from '../components/CtaSourceCapture'
import UrlHygiene from '../components/privacy/UrlHygiene'
import '../styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* The URL guard is installed at module scope by this import, not by the
          component — see components/privacy/UrlHygiene.tsx. It stays mounted
          first as a defensive re-assertion, but correctness no longer depends
          on sibling effect ordering, which measurably lost a race against
          Next's own router.replace. See lib/privacy/url-guard.ts. */}
      <UrlHygiene />
      <Head>
        {/* Rendering directive (not SEO metadata): viewport-fit=cover lets the
            env(safe-area-inset-*) padding on the mobile menu / cookie banner /
            container actually resolve on notched iPhones. */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      {/* Global ecosystem banner. Mounted in the highest shared layout so it
          renders above the site header on every route, current and future,
          without being added page by page. */}
      <EcosystemBanner />
      <Component {...pageProps} />
      {/* Captures the clicked CTA's surface hint into session state so
          conversion links can stay clean (/poptavka-pracovniku, no ?source=). */}
      <CtaSourceCapture />
      <CookieBanner />
      {/* Site analytics (WebmasterID). Mounted here — the highest shared layer —
          so it covers every current and future public route exactly once. It
          renders nothing until analytics consent is granted. */}
      <WebmasterIDTracker />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  )
}
