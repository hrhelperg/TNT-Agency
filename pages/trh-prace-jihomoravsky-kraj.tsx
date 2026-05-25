import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function TrhPraceJihomoravskyKrajPage() {
  return <SeoArticle page={findSeoPage('trh-prace-jihomoravsky-kraj')!} activePage="trh-prace-jihomoravsky-kraj" />
}
