import Head from 'next/head';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleLanguageNotice from '../components/ArticleLanguageNotice';
import ResponsibilityMatrix from '../components/ResponsibilityMatrix';
import { useLang } from '../lib/i18n/react';
import { DCALC } from '../lib/i18n/dedicated-calculator-copy';
import { AGENCY_VALUE } from '../lib/agency-value/copy';
import {
  calculate,
  createDefaultInput,
  formatCzk,
  formatPercent,
  toCzkNumber,
  PAYROLL_SOURCES,
  CZ_2026,
  type CalculationMode,
  type PayrollInput,
  type WageInputMode,
  type LineItem,
  type ComparisonRow,
} from '../lib/payroll';

const PAGE_URL = 'https://talentpartnerid.com/kalkulacka-mzdy-agenturniho-zamestnance';
const PAGE_PATH = '/kalkulacka-mzdy-agenturniho-zamestnance';
const PAGE_TITLE = 'Kalkulačka mzdy agenturního a kmenového zaměstnance 2026';
const PAGE_DESCRIPTION =
  'Kalkulačka mzdy agenturního a kmenového zaměstnance 2026: spočítá hrubou a čistou mzdu, přesčasy a příplatky, odvody zaměstnance, náklady zaměstnavatele, agenturní marži i celkovou cenu pracovníka a porovná agenturního zaměstnance s kmenovým.';
const LAST_VERIFIED = '2026-07-18';

const stripScriptTags = (s: string): string => s.replace(/<\/?script[^>]*>/g, '');

// ── Structured data (valid, relevant) ──────────────────────────────────────
const webAppSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: PAGE_TITLE,
  url: PAGE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  inLanguage: 'cs-CZ',
  description: PAGE_DESCRIPTION,
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'CZK' },
  publisher: {
    '@type': 'Organization',
    name: 'TalentPartnerID',
    url: 'https://talentpartnerid.com',
    logo: { '@type': 'ImageObject', url: 'https://talentpartnerid.com/favicon.svg' },
  },
});

const breadcrumbSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Domů', item: 'https://talentpartnerid.com/' },
    { '@type': 'ListItem', position: 2, name: PAGE_TITLE, item: PAGE_URL },
  ],
});

interface Faq {
  q: string;
  a: string;
}

const FAQ: Faq[] = [
  {
    q: 'Jak se počítá čistá mzda z hrubé mzdy v roce 2026?',
    a: 'Z hrubé mzdy se odečte sociální pojištění zaměstnance 7,1 % a zdravotní pojištění 4,5 % a záloha na daň z příjmů. Daň se počítá 15 % ze základu (hrubá mzda zaokrouhlená na celé stokoruny nahoru), případně 23 % z části nad 146 901 Kč měsíčně. Od daně se odečtou slevy (základní sleva 2 570 Kč měsíčně při podepsaném prohlášení) a daňové zvýhodnění na děti.',
  },
  {
    q: 'Kolik stojí zaměstnanec zaměstnavatele nad rámec hrubé mzdy?',
    a: 'Zaměstnavatel platí navíc sociální pojištění 24,8 % a zdravotní pojištění 9 % z hrubé mzdy. Celkové přímé mzdové náklady jsou tedy zhruba 1,338násobek hrubé mzdy. K tomu se mohou přidat další náklady (nábor, OOPP, školení, ubytování) a u zákonného pojištění úrazu sazba dle oboru.',
  },
  {
    q: 'Znamená agenturní zaměstnávání nižší mzdu pro pracovníka?',
    a: 'Ne. Podle § 309 zákoníku práce musí agentura práce zajistit srovnatelné pracovní a mzdové podmínky, jaké má nebo by měl srovnatelný kmenový zaměstnanec uživatele. Rozdíl v ceně pro firmu tvoří odvody zaměstnavatele, provozní náklady a marže agentury – nikoli nižší mzda pracovníka.',
  },
  {
    q: 'Proč 160 hodin není vždy skutečný měsíční fond?',
    a: 'Skutečný fond pracovní doby závisí na konkrétním měsíci, počtu pracovních dnů, svátcích, rozvržení směn a případných absencích. 160 hodin je pouze výchozí scénář. Ne každá hodina nad 160 je automaticky přesčas – přesčas se posuzuje podle týdenní pracovní doby a rozvrhu směn.',
  },
  {
    q: 'Jak se počítají příplatky za přesčas, noc, víkend a svátek?',
    a: 'Příplatek za přesčas je nejméně 25 % průměrného výdělku (nebo náhradní volno), za noční práci a za sobotu/neděli nejméně 10 % průměrného výdělku a za práci ve svátek náhradní volno nebo příplatek nejméně 100 % průměrného výdělku. Příplatek za ztížené prostředí je nejméně 10 % minimální mzdy. Průměrný výdělek je zákonná veličina počítaná z předchozího čtvrtletí, nikoli nutně smluvní mzda.',
  },
  {
    q: 'Zohledňuje kalkulačka DPH u agenturní faktury?',
    a: 'Ano, DPH se počítá zvlášť ze základu faktury (výchozí sazba 21 %) a nikdy se nesměšuje se mzdovými náklady. Pokud je firma plátcem DPH a může si daň odečíst, ekonomický náklad DPH nezahrnuje; peněžní tok ji zahrnuje. Konkrétní režim závisí na faktuře a postavení plátce.',
  },
  {
    q: 'Jak často se sazby aktualizují?',
    a: `Klíčové hodnoty (minimální a průměrná mzda, hranice pro 23% daň, maximální vyměřovací základ) se stanovují nařízeními vlády zpravidla jednou ročně k 1. lednu. Kalkulačka používá pravidla pro rok 2026, ověřená k ${LAST_VERIFIED} u ČSSZ, Finanční správy, MPSV a VZP.`,
  },
];

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

interface ContentSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

