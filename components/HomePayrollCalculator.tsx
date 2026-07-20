import { useId, useMemo, useState } from 'react';
import { formatCzk } from '../lib/payroll';
import { PAYROLL_SOURCES } from '../lib/payroll/sources';
import { computeHomeView } from '../lib/payroll/home-view-model';
import { useLang } from '../lib/i18n/react';
import EmployerCta from './EmployerCta';
import { CALC_COPY, routeLabel, routePurpose } from '../lib/i18n/calculator-copy';

// Compact, flagship homepage payroll calculator.
//
// PRIVACY: everything runs client-side (useState + useMemo over the shared pure
// engine). It never calls an API, submits a form, writes storage, puts salary in
// the URL, or sends inputs to analytics. Only the non-sensitive language code is
// read (useLang). There is no backend and no env var.
//
// The calculation is delegated entirely to lib/payroll (`computeHomeView` →
// `calculate`); this component only renders. Chrome is localized cs/en/de via the
// typed registry; official Czech institution names stay Czech.

const DEDICATED_URL = '/kalkulacka-mzdy-agenturniho-zamestnance';
const MAX_GROSS = 10_000_000;
const DEFAULT_GROSS = '32000';
const VERIFIED = PAYROLL_SOURCES[0]?.accessed ?? '';

type ErrKey = 'empty' | 'number' | 'positive' | 'large' | null;

function parseGross(raw: string): { value: number | null; error: ErrKey } {
  const cleaned = raw.replace(/\s/g, '').replace(',', '.');
  if (cleaned === '') return { value: null, error: 'empty' };
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return { value: null, error: 'number' };
  const n = parseFloat(cleaned);
  if (!isFinite(n) || n <= 0) return { value: null, error: 'positive' };
  if (n > MAX_GROSS) return { value: null, error: 'large' };
  return { value: n, error: null };
}

function formatRate(rate: number): string {
  return `${rate.toString().replace('.', ',')} %`;
}

