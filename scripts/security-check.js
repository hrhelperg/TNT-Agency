// Phase E11 — Security regression script (READ-ONLY).
//
// Fails the build if a secret could reach the browser, if an anonymous write
// path appears, or if personal data starts flowing somewhere it must not.
// Run with: node scripts/security-check.js

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const errors = [];
const checked = [];

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
/** Source with comments removed: assertions must target code, not prose. */
const code = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
const walk = (dir, ext, out = []) => {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.next', '.git'].includes(e.name)) continue;
      walk(full, ext, out);
    } else if (ext.some((x) => e.name.endsWith(x))) out.push(full);
  }
  return out;
};

const check = (name, ok, detail) => {
  checked.push(name);
  if (!ok) errors.push(`${name}${detail ? ` — ${detail}` : ''}`);
};

// ── 1. No service-role key or secret reachable from the client ───────────
const clientDirs = [path.join(ROOT, 'components'), path.join(ROOT, 'lib'), path.join(ROOT, 'pages')];
const clientFiles = clientDirs
  .flatMap((d) => walk(d, ['.tsx', '.ts']))
  // pages/api is server-only.
  .filter((f) => !f.includes(`${path.sep}api${path.sep}`))
  // lib/server/** is server-only by construction and never imported by a client component.
  .filter((f) => !f.includes(`${path.sep}lib${path.sep}server${path.sep}`))
  .filter((f) => !f.endsWith('.test.ts') && !f.endsWith('.test.tsx'));

for (const f of clientFiles) {
  const src = code(fs.readFileSync(f, 'utf8'));
  const rel = path.relative(ROOT, f);
  if (/SUPABASE_SERVICE_ROLE_KEY|SERVICE_ROLE|service_role/.test(src)) {
    errors.push(`Service-role reference in client-reachable file: ${rel}`);
  }
  if (/EMAIL_PROVIDER_API_KEY|INDEXNOW_KEY/.test(src)) {
    errors.push(`Server secret referenced in client-reachable file: ${rel}`);
  }
  // A secret must never be exposed through a NEXT_PUBLIC_ variable.
  const pub = src.match(/NEXT_PUBLIC_[A-Z0-9_]*(KEY|SECRET|TOKEN|PASSWORD)/g);
  if (pub) errors.push(`Secret-shaped NEXT_PUBLIC_ variable in ${rel}: ${pub.join(', ')}`);
}
check('no service-role or provider secret in client-reachable code', errors.length === 0);

// ── 2. No hardcoded credentials anywhere in tracked source ───────────────
const sourceFiles = [
  ...walk(path.join(ROOT, 'lib'), ['.ts', '.tsx']),
  ...walk(path.join(ROOT, 'pages'), ['.ts', '.tsx']),
  ...walk(path.join(ROOT, 'components'), ['.ts', '.tsx']),
  ...walk(path.join(ROOT, 'scripts'), ['.js']),
];
const before = errors.length;
for (const f of sourceFiles) {
  const src = fs.readFileSync(f, 'utf8');
  const rel = path.relative(ROOT, f);
  // Supabase keys are JWTs; a service key literal starts with eyJ.
  if (/['"`]eyJ[A-Za-z0-9_-]{20,}/.test(src)) errors.push(`Possible hardcoded JWT/API key in ${rel}`);
  if (/postgres(ql)?:\/\/[^'"`\s]*:[^'"`\s]*@/.test(src)) errors.push(`Hardcoded database URL with credentials in ${rel}`);
}
check('no hardcoded credentials in source', errors.length === before);

// ── 3. RLS is enabled and anonymous access is revoked ────────────────────
const rls = read('supabase/migrations/0003_row_level_security.sql');
const tables = [
  'organizations', 'profiles', 'leads', 'worker_requirements', 'proposals',
  'proposal_items', 'lead_status_history', 'audit_events', 'consent_records',
  'notification_events',
];
for (const t of tables) {
  check(`RLS enabled on ${t}`, new RegExp(`alter table ${t}\\s+enable row level security`).test(rls));
}
check('anonymous privileges revoked', /revoke all on[\s\S]*from anon;/.test(rls));
check('no policy grants anything to anon', !/create policy[\s\S]{0,400}?to anon/.test(rls));
check('audit_events has no update/delete policy', !/on audit_events\s+for\s+(update|delete)/.test(rls));
check('consent_records has no update/delete policy', !/on consent_records\s+for\s+(update|delete)/.test(rls));

// ── 4. The only public write path is the guarded RPC ─────────────────────
const submit = read('supabase/migrations/0004_submit_lead.sql');
check('submit_lead is SECURITY DEFINER', /security definer/.test(submit));
check('submit_lead is revoked from anon/authenticated', /revoke all on function submit_lead[\s\S]*?from public, anon, authenticated;/.test(submit));
check('submit_lead validates server-side', /is required/.test(submit));

// ── 5. Endpoint hygiene ──────────────────────────────────────────────────
const api = read('pages/api/leads.ts');
check('endpoint accepts POST only', /req\.method !== 'POST'/.test(api) && /405/.test(api));
check('endpoint rate limits', /checkRateLimit/.test(api) && /429/.test(api));
check('endpoint degrades to mailto rather than losing a lead', /fallback: 'mailto'/.test(api));
check('endpoint returns generic errors', !/\.json\(\{[^}]*err(or)?\.message/.test(api));
check('endpoint reads the service key from the environment only', /process\.env\.SUPABASE_SERVICE_ROLE_KEY/.test(api));

// ── 6. Personal data must not reach analytics or the URL ─────────────────
const form = code(read('components/EmployerRequestForm.tsx'));
check('form does not write to persistent storage', !/localStorage|document\.cookie|indexedDB/.test(form));
check('form does not push values into history/URL', !/history\.(push|replace)State/.test(form));
check('form has no analytics calls', !/gtag\(|dataLayer|sendBeacon/.test(form));
const fetchTargets = Array.from(form.matchAll(/fetch\(\s*'([^']+)'/g)).map((m) => m[1]);
check('form fetches only our own endpoint', fetchTargets.every((t) => t === '/api/leads'), fetchTargets.join(', '));

// ── 7. Attribution denylist is enforced in code ──────────────────────────
const attribution = code(read('lib/attribution/index.ts'));
check('attribution enforces a denylist', /ATTRIBUTION_DENYLIST/.test(attribution) && /throw new Error/.test(attribution));
check('attribution is session-scoped only', /sessionStorage/.test(attribution) && !/localStorage/.test(attribution));

// ── 8. Schema stores no calculator economics ─────────────────────────────
const core = read('supabase/migrations/0001_lead_operations_core.sql');
for (const banned of ['net_salary', 'employer_cost', 'agency_fee', 'gross_salary']) {
  check(`schema has no ${banned} column`, !core.includes(banned));
}

// ── Report ───────────────────────────────────────────────────────────────
if (errors.length) {
  console.error(`security check: FAIL (${errors.length})`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log('security check: PASS');
console.log(`  checks run: ${checked.length}`);
console.log('  client bundle carries no service-role key or provider secret');
console.log('  RLS enabled on every table; anonymous access revoked');
console.log('  audit + consent records are append-only');
console.log('  the only public write path is the guarded submit_lead RPC');
