-- Phase E6 — Row Level Security.
--
-- Principles enforced here:
--   * anonymous users can neither read nor write any table;
--   * employers see only their own organization's records;
--   * employers never see operator-only fields or other tenants' rows;
--   * operators have explicit, role-gated access;
--   * audit and consent rows are append-only for everyone;
--   * the service role bypasses RLS and is used only server-side (0004).

alter table organizations        enable row level security;
alter table profiles             enable row level security;
alter table leads                enable row level security;
alter table worker_requirements  enable row level security;
alter table proposals            enable row level security;
alter table proposal_items       enable row level security;
alter table lead_status_history  enable row level security;
alter table audit_events         enable row level security;
alter table consent_records      enable row level security;
alter table notification_events  enable row level security;
alter table lead_status_transitions enable row level security;

-- Force RLS even for table owners, so a misconfigured connection cannot slip past.
alter table leads               force row level security;
alter table worker_requirements force row level security;
alter table proposals           force row level security;
alter table consent_records     force row level security;
alter table audit_events        force row level security;

-- ── Helpers ──────────────────────────────────────────────────────────────
-- SECURITY DEFINER + a locked search_path so policies can read `profiles`
-- without recursing through its own RLS policy.
create or replace function current_profile_org() returns uuid
language sql stable security definer set search_path = public as $$
  select organization_id from profiles where user_id = auth.uid()
$$;

create or replace function current_profile_role() returns profile_role
language sql stable security definer set search_path = public as $$
  select role from profiles where user_id = auth.uid()
$$;

create or replace function is_operator() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(
    (select role in ('operator','operator_admin') from profiles where user_id = auth.uid()),
    false)
$$;

revoke execute on function current_profile_org()  from anon;
revoke execute on function current_profile_role() from anon;
revoke execute on function is_operator()          from anon;

-- ── Organizations ────────────────────────────────────────────────────────
create policy organizations_select_own on organizations
  for select to authenticated
  using (id = current_profile_org() or is_operator());

create policy organizations_update_own on organizations
  for update to authenticated
  using (id = current_profile_org() and current_profile_role() = 'employer_admin')
  with check (id = current_profile_org());

-- ── Profiles ─────────────────────────────────────────────────────────────
create policy profiles_select_self_or_org on profiles
  for select to authenticated
  using (user_id = auth.uid() or organization_id = current_profile_org() or is_operator());

-- A user may edit their own profile but may NOT change their role or move
-- themselves to another organization (privilege escalation guard).
create policy profiles_update_self on profiles
  for update to authenticated
  using (user_id = auth.uid())
  with check (
    user_id = auth.uid()
    and role = (select p.role from profiles p where p.user_id = auth.uid())
    and organization_id is not distinct from (select p.organization_id from profiles p where p.user_id = auth.uid())
  );

-- ── Leads ────────────────────────────────────────────────────────────────
create policy leads_select_tenant on leads
  for select to authenticated
  using (
    is_operator()
    or (organization_id is not null and organization_id = current_profile_org())
  );

-- Employers never insert leads directly; submission goes through the
-- server-side function in 0004. Operators may create a lead manually.
create policy leads_insert_operator on leads
  for insert to authenticated
  with check (is_operator());

-- Only operators change lead state. The transition trigger still applies.
create policy leads_update_operator on leads
  for update to authenticated
  using (is_operator())
  with check (is_operator());

-- ── Worker requirements ──────────────────────────────────────────────────
create policy worker_requirements_select_tenant on worker_requirements
  for select to authenticated
  using (
    exists (
      select 1 from leads l
      where l.id = worker_requirements.lead_id
        and (is_operator() or l.organization_id = current_profile_org())
    )
  );

create policy worker_requirements_write_operator on worker_requirements
  for all to authenticated
  using (is_operator())
  with check (is_operator());

-- ── Proposals ────────────────────────────────────────────────────────────
-- Employers see only proposals that have actually been sent to them, and the
-- internal_note column is additionally withheld by the employer-facing view.
create policy proposals_select_tenant on proposals
  for select to authenticated
  using (
    is_operator()
    or exists (
      select 1 from leads l
      where l.id = proposals.lead_id
        and l.organization_id = current_profile_org()
        and proposals.status in ('sent','accepted','rejected','superseded')
    )
  );

create policy proposals_write_operator on proposals
  for all to authenticated
  using (is_operator())
  with check (is_operator());

create policy proposal_items_select_tenant on proposal_items
  for select to authenticated
  using (
    exists (
      select 1 from proposals p
      join leads l on l.id = p.lead_id
      where p.id = proposal_items.proposal_id
        and (
          is_operator()
          or (l.organization_id = current_profile_org()
              and p.status in ('sent','accepted','rejected','superseded'))
        )
    )
  );

create policy proposal_items_write_operator on proposal_items
  for all to authenticated
  using (is_operator())
  with check (is_operator());

-- Employer-facing proposal view without operator-only fields.
create view employer_proposals
with (security_invoker = true) as
  select id, lead_id, version, status, currency, pricing_model, valid_until, summary, created_at, updated_at
  from proposals;

-- ── Status history: readable by the tenant, never writable by clients ─────
create policy lead_status_history_select_tenant on lead_status_history
  for select to authenticated
  using (
    exists (
      select 1 from leads l
      where l.id = lead_status_history.lead_id
        and (is_operator() or l.organization_id = current_profile_org())
    )
  );
-- No insert/update/delete policy: rows are written by the trigger (definer).

-- ── Audit events: append-only, read-restricted ───────────────────────────
create policy audit_events_select_tenant on audit_events
  for select to authenticated
  using (is_operator() or organization_id = current_profile_org());

create policy audit_events_insert_any_authenticated on audit_events
  for insert to authenticated
  with check (true);
-- Deliberately no update/delete policy anywhere: audit rows are immutable.

-- ── Consent records: append-only ─────────────────────────────────────────
create policy consent_records_select_tenant on consent_records
  for select to authenticated
  using (
    is_operator()
    or exists (
      select 1 from leads l
      where l.id = consent_records.lead_id and l.organization_id = current_profile_org()
    )
  );

create policy consent_records_insert on consent_records
  for insert to authenticated
  with check (true);
-- No update/delete policy: consent history is immutable.

-- ── Notification events: operator-only ───────────────────────────────────
create policy notification_events_operator on notification_events
  for all to authenticated
  using (is_operator())
  with check (is_operator());

-- ── Reference data ───────────────────────────────────────────────────────
create policy lead_status_transitions_read on lead_status_transitions
  for select to authenticated using (true);

-- ── Hard denial of anonymous access ──────────────────────────────────────
-- No policy above grants anything to `anon`, and RLS denies by default. Revoke
-- table privileges as well so the intent is explicit rather than implied.
revoke all on organizations, profiles, leads, worker_requirements, proposals,
  proposal_items, lead_status_history, audit_events, consent_records,
  notification_events, lead_status_transitions
  from anon;
