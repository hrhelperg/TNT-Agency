import { describe, it, expect } from 'vitest';
import { calculateDeEmployerCost, type DeEmployerCostInput } from './engine';
import { DE_RULES_2026 as R } from '../../../data/calculators/de-employer-cost/2026/rules';

const eur = (v: number) => BigInt(Math.round(v * 100));
const money = (c: bigint) => (Number(c) / 100).toFixed(2);

const base: DeEmployerCostInput = {
  monthlyGrossCent: eur(4000),
  steuerklasse: 1,
  kinderfreibetraege: '0',
  workplace: 'NW',
  churchTaxLiable: false,
  healthSupplementPercent: '2.9',
  reducedHealthRate: false,
  care: { childrenUnder25: 0, isParent: false, atLeast23: true },
  employer: {
    u1Percent: '1.6',
    u2Percent: '0.24',
    owesInsolvencyLevy: true,
    accidentMonthlyCent: eur(30),
  },
};

const ok = (i: Partial<DeEmployerCostInput> = {}) => {
  const r = calculateDeEmployerCost({ ...base, ...i });
  if (r.supported === false) {
    throw new Error(r.reason === 'invalid' ? `invalid: ${r.issues.map((i) => i.key).join(', ')}` : `refused: ${r.case.id}`);
  }
  return r;
};

describe('the ledger', () => {
  it('employer cost is gross plus the employer side, and nothing withheld from the employee', () => {
    const r = ok();
    expect(r.employer.totalMonthlyCent).toBe(
      r.monthlyGrossCent + r.employer.contributionsCent + r.employer.levyCent,
    );
    // The withheld items must not appear in employer cost. If they did, the
    // load factor would be near 1,6 rather than near 1,2.
    expect(Number(r.employer.loadFactor)).toBeGreaterThan(1.15);
    expect(Number(r.employer.loadFactor)).toBeLessThan(1.35);
  });

  it('net plus every deduction equals gross, to the cent', () => {
    for (const gross of [2001, 2500, 4000, 6000, 9000, 25_000]) {
      const r = ok({ monthlyGrossCent: eur(gross) });
      expect(r.employee.netCent + r.employee.totalDeductionsCent).toBe(r.monthlyGrossCent);
      expect(r.employee.totalDeductionsCent).toBe(
        r.employee.socialCent +
          r.employee.lohnsteuerCent +
          r.employee.soliCent +
          r.employee.churchTaxCent,
      );
    }
  });

  it('the annual figure is twelve identical months, not an annualised calculation', () => {
    const r = ok();
    expect(r.employer.totalAnnualCent).toBe(r.employer.totalMonthlyCent * 12n);
  });

  it('never returns a negative net for any supported gross', () => {
    for (let g = 2001; g <= 30_000; g += 137) {
      const r = ok({ monthlyGrossCent: eur(g) });
      expect(r.employee.netCent, `gross ${g}`).toBeGreaterThan(0n);
    }
  });

  it('net rises monotonically with gross', () => {
    // A break in monotonicity means a ceiling or a threshold is applied the
    // wrong way round — the sort of defect that hides between round numbers.
    let previous = -1n;
    for (let g = 2001; g <= 12_000; g += 13) {
      const r = ok({ monthlyGrossCent: eur(g) });
      expect(r.employee.netCent > previous, `net fell at ${g}`).toBe(true);
      previous = r.employee.netCent;
    }
  });
});

describe('scope, failing closed', () => {
  it('refuses a Minijob', () => {
    const r = calculateDeEmployerCost({ ...base, monthlyGrossCent: eur(600) });
    expect(r.supported).toBe(false);
    if (r.supported === false && r.reason === 'unsupported') expect(r.case.id).toBe('minijob');
  });

  it('refuses exactly at the Geringfügigkeitsgrenze', () => {
    const r = calculateDeEmployerCost({ ...base, monthlyGrossCent: R.scope.minijobMonthlyCent.value });
    expect(r.supported).toBe(false);
  });

  it('refuses the Übergangsbereich up to and INCLUDING 2 000,00 EUR', () => {
    // § 20 Absatz 2 SGB IV: "2 000 Euro monatlich nicht übersteigt". The cent
    // either side of this is the whole test.
    const at = calculateDeEmployerCost({ ...base, monthlyGrossCent: eur(2000) });
    expect(at.supported).toBe(false);
    if (at.supported === false && at.reason === 'unsupported') expect(at.case.id).toBe('uebergangsbereich');

    const above = calculateDeEmployerCost({ ...base, monthlyGrossCent: eur(2000) + 1n });
    expect(above.supported).toBe(true);
  });

  it('refuses a declared case regardless of the gross', () => {
    const r = calculateDeEmployerCost({ ...base, declared: ['pkv'] });
    expect(r.supported).toBe(false);
    if (r.supported === false && r.reason === 'unsupported') expect(r.case.id).toBe('pkv');
  });

  it('rejects declaring a case that is supposed to be detected', () => {
    expect(() => calculateDeEmployerCost({ ...base, declared: ['minijob'] })).toThrow(/detected/);
  });
});

