/**
 * Statutory & contractual wage premiums (příplatky), private-sector "mzda".
 *
 * Legal bases (zákoník práce): overtime §114 (+25 %), night §116 (+10 %),
 * Saturday/Sunday §118 (+10 %), holiday §115 (+100 % if not náhradní volno),
 * difficult environment §117 (≥10 % of the MINIMUM WAGE).
 *
 * Premiums §114–118 are percentages of AVERAGE EARNINGS (průměrný výdělek),
 * a statutory quantity distinct from the contractual wage. §117 uses the
 * minimum wage instead. Hour categories may overlap (an hour can be overtime
 * + night + Saturday) and are therefore priced independently.
 */

import {
  czk,
  percentOf,
  multiplyByQuantity,
  sum,
  ZERO,
  type Halere,
} from './money';
import type {
  PayrollInput,
  PremiumLine,
  PremiumSetting,
  PremiumsResult,
  BaseWageResult,
} from './types';
import type { RuleRegistry } from './types';

const HOURS_DECIMALS = 2;

/** Per-hour premium amount for a setting, given the statutory base rate (Halere/hour). */
function perHourPremium(setting: PremiumSetting, baseRatePerHour: Halere): Halere {
  if (setting.mode === 'czk_per_hour') {
    return czk(setting.czkPerHour);
  }
  return percentOf(baseRatePerHour, setting.percent, 'nearest');
}

function line(
  key: string,
  labelCs: string,
  premiumKey: PremiumLine['premiumKey'],
  hours: number,
  amount: Halere,
  formula: string,
  legalBasis: string,
  sourceId: PremiumLine['sourceId'],
  origin: PremiumLine['origin'],
  baseNote: string,
): PremiumLine {
  return { key, labelCs, premiumKey, hours, amount, formula, rateNote: legalBasis, sourceId, origin, baseNote };
}

export function calculatePremiums(
  input: PayrollInput,
  base: BaseWageResult,
  rules: RuleRegistry,
): PremiumsResult {
  const { premiums, workedTime, wage } = input;
  const lines: PremiumLine[] = [];

  const averageIsEstimate = wage.useWageAsAverageEstimate;
  const averageHourlyEarnings = averageIsEstimate
    ? base.achievedHourlyWage
    : czk(wage.averageHourlyEarningsCzk);
  const minWageHourly = czk(rules.minimumWageHourly.value);

  const avgNote = averageIsEstimate
    ? 'Průměrný výdělek odhadnut ze základní hodinové mzdy (orientační).'
    : 'Z průměrného výdělku (§ 351 zákoníku práce), zadaného uživatelem.';

  // Overtime §114 — suppressed if settled by compensatory leave.
  if (premiums.overtime.enabled && workedTime.overtimeHours > 0 && !premiums.overtimeCompensatoryLeave) {
    const perHour = perHourPremium(premiums.overtime, averageHourlyEarnings);
    const amount = multiplyByQuantity(perHour, workedTime.overtimeHours, HOURS_DECIMALS, 'nearest');
    lines.push(
      line(
        'premium.overtime',
        rules.premiums.overtime.labelCs,
        'overtime',
        workedTime.overtimeHours,
        amount,
        `${workedTime.overtimeHours} h × ${premiums.overtime.mode === 'percent' ? `${premiums.overtime.percent} % průměrného výdělku` : 'sazba Kč/h'}`,
        rules.premiums.overtime.legalBasis,
        rules.premiums.overtime.sourceId,
        'statutory',
        avgNote,
      ),
    );
  }

  const overlayDefs: Array<{
    key: 'night' | 'saturday' | 'sunday' | 'holiday';
    hours: number;
    settling?: boolean;
  }> = [
    { key: 'night', hours: workedTime.nightHours },
    { key: 'saturday', hours: workedTime.saturdayHours },
    { key: 'sunday', hours: workedTime.sundayHours },
    { key: 'holiday', hours: workedTime.holidayHours, settling: premiums.holidayCompensatoryLeave },
  ];

  for (const def of overlayDefs) {
    const setting = premiums[def.key];
    if (!setting.enabled || def.hours <= 0 || def.settling) continue;
    const perHour = perHourPremium(setting, averageHourlyEarnings);
    const amount = multiplyByQuantity(perHour, def.hours, HOURS_DECIMALS, 'nearest');
    lines.push(
      line(
        `premium.${def.key}`,
        rules.premiums[def.key].labelCs,
        def.key,
        def.hours,
        amount,
        `${def.hours} h × ${setting.mode === 'percent' ? `${setting.percent} % průměrného výdělku` : 'sazba Kč/h'}`,
        rules.premiums[def.key].legalBasis,
        rules.premiums[def.key].sourceId,
        'statutory',
        avgNote,
      ),
    );
  }

  // Difficult environment §117 — base is the minimum wage, not average earnings.
  if (premiums.difficultEnvironment.enabled && workedTime.difficultEnvironmentHours > 0) {
    const perHour = perHourPremium(premiums.difficultEnvironment, minWageHourly);
    const amount = multiplyByQuantity(perHour, workedTime.difficultEnvironmentHours, HOURS_DECIMALS, 'nearest');
    lines.push(
      line(
        'premium.difficultEnvironment',
        rules.premiums.difficultEnvironment.labelCs,
        'difficultEnvironment',
        workedTime.difficultEnvironmentHours,
        amount,
        `${workedTime.difficultEnvironmentHours} h × ${premiums.difficultEnvironment.mode === 'percent' ? `${premiums.difficultEnvironment.percent} % minimální mzdy` : 'sazba Kč/h'}`,
        rules.premiums.difficultEnvironment.legalBasis,
        rules.premiums.difficultEnvironment.sourceId,
        'statutory',
        'Ze základu minimální mzdy (134,40 Kč/h v 2026), nikoli z průměrného výdělku.',
      ),
    );
  }

  // Custom employer premium — always % of average earnings, taxable.
  if (premiums.custom.enabled && premiums.custom.hours > 0) {
    const perHour = percentOf(averageHourlyEarnings, premiums.custom.percent, 'nearest');
    const amount = multiplyByQuantity(perHour, premiums.custom.hours, HOURS_DECIMALS, 'nearest');
    lines.push(
      line(
        'premium.custom',
        premiums.custom.labelCs || 'Vlastní příplatek zaměstnavatele',
        'custom',
        premiums.custom.hours,
        amount,
        `${premiums.custom.hours} h × ${premiums.custom.percent} % průměrného výdělku`,
        'Smluvní příplatek zaměstnavatele',
        rules.premiums.overtime.sourceId,
        'user-entered',
        avgNote,
      ),
    );
  }

  const total = lines.length ? sum(lines.map((l) => l.amount)) : ZERO;

  return { total, averageHourlyEarnings, averageIsEstimate, lines };
}
