-- Phase E2 — Lead operations core schema.
--
-- Design rules:
--   * Every table lives in `public` but is RLS-protected (see 0003).
--   * No anonymous write reaches a table directly; the public path is the
--     server-side submission function in 0004, executed with the service role.
--   * Calculator economics are NOT stored. `budget_note` exists only because the
--     employer may type a budget themselves as part of a business request.
--   * Consent and audit rows are append-only (enforced in 0003).

create extension if not exists "pgcrypto";

-- ── Enums ────────────────────────────────────────────────────────────────
create type lead_status as enum (
  'new',
  'needs_review',
  'qualified',
  'awaiting_employer_information',
  'proposal_in_preparation',
  'proposal_sent',
  'negotiation',
  'won',
  'lost',
  'archived'
);

create type proposal_status as enum ('draft', 'sent', 'accepted', 'rejected', 'superseded', 'withdrawn');
create type employment_model as enum ('agency', 'recruitment', 'unsure');
create type shift_model as enum ('single', 'two-shift', 'three-shift', 'continuous', 'flexible', 'unsure');
create type duration_kind as enum ('short-term', 'seasonal', 'long-term', 'permanent', 'unsure');
create type tri_state as enum ('yes', 'no', 'unsure');
create type contact_method as enum ('email', 'phone', 'either');
create type profile_role as enum ('employer_admin', 'employer_member', 'operator', 'operator_admin');
create type actor_kind as enum ('employer', 'operator', 'system', 'anonymous');
create type consent_kind as enum ('request_processing', 'marketing');
create type notification_kind as enum (
  'lead_received_operator',
  'lead_confirmation_employer',
  'information_requested',
  'proposal_ready',
  'proposal_updated',
  'request_closed'
);
create type notification_state as enum ('pending', 'sent', 'failed', 'suppressed');
create type locale_code as enum ('cs', 'en', 'de');

-- ── Organizations ────────────────────────────────────────────────────────
create table organizations (
  id                          uuid primary key default gen_random_uuid(),
  legal_name                  text not null check (length(btrim(legal_name)) > 0),
  display_name                text,
  company_registration_number text,          -- IČO
  vat_number                  text,          -- DIČ, optional
  website                     text,
  address                     text,
  city                        text,
  region                      text,
  country                     text not null default 'CZ',
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);
comment on table organizations is 'Employer companies. One organization owns many profiles and leads.';

