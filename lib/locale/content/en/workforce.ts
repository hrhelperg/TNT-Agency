import type { LocaleCorpus } from '../types'

/**
 * L1 workforce cluster — English.
 *
 * The most legally dense cluster in L1. Every statutory reference comes from
 * the Czech source and is marked as Czech law; none is added, and none is
 * generalised into "European" or "standard practice".
 *
 * Several sources refuse things explicitly — a fee figure, a start date, a
 * database size, a promise that a hire will stay, and, on the agency-selection
 * page, our own verified status. Those refusals are carried across intact. The
 * selection checklist in particular is written to be usable against us, and a
 * translation that softened it would defeat its purpose.
 */
export const EN_WORKFORCE: LocaleCorpus = {
  'volume-hiring': {
    en: {
      title: 'Volume hiring: what changes at 20, 50 and 100 people',
      description:
        'What changes as a hire grows: interview capacity, then training capacity, then the facilities that have to carry the new people. A planning aid, with no figures and no lead times.',
      h1: 'Volume hiring: what changes at 20, 50 and 100 people',
      intro:
        'Hiring twenty people and hiring a hundred are not the same task at a different scale. As the volume grows, what breaks is not the number of candidates approached: first interview capacity, then training capacity, and finally the facilities that have to carry the new people at all. What follows is a planning aid — what changes at each size, and what has to be in place before any approach begins. The numbers used are model situations for planning, not descriptions of work delivered; no specific figures or lead times are stated here.',
      breadcrumb: 'Volume hiring',
      sections: [
        {
          heading: 'What actually changes with volume',
          body: [
            'Up to around twenty people, hiring remains a matter of ordinary operations. The existing supervisor can run the interviews, training happens at the line, and new starters dissolve among experienced colleagues.',
            'At fifty, a capacity ceiling appears for the first time: someone has to run interviews full time, and training can no longer be left to normal operations. The ratio of experienced to new people on a shift changes too, which affects both output and quality.',
            'At a hundred, recruitment stops being the constraint and the facilities become one — changing rooms, catering, transport, accommodation, the number of entry medical assessments, the capacity of trainers. These have their own lead times, and adding recruiters does not shorten them.',
          ],
        },
        {
          heading: 'Capacity to secure before candidates',
          body: [
            'The most common mistake in volume hiring is to start approaching people before it is settled what happens to them once they start. A candidate who arrives and finds nobody has time for them leaves, and generally does not come back.',
          ],
          list: {
            intro: 'So it is worth going through the capacity list before anything begins.',
            items: [
              'Who runs interviews, and how many of them a day',
              'Who trains, and in what group sizes',
              'Booking lead times at the occupational health provider — how many people can be seen at once',
              'How quickly access cards and personal protective equipment can be issued, and whether that equipment is available in the sizes needed',
              'Changing rooms, catering and transport to the shift',
            ],
          },
        },
        {
          heading: 'Fitness for work is a real bottleneck',
          body: [
            'Assessing fitness for work is part of an employer’s duties under Czech law, and its scope follows the work category. The framework is set by Czech Act 373/2011 Sb. on specific health services and implementing decree 79/2013 Sb.',
            'The operational consequence is that at volume a formality becomes a bottleneck. The capacity of the occupational health provider is finite and does not grow because recruitment speeds up. Agree that capacity before approaches begin, and treat it in the schedule as a fixed point.',
          ],
        },
        {
          heading: 'Start in waves rather than on one date',
          body: [
            'Trying to have everyone start on the same day is the source of most of the trouble. Training gets diluted, experienced people cannot keep up, and the quality of the first run falls.',
            'Splitting starts into waves sized to training capacity is usually easier for an operation to absorb, even though it takes longer overall. Waves also let you learn from the first group before the second arrives — an advantage at volume that cannot be bought back later.',
          ],
        },
        {
          heading: 'Plan a margin, and expect some people to leave',
          body: [
            'With volume starts it is normal for some of those accepted not to start, or to leave in the first weeks. That is not a recruitment failure; it is a property of volume.',
            'So a plan is better built with a margin and a considered approach to topping up, rather than as a one-off exercise with a fixed number. How large a margin depends on the occupation, the location and the conditions. No general figure would hold for every operation, and none is stated here.',
          ],
        },
        {
          heading: 'Which routes combine at volume',
          body: [
            'At larger numbers the routes are combined in practice. The permanent core is usually filled by direct hire, because the training investment is worth making. A fluctuation or a ramp-up is covered by agency employment, where the agency carries the employer administration.',
            'For shortage occupations recruitment from abroad comes into play, but it has its own timing governed by permits, which cannot be shortened.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'Describe the roles, the site and the shift pattern and we will go through what filling them would involve.',
      },
    },
  },

  'production-ramp-up': {
    en: {
      title: 'Hiring for a production ramp-up: staffing a new line or shift',
      description:
        'Staffing a new line or an extra shift: which roles to fill in which order, what must exist before day one, and where ramp-ups stall — at training, not at recruitment.',
      h1: 'Hiring for a production ramp-up: staffing a new line or shift',
      intro:
        'A new line starting up, or an additional shift opening, differs from ordinary replacement hiring in one respect: it has a fixed date, derived from a customer or an investment, and that date usually cannot move. Staffing preparation therefore has to run backwards from it, rather than forwards from the moment someone notices people are missing. This page sets out the order in which roles are filled for a ramp-up, what has to exist before the start, and where ramp-ups most often stall — the weak point being training rather than recruitment itself.',
      breadcrumb: 'Production ramp-up',
      sections: [
        {
          heading: 'A ramp-up is planned backwards',
          body: [
            'Start at the go-live date and work back: who has to be in place on day zero, who a month before, who earlier still. Seen that way, it becomes clear that the first roles to fill are not the operators but the people who will train them.',
            'A supervisor or shift leader, a setter and a maintenance technician need to be there earlier, because they have to learn the technology themselves. If they start at the same time as the operators, there is nobody to lead them and the ramp-up slips regardless of how many operators were found.',
          ],
          list: {
            intro: 'The order in which the roles are filled:',
            ordered: true,
            items: [
              'Operational supervision and the key technical roles first',
              'Then the setters and maintenance, who get the equipment running',
              'Last the operator roles, in waves sized to training capacity',
            ],
          },
        },
        {
          heading: 'What has to exist before the first day',
          body: [
            'A number of things that happen in passing in an established operation are simply absent at a ramp-up and have to be created: work procedures, a training plan, risk assessment for the new workplaces, the scope of personal protective equipment, and the categorisation of the work, which determines the scope of occupational health assessments.',
            'Occupational safety duties under Czech law attach to the workplace and to the employer, not to whether the operation is new. For a new workplace they therefore have to be prepared before anyone starts on it.',
          ],
        },
        {
          heading: 'A new shift has different rules from a new line',
          body: [
            'Opening another shift on an existing line looks simpler but has its own difficulty. New people have to be trained by the existing team, which has to keep producing at the same time — so training capacity is taken out of normal output.',
            'Candidate availability changes too. A night or weekend shift narrows the group of people willing to start, which belongs in both the schedule and the conditions. The difference between shift patterns registers with candidates sooner than a difference in pay does.',
          ],
        },
        {
          heading: 'Where ramp-ups usually stall',
          body: [
            'In practice, ramp-ups are held up at a few recurring points, and the number of candidates is rarely one of them. They are worth going through while the schedule is still being drawn up rather than once people are already starting.',
          ],
          list: {
            items: [
              'Training planned optimistically, without allowing that the experienced person doing the training is not producing meanwhile',
              'A mismatch between the hiring date and candidates’ notice periods',
              'Transport and facilities for an unusual shift — changing-room capacity among them',
              'Missing procedures and documentation for the new workplace',
            ],
          },
        },
        {
          heading: 'Combining the routes',
          body: [
            'For a ramp-up it pays to separate the permanent core from the flexible part. The core — supervision, setters, maintenance — is worth filling by direct hire, because those are the people the most training is invested in.',
            'The operator part can be covered by a combination of direct hire and agency employment, which allows for the fact that the real requirement usually becomes clearer during the ramp-up itself. That split is better decided in advance than during.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'Tell us the go-live date and the roles, and we will work back from it with you.',
      },
    },
  },

  'seasonal-capacity': {
    en: {
      title: 'Seasonal capacity: covering a peak without permanent headcount',
      description:
        'Planning a recurring peak: how seasonal need differs from a shortage, which employment models suit it, and how to keep the seasonal people who worked out.',
      h1: 'Seasonal capacity: covering a peak without permanent headcount',
      intro:
        'A seasonal peak has one advantage over other staffing situations: it can be foreseen. The pre-Christmas period in a warehouse, an agricultural season or summer shutdowns recur, and a company usually knows when they are coming. Even so, seasonal hiring is often addressed once the peak has begun, which is the most expensive possible moment. This page describes how seasonal need differs from topping up permanent headcount, which employment models suit it, and how to keep the people who worked out for the next season.',
      breadcrumb: 'Seasonal capacity',
      sections: [
        {
          heading: 'Seasonal need is not the same as a labour shortage',
          body: [
            'The difference decides the remedy. A labour shortage means people are missing from permanently occupied posts. Seasonal need means posts come into existence for a limited period and then cease to exist.',
            'It follows that the answer is not to raise permanent headcount. A company that hires permanently for a peak spends the rest of the year overstaffed, which is a worse problem than the original one.',
          ],
        },
        {
          heading: 'Models that come into consideration',
          body: [
            'Several routes are used in practice, and they differ in who carries the employer’s responsibility and how flexibly capacity can be changed.',
            'Agency employment in the form of temporary assignment under Czech Act 435/2004 Sb. is the most usual for regularly recurring fluctuations, because the agency remains the formal employer and the scope can be adjusted to the actual need. Fixed-term employees of your own suit longer and more predictable seasons. Agreements on work performed outside an employment relationship have statutory limits under Czech law and do not suit full shift cover.',
            'For temporary assignment, pay and working conditions comparable with the user’s own core employees are required. That is not a contractual arrangement between the parties but a statutory condition.',
          ],
        },
        {
          heading: 'Plan from your own operation’s data',
          body: [
            'The best basis for a seasonal plan is your own records from previous years. A company already holds that data, and it is more reliable than any general estimate.',
            'Labour-market context can be added from the public sources of the Czech Statistical Office, the Ministry of Labour and Social Affairs and the Czech Labour Office. No figures are stated here, because they differ from region to region.',
          ],
          list: {
            intro: 'What is worth having on record from each season:',
            items: [
              'How many extra people were genuinely needed, and for how long',
              'At which workplaces the peak arises first',
              'How many people left the season early, and why they left',
              'Which seasonal workers came back more than once',
            ],
          },
        },
        {
          heading: 'Training is the main cost item',
          body: [
            'Seasonal hiring often underestimates that training costs the same regardless of how long the person then stays. Over a short season that cost is spread across a smaller volume of work.',
            'The practical consequence is that it pays to reduce initial training to what is strictly necessary and leave more complex work to permanent people. The second consequence is that a returning seasonal worker is worth markedly more than a new one — which is precisely why they are worth looking after.',
          ],
        },
        {
          heading: 'Keeping the seasonal people who worked out',
          body: [
            'Companies whose seasons go well usually have one thing in common: they stay in contact with people who have already worked for them, and approach them ahead of the next season.',
            'That means keeping a record of who worked out, getting in touch before they find other work, and having conditions ready that give a reason to return. It is considerably cheaper than starting with new people every year — and when handling applicants’ personal data, data-protection rules apply.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'If the peak is predictable, it is worth arranging capacity before it starts.',
      },
    },
  },

  'absence-cover': {
    en: {
      title: 'Absence in an operation: why people are missing from a shift',
      description:
        'Distinguishing planned from unplanned absence, seeing where it concentrates, and setting an operational margin so a gap does not put a shift at risk. No general percentage.',
      h1: 'Absence in an operation: why people are missing from a shift',
      intro:
        'Absence is a staffing problem that is hard to name, because unlike turnover it does not show in headcount. Nobody leaves — they are simply not on shift on a given day. The operation feels it immediately all the same, because the missing person has to be covered by overtime, by moving someone from another workplace, or by slowing the line. This page helps separate the kinds of absence, because each has a different cause and a different remedy, and shows how to set a margin so that a gap does not put shift cover at risk.',
      breadcrumb: 'Absence cover',
      sections: [
        {
          heading: 'First distinguish which kind of absence it is',
          body: [
            'One word covers situations with completely different logic. Planned absence — leave, training, a scheduled procedure — is foreseeable and belongs in the shift roster. Absence through temporary incapacity for work is unforeseeable in an individual case but behaves seasonally in aggregate.',
            'Impediments to work on the employee’s side have their own framework in the Czech Labour Code. And unexcused absence is a matter of discipline, not of planning.',
            'The distinction is not a formality: a measure that helps against one kind has no effect on another. An employer who responds to sickness by tightening attendance rules usually just increases unexcused departures.',
          ],
        },
        {
          heading: 'Where absence arises',
          body: [
            'Absence is not evenly distributed. It usually concentrates in particular workplaces, shifts or groups of people, and that distribution is the most valuable information a company has.',
            'If gaps arise mainly at one workplace, the cause is usually in the work itself — physical load, environment, relationships or supervision. If they attach to the night shift, it is more likely the pattern. If they concern new starters in their first weeks, it is really an adaptation problem showing up as absence.',
          ],
        },
        {
          heading: 'An operational margin is an answer, not a failure',
          body: [
            'An operation planned at a hundred per cent occupancy is inherently unstable: any gap goes straight into output. A margin is therefore not a sign of poor planning but part of it.',
            'A margin can take several forms, and how large it should be depends on the actual rate of gaps in a particular operation; no general figure is stated here, because it would hold for nobody.',
          ],
          list: {
            items: [
              'Cover — how many people can work more than one workplace',
              'Flexible capacity, through agency employment for instance, agreed in advance rather than once a gap has opened',
              'Deliberately lower planned occupancy at critical workplaces',
              'A view of where the gaps actually arise',
            ],
          },
        },
        {
          heading: 'Cross-training is cheaper than a margin in people',
          body: [
            'The most effective measure against absence is usually the one that has nothing to do with recruitment: increasing the number of people who can cover more than one workplace.',
            'Training an existing employee on a second workplace is generally cheaper than holding spare capacity, and it raises both their value and their motivation. A record of who can do what is therefore a more practical tool for managing absence than attendance statistics.',
          ],
        },
        {
          heading: 'Where absence turns into turnover',
          body: [
            'Absence and turnover are connected more closely than they appear. Raised absence at a particular workplace often precedes departures — people are missing first, and leave afterwards.',
            'Watching absence is therefore worth doing as an early signal. If it concentrates in one place, look for the cause before it becomes a wave of departures you are dealing with through recruitment.',
          ],
        },
      ],
      cta: {
        label: 'Employee turnover',
        targetConceptId: 'employee-turnover',
        note: 'Where absence has already turned into departures, turnover is the page to start from.',
      },
    },
  },

  'direct-hire': {
    en: {
      title: 'Direct hire: when to fill a role onto your own payroll',
      description:
        'What direct hire means under the Employment Act, how it differs from temporary assignment, what the company takes on as employer, and how the two routes compare.',
      h1: 'Direct hire: when to fill a role onto your own payroll',
      intro:
        'Deciding whether to employ someone directly or to cover the need by temporary assignment is not only a question of price. It changes who the employer is, who runs payroll, who arranges the occupational health assessment and safety training, and how the arrangement ends. This page explains what direct hire means under Czech Act 435/2004 Sb. on employment, how it differs from agency employment, and what specifically a company takes on when it employs someone itself. It includes a comparison of the two routes on the criteria that decide in operational practice.',
      breadcrumb: 'Direct hire',
      sections: [
        {
          heading: 'What direct hire means legally',
          body: [
            'In direct hire an employment relationship arises directly between your company and the employee under the Czech Labour Code. You are the employer with everything that entails, and the person becomes a core employee. The agency’s role ends with finding, approaching and pre-selecting the candidate; it does not enter the employment relationship.',
            'Searching for employees on behalf of an employer is nevertheless employment mediation within the meaning of the Employment Act, and is subject to a permit. The same applies to employing people for the purpose of assigning them temporarily to a user. The difference is therefore not whether a permit is needed, but who remains the employer. Whether a particular agency holds that permit can be checked in the public register of employment agencies made available by the Czech state employment administration — the Ministry of Labour and Social Affairs and the Czech Labour Office.',
          ],
        },
        {
          heading: 'When your own payroll makes sense',
          body: [
            'Onto your own payroll belongs what is meant to last and what you do not want to lose. Typically the permanent core of the operation, roles carrying know-how and the setup of the technology, holders of certificates tied to the person, and any position that manages people or decides on quality. For these, a longer search is worth it, because the cost of turnover is higher than for easily replaceable posts.',
            'Seasonal peaks, cover for long absences, a new line ramping up or an order with a defined end are better covered by temporary assignment — the need ends and the assignment ends with it, without you having to terminate an employment relationship. Many companies combine both routes: a stable core on their own payroll, with a flexible layer above it.',
          ],
        },
        {
          heading: 'What you take on with your own employee',
          body: [
            'Direct hire means all employer duties stay with you. That is not an argument against it, only an item to count when comparing the two routes — part of it is carried by the agency, as formal employer, under temporary assignment.',
          ],
          list: {
            intro: 'What the item contains:',
            items: [
              'The employment contract, the pay agreement and internal regulations',
              'Payroll, statutory contributions and tax duties — check the applicable rates with the Czech Social Security Administration, the health insurer and the tax administration',
              'The entry occupational health assessment before the person starts, and further assessments to the extent set by the work category',
              'Initial and repeat occupational-safety training, and the issue and recording of personal protective equipment',
              'Working-time records, shift planning and wage compensation',
              'Ending the employment relationship within the limits of the Labour Code, including the notice period',
            ],
          },
        },
        {
          heading: 'Direct hire compared with agency employment',
          body: [
            'Both routes end with a person at the workplace doing the work. What differs is who employs them, who runs the payroll, how safety is allocated while they are on site, and what ending the arrangement actually consists of.',
            'A practical guide: the more permanent the need and the more the role is bound to your know-how, the more it argues for your own payroll. The more variable the volume of work and the sooner capacity has to be available, the more assignment makes sense. Urgency on its own is not an argument for either route, because for qualified roles both run up against the availability of people and against notice periods.',
          ],
          list: {
            intro: 'The dimensions on which the two routes are compared:',
            items: [
              'The employer — your company in direct hire, the staffing agency under assignment',
              'Instructions for the work — given in both cases by the user, that is, your own operation',
              'Payroll and statutory contributions — run by the agency under assignment',
              'Occupational safety at the workplace — ensured by the user for the duration of the assignment, while the agency retains its duties as employer',
              'Ending — termination of the employment relationship under the Labour Code, as against ending the assignment on the terms agreed',
              'Pay conditions — under assignment a statutory requirement of comparability with your own core employees in a similar position, not a negotiable item but a condition of the model',
            ],
          },
        },
        {
          heading: 'Fee models in outline',
          body: [
            'For direct hire an agency’s fee is usually tied to the chosen candidate starting and derived from their agreed earnings; the specific share is a matter for the contract. For temporary assignment you pay an hourly rate, which has to cover pay at the level required by comparable conditions, statutory contributions, leave and allowances — which is why it cannot be measured against a gross wage.',
            'No amounts or percentages are stated here. The structure of the models, including exclusivity, staged payment and contractual arrangements for early departure, is set out on the fee-models page.',
          ],
        },
        {
          heading: 'What to settle before signing',
          body: [
            'Before a search begins, have in writing the scope of the brief, the method and timing of payment, how long the arrangement is valid, the handling of candidates’ data, and the conditions for ending the cooperation. For temporary assignment, add the division of responsibility for occupational safety and protective equipment at the workplace, and who arranges the occupational health assessments.',
            'What happens if the chosen person leaves early is a matter for the contract — agree it in writing before the search begins. Neither a replacement nor a candidate’s continued service can be promised in advance, because both depend on that person’s own decision.',
          ],
        },
      ],
      cta: {
        label: 'Agency fee models',
        targetConceptId: 'agency-fees',
        note: 'How the two fee structures are built, and why they cannot be compared directly.',
      },
    },
  },

  'agency-employment': {
    en: {
      title: 'Temporary agency employment in the Czech Republic',
      description:
        'How temporary assignment works under Czech law: the relationship between agency, worker and user company, the requirement of comparable conditions, and shared responsibility for safety.',
      h1: 'Temporary agency employment in the Czech Republic',
      intro:
        'Temporary assignment is the core of agency employment in the Czech Republic. The worker is an employee of the staffing agency, which assigns them for an agreed period to a user company where the work is actually performed. The model suits covering seasonal peaks, projects with a defined end, or temporary gaps in capacity. This page describes how temporary assignment works, what the relationship between the parties is, and what rules apply to pay and working conditions. It follows the Czech Labour Code and Czech Act 435/2004 Sb. on employment.',
      breadcrumb: 'Agency employment',
      sections: [
        {
          heading: 'How temporary assignment works',
          body: [
            'The staffing agency enters into an employment relationship with the worker and, on the basis of an agreement on temporary assignment, assigns them to a user company. The worker performs the work at the user’s premises and under its instructions, but the agency remains the formal employer.',
            'The period of assignment is usually defined in time and may be extended or ended by agreement. The specific terms are agreed in the contracts between the parties.',
          ],
        },
        {
          heading: 'Comparable conditions and responsibility',
          body: [
            'For temporary assignment, Czech law requires the agency worker’s pay and working conditions to be comparable with those of the user’s own core employees in a similar position, and it does not leave responsibility for occupational safety and health with one side alone.',
            'What the parties settle between themselves is how long the assignment runs and which of them does what; those are agreed in the contracts.',
          ],
          list: {
            intro: 'Points that should be clear before anyone starts:',
            items: [
              'Comparable pay and working conditions against the user’s core employees',
              'Shared responsibility of the agency and the user for occupational safety and health',
              'A period of assignment defined in time',
              'A clear division of roles in the contracts',
            ],
          },
        },
        {
          heading: 'Who it suits',
          body: [
            'Temporary assignment suits companies that need to respond flexibly to swings in demand without taking on the whole administration of employment themselves. Part of the employer’s duties is carried by the agency.',
          ],
        },
      ],
      cta: {
        label: 'How a staffing agency works',
        targetConceptId: 'how-agency-works',
        note: 'The two models side by side, and the rules that apply to each.',
      },
    },
  },

  'agency-fees': {
    en: {
      title: 'Agency fee models: how they are built, and why two quotes rarely compare',
      description:
        'The two fee models: a one-off fee for direct hire, an hourly rate for temporary assignment, what that rate must carry by law, and why two quotes rarely compare. No figures.',
      h1: 'Agency fee models: how they are built, and why two quotes rarely compare',
      intro:
        'Staffing quotes compare worse than they first appear: two of them can sound alike while covering a different scope of service, a different basis for calculating the fee, and a different division of risk between supplier and buyer. You will therefore find no amount, rate or percentage on this page. It describes how each fee model is built, what an hourly rate for agency employment must carry by law, and how to tell that two quotes are not actually being compared on the same basis.',
      breadcrumb: 'Fee models',
      sections: [
        {
          heading: 'Two models that do not compare directly',
          body: [
            'Direct hire and agency employment differ not only in price but mainly in what is being bought. In direct hire you pay for finding and pre-selecting a candidate whom you then employ yourself; the fee is one-off and usually tied to the start. In agency employment the agency remains the employer, assigns the employee temporarily to you as the user, and invoices for time worked.',
            'In the first case the payment to the supplier is one-off and you continue to carry the wage costs yourself. In the second, the whole wage and contribution element is contained in the hourly rate. Comparing a one-off fee with an hourly rate is comparing two different things.',
          ],
        },
        {
          heading: 'How the one-off fee for direct hire is built',
          body: [
            'A direct-hire fee is usually derived from the earnings of the role being filled and expressed as a share of an agreed base. What decides is therefore not the share itself but the definition of the base: whether it is gross monthly pay or annual earnings, and whether it includes variable pay, shift premiums or a joining bonus. Two quotes with an identical share can end up far apart under a different definition.',
            'The rest is a matter for the contract, and it is worth settling before a search begins. This page states neither a share nor an amount; both follow from the brief, the scope of the service and the difficulty of the specific role.',
          ],
          list: {
            intro: 'What the contract should make explicit:',
            items: [
              'The exact definition of the base the fee is calculated from',
              'The moment the entitlement arises: signature of the employment contract, or an actual start',
              'When the fee falls due, and the invoicing terms',
              'How it is handled if the candidate starts in a role other than the one they were presented for',
            ],
          },
        },
        {
          heading: 'What an hourly rate for temporary assignment must contain',
          body: [
            'For temporary assignment the hourly rate is not a free commercial judgement. Under the Czech Labour Code an agency employee is entitled to pay and working conditions comparable with a comparable core employee of the user, so the rate has to carry pay at that level together with everything the law attaches to it. Only above that base sit the agency’s own costs.',
            'A quote noticeably below the others usually does not mean a better deal but different content: missing premiums, a different assumption about hours worked, or items moved into separate invoicing. The more useful question than "how much" is therefore "what is contained in the rate, and what is charged on top".',
          ],
          list: {
            intro: 'What the rate has to carry:',
            items: [
              'Pay at the level of comparable pay conditions at the user',
              'The employer’s statutory social and health insurance contributions',
              'Holiday and wage compensation under the Labour Code',
              'Premiums and allowances arising from shift scheduling and overtime',
              'The agency’s own costs of recruitment, payroll and administration',
            ],
          },
        },
        {
          heading: 'Exclusivity, staging, and tying the fee to the outcome',
          body: [
            'The models also differ in when payment happens. A fee tied entirely to the outcome moves the risk of an unsuccessful search onto the supplier, and that division of risk is reflected in its size. A staged model, where part is paid at the start and the rest on the start date, divides the risk and gives the supplier a reason to devote capacity to a brief that is difficult and may not end in a placement.',
            'Exclusivity is a separate arrangement, not a surcharge. Giving a brief to a single supplier removes the situation where two of them present the same candidate and a dispute begins about who brought them; at the same time it binds you for the agreed period. If you do agree exclusivity, a period of validity and a clear procedure for the case where the brief is not filled belong with it.',
          ],
        },
        {
          heading: 'Compensation for an early departure belongs in the contract',
          body: [
            'The question "what if the new person leaves soon" does not belong in a quote as a promise but in the contract as an arrangement. It should set out in writing the relevant period, the reasons that count within it, and the cases that exclude a claim — the role being cancelled, a substantial change to the brief, or termination by the user.',
            'A promise that no departure will occur is a statement about a third party’s future behaviour, not a parameter of a service. Agreeing in advance what happens if it does is the more honest arrangement.',
          ],
        },
        {
          heading: 'Why quotes are not comparable, and where an unfilled role belongs',
          body: [
            'Quotes usually diverge in scope rather than in price. Establish what is included and what is charged on top: advertising, verification of certificates, coordinating occupational health assessments, protective equipment, transport and accommodation, administration for foreign workers, or payroll. The difference in content is usually larger than the difference in the number.',
            'The comparison also has to include an item that appears on no invoice — the cost of the unfilled role. Output not produced, overtime for the rest of the shift, orders declined and an overloaded operational management run every week the seat stays empty.',
          ],
          list: {
            intro: 'For two quotes to be comparable at all, the same things have to be on both sides:',
            items: [
              'The same scope of service',
              'The same definition of the base the fee is calculated from',
              'The same terms of payment and invoicing',
              'A view of what is included and what is charged separately',
              'The cost of the unfilled role over the search period, counted in both',
            ],
          },
        },
      ],
      cta: {
        label: 'The cost of a vacancy',
        targetConceptId: 'cost-of-vacancy',
        note: 'The item that appears on no invoice, and how to estimate it for your own operation.',
      },
    },
  },

  'choosing-an-agency': {
    en: {
      title: 'Choosing a staffing agency: criteria you can verify',
      description:
        'A buyer’s checklist: the mediation permit and its scope, insolvency insurance, who the employer will be, how comparable conditions are established, and the warning signs.',
      h1: 'Choosing a staffing agency: criteria you can verify',
      intro:
        'Choosing a staffing agency is a purchasing decision that can be made verifiably. Most of what matters is either traceable in a public register or answerable with a single question: whether the supplier holds a permit for employment mediation and of what scope, whether it is insured against its own insolvency, who will be the employer of the assigned people, and how candidates’ certificates are verified. What follows is written as a checklist for a buyer and is deliberately usable against us as well — we do not declare our own status verified here; check it in the public register yourself.',
      breadcrumb: 'Choosing an agency',
      sections: [
        {
          heading: 'The employment-mediation permit and its scope',
          body: [
            'Under Czech Act 435/2004 Sb. on employment, employment mediation is an activity requiring a permit. A permit is issued for particular forms of mediation, so the sentence "we have a permit" is not enough on its own. What matters is whether it covers the form you actually want — typically the temporary assignment of employees to a user.',
            'Agencies holding a permit are listed in a publicly available register, and checking takes minutes: the permit is issued by the Czech Labour Office, and the register of employment agencies is published by the Ministry of Labour and Social Affairs. Check the name and identification number of the entity that will actually sign the contract — it can differ from the trading brand given in the quote.',
          ],
          list: {
            intro: 'What to check in the register:',
            items: [
              'That the permit exists, and its number',
              'The forms of mediation the permit covers',
              'That the permit is valid as at today',
              'That the entity in the register is the entity on the contract',
            ],
          },
        },
        {
          heading: 'Insurance, and who the employer will be',
          body: [
            'An agency assigning its employees to a user must, under the Employment Act, be insured against its own insolvency so that the assigned people’s wage claims are secured. Asking for proof of that insurance and its expiry date before signing is entirely legitimate.',
            'The second question is simple: who will employ the people working at your site. In agency employment it is the agency — it runs payroll, pays contributions and carries the employer’s duties. In direct hire you become the employer and the supplier’s role ends. If the answer to that question comes back ambiguous, that is a finding in itself.',
          ],
        },
        {
          heading: 'How the supplier establishes comparable conditions',
          body: [
            'Comparable pay and working conditions for an agency employee against a comparable core employee of the user are a statutory requirement, not a feature of an offer. What is worth asking is therefore not whether a supplier "observes" them but how it establishes them: what data it will need from you, who at your company identifies the comparable employee, and how premiums arising from shift scheduling and overtime are handled.',
            'A supplier who brushes that question aside is moving the risk to you. Compliance with the rules of agency employment is subject to inspection by the Czech labour inspection authorities, on both sides of the relationship.',
          ],
        },
        {
          heading: 'Questions about the selection method',
          body: [
            'The difference between suppliers shows most in how they select. For specialist roles it matters whether anyone has actually seen the certificates and understands what they say — that for a welder qualification certificate the tested range decides rather than its mere existence, and that electrotechnical competence is divided according to the activity performed.',
            'Ask also what the supplier will not do, and where its service ends. Someone who can describe the boundaries has usually also described what is inside them. An answer of the "we can handle anything" kind describes no boundary at all.',
          ],
          list: {
            intro: 'Questions worth asking about the method itself:',
            items: [
              'Who conducts the interview, and what operational experience they have of the occupation',
              'How the scope and the current validity of professional certificates are verified',
              'How claimed experience is verified, and what is done with inconsistencies in a CV',
              'How the shift pattern, the working environment and the place of work are communicated to the candidate',
              'What happens if, after the start, it turns out the candidate does not meet the requirements',
            ],
          },
        },
        {
          heading: 'Warning signs',
          body: [
            'Some signals are reliable precisely because they concern things a supplier does not control. A promised start date is one: it depends on the candidate’s notice period and, for workers from third countries, on an administrative procedure — that is, on third parties. Claims about the size of a supplier’s own database are unverifiable in the same way, and a claim of state endorsement mistakes what the state does: authorities issue permits and maintain registers, they do not issue recommendations of suppliers.',
            'Pressure to sign quickly is a category of its own. A brief that genuinely is urgent can be started on a short but written agreement, so willingness to put the terms on paper is a better indicator than speed of response.',
          ],
          list: {
            intro: 'The warning signs in one place:',
            items: [
              'A promise of the outcome, or of a specific start date',
              'Unverifiable claims about the size of the supplier’s own candidate database',
              'Claims of approval or recommendation by state authorities',
              'Pressure to sign quickly, and unwillingness to put the terms in writing',
              'A rate for temporary assignment that plainly will not cover the employee’s statutory entitlements',
              'The absence of a named contact person answerable for the brief',
            ],
          },
        },
        {
          heading: 'References, and written terms before the start',
          body: [
            'References say less than is expected of them. They show that a supplier worked with someone, but not how it will do on your role, in your region and on your shift pattern. It is more useful to ask a reference company specific things: how many people presented actually started, how a situation was handled when someone did not meet the requirements, and how communication went during a disagreement.',
            'Have the terms in writing before a search begins — the scope of the brief, the fee and when it falls due, exclusivity, protection of presented candidates, and the procedure for early termination.',
          ],
        },
      ],
      cta: {
        label: 'About us and agency verification',
        targetConceptId: 'about-us',
        note: 'Including how to run these same checks on us.',
      },
    },
  },

  'agency-contract': {
    en: {
      title: 'The contract with a staffing agency: what to watch',
      description:
        'What belongs in writing: two different contractual relationships, the terms to settle before starting, comparable conditions, safety and protective equipment, and candidate data.',
      h1: 'The contract with a staffing agency: what to watch',
      intro:
        'A contract with a staffing agency decides the situations a quote does not address: what happens if a candidate does not start, if the brief changes during the search, if there is an accident at your workplace, or if the cooperation ends sooner than expected. Its shape differs fundamentally according to whether you are buying the search for a candidate for your own payroll, or the temporary assignment of agency employees. What follows summarises the points that should be agreed in writing, and the roles that cannot be moved between the parties by agreement. This is general information, not legal advice.',
      breadcrumb: 'Agency contract',
      sections: [
        {
          heading: 'Two different contractual relationships',
          body: [
            'In direct hire you conclude a contract with the agency whose subject is finding and pre-selecting a candidate. You then conclude the employment contract with that person directly and carry all employer duties. The relationship with the supplier effectively ends there — apart from arrangements that reach into the future: the fee, protection of presented candidates, and compensation.',
            'In agency employment the structure is different. The agency remains the employer, concludes an agreement on temporary assignment with you as the user, and you allocate work and give instructions to the employee.',
          ],
        },
        {
          heading: 'What should be agreed in writing',
          body: [
            'Whatever the model, disputes arise where an oral understanding was relied on, or the assumption that "this is simply customary". The list below is not exhaustive, but it covers the points that prove decisive in practice — and adding them once the cooperation has already started is usually one-sidedly disadvantageous.',
          ],
          list: {
            items: [
              'The scope of the brief: the role, the qualification requirements, the place of work, the shift pattern',
              'The fee, the base on which it is calculated, and when it falls due',
              'Exclusivity, and the period for which it is agreed',
              'The term of the contract and how it is extended',
              'Protection of presented candidates, and the period for which a presentation applies',
              'Compensation, or return of part of the fee, on an early termination',
              'The division of responsibility for occupational safety and protective equipment at the user’s workplace',
              'Arranging occupational health assessments, and passing on information about the risks',
              'Handling the personal data of candidates and employees',
              'How the cooperation ends, and how briefs in progress are settled',
            ],
          },
        },
        {
          heading: 'Comparable conditions are not a matter for negotiation',
          body: [
            'In temporary assignment an agency employee is entitled under the Czech Labour Code to pay and working conditions comparable with a comparable core employee of the user. It is not a concession that can be traded away in negotiation; it is a statutory requirement, and a contract can only implement it, not change or exclude it.',
            'In practice that means the user has to give the agency the data needed to meet it: who the comparable employee is, what pay conditions apply to the work, and what premiums and allowances attach to the shift schedule. Compliance is subject to inspection by the Czech labour inspection authorities, and the contract should therefore determine who supplies these data and how they are updated when conditions at the user change.',
          ],
        },
        {
          heading: 'Safety, protective equipment and health assessments',
          body: [
            'The user runs the workplace but the agency is the formal employer, so responsibility is not one-sided and the contract should break it down into specific tasks rather than a general sentence about "cooperation". The user knows the risks, the environment and the equipment; the agency keeps the employment documentation and is the addressee of the employer’s duties.',
          ],
          list: {
            intro: 'What belongs in the contract above all:',
            items: [
              'Initial and repeat training on the risks of the specific workplace',
              'Who provides personal protective equipment, and who pays for it',
              'Passing on the data needed for occupational health assessments',
              'Recording time worked, and passing those records between the parties',
              'The procedure in the event of an accident at work, including reporting and cooperation in the investigation',
            ],
          },
        },
        {
          heading: 'Protection of candidates’ personal data',
          body: [
            'During recruitment, CVs, evidence of qualifications and other personal data pass between the parties. The contract should determine the extent to which they are transferred, the purpose you may use them for, how long you keep them, and what happens to the data of candidates who do not start. Copies of certificates, which are routinely taken for specialist roles, deserve particular attention — from certificates to material on fitness for work.',
            'The extent of data transferred should match the purpose. If a supplier sends more than is needed for a decision on filling the role, that is not an extra service but a risk passed to you.',
          ],
        },
        {
          heading: 'Compensation for early termination, and ending the cooperation',
          body: [
            'A compensation arrangement is among the sensitive points, and among those that only get addressed once they are needed. It is not a promise that no departure will occur — nobody can give such a promise. It is an agreement on what happens if one does. In writing, therefore: the relevant period, the reasons that count within it, and the cases that exclude a claim — the role being cancelled, a substantial change to the brief, termination by the user, or conditions for starting not being met on the user’s side.',
            'It should be equally clear how the cooperation ends: notice conditions, settlement of briefs in progress, what becomes of candidates already presented, and which arrangements continue to apply after termination. For temporary assignment there is in addition the manner in which an assignment is recalled, and the run-off of the assigned employees’ wage claims.',
          ],
        },
      ],
      cta: {
        label: 'Choosing a staffing agency',
        targetConceptId: 'choosing-an-agency',
        note: 'The checks worth doing before a contract is drafted at all.',
      },
    },
  },
}
