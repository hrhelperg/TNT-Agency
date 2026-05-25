import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function TrhPraceOlomouckyKrajPage() {
  return <SeoArticle page={findSeoPage('trh-prace-olomoucky-kraj')!} activePage="trh-prace-olomoucky-kraj" />
}
