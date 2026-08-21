/**
 * Locale L1 — the frozen commercial expansion set.
 *
 * Derived from the actual Czech corpus (162 SEO registry pages + 23 bespoke
 * routes), not from the pre-L0 planning matrix, which predates both the L0
 * architecture and the current scope rules: it marked 141 URLs "must have
 * CS+EN+DE" including immigration and payroll pages, and assumed synonym
 * variants would be translated one-for-one.
 *
 * Two rules shape this list.
 *
 * SCOPE. A concept is L1 only if translating it creates no legal, statutory or
 * freshness maintenance obligation. Anything whose SUBJECT is immigration,
 * permits, payroll, tax, statutory money or regional labour data is deferred to
 * L2 — not because it mentions a law (nearly every page here cites its sources)
 * but because the page would stop being true when the law or the number moves.
 *
 * COLLAPSE. Czech synonym long-tails are one concept, not many. Eight Czech
 * pages serving one hiring intent become one English page and one German page.
 * The Czech variants keep their URLs, their canonicals and their Czech-only
 * status, and emit no alternates. Parity is semantic, never numerical.
 */
import type { Locale } from './registry'

export type L1Category =
  | 'employer'
  | 'specialists'
  | 'industries'
  | 'workforce'
  | 'trust'

export interface L1Concept {
  readonly id: string
  readonly category: L1Category
  readonly csPrimary: string
  readonly csCollapsed?: readonly string[]
  readonly urls: Readonly<Partial<Record<Exclude<Locale, 'cs'>, string>>>
  readonly pageType: string
  /** Why this concept is L1 and how the slug was chosen. */
  readonly notes: string
}

