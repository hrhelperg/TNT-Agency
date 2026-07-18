import { describe, it, expect } from 'vitest';
import {
  calculate,
  calculateEmployee,
  createDefaultInput,
  CZ_2026,
  PAYROLL_SOURCES,
  toCzkNumber,
  formatCzk,
  type PayrollInput,
} from './index';
import { validateInput } from './validation';

type Mutable<T> = { -readonly [K in keyof T]: Mutable<T[K]> };

/** Deep-clone the default input so each test can mutate freely. */
function input(): Mutable<PayrollInput> {
  return JSON.parse(JSON.stringify(createDefaultInput())) as Mutable<PayrollInput>;
}

/** Net wage / gross helpers in CZK for a single-employee scenario. */
function employee(i: PayrollInput) {
  const e = calculateEmployee(i, CZ_2026);
  return {
    gross: toCzkNumber(e.gross.grossWage),
    baseWage: toCzkNumber(e.gross.baseWage),
    premiums: toCzkNumber(e.gross.premiumsTotal),
    social: toCzkNumber(e.contributions.social),
    health: toCzkNumber(e.contributions.health),
    tax: toCzkNumber(e.tax.taxAfterCredits),
    taxBefore: toCzkNumber(e.tax.taxBeforeCredits),
    bonus: toCzkNumber(e.tax.taxBonus),
    net: toCzkNumber(e.netWage),
    raw: e,
  };
}

// 1. Zero-input calculation
describe('1. zero input', () => {
  it('produces zero gross/net without throwing', () => {
    const i = input();
    i.wage.hourlyWageCzk = 0;
    i.workedTime.regularHours = 0;
    const e = employee(i);
    expect(e.gross).toBe(0);
    expect(e.net).toBe(0);
    expect(e.social).toBe(0);
    expect(e.tax).toBe(0);
  });
});

// 2. Hourly wage × 160 hours (canonical fixture, all hand-verified)
describe('2. hourly 200 Kč × 160 h — canonical fixture', () => {
  // inputs: 200 Kč/h, 160 h, signed prohlášení + basic credit, resident, no children
  // gross 32 000; soc 7,1 %=2 272; zdr 4,5 %=1 440; základ daně 32 000; daň 15 %=4 800;
  // sleva 2 570; daň po slevě 2 230; čistá 32 000−2 272−1 440−2 230 = 26 058
  it('matches the manually worked example', () => {
    const e = employee(input());
    expect(e.gross).toBe(32000);
    expect(e.social).toBe(2272);
    expect(e.health).toBe(1440);
    expect(e.taxBefore).toBe(4800);
    expect(e.tax).toBe(2230);
    expect(e.net).toBe(26058);
  });
  it('employer cost 42 816 Kč', () => {
    const r = calculate(input(), CZ_2026);
    expect(toCzkNumber(r.agencyResult!.employer.social)).toBe(7936); // 24,8 %
    expect(toCzkNumber(r.agencyResult!.employer.health)).toBe(2880); // 9 %
    expect(toCzkNumber(r.agencyResult!.employer.totalPayrollCost)).toBe(42816);
  });
});

// 3. Monthly wage mode
describe('3. monthly wage mode 40 000 Kč', () => {
  it('gross equals the monthly wage and hourly equivalent is derived', () => {
    const i = input();
    i.wage.mode = 'monthly';
    i.wage.monthlyWageCzk = 40000;
    const e = employee(i);
    expect(e.gross).toBe(40000);
    expect(e.social).toBe(2840); // 7,1 %
    expect(e.health).toBe(1800); // 4,5 %
    expect(e.tax).toBe(3430); // 6000 − 2570
    expect(e.net).toBe(31930);
    expect(e.raw.gross.baseWage).toBeDefined();
  });
});

// 4. Overtime with 25 % premium
describe('4. overtime +25 %', () => {
  it('adds achieved wage for OT hours plus 25 % of average earnings', () => {
    const i = input();
    i.workedTime.overtimeHours = 10; // extra 10 h at 200 = 2000 base; premium 10×200×25%=500
    const e = employee(i);
    expect(e.baseWage).toBe(34000); // (160+10)×200
    expect(e.premiums).toBe(500);
    expect(e.gross).toBe(34500);
  });
});

