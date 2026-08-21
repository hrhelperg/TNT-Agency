/**
 * The locale a route IS, as opposed to the language a visitor last picked.
 *
 * Two different questions were being answered by one function. `useLang()` in
 * lib/i18n/react answers "what language has this visitor chosen?", which starts
 * at the Czech default and only becomes true after mount — correct for the
 * Czech spine, where the served text is already right and the toggle is an
 * enhancement. On an /en or /de page it is the wrong question entirely: the
 * language is a property of the URL, fixed before any script runs, and asking
 * the client produced Czech markup on an English page until hydration replaced
 * it. That flash is what this module exists to remove.
 *
 * Derived from the path prefix rather than the registry on purpose. Any page
 * under /en is English by construction, including one added tomorrow that no
 * registry entry has caught up with yet; a registry lookup would answer
 * "unknown" and fall back to Czech, which is the failure being fixed.
 */
import { useRouter } from 'next/router'
import type { Locale } from './registry'

export type LockedLocale = Exclude<Locale, 'cs'>

const LOCKED: readonly LockedLocale[] = ['en', 'de']

/** The locale a pathname belongs to, or null for the unprefixed Czech spine. */
export function localeFromPathname(pathname: string | null | undefined): LockedLocale | null {
  if (!pathname) return null
  for (const locale of LOCKED) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale
  }
  return null
}

/**
 * The current route's locale, or null on the Czech spine.
 *
 * `router.pathname` is the route itself and is identical on the server and on
 * the first client render, so a component switching on it produces no hydration
 * mismatch and — unlike a useEffect — nothing to repaint.
 */
export function useRouteLocale(): LockedLocale | null {
  const router = useRouter()
  return localeFromPathname(router?.pathname)
}
