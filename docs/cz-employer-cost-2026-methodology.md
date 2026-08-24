# Czech Employer Cost Calculator 2026 — methodology

What the calculator computes, what it refuses to compute, and the evidence for
each. Companion to `data/calculators/cz-employer-cost/2026/sources.ts`, which
holds the machine-readable registry, and to
`lib/calculators/cz-employer-cost/`, which holds the engine.

**Jurisdiction:** Czech Republic. **Tax year:** 2026. **Scope:** standard
employment relationship (pracovní poměr / HPP) only.
**Sources verified:** 2026-08-24.

---

## 1. How the values were established

Nine parallel research passes read the primary sources — ČSSZ, Finanční správa,
MPSV, MF, VZP and other public health insurers, the Sbírka zákonů, and the two
insurers that administer statutory employer-liability insurance by legal mandate.
Four adversarial verification passes then tried to **refute** the findings on the
areas where a wrong answer corrupts everything downstream: the health minimum
assessment base, the employer social discount, the working-pensioner relief and
the employer-liability insurance. A reconciliation pass adjudicated the result.

The outcome was 99 constants admitted to the registry, **9 conflicts blocked from
use**, and **38 cases recorded as unsupported**.

Payroll blogs and accounting-software pages were used to find leads and never as
the source of a value. Several turned out to circulate figures no authority
publishes; they are named in §7 so a later reader does not rediscover them and
assume they were missed.

---

## 2. Three corrections to the common account

These are not refinements. Each is a place where the widely repeated version is
wrong, and where implementing it produces a wrong number on someone's payslip.

### 2.1 Health insurance is one rate, rounded once, then split

Not 9 % and 4.5 % applied separately.

```
§ 2 odst. 1, z. 592/1992 Sb.   "Výše pojistného činí 13,5 % z vyměřovacího základu…"
§ 2 odst. 2                    "Pojistné se zaokrouhluje na celé koruny směrem nahoru."
§ 9 odst. 2, z. 48/1997 Sb.    "…hradí z jedné třetiny zaměstnanec, ze dvou třetin zaměstnavatel."
```

The string `4,5` does not occur in zákon č. 592/1992 Sb. at all, and neither
`4,5 %` nor `9 %` occurs in zákon č. 48/1997 Sb. § 9 odst. 1 of that act says
expressly that the rate is set by another act — so it can only be dividing a
premium quantified elsewhere. The split is a fraction **of the premium**.

| base | statutory | naive (two rounded rates) |
|---|---|---|
| 22 401 CZK | `ceil(3 024.135)` = **3 025** | `ceil(1 008.045)` + `ceil(2 016.09)` = 1 009 + 2 017 = **3 026** |

One koruna over-remitted, on a return that does not reconcile.

### 2.2 The minimum-base top-up is borne by the employee alone

§ 3 odst. 10. Where the base falls short of the minimum, 13.5 % **of the
difference** is paid by the employee through the employer. It is **not** split
into thirds and does **not** raise the employer's cost. VZP, verbatim:
*"…včetně pojistného vypočteného z rozdílu minimálního a skutečného vyměřovacího
základu (hradí pouze zaměstnanec)."*

So `max(gross, minimum) × 9 %` for the employer is wrong twice: it splits an
amount the employee owes in full, and it charges the employer for it.

The one exception — a shortfall arising *z důvodů překážek na straně organizace*,
where the employer bears it — is a legal classification of an absence. No
arithmetic reaches it, so it is an input the user asserts.

### 2.3 Above the annual maximum, the employer stops too

§ 15a odst. 4 removes the excess from the **employer's** base as well. ČSSZ:
*"…zaměstnavatel neodvádí ani pojistné za zaměstnance ani pojistné za
zaměstnavatele."* The marginal social cost above 2 350 416 CZK is 0 % + 0 %, not
0 % + 24.8 %.

This holds only for a single employer in the year (§ 15a odst. 2 písm. a)). With
several employers none stops; the employee reclaims the overpayment and the
employer share is never refunded. A single-employer engine cannot see other
employers' bases, so it models only the first case and says so.

---

## 3. The supported rules

### 3.1 Social insurance — z. 589/1992 Sb.

