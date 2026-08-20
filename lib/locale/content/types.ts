/**
 * Locale page content.
 *
 * Localized copy lives HERE, in typed objects keyed by route identity, and is
 * rendered into the initial HTML. It is not produced by the client dictionary
 * in public/script.js: that swaps shared chrome after hydration, which is fine
 * for a nav label and useless for a page a crawler must read.
 *
 * So the rule this type enforces by existing: an EN or DE page's title,
 * description, H1, body, breadcrumb and CTA are server-rendered strings, and
 * nothing page-specific depends on JavaScript running.
 */

import type { Locale } from '../registry'

export interface LocaleSection {
  readonly heading: string
  /** Paragraphs. Plain strings — no markup, so nothing can inject structure. */
  readonly body: readonly string[]
}

export interface LocalePageContent {
  /** <title>. */
  readonly title: string
  /** <meta name="description">. */
  readonly description: string
  /** The single visible H1. */
  readonly h1: string
  /** Lead paragraph under the H1. */
  readonly intro: string
  readonly sections: readonly LocaleSection[]
  readonly breadcrumb: string
  readonly cta: {
    readonly label: string
    /** Route identity, resolved through the registry — never a hardcoded URL. */
    readonly targetConceptId: string
    readonly note?: string
  }
}

/** Content for one concept, per non-Czech locale. */
export type ConceptContent = Readonly<Partial<Record<Exclude<Locale, 'cs'>, LocalePageContent>>>

/** The whole localized corpus, keyed by concept id. */
export type LocaleCorpus = Readonly<Record<string, ConceptContent>>
