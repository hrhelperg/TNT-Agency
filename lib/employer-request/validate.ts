// Server-safe, pure validation for the employer staffing request.
//
// Returns machine-readable error codes (not prose) so the same result can be
// rendered in cs/en/de by the copy registry and reused unchanged by a future
// server-side endpoint in Phase E.

import { REQUEST_FIELDS, fieldByName, type RequestValues } from './schema'

export type ErrorCode = 'required' | 'invalidEmail' | 'invalidNumber' | 'tooLong' | 'invalidOption' | 'invalidDate'

export type ValidationErrors = Record<string, ErrorCode>

// Deliberately permissive: we reject obvious typos, not unusual-but-valid
// addresses. Over-strict email regexes drop legitimate B2B leads.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const asString = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')

export function validateRequest(values: RequestValues): ValidationErrors {
  const errors: ValidationErrors = {}

  for (const field of REQUEST_FIELDS) {
    const raw = values[field.name]

    if (field.kind === 'checkbox') {
      if (field.required && raw !== true) errors[field.name] = 'required'
      continue
    }

    const value = asString(raw)

    if (!value) {
      if (field.required) errors[field.name] = 'required'
      continue
    }

    if (field.maxLength && value.length > field.maxLength) {
      errors[field.name] = 'tooLong'
      continue
    }

    if (field.kind === 'email' && !EMAIL_RE.test(value)) {
      errors[field.name] = 'invalidEmail'
      continue
    }

    if (field.kind === 'number') {
      const n = Number(value)
      if (!Number.isFinite(n) || !Number.isInteger(n)) {
        errors[field.name] = 'invalidNumber'
        continue
      }
      if ((field.min !== undefined && n < field.min) || (field.max !== undefined && n > field.max)) {
        errors[field.name] = 'invalidNumber'
        continue
      }
    }

    if (field.kind === 'date' && Number.isNaN(Date.parse(value))) {
      errors[field.name] = 'invalidDate'
      continue
    }

    if (field.kind === 'select' && field.options && !field.options.includes(value)) {
      errors[field.name] = 'invalidOption'
      continue
    }
  }

  return errors
}

export const isValid = (errors: ValidationErrors): boolean => Object.keys(errors).length === 0

/** Field order for the error summary — matches visual order, so focus is sane. */
export function orderedErrorNames(errors: ValidationErrors): string[] {
  return REQUEST_FIELDS.map((f) => f.name).filter((n) => n in errors)
}

/** Guard used by the form before building a mailto. */
export function assertKnownFields(values: RequestValues): void {
  for (const key of Object.keys(values)) {
    if (!fieldByName(key)) throw new Error(`Unknown request field: "${key}"`)
  }
}
