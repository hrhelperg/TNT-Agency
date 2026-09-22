/**
 * Primary sources for Czech labour law.
 *
 * The companion to sources-latam.ts, which covers immigration, consular and
 * regulated-profession law. Kept separate because the two axes age differently:
 * an immigration procedure changes when a ministry revises a form, while the
 * wage figures below have a fixed expiry date written into the instrument that
 * sets them.
 *
 * Verified 2026-09-22 — see docs/czech-labour-law-source-audit-2026.md for the
 * quoted Czech sentence behind every claim that cites these. Nothing here was
 * written from memory: the audit recorded two provisions (probation, notice)
 * whose in-force values differ from the figures commonly quoted, and one
 * protection that was repealed entirely.
 */
import type { LocaleSource } from './types'

const ACCESSED = '2026-09-22'

export const LABOUR_SRC = {
  /** Zákoník práce — working time, rest, overtime, night work, pay, agency work. */
  labourCode: {
    id: 'zakon-262-2006',
    name: 'Zákon č. 262/2006 Sb., zákoník práce',
    publisher: 'Sbírka zákonů ČR',
    url: 'https://www.zakonyprolidi.cz/cs/2006-262',
    accessedAt: ACCESSED,
  },
  /** MPSV guidance page carrying the 2026 amounts and the calculation method. */
  minimumWage: {
    id: 'mpsv-minimalni-mzda',
    name: 'Minimální mzda',
    publisher: 'Ministerstvo práce a sociálních věcí ČR',
    url: 'https://mpsv.gov.cz/minimalni-mzda',
    accessedAt: ACCESSED,
  },
  /**
   * The instrument that actually sets the 2026 figure.
   *
   * Cited separately from the guidance page because a guidance page can be
   * rewritten without the law changing, and the law can change without the
   * guidance page being rewritten.
   */
  minimumWageNotice: {
    id: 'sdeleni-356-2025',
    name: 'Sdělení MPSV č. 356/2025 Sb. o vyhlášení minimální mzdy pro rok 2026',
    publisher: 'Sbírka zákonů a mezinárodních smluv',
    url: 'https://mpsv.gov.cz/minimalni-mzda',
    accessedAt: ACCESSED,
  },
  /** Enforcement — where a worker takes a pay or conditions complaint. */
  labourInspection: {
    id: 'suip-inspekce-prace',
    name: 'Státní úřad inspekce práce',
    publisher: 'Státní úřad inspekce práce',
    url: 'https://www.suip.cz/',
    accessedAt: ACCESSED,
  },
} as const satisfies Record<string, LocaleSource>