| Rule | Value | Basis |
|---|---|---|
| Employee rate | 7.1 % | § 7 odst. 1 písm. d) |
| Employer, standard | 24.8 % | § 7 odst. 1 písm. a) |
| Employer, paramedics / works fire brigade | 29.8 % | § 7 odst. 1 písm. b) |
| Employer, high-risk work — **2026 only** | 27.8 % | § 7 odst. 1 písm. c) |
| Annual maximum base | 2 350 416 CZK | § 15a (48 × 48 967) |
| Participation threshold | 4 500 CZK/month | § 6 odst. 2, z. 187/2006 Sb. |
| Employer discount | 5 % of the aggregate | § 7a–§ 7b |
| Working-pensioner relief | 6.5 % **sleva** | § 7e odst. 1 |

The high-risk rate is year-keyed: 28.8 % in 2027, 29.8 % from 2028. It can never
be carried between years.

Below the participation threshold **no social premium is due from either side**.

### 3.2 Health insurance — z. 592/1992 Sb. and z. 48/1997 Sb.

| Rule | Value | Basis |
|---|---|---|
| Total rate | 13.5 % | § 2 odst. 1 |
| Employee share | one third of the rounded premium | § 9 odst. 2, z. 48/1997 |
| Minimum assessment base | 22 400 CZK/month | § 3 odst. 6 |
| Minimum premium | 3 024 CZK | 13.5 % × 22 400, exact |
| Maximum | none | — |
| Top-up on a shortfall | 13.5 %, employee alone by default | § 3 odst. 10 |

The minimum is **not** reduced for part-time work — VZP: *"bez ohledu na délku
pracovního úvazku"*. Pro-rata reduction by calendar days (§ 3 odst. 9) is a
different rule and covers an incomplete month or listed obstacles. Unpaid leave
has not been a pro-rata trigger since 1 January 2015.

Exemptions (§ 3 odst. 8) are a list of five for 2026, each of which must last the
whole calendar month. Zákon č. 289/2025 Sb., effective 1 January 2026, repealed
the former childcare letter and re-lettered the rest.

### 3.3 Income tax — z. 586/1992 Sb.

| Rule | Value | Basis |
|---|---|---|
| Lower rate | 15 % | § 38h odst. 2 |
| Upper rate | 23 % | § 38h odst. 2 |
| Monthly threshold | 146 901 CZK (3 × 48 967) | § 38h odst. 2 |
| Basic taxpayer credit | 2 570 CZK/month | § 35ba odst. 1 a) |
| Disability I–II / III | 210 / 420 CZK | § 35ba odst. 1 c), d) |
| ZTP/P | 1 345 CZK | § 35ba odst. 1 e) |
| Child benefit 1st/2nd/3rd+ | 1 267 / 1 860 / 2 320 CZK | § 35c, § 35d odst. 2 |
| Bonus minimum payout | 50 CZK | § 35d odst. 4 |
| Bonus income condition | 11 200 CZK/month | § 35d odst. 4 |
| Withholding rate | 15 %, rounded **down** | § 36 odst. 2 m), odst. 3 |

Super-gross is abolished (§ 6 odst. 12): the base is gross employment income, not
uplifted by employer contributions, and the employee's own insurance is **not**
deductible from it.

### 3.4 Employer liability insurance — vyhláška č. 125/1993 Sb.

Still in force for 2026: § 365 ZP routes to it in the 2026 wording, and the
intended replacement (z. 266/2006 Sb.) was repealed before it ever took effect.
The rate annex has stood in its 487/2001 Sb. wording since 2002.

Eight bands: **2.8 / 4.2 / 5.6 / 7 / 8.4 / 9.8 / 10.5 / 50.4 ‰**. One rate for
the whole employer, by prevailing activity. Base = the aggregate assessment base
of all employees for the **preceding** quarter. Minimum 100 CZK per quarter, per
**employer**. The decree contains no rounding rule at any step — machine-verified:
the stem `zaokrouhl` returns zero hits across the full text.

---

## 4. Statutory rounding, in one place

