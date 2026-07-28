import { describe, it, expect } from 'vitest'
import {
  CZECH_TERMS,
  ROLE_DISTINCTIONS,
  FORBIDDEN_SUPERLATIVES,
  FORBIDDEN_CLAIMS,
  FAKE_URGENCY,
  termById,
  termByName,
  TERMS_VERSION,
} from './czech-terms'

describe('Czech terminology registry', () => {
  it('has a version and a non-trivial set of terms', () => {
    expect(TERMS_VERSION).toMatch(/^\d{4}-\d{2}$/)
    expect(CZECH_TERMS.length).toBeGreaterThanOrEqual(25)
  })

  it('every term has a non-empty id, term and definition', () => {
    for (const t of CZECH_TERMS) {
      expect(t.id, JSON.stringify(t)).toBeTruthy()
      expect(t.term.trim().length).toBeGreaterThan(1)
      expect(t.definition.trim().length).toBeGreaterThan(20)
    }
  })

  it('term ids are unique', () => {
    const ids = CZECH_TERMS.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('covers the concepts required by the Czech terminology standard (29.1)', () => {
    const required = [
      'agentura-prace', 'personalni-agentura', 'zprostredkovani-zamestnani',
      'agenturni-zamestnavani', 'docasne-prideleni', 'uzivatel', 'kmenovy-zamestnanec',
      'agenturni-zamestnanec', 'nabor-zamestnancu', 'primy-nabor', 'nabor-ze-zahranici',
      'pracovni-povoleni', 'zamestnanecka-karta', 'modra-karta', 'naklady-zamestnavatele',
      'hruba-mzda', 'cista-mzda', 'odvody-zamestnavatele', 'smenny-provoz', 'fluktuace',
      'absence', 'adaptace', 'onboarding', 'ubytovani', 'svoz-zamestnancu', 'bozp',
      'oopp', 'pracovnelekarska-prohlidka',
    ]
    for (const id of required) expect(termById(id), `missing term: ${id}`).toBeTruthy()
  })

  it('keeps the core role distinctions explicit', () => {
    const blob = ROLE_DISTINCTIONS.join(' ')
    for (const role of ['zaměstnavatel', 'uživatel', 'agentura práce', 'zaměstnanec', 'uchazeč', 'cizinec']) {
      expect(blob).toContain(role)
    }
  })

  it('lookup helpers resolve by id and by exact Czech form', () => {
    expect(termById('agentura-prace')?.term).toBe('agentura práce')
    expect(termByName('Agentura Práce')?.id).toBe('agentura-prace')
    expect(termById('does-not-exist')).toBeUndefined()
  })

  it('honesty guard lists are populated and do not blanket-ban benign words', () => {
    expect(FORBIDDEN_SUPERLATIVES.length).toBeGreaterThan(5)
    expect(FORBIDDEN_CLAIMS.length).toBeGreaterThan(5)
    expect(FAKE_URGENCY.length).toBeGreaterThan(3)
    // Bare "nejlepší" must NOT be a hard-banned superlative (it is legitimate in
    // prose like "nejlepší je vyjít z oficiálního zdroje"); only marketing
    // phrases like "nejlepší agentura" are banned.
    expect(FORBIDDEN_SUPERLATIVES).not.toContain('nejlepší')
    expect(FORBIDDEN_SUPERLATIVES.some((s) => s.includes('nejlepší agentura'))).toBe(true)
  })
})