// 5. Overtime with compensatory leave (náhradní volno) — no premium
describe('5. overtime with compensatory leave', () => {
  it('pays achieved wage but not the 25 % premium', () => {
    const i = input();
    i.workedTime.overtimeHours = 10;
    i.premiums.overtimeCompensatoryLeave = true;
    const e = employee(i);
    expect(e.baseWage).toBe(34000);
    expect(e.premiums).toBe(0);
    expect(e.gross).toBe(34000);
  });
});

// 6. Night premium (+10 %)
describe('6. night premium', () => {
  it('adds 10 % of average earnings for night hours', () => {
    const i = input();
    i.workedTime.nightHours = 40; // 40×200×10% = 800
    const e = employee(i);
    expect(e.premiums).toBe(800);
    expect(e.gross).toBe(32800);
  });
});

// 7. Weekend premium (Saturday + Sunday, each +10 %)
describe('7. weekend premium', () => {
  it('prices Saturday and Sunday separately', () => {
    const i = input();
    i.workedTime.saturdayHours = 8;
    i.workedTime.sundayHours = 8;
    const e = employee(i);
    expect(e.premiums).toBe(320); // 160 + 160
  });
});

// 8. Holiday work (+100 %)
describe('8. holiday work', () => {
  it('adds 100 % of average earnings when settled by premium', () => {
    const i = input();
    i.workedTime.holidayHours = 8; // 8×200×100% = 1600
    const e = employee(i);
    expect(e.premiums).toBe(1600);
  });
  it('adds nothing when settled by compensatory leave', () => {
    const i = input();
    i.workedTime.holidayHours = 8;
    i.premiums.holidayCompensatoryLeave = true;
    const e = employee(i);
    expect(e.premiums).toBe(0);
  });
});

// 9. Overlapping overtime + night + weekend on the same hours
describe('9. overlapping premiums (OT + night + Saturday)', () => {
  it('prices each qualifying category independently for the same hour', () => {
    const i = input();
    i.workedTime.regularHours = 152;
    i.workedTime.overtimeHours = 8; // total worked 160
    i.workedTime.nightHours = 8; // the same 8 h are also night…
    i.workedTime.saturdayHours = 8; // …and also Saturday
    const e = employee(i);
    // base 160×200 = 32000; OT premium 400; night 160; Saturday 160 → premiums 720
    expect(e.baseWage).toBe(32000);
    expect(e.premiums).toBe(720);
    expect(e.gross).toBe(32720);
  });
});

// 10. Bonus taxation
describe('10. bonus taxation', () => {
  it('adds taxable bonus into gross, insurance and tax base', () => {
    const i = input();
    i.adjustments.performanceBonus = 5000;
    const e = employee(i);
    expect(e.gross).toBe(37000);
    expect(e.social).toBe(2627); // 7,1 % of 37000
    expect(e.health).toBe(1665); // 4,5 %
    expect(e.taxBefore).toBe(5550); // 15 % of 37000
  });
});

// 11. Signed vs unsigned Prohlášení poplatníka
describe('11. Prohlášení poplatníka', () => {
  it('no monthly basic credit without a signed declaration', () => {
    const i = input();
    i.taxProfile.signedDeclaration = false;
    const e = employee(i);
    expect(e.tax).toBe(4800); // full advance, no credit
    expect(e.net).toBe(23488); // 32000 − 2272 − 1440 − 4800
  });
});

// 12. Basic taxpayer credit
describe('12. basic taxpayer credit', () => {
  it('applies 2 570 Kč/month', () => {
    const signed = employee(input()).tax;
    const i = input();
    i.taxProfile.applyBasicCredit = false;
    const withoutCredit = employee(i).tax;
    expect(withoutCredit - signed).toBe(2570);
  });
});

