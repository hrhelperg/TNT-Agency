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
 */
export const EN_TRUST: LocaleCorpus = {
  'employer-faq': {
    en: {
      title: 'Employer FAQ: recruitment, team stability and cost',
      description:
        'Common employer questions on recruitment, turnover and retention, onboarding, sector labour shortages and the cost of an employee — with pointers to the detailed pages and official sources.',
      h1: 'Employer FAQ: recruitment, team stability and cost',
      intro:
        'This page collects the questions employers ask about staffing operations — recruitment, team stability, onboarding, sector labour shortages and cost — and serves as the entry point to the whole cluster. Each topic links to a detailed page. The answers are general and practical, and where a figure moves — contribution rates, labour-market statistics — they point to official sources instead of inventing numbers. We promise no miracle results and no specific savings; the aim is to help with staffing decisions. This is not legal advice.',
      breadcrumb: 'Employer FAQ',
      sections: [
        {
          heading: 'How to use this page',
          body: [
            'Below are answers to questions that recur across the cluster. Each area has its own detailed page.',
            'For specific values — contribution rates, labour-market figures — verify them with the relevant institution, because they change.',
          ],
        },
        {
          heading: 'How do we choose between direct recruitment and an agency?',
          body: [
            'By urgency, by the nature of the need — standing or temporary — and by your own capacity. Peaks and temporary gaps usually suit an agency; key permanent roles usually suit direct recruitment.',
          ],
        },
        {
          heading: 'How do we reduce turnover?',
          body: [
            'Start by measuring it and establishing the causes, then apply targeted measures and work on retention. Turnover, its causes and retention each have their own page.',
          ],
        },
        {
          heading: 'How do we handle a labour shortage in our sector?',
          body: [
            'By combining a permanent core, flexible or agency capacity, and — for shortage occupations — recruitment from abroad. Manufacturing, logistics, warehousing and construction are covered separately.',
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
            'The first days and weeks decide whether a new person stays. A well-run onboarding shortens the time to competence and reduces early departures.',
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
        'Short, plain explanations of the staffing terms employers use: recruitment and capacity, turnover, retention, onboarding, agency employment and indirect costs. Simplified for orientation, not binding.',
      h1: 'Glossary for employers',
      intro:
        'Staffing uses a number of terms that are easily confused or understood inconsistently. This glossary explains the key ones from recruitment, team stability, onboarding and cost, briefly and plainly, so that an employer can use them unambiguously. Where a term also has a legal dimension it points to the detailed page and to official sources. The definitions are simplified for orientation and do not replace the binding wording of any regulation or an individual assessment; specific conditions can change and are worth verifying with the relevant authority or on the detailed page.',
      breadcrumb: 'Glossary',
      sections: [
        {
          heading: 'Recruitment and capacity',
          body: [
            'Recruitment covers the routes by which an employer fills roles — hiring directly, using an agency, or recruiting from abroad — together with the organisation of the selection process.',
            'Recruitment planning derives the staffing need from the business outlook: how many people, in which roles, by when, allowing for seasonality and turnover.',
            'Direct hire means the company employs the person itself. In agency employment the worker remains employed by the agency and is temporarily assigned to a user company. Under Czech law the agency must hold a valid employment-mediation permit, and comparable pay and working conditions apply.',
            'Volume hiring, ramp-up hiring, seasonal capacity and absence cover are distinct operational situations rather than synonyms for recruitment; each is covered on its own page.',
          ],
        },
        {
          heading: 'Team stability and starting',
          body: [
            'Turnover describes how often people leave a company and are replaced. A distinction is drawn between departures at the employee’s initiative and at the employer’s.',
            'Retention is the systematic keeping of people — not merely preventing departures but creating reasons to stay. Reducing turnover and retention complement each other: one reacts, the other anticipates.',
            'Onboarding is the process of bringing a new employee into the company, joining the administrative part with the practical one. Adaptation is the longer period that follows, during which the person reaches full competence.',
          ],
        },
        {
          heading: 'Cost',
          body: [
            'The cost of an employee is more than the gross wage: statutory employer contributions and further items come on top. The Czech cost pages show how to assemble an estimate from current official rates; no amount is stated here.',
            'Indirect costs are the items that do not appear on a payslip — equipment, training, the workplace, the supervision of a new starter.',
            'The cost of a vacancy is the other side of the same decision: what an unfilled seat costs in lost output, cover, indirect effects and the recruitment itself.',
          ],
        },
        {
          heading: 'Is this glossary binding?',
          body: [
            'No. The definitions are simplified for orientation and do not replace the binding wording of regulations. Verify specific conditions with the relevant authority or on the detailed page.',
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
            'Legislation from the Collection of Laws of the Czech Republic — in particular the Labour Code, the Employment Act, the Act on the residence of foreign nationals, and the regulations on insurance contributions and occupational safety.',
            'The Czech Statistical Office for statistical data. The Ministry of Labour and Social Affairs and the Czech Labour Office for employment matters and the employment of foreign nationals. The Czech Social Security Administration and the health insurers for contributions. The Czech Ministry of the Interior, Department for Asylum and Migration Policy, for residence matters.',
            'Every content page lists the sources it used under "Sources" and a short note on method under "Methodology". For online institutional sources we state the date on which they were checked.',
          ],
        },
        {
          heading: 'What we categorically do not claim',
          body: [
            'To keep the content honest and verifiable, we hold to clear boundaries.',
            'We state no invented data when current figures are unavailable — instead of estimating, we point to the official source.',
            'We state no invented statistics, numbers of workers or employers, wages, success rates, savings or response times.',
            'We publish no ratings, reviews or stars — there is no "customer rating" here — and no invented references or case studies.',
            'We do not use formulations such as "verified by the Ministry of Labour and Social Affairs", "state-licensed" or "state-approved". A claim like that would have to correspond exactly to an official record.',
            'We do not promise "guaranteed" workers or an "immediate start". Recruitment and its timing depend on circumstances and on the applicable regulations.',
            'Identification and permit details of the operator are published as fact only after verification against the official register. Until then they are marked as verification in progress.',
            'Details of the operator, of which data has been verified, and of how to check any employment agency in the Czech Republic independently are on the about-us page. Company registration can be checked in the ARES business register, and an employment-mediation permit in the register of employment agencies.',
          ],
        },
        {
          heading: 'Currency and updates',
          body: [
            'Every content page states the date it was last updated. Because rates, time limits and statistics change, always verify specific values against the current wording of the regulations and the official sources listed. If you find an inaccuracy or an out-of-date figure, tell us and we will correct it.',
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
