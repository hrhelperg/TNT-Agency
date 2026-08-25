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
        expect(parseEuroToCent(rendered, locale), `${locale} formatEuro ${cent} -> "${rendered}"`).toBe(cent);
      }
      // The whole-euro renderer drops the decimals entirely, which is the form
      // that broke: "3.500 €" has a lone separator followed by a full group.
      for (const cent of amounts.filter((c) => c % 100n === 0n)) {
        const rendered = formatEuroWhole(cent, locale).replace(/[€\s ]/g, '');
        expect(parseEuroToCent(rendered, locale), `${locale} formatEuroWhole ${cent} -> "${rendered}"`).toBe(cent);
      }
    }
  });

  it('reads a lone separator followed by a full group as grouping — when the locale allows it', () => {
    // "3.500" cannot be 3 euro 500, because money has one or two decimals and
    // never three. On the German and Czech routes that reading is available
    // for '.' and NOT for ',', which is their decimal separator; on the
    // English route it is the other way round. This is the module reading its
    // own output, so each case is checked in the locale that produces it.
    for (const [input, locale, cent] of [
      ['3.500', 'de', 350_000n], ['3.500', 'cs', 350_000n], ['3,500', 'en', 350_000n],
      ['43.554', 'de', 4_355_400n], ['12.500', 'de', 1_250_000n], ['12,500', 'en', 1_250_000n],
    ] as const) {
      expect(parseEuroToCent(input, locale), `${input} @ ${locale}`).toBe(cent);
    }
  });

  it('REFUSES the ambiguous three-decimal form rather than multiplying it by a thousand', () => {
    // The defect this closes: on a German page "12,500" was read as twelve
    // thousand five hundred euro. Typed into the accident-insurance field on a
    // 3 000 EUR gross it moved employer cost from 3 651,50 to 16 139,00 with no
    // error, no warning and no refusal. A leading-zero guard closed "0,500" and
    // left 1..999 open — the guard was reasoning about the digits, and the
    // digits do not contain the answer. The locale does.
    for (const [bad, locale] of [
      ['12,500', 'de'], ['12,500', 'cs'], ['1,000', 'de'], ['2,505', 'de'],
      ['100,500', 'de'], ['0,500', 'de'], ['00,500', 'de'], ['0,000', 'de'],
      ['12.500', 'en'], ['0.500', 'en'], ['1.000', 'en'], ['00.500', 'en'],
    ] as const) {
      expect(parseEuroToCent(bad, locale), `${bad} @ ${locale}`).toBeNull();
    }
  });

  it('a repeated separator is grouping in every locale, because a decimal point cannot repeat', () => {
    for (const locale of ['de', 'en', 'cs'] as const) {
      expect(parseEuroToCent('1.000.000', locale), `1.000.000 @ ${locale}`).toBe(100_000_000n);
      expect(parseEuroToCent('1,000,000', locale), `1,000,000 @ ${locale}`).toBe(100_000_000n);
    }
  });

  it('still reads a lone separator followed by one or two digits as a decimal', () => {
    for (const locale of ['de', 'en', 'cs'] as const) {
      expect(parseEuroToCent('3.5', locale)).toBe(350n);
      expect(parseEuroToCent('3,5', locale)).toBe(350n);
      expect(parseEuroToCent('3.50', locale)).toBe(350n);
      expect(parseEuroToCent('3,50', locale)).toBe(350n);
      expect(parseEuroToCent('0,01', locale)).toBe(1n);
      expect(parseEuroToCent('0,50', locale)).toBe(50n);
      expect(parseEuroToCent('0.5', locale)).toBe(50n);
      expect(parseEuroToCent('0,05', locale)).toBe(5n);
      // Leading zeros on a plain decimal are harmless and stay accepted.
      expect(parseEuroToCent('00,50', locale)).toBe(50n);
      expect(parseEuroToCent('000,50', locale)).toBe(50n);
    }
  });

  it('reads both separator conventions, whatever the page language', () => {
    // With both separators present the later one is the decimal point, which
    // needs no locale — so a cross-locale paste still works in either
    // direction.
    for (const locale of ['de', 'en', 'cs'] as const) {
      expect(parseEuroToCent('1.234,56', locale)).toBe(123_456n);
      expect(parseEuroToCent('1,234.56', locale)).toBe(123_456n);
      expect(parseEuroToCent('4000', locale)).toBe(400_000n);
      expect(parseEuroToCent('4000,5', locale)).toBe(400_050n);
      expect(parseEuroToCent(' 3 500,00 € ', locale)).toBe(350_000n);
      expect(parseEuroToCent('1 000', locale)).toBe(100_000n);
      expect(parseEuroToCent('1.000,50', locale)).toBe(100_050n);
      expect(parseEuroToCent('1,000.50', locale)).toBe(100_050n);
      expect(parseEuroToCent('1.234.567,89', locale)).toBe(123_456_789n);
      expect(parseEuroToCent('1,234,567.89', locale)).toBe(123_456_789n);
    }
  });

  it('returns null rather than zero for anything unreadable', () => {
    // The distinction that matters: a typo must not become a confident answer.
    for (const bad of [
      '', 'abc', '-100', '1.2.3,4', '4000,555', '1e5', '12.34,5', '1.2345,00',
      // Four or more digits after a lone separator is neither a decimal nor a
      // group, so it is refused rather than guessed at.
      '3.5000', '3,5000', '1.23.456',
    ]) {
      expect(parseEuroToCent(bad, 'de'), bad).toBeNull();
      expect(parseEuroToCent(bad, 'en'), bad).toBeNull();
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
