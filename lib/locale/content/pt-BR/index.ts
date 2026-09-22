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
import { PTBR_JOURNEY } from './journey'
import { PTBR_FAQ } from './faq'
import { PTBR_IMMIGRATION } from './immigration'
import { PTBR_PROFESSIONS } from './professions'
import { PTBR_PREPARE } from './prepare'
import { PTBR_APPLY } from './apply'
import { PTBR_TRUST } from './trust'

export const PTBR_CONTENT: LocaleCorpus = mergeCorpora('pt-BR', [
  ['journey', PTBR_JOURNEY],
  ['faq', PTBR_FAQ],
  ['immigration', PTBR_IMMIGRATION],
  ['professions', PTBR_PROFESSIONS],
  ['prepare', PTBR_PREPARE],
  ['apply', PTBR_APPLY],
  ['trust', PTBR_TRUST],
])
