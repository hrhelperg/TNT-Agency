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
