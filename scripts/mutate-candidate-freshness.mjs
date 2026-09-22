/**
 * Negative controls for the candidate freshness gate.
 *
 * Proves the gate fails on each way immigration content can go stale while
 * still looking current. The one that matters most is control 4: a page whose
 * calendar age is fine but whose cited source has been revised since it was
 * last checked. A calendar-only gate reports PASS on that for months.
 */
import { auditCandidateFreshness } from './validate-candidate-freshness.mjs'

const PTBR = (await import('../lib/locale/content/pt-BR/index.ts')).PTBR_CONTENT

const clone = (conceptId, patch) => ({
  'pt-BR': {
    [conceptId]: {
      'pt-BR': { ...PTBR[conceptId]['pt-BR'], ...patch },
    },
  },
})

const base = (conceptId) => PTBR[conceptId]['pt-BR']

const CONTROLS = [
  {
    id: '1. Candidate page with no freshness metadata at all',
    corpora: clone('employee-card', { freshness: undefined }),
  },
  {
    id: '2. Procedural page past its 90-day ceiling',
    corpora: clone('documents-required', {
      freshness: { ...base('documents-required').freshness, lastVerifiedAt: '2026-01-01' },
    }),
  },
  {
    id: '3. Conceptual page past its 180-day ceiling',
    corpora: clone('life-and-work', {
      freshness: { ...base('life-and-work').freshness, lastVerifiedAt: '2025-01-01' },
    }),
  },
  {
    id: '4. Fresh by the calendar, but a cited source was revised since',
    corpora: clone('work-in-czechia', {
      freshness: { ...base('work-in-czechia').freshness, lastVerifiedAt: '2026-09-20' },
    }),
    revisions: { 'mpo-program-vysoce-kvalifikovany': '2026-09-21' },
  },
  {
    id: '5. A page citing no official source',
    corpora: clone('employee-card', {
      freshness: { ...base('employee-card').freshness, officialSources: [] },
    }),
  },
  {
    id: '6. A conceptual page whose section is procedural, past 90 days',
    corpora: clone('employee-card', {
      freshness: { ...base('employee-card').freshness, lastVerifiedAt: '2026-05-01' },
      sections: [{ heading: 'Prazos', body: ['Texto.'], freshness: 'procedural' }],
    }),
  },
  {
    id: '7b. A typo in a cited source id (revision override silently dead)',
    corpora: clone('work-in-czechia', {
      freshness: {
        ...base('work-in-czechia').freshness,
        officialSources: [
          { ...base('work-in-czechia').freshness.officialSources[0], id: 'mpo-program-vysoce-kvalifikovany-TYPO' },
        ],
      },
    }),
  },
  {
    id: '7c. lastVerifiedAt in the future (passes every ceiling forever)',
    corpora: clone('employee-card', {
      freshness: { ...base('employee-card').freshness, lastVerifiedAt: '2030-01-01' },
    }),
  },
  {
    id: '7d. Verified today against a source last opened years ago',
    corpora: clone('employee-card', {
      freshness: {
        ...base('employee-card').freshness,
        officialSources: base('employee-card').freshness.officialSources.map((x) => ({
          ...x,
          accessedAt: '2019-01-01',
        })),
      },
    }),
  },
  {
    // Exercises the SHIPPED ledger. Every other control passes an injected
    // `revisions` object, and `{}` is truthy, so revisionFor and
    // SOURCE_REVISIONS were never called by the suite at all — the check billed
    // as "the one that matters most" was proven only against a stub.
    id: '7e. Real SOURCE_REVISIONS ledger invalidates a page verified before a recorded revision',
    corpora: clone('work-in-czechia', {
      freshness: { ...base('work-in-czechia').freshness, lastVerifiedAt: '2026-05-31' },
    }),
    useRealLedger: true,
  },
  {
    id: '7. timeSensitive quietly flipped to false',
    corpora: clone('employee-card', {
      freshness: { ...base('employee-card').freshness, timeSensitive: false },
    }),
  },
  {
    // Spreads then explicitly clears validForYear, and replaces the sections.
    // Inheriting them from live content made this control vacuous the moment
    // worker-rights legitimately gained a validForYear of its own.
    id: '12. statutory-annual page that declares no validForYear',
    corpora: clone('worker-rights', {
      freshness: {
        ...base('worker-rights').freshness,
        freshness: 'statutory-annual',
        validForYear: undefined,
      },
      sections: [{ heading: 'Jornada', body: ['Texto.'] }],
    }),
  },
  {
    id: '13. statutory figures declared for 2026, read in 2027',
    corpora: clone('worker-rights', {
      freshness: {
        ...base('worker-rights').freshness,
        freshness: 'statutory-annual',
        validForYear: 2026,
        lastVerifiedAt: '2026-12-20',
      },
    }),
    now: Date.parse('2027-01-02'),
  },
  {
    // Sections are replaced so the page's effective tier is genuinely
    // conceptual. Left as shipped, life-and-work now carries a statutory-annual
    // section, which raised the effective tier and silenced this control.
    id: '14. validForYear on a conceptual page, where it gates nothing',
    corpora: clone('life-and-work', {
      freshness: {
        ...base('life-and-work').freshness,
        freshness: 'conceptual',
        validForYear: 2026,
      },
      sections: [{ heading: 'Moradia', body: ['Texto.'] }],
    }),
  },
  {
    id: '15. statutory-annual section hiding inside a conceptual page, past 90 days',
    corpora: clone('life-and-work', {
      freshness: {
        ...base('life-and-work').freshness,
        lastVerifiedAt: '2026-05-01',
        validForYear: 2026,
      },
      sections: [{ heading: 'Salário mínimo', body: ['Texto.'], freshness: 'statutory-annual' }],
    }),
  },
  {
    id: '16. POSITIVE CONTROL — a correct statutory-annual page inside its year',
    expectClean: true,
    corpora: clone('worker-rights', {
      freshness: {
        ...base('worker-rights').freshness,
        freshness: 'statutory-annual',
        validForYear: 2026,
        lastVerifiedAt: '2026-09-20',
      },
    }),
  },
  {
    id: '17. A hole in officialSources (sparse array, type-checks clean)',
    corpora: clone('worker-rights', {
      freshness: {
        ...base('worker-rights').freshness,
        officialSources: [base('worker-rights').freshness.officialSources[0], undefined],
      },
    }),
  },
]

