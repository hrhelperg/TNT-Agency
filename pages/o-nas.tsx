import Head from 'next/head'
import LocaleAlternates from '../components/locale/LocaleAlternates'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  TRUST_DATA,
  OFFICIAL_SOURCES,
  isPublicFact,
  type VerifiedTrustField,
} from '../lib/content/trust-data'

// Verification-gated trust page (Batch 2). Publishes only verified operator
// facts; company-registration and agency-permit fields render as an honest
// "ověření probíhá" note (never a fabricated value) until the operator supplies
// the official MPSV evidence. The page delivers value regardless via the
// "how to verify an employment agency" guidance. Enforced by scripts/validate-trust.js.

const URL = 'https://talentpartnerid.com/o-nas'

const factRows: Array<{ label: string; field: VerifiedTrustField }> = [
  { label: 'Obchodní firma (provozovatel)', field: TRUST_DATA.legalName },
  { label: 'Sídlo', field: TRUST_DATA.registeredSeat },
  { label: 'Kontaktní e-mail', field: TRUST_DATA.contactEmail },
  { label: 'Telefon', field: TRUST_DATA.telephone },
]

const pendingRows: Array<{ label: string; field: VerifiedTrustField }> = [
  { label: 'IČO', field: TRUST_DATA.companyId },
  { label: 'Povolení ke zprostředkování zaměstnání', field: TRUST_DATA.agencyPermission },
  { label: 'Rozsah povolení', field: TRUST_DATA.permissionScope },
  { label: 'Platnost povolení', field: TRUST_DATA.permissionValidity },
]

