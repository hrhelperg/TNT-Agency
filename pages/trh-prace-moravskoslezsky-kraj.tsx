import SeoArticle from '../components/SeoArticle'
import { findSeoPage } from '../lib/content'

export default function TrhPraceMoravskoslezskyKrajPage() {
  return <SeoArticle page={findSeoPage('trh-prace-moravskoslezsky-kraj')!} activePage="trh-prace-moravskoslezsky-kraj" />
}
