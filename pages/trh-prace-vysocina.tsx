import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function TrhPraceVysocinaPage() {
  return <SeoArticle page={findSeoPage('trh-prace-vysocina')!} activePage="trh-prace-vysocina" />
}
