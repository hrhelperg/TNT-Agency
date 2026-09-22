/** ES — trust surfaces. Only verified operator facts; companyId and the MPSV permit stay gated. */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { freshness } from '../freshness'
import {
  OPERATOR_EMAIL,
  OPERATOR_LEGAL_NAME,
  OPERATOR_PHONE,
  OPERATOR_SEAT,
} from '../../../content/trust-data'

export const ES_TRUST: LocaleCorpus = {
  'about-us': {
    es: {
      title: 'Sobre TalentPartnerID | TalentPartnerID',
      description:
        'Quién opera TalentPartnerID, qué hacemos, qué no hacemos y cómo verificar de forma independiente lo que decimos sobre nosotros.',
      h1: 'Sobre nosotros',
      intro:
        'Usted está evaluando información de una empresa que no conoce, sobre una decisión que puede cambiarle la vida. Esta página existe para que pueda verificar quiénes somos en lugar de creernos.',
      breadcrumb: 'Sobre nosotros',
      sections: [
        {
          heading: 'Quién opera este sitio',
          body: [
            `TalentPartnerID es operado por ${OPERATOR_LEGAL_NAME}, sociedad constituida en la República Checa, con domicilio en ${OPERATOR_SEAT}.`,
            'La existencia y los datos registrales de la empresa pueden consultarse de forma independiente en el registro público checo de entidades económicas, sin depender de lo que digamos aquí.',
          ],
        },
        {
          heading: 'Qué publicamos y qué no publicamos sobre nosotros',
          body: [
            'Publicamos solo los datos de la empresa verificados contra el registro oficial: la denominación social y el domicilio.',
            'No publicamos el número de identificación de la persona jurídica ni el número de licencia de agencia de empleo, porque aún no están verificados contra la evidencia oficial. Preferimos dejar ese vacío visible antes que llenarlo con algo no confirmado, y se completará cuando la verificación esté hecha.',
          ],
        },
        {
          heading: 'Qué hacemos',
          body: [
            'Reclutamiento: evaluamos postulaciones, presentamos candidatos a empleadores checos y explicamos el proceso y sus límites.',
            'Publicamos también información sobre el trabajo legal en Chequia, con indicación de la fuente oficial y de la fecha en que fue verificada.',
          ],
        },
        {
          heading: 'Qué no hacemos',
          body: [
            'No somos un organismo del Estado checo, una embajada, una autoridad migratoria ni una institución de la Unión Europea, y no tenemos relación institucional alguna con esas entidades.',
            'No expedimos visas ni permisos de residencia, no resolvemos solicitudes, no influimos en los plazos y no garantizamos resultados. No cobramos al candidato.',
          ],
        },
        {
          heading: 'Cómo verificar lo que afirmamos',
          body: [
            'Cada página de esta sección indica las fuentes oficiales en las que se basa y la fecha de la última verificación. Las fuentes son instituciones checas, no intermediarios.',
            'Si encuentra una discrepancia entre lo que decimos y la fuente oficial, prevalece la fuente oficial — y agradecemos el aviso.',
          ],
        },
      ],
      cta: { label: 'Contacto', targetConceptId: 'contact' },
      freshness: freshness('conceptual', [LATAM_SRC.labourOffice], 'LATAM'),
    },
  },

  contact: {
    es: {
      title: 'Contacto | TalentPartnerID',
      description:
        'Cómo comunicarse con TalentPartnerID: correo, teléfono y domicilio en la República Checa. Para postulaciones, use la página de postulación.',
      h1: 'Contacto',
      intro:
        'Para enviar una postulación, use la página de postulación: así su mensaje llega con la información necesaria. Para cualquier otro asunto, los contactos están abajo.',
      breadcrumb: 'Contacto',
      sections: [
        {
          heading: 'Datos de contacto',
          body: [
            `Correo: ${OPERATOR_EMAIL}`,
            `Teléfono: ${OPERATOR_PHONE}`,
            `${OPERATOR_LEGAL_NAME}, ${OPERATOR_SEAT}, República Checa`,
          ],
        },
        {
          heading: 'Escriba en español',
          body: [
            'Puede escribir en español o en portugués. Responder en su idioma es más seguro que una traducción aproximada por ambas partes.',
          ],
        },
        {
          heading: 'Qué no podemos responder',
          body: [
            'No damos asesoría jurídico ni migratorio sobre casos individuales, y no podemos consultar el estado de una solicitud presentada ante las autoridades checas — no tenemos acceso a eso.',
            'Para el estado de una solicitud, diríjase a la representación donde la presentó o a la autoridad competente.',
          ],
        },
        {
          heading: 'Si alguien pide dinero en nuestro nombre',
          body: [
            'No cobramos al candidato en ninguna etapa y no tenemos intermediarios autorizados a cobrar en nuestro nombre.',
            'Si eso ocurre, no pague y avísenos al correo indicado arriba.',
          ],
        },
      ],
      cta: { label: 'Postularme', targetConceptId: 'candidate-apply' },
      freshness: freshness('conceptual', [LATAM_SRC.labourOffice], 'LATAM'),
    },
  },
}
