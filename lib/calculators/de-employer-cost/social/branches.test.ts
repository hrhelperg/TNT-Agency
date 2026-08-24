import { describe, it, expect } from 'vitest';
import { pension, unemployment, health, care, insolvencyLevy, aagLevy, accidentInsurance } from './branches';
import { splitEqually, share, assessmentBase } from './bvv';
import { DE_RULES_2026 as R } from '../../../../data/calculators/de-employer-cost/2026/rules';

const eur = (v: number) => BigInt(Math.round(v * 100));
const money = (c: bigint) => (Number(c) / 100).toFixed(2);

describe('§ 2 Absatz 1 BVV — half the rate, round, then double', () => {
  it('differs from computing the whole rate and halving it', () => {
    // The demonstration, on an ordinary salary. Half-then-double gives
    // 279,00465 → 279,00 → 558,00; whole-then-halve gives 558,0093 → 558,01.
    const base = eur(3000.05);
    const r = splitEqually(base, '18.6');
    expect(money(r.employerCent)).toBe('279.00');
    expect(money(r.employerCent + r.employeeCent)).toBe('558.00');
    expect(money(share(base, '18.6'))).toBe('558.01');
  });

  it('rounds on the third decimal, upward from five', () => {
    // § 1 Absatz 2 BVV. 0,005 exactly must go up.
    expect(money(share(eur(100), '2.5'))).toBe('2.50');
    expect(money(share(BigInt(1000), '0.5'))).toBe('0.05'); // 10,00 × 0,5 % = 0,05
    expect(money(share(eur(3.7), '0.15'))).toBe('0.01'); // 0,00555 → 0,01
    expect(money(share(eur(3.0), '0.15'))).toBe('0.00'); // 0,0045 → 0,00
  });
});

describe('ceilings cap the base and nothing else', () => {
  it('caps each branch at its own monthly Beitragsbemessungsgrenze', () => {
    const rich = eur(20_000);
    expect(pension(rich).baseCent).toBe(R.pension.monthlyCeilingCent.value);
    expect(unemployment(rich).baseCent).toBe(R.unemployment.monthlyCeilingCent.value);
    expect(health(rich, { supplementPercent: '2.9', reducedRate: false }).baseCent).toBe(
      R.health.monthlyCeilingCent.value,
    );
  });

  it('health and pension have DIFFERENT ceilings', () => {
    // 5 812,50 against 8 450,00. Using one for both is the single most common
    // way to get German employer cost wrong.
    expect(R.health.monthlyCeilingCent.value).not.toBe(R.pension.monthlyCeilingCent.value);
    expect(money(R.health.monthlyCeilingCent.value)).toBe('5812.50');
    expect(money(R.pension.monthlyCeilingCent.value)).toBe('8450.00');
  });

  it('the health ceiling is NOT the Jahresarbeitsentgeltgrenze', () => {
    // 69 750 against 77 400 — 7 650 EUR a year apart. Both are "the health
    // insurance threshold" in ordinary speech and they answer different
    // questions.
    expect(money(R.scope.insuranceObligationAnnualCent.value)).toBe('77400.00');
    expect(R.health.monthlyCeilingCent.value * 12n).toBe(eur(69_750));
  });

  it('above the ceiling the marginal contribution is zero for both sides', () => {
    const a = pension(R.pension.monthlyCeilingCent.value);
    const b = pension(R.pension.monthlyCeilingCent.value + eur(5000));
    expect(b.employerCent).toBe(a.employerCent);
    expect(b.employeeCent).toBe(a.employeeCent);
  });

  it('assessmentBase refuses negative pay rather than returning zero', () => {
    expect(() => assessmentBase(-1n, 100n)).toThrow(/negative/);
  });
});

/**
 * The Pflegeversicherung rate table, against the figures the Krankenkassen
 * publish. This is the cross-check that matters most in this module: the
 * statute reads as though the child discounts reduce the whole rate, and the
 * published tables show they do not.
 */
