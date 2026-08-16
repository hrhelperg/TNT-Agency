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
import { TECHNICAL_TALENT_PAGES } from './technical-talent'
import { EMPLOYER_PROBLEM_PAGES } from './employer-problems'
import { EMPLOYER_KNOWLEDGE_PAGES } from './employer-knowledge'

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
export * from './technical-talent'
export * from './employer-problems'
export * from './employer-knowledge'

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
  technicalTalent: TECHNICAL_TALENT_PAGES,
  employerProblems: EMPLOYER_PROBLEM_PAGES,
  employerKnowledge: EMPLOYER_KNOWLEDGE_PAGES,
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
    { href: '/zadani-pozice-a-profil-kandidata', label: 'Zadání pozice a profil kandidáta' },
  ],
  'nabor-zamestnancu': [
    { href: '/thp-pozice', label: 'THP pozice' },
    { href: '/zadani-pozice-a-profil-kandidata', label: 'Zadání pozice a profil kandidáta' },
  ],
  'planovani-naboru': [
    { href: '/jak-dlouho-trva-obsazeni-pozice', label: 'Jak dlouho trvá obsazení pozice' },
    { href: '/hromadny-nabor-pracovniku', label: 'Hromadný nábor pracovníků' },
    { href: '/nabor-pri-nabehu-vyroby', label: 'Nábor při náběhu výroby' },
    { href: '/sezonni-navyseni-kapacity', label: 'Sezónní navýšení kapacity' },
  ],
  'nejcastejsi-chyby-zamestnavatelu': [
    { href: '/pracovnici-pro-vyrobu', label: 'Pracovníci pro výrobu' },
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
    { href: '/sezonni-navyseni-kapacity', label: 'Sezónní navýšení kapacity' },
  ],
  'kolik-stoji-zamestnanec': [
    { href: '/cena-sluzeb-personalni-agentury', label: 'Cena služeb personální agentury' },
    { href: '/cena-neobsazene-pozice', label: 'Cena neobsazené pozice' },
  ],
  'o-nas': [{ href: '/jak-vybrat-personalni-agenturu', label: 'Jak vybrat personální agenturu' }],

  // Production / engineering pages → the technical families
  'pracovnici-pro-vyrobu': [
    { href: '/technologove-a-konstrukteri', label: 'Technologové a konstruktéři' },
    { href: '/checklist-pro-nove-zamestnance', label: 'Checklist pro nové zaměstnance' },
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
  ],
  'operatori-vyroby': [
    { href: '/nabor-cnc-operatoru', label: 'Nábor CNC operátorů a seřizovačů' },
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
  ],
  'nedostatek-pracovniku-ve-vyrobe': [
    { href: '/nabor-svarecu', label: 'Nábor svářečů' },
    { href: '/nabor-cnc-operatoru', label: 'Nábor CNC operátorů a seřizovačů' },
    { href: '/strojirenske-profese', label: 'Strojírenské profese' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
    { href: '/nabor-pri-nabehu-vyroby', label: 'Nábor při náběhu výroby' },
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
  'automobilovy-prumysl-pracovnici': [
    { href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' },
    { href: '/technologove-a-konstrukteri', label: 'Technologové a konstruktéři' },
  ],
  'pracovnici-pro-automotive': [
    { href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' },
    { href: '/udrzba-a-technicky-servis', label: 'Údržba a technický servis' },
  ],
  'pracovnici-pro-potravinarskou-vyrobu': [
    { href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' },
    { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
  ],

  // Logistics operative pages → the professional logistics tier
  'pracovnici-do-logistiky': [
    { href: '/odborne-pozice-v-logistice', label: 'Odborné pozice v logistice' },
    { href: '/nakup-a-zasobovani', label: 'Nákup a zásobování' },
  ],
  'logisticti-pracovnici': [{ href: '/odborne-pozice-v-logistice', label: 'Odborné pozice v logistice' }],
  'pracovnici-pro-distribucni-centra': [{ href: '/odborne-pozice-v-logistice', label: 'Odborné pozice v logistice' }],

  // Retention pages → first-line leadership, which drives shift stability
  'retence-zamestnancu': [
    { href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' },
    { href: '/absence-v-provozu', label: 'Absence v provozu' },
  ],
  'priciny-fluktuace-zamestnancu': [
    { href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' },
    { href: '/absence-v-provozu', label: 'Absence v provozu' },
  ],
  'adaptace-zamestnancu': [
    { href: '/picker-packer', label: 'Picker / packer' },
    { href: '/montazni-linky-pracovnici', label: 'Pracovníci montážních linek' },
    { href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' },
    { href: '/absence-v-provozu', label: 'Absence v provozu' },
  ],

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

  // ── Wave 2 ───────────────────────────────────────────────────────────────
  //
  // Inbound edges for the technical-talent, employer-problem and knowledge
  // pages. Sourced from the two depth-1 hubs and from topically adjacent Wave 1
  // pages — deliberately never from the city/region cluster, whose pages
  // measured 1 contextual inbound each at baseline 1106bd6 and would have
  // passed on their own weakness rather than conferring authority.
  //
  // Slugs that already appear above were merged into those entries rather than
  // repeated: a duplicate key here would silently drop the Wave 1 links.
  // TypeScript reports it as TS1117, which is how the first attempt was caught.
  'nabor-odbornych-pozic': [
    { href: '/nabor-techniku-automatizace', label: 'Nábor techniků automatizace a PLC' },
    { href: '/technicti-inzenyri', label: 'Techničtí inženýři' },
    { href: '/technologove-a-konstrukteri', label: 'Technologové a konstruktéři' },
    { href: '/nakup-a-zasobovani', label: 'Nákup a zásobování' },
    { href: '/zadani-pozice-a-profil-kandidata', label: 'Zadání pozice a profil kandidáta' },
  ],
  'udrzba-a-technicky-servis': [
    { href: '/nabor-techniku-automatizace', label: 'Nábor techniků automatizace a PLC' },
  ],
  'nabor-elektrikaru': [
    { href: '/nabor-techniku-automatizace', label: 'Nábor techniků automatizace a PLC' },
  ],
  'strojirenske-profese': [
    { href: '/technologove-a-konstrukteri', label: 'Technologové a konstruktéři' },
    { href: '/nabor-techniku-automatizace', label: 'Nábor techniků automatizace a PLC' },
  ],
  'thp-pozice': [
    { href: '/technicti-inzenyri', label: 'Techničtí inženýři' },
    { href: '/technologove-a-konstrukteri', label: 'Technologové a konstruktéři' },
    { href: '/nakup-a-zasobovani', label: 'Nákup a zásobování' },
  ],
  'nabor-cnc-operatoru': [
    { href: '/technologove-a-konstrukteri', label: 'Technologové a konstruktéři' },
  ],
  'pozice-v-rizeni-kvality': [
    { href: '/technicti-inzenyri', label: 'Techničtí inženýři' },
  ],
  'odborne-pozice-v-logistice': [
    { href: '/nakup-a-zasobovani', label: 'Nákup a zásobování' },
  ],
  'fluktuace-zamestnancu': [
    { href: '/montazni-linky-pracovnici', label: 'Pracovníci montážních linek' },
    { href: '/absence-v-provozu', label: 'Absence v provozu' },
  ],
  'pracovnici-do-skladu': [
    { href: '/nabor-zamestnancu', label: 'Nábor zaměstnanců: výběrový proces' },
    { href: '/sezonni-navyseni-kapacity', label: 'Sezónní navýšení kapacity' },
  ],
  'pracovnici-pro-ecommerce-sklady': [
    { href: '/sezonni-navyseni-kapacity', label: 'Sezónní navýšení kapacity' },
  ],
  'skutecne-naklady-na-zamestnance': [
    { href: '/cena-neobsazene-pozice', label: 'Cena neobsazené pozice' },
  ],
  'neprime-naklady-na-zamestnance': [
    { href: '/vyrobni-zamestnanci', label: 'Výrobní zaměstnanci' },
    { href: '/cena-neobsazene-pozice', label: 'Cena neobsazené pozice' },
  ],
  'proc-se-nedari-obsadit-odbornou-pozici': [
    { href: '/technologove-a-konstrukteri', label: 'Technologové a konstruktéři' },
    { href: '/zadani-pozice-a-profil-kandidata', label: 'Zadání pozice a profil kandidáta' },
    { href: '/cena-neobsazene-pozice', label: 'Cena neobsazené pozice' },
  ],
  'hromadny-nabor-pracovniku': [
    { href: '/naklady-na-zamestnance-cr', label: 'Náklady na zaměstnance v ČR' },
    { href: '/pracovnici-do-vyroby', label: 'Pracovníci do výroby' },
    { href: '/pracovnici-do-skladu', label: 'Pracovníci do skladu' },
    { href: '/checklist-pro-nove-zamestnance', label: 'Checklist pro nové zaměstnance' },
    { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
  ],
  'sezonni-navyseni-kapacity': [
    { href: '/nakup-a-zasobovani', label: 'Nákup a zásobování' },
    { href: '/picker-packer', label: 'Picker / packer' },
    { href: '/skladovi-pracovnici', label: 'Skladoví pracovníci' },
    { href: '/baleni-potravin-pracovnici', label: 'Pracovníci balení potravin' },
  ],
  'nabor-pri-nabehu-vyroby': [
    { href: '/nabor-techniku-automatizace', label: 'Nábor techniků automatizace a PLC' },
    { href: '/montazni-pracovnici', label: 'Montážní pracovníci' },
    { href: '/montazni-linky-pracovnici', label: 'Pracovníci montážních linek' },
    { href: '/operatori-vyroby', label: 'Operátoři výroby' },
  ],
  'absence-v-provozu': [
    { href: '/vyrobni-zamestnanci', label: 'Výrobní zaměstnanci' },
    { href: '/pomocni-stavebni-pracovnici', label: 'Pomocní stavební pracovníci' },
  ],
  'onboarding-zamestnancu': [
    { href: '/montazni-pracovnici', label: 'Montážní pracovníci' },
    { href: '/skladovi-pracovnici', label: 'Skladoví pracovníci' },
    { href: '/pracovnici-do-vyroby', label: 'Pracovníci do výroby' },
    { href: '/vyroba-potravin-pracovnici', label: 'Pracovníci výroby potravin' },
  ],
  'cena-neobsazene-pozice': [
    { href: '/technologove-a-konstrukteri', label: 'Technologové a konstruktéři' },
    // Step 3: the page now carries the vacancy-cost tool. An employer who has
    // just quantified what an empty specialist seat costs per day needs the page
    // that owns specialist recruitment, not only one role family inside it.
    { href: '/nabor-odbornych-pozic', label: 'Nábor odborných pozic' },
  ],
  'mistri-a-vedouci-smen': [
    { href: '/checklist-pro-nove-zamestnance', label: 'Checklist pro nové zaměstnance' },
  ],
  'nedostatek-pracovniku-ve-stavebnictvi': [
    { href: '/stavebni-profese', label: 'Stavební profese' },
    { href: '/nabor-elektrikaru', label: 'Nábor elektrikářů' },
  ],
  'nedostatek-pracovniku-v-logistice': [
    { href: '/odborne-pozice-v-logistice', label: 'Odborné pozice v logistice' },
    { href: '/logisticti-pracovnici', label: 'Logističtí pracovníci' },
  ],
  'nedostatek-pracovniku-ve-skladech': [
    { href: '/skladovi-pracovnici', label: 'Skladoví pracovníci' },
    { href: '/manipulacni-pracovnici', label: 'Manipulační pracovníci a VZV' },
  ],
  'nedostatek-pracovniku-v-cr': [
    { href: '/cena-neobsazene-pozice', label: 'Cena neobsazené pozice' },
    { href: '/pozice-v-rizeni-kvality', label: 'Pozice v řízení kvality' },
  ],
  'checklist-pro-nove-zamestnance': [
    { href: '/pomocni-stavebni-pracovnici', label: 'Pomocní stavební pracovníci' },
    { href: '/baleni-potravin-pracovnici', label: 'Pracovníci balení potravin' },
  ],
  'zadani-pozice-a-profil-kandidata': [
    { href: '/pracovnici-pro-ecommerce-sklady', label: 'Pracovníci pro e-commerce sklady' },
  ],
  'cena-sluzeb-personalni-agentury': [
    { href: '/pracovnici-do-vyroby', label: 'Pracovníci do výroby' },
  ],
  'smlouva-s-personalni-agenturou': [
    { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
  ],
  'prime-osloveni-kandidatu': [
    { href: '/nedostatek-pracovniku-v-cr', label: 'Nedostatek pracovníků v ČR' },
  ],
  'uznavani-kvalifikace-zahranicnich-pracovniku': [
    { href: '/nedostatek-pracovniku-v-cr', label: 'Nedostatek pracovníků v ČR' },
  ],
  'jak-snizit-fluktuaci': [
    { href: '/skladovi-pracovnici', label: 'Skladoví pracovníci' },
  ],
  'jak-dlouho-trva-obsazeni-pozice': [
    { href: '/hromadny-nabor-pracovniku', label: 'Hromadný nábor pracovníků' },
    { href: '/cena-neobsazene-pozice', label: 'Cena neobsazené pozice' },
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
  ...TECHNICAL_TALENT_PAGES,
  ...EMPLOYER_PROBLEM_PAGES,
  ...EMPLOYER_KNOWLEDGE_PAGES,
]
  .map(withClusterLinks)
  .map(withConversionPath)

export const findSeoPage = (slug: string): SeoPage | undefined =>
  SEO_PAGES.find((p) => p.slug === slug)
