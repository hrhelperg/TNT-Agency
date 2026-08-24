import { describe, it, expect } from 'vitest';
import { calculateDeEmployerCost, type DeEmployerCostInput } from './engine';
import { ISSUE_TEXT } from './copy';
import { validateDeInput } from './validation';

/**
 * The engine must refuse nonsense rather than compute from it.
 *
 * Each case here is one an adversarial pass over the engine actually produced
 * before this layer existed, and the failure mode was the same every time: not
 * a crash, but a confident number. A seventh Steuerklasse, a 900 % Zusatzbeitrag
 * and a negative Kinderfreibetrag all returned a formatted net wage.
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
  employer: { u1Percent: null, u2Percent: '0', owesInsolvencyLevy: false, accidentMonthlyCent: 0n },
};

const outcome = (over: Partial<DeEmployerCostInput>) =>
  calculateDeEmployerCost({ ...BASE, ...over } as DeEmployerCostInput);

const keys = (over: Partial<DeEmployerCostInput>) => {
  const r = outcome(over);
  if (r.supported !== false || r.reason !== 'invalid') return [];
  return r.issues.map((i) => i.key);
};

describe('inputs that used to produce a confident wrong number', () => {
  it('rejects a Steuerklasse that does not exist', () => {
    for (const steuerklasse of [0, 7, 1.5, NaN, Infinity, -1]) {
      expect(keys({ steuerklasse }), `class ${steuerklasse}`).toContain('steuerklasse.outOfRange');
    }
    for (const steuerklasse of [1, 2, 3, 4, 5, 6]) {
      expect(keys({ steuerklasse })).toEqual([]);
    }
  });

  it('rejects a Zusatzbeitragssatz that would drive net pay negative', () => {
    // 900 % returned a net of −11 109,00 EUR, formatted like any other figure.
    expect(keys({ healthSupplementPercent: '900' })).toContain('supplement.implausible');
    expect(keys({ healthSupplementPercent: '-2' })).toContain('supplement.unreadable');
    expect(keys({ healthSupplementPercent: 'x' })).toContain('supplement.unreadable');
    expect(keys({ healthSupplementPercent: '2.905' })).toContain('supplement.unreadable');
    // A high but real rate still calculates.
    expect(keys({ healthSupplementPercent: '4.4' })).toEqual([]);
  });

  it('rejects a negative or unreadable Kinderfreibetrag but allows halves', () => {
    expect(keys({ kinderfreibetraege: '-2' })).toContain('kinderfreibetraege.unreadable');
    expect(keys({ kinderfreibetraege: 'abc' })).toContain('kinderfreibetraege.unreadable');
    expect(keys({ kinderfreibetraege: '1.25' })).toContain('kinderfreibetraege.unreadable');
    for (const k of ['0', '0.5', '1', '2.5', '4']) expect(keys({ kinderfreibetraege: k })).toEqual([]);
  });

  it('rejects an unknown Bundesland', () => {
    expect(keys({ workplace: 'XX' as never })).toContain('workplace.unknown');
    expect(keys({ workplace: 'SN' })).toEqual([]);
  });

  it('rejects an impossible number of children', () => {
    for (const childrenUnder25 of [-3, 1e6, NaN, 2.5]) {
      expect(
        keys({ care: { childrenUnder25, isParent: true, atLeast23: true } }),
        `${childrenUnder25}`,
      ).toContain('children.outOfRange');
    }
    expect(keys({ care: { childrenUnder25: 5, isParent: true, atLeast23: true } })).toEqual([]);
  });

  it('rejects negative levy rates and a negative accident amount', () => {
    expect(keys({ employer: { ...BASE.employer, u2Percent: '-1' } })).toContain('u2.unreadable');
    expect(keys({ employer: { ...BASE.employer, u1Percent: '99' } })).toContain('u1.implausible');
    expect(keys({ employer: { ...BASE.employer, accidentMonthlyCent: -100n } })).toContain(
      'accident.negative',
    );
  });
});

describe('a bad gross is reported for what it is', () => {
  it('calls a negative gross negative, not a Minijob', () => {
    // Before validation this was refused as a Minijob — true of every number
    // below 603 EUR, and not why −100 EUR is wrong.
    expect(keys({ monthlyGrossCent: -eur(100) })).toEqual(['gross.negative']);
  });

  it('still refuses a real Minijob as a Minijob', () => {
    const r = outcome({ monthlyGrossCent: eur(500) });
    expect(r.supported).toBe(false);
    if (r.supported === false && r.reason === 'unsupported') expect(r.case.id).toBe('minijob');
    else throw new Error('expected an unsupported-case refusal');
  });

  it('rejects an absurd gross', () => {
    expect(keys({ monthlyGrossCent: eur(500_000_000) })).toContain('gross.implausible');
  });
});

describe('the two kinds of non-answer stay distinct', () => {
  it('an invalid input is never dressed as a statement about German payroll', () => {
    const bad = outcome({ steuerklasse: 9 });
    expect(bad.supported).toBe(false);
    if (bad.supported === false) expect(bad.reason).toBe('invalid');
  });

  it('a declared unsupported case is never dressed as a typo', () => {
    const r = calculateDeEmployerCost({ ...BASE, declared: ['pkv'] });
    expect(r.supported).toBe(false);
    if (r.supported === false) expect(r.reason).toBe('unsupported');
  });
});

describe('every issue the validator can raise has a message in all three languages', () => {
  it('leaves no key without copy', () => {
    // Collected by exercising the validator rather than by reading the source,
    // so a key added without copy fails here instead of rendering blank.
    const raised = new Set<string>();
    const push = (over: Partial<DeEmployerCostInput>) =>
      validateDeInput({ ...BASE, ...over } as never).forEach((i) => raised.add(i.key));

    push({ monthlyGrossCent: -1n });
    push({ monthlyGrossCent: eur(500_000_000) });
    push({ steuerklasse: 9 });
    push({ kinderfreibetraege: 'x' });
    push({ workplace: 'XX' as never });
    push({ healthSupplementPercent: 'x' });
    push({ healthSupplementPercent: '99' });
    push({ care: { childrenUnder25: -1, isParent: false, atLeast23: true } });
    push({ employer: { ...BASE.employer, u1Percent: 'x' } });
    push({ employer: { ...BASE.employer, u1Percent: '99' } });
    push({ employer: { ...BASE.employer, u2Percent: 'x' } });
    push({ employer: { ...BASE.employer, u2Percent: '99' } });
    push({ employer: { ...BASE.employer, accidentMonthlyCent: -1n } });
    push({ employer: { ...BASE.employer, accidentMonthlyCent: eur(500_000_000) } });

    expect(raised.size).toBeGreaterThan(10);
    for (const key of raised) {
      const copy = ISSUE_TEXT[key];
      expect(copy, `no copy for issue "${key}"`).toBeTruthy();
      for (const locale of ['de', 'en', 'cs'] as const) {
        expect(copy[locale].length, `${key}/${locale}`).toBeGreaterThan(10);
      }
    }
  });
});
