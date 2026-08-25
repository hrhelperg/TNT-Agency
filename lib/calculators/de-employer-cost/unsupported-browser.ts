/**
 * What a browser without BigInt is told.
 *
 * Its own module, imported by the bootstrap and by nothing else that matters,
 * so the message is reachable without touching a single line of exact
 * arithmetic. NO BIGINT SYNTAX MAY APPEAR HERE — this is the text that has to
 * render on the browsers that cannot parse it.
 *
 * The wording promises exactly what remains true: the calculator is gone, the
 * explanation and the sources are not. It offers no approximate result, because
 * an approximate employer cost is the one thing worse than none.
 */

import type { DeLocale } from './types';

export const UNSUPPORTED_BROWSER: Readonly<Record<DeLocale, string>> = {
  de: 'Dieser Rechner benötigt einen neueren Browser. Die Erläuterungen und Quellen bleiben verfügbar.',
  en: 'This calculator requires a newer browser. The methodology and sources remain available.',
  cs: 'Tato kalkulačka vyžaduje novější prohlížeč. Metodika a zdroje zůstávají dostupné.',
};

/**
 * The capability the calculator needs, tested without using it.
 *
 * `typeof` is the only safe probe: naming `BigInt` directly would throw a
 * ReferenceError on the browsers this is protecting, and a literal would stop
 * the file parsing there at all.
 */
export function hasExactArithmetic(): boolean {
  return typeof BigInt === 'function';
}
