/**
 * ES — profession pages, ordered by actual legal accessibility (P1), not by
 * recruitment volume. No page names a vacancy, a salary, an employer or a count.
 */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { freshness } from '../freshness'

export const ES_PROFESSIONS: LocaleCorpus = {
  'work-for-engineers': {
    es: {
      title: 'Trabajar como ingeniero en Chequia | TalentPartnerID',
      description:
        'Ingenieros y especialistas técnicos son el perfil con el camino legal más abierto en Chequia: el programa de trabajador altamente calificado no tiene limitación territorial. Qué significa en la práctica.',
      h1: 'Trabajar como ingeniero',
      intro:
        'Para ingenieros y especialistas técnicos existe un camino que no existe para otros perfiles. El Programa de trabajador altamente calificado no tiene limitación de país de origen, lo que lo hace accesible a candidatos latinoamericanos, siempre que la función concreta y el empleador cumplan las condiciones.',
      breadcrumb: 'Trabajar como ingeniero',
      sections: [
        {
          heading: 'Por qué este perfil tiene un camino distinto',
          body: [
            'El Program vysoce kvalifikovaný zaměstnanec se aplica a trabajadores de todos los terceros países, sin limitación territorial, y cubre actividades de las clases principales 1 a 3 de la clasificación checa de ocupaciones CZ-ISCO.',
            'Es una diferencia estructural, no una ventaja comercial que podamos conceder: el otro programa estatal, que cubre las clases 4 a 8, se aplica a una lista cerrada de países en la que no figura ningún país de América Latina.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Qué significa "cuando se cumplan las condiciones"',
          body: [
            'El programa no se aplica automáticamente a quien tiene un título de ingeniería. Lo que determina la aplicabilidad es la clasificación de la función concreta y el empleador. Del lado del empleador, el programa de trabajador altamente calificado exige una empresa que opere desde hace al menos dos años en la República Checa, esté al día con sus obligaciones ante el Estado y haya empleado al menos a tres personas durante al menos tres meses consecutivos en los dos años anteriores a la solicitud. Un empleador que no cumpla eso puede aun así encajar en el programa de personal clave y científico, que no impone esos requisitos.',
            'En la práctica decide la función ofrecida y cómo está clasificada, no el nombre del título. Una función de ingeniería clasificada fuera de las clases 1 a 3 no entra en el programa.',
          ],
        },
        {
          heading: 'También existe la modrá karta, y no es un programa',
          body: [
            'Además de los programas existe una autorización propia para funciones que exigen alta calificación: la modrá karta, la Tarjeta Azul de la UE. No tiene limitación de país de origen.',
            'Según el Ministerio de Asuntos Exteriores checo, está destinada a ciudadanos de terceros países que serán empleados en Chequia por más de tres meses en un empleo que exija alta calificación. Requiere un contrato de al menos un año con la jornada semanal prevista por ley y un salario correspondiente al menos a 1,5 veces el salario bruto anual medio.',
            'Para un ingeniero con formación concluida y una oferta por encima de ese umbral, es una vía a considerar junto a la tarjeta de empleado. Quien decide sigue siendo la autoridad checa.',
          ],
        },
        {
          heading: 'Áreas en las que reclutamos este perfil',
          body: [
            'Reclutamos para necesidades reales de empleadores checos. Las áreas siguientes son las que aparecen con más frecuencia; no son una lista de puestos abiertos, y no publicamos puestos en este sitio.',
          ],
          list: {
            items: [
              'Ingeniería de proceso y de producción',
              'Ingeniería de proyecto y desarrollo',
              'Automatización y sistemas de control',
              'Calidad e ingeniería de calidad',
              'Mantenimiento de nivel técnico superior',
            ],
          },
        },
        {
          heading: 'Qué sigue dependiendo del proceso normal',
          body: [
            'Participar en el programa afecta la tramitación, no al conjunto de requisitos. Siguen haciendo falta un empleador, un contrato, un puesto registrado, los documentos y la resolución de la autoridad checa.',
            'También sigue vigente el límite de validez: la tarjeta de empleado se expide por el período del contrato y como máximo por dos años cada vez.',
          ],
        },
      ],
      cta: { label: 'Postularme', targetConceptId: 'candidate-apply' },
      freshness: freshness(
        'conceptual',
        [
          LATAM_SRC.programHighlyQualified,
          LATAM_SRC.programKeyPersonnel,
          LATAM_SRC.blueCard,
          LATAM_SRC.employeeCardMzv,
          LATAM_SRC.residenceAct,
        ],
        'LATAM',
      ),
    },
  },

  'technical-professions': {
    es: {
      title: 'Profesiones técnicas en Chequia | TalentPartnerID',
      description:
        'Mantenimiento, automatización, electricistas, soldadores y operadores CNC: dónde pasa la frontera legal entre las profesiones técnicas con programa disponible y las que dependen de la tarjeta de empleado estándar.',
      h1: 'Profesiones técnicas',
      intro:
        'Las profesiones técnicas quedan justo sobre la frontera que separa los dos programas estatales. Algunas alcanzan la franja en la que se aplica el programa sin limitación territorial; otras no. Esta página explica dónde está esa línea, porque cambia el camino en la práctica.',
      breadcrumb: 'Profesiones técnicas',
      sections: [
        {
          heading: 'La frontera, en términos concretos',
          body: [
            'El programa de trabajador altamente calificado cubre las clases CZ-ISCO 1 a 3. Funciones técnicas de nivel medio, incluida parte de las funciones de mantenimiento y automatización, pueden alcanzar la clase 3.',
            'Oficios como la soldadura y la operación de máquinas CNC se clasifican normalmente en el gran grupo 7. Ese grupo pertenece al otro programa, del que ningún país de América Latina forma parte, y por tanto no tiene vía de programa disponible.\n\nUna distinción que conviene conocer: la PROGRAMACIÓN de máquinas CNC se clasifica de forma distinta de la operación. La clasificación checa de ocupaciones sitúa al programador de máquinas de control numérico en el gran grupo 3, que es el grupo que alcanza el programa sin limitación territorial. Si su experiencia incluye programación, y no solo operación y preparación, indíquelo explícitamente en la postulación.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Qué significa si usted es soldador u operador CNC',
          body: [
            'Significa que el camino es la tarjeta de empleado estándar: un empleador checo con una necesidad real, un puesto registrado, contrato y la solicitud en la representación competente.',
            'Es un camino legal y utilizado. No es un camino acelerado, y no prometemos que lo sea — quien diga lo contrario está describiendo un programa que no se aplica a su caso.',
          ],
        },
        {
          heading: 'Las habilitaciones técnicas son un obstáculo aparte',
          body: [
            'Con independencia de la migración, actividades como la soldadura y los trabajos eléctricos exigen habilitaciones específicas según las normas checas. Un certificado obtenido en su país puede no bastar para la tarea concreta.',
            'Eso no se resuelve con la solicitud de residencia: es una exigencia técnica propia, y conviene aclararla con el empleador antes de darla por resuelta.',
          ],
        },
        {
          heading: 'Perfiles que reclutamos en esta área',
          body: [
            'Las funciones siguientes aparecen con frecuencia entre las necesidades de los empleadores con los que trabajamos. No son puestos abiertos: no publicamos puestos en este sitio.',
          ],
          list: {
            items: [
              'Técnicos de mantenimiento industrial',
              'Técnicos de automatización',
              'Electricistas industriales',
              'Soldadores',
              'Operadores y programadores CNC',
              'Mecánicos industriales',
            ],
          },
        },
      ],
      cta: { label: 'Postularme', targetConceptId: 'candidate-apply' },
      freshness: freshness(
        'conceptual',
        [LATAM_SRC.programHighlyQualified, LATAM_SRC.programQualified, LATAM_SRC.employeeCardMzv],
        'LATAM',
      ),
    },
  },

  'work-in-manufacturing': {
    es: {
      title: 'Trabajar en la industria en Chequia | TalentPartnerID',
      description:
        'Producción, ensamblaje y operación de máquinas en Chequia: por qué el programa de trabajador calificado no está disponible para candidatos latinoamericanos y cuál es el camino legal que queda.',
      h1: 'Trabajar en la industria',
      intro:
        'La industria checa emplea a muchos trabajadores extranjeros, y es probablemente el área sobre la que circula más información engañosa dirigida a América Latina. Esta página explica, sin rodeos, cuál es el camino legal disponible y cuál no.',
      breadcrumb: 'Trabajar en la industria',
      sections: [
        {
          heading: 'El programa de trabajador calificado no se aplica',
          body: [
            'El Program kvalifikovaný zaměstnanec cubre las clases CZ-ISCO 4 a 8, que es donde se clasifica la mayor parte de las funciones industriales. Se aplica a una lista cerrada de países, y ningún país de América Latina figura en ella.',
            'Si un anuncio sugiere que existe un programa que facilita la llegada de trabajadores latinoamericanos a la producción checa, está describiendo algo que no existe.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'El camino que sí existe',
          body: [
            'Queda la tarjeta de empleado (zaměstnanecká karta) estándar. Exige un empleador checo con una necesidad concreta, un puesto registrado, un contrato o promesa de empleo, los documentos exigidos y la resolución de la autoridad checa.',
            'No hay atajo, no hay vía acelerada y no hay plazo garantizado. Sin un puesto registrado no existe solicitud que presentar: por ahí empieza el proceso, no por el consulado.',
          ],
        },
        {
          heading: 'Sea realista con las probabilidades',
          body: [
            'Al no haber vía de programa, estos procesos dependen enteramente de un empleador dispuesto a recorrer el procedimiento estándar. Ocurre, y ocurre menos de lo que la demanda sugiere.',
            'Preferimos decirlo ahora antes que dejar que alguien organice un cambio de vida en torno a una expectativa que no se sostiene.',
          ],
        },
        {
          heading: 'Funciones de esta área',
          body: [
            'Las funciones siguientes indican el tipo de perfil que suelen buscar los empleadores industriales. No son posiciones abiertas, y no publicamos lista de puestos.',
          ],
          list: {
            items: [
              'Operadores de producción',
              'Ensambladores de línea',
              'Operadores de máquinas',
              'Control e inspección de calidad',
              'Producción automotriz',
              'Producción de alimentos',
            ],
          },
        },
      ],
      cta: { label: 'Cómo funciona el reclutamiento', targetConceptId: 'how-recruitment-works' },
      freshness: freshness(
        'conceptual',
        [LATAM_SRC.programQualified, LATAM_SRC.employeeCardMzv, LATAM_SRC.labourOffice],
        'LATAM',
      ),
    },
  },

  'work-in-logistics': {
    es: {
      title: 'Trabajar en logística en Chequia | TalentPartnerID',
      description:
        'Almacén y distribución en Chequia: por qué este es el perfil con el camino legal más estrecho para candidatos latinoamericanos, y qué significa antes de planificar cualquier mudanza.',
      h1: 'Trabajar en logística',
      intro:
        'Es el área con la base legal más estrecha de toda esta sección, y sería deshonesto presentarla de otra forma. Hay demanda real de trabajadores de almacén y distribución en Chequia, y a la vez es el perfil para el que un candidato latinoamericano tiene menos caminos disponibles.',
      breadcrumb: 'Trabajar en logística',
      sections: [
        {
          heading: 'Ningún programa estatal cubre este caso',
          body: [
            'Las funciones de almacén y distribución se reparten entre varios grandes grupos de la clasificación checa: parte del trabajo administrativo de logística queda en el grupo 4, la operación de montacargas y el trabajo de almacenista en el grupo 8, y las funciones auxiliares en el grupo 9. El programa de trabajador calificado cubre los grupos 4 a 8 — el grupo 9 queda fuera por definición — y además se aplica a una lista de países que no incluye a ningún país de América Latina.',
            'El programa de trabajador altamente calificado cubre las clases 1 a 3 y no alcanza estas funciones. Es decir: no hay vía de programa por ninguno de los dos lados.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Qué queda, y qué exige',
          body: [
            'Queda la tarjeta de empleado estándar, con todas sus condiciones: empleador, puesto registrado, contrato, documentos y resolución de la autoridad. Las exigencias de calificación y las condiciones del puesto suelen ser precisamente el punto más difícil de cumplir en esta franja.',
            'Publicamos esta página porque la demanda es real y porque quien busca merece la información completa, no para invitar postulaciones en masa.',
          ],
        },
        {
          heading: 'Antes de planificar nada',
          body: [
            'Si la logística es su único perfil y está evaluando mudarse a Europa, considere seriamente que este camino puede no concretarse. Planifique en consecuencia.',
            'Si además tiene experiencia técnica — mantenimiento, manejo de montacargas con habilitación, operación de equipos, calidad — conviene indicarlo en la postulación: puede abrir una clasificación distinta.',
          ],
        },
      ],
      cta: { label: 'Profesiones técnicas', targetConceptId: 'technical-professions' },
      freshness: freshness(
        'conceptual',
        [LATAM_SRC.programQualified, LATAM_SRC.programHighlyQualified, LATAM_SRC.employeeCardMzv],
        'LATAM',
      ),
    },
  },

  'healthcare-regulated-professions': {
    es: {
      title: 'Profesiones de la salud reguladas en Chequia | TalentPartnerID',
      description:
        'Médicos, enfermeros y otras profesiones de la salud en Chequia: reconocimiento de la calificación, prueba de aptitud (aprobační zkouška), exigencia de checo y qué no puede hacer una agencia de reclutamiento.',
      h1: 'Profesiones de la salud reguladas',
      intro:
        'Las profesiones de la salud no siguen el mismo camino que las demás. El obstáculo principal no es la migración, sino la habilitación para ejercer la profesión, que tiene procedimiento propio, examen y exigencia de idioma. Esta página explica ese recorrido y dice con claridad qué está fuera de nuestro alcance.',
      breadcrumb: 'Profesiones de la salud',
      sections: [
        {
          heading: 'La habilitación para ejercer es el obstáculo, no la visa',
          body: [
            'Para la mayoría de los perfiles de salud, la clasificación de la profesión cae en las franjas que alcanza el programa de trabajador altamente calificado, lo que hace la parte migratoria comparativamente más accesible.',
            'Eso no ayuda mientras no haya habilitación para ejercer. Ejercer la medicina, la odontología, la farmacia o la enfermería en Chequia sin el reconocimiento exigido no es posible, con independencia de la autorización de residencia.',
          ],
        },
        {
          heading: 'Médicos, odontólogos y farmacéuticos',
          body: [
            'Quien obtuvo la formación fuera de la Unión Europea debe, conforme al § 34 de la Ley n.º 95/2004 Sb., acreditar aptitud para el ejercicio e idoneidad, y aprobar la prueba de aptitud — la aprobační zkouška.',
            'La prueba verifica conocimientos teóricos, conocimiento del sistema de salud checo y la capacidad de comunicarse profesionalmente en checo. Es requisito previo acreditar el reconocimiento del título extranjero como equivalente a un programa de máster acreditado en el área de la salud.',
            'El Ministerio de Salud resuelve sobre el reconocimiento en un plazo de hasta 240 días desde la entrega completa de los documentos exigidos.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Enfermería y demás profesiones no médicas',
          body: [
            'Las profesiones de la salud no médicas, incluida la enfermería, se rigen por la Ley n.º 96/2004 Sb., modificada con efectos desde el 1 de enero de 2026.',
            'Para quien obtuvo la calificación fuera de la Unión Europea, del Espacio Económico Europeo y de Suiza, el reconocimiento está igualmente condicionado a aprobar la prueba de aptitud.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Aquí el checo no es opcional',
          body: [
            'En muchas funciones técnicas el idioma es una ventaja. En las profesiones de la salud es un requisito legal del reconocimiento, verificado en examen.',
            'Un proyecto realista en esta área empieza por el idioma y por el reconocimiento, con un horizonte de años, no de meses.',
          ],
        },
        {
          heading: 'Qué puede y qué no puede hacer TalentPartnerID',
          body: [
            'Podemos explicar el recorrido, indicar las fuentes oficiales y, cuando exista una necesidad concreta de un empleador y su situación de reconocimiento lo permita, presentar su perfil.',
            'No podemos abreviar, dispensar ni acelerar el reconocimiento; no administramos ni influimos en la prueba de aptitud; y no colocamos profesionales de la salud a ejercer sin habilitación. Un médico latinoamericano no se recluta por el mismo camino que un operador CNC, y presentar ambas cosas como equivalentes sería engañoso.',
          ],
        },
      ],
      cta: { label: 'Reconocimiento de títulos', targetConceptId: 'qualification-recognition' },
      freshness: freshness(
        'procedural',
        [
          LATAM_SRC.healthProfessionsAct,
          LATAM_SRC.nonMedicalHealthAct,
          LATAM_SRC.approbationExam,
          LATAM_SRC.programHighlyQualified,
        ],
        'LATAM',
      ),
    },
  },
}
