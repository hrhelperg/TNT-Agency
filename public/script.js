/* ================================================================
   TNT AGENCY — script.js  |  i18n + UI
   ================================================================ */

/* ----------------------------------------------------------------
   TRANSLATIONS
   ---------------------------------------------------------------- */
const T = {
  en: {
    nav: {
      employers:   'For Employers',
      candidates:  'For Candidates',
      industries:  'Industries',
      about:       'About',
      contact:     'Contact',
      calc:        'Payroll calculator',
      home:        'Home',
      agencies:    'Agencies',
      offers:      'Offers',
      article:     'Guide',
      submitAgency:'List your agency',
      postOffer:   'Post a request',
      contactCta:  'Contact us',
      language:    'Language',
      cta:         'Start Hiring',
    },
    calc: {
      eyebrow: 'Employee cost calculator',
      heading: 'Calculate the true cost of an employee',
      sub:     'See the employee’s net salary, statutory contributions and the total monthly employer cost under the rules of the Czech Republic.',
    },
    pages: {
      contactH1: 'Ready to find your next great hire?',
      contactSub: 'Tell us about your open role. We reply on business days.',
      contactHours: 'Mon–Fri: 8:00 – 17:00',
      offersEyebrow: 'Offers & opportunities',
      offersH1: 'Browse offers and find your next role',
      offersSub: 'Client requests from companies seeking staffing support, plus open positions for candidates. All reviewed manually before going live.',
      offersListTitle: 'Offers coming soon',
      offersListBody: 'Companies are posting their requirements and we review them before they appear here. Be first to get matched — post your offer today.',
      offersListBtn: 'Post your offer',
      offersPostEyebrow: 'Post your requirement',
      offersPostH2: 'Looking for a recruitment or staffing agency?',
      offersPostSub: 'Tell us what you need and qualified agencies will be able to review your offer. Free, fast, and fully moderated.',
      offersPostBtn: 'Post your offer →',
      agenciesEyebrow: 'Agency directory & services',
      agenciesH1: 'Find the right agency partner',
      agenciesSub: 'Browse verified recruitment and staffing agencies, explore our services, and discover how TalentPartnerID can fill your next role — fast.',
      agenciesListTitle: 'Agency listings coming soon',
      agenciesListBody: 'We are building this directory. Agencies are submitted by their owners and reviewed manually before appearing here. Be among the first to get listed.',
      agenciesListBtn: 'Submit your agency',
      agGetEyebrow: 'Get listed',
      agGetH2: 'Are you a recruitment or staffing agency?',
      agGetSub: 'Submit your profile and start getting discovered by companies looking for your exact services. Free, fast, and no account needed.',
      agGetBtn: 'Submit your agency →',
      submitAgEyebrow: 'Agency submission',
      submitAgH1: 'Submit your agency',
      submitAgSub: 'Get your agency in front of companies looking for recruitment and staffing services. Every submission is reviewed manually — nothing is published automatically.',
      submitOffEyebrow: 'Client offer',
      submitOffH1: 'Post your offer',
      submitOffSub: 'Tell us what you need and we will forward your request to relevant agencies. All submissions go to the site owner for manual review — nothing is published automatically.',
      cardBtn: 'Write an e-mail',
      cardEmailLabel: 'E-mail:',
      cardPhoneLabel: 'Phone:',
      contactCardTitle: 'Write to us',
      contactCardBody: 'Describe the position or request by e-mail and we will get back to you as soon as possible.',
      submitAgCardTitle: 'Agency registration',
      submitAgCardBody: 'Send us an e-mail with your agency name, website, services offered, location and a short description. We will get back to you.',
      submitOffCardTitle: 'Worker request',
      submitOffCardBody: 'Send us an e-mail with your company, the workers you need, the number, location, shift model and required start date. We will get back to you.',
    },
    hero: {
      badge:  'Employment Agency · Talent. Network. Trust.',
      h1a:    'We Connect',
      h1b:    'the Right People',
      h1c:    'with the Right',
      h1accent: 'Companies.',
      sub:    'TalentPartnerID is your trusted recruitment partner — delivering qualified candidates for permanent roles, executive positions, and flexible staffing needs across all industries.',
      cta1:   'I\'m Looking for Talent',
      cta2:   'I\'m Looking for a Job',
    },
    stats: {
      s1: 'Successful Placements',
      s2: 'Partner Companies',
      s3: 'Industries Covered',
      s4: 'First Candidates',
    },
    employers: {
      eyebrow: 'For Employers',
      h2:      'Recruitment Services<br>Built Around Your Business',
      sub:     'From a single hire to building entire departments — we have a solution that fits your hiring needs and timeline.',
      cta:     'Get started →',
    },
    services: [
      {
        title: 'Permanent Placement',
        desc:  'Full-cycle recruitment for long-term positions. We handle everything from job briefing to final offer — with a 90-day replacement guarantee.',
        list:  [
          'Detailed job briefing & candidate profile',
          'Active sourcing from our talent network',
          'Curated shortlist of 3–5 candidates',
          'Interview coordination & reference checks',
          '90-day free replacement guarantee',
        ],
      },
      {
        title: 'Executive Search',
        desc:  'Confidential headhunting for senior managers, directors, and C-level executives. We reach the passive candidates others can\'t access.',
        list:  [
          'Market mapping & competitor analysis',
          'Direct approach to passive candidates',
          'Comprehensive executive assessment',
          'Salary benchmarking & package advice',
          'Full discretion & confidentiality guaranteed',
        ],
      },
      {
        title: 'Temporary Staffing',
        desc:  'Flexible workforce for seasonal peaks, project work, maternity cover, or short-term capacity needs. Ready to work within days.',
        list:  [
          'Pre-screened, job-ready candidates',
          'Available within 24–72 hours',
          'Full payroll & HR administration handled',
          'Easy extension or permanent conversion',
          'Volume staffing capability',
        ],
      },
      {
        title: 'HR Consulting & RPO',
        desc:  'Outsource part or all of your recruitment process. Our HR experts help you design hiring processes, employer branding, and workforce strategy.',
        list:  [
          'Recruitment Process Outsourcing (RPO)',
          'HR policy & process design',
          'Employer branding strategy',
          'Onboarding programme development',
          'Compensation & benefits benchmarking',
        ],
      },
    ],
    process: {
      eyebrow: 'How It Works',
      h2:      'From Brief to Hire<br>in Three Steps',
      sub:     'A clear, efficient process that respects your time and delivers results — every time.',
      cta:     'Book a Free Consultation',
      steps: [
        {
          num:  '01',
          title: 'Brief Us',
          desc:  'Schedule a free 30-minute consultation. Tell us about your company culture, the role, required skills, and your ideal candidate profile. The clearer your brief, the faster we deliver.',
        },
        {
          num:  '02',
          title: 'We Search',
          desc:  'Our recruiters immediately activate our talent network and database of 50,000+ profiles. We combine data-driven sourcing with direct headhunting to find people who are genuinely the right fit.',
        },
        {
          num:  '03',
          title: 'You Hire',
          desc:  'We present a curated shortlist of 3–5 pre-vetted candidates, coordinate all interviews, support salary negotiation, and ensure a smooth onboarding start. Your hire comes with our guarantee.',
        },
      ],
    },
    industries: {
      eyebrow: 'Industries',
      h2:      'We Recruit Across<br>All Key Sectors',
      sub:     'Deep specialization in each sector means faster results, better candidates, and smarter market insights for your business.',
      note:    'Don\'t see your industry? <a href="#contact">Get in touch</a> — we place candidates across many more sectors.',
      list: [
        { icon: '🏭', label: 'Manufacturing' },
        { icon: '💻', label: 'IT & Technology' },
        { icon: '💰', label: 'Finance & Banking' },
        { icon: '🏥', label: 'Healthcare & Pharma' },
        { icon: '⚙️', label: 'Engineering' },
        { icon: '🚛', label: 'Logistics & Supply Chain' },
        { icon: '🛒', label: 'Retail & E-commerce' },
        { icon: '🏗️', label: 'Construction' },
        { icon: '⚖️', label: 'Legal & Compliance' },
        { icon: '⚡', label: 'Energy & Utilities' },
        { icon: '🎓', label: 'Education & Training' },
        { icon: '🏨', label: 'Hospitality & Tourism' },
      ],
    },
    candidates: {
      eyebrow: 'For Candidates',
      h2:      'Looking for Your<br>Next Career Move?',
      sub:     'Join thousands of professionals we\'ve successfully placed across Europe. Our service is completely <strong>free</strong> for candidates — always.',
      benefits: [
        { title: 'Free service — no fees, ever',       desc: 'We are paid by employers. You never pay a single cent.' },
        { title: 'Confidential & discreet',            desc: 'Your CV is never shared without your explicit permission.' },
        { title: 'One CV — multiple opportunities',    desc: 'We match your profile across all our active vacancies automatically.' },
        { title: 'Career support & coaching',          desc: 'CV review, interview preparation, and honest salary advice.' },
      ],
      cta1:  'Send Your CV',
      cta2:  'Talk to a Recruiter',
      card: {
        label: 'Currently recruiting for',
        roles: [
          { color: '#f05a28', text: 'Production Manager · Manufacturing' },
          { color: '#3b82f6', text: 'Senior Software Engineer · IT' },
          { color: '#22c55e', text: 'Financial Controller · Finance' },
          { color: '#a855f7', text: 'Logistics Coordinator · Supply Chain' },
          { color: '#f0b429', text: 'HR Business Partner · HR' },
          { color: '#14b8a6', text: 'Sales Director · Retail' },
        ],
        link: 'View all positions →',
      },
    },
    why: {
      eyebrow: 'Why TalentPartnerID',
      h2:      'We Don\'t Just Fill Positions.<br>We Build Lasting Teams.',
      cards: [
        { num: '01', title: 'Speed Without Compromise',   desc: 'First qualified candidates delivered within 24 hours of receiving your brief. We move fast because we maintain an active, pre-screened talent pipeline — not a static CV database.' },
        { num: '02', title: '90-Day Guarantee',           desc: 'Every permanent placement comes with a 90-day free replacement guarantee. If the hire doesn\'t work out within the guarantee period, we find a replacement — at no additional cost.' },
        { num: '03', title: 'Deep Industry Knowledge',    desc: 'Each of our recruiters specializes in specific sectors. This means we understand the roles we recruit for, speak the language of your industry, and know exactly what good looks like.' },
        { num: '04', title: 'Transparent Process',        desc: 'No black-box recruitment. You get regular updates, candidate profiles with honest assessments, and a dedicated consultant who answers your calls — not a ticketing system.' },
      ],
    },
    testi: {
      eyebrow: 'Client Reviews',
      h2:      'What Our Clients Say',
      items: [
        { quote: 'Add your client testimonial here. Describe how TalentPartnerID helped your company find the right candidate quickly and professionally.', name: '[Client Name]', role: '[Position] · [Company]' },
        { quote: 'Add your second client testimonial here. Highlight speed of delivery, quality of candidates, or the personal service your team provided.',  name: '[Client Name]', role: '[Position] · [Company]' },
        { quote: 'Add your third client testimonial here. Mention the specific service (executive search, temp staffing, etc.) and the result achieved.',      name: '[Client Name]', role: '[Position] · [Company]' },
      ],
    },
    contact: {
      eyebrow:     'Get In Touch',
      h2:          'Ready to Find<br>Your Next Great Hire?',
      sub:         'Tell us about your open role. We\'ll get back to you on business days.',
      labelPhone:  'Phone',
      labelEmail:  'Email',
      labelOffice: 'Office',
      labelHours:  'Business Hours',
      hours:       'Mon–Fri: 8:00 – 17:00',
      form: {
        h3:         'Send Us a Brief',
        name:       'Your Name *',
        namePh:     'John Smith',
        company:    'Company *',
        companyPh:  'Company Ltd.',
        email:      'Email Address *',
        emailPh:    'john@company.com',
        phone:      'Phone Number',
        phonePh:    '+420 776 858 284',
        service:    'Service Needed',
        servicePh:  'Select a service…',
        opts: [
          { v: 'permanent',  t: 'Permanent Placement' },
          { v: 'executive',  t: 'Executive Search' },
          { v: 'temp',       t: 'Temporary Staffing' },
          { v: 'rpo',        t: 'HR Consulting / RPO' },
          { v: 'candidate',  t: 'I\'m a Candidate' },
          { v: 'other',      t: 'Other / Not sure yet' },
        ],
        message:    'Tell Us About the Role *',
        messagePh:  'Job title, key requirements, timeline, and any other relevant details…',
        submit:     'Send Brief →',
        note:       '100% confidential.',
        sending:    'Sending…',
        sent:       'Sent ✓',
        successMsg: 'Message sent! We\'ll be in touch within 24 hours.',
        errorMsg:   'Something went wrong. Please email us directly at jobbohemiacz@gmail.com',
        errorFields:'Please fill in all required fields.',
        errorEmail: 'Please enter a valid email address.',
      },
    },
    footer: {
      tagline:    'Your trusted employment and staffing partner. Connecting the right people with the right companies since day one.',
      colEmployers: 'For Employers',
      colCompany:   'Company',
      colFollow:    'Follow Us',
      colServices:  'Our services',
      colNavigate:  'Navigate',
      colGuides:    'Guides',
      colContact:   'Contact',
      navAgencies:  'Agencies',
      navOffers:    'Offers',
      navCalc:      'Payroll calculator',
      navSubmitAgency: 'List your agency',
      navPostOffer: 'Post a request',
      navContact:   'Contact',
      navTaxes:     'Social & health contributions 2026',
      navBlog:      'Blog',
      guide1: 'Employing foreigners',
      guide2: 'Work permit in the Czech Republic',
      guide3: 'Recruiting foreign workers',
      guide4: 'Minimum wage 2026',
      guide5: 'Frequently asked questions',
      links: {
        permanent:  'Permanent Placement',
        executive:  'Executive Search',
        temp:       'Temporary Staffing',
        rpo:        'HR Consulting & RPO',
        about:      'About Us',
        industries: 'Industries',
        candidates: 'For Candidates',
        contact:    'Contact',
      },
      copy:  '© 2026 TNT agency s.r.o. All rights reserved.',
      terms: 'Terms',
      priv:  'Privacy',
      cook:  'Cookies',
    },
  },

  /* ============================================================
     CZECH
     ============================================================ */
  cs: {
    nav: {
      employers:  'Pro zaměstnavatele',
      candidates: 'Pro uchazeče',
      industries: 'Odvětví',
      about:      'O nás',
      contact:    'Kontakt',
      calc:       'Kalkulačka mezd',
      home:        'Úvod',
      agencies:    'Agentury',
      offers:      'Nabídky',
      article:     'Průvodce',
      submitAgency:'Registrovat agenturu',
      postOffer:   'Zadat poptávku',
      contactCta:  'Kontaktujte nás',
      language:    'Jazyk',
      cta:        'Hledám pracovníky',
    },
    calc: {
      eyebrow: 'Kalkulačka nákladů zaměstnance',
      heading: 'Spočítejte skutečné náklady na zaměstnance',
      sub:     'Zjistěte čistou mzdu zaměstnance, zákonné odvody a celkové měsíční náklady zaměstnavatele podle pravidel platných v České republice.',
    },
    pages: {
      contactH1: 'Chcete najít skvělého zaměstnance?',
      contactSub: 'Napište nám o vaší volné pozici. Na zprávy odpovídáme v pracovní dny.',
      contactHours: 'Po–Pá: 8:00 – 17:00',
      offersEyebrow: 'Nabídky a příležitosti',
      offersH1: 'Procházejte nabídky a najděte novou roli',
      offersSub: 'Poptávky firem hledajících personální podporu i otevřené pozice pro uchazeče. Vše ručně kontrolujeme před zveřejněním.',
      offersListTitle: 'Nabídky již brzy',
      offersListBody: 'Firmy vkládají své poptávky a my je před zveřejněním kontrolujeme. Buďte první, koho spojíme – zadejte svou poptávku ještě dnes.',
      offersListBtn: 'Zadat poptávku',
      offersPostEyebrow: 'Zadejte poptávku',
      offersPostH2: 'Hledáte personální nebo pracovní agenturu?',
      offersPostSub: 'Napište nám, co potřebujete, a kvalifikované agentury si vaši poptávku budou moci prohlédnout. Zdarma, rychle a plně moderované.',
      offersPostBtn: 'Zadat poptávku →',
      agenciesEyebrow: 'Katalog agentur a služby',
      agenciesH1: 'Najděte správného agenturního partnera',
      agenciesSub: 'Procházejte ověřené personální a pracovní agentury, prozkoumejte naše služby a zjistěte, jak vám TalentPartnerID rychle obsadí další pozici.',
      agenciesListTitle: 'Seznam agentur již brzy',
      agenciesListBody: 'Katalog teprve budujeme. Agentury zadávají jejich majitelé a před zveřejněním je ručně kontrolujeme. Buďte mezi prvními v seznamu.',
      agenciesListBtn: 'Registrovat agenturu',
      agGetEyebrow: 'Zviditelněte se',
      agGetH2: 'Jste personální nebo pracovní agentura?',
      agGetSub: 'Zadejte svůj profil a začněte být vidět u firem, které hledají přesně vaše služby. Zdarma, rychle a bez registrace účtu.',
      agGetBtn: 'Registrovat agenturu →',
      submitAgEyebrow: 'Registrace agentury',
      submitAgH1: 'Registrujte svou agenturu',
      submitAgSub: 'Zviditelněte svou agenturu u firem, které hledají personální a náborové služby. Každou registraci kontrolujeme ručně – nic se nezveřejňuje automaticky.',
      submitOffEyebrow: 'Poptávka klienta',
      submitOffH1: 'Zadejte poptávku',
      submitOffSub: 'Napište nám, co potřebujete, a my vaši poptávku předáme relevantním agenturám. Vše prochází ruční kontrolou provozovatele – nic se nezveřejňuje automaticky.',
      cardBtn: 'Napsat e-mail',
      cardEmailLabel: 'E-mail:',
      cardPhoneLabel: 'Telefon:',
      contactCardTitle: 'Napište nám',
      contactCardBody: 'Popište nám pozici nebo poptávku e-mailem a co nejdříve se vám ozveme.',
      submitAgCardTitle: 'Registrace agentury',
      submitAgCardBody: 'Napište nám e-mail a uveďte název agentury, web, nabízené služby, lokalitu a krátký popis. Ozveme se vám.',
      submitOffCardTitle: 'Poptávka pracovníků',
      submitOffCardBody: 'Napište nám e-mail a uveďte firmu, o jaké pracovníky máte zájem, počet, lokalitu, směnový model a požadovaný termín nástupu. Ozveme se vám.',
    },
    hero: {
      badge:    'Personální agentura · Talent. Síť. Důvěra.',
      h1a:      'Spojujeme',
      h1b:      'správné lidi',
      h1c:      'se správnými',
      h1accent: 'firmami.',
      sub:      'TNT agency s.r.o. je váš spolehlivý partner v oblasti náboru — dodáváme kvalifikované kandidáty na trvalé, manažerské i flexibilní pozice napříč všemi odvětvími.',
      cta1:     'Hledám pracovníky',
      cta2:     'Hledám práci',
    },
    stats: {
      s1: 'Úspěšných umístění',
      s2: 'Firemních partnerů',
      s3: 'Pokrytých odvětví',
      s4: 'První kandidáti',
    },
    employers: {
      eyebrow: 'Pro zaměstnavatele',
      h2:      'Personální služby<br>přizpůsobené vašemu byznysu',
      sub:     'Od jediné pozice po budování celých týmů — máme řešení, které odpovídá vašim potřebám a časovému harmonogramu.',
      cta:     'Začít →',
    },
    services: [
      {
        title: 'Přímé umístění',
        desc:  'Kompletní nábor na trvalé pozice. Postaráme se o vše od zadání požadavků až po finální nabídku — se zárukou náhrady na 90 dní.',
        list:  [
          'Podrobný popis pracovního místa a profilu kandidáta',
          'Aktivní sourcing z naší sítě talentů',
          'Výběr 3–5 předem prověřených kandidátů',
          'Koordinace pohovorů a ověření referencí',
          'Záruka bezplatné náhrady na 90 dní',
        ],
      },
      {
        title: 'Executive Search',
        desc:  'Důvěrné vyhledávání pro vrcholové manažery, ředitele a C-level pozice. Oslovujeme pasivní kandidáty, na které ostatní nedosáhnou.',
        list:  [
          'Mapování trhu a analýza konkurence',
          'Přímé oslovení pasivních kandidátů',
          'Komplexní hodnocení manažerů',
          'Mzdová srovnávací analýza a poradenství',
          'Plná diskrétnost a důvěrnost zaručena',
        ],
      },
      {
        title: 'Agenturní zaměstnávání',
        desc:  'Flexibilní pracovní síla pro sezónní špičky, projektové práce, zástupy za rodičovskou dovolenou nebo krátkodobé kapacitní potřeby. Připraveni nastoupit do dnů.',
        list:  [
          'Předem prověření, připravení kandidáti',
          'Dostupní do 24–72 hodin',
          'Veškerá mzdová agenda a HR administrativa zajištěna',
          'Snadné prodloužení nebo převod na trvalý poměr',
          'Schopnost hromadného zajištění personálu',
        ],
      },
      {
        title: 'Personální poradenství a RPO',
        desc:  'Outsourcujte část nebo celý proces náboru. Naši HR experti vám pomohou navrhnout náborové procesy, employer branding a personální strategii.',
        list:  [
          'Outsourcing náborového procesu (RPO)',
          'Design HR politik a procesů',
          'Strategie employer brandingu',
          'Vývoj onboardingového programu',
          'Benchmarking odměňování a benefitů',
        ],
      },
    ],
    process: {
      eyebrow: 'Jak to funguje',
      h2:      'Od zadání po nástup<br>ve třech krocích',
      sub:     'Jasný a efektivní proces, který respektuje váš čas a přináší výsledky — pokaždé.',
      cta:     'Sjednat bezplatnou konzultaci',
      steps: [
        {
          num:   '01',
          title: 'Zadejte požadavky',
          desc:  'Domluvte si bezplatnou 30minutovou konzultaci. Řekněte nám o kultuře vaší firmy, pozici, požadovaných dovednostech a ideálním profilu kandidáta. Čím jasnější zadání, tím rychlejší dodání.',
        },
        {
          num:   '02',
          title: 'Hledáme',
          desc:  'Naši náboráři okamžitě aktivují svou síť talentů a databázi více než 50 000 profilů. Kombinujeme datově řízený sourcing s přímým oslovováním kandidátů.',
        },
        {
          num:   '03',
          title: 'Najímáte',
          desc:  'Předložíme výběr 3–5 prověřených kandidátů, zkoordinujeme pohovory, podpoříme vyjednávání o mzdě a zajistíme hladký nástup. Každý nábor je kryt naší zárukou.',
        },
      ],
    },
    industries: {
      eyebrow: 'Odvětví',
      h2:      'Obsazujeme pozice<br>ve všech klíčových sektorech',
      sub:     'Hluboká specializace v každém sektoru znamená rychlejší výsledky, lepší kandidáty a chytřejší tržní přehled pro váš byznys.',
      note:    'Vaše odvětví tu není? <a href="#contact">Kontaktujte nás</a> — obsazujeme pozice v mnoha dalších sektorech.',
      list: [
        { icon: '🏭', label: 'Výroba' },
        { icon: '💻', label: 'IT a technologie' },
        { icon: '💰', label: 'Finance a bankovnictví' },
        { icon: '🏥', label: 'Zdravotnictví a farmacie' },
        { icon: '⚙️', label: 'Strojírenství' },
        { icon: '🚛', label: 'Logistika a dodavatelský řetězec' },
        { icon: '🛒', label: 'Maloobchod a e-commerce' },
        { icon: '🏗️', label: 'Stavebnictví' },
        { icon: '⚖️', label: 'Právo a compliance' },
        { icon: '⚡', label: 'Energetika a utility' },
        { icon: '🎓', label: 'Vzdělávání a školení' },
        { icon: '🏨', label: 'Pohostinství a cestovní ruch' },
      ],
    },
    candidates: {
      eyebrow: 'Pro uchazeče',
      h2:      'Hledáte<br>novou kariérní příležitost?',
      sub:     'Přidejte se k tisícům profesionálů, které jsme úspěšně umístili po celé Evropě. Naše služba je pro uchazeče zcela <strong>zdarma</strong> — vždy.',
      benefits: [
        { title: 'Zdarma — žádné poplatky, nikdy',    desc: 'Platí nám zaměstnavatelé. Vy nikdy neplatíte ani korunu.' },
        { title: 'Důvěrný a diskrétní přístup',       desc: 'Váš životopis nikdy nesdílíme bez vašeho výslovného souhlasu.' },
        { title: 'Jedno CV — více příležitostí',       desc: 'Váš profil automaticky párujeme se všemi aktivními volnými místy.' },
        { title: 'Kariérní podpora a koučink',         desc: 'Revize CV, příprava na pohovor a upřímné rady ohledně mzdy.' },
      ],
      cta1:  'Poslat životopis',
      cta2:  'Promluvit s náborářem',
      card: {
        label: 'Aktuálně hledáme',
        roles: [
          { color: '#f05a28', text: 'Výrobní manažer · Výroba' },
          { color: '#3b82f6', text: 'Senior softwarový inženýr · IT' },
          { color: '#22c55e', text: 'Finanční kontrolor · Finance' },
          { color: '#a855f7', text: 'Koordinátor logistiky · Supply Chain' },
          { color: '#f0b429', text: 'HR Business Partner · HR' },
          { color: '#14b8a6', text: 'Obchodní ředitel · Maloobchod' },
        ],
        link: 'Zobrazit všechny pozice →',
      },
    },
    why: {
      eyebrow: 'Proč TalentPartnerID',
      h2:      'Neobsazujeme jen pozice.<br>Budujeme trvalé týmy.',
      cards: [
        { num: '01', title: 'Rychlost bez kompromisů',       desc: 'První kvalifikovaní kandidáti dodáni do 24 hodin od obdržení zadání. Jsme rychlí, protože udržujeme aktivní, předem prověřený talent pipeline — ne statickou databázi životopisů.' },
        { num: '02', title: 'Záruka 90 dní',                 desc: 'Každé přímé umístění je kryto 90denní zárukou bezplatné náhrady. Pokud nábor nevyjde do záruční lhůty, zajistíme náhradu — bez dalších nákladů.' },
        { num: '03', title: 'Hluboká znalost odvětví',       desc: 'Každý z našich náborářů se specializuje na konkrétní sektory. Rozumíme pozicím, na které nabíráme, mluvíme jazykem vašeho odvětví a víme, jak vypadá opravdu dobrý kandidát.' },
        { num: '04', title: 'Transparentní proces',          desc: 'Žádný nábor v temnotách. Dostáváte pravidelné aktualizace, profily kandidátů s upřímnými hodnoceními a dedikovaného konzultanta, který zvedá telefon — ne systém tiketů.' },
      ],
    },
    testi: {
      eyebrow: 'Hodnocení klientů',
      h2:      'Co říkají naši klienti',
      items: [
        { quote: 'Přidejte první referencí klienta. Popište, jak TalentPartnerID pomohla vaší firmě rychle a profesionálně najít správného kandidáta.', name: '[Jméno klienta]', role: '[Pozice] · [Firma]' },
        { quote: 'Přidejte druhou referencí klienta. Zdůrazněte rychlost dodání, kvalitu kandidátů nebo osobní přístup vašeho týmu.',              name: '[Jméno klienta]', role: '[Pozice] · [Firma]' },
        { quote: 'Přidejte třetí referencí klienta. Zmiňte konkrétní službu (executive search, agenturní zaměstnávání apod.) a dosažený výsledek.', name: '[Jméno klienta]', role: '[Pozice] · [Firma]' },
      ],
    },
    contact: {
      eyebrow:     'Kontaktujte nás',
      h2:          'Připraveni najít<br>vašeho ideálního kandidáta?',
      sub:         'Řekněte nám o volné pozici. Na zprávy odpovídáme v pracovní dny.',
      labelPhone:  'Telefon',
      labelEmail:  'E-mail',
      labelOffice: 'Kancelář',
      labelHours:  'Pracovní doba',
      hours:       'Po–Pá: 8:00 – 17:00',
      form: {
        h3:         'Pošlete nám zadání',
        name:       'Vaše jméno *',
        namePh:     'Jan Novák',
        company:    'Firma *',
        companyPh:  'Firma s.r.o.',
        email:      'E-mailová adresa *',
        emailPh:    'jan@firma.cz',
        phone:      'Telefonní číslo',
        phonePh:    '+420 776 858 284',
        service:    'Požadovaná služba',
        servicePh:  'Vyberte službu…',
        opts: [
          { v: 'permanent',  t: 'Přímé umístění' },
          { v: 'executive',  t: 'Executive Search' },
          { v: 'temp',       t: 'Agenturní zaměstnávání' },
          { v: 'rpo',        t: 'Personální poradenství / RPO' },
          { v: 'candidate',  t: 'Jsem uchazeč o práci' },
          { v: 'other',      t: 'Jiné / Zatím nevím' },
        ],
        message:    'Popište pozici *',
        messagePh:  'Název pozice, klíčové požadavky, časový rámec a další relevantní informace…',
        submit:     'Odeslat zadání →',
        note:       '100% diskrétní.',
        sending:    'Odesílám…',
        sent:       'Odesláno ✓',
        successMsg: 'Zpráva odeslána! Ozveme se vám do 24 hodin.',
        errorMsg:   'Něco se pokazilo. Napište nám přímo na jobbohemiacz@gmail.com',
        errorFields:'Vyplňte prosím všechna povinná pole.',
        errorEmail: 'Zadejte prosím platnou e-mailovou adresu.',
      },
    },
    footer: {
      tagline:      'Váš spolehlivý partner v oblasti zaměstnávání. Spojujeme správné lidi se správnými firmami od prvního dne.',
      colEmployers: 'Pro zaměstnavatele',
      colCompany:   'Společnost',
      colFollow:    'Sledujte nás',
      colServices:  'Naše služby',
      colNavigate:  'Navigace',
      colGuides:    'Průvodci',
      colContact:   'Kontakt',
      navAgencies:  'Agentury',
      navOffers:    'Nabídky',
      navCalc:      'Kalkulačka mezd',
      navSubmitAgency: 'Registrovat agenturu',
      navPostOffer: 'Zadat poptávku',
      navContact:   'Kontakt',
      navTaxes:     'Sociální a zdravotní odvody 2026',
      navBlog:      'Blog',
      guide1: 'Zaměstnávání cizinců',
      guide2: 'Pracovní povolení v ČR',
      guide3: 'Nábor zahraničních pracovníků',
      guide4: 'Minimální mzda 2026',
      guide5: 'Časté dotazy',
      links: {
        permanent:  'Přímé umístění',
        executive:  'Executive Search',
        temp:       'Agenturní zaměstnávání',
        rpo:        'Personální poradenství a RPO',
        about:      'O nás',
        industries: 'Odvětví',
        candidates: 'Pro uchazeče',
        contact:    'Kontakt',
      },
      copy:  '© 2026 TNT agency s.r.o. Všechna práva vyhrazena.',
      terms: 'Podmínky',
      priv:  'Ochrana dat',
      cook:  'Cookies',
    },
  },

  /* ============================================================
     GERMAN
     ============================================================ */
  de: {
    nav: {
      employers:  'Für Arbeitgeber',
      candidates: 'Für Bewerber',
      industries: 'Branchen',
      about:      'Über uns',
      contact:    'Kontakt',
      calc:       'Lohnrechner',
      home:        'Startseite',
      agencies:    'Agenturen',
      offers:      'Angebote',
      article:     'Ratgeber',
      submitAgency:'Agentur eintragen',
      postOffer:   'Anfrage stellen',
      contactCta:  'Kontakt aufnehmen',
      language:    'Sprache',
      cta:        'Mitarbeiter finden',
    },
    calc: {
      eyebrow: 'Rechner für Mitarbeiterkosten',
      heading: 'Berechnen Sie die tatsächlichen Kosten eines Mitarbeiters',
      sub:     'Sehen Sie den Nettolohn des Arbeitnehmers, die gesetzlichen Beiträge und die gesamten monatlichen Arbeitgeberkosten nach den Regeln der Tschechischen Republik.',
    },
    pages: {
      contactH1: 'Möchten Sie Ihre nächste Fachkraft finden?',
      contactSub: 'Erzählen Sie uns von Ihrer offenen Stelle. Wir antworten an Werktagen.',
      contactHours: 'Mo–Fr: 8:00 – 17:00',
      offersEyebrow: 'Angebote & Möglichkeiten',
      offersH1: 'Angebote durchsuchen und Ihre nächste Rolle finden',
      offersSub: 'Anfragen von Unternehmen, die Personalunterstützung suchen, sowie offene Stellen für Bewerber. Alles wird vor der Veröffentlichung manuell geprüft.',
      offersListTitle: 'Angebote bald verfügbar',
      offersListBody: 'Unternehmen stellen ihre Anfragen ein und wir prüfen sie, bevor sie hier erscheinen. Seien Sie der Erste – stellen Sie Ihre Anfrage noch heute ein.',
      offersListBtn: 'Anfrage stellen',
      offersPostEyebrow: 'Stellen Sie Ihre Anfrage',
      offersPostH2: 'Suchen Sie eine Personal- oder Zeitarbeitsagentur?',
      offersPostSub: 'Sagen Sie uns, was Sie brauchen, und qualifizierte Agenturen können Ihre Anfrage prüfen. Kostenlos, schnell und vollständig moderiert.',
      offersPostBtn: 'Anfrage stellen →',
      agenciesEyebrow: 'Agenturverzeichnis & Leistungen',
      agenciesH1: 'Finden Sie den richtigen Agenturpartner',
      agenciesSub: 'Durchsuchen Sie geprüfte Personal- und Zeitarbeitsagenturen, entdecken Sie unsere Leistungen und erfahren Sie, wie TalentPartnerID Ihre nächste Stelle schnell besetzt.',
      agenciesListTitle: 'Agenturliste bald verfügbar',
      agenciesListBody: 'Wir bauen dieses Verzeichnis auf. Agenturen werden von ihren Inhabern eingetragen und vor der Veröffentlichung manuell geprüft. Seien Sie unter den Ersten.',
      agenciesListBtn: 'Agentur eintragen',
      agGetEyebrow: 'Eintragen lassen',
      agGetH2: 'Sind Sie eine Personal- oder Zeitarbeitsagentur?',
      agGetSub: 'Reichen Sie Ihr Profil ein und werden Sie von Unternehmen gefunden, die genau Ihre Leistungen suchen. Kostenlos, schnell und ohne Konto.',
      agGetBtn: 'Agentur eintragen →',
      submitAgEyebrow: 'Agentureintrag',
      submitAgH1: 'Tragen Sie Ihre Agentur ein',
      submitAgSub: 'Präsentieren Sie Ihre Agentur Unternehmen, die Personal- und Vermittlungsleistungen suchen. Jeder Eintrag wird manuell geprüft – nichts wird automatisch veröffentlicht.',
      submitOffEyebrow: 'Kundenanfrage',
      submitOffH1: 'Stellen Sie Ihre Anfrage',
      submitOffSub: 'Sagen Sie uns, was Sie brauchen, und wir leiten Ihre Anfrage an passende Agenturen weiter. Alle Einsendungen werden vom Betreiber manuell geprüft – nichts wird automatisch veröffentlicht.',
      cardBtn: 'E-Mail schreiben',
      cardEmailLabel: 'E-Mail:',
      cardPhoneLabel: 'Telefon:',
      contactCardTitle: 'Schreiben Sie uns',
      contactCardBody: 'Beschreiben Sie die Position oder Anfrage per E-Mail und wir melden uns so schnell wie möglich.',
      submitAgCardTitle: 'Agentur-Registrierung',
      submitAgCardBody: 'Senden Sie uns eine E-Mail mit Agenturname, Website, angebotenen Leistungen, Standort und einer kurzen Beschreibung. Wir melden uns.',
      submitOffCardTitle: 'Personalanfrage',
      submitOffCardBody: 'Senden Sie uns eine E-Mail mit Ihrem Unternehmen, den benötigten Mitarbeitern, der Anzahl, dem Standort, dem Schichtmodell und dem gewünschten Eintrittstermin. Wir melden uns.',
    },
    hero: {
      badge:    'Personalvermittlung · Talent. Netzwerk. Vertrauen.',
      h1a:      'Wir verbinden',
      h1b:      'die richtigen Menschen',
      h1c:      'mit den richtigen',
      h1accent: 'Unternehmen.',
      sub:      'TalentPartnerID ist Ihr zuverlässiger Rekrutierungspartner — wir liefern qualifizierte Kandidaten für Festanstellungen, Führungspositionen und flexible Personalbedürfnisse in allen Branchen.',
      cta1:     'Ich suche Talente',
      cta2:     'Ich suche einen Job',
    },
    stats: {
      s1: 'Erfolgreiche Vermittlungen',
      s2: 'Partnerunternehmen',
      s3: 'Abgedeckte Branchen',
      s4: 'Erste Kandidaten',
    },
    employers: {
      eyebrow: 'Für Arbeitgeber',
      h2:      'Rekrutierungsdienstleistungen<br>maßgeschneidert für Ihr Unternehmen',
      sub:     'Von einer einzelnen Stelle bis zum Aufbau ganzer Abteilungen — wir haben eine Lösung, die Ihren Personalbedarf und Zeitplan erfüllt.',
      cta:     'Jetzt starten →',
    },
    services: [
      {
        title: 'Direktvermittlung',
        desc:  'Full-Cycle-Rekrutierung für langfristige Stellen. Wir kümmern uns um alles vom Briefing bis zum finalen Angebot — mit 90-Tage-Ersatzgarantie.',
        list:  [
          'Detailliertes Stellenbriefing & Kandidatenprofil',
          'Aktives Sourcing aus unserem Talentnetzwerk',
          'Kuratierte Shortlist mit 3–5 Kandidaten',
          'Koordination von Interviews & Referenzprüfungen',
          '90 Tage kostenlose Ersatzgarantie',
        ],
      },
      {
        title: 'Executive Search',
        desc:  'Vertrauliche Suche nach leitenden Managern, Direktoren und C-Level-Führungskräften. Wir erreichen passive Kandidaten, die für andere unerreichbar sind.',
        list:  [
          'Marktanalyse & Wettbewerbsbeobachtung',
          'Direktansprache passiver Kandidaten',
          'Umfassende Führungskräftebeurteilung',
          'Gehalts-Benchmarking & Paketberatung',
          'Vollständige Diskretion & Vertraulichkeit garantiert',
        ],
      },
      {
        title: 'Zeitarbeit',
        desc:  'Flexible Arbeitskräfte für Saisongipfel, Projektarbeiten, Elternzeitvertretungen oder kurzfristigen Kapazitätsbedarf. Einsatzbereit innerhalb von Tagen.',
        list:  [
          'Vorgeprüfte, einsatzbereite Kandidaten',
          'Verfügbar innerhalb von 24–72 Stunden',
          'Vollständige Lohnbuchhaltung & HR-Verwaltung übernommen',
          'Einfache Verlängerung oder Übernahme in Festanstellung',
          'Kapazität für Massenpersonalvermittlung',
        ],
      },
      {
        title: 'HR-Beratung & RPO',
        desc:  'Lagern Sie einen Teil oder den gesamten Rekrutierungsprozess aus. Unsere HR-Experten helfen Ihnen, Einstellungsprozesse, Employer Branding und Personalstrategie zu gestalten.',
        list:  [
          'Recruitment Process Outsourcing (RPO)',
          'Design von HR-Richtlinien & Prozessen',
          'Employer-Branding-Strategie',
          'Entwicklung von Onboarding-Programmen',
          'Vergütungs- & Benefits-Benchmarking',
        ],
      },
    ],
    process: {
      eyebrow: 'So funktioniert es',
      h2:      'Vom Briefing zur Einstellung<br>in drei Schritten',
      sub:     'Ein klarer, effizienter Prozess, der Ihre Zeit respektiert und Ergebnisse liefert — jedes Mal.',
      cta:     'Kostenloses Beratungsgespräch buchen',
      steps: [
        {
          num:   '01',
          title: 'Briefing',
          desc:  'Vereinbaren Sie ein kostenloses 30-minütiges Beratungsgespräch. Erzählen Sie uns von Ihrer Unternehmenskultur, der Stelle, den erforderlichen Fähigkeiten und Ihrem idealen Kandidatenprofil.',
        },
        {
          num:   '02',
          title: 'Wir suchen',
          desc:  'Unsere Recruiter aktivieren sofort unser Talentnetzwerk und eine Datenbank mit über 50.000 Profilen. Wir kombinieren datengesteuertes Sourcing mit direktem Headhunting.',
        },
        {
          num:   '03',
          title: 'Sie stellen ein',
          desc:  'Wir präsentieren eine kuratierte Shortlist mit 3–5 geprüften Kandidaten, koordinieren alle Interviews, unterstützen bei der Gehaltsverhandlung und sorgen für einen reibungslosen Einarbeitungsstart.',
        },
      ],
    },
    industries: {
      eyebrow: 'Branchen',
      h2:      'Wir rekrutieren in<br>allen Schlüsselsektoren',
      sub:     'Tiefe Spezialisierung in jedem Sektor bedeutet schnellere Ergebnisse, bessere Kandidaten und klügere Markteinblicke für Ihr Unternehmen.',
      note:    'Ihre Branche nicht dabei? <a href="#contact">Kontaktieren Sie uns</a> — wir vermitteln Kandidaten in vielen weiteren Sektoren.',
      list: [
        { icon: '🏭', label: 'Produktion' },
        { icon: '💻', label: 'IT & Technologie' },
        { icon: '💰', label: 'Finanzen & Banken' },
        { icon: '🏥', label: 'Gesundheit & Pharma' },
        { icon: '⚙️', label: 'Ingenieurwesen' },
        { icon: '🚛', label: 'Logistik & Lieferkette' },
        { icon: '🛒', label: 'Einzelhandel & E-Commerce' },
        { icon: '🏗️', label: 'Bauwesen' },
        { icon: '⚖️', label: 'Recht & Compliance' },
        { icon: '⚡', label: 'Energie & Versorgung' },
        { icon: '🎓', label: 'Bildung & Weiterbildung' },
        { icon: '🏨', label: 'Gastronomie & Tourismus' },
      ],
    },
    candidates: {
      eyebrow: 'Für Bewerber',
      h2:      'Auf der Suche nach Ihrer<br>nächsten Karrierechance?',
      sub:     'Schließen Sie sich tausenden von Fachleuten an, die wir erfolgreich vermittelt haben. Unser Service ist für Bewerber vollständig <strong>kostenlos</strong> — immer.',
      benefits: [
        { title: 'Kostenlos — keine Gebühren, nie',     desc: 'Wir werden von Arbeitgebern bezahlt. Sie zahlen keinen einzigen Cent.' },
        { title: 'Vertraulich & diskret',               desc: 'Ihr Lebenslauf wird niemals ohne Ihre ausdrückliche Genehmigung weitergegeben.' },
        { title: 'Ein Lebenslauf — viele Chancen',      desc: 'Wir gleichen Ihr Profil automatisch mit allen aktiven Stellenangeboten ab.' },
        { title: 'Karriereunterstützung & Coaching',    desc: 'Lebenslauf-Überprüfung, Interviewvorbereitung und ehrliche Gehaltsberatung.' },
      ],
      cta1:  'Lebenslauf einsenden',
      cta2:  'Mit einem Recruiter sprechen',
      card: {
        label: 'Aktuell gesucht',
        roles: [
          { color: '#f05a28', text: 'Produktionsleiter · Produktion' },
          { color: '#3b82f6', text: 'Senior Software Engineer · IT' },
          { color: '#22c55e', text: 'Financial Controller · Finanzen' },
          { color: '#a855f7', text: 'Logistikkoordinator · Supply Chain' },
          { color: '#f0b429', text: 'HR Business Partner · HR' },
          { color: '#14b8a6', text: 'Vertriebsleiter · Einzelhandel' },
        ],
        link: 'Alle Stellen anzeigen →',
      },
    },
    why: {
      eyebrow: 'Warum TalentPartnerID',
      h2:      'Wir besetzen nicht nur Stellen.<br>Wir bauen dauerhafte Teams.',
      cards: [
        { num: '01', title: 'Geschwindigkeit ohne Kompromisse', desc: 'Erste qualifizierte Kandidaten innerhalb von 24 Stunden nach Erhalt Ihres Briefings. Wir sind schnell, weil wir eine aktive, vorgeprüfte Talentpipeline pflegen.' },
        { num: '02', title: '90-Tage-Garantie',                 desc: 'Jede Direktvermittlung wird mit einer 90-tägigen kostenlosen Ersatzgarantie geliefert. Klappt es nicht, finden wir kostenlos Ersatz.' },
        { num: '03', title: 'Tiefes Branchenwissen',            desc: 'Jeder unserer Recruiter ist auf bestimmte Sektoren spezialisiert. Wir verstehen die Stellen, für die wir rekrutieren, und sprechen die Sprache Ihrer Branche.' },
        { num: '04', title: 'Transparenter Prozess',            desc: 'Kein Recruiting im Dunkeln. Sie erhalten regelmäßige Updates, Kandidatenprofile mit ehrlichen Bewertungen und einen dedizierten Berater, der ans Telefon geht.' },
      ],
    },
    testi: {
      eyebrow: 'Kundenbewertungen',
      h2:      'Was unsere Kunden sagen',
      items: [
        { quote: 'Fügen Sie hier Ihr erstes Kundentestimonial hinzu. Beschreiben Sie, wie TalentPartnerID Ihrem Unternehmen half, schnell und professionell den richtigen Kandidaten zu finden.', name: '[Kundenname]', role: '[Position] · [Unternehmen]' },
        { quote: 'Fügen Sie hier Ihr zweites Kundentestimonial hinzu. Betonen Sie Liefergeschwindigkeit, Kandidatenqualität oder den persönlichen Service.',                                name: '[Kundenname]', role: '[Position] · [Unternehmen]' },
        { quote: 'Fügen Sie hier Ihr drittes Kundentestimonial hinzu. Erwähnen Sie den spezifischen Service und das erzielte Ergebnis.',                                                  name: '[Kundenname]', role: '[Position] · [Unternehmen]' },
      ],
    },
    contact: {
      eyebrow:     'Kontakt aufnehmen',
      h2:          'Bereit, Ihren nächsten<br>Top-Mitarbeiter zu finden?',
      sub:         'Erzählen Sie uns von Ihrer offenen Stelle. Wir antworten an Werktagen.',
      labelPhone:  'Telefon',
      labelEmail:  'E-Mail',
      labelOffice: 'Büro',
      labelHours:  'Öffnungszeiten',
      hours:       'Mo–Fr: 8:00 – 17:00 Uhr',
      form: {
        h3:         'Briefing senden',
        name:       'Ihr Name *',
        namePh:     'Max Mustermann',
        company:    'Unternehmen *',
        companyPh:  'Muster GmbH',
        email:      'E-Mail-Adresse *',
        emailPh:    'max@unternehmen.de',
        phone:      'Telefonnummer',
        phonePh:    '+49 123 456 789',
        service:    'Gewünschter Service',
        servicePh:  'Service auswählen…',
        opts: [
          { v: 'permanent',  t: 'Direktvermittlung' },
          { v: 'executive',  t: 'Executive Search' },
          { v: 'temp',       t: 'Zeitarbeit' },
          { v: 'rpo',        t: 'HR-Beratung / RPO' },
          { v: 'candidate',  t: 'Ich bin Bewerber' },
          { v: 'other',      t: 'Sonstiges / Noch unsicher' },
        ],
        message:    'Beschreiben Sie die Stelle *',
        messagePh:  'Jobtitel, Anforderungen, Zeitplan und weitere relevante Details…',
        submit:     'Briefing senden →',
        note:       '100% vertraulich.',
        sending:    'Wird gesendet…',
        sent:       'Gesendet ✓',
        successMsg: 'Nachricht gesendet! Wir melden uns innerhalb von 24 Stunden.',
        errorMsg:   'Etwas ist schiefgelaufen. Schreiben Sie uns direkt an jobbohemiacz@gmail.com',
        errorFields:'Bitte füllen Sie alle Pflichtfelder aus.',
        errorEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      },
    },
    footer: {
      tagline:      'Ihr zuverlässiger Partner für Personalvermittlung. Wir verbinden die richtigen Menschen mit den richtigen Unternehmen seit dem ersten Tag.',
      colEmployers: 'Für Arbeitgeber',
      colCompany:   'Unternehmen',
      colFollow:    'Folgen Sie uns',
      colServices:  'Unsere Leistungen',
      colNavigate:  'Navigation',
      colGuides:    'Ratgeber',
      colContact:   'Kontakt',
      navAgencies:  'Agenturen',
      navOffers:    'Angebote',
      navCalc:      'Lohnrechner',
      navSubmitAgency: 'Agentur eintragen',
      navPostOffer: 'Anfrage stellen',
      navContact:   'Kontakt',
      navTaxes:     'Sozial- und Krankenversicherung 2026',
      navBlog:      'Blog',
      guide1: 'Ausländer beschäftigen',
      guide2: 'Arbeitserlaubnis in Tschechien',
      guide3: 'Rekrutierung ausländischer Arbeitskräfte',
      guide4: 'Mindestlohn 2026',
      guide5: 'Häufige Fragen',
      links: {
        permanent:  'Direktvermittlung',
        executive:  'Executive Search',
        temp:       'Zeitarbeit',
        rpo:        'HR-Beratung & RPO',
        about:      'Über uns',
        industries: 'Branchen',
        candidates: 'Für Bewerber',
        contact:    'Kontakt',
      },
      copy:  '© 2026 TNT agency s.r.o. Alle Rechte vorbehalten.',
      terms: 'AGB',
      priv:  'Datenschutz',
      cook:  'Cookies',
    },
  },
};

