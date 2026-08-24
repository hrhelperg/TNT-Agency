/**
 * Company-specific employer costs — the SECOND layer (§17 of the build brief).
 *
 * What this is
 * ────────────
 * Everything an employer spends on an employee that is NOT statutory payroll.
 * Meals, pension and life-insurance contributions, accommodation, transport, a
 * company car, equipment, PPE, occupational medical examinations, training,
 * onboarding, recruitment, workplace cost.
 *
 * Why it is a separate layer
 * ──────────────────────────
 * The statutory payroll cost is a legal fact: given a gross wage and a tax year,
 * it is the same number for every employer in the country. These costs are not.
 * They are one company's decisions, and they are knowable only because the user
 * typed them in. Adding the two together and presenting one figure as "the cost
 * of an employee" would make a company-specific number look like a statutory one.
 *
 * So the engine keeps them apart to the end, and the UI reports:
 *
 *     TOTAL STATUTORY EMPLOYER COST   ← law
 *     TOTAL REAL EMPLOYER COST        ← law + what this company actually spends
 *
 * NO INVENTED DEFAULTS
 * ────────────────────
 * Every value here defaults to ZERO. Not to a market average, not to a
 * "typical" meal contribution, not to a plausible PPE figure. A default that
 * looks researched is worse than an empty field: the user does not know it is
 * there, it flows into the total, and the total is then partly fiction. §17 of
 * the brief says this explicitly and it is enforced by a test.
 *
 * TAX TREATMENT IS NOT CALCULATED
 * ───────────────────────────────
 * §18 offers two options. This module implements option B, deliberately.
 *
 * Czech 2026 benefit exemptions are genuinely intricate — the employee-benefit
 * exemption limit, the separate rules for meal contributions, pension and life
 * insurance, and the distinction between what is exempt for the employee and
 * what is deductible for the employer are four different questions with four
 * different answers per benefit. Modelling that from anything less than a
 * complete sourced ruleset would produce a confident wrong answer about
 * someone's taxable income.
 *
 * So: these amounts are employer COST ONLY. Not one koruna of this module
 * reaches the employee's taxable base, their assessment bases, or their net
 * wage. The UI labels the section "Cost only — tax treatment not calculated",
 * and `taxTreatment` below carries that fact per item so the label cannot drift
 * from the behaviour.
 *
 * PERIODICITY IS NOT COSMETIC
 * ───────────────────────────
 * §22: the annual view cannot be the monthly view times twelve. A one-off
 * recruitment fee is not twelve recruitment fees, and a quarterly cost is not a
 * monthly one. Each item therefore declares how often it occurs, and the annual
 * total is built from those declarations rather than by scaling a monthly
 * figure. The monthly view reports recurring monthly cost only, and says so —
 * an "allocated" monthly share of a one-off cost is a different quantity from
 * money leaving the company this month, and conflating them is the same defect
 * §14 forbids for the quarterly liability-insurance premium.
 */

import { czk, sum, multiplyByInteger, ZERO, type Halere } from '../../payroll/money';

/**
 * How often a cost occurs.
 *
 * `one_off` is per employment, not per year: a recruitment fee paid once to
 * hire this person recurs only if the person is replaced, which is a turnover
 * assumption this calculator does not make on the user's behalf.
 */
export type CostPeriodicity = 'monthly' | 'quarterly' | 'annual' | 'one_off';

/** Whether the engine has modelled the item's tax treatment. Always 'not_calculated' in V1 — see the header. */
export type BenefitTaxTreatment = 'not_calculated';

export interface AdditionalCostDefinition {
  readonly key: AdditionalCostKey;
  readonly labelCs: string;
  readonly labelEn: string;
  readonly labelDe: string;
  readonly periodicity: CostPeriodicity;
  readonly taxTreatment: BenefitTaxTreatment;
  /** Group in the §23 result breakdown. */
  readonly group: 'benefits' | 'operating' | 'one_off';
  /** What the item is, so the UI never has to guess from the label. */
  readonly noteCs: string;
}

