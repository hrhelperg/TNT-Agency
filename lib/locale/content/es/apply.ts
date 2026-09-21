/** ES — application and candidate data notice. Mailto-first; the CV is attached by the candidate. */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { freshness } from '../freshness'
import { OPERATOR_EMAIL, OPERATOR_LEGAL_NAME, OPERATOR_SEAT } from '../../../content/trust-data'

export const ES_APPLY: LocaleCorpus = {
  'candidate-apply': {
    es: {
      title: 'Postularme | TalentPartnerID',
      description:
        'Envíe su postulación para trabajar en Chequia. El formulario abre su programa de correo con el mensaje listo — usted adjunta el CV y lo envía.',
      h1: 'Postularme',
      intro:
        'La postulación se envía desde su propio correo. Usted completa el formulario, su programa de correo se abre con el mensaje ya redactado, usted adjunta el CV y lo envía. Así ningún CV queda almacenado en este sitio.',
      breadcrumb: 'Postularme',
      sections: [
        {
          heading: 'Cómo funciona, en cuatro pasos',
          body: ['Lea los cuatro pasos antes de empezar. El tercero es el que la gente olvida.'],
          list: {
            ordered: true,
            items: [
              'Complete el formulario que aparece abajo.',
              'Al enviar, su programa de correo se abre con el mensaje ya completado.',
              'Adjunte su CV al mensaje — esto no ocurre automáticamente.',
              'Envíe el mensaje. La postulación solo nos llega después de este paso.',
            ],
          },
        },
        {
          heading: 'Si su programa de correo no se abre',
          body: [
            `No todos los dispositivos tienen un programa de correo configurado. Si no se abre nada, escriba directamente a ${OPERATOR_EMAIL} desde el correo que usa habitualmente, adjuntando el CV.`,
            'El texto del mensaje también queda disponible en la página para copiarlo y pegarlo. No se pierde nada si el paso automático falla.',
          ],
        },
        {
          heading: 'Qué incluir en el CV',
          body: [
            'Experiencia con fechas, funciones y empleadores; formación y certificados relevantes; idiomas; y disponibilidad para mudarse.',
            'Si tiene habilitaciones técnicas — soldadura, electricidad, operación de equipos, calidad — indíquelas explícitamente. Suelen ser las que cambian el encuadre de una postulación.',
          ],
        },
        {
          heading: 'Qué ocurre después',
          body: [
            'Leemos la postulación y evaluamos experiencia, cualificación y elegibilidad legal para el tipo de función. Le contactamos cuando haya correspondencia con una necesidad concreta de un empleador.',
            'La mayoría de las postulaciones no termina en contratación, como en cualquier proceso de selección. No cobramos nada en ninguna etapa.',
          ],
        },
        {
          heading: 'Sus datos',
          body: [
            'Pedimos solo lo necesario para evaluar la postulación y responder. El mensaje se envía de su correo al nuestro: los valores del formulario no van a la dirección de la página, ni al historial del navegador, ni a ninguna herramienta de analítica.',
            'La página sobre tratamiento de datos del candidato explica en detalle qué se procesa, con qué finalidad, durante cuánto tiempo y cuáles son sus derechos.',
          ],
        },
      ],
      cta: { label: 'Tratamiento de datos del candidato', targetConceptId: 'candidate-data-notice' },
      freshness: freshness('procedural', [LATAM_SRC.labourOffice], 'LATAM'),
    },
  },

  'candidate-data-notice': {
    es: {
      title: 'Tratamiento de datos del candidato | TalentPartnerID',
      description:
        'Quién opera TalentPartnerID, qué datos de candidatos se tratan, con qué finalidad y base legal, durante cuánto tiempo, quién los recibe y cómo ejercer sus derechos.',
      h1: 'Tratamiento de datos del candidato',
      intro:
        'Esta página explica qué ocurre con los datos que usted envía en una postulación. Es específica para candidatos y no sustituye la Política de Privacidad del sitio, a la que remite al final.',
      breadcrumb: 'Tratamiento de datos',
      sections: [
        {
          heading: 'Quién opera este sitio',
          body: [
            `TalentPartnerID es operado por ${OPERATOR_LEGAL_NAME}, sociedad constituida en la República Checa, con domicilio en ${OPERATOR_SEAT}.`,
            'Publicamos aquí solo los datos de la empresa que están verificados. El número de identificación de la persona jurídica y el número de licencia de agencia de empleo no se muestran mientras no estén verificados contra el registro oficial — preferimos no afirmar antes que afirmar sin confirmación. La empresa puede consultarse de forma independiente en el registro público checo de entidades económicas.',
          ],
        },
        {
          heading: 'Qué datos se tratan',
          body: [
            'Los datos que usted incluye en la postulación: nombre, datos de contacto, país y ciudad, profesión o área pretendida, experiencia, cualificaciones, idiomas y disponibilidad.',
            'Y el contenido del CV que usted adjunta. Un CV puede contener más información de la necesaria — fecha de nacimiento, estado civil, fotografía, nacionalidad. Nada de eso lo exigimos, y usted puede retirar de la versión que envía lo que no considere necesario.',
          ],
        },
        {
          heading: 'Con qué finalidad',
          body: [
            'Evaluar la postulación, responderle y, si hay correspondencia con una necesidad concreta, presentar su perfil a un empleador a efectos de una eventual contratación.',
            'No usamos los datos para publicidad, no los vendemos y no los cedemos a quien no esté involucrado en un proceso de reclutamiento concreto.',
          ],
        },
        {
          heading: 'Cómo nos llegan los datos',
          body: [
            'La postulación se envía por correo desde su propio programa de correo. Los valores del formulario componen el mensaje en su dispositivo; no se publican en la dirección de la página, no quedan en el historial del navegador, no se graban en el almacenamiento del navegador y no se envían a herramientas de analítica.',
            'El CV lo adjunta usted, en su propio mensaje. No pasa por este sitio y no se carga aquí.',
          ],
        },
        {
          heading: 'El papel de su proveedor de correo',
          body: [
            'Como el mensaje sale de su cuenta, pasa por su proveedor de correo y queda también en su carpeta de enviados. Ese proveedor lo elige usted y está fuera de nuestro control.',
            'Esto vale para cualquier envío por correo, y es una consecuencia del diseño que evita almacenar CV aquí. Si prefiere no usar correo, los datos de contacto telefónico están en la página de contacto.',
          ],
        },
        {
          heading: 'Quién puede recibir los datos',
          body: [
            'Internamente, las personas involucradas en el reclutamiento.',
            'Externamente, un empleador checo concreto, y solo cuando haya correspondencia real con una necesidad y a efectos de evaluar su postulación a esa posición. No enviamos perfiles de forma masiva a listas de empresas.',
          ],
        },
        {
          heading: 'Base legal',
          body: [
            'El tratamiento se basa en su consentimiento, otorgado al enviar la postulación, y en las gestiones previas a la celebración de un contrato realizadas a petición suya.',
            'El consentimiento puede retirarse en cualquier momento, sin que ello afecte a la licitud del tratamiento anterior.',
          ],
        },
        {
          heading: 'Durante cuánto tiempo',
          body: [
            'Conservamos la postulación mientras el proceso esté en curso y, después, hasta 12 meses, para poder volver a contactarle si surge algo adecuado a su perfil.',
            'Puede pedir la eliminación antes de ese plazo, y en ese caso borramos el mensaje y el CV de nuestros medios. Cumplido el plazo, la eliminación se produce sin necesidad de solicitud.',
          ],
        },
        {
          heading: 'Transferencia fuera del Espacio Económico Europeo',
          body: [
            'No transferimos postulaciones fuera del Espacio Económico Europeo. Los destinatarios posibles son la operadora del sitio, establecida en la República Checa, y empleadores checos.',
            'Su postulación parte, naturalmente, del país donde usted se encuentra, pero el tratamiento por nuestra parte ocurre en el Espacio Económico Europeo.',
          ],
        },
        {
          heading: 'Sus derechos',
          body: [
            'Tiene derecho a saber qué datos suyos se tratan y a obtener copia de ellos, a pedir la rectificación de datos inexactos, a pedir la supresión, a pedir la limitación del tratamiento, a oponerse al tratamiento y a retirar el consentimiento.',
            'Tiene igualmente derecho a presentar una reclamación ante la autoridad de protección de datos competente.',
          ],
        },
        {
          heading: 'Cómo ejercer sus derechos',
          body: [
            `Escriba a ${OPERATOR_EMAIL} desde la dirección con la que envió la postulación, indicando qué solicita. Si escribe desde otra dirección, podremos pedir información adicional para confirmar que la postulación es suya — lo que también le protege a usted.`,
            'Respondemos sin dilación indebida.',
          ],
        },
        {
          heading: 'Política de Privacidad',
          body: [
            'Esta página trata específicamente de las postulaciones. La Política de Privacidad general del sitio, que cubre también la navegación y las cookies, está publicada en inglés y es el documento de referencia.',
            'Nada de esta página excluye ni reduce lo que consta en la Política de Privacidad.',
          ],
        },
      ],
      cta: { label: 'Postularme', targetConceptId: 'candidate-apply' },
      freshness: freshness('conceptual', [LATAM_SRC.labourOffice], 'LATAM'),
    },
  },
}
