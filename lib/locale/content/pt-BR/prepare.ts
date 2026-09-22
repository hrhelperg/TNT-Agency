/**
 * PT-BR — preparation: before travelling, after arrival, and the Brazilian
 * consular route.
 *
 * The consular page is the one place where getting a detail wrong costs a
 * candidate a flight, so two rules govern it. It names the Embassy in Brasília
 * and the Consulate General in São Paulo SEPARATELY — calling both "consulate"
 * would reproduce in our own copy the confusion the page exists to prevent. And
 * it never freezes appointment windows, slot counts, fees or processing times:
 * it describes the mechanism and links the official Portuguese pages.
 */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { freshness } from '../freshness'

export const PTBR_PREPARE: LocaleCorpus = {
  'before-you-travel': {
    'pt-BR': {
      title: 'Antes de viajar para a República Tcheca | TalentPartnerID',
      description:
        'O que resolver antes de viajar depois que a autorização for aprovada: documentos, seguro, moradia, dinheiro para as primeiras semanas e o que levar na bagagem de mão.',
      h1: 'Antes de viajar',
      intro:
        'Esta página parte do ponto em que a autorização já foi concedida. O que vem a seguir é logística — e é onde as coisas costumam dar errado por falta de preparo, não por falta de documento.',
      breadcrumb: 'Antes de viajar',
      sections: [
        {
          heading: 'Documentos que viajam com você, não na mala despachada',
          body: [
            'Documento de viagem, a autorização concedida, o contrato de trabalho e os comprovantes de qualificação devem ir na bagagem de mão, junto com cópias digitais guardadas em algum lugar acessível.',
            'Leve também cópias em papel. Nem sempre há internet disponível no momento em que alguém pede um documento.',
          ],
        },
        {
          heading: 'Dinheiro para as primeiras semanas',
          body: [
            'O primeiro salário normalmente chega semanas depois da chegada. Até lá há custos: transporte, alimentação, caução de moradia, telefone e taxas administrativas.',
            'Planeje com folga. Chegar sem reserva financeira é a causa mais comum de dificuldade nos primeiros meses, e é o fator mais fácil de prever.',
          ],
        },
        {
          heading: 'Moradia e seguro',
          body: [
            'Confirme por escrito o que o empregador oferece: moradia, ajuda para encontrar, ou nada. Confirme também quem paga o quê e a partir de quando.',
            'Verifique a cobertura de saúde aplicável desde o dia da chegada e o que é exigido no seu caso. Essas exigências mudam; confirme na fonte oficial em vez de supor.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Prazos que começam a correr quando você chega',
          body: [
            'Há obrigações com prazo contado a partir da entrada no território. Saiba quais se aplicam a você antes de embarcar, porque o prazo não espera a adaptação.',
            'A página sobre os primeiros passos depois da chegada trata dessas obrigações.',
          ],
          freshness: 'procedural',
        },
      ],
      cta: { label: 'Depois de chegar', targetConceptId: 'after-arrival' },
      freshness: freshness('procedural', [LATAM_SRC.employeeCardMzv, LATAM_SRC.embassyBrasiliaPt], 'LATAM'),
    },
  },

  'after-arrival': {
    'pt-BR': {
      title: 'Depois de chegar à República Tcheca | TalentPartnerID',
      description:
        'Os primeiros passos depois da chegada: obrigações com prazo, registro, seguro de saúde, conta bancária e início do trabalho. O que não pode esperar.',
      h1: 'Depois de chegar',
      intro:
        'As primeiras semanas têm obrigações com prazo. Esta página separa o que tem data limite do que pode esperar até você se organizar.',
      breadcrumb: 'Depois de chegar',
      sections: [
        {
          heading: 'O que tem prazo',
          body: [
            'Algumas obrigações começam a correr no dia da entrada: apresentação às autoridades competentes, registro de residência e as etapas finais ligadas à autorização, conforme o caso.',
            'Os prazos e a forma exata são definidos pela autoridade tcheca e mudam. Confirme na fonte oficial o que se aplica ao seu caso — e faça isso antes de chegar, não depois.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Trabalho: quando pode começar',
          body: [
            'O trabalho só pode começar depois que a autorização começar a valer. Começar antes pode ser tratado como trabalho não autorizado, com consequências para você e para o empregador.',
            'Se o empregador pedir que comece antes, isso é um sinal de alerta sobre o empregador.',
          ],
        },
        {
          heading: 'Seguro de saúde',
          body: [
            'A cobertura de saúde muda de regime quando o emprego começa. Confirme com o empregador a partir de que data você está coberto e o que precisa fazer.',
            'Um intervalo sem cobertura é um risco concreto, e é evitável se tratado na primeira semana.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'O que pode esperar',
          body: [
            'Conta bancária, plano de telefone, cartão de transporte e curso de tcheco não têm prazo legal, mas facilitam tudo o que vem depois.',
            'Um curso de tcheco nos primeiros meses é o investimento com melhor retorno nesta fase.',
          ],
        },
        {
          heading: 'Se algo der errado',
          body: [
            'Se o trabalho não corresponder ao contrato, se houver descontos não previstos ou se pedirem para ficar com os seus documentos pessoais, procure a autoridade competente.',
            'A página sobre direitos do trabalhador indica onde procurar ajuda.',
          ],
        },
      ],
      cta: { label: 'Direitos do trabalhador', targetConceptId: 'worker-rights' },
      freshness: freshness('procedural', [LATAM_SRC.employeeCardMzv, LATAM_SRC.labourOffice], 'LATAM'),
    },
  },

  'brazil-consular-route': {
    'pt-BR': {
      title: 'Embaixada e Consulado-Geral tchecos no Brasil | TalentPartnerID',
      description:
        'Onde apresentar o pedido no Brasil: a Embaixada da República Tcheca em Brasília e o Consulado-Geral em São Paulo atendem estados diferentes. Como funciona o agendamento e onde está a informação oficial em português.',
      h1: 'Embaixada e Consulado-Geral tchecos no Brasil',
      intro:
        'A República Tcheca tem duas representações no Brasil que recebem pedidos, e cada uma atende estados diferentes. Apresentar o pedido na representação errada é um erro caro — e evitável em dois minutos de leitura.',
      breadcrumb: 'Embaixada e Consulado-Geral no Brasil',
      sections: [
        {
          heading: 'Duas representações, competências diferentes',
          body: [
            'A Embaixada da República Tcheca em Brasília e o Consulado-Geral da República Tcheca em São Paulo não são intercambiáveis. Cada uma atende uma área definida, e a competência é determinada pelo seu local de residência no Brasil.',
            'O Consulado-Geral em São Paulo atende os pedidos provenientes de São Paulo, Rio de Janeiro, Paraná, Rio Grande do Sul, Santa Catarina, Minas Gerais, Mato Grosso do Sul e Espírito Santo.',
            'A Embaixada em Brasília atende o Distrito Federal e os demais estados, além da Guiana e do Suriname.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Como funciona o agendamento',
          body: [
            'O atendimento para pedidos de longa duração é por agendamento prévio, solicitado por e-mail à representação competente. Os pedidos de agendamento são atendidos por ordem de chegada das mensagens.',
            'Não publicamos aqui dias, horários, número de horários de atendimento, taxas ou prazos. Essas informações mudam, e publicá-las como se fossem fixas faria alguém organizar uma viagem em torno de um dado desatualizado. Consulte-as diretamente na página oficial da representação competente.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Não há limite de pedidos fixado para o Brasil',
          body: [
            'O regulamento tcheco que fixa o número máximo de pedidos que podem ser apresentados em cada representação não estabelece um máximo para Brasília nem para São Paulo. Na América Latina, as únicas representações com número máximo fixado são Bogotá e Havana.',
            'Isso não significa capacidade ilimitada. A disponibilidade real de horários de atendimento é o fator limitante na prática, e ela não é definida por esse regulamento.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'A informação oficial existe em português',
          body: [
            'As duas representações publicam informação consular em português: a Embaixada em Brasília e o Consulado-Geral em São Paulo, cada uma no seu próprio site. Consulte a da representação competente para o seu estado — não a outra. Sempre que houver divergência entre esta página e a página oficial, é a oficial que vale.',
            'Preferimos indicar a fonte oficial a reescrever procedimento: um texto nosso desatualizado seria pior do que nenhum texto.',
          ],
        },
        {
          heading: 'A TalentPartnerID não tem qualquer papel consular',
          body: [
            'Não agendamos atendimentos, não apresentamos pedidos, não temos canal privilegiado e não temos relação institucional com a Embaixada ou com o Consulado-Geral.',
            'Se alguém oferecer agendamento garantido ou prioridade mediante pagamento, não é a TalentPartnerID e não é legítimo.',
          ],
        },
      ],
      cta: { label: 'Documentos necessários', targetConceptId: 'documents-required' },
      freshness: freshness(
        'procedural',
        [
          LATAM_SRC.embassyBrasilia,
          LATAM_SRC.embassyBrasiliaPt,
          LATAM_SRC.consulateSaoPauloPt,
          LATAM_SRC.consulateSaoPauloScope,
          LATAM_SRC.quotaRegulation,
        ],
        'BR',
      ),
    },
  },
}
