import { describe, it, expect } from 'vitest';
import { EN_CONTENT } from '../../locale/content/en';
import { DE_CONTENT } from '../../locale/content/de';
import { KALKULACKA_NAKLADU_ZAMESTNAVATELE_NEMECKO as CS } from '../../content/pages/germany-employer-cost-calculator';
import { DE_RULES_2026 as R } from '../../../data/calculators/de-employer-cost/2026/rules';
import { calculateDeEmployerCost, type DeEmployerCostInput } from './engine';

/**
 * The prose must agree with the engine.
 *
 * A page that explains a calculator and quotes a figure it does not produce is
 * worse than one that quotes nothing: the reader has two authorities and no way
 * to tell which is stale. Both drift silently — the prose because nothing
 * recomputes it, the engine because nobody rereads the prose.
 *
 * This was not hypothetical. All three pages quoted "about 4 862 EUR" of
 * employer cost at 4 000 EUR gross. The engine gives 4 852,00. The missing
 * 9,60 was a U2 levy at 0,24 % — a rate every one of these pages says has no
 * general value and must be supplied by the employer. The prose had quietly
 * assumed one.
 */

const eur = (v: number) => BigInt(Math.round(v * 100));
const money = (c: bigint) => (Number(c) / 100).toFixed(2);

interface ProseLike {
  readonly title: string;
  readonly description: string;
  readonly h1: string;
  readonly intro: string;
  readonly sections: readonly {
    readonly heading: string;
    readonly body: readonly string[];
    readonly list?: { readonly items: readonly string[] };
  }[];
}

const text = (e: ProseLike) =>
  [
    e.title,
    e.description,
    e.h1,
    e.intro,
    ...e.sections.flatMap((s) => [s.heading, ...s.body, ...(s.list?.items ?? [])]),
  ].join('\n');

const EN = text(EN_CONTENT['germany-employer-cost-calculator'].en!);
const DE = text(DE_CONTENT['germany-employer-cost-calculator'].de!);
const CZ = [
  CS.title, CS.heroSubtitle, CS.description, CS.intro,
  ...CS.sections.flatMap((s) => [s.heading, ...s.body, ...((s as { bullets?: string[] }).bullets ?? [])]),
  ...CS.faq.flatMap((f) => [f.q, f.a]),
].join('\n');

const PAGES: Array<[string, string]> = [['en', EN], ['de', DE], ['cs', CZ]];

/** "4 852,00" / "4,852.00" / "4.852,00" all mean the same amount. */
const anyGrouping = (n: string) => new RegExp(n.split('').join('[.,\\s]?'));

describe('the worked example matches the engine', () => {
  const WORKED: DeEmployerCostInput = {
    monthlyGrossCent: eur(4000),
    steuerklasse: 1,
    kinderfreibetraege: '0',
    workplace: 'NW',
    churchTaxLiable: false,
    healthSupplementPercent: R.health.averageSupplementPercent.value,
    reducedHealthRate: false,
    care: { childrenUnder25: 0, isParent: false, atLeast23: true },
    // The four branches plus the insolvency levy, and nothing whose rate the
    // page says it cannot know.
    employer: { u1Percent: null, u2Percent: '0', owesInsolvencyLevy: true, accidentMonthlyCent: 0n },
  };

  const r = calculateDeEmployerCost(WORKED);
  if (r.supported !== true) throw new Error('the worked example does not calculate');

  it('produces exactly the figure every page quotes', () => {
    expect(money(r.employer.totalMonthlyCent)).toBe('4852.00');
    for (const [locale, page] of PAGES) {
      expect(anyGrouping('4852').test(page.replace(/[.,]00/g, '')), `${locale} does not quote 4 852`).toBe(true);
    }
  });

  it('produces the load factor every page quotes', () => {
    expect(r.employer.loadFactor.slice(0, 4)).toBe('1.21');
    for (const [locale, page] of PAGES) {
      expect(/1[.,]21/.test(page), `${locale} does not quote the 1,21 factor`).toBe(true);
    }
  });

  it('produces the employer contribution share every page describes as “about 21 %”', () => {
    const share = (Number(r.employer.contributionsCent) / Number(r.monthlyGrossCent)) * 100;
    expect(share).toBeGreaterThan(20.5);
    expect(share).toBeLessThan(21.5);
    for (const [locale, page] of PAGES) {
      expect(/21 ?%/.test(page), `${locale} does not describe the ~21 % share`).toBe(true);
    }
  });
});

describe('every rate and threshold the prose states is the one the registry holds', () => {
  const FACTS: Array<[string, RegExp]> = [
    ['KV/PV monthly ceiling 5 812,50', /5[.,\s]?812[.,]50/],
    ['RV monthly ceiling 8 450', /8[.,\s]?450/],
    ['Jahresarbeitsentgeltgrenze 77 400', /77[.,\s]?400/],
    ['Geringfügigkeitsgrenze 603', /\b603\b/],
    ['Übergangsbereich 2 000', /2[.,\s]?000/],
    ['RV 18,6 %', /18[.,]6/],
    ['AV 2,6 %', /2[.,]6/],
    ['KV 14,6 %', /14[.,]6/],
    ['PV 3,6 %', /3[.,]6/],
    ['childless surcharge 0,6', /0[.,]6/],
    ['child discount 0,25', /0[.,]25/],
    ['insolvency levy 0,15 %', /0[.,]15/],
    ['average supplement 2,9 %', /2[.,]9/],
  ];

  for (const [label, re] of FACTS) {
    it(`${label} appears on all three pages`, () => {
      for (const [locale, page] of PAGES) {
        expect(re.test(page), `${locale} does not state ${label}`).toBe(true);
      }
    });
  }

  it('the registry still holds those values, so the patterns above mean something', () => {
    expect((Number(R.health.monthlyCeilingCent.value) / 100).toFixed(2)).toBe('5812.50');
    expect((Number(R.pension.monthlyCeilingCent.value) / 100).toFixed(2)).toBe('8450.00');
    expect((Number(R.scope.insuranceObligationAnnualCent.value) / 100).toFixed(2)).toBe('77400.00');
    expect((Number(R.scope.minijobMonthlyCent.value) / 100).toFixed(2)).toBe('603.00');
    expect((Number(R.scope.transitionUpperMonthlyCent.value) / 100).toFixed(2)).toBe('2000.00');
    expect(R.pension.totalPercent.value).toBe('18.6');
    expect(R.unemployment.totalPercent.value).toBe('2.6');
    expect(R.health.generalPercent.value).toBe('14.6');
    expect(R.care.basePercent.value).toBe('3.6');
    expect(R.care.childlessSurchargePercent.value).toBe('0.6');
    expect(R.care.perChildDiscountPercent.value).toBe('0.25');
    expect(R.insolvencyLevy.percent.value).toBe('0.15');
    expect(R.health.averageSupplementPercent.value).toBe('2.9');
  });
});

describe('the three languages are translations, not copies', () => {
  it('no two pages are the same text', () => {
    expect(EN).not.toBe(DE);
    expect(EN).not.toBe(CZ);
    expect(DE).not.toBe(CZ);
  });

  it('the German page names Germany and never claims to be about Czechia', () => {
    expect(/Deutschland/.test(DE)).toBe(true);
    expect(/tschechisch|Tschechien/i.test(DE), 'the German page mentions Czechia').toBe(false);
  });

  it('the Czech and English pages say plainly which country this is', () => {
    expect(/Německo|německ/i.test(CZ)).toBe(true);
    expect(/German/.test(EN)).toBe(true);
  });
});
