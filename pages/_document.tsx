import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'
import { SITE } from '../lib/content/rules'
import { OPERATOR_EMAIL, OPERATOR_PHONE } from '../lib/content/trust-data'

// <html lang> comes from the ROUTE, via the locale registry.
//
// This is a lookup, not detection: the value derives from the URL, never from a
// header, cookie or IP, so the rendered HTML for a URL is identical for every
// visitor and the page stays statically prerendered.
//
// data-locale-locked marks a page whose language is decided by its URL. The
// shared chrome script (public/script.js) initialises from localStorage on
// ordinary Czech routes — that is the visitor's own switcher choice — but on a
// locked page the URL is the authority, or a first-time visitor to /en/… would
// have the server's English chrome replaced with Czech the moment JS ran.
import { ALL_CONCEPTS, LOCALE_LANG, type Locale } from '../lib/locale/registry'

const localeByRoute: Record<string, Locale> = {}
for (const concept of ALL_CONCEPTS) {
  for (const locale of ['en', 'de'] as const) {
    const url = concept.urls[locale]
    // Declared, not necessarily published: an unpublished page does not exist,
    // so no route can resolve to it and the entry is harmless. Once published
    // the lang is already correct on the first render.
    if (url) localeByRoute[url] = locale
  }
}

const DOCUMENT_LANG: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(localeByRoute).map(([route, locale]) => [route, LOCALE_LANG[locale]]),
)
const LOCALE_LOCKED = new Set(Object.keys(localeByRoute))
const DEFAULT_LANG = 'cs'

// Site-wide structured data: a single canonical Organization identity plus a
// WebSite node. Kept consistent with the per-article publisher Organization so
// no conflicting Organization identities are created. Contact points derive from
// the verified operator record (trust-data.ts); publishingPrinciples points to
// the editorial-standards page. sameAs is emitted only when confirmed social
// profile URLs are configured in SITE.social (no fabricated profiles).
const organizationSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.brand,
  legalName: SITE.legalName,
  url: SITE.baseUrl,
  logo: { '@type': 'ImageObject', url: `${SITE.baseUrl}/favicon.svg` },
  description: SITE.positioning,
  email: OPERATOR_EMAIL,
  telephone: OPERATOR_PHONE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Na Spravedlnosti 1533',
    addressLocality: 'Pardubice',
    postalCode: '530 02',
    addressCountry: 'CZ',
  },
  publishingPrinciples: `${SITE.baseUrl}/redakcni-zasady`,
  ...(SITE.social.length ? { sameAs: SITE.social } : {}),
})

const websiteSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.brand,
  url: SITE.baseUrl,
  inLanguage: 'cs-CZ',
})

export default function Document({ lang = DEFAULT_LANG, localeLocked = false }: { lang?: string; localeLocked?: boolean }) {
  return (
    <Html lang={lang} data-locale-locked={localeLocked ? 'true' : undefined}>
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

// Resolved at prerender time from the route being built. Overriding
// getInitialProps on _document (unlike _app) does not opt pages out of static
// generation — scripts/validate-hreflang.mjs asserts the static route count so a
// regression here fails a gate rather than going unnoticed.
Document.getInitialProps = async (ctx: DocumentContext) => {
  const initial = await NextDocument.getInitialProps(ctx)
  return {
    ...initial,
    lang: DOCUMENT_LANG[ctx.pathname] ?? DEFAULT_LANG,
    localeLocked: LOCALE_LOCKED.has(ctx.pathname),
  }
}