const CONTENT: ContentSection[] = [
  {
    heading: 'Jak se počítá hrubá a čistá mzda',
    body: [
      'Hrubá mzda je součet základní (dosažené) mzdy za odpracované hodiny, příplatků a zdanitelných odměn. Z hrubé mzdy se strhává sociální pojištění zaměstnance 7,1 % a zdravotní pojištění 4,5 %; obě se zaokrouhlují na celé koruny nahoru.',
      'Záloha na daň z příjmů se počítá z hrubé mzdy (superhrubá mzda byla zrušena). Základ daně se nad 100 Kč zaokrouhlí na celé stokoruny nahoru, uplatní se sazba 15 % (nebo 23 % z části nad měsíční hranicí 146 901 Kč) a od vypočtené daně se odečtou slevy a daňové zvýhodnění. Čistá mzda je hrubá mzda minus pojistné, minus záloha na daň (plus případný daňový bonus), minus zákonné srážky.',
    ],
  },
  {
    heading: 'Kolik stojí zaměstnanec zaměstnavatele',
    body: [
      'Nad rámec hrubé mzdy platí zaměstnavatel sociální pojištění 24,8 % a zdravotní pojištění 9 %. Skutečná cena práce je proto výrazně vyšší než hrubá mzda a ještě vyšší než čistá mzda, kterou vidí zaměstnanec.',
      'K přímým mzdovým nákladům se mohou přidávat další položky: zákonné pojištění odpovědnosti za pracovní úraz (sazba dle oboru), nábor, vstupní lékařská prohlídka, OOPP, školení, ubytování nebo doprava. Kalkulačka tyto položky uvádí odděleně, aby bylo zřejmé, co je zákonný odvod a co provozní náklad.',
    ],
  },
  {
    heading: 'Jak se počítá práce přesčas',
    body: [
      'Za práci přesčas náleží dosažená mzda a příplatek nejméně 25 % průměrného výdělku, pokud se zaměstnanec a zaměstnavatel nedohodnou na náhradním volnu místo příplatku (§ 114 zákoníku práce).',
      'Pozor: příplatek se počítá z průměrného výdělku, nikoli automaticky ze smluvní hodinové mzdy. Průměrný výdělek je zákonná veličina zjišťovaná z předchozího kalendářního čtvrtletí a bývá odlišný od sjednané mzdy. Kalkulačka proto umožňuje zadat průměrný výdělek samostatně a jasně označí, pokud použijete jen orientační odhad.',
    ],
  },
  {
    heading: 'Příplatky za noc, víkend a svátek',
    body: [
      'Příplatek za noční práci (doba mezi 22:00 a 6:00) je nejméně 10 % průměrného výdělku, za práci v sobotu a v neděli rovněž nejméně 10 % průměrného výdělku. Za práci ve svátek náleží náhradní volno s náhradou mzdy, nebo po dohodě příplatek nejméně 100 % průměrného výdělku.',
      'Jedna hodina může zakládat nárok na více příplatků současně – například přesčas odpracovaný v noci o víkendu. Kalkulačka proto počítá jednotlivé kategorie hodin samostatně a nepředpokládá, že se vzájemně vylučují.',
    ],
    bullets: [
      'Přesčas: ≥ 25 % průměrného výdělku (nebo náhradní volno) – § 114',
      'Noční práce: ≥ 10 % průměrného výdělku – § 116',
      'Sobota a neděle: ≥ 10 % průměrného výdělku – § 118',
      'Svátek: náhradní volno nebo ≥ 100 % průměrného výdělku – § 115',
      'Ztížené prostředí: ≥ 10 % minimální mzdy – § 117',
    ],
  },
  {
    heading: 'Agenturní versus kmenový zaměstnanec',
    body: [
      'Agenturní zaměstnávání (dočasné přidělení k uživateli) a přímé zaměstnání se liší strukturou nákladů, ne nutně mzdou pracovníka. Agentura práce má ze zákona povinnost zajistit srovnatelné pracovní a mzdové podmínky, jaké má nebo by měl srovnatelný kmenový zaměstnanec uživatele (§ 309 odst. 5 zákoníku práce).',
      'Rozdíl v ceně pro firmu tvoří odvody zaměstnavatele, provozní náklady (nábor, administrativa, ubytování, doprava, koordinace) a teprve poté marže agentury. U kmenového zaměstnance nese tyto náklady firma sama. Kalkulačka proto porovnává celkovou cenu, ne jen mzdu.',
    ],
  },
  {
    heading: 'Co tvoří cenu agenturní práce',
    body: [
      'Fakturovaná cena agentury není „zisk“ z rozdílu mezi mzdou a fakturou. Skládá se z přeúčtovaných mzdových nákladů (hrubá mzda + odvody zaměstnavatele), z přeúčtovaných provozních nákladů a z odměny agentury za službu (marže). Na celou službu se pak uplatní DPH.',
      'Kalkulačka odděluje vratné/pass-through náklady od marže a DPH uvádí na samostatném řádku. U plátce DPH je daň zpravidla odpočitatelná, takže ekonomický náklad ji nezahrnuje – peněžní tok ano.',
    ],
  },
  {
    heading: 'Proč 160 hodin není vždy skutečný měsíční fond',
    body: [
      'Výchozí scénář 160 hodin je jen orientační. Skutečný nominální fond pracovní doby závisí na konkrétním měsíci, počtu pracovních dnů, svátcích, rozvržení směn, sjednané délce týdenní pracovní doby a případných absencích.',
      'Kalkulačka proto neoznačuje 160 hodin za univerzální zákonnou normu a nepovažuje automaticky každou hodinu nad 160 za přesčas. Přesčasové hodiny zadáváte samostatně.',
    ],
  },
  {
    heading: 'Jaké údaje kalkulačka nezohledňuje',
    body: [
      'Kalkulačka je orientační a nemůže nahradit mzdovou účtárnu. Nezohledňuje mimo jiné: skutečný průměrný výdělek z předchozího čtvrtletí (pokud jej nezadáte), roční zúčtování daně a slev, kumulativní roční strop sociálního pojištění, doplatek do minimálního vyměřovacího základu zdravotního pojištění se všemi výjimkami, daňové osvobození benefitů (stravné) s limity, kolektivní smlouvy, vnitřní mzdové předpisy ani konkrétní sazbu zákonného pojištění úrazu podle oboru.',
    ],
  },
  {
    heading: 'Jak často jsou sazby aktualizovány',
    body: [
      `Klíčové hodnoty se stanovují nařízeními vlády zpravidla jednou ročně k 1. lednu. Tato kalkulačka používá pravidla pro rok 2026, ověřená k ${LAST_VERIFIED} u oficiálních institucí (ČSSZ, Finanční správa, MPSV, VZP). Před finálním rozhodnutím doporučujeme ověřit výpočet u účetní nebo mzdové specialistky.`,
    ],
  },
];

