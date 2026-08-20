import LocalePage from '../../components/locale/LocalePage'
import { EN_CONTENT } from '../../lib/locale/content/en'

// Thin route wrapper. Identity, URL, canonical and hreflang all resolve through
// the locale registry; the copy is a server-rendered content object. Nothing
// here depends on the client dictionary.
export default function HowAgencyWorksEnPage() {
  return <LocalePage conceptId="how-agency-works" locale="en" content={EN_CONTENT['how-agency-works'].en!} />
}
