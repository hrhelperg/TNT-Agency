/**
 * PT-BR — the application and the candidate data notice.
 *
 * The application is mailto-first: the message is composed in the candidate's
 * own mail client and they attach their own CV there, so no CV ever reaches
 * this site and there is nothing here to store, leak or retain. The instruction
 * to attach it appears BEFORE the form and again in the success state, because
 * an application sent without the attachment is the failure this design trades
 * for not holding anyone's personal data.
 *
 * The data notice is not a second privacy policy and not a summary pointing at
 * an English page. A transparency notice that is only transparent in a language
 * the reader does not have is not transparency.
 */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { freshness } from '../freshness'
import { OPERATOR_EMAIL, OPERATOR_LEGAL_NAME, OPERATOR_SEAT } from '../../../content/trust-data'

export const PTBR_APPLY: LocaleCorpus = {
  'candidate-apply': {
    'pt-BR': {
      title: 'Candidatar-se | TalentPartnerID',
      description:
        'Envie a sua candidatura para trabalhar na República Tcheca. O formulário abre o seu aplicativo de e-mail com a mensagem pronta — você anexa o currículo e envia.',
      h1: 'Candidatar-se',
      intro:
        'A candidatura é enviada a partir do seu próprio e-mail. Você preenche o formulário, o seu aplicativo de e-mail abre com a mensagem já montada, você anexa o currículo e envia. Assim nenhum currículo fica armazenado neste site.',
      breadcrumb: 'Candidatar-se',
      sections: [
        {
          heading: 'Como funciona, em quatro passos',
          body: [
            'Leia os quatro passos antes de começar. O terceiro é o passo mais fácil de esquecer.',
          ],
          list: {
            ordered: true,
            items: [
              'Preencha o formulário abaixo.',
              'Ao enviar, o seu aplicativo de e-mail abre com a mensagem já preenchida.',
              'Anexe seu currículo à mensagem — isso não acontece automaticamente.',
              'Envie a mensagem. A candidatura só chega até nós depois deste passo.',
            ],
          },
        },
        {
          heading: 'Se o seu aplicativo de e-mail não abrir',
          body: [
            `Nem todo dispositivo tem um aplicativo de e-mail configurado. Se nada abrir, escreva diretamente para ${OPERATOR_EMAIL} a partir do e-mail que você usa normalmente, anexando o currículo.`,
            'O texto da mensagem também fica disponível na página para você copiar e colar. Nada se perde se o passo automático falhar.',
          ],
        },
        {
          heading: 'O que incluir no currículo',
          body: [
            'Experiência com datas, funções e empregadores; formação e certificados relevantes; idiomas; e disponibilidade para mudança.',
            'Se você tiver certificações técnicas — soldagem, eletricidade, operação de equipamentos, qualidade — indique-as explicitamente. São elas que costumam mudar o enquadramento de uma candidatura.',
          ],
        },
        {
          heading: 'O que acontece depois',
          body: [
            'Lemos a candidatura e avaliamos experiência, qualificação e elegibilidade legal para o tipo de função. Entramos em contato quando houver correspondência com uma necessidade concreta de um empregador.',
            'A maioria das candidaturas não resulta em contratação, como em qualquer processo seletivo. Não cobramos nada em nenhuma etapa.',
          ],
        },
        {
          heading: 'Os seus dados',
          body: [
            'Pedimos apenas o necessário para avaliar a candidatura e responder. A mensagem é enviada do seu e-mail para o nosso — os valores do formulário não vão para o endereço da página, nem para o histórico do navegador, nem para nenhuma ferramenta de análise.',
            'A página sobre tratamento de dados do candidato explica em detalhe o que é processado, com que finalidade, por quanto tempo e quais são os seus direitos.',
          ],
        },
      ],
      cta: { label: 'Tratamento de dados do candidato', targetConceptId: 'candidate-data-notice' },
      freshness: freshness('procedural', [LATAM_SRC.labourOffice], 'LATAM'),
    },
  },

  'candidate-data-notice': {
    'pt-BR': {
      title: 'Tratamento de dados do candidato | TalentPartnerID',
      description:
        'Quem opera a TalentPartnerID, quais dados de candidatos são tratados, com que finalidade e base legal, por quanto tempo, quem os recebe e como exercer os seus direitos.',
      h1: 'Tratamento de dados do candidato',
      intro:
        'Esta página explica o que acontece com os dados que você envia numa candidatura. Ela é específica para candidatos e não substitui a Política de Privacidade do site, à qual remete no final.',
      breadcrumb: 'Tratamento de dados',
      sections: [
        {
          heading: 'Quem opera este site',
          body: [
            `A TalentPartnerID é operada pela ${OPERATOR_LEGAL_NAME}, sociedade constituída na República Tcheca, com sede em ${OPERATOR_SEAT}.`,
            'Publicamos aqui apenas os dados da empresa que estão verificados. O número de identificação da pessoa jurídica e o número de licença de agência de emprego não são apresentados enquanto não estiverem conferidos junto ao registro oficial — entre afirmar sem confirmação e não afirmar, preferimos não afirmar. A empresa pode ser consultada de forma independente no registro público tcheco de entidades econômicas.',
          ],
        },
        {
          heading: 'Quais dados são tratados',
          body: [
            'Os dados que você inclui na candidatura: nome, dados de contato, país e cidade, profissão ou área pretendida, experiência, qualificações, idiomas e disponibilidade.',
            'E o conteúdo do currículo que você anexa. Um currículo pode conter mais informação do que o necessário — data de nascimento, estado civil, fotografia, nacionalidade. Nada disso é exigido por nós, e você pode retirar da versão que envia o que não considerar necessário.',
          ],
        },
        {
          heading: 'Com que finalidade',
          body: [
            'Avaliar a candidatura, responder-lhe e, havendo correspondência com uma necessidade concreta, apresentar o seu perfil a um empregador para fins de uma eventual contratação.',
            'Não usamos os dados para publicidade, não os vendemos e não os cedemos a quem não esteja envolvido num processo de recrutamento concreto.',
          ],
        },
        {
          heading: 'Como os dados chegam até nós',
          body: [
            'A candidatura é enviada por e-mail a partir do seu próprio aplicativo de e-mail. Os valores do formulário compõem a mensagem no seu dispositivo; eles não são publicados no endereço da página, não ficam no histórico do navegador, não são gravados no armazenamento do navegador e não são enviados a ferramentas de análise.',
            'O currículo é anexado por você, na sua própria mensagem. Ele não passa por este site e não é carregado aqui.',
          ],
        },
        {
          heading: 'O papel do seu provedor de e-mail',
          body: [
            'Como a mensagem parte da sua conta, ela passa pelo seu provedor de e-mail e fica também na sua caixa de enviados. Esse provedor é escolhido por você e está fora do nosso controle.',
            'Do nosso lado existe um segundo provedor, que escolhemos nós: a caixa que recebe as candidaturas é operada pelo Google. A seção sobre transferência internacional explica o que isso significa.',
          ],
        },
        {
          heading: 'Quem pode receber os dados',
          body: [
            'Internamente, as pessoas envolvidas no recrutamento.',
            'Externamente, um empregador tcheco concreto — e apenas quando houver correspondência real com uma necessidade e para fins de avaliar sua candidatura a essa posição. Não enviamos perfis em massa a listas de empresas.',
          ],
        },
        {
          heading: 'Base legal',
          body: [
            'O tratamento se fundamenta no seu consentimento, dado ao enviar a candidatura, e nas diligências prévias à celebração de um contrato realizadas a seu pedido.',
            'O consentimento pode ser retirado a qualquer momento, sem afetar a licitude do tratamento anterior.',
          ],
        },
        {
          heading: 'Por quanto tempo',
          body: [
            'Conservamos a candidatura enquanto o processo estiver em curso e, depois disso, por até 12 meses, para podermos voltar a entrar em contato com você se surgir algo adequado ao seu perfil.',
            'Você pode pedir a exclusão antes desse prazo, e nesse caso apagamos a mensagem e o currículo dos nossos sistemas. Findo o prazo, a eliminação ocorre sem necessidade de pedido.',
          ],
        },
        {
          heading: 'Provedores de e-mail e transferência internacional',
          body: [
            'A sua candidatura chega a uma caixa de e-mail operada pelo Google (Gmail). Isso significa que o Google atua como destinatário e processa a mensagem e o currículo em nosso nome, e que os dados podem ser tratados fora do Espaço Econômico Europeu, nos termos das salvaguardas aplicáveis descritas na Política de Privacidade do site.',
            'Dizemos isso de forma explícita porque é a escolha de ferramenta que fizemos, e não uma consequência do seu provedor. Os demais destinatários são a empresa que opera o site, estabelecida na República Tcheca, e o empregador tcheco concreto a quem o seu perfil venha a ser apresentado.',
            'Se preferir não enviar os seus dados por um serviço do Google, use o telefone indicado na página de contato para combinar outra forma de envio.',
          ],
        },
        {
          heading: 'Os seus direitos',
          body: [
            'Você tem direito de saber quais dados seus são tratados e a obter cópia deles, a pedir a correção de dados inexatos, a pedir a eliminação, a pedir a limitação do tratamento, a opor-se ao tratamento e a retirar o consentimento.',
            'Você também tem o direito de apresentar reclamação à autoridade de proteção de dados competente.',
          ],
        },
        {
          heading: 'Como exercer os seus direitos',
          body: [
            `Escreva para ${OPERATOR_EMAIL} a partir do endereço com que enviou a candidatura, indicando o que pretende. Se escrever de outro endereço, poderemos pedir informação adicional para confirmar que a candidatura é sua — o que também protege você.`,
            'Respondemos sem demora injustificada.',
          ],
        },
        {
          heading: 'Política de Privacidade',
          body: [
            'Esta página trata especificamente de candidaturas. A Política de Privacidade geral do site, que cobre também a navegação e os cookies, está publicada em inglês e é o documento de referência.',
            'Nada nesta página afasta ou reduz o que consta da Política de Privacidade.',
          ],
        },
      ],
      cta: { label: 'Candidate-se', targetConceptId: 'candidate-apply' },
      freshness: freshness('conceptual', [LATAM_SRC.labourOffice], 'LATAM'),
    },
  },
}
