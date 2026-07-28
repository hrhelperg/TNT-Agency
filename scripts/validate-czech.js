// Czech-language editorial gate (READ-ONLY). Czech is the primary market.
//
// HARD failures (exit 1) — these must never ship in Czech user-facing content:
//   - unsupported superlatives (nejlepší, číslo 1, nejlevnější, …)
//   - guarantee / instant-start / no-risk claims
//   - fake urgency
//   - unverified permit / state-endorsement claims (verified by MPSV, …)
//   - placeholder copy (TODO, lorem, coming soon, …)
//
// REVIEW CANDIDATES (reported, never auto-fixed, never fail the build):
//   - non-canonical terminology variants (vs. the registry)
//   - BOZP/OOPP written in lower case
//   - English fragments/headings inside Czech content
//   - missing-diacritics spot check
//   - long sentences duplicated across many pages (templated intros)
//
// The registry is lib/content/czech-terms.json (shared with the typed module).
// Automated checks only identify candidates — native Czech editorial review is
// still required and is not replaced by this gate.

const fs = require('fs');
const path = require('path');
const reg = require('../lib/content/czech-terms.json');

const ROOT = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

// Czech user-facing editorial surfaces (not tests, not English/German chrome).
const TS_CONTENT = [
  'lib/content/pages/city-recruitment.ts',
  'lib/content/pages/industry-recruitment.ts',
  'lib/content/pages/employer-operations.ts',
  'lib/content/pages/foreign-workers.ts',
  'lib/content/pages/employer-intelligence.ts',
  'lib/content/pages/cornerstone.ts',
  'lib/content/pages/regions.ts',
  'lib/content/pages/geo.ts',
  'lib/content/pages/support.ts',
  'lib/content/employment-content.ts',
  'lib/content/recruitment-content.ts',
];
const CS_HTML = ['public/privacy-cs.html', 'public/cookies-cs.html', 'public/terms-cs.html'];

const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/.*$/gm, '$1');

// A URL/slug/path/key literal (e.g. '/trh-prace-praha', 'nabor-ze-zahranici',
// 'https://…'). These legitimately drop diacritics and must NOT be treated as
// Czech prose, or every slug would trip the diacritics/terminology checks.
const isSlugLike = (s) =>
  /^\/?[a-z0-9]+(?:[-/][a-z0-9]+)+\/?$/.test(s.trim()) ||
  /^https?:\/\//.test(s.trim()) ||
  /^#|^mailto:|^tel:/.test(s.trim());

// Extract Czech prose from a TS content module: string + template literals,
// with ${...} interpolations blanked so we test the surrounding prose only.
function tsProse(src) {
  const code = stripComments(src);
  const out = [];
  for (const m of code.matchAll(/'((?:[^'\\]|\\.)*)'/g)) if (!isSlugLike(m[1])) out.push(m[1]);
  for (const m of code.matchAll(/`((?:[^`\\]|\\.)*)`/g)) {
    const v = m[1].replace(/\$\{[^}]*\}/g, ' ');
    if (!isSlugLike(v)) out.push(v);
  }
  return out.join('\n');
}
const htmlText = (html) =>
  html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ');

const units = [];
for (const f of TS_CONTENT) if (fs.existsSync(path.join(ROOT, f))) units.push({ file: f, text: tsProse(read(f)) });
for (const f of CS_HTML) if (fs.existsSync(path.join(ROOT, f))) units.push({ file: f, text: htmlText(read(f)) });

const hard = [];
const review = [];
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasPhrase = (text, phrase) =>
  new RegExp(`(^|[^\\p{L}])${esc(phrase)}([^\\p{L}]|$)`, 'iu').test(text);

for (const { file, text } of units) {
  const low = text.toLowerCase();

  for (const s of reg.forbiddenSuperlatives) if (low.includes(s.toLowerCase())) hard.push(`${file}: unsupported marketing superlative “${s}”`);
  for (const s of reg.reviewSuperlatives || []) if (hasPhrase(low, s.toLowerCase())) review.push(`${file}: superlative “${s}” — verify it is objectively supportable in context, otherwise remove (29.13)`);
  for (const c of reg.forbiddenClaims) if (low.includes(c.toLowerCase())) hard.push(`${file}: unverifiable/guarantee claim “${c}”`);
  for (const u of reg.fakeUrgency) if (new RegExp(u, 'iu').test(text)) hard.push(`${file}: fake-urgency pattern “${u}”`);
  for (const p of reg.placeholders) if (low.includes(p.toLowerCase())) hard.push(`${file}: placeholder copy “${p}”`);

  // Review: non-canonical terminology variants.
  for (const t of reg.terms) {
    for (const v of t.flag || []) {
      if (hasPhrase(text, v)) {
        review.push(`${file}: variant “${v}” → prefer “${t.prefer || t.term}” (${t.flagSeverity || 'info'})${t.flagNote ? ` — ${t.flagNote}` : ''}`);
      }
    }
  }
  // Review: BOZP/OOPP lowercase.
  for (const abbr of ['bozp', 'oopp']) {
    const m = text.match(new RegExp(`(^|[^\\p{L}])(${abbr})([^\\p{L}]|$)`, 'gu'));
    if (m && m.some((x) => new RegExp(abbr).test(x))) review.push(`${file}: “${abbr}” should be “${abbr.toUpperCase()}”`);
  }
  // Review: English fragment phrases inside Czech content.
  for (const e of reg.englishFragmentPhrases) if (low.includes(e.toLowerCase())) review.push(`${file}: English fragment “${e}”`);
  // Review: missing-diacritics spot check.
  for (const d of reg.diacriticsSpotCheck) if (hasPhrase(text, d.wrong)) review.push(`${file}: possible missing diacritics “${d.wrong}” → “${d.right}”`);
}

// Review: long sentences duplicated across many pages (templated intros/paragraphs).
const sentenceCount = new Map();
for (const { text } of units) {
  for (const raw of text.split(/(?<=[.!?])\s+/)) {
    const s = raw.replace(/\s+/g, ' ').trim();
    if (s.length >= 80) sentenceCount.set(s, (sentenceCount.get(s) || 0) + 1);
  }
}
const dupSentences = [...sentenceCount.entries()].filter(([, n]) => n >= 4).sort((a, b) => b[1] - a[1]);
for (const [s, n] of dupSentences.slice(0, 20)) review.push(`duplicated ×${n} across pages: “${s.slice(0, 90)}…”`);

// ── Report ──────────────────────────────────────────────────────────────────
console.log(`Czech editorial gate — registry v${reg.version}`);
console.log(`  surfaces scanned: ${units.length}`);
console.log(`  review candidates: ${review.length} (not build-failing; need native editorial review)`);
for (const r of review.slice(0, 60)) console.log(`    · ${r}`);
if (review.length > 60) console.log(`    · … and ${review.length - 60} more`);

if (hard.length) {
  console.error(`\nCzech editorial gate: FAIL (${hard.length} hard violations)`);
  for (const h of hard) console.error(`  ✗ ${h}`);
  process.exit(1);
}
console.log('\nCzech editorial gate: PASS (no superlative / guarantee / urgency / unverified-claim / placeholder violations)');
