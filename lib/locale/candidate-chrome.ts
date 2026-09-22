/**
 * Chrome for the candidate locales (pt-BR, es).
 *
 * WHY THIS IS NOT MORE ROWS IN chrome.ts
 * ──────────────────────────────────────
 * The employer chrome's keys ARE the employer product: agencies, offers,
 * payroll calculators, "list your agency", "post a request", "request workers".
 * Adding pt-BR and es rows to it would have meant authoring sixty-four strings
 * per locale that can never render, because resolveNavHref returns the CZECH
 * URL for any concept a locale does not publish — so a Brazilian candidate page
 * would have shown "Agências → /agencies". That is Czech chrome leakage (§37)
 * and employer CTA routing off a candidate page (§34) in a single link.
 *
 * So the candidate locales get their own nav and footer, keyed to the candidate
 * journey. Nothing here can resolve to an employer destination, because no
 * employer route is nameable in this file.
 *
 * Every string is authored, not translated from the employer chrome. PT-BR is
 * Brazilian Portuguese (tcheco, contato, currículo — never the pt-PT checo,
 * contacto). ES is neutral Latin-American Spanish (Chequia, CV, postularme —
 * never Spain-specific costes/sanitario/vosotros).
 */
import { LOCALE_PREFIX, isCandidateLocale, type Locale } from './locales'
import { CHROME_NAV, type CandidateLocale, type EmployerLocale } from './chrome'

/** Header + mobile-menu slots for a candidate locale. */
export type CandidateNavKey =
  | 'home'
  | 'workInCzechia'
  | 'howItWorks'
  | 'employeeCard'
  | 'documents'
  | 'professions'
  | 'faq'
  | 'contact'
  | 'apply'
  | 'language'

export const CANDIDATE_NAV: Readonly<
  Record<CandidateLocale, Readonly<Record<CandidateNavKey, string>>>
> = {
  'pt-BR': {
    home: 'Início',
    workInCzechia: 'Trabalhar na República Tcheca',
    howItWorks: 'Como funciona',
    employeeCard: 'Cartão de empregado',
    documents: 'Documentos',
    professions: 'Áreas de atuação',
    faq: 'Perguntas frequentes',
    contact: 'Contato',
    apply: 'Candidate-se',
    language: 'Idioma',
  },
  es: {
    home: 'Inicio',
    workInCzechia: 'Trabajar en Chequia',
    howItWorks: 'Cómo funciona',
    employeeCard: 'Tarjeta de empleado',
    documents: 'Documentos',
    professions: 'Áreas de trabajo',
    faq: 'Preguntas frecuentes',
    contact: 'Contacto',
    apply: 'Postularme',
    language: 'Idioma',
  },
}

export type CandidateFooterKey =
  | 'tagline'
  | 'colPath'
  | 'linkWorkInCzechia'
  | 'linkHowItWorks'
  | 'linkEmployeeCard'
  | 'linkDocuments'
  | 'linkQualifications'
  | 'colProfessions'
  | 'linkEngineers'
  | 'linkTechnical'
  | 'linkManufacturing'
  | 'linkLogistics'
  | 'linkHealthcare'
  | 'colPrepare'
  | 'linkBeforeTravel'
  | 'linkAfterArrival'
  | 'linkLifeAndWork'
  /**
   * PT-BR only. §32 forbids generalising Czech consular procedure for Brazil to
   * the rest of Latin America, so `brazil-consular-route` is not published in
   * es. The Record below is therefore Partial: es simply has no such label.
   * Carrying an unused Spanish string naming the Brazilian mission would be a
   * trap — one guard change away from routing a Peruvian candidate to São Paulo.
   */
  | 'linkConsular'
  | 'colTrust'
  | 'linkAbout'
  | 'linkRights'
  | 'linkVerify'
  | 'linkFaq'
  | 'linkContact'
  | 'officialNoticeTitle'
  | 'officialNotice'
  | 'forEmployers'
  | 'copy'
  | 'terms'
  | 'priv'
  | 'dataNotice'
  | 'cook'

export const CANDIDATE_FOOTER: Readonly<
  Record<CandidateLocale, Readonly<Partial<Record<CandidateFooterKey, string>>>>
