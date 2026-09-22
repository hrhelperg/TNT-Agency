/**
 * neutral Latin-American Spanish locale corpus — the candidate layer.
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
import { ES_JOURNEY } from './journey'
import { ES_FAQ } from './faq'
import { ES_IMMIGRATION } from './immigration'
import { ES_PROFESSIONS } from './professions'
import { ES_PREPARE } from './prepare'
import { ES_APPLY } from './apply'
import { ES_TRUST } from './trust'

export const ES_CONTENT: LocaleCorpus = mergeCorpora('es', [
  ['journey', ES_JOURNEY],
  ['faq', ES_FAQ],
  ['immigration', ES_IMMIGRATION],
  ['professions', ES_PROFESSIONS],
  ['prepare', ES_PREPARE],
  ['apply', ES_APPLY],
  ['trust', ES_TRUST],
])
