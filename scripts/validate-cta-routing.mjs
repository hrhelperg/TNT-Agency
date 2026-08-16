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
 * RESOLVED. The 19 pages that declared employer staffing intent and routed to
 * /submit-offer now route to the request form. The audit found no marketplace
 * intent among them: zero directory signals in their bodies, none linking to
 * /agencies, and every CTA offering TNT's own help ("Pomůžeme vám s náborem")
 * rather than a match with some third-party agency.
 *
 * /submit-offer is NOT deprecated. It remains a legitimate destination for
 * genuine marketplace job-posting intent, it is linked site-wide from the header
 * and footer, and it stays in the sitemap. What changed is that staffing intent
 * no longer lands there.
 *
 * The rule is therefore inverted from "must not grow" to "must not appear":
 * staffing intent on /submit-offer is now a FAILURE, and a page that genuinely
 * posts a public offer must declare itself via MARKETPLACE_EXCEPTIONS.
 */
export const SUBMIT_OFFER_BASELINE = 0

/**
 * Wording that means "publish a vacancy for candidates to find" — the
 * marketplace product, not TNT's own staffing service. A CTA matching this may
 * legitimately point at /submit-offer.
 */
const MARKETPLACE_POSTING = [
  /zveřejnit (nabídku|inzerát|pozici)/i,
  /vystavit nabídku/i,
  /inzerovat pozici/i,
  /nabídku práce do katalogu/i,
]

/**
 * Pages that deliberately keep /submit-offer because their intent really is
 * posting a public offer. Empty today: the audit found no such page among the
 * 19. An entry here must state why the page posts an offer rather than
 * requesting staff.
 */
export const MARKETPLACE_EXCEPTIONS = {}

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
    const isMarketplace = MARKETPLACE_POSTING.some((re) => re.test(wording))
    const marketplaceException = MARKETPLACE_EXCEPTIONS[cta.title]

    rows.push({ slug: p.slug, href, isRequest, isMarketplace, title: cta.title })

    if (isRequest && href !== REQUEST_PATH && !exception) {
      if (href === '/submit-offer' && (isMarketplace || marketplaceException)) {
        // Genuine job-posting intent may live on the marketplace surface.
        review.push(`${p.slug}: "${cta.title}" → ${href} (marketplace posting intent, allowed)`)
      } else {
        errors.push(`${p.slug}: CTA "${cta.title}" declares employer staffing intent but routes to ${href}`)
      }
    }

    // Ambiguity must fail review, not pass silently. A CTA that reads as neither
    // a staffing request nor an explicit non-request, yet points somewhere other
    // than the request form, has no classification anyone has made — and an
    // unclassified commercial CTA is exactly how the /contact and /submit-offer
    // groups accumulated unnoticed in the first place.
    if (!isRequest && !notRequest && !isMarketplace && href !== REQUEST_PATH && !exception && !marketplaceException) {
      errors.push(`${p.slug}: CTA "${cta.title}" routes to ${href} but matches no known intent — classify it explicitly or route it to the request form`)
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
  const allowedMarketplace = rows.filter(
    (r) => r.href === '/submit-offer' && (r.isMarketplace || MARKETPLACE_EXCEPTIONS[r.title]),
  ).length
  if (submitOffer - allowedMarketplace > SUBMIT_OFFER_BASELINE) {
    errors.push(`${submitOffer - allowedMarketplace} CTA(s) route to /submit-offer without declaring marketplace posting intent`)
  }

  return { errors, review, rows, submitOffer }
}

// ── CLI ──────────────────────────────────────────────────────────────────────
const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { SEO_PAGES } = await import(path.join(ROOT, 'lib/content/pages/index.ts'))
  const { errors, review, rows, submitOffer } = auditCtaRouting(SEO_PAGES)
  const LOCAL_ALLOWED = rows.filter((r) => r.href === '/submit-offer' && r.isMarketplace).length

  const byDest = {}
  for (const r of rows) byDest[r.href] = (byDest[r.href] ?? 0) + 1
  console.log('CTA intent-routing gate')
  console.log(`  CTA surfaces audited        : ${rows.length}`)
  console.log(`  destinations                : ${JSON.stringify(byDest)}`)
  console.log(`  employer-request intent     : ${rows.filter((r) => r.isRequest).length}`)
  console.log(`  documented exceptions       : ${Object.keys(DOCUMENTED_EXCEPTIONS).length}`)
  console.log(`  /submit-offer CTAs          : ${submitOffer} (marketplace-declared: ${LOCAL_ALLOWED}) — staffing intent there now fails`)
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
