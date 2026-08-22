/**
 * Thin-content and near-duplicate gate for the localized corpus.
 *
 * Word-overlap similarity alone is a screen, not a verdict. Two pages about
 * adjacent sectors share a lot of vocabulary — shift, peak, capacity, agency,
 * training — and score high while saying genuinely different things. Warehouse
 * and logistics scored 45.9% and turned out to be entirely distinct.
 *
 * So a high score triggers the test that actually names the defect §23 is
 * about: "same body with noun substitutions". Strip the sector nouns from every
 * sentence in both pages and see how many become identical. A doorway pair
 * collapses into itself; a genuine pair does not.
 *
 * The site's standing disclaimers — the refusal to state wages or counts, and
 * the pointer to official sources — ARE meant to be identical on every page.
 * They are excluded by design; flagging them would train a reader to ignore
 * this gate.
 */
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const reg = await import('../lib/locale/registry.ts')
const EN = (await import('../lib/locale/content/en/index.ts')).EN_CONTENT
const DE = (await import('../lib/locale/content/de/index.ts')).DE_CONTENT

/**
 * Minimum body length — for PROSE pages only.
 *
 * A word count is a reasonable thin-content signal for a guide or an occupation
 * page, and a meaningless one for a contact page, a locale hub or a form page.
 * The request-staff page carries 172 words and a twelve-field form; its
 * substance is the form, which the interactive-parity gate checks instead.
 * Applying one number to every page type would either pass real thin prose or
 * fail pages that are doing their job.
 */
const MIN_WORDS = 180
const PROSE_TYPES = new Set(['guide', 'occupation', 'faq', 'reference', 'service'])
/** Above this, run the noun-substitution test rather than failing outright. */
/**
 * Above this, run the noun-substitution test rather than failing outright.
 *
 * Lowered from 0.40 to 0.25 because at 0.40 the test never executed at all: the
 * real corpus tops out at 38.4% (en, warehouse-workers x logistics-workers) and
 * 32.3% (de), so substitutedSentences() was dead code and the gate silently
 * reduced to a word-count floor plus exact-string H1/intro equality — while its
 * PASS line reported pages as "checked and distinct".
 */
const SIMILARITY_SCREEN = 0.25

/**
 * Above this, the pair fails on overlap alone, whatever the sentence-level
 * tests say.
 *
 * Both other failure paths require EXACT equality — sentences identical after
 * noun-stripping, or every heading shared — so a paraphrase defeats them at any
 * overlap. A reviewer built one: logistics-workers reworded by function-word
 * substitution (the->a, and->plus, with->via) with fresh headings and intro,
 * installed as warehouse-workers. It scored 94.7% and the gate passed it,
 * emitting "checked and distinct".
 *
 * 0.70 sits roughly twice the real corpus maximum, so it cannot fire on genuine
 * sector pages that share vocabulary, and cannot be escaped by rewording —
 * overlap that high is the same page whatever words changed.
 */
const HARD_DUPLICATE = 0.70

/** Identical sentences after noun-stripping, beyond the standing disclaimers. */
const MAX_SUBSTITUTED_SENTENCES = 3

/** Deliberately identical across pages — the site's standing refusals. */
const BOILERPLATE = [
  /no wages and no (vacancy )?counts/i,
  /states no wages/i,
  /current labour-market data is published/i,
  /no figures are stated here/i,
  /löhne und (zahlen|die zahlen)/i,
  /aktuelle arbeitsmarktdaten veröffentlichen/i,
  /zahlen nennen wir hier nicht/i,
  /praktischer rahmen/i,
  /practical framework a company fills/i,
]

const words = (s) => s.toLowerCase().replace(/[^a-z0-9äöüß ]/g, ' ').split(/\s+/).filter((w) => w.length > 3)
const jaccard = (a, b) => {
  const A = new Set(words(a))
  const B = new Set(words(b))
  const inter = [...A].filter((x) => B.has(x)).length
  return inter / (A.size + B.size - inter)
}

/** Sentences that become identical once concept-specific nouns are removed. */
function substitutedSentences(a, b, nounsA, nounsB) {
  const nouns = new RegExp([...nounsA, ...nounsB].filter(Boolean).join('|'), 'gi')
  const norm = (s) => s.toLowerCase().replace(nouns, '§').replace(/[^a-z0-9§ ]/g, ' ').replace(/\s+/g, ' ').trim()
  const split = (t) => t.flatMap((p) => p.split(/(?<=\.)\s+/)).filter((s) => s.length > 40)
  const out = []
  for (const x of split(a)) {
    for (const y of split(b)) {
      if (norm(x) === norm(y) && !BOILERPLATE.some((re) => re.test(x))) out.push(x)
    }
  }
  return out
}

