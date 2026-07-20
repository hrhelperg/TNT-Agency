# TalentPartnerID — documentation

## Lead handling (current architecture)

| Document | What it covers |
|---|---|
| [`architecture-lead-flow.md`](./architecture-lead-flow.md) | What the lead system is today, the economic reasoning for having no backend, the transport seam, and the signals that would justify revisiting that decision. |
| [`lead-operations.md`](./lead-operations.md) | The manual process for handling requests in the business inbox: labels, lifecycle, response times, qualification and proposal checklists, retention and deletion requests. |

**Summary of the current architecture:** static website · client-side form
validation · structured `mailto:` request · **no database** · **no Supabase** ·
**no authentication** · **no server-side API** · **no automatic email sending** ·
**no online employer workspace** · **no online operator workspace**.

Requests are prepared in the employer's browser and sent by the employer from
their own email application. The site never claims a request was sent, because
it cannot know.

## Validation tooling

```
npm run lint            # ESLint
npm run typecheck       # tsc --noEmit
npm test                # vitest (unit + content quality + security posture)
npm run build           # next build
npm run validate:i18n   # cs/en/de dictionary parity and wiring
npm run validate:sitemap# sitemap vs. filesystem route inventory
npm run security        # backend-free / privacy / honesty regression check
```
