# Czech labour-law source audit — 2026

Companion to `docs/latam-worker-legal-source-audit-2026.md`, which covers
immigration, consular and regulated-profession law. This document covers the
axis that corpus never had: **Czech labour law**.

## 1. Why this audit exists

The PT-BR / ES candidate corpus shipped in PR #52 **names** worker rights and
never **measures** them. `worker-rights` says pay may not fall below the legal
minimum without saying what that minimum is; it says there are "limites de
jornada" without saying what they are; `life-and-work` says overtime is paid
without stating any cap.

That was not timidity. It was correct: the corpus had sixteen registered
sources, all of them immigration, consular or health-profession sources, and
**not one instrument of labour law**. A number with no source behind it could
not have passed the freshness gate, and should not have.

This audit registers that axis so the corpus can state figures it can prove.

## 2. Primary sources

| id | Instrument | Accessed |
|---|---|---|
| `labourCode` | Zákon č. 262/2006 Sb., zákoník práce, in force text | 2026-09-22 |
| `minWageMpsv` | MPSV — *Minimální mzda* (official guidance page, last updated 7 October 2025) | 2026-09-22 |
| `minWageNotice` | Sdělení MPSV č. 356/2025 Sb. — minimum wage and lowest levels of guaranteed *plat* for 2026 | 2026-09-22 |
| `minWageCoefficient` | Nařízení vlády č. 285/2024 Sb. — coefficient for calculating the minimum wage in 2025 and 2026 | 2026-09-22 |
| `avgWagePrediction` | Sdělení Ministerstva financí č. 312/2025 Sb. — predicted average gross monthly wage for 2026 | 2026-09-22 |
| `labourInspection` | Zákon č. 251/2005 Sb., o inspekci práce — enforcement body | 2026-09-22 |

## 3. P1 LEGAL AUDIT AMENDMENT — guaranteed wage is gone

**The design proposal this audit was commissioned under was wrong, and the
error was load-bearing.**

The approved scope said the wave would publish *zaručená mzda* — the guaranteed
wage floor by work-difficulty group — as an anti-underpayment protection for
candidates on production lines and in warehouses.

That protection **no longer exists for them.** Amendment 230/2024 Sb. abolished
the guaranteed wage for the private sector with effect from 1 January 2025. The
eight work groups no longer bind a private-sector employer; the minimum wage is
now the only floor. § 112 of the Labour Code is today titled *Zaručený **plat***
and governs *plat* — public-sector salary — in four levels, not *mzda*.

Verbatim, § 112(2):

> "Plat nesmí být nižší než příslušná nejnižší měsíční úroveň zaručeného platu.
> Nejnižší úroveň měsíčního a hodinového zaručeného platu se stanoví ve 4
> úrovních tak, aby činila a) v 1. skupině prací 1násobek minimální mzdy, b) ve
> 2. skupině prací 1,2násobek minimální mzdy, c) ve 3. skupině prací
> 1,4násobek minimální mzdy a d) ve 4. skupině prací 1,6násobek minimální mzdy."

Confirmed independently in § 111(1), which defines the minimum wage as the floor
for an employee who has **no** right to a guaranteed *plat* level under § 112(2).

Almost every candidate this corpus addresses — manufacturing, warehouse, trades,
most engineering — is employed in the private sector and paid *mzda*. Publishing
group-based wage floors for them would have published a repealed protection to
an audience with no way to check. **CUT from scope. Nothing about guaranteed
wage groups ships to a private-sector reader.**

## 4. Verified propositions

Each carries the literal Czech text. Nothing below is paraphrase.

### 4.1 Minimum wage — 2026

> "Od 1. ledna 2026 do 31. prosince 2026 činí minimální mzda pro stanovenou
> týdenní pracovní dobu 40 hodin 22 400 Kč za měsíc nebo 134,40 Kč za hodinu."

Set by sdělení MPSV č. 356/2025 Sb. Derived from the Ministry of Finance
prediction of the average gross wage for 2026 (51 497 Kč) times the coefficient
0,434 fixed by nařízení vlády č. 285/2024 Sb., rounded up to whole hundreds.

**Both figures expire on 31 December 2026.** See §6.

### 4.2 What may NOT be counted toward the minimum wage

§ 111(1), verbatim:

> "Do mzdy nebo odměny z dohody se pro tento účel nezahrnuje mzda za práci
> přesčas, příplatek za práci ve svátek, za noční práci, za práci ve ztíženém
> pracovním prostředí, za zvýšenou zátěž zaměstnance ve zdravotnictví a za práci
> v sobotu a v neděli."

