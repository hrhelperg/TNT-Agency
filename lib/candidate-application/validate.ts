/**
 * Pure validation for the candidate application.
 *
 * Returns machine-readable codes rather than prose, so the same result renders
 * in pt-BR and es from the copy registry — and so a future server endpoint can
 * reuse it unchanged.
 */
import { APPLICATION_FIELDS, type ApplicationValues } from './schema'

export type ErrorCode = 'required' | 'invalidEmail' | 'tooLong' | 'invalidOption'
export type ValidationErrors = Record<string, ErrorCode>

// Deliberately permissive: reject obvious typos, not unusual-but-valid
// addresses. An over-strict pattern silently drops real candidates, and a
// candidate who is dropped has no way to find out why.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const asString = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')

export function validateApplication(values: ApplicationValues): ValidationErrors {
  const errors: ValidationErrors = {}

  for (const field of APPLICATION_FIELDS) {
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
    if (field.kind === 'select' && field.options && !field.options.includes(value)) {
      errors[field.name] = 'invalidOption'
    }
  }

  return errors
}

export const isValid = (errors: ValidationErrors): boolean => Object.keys(errors).length === 0

/** Field order for the error summary — schema order, so focus moves down the form. */
export const orderedErrorNames = (errors: ValidationErrors): string[] =>
  APPLICATION_FIELDS.map((f) => f.name).filter((n) => n in errors)
