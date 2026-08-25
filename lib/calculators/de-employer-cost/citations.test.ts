import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { UNSUPPORTED_CASES, DECLARED_CASES } from './unsupported';
import { BUNDESLAND_NAMES } from './tax/church-tax';

const ROOT = path.join(__dirname, '..', '..', '..');
const byId = (id: string) => UNSUPPORTED_CASES.find((c) => c.id === id)!;

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

/**
 * The page's own account of what it refuses must match what it refuses.
 *
 * The methodology paragraph enumerated ten declared cases while the registry
 * declared fifteen and the form rendered fifteen checkboxes. Short-term
 * employment, apprentices, working students, internships and construction were
 * refused by the calculator and absent from the page's list of what it refuses
 * — so a reader consulting the methodology to learn whether an apprentice can
 * be calculated was told, by omission, that one can.
 *
 * Keyed on a distinguishing word per case per language rather than on a count,
 * because a count passes when a case is swapped for another.
 */
describe('the methodology lists every case the calculator declares', () => {
  const KEYWORDS: Record<string, { de: RegExp; en: RegExp; cs: RegExp }> = {
    'kurzfristige-beschaeftigung': { de: /kurzfristige/i, en: /short-term/i, cs: /krátkodobé/i },
    ausbildung: { de: /Auszubildende/i, en: /apprentice/i, cs: /učn/i },
    freiwilligendienst: { de: /Freiwilligendienste/i, en: /voluntary service/i, cs: /dobrovolnick/i },
    pkv: { de: /private Krankenversicherung/i, en: /private health/i, cs: /soukromé zdravotní/i },
    beamte: { de: /Beamte/i, en: /civil servant/i, cs: /úřed/i },
    mehrfachbeschaeftigung: { de: /Mehrfachbeschäftigung/i, en: /concurrent employ/i, cs: /souběh/i },
    'rentner-beschaeftigt': { de: /Rentner/i, en: /working pensioner/i, cs: /důchodce/i },
    knappschaft: { de: /knappschaftliche/i, en: /miners/i, cs: /hornick/i },
    versorgungswerk: { de: /Versorgungswerke/i, en: /professional pension/i, cs: /profesní zaopatřovací/i },
    kurzarbeit: { de: /Kurzarbeit/i, en: /short-time/i, cs: /kurzarbeit/i },
    einmalzahlung: { de: /Einmalzahlungen/i, en: /one-off/i, cs: /jednorázové/i },
    grenzueberschreitend: { de: /grenzüberschreitende/i, en: /cross-border/i, cs: /přeshraniční/i },
    werkstudent: { de: /Werkstudenten/i, en: /working student/i, cs: /studenty/i },
    praktikum: { de: /Praktika/i, en: /internship/i, cs: /praxe|stáž/i },
    baugewerbe: { de: /Baugewerbe/i, en: /construction/i, cs: /stavebnictví/i },
    sachbezug: { de: /Sachbezüge/i, en: /benefits in kind/i, cs: /nepeněžní/i },
  };

  const PROSE: Record<string, string> = {
    de: fs.readFileSync(path.join(ROOT, 'lib/locale/content/de/calculators.ts'), 'utf8'),
    en: fs.readFileSync(path.join(ROOT, 'lib/locale/content/en/calculators.ts'), 'utf8'),
    cs: fs.readFileSync(
      path.join(ROOT, 'lib/content/pages/germany-employer-cost-calculator.ts'),
      'utf8',
    ),
  };

  it('every declared case has a keyword, so a new case cannot be added silently', () => {
    const declared = DECLARED_CASES.map((c) => c.id).sort();
    expect(Object.keys(KEYWORDS).sort()).toEqual(declared);
  });

  for (const c of DECLARED_CASES) {
    for (const locale of ['de', 'en', 'cs'] as const) {
      it(`${c.id} appears in the ${locale} methodology`, () => {
        expect(
          KEYWORDS[c.id][locale].test(PROSE[locale]),
          `${c.id} is refused by the calculator but not named on the ${locale} page`,
        ).toBe(true);
      });
    }
  }
});

/**
 * Sentences that were FALSE, in one language only, and must not come back.
 *
 * Each of these was written into the Czech or German text of a refusal while
 * the other two languages said something weaker and correct — which is the
 * failure mode worth naming: the registry entries were written per language
 * rather than translated, so a reader of one language was told something no
 * reader of the others was, and no test compared them.
 */
