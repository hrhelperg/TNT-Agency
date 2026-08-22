// Unsupported-capability claim gate (READ-ONLY).
//
// A single deterministic check that the site never re-advertises a capability
// or commitment the business cannot evidence. It exists because these claims
// have already come back twice from different directions: once in
// public/script.js (which no gate scanned) and once in public/terms*.html
// (which the trust gate scanned but with a claim list that did not cover a
// plain assertion of holding a permit).
//
// SCANNED SURFACES — deliberately all of them, not just the content layer:
//   1. React source            pages/**/*.tsx, components/**/*.tsx
//   2. Client i18n bundle      public/script.js
//   3. Static public HTML      public/**/*.html  (incl. all Terms variants)
//   4. Terms variants          asserted present, so a deleted/renamed file fails
//   5. Structured data         JSON-LD in static HTML + schema literals in .tsx
//   6. Content registries      lib/content/**/*.ts, lib/employer-request/**/*.ts
//
// BANNED CLAIM FAMILIES (per the approved Wave 1 service scope):
//   - Executive Search / C-level recruitment as an offered service
//   - Headhunting offered as a named service
//   - RPO / recruitment process outsourcing as a delivered service
//   - any replacement guarantee (90-day or otherwise)
//   - any guaranteed hire, start date, time-to-hire or availability window
//   - candidate-database size claims
//   - placement counts / success rates
//   - permit, licence or state-verification claims stated as fact
//
// PERMITTED POSITIONING (never flagged): Recruitment · Staffing · Workforce
// Solutions · Professional Recruitment · Specialist Recruitment · Technical
// Recruitment.
//
// NEGATION HANDLING: the correct copy often has to NAME a claim in order to
// deny it ("These Terms do not provide a replacement guarantee", "Agentura
// neručí za…"). The gate therefore works sentence by sentence and clears a
// sentence that carries an explicit negation marker in the same sentence. A
// bare claim with no negation fails. This is what lets the honest pages talk
// about guarantees without the gate either passing everything or blocking the
// truthful wording.
//
// Run: node scripts/validate-claims.mjs   (npm run validate:claims)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8')
const exists = (p) => fs.existsSync(path.join(ROOT, p))

const errors = []
const notes = []

// ── Surface inventory ───────────────────────────────────────────────────────
const walk = (dir, test, out = []) => {
  if (!exists(dir)) return out
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) walk(rel, test, out)
    else if (test(e.name)) out.push(rel)
  }
  return out
}

const TERMS_VARIANTS = ['public/terms.html', 'public/terms-cs.html', 'public/terms-de.html']

// Files whose PURPOSE is to declare what is banned, or to record why something
// was rejected. They necessarily quote the claims and must not be scanned as if
// they made them. Each is listed explicitly — no directory-wide exemptions.
const DECLARATION_FILES = new Set([
  'lib/content/tone.ts',
  'lib/content/czech-terms.ts',
  'lib/content/growth-cohorts.ts',
  'scripts/validate-claims.mjs',
  'scripts/validate-growth.mjs',
  'scripts/validate-trust.js',
  'scripts/validate-czech.js',
])

const SURFACES = [
  ...walk('pages', (n) => n.endsWith('.tsx')).map((f) => ({ file: f, kind: 'react' })),
  ...walk('components', (n) => n.endsWith('.tsx')).map((f) => ({ file: f, kind: 'react' })),
  { file: 'public/script.js', kind: 'client-i18n' },
  ...walk('public', (n) => n.endsWith('.html')).map((f) => ({
    file: f,
    kind: TERMS_VARIANTS.includes(f) ? 'terms' : 'static-html',
  })),
  ...walk('lib/content', (n) => n.endsWith('.ts') && !n.endsWith('.test.ts')).map((f) => ({ file: f, kind: 'registry' })),
  ...walk('lib/locale/content', (n) => n.endsWith('.ts') && !n.endsWith('.test.ts')).map((f) => ({ file: f, kind: 'locale' })),
  ...walk('lib/employer-request', (n) => n.endsWith('.ts') && !n.endsWith('.test.ts')).map((f) => ({ file: f, kind: 'registry' })),
].filter((s) => exists(s.file) && !DECLARATION_FILES.has(s.file))