const INTERNAL_LINKS: { href: string; label: string }[] = [
  { href: '/naklady-na-zamestnance-cr', label: 'Náklady na zaměstnance v ČR' },
  { href: '/skutecne-naklady-na-zamestnance', label: 'Skutečné náklady na zaměstnance' },
  { href: '/kolik-stoji-zamestnanec', label: 'Kolik stojí zaměstnanec' },
  { href: '/socialni-zdravotni-dane-2026', label: 'Sociální a zdravotní pojištění a daně 2026' },
  { href: '/minimalni-mzda-2026', label: 'Minimální mzda 2026' },
  { href: '/jak-funguje-pracovni-agentura', label: 'Jak funguje pracovní agentura' },
  { href: '/docasne-prideleni-zamestnancu', label: 'Dočasné přidělení zaměstnanců' },
  { href: '/zamestnavani-cizincu', label: 'Zaměstnávání cizinců' },
  { href: '/dane-cizincu-v-cr', label: 'Daně cizinců v ČR' },
  { href: '/onboarding-zamestnancu', label: 'Onboarding zaměstnanců' },
  { href: '/povinnosti-zamestnavatele', label: 'Povinnosti zaměstnavatele' },
];

// ── Small presentational helpers ────────────────────────────────────────────
function Money({ value }: { value: number }) {
  return <span>{formatCzk(value as never)}</span>;
}

