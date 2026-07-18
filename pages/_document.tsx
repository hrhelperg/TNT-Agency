import { Html, Head, Main, NextScript } from 'next/document'
import { SITE } from '../lib/content/rules'

// Site-wide structured data: a single canonical Organization identity plus a
// WebSite node. Kept consistent with the per-article publisher Organization so
// no conflicting Organization identities are created. sameAs is emitted only
// when confirmed social profile URLs are configured in SITE.social.
const organizationSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.brand,
  legalName: SITE.legalName,
  url: SITE.baseUrl,
  logo: { '@type': 'ImageObject', url: `${SITE.baseUrl}/favicon.svg` },
  description: SITE.positioning,
  ...(SITE.social.length ? { sameAs: SITE.social } : {}),
})

const websiteSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.brand,
  url: SITE.baseUrl,
  inLanguage: 'cs-CZ',
})

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{'ad_storage':'denied','analytics_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});` }} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationSchema }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteSchema }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
