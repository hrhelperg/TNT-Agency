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

/**
 * Published localized concepts whose Czech source is not a lib/content/pages
 * object, and therefore contributes no inventory items.
 *
 * Without this list such a concept vanishes from set equality in BOTH
 * directions and is reported as a note — which is how editorial-policy, an L1
 * concept published in English and German and present in the sitemap, came to
 * have no record in the source map at all while every gate stayed green. Its
 * content turned out to be complete, but no gate could have told us otherwise:
 * exactly the kind of silence this file exists to eliminate.
 *
 * An entry is a claim that the concept has no enumerable source, and where a
 * structural check is possible it is stated as `verify` and RUN, so the
 * exemption is re-earned on every execution rather than trusted once.
 */
/**
 * Negation, per locale. Used where a check must know that a sentence still
 * refuses something, rather than merely that a sentence is still present.
 */
const NEGATION_BY_LOCALE = {
  en: /\b(no|not|never|nor|neither|without)\b/i,
  de: /\b(nicht|keine?[nmrs]?|niemals|weder|ohne)\b/i,
}

const countListItems = (entry) =>
  entry ? entry.sections.reduce((n, sec) => n + (sec.list ? sec.list.items.length : 0), 0) : 0

const countLi = (relPath) => (fs.readFileSync(path.join(ROOT, relPath), 'utf8').match(/<li>/g) || []).length

