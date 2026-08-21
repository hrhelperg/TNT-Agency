import LocalePage from '../../components/locale/LocalePage'
import EmployerRequestForm from '../../components/EmployerRequestForm'
import { DE_CONTENT } from '../../lib/locale/content/de'

// Thin route wrapper. Identity, URL, canonical and hreflang all resolve through
// the locale registry; the copy is a server-rendered content object.
export default function RequestStaffDePage() {
  return <LocalePage
      conceptId="request-staff"
      locale="de"
      content={DE_CONTENT['request-staff'].de!}
      // The Czech primary of this concept is the request form itself. Rendering
      // the same component keeps field names, validation and submission identical
      // across locales; its copy is already trilingual in REQUEST_COPY.
      afterContent={<EmployerRequestForm />}
    />
}
