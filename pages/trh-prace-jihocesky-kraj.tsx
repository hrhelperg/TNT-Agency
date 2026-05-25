import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function TrhPraceJihoceskyKrajPage() {
  return <SeoArticle page={findSeoPage('trh-prace-jihocesky-kraj')!} activePage="trh-prace-jihocesky-kraj" />
}
