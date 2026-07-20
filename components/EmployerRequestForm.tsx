import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../lib/i18n/react'
import { REQUEST_COPY } from '../lib/employer-request/copy'
import {
  REQUEST_GROUPS,
  fieldsInGroup,
  type RequestField,
  type RequestValues,
} from '../lib/employer-request/schema'
import { isValid, orderedErrorNames, type ValidationErrors } from '../lib/employer-request/validate'
import { activeLeadTransport, type PreparedLead } from '../lib/leads-lite/transport'
import { captureAttribution, isCtaSource, type Attribution } from '../lib/attribution'

// Employer staffing-request form — Phase E Lite (zero backend).
//
// The form PREPARES a structured email and hands it to the user's own mail
// client. It cannot know whether anything was sent, so no state, string or
// live-region message here claims delivery. After preparing, the panel shows
// the recipient, subject and full text with copy buttons, so the request can
// still be completed from Gmail/Outlook when no mail client opens.
//
// Privacy model, enforced by tests and scripts/security-check.js:
//   - values live ONLY in React state and the mailto: the user sends;
//   - there is NO fetch / XMLHttpRequest / sendBeacon and no backend at all;
//   - nothing is written to localStorage, cookies, IndexedDB, the URL or
//     history; the lead reference is not persisted either;
//   - attribution is allowlisted upstream and appears only in the prepared
//     email, never in analytics.
//
// Accessibility: real <label> per control (never placeholder-only), an error
// summary that receives focus, per-field aria-invalid + aria-describedby, and
// an aria-live status region announcing the prepared state.

type Status = 'idle' | 'error' | 'prepared'
type CopyKey = 'email' | 'subject' | 'request'

