import type { LocaleCorpus } from './types'

/**
 * Combine cluster corpora into one, refusing any concept defined twice.
 *
 * The whole point of splitting content by cluster is that no single file has to
 * hold everything. The cost is that two files can now claim the same concept id
 * and a plain object spread would let the later one win in silence — the page
 * would render, the tests would pass, and one cluster's copy would simply have
 * disappeared. So the merge throws instead, naming both clusters.
 */
export function mergeCorpora(
  locale: string,
  clusters: ReadonlyArray<readonly [string, LocaleCorpus]>,
): LocaleCorpus {
  const out: Record<string, unknown> = {}
  const owner = new Map<string, string>()
  for (const [name, corpus] of clusters) {
    for (const [conceptId, entry] of Object.entries(corpus)) {
      const existing = owner.get(conceptId)
      if (existing) {
        throw new Error(
          `${locale} corpus: concept "${conceptId}" is defined in both "${existing}" and "${name}". ` +
            `One would have silently overwritten the other.`,
        )
      }
      owner.set(conceptId, name)
      out[conceptId] = entry
    }
  }
  return out as LocaleCorpus
}