export const L1_CONCEPTS: readonly L1Concept[] = [
  // ── A. EMPLOYER / RECRUITMENT SOLUTIONS ────────────────────────────────
  {
    id: 'recruitment-overview',
    category: 'employer',
    csPrimary: '/nabor-pracovniku',
    csCollapsed: ['/nabor-zamestnancu', '/jak-najit-pracovniky'],
    urls: { en: '/en/recruitment', de: '/de/personalgewinnung' },
    pageType: 'guide',
    notes:
      'Three Czech pages ask one question — how to go about hiring. English and German do not have three distinct searches for it, so they get one page each. "Personalgewinnung" is the standard German business term; "Personalbeschaffung" reads like a textbook.',
  },
  {
    id: 'recruitment-planning',
    category: 'employer',
    csPrimary: '/planovani-naboru',
    urls: { en: '/en/recruitment-planning', de: '/de/personalplanung' },
    pageType: 'guide',
    notes: 'Distinct from the overview: this is capacity and timing, not method.',
  },
  {
    id: 'role-brief',
    category: 'employer',
    csPrimary: '/zadani-pozice-a-profil-kandidata',
    urls: { en: '/en/role-brief', de: '/de/anforderungsprofil' },
    pageType: 'guide',
    notes:
      '"Anforderungsprofil" is what German HR actually calls this document. A literal rendering of the Czech ("Stellenausschreibung und Kandidatenprofil") would name two things where the page is about one.',
  },
  {
    id: 'direct-sourcing',
    category: 'employer',
    csPrimary: '/prime-osloveni-kandidatu',
    urls: { en: '/en/direct-sourcing', de: '/de/direktansprache' },
    pageType: 'guide',
    notes: '"Direktansprache" is the established German term for this practice.',
  },
  {
    id: 'hard-to-fill-roles',
    category: 'employer',
    csPrimary: '/proc-se-nedari-obsadit-odbornou-pozici',
    urls: { en: '/en/hard-to-fill-roles', de: '/de/schwer-besetzbare-stellen' },
    pageType: 'guide',
    notes: 'Diagnostic page. The Czech title is a question; both target languages read better as a noun phrase.',
  },
  {
    id: 'time-to-hire',
    category: 'employer',
    csPrimary: '/jak-dlouho-trva-obsazeni-pozice',
    urls: { en: '/en/how-long-hiring-takes', de: '/de/dauer-einer-stellenbesetzung' },
    pageType: 'guide',
    notes:
      'Safe to translate precisely because the Czech refuses to give a number — it explains what governs the date instead. That refusal must survive translation; see the language audit.',
  },
  {
    id: 'onboarding',
    category: 'employer',
    csPrimary: '/onboarding-zamestnancu',
    csCollapsed: ['/adaptace-zamestnancu', '/checklist-pro-nove-zamestnance'],
    urls: { en: '/en/onboarding', de: '/de/onboarding' },
    pageType: 'guide',
    notes:
      'Onboarding, adaptation and the new-starter checklist are one subject split three ways for Czech search. "Onboarding" is current usage in German business writing; "Einarbeitung" is the process itself and appears in the body.',
  },
  {
    id: 'employee-retention',
    category: 'employer',
    csPrimary: '/retence-zamestnancu',
    urls: { en: '/en/employee-retention', de: '/de/mitarbeiterbindung' },
    pageType: 'guide',
    notes: 'Adjacent to the L0 turnover concept but a different decision: keeping people, not measuring departures.',
  },

  // ── B. SPECIALIST & TECHNICAL RECRUITMENT ──────────────────────────────
  {
    id: 'welders',
    category: 'specialists',
    csPrimary: '/nabor-svarecu',
    urls: { en: '/en/welder-recruitment', de: '/de/schweisser-rekrutierung' },
    pageType: 'occupation',
    notes: 'Certification scope is the whole point of this page and is a factual constraint, not a claim about us.',
  },
  {
    id: 'cnc-operators',
    category: 'specialists',
    csPrimary: '/nabor-cnc-operatoru',
    urls: { en: '/en/cnc-operator-recruitment', de: '/de/cnc-fachkraefte' },
    pageType: 'occupation',
    notes: 'CNC is the same token in all three languages.',
  },
  {
    id: 'electricians',
    category: 'specialists',
    csPrimary: '/nabor-elektrikaru',
    urls: { en: '/en/electrician-recruitment', de: '/de/elektriker-rekrutierung' },
    pageType: 'occupation',
    notes:
      'The Czech references the electrotechnical competence regulation. Kept, framed as Czech law per the jurisdiction rule, and not extended with any German equivalent.',
  },
  {
    id: 'maintenance-technicians',
    category: 'specialists',
    csPrimary: '/udrzba-a-technicky-servis',
    urls: { en: '/en/maintenance-technicians', de: '/de/instandhaltung-technischer-service' },
    pageType: 'occupation',
    notes: 'German splits maintenance into Instandhaltung and Wartung; Instandhaltung is the wider term the page needs.',
  },
  {
    id: 'quality-roles',
    category: 'specialists',
    csPrimary: '/pozice-v-rizeni-kvality',
    urls: { en: '/en/quality-roles', de: '/de/qualitaetssicherung-positionen' },
    pageType: 'occupation',
    notes: 'Quality assurance rather than quality management — the page is about operational roles.',
  },
  {
    id: 'shift-supervisors',
    category: 'specialists',
    csPrimary: '/mistri-a-vedouci-smen',
    urls: { en: '/en/shift-supervisors', de: '/de/schichtleiter-und-meister' },
    pageType: 'occupation',
    notes: '"Meister" carries a specific Czech/German trade meaning and is paired with Schichtleiter rather than replaced by it.',
  },
  {
    id: 'automation-technicians',
    category: 'specialists',
    csPrimary: '/nabor-techniku-automatizace',
    urls: { en: '/en/automation-technicians', de: '/de/automatisierungstechniker' },
    pageType: 'occupation',
    notes: 'PLC roles. Same occupational family in all three markets.',
  },
  {
    id: 'engineering-roles',
    category: 'specialists',
    csPrimary: '/technicti-inzenyri',
    urls: { en: '/en/engineering-roles', de: '/de/ingenieurpositionen' },
    pageType: 'occupation',
    notes: 'Deliberately not "engineers" alone: the page covers a family of positions.',
  },
  {
    id: 'process-and-design-engineers',
    category: 'specialists',
    csPrimary: '/technologove-a-konstrukteri',
    urls: { en: '/en/process-and-design-engineers', de: '/de/technologen-und-konstrukteure' },
    pageType: 'occupation',
    notes:
      'The Czech page exists because the two roles are confused with each other; the distinction is the content, so both are named in both slugs.',
  },
  {
    id: 'engineering-trades',
    category: 'specialists',
    csPrimary: '/strojirenske-profese',
    urls: { en: '/en/engineering-trades', de: '/de/metallberufe' },
    pageType: 'occupation',
    notes: '"Metallberufe" is how the German labour market groups these trades; "Maschinenbauberufe" is narrower than the Czech.',
  },
  {
    id: 'technical-office-roles',
    category: 'specialists',
    csPrimary: '/thp-pozice',
    urls: { en: '/en/technical-office-roles', de: '/de/technische-angestellte' },
    pageType: 'occupation',
    notes:
      'THP is a Czech administrative category with no direct equivalent. Translating the abbreviation would be meaningless; the slug describes what the roles are.',
  },
  {
    id: 'logistics-specialists',
    category: 'specialists',
    csPrimary: '/odborne-pozice-v-logistice',
    urls: { en: '/en/logistics-specialists', de: '/de/logistik-fachkraefte' },
    pageType: 'occupation',
    notes: 'Distinct from the operational logistics-workers concept: qualified and planning roles.',
  },
  {
    id: 'purchasing-and-supply',
    category: 'specialists',
    csPrimary: '/nakup-a-zasobovani',
    urls: { en: '/en/purchasing-and-supply', de: '/de/einkauf-und-beschaffung' },
    pageType: 'occupation',
    notes: 'Einkauf and Beschaffung are both needed: the Czech covers buying and supply planning.',
  },

  // ── C. INDUSTRIES / PROFESSIONS ────────────────────────────────────────
  {
    id: 'warehouse-workers',
    category: 'industries',
    csPrimary: '/skladnici',
    csCollapsed: ['/skladovi-pracovnici', '/picker-packer', '/pracovnici-do-skladu', '/manipulacni-pracovnici'],
    urls: { en: '/en/warehouse-workers', de: '/de/lagermitarbeiter' },
    pageType: 'occupation',
    notes: 'Five Czech synonym pages, one warehouse-staffing intent in English and German.',
  },
  {
    id: 'logistics-workers',
    category: 'industries',
    csPrimary: '/pracovnici-do-logistiky',
    csCollapsed: ['/logisticti-pracovnici', '/pracovnici-pro-distribucni-centra', '/pracovnici-pro-ecommerce-sklady'],
    urls: { en: '/en/logistics-workers', de: '/de/logistikmitarbeiter' },
    pageType: 'occupation',
    notes: 'Distribution centres and e-commerce warehouses are Czech search variants of one operational need.',
  },
  {
    id: 'construction-workers',
    category: 'industries',
    csPrimary: '/stavebni-pracovnici',
    csCollapsed: ['/pracovnici-pro-stavebnictvi', '/pomocni-stavebni-pracovnici', '/stavebni-profese'],
    urls: { en: '/en/construction-workers', de: '/de/baumitarbeiter' },
    pageType: 'occupation',
    notes: 'Four Czech pages, one concept.',
  },
  {
    id: 'food-production-workers',
    category: 'industries',
    csPrimary: '/pracovnici-pro-potravinarskou-vyrobu',
    csCollapsed: ['/baleni-potravin-pracovnici', '/vyroba-potravin-pracovnici'],
    urls: { en: '/en/food-production-workers', de: '/de/lebensmittelproduktion-mitarbeiter' },
    pageType: 'occupation',
    notes: 'Packing and production are one hiring intent outside Czech long-tail search.',
  },
  {
    id: 'automotive-workers',
    category: 'industries',
    csPrimary: '/pracovnici-pro-automotive',
    csCollapsed: ['/automobilovy-prumysl-pracovnici', '/montazni-linky-pracovnici'],
    urls: { en: '/en/automotive-workers', de: '/de/automotive-mitarbeiter' },
    pageType: 'occupation',
    notes: '"Automotive" is used as-is in German industry writing.',
  },

  // ── D. WORKFORCE SITUATIONS ────────────────────────────────────────────
  {
    id: 'volume-hiring',
    category: 'workforce',
    csPrimary: '/hromadny-nabor-pracovniku',
    urls: { en: '/en/volume-hiring', de: '/de/massenrekrutierung' },
    pageType: 'guide',
    notes: 'A distinct operational situation, not a synonym of the recruitment overview.',
  },
  {
    id: 'production-ramp-up',
    category: 'workforce',
    csPrimary: '/nabor-pri-nabehu-vyroby',
    urls: { en: '/en/production-ramp-up-hiring', de: '/de/personal-fuer-produktionsanlauf' },
    pageType: 'guide',
    notes: '"Produktionsanlauf" is the standard German term for a line or shift starting up.',
  },
  {
    id: 'seasonal-capacity',
    category: 'workforce',
    csPrimary: '/sezonni-navyseni-kapacity',
    urls: { en: '/en/seasonal-capacity', de: '/de/saisonale-kapazitaet' },
    pageType: 'guide',
    notes: 'Peaks and campaigns.',
  },
  {
    id: 'absence-cover',
    category: 'workforce',
    csPrimary: '/absence-v-provozu',
    urls: { en: '/en/absence-cover', de: '/de/personalausfall-abdecken' },
    pageType: 'guide',
    notes: 'Unplanned absence in an operation, as distinct from a planned vacancy.',
  },
  {
    id: 'direct-hire',
    category: 'workforce',
    csPrimary: '/primy-nabor-zamestnancu',
    urls: { en: '/en/direct-hire', de: '/de/direktvermittlung' },
    pageType: 'service',
    notes: '"Direktvermittlung" is the German staffing-market term for permanent placement.',
  },
  {
    id: 'agency-employment',
    category: 'workforce',
    csPrimary: '/docasne-prideleni-zamestnancu',
    urls: { en: '/en/temporary-agency-employment', de: '/de/arbeitnehmerueberlassung-tschechien' },
    pageType: 'service',
    notes:
      'The German slug carries "tschechien" deliberately. Arbeitnehmerüberlassung is also the term of the German AÜG, and this page describes the Czech arrangement — the jurisdiction belongs in the URL as well as the first legally meaningful sentence.',
  },
  {
    id: 'agency-fees',
    category: 'workforce',
    csPrimary: '/cena-sluzeb-personalni-agentury',
    urls: { en: '/en/agency-fee-models', de: '/de/verguetungsmodelle-personalagentur' },
    pageType: 'guide',
    notes:
      'Safe to translate because the Czech names no prices — it explains how fee models differ. No figure may be introduced.',
  },
  {
    id: 'choosing-an-agency',
    category: 'workforce',
    csPrimary: '/jak-vybrat-personalni-agenturu',
    urls: { en: '/en/choosing-a-staffing-agency', de: '/de/personalagentur-auswaehlen' },
    pageType: 'guide',
    notes: 'Buyer-side guidance, including how to verify a provider.',
  },
  {
    id: 'agency-contract',
    category: 'workforce',
    csPrimary: '/smlouva-s-personalni-agenturou',
    urls: { en: '/en/staffing-agency-contract', de: '/de/vertrag-mit-personalagentur' },
    pageType: 'guide',
    notes:
      'Contract terms to look at. Czech law framing is explicit throughout so a German reader cannot take it as German contract guidance.',
  },

  // ── E. TRUST / EMPLOYER AUTHORITY ──────────────────────────────────────
  {
    id: 'employer-faq',
    category: 'trust',
    csPrimary: '/faq-pro-zamestnavatele',
    csCollapsed: ['/faq-zamestnavani-pracovniku'],
    urls: { en: '/en/employer-faq', de: '/de/haeufige-fragen-arbeitgeber' },
    pageType: 'faq',
    notes: 'Two Czech FAQ hubs answer the same employer questions.',
  },
  {
    id: 'employer-glossary',
    category: 'trust',
    csPrimary: '/slovnik-pojmu-pro-zamestnavatele',
    urls: { en: '/en/employer-glossary', de: '/de/glossar-fuer-arbeitgeber' },
    pageType: 'reference',
    notes: 'Terminology, including terms that have no clean equivalent — which is itself useful to a foreign reader.',
  },
  {
    id: 'editorial-policy',
    category: 'trust',
    csPrimary: '/redakcni-zasady',
    urls: { en: '/en/editorial-standards', de: '/de/redaktionelle-grundsaetze' },
    pageType: 'utility',
    notes:
      'How the site sources and dates its content. Non-statistical, and the page a sceptical reader looks for; the E-E-A-T gate already requires the Czech one to be linked.',
  },
]

