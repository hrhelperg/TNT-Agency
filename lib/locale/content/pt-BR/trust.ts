/**
 * PT-BR — trust surfaces: about and contact.
 *
 * These two are Czech-derived shared concepts: the same company facts serve an
 * employer and a candidate identically, which is why they legitimately cluster
 * with /o-nas and /contact while the candidate corpus around them does not.
 *
 * Only verified operator facts appear. companyId and the MPSV agency permit are
 * gated as unverified in trust-data.ts and are therefore absent — a trust page
 * that invents a licence number is worse than one that admits it has not been
 * confirmed, and the readers here are being asked to consider moving countries.
 */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { freshness } from '../freshness'
import {
  OPERATOR_EMAIL,
  OPERATOR_LEGAL_NAME,
  OPERATOR_PHONE,
  OPERATOR_SEAT,
} from '../../../content/trust-data'

export const PTBR_TRUST: LocaleCorpus = {
  'about-us': {
    'pt-BR': {
      title: 'Sobre a TalentPartnerID | TalentPartnerID',
      description:
        'Quem opera a TalentPartnerID, o que fazemos, o que não fazemos e como verificar de forma independente o que dizemos sobre nós.',
      h1: 'Sobre nós',
      intro:
        'Você está avaliando informação de uma empresa que não conhece, sobre uma decisão que pode mudar a sua vida. Esta página existe para que você possa verificar quem somos em vez de acreditar.',
      breadcrumb: 'Sobre nós',
      sections: [
        {
          heading: 'Quem opera este site',
          body: [
            `A TalentPartnerID é operada pela ${OPERATOR_LEGAL_NAME}, sociedade constituída na República Tcheca, com sede em ${OPERATOR_SEAT}.`,
            'A existência e os dados de registro da empresa podem ser consultados de forma independente no registro público tcheco de entidades econômicas, sem depender do que dizemos aqui.',
          ],
        },
        {
          heading: 'O que publicamos e o que não publicamos sobre nós',
          body: [
            'Publicamos apenas os dados da empresa que estão conferidos junto ao registro oficial: a denominação social e a sede.',
            'Não publicamos o número de identificação da pessoa jurídica nem o número de licença de agência de emprego, porque ainda não estão confirmados no registro oficial. Preferimos deixar essa lacuna visível a preenchê-la com algo não confirmado — e ela será preenchida quando a verificação estiver feita.',
          ],
        },
        {
          heading: 'O que fazemos',
          body: [
            'Recrutamento: avaliamos candidaturas, apresentamos candidatos a empregadores tchecos e explicamos o processo e os seus limites.',
            'Publicamos também informação sobre trabalho legal na República Tcheca, com indicação de fonte oficial e da data em que foi verificada.',
          ],
        },
        {
          heading: 'O que não fazemos',
          body: [
            'Não somos um órgão do Estado tcheco, uma embaixada, uma autoridade de imigração nem uma instituição da União Europeia, e não temos qualquer relação institucional com essas entidades.',
            'Não emitimos vistos nem autorizações de residência, não decidimos pedidos, não influenciamos prazos e não garantimos resultados. Não cobramos do candidato.',
          ],
        },
        {
          heading: 'Como verificar o que afirmamos',
          body: [
            'Cada página desta seção indica as fontes oficiais em que se baseia e a data da última verificação. As fontes são instituições tchecas, não intermediários.',
            'Se encontrar divergência entre o que dizemos e a fonte oficial, é a fonte oficial que vale — e agradecemos o aviso.',
          ],
        },
      ],
      cta: { label: 'Contato', targetConceptId: 'contact' },
      freshness: freshness('conceptual', [LATAM_SRC.labourOffice], 'LATAM'),
    },
  },

  contact: {
    'pt-BR': {
      title: 'Contato | TalentPartnerID',
      description:
        'Como falar com a TalentPartnerID: e-mail, telefone e sede na República Tcheca. Para candidaturas, use a página de candidatura.',
      h1: 'Contato',
      intro:
        'Para enviar uma candidatura, use a página de candidatura — assim a sua mensagem chega com as informações necessárias. Para qualquer outro assunto, os contatos estão abaixo.',
      breadcrumb: 'Contato',
      sections: [
        {
          heading: 'Dados de contato',
          body: [
            `E-mail: ${OPERATOR_EMAIL}`,
            `Telefone: ${OPERATOR_PHONE}`,
            `${OPERATOR_LEGAL_NAME}, ${OPERATOR_SEAT}, República Tcheca`,
          ],
        },
        {
          heading: 'Escreva em português',
          body: [
            'Você pode escrever em português ou em espanhol. Responder no seu idioma é mais seguro do que depender de tradução aproximada dos dois lados.',
          ],
        },
        {
          heading: 'O que não podemos responder',
          body: [
            'Não damos aconselhamento jurídico nem migratório sobre casos individuais, e não podemos consultar o andamento de um pedido apresentado às autoridades tchecas — não temos acesso a isso.',
            'Para saber o andamento de um pedido, procure a representação onde você apresentou o pedido ou à autoridade competente.',
          ],
        },
        {
          heading: 'Se alguém pedir dinheiro em nosso nome',
          body: [
            'Não cobramos do candidato em nenhuma etapa e não temos intermediários autorizados a cobrar em nosso nome.',
            'Se isso acontecer, não pague e avise-nos pelo e-mail acima.',
          ],
        },
      ],
      cta: { label: 'Candidate-se', targetConceptId: 'candidate-apply' },
      freshness: freshness('conceptual', [LATAM_SRC.labourOffice], 'LATAM'),
    },
  },
}
