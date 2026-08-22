import { ALL_CONCEPTS, LOCALE_LANG, alternatesFor, conceptForRoute, localeForRoute, type Locale } from '../../lib/locale/registry'
import { CHROME_ARIA, CHROME_NAV } from '../../lib/locale/chrome'

const LABEL: Record<string, string> = { cs: 'Čeština', en: 'English', de: 'Deutsch' }

/**
 * Header form of the same labels.
 *
 * Endonyms are the right label wherever there is room, and the mobile menu has
 * room. The header does not: on a Czech concept primary this switcher sits
 * beside the legacy EN/CS/DE widget and the primary action, and "Čeština
 * English Deutsch" costs 169px of a row already wider than its container.
 * Shortening the VISIBLE text to the same codes the neighbouring widget already
 * uses keeps both controls, changes no font size, and halves that cost. The
 * endonym remains the accessible name, so a screen reader still hears
 * "Deutsch", not "D E".
 */
const SHORT: Record<string, string> = { cs: 'CS', en: 'EN', de: 'DE' }

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
  // The header copy is the space-constrained one; the mobile copy keeps endonyms.
  const compact = className === 'locale-switcher--header'
  const text = (locale: string) => (compact ? SHORT[locale] : LABEL[locale])

  return (
    <nav className={className ? `locale-switcher ${className}` : 'locale-switcher'} aria-label={CHROME_NAV[uiLocale].language}>
      <ul>
        {alternates.map((a) => (
          <li key={a.locale}>
            {a.locale === current ? (
              <span aria-current="true" lang={LOCALE_LANG[a.locale]} title={compact ? LABEL[a.locale] : undefined}>
                {/* The current locale is a plain span, and `aria-label` is
                    ignored on a generic role — so the compact variant's endonym
                    was exposed to nobody: an AX-tree dump read
                    `role=generic name="English"` beside `role=link
                    name="Deutsch"`, and a generic with a name is not announced.
                    Visually-hidden real text is announced, because it is text. */}
                {compact ? (
                  <>
                    <span lang={LOCALE_LANG[a.locale]} aria-hidden="true">
                      {SHORT[a.locale]}
                    </span>
                    <span lang={LOCALE_LANG[a.locale]} className="sr-only">
                      {LABEL[a.locale]}
                    </span>
                  </>
                ) : (
                  text(a.locale)
                )}
              </span>
            ) : (
              <a
                href={a.url}
                {...{ hreflang: LOCALE_LANG[a.locale] }}
                lang={LOCALE_LANG[a.locale]}
                data-locale-choice={a.locale}
                {...(compact ? { 'aria-label': LABEL[a.locale], title: LABEL[a.locale] } : {})}
                onClick={() => {
                  try {
                    window.localStorage.setItem(LANG_STORAGE_KEY, a.locale)
                  } catch {
                    // Private mode or storage disabled. The navigation is what
                    // matters; remembering it is the enhancement.
                  }
                }}
              >
                {text(a.locale)}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
