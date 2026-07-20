// cs/en/de copy for the employer staffing request (Phase C3).
//
// Czech is the authoritative operational language; en/de are full working
// translations of the interface (the site has no localized routes, so this is
// interface copy only). Parity across the three locales is enforced by tests.
//
// Wording rules carried over from Phase B and enforced by tests:
//   - no guaranteed savings, no "always cheaper", no promised availability;
//   - no unconditional legal advice;
//   - the operator name and contact email are never translated.

import type { Locale } from '../content/types'
import type { AttributionField } from '../attribution'
import type { ErrorCode } from './validate'

export const OPERATOR = 'TNT agency s.r.o.'
export const OPERATOR_EMAIL = 'jobbohemiacz@gmail.com'

export interface RequestCopy {
  // Page / SEO
  pageTitle: string
  pageDescription: string
  eyebrow: string
  h1: string
  lead: string
  // Section headings (mirror schema groups)
  groups: Record<string, string>
  // Field labels + hints
  labels: Record<string, string>
  hints: Record<string, string>
  // Option labels, keyed "<fieldName>.<optionValue>"
  options: Record<string, string>
  // Validation
  errors: Record<ErrorCode, string>
  errorSummaryTitle: string
  requiredMark: string
  optionalMark: string
  // Consent
  consentLabel: string
  consentDetail: string
  // Actions + status
  submit: string
  submitting: string
  successTitle: string
  successBody: string
  mailtoFallbackNote: string
  // Email
  emailSubject: string
  emailIntro: string
  emailAttributionTitle: string
  attributionLabels: Record<AttributionField, string>
  // Trust / process
  whatHappensTitle: string
  whatHappens: string[]
  whatWeNeedTitle: string
  whatWeNeed: string[]
  privacyNote: string
  noValuesNote: string
  faqTitle: string
  faq: Array<{ q: string; a: string }>
}

const attributionLabelsCs: Record<AttributionField, string> = {
  landingRoute: 'Vstupní stránka',
  currentRoute: 'Odesláno ze stránky',
  referrerDomain: 'Zdrojová doména',
  utmSource: 'UTM source',
  utmMedium: 'UTM medium',
  utmCampaign: 'UTM campaign',
  utmContent: 'UTM content',
  utmTerm: 'UTM term',
  ctaSource: 'Vstupní bod poptávky',
  language: 'Jazyk rozhraní',
  startedAt: 'Zahájeno',
}

const attributionLabelsEn: Record<AttributionField, string> = {
  landingRoute: 'Landing page',
  currentRoute: 'Submitted from',
  referrerDomain: 'Referrer domain',
  utmSource: 'UTM source',
  utmMedium: 'UTM medium',
  utmCampaign: 'UTM campaign',
  utmContent: 'UTM content',
  utmTerm: 'UTM term',
  ctaSource: 'Request entry point',
  language: 'Interface language',
  startedAt: 'Started at',
}

const attributionLabelsDe: Record<AttributionField, string> = {
  landingRoute: 'Einstiegsseite',
  currentRoute: 'Gesendet von',
  referrerDomain: 'Referrer-Domain',
  utmSource: 'UTM source',
  utmMedium: 'UTM medium',
  utmCampaign: 'UTM campaign',
  utmContent: 'UTM content',
  utmTerm: 'UTM term',
  ctaSource: 'Einstiegspunkt der Anfrage',
  language: 'Oberflächensprache',
  startedAt: 'Begonnen am',
}

