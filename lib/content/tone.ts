// Tone system. All generators must respect these constraints.
// The goal is clear, factual, calm employment guidance — never marketing hype.

export const TONE_RULES = {
  voice: 'professional, calm, factual, practical, trustworthy',
  perspective: 'employer-friendly and worker-friendly at the same time',
  avoid: [
    'fear-based legal copy',
    'exaggerated promises',
    'guaranteed-job claims',
    'best-agency claims',
    '100% success claims',
    'unsupported statistics',
    'manipulative sales language',
    'urgency manufactured for clicks',
  ],
  prefer: [
    'specific, source-backed facts',
    'transparent uncertainty',
    'concrete next steps',
    'plain Czech / English / German',
    'short paragraphs, scannable structure',
  ],
} as const

export const FORBIDDEN_PHRASES_CS: ReadonlyArray<string> = [
  'zaručeně',
  'garantovaně',
  '100% úspěch',
  'nejlepší agentura',
  'nejvýhodnější',
  'jednoznačně nejlepší',
]

export const FORBIDDEN_PHRASES_EN: ReadonlyArray<string> = [
  'guaranteed job',
  'best agency',
  '100% success',
  'unbeatable',
  'cheapest',
  'no risk',
]

export const DISCLAIMER_CS =
  'Informace na této stránce jsou obecné a nepředstavují právní poradenství. Konkrétní podmínky se mohou měnit podle aktuální legislativy, typu pracovního poměru a individuální situace.'

export const DISCLAIMER_EN =
  'The information on this page is general and does not constitute legal advice. Specific conditions may vary based on current legislation, the type of employment, and individual circumstances.'

export const FALLBACK_DATA_CS =
  'Konkrétní hodnoty (sazby, limity, lhůty) je nutné ověřit v aktuálních oficiálních zdrojích – tato stránka nezobrazuje vymyšlené údaje, pokud aktuální data nejsou dostupná.'

export const FALLBACK_DATA_EN =
  'Specific values (rates, limits, deadlines) must be verified against current official sources — this page does not display invented values when up-to-date data is unavailable.'