This is the single most useful anti-exploitation fact in the audit. An employer
cannot reach the minimum wage by counting night, weekend, holiday or overtime
premiums. Those sit **on top**.

If pay still falls short, § 111(2) obliges the employer to pay the difference
(*doplatek*).

### 4.3 Weekly working time — and the shift discount

§ 79(1)–(2), verbatim:

> "(1) Délka stanovené týdenní pracovní doby činí 40 hodin týdně.
> (2) Délka stanovené týdenní pracovní doby činí u zaměstnanců … b) s
> vícesměnným nebo nepřetržitým pracovním režimem 37,5 hodiny týdně, c) s
> dvousměnným pracovním režimem 38,75 hodiny týdně."

Defined in § 78(1): a two-shift regime is one where employees regularly alternate
in 2 shifts within 24 consecutive hours; a multi-shift regime, 3 or more; a
continuous regime, shifts in continuous operation; continuous operation requires
work 24 hours a day, 7 days a week.

MPSV states the consequence: the hourly minimum wage rises proportionally for a
shortened week, by the factor 40 ÷ x. **This corpus will state the rule and the
formula, and publish no derived table** — MPSV itself leaves the derivation to
employers, and a table of our own arithmetic would be an unsourced number.

### 4.4 Maximum shift length

§ 83(1): "Délka směny nesmí přesáhnout 12 hodin."

§ 83a permits up to 24 hours within 26 consecutive hours **only** in continuous
healthcare operations, for doctors, dentists, pharmacists and non-medical health
professionals, and only where agreed in a collective agreement or set in an
internal regulation. Relevant to `healthcare-regulated-professions` and to no
other occupation page.

### 4.5 Rest

§ 90(1): uninterrupted daily rest of **at least 11 hours in 24 consecutive
hours**. § 90(2) permits reduction to **8 hours** for employees over 18 provided
the following rest is extended by the amount of the reduction — in continuous
operations, unevenly distributed working time and overtime, in agriculture, and
in services to the population, among others.

§ 92(1): weekly uninterrupted rest of **at least 24 hours** plus the daily rest
under § 90(1) immediately adjoining it. § 92(3): where operations allow, the
employer gives it to all employees on the same day, so that it includes Sunday.

### 4.6 Overtime

§ 93(1): "Práci přesčas je možné konat jen výjimečně."

§ 93(2): ordered overtime "nesmí u zaměstnance činit více než 8 hodin v
jednotlivých týdnech a 150 hodin v kalendářním roce."

§ 93(3): beyond that, only by agreement with the employee.

§ 93(4): total overtime must not exceed an average of 8 hours per week over a
period of at most 26 consecutive weeks; only a collective agreement may extend
that reference period.

§ 114(1): overtime is paid as achieved wage **plus a premium of at least 25 % of
average earnings**, unless employer and employee agreed on compensatory time off
instead. § 114(2): if the time off is not given within 3 calendar months, the
premium falls due.

### 4.7 Night work

§ 94(1): a night worker's shift "nesmí překročit 8 hodin v rámci 24 hodin po
sobě jdoucích"; where operationally impossible, the average shift must not
exceed 8 hours over at most 26 consecutive weeks.

§ 94(2): the employer must ensure the night worker is medically examined by an
occupational-health provider, and bears the cost.

§ 116: night work is paid as achieved wage plus a premium "nejméně ve výši 10 %
průměrného výdělku" — **with the express caveat** "Je však možné sjednat jinou
minimální výši a způsob určení příplatku." The 10 % is a default that a contract
or collective agreement may vary. The corpus must state the caveat; publishing
10 % as an absolute would be false.

### 4.8 Weekend and public-holiday work

§ 118(1): Saturday and Sunday work carries a premium of at least 10 % of average
earnings — carrying the same "jinou minimální výši" caveat as § 116.

§ 115(1)–(2): work on a public holiday carries achieved wage plus compensatory
time off, given by the end of the third calendar month following; by agreement,
a premium of at least average earnings may replace the time off.

### 4.9 Annual leave

§ 212(1): "Výměra dovolené činí nejméně 4 týdny v kalendářním roce."

Five weeks applies to employers under § 109(3) — the state and public bodies —
not to a private employer. Eight weeks applies to teaching and academic staff.

### 4.10 When wages must be paid

§ 141(1): wages are due after the work is performed, "nejpozději v kalendářním
měsíci následujícím po měsíci, ve kterém vzniklo zaměstnanci právo na mzdu". A
regular payday must be agreed within that period (§ 141(3)). § 141(4) obliges
the employer to pay wages due before the employee takes leave.