const NO_INVENTORY_SOURCE = new Map([
  [
    'home',
    {
      reason:
        'Locale home page; assembled from chrome and concept links, with no Czech article source behind it. Its ' +
        'Czech counterpart pages/index.tsx does carry list items, but they are navigation links rather than prose, ' +
        'so there is no editorial content to carry across.',
      verify: () => {
        const czech = fs.readFileSync(path.join(ROOT, 'pages/index.tsx'), 'utf8')
        const items = czech.match(/<li>[\s\S]*?<\/li>/g) || []
        const prose = items.filter((li) => !/<a\b/.test(li))
        if (prose.length) {
          return (
            `pages/index.tsx now has ${prose.length} list item(s) that are not navigation links — ` +
            'this exemption assumed the home page carries no prose list to translate'
          )
        }
        return null
      },
    },
  ],
  [
    'request-staff',
    {
      reason:
        'A form page. Its substance is the form, checked field-by-field across locales by validate-locale-pages, ' +
        'and its Czech source carries no prose list.',
      verify: () => {
        const li = countLi('pages/poptavka-pracovniku.tsx')
        if (li) return `pages/poptavka-pracovniku.tsx now has ${li} list item(s); this exemption assumed none`
        return null
      },
    },
  ],
  [
    'about-us',
    {
      // L0: the gap below predates this branch, so it is recorded rather than blocking.
      l0: true,
      reason:
        'Operator identity page. Its previous justification here — "its facts are checked by validate-trust and ' +
        'validate-legal" — was false: neither script reads a localized page, and validate-trust reads only ' +
        'lib/content/trust-data.ts and the Czech pages/o-nas.tsx. The premise that nothing was enumerable was also ' +
        'false: the Czech page carries a six-point agency-verification checklist, and the EN and DE pages keep the ' +
        'surrounding prose while dropping the checklist. That is a real content gap, it predates this branch, and ' +
        'it is recorded as L0 debt rather than exempted away.',
      verify: ({ enEntry, deEntry }) => {
        const czechItems = countLi('pages/o-nas.tsx')
        if (czechItems === 0) {
          return "pages/o-nas.tsx has no list items — this exemption's premise no longer holds"
        }
        const en = countListItems(enEntry)
        const de = countListItems(deEntry)
        if (en !== czechItems || de !== czechItems) {
          return `Czech verification checklist: ${czechItems} items, but en carries ${en} and de carries ${de} list items`
        }
        return null
      },
    },
  ],
  [
    'contact',
    {
      reason: 'Contact details only; no Czech article source and no prose list to enumerate.',
      verify: () => {
        const li = countLi('pages/contact.tsx')
        if (li) return `pages/contact.tsx now has ${li} list item(s); this exemption assumed none`
        return null
      },
    },
  ],
  /**
   * The three legal concepts (privacy-policy, terms, cookies) are published in
   * en and de, but they live in LEGAL_CONCEPTS, which LOCALE_CONCEPTS excludes —
   * so until the inventory widened to ALL_CONCEPTS they were invisible to set
   * equality AND to the "no gate can see it" net above, leaving no trace at all.
   * Their Czech source is a static document rather than a lib/content/pages
   * object, so they cannot yield inventory items; what can be checked is that
   * the three language versions still carry the same number of enumerated
   * points.
   *
   * They are marked l0 because these documents are W4 territory and predate
   * this branch. Where the counts diverge the divergence is recorded rather
   * than fixed: the localized cookie and privacy documents carry MORE enumerated
   * points than the Czech (named browser settings paths), which is content above
   * the Czech ceiling and needs a W4 decision, not an L1 edit.
   */
  ...['privacy-policy', 'terms', 'cookies'].map((id) => {
    const sources = {
      'privacy-policy': { cs: 'public/privacy-cs.html', en: 'pages/privacy-policy.tsx', de: 'public/privacy-de.html' },
      terms: { cs: 'public/terms-cs.html', en: 'public/terms.html', de: 'public/terms-de.html' },
      cookies: { cs: 'public/cookies-cs.html', en: 'public/cookies.html', de: 'public/cookies-de.html' },
    }[id]
    return [
      id,
      {
        l0: true,
        reason:
          `Legal document. Its Czech source is ${sources.cs} rather than a lib/content/pages object, so it yields no ` +
          'inventory items; the enumerated points in the three language versions are compared instead. W4 territory: ' +
          'a divergence here is recorded for a separate decision, never edited by a locale pass.',
        verify: () => {
          const count = (rel) => {
            const abs = path.join(ROOT, rel)
            if (!fs.existsSync(abs)) return null
            return (fs.readFileSync(abs, 'utf8').match(/<li[\s>]/g) || []).length
          }
          const cs = count(sources.cs)
          const en = count(sources.en)
          const de = count(sources.de)
          if (cs === null) return `${sources.cs} is missing — this exemption's premise no longer holds`
          if (en !== cs || de !== cs) {
            return `enumerated points: cs ${cs}, en ${en}, de ${de} (${sources.cs} / ${sources.en} / ${sources.de})`
          }
          return null
        },
      },
    ]
  }),
  [
    'editorial-policy',
    {
      reason:
        'The Czech source is the page component pages/redakcni-zasady.tsx rather than a lib/content/pages object, ' +
        'so it yields no enumerable items. Its structure is a list of editorial rules, so those rules are checked ' +
        'directly instead — both that they are all still there, and that the ones which refuse something still do.',
      /**
       * Counting was not enough.
       *
       * This callback used to compare `<li>` totals only. An independent refuter
       * replaced all six items of "What we categorically do not claim" with their
       * affirmative inversions — "We guarantee workers and an immediate start on
       * every request", "We describe our work as verified by the Ministry of
       * Labour and Social Affairs" — kept the total at 11, and this gate
       * certified the exemption as re-earned. On the one page whose entire
       * subject is what this site refuses to claim, a count is not a check.
       */
      verify: ({ enEntry, deEntry }) => {
        const czechItems = countLi('pages/redakcni-zasady.tsx')
        if (czechItems === 0) return `pages/redakcni-zasady.tsx has no list items — this exemption's premise no longer holds`
        const en = countListItems(enEntry)
        const de = countListItems(deEntry)
        if (en !== czechItems || de !== czechItems) {
          return `Czech editorial rules: ${czechItems}, but en carries ${en} and de carries ${de} list items`
        }
        // How many of the Czech rules actually refuse something is read from the
        // Czech page, not assumed. Five of its six do; the sixth ("we publish the
        // operator's identification and permit details as fact only after
        // verification") is affirmative with a restriction, and both translations
        // mirror it faithfully. Asserting "all six are negations" would have
        // failed that honest item — the expectation has to come from the source,
        // or the check just encodes a guess about the source.
        const czechLis = fs.readFileSync(path.join(ROOT, 'pages/redakcni-zasady.tsx'), 'utf8').match(/<li>([\s\S]*?)<\/li>/g) || []
        const czechRefusals = czechLis.filter((li) => /\bNe[a-záčďéěíňóřšťúůýž]+e?me\b/i.test(li.replace(/<[^>]*>/g, ''))).length
        const refusalLists = [
          ['en', enEntry, /do not claim/i],
          ['de', deEntry, /nicht behaupten/i],
        ]
        for (const [locale, entry, headingRe] of refusalLists) {
          const section = entry?.sections?.find((sec) => headingRe.test(sec.heading))
          if (!section) return `${locale}: the section listing what the site does not claim is gone`
          const items = section.list?.items ?? []
          if (!items.length) return `${locale}: the section listing what the site does not claim carries no items`
          const negating = items.filter((text) => NEGATION_BY_LOCALE[locale].test(text)).length
          if (negating < czechRefusals) {
            const affirmative = items.filter((text) => !NEGATION_BY_LOCALE[locale].test(text))
            return (
              `${locale}: the Czech page refuses ${czechRefusals} things, but only ${negating} of the ${items.length} ` +
              `items under "${section.heading}" still refuse anything — e.g. "${affirmative[0]?.slice(0, 90)}"`
            )
          }
        }
        return null
      },
    },
  ],
])

