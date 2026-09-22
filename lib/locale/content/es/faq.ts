/** ES — candidate FAQ. Short, direct, source-backed answers, including the uncomfortable ones. */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { freshness } from '../freshness'

export const ES_FAQ: LocaleCorpus = {
  'candidate-faq': {
    es: {
      title: 'Preguntas frecuentes de candidatos | TalentPartnerID',
      description:
        'Respuestas directas sobre trabajar en Chequia: tarjeta de empleado, acuerdo UE–Mercosur, exención de visa, plazos, costos y qué puede y no puede hacer TalentPartnerID.',
      h1: 'Preguntas frecuentes',
      intro:
        'Respuestas breves a las preguntas que más recibimos. Donde la respuesta depende de legislación o de un procedimiento oficial, indicamos la fuente y la fecha en que la verificamos.',
      breadcrumb: 'Preguntas frecuentes',
      sections: [
        {
          heading: '¿El acuerdo UE–Mercosur permite trabajar en Chequia sin autorización?',
          body: [
            'No. El acuerdo entre la Unión Europea y Mercosur, aplicado provisionalmente desde el 1 de mayo de 2026, es un acuerdo comercial. En materia de personas prevé únicamente la entrada temporal de prestadores de servicios — traslados dentro de la misma empresa y prestadores contractuales — con fines de negocios.',
            'No concede a los ciudadanos de países de Mercosur el derecho general a tomar un empleo en la Unión Europea. Para trabajar en Chequia sigue siendo necesaria una autorización checa: normalmente la tarjeta de empleado (zaměstnanecká karta) o, cuando la función y el empleador cumplan las condiciones, el programa de trabajador altamente calificado.',
          ],
          freshness: 'procedural',
        },
        {
          heading: '¿Puedo entrar como turista y buscar trabajo?',
          body: [
            'No con esa finalidad. Donde la exención existe, vale para estancias de un máximo de tres meses dentro de un período de seis, y la fuente oficial describe la finalidad admitida como turismo o negocios. Buscar trabajo no está entre ellas, así que no presentamos la entrada como turista como una vía para buscar empleo.',
            'Y empezar a trabajar durante una estancia turística es trabajo no autorizado, con consecuencias tanto para el trabajador como para el empleador. La vía legal empieza por un empleador checo y por una solicitud presentada en la representación competente.',
          ],
          freshness: 'procedural',
        },
        {
          heading: '¿Los países latinoamericanos participan en el Programa de trabajador calificado?',
          body: [
            'No. El Program kvalifikovaný zaměstnanec, que cubre las clases CZ-ISCO 4 a 8, se aplica a una lista cerrada de países y ningún país de América Latina figura en ella.',
            'El Program vysoce kvalifikovaný zaměstnanec es distinto: no tiene limitación territorial, se aplica a trabajadores de todos los terceros países y cubre las clases CZ-ISCO 1 a 3. Un candidato latinoamericano puede participar cuando la función concreta, el empleador y las condiciones se cumplan.',
          ],
          freshness: 'procedural',
        },
        {
          heading: '¿TalentPartnerID garantiza una visa de dos años?',
          body: [
            'No, y nadie puede. TalentPartnerID no expide visas ni permisos de residencia — quien decide es la autoridad checa.',
            'Lo que existe es un límite legal: la tarjeta de empleado se expide por el período del contrato y como máximo por dos años cada vez, con posibilidad de prórroga. Dos años es un techo, no una garantía, y la duración concedida depende del contrato y de la resolución de la autoridad.',
          ],
        },
        {
          heading: '¿Necesito hablar checo?',
          body: [
            'Depende de la función. En muchas funciones técnicas e industriales el inglés basta al principio, y el empleador informa qué espera.',
            'En profesiones reguladas — en especial en el área de la salud — la competencia en checo es un requisito legal del reconocimiento profesional, y no hay manera de sortearlo.',
          ],
        },
        {
          heading: '¿Cobran alguna tarifa al candidato?',
          body: [
            'No. Postularse, ser evaluado y ser presentado a un empleador no tienen costo para el candidato.',
            'Hay costos que no son nuestros y que siguen existiendo: tasas administrativas de la solicitud, traducciones, legalización de documentos y el viaje. Esos montos los fijan terceros y deben consultarse en las fuentes oficiales.',
          ],
        },
        {
          heading: '¿Tienen una lista de puestos abiertos?',
          body: [
            'No publicamos una lista de puestos en este sitio. Las necesidades llegan de empleadores y cambian, y una lista desactualizada haría que alguien planificara una mudanza de país sobre la base de un puesto ya cubierto.',
            'Lo que hacemos es evaluar la postulación y comunicarnos con usted cuando haya correspondencia real con una necesidad concreta.',
          ],
        },
        {
          heading: '¿Cuánto tarda el proceso?',
          body: [
            'No damos una estimación propia. Los plazos de resolución los fijan las autoridades checas, varían según el tipo de solicitud y cambian con el tiempo, y la disponibilidad de citas en la representación también varía.',
            'Consulte los plazos en la fuente oficial. Cualquier cifra que apareciera aquí envejecería antes de que usted la necesitara.',
          ],
          freshness: 'procedural',
        },
        {
          heading: '¿Dónde presento la solicitud?',
          body: [
            'En la representación checa competente para su lugar de residencia. La competencia territorial no es opcional y presentar la solicitud en la representación equivocada es un problema costoso de resolver.',
            'El procedimiento consular concreto varía por país y no puede generalizarse: lo que se aplica en un país de la región no se aplica automáticamente en otro. Consúltelo en la representación checa correspondiente a su país.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Alguien me pidió dinero diciendo que los representa. ¿Es legítimo?',
          body: [
            'No. No cobramos al candidato y no tenemos intermediarios que cobren en nuestro nombre para asegurar un puesto, una visa o prioridad en la fila.',
            'Si eso ocurre, no pague y avísenos a la dirección de contacto publicada en este sitio.',
          ],
        },
      ],
      cta: { label: 'Postularme', targetConceptId: 'candidate-apply' },
      freshness: freshness(
        'conceptual',
        [
          LATAM_SRC.mercosur,
          LATAM_SRC.programQualified,
          LATAM_SRC.programHighlyQualified,
          LATAM_SRC.residenceAct,
          LATAM_SRC.quotaRegulation,
        ],
        'LATAM',
      ),
    },
  },
}