const cs: RequestCopy = {
  pageTitle: 'Poptávka pracovníků – zadání požadavku pro agenturní zaměstnávání a nábor',
  pageDescription:
    'Zadejte požadavek na pracovníky: profese, počet, lokalita, směnný model a podmínky. Připravíme nabídku agenturního zaměstnávání nebo náboru podle zadaných údajů.',
  eyebrow: 'Pro zaměstnavatele',
  h1: 'Poptávka pracovníků',
  lead:
    'Popište, koho a kam potřebujete. Čím konkrétnější je zadání, tím přesněji lze připravit nabídku. Formulář odešlete ze svého e-mailového klienta – hodnoty z kalkulačky se nikam nepřenášejí.',
  groups: {
    company: 'Firma a kontakt',
    workplace: 'Místo výkonu práce',
    role: 'Pozice a počet',
    schedule: 'Termín a směny',
    conditions: 'Podmínky a zázemí',
    contact: 'Preference a souhlas',
  },
  labels: {
    companyName: 'Název firmy',
    contactName: 'Kontaktní osoba',
    email: 'Pracovní e-mail',
    phone: 'Telefon',
    workplaceCity: 'Město / obec pracoviště',
    workplaceRegion: 'Kraj',
    profession: 'Profese / pozice',
    headcount: 'Počet pracovníků',
    employmentModel: 'Model spolupráce',
    experience: 'Požadovaná praxe a kvalifikace',
    languages: 'Jazykové požadavky',
    startDate: 'Požadovaný nástup',
    duration: 'Předpokládaná délka',
    shiftModel: 'Směnný model',
    weeklyHours: 'Týdenní úvazek (hodin)',
    accommodation: 'Ubytování',
    transport: 'Doprava na pracoviště',
    ppe: 'OOPP a vybavení',
    foreignWorkerSupport: 'Podpora u dokumentů cizinců',
    budget: 'Předpokládaný rozpočet (hodinový nebo měsíční)',
    notes: 'Další provozní požadavky',
    preferredContact: 'Preferovaný kontakt',
    consent: 'Souhlas se zpracováním',
  },
  hints: {
    email: 'Na tuto adresu pošleme reakci.',
    headcount: 'Počet osob, které potřebujete obsadit.',
    profession: 'Např. operátor výroby, skladník, svářeč, řidič VZV.',
    languages: 'Např. čeština základní, angličtina domluvou, bez požadavku.',
    budget: 'Nepovinné. Uveďte, pokud máte schválený rozpočet – zpřesní to nabídku.',
    ppe: 'Kdo zajišťuje ochranné pomůcky a jaké jsou požadavky.',
    notes: 'Certifikace, zdravotní způsobilost, provozní specifika, očekávání na fluktuaci.',
    weeklyHours: 'Např. 40.',
  },
  options: {
    'employmentModel.agency': 'Agenturní zaměstnávání (dočasné přidělení)',
    'employmentModel.recruitment': 'Nábor / přímý nástup k nám',
    'employmentModel.unsure': 'Nejsem si jistý – potřebuji poradit',
    'shiftModel.single': 'Jednosměnný',
    'shiftModel.two-shift': 'Dvousměnný',
    'shiftModel.three-shift': 'Třísměnný',
    'shiftModel.continuous': 'Nepřetržitý provoz',
    'shiftModel.flexible': 'Flexibilní / dle potřeby',
    'shiftModel.unsure': 'Zatím neurčeno',
    'duration.short-term': 'Krátkodobě (do 3 měsíců)',
    'duration.seasonal': 'Sezónně',
    'duration.long-term': 'Dlouhodobě (6 měsíců a více)',
    'duration.permanent': 'Trvale',
    'duration.unsure': 'Zatím neurčeno',
    'accommodation.yes': 'Ano, je potřeba',
    'accommodation.no': 'Ne',
    'accommodation.unsure': 'Zatím nevím',
    'transport.yes': 'Ano, je potřeba',
    'transport.no': 'Ne',
    'transport.unsure': 'Zatím nevím',
    'foreignWorkerSupport.yes': 'Ano, potřebujeme podporu',
    'foreignWorkerSupport.no': 'Ne',
    'foreignWorkerSupport.unsure': 'Zatím nevím',
    'preferredContact.email': 'E-mail',
    'preferredContact.phone': 'Telefon',
    'preferredContact.either': 'E-mail i telefon',
    'workplaceRegion.praha': 'Hlavní město Praha',
    'workplaceRegion.stredocesky': 'Středočeský kraj',
    'workplaceRegion.jihocesky': 'Jihočeský kraj',
    'workplaceRegion.plzensky': 'Plzeňský kraj',
    'workplaceRegion.karlovarsky': 'Karlovarský kraj',
    'workplaceRegion.ustecky': 'Ústecký kraj',
    'workplaceRegion.liberecky': 'Liberecký kraj',
    'workplaceRegion.kralovehradecky': 'Královéhradecký kraj',
    'workplaceRegion.pardubicky': 'Pardubický kraj',
    'workplaceRegion.vysocina': 'Kraj Vysočina',
    'workplaceRegion.jihomoravsky': 'Jihomoravský kraj',
    'workplaceRegion.olomoucky': 'Olomoucký kraj',
    'workplaceRegion.zlinsky': 'Zlínský kraj',
    'workplaceRegion.moravskoslezsky': 'Moravskoslezský kraj',
  },
  errors: {
    required: 'Toto pole je povinné.',
    invalidEmail: 'Zadejte platnou e-mailovou adresu.',
    invalidNumber: 'Zadejte platné celé číslo v povoleném rozsahu.',
    tooLong: 'Text je příliš dlouhý.',
    invalidOption: 'Vyberte jednu z nabízených možností.',
    invalidDate: 'Zadejte platné datum.',
  },
  errorSummaryTitle: 'Formulář nelze odeslat – zkontrolujte tato pole:',
  requiredMark: 'povinné',
  optionalMark: 'nepovinné',
  consentLabel:
    'Souhlasím se zpracováním uvedených údajů za účelem zpracování této poptávky.',
  consentDetail:
    `Údaje zpracovává ${OPERATOR} výhradně pro vyřízení této poptávky. Odesláním se otevře váš e-mailový klient – zprávu odesíláte vy. Podrobnosti najdete v zásadách ochrany osobních údajů.`,
  submit: 'Vytvořit e-mail s poptávkou',
  submitting: 'Připravuji…',
  successTitle: 'E-mail s poptávkou je připraven',
  successBody:
    'Otevřel se váš e-mailový klient s předvyplněnou strukturovanou poptávkou. Zkontrolujte údaje a zprávu odešlete – teprve tím se poptávka dostane k nám.',
  mailtoFallbackNote:
    `Pokud se e-mailový klient neotevřel, zkopírujte text níže a pošlete jej na ${OPERATOR_EMAIL}.`,
  emailSubject: 'Poptávka pracovníků',
  emailIntro: 'Poptávka odeslaná z webu talentpartnerid.com:',
  emailAttributionTitle: 'Kontext poptávky',
  attributionLabels: attributionLabelsCs,
  whatHappensTitle: 'Jak to probíhá',
  whatHappens: [
    'Ozveme se a doplníme chybějící provozní detaily zadání.',
    'Ověříme, zda a v jakém rozsahu lze požadavek pokrýt – dostupnost není nikdy zaručena předem.',
    'Připravíme nabídku podle profese, lokality, směnného modelu a rozsahu.',
    'Doladíme smluvní rozdělení odpovědnosti (kdo zajišťuje BOZP, OOPP, ubytování, dopravu).',
    'Po odsouhlasení nastavíme nábor, dokumentaci a nástup.',
  ],
  whatWeNeedTitle: 'Co potřebujeme pro přípravu nabídky',
  whatWeNeed: [
    'Profese a počet pracovníků.',
    'Místo výkonu práce a kraj.',
    'Termín nástupu a předpokládaná délka.',
    'Směnný model a týdenní úvazek.',
    'Požadavky na praxi, kvalifikaci a jazyk.',
    'Zda je potřeba ubytování, doprava nebo podpora u dokumentů cizinců.',
  ],
  privacyNote:
    `Správcem údajů z tohoto formuláře je ${OPERATOR}, kontakt ${OPERATOR_EMAIL}.`,
  noValuesNote:
    'Hodnoty zadané v mzdové kalkulačce se do poptávky nepřenášejí. Rozpočet uvádíte pouze vy, ručně, pokud chcete.',
  faqTitle: 'Časté dotazy k poptávce',
  faq: [
    {
      q: 'Je poptávka závazná?',
      a: 'Ne. Odesláním formuláře nevzniká objednávka ani smlouva. Jde o zadání požadavku, na jehož základě lze připravit nabídku.',
    },
    {
      q: 'Garantujete, že pracovníky seženete?',
      a: 'Ne. Dostupnost kandidátů závisí na profesi, lokalitě, termínu, směnném modelu a nabízených podmínkách. Po zadání požadavku sdělíme, co je reálné.',
    },
    {
      q: 'Je agenturní zaměstnávání levnější než přímý nábor?',
      a: 'Ne automaticky. Zákonné odvody se přes agenturu nesnižují. Rozdíl závisí na zadaných předpokladech a na tom, jaké provozní činnosti agentura přebírá. Porovnání si můžete spočítat v kalkulačce.',
    },
    {
      q: 'Přenášejí se do poptávky částky z kalkulačky?',
      a: 'Ne. Kalkulačka počítá pouze ve vašem prohlížeči a žádnou hodnotu do poptávky, adresy stránky ani analytiky nepředává.',
    },
  ],
}

