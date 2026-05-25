import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function TrhPracePrahaPage() {
  return <SeoArticle page={findSeoPage('trh-prace-praha')!} activePage="trh-prace-praha" />
}
