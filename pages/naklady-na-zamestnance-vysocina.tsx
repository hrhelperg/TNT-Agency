import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function NakladyNaZamestnanceVysocinaPage() {
  return <SeoArticle page={findSeoPage('naklady-na-zamestnance-vysocina')!} activePage="naklady-na-zamestnance-vysocina" />
}
