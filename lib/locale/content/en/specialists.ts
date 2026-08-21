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
        'What a welder’s certificate says under ČSN EN ISO 9606-1 — method, material, position and thickness — the logbook against the test certificate, and how to set a trial weld.',
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
          list: {
            intro: 'The variables the certificate names:',
            items: [
              'The welding method in its numeric designation under ČSN EN ISO 4063 — for example 111 (manual metal arc welding with a covered electrode), 135 (MAG with solid wire), 136 (flux-cored wire), 141 (TIG with a tungsten electrode)',
              'The base material group — unalloyed and stainless steel are not the same thing',
              'The product type — plate or tube',
              'The weld type — butt or fillet',
              'The welding position in the designation under ČSN EN ISO 6947, for example PA, PB, PC or PF; some positions cover others',
              'The material thickness and, for tubes, the diameter, from which the range of validity is derived',
              'The root treatment — with or without backing',
            ],
          },
        },
        {
          heading: 'Why an advertisement for "a welder" attracts unusable applicants',
          body: [
            'If the range is missing from the advertisement, the applicant supplies it themselves. Someone applies with a basic course in method 111 on sheet, because they are quite right to call themselves a welder — and arrives at a workplace where method 141 on stainless tube is specified, position PF, and a weld without root backing. Nobody lied; the two sides simply pictured different work under the same word.',
            'The cost is not only in wasted interviews. An imprecise brief also distorts how the position looks on the market: the company concludes that welders are unavailable, when in fact it has not yet described what it needs. A brief that states the range works the other way, as a filter: someone without that range usually does not apply, and whoever does apply brings a document that can be compared against the requirement.',
          ],
          list: {
            intro: 'What belongs in the advertisement:',
            items: [
              'The method, the material group, the product type, the position and the range of thicknesses',
              'A distinction between workshop work and installation on site or at a customer',
              'Whether work is done to a welding procedure specification (WPS) and to a drawing',
              'Whether you require a valid test certificate, or whether a logbook and instruction are enough',
              'The shift pattern — in this trade it markedly affects how many people are interested',
            ],
          },
        },
        {
          heading: 'Welding logbook, basic course and test certificate',
          body: [
            'Two different documents are mixed up in practice. A welding logbook recording a basic course evidences that the person was taught a given method at a welding school and can work with it. A welder qualification certificate under ČSN EN ISO 9606-1 is the outcome of a test before an examining body and defines the range in which the welder may work where a product standard or a customer requires it.',
            'For ordinary workshop production without special requirements, a logbook and instruction may suffice. As soon as you evidence welding quality to a customer or under standards that set quality requirements for fusion welding, you need the test and, with it, welding supervision to administer the welding procedures and the welders’ qualifications. Settle that question before you start recruiting — it changes both the pool of candidates and what you will ask of them.',
            'A certificate is not for life. The standard ties it to periodic confirmation that the welder actually works within the given range, and to a limited validity with conditions for renewal. The dates and the range are stated on the document itself; when you verify one, that is the first thing to read.',
          ],
        },
        {
          heading: 'The trial weld is the decisive step',
          body: [
            'A document says what the person managed on the day of the test under test-house conditions. Whether they can do your work is decided by a trial weld. Prepare a piece that matches your ordinary order — the same material, thickness, position, joint preparation, and if possible the welding procedure used in your shop.',
            'Watch more than the appearance of the finished weld: how the person sets up the power source, whether they read the drawing, how they prepare and clean the material, how they handle the shielding gas, and how they check the weld themselves. Leave the assessment to whoever is responsible for welding in your operation, and write it down — in disputed cases, and in a later round of recruitment, the record pays for itself. And because this is work with real risk, a candidate doing a trial weld must also be issued protective equipment and briefed on the rules of the workplace.',
          ],
        },
        {
          heading: 'Welders from abroad and their documents',
          body: [
            'Recruiting welders from abroad is common, and the document is often issued under the same standard as in the Czech Republic, because it is an adopted international standard. That does not make it usable without further checks. Verify who issued the certificate, what range it contains, whether it is valid, and whether your customer accepts it — for deliveries with documented welding quality that is usually decisive. Where the conditions are not met, a test in the Czech Republic follows.',
            'The second matter is communication. A welder works to a drawing and to a welding procedure, and has to understand safety instructions. Decide in advance how you will make sure they understand these documents; for installation work away from the workshop that goes double.',
          ],
        },
        {
          heading: 'Safety, protective equipment and fitness for work',
          body: [
            'Welding has its own risk profile, and recruitment meets it on day one. Besides burns and flying sparks there is arc radiation, which damages both eyes and skin, and welding fume — particularly monitored for stainless steels and surface-treated materials. Extraction at the workplace is therefore addressed, and for some work respiratory protection as well.',
            'Welding away from a fixed welding station carries particular fire-safety requirements under Czech rules: conditions set out in writing for the work in question, and supervision continuing after it has finished. That has consequences for planning — an installation welder is not simply a welder who travels, but a role carrying further administration and responsibility.',
          ],
          list: {
            intro: 'What the trade adds on entry:',
            items: [
              'A welding helmet of the correct shade number, and flame-resistant clothing',
              'Extraction of welding fume at the workplace, and for some materials respiratory protection as well',
              'An entry occupational-medical examination that takes eyesight and working postures into account',
              'Familiarisation with the risks of the workplace — on a temporary assignment it is the user undertaking that provides it',
            ],
          },
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
        'The difference between operator, setter and programmer, the role of the control system, measurement, the shift pattern, and a practical trial at the machine.',
      h1: 'Recruiting CNC operators and setters: what really decides fillability',
      intro:
        'Many stuck CNC hires do not begin with a shortage of people but with a brief that mixes three different positions. Operator, setter and programmer differ in availability, in time to competence and in cost, and an advertisement that merges them into one profile is looking for a candidate matching the highest level on the conditions of the lowest. This page sets out what actually decides whether a CNC position can be filled: knowledge of the control system, working with gauges and drawings, running one machine or several, the shift pattern, and what a practical trial should look like. No wages and no times to fill are stated here.',
      breadcrumb: 'CNC operators',
      sections: [
        {
          heading: 'Operator, setter, programmer — three positions in one advertisement',
          body: [
            'A CNC operator watches the machine through a running program: loads and unloads parts, monitors the run, checks dimensions against the control plan, changes worn tools as instructed and reports deviations. They do not change the machine over to a different order.',
            'A setter is the person who gets an order running on the machine. They clamp the fixture or jaws, measure and enter the tools including offsets, set the workpiece zero, dry-run the program, cut and measure the first part, and only then hand the machine over to series production. Changeover time and scrap rate are decided here, and that is why a setter is usually harder to come by than an operator.',
            'A programmer creates the technology and the tool path — either by shop-floor programming at the machine itself, or in a CAM system with subsequent postprocessing. A company looking for a programmer is answering a different need from a company short of people for the night shift, and joining the two in one brief means waiting for a candidate who turns up only rarely. For naming the individual levels it pays to reach for the type-position description in the Czech national occupations register rather than for an internal abbreviation.',
          ],
          list: {
            intro: 'What to settle before the advertisement is written:',
            items: [
              'Establish who does the setting in your operation — a setter, a supervisor, or the operator themselves',
              'Choose the job title and the requirements from that answer, not the other way round',
              'For an operator, describe what is expected of them when the order changes',
              'For a setter, state the machine types, the method of clamping and the batch size',
            ],
          },
        },
        {
          heading: 'The control system: a real constraint, but a learnable one',
          body: [
            'Heidenhain, Siemens and Fanuc are operated differently, and someone used to one is not as quick on another in the first days. That is a real constraint and there is no point in playing it down. It is also a learnable one: a person who understands machining technology, reads drawings and can measure retrains onto another interface more easily than someone who knows only a sequence of steps on one particular machine.',
            'The practical conclusion for recruitment: insisting on an exact system match narrows the pool enough to lengthen the search. Treating the match as desirable rather than essential usually widens it considerably — but only if you have the onboarding ready and a person to deliver it. That decision belongs in the brief; otherwise pre-selection will make it for you.',
          ],
          list: {
            intro: 'What that means for the brief:',
            items: [
              'State the specific control systems and interfaces you actually have in the operation',
              'Say straight out whether knowledge of the system is a condition or an advantage',
              'Assess shop-floor programming separately — it is not the same as working in CAM',
              'Have it settled who will train a new person on the system, and how far',
            ],
          },
        },
        {
          heading: 'Measurement and drawings matter more than the make of machine',
          body: [
            'In selection it pays to ask about measurement before asking about machines. Callipers, a micrometer, a dial indicator and limit gauges differ in accuracy and in use, and the answer to "what would you check this dimension with, and why" reveals more about a candidate than a list of the makes they have worked on.',
            'The same applies to drawings. Tolerance bands, geometric tolerances and specified surface roughness determine what happens to a part that has the right dimension and the wrong form. On the same level sits whether the candidate knows why the first part is measured, how the record feeds into the control plan, and what is done with a part that has failed. Traceability and calibration of the gauges in use have their general framework in the Czech act on metrology and in the plant’s own metrological rules.',
          ],
        },
        {
          heading: 'One machine, or several',
          body: [
            'Multi-machine working appears in advertisements more often than the operation warrants. For it to make sense, the machining times, the layout of the workplace and the nature of the parts have to allow it; otherwise it becomes a permanent source of overtime and errors. If you require it, state how many machines and which operations.',
            'The profile differs too. Someone settled on one machine in long-run production knows it perfectly, but changing between orders means a learning period for them. A worker from one-off and small-batch production, by contrast, is used to frequent changeovers and to working independently, but may not be used to the pace and discipline of a long run. Neither is worse — you simply need to know what the operation actually needs.',
          ],
        },
        {
          heading: 'The shift pattern is often the deciding factor',
          body: [
            'For CNC roles, fillability is decided surprisingly often by the shift rather than by skill. Three-shift and continuous operation narrows the pool differently from two-shift working, even among people who want the job. Travel, family circumstances, and whether shifts rotate predictably and the roster is known far enough ahead all play a part.',
            'If the shift pattern is fixed and cannot change, it is better to say so openly and immediately; discovering it later costs both sides time. If it can change, this is often where the greatest scope for filling the role lies — for example in carving out one permanent day position for the setter, or in a roster held stable over a longer period. Rules on the scheduling of working time, breaks and rest are set by the Czech Labour Code.',
          ],
          list: {
            intro: 'In the advertisement and in planning that means:',
            items: [
              'State the shift pattern and the shift length directly in the advertisement',
              'Say how far ahead the shift roster is known',
              'Check whether the setter has to be on the same pattern as the operators',
              'Check that the workplace is reachable at the start and at the end of a shift',
            ],
          },
        },
        {
          heading: 'A practical trial at the machine instead of a longer interview',
          body: [
            'A short practical demonstration in the workshop is a reliable filter for these roles. It is not an examination but a chance to see how someone approaches a machine, how they hold a gauge, what they ask and what they verify. A few minutes at the machine says more than a list of machine makes in a CV, and gives the candidate a realistic picture of the work.',
            'A practical trial has its own requirements. Before entering the workshop the candidate must be informed of the risks and equipped with protective equipment, and the demonstration takes place under supervision and within a safe scope. On joining, the usual steps then follow — an occupational-medical examination, entry safety training, and familiarisation with the specific workplace and machines.',
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
            'The government regulation distinguishes several levels of competence, which follow from the vocational education attained, the length of practice and the passing of an examination, and it separates — among other things — work under supervision, independent activity and the management of activity. The definition of each level, the practice required and the particulars of the document are deliberately not cited here item by item; they belong in the current wording of the regulation and should be checked there.',
            'The practical approach for recruitment follows simply from that: do not rely on what is written in the advertisement or in a CV, and ask for the document itself. From it you can see who issued it, what activity and what equipment it covers, and until when it is valid.',
          ],
        },
        {
          heading: 'Competence attaches to an activity and to equipment, not only to a person',
          body: [
            'A document evidencing competence is not a universal licence. What decides is a combination of three things: what activity is to be performed, on what equipment, and under what regime. Operating a switchboard presupposes different competence from installation and repair, working on de-energised equipment different competence from working near live parts. The voltage level matters too — low voltage is not the same as high voltage.',
            'A brief of the kind "we are looking for an electrician with the papers" therefore gives selection nothing to work with. Once the voltage level, the type of equipment and the activity appear in the request, it becomes clear whom you are looking for, and the candidate is able to answer whether their document covers it. It protects you as well: responsibility for what work is assigned to a worker, and for whether they hold the competence required for it, rests with the employer, not with the worker.',
          ],
          list: {
            intro: 'The dimensions a request has to fix:',
            items: [
              'Voltage level — low, high, or where relevant very high voltage',
              'Type of equipment — switchboards, the electrical equipment of machines, drives, distribution systems, photovoltaics',
              'Activity — operating, work (installation, repair, maintenance), inspection, design',
              'Work regime — de-energised, in the vicinity of live parts, or live working',
              'Degree of independence — work under supervision, independent activity, or the management of activity',
            ],
          },
        },
        {
          heading: 'Reserved technical equipment, and what follows from it',
          body: [
            'Electrical equipment, together with lifting, pressure and gas equipment, falls among reserved technical equipment under Czech Act 250/2021 Sb. That Act governs requirements for their safe operation and for the competence of the persons and organisations performing activities on them; the government regulation on electrotechnical competence is its implementing regulation.',
            'Two levels follow for an employer, and they are frequently confused in requests. The first concerns persons — who may do what. The second concerns the organisation and the equipment — authorisation for activities on reserved equipment, inspections and checks, documentation and intervals. Inspection is itself a separate activity, performed by a person holding the relevant certificate; a plant electrician’s profile does not normally include it, and if you need it covered it belongs in the request explicitly.',
          ],
        },
        {
          heading: 'Maintenance electrician, plant electrician, installation electrician',
          body: [
            'The three most commonly requested profiles differ enough in the nature of the work that they do not substitute for one another. A maintenance electrician finds and clears faults on machines while production runs: reads schematics, is at home with the periphery of control systems, with frequency converters, drives and sensors, and decides under the pressure of a stoppage. Diagnosis is the point, not routine.',
            'A plant electrician looks after the site’s electrical equipment and its operation — distribution, switchboards, lighting, minor modifications, material for inspections and clearing the faults they identify. An installation electrician, by contrast, works to projects: installs cable routes, fits and wires switchboards, and follows the project documentation, often in a team and on contracts away from the company. Each of these profiles draws on a different pool of candidates and is therefore differently easy to fill. A combination of roles can be asked for, but it has to appear both in the brief and in the pay grading.',
          ],
        },
        {
          heading: 'Validity, re-examination and fitness for work',
          body: [
            'A document evidencing competence is not permanent. The regulation provides for competence to be verified again at given intervals, and the document has limited validity; the specific intervals and the form of re-examination are set by the government regulation and should be checked against its current wording.',
            'Personnel records therefore need not only a copy of the document but the date its validity ends — something to watch in advance, not at the moment a worker may no longer go near the equipment.',
            'Alongside that, the usual joining obligations apply. For work on electrical equipment, particular weight attaches to fitness for work assessed as part of the occupational-medical examination, and to thorough familiarisation with the specific workplace and its risks over and above general safety training. Provision of protective equipment matched to the work and the environment is normally part of it.',
            'With a candidate whose qualification was obtained abroad, expect that a document issued in another country is not automatically taken over. Recognition of a professional qualification obtained in another EU member state, in an EEA state or in Switzerland is governed by Czech Act 18/2004 Sb.; documents from third countries follow a different route, and the procedure varies further according to the activity involved. Information on the recognition of foreign education is published by the Czech Ministry of Education. It is worth starting this step before you agree a start date with the candidate.',
          ],
        },
        {
          heading: 'What to put in the request so selection can work',
          body: [
            'A reliable check on a brief is whether an electrician who does not know your company could answer from it. If they could, the selection is not decided when documents are checked before a start date but much earlier — and among candidates who genuinely hold competence for that work.',
            'A brief described that way also speeds up pre-selection: knowing the equipment and the activity, the document can be gone through with the candidate before the interview, verified against originals along with identity.',
          ],
          list: {
            intro: 'What the request should carry:',
            items: [
              'The voltage level and the type of equipment that will be worked on',
              'The activity and the degree of independence required, including management of activity where that applies',
              'Whether inspection activity is part of the role, or only the preparation of material for inspections',
              'The environment and the operation — production hall, site, contracts away from the company, shift work or on-call standby',
              'The documents required, including their scope and their period of validity',
            ],
          },
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
        'How to fill maintenance roles — technicians, mechanics, setters and service technicians: breadth of competence, on-call duty and travel, documentation, and promoting from within.',
      h1: 'Maintenance and technical service: filling technical roles',
      intro:
        'Maintenance is where a shortage of people shows quickly and expensively: the machine stands, the plan slips and operators wait. It is filled differently from the production around it — the requirement is not one skill but a combination of mechanics, electrical work, pneumatics or hydraulics, and increasingly basic work with the machine’s control system. On top come conditions a candidate weighs before the job content: on-call duty, travel and shift cover. This page describes what to settle in the brief, how to assess evidence of competence, and why promoting an operator from within is a full route rather than a fallback.',
      breadcrumb: 'Maintenance technicians',
      sections: [
        {
          heading: 'Why maintenance is harder to fill than the production around it',
          body: [
            'You look for an operator by one main capability and a training period. For maintenance the brief is different: one person on a shift has to cover a varied machine park and deal with a mechanical fault, with pneumatics or hydraulics, and with what is happening in the switchboard. In many operations work with the machine’s control system is growing — not programming, but the ability to tell whether the problem is in a sensor, in the mechanics or in the program.',
            'Breadth of competence has a legal side as well. Intervention in the electrical part of equipment is tied to electrotechnical competence under Czech government regulation 194/2022 Sb., which replaced the earlier decree 50/1978 Sb. and distinguishes the scope of activities by level of competence. Part of the equipment falls in addition under Czech Act 250/2021 Sb. on occupational safety in connection with the operation of reserved technical equipment — that is, pressure, lifting, electrical and gas equipment. Compare the scope of a candidate’s document, therefore, against what they are actually to do at the workplace.',
          ],
        },
        {
          heading: 'Roles in maintenance and how they differ',
          body: [
            'Job titles differ from company to company, and the title itself says little about the content of the work. It is more useful to describe where the responsibility of a role ends and where external service or the machine supplier begins.',
            'The misunderstanding arises mainly between setter and maintenance technician: a setter keeps the machine running between orders and is measured by changeover time, while a maintenance technician is responsible for the technical condition of equipment over a longer horizon. If one person does both, say so in the brief.',
          ],
          list: {
            intro: 'The roles a maintenance department is usually built from:',
            items: [
              'Maintenance technician — routine preventive and operational maintenance, part replacement, lubrication, minor repairs',
              'Mechanic — mechanical repairs and adjustment, alignment, work with the machine documentation',
              'Electromechanic — intervention in the electrical part within the scope of their own competence',
              'Mechatronics technician — mechanics, electrical work and the control system together, diagnosis of the more complex faults',
              'Setter — changeovers and machine settings between orders, and the ramp-up after a changeover',
              'Service technician — intervention at a customer’s site or across several workplaces, with travel',
              'Maintenance manager — the repair plan, shutdowns, spare parts, suppliers and people',
            ],
          },
        },
        {
          heading: 'Preventive and reactive maintenance: different brief, different person',
          body: [
            'An operation on planned maintenance needs discipline: keep to the plan, keep records, watch spare parts and prepare a shutdown in advance. An operation that mostly fights breakdowns needs a different temperament — quick diagnosis under pressure, the nerve to decide on a temporary fix, and tolerance for the phone ringing at night.',
            'The ratio between planned and breakdown work is among the most valuable things you can put in a brief. Where it is missing, you risk parting during the probationary period: someone joins planned maintenance and finds continuous firefighting, or the other way round.',
          ],
          list: {
            intro: 'Worth adding to the brief:',
            items: [
              'The approximate ratio of planned work to breakdown work',
              'The machine park — types of equipment, age, manufacturer, and the language of the documentation',
              'Where the boundary runs between internal maintenance and external service',
              'Whether the person is expected to introduce a preventive plan, or only to carry one out',
            ],
          },
        },
        {
          heading: 'On-call duty, travel and shift cover',
          body: [
            'Acceptance of an offer here is often decided by a condition unrelated to expertise: how often and in what pattern on-call duty is held. The Czech Labour Code treats on-call duty as time when an employee is outside their rostered shifts, at an agreed place away from the workplace, ready for work. It must be agreed, remuneration for it is due under the Labour Code, and work performed during it beyond the set weekly working time is overtime.',
            'For a candidate it is an intrusion into private life, judged together with the travelling distance. State in the offer, therefore, how often on-call comes round, among how many people it rotates, and what travelling distance you expect. An operation that covers a continuous regime with a single maintenance technician is usually hard for candidates to accept, and remains a weakness after the role is filled.',
          ],
          list: {
            intro: 'What the offer should settle about on-call duty:',
            items: [
              'How many people share the rota, and how it is drawn up',
              'The expected travelling distance, and whether a vehicle is available',
              'Whether some interventions can be handled remotely or by telephone',
              'Who is on call over public holidays and during shutdowns',
            ],
          },
        },
        {
          heading: 'Documentation and handover between shifts',
          body: [
            'Maintenance is a role where what is handed over is not a part in progress but a machine in a state. When someone leaves a shift saying "it is running on a temporary fix for now" and it is written down nowhere, the loss shows up at the next breakdown. Among the capabilities worth verifying is how a candidate records an intervention: what the cause was, what they replaced, and what remains temporary.',
            'Part of the documentation is mandatory. For reserved technical equipment, Czech Act 250/2021 Sb. governs requirements for checks, inspections and the competence of the persons performing them; inspection activity is not the same thing as routine maintenance, and it should be clear in advance who provides it. Under the Labour Code and safety rules the employer is also responsible for the safe condition of equipment and for the employee’s fitness for the work in question, including the occupational-medical examination and the protective equipment provided.',
          ],
          list: {
            intro: 'In selection that means:',
            items: [
              'Ask about a specific situation: how they handed over an unfinished repair',
              'Establish what they kept records in — a logbook, a maintenance system, a spreadsheet',
              'Compare the scope of their evidence of competence with the actual content of the job',
            ],
          },
        },
        {
          heading: 'Passive candidates and the route from within',
          body: [
            'An experienced maintenance technician is not usually looking for work. They are employed and judge an offer from a position where nothing is urgent. That changes the whole process: an advertisement alone is generally not enough, referrals and direct approaches matter, selection runs longer, and the offer has to be intelligible the first time.',
            'The second real route leads from within. An operator or setter who knows the machine park, the technology and the people has a head start that cannot be bought from outside. What they lack is the document and the method — and both can be addressed: electrotechnical competence can be obtained by the procedure under Czech government regulation 194/2022 Sb., and competences can be formalised through a professional qualification in the Czech national qualifications register. This route needs time, a mentor from maintenance, and a named period during which the person does not yet intervene alone.',
          ],
          list: {
            intro: 'What that route asks of the company:',
            items: [
              'Select for interest in engineering rather than for output on the line',
              'Plan the qualification route before you open the position',
              'Define which interventions may be done independently, and from when',
              'Count on having to fill their place in production',
            ],
          },
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
        'Inspector, quality technician, metrologist, quality engineer, quality manager: how to specify each, what to verify about measurement, and why the sector counts here.',
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
          list: {
            intro: 'The rungs, from inspection upward:',
            ordered: true,
            items: [
              'Quality inspector — measurement and visual inspection to the control plan, recording results, blocking non-conforming parts',
              'Quality technician — control instructions, resolving non-conformities in the operation, communication with production and with the supplier',
              'Metrologist — management of gauges, calibration and traceability, the company metrological rules',
              'Quality engineer — sample and process release, root-cause analysis, customer communication',
              'Quality manager — the department, the system, audits, and representing the company to the customer',
            ],
          },
        },
        {
          heading: 'Measuring competence is the main axis of selection',
          body: [
            'Differences between candidates show reliably in measurement. Callipers and a micrometer can be mastered by almost anyone after instruction; the difference lies in whether the person reads a drawing including tolerances and geometric specifications, selects a gauge appropriate to the dimension, and recognises when that accuracy is not enough and a coordinate measuring machine is needed.',
            'A practical test is short and convincing: give the candidate a drawing and a part and have them describe what they would measure the dimension with and how, and what they would do with a result at the tolerance limit. An answer of "I measure it and write it down" and an answer that mentions the repeatability of the measurement and the condition of the gauge describe two different levels.',
          ],
          list: {
            intro: 'What the measuring part of the profile is made of:',
            items: [
              'Reading a drawing including tolerances and geometric specifications',
              'Choosing a gauge according to the accuracy required',
              'Working with a calibrated gauge and its calibration certificate',
              'Experience of coordinate measurement and of evaluating the resulting protocol',
              'What they do with a borderline or a non-conforming result',
            ],
          },
        },
        {
          heading: 'Calibration and the Czech metrology framework',
          body: [
            'The metrological part of the role rests on someone being able to defend a measurement result. Czech Act 505/1990 Sb. on metrology sets out the classification of measuring instruments and, for so-called specified measuring instruments, requires verification; under that act verification is entrusted to state metrology and authorised bodies, not to a company metrologist. Other working instruments the company maintains by calibration according to its own metrological rules and intervals.',
            'The concrete question for a brief follows: does the company have specified measuring instruments, who keeps their records, and who decides on intervals. Verify the concrete classification of instruments and the duties attached to them against the wording of the Act currently in force and its related regulations.',
          ],
        },
        {
          heading: 'System standards, as employers state them',
          body: [
            'System standards appear regularly in briefs: ISO 9001 as a general framework for a quality management system, IATF 16949 for suppliers to the automotive industry, and HACCP as a food-safety system in food production. We describe these as requirements employers state, not as certifications held by a staffing agency.',
            'What matters for a candidate profile is what the requirement means in practice: familiarity with the documentation and records, experience of an internal or customer audit, and the ability to defend a procedure to an auditor. If the company is only preparing for certification, that is a different brief from maintaining an established system — and a different person is being sought.',
          ],
          list: {
            intro: 'What the brief should say about the system:',
            items: [
              'Whether the system is running, is being implemented, or is being renewed',
              'The difference between experience of being audited and experience of conducting internal audits',
              'Who keeps the documentation and who deals with the customer',
              'In food production, how the hygiene records are set up',
            ],
          },
        },
        {
          heading: 'Complaints, 8D and everyday documentation',
          body: [
            'Daily work in quality is not measurement but writing. Inspection records, protocols, batch release, blocking, descriptions of non-conformity and responses to complaints make up most of the output — and they are what remains when a problem is examined months later.',
            'Customer complaints have a settled structure in supply chains; in the automotive industry the 8D format is commonly required, with immediate containment, root-cause analysis and verification of effectiveness. This is simple to check: have the candidate describe one complaint they ran from receipt to closure, and listen for whether they separate the cause from the symptom and can say how they confirmed the measure worked. It is worth checking the clarity of their written expression too, ideally on a short written task.',
          ],
        },
        {
          heading: 'Independence, and why the sector carries weight here',
          body: [
            'Quality performs its function only when the person who stops a batch is not assessed on the output of the shift they are stopping. Before opening the position, settle who the role reports to, what it may decide alone, and who decides in a dispute with production. Candidates ask, and an evasive answer is a warning sign to experienced people.',
            'The sector counts for more here than in other technical roles. An automotive supplier works with a different documentation culture and a different escalation tempo from food production, where hygiene, batch traceability and sensory assessment enter alongside measurement. A move between sectors is possible, but it means a period in which the person knows the method and is learning the environment. For candidates with foreign education, settle in advance whether and in what form you require recognition of that education; the framework is described by the Czech Ministry of Education and by the Czech act on the recognition of professional qualifications.',
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
        'Promote from within or hire in: what each route costs, what to verify in a candidate, why this role decides the stability of a whole shift, and what a promoted supervisor needs first.',
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
            'The safety part is not an add-on. The Labour Code places care for occupational safety and health among the inseparable parts of the work duties of managing employees at every level of management; compliance in this area is checked by the labour inspectorate. Delimit the scope of a supervisor’s responsibility in writing, therefore, and not orally when the function is handed over.',
          ],
          list: {
            intro: 'What each of the four covers:',
            items: [
              'People — filling the positions on the shift, training, conflicts, appraisal',
              'The plan — throughput, priorities, reacting to stoppages and absences',
              'Quality — deciding on a non-conformity, escalation, working with inspection',
              'Safety — supervising safe working, protective equipment, reporting incidents',
            ],
          },
        },
        {
          heading: 'Promoting from within: what you gain and what will be missing',
          body: [
            'Someone from the floor brings what cannot be bought: they know the technology, the machine park, the habits of the shift and where mistakes usually happen. They need no months to understand the product, and people take them as someone who knows what they are talking about. Where continuity is the priority, that is a decisive advantage.',
            'What they usually lack is the other half: leading people they were working beside yesterday. It means handling an uncomfortable conversation, allocating unpopular work, saying no to a friend, and keeping a distance without turning relationships into formality. On top of that come planning beyond the horizon of a single shift and working with reports. An excellent operator is not automatically a good supervisor, and a promotion without preparation can cost the company both.',
          ],
        },
        {
          heading: 'Hiring in: what it brings and what it costs',
          body: [
            'Someone from outside brings method and comparison. They have seen a different shift arrangement, different handling of deviations, a different way of running a meeting — and they carry no history of relationships on the floor. Where the aim is to change how the shift is led rather than to fill a slot in the roster, this route is usually more effective.',
            'The cost is time and legitimacy. Without knowledge of the technology and the product they cannot decide much in the first weeks, and the shift tests them — especially if someone inside had aspired to the post. It is decided in those first weeks: who introduces them, what decisions they may make immediately, who backs them in the first conflict, and when they get feedback. Without that, departure during the probationary period is a real risk and the selection starts again.',
          ],
        },
        {
          heading: 'What to verify for this role',
          body: [
            'Self-assessment is no help here — almost every candidate says they can lead people. What works is concrete situations from their own practice and the question of what they did, not what they think about leadership.',
            'State the size of the team in the brief as a number from your own operation: leading five people and leading fifty are two different jobs even where the position has the same name. Add the shift pattern, who the role reports to, and what decisions it makes without consulting anyone.',
          ],
          list: {
            intro: 'Situations worth asking about:',
            items: [
              'How many people they led directly, on what shift and in what kind of operation',
              'How they handed the shift over, and what specifically they passed on',
              'What they did when two people were absent in the morning and the plan stayed the same',
              'When they called their own manager, and what they decided themselves',
              'How they handled a conflict between two people on the shift',
              'How they behaved when inspection stopped a batch mid-shift',
            ],
          },
        },
        {
          heading: 'Why this role decides the stability of a shift',
          body: [
            'First-line management is where it is decided daily whether people stay. The supervisor sets how a new starter is spoken to on day one, whether anyone notices that someone is struggling, how overtime is shared out, and whether a complaint gets anywhere.',
            'Filling this role therefore affects the stability of a whole shift more than filling any individual position on it.',
            'In practice it is this person who runs a new worker’s onboarding on the shift, even where the process is written down differently. So if you are dealing with departures in the first weeks, the supervisor is the first place to start, before reaching for blanket measures.',
          ],
        },
        {
          heading: 'Preparing a promoted supervisor',
          body: [
            'A promotion is a period, not a moment. It also helps to tell the shift in advance why they were chosen — an unexplained promotion gets interpreted by the team in its own way.',
            'Honest preparation includes the way back. Agree in advance what happens if the role does not fit: a return to the original position without shame is better for both sides than staying in a post the person does not want. It is precisely that option which makes people readier to take a promotion at all.',
          ],
          list: {
            intro: 'What a newly promoted supervisor needs:',
            items: [
              'A scope of decision-making and responsibility set out in writing',
              'Training on the duties of a managing employee, including occupational safety',
              'Their own manager available, and agreed check-in points',
              'A clear format for handing the shift over',
              'An option, agreed in advance, of returning to the original position',
            ],
          },
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
        'Which requirements follow from Czech regulation and which are only industry convention, how to treat control platforms in a brief, and why safety functions need a separate question.',
      h1: 'Recruiting automation and PLC technicians: what actually defines the role',
      intro:
        'Automation is unusual among technical trades in that it cannot be described by one discipline. Someone setting up a control system at a line moves between electrical engineering, mechanics and software, and depending on which of those three your operation needs most, the right candidate looks different. A brief of the kind "we are looking for an automation technician" therefore says almost nothing on its own. This page separates what follows from regulation, what is merely industry convention, and what each operation decides for itself.',
      breadcrumb: 'Automation technicians',
      sections: [
        {
          heading: 'What sits under "automation"',
          body: [
            'Roles with very different content meet under one name, and each of them emphasises a different skill.',
            'The difference between them matters more for recruitment than the job title itself. A technician who has reliably maintained existing lines for years need not be the one who will prepare the control system of a new machine — and the other way round.',
          ],
          list: {
            intro: 'What can sit behind the same title:',
            items: [
              'Maintenance and diagnosis of equipment already in operation',
              'Commissioning new lines and debugging them',
              'Modifying programs as production changes',
              'Designing the control part of equipment and its documentation',
            ],
          },
        },
        {
          heading: 'What follows from regulation, and what does not',
          body: [
            'It helps to separate three things that are routinely mixed together in advertisements.',
            'Regulated competence: if a person is to perform activity on electrical equipment, their competence is governed by Czech government regulation 194/2022 Sb. That is a legal requirement attached to the activity and the equipment, not to a job title. Where a company operates reserved technical equipment, Czech Act 250/2021 Sb. applies as well.',
            'Industry convention: knowledge of a particular control-system platform, experience with a particular type of fieldbus, or practice with a given manufacturer’s robots. None of that follows from any regulation, even though employers often state it as a condition.',
            'A company’s own choice: the systems in use, the language of the documentation, the way programs are managed, and remote access to equipment. This is set by the company alone, and a candidate cannot know it in advance.',
          ],
        },
        {
          heading: 'Control platforms, and how to treat them in a brief',
          body: [
            'Knowledge of a specific platform is the most common reason a brief narrows the pool unnecessarily. Environments differ between manufacturers, but the logic of the work largely transfers — a technician who understands what the control system is supposed to do will find their way around another environment, given time.',
            'It is therefore worth separating in the brief what is genuinely essential from what can be learned. In an operation with a single platform and no capacity to train, the requirement is justified. Where several systems sit side by side, the ability to read documentation and to look for the cause of a fault systematically usually matters more.',
          ],
          list: {
            intro: 'What the brief should answer:',
            items: [
              'Which systems are actually deployed in the operation',
              'Whether the work is modifying existing programs or writing new ones',
              'Whether anyone is available to introduce a newcomer to the environment',
              'What share of the work happens at the equipment, and what away from it',
            ],
          },
        },
        {
          heading: 'The safety part, and why to ask about it separately',
          body: [
            'The safety circuits of machinery are the area where candidates’ experience differs most and where it is hardest to tell from a CV. Some have worked only in process logic; others have regularly dealt with safety functions and their documentation.',
            'For an operation that matters, because intervention in the safety part of equipment has different consequences from a change to process logic. This experience is best verified with a question of its own, rather than assumed from length of practice.',
          ],
        },
        {
          heading: 'What to ask during selection',
          body: [
            'For automation it pays to ask about concrete situations rather than for a list of technologies. A description of a fault actually dealt with, including how the candidate reached the cause, says more about how they work than a list of abbreviations.',
            'It is equally worth going through how the candidate works with documentation and what they leave behind them. In an operation where equipment is run for years, the traceability of the modifications made is often worth more than the speed of the intervention itself.',
          ],
          list: {
            intro: 'What to cover in selection:',
            items: [
              'A description of a specific fault and of the route to clearing it',
              'Experience of commissioning equipment',
              'The approach to documentation and to the record of changes made',
              'Experience with the safety part of equipment',
              'Willingness to travel out to sites or to be on call, where the operation requires it',
            ],
          },
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
        'Four worlds under one name — process, manufacturing and industrial engineering and design — when "engineer" is a regulated activity in the Czech Republic and when it is only a label, and education against experience.',
      h1: 'Engineering roles: why the job title tells you nothing about the candidate',
      intro:
        'The word engineer is used in Czech operations for roles whose only shared feature is that they concern technology. One improves how production runs, another handles the launch of a new product, a third designs the layout of a workplace, a fourth looks after measurement and data. A brief that says only "we are looking for an engineer for production" therefore usually brings applicants who are not comparable with one another. This page helps name which of those roles you actually mean, and points out one distinction routinely overlooked in recruitment — when the title of engineer is only a label, and when it covers a regulated activity.',
      breadcrumb: 'Engineering roles',
      sections: [
        {
          heading: 'Four distinct worlds under one name',
          body: [
            'Engineering roles in manufacturing divide by what their output attaches to. Four groups recur, and design and manufacturing technology form a separate group among them, covered by a page of its own.',
            'These worlds overlap, but their centres of gravity lie elsewhere, and candidates do not move between them automatically.',
          ],
          list: {
            intro: 'What the output attaches to in each:',
            items: [
              'Process engineering — the stability and behaviour of the production process: how production runs and why it behaves as it does',
              'Manufacturing engineering — launches and changes: introducing a new part, moving a line, altering a procedure',
              'Industrial engineering — the organisation of work, capacities and the flow of material',
              'Design and manufacturing technology — design and the preparation of production',
            ],
          },
        },
        {
          heading: 'When "engineer" is a regulated activity and when it is only a label',
          body: [
            'This distinction is worth knowing, because it is a common source of misunderstanding.',
            'A regulated activity: authorisation in construction under Czech Act 360/1992 Sb. applies to selected activities in construction and design. Anyone performing such an activity needs the authorisation — that is a legal requirement, not a convention.',
            'Only a label: for the great majority of engineering positions in manufacturing, no comparable regulation exists. "Process engineer" or "manufacturing engineer" is a job title the employer settles on. A practical consequence follows: two candidates with the same job title on a CV may have done entirely different work, and the title on its own guarantees nothing.',
            'Descriptions of roles and their usual requirements are published by the Czech national occupations register; professional qualifications are covered by the Czech national qualifications register under Czech Act 179/2006 Sb.',
          ],
        },
        {
          heading: 'Education against experience',
          body: [
            'Engineering positions often carry an automatic requirement for a technical university degree. In many operations that is justified; in others it is a convention that needlessly excludes experienced people who worked their way to the role from production.',
            'More useful than a level of education is the question of what kind of problem the person has to be able to take apart independently. If the position rests on statistical evaluation and work with data, formal training makes sense. If it rests on knowledge of a specific technology and on the ability to push a change through the plant, what decides is experience, and how the person communicates with supervisors and operators.',
          ],
        },
        {
          heading: 'What a brief should contain',
          body: [
            'Engineering positions fill better when the brief describes an outcome rather than a list of tools. "We are looking for someone to reduce the number of non-conforming parts on line X" is more usable for a search than a list of methodologies.',
            'It matters equally to say who the person will work with and what authority they have. An engineer expected to change an established procedure without backing from the plant’s management usually leaves before the change shows any effect, and candidates take that into account when they decide.',
          ],
          list: {
            intro: 'Four things belong in the brief:',
            items: [
              'What specific outcome is expected from the role',
              'Who is setting the task and who decides on the change',
              'Whether this is a project role or a permanent agenda',
              'How much of the work takes place directly on the shop floor',
            ],
          },
        },
        {
          heading: 'Where these people come from',
          body: [
            'Engineering positions are filled from three sources: promotion from within, a move from another operation in the same sector, and a move from a different sector. Each has a drawback worth knowing in advance.',
            'Someone from inside knows the operation and the people but may lack method. A candidate from another company in the sector brings comparison but expects comparable conditions. A candidate from a different sector brings a different view but needs time to understand the technology — and it is precisely that time that briefs tend to underestimate.',
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
        'How the two roles differ, what technical preparation of production covers, how to assess work with drawings, and why CAD and CAM are a company’s choice rather than a requirement of the trade.',
      h1: 'Process and design engineers: two roles that get confused',
      intro:
        'Process engineer and design engineer are among the roles most often confused in advertisements, although their work begins at opposite ends. A design engineer is responsible for what a part should look like and what it has to satisfy. A process engineer is responsible for how such a part will actually be made in a particular operation — by what procedure, on what machine, with what tooling and in what time. Confusing them means looking for someone with entirely different experience. This page sets out how the two differ, what can be verified in each, and what depends on your own equipment and habits.',
      breadcrumb: 'Process and design engineers',
      sections: [
        {
          heading: 'Where one role ends and the other begins',
          body: [
            'A design engineer works from a functional requirement, and the output is documentation describing a part or an assembly — shape, dimensions, material, tolerances, surface requirements.',
            'A process engineer takes that documentation and converts it into a manufacturing procedure. They deal with the choice of machine and tooling, the clamping, the sequence of operations, the times, and whether the part can be made economically in that operation at all. This is also where feedback to design arises — the process engineer is often the first to point out that a proposed shape will be difficult to make.',
            'In smaller companies the two roles merge into one, and the brief then has to say which part predominates.',
          ],
        },
        {
          heading: 'Technical preparation of production as a discipline of its own',
          body: [
            'Technical preparation of production covers more than writing a procedure; it reaches as far as working with purchasing and quality.',
            'One practical consequence for recruitment: a candidate who wrote procedures for one-off production was solving something different from someone out of high-volume manufacturing. In one-off work what decides is the speed of preparation and versatility; in series production it pays to optimise even small things. It is worth naming that difference in the brief.',
          ],
          list: {
            intro: 'What the discipline covers in detail:',
            items: [
              'Creating and maintaining manufacturing procedures',
              'Managing documentation, its versions and change control',
              'The choice of tooling and its records',
              'Time standards and working with planning',
            ],
          },
        },
        {
          heading: 'Drawings are the most verifiable skill',
          body: [
            'Working with a drawing is, for both roles, the most verifiable thing selection can assess. It is not only reading dimensions but understanding tolerances, specified surface quality and geometric requirements.',
            'A practical check over a real drawing from your own operation says more in a few minutes than a list of software in a CV — and it is fair to candidates who worked in a different system but understand the craft.',
          ],
        },
        {
          heading: 'CAD and CAM: a company’s requirement, not the trade’s',
          body: [
            'The particular CAD or CAM system is chosen by the company. No regulation prescribes it, and moving between systems is easier than usually assumed — especially for experienced people who understand what they want from the system.',
            'What decides is whether the operation has capacity to train. If a process engineer starts as the only one and has to take over orders immediately, knowledge of the particular environment carries weight. If they join an established team, it is more flexible to ask for an understanding of the procedure and a willingness to learn the system.',
            'The same holds for product data management systems. Experience with them is an advantage, but it tends to be tied to a particular deployment and does not transfer mechanically.',
          ],
        },
        {
          heading: 'How to narrow a brief sensibly',
          body: [
            'The most common mistake is a brief listing every system used in the company and every type of production. The result is a profile nobody matches.',
            'It is better to describe what the person will do in the first three months, and to say what has to be known immediately and what can be learned. That split also makes the interview easier — you then ask about things that actually happen.',
          ],
          list: {
            intro: 'Four questions narrow a brief faster than any list of systems:',
            items: [
              'Whether design or the preparation of production predominates',
              'One-off, small-batch or series production',
              'Which skills are needed from the first day',
              'Who hands over the brief and who takes over the result',
            ],
          },
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
        'Machinist, CNC setter, welder, fitter, toolmaker: how the trades differ, what to verify over a drawing and a gauge, and how to describe the trade in a brief.',
      h1: 'Engineering trades: machining, welding and fitting',
      intro:
        'Engineering trades cover several separate crafts with different training, different documents and differently sized candidate pools. A brief saying "we are looking for someone in engineering" therefore leads nowhere — a machinist, a welder, a fitter and a toolmaker differ not only in what they do but above all in what their competence can be verified against. This page sets out the individual families, the line between operating, setting and programming, and why reading a drawing and working with a gauge decide fillability more than the make of machine. No pay or market figures are stated here; those belong in official sources.',
      breadcrumb: 'Engineering trades',
      sections: [
        {
          heading: 'The families and how they differ',
          body: [
            'Engineering production rests on several crafts that sit alongside one another but do not substitute. The difference is not a level of dexterity but what they work with: a machinist removes material, a welder joins it, a fitter assembles and fits, a toolmaker makes and maintains the tooling with which everything else is then made. Where a brief merges these roles into one, the selection process is looking for someone who is either not on the market at all or is overqualified for the work.',
            'The list below serves as a shared vocabulary for a conversation between production and the personnel department. A detailed description of the work activities and professional requirements for each of these trades is maintained by the Czech national occupations register.',
          ],
          list: {
            intro: 'The families that recur in engineering production:',
            items: [
              'Metal machinist — turning, milling and drilling on conventional and CNC machines, with the emphasis on dimension and tolerance',
              'CNC operator and setter — operating the machine and preparing it for an order; the line between the two is decisive for recruitment',
              'Welder — joining material by method and position; the scope of the qualification is given by the tested range stated in the certificate',
              'Fitter — assembly, fitting, and the repair and maintenance of structures and machine assemblies',
              'Toolmaker — making and maintaining moulds, fixtures and blanking tools, with high demands on precision and repeatability',
              'Grinder — finishing operations, where surface roughness and the final dimension are decided',
              'Assembler and mechanic — assembly, commissioning and service of machines, both in-house and at a customer’s site',
            ],
          },
        },
        {
          heading: 'Operating, setting and programming are not the same',
          body: [
            'The most common mistake in a brief concerns the level rather than the trade. An operator watches the machine, loads and unloads parts, checks dimensions and handles routine situations. A setter prepares the machine for a different order — clamps the fixture, measures tools, sets the zero point, adjusts offsets and cuts the first part. A programmer creates the technology and the tool path, whether by shop-floor programming directly at the machine or in a CAM system.',
            'Each of these levels has a different availability on the market and a different time to competence. A company that puts all three into a single advertisement usually gets applications from operators while it is waiting for a setter. The difference, and what follows from it for fillability, is covered by a separate page on recruiting CNC operators and setters.',
          ],
        },
        {
          heading: 'Drawings and gauges are the real dividing line',
          body: [
            'Two areas of questioning yield the most in selection: what the candidate reads from a drawing, and what they do with a gauge. Reading a drawing does not mean finding a dimension. It means understanding the tolerance band, geometric tolerances, specified surface roughness, sections and views, and welding symbols — that is, what happens when the dimension is right and the form is not.',
            'The second area is metrological. Callipers, a micrometer, a dial indicator and limit gauges are used differently and measure to different accuracies; an experienced worker knows when a given instrument is not enough and when measurement on a coordinate measuring machine is called for. Order in the calibration of gauges belongs on the same level: the general framework for measuring instruments and their traceability comes from the Czech act on metrology, while the regime for working gauges is set by the operation in its own metrological rules — and customer audits ask about it.',
          ],
          list: {
            intro: 'What to put to a candidate:',
            items: [
              'Have them read a real drawing from your own production, not a generic exercise',
              'Ask how they would measure a particular dimension, and why with that instrument',
              'Ask about a situation where a part did not conform — what they did and whom they informed',
              'Check whether they worked to a control plan and how they recorded the results',
            ],
          },
        },
        {
          heading: 'One machine, several machines, and moving between sectors',
          body: [
            'The second axis is breadth. A worker settled on one type of machine in long-run production has a different profile from one who moves between machines in one-off and small-batch work, reads the drawing themselves and sets up themselves.',
            'Multi-machine working is not only a question of skill but of workplace layout and machining times; without those it cannot be expected even after training.',
            'Experience from another sector transfers unevenly. The craft base — measuring, reading a drawing, clamping, working with tooling — transfers well. What transfers less well is anything tied to the material, the batch size and the documentation: someone who machined aluminium castings in automotive series production is not immediately at home in one-off stainless steel work, and the reverse holds too. In welding the line is harder, because the scope of the qualification is set by the tested range stated in the certificate, not by length of practice.',
          ],
        },
        {
          heading: 'Describing the trade: the national registers as a shared vocabulary',
          body: [
            'For describing a position it pays not to invent your own terminology. The Czech national occupations register describes occupations, typical positions and their professional requirements; the Czech national qualifications register assigns professional qualifications with an assessment standard, which can be evidenced by a certificate after an examination before an authorised person under the Czech act on verification and recognition of further education. For an employer this is practical twice over: the brief takes an intelligible shape, and at the same time a route opens to candidates who know the trade but do not hold the corresponding apprenticeship certificate.',
            'Alongside these there are documents that nothing else can replace. For welding it is the welder qualification certificate to the relevant standard with its stated tested range; for work on electrical equipment, proof of electrotechnical competence; for reserved technical equipment, the corresponding certificate. These documents have limited validity and belong in the brief right at the start, not at the signing of the contract.',
          ],
          list: {
            intro: 'How to write the trade into a brief:',
            items: [
              'Name the trade as the national occupations register names it, not by an internal abbreviation or a cost-centre number',
              'Distinguish the level: operating, independent work to a drawing, or setting',
              'List the machines, the materials machined and the typical batch size',
              'Describe the shift pattern and the workplace before you get to pay',
              'List the mandatory documents, including their scope and the validity required',
            ],
          },
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
        'What the Czech "THP" category covers, why it is an operational classification rather than a legal concept, which roles sit in it, and why filling them stands or falls on the brief.',
      h1: 'Technical office roles: what belongs in them and how to fill them',
      intro:
        'The Czech abbreviation THP — technical and administrative staff — is used daily in manufacturing and logistics companies, but every operation draws the boundary of the category for itself. In one place it covers only technical preparation of production; in another it takes in supervisors, planning, purchasing and payroll. For recruitment that has one important consequence: the same job title means different work in every company, so an advertisement without a description of the actual content attracts people who were doing something else. This page explains what the category covers in practice, how it differs from manual trades, why the brief decides here, and how to use the Czech national occupations register when describing requirements.',
      breadcrumb: 'Technical office roles',
      sections: [
        {
          heading: 'What the category means in Czech practice',
          body: [
            'Technical and administrative staff is an operational classification, not a legal concept — the Czech Labour Code does not recognise such a category and attaches no special rights or duties to it. Companies use it in their organisational structure, budgets and reporting to distinguish manual trades, whose work is tied directly to a production operation, from the technical and administrative functions that prepare, plan, check and administratively serve production.',
            'That is worth saying to a foreign reader plainly, because a category that appears everywhere in Czech job adverts and nowhere in the law is easy to mistake for a qualification.',
            'In practice it goes with a different pay model and a different daily rhythm: these positions tend to sit outside the shift cycle, a monthly wage is normally agreed, and performance is measured not in pieces but in the timeliness and correctness of the output — finished documentation, an assembled plan, material ordered, a payroll period closed. That is exactly why they are hard to fill: there is no simple criterion by which a candidate can be judged quickly.',
          ],
        },
        {
          heading: 'Which roles usually belong here',
          body: [
            'The scope differs with the size of the operation. In a smaller company one person covers both technology and planning; in a larger one these are separate posts with their own interfaces.',
            'The list below matches what Czech manufacturing and logistics operations most often place in the category.',
          ],
          list: {
            intro: 'The roles most often counted as technical and administrative staff:',
            items: [
              'Process engineer and technical preparation of production — procedures, consumption standards, the launch of new parts',
              'Design engineer — drawing and model documentation, change control',
              'Production planner and dispatcher — the order schedule, material availability, reacting to breakdowns',
              'Buyer and supply officer — enquiries, orders, deadlines and suppliers',
              'Quality technician and quality engineer — documentation, measurement, complaints and corrective actions',
              'Payroll and personnel administration — the payroll agenda, attendance, records and contractual paperwork',
              'Shipping administration and invoicing — the documents that go out with the goods and how they carry through into accounting',
            ],
          },
        },
        {
          heading: 'Why filling these roles stands or falls on the brief',
          body: [
            'For manual trades the work can be described reasonably well by machine and operation. For technical and administrative roles the content is set by which systems the operation uses, how many orders it plans, how document changes are organised, and how many people the person deals with daily.',
            'Two production planners with the same job title can therefore be doing work with almost nothing in common — one breaks the plan down into shifts in the company system, the other assembles it by hand in a spreadsheet and rings round suppliers.',
            'A brief is easier to sharpen through outputs and interfaces than through personal qualities. Instead of "an independent and responsible process engineer", write: prepares machining procedures for three workstations, runs change control, liaises with design and quality. A brief like that can be used both in approaching people and at interview, and the questions that verify competence follow straight from it.',
          ],
          list: {
            intro: 'Five questions that sharpen the brief:',
            items: [
              'What outputs the person has to deliver, and at what cadence',
              'Which systems they work in — the company system, CAD, spreadsheets, a planning tool',
              'Whom they deal with daily, and who picks up their output',
              'How large an agenda they carry — the number of workstations, orders and suppliers',
              'What has to be known on entry and what the person will pick up with you',
            ],
          },
        },
        {
          heading: 'Using the national occupations register for requirements',
          body: [
            'The Czech national occupations register, maintained by the Ministry of Labour and Social Affairs, describes individual occupations and their typical positions, including the usual work activities, the knowledge and skills needed and the corresponding level of education.',
            'For a brief it is useful mainly as a neutral vocabulary: comparing the catalogue description with what the person will actually do quickly shows which requirements are usual for the occupation and which are your own specifics, which then need explaining in the offer.',
            'Where a corresponding professional qualification exists, its requirements are described by the Czech national qualifications register. For pay ranges, rely on the Czech average earnings information system, which publishes figures by occupation and region — no figures of our own are stated here, because they would not be verifiable.',
          ],
        },
        {
          heading: 'The administrative side',
          body: [
            'Alongside technical roles, the category includes the operation’s administrative support — payroll and personnel administration, invoicing, records and purchasing administration. These posts are filled differently from technical roles: what decides is knowledge of the particular system the work is kept in, currency with the applicable regulations, and reliability against deadlines, because neither the payroll close nor the sending out of documents will wait. That is also why cover matters most here — one irreplaceable person is an operational risk that shows up at the first longer absence.',
            'The brief should also cover work with sensitive data: payroll and personnel administration handles employees’ personal data, and access rights and confidentiality are best settled at the point of joining. This page stays with the administrative and technical support of manufacturing, warehouse and logistics operations; senior financial management and narrowly specialised roles outside that context are not covered here.',
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
        'Dispatcher, transport planner, warehouse manager, supply specialist, customs declarant: what to verify in this layer and why it is thin on the market.',
      h1: 'Specialist logistics roles: planning, dispatch and warehouse management',
      intro:
        'Most recruitment writing about logistics describes the operational layer — the people who physically receive, store, pick and send goods out. Above it sits a considerably thinner layer of specialist roles that decide what moves when and where: dispatch, transport planning, warehouse management, supply and customs. These positions are filled differently from operational shifts. What decides is knowledge of particular systems, the ability to plan in conditions that change during the day, and responsibility for a decision whose cost only shows later. This page describes what to verify in this layer and why filling it is a different task from recruiting for the operation.',
      breadcrumb: 'Logistics specialists',
      sections: [
        {
          heading: 'Where the operational layer ends and the specialist one begins',
          body: [
            'The boundary is best drawn by who carries out the plan and who creates it. A warehouse worker, a materials handler, a picking operative or a shipping operative works to a brief the system and the shift bring them. A dispatcher, a planner or a warehouse manager assembles that brief, changes it during the day and carries its consequences. The operational roles have pages of their own; this page deals only with the layer above them.',
            'The difference shows up as soon as the position is briefed. For an operational role it is enough to describe the workplace, the shift pattern and the physical demands. For a specialist role the responsibility has to be described: what volume, how many people, which systems, what decision-making authority, and what is supposed to happen when the plan and reality part company.',
          ],
        },
        {
          heading: 'Which roles make up this layer',
          body: [
            'Titles differ from company to company, but the content of the roles recurs. In a brief it is therefore better to describe the responsibility than the title — the same title means something different in a small warehouse and in a distribution centre.',
            'The Czech national occupations register describes occupations and their usual requirements, and is a suitable starting point where a brief needs clarifying.',
          ],
          list: {
            intro: 'The roles that recur, whatever they are called:',
            items: [
              'Dispatcher — runs the daily flow of vehicles and consignments and decides in real time when the plan stops holding',
              'Transport planner — builds routes and runs, consolidates orders, and watches load utilisation and the fit with time windows',
              'Shipping coordinator — holds the handovers between picking, checking and clearing the carrier',
              'Warehouse shift supervisor — responsible for staffing the shift, the pace, the quality and the handover to the shift that follows',
              'Warehouse manager — responsible for the operation as a whole: capacity, stock, equipment, people and cost',
              'Supply specialist — watches the availability of material or goods, reorder levels, and communication with suppliers',
              'Customs declarant — prepares and lodges customs documents and keeps track of the procedures for consignments outside the EU customs territory',
              'WMS specialist — administers the warehouse system, its processes, its master data and the outputs used for management',
            ],
          },
        },
        {
          heading: 'Working with systems as a real selection criterion',
          body: [
            'For this layer, working with systems is one of the few criteria selection can honestly verify. It is not about the brand of WMS or ERP named in a CV. What decides is depth: the work of someone who only confirms tasks in the system differs from that of someone who creates master data, sets putaway rules, resolves stock discrepancies and can get a usable basis for a decision out of the system.',
            'This is verified by questions about situations, not about the names of modules. Transferability between systems tends to be high for an experienced person who understands the logic of the process; knowledge of one particular system without that understanding, by contrast, is over-valued in advertisements and needlessly narrows the field.',
          ],
          list: {
            intro: 'What to ask about:',
            items: [
              'What they did in the system themselves, and what somebody else did after them',
              'How they handled a difference between the system stock and the physical stock, and who approved the correction',
              'What role they had in the stocktake, and what changed after it',
              'Which data from the system they followed regularly, and what decisions they took on the basis of it',
              'Whether they went through an implementation or a reconfiguration of the system, and what specifically was theirs',
            ],
          },
        },
        {
          heading: 'Customs work and consignments outside the EU customs territory',
          body: [
            'Some logistics operations manage without customs work; others rest on it. Where goods cross the boundary of the EU customs territory, you need someone who can prepare and lodge customs documents, work with customs procedures and representation, and keep track of the associated documentation. That competence is usually tied closely to a particular type of goods and to the direction of flow, which narrows the pool of suitable people further.',
            'Specific conditions, the scope of representation, deadlines and fees are not stated here — customs rules derive from EU legislation and its Czech implementation, and are to be verified with the Czech customs administration. For a brief, what matters is describing which procedures and which directions of flow the person will actually handle; without that, CVs cannot sensibly be compared.',
          ],
        },
        {
          heading: 'Planning under instability, and the interface with the operation',
          body: [
            'Planning roles in logistics differ from planning in manufacturing in how fast the inputs change: a delayed delivery, a cancelled carrier, missing people on a shift, an exceptional order. The qualification does not show on a calm day but at the moment the plan stops holding. In selection it is therefore worth having the candidate describe a specific day when the plan fell apart: what they did first, whom they informed, what they gave up, and on what basis they decided.',
            'The other half of the role is the interface with the operation. Both the dispatcher and the shift supervisor stand between the plan and the people who carry it out, and the brief has to be intelligible to a shift working at high pace, part of which joined recently. A shift supervisor is moreover often in the position of a managerial employee within the meaning of the Czech Labour Code — that is, where other employees are subordinated to them and they assign and organise their work; that position also carries responsibility for compliance with occupational health and safety rules in the section entrusted to them. That is a different responsibility from coordination, and it is worth naming it in the profile.',
          ],
        },
        {
          heading: 'Why this layer is thin on the market',
          body: [
            'Every warehouse has many operational roles and only a few specialist ones — warehouse management, dispatch, planning, system administration. The competence moreover forms over time inside a particular operation rather than at school, so the people who have it are usually not looking for work and do not respond to advertisements.',
            'No figures on the availability of these occupations are stated here; labour market data are published by the Czech Ministry of Labour and Social Affairs, the Czech Labour Office and the Czech Statistical Office.',
            'There are therefore two realistic routes, and they are usually combined: promotion from within the operational layer, and approaching people who currently work elsewhere. With promotion from within, what decides is whether you can give the person time and support for what they have not done before — planning, dealing with carriers, leading people. Formal qualification can be added through the system of professional qualifications, whose standards are maintained by the Czech national qualifications register.',
            'Do not estimate a pay range and do not take one from other companies’ advertisements. Publicly available data on earnings by occupation is provided by the Czech average earnings information system; this page states no amounts.',
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
        'The difference between operational purchasing, inventory planning and strategic purchasing, and what selection can actually verify in candidates for these roles.',
      h1: 'Purchasing and supply: filling roles where authority decides',
      intro:
        'Purchasing is among the areas where a job title and the actual responsibility diverge most. "Buyer" covers both the person who orders to a plan and watches dates, and the person who selects suppliers and negotiates framework terms years ahead. The difference between them is not experience but the degree of decision-making authority — and that is what determines who is worth approaching. This page helps define the position and points out what can be verified in candidates and what stays tied to a particular company and its supply chain.',
      breadcrumb: 'Purchasing and supply',
      sections: [
        {
          heading: 'Three levels under one title',
          body: [
            'Operational purchasing works inside given rules: it orders to the needs of production, watches confirmations and dates, handles expediting and deviations. It decides how, not from whom.',
            'Inventory planning sits between purchasing and production. It determines how much of what should be available and when, and carries the consequences of both errors — stopped production and money needlessly tied up in stock.',
            'Strategic purchasing selects suppliers, negotiates terms and carries responsibility for supplier risk. It calls for a different kind of person and is usually remunerated differently as well.',
          ],
        },
        {
          heading: 'Sector knowledge, and what can be learned',
          body: [
            'Industry convention: knowledge of a particular commodity group — steel, plastics, electronic components, packaging — carries real weight. Someone who has bought castings for years understands where problems with dates and quality arise, and that is not quickly made up.',
            'A company’s own specifics: the particular enterprise system, the approval rules, the history of supplier relationships. A candidate cannot know any of that in advance; it is a matter of onboarding, not of selection.',
            'The practical consequence for a brief: asking for commodity knowledge makes sense, while asking for knowledge of the system usually narrows the pool of people for no good reason.',
          ],
        },
        {
          heading: 'Where purchasing meets quality and logistics',
          body: [
            'Purchasing does not work in isolation. On supplier complaints it overlaps with quality management, on imports with customs and transport, on planning with production.',
            'For recruitment that means establishing which part of those interfaces falls inside the role. A company where the buyer handles complaints and supplier assessment themselves is looking for a different person from a company where that agenda is run by quality.',
          ],
        },
        {
          heading: 'What selection can actually verify',
          body: [
            'In purchasing, the skills most talked about are the hardest to verify. Negotiation cannot be read from a CV, and general questions about it do not help.',
            'More usable is to have the candidate describe concrete situations rather than to ask about skills in the abstract. The answer shows whether they think in the context of the operation or merely administer orders.',
          ],
          list: {
            intro: 'What a selection process can establish:',
            items: [
              'A description of a specific supply failure — what they did, whom they involved and how it ended',
              'Experience with the commodity group in question',
              'The scope of independent decision-making in their previous role',
              'Experience with supplier evaluation and supplier audits',
              'Language ability, where foreign suppliers are involved',
            ],
          },
        },
        {
          heading: 'Supplier risk as a skill in its own right',
          body: [
            'Purchasing is judged on price but revealed by how it handles failures. Working with supplier risk is what separates an experienced person from someone who can only place orders.',
            'It covers watching a supplier’s financial condition and the ability to recognise warning signs — in the way a supplier communicates, or in dates that gradually slip.',
            'Industry convention: in supply chains with documented quality, supplier evaluation and supplier audit are often part of the role. The scope varies by sector and by what customers require; it is not a statutory duty of purchasing, but for many customers it is a contractual condition.',
          ],
          list: {
            intro: 'What to look for:',
            items: [
              'An overview of where the company depends on a single supplier',
              'A fallback prepared for critical items',
              'Supplier evaluation, and how regularly it is done',
              'Reacting to dates that gradually slip, rather than waiting for the delivery to fail',
            ],
          },
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
