/**
 * Which query parameters may appear in a URL this site serves.
 *
 * Why this exists
 * ───────────────
 * The payroll calculator used to base64 its entire PayrollInput — including
 * taxProfile.disability, taxProfile.ztpp and children[].ztpp, which are health
 * data under GDPR Art. 9 — into a `?d=` parameter for a "copy link" button.
 * Base64 is encoding, not encryption. And the payload did not stay in the URL:
 * WebmasterID's page_view transmits `url`, the full href, so merely OPENING a
 * shared link handed the blob to a third-party endpoint.
 *
 * Both halves are gone. This module neutralises what remains: links already
 * copied and shared, which still exist and still arrive.
 *
 * SCOPE — read this before adding a rule
 * ──────────────────────────────────────
 * This is an ALLOWLIST, not a content classifier. It answers one question:
 * "is this parameter one the application declares?" It does not inspect what a
 * value contains.
 *
 * An earlier iteration went much further — decoding base64/base32/hex out of
 * values, scoring segment lengths and digit runs, classifying fragments and
 * pathnames — in an attempt to stop someone from hand-encoding facts they
 * already possess into otherwise legitimate campaign strings. That threat is
 * explicitly OUT OF SCOPE: an attacker who already knows a fact gains nothing
 * by echoing it to our analytics vendor, and the machinery needed to chase it
 * cost real product behaviour (it stripped legitimate in-page anchors).
 *
 * So: no payload decoding, no pathname classification, no fragment
 * restrictions. Fragments and pathnames pass through untouched.
 * scripts/validate-share-privacy.mjs enforces that this stays true.
 */

/** Calculator views. Mirrors CalculationMode; literal to avoid a cycle. */
const MODES = ['agency', 'direct', 'comparison'] as const

/** CTA surfaces. Mirrors CTA_SOURCES in lib/attribution; literal for the same reason. */
const SOURCES = [
  'homepage-calculator', 'dedicated-calculator', 'agency-comparison', 'agency-value',
  'responsibility-matrix', 'employer-hub', 'service-page', 'direct',
] as const

/**
 * A sanity ceiling, not a security boundary. A real five-parameter campaign is
 * about 120 characters; this stops a pathological URL, nothing more.
 */
const MAX_VALUE_LENGTH = 200

export type ParamRule = {
  /** What this parameter carries, in one line. */
  readonly carries: string
  /** Deterministic check. A declared name with an unusable value is dropped. */
  readonly accepts: (value: string) => boolean
}

/**
 * The complete set of query parameters that may survive. Anything not listed
 * is dropped — that single rule is what neutralises a legacy `?d=` link.
 */
export const PERMITTED_PARAMS: Readonly<Record<string, ParamRule>> = {
  mode: {
    carries: 'which calculator view to open — one of three literals, never a value',
    accepts: (v) => (MODES as readonly string[]).includes(v),
  },
  source: {
    carries: 'legacy CTA surface hint — one of the eight declared surfaces',
    accepts: (v) => (SOURCES as readonly string[]).includes(v),
  },
  utm_source: { carries: 'inbound campaign attribution', accepts: (v) => v.length <= MAX_VALUE_LENGTH },
  utm_medium: { carries: 'inbound campaign attribution', accepts: (v) => v.length <= MAX_VALUE_LENGTH },
  utm_campaign: { carries: 'inbound campaign attribution', accepts: (v) => v.length <= MAX_VALUE_LENGTH },
  utm_content: { carries: 'inbound campaign attribution', accepts: (v) => v.length <= MAX_VALUE_LENGTH },
  utm_term: { carries: 'inbound campaign attribution', accepts: (v) => v.length <= MAX_VALUE_LENGTH },
}

export type SanitizedUrl = {
  /** pathname + surviving query + the original fragment. Never absolute. */
  readonly path: string
  /** Names of dropped query parameters. Names only — never their values. */
  readonly dropped: readonly string[]
  /** True when nothing needed dropping. */
  readonly clean: boolean
}

/**
 * Sanitize a pathname/search/hash triple.
 *
 * The pathname and the fragment are returned UNCHANGED, by design — see the
 * scope note above. Only the query is filtered.
 *
 * Idempotent: the output contains only declared, accepted parameters, so
 * re-running drops nothing further. Asserted in the test file.
 */
export function sanitizeParts(pathname: string, search: string, hash: string): SanitizedUrl {
  const dropped: string[] = []
  const raw = search.startsWith('?') ? search.slice(1) : search
  const kept = new URLSearchParams()

  if (raw) {
    new URLSearchParams(raw).forEach((value, key) => {
      const rule = Object.prototype.hasOwnProperty.call(PERMITTED_PARAMS, key)
        ? PERMITTED_PARAMS[key]
        : undefined
      if (!rule || !rule.accepts(value)) {
        if (dropped.indexOf(key) === -1) dropped.push(key)
        return
      }
      kept.append(key, value)
    })
  }

  const query = kept.toString()
  const fragment = hash && !hash.startsWith('#') ? `#${hash}` : hash

  return {
    path: `${pathname}${query ? `?${query}` : ''}${fragment}`,
    dropped,
    clean: dropped.length === 0,
  }
}

/** Sanitize any URL-ish string, preserving absolute/relative form. */
export function sanitizeUrlString(input: string, base = 'http://localhost'): string {
  let u: URL
  try {
    u = new URL(input, base)
  } catch {
    return input
  }
  const { path } = sanitizeParts(u.pathname, u.search, u.hash)
  const wasAbsolute = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(input)
  return wasAbsolute ? `${u.origin}${path}` : path
}

/** True when a URL-ish string already satisfies the policy. */
export const isPolicyClean = (input: string, base = 'http://localhost'): boolean => {
  try {
    const u = new URL(input, base)
    return sanitizeParts(u.pathname, u.search, u.hash).clean
  } catch {
    return false
  }
}
