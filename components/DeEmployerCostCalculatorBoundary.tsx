import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  CROSS_LINK,
  CROSS_LINK_PATH,
  JURISDICTION_STAMP,
  METHODOLOGY,
  PAGE_KICKER,
  PAGE_TITLE,
  t,
} from '../lib/calculators/de-employer-cost/copy'
import {
  DISPLAY_BASIS,
  DISPLAY_CENT,
  formatCentNumber,
} from '../lib/calculators/de-employer-cost/display-facts'
import {
  UNSUPPORTED_BROWSER,
  hasExactArithmetic,
} from '../lib/calculators/de-employer-cost/unsupported-browser'
import type { DeLocale } from '../lib/calculators/de-employer-cost/types'

/**
 * The progressive-enhancement boundary for the German calculator.
 *
 * WHY THIS FILE EXISTS
 * ────────────────────
 * The calculator's arithmetic is built on BigInt, because the BMF
 * Programmablaufplan squares a six-decimal intermediate and the result passes
 * 2^53 — no Number implementation of it is exact. That dependency is accepted.
 *
 * What is not accepted is failing silently. BigInt LITERALS are syntax, so on a
 * browser without BigInt the calculator's chunk does not merely misbehave: it
 * fails to parse, React never hydrates that subtree, and the form sits there
 * looking interactive and doing nothing. A form that ignores you is worse than
 * a form that is honestly absent.
 *
 * So this component stands in front of it and does three things:
 *
 *   1. Renders the heading, the methodology, the ceilings, the statutory bases
 *      and the cross-link ON THE SERVER, so every reader gets them whatever
 *      their browser can run — that is the part the fallback message promises
 *      is still there.
 *   2. Tests for the capability with `typeof`, after mount.
 *   3. Loads the calculator's chunk ONLY if the test passes. `next/dynamic` with
 *      `ssr: false` puts it in its own chunk and requests it at render, so on an
 *      unsupported browser the bytes are never fetched and never parsed.
 *
 * THIS FILE MUST CONTAIN NO BIGINT SYNTAX, and neither may anything it imports
 * outside the dynamic boundary — a single `0n` here would make the guard
 * unparseable on precisely the browsers it protects. That is why the figures
 * below come from `display-facts.ts` as plain numbers rather than from the
 * registry, and why the capability test is `typeof BigInt === 'function'`
 * rather than a mention of the value. `browser-support.test.ts` asserts it.
 *
 * WHAT IT DELIBERATELY DOES NOT DO
 * ────────────────────────────────
 * No approximate result on the fallback path. An employer-cost figure computed
 * with floating point would be wrong in the cents that matter and would look
 * exactly like the real one.
 */

const Calculator = dynamic(() => import('./DeEmployerCostCalculator'), {
  ssr: false,
  loading: () => null,
})

const LANG: Record<DeLocale, string> = { de: 'de', en: 'en', cs: 'cs' }

export interface DeEmployerCostCalculatorBoundaryProps {
  readonly locale: DeLocale
}

export default function DeEmployerCostCalculatorBoundary({
  locale,
}: DeEmployerCostCalculatorBoundaryProps) {
  const tr = (copy: Parameters<typeof t>[0]) => t(copy, locale)

  // 'checking' until the effect runs, so the server and the first client render
  // agree and hydration does not mismatch. The calculator is client-only by
  // design; the prose around it is not.
  const [support, setSupport] = useState<'checking' | 'supported' | 'unsupported'>('checking')
  useEffect(() => {
    setSupport(hasExactArithmetic() ? 'supported' : 'unsupported')
  }, [])

  return (
    <section className="ecc ecc--de" aria-labelledby="decc-title" lang={LANG[locale]}>
      <div className="container">
        <p className="ecc__stamp">{tr(JURISDICTION_STAMP)}</p>
        <h2 id="decc-title">{tr(PAGE_TITLE)}</h2>
        <p className="ecc__kicker">{tr(PAGE_KICKER)}</p>

        {support === 'supported' ? <Calculator locale={locale} /> : null}
        {support === 'unsupported' ? (
          <p className="ecc__unsupported" role="status">
            {UNSUPPORTED_BROWSER[locale]}
          </p>
        ) : null}
        {/*
          The same notice for a reader with JavaScript off entirely.

          `support` starts at 'checking' and only leaves it inside an effect, so
          without JS the state never advances: no calculator, no notice, and no
          explanation of why an interactive tool is missing from a page that
          announces one. The BigInt story and the no-JS story have the same
          honest answer, and <noscript> is the one element that tells it without
          a script running.
        */}
        <noscript>
          <p className="ecc__unsupported">{UNSUPPORTED_BROWSER[locale]}</p>
        </noscript>

        <div className="ecc__verified">
          <h3>{tr(METHODOLOGY.heading)}</h3>
          <p>{tr(METHODOLOGY.taxSource)}</p>
          <p>{tr(METHODOLOGY.socialSource)}</p>
          <p>{tr(METHODOLOGY.privacy)}</p>
          <p>{tr(METHODOLOGY.notAdvice)}</p>

          <dl className="ecc__periodicity">
            <dt>{tr(METHODOLOGY.basisPension)}</dt>
            <dd>{DISPLAY_BASIS.pension[locale]}</dd>
            <dt>{tr(METHODOLOGY.basisUnemployment)}</dt>
            <dd>{DISPLAY_BASIS.unemployment[locale]}</dd>
            <dt>{tr(METHODOLOGY.basisHealth)}</dt>
            <dd>{DISPLAY_BASIS.health[locale]}</dd>
            <dt>{tr(METHODOLOGY.basisCare)}</dt>
            <dd>{DISPLAY_BASIS.care[locale]}</dd>
            <dt>{tr(METHODOLOGY.basisLevies)}</dt>
            <dd>{DISPLAY_BASIS.levies[locale]}</dd>
            <dt>{tr(METHODOLOGY.basisTax)}</dt>
            <dd>{DISPLAY_BASIS.tax[locale]}</dd>
          </dl>

          <dl className="ecc__periodicity">
            <dt>{tr(METHODOLOGY.ceilingHealth)}</dt>
            <dd>{formatCentNumber(DISPLAY_CENT.healthCeilingMonthly, locale)}</dd>
            <dt>{tr(METHODOLOGY.ceilingPension)}</dt>
            <dd>{formatCentNumber(DISPLAY_CENT.pensionCeilingMonthly, locale)}</dd>
            <dt>{tr(METHODOLOGY.insuranceThreshold)}</dt>
            <dd>{formatCentNumber(DISPLAY_CENT.insuranceThresholdAnnual, locale, true)}</dd>
            <dt>{tr(METHODOLOGY.minijobThreshold)}</dt>
            <dd>{formatCentNumber(DISPLAY_CENT.minijobMonthly, locale)}</dd>
            <dt>{tr(METHODOLOGY.transitionThreshold)}</dt>
            <dd>{formatCentNumber(DISPLAY_CENT.transitionUpperMonthly, locale)}</dd>
          </dl>
        </div>

        <p className="ecc__crosslink">
          <Link href={CROSS_LINK_PATH[locale]}>{tr(CROSS_LINK.label)}</Link>
        </p>
      </div>
    </section>
  )
}
