/**
 * English locale corpus.
 *
 * Split by cluster rather than kept as one file. L0 was ten concepts and fitted
 * comfortably in a single module; L1 adds thirty-eight, and a two-thousand-line
 * object is a merge-conflict magnet in which a duplicated key is invisible.
 *
 * The split is purely physical. Route identity, the shape of the content and
 * the type contract are unchanged, and the aggregate below is what every page
 * imports — so no page or validator had to change to accommodate it.
 *
 * mergeCorpora rejects a concept defined twice. Silently letting one cluster
 * overwrite another is precisely the failure a split like this invites.
 */
import type { LocaleCorpus } from '../types'
import { mergeCorpora } from '../merge'
import { EN_L0 } from './l0'
import { EN_EMPLOYER } from './employer'
import { EN_TRUST } from './trust'
import { EN_WORKFORCE } from './workforce'
import { EN_INDUSTRIES } from './industries'
import { EN_SPECIALISTS } from './specialists'

export const EN_CONTENT: LocaleCorpus = mergeCorpora('en', [
  ['l0', EN_L0],
  ['employer', EN_EMPLOYER],
  ['trust', EN_TRUST],
  ['workforce', EN_WORKFORCE],
  ['industries', EN_INDUSTRIES],
  ['specialists', EN_SPECIALISTS],
])
