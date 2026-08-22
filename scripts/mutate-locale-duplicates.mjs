/**
 * Mutation tests for the locale duplicate-content gate.
 *
 * This suite exists because its absence was shipped as a claim. The language
 * audit stated, in the present tense, that the duplicate gate "rewrites one page
 * as a noun-substituted copy of another and requires the gate to fail: it
 * reports 98.6% overlap and 15 substituted sentences." No such control existed
 * anywhere in the repository — the numbers were real, produced once by hand, and
 * then described as if they were a test. An independent reviewer reproduced them
 * from the gate's own code and found nothing shipped.
 *
 * A gate that passes proves nothing on its own. Each mutation below damages the
 * corpus in the exact shape of a defect the gate claims to catch, and requires a
 * matching error. The control asserts the real corpus passes, so a gate that
 * fails everything scores zero.
 *
 * Mutations act on a CLONED corpus, never on shipped content.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { auditDuplicates } from './validate-locale-duplicates.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const EN = (await import('../lib/locale/content/en/index.ts')).EN_CONTENT
const DE = (await import('../lib/locale/content/de/index.ts')).DE_CONTENT

/** Deep clone so a mutation can never reach the imported corpus. */
const clone = (o) => JSON.parse(JSON.stringify(o))

/**
 * Rewrite `donor`'s content as `victim`'s, swapping the donor's sector nouns for
 * the victim's. This is the doorway defect in its purest form: one page, cloned,
 * with the nouns changed — which is what a template farm actually looks like.
 */
const nounSubstitutedClone = (corpus, locale, victimId, donorId, swaps) => {
  const next = clone(corpus)
  const donor = next[donorId]?.[locale]
  if (!donor) throw new Error(`mutation setup: no ${locale} content for donor ${donorId}`)
  const swap = (s) => {
    let out = s
    for (const [from, to] of swaps) out = out.replace(new RegExp(from, 'gi'), to)
    return out
  }
  next[victimId][locale] = {
    ...donor,
    title: swap(donor.title),
    description: swap(donor.description),
    h1: swap(donor.h1),
    intro: swap(donor.intro),
    sections: donor.sections.map((s) => ({ heading: swap(s.heading), body: s.body.map(swap) })),
  }
  return next
}

const withEdit = (corpus, id, locale, fn) => {
  const next = clone(corpus)
  next[id][locale] = fn(next[id][locale])
  return next
}

/**
 * Reword a donor page instead of cloning it: function-word substitution, fresh
 * headings, fresh h1/intro. Every exact-match test the gate had was blind to
 * this — a reviewer's version scored 94.7% and passed, with the gate reporting
 * the pair as "checked and distinct".
 */
const paraphraseClone = (corpus, locale, victimId, donorId, headings) => {
  const next = clone(corpus)
  const donor = next[donorId][locale]
  const reword = (t) =>
    t.replace(/\bthe\b/g, 'a').replace(/\band\b/g, 'plus').replace(/\bwith\b/g, 'via').replace(/,/g, ' —')
  next[victimId][locale] = {
    ...donor,
    h1: `${victimId} rewritten, sharing no phrasing with its heading`,
    intro: 'A distinct opening sentence that shares no phrasing with its donor page at all.',
    sections: donor.sections.map((sec, i) => ({
      heading: headings[i] || `Section ${i}`,
      body: sec.body.map(reword),
    })),
  }
  return next
}

const MUTATIONS = [
  {
    name: '1. warehouse-workers is a noun-substituted clone of logistics-workers (EN)',
    corpora: () => ({
      en: nounSubstitutedClone(EN, 'en', 'warehouse-workers', 'logistics-workers', [
        ['logistics operation', 'warehouse'],
        ['logistics', 'warehouse'],
      ]),
      de: DE,
    }),
    expect: /noun substitution, not two pages|the same page however the words differ/,
  },
  {
    name: '2. the same clone in German (Lager ← Logistik)',
    corpora: () => ({
      en: EN,
      de: nounSubstitutedClone(DE, 'de', 'warehouse-workers', 'logistics-workers', [
        ['Logistikbetrieb', 'Lager'],
        ['Logistik', 'Lager'],
      ]),
    }),
    expect: /noun substitution, not two pages|the same page however the words differ/,
  },
  {
    name: '3. two concepts share an H1',
    corpora: () => ({
      en: withEdit(EN, 'warehouse-workers', 'en', (e) => ({ ...e, h1: EN['logistics-workers'].en.h1 })),
      de: DE,
    }),
    expect: /share an H1/,
  },
  {
    name: '4. two concepts share an intro',
    corpora: () => ({
      en: withEdit(EN, 'construction-workers', 'en', (e) => ({ ...e, intro: EN['food-production-workers'].en.intro })),
      de: DE,
    }),
    expect: /share an intro/,
  },
  {
    name: '5. a prose page is cut below the thin-content floor',
    corpora: () => ({
      en: withEdit(EN, 'welders', 'en', (e) => ({ ...e, intro: 'Short.', sections: e.sections.slice(0, 1).map((s) => ({ heading: s.heading, body: ['Too short to be a page.'] })) })),
      de: DE,
    }),
    expect: /thin — \d+ words/,
  },
  {
    name: '6. a high-overlap pair is given an identical heading structure',
    corpora: () => ({
      en: withEdit(EN, 'warehouse-workers', 'en', (e) => {
        const donor = EN['logistics-workers'].en
        return {
          ...e,
          // Same headings, and enough shared body to clear the similarity screen,
          // but not a sentence-level clone — so only the heading rule can fire.
          sections: donor.sections.map((s, i) => ({
            heading: s.heading,
            body: (e.sections[i]?.body ?? e.sections[0].body).concat(donor.sections[i].body.map((b) => b.split(' ').reverse().join(' '))),
          })),
        }
      }),
      de: DE,
    }),
    expect: /identical heading structure|noun substitution|the same page however the words differ/,
  },
]

