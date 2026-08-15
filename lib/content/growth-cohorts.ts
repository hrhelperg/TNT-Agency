// Controlled-growth cohorts.
//
// The site's indexation history ("Discovered – currently not indexed") means URL
// growth has to be deliberate and reviewable, not incidental. Every batch of new
// indexable pages is declared here as a cohort, and scripts/validate-growth.mjs
// holds that cohort to a standard STRICTER than the site-wide content gates:
// more inbound contextual links, more body depth, and tighter duplication
// limits than lib/content/content-quality.test.ts applies to the corpus at
// large.
//
// A page that cannot meet the cohort standard should not be published. Pages
// that were considered and deliberately not built are recorded in `rejected`
// with the reason, so a later wave does not silently resurrect them.

export interface GrowthCohort {
  /** Stable id, used in reports. */
  id: string
  label: string
  /** ISO date the cohort was prepared. */
  preparedOn: string
  /** Hub route every page in the cohort must be reachable from. */
  hub: string
  /** Maximum contextual hops from `hub` (or from '/') that a cohort page may sit at. */
  maxHops: number
  /** Minimum contextual inbound links each cohort page must receive. */
  minInboundContextual: number
  /** Minimum body words for a cohort page (site-wide floor is 150). */
  minWords: number
  slugs: readonly string[]
  /** Considered and not built, with the reason — prevents silent resurrection. */
  rejected: ReadonlyArray<{ slug: string; status: 'REJECTED' | 'MERGED' | 'FUTURE'; reason: string }>
}

export const GROWTH_COHORTS: readonly GrowthCohort[] = [
  {
    id: 'wave-1-professional-recruitment',
    label: 'Wave 1 — professional / specialist recruitment foundation',
    preparedOn: '2026-08-15',
    hub: '/pro-zamestnavatele',
    maxHops: 3,
    minInboundContextual: 2,
    minWords: 400,
    slugs: [
      // Hubs + positioning
      'nabor-odbornych-pozic',
      'primy-nabor-zamestnancu',
      'thp-pozice',
      // Qualification / compliance
      'odborna-zpusobilost-a-opravneni',
      'uznavani-kvalifikace-zahranicnich-pracovniku',
      'nabor-svarecu',
      // Engineering trades
      'strojirenske-profese',
      'nabor-cnc-operatoru',
      'nabor-elektrikaru',
      // Operations families
      'udrzba-a-technicky-servis',
      'pozice-v-rizeni-kvality',
      'mistri-a-vedouci-smen',
      // Logistics + sourcing + diagnosis
      'odborne-pozice-v-logistice',
      'prime-osloveni-kandidatu',
      'proc-se-nedari-obsadit-odbornou-pozici',
      // Commercial decision support
      'jak-dlouho-trva-obsazeni-pozice',
      'cena-sluzeb-personalni-agentury',
      'jak-vybrat-personalni-agenturu',
      'smlouva-s-personalni-agenturou',
    ],
    rejected: [
      {
        slug: 'executive-search',
        status: 'REJECTED',
        reason:
          'Every substantive sentence available for it was an unverifiable claim (candidate-database size, replacement guarantee, 24-72h availability). The honest part of the demand — provozní vedení — is served by mistri-a-vedouci-smen.',
      },
      {
        slug: 'nabor-it-specialistu',
        status: 'REJECTED',
        reason:
          'No existing corpus, no verifiable differentiation and no delivery reference. The page could only assert capability, which the E-E-A-T and no-fabrication rules exist to prevent.',
      },
      {
        slug: 'nabor-ucetnich',
        status: 'REJECTED',
        reason:
          'Same credibility problem as IT, and the query mix skews to jobseekers rather than employers. The employer-side slice lives inside thp-pozice.',
      },
      {
        slug: 'nase-sluzby',
        status: 'MERGED',
        reason:
          'Would have been a fourth hub colliding with /pro-zamestnavatele, /agencies and /nabor-pracovniku. Scope absorbed by nabor-odbornych-pozic; /agencies was corrected instead.',
      },
      {
        slug: 'faq-odborne-pozice',
        status: 'MERGED',
        reason:
          'Near-template of three existing FAQ hubs. Specialist Q&A belongs in faq-pro-zamestnavatele.',
      },
      {
        slug: 'nedostatek-technickych-profesi',
        status: 'MERGED',
        reason:
          'A fifth entry in the existing nedostatek-* series is a template swap by construction and the strongest candidate to trip the body-similarity guard.',
      },
      {
        slug: 'agenturni-zamestnavani-vs-primy-nabor',
        status: 'MERGED',
        reason:
          'Splitting a service page from its own comparison creates two pages competing for one intent. The comparison rides inside primy-nabor-zamestnancu.',
      },
      {
        slug: 'mzdove-rozpeti-odborne-pozice',
        status: 'FUTURE',
        reason:
          'Wave 2. Deriving a band from ISPV/ČSÚ is defensible, but a salary-adjacent page needs the cluster established first to read as method rather than as an empty salary guide.',
      },
      {
        slug: 'prubeh-naboru-odborne-pozice',
        status: 'FUTURE',
        reason:
          'Wave 2. Ships first as a section of nabor-odbornych-pozic; promote only if the section proves to carry independent demand.',
      },
      {
        slug: 'profil-odborne-pozice',
        status: 'FUTURE',
        reason:
          'Wave 2. High body similarity to the "what to specify" spine that already differentiates several Wave 1 pages.',
      },
      {
        slug: 'nabor-ridicu',
        status: 'FUTURE',
        reason:
          'Later logistics wave. Genuine demand, but the buyer is a dopravce rather than a manufacturer and it would blur the positioning this wave establishes.',
      },
      {
        slug: 'city-x-profession-combinations',
        status: 'REJECTED',
        reason:
          'Doorway pattern. 52 regional pages already exist; multiplying them by profession adds no information and is exactly what produced the previous indexation problem.',
      },
    ],
  },
]

export const cohortForSlug = (slug: string): GrowthCohort | undefined =>
  GROWTH_COHORTS.find((c) => c.slugs.includes(slug))

export const allCohortSlugs = (): string[] => GROWTH_COHORTS.flatMap((c) => [...c.slugs])
