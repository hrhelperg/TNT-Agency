/** ES — permit cluster. "Tarjeta de empleado" is a descriptive gloss; zaměstnanecká karta appears alongside it. */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { LABOUR_SRC } from '../sources-labour'
import { freshness, STATUTORY_YEAR } from '../freshness'

export const ES_IMMIGRATION: LocaleCorpus = {
  'employee-card': {
    es: {
      title: 'Tarjeta de empleado checa (zaměstnanecká karta) | TalentPartnerID',
      description:
        'Qué es la tarjeta de empleado (zaměstnanecká karta), cuándo se aplica, cómo se vincula a un puesto concreto, cuál es su validez máxima y cómo funciona la prórroga. Con fuentes oficiales checas.',
      h1: 'Tarjeta de empleado checa (zaměstnanecká karta)',
      intro:
        'La tarjeta de empleado — en checo zaměstnanecká karta — es la autorización más usada por ciudadanos de terceros países para trabajar de forma duradera en Chequia. Esta página explica qué es, a qué se vincula y dónde están sus límites.',
      breadcrumb: 'Tarjeta de empleado',
      sections: [
        {
          heading: 'Un documento, dos autorizaciones',
          body: [
            'La tarjeta de empleado es un documento doble: autoriza simultáneamente la residencia de larga duración en el territorio checo y el ejercicio de un trabajo determinado. No son dos autorizaciones que se suman, sino una sola con ambas funciones.',
            'La expide el Ministerio del Interior de la República Checa. TalentPartnerID no participa en esa decisión.',
          ],
        },
        {
          heading: 'Está prevista para empleos de más de tres meses',
          body: [
            'Según el Ministerio de Asuntos Exteriores checo, la tarjeta de empleado está destinada a ciudadanos de terceros países que serán empleados en Chequia por más de tres meses.',
            'Para estancias cortas con otra finalidad existen otros regímenes, y ninguno de ellos autoriza el trabajo remunerado por el solo hecho de permitir la entrada.',
          ],
        },
        {
          heading: 'Está ligada a un puesto concreto, y eso tiene consecuencias prácticas',
          body: [
            'La tarjeta se expide para un puesto de trabajo específico. En la práctica, la solicitud presupone contar con el número de un puesto vacante registrado: sin él no hay solicitud que presentar.',
            'Por eso el proceso no empieza en el consulado, sino en un empleador checo con una necesidad real y un puesto registrado. Cambiar de empleador o de función después sigue reglas propias, con obligaciones de comunicación y, en ciertos casos, autorización.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Validez: como máximo dos años cada vez',
          body: [
            'La ley checa sobre la residencia de extranjeros establece que la tarjeta de empleado se expide por el período por el que se celebró el contrato de trabajo, como máximo por dos años.',
            'La validez puede prorrogarse repetidamente, siempre por el período del contrato y siempre por un máximo de dos años en cada expedición. Es decir: dos años es el techo legal de cada expedición, no una duración automática ni algo que nadie pueda prometer.',
          ],
        },
        {
          heading: 'Qué puede y qué no puede hacer TalentPartnerID aquí',
          body: [
            'Podemos explicar el proceso, indicar las fuentes oficiales y acompañar las etapas que corresponden al reclutamiento y al empleador.',
            'No expedimos la tarjeta, no influimos en la resolución y no podemos acelerar la tramitación. Esta página es información general y no sustituye asesoría sobre su caso individual.',
          ],
        },
      ],
      cta: { label: 'Documentos necesarios', targetConceptId: 'documents-required' },
      freshness: freshness('conceptual', [LATAM_SRC.employeeCardMzv, LATAM_SRC.residenceAct], 'LATAM'),
    },
  },

  'documents-required': {
    es: {
      title: 'Documentos necesarios para la solicitud | TalentPartnerID',
      description:
        'Qué categorías de documentos suelen exigirse en la solicitud de tarjeta de empleado checa, qué suele requerir traducción o legalización, y dónde consultar la lista oficial vigente.',
      h1: 'Documentos necesarios',
      intro:
        'La lista exacta de anexos la fija la autoridad checa y cambia. Esta página explica las categorías que suelen exigirse y lo que suele dar más trabajo, para que usted se prepare con anticipación y confirme la lista vigente en la fuente oficial.',
      breadcrumb: 'Documentos necesarios',
      sections: [
        {
          heading: 'Por qué no publicamos una lista cerrada',
          body: [
            'Una lista de documentos parece la información más útil posible, y es justamente la que envejece más rápido. Publicarla como definitiva haría que alguien viajara a una representación con la documentación equivocada.',
            'Por eso describimos las categorías y señalamos la fuente oficial, dejando constancia de la fecha en que la verificamos.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Categorías que suelen exigirse',
          body: [
            'Las categorías siguientes aparecen de forma recurrente en solicitudes de tarjeta de empleado. La forma exacta, la vigencia y el número de ejemplares los fija la autoridad.',
          ],
          list: {
            items: [
              'Documento de viaje vigente',
              'Contrato de trabajo, acuerdo de actividad laboral o promesa de empleo',
              'Comprobante de la calificación exigida para la función',
              'Comprobante de alojamiento asegurado',
              'Fotografías según especificación',
              'Comprobante de pago de la tasa administrativa',
            ],
          },
          freshness: 'procedural',
        },
        {
          heading: 'Traducciones y legalización',
          body: [
            'Los documentos expedidos en su país suelen requerir traducción oficial al checo y, según el caso, legalización — normalmente apostilla, si su país es parte del Convenio de La Haya.',
            'Esta etapa se hace antes de la solicitud y suele ser la que más retrasa los procesos. Confirme qué documentos exigen qué formalidad antes de encargar traducciones, porque traducir el documento equivocado cuesta tiempo y dinero.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Comprobante de calificación',
          body: [
            'Para funciones no reguladas suele bastar con acreditar la formación o la experiencia que el puesto exige.',
            'Para profesiones reguladas — salud, algunas actividades técnicas — existe un procedimiento propio de reconocimiento, anterior e independiente de la solicitud de residencia. La página sobre reconocimiento de títulos explica la diferencia.',
          ],
        },
      ],
      cta: { label: 'Reconocimiento de títulos', targetConceptId: 'qualification-recognition' },
      freshness: freshness('procedural', [LATAM_SRC.employeeCardMzv], 'LATAM'),
    },
  },

  'qualification-recognition': {
    es: {
      title: 'Reconocimiento de títulos y calificaciones en Chequia | TalentPartnerID',
      description:
        'La diferencia entre el reconocimiento de un título y el reconocimiento de la calificación profesional para una actividad regulada en Chequia, y cuándo no hace falta ninguno de los dos.',
      h1: 'Reconocimiento de títulos',
      intro:
        'Dos procedimientos distintos suelen confundirse: reconocer un título extranjero y reconocer la calificación para ejercer una actividad regulada. Son procesos diferentes, con autoridades y finalidades diferentes, y hay casos en los que no se exige ninguno.',
      breadcrumb: 'Reconocimiento de títulos',
      sections: [
        {
          heading: 'Reconocimiento del título',
          body: [
            'Es el procedimiento que establece la equivalencia de un título extranjero con el nivel educativo checo correspondiente. Sirve para acreditar formación ante un empleador, ante una universidad o como requisito previo de otro procedimiento.',
            'Por sí solo no autoriza a ejercer una profesión regulada.',
          ],
        },
        {
          heading: 'Reconocimiento de la calificación profesional',
          body: [
            'Es el procedimiento exigido para ejercer una actividad regulada. Aquí no se evalúa solo el título, sino la aptitud para ejercer esa profesión concreta en Chequia, lo que puede incluir exámenes y requisitos de idioma.',
            'Es el caso de las profesiones de la salud, entre otras. Este procedimiento es anterior e independiente de la solicitud de residencia: tener autorización de residencia no habilita a ejercer una profesión regulada sin el reconocimiento.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Cuándo no hace falta ninguno de los dos',
          body: [
            'Para muchas funciones no reguladas, el empleador evalúa la experiencia directamente y no hay procedimiento formal de reconocimiento que cumplir.',
            'Eso no significa que cualquier certificado extranjero sirva para cualquier tarea: actividades como la soldadura y los trabajos eléctricos exigen habilitaciones específicas según las normas checas, y un certificado obtenido en el extranjero puede no bastar para la tarea concreta.',
          ],
        },
        {
          heading: 'Cómo prepararse',
          body: [
            'Reúna títulos, certificados de estudios y constancias con anticipación, verifique si requieren traducción oficial y legalización, y confirme con el empleador qué acreditación exige la función.',
            'Si su profesión es regulada, trate el reconocimiento como la primera etapa del proyecto, no como un trámite posterior.',
          ],
        },
      ],
      cta: { label: 'Profesiones de la salud reguladas', targetConceptId: 'healthcare-regulated-professions' },
      freshness: freshness(
        'procedural',
        [LATAM_SRC.healthProfessionsAct, LATAM_SRC.nonMedicalHealthAct, LATAM_SRC.approbationExam],
        'LATAM',
      ),
    },
  },

  'worker-rights': {
    es: {
      title: 'Derechos del trabajador extranjero en Chequia | TalentPartnerID',
      description:
        'Qué derechos tiene un trabajador extranjero en la relación laboral checa, qué obligaciones acompañan a la residencia y al trabajo, y dónde buscar ayuda.',
      h1: 'Derechos del trabajador extranjero',
      intro:
        'Un trabajador extranjero con autorización vigente tiene los mismos derechos laborales que un trabajador checo. Esta página resume esos derechos, las obligaciones ligadas a la residencia y dónde buscar ayuda cuando algo sale mal.',
      breadcrumb: 'Derechos del trabajador',
      sections: [
        {
          heading: 'Derechos en la relación laboral',
          body: [
            'El Código del Trabajo checo se aplica con independencia de la nacionalidad. Contrato por escrito, límites de jornada, remuneración de horas extras, descanso y vacaciones son derechos legales, y rigen igualmente para un trabajador extranjero con autorización vigente.',
            'Los descuentos no previstos en la ley o en el contrato no son legítimos, y retener los documentos personales de un trabajador no lo es en ninguna circunstancia.',
          ],
          list: {
            intro: 'Cuatro derechos que conviene conocer por su nombre:',
            items: [
              'Salario no inferior al salario mínimo legal',
              'Igualdad de trato y prohibición de discriminación — la ley prohíbe expresamente la discriminación por origen racial o étnico, nacionalidad y ciudadanía',
              'Seguridad y protección de la salud en el trabajo',
              'Condiciones comparables en el trabajo temporal por agencia',
            ],
          },
        },
        {
          heading: 'Cuánto es el salario mínimo, y qué no puede contarse dentro de él',
          body: [
            'Para la jornada semanal legal de 40 horas, el salario mínimo vigente para 2026 es de 22 400 Kč al mes o 134,40 Kč por hora. El monto lo fija una comunicación del Ministerio de Trabajo y Asuntos Sociales y cambia cada 1 de enero.',
            'Lo más importante de conocer es qué manda la ley dejar fuera de ese cálculo. No se computan, para alcanzar el mínimo: el pago de horas extras, el recargo por trabajo en día festivo, el recargo nocturno, el recargo por ambiente de trabajo penoso, el recargo por mayor carga en el área de la salud y el recargo de sábado y domingo.',
            'Es decir: esos recargos se suman al mínimo y no lo integran. Un empleador no puede llegar al salario mínimo sumando su recargo nocturno. Si la remuneración del mes queda por debajo del mínimo, está obligado a pagar la diferencia.',
            'El mínimo es proporcional a la jornada: quien tiene una jornada contratada menor recibe la parte correspondiente.',
          ],
          freshness: 'statutory-annual',
        },
        {
          heading: 'Jornada, turnos y descanso',
          body: [
            'La jornada semanal legal es de 40 horas, pero es menor en los regímenes de turnos. En régimen de turnos múltiples — tres o más turnos que se relevan en 24 horas — o en régimen ininterrumpido, son 37,5 horas semanales. En régimen de dos turnos, 38,75 horas.',
            'Esto tiene dos consecuencias concretas. El salario mínimo por hora sube proporcionalmente cuando la jornada semanal se reduce, y el tiempo trabajado por encima de la jornada semanal legal de su régimen es hora extra.',
            'Un turno no puede superar las 12 horas. La única excepción está en el área de la salud, en operación ininterrumpida y bajo condiciones propias.',
          ],
          list: {
            intro: 'Descanso al que usted tiene derecho:',
            items: [
              'Descanso diario ininterrumpido de al menos 11 horas cada 24 horas. Puede reducirse a 8 horas en supuestos definidos por la ley, y en ese caso el descanso siguiente debe prolongarse por el tiempo recortado',
              'Descanso semanal ininterrumpido de al menos 24 horas sumadas al descanso diario, de forma continua',
              'Cuando la operación lo permite, el empleador concede ese descanso semanal a todos el mismo día, de modo que incluya el domingo',
            ],
          },
        },
        {
          heading: 'Horas extras, noche, fin de semana y días festivos',
          body: [
            'La ley trata la hora extra como excepción, no como rutina: solo puede realizarse excepcionalmente. El empleador puede ordenarla por motivos operativos serios, dentro de límites — un máximo de 8 horas por semana y 150 horas por año calendario. Por encima de eso, solo con su acuerdo, y el total no puede superar el promedio de 8 horas semanales en un período de como máximo 26 semanas.',
            'La hora extra se paga con el salario correspondiente más un recargo de al menos el 25% del salario promedio, salvo que acuerden tiempo libre compensatorio en lugar del recargo. Si ese tiempo libre no se concede dentro de tres meses, el recargo pasa a ser exigible.',
            'El trabajo nocturno y el trabajo en sábado y domingo tienen un recargo de al menos el 10% del salario promedio. Aquí corresponde una salvedad que hace la propia ley: puede acordarse un mínimo distinto y otra forma de cálculo, así que revise lo que establecen su contrato o el convenio colectivo.',
            'El turno de quien trabaja de noche no puede superar las 8 horas en 24 horas. El trabajador nocturno debe ser examinado por un servicio de medicina del trabajo, y el costo lo asume el empleador.',
            'En día festivo la regla es salario más tiempo libre compensatorio, concedido hasta el final del tercer mes siguiente; por acuerdo, el recargo puede sustituir ese tiempo libre.',
          ],
        },
        {
          heading: 'Vacaciones y plazo de pago',
          body: [
            'La duración mínima de las vacaciones es de 4 semanas por año calendario. Las cinco semanas rigen para empleadores del sector público, no para una empresa privada.',
            'El salario se debe una vez prestado el trabajo, a más tardar en el mes calendario siguiente a aquel en que nació el derecho. La fecha regular de pago debe acordarse dentro de ese período. Antes de que usted salga de vacaciones, el empleador está obligado a pagarle el salario ya devengado.',
          ],
        },
        {
          heading: 'Si usted trabaja a través de una agencia',
          body: [
            'La ley impone dos protecciones específicas a quien es cedido por una agencia de empleo, y ambas rigen para TalentPartnerID igual que para cualquier otra.',
            'La primera: la agencia y la empresa usuaria están obligadas a asegurar que las condiciones laborales y salariales del trabajador cedido no sean peores de lo que son — o de lo que serían — las de un trabajador comparable. Ese "o serían" importa: la protección no desaparece cuando la empresa usuaria no tiene un empleado propio en la misma función. Si las condiciones son peores, la agencia debe restablecer la igualdad, a pedido suyo o por iniciativa propia al constatarlo, y usted puede reclamarle los derechos que de ahí surjan.',
            'La segunda: una agencia no puede ceder al mismo trabajador a la misma empresa usuaria por más de 12 meses calendario consecutivos. Hay excepciones — pedido del propio trabajador, o reemplazo de alguien en licencia por maternidad, paternidad o parental.',
          ],
        },
        {
          heading: 'Obligaciones ligadas a la residencia y al trabajo',
          body: [
            'La autorización trae deberes: comunicar los cambios relevantes a las autoridades dentro de los plazos, mantener vigentes los documentos y respetar el vínculo entre la autorización y el puesto de trabajo.',
            'Los plazos aquí son reales. Perder un plazo de comunicación puede afectar la autorización, y regularizarlo después suele ser más difícil que cumplirlo a tiempo.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Dónde buscar ayuda',
          body: [
            'La vigilancia del cumplimiento de la legislación laboral, incluida la materia salarial, corresponde al Státní úřad inspekce práce — el Órgano Estatal de Inspección del Trabajo — y a los inspectorados regionales competentes según el lugar donde se presta el trabajo. Es a esa instancia a la que se lleva un caso de salario por debajo del mínimo, de recargos no pagados o de condiciones peores que las de un trabajador comparable.',
            'El Ministerio del Interior responde por las cuestiones de residencia. Existen además organizaciones de apoyo a extranjeros que ofrecen asesoría gratuita.',
            'TalentPartnerID no sustituye a ninguna de esas instancias y no presta asesoría jurídica. Si su situación afecta derechos laborales o a la residencia, acuda a la autoridad competente.',
          ],
        },
      ],
      cta: { label: 'Dónde verificar información oficial', targetConceptId: 'verify-official-info' },
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
    es: {
      title: 'Dónde verificar información oficial | TalentPartnerID',
      description:
        'Las instituciones checas que publican información oficial sobre residencia, trabajo, reconocimiento profesional y procedimiento consular, y cómo usarlas para contrastar lo que leyó.',
      h1: 'Dónde verificar información oficial',
      intro:
        'Ninguna agencia de reclutamiento — tampoco esta — es fuente oficial en materia migratoria. Esta página reúne las instituciones que sí lo son, para que pueda contrastar cualquier afirmación, incluidas las nuestras.',
      breadcrumb: 'Verificar información oficial',
      sections: [
        {
          heading: 'Residencia y autorizaciones',
          body: [
            'El Ministerio del Interior de la República Checa resuelve las autorizaciones de residencia, incluida la tarjeta de empleado, y publica requisitos, anexos y plazos.',
            'El Ministerio de Asuntos Exteriores publica información sobre visas y residencia y mantiene las páginas de las representaciones consulares.',
          ],
        },
        {
          heading: 'Trabajo, permisos y mercado laboral',
          body: [
            'El Ministerio de Industria y Comercio publica los textos de los programas de migración económica, incluidos los países que cada programa abarca y las clases CZ-ISCO que cubre.',
          ],
          list: {
            items: [
              'Permisos y obligaciones de comunicación — Úřad práce ČR (Oficina de Trabajo) y, en lo metodológico, el MPSV (Ministerio de Trabajo y Asuntos Sociales)',
              'Vigilancia e inspecciones — Státní úřad inspekce práce (SÚIP), la Inspección Estatal de Trabajo',
              'Movilidad laboral en la Unión Europea — red EURES',
              'Estadísticas del mercado laboral — Český statistický úřad (ČSÚ), la Oficina Estadística Checa',
            ],
          },
        },
        {
          heading: 'Seguros e impuestos',
          body: [
            'Esta página no indica montos de aportes ni tasas de impuesto: cambian, y una cifra desactualizada aquí sería peor que ninguna. Las instituciones siguientes publican los valores vigentes.',
          ],
          list: {
            items: [
              'Seguridad social y su coordinación — Česká správa sociálního zabezpečení (ČSSZ)',
              'Seguro de salud — las aseguradoras de salud checas, por ejemplo la VZP',
              'Impuesto sobre la renta — Finanční správa, la administración tributaria checa',
            ],
          },
          freshness: 'procedural',
        },
        {
          heading: 'Profesiones reguladas',
          body: [
            'El Ministerio de Salud de la República Checa responde por el reconocimiento de calificaciones en las profesiones de la salud y por la prueba de aptitud.',
          ],
        },
        {
          heading: 'Tres preguntas con respuesta institucional',
          body: [
            'A quién dirigirse sobre la tarjeta de empleado o la tarjeta azul: al Ministerio del Interior, Departamento de Política de Asilo y Migración (OAMP), que resuelve las autorizaciones de residencia y publica las condiciones vigentes.',
            'Dónde verificar obligaciones y comunicaciones en el empleo de extranjeros: ante la Úřad práce ČR, con orientación metodológica del MPSV. La vigilancia corresponde a la Inspección Estatal de Trabajo (SÚIP).',
            'Dónde consultar las tasas actuales de aportes e impuestos: los de la seguridad social ante la ČSSZ, los del seguro de salud ante las aseguradoras de salud y las cuestiones tributarias ante la administración tributaria.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Cómo contrastar lo que lee, aquí o en cualquier sitio',
          body: [
            'Compruebe si la afirmación indica fuente y fecha. Desconfíe de cifras redondas sin origen, de plazos presentados como garantizados y de cualquier promesa de resultado.',
            'Cada página de esta sección indica cuándo se verificó por última vez y contra qué fuentes. Si encuentra una discrepancia entre lo que decimos y la fuente oficial, prevalece la fuente oficial — y le agradecemos el aviso.',
          ],
        },
      ],
      cta: { label: 'Preguntas frecuentes', targetConceptId: 'candidate-faq' },
      freshness: freshness(
        'conceptual',
        [LATAM_SRC.employeeCardMzv, LATAM_SRC.labourOffice, LATAM_SRC.approbationExam, LATAM_SRC.programQualified],
        'LATAM',
      ),
    },
  },
}
