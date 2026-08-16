import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { FIELDS, GROUPS } from './model'
import * as C from './copy'
import { LANGS } from '../i18n/react'

// The employer's cost figures are commercially sensitive. The way to deserve
// that input is not to collect it — so these tests read the actual source of the
// tool and fail if a transmission, a storage write or a URL write is ever added.
//
// They assert against source text rather than runtime behaviour deliberately: a
// runtime test only proves the paths it exercised, while a source assertion
// catches a `fetch` added to a branch no test happens to hit.

const ROOT = path.join(__dirname, '..', '..')
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), 'utf8')

const TOOL = read('components/VacancyCostTool.tsx')
const MODEL = read('lib/vacancy-cost/model.ts')
const COPY = read('lib/vacancy-cost/copy.ts')
const PAGE = read('pages/cena-neobsazene-pozice.tsx')

/** Strips comments so prose about `fetch` cannot fail a code assertion. */
const code = (src: string) =>
  src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')

const SOURCES = { TOOL, MODEL, COPY, PAGE }

describe('vacancy-cost tool transmits nothing', () => {
  const FORBIDDEN: Array<[string, RegExp]> = [
    ['fetch', /\bfetch\s*\(/],
    ['XMLHttpRequest', /XMLHttpRequest/],
    ['sendBeacon', /sendBeacon/],
    ['WebSocket', /\bWebSocket\b/],
    ['EventSource', /\bEventSource\b/],
    ['axios', /\baxios\b/],
    ['gtag', /\bgtag\s*\(/],
    ['dataLayer', /dataLayer/],
    ['WebmasterID', /webmaster|wmid/i],
    ['localStorage', /localStorage/],
    ['sessionStorage', /sessionStorage/],
    ['IndexedDB', /indexedDB/i],
    ['document.cookie', /document\s*\.\s*cookie/],
    ['history.pushState', /pushState|replaceState/],
    ['location assignment', /location\s*\.\s*(href|search|hash|assign|replace)\s*=/],
    ['URLSearchParams', /URLSearchParams/],
    ['form action', /\baction\s*=/],
  ]

  for (const [name, source] of Object.entries(SOURCES)) {
    for (const [label, re] of FORBIDDEN) {
      it(`${name} contains no ${label}`, () => {
        expect(re.test(code(source))).toBe(false)
      })
    }
  }

  it('the model is pure — it imports nothing at all', () => {
    expect(/^\s*import\s/m.test(code(MODEL))).toBe(false)
  })

  it('the tool imports only the language bridge, its own model and its own copy', () => {
    const imports = Array.from(code(TOOL).matchAll(/from\s+'([^']+)'/g), (m) => m[1])
    expect(imports.sort()).toEqual(
      ['../lib/i18n/react', '../lib/vacancy-cost/copy', '../lib/vacancy-cost/model', 'react'].sort(),
    )
  })

  it('the request CTA is the clean canonical path with no query string', () => {
    // The href is a module constant, so check the constant AND that no literal
    // href anywhere in the file carries a query or fragment.
    const constant = code(TOOL).match(/const REQUEST_PATH\s*=\s*'([^']+)'/)?.[1]
    expect(constant).toBe('/poptavka-pracovniku')
    expect(/href=\{REQUEST_PATH\}/.test(code(TOOL))).toBe(true)

    const literals = Array.from(code(TOOL).matchAll(/href=["']([^"']+)["']/g), (m) => m[1])
    for (const h of [...literals, constant!]) {
      expect(h.includes('?'), `href ${h} carries a query string`).toBe(false)
      expect(h.includes('#'), `href ${h} carries a fragment`).toBe(false)
    }
  })

  it('submitting the form cannot turn values into a query string', () => {
    expect(/onSubmit=\{\(e\)\s*=>\s*e\.preventDefault\(\)\}/.test(TOOL)).toBe(true)
  })

  it('no input carries a name that would be serialised into a URL by a real submit', () => {
    // Belt and braces: even with preventDefault, the form must not declare a
    // method or action that a browser could act on.
    expect(/\bmethod\s*=/.test(code(TOOL))).toBe(false)
  })
})

describe('vacancy-cost tool invents no figures', () => {
  it('no field is pre-filled with a market average', () => {
    // The only literal default in the component is the empty string.
    expect(/useState<Record<FieldName, string>>\(\s*\(\)\s*=>/.test(TOOL)).toBe(true)
    expect(/:\s*''\s*\}\)/.test(TOOL)).toBe(true)
  })

  it('no user-facing string asserts a benchmark, average or guaranteed saving', () => {
    // Assertion of a figure we do not have. The methodology and fee sections are
    // exempt from the "average" half only because they exist to say that no
    // average is used — but they must still never guarantee a saving.
    const assertsAFigure = /průměrn[áéý]\s+(náklad|doba|ztráta)|average (cost|time to hire)|Durchschnittskosten/i
    const guarantees = /guaranteed|zaručen|garantiert|ušetříte|you will save|Sie sparen/i

    const headline = [C.TOOL_TITLE, C.TOOL_INTRO, C.RESULT_HEADING, C.TOTAL_LABEL, C.EMPTY_STATE, C.CTA_TEXT]
    for (const rec of headline) {
      for (const l of LANGS) {
        expect(assertsAFigure.test(rec[l]), `${l}: asserts a figure`).toBe(false)
        expect(guarantees.test(rec[l]), `${l}: guarantees a saving`).toBe(false)
      }
    }

    for (const l of LANGS) {
      for (const t of [...C.METHOD_TEXT[l], ...C.FEE_TEXT[l]]) {
        expect(guarantees.test(t), `${l}: guarantees a saving`).toBe(false)
      }
    }
  })

  it('the result heading is qualified as an estimate in every language', () => {
    expect(C.RESULT_HEADING.cs).toBe('Odhadované náklady podle zadaných předpokladů')
    expect(C.RESULT_HEADING.en).toBe('Estimated cost based on entered assumptions')
    expect(C.RESULT_HEADING.de).toBe('Geschätzte Kosten auf Grundlage der eingegebenen Annahmen')
  })

  it('never states that using the agency reduces vacancy cost', () => {
    const overclaim = /(vždy|always|immer)\s+(sníží|reduces|senkt)|snížíme vaše náklady|we reduce your/i
    for (const l of LANGS) {
      for (const t of C.FEE_TEXT[l]) expect(overclaim.test(t)).toBe(false)
    }
  })
})

