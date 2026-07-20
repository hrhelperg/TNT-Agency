import { useLang } from '../lib/i18n/react'
import { CTA_COPY, buildCtaHref, type CtaVariant } from '../lib/employer-request/cta'
import type { CtaSource } from '../lib/attribution'

// Reusable employer conversion CTA (Phase C4/C6).
//
// Deliberately a plain, always-visible block: no popup, no countdown, no fake
// urgency and no "companies waiting" claim. It carries only a non-sensitive
// surface hint in the URL — buildCtaHref accepts nothing else.

interface EmployerCtaProps {
  variant: CtaVariant
  source: CtaSource
  /** Optional second link (e.g. back to the comparison or calculator). */
  secondaryHref?: string
}

export default function EmployerCta({ variant, source, secondaryHref }: EmployerCtaProps) {
  const lang = useLang()
  const c = CTA_COPY[lang][variant]

  return (
    <aside className="econv" lang={lang}>
      <p className="econv__title">{c.title}</p>
      <p className="econv__text">{c.text}</p>
      <div className="econv__actions">
        <a href={buildCtaHref(source)} className="btn btn-primary">
          {c.primary}
        </a>
        {secondaryHref ? (
          <a href={secondaryHref} className="btn btn-ghost">
            {c.secondary}
          </a>
        ) : null}
      </div>
      <p className="econv__note">{c.note}</p>
    </aside>
  )
}