export default function EmployerRequestForm() {
  const lang = useLang()
  const copy = REQUEST_COPY[lang]

  const [values, setValues] = useState<RequestValues>({})
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [prepared, setPrepared] = useState<PreparedLead | null>(null)
  const [copied, setCopied] = useState<CopyKey | null>(null)
  const [attribution, setAttribution] = useState<Attribution>({})

  const summaryRef = useRef<HTMLDivElement | null>(null)
  const preparedRef = useRef<HTMLElement | null>(null)

  // Capture attribution once on mount. Reads only the non-sensitive parts of
  // location/referrer; the module drops anything not on its allowlist.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const query: Record<string, string> = {}
    params.forEach((v, k) => {
      query[k] = v
    })
    const ctaParam = params.get('source') ?? undefined
    setAttribution(
      captureAttribution({
        landingRoute: window.location.pathname,
        currentRoute: window.location.pathname,
        referrer: document.referrer,
        query,
        ctaSource: isCtaSource(ctaParam) ? ctaParam : 'direct',
        language: lang,
        startedAt: new Date().toISOString(),
      }),
    )
  }, [lang])

  const setField = (name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!(name in prev)) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const errorList = useMemo(() => orderedErrorNames(errors), [errors])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Always prevent native submission: a GET form would put every value in the
    // URL, which this feature must never do.
    e.preventDefault()

    const found = activeLeadTransport.validate(values)
    if (!isValid(found)) {
      setErrors(found)
      setStatus('error')
      window.requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    setErrors({})
    const lead = activeLeadTransport.prepare(values, { locale: lang, attribution })
    setPrepared(lead)
    setStatus('prepared')
    setCopied(null)

    // Attempt the hand-off. The result is an attempt, never a confirmation —
    // the panel stays visible either way so the user can complete it manually
    // if no mail client opened. Entered values are deliberately preserved.
    activeLeadTransport.deliver(lead)

    window.requestAnimationFrame(() => preparedRef.current?.focus())
  }

  const copyText = async (key: CopyKey, text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        // Fallback for browsers without the async clipboard API.
        const ta = document.createElement('textarea')
        ta.value = text
        ta.setAttribute('readonly', '')
        ta.style.position = 'absolute'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setCopied(key)
    } catch {
      // Copying failed (permissions / insecure context). The text stays visible
      // and selectable on screen, so it can still be copied manually.
      setCopied(null)
    }
  }

  const clearForm = () => {
    if (!window.confirm(copy.clearFormConfirm)) return
    setValues({})
    setErrors({})
    setPrepared(null)
    setStatus('idle')
    setCopied(null)
  }

  const describedBy = (f: RequestField): string | undefined => {
    const ids = [copy.hints[f.name] ? `${f.name}-hint` : '', errors[f.name] ? `${f.name}-error` : '']
      .filter(Boolean)
      .join(' ')
    return ids || undefined
  }

  const renderControl = (f: RequestField) => {
    const common = {
      id: f.name,
      name: f.name,
      required: f.required,
      'aria-invalid': errors[f.name] ? true : undefined,
      'aria-describedby': describedBy(f),
    } as const

    const value = typeof values[f.name] === 'string' ? (values[f.name] as string) : ''

    if (f.kind === 'textarea') {
      return (
        <textarea
          {...common}
          rows={4}
          maxLength={f.maxLength}
          value={value}
          onChange={(e) => setField(f.name, e.target.value)}
        />
      )
    }

    if (f.kind === 'select') {
      return (
        <select {...common} value={value} onChange={(e) => setField(f.name, e.target.value)}>
          <option value="">—</option>
          {f.options?.map((opt) => (
            <option key={opt} value={opt}>
              {copy.options[`${f.name}.${opt}`] ?? opt}
            </option>
          ))}
        </select>
      )
    }

    if (f.kind === 'checkbox') {
      return (
        <input
          {...common}
          type="checkbox"
          checked={values[f.name] === true}
          onChange={(e) => setField(f.name, e.target.checked)}
        />
      )
    }

    return (
      <input
        {...common}
        type={
          f.kind === 'number' ? 'number'
          : f.kind === 'date' ? 'date'
          : f.kind === 'email' ? 'email'
          : f.kind === 'tel' ? 'tel'
          : 'text'
        }
        inputMode={f.kind === 'number' ? 'numeric' : undefined}
        min={f.min}
        max={f.max}
        maxLength={f.maxLength}
        autoComplete={f.autoComplete}
        value={value}
        onChange={(e) => setField(f.name, e.target.value)}
      />
    )
  }

  return (
    <div className="erf" lang={lang}>
      {/* Announced without stealing focus. Wording is "prepared", never "sent". */}
      <div className="erf__status" role="status" aria-live="polite">
        {status === 'prepared' && prepared ? (
          <section
            className="erf__prepared"
            ref={preparedRef}
            tabIndex={-1}
            aria-label={copy.preparedTitle}
          >
            <h2 className="erf__prepared-title">{copy.preparedTitle}</h2>
            <p className="erf__prepared-instruction">{copy.preparedInstruction}</p>
            <p className="erf__notsent">{copy.notSentNote}</p>

            <dl className="erf__prepared-meta">
              <dt>{copy.referenceLabel}</dt>
              <dd><code>{prepared.reference}</code></dd>
              <dt>{copy.recipientLabel}</dt>
              <dd><code>{prepared.to}</code></dd>
              <dt>{copy.subjectLabel}</dt>
              <dd>{prepared.subject}</dd>
            </dl>

            <p className="erf__prepared-hint">{copy.preparedFallbackHint}</p>

            <div className="erf__copy-actions">
              <button type="button" className="btn btn-ghost" onClick={() => copyText('email', prepared.to)}>
                {copy.copyEmail}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => copyText('subject', prepared.subject)}>
                {copy.copySubject}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => copyText('request', `${prepared.subject}\n\n${prepared.body}`)}
              >
                {copy.copyRequest}
              </button>
              <a href={prepared.mailtoUrl} className="btn btn-primary">
                {copy.openEmailApp}
              </a>
            </div>

            {/* Copy confirmation in its own live region so it is announced. */}
            <p className="erf__copied" role="status" aria-live="polite">
              {copied ? copy.copiedConfirm : ''}
            </p>

            <label className="erf__prepared-label" htmlFor="prepared-body">
              {copy.requestTextLabel}
            </label>
            <textarea id="prepared-body" className="erf__fallback" readOnly rows={14} value={prepared.body} />

            <div className="erf__webmail">
              <h3>{copy.webmailTitle}</h3>
              <ol>
                {copy.webmailSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}
      </div>

      {status === 'error' && errorList.length > 0 ? (
        <div className="erf__errors" ref={summaryRef} tabIndex={-1} role="alert">
          <strong>{copy.errorSummaryTitle}</strong>
          <ul>
            {errorList.map((name) => (
              <li key={name}>
                <a href={`#${name}`}>
                  {copy.labels[name]}: {copy.errors[errors[name]]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* noValidate: we own validation so messages stay localized in cs/en/de. */}
      <form className="erf__form" onSubmit={handleSubmit} noValidate>
        {REQUEST_GROUPS.map((group) => (
          <fieldset key={group} className="erf__group">
            <legend>{copy.groups[group]}</legend>
            <div className="erf__grid">
              {fieldsInGroup(group).map((f) => {
                const isCheckbox = f.kind === 'checkbox'
                return (
                  <div
                    key={f.name}
                    className={`erf__field${isCheckbox ? ' erf__field--check' : ''}${
                      f.kind === 'textarea' ? ' erf__field--wide' : ''
                    }`}
                  >
                    {isCheckbox ? (
                      <>
                        <div className="erf__check-row">
                          {renderControl(f)}
                          <label htmlFor={f.name}>
                            {f.name === 'consent' ? copy.consentLabel : copy.labels[f.name]}{' '}
                            <span className="erf__req">({copy.requiredMark})</span>
                          </label>
                        </div>
                        {f.name === 'consent' ? (
                          <p className="erf__hint" id={`${f.name}-hint`}>
                            {copy.consentDetail}
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <label htmlFor={f.name}>
                          {copy.labels[f.name]}{' '}
                          <span className={f.required ? 'erf__req' : 'erf__opt'}>
                            ({f.required ? copy.requiredMark : copy.optionalMark})
                          </span>
                        </label>
                        {renderControl(f)}
                        {copy.hints[f.name] ? (
                          <p className="erf__hint" id={`${f.name}-hint`}>
                            {copy.hints[f.name]}
                          </p>
                        ) : null}
                      </>
                    )}
                    {errors[f.name] ? (
                      <p className="erf__error" id={`${f.name}-error`}>
                        {copy.errors[errors[f.name]]}
                      </p>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </fieldset>
        ))}

        <p className="erf__privacy">{copy.noValuesNote}</p>
        <p className="erf__privacy">{copy.privacyNote}</p>

        <div className="erf__actions">
          <button type="submit" className="btn btn-primary btn-lg">
            {copy.submit}
          </button>
          <button type="button" className="btn btn-ghost" onClick={clearForm}>
            {copy.clearForm}
          </button>
        </div>
      </form>
    </div>
  )
}
