import type { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  )
}