> = {
  'pt-BR': {
    tagline:
      'A TalentPartnerID é uma agência de recrutamento tcheca. Explicamos como funciona o trabalho legal na República Tcheca e apresentamos candidatos a empregadores tchecos.',
    colPath: 'O processo',
    linkWorkInCzechia: 'Trabalhar na República Tcheca',
    linkHowItWorks: 'Como funciona o recrutamento',
    linkEmployeeCard: 'Cartão de empregado (zaměstnanecká karta)',
    linkDocuments: 'Documentos necessários',
    linkQualifications: 'Reconhecimento de qualificações',
    colProfessions: 'Áreas de atuação',
    linkEngineers: 'Trabalho para engenheiros',
    linkTechnical: 'Profissões técnicas',
    linkManufacturing: 'Trabalho na indústria',
    linkLogistics: 'Trabalho em logística',
    linkHealthcare: 'Profissões de saúde regulamentadas',
    colPrepare: 'Preparação',
    linkBeforeTravel: 'Antes de viajar',
    linkAfterArrival: 'Depois de chegar',
    linkLifeAndWork: 'Vida e trabalho na República Tcheca',
    linkConsular: 'Embaixada e Consulado-Geral tchecos no Brasil',
    colTrust: 'Transparência',
    linkAbout: 'Sobre nós',
    linkRights: 'Direitos do trabalhador',
    linkVerify: 'Onde verificar informações oficiais',
    linkFaq: 'Perguntas frequentes',
    linkContact: 'Contato',
    officialNoticeTitle: 'Informações oficiais',
    officialNotice:
      'A TalentPartnerID não é um órgão do governo tcheco, uma embaixada nem uma autoridade de imigração, e não emite vistos nem autorizações de residência. As decisões sobre pedidos cabem exclusivamente às autoridades tchecas. Confirme sempre prazos, taxas e documentos nas fontes oficiais que indicamos.',
    forEmployers: 'É empregador? Acesse o site para empresas',
    copy: '© 2026 TNT agency s.r.o. Todos os direitos reservados.',
    terms: 'Termos',
    priv: 'Privacidade',
    dataNotice: 'Tratamento de dados do candidato',
    cook: 'Cookies',
  },
  es: {
    tagline:
      'TalentPartnerID es una agencia de reclutamiento checa. Explicamos cómo funciona el trabajo legal en Chequia y presentamos candidatos a empleadores checos.',
    colPath: 'El proceso',
    linkWorkInCzechia: 'Trabajar en Chequia',
    linkHowItWorks: 'Cómo funciona el reclutamiento',
    linkEmployeeCard: 'Tarjeta de empleado (zaměstnanecká karta)',
    linkDocuments: 'Documentos necesarios',
    linkQualifications: 'Reconocimiento de títulos',
    colProfessions: 'Áreas de trabajo',
    linkEngineers: 'Trabajar como ingeniero',
    linkTechnical: 'Profesiones técnicas',
    linkManufacturing: 'Trabajar en la industria',
    linkLogistics: 'Trabajar en logística',
    linkHealthcare: 'Profesiones de la salud reguladas',
    colPrepare: 'Preparación',
    linkBeforeTravel: 'Antes de viajar',
    linkAfterArrival: 'Después de llegar',
    linkLifeAndWork: 'Vida y trabajo en Chequia',
    colTrust: 'Transparencia',
    linkAbout: 'Sobre nosotros',
    linkRights: 'Derechos del trabajador',
    linkVerify: 'Dónde verificar información oficial',
    linkFaq: 'Preguntas frecuentes',
    linkContact: 'Contacto',
    officialNoticeTitle: 'Información oficial',
    officialNotice:
      'TalentPartnerID no es un organismo del Estado checo, una embajada ni una autoridad migratoria, y no expide visas ni permisos de residencia. Las decisiones sobre las solicitudes corresponden únicamente a las autoridades checas. Confirme siempre plazos, tasas y documentos en las fuentes oficiales que indicamos.',
    forEmployers: '¿Es empleador? Visite el sitio para empresas',
    copy: '© 2026 TNT agency s.r.o. Todos los derechos reservados.',
    terms: 'Términos',
    priv: 'Privacidad',
    dataNotice: 'Tratamiento de datos del candidato',
    cook: 'Cookies',
  },
}

/**
 * A candidate chrome link: a concept id resolved within the reader's own locale.
 *
 * Deliberately NOT the employer chrome's LinkTarget shape, which carries a
 * `czechHref` and falls back to it. There is no fallback here: a concept not
 * published in this locale simply does not render, because a candidate page
 * linking to a Czech employer page is the defect, not a degraded state.
 */
export interface CandidateTarget<K extends string> {
  readonly key: K
  readonly conceptId: string
}

export const CANDIDATE_NAV_TARGETS: readonly CandidateTarget<CandidateNavKey>[] = [
  { key: 'workInCzechia', conceptId: 'work-in-czechia' },
  { key: 'howItWorks', conceptId: 'how-recruitment-works' },
  { key: 'employeeCard', conceptId: 'employee-card' },
  { key: 'documents', conceptId: 'documents-required' },
  { key: 'faq', conceptId: 'candidate-faq' },
  { key: 'contact', conceptId: 'contact' },
]

/** The primary call to action. Always the application concept, never a listing. */
export const CANDIDATE_CTA: CandidateTarget<CandidateNavKey> = {
  key: 'apply',
  conceptId: 'candidate-apply',
}