export type AdditionalCostKey =
  // Benefits — recurring, employer-chosen
  | 'mealContribution'
  | 'pensionContribution'
  | 'lifeInsuranceContribution'
  | 'otherBenefits'
  // Operating — recurring, attributable to holding this person in the job
  | 'accommodation'
  | 'transport'
  | 'companyCar'
  | 'phone'
  | 'equipmentAmortisation'
  | 'ppeWorkwear'
  | 'workplaceFacility'
  | 'otherRecurring'
  // Periodic non-monthly
  | 'occupationalMedical'
  | 'trainingCertification'
  // One-off, per employment
  | 'onboarding'
  | 'recruitment'
  | 'otherOneOff';

/**
 * The catalogue. Order is the order the UI renders, grouped.
 *
 * Periodicity is a property of the COST, not a user choice, wherever the nature
 * of the cost fixes it — an occupational medical examination is periodic by
 * regulation and a recruitment fee is inherently per-hire. Where an employer
 * could genuinely pay either way (training), the item is placed where the
 * majority case sits and the note says so, rather than multiplying the input
 * count by offering a periodicity selector on every row.
 */
export const ADDITIONAL_COSTS: readonly AdditionalCostDefinition[] = [
  {
    key: 'mealContribution',
    labelCs: 'Příspěvek na stravování',
    labelEn: 'Meal contribution',
    labelDe: 'Verpflegungszuschuss',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'benefits',
    noteCs: 'Měsíční náklad zaměstnavatele. Daňové osvobození u zaměstnance ani daňová uznatelnost u zaměstnavatele se zde neposuzují.',
  },
  {
    key: 'pensionContribution',
    labelCs: 'Příspěvek na penzijní produkt',
    labelEn: 'Pension contribution',
    labelDe: 'Beitrag zur Altersvorsorge',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'benefits',
    noteCs: 'Měsíční náklad zaměstnavatele. Limity osvobození se zde neposuzují.',
  },
  {
    key: 'lifeInsuranceContribution',
    labelCs: 'Příspěvek na životní pojištění',
    labelEn: 'Life-insurance contribution',
    labelDe: 'Beitrag zur Lebensversicherung',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'benefits',
    noteCs: 'Měsíční náklad zaměstnavatele. Limity osvobození se zde neposuzují.',
  },
  {
    key: 'otherBenefits',
    labelCs: 'Ostatní benefity',
    labelEn: 'Other employee benefits',
    labelDe: 'Sonstige Mitarbeiterbenefits',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'benefits',
    noteCs: 'Souhrn dalších měsíčních benefitů. Daňový režim jednotlivých benefitů se zde neposuzuje.',
  },
  {
    key: 'accommodation',
    labelCs: 'Ubytování',
    labelEn: 'Accommodation',
    labelDe: 'Unterkunft',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'operating',
    noteCs: 'Měsíční náklad zaměstnavatele na ubytování pracovníka.',
  },
  {
    key: 'transport',
    labelCs: 'Doprava zaměstnance',
    labelEn: 'Employee transport',
    labelDe: 'Mitarbeitertransport',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'operating',
    noteCs: 'Svoz, příspěvek na dojíždění nebo jiná doprava hrazená zaměstnavatelem.',
  },
  {
    key: 'companyCar',
    labelCs: 'Služební vozidlo (přiřaditelný náklad)',
    labelEn: 'Company car (attributable cost)',
    labelDe: 'Firmenwagen (zurechenbare Kosten)',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'operating',
    noteCs: 'Část nákladu vozidla připadající na tohoto zaměstnance. Dodanění 1 % vstupní ceny u zaměstnance se zde nepočítá.',
  },
  {
    key: 'phone',
    labelCs: 'Telefon a tarif',
    labelEn: 'Phone',
    labelDe: 'Telefon',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'operating',
    noteCs: 'Měsíční náklad na telefon a tarif.',
  },
  {
    key: 'equipmentAmortisation',
    labelCs: 'Notebook a vybavení (měsíční odpis)',
    labelEn: 'Laptop / equipment amortisation',
    labelDe: 'Laptop / Ausstattung (monatliche Abschreibung)',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'operating',
    noteCs: 'Měsíční část pořizovací ceny vybavení. Zadejte sami — kalkulačka neurčuje odpisovou dobu.',
  },
  {
    key: 'ppeWorkwear',
    labelCs: 'OOPP a pracovní oděv',
    labelEn: 'PPE and workwear',
    labelDe: 'PSA und Arbeitskleidung',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'operating',
    noteCs: 'Měsíční náklad na osobní ochranné pracovní prostředky a pracovní oděv.',
  },
  {
    key: 'workplaceFacility',
    labelCs: 'Pracoviště a zázemí',
    labelEn: 'Workplace / facility cost',
    labelDe: 'Arbeitsplatz- und Infrastrukturkosten',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'operating',
    noteCs: 'Podíl na nákladech pracoviště připadající na toto pracovní místo.',
  },
  {
    key: 'otherRecurring',
    labelCs: 'Jiný opakovaný náklad',
    labelEn: 'Other recurring cost',
    labelDe: 'Sonstige laufende Kosten',
    periodicity: 'monthly',
    taxTreatment: 'not_calculated',
    group: 'operating',
    noteCs: 'Jakýkoli další měsíčně se opakující náklad na tohoto zaměstnance.',
  },
  {
    key: 'occupationalMedical',
    labelCs: 'Pracovnělékařské prohlídky',
    labelEn: 'Occupational medical examinations',
    labelDe: 'Arbeitsmedizinische Untersuchungen',
    periodicity: 'annual',
    taxTreatment: 'not_calculated',
    group: 'operating',
    noteCs: 'Periodický náklad. Zadává se jako roční částka — interval prohlídek závisí na kategorii práce a věku a kalkulačka jej neurčuje.',
  },
  {
    key: 'trainingCertification',
    labelCs: 'Školení a certifikace',
    labelEn: 'Training and certification',
    labelDe: 'Schulungen und Zertifizierungen',
    periodicity: 'annual',
    taxTreatment: 'not_calculated',
    group: 'operating',
    noteCs: 'Roční náklad na povinná i odborná školení. Jednorázové vstupní školení patří do nákladů nástupu.',
  },
  {
    key: 'onboarding',
    labelCs: 'Náklady nástupu a zaškolení',
    labelEn: 'Onboarding cost',
    labelDe: 'Einarbeitungskosten',
    periodicity: 'one_off',
    taxTreatment: 'not_calculated',
    group: 'one_off',
    noteCs: 'Jednorázový náklad na nástup a zaškolení. Neopakuje se, dokud nedojde k obsazení místa znovu.',
  },
  {
    key: 'recruitment',
    labelCs: 'Náklady náboru',
    labelEn: 'Recruitment cost',
    labelDe: 'Rekrutierungskosten',
    periodicity: 'one_off',
    taxTreatment: 'not_calculated',
    group: 'one_off',
    noteCs: 'Jednorázový náklad na obsazení tohoto místa (inzerce, agentura, čas náborářů).',
  },
  {
    key: 'otherOneOff',
    labelCs: 'Jiný jednorázový náklad',
    labelEn: 'Other one-off cost',
    labelDe: 'Sonstige einmalige Kosten',
    periodicity: 'one_off',
    taxTreatment: 'not_calculated',
    group: 'one_off',
    noteCs: 'Jakýkoli další jednorázový náklad spojený s tímto pracovním místem.',
  },
];

