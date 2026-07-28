// Canonical Tier 1 registry — the single source of truth for TalentPartnerID's
// Czech commercial-authority pages. Navigation, tests and validators all read
// this; no duplicate Tier 1 list is maintained elsewhere.
//
// Routes are the real, existing canonical routes (no invented URLs). The
// "direct-versus-agency comparison" asset is delivered by the payroll
// calculator's #srovnani mode (not a separate URL), so it is folded into the
// calculator entry via requiredAssets rather than duplicating a route.

export type TierOnePageKind =
  | 'homepage'
  | 'employer-hub'
  | 'conversion'
  | 'calculator'
  | 'comparison'
  | 'industry'
  | 'region'
  | 'foreign-workforce'

export type TierOneAsset =
  | 'calculator'
  | 'comparison'
  | 'checklist'
  | 'responsibility-matrix'
  | 'request-form'
  | 'official-sources'

export type EditorialStatus =
  | 'reviewed-automatically'
  | 'native-review-required'
  | 'specialist-review-required'

export interface TierOnePage {
  id: string
  route: string
  kind: TierOnePageKind
  primaryAudience: string
  primaryIntent: string
  distinctPurpose: string
  parentRoute: string | null
  conversionRoute: string
  relatedRoutes: string[]
  requiredAssets: TierOneAsset[]
  editorialStatus: EditorialStatus
}

const REQUEST = '/poptavka-pracovniku'
const HUB = '/pro-zamestnavatele'
const CALC = '/kalkulacka-mzdy-agenturniho-zamestnance'

