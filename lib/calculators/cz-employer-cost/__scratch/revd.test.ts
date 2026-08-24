import { describe, it, expect } from 'vitest';
import { calculateHealth, employeeThird } from '../health';
import CZ_2026 from '../jurisdictions/cz/2026';
import { czk, toCzkNumber } from '../../../payroll/money';

const std = { situation: 'standard' as const, applicableDays: 31, daysInMonth: 31 };
const exempt = { situation: 'statutory_exemption' as const, applicableDays: 31, daysInMonth: 31 };

describe('reviewer D', () => {
  it('split identity for every base 0..300000 CZK', () => {
    const bad: number[] = [];
    for (let g = 0; g <= 300000; g++) {
      const r = calculateHealth(czk(g), exempt, CZ_2026);
      const p = Math.ceil(g * 13.5 / 100 - 1e-9);
      if (toCzkNumber(r.employeeOnActual) + toCzkNumber(r.employerOnActual) !== toCzkNumber(r.employee) + toCzkNumber(r.employer)) bad.push(g);
      if (toCzkNumber(r.employee) + toCzkNumber(r.employer) !== p) bad.push(g);
    }
    expect(bad.slice(0,20)).toEqual([]);
  });

  it('premium is one ceil at 13.5, matches independent calc', () => {
    const cases = [22400, 22401, 22402, 22403, 1, 7, 100, 33333, 50000, 146901];
    for (const g of cases) {
      const r = calculateHealth(czk(g), exempt, CZ_2026);
      const exact = g * 135 / 1000;
      const p = Math.ceil(Math.round(exact * 1e6) / 1e6);
      // eslint-disable-next-line no-console
      console.log(g, 'exact', exact, 'premium', toCzkNumber(r.employee)+toCzkNumber(r.employer), 'emp', toCzkNumber(r.employee), 'er', toCzkNumber(r.employer));
      expect(toCzkNumber(r.employee) + toCzkNumber(r.employer)).toBe(p);
    }
  });

  it('naive 9/4.5 differs at 22401', () => {
    const naive = Math.ceil(22401*0.045) + Math.ceil(22401*0.09);
    console.log('naive', naive, 'statutory', Math.ceil(22401*0.135));
  });

  it('employer cost does not rise on standard top-up', () => {
    for (const g of [0, 1000, 10000, 22399, 22400, 5000]) {
      const r = calculateHealth(czk(g), std, CZ_2026);
      const r2 = calculateHealth(czk(g), exempt, CZ_2026);
      console.log('gross', g, 'shortfall', toCzkNumber(r.shortfall), 'topUpEE', toCzkNumber(r.topUpPaidByEmployee), 'topUpER', toCzkNumber(r.topUpPaidByEmployer), 'employer', toCzkNumber(r.employer), 'employerNoMin', toCzkNumber(r2.employer), 'employee', toCzkNumber(r.employee));
      expect(r.employer).toBe(r2.employer);
    }
  });

  it('employer_obstacle moves it', () => {
    const r = calculateHealth(czk(10000), { situation: 'employer_obstacle', applicableDays: 31, daysInMonth: 31 }, CZ_2026);
    console.log('obstacle employer', toCzkNumber(r.employer), 'employee', toCzkNumber(r.employee), 'topUpER', toCzkNumber(r.topUpPaidByEmployer));
  });

  it('no cap at high income', () => {
    const r = calculateHealth(czk(500000), exempt, CZ_2026);
    console.log('500k premium', toCzkNumber(r.employee)+toCzkNumber(r.employer));
    expect(toCzkNumber(r.employee)+toCzkNumber(r.employer)).toBe(67500);
  });

  it('partial month pro rata', () => {
    for (const d of [1, 10, 15, 30, 31]) {
      const r = calculateHealth(czk(5000), { situation: 'partial_month', applicableDays: d, daysInMonth: 31 }, CZ_2026);
      console.log('days', d, 'min', toCzkNumber(r.minimumBase), 'shortfall', toCzkNumber(r.shortfall), 'topUpEE', toCzkNumber(r.topUpPaidByEmployee));
    }
  });

  it('employeeThird', () => {
    for (const p of [3024, 3025, 3026, 3027, 1, 2, 3]) {
      console.log(p, toCzkNumber(employeeThird(czk(p))), p - toCzkNumber(employeeThird(czk(p))));
    }
  });
});