let failures = 0
console.log('Candidate freshness negative controls\n')
for (const c of CONTROLS) {
  const { errors } = auditCandidateFreshness({
    corpora: c.corpora,
    // Per-control, because a year-expiry control cannot be expressed by mutating
    // content alone — the thing that changes is the calendar, not the page.
    now: c.now ?? Date.parse('2026-09-21'),
    // `null` means "use the shipped revisionFor"; an object stubs it.
    revisions: c.useRealLedger ? null : (c.revisions ?? {}),
  })
  // A harness where every control must fail is satisfied by a validator that
  // rejects everything. The positive control is what makes the other fifteen
  // mean something.
  if (c.expectClean) {
    if (errors.length === 0) {
      console.log(`  ✓ ${c.id} — passed clean, as it must`)
    } else {
      console.log(`  ✗ ${c.id} — WRONGLY REJECTED: ${errors[0]}`)
      failures++
    }
    continue
  }
  if (errors.length) {
    console.log(`  ✓ ${c.id} — caught (${errors.length})`)
  } else {
    console.log(`  ✗ ${c.id} — NOT CAUGHT: stale content would present itself as current`)
    failures++
  }
}
console.log()
if (failures) {
  console.log(`Candidate freshness negative controls: FAIL (${failures} uncaught)`)
  process.exit(1)
}
const positives = CONTROLS.filter((c) => c.expectClean).length
console.log(
  `Candidate freshness negative controls: PASS (${CONTROLS.length - positives} caught, ${positives} positive ` +
    `control(s) passed clean)`,
)
