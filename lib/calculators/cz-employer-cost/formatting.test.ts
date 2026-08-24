import { describe, it, expect } from 'vitest';
import {
  formatCzk,
  formatCzkPerHour,
  formatCzkPrecise,
  formatCzkSigned,
  formatHours,
  formatNumber,
  formatPerMille,
  formatPercent,
  formatRatioPercent,
  type CalculatorLocale,
} from './formatting';
import { czk, ZERO, type Halere } from '../../payroll/money';

const LOCALES: readonly CalculatorLocale[] = ['cs', 'en', 'de'];

/**
 * Intl uses U+00A0 (and in some builds U+202F) around groups and currency
 * symbols. Asserting on the exact codepoint would make these tests fail on an
 * ICU update without anything actually being wrong, so comparisons normalise
 * every kind of space to a plain one.
 */
const norm = (s: string) => s.replace(/[   ]/g, ' ');

describe('locale separators follow each locale, not the Czech one', () => {
  it('formats whole koruny per locale', () => {
    expect(norm(formatCzk(czk(22_400), 'cs'))).toBe('22 400 Kč');
    expect(norm(formatCzk(czk(22_400), 'en'))).toBe('CZK 22,400');
    expect(norm(formatCzk(czk(22_400), 'de'))).toBe('22.400 CZK');
  });

  it('formats decimals per locale', () => {
    expect(norm(formatNumber(1_234.56, 'cs'))).toBe('1 234,56');
    expect(norm(formatNumber(1_234.56, 'en'))).toBe('1,234.56');
    expect(norm(formatNumber(1_234.56, 'de'))).toBe('1.234,56');
  });

  it('spaces the percent sign the way each locale does', () => {
    expect(norm(formatPercent(7.1, 'cs'))).toBe('7,1 %');
    expect(norm(formatPercent(7.1, 'en'))).toBe('7.1%');
    expect(norm(formatPercent(7.1, 'de'))).toBe('7,1 %');
  });

  it('formats per-mille for the liability-insurance rate', () => {
    expect(norm(formatPerMille(5.04, 'cs'))).toBe('5,04 ‰');
    expect(norm(formatPerMille(5.04, 'en'))).toBe('5.04‰');
  });
});

// §35 / §37: the currency is Czech in every locale. A German page must never
// show euro — that would invent a rate AND read as German payroll.
describe('currency is CZK in all three locales and is never converted', () => {
  it('never emits a euro, dollar or pound sign', () => {
    for (const locale of LOCALES) {
      const s = formatCzk(czk(50_000), locale);
      expect(s, locale).not.toMatch(/[€$£]/);
      expect(s, locale).toMatch(/Kč|CZK/);
    }
  });

  it('formats the same amount as the same number of units in every locale', () => {
    const digitsOf = (s: string) => s.replace(/[^0-9]/g, '');
    const amounts = [0, 1, 999, 22_400, 146_901, 2_350_416];
    for (const a of amounts) {
      const rendered = LOCALES.map((l) => digitsOf(formatCzk(czk(a), l)));
      expect(new Set(rendered).size, `amount ${a} rendered as ${rendered.join(' / ')}`).toBe(1);
    }
  });
});

// The core property of this module: it is presentation, never arithmetic.
describe('formatting does not change the value — §35', () => {
  it('is a pure function of (value, locale)', () => {
    const v = czk(48_967);
    for (const locale of LOCALES) {
      expect(formatCzk(v, locale)).toBe(formatCzk(v, locale));
    }
  });

  it('rounds whole-koruna display without touching the haléře value', () => {
    // 1 234,56 Kč displays as 1 235 Kč whole, and 1 234,56 Kč precise.
    const v = czk(1_234.56);
    expect(norm(formatCzk(v, 'cs'))).toBe('1 235 Kč');
    expect(norm(formatCzkPrecise(v, 'cs'))).toBe('1 234,56 Kč');
    // The value itself is untouched — 123 456 haléře.
    expect(v).toBe(123_456);
  });

  it('shows whole koruny without false decimal precision', () => {
    expect(norm(formatCzk(czk(22_400), 'cs'))).not.toMatch(/,00/);
    expect(norm(formatCzk(czk(22_400), 'de'))).not.toMatch(/,00/);
    expect(norm(formatCzk(czk(22_400), 'en'))).not.toMatch(/\.00/);
  });
});

describe('signed differences', () => {
  it('marks a positive difference explicitly', () => {
    expect(norm(formatCzkSigned(czk(3_456), 'cs'))).toBe('+3 456 Kč');
  });

  it('leaves zero unsigned', () => {
    expect(norm(formatCzkSigned(ZERO, 'cs'))).toBe('0 Kč');
    expect(formatCzkSigned(ZERO, 'cs')).not.toMatch(/^\+/);
  });

  it('does not double-sign a negative', () => {
    const s = formatCzkSigned(czk(-500), 'cs');
    expect(s).not.toMatch(/\+/);
    expect(s).toMatch(/-|−/);
  });
});

describe('ratios', () => {
  it('computes a percentage of one amount against another', () => {
    // 26 058 / 32 000 = 81,43 %
    expect(norm(formatRatioPercent(czk(26_058), czk(32_000), 'cs'))!).toBe('81,4 %');
    expect(norm(formatRatioPercent(czk(26_058), czk(32_000), 'en'))!).toBe('81.4%');
  });

  it('returns null rather than a number when the ratio does not exist', () => {
    // Gross of zero: there is no net-to-gross ratio, and "0 %" would assert one.
    expect(formatRatioPercent(czk(1_000), ZERO, 'cs')).toBeNull();
  });

  it('honours the requested precision', () => {
    expect(norm(formatRatioPercent(czk(1), czk(3), 'cs', 2))!).toBe('33,33 %');
    expect(norm(formatRatioPercent(czk(1), czk(3), 'cs', 0))!).toBe('33 %');
  });
});

describe('units', () => {
  it('formats hourly rates and hours', () => {
    expect(norm(formatCzkPerHour(czk(134.4), 'cs'))).toBe('134,40 Kč/h');
    expect(norm(formatHours(162.5, 'cs'))).toBe('162,5 h');
  });
});

describe('edge values', () => {
  it('formats zero in every locale', () => {
    for (const locale of LOCALES) {
      expect(formatCzk(ZERO, locale), locale).toMatch(/0/);
    }
  });

  it('formats the annual maximum assessment base without loss', () => {
    expect(norm(formatCzk(czk(2_350_416), 'cs'))).toBe('2 350 416 Kč');
    expect(norm(formatCzk(czk(2_350_416), 'en'))).toBe('CZK 2,350,416');
    expect(norm(formatCzk(czk(2_350_416), 'de'))).toBe('2.350.416 CZK');
  });

  it('never emits NaN or Infinity', () => {
    const weird = [Number.NaN, Number.POSITIVE_INFINITY] as unknown as Halere[];
    for (const w of weird) {
      // Intl renders these as "NaN"/"∞"; the guard is that no caller can reach
      // here with such a value, because money.ts refuses to brand one.
      expect(() => czk(w as unknown as number)).toThrow();
    }
  });
});
