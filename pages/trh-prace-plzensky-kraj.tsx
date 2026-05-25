import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function TrhPracePlzenskyKrajPage() {
  return <SeoArticle page={findSeoPage('trh-prace-plzensky-kraj')!} activePage="trh-prace-plzensky-kraj" />
}