/** User-entered amounts in whole CZK, keyed by cost item. Every value defaults to 0. */
export type AdditionalCostInput = Readonly<Record<AdditionalCostKey, number>>;

/**
 * All-zero input.
 *
 * Built from the catalogue rather than written out, so a new cost item cannot be
 * added to the catalogue and silently left out of the default (which would make
 * it `undefined`, and `czk(undefined)` throws).
 */
export const EMPTY_ADDITIONAL_COSTS: AdditionalCostInput = Object.freeze(
  ADDITIONAL_COSTS.reduce(
    (acc, def) => {
      acc[def.key] = 0;
      return acc;
    },
    {} as Record<AdditionalCostKey, number>,
  ),
) as AdditionalCostInput;

export interface AdditionalCostLine {
  readonly key: AdditionalCostKey;
  readonly definition: AdditionalCostDefinition;
  /** The amount as entered, in its own periodicity. */
  readonly amount: Halere;
}

export interface AdditionalCostsResult {
  /** Items with a non-zero amount, in catalogue order. */
  readonly lines: readonly AdditionalCostLine[];

  /** Sum of items that recur every month. This is the only figure that belongs in a monthly total. */
  readonly monthlyRecurring: Halere;
  /** Sum of items billed quarterly, as a quarterly amount. */
  readonly quarterlyTotal: Halere;
  /** Sum of items billed once a year, as an annual amount. */
  readonly annualOnly: Halere;
  /** Sum of items that occur once per employment. */
  readonly oneOffTotal: Halere;

