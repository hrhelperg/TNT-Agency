/**
 * Monthly income-tax advance (záloha na daň) for 2026 — § 38h zákona č.
 * 586/1992 Sb. Computed from GROSS wage (superhrubá mzda abolished).
 *
 * Steps:
 *  1. Round the monthly tax base: base > 100 Kč → up to whole hundreds;
 *     otherwise up to whole koruny.
 *  2. Apply 15 % up to the monthly threshold (146 901 Kč = 3× average wage),
 *     23 % on the excess; round the advance up to whole koruny.
 *  3. Apply monthly tax credits (only with a signed Prohlášení poplatníka):
 *     basic taxpayer, disability, ZTP/P. Credits cannot make the tax negative.
 *  4. Apply the child tax benefit (daňové zvýhodnění): first as a reduction of
 *     tax; any excess becomes a monthly tax bonus if income ≥ ½ minimum wage.
 *
 * Non-residents may apply only the basic taxpayer credit monthly; disability,
 * ZTP/P and the child benefit are available only via the annual return.
 */

import {
  add,
  clampNonNegative,
  czk,
  percentOf,
  roundToCzk,
  roundToHundredCzk,
  subtract,
  sum,
  maxHalere,
  minHalere,
  ZERO,
  type Halere,
} from './money';
import type {
  EmployeeContributionsResult,
  GrossWageResult,
  LineItem,
  RuleRegistry,
  TaxProfile,
  TaxResult,
} from './types';

const HUNDRED_CZK: Halere = czk(100);

function roundTaxBase(gross: Halere): Halere {
  if (gross <= HUNDRED_CZK) return roundToCzk(gross, 'up');
  return roundToHundredCzk(gross, 'up');
}

function childBenefitMonthly(profile: TaxProfile, rules: RuleRegistry): Halere {
  const b = rules.childBenefit;
  const parts: Halere[] = profile.children.map((child, index) => {
    const baseAmount =
      index === 0 ? b.firstMonthly : index === 1 ? b.secondMonthly : b.thirdPlusMonthly;
    const czkAmount = child.ztpp ? baseAmount * b.ztppMultiplier : baseAmount;
    return czk(czkAmount);
  });
  return parts.length ? sum(parts) : ZERO;
}

