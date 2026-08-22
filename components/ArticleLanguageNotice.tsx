import { useLang } from '../lib/i18n/react'
import { alternatesFor } from '../lib/locale/registry'

// Our editorial articles are authoritative Czech legal/employment content that
// must NOT be machine-translated. Where no human translation exists, the global
// chrome localizes but the article body stays Czech, and this notice says so
// honestly and offers a one-click switch to Czech.
//
// WHERE A TRANSLATION DOES EXIST, IT MUST SAY SOMETHING ELSE. L1 published
// human translations for 38 more concepts, and this component went on telling
// English and German readers that "the original Czech text is preserved to
// avoid inaccurate translation" on 43 of the 48 Czech concept primaries — while
// the header's own locale switcher, one element away, linked to the very
// translation the notice denied. Shipping a translation converted 37 previously
// truthful disclaimers into false ones. So the notice asks the registry what
// actually exists rather than assuming nothing does.
//
// It renders nothing for Czech visitors and is SSR-safe (first render = cs =
// null, so no hydration mismatch).

const NOTICE = {
  en: 'This expert article is currently available in Czech. The interface and navigation are shown in English, while the original Czech text is preserved to avoid inaccurate translation of employment and legal terminology.',
  de: 'Dieser Fachartikel ist derzeit auf Tschechisch verfügbar. Benutzeroberfläche und Navigation werden auf Deutsch angezeigt; der tschechische Originaltext bleibt erhalten, um ungenaue Übersetzungen arbeitsrechtlicher und fachlicher Begriffe zu vermeiden.',
} as const

const ACTION = { en: 'Read in Czech', de: 'Auf Tschechisch lesen' } as const

/** Shown when a human translation of THIS article is published. */
const TRANSLATED = {
  en: 'You are reading the Czech original. An English version of this article is available.',
  de: 'Sie lesen das tschechische Original. Eine deutsche Fassung dieses Artikels ist verfügbar.',
} as const

const TRANSLATED_ACTION = { en: 'Read in English', de: 'Auf Deutsch lesen' } as const

export default function ArticleLanguageNotice({ route }: { route?: string }) {
  const lang = useLang()
  if (lang === 'cs') return null

  // Ask the registry whether this exact article has a published counterpart in
  // the reader's language. No route (older call sites) behaves as before.
  const translation = route ? alternatesFor(route).find((a) => a.locale === lang) : undefined

  if (translation) {
    return (
      <aside className="article-lang-notice" role="note" aria-live="polite" lang={lang}>
        <p className="article-lang-notice__text">{lang === 'de' ? TRANSLATED.de : TRANSLATED.en}</p>
        <a className="article-lang-notice__btn" href={translation.url} hrefLang={lang}>
          {lang === 'de' ? TRANSLATED_ACTION.de : TRANSLATED_ACTION.en}
        </a>
      </aside>
    )
  }

  const text = lang === 'de' ? NOTICE.de : NOTICE.en
  const action = lang === 'de' ? ACTION.de : ACTION.en

  const switchToCzech = () => {
    const btn = document.querySelector<HTMLElement>('.lang-btn[data-lang="cs"]')
    if (btn) btn.click()
  }

  return (
    <aside className="article-lang-notice" role="note" aria-live="polite" lang={lang}>
      <p className="article-lang-notice__text">{text}</p>
      <button type="button" className="article-lang-notice__btn" onClick={switchToCzech}>
        {action}
      </button>
    </aside>
  )
}
