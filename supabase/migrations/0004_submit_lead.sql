-- Phase E7 — Secure lead submission.
--
-- Anonymous clients never touch a table. The API route (pages/api/leads.ts)
-- authenticates with the service role and calls this single function, which
-- validates, generates the public reference, and writes the lead, its
-- requirements, its consent records, an audit event and the notification
-- events in one transaction.

-- Non-guessable, human-quotable reference: TP- + 6 crockford-ish chars.
create or replace function generate_public_reference() returns text
language plpgsql volatile as $$
declare
  alphabet constant text := '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  candidate text;
  i integer;
begin
  loop
    candidate := 'TP-';
    for i in 1..6 loop
      candidate := candidate || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    exit when not exists (select 1 from leads where public_reference = candidate);
  end loop;
  return candidate;
end;
$$;

/**
 * Submits a staffing request.
 *
 * `p_attribution` is an allowlisted, non-sensitive JSON object produced by
 * lib/attribution. Unknown keys are ignored here as a second line of defence,
 * so a client cannot smuggle calculator economics or extra personal data into
 * the row even if the application layer were bypassed.
 */
create or replace function submit_lead(
  p_company_name           text,
  p_contact_name           text,
  p_email                  text,
  p_phone                  text,
  p_workplace_city         text,
  p_workplace_region       text,
  p_preferred_contact      contact_method,
  p_locale                 locale_code,
  p_consent_version        text,
  p_privacy_notice_version text,
  p_consent_text_hash      text,
  p_marketing_consent      boolean,
  p_marketing_text_hash    text,
  p_requirements           jsonb,
  p_attribution            jsonb default '{}'::jsonb
) returns table (lead_id uuid, public_reference text)
language plpgsql security definer set search_path = public as $$
declare
  v_lead_id uuid;
  v_ref     text;
  v_now     timestamptz := now();
begin
  -- Server-side validation: never trust the client.
  if coalesce(btrim(p_company_name), '') = '' then
    raise exception 'company_name is required' using errcode = 'check_violation';
  end if;
  if coalesce(btrim(p_contact_name), '') = '' then
    raise exception 'contact_name is required' using errcode = 'check_violation';
  end if;
  if p_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$' then
    raise exception 'a valid email is required' using errcode = 'check_violation';
  end if;
  if coalesce(btrim(p_consent_version), '') = '' or coalesce(btrim(p_consent_text_hash), '') = '' then
    raise exception 'processing consent is required' using errcode = 'check_violation';
  end if;
  if jsonb_typeof(p_requirements) <> 'array' or jsonb_array_length(p_requirements) = 0 then
    raise exception 'at least one worker requirement is required' using errcode = 'check_violation';
  end if;

  v_ref := generate_public_reference();

  insert into leads (
    public_reference, company_name, contact_name, email, phone,
    workplace_city, workplace_region, preferred_contact, locale,
    source_route, landing_route, referrer_domain,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term, cta_source,
    consent_version, consent_timestamp, privacy_notice_version, status
  ) values (
    v_ref, btrim(p_company_name), btrim(p_contact_name), lower(btrim(p_email)), nullif(btrim(coalesce(p_phone,'')), ''),
    nullif(btrim(coalesce(p_workplace_city,'')), ''), nullif(btrim(coalesce(p_workplace_region,'')), ''),
    coalesce(p_preferred_contact, 'email'), coalesce(p_locale, 'cs'),
    -- Only allowlisted attribution keys are read.
    p_attribution ->> 'currentRoute',
    p_attribution ->> 'landingRoute',
    p_attribution ->> 'referrerDomain',
    p_attribution ->> 'utmSource',
    p_attribution ->> 'utmMedium',
    p_attribution ->> 'utmCampaign',
    p_attribution ->> 'utmContent',
    p_attribution ->> 'utmTerm',
    p_attribution ->> 'ctaSource',
    p_consent_version, v_now, p_privacy_notice_version, 'new'
  )
  returning id into v_lead_id;

  insert into worker_requirements (
    lead_id, profession, headcount, start_date, expected_duration, shift_model,
    weekly_hours, experience_requirements, language_requirements,
    accommodation_required, transport_required, ppe_expectations,
    foreign_worker_support, employment_model, budget_note, notes
  )
  select
    v_lead_id,
    r ->> 'profession',
    (r ->> 'headcount')::integer,
    nullif(r ->> 'startDate','')::date,
    nullif(r ->> 'duration','')::duration_kind,
    nullif(r ->> 'shiftModel','')::shift_model,
    nullif(r ->> 'weeklyHours','')::integer,
    nullif(r ->> 'experience',''),
    nullif(r ->> 'languages',''),
    nullif(r ->> 'accommodation','')::tri_state,
    nullif(r ->> 'transport','')::tri_state,
    nullif(r ->> 'ppe',''),
    nullif(r ->> 'foreignWorkerSupport','')::tri_state,
    coalesce(nullif(r ->> 'employmentModel','')::employment_model, 'unsure'),
    nullif(r ->> 'budget',''),
    nullif(r ->> 'notes','')
  from jsonb_array_elements(p_requirements) as r;

  -- Processing consent is mandatory; marketing consent is separate and optional.
  insert into consent_records (lead_id, consent_type, granted, policy_version, text_snapshot_hash, granted_at, source)
  values (v_lead_id, 'request_processing', true, p_consent_version, p_consent_text_hash, v_now, 'web-form');

  if p_marketing_consent is not null then
    insert into consent_records (lead_id, consent_type, granted, policy_version, text_snapshot_hash, granted_at, source)
    values (v_lead_id, 'marketing', p_marketing_consent,
            p_consent_version, coalesce(p_marketing_text_hash, p_consent_text_hash), v_now, 'web-form');
  end if;

  insert into audit_events (actor_type, event_type, entity_type, entity_id, metadata)
  values ('anonymous', 'lead.created', 'lead', v_lead_id,
          jsonb_build_object('public_reference', v_ref, 'cta_source', p_attribution ->> 'ctaSource'));

  insert into notification_events (lead_id, event_type, recipient, status)
  values
    (v_lead_id, 'lead_received_operator', 'jobbohemiacz@gmail.com', 'pending'),
    (v_lead_id, 'lead_confirmation_employer', lower(btrim(p_email)), 'pending');

  return query select v_lead_id, v_ref;
end;
$$;

-- Only the service role may call this. The browser never can.
revoke all on function submit_lead(text,text,text,text,text,text,contact_method,locale_code,text,text,text,boolean,text,jsonb,jsonb) from public, anon, authenticated;
revoke all on function generate_public_reference() from public, anon, authenticated;
