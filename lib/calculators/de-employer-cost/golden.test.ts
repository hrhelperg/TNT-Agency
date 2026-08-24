import { describe, it, expect } from 'vitest';
import { calculateDeEmployerCost, type DeEmployerCostInput } from './engine';

/**
 * Golden scenarios — whole-engine results, frozen.
 *
 * These are not extra coverage of the rules; the rules are already checked
 * against the official Prüftabellen and the published contribution tables. What
 * these freeze is the COMPOSITION: which figure lands on which side of the
 * ledger, and what a reader will actually see on the page.
 *
 * Every expected number below was derived by hand from the sourced rates and
 * then confirmed against the engine — not read out of the engine and pasted
 * back, which would make the file a record of current behaviour rather than a
 * statement about correct behaviour. The workings are written out beside each
 * case so a reviewer can check them without running anything.
 */

const eur = (v: number) => BigInt(Math.round(v * 100));
const m = (c: bigint) => (Number(c) / 100).toFixed(2);

const BASE: DeEmployerCostInput = {
  monthlyGrossCent: eur(3000),
  steuerklasse: 1,
  kinderfreibetraege: '0',
  workplace: 'NW',
  churchTaxLiable: false,
  healthSupplementPercent: '2.9',
  reducedHealthRate: false,
  care: { childrenUnder25: 1, isParent: true, atLeast23: true },
  employer: {
    u1Percent: null,
    u2Percent: '0',
    owesInsolvencyLevy: false,
    accidentMonthlyCent: 0n,
  },
};

const run = (over: Partial<DeEmployerCostInput> = {}) => {
  const r = calculateDeEmployerCost({ ...BASE, ...over });
  if (r.supported === false) {
    throw new Error(r.reason === 'invalid' ? `invalid: ${r.issues.map((i) => i.key).join(', ')}` : `refused: ${r.case.id}`);
  }
  return r;
};

const line = (r: ReturnType<typeof run>, key: string) =>
  r.contributions.find((c) => c.key === key)!;

describe('A — 3 000,00 EUR, class I, one child, no church tax, no employer extras', () => {
  const r = run();

  it('splits each branch as the half-rate rule prescribes', () => {
    // RV 9,3 % × 3 000 = 279,00 · AV 1,3 % = 39,00
    // KV (14,6 + 2,9) / 2 = 8,75 % = 262,50 · PV 1,8 % = 54,00
    expect([
      m(line(r, 'pension').employerCent),
      m(line(r, 'unemployment').employerCent),
      m(line(r, 'health').employerCent),
      m(line(r, 'care').employerCent),
    ]).toEqual(['279.00', '39.00', '262.50', '54.00']);
  });

  it('totals 21,15 % on each side — half of the 42,30 % Gesamtbeitragssatz', () => {
    expect(m(r.employer.contributionsCent)).toBe('634.50');
    expect(m(r.employee.socialCent)).toBe('634.50');
    expect(Number(m(r.employer.contributionsCent)) / 3000).toBeCloseTo(0.2115, 10);
  });

  it('costs the employer 3 634,50 EUR and pays 2 067,50 EUR net', () => {
    // Lohnsteuer, worked through the Programmablaufplan by hand:
    //   annual gross 36 000
    //   Vorsorgepauschale: RV 9,3 % = 3 348,00; KV/PV (2,90/2/100 + 7 % + 1,8 %)
    //     = 10,25 % = 3 690,00; sum ceiled = 7 038. The Höchstbetrag branch
    //     gives ceil(3 348 + 1 900) = 5 248, which is smaller, so it does not bind.
    //   ZTABFB = 1 230 Arbeitnehmer-Pauschbetrag + 36 Sonderausgaben = 1 266
    //   ZVE = 36 000 − 1 266 − 7 038 = 27 696, zone 3
    //   Y = (27 696 − 17 799) / 10 000 = 0,989700
    //   ST = (173,1 · Y + 2 397) · Y + 1 034,87 = 3 576,73… → 3 576
    //   monthly = 357 600 cent / 12 = 29 800 cent = 298,00
    // Net = 3 000 − 634,50 − 298,00 = 2 067,50.
    expect(m(r.employee.lohnsteuerCent)).toBe('298.00');
    expect(m(r.employer.totalMonthlyCent)).toBe('3634.50');
    expect(m(r.employee.netCent)).toBe('2067.50');
    expect(r.employer.loadFactor).toBe('1.2115');
  });

  it('charges no Solidaritätszuschlag at this income', () => {
    // The Freigrenze is 20 350 EUR of annual Lohnsteuer; this is nowhere near.
    expect(m(r.employee.soliCent)).toBe('0.00');
  });
});

describe('B — 3 000,00 EUR, childless over 23', () => {
  const r = run({ care: { childrenUnder25: 0, isParent: false, atLeast23: true } });

  it('adds 0,6 points to the employee and nothing to the employer', () => {
    // 2,4 % × 3 000 = 72,00 employee against an unchanged 54,00 employer.
    expect(m(line(r, 'care').employeeCent)).toBe('72.00');
    expect(m(line(r, 'care').employerCent)).toBe('54.00');
  });

  it('leaves employer cost identical to scenario A', () => {
    expect(m(r.employer.totalMonthlyCent)).toBe('3634.50');
  });
});

describe('C — 3 000,00 EUR in Saxony', () => {
  const r = run({ workplace: 'SN' });

  it('moves half a point from employer to employee', () => {
    // 1,3 % = 39,00 employer · 2,3 % = 69,00 employee. Total 108,00, the same
    // 3,6 % as everywhere else.
    expect(m(line(r, 'care').employerCent)).toBe('39.00');
    expect(m(line(r, 'care').employeeCent)).toBe('69.00');
    expect(m(line(r, 'care').employerCent + line(r, 'care').employeeCent)).toBe('108.00');
  });

  it('lowers employer cost by exactly 15,00 EUR against scenario A', () => {
    expect(m(r.employer.totalMonthlyCent)).toBe('3619.50');
  });
});

