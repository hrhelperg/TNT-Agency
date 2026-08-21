import type { LocaleCorpus } from '../types'

/**
 * L1 industries cluster — English.
 *
 * Five sectors that share a page shape in Czech and would collapse into five
 * near-identical English pages if translated mechanically. They do not, because
 * each Czech source carries genuinely sector-specific substance: authorisation
 * for handling equipment in warehousing, the interdependence of the chain and
 * the statutory limits on flexible cover in logistics, project and weather
 * dependence in construction, hygiene and cold environments in food, line takt
 * and working-time distribution in automotive.
 *
 * That substance is what each page leads with. Every one of the five refuses
 * wages and vacancy counts, and every one keeps that refusal.
 */
export const EN_INDUSTRIES: LocaleCorpus = {
  'warehouse-workers': {
    en: {
      title: 'Warehouse workers: recruitment and staffing a warehouse operation',
      description:
        'Staffing a warehouse: the roles, the routes to fill them, authorisation for handling equipment, training before a peak, and planning capacity for volume that arrives in bursts. No wage figures.',
      h1: 'Warehouse workers: recruitment and staffing a warehouse operation',
      intro:
        'Warehouse workers handle goods in, putaway, picking and dispatch, and are the basis of any warehouse operation. What characterises the work is volume arriving in bursts and a shift pattern, which makes staffing the central question. This page is an overview of how to staff a warehouse, from the routes for filling roles to coping with peaks. It states no wages and no vacancy counts; it is a practical framework a company fills with its own verified data. The emphasis is on flexibility and on keeping permanent warehouse staff.',
      breadcrumb: 'Warehouse workers',
      sections: [
        {
          heading: 'What is specific to a warehouse',
          body: [
            'Warehouse work covers receiving, putaway, picking, packing and dispatch. It tends to be physical and tied to order volume. Operations often run in shifts, and the volume of work fluctuates in bursts, particularly during peaks.',
            'Some positions require an authorisation — for handling equipment, for instance — which affects both recruitment and training.',
          ],
        },
        {
          heading: 'How to recruit warehouse staff',
          body: [
            'A combination of a permanent core and flexible capacity works for a warehouse. Permanent warehouse staff are best filled by direct recruitment and stabilised through retention; bursts of volume are covered by agency employment. Where there is a shortage, recruiting from abroad widens the pool.',
          ],
        },
        {
          heading: 'Training and safety',
          body: [
            'A warehouse worker starting involves initial health-and-safety training, familiarisation with the warehouse processes, and — for handling equipment — the relevant authorisation and instruction.',
            'Quick, clear training matters most before seasonal peaks, when several people start at once.',
          ],
        },
        {
          heading: 'Planning warehouse capacity',
          body: [
            'Warehouse capacity is best planned against order volume and seasonality, ahead of the peaks. Separating permanent from burst positions makes it possible to respond to volume without carrying unnecessary cost outside a peak.',
            'Current labour-market data is published by the Czech Statistical Office, the Ministry of Labour and Social Affairs and the Czech Labour Office. No figures are stated here.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'Describe the roles, the shift pattern and the site, and we will come back to you.',
      },
    },
  },

  'logistics-workers': {
    en: {
      title: 'Logistics workers: staffing a logistics operation',
      description:
        'Staffing logistics: roles across the chain, why a gap at one point slows the whole flow, the routes for covering seasonal swings, and the legal forms flexible cover can take under Czech law.',
      h1: 'Logistics workers: staffing a logistics operation',
      intro:
        'Logistics connects receiving, storage, assembly and distribution, and its staffing is sensitive to seasonal swings in demand. For an employer that means having to respond flexibly to a changing volume of work. This page is an overview of how to staff a logistics operation, from the routes for filling roles to coping with peaks. It states no wages and no vacancy counts; it is a practical framework a company fills with its own verified data. The emphasis is on flexibility and on keeping a permanent core.',
      breadcrumb: 'Logistics workers',
      sections: [
        {
          heading: 'What is specific to logistics',
          body: [
            'Logistics covers a series of connected roles — from warehouse and handling positions to support for distribution and dispatch — and often runs in shifts. The volume of work fluctuates markedly with season and demand, which makes planning permanent headcount difficult.',
            'Because the links are connected, a gap at one point slows the whole flow of goods. That is what distinguishes logistics from a single warehouse: the cost of one unfilled position is not confined to it.',
          ],
        },
        {
          heading: 'How to recruit for logistics',
          body: [
            'A fluctuating requirement is well covered by a combination of a permanent core and flexible agency capacity, which can be raised for a peak and lowered outside it. For shortage occupations, recruiting from abroad widens the pool; the permanent core is best stabilised through retention.',
          ],
        },
        {
          heading: 'Training and processes',
          body: [
            'Starting in logistics involves initial health-and-safety training, familiarisation with the processes and systems, and the relevant authorisations for equipment. Clear induction matters most before seasonal peaks, when several people start at once.',
          ],
        },
        {
          heading: 'Planning capacity over time',
          body: [
            'Planning starts from the expected volume and its seasonality. Splitting the requirement into standing and burst components, and securing it in good time, makes it possible to handle peaks without gaps and without unnecessary cost out of season.',
            'Current labour-market data is published by the Czech Statistical Office, the Ministry of Labour and Social Affairs and the Czech Labour Office. No figures are stated here.',
          ],
        },
        {
          heading: 'The legal forms flexible peak cover can take',
          body: [
            'Seasonal peaks in logistics can be covered lawfully in more than one form: fixed-term employment, agreements performed outside an employment relationship, and temporary assignment through a staffing agency. Each is governed by different rules under the Czech Labour Code and the Czech Employment Act.',
            'Both the chaining of fixed-term employment and the scope of those agreements are limited by the Czech Labour Code. The exact limits have to be verified against the current wording of the law, and no figures are stated here.',
            'For temporary assignment, the agency worker must have pay and working conditions comparable to a core employee in a similar position, and the staffing agency must hold a permit.',
          ],
        },
      ],
      cta: {
        label: 'Seasonal capacity',
        targetConceptId: 'seasonal-capacity',
        note: 'How to plan a recurring peak rather than react to it.',
      },
    },
  },

  'construction-workers': {
    en: {
      title: 'Construction workers: staffing building projects',
      description:
        'Staffing construction: project and weather dependence, the mix of skilled trades and support roles, what to keep in your own core and what to cover flexibly or by subcontract.',
      h1: 'Construction workers: staffing building projects',
      intro:
        'Construction workers deliver building contracts, and the need for them changes with the projects under way, the season and the weather. Staffing in construction therefore rests on matching capacity to a project schedule. This page is an overview of how to staff a site, from the mix of trades to the recruitment and planning questions. It states no wages and no counts; it is a practical framework for construction firms that takes account of project working, seasonality and the need for both skilled and support trades.',
      breadcrumb: 'Construction workers',
      sections: [
        {
          heading: 'What is specific to construction',
          body: [
            'Construction work is often tied to specific projects with a defined beginning and end, is subject to season and weather, and combines skilled trades with support positions. That makes planning permanent headcount a challenge.',
            'The need for people changes with the phase of a project and with how many contracts run in parallel — so the same firm can be short of people and overstaffed within one year.',
          ],
        },
        {
          heading: 'How to fill construction roles',
          body: [
            'A project-based requirement can be met by a combination of your own core, subcontracting and flexible capacity. Skilled trades are best kept in your own core and stabilised; support positions have a lower barrier to entry. For trades in short supply, recruiting from abroad widens the pool.',
          ],
        },
        {
          heading: 'Training and safety on site',
          body: [
            'Starting on a construction site puts a high emphasis on safety — initial health-and-safety training, familiarisation with the site and its risks, and the authorisations some work requires.',
            'Good induction and a clear division of roles reduce the risk of accidents. On a site where several trades and subcontractors work at once, that division is not an administrative formality.',
          ],
        },
        {
          heading: 'Planning against the project schedule',
          body: [
            'Planning capacity follows from the contract schedule and from seasonality. It is worth knowing in advance which trades to hold in your own core and what to cover flexibly or by subcontract, and — where recruitment from abroad is involved — allowing for the time permits take.',
            'Current labour-market data is published by the Czech Statistical Office, the Ministry of Labour and Social Affairs and the Czech Labour Office. No figures are stated here.',
          ],
        },
      ],
      cta: {
        label: 'Recruitment planning',
        targetConceptId: 'recruitment-planning',
        note: 'Deriving a staffing plan from a schedule rather than from a shortage.',
      },
    },
  },

  'food-production-workers': {
    en: {
      title: 'Food production workers: staffing a food operation',
      description:
        'Staffing food production: hygiene requirements, continuity and shifts, what training has to cover, and the duties that apply to chilled and frozen environments under Czech law.',
      h1: 'Food production workers: staffing a food operation',
      intro:
        'Food production has its own characteristics — strict hygiene requirements, the need for continuity, and often a shift pattern. Staffing here rests not only on filling positions but on maintaining hygiene and food safety. This page is an overview of how to staff a food operation, from the routes for filling roles to training and planning. It states no wages and no counts; it is a practical framework for food companies that takes account of hygiene, continuity and shift working, and of what training a new worker requires.',
      breadcrumb: 'Food production workers',
      sections: [
        {
          heading: 'What is specific to food production',
          body: [
            'A food operation puts the emphasis on hygiene, on following procedures and on food safety, and usually requires production to be continuous across shifts. Positions cover processing, production and packing, and often inspection roles as well.',
            'For some positions there are particular health and hygiene requirements that affect when someone can start.',
          ],
        },
        {
          heading: 'How to recruit for a food operation',
          body: [
            'A permanent core supplemented by flexible capacity for fluctuations works well in food production. Some positions have a lower barrier to entry and can be filled more quickly; where there is a shortage, recruiting from abroad widens the pool.',
            'It is worth stating the hygiene and shift requirements in the advertisement rather than at interview — they are the conditions candidates self-select on.',
          ],
        },
        {
          heading: 'Training on hygiene and safety',
          body: [
            'Alongside initial health-and-safety training, induction in food production concentrates on hygiene procedures and food safety. Some positions may require health certification or the meeting of hygiene requirements; the specific duties follow from the regulations.',
          ],
        },
        {
          heading: 'Planning for continuity',
          body: [
            'Because food production often has to be continuous, shift cover is best planned with a margin and with cross-trained cover. Flexible capacity helps absorb fluctuations without putting the operation at risk.',
            'Current labour-market data is published by the Czech Statistical Office, the Ministry of Labour and Social Affairs and the Czech Labour Office. No figures are stated here.',
          ],
        },
        {
          heading: 'Chilled and frozen environments, and protecting health at work',
          body: [
            'Part of the processing, production and dispatch in food runs in chilled, frozen or otherwise temperature-controlled spaces — meat, dairy and frozen goods, the cold chain. That environment differs from an ordinary production hall and places particular demands on protecting health.',
            'Under the Czech Labour Code an employer has a duty to provide a safe working environment that does not endanger health, and to adapt the organisation of work to it; that duty applies to work at low temperatures as well. The Czech Labour Code also requires personal protective equipment to be provided free of charge where the environment and the risks require it.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'Tell us the environment and the shift pattern — both narrow who can realistically start.',
      },
    },
  },

  'automotive-workers': {
    en: {
      title: 'Automotive workers: staffing an automotive operation',
      description:
        'Staffing automotive production: line takt and quality, continuity across shifts, ramp-ups, and how Czech law frames working-time distribution in multi-shift and continuous operations.',
      h1: 'Automotive workers: staffing an automotive operation',
      intro:
        'The automotive industry is among the more demanding manufacturing sectors, with the emphasis on line takt, quality and continuity in shift working. Staffing here rests on being able to keep the line running and meet the quality requirements. This page is an overview of how to staff an automotive operation, from the routes for filling roles to planning shifts. It states no wages and no counts; it is a practical framework for companies in the sector that takes account of line work, quality and shift working, and of what training new workers require.',
      breadcrumb: 'Automotive workers',
      sections: [
        {
          heading: 'What is specific to an automotive operation',
          body: [
            'Automotive is characterised by work on assembly lines at a set takt, high quality requirements, and continuity across shifts. A gap in people, or a lapse in quality, feeds through the whole line and into the deliveries that depend on it.',
            'Operations often sit inside supply chains with pressure on reliability and stability, which is why cover is a supply question rather than only a staffing one.',
          ],
        },
        {
          heading: 'How to recruit for automotive',
          body: [
            'A permanent core for quality and continuity, supplemented by flexible capacity for swings in production, works well here. Agency employment helps cover ramp-ups and peaks; where there is a shortage, recruiting from abroad widens the pool.',
            'Reliability and a willingness to work on a line matter as much as any prior experience.',
          ],
        },
        {
          heading: 'Training for the line and for quality',
          body: [
            'Alongside initial health-and-safety training, induction concentrates on working to the line takt, on quality standards and on the specific operations. A prepared and repeatable onboarding matters most during a production ramp-up or when several people start at once.',
          ],
        },
        {
          heading: 'Planning shifts and ramp-ups',
          body: [
            'Capacity planning has to reconcile line takt, shifts and production ramp-ups. Cross-trained cover, a margin for gaps and securing flexible capacity in good time all help. Where recruitment from abroad is involved, allow for the time permits take.',
            'Current labour-market data is published by the Czech Statistical Office, the Ministry of Labour and Social Affairs and the Czech Labour Office. No figures are stated here.',
          ],
        },
        {
          heading: 'Continuous operation and how working time is distributed',
          body: [
            'Automotive typically runs multi-shift or continuously. The Czech Labour Code distinguishes even from uneven distribution of working time and sets the framework for shift and continuous operations, into which a line’s roster has to fit.',
            'A working-time account is, under the Czech Labour Code, a particular method of distributing working time that may be introduced only by a collective agreement or an internal regulation. It suits operations with fluctuating output — new model ramp-ups, swings in call-offs — because it allows hours worked to be balanced across a reference period.',
            'Night work and the night shift have their own treatment in the Czech Labour Code.',
          ],
        },
      ],
      cta: {
        label: 'Production ramp-up hiring',
        targetConceptId: 'production-ramp-up',
        note: 'Staffing a new line or an additional shift, planned backwards from the start date.',
      },
    },
  },
}
