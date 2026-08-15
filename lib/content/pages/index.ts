// Aggregated registry of all SeoArticle-driven SEO pages, grouped by tier so
// the sitemap helper and any future index page can reason about priority.

import type { SeoPage } from '../seo-page'
import { CORNERSTONE_PAGES } from './cornerstone'
import { SUPPORT_PAGES } from './support'
import { GEO_PAGES } from './geo'
import { EMPLOYER_INTELLIGENCE_PAGES } from './employer-intelligence'
import { REGION_PAGES } from './regions'
import { FOREIGN_WORKER_PAGES } from './foreign-workers'
import { EMPLOYER_OPERATIONS_PAGES } from './employer-operations'
import { INDUSTRY_RECRUITMENT_PAGES } from './industry-recruitment'
import { CITY_RECRUITMENT_PAGES } from './city-recruitment'
import { PROFESSIONAL_RECRUITMENT_PAGES } from './professional-recruitment'

export * from './cornerstone'
export * from './support'
export * from './geo'
export * from './employer-intelligence'
export * from './regions'
export * from './foreign-workers'
export * from './employer-operations'
export * from './industry-recruitment'
export * from './city-recruitment'
export * from './professional-recruitment'

export const SEO_PAGE_TIERS = {
  cornerstone: CORNERSTONE_PAGES,
  support: SUPPORT_PAGES,
  geo: GEO_PAGES,
  employerIntelligence: [...EMPLOYER_INTELLIGENCE_PAGES, ...REGION_PAGES],
  foreignWorkers: FOREIGN_WORKER_PAGES,
  employerOperations: EMPLOYER_OPERATIONS_PAGES,
  industryRecruitment: INDUSTRY_RECRUITMENT_PAGES,
  cityRecruitment: CITY_RECRUITMENT_PAGES,
  professionalRecruitment: PROFESSIONAL_RECRUITMENT_PAGES,
} as const

// ── Phase D7: guaranteed conversion path ────────────────────────────────
//
// Every employer-facing page must be able to reach the two operational tools:
// the payroll calculator (so cost questions are answered by the shared engine
// rather than by duplicated formulas on SEO pages, per D5/D6) and the staffing
// request form. Applying this centrally — rather than hand-editing 133 page
// objects — means the invariant also holds for pages added later, and it is
// enforced by lib/content/content-quality.test.ts.

const CALCULATOR_LINK = {
  href: '/kalkulacka-mzdy-agenturniho-zamestnance',
  label: 'Kalkulačka mzdových nákladů zaměstnance',
}
const REQUEST_LINK = {
  href: '/poptavka-pracovniku',
  label: 'Poptávka pracovníků: zadat požadavek',
}

const hasLink = (page: SeoPage, href: string): boolean =>
  (page.internalLinks ?? []).some((l) => l.href.split('?')[0] === href) ||
  (page.cta?.href ?? '').split('?')[0] === href

/** Appends the conversion links to a page when they are not already present. */
const withConversionPath = (page: SeoPage): SeoPage => {
  const additions = [CALCULATOR_LINK, REQUEST_LINK]
    .filter((l) => !hasLink(page, l.href))
    // A page must never link to itself.
    .filter((l) => l.href !== `/${page.slug}`)
  if (additions.length === 0) return page
  return { ...page, internalLinks: [...(page.internalLinks ?? []), ...additions] }
}

