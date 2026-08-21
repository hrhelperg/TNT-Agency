/**
 * Mutation tests for the locale source-fidelity gate.
 *
 * The defect this gate exists for survived a whole release: localized pages that
 * had quietly dropped 240 load-bearing items from their Czech sources while
 * passing every other gate. So this suite damages the map, the corpus and the
 * built HTML in the exact shapes that defect takes, and requires a failure each
 * time.
 *
 * Four directions, because there are four ways to lie to this gate:
 *   - the MAP can claim a state that is not true
 *   - the MAP can quietly omit an item, making itself complete by subtraction
 *   - the CORPUS can stop carrying what the map says it carries
 *   - the HTML can stop rendering what the corpus declares
 *
 * The second is the one that matters most and the one a naive gate misses. A
 * gate that iterates the map can never notice something the map does not
 * mention; this gate iterates the INDEPENDENT inventory instead, so an omission
 * is a failure rather than a silence.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { auditFidelity } from './validate-locale-fidelity.mjs'
import { buildInventory } from './locale-source-inventory.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const BUILD = path.join(ROOT, '.next/server/pages')
const MAP_FILE = path.join(ROOT, 'docs/locale-source-map.json')

const R = await import('../lib/locale/registry.ts')
const EN = (await import('../lib/locale/content/en/index.ts')).EN_CONTENT
const DE = (await import('../lib/locale/content/de/index.ts')).DE_CONTENT

if (!fs.existsSync(MAP_FILE)) {
  console.error('CONTROL FAILED — docs/locale-source-map.json does not exist, so there is no classification to damage.')
  process.exit(1)
}
const MAP = JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'))
const clone = (o) => JSON.parse(JSON.stringify(o))

const realHtml = (route) => {
  const rel = route === '/' ? 'index' : route.replace(/^\//, '')
  const f = path.join(BUILD, `${rel}.html`)
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null
}
const damage = (targetRoute, mutate) => (route) => {
  const html = realHtml(route)
  if (html === null || route !== targetRoute) return html
  return mutate(html)
}

const { L1_CONCEPTS } = await import('../lib/locale/l1-concepts.ts')
const L1_IDS = new Set(L1_CONCEPTS.map((c) => c.id))

/**
 * Locate a mapped item in a given state so the suite adapts to the real map.
 *
 * Restricted to L1 concepts on purpose. MISSING on an L0 concept is routed to
 * the recorded pre-existing-debt list rather than to errors, so a mutation
 * targeting one would flip a state and see the gate stay green — reporting a
 * broken gate when the gate is behaving exactly as specified. The suite must
 * damage the scope the gate actually blocks on.
 */
const find = (predicate) => {
  for (const [conceptId, rec] of Object.entries(MAP)) {
    if (!L1_IDS.has(conceptId)) continue
    for (const [id, entry] of Object.entries(rec.items ?? {})) {
      if (predicate(entry)) return { conceptId, id, entry }
    }
  }
  return null
}

const anyPreserved = find((e) => e.en?.carriedBy && (e.en.state === 'PRESERVED_IN_PROSE' || e.en.state === 'PRESERVED_IN_LIST'))
const anyList = find((e) => e.en?.state === 'PRESERVED_IN_LIST' && e.en.carriedBy)
const anyCollapsed = find((e) => e.en?.state === 'INTENTIONALLY_COLLAPSED_WITHOUT_MEANING_LOSS')

if (!anyPreserved) {
  console.error('CONTROL FAILED — the map records no preserved English item with evidence; nothing here can be tested.')
  process.exit(1)
}

const editEntry = (conceptId, id, locale, fn) => {
  const next = clone(MAP)
  next[conceptId].items[id][locale] = fn(next[conceptId].items[id][locale])
  return next
}

const conceptOf = (id) => R.LOCALE_CONCEPTS.find((c) => c.id === id)
const routeOf = (conceptId, l) => R.urlFor(conceptOf(conceptId), l)

