import { useLang } from '../lib/i18n/react'

// Strategy 2: our editorial articles are authoritative Czech legal/employment
// content that must NOT be machine-translated. When the visitor selects English
// or German, the global chrome localizes but the article body stays Czech — this
// restrained notice states that honestly and offers a one-click switch to Czech.
// It renders nothing for Czech visitors and is SSR-safe (first render = cs = null,
// so no hydration mismatch).

const NOTICE = {
  en: 'This expert article is currently available in Czech. The interface and navigation are shown in English, while the original Czech text is preserved to avoid inaccurate translation of employment and legal terminology.',
  de: 'Dieser Fachartikel ist derzeit auf Tschechisch verfügbar. Benutzeroberfläche und Navigation werden auf Deutsch angezeigt; der tschechische Originaltext bleibt erhalten, um ungenaue Übersetzungen arbeitsrechtlicher und fachlicher Begriffe zu vermeiden.',
} as const

const ACTION = { en: 'Read in Czech', de: 'Auf Tschechisch lesen' } as const

export default function ArticleLanguageNotice() {
  const lang = useLang()
  if (lang === 'cs') return null
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
