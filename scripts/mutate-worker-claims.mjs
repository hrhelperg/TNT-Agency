/**
 * Negative controls for the worker-claim truth gate.
 *
 * Twelve mutations, each a statement or structure that would be FALSE or
 * misleading if published to people deciding whether to move countries. Every
 * one must make scripts/validate-worker-claims.mjs FAIL. A gate nobody has
 * watched fail is a gate nobody has watched.
 *
 * Six come from the brief's counterexample list. Six more were added by design
 * decisions this wave made, and matter just as much: a vacancy route with no
 * vacancies behind it, JobPosting markup on an informational page, a file input
 * that cannot upload, a candidate CTA routed into the employer funnel, a
 * discovery link smuggled into an hreflang cluster, and an x-default pointing a
 * Brazilian candidate at a Czech employer homepage.
 *
 * Controls 1-6 deliberately inject the ASSERTIVE form. The gate exempts
 * questions and negations so the corpus can name these falsehoods in order to
 * correct them — these controls are what proves that exemption did not hollow
 * the gate out.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { auditWorkerClaims } from './validate-worker-claims.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const R = await import('../lib/locale/registry.ts')
const PTBR = (await import('../lib/locale/content/pt-BR/index.ts')).PTBR_CONTENT

/** A corpus with one page's prose replaced, leaving everything else intact. */
const withSentence = (conceptId, sentence) => {
  const base = PTBR[conceptId]?.['pt-BR']
  if (!base) throw new Error(`mutation target ${conceptId} not in the pt-BR corpus`)
  return {
    'pt-BR': {
      [conceptId]: {
        'pt-BR': {
          ...base,
          sections: [{ heading: 'Mutação', body: [sentence] }],
        },
      },
    },
  }
}

const TMP = path.join(ROOT, '.mutate-worker-claims.tmp.tsx')

const CONTROLS = [
  {
    id: '1. Brazil is in Program kvalifikovaný zaměstnanec',
    run: () => auditWorkerClaims({
      corpora: withSentence('work-in-manufacturing', 'O Brasil está incluído no Program kvalifikovaný zaměstnanec desde este ano.'),
      readBuild: false, sourceFiles: [],
    }),
  },
  {
    id: '2. EU-Mercosur grants Brazilians the right to work',
    run: () => auditWorkerClaims({
      corpora: withSentence('work-in-czechia', 'O acordo UE–Mercosul permite trabalhar na República Tcheca sem autorização adicional.'),
      readBuild: false, sourceFiles: [],
    }),
  },
  {
    id: '3. Brazilians may work visa-free for 90 days',
    run: () => auditWorkerClaims({
      corpora: withSentence('work-in-czechia', 'Com a isenção de visto você pode trabalhar por até 90 dias no espaço Schengen.'),
      readBuild: false, sourceFiles: [],
    }),
  },
  {
    id: '4. TalentPartnerID guarantees a two-year visa',
    run: () => auditWorkerClaims({
      corpora: withSentence('employee-card', 'A TalentPartnerID garante um visto de dois anos para todos os candidatos aprovados.'),
      readBuild: false, sourceFiles: [],
    }),
  },
  {
    id: '5. The Employee Card is always issued for two years',
    run: () => auditWorkerClaims({
      corpora: withSentence('employee-card', 'O cartão de empregado é sempre emitido por dois anos.'),
      readBuild: false, sourceFiles: [],
    }),
  },
  {
    id: '6. TalentPartnerID issues residence permits',
    run: () => auditWorkerClaims({
      corpora: withSentence('how-recruitment-works', 'A TalentPartnerID emite vistos e autorizações de residência para os seus candidatos.'),
      readBuild: false, sourceFiles: [],
    }),
  },
  {
    // Injected through the `routes` option rather than by redefining the
    // registry export: ES module namespace bindings are non-configurable, so
    // Object.defineProperty on them throws. Passing the mutated list in is both
    // possible and honest — it exercises the same code path the real run takes.
    id: '7. A vacancy route exists with no vacancy source',
    run: () =>
      auditWorkerClaims({
        routes: [...R.LOCALIZED_ROUTES, '/pt-br/vagas'],
        readBuild: false,
        sourceFiles: [],
      }),
  },
  {
    id: '8. JobPosting structured data on a candidate page',
    build: {
      route: '/pt-br/trabalho-na-industria',
      inject: '<script type="application/ld+json">{"@context":"https://schema.org","@type":"JobPosting","title":"Operador"}</script>',
    },
  },
  {
    id: '9. A file input in the candidate application',
    file: {
      path: TMP,
      contents: 'export default function X() {\n  return <input type="file" name="cv" />\n}\n',
    },
  },
  {
    id: '10. A candidate CTA routed into the employer funnel',
    run: () => auditWorkerClaims({
      corpora: {
        'pt-BR': {
          'work-in-czechia': {
            'pt-BR': {
              ...PTBR['work-in-czechia']['pt-BR'],
              cta: { label: 'Solicitar profissionais', targetConceptId: 'request-staff' },
            },
          },
        },
      },
      readBuild: false, sourceFiles: [],
    }),
  },
  {
    // The Czech employer homepage claiming /pt-br as its translation — the exact
    // confusion the discovery entry is built to avoid, injected at the level it
    // would actually appear.
    id: '11. A discovery link smuggled into an hreflang cluster',
    build: {
      route: '/',
      inject: '<link rel="alternate" hreflang="pt-BR" href="https://talentpartnerid.com/pt-br"/>',
    },
  },
  {
    id: '12. x-default on a locale-native candidate cluster',
    build: {
      route: '/pt-br/trabalho-na-industria',
      inject: '<link rel="alternate" hreflang="x-default" href="https://talentpartnerid.com/"/>',
    },
  },
]

let failures = 0
console.log('Worker-claim negative controls\n')

for (const control of CONTROLS) {
  let errors = []

  if (control.run) {
    errors = control.run().errors
  } else if (control.file) {
    fs.writeFileSync(control.file.path, control.file.contents)
    try {
      errors = auditWorkerClaims({ readBuild: false, sourceFiles: [control.file.path] }).errors
    } finally {
      fs.unlinkSync(control.file.path)
    }
  } else if (control.build) {
    const rel = control.build.route.replace(/^\//, '')
    const a = path.join(ROOT, '.next/server/pages', `${rel}.html`)
    const file = fs.existsSync(a) ? a : path.join(ROOT, '.next/server/pages', rel, 'index.html')
    if (!fs.existsSync(file)) {
      console.log(`  ⚠ ${control.id}: no build at ${control.build.route} — run \`npx next build\` first`)
      failures++
      continue
    }
    const original = fs.readFileSync(file, 'utf8')
    fs.writeFileSync(file, original.replace('</head>', `${control.build.inject}</head>`))
    try {
      errors = auditWorkerClaims({ sourceFiles: [] }).errors
    } finally {
      fs.writeFileSync(file, original)
    }
  }

  if (errors.length) {
    console.log(`  ✓ ${control.id} — caught (${errors.length})`)
  } else {
    console.log(`  ✗ ${control.id} — NOT CAUGHT: the gate passed on a claim it exists to stop`)
    failures++
  }
}

console.log()
if (failures) {
  console.log(`Worker-claim negative controls: FAIL (${failures} uncaught)`)
  process.exit(1)
}
console.log(`Worker-claim negative controls: PASS (${CONTROLS.length}/${CONTROLS.length} caught)`)