export default function ONas() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TalentPartnerID',
    legalName: TRUST_DATA.legalName.value,
    url: 'https://talentpartnerid.com',
    email: TRUST_DATA.contactEmail.value,
    telephone: TRUST_DATA.telephone.value,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Na Spravedlnosti 1533',
      addressLocality: 'Pardubice',
      postalCode: '530 02',
      addressCountry: 'CZ',
    },
  }
  return (
    <>
      <Head>
        <title>O nás a ověření agentury | TalentPartnerID</title>
        <meta
          name="description"
          content="Kdo provozuje TalentPartnerID, jak ověřit agenturu práce v ČR a jaké údaje zveřejňujeme až po ověření z oficiálních zdrojů (ARES, evidence agentur práce MPSV)."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={URL} />
        {/* Reciprocal hreflang from the locale registry. */}
        <LocaleAlternates route="/o-nas" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content="O nás a ověření agentury | TalentPartnerID" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </Head>

      <Header />

      <section className="page-hero" id="top">
        <div className="container">
          <div className="eyebrow eyebrow--light fi">Důvěra a transparentnost</div>
          <h1 className="fi d1">O nás a ověření agentury</h1>
          <p className="page-hero__sub fi d2">
            Kdo web provozuje, které údaje jsou ověřené a jak si samostatně ověříte kteroukoli
            agenturu práce v České republice.
          </p>
        </div>
        <div className="page-hero__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="legal-content" lang="cs">

            <h2>Provozovatel</h2>
            <p>
              Web TalentPartnerID provozuje společnost <strong>{TRUST_DATA.legalName.value}</strong>.
              Níže uvádíme pouze ověřené identifikační a kontaktní údaje.
            </p>
            <table className="legal-table">
              <tbody>
                {factRows.filter((r) => isPublicFact(r.field)).map((r) => (
                  <tr key={r.label}>
                    <th>{r.label}</th>
                    <td>
                      {r.field.value}
                      {r.field.sourceUrl ? (
                        <>
                          {' '}
                          <a href={r.field.sourceUrl} target="_blank" rel="noopener noreferrer">
                            (zdroj: {r.field.sourceTitle})
                          </a>
                        </>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>Údaje o povolení – zveřejníme až po ověření</h2>
            <p>
              Následující údaje <strong>záměrně nezveřejňujeme jako fakta</strong>, dokud je
              neověříme přímo z oficiální evidence. Neuvádíme žádné odhadované ani orientační
              hodnoty. Po ověření zde doplníme přesnou hodnotu, odkaz na oficiální zdroj a datum
              ověření.
            </p>
            <ul>
              {pendingRows.map((r) => (
                <li key={r.label}>
                  <strong>{r.label}:</strong> ověření probíhá
                </li>
              ))}
            </ul>
            <p>
              Nepoužíváme formulace jako „ověřeno MPSV“, „schváleno státem“ ani „licencováno pro
              všechny formy“ — takové tvrzení by muselo přesně odpovídat oficiálnímu záznamu.
            </p>

            <h2>Jak si ověříte agenturu práce v ČR</h2>
            <p>
              Doporučujeme rozlišovat dvě různé věci, které se často zaměňují:
            </p>
            <ul>
              <li>
                <strong>Registrace společnosti</strong> — že firma existuje jako právnická osoba.
                Ověříte v <a href={OFFICIAL_SOURCES.ares.url} target="_blank" rel="noopener noreferrer">{OFFICIAL_SOURCES.ares.title}</a>
                {' '}nebo ve <a href={OFFICIAL_SOURCES.justice.url} target="_blank" rel="noopener noreferrer">{OFFICIAL_SOURCES.justice.title}</a>.
              </li>
              <li>
                <strong>Povolení ke zprostředkování zaměstnání</strong> — že smí zprostředkovávat
                zaměstnání (např. formou dočasného přidělení). To je samostatné oprávnění podle
                zákona č. 435/2004 Sb. a ověříte je v
                {' '}<a href={OFFICIAL_SOURCES.mpsvAgencies.url} target="_blank" rel="noopener noreferrer">{OFFICIAL_SOURCES.mpsvAgencies.title}</a>.
              </li>
            </ul>
            <p>Při ověřování porovnávejte zejména:</p>
            <ul>
              <li>přesný název a IČO společnosti,</li>
              <li>zda má platné povolení ke zprostředkování zaměstnání,</li>
              <li>jakou formu zprostředkování povolení pokrývá,</li>
              <li>platnost povolení.</li>
            </ul>
            <p>
              Buďte obezřetní u agentur, které slibují „garantované“ pracovníky, „okamžitý nástup“
              nebo se prezentují jako „státem prověřené“ — takové formulace nemají oporu v oficiální
              evidenci.
            </p>

            <h2>Jak ověřujeme obsah my</h2>
            <p>
              Informace na tomto webu zpracováváme redakčně na základě oficiálních zdrojů (ČSÚ,
              MPSV, Úřad práce ČR, ČSSZ, MV ČR) a konkrétní čísla, sazby a lhůty odkazujeme přímo do
              těchto zdrojů. Nezobrazujeme vymyšlené údaje, když aktuální data nejsou k dispozici.
              Jde o obecné informace, nikoli o individuální právní poradenství. Podrobně to popisují
              naše <a href="/redakcni-zasady">redakční zásady a zdroje</a>.
            </p>

            <h2>Kontakt, stížnosti a ochrana údajů</h2>
            <p>
              Kontakt: <a href={`mailto:${TRUST_DATA.contactEmail.value}`}>{TRUST_DATA.contactEmail.value}</a>,{' '}
              <a href={`tel:${(TRUST_DATA.telephone.value || '').replace(/\s/g, '')}`}>{TRUST_DATA.telephone.value}</a>.
              Zpracování osobních údajů popisuje naše <a href="/privacy-policy">ochrana osobních údajů</a>.
              Dozorovým úřadem pro ochranu osobních údajů je Úřad pro ochranu osobních údajů
              (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">uoou.cz</a>).
            </p>

            <p className="seo-editorial-note">
              Redakčně zpracovala redakce TalentPartnerID na základě uvedených oficiálních zdrojů.
              Obsah je obecná informace, nikoli individuální právní poradenství. Přečtěte si naše{' '}
              <a href="/redakcni-zasady">redakční zásady a zdroje</a>.
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
