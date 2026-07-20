# Lead architecture — current state and rationale

**Status:** current architecture (Phase E Lite)
**Supersedes:** the Supabase-based design explored on `feat/lead-operations-platform`

---

## 1. What the system actually is today

```
Employer's browser
  └─ static Next.js page (server-rendered, no client data fetching)
      └─ request form (client-side validation)
          └─ structured mailto: built in the browser
              └─ employer's own mail client / webmail
                  └─ TNT agency s.r.o. business inbox
```

Concretely:

- **static website** — Netlify-compatible, no runtime backend
- **client-side form validation** — localized cs/en/de
- **structured mailto request** — the only transport
- **no database**
- **no Supabase**
- **no authentication**
- **no server-side API** (there is no `pages/api` route in this architecture)
- **no automatic email sending** — the employer sends the message themselves
- **no online employer workspace**
- **no online operator workspace**

Lead handling happens in email, following
[`lead-operations.md`](./lead-operations.md).

## 2. Why — the economic rationale

Persistent backend infrastructure is **deferred until real lead volume justifies
its operating and maintenance cost.**

A database-backed lead platform is not merely a one-off build. It carries
ongoing cost that recurs whether or not any leads arrive:

- hosting and database plan, backups, and their growth over time
- authentication, session and password-reset flows to keep working and secure
- row-level security policies to maintain and re-verify on every schema change
- migrations to write, review, apply and roll back
- a transactional email provider, its credentials, deliverability and bounces
- dependency and security updates across the whole backend surface
- an audit and retention story that must be kept truthful as the schema evolves

At low lead volume this cost buys very little: a person reading an inbox handles
the same work reliably, with a fraction of the moving parts and no standing
security surface. The email inbox is already a durable, searchable, backed-up,
access-controlled store that someone is monitoring anyway.

The decision is about **timing, not capability**. The data model for a backend
version has already been designed and reviewed; it is simply not economical to
run yet.

## 3. What we deliberately do not claim

The interface never says a request was *sent*, *received* or *submitted*,
because the browser genuinely cannot know. A mailto hand-off ends at the mail
client; whether the employer then presses send is invisible to us.

The wording used is "your email request has been prepared", followed by an
explicit statement that we have not received it yet. This is enforced by tests
and by `scripts/security-check.js`, so it cannot regress into a false
confirmation.

## 4. Future-ready seam

`lib/leads-lite/transport.ts` defines a small interface:

```ts
interface LeadTransport {
  validate(values)         // → field errors
  prepare(values, ctx)     // → { reference, to, subject, body, mailtoUrl }
  deliver(prepared)        // → { attempted, unsupported }   never "sent"
}
```

The only implementation is `MailtoLeadTransport`, and it is the only active
transport. Deliberately **not** implemented (they would be speculative
complexity today):

- `NetlifyFunctionLeadTransport`
- `EmailApiLeadTransport`
- `DatabaseLeadTransport`

The seam exists so a backend can be introduced without touching the form, the
field schema or the cs/en/de copy — those are already shared and would be reused
unchanged.

Note that `deliver()` returning an *attempt* rather than a confirmation is not a
limitation of the mailto implementation alone; it is the honest contract. A
future transport that can genuinely confirm receipt may extend the result type,
and only then may the interface start claiming delivery.

## 5. When to reconsider a backend

These are **signals to re-evaluate**, not thresholds. Deliberately no universal
lead-count figure is given — the right number depends on margin per placement,
how many people are handling the inbox, and how much of the work is repeat
business.

Re-evaluate when several of these hold at once:

- lead volume is consistent rather than sporadic, and inbox triage has become a
  daily task rather than an occasional one
- more than one operator handles leads, and ownership or double-replies become a
  real problem
- status tracking is genuinely needed because leads are being lost or forgotten
  in the inbox
- proposals are exchanged and revised frequently enough that version history in
  email threads is no longer reliable
- manual inbox handling is measurably slower than the alternative, not merely
  less elegant
- audit and retention requirements exceed what an email workflow can evidence —
  for example a client or regulator asking for a demonstrable access log
- employers actively ask for self-service visibility into their requests
- reporting is needed across leads (conversion, sources, regions) that cannot be
  answered by searching the inbox

Until then, the honest answer is that email is sufficient and cheaper.

## 6. If a backend is later approved

The prior Supabase design remains on the unmerged, superseded branch
`feat/lead-operations-platform` (final commit `c8ff38d`). It contains a reviewed
schema, lifecycle model, RLS policies and a guarded intake function. It is
**reference material only** — it is not part of this architecture, its
migrations are not applied by any build or deployment step, and it should not be
treated as approved work.

Reintroducing it would require re-reviewing the RLS policies against a live
database, because static review of that design missed two real defects that only
appeared once the policies were actually applied.
