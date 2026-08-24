import LocalePage from '../../components/locale/LocalePage'
import CzEmployerCostCalculator from '../../components/CzEmployerCostCalculator'
import { DE_CONTENT } from '../../lib/locale/content/de'

// Thin route wrapper. See the English counterpart for why the locale is passed
// explicitly rather than detected.
//
// The slug carries "tschechien" deliberately: a German reader meets the
// jurisdiction in the URL, before the page has said anything.
export default function ArbeitgeberkostenRechnerTschechienDePage() {
  return (
    <LocalePage
      conceptId="employer-cost-calculator"
      locale="de"
      content={DE_CONTENT['employer-cost-calculator'].de!}
      beforeContent={<CzEmployerCostCalculator locale="de" />}
    />
  )
}
