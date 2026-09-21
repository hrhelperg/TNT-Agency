/**
 * PT-BR and ES copy for the candidate application.
 *
 * Keyed by CandidateLocale, so adding a candidate locale without its form copy
 * fails the build rather than rendering an English form at a Portuguese reader.
 */
import type { CandidateLocale } from '../locale/chrome'

export interface ApplicationCopy {
  readonly labels: Readonly<Record<string, string>>
  readonly hints: Readonly<Record<string, string>>
  readonly options: Readonly<Record<string, string>>
  readonly errors: Readonly<Record<string, string>>
  readonly errorSummaryTitle: string
  readonly groupTitles: Readonly<Record<string, string>>
  readonly consentLabel: string
  readonly submit: string
  /** The attachment instruction. Shown before the form AND in the success state. */
  readonly attachWarning: string
  readonly successTitle: string
  readonly successBody: string
  readonly successAttach: string
  readonly fallbackTitle: string
  readonly fallbackBody: string
  readonly copyButton: string
  readonly copied: string
  readonly bodyLabel: string
  readonly subject: string
  readonly required: string
  readonly optional: string
}

export const APPLICATION_COPY: Readonly<Record<CandidateLocale, ApplicationCopy>> = {
  'pt-BR': {
    groupTitles: { about: 'Sobre você', work: 'Experiência e disponibilidade', contact: 'Contato' },
    labels: {
      fullName: 'Nome completo',
      country: 'País onde você mora',
      city: 'Cidade',
      fieldOfWork: 'Área de atuação',
      currentRole: 'Função atual ou mais recente',
      experience: 'Anos de experiência',
      languages: 'Idiomas',
      availability: 'Disponibilidade para mudança',
      message: 'Algo que devemos saber',
      email: 'E-mail',
      phone: 'Telefone',
      consent: 'Consentimento',
    },
    hints: {
      languages: 'Por exemplo: português nativo, inglês intermediário',
      currentRole: 'Por exemplo: soldador MIG/MAG, engenheiro de processo',
      message: 'Habilitações técnicas, certificados, restrições de data. Opcional.',
      phone: 'Com código do país. Opcional.',
    },
    options: {
      'fieldOfWork.engineering': 'Engenharia e especialidades técnicas',
      'fieldOfWork.technical': 'Profissões técnicas (manutenção, automação, soldadura, CNC)',
      'fieldOfWork.manufacturing': 'Indústria e produção',
      'fieldOfWork.logistics': 'Logística e armazém',
      'fieldOfWork.healthcare': 'Profissões de saúde',
      'fieldOfWork.other': 'Outra',
      'experience.lt1': 'Menos de 1 ano',
      'experience.1to3': '1 a 3 anos',
      'experience.3to5': '3 a 5 anos',
      'experience.5to10': '5 a 10 anos',
      'experience.gt10': 'Mais de 10 anos',
      'availability.immediately': 'Imediata',
      'availability.within3months': 'Nos próximos 3 meses',
      'availability.later': 'Mais adiante',
      'availability.unsure': 'Ainda não sei',
    },
    errors: {
      required: 'Este campo é obrigatório.',
      invalidEmail: 'Verifique o endereço de e-mail.',
      tooLong: 'Texto longo demais.',
      invalidOption: 'Escolha uma das opções.',
    },
    errorSummaryTitle: 'Corrija os campos abaixo antes de enviar',
    consentLabel:
      'Concordo que a TalentPartnerID trate os meus dados e o meu currículo para avaliar esta candidatura e, havendo correspondência, apresentá-los a um empregador tcheco.',
    submit: 'Abrir e-mail com a candidatura',
    attachWarning: 'Anexe o seu currículo antes de enviar — isso não acontece automaticamente.',
    successTitle: 'O seu programa de e-mail deve ter aberto',
    successBody:
      'A mensagem foi montada com os dados que você preencheu. Ela ainda NÃO foi enviada: só chega até nós quando você a enviar do seu e-mail.',
    successAttach: 'Antes de enviar: anexe o seu currículo à mensagem.',
    fallbackTitle: 'Se nada abriu',
    fallbackBody:
      'Escreva para o endereço abaixo a partir do e-mail que você usa normalmente, cole o texto e anexe o currículo.',
    copyButton: 'Copiar texto da mensagem',
    copied: 'Texto copiado.',
    bodyLabel: 'Texto da mensagem',
    subject: 'Candidatura',
    required: 'obrigatório',
    optional: 'opcional',
  },
  es: {
    groupTitles: { about: 'Sobre usted', work: 'Experiencia y disponibilidad', contact: 'Contacto' },
    labels: {
      fullName: 'Nombre completo',
      country: 'País donde vive',
      city: 'Ciudad',
      fieldOfWork: 'Área de trabajo',
      currentRole: 'Puesto actual o más reciente',
      experience: 'Años de experiencia',
      languages: 'Idiomas',
      availability: 'Disponibilidad para mudarse',
      message: 'Algo que debamos saber',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      consent: 'Consentimiento',
    },
    hints: {
      languages: 'Por ejemplo: español nativo, inglés intermedio',
      currentRole: 'Por ejemplo: soldador MIG/MAG, ingeniero de procesos',
      message: 'Habilitaciones técnicas, certificados, restricciones de fecha. Opcional.',
      phone: 'Con código de país. Opcional.',
    },
    options: {
      'fieldOfWork.engineering': 'Ingeniería y especialidades técnicas',
      'fieldOfWork.technical': 'Profesiones técnicas (mantenimiento, automatización, soldadura, CNC)',
      'fieldOfWork.manufacturing': 'Industria y producción',
      'fieldOfWork.logistics': 'Logística y almacén',
      'fieldOfWork.healthcare': 'Profesiones de la salud',
      'fieldOfWork.other': 'Otra',
      'experience.lt1': 'Menos de 1 año',
      'experience.1to3': '1 a 3 años',
      'experience.3to5': '3 a 5 años',
      'experience.5to10': '5 a 10 años',
      'experience.gt10': 'Más de 10 años',
      'availability.immediately': 'Inmediata',
      'availability.within3months': 'En los próximos 3 meses',
      'availability.later': 'Más adelante',
      'availability.unsure': 'Todavía no lo sé',
    },
    errors: {
      required: 'Este campo es obligatorio.',
      invalidEmail: 'Revise la dirección de correo.',
      tooLong: 'El texto es demasiado largo.',
      invalidOption: 'Elija una de las opciones.',
    },
    errorSummaryTitle: 'Corrija los campos siguientes antes de enviar',
    consentLabel:
      'Acepto que TalentPartnerID trate mis datos y mi CV para evaluar esta postulación y, si hay correspondencia, presentarlos a un empleador checo.',
    submit: 'Abrir correo con la postulación',
    attachWarning: 'Adjunte su CV antes de enviar — esto no ocurre automáticamente.',
    successTitle: 'Su programa de correo debería haberse abierto',
    successBody:
      'El mensaje se ha compuesto con los datos que usted completó. Todavía NO se ha enviado: solo nos llega cuando usted lo envía desde su correo.',
    successAttach: 'Antes de enviar: adjunte su CV al mensaje.',
    fallbackTitle: 'Si no se abrió nada',
    fallbackBody:
      'Escriba a la dirección de abajo desde el correo que usa habitualmente, pegue el texto y adjunte el CV.',
    copyButton: 'Copiar el texto del mensaje',
    copied: 'Texto copiado.',
    bodyLabel: 'Texto del mensaje',
    subject: 'Postulación',
    required: 'obligatorio',
    optional: 'opcional',
  },
}
