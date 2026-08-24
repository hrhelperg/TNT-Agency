/**
 * Czech public health insurance for employees — zákon č. 592/1992 Sb.
 * and zákon č. 48/1997 Sb., tax year 2026.
 *
 * THERE IS NO 9 % AND THERE IS NO 4,5 %
 * ─────────────────────────────────────
 * This is the finding that decides the whole module, and it contradicts almost
 * every secondary description of Czech health insurance.
 *
 *   § 2 odst. 1 z. 592/1992: "Výše pojistného činí 13,5 % z vyměřovacího
 *                             základu za rozhodné období."
 *   § 2 odst. 2:              "Pojistné se zaokrouhluje na celé koruny směrem
 *                             nahoru."
 *   § 9 odst. 2 z. 48/1997:   "Pojistné za zaměstnance hradí z jedné třetiny
 *                             zaměstnanec, ze dvou třetin zaměstnavatel."
 *
 * The string "4,5" does not occur in zákon č. 592/1992 Sb. at all, and neither
 * "4,5 %" nor "9 %" occurs in zákon č. 48/1997 Sb. § 9 odst. 1 of 48/1997 says
 * the RATE is set by another act entirely — so 48/1997 can only be allocating
 * shares of a premium quantified elsewhere. The split is a fraction OF THE
 * PREMIUM, not two independent rates.
 *
 * So the order is: ONE rate, ONE rounding, THEN the split.
 *
 *     P = ceil(13,5 % × base)      ← a whole koruna, this is what is remitted
 *     E = employee's third of P
 *     R = P − E                    ← the employer's share, by subtraction
 *
 * Computing 9 % and 4,5 % separately and rounding each up over-remits. VZP's own
 * methodology gives the counter-example, and it is not exotic — a base of
 * 22 401 Kč:
 *
 *     statutory   0,135 × 22 401 = 3 024,135 → P = 3 025 Kč
 *     naive       ceil(1 008,045) + ceil(2 016,09) = 1 009 + 2 017 = 3 026 Kč
 *
 * One koruna too much, on a Přehled that then does not reconcile.
 *
 * WHAT THE LAW DOES NOT SAY: HOW TO SPLIT A PREMIUM NOT DIVISIBLE BY THREE
 * ───────────────────────────────────────────────────────────────────────
 * Only two things are fixed: P is a whole koruna, and E + R = P. No statute, no
 * VZP methodology and no insurer guidance says how the thirds are rounded when
 * P is not a multiple of 3 — which is most of the time. The 22 400 → 3 024
 * example that everyone quotes divides evenly and therefore settles nothing.
 *
 * This module rounds the employee's third UP and gives the employer the
 * remainder, which is common payroll practice and keeps E + R = P exactly. That
 * is an implementation convention, NOT law, and it is surfaced to the user as
 * one. The most it can move is a single koruna.
 *
 * How much it actually moves: nothing, as far as can be checked. VZP's
 * methodology glosses the employee's third as "(tj. 4,5 % z vyměřovacího
 * základu)", which is a second reading of the same split. Comparing the two
 * across every whole-koruna base from 0 to 500 000 — `ceil(P/3)` against
 * `ceil(13,5 % → then 4,5 % of the base)` — gives ZERO disagreements. So the
 * statutory silence is real and the note stays, but the choice made here is not
 * one a payroll department would ever see. That is worth knowing: an
 * unresolvable ambiguity with no observable consequence is a different thing
 * from one that changes someone's payslip, and the two should not be flagged
 * with equal alarm.
 *
 * THE MINIMUM BASE IS NOT PRO-RATED FOR PART TIME
 * ───────────────────────────────────────────────
 * VZP, verbatim: "bez ohledu na délku pracovního úvazku, zařazení zaměstnance,
 * odpracovanou dobu, atd." An employee on 0,2 FTE faces the whole 22 400 Kč
 * floor. This is the single biggest source of error in Czech payroll
 * calculators, and it is why `workingTimePercent` is deliberately NOT wired into
 * the minimum here. § 3 odst. 9 pro-rates by CALENDAR DAYS, for a short
 * employment or a qualifying personal obstacle — a different thing entirely.
 * Unpaid leave has not been a pro-rata trigger since 1 January 2015.
 *
 * THE TOP-UP IS NOT SPLIT — AND THAT IS THE POINT OF §13
 * ─────────────────────────────────────────────────────
 * § 3 odst. 10. Where the base falls short of the minimum, the 13,5 % on the
 * DIFFERENCE is borne by the EMPLOYEE ALONE, remitted through the employer.
 * VZP, verbatim: "…včetně pojistného vypočteného z rozdílu minimálního a
 * skutečného vyměřovacího základu (hradí pouze zaměstnanec)."
 *
 * So `max(gross, minimum) × 9 %` for the employer is wrong twice over: it splits
 * an amount the employee owes in full, and it charges the employer for it.
 *
 * The exception: where the shortfall arises "z důvodů překážek na straně
 * organizace", the EMPLOYER bears the difference. That is a legal
 * classification of an absence, not anything derivable from a salary figure, so
 * it is an input the user asserts.
 *
 * HEALTH HAS NO CEILING
 * ─────────────────────
 * Social insurance has an annual maximum and no floor; health has a floor and no
 * maximum. Neither statute borrows the other's limit.
 */