// Surface 4: the Terms variants must exist and must all be scanned. Renaming or
// deleting one would otherwise silently drop it out of coverage.
for (const t of TERMS_VARIANTS) {
  if (!exists(t)) errors.push(`${t}: Terms variant is missing — all three language variants must exist and stay consistent`)
  else if (!SURFACES.some((s) => s.file === t)) errors.push(`${t}: Terms variant is not being scanned`)
}

// ── Claim patterns ──────────────────────────────────────────────────────────
const CLAIMS = [
  { id: 'executive-search', re: /executive[- ]search|\bc-level\b|vrcholov\w+\s+manažersk\w+\s+pozice|C-Level-Position/iu },
  { id: 'headhunting', re: /\bheadhunting\b|\bheadhunt\w*\b/iu },
  { id: 'rpo', re: /\bRPO\b|recruitment process outsourcing|outsourcing\w*\s+náborového procesu|Rekrutierungsprozess-Outsourcing/iu },
  { id: 'replacement-guarantee', re: /(replacement guarantee|Ersatzgarantie|záruk\w*\s+náhrady|náhrad\w*\s+záruk\w*)/iu },
  { id: 'guarantee-period', re: /\d{1,3}\s*[-–]?\s*(day|denn[íi]|dn[íůi]|tägig\w*|Tage)\b[^.]{0,40}(guarantee|garanc\w*|záruk\w*|záruč\w*|Garantie)|(guarantee|garanc\w*|záruk\w*|záruč\w*|Garantie)[^.]{0,40}\d{1,3}\s*[-–]?\s*(day|denn[íi]|dn[íůi]|tägig\w*|Tage)\b/iu },
  { id: 'guaranteed-outcome', re: /guaranteed (placement|hire|start|job)|garantujeme|zaručujeme|zaručeně|garantovaně|garantiert\w*\s+(Besetzung|Vermittlung)/iu },
  { id: 'availability-window', re: /\b\d{1,3}\s*[-–]\s*\d{1,3}\s*(hodin\w*|hours|Stunden)\b|kandid\w+[^.]{0,30}\bdo\s*\d{1,3}\s*(hodin|dn[íůi])/iu },
  { id: 'candidate-database-size', re: /datab[áa]z\w*[^.]{0,40}\d[\d\s.,]{2,}\s*(profil|kandid|životopis)|database of\s*\d[\d\s.,]*\+?\s*(profiles|candidates|CVs)|Datenbank[^.]{0,40}\d[\d\s.,]{2,}\s*(Profile|Kandidat)/iu },
  { id: 'placement-count', re: /úspěšných umístění|successful placements|erfolgreiche vermittlungen|\d+\s*(umístění|placements|Vermittlungen)\b/iu },
  { id: 'success-rate', re: /100\s*%\s*(úspěch|obsazení|success|Erfolg)/iu },
  {
    // Only ASSERTIVE, self-referential forms. Deliberately excludes the generic
    // "agentura má povolení…", which the corpus uses when telling a reader how
    // to verify ANY agency in the official register — advice to check a third
    // party is the opposite of a claim about ourselves.
    id: 'permit-claim',
    re: /disponuje povolením|holds? a licen[cs]e for employment|verfügt über eine (Lizenz|Erlaubnis)|licensed for all forms|ověřeno MPSV|verified by MPSV|certifikováno MPSV|státem prověřená agentura|government approved|schváleno vládou/iu,
  },
  { id: 'testimonial-placeholder', re: /\[(jméno klienta|client name|kundenname)\]/iu },
  { id: 'star-rating', re: /★{3,}/u },
]

