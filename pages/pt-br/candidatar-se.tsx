import LocalePage from '../../components/locale/LocalePage'
import CandidateApplicationForm from '../../components/locale/CandidateApplicationForm'
import { PTBR_CONTENT } from '../../lib/locale/content/pt-BR'

// Hand-written, so scripts/generate-locale-pages.mjs leaves it alone.
//
// The concept's substance is the form, and the prose above it is what makes the
// form usable — particularly the four steps, of which the third (attach the CV)
// is the one people miss. So the explanation renders first and the form follows
// it, via afterContent, exactly as request-staff does on the employer side.
export default function CandidateApplyPtBRPage() {
  return (
    <LocalePage
      conceptId="candidate-apply"
      locale="pt-BR"
      content={PTBR_CONTENT['candidate-apply']['pt-BR']!}
      afterContent={<CandidateApplicationForm locale="pt-BR" />}
    />
  )
}
