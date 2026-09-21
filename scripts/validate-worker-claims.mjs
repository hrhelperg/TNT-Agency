/**
 * The permanent truth gate for the LATAM candidate corpus.
 *
 * Twelve things that must never be true of this site again. Six come from the
 * brief's own counterexample list; six more were added by the design decisions
 * this wave made. Each is checked here, and scripts/mutate-worker-claims.mjs
 * injects each one to prove the check actually fails on it — a gate nobody has
 * seen fail is a gate nobody has seen.
 *
 * Patterns are matched in Portuguese, Spanish and English, because the claim is
 * the defect regardless of which corpus states it.
 *
 * These are not stylistic rules. Every one of them is a statement that would be
 * FALSE if published, addressed to people deciding whether to move countries.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const BUILD = path.join(ROOT, '.next/server/pages')
const R = await import('../lib/locale/registry.ts')
const PTBR = (await import('../lib/locale/content/pt-BR/index.ts')).PTBR_CONTENT
const ES = (await import('../lib/locale/content/es/index.ts')).ES_CONTENT

const CANDIDATE_DIRS = [
  'lib/locale/content/pt-BR',
  'lib/locale/content/es',
  'lib/locale/candidate-application',
  'lib/locale/candidate-chrome.ts',
  'components/locale/CandidateApplicationForm.tsx',
  'components/locale/CandidateHeader.tsx',
  'components/locale/CandidateFooter.tsx',
]

/** Employer destinations a candidate page may never link to. */
const EMPLOYER_DESTINATIONS = [
  '/poptavka-pracovniku',
  '/en/request-staff',
  '/de/personal-anfragen',
  '/offers',
  '/submit-offer',
  '/agencies',
  '/submit-agency',
]

/**
 * Forbidden claims.
 *
 * Each `re` is written to match the ASSERTION, not the topic. Pages must be able
 * to discuss the Mercosur agreement, the qualified-worker programme and the
 * 90-day exemption — they are required to, in order to correct them — so the
 * patterns target the shape of the false statement rather than its keywords.
 */
const FORBIDDEN = [
  {
    id: 'brazil-in-qualified-programme',
    why: 'Brazil is not among the countries in Program kvalifikovaný zaměstnanec (MPO, eff. 15.3.2026).',
    re: /(brasil|brazil|brasileir\w+|latinoamerican\w+)[^.!?]{0,80}(est[áa]|es[táa]?n?|participa\w*|inclu\w+|faz parte|forma parte)[^.!?]{0,40}program\w*\s+(kvalifikovan|de trabajador cualificado|de trabalhador qualificado|qualified)/iu,
  },
  {
    id: 'mercosur-grants-work-right',
    why: 'EU–Mercosur Mode 4 covers temporary business entry for service suppliers only; it creates no general work authorisation.',
    re: /(mercosu[lr])[^.!?]{0,90}\b(permite|permits?|da|d[áa]|concede|grants?|otorga|garante|garantiza)\b[^.!?]{0,60}\b(trabalhar|trabajar|work|emprego|empleo|direito de trabalho|derecho a trabajar|work right)\b/iu,
  },
  {
    id: 'visa-free-work',
    why: 'The short-stay exemption applies only where the purpose is NOT gainful activity (Embassy Brasília).',
    re: /\b(sem visto|sin visado|visa[- ]free|isen[çc][ãa]o de visto|exento de visado)\b[^.!?]{0,80}\b(trabalh\w+|trabaj\w+|work\w*)\b/iu,
  },
  {
    id: 'guaranteed-two-year-visa',
    why: 'TalentPartnerID is not the immigration authority and guarantees no permit or duration.',
    re: /\b(garant\w+|guarantee\w*)\b[^.!?]{0,60}\b(visto|visado|visa|autoriza[çc][ãa]o|permit)\b[^.!?]{0,40}\b(dois anos|dos años|two years|2 anos|2 años)\b/iu,
  },
  {
    id: 'card-always-two-years',
    why: 'The card is issued for the contract duration, at most two years per issuance (§42g of Act 326/1999 Sb.).',
    re: /\b(cart[ãa]o de empregado|tarjeta de empleado|employee card|zam[ěe]stnaneck[áa] karta)\b[^.!?]{0,60}\b(sempre|siempre|always)\b[^.!?]{0,40}\b(dois anos|dos años|two years)\b/iu,
  },
  {
    id: 'issues-residence-permits',
    why: 'Residence permits are issued by the Ministry of the Interior, never by a recruitment agency.',
    re: /\btalentpartnerid\b[^.!?]{0,60}\b(emite|emitimos|expide|expedimos|issues?|concede|otorga)\b[^.!?]{0,50}\b(vistos?|visados?|visas?|autoriza[çc][õo]es de resid[êe]ncia|permisos de residencia|residence permits?)\b/iu,
  },
]

