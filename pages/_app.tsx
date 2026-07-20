import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import CookieBanner from '../components/CookieBanner'
import EcosystemBanner from '../components/ecosystem/EcosystemBanner'
import '../styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
      <CookieBanner />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  )
}
