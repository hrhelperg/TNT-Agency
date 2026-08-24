import LocalePage from '../../components/locale/LocalePage'
import CzEmployerCostCalculator from '../../components/CzEmployerCostCalculator'
import { EN_CONTENT } from '../../lib/locale/content/en'

// Thin route wrapper. Identity, URL, canonical and hreflang resolve through the
// locale registry; the copy is a server-rendered content object.
//
// The calculator mounted here is THE SAME component the Czech page mounts, given
// this page's locale explicitly. One engine, one set of rules, three languages —
// which is what §37 requires and what makes "cs → en → de changes no number"
// checkable rather than aspirational. The locale is passed rather than detected
// because on /en the language is a property of the URL, fixed before any script
// runs; asking the client would render Czech labels until hydration replaced them.
export default function CzechEmployerCostCalculatorEnPage() {
  return (
    <LocalePage
      conceptId="employer-cost-calculator"
      locale="en"
      content={EN_CONTENT['employer-cost-calculator'].en!}
      beforeContent={<CzEmployerCostCalculator locale="en" />}
    />
  )
}
