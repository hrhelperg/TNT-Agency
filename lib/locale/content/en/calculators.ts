import type { LocaleCorpus } from '../types'

/**
 * English content for the Czech employer-cost calculator.
 *
 * THIS IS CZECH PAYROLL EXPLAINED IN ENGLISH. Not a UK, US or Irish
 * calculator, and not a generic European one. Every rate, threshold and statute
 * on this page belongs to the Czech Republic, and the page says so in its title,
 * its H1 and its first sentence.
 *
 * The lists below are not decoration. The Czech source page carries its
 * structure as bullets, and scripts/validate-locale-fidelity.mjs checks — item
 * by item, against a hash of each bullet's text — that the English page still
 * carries what the Czech one does. Folding them into prose is exactly how 240
 * load-bearing items disappeared from an earlier release while every gate
 * stayed green.
 */
export const EN_CALCULATORS: LocaleCorpus = {
  'germany-employer-cost-calculator': {
    en: {
      title: 'Germany employer cost calculator 2026 — contributions, net pay, total cost',
      description:
        'Work out what an employee costs a German employer in 2026 and what reaches their account: pension, unemployment, health and long-term care contributions, wage tax under the Finance Ministry’s official algorithm, net pay and total employer cost — with the statute named for every figure.',
      h1: 'Germany employer cost calculator 2026',
      intro:
        'Gross pay in Germany is neither what the employer pays nor what the employee receives. Between those two figures sit four branches of social insurance, wage tax computed by the Federal Ministry of Finance’s official algorithm, the solidarity surcharge and, for some employees, church tax — each with its own assessment base, its own ceiling and its own rounding rule. This page carries a calculator that works them out under the German rules in force for 2026, and explains underneath where every number comes from. Every rate names the provision it rests on; the values were verified on 24 August 2026 against the statutes themselves, the 2026 contribution-thresholds ordinance and the GKV-Spitzenverband’s published figures.',
      sections: [
        {
          heading: 'What an employee costs a German employer',
          body: [
            'Statutory payroll cost in Germany has three layers: the gross wage, the employer’s share of four social-insurance branches, and the levies the employer carries alone. For an ordinary employee below the ceilings, the employer’s share of the four branches comes to roughly 21 % of gross.',
            'On top of that sit the U1, U2 and U3 levies and statutory accident insurance. Each health fund sets U1 and U2 in its own rules, so they differ between funds by whole percentage points; accident insurance is assessed by the trade association from its risk tariff and billed in arrears for the whole year. Neither has a general rate that could safely be assumed, so the calculator asks rather than estimating.',
            'At 4,000 EUR a month with the average supplementary health rate, the four branches plus the insolvency levy come to 4,852.00 EUR of employer cost — a factor of 1.21 on gross. That figure deliberately excludes U1, U2 and accident insurance: they have no general rate, so any number quoted for them would be invented. Above the ceilings the factor falls, because the contributions stop while the gross keeps rising.',
          ],
          list: {
            items: [
              'Gross pay',
              'Pension insurance — half of 18.6 %',
              'Unemployment insurance — half of 2.6 %',
              'Health insurance — half of 14.6 % plus half the fund’s supplementary rate',
              'Long-term care insurance — 1.8 % (1.3 % in Saxony)',
              'Insolvency benefit levy U3 at 0.15 %',
              'Levies U1 and U2 under the health fund’s own rules',
              'Statutory accident insurance under the trade association’s risk tariff',
            ],
          },
        },
        {
          heading: 'Two ceilings that are constantly confused',
          body: [
            'Germany has two different contribution ceilings for 2026, plus a third figure that is not a ceiling at all. Health and long-term care contributions are assessed on pay up to 5,812.50 EUR a month, or 69,750 EUR a year. Pension and unemployment insurance have a higher one: 8,450 EUR a month, 101,400 EUR a year.',
            'The third figure is the threshold for compulsory membership of the statutory health system — 77,400 EUR a year. Above it an employee may insure privately instead. It is not a contribution ceiling and never has been; treating it as one overstates the assessment base by 7,650 EUR a year. The calculator keeps the two apart and names both in its methodology.',
            'One set of figures applies across the whole country for 2026. The separate eastern ceiling that older tables still carry is absent from the 2026 ordinance — the east/west distinction no longer applies to these values.',
          ],
          list: {
            items: [
              'Health and long-term care: 5,812.50 EUR a month',
              'Pension and unemployment: 8,450 EUR a month',
              'Compulsory health-insurance threshold: 77,400 EUR a year — not a ceiling',
              'Reference value (Bezugsgröße): 3,955 EUR a month',
            ],
          },
        },
        {
          heading: 'Wage tax is not a percentage',
          body: [
            'German wage tax is not gross multiplied by a rate. The Ministry of Finance publishes a Programmablaufplan each year — a binding algorithm of 23 subroutines that annualises the pay, subtracts the allowances belonging to the tax class, computes a notional insurance deduction from fictitious contribution rates, applies the tariff under § 32a EStG and converts the result back to the pay period. The order of the steps is part of the rule, and every intermediate value has a prescribed number of decimal places.',
            'The calculator follows that procedure step by step in its 2026 form (the Ministry’s circular of 12 November 2025). The implementation reproduces both official verification tables published with the algorithm in full — 516 figures across all six tax classes, for an employee insured in every branch and for one insured in none.',
            'The tax class does not decide the year’s tax, only how it is spread across the year. Classes V and VI use their own construction with a 14 % floor and a 42 % ceiling, so they cannot be derived from the ordinary tariff.',
          ],
        },
        {
          heading: 'Long-term care: children, childlessness and Saxony',
          body: [
            'Long-term care is the one branch where the two sides differ. The base rate is 3.6 %; § 55 Absatz 1 SGB XI still reads 3.4 %, and the rate actually in force comes from an ordinance made under Absatz 1a — reading the statute alone leaves you 0.2 points short.',
            'An employee with no children pays a further 0.6 points from the end of the month in which they turn 23. Conversely, each of the second to fifth child under 25 lowers their share by 0.25 points. Both land on the employee alone: the employer pays 1.8 % in every family situation. The statutory text reads as though the discount reduces the whole rate, and therefore the employer’s share too — the published fund tables and the official tax algorithm both show otherwise.',
            'Saxony has its own rule under § 58 Absatz 3 SGB XI: the employee bears one percentage point alone and the remainder is halved, giving 2.3 % employee against 1.3 % employer. The total does not change — the point moves, it is not added.',
          ],
          list: {
            items: [
              'Base rate 3.6 %, split in half',
              'Childless employee from 23: +0.6 points, borne alone',
              'Second to fifth child under 25: −0.25 points each, employee only',
              'Saxony: 2.3 % employee / 1.3 % employer',
            ],
          },
        },
        {
          heading: 'The supplementary health rate is not one number',
          body: [
            'Alongside the general rate of 14.6 %, every German health fund levies its own supplementary rate under § 242 SGB V. The Health Ministry announces only an average — 2.9 % for 2026 — and that average governs only the cases the statute names. A particular fund may charge appreciably more or less.',
            'Since 1 January 2019 the supplementary rate has been split between employee and employer exactly like the general one. Older descriptions in which the employee bears it alone are out of date, and the difference is material: at 2.9 % it is about 1.45 % of gross on the employer’s side.',
            'The calculator therefore takes the supplementary rate as an input, pre-filled with the 2.9 % average and labelled as a default rather than as a fact about any particular employee.',
          ],
        },
        {
          heading: 'What the calculator refuses, and why',
          body: [
            'It will not compute a Minijob or a job inside the transition band. Up to 603 EUR a month the employer pays flat-rate contributions instead of the ordinary ones; from there to 2,000 EUR the assessment base is reduced by a factor and the employer carries the difference. Neither is a smaller version of the ordinary calculation — it is a different regime, and the ordinary calculation would return a plausible-looking answer to a different question.',
            'It also refuses cases it cannot detect from the numbers and therefore asks about: private health insurance, civil servants, concurrent employments, working pensioners, the miners’ scheme, professional pension institutions, short-time work, one-off payments, cross-border situations and benefits in kind. Each refusal states its reason.',
            'The cap on church-tax progression is likewise not applied. It is generally granted in the annual assessment and usually on application, its base is taxable income the employer never sees, and the percentage comes from each religious community’s own resolution. The employer withholds the uncapped amount, and so does the calculator — with a note saying the cap exists.',
          ],
          list: {
            items: [
              'Minijob up to 603 EUR a month',
              'Transition band up to 2,000 EUR a month',
              'Private health insurance',
              'Civil servants and members of professional pension schemes',
              'Concurrent employments',
              'One-off payments and benefits in kind',
            ],
          },
        },
        {
          heading: 'Church tax, the solidarity surcharge and the child allowance',
          body: [
            'Church tax is withheld at the rate in force where the WORKPLACE is, not where the employee lives: 8 % in Bavaria and Baden-Württemberg, 9 % in the other fourteen states. An employee living in Bavaria and working in Hesse therefore has 9 % withheld, and the difference comes back in their annual assessment. It is deducted from the employee, so it changes net pay and never employer cost.',
            'The child allowance (Kinderfreibetrag) does not reduce the wage tax. It lowers only the base for the solidarity surcharge and church tax, because families receive child benefit through the year instead; the annual assessment then compares which of the two is worth more. A calculator that showed the wage tax falling with each allowance would be describing the assessment, not the payslip.',
            'The result models one full month at a steady wage and is not a payroll run. Real payroll works with part months, one-off payments, benefits in kind and individual ELStAM data the calculator has no sight of.',
          ],
        },
        {
          heading: 'Sources and method',
          body: [
            'Wage tax follows the Federal Ministry of Finance’s 2026 Programmablaufplan; social insurance follows SGB III, V, VI and XI; the contribution arithmetic follows the Beitragsverfahrensverordnung; and the ceilings come from the 2026 Sozialversicherungsrechengrößen-Verordnung (BGBl. 2025 I Nr. 278). The values were verified on 24 August 2026 in the texts themselves and cross-checked against the GKV-Spitzenverband’s figures of 26 November 2025.',
            'Contributions are computed as § 2 Absatz 1 BVV prescribes: for an equally split branch, half the rate is applied, the result rounded, and only then doubled. That is not the same as computing the whole contribution and halving it — the two differ by a cent on ordinary salaries. Intermediate results are not rounded at all, per § 1 Absatz 2 BVV.',
            'The rules are held per year. A 2026 result stays reproducible after the 2027 parameters appear. Worth recording: the German statute stabilising health-insurance rates, enacted on 24 July 2026, amended § 223 SGB V mid-year — but every operative provision bites from 2027 and none of it touches a 2026 payslip.',
          ],
        },
      ],
      breadcrumb: 'Germany employer cost calculator',
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'Modelling a specific role? Describe the position and we will go through the options.',
      },
    },
  },

  'employer-cost-calculator': {
    en: {
      title: 'Czech Employer Cost Calculator 2026 — contributions, net salary, total cost',
      description:
        'Calculate what an employee costs a Czech employer in 2026 and what they receive net: social and health insurance, income-tax advance and the total employer cost, with the statute named for every figure.',
      h1: 'Czech employer cost calculator 2026',
      intro:
        'Gross salary is neither what the employer pays nor what the employee receives. Between those two figures sit Czech social insurance, Czech health insurance and the monthly income-tax advance — each with its own assessment base, its own rounding rule and its own exceptions. This page carries a calculator that computes them under the rules in force in the Czech Republic for 2026, and explains where each figure comes from. Every rate names the provision it follows; the values were verified against ČSSZ, Finanční správa, MPSV and the public health insurers on 24 August 2026.',
      sections: [
        {
          heading: 'What an employee costs a Czech employer',
          body: [
            'The statutory payroll cost has four parts. For a standard employee the first three are fixed by Czech law and come out the same for every employer in the country at a given gross salary; the fourth depends on what the company does.',
            'Employer social and health insurance together come to 33.8 % of gross. On a gross salary of 40 000 CZK that is 13 520 CZK on top, a statutory cost of 53 520 CZK a month — before statutory accident insurance and before anything the company provides beyond the wage.',
            'The calculator keeps those two layers apart to the end. The statutory cost is a legal fact; benefits, accommodation, equipment and recruitment are one company’s decisions. Adding them into a single figure would present a company’s choices as law.',
          ],
          list: {
            items: [
              'Gross salary',
              'Employer social insurance at 24.8 %',
              'Employer health insurance — two thirds of 13.5 %',
              'Statutory accident-liability insurance, by the employer’s prevailing activity',
            ],
          },
        },
        {
          heading: 'Gross and net: what is deducted from what',
          body: [
            'The employee has 7.1 % social insurance deducted, one third of the 13.5 % health premium, and the monthly income-tax advance. The old "super-gross" base is abolished — the tax base is simply employment income under § 6 odst. 12 of the Czech Income Tax Act, so gross pay is not uplifted by the employer’s contributions.',
            'The other half of that mistake is equally common: the employee’s own insurance is NOT deductible from the tax base. The base is gross pay, not gross pay less 7.1 % and 4.5 %.',
            'On 40 000 CZK gross with a signed taxpayer declaration the net salary is 31 930 CZK: 2 840 CZK social, 1 800 CZK health, and a 3 430 CZK tax advance after the 2 570 CZK basic credit.',
          ],
        },
        {
          heading: 'Employer social insurance',
          body: [
            'The standard employer rate is 24.8 % of the assessment base under § 7 of zákon č. 589/1992 Sb., split into 21.5 % pension, 2.1 % sickness and 1.2 % employment policy. The employee pays 7.1 %.',
            'But 24.8 % is not simply "the employer rate". Czech law defines three rate classes, and the high-risk one is keyed to the year — it rises to 28.8 % in 2027 and 29.8 % from 2028, so it can never be carried between years. The calculator offers all three and defaults to the standard class.',
            'There is an important floor: where monthly income does not reach 4 500 CZK the employment does not found participation in Czech sickness insurance, and no social insurance is due from either side. Health insurance has no such threshold.',
          ],
          list: {
            items: [
              'Standard employee 24.8 %',
              'Paramedics and works fire-brigade members 29.8 %',
              'High-risk work 27.8 % in 2026 (28.8 % in 2027, 29.8 % from 2028)',
              'Below the 4 500 CZK participation threshold neither side pays social insurance',
            ],
          },
        },
        {
          heading: 'Health insurance: one rate, one rounding, then thirds',
          body: [
            'This is where most calculators go wrong. Czech law sets a single rate: "Výše pojistného činí 13,5 % z vyměřovacího základu" (§ 2 odst. 1, zákon č. 592/1992 Sb.). The premium is rounded UP to whole koruny once (§ 2 odst. 2), and only then is the RESULT split — one third borne by the employee, two thirds by the employer (§ 9 odst. 2, zákon č. 48/1997 Sb.).',
            'The rates 9 % and 4.5 % are not in the statute. The string "4,5" does not occur in zákon č. 592/1992 Sb. at all, and § 9 odst. 1 of zákon č. 48/1997 Sb. says expressly that the rate is set by another act — so that act only divides an amount quantified elsewhere.',
            'The difference is not academic. On an assessment base of 22 401 CZK the correct method gives 3 025 CZK (0.135 × 22 401 = 3 024.135, rounded up). Applying two independently rounded rates gives 1 009 + 2 017 = 3 026 CZK — one koruna more, and a return that does not reconcile.',
          ],
        },
        {
          heading: 'The minimum health assessment base',
          body: [
            'The minimum assessment base for an employee is the Czech minimum wage: 22 400 CZK a month for 2026 (§ 3 odst. 6, zákon č. 592/1992 Sb.). The minimum premium from it is exactly 3 024 CZK.',
            'The minimum is NOT reduced for part-time work. VZP states it literally — "regardless of the length of the working time" — so an employee on a 20 % contract still faces the full 22 400 CZK floor. This is the single most common error in Czech payroll calculators.',
            'The decisive question is who pays the shortfall. By default the EMPLOYEE alone bears 13.5 % of the difference between the actual and the minimum base, remitted through the employer — it is not split into thirds and does not raise the employer’s cost. The exception is where the low base arises from an obstacle on the employer’s side, in which case the employer bears it (§ 3 odst. 10). The calculator cannot infer that from figures and asks.',
            'For 2026 the exemptions from the minimum are a list of five, and each must last the whole calendar month. Zákon č. 289/2025 Sb., effective 1 January 2026, repealed the former childcare letter and re-lettered the rest; caring parents now reach an exemption only through the category where the state is the payer.',
          ],
          list: {
            items: [
              'Holder of a Czech ZTP or ZTP/P card',
              'A person of retirement age who has not become entitled to an old-age pension',
              'A person concurrently self-employed who pays advances from at least the self-employed minimum',
              'A person for whom the Czech state is the payer of premium',
              'A person receiving only foster-carer remuneration',
            ],
          },
        },
        {
          heading: 'The annual maximum social assessment base',
          body: [
            'The maximum assessment base for 2026 is 2 350 416 CZK — 48 times the statutory average wage of 48 967 CZK (§ 15a, zákon č. 589/1992 Sb.). It is an ANNUAL, CUMULATIVE ceiling rather than a monthly cap, so payroll must carry a running year-to-date sum.',
            'Above the ceiling the employer stops paying too. § 15a odst. 4 removes the excess from the employer’s base as well, so the marginal social cost above the cap is 0 % + 0 %, not 0 % + 24.8 %. That is the opposite of what is usually stated.',
            'The stop applies only where the employee works for a single employer in the year. With several employers none of them pays less; the employee reclaims the overpayment afterwards, and the employer share is never refunded.',
            'A single monthly salary does not contain that information. So the calculator either says in words that it assumes the ceiling has not been reached, or asks in advanced mode for the base already used this year. Pretending a monthly figure is enough would be a silent guess about hundreds of thousands of koruny.',
          ],
        },
        {
          heading: 'Employee income tax and the monthly advance',
          body: [
            'The procedure is fixed by § 38h of the Czech Income Tax Act and its order is binding. The base is rounded up first — to whole koruny at or below 100 CZK, to whole hundreds above it. Then 15 % applies up to the monthly threshold of 146 901 CZK and 23 % above it. The sum is rounded up to whole koruny, and only then are credits subtracted.',
            'The 146 901 CZK threshold is three times the average wage of 48 967 CZK, and it is compared against the ROUNDED base. That has an unexpected consequence: a gross salary of exactly 146 901 CZK rounds to 147 000 CZK, so 99 CZK falls into the 23 % band.',
            'Without a signed Czech taxpayer declaration nothing is applied monthly — not the 2 570 CZK basic credit and not the child benefit (§ 38h odst. 5). The employee recovers them in the annual settlement or a return. A non-resident may claim only the basic credit monthly; disability and ZTP/P credits wait for the annual settlement.',
            'Withholding tax can also arise inside an ordinary employment: where no declaration is signed and monthly income does not reach 4 500 CZK, the income is a separate tax base at a flat 15 % with no credits, and both the base and the tax round DOWN. A full-time month never reaches this, a mid-month start or unpaid leave does.',
          ],
          list: {
            items: [
              'Basic taxpayer credit 2 570 CZK a month',
              'Disability of degree I or II 210 CZK, degree III 420 CZK a month',
              'Holder of a Czech ZTP/P card 1 345 CZK a month',
              'Child tax benefit 1 267 / 1 860 / 2 320 CZK by birth order, doubled for a child with a ZTP/P card',
            ],
          },
        },
        {
          heading: 'The child tax bonus',
          body: [
            'Where the child tax benefit exceeds the computed tax, the difference becomes a monthly tax bonus that the employer pays out to the employee. A bonus is not salary and the calculator never labels it as such — it is the paid-out part of a tax benefit.',
            'It is paid only when two conditions hold together: the bonus must be at least 50 CZK, and monthly income from this payer must reach at least half the Czech minimum wage, i.e. 11 200 CZK for 2026 (§ 35d odst. 4). There is no upper limit on the bonus.',
            'So at lower salaries with several children the net figure can exceed the gross one. That is not a calculation error — it is precisely what the child tax benefit is for.',
          ],
        },
        {
          heading: 'Statutory employer accident-liability insurance',
          body: [
            'Statutory insurance against employer liability for work injury and occupational disease is a real employer cost and belongs in any total. It arises by operation of Czech law with no policy concluded, and two insurers administer it on a historical split: Generali Česká pojišťovna covers employers insured with Česká pojišťovna on 31 December 1992, Kooperativa everyone else.',
            'One rate applies to the whole employer, set by its prevailing business activity (§ 12 odst. 2, vyhláška č. 125/1993 Sb.). The table has eight bands from 2.8 ‰ to 50.4 ‰ of the assessment base, and the decree prescribes no rounding at any step.',
            'The base is the aggregate assessment base of all employees for the PRECEDING quarter, payable by the end of the first month of the quarter being insured. The annual social maximum is not applied to this premium — both administrators publish that, though the decree itself does not say so, and the calculator flags that weaker footing.',
            'Any per-employee figure is therefore an ALLOCATED share, never an invoice. For the same reason the 100 CZK quarterly minimum is not added to one employee’s share: it is a floor for the whole employer.',
          ],
        },
        {
          heading: 'What the calculator covers',
          body: [
            'The calculator models a standard Czech employment relationship (HPP) under the 2026 rules, and states the rate, the base, the rounding applied and the statutory provision for every figure.',
          ],
          list: {
            items: [
              'Employee and employer social insurance including the annual maximum',
              'Health insurance including the minimum assessment base and who bears the top-up',
              'The § 38h tax advance, tax credits and the child tax benefit',
              'Withholding tax where Czech law applies it',
              'The employer discount for reduced working time, to the extent its conditions are measurable',
              'The relief for a working old-age pensioner',
              'Statutory accident-liability insurance as an allocated share',
              'Company costs beyond the wage, as a separate layer',
            ],
          },
        },
        {
          heading: 'What it does not cover, and why',
          body: [
            'The list below is not a set of missing features. Each is a case where the rule cannot be evidenced from a primary source, or where it turns on a legal judgement that no figure can supply. In that situation the calculator says the case requires an individual payroll calculation rather than returning a number that is nearly right.',
            'The Czech DPP and DPČ agreements are absent entirely from this version. They carry their own participation thresholds and their own taxation, and a half-verified version of them would be worse than none.',
          ],
          list: {
            items: [
              'Rounding of the health thirds when the premium is not divisible by three — neither statute nor methodology prescribes it',
              'The exact pro-rata formula for the minimum base in an incomplete month',
              'Splitting the top-up where a low base arises partly from an employer-side obstacle and partly otherwise',
              'Employer wage compensation for the first 14 days of sickness',
              'Concurrent employment with several employers',
              'The DPP and DPČ agreements',
            ],
          },
        },
        {
          heading: 'Holiday and sickness: why they are not added on',
          body: [
            'Four weeks of holiday are NOT added to a monthly salary as an extra percentage. For a monthly-paid employee paid leave is already part of the compensation structure — a month containing holiday costs the same as one without. Adding holiday separately would count the same salary twice.',
            'An employer who wants to model the cost of covering that absence is modelling a separate operating cost, not a higher wage. It can be entered in the additional-costs fields, but the calculator never invents it.',
            'No "average sickness rate" is baked in either. This version does not compute wage compensation for the first 14 days of incapacity, because the reduction mechanics and their rounding are not fully evidenced from primary sources — and an invented average would be worse than an admitted gap.',
          ],
        },
        {
          heading: 'Sources and methodology',
          body: [
            'Every rate, threshold and amount in the calculator carries its source, its legal basis and its verification status in the data. The values were verified on 24 August 2026 against the Czech Social Security Administration, the Czech Financial Administration, the Ministry of Labour and Social Affairs and the public health insurers; the accident-insurance rate table comes from vyhláška č. 125/1993 Sb. and its administrators’ methodology.',
            'Rules are versioned by year. A 2026 calculation stays reproducible after the 2027 government decrees appear, because those are added alongside rather than written over the old ones. Autumn is also when this set is due to be re-checked, since that is when the following year’s parameters become knowable.',
            'Where sources diverge, or where a rule states only a principle without a formula, the calculator says so at the figure concerned. That applies to the rounding of the health thirds, the pro-rata reduction of the minimum base, and the disapplication of the annual maximum to accident insurance.',
          ],
        },
        {
          heading: 'Common questions',
          body: [
            'What percentage does a Czech employer pay on top of gross in 2026? For a standard employee, 24.8 % social insurance and two thirds of the 13.5 % health premium — 33.8 % of gross together. Statutory accident-liability insurance is added on top at a rate between 2.8 ‰ and 50.4 ‰ depending on the employer’s prevailing activity.',
            'Does the Czech super-gross wage still exist? No. It was abolished, and under § 6 odst. 12 the tax base is simply employment income, so gross pay is not uplifted by employer contributions. Equally, the employee’s own insurance is not deductible from the tax base.',
            'Why is health insurance 13.5 % rather than 9 % plus 4.5 %? Because 9 % and 4.5 % are not in the statute. Zákon č. 592/1992 Sb. knows one rate of 13.5 %; the premium is rounded up to whole koruny and only the result is divided, one third to the employee and two thirds to the employer. Computing the two rates separately and rounding each produces a premium one koruna too high.',
            'Who pays the top-up to the minimum health assessment base? By default the employee alone, through the employer — the 13.5 % on the difference is not split into thirds. The employer bears it only where the low base arose from an obstacle on the employer’s side.',
            'Is the minimum assessment base reduced for part-time work? It is not. VZP states expressly that the minimum applies regardless of the length of working time, so an employee on a 20 % contract faces the full 22 400 CZK. Pro-rata reduction by calendar days is a different rule and covers an incomplete month or listed statutory obstacles.',
            'What happens once the maximum assessment base is reached? For an employee with a single employer in the year, neither the employee nor the employer pays on the amount above 2 350 416 CZK. With several employers none of them pays less; the employee reclaims the overpayment and the employer share is never refunded.',
            'When can net pay exceed gross pay? When the child tax benefit exceeds the computed tax and a monthly tax bonus arises. It is paid where it reaches at least 50 CZK and monthly income reaches at least half the minimum wage, 11 200 CZK for 2026. The bonus is not salary but the paid-out part of a tax benefit.',
            'Does the calculator handle DPP and DPČ agreements? It does not. Those agreements have their own participation thresholds and their own taxation, and this version deliberately excludes them — a partial implementation would return figures that look right and are not.',
            'Does the calculator add four weeks of holiday to the cost? It does not, by design. For a monthly-paid employee paid leave is part of the compensation structure, and adding holiday as a further percentage would count the same salary twice. The cost of covering the absence can be entered separately as an operating cost.',
          ],
        },
      ],
      breadcrumb: 'Czech employer cost calculator',
      cta: {
        label: 'Request staff',
        targetConceptId: 'request-staff',
        note: 'Modelling a specific role? Describe the position and we will go through the options.',
      },
    },
  },
}
