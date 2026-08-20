// Site-wide E-E-A-T / trust gate (READ-ONLY, dependency-free). Batch C.
//
// The existing gates are narrowly file-scoped: validate-trust.js covers only
// trust-data.ts + o-nas.tsx; the conversion vitest covers only the poptavka
// page; security-check.js covers copy.ts; validate-legal.js covers the static
// legal docs. NONE of them polices the ~150 SEO/content pages, the SeoArticle
// render path, the inline page JSON-LD, or the footer. This validator closes
// that gap SITE-WIDE and locks the honest E-E-A-T state so it cannot regress.
//
// It fails when, anywhere in pages/**, components/**, lib/** (tests excluded):
//  1. any Review/AggregateRating/rating schema token appears (no fake ratings);
//  2. any Person-author node or fabricated credential/title appears
//     (authorship is the "redakce" Organization, never an invented specialist);
//  3. an operator legalName literal is anything other than "TNT agency s.r.o.";
//  4. a state/government-endorsement phrase is presented as fact (outside the
//     honest "Nepoužíváme formulace…" negation sentence);
//  5. the editorial-standards page is missing or not linked from the footer and
//     the content render path, or the editorial-responsibility note is dropped.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OPERATOR = 'TNT agency s.r.o.';
const errors = [];
const warnings = [];

/** Source with comments stripped: assertions target code/markup, not prose about the rules. */
const code = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

const walk = (dir, ext, out = []) => {
  const full0 = path.join(ROOT, dir);
  if (!fs.existsSync(full0)) return out;
  for (const e of fs.readdirSync(full0, { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(e.name)) continue;
      walk(rel, ext, out);
    } else if (ext.some((x) => e.name.endsWith(x))) out.push(rel);
  }
  return out;
};

const appFiles = [
  ...walk('components', ['.tsx', '.ts']),
  ...walk('lib', ['.ts', '.tsx']),
  ...walk('pages', ['.tsx', '.ts']),
].filter((f) => !f.endsWith('.test.ts') && !f.endsWith('.test.tsx'));

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const sources = appFiles.map((f) => ({ f, raw: read(f), src: code(read(f)) }));

// 1. No fake ratings / reviews anywhere.
const RATING = /\bAggregateRating\b|\bReview\b|\bratingValue\b|\breviewCount\b|\bratingCount\b|\bstarRating\b|\bbestRating\b|\bworstRating\b/;
for (const { f, src } of sources) {
  const m = src.match(RATING);
  if (m) errors.push(`${f}: rating/review schema token "${m[0]}" (no fabricated ratings/reviews allowed)`);
}

// 2a. No fabricated author credentials/titles in any JSON-LD.
const CREDENTIAL = /\bhasCredential\b|\bhonorificPrefix\b|\bhonorificSuffix\b|\bjobTitle\b|\balumniOf\b|\bEducationalOccupationalCredential\b/;
for (const { f, src } of sources) {
  const m = src.match(CREDENTIAL);
  if (m) errors.push(`${f}: author-credential token "${m[0]}" (authorship is the editorial Organization, no fabricated specialist credentials)`);
}

