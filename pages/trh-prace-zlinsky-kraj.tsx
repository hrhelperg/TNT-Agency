import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function TrhPraceZlinskyKrajPage() {
  return <SeoArticle page={findSeoPage('trh-prace-zlinsky-kraj')!} activePage="trh-prace-zlinsky-kraj" />
}
