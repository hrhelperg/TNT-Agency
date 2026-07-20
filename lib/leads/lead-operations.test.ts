import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import {
  LEAD_STATUSES,
  ALLOWED_TRANSITIONS,
  TERMINAL_STATUSES,
  canTransition,
  assertTransition,
  InvalidTransitionError,
  STATUS_LABELS,
  type LeadStatus,
} from './status'
import {
  prepareSubmission,
  hashConsentText,
  duplicateKey,
  checkRateLimit,
  createRateLimitState,
  MIN_ELAPSED_MS,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from './submission'
import {
  LoggerEmailAdapter,
  resolveAdapter,
  operatorNotification,
  employerConfirmation,
} from '../server/notifications/adapter'

const ROOT = process.cwd()
const sql = (f: string) => fs.readFileSync(path.join(ROOT, 'supabase/migrations', f), 'utf8')
const CORE = sql('0001_lead_operations_core.sql')
const LIFECYCLE = sql('0002_lead_status_lifecycle.sql')
const RLS = sql('0003_row_level_security.sql')
const SUBMIT = sql('0004_submit_lead.sql')
const API = fs.readFileSync(path.join(ROOT, 'pages/api/leads.ts'), 'utf8')

const validValues = () => ({
  companyName: 'Výrobní závod s.r.o.',
  contactName: 'Jan Novák',
  email: 'Jan.Novak@Example.CZ',
  workplaceCity: 'Pardubice',
  workplaceRegion: 'pardubicky',
  profession: 'Operátor výroby',
  headcount: '12',
  employmentModel: 'agency',
  consent: true,
})

describe('Phase E — lead status lifecycle', () => {
  it('defines all ten statuses', () => {
    expect(LEAD_STATUSES.length).toBe(10)
    expect(LEAD_STATUSES).toContain('awaiting_employer_information')
  })

  it('accepts the documented transitions and rejects everything else', () => {
    expect(canTransition('new', 'qualified')).toBe(true)
    expect(canTransition('qualified', 'proposal_in_preparation')).toBe(true)
    expect(canTransition('proposal_sent', 'won')).toBe(true)
    // Skipping the pipeline is not allowed.
    expect(canTransition('new', 'won')).toBe(false)
    expect(canTransition('new', 'proposal_sent')).toBe(false)
    expect(canTransition('qualified', 'negotiation')).toBe(false)
  })

  it('makes archived terminal and allows only archiving from won/lost', () => {
    expect(ALLOWED_TRANSITIONS.archived).toEqual([])
    expect(ALLOWED_TRANSITIONS.won).toEqual(['archived'])
    expect(ALLOWED_TRANSITIONS.lost).toEqual(['archived'])
    for (const s of TERMINAL_STATUSES) expect(LEAD_STATUSES).toContain(s)
  })

  it('never allows a status to transition to itself', () => {
    for (const s of LEAD_STATUSES) expect(ALLOWED_TRANSITIONS[s]).not.toContain(s)
  })

  it('only ever targets known statuses', () => {
    for (const from of LEAD_STATUSES) {
      for (const to of ALLOWED_TRANSITIONS[from]) expect(LEAD_STATUSES).toContain(to)
    }
  })

  it('assertTransition throws a typed error on an invalid move', () => {
    expect(() => assertTransition('new', 'won')).toThrow(InvalidTransitionError)
    expect(() => assertTransition('new', 'qualified')).not.toThrow()
  })

  it('the TypeScript model matches the SQL transition table exactly', () => {
    // Parse the INSERT ... VALUES ('a','b'), ... block from migration 0002.
    const block = LIFECYCLE.slice(
      LIFECYCLE.indexOf('insert into lead_status_transitions'),
      LIFECYCLE.indexOf('comment on table lead_status_transitions'),
    )
    const sqlPairs = new Set(
      Array.from(block.matchAll(/\('([a-z_]+)','([a-z_]+)'\)/g)).map((m) => `${m[1]}->${m[2]}`),
    )
    const tsPairs = new Set<string>()
    for (const from of LEAD_STATUSES) {
      for (const to of ALLOWED_TRANSITIONS[from]) tsPairs.add(`${from}->${to}`)
    }
    expect(sqlPairs.size).toBeGreaterThan(0)
    expect(Array.from(tsPairs).sort()).toEqual(Array.from(sqlPairs).sort())
  })

  it('every status has a label in cs/en/de', () => {
    for (const l of ['cs', 'en', 'de'] as const) {
      for (const s of LEAD_STATUSES) expect(typeof STATUS_LABELS[l][s as LeadStatus]).toBe('string')
    }
  })
})

describe('Phase E — submission preparation', () => {
  const prep = (p: Parameters<typeof prepareSubmission>[0]) =>
    prepareSubmission(p, 'consent text', 'marketing text')

  it('accepts a valid payload and builds RPC arguments', () => {
    const r = prep({ values: validValues(), elapsedMs: 10_000 })
    expect(r.kind).toBe('accepted')
    if (r.kind !== 'accepted') return
    expect(r.rpcArgs.p_company_name).toBe('Výrobní závod s.r.o.')
    // Email is normalised server-side.
    expect(r.rpcArgs.p_email).toBe('jan.novak@example.cz')
    expect((r.rpcArgs.p_requirements as unknown[]).length).toBe(1)
  })

  it('re-validates server-side and never trusts the client', () => {
    const r = prep({ values: { ...validValues(), email: 'nope' }, elapsedMs: 10_000 })
    expect(r.kind).toBe('validation')
    if (r.kind === 'validation') expect(r.errors.email).toBe('invalidEmail')
  })

  it('requires consent', () => {
    const r = prep({ values: { ...validValues(), consent: false }, elapsedMs: 10_000 })
    expect(r.kind).toBe('validation')
  })

  it('rejects the honeypot and impossibly fast submissions', () => {
    const h = prep({ values: validValues(), website: 'http://spam', elapsedMs: 10_000 })
    expect(h).toEqual({ kind: 'spam', reason: 'honeypot' })
    const f = prep({ values: validValues(), elapsedMs: MIN_ELAPSED_MS - 1 })
    expect(f).toEqual({ kind: 'spam', reason: 'too-fast' })
  })

  it('marketing consent is separate, optional and defaults to false', () => {
    const without = prep({ values: validValues(), elapsedMs: 10_000 })
    const with_ = prep({ values: validValues(), marketingConsent: true, elapsedMs: 10_000 })
    expect(without.kind).toBe('accepted')
    if (without.kind === 'accepted') expect(without.rpcArgs.p_marketing_consent).toBe(false)
    if (with_.kind === 'accepted') expect(with_.rpcArgs.p_marketing_consent).toBe(true)
    // Missing marketing consent must never block the staffing request.
    expect(with_.kind).toBe('accepted')
  })

  it('re-sanitises attribution to the allowlist, dropping anything else', () => {
    const r = prep({
      values: validValues(),
      elapsedMs: 10_000,
      attribution: { ctaSource: 'agency-comparison', utmSource: 'google', somethingElse: 'x' },
    })
    if (r.kind !== 'accepted') throw new Error('expected accepted')
    const attr = r.rpcArgs.p_attribution as Record<string, unknown>
    expect(attr.ctaSource).toBe('agency-comparison')
    expect(attr).not.toHaveProperty('somethingElse')
  })

  it('throws rather than storing a denylisted (sensitive) attribution key', () => {
    expect(() =>
      prep({ values: validValues(), elapsedMs: 10_000, attribution: { employerCost: '42816' } }),
    ).toThrow(/denylist/i)
  })

  it('carries no calculator economics into the RPC arguments', () => {
    const r = prep({ values: validValues(), elapsedMs: 10_000 })
    if (r.kind !== 'accepted') throw new Error('expected accepted')
    const blob = JSON.stringify(r.rpcArgs)
    for (const leak of ['26058', '42816', 'employerCost', 'netSalary', 'agencyFee']) {
      expect(blob).not.toContain(leak)
    }
  })

  it('hashes consent text deterministically and irreversibly', () => {
    const a = hashConsentText('I agree to processing')
    expect(a).toBe(hashConsentText('I agree to processing'))
    expect(a).not.toBe(hashConsentText('I agree to processing.'))
    expect(a).not.toContain('agree')
  })

  it('detects duplicates by requester, role, city and day', () => {
    const k1 = duplicateKey(validValues(), '2026-07-20')
    const k2 = duplicateKey({ ...validValues(), email: 'JAN.NOVAK@EXAMPLE.CZ' }, '2026-07-20')
    const k3 = duplicateKey(validValues(), '2026-07-21')
    expect(k1).toBe(k2)
    expect(k1).not.toBe(k3)
  })
})

describe('Phase E — rate limiting', () => {
  it('allows a burst up to the limit then blocks within the window', () => {
    const s = createRateLimitState()
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      expect(checkRateLimit(s, 'ip', 1000).allowed, `hit ${i + 1}`).toBe(true)
    }
    expect(checkRateLimit(s, 'ip', 1000).allowed).toBe(false)
  })

  it('resets after the window elapses', () => {
    const s = createRateLimitState()
    for (let i = 0; i < RATE_LIMIT_MAX + 2; i++) checkRateLimit(s, 'ip', 1000)
    expect(checkRateLimit(s, 'ip', 1000 + RATE_LIMIT_WINDOW_MS).allowed).toBe(true)
  })

  it('limits per key, so one abuser cannot block everyone', () => {
    const s = createRateLimitState()
    for (let i = 0; i < RATE_LIMIT_MAX + 2; i++) checkRateLimit(s, 'abuser', 1000)
    expect(checkRateLimit(s, 'someone-else', 1000).allowed).toBe(true)
  })
})