  /**
   * True annual cost: monthly×12 + quarterly×4 + annual + one-off.
   *
   * NOT monthlyRecurring × 12. §22.
   */
  readonly annualTotal: Halere;

  /**
   * What the monthly view may add to a monthly employer cost.
   *
   * Equal to `monthlyRecurring` — deliberately excluding quarterly, annual and
   * one-off items, which do not leave the company every month. An allocated
   * twelfth of an annual cost is a different quantity from a payment, and the
   * UI presents it separately if at all.
   */
  readonly monthlyCashCost: Halere;

  /**
   * Informational: the annual cost spread evenly over twelve months.
   *
   * Provided because employers reasonably want a run-rate, and withheld from
   * `monthlyCashCost` because it is not one. Any UI showing it must label it an
   * allocation.
   */
  readonly monthlyAllocatedRunRate: Halere;

  /** True when the user entered nothing — lets the UI omit the whole section rather than print zeros. */
  readonly isEmpty: boolean;
}

const DEFINITION_BY_KEY: ReadonlyMap<AdditionalCostKey, AdditionalCostDefinition> = new Map(
  ADDITIONAL_COSTS.map((d) => [d.key, d]),
);

/**
 * Total company-specific employer costs.
 *
 * Pure. Negative entries are rejected rather than netted off: a negative
 * "recruitment cost" is a data-entry error, and silently subtracting it from
 * the employer's total would understate the cost of employment — the one
 * direction of error this calculator must not make.
 */
export function calculateAdditionalCosts(input: AdditionalCostInput): AdditionalCostsResult {
  const lines: AdditionalCostLine[] = [];
  const byPeriodicity: Record<CostPeriodicity, Halere[]> = {
    monthly: [],
    quarterly: [],
    annual: [],
    one_off: [],
  };

  for (const def of ADDITIONAL_COSTS) {
    const raw = input[def.key];
    if (!Number.isFinite(raw)) {
      throw new RangeError(`additional-costs: "${def.key}" must be a finite number, got ${raw}`);
    }
    if (raw < 0) {
      throw new RangeError(`additional-costs: "${def.key}" must not be negative, got ${raw}`);
    }
    if (raw === 0) continue;
    const amount = czk(raw);
    lines.push({ key: def.key, definition: def, amount });
    byPeriodicity[def.periodicity].push(amount);
  }

  const monthlyRecurring = byPeriodicity.monthly.length ? sum(byPeriodicity.monthly) : ZERO;
  const quarterlyTotal = byPeriodicity.quarterly.length ? sum(byPeriodicity.quarterly) : ZERO;
  const annualOnly = byPeriodicity.annual.length ? sum(byPeriodicity.annual) : ZERO;
  const oneOffTotal = byPeriodicity.one_off.length ? sum(byPeriodicity.one_off) : ZERO;

  const annualTotal = sum([
    multiplyByInteger(monthlyRecurring, 12),
    multiplyByInteger(quarterlyTotal, 4),
    annualOnly,
    oneOffTotal,
  ]);

  return {
    lines,
    monthlyRecurring,
    quarterlyTotal,
    annualOnly,
    oneOffTotal,
    annualTotal,
    monthlyCashCost: monthlyRecurring,
    // Integer division of the annual figure; the remainder is dropped, which is
    // correct for a run-rate and is why this is not the cash figure.
    monthlyAllocatedRunRate: Math.floor(annualTotal / 12) as Halere,
    isEmpty: lines.length === 0,
  };
}

/** Definition lookup, for the UI. Throws on an unknown key rather than rendering a blank row. */
export function additionalCostDefinition(key: AdditionalCostKey): AdditionalCostDefinition {
  const def = DEFINITION_BY_KEY.get(key);
  if (!def) throw new Error(`additional-costs: unknown cost key "${key}"`);
  return def;
}