MUTATIONS.push({
  name: '7. a PARAPHRASED duplicate — reworded, not cloned, with fresh headings',
  corpora: () => ({
    en: paraphraseClone(EN, 'en', 'warehouse-workers', 'logistics-workers', [
      'Warehouse intake', 'Warehouse flow', 'Warehouse peaks', 'Warehouse training', 'Warehouse planning',
    ]),
    de: DE,
  }),
  expect: /the same page however the words differ|noun substitution, not two pages/,
})

/**
 * The magnitude path now catches the extreme shapes first, which is correct but
 * would leave the finer paths unexercised and free to rot. These two damage the
 * corpus just enough to trip those paths while staying UNDER the magnitude
 * threshold, so all three remain proven live rather than shadowed.
 */
MUTATIONS.push({
  name: '8. noun-substituted sentences at moderate overlap (below the magnitude threshold)',
  corpora: () => {
    const en = clone(EN)
    const donor = EN['logistics-workers'].en
    const victim = en['warehouse-workers'].en
    // Splice a handful of donor sentences, noun-swapped, into an otherwise
    // untouched page: enough identical-after-noun-stripping sentences to trip
    // the substitution rule without the pages becoming the same page.
    const swapped = donor.sections
      .flatMap((s) => s.body)
      .slice(0, 5)
      .map((b) => b.replace(/logistics operation/gi, 'warehouse').replace(/logistics/gi, 'warehouse'))
    victim.sections = victim.sections.map((s, i) =>
      i === 0 ? { ...s, body: [...s.body, ...swapped] } : s,
    )
    return { en, de: DE }
  },
  expect: /noun substitution, not two pages|the same page however the words differ/,
})

MUTATIONS.push({
  name: '9. the similarity screen must actually execute on the real corpus',
  corpora: () => ({ en: EN, de: DE }),
  // Not a damage case: asserts the substantive test is reachable at all. At the
  // old 0.40 screen the real corpus topped out at 38.4%, so substitutedSentences()
  // never ran and the gate quietly reduced to a word-count floor.
  expectNote: /overlap \d+\.\d+% — checked and distinct/,
})

console.log('Mutation tests: locale duplicate-content gate\n')

let caught = 0
const failures = []

const control = auditDuplicates()
if (control.errors.length) {
  console.error('CONTROL FAILED — the real corpus does not pass the gate:')
  for (const e of control.errors) console.error(`    ${e}`)
  process.exit(1)
}
console.log('  ✓ control: the real corpus passes')

for (const m of MUTATIONS) {
  const { errors, notes } = auditDuplicates(m.corpora())
  if (m.expectNote) {
    const noteHit = notes.find((n) => m.expectNote.test(n))
    if (noteHit) { caught++; console.log(`  ✓ ${m.name}`); console.log(`      → ${noteHit.slice(0, 150)}`) }
    else { failures.push(`${m.name}\n      expected a note matching /${m.expectNote.source}/\n      got: ${notes.slice(0, 3).join(' | ') || '(no notes)'}`); console.log(`  ✗ ${m.name}`) }
    continue
  }
  const hit = errors.find((e) => m.expect.test(e))
  if (hit) {
    caught++
    console.log(`  ✓ ${m.name}`)
    console.log(`      → ${hit.slice(0, 150)}`)
  } else {
    failures.push(`${m.name}\n      expected /${m.expect.source}/\n      got: ${errors.slice(0, 3).join(' | ') || '(no errors at all)'}`)
    console.log(`  ✗ ${m.name}`)
  }
}

// Negative control: handing the gate the real corpora through the same seam must
// not invent errors. If it does, the seam itself is the defect.
const noop = auditDuplicates({ en: EN, de: DE })
if (noop.errors.length) {
  failures.push(`negative control: injecting the REAL corpora produced ${noop.errors.length} error(s)`)
} else {
  console.log('  ✓ negative control: injecting the real corpora changes nothing')
}

if (failures.length) {
  console.error(`\nMutation tests: FAIL — ${failures.length} gate(s) did not catch their defect`)
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log(`\nMutation tests: PASS — ${caught} defects caught, control + negative control correct`)
