/**
 * Czech-locale formatting helpers for the payroll engine and UI.
 * Pure and deterministic — no locale data beyond Intl (which is stable for cs-CZ).
 */

import { toCzkNumber, type Halere } from './money';

const czkFormatter = new Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const czkPreciseFormatter = new Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('cs-CZ', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('cs-CZ', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** "22 400 Kč" — whole koruny, Czech spacing. */
export function formatCzk(value: Halere): string {
  return czkFormatter.format(toCzkNumber(value));
}

/** "1 234,56 Kč" — with haléře, for line-item detail. */
export function formatCzkPrecise(value: Halere): string {
  return czkPreciseFormatter.format(toCzkNumber(value));
}

/** Plain number with Czech separators. */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** "7,1 %" */
export function formatPercent(value: number): string {
  return `${percentFormatter.format(value)} %`;
}

/** "134,40 Kč/h" for hourly rates. */
export function formatCzkPerHour(value: Halere): string {
  return `${czkPreciseFormatter.format(toCzkNumber(value))}/h`;
}

/** "162,5 h" */
export function formatHours(value: number): string {
  return `${numberFormatter.format(value)} h`;
}