describe('Phase E — email adapter', () => {
  it('falls back to the safe logger when no credentials are configured', () => {
    const a = resolveAdapter({ ...process.env, EMAIL_PROVIDER_ENDPOINT: '', EMAIL_PROVIDER_API_KEY: '', EMAIL_FROM_ADDRESS: '' })
    expect(a.name).toBe('logger')
  })

  it('uses the HTTP provider when fully configured', () => {
    const a = resolveAdapter({
      ...process.env,
      EMAIL_PROVIDER_ENDPOINT: 'https://example.test/send',
      EMAIL_PROVIDER_API_KEY: 'k',
      EMAIL_FROM_ADDRESS: 'no-reply@example.test',
    })
    expect(a.name).toBe('http')
  })

  it('the logger never sends and reports suppression honestly', async () => {
    const a = new LoggerEmailAdapter()
    const r = await a.send({ to: 'x@y.cz', subject: 's', text: 't' })
    expect(r.ok).toBe(true)
    expect(r.suppressed).toBe(true)
    expect(a.sent.length).toBe(1)
  })

  it('operator notification carries the reference and routing facts', () => {
    const m = operatorNotification({
      publicReference: 'TP-ABC234',
      companyName: 'Firma',
      profession: 'Skladník',
      headcount: 5,
      city: 'Pardubice',
    })
    expect(m.to).toBe('jobbohemiacz@gmail.com')
    expect(m.subject).toContain('TP-ABC234')
    expect(m.text).toContain('Skladník')
  })

  it('employer confirmation is localized, promises nothing and preserves the operator', () => {
    for (const [l, marker] of [['cs', 'nelze zaručit'], ['en', 'cannot be guaranteed'], ['de', 'nicht im Voraus garantiert']] as const) {
      const m = employerConfirmation('a@b.cz', 'TP-ABC234', 'Jan', l)
      expect(m.subject).toContain('TP-ABC234')
      expect(m.text).toContain(marker)
      expect(m.text).toContain('TNT agency s.r.o.')
      expect(m.text).toContain('jobbohemiacz@gmail.com')
    }
  })

  it('confirmation states it is not an order confirmation', () => {
    expect(employerConfirmation('a@b.cz', 'R', 'J', 'cs').text).toMatch(/nikoli nabídkou ani potvrzením objednávky/)
    expect(employerConfirmation('a@b.cz', 'R', 'J', 'en').text).toMatch(/not a proposal or an order confirmation/)
  })
})