/**
 * Refusals must survive translation, and the existence test alone cannot see it.
 *
 * The evidence check asks only whether a carriedBy needle appears somewhere in
 * the localized text. A COMPOUND Czech item — "cover peaks this way. We do not
 * promise immediate availability." — passes as soon as its first half matches,
 * so the refusal in the second half can vanish while the record still reads
 * PRESERVED_IN_PROSE. Two L1 items did exactly that: logistics-workers and
 * automotive-workers dropped "Okamžitou dostupnost neslibujeme" in both
 * locales, and no gate objected.
 *
 * A refusal is the half most worth keeping. This site's editorial claim is that
 * it declines to state what it does not know, so losing one is not a shortened
 * translation — it is the page quietly ceasing to say what it will not promise.
 * Checked page-locally, because a refusal on some other page does not help the
 * reader in front of this one.
 */
/**
 * Czech refusals, by shape rather than by a whitelist of five verbs.
 *
 * The previous pattern was /neslibujeme|neuvádíme|nevymýšlíme|nedovozujeme|
 * nezveřejňujeme/i — first-person plural only, five lemmas, derived from
 * nothing. Independent refuters measured the cost: 22 of 56 refusal-bearing L1
 * source items fell outside it, every one of them carrying
 * `refusalCarriedBy: null`, and two real dropped refusals were sitting in that
 * gap. The same act in the page's own voice walked past — "Obecné číslo zde
 * neuvádíme" was guarded while "Tato stránka cizí benchmarky neuvádí" was not.
 *
 * It is scoped to the site's own voice. `nelze` on its own is impersonal
 * "cannot" and appears far more often as plain fact than as a refusal — "a
 * commodity knowledge that cannot be caught up quickly", "this cannot replace
 * the document the regulation requires" — so it counts only where it opens an
 * answer, which is where it is the site declining. Matching it anywhere added
 * four false positives out of fourteen, and a gate that cries wolf is a gate
 * people learn to skip.
 *
 * So the rule is the shape of a refusal: a negated verb in the site's own voice
 * (1pl -me, 3sg -á/-í/-e), plus the bare "Ne." that opens a refusing FAQ answer
 * and the impersonal "nelze". Widening this is what surfaces the gaps; it is
 * meant to be over- rather than under-inclusive, because a false positive costs
 * an argued map entry and a false negative costs a dropped refusal.
 */
const CZECH_REFUSAL =
  /\bne(?:slibuj|uvád|vymýšl|dovozuj|zveřejňuj|garantuj|tvrd|určuj|interpretuj|popisuj|prohlašuj|sděluj|zavazuj|rozebír|doporučuj|nahrazuj)\w*|(?:^|[.?!]\s+)(?:Ne|Nelze|Nenajdete)[.,]/u

