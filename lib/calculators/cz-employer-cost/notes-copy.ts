/**
 * Text for every note and result label the engine can emit, in cs / en / de.
 *
 * The engine emits keys and never a sentence — see copy.ts for why. This file
 * is the other half of that contract, and `copy.test.ts` asserts the two stay in
 * step in both directions: a note the engine can emit with no text here fails
 * the build, and text here for a note nothing emits fails it too.
 *
 * WHAT THESE SENTENCES ARE FOR
 * ────────────────────────────
 * Most of them exist to say something the number cannot. An assumption is in
 * force; a condition was asserted by the user rather than checked; a rule is
 * followed on an administrator's methodology rather than on statute; a figure is
 * an allocation rather than a bill. §28 turns on these being visible, because a
 * calculator that quietly assumes is indistinguishable from one that knows.
 *
 * German strings name Czechia wherever they carry a legally loaded term, for the
 * reason set out in copy.ts and enforced by scripts/validate-locale-jurisdiction.mjs.
 */

import type { Copy } from './copy';

export const ENGINE_NOTES: Readonly<Record<string, Copy>> = {
  // ── Social insurance ─────────────────────────────────────────────────────
  'social.note.participationAssumedFromAgreedIncome': {
    cs: 'Příjem za tento měsíc nedosahuje rozhodné částky 4 500 Kč. Účast na nemocenském pojištění se však u pracovního poměru odvíjí od SJEDNANÉ částky započitatelného příjmu, nikoli od toho, kolik bylo vyplaceno v konkrétním měsíci — při nástupu v polovině měsíce nebo při neplaceném volnu se pojistné odvádí dál. Výpočet proto pojistné počítá. Zaměstnání malého rozsahu, kde je pod hranicí už sjednaná částka, tato verze nemodeluje.',
    en: 'This month’s income does not reach the 4 500 CZK threshold. But for an employment relationship, participation in Czech sickness insurance follows the AGREED income, not what happened to be paid in a given month — on a mid-month start or during unpaid leave the premium is still due. The calculation therefore charges it. Small-scale employment, where the agreed amount itself is below the threshold, is not modelled in this version.',
    de: 'Das Einkommen dieses Monats erreicht die tschechische Schwelle von 4 500 CZK nicht. Die Teilnahme an der tschechischen Krankengeldversicherung richtet sich bei einem Arbeitsverhältnis jedoch nach dem VEREINBARTEN Entgelt und nicht danach, was in einem einzelnen Monat gezahlt wurde — bei Eintritt in der Monatsmitte oder bei unbezahltem Urlaub bleibt der Beitrag fällig. Die Berechnung erhebt ihn daher. Eine Beschäftigung geringen Umfangs, bei der bereits der vereinbarte Betrag unter der Schwelle liegt, bildet diese Version nicht ab.',
  },
  'social.note.assumesMaximumNotReached': {
    cs: 'Výpočet předpokládá, že maximálního vyměřovacího základu 2 350 416 Kč nebylo letos dosaženo. Jediná měsíční mzda tuto informaci neobsahuje — pro přesný výpočet u vysokých příjmů zadejte v rozšířeném režimu základ využitý od začátku roku.',
    en: 'The calculation assumes the 2 350 416 CZK annual maximum has not been reached this year. A single monthly salary does not contain that information — for high earners, enter the year-to-date assessment base in advanced mode.',
    de: 'Die Berechnung geht davon aus, dass die tschechische Jahreshöchstbemessungsgrundlage von 2 350 416 CZK in diesem Jahr noch nicht erreicht ist. Ein einzelnes Monatsgehalt enthält diese Information nicht — geben Sie bei hohen Einkommen im erweiterten Modus die seit Jahresbeginn genutzte Bemessungsgrundlage ein.',
  },
  'social.note.maximumReachedBothSidesStop': {
    cs: 'Maximálního vyměřovacího základu bylo dosaženo. Z částky nad strop neodvádí pojistné ani zaměstnanec, ani zaměstnavatel (§ 15a odst. 4).',
    en: 'The annual maximum assessment base has been reached. Above it neither the employee nor the employer pays social insurance (§ 15a odst. 4).',
    de: 'Die tschechische Jahreshöchstbemessungsgrundlage ist erreicht. Oberhalb davon zahlen weder Arbeitnehmer noch Arbeitgeber Sozialbeiträge (§ 15a Abs. 4).',
  },
  'social.note.maximumSingleEmployerOnly': {
    cs: 'Zastavení odvodů nad stropem platí jen tehdy, je-li zaměstnanec v daném roce zaměstnán u jediného zaměstnavatele. Při více zaměstnavatelích odvádí každý dál v plné výši a zaměstnanec si přeplatek vyžádá sám; část zaměstnavatele se nevrací.',
    en: 'Stopping contributions above the ceiling applies only where the employee works for a single employer in the year. With several employers each keeps deducting in full and the employee reclaims the overpayment afterwards; the employer share is never refunded.',
    de: 'Das Aussetzen der Beiträge oberhalb der Höchstgrenze gilt nur, wenn der Arbeitnehmer im Jahr bei einem einzigen Arbeitgeber beschäftigt ist. Bei mehreren tschechischen Arbeitgebern führt jeder weiterhin voll ab; der Arbeitnehmer fordert die Überzahlung selbst zurück, der Arbeitgeberanteil wird nicht erstattet.',
  },
  'social.note.employerPremiumRoundedOnAggregate': {
    cs: 'Zákon zaokrouhluje pojistné zaměstnavatele jednou z úhrnu za všechny zaměstnance v dané sazbové skupině, nikoli po jednotlivcích. U jednoho zaměstnance je výsledek shodný; napříč mzdovou agendou se může lišit o koruny.',
    en: 'The statute rounds the employer premium once on the aggregate of all employees in a rate class, not per employee. For a single employee the result is identical; across a payroll it can differ by koruny.',
    de: 'Das tschechische Gesetz rundet den Arbeitgeberbeitrag einmal auf die Summe aller Beschäftigten einer Satzgruppe, nicht je Beschäftigtem. Bei einem einzelnen Beschäftigten ist das Ergebnis identisch; über eine ganze Lohnabrechnung hinweg kann es um Kronen abweichen.',
  },
  'social.note.workingPensionerClaimAsserted': {
    cs: 'Sleva pro pracujícího starobního důchodce je uplatněna podle vašeho zadání. Nárok vzniká uplatněním u zaměstnavatele; kalkulačka jej neověřuje.',
    en: 'The working old-age pensioner relief is applied as you entered it. Entitlement arises by the employee claiming it with the employer; this calculator does not verify it.',
    de: 'Die tschechische Ermäßigung für erwerbstätige Altersrentner wird nach Ihrer Eingabe angewendet. Der Anspruch entsteht durch Geltendmachung beim Arbeitgeber; dieser Rechner prüft ihn nicht.',
  },
  'social.note.workingPensionerUnsupported': {
    cs: 'Pravidlo pro pracujícího starobního důchodce není v této verzi podloženo dostatečně silným pramenem a není proto počítáno. Tento případ vyžaduje individuální mzdový výpočet.',
    en: 'The working old-age pensioner rule is not sufficiently sourced in this version and is therefore not calculated. This case requires an individual payroll calculation.',
    de: 'Die Regel für erwerbstätige Altersrentner ist in dieser Version nicht ausreichend belegt und wird daher nicht berechnet. Dieser Fall erfordert eine individuelle tschechische Lohnabrechnung.',
  },
  'social.note.employerDiscountConditionsAttested': {
    cs: 'Sleva na pojistném zaměstnavatele je uplatněna na základě vašeho potvrzení. Kalkulačka ověřuje jen měřitelné podmínky — rozsah úvazku, hranici vyměřovacího základu, limit hodin a hodinovou hranici. Ostatní podmínky (péče o dítě, studium, invalidita, oznámení záměru ČSSZ a registrace u jiného zaměstnavatele) ověřit nelze.',
    en: 'The employer social-insurance discount is applied on your confirmation. The calculator tests only the measurable conditions — the agreed working time, the assessment-base ceiling, the hours cap and the per-hour ceiling. The rest (childcare, study, disability, the notification of intent to ČSSZ, and whether another employer registered first) cannot be verified.',
    de: 'Die Ermäßigung der Arbeitgeberbeiträge zur tschechischen Sozialversicherung wird auf Ihre Bestätigung hin angewendet. Der Rechner prüft nur die messbaren Voraussetzungen — vereinbarte Arbeitszeit, Obergrenze der Bemessungsgrundlage, Stundenobergrenze und Stundensatzgrenze. Die übrigen (Kinderbetreuung, Studium, Invalidität, Absichtsanzeige an die ČSSZ und vorherige Registrierung durch einen anderen Arbeitgeber) sind nicht überprüfbar.',
  },
  'social.note.employerDiscountUnsupported': {
    cs: 'Sleva na pojistném zaměstnavatele není v této verzi podložena dostatečně silným pramenem a není počítána.',
    en: 'The employer social-insurance discount is not sufficiently sourced in this version and is not calculated.',
    de: 'Die Ermäßigung der Arbeitgeberbeiträge zur tschechischen Sozialversicherung ist in dieser Version nicht ausreichend belegt und wird nicht berechnet.',
  },

  // ── Employer discount, condition failures ────────────────────────────────
  'discount.fail.weeklyHoursBand': {
    cs: 'Sleva nebyla uplatněna: sjednaná týdenní pracovní doba musí být v rozmezí 8 až 30 hodin.',
    en: 'Discount not applied: the agreed weekly working time must be between 8 and 30 hours.',
    de: 'Ermäßigung nicht angewendet: Die vereinbarte Wochenarbeitszeit muss zwischen 8 und 30 Stunden liegen.',
  },
  'discount.fail.notShorterThanFullTime': {
    cs: 'Sleva nebyla uplatněna: sjednaná pracovní doba musí být kratší než stanovená týdenní pracovní doba u tohoto zaměstnavatele.',
    en: 'Discount not applied: the agreed working time must be shorter than the employer’s own full-time weekly norm.',
    de: 'Ermäßigung nicht angewendet: Die vereinbarte Arbeitszeit muss kürzer sein als die festgelegte Wochenarbeitszeit bei diesem Arbeitgeber.',
  },
  'discount.fail.monthlyBaseCeiling': {
    cs: 'Sleva nebyla uplatněna: vyměřovací základ přesahuje měsíční hranici 73 451 Kč pro rok 2026.',
    en: 'Discount not applied: the assessment base exceeds the 73 451 CZK monthly ceiling for 2026.',
    de: 'Ermäßigung nicht angewendet: Die Bemessungsgrundlage übersteigt die tschechische Monatsobergrenze von 73 451 CZK für 2026.',
  },
  'discount.fail.hoursCap': {
    cs: 'Sleva nebyla uplatněna: odpracovaná doba přesahuje limit 138 hodin za měsíc.',
    en: 'Discount not applied: hours worked exceed the 138-hour monthly cap.',
    de: 'Ermäßigung nicht angewendet: Die geleisteten Stunden überschreiten die Obergrenze von 138 Stunden pro Monat.',
  },
  'discount.fail.perHourCeiling': {
    cs: 'Sleva nebyla uplatněna: vyměřovací základ na jednu odpracovanou hodinu přesahuje hranici 564 Kč pro rok 2026.',
    en: 'Discount not applied: the assessment base per hour worked exceeds the 564 CZK ceiling for 2026.',
    de: 'Ermäßigung nicht angewendet: Die Bemessungsgrundlage je geleisteter Stunde übersteigt die tschechische Grenze von 564 CZK für 2026.',
  },

  // ── Health insurance ─────────────────────────────────────────────────────
  'health.note.topUpBorneByEmployeeAlone': {
    cs: 'Vyměřovací základ je nižší než minimální. Doplatek 13,5 % z rozdílu hradí podle § 3 odst. 10 ZAMĚSTNANEC SÁM prostřednictvím zaměstnavatele — nedělí se na třetiny a zaměstnavateli náklad nezvyšuje.',
    en: 'The assessment base is below the minimum. Under § 3 odst. 10 the 13,5 % top-up on the difference is borne by the EMPLOYEE ALONE, remitted through the employer — it is not split into thirds and does not raise the employer’s cost.',
    de: 'Die Bemessungsgrundlage liegt unter dem tschechischen Mindestwert. Nach § 3 Abs. 10 trägt der ARBEITNEHMER ALLEIN den Aufschlag von 13,5 % auf die Differenz, abgeführt über den Arbeitgeber — er wird nicht gedrittelt und erhöht die Arbeitgeberkosten nicht.',
  },
  'health.note.topUpBorneByEmployerAsserted': {
    cs: 'Podle vašeho zadání vznikl rozdíl z důvodu překážky na straně zaměstnavatele, a doplatek proto hradí zaměstnavatel. Právní kvalifikaci nepřítomnosti kalkulačka posoudit nemůže.',
    en: 'You indicated the shortfall arises from an obstacle on the employer’s side, so the employer bears the top-up. The calculator cannot make that legal classification itself.',
    de: 'Nach Ihrer Angabe entsteht die Differenz durch ein Hindernis aufseiten des Arbeitgebers, sodass der Arbeitgeber den Aufschlag trägt. Die rechtliche Einordnung der Abwesenheit kann der Rechner nicht selbst vornehmen.',
  },
  'health.note.minimumExemptAsserted': {
    cs: 'Podle vašeho zadání se na tohoto zaměstnance minimální vyměřovací základ nevztahuje. Výjimka musí trvat po celé rozhodné období; kalkulačka ji neověřuje.',
    en: 'You indicated the minimum assessment base does not apply to this employee. The exemption must last the whole calendar month; the calculator does not verify it.',
    de: 'Nach Ihrer Angabe gilt die tschechische Mindestbemessungsgrundlage für diesen Beschäftigten nicht. Die Ausnahme muss den ganzen Kalendermonat andauern; der Rechner prüft dies nicht.',
  },
  'health.note.proRataFormulaNotPublished': {
    cs: 'Minimální základ je poměrně snížen podle kalendářních dnů. § 3 odst. 9 stanoví jen princip — žádný orgán nepublikuje vzorec, dělitele ani zaokrouhlení, takže použitý výpočet je dokumentovaný předpoklad, nikoli citace předpisu. Pozor: kratší úvazek sám o sobě minimum NESNIŽUJE.',
    en: 'The minimum base is reduced pro rata by calendar days. § 3 odst. 9 states only the principle — no authority publishes the formula, the divisor or any rounding, so the arithmetic used is a documented assumption rather than a citation. Note: part-time work by itself does NOT reduce the minimum.',
    de: 'Die Mindestgrundlage wird anteilig nach Kalendertagen gekürzt. § 3 Abs. 9 nennt nur das Prinzip — keine tschechische Behörde veröffentlicht Formel, Divisor oder Rundung, sodass die verwendete Rechnung eine dokumentierte Annahme ist. Hinweis: Teilzeit allein senkt die Mindestgrundlage NICHT.',
  },
  'health.note.shareRoundingNotPrescribed': {
    cs: 'Pojistné 13,5 % se zaokrouhluje nahoru jednou a teprve poté dělí. Jak se dělí na třetiny, není-li částka dělitelná třemi, žádný předpis ani metodika nestanoví; zde se třetina zaměstnance zaokrouhluje nahoru a zbytek nese zaměstnavatel. Součet vždy odpovídá odváděné částce; rozdíl může činit nejvýše jednu korunu.',
    en: 'The 13,5 % premium is rounded up once and only then split. How the thirds are rounded when the amount is not divisible by three is prescribed by neither statute nor methodology; here the employee’s third rounds up and the employer takes the remainder. The two always sum to the amount remitted; the difference is at most one koruna.',
    de: 'Der Beitrag von 13,5 % wird einmal aufgerundet und erst dann geteilt. Wie die Drittel gerundet werden, wenn der Betrag nicht durch drei teilbar ist, regeln weder Gesetz noch Methodik; hier wird das Arbeitnehmerdrittel aufgerundet, den Rest trägt der Arbeitgeber. Die Summe entspricht stets dem abgeführten Betrag; die Abweichung beträgt höchstens eine Krone.',
  },
  'health.note.topUpRoundingNotPrescribed': {
    cs: 'Pojistné za měsíc se zde počítá jednou z minimálního vyměřovacího základu a doplatek je zbytek po pojistném ze skutečného základu — součet tak přesně odpovídá minimálnímu pojistnému 3 024 Kč. § 3 odst. 10 vlastní pravidlo zaokrouhlení nestanoví; zaokrouhlit obě části zvlášť by dalo o korunu víc.',
    en: 'The month’s premium is computed once from the minimum assessment base, and the top-up is what remains after the premium on the actual base — so the two sum to exactly the 3 024 CZK minimum premium. § 3 odst. 10 prescribes no rounding of its own; rounding both parts separately would give one koruna more.',
    de: 'Der Monatsbeitrag wird hier einmal aus der Mindestbemessungsgrundlage berechnet, und der Aufschlag ist der Rest nach dem Beitrag auf die tatsächliche Grundlage — die Summe entspricht damit genau dem tschechischen Mindestbeitrag von 3 024 CZK. § 3 Abs. 10 sieht keine eigene Rundungsregel vor; beide Teile getrennt zu runden ergäbe eine Krone mehr.',
  },

  // ── Income tax ───────────────────────────────────────────────────────────
  'tax.note.noDeclarationNoMonthlyRelief': {
    cs: 'Bez podepsaného prohlášení poplatníka se měsíčně neuplatní žádná sleva — ani základní sleva na poplatníka — ani daňové zvýhodnění na děti (§ 38h odst. 5). Zaměstnanec je získá až v ročním zúčtování nebo v daňovém přiznání.',
    en: 'Without a signed taxpayer declaration nothing is applied monthly — not even the basic taxpayer credit — nor the child tax benefit (§ 38h odst. 5). The employee recovers them in the annual settlement or a tax return.',
    de: 'Ohne unterzeichnete tschechische Arbeitnehmererklärung wird monatlich nichts angerechnet — auch nicht der Grundermäßigung für Steuerpflichtige (sleva na poplatníka) — und ebenso wenig der Kindersteuerermäßigung (daňové zvýhodnění na dítě) (§ 38h Abs. 5). Der Arbeitnehmer erhält sie erst im Jahresausgleich oder in der tschechischen Steuererklärung.',
  },
  'tax.note.startOfMonthCondition': {
    cs: 'Slevy na invaliditu a ZTP/P lze uplatnit, jen byly-li podmínky splněny na počátku kalendářního měsíce (§ 35ba odst. 3). Kalkulačka tuto podmínku neověřuje.',
    en: 'The disability and ZTP/P credits apply only if the conditions were met at the START of the calendar month (§ 35ba odst. 3). The calculator does not verify this.',
    de: 'Die Ermäßigungen für Invalidität und ZTP/P gelten nur, wenn die Voraussetzungen zu BEGINN des Kalendermonats erfüllt waren (§ 35ba Abs. 3). Der Rechner prüft dies nicht.',
  },
  'tax.note.creditsCappedAtAdvance': {
    cs: 'Slevy na dani byly omezeny výší zálohy — sleva nikdy nevytvoří přeplatek k výplatě (§ 35d odst. 3).',
    en: 'Tax credits were capped at the advance — a credit can never produce a payment to the employee (§ 35d odst. 3).',
    de: 'Die Steuerermäßigungen wurden auf die Höhe der Vorauszahlung begrenzt — eine Ermäßigung führt nie zu einer Auszahlung (§ 35d Abs. 3).',
  },
  'tax.note.nonResidentPersonalCreditsAnnualOnly': {
    cs: 'Daňový nerezident může měsíčně uplatnit pouze základní slevu na poplatníka. Slevy na invaliditu a ZTP/P jen v ročním zúčtování nebo přiznání (§ 38h odst. 13).',
    en: 'A non-resident may claim only the basic taxpayer credit monthly. Disability and ZTP/P credits are available only in the annual settlement or return (§ 38h odst. 13).',
    de: 'Eine nicht in Tschechien ansässige Person kann monatlich nur die Grundermäßigung (sleva na poplatníka) geltend machen. Ermäßigungen für Invalidität und ZTP/P nur im tschechischen Jahresausgleich oder in der Steuererklärung (§ 38h Abs. 13).',
  },
  'tax.note.nonResidentChildBenefitAnnualOnly': {
    cs: 'Daňové zvýhodnění na dítě nelze u nerezidenta uplatnit měsíčně — pouze za zákonných podmínek v daňovém přiznání.',
    en: 'A non-resident cannot claim the child tax benefit monthly — only in a tax return, under statutory conditions.',
    de: 'Der Kindersteuerermäßigung (daňové zvýhodnění na dítě) kann von nicht in Tschechien Ansässigen nicht monatlich geltend gemacht werden — nur unter gesetzlichen Voraussetzungen in der Steuererklärung.',
  },
  'tax.note.bonusBelowMinimumPayout': {
    cs: 'Měsíční daňový bonus se nevyplácí, nedosahuje-li alespoň 50 Kč (§ 35d odst. 4).',
    en: 'The monthly tax bonus is not paid out below 50 CZK (§ 35d odst. 4).',
    de: 'Der monatliche tschechische Steuerbonus wird unter 50 CZK nicht ausgezahlt (§ 35d Abs. 4).',
  },
  'tax.note.bonusIncomeBelowHalfMinimumWage': {
    cs: 'Měsíční daňový bonus se nevyplácí — příjem za měsíc nedosahuje poloviny minimální mzdy, tj. 11 200 Kč pro rok 2026.',
    en: 'The monthly tax bonus is not paid — monthly income does not reach half the minimum wage, i.e. 11 200 CZK for 2026.',
    de: 'Der monatliche tschechische Steuerbonus wird nicht gezahlt — das Monatseinkommen erreicht nicht die Hälfte des tschechischen Mindestlohns, also 11 200 CZK für 2026.',
  },
  'tax.note.withholdingRegime': {
    cs: 'Bez podepsaného prohlášení a při měsíčním příjmu nižším než 4 500 Kč se uplatní srážková daň 15 % (§ 6 odst. 4). Jde o samostatný základ daně: neuplatní se žádné slevy ani zvýhodnění a základ i daň se zaokrouhlují DOLŮ.',
    en: 'With no signed declaration and monthly income below 4 500 CZK, a flat 15 % withholding tax applies (§ 6 odst. 4). It is a separate tax base: no credits, no child benefit, and both the base and the tax round DOWN.',
    de: 'Ohne unterzeichnete Erklärung und bei einem Monatseinkommen unter 4 500 CZK gilt eine pauschale tschechische Quellensteuer von 15 % (§ 6 Abs. 4). Es handelt sich um eine gesonderte Bemessungsgrundlage: keine Ermäßigungen, kein Kindersteuerermäßigung (daňové zvýhodnění na dítě), und Grundlage wie Steuer werden ABGERUNDET.',
  },

  // ── Employer liability insurance ─────────────────────────────────────────
  'liability.note.excludedFromTotal': {
    cs: 'Zákonné pojištění odpovědnosti zaměstnavatele není zahrnuto. Sazba závisí na převažující činnosti zaměstnavatele — zapněte je a vyberte činnost, chcete-li je do nákladu započítat.',
    en: 'Statutory employer liability insurance is not included. The rate depends on the employer’s prevailing activity — enable it and pick an activity to add it to the cost.',
    de: 'Die gesetzliche tschechische Arbeitgeberhaftpflichtversicherung ist nicht enthalten. Der Satz hängt von der überwiegenden Tätigkeit des Arbeitgebers ab — aktivieren Sie sie und wählen Sie eine Tätigkeit, um sie einzubeziehen.',
  },
  'liability.note.rateNotResolved': {
    cs: 'Sazbu zákonného pojištění se nepodařilo určit, a pojistné proto není započteno.',
    en: 'The liability-insurance rate could not be resolved, so no premium is included.',
    de: 'Der Satz der gesetzlichen tschechischen Arbeitgeberhaftpflichtversicherung konnte nicht bestimmt werden; es ist daher kein Beitrag enthalten.',
  },
  'liability.note.allocationNotInvoice': {
    cs: 'Uvedená částka je ROZPOČTENÝ podíl připadající na tohoto zaměstnance, nikoli částka k úhradě. Pojistné se platí čtvrtletně z úhrnu vyměřovacích základů všech zaměstnanců a sazba je jediná pro celého zaměstnavatele.',
    en: 'This figure is an ALLOCATED share attributable to this employee, not an amount payable. The premium is paid quarterly from the aggregate assessment bases of all employees, at a single rate for the whole employer.',
    de: 'Dieser Betrag ist ein ZUGERECHNETER Anteil für diesen Beschäftigten, keine zu zahlende Summe. Der Beitrag wird in Tschechien vierteljährlich aus den Bemessungsgrundlagen aller Beschäftigten mit einem einzigen Satz für den gesamten Arbeitgeber gezahlt.',
  },
  'liability.note.premiumComputedFromPrecedingQuarter': {
    cs: 'Skutečné pojistné za čtvrtletí se počítá z vyměřovacích základů za čtvrtletí PŘEDCHOZÍ a platí se do konce prvního měsíce pojišťovaného čtvrtletí. Zde uvedený údaj vychází z aktuální mzdy.',
    en: 'The actual quarterly premium is computed from the PRECEDING quarter’s assessment bases and is due by the end of the first month of the quarter insured. The figure here is based on the current salary.',
    de: 'Der tatsächliche Quartalsbeitrag wird aus den Bemessungsgrundlagen des VORQUARTALS berechnet und ist bis zum Ende des ersten Monats des versicherten Quartals fällig. Der hier gezeigte Wert beruht auf dem aktuellen Gehalt.',
  },
  'liability.note.annualMaximumDisapplicationRestsOnAdministrators': {
    cs: 'Maximální vyměřovací základ sociálního pojištění se na toto pojištění neuplatňuje. Uvádějí to oba správci pojištění; sama vyhláška to nestanoví, a jde tedy o nejslabší operativní pravidlo v tomto výpočtu.',
    en: 'The annual social-insurance maximum is not applied to this premium. Both administering insurers publish this; the decree itself does not say so, which makes it the most weakly founded rule in this calculation.',
    de: 'Die tschechische Jahreshöchstbemessungsgrundlage der Sozialversicherung gilt für diesen Beitrag nicht. Beide durchführenden Versicherer veröffentlichen dies; die Verordnung selbst sagt es nicht, weshalb dies die am schwächsten begründete Regel dieser Berechnung ist.',
  },
  'liability.note.employerLevelQuarterlyFloor': {
    cs: 'Vyhláška stanoví minimální pojistné 100 Kč za čtvrtletí. Jde o minimum za CELÉHO ZAMĚSTNAVATELE, nikoli za zaměstnance — do rozpočteného podílu se proto nepřičítá.',
    en: 'The decree sets a minimum premium of 100 CZK per quarter. That floor is for the WHOLE EMPLOYER, not per employee, so it is not added to the allocated share.',
    de: 'Die Verordnung setzt einen Mindestbeitrag von 100 CZK je Quartal fest. Diese Untergrenze gilt für den GESAMTEN ARBEITGEBER, nicht je Beschäftigtem, und wird dem zugerechneten Anteil daher nicht hinzugefügt.',
  },

  // ── Annual view ──────────────────────────────────────────────────────────
  'annual.note.builtFromPeriodicity': {
    cs: 'Roční pohled se sestavuje podle skutečné periodicity každé položky — měsíční × 12, čtvrtletní × 4, roční jednou, jednorázové jednou. Není to měsíční součet vynásobený dvanácti.',
    en: 'The annual view is built from each item’s real periodicity — monthly × 12, quarterly × 4, annual once, one-off once. It is not the monthly total multiplied by twelve.',
    de: 'Die Jahresansicht wird aus der tatsächlichen Periodizität jeder Position gebildet — monatlich × 12, vierteljährlich × 4, jährlich einmal, einmalig einmal. Sie ist nicht die mit zwölf multiplizierte Monatssumme.',
  },
  'annual.note.statutoryAnnualAssumesTwelveIdenticalMonths': {
    cs: 'Roční statutární náklad je modelový: předpokládá dvanáct shodných měsíců. Skutečný rok se liší, jakmile se změní mzda nebo se dosáhne maximálního vyměřovacího základu.',
    en: 'The annual statutory cost is a scenario: it assumes twelve identical months. A real year diverges as soon as pay changes or the maximum assessment base is reached.',
    de: 'Die jährlichen gesetzlichen Kosten sind ein Szenario: Sie unterstellen zwölf identische Monate. Ein reales Jahr weicht ab, sobald sich das Gehalt ändert oder die Höchstbemessungsgrundlage erreicht wird.',
  },
};

