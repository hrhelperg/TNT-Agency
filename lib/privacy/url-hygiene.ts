/**
 * Removal-only URL hygiene.
 *
 * Why this exists
 * ───────────────
 * The payroll calculator used to serialise its entire input — including
 * `taxProfile.disability`, `taxProfile.ztpp` and `children[].ztpp`, which are
 * health data under GDPR Art. 9 — into a base64 `?d=` parameter for a "copy
 * link" button. Base64 is encoding, not encryption: anyone who sees the URL can
 * read it.
 *
 * Removing the producer and the consumer was necessary but NOT sufficient.
 * Links already copied and shared still exist, and WebmasterID's page_view
 * transmits `url` — the full href — to a third-party ingest endpoint. Opening
 * one legacy link therefore still handed the payload to that endpoint. This was
 * measured against the real build with the request intercepted, not assumed:
 * the intercepted body contained `"disability":"third"` and `"ztpp":true`.
 *
 * So the surviving links have to be neutralised at the moment they are opened.
 *
 * The rule
 * ────────
 * A query parameter survives only if it is declared below. Everything else is
 * stripped. This is an allowlist rather than a `d`-shaped denylist on purpose:
 * the defect class is "an undeclared parameter reaches a transmitted URL", and
 * naming only the one parameter we already know about would leave the next one
 * unhandled.
 *
 * Ordering is load-bearing
 * ────────────────────────
 * The scrub must complete before the tracker bundle reads `location.href`, for
 * two reasons. The obvious one: otherwise the payload is already sent. The
 * subtle one: the official tracker patches `history.pushState/replaceState` to
 * emit a page_view per URL change, so scrubbing *after* it loads would both leak
 * the dirty URL and emit a spurious second event. Mounting `<UrlHygiene />` as
 * the first child of _app puts its effect ahead of the tracker's, which only
 * *begins* injection after a consent state update and re-render.
 *
 * This module is the single exception to the repo-wide ban on history writes
 * (lib/analytics/webmasterid.test.ts). The ban exists to stop values being
 * written INTO the URL; this only ever takes them out, which is asserted as a
 * property in ./url-hygiene.test.ts rather than assumed from the name.
 */

/**
 * Query parameters that may appear in a URL this site serves.
 *
 * Single source of truth: scripts/validate-share-privacy.mjs imports this, so a
 * parameter cannot be permitted in the app without also being declared to the
 * gate.
 */
export const PERMITTED_PARAMS: Readonly<Record<string, string>> = {
  mode: 'which calculator view to open — a view name, never a value',
  source: 'legacy CTA surface hint — a surface name, never a value',
  utm_source: 'inbound campaign attribution',
  utm_medium: 'inbound campaign attribution',
  utm_campaign: 'inbound campaign attribution',
  utm_content: 'inbound campaign attribution',
  utm_term: 'inbound campaign attribution',
}

export type ScrubResult = {
  /** The query string to keep, including a leading `?`, or '' when empty. */
  search: string
  /** Names of the parameters removed. Names only — never their values. */
  removed: string[]
}

/**
 * Pure. Returns the permitted subset of `search`, in its original order.
 *
 * Guarantees, all asserted in the test file:
 *  - the output parameter set is a SUBSET of the input's; nothing is ever added
 *  - a permitted parameter keeps its exact value
 *  - `removed` carries names only, so a scrub can never log a leaked value
 */
export function scrubSearch(search: string): ScrubResult {
  if (!search || search === '?') return { search: '', removed: [] }

  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const kept = new URLSearchParams()
  const removed: string[] = []

  // forEach rather than for…of: this file is compiled at the project's existing
  // TS target, which does not down-level iterator protocols.
  params.forEach((value, key) => {
    if (Object.prototype.hasOwnProperty.call(PERMITTED_PARAMS, key)) kept.append(key, value)
    else if (removed.indexOf(key) === -1) removed.push(key)
  })

  const next = kept.toString()
  return { search: next ? `?${next}` : '', removed }
}

/**
 * Applies the scrub to the current document, if anything needs removing.
 *
 * Returns the removed parameter names so a caller can assert on them. Does
 * nothing — and in particular calls no history method — when the URL is already
 * clean, so an ordinary page load performs no history write at all.
 */
export function scrubCurrentUrl(win: Window = window): string[] {
  const { search, removed } = scrubSearch(win.location.search)
  if (!removed.length) return []
  win.history.replaceState(win.history.state, '', `${win.location.pathname}${search}${win.location.hash}`)
  return removed
}
