import LocalePage from '../../components/locale/LocalePage'
import { DE_CONTENT } from '../../lib/locale/content/de'

// Thin route wrapper. Identity, URL, canonical and hreflang all resolve through
// the locale registry; the copy is a server-rendered content object.
export default function ContactDePage() {
  return <LocalePage conceptId="contact" locale="de" content={DE_CONTENT['contact'].de!} />
}
