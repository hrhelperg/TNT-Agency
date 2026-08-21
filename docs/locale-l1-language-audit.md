# Locale L1 — CS/EN/DE language audit

One row per concept, per the A/B/C/D classification:

| | |
|---|---|
| **A** | objective spelling or grammar error → **fixed** |
| **B** | unnatural or non-native wording → **fixed** where meaning and factual strength are unchanged |
| **C** | legal, factual or semantic risk → **not guessed**. Either removed where the concept does not need it and the omission recorded, or the concept is moved to L2 and not published |
| **D** | style preference only → **left alone** |

No published L1 page may carry an unresolved C.

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
| `recruitment-overview` | `/nabor-pracovniku` | ok | ok | – | – | C1 | terminology |
| `recruitment-planning` | `/planovani-naboru` | ok | ok | – | – | C2 | – |
| `role-brief` | `/zadani-pozice-a-profil-kandidata` | ok | ok | – | B1 | C3 | – |
| `direct-sourcing` | `/prime-osloveni-kandidatu` | ok | ok | – | – | **C4, C5, C6** | – |
| `hard-to-fill-roles` | `/proc-se-nedari-obsadit-odbornou-pozici` | ok | ok | – | – | **C7** | – |
| `time-to-hire` | `/jak-dlouho-trva-obsazeni-pozice` | ok | ok | – | – | **C8, C9** | – |
| `onboarding` | `/onboarding-zamestnancu` | ok | ok | – | – | – | – |
| `employee-retention` | `/retence-zamestnancu` | ok | ok | – | – | **C10** | – |

### B — wording fixed, meaning unchanged

**B1 — `role-brief`.** The Czech heading *"Oddělte nutné od vítaného — a udělejte
to nahlas"* is idiomatic Czech that translates literally as "do it out loud".
English and German both render it as "explicitly" / "ausdrücklich", which is
what the Czech means. Nothing about the requirement changes.

### C — risks, and what was done about each

Every one of these was checked against the Czech source rather than judged on
how it reads.

**C1 — agency employment named in German.** `recruitment-overview` describes the
three hiring routes, one of which is agency employment. In German the term is
*Arbeitnehmerüberlassung*, which is also the term of the German AÜG. The German
page names Czech law in the same sentence — *"in Tschechien als agenturní
zaměstnávání nach dem tschechischen Beschäftigungsgesetz geregelt"* — so the
first legally meaningful statement carries its jurisdiction. **Published.**

**C2 — permit lead times.** The Czech says permit procedures extend a plan and
explicitly declines to state any time limit. Both translations carry the
statement and the refusal, and point to the authorities. No duration invented.
**Published.**

**C3 — four kinds of requirement.** The Czech distinguishes legal requirement,
regulated qualification, industry convention and operational requirement, citing
electrotechnical competence and the occupational-health category. Both
translations mark these as requirements of Czech law. No regulation number was
added that the Czech does not give. **Published.**

**C4 — employment mediation is licensed.** The Czech states that mediation
requires a permit under the Employment Act and that no fee may be charged to the
candidate. Both translations keep it and attribute it to Czech law. The German
says *"ist in Tschechien durch das tschechische Beschäftigungsgesetz geregelt
und erlaubnispflichtig"*. It does **not** say we hold such a permit — the Czech
does not say so either, and `/o-nas` explicitly withholds the permit number
pending verification. **Published.**

**C5 — no reach or database claim.** The Czech contains a whole section refusing
to state database size or candidate availability: *"Žádný takový údaj o dosahu
ani o velikosti databáze neuvádíme a uvádět nebudeme."* Both translations carry
that refusal in full, including the reasoning. This is the single most important
sentence in the cluster to preserve. **Published.**

**C6 — no placement date for direct sourcing.** *"Konkrétní termín obsazení proto
u tohoto postupu neuvádíme."* Carried into both. **Published.**

**C7 — no salary figures.** The Czech states no wage rates or ranges and points
to the official average-earnings information system. Both translations state no
amounts and keep the pointer. **Published.**

**C8 — no promised duration, no average.** The Czech refuses both a date and an
average time to fill, and explains why an average would mislead. Both
translations refuse both, in the intro and again in the first section. This is
the special invariant named in the programme brief and it is intact.
**Published.**

**C9 — statutory citations in `time-to-hire`.** The Czech cites ČSN EN ISO
9606-1, government regulation 194/2022 Sb., Act 250/2021 Sb. and Act 18/2004 Sb.
All four are carried across with the same scope and marked as Czech instruments
("Czech government regulation", "tschechische Regierungsverordnung"). No time
limits are stated, matching the source. **Published.**

**C10 — no retention return figures.** The Czech says it works with no invented
return numbers. Both translations say the same and add none. **Published.**

### D — left alone

Terminology preferences (*Personalgewinnung* over *Personalbeschaffung*,
*Direktansprache* over *aktive Ansprache*), sentence rhythm, and the choice to
keep "Onboarding" as a loanword in German where the Czech also uses it.
