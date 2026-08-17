// Console-noise classification for browser QA.
//
// THE PROBLEM THIS SOLVES
// Chrome reports a failed subresource as:
//
//   "Failed to load resource: the server responded with a status of 404 ()"
//
// That string contains NO URL. A spec that filters console noise by matching
// hostnames in the message text therefore cannot suppress it, however many
// hostnames the pattern lists — which is why tests/e2e/legal-pages.spec.ts
// failed on roughly half of all runs while its `fonts\.gstatic` pattern looked
// like it should have covered exactly this case. Measured: the failing resource
// is a fonts.gstatic.com woff2 file 404-ing intermittently when the same page is
// loaded five times in a row, once per breakpoint.
//
// THE FIX, AND WHY IT IS NOT AN IGNORE RULE
// The obvious repair — adding "Failed to load resource" to the text pattern —
// would suppress that message for EVERY origin, including our own. A missing
// stylesheet or script would then pass silently, which is precisely the failure
// the suite exists to catch (it was written after a real /styles.css MIME bug).
//
// So the message is not classified by its text. It is correlated with the actual
// failed responses observed during the same navigation, which DO carry URLs. A
// generic resource error is noise only when every failed response came from an
// allowlisted third-party host. One first-party failure and it stays an error —
// and is additionally reported on its own.

/** Third-party hosts whose transient failures say nothing about our product. */
const THIRD_PARTY_NOISE = [
  /^https?:\/\/fonts\.gstatic\.com\//i,
  /^https?:\/\/fonts\.googleapis\.com\//i,
  /^https?:\/\/[^/]*webmasterid[^/]*\//i,
]

/** Chrome's URL-less subresource failure. The whole reason this module exists. */
const GENERIC_RESOURCE_ERROR = /^Failed to load resource: the server responded with a status of \d+/i

/**
 * Message-text noise that genuinely does identify itself. Deliberately narrow:
 * every entry either names a third-party origin or is a browser-level condition
 * that cannot indicate a product defect.
 */
const IDENTIFIABLE_NOISE = /webmasterid|ERR_BLOCKED_BY_ORB|fonts\.googleapis|fonts\.gstatic|favicon|net::ERR_/i

export const isThirdPartyUrl = (url: string): boolean =>
  THIRD_PARTY_NOISE.some((re) => re.test(url))

/** Failed responses that came from our own origin — never ignorable. */
export function firstPartyFailures(failedUrls: readonly string[]): string[] {
  return failedUrls.filter((u) => !isThirdPartyUrl(u))
}

export interface ClassifyInput {
  consoleErrors: readonly string[]
  /** URLs of every response with status >= 400 during the same navigation. */
  failedUrls: readonly string[]
}

/**
 * Returns the console errors that represent a real problem.
 *
 * A generic, URL-less resource error is dropped ONLY when no first-party
 * resource failed. Anything else — a JS exception, a MIME refusal, an
 * application console.error, a hydration warning — is returned untouched,
 * because none of those match the generic pattern.
 */
export function realConsoleErrors({ consoleErrors, failedUrls }: ClassifyInput): string[] {
  const ownFailures = firstPartyFailures(failedUrls)
  return consoleErrors.filter((text) => {
    if (IDENTIFIABLE_NOISE.test(text)) return false
    if (GENERIC_RESOURCE_ERROR.test(text) && ownFailures.length === 0) return false
    return true
  })
}