/** Remove the carrying text from the corpus while the map still claims it. */
const scrubCarrier = (conceptId, locale, carriedBy) => {
  const corpus = clone(locale === 'en' ? EN : DE)
  const e = corpus[conceptId][locale]
  const strip = (s) => s.split(carriedBy).join('[removed]')
  corpus[conceptId][locale] = {
    ...e,
    description: strip(e.description),
    intro: strip(e.intro),
    sections: e.sections.map((s) => ({
      ...s,
      heading: strip(s.heading),
      body: s.body.map(strip),
      ...(s.list ? { list: { ...s.list, intro: s.list.intro ? strip(s.list.intro) : undefined, items: s.list.items.map(strip) } } : {}),
    })),
  }
  return corpus
}

const MUTATIONS = [
  {
    name: `1. an item is reclassified MISSING`,
    args: () => ({ map: editEntry(anyPreserved.conceptId, anyPreserved.id, 'en', (x) => ({ state: 'MISSING' })) }),
    expect: /MISSING — Czech source says/,
  },
  {
    name: `2. an item is DELETED from the map — completeness by subtraction`,
    args: () => {
      const next = clone(MAP)
      delete next[anyPreserved.conceptId].items[anyPreserved.id]
      return { map: next }
    },
    expect: /source item absent from the map/,
  },
  {
    name: `3. the whole concept is dropped from the map`,
    args: () => {
      const next = clone(MAP)
      delete next[anyPreserved.conceptId]
      return { map: next }
    },
    expect: /source item absent from the map/,
  },
  {
    name: `4. a stale item lingers after the Czech source changed`,
    args: () => {
      const next = clone(MAP)
      next[anyPreserved.conceptId].items[`${anyPreserved.conceptId}|GHOST|s9.b9|deadbeef`] = { en: { state: 'PRESERVED_IN_PROSE', carriedBy: 'x' }, de: { state: 'PRESERVED_IN_PROSE', carriedBy: 'x' } }
      return { map: next }
    },
    expect: /stale map item absent from the Czech source/,
  },
  {
    name: `5. a preserved item points at text that does not exist`,
    args: () => ({ map: editEntry(anyPreserved.conceptId, anyPreserved.id, 'en', (x) => ({ ...x, carriedBy: 'a sentence that appears nowhere in this corpus at all' })) }),
    expect: /but no (text on the page|list item) carries/,
  },
  {
    name: `6. a preserved item names no evidence at all`,
    args: () => ({ map: editEntry(anyPreserved.conceptId, anyPreserved.id, 'en', ({ carriedBy, ...rest }) => rest) }),
    expect: /names no localized text carrying it/,
  },
  {
    name: `7. the corpus stops carrying what the map says it carries`,
    args: () => ({ corpora: { en: scrubCarrier(anyPreserved.conceptId, 'en', anyPreserved.entry.en.carriedBy), de: DE } }),
    expect: /but no (text on the page|list item) carries/,
  },
  {
    name: `8. the rendered page drops the evidence while data and map agree`,
    args: () => ({ readPage: damage(routeOf(anyPreserved.conceptId, 'en'), (h) => h.split(anyPreserved.entry.en.carriedBy).join('[removed]')) }),
    expect: /evidence absent from the rendered/,
  },
]

if (anyList) {
  MUTATIONS.push({
    name: `9. a whole list is stripped while the map still claims PRESERVED_IN_LIST`,
    args: () => {
      const corpus = clone(EN)
      const e = corpus[anyList.conceptId].en
      corpus[anyList.conceptId].en = { ...e, sections: e.sections.map(({ list, ...rest }) => rest) }
      return { corpora: { en: corpus, de: DE } }
    },
    expect: /claims PRESERVED_IN_LIST but no list item carries/,
  })
  MUTATIONS.push({
    name: `10. one single list item is removed from the rendered page`,
    args: () => {
      const carrier = anyList.entry.en.carriedBy
      const esc = carrier.slice(0, 40).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      return { readPage: damage(routeOf(anyList.conceptId, 'en'), (h) => h.replace(new RegExp(`<li>[\\s\\S]*?${esc}[\\s\\S]*?</li>`), '')) }
    },
    expect: /evidence absent from the rendered/,
  })
}

