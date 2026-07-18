import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import CookieBanner from '../components/CookieBanner'
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
      <Component {...pageProps} />
      <CookieBanner />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  )
}