export const CANDIDATE_FOOTER_TARGETS: readonly CandidateTarget<CandidateFooterKey>[] = [
  { key: 'linkWorkInCzechia', conceptId: 'work-in-czechia' },
  { key: 'linkHowItWorks', conceptId: 'how-recruitment-works' },
  { key: 'linkEmployeeCard', conceptId: 'employee-card' },
  { key: 'linkDocuments', conceptId: 'documents-required' },
  { key: 'linkQualifications', conceptId: 'qualification-recognition' },
  { key: 'linkEngineers', conceptId: 'work-for-engineers' },
  { key: 'linkTechnical', conceptId: 'technical-professions' },
  { key: 'linkManufacturing', conceptId: 'work-in-manufacturing' },
  { key: 'linkLogistics', conceptId: 'work-in-logistics' },
  { key: 'linkHealthcare', conceptId: 'healthcare-regulated-professions' },
  { key: 'linkBeforeTravel', conceptId: 'before-you-travel' },
  { key: 'linkAfterArrival', conceptId: 'after-arrival' },
  { key: 'linkLifeAndWork', conceptId: 'life-and-work' },
  { key: 'linkConsular', conceptId: 'brazil-consular-route' },
  { key: 'linkAbout', conceptId: 'about-us' },
  { key: 'linkRights', conceptId: 'worker-rights' },
  { key: 'linkVerify', conceptId: 'verify-official-info' },
  { key: 'linkFaq', conceptId: 'candidate-faq' },
  { key: 'linkContact', conceptId: 'contact' },
  { key: 'dataNotice', conceptId: 'candidate-data-notice' },
]

/** Footer columns, in render order. */
export const CANDIDATE_FOOTER_COLUMNS: readonly {
  readonly title: CandidateFooterKey
  readonly keys: readonly CandidateFooterKey[]
}[] = [
  {
    title: 'colPath',
    keys: [
      'linkWorkInCzechia',
      'linkHowItWorks',
      'linkEmployeeCard',
      'linkDocuments',
      'linkQualifications',
    ],
  },
  {
    // Engineers first, deliberately. P1 established that Program vysoce
    // kvalifikovaný zaměstnanec "není teritoriálně omezen" and covers CZ-ISCO
    // 1-3, while Brazil is absent from the qualified-worker programme covering
    // 4-8. So the ISCO 1-3 professions are the genuinely open route and belong
    // at the top; leading with volume manufacturing would misrepresent which
    // path is actually available.
    title: 'colProfessions',
    keys: ['linkEngineers', 'linkTechnical', 'linkManufacturing', 'linkLogistics', 'linkHealthcare'],
  },
  {
    title: 'colPrepare',
    keys: ['linkBeforeTravel', 'linkAfterArrival', 'linkLifeAndWork', 'linkConsular'],
  },
  {
    title: 'colTrust',
    keys: ['linkAbout', 'linkRights', 'linkVerify', 'linkFaq', 'linkContact'],
  },
]

/**
 * The discovery entry, in both directions.
 *
 * A NAVIGATIONAL link, never an hreflang alternate. The Czech employer homepage
 * and /pt-br are not translations of each other — one sells staffing to Czech
 * firms, the other explains lawful work to Brazilian candidates — so putting
 * them in one cluster would tell a search engine something false. Discovery
 * lives here, in the footer, and never passes through alternatesFor().
 *
 * scripts/mutate-hreflang.mjs carries a control proving that adding one of
 * these to a cluster fails the build.
 */
export const DISCOVERY_LABEL: Readonly<Record<Locale, string>> = {
  cs: 'Pro uchazeče ze zahraničí',
  en: 'International candidates',
  de: 'Internationale Bewerber',
  'pt-BR': 'Candidatos internacionais',
  es: 'Candidatos internacionales',
}

export const DISCOVERY_TARGETS: readonly { readonly locale: Locale; readonly label: string }[] = [
  { locale: 'pt-BR', label: 'Português' },
  { locale: 'es', label: 'Español' },
]

/** Where a candidate-locale reader goes to reach the employer site. */
export const EMPLOYER_SITE_HREF = LOCALE_PREFIX.en || '/'


/**
 * The "Language" label for any locale.
 *
 * The switcher is the one control every locale renders, so it cannot read
 * CHROME_NAV — that map is employer-only, and indexing it with 'pt-BR' returns
 * undefined rather than erroring, because tsconfig sets "strict": false. This
 * asks the right map for the locale in hand.
 */
export const languageLabelFor = (locale: Locale): string =>
  isCandidateLocale(locale)
    ? CANDIDATE_NAV[locale as CandidateLocale].language
    : CHROME_NAV[locale as EmployerLocale].language
