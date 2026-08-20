// Recruitment process — the employer-facing "how it works", as typed copy.
//
// WHY THIS EXISTS
// The three steps already existed, but only in the client-side i18n dictionary
// and only on /agencies, rendered into an empty <div id="processSteps"> after
// hydration. So the server HTML contained no process at all: a buyer arriving
// from an outreach message — or a crawler — could not learn what happens after
// they get in touch. This module makes the same three steps server-rendered and
// reusable, without inventing a process the operator does not run.
//
// WHAT WAS CORRECTED, NOT PROPAGATED
// The original standfirst read "…respektuje váš čas a přináší výsledky —
// pokaždé" ("delivers results — every time"). That is an outcome guarantee the
// operator cannot support, so it is not carried over. The replacement describes
// the process without promising its result.
//
// WHAT IS DELIBERATELY ABSENT
// No response time, no shortlist size, no candidate volume, no time-to-hire, no
// replacement guarantee, no claim about permitted mediation scope — the agency
// permit fields in lib/content/trust-data.ts are unverified, so no copy here may
// imply a verified scope. Step three states only that terms are agreed
// contractually, which is true and commits to nothing.

import type { Lang } from '../i18n/react'

export interface ProcessStep {
  num: string
  title: string
  desc: string
}

type L<T> = Record<Lang, T>

export const PROCESS_EYEBROW: L<string> = {
  cs: 'Jak to funguje',
  en: 'How it works',
  de: 'So funktioniert es',
}

export const PROCESS_HEADING: L<string> = {
  cs: 'Od zadání po nástup ve třech krocích',
  en: 'From brief to start date in three steps',
  de: 'Von der Anforderung bis zum Eintritt in drei Schritten',
}

/** Describes the process. Says nothing about its outcome. */
export const PROCESS_SUB: L<string> = {
  cs: 'Co se stane poté, co se ozvete: jak upřesníme zadání, jak hledáme a ověřujeme kandidáty a co je na vaší straně.',
  en: 'What happens after you get in touch: how the brief is defined, how candidates are found and verified, and what is on your side.',
  de: 'Was nach Ihrer Anfrage passiert: wie die Anforderung präzisiert wird, wie Kandidaten gesucht und geprüft werden und was auf Ihrer Seite liegt.',
}

export const PROCESS_STEPS: L<readonly ProcessStep[]> = {
  cs: [
    {
      num: '01',
      title: 'Zadáte požadavky',
      desc: 'Probereme pozici, pracoviště, směnný režim, požadovanou kvalifikaci a případná oprávnění. Čím přesnější zadání, tím lépe odpovídají předložení kandidáti.',
    },
    {
      num: '02',
      title: 'Hledáme kandidáty',
      desc: 'Kombinujeme inzerci, oslovování kandidátů a doporučení. U odborných pozic klademe důraz na ověření kvalifikace a dokladů, které pozice vyžaduje.',
    },
    {
      num: '03',
      title: 'Předáváme výběr',
      desc: 'Předáme kandidáty, kteří odpovídají zadání, zkoordinujeme pohovory a podpoříme nástup. Rozsah spolupráce a podmínky se sjednávají smluvně.',
    },
  ],
  en: [
    {
      num: '01',
      title: 'You define the requirement',
      desc: 'We go through the role, the workplace, the shift pattern, the qualifications required and any authorisations. The more precise the brief, the closer the candidates put forward will match it.',
    },
    {
      num: '02',
      title: 'We search and verify',
      desc: 'We combine advertising, direct approaches and referrals. For specialist roles the emphasis is on verifying the qualifications and documents the position requires.',
    },
    {
      num: '03',
      title: 'You review the selection',
      desc: 'We hand over the candidates who match the brief, coordinate interviews and support the start. The scope of cooperation and the terms are agreed contractually.',
    },
  ],
  de: [
    {
      num: '01',
      title: 'Sie definieren die Anforderung',
      desc: 'Wir besprechen Position, Einsatzort, Schichtmodell, geforderte Qualifikation und etwaige Berechtigungen. Je präziser die Anforderung, desto genauer passen die vorgestellten Kandidaten.',
    },
    {
      num: '02',
      title: 'Wir suchen und prüfen',
      desc: 'Wir kombinieren Anzeigen, Direktansprache und Empfehlungen. Bei Fachpositionen liegt der Schwerpunkt auf der Prüfung der Qualifikationen und Nachweise, die die Stelle verlangt.',
    },
    {
      num: '03',
      title: 'Sie prüfen die Auswahl',
      desc: 'Wir übergeben die Kandidaten, die der Anforderung entsprechen, koordinieren Gespräche und begleiten den Eintritt. Umfang und Konditionen der Zusammenarbeit werden vertraglich vereinbart.',
    },
  ],
}