/** Result labels for the two headline totals and the breakdown rows. */
export const RESULT_LABELS: Readonly<Record<string, Copy>> = {
  'result.employerHeading': {
    cs: 'Náklady zaměstnavatele',
    en: 'Employer cost',
    de: 'Arbeitgeberkosten',
  },
  'result.employeeHeading': {
    cs: 'Čistá mzda zaměstnance',
    en: 'Employee net salary',
    de: 'Nettogehalt des Arbeitnehmers',
  },
  'result.statutoryTotal': {
    cs: 'Statutární mzdové náklady zaměstnavatele',
    en: 'Statutory employer payroll cost',
    de: 'Gesetzliche Lohnkosten des Arbeitgebers',
  },
  'result.realTotal': {
    cs: 'Celkové skutečné náklady zaměstnavatele',
    en: 'Total real employer cost',
    de: 'Gesamte tatsächliche Arbeitgeberkosten',
  },
  'result.gross': { cs: 'Hrubá mzda', en: 'Gross salary', de: 'Bruttogehalt' },
  'result.employerSocial': {
    cs: 'Sociální pojištění zaměstnavatele',
    en: 'Employer social insurance',
    de: 'Arbeitgeberanteil zur tschechischen Sozialversicherung',
  },
  'result.employerHealth': {
    cs: 'Zdravotní pojištění zaměstnavatele',
    en: 'Employer health insurance',
    de: 'Arbeitgeberanteil zur tschechischen Krankenversicherung',
  },
  'result.employerHealthTopUp': {
    cs: 'Doplatek do minimálního základu (hradí zaměstnavatel)',
    en: 'Minimum-base top-up (borne by the employer)',
    de: 'Aufschlag auf die Mindestgrundlage (vom Arbeitgeber getragen)',
  },
  'result.employerLiability': {
    cs: 'Zákonné pojištění odpovědnosti (rozpočtený podíl)',
    en: 'Statutory liability insurance (allocated share)',
    de: 'Gesetzliche tschechische Haftpflichtversicherung (zugerechneter Anteil)',
  },
  'result.employeeSocial': {
    cs: 'Sociální pojištění zaměstnance',
    en: 'Employee social insurance',
    de: 'Arbeitnehmeranteil zur tschechischen Sozialversicherung',
  },
  'result.employeeHealth': {
    cs: 'Zdravotní pojištění zaměstnance',
    en: 'Employee health insurance',
    de: 'Arbeitnehmeranteil zur tschechischen Krankenversicherung',
  },
  'result.employeeHealthTopUp': {
    cs: 'Doplatek do minimálního základu (hradí zaměstnanec)',
    en: 'Minimum-base top-up (borne by the employee)',
    de: 'Aufschlag auf die Mindestgrundlage (vom Arbeitnehmer getragen)',
  },
  'result.taxBase': { cs: 'Základ daně', en: 'Tax base', de: 'Steuerbemessungsgrundlage' },
  'result.taxBefore': {
    cs: 'Daň před slevami',
    en: 'Tax before credits',
    de: 'Steuer vor Ermäßigungen',
  },
  'result.taxCredits': { cs: 'Slevy na dani', en: 'Tax credits', de: 'Steuerermäßigungen' },
  'result.childBenefit': {
    cs: 'Daňové zvýhodnění na děti',
    en: 'Child tax benefit',
    de: 'Kindersteuerermäßigung (daňové zvýhodnění na dítě)',
  },
  'result.taxFinal': {
    cs: 'Záloha na daň',
    en: 'Income-tax advance',
    de: 'Lohnsteuervorauszahlung',
  },
  'result.taxBonus': {
    cs: 'Daňový bonus (vyplácí se zaměstnanci)',
    en: 'Tax bonus (paid to the employee)',
    de: 'Tschechischer Steuerbonus (an den Arbeitnehmer ausgezahlt)',
  },
  'result.net': { cs: 'Čistá mzda', en: 'Net salary', de: 'Nettogehalt' },
  'result.aboveGross': {
    cs: 'Statutární náklad nad hrubou mzdou',
    en: 'Statutory cost above gross',
    de: 'Gesetzliche Kosten über dem Brutto',
  },
  'result.configuredAboveGross': {
    cs: 'Celkový nastavený náklad nad hrubou mzdou',
    en: 'Total configured cost above gross',
    de: 'Gesamte konfigurierte Kosten über dem Brutto',
  },
  'result.netToGross': {
    cs: 'Poměr čisté a hrubé mzdy',
    en: 'Net-to-gross ratio',
    de: 'Verhältnis netto zu brutto',
  },
  'result.costToNet': {
    cs: 'Poměr nákladu zaměstnavatele k čisté mzdě',
    en: 'Employer cost to net salary',
    de: 'Verhältnis Arbeitgeberkosten zum Netto',
  },
  'result.companyCosts': {
    cs: 'Další náklady zaměstnavatele (měsíčně)',
    en: 'Additional employer costs (monthly)',
    de: 'Zusätzliche Arbeitgeberkosten (monatlich)',
  },
  'flow.heading': {
    cs: 'Kam peníze jdou',
    en: 'Where the money goes',
    de: 'Wohin das Geld fließt',
  },
  'flow.employee_net': {
    cs: 'Zaměstnanec dostane',
    en: 'The employee receives',
    de: 'Der Arbeitnehmer erhält',
  },
  'flow.social': {
    cs: 'Sociální pojištění',
    en: 'Social insurance',
    de: 'Tschechische Sozialversicherung',
  },
  'flow.health': {
    cs: 'Zdravotní pojištění',
    en: 'Health insurance',
    de: 'Tschechische Krankenversicherung',
  },
  'flow.income_tax': { cs: 'Daň z příjmů', en: 'Income tax', de: 'Einkommensteuer' },
  'flow.employer_overhead': {
    cs: 'Zákonné pojištění odpovědnosti',
    en: 'Statutory liability insurance',
    de: 'Gesetzliche tschechische Haftpflichtversicherung',
  },
  'flow.company_costs': {
    cs: 'Ostatní firemní náklady',
    en: 'Other company costs',
    de: 'Sonstige Unternehmenskosten',
  },
  'annual.heading': { cs: 'Roční pohled', en: 'Annual view', de: 'Jahresansicht' },
  'annual.recurring': {
    cs: 'Opakované měsíční náklady × 12',
    en: 'Recurring monthly costs × 12',
    de: 'Laufende monatliche Kosten × 12',
  },
  'annual.annualOnly': {
    cs: 'Roční položky (jednou za rok)',
    en: 'Annual items (once a year)',
    de: 'Jährliche Positionen (einmal pro Jahr)',
  },
  'annual.oneOff': {
    cs: 'Jednorázové náklady (jednou za obsazení místa)',
    en: 'One-off costs (once per hire)',
    de: 'Einmalige Kosten (einmal je Einstellung)',
  },
};
