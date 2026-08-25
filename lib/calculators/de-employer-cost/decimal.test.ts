import { describe, it, expect } from 'vitest';
import { Decimal } from './decimal';

const d = (v: string | number) => Decimal.of(v);

/**
 * These pin Java `BigDecimal` semantics, not "decimal arithmetic in general".
 * The BMF Programmablaufplan is written in those semantics, and the places where
 * they differ from the obvious implementation are exactly the places a
 * transcription goes wrong.
 */
describe('scale is carried, not normalised away', () => {
  it('keeps a literal’s own scale', () => {
    expect(d('0.013').scale).toBe(3);
    expect(d('12348').scale).toBe(0);
    expect(d('0.00').toString()).toBe('0.00');
  });

  it('add and subtract take the larger scale', () => {
    expect(d('1.5').add(d('2.25')).toString()).toBe('3.75');
    expect(d('1.5').add(d('2.25')).scale).toBe(2);
    expect(d('10').subtract(d('0.001')).toString()).toBe('9.999');
  });

  // The one most likely to be got wrong by reaching for a float.
  it('multiply SUMS the scales', () => {
    const r = d('1.5').multiply(d('2.25')); // scale 1 + scale 2 = 3
    expect(r.scale).toBe(3);
    expect(r.toString()).toBe('3.375');
    expect(d('0.013').multiply(d('101400')).toString()).toBe('1318.200');
  });
});

describe('rounding is magnitude-based, as in Java', () => {
  // ROUND_DOWN is toward zero, NOT floor. Implementing it as floor changes the
  // sign handling, and the PAP carries negative intermediates.
  it('ROUND_DOWN truncates toward zero for both signs', () => {
    expect(d('1.9').setScale(0, 'DOWN').toString()).toBe('1');
    expect(d('-1.9').setScale(0, 'DOWN').toString()).toBe('-1');
  });

  it('ROUND_UP moves away from zero for both signs', () => {
    expect(d('1.1').setScale(0, 'UP').toString()).toBe('2');
    expect(d('-1.1').setScale(0, 'UP').toString()).toBe('-2');
  });

  it('leaves an exact value alone under either mode', () => {
    expect(d('2.00').setScale(0, 'UP').toString()).toBe('2');
    expect(d('2.00').setScale(0, 'DOWN').toString()).toBe('2');
  });

  it('extends scale without rounding', () => {
    expect(d('2').setScale(2, 'DOWN').toString()).toBe('2.00');
  });
});

describe('division', () => {
  it('divideScaled produces exactly the requested scale', () => {
    const y = d('20000').subtract(d('17799')).divideScaled(d('10000'), 6, 'DOWN');
    expect(y.scale).toBe(6);
    expect(y.toString()).toBe('0.220100');
  });

  it('divideScaled truncates rather than rounds under DOWN', () => {
    expect(d('1').divideScaled(d('3'), 6, 'DOWN').toString()).toBe('0.333333');
    expect(d('2').divideScaled(d('3'), 6, 'DOWN').toString()).toBe('0.666666');
    expect(d('2').divideScaled(d('3'), 6, 'UP').toString()).toBe('0.666667');
  });

  it('divideExact returns an exact quotient', () => {
    expect(d('500').divideExact(d('100')).toNumber()).toBe(5);
    expect(d('1318.200').divideExact(d('100')).toNumber()).toBeCloseTo(13.182, 6);
  });

  // Loud rather than silent: the PAP uses the one-argument form only where the
  // division terminates, so hitting this means the interpreter has drifted.
  it('divideExact throws on a non-terminating quotient', () => {
    expect(() => d('1').divideExact(d('3'))).toThrow(/non-terminating/);
  });

  it('rejects division by zero', () => {
    expect(() => d('1').divideScaled(d('0'), 2, 'DOWN')).toThrow(/division by zero/);
  });
});

describe('comparison ignores scale', () => {
  it('treats 2 and 2.00 as equal', () => {
    expect(d('2').compareTo(d('2.00'))).toBe(0);
  });

  it('orders correctly across scales', () => {
    expect(d('12348').compareTo(d('12348.01'))).toBe(-1);
    expect(d('17800').compareTo(d('17799'))).toBe(1);
  });
});

describe('longValue truncates toward zero', () => {
  it('drops the fraction', () => {
    expect(d('12.99').longValue()).toBe(12n);
    expect(d('-12.99').longValue()).toBe(-12n);
  });
});

describe('no floating point anywhere', () => {
  // The canonical demonstration: 0.1 + 0.2 must be exactly 0.3.
  it('adds tenths exactly', () => {
    expect(d('0.1').add(d('0.2')).toString()).toBe('0.3');
  });

  it('handles magnitudes far beyond float precision', () => {
    const big = d('99999999999999999999.99');
    expect(big.add(d('0.01')).toString()).toBe('100000000000000000000.00');
  });

  it('reproduces the PAP tariff shape exactly', () => {
    // Zone 3 of § 32a EStG as UPTAB26 states it:
    //   Y  = (X - 17799) / 10000, truncated to 6 decimal places
    //   ST = (173,1 * Y + 2397) * Y + 1034,87
    //
    // Cross-checked against an independent arbitrary-precision evaluation
    // (Python `decimal`, 50 digits): ST = 7209.6325981310000 exactly, which
    // truncates to 7209,63. Asserted to the cent rather than approximately —
    // "close to" would hide precisely the drift this module exists to prevent.
    const X = d('40000');
    const Y = X.subtract(d('17799')).divideScaled(d('10000'), 6, 'DOWN');
    expect(Y.toString()).toBe('2.220100');

    const st = Y.multiply(d('173.1')).add(d('2397')).multiply(Y).add(d('1034.87'));
    expect(st.setScale(2, 'DOWN').toString()).toBe('7209.63');
  });
});
