import type { LocaleCorpus } from '../types'

/**
 * L1 trust cluster — English.
 *
 * The editorial-standards page is the most sensitive translation in L1, because
 * its subject IS the set of claims the site refuses to make. Every prohibition
 * in the Czech is carried across verbatim in meaning: no invented figures, no
 * ratings or reviews, no "verified by the ministry", no guaranteed workers or
 * immediate starts, and identifiers published as fact only after verification.
 * Softening any one of them here would contradict the page's own subject.
 *
 * The Czech sources of all three pages are list-shaped in the places that
 * matter — the areas the employer cluster covers, the glossary entries
 * themselves, the sources drawn on, the boundaries held to — and those lists
 * are restored here as `list`, not folded back into prose.
 *
 * Where the Czech page keeps a promise through apparatus this template does not
 * render — a "Související" link block, a `sources` array, a lastUpdated date —
 * the promise is scoped to what this page actually delivers rather than carried
 * across unhonoured.
 */
export const EN_TRUST: LocaleCorpus = {
  'employer-faq': {
    en: {
      title: 'Employer FAQ: recruitment, team stability and cost',
      description:
        'Employer questions on recruitment, turnover and retention, onboarding, sector labour shortages and the cost of an employee. General answers that point to official sources.',
      h1: 'Employer FAQ: recruitment, team stability and cost',
      intro:
        'This page collects the questions employers ask about staffing operations — recruitment, team stability, onboarding, sector labour shortages and cost — and serves as the entry point to the whole cluster. The areas it covers are set out below. The answers are general and practical, and where a figure moves — contribution rates, labour-market statistics — they point to official sources instead of inventing numbers. We promise no miracle results and no specific savings; the aim is to help with staffing decisions. This is not legal advice.',
      breadcrumb: 'Employer FAQ',
      sections: [
        {
          heading: 'How to use this page',
          body: [
            'Below are the areas the cluster covers, and then answers to the questions that recur across it.',
            'For specific values — contribution rates, labour-market figures — verify them with the relevant institution, because they change.',
          ],
        },
        {
          heading: 'The areas the cluster covers',
          body: [
            'The cluster is arranged by area, and where an area splits into sub-topics they are named here too.',
          ],
          list: {
            items: [
              'Recruitment: the overview, organising the hiring process, finding candidates, and recruitment planning',
              'Stability: turnover, its causes, reducing it, and retention',
              'Onboarding and adaptation',
              'Labour shortages by sector: manufacturing, logistics, warehousing, construction',
              'The cost of an employee',
            ],
          },
        },
        {
          heading: 'How do we choose between direct hire and an agency?',
          body: [
            'By urgency, by the nature of the need — standing or temporary — and by your own capacity. Peaks and temporary gaps usually suit an agency; key permanent roles usually suit direct hire.',
          ],
        },
        {
          heading: 'How do we reduce turnover?',
          body: [
            'Start by measuring it and establishing the causes, then apply targeted measures and work on retention. Turnover itself, its causes, the measures that reduce it and retention are separate topics.',
          ],
        },
        {
          heading: 'How do we handle a labour shortage in our sector?',
          body: [
            'By combining a permanent core, flexible or agency capacity, and — for shortage occupations — recruitment from abroad. The sectors this cluster covers are manufacturing, logistics, warehousing and construction.',
          ],
        },
        {
          heading: 'What does an employee actually cost?',
          body: [
            'More than the gross wage: employer contributions and indirect costs come on top. It cannot be stated as a single number. The Czech cost pages show how to build an estimate from verified rates published by the social security administration, the health insurers and the tax administration.',
          ],
        },
        {
          heading: 'Why does onboarding matter so much?',
          body: [
            'The first days and weeks decide whether a new person stays. A well-run onboarding speeds up settling in and reduces early departures. Onboarding and the longer adaptation that follows it are treated as separate topics.',
          ],
        },
        {
          heading: 'Do you promise specific results or savings?',
          body: [
            'No. We state no invented savings figures and give no guarantees. We offer practical frameworks, and for data we point to official sources.',
          ],
        },
      ],
      cta: {
        label: 'For employers',
        targetConceptId: 'for-employers',
        note: 'The employer guide connects these topics in the order the decisions arise.',
      },
    },
  },

  'employer-glossary': {
    en: {
      title: 'Glossary for employers',
      description:
        'Plain explanations of the terms employers meet in staffing — agency employment, sourcing, turnover, retention, onboarding, adaptation and cost. Simplified for orientation, not binding.',
      h1: 'Glossary for employers',
      intro:
        'Staffing uses a number of terms that are easily confused or understood inconsistently. This glossary explains the key ones from recruitment, team stability, onboarding and cost, briefly and plainly, so that an employer can use them unambiguously. Where a term also has a legal dimension, the entry says so and leaves the binding detail to the regulation itself. The definitions are simplified for orientation and do not replace the binding wording of any regulation or an individual assessment; specific conditions can change and are worth verifying with the relevant authority.',
      breadcrumb: 'Glossary',
      sections: [
        {
          heading: 'Recruitment and capacity',
          body: [
            'These terms concern the recruiting of workers and the planning of capacity.',
            'The choice an employer makes here is chiefly between employing the person directly and using an agency. In agency employment the worker stays an employee of the agency and does the work at the user company to which they are temporarily assigned, and the agency must hold a valid employment-mediation permit.',
          ],
          list: {
            items: [
              'Hiring on your own, without an agency — the company finds and employs the worker itself.',
              'Agency employment — the worker is an employee of the agency and is temporarily assigned to a user company.',
              'Temporary assignment — the assignment of an agency worker to a user company for an agreed period.',
              'Recruitment planning — anticipating the need for people and its timing.',
              'Sourcing — searching for and approaching candidates through a range of channels.',
            ],
          },
        },
        {
          heading: 'Team stability and starting',
          body: [
            'These terms concern keeping people and bringing them into the company.',
            'The pair most often confused is turnover and retention, which the entries below separate. Reducing turnover and retention complement each other.',
          ],
          list: {
            items: [
              'Turnover — the rate at which employees leave and are replaced.',
              'Retention — the systematic keeping of employees.',
              'Onboarding — the process of joining and the first days of a new employee.',
              'Adaptation — the longer settling-in over the first weeks and months.',
            ],
          },
        },
        {
          heading: 'Cost',
          body: [
            'These terms concern the price of labour. No amounts are stated here.',
          ],
          list: {
            items: [
              'The true cost of an employee — the total cost above the gross wage.',
              'Indirect costs — items outside wage and contributions: recruitment, onboarding, turnover.',
              'Opportunity cost — the loss from a position that is unfilled or not performing.',
              'Statutory employer contributions — the insurance paid by the employer; for the rates, see the official sources.',
            ],
          },
        },
        {
          heading: 'Is this glossary binding?',
          body: [
            'No. The definitions are simplified for orientation and do not replace the binding wording of regulations. Verify specific conditions with the relevant authority.',
          ],
        },
      ],
      cta: {
        label: 'Employer FAQ',
        targetConceptId: 'employer-faq',
        note: 'The questions these terms usually come up in.',
      },
    },
  },

  'editorial-policy': {
    en: {
      title: 'Editorial standards and sources',
      description:
        'How content on TalentPartnerID is written and verified, which official sources it draws on, and what this site categorically does not claim.',
      h1: 'Editorial standards and sources',
      intro:
        'How we create and verify content on TalentPartnerID, which official sources we draw on, and what we categorically do not claim.',
      breadcrumb: 'Editorial standards',
      sections: [
        {
          heading: 'Who writes the content',
          body: [
            'Informational content on this site is written by the TalentPartnerID editorial team. The site is operated by TNT agency s.r.o. Authorship is stated at the level of the editorial team rather than invented names — we attribute no content to fictitious authors and claim no false professional titles or qualifications. This is general information, not individual legal advice.',
          ],
        },
        {
          heading: 'Which sources we draw on',
          body: [
            'Content is built on official, publicly verifiable sources. Specific figures, rates and time limits are linked directly to those sources, because they change over time.',
            'On the Czech pages, each content page lists the sources it used under "Zdroje" and a short note on method under "Metodika", and for online institutional sources it states the date on which they were checked. These English pages name their sources in the running text instead, as this one does below.',
          ],
          list: {
            items: [
              'Legislation from the Collection of Laws of the Czech Republic — in particular the Labour Code, the Employment Act, the Act on the residence of foreign nationals, and the regulations on insurance contributions and occupational safety',
              'The Czech Statistical Office, for statistical data',
              'The Ministry of Labour and Social Affairs and the Czech Labour Office, for employment matters and the employment of foreign nationals',
              'The Czech Social Security Administration and the health insurers, for contributions',
              'The Czech Ministry of the Interior, Department for Asylum and Migration Policy, for residence matters',
            ],
          },
        },
        {
          heading: 'What we categorically do not claim',
          body: [
            'To keep the content honest and verifiable, we hold to clear boundaries.',
          ],
          list: {
            items: [
              'We state no invented data when current figures are unavailable — instead of estimating, we point to the official source.',
              'We state no invented statistics, numbers of workers or employers, wages, success rates, savings or response times.',
              'We publish no ratings, reviews or stars — there is no "customer rating" here — and no invented references or case studies.',
              'We do not use formulations such as "verified by the Ministry of Labour and Social Affairs", "state-licensed" or "state-approved". A claim like that would have to correspond exactly to an official record.',
              'We do not promise "guaranteed" workers or an "immediate start". Recruitment and its timing depend on circumstances and on the applicable regulations.',
              'Identification and permit details of the operator are published as fact only after verification against the official register. Until then they are marked as "verification in progress".',
            ],
          },
        },
        {
          heading: 'How to check the operator',
          body: [
            'Details of the operator, of which data has been verified, and of how to check any staffing agency in the Czech Republic independently are on the about-us page. Company registration can be checked in the ARES business register, and an employment-mediation permit in the register of employment agencies.',
          ],
        },
        {
          heading: 'Currency and updates',
          body: [
            'The Czech content pages state the date they were last updated. Because rates, time limits and statistics change, always verify specific values against the current wording of the regulations and the official sources named above. If you find an inaccuracy or an out-of-date figure, tell us and we will correct it.',
          ],
        },
        {
          heading: 'Corrections and feedback',
          body: [
            'Send suggestions for correction or updating to the contact address published on the contact page. How personal data is handled is described in our privacy policy.',
            'Edited by the TalentPartnerID editorial team on the basis of official sources. The content is general information, not individual legal advice.',
          ],
        },
      ],
      cta: {
        label: 'About us and agency verification',
        targetConceptId: 'about-us',
        note: 'Who operates the site and how to verify the details independently.',
      },
    },
  },
}
