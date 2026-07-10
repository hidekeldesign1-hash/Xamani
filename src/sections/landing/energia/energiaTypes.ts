export type EnergiaTypeId = "meyaj" | "nepa" | "balam" | "kan";

export interface EnergiaType {
  id: EnergiaTypeId;
  name: string;
  keywords: string;
  shortLabel: string;
  tagline: string;
  description: string;
  complementaryBlurb: string;
  accent: string;
}

export const ENERGIA_TYPES: Record<EnergiaTypeId, EnergiaType> = {
  meyaj: {
    id: "meyaj",
    name: "MEYAJ",
    keywords: "EJECUCIÓN · ESTRUCTURA · SOLIDEZ",
    shortLabel: "La energía de la ejecución",
    tagline: "La fuerza que convierte intención en realidad.",
    description:
      "Tu naturaleza busca orden, claridad y resultados concretos. Transformas ideas en sistemas y das forma a lo que otros solo imaginan.",
    complementaryBlurb:
      "Aporta estructura, foco y la capacidad de convertir visión en avance tangible.",
    accent: "#6ec4d9",
  },
  nepa: {
    id: "nepa",
    name: "NEPA",
    keywords: "EQUILIBRIO · PAZ · ARMONÍA",
    shortLabel: "La energía del equilibrio",
    tagline: "La calma que integra fuerza y serenidad.",
    description:
      "Tu energía busca armonía, presencia y sentido. Sabes sostener sin romperte y crecer sin perder lo esencial en el camino.",
    complementaryBlurb:
      "Potencia tu capacidad de sostener, equilibrar y crecer con serenidad auténtica.",
    accent: "#7dcf8a",
  },
  balam: {
    id: "balam",
    name: "BALAM",
    keywords: "PODER · PRESENCIA · EXPANSIÓN",
    shortLabel: "La energía del poder",
    tagline: "La presencia que domina sin perder elegancia.",
    description:
      "Tu naturaleza busca crecer, liderar y construir algo más grande. No te conformas fácilmente con estructuras que limitan tu capacidad.",
    complementaryBlurb:
      "Potencia tu liderazgo, presencia y la fuerza para expandir lo que construyes.",
    accent: "#e8a4b8",
  },
  kan: {
    id: "kan",
    name: "KAN",
    keywords: "CONEXIÓN · INFLUENCIA · RED",
    shortLabel: "La energía de la conexión",
    tagline: "La inteligencia que une personas y posibilidades.",
    description:
      "Tu capacidad de generar confianza potencia tu liderazgo y te ayuda a construir oportunidades a través de las personas.",
    complementaryBlurb:
      "Potencia tu capacidad de conectar, influir y abrir oportunidades auténticas.",
    accent: "#6ec4d9",
  },
};

export const ENERGIA_TYPE_IDS = Object.keys(ENERGIA_TYPES) as EnergiaTypeId[];

export interface EnergiaCombination {
  dominant: EnergiaTypeId;
  complementary: EnergiaTypeId;
  keyword: string;
  title: string;
  description: string;
}

/** 12 combinaciones (4 dominantes × 3 complementarias). Textos placeholder hasta la lógica final. */
export const ENERGIA_COMBINATIONS: EnergiaCombination[] = [
  {
    dominant: "balam",
    complementary: "kan",
    keyword: "liderazgo",
    title: "El líder que expande a través de relaciones.",
    description:
      "Tu ambición encuentra fuerza cuando se combina con tu capacidad de conectar, influir y reunir a las personas correctas.",
  },
  {
    dominant: "balam",
    complementary: "meyaj",
    keyword: "dominio",
    title: "El constructor que lidera con estructura.",
    description:
      "Tu impulso de expansión se vuelve imparable cuando se sostiene en sistemas claros y ejecución disciplinada.",
  },
  {
    dominant: "balam",
    complementary: "nepa",
    keyword: "presencia",
    title: "El poder que crece con equilibrio.",
    description:
      "Tu liderazgo se vuelve más profundo cuando avanza con calma, presencia y una dirección que no se quiebra.",
  },
  {
    dominant: "kan",
    complementary: "balam",
    keyword: "influencia",
    title: "La red que se expande con presencia.",
    description:
      "Tu talento para conectar gana potencia cuando se une a una presencia que inspira y abre caminos más grandes.",
  },
  {
    dominant: "kan",
    complementary: "meyaj",
    keyword: "puente",
    title: "El conector que convierte vínculos en sistemas.",
    description:
      "Tu capacidad de unir personas se vuelve transformadora cuando da forma a estructuras y oportunidades concretas.",
  },
  {
    dominant: "kan",
    complementary: "nepa",
    keyword: "comunidad",
    title: "La conexión que sostiene con armonía.",
    description:
      "Tu influencia crece cuando genera confianza, equilibrio y relaciones que nutren a largo plazo.",
  },
  {
    dominant: "meyaj",
    complementary: "balam",
    keyword: "ejecución",
    title: "La estructura que lidera con fuerza.",
    description:
      "Tu capacidad de ordenar y construir se multiplica cuando se une a una presencia que impulsa y expande.",
  },
  {
    dominant: "meyaj",
    complementary: "kan",
    keyword: "sistema",
    title: "El arquitecto que construye a través de personas.",
    description:
      "Tu visión estructurada encuentra alcance real cuando se conecta con redes, confianza e influencia.",
  },
  {
    dominant: "meyaj",
    complementary: "nepa",
    keyword: "solidez",
    title: "La ejecución que avanza con equilibrio.",
    description:
      "Tu foco en resultados se vuelve sostenible cuando integra calma, claridad y un ritmo que no se agota.",
  },
  {
    dominant: "nepa",
    complementary: "kan",
    keyword: "armonía",
    title: "La armonía que se expande a través de vínculos.",
    description:
      "Tu calma encuentra potencia cuando conecta con personas, comunidad y oportunidades auténticas.",
  },
  {
    dominant: "nepa",
    complementary: "balam",
    keyword: "serenidad",
    title: "El equilibrio que lidera con elegancia.",
    description:
      "Tu presencia serena gana alcance cuando se une a la fuerza de expandir y sostener lo esencial.",
  },
  {
    dominant: "nepa",
    complementary: "meyaj",
    keyword: "centro",
    title: "La calma que construye con precisión.",
    description:
      "Tu armonía interior se vuelve tangible cuando da forma a sistemas claros y avances concretos.",
  },
];

