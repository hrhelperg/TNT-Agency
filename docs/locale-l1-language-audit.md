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

---

## Cluster C — workforce (9 concepts)

The most legally dense cluster in L1, and the one where German jurisdiction
framing matters most: *Arbeitnehmerüberlassung* is the term of the German AÜG,
and these pages describe the Czech arrangement.

**9 C findings — 9 C-PRESERVED, 0 C-RESOLVED, 0 C-OPEN.**

| concept | CS source | EN | DE | A | B | C | D |
|---|---|---|---|---|---|---|---|
| `volume-hiring` | `/hromadny-nabor-pracovniku` | ok | ok | – | – | C14 · PRESERVED | – |
| `production-ramp-up` | `/nabor-pri-nabehu-vyroby` | ok | ok | – | – | C15 · PRESERVED | – |
| `seasonal-capacity` | `/sezonni-navyseni-kapacity` | ok | ok | – | – | C16 · PRESERVED | – |
| `absence-cover` | `/absence-v-provozu` | ok | ok | – | – | C17 · PRESERVED | – |
| `direct-hire` | `/primy-nabor-zamestnancu` | ok | ok | – | – | C18, C19 · PRESERVED | – |
| `agency-employment` | `/docasne-prideleni-zamestnancu` | ok | ok | – | – | C20 · PRESERVED | terminology |
| `agency-fees` | `/cena-sluzeb-personalni-agentury` | ok | ok | – | – | C21 · PRESERVED | – |
| `choosing-an-agency` | `/jak-vybrat-personalni-agenturu` | ok | ok | – | – | **C22** · PRESERVED | – |
| `agency-contract` | `/smlouva-s-personalni-agenturou` | ok | ok | – | – | C23 · PRESERVED | – |

**C14 · C-PRESERVED — model numbers, not delivered work.** The Czech says the
20/50/100 figures are planning models "nikoli popis realizovaných zakázek", and
refuses a general margin percentage because none would hold for every operation.
Both carried. Carried faithfully; publishable.

**C15 · C-PRESERVED — safety duties attach to the workplace.** The Czech states
that occupational safety obligations attach to the workplace and the employer,
not to whether the operation is new. Marked as Czech law in both. Carried
faithfully; publishable.

**C16 · C-PRESERVED — employment models and their statutory limits.** Temporary
assignment under Act 435/2004 Sb., fixed-term employment, and agreements outside
an employment relationship "have statutory limits under Czech law". The Czech
declines regional figures; both translations decline them and name the same
public sources. Carried faithfully; publishable.

**C17 · C-PRESERVED — no general absence percentage.** *"obecné číslo neuvádíme,
protože by pro nikoho neplatilo."* Carried. Carried faithfully; publishable.

**C18 · C-PRESERVED — mediation requires a permit either way.** The Czech makes
the sharp point that a permit is needed for both routes; the difference is who
remains the employer. Both translations carry it and attribute it to Act
435/2004 Sb. Neither claims we hold one. Carried faithfully; publishable.

**C19 · C-PRESERVED — no fee figures, no promise of tenure.** *"Žádné částky ani
procenta zde neuvádíme"* and *"Žádnou náhradu ani setrvání kandidáta nelze
slibovat dopředu."* Both carried, with the reasoning that a candidate's tenure
is that person's own decision. Carried faithfully; publishable.

**C20 · C-PRESERVED — the German term and the Czech arrangement.** The concept's
German slug is `/de/arbeitnehmerueberlassung-tschechien`: the jurisdiction is in
the URL as well as the first legally meaningful sentence, and the page states it
follows the Czech Labour Code and the Czech Employment Act. Comparable
conditions and shared safety responsibility are carried exactly as the Czech has
them. Carried faithfully; publishable.

**C21 · C-PRESERVED — a page about price that states no price.** *"Na této
stránce proto nenajdete žádnou částku, sazbu ani podíl."* Both translations
state no amount, rate or share, and both keep the harder point: an hourly rate
for assignment is not a free commercial judgement, because it must legally carry
pay at the comparable-conditions level. Carried faithfully; publishable.

**C22 · C-PRESERVED — a checklist deliberately usable against us.** The Czech
says the page is *"záměrně použitelný i proti nám"* and that we do not declare
our own status verified — check it in the public register yourself. Both
translations carry that sentence, including the instruction to verify us.

