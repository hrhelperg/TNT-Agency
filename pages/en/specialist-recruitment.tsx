import LocalePage from '../../components/locale/LocalePage'
import { EN_CONTENT } from '../../lib/locale/content/en'

// Thin route wrapper. Identity, URL, canonical and hreflang all resolve through
// the locale registry; the copy is a server-rendered content object. Nothing
// here depends on the client dictionary.
export default function SpecialistRecruitmentEnPage() {
  return <LocalePage conceptId="specialist-recruitment" locale="en" content={EN_CONTENT['specialist-recruitment'].en!} />
}
