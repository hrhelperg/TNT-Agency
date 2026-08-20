import { LOCALE_HREFLANG, X_DEFAULT_ROUTE, alternatesFor } from '../../lib/locale/registry'

const ORIGIN = 'https://talentpartnerid.com'

/**
 * Reciprocal hreflang for one route.
 *
 * Emitted by BOTH the Czech page and its localized counterparts, from the same
 * registry lookup, so the cluster cannot be one-directional. A cluster where the
 * English page points at Czech but Czech does not point back is ambiguous and
 * may simply be ignored.
 *
 * Only PUBLISHED locales appear, so a cluster never advertises a page that does
 * not exist. A collapsed Czech variant resolves to no alternates and therefore
 * renders nothing — those pages are Czech-only by design, and pointing several
 * of them at one English page would be a many-to-one mapping, which is
 * ambiguous and may be disregarded.
 *
 * The attribute is written lowercase to match the convention already used by
 * the static legal pages. HTML attribute names are case-insensitive, so
 * `hrefLang` would parse identically, but consistency costs nothing and some
 * tooling compares literally.
 */
export default function LocaleAlternates({ route }: { route: string }) {
  const alternates = alternatesFor(route)
  if (alternates.length < 2) return null
  return (
    <>
      {alternates.map((a) => (
        <link key={a.locale} rel="alternate" {...{ hreflang: LOCALE_HREFLANG[a.locale] }} href={`${ORIGIN}${a.url}`} />
      ))}
      <link rel="alternate" {...{ hreflang: 'x-default' }} href={`${ORIGIN}${X_DEFAULT_ROUTE}`} />
    </>
  )
}
