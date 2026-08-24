/**
 * Czech monthly employment income tax — § 38h zákona č. 586/1992 Sb. (ZDP).
 *
 * THE ORDER IS THE LAW
 * ────────────────────
 * § 38h odst. 1 → 2 → 3, then § 35d odst. 3 → 4:
 *
 *   0. base   = § 6 income accrued by THIS payer this month, less income outside
 *               the scope of tax, exempt income, and income taxed by withholding
 *   1. ROUND  the base UP — to whole koruny if it is 100 Kč or less, to whole
 *               hundreds if it is more
 *   2. SPLIT  15 % up to 146 901 Kč, 23 % above it
 *   3. ROUND  the advance UP to whole koruny
 *   4. LESS   § 35ba monthly credits, capped at the advance — never a refund
 *   5. LESS   § 35c monthly child benefit, capped at what remains
 *   6. EXCESS child benefit becomes the monthly tax bonus, subject to two gates
 *
 * Both roundings happen BEFORE any credit. Nothing is re-rounded afterwards:
 * credits, the child benefit and the bonus are whole-koruna statutory amounts.
 *
 * SUPERHRUBÁ MZDA IS GONE
 * ───────────────────────
 * § 6 odst. 12 now reads "Základem daně (dílčím základem daně) jsou příjmy ze
 * závislé činnosti." The base is plain gross taxable pay: it is NOT uplifted by
 * the employer's contributions, and the employee's own 7,1 % and 4,5 % are NOT
 * deductible from it. Both mistakes are common in older material.
 *
 * WITHHOLDING TAX CAN HAPPEN INSIDE AN ORDINARY EMPLOYMENT
 * ───────────────────────────────────────────────────────
 * § 6 odst. 4 písm. b) is not restricted to dohody. When an employee has NOT
 * signed a prohlášení with this payer AND the month's gross from this payer does
 * not reach the rozhodný příjem (4 500 Kč for 2026), the income is a separate
 * base taxed by srážková daň: flat 15 %, no credits, no child benefit, and
 * rounding DOWN rather than up. A full-time month never reaches this — the
 * minimum wage is 22 400 Kč — but a mid-month start, unpaid leave or a very
 * small part-time contract does, and a calculator that always applies the
 * advance regime gets those months wrong in both direction and amount.
 *
 * WHAT THIS FUNCTION DELIBERATELY DOES NOT CHECK
 * ──────────────────────────────────────────────
 * § 35ba odst. 3 makes the disability and ZTP/P credits conditional on the
 * qualifying facts holding at the START of the calendar month, and § 35c odst. 10
 * does the same for each child. Those are facts about a person on a date, not
 * anything derivable from a salary figure. The engine applies what the user
 * asserts and returns a note saying the start-of-month test is the user's to
 * satisfy — rather than silently implying it has been checked.
 */

import {
  add,
  clampNonNegative,
  czk,
  maxHalere,
  minHalere,
  percentOf,
  roundToCzk,
  roundToHundredCzk,
  subtract,
  sum,
  ZERO,
  type Halere,
} from '../../payroll/money';
import type { CzRuleset } from './jurisdictions/cz/ruleset';
import type { EngineNote, LineItem, TaxProfileInput, TaxResult } from './types';

const HUNDRED_CZK = czk(100);

/**
 * § 38h odst. 1, last sentence: "Základ pro výpočet zálohy do 100 Kč se
 * zaokrouhlí na celé koruny nahoru a nad 100 Kč na celé stokoruny nahoru."
 *
 * Both branches round UP; only the unit differs. "do 100 Kč" is inclusive, so a
 * base of exactly 100 Kč stays in the low branch and stays 100.
 */
export function roundTaxBase(base: Halere): Halere {
  if (base <= HUNDRED_CZK) return roundToCzk(base, 'up');
  return roundToHundredCzk(base, 'up');
}

/**
 * § 38h odst. 3: the advance rounds UP to whole koruny.
 *
 * Applied once, to the sum of both bands. Splitting the rounding across bands
 * would round twice and could overstate the advance by a koruna.
 */
export function roundTaxAdvance(advance: Halere): Halere {
  return roundToCzk(advance, 'up');
}

/** § 36 odst. 3: withholding tax rounds DOWN, at both steps. */
export function roundWithholdingTax(value: Halere): Halere {
  return roundToCzk(value, 'down');
}

/** Monthly child benefit for the profile's children, before any cap. */
function childBenefitFor(profile: TaxProfileInput, rules: CzRuleset): Halere {
  const b = rules.childBenefit;
  const amounts = profile.children.map((child, index) => {
    const base =
      index === 0
        ? b.firstMonthly.value
        : index === 1
          ? b.secondMonthly.value
          : b.thirdPlusMonthly.value;
    return czk(child.ztpp ? base * b.ztppMultiplier.value : base);
  });
  return amounts.length ? sum(amounts) : ZERO;
}

