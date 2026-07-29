import { describe, it, expect } from 'vitest'
import { findSeoPage } from './pages'

// Batch B — Czech employer authority (lock-in).
//
// Guarantees the nine Tier 1 hub enrichments (each: one new, source-backed legal
// section + a deepened source base) cannot silently regress. Every threshold is
// at or under the shipped state, so the gate only fails on a real regression.
// Honesty of the content itself is enforced by content-quality.test.ts
// (sources/no-dup/no-fabricated-stats), validate:czech and validate:trust.

const ENRICHED: Array<{ slug: string; newHeading: string; minSources: number }> = [
  { slug: 'pracovnici-do-vyroby', newHeading: 'Formy pracovněprávního vztahu u nástupních pozic ve výrobě', minSources: 8 },
  { slug: 'pracovnici-do-skladu', newHeading: 'Právní formy zajištění nástupních a sezónních pozic', minSources: 5 },
  { slug: 'pracovnici-do-logistiky', newHeading: 'Právní rámec flexibilního zajištění špiček v logistice', minSources: 10 },
  { slug: 'pracovnici-pro-potravinarskou-vyrobu', newHeading: 'Chlazené a mrazírenské provozy a ochrana zdraví při práci', minSources: 7 },
  { slug: 'pracovnici-pro-automotive', newHeading: 'Nepřetržitý provoz a rozvržení pracovní doby na lince', minSources: 7 },
  { slug: 'nabor-zahranicnich-pracovniku', newHeading: 'Etický a odpovědný nábor cizinců: ochrana pracovníků a výběr zprostředkovatele', minSources: 8 },
  { slug: 'nabor-zamestnancu-pardubice', newHeading: 'Úřady a zákonné povinnosti při náboru v Pardubickém regionu', minSources: 10 },
  { slug: 'nabor-zamestnancu-hradec-kralove', newHeading: 'Spádová dojížďka a místo výkonu práce ve smlouvě', minSources: 4 },
  { slug: 'trh-prace-stredocesky-kraj', newHeading: 'Místně příslušné úřady pro zaměstnavatele ve Středočeském kraji', minSources: 11 },
]

describe('Batch B — Tier 1 employer-authority depth', () => {
  it('every enriched hub resolves to a real SEO page', () => {
    for (const e of ENRICHED) expect(findSeoPage(e.slug), e.slug).toBeTruthy()
  })

  it('every enriched hub still carries its new source-backed legal section', () => {
    for (const e of ENRICHED) {
      const headings = findSeoPage(e.slug)!.sections.map((s) => s.heading)
      expect(headings, `${e.slug} new section`).toContain(e.newHeading)
    }
  })

  it('every enriched hub keeps its deepened source base', () => {
    for (const e of ENRICHED) {
      expect(findSeoPage(e.slug)!.sources.length, `${e.slug} sources`).toBeGreaterThanOrEqual(e.minSources)
    }
  })

  it('every enriched hub cites only verified sources (named publisher or legal act)', () => {
    for (const e of ENRICHED) {
      for (const s of findSeoPage(e.slug)!.sources) {
        expect(!!s.publisher || /Zákon|Směrnice|Sb\./i.test(s.name), `${e.slug}: ${s.name}`).toBe(true)
      }
    }
  })

  it('the new legal sections carry no bare numeric statistic (fabrication guard)', () => {
    // A precise figure would need a source alongside it; these sections are
    // deliberately qualitative and defer numbers to official registers.
    for (const e of ENRICHED) {
      const section = findSeoPage(e.slug)!.sections.find((s) => s.heading === e.newHeading)!
      const text = [...section.body, ...(section.bullets ?? [])].join(' ')
      // Allow bare "§ 39", "§ 309", "č. 262/2006 Sb." legal citations; forbid
      // grouped thousands ("12 000") and percentages ("12 %").
      const withoutLegalRefs = text
        .replace(/§\s?\d+/g, ' ')
        .replace(/č\.\s?\d+\/\d+\s?Sb\./g, ' ')
        .replace(/\b\d{4}\/\d{1,4}\b/g, ' ') // EU directive numbers e.g. 2021/1883
      const hasStat = /\b\d{1,3}[\s ]\d{3}\b|\b\d+([.,]\d+)?\s?%/.test(withoutLegalRefs)
      expect(hasStat, `${e.slug} new section has a bare statistic`).toBe(false)
    }
  })
})