// 13. Child benefits
describe('13. child tax benefit and bonus', () => {
  it('reduces tax by the child benefit', () => {
    const i = input();
    i.taxProfile.children = [{ ztpp: false }]; // 1 267
    const e = employee(i);
    expect(e.tax).toBe(2230 - 1267); // 963
  });
  it('pays a monthly tax bonus when benefit exceeds tax (income ≥ ½ min wage)', () => {
    const i = input();
    i.wage.hourlyWageCzk = 15000 / 160; // gross 15 000 ≥ 11 200
    i.wage.averageHourlyEarningsCzk = i.wage.hourlyWageCzk;
    i.taxProfile.children = [{ ztpp: false }, { ztpp: false }]; // 1267 + 1860 = 3127
    const e = employee(i);
    expect(e.gross).toBe(15000);
    expect(e.tax).toBe(0);
    expect(e.bonus).toBe(3127);
    // net = 15000 − 1065 − 675 − 0 + 3127
    expect(e.net).toBe(16387);
  });
  it('withholds the monthly bonus when income is below ½ minimum wage', () => {
    const i = input();
    i.wage.hourlyWageCzk = 10000 / 160; // gross 10 000 < 11 200
    i.wage.averageHourlyEarningsCzk = i.wage.hourlyWageCzk;
    i.taxProfile.children = [{ ztpp: false }, { ztpp: false }];
    const e = employee(i);
    expect(e.bonus).toBe(0);
  });
});

// 14. Higher tax-band threshold (23 %)
describe('14. higher tax band', () => {
  it('applies 23 % above 146 901 Kč/month', () => {
    const i = input();
    i.wage.hourlyWageCzk = 200000 / 160; // gross 200 000
    i.wage.averageHourlyEarningsCzk = i.wage.hourlyWageCzk;
    const e = employee(i);
    expect(e.gross).toBe(200000);
    // 146901×15% + 53099×23% = 22035.15 + 12212.77 = 34247.92 → ceil 34248; −2570
    expect(e.taxBefore).toBe(34248);
    expect(e.tax).toBe(31678);
  });
});

// 15–18. Insurance shares
describe('15–18. insurance rates', () => {
  it('employee social 7,1 %, health 4,5 %; employer social 24,8 %, health 9 %', () => {
    const r = calculate(input(), CZ_2026);
    const emp = r.agencyResult!;
    expect(toCzkNumber(emp.employee.contributions.social)).toBe(2272);
    expect(toCzkNumber(emp.employee.contributions.health)).toBe(1440);
    expect(toCzkNumber(emp.employer.social)).toBe(7936);
    expect(toCzkNumber(emp.employer.health)).toBe(2880);
  });
});

// 19. Statutory rounding boundaries
describe('19. rounding boundaries', () => {
  it('rounds insurance up to whole koruna', () => {
    const i = input();
    i.wage.hourlyWageCzk = 23456 / 160; // gross 23 456; 7,1 % = 1665.376 → 1666
    i.wage.averageHourlyEarningsCzk = i.wage.hourlyWageCzk;
    const e = employee(i);
    expect(e.gross).toBe(23456);
    expect(e.social).toBe(1666);
  });
  it('rounds the monthly tax base up to whole hundreds', () => {
    const i = input();
    i.wage.hourlyWageCzk = 27450.4 / 160; // gross ~27 450,40
    i.wage.averageHourlyEarningsCzk = i.wage.hourlyWageCzk;
    const e = employee(i);
    // taxable base rounds up to 27 500 → tax 15 % = 4 125
    expect(e.taxBefore).toBe(4125);
  });
});

// 20–23. Agency fee models (exact haléře; agency fees have no statutory rounding)
describe('20–23. agency fee models', () => {
  const payrollCostH = 42816 * 100; // 4 281 600 haléře
  it('20. percentage fee — 15 % = 6 422,40 Kč', () => {
    const i = input();
    i.agency.feeModel = 'percent_of_payroll';
    i.agency.feePercentOfPayroll = 15;
    const r = calculate(i, CZ_2026);
    expect(r.agencyResult!.agency!.serviceFee).toBe(642240); // 6 422,40 Kč
  });
  it('21. per-hour fee — 50 × 160 = 8 000 Kč', () => {
    const i = input();
    i.agency.feeModel = 'per_hour';
    i.agency.feePerHour = 50;
    const r = calculate(i, CZ_2026);
    expect(r.agencyResult!.agency!.serviceFee).toBe(800000);
  });
  it('22. fixed monthly fee', () => {
    const i = input();
    i.agency.feeModel = 'fixed_monthly';
    i.agency.feeFixedMonthly = 10000;
    const r = calculate(i, CZ_2026);
    expect(r.agencyResult!.agency!.serviceFee).toBe(1000000);
  });
  it('23. combined fee', () => {
    const i = input();
    i.agency.feeModel = 'combined';
    i.agency.feePercentOfPayroll = 15;
    i.agency.feePerHour = 50;
    i.agency.feeFixedMonthly = 10000;
    const r = calculate(i, CZ_2026);
    expect(r.agencyResult!.agency!.serviceFee).toBe(642240 + 800000 + 1000000);
    expect(payrollCostH).toBe(4281600);
  });
});

