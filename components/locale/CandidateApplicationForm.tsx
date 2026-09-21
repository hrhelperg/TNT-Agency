import { useMemo, useRef, useState } from 'react'
import { OPERATOR_EMAIL } from '../../lib/content/trust-data'
import type { CandidateLocale } from '../../lib/locale/chrome'
import { APPLICATION_COPY } from '../../lib/candidate-application/copy'
import {
  APPLICATION_GROUPS,
  fieldsInGroup,
  type ApplicationValues,
} from '../../lib/candidate-application/schema'
import { buildApplicationMailto } from '../../lib/candidate-application/mailto'
import {
  isValid,
  orderedErrorNames,
  validateApplication,
  type ValidationErrors,
} from '../../lib/candidate-application/validate'

/**
 * The candidate application — mailto-first.
 *
 * WHY NO FILE UPLOAD
 * ──────────────────
 * There is no `<input type="file">` here and there must never be one. The site
 * has no backend able to receive a CV, so a file field would be a control that
 * looks like it works and does not — and it would turn a page that currently
 * stores nothing into one holding candidate CVs, with the retention, access and
 * transfer obligations that follow. The candidate attaches the CV in their own
 * mail client instead, which means no CV ever reaches this site and there is
 * nothing here to leak.
 *
 * The cost of that choice is real: someone can send the message without the
 * attachment. So the instruction appears three times — before the form, inside
 * the generated message, and in the success state — rather than once.
 *
 * PRIVACY
 * ───────
 * Values live in React state and in the mailto: URI only. Nothing is written to
 * the page URL, the history, localStorage, sessionStorage or any analytics
 * payload. `location.href = mailto:` hands the string to the mail handler and
 * does not navigate, so it never becomes an address the browser records.
 */
