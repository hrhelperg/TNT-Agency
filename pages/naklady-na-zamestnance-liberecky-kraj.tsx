import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function NakladyNaZamestnanceLibereckyKrajPage() {
  return <SeoArticle page={findSeoPage('naklady-na-zamestnance-liberecky-kraj')!} activePage="naklady-na-zamestnance-liberecky-kraj" />
}
