import type { LocaleCorpus } from '../types'

/**
 * L1 employer cluster — English.
 *
 * Every entry is translated from the Czech concept primary named in
 * lib/locale/l1-concepts.ts, which is the factual ceiling. Where the Czech
 * declines to state something — a placement date, an average time to fill, a
 * salary range, a database size, a retention return — the English declines too.
 * Those refusals are the most load-bearing sentences on these pages: they are
 * what stops the site making claims it cannot evidence, and a translation that
 * quietly drops them would be a stronger claim than the source.
 *
 * Where the Czech section carries `bullets`, the English carries `list`. The
 * items are translations of those bullets and nothing else: no item states
 * anything the Czech bullet does not.
 */
export const EN_EMPLOYER: LocaleCorpus = {
  'recruitment-overview': {
    en: {
      title: 'Recruitment: a practical overview for employers',
      description:
        'Direct hiring, agency employment and recruiting from abroad — how the three routes differ and when each makes sense. A decision framework, not legal advice.',
      h1: 'Recruitment: a practical overview for employers',
      intro:
        'Recruitment is not one activity but several routes that differ in speed, cost and how much administration they carry. The first decision an employer makes is whether to hire directly, work with a staffing agency, or recruit from abroad — and each suits a different situation. This page sets out those routes and the criteria for choosing between them. For specific rules and rates it points to official sources rather than restating them. It is a decision framework, not legal advice.',
      breadcrumb: 'Recruitment',
      sections: [
        {
          heading: 'The main routes',
          body: [
            'Hiring on your own, without an agency, means the company finds, selects and employs people itself. Agency employment moves part of the administration and flexibility to a staffing agency, which assigns workers temporarily. Recruiting from abroad widens the pool of candidates but adds the administration attached to permits.',
            'Which route fits depends on how quickly the roles need filling, whether the need is standing or a fluctuation, and what capacity your HR function has.',
          ],
          list: {
            items: [
              'Hiring on your own, without an agency — full control, higher demands on your own capacity.',
              'Agency employment — flexibility, and the administration transferred.',
              'Recruiting from abroad — a wider pool of candidates, more administration.',
            ],
          },
        },
        {
          heading: 'How to choose between them',
          body: [
            'The useful criteria are urgency, the nature of the need — standing or temporary — how available the candidates are in your market, and your internal capacity to run a selection process and its paperwork.',
            'Seasonal peaks and temporary gaps usually suit agency employment. Key permanent roles usually suit hiring on your own.',
          ],
        },
        {
          heading: 'What you should be able to decide',
          body: [
            'Having worked through those criteria, you should be able to say which route — or combination of routes — fits the role, and who inside the company needs to be involved.',
            'If you are considering recruiting from abroad, allow for the permit administration described on the Czech pages covering the employment of foreign nationals.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'Describe the roles and the site, and we will come back to you to discuss what filling them would involve.',
      },
    },
  },

  'recruitment-planning': {
    en: {
      title: 'Recruitment planning: anticipating the need for people',
      description:
        'How to plan recruitment rather than react to it: deriving headcount from the business outlook, allowing for seasonality and turnover, and planning the replacement of someone who leaves.',
      h1: 'Recruitment planning: anticipating the need for people',
      intro:
        'Reactive recruitment — looking for people only once they are missing — tends to be slower and more expensive than recruitment planned in advance. Planning connects the business outlook to the staffing need: how many people, in which roles, and by when. This page describes how to approach that, how to allow for seasonality and turnover, and why it is worth building in both a margin and time for permit procedures where foreign workers are involved. It gives no figures and no benchmarks; it is a method that each company fills with its own data.',
      breadcrumb: 'Recruitment planning',
      sections: [
        {
          heading: 'From business outlook to staffing need',
          body: [
            'Planning starts from the expected volume of work — orders, production, season. From that follows how many people are needed, with what qualifications, and when.',
            'It is worth separating the standing requirement from temporary peaks, because a different recruitment route covers each.',
          ],
          list: {
            intro: 'What the plan is built from:',
            items: [
              'An estimate of the volume of work and of how it is expected to develop.',
              'Converting that estimate into headcount and role profiles.',
              'Distinguishing the standing requirement from the temporary one.',
              'A margin for turnover and for gaps in cover.',
            ],
          },
        },
        {
          heading: 'Seasonality, turnover and lead times',
          body: [
            'A plan has to carry seasonal swings, expected turnover, and the time recruitment itself takes. Where people are recruited from abroad, the time needed for residence and work authorisation extends the plan further.',
            'This page states no procedural time limits. Verify them with the relevant authorities and put the result into your schedule.',
          ],
        },
        {
          heading: 'Replacing someone who leaves',
          body: [
            'A specific person leaving is the most common reason a vacancy opens, and the one plans are least ready for. Unlike growth, the date is fixed by how the employment ends — yet the decision about what exactly to fill is often left to the final weeks.',
            'It pays to separate two questions first: whether to fill the same role, or to divide the work differently. A departure is the one moment when a role can be reshaped without a further disruption to the team; once a replacement has started, every change means a second round. Only then does the search itself matter.',
            'The second step is handover. If the two employments overlap even partly, the person leaving can pass knowledge on directly; if they do not, it has to be captured in writing before they go. This is the part of the plan most often underestimated, and it shows up later rather than immediately.',
          ],
          list: {
            intro: 'What to settle when a specific person gives notice:',
            items: [
              'Whether to fill the same role, or to redistribute the work.',
              'How much time remains until the employment ends.',
              'Whether the two employments will overlap for the handover.',
              'What has to be captured in writing before the person leaves.',
              'Whether this is a repeated departure from the same role.',
            ],
          },
        },
        {
          heading: 'What you should be able to decide',
          body: [
            'The output is a plan that says when to start recruiting for which roles and by which route, so that people are available in time. That reduces the risk of expensive last-minute hiring.',
            'The plan then feeds the choice of channels and the organisation of selection; for temporary peaks, consider agency employment.',
          ],
        },
      ],
      cta: {
        label: 'For employers',
        targetConceptId: 'for-employers',
        note: 'The employer guide covers the decisions that usually sit around a hiring plan.',
      },
    },
  },

  'role-brief': {
    en: {
      title: 'The role brief: what it needs to contain to be searchable',
      description:
        'How to write a role brief and candidate profile: describe the work rather than the ideal person, separate essential from desirable, and know where each requirement comes from.',
      h1: 'The role brief: what it needs to contain to be searchable',
      intro:
        'When a role will not fill, the cause is usually looked for in the market. In practice it is more often in the brief — in how the role is described. A profile listing twenty requirements without distinguishing their importance, or describing character traits instead of work, cannot be searched against or used to compare applicants, and the selection then runs on impression. This page sets out what a brief needs in order to be searchable, how to separate the essential from the desirable, and which mistakes recur in candidate profiles.',
      breadcrumb: 'Role brief',
      sections: [
        {
          heading: 'Describe the work, not the ideal person',
          body: [
            'The most useful shift is to stop describing what the person should be like and start describing what they will do. "Independent, careful and reliable" defines nobody — most applicants would be described that way, and you cannot select against it.',
            'A usable description answers a short set of questions about the work itself, and both the advertisement and the interview questions can be derived from the answers.',
          ],
          list: {
            intro: 'What a usable description answers:',
            items: [
              'What the person will actually do in their first three months.',
              'What equipment, systems and documentation they will work with.',
              'Who they work with, and who receives the result of their work.',
              'How anyone will know they are coping with the work.',
            ],
          },
        },
        {
          heading: 'Separate the essential from the desirable, explicitly',
          body: [
            'This is the single change that usually helps most. Every requirement belongs in one of two groups: what someone cannot start without, and what makes settling in easier but can be learned.',
            'The split has two effects. It widens the group of people worth approaching, and it speeds up decisions — where a candidate meets everything essential and part of what is desirable, there is not much left to deliberate. Without the split, every requirement behaves like a condition and the profile becomes unreachable.',
          ],
        },
        {
          heading: 'Know where each requirement comes from',
          body: [
            'For qualified roles it is worth knowing what stands behind each requirement. Four different things get confused in practice, and the result is a profile narrowed for no reason.',
            'A legal requirement follows from regulation and cannot be waived — for example electrotechnical competence, or the occupational health assessment corresponding to the work category. These are requirements of Czech law.',
            'A regulated qualification is a specific certificate whose content and scope are set by the relevant regulation or standard. The scope is what the certificate was issued for, not what the occupation is called.',
            'An industry convention is a common requirement that no regulation imposes — experience in a particular sector, for instance.',
            'An operational requirement is a specific system, a documentation language or a shift pattern. It is legitimate, but it is worth knowing that it is the company’s choice rather than a property of the occupation.',
          ],
        },
        {
          heading: 'What is most often missing',
          body: [
            'Alongside the requirements on the candidate, a brief needs the information that decides whether a suitable person will consider the offer at all.',
            'Whether to state a pay range is the employer’s own decision. Stating one usually raises the relevance of the responses and saves time on both sides. We do not state figures here; for orientation by occupation and region there is the Czech average-earnings information system (ISPV, Informační systém o průměrném výdělku).',
            'For qualified roles what nobody writes down is often decisive — why the seat is empty. A new position created by growth and a seat that keeps becoming vacant are two different offers, and experienced people ask.',
          ],
          list: {
            intro: 'What the brief needs to state:',
            items: [
              'The shift pattern, and how regular it is.',
              'Location, how reachable the site is, and any transport provided.',
              'The scope and length of training.',
              'Who the direct manager is, and how large the team is.',
              'The reason the role is vacant.',
            ],
          },
        },
        {
          heading: 'The brief as a basis for comparison',
          body: [
            'A good brief keeps earning after selection starts, because it becomes the yardstick. When the essential requirements are named in advance, you can show for each applicant where they meet the brief and where they do not.',
            'Without that, comparison rests on the order of interviews and on impression, which is both less reliable and harder to defend internally. When handling applicants’ details, keep to data-protection rules and collect only what relates to assessing the role.',
          ],
        },
        {
          heading: 'How to tell the brief is finished',
          body: [
            'A practical test: give the brief to someone who does not know the role and ask them to describe who they would look for. If they describe someone other than the person you have in mind, the brief is not finished.',
            'The second test is to derive three interview questions from it. If you cannot, the brief is missing a description of the actual work and has been left as a list of traits.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'If you have a specific role, describe it and we will go through the brief with you.',
      },
    },
  },

  'direct-sourcing': {
    en: {
      title: 'Direct sourcing: how active candidate search works',
      description:
        'Direct sourcing for specialist roles: active against passive candidates, how an approach runs step by step, discretion and candidate data, and what the employer has to supply.',
      h1: 'Direct sourcing: how active candidate search works',
      intro:
        'Employers with a specialist role open for months usually describe the same experience: the advertisement is running, responses arrive, but not from people with the competence being sought. The reason is straightforward — someone who can do that work is most likely doing it, and is not looking anywhere. Direct sourcing is the answer to that situation: instead of waiting for responses, you work out where the competence is formed and approach suitable people directly. This page describes what that involves step by step, what is uncomfortable about it for both sides, and what the employer has to supply for an approach to have any chance.',
      breadcrumb: 'Direct sourcing',
      sections: [
        {
          heading: 'Active and passive candidates are not the same thing',
          body: [
            'An active candidate is looking for work: they watch advertisements, send CVs and respond quickly. A passive candidate is not looking for anything — they can do their current job, they have established relationships in it, and they consider a change only when a concrete reason appears. For operational roles active candidates are a large enough group that advertising works. For specialist and technical roles the ratio is reversed.',
            'That sets the limit of an advertisement. An advertisement is a passive instrument and reaches only the overlap of two groups: people with the competence, and people who happen to be looking. The rarer the competence, the smaller that overlap. When advertising does not work for a specialist role, the fault is usually neither the wording nor the choice of job board.',
          ],
        },
        {
          heading: 'What direct sourcing involves in practice',
          body: [
            'Active search is not one activity but a sequence of steps, any of which can fail. A substantial part of the work happens before the first phone call — in establishing what kind of operation the competence you need is actually formed in.',
          ],
          list: {
            ordered: true,
            items: [
              'Establish where the competence is actually formed — in what kind of operation, on what technology, in a team of what size.',
              'Check the profile before making any approach, so that nobody is called for whom the role makes no sense.',
              'Approach clearly and without pressure: who is calling, why this person in particular, and what the role is.',
              'Describe the role concretely enough that the person can decide whether there is anything to talk about at all.',
              'Agree confidentiality before anything is passed to the employer.',
              'Keep the contact courteous even where the answer is "no".',
            ],
          },
        },
        {
          heading: 'Why the first "no" is normal',
          body: [
            'A refusal at first approach is an ordinary response, and it usually concerns the moment rather than the role. The person has work in progress, has just had a rise, is waiting for a year-end review, or has started a change they want to finish. The answer does not say the offer is bad; it says now is not the right time.',
            'The practical consequence is uncomfortable: anyone building on a single round of approaches and a quick result will achieve nothing this way. What works is to close the conversation properly, thank the person and leave the door open — some of those approached can be returned to later. This is why we state no specific date for filling a role recruited this way.',
          ],
        },
        {
          heading: 'Discretion and candidate data',
          body: [
            'The person approached has a job they do not want to lose. Discretion here is not courtesy but a condition of the whole method. Breaking that trust does not damage one candidate only — in specialist trades, where people know each other across operations, word travels.',
            'The same care applies to their details. A CV, a contact and notes from a conversation are personal data from the first moment, and data-protection rules apply to them. A candidate should know who approached them, what their details will be used for and how long they will be kept; passing them to a specific employer is a separate step they agree to knowingly and in advance.',
            'One more thing belongs in the open: under Czech law, employment mediation requires a permit under Czech Act 435/2004 Sb. on employment, and no fee for mediation may be sought from the candidate. The cost is borne by the employer, never by the person approached.',
          ],
          list: {
            intro: 'The rules that follow from that:',
            items: [
              'No contact on a work phone or a company email address, and no discussion of the approach with the candidate’s colleagues.',
              'The candidate’s name is not given to the employer without their consent.',
              'No references are taken up with the current employer without the candidate’s knowledge.',
              'Only data that has a purpose is kept, and only for as long as that purpose lasts.',
            ],
          },
        },
        {
          heading: 'What the employer has to supply',
          body: [
            'Direct sourcing stands or falls on what the person making the approach is holding. Someone who already has work does not need a list of requirements — they need a reason to consider a change at all, and a counterpart able to decide quickly.',
          ],
          list: {
            intro: 'In concrete terms:',
            items: [
              'A credible account of the role — why it is open, what the person takes over, and what they will decide on themselves.',
              'A truthful description of the conditions — the shift pattern, the commute, the pace, the equipment, and what is unpleasant about the operation.',
              'A decision-maker who replies quickly and is willing to meet outside normal working hours.',
              'Willingness to hold the first meeting discreetly, away from the workplace or online.',
              'Feedback by the agreed date, including when the answer is no.',
            ],
          },
        },
        {
          heading: 'What we do not claim about our reach',
          body: [
            'Phrases about extensive candidate databases, or candidates available without waiting, are common in this market. We state no such figure about our reach or the size of any database, and we will not. It cannot be verified and it means nothing to an employer: what decides an outcome is how many people with the competence you need are reachable in your region and willing to discuss a change, not the size of any list.',
            'What we can describe is the method: how the brief is refined, how the set of relevant operations and roles is defined, how people are approached, and what we tell you about progress as it happens. This page covers specialist, technical and first-line operational management roles in manufacturing, warehousing and logistics. Executive search and psychometric assessment are not described here.',
          ],
        },
      ],
      cta: {
        label: 'Specialist recruitment',
        targetConceptId: 'specialist-recruitment',
        note: 'How filling qualified roles differs from operational hiring.',
      },
    },
  },

  'hard-to-fill-roles': {
    en: {
      title: 'Why a specialist role will not fill: a diagnostic sequence',
      description:
        'An unfilled specialist role, diagnosed step by step: contradictions in the profile, inherited requirements, the real constraint, losses in selection, and the comparison the candidate makes.',
      h1: 'Why a specialist role will not fill: a diagnostic sequence',
      intro:
        'A specialist role open for several months usually has no single cause but several smaller ones that add up. Until an employer names them, the same search repeats in the expectation of a different result — another advertising channel, more pressure on HR, and more waiting. This page offers a diagnostic sequence instead: questions you can answer from your own documents, which ask first about the brief, then about your constraints, and only last about the market. No wage rates or ranges are stated here.',
      breadcrumb: 'Hard-to-fill roles',
      sections: [
        {
          heading: 'Before adding another channel, go through the brief',
          body: [
            'The diagnosis is worth doing in order. First the brief, because an error there devalues any channel. Then your own constraints, which an advertisement cannot change. Only then the process and the offer. The reverse order — add channels first, ask questions afterwards — is the usual approach and also the more expensive one.',
            'Assemble the material without which a discussion of causes is only speculation: the text of the advertisement, the internal role description, the list of candidates who went through the process with a note on the stage at which each dropped out and why, and the dates of each step. Most of the answers are in those four documents, not in the labour market.',
          ],
        },
        {
          heading: 'Is the profile internally contradictory?',
          body: [
            'The usual contradiction is between the level of competence required and the conditions offered: the profile describes an experienced, self-directed person with valid certificates, while the conditions match an entry-level role. Such an advertisement attracts neither group — experienced people skip it, and beginners do not apply because of the requirements. The role then hangs without anything being wrong in the market at all.',
            'Contradictions also occur inside the profile: narrow specialisation together with broad scope, full shift rotation together with supplier meetings during office hours, responsibility for a team without the authority to decide. A simple test: read the profile as someone who does that work today, and ask what would interest them and what would put them off.',
            'Do not estimate a salary range, and do not copy one from other companies’ advertisements. Publicly available data on earnings by occupation, qualification and region is published by the Czech average-earnings information system. This page states no amounts.',
          ],
        },
        {
          heading: 'Is it a requirement, or an inherited wish list?',
          body: [
            'Requirements in advertisements are inherited. The text was written during the last recruitment, a previous manager added their preferences, and nobody has since compared it with the actual work. It is worth sorting every point into three groups, and knowing for each group what can be done with it.',
            'A check that usually exposes the difference between a condition and a wish: would the person currently doing that job for you meet today’s advertisement? If not, the brief is stricter than the real need. Formal completion of a qualification is also possible through the national system of professional qualifications, whose standards are maintained in the Czech national qualifications register; the usual requirements of an occupation are described in the national occupations register.',
          ],
          list: {
            intro: 'The three groups:',
            items: [
              'Conditions set by regulation or by a certificate — the work cannot be performed without them, and they cannot be waived.',
              'Skills set by the operation — they can be added by training within a reasonable time, provided there is someone to do the training.',
              'Wishes — they narrow the pool of candidates, but they do not determine whether the person can do the work.',
            ],
          },
        },
        {
          heading: 'What is the real constraint: location, shifts or a certificate?',
          body: [
            'For specialist roles there is usually a single constraint that cannot be worked around, and it is worth knowing which. Most often it is location, the shift pattern, or a certificate — each has a different remedy, a different cost, and a different effect on the size of the candidate pool.',
            'If the constraint is a certificate, ask one further question: must the candidate hold it on their start date, or are you willing to fund it and wait? That single answer changes the size of the pool more than most other adjustments to the brief.',
          ],
          list: {
            intro: 'The constraints, and what can be done about each:',
            items: [
              'Location — addressed by the commute, by shuttle transport for employees, by accommodation, or by part of the work being done away from the site where the role allows it.',
              'The shift pattern — it narrows the pool more sharply than expected; consider whether full shift rotation is really necessary for this role.',
              'A certificate or authorisation — either it is a condition of performing the work or it can be added later; the difference has to be clear before the search starts.',
              'Medical fitness — assessed by the occupational health services provider, and for some work a limit in its own right.',
            ],
          },
        },
        {
          heading: 'Are you losing candidates inside your own process?',
          body: [
            'Some unfilled roles do not have too few candidates — they have them and lose them. The loss usually takes the form of delay: days pass between an interview and feedback, the technical assessment is scheduled for whenever the specialist is free, and the offer arrives once the person has already decided otherwise. Delays can be measured, unlike the impression that there are no candidates.',
            'For specialist roles the decision is slower even after an offer is accepted, because the candidate has to end their current employment and observe the notice period, whose minimum length and running are set by the Czech Labour Code. An employer who does not allow for that time will judge the recruitment a failure before it could have finished.',
          ],
          list: {
            intro: 'What to measure:',
            items: [
              'How many days passed between each step for the most recent candidates.',
              'How many rounds the process has, and what each of them adds to the decision.',
              'Who decides on hiring, and whether they were present where they were supposed to be.',
              'When conditions are first discussed — late information about pay or shifts wastes the time of both sides.',
              'Whether a candidate gets an answer even when they were unsuccessful.',
            ],
          },
        },
        {
          heading: 'What your offer is compared against',
          body: [
            'Employers compare their offer with other advertisements. A specialist candidate compares it with the job they have and know in detail: a manager they understand, equipment they have set up, a commute they have tested, and the certainty that they have already succeeded there. Being slightly different is not enough against that comparison.',
            'In practice this means naming what is better in your offer than what the person has today, and not concealing what is worse. Accurate information given early saves both sides more than a carefully written advertisement followed by disappointment during the probationary period.',
          ],
          list: {
            intro: 'The whole diagnosis, in order:',
            ordered: true,
            items: [
              'Go through the profile against the reality of the work and remove the contradictions.',
              'Sort the requirements into conditions, skills that can be added, and wishes.',
              'Name the single real constraint and decide whether it can be released.',
              'Measure the delays in your own selection process and shorten them.',
              'Verify the salary range against data rather than by estimate.',
              'Only then change channels, and consider approaching candidates directly.',
            ],
          },
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'If the role is still open after that, describe it and we will go through the brief with you.',
      },
    },
  },

  'time-to-hire': {
    en: {
      title: 'How long filling a role takes: what actually governs the date',
      description:
        'We promise no date for filling a role. What the time is actually made of: notice periods, certificates and qualifications, your own decision loop, and state permit procedures.',
      h1: 'How long filling a role takes: what actually governs the date',
      intro:
        'We do not give a date in answer to "how quickly will you fill the role". The start date is largely determined not by the agency or the employer but by circumstances on the side of the candidate, the authorities and the calendar: the notice period in their current job, the validity and scope of their professional certificates, an available appointment for the occupational health assessment, the state-run permit procedure for workers from third countries, and the season the recruitment falls into. Instead of a promise, this page describes what the time to fill is actually made of — so an employer can build a realistic schedule and see which parts they can influence themselves.',
      breadcrumb: 'How long hiring takes',
      sections: [
        {
          heading: 'Why you will not find a promised date here',
          body: [
            'A promised number of days sounds good in a proposal, but it is a promise made on behalf of people the promiser does not control — the candidate, their current employer, the examining body, the occupational health provider and an administrative authority. So we do not promise a start date, and we do not work with an average time to fill either: for specialist and technical roles individual briefs differ so much that an average would mislead an employer rather than orient them.',
            'What can be described is the course of the work. Once the brief is settled you know which steps should happen, whose turn it is, and where the search currently stands. The estimate is then refined progressively — first by who among those approached is available at all, and only after an offer is accepted by that candidate’s notice period and the state of their certificates.',
          ],
        },
        {
          heading: 'The notice period is not yours to shorten',
          body: [
            'For specialist roles you are mostly approaching people who are working. Once such a candidate accepts, they have to end their current employment under the rules of the Czech Labour Code, which sets both the minimum notice period and the point from which it starts to run. Both have been amended over time, so work from the current wording rather than from earlier practice.',
            'In practice the gap between an accepted offer and a first shift is determined by Czech statute and by the candidate’s agreement with their current employer, not by your need. Neither you nor an agency can shorten it. An earlier departure is possible only by agreement between the candidate and their current employer — and for hard-to-replace roles the other side usually has no reason to agree. Shorter lead times occur for people in a probationary period, after a project ends, or between jobs; a schedule cannot be built on their availability.',
          ],
        },
        {
          heading: 'Qualifications and certificates that have to match',
          body: [
            'The second typical delay is qualification. For specialist roles it is not experience alone that decides but a specific certificate and its scope: for a welder, the tested range stated in the certificate under ČSN EN ISO 9606-1; for work on electrical equipment, professional competence under Czech government regulation 194/2022 Sb.; and for reserved technical equipment, competence or certification under Czech Act 250/2021 Sb. A certificate that exists on paper may still not cover the work the role actually involves.',
            'These certificates have limited validity, and renewal depends on the capacity of an examining or training body rather than on a recruitment supplier. For a qualification obtained abroad, a recognition procedure under Czech Act 18/2004 Sb. applies, and for foreign education a procedure overseen by the Czech Ministry of Education. No time limits or intervals are stated here — they follow from the relevant regulation and from the conditions of the particular certificate.',
          ],
          list: {
            intro: 'What has to be checked on each candidate:',
            items: [
              'The scope the certificate was issued for, not merely the fact that it exists.',
              'The expiry date, and the time needed for re-examination or renewal.',
              'Recognition of a qualification or of education obtained outside the Czech Republic.',
              'An available appointment for the initial occupational health assessment.',
              'Evidence of the experience the role actually requires.',
            ],
          },
        },
        {
          heading: 'The decision loop on the employer’s side',
          body: [
            'Part of the time to fill is created inside your own company — and it is usually the part easiest to do something about. It includes the delay between a profile being sent and feedback returning, the number of interview rounds, the availability of the person who decides, and how quickly a concrete offer follows an interview. For a candidate who has a job and other conversations in progress, every silent delay reduces the chance they are still considering you.',
            'An unstable brief also causes delay. If the required scope of a certificate, the shift pattern or the place of work changes during the process, selection effectively starts again and the people already approached are no longer available. It is worth settling contested points before the first candidate is approached.',
          ],
          list: {
            intro: 'What to settle on your own side:',
            items: [
              'Who gives feedback on the candidates, and by when.',
              'How many interview rounds are genuinely necessary.',
              'When the decision-maker is available, holidays included.',
              'How quickly a concrete offer goes out after an interview.',
              'Whether the brief is stable, or changes during the selection.',
            ],
          },
        },
        {
          heading: 'Relocation, commuting and accommodation',
          body: [
            'If a role cannot be filled from the local area, the logistics of a candidate’s life join the schedule. Ending a tenancy, children’s schooling, a partner’s job or selling a car are common reasons a start date moves even after everything else is resolved. For people commuting, whether shifts connect to transport matters, and for accommodation, whether capacity is free on the date required.',
            'Accommodation and employee shuttle transport are therefore worth settling before approaching people outside the region, not at the point where a candidate is weighing an offer. The terms, the price and what it includes belong in the offer from the start — negotiating housing afterwards can move a start date considerably.',
          ],
        },
        {
          heading: 'Permits for foreign workers, and the calendar',
          body: [
            'For workers from third countries an administrative procedure run by the state joins the schedule. The length of residence and work authorisation proceedings is determined by neither the agency nor the employer; the procedure and time limits are set by regulation, and progress depends on the relevant authority and, for some applications, on an embassy abroad. Current information is published by the Czech Ministry of the Interior, the Czech Labour Office and the Czech Ministry of Foreign Affairs. No time limits are stated on this page.',
            'The calendar plays its part too. Company-wide shutdowns, summer holidays and the end of the year slow interviews, medical assessments and examination dates, while seasonal peaks in manufacturing and logistics increase competition for the same people. A recruitment started when the decision-makers are unavailable will take longer without any complication at all.',
          ],
        },
      ],
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'Describe the role and we will go through what filling it would involve, including what governs the timing.',
      },
    },
  },

  onboarding: {
    en: {
      title: 'Onboarding: getting the first weeks right',
      description:
        'What onboarding covers, why the first weeks affect whether someone stays, and how to organise the administrative and practical halves so that neither is missing.',
      h1: 'Onboarding: getting the first weeks right',
      intro:
        'Onboarding is the process of bringing a new employee into the company — from the formalities on the first day, through familiarisation with the work, to the first weeks in which it is decided whether the person stays. A well-run start shortens the time before a new worker is productive and reduces the risk of an early departure. This page describes what onboarding usually contains and how to organise it, with attention to the practical side as well as to the duties that arise on starting. It is not legal advice; for specific duties such as initial health-and-safety training it points to the regulations and official sources.',
      breadcrumb: 'Onboarding',
      sections: [
        {
          heading: 'What onboarding covers',
          body: [
            'Onboarding joins an administrative part — the contract, insurance registration, initial health-and-safety training — with a practical one: familiarisation with the workplace, the tools, the team and what is expected. Both are worth preparing in advance so that the first day runs smoothly.',
          ],
          list: {
            items: [
              'The contract and the joining paperwork.',
              'Registration for insurance, and the records that go with it.',
              'Initial health-and-safety training.',
              'Familiarisation with the workplace and the team.',
              'Clear expectations, and the first tasks.',
            ],
          },
        },
        {
          heading: 'Why it matters',
          body: [
            'The first days and weeks strongly influence whether a new person stays. A start that goes badly — confusion, missing information, unclear expectations — is among the common causes of early departures. A prepared onboarding, by contrast, shortens the time to competence.',
          ],
        },
        {
          heading: 'What you should be able to decide',
          body: [
            'Having thought onboarding through, you should have a sequence of steps ready for a new start and a clear view of who is responsible for what, so that no part — administrative or training — is missing. That reduces the risk of an early departure and shortens the time to productivity.',
            'A checklist serves the practical running of the first day, and a longer adaptation period follows onboarding itself.',
          ],
        },
      ],
      cta: {
        label: 'Employee retention',
        targetConceptId: 'employee-retention',
        note: 'Onboarding is where retention starts rather than where it is repaired.',
      },
    },
  },

  'employee-retention': {
    en: {
      title: 'Employee retention: keeping people, not just reducing turnover',
      description:
        'What retention involves, how it differs from reactive turnover reduction, and where the main levers are — onboarding, conditions, management, development. No invented return figures.',
      h1: 'Employee retention: keeping people, not just reducing turnover',
      intro:
        'Retention means keeping employees systematically — not merely preventing departures but actively creating reasons why people stay and work well. Compared with firefighting turnover, retention is longer-term and connects recruitment, onboarding, development and culture. This page explains what retention involves, how it differs from reacting to turnover, and where the main levers are. It works with no invented return figures; it offers a framework for treating retention as continuous work, which pays off particularly in shortage occupations.',
      breadcrumb: 'Employee retention',
      sections: [
        {
          heading: 'Retention against reducing turnover',
          body: [
            'Reducing turnover is often a reaction to departures having risen. Retention is proactive — it counts on keeping people from recruitment and onboarding onwards, and it attends to satisfied employees too, so that reasons to leave do not arise. The two complement each other.',
          ],
        },
        {
          heading: 'The main levers',
          body: [
            'Retention rests on several levers rather than one, and in manual and shift operations the stability of rosters and practical facilities count among them.',
            'The effect of any specific measure is worth verifying against your own data rather than adopting someone else’s numbers.',
          ],
          list: {
            intro: 'The levers in question:',
            items: [
              'A sound onboarding and adaptation.',
              'Conditions that are clear and fair.',
              'Management, feedback and recognition.',
              'The opportunity to develop, and a visible prospect to grow into.',
              'Stable shift rosters and practical facilities.',
            ],
          },
        },
        {
          heading: 'What you should be able to decide',
          body: [
            'Having thought retention through, you should be able to say which phases of the employee life cycle to invest in — recruitment, onboarding, development — and how to track whether people stay, against your own data rather than someone else’s.',
            'It connects closely to turnover and to onboarding, which are covered on their own pages.',
          ],
        },
      ],
      cta: {
        label: 'Employee turnover',
        targetConceptId: 'employee-turnover',
        note: 'What turnover is and how to measure it in your own company.',
      },
    },
  },
}
