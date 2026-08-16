// CTA intent-routing gate (READ-ONLY).
//
// scripts/validate-conversion.js already guarantees the request path is SAFE:
// no query strings, no telemetry, mailto-first, no backend. Nothing guaranteed
// it was REACHED. 57 commercial pages ended a Czech employer-facing article with
// "Řešíte obsazení pozic?" or "Plánujete nábor v Jihomoravském kraji?" and then
// sent the reader to /contact — a general contact page — instead of the
// structured 25-field staffing request form they were ready to fill in.
//
// So this gate classifies each CTA by the intent its own Czech wording declares,
// and requires employer-request intent to route to the request form.
//
//   FAIL  a CTA whose wording declares employer-request intent points anywhere
//         other than /poptavka-pracovniku, without a documented exception
//         a documented exception whose wording no longer matches its reason
//         an exception listed for a CTA that no longer exists (stale entry)
//         any CTA destination outside the allowed set
//         a CTA destination carrying a query string or fragment
//
// The classifier reads Czech, because the source copy is Czech (§25). It looks
// for what the employer is being asked to DO, not for topic keywords: "nabíráte"
// and "poptat pracovníky" are requests; "máte dotaz" and "hledáte práci" are not.
//
// Run: node --import ./scripts/ts-resolve.mjs scripts/validate-cta-routing.mjs
//      (npm run validate:cta-routing)

import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

export const REQUEST_PATH = '/poptavka-pracovniku'
export const ALLOWED_DESTINATIONS = new Set([REQUEST_PATH, '/contact', '/submit-offer'])

/**
 * Wording that means "I want workers" — the employer is ready to state a need.
 * These are the CTAs that belong on the structured request form.
 */
const EMPLOYER_REQUEST = [
  /nabíráte/i,
  /plánujete nábor/i,
  /řešíte obsazení/i,
  /potřebujete obsadit/i,
  /hledáte (pracovníky|zaměstnance|specialisty|techniky|inženýry|zahraniční pracovníky)/i,
  /poptat pracovníky/i,
  /zajistit pracovníky/i,
  /řešíte nedostatek pracovníků/i,
  /potřebujete pokrýt/i,
  /personální potřeb/i,
]

/**
 * Wording that is explicitly NOT a staffing request, and must never be routed to
 * the employer request form. Candidate-facing copy is the important one: sending
 * a jobseeker into a 25-field employer staffing form is a worse experience than
 * any conversion gain could justify.
 */
const NOT_A_REQUEST = [
  /hledáte práci/i, // candidate-facing
  /máte konkrétní (dotaz|personální dotaz)/i, // FAQ follow-up
  /nenašli jste odpověď/i,
]

/**
 * CTAs that keep a non-request destination on purpose. Each entry records the
 * classification and why, so a later wave cannot quietly re-route them and
 * cannot quietly forget them either — a stale entry fails this gate.
 */
export const DOCUMENTED_EXCEPTIONS = {
  'Hledáte práci v Praze?': {
    destination: '/contact',
    classification: 'CANDIDATE CONTACT',
    reason: 'Candidate-facing. The reader is looking for work, not hiring. The employer request form would be actively wrong for them.',
  },
  'Hledáte práci v Brně?': {
    destination: '/contact',
    classification: 'CANDIDATE CONTACT',
    reason: 'Candidate-facing, as above.',
  },
  'Máte konkrétní dotaz?': {
    destination: '/contact',
    classification: 'GENERAL CONTACT',
    reason: 'FAQ hub follow-up ("Nenašli jste odpověď?"). The reader has an unanswered question, not a staffing requirement.',
  },
  'Máte konkrétní personální dotaz?': {
    destination: '/contact',
    classification: 'GENERAL CONTACT',
    reason: 'Employer FAQ follow-up. Same reasoning — a question, not a request.',
  },
  'Potřebujete s tím pomoci?': {
    destination: '/contact',
    classification: 'GENERAL CONTACT',
    reason: 'Foreign-worker permit, insurance, tax and compliance reference pages. The next step is a regulatory question about a specific situation, which cannot be expressed in a staffing request form.',
  },
  'Potřebujete se zorientovat v povoleních?': {
    destination: '/contact',
    classification: 'GENERAL CONTACT',
    reason: 'Work-permit orientation. Advisory, not a staffing requirement.',
  },
}

/**
 * The /submit-offer group is a KNOWN, UNRESOLVED finding, not an approved state.
 * 19 regional and shortage pages declare employer-request intent ("Nabíráte v
 * Jihomoravském kraji?") and route to /submit-offer — a bare mailto page from
 * the legacy agency-marketplace positioning — rather than to the 25-field form.
 *
 * It is recorded here rather than silently fixed because /submit-offer belongs
 * to the agencies/offers side of the product and re-routing it is an owner
 * decision, not a hygiene fix. The gate reports the count on every run so it
 * cannot fade from view, and fails if the group GROWS.
 */
