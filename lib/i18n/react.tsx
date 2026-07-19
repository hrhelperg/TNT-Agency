import { useEffect, useState } from 'react';

// React-island language bridge.
//
// The site switches language client-side via public/script.js, which sets
// document.documentElement.lang, persists the choice in localStorage['tnt-lang'],
// and (see the added dispatch) emits a window 'tnt-lang' event. Server-rendered
// text is swapped by script.js via [data-i18n]; React islands that own their own
// content (the calculator) cannot use that, so they read the language here.
//
// SSR + the first client render both return the document default ('cs', matching
// <Html lang="cs">) to avoid a hydration mismatch; the real preference is applied
// after mount. Only the non-sensitive language code is ever read — never salary
// or form data.

export type Lang = 'cs' | 'en' | 'de';
export const LANGS: Lang[] = ['cs', 'en', 'de'];
export const DEFAULT_LANG: Lang = 'cs';

export function normalizeLang(value: string | null | undefined): Lang {
  return LANGS.includes(value as Lang) ? (value as Lang) : DEFAULT_LANG;
}

/** Pick the active translation from a cs/en/de record. */
export function pick<T>(lang: Lang, record: Record<Lang, T>): T {
  return record[lang] ?? record[DEFAULT_LANG];
}

export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const read = () => {
      const fromDoc = document.documentElement.lang;
      const fromStore = typeof localStorage !== 'undefined' ? localStorage.getItem('tnt-lang') : null;
      setLang(normalizeLang(fromDoc || fromStore));
    };
    read();
    window.addEventListener('tnt-lang', read as EventListener);
    return () => window.removeEventListener('tnt-lang', read as EventListener);
  }, []);

  return lang;
}
