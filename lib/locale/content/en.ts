import type { LocaleCorpus } from './types'

/**
 * English L0 content.
 *
 * Translated from the Czech source, meaning first. Three rules governed every
 * passage, and they are why some sentences read more cautiously than marketing
 * copy usually does:
 *
 *   1. FACTUAL STRENGTH IS PRESERVED EXACTLY. Where the Czech hedges — "obvykle",
 *      "zpravidla", "bývá" — the English hedges. "Can help" was never promoted
 *      to "will deliver".
 *   2. NO FACT IS INTRODUCED THAT THE CZECH DOES NOT STATE. The Czech mentions
 *      recruitment from abroad without naming countries, so neither does this.
 *   3. THE REFUSALS ARE PART OF THE CONTENT. Several Czech pages explicitly
 *      decline to publish salary levels, time-to-hire or "usual" benchmarks and
 *      point to official sources instead. Those passages are translated, not
 *      quietly dropped, because they are the reason the pages are trustworthy.
 *
 * The homepage strings are taken from the existing approved EN dictionary in
 * public/script.js rather than retranslated — they are already reviewed copy,
 * and inventing a second English voice for the same page would be worse.
 */
export const EN_CONTENT: LocaleCorpus = {
  home: {
    en: {
      title: 'TalentPartnerID | Staffing and recruitment in the Czech Republic',
      description:
        'TalentPartnerID helps employers find the right people for operational roles in manufacturing, warehousing and logistics, and for the specialist and technical positions alongside them.',
      h1: 'We connect the right people with the right companies',
      intro:
        'TalentPartnerID helps employers find the right people — for operational roles in manufacturing, warehousing and logistics, and for the specialist and technical positions alongside them.',
      breadcrumb: 'Home',
      sections: [
        {
          heading: 'What we do',
          body: [
            'We work with employers who need to fill operational roles in manufacturing, warehouses and logistics, and the technical and specialist positions that sit alongside those operations.',
            'Two models are available: permanent recruitment, where you employ the person directly, and agency employment, where the worker remains our employee and is temporarily assigned to you.',
          ],
        },
        {
          heading: 'How we work with figures',
          body: [
            'Where a page would need a rate, a statistic or a market figure, it points to the official source rather than printing a number of its own. Contribution rates, minimum wage and labour-market data change, and a copied figure is wrong the moment it does.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'Describe the role and we will come back to you.',
      },
    },
  },

  'for-employers': {
    en: {
      title: 'For employers: recruitment, team stability and cost',
      description:
        'A guide for employers: planning recruitment, reducing turnover and retention, onboarding, labour shortages by sector, and what an employee actually costs. With sources.',
      h1: 'For employers: recruitment, team stability and cost',
      intro:
        'This page is a starting point for employers dealing with practical staffing questions — from filling roles to keeping teams stable to what an employee costs. It links the topics together so you can quickly reach the page that answers the decision in front of you. The content is practical, and for figures that move, such as contribution rates and labour-market statistics, it points to official sources instead of inventing numbers.',
      breadcrumb: 'For employers',
      sections: [
        {
          heading: 'Recruitment and how to plan it',
          body: [
            'If you are filling roles, start with which route to recruit through and how to organise the process. Separate pages cover the recruitment overview, running a selection process, finding candidates, planning recruitment, and recruiting workers from abroad.',
          ],
        },
        {
          heading: 'Team stability, onboarding and sectors',
          body: [
            'Keeping people and starting them well affects both cost and output. This area covers turnover, its causes and how to reduce it, retention, onboarding and adaptation, and labour shortages in specific sectors — manufacturing, logistics, warehousing and construction.',
          ],
        },
        {
          heading: 'Specialist and technical positions',
          body: [
            'Filling qualified trades follows a different logic from hiring operational staff. For technical and specialist roles what usually decides the outcome is not the number of applicants but how many people genuinely hold the qualification, whether their certification matches the work they would be doing, and whether that certification is still valid.',
          ],
        },
        {
          heading: 'Inputs for a hiring decision',
          body: [
            'A decision to fill a role is easier when both sides of the equation are quantified. The cost of an employee describes what a filled seat costs; the cost of a vacancy describes what an empty one costs. Without the second number, standing still looks free and recruitment looks like pure expenditure.',
            'The second input is the role brief itself. Many long-open roles are not stuck on the market but on a profile that does not separate the essential from the desirable — and which therefore cannot be searched against or used to compare candidates.',
          ],
        },
        {
          heading: 'Cost and further sources',
          body: [
            'For budgeting there are pages on the real and indirect cost of an employee and on estimating the cost of a single role. For specific contribution and tax rates, always work from the current official sources cited on the relevant page.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'We can help from defining the need through to the start date, and coordinate the paperwork in line with the applicable rules.',
      },
    },
  },

  'cost-of-vacancy': {
    en: {
      title: 'The cost of a vacancy: working out what an empty seat costs you',
      description:
        'The cost of a vacancy — how to build your own estimate from lost output, overtime, quality effects and recruitment cost. A method, without invented numbers.',
      h1: 'The cost of a vacancy: working out what an empty seat costs you',
      intro:
        'When a role will not fill, the first impression is usually that the company is saving a salary. In practice the cost has only moved — into overtime, into slower output, into quality, and onto the people covering the work on top of their own. Until someone quantifies it, an empty seat looks cheaper than filling it, and the hiring decision keeps being deferred. This page offers a method for building your own number. It does not supply a figure.',
      breadcrumb: 'Cost of a vacancy',
      sections: [
        {
          heading: 'The four components',
          body: [
            'An estimate is worth having when it stays with what you can evidence. In practice the cost of a vacancy has four parts, and each is calculated differently.',
            'Lost or deferred output is the first and usually the largest. The second is the cost of covering — overtime, premiums, agency cover, or moving people from other areas. The third is indirect effects that show up later: errors, scrap, slipped deadlines. The fourth is the cost of recruiting itself.',
          ],
        },
        {
          heading: 'Quantifying lost output',
          body: [
            'The simplest usable approach starts from what the role produces per unit of time. For a production position that is usually a share of output volume; for a commercial role the value of orders handled; for a technical role, deferred projects.',
            'The key is to distinguish output that genuinely disappears from output that is merely postponed. An order the company catches up on later is not the same as a shift that was never worked. That distinction matters more to the credibility of the estimate than accuracy to the last crown — an inflated estimate loses trust at the first review.',
          ],
        },
        {
          heading: 'Cover costs are the easiest to evidence',
          body: [
            'This part is the best documented of the whole estimate, because it has already been booked. You need the overtime hours, premiums or agency hours attributable to covering the empty seat.',
            'Legal framing: premiums for overtime, night, weekend and public-holiday work are set by the Labour Code, and both the rates and the limits on overtime follow the current legislation. What belongs in your estimate is the amount actually paid from your payroll system, not a general rate.',
          ],
        },
        {
          heading: 'Indirect effects: count carefully, but do not omit them',
          body: [
            'Indirect effects are the hardest to measure and often the most expensive. An overloaded team makes more mistakes, scrap rises, deadlines slip, and in the worst case the people who were covering the gap start leaving too.',
            'The recommended approach is not to chase precision but to work with a range: what is the smallest plausible effect at the current state, and what is the largest. A range is more honest than a single number and is usually enough to decide with, because it shows the order of magnitude.',
          ],
        },
        {
          heading: 'What to avoid',
          body: [
            'The most common mistake is to borrow a general multiple of annual salary. Such figures circulate, but they do not relate to your operation and will not survive the first conversation with finance.',
            'The second is double counting — for example claiming the full loss of output and the overtime cost that covered that same output. Either the work was not done, or it was done more expensively; not both at once.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'You can model the cost of a role in the calculator. If you have a specific vacancy, describe it and we will come back to you.',
      },
    },
  },

  'request-staff': {
    en: {
      title: 'Request staff | TalentPartnerID',
      description:
        'Tell us what you need to fill: the role, the site, the shift pattern and the qualifications required. We will come back to you to discuss what filling it would involve.',
      h1: 'Request staff',
      intro:
        'Describe the role you need to fill and we will come back to you. The more specific the brief — the work itself, the equipment, the shift pattern, the certification required — the narrower and more useful the group of people we can approach.',
      breadcrumb: 'Request staff',
      sections: [
        {
          heading: 'What helps us most',
          body: [
            'A description of the work to be done, rather than a list of wishes. The most common reason a search stalls is a brief that mixes two different roles together, or asks for a combination that few people hold.',
            'Where a role requires proof of professional competence, tell us which one: certification has a validity period and a limited scope, so it needs to be read before a start date rather than simply filed.',
          ],
        },
        {
          heading: 'What happens next',
          body: [
            'We go through the brief with you and fill in what is missing, then map where that competence occurs in the region and approach people directly. We pass candidates to you with a note on what has been verified and what needs technical assessment on your side.',
          ],
        },
      ],
      cta: {
        label: 'For employers',
        targetConceptId: 'for-employers',
        note: 'Not ready to send a brief? The employer guide covers the decisions that usually come first.',
      },
    },
  },

  'about-us': {
    en: {
      title: 'About us and agency verification | TalentPartnerID',
      description:
        'Who operates TalentPartnerID, how the agency can be verified in public registers, and what the site does and does not claim.',
      h1: 'About us and agency verification',
      intro:
        'TalentPartnerID is operated by TNT agency s.r.o., based in Pardubice. This page sets out who is behind the site and how the details can be checked in public registers, so nothing here has to be taken on trust.',
      breadcrumb: 'About us',
      sections: [
        {
          heading: 'How to verify us',
          body: [
            'Company details can be checked in the public register of companies and in the ARES business register. Employment agencies operating in the Czech Republic must hold a valid permit under the Employment Act, and the register of permit holders is maintained by the Ministry of Labour and Social Affairs.',
            'We publish the identifiers needed for those checks rather than asking you to rely on a claim made on our own website.',
          ],
        },
        {
          heading: 'What this site does not do',
          body: [
            'We do not publish salary levels or time-to-hire figures. Salary ranges for a specific occupation and region belong to the official average-earnings information system; labour-market data is published by the Ministry of Labour and Social Affairs, the Labour Office and the Czech Statistical Office.',
          ],
        },
      ],
      cta: {
        label: 'Contact us',
        targetConceptId: 'contact',
      },
    },
  },

  contact: {
    en: {
      title: 'Contact TalentPartnerID',
      description:
        'Get in touch with TalentPartnerID about filling a role, or about working with us. Contact details and what to include in your message.',
      h1: 'Get in touch',
      intro:
        'Tell us what you need and we will come back to you. If you are an employer with a role to fill, the request form collects the details that make the first conversation useful.',
      breadcrumb: 'Contact',
      sections: [
        {
          heading: 'What to include',
          body: [
            'For a staffing enquiry: the role, the site, the shift pattern, and any certification the work requires. For anything else, a short description of what you are looking for is enough to start.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
      },
    },
  },

  'specialist-recruitment': {
    en: {
      title: 'Specialist and technical recruitment: how it differs from operational hiring',
      description:
        'Specialist and technical recruitment: how it differs from volume hiring, which occupational families it covers, what to specify in the brief, and how the search runs.',
      h1: 'Specialist and technical recruitment: how it differs from operational hiring',
      intro:
        'Filling twenty places on a line and filling one setter or quality technician position are two different disciplines, even though both are called recruitment. For operational roles you work with a wide pool and the outcome is decided by how the selection is organised; for specialist positions the group of people who can do the work — and who are also permitted to do it — is far narrower, and some of them are bound by proof of professional competence.',
      breadcrumb: 'Specialist recruitment',
      sections: [
        {
          heading: 'How specialist recruitment differs structurally',
          body: [
            'The first difference is numerical. For assistant and operator roles the barrier to entry is low and the pool is wide. For a qualified trade the pool is defined by training, experience on a specific technology, or a valid certificate — and it narrows further from there.',
            'The second is candidate behaviour. People with a sought-after qualification usually have work and are not actively looking, so they respond little to advertising and often have no CV prepared. Approaches are therefore direct, and the first reaction tends to be reserved.',
          ],
        },
        {
          heading: 'Occupational families we cover',
          body: [
            'Our scope starts from manufacturing, warehousing and logistics and continues into the technical and specialist roles attached to those operations. Each family has its own page, because what actually blocks a hire differs: sometimes it is a certificate, sometimes the shift pattern.',
          ],
        },
        {
          heading: 'Certification: what actually blocks a start date',
          body: [
            'For many technical activities it is not only skill that decides but authorisation to perform the activity. Professional competence for work on electrical equipment is governed by the government regulation on electrotechnical competence, which replaced the decree previously relied on.',
            'The practical consequence for recruitment is that certificates have a validity period and a limited scope, so they need to be read before a start date, not merely recorded.',
          ],
        },
        {
          heading: 'What you will not find on these pages',
          body: [
            'We do not publish salary levels or time-to-hire. Salary ranges for a specific occupation and region belong to the official average-earnings information system; labour-market data is published by the Ministry of Labour and Social Affairs, the Labour Office and the Czech Statistical Office; occupational requirement profiles are maintained in the national occupational register.',
            'The scope of these pages is also bounded. This area covers technical and specialist roles attached to manufacturing, warehousing and logistics operations, including first-line management. Executive search, psychometric assessment and taking over an entire recruitment function are not part of it.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'Describe the role, the qualification required and the site. We will come back to you to discuss what filling it would involve.',
      },
    },
  },

  'how-agency-works': {
    en: {
      title: 'How a staffing agency works: models and rules',
      description:
        'How a staffing agency works in the Czech Republic — permanent recruitment versus temporary assignment, the permit to provide employment services, and the three-way relationship between agency, worker and company.',
      h1: 'How a staffing agency works: models and rules',
      intro:
        'A staffing agency connects companies looking for workers with people looking for work. In practice it offers two main models: finding a candidate for direct employment with the company (permanent recruitment), and agency employment, where the worker is employed by the agency and temporarily assigned to a user company. This page explains how both work and what rules apply.',
      breadcrumb: 'How a staffing agency works',
      sections: [
        {
          heading: 'The two models',
          body: [
            'In permanent recruitment the agency finds and pre-selects candidates, and the company enters into the employment relationship with the chosen person itself. In agency employment the agency remains the employer and assigns the worker temporarily to the user company.',
          ],
        },
        {
          heading: 'Rules and permits',
          body: [
            'To provide employment services an agency must hold a valid permit under the Employment Act. In agency employment there is a requirement of comparable pay and working conditions with the user company’s own employees.',
          ],
        },
        {
          heading: 'The three-way relationship',
          body: [
            'Agency employment creates a relationship between three parties: the agency as formal employer, the worker, and the user company where the work is performed. Each party has rights and obligations, which are best set out clearly in the contractual documentation.',
          ],
        },
      ],
      cta: {
        label: 'For employers',
        targetConceptId: 'for-employers',
      },
    },
  },

  'employee-turnover': {
    en: {
      title: 'Employee turnover: what it is and how to track it',
      description:
        'Employee turnover — what it is, how to measure it in your own company, and why it affects cost and output. A practical view for employers, without invented benchmarks.',
      h1: 'Employee turnover: what it is and how to track it',
      intro:
        'Employee turnover expresses how often people leave a company and are replaced. It matters to employers because departures carry the cost of recruiting, training and a temporary drop in output. This page explains what turnover is, how to measure it simply in your own company, and how to interpret it — without invented benchmarks.',
      breadcrumb: 'Employee turnover',
      sections: [
        {
          heading: 'What turnover covers',
          body: [
            'Turnover describes people moving out of the company and being replaced. A distinction is drawn between departures at the employee’s initiative and at the employer’s; for managing stability, voluntary turnover is usually the more interesting of the two, because working conditions can influence it.',
          ],
        },
        {
          heading: 'How to measure it',
          body: [
            'The basic indicator compares departures over a period against the average headcount. What is worth watching is the trend over time and the differences between teams or roles, rather than comparison with someone else’s numbers. This page deliberately does not state a "usual" level.',
          ],
        },
        {
          heading: 'What decision follows',
          body: [
            'Once you measure turnover you can see where it is highest and whether it is rising. That is the input for targeted action — in recruitment, in onboarding, or in working conditions. Without measurement the problem is hard to manage.',
          ],
        },
      ],
      cta: {
        label: 'For employers',
        targetConceptId: 'for-employers',
      },
    },
  },

  'production-workers': {
    en: {
      title: 'Production workers: recruitment and staffing',
      description:
        'Production workers — how to staff a manufacturing operation: roles, recruitment routes, training and capacity planning for production continuity. A practical overview without invented numbers.',
      h1: 'Production workers: recruitment and staffing',
      intro:
        'Staffing a manufacturing operation combines filling specific roles with the need to keep production running through swings in orders and through turnover. Manufacturers usually combine operator, assembly and support roles across shifts, and each places different demands on recruitment and training. This page is an overview of how to approach it.',
      breadcrumb: 'Production workers',
      sections: [
        {
          heading: 'What is specific to manufacturing',
          body: [
            'Production commonly runs in shifts and depends on continuity — a gap in people feeds straight through to order fulfilment. Roles range from machine operation through manual assembly to support and materials handling, which means different qualification requirements.',
          ],
        },
        {
          heading: 'Recruitment considerations',
          body: [
            'For production roles a combination of routes tends to work: direct recruitment for the permanent core, agency employment for flexible cover of peaks, and for shortage occupations, recruitment from abroad. The choice depends on urgency and on whether the need is standing or temporary.',
          ],
        },
        {
          heading: 'Training and starting',
          body: [
            'Starting in production involves health-and-safety induction, familiarisation with the workplace and machines, and progressive training. For machine and assembly roles the time to full productivity is longer, so it pays to prepare the training well and to nominate someone to support the new starter.',
          ],
        },
        {
          heading: 'Capacity planning',
          body: [
            'Staffing capacity planning follows from the production plan and its seasonality. It helps to separate the standing requirement from peaks and assign a different route to each — a permanent core and flexible capacity. Where recruitment from abroad is involved, the administrative lead time has to be allowed for.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'Describe the roles and the shift pattern and we will come back to you.',
      },
    },
  },
}