export const SUBMIT_OFFER_BASELINE = 19

export function auditCtaRouting(pages) {
  const errors = []
  const review = []
  const rows = []
  const seenExceptions = new Set()

  for (const p of pages) {
    const cta = p.cta
    if (!cta) {
      errors.push(`${p.slug}: no CTA`)
      continue
    }
    const wording = `${cta.eyebrow ?? ''} ${cta.title} ${cta.text} ${cta.buttonLabel}`
    const href = cta.href

    if (/[?#]/.test(href)) errors.push(`${p.slug}: CTA destination carries a query or fragment (${href})`)
    if (!ALLOWED_DESTINATIONS.has(href.split(/[?#]/)[0])) {
      errors.push(`${p.slug}: CTA destination ${href} is outside the allowed set`)
    }

    const notRequest = NOT_A_REQUEST.some((re) => re.test(wording))
    const isRequest = !notRequest && EMPLOYER_REQUEST.some((re) => re.test(wording))
    const exception = DOCUMENTED_EXCEPTIONS[cta.title]
    if (exception) seenExceptions.add(cta.title)

    rows.push({ slug: p.slug, href, isRequest, title: cta.title })

    if (isRequest && href !== REQUEST_PATH && !exception) {
      // /submit-offer is the known, unresolved group (see SUBMIT_OFFER_BASELINE).
      // Reported on every run, never silently accepted, but not failed — the
      // re-route is an owner decision about the marketplace side of the product,
      // not a hygiene fix this gate should force.
      if (href === '/submit-offer') {
        review.push(`${p.slug}: "${cta.title}" → ${href} (employer-request intent on a bare-mailto surface)`)
      } else {
        errors.push(`${p.slug}: CTA "${cta.title}" declares employer-request intent but routes to ${href}`)
      }
    }
    if (exception && href !== exception.destination) {
      errors.push(`${p.slug}: CTA "${cta.title}" is documented as ${exception.classification} → ${exception.destination}, but routes to ${href}`)
    }
    // A documented exception must still read like the thing it claims to be —
    // and this has to be checked against the copy BODY, not the whole wording.
    // Exceptions are keyed by title, so testing the title for its own keyword is
    // tautological: it can never fail. Mutation 9 caught exactly that.
    const bodyWording = `${cta.eyebrow ?? ''} ${cta.text} ${cta.buttonLabel}`
    if (exception && exception.classification === 'CANDIDATE CONTACT' && EMPLOYER_REQUEST.some((re) => re.test(bodyWording))) {
      errors.push(`${p.slug}: CTA "${cta.title}" is documented CANDIDATE CONTACT but its copy now reads as an employer request`)
    }
  }

  for (const title of Object.keys(DOCUMENTED_EXCEPTIONS)) {
    if (!seenExceptions.has(title)) {
      errors.push(`stale exception: "${title}" is documented but no CTA uses it — remove it`)
    }
  }

  const submitOffer = rows.filter((r) => r.href === '/submit-offer').length
  if (submitOffer > SUBMIT_OFFER_BASELINE) {
    errors.push(`/submit-offer CTAs grew from ${SUBMIT_OFFER_BASELINE} to ${submitOffer} — the unresolved routing finding must not expand`)
  }

  return { errors, review, rows, submitOffer }
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { SEO_PAGES } = await import(path.join(ROOT, 'lib/content/pages/index.ts'))
  const { errors, review, rows, submitOffer } = auditCtaRouting(SEO_PAGES)

  const byDest = {}
  for (const r of rows) byDest[r.href] = (byDest[r.href] ?? 0) + 1
  console.log('CTA intent-routing gate')
  console.log(`  CTA surfaces audited        : ${rows.length}`)
  console.log(`  destinations                : ${JSON.stringify(byDest)}`)
  console.log(`  employer-request intent     : ${rows.filter((r) => r.isRequest).length}`)
  console.log(`  documented exceptions       : ${Object.keys(DOCUMENTED_EXCEPTIONS).length}`)
  console.log(`  UNRESOLVED /submit-offer    : ${submitOffer} (baseline ${SUBMIT_OFFER_BASELINE}) — owner decision pending`)
  if (review.length) {
    console.log(`\n  REVIEW — employer-request intent not on the request form (${review.length}; reported, not failed):`)
    for (const r of review) console.log(`    · ${r}`)
  }

  if (errors.length) {
    console.error(`\nCTA intent-routing gate: FAIL (${errors.length})`)
    for (const e of errors.slice(0, 40)) console.error(`  ✗ ${e}`)
    if (errors.length > 40) console.error(`  … and ${errors.length - 40} more`)
    process.exit(1)
  }
  console.log('\nCTA intent-routing gate: PASS')
}
