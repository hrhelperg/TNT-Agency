/**
 * PT-BR — profession pages.
 *
 * Order here is the order of actual legal accessibility established in P1, not
 * the order of recruitment volume. Program vysoce kvalifikovaný zaměstnanec
 * "není teritoriálně omezen" and covers CZ-ISCO 1-3, so engineers and
 * specialists have a genuinely open programme route; Brazil is absent from the
 * qualified-worker programme covering CZ-ISCO 4-8, so manufacturing and
 * logistics have none. Leading with volume manufacturing would be the single
 * most misleading thing this corpus could do.
 *
 * No page names a vacancy, a salary, an employer or a count. There is no
 * vacancy source of truth, so nothing here may imply one exists.
 */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { LABOUR_SRC } from '../sources-labour'
import { freshness } from '../freshness'

export const PTBR_PROFESSIONS: LocaleCorpus = {
  'work-for-engineers': {
    'pt-BR': {
      title: 'Trabalho para engenheiros na República Tcheca | TalentPartnerID',
      description:
        'Engenheiros e especialistas técnicos são o perfil com o caminho legal mais aberto na República Tcheca: o programa de trabalhador altamente qualificado não tem limitação territorial. O que isso significa na prática.',
      h1: 'Trabalho para engenheiros',
      intro:
        'Para engenheiros e especialistas técnicos existe um caminho que não existe para outros perfis. O Programa de trabalhador altamente qualificado não tem limitação de país de origem, o que o torna acessível a candidatos brasileiros e latino-americanos — desde que a função concreta e o empregador cumpram as condições.',
      breadcrumb: 'Trabalho para engenheiros',
      sections: [
        {
          heading: 'Por que este perfil tem um caminho diferente',
          body: [
            'O Program vysoce kvalifikovaný zaměstnanec se aplica a trabalhadores de todos os países terceiros, sem limitação territorial, e abrange atividades dos grandes grupos 1 a 3 da classificação tcheca de ocupações CZ-ISCO.',
            'É uma diferença estrutural, não uma vantagem comercial que possamos conceder: o outro programa governamental, que cobre as classes 4 a 8, se aplica a uma lista fechada de países na qual o Brasil não está.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'O que "onde as condições forem cumpridas" significa',
          body: [
            'O programa não se aplica automaticamente a quem tem diploma de engenharia. Quem determina a aplicabilidade é a classificação da função concreta e o empregador. Do lado do empregador, o programa de trabalhador altamente qualificado exige uma empresa que atue há pelo menos dois anos na República Tcheca, esteja em dia com as obrigações perante o Estado e tenha empregado pelo menos três pessoas por pelo menos três meses consecutivos nos dois anos anteriores ao pedido. Um empregador que não cumpra isso pode ainda assim se enquadrar no programa de pessoal-chave e científico, que não impõe esses requisitos.',
            'Na prática, é a função oferecida — e como ela é classificada — que decide, não o título do diploma. Uma função de engenharia classificada fora das classes 1 a 3 não entra no programa.',
          ],
        },
        {
          heading: 'Existe também a modrá karta, e ela não é um programa',
          body: [
            'Além dos programas, existe uma autorização própria para funções que exigem alta qualificação: a modrá karta, o Cartão Azul da UE. Ela não tem limitação de país de origem.',
            'Segundo o Ministério dos Negócios Estrangeiros tcheco, destina-se a cidadãos de países terceiros que serão empregados na República Tcheca por mais de três meses em um emprego que exija alta qualificação. Exige contrato de pelo menos um ano na jornada semanal prevista em lei e salário correspondente a pelo menos 1,5 vez o salário bruto anual médio.',
            'Para um engenheiro com formação concluída e uma proposta acima desse patamar, é um caminho a considerar ao lado do cartão de empregado. Quem decide continua sendo a autoridade tcheca.',
          ],
        },
        {
          heading: 'Áreas em que recrutamos este perfil',
          body: [
            'Recrutamos para necessidades reais de empregadores tchecos. As áreas abaixo são as que aparecem com mais frequência; não são uma lista de posições abertas, e não publicamos posições neste site.',
          ],
          list: {
            items: [
              'Engenharia de processo e de produção',
              'Engenharia de projeto e desenvolvimento',
              'Automação e sistemas de controle',
              'Qualidade e engenharia de qualidade',
              'Manutenção de nível técnico superior',
            ],
          },
        },
        {
          heading: 'O que ainda depende do processo normal',
          body: [
            'Participar do programa não muda o conjunto de requisitos e não encurta o prazo de decisão. O que ele garante é a possibilidade de apresentar o pedido no posto consular — inclusive junto com os familiares mais próximos — e a simplificação da parte administrativa. Continua sendo necessário um empregador, um contrato, um posto de trabalho registrado, os documentos e a decisão da autoridade tcheca. A inclusão no programa vale por um ano.',
            'Também continua valendo o limite de validade: o cartão de empregado é emitido pelo período do contrato e por no máximo dois anos de cada vez.',
          ],
        },
        {
          heading: 'Jornada e horas extras',
          body: [
            'Funções de engenharia costumam ter jornada semanal legal de 40 horas, sem o regime de turnos que reduz essa jornada na produção.',
            'A hora extra continua sendo excepcional por lei: no máximo 8 horas por semana e 150 horas por ano civil quando determinada pelo empregador, e acima disso apenas com a sua concordância. O pagamento é o salário correspondente mais adicional de pelo menos 25% do salário médio, salvo folga compensatória acordada.',
          ],
        },
      ],
      cta: { label: 'Candidate-se', targetConceptId: 'candidate-apply' },
      freshness: freshness(
        'conceptual',
        [LATAM_SRC.programHighlyQualified,
          LATAM_SRC.programKeyPersonnel,
          LATAM_SRC.blueCard,
          LATAM_SRC.employeeCardMzv,
          LATAM_SRC.residenceAct, LABOUR_SRC.labourCode],
        'LATAM',
      ),
    },
  },

  'technical-professions': {
    'pt-BR': {
      title: 'Profissões técnicas na República Tcheca | TalentPartnerID',
      description:
        'Manutenção, automação, eletricistas, soldadores e operadores CNC: onde passa a fronteira legal entre profissões técnicas com programa disponível e as que dependem do cartão de empregado padrão.',
      h1: 'Profissões técnicas',
      intro:
        'As profissões técnicas ficam exatamente em cima da fronteira que separa os dois programas governamentais. Algumas alcançam a faixa em que o programa sem limitação territorial se aplica; outras não. Esta página explica onde está essa linha, porque ela muda o caminho na prática.',
      breadcrumb: 'Profissões técnicas',
      sections: [
        {
          heading: 'A fronteira, em termos concretos',
          body: [
            'O programa de trabalhador altamente qualificado abrange as classes CZ-ISCO 1 a 3. Funções técnicas de nível médio — incluindo parte das funções de manutenção e de automação — podem alcançar a classe 3.',
            'Ofícios como soldagem e a operação de máquinas CNC classificam-se normalmente no grande grupo 7. Esse grupo pertence ao outro programa, do qual o Brasil não faz parte, e portanto não tem via de programa disponível para candidatos brasileiros.\n\nUma distinção que vale conhecer: a PROGRAMAÇÃO de máquinas CNC é classificada de forma diferente da operação. A classificação tcheca de ocupações coloca o programador de máquinas de comando numérico no grande grupo 3, que é o grupo alcançado pelo programa sem limitação territorial. Se a sua experiência inclui programação, e não apenas operação e preparação, diga isso explicitamente na candidatura.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'O que isso significa se você é soldador ou operador CNC',
          body: [
            'Significa que o caminho é o cartão de empregado padrão: um empregador tcheco com necessidade real, um posto de trabalho registrado, contrato e o pedido no posto consular competente.',
            'É um caminho legal e usado. Não é um caminho acelerado, e não prometemos que seja — quem disser o contrário está descrevendo um programa que não se aplica ao seu caso.',
          ],
        },
        {
          heading: 'Certificações técnicas são um obstáculo separado',
          body: [
            'Independentemente da imigração, atividades como soldagem e trabalhos elétricos exigem certificações específicas segundo as normas tchecas. Um certificado obtido no Brasil pode não ser suficiente para a tarefa concreta.',
            'Isso não se resolve com o pedido de residência: é uma exigência técnica própria, e vale esclarecê-la com o empregador antes de contar com ela.',
          ],
        },
        {
          heading: 'Perfis que recrutamos nesta área',
          body: [
            'As funções abaixo aparecem com frequência entre as necessidades dos empregadores com quem trabalhamos. Não são posições abertas: não publicamos vagas neste site.',
          ],
          list: {
            items: [
              'Técnicos de manutenção industrial',
              'Técnicos de automação',
              'Eletricistas industriais',
              'Soldadores',
              'Operadores e programadores CNC',
              'Mecânicos industriais',
            ],
          },
        },
        {
          heading: 'Turnos e jornada, quando a função é em produção',
          body: [
            'Soldadores e operadores CNC trabalham com frequência em regime de turnos, e isso muda a jornada semanal legal: 38,75 horas em dois turnos, 37,5 horas em turnos múltiplos ou regime ininterrupto, em vez de 40.',
            'O turno máximo é de 12 horas e o descanso entre turnos, de pelo menos 11 horas. A hora extra é excepcional por lei: no máximo 8 horas por semana e 150 horas por ano quando determinada pelo empregador, com adicional de pelo menos 25%.',
          ],
        },
      ],
      cta: { label: 'Candidate-se', targetConceptId: 'candidate-apply' },
      freshness: freshness(
        'conceptual',
        [LATAM_SRC.programHighlyQualified, LATAM_SRC.programQualified, LATAM_SRC.employeeCardMzv, LABOUR_SRC.labourCode],
        'LATAM',
      ),
    },
  },

  'work-in-manufacturing': {
    'pt-BR': {
      title: 'Trabalho na indústria na República Tcheca | TalentPartnerID',
      description:
        'Produção, montagem e operação de máquinas na República Tcheca: por que o programa de trabalhador qualificado não está disponível a candidatos brasileiros e qual é o caminho legal que resta.',
      h1: 'Trabalho na indústria',
      intro:
        'A indústria tcheca emprega muitos trabalhadores estrangeiros, e é provavelmente a área sobre a qual circula mais informação enganosa dirigida a brasileiros. Esta página explica, sem rodeios, qual é o caminho legal disponível — e qual não é.',
      breadcrumb: 'Trabalho na indústria',
      sections: [
        {
          heading: 'O programa de trabalhador qualificado não se aplica a candidatos brasileiros',
          body: [
            'O Program kvalifikovaný zaměstnanec cobre as classes CZ-ISCO 4 a 8, que é onde se classifica a maior parte das funções industriais. Ele se aplica a uma lista fechada de países, e o Brasil não está nela — nem qualquer país da América Latina.',
            'Se um anúncio sugere que existe um programa que facilita a vinda de brasileiros para trabalhar na produção tcheca, ele está descrevendo algo que não existe.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'O caminho que existe',
          body: [
            'Resta o cartão de empregado (zaměstnanecká karta) padrão. Ele exige um empregador tcheco com uma necessidade concreta, um posto de trabalho registrado, um contrato ou promessa de emprego, os documentos exigidos e a decisão da autoridade tcheca.',
            'Não há atalho, não há via acelerada e não há prazo garantido. Sem um posto registrado não existe pedido a apresentar — é por aí que o processo começa, e não pelo consulado.',
          ],
        },
        {
          heading: 'Seja realista quanto às chances',
          body: [
            'Como não há via de programa, esses processos dependem inteiramente de um empregador disposto a percorrer o procedimento padrão. Isso acontece, mas com muito menos frequência do que a demanda sugere.',
            'Preferimos dizer isso agora a deixar alguém organizar uma mudança de vida em torno de uma expectativa que não se sustenta.',
          ],
        },
        {
          heading: 'Funções desta área',
          body: [
            'As funções abaixo indicam o tipo de perfil que empregadores da indústria costumam procurar. Não são posições abertas, e não publicamos lista de vagas.',
          ],
          list: {
            items: [
              'Operadores de produção',
              'Montadores de linha',
              'Operadores de máquinas',
              'Controle e inspeção de qualidade',
              'Produção automotiva',
              'Indústria de alimentos',
            ],
          },
        },
        {
          heading: 'A jornada legal nesta área, em números',
          body: [
            'Produção costuma funcionar em turnos, e o regime de turnos muda a jornada legal. Em regime de dois turnos, a jornada semanal legal é de 38,75 horas; em regime de turnos múltiplos — três ou mais turnos que se revezam em 24 horas — ou ininterrupto, é de 37,5 horas, e não 40.',
            'Isso não é um detalhe: o salário mínimo por hora sobe proporcionalmente quando a jornada semanal é menor, e o tempo além da jornada legal do seu regime conta como hora extra.',
            'Um turno não pode passar de 12 horas. Quem trabalha à noite tem turno limitado a 8 horas em 24 horas, adicional noturno e exame médico ocupacional pago pelo empregador.',
          ],
        },
      ],
      cta: { label: 'Como funciona o recrutamento', targetConceptId: 'how-recruitment-works' },
      freshness: freshness(
        'conceptual',
        [LATAM_SRC.programQualified, LATAM_SRC.employeeCardMzv, LATAM_SRC.labourOffice, LABOUR_SRC.labourCode],
        'LATAM',
      ),
    },
  },

  'work-in-logistics': {
    'pt-BR': {
      title: 'Trabalho em logística na República Tcheca | TalentPartnerID',
      description:
        'Armazém e distribuição na República Tcheca: por que este é o perfil com o caminho legal mais estreito para candidatos brasileiros, e o que isso significa antes de planejar qualquer mudança.',
      h1: 'Trabalho em logística',
      intro:
        'Esta é a área com a base legal mais estreita de toda esta seção, e seria desonesto apresentá-la de outra forma. Há demanda real por trabalhadores de armazém e distribuição na República Tcheca, e ao mesmo tempo é o perfil para o qual um candidato brasileiro tem menos caminhos disponíveis.',
      breadcrumb: 'Trabalho em logística',
      sections: [
        {
          heading: 'Nenhum programa governamental cobre este caso',
          body: [
            'As funções de armazém e distribuição se espalham por vários grandes grupos da classificação tcheca: parte do trabalho administrativo de logística fica no grupo 4, a operação de empilhadeiras e o trabalho de armazenista no grupo 8, e as funções auxiliares no grupo 9. O programa de trabalhador qualificado cobre os grupos 4 a 8 — o grupo 9 fica de fora dele por definição — e, além disso, esse programa se aplica a uma lista de países que não inclui o Brasil.',
            'O programa de trabalhador altamente qualificado cobre as classes 1 a 3 e não alcança estas funções. Ou seja: não há via de programa por nenhum dos dois lados.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'O que resta, e o que isso exige',
          body: [
            'Resta o cartão de empregado padrão, com todas as suas condições: empregador, posto de trabalho registrado, contrato, documentos e decisão da autoridade. As exigências de qualificação e as condições do posto costumam ser precisamente o ponto mais difícil de cumprir nesta faixa.',
            'Publicamos esta página porque a demanda é real e porque quem procura merece a informação completa — não para convidar candidaturas em escala.',
          ],
        },
        {
          heading: 'Antes de planejar qualquer coisa',
          body: [
            'Se a logística é o seu único perfil e você está avaliando uma mudança para a Europa, vale planejar contando com a possibilidade de que este caminho não se concretize.',
            'Se você tem também experiência técnica — manutenção, operação de empilhadeira com certificação, operação de equipamentos, qualidade — vale indicá-la na candidatura: ela pode abrir um enquadramento diferente.',
          ],
        },
        {
          heading: 'A jornada legal nesta área, em números',
          body: [
            'Armazéns e centros de distribuição operam com frequência em turnos e em fins de semana, e a lei trata os dois casos de forma específica.',
            'Em regime de dois turnos a jornada semanal legal é de 38,75 horas; em regime de turnos múltiplos ou ininterrupto, 37,5 horas. Um turno não passa de 12 horas, e entre turnos há direito a pelo menos 11 horas de descanso.',
            'Trabalho noturno e trabalho em sábado e domingo têm adicional de pelo menos 10% do salário médio — com a ressalva, feita pela própria lei, de que um mínimo diferente pode ser acordado. Esses adicionais somam-se ao salário mínimo e não podem ser usados para alcançá-lo.',
          ],
        },
      ],
      cta: { label: 'Profissões técnicas', targetConceptId: 'technical-professions' },
      freshness: freshness(
        'conceptual',
        [LATAM_SRC.programQualified, LATAM_SRC.programHighlyQualified, LATAM_SRC.employeeCardMzv, LABOUR_SRC.labourCode],
        'LATAM',
      ),
    },
  },

  'healthcare-regulated-professions': {
    'pt-BR': {
      title: 'Profissões de saúde regulamentadas na República Tcheca | TalentPartnerID',
      description:
        'Médicos, enfermeiros e outras profissões de saúde na República Tcheca: reconhecimento de qualificação, prova de aptidão (aprobační zkouška), exigência de tcheco e o que uma agência de recrutamento não pode fazer.',
      h1: 'Profissões de saúde regulamentadas',
      intro:
        'Profissões de saúde não seguem o mesmo caminho das demais. O obstáculo principal não é a imigração — é a autorização para exercer a profissão, que tem procedimento próprio, exame e exigência de idioma. Esta página explica esse percurso e diz claramente o que está fora do nosso alcance.',
      breadcrumb: 'Profissões de saúde',
      sections: [
        {
          heading: 'A autorização de exercício é o obstáculo, não o visto',
          body: [
            'Para a maior parte dos perfis de saúde, a classificação da profissão fica nas faixas alcançadas pelo programa de trabalhador altamente qualificado, o que torna a parte migratória comparativamente mais acessível.',
            'Isso não ajuda enquanto não houver autorização para exercer. Exercer medicina, odontologia, farmácia ou enfermagem na República Tcheca sem o reconhecimento exigido não é possível, independentemente da autorização de residência.',
          ],
        },
        {
          heading: 'Médicos, dentistas e farmacêuticos',
          body: [
            'Quem obteve a formação fora da União Europeia deve, nos termos do § 34 da Lei n.º 95/2004 Sb., comprovar aptidão para o exercício, idoneidade e ser aprovado na prova de aptidão — a aprobační zkouška.',
            'A prova verifica conhecimentos teóricos, conhecimento do sistema de saúde tcheco e a capacidade de comunicar profissionalmente em tcheco. É pré-requisito comprovar o reconhecimento do diploma estrangeiro como equivalente a um programa de mestrado acreditado na área da saúde.',
            'O Ministério da Saúde decide sobre o reconhecimento em até 240 dias a contar da entrega completa dos documentos exigidos.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Enfermeiros e demais profissões não médicas',
          body: [
            'As profissões de saúde não médicas, incluindo enfermagem, se regem pela Lei n.º 96/2004 Sb., alterada com efeitos a partir de 1 de janeiro de 2026.',
            'Para quem obteve a qualificação fora da União Europeia, do Espaço Econômico Europeu e da Suíça, o reconhecimento está igualmente condicionado à aprovação na prova de aptidão.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'O tcheco não é opcional aqui',
          body: [
            'Em muitas funções técnicas o idioma é uma vantagem. Nas profissões de saúde ele é um requisito legal do reconhecimento, verificado em prova.',
            'Um projeto realista nesta área começa pelo idioma e pelo reconhecimento, com anos — não meses — de horizonte.',
          ],
        },
        {
          heading: 'O que a TalentPartnerID pode e não pode fazer',
          body: [
            'Podemos explicar o percurso, indicar as fontes oficiais e, quando houver uma necessidade concreta de um empregador e a sua situação de reconhecimento permitir, apresentar o seu perfil.',
            'Não podemos abreviar, dispensar ou acelerar o reconhecimento; não aplicamos nem influenciamos a prova de aptidão; e não colocamos profissionais de saúde para exercer sem autorização. Um médico brasileiro não é recrutado pelo mesmo caminho de um operador CNC, e apresentar as duas coisas como equivalentes seria enganoso.',
          ],
        },
        {
          heading: 'A jornada na saúde tem uma exceção que não existe em nenhuma outra área',
          body: [
            'A regra geral tcheca é que um turno não pode passar de 12 horas. A saúde é a única exceção prevista em lei: em operação ininterrupta de prestador de cuidados hospitalares ou de serviço de emergência, a jornada de médicos, dentistas, farmacêuticos e profissionais não médicos pode chegar a 24 horas dentro de 26 horas consecutivas.',
            'Essa exceção não é automática. Ela só vale se estiver acordada em convenção coletiva ou prevista em norma interna do empregador. Vale conferir qual regime se aplica ao posto antes de aceitar uma proposta.',
          ],
        },
      ],
      cta: { label: 'Reconhecimento de qualificações', targetConceptId: 'qualification-recognition' },
      freshness: freshness(
        'procedural',
        [LATAM_SRC.healthProfessionsAct,
          LATAM_SRC.nonMedicalHealthAct,
          LATAM_SRC.approbationExam,
          LATAM_SRC.programHighlyQualified, LABOUR_SRC.labourCode],
        'LATAM',
      ),
    },
  },
}