describe('vacancy-cost tool language parity', () => {
  it('every field has a label in all three languages', () => {
    for (const f of FIELDS) {
      for (const l of LANGS) {
        expect(C.FIELD_LABEL[f.name][l], `${f.name}/${l}`).toBeTruthy()
      }
    }
  })

  it('every breakdown group has a label in all three languages', () => {
    for (const g of GROUPS) {
      for (const l of LANGS) expect(C.GROUP_LABEL[g][l], `${g}/${l}`).toBeTruthy()
    }
  })

  it('every unit, error and result string exists in all three languages', () => {
    const records = [
      C.UNIT_LABEL.days, C.UNIT_LABEL.perDay, C.UNIT_LABEL.hours, C.UNIT_LABEL.perHour, C.UNIT_LABEL.oneTime,
      C.ERROR_TEXT.negative, C.ERROR_TEXT.notANumber, C.ERROR_TEXT.tooLarge,
      C.RESULT_HEADING, C.TOTAL_LABEL, C.EMPTY_STATE, C.CTA_TEXT, C.RESET_LABEL,
      C.PRIVACY_NOTE, C.METHOD_HEADING, C.FEE_HEADING, C.TOOL_TITLE, C.TOOL_INTRO,
      C.RESULT_REGION_LABEL,
    ]
    for (const rec of records) for (const l of LANGS) expect(rec[l]).toBeTruthy()
  })

  it('methodology and fee explanations have the same paragraph count in each language', () => {
    expect(new Set(LANGS.map((l) => C.METHOD_TEXT[l].length)).size).toBe(1)
    expect(new Set(LANGS.map((l) => C.FEE_TEXT[l].length)).size).toBe(1)
  })

  it('EN and DE state this is not a statutory payroll calculator; CS needs no such note', () => {
    expect(C.SCOPE_NOTE.cs).toBeNull()
    expect(C.SCOPE_NOTE.en).toMatch(/not a statutory payroll calculator/i)
    expect(C.SCOPE_NOTE.de).toMatch(/kein gesetzlicher Lohnrechner/i)
  })
})

describe('vacancy-cost tool adds no route', () => {
  it('lives on the existing canonical page and creates no new URL', () => {
    expect(PAGE).toContain('CENA_NEOBSAZENE_POZICE')
    expect(PAGE).toContain('VacancyCostTool')
    expect(fs.existsSync(path.join(ROOT, 'pages/kalkulacka-neobsazene-pozice.tsx'))).toBe(false)
  })
})
