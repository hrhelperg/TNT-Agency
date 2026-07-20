// HELPERG ecosystem — single source of truth for every product and channel.
//
// The banner, the product directory, the timeline and the tests all read from
// this one registry. Nothing here may be duplicated in markup.
//
// URL policy, enforced by lib/ecosystem/ecosystem.test.ts:
//   * every URL is https and was verified to resolve before being added;
//   * URLs are the final canonical destination (several apex domains
//     canonicalise to www — linking the final URL avoids a redirect hop);
//   * no placeholder, no "#", no invented domain, no staging/preview host;
//   * a channel is listed only when a real, verified URL exists. A product with
//     no verified channel is omitted entirely rather than rendered dead;
//   * no tracking query parameters. The supplied Play Store links carried
//     `pcampaignid=web_share` (a share-campaign marker); it is stripped, since
//     these are owned properties and internal tracking params are not added.

export type ChannelKind = 'website' | 'webApp' | 'ios' | 'android'

export interface ProductChannel {
  website?: string
  webApp?: string
  ios?: string
  android?: string
}

export type EcosystemCategory =
  | 'business'
  | 'platforms'
  | 'knowledge'
  | 'mobile'
  | 'company'

export interface EcosystemProduct {
  id: string
  name: string
  shortName?: string
  category: EcosystemCategory
  description?: string
  channels: ProductChannel
  status: 'live' | 'coming-soon'
  /** Exactly one product may set this. On this site it is TalentPartnerID. */
  current?: boolean
  /** Lower renders closer to the current product on the desktop timeline. */
  timelinePriority?: number
}

/** Display order of the directory groups. */
export const CATEGORY_ORDER: readonly EcosystemCategory[] = [
  'business',
  'platforms',
  'knowledge',
  'mobile',
  'company',
]

export const CHANNEL_ORDER: readonly ChannelKind[] = ['website', 'webApp', 'ios', 'android']

