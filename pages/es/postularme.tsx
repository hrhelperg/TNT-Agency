import LocalePage from '../../components/locale/LocalePage'
import CandidateApplicationForm from '../../components/locale/CandidateApplicationForm'
import { ES_CONTENT } from '../../lib/locale/content/es'

// Hand-written — see pages/pt-br/candidatar-se.tsx for why.
export default function CandidateApplyEsPage() {
  return (
    <LocalePage
      conceptId="candidate-apply"
      locale="es"
      content={ES_CONTENT['candidate-apply'].es!}
      afterContent={<CandidateApplicationForm locale="es" />}
    />
  )
}