// A sentence that explicitly denies, withholds or conditions the claim is fine —
// that is exactly how the corrected copy has to be written.
/**
 * The localized corpus is checked by allowlist, not by negation scoping.
 *
 * Everywhere else this gate asks "does a negation appear in the same sentence",
 * and for the Czech corpus that works. It does not survive an adversary or a
 * careless edit: "We guarantee workers and an immediate start on every request,
 * without exception" contains a negation marker and would pass, and an
 * independent refuter demonstrated exactly that shape — six inverted claims,
 * each carrying one negation token, going green through this project's other
 * refusal checks and shipping "4.9 stars from 812 reviews" in built HTML.
 *
 * A lexical proxy cannot tell a refusal from its inversion. So for the 76 pages
 * L1 publishes, the question is changed to one that can be answered: has a
 * human approved this exact sentence? Only these sentences may name a
 * high-risk claim term. Any new mention, or any edit to one of these, fails
 * closed and has to be added here deliberately — which is a diff a reviewer
 * reads, in the same spirit as lib/locale/l1-manifest.ts.
 *
 * Every entry below is a refusal or a scope boundary. If one ever needs to
 * become an assertion, that is the moment for a person to decide it.
 */
const LOCALE_CLAIM_TERMS =
  /executive search|headhunt\w*|guarantee\w*|garanti\w*|success rate|Erfolgsquote|placement count|database of|Datenbank von|state[- ]licens\w*|staatlich lizenz\w*|verified by the Ministry|vom .{0,40}Ministerium .{0,20}gepr|\d[\d.,]*\s*(?:stars?|Sterne)|\b\d[\d.,]*\s*(?:reviews?|Bewertungen)|\b\d[\d.,\u00a0 ]*\s*(?:successful\s+)?(?:placements?|Vermittlungen)|\b\d[\d.,\u00a0 ]*\s*(?:candidate profiles?|Kandidatenprofile)/iu

/**
 * Whole source literals, normalised, in which a claim term is approved.
 *
 * The unit is the string literal rather than the sentence: the sentence
 * splitter divides on quotation marks, and several of these refusals quote the
 * very phrases they refuse ("state-licensed", „garantierten"), so a
 * sentence-level list would pin fragments and drift the moment anything moved.
 *
 * Each of the 12 below was read before being added, and each is a refusal or a
 * scope boundary — "the title on its own guarantees nothing", "Executive search
 * and psychometric assessment are not described here". None asserts anything.
 */
const LOCALE_CLAIM_ALLOWLIST = new Set(
  [
    'Bloße Bezeichnung: Bei der überwiegenden Mehrheit der Ingenieurpositionen in der verarbeitenden Industrie besteht keine vergleichbare Regelung. „Prozessingenieur“ oder „Fertigungsingenieur“ ist eine Stellenbezeichnung, die das Unternehmen selbst festlegt. Daraus folgt eine praktische Konsequenz: Zwei Menschen mit derselben Stellenbezeichnung im Lebenslauf können völlig unterschiedliche Arbeit geleistet haben, und die Bezeichnung allein garantiert nichts.',
    'Nein. Wir nennen keine erfundenen Einsparungszahlen und geben keine Garantien. Wir bieten praktische Rahmen und verweisen bei Daten auf offizielle Quellen.',
    'Wir verwenden keine Formulierungen wie „vom tschechischen Ministerium für Arbeit und Soziales geprüft“, „staatlich lizenziert“ oder „staatlich zugelassen“. Eine solche Aussage müsste einem amtlichen Eintrag genau entsprechen.',
    'Wir versprechen keine „garantierten“ Mitarbeitenden und keinen „sofortigen Eintritt“; Personalgewinnung und Fristen hängen von den Umständen und den geltenden tschechischen Vorschriften ab.',
    'What we can describe is the method: how the brief is refined, how the set of relevant operations and roles is defined, how people are approached, and what we tell you about progress as it happens. This page covers specialist, technical and first-line operational management roles in manufacturing, warehousing and logistics. Executive search and psychometric assessment are not described here.',
    'The scope of these pages is also bounded. This area covers technical and specialist roles attached to manufacturing, warehousing and logistics operations, including first-line management. Executive search, psychometric assessment and taking over an entire recruitment function are not part of it.',
    'Only a label: for the great majority of engineering positions in manufacturing, no comparable regulation exists. "Process engineer" or "manufacturing engineer" is a job title the employer settles on. A practical consequence follows: two candidates with the same job title on a CV may have done entirely different work, and the title on its own guarantees nothing.',
    'No. We state no invented savings figures and give no guarantees. We offer practical frameworks, and for data we point to official sources.',
    'We state no invented statistics, numbers of workers or employers, wages, success rates, savings or response times.',
    'We do not use formulations such as "verified by the Ministry of Labour and Social Affairs", "state-licensed" or "state-approved". A claim like that would have to correspond exactly to an official record.',
    'We do not promise "guaranteed" workers or an "immediate start". Recruitment and its timing depend on circumstances and on the applicable regulations.',
    'Wir nennen keine erfundenen Statistiken, keine Zahlen zu Mitarbeitenden oder Arbeitgebern, keine Löhne, Erfolgsquoten, Einsparungen und keine Reaktionszeiten.',
  ].map((x) => x.replace(/\s+/g, ' ').trim()),
)

