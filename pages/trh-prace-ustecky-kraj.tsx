import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function TrhPraceUsteckyKrajPage() {
  return <SeoArticle page={findSeoPage('trh-prace-ustecky-kraj')!} activePage="trh-prace-ustecky-kraj" />
}