export const ECOSYSTEM_PRODUCTS: readonly EcosystemProduct[] = [
  // ── 1. Business and operations ────────────────────────────────────────
  {
    id: 'talentpartnerid',
    name: 'TalentPartnerID',
    category: 'business',
    description: 'Staffing and payroll cost intelligence for employers in the Czech Republic.',
    channels: { website: 'https://talentpartnerid.com/' },
    status: 'live',
    current: true,
    timelinePriority: 0,
  },
  {
    id: 'hrhelperg',
    name: 'HRHelperG',
    category: 'business',
    description: 'HR and workforce platform.',
    channels: { website: 'https://hrhelperg.com/' },
    status: 'live',
    timelinePriority: 1,
  },
  {
    id: 'webmasterid',
    name: 'WebmasterID',
    category: 'business',
    description: 'Privacy-first web analytics.',
    channels: { website: 'https://webmasterid.com/' },
    status: 'live',
    timelinePriority: 2,
  },

  // ── 2. Web and intelligence platforms ────────────────────────────────
  {
    id: 'geobusinessiq',
    name: 'GeoBusinessIQ',
    category: 'platforms',
    description: 'Business and market intelligence by geography.',
    channels: { website: 'https://www.geobusinessiq.com/' },
    status: 'live',
    timelinePriority: 3,
  },
  {
    id: 'globalcityintelligence',
    name: 'GlobalCityIntelligence',
    shortName: 'GlobalCityIQ',
    category: 'platforms',
    description: 'City-level data and analysis.',
    channels: { website: 'https://www.globalcityintelligence.com/' },
    status: 'live',
    timelinePriority: 4,
  },
  {
    id: 'agricultureid',
    name: 'AgricultureID',
    category: 'platforms',
    description: 'Agricultural sector intelligence.',
    channels: { website: 'https://www.agricultureid.com/' },
    status: 'live',
    timelinePriority: 6,
  },
  {
    id: 'socialsporthub',
    name: 'SocialSportHub',
    category: 'platforms',
    description: 'Sport and community platform.',
    channels: { website: 'https://www.socialsporthub.com/' },
    status: 'live',
    timelinePriority: 8,
  },

  // ── 3. Knowledge and reference platforms ─────────────────────────────
  {
    id: 'printerarchive',
    name: 'PrinterArchive',
    category: 'knowledge',
    description: 'Printing technology reference and archive.',
    channels: { website: 'https://printerarchive.net/' },
    status: 'live',
    timelinePriority: 5,
  },
  {
    id: 'builddesignhub',
    name: 'BuildDesignHub',
    category: 'knowledge',
    description: 'Construction and design reference.',
    channels: { website: 'https://www.builddesignhub.com/' },
    status: 'live',
    timelinePriority: 7,
  },
  {
    id: 'faunahub',
    name: 'FaunaHub',
    category: 'knowledge',
    description: 'Wildlife and animal reference.',
    channels: { website: 'https://faunahub.com/' },
    status: 'live',
    timelinePriority: 9,
  },
  {
    id: 'asteriastar',
    name: 'AsteriaStar',
    category: 'knowledge',
    channels: { website: 'https://www.asteriastar.com/' },
    status: 'live',
    timelinePriority: 10,
  },
  {
    id: 'virtueandpower',
    name: 'Virtue & Power',
    category: 'knowledge',
    channels: { website: 'https://www.virtueandpower.com/' },
    status: 'live',
    timelinePriority: 11,
  },
  {
    id: 'twinphone',
    name: 'Twin Phone',
    category: 'knowledge',
    description: 'Phone comparison and reference.',
    channels: { website: 'https://www.twin-phone.com/' },
    status: 'live',
    timelinePriority: 12,
  },

  // ── 4. Mobile utilities ──────────────────────────────────────────────
  // Store titles were read from the live listings when verifying each link.
  {
    id: 'pdf-editor',
    name: 'PDF Editor',
    category: 'mobile',
    description: 'Edit and convert PDF documents.',
    channels: {
      ios: 'https://apps.apple.com/app/id6747341672',
      android: 'https://play.google.com/store/apps/details?id=com.helperg.editor.documents',
    },
    status: 'live',
  },
  {
    id: 'smart-printer',
    name: 'Smart Printer',
    category: 'mobile',
    description: 'Mobile printing and scanning.',
    channels: {
      ios: 'https://apps.apple.com/app/id6746067890',
      android: 'https://play.google.com/store/apps/details?id=com.helperg.smart.printer',
    },
    status: 'live',
  },
  {
    id: 'fax',
    name: 'Fax',
    category: 'mobile',
    description: 'Send a fax from a phone.',
    channels: {
      ios: 'https://apps.apple.com/app/id6760895885',
      android: 'https://play.google.com/store/apps/details?id=com.helperg.fax.app',
    },
    status: 'live',
  },
  {
    id: 'zip-archive',
    name: 'ZIP Archive',
    category: 'mobile',
    description: 'Open and create compressed archives.',
    channels: {
      ios: 'https://apps.apple.com/app/id6753772583',
      android: 'https://play.google.com/store/apps/details?id=com.ziparchivator.zip',
    },
    status: 'live',
  },
  {
    id: 'invoice-maker',
    name: 'Invoice Maker',
    category: 'mobile',
    description: 'Create and send invoices.',
    channels: {
      ios: 'https://apps.apple.com/app/id6747311276',
      android: 'https://play.google.com/store/apps/details?id=com.helperg.invoicer',
    },
    status: 'live',
  },
  {
    id: 'pocket-manager',
    name: 'Pocket Manager',
    category: 'mobile',
    description: 'Personal budget tracking.',
    channels: {
      ios: 'https://apps.apple.com/app/id6743084126',
      android: 'https://play.google.com/store/apps/details?id=com.helperg.money',
    },
    status: 'live',
  },
  {
    id: 'cv-resume-builder',
    name: 'CV & Resume Builder',
    category: 'mobile',
    description: 'Build a CV and resume.',
    // iOS only: no Android link was supplied and none is verified elsewhere,
    // so no Android channel is rendered. Do not add one without verification.
    channels: { ios: 'https://apps.apple.com/app/id6745150815' },
    status: 'live',
  },

  // ── 5. HELPERG company and founder ───────────────────────────────────
  {
    id: 'helperg',
    name: 'HELPERG',
    category: 'company',
    description: 'The company behind the ecosystem.',
    channels: { website: 'https://helperg.com/' },
    status: 'live',
  },
  {
    id: 'petrohrys',
    name: 'Petro Hrys',
    category: 'company',
    description: 'Founder.',
    channels: { website: 'https://petrohrys.com/' },
    status: 'live',
  },
]

// NOTE — Cash Workspace is intentionally absent. No verified public website or
// web-app URL exists for it in this repository or anywhere else this project
// can confirm, and the brief forbids guessing a domain. It should be added only
// once a real URL is verified.

/** The one product this site represents. Throws if the invariant is broken. */
export function currentProduct(): EcosystemProduct {
  const found = ECOSYSTEM_PRODUCTS.filter((p) => p.current)
  if (found.length !== 1) {
    throw new Error(`Exactly one current product is required, found ${found.length}`)
  }
  return found[0]
}

export const productsInCategory = (c: EcosystemCategory): EcosystemProduct[] =>
  ECOSYSTEM_PRODUCTS.filter((p) => p.category === c)

/** Channels that actually exist, in a stable display order. */
export function availableChannels(p: EcosystemProduct): Array<{ kind: ChannelKind; url: string }> {
  return CHANNEL_ORDER.filter((k) => Boolean(p.channels[k])).map((k) => ({
    kind: k,
    url: p.channels[k] as string,
  }))
}

/**
 * The curated desktop timeline: the current product plus its nearest neighbours
 * by timelinePriority. Products without a priority (mobile apps, company) are
 * reached through the directory rather than the strip.
 */
export function timelineProducts(limit = 6): EcosystemProduct[] {
  return ECOSYSTEM_PRODUCTS.filter((p) => typeof p.timelinePriority === 'number')
    .slice()
    .sort((a, b) => (a.timelinePriority as number) - (b.timelinePriority as number))
    .slice(0, limit)
}
