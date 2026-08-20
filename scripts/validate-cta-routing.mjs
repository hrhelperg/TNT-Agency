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


// ─────────────────────────────────────────────────────────────────────────────
// BESPOKE SURFACES (W3)
//
// The registry audit above sees SEO_PAGES only — 162 pages. It never saw the 13
// hand-written routes, and that blind spot is why the homepage's largest
// employer button pointed at the agency directory and the flagship calculator's
// "Poptat pracovníky" pointed at /submit-offer. Both are among the highest-intent
// surfaces on the site, and neither was gated.
//
// This inventory is deliberately EXPLICIT rather than a glob. A wildcard that
// silently matches nothing is indistinguishable from a wildcard that silently
// matches everything, and the failure mode we are fixing is exactly "a surface
// nobody was looking at". So every bespoke CTA is declared with its intent and
// its destination, and two independent checks run:
//
//   1. every DECLARED CTA must still exist and still point where it is declared
//      to point  (catches destination drift);
//   2. every CTA FOUND in a scanned file must be declared  (catches a new
//      surface, or an inventory entry someone deleted).
//
// Intent vocabulary is the one the programme brief specifies.

export const CTA_INTENTS = [
  'EMPLOYER_STAFFING_REQUEST',
  'EMPLOYER_RECRUITMENT_REQUEST',
  'GENERAL_CONTACT',
  'REGULATORY_CONTACT',
  'CANDIDATE_CONTACT',
  'MARKETPLACE',
  'KNOWLEDGE',
  'OTHER',
]

/** Intents that must land on the structured employer request form. */
const MUST_BE_REQUEST = new Set(['EMPLOYER_STAFFING_REQUEST', 'EMPLOYER_RECRUITMENT_REQUEST'])
/** Intents that must NEVER land on it. */
const MUST_NOT_BE_REQUEST = new Set(['CANDIDATE_CONTACT'])

/** Files scanned for button CTAs. Anything here is audited; see check 2. */
export const SCANNED_SURFACES = [
  'pages/index.tsx',
  'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx',
  'pages/agencies.tsx',
  'pages/offers.tsx',
  'pages/contact.tsx',
  'pages/submit-agency.tsx',
  'pages/submit-offer.tsx',
  'pages/zamestnavani-cizincu.tsx',
  'pages/socialni-zdravotni-dane-2026.tsx',
  'pages/o-nas.tsx',
  'pages/redakcni-zasady.tsx',
  'pages/privacy-policy.tsx',
  'pages/poptavka-pracovniku.tsx',
  'components/Header.tsx',
  'components/EmployerSituations.tsx',
  'components/HomePayrollCalculator.tsx',
  'components/HomeAgencyValue.tsx',
  'components/VacancyCostTool.tsx',
  'components/EmployerCta.tsx',
  'components/EmployerRequestForm.tsx',
  'components/SeoArticle.tsx',
]

/**
 * Declared CTAs. `label` is the literal text or the JSX expression as written,
 * which is what makes an entry reviewable by a human reading the diff.
 *
 * `dest` of null means the destination is not a static internal path (a mailto,
 * or a constant/prop resolved at render). Those are still declared so they
 * cannot disappear unnoticed, but their destination is not string-compared.
 */
