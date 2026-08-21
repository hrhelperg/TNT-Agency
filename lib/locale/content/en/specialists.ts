import type { LocaleCorpus } from '../types'

/**
 * L1 specialists cluster — English.
 *
 * Thirteen occupations, and the cluster where the Czech sources are most
 * precise about what a certificate does and does not say. That precision is the
 * point of these pages: a welding certificate describes a tested range rather
 * than a trade, electrotechnical competence attaches to an activity and a piece
 * of equipment rather than to a person, and "THP" is an operational category
 * that Czech labour law does not recognise at all.
 *
 * Two things are load-bearing throughout. Statutory instruments are named as
 * Czech instruments and never generalised. And where the Czech says a standard
 * is something EMPLOYERS ask for — ISO 9001, IATF 16949, HACCP — the
 * translation says the same and does not let it drift into a certification this
 * agency holds.
 */
export const EN_SPECIALISTS: LocaleCorpus = {
  welders: {
    en: {
      title: 'Recruiting welders: methods, certificates and the tested range',
      description:
        'What a welder’s certificate actually says under ČSN EN ISO 9606-1 — method, material, position and thickness — the difference between a welding logbook and a test certificate, and how to set a trial weld.',
      h1: 'Recruiting welders: methods, certificates and the tested range',
      intro:
        'An advertisement looking for "a welder" is as unspecific to an applicant as a manufacturer looking for "someone for the machines". Welding is not one skill but a range of combinations — method, material, the shape of the product, the position — and the document a welder brings is not a certificate of occupation but a description of the range in which they passed a test. Where the brief and that range do not meet, a selection process fills with people who can weld, but not what you need. This page shows how to describe the brief, what to read in the document, how to set a trial weld, and what occupational safety adds to this trade.',
      breadcrumb: 'Welders',
      sections: [
        {
          heading: 'What a welder’s document actually says',
          body: [
            'A welder qualification test under ČSN EN ISO 9606-1 does not happen in general terms. The welder welds a test piece under precisely defined conditions, and the certificate then describes the range that has been verified by it. That range — not the word "welder" — is the information recruitment has to work with.',
            'The range is made up of several variables at once, and a change in any of them can mean the document does not cover your work. The standard cited concerns steels; aluminium and its alloys are dealt with in a different part of the same standard, so a certificate for steel says nothing about the ability to weld aluminium.',
          ],
        },
        {
          heading: 'Why an advertisement for "a welder" attracts unusable applicants',
          body: [
            'If the range is missing from the advertisement, the applicant supplies it themselves. Someone applies with a basic course in method 111 on sheet, because they are quite right to call themselves a welder — and arrives at a workplace where method 141 on stainless tube is specified, position PF, and a weld without root backing. Nobody lied; the two sides simply pictured different work under the same word.',
            'The cost is not only in wasted interviews. An imprecise brief also distorts how the position looks on the market: the company concludes that welders are unavailable, when in fact it has not yet described what it needs.',
          ],
        },
        {
          heading: 'Welding logbook, basic course and test certificate',
          body: [
            'Two different documents are mixed up in practice. A welding logbook recording a basic course evidences that the person was taught a given method at a welding school and can work with it. A welder qualification certificate under ČSN EN ISO 9606-1 is the outcome of a test before an examining body and defines the range in which the welder may work where a product standard or a customer requires it.',
            'For ordinary workshop production without special requirements, a logbook and instruction may suffice. As soon as you evidence welding quality to a customer or under standards, the certificate and its range become the deciding document.',
          ],
        },
        {
          heading: 'The trial weld is the decisive step',
          body: [
            'A document says what the person managed on the day of the test under test-house conditions. Whether they can do your work is decided by a trial weld. Prepare a piece that matches your ordinary order — the same material, thickness, position, joint preparation, and if possible the welding procedure used in your shop.',
            'Watch more than the appearance of the finished weld: how the person sets up the power source, whether they read the drawing, how they prepare and clean the material, how they handle the shielding gas, and how they check the weld themselves.',
          ],
        },
        {
          heading: 'Welders from abroad and their documents',
          body: [
            'Recruiting welders from abroad is common, and the document is often issued under the same standard as in the Czech Republic, because it is an adopted international standard. That does not make it usable without further checks. Verify who issued the certificate, what range it contains, whether it is valid, and whether your customer accepts it — for deliveries with documented welding quality that is usually decisive. Where the conditions are not met, a test in the Czech Republic follows.',
            'The second matter is communication. A welder works to a drawing and to a welding procedure, and has to understand safety instructions.',
          ],
        },
        {
          heading: 'Safety, protective equipment and fitness for work',
          body: [
            'Welding has its own risk profile, and recruitment meets it on day one. Besides burns and flying sparks there is arc radiation, which damages both eyes and skin, and welding fume — particularly monitored for stainless steels and surface-treated materials. Extraction at the workplace is therefore addressed, and for some work respiratory protection as well.',
            'Welding away from a fixed welding station carries particular fire-safety requirements under Czech rules: conditions set out in writing for the work in question, and supervision continuing after it has finished.',
          ],
        },
      ],
      cta: {
        label: 'Specialist recruitment',
        targetConceptId: 'specialist-recruitment',
        note: 'Why certification, not the number of applicants, usually decides a specialist hire.',
      },
    },
  },

  'cnc-operators': {
    en: {
      title: 'Recruiting CNC operators and setters: what really decides fillability',
      description:
        'The difference between operator, setter and programmer, the role of the control system, measurement and drawings, single- against multi-machine work, the shift model, and a practical trial at the machine.',
      h1: 'Recruiting CNC operators and setters: what really decides fillability',
      intro:
        'Many stuck CNC hires do not begin with a shortage of people but with a brief that mixes three different positions. Operator, setter and programmer differ in availability, in time to competence and in cost, and an advertisement that merges them into one profile is looking for a candidate matching the highest level on the conditions of the lowest. This page sets out what actually decides whether a CNC position can be filled: knowledge of the control system, working with gauges and drawings, running one machine or several, the shift pattern, and what a practical trial should look like. No wages and no times to fill are stated here.',
      breadcrumb: 'CNC operators',
      sections: [
        {
          heading: 'Operator, setter, programmer — three positions in one advertisement',
          body: [
            'A CNC operator watches the machine through a running programme: loads and unloads parts, monitors the run, checks dimensions against the inspection plan, changes worn tools as instructed and reports deviations. They do not change the machine over to a different order.',
            'A setter is the person who gets an order running on the machine. They clamp the fixture or jaws, measure and enter the tools including offsets, set the workpiece zero, dry-run the programme, cut and measure the first part, and only then hand the machine over to series production. Changeover time and scrap rate are decided here.',
            'A programmer creates the technology and the tool path. Merging the three into one profile is the most common reason such a role stays open.',
          ],
        },
        {
          heading: 'The control system: a real constraint, but a learnable one',
          body: [
            'Heidenhain, Siemens and Fanuc are operated differently, and someone used to one is not as quick on another in the first days. That is a real constraint and there is no point in playing it down. It is also a learnable one: a person who understands machining technology, reads drawings and can measure retrains onto another interface more easily than someone who knows only a sequence of steps on one particular machine.',
            'The practical conclusion for recruitment: insisting on an exact system match narrows the pool enough to lengthen the search. Treating the match as desirable rather than essential usually widens it considerably.',
          ],
        },
        {
          heading: 'Measurement and drawings matter more than the make of machine',
          body: [
            'In selection it works to ask about measurement before asking about machines. Callipers, a micrometer, a dial indicator and limit gauges differ in accuracy and in use, and the answer to "what would you check this dimension with, and why" reveals more about a candidate than a list of the makes they have worked on.',
            'The same applies to drawings. Tolerance bands, geometric tolerances and specified surface roughness determine what happens to a part that has the right dimension and the wrong form.',
          ],
        },
        {
          heading: 'One machine, or several',
          body: [
            'Multi-machine working appears in advertisements more often than the operation warrants. For it to make sense, the machining times, the layout of the workplace and the nature of the parts have to allow it; otherwise it becomes a permanent source of overtime and errors. If you require it, state how many machines and which operations.',
            'The profile differs too. Someone settled on one machine in long-run production knows it perfectly, but changing between orders means a learning period for them. A worker from one-off and small-batch production is used to frequent changeovers and to setting up themselves.',
          ],
        },
        {
          heading: 'The shift model is often the deciding factor',
          body: [
            'For CNC roles, fillability is decided surprisingly often by the shift rather than by skill. Three-shift and continuous operation narrows the pool differently from two-shift working, even among people who want the job. Travel, family circumstances, and whether shifts rotate predictably and the roster is known far enough ahead all play a part.',
            'If the shift pattern is fixed and cannot change, it is better to say so openly and immediately; discovering it later costs both sides time. If it can change, this is often where the greatest scope for filling the role lies.',
          ],
        },
        {
          heading: 'A practical trial at the machine instead of a longer interview',
          body: [
            'A short practical demonstration in the workshop is a reliable filter for these roles. It is not an examination but a chance to see how someone approaches a machine, how they hold a gauge, what they ask and what they verify. A few minutes at the machine says more than a list of machine makes in a CV, and gives the candidate a realistic picture of the work.',
            'A practical trial has its own requirements. Before entering the workshop the candidate must be informed of the risks and equipped with protective equipment, and the demonstration takes place under supervision and within a safe scope.',
          ],
        },
      ],
      cta: {
        label: 'Engineering trades',
        targetConceptId: 'engineering-trades',
        note: 'Where operating, setting and programming sit across the machining trades.',
      },
    },
  },

  electricians: {
    en: {
      title: 'Recruiting electricians: electrotechnical competence in the Czech Republic',
      description:
        'What "decree 50" and "paragraph 6" mean today, why competence attaches to an activity and a piece of equipment rather than to a person, and what to put in a brief so selection can work.',
      h1: 'Recruiting electricians: electrotechnical competence in the Czech Republic',
      intro:
        'A request for an electrician almost always sticks in the same place: the brief says "paragraph 6" or "decree 50", but those labels come from a regulation that is no longer in force, and on their own they say nothing about what the person will do or on what equipment. Electrotechnical competence in the Czech Republic is now governed by Czech government regulation 194/2022 Sb., which replaced decree 50/1978 Sb., and follows on from the Czech act on reserved technical equipment. This page explains how to orient yourself as an employer without substituting for the text of the regulation — the specific levels, intervals and requirements belong in its current wording.',
      breadcrumb: 'Electricians',
      sections: [
        {
          heading: '"Decree 50" and "paragraph 6": what those words mean now',
          body: [
            'Decree 50/1978 Sb. was in force for decades, and its numbering became so established that it is still used on both sides — an employer writes "paragraph 6" into an advertisement and a candidate answers with the same in a CV. Electrotechnical competence is now governed by Czech government regulation 194/2022 Sb., which replaced that decree. The colloquial label therefore has no basis in the regulation in force, and the old and new structures cannot be mapped onto one another mechanically.',
          ],
        },
        {
          heading: 'Competence attaches to an activity and to equipment, not only to a person',
          body: [
            'A document evidencing competence is not a universal licence. What decides is a combination of three things: what activity is to be performed, on what equipment, and under what regime. Operating a switchboard presupposes different competence from installation and repair, working on de-energised equipment different competence from working near live parts. The voltage level matters too — low voltage is not the same as high voltage.',
            'A brief of the kind "we are looking for an electrician with the papers" therefore gives selection nothing to work with. Once the voltage level, the type of equipment and the activity appear in the request, the candidate pool becomes something you can actually assess.',
          ],
        },
        {
          heading: 'Reserved technical equipment, and what follows from it',
          body: [
            'Electrical equipment, together with lifting, pressure and gas equipment, falls among reserved technical equipment under Czech act 250/2021 Sb. That act governs requirements for their safe operation and for the competence of the persons and organisations performing activities on them; the government regulation on electrotechnical competence is its implementing regulation.',
            'Two levels follow for an employer, and they are frequently confused in requests. The first concerns persons — who may do what. The second concerns the organisation and the equipment — authorisation for activities on them.',
          ],
        },
        {
          heading: 'Maintenance electrician, plant electrician, installation electrician',
          body: [
            'The three most commonly requested profiles differ enough in the nature of the work that they do not substitute for one another. A maintenance electrician finds and clears faults on machines while production runs: reads schematics, is at home with the periphery of control systems, with frequency converters, drives and sensors, and decides under the pressure of a stoppage. Diagnosis is the point, not routine.',
            'A plant electrician looks after the site’s electrical equipment and its operation — distribution, switchboards, lighting, minor modifications, material for inspections and clearing the faults they identify.',
          ],
        },
        {
          heading: 'Validity, re-examination and fitness for work',
          body: [
            'A document evidencing competence is not permanent. The regulation provides for competence to be verified again at given intervals, and the document has limited validity; the specific intervals and the form of re-examination are set by the government regulation and should be checked against its current wording.',
            'Personnel records therefore need not only a copy of the document but the date its validity ends — something to watch in advance, not at the moment a worker may no longer go near the equipment.',
          ],
        },
        {
          heading: 'What to put in the request so selection can work',
          body: [
            'A reliable check on a brief is whether an electrician who does not know your company could answer from it. If they could, the selection is not decided when documents are checked before a start date but much earlier — and among candidates who genuinely hold competence for that work.',
            'A brief described that way also speeds up pre-selection: knowing the equipment and the activity, the document can be gone through with the candidate before the interview, verified against originals along with identity.',
          ],
        },
      ],
      cta: {
        label: 'Maintenance technicians',
        targetConceptId: 'maintenance-technicians',
        note: 'Where electrical competence sits inside a maintenance role.',
      },
    },
  },

  'maintenance-technicians': {
    en: {
      title: 'Maintenance and technical service: filling technical roles',
      description:
        'Why maintenance is harder to fill than the production around it: breadth of competence, preventive against reactive work, on-call duty and travel, handover documentation, and promoting from within.',
      h1: 'Maintenance and technical service: filling technical roles',
      intro:
        'Maintenance is where a shortage of people shows quickly and expensively: the machine stands, the plan slips and operators wait. It is filled differently from the production around it — the requirement is not one skill but a combination of mechanics, electrical work, pneumatics or hydraulics, and increasingly basic work with the machine’s control system. On top come conditions a candidate weighs before the job content: on-call duty, travel and shift cover. This page describes what to settle in the brief, how to assess evidence of competence, and why promoting an operator from within is a full route rather than a fallback.',
      breadcrumb: 'Maintenance technicians',
      sections: [
        {
          heading: 'Why maintenance is harder to fill than the production around it',
          body: [
            'You look for an operator by one main capability and a training period. For maintenance the brief is different: one person on a shift has to cover a varied machine park and deal with a mechanical fault, with pneumatics or hydraulics, and with what is happening in the switchboard. In many operations work with the machine’s control system is growing — not programming, but the ability to tell whether the problem is in a sensor, in the mechanics or in the programme.',
            'Breadth of competence has a legal side as well. Intervention in the electrical part of equipment is tied to electrotechnical competence under Czech law.',
          ],
        },
        {
          heading: 'Roles in maintenance and how they differ',
          body: [
            'Job titles differ from company to company, and the title itself says little about the content of the work. It is more useful to describe where the responsibility of a role ends and where external service or the machine supplier begins.',
            'The misunderstanding arises mainly between setter and maintenance technician: a setter keeps the machine running between orders and is measured by changeover time, while a maintenance technician is responsible for the technical condition of equipment over a longer horizon. If one person does both, say so in the brief.',
          ],
        },
        {
          heading: 'Preventive and reactive maintenance: different brief, different person',
          body: [
            'An operation on planned maintenance needs discipline: keep to the plan, keep records, watch spare parts and prepare a shutdown in advance. An operation that mostly fights breakdowns needs a different temperament — quick diagnosis under pressure, the nerve to decide on a temporary fix, and tolerance for the phone ringing at night.',
            'The ratio between planned and breakdown work is among the most valuable things you can put in a brief. Where it is missing, you risk parting during the probationary period.',
          ],
        },
        {
          heading: 'On-call duty, travel and shift cover',
          body: [
            'Acceptance of an offer here is often decided by a condition unrelated to expertise: how often and in what pattern on-call duty is held. The Czech Labour Code treats on-call duty as time when an employee is outside their rostered shifts, at an agreed place away from the workplace, ready for work. It must be agreed, remuneration for it is due under the Labour Code, and work performed during it beyond the set weekly working time is overtime.',
            'For a candidate it is an intrusion into private life, judged together with the travelling distance. State it in the brief.',
          ],
        },
        {
          heading: 'Documentation and handover between shifts',
          body: [
            'Maintenance is a role where what is handed over is not a part in progress but a machine in a state. When someone leaves a shift saying "it is running on a temporary fix for now" and it is written down nowhere, the loss shows up at the next breakdown. Among the capabilities worth verifying is how a candidate records an intervention: what the cause was, what they replaced, and what remains temporary.',
            'Part of the documentation is mandatory. For reserved technical equipment, Czech act 250/2021 Sb. governs requirements for checks, inspections and the competence of the persons performing them.',
          ],
        },
        {
          heading: 'Passive candidates and the route from within',
          body: [
            'An experienced maintenance technician is not usually looking for work. They are employed and judge an offer from a position where nothing is urgent. That changes the whole process: an advertisement alone is generally not enough, referrals and direct approaches matter, selection runs longer, and the offer has to be intelligible the first time.',
            'The second real route leads from within. An operator or setter who knows the machine park, the technology and the people has a head start that cannot be bought from outside. What they lack is the document and the method — and both can be addressed.',
          ],
        },
      ],
      cta: {
        label: 'Electricians',
        targetConceptId: 'electricians',
        note: 'What electrotechnical competence covers, and what it does not.',
      },
    },
  },

  'quality-roles': {
    en: {
      title: 'Quality roles: inspection, metrology and audits',
      description:
        'Separating the levels from inspector to quality manager, what to verify about measurement, the Czech metrology framework, how employers state system standards, and why independence matters.',
      h1: 'Quality roles: inspection, metrology and audits',
      intro:
        'A brief for a position "in quality" is among the least precise in recruitment. The same label covers a person sorting parts at the line and a person leading a customer audit — and between them lie several levels of competence, different responsibility and a different candidate pool. This page breaks quality down into the roles manufacturing operations actually fill, and describes what to verify: the ability to measure and read a drawing, work with calibration and documentation, handling complaints, and the authority to stop a delivery. System standards are described here as employers state them in their briefs.',
      breadcrumb: 'Quality roles',
      sections: [
        {
          heading: 'The ladder from inspection to management',
          body: [
            'Quality roles form a fairly clear sequence, and it is worth knowing which rung a brief is actually on. The difference between adjacent rungs is not diligence but what the person decides and what outputs they leave behind.',
            'In smaller operations the rungs merge and one person does inspection, metrology and complaints. That is legitimate, but it has to appear in the brief — otherwise candidates arrive from one rung while the company expects someone to cover three.',
          ],
        },
        {
          heading: 'Measuring competence is the main axis of selection',
          body: [
            'Differences between candidates show reliably in measurement. Callipers and a micrometer can be mastered by almost anyone after instruction; the difference lies in whether the person reads a drawing including tolerances and geometric specifications, selects a gauge appropriate to the dimension, and recognises when that accuracy is not enough and a coordinate measuring machine is needed.',
            'A practical test is short and convincing: give the candidate a drawing and a part and have them describe what they would measure the dimension with and how, and what they would do with a result at the tolerance limit.',
          ],
        },
        {
          heading: 'Calibration and the Czech metrology framework',
          body: [
            'The metrological part of the role rests on someone being able to defend a measurement result. Czech act 505/1990 Sb. on metrology sets out the classification of measuring instruments and, for so-called specified measuring instruments, requires verification; under that act verification is entrusted to state metrology and authorised bodies, not to a company metrologist. Other working instruments the company maintains by calibration according to its own metrological rules and intervals.',
            'The concrete question for a brief follows: does the company have specified measuring instruments, who keeps their records, and who decides on intervals.',
          ],
        },
        {
          heading: 'System standards, as employers state them',
          body: [
            'System standards appear regularly in briefs: ISO 9001 as a general framework for a quality management system, IATF 16949 for suppliers to the automotive industry, and HACCP as a food-safety system in food production. We describe these as requirements employers state, not as certifications held by a staffing agency.',
            'What matters for a candidate profile is what the requirement means in practice: familiarity with the documentation and records, experience of an internal or customer audit, and the ability to defend a procedure.',
          ],
        },
        {
          heading: 'Complaints, 8D and everyday documentation',
          body: [
            'Daily work in quality is not measurement but writing. Inspection records, protocols, batch release, blocking, descriptions of non-conformity and responses to complaints make up most of the output — and they are what remains when a problem is examined months later.',
            'Customer complaints have a settled structure in supply chains; in the automotive industry the 8D format is commonly required, with immediate containment, root-cause analysis and verification of effectiveness. This is simple to check: have the candidate describe one complaint they ran from receipt to closure.',
          ],
        },
        {
          heading: 'Independence, and why the sector weighs here',
          body: [
            'Quality performs its function only when the person who stops a batch is not assessed on the output of the shift they are stopping. Before opening the position, settle who the role reports to, what it may decide alone, and who decides in a dispute with production. Candidates ask, and an evasive answer is a warning sign to experienced people.',
            'The sector weighs more here than in other technical roles. An automotive supplier works with a different documentation culture and a different escalation tempo from food production, where hygiene enters alongside measurement.',
          ],
        },
      ],
      cta: {
        label: 'Specialist recruitment',
        targetConceptId: 'specialist-recruitment',
        note: 'How qualified roles are filled differently from operational ones.',
      },
    },
  },

  'shift-supervisors': {
    en: {
      title: 'Shift supervisors and first-line management: promote or hire in',
      description:
        'The four jobs a supervisor holds at once, what promoting from within gains and lacks, what hiring in brings and costs, what to verify, and what a promoted supervisor needs in the first months.',
      h1: 'Shift supervisors and first-line management: promote or hire in',
      intro:
        'A supervisor or shift leader position usually opens at a bad moment: someone has left, the shift is coming apart, and the decision falls between two options — promote an experienced person from the floor, or look outside. The two have different costs and different risks, and neither is universally right. This page compares them without varnish, describes what to verify in first-line management, and covers what a promoted supervisor needs in the first months, so that a company does not lose a good operator and gain a supervisor who does not work.',
      breadcrumb: 'Shift supervisors',
      sections: [
        {
          heading: 'Four jobs at once',
          body: [
            'A supervisor or shift leader holds four things at the same time: people, the plan, quality and safety. Within one shift they switch between allocating people to positions, reacting to a machine stoppage or an absence, deciding on a non-conforming part, and making sure work is done safely and in the prescribed protective equipment.',
            'A job description that says only "running the shift" tells a candidate almost nothing about which of the four dominates in your operation.',
          ],
        },
        {
          heading: 'Promoting from within: what you gain and what will be missing',
          body: [
            'Someone from the floor brings what cannot be bought: they know the technology, the machine park, the habits of the shift and where mistakes usually happen. They need no months to understand the product, and people take them as someone who knows what they are talking about. Where continuity is the priority, that is a decisive advantage.',
            'What they usually lack is the other half: leading people they were working beside yesterday. That is a different job from the one they were good at, and it is the part that has to be supported rather than assumed.',
          ],
        },
        {
          heading: 'Hiring in: what it brings and what it costs',
          body: [
            'Someone from outside brings method and comparison. They have seen a different shift arrangement, different handling of deviations, a different way of running a meeting — and they carry no history of relationships on the floor. Where the aim is to change how the shift is led rather than to fill a slot in the roster, this route is usually more effective.',
            'The cost is time and legitimacy. Without knowledge of the technology and the product they cannot decide much in the first weeks.',
          ],
        },
        {
          heading: 'What to verify for this role',
          body: [
            'Self-assessment is no help here — almost every candidate says they can lead people. What works is concrete situations from their own practice and the question of what they did, not what they think about leadership.',
            'State the size of the team in the brief as a number from your own operation: leading five people and leading fifty are two different jobs even where the position has the same name.',
          ],
        },
        {
          heading: 'Why this role decides the stability of a shift',
          body: [
            'First-line management is where it is decided daily whether people stay. The supervisor sets how a new starter is spoken to on day one, whether anyone notices that someone is struggling, how overtime is shared out, and whether a complaint gets anywhere.',
            'Filling this role therefore affects the stability of a whole shift more than filling any individual position on it.',
          ],
        },
        {
          heading: 'Preparing a promoted supervisor',
          body: [
            'A promotion is a period, not a moment. A new supervisor needs to know what they decide themselves and what they do not, to have their own manager available in the first weeks, to go through training on the duties of a managing employee including occupational safety, and to have a format in which they hand the shift over.',
            'It also helps to tell the shift in advance why they were chosen — an unexplained promotion gets interpreted by the team in its own way.',
          ],
        },
      ],
      cta: {
        label: 'Employee retention',
        targetConceptId: 'employee-retention',
        note: 'Why the first line of management is where retention is actually decided.',
      },
    },
  },

  'automation-technicians': {
    en: {
      title: 'Recruiting automation and PLC technicians: what actually defines the role',
      description:
        'What sits under "automation", which requirements come from Czech regulation and which are industry convention or a company’s own choice, how to treat control platforms in a brief, and why safety functions need a separate question.',
      h1: 'Recruiting automation and PLC technicians: what actually defines the role',
      intro:
        'Automation is unusual among technical trades in that it cannot be described by one discipline. Someone setting up a control system at a line moves between electrical engineering, mechanics and software, and depending on which of those three your operation needs most, the right candidate looks different. A brief of the kind "we are looking for an automation technician" therefore says almost nothing on its own. This page separates what follows from regulation, what is merely industry convention, and what each operation decides for itself.',
      breadcrumb: 'Automation technicians',
      sections: [
        {
          heading: 'What sits under "automation"',
          body: [
            'Roles with very different content meet under one name. In one place it is mainly maintenance and diagnosis of lines already running, in another commissioning new equipment, elsewhere modifying programmes as production changes, or designing the control part of a new machine. Each of those emphasises a different skill.',
          ],
        },
        {
          heading: 'What follows from regulation, and what does not',
          body: [
            'It helps to separate three things that are routinely mixed together in advertisements.',
            'Regulated competence: if a person is to perform activity on electrical equipment, their competence is governed by Czech government regulation 194/2022 Sb. That is a legal requirement attached to the activity and the equipment, not to a job title. Where a company operates reserved technical equipment, the Czech act on reserved technical equipment applies as well.',
            'Industry convention: familiarity with a particular manufacturer’s environment is common in briefs but imposed by no regulation.',
            'A company’s own choice: which platform is in use, and how far a technician may modify a running programme, is set by each operation for itself.',
          ],
        },
        {
          heading: 'Control platforms, and how to treat them in a brief',
          body: [
            'Knowledge of a specific platform is the most common reason a brief narrows the pool unnecessarily. Environments differ between manufacturers, but the logic of the work largely transfers — a technician who understands what the control system is supposed to do will find their way around another environment, given time.',
            'It is therefore worth separating in the brief what is genuinely essential from what can be learned.',
          ],
        },
        {
          heading: 'The safety part, and why to ask about it separately',
          body: [
            'The safety circuits of machinery are the area where candidates’ experience differs most and where it is hardest to tell from a CV. Some have worked only in process logic; others have regularly dealt with safety functions and their documentation.',
            'For an operation that matters, because intervention in the safety part of equipment has different consequences from a change to process logic.',
          ],
        },
        {
          heading: 'What to ask during selection',
          body: [
            'For automation it works to ask about concrete situations rather than for a list of technologies. A description of a fault actually dealt with, including how the candidate reached the cause, says more about how they work than a list of abbreviations.',
            'It is equally worth going through how the candidate works with documentation and what they leave behind them.',
          ],
        },
      ],
      cta: {
        label: 'Maintenance technicians',
        targetConceptId: 'maintenance-technicians',
        note: 'Where automation work meets day-to-day maintenance.',
      },
    },
  },

  'engineering-roles': {
    en: {
      title: 'Engineering roles: why the job title tells you nothing about the candidate',
      description:
        'Four different worlds under one name — process, manufacturing, industrial and measurement engineering — when "engineer" is a regulated activity in the Czech Republic and when it is only a label, and education against experience.',
      h1: 'Engineering roles: why the job title tells you nothing about the candidate',
      intro:
        'The word engineer is used in Czech operations for roles whose only shared feature is that they concern technology. One improves how production runs, another handles the launch of a new product, a third designs the layout of a workplace, a fourth looks after measurement and data. A brief that says only "we are looking for an engineer for production" therefore usually brings applicants who are not comparable with one another. This page helps name which of those roles you actually mean, and points out one distinction routinely overlooked in recruitment.',
      breadcrumb: 'Engineering roles',
      sections: [
        {
          heading: 'Four distinct worlds under one name',
          body: [
            'Engineering roles in manufacturing divide by what their output attaches to. Process engineering turns on how production runs and why it behaves as it does. Manufacturing engineering sits closer to launches and changes — introducing a new part, moving a line, altering a procedure.',
            'Industrial engineering deals with the organisation of work, and measurement and data roles with what is recorded and what can be concluded from it.',
          ],
        },
        {
          heading: 'When "engineer" is a regulated activity and when it is only a label',
          body: [
            'This distinction is worth knowing, because it is a common source of misunderstanding.',
            'A regulated activity: authorisation in construction under Czech act 360/1992 Sb. applies to selected activities in construction and design. Anyone performing such an activity needs the authorisation — that is a legal requirement, not a convention.',
            'Only a label: for the great majority of engineering positions in manufacturing, "engineer" is a job title a company chooses. No regulation attaches to it, and requiring it as though it were one narrows the pool for no reason.',
          ],
        },
        {
          heading: 'Education against experience',
          body: [
            'Engineering positions often carry an automatic requirement for a technical university degree. In many operations that is justified; in others it is a convention that needlessly excludes experienced people who worked their way to the role from production.',
            'More useful than a level of education is the question of what kind of problem the person has to be able to take apart independently.',
          ],
        },
        {
          heading: 'What a brief should contain',
          body: [
            'Engineering positions fill better when the brief describes an outcome rather than a list of tools. "We are looking for someone to reduce the number of non-conforming parts on line X" is more usable for a search than a list of methodologies.',
            'It matters equally to say who the person will work with and what authority they have. An engineer expected to change an established procedure without any authority over it is being set an impossible brief.',
          ],
        },
        {
          heading: 'Where these people come from',
          body: [
            'Engineering positions are filled from three sources: promotion from within, a move from another operation in the same sector, and a move from a different sector. Each has a drawback worth knowing in advance.',
            'Someone from inside knows the operation and the people but may lack method. A candidate from another company in the sector brings comparison but expects comparable conditions. A candidate from a different sector brings a fresh view and needs longer to understand the product.',
          ],
        },
      ],
      cta: {
        label: 'Process and design engineers',
        targetConceptId: 'process-and-design-engineers',
        note: 'Two roles that are confused with each other more than any other pair.',
      },
    },
  },

  'process-and-design-engineers': {
    en: {
      title: 'Process and design engineers: two roles that get confused',
      description:
        'Where one role ends and the other begins, production engineering as a discipline of its own, drawings as the most verifiable skill, and why CAD and CAM are a company’s choice rather than a requirement of the trade.',
      h1: 'Process and design engineers: two roles that get confused',
      intro:
        'Process engineer and design engineer are among the roles most often confused in advertisements, although their work begins at opposite ends. A design engineer is responsible for what a part should look like and what it has to satisfy. A process engineer is responsible for how such a part will actually be made in a particular operation — by what procedure, on what machine, with what tooling and in what time. Confusing them means looking for someone with entirely different experience. This page sets out how the two differ, what can be verified in each, and what depends on your own equipment and habits.',
      breadcrumb: 'Process and design engineers',
      sections: [
        {
          heading: 'Where one role ends and the other begins',
          body: [
            'A design engineer works from a functional requirement, and the output is documentation describing a part or an assembly — shape, dimensions, material, tolerances, surface requirements.',
            'A process engineer takes that documentation and converts it into a manufacturing procedure. They deal with the choice of machine and tooling, the clamping, the sequence of operations, the times, and whether the part can be made in that operation at all.',
          ],
        },
        {
          heading: 'Production engineering as a discipline of its own',
          body: [
            'Technical preparation of production covers more than writing a procedure. It includes managing documentation and its versions, recording changes, tool management, time standards, and working with purchasing and quality.',
            'One practical consequence for recruitment: a candidate who wrote procedures for one-off production was solving something different from someone out of high-volume manufacturing.',
          ],
        },
        {
          heading: 'Drawings are the most verifiable skill',
          body: [
            'Working with a drawing is, for both roles, the most verifiable thing selection can assess. It is not only reading dimensions but understanding tolerances, specified surface quality and geometric requirements.',
            'A practical check over a real drawing from your own operation says more in a few minutes than a list of software in a CV — and it is fair to both sides, because the candidate sees the work they would be doing.',
          ],
        },
        {
          heading: 'CAD and CAM: a company’s requirement, not the trade’s',
          body: [
            'The particular CAD or CAM system is chosen by the company. No regulation prescribes it, and moving between systems is easier than usually assumed — especially for experienced people who understand what they want from the system.',
            'What decides is whether the operation has capacity to train. If a process engineer starts as the only one and has to take over orders immediately, an exact match matters more than it otherwise would.',
          ],
        },
        {
          heading: 'How to narrow a brief sensibly',
          body: [
            'The most common mistake is a brief listing every system used in the company and every type of production. The result is a profile nobody matches.',
            'It is better to describe what the person will do in the first three months, and to say what has to be known immediately and what can be learned. That split also makes the interview easier — you then ask about things that actually happen.',
          ],
        },
      ],
      cta: {
        label: 'Engineering roles',
        targetConceptId: 'engineering-roles',
        note: 'The wider family of engineering positions and what separates them.',
      },
    },
  },

  'engineering-trades': {
    en: {
      title: 'Engineering trades: machining, welding and fitting',
      description:
        'The families of engineering trades and how they differ, why operating, setting and programming are not the same level, and why drawings and gauges decide fillability more than the make of machine.',
      h1: 'Engineering trades: machining, welding and fitting',
      intro:
        'Engineering trades cover several separate crafts with different training, different documents and differently sized candidate pools. A brief saying "we are looking for a machinist" therefore leads nowhere — a machinist, a welder, a fitter and a toolmaker differ not only in what they do but above all in what their competence can be verified against. This page sets out the individual families, the line between operating, setting and programming, and why reading a drawing and working with a gauge decide fillability more than the make of machine.',
      breadcrumb: 'Engineering trades',
      sections: [
        {
          heading: 'The families and how they differ',
          body: [
            'Engineering production rests on several crafts that sit alongside one another but do not substitute. The difference is not a level of dexterity but what they work with: a machinist removes material, a welder joins it, a fitter assembles and fits, a toolmaker makes and maintains the tooling and fixtures with which everything else is then made.',
            'Where a brief blurs the boundary between them, applicants arrive from a neighbouring craft and neither side is at fault.',
          ],
        },
        {
          heading: 'Operating, setting and programming are not the same',
          body: [
            'The most common mistake in a brief concerns the level rather than the trade. An operator watches the machine, loads and unloads parts, checks dimensions and handles routine situations. A setter prepares the machine for a different order — clamps the fixture, measures tools, sets the zero point, adjusts offsets and cuts the first part. A programmer creates the technology and the tool path.',
          ],
        },
        {
          heading: 'Drawings and gauges are the real dividing line',
          body: [
            'Two areas of questioning yield the most in selection: what the candidate reads from a drawing, and what they do with a gauge. Reading a drawing does not mean finding a dimension. It means understanding the tolerance band, geometric tolerances, specified surface roughness, sections and views, and welding symbols — that is, what happens when the dimension is right and the form is not.',
          ],
        },
        {
          heading: 'One machine, several machines, and moving between sectors',
          body: [
            'The second axis is breadth. A worker settled on one type of machine in long-run production has a different profile from one who moves between machines in one-off and small-batch work, reads the drawing themselves and sets up themselves.',
            'Multi-machine working is not only a question of skill but of workplace layout and machining times; without those it cannot be required.',
          ],
        },
        {
          heading: 'Describing the trade: the national registers as a shared vocabulary',
          body: [
            'For describing a position it pays not to invent your own terminology. The Czech national occupations register describes occupations, typical positions and their professional requirements; the Czech national qualifications register assigns professional qualifications with an assessment standard, which can be evidenced by a certificate after an examination before an authorised person under the Czech act on verification and recognition of further education.',
          ],
        },
      ],
      cta: {
        label: 'Welders',
        targetConceptId: 'welders',
        note: 'The trade where the document says least about the job title and most about a tested range.',
      },
    },
  },

  'technical-office-roles': {
    en: {
      title: 'Technical office roles: what belongs in them and how to fill them',
      description:
        'What the Czech "THP" category covers, why it is an operational classification rather than a legal concept, which roles usually sit in it, and why filling them stands or falls on the brief.',
      h1: 'Technical office roles: what belongs in them and how to fill them',
      intro:
        'The Czech abbreviation THP — technical and administrative staff — is used daily in manufacturing and logistics companies, but every operation draws the boundary of the category for itself. In one place it covers only technical preparation of production; in another it takes in supervisors, planning, purchasing and payroll. For recruitment that has one important consequence: the same job title means different work in every company, so an advertisement without a description of the actual content attracts people who were doing something else. This page explains what the category covers in practice and how it differs from manual trades.',
      breadcrumb: 'Technical office roles',
      sections: [
        {
          heading: 'What the category means in Czech practice',
          body: [
            'Technical and administrative staff is an operational classification, not a legal concept — the Czech Labour Code does not recognise such a category and attaches no special rights or duties to it. Companies use it in their organisational structure, budgets and reporting to distinguish manual trades, whose work is tied directly to a production operation, from technical and administrative work.',
            'That is worth saying to a foreign reader plainly, because a category that appears everywhere in Czech job adverts and nowhere in the law is easy to mistake for a qualification.',
          ],
        },
        {
          heading: 'Which roles usually belong here',
          body: [
            'The scope differs with the size of the operation. In a smaller company one person covers both technology and planning; in a larger one these are separate posts with their own interfaces.',
            'Most commonly the category takes in technical preparation of production, production planning, quality, purchasing, logistics administration, and the operation’s administrative support.',
          ],
        },
        {
          heading: 'Why filling these roles stands or falls on the brief',
          body: [
            'For manual trades the work can be described reasonably well by machine and operation. For technical and administrative roles the content is set by which systems the operation uses, how many orders it plans, how document changes are organised, and how many people the person deals with daily.',
            'Two production planners with the same job title can therefore be doing work with almost nothing in common.',
          ],
        },
        {
          heading: 'Using the national occupations register for requirements',
          body: [
            'The Czech national occupations register, maintained by the Ministry of Labour and Social Affairs, describes individual occupations and their typical positions, including the usual work activities, the knowledge and skills needed and the corresponding level of education.',
            'For a brief it is useful mainly as a neutral vocabulary: comparing the catalogue description with what the person will actually do quickly shows where your expectations differ from the usual ones.',
          ],
        },
        {
          heading: 'The administrative side',
          body: [
            'Alongside technical roles, the category includes the operation’s administrative support — payroll and personnel administration, invoicing, records and purchasing administration. These posts are filled differently from technical roles: what decides is knowledge of the particular system the work is kept in, currency with the applicable regulations, and reliability against deadlines.',
          ],
        },
      ],
      cta: {
        label: 'Employer glossary',
        targetConceptId: 'employer-glossary',
        note: 'Other Czech staffing terms that do not translate cleanly.',
      },
    },
  },

  'logistics-specialists': {
    en: {
      title: 'Specialist logistics roles: planning, dispatch and warehouse management',
      description:
        'The thin layer above the operational one: where operational ends and specialist begins, which roles make it up, depth of system knowledge as a real selection criterion, customs work, and planning under instability.',
      h1: 'Specialist logistics roles: planning, dispatch and warehouse management',
      intro:
        'Most recruitment writing about logistics describes the operational layer — the people who physically receive, store, pick and dispatch goods. Above it sits a considerably thinner layer of specialist roles that decide what moves when and where: dispatch, transport planning, warehouse management, supply and customs. These positions are filled differently from operational shifts. What decides is knowledge of particular systems, the ability to plan in conditions that change during the day, and responsibility for a decision whose cost only shows later.',
      breadcrumb: 'Logistics specialists',
      sections: [
        {
          heading: 'Where the operational layer ends and the specialist one begins',
          body: [
            'The boundary is best drawn by who carries out the plan and who creates it. A warehouse worker, a materials handler, a picker or a dispatcher works to a brief the system and the shift bring them. A dispatcher, planner or warehouse manager assembles that brief, changes it during the day and carries its consequences.',
          ],
        },
        {
          heading: 'Which roles make up this layer',
          body: [
            'Titles differ from company to company, but the content of the roles recurs. In a brief it is therefore better to describe the responsibility than the title — the same title means something different in a small warehouse and in a distribution centre.',
            'The Czech national occupations register describes occupations and their usual requirements, and is a suitable starting point where a brief needs clarifying.',
          ],
        },
        {
          heading: 'Working with systems as a real selection criterion',
          body: [
            'For this layer, working with systems is one of the few criteria selection can honestly verify. It is not about the brand of WMS or ERP named in a CV. What decides is depth: the work of someone who only confirms tasks in the system differs from that of someone who creates master data, sets putaway rules, resolves stock discrepancies and can get an answer out of the system.',
          ],
        },
        {
          heading: 'Customs work and consignments outside the EU customs territory',
          body: [
            'Some logistics operations manage without customs work; others rest on it. Where goods cross the boundary of the EU customs territory, you need someone who can prepare and lodge customs documents, work with customs procedures and representation, and keep track of the associated documentation. That competence is usually tied closely to a particular type of goods.',
          ],
        },
        {
          heading: 'Planning under instability',
          body: [
            'Planning roles in logistics differ from planning in manufacturing in how fast the inputs change: a delayed delivery, a cancelled carrier, missing people on a shift, an exceptional order. The qualification does not show on a calm day but at the moment the plan stops holding.',
            'In selection it is therefore worth having the candidate describe a specific day when the plan failed.',
          ],
        },
        {
          heading: 'Why this layer is thin on the market',
          body: [
            'Every warehouse has many operational roles and only a few specialist ones — warehouse management, dispatch, planning, system administration. The competence moreover forms over time inside a particular operation rather than at school, so the people who have it are usually not looking for work and do not respond to advertisements.',
            'No figures on the availability of these occupations are stated here.',
          ],
        },
      ],
      cta: {
        label: 'Direct sourcing',
        targetConceptId: 'direct-sourcing',
        note: 'How people who are not looking for work are approached.',
      },
    },
  },

  'purchasing-and-supply': {
    en: {
      title: 'Purchasing and supply: filling roles where authority decides',
      description:
        'Three levels under one job title, what counts as sector knowledge and what can be learned, where purchasing meets quality and logistics, what selection can actually verify, and supplier risk as a skill in its own right.',
      h1: 'Purchasing and supply: filling roles where authority decides',
      intro:
        'Purchasing is among the areas where a job title and the actual responsibility diverge most. "Buyer" covers both the person who orders to a plan and watches dates, and the person who selects suppliers and negotiates framework terms years ahead. The difference between them is not experience but the degree of decision-making authority — and that is what determines who is worth approaching. This page helps define the position and points out what can be verified in candidates and what stays tied to a particular company and its supplier base.',
      breadcrumb: 'Purchasing and supply',
      sections: [
        {
          heading: 'Three levels under one title',
          body: [
            'Operational purchasing works inside given rules: it orders to the needs of production, watches confirmations and dates, handles expediting and deviations. It decides how, not from whom.',
            'Inventory planning sits between purchasing and production. It determines how much of what should be available and when, and carries the consequences of both errors — stopped production and needlessly tied-up stock.',
            'Strategic purchasing selects suppliers and negotiates terms. It is the level where a decision has effects for years.',
          ],
        },
        {
          heading: 'Sector knowledge, and what can be learned',
          body: [
            'Industry convention: knowledge of a particular commodity group — steel, plastics, electronic components, packaging — carries real weight. Someone who has bought castings for years understands where problems with dates and quality arise, and that is not quickly made up.',
            'A company’s own specifics: the particular enterprise system, the approval rules, the history of supplier relationships. These are learned on the job and should not be treated as entry requirements.',
          ],
        },
        {
          heading: 'Where purchasing meets quality and logistics',
          body: [
            'Purchasing does not work in isolation. On supplier complaints it overlaps with quality management, on imports with customs and transport, on planning with production.',
            'For recruitment that means establishing which part of those interfaces falls inside the role. A company where the buyer handles complaints and supplier assessment themselves is looking for a different person from one where they do not.',
          ],
        },
        {
          heading: 'What selection can actually verify',
          body: [
            'In purchasing, the skills most talked about are the hardest to verify. Negotiation cannot be read from a CV, and general questions about it do not help.',
            'More usable is to have the candidate describe a specific situation where a supplier missed a date or a quality requirement — what they did, whom they involved, and how it ended.',
          ],
        },
        {
          heading: 'Supplier risk as a skill in its own right',
          body: [
            'Purchasing is judged on price but revealed by how it handles failures. Working with supplier risk is what separates an experienced person from someone who can only place orders.',
            'It covers watching a supplier’s financial condition, knowing where the company depends on a single source, preparing an alternative before it is needed, and recognising a warning sign early.',
          ],
        },
        {
          heading: 'How to describe the role in a brief',
          body: [
            'The most reliable way to clarify a brief is to answer one question: what does this person decide alone, and what do they submit for approval? The answer defines the role more precisely than any job title.',
            'Add which commodities are involved, whether suppliers are domestic or foreign, and who the counterpart inside the company is.',
          ],
        },
      ],
      cta: {
        label: 'Role brief',
        targetConceptId: 'role-brief',
        note: 'Writing a brief that can actually be searched against.',
      },
    },
  },
}
