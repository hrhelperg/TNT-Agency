import SeoArticle from '../components/SeoArticle'
import VacancyCostTool from '../components/VacancyCostTool'
import { CENA_NEOBSAZENE_POZICE } from '../lib/content'

// The tool renders above the article, not instead of it: the prose explains what
// belongs in a vacancy-cost estimate and where each figure comes from, which is
// the context an employer needs before typing numbers into it. No new URL — this
// is the page that already owns the intent.
export default function CenaNeobsazenePozicePage() {
  return (
    <SeoArticle
      page={CENA_NEOBSAZENE_POZICE}
      activePage="cena-neobsazene-pozice"
      topSlot={<VacancyCostTool />}
    />
  )
}
