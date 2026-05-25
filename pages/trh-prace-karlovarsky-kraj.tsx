import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function TrhPraceKarlovarskyKrajPage() {
  return <SeoArticle page={findSeoPage('trh-prace-karlovarsky-kraj')!} activePage="trh-prace-karlovarsky-kraj" />
}
