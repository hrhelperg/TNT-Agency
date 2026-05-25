import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function NakladyNaZamestnanceKarlovarskyKrajPage() {
  return <SeoArticle page={findSeoPage('naklady-na-zamestnance-karlovarsky-kraj')!} activePage="naklady-na-zamestnance-karlovarsky-kraj" />
}
