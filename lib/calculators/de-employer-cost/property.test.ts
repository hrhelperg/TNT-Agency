import { describe, it, expect } from 'vitest';
import { calculateDeEmployerCost, type DeEmployerCostInput } from './engine';
import { DE_RULES_2026 as R } from '../../../data/calculators/de-employer-cost/2026/rules';
import type { Bundesland } from './tax/church-tax';

/**
 * §40 — properties that must hold for every input, not just the ones in the
 * golden file.
 *
 * A golden test says "this input gives that output". A property says "whatever
 * the input, this relationship holds", and it is the only kind of test that can
 * fail on a case nobody thought to write down. Both matter: the goldens catch a
 * changed answer, these catch a changed SHAPE — a ceiling applied to the wrong
 * side, a rounding that accumulates, a threshold compared backwards.
 *
 * Deterministic sweeps rather than random generation. The input space here is
 * small enough to walk, and a fixed sweep fails the same way twice, which a
 * seeded generator only does if nobody touches the seed.
 */

const eur = (v: number) => BigInt(Math.round(v * 100));

const BASE: DeEmployerCostInput = {
  monthlyGrossCent: eur(3000),
  steuerklasse: 1,
  kinderfreibetraege: '0',
  workplace: 'NW',
  churchTaxLiable: false,
  healthSupplementPercent: '2.9',
  reducedHealthRate: false,
  care: { childrenUnder25: 0, isParent: false, atLeast23: true },
  employer: { u1Percent: '1.6', u2Percent: '0.24', owesInsolvencyLevy: true, accidentMonthlyCent: eur(25) },
};

const run = (over: Partial<DeEmployerCostInput>) => {
  const r = calculateDeEmployerCost({ ...BASE, ...over });
  if (r.supported === false) {
    throw new Error(r.reason === 'invalid' ? `invalid: ${r.issues.map((i) => i.key).join(', ')}` : `refused: ${r.case.id}`);
  }
  return r;
};

/** Every supported gross from just above the transition band to 30 000 EUR. */
function* grosses(step = 271) {
  for (let e = 2001; e <= 30_000; e += step) yield eur(e);
}

const LAENDER: Bundesland[] = ['NW', 'BY', 'BW', 'SN', 'HH', 'TH'];

describe('the ledger balances, always', () => {
  it('net + deductions = gross for every gross, class and state', () => {
    for (const monthlyGrossCent of grosses()) {
      for (const steuerklasse of [1, 2, 3, 4, 5, 6]) {
        for (const workplace of LAENDER) {
          const r = run({ monthlyGrossCent, steuerklasse, workplace, churchTaxLiable: true });
          expect(
            r.employee.netCent + r.employee.totalDeductionsCent,
            `gross ${monthlyGrossCent} class ${steuerklasse} ${workplace}`,
          ).toBe(monthlyGrossCent);
        }
      }
    }
  });

  it('employer cost = gross + employer contributions + levies, exactly', () => {
    for (const monthlyGrossCent of grosses(163)) {
      const r = run({ monthlyGrossCent });
      expect(r.employer.totalMonthlyCent).toBe(
        monthlyGrossCent + r.employer.contributionsCent + r.employer.levyCent,
      );
    }
  });

  it('the sum of the lines equals the reported totals', () => {
    for (const monthlyGrossCent of grosses(431)) {
      const r = run({ monthlyGrossCent });
      const employer = r.contributions.reduce((a, c) => a + c.employerCent, 0n);
      const employee = r.contributions.reduce((a, c) => a + c.employeeCent, 0n);
      expect(employer).toBe(r.employer.contributionsCent + r.employer.levyCent);
      expect(employee).toBe(r.employee.socialCent);
    }
  });
});

describe('nothing is ever negative, and nothing exceeds its base', () => {
  it('every line is non-negative on both sides', () => {
    for (const monthlyGrossCent of grosses(97)) {
      for (const steuerklasse of [1, 5, 6]) {
        const r = run({ monthlyGrossCent, steuerklasse, churchTaxLiable: true });
        for (const c of r.contributions) {
          expect(c.employerCent >= 0n, `${c.key} employer`).toBe(true);
          expect(c.employeeCent >= 0n, `${c.key} employee`).toBe(true);
        }
        expect(r.employee.lohnsteuerCent >= 0n).toBe(true);
        expect(r.employee.soliCent >= 0n).toBe(true);
        expect(r.employee.churchTaxCent >= 0n).toBe(true);
        expect(r.employee.netCent > 0n).toBe(true);
      }
    }
  });

  it('no contribution exceeds its own assessment base', () => {
    for (const monthlyGrossCent of grosses(211)) {
      const r = run({ monthlyGrossCent });
      for (const c of r.contributions) {
        if (c.baseCent === 0n) continue;
        expect(c.employerCent + c.employeeCent <= c.baseCent, c.key).toBe(true);
      }
    }
  });

  it('total deductions never exceed gross', () => {
    for (const monthlyGrossCent of grosses(89)) {
      for (const steuerklasse of [1, 5, 6]) {
        const r = run({ monthlyGrossCent, steuerklasse, churchTaxLiable: true });
        expect(r.employee.totalDeductionsCent < monthlyGrossCent).toBe(true);
      }
    }
  });
});

