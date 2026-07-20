-- Phase E3 — Deterministic lead status lifecycle.
--
-- The allowed transition set lives in the database as well as in TypeScript
-- (lib/leads/status.ts) so an invalid transition is rejected even if it is
-- attempted outside the application — including by an operator using the
-- Supabase dashboard.

create table lead_status_transitions (
  from_status lead_status not null,
  to_status   lead_status not null,
  primary key (from_status, to_status)
);

insert into lead_status_transitions (from_status, to_status) values
  -- Intake
  ('new','needs_review'),
  ('new','qualified'),
  ('new','lost'),
  ('new','archived'),
  ('needs_review','qualified'),
  ('needs_review','awaiting_employer_information'),
  ('needs_review','lost'),
  ('needs_review','archived'),
  -- Qualification
  ('qualified','awaiting_employer_information'),
  ('qualified','proposal_in_preparation'),
  ('qualified','lost'),
  ('qualified','archived'),
  ('awaiting_employer_information','qualified'),
  ('awaiting_employer_information','proposal_in_preparation'),
  ('awaiting_employer_information','lost'),
  ('awaiting_employer_information','archived'),
  -- Proposal
  ('proposal_in_preparation','proposal_sent'),
  ('proposal_in_preparation','awaiting_employer_information'),
  ('proposal_in_preparation','lost'),
  ('proposal_in_preparation','archived'),
  ('proposal_sent','negotiation'),
  ('proposal_sent','won'),
  ('proposal_sent','lost'),
  ('proposal_sent','proposal_in_preparation'),
  ('proposal_sent','archived'),
  ('negotiation','proposal_in_preparation'),
  ('negotiation','won'),
  ('negotiation','lost'),
  ('negotiation','archived'),
  -- Terminal states may only be archived.
  ('won','archived'),
  ('lost','archived');

comment on table lead_status_transitions is
  'Allowed lead status transitions. Terminal states (won/lost) may only move to archived; archived is final.';

-- Reject any status change that is not in the transition table, and record
-- every accepted change in lead_status_history.
create or replace function enforce_lead_status_transition() returns trigger
language plpgsql as $$
begin
  if new.status is distinct from old.status then
    if not exists (
      select 1 from lead_status_transitions
      where from_status = old.status and to_status = new.status
    ) then
      raise exception 'Invalid lead status transition: % -> %', old.status, new.status
        using errcode = 'check_violation';
    end if;

    insert into lead_status_history (lead_id, from_status, to_status, changed_by)
    values (
      new.id,
      old.status,
      new.status,
      (select id from profiles where user_id = auth.uid())
    );

    insert into audit_events (organization_id, actor_user_id, actor_type, event_type, entity_type, entity_id, metadata)
    values (
      new.organization_id,
      auth.uid(),
      case when auth.uid() is null then 'system'::actor_kind else 'operator'::actor_kind end,
      'lead.status_changed',
      'lead',
      new.id,
      jsonb_build_object('from', old.status, 'to', new.status)
    );
  end if;
  return new;
end;
$$;

create trigger leads_enforce_status_transition
  before update of status on leads
  for each row execute function enforce_lead_status_transition();

-- Proposal versions are immutable history: a new revision is a new row.
create or replace function enforce_proposal_versioning() returns trigger
language plpgsql as $$
begin
  if new.version is distinct from old.version then
    raise exception 'Proposal version is immutable; create a new proposal row instead'
      using errcode = 'check_violation';
  end if;
  if old.status = 'sent' and new.status = 'draft' then
    raise exception 'A sent proposal cannot return to draft; supersede it instead'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

create trigger proposals_enforce_versioning
  before update on proposals
  for each row execute function enforce_proposal_versioning();
