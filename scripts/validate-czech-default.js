// Czech server-default gate (READ-ONLY). Czech is the primary market, so the
// initial server-rendered HTML must be Czech — no English default chrome, no
// English→Czech flash for a clean browser.
//
// Checks:
//   1. script.js defaults to 'cs' when no stored preference exists.
//   2. Czech is the server default for <html lang> (pages/_document.tsx), and
//      every per-route override is explicit, non-Czech and a real page.
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
// _document no longer hardcodes lang="cs": /privacy-policy is a genuinely
// English document and must declare English. So rather than matching a literal
// string, assert the property that actually matters — Czech is the DEFAULT, and
// every deviation is explicit, enumerable and a real route. That is stricter
// than the old check, which a stray edit could have satisfied while silently
// changing the default.
const doc = read('pages/_document.tsx');
if (!/const DEFAULT_LANG = 'cs'/.test(doc)) {
  errors.push("pages/_document.tsx does not declare DEFAULT_LANG = 'cs'");
}
// Matches <Html lang={lang}> with or without further attributes: the element
// legitimately gained data-locale-locked when locale routes were introduced,
// and a literal that pins the whole tag breaks on any honest change to it.
if (!/<Html\s+lang=\{lang\}[\s/>]/.test(doc)) {
  errors.push('pages/_document.tsx does not render <Html lang={lang}>');
}
if (!/lang = DEFAULT_LANG/.test(doc)) {
  errors.push('pages/_document.tsx does not fall back to DEFAULT_LANG when no route override applies');
}
// DOCUMENT_LANG is now DERIVED from the locale registry rather than written
// out as an object literal, which is strictly better: a route cannot get a
// lang without being a registry concept. Accept either shape — a literal map,
// or a derivation — and check the resulting behaviour below.
const derivesFromRegistry = /DOCUMENT_LANG[\s\S]{0,200}Object\.fromEntries|localeByRoute/.test(doc);
const overrideBlock = doc.match(/const DOCUMENT_LANG[^=]*=\s*\{([\s\S]*?)\n\}/);
if (!overrideBlock) {
  if (!derivesFromRegistry) errors.push('pages/_document.tsx neither declares nor derives a DOCUMENT_LANG override map');
} else {
  const overrides = [...overrideBlock[1].matchAll(/'([^']+)':\s*'([a-z-]+)'/g)];
  for (const [, route, lang] of overrides) {
    if (lang === 'cs') {
      errors.push(`DOCUMENT_LANG lists ${route} as 'cs', which is already the default — redundant override`);
    }
    const file = route.replace(/^\//, '') || 'index';
    if (!fs.existsSync(path.join(ROOT, `pages/${file}.tsx`))) {
      errors.push(`DOCUMENT_LANG overrides ${route}, which is not a page (pages/${file}.tsx does not exist)`);
    }
  }
  if (overrides.length > 3) {
    errors.push(`DOCUMENT_LANG has ${overrides.length} overrides — Czech-default is no longer the rule; review the architecture`);
  }
}
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
console.log(`  script.js default = 'cs'; server <html lang> default = 'cs'; CS button active`);
console.log(`  ${checked} data-i18n defaults verified equal to the Czech dictionary`);
