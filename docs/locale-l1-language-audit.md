# Locale L1 — CS/EN/DE language audit

One row per concept, per the A/B/C/D classification:

| | |
|---|---|
| **A** | objective spelling or grammar error → **fixed** |
| **B** | unnatural or non-native wording → **fixed** where meaning and factual strength are unchanged |
| **C** | legal, factual or semantic risk → **not guessed** |
| **D** | style preference only → **left alone** |

### C is three states, not one

Counting every risk-sensitive sentence as "unresolved C-risk" would be wrong in
both directions: it overstates the danger of a page that faithfully carries a
careful Czech statement, and it hides the difference between a defect found and
a defect fixed. So C findings carry a status:

| status | meaning | may publish |
|---|---|---|
| **C-PRESERVED** | The Czech source makes a risk-sensitive statement, and the translation carries it faithfully — same scope, same jurisdiction, no strengthening. Nothing is wrong; the finding is recorded because the sentence is load-bearing and an editor needs to know that. | yes |
| **C-RESOLVED** | A risk was found in the translation — a claim beyond the source, a missing jurisdiction, a dropped refusal — and corrected. | yes |
| **C-OPEN** | Unresolved. The claim cannot be supported and cannot be safely removed. | **no — publication forbidden** |

A C-PRESERVED finding is not an outstanding defect and must not be reported as
one. Publication is blocked only by C-OPEN.

**Employer cluster: 10 C findings — 10 C-PRESERVED, 0 C-RESOLVED, 0 C-OPEN.**

`HUMAN_NATIVE_REVIEW = NOT_DONE`. Everything below is my own audit against the
Czech source. No native English or German speaker has read this copy.

---

## Cluster A — employer (8 concepts)

The Czech sources in this cluster are unusually disciplined: several of them
state explicitly what they will *not* claim. Those refusals are the highest-risk
thing to translate, because dropping one turns a careful page into an
overclaiming one, and nothing in the output would look wrong.

| concept | CS source | EN | DE | A | B | C | D |
|---|---|---|---|---|---|---|---|
| `recruitment-overview` | `/nabor-pracovniku` | ok | ok | – | – | C1 · PRESERVED | terminology |
| `recruitment-planning` | `/planovani-naboru` | ok | ok | – | – | C2 · PRESERVED | – |
| `role-brief` | `/zadani-pozice-a-profil-kandidata` | ok | ok | – | B1 | C3 · PRESERVED | – |
| `direct-sourcing` | `/prime-osloveni-kandidatu` | ok | ok | – | – | C4, C5, C6 · all PRESERVED | – |
| `hard-to-fill-roles` | `/proc-se-nedari-obsadit-odbornou-pozici` | ok | ok | – | – | C7 · PRESERVED | – |
| `time-to-hire` | `/jak-dlouho-trva-obsazeni-pozice` | ok | ok | – | – | C8, C9 · both PRESERVED | – |
| `onboarding` | `/onboarding-zamestnancu` | ok | ok | – | – | – | – |
| `employee-retention` | `/retence-zamestnancu` | ok | ok | – | – | C10 · PRESERVED | – |

### B — wording fixed, meaning unchanged

**B1 — `role-brief`.** The Czech heading *"Oddělte nutné od vítaného — a udělejte
to nahlas"* is idiomatic Czech that translates literally as "do it out loud".
English and German both render it as "explicitly" / "ausdrücklich", which is
what the Czech means. Nothing about the requirement changes.

### C — risks, and what was done about each

All ten are **C-PRESERVED**: the Czech source makes the statement, the
translation carries it with the same scope and jurisdiction, and nothing is
strengthened. None is an outstanding defect. Each is recorded because it is a
load-bearing sentence — the kind an editor might "tidy" without realising what
it is holding up.

Every one was checked against the Czech source rather than judged on how it
reads.

**C1 · C-PRESERVED — agency employment named in German.** `recruitment-overview` describes the
three hiring routes, one of which is agency employment. In German the term is
*Arbeitnehmerüberlassung*, which is also the term of the German AÜG. The German
page names Czech law in the same sentence — *"in Tschechien als agenturní
zaměstnávání nach dem tschechischen Beschäftigungsgesetz geregelt"* — so the
first legally meaningful statement carries its jurisdiction. Carried faithfully; publishable.

**C2 · C-PRESERVED — permit lead times.** The Czech says permit procedures extend a plan and
explicitly declines to state any time limit. Both translations carry the
statement and the refusal, and point to the authorities. No duration invented.
Carried faithfully; publishable.

**C3 · C-PRESERVED — four kinds of requirement.** The Czech distinguishes legal requirement,
regulated qualification, industry convention and operational requirement, citing
electrotechnical competence and the occupational-health category. Both
translations mark these as requirements of Czech law. No regulation number was
added that the Czech does not give. Carried faithfully; publishable.