// 24. VAT display
describe('24. VAT display', () => {
  it('computes VAT on the ex-VAT invoice and excludes deductible VAT from economic cost', () => {
    const i = input();
    i.agency.feeModel = 'percent_of_payroll';
    i.agency.feePercentOfPayroll = 15;
    i.agency.companyCanDeductVat = true;
    const a = calculate(i, CZ_2026).agencyResult!.agency!;
    expect(a.netInvoiceExVat).toBe(4923840); // 42 816 + 6 422,40 = 49 238,40 Kč
    expect(a.vat).toBe(1034006); // 21 % → 10 340,06 Kč
    expect(a.economicCost).toBe(4923840); // VAT deductible → ex-VAT
    expect(a.grossInvoice).toBe(4923840 + 1034006); // 59 578,46 Kč
  });
  it('includes VAT in economic cost when not deductible', () => {
    const i = input();
    i.agency.companyCanDeductVat = false;
    const a = calculate(i, CZ_2026).agencyResult!.agency!;
    expect(a.economicCost).toBe(a.grossInvoice);
  });
});

// 25. Direct employee comparison
describe('25. direct-employment comparison', () => {
  it('produces a comparison with a signed difference', () => {
    const i = input();
    i.mode = 'comparison';
    i.agency.feeModel = 'percent_of_payroll';
    i.agency.feePercentOfPayroll = 15;
    const r = calculate(i, CZ_2026);
    expect(r.comparison).toBeDefined();
    // direct has no extra costs → economic = payroll cost 42 816 Kč
    expect(r.comparison!.directEconomicCost).toBe(4281600);
    // agency economic = ex-VAT invoice (deductible) = 49 238,40 Kč
    expect(r.comparison!.agencyEconomicCost).toBe(4923840);
    expect(r.comparison!.differenceCzk).toBe(4923840 - 4281600); // 6 422,40 Kč
    expect(r.comparison!.differencePercent).toBeCloseTo(15, 6); // exactly the 15 % fee
  });
});

// 26–27. Multiple workers + annualized scenario
describe('26–27. multi-worker & annualized', () => {
  it('scales per-worker to all workers and 12× annualized', () => {
    const i = input();
    i.workerCount = 10;
    const r = calculate(i, CZ_2026);
    const sc = r.agencyResult!.scenario.economicCost;
    expect(sc.allWorkers).toBe(sc.perWorker * 10);
    expect(sc.annualizedAllWorkers).toBe(sc.allWorkers * 12);
  });
});

// 28. Negative input rejection
describe('28. negative input rejection', () => {
  it('flags negative wage as an error and returns no results', () => {
    const i = input();
    i.wage.hourlyWageCzk = -50;
    const v = validateInput(i);
    expect(v.ok).toBe(false);
    const r = calculate(i, CZ_2026);
    expect(r.agencyResult).toBeUndefined();
  });
});

// 29. Impossible hour combinations
describe('29. impossible hour combinations', () => {
  it('rejects overlay hours exceeding total worked hours', () => {
    const i = input();
    i.workedTime.regularHours = 160;
    i.workedTime.nightHours = 200; // > 160
    const v = validateInput(i);
    expect(v.ok).toBe(false);
    expect(v.issues.some((x) => x.field === 'workedTime.nightHours')).toBe(true);
  });
});

