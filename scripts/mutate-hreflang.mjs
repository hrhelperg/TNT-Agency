// Mutation tests for the hreflang + document-language gate.
//
// The defect this gate exists to catch shipped to production and survived
// several waves: the homepage declared en, cs, de and x-default all pointing at
// itself. Nothing failed, because nothing was checking. A gate that has never
// rejected anything is not evidence that the corpus is clean — so each mutation
// below injects one defect, runs the REAL exported auditHreflang(), and asserts
// it fails with a message naming the damaged page.
//
// Documents are deep-cloned from the actual build, so the fixtures cannot drift
// away from what ships. Nothing on disk is modified.
//
// Run: node scripts/mutate-hreflang.mjs   (npm run test:mutate-hreflang)

import { auditHreflang, DOCUMENTS, STATIC_PAGE_COUNT, MIN_STATIC_PAGES } from './validate-hreflang.mjs'

const clone = () => new Map([...DOCUMENTS].map(([k, v]) => [k, { ...v, alts: v.alts.map((a) => ({ ...a })) }]))
const run = (docs, staticPages = STATIC_PAGE_COUNT) => auditHreflang(docs, { staticPages })
const BASE = 'https://talentpartnerid.com'

const MUTATIONS = [
  {
    name: '1. fake "en" alternate injected on a Czech-only page',
    slug: '/nabor-svarecu',
    expect: /no genuine translation set|does not link back|is <html lang=/,
    apply(d) {
      d.get('/nabor-svarecu').alts.push({ lang: 'en', href: `${BASE}/nabor-svarecu` })
    },
  },
  {
    name: '2. reciprocal "de" link removed from one set member',
    slug: '/terms.html',
    expect: /does not link back — set is not reciprocal/,
    apply(d) {
      const de = d.get('/terms-de.html')
      de.alts = de.alts.filter((a) => a.lang !== 'en')
    },
    // /terms.html declares terms-de.html; after removing en from terms-de.html
    // the set is no longer reciprocal and BOTH ends should be reported.
    slugAlternatives: ['/terms.html', '/terms-cs.html'],
  },
  {
    name: '3. "cs-CZ" alternate pointed at a URL that does not exist',
    slug: '/cookies.html',
    expect: /points at .*, which does not exist/,
    apply(d) {
      const en = d.get('/cookies.html')
      en.alts = en.alts.map((a) => (a.lang === 'cs-CZ' ? { ...a, href: `${BASE}/cookies-cz.html` } : a))
    },
  },
  {
    // /pro-zamestnavatele used to be the example of "unrelated", but Locale L0
    // made it a real concept primary with EN and DE counterparts, so an
    // x-default there is now correct. The mutation needs a page that genuinely
    // has no locale cluster — /skladnici is Czech-only and not even a collapsed
    // variant of one.
    name: '4. x-default added to an unrelated page',
    slug: '/skladnici',
    expect: /x-default declared with no documented neutral fallback/,
    apply(d) {
      d.get('/skladnici').alts.push({ lang: 'x-default', href: `${BASE}/skladnici` })
    },
  },
  {
    name: '5. <html lang> contradicts the hreflang claimed for it',
    slug: '/privacy-policy',
    expect: /declares .* as "de" but that document is <html lang="/,
    apply(d) {
      d.get('/privacy-de.html').lang = 'cs'
    },
  },
  {
    name: '6. one URL declared under two different language codes',
    slug: '/terms.html',
    expect: /cannot be two language versions/,
    apply(d) {
      d.get('/terms.html').alts.push({ lang: 'de', href: `${BASE}/terms.html` })
    },
  },
  {
    name: '7. duplicate hreflang entry on one page',
    slug: '/cookies-cs.html',
    expect: /duplicate hreflang="cs-CZ"/,
    apply(d) {
      d.get('/cookies-cs.html').alts.push({ lang: 'cs-CZ', href: `${BASE}/cookies-cs.html` })
    },
  },
  {
    name: '8. disallowed language code',
    slug: '/terms-de.html',
    expect: /is not an allowed code/,
    apply(d) {
      d.get('/terms-de.html').alts.push({ lang: 'de-AT', href: `${BASE}/terms-de.html` })
    },
  },
  {
    name: '9. alternate target is not self-canonical',
    slug: '/privacy-policy',
    expect: /is not self-canonical/,
    apply(d) {
      d.get('/privacy-de.html').canonical = `${BASE}/privacy-policy`
    },
  },
]

let failures = 0
console.log('Mutation tests — hreflang + document-language gate\n')

// ── Control ─────────────────────────────────────────────────────────────────
const control = run(clone())
if (control.errors.length) {
  console.error(`  ✗ CONTROL: the real build already fails (${control.errors.length}) — mutations prove nothing`)
  for (const e of control.errors.slice(0, 5)) console.error(`      ${e}`)
  failures++
} else {
  console.log(`  ✓ control: the real build passes (${control.withAlts} documents declare hreflang)`)
}

// ── Mutations ───────────────────────────────────────────────────────────────
for (const m of MUTATIONS) {
  const docs = clone()
  m.apply(docs)
  const { errors } = run(docs)
  const matched = errors.filter((e) => m.expect.test(e))
  const names = m.slugAlternatives ?? [m.slug]
  const named = matched.some((e) => names.some((n) => e.startsWith(`${n}:`)))
  if (matched.length && named) console.log(`  ✓ ${m.name}`)
  else if (matched.length) {
    console.error(`  ✗ ${m.name}\n      caught, but no message names ${names.join(' or ')}: ${matched[0]}`)
    failures++
  } else {
    console.error(`  ✗ ${m.name}\n      NOT CAUGHT — ${errors.length} error(s), none matching ${m.expect}`)
    failures++
  }
}

// ── 10. Static-render regression ────────────────────────────────────────────
{
  const { errors } = run(clone(), MIN_STATIC_PAGES - 1)
  const caught = errors.some((e) => /static prerender regression/.test(e))
  if (caught) console.log('  ✓ 10. static prerender regression (locale work going dynamic)')
  else {
    console.error('  ✗ 10. static prerender regression — NOT CAUGHT')
    failures++
  }
}

// ── Negative control: a Czech page with no hreflang must NOT fail ───────────
{
  const docs = clone()
  const plain = docs.get('/nabor-svarecu')
  const { errors } = run(docs)
  const flagged = errors.some((e) => e.startsWith('/nabor-svarecu:'))
  if (!plain.alts.length && !flagged) {
    console.log('  ✓ negative control: a Czech page with no translation declares nothing and passes')
  } else {
    console.error(`  ✗ negative control: alts=${plain.alts.length} flagged=${flagged} — absence of hreflang must be legal`)
    failures++
  }
}

console.log(
  failures
    ? `\nMutation tests: FAIL — ${failures} check(s) did not behave as specified`
    : `\nMutation tests: PASS — ${MUTATIONS.length + 1} defects caught, control + negative control correct`,
)
process.exit(failures ? 1 : 0)