-- ── Profiles (one per auth user) ─────────────────────────────────────────
create table profiles (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null unique references auth.users (id) on delete cascade,
  organization_id uuid references organizations (id) on delete set null,
  name            text,
  email           text not null,
  phone           text,
  role            profile_role not null default 'employer_member',
  locale          locale_code not null default 'cs',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
-- An operator is never scoped to an employer organization.
alter table profiles add constraint operator_has_no_org
  check (role in ('employer_admin','employer_member') or organization_id is null);
create index profiles_organization_id_idx on profiles (organization_id);

-- ── Leads ────────────────────────────────────────────────────────────────
create table leads (
  id                    uuid primary key default gen_random_uuid(),
  -- Short, non-guessable, human-quotable reference (e.g. TP-7F3K2Q).
  public_reference      text not null unique,
  organization_id       uuid references organizations (id) on delete set null,

  company_name          text not null check (length(btrim(company_name)) > 0),
  contact_name          text not null check (length(btrim(contact_name)) > 0),
  email                 text not null check (position('@' in email) > 1),
  phone                 text,
  workplace_city        text,
  workplace_region      text,
  preferred_contact     contact_method not null default 'email',

  -- Attribution: allowlisted, non-sensitive fields only (mirrors lib/attribution).
  source_route          text,
  landing_route         text,
  referrer_domain       text,
  utm_source            text,
  utm_medium            text,
  utm_campaign          text,
  utm_content           text,
  utm_term              text,
  cta_source            text,
  locale                locale_code not null default 'cs',

  consent_version       text not null,
  consent_timestamp     timestamptz not null,
  privacy_notice_version text not null,

  status                lead_status not null default 'new',
  assigned_to           uuid references profiles (id) on delete set null,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);
create index leads_status_idx on leads (status);
create index leads_organization_id_idx on leads (organization_id);
create index leads_created_at_idx on leads (created_at desc);

-- Defence in depth: the columns we refuse to collect must not be addable by
-- accident. Any calculator economics belong in the browser only.
comment on table leads is
  'Employer staffing requests. Never stores calculator values (gross/net/employer cost/agency fee); budget is captured on worker_requirements only when the employer types it.';

-- ── Worker requirements (1:1..n with a lead) ─────────────────────────────
create table worker_requirements (
  id                      uuid primary key default gen_random_uuid(),
  lead_id                 uuid not null references leads (id) on delete cascade,
  profession              text not null check (length(btrim(profession)) > 0),
  headcount               integer not null check (headcount between 1 and 5000),
  start_date              date,
  expected_duration       duration_kind,
  shift_model             shift_model,
  weekly_hours            integer check (weekly_hours between 1 and 60),
  experience_requirements text,
  language_requirements   text,
  accommodation_required  tri_state,
  transport_required      tri_state,
  ppe_expectations        text,
  foreign_worker_support  tri_state,
  employment_model        employment_model not null default 'unsure',
  -- Free text on purpose: the employer's own words, never a computed figure.
  budget_note             text,
  notes                   text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);
create index worker_requirements_lead_id_idx on worker_requirements (lead_id);

-- ── Proposals ────────────────────────────────────────────────────────────
create table proposals (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid not null references leads (id) on delete cascade,
  version       integer not null check (version >= 1),
  status        proposal_status not null default 'draft',
  currency      text not null default 'CZK',
  pricing_model text,
  valid_until   date,
  summary       text,
  -- Operator-only working notes; never exposed to employer reads (see 0003).
  internal_note text,
  created_by    uuid references profiles (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (lead_id, version)
);
create index proposals_lead_id_idx on proposals (lead_id);

create table proposal_items (
  id               uuid primary key default gen_random_uuid(),
  proposal_id      uuid not null references proposals (id) on delete cascade,
  item_type        text not null,
  description      text not null,
  quantity         numeric(12,2),
  unit             text,
  unit_price       numeric(12,2),
  total            numeric(14,2),
  recurring_period text,
  assumptions      text,
  created_at       timestamptz not null default now()
);
create index proposal_items_proposal_id_idx on proposal_items (proposal_id);

-- ── Lead status history ──────────────────────────────────────────────────
create table lead_status_history (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references leads (id) on delete cascade,
  from_status lead_status,
  to_status   lead_status not null,
  changed_by  uuid references profiles (id) on delete set null,
  reason      text,
  created_at  timestamptz not null default now()
);
create index lead_status_history_lead_id_idx on lead_status_history (lead_id, created_at desc);

-- ── Audit events (append-only) ───────────────────────────────────────────
create table audit_events (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations (id) on delete set null,
  actor_user_id   uuid references auth.users (id) on delete set null,
  actor_type      actor_kind not null,
  event_type      text not null,
  entity_type     text not null,
  entity_id       uuid,
  -- Structured, minimal context. Never raw secrets or copies of free text.
  metadata        jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);
create index audit_events_entity_idx on audit_events (entity_type, entity_id, created_at desc);
create index audit_events_org_idx on audit_events (organization_id, created_at desc);

-- ── Consent records (append-only) ────────────────────────────────────────
create table consent_records (
  id                 uuid primary key default gen_random_uuid(),
  lead_id            uuid references leads (id) on delete cascade,
  consent_type       consent_kind not null,
  granted            boolean not null,
  policy_version     text not null,
  -- Hash of the exact text shown, so we can prove what was agreed to without
  -- storing another copy of it.
  text_snapshot_hash text not null,
  granted_at         timestamptz not null default now(),
  source             text,
  created_at         timestamptz not null default now()
);
create index consent_records_lead_id_idx on consent_records (lead_id);

-- ── Notification events ──────────────────────────────────────────────────
create table notification_events (
  id                 uuid primary key default gen_random_uuid(),
  lead_id            uuid references leads (id) on delete cascade,
  event_type         notification_kind not null,
  recipient          text not null,
  status             notification_state not null default 'pending',
  provider           text,
  provider_reference text,
  attempt_count      integer not null default 0 check (attempt_count >= 0),
  last_error         text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);
create index notification_events_lead_idx on notification_events (lead_id, created_at desc);
create index notification_events_status_idx on notification_events (status) where status = 'pending';

-- ── updated_at maintenance ───────────────────────────────────────────────
create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array[
    'organizations','profiles','leads','worker_requirements','proposals','notification_events'
  ] loop
    execute format(
      'create trigger %I_set_updated_at before update on %I
         for each row execute function set_updated_at()', t, t);
  end loop;
end $$;