/** Czech routes that stay Czech-only, with the reason recorded. */
export const CZECH_ONLY: ReadonlyArray<{ route: string; reason: string }> = [
  { route: '/nedostatek-pracovniku-ve-vyrobe', reason: 'Sector shortage page. Carries no figures, but its intent overlaps the industry concept, and separate EN/DE pages would be near-duplicates of those.' },
  { route: '/nedostatek-pracovniku-v-logistice', reason: 'As above.' },
  { route: '/nedostatek-pracovniku-ve-skladech', reason: 'As above.' },
  { route: '/nedostatek-pracovniku-ve-stavebnictvi', reason: 'As above.' },
  { route: '/nedostatek-pracovniku-v-cr', reason: 'National labour-market intelligence. Statistical, needs a freshness programme.' },
]

/**
 * Rule-based classification for the remainder of the Czech spine.
 *
 * Every one of the 185 Czech routes is accounted for: owned by an L0 concept,
 * owned by an L1 concept above, named individually in CZECH_ONLY or
 * DEFERRED_L2, or matched by exactly one rule here. A route matching no rule is
 * a gap, and the validator treats it as one.
 */
export interface ClassRule {
  readonly id: string
  readonly test: RegExp
  readonly classification: 'CZECH_ONLY' | 'L2' | 'OUT_OF_SCOPE'
  readonly reason: string
}