/**
 * Monthly § 35ba personal credits the profile may claim FROM THIS PAYER.
 *
 * Gated twice, and the two gates are independent:
 *   • without a signed prohlášení, § 38h odst. 5 allows nothing at all — not
 *     even the basic taxpayer credit;
 *   • a non-resident may claim only the basic credit monthly (§ 38h odst. 13);
 *     disability and ZTP/P wait for the annual settlement.
 * The spouse credit is annual-only by § 38h odst. 6 and never appears here.
 */
function personalCreditsFor(
  profile: TaxProfileInput,
  rules: CzRuleset,
  notes: EngineNote[],
): Halere {
  if (!profile.signedDeclaration) {
    notes.push({
      key: 'tax.noDeclaration',
      severity: 'warning',
      text: 'tax.note.noDeclarationNoMonthlyRelief',
    });
    return ZERO;
  }

  const parts: Halere[] = [];
  if (profile.applyBasicCredit) parts.push(czk(rules.basicTaxpayerCreditMonthly.value));

  if (profile.residency === 'resident') {
    if (profile.disability === 'first_second') {
      parts.push(czk(rules.disabilityFirstSecondCreditMonthly.value));
    } else if (profile.disability === 'third') {
      parts.push(czk(rules.disabilityThirdCreditMonthly.value));
    }
    if (profile.ztpp) parts.push(czk(rules.ztppCreditMonthly.value));
    if (profile.disability !== 'none' || profile.ztpp) {
      notes.push({
        key: 'tax.startOfMonthCondition',
        severity: 'assumption',
        text: 'tax.note.startOfMonthCondition',
      });
    }
  } else if (profile.disability !== 'none' || profile.ztpp) {
    notes.push({
      key: 'tax.nonResidentCredits',
      severity: 'warning',
      text: 'tax.note.nonResidentPersonalCreditsAnnualOnly',
    });
  }

  return parts.length ? sum(parts) : ZERO;
}

/**
 * The withholding-tax branch — § 6 odst. 4 písm. b) with § 36 odst. 2 písm. m).
 *
 * A separate tax base, not an advance. No credits, no child benefit, no bonus,
 * and both roundings go down.
 */
function withholdingResult(grossTaxable: Halere, rules: CzRuleset): TaxResult {
  const roundedBase = roundWithholdingTax(grossTaxable);
  const tax = roundWithholdingTax(
    percentOf(roundedBase, rules.withholdingTaxRate.value, 'nearest'),
  );

  const lines: LineItem[] = [
    {
      key: 'withholdingBase',
      amount: roundedBase,
      formula: 'tax.formula.withholdingBase',
      roundingNote: 'tax.rounding.downToCzk',
      sourceId: rules.withholdingTaxRate.sourceId,
      legalBasis: '§ 36 odst. 3 zákona č. 586/1992 Sb.',
      origin: 'statutory',
    },
    {
      key: 'withholdingTax',
      amount: tax,
      formula: 'tax.formula.withholdingTax',
      rateNote: `${rules.withholdingTaxRate.value} %`,
      roundingNote: 'tax.rounding.downToCzk',
      sourceId: rules.withholdingTaxRate.sourceId,
      legalBasis: '§ 36 odst. 2 písm. m) zákona č. 586/1992 Sb.',
      origin: 'statutory',
    },
  ];

  return {
    roundedBase,
    lowerBandTax: tax,
    upperBandTax: ZERO,
    advanceBeforeCredits: tax,
    creditsAvailable: ZERO,
    creditsApplied: ZERO,
    childBenefitApplied: ZERO,
    taxBonus: ZERO,
    advanceFinal: tax,
    lines,
    notes: [
      { key: 'tax.withholdingRegime', severity: 'warning', text: 'tax.note.withholdingRegime' },
    ],
  };
}

/**
 * Whether this month falls under withholding rather than the advance.
 *
 * Both conditions must hold. "nedosahující" is strict: a gross of exactly the
 * threshold is NOT below it, so 4 500 Kč exactly stays on the advance regime.
 */
export function isWithholdingRegime(
  grossTaxable: Halere,
  profile: TaxProfileInput,
  rules: CzRuleset,
): boolean {
  if (profile.signedDeclaration) return false;
  return grossTaxable < czk(rules.participationThresholdMonthly.value);
}