function formatVerified(iso: string): string {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${Number(d)}. ${Number(m)}. ${y}` : iso;
}

export default function HomePayrollCalculator() {
  const lang = useLang();
  const c = CALC_COPY[lang];
  const [raw, setRaw] = useState(DEFAULT_GROSS);
  const { value, error } = useMemo(() => parseGross(raw), [raw]);
  const view = useMemo(() => (value != null ? computeHomeView(value) : null), [value]);

  const inputId = useId();
  const errorId = useId();
  const valid = view != null && view.ok;
  const errorText = error
    ? { empty: c.errEmpty, number: c.errNumber, positive: c.errPositive, large: c.errLarge }[error]
    : null;

  return (
    <div className="hpc" lang={lang}>
      <div className="hpc__grid">
        {/* ── Left: input + explanation + transparency ── */}
        <div className="hpc__panel">
          <div className="hpc-field">
            <label className="hpc-field__label" htmlFor={inputId}>{c.inputLabel}</label>
            <div className="hpc-field__control">
              <input
                id={inputId}
                className="hpc-field__input"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                aria-describedby={errorText ? errorId : undefined}
                aria-invalid={errorText ? true : undefined}
              />
              <span className="hpc-field__suffix" aria-hidden="true">Kč</span>
            </div>
            {errorText ? (
              <p className="hpc-field__error" id={errorId} role="alert">{errorText}</p>
            ) : (
              <p className="hpc-field__hint">{c.hint}</p>
            )}
          </div>

          <p className="hpc-context">{c.context}</p>

          <a className="btn btn-primary hpc__cta" href={DEDICATED_URL}>{c.ctaDetail}</a>

          <p className="hpc-meta">
            {c.rulesYear.replace('{y}', String(valid ? view!.ruleYear : 2026))}
            {VERIFIED ? ` · ${c.verified.replace('{d}', formatVerified(VERIFIED))}` : ''} ·{' '}
            <a href={`${DEDICATED_URL}#metodika`}>{c.methodology}</a>
          </p>
          <p className="hpc-disclaimer">{c.disclaimer}</p>
        </div>

        {/* ── Right: live results + breakdown ── */}
        <div className="hpc__results">
          <div className="hpc-heads" aria-live="polite">
            {valid ? (
              <>
                <div className="hpc-head hpc-head--primary">
                  <span className="hpc-head__label">{c.net}</span>
                  <strong className="hpc-head__value">{formatCzk(view!.netHalere)}</strong>
                  <span className="hpc-head__note">{c.netNote}</span>
                </div>
                <div className="hpc-head">
                  <span className="hpc-head__label">{c.gross}</span>
                  <strong className="hpc-head__value">{formatCzk(view!.grossHalere)}</strong>
                  <span className="hpc-head__note">{c.grossNote}</span>
                </div>
                <div className="hpc-head hpc-head--cost">
                  <span className="hpc-head__label">{c.cost}</span>
                  <strong className="hpc-head__value">{formatCzk(view!.employerCostHalere)}</strong>
                  <span className="hpc-head__note">{c.costNote}</span>
                </div>
              </>
            ) : (
              <p className="hpc-empty">{errorText ?? c.empty}</p>
            )}
          </div>

          {valid && (
            <>
              <div className="hpc-break">
                <div className="hpc-break__col">
                  <h3 className="hpc-break__title">{c.employeeTitle}</h3>
                  <dl className="hpc-lines">
                    <div className="hpc-line"><dt>{c.empSocial}</dt><dd>{formatCzk(view!.employee.socialHalere)}</dd></div>
                    <div className="hpc-line"><dt>{c.empHealth}</dt><dd>{formatCzk(view!.employee.healthHalere)}</dd></div>
                    <div className="hpc-line"><dt>{c.tax}</dt><dd>{formatCzk(view!.employee.taxHalere)}</dd></div>
                    <div className="hpc-line hpc-line--total"><dt>{c.empTotal}</dt><dd>{formatCzk(view!.employee.totalDeductionsHalere)}</dd></div>
                  </dl>
                </div>
                <div className="hpc-break__col">
                  <h3 className="hpc-break__title">{c.employerTitle}</h3>
                  <dl className="hpc-lines">
                    <div className="hpc-line"><dt>{c.erSocial}</dt><dd>{formatCzk(view!.employer.socialHalere)}</dd></div>
                    <div className="hpc-line"><dt>{c.erHealth}</dt><dd>{formatCzk(view!.employer.healthHalere)}</dd></div>
                    <div className="hpc-line hpc-line--total"><dt>{c.erTotal}</dt><dd>{formatCzk(view!.employer.totalContributionsHalere)}</dd></div>
                  </dl>
                </div>
              </div>

              <div className="hpc-state">
                <div className="hpc-state__row"><span>{c.fromEmployee}</span><strong>{formatCzk(view!.state.fromEmployeeHalere)}</strong></div>
                <div className="hpc-state__row"><span>{c.fromEmployer}</span><strong>{formatCzk(view!.state.fromEmployerHalere)}</strong></div>
                <div className="hpc-state__row hpc-state__row--total"><span>{c.toState}</span><strong>{formatCzk(view!.state.totalToStateHalere)}</strong></div>
              </div>

              <details className="hpc-routes">
                <summary className="hpc-routes__summary">{c.routesSummary}</summary>
                <ul className="hpc-routes__list">
                  {view!.routes.map((r) => (
                    <li className="hpc-route" key={r.key}>
                      <div className="hpc-route__head">
                        <span className="hpc-route__name">{routeLabel(c, r.key)}</span>
                        <span className="hpc-route__amount">{formatCzk(r.amount)}</span>
                      </div>
                      <div className="hpc-route__meta">
                        <span className="hpc-tag">{r.payer === 'employee' ? c.payerEmployee : c.payerEmployer}</span>
                        <span>{c.rateBase.replace('{r}', formatRate(r.ratePercent)).replace('{b}', formatCzk(r.base))}</span>
                      </div>
                      <p className="hpc-route__purpose">
                        {routePurpose(c, r.key)} {c.recipient}: <strong>{r.recipientCs}</strong>. {c.verifiedSource}:{' '}
                        <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer">{r.institution}</a>{' '}
                        <span className="hpc-route__basis">({r.legalBasis})</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </details>
            </>
          )}
        </div>
      </div>
      <EmployerCta
        variant="calculator"
        source="homepage-calculator"
        secondaryHref="/kalkulacka-mzdy-agenturniho-zamestnance?mode=comparison"
      />
    </div>
  );
}
