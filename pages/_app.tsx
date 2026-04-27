import type { AppProps } from 'next/app'
import Script from 'next/script'
import CookieBanner from '../components/CookieBanner'
import '../styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <CookieBanner />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  )
}