if (anyCollapsed) {
  MUTATIONS.push({
    name: `11. a collapse claim is stripped of its pointer, leaving only prose reasoning`,
    args: () => ({ map: editEntry(anyCollapsed.conceptId, anyCollapsed.id, 'en', ({ carriedBy, ...rest }) => ({ ...rest, reason: 'Redundant — this is covered elsewhere on the page.' })) }),
    expect: /names no localized text carrying it/,
  })
  MUTATIONS.push({
    name: `12. a collapse claim keeps its pointer but drops the argued reason`,
    args: () => ({ map: editEntry(anyCollapsed.conceptId, anyCollapsed.id, 'en', (x) => ({ ...x, reason: 'redundant' })) }),
    expect: /collapsed without an argued reason/,
  })
}

// Two source items resting on one sentence without saying so.
const twoInOne = (() => {
  for (const [conceptId, rec] of Object.entries(MAP)) {
    if (!L1_IDS.has(conceptId)) continue
    const preserved = Object.entries(rec.items ?? {}).filter(([, e]) => e.en?.carriedBy && e.en.state !== 'MISSING')
    if (preserved.length >= 2) return { conceptId, a: preserved[0], b: preserved[1] }
  }
  return null
})()
if (twoInOne) {
  MUTATIONS.push({
    name: `13. two source items are pointed at the same sentence without declaring it`,
    args: () => {
      const next = clone(MAP)
      next[twoInOne.conceptId].items[twoInOne.a[0]].en.carriedBy = twoInOne.b[1].en.carriedBy
      delete next[twoInOne.conceptId].items[twoInOne.a[0]].en.sharedEvidence
      delete next[twoInOne.conceptId].items[twoInOne.b[0]].en.sharedEvidence
      return { map: next }
    },
    expect: /rests on the same localized text as/,
  })
}

console.log('Mutation tests: locale source-fidelity gate\n')

let caught = 0
const failures = []

const control = auditFidelity()
if (control.errors.length) {
  console.error('CONTROL FAILED — the real corpus, map and build do not pass the gate:')
  for (const e of control.errors.slice(0, 15)) console.error(`    ${e}`)
  process.exit(1)
}
console.log('  ✓ control: the real corpus, source map and build pass')

const inv = buildInventory()
console.log(`  · inventory derived independently: ${inv.items.length} source items across ${inv.byConcept.size} concepts`)

for (const m of MUTATIONS) {
  const { errors } = auditFidelity(m.args())
  const hit = errors.find((e) => m.expect.test(e))
  if (hit) {
    caught++
    console.log(`  ✓ ${m.name}`)
    console.log(`      → ${hit.slice(0, 130)}`)
  } else {
    failures.push(`${m.name}\n      expected /${m.expect.source}/\n      got: ${errors.slice(0, 2).join(' | ') || '(no errors at all)'}`)
    console.log(`  ✗ ${m.name}`)
  }
}

const noop = auditFidelity({ corpora: { en: EN, de: DE }, map: MAP, readPage: (r) => realHtml(r) })
if (noop.errors.length) {
  failures.push(`negative control: injecting the REAL corpus, map and HTML produced ${noop.errors.length} error(s)`)
} else {
  console.log('  ✓ negative control: injecting the real corpus, map and HTML changes nothing')
}

if (failures.length) {
  console.error(`\nMutation tests: FAIL — ${failures.length} gate(s) did not catch their defect`)
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log(`\nMutation tests: PASS — ${caught} defects caught, control + negative control correct`)
