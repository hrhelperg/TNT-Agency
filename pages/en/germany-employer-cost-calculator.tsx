import LocalePage from '../../components/locale/LocalePage'
import DeEmployerCostCalculatorBoundary from '../../components/DeEmployerCostCalculatorBoundary'
import { EN_CONTENT } from '../../lib/locale/content/en'

// Thin route wrapper; the locale is passed explicitly rather than detected, so
// server and client cannot disagree about how to format a number.
export default function GermanyEmployerCostCalculatorEnPage() {
  return (
    <LocalePage
      conceptId="germany-employer-cost-calculator"
      locale="en"
      content={EN_CONTENT['germany-employer-cost-calculator'].en!}
      beforeContent={<DeEmployerCostCalculatorBoundary locale="en" />}
    />
  )
}
