// Czech server-default gate (READ-ONLY). Czech is the primary market, so the
// initial server-rendered HTML must be Czech — no English default chrome, no
// English→Czech flash for a clean browser.
//
// Checks:
//   1. script.js defaults to 'cs' when no stored preference exists.
//   2. <html lang="cs"> is the server default (pages/_document.tsx).
//   3. The default language button (CS) is the one marked active in the header.
//   4. Every data-i18n="ns.key">TEXT< default equals the Czech dictionary value
//      (mnav.* aliases nav.*), so the raw HTML renders Czech, not English.
//
// The Czech dictionary is parsed from public/script.js (the single source the
// client swapper uses), so this gate and the runtime cannot drift apart.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const SCRIPT = read('public/script.js');
const errors = [];

// ── 1–3. language-state defaults ────────────────────────────────────────────
if (!/getItem\('tnt-lang'\)\s*\|\|\s*'cs'/.test(SCRIPT)) {
  errors.push("script.js does not default the language to 'cs' when no preference is stored");
}
const doc = read('pages/_document.tsx');
if (!/<Html lang="cs">/.test(doc)) errors.push('pages/_document.tsx does not set <Html lang="cs">');
const header = read('components/Header.tsx');
for (const m of header.matchAll(/<button className="(lang-btn[^"]*)" data-lang="([a-z]{2})"/g)) {
  const active = /\bactive\b/.test(m[1]);
  if (m[2] === 'cs' && !active) errors.push('CS language button is not the default active button');
  if (m[2] !== 'cs' && active) errors.push(`${m[2].toUpperCase()} language button is active by default (should be CS)`);
}

// ── Parse the cs dictionary (ns.key -> value) from script.js ─────────────────
function csDict() {
  const start = SCRIPT.search(/\n {2}cs:\s*\{/);
  const deStart = SCRIPT.search(/\n {2}de:\s*\{/);
  const region = SCRIPT.slice(start, deStart > start ? deStart : undefined);
  const dict = {};
  let ns = null, sub = null;
  for (const line of region.split('\n')) {
    let m;
    if ((m = line.match(/^ {4}(\w+):\s*\{/))) { ns = m[1]; sub = null; continue; }
    if (/^ {4}\}/.test(line)) { ns = null; sub = null; continue; }
    if ((m = line.match(/^ {6}(\w+):\s*\{\s*$/)) && ns) { sub = m[1]; continue; }
    if (/^ {6}\}/.test(line)) { sub = null; continue; }
    if ((m = line.match(/^ {6}(\w+):\s*(['"`])((?:[^\\]|\\.)*?)\2\s*,?\s*$/)) && ns && !sub) dict[`${ns}.${m[1]}`] = m[3];
    else if ((m = line.match(/^ {8}(\w+):\s*(['"`])((?:[^\\]|\\.)*?)\2\s*,?\s*$/)) && ns && sub) dict[`${ns}.${sub}.${m[1]}`] = m[3];
  }
  return dict;
}
const CS = csDict();
const resolve = (key) => (CS[key] != null ? key : key.startsWith('m') ? key.slice(1) : key);

// ── 4. Every data-i18n default renders the Czech value ──────────────────────
const FILES = [
  'components/Header.tsx', 'components/Footer.tsx', 'pages/index.tsx',
  'pages/submit-offer.tsx', 'pages/submit-agency.tsx', 'pages/contact.tsx',
  'pages/agencies.tsx', 'pages/offers.tsx',
];
let checked = 0;
for (const f of FILES) {
  const src = read(f);
  for (const m of src.matchAll(/data-i18n="([^"]+)"[^>]*>([^<{}]*)</g)) {
    const key = resolve(m[1]);
    const text = m[2];
    if (!text.trim()) continue; // text supplied elsewhere (e.g. via {' '})
    const val = CS[key];
    if (val == null) continue; // key not a simple leaf (handled by parity gate)
    if (val.includes('<')) continue; // markup value: inner text checked by build + browser QA
    checked++;
    if (text !== val) errors.push(`${f}: data-i18n="${m[1]}" default is "${text}" but the Czech value is "${val}"`);
  }
}

if (errors.length) {
  console.error(`Czech server-default gate: FAIL (${errors.length})`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('Czech server-default gate: PASS');
console.log(`  script.js default = 'cs'; <html lang="cs">; CS button active`);
console.log(`  ${checked} data-i18n defaults verified equal to the Czech dictionary`);
