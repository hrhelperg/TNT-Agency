/**
 * German locale corpus.
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
import { DE_L0 } from './l0'
import { DE_EMPLOYER } from './employer'
import { DE_TRUST } from './trust'
import { DE_WORKFORCE } from './workforce'
import { DE_INDUSTRIES } from './industries'
import { DE_SPECIALISTS } from './specialists'

export const DE_CONTENT: LocaleCorpus = mergeCorpora('de', [
  ['l0', DE_L0],
  ['employer', DE_EMPLOYER],
  ['trust', DE_TRUST],
  ['workforce', DE_WORKFORCE],
  ['industries', DE_INDUSTRIES],
  ['specialists', DE_SPECIALISTS],
])
