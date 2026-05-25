import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function NakladyNaZamestnanceOlomouckyKrajPage() {
  return <SeoArticle page={findSeoPage('naklady-na-zamestnance-olomoucky-kraj')!} activePage="naklady-na-zamestnance-olomoucky-kraj" />
}
