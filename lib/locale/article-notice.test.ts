/**
 * The "this article is only available in Czech" notice must not lie.
 *
 * It shipped once claiming Czech-only on 37 pages that had translations. The
 * fix made the component ask the registry what exists, via a `route` prop — and
 * that fix is invisible to every gate in the repo, because the notice is
 * client-only (`useLang()` starts at 'cs'), so it appears in zero prerendered
 * HTML files. Deleting the prop from SeoArticle restores all 37 false notices
 * with the entire validate suite and all unit tests green.
 *
 * So the guard has to be here: the prop is optional by design (three Czech-only
 * pages render the notice without a route), which means nothing but a test can
 * require it at the one call site that renders translated articles.
 */
import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { LOCALE_CONCEPTS, alternatesFor } from './registry'

const ROOT = path.join(__dirname, '../..')
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8')

describe('ArticleLanguageNotice truthfulness', () => {
  it('is rendered with a route wherever it covers translatable articles', () => {
    const src = read('components/SeoArticle.tsx')
    expect(src).toMatch(/<ArticleLanguageNotice\b/)
    // Every occurrence in this file must carry a route; a bare one would make
    // the component fall back to the Czech-only branch for every article.
    for (const tag of src.match(/<ArticleLanguageNotice\b[^>]*>/g) ?? []) {
      // Matching /route=/ alone guarded the syntax, not the behaviour:
      // `route={undefined}` is identical to omitting the prop, and passes it.
      // The value has to be derived from the page being rendered.
      expect(tag, `SeoArticle renders the notice without a route: ${tag}`).toMatch(/\broute=\{/)
      expect(tag, `SeoArticle passes a literal undefined route: ${tag}`).not.toMatch(/route=\{\s*undefined\s*\}/)
      expect(tag, `SeoArticle's route is not derived from the page: ${tag}`).toMatch(/route=\{[^}]*\bslug\b/)
    }
  })

  it('resolves a translation for every concept that has one', () => {
    // What the notice asks the registry has to actually answer. If
    // alternatesFor stopped resolving by Czech route, the component would fall
    // through to "only in Czech" on every page without any gate objecting.
    const published = LOCALE_CONCEPTS.filter((c) => c.published.some((l) => l !== 'cs'))
    expect(published.length).toBeGreaterThan(0)

    for (const concept of published) {
      const alts = alternatesFor(concept.csPrimary)
      for (const locale of concept.published) {
        if (locale === 'cs') continue
        const hit = alts.find((a) => a.locale === locale)
        expect(hit, `${concept.csPrimary} is published in ${locale} but alternatesFor() offers no ${locale} target`).toBeTruthy()
        expect(hit!.url.startsWith(`/${locale}`)).toBe(true)
      }
    }
  })

  it('offers nothing for a collapsed Czech variant', () => {
    // The mirror case: a collapsed variant must NOT advertise a translation,
    // or the notice would link somewhere the page does not correspond to.
    const withCollapsed = LOCALE_CONCEPTS.find((c) => (c.csCollapsed?.length ?? 0) > 0)
    expect(withCollapsed).toBeTruthy()
    expect(alternatesFor(withCollapsed!.csCollapsed![0])).toHaveLength(0)
  })
})
