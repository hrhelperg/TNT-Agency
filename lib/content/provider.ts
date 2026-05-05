// AI provider boundary. Intentionally interface-only.
// No external AI calls happen at page-render or build time. If a future
// workflow needs AI assistance, it must implement this interface and run
// outside the request path (e.g., in an editorial review tool).

export interface ContentProvider {
  /** Suggest a draft for human review. Implementations MUST NOT be invoked
   *  during page rendering or sitemap generation. */
  suggestDraft(input: {
    topicSlug: string
    locale: 'cs' | 'en' | 'de'
    structuredData: unknown
  }): Promise<{ draft: string; needsReview: true }>
}

export const NO_OP_PROVIDER: ContentProvider = {
  async suggestDraft() {
    throw new Error(
      'No AI provider configured. Generation must use deterministic templates.',
    )
  },
}
