import LocalePage from '../../components/locale/LocalePage'
import EmployerRequestForm from '../../components/EmployerRequestForm'
import { EN_CONTENT } from '../../lib/locale/content/en'

// Thin route wrapper. Identity, URL, canonical and hreflang all resolve through
// the locale registry; the copy is a server-rendered content object. Nothing
// here depends on the client dictionary.
export default function RequestStaffEnPage() {
  return <LocalePage
      conceptId="request-staff"
      locale="en"
      content={EN_CONTENT['request-staff'].en!}
      // The Czech primary of this concept is the request form itself. Rendering
      // the same component keeps field names, validation and submission identical
      // across locales; its copy is already trilingual in REQUEST_COPY.
      afterContent={<EmployerRequestForm />}
    />
}