function NumberField(props: {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  min?: number;
  suffix?: string;
  hint?: string;
}) {
  const { id, label, value, onChange, step = 1, min = 0, suffix, hint } = props;
  return (
    <div className="pcalc-field">
      <label htmlFor={id}>{label}</label>
      <div className="pcalc-field__input">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => {
            const raw = e.target.value;
            onChange(raw === '' ? 0 : Number(raw));
          }}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        {suffix ? <span className="pcalc-field__suffix">{suffix}</span> : null}
      </div>
      {hint ? (
        <span id={`${id}-hint`} className="pcalc-field__hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

function Toggle(props: { id: string; label: string; checked: boolean; onChange: (b: boolean) => void }) {
  return (
    <div className="pcalc-toggle">
      <input id={props.id} type="checkbox" checked={props.checked} onChange={(e) => props.onChange(e.target.checked)} />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}

function LineRow({ line }: { line: LineItem }) {
  const t = DCALC[useLang()];
  const originLabel =
    line.origin === 'statutory'
      ? t.originStatutory
      : line.origin === 'user-entered'
        ? t.originUser
        : line.origin === 'estimated'
          ? t.originEstimated
          : t.originDerived;
  const source = line.sourceId ? PAYROLL_SOURCES.find((s) => s.id === line.sourceId) : undefined;
  return (
    <details className="pcalc-line">
      <summary>
        <span className="pcalc-line__label">{line.labelCs}</span>
        <span className="pcalc-line__amount">
          <Money value={line.amount} />
        </span>
      </summary>
      <div className="pcalc-line__detail">
        <p>
          <strong>{t.lFormula}</strong> {line.formula}
        </p>
        {line.rateNote ? (
          <p>
            <strong>{t.lRateBase}</strong> {line.rateNote}
            {line.baseNote ? ` — ${line.baseNote}` : ''}
          </p>
        ) : line.baseNote ? (
          <p>
            <strong>{t.lBase}</strong> {line.baseNote}
          </p>
        ) : null}
        {line.roundingNote ? (
          <p>
            <strong>{t.lRounding}</strong> {line.roundingNote}
          </p>
        ) : null}
        <p>
          <span className={`pcalc-badge pcalc-badge--${line.origin}`}>{originLabel}</span>
          {source ? (
            <>
              {' '}
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {t.lSource} {source.authority} ({source.legalBasis})
              </a>
            </>
          ) : null}
        </p>
      </div>
    </details>
  );
}

const WORKER_PRESETS = [1, 5, 10, 25, 50, 100];

// ── Main page ───────────────────────────────────────────────────────────────
export default function PayrollCalculatorPage() {
  const lang = useLang();
  const t = DCALC[lang];
  const av = AGENCY_VALUE[lang];
  const [inp, setInp] = useState<PayrollInput>(() => createDefaultInput());

  // Restore shared query-state (?d=) on mount — client only, no hydration mismatch.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const d = params.get('d');
      if (d) {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(d)))) as PayrollInput;
        setInp((prev) => ({ ...prev, ...decoded }));
      }
      // Non-sensitive mode hint (e.g. from the homepage "compare" CTA). No salary.
      const mode = params.get('mode');
      if (mode === 'agency' || mode === 'direct' || mode === 'comparison') {
        setInp((prev) => ({ ...prev, mode }));
      }
    } catch {
      /* ignore malformed state */
    }
  }, []);

  const result = useMemo(() => calculate(inp), [inp]);

  const setMode = (mode: CalculationMode) => setInp((p) => ({ ...p, mode }));
  const setWage = (patch: Partial<PayrollInput['wage']>) => setInp((p) => ({ ...p, wage: { ...p.wage, ...patch } }));
  const setPeriod = (patch: Partial<PayrollInput['period']>) =>
    setInp((p) => ({ ...p, period: { ...p.period, ...patch } }));
  const setWorked = (patch: Partial<PayrollInput['workedTime']>) =>
    setInp((p) => ({ ...p, workedTime: { ...p.workedTime, ...patch } }));
  const setPrem = (patch: Partial<PayrollInput['premiums']>) =>
    setInp((p) => ({ ...p, premiums: { ...p.premiums, ...patch } }));
  const setPremPct = (key: 'overtime' | 'night' | 'saturday' | 'sunday' | 'holiday', percent: number) =>
    setInp((p) => ({ ...p, premiums: { ...p.premiums, [key]: { ...p.premiums[key], percent } } }));
  const setAdj = (patch: Partial<PayrollInput['adjustments']>) =>
    setInp((p) => ({ ...p, adjustments: { ...p.adjustments, ...patch } }));
  const setTax = (patch: Partial<PayrollInput['taxProfile']>) =>
    setInp((p) => ({ ...p, taxProfile: { ...p.taxProfile, ...patch } }));
  const setAgency = (patch: Partial<PayrollInput['agency']>) =>
    setInp((p) => ({ ...p, agency: { ...p.agency, ...patch } }));
  const setAgencyOp = (patch: Partial<PayrollInput['agency']['operational']>) =>
    setInp((p) => ({ ...p, agency: { ...p.agency, operational: { ...p.agency.operational, ...patch } } }));
  const setDirect = (patch: Partial<PayrollInput['direct']>) =>
    setInp((p) => ({ ...p, direct: { ...p.direct, ...patch } }));

  const setChildren = (count: number) =>
    setInp((p) => {
      const next = [...p.taxProfile.children];
      while (next.length < count) next.push({ ztpp: false });
      next.length = Math.max(0, count);
      return { ...p, taxProfile: { ...p.taxProfile, children: next } };
    });
  const toggleChildZtpp = (index: number, ztpp: boolean) =>
    setInp((p) => {
      const next = p.taxProfile.children.map((c, i) => (i === index ? { ztpp } : c));
      return { ...p, taxProfile: { ...p.taxProfile, children: next } };
    });

  const reset = useCallback(() => setInp(createDefaultInput()), []);
  const doPrint = useCallback(() => {
    if (typeof window !== 'undefined') window.print();
  }, []);
  const copyLink = useCallback(() => {
    if (typeof window === 'undefined') return;
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(inp))));
    const url = `${window.location.origin}${PAGE_PATH}?d=${encodeURIComponent(encoded)}`;
    void navigator.clipboard?.writeText(url);
  }, [inp]);

  const primary = result.agencyResult ?? result.directResult;
  const employee = primary?.employee;
  const employer = primary?.employer;
  const agency = result.agencyResult?.agency;
  const comparison = result.comparison;

  const copySummary = useCallback(() => {
    if (typeof window === 'undefined' || !employee || !primary) return;
    const lines = [
      `${PAGE_TITLE}`,
      `Režim: ${inp.mode}`,
      `Hrubá mzda: ${formatCzk(employee.gross.grossWage)}`,
      `Čistá mzda: ${formatCzk(employee.netWage)}`,
      `Odvody zaměstnance: ${formatCzk(employee.contributions.total)}`,
      `Náklady zaměstnavatele (zákonné): ${employer ? formatCzk(employer.statutoryTotal) : '—'}`,
      `Celkový měsíční náklad: ${formatCzk(primary.totalEconomicCost)}`,
      `Náklad na odpracovanou hodinu: ${formatCzk(primary.effectiveHourly.costPerWorkedHour)}`,
    ];
    void navigator.clipboard?.writeText(lines.join('\n'));
  }, [employee, employer, primary, inp.mode]);

  const downloadCsv = useCallback(() => {
    if (typeof window === 'undefined' || !comparison) return;
    const header = 'Polozka;Agenturni (Kc);Kmenovy (Kc)';
    const rows = comparison.rows.map(
      (r: ComparisonRow) => `${r.labelCs};${toCzkNumber(r.agency)};${toCzkNumber(r.direct)}`,
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'porovnani-agentura-vs-kmen.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, [comparison]);

  const diffPct = comparison?.differencePercent;

  // Qualified difference state — derived only from entered values, never labelled
  // as guaranteed savings. differenceCzk = agency − direct (economic).
  const directOpSum = comparison ? Object.values(inp.direct).reduce((a, b) => a + b, 0) : 0;
  const diffCzk = comparison ? toCzkNumber(comparison.differenceCzk) : 0;
  const diffState = !comparison
    ? ''
    : directOpSum === 0
      ? av.stateInsufficient
      : Math.abs(diffCzk) < 1
        ? av.stateBreakEven
        : diffCzk > 0
          ? av.stateDirectCheaper
          : av.stateAgencyCheaper;

  return (
    <>
      <Head>
        <title>{`${PAGE_TITLE} | TalentPartnerID`}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta
          name="keywords"
          content="kalkulačka mzdy 2026, agenturní zaměstnanec, kmenový zaměstnanec, čistá mzda, hrubá mzda, náklady zaměstnavatele, přesčasy, příplatky, odvody, agenturní marže"
        />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="last-modified" content={LAST_VERIFIED} />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="cs" href={PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="TalentPartnerID" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content="https://talentpartnerid.com/assets/og.svg" />
        <meta property="og:locale" content="cs_CZ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <script
          key="schema-webapp"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stripScriptTags(webAppSchema) }}
        />
        <script
          key="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stripScriptTags(breadcrumbSchema) }}
        />
        <script
          key="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stripScriptTags(faqSchema) }}
        />
      </Head>

      <Header activePage="article" />

      <section className="article-hero" lang={lang}>
        <div className="container">
          <nav className="seo-breadcrumb" aria-label="Drobečková navigace">
            <a href="/">{t.breadcrumbHome}</a> <span aria-hidden="true">›</span> <span>{t.breadcrumbCurrent}</span>
          </nav>
          <div className="eyebrow">{t.eyebrow}</div>
          <h1>{t.h1}</h1>
          <p className="page-hero__sub">{t.heroSub}</p>
          <div className="article-meta">
            <span>{t.metaEstimate}</span>
            <span>{t.metaRules}</span>
            <span>{t.metaVerified.replace('{d}', LAST_VERIFIED)}</span>
          </div>
        </div>
      </section>

      <main className="section" lang={lang}>
        <div className="container">
          <p className="pcalc-methodology">{t.methodology}</p>

          {/* Mode selector */}
          <fieldset className="pcalc-fieldset pcalc-modes-wrap">
            <legend>{t.legMode}</legend>
            <div className="pcalc-modes" role="tablist" aria-label={t.legMode}>
              {(
                [
                  ['agency', t.modeAgency],
                  ['direct', t.modeDirect],
                  ['comparison', t.modeComparison],
                ] as [CalculationMode, string][]
              ).map(([m, label]) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={inp.mode === m}
                  className={`pcalc-mode-btn ${inp.mode === m ? 'is-active' : ''}`}
                  onClick={() => setMode(m)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="pcalc__grid">
            {/* ── Inputs ── */}
            <div className="pcalc__panel">
              <fieldset className="pcalc-fieldset">
                <legend>{t.legPeriod}</legend>
                <div className="pcalc-grid-2">
                  <NumberField
                    id="month"
                    label={t.month}
                    value={inp.period.month}
                    onChange={(n) => setPeriod({ month: Math.min(12, Math.max(1, Math.round(n))) })}
                    min={1}
                  />
                  <NumberField
                    id="fund"
                    label={t.hoursFund}
                    value={inp.period.monthlyHoursFund}
                    onChange={(n) => setPeriod({ monthlyHoursFund: n })}
                    suffix="h"
                    hint={t.hoursFundHint}
                  />
                </div>
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t.legWage}</legend>
                <div className="pcalc-modes pcalc-modes--sm">
                  {(
                    [
                      ['hourly', t.wageHourly],
                      ['monthly', t.wageMonthly],
                    ] as [WageInputMode, string][]
                  ).map(([m, label]) => (
                    <button
                      key={m}
                      type="button"
                      className={`pcalc-mode-btn ${inp.wage.mode === m ? 'is-active' : ''}`}
                      aria-pressed={inp.wage.mode === m}
                      onClick={() => setWage({ mode: m })}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="pcalc-grid-2">
                  {inp.wage.mode === 'hourly' ? (
                    <NumberField
                      id="hourlyWage"
                      label={t.wageHourly}
                      value={inp.wage.hourlyWageCzk}
                      onChange={(n) => setWage({ hourlyWageCzk: n })}
                      suffix="Kč/h"
                      step={0.5}
                    />
                  ) : (
                    <NumberField
                      id="monthlyWage"
                      label={t.wageMonthly}
                      value={inp.wage.monthlyWageCzk}
                      onChange={(n) => setWage({ monthlyWageCzk: n })}
                      suffix="Kč"
                      step={500}
                    />
                  )}
                  <NumberField
                    id="avgEarnings"
                    label={t.avgEarnings}
                    value={inp.wage.averageHourlyEarningsCzk}
                    onChange={(n) => setWage({ averageHourlyEarningsCzk: n, useWageAsAverageEstimate: false })}
                    suffix="Kč/h"
                    step={0.5}
                    hint={t.avgEarningsHint}
                  />
                </div>
                <Toggle
                  id="useEstimate"
                  label={t.useEstimate}
                  checked={inp.wage.useWageAsAverageEstimate}
                  onChange={(b) => setWage({ useWageAsAverageEstimate: b })}
                />
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t.legWorked}</legend>
                <div className="pcalc-grid-2">
                  <NumberField id="regular" label={t.regularHours} value={inp.workedTime.regularHours} onChange={(n) => setWorked({ regularHours: n })} suffix="h" />
                  <NumberField id="overtime" label={t.overtime} value={inp.workedTime.overtimeHours} onChange={(n) => setWorked({ overtimeHours: n })} suffix="h" />
                  <NumberField id="night" label={t.nightHours} value={inp.workedTime.nightHours} onChange={(n) => setWorked({ nightHours: n })} suffix="h" />
                  <NumberField id="sat" label={t.saturday} value={inp.workedTime.saturdayHours} onChange={(n) => setWorked({ saturdayHours: n })} suffix="h" />
                  <NumberField id="sun" label={t.sunday} value={inp.workedTime.sundayHours} onChange={(n) => setWorked({ sundayHours: n })} suffix="h" />
                  <NumberField id="holiday" label={t.holiday} value={inp.workedTime.holidayHours} onChange={(n) => setWorked({ holidayHours: n })} suffix="h" />
                  <NumberField id="difficult" label={t.difficult} value={inp.workedTime.difficultEnvironmentHours} onChange={(n) => setWorked({ difficultEnvironmentHours: n })} suffix="h" />
                </div>
                <p className="pcalc-note">{t.workedNote}</p>
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t.legPremiums}</legend>
                <div className="pcalc-grid-2">
                  <NumberField id="pOvertime" label={t.pOvertime} value={inp.premiums.overtime.percent} onChange={(n) => setPremPct('overtime', n)} suffix="%" />
                  <NumberField id="pNight" label={t.pNight} value={inp.premiums.night.percent} onChange={(n) => setPremPct('night', n)} suffix="%" />
                  <NumberField id="pSat" label={t.pSat} value={inp.premiums.saturday.percent} onChange={(n) => setPremPct('saturday', n)} suffix="%" />
                  <NumberField id="pSun" label={t.pSun} value={inp.premiums.sunday.percent} onChange={(n) => setPremPct('sunday', n)} suffix="%" />
                  <NumberField id="pHoliday" label={t.pHoliday} value={inp.premiums.holiday.percent} onChange={(n) => setPremPct('holiday', n)} suffix="%" />
                  <NumberField
                    id="pDifficult"
                    label={t.pDifficult}
                    value={inp.premiums.difficultEnvironment.czkPerHour}
                    onChange={(n) =>
                      setPrem({
                        difficultEnvironment: { ...inp.premiums.difficultEnvironment, czkPerHour: n, mode: 'czk_per_hour' },
                      })
                    }
                    suffix="Kč/h"
                    step={0.5}
                    hint={t.pDifficultHint}
                  />
                </div>
                <Toggle id="otLeave" label={t.otLeave} checked={inp.premiums.overtimeCompensatoryLeave} onChange={(b) => setPrem({ overtimeCompensatoryLeave: b })} />
                <Toggle id="holLeave" label={t.holLeave} checked={inp.premiums.holidayCompensatoryLeave} onChange={(b) => setPrem({ holidayCompensatoryLeave: b })} />
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t.legAdjust}</legend>
                <div className="pcalc-grid-2">
                  <NumberField id="perfBonus" label={t.perfBonus} value={inp.adjustments.performanceBonus} onChange={(n) => setAdj({ performanceBonus: n })} suffix="Kč" step={500} />
                  <NumberField id="attBonus" label={t.attBonus} value={inp.adjustments.attendanceBonus} onChange={(n) => setAdj({ attendanceBonus: n })} suffix="Kč" step={500} />
                  <NumberField id="prodBonus" label={t.prodBonus} value={inp.adjustments.productionBonus} onChange={(n) => setAdj({ productionBonus: n })} suffix="Kč" step={500} />
                  <NumberField id="persBonus" label={t.persBonus} value={inp.adjustments.personalBonus} onChange={(n) => setAdj({ personalBonus: n })} suffix="Kč" step={500} />
                  <NumberField id="accDed" label={t.accDed} value={inp.adjustments.accommodationDeduction} onChange={(n) => setAdj({ accommodationDeduction: n })} suffix="Kč" step={100} />
                  <NumberField id="transDed" label={t.transDed} value={inp.adjustments.transportDeduction} onChange={(n) => setAdj({ transportDeduction: n })} suffix="Kč" step={100} />
                </div>
                <p className="pcalc-note">{t.adjustNote}</p>
              </fieldset>

              <fieldset className="pcalc-fieldset">
                <legend>{t.legTax}</legend>
                <Toggle id="signed" label={t.signed} checked={inp.taxProfile.signedDeclaration} onChange={(b) => setTax({ signedDeclaration: b })} />
                <Toggle id="basic" label={t.basicCredit} checked={inp.taxProfile.applyBasicCredit} onChange={(b) => setTax({ applyBasicCredit: b })} />
                <div className="pcalc-grid-2">
                  <div className="pcalc-field">
                    <label htmlFor="disability">{t.disability}</label>
                    <div className="pcalc-field__input">
                      <select id="disability" value={inp.taxProfile.disability} onChange={(e) => setTax({ disability: e.target.value as PayrollInput['taxProfile']['disability'] })}>
                        <option value="none">{t.disNone}</option>
                        <option value="first_second">{t.disFirst}</option>
                        <option value="third">{t.disThird}</option>
                      </select>
                    </div>
                  </div>
                  <div className="pcalc-field">
                    <label htmlFor="residency">{t.residency}</label>
                    <div className="pcalc-field__input">
                      <select id="residency" value={inp.taxProfile.residency} onChange={(e) => setTax({ residency: e.target.value as PayrollInput['taxProfile']['residency'] })}>
                        <option value="resident">{t.resResident}</option>
                        <option value="non_resident">{t.resNon}</option>
                      </select>
                    </div>
                  </div>
                  <NumberField id="children" label={t.childrenCount} value={inp.taxProfile.children.length} onChange={(n) => setChildren(Math.max(0, Math.round(n)))} />
                </div>
                <Toggle id="ztpp" label={t.ztpp} checked={inp.taxProfile.ztpp} onChange={(b) => setTax({ ztpp: b })} />
                {inp.taxProfile.children.map((c, i) => (
                  <Toggle key={i} id={`child-${i}`} label={t.childZtpp.replace('{n}', String(i + 1))} checked={c.ztpp} onChange={(b) => toggleChildZtpp(i, b)} />
                ))}
                {inp.taxProfile.residency === 'non_resident' ? (
                  <p className="pcalc-note">{t.nonResidentNote}</p>
                ) : null}
              </fieldset>

              {(inp.mode === 'agency' || inp.mode === 'comparison') && (
                <fieldset className="pcalc-fieldset">
                  <legend>{t.legAgency}</legend>
                  <div className="pcalc-field">
                    <label htmlFor="feeModel">{t.feeModel}</label>
                    <div className="pcalc-field__input">
                      <select id="feeModel" value={inp.agency.feeModel} onChange={(e) => setAgency({ feeModel: e.target.value as PayrollInput['agency']['feeModel'] })}>
                        <option value="percent_of_payroll">{t.feePercentOpt}</option>
                        <option value="per_hour">{t.feePerHourOpt}</option>
                        <option value="fixed_monthly">{t.feeFixedOpt}</option>
                        <option value="combined">{t.feeCombinedOpt}</option>
                      </select>
                    </div>
                  </div>
                  <div className="pcalc-grid-2">
                    <NumberField id="feePct" label={t.feePct} value={inp.agency.feePercentOfPayroll} onChange={(n) => setAgency({ feePercentOfPayroll: n })} suffix="%" step={0.5} />
                    <NumberField id="feeHour" label={t.feeHour} value={inp.agency.feePerHour} onChange={(n) => setAgency({ feePerHour: n })} suffix="Kč/h" />
                    <NumberField id="feeFixed" label={t.feeFixed} value={inp.agency.feeFixedMonthly} onChange={(n) => setAgency({ feeFixedMonthly: n })} suffix="Kč" step={500} />
                    <NumberField id="vat" label={t.vat} value={inp.agency.vatRatePercent} onChange={(n) => setAgency({ vatRatePercent: n })} suffix="%" />
                    <NumberField id="agAcc" label={t.agAcc} value={inp.agency.operational.accommodation} onChange={(n) => setAgencyOp({ accommodation: n })} suffix="Kč" step={500} />
                    <NumberField id="agTrans" label={t.agTrans} value={inp.agency.operational.transport} onChange={(n) => setAgencyOp({ transport: n })} suffix="Kč" step={500} />
                    <NumberField id="agRec" label={t.agRec} value={inp.agency.operational.recruitment} onChange={(n) => setAgencyOp({ recruitment: n })} suffix="Kč" step={500} />
                    <NumberField id="agOnb" label={t.agOnb} value={inp.agency.operational.oneTimeOnboarding} onChange={(n) => setAgencyOp({ oneTimeOnboarding: n })} suffix="Kč" step={500} />
                  </div>
                  <Toggle id="vatDeduct" label={t.vatDeduct} checked={inp.agency.companyCanDeductVat} onChange={(b) => setAgency({ companyCanDeductVat: b })} />
                </fieldset>
              )}

              {(inp.mode === 'direct' || inp.mode === 'comparison') && (
                <fieldset className="pcalc-fieldset">
                  <legend>{t.legDirect}</legend>
                  <div className="pcalc-grid-2">
                    <NumberField id="dRec" label={t.dRec} value={inp.direct.recruitment} onChange={(n) => setDirect({ recruitment: n })} suffix="Kč" step={500} />
                    <NumberField id="dOnb" label={t.dOnb} value={inp.direct.onboarding} onChange={(n) => setDirect({ onboarding: n })} suffix="Kč" step={500} />
                    <NumberField id="dHr" label={t.dHr} value={inp.direct.hrAdministration} onChange={(n) => setDirect({ hrAdministration: n })} suffix="Kč" step={100} />
                    <NumberField id="dPay" label={t.dPay} value={inp.direct.payrollProcessing} onChange={(n) => setDirect({ payrollProcessing: n })} suffix="Kč" step={100} />
                    <NumberField id="dAcc" label={t.dAcc} value={inp.direct.accommodation} onChange={(n) => setDirect({ accommodation: n })} suffix="Kč" step={500} />
                    <NumberField id="dTrans" label={t.dTrans} value={inp.direct.transport} onChange={(n) => setDirect({ transport: n })} suffix="Kč" step={500} />
                    <NumberField id="dMed" label={t.dMed} value={inp.direct.medicalExam} onChange={(n) => setDirect({ medicalExam: n })} suffix="Kč" step={100} />
                    <NumberField id="dTrain" label={t.dTrain} value={inp.direct.training} onChange={(n) => setDirect({ training: n })} suffix="Kč" step={500} />
                    <NumberField id="dTurn" label={t.dTurn} value={inp.direct.turnoverReplacementCost} onChange={(n) => setDirect({ turnoverReplacementCost: n })} suffix="Kč" step={500} hint={t.dTurnHint} />
                  </div>
                </fieldset>
              )}

              <fieldset className="pcalc-fieldset">
                <legend>{t.legWorkers}</legend>
                <div className="pcalc-presets">
                  {WORKER_PRESETS.map((n) => (
                    <button key={n} type="button" className={`pcalc-preset ${inp.workerCount === n ? 'is-active' : ''}`} onClick={() => setInp((p) => ({ ...p, workerCount: n }))}>
                      {n}
                    </button>
                  ))}
                </div>
                <NumberField id="workers" label={t.workersCustom} value={inp.workerCount} onChange={(n) => setInp((p) => ({ ...p, workerCount: Math.max(1, Math.round(n)) }))} min={1} />
              </fieldset>
            </div>

            {/* ── Results ── */}
            <div className="pcalc__results" aria-live="polite">
              <h2 className="pcalc-results__title">{t.resultsTitle}</h2>

              {result.warnings.length > 0 && (
                <ul className="pcalc-warnings" role="status">
                  {result.warnings.slice(0, 6).map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              )}

              {employee && employer && primary ? (
                <>
                  <div className="pcalc-cards">
                    <div className="pcalc-card"><span className="pcalc-card__label">{t.cGross}</span><span className="pcalc-card__value"><Money value={employee.gross.grossWage} /></span></div>
                    <div className="pcalc-card pcalc-card--accent"><span className="pcalc-card__label">{t.cNet}</span><span className="pcalc-card__value"><Money value={employee.netWage} /></span></div>
                    <div className="pcalc-card"><span className="pcalc-card__label">{t.cEmpDeductions}</span><span className="pcalc-card__value"><Money value={employee.contributions.total} /></span></div>
                    <div className="pcalc-card"><span className="pcalc-card__label">{t.cErStatutory}</span><span className="pcalc-card__value"><Money value={employer.statutoryTotal} /></span></div>
                    <div className="pcalc-card"><span className="pcalc-card__label">{t.cAgencyFee}</span><span className="pcalc-card__value">{agency ? <Money value={agency.serviceFee} /> : '—'}</span></div>
                    <div className="pcalc-card pcalc-card--total"><span className="pcalc-card__label">{t.cTotalEconomic}</span><span className="pcalc-card__value"><Money value={primary.totalEconomicCost} /></span></div>
                    <div className="pcalc-card"><span className="pcalc-card__label">{t.cPerHour}</span><span className="pcalc-card__value"><Money value={primary.effectiveHourly.costPerWorkedHour} /></span></div>
                    <div className="pcalc-card"><span className="pcalc-card__label">{t.cVsDirect}</span><span className="pcalc-card__value">{comparison ? (<><Money value={comparison.differenceCzk} />{diffPct != null ? ` (${formatPercent(Math.round(diffPct * 10) / 10)})` : ''}</>) : '—'}</span></div>
                  </div>

                  <div className="pcalc-actions">
                    <button type="button" className="btn btn-sm btn-outline-white" onClick={reset}>{t.aReset}</button>
                    <button type="button" className="btn btn-sm btn-outline-white" onClick={doPrint}>{t.aPrint}</button>
                    <button type="button" className="btn btn-sm btn-outline-white" onClick={copySummary}>{t.aCopySummary}</button>
                    <button type="button" className="btn btn-sm btn-outline-white" onClick={copyLink}>{t.aCopyLink}</button>
                    {comparison ? (<button type="button" className="btn btn-sm btn-outline-white" onClick={downloadCsv}>{t.aExportCsv}</button>) : null}
                  </div>

                  <h3 className="pcalc-sub">{t.subNet}</h3>
                  <div className="pcalc-lines">
                    {employee.lines.map((l) => (
                      <LineRow key={l.key} line={l} />
                    ))}
                  </div>

                  <h3 className="pcalc-sub">{t.subEmployer}</h3>
                  <div className="pcalc-lines">
                    {employer.lines.map((l) => (
                      <LineRow key={l.key} line={l} />
                    ))}
                  </div>

                  {agency ? (
                    <>
                      <h3 className="pcalc-sub">{t.subAgencyInvoice}</h3>
                      <div className="pcalc-lines">
                        {agency.lines.map((l) => (
                          <LineRow key={l.key} line={l} />
                        ))}
                      </div>
                    </>
                  ) : null}

                  {comparison ? (
                    <>
                      <h3 className="pcalc-sub">{t.subComparison}</h3>
                      <div className="pcalc-table-wrap">
                        <table className="pcalc-table">
                          <caption className="pcalc-visually-hidden">{t.subComparison}</caption>
                          <thead>
                            <tr>
                              <th scope="col">{t.thItem}</th>
                              <th scope="col">{t.thAgency}</th>
                              <th scope="col">{t.thDirect}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparison.rows.map((r) => (
                              <tr key={r.key} className={r.kind === 'summary' ? 'is-summary' : ''}>
                                <th scope="row">{r.labelCs}</th>
                                <td><Money value={r.agency} /></td>
                                <td><Money value={r.direct} /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="pcalc-diff" role="note">
                        <span className="pcalc-diff__label">{av.diffLabel}</span>
                        <strong className="pcalc-diff__state">{diffState}</strong>
                        <p className="pcalc-diff__note">{av.diffNote}</p>
                      </div>
                    </>
                  ) : null}

                  <h3 className="pcalc-sub">{t.subScenario.replace('{n}', String(inp.workerCount))}</h3>
                  <div className="pcalc-scenario">
                    <div><span>{t.scWorker1}</span><strong><Money value={primary.scenario.economicCost.perWorker} /></strong></div>
                    <div><span>{t.scWorkersMonth.replace('{n}', String(inp.workerCount))}</span><strong><Money value={primary.scenario.economicCost.allWorkers} /></strong></div>
                    <div><span>{t.scWorkersYear.replace('{n}', String(inp.workerCount))}</span><strong><Money value={primary.scenario.economicCost.annualizedAllWorkers} /></strong></div>
                  </div>
                  <p className="pcalc-note">{t.scenarioNote}</p>
                </>
              ) : (
                <p className="pcalc-warning-box">{t.invalid}</p>
              )}
            </div>
          </div>

          <p className="pcalc-disclaimer">{t.disclaimer.replace('{d}', LAST_VERIFIED)}</p>
        </div>
      </main>

      {/* Agency value: responsibility matrix + benefits (agency / comparison modes) */}
      {(inp.mode === 'agency' || inp.mode === 'comparison') && (
        <section className="section" id="odpovednosti" lang={lang}>
          <div className="container">
            <ResponsibilityMatrix />
            <div className="agv-benefits">
              <h3 className="agv-benefits__title">{av.benefitsTitle}</h3>
              <ul className="agv-benefits__list">
                {av.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <p className="agv-benefits__note">{av.benefitsNote}</p>
            </div>
            <p className="pcalc-note pcalc-center">{av.context}</p>
          </div>
        </section>
      )}

      {/* SSR explanatory content */}
      <section className="section section--alt" lang="cs">
        <article className="container article-content">
          <ArticleLanguageNotice />
          {CONTENT.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {s.bullets ? (
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <h2>Nejčastější dotazy</h2>
          <div className="pcalc-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>

          <h2>Zdroje a právní základ (2026)</h2>
          <ul className="pcalc-sources">
            {PAYROLL_SOURCES.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.authority}: {s.title}
                </a>{' '}
                — {s.legalBasis}
              </li>
            ))}
          </ul>
          <p className="pcalc-note">
            Pravidla ČR 2026, ověřeno {LAST_VERIFIED}. Nevyřešené hodnoty (např. sazba zákonného
            pojištění úrazu podle oboru) nejsou zahrnuty do výchozího výpočtu a jsou označeny jako
            volitelné. Rule year: {CZ_2026.taxYear}.
          </p>

          <nav className="internal-links" aria-label="Související stránky">
            <h2>Související</h2>
            <ul>
              {INTERNAL_LINKS.filter((l) => l.href !== PAGE_PATH).map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </section>

      {/* Employer CTA */}
      <section className="section" lang={lang}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{t.ctaEyebrow}</div>
            <h2>{t.ctaHeading}</h2>
            <p>{t.ctaBody}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="/submit-offer" className="btn btn-primary btn-lg">
              {t.ctaRequest}
            </a>{' '}
            <a href="/contact" className="btn btn-ghost btn-lg">
              {t.ctaConsult}
            </a>
          </div>
          <p className="pcalc-note pcalc-center">{t.ctaNote}</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