describe('Phase E — migration and endpoint security posture', () => {
  it('enables RLS on every data table and forces it on the sensitive ones', () => {
    for (const t of [
      'organizations', 'profiles', 'leads', 'worker_requirements', 'proposals',
      'proposal_items', 'lead_status_history', 'audit_events', 'consent_records',
      'notification_events',
    ]) {
      expect(RLS, `${t} RLS`).toContain(`alter table ${t}`)
    }
    expect(RLS).toContain('force row level security')
  })

  it('grants anonymous users nothing', () => {
    expect(RLS).toMatch(/revoke all on[\s\S]*from anon;/)
    // No policy may target the anon role.
    expect(RLS).not.toMatch(/create policy[\s\S]*?for .*to anon/)
  })

  it('makes audit and consent records append-only', () => {
    // Insert and select policies exist, but no update/delete policy anywhere.
    expect(RLS).toContain('audit_events_insert_any_authenticated')
    expect(RLS).toContain('consent_records_insert')
    expect(RLS).not.toMatch(/create policy \w*audit\w* on audit_events\s+for (update|delete)/)
    expect(RLS).not.toMatch(/create policy \w*consent\w* on consent_records\s+for (update|delete)/)
  })

  it('withholds operator-only proposal fields from employers', () => {
    expect(CORE).toContain('internal_note')
    expect(RLS).toContain('create view employer_proposals')
    // The employer view must not select the internal note.
    const view = RLS.slice(RLS.indexOf('create view employer_proposals'), RLS.indexOf('-- ── Status history'))
    expect(view).not.toContain('internal_note')
  })

  it('lets employers see only sent proposals from their own organization', () => {
    expect(RLS).toContain("proposals.status in ('sent','accepted','rejected','superseded')")
    expect(RLS).toContain('l.organization_id = current_profile_org()')
  })

  it('blocks employers from escalating their own role or switching organization', () => {
    const policy = RLS.slice(RLS.indexOf('profiles_update_self'), RLS.indexOf('-- ── Leads'))
    expect(policy).toContain('role = (select p.role from profiles p where p.user_id = auth.uid())')
    expect(policy).toContain('organization_id is not distinct from')
  })

  it('restricts lead writes to operators; the public path is the RPC only', () => {
    expect(RLS).toContain('create policy leads_insert_operator')
    expect(RLS).toContain('with check (is_operator())')
    expect(SUBMIT).toContain('security definer')
    expect(SUBMIT).toMatch(/revoke all on function submit_lead[\s\S]*from public, anon, authenticated;/)
  })

  it('enforces the status lifecycle in the database, not only the client', () => {
    expect(LIFECYCLE).toContain('Invalid lead status transition')
    expect(LIFECYCLE).toContain('create trigger leads_enforce_status_transition')
    expect(LIFECYCLE).toContain('insert into lead_status_history')
    expect(LIFECYCLE).toContain('insert into audit_events')
  })

  it('keeps proposal versions immutable', () => {
    expect(LIFECYCLE).toContain('Proposal version is immutable')
    expect(CORE).toContain('unique (lead_id, version)')
  })

  it('validates the submission server-side inside the RPC', () => {
    expect(SUBMIT).toContain('company_name is required')
    expect(SUBMIT).toContain('a valid email is required')
    expect(SUBMIT).toContain('processing consent is required')
  })

  it('records processing consent as mandatory and marketing consent separately', () => {
    expect(SUBMIT).toContain("'request_processing'")
    expect(SUBMIT).toContain("'marketing'")
  })

  it('stores no calculator economics anywhere in the schema', () => {
    for (const banned of ['net_salary', 'employer_cost', 'agency_fee', 'gross_salary', 'margin']) {
      expect(CORE, `${banned} must not be a column`).not.toContain(banned)
    }
    // The only money-ish field is the employer's own typed budget note.
    expect(CORE).toContain('budget_note')
  })

  it('never exposes the service-role key to the browser', () => {
    // Server-only env names (no NEXT_PUBLIC_ prefix) and no client import.
    expect(API).toContain('process.env.SUPABASE_SERVICE_ROLE_KEY')
    expect(API).not.toContain('NEXT_PUBLIC_SUPABASE_SERVICE')
    const clientFiles = ['components/EmployerRequestForm.tsx', 'components/EmployerCta.tsx']
    for (const f of clientFiles) {
      const src = fs.readFileSync(path.join(ROOT, f), 'utf8')
      expect(src, `${f} must not reference service role`).not.toContain('SERVICE_ROLE')
    }
  })

  it('falls back to mailto instead of dropping a lead when unavailable', () => {
    expect(API).toContain("fallback: 'mailto'")
    expect(API).toContain('submission_unavailable')
    expect(API).toContain('rate_limited')
  })

  it('returns generic errors that cannot be used to probe for existing records', () => {
    expect(API).toContain("error: 'submission_failed'")
    // The endpoint must not echo provider/database detail to the caller.
    expect(API).not.toMatch(/res\.status\(\d+\)\.json\(\{[^}]*err(or)?\.message/)
  })

  it('only accepts POST', () => {
    expect(API).toContain("req.method !== 'POST'")
    expect(API).toContain('405')
  })
})
