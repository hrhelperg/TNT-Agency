import { ALL_CONCEPTS, LOCALE_LANG, alternatesFor, conceptForRoute, localeForRoute } from '../../lib/locale/registry'

const LABEL: Record<string, string> = { cs: 'Čeština', en: 'English', de: 'Deutsch' }

/**
 * Page-to-page language switcher, resolved through the registry.
 *
 * If an equivalent page exists in a locale, it links there. If it does not, that
 * locale is simply NOT OFFERED — there is no fallback to /en/ or /de/. Sending
 * someone to a locale homepage in place of the page they asked for looks like a
 * translation and is not one, and it silently loses their place.
 *
 * A collapsed Czech variant returns no alternates at all, so the switcher
 * correctly shows nothing there: those pages are Czech-only by design.
 */
export default function LanguageSwitcher({ route }: { route: string }) {
  const alternates = alternatesFor(route)
  if (alternates.length < 2) return null
  const current = localeForRoute(route)

  return (
    <nav className="locale-switcher" aria-label="Language">
      <ul>
        {alternates.map((a) => (
          <li key={a.locale}>
            {a.locale === current ? (
              <span aria-current="true" lang={LOCALE_LANG[a.locale]}>{LABEL[a.locale]}</span>
            ) : (
              <a href={a.url} hrefLang={LOCALE_LANG[a.locale]} lang={LOCALE_LANG[a.locale]}>
                {LABEL[a.locale]}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
