import { describe, it, expect } from 'vitest'
import { realConsoleErrors, firstPartyFailures, isThirdPartyUrl } from './console-noise'

// Negative controls A–E.
//
// The danger in fixing a flaky test is fixing it into uselessness. These assert
// the opposite of the flake: that the classifier still surfaces every failure
// class the legal-page suite exists to catch. If any of B–E ever passes as
// "noise", the suite has stopped protecting anything.

const GENERIC_404 = 'Failed to load resource: the server responded with a status of 404 ()'
const FONT = 'https://fonts.gstatic.com/s/inter/v20/UcCB3FwrK3iLTeHuS_nVMrMxCp50.woff2'
const OWN_CSS = 'https://talentpartnerid.com/legal-pages.css'
const OWN_JS = 'https://talentpartnerid.com/script.js'

describe('A. known irrelevant browser 404 is ignored', () => {
  it('drops the URL-less generic error when only third-party resources failed', () => {
    expect(realConsoleErrors({ consoleErrors: [GENERIC_404], failedUrls: [FONT] })).toEqual([])
  })

  it('drops it when several third-party fonts fail across five breakpoint loads', () => {
    const errors = Array.from({ length: 10 }, () => GENERIC_404)
    const urls = Array.from({ length: 10 }, () => FONT)
    expect(realConsoleErrors({ consoleErrors: errors, failedUrls: urls })).toEqual([])
  })

  it('still drops errors that name a third-party origin directly', () => {
    expect(
      realConsoleErrors({
        consoleErrors: ['GET https://fonts.googleapis.com/css2 net::ERR_FAILED'],
        failedUrls: [],
      }),
    ).toEqual([])
  })
})

describe('B. a required stylesheet 404 FAILS', () => {
  it('does not drop the generic error when a first-party stylesheet failed', () => {
    const real = realConsoleErrors({ consoleErrors: [GENERIC_404], failedUrls: [OWN_CSS] })
    expect(real).toEqual([GENERIC_404])
  })

  it('reports the first-party URL so the failure is diagnosable', () => {
    expect(firstPartyFailures([FONT, OWN_CSS])).toEqual([OWN_CSS])
  })

  it('a first-party failure is not masked by third-party noise alongside it', () => {
    const real = realConsoleErrors({
      consoleErrors: [GENERIC_404, GENERIC_404],
      failedUrls: [FONT, OWN_CSS, FONT],
    })
    expect(real.length).toBe(2)
  })
})

describe('C. a required script 404 FAILS', () => {
  it('keeps the error when a first-party script failed', () => {
    expect(realConsoleErrors({ consoleErrors: [GENERIC_404], failedUrls: [OWN_JS] })).toEqual([GENERIC_404])
  })

  it('treats a relative-path failure as first-party', () => {
    expect(isThirdPartyUrl('/script.js')).toBe(false)
    expect(firstPartyFailures(['/script.js'])).toEqual(['/script.js'])
  })
})

describe('D. an application JS exception FAILS', () => {
  it('never drops an uncaught TypeError, whatever the network did', () => {
    const err = "Uncaught TypeError: Cannot read properties of undefined (reading 'map')"
    expect(realConsoleErrors({ consoleErrors: [err], failedUrls: [FONT] })).toEqual([err])
  })

  it('never drops an application console.error', () => {
    const err = 'Employer request form failed to initialise'
    expect(realConsoleErrors({ consoleErrors: [err], failedUrls: [FONT, FONT] })).toEqual([err])
  })
})

describe('E. a hydration error FAILS', () => {
  it('keeps React hydration mismatches', () => {
    const err = 'Hydration failed because the initial UI does not match what was rendered on the server.'
    expect(realConsoleErrors({ consoleErrors: [err], failedUrls: [FONT] })).toEqual([err])
  })

  it('keeps the text-content mismatch variant', () => {
    const err = 'Warning: Text content did not match. Server: "Ochrana" Client: "Privacy"'
    expect(realConsoleErrors({ consoleErrors: [err], failedUrls: [] })).toEqual([err])
  })
})

describe('the fix is not a broad ignore rule', () => {
  it('keeps MIME/stylesheet refusals — the bug this suite was written for', () => {
    const err = "Refused to apply style from 'https://talentpartnerid.com/styles.css' because its MIME type ('text/html') is not a supported stylesheet MIME type"
    expect(realConsoleErrors({ consoleErrors: [err], failedUrls: [] })).toEqual([err])
  })

  it('keeps a 404 message that carries a first-party URL in its own text', () => {
    const err = 'GET https://talentpartnerid.com/legal-pages.css 404 (Not Found)'
    expect(realConsoleErrors({ consoleErrors: [err], failedUrls: [] })).toEqual([err])
  })

  it('keeps CSP violations', () => {
    const err = "Refused to execute inline script because it violates the following Content Security Policy directive"
    expect(realConsoleErrors({ consoleErrors: [err], failedUrls: [FONT] })).toEqual([err])
  })

  it('does not suppress a generic 5xx from our own origin', () => {
    const err = 'Failed to load resource: the server responded with a status of 500 ()'
    expect(realConsoleErrors({ consoleErrors: [err], failedUrls: ['https://talentpartnerid.com/x.js'] })).toEqual([err])
  })

  it('classifies hosts precisely — a lookalike domain is not trusted', () => {
    expect(isThirdPartyUrl('https://fonts.gstatic.com.evil.test/x.woff2')).toBe(false)
    expect(isThirdPartyUrl('https://fonts.gstatic.com/x.woff2')).toBe(true)
  })
})
