/**
 * Mutation tests for the German jurisdiction gate.
 *
 * Every mutation here is a real defect that was found on a shipped page, not an
 * invented one: a page using Arbeitnehmerüberlassung with the only Czech signal
 * fourteen strings later; a page telling the reader to check with "den
 * zuständigen Behörden" about work permits while naming no country at all; and
 * a meta description carrying the loaded term with the anchor buried in a later
 * section, so the search snippet is unanchored even though the page is not.
 *
 * The control asserts the real corpus passes, so a gate that fails everything
 * scores zero.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { auditJurisdiction } from './validate-locale-jurisdiction.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const R = await import('../lib/locale/registry.ts')
const DE = (await import('../lib/locale/content/de/index.ts')).DE_CONTENT

const clone = (o) => JSON.parse(JSON.stringify(o))

/**
 * Strip every Czech anchor from one page, leaving its loaded terms in place.
 *
 * The scrubber must remove everything the gate's ANCHOR pattern accepts, not
 * merely the commonest form. An earlier version removed only `tschechisch*` and
 * left `Tschechische Republik` standing, so the mutation stopped firing the
 * moment a page's anchor was worded the other way — the test went quiet rather
 * than red, which is the failure mode a mutation suite exists to prevent in
 * other people's code.
 */
const stripAnchors = (id) => {
  const next = clone(DE)
  const e = next[id].de
  const scrub = (s) =>
    s
      .replace(/\s*(in|nach|aus|der|des)?\s*[Tt]schechisch\w*/g, '')
      .replace(/\s*Tschechische[nrs]?\s+Republik/gi, '')
      .replace(/\s*Tschechiens?\b/gi, '')
      .replace(/\s*\bMPSV\b/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim()
  next[id].de = {
    ...e,
    title: scrub(e.title),
    description: scrub(e.description),
    intro: scrub(e.intro),
    sections: e.sections.map((s) => ({
      ...s,
      heading: scrub(s.heading),
      body: s.body.map(scrub),
      ...(s.list ? { list: { ...s.list, intro: s.list.intro ? scrub(s.list.intro) : undefined, items: s.list.items.map(scrub) } } : {}),
    })),
  }
  return next
}

/**
 * Put a loaded term in the description of a page whose anchor lives later.
 *
 * The TITLE must be scrubbed too. It is read before the description, so a title
 * that happens to name Czechia would satisfy the ordering rule and this mutation
 * would silently stop testing anything — which is exactly what happened when
 * titles were added to the reading order and this suite went quiet instead of
 * red. A mutation that stops firing is worse than one that fails.
 */
const loadTheDescription = (id, term) => {
  const next = clone(DE)
  const e = next[id].de
  const scrub = (s) => s.replace(/tschechisch\w*/gi, '').replace(/Tschechiens?/gi, '').replace(/\s{2,}/g, ' ').trim()
  next[id].de = {
    ...e,
    title: scrub(e.title),
    description: `${term} und was dabei zu beachten ist.`,
    // guarantee an anchor exists somewhere later so this tests ORDER, not absence
    sections: e.sections.map((s, i) => (i === e.sections.length - 1 ? { ...s, body: [...s.body, 'Es gilt tschechisches Recht.'] } : s)),
    intro: scrub(e.intro),
  }
  return next
}

/** A page that carries a loaded term at all, to target. */
const pageWith = (term) => {
  for (const c of R.LOCALE_CONCEPTS) {
    if (!c.published.includes('de')) continue
    const e = DE[c.id]?.de
    if (!e) continue
    const text = [e.description, e.intro, ...e.sections.flatMap((s) => [s.heading, ...s.body])].join(' ')
    if (text.includes(term)) return c.id
  }
  return null
}

const anchored = R.LOCALE_CONCEPTS.filter((c) => {
  if (!c.published.includes('de')) return false
  const e = DE[c.id]?.de
  if (!e) return false
  const text = [e.description, e.intro, ...e.sections.flatMap((s) => [s.heading, ...s.body])].join(' ')
  return /tschechisch/i.test(text) && /Arbeitnehmerüberlassung|Erlaubnis|zuständige/.test(text)
})

if (!anchored.length) {
  console.error('CONTROL FAILED — no German page both carries a loaded term and anchors Czech law,')
  console.error('  so there is nothing whose anchoring this suite can damage.')
  process.exit(1)
}
const target = anchored[0].id

const MUTATIONS = [
  {
    name: `1. every Czech anchor is stripped from ${target}, loaded terms left in place`,
    corpus: () => stripAnchors(target),
    expect: /names no Czech jurisdiction anywhere/,
  },
  {
    name: `2. the meta description carries Arbeitnehmerüberlassung while the anchor sits in the last section`,
    corpus: () => loadTheDescription(target, 'Arbeitnehmerüberlassung'),
    expect: /the loaded term is read before the jurisdiction is given/,
  },
  {
    name: `3. the description points at "die zuständigen Behörden" with the anchor only later`,
    corpus: () => loadTheDescription(target, 'Prüfen Sie es bei den zuständigen Behörden'),
    expect: /the loaded term is read before the jurisdiction is given/,
  },
  {
    // Titles were previously never inspected, which mattered because a title is
    // what a search result shows before any of the page exists for the reader.
    name: `4. a loaded term sits in the TITLE with no anchor anywhere on the page`,
    corpus: () => {
      const next = clone(DE)
      const id = Object.keys(next).find((k) => next[k].de)
      const e = next[id].de
      next[id].de = {
        ...e,
        title: 'Arbeitnehmerüberlassung — Leitfaden',
        description: 'Ein Leitfaden.',
        intro: 'Ein Leitfaden ohne Angabe.',
        sections: e.sections.map((s) => ({ ...s, body: s.body.map((b) => b.replace(/tschechisch\w*/gi, '')) })),
      }
      return next
    },
    expect: /uses "Arbeitnehmerüberlassung" at title/,
  },
  {
    // The page-level ordering rule cannot protect a named institution: a bare
    // ministry name reads as the reader's own ministry however early the page
    // said "in Tschechien".
    name: `5. a named Czech institution loses its qualifier at first mention`,
    corpus: () => {
      const next = clone(DE)
      for (const rec of Object.values(next)) {
        const e = rec.de
        if (!e) continue
        const fix = (s) =>
          s.includes('Ministerium für Arbeit und Soziales')
            ? s.replace(/Tschechische Statistische Amt/g, 'Statistische Amt').replace(/der Tschechischen Republik/g, '').replace(/tschechisch\w*/gi, '')
            : s
        rec.de = {
          ...e,
          description: fix(e.description),
          intro: fix(e.intro),
          sections: e.sections.map((s) => ({
            ...s,
            heading: fix(s.heading),
            body: s.body.map(fix),
            ...(s.list ? { list: { ...s.list, items: s.list.items.map(fix) } } : {}),
          })),
        }
      }
      return next
    },
    expect: /first mention of "Ministerium für Arbeit und Soziales" .* is unqualified/,
  },
]

console.log('Mutation tests: German jurisdiction gate\n')

let caught = 0
const failures = []

const control = auditJurisdiction()
if (control.errors.length) {
  console.error('CONTROL FAILED — the real corpus does not pass the gate:')
  for (const e of control.errors.slice(0, 12)) console.error(`    ${e}`)
  process.exit(1)
}
console.log('  ✓ control: the real corpus passes')

for (const m of MUTATIONS) {
  const { errors } = auditJurisdiction({ corpus: m.corpus() })
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

const noop = auditJurisdiction({ corpus: DE })
if (noop.errors.length) {
  failures.push(`negative control: injecting the REAL corpus produced ${noop.errors.length} error(s)`)
} else {
  console.log('  ✓ negative control: injecting the real corpus changes nothing')
}

if (failures.length) {
  console.error(`\nMutation tests: FAIL — ${failures.length} gate(s) did not catch their defect`)
  for (const f of failures) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log(`\nMutation tests: PASS — ${caught} defects caught, control + negative control correct`)