**C4 · C-PRESERVED — employment mediation is licensed.** The Czech states that mediation
requires a permit under the Employment Act and that no fee may be charged to the
candidate. Both translations keep it and attribute it to Czech law. The German
says *"ist in Tschechien durch das tschechische Beschäftigungsgesetz geregelt
und erlaubnispflichtig"*. It does **not** say we hold such a permit — the Czech
does not say so either, and `/o-nas` explicitly withholds the permit number
pending verification. Carried faithfully; publishable.

**C5 · C-PRESERVED — no reach or database claim.** The Czech contains a whole section refusing
to state database size or candidate availability: *"Žádný takový údaj o dosahu
ani o velikosti databáze neuvádíme a uvádět nebudeme."* Both translations carry
that refusal in full, including the reasoning. This is the single most important
sentence in the cluster to preserve. Carried faithfully; publishable.

**C6 · C-PRESERVED — no placement date for direct sourcing.** *"Konkrétní termín obsazení proto
u tohoto postupu neuvádíme."* Carried into both. Carried faithfully; publishable.

**C7 · C-PRESERVED — no salary figures.** The Czech states no wage rates or ranges and points
to the official average-earnings information system. Both translations state no
amounts and keep the pointer. Carried faithfully; publishable.

**C8 · C-PRESERVED — no promised duration, no average.** The Czech refuses both a date and an
average time to fill, and explains why an average would mislead. Both
translations refuse both, in the intro and again in the first section. This is
the special invariant named in the programme brief and it is intact.
Carried faithfully; publishable.

**C9 · C-PRESERVED — statutory citations in `time-to-hire`.** The Czech cites ČSN EN ISO
9606-1, government regulation 194/2022 Sb., Act 250/2021 Sb. and Act 18/2004 Sb.
All four are carried across with the same scope and marked as Czech instruments
("Czech government regulation", "tschechische Regierungsverordnung"). No time
limits are stated, matching the source. Carried faithfully; publishable.

**C10 · C-PRESERVED — no retention return figures.** The Czech says it works with no invented
return numbers. Both translations say the same and add none. Carried faithfully; publishable.

### D — left alone

Terminology preferences (*Personalgewinnung* over *Personalbeschaffung*,
*Direktansprache* over *aktive Ansprache*), sentence rhythm, and the choice to
keep "Onboarding" as a loanword in German where the Czech also uses it.

---

## Cluster B — trust (3 concepts)

**3 C findings — 3 C-PRESERVED, 0 C-RESOLVED, 0 C-OPEN.**

| concept | CS source | EN | DE | A | B | C | D |
|---|---|---|---|---|---|---|---|
| `employer-faq` | `/faq-pro-zamestnavatele` | ok | ok | – | – | C11 · PRESERVED | – |
| `employer-glossary` | `/slovnik-pojmu-pro-zamestnavatele` | ok | ok | – | – | C12 · PRESERVED | terminology |
| `editorial-policy` | `/redakcni-zasady` | ok | ok | – | – | C13 · PRESERVED | – |

**C11 · C-PRESERVED — "do you promise results or savings?"** The Czech FAQ answers
its own question with *"Ne. Neuvádíme vymyšlená čísla úspor ani záruky."* Both
translations keep the question and the flat refusal. Removing an awkward question
from a FAQ is the easiest possible way to quietly become an overclaiming site,
so it stays. Carried faithfully; publishable.

**C12 · C-PRESERVED — the glossary is not binding.** The Czech states that the
definitions are simplified for orientation and replace neither the binding
wording of regulations nor an individual assessment. Both translations carry it
in the intro and again as a closing section. The agency-employment definition
names Czech law explicitly — *"nach tschechischem Recht muss die Agentur eine
gültige Erlaubnis zur Arbeitsvermittlung besitzen"* — because the German term
otherwise reads as the German AÜG arrangement. Carried faithfully; publishable.

**C13 · C-PRESERVED — the editorial-standards prohibitions.** This is the most
sensitive page in L1: its subject *is* the set of claims the site refuses to
make. Every prohibition is carried across — no invented data, statistics, worker
counts, wages, success rates, savings or response times; no ratings, reviews or
stars; no invented references or case studies; no "verified by the ministry",
"state-licensed" or "state-approved"; no guaranteed workers or immediate start;
and operator identifiers published as fact only after verification, marked as
verification in progress until then.

Softening any one of them would contradict the page's own subject, and the
translation would then be evidence against itself. Nothing was added either: the
English and German name the same registers the Czech names — ARES and the
register of employment agencies — and claim no permit. Carried faithfully;
publishable.

### Reclassification during this cluster

`/faq-zamestnavani-pracovniku` was frozen as a **collapsed variant** of
`employer-faq`, on the assumption that two Czech FAQ hubs answered the same
employer questions. Reading it disproved that: its eight questions are about
work permits, the Employee Card, the Blue Card, the minimum wage and insurance
rates — immigration and payroll, which this programme defers to L2.

It is therefore **reclassified COLLAPSED_VARIANT → L2**. Nothing changes about
what gets translated, because a collapsed variant is Czech-only in any case;
what changes is that immigration content is no longer labelled as employer
commercial content. Collapsed variants drop from 19 to 18; concept and page
counts are unchanged at 38 and 76.