describe('D — 12 000,00 EUR, class I, above both ceilings', () => {
  const r = run({ monthlyGrossCent: eur(12_000) });

  it('assesses each branch at its own ceiling', () => {
    // KV/PV at 5 812,50 · RV/AV at 8 450,00
    expect(m(line(r, 'health').baseCent)).toBe('5812.50');
    expect(m(line(r, 'care').baseCent)).toBe('5812.50');
    expect(m(line(r, 'pension').baseCent)).toBe('8450.00');
    expect(m(line(r, 'unemployment').baseCent)).toBe('8450.00');
  });

  it('produces the capped shares', () => {
    // RV 9,3 % × 8 450 = 785,85 · AV 1,3 % × 8 450 = 109,85
    // KV 8,75 % × 5 812,50 = 508,59 (508,59375 → 508,59) · PV 1,8 % = 104,63
    expect([
      m(line(r, 'pension').employerCent),
      m(line(r, 'unemployment').employerCent),
      m(line(r, 'health').employerCent),
      m(line(r, 'care').employerCent),
    ]).toEqual(['785.85', '109.85', '508.59', '104.63']);
  });

  it('charges the Solidaritätszuschlag here', () => {
    expect(Number(m(r.employee.soliCent))).toBeGreaterThan(0);
  });

  it('has a lower load factor than scenario A, because contributions stopped', () => {
    expect(Number(r.employer.loadFactor)).toBeLessThan(1.2115);
  });
});

describe('E — 3 000,00 EUR with church tax in Bavaria and in Hesse', () => {
  const by = run({ churchTaxLiable: true, workplace: 'BY' });
  const he = run({ churchTaxLiable: true, workplace: 'HE' });

  it('applies 8 % and 9 % of the Bemessungsgrundlage respectively', () => {
    // The base is BK, which equals the Lohnsteuer here because ZKF is 0.
    // 298,00 → 8 % = 23,84 · 9 % = 26,82, both truncated to the cent.
    expect(m(by.employee.lohnsteuerCent)).toBe('298.00');
    expect(m(by.churchTax.baseCent)).toBe('298.00');
    expect(m(by.employee.churchTaxCent)).toBe('23.84');
    expect(m(he.employee.churchTaxCent)).toBe('26.82');
  });

  it('reduces net and leaves employer cost untouched', () => {
    expect(m(he.employer.totalMonthlyCent)).toBe('3634.50');
    expect(Number(m(he.employee.netCent))).toBeLessThan(2067.5);
  });
});

describe('F — 3 000,00 EUR, class III versus class V', () => {
  const iii = run({ steuerklasse: 3 });
  const v = run({ steuerklasse: 5 });

  it('taxes class III far more lightly than class V', () => {
    expect(Number(m(iii.employee.lohnsteuerCent))).toBeLessThan(
      Number(m(v.employee.lohnsteuerCent)),
    );
  });

  it('leaves the social contributions identical — the class is a tax matter only', () => {
    expect(m(iii.employee.socialCent)).toBe(m(v.employee.socialCent));
    expect(m(iii.employer.totalMonthlyCent)).toBe(m(v.employer.totalMonthlyCent));
  });
});

describe('G — 4 000,00 EUR with every employer levy switched on', () => {
  const r = run({
    monthlyGrossCent: eur(4000),
    care: { childrenUnder25: 0, isParent: false, atLeast23: true },
    employer: {
      u1Percent: '1.6',
      u2Percent: '0.24',
      owesInsolvencyLevy: true,
      accidentMonthlyCent: eur(30),
    },
  });

  it('adds U1, U2, U3 and accident insurance to the employer side only', () => {
    // U1 1,6 % × 4 000 = 64,00 · U2 0,24 % = 9,60 · U3 0,15 % = 6,00 · BG 30,00
    expect(m(r.employer.levyCent)).toBe('109.60');
    for (const key of ['u1', 'u2', 'insolvencyLevy', 'accident']) {
      expect(line(r, key).employeeCent, key).toBe(0n);
    }
  });

  it('reaches 4 955,60 EUR total cost, a factor of 1,2389', () => {
    // 4 000 gross
    // + employer contributions 372,00 + 52,00 + 350,00 + 72,00 = 846,00
    //   — note 72,00, the EMPLOYER's 1,8 %, not the childless employee's 2,4 %
    // + levies 64,00 + 9,60 + 6,00 + 30,00 = 109,60
    expect(m(r.employer.contributionsCent)).toBe('846.00');
    expect(m(r.employer.totalMonthlyCent)).toBe('4955.60');
    expect(r.employer.loadFactor).toBe('1.2389');
  });
});

describe('H — the boundary of what is calculated at all', () => {
  it('refuses 2 000,00 EUR and answers 2 000,01 EUR', () => {
    const at = calculateDeEmployerCost({ ...BASE, monthlyGrossCent: eur(2000) });
    expect(at.supported).toBe(false);
    const above = calculateDeEmployerCost({ ...BASE, monthlyGrossCent: eur(2000) + 1n });
    expect(above.supported).toBe(true);
  });

  it('produces a coherent result one cent above the boundary', () => {
    const r = run({ monthlyGrossCent: eur(2000) + 1n });
    expect(r.employee.netCent + r.employee.totalDeductionsCent).toBe(eur(2000) + 1n);
    expect(Number(m(r.employee.netCent))).toBeGreaterThan(0);
  });
});
