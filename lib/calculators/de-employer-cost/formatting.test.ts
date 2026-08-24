import { describe, it, expect } from 'vitest';
import { formatEuro, formatPercent, formatFactor, parseEuroToCent, parsePercent } from './formatting';

const nbsp = (s: string) => s.replace(/ | /g, ' ');

describe('formatting is locale-explicit', () => {
  it('renders the same amount three ways, always with the symbol', () => {
    expect(nbsp(formatEuro(123_456n, 'de'))).toBe('1.234,56 €');
    expect(nbsp(formatEuro(123_456n, 'en'))).toBe('€1,234.56');
    expect(nbsp(formatEuro(123_456n, 'cs'))).toBe('1 234,56 €');
  });

  it('keeps a rate at the precision the source publishes it', () => {
    expect(nbsp(formatPercent('1.8', 'de'))).toBe('1,8 %');
    expect(nbsp(formatPercent('1.55', 'de'))).toBe('1,55 %');
    expect(nbsp(formatPercent('1.30', 'de'))).toBe('1,3 %');
    expect(nbsp(formatPercent('9.3', 'en'))).toBe('9.3 %');
    expect(nbsp(formatPercent('0', 'de'))).toBe('0 %');
  });

  it('formats the load factor', () => {
    expect(nbsp(formatFactor('1.2154', 'de'))).toBe('1,22 ×');
  });

  it('refuses to format an amount beyond exact float range', () => {
    expect(() => formatEuro(BigInt(Number.MAX_SAFE_INTEGER) + 1n, 'de')).toThrow(/too large/);
  });
});

describe('parsing accepts what people actually paste', () => {
  it('reads both separator conventions', () => {
    expect(parseEuroToCent('1.234,56')).toBe(123_456n);
    expect(parseEuroToCent('1,234.56')).toBe(123_456n);
    expect(parseEuroToCent('4000')).toBe(400_000n);
    expect(parseEuroToCent('4000,5')).toBe(400_050n);
    expect(parseEuroToCent(' 3 500,00 € ')).toBe(350_000n);
    expect(parseEuroToCent('1.234.567,89')).toBe(123_456_789n);
    expect(parseEuroToCent('1,234,567.89')).toBe(123_456_789n);
  });

  it('returns null rather than zero for anything unreadable', () => {
    // The distinction that matters: a typo must not become a confident answer.
    for (const bad of ['', 'abc', '-100', '1.2.3,4', '4000,555', '1e5', '12.34,5', '1.2345,00']) {
      expect(parseEuroToCent(bad), bad).toBeNull();
    }
  });

  it('reads a percentage as a string, unchanged', () => {
    expect(parsePercent('2,9')).toBe('2.9');
    expect(parsePercent('2.90')).toBe('2.90');
    expect(parsePercent('0')).toBe('0');
    expect(parsePercent('%')).toBeNull();
    expect(parsePercent('2.905')).toBeNull();
  });
});