import {
  add,
  czk,
  maxHalere,
  percentOfRoundedToCzk,
  subtract,
  toCzkNumber,
  ZERO,
  type Halere,
} from '../../payroll/money';
import type { CzRuleset } from './jurisdictions/cz/ruleset';
import type { EngineNote, HealthMinimumInput, HealthResult, LineItem } from './types';

/**
 * The employee's third of a premium, rounded up to a whole koruna.
 *
 * `premium` is always a whole number of koruny (§ 2 odst. 2 rounded it), so this
 * works in koruna units and cannot leave a haléř behind. The employer's share is
 * never computed here — it is `premium − employeeThird`, which is what keeps the
 * two shares summing to exactly what is remitted.
 */
export function employeeThird(premium: Halere): Halere {
  const korunas = toCzkNumber(premium);
  return czk(Math.ceil(korunas / 3));
}

/**
 * The minimum assessment base applicable to this month.
 *
 * Returns null when the minimum does not apply at all, which is different from
 * a minimum of zero: the UI says "the minimum does not apply to this employee"
 * rather than showing a floor of 0 Kč, and no shortfall is ever computed.
 */
function applicableMinimum(
  input: HealthMinimumInput,
  rules: CzRuleset,
  notes: EngineNote[],
): Halere | null {
  const full = czk(rules.healthMinimum.monthlyMinimum.value);

  switch (input.situation) {
    case 'statutory_exemption':
      notes.push({
        key: 'health.minimumExempt',
        severity: 'assumption',
        text: 'health.note.minimumExemptAsserted',
      });
      return null;

    case 'partial_month': {
      // § 3 odst. 9 pro-rates by calendar days. The statute states the principle
      // — "poměrná část odpovídající počtu kalendářních dnů" — and no authority
      // publishes the formula, the divisor or any rounding. So the arithmetic
      // below is a documented assumption, flagged as one.
      const days = Math.max(0, Math.min(input.applicableDays, input.daysInMonth));
      if (input.daysInMonth <= 0) return full;
      const reduced = czk(Math.round((toCzkNumber(full) * days) / input.daysInMonth));
      // The note is pushed only when the minimum actually moved. Announcing a
      // pro-rata that did not happen is the same defect as performing one that
      // should not have — it tells the reader the figure means something it
      // does not.
      if (reduced !== full) {
        notes.push({
          key: 'health.minimumProRated',
          severity: 'assumption',
          text: 'health.note.proRataFormulaNotPublished',
        });
      }
      return reduced;
    }

    case 'employer_obstacle':
    case 'standard':
    default:
      return full;
  }
}