/**
 * A negation, checked against the NAMED refusal evidence — never the page.
 *
 * A page-wide scan for "do not" is worthless here: an article of any length
 * contains one somewhere, so the check passed even with the refusal deleted.
 * Its only catch was a page that happened to contain no negation at all. The
 * refusal must therefore be pointed at, exactly like every other claim in this
 * map, and the pointer is what gets verified.
 */
const NEGATION = {
  // `not` on its own counts. Requiring an auxiliary before it rejected real
  // refusals — "a contract can only implement it, not change or exclude it" —
  // and `niemals` was missing from the German list entirely, so "die Kosten
  // trägt der Arbeitgeber, niemals die angesprochene Person" did not register
  // as a negation either.
  en: /\bnot\b|\bno\b|\bnever\b|\bneither\b|\bnor\b|\bwithout\b|\bcannot\b/i,
  de: /\bnicht\b|\bkeine?[nmrs]?\b|\bweder\b|\bohne\b|\bniemals\b|\bnie\b/i,
}

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

/**
 * The built page, with <head> removed.
 *
 * The head is not evidence. It carries <meta name="description">, whose text is
 * never shown to a reader, and reading the whole document let a single invisible
 * string satisfy BOTH halves of this gate at once: the corpus half matched
 * `entry.description`, and the rendered half matched the same words inside the
 * meta tag's content attribute. Two halves meant to be independent agreed
 * because they were looking at the same hidden text. Independent refuters found
 * four L1 refusal pointers and one L0 pointer certified this way, and the L0 one
 * was silencing a debt this file's own comments promise to report every run.
 */
