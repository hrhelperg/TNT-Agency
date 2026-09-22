/**
 * ES — the candidate journey.
 *
 * Neutral Latin-American Spanish: Chequia / República Checa, costos (never
 * costes), CV (hoja de vida is Colombia-leaning, currículum Spain-leaning),
 * reclutamiento (selección de personal is Spain-leaning), ustedes (never
 * vosotros). Not written for Spain, and not artificially Mexican, Argentine or
 * Peruvian either.
 *
 * Authored against the same P1 sources as the pt-BR corpus rather than
 * translated from it: the legal substance must be identical, the phrasing
 * native.
 */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { freshness } from '../freshness'

export const ES_JOURNEY: LocaleCorpus = {
  'candidate-home': {
    es: {
      title: 'Trabajar en Chequia | TalentPartnerID',
      description:
        'Cómo funciona el trabajo legal en Chequia para candidatos de América Latina: tarjeta de empleado, documentos, profesiones y el proceso de reclutamiento. Información con fuentes oficiales.',
      h1: 'Trabaja en Chequia',
      intro:
        'TalentPartnerID es una agencia de reclutamiento checa. Esta sección explica, en español, cómo funciona el empleo legal en Chequia para profesionales de fuera de la Unión Europea: qué es posible, qué no lo es y qué pasos dependen de usted, del empleador y de las autoridades checas.',
      breadcrumb: 'Inicio',
      sections: [
        {
          heading: 'Empiece por el camino que realmente existe para su perfil',
          body: [
            'No todas las profesiones tienen el mismo camino. La diferencia no es una preferencia nuestra: está en la legislación checa y en los programas del Estado, que tratan las categorías profesionales de manera distinta.',
            'Para ingenieros, especialistas y profesionales técnicos de nivel más alto existe un programa estatal sin restricción de país de origen. Para la industria y la logística ese programa no está disponible para candidatos latinoamericanos, y el camino es la tarjeta de empleado estándar, que depende de un puesto registrado por un empleador checo. Explicamos ambos casos en detalle.',
          ],
          list: {
            intro: 'Elija por dónde empezar:',
            items: [
              'Trabajar como ingeniero o especialista técnico — el camino con programa estatal disponible',
              'Profesiones técnicas — mantenimiento, automatización, electricistas, soldadores, operadores CNC',
              'Trabajar en la industria — producción, ensamblaje, operación de máquinas',
              'Trabajar en logística — almacén y distribución, con las restricciones legales explicadas',
              'Profesiones de la salud reguladas — reconocimiento profesional antes de cualquier contratación',
            ],
          },
        },
        {
          heading: 'Qué hace TalentPartnerID y qué no hace',
          body: [
            'Hacemos reclutamiento: evaluamos postulaciones, presentamos candidatos a empleadores checos y explicamos el proceso. Cuando un empleador avanza con una contratación, acompañamos las etapas que nos corresponden.',
            'No somos un organismo del Estado checo, una embajada ni una autoridad migratoria. No expedimos visas, no expedimos permisos de residencia y no resolvemos solicitudes. Esas decisiones corresponden únicamente a las autoridades checas, y nadie puede prometer su resultado.',
          ],
        },
        {
          heading: 'Ninguna etapa depende de un pago del candidato',
          body: [
            'No cobramos al candidato por postularse, por ser evaluado, por ser presentado a un empleador ni por recibir información. Si alguien dice representar a TalentPartnerID y pide dinero para asegurar un puesto, una visa o un lugar en la fila, no es TalentPartnerID — y conviene avisarnos.',
          ],
        },
      ],
      cta: {
        label: 'Postularme',
        targetConceptId: 'candidate-apply',
        note: 'Toma unos minutos. Usted adjunta su CV desde su propio correo.',
      },
      freshness: freshness('conceptual', [LATAM_SRC.programHighlyQualified, LATAM_SRC.programQualified], 'LATAM'),
    },
  },

  'work-in-czechia': {
    es: {
      title: 'Trabajar en Chequia: cómo funciona legalmente | TalentPartnerID',
      description:
        'Guía completa sobre trabajar legalmente en Chequia siendo latinoamericano: tarjeta de empleado (zaměstnanecká karta), programas estatales, documentos y límites reales. Con fuentes oficiales.',
      h1: 'Trabajar en Chequia',
      intro:
        'Esta es la guía principal para quien está evaluando trabajar legalmente en la República Checa. Explica qué caminos existen, cuáles se aplican a ciudadanos latinoamericanos y dónde están los límites reales, incluidos los que la mayoría de los anuncios no menciona.',
      breadcrumb: 'Trabajar en Chequia',
      sections: [
        {
          heading: 'El punto de partida: hace falta una autorización que combine residencia y trabajo',
          body: [
            'Los ciudadanos de países fuera de la Unión Europea, del Espacio Económico Europeo y de Suiza necesitan una autorización específica para trabajar en Chequia. La más común para el empleo de larga duración es la tarjeta de empleado, cuyo nombre legal en checo es zaměstnanecká karta.',
            'Es un documento doble: autoriza a la vez la residencia en el territorio y el ejercicio de un trabajo concreto, para un empleador concreto. No es genérica — está ligada a un puesto de trabajo específico.',
          ],
        },
        {
          heading: 'Los dos programas estatales, y por qué la diferencia importa',
          body: [
            'El Estado checo mantiene programas de migración económica para determinados perfiles. Conviene saber qué garantizan: la posibilidad de presentar la solicitud en la representación checa, incluso junto a los familiares más cercanos, y la simplificación de la parte administrativa. No acortan el plazo de resolución de la autoridad. Hay tres, y tratan a los candidatos latinoamericanos de manera distinta.',
            'El Program vysoce kvalifikovaný zaměstnanec (Programa de trabajador altamente calificado) no tiene limitación territorial: se aplica a trabajadores de todos los terceros países. Cubre actividades de las clases principales 1 a 3 de la clasificación checa de ocupaciones CZ-ISCO. Un candidato latinoamericano puede participar cuando la función concreta, el empleador y las condiciones del programa se cumplan. Eso no significa que todo ingeniero latinoamericano califique.',
            'El Program klíčový a vědecký personál (Programa de personal clave y científico) tampoco tiene limitación territorial y también cubre los grandes grupos 1 a 3, pero está dirigido a otro tipo de empleador — inversores, organizaciones de investigación, empresas de tecnología y start-ups. No exige a ese empleador los dos años de actividad ni el número mínimo de empleados que sí pide el programa anterior.\n\nEl Program kvalifikovaný zaměstnanec (Programa de trabajador calificado), que cubre los grandes grupos 4 a 8, se aplica a una lista cerrada de países. Ningún país de América Latina figura en ella. Para esos perfiles, por tanto, el programa no es una opción y el camino es la tarjeta de empleado estándar.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'El acuerdo UE–Mercosur no crea un derecho a trabajar en Chequia',
          body: [
            'El acuerdo entre la Unión Europea y Mercosur se aplica provisionalmente desde el 1 de mayo de 2026, y desde entonces circula la idea de que permitiría trabajar en Europa sin autorización. No es cierto.',
            'El acuerdo es de naturaleza comercial. En materia de circulación de personas prevé la entrada temporal de prestadores de servicios — traslados dentro de la misma empresa y prestadores contractuales — con fines de negocios. Nada en él concede a un ciudadano de un país de Mercosur el derecho general a tomar un empleo con un empleador de la Unión Europea.',
            'Ser parte de un acuerdo comercial y tener autorización de trabajo checa son cosas distintas. El camino legal sigue siendo la tarjeta de empleado (zaměstnanecká karta) o, cuando la función y el empleador cumplan las condiciones, el programa de trabajador altamente calificado.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'La exención de visa para estancias cortas no autoriza a trabajar',
          body: [
            'Varios países latinoamericanos están exentos de visa para estancias cortas en el espacio Schengen — un máximo de tres meses dentro de un período de seis, contados desde la primera entrada. Esa exención vale siempre que la finalidad del viaje sea turismo o negocios, y no una actividad remunerada.',
            'Entrar como visitante y empezar a trabajar no es una alternativa más rápida al proceso: es trabajo no autorizado, con consecuencias para el trabajador y para el empleador. Verifique además el régimen que corresponde a su nacionalidad, porque no es el mismo para todos los países de la región.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Cuánto dura la autorización',
          body: [
            'La tarjeta de empleado se expide por el período del contrato de trabajo y como máximo por dos años cada vez. Su validez puede prorrogarse repetidamente, siempre por el período del contrato y siempre por un máximo de dos años en cada expedición.',
            'Dicho de otro modo: dos años es un techo legal, no una promesa. Nadie — ni TalentPartnerID ni un empleador — puede garantizar de antemano la duración que se concederá, porque quien decide es la autoridad checa.',
          ],
        },
        {
          heading: 'Qué sigue',
          body: [
            'Si su perfil encaja, el paso siguiente es entender el proceso de reclutamiento y reunir los documentos. Ambos están explicados en detalle en las páginas enlazadas desde aquí.',
          ],
        },
      ],
      cta: { label: 'Cómo funciona el reclutamiento', targetConceptId: 'how-recruitment-works' },
      freshness: freshness(
        'conceptual',
        [
          LATAM_SRC.programHighlyQualified,
          LATAM_SRC.programQualified,
          LATAM_SRC.employeeCardMzv,
          LATAM_SRC.residenceAct,
          LATAM_SRC.mercosur,
        ],
        'LATAM',
      ),
    },
  },

  'how-recruitment-works': {
    es: {
      title: 'Cómo funciona el reclutamiento en TalentPartnerID | TalentPartnerID',
      description:
        'El proceso paso a paso: postulación, evaluación, presentación al empleador checo, contrato, solicitud de tarjeta de empleado y llegada. Qué depende de cada parte.',
      h1: 'Cómo funciona el reclutamiento',
      intro:
        'El proceso tiene etapas previsibles y plazos que no lo son. Esta página separa ambas cosas: qué ocurre en cada fase y cuáles dependen de decisiones que no están en nuestras manos.',
      breadcrumb: 'Cómo funciona el reclutamiento',
      sections: [
        {
          heading: 'Las etapas, en el orden en que ocurren',
          body: [
            'No toda postulación recorre todas las etapas, y eso es normal. La mayoría de las postulaciones no termina en contratación, igual que en cualquier proceso de selección.',
          ],
          list: {
            ordered: true,
            items: [
              'Usted envía la postulación con su CV adjunto.',
              'Evaluamos la experiencia, la calificación y la elegibilidad legal para el tipo de función.',
              'Si hay correspondencia con una necesidad real de un empleador checo, presentamos su perfil.',
              'El empleador decide si quiere entrevistar. La decisión es suya.',
              'Si hay acuerdo, el empleador emite contrato o promesa de empleo y registra el puesto según lo exigido.',
              'Usted reúne los documentos y solicita cita en la representación checa competente para su lugar de residencia.',
              'La autoridad checa analiza y resuelve la solicitud.',
              'Con la autorización vigente, usted viaja e inicia el trabajo.',
            ],
          },
        },
        {
          heading: 'Qué depende de quién',
          body: [
            'Buena parte de la frustración en procesos así viene de esperar de una parte algo que corresponde a otra.',
          ],
          list: {
            items: [
              'De usted: la veracidad de la información, los documentos, la cita consular y presentarse a ella.',
              'Del empleador: la decisión de contratar, el contrato, el registro del puesto y las obligaciones del empleador.',
              'De las autoridades checas: la resolución, los plazos y los requisitos formales.',
              'De TalentPartnerID: la evaluación, la presentación al empleador y la información sobre el proceso.',
            ],
          },
        },
        {
          heading: 'Plazos: por qué no damos una fecha',
          body: [
            'Los plazos de tramitación los fijan y publican las autoridades checas, y cambian. Lo mismo ocurre con la disponibilidad de citas consulares.',
            'Por eso no publicamos plazos como si fueran fijos. Indicamos dónde consultarlos oficialmente e informamos la fecha en que verificamos la información por última vez.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Cómo evaluamos las postulaciones',
          body: [
            'La evaluación considera experiencia, calificación, competencias, disponibilidad, adecuación a la función, elegibilidad legal y, cuando es relevante para el puesto, idioma.',
            'No evaluamos candidatos por nacionalidad. Reclutamos en determinados países e idiomas porque allí hay profesionales interesados y calificados, lo cual es distinto de atribuir cualidades a una nacionalidad.',
          ],
        },
      ],
      cta: { label: 'Postularme', targetConceptId: 'candidate-apply' },
      freshness: freshness('conceptual', [LATAM_SRC.employeeCardMzv, LATAM_SRC.labourOffice], 'LATAM'),
    },
  },

  'life-and-work': {
    es: {
      title: 'Vida y trabajo en Chequia | TalentPartnerID',
      description:
        'Cómo es trabajar y vivir en Chequia: jornada, contrato, salario en el contexto del costo de vida, vivienda, idioma y qué esperar los primeros meses.',
      h1: 'Vida y trabajo en Chequia',
      intro:
        'Una decisión de mudarse de país se toma con información sobre lo cotidiano, no solo sobre documentos. Esta página reúne lo que suele sorprender a quien llega, en los dos sentidos.',
      breadcrumb: 'Vida y trabajo',
      sections: [
        {
          heading: 'Contrato y jornada',
          body: [
            'La relación laboral se rige por el Código del Trabajo checo, que se aplica igualmente a trabajadores extranjeros con autorización vigente. Contrato por escrito, jornada definida, horas extras remuneradas, vacaciones y descansos son derechos legales, no beneficios concedidos.',
            'Conviene leer el contrato antes de firmarlo y pedir explicación de lo que no quede claro. Un contrato en checo puede acompañarse de traducción, y usted puede pedir tiempo para leerlo.',
          ],
        },
        {
          heading: 'El salario en el contexto del costo de vida',
          body: [
            'Comparar salarios entre países por el tipo de cambio lleva a conclusiones equivocadas. Lo que importa es lo que queda después de vivienda, transporte, alimentación, contribuciones sociales e impuesto sobre la renta.',
            'No publicamos rangos salariales en esta página porque varían por función, región, empresa y año, y una cifra desactualizada aquí sería peor que ninguna. Los valores concretos aparecen en la oferta de un empleador, y es allí donde deben evaluarse.',
          ],
        },
        {
          heading: 'Vivienda',
          body: [
            'Algunos empleadores ofrecen alojamiento o ayudan a encontrarlo; otros no. Eso debe constar explícitamente en la oferta — si no consta, pregunte.',
            'En determinados procedimientos de residencia se exige comprobante de alojamiento asegurado. Confirme qué exigencias se aplican a su caso en la fuente oficial antes de dar algo por supuesto.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Idioma',
          body: [
            'El checo no se exige en todas las funciones, pero ayuda en todas. En funciones técnicas suele bastar el inglés al principio; en profesiones reguladas, sobre todo en la salud, la competencia en checo es un requisito legal.',
            'Aprender lo básico antes de llegar cambia la experiencia de los primeros meses más que cualquier otra preparación.',
          ],
        },
        {
          heading: 'Lo que suele sorprender',
          body: [
            'La burocracia es formal y funciona por plazos: perder uno tiene consecuencias reales, y resolverlo después suele ser más difícil que cumplirlo a tiempo.',
            'El invierno es largo y oscuro, y pesa más de lo que la mayoría espera. Del otro lado, el transporte público, la seguridad y los servicios de salud funcionan bien y a precios accesibles.',
          ],
        },
      ],
      cta: { label: 'Trabajar en Chequia', targetConceptId: 'work-in-czechia' },
      freshness: freshness('conceptual', [LATAM_SRC.labourOffice], 'LATAM'),
    },
  },
}
