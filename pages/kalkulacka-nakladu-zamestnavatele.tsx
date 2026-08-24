import SeoArticle from '../components/SeoArticle'
import CzEmployerCostCalculator from '../components/CzEmployerCostCalculator'
import { KALKULACKA_NAKLADU_ZAMESTNAVATELE } from '../lib/content/pages/employer-cost-calculator'

// The tool renders above the article, not instead of it.
//
// The prose is what makes the numbers auditable: it names the statute behind
// each rate, states which rules the calculator will not model, and says why. It
// is also the whole page for a visitor without JavaScript — the calculator needs
// scripting, the explanation does not, and a crawler reads the explanation.
export default function KalkulackaNakladuZamestnavatelePage() {
  return (
    <SeoArticle
      page={KALKULACKA_NAKLADU_ZAMESTNAVATELE}
      activePage="kalkulacka-nakladu-zamestnavatele"
      topSlot={<CzEmployerCostCalculator />}
    />
  )
}