export function calculateTax(
  gross: GrossWageResult,
  _contributions: EmployeeContributionsResult,
  profile: TaxProfile,
  rules: RuleRegistry,
): TaxResult {
  const lines: LineItem[] = [];
  const notes: string[] = [];

  const taxBase = roundTaxBase(gross.grossWage);
  const threshold = czk(rules.taxUpperMonthlyThreshold.value);

  const lowerPortion = minHalere(taxBase, threshold);
  const upperPortion = maxHalere(subtract(taxBase, threshold), ZERO);

  const lowerTax = percentOf(lowerPortion, rules.taxLowerRate.value, 'nearest');
  const upperTax = percentOf(upperPortion, rules.taxUpperRate.value, 'nearest');
  const taxBeforeCredits = roundToCzk(add(lowerTax, upperTax), 'up');

  lines.push({
    key: 'taxBase',
    labelCs: 'Základ daně (měsíční)',
    amount: taxBase,
    formula: 'hrubá mzda zaokrouhlená na celé stokoruny nahoru',
    roundingNote: 'Nad 100 Kč na celé stokoruny nahoru.',
    sourceId: rules.taxUpperMonthlyThreshold.sourceId,
    origin: 'derived',
  });
  lines.push({
    key: 'taxBeforeCredits',
    labelCs: 'Záloha na daň před slevami',
    amount: taxBeforeCredits,
    formula:
      upperPortion > ZERO
        ? `${rules.taxLowerRate.value} % do 146 901 Kč + ${rules.taxUpperRate.value} % nad hranici`
        : `${rules.taxLowerRate.value} % ze základu`,
    rateNote: `${rules.taxLowerRate.value} % / ${rules.taxUpperRate.value} %`,
    roundingNote: 'Zaokrouhleno na celé koruny nahoru.',
    sourceId: rules.taxLowerRate.sourceId,
    origin: 'statutory',
  });

  // Personal credits — only with a signed declaration.
  const creditParts: Halere[] = [];
  if (profile.signedDeclaration) {
    if (profile.applyBasicCredit) {
      creditParts.push(czk(rules.basicTaxpayerCreditMonthly.value));
    }
    if (profile.residency === 'resident') {
      if (profile.disability === 'first_second') {
        creditParts.push(czk(rules.disabilityFirstSecondCreditMonthly.value));
      } else if (profile.disability === 'third') {
        creditParts.push(czk(rules.disabilityThirdCreditMonthly.value));
      }
      if (profile.ztpp) {
        creditParts.push(czk(rules.ztppCreditMonthly.value));
      }
    } else {
      if (profile.disability !== 'none' || profile.ztpp) {
        notes.push(
          'Daňový nerezident může měsíčně uplatnit pouze základní slevu na poplatníka; slevy na invaliditu/ZTP/P jen v ročním zúčtování (§ 38h).',
        );
      }
    }
  } else {
    notes.push('Bez podepsaného prohlášení poplatníka se měsíční slevy a daňové zvýhodnění neuplatní.');
  }

  const potentialCredits = creditParts.length ? sum(creditParts) : ZERO;
  const appliedCredits = minHalere(potentialCredits, taxBeforeCredits);
  const taxAfterPersonalCredits = clampNonNegative(subtract(taxBeforeCredits, potentialCredits));

  if (potentialCredits > ZERO) {
    lines.push({
      key: 'appliedCredits',
      labelCs: 'Slevy na dani (uplatněné)',
      amount: appliedCredits,
      formula: 'základní sleva + invalidita/ZTP-P (max do výše daně)',
      sourceId: rules.basicTaxpayerCreditMonthly.sourceId,
      origin: 'statutory',
    });
  }

  // Child tax benefit.
  let childBenefitApplied: Halere = ZERO;
  let taxBonus: Halere = ZERO;
  let taxAfterCredits = taxAfterPersonalCredits;

  const childBenefitEligible = profile.signedDeclaration && profile.residency === 'resident';
  if (profile.children.length > 0) {
    if (!childBenefitEligible) {
      if (profile.residency !== 'resident') {
        notes.push('Daňové zvýhodnění na dítě může nerezident uplatnit jen v ročním přiznání za zákonných podmínek.');
      }
    } else {
      const childBenefit = childBenefitMonthly(profile, rules);
      childBenefitApplied = minHalere(childBenefit, taxAfterPersonalCredits);
      taxAfterCredits = subtract(taxAfterPersonalCredits, childBenefitApplied);
      const bonusCandidate = subtract(childBenefit, childBenefitApplied);
      if (bonusCandidate > ZERO) {
        const minIncome = czk(rules.childBenefit.bonusMinMonthlyIncome.value);
        if (gross.grossWage >= minIncome) {
          taxBonus = bonusCandidate;
        } else {
          notes.push(
            `Měsíční daňový bonus se nevyplácí – příjem je nižší než ${rules.childBenefit.bonusMinMonthlyIncome.value} Kč (polovina minimální mzdy).`,
          );
        }
      }
      lines.push({
        key: 'childBenefit',
        labelCs: 'Daňové zvýhodnění na děti',
        amount: childBenefit,
        formula: 'součet zvýhodnění dle pořadí dětí (ZTP/P dvojnásobek)',
        sourceId: rules.childBenefit.sourceId,
        origin: 'statutory',
      });
    }
  }

  const netTaxEffect = subtract(taxAfterCredits, taxBonus);

  lines.push({
    key: 'taxAfterCredits',
    labelCs: 'Záloha na daň po slevách',
    amount: taxAfterCredits,
    formula: 'daň − slevy − daňové zvýhodnění (min. 0)',
    origin: 'derived',
  });
  if (taxBonus > ZERO) {
    lines.push({
      key: 'taxBonus',
      labelCs: 'Daňový bonus (vyplácen zaměstnanci)',
      amount: taxBonus,
      formula: 'daňové zvýhodnění nad rámec daně',
      sourceId: rules.childBenefit.sourceId,
      origin: 'statutory',
    });
  }

  return {
    taxBase,
    taxBeforeCredits,
    appliedCredits,
    childBenefitApplied,
    taxAfterCredits,
    taxBonus,
    netTaxEffect,
    lines,
    notes,
  };
}
