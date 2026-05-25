import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function NakladyNaZamestnancePlzenskyKrajPage() {
  return <SeoArticle page={findSeoPage('naklady-na-zamestnance-plzensky-kraj')!} activePage="naklady-na-zamestnance-plzensky-kraj" />
}
