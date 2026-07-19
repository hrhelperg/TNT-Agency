import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { calculate, createDefaultInput, toCzkNumber } from './index';
import CZ_2026 from './rules/cz-2026';
import { buildHomeInput, computeHomeView, HOME_MONTHLY_HOURS } from './home-view-model';

const ROOT = process.cwd();
const COMPONENT = path.join(ROOT, 'components/HomePayrollCalculator.tsx');
const VIEW_MODEL = path.join(ROOT, 'lib/payroll/home-view-model.ts');
const DEDICATED = path.join(ROOT, 'pages/kalkulacka-mzdy-agenturniho-zamestnance.tsx');
const HEADER = path.join(ROOT, 'components/Header.tsx');
const FOOTER = path.join(ROOT, 'components/Footer.tsx');
const CALC_ROUTE = '/kalkulacka-mzdy-agenturniho-zamestnance';

const view = computeHomeView(32000);

describe('homepage payroll calculator — shared engine & view-model', () => {
  it('1. the homepage view-model uses the shared engine (results match calculate())', () => {
    // The dedicated page's default scenario (hourly 200×160) run through the SAME
    // engine must produce the same employee/employer figures as the homepage
    // monthly-gross adapter for the equivalent 32 000 Kč gross.
    const engine = calculate(createDefaultInput());
    const model = engine.directResult!;
    expect(toCzkNumber(model.employee.netWage)).toBe(toCzkNumber(view.netHalere));
    expect(toCzkNumber(model.employer.totalPayrollCost)).toBe(toCzkNumber(view.employerCostHalere));
  });

  it('2. no payroll rates are hardcoded — every route rate comes from CZ_2026', () => {
    const byKey = Object.fromEntries(view.routes.map((r) => [r.key, r.ratePercent]));
    expect(byKey['employee-social']).toBe(CZ_2026.employeeSocialRate.value);
    expect(byKey['employee-health']).toBe(CZ_2026.employeeHealthRate.value);
    expect(byKey['employee-tax']).toBe(CZ_2026.taxLowerRate.value);
    expect(byKey['employer-social']).toBe(CZ_2026.employerSocialRate.value);
    expect(byKey['employer-health']).toBe(CZ_2026.employerHealthRate.value);
    // The view-model performs no tax arithmetic of its own.
    const src = fs.readFileSync(VIEW_MODEL, 'utf8');
    expect(/\*\s*0\.\d|\/\s*100\b|taxBase\s*\*/.test(src)).toBe(false);
  });

  it('3. approved default scenario resolves to 32 000 / 26 058 / 42 816', () => {
    expect(toCzkNumber(view.grossHalere)).toBe(32000);
    expect(toCzkNumber(view.netHalere)).toBe(26058);
    expect(toCzkNumber(view.employerCostHalere)).toBe(42816);
  });

  it('4. employee deductions equal the displayed employee breakdown (reconciles to gross − net)', () => {
    const sum = view.employee.socialHalere + view.employee.healthHalere + view.employee.taxHalere;
    expect(sum).toBe(view.employee.totalDeductionsHalere);
    expect(view.employee.totalDeductionsHalere).toBe(view.grossHalere - view.netHalere);
  });

  it('5. employer contributions equal the displayed employer breakdown (reconciles to cost − gross)', () => {
    const sum = view.employer.socialHalere + view.employer.healthHalere;
    expect(sum).toBe(view.employer.totalContributionsHalere);
    expect(view.employer.totalContributionsHalere).toBe(view.employerCostHalere - view.grossHalere);
  });

  it('6. state / mandatory-payment summary reconciles', () => {
    expect(view.state.fromEmployeeHalere).toBe(view.grossHalere - view.netHalere);
    expect(view.state.fromEmployerHalere).toBe(view.employerCostHalere - view.grossHalere);
    expect(view.state.totalToStateHalere).toBe(view.state.fromEmployeeHalere + view.state.fromEmployerHalere);
    expect(view.state.totalToStateHalere).toBe(view.employerCostHalere - view.netHalere);
  });

  it('7. employee and employer contributions are not conflated', () => {
    // Employer social rate (24.8 %) ≠ employee social rate (7.1 %), so amounts differ.
    expect(view.employer.socialHalere).not.toBe(view.employee.socialHalere);
    const payers = Object.fromEntries(view.routes.map((r) => [r.key, r.payer]));
    expect(payers['employee-social']).toBe('employee');
    expect(payers['employer-social']).toBe('employer');
  });

  it('8. changing UI language cannot change numeric output (numbers come from the engine, labels are static Czech)', () => {
    // The compute path takes only a number; labels never enter the calculation.
    const engine = calculate(buildHomeInput(32000));
    expect(view.netHalere).toBe(engine.directResult!.employee.netWage);
    expect(view.routes[0].labelCs).toBe('Sociální pojištění zaměstnance');
  });

  it('9. invalid inputs are handled safely (no misleading numbers)', () => {
    expect(computeHomeView(0).ok).toBe(false);
    expect(computeHomeView(-100).ok).toBe(false);
    expect(computeHomeView(0).netHalere).toBe(0);
  });

  it('10. no salary value leaves the browser — no fetch/analytics/storage/URL sinks in the calculator code', () => {
    const forbidden = /fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|indexedDB|gtag\(|dataLayer|document\.cookie|location\.(href|assign|replace)|history\.(push|replace)State/;
    for (const f of [COMPONENT, VIEW_MODEL]) {
      expect(forbidden.test(fs.readFileSync(f, 'utf8'))).toBe(false);
    }
    // The component must not put the salary in the dedicated-page link.
    const comp = fs.readFileSync(COMPONENT, 'utf8');
    expect(comp).toContain(`href={DEDICATED_URL}`);
    expect(/DEDICATED_URL\s*=\s*'\/kalkulacka-mzdy-agenturniho-zamestnance'/.test(comp)).toBe(true);
    expect(/\?.*gross|\?.*mzda|\?.*salary/i.test(comp)).toBe(false);
  });

  it('11. the dedicated calculator page uses the same shared engine', () => {
    const src = fs.readFileSync(DEDICATED, 'utf8');
    expect(/from '\.\.\/lib\/payroll'/.test(src)).toBe(true);
    expect(src).toContain('calculate');
    expect(src).toContain('createDefaultInput');
  });

  it('12. header and footer expose the dedicated calculator route', () => {
    expect(fs.readFileSync(HEADER, 'utf8')).toContain(CALC_ROUTE);
    expect(fs.readFileSync(FOOTER, 'utf8')).toContain(CALC_ROUTE);
  });

  it('adapter maps monthly gross verbatim (no G/H rounding) and stays a direct scenario', () => {
    const input = buildHomeInput(37500);
    expect(input.mode).toBe('direct');
    expect(input.wage.mode).toBe('monthly');
    expect(input.wage.monthlyWageCzk).toBe(37500);
    expect(input.period.monthlyHoursFund).toBe(HOME_MONTHLY_HOURS);
    // Gross is exactly the entered amount, even when not divisible by hours.
    expect(toCzkNumber(computeHomeView(37500).grossHalere)).toBe(37500);
  });
});
