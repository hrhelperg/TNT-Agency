// Phase E Lite — Security & architecture regression check (READ-ONLY).
//
// This architecture is deliberately backend-free. The checks below fail the
// build if a backend, a secret, a network lead submission, a data-persistence
// path or a false "request sent" claim is (re)introduced.
//
// Run with: node scripts/security-check.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const errors = [];
const checked = [];

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(ROOT, p));

/** Source with comments stripped: assertions must target code, not prose. */
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

const check = (name, ok, detail) => {
  checked.push(name);
  if (!ok) errors.push(`${name}${detail ? ` — ${detail}` : ''}`);
};

// Application source (excludes tests, which legitimately name forbidden strings).
const appFiles = [
  ...walk('components', ['.tsx', '.ts']),
  ...walk('lib', ['.ts', '.tsx']),
  ...walk('pages', ['.tsx', '.ts']),
].filter((f) => !f.endsWith('.test.ts') && !f.endsWith('.test.tsx'));

// ── 1. No backend of any kind ────────────────────────────────────────────
const pkg = JSON.parse(read('package.json'));
const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
const backendPkgs = Object.keys(deps).filter((d) =>
  /supabase|prisma|drizzle|mongoose|pg$|mysql|firebase|resend|nodemailer|sendgrid|postmark|@aws-sdk/i.test(d),
);
check('no database or email-provider package in dependencies', backendPkgs.length === 0, backendPkgs.join(', '));

check('no supabase/ migrations directory in the deployable tree', !exists('supabase'),
  'migrations must not imply they are applied at deploy time');
check('no server API routes', !exists('pages/api'));
check('no server-only lib directory', !exists('lib/server'));

