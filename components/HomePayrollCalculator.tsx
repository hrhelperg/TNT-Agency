import { useId, useMemo, useState } from 'react';
import { formatCzk } from '../lib/payroll';
import { PAYROLL_SOURCES } from '../lib/payroll/sources';
import { computeHomeView } from '../lib/payroll/home-view-model';

// Compact, flagship homepage payroll calculator.
//
// PRIVACY: everything runs client-side (useState + useMemo over the shared pure
// engine). It never calls an API, submits a form, writes storage, puts salary
// in the URL, or sends inputs to analytics. There is no backend and no env var.
//
// The calculation itself is delegated entirely to lib/payroll (`computeHomeView`
// → `calculate`); this component only renders the result. Czech payroll terms
// are authoritative and are never machine-translated.

const DEDICATED_URL = '/kalkulacka-mzdy-agenturniho-zamestnance';
const MAX_GROSS = 10_000_000;
const DEFAULT_GROSS = '32000';

// Verification date from the versioned source registry (evidence-backed).
const VERIFIED = PAYROLL_SOURCES[0]?.accessed ?? '';

function parseGross(raw: string): { value: number | null; error: string | null } {
  const cleaned = raw.replace(/\s/g, '').replace(',', '.');
  if (cleaned === '') return { value: null, error: 'Zadejte hrubou měsíční mzdu.' };
  if (!/^\d+(\.\d+)?$/.test(cleaned)) return { value: null, error: 'Zadejte platné číslo v korunách.' };
  const n = parseFloat(cleaned);
  if (!isFinite(n) || n <= 0) return { value: null, error: 'Mzda musí být větší než 0 Kč.' };
  if (n > MAX_GROSS) return { value: null, error: 'Zadejte reálnou měsíční mzdu.' };
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
  const [raw, setRaw] = useState(DEFAULT_GROSS);
  const { value, error } = useMemo(() => parseGross(raw), [raw]);
  const view = useMemo(() => (value != null ? computeHomeView(value) : null), [value]);

  const inputId = useId();
  const errorId = useId();
  const valid = view != null && view.ok;

  return (
    <div className="hpc">
      <div className="hpc__grid">
        {/* ── Left: input + explanation + transparency ── */}
        <div className="hpc__panel">
          <div className="hpc-field">
            <label className="hpc-field__label" htmlFor={inputId}>
              Hrubá měsíční mzda
            </label>
            <div className="hpc-field__control">
              <input
                id={inputId}
                className="hpc-field__input"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                aria-describedby={error ? errorId : undefined}
                aria-invalid={error ? true : undefined}
              />
              <span className="hpc-field__suffix" aria-hidden="true">Kč</span>
            </div>
            {error ? (
              <p className="hpc-field__error" id={errorId} role="alert">{error}</p>
            ) : (
              <p className="hpc-field__hint">
                Zadejte hrubou měsíční mzdu. Výpočet se přepočítá okamžitě.
              </p>
            )}
          </div>

          <p className="hpc-context">
            Výpočet mzdových nákladů podle pravidel platných v České republice.
            <span className="hpc-context__en"> Payroll cost for employment in the Czech Republic.</span>
          </p>

          <a className="btn btn-primary hpc__cta" href={DEDICATED_URL}>
            Zobrazit podrobný výpočet
          </a>

          <p className="hpc-meta">
            Pravidla pro rok {valid ? view!.ruleYear : 2026}
            {VERIFIED ? ` · ověřeno ${formatVerified(VERIFIED)}` : ''} ·{' '}
            <a href={`${DEDICATED_URL}#metodika`}>metodika a zdroje</a>
          </p>
          <p className="hpc-disclaimer">
            Orientační informativní výpočet. Skutečná částka se může lišit podle
            individuální daňové situace (slevy, děti, více zaměstnavatelů). Nejde
            o daňové ani právní poradenství.
          </p>
        </div>

        {/* ── Right: live results + breakdown ── */}
        <div className="hpc__results">
          <div className="hpc-heads" aria-live="polite">
            {valid ? (
              <>
                <div className="hpc-head hpc-head--primary">
                  <span className="hpc-head__label">Čistá mzda</span>
                  <strong className="hpc-head__value">{formatCzk(view!.netHalere)}</strong>
                  <span className="hpc-head__note">měsíčně, kterou obdrží zaměstnanec</span>
                </div>
                <div className="hpc-head">
                  <span className="hpc-head__label">Hrubá mzda</span>
                  <strong className="hpc-head__value">{formatCzk(view!.grossHalere)}</strong>
                  <span className="hpc-head__note">sjednaná měsíční mzda</span>
                </div>
                <div className="hpc-head hpc-head--cost">
                  <span className="hpc-head__label">Celkové náklady zaměstnavatele</span>
                  <strong className="hpc-head__value">{formatCzk(view!.employerCostHalere)}</strong>
                  <span className="hpc-head__note">hrubá mzda + odvody zaměstnavatele</span>
                </div>
              </>
            ) : (
              <p className="hpc-empty">{error ?? 'Zadejte hrubou měsíční mzdu pro výpočet.'}</p>
            )}
          </div>

          {valid && (
            <>
              <div className="hpc-break">
                <div className="hpc-break__col">
                  <h3 className="hpc-break__title">Odvody zaměstnance</h3>
                  <dl className="hpc-lines">
                    <div className="hpc-line"><dt>Sociální pojištění zaměstnance</dt><dd>{formatCzk(view!.employee.socialHalere)}</dd></div>
                    <div className="hpc-line"><dt>Zdravotní pojištění zaměstnance</dt><dd>{formatCzk(view!.employee.healthHalere)}</dd></div>
                    <div className="hpc-line"><dt>Záloha na daň z příjmů</dt><dd>{formatCzk(view!.employee.taxHalere)}</dd></div>
                    <div className="hpc-line hpc-line--total"><dt>Celkové odvody zaměstnance</dt><dd>{formatCzk(view!.employee.totalDeductionsHalere)}</dd></div>
                  </dl>
                </div>
                <div className="hpc-break__col">
                  <h3 className="hpc-break__title">Odvody zaměstnavatele</h3>
                  <dl className="hpc-lines">
                    <div className="hpc-line"><dt>Sociální pojištění zaměstnavatele</dt><dd>{formatCzk(view!.employer.socialHalere)}</dd></div>
                    <div className="hpc-line"><dt>Zdravotní pojištění zaměstnavatele</dt><dd>{formatCzk(view!.employer.healthHalere)}</dd></div>
                    <div className="hpc-line hpc-line--total"><dt>Celkové odvody zaměstnavatele</dt><dd>{formatCzk(view!.employer.totalContributionsHalere)}</dd></div>
                  </dl>
                </div>
              </div>

              <div className="hpc-state">
                <div className="hpc-state__row"><span>Sráženo z hrubé mzdy zaměstnance</span><strong>{formatCzk(view!.state.fromEmployeeHalere)}</strong></div>
                <div className="hpc-state__row"><span>Platí navíc zaměstnavatel</span><strong>{formatCzk(view!.state.fromEmployerHalere)}</strong></div>
                <div className="hpc-state__row hpc-state__row--total"><span>Celkem daně a povinné pojistné</span><strong>{formatCzk(view!.state.totalToStateHalere)}</strong></div>
              </div>

              <details className="hpc-routes">
                <summary className="hpc-routes__summary">Kam odvody směřují?</summary>
                <ul className="hpc-routes__list">
                  {view!.routes.map((r) => (
                    <li className="hpc-route" key={r.key}>
                      <div className="hpc-route__head">
                        <span className="hpc-route__name">{r.labelCs}</span>
                        <span className="hpc-route__amount">{formatCzk(r.amount)}</span>
                      </div>
                      <div className="hpc-route__meta">
                        <span className="hpc-tag">{r.payer === 'employee' ? 'Platí zaměstnanec' : 'Platí zaměstnavatel'}</span>
                        <span>Sazba {formatRate(r.ratePercent)} ze základu {formatCzk(r.base)}</span>
                      </div>
                      <p className="hpc-route__purpose">
                        {r.purposeCs} Příjemce:{' '}
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
    </div>
  );
}
