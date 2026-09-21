/**
 * Brazilian Portuguese locale corpus — the candidate layer.
 *
 * Structured like the en/de corpora, and deliberately NOT a translation of
 * them: those are employer content. Clusters here follow the candidate journey
 * frozen in docs/locale-ptbr-es-route-matrix.md.
 *
 * mergeCorpora rejects a concept defined twice — silently letting one cluster
 * overwrite another is precisely the failure a split like this invites.
 */
import type { LocaleCorpus } from '../types'
import { mergeCorpora } from '../merge'

export const PTBR_CONTENT: LocaleCorpus = mergeCorpora('pt-BR', [])