describe('no refusal reason asserts something its siblings do not', () => {

  it('Kurzarbeit names no bearer of the contributions in any language', () => {
    // The Czech text said "část hradí Spolková agentura práce" — that part of
    // the contributions is borne by the Federal Employment Agency. Under the
    // ordinary 2026 rule the employer bears them ALONE on the fictitious pay
    // (§ 249 Absatz 2 SGB V, § 168 Absatz 1 Nummer 1a SGB VI, § 58 Absatz 1
    // Satz 2 SGB XI — NOT Absatz 5, which is the Übergangsbereich cross-
    // reference); BA reimbursement was a temporary crisis measure and has
    // lapsed.
    // The German and English texts named no bearer at all.
    const c = byId('kurzarbeit');
    for (const text of [c.reasonDe, c.reasonEn, c.reasonCs]) {
      expect(/Bundesagentur|Spolková agentura|Federal Employment Agency/i.test(text), text).toBe(false);
    }
  });

  it('Versorgungswerk states the exemption as conditional, not automatic', () => {
    // § 6 Absatz 1 Satz 1 Nummer 1 SGB VI grants it ON APPLICATION and only for
    // the employment applied for. The Czech text said members "jsou osvobozeni"
    // — are exempt — as a status following from chamber membership, and dropped
    // the employer subsidy that is the reason the calculation cannot be run.
    const c = byId('versorgungswerk');
    expect(c.reasonCs).toMatch(/na žádost/);
    expect(c.reasonCs).toMatch(/§ 172a SGB VI/);
    expect(/Befreiung/.test(c.reasonDe), c.reasonDe).toBe(true);
  });

  it('the Minijob refusal describes a boundary it actually fires at', () => {
    // The refusal is INCLUSIVE at 603,00 EUR — § 8 Absatz 1 Nummer 1 SGB IV
    // covers pay that "die Geringfügigkeitsgrenze nicht übersteigt" — so
    // "Unterhalb" / "Below" was false of the very case that triggers it, and
    // contradicted the ceilings list on the same screen.
    const c = byId('minijob');
    expect(/^Unterhalb/.test(c.reasonDe), c.reasonDe).toBe(false);
    expect(/^Below/.test(c.reasonEn), c.reasonEn).toBe(false);
    expect(c.reasonDe).toMatch(/Bis einschließlich/);
    expect(c.reasonEn).toMatch(/Up to and including/);
  });

  it('the U2 warning does not claim the levy binds every employer without exception', () => {
    // § 11 AAG ("Ausnahmevorschriften") Absatz 2 disapplies § 1 entirely to
    // farming family members and to NATO-stationed forces, and § 1 Absatz 2
    // itself excludes the landwirtschaftliche Krankenkasse. The distinguishing
    // fact about U2 is that it does not stop at 30 employees the way U1 does.
    const COPY = fs.readFileSync(path.join(ROOT, 'lib/calculators/de-employer-cost/copy.ts'), 'utf8');
    const note = COPY.slice(COPY.indexOf("'de.note.u2Missing'"), COPY.indexOf("'de.note.u2Missing'") + 800);
    expect(/für jeden Arbeitgeber verpflichtend/.test(note), note.slice(0, 200)).toBe(false);
    expect(/compulsory for every employer/.test(note), note.slice(0, 200)).toBe(false);
    expect(/povinný pro každého zaměstnavatele/.test(note), note.slice(0, 200)).toBe(false);
    expect(note).toMatch(/§ 11 AAG/);
  });
});

describe('two statements about German law that were wrong in the code, not the copy', () => {
  it('the Vorsorgepauschale constant is attributed to § 243 SGB V, not § 241', () => {
    // 0,07 is half of the ERMÄSSIGTER Beitragssatz of 14,0 % (§ 243 SGB V). The
    // allgemeiner Beitragssatz is 14,6 % (§ 241 SGB V) and its half is 0,073.
    // § 39b Absatz 2 Satz 5 Nummer 3 Buchstabe b EStG names § 243 expressly, and
    // so does page 2 of the Anlage 1 this file transcribes. rules.ts warns
    // separately that reusing the fictitious rate as the real contribution
    // understates every employee's health deduction by 0,3 points — a warning
    // the comment here used to invert by naming the wrong statute.
    const PAP = fs.readFileSync(
      path.join(ROOT, 'lib/calculators/de-employer-cost/tax/pap-2026.ts'),
      'utf8',
    );
    const mpara = PAP.slice(PAP.indexOf('function MPARA'), PAP.indexOf('function MRE4JL'));
    expect(mpara).toMatch(/ERMÄSSIGTER Beitragssatz/);
    expect(mpara).toMatch(/§ 243 SGB V/);
    expect(
      /half of the 14 % allgemeiner|employee's half of the 14 % allgemeiner/.test(mpara),
      'the 14 % is attributed to the allgemeiner Beitragssatz again',
    ).toBe(false);
  });

  it('the Baugewerbe refusal does not call a federal ordinance a collective agreement', () => {
    // § 3 WinterbeschV fixes the Winterbeschäftigungs-Umlage rates nationally by
    // Rechtsverordnung — 2,0 % in the Baugewerbe, split between employer and
    // employee by the same provision. The Sozialkassen contributions ARE
    // collective-agreement based, and the German and English texts said "both"
    // were, which was false of the levy they name first. The Czech text made no
    // such claim, so only two of the three readers were told it.
    const c = byId('baugewerbe');
    expect(c.reasonDe).toMatch(/§ 3 WinterbeschV/);
    expect(c.reasonEn).toMatch(/§ 3 WinterbeschV/);
    expect(c.reasonCs).toMatch(/§ 3 WinterbeschV/);
    expect(
      /Beide sind tarifvertraglich geregelt/.test(c.reasonDe),
      'the German text calls both levies collectively agreed again',
    ).toBe(false);
    expect(
      /Both are set by collective agreement/.test(c.reasonEn),
      'the English text calls both levies collectively agreed again',
    ).toBe(false);
  });
});
