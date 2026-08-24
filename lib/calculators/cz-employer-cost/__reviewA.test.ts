import { describe, it } from 'vitest';
import { calculate, createDefaultInput } from './engine';
import { moneyFlowTotal } from './metrics';

function run(mut: (i: any) => void) {
  const i: any = createDefaultInput(2026, 1);
  mut(i);
  return calculate(i);
}
const K = (h: number) => h / 100;

function dump(label: string, r: any) {
  require('fs').appendFileSync('/tmp/reviewA.json','===== '+label+'\n');
  require('fs').appendFileSync('/tmp/reviewA.json', JSON.stringify({
    gross: K(r.gross.grossTaxable),
    socBase: K(r.social.assessmentBase),
    socUncapped: K(r.social.uncappedBase),
    socEmployee: K(r.social.employee),
    socEmployer: K(r.social.employer),
    socEmployerNet: K(r.social.employerNet),
    healthPremiumEmployeeOnActual: K(r.health.employeeOnActual),
    healthEmployerOnActual: K(r.health.employerOnActual),
    healthShortfall: K(r.health.shortfall),
    topUpEmployee: K(r.health.topUpPaidByEmployee),
    topUpEmployer: K(r.health.topUpPaidByEmployer),
    healthEmployee: K(r.health.employee),
    healthEmployer: K(r.health.employer),
    taxRoundedBase: K(r.tax.roundedBase),
    lowerBandTax: K(r.tax.lowerBandTax),
    upperBandTax: K(r.tax.upperBandTax),
    advanceBefore: K(r.tax.advanceBeforeCredits),
    creditsApplied: K(r.tax.creditsApplied),
    childApplied: K(r.tax.childBenefitApplied),
    bonus: K(r.tax.taxBonus),
    advanceFinal: K(r.tax.advanceFinal),
    net: K(r.employeeNet.net),
    liability: K(r.liability.monthlyAllocated),
    employerStatTotal: K(r.employerStatutory.total),
    totalReal: K(r.totalRealEmployerCost),
    moneyFlow: r.moneyFlow.map((s: any) => [s.key, K(s.amount)]),
    moneyFlowTotal: K(moneyFlowTotal(r.moneyFlow)),
    identityOk: moneyFlowTotal(r.moneyFlow) === r.totalRealEmployerCost,
    annualStat: K(r.annual.totalStatutoryEmployerCost),
  }, null, 1)+'\n');
}

describe('reviewA', () => {
  it('cases', () => {
    dump('40000', run(i => { i.salary.grossMonthlyCzk = 40000; }));
    dump('4662', run(i => { i.salary.grossMonthlyCzk = 4662; }));
    dump('22401', run(i => { i.salary.grossMonthlyCzk = 22401; }));
    dump('165615', run(i => { i.salary.grossMonthlyCzk = 165615; }));
    dump('10000', run(i => { i.salary.grossMonthlyCzk = 10000; }));
    dump('ytd straddle 2300000 / 100000', run(i => {
      i.salary.grossMonthlyCzk = 100000;
      i.socialMaximum = { mode: 'explicit_ytd', ytdAssessmentBaseCzk: 2300000 };
    }));
    dump('20000 three children', run(i => {
      i.salary.grossMonthlyCzk = 20000;
      i.taxProfile.children = [{ ztpp: false }, { ztpp: false }, { ztpp: false }];
    }));
    dump('4000 with liability finance_it', run(i => {
      i.salary.grossMonthlyCzk = 4000;
      i.liabilityInsurance = { enabled: true, activityKey: 'finance_it', customRatePerMille: null };
    }));
    dump('0 gross standard', run(i => { i.salary.grossMonthlyCzk = 0; }));
    dump('40000.50 decimal + liability', run(i => {
      i.salary.grossMonthlyCzk = 40000.5;
      i.liabilityInsurance = { enabled: true, activityKey: 'mining', customRatePerMille: null };
    }));
  });
});
