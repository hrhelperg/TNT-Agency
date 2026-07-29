# Czech employer authority — TalentPartnerID (Batch B)

Second batch of the growth program (see `reports/growth-program-plan.md` §3). Batch B **deepens genuine topical authority** on the strongest existing Tier 1 employer hubs — it does **not** create new URLs, new city pages, or keyword-variant pages.

Every addition flows through the structured content model, so it is enforced by the existing honesty gate (`content-quality.test.ts`): sourced citations with retrieval dates and named publishers/legal acts, no fabricated statistics, no near-duplicate bodies, resolvable internal links.

## What changed

### 1. Tier 1 hub depth — one new source-backed legal section + 2 FAQ per hub (9 hubs)
Each hub gained a genuinely new, hub-specific section grounded in named Czech legal acts and institutional roles (no numeric statistics), plus two topic FAQ, and a deepened source base drawn only from the verified `SRC` registry.

| Hub | New section | Sources |
|---|---|---|
| `pracovnici-do-vyroby` | Formy pracovněprávního vztahu u nástupních pozic (§ 39 řetězení, § 309 rovné zacházení, zkušební doba, ČSSZ/zdravotní, SÚIP) | 4 → 8 |
| `pracovnici-do-skladu` | Právní formy zajištění nástupních a sezónních pozic (HPP / DPP·DPČ / agenturní přidělení, písemná forma, nelegální práce) | 4 → 5 |
| `pracovnici-do-logistiky` | Právní rámec flexibilního zajištění špiček (formy + BOZP odpovědnost uživatele + noční práce) | 5 → 10 |
| `pracovnici-pro-automotive` | Nepřetržitý provoz a rozvržení pracovní doby (rovnoměrné/nerovnoměrné, konto pracovní doby, noční práce, odpočinek, příplatky) | 5 → 7 |
| `pracovnici-pro-potravinarskou-vyrobu` | Chlazené a mrazírenské provozy a ochrana zdraví (bezplatné OOPP, zátěžové faktory, pracovnělékařské služby) | 5 → 7 |
| `nabor-zahranicnich-pracovniku` | Etický a odpovědný nábor cizinců (zákaz poplatku po pracovníkovi, rovné zacházení, ověření zprostředkovatele, SÚIP) | 5 → 8 |
| `nabor-zamestnancu-pardubice` | Úřady a zákonné povinnosti při náboru (§ 14 povolení GŘ ÚP, OSSZ/pojišťovna, oblastní inspektorát, sídlo ≠ oprávnění) | 3 → 10 |
| `nabor-zamestnancu-hradec-kralove` | Spádová dojížďka a místo výkonu práce ve smlouvě (podstatné náležitosti, dojížďka vs. pracovní cesta, cestovní náhrady) | 3 → 4 |
| `trh-prace-stredocesky-kraj` | Místně příslušné úřady (územní příslušnost, pražská provázanost kraje, OSSZ/pojišťovna/inspektorát/OAMP) | 3 → 11 |

Every hub also gained editorial internal links to previously under-supported Tier 1/2 pages (glossary, agency-mechanics, employer-duties, inspection, regional companions), targeting the lowest-inbound nodes measured by the Batch A authority graph — all with descriptive anchor text (A9 gate stays clean).

### 2. Entity consistency
The homepage carries an `EmploymentAgency` node with a §14 description (the operator, **TNT agency s.r.o.**, is the licensed agency — left unchanged). Every `SeoArticle` page already emits a **generic** publisher `Organization` node (name TalentPartnerID · legalName TNT agency s.r.o. · no permit/licence fields) — this is correct and was **not** escalated to `EmploymentAgency`. The one hand-rolled publisher node (`pages/zamestnavani-cizincu.tsx`) was given the missing `legalName: 'TNT agency s.r.o.'` to match the shared template. No unverified permit fact is asserted anywhere; `validate:trust` stays green.

### 3. Honest region strategy (Batch B item 4) — deferred owner decision
The region near-duplication families (`trh-prace-*`, `naklady-na-zamestnance-*`) were **not** consolidated. Consolidation is destructive (redirects) and honest differentiation would require real regional statistics, which this program does not fabricate. This remains the standing owner decision from `content-consolidation.md` §4/§8. Batch B only improved these families' internal discovery and per-page depth.

## Verification (multi-agent, adversarial)
- **Understand** (11 agents): mapped each hub's current state and proposed grounded, honesty-safe enrichments citing only the verified `SRC` registry; established the operator/permit truth.
- **Verify** (9 legal/honesty skeptics + 1 duplication check): **0 blockers.** Every legal § anchor was independently confirmed correct (§ 39 řetězení, § 309 rovné zacházení, § 14 permit via GŘ ÚP, konto pracovní doby, místo výkonu práce, cestovní náhrady, OOPP, ČSSZ/OSSZ, SÚIP, OAMP MV ČR). Honest positioning confirmed on every hub (permit held by the agency, not the platform); zero statistics/superlatives/guarantees.
- **Fixes applied** from the review: one **major** legal correction (automotive — `konto pracovní doby` reclassified per the current § 86 ZP, no longer "nerovnoměrné rozvržení"), one **major** language fix (Hradec — removed the "katchmentem" anglicism), the Pardubice↔Středočeský authority sections were differentiated, and minor terminology/register polish (OSSZ vs. ČSSZ, "zastřené zprostředkování", "chladicí řetězec", role precision, Czech quotes).

## Honesty boundary
Batch B strengthens **content depth, entity clarity and internal linking**. It makes no claim about search ranking or indexation; those remain owner-observable only via the exports listed in `reports/search-coverage-baseline.md`. All content is general information about Czech employment practice/law, not individual legal advice (as each page states).

## Lock-in
`lib/content/authority-depth.test.ts` guarantees each of the nine hubs keeps its new section, its deepened source base, verified-only sources, and no bare statistic in the new sections. Runs inside `npm test`.
