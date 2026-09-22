/**
 * PT-BR — the permit cluster: Employee Card, documents, qualification
 * recognition, worker rights and where to verify.
 *
 * Terminology rule enforced throughout: "cartão de empregado" is a DESCRIPTIVE
 * GLOSS. The Czech embassy's own Portuguese pages use no Portuguese term for it,
 * so inventing one and then using it alone would leave a reader unable to match
 * what we call it against what any official form calls it. zaměstnanecká karta
 * appears alongside it.
 */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { LABOUR_SRC } from '../sources-labour'
import { freshness, STATUTORY_YEAR } from '../freshness'

export const PTBR_IMMIGRATION: LocaleCorpus = {
  'employee-card': {
    'pt-BR': {
      title: 'Cartão de empregado tcheco (zaměstnanecká karta) | TalentPartnerID',
      description:
        'O que é o cartão de empregado (zaměstnanecká karta), quando se aplica, como se liga a uma vaga concreta, qual a validade máxima e como funciona a prorrogação. Com fontes oficiais tchecas.',
      h1: 'Cartão de empregado tcheco (zaměstnanecká karta)',
      intro:
        'O cartão de empregado — em tcheco zaměstnanecká karta — é a autorização mais usada por cidadãos de países terceiros para trabalhar de forma duradoura na República Tcheca. Esta página explica o que ele é, a que se liga e onde estão os seus limites.',
      breadcrumb: 'Cartão de empregado',
      sections: [
        {
          heading: 'Um documento, duas autorizações',
          body: [
            'O cartão de empregado é um documento duplo: autoriza simultaneamente a residência de longa duração no território tcheco e o exercício de um trabalho determinado. Não são duas autorizações separadas que se somam — é uma só, com as duas funções.',
            'Quem o emite é o Ministério do Interior da República Tcheca. A TalentPartnerID não participa dessa decisão.',
          ],
        },
        {
          heading: 'Destina-se a emprego superior a três meses',
          body: [
            'Segundo o Ministério das Relações Exteriores tcheco, o cartão de empregado se destina a cidadãos de países terceiros que serão empregados na República Tcheca por mais de três meses.',
            'Para permanências curtas com outra finalidade existem outros regimes — e nenhum deles autoriza trabalho remunerado só porque a entrada é permitida.',
          ],
        },
        {
          heading: 'Está ligado a uma vaga concreta, e isso tem consequências práticas',
          body: [
            'O cartão é emitido para um posto de trabalho específico. Na prática, o pedido pressupõe dispor do número de um posto de trabalho vago registrado — sem ele não há pedido a apresentar.',
            'É por isso que o processo não começa pelo consulado: começa por um empregador tcheco com uma necessidade real e um posto registrado. Mudança de empregador ou de função depois disso segue regras próprias, com obrigações de comunicação e, em certos casos, autorização.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Validade: no máximo dois anos de cada vez',
          body: [
            'A lei tcheca sobre a residência de estrangeiros estabelece que o cartão de empregado é emitido pelo período pelo qual foi celebrado o contrato de trabalho, no máximo por dois anos.',
            'A validade pode ser prorrogada repetidamente, sempre pelo período do contrato e sempre por no máximo dois anos a cada emissão. Portanto: dois anos é o teto legal de cada emissão, não uma duração automática e não algo que alguém possa prometer.',
          ],
        },
        {
          heading: 'O que a TalentPartnerID pode e não pode fazer aqui',
          body: [
            'Podemos explicar o processo, indicar as fontes oficiais e acompanhar as etapas que cabem ao recrutamento e ao empregador.',
            'Não emitimos o cartão, não influenciamos a decisão e não podemos acelerar a tramitação. Esta página é informação geral e não substitui aconselhamento sobre o seu caso individual.',
          ],
        },
      ],
      cta: { label: 'Documentos necessários', targetConceptId: 'documents-required' },
      freshness: freshness(
        'conceptual',
        [LATAM_SRC.employeeCardMzv, LATAM_SRC.residenceAct],
        'LATAM',
      ),
    },
  },

  'documents-required': {
    'pt-BR': {
      title: 'Documentos necessários para o pedido | TalentPartnerID',
      description:
        'Quais categorias de documentos costumam ser exigidas no pedido de cartão de empregado tcheco, o que costuma exigir tradução ou legalização, e onde conferir a lista oficial atualizada.',
      h1: 'Documentos necessários',
      intro:
        'A lista exata de anexos é definida pela autoridade tcheca e muda. Esta página explica as categorias de documentos que costumam ser exigidas e o que costuma dar trabalho — para que você se prepare com antecedência e confirme a lista vigente na fonte oficial.',
      breadcrumb: 'Documentos necessários',
      sections: [
        {
          heading: 'Por que não publicamos uma lista fechada',
          body: [
            'Uma lista de documentos parece a informação mais útil possível, e é exatamente a que envelhece mais rápido. Publicá-la como definitiva faria alguém viajar até um posto consular com a papelada errada.',
            'Por isso descrevemos as categorias e apontamos a fonte oficial, registrando a data em que a verificamos.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Categorias que costumam ser exigidas',
          body: [
            'As categorias abaixo aparecem de forma recorrente em pedidos de cartão de empregado. A forma exata, a validade e o número de vias são definidos pela autoridade.',
          ],
          list: {
            items: [
              'Documento de viagem válido',
              'Contrato de trabalho, acordo de atividade laboral ou promessa de emprego',
              'Comprovante de qualificação exigida para a função',
              'Comprovante de moradia assegurada',
              'Fotografias conforme especificação',
              'Comprovante de pagamento da taxa administrativa',
            ],
          },
          freshness: 'procedural',
        },
        {
          heading: 'Traduções e legalização',
          body: [
            'Documentos emitidos no Brasil costumam precisar de tradução oficial para o tcheco e, conforme o caso, de legalização — normalmente apostila, já que o Brasil é parte da Convenção de Haia.',
            'Essa etapa é feita no Brasil, antes do pedido, e costuma ser a que mais atrasa processos. Confirme quais documentos exigem qual formalidade antes de encomendar traduções, porque traduzir o documento errado custa tempo e dinheiro.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Comprovante de qualificação',
          body: [
            'Para funções não regulamentadas, costuma bastar comprovar a formação ou a experiência exigida pelo posto.',
            'Para profissões regulamentadas — saúde, algumas atividades técnicas — existe um procedimento próprio de reconhecimento, que é anterior e independente do pedido de residência. A página sobre reconhecimento de qualificações explica a diferença.',
          ],
        },
      ],
      cta: { label: 'Reconhecimento de qualificações', targetConceptId: 'qualification-recognition' },
      freshness: freshness(
        'procedural',
        [LATAM_SRC.employeeCardMzv, LATAM_SRC.embassyBrasiliaPt, LATAM_SRC.consulateSaoPauloPt],
        'BR',
      ),
    },
  },

  'qualification-recognition': {
    'pt-BR': {
      title: 'Reconhecimento de qualificações na República Tcheca | TalentPartnerID',
      description:
        'A diferença entre reconhecimento de diploma e reconhecimento de qualificação profissional para atividade regulamentada na República Tcheca, e quando nenhum dos dois é necessário.',
      h1: 'Reconhecimento de qualificações',
      intro:
        'Dois procedimentos diferentes costumam ser confundidos: reconhecer um diploma estrangeiro e reconhecer a qualificação para exercer uma atividade regulamentada. São processos distintos, com autoridades e finalidades distintas — e há casos em que nenhum dos dois é exigido.',
      breadcrumb: 'Reconhecimento de qualificações',
      sections: [
        {
          heading: 'Reconhecimento de diploma',
          body: [
            'É o procedimento que estabelece a equivalência de um diploma estrangeiro ao nível de ensino tcheco correspondente. Serve para comprovar formação — perante um empregador, perante uma universidade ou como pré-requisito de outro procedimento.',
            'Por si só, ele não autoriza exercer uma profissão regulamentada.',
          ],
        },
        {
          heading: 'Reconhecimento de qualificação profissional',
          body: [
            'É o procedimento exigido para exercer uma atividade regulamentada. Aqui não se avalia apenas o diploma, mas a aptidão para exercer aquela profissão concreta na República Tcheca — o que pode incluir exames e requisitos de idioma.',
            'É o caso das profissões de saúde, entre outras. Esse procedimento é anterior e independente do pedido de residência: ter autorização de residência não autoriza exercer uma profissão regulamentada sem o reconhecimento.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Quando nenhum dos dois é exigido',
          body: [
            'Para muitas funções não regulamentadas, o empregador avalia a experiência diretamente e não há procedimento formal de reconhecimento a cumprir.',
            'Isso não significa que qualquer certificado estrangeiro seja aceito para qualquer tarefa: atividades como soldagem e trabalhos elétricos exigem certificações específicas segundo as normas tchecas, e um certificado obtido no exterior pode não ser suficiente para a tarefa concreta.',
          ],
        },
        {
          heading: 'Como se preparar',
          body: [
            'Reúna diplomas, históricos e certificados com antecedência, verifique se precisam de tradução oficial e legalização, e confirme junto ao empregador qual comprovação a função exige.',
            'Se a sua profissão for regulamentada, trate do reconhecimento como a primeira etapa do projeto, não como uma formalidade posterior.',
          ],
        },
      ],
      cta: { label: 'Profissões de saúde regulamentadas', targetConceptId: 'healthcare-regulated-professions' },
      freshness: freshness(
        'procedural',
        [LATAM_SRC.healthProfessionsAct, LATAM_SRC.nonMedicalHealthAct, LATAM_SRC.approbationExam],
        'LATAM',
      ),
    },
  },

  'worker-rights': {
    'pt-BR': {
      title: 'Direitos do trabalhador estrangeiro na República Tcheca | TalentPartnerID',
      description:
        'Quais direitos um trabalhador estrangeiro tem na relação de trabalho tcheca, quais obrigações acompanham a residência e o trabalho, e onde procurar ajuda.',
      h1: 'Direitos do trabalhador estrangeiro',
      intro:
        'Um trabalhador estrangeiro com autorização válida tem os mesmos direitos laborais que um trabalhador tcheco. Esta página resume esses direitos, as obrigações ligadas à residência e onde procurar ajuda quando algo dá errado.',
      breadcrumb: 'Direitos do trabalhador',
      sections: [
        {
          heading: 'Direitos na relação de trabalho',
          body: [
            'O Código do Trabalho tcheco se aplica independentemente da nacionalidade. Contrato por escrito, limites de jornada, pagamento de horas extras, descanso e férias são direitos legais, e valem igualmente para um trabalhador estrangeiro com autorização válida.',
            'Descontos não previstos em lei ou em contrato não são legítimos, e reter documentos pessoais de um trabalhador não é legítimo em circunstância alguma.',
          ],
          list: {
            intro: 'Quatro direitos que vale conhecer pelo nome:',
            items: [
              'Salário no mínimo no valor do salário mínimo legal',
              'Igualdade de tratamento e proibição de discriminação — a lei proíbe expressamente a discriminação por origem racial ou étnica, nacionalidade e cidadania',
              'Segurança e proteção da saúde no trabalho',
              'Condições comparáveis no trabalho temporário por agência',
            ],
          },
        },
        {
          heading: 'Quanto é o salário mínimo, e o que não pode ser contado nele',
          body: [
            'Para a jornada semanal legal de 40 horas, o salário mínimo válido para 2026 é de 22 400 Kč por mês ou 134,40 Kč por hora. O valor é fixado por comunicação do Ministério do Trabalho e Assuntos Sociais e muda todo 1º de janeiro.',
            'A parte que mais importa conhecer é o que a lei manda deixar de fora desse cálculo. Não entram no valor considerado para atingir o mínimo: o pagamento de horas extras, o adicional de trabalho em feriado, o adicional noturno, o adicional por ambiente de trabalho penoso, o adicional por sobrecarga na área da saúde e o adicional de sábado e domingo.',
            'Isso significa que esses adicionais se somam ao mínimo e não o compõem. Um empregador não pode alcançar o salário mínimo somando o seu adicional noturno. Se a remuneração do mês ficar abaixo do mínimo, ele é obrigado a pagar a diferença.',
            'O mínimo é proporcional à jornada: quem tem jornada contratada menor recebe a parte correspondente.',
          ],
          freshness: 'statutory-annual',
        },
        {
          heading: 'Jornada, turnos e descanso',
          body: [
            'A jornada semanal legal é de 40 horas, mas ela é menor em regimes de turno. Em regime de turnos múltiplos — três ou mais turnos que se revezam em 24 horas — ou em regime ininterrupto, são 37,5 horas por semana. Em regime de dois turnos, 38,75 horas.',
            'Isso tem duas consequências concretas. O salário mínimo por hora sobe proporcionalmente quando a jornada semanal é reduzida, e o tempo trabalhado além da jornada semanal legal do seu regime é hora extra.',
            'Um turno não pode passar de 12 horas. A única exceção está na saúde, em operação ininterrupta e sob condições próprias.',
          ],
          list: {
            intro: 'Descanso a que você tem direito:',
            items: [
              'Descanso diário ininterrupto de pelo menos 11 horas a cada 24 horas. Pode ser reduzido a 8 horas em situações definidas em lei, e nesse caso o descanso seguinte tem de ser prolongado pelo tempo que foi cortado',
              'Descanso semanal ininterrupto de pelo menos 24 horas somadas ao descanso diário, de forma contínua',
              'Quando a operação permite, o empregador concede esse descanso semanal a todos no mesmo dia, de modo que inclua o domingo',
            ],
          },
        },
        {
          heading: 'Horas extras, noite, fim de semana e feriado',
          body: [
            'A lei trata hora extra como exceção, não como rotina: "a hora extra só pode ser realizada excepcionalmente". O empregador pode determiná-la por motivos operacionais sérios, dentro de limites — no máximo 8 horas por semana e 150 horas por ano civil. Acima disso, só com a sua concordância, e o total não pode ultrapassar a média de 8 horas semanais em um período de no máximo 26 semanas.',
            'A hora extra é paga com o salário correspondente mais adicional de pelo menos 25% do salário médio, salvo se vocês acordarem folga compensatória em vez do adicional. Se a folga não for concedida em três meses, o adicional passa a ser devido.',
            'Trabalho noturno e trabalho em sábado e domingo têm adicional de pelo menos 10% do salário médio. Aqui cabe uma ressalva que a própria lei faz: é possível acordar um mínimo diferente e outra forma de cálculo, então confira o que o seu contrato ou a convenção coletiva estabelece.',
            'O turno de quem trabalha à noite não pode passar de 8 horas em 24 horas. O trabalhador noturno deve ser examinado por um serviço de medicina do trabalho, e o custo é do empregador.',
            'Em feriado, a regra é salário mais folga compensatória, concedida até o fim do terceiro mês seguinte; por acordo, o adicional pode substituir a folga.',
          ],
        },
        {
          heading: 'Férias e prazo de pagamento',
          body: [
            'A duração mínima das férias é de 4 semanas por ano civil. Cinco semanas valem para empregadores do setor público, não para uma empresa privada.',
            'O salário é devido depois de prestado o trabalho, no mais tardar no mês civil seguinte àquele em que o direito surgiu. A data regular de pagamento tem de ser acordada dentro desse período. Antes de você sair de férias, o empregador é obrigado a pagar o salário já vencido.',
          ],
        },
        {
          heading: 'Se você trabalha por meio de uma agência',
          body: [
            'A lei impõe duas proteções específicas a quem é cedido por uma agência de trabalho, e ambas valem para a TalentPartnerID como para qualquer outra.',
            'A primeira: a agência e a empresa usuária são obrigadas a assegurar que as condições de trabalho e salariais do trabalhador cedido não sejam piores do que são — ou do que seriam — as de um trabalhador comparável. O "ou seriam" importa: a proteção não desaparece quando a empresa usuária não tem um empregado próprio na mesma função. Se as condições forem piores, a agência é obrigada a restabelecer a igualdade, a pedido seu ou por iniciativa própria ao constatar o fato, e você pode exigir dela os direitos daí decorrentes.',
            'A segunda: uma agência não pode ceder o mesmo trabalhador à mesma empresa usuária por mais de 12 meses civis consecutivos. Há exceções — pedido do próprio trabalhador, ou substituição de alguém em licença-maternidade, paternidade ou parental.',
          ],
        },
        {
          heading: 'Obrigações ligadas à residência e ao trabalho',
          body: [
            'A autorização traz deveres: comunicar mudanças relevantes às autoridades dentro dos prazos, manter a validade dos documentos e respeitar o vínculo entre a autorização e o posto de trabalho.',
            'Prazos aqui são reais. Perder um prazo de comunicação pode afetar a autorização, e regularizar depois costuma ser mais difícil do que cumprir a tempo.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Onde procurar ajuda',
          body: [
            'A fiscalização do cumprimento da legislação laboral, inclusive em matéria de remuneração, cabe ao Státní úřad inspekce práce — o Órgão Estatal de Inspeção do Trabalho — e aos inspetorados regionais competentes pelo local onde o trabalho é prestado. É a essa instância que se leva uma questão de salário abaixo do mínimo, de adicionais não pagos ou de condições piores que as de um trabalhador comparável.',
            'O Ministério do Interior responde pelas questões de residência. Existem ainda organizações de apoio a estrangeiros que prestam aconselhamento gratuito.',
            'A TalentPartnerID não substitui nenhuma dessas instâncias e não presta aconselhamento jurídico. Se a sua situação envolver direitos laborais ou residência, procure a autoridade competente.',
          ],
        },
      ],
      cta: { label: 'Onde verificar informações oficiais', targetConceptId: 'verify-official-info' },
      freshness: freshness(
        'conceptual',
        [LATAM_SRC.labourOffice, LABOUR_SRC.labourCode, LABOUR_SRC.minimumWage, LABOUR_SRC.minimumWageNotice, LABOUR_SRC.labourInspection],
        'LATAM',
        undefined,
        STATUTORY_YEAR,
      ),
    },
  },

  'verify-official-info': {
    'pt-BR': {
      title: 'Onde verificar informações oficiais | TalentPartnerID',
      description:
        'As instituições tchecas que publicam informação oficial sobre residência, trabalho, reconhecimento profissional e procedimento consular — e como usá-las para conferir o que leu.',
      h1: 'Onde verificar informações oficiais',
      intro:
        'Nenhuma agência de recrutamento — inclusive esta — é fonte oficial sobre imigração. Esta página reúne as instituições que são, para que você possa conferir qualquer afirmação, incluindo as nossas.',
      breadcrumb: 'Verificar informações oficiais',
      sections: [
        {
          heading: 'Residência e autorizações',
          body: [
            'O Ministério do Interior da República Tcheca decide sobre autorizações de residência, incluindo o cartão de empregado, e publica requisitos, anexos e prazos.',
            'O Ministério das Relações Exteriores publica informação sobre vistos e residência e mantém as páginas dos postos consulares.',
          ],
        },
        {
          heading: 'Trabalho, permissões e mercado de trabalho',
          body: [
            'O Ministério da Indústria e Comércio publica os textos dos programas de migração econômica, incluindo quais países cada programa abrange e quais classes CZ-ISCO cobre.',
          ],
          list: {
            items: [
              'Permissões e obrigações de comunicação — Úřad práce ČR (Escritório de Trabalho) e, em termos metodológicos, o MPSV (Ministério do Trabalho e dos Assuntos Sociais)',
              'Fiscalização e inspeções — Státní úřad inspekce práce (SÚIP), a Inspeção Estatal do Trabalho',
              'Mobilidade laboral na União Europeia — rede EURES',
              'Estatísticas do mercado de trabalho — Český statistický úřad (ČSÚ), o Instituto Estatístico Tcheco',
            ],
          },
        },
        {
          heading: 'Seguros e impostos',
          body: [
            'Esta página não indica valores de contribuições nem alíquotas: eles mudam, e um número desatualizado aqui seria pior do que nenhum. As instituições abaixo publicam os valores vigentes.',
          ],
          list: {
            items: [
              'Seguro social e sua coordenação — Česká správa sociálního zabezpečení (ČSSZ)',
              'Seguro de saúde — as seguradoras de saúde tchecas, por exemplo a VZP',
              'Imposto de renda — Finanční správa, a administração fiscal tcheca',
            ],
          },
          freshness: 'procedural',
        },
        {
          heading: 'Profissões regulamentadas',
          body: [
            'O Ministério da Saúde da República Tcheca responde pelo reconhecimento de qualificações nas profissões de saúde e pela prova de aptidão.',
          ],
        },
        {
          heading: 'Três perguntas com resposta institucional',
          body: [
            'A quem se dirigir sobre o cartão de empregado ou o cartão azul: ao Ministério do Interior, Departamento de Política de Asilo e Migração (OAMP), que decide sobre as autorizações de residência e publica as condições vigentes.',
            'Onde verificar obrigações e comunicações no emprego de estrangeiros: junto ao Úřad práce ČR, com orientação metodológica do MPSV. A fiscalização cabe à Inspeção Estatal do Trabalho (SÚIP).',
            'Onde consultar as alíquotas atuais de contribuições e impostos: as do seguro social junto à ČSSZ, as do seguro de saúde junto às seguradoras de saúde e as questões fiscais junto à administração fiscal.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Como conferir o que leu, aqui ou em qualquer lugar',
          body: [
            'Verifique se a afirmação indica a fonte e a data. Desconfie de números redondos sem origem, de prazos apresentados como garantidos e de qualquer promessa de resultado.',
            'Cada página desta seção indica quando foi verificada pela última vez e com base em quais fontes. Se encontrar divergência entre o que dizemos e a fonte oficial, a fonte oficial prevalece — e avise-nos.',
          ],
        },
      ],
      cta: { label: 'Perguntas frequentes', targetConceptId: 'candidate-faq' },
      freshness: freshness(
        'conceptual',
        [LATAM_SRC.employeeCardMzv, LATAM_SRC.labourOffice, LATAM_SRC.approbationExam, LATAM_SRC.programQualified],
        'LATAM',
      ),
    },
  },
}
