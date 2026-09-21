/**
 * PT-BR — candidate FAQ.
 *
 * Every legal answer is short, direct and source-backed. Questions are phrased
 * the way candidates actually ask them, including the ones we would rather not
 * be asked — a FAQ that only answers comfortable questions is marketing.
 */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { freshness } from '../freshness'

export const PTBR_FAQ: LocaleCorpus = {
  'candidate-faq': {
    'pt-BR': {
      title: 'Perguntas frequentes de candidatos | TalentPartnerID',
      description:
        'Respostas diretas sobre trabalhar na República Tcheca: cartão de empregado, acordo UE–Mercosul, isenção de visto, prazos, custos e o que a TalentPartnerID pode e não pode fazer.',
      h1: 'Perguntas frequentes',
      intro:
        'Respostas curtas às perguntas que mais recebemos. Onde a resposta depende de legislação ou de procedimento oficial, indicamos a fonte — e a data em que a verificamos.',
      breadcrumb: 'Perguntas frequentes',
      sections: [
        {
          heading: 'O acordo UE–Mercosul permite trabalhar na República Tcheca sem autorização?',
          body: [
            'Não. O acordo entre a União Europeia e o Mercosul, aplicado provisoriamente desde 1 de maio de 2026, é um acordo comercial. Em matéria de pessoas, ele prevê apenas a entrada temporária de prestadores de serviços — transferências dentro da mesma empresa e prestadores contratuais — para fins de negócios.',
            'Ele não concede a cidadãos brasileiros ou de outros países do Mercosul o direito geral de assumir emprego na União Europeia. Para trabalhar na República Tcheca continua sendo necessária uma autorização tcheca: normalmente o cartão de empregado (zaměstnanecká karta) ou, quando a função e o empregador cumprirem as condições, o programa de trabalhador altamente qualificado.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Posso entrar como turista e procurar trabalho por 90 dias?',
          body: [
            'Entrar, sim. Trabalhar, não. Cidadãos brasileiros estão isentos de visto para estadas de até 90 dias no espaço Schengen desde que a finalidade da viagem não seja atividade remunerada.',
            'Procurar trabalho não é a mesma coisa que trabalhar, mas começar a trabalhar durante uma estada de turismo é trabalho não autorizado — com consequências tanto para o trabalhador quanto para o empregador.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'O Brasil participa do Programa de trabalhador qualificado?',
          body: [
            'Não. O Program kvalifikovaný zaměstnanec, que abrange as classes CZ-ISCO 4 a 8, aplica-se a uma lista fechada de países e o Brasil não está nela — nem qualquer país da América Latina.',
            'O Program vysoce kvalifikovaný zaměstnanec é diferente: não tem limitação territorial, aplica-se a trabalhadores de todos os países terceiros e abrange as classes CZ-ISCO 1 a 3. Um candidato brasileiro pode participar quando a função concreta, o empregador e as condições forem cumpridos.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'A TalentPartnerID garante um visto de dois anos?',
          body: [
            'Não, e ninguém pode. A TalentPartnerID não emite vistos nem autorizações de residência — quem decide é a autoridade tcheca.',
            'O que existe é um limite legal: o cartão de empregado é emitido pelo período do contrato de trabalho e por no máximo dois anos de cada vez, podendo ser prorrogado. Dois anos é um teto, não uma garantia, e a duração concedida depende do contrato e da decisão da autoridade.',
          ],
        },
        {
          heading: 'Preciso falar tcheco?',
          body: [
            'Depende da função. Em muitas funções técnicas e industriais o inglês é suficiente no início, e o empregador informa o que espera.',
            'Em profissões regulamentadas — em especial na área da saúde — a competência em tcheco é um requisito legal do reconhecimento profissional, e não há como contorná-la.',
          ],
        },
        {
          heading: 'Vocês cobram alguma taxa do candidato?',
          body: [
            'Não. Candidatar-se, ser avaliado e ser apresentado a um empregador não têm custo para o candidato.',
            'Existem custos que não são nossos e que continuam existindo: taxas administrativas do pedido, traduções, legalização de documentos e a viagem. Esses valores são fixados por terceiros e devem ser conferidos nas fontes oficiais.',
          ],
        },
        {
          heading: 'Vocês têm uma lista de vagas abertas?',
          body: [
            'Não publicamos lista de vagas neste site. As necessidades chegam de empregadores e mudam, e uma lista desatualizada faria alguém planejar uma mudança de país com base em uma posição que já foi preenchida.',
            'O que fazemos é avaliar a candidatura e entrar em contato quando houver correspondência real com uma necessidade concreta.',
          ],
        },
        {
          heading: 'Quanto tempo demora o processo?',
          body: [
            'Não damos uma estimativa própria. Os prazos de decisão são definidos pelas autoridades tchecas, variam conforme o tipo de pedido e mudam ao longo do tempo, e a disponibilidade de horários no posto consular também varia.',
            'Consulte os prazos na fonte oficial. Qualquer número que apareça aqui envelheceria antes de você precisar dele.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Onde eu apresento o pedido no Brasil?',
          body: [
            'Depende do seu estado. A Embaixada em Brasília e o Consulado-Geral em São Paulo atendem estados diferentes, e apresentar o pedido no posto errado é um problema caro de resolver.',
            'A página sobre a representação tcheca no Brasil explica a divisão de competência e leva às páginas oficiais em português.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Alguém me pediu dinheiro dizendo representar vocês. É legítimo?',
          body: [
            'Não. Não cobramos do candidato e não temos intermediários que cobrem em nosso nome para garantir vaga, visto ou prioridade na fila.',
            'Se isso acontecer, não pague e nos avise pelo endereço de contato publicado neste site.',
          ],
        },
      ],
      cta: { label: 'Candidatar-se', targetConceptId: 'candidate-apply' },
      freshness: freshness(
        'conceptual',
        [
          LATAM_SRC.mercosur,
          LATAM_SRC.embassyBrasilia,
          LATAM_SRC.programQualified,
          LATAM_SRC.programHighlyQualified,
          LATAM_SRC.residenceAct,
        ],
        'LATAM',
      ),
    },
  },
}