### 4.11 Probation and notice

§ 35(2): probation may not exceed **4 consecutive months** from the start of
employment, or **8 months** for a managerial employee, and may not exceed half
the agreed duration of a fixed-term contract (§ 35(3)). It must be agreed in
writing, no later than the day employment begins.

§ 51(2): the notice period is **at least 2 months**, reduced to at least 1 month
where notice is given to the employee on the grounds in § 52(f)–(h).

*Both figures differ from the values commonly quoted (3/6 months probation; a
uniform 2-month notice). They were taken from the in-force text, not from
memory or secondary summaries.*

### 4.12 Equal treatment

§ 16(1)–(2): employers must ensure equal treatment of all employees as regards
working conditions, pay, other benefits, training and promotion; discrimination
is prohibited, expressly including on grounds of "rasového nebo etnického
původu, národnosti, státního občanství". Directly applicable to a foreign
worker, and the legal anchor for a claim the corpus already makes in prose.

### 4.13 Agency work — the claim the corpus already makes unsourced

`worker-rights` already asserts that an agency-assigned worker is entitled to
comparable pay and conditions. The instrument is § 309(5), verbatim:

> "Agentura práce a uživatel jsou povinni zabezpečit, aby pracovní a mzdové
> podmínky dočasně přiděleného zaměstnance nebyly horší, než jsou nebo by byly
> podmínky srovnatelného zaměstnance."

Two corrections to the shipped wording follow. The comparator is a *srovnatelný
zaměstnanec* — a comparable employee — and the test is whether conditions are
worse than they are **or would be**. That second limb covers the case where the
user has no comparable employee of its own, which the shipped sentence, tied to
"um empregado próprio do tomador", does not.

§ 309(5) further obliges the agency, on the worker's request or on its own
discovery, to restore equal treatment, and gives the worker a right to claim
satisfaction from the agency.

§ 309(6): an agency may not assign the same employee to the same user for longer
than **12 consecutive calendar months**, save at the employee's own request or
as maternity/parental cover. The corpus does not mention this at all. It is a
protection that applies to TalentPartnerID's own candidates.

### 4.14 Enforcement

Wage and labour-law compliance is supervised by the Státní úřad inspekce práce
and its regional inspectorates, under zákon č. 251/2005 Sb.

## 5. Corpus impact

| Concept | Action |
|---|---|
| `worker-rights` | MODIFY — quantify the four named rights; correct the § 309(5) comparator; add § 309(6); add the § 111(1) exclusion list; cite the Inspectorate |
| `life-and-work` | MODIFY — give working time, rest, overtime, leave and pay-deadline figures the page currently withholds |
| `work-in-manufacturing` | MODIFY — shift regimes, the 37,5 / 38,75 week, 12-hour shift cap, night rules |
| `work-in-logistics` | MODIFY — same, plus night and weekend premiums |
| `technical-professions` | MODIFY — shift regimes where applicable |
| `work-for-engineers` | MODIFY — working time and overtime only; shift material rarely applies |
| `healthcare-regulated-professions` | MODIFY — § 83a is the only page where the 24-hour exception is true |
| — | **CUT: guaranteed wage groups. Repealed for the private sector.** |

No new routes. The ceiling stays 43 pages, sitemap 330.

## 6. Freshness — a class the model does not have

The 90 / 180-day risk tiers do not fit these facts. The minimum wage has a
**known expiry date**: 22 400 Kč and 134,40 Kč are valid from 1 January to 31
December 2026 and are false on 1 January 2027. A 180-day conceptual tier would
let the 2026 figure sit unchallenged well into 2027.

Two mitigations, both required:

1. **The year goes in the sentence.** Copy states "válido para 2026" / "válido
   para 2026" in-line, so a stale figure is visible to the reader without
   consulting a source list.
2. **A dated freshness class** that fails the gate when the calendar year
   advances past the year the figure was declared for, independent of the
   90/180 clock.

MPSV publishes the following year's figure by 30 September, so the replacement
value is knowable before it takes effect.

## 7. What this corpus will NOT claim

- No guaranteed-wage groups for private-sector readers. Repealed.
- No derived hourly-rate table for shortened weeks. The rule and formula only.
- No presentation of the 10 % night or weekend premium as an absolute; the
  "jinou minimální výši" caveat travels with it.
- No salary ranges, market averages or earnings expectations. The existing
  no-figures policy stands; a statutory floor is not a salary range.
- No claim that any premium or entitlement is something TalentPartnerID grants.
  These are statutory, and apply irrespective of who recruited the worker.
