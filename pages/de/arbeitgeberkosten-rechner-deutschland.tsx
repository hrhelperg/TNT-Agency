import LocalePage from '../../components/locale/LocalePage'
import DeEmployerCostCalculator from '../../components/DeEmployerCostCalculator'
import { DE_CONTENT } from '../../lib/locale/content/de'

// German payroll, in German.
//
// NOT to be confused with /de/arbeitgeberkosten-rechner-tschechien, which is
// CZECH payroll explained in German and sits one path segment away. The two
// slugs differ only in the country they name, which is deliberate: it is the
// one part of the page a reader sees before any of the content, and
// scripts/validate-route-collisions.mjs keeps them distinct.
export default function ArbeitgeberkostenRechnerDeutschlandDePage() {
  return (
    <LocalePage
      conceptId="germany-employer-cost-calculator"
      locale="de"
      content={DE_CONTENT['germany-employer-cost-calculator'].de!}
      beforeContent={<DeEmployerCostCalculator locale="de" />}
    />
  )
}