const bodyOf = (entry) => [entry.intro, ...entry.sections.flatMap((s) => [s.heading, ...s.body])]

/**
 * @param {{en?: object, de?: object}} [corpora] override for the corpora audited.
 *
 * The real corpora are the default. This seam exists so a mutation suite can
 * feed the gate a deliberately doorway-shaped corpus and require it to fail.
 * Without it there was no way to damage the input short of editing shipped
 * content — which is exactly why this gate went un-negative-controlled while
 * the language audit claimed a control existed.
 */
export function auditDuplicates(corpora) {
  const enCorpus = corpora?.en ?? EN
  const deCorpus = corpora?.de ?? DE
  const errors = []
  const notes = []
  for (const [locale, corpus] of [['en', enCorpus], ['de', deCorpus]]) {
    const docs = []
    for (const concept of reg.LOCALE_CONCEPTS) {
      const entry = corpus[concept.id]?.[locale]
      if (!entry) continue
      docs.push({
        id: concept.id,
        pageType: concept.pageType,
        h1: entry.h1,
        intro: entry.intro,
        headings: entry.sections.map((s) => s.heading),
        body: bodyOf(entry),
        text: bodyOf(entry).join(' '),
        nouns: concept.id.split('-').filter((w) => w.length > 3),
      })
    }
    for (const d of docs) {
      if (!PROSE_TYPES.has(d.pageType)) continue
      const n = d.text.split(/\s+/).filter(Boolean).length
      if (n < MIN_WORDS) errors.push(`${locale}/${d.id} (${d.pageType}): thin — ${n} words, below ${MIN_WORDS}`)
    }
    notes.push(`${locale}: ${docs.filter((d) => PROSE_TYPES.has(d.pageType)).length} prose pages length-checked; ` +
      `${docs.filter((d) => !PROSE_TYPES.has(d.pageType)).length} hub/utility/tool pages exempt by type`)
    for (let i = 0; i < docs.length; i++) {
      for (let j = i + 1; j < docs.length; j++) {
        const a = docs[i]
        const b = docs[j]
        if (a.h1 === b.h1) errors.push(`${locale}: ${a.id} and ${b.id} share an H1`)
        if (a.intro === b.intro) errors.push(`${locale}: ${a.id} and ${b.id} share an intro`)
        const sim = jaccard(a.text, b.text)
        if (sim < SIMILARITY_SCREEN) continue
        // High overlap — now find out whether it is doorway content.
        const subs = substitutedSentences(a.body, b.body, a.nouns, b.nouns)
        const sharedHeadings = a.headings.filter((h) => b.headings.includes(h))
        if (sim >= HARD_DUPLICATE) {
          errors.push(
            `${locale}: ${a.id} and ${b.id} overlap ${(sim * 100).toFixed(1)}% — above ${(HARD_DUPLICATE * 100).toFixed(0)}% ` +
              `two pages are the same page however the words differ, so this fails on magnitude and does not ` +
              `depend on sentences matching exactly`,
          )
        } else if (subs.length > MAX_SUBSTITUTED_SENTENCES) {
          errors.push(
            `${locale}: ${a.id} and ${b.id} overlap ${(sim * 100).toFixed(1)}% AND ${subs.length} sentences ` +
              `become identical once concept nouns are removed — this is noun substitution, not two pages. ` +
              `First: "${subs[0].slice(0, 90)}"`,
          )
        } else if (sharedHeadings.length === a.headings.length && a.headings.length === b.headings.length) {
          errors.push(
            `${locale}: ${a.id} and ${b.id} overlap ${(sim * 100).toFixed(1)}% and have an identical heading structure`,
          )
        } else {
          notes.push(
            `${locale}: ${a.id} ↔ ${b.id} overlap ${(sim * 100).toFixed(1)}% — checked and distinct ` +
              `(${subs.length} substituted sentence(s), ${sharedHeadings.length}/${a.headings.length} shared headings)`,
          )
        }
      }
    }
    notes.push(`${locale}: ${docs.length} localized pages screened`)
  }
  return { errors, notes }
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, notes } = auditDuplicates()
  console.log('Locale duplicate-content gate')
  for (const n of notes) console.log(`  · ${n}`)
  if (errors.length) {
    console.error(`\n${errors.length} violation(s):`)
    for (const e of errors) console.error(`  ✗ ${e}`)
    console.error('\nLocale duplicate-content gate: FAIL')
    process.exit(1)
  }
  console.log('\nLocale duplicate-content gate: PASS')
}
