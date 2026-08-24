import { describe, it, expect } from 'vitest';
import { formatEuro, formatEuroWhole, formatPercent, formatFactor, parseEuroToCent, parsePercent } from './formatting';

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
  /**
   * The property that would have caught the defect: whatever the module renders,
   * it must be able to read back.
   *
   * An earlier parser treated the last separator as the decimal point
   * unconditionally, so "3.500" — how a German writes three thousand five
   * hundred — returned null, and formatEuroWhole's own "3.500 €" was
   * unreadable. Three separate example-based tests passed throughout.
   */
  it('round-trips everything it formats, in every locale', () => {
    const amounts = [0n, 1n, 99n, 100n, 12_345n, 350_000n, 581_250n, 100_000_000n, 999_999_999n];
    for (const locale of ['de', 'en', 'cs'] as const) {
      for (const cent of amounts) {
        const rendered = formatEuro(cent, locale).replace(/[€\s ]/g, '');
        expect(parseEuroToCent(rendered), `${locale} formatEuro ${cent} -> "${rendered}"`).toBe(cent);
      }
      // The whole-euro renderer drops the decimals entirely, which is the form
      // that broke: "3.500 €" has a lone separator followed by a full group.
      for (const cent of amounts.filter((c) => c % 100n === 0n)) {
        const rendered = formatEuroWhole(cent, locale).replace(/[€\s ]/g, '');
        expect(parseEuroToCent(rendered), `${locale} formatEuroWhole ${cent} -> "${rendered}"`).toBe(cent);
      }
    }
  });

  it('reads a lone separator followed by a full group as grouping, not a decimal', () => {
    // Money has one or two decimals, never three, so "3.500" cannot be 3 euro
    // 500. Both conventions mean the same number.
    for (const [input, cent] of [
      ['3.500', 350_000n], ['3,500', 350_000n],
      ['43.554', 4_355_400n], ['12.500', 1_250_000n],
      ['1.000.000', 100_000_000n], ['1,000,000', 100_000_000n],
    ] as const) {
      expect(parseEuroToCent(input), input).toBe(cent);
    }
  });

  it('still reads a lone separator followed by one or two digits as a decimal', () => {
    expect(parseEuroToCent('3.5')).toBe(350n);
    expect(parseEuroToCent('3,5')).toBe(350n);
    expect(parseEuroToCent('3.50')).toBe(350n);
    expect(parseEuroToCent('3,50')).toBe(350n);
    expect(parseEuroToCent('0,01')).toBe(1n);
  });

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
    for (const bad of [
      '', 'abc', '-100', '1.2.3,4', '4000,555', '1e5', '12.34,5', '1.2345,00',
      // Four or more digits after a lone separator is neither a decimal nor a
      // group, so it is refused rather than guessed at.
      '3.5000', '3,5000', '1.23.456',
    ]) {
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