export default function CandidateApplicationForm({ locale }: { locale: CandidateLocale }) {
  const copy = APPLICATION_COPY[locale]
  const [values, setValues] = useState<ApplicationValues>({})
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [status, setStatus] = useState<'editing' | 'error' | 'prepared'>('editing')
  const [copied, setCopied] = useState(false)
  const summaryRef = useRef<HTMLDivElement | null>(null)

  const prepared = useMemo(
    () => (status === 'prepared' ? buildApplicationMailto(values, locale) : null),
    [status, values, locale],
  )

  const set = (name: string, value: string | boolean) => {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => {
      if (!(name in e)) return e
      const next = { ...e }
      delete next[name]
      return next
    })
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const found = validateApplication(values)
    if (!isValid(found)) {
      setErrors(found)
      setStatus('error')
      // Focus the summary rather than the first field: a screen-reader user
      // needs to hear what is wrong before being moved into a control.
      window.requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setErrors({})
    setStatus('prepared')
    setCopied(false)
    const mail = buildApplicationMailto(values, locale)
    // Assignment, not navigation: the browser hands this to the mail handler and
    // the page stays where it is, so the value never enters the address bar or
    // the session history.
    window.location.href = mail.href
  }

  const describedBy = (name: string) => {
    const ids = []
    if (copy.hints[name]) ids.push(`caf-hint-${name}`)
    if (errors[name]) ids.push(`caf-err-${name}`)
    return ids.length ? ids.join(' ') : undefined
  }

  const field = (name: string) => {
    const f = fieldsInGroup(APPLICATION_GROUPS.find((g) => fieldsInGroup(g).some((x) => x.name === name))!)
      .find((x) => x.name === name)!
    const label = copy.labels[name]
    const id = `caf-${name}`
    const invalid = Boolean(errors[name])

    if (f.kind === 'checkbox') {
      return (
        <div className="caf__field caf__field--check" key={name}>
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={values[name] === true}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy(name)}
            onChange={(e) => set(name, e.target.checked)}
          />
          <label htmlFor={id}>{copy.consentLabel}</label>
          {invalid && (
            <p className="caf__error" id={`caf-err-${name}`}>
              {copy.errors[errors[name]]}
            </p>
          )}
        </div>
      )
    }

    const common = {
      id,
      name,
      'aria-invalid': invalid || undefined,
      'aria-describedby': describedBy(name),
      required: f.required || undefined,
      autoComplete: f.autoComplete,
      maxLength: f.maxLength,
    }

    return (
      <div className="caf__field" key={name}>
        <label htmlFor={id}>
          {label}{' '}
          <span className="caf__req">{f.required ? copy.required : copy.optional}</span>
        </label>
        {copy.hints[name] && (
          <p className="caf__hint" id={`caf-hint-${name}`}>
            {copy.hints[name]}
          </p>
        )}
        {f.kind === 'select' ? (
          <select
            {...common}
            value={typeof values[name] === 'string' ? (values[name] as string) : ''}
            onChange={(e) => set(name, e.target.value)}
          >
            <option value="">—</option>
            {f.options!.map((o) => (
              <option key={o} value={o}>
                {copy.options[`${name}.${o}`] ?? o}
              </option>
            ))}
          </select>
        ) : f.kind === 'textarea' ? (
          <textarea
            {...common}
            rows={4}
            value={typeof values[name] === 'string' ? (values[name] as string) : ''}
            onChange={(e) => set(name, e.target.value)}
          />
        ) : (
          <input
            {...common}
            type={f.kind === 'email' ? 'email' : f.kind === 'tel' ? 'tel' : 'text'}
            value={typeof values[name] === 'string' ? (values[name] as string) : ''}
            onChange={(e) => set(name, e.target.value)}
          />
        )}
        {invalid && (
          <p className="caf__error" id={`caf-err-${name}`}>
            {copy.errors[errors[name]]}
          </p>
        )}
      </div>
    )
  }

  return (
    <section className="caf" lang={locale}>
      {/* Shown BEFORE the form: the instruction someone needs before they act. */}
      <p className="caf__attach-warning" role="note">
        <strong>{copy.attachWarning}</strong>
      </p>

      <form onSubmit={onSubmit} noValidate>
        {status === 'error' && orderedErrorNames(errors).length > 0 && (
          <div className="caf__summary" role="alert" tabIndex={-1} ref={summaryRef}>
            <p>{copy.errorSummaryTitle}</p>
            <ul>
              {orderedErrorNames(errors).map((n) => (
                <li key={n}>
                  <a href={`#caf-${n}`}>{copy.labels[n]}</a> — {copy.errors[errors[n]]}
                </li>
              ))}
            </ul>
          </div>
        )}

        {APPLICATION_GROUPS.map((group) => (
          <fieldset className="caf__group" key={group}>
            <legend>{copy.groupTitles[group]}</legend>
            {fieldsInGroup(group).map((f) => field(f.name))}
          </fieldset>
        ))}

        <button className="btn btn-primary" type="submit">
          {copy.submit}
        </button>
      </form>

      {/*
        The fallback is ALWAYS rendered, not only after a failure. A device with
        no mail client configured gives no error to react to — the button simply
        does nothing — so a fallback that appears only on failure would never
        appear at all. The address is literal text, and the message body is in a
        read-only textarea that works without scripting; the clipboard button is
        progressive enhancement on top of it.
      */}
      <section className="caf__fallback">
        <h3>{copy.fallbackTitle}</h3>
        <p>{copy.fallbackBody}</p>
        <p className="caf__email">
          <a href={`mailto:${OPERATOR_EMAIL}`}>{OPERATOR_EMAIL}</a>
        </p>
        {prepared && (
          <>
            <label htmlFor="caf-body">{copy.bodyLabel}</label>
            <textarea id="caf-body" readOnly rows={10} value={prepared.body} />
            <button
              type="button"
              className="btn"
              onClick={() => {
                navigator.clipboard?.writeText(prepared.body).then(
                  () => setCopied(true),
                  () => setCopied(false),
                )
              }}
            >
              {copy.copyButton}
            </button>
            <span aria-live="polite">{copied ? copy.copied : ''}</span>
          </>
        )}
      </section>

      {status === 'prepared' && (
        <div className="caf__success" role="status">
          <h3>{copy.successTitle}</h3>
          <p>{copy.successBody}</p>
          {/* The same instruction again, at the moment it matters most. */}
          <p className="caf__attach-warning">
            <strong>{copy.successAttach}</strong>
          </p>
        </div>
      )}
    </section>
  )
}