/* ----------------------------------------------------------------
   ICONS (shared SVGs, used in render functions)
   ---------------------------------------------------------------- */
const SVG = {
  permanentPlacement: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  executiveSearch:    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  tempStaffing:       `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  hrRpo:              `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  brief:              `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  search:             `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  hire:               `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  speed:              `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  guarantee:          `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  knowledge:          `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  transparent:        `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
};

const svcIcons     = [SVG.permanentPlacement, SVG.executiveSearch, SVG.tempStaffing, SVG.hrRpo];
const processIcons = [SVG.brief, SVG.search, SVG.hire];
const whyIcons     = [SVG.speed, SVG.guarantee, SVG.knowledge, SVG.transparent];
const delays       = ['d1','d2','d3','d4'];

/* ----------------------------------------------------------------
   RENDER FUNCTIONS
   ---------------------------------------------------------------- */
function renderAll(lang) {
  const t = T[lang];
  if (!t) return;

  /* — Nav — */
  qs('[data-i18n="nav.employers"]',  t.nav.employers);
  qs('[data-i18n="nav.candidates"]', t.nav.candidates);
  qs('[data-i18n="nav.industries"]', t.nav.industries);
  qs('[data-i18n="nav.about"]',      t.nav.about);
  qs('[data-i18n="nav.contact"]',    t.nav.contact);
  qs('[data-i18n="nav.calc"]',       t.nav.calc);
  qs('[data-i18n="nav.home"]',        t.nav.home);
  qs('[data-i18n="nav.agencies"]',    t.nav.agencies);
  qs('[data-i18n="nav.offers"]',      t.nav.offers);
  qs('[data-i18n="nav.article"]',     t.nav.article);
  qs('[data-i18n="nav.submitAgency"]', t.nav.submitAgency);
  qs('[data-i18n="nav.postOffer"]',   t.nav.postOffer);
  qsa('[data-i18n="nav.contactCta"]', el => el.textContent = t.nav.contactCta);
  qs('[data-i18n="nav.language"]',    t.nav.language);
  qsa('[data-i18n="nav.cta"]', el => el.textContent = t.nav.cta);

  /* mobile nav mirror */
  qs('[data-i18n="mnav.employers"]',  t.nav.employers);
  qs('[data-i18n="mnav.candidates"]', t.nav.candidates);
  qs('[data-i18n="mnav.industries"]', t.nav.industries);
  qs('[data-i18n="mnav.about"]',      t.nav.about);
  qs('[data-i18n="mnav.contact"]',    t.nav.contact);
  qs('[data-i18n="mnav.calc"]',       t.nav.calc);
  qs('[data-i18n="mnav.home"]',        t.nav.home);
  qs('[data-i18n="mnav.agencies"]',    t.nav.agencies);
  qs('[data-i18n="mnav.offers"]',      t.nav.offers);
  qs('[data-i18n="mnav.article"]',     t.nav.article);
  qs('[data-i18n="mnav.submitAgency"]', t.nav.submitAgency);
  qs('[data-i18n="mnav.postOffer"]',   t.nav.postOffer);
  qsa('[data-i18n="mnav.contactCta"]', el => el.textContent = t.nav.contactCta);
  qs('[data-i18n="mnav.cta"]',        t.nav.cta);

  /* — Homepage calculator section head — */
  qs('[data-i18n="calc.eyebrow"]', t.calc.eyebrow);
  qs('[data-i18n="calc.heading"]', t.calc.heading);
  qs('[data-i18n="calc.sub"]',     t.calc.sub);

  /* — Transactional pages (only the relevant page's elements exist per route) — */
  Object.keys(t.pages).forEach((k) => {
    qsa(`[data-i18n="pages.${k}"]`, (el) => { el.textContent = t.pages[k]; });
  });

  /* — Hero — */
  qs('[data-i18n="hero.badge"]',    t.hero.badge);
  qs('[data-i18n="hero.h1a"]',      t.hero.h1a);
  qs('[data-i18n="hero.h1b"]',      t.hero.h1b);
  qs('[data-i18n="hero.h1c"]',      t.hero.h1c);
  qs('[data-i18n="hero.h1accent"]', t.hero.h1accent);
  qs('[data-i18n="hero.sub"]',      t.hero.sub);
  qs('[data-i18n="hero.cta1"]',     t.hero.cta1);
  qs('[data-i18n="hero.cta2"]',     t.hero.cta2);

  /* — Stats — */
  qs('[data-i18n="stats.s1"]', t.stats.s1);
  qs('[data-i18n="stats.s2"]', t.stats.s2);
  qs('[data-i18n="stats.s3"]', t.stats.s3);
  qs('[data-i18n="stats.s4"]', t.stats.s4);

  /* — Employers section head — */
  qs('[data-i18n="employers.eyebrow"]',     t.employers.eyebrow);
  qsHTML('[data-i18n="employers.h2"]',      t.employers.h2);
  qs('[data-i18n="employers.sub"]',         t.employers.sub);

  /* — Services grid — */
  const sg = document.getElementById('svcGrid');
  if (sg) {
    sg.innerHTML = t.services.map((s, i) => `
      <article class="svc-card fi ${delays[i]}">
        <div class="svc-card__top">
          <div class="svc-card__icon" aria-hidden="true">${svcIcons[i]}</div>
          <h3>${s.title}</h3>
        </div>
        <p>${s.desc}</p>
        <ul class="svc-list">${s.list.map(li => `<li>${li}</li>`).join('')}</ul>
        <a href="#contact" class="svc-link">${t.employers.cta}</a>
      </article>`).join('');
    sg.querySelectorAll('.fi').forEach(el => io.observe(el));
  }

  /* — Process — */
  qs('[data-i18n="process.eyebrow"]', t.process.eyebrow);
  qsHTML('[data-i18n="process.h2"]', t.process.h2);
  qs('[data-i18n="process.sub"]',    t.process.sub);
  qs('[data-i18n="process.cta"]',    t.process.cta);

  const ps = document.getElementById('processSteps');
  if (ps) {
    ps.innerHTML = t.process.steps.map((s, i) => `
      <div class="process-step fi ${delays[i]}">
        <div class="process-step__num" aria-hidden="true">${s.num}</div>
        <div class="process-step__line${i === 2 ? ' process-step__line--last' : ''}" aria-hidden="true"></div>
        <div class="process-step__icon" aria-hidden="true">${processIcons[i]}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>`).join('');
    ps.querySelectorAll('.fi').forEach(el => io.observe(el));
  }

  /* — Industries — */
  qs('[data-i18n="industries.eyebrow"]',    t.industries.eyebrow);
  qsHTML('[data-i18n="industries.h2"]',     t.industries.h2);
  qs('[data-i18n="industries.sub"]',        t.industries.sub);
  qsHTML('[data-i18n="industries.note"]',   t.industries.note);

  const ig = document.getElementById('industriesGrid');
  if (ig) {
    ig.innerHTML = t.industries.list.map((ind, i) => `
      <div class="ind-card fi ${delays[i % 3]}">
        <div class="ind-card__icon" aria-hidden="true">${ind.icon}</div>
        <span>${ind.label}</span>
      </div>`).join('');
    ig.querySelectorAll('.fi').forEach(el => io.observe(el));
  }

  /* — Candidates — */
  qs('[data-i18n="candidates.eyebrow"]',     t.candidates.eyebrow);
  qsHTML('[data-i18n="candidates.h2"]',      t.candidates.h2);
  qsHTML('[data-i18n="candidates.sub"]',     t.candidates.sub);
  qs('[data-i18n="candidates.cta1"]',        t.candidates.cta1);
  qs('[data-i18n="candidates.cta2"]',        t.candidates.cta2);

  const cb = document.getElementById('candBenefits');
  if (cb) {
    cb.innerHTML = t.candidates.benefits.map(b => `
      <div class="cand-benefit">
        <div class="cand-benefit__icon" aria-hidden="true">✓</div>
        <div><strong>${b.title}</strong><p>${b.desc}</p></div>
      </div>`).join('');
  }

  qs('[data-i18n="candidates.card.label"]', t.candidates.card.label);
  const cr = document.getElementById('candRoles');
  if (cr) {
    cr.innerHTML = t.candidates.card.roles.map(r => `
      <div class="cand-role">
        <span class="cand-role__dot" style="background:${r.color};"></span>
        ${r.text}
      </div>`).join('');
  }
  qs('[data-i18n="candidates.card.link"]', t.candidates.card.link);
  const cvLink = document.querySelector('[data-i18n-href="candidates.cta1"]');
  if (cvLink) cvLink.textContent = t.candidates.cta1;

  /* — Why — */
  qs('[data-i18n="why.eyebrow"]', t.why.eyebrow);
  qsHTML('[data-i18n="why.h2"]',  t.why.h2);

  const wg = document.getElementById('whyGrid');
  if (wg) {
    wg.innerHTML = t.why.cards.map((c, i) => `
      <div class="why-card fi ${delays[i]}">
        <div class="why-card__num" aria-hidden="true">${c.num}</div>
        <div class="why-card__icon" aria-hidden="true">${whyIcons[i]}</div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
      </div>`).join('');
    wg.querySelectorAll('.fi').forEach(el => io.observe(el));
  }

  /* — Testimonials — */
  qs('[data-i18n="testi.eyebrow"]', t.testi.eyebrow);
  qs('[data-i18n="testi.h2"]',      t.testi.h2);

  const tg = document.getElementById('testiGrid');
  if (tg) {
    tg.innerHTML = t.testi.items.map((item, i) => `
      <div class="testi-card fi ${delays[i]}">
        <div class="testi-stars" aria-label="5 stars" aria-hidden="true">★★★★★</div>
        <blockquote>"${item.quote}"</blockquote>
        <div class="testi-author">
          <div class="testi-author__avatar" aria-hidden="true">?</div>
          <div><strong>${item.name}</strong><span>${item.role}</span></div>
        </div>
      </div>`).join('');
    tg.querySelectorAll('.fi').forEach(el => io.observe(el));
  }

  /* — Contact — */
  qs('[data-i18n="contact.eyebrow"]',     t.contact.eyebrow);
  qsHTML('[data-i18n="contact.h2"]',      t.contact.h2);
  qs('[data-i18n="contact.sub"]',         t.contact.sub);
  qs('[data-i18n="contact.labelPhone"]',  t.contact.labelPhone);
  qs('[data-i18n="contact.labelEmail"]',  t.contact.labelEmail);
  qs('[data-i18n="contact.labelOffice"]', t.contact.labelOffice);
  qs('[data-i18n="contact.labelHours"]',  t.contact.labelHours);
  qs('[data-i18n="contact.hours"]',       t.contact.hours);

  const f = t.contact.form;
  qs('[data-i18n="form.h3"]',         f.h3);
  qs('[data-i18n="form.name"]',       f.name);
  qs('[data-i18n="form.company"]',    f.company);
  qs('[data-i18n="form.email"]',      f.email);
  qs('[data-i18n="form.phone"]',      f.phone);
  qs('[data-i18n="form.service"]',    f.service);
  qs('[data-i18n="form.message"]',    f.message);
  qs('[data-i18n="form.submit"]',     f.submit);
  qs('[data-i18n="form.note"]',       f.note);

  /* placeholders */
  qsPh('[data-i18n-ph="form.namePh"]',     f.namePh);
  qsPh('[data-i18n-ph="form.companyPh"]',  f.companyPh);
  qsPh('[data-i18n-ph="form.emailPh"]',    f.emailPh);
  qsPh('[data-i18n-ph="form.phonePh"]',    f.phonePh);
  qsPh('[data-i18n-ph="form.messagePh"]',  f.messagePh);

  /* select options */
  const sel = document.getElementById('fservice');
  if (sel) {
    const cur = sel.value;
    sel.innerHTML = `<option value="" disabled>${f.servicePh}</option>` +
      f.opts.map(o => `<option value="${o.v}"${o.v === cur ? ' selected' : ''}>${o.t}</option>`).join('');
    if (!cur) sel.selectedIndex = 0;
  }

  /* — Footer — */
  qs('[data-i18n="footer.tagline"]',      t.footer.tagline);
  qs('[data-i18n="footer.colServices"]',  t.footer.colServices);
  qs('[data-i18n="footer.colNavigate"]',  t.footer.colNavigate);
  qs('[data-i18n="footer.colGuides"]',    t.footer.colGuides);
  qs('[data-i18n="footer.colContact"]',   t.footer.colContact);
  qs('[data-i18n="footer.links.permanent"]', t.footer.links.permanent);
  qs('[data-i18n="footer.links.executive"]', t.footer.links.executive);
  qs('[data-i18n="footer.links.temp"]',   t.footer.links.temp);
  qs('[data-i18n="footer.links.rpo"]',    t.footer.links.rpo);
  qs('[data-i18n="footer.navAgencies"]',  t.footer.navAgencies);
  qs('[data-i18n="footer.navOffers"]',    t.footer.navOffers);
  qs('[data-i18n="footer.navCalc"]',      t.footer.navCalc);
  qs('[data-i18n="footer.navSubmitAgency"]', t.footer.navSubmitAgency);
  qs('[data-i18n="footer.navPostOffer"]', t.footer.navPostOffer);
  qs('[data-i18n="footer.navContact"]',   t.footer.navContact);
  qs('[data-i18n="footer.navTaxes"]',     t.footer.navTaxes);
  qs('[data-i18n="footer.navBlog"]',      t.footer.navBlog);
  qs('[data-i18n="footer.guide1"]',       t.footer.guide1);
  qs('[data-i18n="footer.guide2"]',       t.footer.guide2);
  qs('[data-i18n="footer.guide3"]',       t.footer.guide3);
  qs('[data-i18n="footer.guide4"]',       t.footer.guide4);
  qs('[data-i18n="footer.guide5"]',       t.footer.guide5);
  qs('[data-i18n="footer.copy"]',         t.footer.copy);
  qs('[data-i18n="footer.terms"]',        t.footer.terms);
  qs('[data-i18n="footer.priv"]',         t.footer.priv);
  qs('[data-i18n="footer.cook"]',         t.footer.cook);

  /* — Active lang buttons — */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  /* — html lang attr — */
  document.documentElement.lang = lang;

  /* store current form translations for validation */
  window._formT = f;
}

/* helpers */
function qs(sel, text) {
  const el = document.querySelector(sel);
  if (el && text !== undefined) el.textContent = text;
}
function qsHTML(sel, html) {
  const el = document.querySelector(sel);
  if (el && html !== undefined) el.innerHTML = html;
}
function qsa(sel, fn) {
  document.querySelectorAll(sel).forEach(fn);
}
function qsPh(sel, ph) {
  const el = document.querySelector(sel);
  if (el && ph !== undefined) el.placeholder = ph;
}

/* ----------------------------------------------------------------
   LANGUAGE SWITCHER
   ---------------------------------------------------------------- */
function setLang(lang) {
  if (!T[lang]) lang = 'en';
  localStorage.setItem('tnt-lang', lang);
  renderAll(lang);
  // Notify React islands (e.g. the payroll calculator) that own their own
  // content and cannot be updated by the [data-i18n] DOM swap.
  window.dispatchEvent(new CustomEvent('tnt-lang', { detail: lang }));
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

/* ----------------------------------------------------------------
   INTERSECTION OBSERVER — Scroll fade-in
   ---------------------------------------------------------------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fi').forEach(el => io.observe(el));

/* ----------------------------------------------------------------
   STICKY HEADER
   ---------------------------------------------------------------- */
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ----------------------------------------------------------------
   HAMBURGER / MOBILE NAV
   ---------------------------------------------------------------- */
const burger    = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && burger.classList.contains('open')) {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ----------------------------------------------------------------
   SMOOTH SCROLL
   ---------------------------------------------------------------- */
document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target) {
    e.preventDefault();
    const headerH = header ? header.offsetHeight : 80;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerH - 16, behavior: 'smooth' });
  }
});

/* ----------------------------------------------------------------
   ACTIVE NAV LINK
   ---------------------------------------------------------------- */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav a, .mobile-nav a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => navObserver.observe(sec));

/* ----------------------------------------------------------------
   INIT — detect stored language preference
   ---------------------------------------------------------------- */
const initLang = localStorage.getItem('tnt-lang') || 'en';
setLang(initLang);
