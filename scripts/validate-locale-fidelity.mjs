/**
 * Source-fidelity gate for the localized corpus.
 *
 * WHY THIS EXISTS. The Czech source pages carry bulleted lists on their
 * sections. The localized content type had no field able to hold a list, so when
 * the English and German pages were authored every bulleted block was folded
 * into prose or dropped. An audit of all 38 L1 concepts found 240 load-bearing
 * items gone and 138 places where a heading or meta description still announced
 * what the body no longer delivered.
 *
 * Nothing caught it, because every existing gate checked the localized corpus
 * against ITSELF — thin content, duplicates, hreflang, routing. A page can
 * satisfy all of them while quietly saying less than the page it translates.
 *
 * ── THE MAP DOES NOT DEFINE ITS OWN SCOPE ──────────────────────────────────
 *
 * The classification lives in docs/locale-source-map.json. This gate does NOT
 * trust it as the inventory of what exists. scripts/locale-source-inventory.mjs
 * derives the real set of structured Czech source items straight from
 * lib/content/pages/*.ts, and the two sets must be EQUAL — in both directions.
 *
 * That asymmetry matters. A map allowed to describe its own scope is complete by
 * omission: drop an inconvenient item and the file is still internally
 * consistent, still passes, and the item is gone leaving no trace. That is
 * exactly how 240 items disappeared while every gate stayed green.
 *
 * Item identity is ownership plus content:
 *     <conceptId> | <sourceExport> | s<section>.b<bullet> | <8-char text hash>
 * so reordering a section, editing a bullet or swapping two bullets changes the
 * identity and forces the decision to be made again rather than inherited.
 *
 * ── THE FOUR STATES ────────────────────────────────────────────────────────
 *
 *   PRESERVED_IN_PROSE   carried by named prose on the localized page
 *   PRESERVED_IN_LIST    carried by a named item of a real list
 *   INTENTIONALLY_COLLAPSED_WITHOUT_MEANING_LOSS
 *                        folded on purpose — and it must still POINT AT the
 *                        localized text carrying the same meaning. "Redundant"
 *                        or "covered elsewhere" is an assertion, not evidence;
 *                        a collapse claim that names nothing is indistinguishable
 *                        from a silent drop, which is the thing being prevented.
 *   MISSING              the meaning is not there
 *
 * Every state except MISSING must name concrete localized evidence, and this
 * gate verifies that evidence exists in the corpus AND reaches the rendered
 * HTML. A confident claim pointing at text that is not there fails exactly like
 * an honest MISSING.
 *
 * There is no threshold anywhere in this file — no coverage ratio, no word-count
 * comparison. The corpus sat at 86.6% of Czech word volume while missing 240
 * items, so volume was never evidence. A number can be tuned until the corpus
 * passes; a per-item map that must point at real text cannot.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { buildInventory, normalise } from './locale-source-inventory.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const BUILD = path.join(ROOT, '.next/server/pages')
const MAP_FILE = path.join(ROOT, 'docs/locale-source-map.json')

const R = await import('../lib/locale/registry.ts')
const EN = (await import('../lib/locale/content/en/index.ts')).EN_CONTENT
const DE = (await import('../lib/locale/content/de/index.ts')).DE_CONTENT
const { L1_CONCEPTS } = await import('../lib/locale/l1-concepts.ts')

const L1_IDS = new Set(L1_CONCEPTS.map((c) => c.id))

const STATES = new Set([
  'PRESERVED_IN_PROSE',
  'PRESERVED_IN_LIST',
  'INTENTIONALLY_COLLAPSED_WITHOUT_MEANING_LOSS',
  'MISSING',
])
const NEEDS_EVIDENCE = new Set([
  'PRESERVED_IN_PROSE',
  'PRESERVED_IN_LIST',
  'INTENTIONALLY_COLLAPSED_WITHOUT_MEANING_LOSS',
])
const MIN_REASON = 25

const readRouteHtml = (route) => {
  const rel = route === '/' ? 'index' : route.replace(/^\//, '')
  const f = path.join(BUILD, `${rel}.html`)
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null
}

const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ')

export function auditFidelity({ corpora, readPage = readRouteHtml, map } = {}) {
  const errors = []
  const notes = []
  const l0Debt = []
  const en = corpora?.en ?? EN
  const de = corpora?.de ?? DE

  // 1. The inventory, derived independently of the map.
  const inv = buildInventory()
  for (const d of inv.duplicates) {
    errors.push(
      `${d.conceptId}: duplicate source identity — ${d.refs.join(' and ')} carry identical text, ` +
        `so one classification cannot honestly cover both: "${normalise(d.cs).slice(0, 60)}"`,
    )
  }

  let sourceMap = map
  if (!sourceMap) {
    if (!fs.existsSync(MAP_FILE)) {
      return { errors: [`no source map at docs/locale-source-map.json — ${inv.items.length} source items are unclassified`], notes: [], l0Debt: [] }
    }
    sourceMap = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'))
  }

  // 2. SET EQUALITY, both directions. The map may not define its own scope.
  const actualIds = new Set(inv.items.map((i) => i.id))
  const byId = new Map(inv.items.map((i) => [i.id, i]))
  const mappedIds = new Map()
  for (const [conceptId, rec] of Object.entries(sourceMap)) {
    for (const [id, entry] of Object.entries(rec.items ?? {})) {
      if (mappedIds.has(id)) errors.push(`source map maps ${id} more than once`)
      mappedIds.set(id, { conceptId, entry })
    }
  }

  const missingFromMap = [...actualIds].filter((id) => !mappedIds.has(id))
  const staleInMap = [...mappedIds.keys()].filter((id) => !actualIds.has(id))
  for (const id of missingFromMap) {
    const it = byId.get(id)
    errors.push(`source item absent from the map: ${id} — "${normalise(it.cs).slice(0, 60)}"`)
  }
  for (const id of staleInMap) {
    errors.push(`stale map item absent from the Czech source: ${id} (source edited or reordered — reclassify, do not inherit)`)
  }
  if (!missingFromMap.length && !staleInMap.length) {
    notes.push(`set equality holds: ${actualIds.size} Czech source items, ${mappedIds.size} mapped, both directions equal`)
  }

  // 3. Per-item classification.
  const tally = { PRESERVED_IN_PROSE: 0, PRESERVED_IN_LIST: 0, INTENTIONALLY_COLLAPSED_WITHOUT_MEANING_LOSS: 0, MISSING: 0 }
  let pairsChecked = 0
  const evidenceUse = new Map() // conceptId|locale|evidence -> [ids]

  for (const item of inv.items) {
    const mapped = mappedIds.get(item.id)
    if (!mapped) continue
    const concept = R.LOCALE_CONCEPTS.find((c) => c.id === item.conceptId)
    if (!concept) continue
    if (mapped.conceptId !== item.conceptId) {
      errors.push(`${item.id}: filed in the map under concept "${mapped.conceptId}" but owned by "${item.conceptId}"`)
      continue
    }
    const locales = concept.published.filter((l) => l !== 'cs')

    for (const l of locales) {
      pairsChecked++
      const record = mapped.entry?.[l]
      const state = record?.state
      if (!state) { errors.push(`${item.id} [${l}]: no state recorded`); continue }
      if (!STATES.has(state)) { errors.push(`${item.id} [${l}]: unknown state "${state}"`); continue }
      tally[state]++

      if (state === 'MISSING') {
        const line = `${item.id} [${l}]: MISSING — Czech source says "${normalise(item.cs).slice(0, 70)}" and the ${l} page does not`
        if (L1_IDS.has(item.conceptId)) errors.push(line)
        else l0Debt.push(line)
        continue
      }

      // Evidence is required for every non-MISSING state, collapse included.
      const evidence = record?.carriedBy
      if (!evidence || !normalise(evidence)) {
        errors.push(
          `${item.id} [${l}]: ${state} but names no localized text carrying it — a claim without a pointer is` +
            ` indistinguishable from a silent drop`,
        )
        continue
      }
      if (state === 'INTENTIONALLY_COLLAPSED_WITHOUT_MEANING_LOSS') {
        const reason = normalise(record?.reason ?? '')
        if (reason.length < MIN_REASON) {
          errors.push(`${item.id} [${l}]: collapsed without an argued reason (${reason.length} chars)`)
          continue
        }
      }

      const entry = (l === 'en' ? en : de)[item.conceptId]?.[l]
      if (!entry) { errors.push(`${item.id} [${l}]: classified but the ${l} page does not exist`); continue }

      const listTexts = entry.sections.flatMap((s) => (s.list ? [s.list.intro ?? '', ...s.list.items] : []))
      const proseTexts = [entry.description, entry.intro, ...entry.sections.flatMap((s) => [s.heading, ...s.body])]
      const needle = normalise(evidence)
      const inList = listTexts.some((x) => normalise(x).includes(needle))
      const inProse = proseTexts.some((x) => normalise(x).includes(needle))

      if (state === 'PRESERVED_IN_LIST' && !inList) {
        errors.push(`${item.id} [${l}]: claims PRESERVED_IN_LIST but no list item carries "${needle.slice(0, 60)}"`)
        continue
      }
      if (state !== 'PRESERVED_IN_LIST' && !inProse && !inList) {
        errors.push(`${item.id} [${l}]: claims ${state} but no text on the page carries "${needle.slice(0, 60)}"`)
        continue
      }

      // Two items resting on one sentence is possible but must be deliberate.
      const key = `${item.conceptId}|${l}|${needle}`
      const prior = evidenceUse.get(key)
      // sharedEvidence must be argued, not merely asserted. It is the one way to
      // silence this check, so an unreasoned flag would turn the check into an
      // opt-out — and a compound FAQ answer resting on one sentence is exactly
      // the case where "why" is the whole question.
      if (prior && record.sharedEvidence && normalise(record.reason ?? '').length < MIN_REASON) {
        errors.push(
          `${item.id} [${l}]: sharedEvidence set without an argued reason — say what this item contributes ` +
            `beyond ${prior}, and where the rest of it is carried`,
        )
      }
      if (prior && !record.sharedEvidence) {
        errors.push(
          `${item.id} [${l}]: rests on the same localized text as ${prior} — if one sentence genuinely carries both,` +
            ` set "sharedEvidence": true on each, so it is a decision rather than an accident`,
        )
      } else if (!prior) evidenceUse.set(key, item.id)

      // And it must reach the reader, not merely the data.
      const route = R.urlFor(concept, l)
      const html = route ? readPage(route) : null
      if (!html) continue
      if (!normalise(decode(html.replace(/<script[\s\S]*?<\/script>/g, ''))).includes(needle)) {
        errors.push(`${item.id} [${l}]: evidence absent from the rendered ${route} — "${needle.slice(0, 60)}"`)
      }
    }
  }

  // 4. Structural sanity on declared lists, independent of the map.
  for (const [locale, corpus] of [['en', en], ['de', de]]) {
    for (const concept of R.LOCALE_CONCEPTS) {
      const entry = corpus[concept.id]?.[locale]
      if (!entry || !concept.published.includes(locale)) continue
      for (const s of entry.sections) {
        if (!s.list) continue
        if (!s.list.items.length) errors.push(`${locale}/${concept.id}: declares an empty list under "${s.heading}"`)
        if (s.list.items.some((i) => !normalise(i))) errors.push(`${locale}/${concept.id}: list contains an empty item`)
        const seen = new Set()
        for (const i of s.list.items) {
          if (seen.has(i)) errors.push(`${locale}/${concept.id}: list repeats an item — "${normalise(i).slice(0, 50)}"`)
          seen.add(i)
        }
      }
    }
  }

  notes.push(`${pairsChecked} source-item/locale pairs classified across ${inv.byConcept.size} concepts`)
  notes.push(
    `states — in list: ${tally.PRESERVED_IN_LIST}, in prose: ${tally.PRESERVED_IN_PROSE}, ` +
      `collapsed with evidence: ${tally.INTENTIONALLY_COLLAPSED_WITHOUT_MEANING_LOSS}, MISSING: ${tally.MISSING}`,
  )
  if (inv.conceptsWithoutSource.length) {
    notes.push(`no Czech source page (nothing to classify): ${inv.conceptsWithoutSource.map((c) => c.conceptId).join(', ')}`)
  }
  return { errors, notes, l0Debt }
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, notes, l0Debt } = auditFidelity()
  console.log('Locale source-fidelity gate')
  for (const n of notes) console.log(`  · ${n}`)
  for (const e of errors.slice(0, 60)) console.log(`  ✗ ${e}`)
  if (errors.length > 60) console.log(`  … and ${errors.length - 60} more`)
  if (l0Debt.length) {
    console.log('')
    console.log(`  PRE-EXISTING L0 DEBT — recorded, not fixed by this pass (${l0Debt.length}):`)
    for (const d of l0Debt) console.log(`    ! ${d}`)
    console.log('    These are outside the L1 corrective scope and need a separate decision.')
    console.log('    They are reported rather than exempted so they cannot be forgotten.')
  }
  console.log(`\nLocale source-fidelity gate: ${errors.length ? 'FAIL' : 'PASS'}`)
  process.exit(errors.length ? 1 : 0)
}