They also carry the warning signs unchanged, two of which are claims this
industry makes routinely: a promised start date, and the size of a candidate
database. And the third — that state authorities issue permits and maintain
registers but do not issue recommendations of suppliers — which rules out a
claim the site could otherwise make about itself. Carried faithfully;
publishable.

**C23 · C-PRESERVED — comparable conditions cannot be contracted away.** The
Czech is explicit that this is a statutory requirement a contract may implement
but not change or exclude, and that compliance is inspected on both sides. Both
translations say so, attributed to the Czech Labour Code and the Czech labour
inspection authorities. Carried faithfully; publishable.

---

## Cluster D — industries (5 concepts)

**5 C findings — 5 C-PRESERVED, 0 C-RESOLVED, 0 C-OPEN.**

| concept | CS source | EN | DE | A | B | C | D |
|---|---|---|---|---|---|---|---|
| `warehouse-workers` | `/skladnici` | ok | ok | – | – | C24 · PRESERVED | – |
| `logistics-workers` | `/pracovnici-do-logistiky` | ok | ok | – | – | C25 · PRESERVED | – |
| `construction-workers` | `/stavebni-pracovnici` | ok | ok | – | – | C26 · PRESERVED | – |
| `food-production-workers` | `/pracovnici-pro-potravinarskou-vyrobu` | ok | ok | – | – | C27 · PRESERVED | – |
| `automotive-workers` | `/pracovnici-pro-automotive` | ok | ok | – | – | C28 · PRESERVED | – |

All five Czech sources carry the same standing refusal — no wages and no vacancy
counts, with a pointer to the Czech Statistical Office, the Ministry of Labour
and Social Affairs and the Czech Labour Office. All five translations carry it
(**C24**–**C28**), and three carry a sector-specific legal statement in addition:

- **C25** — the lawful forms of flexible peak cover in logistics: fixed-term
  employment, agreements outside an employment relationship, and temporary
  assignment. The Czech says the chaining of fixed-term contracts and the scope
  of those agreements are limited by the Labour Code, that the exact limits must
  be verified against the current wording, and states no figures. Carried in
  both, attributed to Czech law.
- **C27** — chilled and frozen environments: the Czech Labour Code duty to
  provide a safe working environment and adapt the organisation of work to it,
  extending to low temperatures, and to provide protective equipment free of
  charge where the risks require it.
- **C28** — working-time distribution: the Labour Code distinction between even
  and uneven distribution, and the working-time account, which may be introduced
  only by collective agreement or internal regulation.

Carried faithfully; publishable.

### Near-duplicate check — the one that needed a second test

`warehouse-workers` ↔ `logistics-workers` scored **45.9%** word overlap in
English, the highest pair in the programme and above the screening threshold.

Word overlap alone could not answer it: two pages about adjacent sectors share
the vocabulary of the domain — shift, peak, capacity, agency, training — and
score high while saying different things. So the pair was put through the test
that names the defect §23 actually describes, *the same body with noun
substitutions*: strip the sector nouns from every sentence in both pages and
count how many become identical.

**Result: zero**, apart from the two standing disclaimers that are deliberately
identical on every page. Zero shared section headings, four sections against
five, and distinct substance — handling-equipment authorisation and burst volume
on one side, chain interdependence and the statutory forms of flexible cover on
the other.

That check is now `validate:locale-duplicates` rather than a one-off, because
cluster E has thirteen concepts and the highest duplicate risk in the programme.
Its negative control rewrites one page as a noun-substituted copy of another and
requires the gate to fail: it reports 98.6% overlap and 15 substituted
sentences.

The thin-content threshold in that gate applies to prose page types only. A
contact page of seventy words is not thin content, and the request-staff page's
substance is a twelve-field form rather than prose — checked by the interactive
-parity gate instead. One number across every page type would either pass real
thin prose or fail pages that are doing their job.

---

## Cluster E — specialists (13 concepts)

The cluster where the Czech sources are most precise about what a document does
and does not say, and where that precision is the whole value of the page.

**13 C findings — 13 C-PRESERVED, 0 C-RESOLVED, 0 C-OPEN.**