describe('monotonicity — more gross is never less of anything', () => {
  it('net, employer cost and each contribution rise or hold as gross rises', () => {
    // A break here means a ceiling or threshold is applied the wrong way round.
    // Fine steps, because the interesting failures hide between round numbers.
    let prevNet = -1n;
    let prevCost = -1n;
    const prevLine = new Map<string, bigint>();
    for (let e = 2001; e <= 15_000; e += 7) {
      const r = run({ monthlyGrossCent: eur(e) });
      expect(r.employee.netCent > prevNet, `net fell at ${e}`).toBe(true);
      expect(r.employer.totalMonthlyCent > prevCost, `cost fell at ${e}`).toBe(true);
      prevNet = r.employee.netCent;
      prevCost = r.employer.totalMonthlyCent;
      for (const c of r.contributions) {
        const before = prevLine.get(c.key) ?? -1n;
        const now = c.employerCent + c.employeeCent;
        expect(now >= before, `${c.key} fell at ${e}`).toBe(true);
        prevLine.set(c.key, now);
      }
    }
  });

  it('the Lohnsteuer never falls as gross rises', () => {
    for (const steuerklasse of [1, 3, 5, 6]) {
      let prev = -1n;
      for (let e = 2001; e <= 20_000; e += 23) {
        const r = run({ monthlyGrossCent: eur(e), steuerklasse });
        expect(r.employee.lohnsteuerCent >= prev, `class ${steuerklasse} fell at ${e}`).toBe(true);
        prev = r.employee.lohnsteuerCent;
      }
    }
  });
});

describe('ceilings behave as ceilings', () => {
  it('above a branch ceiling the contribution is constant', () => {
    const above = (ceiling: bigint) => [ceiling + eur(1), ceiling + eur(1000), ceiling + eur(50_000)];
    for (const gross of above(R.pension.monthlyCeilingCent.value)) {
      const a = run({ monthlyGrossCent: R.pension.monthlyCeilingCent.value });
      const b = run({ monthlyGrossCent: gross });
      for (const key of ['pension', 'unemployment', 'health', 'care', 'insolvencyLevy']) {
        const x = a.contributions.find((c) => c.key === key)!;
        const y = b.contributions.find((c) => c.key === key)!;
        expect(y.employerCent, key).toBe(x.employerCent);
        expect(y.employeeCent, key).toBe(x.employeeCent);
      }
    }
  });

  it('each euro above every ceiling costs the employer exactly one euro', () => {
    const high = R.pension.monthlyCeilingCent.value + eur(2000);
    const a = run({ monthlyGrossCent: high });
    const b = run({ monthlyGrossCent: high + eur(1) });
    // The levies U1/U2/U3 share the pension ceiling, so above it the only
    // marginal cost left is the wage itself.
    expect(b.employer.totalMonthlyCent - a.employer.totalMonthlyCent).toBe(eur(1));
  });

  it('the load factor falls monotonically once past the higher ceiling', () => {
    let prev = Infinity;
    for (let e = 8500; e <= 40_000; e += 250) {
      const f = Number(run({ monthlyGrossCent: eur(e) }).employer.loadFactor);
      expect(f <= prev, `factor rose at ${e}`).toBe(true);
      prev = f;
    }
  });
});

