// Phase E Lite — Local lead reference.
//
// A short, quotable reference so an emailed request can be tracked in the
// business inbox without any database. Deliberately carries NO personal data:
// it is a date plus random characters, nothing derived from the employer, the
// company, the role or any amount.
//
// Format: TPID-YYYY-MMDD-XXXX   e.g. TPID-2026-0719-A7K4
//
// It is generated only at the moment the employer prepares a request, and is
// never written to localStorage, cookies, IndexedDB, the URL or history — it
// exists in React state and in the prepared email, and nowhere else.

/**
 * Crockford-style alphabet: no I, L, O, U, 0 or 1, so a reference read aloud
 * or retyped from an email cannot be confused.
 */
const ALPHABET = '23456789ABCDEFGHJKMNPQRSTVWXYZ'

export const REFERENCE_PREFIX = 'TPID'
export const REFERENCE_PATTERN = /^TPID-\d{4}-\d{4}-[2-9A-HJKMNP-TV-Z]{4}$/

/** Cryptographically strong when available, with a deterministic fallback. */
function randomBytes(n: number): Uint8Array {
  const out = new Uint8Array(n)
  const c: Crypto | undefined =
    typeof globalThis !== 'undefined' ? (globalThis.crypto as Crypto | undefined) : undefined
  if (c && typeof c.getRandomValues === 'function') {
    c.getRandomValues(out)
    return out
  }
  // Non-browser or very old environment: Math.random is sufficient here because
  // the reference is an inbox convenience, never a secret or an access token.
  for (let i = 0; i < n; i++) out[i] = Math.floor(Math.random() * 256)
  return out
}

const two = (n: number) => String(n).padStart(2, '0')

/**
 * Builds a reference for the given moment. `now` is injected so the function is
 * pure and testable; callers in the browser pass `new Date()`.
 *
 * 30^4 = 810,000 suffixes per day — far beyond collision risk at the lead
 * volume this architecture is sized for, and the date component means a
 * collision would have to occur on the same day to matter at all.
 */
export function generateLeadReference(now: Date = new Date()): string {
  const year = now.getFullYear()
  const datePart = `${two(now.getMonth() + 1)}${two(now.getDate())}`
  const bytes = randomBytes(4)
  let suffix = ''
  for (let i = 0; i < 4; i++) suffix += ALPHABET[bytes[i] % ALPHABET.length]
  return `${REFERENCE_PREFIX}-${year}-${datePart}-${suffix}`
}

export const isLeadReference = (value: string): boolean => REFERENCE_PATTERN.test(value)
