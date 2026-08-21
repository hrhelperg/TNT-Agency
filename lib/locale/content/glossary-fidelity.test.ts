import { describe, it, expect } from 'vitest'
import { EN_CONTENT } from './en/index'
import { DE_CONTENT } from './de/index'

/**
 * The "direct hire" inversion.
 *
 * WHAT HAPPENED. The Czech glossary defines one term plainly:
 *
 *     Přímý nábor – firma sama vyhledá a zaměstná pracovníka.
 *     ("direct recruitment — the company ITSELF finds and employs the worker")
 *
 * A reconciliation pass noticed a genuine ambiguity: the localized headword
 * "Direct hire" / "Direktvermittlung" collided with the service page at
 * /en/direct-hire, which is the agency placing someone into a client's
 * headcount. Two different meanings, one word — in Czech as well as in English.
 *
 * The remedy chosen was to redefine the glossary entry as agency-mediated so it
 * would agree with the slug. That resolved the collision by INVERTING THE
 * SOURCE: the glossary then said the agency finds and pre-selects the candidate,
 * which the Czech does not say and which is the opposite of what it does say.
 *
 * It was caught only because the evidence-verification agents were told that
 * MISSING is an acceptable answer. They returned MISSING for this item in both
 * locales rather than pointing at the surviving half of the sentence — "the
 * 'finds it itself' half is not reworded but contradicted". An agent instructed
 * to find a carrier would have pointed at "employs them directly" and the entry
 * would have looked verified.
 *
 * THE RULE THIS PINS. A terminology collision is never resolved by changing what
 * the source says. It is resolved by choosing a different headword. Source
 * fidelity outranks the tidiness of the glossary.
 */

const glossaryItems = (corpus: Record<string, any>, locale: 'en' | 'de'): string[] => {
  const entry = corpus['employer-glossary']?.[locale]
  if (!entry) throw new Error(`no ${locale} content for employer-glossary`)
  return entry.sections.flatMap((s: any) => (s.list ? s.list.items : []))
}

/** The glossary item defining the no-agency route, whichever headword it uses. */
const selfHireItem = (items: string[], locale: 'en' | 'de'): string => {
  const needle = locale === 'en'
    ? /(finds and employs the worker itself|employs the worker itself|on your own, without an agency)/i
    : /(sucht und beschäftigt die Person selbst|ohne Agentur)/i
  const hit = items.find((i) => needle.test(i))
  expect(
    hit,
    `no glossary item defines the no-agency route in ${locale}. The Czech source ` +
      `("firma sama vyhledá a zaměstná pracovníka") defines it, so a localized ` +
      `glossary that has lost it has dropped a source item, and one that has ` +
      `redefined it has inverted one.\nItems were:\n  ${items.join('\n  ')}`,
  ).toBeDefined()
  return hit as string
}

describe('glossary: the no-agency route keeps its source meaning', () => {
  for (const [locale, corpus] of [['en', EN_CONTENT], ['de', DE_CONTENT]] as const) {
    it(`${locale}: the company does the finding, not an agency`, () => {
      const item = selfHireItem(glossaryItems(corpus as any, locale), locale)

      // The inversion, stated positively: this definition must not hand the
      // searching or the pre-selection to an agency.
      const inverted = locale === 'en'
        ? /agency\s+(finds|sources|searches|pre-?selects|selects)/i
        : /(Agentur\s+(sucht|wählt|findet|sucht und wählt)|von der Agentur (gesucht|vorausgewählt))/i

      expect(
        inverted.test(item),
        `the ${locale} glossary attributes the search to an agency:\n  "${item}"\n` +
          `The Czech source says the COMPANY does it ("firma sama vyhledá a zaměstná ` +
          `pracovníka"). If this entry needs to stop colliding with the ` +
          `/${locale}/direct-hire service page, change the HEADWORD — never the meaning.`,
      ).toBe(false)
    })
  }

  it('the agency-mediated route is defined separately and is not confused with it', () => {
    // Both meanings must exist and stay distinct: the glossary carries the
    // no-agency route, and agency employment is its own entry.
    for (const [locale, corpus] of [['en', EN_CONTENT], ['de', DE_CONTENT]] as const) {
      const items = glossaryItems(corpus as any, locale)
      const selfHire = selfHireItem(items, locale)
      const agency = items.find((i) =>
        locale === 'en' ? /employee of the agency|agency employment/i.test(i) : /bei der Personalagentur angestellt|Arbeitnehmerüberlassung/i.test(i),
      )
      expect(agency, `${locale}: no glossary item defines the agency route`).toBeDefined()
      expect(selfHire, `${locale}: the two routes collapsed into one item`).not.toBe(agency)
    }
  })
})
