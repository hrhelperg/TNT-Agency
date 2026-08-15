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
  /**
   * Considered and not built, with the reason — prevents silent resurrection.
   *
   * DEFER_FOR_DATA is deliberately distinct from FUTURE. FUTURE is a judgement:
   * the intent was assessed and is not worth a URL yet. DEFER_FOR_DATA means the
   * judgement could not be made at all, because the evidence needed to make it
   * was unavailable. It records a missing input, not a verdict, and a later wave
   * must not read it as a rejection.
   */
  rejected: ReadonlyArray<{
    slug: string
    status: 'REJECTED' | 'MERGED' | 'FUTURE' | 'DEFER_FOR_DATA'
    reason: string
  }>
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
  {
    id: 'wave-2-technical-talent-and-employer-solutions',
    label: 'Wave 2 — high-skilled/technical talent, employer problems, knowledge centre',
    preparedOn: '2026-08-15',
    hub: '/pro-zamestnavatele',
    maxHops: 3,
    minInboundContextual: 2,
    minWords: 400,
    slugs: [
      // 2A — technical talent families (the four verified gaps)
      'nabor-techniku-automatizace',
      'technicti-inzenyri',
      'technologove-a-konstrukteri',
      'nakup-a-zasobovani',
      // 2B — employer problems / hiring solutions
      'hromadny-nabor-pracovniku',
      'nabor-pri-nabehu-vyroby',
      'sezonni-navyseni-kapacity',
      'absence-v-provozu',
      // 2C — knowledge centre
      'cena-neobsazene-pozice',
      'zadani-pozice-a-profil-kandidata',
    ],
    rejected: [
      {
        slug: 'nabor-cnc-programatoru',
        status: 'MERGED',
        reason:
          'Wave 1 /nabor-cnc-operatoru already teaches the obsluha → seřizovač → programátor ladder. A separate programmer page would cannibalise it for one rung of the same intent.',
      },
      {
        slug: 'nabor-serizovacu',
        status: 'REJECTED',
        reason: 'Named in the title of /nabor-cnc-operatoru — the intent is already owned outright.',
      },
      {
        slug: 'nabor-technika-udrzby',
        status: 'REJECTED',
        reason:
          '/udrzba-a-technicky-servis covers údržbář, mechanik, elektromechanik, mechatronik, seřizovač, servisní technik and vedoucí údržby as one family.',
      },
      {
        slug: 'nabor-quality-engineeru',
        status: 'REJECTED',
        reason:
          '/pozice-v-rizeni-kvality covers the whole ladder from kontrolor to manažer kvality including metrology; a separate engineer page would split one intent.',
      },
      {
        slug: 'nabor-mechatroniku',
        status: 'REJECTED',
        reason: 'Covered by /udrzba-a-technicky-servis; the boundary with automation is handled by /nabor-techniku-automatizace.',
      },
      {
        slug: 'nabor-plc-programatoru',
        status: 'MERGED',
        reason:
          'Same buyer and same brief as automation technicians. Alone it is too narrow to sustain a differentiated page; it is a section of /nabor-techniku-automatizace.',
      },
      {
        slug: 'cad-cam-specialista',
        status: 'MERGED',
        reason:
          'A tooling skill, not a separate hiring intent. Merged into /technologove-a-konstrukteri, where CAD/CAM is framed as an employer-specific requirement.',
      },
      {
        slug: 'nabor-logistickych-specialistu',
        status: 'REJECTED',
        reason: 'Wave 1 /odborne-pozice-v-logistice owns the professional logistics tier (dispečink, plánování, vedení skladu).',
      },
      {
        slug: 'jak-rychle-obsadit-tezko-obsaditelnou-pozici',
        status: 'REJECTED',
        reason:
          'Split across two Wave 1 pages that already answer it: /proc-se-nedari-obsadit-odbornou-pozici (diagnosis) and /jak-dlouho-trva-obsazeni-pozice (timing).',
      },
      {
        slug: 'jak-snizit-time-to-hire',
        status: 'REJECTED',
        reason: '/jak-dlouho-trva-obsazeni-pozice already explains what actually moves the date, and deliberately refuses to promise one.',
      },
      {
        slug: 'nedostatek-kvalifikovanych-pracovniku',
        status: 'MERGED',
        reason:
          'A sixth entry in the nedostatek-pracovniku-* series would be a template sibling by construction. Absorbed into /nedostatek-pracovniku-v-cr.',
      },
      {
        slug: 'agentura-prace-vs-vlastni-hr-tym',
        status: 'REJECTED',
        reason:
          'The model comparison is owned by /jak-funguje-pracovni-agentura and /primy-nabor-zamestnancu, which carries the comparison section itself.',
      },
      {
        slug: 'replacement-hiring',
        status: 'MERGED',
        reason: 'Absorbed into /planovani-naboru rather than given a URL; it is a planning case, not a distinct employer intent.',
      },
      {
        slug: 'staffing-reserve',
        status: 'MERGED',
        reason: 'Merged into /absence-v-provozu, where the reserve is the answer to the problem rather than a topic of its own.',
      },
      {
        slug: 'naklady-fluktuace',
        status: 'MERGED',
        reason: 'Absorbed by the existing fluktuace cluster; a separate cost-of-turnover page would overlap three pages at once.',
      },
      {
        slug: 'screening-kandidatu',
        status: 'MERGED',
        reason:
          'Screening, reference checks and evaluating technical candidates are one decision with the brief that precedes them — merged into /zadani-pozice-a-profil-kandidata.',
      },
      {
        slug: 'planovani-smen',
        status: 'FUTURE',
        reason:
          'HR-operations rather than hiring intent. Revisit once the employer-problem cluster has indexation evidence; it would otherwise sit at the edge of the site\'s purpose.',
      },
      {
        slug: 'riziko-naboru',
        status: 'FUTURE',
        reason: 'No differentiated substance yet beyond what the diagnosis and brief pages already carry.',
      },
      {
        slug: 'mzdove-rozpeti-odborne-pozice',
        status: 'FUTURE',
        reason:
          'Deferred a second time. Deriving a band from ISPV is defensible as method, but a salary-adjacent page still needs the cluster proven before it reads as method rather than as an empty salary guide.',
      },
      {
        slug: 'prubeh-naboru-odborne-pozice',
        status: 'FUTURE',
        reason: 'Deferred a second time. Still ships as a section of /nabor-odbornych-pozic; promote only if that section shows independent demand.',
      },
      {
        slug: 'nabor-ridicu',
        status: 'FUTURE',
        reason: 'Deferred a second time. Different buyer (dopravce) and a different service line; it would blur the positioning this programme is establishing.',
      },
      {
        slug: 'regional-and-city-pages-wave-2',
        status: 'REJECTED',
        reason:
          'No regional page may be added in Wave 2. The 22 generated region pages measured 0.81–0.85 body similarity at baseline — the corpus\'s existing doorway risk — and the 10 pracovnici-<city> pages had 1 contextual inbound each. Adding to that cluster would compound both problems.',
      },
    ],
  },
  {
    // Wave 4 published ZERO new URLs. That is the outcome, not a shortfall: the
    // wave's thesis was that the corpus needed connecting, not extending, and
    // the high-skilled expansion it was also asked to consider could not be
    // decided because the search-demand evidence was unavailable.
    id: 'wave-4-cross-cluster-authority',
    label: 'Wave 4 — cross-cluster authority (no new URLs)',
    preparedOn: '2026-08-15',
    hub: '/pro-zamestnavatele',
    maxHops: 3,
    minInboundContextual: 3,
    minWords: 400,
    slugs: [],
    rejected: [
      {
        slug: 'high-skilled-expansion-wave-4',
        status: 'DEFER_FOR_DATA',
        reason:
          'Every high-skilled candidate in this wave turns on one question — does the intent have its own search demand, separate from the page that already covers it? Ahrefs/GSC returned "Insufficient plan" for this project, so that question has no answer at time of writing and the honest record is UNKNOWN, not zero. Deferred as a set rather than guessed at individually.',
      },
      {
        slug: 'mzdove-rozpeti-odborne-pozice',
        status: 'DEFER_FOR_DATA',
        reason:
          'Deferred a third time, but for a different reason than in Waves 2 and 3. Those were judgement calls about readiness; this one is a missing input. A salary-band page is the single most evidence-sensitive page the site could publish, and it must not ship on an assumption about demand.',
      },
      {
        slug: 'prubeh-naboru-odborne-pozice',
        status: 'DEFER_FOR_DATA',
        reason:
          'Still ships as a section of /nabor-odbornych-pozic. Promotion to its own URL was to be decided on whether that section draws independent impressions — precisely the measurement that is unavailable.',
      },
      {
        slug: 'nabor-projektovych-manazeru',
        status: 'REJECTED',
        reason:
          'Not deferred — rejected on the merits, no data needed. TNT places technical and operational staff; project management is a different service line the agency does not run, so the page would describe work we do not do.',
      },
      {
        slug: 'nabor-it-specialistu',
        status: 'REJECTED',
        reason:
          'Rejected on the merits. IT recruitment is a distinct market with distinct competitors and no operational overlap with the manufacturing/logistics placements the site is built on. Publishing it would be keyword coverage, not employer usefulness.',
      },
      {
        slug: 'city-x-profession-wave-4',
        status: 'REJECTED',
        reason:
          'Explicitly frozen by the wave brief: /cnc-operator-praha, /svarec-brno, /elektrikar-ostrava, /technici-pardubice and every sibling. These are doorway pages by construction — the profession page and the city page each already exist, and their intersection carries no information neither one has.',
      },
      {
        slug: 'regional-and-city-pages-wave-4',
        status: 'REJECTED',
        reason:
          'Regional freeze carried forward. Wave 3 repaired this family by removing duplicated national-law mass; adding members would reopen the defect it just closed.',
      },
    ],
  },
]

export const cohortForSlug = (slug: string): GrowthCohort | undefined =>
  GROWTH_COHORTS.find((c) => c.slugs.includes(slug))

export const allCohortSlugs = (): string[] => GROWTH_COHORTS.flatMap((c) => [...c.slugs])