const walk = (dir, out = []) => {
  if (!fs.existsSync(dir)) return out
  if (fs.statSync(dir).isFile()) return [dir]
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) walk(full, out)
    else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\./.test(e.name)) out.push(full)
  }
  return out
}

const stripComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ')

/**
 * Negation and interrogation, in the three languages the corpus uses.
 *
 * The corpus is REQUIRED to name every one of these falsehoods — the FAQ asks
 * "O acordo UE–Mercosul permite trabalhar na República Tcheca sem autorização?"
 * precisely so it can answer "Não", and the trust pages say in as many words
 * that TalentPartnerID does not issue residence permits. A gate that could not
 * tell asserting a claim from asking about it or denying it would force the
 * corpus to go silent on exactly the misconceptions it exists to correct, which
 * would make candidates less safe rather than more.
 *
 * So matching is per SENTENCE, and a sentence is exempt when it is a question or
 * carries a negation. Negation scoping is safe here — unlike in
 * validate-claims.mjs, where a bare term like "garantia" needed an allowlist —
 * because every pattern below already requires a full assertion shape (subject,
 * verb and object together), which a negation reliably inverts.
 */
/**
 * Negation is LANGUAGE-SCOPED, and that is not fussiness.
 *
 * A single pattern containing a bare `no` hollowed this gate out completely.
 * In Portuguese `no` is a contraction of em+o — "no Program kvalifikovaný"
 * means "in the Program" — so every assertive sentence naming a programme
 * exempted itself as if it were a denial. Negative control 1 passed the gate
 * while stating outright that Brazil is in the qualified-worker programme, and
 * control 3 while stating that the visa exemption permits work.
 *
 * Portuguese negation is `não`. Spanish negation is `no`. They cannot share a
 * pattern, so they do not.
 *
 * Where the language is unknown — chrome and form modules hold both — the
 * STRICT set applies: bare `no` does not exempt. That risks a false positive
 * and never a false exemption, which is the correct direction for a gate whose
 * failure mode is publishing something untrue.
 */
const NEGATION_PT = /\b(n[ãa]o|nem|nunca|jamais|nenhum\w*|ningu[ée]m)\b/iu
const NEGATION_ES = /\b(no|ni|nunca|jam[áa]s|ning[úu]n\w*|ninguna\w*|nadie|tampoco)\b/iu
const NEGATION_STRICT = /\b(n[ãa]o|nem|nunca|jamais|nenhum\w*|ningu[ée]m|ni|jam[áa]s|ning[úu]n\w*|nadie|tampoco|not|never|neither|nor)\b/iu

const negationFor = (lang) =>
  lang === 'pt' ? NEGATION_PT : lang === 'es' ? NEGATION_ES : NEGATION_STRICT

/** Which negation set a file's sentences are judged by. */
const langOf = (file) =>
  /content[\/\\]pt-BR[\/\\]/.test(file) ? 'pt' : /content[\/\\]es[\/\\]/.test(file) ? 'es' : 'any'

/** Split into sentences, keeping the terminator so questions stay identifiable. */
const sentences = (text) =>
  text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((x) => x.replace(/\s+/g, ' ').trim())
    .filter(Boolean)

