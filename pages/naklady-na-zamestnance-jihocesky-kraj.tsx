import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function NakladyNaZamestnanceJihoceskyKrajPage() {
  return <SeoArticle page={findSeoPage('naklady-na-zamestnance-jihocesky-kraj')!} activePage="naklady-na-zamestnance-jihocesky-kraj" />
}
