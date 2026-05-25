import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function TrhPraceLibereckyKrajPage() {
  return <SeoArticle page={findSeoPage('trh-prace-liberecky-kraj')!} activePage="trh-prace-liberecky-kraj" />
}