export const TIER_ONE: readonly TierOnePage[] = [
  {
    id: 'homepage',
    route: '/',
    kind: 'homepage',
    primaryAudience: 'Zaměstnavatelé (výroba, logistika, provozy)',
    primaryIntent: 'Zorientovat se v možnostech zajištění pracovníků a nákladech',
    distinctPurpose: 'Rozcestník pro zaměstnavatele: modely spolupráce, kalkulačka nákladů, cesta k poptávce',
    parentRoute: null,
    conversionRoute: REQUEST,
    relatedRoutes: [HUB, CALC, '/nabor-zahranicnich-pracovniku'],
    requiredAssets: ['calculator', 'request-form'],
    editorialStatus: 'reviewed-automatically',
  },
  {
    id: 'employer-hub',
    route: HUB,
    kind: 'employer-hub',
    primaryAudience: 'Zaměstnavatelé řešící konkrétní personální situaci',
    primaryIntent: 'Najít podle situace vhodnou službu, nástroj a další krok',
    distinctPurpose: 'Rozcestník podle situace zaměstnavatele (chybí lidé na směně, fluktuace, cizinci…)',
    parentRoute: '/',
    conversionRoute: REQUEST,
    relatedRoutes: [CALC, '/pracovnici-do-vyroby', '/nabor-zahranicnich-pracovniku', REQUEST],
    requiredAssets: ['checklist', 'request-form', 'official-sources'],
    editorialStatus: 'native-review-required',
  },
  {
    id: 'request-workers',
    route: REQUEST,
    kind: 'conversion',
    primaryAudience: 'Zaměstnavatel připravený zadat poptávku',
    primaryIntent: 'Zadat požadavek na pracovníky (profese, počet, lokalita, směny)',
    distinctPurpose: 'Konverzní stránka: strukturovaná příprava e-mailové poptávky (mailto-first)',
    parentRoute: HUB,
    conversionRoute: REQUEST,
    relatedRoutes: [CALC, HUB],
    requiredAssets: ['request-form', 'checklist'],
    editorialStatus: 'reviewed-automatically',
  },
  {
    id: 'calculator',
    route: CALC,
    kind: 'calculator',
    primaryAudience: 'Zaměstnavatel odhadující cenu práce',
    primaryIntent: 'Spočítat náklady zaměstnance a porovnat přímý nábor s agenturním',
    distinctPurpose: 'Kalkulačka nákladů zaměstnavatele včetně režimu srovnání (#srovnani)',
    parentRoute: HUB,
    conversionRoute: REQUEST,
    relatedRoutes: ['/kolik-stoji-zamestnanec', '/naklady-na-zamestnance-pardubice', REQUEST],
    requiredAssets: ['calculator', 'comparison', 'request-form'],
    editorialStatus: 'specialist-review-required',
  },
  {
    id: 'staffing-production',
    route: '/pracovnici-do-vyroby',
    kind: 'industry',
    primaryAudience: 'Výrobní podniky',
    primaryIntent: 'Obsadit provozní pozice ve výrobě',
    distinctPurpose: 'Personální zajištění výroby: směny, požadavky, plánování a odpovědnosti',
    parentRoute: HUB,
    conversionRoute: REQUEST,
    relatedRoutes: ['/vyrobni-zamestnanci', '/operatori-vyroby', CALC],
    requiredAssets: ['checklist', 'request-form', 'official-sources'],
    editorialStatus: 'native-review-required',
  },
  {
    id: 'staffing-logistics',
    route: '/pracovnici-do-logistiky',
    kind: 'industry',
    primaryAudience: 'Logistické a distribuční provozy',
    primaryIntent: 'Obsadit pozice v logistice',
    distinctPurpose: 'Personální zajištění logistiky: směnnost, sezónní špičky, role a doprava',
    parentRoute: HUB,
    conversionRoute: REQUEST,
    relatedRoutes: ['/pracovnici-do-skladu', '/pracovnici-pro-distribucni-centra', CALC],
    requiredAssets: ['checklist', 'request-form', 'official-sources'],
    editorialStatus: 'native-review-required',
  },
  {
    id: 'staffing-warehouse',
    route: '/pracovnici-do-skladu',
    kind: 'industry',
    primaryAudience: 'Sklady a e-commerce provozy',
    primaryIntent: 'Obsadit skladové pozice',
    distinctPurpose: 'Personální zajištění skladu: příjem, picking, packing, expedice, docházka',
    parentRoute: HUB,
    conversionRoute: REQUEST,
    relatedRoutes: ['/skladnici', '/skladovi-pracovnici', CALC],
    requiredAssets: ['checklist', 'request-form', 'official-sources'],
    editorialStatus: 'native-review-required',
  },
  {
    id: 'staffing-automotive',
    route: '/pracovnici-pro-automotive',
    kind: 'industry',
    primaryAudience: 'Automotive výroba a dodavatelé',
    primaryIntent: 'Obsadit pozice v automobilovém průmyslu',
    distinctPurpose: 'Personální zajištění automotive: výrobní takt, kvalita, směnová stabilita, BOZP',
    parentRoute: HUB,
    conversionRoute: REQUEST,
    relatedRoutes: ['/montazni-pracovnici', '/pracovnici-do-vyroby', CALC],
    requiredAssets: ['checklist', 'request-form', 'official-sources'],
    editorialStatus: 'native-review-required',
  },
  {
    id: 'staffing-food',
    route: '/pracovnici-pro-potravinarskou-vyrobu',
    kind: 'industry',
    primaryAudience: 'Potravinářská výroba a balírny',
    primaryIntent: 'Obsadit pozice v potravinářské výrobě',
    distinctPurpose: 'Personální zajištění potravinářství: hygiena, teplotní provozy, směny, prohlídky',
    parentRoute: HUB,
    conversionRoute: REQUEST,
    relatedRoutes: ['/vyroba-potravin-pracovnici', '/baleni-potravin-pracovnici', CALC],
    requiredAssets: ['checklist', 'request-form', 'official-sources'],
    editorialStatus: 'native-review-required',
  },
  {
    id: 'foreign-workforce',
    route: '/nabor-zahranicnich-pracovniku',
    kind: 'foreign-workforce',
    primaryAudience: 'Zaměstnavatelé zvažující pracovníky ze zahraničí',
    primaryIntent: 'Pochopit postup a povinnosti při náboru ze zahraničí',
    distinctPurpose: 'Nábor ze zahraničí: rozdíl EU vs. třetí země, dokumentace, povinnosti zaměstnavatele',
    parentRoute: HUB,
    conversionRoute: REQUEST,
    relatedRoutes: ['/zamestnavani-cizincu', '/pracovni-povoleni-cr', '/zamestnanecka-karta-2026'],
    requiredAssets: ['official-sources', 'request-form'],
    editorialStatus: 'specialist-review-required',
  },
  {
    id: 'region-pardubice',
    route: '/nabor-zamestnancu-pardubice',
    kind: 'region',
    primaryAudience: 'Zaměstnavatelé v Pardubicích a okolí',
    primaryIntent: 'Zajistit pracovníky v regionu Pardubice',
    distinctPurpose: 'Nábor v Pardubicích: regionální kontext náboru (sídlo provozovatele)',
    parentRoute: HUB,
    conversionRoute: REQUEST,
    relatedRoutes: ['/naklady-na-zamestnance-pardubice', '/pracovnici-pardubice', REQUEST],
    requiredAssets: ['request-form'],
    editorialStatus: 'native-review-required',
  },
  {
    id: 'region-hradec-kralove',
    route: '/nabor-zamestnancu-hradec-kralove',
    kind: 'region',
    primaryAudience: 'Zaměstnavatelé v Hradci Králové a okolí',
    primaryIntent: 'Zajistit pracovníky v regionu Hradec Králové',
    distinctPurpose: 'Nábor v Hradci Králové: regionální kontext náboru',
    parentRoute: HUB,
    conversionRoute: REQUEST,
    relatedRoutes: ['/pracovnici-hradec-kralove', '/naklady-na-zamestnance-hradec-kralove', REQUEST],
    requiredAssets: ['request-form'],
    editorialStatus: 'native-review-required',
  },
  {
    id: 'region-stredocesky',
    route: '/trh-prace-stredocesky-kraj',
    kind: 'region',
    primaryAudience: 'Zaměstnavatelé ve Středočeském kraji',
    primaryIntent: 'Porozumět trhu práce ve Středočeském kraji z pohledu zaměstnavatele',
    distinctPurpose: 'Trh práce Středočeského kraje: regionální kontext náboru a dostupnosti',
    parentRoute: HUB,
    conversionRoute: REQUEST,
    relatedRoutes: ['/naklady-na-zamestnance-stredni-cechy', '/nabor-pracovniku', REQUEST],
    requiredAssets: ['official-sources', 'request-form'],
    editorialStatus: 'native-review-required',
  },
]

export const tierOneById = (id: string): TierOnePage | undefined => TIER_ONE.find((p) => p.id === id)
export const tierOneRoutes = (): string[] => TIER_ONE.map((p) => p.route)
export const isTierOne = (route: string): boolean => TIER_ONE.some((p) => p.route === route)