describe('the Bundesland changes two different things', () => {
  it('Saxony shifts the care split without changing employer cost by the whole point', () => {
    const nw = ok({ workplace: 'NW' });
    const sn = ok({ workplace: 'SN' });
    const nwCare = nw.contributions.find((c) => c.key === 'care')!;
    const snCare = sn.contributions.find((c) => c.key === 'care')!;
    expect(snCare.employerCent).toBeLessThan(nwCare.employerCent);
    expect(snCare.employeeCent).toBeGreaterThan(nwCare.employeeCent);
    // Total unchanged: the point moved, it was not added.
    expect(snCare.employerCent + snCare.employeeCent).toBe(
      nwCare.employerCent + nwCare.employeeCent,
    );
  });

  it('church tax is 8 % in Bavaria and 9 % in Hesse, by workplace', () => {
    const by = ok({ workplace: 'BY', churchTaxLiable: true });
    const he = ok({ workplace: 'HE', churchTaxLiable: true });
    expect(by.churchTax.ratePercent).toBe('8');
    expect(he.churchTax.ratePercent).toBe('9');
    expect(by.churchTax.amountCent).toBeLessThan(he.churchTax.amountCent);
  });

  it('church tax reduces net but never employer cost', () => {
    const without = ok({ churchTaxLiable: false });
    const with_ = ok({ churchTaxLiable: true });
    expect(with_.employee.netCent).toBeLessThan(without.employee.netCent);
    expect(with_.employer.totalMonthlyCent).toBe(without.employer.totalMonthlyCent);
  });

  it('flags the unmodelled Kappung everywhere except Bavaria', () => {
    expect(ok({ workplace: 'BY', churchTaxLiable: true }).notes.map((n) => n.key)).not.toContain(
      'kirchensteuer.kappung',
    );
    expect(ok({ workplace: 'HE', churchTaxLiable: true }).notes.map((n) => n.key)).toContain(
      'kirchensteuer.kappung',
    );
  });
});

describe('children reach both the contribution and the tax', () => {
  it('a second child lowers the employee’s care share but not the employer’s', () => {
    const one = ok({ care: { childrenUnder25: 1, isParent: true, atLeast23: true } });
    const two = ok({ care: { childrenUnder25: 2, isParent: true, atLeast23: true } });
    const c1 = one.contributions.find((c) => c.key === 'care')!;
    const c2 = two.contributions.find((c) => c.key === 'care')!;
    expect(c2.employeeCent).toBeLessThan(c1.employeeCent);
    expect(c2.employerCent).toBe(c1.employerCent);
  });

  it('being childless costs the employee 0,6 points and the employer nothing', () => {
    const childless = ok({ care: { childrenUnder25: 0, isParent: false, atLeast23: true } });
    const parent = ok({ care: { childrenUnder25: 1, isParent: true, atLeast23: true } });
    const a = childless.contributions.find((c) => c.key === 'care')!;
    const b = parent.contributions.find((c) => c.key === 'care')!;
    expect(a.employerCent).toBe(b.employerCent);
    expect(a.employeeCent).toBeGreaterThan(b.employeeCent);
  });

  it('the Kinderfreibetrag lowers church tax without lowering the Lohnsteuer', () => {
    const none = ok({ churchTaxLiable: true, kinderfreibetraege: '0' });
    const two = ok({ churchTaxLiable: true, kinderfreibetraege: '2' });
    expect(two.employee.lohnsteuerCent).toBe(none.employee.lohnsteuerCent);
    expect(two.employee.churchTaxCent).toBeLessThan(none.employee.churchTaxCent);
  });
});

describe('employer-side options', () => {
  it('an employer over 30 staff pays no U1 and is told why', () => {
    const small = ok();
    const large = ok({ employer: { ...base.employer, u1Percent: null } });
    expect(large.employer.levyCent).toBeLessThan(small.employer.levyCent);
    expect(large.notes.map((n) => n.key)).toContain('u1.notApplicable');
    expect(large.contributions.map((c) => c.key)).not.toContain('u1');
  });

  it('a missing accident-insurance figure is a warning, not a silent zero', () => {
    const r = ok({ employer: { ...base.employer, accidentMonthlyCent: 0n } });
    const note = r.notes.find((n) => n.key === 'accident.absent');
    expect(note?.severity).toBe('warning');
  });

  it('an exempt employer owes no insolvency levy', () => {
    const r = ok({ employer: { ...base.employer, owesInsolvencyLevy: false } });
    expect(r.contributions.map((c) => c.key)).not.toContain('insolvencyLevy');
  });
});

describe('above the ceilings', () => {
  it('employer cost keeps rising with gross even where contributions stop', () => {
    // The contributions plateau; the gross does not. A calculator that caps the
    // TOTAL instead of the BASE would flatten here.
    const a = ok({ monthlyGrossCent: eur(9000) });
    const b = ok({ monthlyGrossCent: eur(12_000) });
    expect(b.employer.totalMonthlyCent - a.employer.totalMonthlyCent).toBe(eur(3000));
    expect(b.employer.contributionsCent).toBe(a.employer.contributionsCent);
  });

  it('the load factor falls as gross rises past the ceilings', () => {
    const low = Number(ok({ monthlyGrossCent: eur(2500) }).employer.loadFactor);
    const high = Number(ok({ monthlyGrossCent: eur(20_000) }).employer.loadFactor);
    expect(high).toBeLessThan(low);
  });
});
