/**
 * The German social-insurance parameters in force for 2026.
 *
 * Rates are decimal STRINGS in percentage points ("14.6", not 0.146), so they
 * reach the exact-decimal arithmetic with the scale the source states and never
 * pass through a float. `0.146` as a JS number is not 0.146.
 *
 * Money is in CENT as `bigint`, for the same reason.
 *
 * WHAT IS NOT IN THIS FILE, DELIBERATELY
 * ──────────────────────────────────────
 * The Programmablaufplan's RVSATZAN, AVSATZAN, KVSATZAN and PVSATZAN. Those are
 * near-copies of some of the rates below and they are NOT contribution rates —
 * they exist only to size the Vorsorgepauschale, a notional deduction from the
 * TAX base. The KV one in particular is half of the ermäßigter Beitragssatz
 * (7 %), not half of the allgemeiner (7,3 %), so an engine that reuses it
 * understates every employee's health contribution by 0,3 points while looking
 * entirely plausible. They live in the tax engine and stay there.
 *
 * WEST AND EAST
 * ─────────────
 * There is no Rechtskreis in this file and there must not be one. The
 * SVRechGrV 2026 states a single figure for every ceiling; the separate eastern
 * Bezugsgröße and Beitragsbemessungsgrenze that older tables carry were last
 * relevant before 2025.
 */

import type { Ruled } from '../types';
import { DE_SOURCE_IDS as S } from './sources';

const eur = (whole: number, cent = 0): bigint => BigInt(whole) * 100n + BigInt(cent);

export interface DeContributionBranch {
  /** Total rate in percentage points, as a decimal string. */
  readonly totalPercent: Ruled<string>;
  /** Monthly Beitragsbemessungsgrenze in cent. */
  readonly monthlyCeilingCent: Ruled<bigint>;
}

export interface DeRuleset2026 {
  readonly year: 2026;

  readonly health: {
    readonly generalPercent: Ruled<string>;
    readonly reducedPercent: Ruled<string>;
    /** The default only. § 242 SGB V makes the real rate kassenindividuell. */
    readonly averageSupplementPercent: Ruled<string>;
    readonly monthlyCeilingCent: Ruled<bigint>;
    /** Split of BOTH the general rate and the supplement, since 1 January 2019. */
    readonly employerSharesHalfOfSupplement: Ruled<boolean>;
  };

  readonly care: {
    readonly basePercent: Ruled<string>;
    readonly childlessSurchargePercent: Ruled<string>;
    readonly perChildDiscountPercent: Ruled<string>;
    readonly maxDiscountedChildren: Ruled<number>;
    readonly childlessFromAge: Ruled<number>;
    readonly discountUntilChildAge: Ruled<number>;
    /** Points the employee bears alone in a Land that kept its holiday. */
    readonly saxonyEmployeeExtraPoints: Ruled<string>;
    readonly monthlyCeilingCent: Ruled<bigint>;
  };

  readonly pension: DeContributionBranch;
  readonly unemployment: DeContributionBranch;

  readonly insolvencyLevy: {
    readonly percent: Ruled<string>;
    /** Same ceiling as the pension branch — § 358 Absatz 2 SGB III. */
    readonly monthlyCeilingCent: Ruled<bigint>;
  };

  /** Thresholds the calculator uses to REFUSE, not to compute. */
  readonly scope: {
    readonly minijobMonthlyCent: Ruled<bigint>;
    readonly transitionUpperMonthlyCent: Ruled<bigint>;
    readonly insuranceObligationAnnualCent: Ruled<bigint>;
  };

  readonly reference: {
    readonly bezugsgroesseMonthlyCent: Ruled<bigint>;
  };
}

