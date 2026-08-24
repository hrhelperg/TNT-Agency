import SeoArticle from '../components/SeoArticle'
import DeEmployerCostCalculator from '../components/DeEmployerCostCalculator'
import { KALKULACKA_NAKLADU_ZAMESTNAVATELE_NEMECKO } from '../lib/content/pages/germany-employer-cost-calculator'

// The Czech-language view of the GERMAN calculator.
//
// The slug carries "nemecko" for the same reason the German-language view of
// the Czech calculator carries "tschechien": a reader arriving from a search
// result meets the jurisdiction in the URL, before the page has said anything.
// Two calculators for two countries in the same three languages is exactly the
// arrangement in which a reader ends up on the wrong one.
export default function KalkulackaNakladuZamestnavateleNemeckoPage() {
  return (
    <SeoArticle
      page={KALKULACKA_NAKLADU_ZAMESTNAVATELE_NEMECKO}
      activePage="kalkulacka-nakladu-zamestnavatele-nemecko"
      topSlot={<DeEmployerCostCalculator locale="cs" />}
    />
  )
}