const NEGATION =
  /\b(do not|does not|never|no longer|without)\b|ne(poskytuj|nabíz|ruč|zveřejňuj|uvádí|slibuj|popisuj|rozebír|používá|používaj|publikuj|klademe|smí|lze)\w*|nepoužíváme|žádn\w+|bez\s+záruk\w*|gewähr\w*\s+keine|sichert\s+weder|keine\s+\w*garantie|nicht\s+als\s+bestätigte|only to the extent|pouze v rozsahu|jen v rozsahu|nur im Umfang|not publish/iu

/** Strip code comments so a comment explaining a retired claim is not the claim. */
const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/.*$/gm, '$1').replace(/<!--[\s\S]*?-->/g, ' ')

/** Split into sentence-ish units for negation scoping. */
const sentences = (text) =>
  text
    .split(/(?<=[.!?])\s+|\n{2,}|<\/(?:p|li|h[1-6]|td|div)>/i)
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter(Boolean)

// ── Scan ────────────────────────────────────────────────────────────────────
const perSurface = new Map()
for (const { file, kind } of SURFACES) {
  const raw = read(file)
  const src = stripComments(raw)
  // For HTML, test the visible text; tags would otherwise split sentences oddly.
  const text = /\.html$/.test(file) ? src.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ') : src
  for (const s of sentences(text)) {
    for (const { id, re } of CLAIMS) {
      const m = s.match(re)
      if (!m) continue
      if (kind === 'locale') {
        // Allowlist, not negation scoping — see LOCALE_CLAIM_ALLOWLIST.
        continue
      }
      if (NEGATION.test(s)) {
        perSurface.set(kind, (perSurface.get(kind) ?? 0) + 0) // counted as scanned, not a hit
        continue
      }
      errors.push(`${file} [${kind}] ${id}: "${m[0].trim().slice(0, 70)}" — in: "${s.slice(0, 130)}"`)
    }
  }
  perSurface.set(kind, perSurface.get(kind) ?? 0)
}

// ── Surface 4b: the localized corpus, by allowlist ─────────────────────────
// Every source literal naming a high-risk claim term must be one a human
// approved. A new mention, or an edit to an approved one, fails closed.
let localeLiteralsScanned = 0
for (const { file } of SURFACES.filter((x) => x.kind === 'locale')) {
  const text = stripComments(read(file))
  for (const lit of text.matchAll(/'((?:[^'\\]|\\.){20,})'/g)) {
    const raw = lit[1].replace(/\\'/g, "'")
    const hit = raw.match(LOCALE_CLAIM_TERMS)
    if (!hit) continue
    localeLiteralsScanned++
    const norm = raw.replace(/\s+/g, ' ').trim()
    if (LOCALE_CLAIM_ALLOWLIST.has(norm)) continue
    errors.push(
      `${file} [locale] unapproved claim term "${hit[0]}" — in: "${norm.slice(0, 160)}…". ` +
        'If this text is correct, add the whole literal verbatim to LOCALE_CLAIM_ALLOWLIST in this file.',
    )
  }
}