export const DE_RULES_2026: DeRuleset2026 = {
  year: 2026,

  health: {
    generalPercent: {
      value: '14.6',
      sourceId: S.kvBeitragssatz,
      legalBasis: '§ 241 SGB V',
      status: 'confirmed-official',
      note: 'Stated in the statute itself.',
    },
    reducedPercent: {
      value: '14.0',
      sourceId: S.kvBeitragssatz,
      legalBasis: '§ 243 SGB V',
      status: 'confirmed-official',
      note:
        'For members with no Krankengeld entitlement. Not the ordinary employee case, and not to be confused with the 14 % the Programmablaufplan uses for the Vorsorgepauschale.',
    },
    averageSupplementPercent: {
      value: '2.9',
      sourceId: S.kvZusatzbeitrag,
      legalBasis: '§ 242a SGB V; Bekanntmachung vom 07.11.2025',
      status: 'configurable-default',
      note:
        'The AVERAGE, announced by the BMG. The rate an employee actually pays is set by their own Krankenkasse under § 242 SGB V and ranges either side of this. Used as the default for the input, never as a fact about a particular employee.',
    },
    monthlyCeilingCent: {
      value: eur(5_812, 50),
      sourceId: S.svRechgr,
      // § 55 Absatz 2 SGB XI appears on the HEALTH ceiling because it is the
      // surviving cross-reference that fixes this figure — see the note. It is
      // not a claim that the health ceiling is a care provision.
      legalBasis: '§ 2 Absatz 2 SVRechGrV 2026; § 55 Absatz 2 SGB XI',
      status: 'confirmed-official',
      note:
        '69 750 EUR a year. The citation deliberately does NOT lead with § 223 Absatz 3 SGB V: the GKV-Beitragssatzstabilisierungsgesetz of 24 July 2026 REPLACED Absatz 3 as well as inserting Absatz 4, and the replaced text now anchors on Absatz 4 — which speaks only of 2027. The 2026 figure comes from the ordinance, and § 55 Absatz 2 SGB XI still carries the unchanged cross-reference for the care branch. NOT the Jahresarbeitsentgeltgrenze of 77 400 EUR — that is the threshold above which an employee may leave the statutory system, a different question with a different number. Conflating them overstates the ceiling by 7 650 EUR a year.',
    },
    employerSharesHalfOfSupplement: {
      value: true,
      sourceId: S.kvTragung,
      legalBasis: '§ 249 Absatz 1 SGB V',
      status: 'confirmed-official',
      note: 'Since 1 January 2019. Before that the employee bore the Zusatzbeitrag alone.',
    },
  },

  care: {
    basePercent: {
      value: '3.6',
      sourceId: S.pvBeitragssatz,
      legalBasis: '§ 55 Absatz 1a SGB XI i. V. m. § 1 PBAV 2025',
      status: 'confirmed-official',
      note:
        'The statute at § 55 Absatz 1 still says 3,4 %. The ordinance under Absatz 1a raised it to 3,6 % from 1 January 2025 and has not been superseded.',
    },
    childlessSurchargePercent: {
      value: '0.6',
      sourceId: S.pvStatut,
      legalBasis: '§ 55 Absatz 3 Satz 1 SGB XI',
      status: 'confirmed-official',
      note: 'Borne by the employee alone (§ 58 Absatz 1 Satz 3 SGB XI).',
    },
    perChildDiscountPercent: {
      value: '0.25',
      sourceId: S.pvStatut,
      legalBasis: '§ 55 Absatz 3 Satz 4 SGB XI',
      status: 'confirmed-official',
      note:
        'Per child from the second to the fifth, so at most 1,0 point. The FIRST child does not attract a discount — it only removes the surcharge.',
    },
    maxDiscountedChildren: {
      value: 4,
      sourceId: S.pvStatut,
      legalBasis: '§ 55 Absatz 3 Satz 4 SGB XI',
      status: 'confirmed-official',
      note: 'Children two to five inclusive.',
    },
    childlessFromAge: {
      value: 23,
      sourceId: S.pvStatut,
      legalBasis: '§ 55 Absatz 3 Satz 1 SGB XI',
      status: 'confirmed-official',
      note: 'From the end of the month in which the 23rd birthday falls.',
    },
    discountUntilChildAge: {
      value: 25,
      sourceId: S.pvStatut,
      legalBasis: '§ 55 Absatz 3 Satz 4 SGB XI',
      status: 'confirmed-official',
      note:
        'The discount for a child ends with the month in which that child turns 25; a child already 25 never counts. So the number of discounted children falls over time without anything else changing.',
    },
    saxonyEmployeeExtraPoints: {
      value: '1.0',
      sourceId: S.pvTragung,
      legalBasis: '§ 58 Absatz 3 SGB XI',
      status: 'confirmed-official',
      note:
        'Saxony alone. THIS IS THE GAP BETWEEN THE TWO SHARES, not an amount added to one of them: the engine takes the base rate, subtracts this value, halves the remainder to get the employer share, and gives the employee that share plus this value. So 3,6 % splits 2,3 % against 1,3 % and the TOTAL is unchanged. Read as "the employee bears one further point and the employer one less" — which is what this note used to say — the same value would produce 2,8 % against 0,8 %, and an engine that adds a point to the total instead of moving it across is wrong for every Saxon employer.',
    },
    monthlyCeilingCent: {
      value: eur(5_812, 50),
      sourceId: S.svRechgr,
      legalBasis: '§ 55 Absatz 2 SGB XI i. V. m. § 2 Absatz 2 SVRechGrV 2026',
      status: 'confirmed-official',
      note: 'The same ceiling as health insurance.',
    },
  },

  pension: {
    totalPercent: {
      value: '18.6',
      sourceId: S.rvBeitragssatz,
      legalBasis: '§ 158 SGB VI; § 168 Absatz 1 Nummer 1 SGB VI for the split',
      status: 'confirmed-official',
      note:
        '§ 158 states a mechanism, not a number. 18,6 % is the rate in force, unchanged since 2018 and confirmed for 2026 by the GKV-Spitzenverband Rechengrößen.',
    },
    monthlyCeilingCent: {
      value: eur(8_450),
      sourceId: S.svRechgr,
      legalBasis: '§ 159 SGB VI i. V. m. § 4 Absatz 1 Nummer 1 SVRechGrV 2026',
      status: 'confirmed-official',
      note:
        'Allgemeine Rentenversicherung, 101 400 EUR a year. The knappschaftliche ceiling of 124 800 EUR belongs to a different scheme, which this calculator refuses rather than models.',
    },
  },

  unemployment: {
    totalPercent: {
      value: '2.6',
      sourceId: S.avBeitragssatz,
      legalBasis: '§ 341 Absatz 2 SGB III; § 346 Absatz 1 SGB III for the split',
      status: 'confirmed-official',
      note: 'In the statute itself, unchanged since 2019.',
    },
    monthlyCeilingCent: {
      value: eur(8_450),
      sourceId: S.avBeitragssatz,
      legalBasis: '§ 341 Absatz 4 SGB III',
      status: 'derived-from-official',
      note:
        'The statute ties it to the allgemeine Rentenversicherung rather than stating a figure, which is why the SVRechGrV has no entry for unemployment insurance and why a table with four ceilings can look as though one is missing.',
    },
  },

  insolvencyLevy: {
    percent: {
      value: '0.15',
      sourceId: S.insolvenzgeld,
      legalBasis: '§ 360 SGB III',
      status: 'confirmed-official',
      note:
        'Employer alone. The rate has been overridden by ordinance for single years before — 2022, 2023, 2024 — but none exists for 2026, so the statutory figure applies.',
    },
    monthlyCeilingCent: {
      value: eur(8_450),
      sourceId: S.insolvenzgeld,
      legalBasis: '§ 358 Absatz 2 SGB III',
      status: 'derived-from-official',
      note: 'Levied on the pay that bears pension contributions, hence the pension ceiling.',
    },
  },

  scope: {
    minijobMonthlyCent: {
      value: eur(603),
      sourceId: S.gkvRechengroessen,
      legalBasis: '§ 8 Absatz 1a SGB IV',
      status: 'confirmed-official',
      note:
        'At or below this, the employment is geringfügig and the employer pays pauschale Beiträge instead of the ordinary ones. A different regime, not a smaller version of this one.',
    },
    transitionUpperMonthlyCent: {
      value: eur(2_000),
      sourceId: S.gkvRechengroessen,
      legalBasis: '§ 20 Absatz 2 SGB IV',
      status: 'confirmed-official',
      note:
        'Between the Geringfügigkeitsgrenze and this figure the Übergangsbereich applies: the contributory base is reduced by the Faktor F and the employer carries the difference, so both shares are wrong if computed ordinarily.',
    },
    insuranceObligationAnnualCent: {
      value: eur(77_400),
      sourceId: S.svRechgr,
      legalBasis: '§ 6 Absatz 6 SGB V i. V. m. § 2 Absatz 1 SVRechGrV 2026',
      status: 'confirmed-official',
      note:
        'The Jahresarbeitsentgeltgrenze — above it an employee may leave the statutory scheme for private cover. Recorded so the calculator can say so, NOT used as a contribution ceiling. It is 7 650 EUR a year above the ceiling that is, and swapping them is the classic error in this jurisdiction.',
    },
  },

  reference: {
    bezugsgroesseMonthlyCent: {
      value: eur(3_955),
      sourceId: S.svRechgr,
      legalBasis: '§ 18 SGB IV i. V. m. § 1 SVRechGrV 2026',
      status: 'confirmed-official',
      note:
        '47 460 EUR a year. Carried so the registry states the figure the prose quotes; NOT rendered by the methodology panel, and no contribution here is computed from it — an earlier note claimed the panel showed it, and the panel does not. Note there is no separate eastern figure for 2026.',
    },
  },
};