// 2b. author / reviewedBy / creator nodes must be an Organization, never a Person
// (the Person allowlist is intentionally empty → any Person author fails).
const ALLOWED_PEOPLE = [];
for (const { f, src } of sources) {
  for (const m of src.matchAll(/\b(author|reviewedBy|reviewer|creator)\b\s*:/g)) {
    const window = src.slice(m.index, m.index + 400);
    const person = window.match(/['"]@type['"]\s*:\s*['"]Person['"]/);
    if (person) {
      const nameM = window.match(/name\s*:\s*['"]([^'"]+)['"]/);
      const name = nameM ? nameM[1] : '';
      if (!ALLOWED_PEOPLE.includes(name)) {
        errors.push(`${f}: ${m[1]} is a Person node ("${name || 'unnamed'}") — authorship must be the editorial Organization`);
      }
    }
  }
}

// 3. Operator legalName is consistent everywhere it is written as a literal.
for (const { f, src } of sources) {
  for (const m of src.matchAll(/legalName\s*:\s*'([^']*)'/g)) {
    if (m[1] !== OPERATOR) errors.push(`${f}: legalName literal "${m[1]}" ≠ "${OPERATOR}"`);
  }
}

// 4. No state/government-endorsement phrase presented as fact (site-wide). The
// honest pages NAME these phrases only inside the "Nepoužíváme formulace…"
// negation sentence; strip that sentence first, then none may remain.
const ENDORSEMENTS = ['ověřeno MPSV', 'schváleno státem', 'licencováno státem', 'licencováno pro všechny', 'státem prověřená', 'certifikováno MPSV', 'government approved', 'verified by MPSV'];
for (const { f, src } of sources) {
  const withoutNegation = src.replace(/Nepoužíváme formulace[\s\S]*?oficiálnímu záznamu\./g, ' ');
  for (const phrase of ENDORSEMENTS) {
    if (new RegExp(phrase, 'i').test(withoutNegation)) {
      errors.push(`${f}: forbidden endorsement phrase presented as fact: "${phrase}"`);
    }
  }
}

// 5. Editorial-standards page exists and is wired into the trust surface.
const POLICY = 'pages/redakcni-zasady.tsx';
if (!fs.existsSync(path.join(ROOT, POLICY))) {
  errors.push(`${POLICY} is missing — the editorial-standards page must exist`);
} else {
  // The footer no longer holds URL literals: it renders each destination from
  // FOOTER_TARGETS in lib/locale/chrome.ts, so the trust link is proved by
  // following that indirection rather than grepping the component. Both halves
  // are required — a target nothing renders is as broken as a missing target.
  const footer = read('components/Footer.tsx');
  const chrome = read('lib/locale/chrome.ts');
  const targetKey = (chrome.match(/\{\s*key:\s*'([^']+)'\s*,\s*czechHref:\s*'\/redakcni-zasady'/) || [])[1];
  if (!targetKey) {
    errors.push('lib/locale/chrome.ts FOOTER_TARGETS has no entry for /redakcni-zasady (trust cluster)');
  } else if (!footer.includes(`link('${targetKey}')`)) {
    errors.push(`components/Footer.tsx does not render link('${targetKey}') → /redakcni-zasady (trust cluster)`);
  }
  const article = read('components/SeoArticle.tsx');
  if (!article.includes('/redakcni-zasady')) errors.push('components/SeoArticle.tsx editorial note does not link /redakcni-zasady');
  if (!/seo-editorial-note/.test(article) || !/redakce /.test(article)) errors.push('components/SeoArticle.tsx dropped the editorial-responsibility note');
  if (!/methodologyHtml/.test(article) || !/sourcesHtml/.test(article)) errors.push('components/SeoArticle.tsx no longer renders methodology + sources blocks');
  const policy = read(POLICY);
  if (RATING.test(code(policy))) errors.push(`${POLICY}: must not emit any rating/review schema`);
  if (/EmploymentAgency|LocalBusiness/.test(code(policy))) errors.push(`${POLICY}: must stay a content page — no EmploymentAgency/LocalBusiness type`);
}

// 6. The sitewide Organization declares its publishing principles.
const doc = read('pages/_document.tsx');
if (!/publishingPrinciples/.test(doc) || !/redakcni-zasady/.test(doc)) {
  warnings.push('pages/_document.tsx Organization has no publishingPrinciples → /redakcni-zasady');
}

// ── Report ──────────────────────────────────────────────────────────────────
if (warnings.length) { console.log('E-E-A-T gate — notes:'); for (const w of warnings) console.log(`  · ${w}`); }
if (errors.length) {
  console.error(`E-E-A-T gate: FAIL (${errors.length})`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('E-E-A-T gate: PASS');
console.log(`  ${appFiles.length} app files scanned | no fake ratings/reviews | authorship = editorial Organization | 0 fabricated credentials`);
console.log(`  operator legalName consistent ("${OPERATOR}") | no state-endorsement claims | editorial-standards page present + linked`);