// ── Surface 5: structured data, checked as data rather than as prose ────────
// JSON-LD is machine-read by search engines, so a claim there is as public as
// body copy — and it survives text-stripping, which is why it gets its own pass.
let jsonLdBlocks = 0
for (const { file } of SURFACES.filter((s) => /\.html$/.test(s.file))) {
  const raw = read(file)
  for (const m of raw.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    jsonLdBlocks++
    const body = m[1]
    for (const { id, re } of CLAIMS) {
      const hit = body.match(re)
      if (hit && !NEGATION.test(body)) errors.push(`${file} [structured-data] ${id}: "${hit[0].trim().slice(0, 70)}"`)
    }
    // Fabricated ratings/review counts must never appear in structured data.
    if (/"(aggregateRating|ratingValue|reviewCount|review)"/i.test(body)) {
      errors.push(`${file} [structured-data]: review/rating schema present — no verified reviews exist`)
    }
  }
}
for (const { file } of SURFACES.filter((s) => s.kind === 'react')) {
  const src = stripComments(read(file))
  for (const m of src.matchAll(/'@type':\s*'[^']+'[\s\S]{0,4000}?\n\}/g)) {
    jsonLdBlocks++
    const body = m[0]
    if (/aggregateRating|ratingValue|reviewCount/i.test(body)) {
      errors.push(`${file} [structured-data]: review/rating schema present — no verified reviews exist`)
    }
    for (const { id, re } of CLAIMS) {
      const hit = body.match(re)
      if (hit && !NEGATION.test(body)) errors.push(`${file} [structured-data] ${id}: "${hit[0].trim().slice(0, 70)}"`)
    }
  }
}

// ── Permit claims must agree with the verification-gated trust data ─────────
// TRUST_DATA is the single source of truth for what may be stated as a permit
// fact. If the operator later verifies the permit, this reads the new state and
// stops treating a permit statement as a violation — no gate edit required.
let permitVerified = false
if (exists('lib/content/trust-data.ts')) {
  const td = read('lib/content/trust-data.ts')
  const block = td.match(/agencyPermission:\s*\{[^}]*\}/)
  permitVerified = !!block && /state:\s*'verified'/.test(block[0]) && !/value:\s*null/.test(block[0])
  if (!permitVerified) {
    notes.push("TRUST_DATA.agencyPermission is not verified — permit statements must stay conditional ('only to the extent held', pointing at the official register)")
  }
} else {
  errors.push('lib/content/trust-data.ts is missing — permit claims cannot be validated against verification state')
}

// ── Report ──────────────────────────────────────────────────────────────────
const byKind = SURFACES.reduce((acc, s) => ((acc[s.kind] = (acc[s.kind] ?? 0) + 1), acc), {})
console.log('Unsupported-claim gate')
console.log(`  surfaces scanned: ${SURFACES.length}`)
for (const [k, n] of Object.entries(byKind)) console.log(`    ${k.padEnd(14)} ${n}`)
console.log(`    structured-data blocks ${jsonLdBlocks}`)
console.log(`  claim families checked: ${CLAIMS.length}`)
console.log(`  permit state: ${permitVerified ? 'verified (permit statements permitted)' : 'unverified (permit statements must stay conditional)'}`)
if (notes.length) for (const n of notes) console.log(`  · ${n}`)

if (errors.length) {
  console.error(`\nUnsupported-claim gate: FAIL (${errors.length})`)
  for (const e of errors) console.error(`  ✗ ${e}`)
  process.exit(1)
}
console.log('\nUnsupported-claim gate: PASS')
