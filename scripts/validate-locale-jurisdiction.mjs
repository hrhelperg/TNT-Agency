/**
 * German jurisdiction gate.
 *
 * WHY. This is a Czech agency writing in German. German has its own, very
 * specific vocabulary for staffing law — Arbeitnehmerüberlassung is the term of
 * art of the AÜG, and providing it in Germany requires an Erlaubnis under § 1
 * AÜG. A German reader on a German-language page reasonably reads
 * "Arbeitnehmerüberlassung", "die zuständigen Behörden", "Anmeldung zur
 * Versicherung" or "Arbeitsschutzunterweisung" as German law and German
 * authorities, because nothing on the page says otherwise.
 *
 * The site never claims a German licence — that was checked independently and
 * holds. The defect is subtler and still real: a reader pointed at the wrong
 * country's authorities has been misinformed without a single false sentence
 * being written. An audit found four German pages carrying legally loaded terms
 * with no Czech anchor anywhere, and eight more where the anchor arrived only
 * after the loaded term — including cases where the term sits in the meta
 * description, so the search snippet carries it unanchored and the anchor is
 * somewhere the reader may never reach.
 *
 * THE RULE. Czech jurisdiction must be explicit AT OR BEFORE the first legally
 * loaded use, reading the page in the order a reader meets it: description,
 * then intro, then each section heading and body in turn.
 *
 * This gate does not ask for new legal claims. Anchoring means naming the
 * country whose law is meant — never adding a licence, a permit number, or a
 * statutory citation the Czech source does not support.
 */
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const R = await import('../lib/locale/registry.ts')
const DE = (await import('../lib/locale/content/de/index.ts')).DE_CONTENT

/**
 * Terms that make a statement jurisdiction-dependent for a German reader.
 *
 * Deliberately narrow: each is either a German legal term of art, or a pointer
 * to an authority or duty that differs by country. General business words are
 * not here — a gate that fires on "Vertrag" in every sentence would be ignored,
 * which is worse than no gate.
 */
const LOADED = [
  ['Arbeitnehmerüberlassung', 'term of art of the German AÜG'],
  ['Zeitarbeit', 'German label for the same regulated activity'],
  ['Arbeitsgesetzbuch', 'names a labour code — which country\'s?'],
  ['Erlaubnis', 'a permission granted by some state'],
  ['Arbeitserlaubnis', 'work permit — issued by a national authority'],
  ['Aufenthaltserlaubnis', 'residence permit — issued by a national authority'],
  ['zuständige Behörde', 'which country\'s authority?'],
  ['zuständigen Behörden', 'which country\'s authorities?'],
  ['Arbeitsschutzunterweisung', 'a duty defined by national law'],
  ['Anmeldung zur Versicherung', 'social-insurance registration differs by country'],
  ['Mindestlohn', 'set nationally'],
  ['Kündigungsfrist', 'set by national labour law'],
  // Added after a reconciliation pass found each of these reading as the
  // reader's own jurisdiction on at least one page.
  ['Überlassung', 'the bare noun still names the regulated activity'],
  ['Beschäftigungsgesetz', 'names an employment act — which country\'s?'],
  ['Arbeitsinspektion', 'a national inspectorate'],
  ['Entleiher', 'German staffing-law counterparty term'],
  ['Verleiher', 'German staffing-law counterparty term'],
  ['Ministerium für Arbeit und Soziales', 'a ministry — Czech MPSV or the German BMAS?'],
]

/** Anything that names Czechia or Czech law. */
const ANCHOR = /tschechisch\w*|Tschechien|Tschechische[nrs]?\s|TschechischeR?epublik/i

/**
 * Named institutions, which the page-level ordering rule cannot protect.
 *
 * The ordering rule asks whether Czech jurisdiction is named before the first
 * loaded term. That is the right question for a rule or a duty, and the wrong
 * one for an institution: "das Ministerium für Arbeit und Soziales" reads as the
 * German BMAS wherever it appears, even three paragraphs after the page said
 * "in Tschechien", because a German reader takes a bare ministry name to be
 * their own ministry. The same goes for a labour inspectorate or an employment
 * office. So an institution must be qualified AT ITS FIRST MENTION, in the same
 * sentence — not somewhere on the page.
 *
 * The accepted qualifiers include the Czech acronym, because "das MPSV" is
 * unambiguous once introduced and the corpus uses it as the short form.
 */
const INSTITUTIONS = [
  ['Ministerium für Arbeit und Soziales', /tschechisch\w*|MPSV/i],
  ['Arbeitsinspektion', /tschechisch\w*|SÚIP|SUIP/i],
  ['Arbeitsamt', /tschechisch\w*|Úřad práce|Urad prace/i],
  ['Statistikamt', /tschechisch\w*|ČSÚ|CSU/i],
]