| Step | Direction | Unit | Basis |
|---|---|---|---|
| Social assessment base | up | 1 CZK | § 5d, z. 589/1992 |
| Social premium | up | 1 CZK | § 7 odst. 3 |
| Employer discount | up | 1 CZK, on the aggregate | § 7b odst. 1 |
| Working-pensioner sleva | up | 1 CZK, **separately** | § 7e odst. 1 |
| Health premium | up | 1 CZK, **once, before the split** | § 2 odst. 2, z. 592/1992 |
| Tax base ≤ 100 CZK | up | 1 CZK | § 38h odst. 1 |
| Tax base > 100 CZK | up | 100 CZK | § 38h odst. 1 |
| Tax advance | up | 1 CZK, once on the sum | § 38h odst. 3 |
| Withholding tax | **down** | 1 CZK | § 36 odst. 3 |
| Liability insurance | *no statutory rule* | — | — |

**A citation correction.** § 20 of z. 589/1992 Sb. is *penále*, not rounding. It
is widely cited for the rounding rule, including in this repository's older
payroll registry. The real provisions are § 5d and § 7 odst. 3.

**A precision requirement.** ČSSZ: *"Mzdový software musí při výpočtu počítat se
všemi desetinnými místy, která jsou následně zaokrouhlena na celé koruny
nahoru."* Rounding to haléře first and then ceiling to koruny is two roundings,
and the first erases the fraction the second needs. At 7.1 % this is off by one
koruna on **782** whole-koruna bases between 4 500 and 200 000 CZK — the smallest
being 4 662 CZK, where 331.002 must become 332 and the two-step form gives 331.

`percentOfRoundedToCzk` in `lib/payroll/money.ts` does it in one exact step.

---

## 5. Cases the calculator refuses

§28 of the brief: where a rule cannot be established, the calculator says the
case requires an individual payroll calculation rather than returning a number
that is nearly right. Each of these is surfaced to the user at the figure it
affects.

**Modelled with a documented assumption** — the arithmetic is stated, and stated
as an assumption:

- **Rounding of the health thirds** when the premium is not divisible by three.
  Only two things are law: the premium is a whole koruna, and the two shares sum
  to it. The engine rounds the employee's third up and gives the employer the
  remainder, which keeps the sum exact. Maximum divergence: one koruna. The
  22 400 → 3 024 example everyone quotes divides evenly and settles nothing.
- **Pro-rata of the minimum base** for a partial month. § 3 odst. 9 states the
  principle; no authority publishes the formula, the divisor or any rounding.
- **Rounding of the minimum-base top-up.** § 3 odst. 10 prescribes none.
- **Disapplication of the annual maximum to liability insurance.** Both
  administrators publish it; no statute says it, and a literal reading of § 12
  odst. 2 would arguably cap the base. The weakest-founded operative rule here.
- **The annual view** assumes twelve identical months.

**Not modelled at all:**

- DPP and DPČ agreements — out of scope by design.
- Employer wage compensation for the first 14 days of sickness — the reduction
  thresholds' rounding direction and the placement of the intermediate rounding
  are not established; MPSV's own calculator resolves both as practice, not law.
- Concurrent employment with several employers, for the social maximum, the
  working-pensioner sleva base, and the health minimum.
- Splitting the top-up where a low base is partly an employer-side obstacle and
  partly not — § 3 odst. 10's *"tento rozdíl"* is ambiguous in the mixed case.
- Non-resident members of corporate bodies — Finanční správa has published a
  threshold for them that contradicts § 38h; route to manual review.
- The hourly minimum wage at a shorter standard working week — § 111 odst. 5
  prescribes no rounding and no authority publishes a 2026 figure.
- Which month's minimum wage applies at the December/January boundary — VZP's
  wording and § 4 odst. 1 point opposite ways, and the answer chooses between
  20 800 and 22 400 CZK.
- CZ-NACE → liability rate as a lookup. Seven CZ-NACE codes in Kooperativa's own
  converter resolve to **two different rates** (up to a 1.9× spread). The
  calculator offers the eight statutory bands and a direct rate entry instead of
  a lookup that cannot be right.

---

## 6. Official worked examples used as golden tests

`lib/calculators/cz-employer-cost/golden.test.ts`. If the engine disagrees with
one of these, the engine is wrong; an expected value is never edited to make a
test pass.

