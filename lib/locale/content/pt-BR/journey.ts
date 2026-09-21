/**
 * PT-BR — the candidate journey: home, the hub, how recruitment works, life and
 * work, and the FAQ.
 *
 * Brazilian Portuguese throughout: tcheco (never the pt-PT checo), contato
 * (never contacto), currículo (never CV as the primary term).
 *
 * The EU–Mercosur clarification lives in two places by owner decision — one
 * paragraph in the hub's legal-pathway section and one direct FAQ question — and
 * has no route of its own. The agreement entered provisional application on
 * 1 May 2026, so "o Mercosul permite trabalhar na Europa" is a live and highly
 * searchable falsehood rather than a hypothetical one; answering it plainly is
 * worth more than a validator that merely stops us repeating it.
 */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { freshness } from '../freshness'

export const PTBR_JOURNEY: LocaleCorpus = {
  'candidate-home': {
    'pt-BR': {
      title: 'Trabalhar na República Tcheca | TalentPartnerID',
      description:
        'Como funciona o trabalho legal na República Tcheca para candidatos brasileiros e latino-americanos: cartão de empregado, documentos, profissões e o processo de recrutamento. Informação com fontes oficiais.',
      h1: 'Trabalhe na República Tcheca',
      intro:
        'A TalentPartnerID é uma agência de recrutamento tcheca. Esta seção explica, em português, como funciona o emprego legal na República Tcheca para profissionais de fora da União Europeia — o que é possível, o que não é, e quais passos dependem de você, do empregador e das autoridades tchecas.',
      breadcrumb: 'Início',
      sections: [
        {
          heading: 'Comece pelo caminho que realmente existe para o seu perfil',
          body: [
            'Nem todas as profissões têm o mesmo caminho. A diferença não é a nossa preferência: ela está na legislação tcheca e nos programas do governo, que tratam categorias profissionais de forma distinta.',
            'Para engenheiros, especialistas e profissionais técnicos de nível mais alto existe um programa governamental que não tem restrição de país de origem. Para a indústria e a logística esse programa não está disponível a candidatos brasileiros, e o caminho é o cartão de empregado padrão, que depende de uma vaga registrada por um empregador tcheco. Explicamos os dois casos em detalhe.',
          ],
          list: {
            intro: 'Escolha por onde começar:',
            items: [
              'Trabalho para engenheiros e especialistas técnicos — o caminho com programa governamental disponível',
              'Profissões técnicas — manutenção, automação, eletricistas, soldadores, operadores CNC',
              'Trabalho na indústria — produção, montagem, operação de máquinas',
              'Trabalho em logística — armazém e distribuição, com as restrições legais explicadas',
              'Profissões de saúde regulamentadas — reconhecimento profissional antes de qualquer contratação',
            ],
          },
        },
        {
          heading: 'O que a TalentPartnerID faz e o que não faz',
          body: [
            'Fazemos recrutamento: avaliamos candidaturas, apresentamos candidatos a empregadores tchecos e explicamos o processo. Quando um empregador avança com uma contratação, acompanhamos as etapas que nos cabem.',
            'Não somos um órgão do Estado tcheco, uma embaixada nem uma autoridade de imigração. Não emitimos vistos, não emitimos autorizações de residência e não decidimos pedidos. Essas decisões pertencem exclusivamente às autoridades tchecas, e ninguém pode prometer o resultado delas.',
          ],
        },
        {
          heading: 'Nenhuma etapa depende de pagamento ao candidato',
          body: [
            'Não cobramos do candidato para se candidatar, para ser apresentado a um empregador ou para receber informação. Se alguém disser que representa a TalentPartnerID e pedir dinheiro para garantir uma vaga, um visto ou uma posição na fila, não é a TalentPartnerID — e vale nos avisar.',
          ],
        },
      ],
      cta: {
        label: 'Candidatar-se',
        targetConceptId: 'candidate-apply',
        note: 'Leva alguns minutos. Você anexa o seu currículo no seu próprio e-mail.',
      },
      freshness: freshness('conceptual', [LATAM_SRC.programHighlyQualified, LATAM_SRC.programQualified], 'LATAM'),
    },
  },

  'work-in-czechia': {
    'pt-BR': {
      title: 'Trabalhar na República Tcheca: como funciona legalmente | TalentPartnerID',
      description:
        'Guia completo sobre trabalhar legalmente na República Tcheca sendo brasileiro ou latino-americano: cartão de empregado (zaměstnanecká karta), programas governamentais, documentos e limites reais. Com fontes oficiais.',
      h1: 'Trabalhar na República Tcheca',
      intro:
        'Este é o guia principal para quem está avaliando trabalhar legalmente na República Tcheca. Ele explica quais caminhos existem, quais se aplicam a cidadãos brasileiros e latino-americanos, e onde estão os limites reais — inclusive os que a maioria dos anúncios não menciona.',
      breadcrumb: 'Trabalhar na República Tcheca',
      sections: [
        {
          heading: 'O ponto de partida: é preciso uma autorização que una residência e trabalho',
          body: [
            'Cidadãos de países fora da União Europeia, do Espaço Económico Europeu e da Suíça precisam de uma autorização específica para trabalhar na República Tcheca. A mais comum para emprego de longa duração é o cartão de empregado, cujo nome legal em tcheco é zaměstnanecká karta.',
            'Trata-se de um documento duplo: autoriza ao mesmo tempo a residência no território e o exercício de um trabalho concreto, para um empregador concreto. Ele não é genérico — está ligado a um posto de trabalho específico.',
          ],
        },
        {
          heading: 'Os dois programas governamentais, e por que a diferença importa',
          body: [
            'O Estado tcheco mantém programas que aceleram a tramitação de determinados perfis. Existem dois relevantes aqui, e eles tratam candidatos brasileiros de maneira diferente.',
            'O Program vysoce kvalifikovaný zaměstnanec (Programa de trabalhador altamente qualificado) não tem limitação territorial: aplica-se a trabalhadores de todos os países terceiros. Abrange atividades das classes principais 1 a 3 da classificação tcheca de ocupações CZ-ISCO — direção, profissões intelectuais e científicas e profissões técnicas de nível médio. Um candidato brasileiro pode participar quando a função concreta, o empregador e as condições do programa forem cumpridos. Isso não significa que todo engenheiro brasileiro se qualifique.',
            'O Program kvalifikovaný zaměstnanec (Programa de trabalhador qualificado), que cobre as classes CZ-ISCO 4 a 8, aplica-se a uma lista fechada de países. O Brasil não está nessa lista, e nenhum país da América Latina está. Para esses perfis, portanto, o programa não é uma opção, e o caminho é o cartão de empregado padrão.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'O acordo UE–Mercosul não cria direito de trabalho na República Tcheca',
          body: [
            'O acordo entre a União Europeia e o Mercosul passou a ser aplicado provisoriamente em 1 de maio de 2026, e desde então circula a ideia de que ele permitiria a brasileiros trabalhar na Europa sem autorização. Isso não é verdade.',
            'O acordo é de natureza comercial. Em matéria de circulação de pessoas, ele prevê a entrada temporária de prestadores de serviços — transferências dentro da mesma empresa e prestadores contratuais — para fins de negócios. Nada nele concede a um cidadão de país do Mercosul o direito geral de assumir um emprego junto a um empregador da União Europeia.',
            'Ser parte de um acordo comercial e ter autorização de trabalho tcheca são coisas distintas. O caminho legal continua sendo o cartão de empregado (zaměstnanecká karta) ou, quando a função e o empregador cumprirem as condições, o programa de trabalhador altamente qualificado.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'A isenção de visto de curta duração não autoriza trabalhar',
          body: [
            'Cidadãos brasileiros não precisam de visto para estadas curtas de até 90 dias na República Tcheca e no espaço Schengen — mas essa isenção vale desde que a finalidade da viagem não seja atividade remunerada.',
            'Entrar como visitante e começar a trabalhar não é uma alternativa mais rápida ao processo: é trabalho não autorizado, com consequências para o trabalhador e para o empregador.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Quanto tempo vale a autorização',
          body: [
            'O cartão de empregado é emitido pelo período do contrato de trabalho, no máximo por dois anos de cada vez. A validade pode ser prorrogada repetidamente, sempre pelo período do contrato e sempre por no máximo dois anos a cada emissão.',
            'Dito de outra forma: dois anos é um teto legal, não uma promessa. Ninguém — nem a TalentPartnerID, nem um empregador — pode garantir de antemão a duração que será concedida, porque quem decide é a autoridade tcheca.',
          ],
        },
        {
          heading: 'O que vem a seguir',
          body: [
            'Se o seu perfil se encaixa, o passo seguinte é entender o processo de recrutamento e reunir os documentos. Ambos estão explicados em detalhe nas páginas ligadas a partir daqui.',
          ],
        },
      ],
      cta: {
        label: 'Como funciona o recrutamento',
        targetConceptId: 'how-recruitment-works',
      },
      freshness: freshness(
        'conceptual',
        [
          LATAM_SRC.programHighlyQualified,
          LATAM_SRC.programQualified,
          LATAM_SRC.employeeCardMzv,
          LATAM_SRC.residenceAct,
          LATAM_SRC.embassyBrasilia,
          LATAM_SRC.mercosur,
        ],
        'LATAM',
      ),
    },
  },

  'how-recruitment-works': {
    'pt-BR': {
      title: 'Como funciona o recrutamento na TalentPartnerID | TalentPartnerID',
      description:
        'O processo de recrutamento passo a passo: candidatura, avaliação, apresentação ao empregador tcheco, contrato, pedido de cartão de empregado e chegada. O que depende de cada parte.',
      h1: 'Como funciona o recrutamento',
      intro:
        'O processo tem etapas previsíveis e prazos que não são previsíveis. Esta página separa as duas coisas: o que acontece em cada fase, e quais fases dependem de decisões que não estão nas nossas mãos.',
      breadcrumb: 'Como funciona o recrutamento',
      sections: [
        {
          heading: 'As etapas, na ordem em que acontecem',
          body: [
            'Nem toda candidatura percorre todas as etapas, e isso é normal. A maioria das candidaturas não resulta em contratação, do mesmo modo que em qualquer processo seletivo.',
          ],
          list: {
            ordered: true,
            items: [
              'Você envia a candidatura com o seu currículo anexado.',
              'Avaliamos a experiência, a qualificação e a elegibilidade legal para o tipo de função.',
              'Se houver correspondência com uma necessidade real de um empregador tcheco, apresentamos o seu perfil.',
              'O empregador decide se quer entrevistar. A decisão é dele.',
              'Havendo acordo, o empregador emite contrato ou promessa de emprego e registra o posto de trabalho conforme exigido.',
              'Você reúne os documentos e agenda o pedido no posto consular tcheco competente para o seu estado.',
              'A autoridade tcheca analisa e decide o pedido.',
              'Com a autorização válida, você viaja e inicia o trabalho.',
            ],
          },
        },
        {
          heading: 'O que depende de quem',
          body: [
            'Boa parte da frustração em processos assim vem de esperar de uma parte algo que pertence a outra.',
          ],
          list: {
            items: [
              'De você: a veracidade das informações, os documentos, o agendamento consular e o comparecimento.',
              'Do empregador: a decisão de contratar, o contrato, o registro do posto de trabalho e as obrigações de empregador.',
              'Das autoridades tchecas: a decisão sobre o pedido, os prazos e os requisitos formais.',
              'Da TalentPartnerID: a avaliação, a apresentação ao empregador e a informação sobre o processo.',
            ],
          },
        },
        {
          heading: 'Prazos: por que não damos uma data',
          body: [
            'Os prazos de tramitação são definidos e publicados pelas autoridades tchecas e mudam. O mesmo vale para a disponibilidade de horários de atendimento consular.',
            'Por isso não publicamos prazos como se fossem fixos. Indicamos onde consultá-los oficialmente e informamos a data em que verificamos a informação pela última vez.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Como avaliamos candidaturas',
          body: [
            'A avaliação considera experiência, qualificação, competências, disponibilidade, adequação à função, elegibilidade legal e, quando relevante para o posto, idioma.',
            'Não avaliamos candidatos por nacionalidade. Recrutamos em determinados países e idiomas porque é onde há profissionais interessados e qualificados — o que é diferente de atribuir qualidades a uma nacionalidade.',
          ],
        },
      ],
      cta: { label: 'Candidatar-se', targetConceptId: 'candidate-apply' },
      freshness: freshness('conceptual', [LATAM_SRC.employeeCardMzv, LATAM_SRC.labourOffice], 'LATAM'),
    },
  },

  'life-and-work': {
    'pt-BR': {
      title: 'Vida e trabalho na República Tcheca | TalentPartnerID',
      description:
        'Como é trabalhar e viver na República Tcheca: jornada, contrato, salário no contexto do custo de vida, moradia, idioma e o que esperar nos primeiros meses.',
      h1: 'Vida e trabalho na República Tcheca',
      intro:
        'Uma decisão de mudar de país se toma com informação sobre o cotidiano, não só sobre documentos. Esta página reúne o que costuma surpreender quem chega — nos dois sentidos.',
      breadcrumb: 'Vida e trabalho',
      sections: [
        {
          heading: 'Contrato e jornada',
          body: [
            'A relação de trabalho é regida pelo Código do Trabalho tcheco, que se aplica igualmente a trabalhadores estrangeiros com autorização válida. Contrato por escrito, jornada definida, horas extraordinárias remuneradas, férias e períodos de descanso são direitos legais, não benefícios concedidos.',
            'Vale ler o contrato antes de assinar, e pedir explicação do que não estiver claro. Um contrato em tcheco pode ser acompanhado de tradução, e você pode pedir tempo para lê-lo.',
          ],
        },
        {
          heading: 'Salário no contexto do custo de vida',
          body: [
            'Comparar salários entre países pela taxa de câmbio leva a conclusões erradas. O que importa é o que sobra depois de moradia, transporte, alimentação, contribuições sociais e imposto de renda.',
            'Não publicamos faixas salariais nesta página porque elas variam por função, região, empresa e ano, e um número desatualizado aqui seria pior do que nenhum. Os valores concretos aparecem na proposta de um empregador, e é ali que devem ser avaliados.',
          ],
        },
        {
          heading: 'Moradia',
          body: [
            'Alguns empregadores oferecem alojamento ou ajudam a encontrá-lo; outros não. Isso deve constar explicitamente da proposta — se não constar, pergunte.',
            'Em determinados procedimentos de residência é exigido comprovante de alojamento assegurado. Confirme quais exigências se aplicam ao seu caso junto à fonte oficial antes de contar com uma suposição.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Idioma',
          body: [
            'O tcheco não é exigido para todas as funções, mas ajuda em todas. Em funções técnicas costuma bastar inglês no início; em profissões regulamentadas, especialmente na saúde, a competência em tcheco é um requisito legal.',
            'Aprender o básico antes de chegar muda a experiência dos primeiros meses mais do que qualquer outro preparo.',
          ],
        },
        {
          heading: 'O que costuma surpreender',
          body: [
            'A burocracia é formal e funciona por prazos — perder um prazo tem consequências reais, e resolver depois costuma ser mais difícil do que cumprir no momento.',
            'O inverno é longo e escuro, e isso pesa mais do que a maioria das pessoas espera. Do outro lado, transporte público, segurança e serviços de saúde funcionam bem e a preços acessíveis.',
          ],
        },
      ],
      cta: { label: 'Trabalhar na República Tcheca', targetConceptId: 'work-in-czechia' },
      freshness: freshness('conceptual', [LATAM_SRC.labourOffice], 'LATAM'),
    },
  },
}
