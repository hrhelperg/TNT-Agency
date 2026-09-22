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

/**
 * A list inside a section.
 *
 * The Czech source pages carry `bullets` on their sections — 395 across the 37
 * concepts that have a source — and this type had nowhere to put any of them.
 * Everything bulleted was therefore folded into prose or dropped when the
 * localized pages were authored, and an audit of all 38 concepts found 240
 * load-bearing items gone: role ladders whose rungs are never named, "a sequence
 * of steps" that lists no step, checklists reduced to the sentence announcing
 * them. The announcing sentence usually survived, so the page went on promising
 * what it no longer delivered.
 *
 * Lists are therefore representable, and structural — not a paragraph of
 * semicolons impersonating a list, which is what prose-folding produced.
 */
export interface LocaleList {
  /** Sentence introducing the list, where the source has one. */
  readonly intro?: string
  /**
   * Ordered ONLY where the source describes a sequence — steps that occur in an
   * order, not a set of things that happen to be enumerated. Nearly every Czech
   * bullet block is unordered, which is the default.
   */
  readonly ordered?: boolean
  readonly items: readonly string[]
}

/**
 * How fast a claim goes stale.
 *
 * Two tiers rather than one calendar ceiling, because the risks are not alike.
 * A consular appointment procedure or a document list can change without notice
 * and a stale one costs a candidate a flight; the definition of an Employee Card
 * changes when the statute changes. Treating both as 180-day content would let
 * procedure rot for half a year, and treating both as 90-day content would
 * churn stable explainers for nothing.
 */
export type FreshnessTier = 'procedural' | 'conceptual'

/** Days a tier may go unverified before the build fails. */
export const FRESHNESS_DAYS: Readonly<Record<FreshnessTier, number>> = {
  procedural: 90,
  conceptual: 180,
}

/** A primary source a claim rests on. */
export interface LocaleSource {
  /** Key into SOURCE_REVISIONS — how a source change invalidates content. */
  readonly id: string
  readonly name: string
  readonly publisher: string
  readonly url: string
  /** ISO date the URL was last opened and the claim re-read. */
  readonly accessedAt: string
}

/**
 * Freshness metadata for time-sensitive candidate content.
 *
 * Optional on LocalePageContent so the en/de employer corpus is untouched;
 * required by scripts/validate-candidate-freshness.mjs for every concept in the
 * candidate tier, which is where the risk actually lives.
 */
export interface LocaleFreshness {
  readonly jurisdiction: 'CZ'
  readonly audienceMarket: 'BR' | 'LATAM'
  /** ISO date the page's claims were last checked against their sources. */
  readonly lastVerifiedAt: string
  /** Where a rule has a known start date. */
  readonly effectiveFrom?: string
  readonly officialSources: readonly LocaleSource[]
  readonly freshness: FreshnessTier
  readonly timeSensitive: true
}

export interface LocaleSection {
  readonly heading: string
  /** Paragraphs. Plain strings — no markup, so nothing can inject structure. */
  readonly body: readonly string[]
  /** Rendered after the body paragraphs, mirroring the Czech `bullets` field. */
  readonly list?: LocaleList
  /**
   * Tightens this section's tier above the page's own.
   *
   * A page can be conceptual while one of its sections is not: the Employee
   * Card explainer is stable, but the paragraph naming processing times and
   * appointment mechanics inside it is procedural. The stricter tier always
   * wins, so a 90-day block cannot hide inside a 180-day page.
   */
  readonly freshness?: FreshnessTier
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
  /** Required for the candidate tier; absent on the en/de employer corpus. */
  readonly freshness?: LocaleFreshness
}

/** Content for one concept, per non-Czech locale. */
export type ConceptContent = Readonly<Partial<Record<Exclude<Locale, 'cs'>, LocalePageContent>>>

/** The whole localized corpus, keyed by concept id. */
export type LocaleCorpus = Readonly<Record<string, ConceptContent>>
