import { describe, it, expect } from 'vitest'
import { EN_CONTENT } from './content/en'
import { DE_CONTENT } from './content/de'

/**
 * The English and German about pages claimed "We publish the identifiers needed
 * for those checks" while the Czech source deliberately withholds them until
 * verified ("zveřejníme až po ověření", "záměrně nezveřejňujeme"). That is a
 * translation asserting a fact its source denies, on the page whose subject is
 * how to verify the agency.
 *
 * It survived review because the check that was supposed to catch it ran
 * `grep -oE '[0-9]{8}'` over RAW HTML and matched build-asset hashes, then
 * reported the identifiers as present. So these tests do two things: assert the
 * claim is gone, and assert the detector cannot repeat that mistake.
 */
const paragraphs = (corpus: any, locale: string) => {
  const e = corpus['about-us'][locale]
  return [e.title, e.description, e.h1, e.intro, ...e.sections.flatMap((s: any) => [s.heading, ...s.body])]
}

describe('about-us does not claim more than the Czech source', () => {
  for (const [name, corpus, locale] of [['EN', EN_CONTENT, 'en'], ['DE', DE_CONTENT, 'de']] as const) {
    it(`${name} makes no claim that identifiers ARE published`, () => {
      const text = paragraphs(corpus, locale).join(' ')
      // The exact retired sentences, and the shape of any successor.
      expect(text).not.toMatch(/We publish the identifiers/i)
      expect(text).not.toMatch(/Wir veröffentlichen die für diese Prüfung nötigen Kennungen/i)
      expect(text).not.toMatch(/\bwe publish\b[^.]{0,40}\bidentifiers?\b/i)
      expect(text).not.toMatch(/\bveröffentlichen\b[^.]{0,40}\bKennungen\b/i)
    })

    it(`${name} states the identifiers are withheld pending verification`, () => {
      const text = paragraphs(corpus, locale).join(' ').toLowerCase()
      const withholds =
        locale === 'en'
          ? /not stated as fact until|deliberately not stated|only details we have verified/
          : /nicht als tatsache|bewusst nicht|nur, was wir überprüft haben/
      expect(text).toMatch(withholds)
    })

    it(`${name} publishes no company or permit number of its own`, () => {
      // Identifier-shaped tokens in the CONTENT, which is what a reader sees.
      // Raw HTML is deliberately not the input here: asset hashes live there.
      const text = paragraphs(corpus, locale).join(' ')
      expect(text.match(/(?<!\d)\d{8}(?!\d)/g) ?? []).toEqual([])
      expect(text).not.toMatch(/\bIČO\b|\bICO\b|\bIdent\.?\s*[Nn]o\b/)
    })

    it(`${name} claims no licence, approval or endorsement`, () => {
      const text = paragraphs(corpus, locale).join(' ').toLowerCase()
      for (const forbidden of [
        'verified by the ministry', 'approved by the state', 'licensed for all',
        'state-approved', 'staatlich geprüft', 'staatlich zugelassen', 'vom ministerium geprüft',
      ]) {
        expect(text, forbidden).not.toContain(forbidden)
      }
    })
  }

  it('the detector itself cannot be fooled by an asset hash', () => {
    // Guarding the guard. This is the false positive that let the defect ship:
    // an 8-digit run inside markup is not an identifier.
    const rawHtmlLike = '<script src="/_next/static/chunks/13010416-42077685.js"></script>'
    const contentLike = 'Only details we have verified are published here.'
    const eightDigits = (s: string) => s.match(/(?<!\d)\d{8}(?!\d)/g) ?? []
    expect(eightDigits(rawHtmlLike).length).toBeGreaterThan(0)   // raw HTML DOES contain them
    expect(eightDigits(contentLike)).toEqual([])                  // the content does not
    // Therefore any validator asserting "identifiers are present/absent" must
    // read rendered text, never raw HTML. lib/locale/content/* IS the text.
  })
})