const en: RequestCopy = {
  pageTitle: 'Request workers – submit a staffing requirement for agency employment or recruitment',
  pageDescription:
    'Submit a staffing requirement: profession, headcount, location, shift model and conditions. We prepare an agency staffing or recruitment proposal based on the details you provide.',
  eyebrow: 'For employers',
  h1: 'Request workers',
  lead:
    'Describe who you need and where. The more specific the requirement, the more precisely a proposal can be prepared. The form opens your own email client — no calculator values are transferred.',
  groups: {
    company: 'Company and contact',
    workplace: 'Place of work',
    role: 'Role and headcount',
    schedule: 'Timing and shifts',
    conditions: 'Conditions and support',
    contact: 'Preferences and consent',
  },
  labels: {
    companyName: 'Company name',
    contactName: 'Contact person',
    email: 'Work email',
    phone: 'Phone',
    workplaceCity: 'Workplace city / municipality',
    workplaceRegion: 'Region',
    profession: 'Profession / role',
    headcount: 'Number of workers',
    employmentModel: 'Cooperation model',
    experience: 'Required experience and qualifications',
    languages: 'Language requirements',
    startDate: 'Requested start date',
    duration: 'Expected duration',
    shiftModel: 'Shift model',
    weeklyHours: 'Weekly hours',
    accommodation: 'Accommodation',
    transport: 'Transport to the workplace',
    ppe: 'PPE and equipment',
    foreignWorkerSupport: 'Support with foreign-worker documents',
    budget: 'Expected budget (hourly or monthly)',
    notes: 'Additional operational requirements',
    preferredContact: 'Preferred contact method',
    consent: 'Data processing consent',
  },
  hints: {
    email: 'We will reply to this address.',
    headcount: 'How many people you need to staff.',
    profession: 'E.g. production operator, warehouse worker, welder, forklift driver.',
    languages: 'E.g. basic Czech, English negotiable, no requirement.',
    budget: 'Optional. Provide it if you have an approved budget — it makes the proposal more precise.',
    ppe: 'Who provides protective equipment and what the requirements are.',
    notes: 'Certifications, medical fitness, operational specifics, turnover expectations.',
    weeklyHours: 'E.g. 40.',
  },
  options: {
    'employmentModel.agency': 'Agency staffing (temporary assignment)',
    'employmentModel.recruitment': 'Recruitment / direct hire by us',
    'employmentModel.unsure': 'Not sure — I need advice',
    'shiftModel.single': 'Single shift',
    'shiftModel.two-shift': 'Two shifts',
    'shiftModel.three-shift': 'Three shifts',
    'shiftModel.continuous': 'Continuous operation',
    'shiftModel.flexible': 'Flexible / as needed',
    'shiftModel.unsure': 'Not yet determined',
    'duration.short-term': 'Short-term (up to 3 months)',
    'duration.seasonal': 'Seasonal',
    'duration.long-term': 'Long-term (6 months or more)',
    'duration.permanent': 'Permanent',
    'duration.unsure': 'Not yet determined',
    'accommodation.yes': 'Yes, needed',
    'accommodation.no': 'No',
    'accommodation.unsure': 'Not sure yet',
    'transport.yes': 'Yes, needed',
    'transport.no': 'No',
    'transport.unsure': 'Not sure yet',
    'foreignWorkerSupport.yes': 'Yes, we need support',
    'foreignWorkerSupport.no': 'No',
    'foreignWorkerSupport.unsure': 'Not sure yet',
    'preferredContact.email': 'Email',
    'preferredContact.phone': 'Phone',
    'preferredContact.either': 'Email or phone',
    'workplaceRegion.praha': 'Prague (capital city)',
    'workplaceRegion.stredocesky': 'Central Bohemian Region',
    'workplaceRegion.jihocesky': 'South Bohemian Region',
    'workplaceRegion.plzensky': 'Plzeň Region',
    'workplaceRegion.karlovarsky': 'Karlovy Vary Region',
    'workplaceRegion.ustecky': 'Ústí nad Labem Region',
    'workplaceRegion.liberecky': 'Liberec Region',
    'workplaceRegion.kralovehradecky': 'Hradec Králové Region',
    'workplaceRegion.pardubicky': 'Pardubice Region',
    'workplaceRegion.vysocina': 'Vysočina Region',
    'workplaceRegion.jihomoravsky': 'South Moravian Region',
    'workplaceRegion.olomoucky': 'Olomouc Region',
    'workplaceRegion.zlinsky': 'Zlín Region',
    'workplaceRegion.moravskoslezsky': 'Moravian-Silesian Region',
  },
  errors: {
    required: 'This field is required.',
    invalidEmail: 'Enter a valid email address.',
    invalidNumber: 'Enter a valid whole number within the allowed range.',
    tooLong: 'This text is too long.',
    invalidOption: 'Select one of the offered options.',
    invalidDate: 'Enter a valid date.',
  },
  errorSummaryTitle: 'The form cannot be submitted — please check these fields:',
  requiredMark: 'required',
  optionalMark: 'optional',
  consentLabel:
    'I consent to the processing of the data provided for the purpose of handling this request.',
  consentDetail:
    `The data is processed by ${OPERATOR} solely to handle this request. Submitting opens your email client — you send the message yourself. See the privacy policy for details.`,
  submit: 'Create request email',
  submitting: 'Preparing…',
  successTitle: 'Your request email is ready',
  successBody:
    'Your email client has opened with a structured request pre-filled. Review the details and send the message — it reaches us only once you send it.',
  mailtoFallbackNote:
    `If your email client did not open, copy the text below and send it to ${OPERATOR_EMAIL}.`,
  emailSubject: 'Staffing request',
  emailIntro: 'Request submitted from talentpartnerid.com:',
  emailAttributionTitle: 'Request context',
  attributionLabels: attributionLabelsEn,
  whatHappensTitle: 'How it works',
  whatHappens: [
    'We get in touch and fill in the missing operational details.',
    'We check whether and to what extent the requirement can be covered — availability is never guaranteed in advance.',
    'We prepare a proposal based on profession, location, shift model and scope.',
    'We agree the contractual split of responsibility (who provides OSH, PPE, accommodation, transport).',
    'Once approved, we set up recruitment, documentation and onboarding.',
  ],
  whatWeNeedTitle: 'What we need to prepare a proposal',
  whatWeNeed: [
    'Profession and number of workers.',
    'Place of work and region.',
    'Start date and expected duration.',
    'Shift model and weekly hours.',
    'Experience, qualification and language requirements.',
    'Whether accommodation, transport or foreign-worker document support is needed.',
  ],
  privacyNote:
    `The controller of the data from this form is ${OPERATOR}, contact ${OPERATOR_EMAIL}.`,
  noValuesNote:
    'Values entered in the payroll calculator are not transferred into the request. A budget is provided only by you, manually, if you choose to.',
  faqTitle: 'Request FAQ',
  faq: [
    {
      q: 'Is the request binding?',
      a: 'No. Submitting the form does not create an order or a contract. It is a statement of requirements from which a proposal can be prepared.',
    },
    {
      q: 'Do you guarantee that you will find the workers?',
      a: 'No. Candidate availability depends on the profession, location, timing, shift model and the conditions offered. Once we have the requirement we will tell you what is realistic.',
    },
    {
      q: 'Is agency employment cheaper than direct hiring?',
      a: 'Not automatically. Statutory contributions are not reduced through an agency. The difference depends on the assumptions entered and on which operational activities the agency takes over. You can model the comparison in the calculator.',
    },
    {
      q: 'Are calculator amounts transferred into the request?',
      a: 'No. The calculator runs only in your browser and passes no value into the request, the page address or analytics.',
    },
  ],
}

