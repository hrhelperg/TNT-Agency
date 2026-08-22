/**
 * The independent inventory of structured Czech source items.
 *
 * This module exists so that NOTHING downstream has to take the source map's
 * word for what the Czech corpus contains. The map is a record of decisions; it
 * must never also be the record of what there was to decide about. A map that
 * defines its own scope can be complete by omission — drop an inconvenient item
 * and the map is still internally consistent, still passes, and the item is gone
 * with no trace. That is precisely the failure mode of the release this whole
 * corrective pass is repairing, where 240 items vanished and every gate stayed
 * green because every gate consulted the localized corpus about itself.
 *
 * So the inventory is derived here, from lib/content/pages/*.ts, and the
 * validator asserts SET EQUALITY between this and the map.
 *
 * IDENTITY. An item's identity is its ownership, not its position:
 *
 *     <conceptId> | <sourceExport> | s<section>.b<bullet> | <8-char text hash>
 *
 * The concept and the exported source object say who owns it. The section/bullet
 * index says where it sits. The hash of the normalised text says what it is —
 * so reordering a source section, editing a bullet's wording, or swapping two
 * bullets all change the identity and force the classification to be revisited
 * rather than silently inherited. That is the intended behaviour: if the Czech
 * page changes, a decision about what its English page does with it is no longer
 * evidence of anything.
 */
import crypto from 'node:crypto'

const PAGES = await import('../lib/content/pages/index.ts')
const R = await import('../lib/locale/registry.ts')

export const normalise = (s) => String(s).replace(/\s+/g, ' ').trim()
export const textHash = (s) => crypto.createHash('sha1').update(normalise(s), 'utf8').digest('hex').slice(0, 8)

/**
 * Every exported Czech page object, indexed by slug, with the export name kept
 * so an item's identity records which file owns it.
 */
export function czechSourcePages() {
  const bySlug = new Map()
  const seen = new Set()
  const walk = (value, exportName) => {
    if (!value || typeof value !== 'object' || seen.has(value)) return
    seen.add(value)
    if (Array.isArray(value)) return void value.forEach((v) => walk(v, exportName))
    if (typeof value.slug === 'string' && Array.isArray(value.sections)) {
      bySlug.set(`/${value.slug.replace(/^\//, '')}`, { page: value, exportName })
    }
    Object.values(value).forEach((v) => walk(v, exportName))
  }
  for (const [exportName, value] of Object.entries(PAGES)) walk(value, exportName)
  return bySlug
}

/**
 * The structured items of one source page: its section bullets AND its FAQ.
 *
 * Both are structure the localized content model cannot hold — `LocaleSection`
 * gained a list, but `LocalePageContent` still has no `faq` field — which makes
 * them exactly the category this machinery exists to catch.
 *
 * FAQ was missing here at first, and that was the same defect the inventory was
 * built to prevent, committed by the inventory itself: 183 q/a pairs across 43
 * in-scope concepts never entered the set-equality assertion, so they could
 * never be reported MISSING, while the gate's headline read "451 Czech source
 * items, 451 mapped, both directions equal" as though that were total coverage.
 * A scope that quietly excludes a category is complete by construction and
 * proves nothing. On employer-faq — a concept whose entire purpose is a Q&A hub
 * — the excluded FAQ (6 entries) outnumbered the included bullets (5).
 *
 * Body paragraphs remain out of scope, and that exclusion is different in kind:
 * they are prose on both sides, the localized model CAN hold them, and the
 * announcement-gap and reconciliation passes cover them. Structure with no
 * localized representation is what belongs here.
 */
export function itemsForPage(conceptId, entry) {
  const { page, exportName } = entry
  const items = []
  page.sections.forEach((section, si) => {
    ;(section.bullets ?? []).forEach((bullet, bi) => {
      const ref = `s${si}.b${bi}`
      items.push({
        id: `${conceptId}|${exportName}|${ref}|${textHash(bullet)}`,
        conceptId,
        exportName,
        ref,
        sectionHeading: section.heading,
        cs: bullet,
        hash: textHash(bullet),
      })
    })
  })
  // Page-level FAQ. Identified as f<index> and carrying the question and answer
  // together, because the answer is the load-bearing half and a classification
  // that pointed only at a matching question would certify nothing.
  ;(page.faq ?? []).forEach((entryFaq, fi) => {
    const ref = `f${fi}`
    const cs = `${entryFaq.q} ${entryFaq.a}`
    items.push({
      id: `${conceptId}|${exportName}|${ref}|${textHash(cs)}`,
      conceptId,
      exportName,
      ref,
      sectionHeading: 'FAQ',
      cs,
      question: entryFaq.q,
      answer: entryFaq.a,
      hash: textHash(cs),
    })
  })
  return items
}

/**
 * The full inventory across every concept that has a Czech source page.
 *
 * Returns { items, byConcept, duplicates, conceptsWithoutSource }.
 * `duplicates` records source items whose normalised text repeats inside one
 * page: two identical bullets are two decisions, and an identity that cannot
 * tell them apart would let one classification cover both.
 */
export function buildInventory({ concepts = R.LOCALE_CONCEPTS } = {}) {
  const bySlug = czechSourcePages()
  const items = []
  const byConcept = new Map()
  const duplicates = []
  const conceptsWithoutSource = []

  for (const concept of concepts) {
    const localized = concept.published.filter((l) => l !== 'cs')
    if (!localized.length) continue
    const entry = bySlug.get(concept.csPrimary)
    if (!entry) {
      conceptsWithoutSource.push({ conceptId: concept.id, csPrimary: concept.csPrimary })
      continue
    }
    const own = itemsForPage(concept.id, entry)

    const byHash = new Map()
    for (const it of own) {
      const prior = byHash.get(it.hash)
      if (prior) duplicates.push({ conceptId: concept.id, refs: [prior.ref, it.ref], cs: it.cs })
      else byHash.set(it.hash, it)
    }

    items.push(...own)
    byConcept.set(concept.id, own)
  }

  return { items, byConcept, duplicates, conceptsWithoutSource }
}

/** Convenience for humans and for generating a map skeleton. */
const invokedDirectly = process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop())
if (invokedDirectly) {
  const inv = buildInventory()
  const wantJson = process.argv.includes('--json')
  if (wantJson) {
    console.log(JSON.stringify(inv.items, null, 1))
  } else {
    console.log('Independent Czech source inventory')
    console.log(`  concepts with a source page : ${inv.byConcept.size}`)
    console.log(`  structured source items     : ${inv.items.length}`)
    console.log(`  concepts without a source   : ${inv.conceptsWithoutSource.length}` +
      (inv.conceptsWithoutSource.length ? ` (${inv.conceptsWithoutSource.map((c) => c.conceptId).join(', ')})` : ''))
    console.log(`  duplicate source identities : ${inv.duplicates.length}`)
    for (const d of inv.duplicates) console.log(`    ! ${d.conceptId} ${d.refs.join(' == ')} — "${normalise(d.cs).slice(0, 60)}"`)
  }
}
