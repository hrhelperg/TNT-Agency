import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function NakladyNaZamestnanceMoravskoslezskyKrajPage() {
  return <SeoArticle page={findSeoPage('naklady-na-zamestnance-moravskoslezsky-kraj')!} activePage="naklady-na-zamestnance-moravskoslezsky-kraj" />
}