export function getEnergiaCombination(
  dominant: EnergiaTypeId,
  complementary: EnergiaTypeId
): EnergiaCombination {
  const found = ENERGIA_COMBINATIONS.find(
    (item) => item.dominant === dominant && item.complementary === complementary
  );

  if (found) return found;

  const dominantType = ENERGIA_TYPES[dominant];
  const complementaryType = ENERGIA_TYPES[complementary];

  return {
    dominant,
    complementary,
    keyword: "combinación",
    title: `${dominantType.name} + ${complementaryType.name}`,
    description: `${dominantType.tagline} ${complementaryType.tagline}`,
  };
}

export interface EnergiaResult {
  dominant: EnergiaTypeId;
  complementary: EnergiaTypeId;
  generatedAt: string;
  combination?: string;
  scores?: Record<string, number>;
  requiresManualTieBreaker?: boolean;
}

export const ENERGIA_RESULT_STORAGE_KEY = "xamani-energia-result";

export function toEnergiaTypeId(archetype: string): EnergiaTypeId {
  const id = archetype.toLowerCase() as EnergiaTypeId;
  return ENERGIA_TYPE_IDS.includes(id) ? id : "meyaj";
}

export function energiaResultFromCalculation(input: {
  dominant: string;
  complementary: string;
  combination?: string;
  scores?: Record<string, number>;
  requiresManualTieBreaker?: boolean;
}): EnergiaResult {
  return {
    dominant: toEnergiaTypeId(input.dominant),
    complementary: toEnergiaTypeId(input.complementary),
    combination: input.combination,
    scores: input.scores,
    requiresManualTieBreaker: input.requiresManualTieBreaker,
    generatedAt: new Date().toISOString(),
  };
}

/** @deprecated Prefer calculateXamaniResult — se mantiene por compatibilidad. */
export function pickRandomEnergiaResult(): EnergiaResult {
  const dominantIndex = Math.floor(Math.random() * ENERGIA_TYPE_IDS.length);
  const dominant = ENERGIA_TYPE_IDS[dominantIndex];

  const remaining = ENERGIA_TYPE_IDS.filter((id) => id !== dominant);
  const complementary = remaining[Math.floor(Math.random() * remaining.length)];

  return {
    dominant,
    complementary,
    generatedAt: new Date().toISOString(),
  };
}

export function saveEnergiaResult(result: EnergiaResult) {
  sessionStorage.setItem(ENERGIA_RESULT_STORAGE_KEY, JSON.stringify(result));
  return result;
}

export function loadEnergiaResult(): EnergiaResult | null {
  try {
    const raw = sessionStorage.getItem(ENERGIA_RESULT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as EnergiaResult;
  } catch {
    return null;
  }
}

export function buildEnergiaWhatsAppMessage(result: EnergiaResult) {
  const dominant = ENERGIA_TYPES[result.dominant];
  const complementary = ENERGIA_TYPES[result.complementary];

  return [
    "Hola, completé la experiencia XAMANI.",
    "",
    `Mi energía dominante es ${dominant.name} y mi energía complementaria es ${complementary.name}.`,
    "",
    "Quiero conocer cómo puedo formar parte de XAMANI.",
  ].join("\n");
}