describe('the family and place flags move only what they should', () => {
  it('children never change employer cost', () => {
    for (const monthlyGrossCent of grosses(347)) {
      const costs = new Set<string>();
      for (let kids = 0; kids <= 7; kids++) {
        const r = run({
          monthlyGrossCent,
          care: { childrenUnder25: kids, isParent: kids > 0, atLeast23: true },
        });
        costs.add(r.employer.totalMonthlyCent.toString());
      }
      // Childless adds 0,6 to the EMPLOYEE only; discounts likewise. So the
      // employer figure must be identical across all eight family situations.
      expect(costs.size, `gross ${monthlyGrossCent}`).toBe(1);
    }
  });

  it('church tax never changes employer cost', () => {
    for (const monthlyGrossCent of grosses(233)) {
      for (const workplace of LAENDER) {
        const off = run({ monthlyGrossCent, workplace, churchTaxLiable: false });
        const on = run({ monthlyGrossCent, workplace, churchTaxLiable: true });
        expect(on.employer.totalMonthlyCent).toBe(off.employer.totalMonthlyCent);
        expect(on.employee.netCent <= off.employee.netCent).toBe(true);
      }
    }
  });

  it('Saxony moves the care split across without changing the RATE total', () => {
    // The point moves, it is not added — so the employer share falls and the
    // employee share rises by the same half point.
    //
    // The CASH totals may differ by one cent, and that is the statute rather
    // than a defect. Outside Saxony the split is exactly equal, so § 2 Absatz 1
    // Satz 1 BVV applies: half the rate, rounded, doubled — one rounding, and
    // the total is even. In Saxony the split is unequal, so Satz 3 applies
    // instead: each share is computed at its own rate and rounded in its own
    // right, and two independent roundings need not land where one doubled
    // rounding does. Asserting the cash totals equal would be asserting that
    // the ordinance prescribes one procedure where it prescribes two.
    // A PARENT with one child, so the rate total is the plain 3,6 %. The
    // default input elsewhere in this file is childless, which totals 4,2 % —
    // a different (and equally correct) number that would make the comparison
    // below say nothing about Saxony.
    const family = { childrenUnder25: 1, isParent: true, atLeast23: true };
    for (const monthlyGrossCent of grosses(179)) {
      const nw = run({ monthlyGrossCent, workplace: 'NW', care: family });
      const sn = run({ monthlyGrossCent, workplace: 'SN', care: family });
      const a = nw.contributions.find((c) => c.key === 'care')!;
      const b = sn.contributions.find((c) => c.key === 'care')!;

      expect(Number(a.employerRatePercent) + Number(a.employeeRatePercent)).toBeCloseTo(3.6, 10);
      expect(Number(b.employerRatePercent) + Number(b.employeeRatePercent)).toBeCloseTo(3.6, 10);

      const totalNw = a.employerCent + a.employeeCent;
      const totalSn = b.employerCent + b.employeeCent;
      const drift = totalSn > totalNw ? totalSn - totalNw : totalNw - totalSn;
      expect(drift <= 1n, `care total drifted ${drift} cent at ${monthlyGrossCent}`).toBe(true);

      expect(b.employerCent < a.employerCent).toBe(true);
      expect(b.employeeCent > a.employeeCent).toBe(true);
    }
  });

  it('the childless surcharge sits on top of the Saxon split, not instead of it', () => {
    const childless = { childrenUnder25: 0, isParent: false, atLeast23: true };
    for (const monthlyGrossCent of grosses(311)) {
      for (const [workplace, employer, employee] of [
        ['NW', '1.8', '2.4'],
        ['SN', '1.3', '2.9'],
      ] as const) {
        const c = run({ monthlyGrossCent, workplace, care: childless }).contributions.find(
          (x) => x.key === 'care',
        )!;
        expect(c.employerRatePercent, workplace).toBe(employer);
        expect(c.employeeRatePercent, workplace).toBe(employee);
      }
    }
  });

  it('the Steuerklasse changes tax and nothing else', () => {
    for (const monthlyGrossCent of grosses(293)) {
      const social = new Set<string>();
      const cost = new Set<string>();
      for (const steuerklasse of [1, 2, 3, 4, 5, 6]) {
        const r = run({ monthlyGrossCent, steuerklasse });
        social.add(r.employee.socialCent.toString());
        cost.add(r.employer.totalMonthlyCent.toString());
      }
      expect(social.size).toBe(1);
      expect(cost.size).toBe(1);
    }
  });
});

describe('rates and rounding stay within their stated precision', () => {
  it('the supplementary health rate moves both sides equally', () => {
    for (const supplement of ['0', '0.9', '1.7', '2.9', '3.55', '4.4']) {
      const r = run({ healthSupplementPercent: supplement, monthlyGrossCent: eur(4000) });
      const h = r.contributions.find((c) => c.key === 'health')!;
      expect(h.employerCent, `supplement ${supplement}`).toBe(h.employeeCent);
    }
  });

  it('an equal split never differs by more than nothing between the two sides', () => {
    // Every branch except care is split exactly in half by § 2 Absatz 1 BVV,
    // and the half-then-double rule makes the two sides identical to the cent.
    for (const monthlyGrossCent of grosses(53)) {
      const r = run({ monthlyGrossCent });
      for (const key of ['pension', 'unemployment', 'health']) {
        const c = r.contributions.find((x) => x.key === key)!;
        expect(c.employerCent, `${key} at ${monthlyGrossCent}`).toBe(c.employeeCent);
      }
    }
  });
});
