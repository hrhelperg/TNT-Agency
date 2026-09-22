import LanguageSwitcher from './LanguageSwitcher'
import { ALL_CONCEPTS, urlFor } from '../../lib/locale/registry'
import { LOCALE_PREFIX } from '../../lib/locale/locales'
import { CHROME_ARIA, type CandidateLocale } from '../../lib/locale/chrome'
import {
  CANDIDATE_CTA,
  CANDIDATE_NAV,
  CANDIDATE_NAV_TARGETS,
} from '../../lib/locale/candidate-chrome'

/**
 * Header for the candidate locales.
 *
 * Separate from Header, not a variant of it. The employer header's slots are
 * the employer product — agencies, offers, payroll calculators, "request
 * workers" — and resolveNavHref answers with the CZECH url for anything a
 * locale does not publish. Reusing it would have put "Agências → /agencies" on
 * a Brazilian candidate page: Czech chrome leakage and an employer destination
 * off a candidate CTA, in one link.
 *
 * Here a target that does not resolve in this locale simply does not render.
 * There is no Czech fallback because there is no Czech equivalent to fall back
 * to — these concepts are locale-native by design.
 */
export default function CandidateHeader({
  locale,
  route,
  activeConceptId,
}: {
  locale: CandidateLocale
  /**
   * The page's own URL, passed in rather than read from `location`.
   *
   * The switcher resolves alternates from the route. Reading it from the
   * browser would yield nothing during server rendering, so the switcher would
   * be absent from the initial HTML, reappear on hydration, and be missing
   * entirely with JavaScript unavailable — three defects for one convenience.
   */
  route: string
  activeConceptId?: string
}) {
  const t = CANDIDATE_NAV[locale]
  const aria = CHROME_ARIA[locale]
  const home = LOCALE_PREFIX[locale]

  const link = (conceptId: string, label: string) => {
    const concept = ALL_CONCEPTS.find((c) => c.id === conceptId)
    // Unpublished in this locale → not rendered. Never a Czech fallback.
    if (!concept || !concept.published.includes(locale)) return null
    const href = urlFor(concept, locale)
    if (!href) return null
    return (
      <li key={conceptId}>
        <a href={href} aria-current={activeConceptId === conceptId ? 'page' : undefined}>
          {label}
        </a>
      </li>
    )
  }

  const cta = (() => {
    const concept = ALL_CONCEPTS.find((c) => c.id === CANDIDATE_CTA.conceptId)
    if (!concept || !concept.published.includes(locale)) return null
    const href = urlFor(concept, locale)
    if (!href) return null
    return (
      <a className="btn btn-primary header__cta" href={href}>
        {t.apply}
      </a>
    )
  })()

  return (
    <header className="header" id="header" data-candidate-chrome="true">
      <div className="container header__inner">
        <a href={home} className="logo" aria-label="TalentPartnerID">
          TalentPartnerID
        </a>

        <nav className="header__nav" aria-label={aria.mainNav}>
          <ul>{CANDIDATE_NAV_TARGETS.map((target) => link(target.conceptId, t[target.key]))}</ul>
        </nav>

        <div className="header__actions">
          {cta}
          <LanguageSwitcher route={route} className="locale-switcher--header" />
        </div>
      </div>

      {/*
        There is deliberately no second, "mobile" navigation here.

        The first attempt was a CSS-only checkbox disclosure. It shipped with no
        CSS at all, so the raw 13x13 checkbox painted at the viewport edge, the
        label rendered as literal body text, and the menu could never open —
        only public/script.js adds the `.open` class, and it does so from a
        `.hamburger` handler this header does not render. Worse, it repeated the
        defect recorded in docs/followup-accent-contrast.md: seven links at
        opacity 0 with visibility:visible, still focusable and still exposed to
        the accessibility tree, so a keyboard user crossed seven invisible stops
        before reaching anything real.

        The nav above wraps and renders every destination at every width, so a
        disclosure buys nothing here. Not shipping one is the fix.
      */}
    </header>
  )
}