describe('Pflegeversicherung reproduces the published rate table', () => {
  const rates = (children: number, opts: { saxony?: boolean; childless?: boolean } = {}) => {
    const l = care(eur(10_000), {
      childrenUnder25: children,
      isParent: !opts.childless,
      atLeast23: true,
      saxony: opts.saxony ?? false,
    });
    return [l.employerRatePercent, l.employeeRatePercent];
  };

  it('matches employer 1,8 % and the employee ladder outside Saxony', () => {
    expect(rates(0, { childless: true })).toEqual(['1.8', '2.4']);
    expect(rates(1)).toEqual(['1.8', '1.8']);
    expect(rates(2)).toEqual(['1.8', '1.55']);
    expect(rates(3)).toEqual(['1.8', '1.30']);
    expect(rates(4)).toEqual(['1.8', '1.05']);
    expect(rates(5)).toEqual(['1.8', '0.80']);
  });

  it('stops discounting after the fifth child', () => {
    expect(rates(6)).toEqual(rates(5));
    expect(rates(12)).toEqual(rates(5));
  });

  it('Saxony moves half a point across without changing the total', () => {
    expect(rates(1, { saxony: true })).toEqual(['1.3', '2.3']);
    expect(rates(0, { saxony: true, childless: true })).toEqual(['1.3', '2.9']);
    // Same total as outside Saxony, in both family situations.
    const [eR, nR] = rates(1, { saxony: true });
    expect(Number(eR) + Number(nR)).toBeCloseTo(3.6, 10);
  });

  it('a parent whose children are all over 25 pays the plain half, not the surcharge', () => {
    // isParent survives the children; childrenUnder25 does not. Treating a
    // 60-year-old parent of grown children as childless would add 0,6 points.
    expect(rates(0)).toEqual(['1.8', '1.8']);
  });

  it('an employee under 23 without children pays no surcharge', () => {
    const l = care(eur(3000), { childrenUnder25: 0, isParent: false, atLeast23: false, saxony: false });
    expect(l.employeeRatePercent).toBe('1.8');
  });

  it('the employee share never goes negative', () => {
    const l = care(eur(3000), { childrenUnder25: 99, isParent: true, atLeast23: true, saxony: false });
    expect(Number(l.employeeRatePercent)).toBeGreaterThan(0);
  });
});

describe('a worked month: 3 000,00 EUR, one child, Zusatzbeitrag 2,90 %', () => {
  const gross = eur(3000);
  const lines = [
    pension(gross),
    unemployment(gross),
    health(gross, { supplementPercent: '2.9', reducedRate: false }),
    care(gross, { childrenUnder25: 1, isParent: true, atLeast23: true, saxony: false }),
    insolvencyLevy(gross),
  ];

  it('produces the expected shares branch by branch', () => {
    expect(lines.map((l) => [l.key, money(l.employerCent), money(l.employeeCent)])).toEqual([
      ['pension', '279.00', '279.00'],
      ['unemployment', '39.00', '39.00'],
      ['health', '262.50', '262.50'],
      ['care', '54.00', '54.00'],
      ['insolvencyLevy', '4.50', '0.00'],
    ]);
  });

  it('totals to the published Gesamtsozialversicherungsbeitrag', () => {
    // 42,30 % of pay across the four branches, per the GKV-Spitzenverband
    // Rechengrößen 2026 — split 21,15 % each way when the employee has one
    // child and the Zusatzbeitrag is the average.
    const four = lines.filter((l) => l.key !== 'insolvencyLevy');
    const employer = four.reduce((a, l) => a + l.employerCent, 0n);
    const employee = four.reduce((a, l) => a + l.employeeCent, 0n);
    expect(money(employer)).toBe('634.50');
    expect(money(employee)).toBe('634.50');
    expect(money(employer + employee)).toBe('1269.00');
    expect(Number(money(employer + employee)) / 3000).toBeCloseTo(0.423, 10);
  });
});

describe('the levies the employer carries alone', () => {
  it('U1 and U2 take a caller-supplied rate, because no statutory one exists', () => {
    const u1 = aagLevy('u1', eur(3000), '1.6');
    expect(money(u1.employerCent)).toBe('48.00');
    expect(u1.employeeCent).toBe(0n);
    const u2 = aagLevy('u2', eur(3000), '0.24');
    expect(money(u2.employerCent)).toBe('7.20');
  });

  it('accident insurance is an amount, not a rate', () => {
    const a = accidentInsurance(eur(31.5));
    expect(money(a.employerCent)).toBe('31.50');
    expect(a.employerRatePercent).toBe('0');
    expect(a.baseCent).toBe(0n);
    expect(() => accidentInsurance(-1n)).toThrow(/negative/);
  });

  it('the insolvency levy uses the pension ceiling, not the health one', () => {
    const l = insolvencyLevy(eur(20_000));
    expect(l.baseCent).toBe(R.pension.monthlyCeilingCent.value);
  });
});

describe('the reduced health rate', () => {
  it('is 0,6 points below the general one and is not the default', () => {
    const g = health(eur(3000), { supplementPercent: '2.9', reducedRate: false });
    const r = health(eur(3000), { supplementPercent: '2.9', reducedRate: true });
    expect(Number(g.employeeRatePercent) - Number(r.employeeRatePercent)).toBeCloseTo(0.3, 10);
  });

  it('is not the 14 % the Programmablaufplan uses for the Vorsorgepauschale', () => {
    // Same number, different job. The PAP's 7 % half-rate sizes a notional tax
    // deduction; § 243 SGB V's 14 % is a real contribution rate for members
    // with no Krankengeld entitlement. An engine that used the PAP's figure for
    // the contribution would understate the ordinary employee by 0,3 points.
    expect(R.health.reducedPercent.value).toBe('14.0');
    expect(R.health.generalPercent.value).toBe('14.6');
  });
});
