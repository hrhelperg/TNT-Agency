import SeoArticle from '../components/SeoArticle'
import EmployerSituations from '../components/EmployerSituations'
import { PRO_ZAMESTNAVATELE } from '../lib/content'

// Employer hub — organised first by employer situation (server-rendered entry
// cards), then the supporting long-form guidance from the content model.
export default function ProZamestnavatelePage() {
  return (
    <SeoArticle
      page={PRO_ZAMESTNAVATELE}
      activePage="pro-zamestnavatele"
      topSlot={<EmployerSituations />}
    />
  )
}
