import LocalePage from '../../components/locale/LocalePage'
import { EN_CONTENT } from '../../lib/locale/content/en'

// Thin route wrapper. Identity, URL, canonical and hreflang all resolve through
// the locale registry; the copy is a server-rendered content object. Nothing
// here depends on the client dictionary.
export default function HomeEnPage() {
  return <LocalePage conceptId="home" locale="en" content={EN_CONTENT['home'].en!} />
}
