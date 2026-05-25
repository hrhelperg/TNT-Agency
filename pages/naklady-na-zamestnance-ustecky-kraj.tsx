import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function NakladyNaZamestnanceUsteckyKrajPage() {
  return <SeoArticle page={findSeoPage('naklady-na-zamestnance-ustecky-kraj')!} activePage="naklady-na-zamestnance-ustecky-kraj" />
}