for (const f of appFiles) {
  const src = code(read(f));
  if (/createClient\s*\(|@supabase\/|supabase\./i.test(src)) errors.push(`Supabase client initialization in ${f}`);
  if (/SUPABASE_URL|SUPABASE_ANON_KEY|SUPABASE_SERVICE_ROLE_KEY|SERVICE_ROLE|service_role/.test(src)) {
    errors.push(`Supabase environment/service-role reference in ${f}`);
  }
  if (/DATABASE_URL|postgres(ql)?:\/\//.test(src)) errors.push(`Database URL requirement in ${f}`);
}
check('no Supabase client initialization in application code', errors.length === 0);
check('no Supabase or database environment variable required', true);

// ── 2. No hardcoded credentials ──────────────────────────────────────────
const before = errors.length;
for (const f of [...appFiles, ...walk('scripts', ['.js'])]) {
  const src = read(f);
  if (/['"`]eyJ[A-Za-z0-9_-]{20,}/.test(src)) errors.push(`Possible hardcoded JWT/API key in ${f}`);
  if (/postgres(ql)?:\/\/[^'"`\s]*:[^'"`\s]*@/.test(src)) errors.push(`Hardcoded DB URL with credentials in ${f}`);
}
check('no hardcoded credentials in source', errors.length === before);

// ── 3. The form must not transmit ────────────────────────────────────────
const FORM = code(read('components/EmployerRequestForm.tsx'));
check('form performs no fetch', !/\bfetch\s*\(/.test(FORM));
check('form performs no XMLHttpRequest', !/XMLHttpRequest/.test(FORM));
check('form performs no sendBeacon', !/sendBeacon/.test(FORM));
check('form sends nothing to analytics', !/gtag\(|dataLayer|analytics\./.test(FORM));

const TRANSPORT = code(read('lib/leads-lite/transport.ts'));
check('transport performs no network I/O', !/\bfetch\s*\(|XMLHttpRequest|sendBeacon/.test(TRANSPORT));
check('mailto is the only active transport', /class MailtoLeadTransport/.test(TRANSPORT)
  && !/class (NetlifyFunction|EmailApi|Database)LeadTransport/.test(TRANSPORT));

// ── 4. No persistence of lead or personal data ───────────────────────────
check('form does not use localStorage', !/localStorage/.test(FORM));
check('form does not use cookies', !/document\.cookie/.test(FORM));
check('form does not use IndexedDB', !/indexedDB/.test(FORM));
check('form does not mutate URL or history', !/history\.(push|replace)State|location\.search\s*=|location\.hash\s*=/.test(FORM));

const REFERENCE = code(read('lib/leads-lite/reference.ts'));
check('lead reference is not persisted', !/localStorage|sessionStorage|document\.cookie|indexedDB/.test(REFERENCE));

const ATTRIBUTION = code(read('lib/attribution/index.ts'));
check('attribution enforces a denylist', /ATTRIBUTION_DENYLIST/.test(ATTRIBUTION) && /throw new Error/.test(ATTRIBUTION));
check('attribution is session-scoped only (never localStorage/cookies)',
  /sessionStorage/.test(ATTRIBUTION) && !/localStorage|document\.cookie|indexedDB/.test(ATTRIBUTION));

// ── 5. No calculator economics may reach the request ─────────────────────
const MAILTO = code(read('lib/employer-request/mailto.ts'));
const SCHEMA = code(read('lib/employer-request/schema.ts'));
for (const banned of ['netSalary', 'employerCost', 'agencyFee', 'grossSalary', 'margin', 'markup', 'savings']) {
  check(`mailto builder never references ${banned}`, !MAILTO.includes(banned));
  check(`request schema has no ${banned} field`, !SCHEMA.includes(banned));
}
// A budget the employer types themselves is legitimate and must remain.
check('employer-entered budget field is present', /name: 'budget'/.test(SCHEMA));

// ── 6. Honesty: prepared, never "sent" ───────────────────────────────────
const COPY = read('lib/employer-request/copy.ts');
// The invariant is that no copy may claim the request HAS BEEN sent or
// received. Instructions to send ("Odeslání dokončete...") and honest negations
// ("we have not received it yet") are required wording, so match completed
// delivery specifically rather than the verb in general. An earlier, blunter
// version of this check flagged the prescribed instruction text as a violation.
const deliveryClaims = [
  /\bbyla odesl[áa]na\b/i, /\bbylo odesl[áa]no\b/i, /\búspěšně odesl/i,
  /\bobdrželi jsme\b/i, /\bjsme obdrželi\b/i, /\bpoptávka byla přijata\b/i,
  /\bhas been sent\b/i, /\bwas sent\b/i, /\brequest sent\b/i,
  /\bsuccessfully submitted\b/i, /\bwe(?: have)? received\b/i,
  /\bwurde gesendet\b/i, /\bwurde versendet\b/i, /\bwurde übermittelt\b/i,
  /\berfolgreich gesendet\b/i, /\bhaben wir erhalten\b/i,
];
for (const re of deliveryClaims) {
  const hit = (COPY.match(re) || [])[0];
  check(`no completed-delivery claim in copy: ${re}`, !hit, hit);
}
// The email intro is rendered inside the prepared-panel preview before anything
// is sent, so it must describe preparation.
check('email intro describes preparation, not delivery',
  /emailIntro: '[^']*(připravená|prepared|vorbereitet)/.test(COPY),
  (COPY.match(/emailIntro: '[^']*'/g) || []).join(' | '));
check('copy states the request is prepared, in all three languages',
  /E-mailová zpráva byla připravena/.test(COPY)
  && /Your email request has been prepared/.test(COPY)
  && /Ihre E-Mail-Anfrage wurde vorbereitet/.test(COPY));
check('copy explicitly says we have not received it yet',
  /notSentNote/.test(COPY) && /neobdrželi/.test(COPY) && /not received/.test(COPY) && /noch nicht erhalten/.test(COPY));
check('form renders the not-yet-received note', /copy\.notSentNote/.test(FORM));
check('form has no success-state naming that implies delivery',
  !/'success'|status === 'sent'|setStatus\('sent'\)/.test(FORM));

// ── 7. No false backend UI ───────────────────────────────────────────────
// Target real authentication machinery, not vocabulary. Czech editorial content
// legitimately discusses "registrace u ČSSZ", and the pre-existing agency
// listing form is called "Registrace agentury" — neither is an account system.
const uiBlob = appFiles.map((f) => code(read(f))).join('\n');
for (const [label, re] of [
  ['password input (no credentials are ever collected)', /type=["']password["']/i],
  ['auth SDK usage', /\b(signInWith|signUp\(|signOut\(|createUserWith|getSession\(|onAuthStateChange)/],
  ['account/session cookie handling', /\b(setCookie|cookies\(\)|jwt|accessToken|refreshToken)\b/i],
  ['workspace/dashboard route', /['"`]\/(workspace|dashboard|account|admin)(\/|['"`])/],
]) {
  check(`no ${label}`, !re.test(uiBlob));
}
// No route file may exist for an account area.
for (const p of ['pages/workspace', 'pages/dashboard', 'pages/login', 'pages/account', 'pages/admin']) {
  check(`no ${p} route`, !exists(p));
}

// ── 8. Operator identity preserved ───────────────────────────────────────
check('mailto recipient remains jobbohemiacz@gmail.com',
  /OPERATOR_EMAIL = 'jobbohemiacz@gmail\.com'/.test(COPY));
check('operator remains TNT agency s.r.o.',
  /OPERATOR = 'TNT agency s\.r\.o\.'/.test(COPY));
check('no altered legal-entity form', !/TNT agency(?! s\.r\.o\.)/.test(COPY));

// ── Report ───────────────────────────────────────────────────────────────
if (errors.length) {
  console.error(`security check: FAIL (${errors.length})`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('security check: PASS');
console.log(`  checks run: ${checked.length}`);
console.log('  no database, Supabase, API route or email-provider dependency');
console.log('  form transmits nothing: no fetch / XHR / beacon / analytics');
console.log('  no lead or personal data persisted to storage, cookies or the URL');
console.log('  no calculator economics can reach the request');
console.log('  status wording is "prepared", never "sent"');