// 30. Large-value boundary
describe('30. large-value boundary', () => {
  it('handles a very high wage without overflow', () => {
    const i = input();
    i.wage.hourlyWageCzk = 1_000_000 / 160; // gross 1 000 000
    i.wage.averageHourlyEarningsCzk = i.wage.hourlyWageCzk;
    const e = employee(i);
    expect(e.gross).toBe(1_000_000);
    expect(Number.isSafeInteger(e.raw.netWage)).toBe(true);
  });
});

// 31. Snapshot fixture with all intermediate values verified
describe('31. verified snapshot fixture', () => {
  it('canonical fixture intermediate values', () => {
    const e = employee(input()).raw;
    expect(toCzkNumber(e.gross.baseWage)).toBe(32000);
    expect(toCzkNumber(e.gross.grossWage)).toBe(32000);
    expect(toCzkNumber(e.contributions.total)).toBe(3712);
    expect(toCzkNumber(e.tax.taxBase)).toBe(32000);
    expect(toCzkNumber(e.tax.taxBeforeCredits)).toBe(4800);
    expect(toCzkNumber(e.tax.appliedCredits)).toBe(2570);
    expect(toCzkNumber(e.tax.taxAfterCredits)).toBe(2230);
    expect(toCzkNumber(e.netWage)).toBe(26058);
  });
});

// 32. No floating-point drift
describe('32. no floating-point drift', () => {
  it('all money results are exact safe integers (haléře)', () => {
    const i = input();
    i.workedTime.overtimeHours = 7.5;
    i.workedTime.nightHours = 3.25;
    const e = calculateEmployee(i, CZ_2026);
    for (const line of e.lines) {
      expect(Number.isSafeInteger(line.amount)).toBe(true);
    }
  });
});

// 33. Rules source coverage
describe('33. rules source coverage', () => {
  const ids = new Set(PAYROLL_SOURCES.map((s) => s.id));
  it('every referenced source id exists in the registry', () => {
    const referenced = [
      CZ_2026.employeeSocialRate.sourceId,
      CZ_2026.employerSocialRate.sourceId,
      CZ_2026.employeeHealthRate.sourceId,
      CZ_2026.employerHealthRate.sourceId,
      CZ_2026.maxAnnualSocialBase.sourceId,
      CZ_2026.taxUpperMonthlyThreshold.sourceId,
      CZ_2026.basicTaxpayerCreditMonthly.sourceId,
      CZ_2026.childBenefit.sourceId,
      CZ_2026.averageWageMonthly.sourceId,
      CZ_2026.minimumWageMonthly.sourceId,
      CZ_2026.vatStandardRate.sourceId,
      ...Object.values(CZ_2026.premiums).map((p) => p.sourceId),
    ];
    for (const id of referenced) expect(ids.has(id)).toBe(true);
  });
  it('every source has a url and legal basis', () => {
    for (const s of PAYROLL_SOURCES) {
      expect(s.url).toMatch(/^https?:\/\//);
      expect(s.legalBasis.length).toBeGreaterThan(0);
    }
  });
  it('uses the 2026 rule year, not 2025 values', () => {
    expect(CZ_2026.taxYear).toBe(2026);
    expect(CZ_2026.averageWageMonthly.value).toBe(48967);
    expect(CZ_2026.minimumWageMonthly.value).toBe(22400);
    expect(CZ_2026.taxUpperMonthlyThreshold.value).toBe(146901);
  });
});

// 34. Health minimum-base warning + formatting
describe('34. modeling limitations & formatting', () => {
  it('warns when gross is below the minimum health base', () => {
    const i = input();
    i.wage.hourlyWageCzk = 8000 / 160; // gross 8 000 < 22 400
    i.wage.averageHourlyEarningsCzk = i.wage.hourlyWageCzk;
    const e = calculateEmployee(i, CZ_2026);
    // engine still computes on actual gross; health = 4,5 % of 8000 = 360
    expect(toCzkNumber(e.contributions.health)).toBe(360);
  });
  it('formats CZK in Czech locale', () => {
    const e = calculateEmployee(input(), CZ_2026);
    const s = formatCzk(e.netWage);
    expect(s).toContain('Kč');
    expect(s).toMatch(/26\s?058/); // Czech thousands separator (space)
  });
});
