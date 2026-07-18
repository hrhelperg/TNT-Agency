/**
 * Versioned Czech payroll rule registry for tax year 2026 (private-sector "mzda").
 *
 * Every value carries its source id (see ../sources.ts), legal basis and a
 * confidence status. All monetary defaults are in CZK; percentages are plain
 * numbers (e.g. 7.1 = 7,1 %). Values verified 2026-07-18 against official
 * sources (ČSSZ, Finanční správa, MPSV, VZP). Nothing here reuses 2025 figures
 * silently — the average wage, thresholds and minimum wage are the 2026 values.
 */

import type { PremiumKey, PremiumRule, RuleRegistry } from '../types';

const overtime: PremiumRule = {
  key: 'overtime',
  labelCs: 'Práce přesčas',
  minPercent: 25,
  minCzkPerHour: null,
  base: 'average_earnings',
  editable: true,
  sourceId: 'zp-preplatky',
  legalBasis: '§ 114 zákoníku práce',
  status: 'confirmed-official',
  note: 'Dosažená mzda + příplatek nejméně 25 % průměrného výdělku, pokud se strany nedohodly na náhradním volnu místo příplatku.',
};

const night: PremiumRule = {
  key: 'night',
  labelCs: 'Noční práce',
  minPercent: 10,
  minCzkPerHour: null,
  base: 'average_earnings',
  editable: true,
  sourceId: 'zp-preplatky',
  legalBasis: '§ 116 zákoníku práce (noční doba 22:00–06:00 dle § 78)',
  status: 'confirmed-official',
  note: 'Nejméně 10 % průměrného výdělku; lze sjednat jinou minimální výši.',
};

const saturday: PremiumRule = {
  key: 'saturday',
  labelCs: 'Práce v sobotu',
  minPercent: 10,
  minCzkPerHour: null,
  base: 'average_earnings',
  editable: true,
  sourceId: 'zp-preplatky',
  legalBasis: '§ 118 zákoníku práce',
  status: 'confirmed-official',
  note: 'Nejméně 10 % průměrného výdělku; lze sjednat jinou minimální výši.',
};

const sunday: PremiumRule = {
  key: 'sunday',
  labelCs: 'Práce v neděli',
  minPercent: 10,
  minCzkPerHour: null,
  base: 'average_earnings',
  editable: true,
  sourceId: 'zp-preplatky',
  legalBasis: '§ 118 zákoníku práce',
  status: 'confirmed-official',
  note: 'Nejméně 10 % průměrného výdělku; lze sjednat jinou minimální výši.',
};

const holiday: PremiumRule = {
  key: 'holiday',
  labelCs: 'Práce ve svátek',
  minPercent: 100,
  minCzkPerHour: null,
  base: 'average_earnings',
  editable: true,
  sourceId: 'zp-preplatky',
  legalBasis: '§ 115 zákoníku práce',
  status: 'confirmed-official',
  note: 'Primárně náhradní volno + náhrada mzdy ve výši průměrného výdělku; místo náhradního volna lze dohodnout příplatek nejméně 100 % průměrného výdělku.',
};

const difficultEnvironment: PremiumRule = {
  key: 'difficultEnvironment',
  labelCs: 'Ztížené pracovní prostředí',
  minPercent: 10,
  minCzkPerHour: 13.44, // 10 % z hodinové minimální mzdy 134,40 Kč (2026)
  base: 'minimum_wage',
  editable: true,
  sourceId: 'zp-preplatky',
  legalBasis: '§ 117 zákoníku práce; nařízení vlády č. 567/2006 Sb.',
  status: 'derived-from-official',
  note: 'Nejméně 10 % minimální mzdy za každý ztěžující vliv a hodinu. 13,44 Kč/h je odvozeno z hodinové minimální mzdy 134,40 Kč. Základ = minimální mzda, NIKOLI průměrný výdělek.',
};

const premiums: Readonly<Record<PremiumKey, PremiumRule>> = {
  overtime,
  night,
  saturday,
  sunday,
  holiday,
  difficultEnvironment,
};