| Source | Input | Expected |
|---|---|---|
| Finanční správa | gross 45 810 | base 45 900, advance 6 885 |
| Finanční správa | gross 165 615 | base 165 700; 22 035.15 + 4 323.77 → **26 359** |
| ČSSZ | base 387 371 × 24.8 % | 96 068.008 → **96 069** |
| ČSSZ | 46 278 × 1.0581 | 48 966.7518 → 48 967; ×48 = 2 350 416; ×3 = 146 901 |
| ČSSZ | ¼ / ½ / 40 % / 11 % of 48 967 | 12 242 / 24 484 / 19 587 / 5 387 |
| ZP MV ČR | 24 483.50 × 13.5 % | 3 305.2725 → **3 306** |
| ZP MV ČR / VZP | 16 206 × 13.5 % | 2 187.81 → 2 188 |
| VZP | 22 400 minimum base | 3 024 (1 008 / 2 016) |
| ČSSZ | discount on 50 000 / 1 200 000 | 2 500 / 60 000 |

The second row is the decisive tax test: it proves the threshold is compared
against the **rounded** base, that the 15 % slice runs on exactly 146 901 rather
than on the rounded base, and that the ceiling is applied **once** to the sum of
two unrounded slices.

The sixth is the decisive health test: round-to-nearest and truncation both give
3 305, so only ceiling reproduces the published figure.

**No golden test exists** for the health minimum-base top-up, the pro-rated
minimum, the working-pensioner two-step on a non-round base, or the liability
premium. Two independent passes searched vzp.cz, zpmvcr.cz, cpzp.cz, vozp.cz,
ozp.cz, cssz.gov.cz, koop.cz, generaliceska.cz and mfcr.gov.cz. Those rules are
published; a calculation of them is not. Inventing one and calling it golden
would look like external verification and would not be.

---

## 7. Figures in circulation that no authority publishes

Recorded so a later reader does not find them and assume they were overlooked.

- **143.40 CZK/h** for a 37.5-hour week in 2026. The formula gives 143.36
  exactly; § 111 odst. 5 prescribes no rounding at that step.
- **138.80 / 138.88 CZK/h** for 38.75 hours. The formula gives 138.7354838…;
  138.88 is not any rounding of it.
- **"Zaručená mzda 2026"** four-tier tables (22 400 / 26 880 / 31 360 / 35 840).
  Correct only as *zaručený plat*, for employers who pay by *plat*. In the
  private sector there is no guaranteed wage in 2026 at all.
- **A health top-up example yielding 605.27 CZK.** Appears on no insurer page.
  Doubly wrong: it applies the self-employed base of 24 483.50 CZK to an
  employee, whose minimum is 22 400, and it does not round.
- **A "0.6 % employee rate" for working pensioners.** No provision and no
  authority states it. The lawful method is `ceil(7.1 %) − ceil(6.5 %)`, and the
  two differ by up to a koruna.

---

## 8. Architecture

```
data/calculators/cz-employer-cost/2026/sources.ts   19 official sources, one ACCESSED date
lib/calculators/cz-employer-cost/
  jurisdictions/cz/ruleset.ts    the shape of a ruleset for one tax year
  jurisdictions/cz/2026.ts       the 2026 values, every one Ruled<T>
  social.ts health.ts tax.ts employer-insurance.ts
  engine.ts metrics.ts additional-costs.ts validation.ts
  formatting.ts copy.ts notes-copy.ts      cs / en / de, presentation only
lib/payroll/money.ts                        shared exact haléře arithmetic
components/CzEmployerCostCalculator.tsx     one component, three locales
```

**Year versioning.** CZ/2027 is a new file beside `2026.ts`, never an edit to it.
`reviewDueFrom` is 2026-10-01 — when next year's decrees begin appearing.

**One registry of law, two consumers.** `lib/payroll/rules/cz-2026.ts` already
held Czech 2026 constants for the agency-wage calculator. Rather than trusting
either, `golden.test.ts` asserts that every constant both registries carry holds
the **same value**. If they ever diverge the build fails and a human decides,
which is the point: two independent registries of the same law is how one
silently goes stale.

**Privacy.** Nothing typed into the calculator leaves React state. No fetch, no
storage, no URL or history write, no analytics of any value.
`privacy.test.ts` reads the component's and the engine's source and fails if a
transmission is ever added. There is no share link — §39's cross-link to Cost of
Vacancy is a plain path and carries no figure.

**One engine, three languages.** The engine emits keys; `copy.ts` and
`notes-copy.ts` turn them into sentences. No locale reaches the arithmetic, and
`copy.test.ts` asserts in both directions that every key the engine can emit has
text in cs, en and de — and that no text exists for a key nothing emits.
