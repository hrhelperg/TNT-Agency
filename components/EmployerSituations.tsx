// Situation-first employer hub (Batch 2b). The employer hub is organised by the
// real situation a company is in — not by a keyword directory. Every card is a
// distinct decision path (situation → explanation → who it's for → a relevant
// service/guide → a calculator/comparison where useful → a clean request CTA).
//
// All links are standard server-rendered anchors to clean canonical routes; the
// request CTA carries the surface hint via data-request-source (session capture),
// never a query parameter.

const REQUEST = '/poptavka-pracovniku'
const CALC = '/kalkulacka-mzdy-agenturniho-zamestnance'

interface Situation {
  id: string
  heading: string
  forWhom: string
  text: string
  links: Array<{ href: string; label: string }>
}

const SITUATIONS: Situation[] = [
  {
    id: 'smena',
    heading: 'Chybí nám pracovníci na směně',
    forWhom: 'Provozy, kde výpadek lidí ohrožuje směnu',
    text: 'Když chybí lidé právě teď, rozhoduje rychlost a jasné zadání. Ujasněte si profesi, počet, směnný model a termín — a nechte si připravit nabídku podle reálné dostupnosti v regionu.',
    links: [
      { href: '/pracovnici-do-vyroby', label: 'Pracovníci do výroby' },
      { href: '/pracovnici-do-skladu', label: 'Pracovníci do skladu' },
    ],
  },
  {
    id: 'kapacita',
    heading: 'Potřebujeme rychle navýšit kapacitu',
    forWhom: 'Firmy s náběhem objednávek nebo projektem',
    text: 'Krátkodobé navýšení kapacity bývá flexibilnější přes agenturní zaměstnávání. Rozmyslete si dobu, počet lidí a profese; administrativu formálního zaměstnavatele nese agentura.',
    links: [
      { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
      { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
    ],
  },
  {
    id: 'novy-provoz',
    heading: 'Otevíráme nový provoz nebo směnu',
    forWhom: 'Náběh nové linky, skladu nebo směny',
    text: 'U nového provozu je klíčové plánování náboru s předstihem, zaškolení a rezerva na absenci. Připravte si harmonogram náběhu a profil pozic.',
    links: [
      { href: '/planovani-naboru', label: 'Plánování náboru' },
      { href: '/pracovnici-do-vyroby', label: 'Pracovníci do výroby' },
    ],
  },
  {
    id: 'fluktuace',
    heading: 'Máme vysokou fluktuaci nebo absenci',
    forWhom: 'Provozy, kde se lidé rychle obměňují',
    text: 'Vysoká fluktuace zvyšuje náklady na nábor a zaškolení. Pomáhá pochopit příčiny, nastavit stabilizaci a počítat s provozní rezervou.',
    links: [
      { href: '/fluktuace-zamestnancu', label: 'Fluktuace zaměstnanců' },
      { href: '/jak-snizit-fluktuaci', label: 'Jak snížit fluktuaci' },
      { href: '/retence-zamestnancu', label: 'Retence zaměstnanců' },
    ],
  },
  {
    id: 'vyroba',
    heading: 'Potřebujeme pracovníky do výroby',
    forWhom: 'Výrobní podniky a montáže',
    text: 'U výroby řešíte směnnost, požadavky na pracoviště, zaškolení, BOZP a OOPP. Definujte profil pozice a výkonová očekávání.',
    links: [
      { href: '/pracovnici-do-vyroby', label: 'Pracovníci do výroby' },
      { href: '/pracovnici-pro-automotive', label: 'Pracovníci pro automotive' },
      { href: '/pracovnici-pro-potravinarskou-vyrobu', label: 'Potravinářská výroba' },
    ],
  },
  {
    id: 'sklad',
    heading: 'Potřebujeme pracovníky do skladu nebo logistiky',
    forWhom: 'Sklady, e-shopy a distribuční centra',
    text: 'Ve skladu se liší role příjmu, pickingu, packingu a expedice, k tomu sezónní špičky a docházka. Zvažte i kvalifikace na techniku a dopravu na směny.',
    links: [
      { href: '/pracovnici-do-skladu', label: 'Pracovníci do skladu' },
      { href: '/pracovnici-do-logistiky', label: 'Pracovníci do logistiky' },
      { href: '/pracovnici-pro-distribucni-centra', label: 'Distribuční centra' },
    ],
  },
  {
    id: 'odborne',
    heading: 'Nedaří se nám obsadit odbornou nebo technickou pozici',
    forWhom: 'Provozy hledající kvalifikované profese a techniky',
    text: 'U kvalifikovaných profesí obvykle nejde o počet uchazečů, ale o to, že vhodných lidí je málo, často práci aktivně nehledají a jejich způsobilost je vázaná na doklady a oprávnění. Zadání proto musí popsat i technické požadavky a potřebná oprávnění.',
    links: [
      { href: '/nabor-odbornych-pozic', label: 'Nábor odborných a technických pozic' },
      { href: '/odborna-zpusobilost-a-opravneni', label: 'Odborná způsobilost a oprávnění' },
      { href: '/proc-se-nedari-obsadit-odbornou-pozici', label: 'Proč se nedaří obsadit odbornou pozici' },
    ],
  },
  {
    id: 'vedeni-smen',
    heading: 'Hledáme mistra nebo vedoucího směny',
    forWhom: 'Provozy obsazující první úroveň vedení',
    text: 'Provozní vedení spojuje řízení lidí, plnění plánu, kvalitu a BOZP v jedné roli. Rozhodnutí, zda povýšit zevnitř, nebo hledat zvenčí, ovlivňuje stabilitu celé směny.',
    links: [
      { href: '/mistri-a-vedouci-smen', label: 'Mistři a vedoucí směn' },
      { href: '/thp-pozice', label: 'THP pozice' },
    ],
  },
  {
    id: 'cizinci',
    heading: 'Potřebujeme pracovníky ze zahraničí',
    forWhom: 'Firmy s nedostatkem lidí na domácím trhu',
    text: 'U pracovníků ze zahraničí rozhoduje, zda jde o občany EU, nebo třetích zemí — liší se oprávnění a dokumentace. Nábor nelze zúžit na příslib rychlého povolení.',
    links: [
      { href: '/nabor-zahranicnich-pracovniku', label: 'Nábor zahraničních pracovníků' },
      { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců v ČR' },
      { href: '/pracovni-povoleni-cr', label: 'Pracovní povolení v ČR' },
    ],
  },
  {
    id: 'zazemi',
    heading: 'Potřebujeme zajistit ubytování nebo dopravu',
    forWhom: 'Provozy mimo dosah místní pracovní síly',
    text: 'Ubytování a svoz rozšiřují okruh kandidátů, ale mají svá pravidla a náklady. Odpovědnost a standard se sjednávají smluvně podle provozu.',
    links: [
      { href: '/ubytovani-pro-pracovniky', label: 'Ubytování pro pracovníky' },
    ],
  },
  {
    id: 'porovnani',
    heading: 'Chceme porovnat přímý nábor a agenturní zaměstnávání',
    forWhom: 'Firmy rozhodující o modelu spolupráce',
    text: 'Rozdíl závisí na vámi zadaných předpokladech a na tom, které činnosti přebírá agentura. Model si můžete vyzkoušet v kalkulačce v režimu srovnání.',
    links: [
      { href: `${CALC}#srovnani`, label: 'Srovnání v kalkulačce' },
      { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
    ],
  },
  {
    id: 'naklady',
    heading: 'Potřebujeme zjistit skutečné náklady na pracovníka',
    forWhom: 'Finanční a provozní rozhodování',
    text: 'Celková cena práce přesahuje hrubou mzdu o povinné odvody a další přímé i nepřímé náklady. Spočítejte si strukturu nákladů před poptávkou.',
    links: [
      { href: CALC, label: 'Kalkulačka nákladů zaměstnance' },
      { href: '/kolik-stoji-zamestnanec', label: 'Kolik stojí zaměstnanec' },
      { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
    ],
  },
  {
    id: 'poptavka',
    heading: 'Nevíme, jak správně zadat personální poptávku',
    forWhom: 'Firmy zadávající poptávku poprvé',
    text: 'Kvalitní poptávka obsahuje profesi, počet, lokalitu, směnný model, termín, požadavky a rozpočet. Čím konkrétnější zadání, tím reálnější nabídka.',
    links: [
      { href: '/jak-najit-pracovniky', label: 'Jak najít pracovníky pro firmu' },
      { href: '/nabor-pracovniku', label: 'Nábor pracovníků: přehled cest' },
    ],
  },
]

// Cities with a dedicated recruitment page (/nabor-zamestnancu-<slug>), which
// each cross-links its "pracovníci <město>" page. Diacritics in the visible name.
const REGIONS: Array<[string, string]> = [
  ['praha', 'Praha'], ['brno', 'Brno'], ['ostrava', 'Ostrava'], ['plzen', 'Plzeň'],
  ['pardubice', 'Pardubice'], ['hradec-kralove', 'Hradec Králové'], ['liberec', 'Liberec'],
  ['usti-nad-labem', 'Ústí nad Labem'], ['olomouc', 'Olomouc'], ['zlin', 'Zlín'],
]

export default function EmployerSituations() {
  return (
    <section className="section" aria-labelledby="situace-title" lang="cs">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Pro zaměstnavatele</div>
          <h2 id="situace-title">Vyberte si podle své situace</h2>
          <p>
            Zvolte situaci, kterou právě řešíte. U každé najdete stručné vysvětlení, na co se
            připravit, odkaz na relevantní službu nebo průvodce a přímou cestu k nezávazné poptávce.
          </p>
        </div>
        <div className="situ-grid">
          {SITUATIONS.map((s) => (
            <article className="situ-card" key={s.id} aria-labelledby={`situ-${s.id}`}>
              <h3 id={`situ-${s.id}`}>{s.heading}</h3>
              <p className="situ-for">{s.forWhom}</p>
              <p>{s.text}</p>
              <ul className="situ-links">
                {s.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
              <a href={REQUEST} data-request-source="employer-hub" className="btn btn-primary btn-sm situ-cta">
                Poptat pracovníky
              </a>
            </article>
          ))}
        </div>

        {/* Regional recruitment entry point. Connects the per-city recruitment
            pages (previously reachable only via their own cluster) to a
            homepage-reachable hub via descriptive contextual anchors. Each city
            page in turn cross-links its "pracovníci <město>" page. */}
        <div className="situ-regions">
          <h3 id="regionalni-nabor">Regionální nábor zaměstnanců</h3>
          <p>Řešíte nábor v konkrétním městě nebo regionu? Přejděte na přehled náboru zaměstnanců pro danou lokalitu:</p>
          <ul className="situ-region-links" aria-labelledby="regionalni-nabor">
            {REGIONS.map(([slug, name]) => (
              <li key={slug}>
                <a href={`/nabor-zamestnancu-${slug}`}>Nábor zaměstnanců {name}</a>
              </li>
            ))}
          </ul>
          <p className="situ-regions-market">
            Plánujete nábor podle situace na trhu práce? Začněte přehledem{' '}
            <a href="/trh-prace-stredocesky-kraj">trhu práce ve Středočeském kraji</a> — největším
            zaměstnaneckém regionu ČR — odkud se prolinkují i další krajské přehledy.
          </p>
        </div>

        <p className="situ-trust">
          Vybíráte dodavatele? Přečtěte si, <a href="/o-nas">jak si ověřit agenturu práce v ČR</a> —
          rozdíl mezi registrací firmy a povolením ke zprostředkování zaměstnání.
        </p>
      </div>
    </section>
  )
}