export const CZ_2026: RuleRegistry = {
  jurisdiction: 'CZ',
  taxYear: 2026,
  effectiveFrom: '2026-01-01',
  effectiveTo: '2026-12-31',

  employeeSocialRate: {
    value: 7.1,
    sourceId: 'cssz-sazby-2026',
    legalBasis: '§ 7 zákona č. 589/1992 Sb.',
    status: 'confirmed-official',
    note: 'Zaměstnanec 7,1 % = 6,5 % důchodové + 0,6 % nemocenské (od 2024, platí i 2026).',
  },
  employerSocialRate: {
    value: 24.8,
    sourceId: 'cssz-sazby-2026',
    legalBasis: '§ 7 zákona č. 589/1992 Sb.',
    status: 'confirmed-official',
    note: 'Zaměstnavatel 24,8 % = 21,5 % důchodové + 2,1 % nemocenské + 1,2 % st. politika zaměstnanosti.',
  },
  employeeHealthRate: {
    value: 4.5,
    sourceId: 'vzp-vymerovaci-zaklad-2026',
    legalBasis: '§ 2 zákona č. 592/1992 Sb.',
    status: 'confirmed-official',
    note: 'Třetina z celkových 13,5 %.',
  },
  employerHealthRate: {
    value: 9,
    sourceId: 'vzp-vymerovaci-zaklad-2026',
    legalBasis: '§ 2 zákona č. 592/1992 Sb.',
    status: 'confirmed-official',
    note: 'Dvě třetiny z celkových 13,5 %.',
  },
  healthTotalRate: {
    value: 13.5,
    sourceId: 'vzp-vymerovaci-zaklad-2026',
    legalBasis: '§ 2 zákona č. 592/1992 Sb.',
    status: 'confirmed-official',
    note: 'Celkové pojistné 13,5 % se počítá z vyměřovacího základu a zaokrouhluje nahoru; zaměstnanec hradí třetinu.',
  },
  maxAnnualSocialBase: {
    value: 2_350_416,
    sourceId: 'cssz-max-vz-2026',
    legalBasis: '§ 15a zákona č. 589/1992 Sb.',
    status: 'confirmed-official',
    note: '48násobek průměrné mzdy 48 967 Kč. Roční, kumulativní strop pro sociální pojistné (zdravotní pojištění strop nemá).',
  },
  minHealthBaseMonthly: {
    value: 22_400,
    sourceId: 'vzp-vymerovaci-zaklad-2026',
    legalBasis: '§ 3 odst. 6 zákona č. 592/1992 Sb.',
    status: 'confirmed-official',
    note: 'Minimální vyměřovací základ zdravotního pojištění = minimální mzda. Doplatek do minima má zákonné výjimky – neuplatňuje se bezpodmínečně.',
  },
  employerAccidentInsuranceRate: {
    value: null,
    sourceId: 'vyhlaska-125-1993-uraz',
    legalBasis: 'vyhláška č. 125/1993 Sb.',
    status: 'unresolved',
    note: 'Zákonné pojištění úrazu je odstupňováno podle oboru (cca 0,28–5,04 %). Konkrétní sazba pro rok 2026 nebyla ověřena – modelováno jako volitelný vstup, ve výchozím stavu vypnuto.',
  },

  taxLowerRate: {
    value: 15,
    sourceId: 'fs-danove-novinky-2026',
    legalBasis: '§ 16 zákona č. 586/1992 Sb.',
    status: 'confirmed-official',
    note: 'Sazba 15 % do 36násobku průměrné mzdy.',
  },
  taxUpperRate: {
    value: 23,
    sourceId: 'fs-danove-novinky-2026',
    legalBasis: '§ 16 zákona č. 586/1992 Sb.',
    status: 'confirmed-official',
    note: 'Sazba 23 % z části nad 36násobkem průměrné mzdy.',
  },
  taxUpperMonthlyThreshold: {
    value: 146_901,
    sourceId: 'fs-obecne-informace-zalohy',
    legalBasis: '§ 38h odst. 2 zákona č. 586/1992 Sb.',
    status: 'confirmed-official',
    note: 'Měsíční hranice pro zálohu = 3násobek průměrné mzdy 48 967 Kč = 146 901 Kč (2026).',
  },
  basicTaxpayerCreditMonthly: {
    value: 2_570,
    sourceId: 'portal-slevy-2026',
    legalBasis: '§ 35ba odst. 1 písm. a) zákona č. 586/1992 Sb.',
    status: 'confirmed-official',
    note: '30 840 Kč/rok = 2 570 Kč/měs. Měsíčně jen při podepsaném prohlášení poplatníka.',
  },
  disabilityFirstSecondCreditMonthly: {
    value: 210,
    sourceId: 'portal-slevy-2026',
    legalBasis: '§ 35ba odst. 1 písm. c) zákona č. 586/1992 Sb.',
    status: 'confirmed-official',
    note: 'Invalidita 1. a 2. stupně: 2 520 Kč/rok = 210 Kč/měs.',
  },
  disabilityThirdCreditMonthly: {
    value: 420,
    sourceId: 'portal-slevy-2026',
    legalBasis: '§ 35ba odst. 1 písm. d) zákona č. 586/1992 Sb.',
    status: 'confirmed-official',
    note: 'Invalidita 3. stupně: 5 040 Kč/rok = 420 Kč/měs.',
  },
  ztppCreditMonthly: {
    value: 1_345,
    sourceId: 'portal-slevy-2026',
    legalBasis: '§ 35ba odst. 1 písm. e) zákona č. 586/1992 Sb.',
    status: 'confirmed-official',
    note: 'Držitel ZTP/P: 16 140 Kč/rok = 1 345 Kč/měs.',
  },
  childBenefit: {
    firstMonthly: 1_267,
    secondMonthly: 1_860,
    thirdPlusMonthly: 2_320,
    ztppMultiplier: 2,
    bonusMinMonthlyIncome: {
      value: 11_200,
      sourceId: 'mpsv-minimalni-mzda-2026',
      legalBasis: '§ 35d zákona č. 586/1992 Sb.',
      status: 'derived-from-official',
      note: 'Pro měsíční daňový bonus je podmínkou příjem alespoň poloviny minimální mzdy = 11 200 Kč (2026).',
    },
    sourceId: 'portal-slevy-2026',
    legalBasis: '§ 35c a § 35d zákona č. 586/1992 Sb.',
    status: 'confirmed-official',
    note: 'Dítě 1./2./3.+ = 1 267 / 1 860 / 2 320 Kč měsíčně; ZTP/P dítě dvojnásobek. Maximální bonus zrušen (bez horního limitu).',
  },

  averageWageMonthly: {
    value: 48_967,
    sourceId: 'cssz-prehled-2026',
    legalBasis: 'nařízení vlády č. 365/2025 Sb.',
    status: 'confirmed-official',
    note: 'VVZ 46 278 Kč × koeficient 1,0581 = 48 967 Kč.',
  },
  minimumWageMonthly: {
    value: 22_400,
    sourceId: 'mpsv-minimalni-mzda-2026',
    legalBasis: '§ 111 zákoníku práce; sdělení MPSV č. 356/2025 Sb.',
    status: 'confirmed-official',
    note: 'Minimální mzda 2026 při 40h týdnu. Zaručená mzda v soukromém sektoru zrušena od 2025 – žádné skupiny se neuplatní.',
  },
  minimumWageHourly: {
    value: 134.4,
    sourceId: 'mpsv-minimalni-mzda-2026',
    legalBasis: '§ 111 zákoníku práce; sdělení MPSV č. 356/2025 Sb.',
    status: 'confirmed-official',
    note: 'Hodinová minimální mzda 2026 při 40h týdnu.',
  },

  premiums,

  vatStandardRate: {
    value: 21,
    sourceId: 'cz-vat-standard',
    legalBasis: '§ 47 zákona č. 235/2004 Sb.',
    status: 'configurable-default',
    note: 'Základní sazba DPH 21 %. Konkrétní sazba na faktuře agentury závisí na povaze plnění a postavení plátce – editovatelný vstup.',
  },

  rounding: {
    socialInsurance: 'up_to_czk',
    healthInsurance: 'up_to_czk',
    taxBaseMonthly: 'up_to_hundred_czk',
    taxAdvance: 'up_to_czk',
  },
};

export default CZ_2026;