const readRouteHtml = (route) => {
  const rel = route === '/' ? 'index' : route.replace(/^\//, '')
  const f = path.join(BUILD, `${rel}.html`)
  if (!fs.existsSync(f)) return null
  return fs.readFileSync(f, 'utf8').replace(/<head[\s\S]*?<\/head>/i, '')
}

/**
 * This gate has two halves — the map must be honest, and the evidence must
 * actually reach a reader — and the second half was satisfiable by omission.
 *
 * Every rendered check sat behind `if (!html) continue`, so with no .next on
 * disk the gate skipped all of them and still printed PASS and exited 0. The
 * half is not decorative: feeding it empty HTML against the real corpus raises
 * 1208 errors. Nothing in the repo ordered a build before the gate either, so
 * "validate:locale-fidelity is green" could mean "half of it did not run".
 *
 * That is exactly the failure this whole release is written against, so the
 * absence of a build is now an error rather than a silent downgrade.
 */
/**
 * The build must exist AND describe this tree.
 *
 * Existence alone was not enough: a build left over from before an edit still
 * satisfies it, so the rendered half reads yesterday's pages and confirms
 * yesterday's evidence. An independent refuter made every bulleted list vanish
 * from every localized page and this gate returned PASS against the stale
 * build; rebuilding the same defect produced 739 errors.
 *
 * The first attempt at this compared mtimes, and mtime answers the wrong
 * question. `test:mutate-locale-fidelity` writes content files and restores
 * them byte-for-byte, which moves every mtime without changing anything, so
 * running the suite in its normal order failed a gate that had passed moments
 * before. A check that fires on a tree nobody changed teaches people to ignore
 * it.
 *
 * So the question is asked directly of the artifact: does each built page still
 * carry this corpus's h1, and does it render as many list items as the corpus
 * declares? The first catches text that changed after the build; the second
 * catches structure that stopped rendering, which is the case that motivated
 * the check and the one no text comparison can see.
 */
const buildDescribesTree = ({ corpora }) => {
  const mismatches = []
  for (const [locale, corpus] of [['en', corpora.en], ['de', corpora.de]]) {
    for (const concept of R.LOCALE_CONCEPTS) {
      if (!concept.published.includes(locale)) continue
      const entry = corpus[concept.id]?.[locale]
      const url = R.urlFor(concept, locale)
      if (!entry || !url) continue
      const html = readRouteHtml(url)
      if (html === null) {
        mismatches.push(`${url} has no built page`)
        continue
      }
      const plain = normalise(decode(html.replace(/<[^>]*>/g, ' ')))
      if (entry.h1 && !plain.includes(normalise(entry.h1))) {
        mismatches.push(`${url} does not render this corpus's h1 ("${entry.h1.slice(0, 60)}")`)
      }
      // List items, counted inside .locale-list only. Counting every <li> on the
      // page swept in nav and footer, which is why this could only ever be a
      // one-sided `declared > rendered` check; scoped to the content lists it
      // can be an equality, so items removed from the corpus after a build are
      // visible too.
      const declared = entry.sections.reduce((n, sec) => n + (sec.list ? sec.list.items.length : 0), 0)
      const rendered = [...html.matchAll(/<[ou]l[^>]*class="locale-list"[^>]*>([\s\S]*?)<\/[ou]l>/g)].reduce(
        (n, m) => n + (m[1].match(/<li\b/g) || []).length,
        0,
      )
      if (declared !== rendered) {
        mismatches.push(`${url} renders ${rendered} content list item(s) but the corpus declares ${declared}`)
      }

      // Prose. The h1 check above sees a changed title, and the list check sees
      // structure that stopped rendering, but neither sees section bodies
      // vanish or change: deleting the paragraph block from LocalePage removed
      // every body paragraph from all 96 pages and this check stayed green.
      for (const section of entry.sections) {
        const first = section.body?.[0]
        if (!first) continue
        const probe = normalise(first).slice(0, 60)
        if (probe && !plain.includes(probe)) {
          mismatches.push(`${url} does not render this corpus's prose under "${section.heading}"`)
          break
        }
      }
      if (mismatches.length >= 5) return mismatches
    }
  }
  return mismatches
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

  // Refuse to certify on half the checks. `readPage` being overridden means a
  // caller (the mutation suite) is deliberately supplying HTML, which is fine;
  // an absent build with the default reader is not.
  // Only meaningful when BOTH halves are the real ones. A caller that injects a
  // mutated corpus (the mutation harness) legitimately disagrees with the build,
  // and treating that as staleness made this check early-return and short-
  // circuit the very assertion the mutation was written to exercise.
  const usingRealBuild = readPage === readRouteHtml && corpora === undefined
  const haveBuild = fs.existsSync(BUILD) && fs.existsSync(path.join(ROOT, '.next/BUILD_ID'))
  if (usingRealBuild && haveBuild) {
    const stale = buildDescribesTree({ corpora: { en, de } })
    if (stale.length) {
      errors.push(
        `the production build at .next does not describe this tree — ${stale.join('; ')}. ` +
          'The rendered-HTML half of this gate would confirm evidence against pages that no longer exist. ' +
          'Run `npx next build` and re-run this gate.',
      )
      return { errors, notes, l0Debt }
    }
  }
  if (usingRealBuild && !haveBuild) {
    errors.push(
      'no production build found at .next — the rendered-HTML half of this gate cannot run, and it is ' +
        'load-bearing (empty HTML raises 1208 errors against the real corpus). Run `npm run build` first; ' +
        'a green result without a build would certify only that the map is self-consistent',
    )
    return { errors, notes, l0Debt }
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
      // `description` is deliberately absent: it renders only as
      // <meta name="description">, so text living there alone has reached no
      // reader. `title` and `h1` are here because both are on the page.
      const proseTexts = [entry.title, entry.h1, entry.intro, ...entry.sections.flatMap((s) => [s.heading, ...s.body])]
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

      // If the Czech item makes a refusal, the localized page must make one too.
      // The evidence match above can be satisfied by the item's other half,
      // which is exactly how two of these were lost.
      if (CZECH_REFUSAL.test(item.cs)) {
        const refusal = record?.refusalCarriedBy
        const refusalNeedle = refusal ? normalise(refusal) : ''
        const present =
          refusalNeedle &&
          NEGATION[l].test(refusalNeedle) &&
          [...proseTexts, ...listTexts].some((x) => normalise(x).includes(refusalNeedle)) &&
          (() => {
            // Read the page here rather than reusing the `html` binding below:
            // it is declared after this block, and referencing it threw
            // "Cannot access 'html' before initialization" — which the gate's
            // own green output hid, because the throw only surfaced under the
            // negative control that exercised this path.
            const route = R.urlFor(concept, l)
            const page = route ? readPage(route) : null
            return page ? normalise(decode(page.replace(/<script[\s\S]*?<\/script>/g, ''))).includes(refusalNeedle) : false
          })()
        if (!present) {
          const line =
            `${item.id} [${l}]: the Czech item makes a refusal ("${normalise(item.cs).slice(-70)}") but the map ` +
            `names no "refusalCarriedBy" that is a negation, present in the ${l} corpus AND in the rendered page. A ` +
            `compound item whose refusal half is dropped still matches its ordinary evidence, so the record would ` +
            `read preserved while the page had stopped saying what it does not promise`
          // Scoped like MISSING: L1 blocks, L0 is recorded as pre-existing debt.
          // production-workers drops "Neslibujeme okamžité obsazení" this way and
          // predates this branch; fixing it would exceed the agreed L0 bound, so
          // it is reported every run rather than quietly exempted.
          if (L1_IDS.has(item.conceptId)) errors.push(line)
          else l0Debt.push(line)
        }
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
      if (!html) {
        errors.push(`${item.id} [${l}]: no rendered HTML for ${route} — evidence cannot be confirmed to reach a reader`)
        continue
      }
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
  // State how much Czech source sits outside set equality, every run.
  //
  // Collapsed variants are Czech-only pages that share a concept with their
  // primary, so they produce no EN/DE page of their own and their items are not
  // item-classified. That is a deliberate consequence of the collapse design —
  // but it was also completely unstated, and an inventory that silently omits a
  // category is exactly how 183 FAQ items went missing in an earlier round.
  const collapsedDeclared = R.LOCALE_CONCEPTS.reduce((n, c) => n + (c.csCollapsed?.length || 0), 0)
  const collapsedSeen = inv.collapsedPages.length
  const collapsedItems = inv.collapsedPages.reduce((n, p) => n + p.itemCount, 0)
  if (collapsedSeen !== collapsedDeclared) {
    errors.push(
      `inventory found ${collapsedSeen} collapsed source pages but the registry declares ${collapsedDeclared} — ` +
        'equality in both directions, because a declared page whose source object vanishes otherwise takes its ' +
        'items out of this report and prints a smaller number instead of failing',
    )
  }
  notes.push(
    `${collapsedSeen} collapsed Czech pages carrying ${collapsedItems} source items are outside set equality by ` +
      `design (they share a concept with their primary and get no page of their own); ` +
      `${collapsedDeclared} are declared in the registry`,
  )

  for (const { conceptId } of inv.conceptsWithoutSource) {
    const exemption = NO_INVENTORY_SOURCE.get(conceptId)
    if (!exemption) {
      errors.push(
        `${conceptId}: published in a non-Czech locale but contributes no inventory items, so it is absent from set ` +
          `equality in both directions and no gate can see it. Give it a source, or an argued entry in ` +
          `NO_INVENTORY_SOURCE`,
      )
      continue
    }
    // A reason alone is prose, and prose cannot fail. Every exemption must carry
    // a check that re-earns it on each run, or it is just a way of removing a
    // concept from the universe while announcing set equality over the rest.
    if (!exemption.verify) {
      errors.push(
        `${conceptId}: has a NO_INVENTORY_SOURCE reason but no verify callback — an unverified exemption removes ` +
          `the concept from set equality on the strength of a sentence nobody re-checks`,
      )
      continue
    }
    const failure = exemption.verify({ enEntry: en[conceptId]?.en, deEntry: de[conceptId]?.de })
    if (!failure) {
      notes.push(`${conceptId}: no enumerable source, exemption verified structurally — ${exemption.reason}`)
    } else if (exemption.l0) {
      l0Debt.push(`${conceptId}: ${failure}`)
    } else {
      errors.push(`${conceptId}: exemption check failed — ${failure}`)
    }
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
