/** ES — preparation. No Brazil-specific consular page: §32 forbids generalising one country's procedure. */
import type { LocaleCorpus } from '../types'
import { LATAM_SRC } from '../sources-latam'
import { freshness } from '../freshness'

export const ES_PREPARE: LocaleCorpus = {
  'before-you-travel': {
    es: {
      title: 'Antes de viajar a Chequia | TalentPartnerID',
      description:
        'Qué resolver antes de viajar una vez aprobada la autorización: documentos, seguro, vivienda, dinero para las primeras semanas y qué llevar en el equipaje de mano.',
      h1: 'Antes de viajar',
      intro:
        'Esta página parte del punto en que la autorización ya fue concedida. Lo que sigue es logística, y es donde las cosas suelen salir mal por falta de preparación, no por falta de documentos.',
      breadcrumb: 'Antes de viajar',
      sections: [
        {
          heading: 'Documentos que viajan con usted, no en la equipaje despachado',
          body: [
            'Documento de viaje, la autorización concedida, el contrato de trabajo y los comprobantes de calificación deben ir en el equipaje de mano, junto con copias digitales guardadas en algún lugar accesible.',
            'Lleve también copias en papel. No siempre hay conexión disponible en el momento en que alguien le pide un documento.',
          ],
        },
        {
          heading: 'Dinero para las primeras semanas',
          body: [
            'El primer salario suele llegar semanas después de la llegada. Hasta entonces hay costos: transporte, alimentación, depósito de garantía de la vivienda, teléfono y tasas administrativas.',
            'Planifique con holgura. Llegar sin reserva financiera es la causa más común de dificultades en los primeros meses, y es el factor más fácil de prever.',
          ],
        },
        {
          heading: 'Vivienda y seguro',
          body: [
            'Confirme por escrito qué ofrece el empleador: alojamiento, ayuda para encontrarlo, o nada. Confirme también quién paga qué y desde cuándo.',
            'Verifique la cobertura de salud aplicable desde el día de la llegada y qué se exige en su caso. Estas exigencias cambian; confírmelas en la fuente oficial en vez de darlas por supuestas.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Plazos que empiezan a correr cuando usted llega',
          body: [
            'Hay obligaciones cuyo plazo se cuenta desde la entrada al territorio. Sepa cuáles se aplican a su caso antes de embarcar, porque el plazo no espera a la adaptación.',
            'La página sobre los primeros pasos tras la llegada trata esas obligaciones.',
          ],
          freshness: 'procedural',
        },
      ],
      cta: { label: 'Después de llegar', targetConceptId: 'after-arrival' },
      freshness: freshness('procedural', [LATAM_SRC.employeeCardMzv], 'LATAM'),
    },
  },

  'after-arrival': {
    es: {
      title: 'Después de llegar a Chequia | TalentPartnerID',
      description:
        'Los primeros pasos tras la llegada: obligaciones con plazo, registro, seguro de salud, cuenta bancaria e inicio del trabajo. Qué no puede esperar.',
      h1: 'Después de llegar',
      intro:
        'Las primeras semanas tienen obligaciones con plazo. Esta página separa lo que tiene fecha límite de lo que puede esperar a que usted se organice.',
      breadcrumb: 'Después de llegar',
      sections: [
        {
          heading: 'Lo que tiene plazo',
          body: [
            'Algunas obligaciones empiezan a correr el día de la entrada: presentación ante las autoridades competentes, registro de residencia y las etapas finales ligadas a la autorización, según el caso.',
            'Los plazos y la forma exacta los fija la autoridad checa y cambian. Confirme en la fuente oficial qué se aplica a su caso, y hágalo antes de llegar, no después.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Trabajo: cuándo puede empezar',
          body: [
            'El trabajo solo puede empezar una vez que la autorización produce efectos. Empezar antes puede tratarse como trabajo no autorizado, con consecuencias para usted y para el empleador.',
            'Si el empleador le pide que empiece antes, eso dice algo sobre el empleador.',
          ],
        },
        {
          heading: 'Seguro de salud',
          body: [
            'La cobertura de salud cambia de régimen cuando empieza el empleo. Confirme con el empleador desde qué fecha está cubierto y qué debe hacer.',
            'Un intervalo sin cobertura es un riesgo concreto, y es evitable si se atiende en la primera semana.',
          ],
          freshness: 'procedural',
        },
        {
          heading: 'Lo que puede esperar',
          body: [
            'Cuenta bancaria, plan de teléfono, pase de transporte público y curso de checo no tienen plazo legal, pero facilitan todo lo que viene después.',
            'Un curso de checo en los primeros meses es la inversión con mejor retorno en esta etapa.',
          ],
        },
        {
          heading: 'Si algo sale mal',
          body: [
            'Si el trabajo no corresponde al contrato, si hay descuentos no previstos o si le piden retener sus documentos personales, acuda a la autoridad competente.',
            'La página sobre derechos del trabajador indica dónde buscar ayuda.',
          ],
        },
      ],
      cta: { label: 'Derechos del trabajador', targetConceptId: 'worker-rights' },
      freshness: freshness('procedural', [LATAM_SRC.employeeCardMzv, LATAM_SRC.labourOffice], 'LATAM'),
    },
  },
}
