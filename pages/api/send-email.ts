import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_TO = process.env.EMAIL_TO || 'jobbohemiacz@gmail.com'
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@manpower-tnt.agency'

type Success = { success: true }
type Failure = { error: string }

function esc(s: unknown): string {
  if (typeof s !== 'string') return ''
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>')
}

function row(label: string, value: unknown) {
  return `<tr>
    <td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;white-space:nowrap;background:#f9f9f9">${label}</td>
    <td style="padding:8px 12px;border:1px solid #ddd">${esc(value as string) || '<em style="color:#999">—</em>'}</td>
  </tr>`
}

function table(rows: string) {
  return `<table style="border-collapse:collapse;width:100%;max-width:640px;font-family:sans-serif;font-size:14px">${rows}</table>`
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Success | Failure>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body
  console.log('[send-email] body:', JSON.stringify(body))

  const { type } = body

  try {
    let subject: string
    let html: string
    let replyTo: string | undefined

    // ── Agency submission ──────────────────────────────────────────
    if (type === 'agency') {
      const { agencyName, website, services, description, location, contactEmail, lookingForClients } = body

      if (!agencyName?.trim()) return res.status(400).json({ error: 'Agency name is required' })
      if (!services?.trim()) return res.status(400).json({ error: 'Services field is required' })
      if (!description?.trim() || description.trim().length < 200)
        return res.status(400).json({ error: 'Description must be at least 200 characters' })
      if (!contactEmail?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim()))
        return res.status(400).json({ error: 'Valid contact email is required' })

      subject = `New Agency Submission — ${agencyName.trim()}`
      replyTo = contactEmail.trim()
      html = `
        <h2 style="font-family:sans-serif;color:#0d1e3d">New Agency Submission</h2>
        ${table(
          row('Agency Name', agencyName) +
          row('Website', website) +
          row('Services', services) +
          row('Location', location) +
          row('Contact Email', contactEmail) +
          row('Looking for Clients', lookingForClients || 'No') +
          row('Description', description)
        )}
      `

    // ── Client offer ───────────────────────────────────────────────
    } else if (type === 'offer') {
      const { companyName, website, request, budget, timeline, contactEmail, needAgencyTeam } = body

      if (!companyName?.trim()) return res.status(400).json({ error: 'Company name is required' })
      if (!request?.trim()) return res.status(400).json({ error: 'Please describe what you need' })
      if (!contactEmail?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim()))
        return res.status(400).json({ error: 'Valid contact email is required' })

      subject = `New Client Offer — ${companyName.trim()}`
      replyTo = contactEmail.trim()
      html = `
        <h2 style="font-family:sans-serif;color:#0d1e3d">New Client Offer</h2>
        ${table(
          row('Company', companyName) +
          row('Website', website) +
          row('Contact Email', contactEmail) +
          row('Budget', budget) +
          row('Timeline', timeline) +
          row('Needs Agency Team', needAgencyTeam || 'No') +
          row('Requirement', request)
        )}
      `

    // ── Contact form ───────────────────────────────────────────────
    } else if (type === 'contact') {
      const { name, company, email, phone, service, message } = body

      if (!name?.trim()) return res.status(400).json({ error: 'Name is required' })
      if (!company?.trim()) return res.status(400).json({ error: 'Company is required' })
      if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
        return res.status(400).json({ error: 'Valid email is required' })
      if (!message?.trim()) return res.status(400).json({ error: 'Message is required' })

      subject = `New Contact — ${name.trim()} @ ${company.trim()}`
      replyTo = email.trim()
      html = `
        <h2 style="font-family:sans-serif;color:#0d1e3d">New Contact Form Submission</h2>
        ${table(
          row('Name', name) +
          row('Company', company) +
          row('Email', email) +
          row('Phone', phone) +
          row('Service', service) +
          row('Message', message)
        )}
      `

    } else {
      return res.status(400).json({ error: 'Unknown form type' })
    }

    const { error } = await resend.emails.send({
      from: `TNT Agency <${EMAIL_FROM}>`,
      to: [EMAIL_TO],
      replyTo,
      subject,
      html,
    })

    if (error) {
      console.error('[send-email] Resend error:', error)
      return res.status(500).json({ error: 'Failed to send email. Please try again.' })
    }

    console.log('[send-email] sent OK — subject:', subject)
    return res.status(200).json({ success: true })

  } catch (err) {
    console.error('[send-email] unexpected error:', err)
    return res.status(500).json({ error: 'Internal server error. Please try again.' })
  }
}