/**
 * Interrogative, tolerating source-literal punctuation.
 *
 * A FAQ heading reaches this as `heading: 'Isto é verdade?',` — the '?' is
 * followed by a quote and a comma, so a bare endsWith('?') misses every one of
 * them. Trailing quotes, commas and brackets are stripped before the test, and
 * a leading '¿' counts on its own, because Spanish opens the question there.
 */
const isQuestion = (sentence) => /[?]\s*['"`,);\]]*$/.test(sentence) || /¿/.test(sentence)

const isExempt = (sentence, lang) => isQuestion(sentence) || negationFor(lang).test(sentence)

export function auditWorkerClaims({ corpora = null, sourceFiles = null, readBuild = true, routes = null } = {}) {
  const errors = []
  const notes = []

  // 1-6. Forbidden claims, in the authored corpus.
  const files = sourceFiles ?? CANDIDATE_DIRS.flatMap((d) => walk(path.join(ROOT, d)))
  let scanned = 0
  for (const file of files) {
    const text = stripComments(fs.readFileSync(file, 'utf8'))
    scanned++
    const lang = langOf(file)
    for (const sentence of sentences(text)) {
      if (isExempt(sentence, lang)) continue
      for (const claim of FORBIDDEN) {
        const m = sentence.match(claim.re)
        if (m) {
          errors.push(
            `${path.relative(ROOT, file)}: forbidden claim [${claim.id}] — "${m[0].slice(0, 120)}" in: "${sentence.slice(0, 140)}". ${claim.why}`,
          )
        }
      }
    }
  }
  // The injected-corpus path, for the mutation harness.
  if (corpora) {
    for (const [locale, corpus] of Object.entries(corpora)) {
      for (const [conceptId, entry] of Object.entries(corpus)) {
        const page = entry?.[locale]
        if (!page) continue
        const text = [
          page.title, page.description, page.h1, page.intro,
          ...page.sections.flatMap((s) => [s.heading, ...s.body, ...(s.list ? [s.list.intro ?? '', ...s.list.items] : [])]),
        ].join(' \n ')
        const lang = locale === 'pt-BR' ? 'pt' : locale === 'es' ? 'es' : 'any'
        for (const sentence of sentences(text)) {
          if (isExempt(sentence, lang)) continue
          for (const claim of FORBIDDEN) {
            const m = sentence.match(claim.re)
            if (m) errors.push(`${locale}/${conceptId}: forbidden claim [${claim.id}] — "${m[0].slice(0, 120)}" in: "${sentence.slice(0, 140)}"`)
          }
        }
      }
    }
  }

  // 7. No vacancy route may exist while there is no vacancy source of truth.
  const VACANCY_ROUTE = /\/(vagas|empleos|empregos|available-jobs|job-listings|ofertas-de-emprego|ofertas-de-empleo)\b/i
  const allRoutes = routes ?? [...R.LOCALIZED_ROUTES, ...R.CZECH_ROUTES]
  for (const route of allRoutes) {
    if (VACANCY_ROUTE.test(route)) {
      errors.push(
        `route "${route}" promises vacancies, but no vacancy source of truth exists — a URL that promises openings ` +
          `is a promise the site cannot keep`,
      )
    }
  }

  // 8. No JobPosting structured data on a candidate page.
  // 12. No x-default on a locale-native cluster.
  // 11. No discovery target inside an hreflang cluster.
  if (readBuild && fs.existsSync(BUILD)) {
    for (const concept of R.ALL_CONCEPTS) {
      for (const locale of R.LOCALIZED_LOCALES) {
        if (!concept.published.includes(locale)) continue
        if (!R.isCandidateLocale(locale)) continue
        const url = R.urlFor(concept, locale)
        if (!url) continue
        const rel = url.replace(/^\//, '')
        const a = path.join(BUILD, `${rel}.html`)
        const file = fs.existsSync(a) ? a : path.join(BUILD, rel, 'index.html')
        if (!fs.existsSync(file)) continue
        const html = fs.readFileSync(file, 'utf8')

        if (/"@type"\s*:\s*"JobPosting"/.test(html)) {
          errors.push(
            `${url}: declares JobPosting structured data, but this is an informational page and no current vacancy ` +
              `backs it — fake job markup is the SEO defect §38 forbids`,
          )
        }
        if (concept.kind === 'locale-native' && /hreflang="x-default"/.test(html)) {
          errors.push(
            `${url}: a locale-native candidate cluster emits x-default, which points at the Czech EMPLOYER root — ` +
              `the wrong destination for an unmatched candidate`,
          )
        }
        for (const dest of EMPLOYER_DESTINATIONS) {
          if (new RegExp(`href="${dest}"`).test(html)) {
            errors.push(`${url}: links to the employer destination ${dest} from a candidate page`)
          }
        }
      }
    }
  }

  // 11. No employer page may declare a candidate locale as its alternate.
  //     Discovery is navigation, not equivalence: the Czech employer homepage
  //     and /pt-br are not translations of each other, and a cluster saying so
  //     tells a search engine something false.
  if (readBuild && fs.existsSync(BUILD)) {
    for (const employerHome of ['/', '/en', '/de']) {
      const rel = employerHome === '/' ? 'index' : employerHome.replace(/^\//, '')
      const a = path.join(BUILD, `${rel}.html`)
      const file = fs.existsSync(a) ? a : path.join(BUILD, rel, 'index.html')
      if (!fs.existsSync(file)) continue
      const html = fs.readFileSync(file, 'utf8')
      for (const locale of R.LOCALES.filter(R.isCandidateLocale)) {
        const code = R.LOCALE_HREFLANG[locale]
        if (new RegExp(`<link[^>]+rel="alternate"[^>]+hreflang="${code}"`, 'i').test(html)) {
          errors.push(
            `${employerHome}: declares hreflang="${code}" — an employer page claiming a candidate page as its ` +
              `translation. Discovery belongs in the footer as navigation, never in an hreflang cluster`,
          )
        }
      }
    }
  }

  // 9. No file input anywhere in the candidate layer.
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8')
    if (/<input[^>]*type\s*=\s*["'{]?\s*file/i.test(stripComments(text))) {
      errors.push(
        `${path.relative(ROOT, file)}: declares a file input. The site has no backend able to receive a CV, so the ` +
          `control would look like it works and would not — and it would turn a page that stores nothing into one ` +
          `holding candidate CVs`,
      )
    }
  }

  // 10. Candidate CTA target must never be an employer concept.
  //
  //     Reads the ACTIVE corpora, honouring an injected override. Reading the
  //     module constants instead let the mutation harness inject a CTA pointing
  //     at request-staff and watch this gate report PASS — a gate that cannot
  //     fail. Negative control 10 is what found it.
  const activeCorpora = corpora ?? { 'pt-BR': PTBR, es: ES }
  for (const [locale, corpus] of Object.entries(activeCorpora)) {
    for (const [conceptId, entry] of Object.entries(corpus)) {
      const page = entry?.[locale]
      if (!page || !page.cta) continue
      const target = R.ALL_CONCEPTS.find((c) => c.id === page.cta.targetConceptId)
      if (!target) {
        errors.push(`${locale}/${conceptId}: CTA targets unknown concept "${page.cta.targetConceptId}"`)
        continue
      }
      if (target.audience === 'employer') {
        errors.push(
          `${locale}/${conceptId}: CTA targets "${target.id}", an employer concept — candidate traffic must never be ` +
            `routed into the employer funnel`,
        )
      }
    }
  }

  notes.push(`${scanned} candidate source file(s) scanned for ${FORBIDDEN.length} forbidden claim shapes`)
  notes.push(`${allRoutes.length} route(s) checked for vacancy promises`)
  notes.push('build checked for JobPosting, x-default on locale-native clusters, and employer links')
  return { errors, notes }
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (invokedDirectly) {
  const { errors, notes } = auditWorkerClaims()
  console.log('Worker-claim truth gate')
  notes.forEach((n) => console.log('  · ' + n))
  if (errors.length) {
    console.log(`\n${errors.length} violation(s):`)
    errors.forEach((e) => console.log('  ✗ ' + e))
    console.log('\nWorker-claim truth gate: FAIL')
    process.exit(1)
  }
  console.log('\nWorker-claim truth gate: PASS')
}
