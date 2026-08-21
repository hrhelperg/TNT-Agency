import { ALL_CONCEPTS, LOCALE_LANG, alternatesFor, conceptForRoute, localeForRoute, type Locale } from '../../lib/locale/registry'
import { CHROME_ARIA, CHROME_NAV } from '../../lib/locale/chrome'

const LABEL: Record<string, string> = { cs: 'Čeština', en: 'English', de: 'Deutsch' }

/** Storage key the client dictionary in public/script.js reads on unlocked pages. */
export const LANG_STORAGE_KEY = 'tnt-lang'

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
 *
 * The hreflang attribute is written lowercase, matching LocaleAlternates and
 * the static legal pages. HTML parses either form identically, but tooling that
 * compares literally should see one convention rather than two.
 *
 * PREFERENCE. Clicking here is an explicit choice and is remembered; arriving at
 * /en/... by link or search is not, and writes nothing. That distinction is the
 * whole point: a visitor who lands on one English page has not asked for the
 * Czech site to become English. Without it, choosing "Čeština" from an English
 * page delivered the Czech URL still wearing English chrome, because the stored
 * preference from an earlier visit was never updated to match the choice just
 * made. The write happens on click and navigation proceeds normally, so the
 * link keeps working with JavaScript unavailable — the destination is correct
 * either way, only the memory of the choice depends on script.
 */
export default function LanguageSwitcher({ route, className }: { route: string; className?: string }) {
  const alternates = alternatesFor(route)
  if (alternates.length < 2) return null
  const current = localeForRoute(route)
  const uiLocale: Locale = current ?? 'cs'

  return (
    <nav className={className ? `locale-switcher ${className}` : 'locale-switcher'} aria-label={CHROME_NAV[uiLocale].language}>
      <ul>
        {alternates.map((a) => (
          <li key={a.locale}>
            {a.locale === current ? (
              <span aria-current="true" lang={LOCALE_LANG[a.locale]}>{LABEL[a.locale]}</span>
            ) : (
              <a
                href={a.url}
                {...{ hreflang: LOCALE_LANG[a.locale] }}
                lang={LOCALE_LANG[a.locale]}
                data-locale-choice={a.locale}
                onClick={() => {
                  try {
                    window.localStorage.setItem(LANG_STORAGE_KEY, a.locale)
                  } catch {
                    // Private mode or storage disabled. The navigation is what
                    // matters; remembering it is the enhancement.
                  }
                }}
              >
                {LABEL[a.locale]}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