export const BESPOKE_CTAS = [
  // ── homepage ──
  { file: 'pages/index.tsx', label: 'Hledám pracovníky', intent: 'EMPLOYER_STAFFING_REQUEST', dest: '/poptavka-pracovniku' },
  { file: 'pages/index.tsx', label: 'Hledám práci', intent: 'CANDIDATE_CONTACT', dest: '/offers' },
  { file: 'pages/index.tsx', label: 'Pro zaměstnavatele: rozcestník →', intent: 'KNOWLEDGE', dest: '/pro-zamestnavatele' },
  { file: 'pages/index.tsx', label: 'Nábor odborných pozic →', intent: 'KNOWLEDGE', dest: '/nabor-odbornych-pozic' },
  { file: 'pages/index.tsx', label: 'Prozkoumat služby a odvětví →', intent: 'KNOWLEDGE', dest: '/pro-zamestnavatele',
    reason: 'Browse intent under an employer-services heading. The employer hub carries the services; /agencies lists other agencies.' },
  { file: 'pages/index.tsx', label: 'Poslat životopis', intent: 'CANDIDATE_CONTACT', dest: null },
  { file: 'pages/index.tsx', label: 'Procházet nabídky →', intent: 'CANDIDATE_CONTACT', dest: '/offers' },
  { file: 'pages/index.tsx', label: 'Zveřejnit agenturu', intent: 'MARKETPLACE', dest: '/submit-agency',
    reason: 'Agency listing its own profile in the directory — genuinely the marketplace product.' },
  { file: 'pages/index.tsx', label: 'Zadat poptávku', intent: 'MARKETPLACE', dest: '/submit-offer',
    reason: 'Sits inside the marketplace section; posts a public offer rather than requesting staff from us.' },
  { file: 'pages/index.tsx', label: 'Poslat poptávku →', intent: 'EMPLOYER_STAFFING_REQUEST', dest: '/poptavka-pracovniku' },

  // ── flagship calculator ──
  { file: 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx', label: '{t.ctaRequest}', intent: 'EMPLOYER_STAFFING_REQUEST', dest: '/poptavka-pracovniku' },
  { file: 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx', label: '{t.ctaConsult}', intent: 'GENERAL_CONTACT', dest: '/contact',
    reason: '"Domluvit konzultaci" / "Arrange a consultation" — a conversation, not a staffing brief the 25-field form can hold.' },

  // ── marketplace / directory ──
  { file: 'pages/agencies.tsx', label: 'Registrovat agenturu', intent: 'MARKETPLACE', dest: '/submit-agency' },
  { file: 'pages/agencies.tsx', label: 'Registrovat agenturu →', intent: 'MARKETPLACE', dest: '/submit-agency' },
  { file: 'pages/agencies.tsx', label: 'Sjednat bezplatnou konzultaci', intent: 'GENERAL_CONTACT', dest: '/contact',
    reason: 'Consultation booking on the directory page; not a staffing brief.' },
  { file: 'pages/offers.tsx', label: 'Zadat poptávku', intent: 'MARKETPLACE', dest: '/submit-offer' },
  { file: 'pages/offers.tsx', label: 'Zadat poptávku →', intent: 'MARKETPLACE', dest: '/submit-offer' },
  { file: 'pages/offers.tsx', label: 'Poslat životopis', intent: 'CANDIDATE_CONTACT', dest: null },
  { file: 'pages/offers.tsx', label: 'Promluvit s náborářem', intent: 'CANDIDATE_CONTACT', dest: '/contact',
    reason: 'Candidate-facing page; a jobseeker must never be sent into the employer request form.' },

  // ── regulatory / knowledge ──
  { file: 'pages/socialni-zdravotni-dane-2026.tsx', label: 'Domluvit konzultaci', intent: 'REGULATORY_CONTACT', dest: '/contact',
    reason: 'Payroll-and-levies guide. The next question is regulatory and cannot be expressed as a staffing requirement.' },
  { file: 'pages/zamestnavani-cizincu.tsx', label: 'Domů', intent: 'OTHER', dest: '/' },
  { file: 'pages/zamestnavani-cizincu.tsx', label: 'Služby a recruitment', intent: 'KNOWLEDGE', dest: '/agencies' },
  { file: 'pages/zamestnavani-cizincu.tsx', label: 'Kontakt', intent: 'GENERAL_CONTACT', dest: '/contact' },

  // ── mailto surfaces ──
  { file: 'pages/contact.tsx', label: 'Napsat e-mail', intent: 'GENERAL_CONTACT', dest: null },
  { file: 'pages/submit-agency.tsx', label: 'Napsat e-mail', intent: 'MARKETPLACE', dest: null },
  { file: 'pages/submit-offer.tsx', label: 'Napsat e-mail', intent: 'MARKETPLACE', dest: null },

  // ── shared components ──
  { file: 'components/Header.tsx', label: 'Poptat pracovníky', intent: 'EMPLOYER_STAFFING_REQUEST', dest: '/poptavka-pracovniku' },
  { file: 'components/EmployerSituations.tsx', label: 'Poptat pracovníky', intent: 'EMPLOYER_STAFFING_REQUEST', dest: null,
    reason: 'href={REQUEST}; the constant is /poptavka-pracovniku and is asserted in the component tests.' },
  { file: 'components/HomePayrollCalculator.tsx', label: '{c.ctaDetail}', intent: 'KNOWLEDGE', dest: null },
  { file: 'components/HomeAgencyValue.tsx', label: '{c.avCta}', intent: 'KNOWLEDGE', dest: null },
  { file: 'components/VacancyCostTool.tsx', label: '{pick(lang, C.CTA_TEXT)}', intent: 'EMPLOYER_STAFFING_REQUEST', dest: null,
    reason: 'href={REQUEST_PATH}; asserted as the clean canonical path by lib/vacancy-cost/privacy.test.ts.' },
  { file: 'components/EmployerCta.tsx', label: '{c.primary}', intent: 'EMPLOYER_STAFFING_REQUEST', dest: null,
    reason: 'href={buildCtaHref(source)}, which can only return REQUEST_PATH by construction.' },
  { file: 'components/EmployerCta.tsx', label: '{c.secondary}', intent: 'KNOWLEDGE', dest: null },
  { file: 'components/EmployerRequestForm.tsx', label: '{copy.openEmailApp}', intent: 'EMPLOYER_STAFFING_REQUEST', dest: null,
    reason: 'The mailto submission itself, on the request page.' },
  { file: 'components/SeoArticle.tsx', label: '{page.cta.buttonLabel}', intent: 'OTHER', dest: null,
    reason: 'Pass-through renderer for the registry CTA; the destination is audited by the registry half of this gate.' },
]

/** Extracts button CTAs from a bespoke source file. */
export function extractBespokeCtas(src) {
  const out = []
  const re = /<a\b[^>]*>/g
  let m
  while ((m = re.exec(src)) !== null) {
    const tag = m[0]
    if (!/className=(?:"btn|\{`btn)/.test(tag)) continue
    const hrefRaw = tag.match(/href=\{?["']?([^"'}\s>]+)/)
    const href = hrefRaw ? hrefRaw[1] : '?'
    const rest = src.slice(m.index + tag.length, m.index + tag.length + 400)
    const label = rest.split('</a>')[0].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    out.push({ href, label })
  }
  return out
}

/**
 * Audits the bespoke surfaces. `files` is a Map of relative path -> source.
 */
export function auditBespokeCtas(files, opts = {}) {
  const surfaces = opts.surfaces ?? SCANNED_SURFACES
  const declarations = opts.declarations ?? BESPOKE_CTAS
  const errors = []
  const rows = []
  const declaredByFile = new Map()
  for (const d of declarations) {
    if (!declaredByFile.has(d.file)) declaredByFile.set(d.file, [])
    declaredByFile.get(d.file).push(d)
  }

  // Every scanned surface must exist.
  for (const f of surfaces) {
    if (!files.has(f)) errors.push(`${f}: declared in SCANNED_SURFACES but the file does not exist`)
  }
  // Every declared CTA must be on a scanned surface, else it is never checked.
  for (const d of declarations) {
    if (!surfaces.includes(d.file)) {
      errors.push(`${d.file}: has declared CTAs but is not in SCANNED_SURFACES — it would never be audited`)
    }
    if (!CTA_INTENTS.includes(d.intent)) {
      errors.push(`${d.file} "${d.label}": intent "${d.intent}" is not in the declared vocabulary`)
    }
  }

  for (const [file, src] of files) {
    if (!surfaces.includes(file)) continue
    const found = extractBespokeCtas(src)
    const declared = declaredByFile.get(file) ?? []
    for (const f of found) {
      const d = declared.find((x) => x.label === f.label)
      if (!d) {
        errors.push(`${file}: CTA "${f.label}" → ${f.href} is not declared in BESPOKE_CTAS — classify it explicitly`)
        continue
      }
      rows.push({ file, ...f, intent: d.intent })

      if (/[?#]/.test(f.href) && !f.href.startsWith('mailto:')) {
        errors.push(`${file}: CTA "${f.label}" carries a query or fragment (${f.href})`)
      }
      if (d.dest !== null && f.href !== d.dest) {
        errors.push(`${file}: CTA "${f.label}" is declared to point at ${d.dest} but points at ${f.href} — destination drift`)
      }
      if (MUST_BE_REQUEST.has(d.intent) && d.dest !== null && d.dest !== REQUEST_PATH) {
        errors.push(`${file}: CTA "${f.label}" is ${d.intent} but declared destination is ${d.dest}`)
      }
      if (MUST_NOT_BE_REQUEST.has(d.intent) && f.href === REQUEST_PATH) {
        errors.push(`${file}: CTA "${f.label}" is ${d.intent} and must never route to the employer request form`)
      }
      if (MUST_BE_REQUEST.has(d.intent) && f.href.startsWith('/') && f.href !== REQUEST_PATH) {
        errors.push(`${file}: CTA "${f.label}" declares employer request intent but routes to ${f.href}`)
      }
    }
    // A declared CTA that has vanished from the file is stale.
    for (const d of declared) {
      if (!found.some((f) => f.label === d.label)) {
        errors.push(`${file}: declared CTA "${d.label}" no longer exists — remove or update the inventory entry`)
      }
    }
  }

  return { errors, rows }
}

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
  const fs = await import('node:fs')
  const { SEO_PAGES } = await import(path.join(ROOT, 'lib/content/pages/index.ts'))
  const { errors: registryErrors, review, rows, submitOffer } = auditCtaRouting(SEO_PAGES)
  const LOCAL_ALLOWED = rows.filter((r) => r.href === '/submit-offer' && r.isMarketplace).length

  // Bespoke surfaces (W3). Read every scanned file, plus discover any other
  // CTA-bearing bespoke file so a NEW surface cannot appear unaudited.
  const files = new Map()
  for (const rel of SCANNED_SURFACES) {
    const abs = path.join(ROOT, rel)
    if (fs.existsSync(abs)) files.set(rel, fs.readFileSync(abs, 'utf8'))
  }
  const discovered = []
  for (const dir of ['pages', 'components']) {
    const walk = (d) => {
      for (const e of fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })) {
        const rel = `${d}/${e.name}`
        if (e.isDirectory()) { walk(rel); continue }
        if (!/\.tsx$/.test(e.name) || /^_(app|document)\.tsx$/.test(e.name)) continue
        if (SCANNED_SURFACES.includes(rel)) continue
        const src = fs.readFileSync(path.join(ROOT, rel), 'utf8')
        // A registry page renders its CTA through SeoArticle; that half is
        // audited above. Only a bespoke button here is unaudited.
        if (extractBespokeCtas(src).length) discovered.push(rel)
      }
    }
    walk(dir)
  }
  const { errors: bespokeErrors, rows: bespokeRows } = auditBespokeCtas(files)
  for (const rel of discovered) {
    bespokeErrors.push(`${rel}: contains button CTAs but is not in SCANNED_SURFACES — add it to the inventory and classify its CTAs`)
  }
  const errors = [...registryErrors, ...bespokeErrors]

  const byDest = {}
  for (const r of rows) byDest[r.href] = (byDest[r.href] ?? 0) + 1
  console.log('CTA intent-routing gate')
  console.log(`  CTA surfaces audited        : ${rows.length}`)
  console.log(`  destinations                : ${JSON.stringify(byDest)}`)
  console.log(`  employer-request intent     : ${rows.filter((r) => r.isRequest).length}`)
  console.log(`  documented exceptions       : ${Object.keys(DOCUMENTED_EXCEPTIONS).length}`)
  console.log(`  /submit-offer CTAs          : ${submitOffer} (marketplace-declared: ${LOCAL_ALLOWED}) — staffing intent there now fails`)
  const bIntent = {}
  for (const r of bespokeRows) bIntent[r.intent] = (bIntent[r.intent] ?? 0) + 1
  console.log(`  bespoke surfaces scanned    : ${SCANNED_SURFACES.length} files, ${bespokeRows.length} declared CTAs`)
  console.log(`  bespoke CTA intents         : ${JSON.stringify(bIntent)}`)
  console.log(`  unaudited CTA-bearing files : ${discovered.length}${discovered.length ? ' -> ' + discovered.join(', ') : ''}`)
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
