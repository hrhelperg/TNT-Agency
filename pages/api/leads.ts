import type { NextApiRequest, NextApiResponse } from 'next'
import {
  prepareSubmission,
  checkRateLimit,
  createRateLimitState,
  duplicateKey,
  type SubmissionPayload,
} from '../../lib/leads/submission'
import { REQUEST_COPY } from '../../lib/employer-request/copy'
import {
  resolveAdapter,
  operatorNotification,
  employerConfirmation,
} from '../../lib/server/notifications/adapter'

// Phase E7 — Secure lead submission endpoint.
//
// Security posture:
//   * the service-role key is read from the environment and never leaves the
//     server; it is not referenced by any client bundle;
//   * the browser never talks to Supabase directly — it calls this route, which
//     calls the submit_lead RPC (the only public write path);
//   * validation runs again here regardless of what the client did;
//   * errors are generic to the caller and detailed only in server logs, so the
//     endpoint cannot be used to probe whether an address already exists.
//
// If Supabase is not configured the route returns 503 with `fallback: 'mailto'`,
// and the form falls back to the Phase C mailto flow rather than dropping the
// lead.

const rateLimitState = createRateLimitState()

const clientKey = (req: NextApiRequest): string => {
  const fwd = req.headers['x-forwarded-for']
  const ip = Array.isArray(fwd) ? fwd[0] : (fwd ?? '').split(',')[0].trim()
  return ip || req.socket.remoteAddress || 'unknown'
}

/** Recent duplicates, keyed by requester+role+day. Bounded to avoid growth. */
const recentSubmissions = new Map<string, number>()
const DUPLICATE_WINDOW_MS = 60 * 60 * 1000

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    // Not an error the visitor caused: tell the client to use the mailto path.
    return res.status(503).json({ error: 'submission_unavailable', fallback: 'mailto' })
  }

  const now = Date.now()
  const limit = checkRateLimit(rateLimitState, clientKey(req), now)
  if (!limit.allowed) {
    return res.status(429).json({ error: 'rate_limited', fallback: 'mailto' })
  }

  const payload = req.body as SubmissionPayload
  if (!payload || typeof payload !== 'object' || !payload.values) {
    return res.status(400).json({ error: 'invalid_payload' })
  }

  const locale = (['cs', 'en', 'de'] as const).includes(payload.values.locale as never)
    ? (payload.values.locale as 'cs' | 'en' | 'de')
    : 'cs'
  const copy = REQUEST_COPY[locale]

  const prepared = prepareSubmission(payload, copy.consentLabel, copy.consentDetail)

  if (prepared.kind === 'validation') {
    return res.status(422).json({ error: 'validation_failed', fields: prepared.errors })
  }
  if (prepared.kind === 'spam') {
    // Do not tell a bot which control tripped; accept-and-drop keeps it quiet
    // while a legitimate user would never reach this branch.
    console.warn(`[leads] rejected submission: ${prepared.reason}`)
    return res.status(202).json({ status: 'received' })
  }

  // Duplicate detection: same requester, role and city within the hour.
  const day = new Date(now).toISOString().slice(0, 10)
  const dupKey = duplicateKey(payload.values, day)
  const seenAt = recentSubmissions.get(dupKey)
  if (seenAt && now - seenAt < DUPLICATE_WINDOW_MS) {
    // Idempotent from the caller's perspective — never a hard error, because a
    // real employer double-clicking must not see a failure.
    return res.status(200).json({ status: 'duplicate' })
  }

  try {
    const rpc = await fetch(`${url}/rest/v1/rpc/submit_lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify(prepared.rpcArgs),
    })

    if (!rpc.ok) {
      console.error(`[leads] submit_lead failed: HTTP ${rpc.status}`)
      return res.status(502).json({ error: 'submission_failed', fallback: 'mailto' })
    }

    const rows = (await rpc.json()) as Array<{ lead_id: string; public_reference: string }>
    const created = Array.isArray(rows) ? rows[0] : undefined
    if (!created?.public_reference) {
      return res.status(502).json({ error: 'submission_failed', fallback: 'mailto' })
    }

    recentSubmissions.set(dupKey, now)
    if (recentSubmissions.size > 5000) recentSubmissions.clear()

    // Notifications are best-effort: a delivery problem must never lose a lead
    // that is already stored, and the notification_events rows record the state.
    const mailer = resolveAdapter()
    const values = payload.values
    await Promise.allSettled([
      mailer.send(
        operatorNotification({
          publicReference: created.public_reference,
          companyName: String(values.companyName ?? ''),
          profession: String(values.profession ?? ''),
          headcount: Number(values.headcount ?? 0),
          city: values.workplaceCity ? String(values.workplaceCity) : undefined,
          ctaSource: (payload.attribution?.ctaSource as string) ?? undefined,
        }),
      ),
      mailer.send(
        employerConfirmation(
          String(values.email ?? ''),
          created.public_reference,
          String(values.contactName ?? ''),
          locale,
        ),
      ),
    ])

    return res.status(201).json({ status: 'created', reference: created.public_reference })
  } catch (err) {
    console.error('[leads] submission error', err instanceof Error ? err.message : err)
    return res.status(502).json({ error: 'submission_failed', fallback: 'mailto' })
  }
}