/** Concepts exempted, with the reason a reviewer can check. */
const EXEMPT = new Map([
  // ['concept-id', 'why no anchor is needed before the first loaded term'],
])

/**
 * The page in reading order: what the reader meets, in the order they meet it.
 *
 * The TITLE comes first and was previously never inspected — which mattered,
 * because a title is what a search result shows before anything else on the page
 * exists for the reader at all.
 */
const readingOrder = (entry) => {
  const units = [
    ['title', entry.title],
    ['description', entry.description],
    ['intro', entry.intro],
  ]
  entry.sections.forEach((s, i) => {
    units.push([`s${i}.heading`, s.heading])
    s.body.forEach((b, j) => units.push([`s${i}.p${j}`, b]))
    if (s.list) {
      if (s.list.intro) units.push([`s${i}.list.intro`, s.list.intro])
      s.list.items.forEach((it, j) => units.push([`s${i}.list.item${j}`, it]))
    }
  })
  return units
}

export function auditJurisdiction({ corpus } = {}) {
  const errors = []
  const notes = []
  const de = corpus ?? DE

  let checked = 0
  let carryingLoaded = 0
  let anchoredCorrectly = 0

  for (const concept of R.LOCALE_CONCEPTS) {
    if (!concept.published.includes('de')) continue
    const entry = de[concept.id]?.de
    if (!entry) continue
    checked++

    const units = readingOrder(entry)
    let firstLoaded = -1
    let loadedTerm = null
    let loadedWhere = null
    for (let i = 0; i < units.length; i++) {
      const hit = LOADED.find(([term]) => units[i][1] && units[i][1].includes(term))
      if (hit) {
        firstLoaded = i
        loadedTerm = hit[0]
        loadedWhere = units[i][0]
        break
      }
    }
    if (firstLoaded === -1) continue
    carryingLoaded++

    const anchorIdx = units.findIndex(([, text]) => text && ANCHOR.test(text))
    const why = EXEMPT.get(concept.id)

    if (anchorIdx === -1) {
      if (why) notes.push(`de/${concept.id}: unanchored, exempt — ${why}`)
      else
        errors.push(
          `de/${concept.id} (${R.urlFor(concept, 'de')}): uses "${loadedTerm}" at ${loadedWhere} and names no Czech ` +
            `jurisdiction anywhere on the page — a German reader has no way to know which country's rules are meant`,
        )
    } else if (anchorIdx > firstLoaded) {
      if (why) notes.push(`de/${concept.id}: late anchor, exempt — ${why}`)
      else
        errors.push(
          `de/${concept.id} (${R.urlFor(concept, 'de')}): uses "${loadedTerm}" at ${loadedWhere} but the Czech anchor ` +
            `first appears at ${units[anchorIdx][0]} — the loaded term is read before the jurisdiction is given` +
            (loadedWhere === 'description' ? ' (and the description is the search snippet)' : ''),
        )
    } else {
      anchoredCorrectly++
    }

    // An institution must be qualified in the sentence that first names it.
    for (const [name, qualifier] of INSTITUTIONS) {
      const first = units.find(([, text]) => text && text.includes(name))
      if (!first) continue
      if (!qualifier.test(first[1])) {
        const why = EXEMPT.get(concept.id)
        const line =
          `de/${concept.id} (${R.urlFor(concept, 'de')}): first mention of "${name}" at ${first[0]} is unqualified — ` +
          `a German reader takes a bare institution name to be their own; name it as Czech in that sentence`
        if (why) notes.push(`${line} [exempt: ${why}]`)
        else errors.push(line)
      }
    }

    // A softer check, reported as a NOTE rather than an error. A heading is a
    // jump target, a sitelink candidate and the thing a skimming reader reads
    // instead of the paragraph above it, so a loaded term in a heading can be
    // met with no anchor in view even on a page that anchors correctly further
    // up. Not an error, because the page-level rule is already satisfied and
    // failing here would push editors to pad headings.
    for (const [where, text] of units) {
      if (!where.endsWith('heading') || !text) continue
      const hit = LOADED.find(([term]) => text.includes(term))
      if (hit && !ANCHOR.test(text)) {
        notes.push(`de/${concept.id}: heading "${text.slice(0, 60)}" carries "${hit[0]}" with no anchor in the heading itself`)
      }
    }
  }

  notes.push(
    `${checked} German pages checked; ${carryingLoaded} carry a jurisdiction-loaded term; ` +
      `${anchoredCorrectly} anchor Czech law at or before it`,
  )
  return { errors, notes }
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, notes } = auditJurisdiction()
  console.log('German jurisdiction gate')
  for (const n of notes) console.log(`  · ${n}`)
  for (const e of errors) console.log(`  ✗ ${e}`)
  console.log(`\nGerman jurisdiction gate: ${errors.length ? 'FAIL' : 'PASS'}`)
  process.exit(errors.length ? 1 : 0)
}