const de: RequestCopy = {
  pageTitle: 'Personalbedarf anfragen – Anforderung für Zeitarbeit oder Personalvermittlung',
  pageDescription:
    'Übermitteln Sie Ihren Personalbedarf: Beruf, Anzahl, Standort, Schichtmodell und Bedingungen. Auf Grundlage Ihrer Angaben erstellen wir ein Angebot für Zeitarbeit oder Personalvermittlung.',
  eyebrow: 'Für Arbeitgeber',
  h1: 'Personalbedarf anfragen',
  lead:
    'Beschreiben Sie, wen Sie wo benötigen. Je konkreter die Anforderung, desto präziser lässt sich ein Angebot erstellen. Das Formular öffnet Ihr eigenes E-Mail-Programm – Werte aus dem Rechner werden nicht übertragen.',
  groups: {
    company: 'Unternehmen und Kontakt',
    workplace: 'Einsatzort',
    role: 'Position und Anzahl',
    schedule: 'Termin und Schichten',
    conditions: 'Bedingungen und Unterstützung',
    contact: 'Präferenzen und Einwilligung',
  },
  labels: {
    companyName: 'Firmenname',
    contactName: 'Ansprechpartner',
    email: 'Geschäftliche E-Mail',
    phone: 'Telefon',
    workplaceCity: 'Stadt / Gemeinde des Einsatzortes',
    workplaceRegion: 'Region (Kraj)',
    profession: 'Beruf / Position',
    headcount: 'Anzahl der Mitarbeiter',
    employmentModel: 'Modell der Zusammenarbeit',
    experience: 'Erforderliche Erfahrung und Qualifikation',
    languages: 'Sprachanforderungen',
    startDate: 'Gewünschter Eintrittstermin',
    duration: 'Voraussichtliche Dauer',
    shiftModel: 'Schichtmodell',
    weeklyHours: 'Wochenstunden',
    accommodation: 'Unterkunft',
    transport: 'Transport zum Einsatzort',
    ppe: 'PSA und Ausrüstung',
    foreignWorkerSupport: 'Unterstützung bei Dokumenten ausländischer Mitarbeiter',
    budget: 'Erwartetes Budget (stündlich oder monatlich)',
    notes: 'Weitere betriebliche Anforderungen',
    preferredContact: 'Bevorzugter Kontaktweg',
    consent: 'Einwilligung zur Datenverarbeitung',
  },
  hints: {
    email: 'An diese Adresse antworten wir.',
    headcount: 'Wie viele Personen Sie besetzen müssen.',
    profession: 'Z. B. Produktionsmitarbeiter, Lagerarbeiter, Schweißer, Staplerfahrer.',
    languages: 'Z. B. Tschechisch Grundkenntnisse, Englisch nach Vereinbarung, keine Anforderung.',
    budget: 'Optional. Geben Sie es an, wenn ein Budget freigegeben ist – das präzisiert das Angebot.',
    ppe: 'Wer die Schutzausrüstung stellt und welche Anforderungen bestehen.',
    notes: 'Zertifikate, arbeitsmedizinische Eignung, betriebliche Besonderheiten, Fluktuationserwartung.',
    weeklyHours: 'Z. B. 40.',
  },
  options: {
    'employmentModel.agency': 'Zeitarbeit (Arbeitnehmerüberlassung)',
    'employmentModel.recruitment': 'Personalvermittlung / Direkteinstellung bei uns',
    'employmentModel.unsure': 'Unsicher – ich benötige Beratung',
    'shiftModel.single': 'Einschichtig',
    'shiftModel.two-shift': 'Zweischichtig',
    'shiftModel.three-shift': 'Dreischichtig',
    'shiftModel.continuous': 'Durchlaufender Betrieb',
    'shiftModel.flexible': 'Flexibel / nach Bedarf',
    'shiftModel.unsure': 'Noch nicht festgelegt',
    'duration.short-term': 'Kurzfristig (bis 3 Monate)',
    'duration.seasonal': 'Saisonal',
    'duration.long-term': 'Langfristig (6 Monate oder länger)',
    'duration.permanent': 'Dauerhaft',
    'duration.unsure': 'Noch nicht festgelegt',
    'accommodation.yes': 'Ja, wird benötigt',
    'accommodation.no': 'Nein',
    'accommodation.unsure': 'Noch unklar',
    'transport.yes': 'Ja, wird benötigt',
    'transport.no': 'Nein',
    'transport.unsure': 'Noch unklar',
    'foreignWorkerSupport.yes': 'Ja, wir benötigen Unterstützung',
    'foreignWorkerSupport.no': 'Nein',
    'foreignWorkerSupport.unsure': 'Noch unklar',
    'preferredContact.email': 'E-Mail',
    'preferredContact.phone': 'Telefon',
    'preferredContact.either': 'E-Mail oder Telefon',
    'workplaceRegion.praha': 'Hauptstadt Prag',
    'workplaceRegion.stredocesky': 'Mittelböhmische Region',
    'workplaceRegion.jihocesky': 'Südböhmische Region',
    'workplaceRegion.plzensky': 'Region Pilsen',
    'workplaceRegion.karlovarsky': 'Region Karlsbad',
    'workplaceRegion.ustecky': 'Region Aussig',
    'workplaceRegion.liberecky': 'Region Reichenberg',
    'workplaceRegion.kralovehradecky': 'Region Königgrätz',
    'workplaceRegion.pardubicky': 'Region Pardubitz',
    'workplaceRegion.vysocina': 'Region Vysočina',
    'workplaceRegion.jihomoravsky': 'Südmährische Region',
    'workplaceRegion.olomoucky': 'Region Olmütz',
    'workplaceRegion.zlinsky': 'Region Zlín',
    'workplaceRegion.moravskoslezsky': 'Mährisch-Schlesische Region',
  },
  errors: {
    required: 'Dieses Feld ist erforderlich.',
    invalidEmail: 'Geben Sie eine gültige E-Mail-Adresse ein.',
    invalidNumber: 'Geben Sie eine gültige ganze Zahl im zulässigen Bereich ein.',
    tooLong: 'Der Text ist zu lang.',
    invalidOption: 'Wählen Sie eine der angebotenen Optionen.',
    invalidDate: 'Geben Sie ein gültiges Datum ein.',
  },
  errorSummaryTitle: 'Das Formular kann nicht gesendet werden – bitte prüfen Sie diese Felder:',
  requiredMark: 'erforderlich',
  optionalMark: 'optional',
  consentLabel:
    'Ich willige in die Verarbeitung der angegebenen Daten zum Zweck der Bearbeitung dieser Anfrage ein.',
  consentDetail:
    `Die Daten werden von ${OPERATOR} ausschließlich zur Bearbeitung dieser Anfrage verarbeitet. Beim Absenden öffnet sich Ihr E-Mail-Programm – Sie senden die Nachricht selbst. Einzelheiten finden Sie in der Datenschutzerklärung.`,
  submit: 'Anfrage-E-Mail erstellen',
  submitting: 'Wird vorbereitet…',
  successTitle: 'Ihre Anfrage-E-Mail ist bereit',
  successBody:
    'Ihr E-Mail-Programm wurde mit einer strukturierten Anfrage geöffnet. Prüfen Sie die Angaben und senden Sie die Nachricht – erst dadurch erreicht sie uns.',
  mailtoFallbackNote:
    `Falls sich Ihr E-Mail-Programm nicht geöffnet hat, kopieren Sie den Text unten und senden Sie ihn an ${OPERATOR_EMAIL}.`,
  emailSubject: 'Personalanfrage',
  emailIntro: 'Anfrage gesendet über talentpartnerid.com:',
  emailAttributionTitle: 'Kontext der Anfrage',
  attributionLabels: attributionLabelsDe,
  whatHappensTitle: 'So läuft es ab',
  whatHappens: [
    'Wir melden uns und ergänzen fehlende betriebliche Details.',
    'Wir prüfen, ob und in welchem Umfang der Bedarf gedeckt werden kann – Verfügbarkeit wird nie im Voraus garantiert.',
    'Wir erstellen ein Angebot nach Beruf, Standort, Schichtmodell und Umfang.',
    'Wir stimmen die vertragliche Aufteilung der Verantwortung ab (wer stellt Arbeitsschutz, PSA, Unterkunft, Transport).',
    'Nach Freigabe richten wir Rekrutierung, Dokumentation und Einsatzbeginn ein.',
  ],
  whatWeNeedTitle: 'Was wir für ein Angebot benötigen',
  whatWeNeed: [
    'Beruf und Anzahl der Mitarbeiter.',
    'Einsatzort und Region.',
    'Eintrittstermin und voraussichtliche Dauer.',
    'Schichtmodell und Wochenstunden.',
    'Anforderungen an Erfahrung, Qualifikation und Sprache.',
    'Ob Unterkunft, Transport oder Unterstützung bei Dokumenten benötigt wird.',
  ],
  privacyNote:
    `Verantwortlich für die Daten aus diesem Formular ist ${OPERATOR}, Kontakt ${OPERATOR_EMAIL}.`,
  noValuesNote:
    'Im Lohnrechner eingegebene Werte werden nicht in die Anfrage übernommen. Ein Budget geben ausschließlich Sie selbst manuell an, wenn Sie möchten.',
  faqTitle: 'Häufige Fragen zur Anfrage',
  faq: [
    {
      q: 'Ist die Anfrage verbindlich?',
      a: 'Nein. Das Absenden des Formulars begründet weder eine Bestellung noch einen Vertrag. Es ist eine Bedarfsmeldung, auf deren Grundlage ein Angebot erstellt werden kann.',
    },
    {
      q: 'Garantieren Sie, dass Sie die Mitarbeiter finden?',
      a: 'Nein. Die Verfügbarkeit von Kandidaten hängt von Beruf, Standort, Termin, Schichtmodell und den gebotenen Bedingungen ab. Nach Eingang der Anforderung sagen wir Ihnen, was realistisch ist.',
    },
    {
      q: 'Ist Zeitarbeit günstiger als Direkteinstellung?',
      a: 'Nicht automatisch. Gesetzliche Beiträge werden über eine Agentur nicht gesenkt. Der Unterschied hängt von den eingegebenen Annahmen ab und davon, welche betrieblichen Aufgaben die Agentur übernimmt. Den Vergleich können Sie im Rechner modellieren.',
    },
    {
      q: 'Werden Beträge aus dem Rechner in die Anfrage übernommen?',
      a: 'Nein. Der Rechner läuft ausschließlich in Ihrem Browser und übergibt keinen Wert an die Anfrage, die Seitenadresse oder die Analyse.',
    },
  ],
}

export const REQUEST_COPY: Record<Locale, RequestCopy> = { cs, en, de }
