import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function NakladyNaZamestnanceZlinskyKrajPage() {
  return <SeoArticle page={findSeoPage('naklady-na-zamestnance-zlinsky-kraj')!} activePage="naklady-na-zamestnance-zlinsky-kraj" />
}