// ── Wave 1: cross-cluster links into the professional/specialist pages ──────
//
// The specialist cluster only earns authority if the existing corpus points at
// it from topically relevant pages — a hub link alone would leave every new
// page a near-orphan. These edges are declared here, centrally, for the same
// reason withConversionPath is: hand-editing the link arrays of ~30 page
// objects across nine registry files is unreviewable and drifts, whereas this
// map is one place to audit "which existing page vouches for which new page".
//
// Only genuinely relevant pairings belong here. This is not a keyword block:
// each edge is a link a reader of the source page would plausibly want.
const CLUSTER_LINKS: Readonly<Record<string, ReadonlyArray<{ href: string; label: string }>>> = {
  // Employer hubs → the new cluster entry points
  'pro-zamestnavatele': [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/primy-nabor-zamestnancu', label: 'Přímý nábor do kmenového stavu' },
  ],
  'nabor-pracovniku': [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/primy-nabor-zamestnancu', label: 'Přímý nábor do kmenového stavu' },
  ],
  'jak-najit-pracovniky': [
    { href: '/prime-osloveni-kandidatu', label: 'Přímé oslovení kandidátů' },
    { href: '/proc-se-nedari-obsadit-odbornou-pozici', label: 'Proč se nedaří obsadit odbornou pozici' },
  ],
  'nabor-zamestnancu': [{ href: '/thp-pozice', label: 'THP pozice' }],
  'planovani-naboru': [{ href: '/jak-dlouho-trva-obsazeni-pozice', label: 'Jak dlouho trvá obsazení pozice' }],
  'nejcastejsi-chyby-zamestnavatelu': [
    { href: '/jak-vybrat-personalni-agenturu', label: 'Jak vybrat personální agenturu' },
    { href: '/proc-se-nedari-obsadit-odbornou-pozici', label: 'Proč se nedaří obsadit odbornou pozici' },
  ],
  'faq-pro-zamestnavatele': [
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
    { href: '/cena-sluzeb-personalni-agentury', label: 'Cena služeb personální agentury' },
    { href: '/jak-dlouho-trva-obsazeni-pozice', label: 'Jak dlouho trvá obsazení pozice' },
  ],
  'faq-zamestnavani-pracovniku': [
    { href: '/primy-nabor-zamestnancu', label: 'Přímý nábor do kmenového stavu' },
    { href: '/jak-vybrat-personalni-agenturu', label: 'Jak vybrat personální agenturu' },
  ],
  'slovnik-pojmu-pro-zamestnavatele': [
    { href: '/thp-pozice', label: 'THP pozice' },
    { href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' },
  ],

  // Agency-model pages → the commercial decision-support pages
  'jak-funguje-pracovni-agentura': [
    { href: '/primy-nabor-zamestnancu', label: 'Přímý nábor do kmenového stavu' },
    { href: '/cena-sluzeb-personalni-agentury', label: 'Cena služeb personální agentury' },
    { href: '/jak-vybrat-personalni-agenturu', label: 'Jak vybrat personální agenturu' },
  ],
  'docasne-prideleni-zamestnancu': [
    { href: '/primy-nabor-zamestnancu', label: 'Přímý nábor do kmenového stavu' },
    { href: '/smlouva-s-personalni-agenturou', label: 'Smlouva s personální agenturou' },
  ],
  'kolik-stoji-zamestnanec': [{ href: '/cena-sluzeb-personalni-agentury', label: 'Cena služeb personální agentury' }],
  'o-nas': [{ href: '/jak-vybrat-personalni-agenturu', label: 'Jak vybrat personální agenturu' }],

  // Production / engineering pages → the technical families
  'pracovnici-pro-vyrobu': [
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
  ],
  'operatori-vyroby': [
    { href: '/nabor-cnc-operatoru', label: 'Nábor CNC operátorů a seřizovačů' },
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
  ],
  'nedostatek-pracovniku-ve-vyrobe': [
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
  ],
  'pracovnici-do-vyroby': [{ href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' }],
  'vyrobni-zamestnanci': [{ href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' }],
  'stavebni-profese': [
    { href: '/nabor-svarecu', label: 'Nábor svářečů' },
    { href: '/nabor-elektrikaru', label: 'Nábor elektrikářů' },
    { href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' },
  ],
  'pracovnici-pro-stavebnictvi': [{ href: '/nabor-elektrikaru', label: 'Nábor elektrikářů' }],
  'manipulacni-pracovnici': [{ href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' }],

  // Quality-sensitive industries → the quality family
  'automobilovy-prumysl-pracovnici': [{ href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' }],
  'pracovnici-pro-automotive': [
    { href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
  ],
  'pracovnici-pro-potravinarskou-vyrobu': [{ href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' }],

  // Logistics operative pages → the professional logistics tier
  'pracovnici-do-logistiky': [{ href: '/odborne-pozice-v-logistice', label: 'Odborné pozice v logistice' }],
  'logisticti-pracovnici': [{ href: '/odborne-pozice-v-logistice', label: 'Odborné pozice v logistice' }],
  'pracovnici-pro-distribucni-centra': [{ href: '/odborne-pozice-v-logistice', label: 'Odborné pozice v logistice' }],

  // Retention pages → first-line leadership, which drives shift stability
  'retence-zamestnancu': [{ href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' }],
  'priciny-fluktuace-zamestnancu': [{ href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' }],
  'adaptace-zamestnancu': [{ href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' }],

  // Compliance pages → the qualification anchor
  'povinnosti-zamestnavatele': [{ href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' }],
  'kontrola-inspektoratu-prace': [{ href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' }],

  // Foreign-worker cluster → recognition of foreign qualifications
  'nabor-zahranicnich-pracovniku': [
    { href: '/uznavani-kvalifikace-zahranicnich-pracovniku', label: 'Uznávání kvalifikace zahraničních pracovníků' },
  ],
  'zamestnavani-cizincu': [
    { href: '/uznavani-kvalifikace-zahranicnich-pracovniku', label: 'Uznávání kvalifikace zahraničních pracovníků' },
  ],
  'modra-karta-cr': [
    { href: '/uznavani-kvalifikace-zahranicnich-pracovniku', label: 'Uznávání kvalifikace zahraničních pracovníků' },
  ],
  'dokumenty-pro-zamestnani-cizincu': [
    { href: '/uznavani-kvalifikace-zahranicnich-pracovniku', label: 'Uznávání kvalifikace zahraničních pracovníků' },
  ],
}

/** Adds the declared cross-cluster links, skipping duplicates and self-links. */
const withClusterLinks = (page: SeoPage): SeoPage => {
  const additions = (CLUSTER_LINKS[page.slug] ?? [])
    .filter((l) => !hasLink(page, l.href))
    .filter((l) => l.href !== `/${page.slug}`)
  if (additions.length === 0) return page
  return { ...page, internalLinks: [...(page.internalLinks ?? []), ...additions] }
}

export const SEO_PAGES: ReadonlyArray<SeoPage> = [
  ...CORNERSTONE_PAGES,
  ...SUPPORT_PAGES,
  ...GEO_PAGES,
  ...EMPLOYER_INTELLIGENCE_PAGES,
  ...REGION_PAGES,
  ...FOREIGN_WORKER_PAGES,
  ...EMPLOYER_OPERATIONS_PAGES,
  ...INDUSTRY_RECRUITMENT_PAGES,
  ...CITY_RECRUITMENT_PAGES,
  ...PROFESSIONAL_RECRUITMENT_PAGES,
]
  .map(withClusterLinks)
  .map(withConversionPath)

export const findSeoPage = (slug: string): SeoPage | undefined =>
  SEO_PAGES.find((p) => p.slug === slug)