export function calculateTax(
  grossTaxable: Halere,
  profile: TaxProfileInput,
  rules: CzRuleset,
): TaxResult {
  if (isWithholdingRegime(grossTaxable, profile, rules)) {
    return withholdingResult(grossTaxable, rules);
  }

  const notes: EngineNote[] = [];
  const lines: LineItem[] = [];

  // ── Steps 1–3: base, split, advance ──────────────────────────────────────
  const roundedBase = roundTaxBase(grossTaxable);
  const threshold = czk(rules.taxUpperMonthlyThreshold.value);

  const lowerPortion = minHalere(roundedBase, threshold);
  const upperPortion = maxHalere(subtract(roundedBase, threshold), ZERO);

  // Exact at haléř precision: the rounded base is a whole number of koruny (and
  // above 100 Kč, of hundreds), and 15 % or 23 % of a whole koruna is a whole
  // number of haléře. So no fraction is lost before the single round-up below.
  const lowerBandTax = percentOf(lowerPortion, rules.taxLowerRate.value, 'nearest');
  const upperBandTax = percentOf(upperPortion, rules.taxUpperRate.value, 'nearest');
  const advanceBeforeCredits = roundTaxAdvance(add(lowerBandTax, upperBandTax));

  lines.push({
    key: 'taxBase',
    amount: roundedBase,
    formula: 'tax.formula.base',
    roundingNote:
      grossTaxable <= HUNDRED_CZK ? 'tax.rounding.upToCzk' : 'tax.rounding.upToHundredCzk',
    sourceId: rules.taxLowerRate.sourceId,
    legalBasis: '§ 38h odst. 1 zákona č. 586/1992 Sb.',
    origin: 'statutory',
  });
  lines.push({
    key: 'advanceBeforeCredits',
    amount: advanceBeforeCredits,
    formula: upperPortion > ZERO ? 'tax.formula.advanceTwoBands' : 'tax.formula.advanceOneBand',
    rateNote: `${rules.taxLowerRate.value} % / ${rules.taxUpperRate.value} %`,
    roundingNote: 'tax.rounding.upToCzk',
    sourceId: rules.taxLowerRate.sourceId,
    legalBasis: '§ 38h odst. 2 a 3 zákona č. 586/1992 Sb.',
    origin: 'statutory',
  });

  // ── Step 4: § 35ba personal credits, capped at the advance ───────────────
  const creditsAvailable = personalCreditsFor(profile, rules, notes);
  const creditsApplied = minHalere(creditsAvailable, advanceBeforeCredits);
  const afterPersonalCredits = subtract(advanceBeforeCredits, creditsApplied);

  if (creditsAvailable > ZERO) {
    lines.push({
      key: 'personalCredits',
      amount: creditsApplied,
      formula: 'tax.formula.personalCredits',
      sourceId: rules.basicTaxpayerCreditMonthly.sourceId,
      legalBasis: '§ 35ba, § 35d odst. 3 zákona č. 586/1992 Sb.',
      origin: 'statutory',
    });
    if (creditsApplied < creditsAvailable) {
      notes.push({
        key: 'tax.creditsCapped',
        severity: 'info',
        text: 'tax.note.creditsCappedAtAdvance',
      });
    }
  }

  // ── Steps 5–6: child benefit and the monthly bonus ───────────────────────
  let childBenefitApplied: Halere = ZERO;
  let taxBonus: Halere = ZERO;
  let advanceFinal = afterPersonalCredits;

  if (profile.children.length > 0) {
    const eligible = profile.signedDeclaration && profile.residency === 'resident';
    if (!eligible) {
      if (profile.residency !== 'resident') {
        notes.push({
          key: 'tax.nonResidentChildBenefit',
          severity: 'warning',
          text: 'tax.note.nonResidentChildBenefitAnnualOnly',
        });
      }
    } else {
      const childBenefit = childBenefitFor(profile, rules);
      childBenefitApplied = minHalere(childBenefit, afterPersonalCredits);
      advanceFinal = subtract(afterPersonalCredits, childBenefitApplied);

      lines.push({
        key: 'childBenefit',
        amount: childBenefit,
        formula: 'tax.formula.childBenefit',
        sourceId: rules.childBenefit.firstMonthly.sourceId,
        legalBasis: '§ 35c, § 35d odst. 2 zákona č. 586/1992 Sb.',
        origin: 'statutory',
      });

      // § 35d odst. 4 — two independent gates on the bonus.
      const bonusRaw = subtract(childBenefit, childBenefitApplied);
      if (bonusRaw > ZERO) {
        const minPayout = czk(rules.childBenefit.bonusMinPayout.value);
        const minIncome = czk(rules.childBenefit.bonusMinMonthlyIncome.value);
        if (bonusRaw < minPayout) {
          notes.push({
            key: 'tax.bonusBelowMinimumPayout',
            severity: 'info',
            text: 'tax.note.bonusBelowMinimumPayout',
          });
        } else if (grossTaxable < minIncome) {
          notes.push({
            key: 'tax.bonusIncomeTooLow',
            severity: 'info',
            text: 'tax.note.bonusIncomeBelowHalfMinimumWage',
          });
        } else {
          taxBonus = bonusRaw;
          lines.push({
            key: 'taxBonus',
            amount: taxBonus,
            formula: 'tax.formula.taxBonus',
            sourceId: rules.childBenefit.bonusMinPayout.sourceId,
            legalBasis: '§ 35d odst. 4 zákona č. 586/1992 Sb.',
            origin: 'statutory',
          });
        }
      }
    }
  }

  advanceFinal = clampNonNegative(advanceFinal);

  lines.push({
    key: 'advanceFinal',
    amount: advanceFinal,
    formula: 'tax.formula.advanceFinal',
    legalBasis: '§ 38h odst. 4 zákona č. 586/1992 Sb.',
    origin: 'derived',
  });

  return {
    roundedBase,
    lowerBandTax,
    upperBandTax,
    advanceBeforeCredits,
    creditsAvailable,
    creditsApplied,
    childBenefitApplied,
    taxBonus,
    advanceFinal,
    lines,
    notes,
  };
}
