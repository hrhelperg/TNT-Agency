// cs/en/de copy for the HELPERG ecosystem banner and product directory.
//
// Uses the existing typed-registry + useLang() pattern (as in lib/agency-value
// and lib/employer-request). No new translation system, no localized routes, no
// hreflang.

import type { Locale } from '../content/types'
import type { ChannelKind, EcosystemCategory } from './registry'

export interface EcosystemCopy {
  /** Landmark label for the banner nav. */
  ariaLabel: string
  partOf: string
  /** Compact brand label for narrow viewports. */
  brandShort: string
  exploreAll: string
  /** Compact CTA label for narrow viewports. */
  exploreShort: string
  currentProduct: string
  channels: Record<ChannelKind, string>
  categories: Record<EcosystemCategory, string>
  directoryTitle: string
  directoryIntro: string
  close: string
  /** Accessible name pattern for an external link, e.g. "PDF Editor – iOS". */
  opensInNewTab: string
}

const cs: EcosystemCopy = {
  ariaLabel: 'Ekosystém HELPERG',
  partOf: 'Součást ekosystému HELPERG',
  brandShort: 'Ekosystém HELPERG',
  exploreAll: 'Prozkoumat všechny produkty',
  exploreShort: 'Prozkoumat',
  currentProduct: 'Aktuální produkt',
  channels: { website: 'Web', webApp: 'Webová aplikace', ios: 'iOS', android: 'Android' },
  categories: {
    business: 'Byznys a provoz',
    platforms: 'Webové a analytické platformy',
    knowledge: 'Znalostní a referenční platformy',
    mobile: 'Mobilní aplikace',
    company: 'Společnost a zakladatel',
  },
  directoryTitle: 'Ekosystém HELPERG',
  directoryIntro: 'Weby, webové aplikace a mobilní aplikace, které provozuje HELPERG.',
  close: 'Zavřít',
  opensInNewTab: 'otevře se v novém okně',
}

const en: EcosystemCopy = {
  ariaLabel: 'HELPERG Ecosystem',
  partOf: 'Part of HELPERG Ecosystem',
  brandShort: 'HELPERG Ecosystem',
  exploreAll: 'Explore all products',
  exploreShort: 'Explore',
  currentProduct: 'Current product',
  channels: { website: 'Website', webApp: 'Web App', ios: 'iOS', android: 'Android' },
  categories: {
    business: 'Business and operations',
    platforms: 'Web and intelligence platforms',
    knowledge: 'Knowledge and reference platforms',
    mobile: 'Mobile utilities',
    company: 'Company and founder',
  },
  directoryTitle: 'HELPERG Ecosystem',
  directoryIntro: 'Websites, web apps and mobile apps operated by HELPERG.',
  close: 'Close',
  opensInNewTab: 'opens in a new window',
}

const de: EcosystemCopy = {
  ariaLabel: 'HELPERG-Ökosystem',
  partOf: 'Teil des HELPERG-Ökosystems',
  brandShort: 'HELPERG-Ökosystem',
  exploreAll: 'Alle Produkte entdecken',
  exploreShort: 'Entdecken',
  currentProduct: 'Aktuelles Produkt',
  channels: { website: 'Website', webApp: 'Web-App', ios: 'iOS', android: 'Android' },
  categories: {
    business: 'Geschäft und Betrieb',
    platforms: 'Web- und Analyseplattformen',
    knowledge: 'Wissens- und Referenzplattformen',
    mobile: 'Mobile Anwendungen',
    company: 'Unternehmen und Gründer',
  },
  directoryTitle: 'HELPERG-Ökosystem',
  directoryIntro: 'Websites, Web-Apps und mobile Apps von HELPERG.',
  close: 'Schließen',
  opensInNewTab: 'wird in einem neuen Fenster geöffnet',
}

export const ECOSYSTEM_COPY: Record<Locale, EcosystemCopy> = { cs, en, de }
