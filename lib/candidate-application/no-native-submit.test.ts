import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const FORM = path.join(process.cwd(), 'components/locale/CandidateApplicationForm.tsx')
const raw = fs.readFileSync(FORM, 'utf8')

/**
 * Comments stripped before matching.
 *
 * The component documents the absence of a file input in prose, so a naive
 * search finds the very words it is asserting are absent and fails on the
 * documentation rather than on the code.
 */
const source = raw.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ')

/**
 * The candidate form must never submit natively.
 *
 * A <form> with no method defaults to GET, which puts every field into the
 * query string of the current URL. That is the one thing this whole design
 * exists to prevent: the application is composed in the reader's own mail
 * client precisely so no candidate value ever touches this site's URLs,
 * history or storage.
 *
 * The employer form has carried this assertion since Phase C3
 * (lib/employer-request/conversion.test.ts). The candidate form — the one
 * handling migrant-worker personal data — shipped without it, and did default
 * to GET. This is that gap closed.
 */
describe('the candidate application never submits natively', () => {
  it('declares method="post" so a JS-less submit cannot become a GET', () => {
    expect(source).toMatch(/<form[^>]*method="post"/)
  })

  it('calls preventDefault before doing anything with the values', () => {
    expect(source).toMatch(/event\.preventDefault\(\)/)
    const handler = source.slice(source.indexOf('const onSubmit'))
    const prevent = handler.indexOf('event.preventDefault()')
    const build = handler.indexOf('buildApplicationMailto')
    expect(prevent).toBeGreaterThan(-1)
    expect(build).toBeGreaterThan(prevent)
  })

  it('declares no action attribute that could target another origin', () => {
    expect(source).not.toMatch(/<form[^>]*\saction=/)
  })

  it('has no file input — the site has no backend able to receive a CV', () => {
    expect(source).not.toMatch(/type\s*=\s*["'{]?\s*file/)
  })
})