| concept | CS source | EN | DE | A | B | C | D |
|---|---|---|---|---|---|---|---|
| `welders` | `/nabor-svarecu` | ok | ok | – | – | C29 · PRESERVED | – |
| `cnc-operators` | `/nabor-cnc-operatoru` | ok | ok | – | – | C30 · PRESERVED | – |
| `electricians` | `/nabor-elektrikaru` | ok | ok | – | – | C31 · PRESERVED | – |
| `maintenance-technicians` | `/udrzba-a-technicky-servis` | ok | ok | – | – | C32 · PRESERVED | – |
| `quality-roles` | `/pozice-v-rizeni-kvality` | ok | ok | – | – | **C33, C34** · PRESERVED | – |
| `shift-supervisors` | `/mistri-a-vedouci-smen` | ok | ok | – | – | C35 · PRESERVED | – |
| `automation-technicians` | `/nabor-techniku-automatizace` | ok | ok | – | – | C36 · PRESERVED | – |
| `engineering-roles` | `/technicti-inzenyri` | ok | ok | – | – | C37 · PRESERVED | – |
| `process-and-design-engineers` | `/technologove-a-konstrukteri` | ok | ok | – | – | C38 · PRESERVED | – |
| `engineering-trades` | `/strojirenske-profese` | ok | ok | – | – | C39 · PRESERVED | – |
| `technical-office-roles` | `/thp-pozice` | ok | ok | – | – | **C40** · PRESERVED | – |
| `logistics-specialists` | `/odborne-pozice-v-logistice` | ok | ok | – | – | C41 · PRESERVED | – |
| `purchasing-and-supply` | `/nakup-a-zasobovani` | ok | ok | – | – | C42 · PRESERVED | – |

**C29 — welding certification.** ČSN EN ISO 9606-1, the tested range as several
variables at once, the point that a certificate for steel says nothing about
aluminium, the distinction between a welding logbook and a test certificate, and
the fire-safety requirements for hot work away from a fixed station, attributed
to Czech rules. All carried; no scope broadened.

**C30 — no wages, no time to fill.** Carried, as is the safety requirement that
a candidate be informed of risks and equipped before entering the workshop for a
practical trial.

**C31 — the regulation that no longer exists.** The Czech page exists largely to
correct a widespread error: "decree 50" and "paragraph 6" come from a repealed
regulation, and competence is now governed by Czech government regulation
194/2022 Sb., under Czech act 250/2021 Sb. on reserved technical equipment. Both
translations say the old and new structures cannot be mapped mechanically, that
competence attaches to activity, equipment and regime rather than to a person,
and that intervals and re-examination belong in the current wording. No level or
interval was stated.

**C32 — on-call duty.** The Czech Labour Code treatment of on-call time — that
it must be agreed, that remuneration is due, and that work during it beyond the
weekly limit is overtime — carried in both, and act 250/2021 Sb. for inspection
documentation.

**C33 — the metrology framework.** Czech act 505/1990 Sb. on metrology, with the
distinction the Czech is careful about: verification of specified measuring
instruments is entrusted to state metrology and authorised bodies, **not** to a
company metrologist. Both translations keep that division intact.

**C34 — system standards belong to employers, not to us.** The Czech states that
ISO 9001, IATF 16949 and HACCP are described "as requirements employers state,
not as certifications held by a staffing agency". Both translations carry that
sentence explicitly. This is the finding most easily lost in translation and the
one with the clearest consequence if it were: it would convert a description of
what clients ask for into a claim about what we hold.

**C35–C39 —** the manager-duties training including occupational safety; the
three-way split in automation between regulated competence under regulation
194/2022 Sb., industry convention and a company's own choice; authorisation in
construction under Czech act 360/1992 Sb. as the one case where "engineer" is a
regulated activity rather than a label; CAD/CAM as a company's choice that no
regulation prescribes; and the Czech national occupations and qualifications
registers with professional qualifications evidenced before an authorised person.
All carried and attributed to Czech instruments.

**C40 — a category that the law does not know.** "THP" appears in Czech job
adverts everywhere and in the Labour Code nowhere. The Czech says so; both
translations say so, and the English and German add one clarifying sentence —
that this is worth stating plainly to a foreign reader, because a category
present in every advert and absent from the law is easy to mistake for a
qualification. That is an explanation of the source's own point for an audience
that lacks the context, not a new fact.

**C41 — no availability figures.** The Czech declines to state numbers on how
available these occupations are. Carried.

**C42 — commodity knowledge as convention, not requirement.** The Czech marks
sector knowledge as industry convention and company systems as company
specifics, explicitly so they are not treated as entry requirements. Carried.

### Duplicate audit across the whole corpus

`validate:locale-duplicates` now screens all 96 localized pages. One pair
exceeds the similarity threshold — `warehouse-workers` ↔ `logistics-workers` at
45.9% — and passes the noun-substitution test with zero substituted sentences.
No thin prose pages; 11 hub, utility and tool pages exempt by type.
