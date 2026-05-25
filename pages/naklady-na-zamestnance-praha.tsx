import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function NakladyNaZamestnancePrahaPage() {
  return <SeoArticle page={findSeoPage('naklady-na-zamestnance-praha')!} activePage="naklady-na-zamestnance-praha" />
}
