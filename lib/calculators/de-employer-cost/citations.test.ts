import { describe, it, expect } from 'vitest';
import { UNSUPPORTED_CASES } from './unsupported';
import { BUNDESLAND_NAMES } from './tax/church-tax';

/**
 * Citations that were wrong, and must not come back.
 *
 * A refusal carries a statutory reference so a reader can check it. A WRONG
 * reference is worse than none: it looks checkable, and the reader who follows
 * it finds a provision about something else and cannot tell whether the
 * calculator or the citation is confused.
 *
 * All three of these shipped in a previous candidate, and all three were
 * written by the same hand that wrote the refusals they justify.
 */
describe('the refusal registry cites the right provisions', () => {
  const allText = UNSUPPORTED_CASES.flatMap((c) => [c.reasonDe, c.reasonEn, c.reasonCs]).join('\n');

  it('does not cite § 8 Absatz 3 SGB IV for the apprentice rule', () => {
    // § 8 Absatz 3 SGB IV reads "Die Absätze 1, 1a und 2 gelten entsprechend,
    // soweit anstelle einer Beschäftigung eine selbständige Tätigkeit ausgeübt
    // wird" — it is about SELF-EMPLOYMENT and says nothing about apprentices.
    expect(allText).not.toMatch(/§\s*8\s*(Absatz|odst\.)\s*3/);
  });

  it('does not cite § 20 Absatz 2 Satz 2 SGB IV for the apprentice exclusion', () => {
    // That Satz is the aggregation rule for multiple employments. The exclusion
    // is § 20 Absatz 2a Satz 9: "Die Sätze 1 und 6 gelten nicht für Personen,
    // die zu ihrer Berufsausbildung beschäftigt sind."
    expect(allText).not.toMatch(/§\s*20\s*(Absatz|odst\.)\s*2\s*(Satz|věta)\s*2/);
    expect(allText).toMatch(/§\s*20\s*(Absatz|odst\.)\s*2a\s*(Satz|věta)\s*9/);
  });

  it('cites the provision that actually keeps an apprentice insured', () => {
    // § 7 Absatz 1 Satz 1 SGB V: geringfügig Beschäftigte are versicherungsfrei,
    // "dies gilt nicht für eine Beschäftigung 1. im Rahmen betrieblicher
    // Berufsbildung".
    expect(allText).toMatch(/§\s*7\s*(Absatz|odst\.)\s*1/);
  });

  it('does not claim the short-term exemption applies whatever the pay', () => {
    // § 8 Absatz 1 Nummer 2 SGB IV carries an express exception: "es sei denn,
    // dass die Beschäftigung berufsmäßig ausgeübt wird UND die
    // Geringfügigkeitsgrenze übersteigt".
    expect(allText).not.toMatch(/unabhängig von der Höhe des Entgelts/i);
    expect(allText).not.toMatch(/whatever the pay/i);
    expect(allText).not.toMatch(/bez ohledu na výši mzdy/i);
    const kurz = UNSUPPORTED_CASES.find((c) => c.id === 'kurzfristige-beschaeftigung')!;
    expect(kurz.reasonDe).toMatch(/berufsmäßig/);
    expect(kurz.reasonEn).toMatch(/occupationally/);
  });

  it('states nothing about Beamte that is false of a Czech reader’s úředníci', () => {
    // The Czech text had dropped the hedge the German and English carry and
    // asserted flatly that úředníci pay no social insurance — false in Czechia,
    // on a page a Czech speaker reads.
    const beamte = UNSUPPORTED_CASES.find((c) => c.id === 'beamte')!;
    expect(beamte.reasonCs).toMatch(/Němečtí|německ/i);
    expect(beamte.labelCs).toMatch(/vojáci/);
  });
});

describe('the Bundesland names are localized', () => {
  it('gives every Land a name in each language', () => {
    for (const [code, names] of Object.entries(BUNDESLAND_NAMES)) {
      for (const locale of ['de', 'en', 'cs'] as const) {
        expect(names[locale]?.length, `${code}.${locale}`).toBeGreaterThan(3);
      }
    }
  });

  it('does not show the German name to a Czech reader where a Czech one exists', () => {
    // The Land that actually matters is Saxony: the prose says "v Sasku" and
    // explains that its care-insurance split differs, so a control offering
    // only "Sachsen" leaves the reader unable to match the two.
    expect(BUNDESLAND_NAMES.SN.cs).toBe('Sasko');
    expect(BUNDESLAND_NAMES.SN.en).toBe('Saxony');
    expect(BUNDESLAND_NAMES.BY.cs).toBe('Bavorsko');
    expect(BUNDESLAND_NAMES.NW.cs).not.toBe(BUNDESLAND_NAMES.NW.de);
  });

  it('keeps names identical only where the languages genuinely agree', () => {
    // Baden-Württemberg, Berlin, Brandenburg, Hamburg, Saarland and
    // Schleswig-Holstein are the same word in German and English; that is not a
    // missing translation.
    const same = Object.entries(BUNDESLAND_NAMES).filter(([, n]) => n.de === n.en).map(([c]) => c);
    expect(same.sort()).toEqual(['BB', 'BE', 'BW', 'HB', 'HH', 'SH', 'SL']);
  });
});
