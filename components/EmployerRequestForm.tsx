import { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../lib/i18n/react'
import { REQUEST_COPY, OPERATOR_EMAIL } from '../lib/employer-request/copy'
import {
  REQUEST_GROUPS,
  fieldsInGroup,
  type RequestField,
  type RequestValues,
} from '../lib/employer-request/schema'
import { validateRequest, isValid, orderedErrorNames, type ValidationErrors } from '../lib/employer-request/validate'
import { buildMailto } from '../lib/employer-request/mailto'
import { captureAttribution, isCtaSource, type Attribution } from '../lib/attribution'

// Employer staffing-request form (Phase C3).
//
// Privacy model, enforced by tests:
//   - values live ONLY in React state and the mailto: the user sends;
//   - nothing is written to the URL, history, storage, cookies or analytics;
//   - there is no fetch/XHR/beacon — Phase C is deliberately mailto-first;
//   - attribution is read at submit time and is allowlisted upstream.
//
// Accessibility: real <label> per control (never placeholder-only), an error
// summary that receives focus, per-field aria-invalid + aria-describedby, and
// an aria-live status region for the outcome.

type Status = 'idle' | 'error' | 'success'

export default function EmployerRequestForm() {
  const lang = useLang()
  const copy = REQUEST_COPY[lang]

  const [values, setValues] = useState<RequestValues>({})
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [fallbackBody, setFallbackBody] = useState('')
  const [attribution, setAttribution] = useState<Attribution>({})

  const summaryRef = useRef<HTMLDivElement | null>(null)

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
    // Clear a field's error as soon as the user edits it.
    setErrors((prev) => {
      if (!(name in prev)) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const errorList = useMemo(() => orderedErrorNames(errors), [errors])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Always prevent a native submission: a GET form would put every value in
    // the URL, which this feature must never do.
    e.preventDefault()

    const found = validateRequest(values)
    if (!isValid(found)) {
      setErrors(found)
      setStatus('error')
      // Move focus to the summary so screen readers announce the failure.
      window.requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    setErrors({})
    const mail = buildMailto(values, lang, attribution)
    setFallbackBody(`${mail.subject}\n\n${mail.body}`)
    setStatus('success')
    // Hand off to the user's mail client. location.href with a mailto: does not
    // create a history entry for the page and does not alter the page URL.
    window.location.href = mail.href
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
        type={f.kind === 'number' ? 'number' : f.kind === 'date' ? 'date' : f.kind === 'email' ? 'email' : f.kind === 'tel' ? 'tel' : 'text'}
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
      {/* Status region: announced without stealing focus on success. */}
      <div className="erf__status" role="status" aria-live="polite">
        {status === 'success' ? (
          <div className="erf__success">
            <strong>{copy.successTitle}</strong>
            <p>{copy.successBody}</p>
            <p className="erf__fallback-note">{copy.mailtoFallbackNote}</p>
            <textarea
              className="erf__fallback"
              readOnly
              rows={10}
              value={fallbackBody}
              aria-label={copy.mailtoFallbackNote}
            />
            <p>
              <a href={`mailto:${OPERATOR_EMAIL}`}>{OPERATOR_EMAIL}</a>
            </p>
          </div>
        ) : null}
      </div>

      {status === 'error' && errorList.length > 0 ? (
        <div
          className="erf__errors"
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
        >
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
        </div>
      </form>
    </div>
  )
}