export const CLASS_RULES: readonly ClassRule[] = [
  {
    id: 'regional',
    test: /^\/(trh-prace|naklady-na-zamestnance)-|^\/(agentura-prace|pracovnici|nabor-zamestnancu|prace-pro-cizince)-(praha|brno|ostrava|plzen|pardubice|hradec|liberec|usti|olomouc|zlin)/,
    classification: 'CZECH_ONLY',
    reason:
      'Regional labour-market and cost pages. Their value is locality-specific figures that need a source and freshness programme per locale; translating them would create exactly the maintenance obligation L1 is defined to avoid.',
  },
  {
    id: 'immigration',
    test: /cizinc|kart[aeuy]|povoleni|ukrajin|moldavan|gruzin|filipin|srb|legalizac|nelegaln|sankce|inspektorat|zahranicnich|prava-a-povinnosti|dokumenty-pro-zamestnani|nejcastejsi-chyby-zamestnavatelu/,
    classification: 'L2',
    reason: 'Immigration, permits, residence and employment authorisation, and the compliance content built on them.',
  },
  {
    id: 'payroll',
    test: /^\/(socialni-zdravotni-dane-2026|kalkulacka-mzdy-agenturniho-zamestnance)$/,
    classification: 'L2',
    reason: 'Statutory contribution rates and payroll calculation.',
  },
  {
    id: 'marketplace',
    test: /^\/(agencies|offers|submit-agency|submit-offer)$/,
    classification: 'OUT_OF_SCOPE',
    reason: 'Marketplace surfaces for the Czech market. English-looking slugs are not evidence of an English audience.',
  },
  {
    id: 'blog',
    test: /^\/blog\//,
    classification: 'OUT_OF_SCOPE',
    reason: 'Dated news items, not evergreen commercial content.',
  },
]

/** Concepts deferred to L2, with the obligation that defers them. */
export const DEFERRED_L2: ReadonlyArray<{ route: string; reason: string }> = [
  { route: '/odborna-zpusobilost-a-opravneni', reason: 'Subject IS statutory competence (vyhláška 50, NV 194/2022). Structurally legal.' },
  { route: '/ubytovani-pro-pracovniky', reason: 'States that accommodation proof is required for some residence permits — immigration-adjacent.' },
  { route: '/skutecne-naklady-na-zamestnance', reason: 'Employer cost including statutory contributions — payroll.' },
  { route: '/kolik-stoji-zamestnanec', reason: 'As above.' },
  { route: '/neprime-naklady-na-zamestnance', reason: 'As above.' },
  { route: '/povinnosti-zamestnavatele', reason: 'Statutory employer duties.' },
  { route: '/minimalni-mzda-2026', reason: 'Statutory wage figure, dated.' },
  { route: '/naklady-na-zamestnance-cr', reason: 'Payroll cost figures.' },
]