export function calculateHealth(
  grossTaxable: Halere,
  input: HealthMinimumInput,
  rules: CzRuleset,
): HealthResult {
  const notes: EngineNote[] = [];
  const lines: LineItem[] = [];
  const rate = rules.healthTotalRate.value;

  const actualBase = grossTaxable;

  // ── The premium on what was actually earned ──────────────────────────────
  const premiumOnActual = percentOfRoundedToCzk(actualBase, rate, 'up');
  const employeeOnActual = employeeThird(premiumOnActual);
  const employerOnActual = subtract(premiumOnActual, employeeOnActual);

  lines.push({
    key: 'healthPremiumTotal',
    amount: premiumOnActual,
    formula: 'health.formula.totalPremium',
    rateNote: `${rate} %`,
    baseNote: 'health.base.actual',
    roundingNote: 'health.rounding.upToCzkOnce',
    sourceId: rules.healthTotalRate.sourceId,
    legalBasis: '§ 2 odst. 1 a 2 zákona č. 592/1992 Sb.',
    origin: 'statutory',
  });

  if (premiumOnActual > ZERO && toCzkNumber(premiumOnActual) % 3 !== 0) {
    notes.push({
      key: 'health.shareRoundingConvention',
      severity: 'assumption',
      text: 'health.note.shareRoundingNotPrescribed',
    });
  }

  // ── The minimum assessment base and any shortfall ────────────────────────
  const minimum = applicableMinimum(input, rules, notes);
  const minimumApplies = minimum !== null;
  const shortfall = minimumApplies ? maxHalere(subtract(minimum, actualBase), ZERO) : ZERO;

  let topUpPaidByEmployee: Halere = ZERO;
  let topUpPaidByEmployer: Halere = ZERO;

  if (shortfall > ZERO) {
    // THE TOP-UP IS A REMAINDER, NOT A SECOND PREMIUM.
    //
    // § 3 odst. 10 prescribes no rounding of its own, and § 2 odst. 2 rounds
    // "pojistné" up to a whole koruna. Applying that ceiling independently to
    // the premium on the actual base AND to 13,5 % of the shortfall is two
    // ceilings on two halves of one exact sum — the very defect this module's
    // header condemns three paragraphs above.
    //
    // It is not hypothetical. 0,135·g + 0,135·(22 400 − g) = 3 024 exactly, so
    // two independent ceilings return 3 025 for every gross that is not a
    // multiple of 200 Kč — 22 288 of the 22 400 whole-koruna values below the
    // minimum. VZP publishes the minimum premium as 3 024 Kč, so that reading
    // contradicts a printed figure on almost every sub-minimum salary.
    //
    // So the month's total is computed once on the minimum base and the top-up
    // is what remains after the premium on actual earnings. The employer stays
    // tied to the actual base (§ 3 odst. 10 keeps them out of the difference),
    // the employee bears the remainder, and the two sum to exactly what is
    // remitted.
    const premiumOnMinimum = percentOfRoundedToCzk(minimum as Halere, rate, 'up');
    const topUp = maxHalere(subtract(premiumOnMinimum, premiumOnActual), ZERO);
    notes.push({
      key: 'health.topUpRounding',
      severity: 'assumption',
      text: 'health.note.topUpRoundingNotPrescribed',
    });

    if (input.situation === 'employer_obstacle') {
      topUpPaidByEmployer = topUp;
      notes.push({
        key: 'health.topUpEmployer',
        severity: 'assumption',
        text: 'health.note.topUpBorneByEmployerAsserted',
      });
    } else {
      topUpPaidByEmployee = topUp;
      notes.push({
        key: 'health.topUpEmployee',
        severity: 'warning',
        text: 'health.note.topUpBorneByEmployeeAlone',
      });
    }

    lines.push({
      key: 'healthMinimumTopUp',
      amount: topUp,
      formula: 'health.formula.topUp',
      rateNote: `${rate} %`,
      baseNote: 'health.base.shortfall',
      sourceId: rules.healthMinimum.sourceId,
      legalBasis: '§ 3 odst. 10 zákona č. 592/1992 Sb.',
      origin: 'statutory',
    });
  }

  const employee = add(employeeOnActual, topUpPaidByEmployee);
  const employer = add(employerOnActual, topUpPaidByEmployer);

  lines.push({
    key: 'healthEmployee',
    amount: employee,
    formula: 'health.formula.employeeShare',
    baseNote: 'health.base.thirdOfPremium',
    sourceId: rules.employeeHealthRate.sourceId,
    legalBasis: '§ 9 odst. 2 zákona č. 48/1997 Sb.',
    origin: 'statutory',
  });
  lines.push({
    key: 'healthEmployer',
    amount: employer,
    formula: 'health.formula.employerShare',
    baseNote: 'health.base.twoThirdsOfPremium',
    sourceId: rules.employerHealthRate.sourceId,
    legalBasis: '§ 9 odst. 2 zákona č. 48/1997 Sb.',
    origin: 'statutory',
  });

  return {
    actualBase,
    minimumBase: minimum ?? ZERO,
    minimumApplies,
    shortfall,
    employeeOnActual,
    employerOnActual,
    employee,
    employer,
    topUpPaidByEmployee,
    topUpPaidByEmployer,
    lines,
    notes,
  };
}
